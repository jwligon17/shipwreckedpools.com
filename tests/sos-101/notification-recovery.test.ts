import assert from "node:assert/strict";
import test from "node:test";
import { MemoryIntakeStore } from "../../src/lib/intake/store";
import { normalizeContactBody } from "../../src/lib/intake/normalize";
import { dispatchNotification, handleContactRequestText } from "../../src/lib/intake/service";
import { OUTBOX_LEASE_SECONDS, OUTBOX_MAX_ATTEMPTS, OUTBOX_RETRY_SECONDS } from "../../src/lib/intake/outbox";
import { NotificationMessage, NotificationSender } from "../../src/lib/intake/types";
const message: NotificationMessage = { idempotencyKey: "synthetic-event", replyTo: undefined, subject: "Synthetic", html: "Synthetic", text: "Synthetic" };
async function saved(store: MemoryIntakeStore) {
  const input = normalizeContactBody({ clientSubmissionToken: "sos103", name: "Fictional", email: "synthetic@example.invalid", phone: "3255550100", comment: "Synthetic inquiry" });
  assert.ok(input.ok);
  const capture = await store.captureSubmission(input.submission);
  assert.ok(capture.notificationJobId);
  return capture.notificationJobId;
}

test("explicitly retryable rejection is delayed, reclaimable, and capped at review", async () => {
  let now = 0, sends = 0;
  const store = new MemoryIntakeStore(() => now), id = await saved(store);
  const sender: NotificationSender = { send: async () => { sends++; return { status: "failed", retryable: true, error: "rate limit" }; } };
  for (let attempt = 1; attempt <= OUTBOX_MAX_ATTEMPTS; attempt++) {
    await dispatchNotification(store, id, message, () => sender);
    assert.equal(sends, attempt);
    assert.equal(store.notificationStates.get(id), `${attempt === OUTBOX_MAX_ATTEMPTS ? 'manual_review' : 'retryable'}:rate limit`);
    await dispatchNotification(store, id, message, () => sender);
    assert.equal(sends, attempt);
    now += OUTBOX_RETRY_SECONDS * 1000 + 1;
  }
  assert.equal(await store.claimNotification(id), null);
});

test("initial and recovery dispatch race invokes the sender exactly once", async () => {
  const store = new MemoryIntakeStore(), id = await saved(store);
  let sends = 0;
  const sender: NotificationSender = { send: async () => { sends++; return { status: "accepted", providerMessageId: "synthetic" }; } };
  await Promise.all([dispatchNotification(store, id, message, () => sender), dispatchNotification(store, id, message, () => sender)]);
  assert.equal(sends, 1);
  assert.equal(store.notificationStates.get(id), "accepted:synthetic");
});

test("timeout and explicit ambiguity never become resend candidates", async () => {
  for (const throws of [false, true]) {
    let now = 0;
    const store = new MemoryIntakeStore(() => now), id = await saved(store);
    await dispatchNotification(store, id, message, () => ({ send: async () => {
      if (throws) throw new Error("timeout");
      return { status: "ambiguous", providerMessageId: null, error: "unknown" };
    } }));
    assert.match(store.notificationStates.get(id)!, /^ambiguous:/);
    now += 1000000;
    assert.equal(await store.claimNotification(id), null);
  }
});

test("expired final attempt and expired send-start both require review", async () => {
  for (const started of [false, true]) {
    let now = 0;
    const store = new MemoryIntakeStore(() => now), id = await saved(store);
    let token: string | null = null;
    for (let attempt = 0; attempt < (started ? 1 : OUTBOX_MAX_ATTEMPTS); attempt++) {
      token = await store.claimNotification(id);
      assert.ok(token);
      if (started) await store.startNotificationSend({ notificationJobId: id, leaseToken: token });
      now += OUTBOX_LEASE_SECONDS * 1000 + 1;
    }
    assert.equal(await store.claimNotification(id), null);
    assert.equal(store.notificationStates.get(id), "manual_review");
    await assert.rejects(store.markNotificationAccepted({ notificationJobId: id, leaseToken: token!, providerMessageId: "late" }));
  }
});

test("lost acknowledgement after provider acceptance cannot cause automatic resend", async () => {
  class LostAckStore extends MemoryIntakeStore {
    async markNotificationAccepted(): Promise<void> { throw new Error('storage unavailable'); }
    async markNotificationAmbiguous(): Promise<void> { throw new Error('storage unavailable'); }
  }
  let now = 0, sends = 0;
  const store = new LostAckStore(() => now), id = await saved(store);
  await dispatchNotification(store, id, message, () => ({ send: async () => {
    sends++; return { status: 'accepted', providerMessageId: 'synthetic' };
  } }));
  now += OUTBOX_LEASE_SECONDS * 1000 + 1;
  await dispatchNotification(store, id, message, () => { throw new Error('must not send'); });
  assert.equal(sends, 1);
  assert.equal(store.notificationStates.get(id), 'manual_review');
});

test("capture success survives claim and configuration-ack failures without sending", async () => {
  class ClaimFailure extends MemoryIntakeStore { async claimNotification(): Promise<string | null> { throw new Error('claim failed'); } }
  class AckFailure extends MemoryIntakeStore { async markNotificationFailed(): Promise<void> { throw new Error('ack failed'); } }
  for (const store of [new ClaimFailure(), new AckFailure()]) {
    const response = await handleContactRequestText(JSON.stringify({ clientSubmissionToken: 'saved', name: 'Fictional',
      email: 'synthetic@example.invalid', phone: '3255550100', comment: 'Synthetic inquiry' }), { store, env: {} });
    assert.equal(response.status, 200);
    assert.equal(response.body.ok, true);
    assert.ok(response.body.sourceEventId);
  }
});
