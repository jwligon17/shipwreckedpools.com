# SOS-101 — Approved implementation pack
Date: 2026-09-12
Architecture: APPROVED by Jason in the SOS conversation.
Execution stage: READY FOR LOCAL IMPLEMENTATION; not provisioned, deployed, or verified in production.

Master tracker (sole project-status authority):
https://docs.google.com/spreadsheets/d/1TRh44RN55zRBEo684plNOdsxdWZ0UHXoctVyPDLBoBI/edit
Source discovery, preserved unchanged:
https://drive.google.com/file/d/1jFrQ_8HqmSUp_R3C66mzlsKoFHZSNDgk/view
Earlier review brief, retained as historical review context:
https://drive.google.com/file/d/1jNuw5Qo_qhG-gPuYqNgWGGboGStnYTWS/view

## For Jason: the next action
Place a working copy of this file in the selected website repository (for example, docs/SOS-101_Approved_Implementation_Pack.md) and ask Codex to execute BUILD A below. Copying this task into the repository is a handoff, not a second editable project tracker. Bring the resulting report back to the SOS conversation. No repeated approval of the architecture is needed.

## Confirmed facts and decisions
- The selected website repository is shipwreckedpools.com; the submitted discovery used C:\Users\krist\shipwreckedpools.com.
- The discovery reports Next.js App Router, TypeScript, React, Tailwind, npm, and the existing POST /api/contact handler with Resend notifications. It reports no application database or authentication layer. Recheck the relevant files before changing them; the report is not proof of the deployed commit or live configuration.
- Hosting providers: Squarespace and Vercel. The owners can change environment settings. Squarespace's exact domain/DNS/site role is not established. Do not change DNS or Squarespace.
- Production inquiry recipient: info@shipwreckedpools.com. Kristen is the primary responder; Jason is the backup. These names are roles, not invented authentication-account identifiers or new email addresses.
- The owner approved private PostgreSQL storage plus a restricted, automatically refreshed Drive-facing lead view. Customer operational data may therefore reside outside Google Drive. Drive remains the documentation and project-control home.
- Reuse a suitable existing PostgreSQL resource if one is actually verified. Otherwise, Neon through Vercel Marketplace is the candidate provider. Its account-specific costs, limits, region, environment mapping, and access must be reviewed before any new cloud resource is provisioned or connected. Approval of this architecture is not an unlimited spending authorization.
- Keep Resend and the existing info@ workflow. LSA is not paused per the owner; its payments-profile permissions issue is a separate track. No LSA changes are part of this task.
- Skimmer API access is not a dependency for this task. No scraping or replacement service-management application.
- Staffed response hours, escalation timing, final operating users, and the To Do transition are not yet approved. Record Kristen's ownership and a next action now; leave automated deadline/escalation timers disabled and explicitly unconfigured. Do not invent 24/7 coverage or a fifteen-minute promise.

## Authority and boundaries
This pack carries the approved architecture and current responder configuration forward. It explicitly supersedes the earlier discovery's suggestions to put operational lead rows in the project Master Tracker, treat CSV-only output as durable capture, default new inquiries to Jason, or silently revert to email-only success. Preserve that discovery as evidence; do not rewrite it to hide the changes.

Read existing AGENTS.md and scoped repository guidance. Preserve unrelated and untracked work, including DISCOVERY_REPORT.md. Work only in the selected website repository. A local feature branch named sos-101-durable-intake may be created if safe; do not reset, stash, overwrite work, push, merge to main, or trigger deployment. Stop if branching would discard changes.

Local dependency installation and tests for this bounded task are permitted subject to the user's Codex approval controls. Prefer npm ci with the existing lockfile, then add only the minimal justified dependencies needed for PostgreSQL access and testing; record exact changes. Do not upgrade Next/React broadly or run automatic audit fixes. Use the Windows cmd /c npm workaround where required; do not weaken global execution policy.

No new paid services, cloud database provisioning (even a zero-price tier before the agreed cost review), cloud integrations, migrations against existing databases, production environment changes, live customer records, real form submissions, real email/SMS, public admin routes, or Google Sheet sharing changes in BUILD A. Use synthetic fixtures and stub external send/sync adapters.

## BUILD A — implement the local capture core, not another discovery-only report
Give a short plan and then implement the smallest reviewable change. Do not stop at a plan when the work below can be performed locally. Check current code rather than treating the discovery as executable source.

### 1. Preserve and validate the existing form contract
Inspect src/app/api/contact/route.ts and the main contact, giveaway-estimate, and giveaway-opt-in components. Preserve their existing visual design. Separate validated submission intent from acquisition channel: a giveaway-only opt-in or a phone-click analytics event must not create a sales opportunity automatically. Reproduce the suspected opt-in/schema mismatch using a synthetic test before claiming it exists.

Normalize only required data with explicit length and type limits, keeping supplied business context. Preserve the honeypot. Bound request size, handle malformed JSON, and define a production-capable abuse/rate-limit gate; an in-memory limiter is not multi-instance protection. Do not add a paid abuse-control service silently. Keep untrusted text out of HTML without escaping and out of SQL except as parameters.

Capture allowlisted source fields when available; missing attribution stays unknown. Separate form/page identity from Google/LSA/referral channel attribution. A generic advertising click ID alone is not proof a lead came from LSA. Do not manufacture first-touch history. Strip URL query strings from saved landing-page paths unless an allowlisted field is intentionally extracted. No submitted contact details in URLs, analytics events, or broad logs.

### 2. Build a transactional PostgreSQL adapter and migration files
Use the smallest maintainable adapter compatible with the current repository. Do not introduce a large ORM or generate a new application unless existing conventions make that necessary. Write versioned SQL migrations; do not apply them to an existing remote database.

The transaction must atomically persist:
1. A validated source event and stable source_event_id.
2. An actionable opportunity for genuine service inquiries, assigned to Kristen with Jason as backup and a clear next action.
3. Durable jobs for notification and the eventual Drive projection.

Suggested logical fields: source_event_id, client_submission_token, payload_hash, received_at_utc, submission_intent, source_channel/source_detail, allowed attribution, normalized contact fields, optional structured property fields, customer_message, opportunity_id, pipeline_stage, owner_role, backup_role, next_action, next_action_due_at (nullable while hours are unconfigured), notification_status, projection_status, created_at, updated_at. Keep secrets and financial/payment details out of these rows.

Enforce idempotency using database uniqueness plus a transaction, not check-then-insert or an in-memory map. Keep the same browser submission token for retries of the same payload. Same token plus changed normalized payload returns a defined conflict. Concurrent identical retries return the same committed event ID without an extra opportunity or outbox job. A genuinely new submission gets a new token and can create a new inquiry even for an existing contact. Tentative person/property matching is a separate concern; do not merge on name alone.

### 3. Save before notification and retain recoverable work
Use the existing /api/contact route. A valid durable capture must commit before any Resend attempt. Success means the server accepted and saved the inquiry, not that email was delivered or a service start was booked. A database failure must not show false success: return a useful retriable error and retain form inputs on the current page.

Implement a bounded, concurrency-safe outbox processor with claim/lease semantics, capped attempts, backoff, and a visible failed/manual-review state. Two workers must not intentionally send the same job concurrently. Do not rely on work continuing after a serverless request returns. Supply a protected integration point plus a documented worker/scheduler requirement, but do not enable remote triggers in this pass.

Use a stable email idempotency key and an unchanged notification payload across retries. Preserve pending/accepted/failed/uncertain states; provider acceptance is not inbox delivery. Handle the ambiguous case where the provider accepted an email but the local acknowledgement write failed. Resend documents a 24-hour provider idempotency window; do not promise exactly-once email delivery beyond it. A stale ambiguous job must be reconciled or held for review, not blindly resent. The database's event deduplication is separate and must not expire merely because the provider's email window does.

Tests must stub Resend completely: do not use info@ or even a provider test inbox for real sends in BUILD A. In production configuration later, CONTACT_TO_EMAIL remains info@shipwreckedpools.com; CONTACT_FROM_EMAIL must use the already verified sender, not a guessed new address.

### 4. Prepare the Drive-facing view without making it a second database
PostgreSQL is the authoritative operational record. The eventual restricted Lead Inbox in Drive is an automatically refreshed view; the project Master Tracker never stores live customer inquiries. Customer field edits and status changes must have one authenticated operational path, with authorization checks, rather than two manually maintained editable copies.

Define the allowlisted projection and test a stub interface now. Include stable opportunity IDs, owner, next action, state, and last_synced_at so stale data is visible. Use durable retryable projection jobs and single-writer/update-by-ID behavior; do not build an unguarded append-only flow that duplicates rows on replay. Export text using raw-safe semantics to prevent spreadsheet-formula injection. Do not sync raw message bodies, access codes, secrets, or unnecessary personal data into broad reports.

An actual Google Sheets credential, target file, user access, and scheduler need separate environment setup. The ChatGPT Drive connector does not automatically authorize the website. Do not create a public endpoint to list or edit inquiries while waiting for authentication. No admin UI is required in BUILD A. Full SOS-101 acceptance still requires a protected owner-visible record/view, not merely backend tables.

### 5. Validate and report
Inspect package scripts before executing them. The discovery found no test script: add one minimal appropriate harness instead of claiming tests already exist. Run the scoped tests and appropriate lint, type-check, and build commands that can run safely in this environment. Do not weaken validation or conceal a pre-existing failure to obtain a green result.

If an already approved disposable LOCAL PostgreSQL test instance is available, use it for transaction and concurrency integration tests. Otherwise write those tests and clearly mark them NOT RUN until an approved test instance exists. Mock tests do not prove database race behavior or persistence across restarts. Never use a production database as a test fixture.

Required cases:
- Main inquiry produces one event, one opportunity, and the intended jobs.
- Concurrent identical token replay does not create duplicates.
- Same token with different normalized payload conflicts without overwriting.
- New legitimate inquiry from the same contact is still possible.
- Giveaway-only and honeypot payloads do not become sales opportunities.
- Invalid/oversized requests are rejected safely.
- Database failure preserves form input and does not claim capture succeeded.
- Notification failure after commit leaves a recoverable saved inquiry.
- Process failure after commit/before send leaves a job that can be recovered.
- Ambiguous provider acknowledgement, duplicate worker execution, and stale retry window are handled explicitly.
- Drive projection failure does not undo capture; replay does not duplicate rows in the tested contract.
- No secrets/customer personal data leak to browser bundles, analytics, URLs, or logs; malicious formula-like text remains text.
- No public customer-list route or unauthorized worker execution.

Update docs/CODEX_RUN_STATUS.md, and create/update docs/SOS-101_IMPLEMENTATION_REPORT.md with: changed files, branch/commit context, commands and actual results, tests not run, architecture choices, environment VARIABLE NAMES only, remaining cost/access decisions, rollback limits, and next small task. Report code written, tests passed, cloud connected, deployed, and operationally verified as distinct states.

BUILD A is complete when local code and truthful test evidence are ready for review. It does NOT close the parent SOS-101 milestone.

## BUILD B — cost/access checkpoint before any cloud setup
Prepare the following facts from the actual account when access exists; otherwise ask for a redacted screenshot, never a secret:
- Correct Vercel team/project and repository/deployed-commit relationship.
- Existing connected storage that can safely be reused, or the exact candidate Neon plan shown at installation.
- Monthly minimum, metered/overage behavior, compute/storage/transfer limits, backup/restore retention, test isolation, region, and any automation/worker charges. Do not promise a permanent $0 bill from a public free-tier label.
- Selected Development/Preview environment and a separate test database containing synthetic data. Do not allow an integration to inject test credentials into Production automatically.
- Least-privilege server credentials, safe secret placement, and one restricted Google Sheet target without granting access to all company files.
- A sustainable scheduled outbox recovery path and monitored failure queue. Do not call a manual one-off retry command automatic recovery.

Costs and this concrete setup are reviewed before provisioning. This is not a request to reconsider the approved architecture; it is the agreed spending/access gate.

## BUILD C — staging and controlled release, not authorized in BUILD A
After the environment gate is approved, run real database concurrency/restart tests, validate authenticated owner access and the Drive view, confirm missing staff schedule rules or keep timers disabled, prove recovery/backup, and have Kristen verify the workflow. Only then request a separate preview/production release approval and one labeled synthetic live test. No push or deployment in the initial local task.

LSA permissions troubleshooting and later outcome analysis remain independent. SEO edits remain in SOS-109 rather than being mixed into this code patch. Do not require those unrelated tasks to finish before local capture work.

## Reference documentation checked 2026-09-12
- Vercel external PostgreSQL integrations: https://vercel.com/docs/postgres
- Marketplace setup and environment-variable injection: https://vercel.com/docs/marketplace-storage
- Neon Marketplace listing (not an account-specific price quote): https://vercel.com/marketplace/neon
- Resend idempotency and retry window: https://resend.com/docs/dashboard/emails/idempotency-keys
- Codex bounded-task and testing guidance: https://openai.com/business/guides-and-resources/how-openai-uses-codex/

The operational requirements and proposed build order above are this project's design decisions, not claims that the vendors automatically implement them.

## Administrative handoff status
The attempt to upload this new pack into Drive and the attempt to record the approval/status changes in the live Master Tracker were both blocked in this session. A subsequent read confirmed SOS-101 still displays Review; no new approval decision rows were added. The owner approval in this conversation is valid, but the tracker has not caught up. The proposed status is Ready for local implementation, not Verified. Keep this pack as the local execution handoff; do not treat an unsaved decision ID as a live record. Upload a reference copy to branch 21 when authorized file access is available.
