import assert from "node:assert/strict";
import test, { TestContext } from "node:test";

import { handleContactRequestText } from "../../src/lib/intake/service";
import { MemoryIntakeStore } from "../../src/lib/intake/store";
import { NotificationMessage, NotificationSendResult } from "../../src/lib/intake/types";

const emailEnv = {
  RESEND_API_KEY: "re_synthetic_not_a_real_key",
  CONTACT_FROM_EMAIL: "sender@example.invalid",
  CONTACT_TO_EMAIL: "owner@example.invalid",
  CONTACT_SUBJECT_PREFIX: "[Synthetic Recovery]",
};
const accepted = { status: "accepted" as const, providerMessageId: "synthetic-message" };

function inquiry(overrides: Record<string, unknown> = {}) {
  return JSON.stringify({
    clientSubmissionToken: "synthetic-recovery-token",
    name: "Synthetic <Customer>", email: "SYNTHETIC@example.invalid", phone: "3255550100",
    preferredContactMethod: "text", comment: "Synthetic pool request <script>unsafe</script>",
    landingPagePath: "/contact", company: "", ...overrides,
  });
}

function giveaway() {
  return JSON.stringify({
    clientSubmissionToken: "synthetic-giveaway-token", firstName: "Synthetic", lastName: "Customer",
    email: "synthetic@example.invalid", phone: "3255550100", address: "123 Synthetic Test Way",
    city: "Abilene", state: "TX", zipCode: "79601", poolType: "In-ground", poolSize: "Synthetic size",
    filterType: "Cartridge", debrisExposure: "Moderate", currentPoolCaretaker: "Synthetic caretaker",
    biggestPoolIssue: "Synthetic pool issue for local testing only.", wantsFreeEstimate: "yes",
    source: "free-estimate-pool-skimmer-giveaway", mode: "giveaway", company: "",
  });
}

type ProviderRequest = { body: Record<string, unknown>; key: string };
function mockProvider(t: TestContext, respond: (request: ProviderRequest) => Response | Promise<Response>) {
  const requests: ProviderRequest[] = [];
  t.mock.method(globalThis, "fetch", async (input: string | URL | Request, init?: RequestInit) => {
    assert.equal(String(input), "https://api.resend.com/emails");
    assert.equal(init?.method, "POST");
    const key = new Headers(init?.headers).get("idempotency-key");
    assert.ok(key);
    const request = { body: JSON.parse(String(init?.body)) as Record<string, unknown>, key };
    requests.push(request);
    return respond(request);
  });
  return requests;
}
const providerResponse = (body: object, status = 200) => new Response(JSON.stringify(body), {
  status, headers: { "content-type": "application/json" },
});

test("missing storage uses the configured Resend sender/recipient, escaped fields and no capture IDs", async (t) => {
  const requests = mockProvider(t, () => providerResponse({ id: "synthetic-message" }));
  const response = await handleContactRequestText(inquiry(), { env: emailEnv });
  assert.deepEqual(response, { status: 200, body: { ok: true, accepted: true, delivery: "email_only" } });
  assert.equal(requests.length, 1);
  const { body, key } = requests[0];
  assert.equal(body.from, emailEnv.CONTACT_FROM_EMAIL);
  assert.equal(body.to, emailEnv.CONTACT_TO_EMAIL);
  assert.equal(body.reply_to, "synthetic@example.invalid");
  assert.equal(body.subject, "[Synthetic Recovery] New contact request from Synthetic <Customer>");
  assert.match(String(body.html), /Synthetic &lt;Customer&gt;/);
  assert.match(String(body.html), /&lt;script&gt;unsafe&lt;\/script&gt;/);
  assert.match(String(body.text), /Phone: 3255550100/);
  assert.match(String(body.text), /Preferred contact method: text/);
  assert.doesNotMatch(String(body.text), /Source event ID|Opportunity ID/);
  assert.doesNotMatch(String(body.html), /Source event ID|Opportunity ID/);
  assert.match(key, /^email-only:[a-f0-9]{64}:notification:v1$/);
});

test("email-only success waits for provider acknowledgment", async () => {
  let release!: () => void;
  const pending = new Promise<void>((resolve) => { release = resolve; });
  let completed = false;
  const result = handleContactRequestText(inquiry(), { env: {}, notificationSender: {
    send: async () => { await pending; return accepted; },
  } }).then((response) => { completed = true; return response; });
  await Promise.resolve();
  assert.equal(completed, false);
  release();
  assert.equal((await result).body.accepted, true);
});

test("provider rejection, uncertainty, missing ID and thrown errors never claim email-only success", async () => {
  const results: Array<NotificationSendResult | Error> = [
    { status: "failed", error: "synthetic rejection" },
    { status: "ambiguous", providerMessageId: "uncertain-id", error: "synthetic uncertainty" },
    { status: "accepted", providerMessageId: null },
    { status: "accepted", providerMessageId: "" },
    new Error("synthetic transport exception"),
  ];
  for (const result of results) {
    const response = await handleContactRequestText(inquiry(), { env: {}, notificationSender: {
      send: async () => { if (result instanceof Error) throw result; return result; },
    } });
    assert.equal(response.status, 503);
    assert.equal(response.body.ok, undefined);
    assert.equal(response.body.accepted, undefined);
    assert.equal(response.body.error, "Unable to confirm your request was sent.");
  }
});

test("Resend returned errors and missing acknowledgment are checked even without thrown exceptions", async (t) => {
  let responseBody = { id: "must-not-override-error", name: "validation_error", message: "synthetic rejection" } as object;
  let status = 422;
  mockProvider(t, () => providerResponse(responseBody, status));
  assert.equal((await handleContactRequestText(inquiry(), { env: emailEnv })).status, 503);
  responseBody = {};
  status = 200;
  assert.equal((await handleContactRequestText(inquiry(), { env: emailEnv })).status, 503);
});

test("invalid, oversized and suppressed submissions send no notification", async () => {
  let sends = 0;
  const deps = { env: {}, notificationSender: { send: async () => { sends++; return accepted; } } };
  assert.equal((await handleContactRequestText("{", deps)).status, 400);
  assert.equal((await handleContactRequestText(inquiry({ email: "invalid" }), deps)).status, 400);
  assert.equal((await handleContactRequestText(JSON.stringify({ blob: "x".repeat(40 * 1024) }), deps)).status, 413);
  assert.deepEqual(await handleContactRequestText(inquiry({ company: "bot" }), deps), {
    status: 200, body: { ok: true, accepted: false },
  });
  assert.equal(sends, 0);
});

test("simultaneous email-only retries send identical bodies and provider idempotency keys", async (t) => {
  // Model provider-side deduplication, not an application database or permanent delivery guarantee.
  const sent = new Map<string, ProviderRequest>();
  const requests = mockProvider(t, (request) => {
    if (sent.has(request.key)) assert.deepEqual(request, sent.get(request.key));
    else sent.set(request.key, request);
    return providerResponse({ id: "synthetic-message" });
  });
  const results = await Promise.all([1, 2].map(() => handleContactRequestText(inquiry(), { env: emailEnv })));
  assert.ok(results.every((result) => result.body.accepted === true));
  assert.equal(requests.length, 2);
  assert.equal(sent.size, 1);
});

test("uncertain provider response retries the same key; corrected failed input gets a distinct key", async (t) => {
  let first = true;
  const requests = mockProvider(t, () => {
    if (first) { first = false; throw new Error("synthetic response lost after provider acceptance"); }
    return providerResponse({ id: "synthetic-message" });
  });
  assert.equal((await handleContactRequestText(inquiry(), { env: emailEnv })).status, 503);
  assert.equal((await handleContactRequestText(inquiry(), { env: emailEnv })).body.accepted, true);
  assert.deepEqual(requests[0], requests[1]);
  const corrected = await handleContactRequestText(inquiry({ comment: "Corrected synthetic request after failure." }), { env: emailEnv });
  assert.equal(corrected.status, 200);
  assert.notEqual(requests[1].key, requests[2].key);
});

test("both active form payloads reach email-only notification with giveaway field coverage", async () => {
  const messages: NotificationMessage[] = [];
  const deps = { env: {}, notificationSender: { send: async (message: NotificationMessage) => {
    messages.push(message); return accepted;
  } } };
  assert.equal((await handleContactRequestText(inquiry(), deps)).body.accepted, true);
  assert.equal((await handleContactRequestText(giveaway(), deps)).body.accepted, true);
  for (const field of ["Synthetic Customer", "synthetic@example.invalid", "3255550100", "123 Synthetic Test Way",
    "Abilene", "TX", "79601", "In-ground", "Synthetic size", "Cartridge", "Moderate", "Synthetic caretaker",
    "Synthetic pool issue for local testing only.", "Wants free estimate: Yes"]) {
    assert.ok(messages[1].text.includes(field), `Giveaway notification retains ${field}`);
  }
});

test("only literal true enables Resend test routing and excludes genuine lead acceptance", async (t) => {
  const requests = mockProvider(t, () => providerResponse({ id: "synthetic-message" }));
  for (const mode of [undefined, "false", "true", "TRUE", "1"]) {
    const response = await handleContactRequestText(inquiry(), { env: { ...emailEnv, RESEND_TEST_MODE: mode } });
    assert.equal(response.status, 200);
    assert.equal(requests.at(-1)?.body.to, mode === "true" ? "delivered@resend.dev" : emailEnv.CONTACT_TO_EMAIL);
    assert.equal(response.body.accepted, mode !== "true");
    assert.equal(response.body.isTest, mode === "true" ? true : undefined);
  }
});

test("explicit or partial storage configuration never silently uses email-only recovery", async () => {
  let sends = 0;
  const notificationSender = { send: async () => { sends++; return accepted; } };
  for (const env of [
    { INTAKE_DURABLE_STORE: "postgres" }, { INTAKE_DURABLE_STORE: "invalid" },
    { DATABASE_URL: "synthetic-not-connected" }, { POSTGRES_URL: "synthetic-not-connected" },
    { POSTGRES_PRISMA_URL: "synthetic-not-connected" },
  ]) {
    const response = await handleContactRequestText(inquiry(), { env, notificationSender });
    assert.equal(response.status, 503);
  }
  assert.equal(sends, 0);
  const store = new MemoryIntakeStore();
  const response = await handleContactRequestText(inquiry(), { env: {}, store, notificationSender });
  assert.equal(response.body.delivery, "memory");
  assert.ok(response.body.sourceEventId);
  const memory = await handleContactRequestText(inquiry(), {
    env: { INTAKE_DURABLE_STORE: "memory" }, notificationSender,
  });
  assert.equal(memory.body.delivery, "memory");
});

test("missing email configuration is an honest failure without a provider attempt", async (t) => {
  const fetchMock = t.mock.method(globalThis, "fetch", async () => {
    assert.fail("Missing configuration must never call a provider");
  });
  for (const missing of ["RESEND_API_KEY", "CONTACT_FROM_EMAIL", "CONTACT_TO_EMAIL"] as const) {
    const response = await handleContactRequestText(inquiry(), { env: { ...emailEnv, [missing]: undefined } });
    assert.equal(response.status, 503);
    assert.equal(response.body.accepted, undefined);
  }
  assert.equal(fetchMock.mock.callCount(), 0);
});
