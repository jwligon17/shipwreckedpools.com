import assert from "node:assert/strict";
import test from "node:test";

import { buildDriveProjectionRow } from "../../src/lib/intake/projection";
import { handleContactRequestText } from "../../src/lib/intake/service";
import { MemoryIntakeStore } from "../../src/lib/intake/store";
import {
  CapturedIntake,
  IntakeStore,
  NotificationMessage,
  NotificationSender,
} from "../../src/lib/intake/types";

const env = {
  CONTACT_FROM_EMAIL: "verified@example.com",
  CONTACT_TO_EMAIL: "info@shipwreckedpools.com",
  CONTACT_SUBJECT_PREFIX: "[Shipwrecked Pools]",
};

function servicePayload(overrides: Record<string, unknown> = {}) {
  return JSON.stringify({
    clientSubmissionToken: "token-service-1",
    name: "Taylor Customer",
    email: "Taylor@Example.com",
    phone: "(325) 555-1212",
    comment: "Please help with weekly pool cleaning.",
    preferredContactMethod: "text",
    landingPagePath: "/contact?name=Taylor&secret=keep-out",
    utm_source: "google",
    gclid: "test-click-id",
    company: "",
    ...overrides,
  });
}

function giveawayPayload(overrides: Record<string, unknown> = {}) {
  return JSON.stringify({
    clientSubmissionToken: "token-giveaway-1",
    firstName: "Taylor",
    lastName: "Customer",
    email: "taylor@example.com",
    phone: "3255551212",
    address: "123 Test Way",
    city: "Abilene",
    state: "TX",
    zipCode: "79605",
    poolType: "In-ground",
    poolSize: "15000 - 20000 gallons",
    filterType: "Cartridge",
    debrisExposure: "Moderate",
    currentPoolCaretaker: "I do it myself",
    biggestPoolIssue: "The water keeps turning cloudy after wind.",
    wantsFreeEstimate: "yes",
    source: "free-estimate-pool-skimmer-giveaway",
    mode: "giveaway",
    company: "",
    ...overrides,
  });
}

class CapturingSender implements NotificationSender {
  messages: NotificationMessage[] = [];
  constructor(private result: "accepted" | "failed" | "ambiguous" | "throw" = "accepted") {}

  async send(message: NotificationMessage) {
    this.messages.push(message);
    if (this.result === "throw") throw new Error("provider timeout");
    if (this.result === "failed") return { status: "failed" as const, error: "provider rejected" };
    if (this.result === "ambiguous") {
      return { status: "ambiguous" as const, providerMessageId: "msg_123", error: "ack write unknown" };
    }
    return { status: "accepted" as const, providerMessageId: "msg_123" };
  }
}

class FailingStore implements IntakeStore {
  async captureSubmission(): Promise<CapturedIntake> {
    throw new Error("database offline");
  }
  async claimNotification() { return null; }
  async startNotificationSend() {}
  async markNotificationRetryable() {}
  async markNotificationAccepted() {}
  async markNotificationFailed() {}
  async markNotificationAmbiguous() {}
}

test("main inquiry produces one event, one opportunity, and notification/projection jobs", async () => {
  const store = new MemoryIntakeStore();
  const sender = new CapturingSender();
  const response = await handleContactRequestText(servicePayload(), { store, notificationSender: sender, env });

  assert.equal(response.status, 200);
  assert.equal(response.body.ok, true);
  assert.ok(response.body.sourceEventId);
  assert.ok(response.body.opportunityId);
  assert.equal(sender.messages.length, 1);
  assert.match(sender.messages[0].idempotencyKey, /^source-event:/);
  assert.equal([...store.notificationStates.values()][0], "accepted:msg_123");
});

test("identical token replay returns the same event without another notification send", async () => {
  const store = new MemoryIntakeStore();
  const firstSender = new CapturingSender();
  const first = await handleContactRequestText(servicePayload(), {
    store,
    notificationSender: firstSender,
    env,
  });
  const secondSender = new CapturingSender();
  const second = await handleContactRequestText(servicePayload(), {
    store,
    notificationSender: secondSender,
    env,
  });

  assert.equal(first.status, 200);
  assert.equal(second.status, 200);
  assert.equal(second.body.sourceEventId, first.body.sourceEventId);
  assert.equal(second.body.opportunityId, first.body.opportunityId);
  assert.equal(firstSender.messages.length, 1);
  assert.equal(secondSender.messages.length, 0);
});

test("same token with changed normalized payload conflicts without overwriting", async () => {
  const store = new MemoryIntakeStore();
  await handleContactRequestText(servicePayload(), {
    store,
    notificationSender: new CapturingSender(),
    env,
  });
  const response = await handleContactRequestText(
    servicePayload({ comment: "This changed after the first submit." }),
    { store, notificationSender: new CapturingSender(), env },
  );

  assert.equal(response.status, 409);
});

test("new legitimate inquiry from same contact is possible with a new token", async () => {
  const store = new MemoryIntakeStore();
  const first = await handleContactRequestText(servicePayload(), {
    store,
    notificationSender: new CapturingSender(),
    env,
  });
  const second = await handleContactRequestText(
    servicePayload({ clientSubmissionToken: "token-service-2" }),
    { store, notificationSender: new CapturingSender(), env },
  );

  assert.equal(first.status, 200);
  assert.equal(second.status, 200);
  assert.notEqual(second.body.sourceEventId, first.body.sourceEventId);
});

test("giveaway-only opt-in and giveaway no-estimate payloads do not create sales opportunities", async () => {
  const store = new MemoryIntakeStore();
  const optIn = await handleContactRequestText(
    JSON.stringify({
      clientSubmissionToken: "token-opt-in",
      email: "optin@example.com",
      mode: "giveaway",
      source: "free-estimate-pool-skimmer-giveaway",
      company: "",
    }),
    { store, notificationSender: new CapturingSender(), env },
  );
  const noEstimate = await handleContactRequestText(
    giveawayPayload({ clientSubmissionToken: "token-giveaway-no-estimate", wantsFreeEstimate: "no" }),
    { store, notificationSender: new CapturingSender(), env },
  );

  assert.equal(optIn.status, 200);
  assert.equal(optIn.body.opportunityId, null);
  assert.equal(noEstimate.status, 200);
  assert.equal(noEstimate.body.opportunityId, null);
});

test("honeypot, malformed, invalid, and oversized requests are rejected safely", async () => {
  const store = new MemoryIntakeStore();
  const honeypot = await handleContactRequestText(servicePayload({ company: "bot" }), {
    store,
    notificationSender: new CapturingSender(),
    env,
  });
  const malformed = await handleContactRequestText("{", {
    store,
    notificationSender: new CapturingSender(),
    env,
  });
  const invalid = await handleContactRequestText(servicePayload({ email: "bad" }), {
    store,
    notificationSender: new CapturingSender(),
    env,
  });
  const oversized = await handleContactRequestText(JSON.stringify({ blob: "x".repeat(40 * 1024) }), {
    store,
    notificationSender: new CapturingSender(),
    env,
  });

  assert.deepEqual(honeypot, { status: 200, body: { ok: true } });
  assert.equal(malformed.status, 400);
  assert.equal(invalid.status, 400);
  assert.equal(oversized.status, 413);
});

test("database failure does not claim capture succeeded", async () => {
  const response = await handleContactRequestText(servicePayload(), {
    store: new FailingStore(),
    notificationSender: new CapturingSender(),
    env,
  });

  assert.equal(response.status, 503);
  assert.equal(response.body.ok, undefined);
});

test("notification failure after commit leaves a recoverable saved inquiry", async () => {
  const store = new MemoryIntakeStore();
  const response = await handleContactRequestText(servicePayload(), {
    store,
    notificationSender: new CapturingSender("failed"),
    env,
  });

  assert.equal(response.status, 200);
  assert.ok(response.body.sourceEventId);
  assert.equal([...store.notificationStates.values()][0], "failed:provider rejected");
});

test("missing notification config after commit still returns saved success", async () => {
  const store = new MemoryIntakeStore();
  const response = await handleContactRequestText(servicePayload(), {
    store,
    env: {},
  });

  assert.equal(response.status, 200);
  assert.ok(response.body.sourceEventId);
  assert.match([...store.notificationStates.values()][0], /^failed:Contact notification service/);
});

test("sender exception after commit is held as ambiguous without blind retry", async () => {
  const store = new MemoryIntakeStore();
  const response = await handleContactRequestText(servicePayload(), {
    store,
    notificationSender: new CapturingSender("throw"),
    env,
  });

  assert.equal(response.status, 200);
  assert.match([...store.notificationStates.values()][0], /^ambiguous::provider timeout/);
});

test("ambiguous provider acknowledgement is held for review state", async () => {
  const store = new MemoryIntakeStore();
  const response = await handleContactRequestText(servicePayload(), {
    store,
    notificationSender: new CapturingSender("ambiguous"),
    env,
  });

  assert.equal(response.status, 200);
  assert.equal([...store.notificationStates.values()][0], "ambiguous:msg_123:ack write unknown");
});

test("Drive projection contract is update-by-ID safe and spreadsheet-text safe", async () => {
  const store = new MemoryIntakeStore();
  const response = await handleContactRequestText(
    servicePayload({
      name: "=IMPORTXML(\"https://example.com\")",
      comment: "+formula text should stay text",
    }),
    { store, notificationSender: new CapturingSender(), env },
  );
  const normalized = {
    clientSubmissionToken: "x",
    payloadHash: "x",
    submissionIntent: "service_inquiry" as const,
    actionable: true,
    contactName: '=IMPORTXML("https://example.com")',
    contactEmail: "formula@example.com",
    contactPhone: "3255551212",
    contactPhoneDigits: "3255551212",
    preferredContactMethod: "text" as const,
    serviceAddress: null,
    serviceCity: null,
    serviceState: null,
    serviceZipCode: null,
    poolType: null,
    poolSize: null,
    filterType: null,
    debrisExposure: null,
    currentPoolCaretaker: null,
    wantsFreeEstimate: null,
    customerMessage: "+formula text should stay text",
    source: {
      sourceChannel: "website_form" as const,
      sourceDetail: "contact",
      landingPagePath: "/contact",
      referrerHost: null,
      utmSource: null,
      utmMedium: null,
      utmCampaign: null,
      utmTerm: null,
      utmContent: null,
      gclid: null,
      gbraid: null,
      wbraid: null,
    },
  };

  const row = buildDriveProjectionRow(normalized, {
    sourceEventId: response.body.sourceEventId ?? "missing",
    opportunity: response.body.opportunityId
      ? {
          opportunityId: response.body.opportunityId,
          ownerRole: "Jason",
          backupRole: "Kristen",
          pipelineStage: "new",
          nextAction: "Jason texts the customer about the pool service request.",
          nextActionDueAt: null,
        }
      : null,
    notificationJobId: "notification",
    projectionJobId: "projection",
    idempotencyStatus: "created",
  });

  assert.equal(response.status, 200);
  assert.match(row.contactName ?? "", /^'/);
  assert.equal(row.opportunityId, response.body.opportunityId);
});
