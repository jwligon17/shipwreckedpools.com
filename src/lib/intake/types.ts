export type PreferredContactMethod = "text" | "phone" | "email";

export type SubmissionIntent = "service_inquiry" | "giveaway_estimate" | "giveaway_opt_in";

export type IntakeValidationResult =
  | { ok: true; submission: NormalizedSubmission }
  | { ok: false; status: number; error: string; suppressed?: boolean };

export type SourceAttribution = {
  sourceChannel: "website_form" | "website_giveaway" | "unknown";
  sourceDetail: string;
  landingPagePath: string | null;
  referrerHost: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmTerm: string | null;
  utmContent: string | null;
  gclid: string | null;
  gbraid: string | null;
  wbraid: string | null;
};

export type NormalizedSubmission = {
  clientSubmissionToken: string;
  payloadHash: string;
  submissionIntent: SubmissionIntent;
  actionable: boolean;
  contactName: string | null;
  contactEmail: string;
  contactPhone: string | null;
  contactPhoneDigits: string | null;
  preferredContactMethod: PreferredContactMethod;
  serviceAddress: string | null;
  serviceCity: string | null;
  serviceState: string | null;
  serviceZipCode: string | null;
  poolType: string | null;
  poolSize: string | null;
  filterType: string | null;
  debrisExposure: string | null;
  currentPoolCaretaker: string | null;
  wantsFreeEstimate: boolean | null;
  customerMessage: string | null;
  source: SourceAttribution;
};

export type OpportunityRecord = {
  opportunityId: string;
  ownerRole: "Jason";
  backupRole: "Kristen";
  pipelineStage: "new" | "giveaway_only";
  nextAction: string;
  nextActionDueAt: string | null;
};

export type CapturedIntake = {
  sourceEventId: string;
  opportunity: OpportunityRecord | null;
  notificationJobId: string | null;
  projectionJobId: string | null;
  idempotencyStatus: "created" | "replayed";
};

export type NotificationSendResult =
  | { status: "accepted"; providerMessageId: string | null }
  | { status: "failed"; error: string; retryable?: boolean }
  | { status: "ambiguous"; providerMessageId: string | null; error: string };

export type NotificationMessage = {
  idempotencyKey: string;
  replyTo: string | undefined;
  subject: string;
  html: string;
  text: string;
};

export type NotificationSender = {
  send(message: NotificationMessage): Promise<NotificationSendResult>;
};

export type DriveProjectionRow = {
  opportunityId: string | null;
  sourceEventId: string;
  ownerRole: string | null;
  backupRole: string | null;
  pipelineStage: string;
  nextAction: string | null;
  nextActionDueAt: string | null;
  contactName: string | null;
  contactEmail: string;
  contactPhone: string | null;
  sourceChannel: string;
  sourceDetail: string;
  lastSyncedAt: string;
};

export type IntakeStore = {
  captureSubmission(submission: NormalizedSubmission): Promise<CapturedIntake>;
  claimNotification(notificationJobId: string): Promise<string | null>;
  startNotificationSend(args: { notificationJobId: string; leaseToken: string }): Promise<void>;
  markNotificationRetryable(args: { notificationJobId: string; leaseToken: string; error: string }): Promise<void>;
  markNotificationAccepted(args: {
    notificationJobId: string;
    leaseToken?: string;
    providerMessageId: string | null;
  }): Promise<void>;
  markNotificationFailed(args: { notificationJobId: string; error: string; leaseToken?: string }): Promise<void>;
  markNotificationAmbiguous(args: {
    notificationJobId: string;
    leaseToken?: string;
    providerMessageId: string | null;
    error: string;
  }): Promise<void>;
};
