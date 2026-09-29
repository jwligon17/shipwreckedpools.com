import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import test from "node:test";
import { normalizeContactBody } from "../../src/lib/intake/normalize";
import { IntakeConflictError } from "../../src/lib/intake/store";
import { CLAIM_OUTBOX_JOBS_SQL, MARK_OUTBOX_DONE_SQL, MARK_OUTBOX_RETRY_SQL } from "../../src/lib/intake/outbox";
import { configuration, fixture, Client } from "./postgres-fixture";

const url = configuration(process.env);
const options = { skip: url ? false : "NOT RUN: approved disposable PostgreSQL configuration is absent." };
function submission(token: string = randomUUID(), comment = "Synthetic weekly cleaning inquiry") {
  const result = normalizeContactBody({ clientSubmissionToken: token, name: "Fictional Test",
    email: "synthetic@example.invalid", phone: "3255550100", preferredContactMethod: "email", comment, company: "" });
  assert.ok(result.ok);
  return result.submission;
}
async function counts(client: Client) {
  const result = await client.query(`select
    (select count(*)::int from intake_source_events) as events,
    (select count(*)::int from intake_opportunities) as opportunities,
    (select count(*)::int from intake_outbox_jobs) as jobs`);
  return result.rows[0];
}
const one = { events: 1, opportunities: 1, jobs: 2 };

test("PostgreSQL concurrent identical-token replay returns one committed record", options, async () => {
  await fixture(url!, async ({ client, store }) => {
    const input = submission();
    const a = store(), b = store();
    // Both calls settle before cleanup, including when one fails.
    const results = await Promise.allSettled([a.captureSubmission(input), b.captureSubmission(input)]);
    assert.ok(results.every((result) => result.status === "fulfilled"));
    const values = results.map((result) => { assert.equal(result.status, "fulfilled"); return result.value; });
    assert.deepEqual(values.map((value) => value.idempotencyStatus).sort(), ["created", "replayed"]);
    assert.equal(values[0].sourceEventId, values[1].sourceEventId);
    assert.deepEqual(values[0].opportunity, values[1].opportunity);
    assert.equal(values[0].notificationJobId, values[1].notificationJobId);
    assert.equal(values[0].projectionJobId, values[1].projectionJobId);
    assert.equal(values[0].opportunity?.ownerRole, "Jason");
    assert.equal(values[0].opportunity?.backupRole, "Kristen");
    assert.equal(values[0].opportunity?.nextActionDueAt, null);
    assert.deepEqual(await counts(client), one);
  });
});

test("PostgreSQL changed payload conflicts without overwriting saved data", options, async () => {
  await fixture(url!, async ({ client, store }) => {
    const input = submission(), adapter = store();
    await adapter.captureSubmission(input);
    const before = await client.query("select * from intake_source_events");
    await assert.rejects(adapter.captureSubmission(submission(input.clientSubmissionToken, "Changed synthetic request")), IntakeConflictError);
    assert.deepEqual((await client.query("select * from intake_source_events")).rows, before.rows);
    assert.deepEqual(await counts(client), one);
  });
});

test("PostgreSQL late job failure rolls back event opportunity and earlier job", options, async () => {
  await fixture(url!, async ({ client, store }) => {
    await client.query(`alter table intake_outbox_jobs add constraint synthetic_projection_failure check (job_type <> 'drive_projection')`);
    await assert.rejects(store().captureSubmission(submission()), (error: unknown) => {
      // Exact injected constraint: an unrelated early SELECT failure must NOT satisfy rollback coverage.
      return (error as { code?: string; constraint?: string }).code === "23514"
        && (error as { constraint?: string }).constraint === "synthetic_projection_failure";
    });
    assert.deepEqual(await counts(client), { events: 0, opportunities: 0, jobs: 0 });
  });
});

test("PostgreSQL same contact can create a legitimate new-token inquiry", options, async () => {
  await fixture(url!, async ({ client, store }) => {
    const adapter = store();
    const first = await adapter.captureSubmission(submission());
    const second = await adapter.captureSubmission(submission());
    assert.notEqual(first.sourceEventId, second.sourceEventId);
    assert.notEqual(first.opportunity?.opportunityId, second.opportunity?.opportunityId);
    assert.deepEqual(await counts(client), { events: 2, opportunities: 2, jobs: 4 });
    assert.equal((await client.query("select count(distinct contact_email)::int as contacts from intake_source_events")).rows[0].contacts, 1);
  });
});

// SQL-only fixture makes lease defects observable independently of capture defects.
async function seedJob(client: Client) {
  const event = (await client.query(`insert into intake_source_events
    (client_submission_token, payload_hash, submission_intent, source_channel, source_detail, contact_email, preferred_contact_method)
    values ($1, 'synthetic', 'service_inquiry', 'website_form', 'contact', 'synthetic@example.invalid', 'email') returning source_event_id`, [randomUUID()])).rows[0];
  return (await client.query(`insert into intake_outbox_jobs (source_event_id, job_type, status)
    values ($1, 'notification', 'pending') returning job_id`, [event.source_event_id])).rows[0].job_id;
}
const claim = (client: Client) => client.query(CLAIM_OUTBOX_JOBS_SQL, ["notification", 120, 6, 1]);

test("PostgreSQL lease claims are exclusive; expiry permits reclaim; stale acknowledgements fail", options, async () => {
  await fixture(url!, async ({ client, connection }) => {
    const id = await seedJob(client), a = await connection(), b = await connection();
    await a.query("begin");
    const first = (await claim(a)).rows[0];
    assert.equal(first.job_id, id);
    assert.equal(first.attempts, 1);
    // A retains its row lock while B attempts a claim on another connection.
    assert.equal((await claim(b)).rowCount, 0);
    await a.query("commit");
    assert.equal((await claim(b)).rowCount, 0);
    await client.query("update intake_outbox_jobs set leased_until = now() - interval '1 second' where job_id = $1", [id]);
    assert.equal((await a.query(MARK_OUTBOX_DONE_SQL, [id, first.lease_token])).rowCount, 0);
    assert.equal((await a.query(MARK_OUTBOX_RETRY_SQL, [id, "expired", 6, 30, first.lease_token])).rowCount, 0);
    const second = (await claim(b)).rows[0];
    assert.equal(second.job_id, id);
    assert.equal(second.attempts, 2);
    assert.notEqual(second.lease_token, first.lease_token);
    assert.equal((await a.query(MARK_OUTBOX_DONE_SQL, [id, first.lease_token])).rowCount, 0);
    assert.equal((await a.query(MARK_OUTBOX_RETRY_SQL, [id, "synthetic stale failure", 6, 30, first.lease_token])).rowCount, 0);
    assert.equal((await b.query(MARK_OUTBOX_DONE_SQL, [id, second.lease_token])).rowCount, 1);
    assert.equal((await client.query("select status from intake_outbox_jobs where job_id = $1", [id])).rows[0].status, "done");
    const done = (await client.query("select * from intake_outbox_jobs where job_id = $1", [id])).rows;
    assert.equal(done[0].lease_token, null);
    assert.equal(done[0].leased_until, null);
    assert.equal((await b.query(MARK_OUTBOX_DONE_SQL, [id, second.lease_token])).rowCount, 0);
    assert.equal((await b.query(MARK_OUTBOX_RETRY_SQL, [id, "late failure", 6, 30, second.lease_token])).rowCount, 0);
    assert.deepEqual((await client.query("select * from intake_outbox_jobs where job_id = $1", [id])).rows, done);
  });
});

test("PostgreSQL commit before notification is recoverable through fresh store and connection", options, async () => {
  await fixture(url!, async ({ store, closeStores, connection }) => {
    const input = submission();
    const captured = await store().captureSubmission(input);
    await closeStores(); // Original pool is closed before recovery; no notification has been sent.
    const fresh = store();
    const replay = await fresh.captureSubmission(input);
    assert.equal(replay.idempotencyStatus, "replayed");
    assert.equal(replay.sourceEventId, captured.sourceEventId);
    const client = await connection();
    const jobs = (await client.query("select * from intake_outbox_jobs order by job_type")).rows;
    assert.deepEqual(jobs.map((job) => job.status), ["pending", "pending"]);
    assert.equal(jobs[0].job_id, captured.projectionJobId);
    assert.equal(jobs[1].job_id, captured.notificationJobId);
    const leased = (await claim(client)).rows[0];
    assert.equal(leased.job_id, captured.notificationJobId);
    const emailStub = async () => ({ providerMessageId: "synthetic-only" });
    const googleStub = async () => ({ remoteWrite: false });
    const sent = await emailStub();
    await fresh.markNotificationAccepted({ notificationJobId: String(leased.job_id), leaseToken: String(leased.lease_token), ...sent });
    assert.equal((await client.query("select status from intake_outbox_jobs where job_id = $1", [leased.job_id])).rows[0].status, "accepted");
    assert.equal((await googleStub()).remoteWrite, false);
    assert.equal((await client.query("select status from intake_outbox_jobs where job_id = $1", [captured.projectionJobId])).rows[0].status, "pending");
  });
});

test("PostgreSQL concurrent changed payload has one winner and one conflict without overwrite", options, async () => {
  await fixture(url!, async ({ client, store }) => {
    const first = submission(), second = submission(first.clientSubmissionToken, "Different synthetic request");
    const inputs = [first, second];
    const results = await Promise.allSettled(inputs.map((input) => store().captureSubmission(input)));
    assert.equal(results.filter((result) => result.status === "fulfilled").length, 1);
    const rejected = results.find((result) => result.status === "rejected");
    assert.ok(rejected?.status === "rejected" && rejected.reason instanceof IntakeConflictError);
    const winner = inputs[results.findIndex((result) => result.status === "fulfilled")];
    const saved = (await client.query("select payload_hash, customer_message from intake_source_events")).rows[0];
    assert.equal(saved.payload_hash, winner.payloadHash);
    assert.equal(saved.customer_message, winner.customerMessage);
    assert.deepEqual(await counts(client), one);
  });
});

test("PostgreSQL retry delay and attempt cap preserve timestamp and require a new lease", options, async () => {
  await fixture(url!, async ({ client }) => {
    const id = await seedJob(client);
    const first = (await claim(client)).rows[0];
    assert.equal((await client.query(MARK_OUTBOX_RETRY_SQL, [id, "retry", 6, 3600, first.lease_token])).rowCount, 1);
    const retry = (await client.query("select *, next_attempt_at > clock_timestamp() as delayed from intake_outbox_jobs where job_id = $1", [id])).rows[0];
    assert.equal(retry.status, "retryable");
    assert.equal(retry.delayed, true);
    assert.equal(retry.lease_token, null);
    assert.equal(retry.leased_until, null);
    assert.equal((await claim(client)).rowCount, 0);
    assert.equal((await client.query(MARK_OUTBOX_RETRY_SQL, [id, "repeat", 6, 30, first.lease_token])).rowCount, 0);
    assert.equal((await client.query(MARK_OUTBOX_DONE_SQL, [id, first.lease_token])).rowCount, 0);
    // Advance only synthetic eligibility/attempt state; do not wait on real time.
    await client.query("update intake_outbox_jobs set next_attempt_at = now() - interval '1 second', attempts = 5 where job_id = $1", [id]);
    const last = (await claim(client)).rows[0];
    assert.equal(last.attempts, 6);
    assert.notEqual(last.lease_token, first.lease_token);
    assert.equal((await client.query(MARK_OUTBOX_RETRY_SQL, [id, "exhausted", 6, 30, last.lease_token])).rowCount, 1);
    const terminal = (await client.query("select * from intake_outbox_jobs where job_id = $1", [id])).rows[0];
    assert.equal(terminal.status, "manual_review");
    assert.deepEqual(terminal.next_attempt_at, last.next_attempt_at);
    assert.ok(terminal.next_attempt_at instanceof Date);
    assert.equal(terminal.lease_token, null);
    assert.equal(terminal.leased_until, null);
    assert.equal((await claim(client)).rowCount, 0);
    assert.equal((await client.query(MARK_OUTBOX_DONE_SQL, [id, last.lease_token])).rowCount, 0);
    assert.equal((await client.query(MARK_OUTBOX_RETRY_SQL, [id, "repeat exhausted", 6, 30, last.lease_token])).rowCount, 0);
    assert.deepEqual((await client.query("select * from intake_outbox_jobs where job_id = $1", [id])).rows[0], terminal);
  });
});

test("PostgreSQL notification acknowledgements fence initial, expired, replaced and terminal ownership", options, async () => {
  await fixture(url!, async ({ client, store }) => {
    const adapter = store();
    for (const status of ["accepted", "failed", "ambiguous"] as const) {
      const acknowledge = (id: unknown, leaseToken?: string) => {
        const args = { notificationJobId: String(id), leaseToken, providerMessageId: "synthetic-only", error: "synthetic failure" };
        return status === "accepted" ? adapter.markNotificationAccepted(args)
          : status === "failed" ? adapter.markNotificationFailed(args) : adapter.markNotificationAmbiguous(args);
      };
      const initial = await seedJob(client);
      await acknowledge(initial);
      assert.equal((await client.query("select status from intake_outbox_jobs where job_id = $1", [initial])).rows[0].status, status);
      await assert.rejects(acknowledge(initial), /acknowledgement rejected/);
      const id = await seedJob(client);
      const lease = (await claim(client)).rows[0];
      assert.equal(lease.job_id, id);
      const token = String(lease.lease_token);
      await assert.rejects(acknowledge(id), /acknowledgement rejected/);
      await assert.rejects(acknowledge(id, randomUUID()), /acknowledgement rejected/);
      await client.query("update intake_outbox_jobs set leased_until = now() - interval '1 second' where job_id = $1", [id]);
      await assert.rejects(acknowledge(id, token), /acknowledgement rejected/);
      const replacement = (await claim(client)).rows[0];
      const currentToken = String(replacement.lease_token);
      assert.notEqual(currentToken, token);
      const before = (await client.query("select * from intake_outbox_jobs where job_id = $1", [id])).rows;
      await assert.rejects(acknowledge(id, token), /acknowledgement rejected/);
      await assert.rejects(acknowledge(id), /acknowledgement rejected/);
      assert.deepEqual((await client.query("select * from intake_outbox_jobs where job_id = $1", [id])).rows, before);
      await acknowledge(id, currentToken);
      const terminal = (await client.query("select * from intake_outbox_jobs where job_id = $1", [id])).rows;
      assert.equal(terminal[0].status, status);
      assert.equal(terminal[0].lease_token, null);
      assert.equal(terminal[0].leased_until, null);
      await assert.rejects(acknowledge(id, currentToken), /acknowledgement rejected/);
      await assert.rejects(acknowledge(id), /acknowledgement rejected/);
      assert.deepEqual((await client.query("select * from intake_outbox_jobs where job_id = $1", [id])).rows, terminal);
    }
  });
});

test("PostgreSQL SOS-103 known-retryable notification is claimable only after delay", options, async () => {
  await fixture(url!, async ({ client, store }) => {
    const adapter = store(), id = String(await seedJob(client));
    const token = await adapter.claimNotification(id);
    assert.ok(token);
    await adapter.startNotificationSend({ notificationJobId: id, leaseToken: token });
    await adapter.markNotificationRetryable({ notificationJobId: id, leaseToken: token, error: 'Explicit rate limit rejection' });
    assert.equal((await client.query('select status from intake_outbox_jobs where job_id = $1', [id])).rows[0].status, 'retryable');
    assert.equal(await adapter.claimNotification(id), null);
    await client.query("update intake_outbox_jobs set next_attempt_at = now() - interval '1 second' where job_id = $1", [id]);
    const next = await adapter.claimNotification(id);
    assert.ok(next);
    assert.notEqual(next, token);
    await assert.rejects(adapter.markNotificationAccepted({ notificationJobId: id, leaseToken: token, providerMessageId: 'late' }));
  });
});

test("PostgreSQL SOS-103 final expired lease is moved to review by the shared claim", options, async () => {
  await fixture(url!, async ({ client, store }) => {
    const id = String(await seedJob(client)), adapter = store();
    await client.query('update intake_outbox_jobs set attempts = 5 where job_id = $1', [id]);
    const token = await adapter.claimNotification(id);
    assert.ok(token);
    await client.query("update intake_outbox_jobs set leased_until = now() - interval '1 second' where job_id = $1", [id]);
    assert.equal((await claim(client)).rowCount, 0);
    const row = (await client.query('select * from intake_outbox_jobs where job_id = $1', [id])).rows[0];
    assert.equal(row.status, 'manual_review');
    assert.equal(row.attempts, 6);
    assert.equal(row.lease_token, null);
    assert.ok(row.next_attempt_at);
    await assert.rejects(adapter.markNotificationAccepted({ notificationJobId: id, leaseToken: token, providerMessageId: 'late' }));
  });
});

test("PostgreSQL SOS-103 send-start survives lost acknowledgement and forbids resend on expiry", options, async () => {
  await fixture(url!, async ({ client, store, closeStores }) => {
    const id = String(await seedJob(client)), adapter = store();
    const token = await adapter.claimNotification(id);
    assert.ok(token);
    await adapter.startNotificationSend({ notificationJobId: id, leaseToken: token });
    await assert.rejects(adapter.startNotificationSend({ notificationJobId: id, leaseToken: token }));
    await closeStores();
    await client.query("update intake_outbox_jobs set leased_until = now() - interval '1 second' where job_id = $1", [id]);
    assert.equal(await store().claimNotification(id), null);
    const row = (await client.query('select * from intake_outbox_jobs where job_id = $1', [id])).rows[0];
    assert.equal(row.status, 'manual_review');
    assert.equal(row.attempts, 1);
    assert.equal(row.lease_token, null);
  });
});

test("PostgreSQL SOS-103 request and recovery dispatch share exclusive ownership", options, async () => {
  await fixture(url!, async ({ client, store }) => {
    const { dispatchNotification } = await import('../../src/lib/intake/service');
    const id = String(await seedJob(client));
    const other = String(await seedJob(client));
    let sends = 0;
    const message = { idempotencyKey: 'synthetic-only', replyTo: undefined, subject: 'Synthetic', html: 'Synthetic', text: 'Synthetic' };
    const sender = { send: async () => { sends++; return { status: 'accepted' as const, providerMessageId: 'synthetic-only' }; } };
    await Promise.all([dispatchNotification(store(), id, message, () => sender), dispatchNotification(store(), id, message, () => sender)]);
    assert.equal(sends, 1);
    assert.equal((await client.query('select status from intake_outbox_jobs where job_id = $1', [id])).rows[0].status, 'accepted');
    assert.equal((await client.query('select status from intake_outbox_jobs where job_id = $1', [other])).rows[0].status, 'pending');
  });
});
