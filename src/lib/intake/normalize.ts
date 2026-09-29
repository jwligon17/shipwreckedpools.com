import { createHash, randomUUID } from "node:crypto";

import {
  IntakeValidationResult,
  NormalizedSubmission,
  PreferredContactMethod,
  SubmissionIntent,
  SourceAttribution,
} from "./types";
import { normalizeWhitespace, nullableText, stableJson } from "./safety";

export const MAX_CONTACT_REQUEST_BYTES = 32 * 1024;

type IncomingContactBody = Record<string, unknown>;

const allowedAttributionFields = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gbraid",
  "wbraid",
] as const;

function text(body: IncomingContactBody, key: string, maxLength: number) {
  return normalizeWhitespace(String(body[key] ?? ""), maxLength);
}

function firstText(body: IncomingContactBody, keys: string[], maxLength: number) {
  for (const key of keys) {
    const value = text(body, key, maxLength);
    if (value) return value;
  }
  return "";
}

function email(value: string) {
  return value.trim().toLowerCase().slice(0, 254);
}

function phoneDigits(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 20);
  return digits.length > 0 ? digits : null;
}

function isPreferredContactMethod(value: string): value is PreferredContactMethod {
  return value === "text" || value === "phone" || value === "email";
}

function safePath(value: string) {
  if (!value) return null;

  try {
    const parsed = value.startsWith("http") ? new URL(value) : new URL(value, "https://example.com");
    return parsed.pathname.slice(0, 512);
  } catch {
    return value.split("?")[0].slice(0, 512) || null;
  }
}

function referrerHost(value: string) {
  if (!value) return null;
  try {
    return new URL(value).host.slice(0, 255);
  } catch {
    return null;
  }
}

function attribution(body: IncomingContactBody): SourceAttribution {
  const source = text(body, "source", 120);
  const mode = text(body, "mode", 40);
  const isGiveaway = mode === "giveaway" || source === "free-estimate-pool-skimmer-giveaway";
  const landingPagePath = safePath(text(body, "landingPagePath", 1024) || text(body, "page_path", 1024));
  const allowed = Object.fromEntries(
    allowedAttributionFields.map((field) => [field, nullableText(body[field], 255)]),
  ) as Record<(typeof allowedAttributionFields)[number], string | null>;

  return {
    sourceChannel: isGiveaway ? "website_giveaway" : "website_form",
    sourceDetail: source || (isGiveaway ? "free-estimate-pool-skimmer-giveaway" : "contact"),
    landingPagePath,
    referrerHost: referrerHost(text(body, "referrer", 1024)),
    utmSource: allowed.utm_source,
    utmMedium: allowed.utm_medium,
    utmCampaign: allowed.utm_campaign,
    utmTerm: allowed.utm_term,
    utmContent: allowed.utm_content,
    gclid: allowed.gclid,
    gbraid: allowed.gbraid,
    wbraid: allowed.wbraid,
  };
}

function hashSubmission(submission: Omit<NormalizedSubmission, "payloadHash">) {
  return createHash("sha256").update(stableJson(submission)).digest("hex");
}

export function parseContactRequestText(rawBody: string): IntakeValidationResult {
  if (Buffer.byteLength(rawBody, "utf8") > MAX_CONTACT_REQUEST_BYTES) {
    return { ok: false, status: 413, error: "Request is too large." };
  }

  let body: IncomingContactBody;
  try {
    const parsed = JSON.parse(rawBody) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return { ok: false, status: 400, error: "Malformed request." };
    }
    body = parsed as IncomingContactBody;
  } catch {
    return { ok: false, status: 400, error: "Malformed JSON." };
  }

  return normalizeContactBody(body);
}

export function normalizeContactBody(body: IncomingContactBody): IntakeValidationResult {
  const honeypot = text(body, "company", 120);
  if (honeypot.length > 0) {
    return { ok: false, status: 200, error: "", suppressed: true };
  }

  const token = text(body, "clientSubmissionToken", 120) || randomUUID();
  const source = attribution(body);
  const mode = text(body, "mode", 40);
  const isGiveaway = mode === "giveaway" || source.sourceDetail === "free-estimate-pool-skimmer-giveaway";
  const firstName = text(body, "firstName", 80);
  const lastName = text(body, "lastName", 80);
  const combinedName = normalizeWhitespace(`${firstName} ${lastName}`, 160);
  const contactName = text(body, "name", 160) || combinedName;
  const contactEmail = email(text(body, "email", 254));
  const phone = firstText(body, ["phone"], 40);
  const digits = phoneDigits(phone);
  const wantsFreeEstimate = text(body, "wantsFreeEstimate", 8) === "no" ? false : true;
  const preferredRaw = text(body, "preferredContactMethod", 20);
  const preferredContactMethod: PreferredContactMethod = isPreferredContactMethod(preferredRaw)
    ? preferredRaw
    : isGiveaway
      ? wantsFreeEstimate
        ? "phone"
        : "email"
      : "text";

  const customerMessage = isGiveaway
    ? firstText(body, ["biggestPoolIssue", "biggestIssue"], 2000)
    : text(body, "comment", 2000);
  const hasGiveawayOperationalFields =
    firstName.length > 0 ||
    lastName.length > 0 ||
    phone.length > 0 ||
    customerMessage.length > 0 ||
    text(body, "address", 240).length > 0;
  const isGiveawayOptIn = isGiveaway && !hasGiveawayOperationalFields;
  const errors: string[] = [];

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
    errors.push("Valid email is required.");
  }

  if (isGiveawayOptIn) {
    // Email-only giveaway opt-ins are durable source events, not sales opportunities.
  } else if (isGiveaway) {
    if (firstName.length < 2) errors.push("First name is required.");
    if (lastName.length < 2) errors.push("Last name is required.");
    if (!digits || digits.length < 10) errors.push("Valid phone is required.");
    if (text(body, "address", 240).length < 4) errors.push("Address is required.");
    if (text(body, "city", 120).length < 2) errors.push("City is required.");
    if (text(body, "state", 40).length < 2) errors.push("State is required.");
    if (text(body, "zipCode", 20).replace(/\D/g, "").length < 5) {
      errors.push("Valid ZIP code is required.");
    }
    if (!firstText(body, ["poolType", "poolKind"], 120)) errors.push("Pool type is required.");
    if (!text(body, "poolSize", 120)) errors.push("Pool size is required.");
    if (!text(body, "filterType", 120)) errors.push("Filter type is required.");
    if (!text(body, "debrisExposure", 120)) errors.push("Debris exposure is required.");
    if (!firstText(body, ["currentPoolCaretaker", "poolCaretaker"], 160)) {
      errors.push("Pool caretaker is required.");
    }
    if (customerMessage.length < 10) errors.push("Biggest issue must be at least 10 characters.");
  } else {
    if (contactName.length < 2) errors.push("Name is required.");
    if (!digits || digits.length < 10) errors.push("Valid phone is required.");
    if (customerMessage.length < 10) errors.push("Comment must be at least 10 characters.");
    if (!isPreferredContactMethod(preferredContactMethod)) {
      errors.push("Preferred contact method is invalid.");
    }
  }

  if (errors.length > 0) {
    return { ok: false, status: 400, error: errors[0] };
  }

  const intent: SubmissionIntent = isGiveawayOptIn
    ? "giveaway_opt_in"
    : isGiveaway
      ? "giveaway_estimate"
      : "service_inquiry";
  const actionable = intent === "service_inquiry" || (intent === "giveaway_estimate" && wantsFreeEstimate);
  const baseSubmission = {
    clientSubmissionToken: token,
    submissionIntent: intent,
    actionable,
    contactName: contactName || null,
    contactEmail,
    contactPhone: phone || null,
    contactPhoneDigits: digits,
    preferredContactMethod,
    serviceAddress: nullableText(body.address, 240),
    serviceCity: nullableText(body.city, 120),
    serviceState: nullableText(body.state, 40),
    serviceZipCode: nullableText(body.zipCode, 20),
    poolType: nullableText(body.poolType ?? body.poolKind, 120),
    poolSize: nullableText(body.poolSize, 120),
    filterType: nullableText(body.filterType, 120),
    debrisExposure: nullableText(body.debrisExposure, 120),
    currentPoolCaretaker: nullableText(body.currentPoolCaretaker ?? body.poolCaretaker, 160),
    wantsFreeEstimate: isGiveaway ? wantsFreeEstimate : null,
    customerMessage: customerMessage || null,
    source,
  };

  return {
    ok: true,
    submission: {
      ...baseSubmission,
      payloadHash: hashSubmission(baseSubmission),
    },
  };
}
