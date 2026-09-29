# SOS-005 Discovery Report

Date: 2026-09-12
Workspace: `C:\Users\krist\shipwreckedpools.com`

## Scope

This report is based on read-only inspection of the selected Shipwrecked Pools repository plus creation of this file. No packages were installed, no branch was changed, no production system was modified, no forms were submitted, and no neighboring projects were accessed.

The supplied SOS starter was not present as a distinct file in this repository. No `SOS`, `Company Operating System`, `master tracker`, `LSA`, or Skimmer API configuration files were found by repository search. The existing operating/checklist routine visible in this repo is documentation-based under `docs/` and `prompts/`, especially `docs/CODEX_RUN_STATUS.md`, `docs/human_only_tasks.md`, and `docs/human_inputs_needed.md`.

## Existing Architecture And Evidence

Inspected files and commands:

- `package.json`
- `package-lock.json`
- `README.md`
- `.env.example`
- `next.config.ts`
- `tsconfig.json`
- `src/app/layout.tsx`
- `src/lib/site.ts`
- `src/lib/analytics.ts`
- `src/components/analytics-events.tsx`
- `src/components/contact-form.tsx`
- `src/components/giveaway-estimate-form.tsx`
- `src/components/giveaway-opt-in-form.tsx`
- `src/app/api/contact/route.ts`
- `src/app/contact/page.tsx`
- `src/app/pages/free-estimate-pool-skimmer-giveaway/page.tsx`
- `src/content/site.ts`
- `docs/analytics_validation.md`
- `docs/human_only_tasks.md`
- `docs/human_inputs_needed.md`
- `docs/CODEX_RUN_STATUS.md`
- Commands inspected: `git status --short --branch`, `rg --files`, targeted `rg` searches, `node -v`, `cmd /c npm -v`, `Test-Path node_modules`

Framework:

- Next.js App Router, TypeScript, React, Tailwind CSS. Evidence: `README.md`, `package.json`, `src/app/*`, `tsconfig.json`, `tailwind.config.ts`.

Package manager:

- npm. Evidence: committed `package-lock.json`; no `yarn.lock`, `pnpm-lock.yaml`, or bun lockfile found in repo root.

Runtime:

- Current local Node.js is `v24.13.1`; npm is `11.8.0` via `cmd /c npm -v`.
- `package.json` has no root `engines` declaration.
- `package-lock.json` resolves `next` to `16.2.4`, whose lockfile entry declares Node `>=20.9.0`, so the installed Node version satisfies the resolved Next runtime requirement.
- Direct `npm -v` in PowerShell is blocked by the local PowerShell script execution policy for `npm.ps1`; `cmd /c npm -v` works.

Dependencies:

- `node_modules` is not present. Dependencies are not installed in this fresh clone.

Auth:

- No in-repo auth framework or session layer found. Searches did not find `next-auth`, `clerk`, `session`, or app auth routes.
- External pay/login links point to `https://shipwreckedpools.mypoolportal.com/auth/sign-in`, but this repo does not implement that auth.

Persistence:

- No application database, ORM, or durable lead storage found. Searches did not find Prisma, Supabase, Firebase, database configuration, or write paths.
- Inquiry handling currently sends email through Resend only.

Deployment:

- No deployment provider config was found in repo root. `next.config.ts` contains app redirects and cache headers, not provider-specific deployment configuration.
- Available production commands from `package.json`: `npm run build` runs `next build`; `npm run start` runs `next start`.

Local development command:

- `npm run dev`, which runs `next dev`.

Test/validation commands:

- `npm run lint`, which runs `eslint .`
- `npm run build`, which runs `next build`
- No `test` script is declared in `package.json`.
- Prior docs mention `npx tsc --noEmit`, but it is not a package script.

Environment variables:

- `.env.example` contains:
  - `NEXT_PUBLIC_SITE_URL`
  - `NEXT_PUBLIC_SITE_LIVE`
- Code also reads:
  - `RESEND_API_KEY`
  - `CONTACT_FROM_EMAIL`
  - `CONTACT_TO_EMAIL`
  - `CONTACT_SUBJECT_PREFIX`
  - `RESEND_TEST_MODE`
- `.env.local` is not present in this workspace.

## Current Inquiry Flow

Visible forms:

- Main quote form: `src/components/contact-form.tsx`, used by `src/app/contact/page.tsx`.
- Giveaway estimate form: `src/components/giveaway-estimate-form.tsx`, used by `src/app/pages/free-estimate-pool-skimmer-giveaway/page.tsx`.
- Giveaway email opt-in form: `src/components/giveaway-opt-in-form.tsx`.

Server handler:

- `src/app/api/contact/route.ts` handles `POST /api/contact`.
- It accepts both contact and giveaway payloads, validates required fields, uses a hidden `company` honeypot, and sends email through Resend.

Notification destinations:

- `CONTACT_TO_EMAIL` controls the destination inbox.
- If `RESEND_TEST_MODE=true`, the destination is overridden to Resend's test inbox `delivered@resend.dev`.
- The handler checks whether `CONTACT_TO_EMAIL === "info@shipwreckedpools.com"` and logs that boolean. This is an expectation check, not a configured value in the repo.

Spam controls:

- Client forms include hidden `company` fields.
- The server returns success without sending when `company` has a value.
- No CAPTCHA, rate limit, IP throttling, duplicate detection, or blocklist was found.

Durable storage:

- None. A valid inquiry is not written to a database, file, queue, CRM, sheet, or Skimmer record.

Where a valid inquiry can disappear or require retyping:

- If required Resend env vars are missing, the handler returns `503` and no durable copy exists.
- If Resend returns an error or times out, the handler returns an error and no durable copy exists.
- If the browser reloads or loses connection before a successful response, form values are not saved locally.
- If email is accepted but filtered, misrouted, or delivered to an unattended inbox, the site has no independent durable record to recover from.
- The giveaway opt-in form sends only email plus `mode: "giveaway"`; the current server-side giveaway validation requires full name, phone, address, pool fields, and issue description, so that opt-in path appears likely to fail validation if rendered/used.

## Business Phone, Email, LSA, And Skimmer

Phone:

- The business phone is present in `src/content/site.ts` as `325-665-8877`, with `tel:+13256658877` and `sms:+13256658877` CTAs.

Email:

- No public business email is centralized in `src/content/site.ts`.
- `src/app/api/contact/route.ts` expects `CONTACT_TO_EMAIL`; it contains a check for `info@shipwreckedpools.com`, but the actual value is environment-dependent and is not present in this clone.

LSA:

- No Local Services Ads API, notification mailbox, webhook, or inbox integration appears in this repo.
- LSA is recorded as active per task instruction, but repo inspection cannot verify campaign state or notification routing.
- Missing access is a blocker to integration design, not permission to scrape. The first release should leave the working LSA campaign unchanged and use a reviewed handoff/export or a notification inbox rule if access is provided.

Skimmer:

- No Skimmer API keys, SDK, import/export tooling, or plan controls were found.
- The word "skimmer" in this repo refers to the giveaway page for an Aiper pool skimmer, not confirmed Skimmer software integration.
- Skimmer API access is not required for the first release. If unavailable, use reviewed file handoff only: a stable CSV/export schema prepared by the website intake layer and imported manually after approval.

## Source Attribution And Personal Data Exposure

Existing attribution:

- The main contact form does not capture UTM, `gclid`, `gbraid`, `wbraid`, referrer, landing page, or first-touch data.
- Contact form success fires `generate_lead` with `form_name`, preferred contact method, and `page_path`.
- Phone and SMS clicks are tracked globally as `phone_click` and `text_click` with `link_url` and `page_path`.
- Giveaway estimate submissions hard-code `source: "free-estimate-pool-skimmer-giveaway"`.
- Server email includes a normalized source label, defaulting to `contact` or `free-estimate-pool-skimmer-giveaway`.

Personal data exposure:

- Form personal data is sent in a JSON POST body to `/api/contact`, not in query strings.
- Analytics payloads do not include name, email, address, comments, or pool details.
- `text_click` and `phone_click` include the `tel:`/`sms:` URL, which includes the business phone number, not customer personal data.
- Server logs include contact configuration details such as configured from/to email addresses and Resend send IDs. They do not log submitted lead payloads on the success path.
- Lead personal data is placed in email body content sent through Resend.

## Current Operating Checklist Handoff

The repository already uses docs as the operating trail:

- `docs/CODEX_RUN_STATUS.md` records completed prompt packs, changed files, validation commands, and blockers.
- `docs/human_only_tasks.md` lists off-repo tasks that require human/account access.
- `docs/human_inputs_needed.md` lists unresolved content/proof inputs.

To avoid a second manually maintained queue, SOS work should create exactly one summarized handoff row in the existing master tracker or Company Operating System, if authorized. The repo should keep implementation evidence and acceptance tests in code/docs, while the master tracker should hold status, owner, next action, due date, and link back to the relevant repo artifact. Without authorized Drive access, this report includes a proposed row only and does not apply it.

## Smallest Suitable Architecture Extension

Recommended first extension:

- Add a durable source event before email notification in the existing Next.js app.
- Keep the existing website forms and `/api/contact` route.
- Normalize every inbound form submission into one stable `source_event` shape.
- Persist the event to one approved durable store.
- Then send notification email.
- Return a stable event ID to the client on success.

Suitable first durable store options:

- Google Sheet in the existing Company Operating System, if that is already the team's operating source of truth. Tradeoff: low cost and easy owner visibility, but requires authorized Drive/Sheets access and care around personal data permissions.
- Airtable, if already used. Tradeoff: stronger lightweight CRM ergonomics, but adds a paid/external system and another queue if not already part of operations.
- Vercel Postgres/Neon/Supabase, if the site already deploys there and needs app-owned persistence. Tradeoff: better engineering durability, but less directly usable by nontechnical operations unless paired with an admin view or export.
- Email-only plus resend logs is not suitable for SOS-101 because it does not solve disappearance/retry/duplicate risk.

Smallest recommended path for first release:

- Use one existing authorized operating destination, preferably the existing Company Operating System tracker/sheet if it exists, rather than creating a parallel CRM.
- If Drive/Sheets access is not authorized during implementation, implement a reviewed CSV handoff/export schema first and do not scrape LSA or Skimmer.

Access/cost decisions:

- Do not change LSA campaign settings.
- Do not require Skimmer API access.
- Do not add a new paid CRM before validating one end-to-end website inquiry.
- Do not expose a residential address.
- Do not store secrets in code; use environment variables.

## Field Map

Website inquiry to stable source event:

| Website field | Stable source event field | Notes |
| --- | --- | --- |
| generated server-side | `source_event_id` | UUID or provider event ID; returned after durable write |
| generated server-side | `received_at` | ISO timestamp |
| route/path | `landing_page_path` | From client or request headers; avoid full URL with personal params |
| captured attribution | `source_channel` | `website_form`, `website_giveaway`, `phone_click`, `sms_click`, `lsa_manual`, etc. |
| captured attribution | `source_detail` | Example: `contact`, `free-estimate-pool-skimmer-giveaway`, `lsa_existing_campaign` |
| captured attribution | `utm_source` | Capture from URL only if present |
| captured attribution | `utm_medium` | Capture from URL only if present |
| captured attribution | `utm_campaign` | Capture from URL only if present |
| captured attribution | `gclid` / `gbraid` / `wbraid` | Capture but do not display in URLs after submit |
| `name` or `firstName` + `lastName` | `contact_name` | Normalize whitespace |
| `email` | `contact_email` | Lowercase/trim |
| `phone` | `contact_phone` | Store original and/or normalized digits |
| `preferredContactMethod` | `preferred_contact_method` | `text`, `phone`, or `email` |
| `address`, `city`, `state`, `zipCode` | `service_address` fields | Present for giveaway estimate; main contact currently asks for address in comment but has no separate field |
| `comment` or `biggestPoolIssue` | `customer_message` | Escape for notification rendering |
| `poolType` / `poolKind` | `pool_type` | Giveaway estimate only |
| `poolSize` | `pool_size` | Giveaway estimate only |
| `filterType` | `filter_type` | Giveaway estimate only |
| `debrisExposure` | `debris_exposure` | Giveaway estimate only |
| `currentPoolCaretaker` / `poolCaretaker` | `current_pool_caretaker` | Giveaway estimate only |
| `wantsFreeEstimate` | `wants_estimate` | Giveaway estimate only |
| honeypot result | `spam_status` | `accepted`, `honeypot_suppressed`, `validation_failed` |
| notification result | `notification_status` | `pending`, `sent`, `failed` |
| notification provider ID | `notification_id` | Resend email ID when available |

Stable source event to opportunity:

| Source event field | Opportunity field |
| --- | --- |
| `source_event_id` | `origin_event_id` |
| `received_at` | `created_at` |
| `contact_name` | `customer_name` |
| `contact_phone` | `primary_phone` |
| `contact_email` | `primary_email` |
| `service_address` fields | `service_location` |
| `source_channel` + `source_detail` + UTMs/click IDs | `lead_source` |
| `customer_message` + pool fields | `initial_need_summary` |
| `preferred_contact_method` | `recommended_contact_method` |
| derived from source/detail | `pipeline_stage` = `new` |
| derived from service area/route capacity | `owner` |
| derived from preferred contact method | `next_action` |
| generated server-side | `next_action_due_at` |

Opportunity to owner/next action:

- Default owner: Jason or the currently assigned intake owner in the Company Operating System.
- Default next action for website quote forms: contact by preferred method.
- Default next action for LSA manual intake: respond in the LSA channel first, then create/sync opportunity once the customer identity and permissioned details are available.
- Default next action for giveaway entries where `wants_estimate=no`: mark as giveaway-only/email follow-up, not active sales follow-up.

## Existing LSA Intake Plan

First release should not alter the active LSA campaign.

Plan:

1. Confirm the current LSA notification destination and who monitors it.
2. Record LSA leads into the same stable source event/opportunity field map using source values like `source_channel=lsa` and `source_detail=existing_campaign`.
3. If API access is unavailable, use a reviewed manual handoff/export from LSA or the notification inbox. Do not scrape.
4. Do not merge LSA into website form attribution unless the user lands on the website and submits a form with captured LSA click identifiers.
5. Track LSA handoff status in the existing master tracker only once, not as a parallel to-do queue.

## Security, Persistence, Retry, Duplicate Risks

Security risks:

- Missing `.env.local` and incomplete `.env.example` can produce broken contact handling in local or deployed environments.
- Email destinations and provider IDs are logged; acceptable for diagnostics but should be reviewed against log access policies.
- No rate limiting or CAPTCHA means the form can be abused beyond the honeypot.
- Lead personal data is sent through email; inbox access and forwarding rules become part of the data boundary.

Persistence risks:

- No durable record exists if email send fails, gets filtered, or reaches an unattended inbox.
- No stable source event ID exists for reconciliation.
- No retry queue exists for failed notifications.

Retry risks:

- Retrying from the browser can create duplicate emails once email delivery succeeds but the client does not receive the response.
- No idempotency key is captured from the client or generated from normalized content.

Duplicate risks:

- Same customer can submit website form, text link, and LSA inquiry with no dedupe key.
- Phone normalization and email lowercasing are not persisted for matching.

Tests needed for first durable intake release:

- Unit test normalization for contact and giveaway payloads.
- API test: valid contact creates one durable source event and sends notification.
- API test: notification failure after durable write preserves record and marks notification failed.
- API test: honeypot submission does not create an actionable opportunity.
- API test: duplicate/idempotency behavior for repeated mobile submit.
- Validation test: missing required env/config returns clear error without losing already persisted valid data.
- Manual mobile browser test: submit one real form once and confirm one actionable record.

## Missing Inputs Blocking First Release

No more than five genuine blockers:

1. Approved durable destination for the first release: existing Company Operating System Sheet/table, Airtable, app database, or reviewed CSV handoff.
2. Authorized access method and credentials for that durable destination, with permission boundaries for personal data.
3. Confirmed intake owner and default next-action SLA for new website inquiries.
4. Confirmed notification inbox/phone handling for website leads and existing LSA leads.
5. Deployment provider/environment owner so required env vars can be added and verified without guessing.

## SOS-101 Next Implementation Task

Title: SOS-101 - Durable Website Inquiry Capture Before Email Notification

Goal:

- Reuse the current site and forms.
- Capture a real mobile form submission once.
- Create one actionable durable record with source attribution, owner, and next action.
- Preserve the existing email notification path as a notification layer, not the only record.

Likely files to change:

- `src/app/api/contact/route.ts`
- New `src/lib/intake/source-event.ts`
- New `src/lib/intake/normalize-contact.ts`
- New `src/lib/intake/dedupe.ts`
- New provider adapter, depending on approved durable destination, for example `src/lib/intake/google-sheets.ts` or `src/lib/intake/csv-handoff.ts`
- `.env.example` to document required variable names only
- `README.md` or a focused `docs/sos-101_validation.md`
- Optional focused tests if a test harness is added or existing validation pattern is selected

Implementation outline:

1. Normalize incoming contact/giveaway payloads into a stable source event.
2. Generate `source_event_id` and an idempotency/dedupe key.
3. Write the source event to the approved durable destination before sending email.
4. Create or mark the opportunity fields in the same destination, including owner and next action.
5. Send the existing Resend notification with the source event ID included.
6. Update notification status when send succeeds or fails.
7. Return `{ ok: true, sourceEventId }` to the client.

Acceptance tests:

- `npm run lint` passes.
- `npm run build` passes.
- Valid `/contact` mobile submission creates exactly one durable source event/opportunity.
- The durable record includes source, timestamp, customer contact, message, owner, next action, and notification status.
- If Resend fails after durable write, the durable record remains visible/actionable with `notification_status=failed`.
- Repeating the same submit does not create duplicate active opportunities beyond the agreed idempotency window.
- Honeypot submissions remain suppressed and do not create actionable opportunities.
- No personal data is appended to URLs or analytics events.

Rollback:

- Feature-flag the durable intake adapter with an env var such as `INTAKE_DURABLE_STORE`.
- If the durable destination fails unexpectedly, rollback by disabling the adapter and restoring current email-only behavior while retaining the code path behind the flag.
- Revert only SOS-101 files if necessary; do not alter unrelated site routes, SEO, visual design, LSA campaign settings, or Company Operating System structure.

Estimated effort:

- CSV/file handoff prototype: 0.5-1.5 days after destination fields are approved.
- Google Sheets or existing Company Operating System integration: 1-3 days after authorized access is available.
- App database-backed intake with tests and retry status: 2-5 days depending on deployment provider and credential setup.

## Proposed Master-Tracker Row Update - NOT APPLIED

This row was not applied because no authorized Drive/master-tracker update and readback occurred.

| Field | Proposed value |
| --- | --- |
| ID | SOS-101 |
| Status | Proposed |
| Title | Durable Website Inquiry Capture Before Email Notification |
| Owner | Jason / intake owner to confirm |
| Source | SOS-005 discovery |
| Next action | Approve durable destination and intake owner, then implement one end-to-end website form capture |
| Blockers | Durable destination access; intake owner/SLA; deployment env owner |
| Acceptance | One real mobile website form submission creates exactly one actionable durable record and preserves notification behavior |
| Repo artifact | `DISCOVERY_REPORT.md` |

## What Jason Can Approve Next

Approve SOS-101 as a single end-to-end slice. It keeps the current site, does not require Skimmer API access, leaves LSA running as-is, and focuses on making one mobile website inquiry durable and actionable before expanding into broader operating-system automation.

