import { OUTBOX_LEASE_SECONDS, OUTBOX_MAX_ATTEMPTS, OUTBOX_RETRY_SECONDS } from "./outbox";
import { randomUUID } from "node:crypto";

import { CapturedIntake, IntakeStore, NormalizedSubmission, OpportunityRecord } from "./types";

export class IntakeConflictError extends Error {
  constructor() {
    super("This submission token was already used with different form details.");
    this.name = "IntakeConflictError";
  }
}

function opportunityFor(submission: NormalizedSubmission): OpportunityRecord | null {
  if (!submission.actionable) return null;

  return {
    opportunityId: randomUUID(),
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

export class MemoryIntakeStore implements IntakeStore {
  private captures = new Map<string, { submission: NormalizedSubmission; capture: CapturedIntake }>();
  notificationStates = new Map<string, string>();
  private jobs = new Map<string, { status: string; attempts: number; token: string | null; until: number; next: number; started: boolean }>();
  constructor(private now: () => number = Date.now) {}

  async claimNotification(id: string): Promise<string | null> {
    const job = this.jobs.get(id);
    if (!job) return null;
    if ((job.status === 'leased' && job.until <= this.now() && (job.started || job.attempts >= OUTBOX_MAX_ATTEMPTS))
      || (['pending', 'retryable'].includes(job.status) && job.attempts >= OUTBOX_MAX_ATTEMPTS)) {
      job.status = 'manual_review'; job.token = null;
      this.notificationStates.set(id, 'manual_review');
    }
    if (job.attempts >= OUTBOX_MAX_ATTEMPTS || !(job.status === 'pending'
      || (job.status === 'retryable' && job.next <= this.now())
      || (job.status === 'leased' && job.until <= this.now() && !job.started))) return null;
    job.status = 'leased'; job.attempts++; job.token = randomUUID();
    job.until = this.now() + OUTBOX_LEASE_SECONDS * 1000;
    return job.token;
  }

  private owned(id: string, token?: string) {
    const job = this.jobs.get(id);
    if (!job || (token ? job.status !== 'leased' || job.token !== token || job.until <= this.now()
      : job.status !== 'pending' || job.attempts !== 0)) throw new Error('Notification acknowledgement rejected');
    return job;
  }

  async startNotificationSend(args: { notificationJobId: string; leaseToken: string }) {
    const job = this.owned(args.notificationJobId, args.leaseToken);
    if (job.started) throw new Error('Notification send ownership rejected');
    job.started = true;
  }

  async markNotificationRetryable(args: { notificationJobId: string; leaseToken: string; error: string }) {
    const job = this.owned(args.notificationJobId, args.leaseToken);
    job.status = job.attempts >= OUTBOX_MAX_ATTEMPTS ? 'manual_review' : 'retryable';
    job.next = this.now() + OUTBOX_RETRY_SECONDS * 1000;
    job.token = null; job.started = false;
    this.notificationStates.set(args.notificationJobId, `${job.status}:${args.error}`);
  }

  private finish(id: string, status: string, token?: string) {
    const job = this.owned(id, token);
    job.status = status; job.token = null; job.until = 0;
  }

  async captureSubmission(submission: NormalizedSubmission): Promise<CapturedIntake> {
    const existing = this.captures.get(submission.clientSubmissionToken);
    if (existing) {
      if (existing.submission.payloadHash !== submission.payloadHash) {
        throw new IntakeConflictError();
      }
      return { ...existing.capture, idempotencyStatus: "replayed" };
    }

    const opportunity = opportunityFor(submission);
    const capture: CapturedIntake = {
      sourceEventId: randomUUID(),
      opportunity,
      notificationJobId:
        submission.submissionIntent === "giveaway_opt_in" ? null : randomUUID(),
      projectionJobId: randomUUID(),
      idempotencyStatus: "created",
    };
    if (capture.notificationJobId) this.jobs.set(capture.notificationJobId,
      { status: 'pending', attempts: 0, token: null, until: 0, next: 0, started: false });
    this.captures.set(submission.clientSubmissionToken, { submission, capture });
    return capture;
  }

  async markNotificationAccepted(args: {
    notificationJobId: string;
    leaseToken?: string;
    providerMessageId: string | null;
  }): Promise<void> {
    this.finish(args.notificationJobId, "accepted", args.leaseToken);
    this.notificationStates.set(args.notificationJobId, `accepted:${args.providerMessageId ?? ""}`);
  }

  async markNotificationFailed(args: { notificationJobId: string; error: string; leaseToken?: string }): Promise<void> {
    this.finish(args.notificationJobId, "failed", args.leaseToken);
    this.notificationStates.set(args.notificationJobId, `failed:${args.error}`);
  }

  async markNotificationAmbiguous(args: {
    notificationJobId: string;
    leaseToken?: string;
    providerMessageId: string | null;
    error: string;
  }): Promise<void> {
    this.finish(args.notificationJobId, "ambiguous", args.leaseToken);
    this.notificationStates.set(
      args.notificationJobId,
      `ambiguous:${args.providerMessageId ?? ""}:${args.error}`,
    );
  }
}
