import { escapeHtml } from "./safety";
import { CapturedIntake, NormalizedSubmission, NotificationMessage } from "./types";

function row(label: string, value: string | null | undefined) {
  if (!value) return "";
  return `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(value)}</td></tr>`;
}

export function buildNotificationMessage(args: {
  submission: NormalizedSubmission;
  capture: CapturedIntake;
  contactSubjectPrefix: string;
  fromEmail: string;
  toEmail: string;
}): NotificationMessage & { from: string; to: string } {
  const { submission, capture, contactSubjectPrefix, fromEmail, toEmail } = args;
  const name = submission.contactName ?? "Unknown";
  const isGiveaway = submission.submissionIntent !== "service_inquiry";
  const subject = isGiveaway
    ? `[Shipwrecked Pools] Giveaway form from ${name}`
    : `${contactSubjectPrefix} New contact request from ${name}`;
  const sourceEventLine = `Source event ID: ${capture.sourceEventId}`;
  const opportunityLine = capture.opportunity
    ? `Opportunity ID: ${capture.opportunity.opportunityId}`
    : "Opportunity ID: not created";

  const htmlRows = [
    row("Source event ID", capture.sourceEventId),
    row("Opportunity ID", capture.opportunity?.opportunityId ?? "not created"),
    row("Name", submission.contactName),
    row("Email", submission.contactEmail),
    row("Phone", submission.contactPhone),
    row("Preferred contact method", submission.preferredContactMethod),
    row("Submission intent", submission.submissionIntent),
    row("Source", submission.source.sourceDetail),
    row("Landing page", submission.source.landingPagePath),
    row("Address", submission.serviceAddress),
    row("City", submission.serviceCity),
    row("State", submission.serviceState),
    row("Zip Code", submission.serviceZipCode),
    row("Pool type", submission.poolType),
    row("Pool size", submission.poolSize),
    row("Filter type", submission.filterType),
    row("Tree/debris exposure", submission.debrisExposure),
    row("Who currently takes care of the pool", submission.currentPoolCaretaker),
    row(
      "Wants free estimate",
      submission.wantsFreeEstimate === null ? null : submission.wantsFreeEstimate ? "Yes" : "No",
    ),
  ].filter(Boolean);
  const escapedMessage = escapeHtml(submission.customerMessage ?? "");
  const textFields = [
    sourceEventLine,
    opportunityLine,
    `Name: ${submission.contactName ?? ""}`,
    `Email: ${submission.contactEmail}`,
    `Phone: ${submission.contactPhone ?? ""}`,
    `Preferred contact method: ${submission.preferredContactMethod}`,
    `Submission intent: ${submission.submissionIntent}`,
    `Source: ${submission.source.sourceDetail}`,
    submission.source.landingPagePath ? `Landing page: ${submission.source.landingPagePath}` : "",
    submission.serviceAddress ? `Address: ${submission.serviceAddress}` : "",
    submission.serviceCity ? `City: ${submission.serviceCity}` : "",
    submission.serviceState ? `State: ${submission.serviceState}` : "",
    submission.serviceZipCode ? `Zip Code: ${submission.serviceZipCode}` : "",
    submission.poolType ? `Pool type: ${submission.poolType}` : "",
    submission.poolSize ? `Pool size: ${submission.poolSize}` : "",
    submission.filterType ? `Filter type: ${submission.filterType}` : "",
    submission.debrisExposure ? `Tree/debris exposure: ${submission.debrisExposure}` : "",
    submission.currentPoolCaretaker
      ? `Who currently takes care of the pool: ${submission.currentPoolCaretaker}`
      : "",
    submission.wantsFreeEstimate === null
      ? ""
      : `Wants free estimate: ${submission.wantsFreeEstimate ? "Yes" : "No"}`,
    "",
    "Message:",
    submission.customerMessage ?? "",
  ].filter((line) => line.length > 0);

  return {
    from: fromEmail,
    to: toEmail,
    replyTo: submission.contactEmail || undefined,
    subject,
    idempotencyKey: `source-event:${capture.sourceEventId}:notification:v1`,
    html: [
      `<h2>${isGiveaway ? "Giveaway Form Submission" : "New contact / quote request"}</h2>`,
      '<table cellpadding="6" cellspacing="0" border="0">',
      ...htmlRows,
      "</table>",
      "<p><strong>Message</strong></p>",
      `<p>${escapedMessage.replace(/\n/g, "<br />")}</p>`,
    ].join(""),
    text: textFields.join("\n"),
  };
}
