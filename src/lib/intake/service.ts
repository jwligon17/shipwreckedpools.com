import { buildNotificationMessage } from "./email";
import { parseContactRequestText } from "./normalize";
import { getPostgresConnectionString, PostgresIntakeStore } from "./postgres";
import { safeErrorMessage } from "./safety";
import { IntakeConflictError, MemoryIntakeStore } from "./store";
import { IntakeStore, NormalizedSubmission, NotificationMessage, NotificationSender, NotificationSendResult } from "./types";

type IntakeEnv = Record<string, string | undefined>;

export type ContactServiceResponse = {
  status: number;
  body: {
    ok?: true;
    accepted?: boolean;
    isTest?: true;
    delivery?: "email_only" | "durable" | "memory";
    error?: string;
    sourceEventId?: string;
    opportunityId?: string | null;
  };
};

export type ContactServiceDeps = {
  store?: IntakeStore;
  notificationSender?: NotificationSender;
  env?: IntakeEnv;
};

class MissingConfigurationError extends Error {}

export class ResendNotificationSender implements NotificationSender {
  constructor(
    private config: {
      apiKey: string;
      fromEmail: string;
      toEmail: string;
    },
  ) {}

  async send(message: NotificationMessage) {
    const resendModuleName = "resend";
    const { Resend } = (await import(resendModuleName)) as {
      Resend: new (apiKey: string) => { emails: { send: (args: unknown, options?: unknown) => Promise<unknown> } };
    };
    const resend = new Resend(this.config.apiKey);
    const result = (await resend.emails.send({
      from: this.config.fromEmail,
      to: this.config.toEmail,
      subject: message.subject,
      replyTo: message.replyTo,
      html: message.html,
      text: message.text,
    }, { idempotencyKey: message.idempotencyKey })) as { data?: { id?: string }; error?: { message?: string; name?: string; statusCode?: number } };

    if (result.error) {
      // Retry only an explicit rate-limit rejection. Server/transport uncertainty
      // is not evidence that the provider did not accept the message.
      if (result.error.name === "rate_limit_exceeded") return {
        status: "failed" as const, retryable: true, error: result.error.message ?? "Rate limited",
      };
      if (result.error.statusCode && result.error.statusCode >= 400 && result.error.statusCode < 500) {
        return { status: "failed" as const, error: result.error.message ?? "Resend rejected the message." };
      }
      return { status: "ambiguous" as const, providerMessageId: null, error: result.error.message ?? "Unknown provider outcome" };
    }

    if (!result.data?.id) return { status: "ambiguous" as const, providerMessageId: null, error: "Missing provider acknowledgement" };
    return { status: "accepted" as const, providerMessageId: result.data.id };
  }
}

function createStore(env: IntakeEnv): IntakeStore {
  if (env.INTAKE_DURABLE_STORE === "memory") {
    return new MemoryIntakeStore();
  }

  if (env.INTAKE_DURABLE_STORE !== "postgres") {
    throw new MissingConfigurationError("Durable intake storage is not configured.");
  }

  const connectionString = getPostgresConnectionString(env);
  if (!connectionString) {
    throw new MissingConfigurationError("PostgreSQL connection is not configured.");
  }

  return new PostgresIntakeStore(connectionString);
}

function createNotificationSender(env: IntakeEnv): NotificationSender {
  const apiKey = env.RESEND_API_KEY;
  const fromEmail = env.CONTACT_FROM_EMAIL;
  const configuredToEmail = env.CONTACT_TO_EMAIL;
  const resolvedToEmail = env.RESEND_TEST_MODE === "true" ? "delivered@resend.dev" : configuredToEmail;

  if (!apiKey || !fromEmail || !resolvedToEmail) {
    throw new MissingConfigurationError("Contact notification service is not configured.");
  }

  return new ResendNotificationSender({ apiKey, fromEmail, toEmail: resolvedToEmail });
}

async function sendEmailOnly(
  submission: NormalizedSubmission, deps: ContactServiceDeps, env: IntakeEnv,
): Promise<ContactServiceResponse> {
  try {
    const sender = deps.notificationSender ?? createNotificationSender(env);
    const message = buildNotificationMessage({
      submission,
      contactSubjectPrefix: env.CONTACT_SUBJECT_PREFIX ?? "[Shipwrecked Pools]",
      fromEmail: env.CONTACT_FROM_EMAIL ?? "configured-sender@example.invalid",
      toEmail: env.RESEND_TEST_MODE === "true"
        ? "delivered@resend.dev"
        : env.CONTACT_TO_EMAIL ?? "configured-recipient@example.invalid",
    });
    const result = await sender.send(message);
    if (result.status === "accepted" && result.providerMessageId?.trim()) {
      return {
        status: 200,
        body: {
          ok: true,
          accepted: env.RESEND_TEST_MODE !== "true",
          ...(env.RESEND_TEST_MODE === "true" ? { isTest: true as const } : {}),
          delivery: "email_only",
        },
      };
    }
  } catch {
    // Provider errors may contain recipient details. Return a public-safe error;
    // an uncertain send can be retried with the same provider idempotency key.
  }
  return {
    status: 503,
    body: { error: "Unable to confirm your request was sent." },
  };
}

// Both initial dispatch and a future recovery caller must enter here before sending.
// Claim/start failures and acknowledgement uncertainty never undo saved capture.
export async function dispatchNotification(
  store: IntakeStore, notificationJobId: string, message: NotificationMessage,
  senderFactory: () => NotificationSender,
): Promise<void> {
  let leaseToken: string | null;
  try { leaseToken = await store.claimNotification(notificationJobId); } catch { return; }
  if (!leaseToken) return;
  const ownership = { notificationJobId, leaseToken };
  let sender: NotificationSender;
  try { sender = senderFactory(); }
  catch (error) {
    await store.markNotificationFailed({ ...ownership, error: safeErrorMessage(error) }).catch(() => undefined);
    return;
  }
  try { await store.startNotificationSend(ownership); } catch { return; }
  let result: NotificationSendResult;
  try { result = await sender.send(message); }
  catch (error) { result = { status: "ambiguous", providerMessageId: null, error: safeErrorMessage(error) }; }
  try {
    if (result.status === "accepted") await store.markNotificationAccepted({ ...ownership, providerMessageId: result.providerMessageId });
    else if (result.status === "ambiguous") await store.markNotificationAmbiguous({ ...ownership, ...result });
    else if (result.retryable === true) await store.markNotificationRetryable({ ...ownership, error: result.error });
    else await store.markNotificationFailed({ ...ownership, error: result.error });
  } catch (error) {
    await store.markNotificationAmbiguous({ ...ownership,
      providerMessageId: result.status === "failed" ? null : result.providerMessageId,
      error: safeErrorMessage(error),
    }).catch(() => undefined);
    // If acknowledgement storage is unavailable, the durable send-start marker
    // forces review on expiry instead of permitting an automatic resend.
  }
}

export async function handleContactRequestText(
  rawBody: string,
  deps: ContactServiceDeps = {},
): Promise<ContactServiceResponse> {
  const env = deps.env ?? process.env;
  const parsed = parseContactRequestText(rawBody);

  if (!parsed.ok) {
    if (parsed.suppressed) return { status: 200, body: { ok: true, accepted: false } };
    return { status: parsed.status, body: { error: parsed.error } };
  }

  try {
    // Deliberate recovery for deployments with email configured but no storage.
    // Never switch to email-only after an explicit store configuration or failed write.
    if (!deps.store && !env.INTAKE_DURABLE_STORE
      && !env.DATABASE_URL && !env.POSTGRES_URL && !env.POSTGRES_PRISMA_URL) {
      return await sendEmailOnly(parsed.submission, deps, env);
    }
    const store = deps.store ?? createStore(env);
    const capture = await store.captureSubmission(parsed.submission);

    if (capture.notificationJobId && capture.idempotencyStatus === "created") {
      const contactSubjectPrefix = env.CONTACT_SUBJECT_PREFIX ?? "[Shipwrecked Pools]";
      const fromEmail = env.CONTACT_FROM_EMAIL ?? "configured-sender@example.invalid";
      const toEmail =
        env.RESEND_TEST_MODE === "true"
          ? "delivered@resend.dev"
          : env.CONTACT_TO_EMAIL ?? "configured-recipient@example.invalid";
      const message = buildNotificationMessage({
        submission: parsed.submission,
        capture,
        contactSubjectPrefix,
        fromEmail,
        toEmail,
      });
      await dispatchNotification(store, capture.notificationJobId, message,
        () => deps.notificationSender ?? createNotificationSender(env));
    }

    return {
      status: 200,
      body: {
        ok: true,
        accepted: env.RESEND_TEST_MODE !== "true",
        ...(env.RESEND_TEST_MODE === "true" ? { isTest: true as const } : {}),
        delivery: store instanceof MemoryIntakeStore ? "memory" : "durable",
        sourceEventId: capture.sourceEventId,
        opportunityId: capture.opportunity?.opportunityId ?? null,
      },
    };
  } catch (error) {
    if (error instanceof IntakeConflictError) {
      return {
        status: 409,
        body: { error: "This form was changed after submission started. Please try again." },
      };
    }

    if (error instanceof MissingConfigurationError) {
      return { status: 503, body: { error: "Contact service is temporarily unavailable." } };
    }

    console.error("[contact-capture-failed]", safeErrorMessage(error));
    return {
      status: 503,
      body: { error: "Unable to save your request right now. Please try again." },
    };
  }
}
