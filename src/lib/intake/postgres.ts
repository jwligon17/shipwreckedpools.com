import { CLAIM_NOTIFICATION_JOB_SQL, START_NOTIFICATION_SEND_SQL, MARK_OUTBOX_RETRY_SQL,
  OUTBOX_LEASE_SECONDS, OUTBOX_MAX_ATTEMPTS, OUTBOX_RETRY_SECONDS } from "./outbox";
import { IntakeConflictError } from "./store";
import { CapturedIntake, IntakeStore, NormalizedSubmission, OpportunityRecord } from "./types";

type PgClient = {
  query<T = Record<string, unknown>>(sql: string, params?: unknown[]): Promise<{ rows: T[]; rowCount: number | null }>;
  release?: () => void;
};

type PgPool = {
  connect(): Promise<PgClient>;
};

type PgModule = {
  Pool: new (config: { connectionString: string; ssl?: { rejectUnauthorized: boolean } }) => PgPool;
};

async function loadPg(): Promise<PgModule> {
  const pgModuleName = "pg";
  return import(pgModuleName) as Promise<PgModule>;
}

function requireString(value: unknown, name: string) {
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`PostgreSQL adapter returned missing ${name}.`);
  }
  return value;
}

function opportunityFor(submission: NormalizedSubmission): Omit<OpportunityRecord, "opportunityId"> | null {
  if (!submission.actionable) return null;

  return {
    ownerRole: "Jason",
    backupRole: "Kristen",
    pipelineStage: "new",
    nextAction:
      submission.preferredContactMethod === "email"
        ? "Jason contacts the customer by email about the pool service request."
        : submission.preferredContactMethod === "phone"
          ? "Jason calls the customer about the pool service request."
          : "Jason texts the customer about the pool service request.",
    nextActionDueAt: null,
  };
}

export class PostgresIntakeStore implements IntakeStore {
  private poolPromise: Promise<PgPool>;

  constructor(connectionString: string) {
    this.poolPromise = loadPg().then(({ Pool }) => {
      return new Pool({
        connectionString,
        ssl: connectionString.includes("sslmode=require") ? { rejectUnauthorized: true } : undefined,
      });
    });
  }

  async captureSubmission(submission: NormalizedSubmission): Promise<CapturedIntake> {
    const pool = await this.poolPromise;
    const client = await pool.connect();

    try {
      await client.query("begin isolation level read committed");
      // A row lock cannot protect a token that has not been inserted yet. Serialize
      // captures for this token until commit/rollback, then read a fresh snapshot.
      // Hash collisions only serialize unrelated tokens; they never merge records.
      await client.query("select pg_advisory_xact_lock(hashtextextended($1, 0))", [
        submission.clientSubmissionToken,
      ]);
      const existing = await client.query<{
        source_event_id: string;
        payload_hash: string;
        opportunity_id: string | null;
        notification_job_id: string | null;
        projection_job_id: string | null;
        owner_role: "Jason" | null;
        backup_role: "Kristen" | null;
        pipeline_stage: "new" | "giveaway_only" | null;
        next_action: string | null;
        next_action_due_at: string | null;
      }>(
        `
          select
            se.source_event_id,
            se.payload_hash,
            o.opportunity_id,
            nj.job_id as notification_job_id,
            pj.job_id as projection_job_id,
            o.owner_role,
            o.backup_role,
            o.pipeline_stage,
            o.next_action,
            o.next_action_due_at
          from intake_source_events se
          left join intake_opportunities o on o.origin_event_id = se.source_event_id
          left join intake_outbox_jobs nj
            on nj.source_event_id = se.source_event_id and nj.job_type = 'notification'
          left join intake_outbox_jobs pj
            on pj.source_event_id = se.source_event_id and pj.job_type = 'drive_projection'
          where se.client_submission_token = $1
          for update of se
        `,
        [submission.clientSubmissionToken],
      );

      if (existing.rows[0]) {
        const row = existing.rows[0];
        if (row.payload_hash !== submission.payloadHash) {
          await client.query("rollback");
          throw new IntakeConflictError();
        }

        await client.query("commit");
        return {
          sourceEventId: row.source_event_id,
          notificationJobId: row.notification_job_id,
          projectionJobId: row.projection_job_id,
          opportunity: row.opportunity_id
            ? {
                opportunityId: row.opportunity_id,
                ownerRole: row.owner_role ?? "Jason",
                backupRole: row.backup_role ?? "Kristen",
                pipelineStage: row.pipeline_stage ?? "new",
                nextAction: row.next_action ?? "Jason contacts the customer about the pool service request.",
                nextActionDueAt: row.next_action_due_at,
              }
            : null,
          idempotencyStatus: "replayed",
        };
      }

      const eventResult = await client.query<{ source_event_id: string }>(
        `
          insert into intake_source_events (
            client_submission_token,
            payload_hash,
            submission_intent,
            source_channel,
            source_detail,
            landing_page_path,
            referrer_host,
            attribution,
            contact_name,
            contact_email,
            contact_phone,
            contact_phone_digits,
            preferred_contact_method,
            service_address,
            service_city,
            service_state,
            service_zip_code,
            property_fields,
            customer_message
          )
          values (
            $1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9, $10, $11, $12, $13,
            $14, $15, $16, $17, $18::jsonb, $19
          )
          returning source_event_id
        `,
        [
          submission.clientSubmissionToken,
          submission.payloadHash,
          submission.submissionIntent,
          submission.source.sourceChannel,
          submission.source.sourceDetail,
          submission.source.landingPagePath,
          submission.source.referrerHost,
          JSON.stringify({
            utm_source: submission.source.utmSource,
            utm_medium: submission.source.utmMedium,
            utm_campaign: submission.source.utmCampaign,
            utm_term: submission.source.utmTerm,
            utm_content: submission.source.utmContent,
            gclid: submission.source.gclid,
            gbraid: submission.source.gbraid,
            wbraid: submission.source.wbraid,
          }),
          submission.contactName,
          submission.contactEmail,
          submission.contactPhone,
          submission.contactPhoneDigits,
          submission.preferredContactMethod,
          submission.serviceAddress,
          submission.serviceCity,
          submission.serviceState,
          submission.serviceZipCode,
          JSON.stringify({
            pool_type: submission.poolType,
            pool_size: submission.poolSize,
            filter_type: submission.filterType,
            debris_exposure: submission.debrisExposure,
            current_pool_caretaker: submission.currentPoolCaretaker,
            wants_free_estimate: submission.wantsFreeEstimate,
          }),
          submission.customerMessage,
        ],
      );
      const sourceEventId = requireString(eventResult.rows[0]?.source_event_id, "source_event_id");
      const opportunityInput = opportunityFor(submission);
      let opportunity: OpportunityRecord | null = null;

      if (opportunityInput) {
        const opportunityResult = await client.query<{ opportunity_id: string }>(
          `
            insert into intake_opportunities (
              origin_event_id,
              pipeline_stage,
              owner_role,
              backup_role,
              next_action,
              next_action_due_at
            )
            values ($1, $2, $3, $4, $5, $6)
            returning opportunity_id
          `,
          [
            sourceEventId,
            opportunityInput.pipelineStage,
            opportunityInput.ownerRole,
            opportunityInput.backupRole,
            opportunityInput.nextAction,
            opportunityInput.nextActionDueAt,
          ],
        );
        opportunity = {
          opportunityId: requireString(opportunityResult.rows[0]?.opportunity_id, "opportunity_id"),
          ...opportunityInput,
        };
      }

      const notificationJobId =
        submission.submissionIntent === "giveaway_opt_in"
          ? null
          : requireString(
              (
                await client.query<{ job_id: string }>(
                  `
                    insert into intake_outbox_jobs (source_event_id, opportunity_id, job_type, status)
                    values ($1, $2, 'notification', 'pending')
                    returning job_id
                  `,
                  [sourceEventId, opportunity?.opportunityId ?? null],
                )
              ).rows[0]?.job_id,
              "notification_job_id",
            );
      const projectionJobId = requireString(
        (
          await client.query<{ job_id: string }>(
            `
              insert into intake_outbox_jobs (source_event_id, opportunity_id, job_type, status)
              values ($1, $2, 'drive_projection', 'pending')
              returning job_id
            `,
            [sourceEventId, opportunity?.opportunityId ?? null],
          )
        ).rows[0]?.job_id,
        "projection_job_id",
      );

      await client.query("commit");
      return {
        sourceEventId,
        opportunity,
        notificationJobId,
        projectionJobId,
        idempotencyStatus: "created",
      };
    } catch (error) {
      await client.query("rollback").catch(() => undefined);
      throw error;
    } finally {
      client.release?.();
    }
  }

  async claimNotification(notificationJobId: string): Promise<string | null> {
    const client = await (await this.poolPromise).connect();
    try {
      const result = await client.query<{ lease_token: string }>(CLAIM_NOTIFICATION_JOB_SQL,
        ["notification", OUTBOX_LEASE_SECONDS, OUTBOX_MAX_ATTEMPTS, 1, notificationJobId]);
      return result.rows[0]?.lease_token ?? null;
    } finally { client.release?.(); }
  }

  async startNotificationSend(args: { notificationJobId: string; leaseToken: string }): Promise<void> {
    const client = await (await this.poolPromise).connect();
    try {
      const result = await client.query(START_NOTIFICATION_SEND_SQL, [args.notificationJobId, args.leaseToken]);
      if (result.rowCount !== 1) throw new Error("Notification send ownership rejected.");
    } finally { client.release?.(); }
  }

  async markNotificationRetryable(args: { notificationJobId: string; leaseToken: string; error: string }): Promise<void> {
    const client = await (await this.poolPromise).connect();
    try {
      const result = await client.query(MARK_OUTBOX_RETRY_SQL,
        [args.notificationJobId, args.error, OUTBOX_MAX_ATTEMPTS, OUTBOX_RETRY_SECONDS, args.leaseToken]);
      if (result.rowCount !== 1) throw new Error("Notification retry ownership rejected.");
    } finally { client.release?.(); }
  }

  async markNotificationAccepted(args: {
    notificationJobId: string;
    providerMessageId: string | null;
    leaseToken?: string;
  }): Promise<void> {
    await this.updateNotification(args.notificationJobId, "accepted", args.providerMessageId, null, args.leaseToken);
  }

  async markNotificationFailed(args: { notificationJobId: string; error: string; leaseToken?: string }): Promise<void> {
    await this.updateNotification(args.notificationJobId, "failed", null, args.error, args.leaseToken);
  }

  async markNotificationAmbiguous(args: {
    notificationJobId: string;
    providerMessageId: string | null;
    error: string;
    leaseToken?: string;
  }): Promise<void> {
    await this.updateNotification(args.notificationJobId, "ambiguous", args.providerMessageId, args.error, args.leaseToken);
  }

  private async updateNotification(
    jobId: string,
    status: "accepted" | "failed" | "ambiguous",
    providerMessageId: string | null,
    error: string | null,
    leaseToken?: string,
  ) {
    const pool = await this.poolPromise;
    const client = await pool.connect();
    try {
      const result = await client.query(
        `
          update intake_outbox_jobs
          set
            status = $2,
            provider_message_id = $3,
            last_error = $4,
            lease_token = null,
            leased_until = null,
            updated_at = now()
          where job_id = $1 and job_type = 'notification'
            and (
              ($5::uuid is null and status = 'pending' and attempts = 0
                and lease_token is null and leased_until is null)
              or ($5::uuid is not null and status = 'leased' and lease_token = $5::uuid
                and leased_until > clock_timestamp())
            )
        `,
        [jobId, status, providerMessageId, error, leaseToken ?? null],
      );
      if (result.rowCount !== 1) {
        throw new Error("Notification acknowledgement rejected: job is no longer owned by this caller.");
      }
    } finally {
      client.release?.();
    }
  }
}

export function getPostgresConnectionString(env: Record<string, string | undefined> = process.env) {
  return env.DATABASE_URL ?? env.POSTGRES_URL ?? env.POSTGRES_PRISMA_URL ?? null;
}
