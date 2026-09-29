import assert from "node:assert/strict";
import test from "node:test";
import { PostgresIntakeStore } from "../../src/lib/intake/postgres";
import { normalizeContactBody } from "../../src/lib/intake/normalize";
import { IntakeConflictError } from "../../src/lib/intake/store";

type Result = { rows: Record<string, unknown>[]; rowCount: number };
function fakeStore(query: (sql: string, params?: unknown[]) => Promise<Result>) {
  let releases = 0;
  // Do not call the constructor or import pg: exercise the real adapter against a protocol stub.
  const store = Object.create(PostgresIntakeStore.prototype) as PostgresIntakeStore;
  Object.defineProperty(store, "poolPromise", { value: Promise.resolve({ connect: async () => ({
    query, release: () => { releases++; },
  }) }) });
  return { store, releases: () => releases };
}
function input() {
  const result = normalizeContactBody({ clientSubmissionToken: "synthetic-token", name: "Fictional",
    email: "synthetic@example.invalid", phone: "3255550100", comment: "Synthetic request", preferredContactMethod: "email" });
  assert.ok(result.ok);
  return result.submission;
}
const empty: Result = { rows: [], rowCount: 0 };

test("capture waits for token serialization before reading and preserves replay IDs", async () => {
  const submission = input();
  let unlock!: () => void;
  let locked!: () => void;
  const waiting = new Promise<void>((resolve) => { locked = resolve; });
  const barrier = new Promise<void>((resolve) => { unlock = resolve; });
  const calls: string[] = [];
  const fake = fakeStore(async (sql, params) => {
    calls.push(sql);
    if (sql.includes("pg_advisory_xact_lock")) {
      assert.deepEqual(params, [submission.clientSubmissionToken]);
      assert.match(sql, /hashtextextended\(\$1, 0\)/);
      locked();
      await barrier;
    }
    if (sql.includes("from intake_source_events")) {
      assert.match(sql, /for update of se\s*$/);
      return { rows: [{ source_event_id: "event", payload_hash: submission.payloadHash,
        opportunity_id: "opportunity", notification_job_id: "notification", projection_job_id: "projection",
        owner_role: "Jason", backup_role: "Kristen", pipeline_stage: "new", next_action: "Contact", next_action_due_at: null }], rowCount: 1 };
    }
    return empty;
  });
  const pending = fake.store.captureSubmission(submission);
  await waiting;
  assert.equal(calls.length, 2);
  assert.equal(calls[0], "begin isolation level read committed");
  unlock();
  const result = await pending;
  assert.equal(result.idempotencyStatus, "replayed");
  assert.equal(result.sourceEventId, "event");
  assert.equal(result.opportunity?.opportunityId, "opportunity");
  assert.equal(result.notificationJobId, "notification");
  assert.equal(result.projectionJobId, "projection");
  assert.equal(calls.at(-1), "commit");
  assert.equal(fake.releases(), 1);
});

test("capture lock failure rolls back and releases without reading or writing intake", async () => {
  const calls: string[] = [];
  const failure = new Error("synthetic lock failure");
  const fake = fakeStore(async (sql) => {
    calls.push(sql);
    if (sql.includes("pg_advisory_xact_lock")) throw failure;
    return empty;
  });
  await assert.rejects(fake.store.captureSubmission(input()), (error) => error === failure);
  assert.equal(calls.length, 3);
  assert.equal(calls.at(-1), "rollback");
  assert.equal(fake.releases(), 1);
});

test("capture conflict after serialization never commits or inserts", async () => {
  const calls: string[] = [];
  const fake = fakeStore(async (sql) => {
    calls.push(sql);
    return sql.includes("from intake_source_events")
      ? { rows: [{ source_event_id: "event", payload_hash: "different" }], rowCount: 1 } : empty;
  });
  await assert.rejects(fake.store.captureSubmission(input()), IntakeConflictError);
  assert.ok(!calls.some((sql) => sql === "commit" || /insert into/.test(sql)));
  assert.equal(calls.at(-1), "rollback");
  assert.equal(fake.releases(), 1);
});

test("notification adapter binds lease ownership and reports rejected updates for every outcome", async () => {
  for (const status of ["accepted", "failed", "ambiguous"] as const) {
    for (const leaseToken of [undefined, "synthetic-lease"]) {
      for (const rowCount of [0, 1]) {
        const fake = fakeStore(async (sql, params) => {
          assert.match(sql, /status = 'pending' and attempts = 0/);
          assert.match(sql, /status = 'leased' and lease_token = \$5::uuid/);
          assert.match(sql, /leased_until > clock_timestamp\(\)/);
          assert.equal(params?.[1], status);
          assert.equal(params?.[4], leaseToken ?? null);
          return { rows: [], rowCount };
        });
        const args = { notificationJobId: "synthetic-job", leaseToken, providerMessageId: "synthetic-message", error: "synthetic failure" };
        const pending = status === "accepted" ? fake.store.markNotificationAccepted(args)
          : status === "failed" ? fake.store.markNotificationFailed(args) : fake.store.markNotificationAmbiguous(args);
        if (rowCount === 0) await assert.rejects(pending, /acknowledgement rejected/);
        else await pending;
        assert.equal(fake.releases(), 1);
      }
    }
  }
});
