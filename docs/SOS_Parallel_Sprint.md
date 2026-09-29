# SOS Parallel Sprint — Database, Handoff, and Demand

Date: 2026-09-13
Status: Execution pack prepared. None of the new work below is represented as completed.
Master: https://docs.google.com/spreadsheets/d/1TRh44RN55zRBEo684plNOdsxdWZ0UHXoctVyPDLBoBI/edit
Drive home: Shipwrecked Pools – Company Operating System / 21 – Technology, Apps & Systems.

## The outcome

Prove one inquiry can be saved once, responded to by Jason, and handed to Kristen for approved Skimmer setup without a second customer questionnaire. Prepare the marketing evidence and operating rules alongside the technical work, not after it.

This is an execution brief, not a second tracker. The master retains task status; the repository retains implementation evidence; existing SOS folders retain business inputs. Timeboxes below are planning allowances, not forecasts of software or provider response times.

## Closed local checkpoint — evidence received today

Source: owner's latest terminal transcript in this conversation, reviewed as supplied; not independently rerun.

- Reviewed repair: 1 package added, 28 changed; npm reported 0 vulnerabilities.
- Root versions: next 16.3.4; eslint-config-next 16.3.4; postcss 8.5.28; resend 6.17.2.
- Tests after that repair: 12 passed, 0 failed, 1 intentional real-PostgreSQL skip.
- Lint completed without reported errors.
- Next 16.3.4 build compiled, completed type checking, and generated 44/44 static pages.
- Standalone TypeScript completed without reported errors. Separate numeric exit codes were not included for every command.
- Supplied final audit JSON has an empty vulnerabilities map and zero findings at every severity.
- The logged database-offline line accompanies the passing synthetic failure test; it is not a reported live outage.

Clean audit source: https://drive.google.com/file/d/1nd08zgdKm7Yjck682rHfnSNNbGQGXf_S/view
Prior preview: https://drive.google.com/file/d/1lm5-CK3hW9R4d27HyK4RiekGaDyotrSM/view

Do not repeat dependency repairs or unchanged tests to rediscover these results. Review the actual final dependency diff during the next handoff, but do not reopen package research without a concrete new issue. A clean audit and build do not establish real persistence, worker recovery, Google integration, authorization, backups, or production safety.

## Parallel lanes

| Lane | Owner | Task IDs | First deliverable | Planning allowance |
| --- | --- | --- | --- | --- |
| A — Database test preparation | One Codex implementation session | SOS-101, SOS-103, SOS-401 | Runnable, isolated PostgreSQL integration tests and guarded setup instructions; actual tests remain unrun without an approved database | One bounded coding session |
| B — Environment readiness | Jason | SOS-101, SOS-401 | Redacted project/storage/cost information sufficient for one provisioning decision | 15–20 minutes |
| C — Intake-to-Skimmer handoff | Kristen, then Jason reviews | SOS-102, SOS-104–106 | One annotated field map and a clear “Ready for setup” decision using fictional cases | 20–30 minutes |
| D — Acquisition evidence, after B | Jason | SOS-108, then SOS-109 | Ten consecutive recent LSA outcomes, then existing local-proof gaps if time remains | 30–45 minutes |

Only lane A changes application/test files. Other lanes collect evidence, draft content, or define business decisions. Do not run two editing agents in the same checkout; do not install packages or build concurrently in that checkout. Multiple coding agents require an intentionally reviewed worktree/branch arrangement with a clear starting state, preserved local work, and separate output ownership. That setup is not required for today's parallel work.

## A. Copy to Codex — next bounded development task

Read applicable repository instructions, DISCOVERY_REPORT.md, the latest local implementation report and run status, and this pack. Preserve all tracked/untracked work. This pack supersedes older claims that dependency installation, the font build, the role correction, or the final repair checks are still missing.

The owner has supplied post-repair root versions and passing local tests/lint/build/TypeScript; the final audit reports zero findings. Label that evidence owner-executed, not agent-executed. The architecture is already approved: private PostgreSQL operational storage plus a restricted automated Drive view. Provider-specific costs, provisioning, production activation, and real integrations are not approved by that architecture decision alone.

Execute SOS-101 database-test preparation. Complete the bounded steps without requesting approval after every ordinary local read or test-file edit:

1. Read the actual dependency diff/root pins and current schema/store/tests. Flag changes outside the reviewed repair scope; do not upgrade anything. Update the current status header and next task; retain earlier results under a clearly labeled historical section.
2. Inspect the skipped PostgreSQL test. Establish whether it contains real assertions or is only a placeholder. Implement missing integration assertions using the installed pg driver and the existing store/migration. Do not write a second intake subsystem.
3. Cover concurrent same-token/same-payload replay; changed-payload conflict without overwrite; transaction rollback leaving no partial event/opportunity/jobs; a new legitimate inquiry from the same contact; exclusive worker lease claims, expiry and stale-worker acknowledgement protection; and a saved job recoverable by a fresh store/connection after commit before notification. Stub email and Google. Do not equate a lease SQL test with a complete running worker.
4. Guard all destructive test setup/cleanup. Use only SOS_101_TEST_DATABASE_URL for an owner-approved disposable instance. Never fall back to DATABASE_URL, POSTGRES_URL, provider defaults, or an existing application database. Require explicit disposable-test confirmation and a unique test schema; check the migration for hard-coded public-schema writes. A name check alone is not proof an endpoint is disposable. Fail closed if the destination/scope cannot be established. No database connection or migration during this preparation task.
5. Prepare a provider-neutral runbook with connection variable NAMES only, setup and cleanup scope, evidence expected, and exact authorized-terminal commands. Explain how the variable is loaded; do not assume npm test loads .env.local. Do not print connection strings, keys, or passwords. Missing test configuration must mean a clear SKIP/NOT RUN, not a passed integration check.
6. Run available local checks for the newly added test code. Do not retry known-blocked network commands or fetch substitute tooling. If the sandbox blocks a necessary command, record it once and continue independent permitted work. Inspecting an available local tool is permitted; installing software, creating resources, or running a cloud command is not part of this task.
7. Update docs/SOS-101_IMPLEMENTATION_REPORT.md and docs/CODEX_RUN_STATUS.md. Add or update docs/SOS-101_POSTGRES_TEST_RUNBOOK.md only if no equivalent exists. Summarize files changed, actual checks, skipped integration cases, and one remaining decision.

Scope: test files, necessary test helpers, and their documentation. Identify production store/schema defects if discovered, but propose the smallest separate fix instead of silently expanding scope. Do not build a new form, dashboard, provider integration, live scheduler, or new product feature. Preserve Jason as initial inquiry owner, Kristen as approved Skimmer/setup/work-assignment owner, and info@shipwreckedpools.com as notification destination. Staff response deadlines remain unset until approved.

Stop before any provisioned resource, charge, secret creation, real customer data, external message, migration, account/permission change, push, merge, or deployment. Do not defeat a security block. Continue all independent in-scope preparation and return one consolidated report.

## B. Jason — environment readiness, without changing settings

Open the existing Vercel project actually associated with shipwreckedpools.com. Do not create a replacement project.

Capture or note the following, with credentials hidden:

- Project/team name and associated domain; connected repository and production branch; currently deployed commit/version evidence when displayed.
- Current Node runtime and server-function region, when available. Record “not found” instead of spending more than five minutes locating one value.
- Existing attached storage resources. A live customer database is not a disposable test database.
- For the previously proposed Neon option or suitable existing PostgreSQL resource: displayed test-plan cost, usage limit/overage behavior, region, and any automatic project/environment connection. Do not select a paid option or click Create/Install/Connect. If even viewing terms requires account creation or consent, record the stop and move on.

A redacted screenshot bundle is enough. Do not expose or send environment-variable VALUES, keys, connection strings, invoices or card details. We already know the hosting providers, shared inbox, and role split; do not re-collect those facts.

Proposed first database: dedicated synthetic-test PostgreSQL, not production; no copy of real customers. Match the database region to the application's function region where practical. Keep the connection out of Vercel Production. Review cost and access before creating it. The subsequent staging and production databases/permissions require their own mapping.

Why: this removes the next provider/access question while Codex prepares the tests.

## C. Kristen + Jason — define the handoff using the existing form

Use the existing form as the starting point, not a new screen. Inspect it without submitting fictional data to the live site. Read actual Skimmer setup fields without creating fake customers or work orders.

Use two fictional examples: a prospective weekly-service customer and a one-time service request. Include a duplicate/existing-customer check.

For each item, mark: already captured; needed to respond; needed before setup/dispatch; genuinely missing. Start with actual form fields and add only missing requirements. Candidate information to evaluate includes contact/name/email/phone, property address, requested service, issue/pool details, approved scope/price where applicable, scheduling constraints, and the next action. Do not invent requirements or collect sensitive payment/gate credentials in this exercise.

Decide and record:

- The exact action by which Jason says “Ready for Kristen.” Do not convert every raw inquiry into a scheduled customer.
- What Kristen must receive, what she can fill in herself, and what should return to Jason as incomplete.
- A clear split between “Needs estimate/assessment” and “Approved work,” where useful.
- How Kristen marks setup complete and records the existing/new Skimmer reference once, without maintaining two independent status copies.
- Proposed staffed response hours and backup coverage. No automatic timer is enabled yet.

Preserve original source (for example LSA call) separately from entry method (Jason entering the website form). If a website record already exists, update/hand it off rather than submit again. A second LSA email notification is not a second lead. Staff notes are not authentication. The initial version intentionally retains Kristen's manual Skimmer entry; do not describe it as automated.

Deliverable: one marked-up form/field list and the “Ready for setup” rule, saved in the existing SOS sales area or returned together in this conversation. This is a one-time design input, not a new recurring log.

## D. Jason — work directly on acquisition evidence

After the environment packet, review the ten most recent consecutive genuine LSA inquiries. Do not cherry-pick successes. This is a diagnostic sample, not a final conversion rate for all 58 historical charged leads.

Use pseudonymous references rather than customer names/phone numbers. For each record: received date, call/message, weekly-service requested yes/no/unknown, status (active weekly / one-time work / quoted-open / lost / existing customer / unknown), and the observed reason for loss or delay. Distinguish an actual start from a quote or booked assessment. Mark uncertainty instead of reconstructing it as fact. Reuse an existing export/view where possible; do not create a second CRM.

Finish with three observations: repeated customer objections, repeated unanswered questions, and preferred route areas with available capacity. These are owner observations to review, not findings already established.

If this is done, fill gaps in the repository's existing docs/human_inputs_needed.md rather than drafting another SEO strategy. Useful existing-proof inputs: a few permissioned job photos, accurate weekly-service inclusions/exclusions, approved chemical-billing explanation, and actual service-area limits. Save original assets in the existing marketing folder. No public claims, reviews, biweekly-page deletion, ad budget increase, or website publishing in this lane.

Why: lead outcomes and real local proof inform which messages and channels to improve while database work proceeds. No extra Search Console export is required for this sprint.

## Independent-work rule and return format

Within these defined lanes, collect inputs, draft the agreed artifacts, and complete available checks without waiting for a response after each small action. Stop at the listed boundaries. An unsuccessful network command does not stop unrelated documentation or business-input work. Do not repeat known-failed commands or move into a different coding feature to keep busy.

One consolidated return per work session:

- SOS ID and lane
- Completed output and link/file
- Test results: passed / failed / skipped, with source
- Blocker requiring a decision
- Next independently ready task

Do not append full historical terminal output repeatedly. Keep original evidence intact; new summary first. The assistant updates the same live master during working conversations and verifies the writes; no background task or automatic Codex-to-Drive synchronization is claimed.

## External references checked for planning (not account inspection)

- Vercel storage and database-region guidance: https://vercel.com/docs/storage
- Vercel environment separation: https://vercel.com/docs/deployments/environments
- Codex/Git worktree isolation: https://developers.openai.com/codex/app/worktrees

These references do not verify account-specific pricing, credentials, resource access or deployed configuration. Neon plan cost must be checked in the actual account/provider quote; this pack does not assert an unverified price.
