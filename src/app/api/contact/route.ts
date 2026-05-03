import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

type PreferredContactMethod = "text" | "phone" | "email";

type ContactPayload = {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  poolType: string;
  poolSize: string;
  filterType: string;
  debrisExposure: string;
  currentPoolCaretaker: string;
  biggestPoolIssue: string;
  wantsFreeEstimate: "yes" | "no";
  source: string;
  comment: string;
  preferredContactMethod: PreferredContactMethod;
  company: string;
  mode?: "contact" | "giveaway";
};

type IncomingContactBody = Partial<ContactPayload> & {
  poolKind?: string;
  poolCaretaker?: string;
  biggestIssue?: string;
};

function logJson(prefix: string, payload: Record<string, unknown>) {
  console.info(`${prefix} ${JSON.stringify(payload)}`);
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function hasValue(value: string) {
  return value.trim().length > 0;
}

function getSafeErrorDetails(error: unknown) {
  if (!error || typeof error !== "object") {
    return {
      resendErrorStatusCode: null,
      resendErrorCode: null,
      resendErrorType: null,
      resendErrorRaw: null,
    };
  }

  const record = error as Record<string, unknown>;

  return {
    resendErrorStatusCode:
      typeof record.statusCode === "number"
        ? record.statusCode
        : typeof record.status === "number"
          ? record.status
          : null,
    resendErrorCode:
      typeof record.code === "string"
        ? record.code
        : typeof record.errorCode === "string"
          ? record.errorCode
          : null,
    resendErrorType:
      typeof record.type === "string"
        ? record.type
        : typeof record.errorType === "string"
          ? record.errorType
          : null,
    resendErrorRaw: JSON.stringify(record),
  };
}

function validateContactPayload(payload: ContactPayload) {
  const errors: string[] = [];
  const normalizedName = payload.name.trim() || `${payload.firstName.trim()} ${payload.lastName.trim()}`.trim();

  if (normalizedName.length < 2) {
    errors.push("Name is required.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim())) {
    errors.push("Valid email is required.");
  }

  if (payload.phone.replace(/\D/g, "").length < 10) {
    errors.push("Valid phone is required.");
  }

  if (payload.comment.trim().length < 10) {
    errors.push("Comment must be at least 10 characters.");
  }

  if (!["text", "phone", "email"].includes(payload.preferredContactMethod)) {
    errors.push("Preferred contact method is invalid.");
  }

  return errors;
}

function validateGiveawayPayload(payload: ContactPayload) {
  const errors: string[] = [];

  if (payload.firstName.trim().length < 2) {
    errors.push("First name is required.");
  }

  if (payload.lastName.trim().length < 2) {
    errors.push("Last name is required.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim())) {
    errors.push("Valid email is required.");
  }

  if (payload.phone.replace(/\D/g, "").length < 10) {
    errors.push("Valid phone is required.");
  }

  if (payload.address.trim().length < 4) {
    errors.push("Address is required.");
  }

  if (payload.city.trim().length < 2) {
    errors.push("City is required.");
  }

  if (payload.state.trim().length < 2) {
    errors.push("State is required.");
  }

  if (payload.zipCode.replace(/\D/g, "").length < 5) {
    errors.push("Valid ZIP code is required.");
  }

  if (payload.poolType.trim().length < 1) {
    errors.push("Pool type is required.");
  }

  if (payload.poolSize.trim().length < 1) {
    errors.push("Pool size is required.");
  }

  if (payload.filterType.trim().length < 1) {
    errors.push("Filter type is required.");
  }

  if (payload.debrisExposure.trim().length < 1) {
    errors.push("Debris exposure is required.");
  }

  if (payload.currentPoolCaretaker.trim().length < 1) {
    errors.push("Pool caretaker is required.");
  }

  if (payload.biggestPoolIssue.trim().length < 10) {
    errors.push("Biggest issue must be at least 10 characters.");
  }

  if (!["yes", "no"].includes(payload.wantsFreeEstimate)) {
    errors.push("Free estimate choice is invalid.");
  }

  return errors;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as IncomingContactBody;
    const requestedSource = (body.source ?? "").toString().trim();
    const isGiveawaySource = requestedSource === "free-estimate-pool-skimmer-giveaway";
    const isGiveawayMode = body.mode === "giveaway";

    const firstName = (body.firstName ?? "").toString();
    const lastName = (body.lastName ?? "").toString();
    const fallbackName = `${firstName.trim()} ${lastName.trim()}`.trim();

    const payload: ContactPayload = {
      name: ((body.name ?? "").toString().trim() || fallbackName).toString(),
      firstName,
      lastName,
      email: (body.email ?? "").toString(),
      phone: (body.phone ?? "").toString(),
      address: (body.address ?? "").toString(),
      city: (body.city ?? "").toString(),
      state: (body.state ?? "").toString(),
      zipCode: (body.zipCode ?? "").toString(),
      poolType: (body.poolType ?? body.poolKind ?? "").toString(),
      poolSize: (body.poolSize ?? "").toString(),
      filterType: (body.filterType ?? "").toString(),
      debrisExposure: (body.debrisExposure ?? "").toString(),
      currentPoolCaretaker: (body.currentPoolCaretaker ?? body.poolCaretaker ?? "").toString(),
      biggestPoolIssue: (body.biggestPoolIssue ?? body.biggestIssue ?? "").toString(),
      wantsFreeEstimate: body.wantsFreeEstimate === "no" ? "no" : "yes",
      source: requestedSource,
      comment: (body.comment ?? "").toString(),
      preferredContactMethod: (body.preferredContactMethod ?? "text") as PreferredContactMethod,
      company: (body.company ?? "").toString(),
      mode: isGiveawayMode || isGiveawaySource ? "giveaway" : "contact",
    };

    if (payload.company.trim().length > 0) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const errors =
      payload.mode === "giveaway"
        ? validateGiveawayPayload(payload)
        : validateContactPayload(payload);

    if (errors.length > 0) {
      return NextResponse.json({ error: errors[0] }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const contactFromEmail = process.env.CONTACT_FROM_EMAIL;
    const contactToEmail = process.env.CONTACT_TO_EMAIL;
    const contactSubjectPrefix = process.env.CONTACT_SUBJECT_PREFIX;
    const resendTestMode = process.env.RESEND_TEST_MODE === "true";
    const resendTestInbox = "delivered@resend.dev";
    const resolvedContactToEmail = resendTestMode ? resendTestInbox : contactToEmail;
    const isExpectedContactInbox = contactToEmail === "info@shipwreckedpools.com";

    logJson("[contact-config]", {
      hasResendApiKey: Boolean(resendApiKey),
      contactFromEmail: contactFromEmail ?? null,
      contactToEmail: contactToEmail ?? null,
      resolvedContactToEmail: resolvedContactToEmail ?? null,
      resendTestMode,
      isExpectedContactInbox,
      hasContactSubjectPrefix: Boolean(contactSubjectPrefix),
    });

    if (!resendApiKey || !contactFromEmail || !resolvedContactToEmail || !contactSubjectPrefix) {
      return NextResponse.json(
        { error: "Contact service is temporarily unavailable." },
        { status: 503 },
      );
    }

    const resend = new Resend(resendApiKey);
    const email = payload.email.trim();
    const isGiveawaySubmission = payload.mode === "giveaway";
    const normalizedSource =
      payload.source || (isGiveawaySubmission ? "free-estimate-pool-skimmer-giveaway" : "contact");
    const isGiveawayLandingSubmission =
      normalizedSource === "free-estimate-pool-skimmer-giveaway";
    const giveawayFullName = `${payload.firstName.trim()} ${payload.lastName.trim()}`.trim();
    const name = isGiveawaySubmission ? giveawayFullName : payload.name.trim();
    const phone = payload.phone.trim();
    const comment = isGiveawaySubmission
      ? payload.biggestPoolIssue.trim()
      : payload.comment.trim();
    const preferredContactMethod = isGiveawaySubmission
      ? payload.wantsFreeEstimate === "yes"
        ? "phone"
        : "email"
      : payload.preferredContactMethod;
    const subject = isGiveawaySubmission
      ? isGiveawayLandingSubmission
        ? `[Shipwrecked Pools] Giveaway form from ${giveawayFullName || "Unknown"}`
        : `[Shipwrecked Pools] Giveaway lead from ${giveawayFullName || "Unknown"}`
      : `${contactSubjectPrefix} New contact request from ${name}`;
    const submittedAt = new Date().toISOString();
    const escapedComment = escapeHtml(comment);
    const giveawayHtmlFields: Array<[string, string]> = [
      ["First name", payload.firstName.trim()],
      ["Last name", payload.lastName.trim()],
      ["Email", email],
      ["Phone", phone],
      ["Address", payload.address.trim()],
      ["City", payload.city.trim()],
      ["State", payload.state.trim()],
      ["Zip Code", payload.zipCode.trim()],
      ["Pool type", payload.poolType.trim()],
      ["Pool size", payload.poolSize.trim()],
      ["Filter type", payload.filterType.trim()],
      ["Tree/debris exposure", payload.debrisExposure.trim()],
      ["Who currently takes care of the pool", payload.currentPoolCaretaker.trim()],
      ["Wants free estimate", payload.wantsFreeEstimate === "yes" ? "Yes" : "No"],
      ["Source", normalizedSource],
      ["Submission timestamp", submittedAt],
    ];
    const giveawayRows = giveawayHtmlFields
      .filter(([, value]) => hasValue(value))
      .map(
        ([label, value]) =>
          `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(value)}</td></tr>`,
      );
    const giveawayTextFields = giveawayHtmlFields
      .filter(([, value]) => hasValue(value))
      .map(([label, value]) => `${label}: ${value}`);

    const sendResult = await resend.emails.send({
      from: contactFromEmail,
      to: resolvedContactToEmail,
      subject,
      replyTo: email || undefined,
      html: [
        ...(isGiveawaySubmission
          ? [
              "<h2>Giveaway Estimate Form Submission</h2>",
              isGiveawayLandingSubmission
                ? "<p><strong>Source label:</strong> Free Estimate Pool Skimmer Giveaway Page</p>"
                : `<p><strong>Source label:</strong> ${escapeHtml(normalizedSource)}</p>`,
              "<table cellpadding=\"6\" cellspacing=\"0\" border=\"0\">",
              ...giveawayRows,
              "</table>",
              "<p><strong>Biggest issue right now</strong></p>",
              `<p>${escapeHtml(payload.biggestPoolIssue.trim()).replace(/\n/g, "<br />")}</p>`,
            ]
          : [
              "<h2>New contact / quote request</h2>",
              "<table cellpadding=\"6\" cellspacing=\"0\" border=\"0\">",
              `<tr><td><strong>Name</strong></td><td>${name}</td></tr>`,
              `<tr><td><strong>Email</strong></td><td>${email}</td></tr>`,
              `<tr><td><strong>Phone</strong></td><td>${phone}</td></tr>`,
              `<tr><td><strong>Preferred contact method</strong></td><td>${preferredContactMethod}</td></tr>`,
              `<tr><td><strong>Source</strong></td><td>${normalizedSource}</td></tr>`,
              `<tr><td><strong>Submission timestamp</strong></td><td>${submittedAt}</td></tr>`,
              "</table>",
              "<p><strong>Comment</strong></p>",
              `<p>${escapedComment.replace(/\n/g, "<br />")}</p>`,
            ]),
      ].join(""),
      text: [
        ...(isGiveawaySubmission
          ? [
              "Giveaway Estimate Form Submission",
              isGiveawayLandingSubmission
                ? "Source label: Free Estimate Pool Skimmer Giveaway Page"
                : `Source label: ${normalizedSource}`,
              "",
              ...giveawayTextFields,
              "",
              "Biggest issue right now:",
              payload.biggestPoolIssue.trim(),
            ]
          : [
              "New contact / quote request",
              "",
              `Name: ${name}`,
              `Email: ${email}`,
              `Phone: ${phone}`,
              `Preferred contact method: ${preferredContactMethod}`,
              `Source: ${normalizedSource}`,
              `Submission timestamp: ${submittedAt}`,
              "",
              "Comment:",
              comment,
            ]),
      ].join("\n"),
    });

    if (sendResult.error) {
      const safeErrorDetails = getSafeErrorDetails(sendResult.error);
      console.error(
        `[contact-resend-error] ${JSON.stringify({
          contactFromEmail,
          contactToEmail,
          resolvedContactToEmail,
          resendTestMode,
          resendErrorName: sendResult.error.name ?? null,
          resendErrorMessage: sendResult.error.message ?? null,
          resendErrorStatusCode: safeErrorDetails.resendErrorStatusCode,
          resendErrorCode: safeErrorDetails.resendErrorCode,
          resendErrorType: safeErrorDetails.resendErrorType,
          resendErrorRaw: safeErrorDetails.resendErrorRaw,
        })}`,
      );
      return NextResponse.json(
        { error: "Unable to process request right now. Please try again." },
        { status: 502 },
      );
    }

    logJson("[contact-send-success]", {
      contactFromEmail,
      contactToEmail,
      resolvedContactToEmail,
      resendTestMode,
      resendEmailId: sendResult.data?.id ?? null,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact-send-failed]", error);
    return NextResponse.json(
      { error: "Unable to process request right now. Please try again." },
      { status: 500 },
    );
  }
}
