import { CapturedIntake, DriveProjectionRow, NormalizedSubmission } from "./types";
import { spreadsheetSafeText } from "./safety";

export function buildDriveProjectionRow(
  submission: NormalizedSubmission,
  capture: CapturedIntake,
  syncedAt = new Date().toISOString(),
): DriveProjectionRow {
  return {
    opportunityId: capture.opportunity?.opportunityId ?? null,
    sourceEventId: capture.sourceEventId,
    ownerRole: capture.opportunity?.ownerRole ?? null,
    backupRole: capture.opportunity?.backupRole ?? null,
    pipelineStage: capture.opportunity?.pipelineStage ?? "not_actionable",
    nextAction: spreadsheetSafeText(capture.opportunity?.nextAction ?? null),
    nextActionDueAt: capture.opportunity?.nextActionDueAt ?? null,
    contactName: spreadsheetSafeText(submission.contactName),
    contactEmail: spreadsheetSafeText(submission.contactEmail) ?? "",
    contactPhone: spreadsheetSafeText(submission.contactPhone),
    sourceChannel: submission.source.sourceChannel,
    sourceDetail: spreadsheetSafeText(submission.source.sourceDetail) ?? "unknown",
    lastSyncedAt: syncedAt,
  };
}
