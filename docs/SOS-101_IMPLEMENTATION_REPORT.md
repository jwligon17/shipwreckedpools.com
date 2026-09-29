# SOS-101 BUILD A Implementation Report

## Current checkpoint - 2026-09-13, SOS-103 local notification recovery

Status: **THREE RECOVERY GAPS CORRECTED LOCALLY / BUILD PASS / REAL POSTGRESQL NOT RUN**.

### Confirmed gaps and bounded correction

The previous handoff findings were verified against the actual store, claim SQL and request-service code. The existing schema supports this correction; no migration, dependency or broader redesign was needed. The four completed capture/locking/retry-timestamp/acknowledgement fixes remain intact.

1. **Known-retryable notification failures:** explicit safe-to-retry failures now use the existing fenced retry SQL to persist retryable with a 60-second delay, rather than unclaimable failed. Only a result explicitly marked retryable is eligible; the existing Resend adapter recognizes explicit rate_limit_exceeded rejection. Other conclusive client rejections/configuration failures remain failed. Timeout, server/unknown response and missing acknowledgement are ambiguous, not automatic retry candidates. Existing historical failed rows are NOT bulk-reclassified: they lack proof of non-delivery and require separate review before promotion. The six-attempt maximum remains enforced.
2. **Exhausted leases:** the shared claim SQL includes a data-modifying CTE that moves expired final-attempt leases and exhausted pending/retryable rows to existing manual_review, clearing lease metadata while keeping next_attempt_at valid. This occurs on the next claim invocation, not autonomously at expiry; no scheduler is active. A live last attempt reporting a retryable failure also reaches manual_review through the existing retry SQL.
3. **Initial/recovery coordination:** the initial request now uses shared dispatchNotification, which claims its specific saved job through the same exclusive SQL contract a future recovery caller can use. It records a durable send-start marker before contacting the provider and acknowledges only with its current lease token. Competing dispatch calls cannot both start sending. Claim/start/configuration-ack failures do not reverse saved capture or return a misleading capture failure.

The send-start marker is the reserved `sos103:notification-send-started` value in the existing last_error column, avoiding any schema addition. A second start with the same token is rejected. If delivery started and the lease expires without a conclusive persisted outcome, claim processing moves the job to manual_review even below the attempt limit. This deliberately favors review over potentially duplicate delivery after a crash or lost acknowledgement. A crash after marking but before actually sending may also require review. The marker must not be cleared by a future worker except through the conclusive, fenced outcome paths.

For a future recovery implementation: discover candidate IDs and call dispatchNotification with the saved message and existing sender factory. It performs its own targeted claim; do not preclaim and then call it, and do not send directly after a raw claim without the fenced start operation. The exported batch claim contract remains available for SQL consumers, but any such sender must apply the same start/acknowledgement protocol. No job enumerator, scheduler, dashboard or worker activation is included here.

The stable notification idempotency key is now supplied through the installed Resend SDK's supported second-argument idempotencyKey option (verified in local SDK declarations), instead of an email header. This supplements the ownership protocol; it is not permission to resend uncertain deliveries. No real provider call or credentials were used.

### Files changed

- `src/lib/intake/outbox.ts`: claim-time review transition, exclusion of uncertain expired notifications from reclaim, targeted single-job claim derived from the shared query, send-start fence and 60-second retry constant.
- `src/lib/intake/postgres.ts`: claimNotification, startNotificationSend and markNotificationRetryable methods using existing SQL/lease columns; previous capture and acknowledgement corrections preserved.
- `src/lib/intake/types.ts`: internal store method contracts, optional lease-token acknowledgement arguments and explicit retryability in the provider result. No customer or database fields added.
- `src/lib/intake/store.ts`: existing memory test store now models claims, attempts, expiry, retry delays, send-start and acknowledgement fences with an injectable clock; no second persistence subsystem.
- `src/lib/intake/service.ts`: shared claimed dispatch, conservative outcome handling, saved-success protection and correct existing SDK idempotency option.
- `tests/sos-101/notification-recovery.test.ts`: six new database-free regressions for retry delay/cap, competing sends, ambiguity/timeouts, final/start-marker expiry, lost acknowledgement and saved-success under claim/configuration-ack failure.
- `tests/sos-101/intake-core.test.ts`: failing-store interface stub extended; timeout assertion intentionally changed from failed to an explicit ambiguous state to enforce the requested no-blind-resend policy. Existing saved-success and capture assertions retained.
- `tests/sos-101/postgres-contract.test.ts`: original nine cases and assertions preserved; four cases appended for delayed known retry, exhausted expiry, durable send-start recovery and competing targeted dispatch. All thirteen are NOT RUN.
- `docs/SOS-101_IMPLEMENTATION_REPORT.md`, `docs/CODEX_RUN_STATUS.md`, `docs/SOS-101_POSTGRES_TEST_RUNBOOK.md`: current evidence, protocol, counts and limits updated; earlier results retained as history.

### Actual validation

- Test compilation: `node node_modules/typescript/bin/tsc -p tsconfig.sos-101-test.json`, PASS, exit 0.
- Full compiled SOS-101 suite with all SOS_101_TEST_* variables stripped from the child process: **26 passed, 0 failed, 13 PostgreSQL cases explicitly SKIPPED/NOT RUN**, exit 0. Includes the preserved original nine unrun database cases and four new ones. No database connection attempted. Expected synthetic database-offline log accompanies a passing failure-path test.
- Whole-project installed ESLint: `node node_modules/eslint/bin/eslint.js .`, PASS, exit 0.
- Full build after final application changes: existing `npm run build`, PASS, exit 0; Next 16.3.4 compiled, build-integrated whole-project TypeScript completed, generated 44/44 static pages, and finalized optimization. Run once using the prior credential-free allowlisted child environment with telemetry disabled and no active .env build files. No separate redundant TypeScript run was needed after build-integrated type checking.
- `git diff --check`: PASS (line-ending notices only). Migration-content guard passed unchanged; isolation fixture and guards were not edited.
- No installs, audit reruns, database/provider execution or deployment. Owner-executed earlier repair/build/audit evidence remains separately labeled in historical checkpoints.

### Remaining setup decision and limits

Approve and provide an isolated disposable PostgreSQL instance with cost/region/access boundaries, then explicitly authorize the runbook. All thirteen real PostgreSQL cases remain NOT RUN: database-free state tests and a full build do not certify SQL concurrency, persistence, real email delivery or a working scheduler. manual_review is a persisted existing database state, not a newly created owner dashboard. Review processing and scheduler activation remain separate work. Legacy failed records need evidence-based review rather than automatic resend.

No form/role changes, new dashboard, scheduler activation, schema change, dependency upgrade, database connection, provisioning, real messages, credentials, push, merge or deployment occurred. Unrelated work was preserved.

## Historical checkpoint - 2026-09-13, SOS-101/SOS-103 handoff review

Status: **NO-NEW-FEATURE REVIEW COMPLETE / POST-CORRECTION FULL BUILD PASS / NINE POSTGRESQL CASES NOT RUN**.

### Evidence, separated by source and scope

| Evidence | Latest result | Source / limitation |
| --- | --- | --- |
| Corrective code inspection | Four intended corrections confirmed in actual files | Agent handoff review; does not execute SQL |
| Database-free suite | 20 passed, 0 failed; nine PostgreSQL skips | Prior corrective session, exit 0; not rerun for unchanged code |
| Test compilation, whole-project TypeScript, lint, whitespace | PASS | Prior corrective session; not rerun separately in this handoff |
| Full application build after corrections | **PASS, exit 0; Next 16.3.4; 44/44 static pages** | Agent executed existing `npm run build` once during this handoff; compiled, completed build-integrated TypeScript and page generation |
| Real PostgreSQL execution | **NOT RUN: all nine cases** | No approved isolated instance/execution; neither stubs nor build establish database correctness |
| Earlier dependency repair and audit | Owner-executed successful repair and zero findings retained | Historical evidence below; no install, upgrade or audit rerun |

### Corrective change review

Inspected the actual store, outbox SQL, adapter/integration tests, fixture, current reports/runbook, and contact-service call sites. The SOS source/test files remain untracked, so `git diff` alone does not contain a standalone correction-only patch. Review compared current contents with the preceding corrective patch in this session and the recorded before/after findings; the full checkout includes earlier unrelated work. No isolated Git commit or clean-checkout baseline is claimed.

1. `src/lib/intake/postgres.ts`: `FOR UPDATE OF se` scopes the join query lock to the source-event relation, addressing the nullable LEFT JOIN lock finding.
2. The same method explicitly begins READ COMMITTED and acquires a transaction-scoped advisory lock keyed by the submission token before the lookup. The next statement can see a previous caller's commit; same payload replays and changed payload conflicts. The unique constraint remains in place. All capture writers must follow this protocol; hash collisions serialize rather than merge unrelated tokens.
3. `src/lib/intake/outbox.ts`: exhausted retries preserve next_attempt_at when setting manual_review, satisfying the existing NOT NULL column. Ordinary retry delay remains intact.
4. Done/retry SQL requires current leased status, matching token and unexpired wall-clock lease, then clears lease metadata. PostgreSQL notification outcomes apply the same worker fence; no-token initial calls require pending/attempts=0/no lease. Zero-row notification updates reject rather than report success. The recovery test passes its claimed token and still requires accepted status.

Original success assertions and database-isolation safeguards remain present: dedicated test URL only, explicit disposable confirmation, independent expected endpoint identity, generated unique schema, migration-content pin, exclusion of public from search_path, and schema-scoped cleanup. No tests or safeguards were changed during this review.

### Remaining concerns - inspection findings only, no further fixes applied

- **Recovery gap before worker activation: failed notifications are not claimable.** `markNotificationFailed` persists status=failed, while CLAIM_OUTBOX_JOBS_SQL selects pending, expired leased, or eligible retryable rows only. Persisted failure is available for inspection, but automatic retry from that state is not implemented. A future worker/recovery task must explicitly decide the failed-to-retryable/manual-review path; current reports must not equate saved failed state with automatic recovery.
- **Recovery gap before worker activation: expiry on the final allowed attempt can strand a lease.** Claim increments attempts up to the maximum; subsequent claims require attempts below that maximum. If that final worker dies or its lease expires before it acknowledges, the corrected acknowledgement predicates reject it, and no current statement moves the expired maximum-attempt job into manual_review. The new exhaustion regression covers a live final worker calling retry, not this crash/expiry case. Resolve this separately before claiming complete worker recovery.
- **Initial-send/worker coordination is still future work.** The request sends after committing a pending job without claiming it. A future worker could claim/send the same job before that initial request finishes; acknowledgement fencing prevents stale database overwrites but does not by itself prevent duplicate external sends. In addition, the missing-notification-configuration branch awaits markNotificationFailed outside the inner acknowledgement catch; if a future worker has already claimed the job, rejection can produce a 503 despite saved capture. No worker is active here; review ownership of initial dispatch and saved-success handling before enabling one.
- **Verification boundary:** SQL correctness, real concurrency/rollback and lease semantics still require the nine approved database cases. No running worker, live email/Google integration, process-crash recovery or production readiness is certified by this handoff.

These are remaining operating/recovery concerns, not reasons to weaken the nine existing database cases or silently expand this review. The four targeted edits are present as intended.

### Full build execution

No post-correction build pass was recorded at entry; the earlier owner build predated these edits. Ran the existing `npm run build` exactly once via a child process with only Windows execution/path/temp/profile variables allowlisted and NEXT_TELEMETRY_DISABLED=1. Checked for `.env`, `.env.local`, `.env.production` and `.env.production.local` before execution; none were present (only `.env.example`). No application/provider credential values were passed or printed. The contact POST handler was not invoked, and no database, email or authenticated Google integration was connected. The existing next/font/google font build path was left unchanged.

Result: Next.js 16.3.4 compiled successfully in 16.8s; build-integrated TypeScript completed in 5.8s; generated 44/44 static pages; finalized page optimization; command exit 0. No network block or retry occurred, so no owner-terminal build rerun is needed for these unchanged corrections. Ordinary generated build artifacts are not a deployment.

### Handoff files and remaining decision

Only `docs/SOS-101_IMPLEMENTATION_REPORT.md` and `docs/CODEX_RUN_STATUS.md` were edited in this handoff, putting these results first and preserving all earlier checkpoints below. Application/test code, schema, dependencies and unrelated work were left intact. No already-passed standalone checks were rerun.

Remaining setup decision: approve/provide an isolated disposable PostgreSQL instance with cost/region/access boundaries and explicitly authorize the runbook execution. All nine cases remain NOT RUN. The recovery concerns above require a separately scoped decision before worker activation. No package installs, provisioning, credentials, real messages, push, merge or deployment occurred.

## Historical checkpoint - 2026-09-13, authorized local store/retry corrections

Status: **FOUR VERIFIED FINDINGS CORRECTED LOCALLY / REAL POSTGRESQL EXECUTION NOT RUN**.

### Verified findings and smallest fixes

1. The capture SELECT did use unqualified FOR UPDATE across LEFT JOINs. It now uses `FOR UPDATE OF se`, locking only the non-null source-event relation. Existing capture/replay/rollback success assertions remain strict.
2. The original SELECT-then-INSERT had no protection for an absent token. Capture now starts an explicit READ COMMITTED transaction and takes `pg_advisory_xact_lock(hashtextextended($1, 0))` for the submission token before reading. Concurrent same-token callers wait for commit/rollback, then read a fresh snapshot and replay or conflict using the existing payload hash. The unique constraint remains unchanged. Hash collisions only serialize unrelated tokens; they cannot merge records. All capture writers must use this store protocol; this is not a new guarantee for unrelated direct SQL writers.
3. Retry exhaustion assigned NULL to the schema's NOT NULL next_attempt_at. It now preserves that timestamp when moving to manual_review; ordinary retry delay remains unchanged. No schema or migration review/change was needed.
4. Done/retry SQL checked only job ID/token; notification acknowledgements checked only job ID. Worker updates now require status=leased and an unexpired lease using clock_timestamp (wall time rather than transaction-start time), and clear lease_token/leased_until on completion or retry. PostgreSQL notification methods accept the already-stored lease token as an optional internal argument: supplied tokens require a current lease; no-token calls are restricted to initial pending, never-claimed jobs (attempts=0, lease metadata NULL). Rejected notification updates throw rather than report success. Repeated, expired or replaced acknowledgements cannot overwrite the current owner or a terminal result.

The internal lease-token argument adds no customer field, database column or provider integration. The existing request service remains the no-token initial caller. These guards protect database state; they do not create a scheduler, prevent every possible duplicate external send, or prove a running worker. No worker or provider was activated.

### Files changed in this correction

- `src/lib/intake/postgres.ts`: source-row lock, transaction-scoped token serialization, and fenced notification acknowledgement for accepted/failed/ambiguous outcomes.
- `src/lib/intake/outbox.ts`: valid exhausted-retry timestamp and status/expiry/token fencing, clearing leases after done/retry.
- `tests/sos-101/postgres-contract.test.ts`: preserved all six original success cases; strengthened expired-before-reclaim and repeated terminal checks; supplied the claimed token in the fresh-store recovery case; added concurrent changed-payload, delayed/exhausted retry, and notification ownership regression cases (nine total, all NOT RUN).
- `tests/sos-101/postgres-adapter.test.ts`: four database-free tests using the real adapter prototype with a protocol stub, never constructing a pg pool. Checks waiting before lookup, rollback/release on lock failure, conflict without writes, and all notification outcome/token/row-count paths. These checks do not execute or emulate PostgreSQL SQL semantics.
- `tests/sos-101/postgres-fixture.ts`: environment parameter type changed to `Record<string, string | undefined>` to avoid Next's augmented ProcessEnv requiring NODE_ENV in isolated test inputs. All runtime approval/endpoint/schema/migration/cleanup guards are unchanged.
- `docs/SOS-101_IMPLEMENTATION_REPORT.md`, `docs/CODEX_RUN_STATUS.md`, `docs/SOS-101_POSTGRES_TEST_RUNBOOK.md`: updated current status, commands, case counts, corrected findings and limitations; prior checkpoints retained as historical evidence.

Unrelated tracked/untracked work, dependencies, schema/migration, customer fields/forms, roles, notification destination and provider configuration were preserved.

### Actual agent validation in this correction

- `node node_modules/typescript/bin/tsc -p tsconfig.sos-101-test.json`: PASS, exit 0.
- Full compiled SOS-101 suite using Node's test runner, with all SOS_101_TEST_* variables removed from the child environment: final **20 passed, 0 failed, 9 PostgreSQL cases SKIPPED/NOT RUN**, exit 0. This includes 12 existing core tests, four isolation guards and four new adapter tests. Initial run: 17 passed, 3 failed, 9 skipped because the new synthetic adapter input omitted the existing required phone; corrected the fixture without relaxing validation or assertions. The expected synthetic database-offline log accompanies the passing failure-path test.
- `node node_modules/typescript/bin/tsc --noEmit --incremental false`: initial type errors from the pre-existing fixture ProcessEnv parameter under Next's type augmentation; after the type-only helper correction, PASS, exit 0.
- Targeted ESLint: PASS, exit 0. Whole-project installed ESLint: PASS, exit 0.
- No build or audit rerun: the supplied successful final repair build/audit remain owner-executed evidence, not validation of these later changes. No dependency/network troubleshooting or installs.
- Migration integrity guard passed against the existing pinned SHA-256; no migration content changes. Whitespace check across all eight changed files and git diff --check: PASS (line-ending notices only). Final scope review preserved unrelated work.

### Remaining setup decision

Approve and supply one isolated disposable PostgreSQL instance, with cost/region/access/environment boundaries, and separately authorize runbook execution. All nine real PostgreSQL cases remain **NOT RUN**; local protocol-stub success does not prove database locking, persistence or SQL execution. No database connection, provisioning, credentials, real messages, account changes, push, merge or deployment occurred. Lane B environment evidence gathering is independently ready.

Owner-executed final post-repair versions, 12 passing tests/one intentional PostgreSQL skip, successful lint/TypeScript/build (44/44 pages), and zero-finding audit remain accepted evidence in the earlier checkpoint below; they were not relabeled as agent execution.

## Historical checkpoint - 2026-09-13, Lane A preparation (before authorized corrections)

Status: **POSTGRESQL TEST PREPARATION COMPLETE / ACTUAL POSTGRESQL EXECUTION NOT RUN**.
Next task: Jason supplies the Lane B redacted environment packet and approves one isolated disposable instance, cost/access/region and execution boundary. No connection or provisioning occurred. Production defects below need a separate bounded fix, not silent expansion of Lane A.

### Completed files

- `tests/sos-101/postgres-contract.test.ts`: replaced the URL-presence-only placeholder with six real integration cases using the existing normalization, PostgreSQL store, migration tables and outbox SQL. Covers concurrent replay, changed-payload conflict/no overwrite, precise late-write rollback, new inquiry from same contact, exclusive lease/expiry/stale-token protection, and committed-job recovery via fresh pool/store/connection with email/Google stubs.
- `tests/sos-101/postgres-fixture.ts`: disposable confirmation and independent endpoint guards; unique per-case schema; server identity check; pinned migration review; no public fallback or extension creation; scoped cleanup and redacted errors. Private store-pool access is confined to the test helper to close connections without changing production APIs.
- `tests/sos-101/postgres-guard.test.ts`: four database-free safety checks for absent configuration/fallback rejection, approval/identity requirements, unsafe URL overrides/defaults, and migration scope.
- `docs/SOS-101_POSTGRES_TEST_RUNBOOK.md`: provider-neutral setup decision, variable names, explicit private-terminal loading, scoped cleanup, exact future execution commands and evidence requirements.
- `docs/SOS-101_IMPLEMENTATION_REPORT.md` and `docs/CODEX_RUN_STATUS.md`: current checkpoint first; earlier evidence preserved below as historical.

Existing tracked/untracked work was preserved. No package, production store/schema, form, route, integration, role, deadline or notification-destination edits. Jason remains initial inquiry owner, Kristen handles approved Skimmer/setup/work assignment, destination remains info@shipwreckedpools.com, and response deadlines remain unset.

### Owner-executed final repair evidence (accepted, not rerun by agent)

Source: owner-supplied successful final post-repair transcript as recorded in `docs/SOS_Parallel_Sprint.md`, plus supplied final audit. Repair reported 1 package added and 28 changed. Root versions: next 16.3.4; eslint-config-next 16.3.4; postcss 8.5.28; resend 6.17.2. Tests: 12 passed, 0 failed, 1 intentional real-PostgreSQL skip. Lint and standalone TypeScript completed without reported errors. Build compiled, typechecked and generated 44/44 static pages. Not every supplied command included a separate numeric exit. Final audit: empty vulnerabilities map and zero findings at all severities. The synthetic database-offline test log is not evidence of a live outage.

The agent read package/root-lock pins, installed package metadata and `docs/npm-audit-after-reviewed-fix-sos401.json` locally; these agree with the supplied versions and zero-count audit. Existing pg is 8.23.0 from ^8.13.1. No network/package repair or audit rerun occurred.

Dependency-diff scope flag: the full HEAD-to-working-tree lock diff predates this lane and is broader than the final 1-added/28-changed repair. It includes the previously added pg tree plus Babel updates (7.29.x), @humanfs updates/new types, @swc/helpers, postcss-selector-parser, browser-data refreshes and platform packages, in addition to reviewed Next/PostCSS/sharp/audit changes and removal of svix/uuid. These extra transitive changes cannot all be attributed to the final repair from the supplied aggregate transcript. Retain them for handoff review; no extra direct dependency change beyond existing pg and the four reviewed pins was found. Do not reopen repairs on this basis alone.

### Actual agent checks for new code

- `node node_modules/typescript/bin/tsc -p tsconfig.sos-101-test.json`: initial FAIL on UUID-inferred parameter typing; corrected the test parameter to string; final PASS (exit 0).
- Targeted installed ESLint over all three PostgreSQL test/helper files: PASS (exit 0).
- Focused compiled guard/integration tests, with all SOS_101_TEST_* variables removed from the child environment: PASS, 4 guards passed, 0 failed, 6 integration cases explicitly SKIPPED/NOT RUN (exit 0). No database connection was attempted.
- `git diff --check`: PASS (line-ending notices only); separate whitespace check across all six Lane A files, including untracked files: PASS. Final scope review preserved pre-existing changes.
- Existing 12 core tests, whole-project lint/TypeScript/build and dependency troubleshooting were not repeated; owner evidence above is retained. No tooling was installed or fetched.

### Static findings for a separate smallest production fix

These are code-inspection findings, not observed PostgreSQL execution results. Assertions have not been relaxed to conceal them.

1. `src/lib/intake/postgres.ts`: capture SELECT uses unqualified FOR UPDATE across nullable LEFT JOIN sides. Expected PostgreSQL rejection would affect even initial capture. Smallest fix proposal: restrict locking to the source-event relation (`FOR UPDATE OF se`) and validate with the real contracts.
2. The same SELECT-then-INSERT sequence has no serialization when a token is absent and no unique-conflict replay handling. After fixing the SELECT, simultaneous new-token requests can race into the unique constraint instead of both returning the same record. Smallest fix proposal: serialize by token within the transaction or handle insert conflict then reread/hash-check without overwrite.
3. `src/lib/intake/outbox.ts`: MARK_OUTBOX_RETRY_SQL writes next_attempt_at=NULL at maximum attempts, while the migration declares it NOT NULL. Smallest fix proposal: retain a valid timestamp in manual_review or explicitly review a nullable schema change. Attempt-cap retry behavior needs a separate regression case with that fix.
4. Done/retry acknowledgements check token only, not current leased status or unexpired lease; tokens are retained after completion. Stale tokens after reassignment are tested, but expired-before-reassignment and repeated terminal acknowledgements need additional fencing. `PostgresIntakeStore.updateNotification` also updates by job ID without a lease token; do not reuse it as a fenced worker acknowledgement. Smallest fix proposal: add status/expiry predicates to worker SQL and a lease-aware worker acknowledgement path when implementing the protected worker, then cover expired/terminal states.

A passing lease SQL test alone would not establish a complete worker. The fresh-store case simulates the post-commit/pre-notification boundary by closing the pool; it is not a deployed process-kill test. No live Google, email, scheduler, backup, permission or production-safety evidence is claimed.

### Remaining decision and independently ready work

One setup decision remains: approve and make available an isolated disposable PostgreSQL instance using Lane B's cost/region/access/environment evidence, then explicitly authorize execution of the runbook. Until then, all six PostgreSQL cases remain **NOT RUN**. Lane B evidence gathering is independently ready; the production fixes above are proposed separately. No real messages, customer records, account changes, provisioning, secrets, migrations, push, merge or deployment occurred in this session.

## Historical evidence - through 2026-09-12 (superseded where noted above)

Earlier missing-dependency/font-build/role-correction/audit blockers and next-task instructions below are retained for provenance only. Do not execute the old repair commands or treat those gates as current.


Date: 2026-09-12
Continuation updated: 2026-09-12
Branch context: `main...origin/main`
Commit context: no commit made, no push, no merge, no deploy.

## SOS-401 Dependency Remediation Attempt
- Owner reported a normal-terminal pre-update build succeeded on Next.js `16.2.4`, generated 44/44 static pages, and exited 0.
- Read `docs/npm-audit-current.json`, `package.json`, `package-lock.json`, this implementation report, repository instructions, and checked for `docs/SOS-401_Dependency_Remediation_Review.md` before it existed.
- Exact targeted plan: `next@16.3.4`, `eslint-config-next@16.3.4`, `postcss@8.5.28`, and `resend@6.17.2`, using exact versions and `--package-lock-only --ignore-scripts`.
- No dependency update was applied because local npm registry access is blocked. `npm view` calls failed with `EACCES`; online install hung until stopped; offline install failed with `ENOTCACHED` for `eslint-config-next`.
- Fresh audit save was attempted only to `.tmp\sos-401-npm-audit.json`; it produced a registry/advisory endpoint error, so `docs/npm-audit-current.json` was not overwritten.
- Required owner-terminal command:
  `npm install next@16.3.4 eslint-config-next@16.3.4 postcss@8.5.28 resend@6.17.2 --save-exact --package-lock-only --ignore-scripts`
- After owner-terminal update, run `npm ci --ignore-scripts`, `npm test`, `npm run lint`, `node_modules\.bin\tsc --noEmit`, `npm run build`, and `npm audit --json > docs\npm-audit-current.json`.
- No product code, form design, URLs, inquiry ownership, schema, production credentials, real messages, cloud resources, push, merge, or deployment changed under SOS-401.

## Code Written
- Replaced the email-only `/api/contact` implementation with a durable-capture-first route.
- Added `src/lib/intake/*` for request parsing, normalization, source attribution allowlisting, HTML/spreadsheet safety, notification message building, a stub memory store, a lazy PostgreSQL store, outbox SQL constants, and Drive projection row shaping.
- Added `db/migrations/001_sos_101_intake_core.sql` for source events, opportunities, outbox jobs, and Drive projection state.
- Added stable `clientSubmissionToken` values to the main contact form, giveaway estimate form, and giveaway opt-in form without changing visible design.
- Added `tests/sos-101/*` and `tsconfig.sos-101-test.json` for synthetic/stubbed local tests plus a skipped PostgreSQL gate.
- Added `pg` to `package.json` as the minimal PostgreSQL runtime driver. Owner later refreshed `package-lock.json` and completed `npm ci --ignore-scripts` in a normal terminal.

## Architecture Choices
- PostgreSQL is the planned authoritative operational record. Google Drive remains a projected restricted view, not a second manually edited database.
- Durable capture is attempted before notification. Database failure returns a retriable failure and does not claim success.
- Notification failure after commit returns saved success and marks the notification job recoverable.
- Email-only giveaway opt-ins are saved as source events but do not create sales opportunities.
- Full giveaway entries with `wantsFreeEstimate=no` do not create sales opportunities.
- Responsibility defaults corrected: Jason handles initial phone, text, and email inquiries. Kristen handles approved customer setup in Skimmer and work assignment after Jason's handoff. `next_action_due_at` stays nullable because response hours/SLA are not approved.
- `CONTACT_TO_EMAIL` remains `info@shipwreckedpools.com`; Jason has access to that inbox.
- Browser retries use a stable `clientSubmissionToken`. Same token plus same normalized payload replays the same event; same token plus changed payload conflicts.
- Landing-page paths are stripped to pathname only. Attribution capture is allowlisted.
- Original acquisition source remains separate from entry method. SOS-102 should reuse the existing customer form for Jason-entered leads rather than building a new staff interface in BUILD A.
- Drive projection rows are raw-safe for spreadsheet formula-like text and keyed by stable IDs.
- Outbox worker SQL uses lease/claim semantics with capped attempts and manual-review states. Remote worker scheduling is not enabled in BUILD A.

## Dependency Review Continuation
- `package.json`, `package-lock.json`, and installed `node_modules` now agree for `pg`: package range `^8.13.1`, lock root `^8.13.1`, lock package `pg@8.23.0`, installed `pg@8.23.0`.
- `docs/npm-audit-current.json` is a valid npm audit JSON report (`auditReportVersion: 2`), not a network/error response. It reports 14 total findings: 1 critical, 6 high, 5 moderate, 2 low.
- Install scripts reviewed before validation. `sharp@0.34.5` has an install/check script (`node install/check.js || npm run build`), but `sharp` and its optional platform packages are already installed from the owner-run `npm ci --ignore-scripts`; no skipped script was run or requested.
- Critical/high priority:
  - `next@16.2.4` direct dependency, runtime and build. Audit range includes `9.3.4-canary.0 - 16.3.2`; public Next advisories list the critical Windows-hosted RCE and AVIF Image Optimization API RCE as patched in `16.3.3`. Smallest supported fix: approved dependency update to `next>=16.3.3` and rebuild/redeploy. Plausible deployed relevance: high if the deployed website uses this checkout's Next version; this repo uses App Router, Next Image, and `images.formats` includes AVIF. No `middleware.*` or `proxy.*` file was found locally, reducing relevance for middleware-bypass subfindings but not the direct Next/Image findings.
  - `postcss@8.5.10` direct dev/build dependency, also `next` bundles `postcss@8.4.31`. Audit range is `<=8.5.22`; public PostCSS advisories list the latest patched floor as `8.5.23`. Smallest supported fix: approved direct `postcss>=8.5.23`; Next-bundled PostCSS should be handled through the Next upgrade. Plausible deployed relevance: mainly build-time unless the deployed app processes attacker-controlled CSS at runtime; no such runtime CSS processing was found in the intake path.
  - `sharp@0.34.5` transitive through `next`, runtime/build image optimization. Audit range is `<=0.35.4-rc.0`; finding is inherited native image-library risk. Smallest supported fix: approved Next/sharp-supported dependency path, expected through patched Next and compatible `sharp>=0.35.4` if still surfaced. Plausible deployed relevance: possible where Next's image optimizer handles untrusted or attacker-reachable image input; local config enables AVIF.
  - `brace-expansion@1.1.14` via `eslint -> minimatch`, and `brace-expansion@5.0.5` via `eslint-config-next -> typescript-eslint -> minimatch`; toolchain/development use. Public advisory lists patched floors `1.1.18` and `5.0.9`. Smallest supported fix: approved upgrades through eslint/typescript-eslint/minimatch dependency tree or package overrides after compatibility review. Plausible deployed relevance: low for the website runtime unless server code accepts attacker-controlled glob patterns; none found.
  - `browserslist@4.28.2` via `autoprefixer` and related build tooling. Public advisory lists patched floor `4.28.7`. Smallest supported fix: approved lock refresh/update to `browserslist>=4.28.7` through supported build-tool ranges. Plausible deployed relevance: low runtime; build/CI risk if attacker-controlled browserslist queries or stats are processed.
  - `js-yaml@4.1.1` via `eslint -> @eslint/eslintrc`; development/lint config parsing. Public advisories list patched floors through `4.3.2`. Smallest supported fix: approved eslint/eslintrc dependency update that pulls `js-yaml>=4.3.2`. Plausible deployed relevance: low for runtime; relevant to developer/CI processing of untrusted YAML.
  - `nanoid@3.3.11` via `postcss`; build/runtime-adjacent transitive dependency. Audit range is `<=3.3.17`; smallest supported fix: approved update to a patched `nanoid` through `postcss`/lockfile once supported. Plausible deployed relevance appears low because app code does not call nanoid directly, but it remains part of the dependency risk set.
- No automatic audit fixes or dependency upgrades were applied.

## Environment Variable Names Only
- `INTAKE_DURABLE_STORE`
- `DATABASE_URL`
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `CONTACT_FROM_EMAIL`
- `CONTACT_TO_EMAIL`
- `CONTACT_SUBJECT_PREFIX`
- `RESEND_API_KEY`
- `RESEND_TEST_MODE`
- `SOS_101_TEST_DATABASE_URL`

## Commands And Actual Results
- `cmd /c npm install --package-lock-only --ignore-scripts`
  - Result: BLOCKED. Command produced no output under restricted network and was stopped.
- `cmd /c npm install --package-lock-only --ignore-scripts --cache .npm-cache`
  - Result: BLOCKED. Workspace-local cache avoided the global cache write concern, but npm still failed HTTPS fetches to `https://registry.npmjs.org/pg` and `https://registry.npmjs.org/npm` with `EACCES`.
- `cmd /c npm test`
  - Result: NOT RUN to completion. Failed immediately because `tsc` is unavailable without installed dependencies.
- `cmd /c npm ci --ignore-scripts`
  - Result: BLOCKED. Failed fetching `pg` from `https://registry.npmjs.org/pg` with `EACCES`.
- `cmd /c npm run lint`
  - Result: NOT RUN to completion. Failed because `eslint` is unavailable without installed dependencies.
- `cmd /c npx tsc --noEmit`
  - Result: BLOCKED. Tried to fetch `tsc` from npm registry and failed with `EACCES`.
- `cmd /c npm run build`
  - Result: NOT RUN to completion. Failed because `next` is unavailable without installed dependencies.
- `git diff --check`
  - Result: PASS. No whitespace errors reported.
- `cmd /c npm config list`
  - Result: PASS. No workspace or user `.npmrc` override was found; npm used the normal Node/npm installation.
- `node -e "const p=require('./package.json'); const l=require('./package-lock.json'); console.log('package pg:', p.dependencies.pg||null); console.log('lock root pg:', l.packages[''].dependencies.pg||null); console.log('lock has node_modules/pg:', Boolean(l.packages['node_modules/pg']));"`
  - Result: FAIL/CONFIRMED MISMATCH. `package.json` has `pg: ^8.13.1`; `package-lock.json` has no root `pg` entry and no `node_modules/pg` package entry.
- `git update-index --refresh -- package-lock.json`
  - Result: BLOCKED. Git reported insufficient permission adding an object to `.git/objects`; the lockfile has no content diff, but Git still reports it modified from line-ending/index state.

Continuation validation after owner lockfile refresh:
- `node -e "...pg/package/lock/install check..."`
  - Result: PASS. `package.json` and lock root both specify `pg: ^8.13.1`; lockfile and installed package both resolve to `pg@8.23.0`.
- `node -e "...docs/npm-audit-current.json validation..."`
  - Result: PASS. Valid npm audit JSON report with `auditReportVersion: 2` and metadata total 14 findings.
- `cmd /c npm ls next postcss sharp brace-expansion browserslist js-yaml nanoid pg resend svix uuid --all`
  - Result: PASS. Confirmed installed dependency paths used in the audit review.
- `cmd /c npm test`
  - Initial continuation result: FAIL before tests because TypeScript exposed local typing issues in SOS-101 code/tests.
  - Final continuation result: PASS. 13 tests discovered; 12 passed; 1 PostgreSQL contract test skipped until `SOS_101_TEST_DATABASE_URL` points to an approved disposable database.
- `cmd /c npm run lint`
  - Initial continuation result: FAIL because lint scanned generated `.tmp/sos-101-tests` JavaScript output from the synthetic test build.
  - Final continuation result: PASS after ignoring `.tmp/**`.
- `cmd /c node_modules\.bin\tsc --noEmit`
  - Initial continuation result: FAIL because the repo was missing generated `next-env.d.ts` and the SOS test env type was too narrow for `NodeJS.ProcessEnv`.
  - Final continuation result: PASS using the installed local TypeScript compiler; no `npx` fetch was used.
- `cmd /c npm run build`
  - Result: BLOCKED by environment network access to Google Fonts. Next/Turbopack failed fetching `Fraunces` and `Sora` from `https://fonts.googleapis.com/...` through `next/font/google`.
- `git diff --check`
  - Result: PASS. No whitespace errors; Git reported line-ending warnings only.

## Validation And Release-Risk Pass
- Existing form design: confirmed unchanged in practical terms. The visible fields, validation prompts, buttons, and layout were not expanded. Hidden `clientSubmissionToken`, `landingPagePath`, and `referrer` metadata were added to POST bodies only.
- Required customer steps: not expanded. Main quote, giveaway estimate, and email opt-in still ask for the same visible customer inputs as before.
- Removed route behavior: direct inline Resend sending was removed from `src/app/api/contact/route.ts` and moved behind the intake service. The route no longer logs `[contact-config]`, `[contact-send-success]`, or detailed Resend error payloads. Notification state is now intended to be persisted in intake jobs instead of using route logs as the only trace.
- Changed success meaning: before BUILD A, success meant Resend accepted the email. After BUILD A, success means the inquiry was accepted and saved; email can be failed/ambiguous and recoverable after the save.
- Giveaway opt-in behavior: the email-only giveaway opt-in no longer fails server validation because it lacks full estimate fields; it is captured as non-actionable opt-in intent, not as a sales opportunity.
- Package dependency risk: `package.json` and `package-lock.json` do not currently agree for `pg`. The necessary correction is a lockfile refresh from npm registry metadata, but npm registry fetches are blocked in this environment. No manual lockfile fabrication was performed.
- Ordinary page risk: ordinary website page rendering does not depend on PostgreSQL. Repository search found the database-backed intake path only through `POST /api/contact`; page loads and navigation do not open a database connection.

## Npm EACCES Diagnosis
- Exact blocked command: `cmd /c npm install --package-lock-only --ignore-scripts --cache .npm-cache`.
- Redacted error summary: npm retried HTTPS GET requests to `https://registry.npmjs.org/pg` and `https://registry.npmjs.org/npm`, then failed with `EACCES` / `FetchError`. No secrets or auth tokens appeared in the npm config or log excerpt reviewed.
- What was ruled out: switching to a workspace-local cache wrote logs successfully, so the remaining blocker is not just the global npm cache directory.
- Smallest manual action needed: allow this workspace or terminal session to make npm HTTPS GET requests to `registry.npmjs.org`, or run `cmd /c npm install --package-lock-only --ignore-scripts --cache .npm-cache` in an approved environment with npm registry access. Do not disable security controls, weaken PowerShell execution policy, or change global permissions.

## Failure Behavior Review
- Database unavailable or misconfigured: valid form submission returns a retriable server error and the client keeps form inputs because values are only cleared after success. No false success is returned before durable capture.
- Email failure after commit: the saved inquiry still returns success with IDs; the notification job is marked `failed` or `ambiguous` for recovery. This intentionally changes the meaning of success from email-delivered/accepted to intake-saved.
- Drive sync failure: no live Drive sync is enabled in BUILD A. A projection job is created for later processing; Drive failure should not undo capture. Actual retry/manual-review behavior still needs the protected worker/scheduler implementation and real Drive adapter in a later gated build.
- Duplicate submission: same `clientSubmissionToken` plus same normalized payload replays the same event/opportunity and does not send a second notification. Same token plus changed normalized payload conflicts. Real database concurrency behavior is written for but not verified without PostgreSQL.
- Worker recovery: SQL constants define claim/lease, retry, done, capped attempts, and manual-review states. A deployed protected worker/scheduler is not implemented or enabled in BUILD A, so recovery is designed but not operationally verified.

## Rollback Plan Without Discarding Saved Inquiries
- Before production migration: revert the SOS-101 code/doc changes only; no inquiry rows exist yet.
- After production migration but before launch: disable the route from using `INTAKE_DURABLE_STORE=postgres` only after confirming no test/customer rows need preservation. Keep exported migration state for review.
- After real customer capture starts: do not drop intake tables or delete outbox rows. Roll back website behavior with a code/config change while preserving `intake_source_events`, `intake_opportunities`, `intake_outbox_jobs`, and `intake_drive_projection_state` for owner review/export.
- Any rollback must keep customer inquiries readable by an approved owner path before old email-only behavior is restored.

## Tests Written
- Main inquiry produces one source event, one opportunity, and notification/projection jobs.
- Identical token replay returns the same committed IDs without a second notification send.
- Same token with changed normalized payload conflicts.
- New token for the same contact can create a new legitimate inquiry.
- Giveaway opt-in and no-estimate giveaway entries do not become sales opportunities.
- Honeypot, malformed JSON, invalid payload, and oversized payload handling.
- Database failure does not claim success.
- Notification failure/exception after commit leaves saved recoverable work.
- Ambiguous provider acknowledgement is represented explicitly.
- Drive projection output is keyed and spreadsheet-formula safe.
- PostgreSQL transaction/lease contract test is present but skipped unless `SOS_101_TEST_DATABASE_URL` is set.

## Tests Not Run
- Real PostgreSQL idempotency/concurrency/restart tests were not run. They require an approved disposable PostgreSQL test database with synthetic data.
- No Resend, Google, Drive, Sheet, cloud database, scheduler, deployment, or production credential test was run.

## Cloud Connected / Deployed / Operationally Verified
- Cloud connected: no.
- Deployed: no.
- Real messages sent: no.
- Production credentials used: no.
- Operational owner-visible Drive view verified: no.
- PostgreSQL persistence verified against a real instance: no.

## Remaining Gates
- Approve a separate dependency-remediation task for the critical/high audit findings, led by `next>=16.3.3` and supported updates for PostCSS/sharp/toolchain transitive packages. Do not use `npm audit fix` automatically.
- Re-run `npm run build` in an environment that can fetch configured Google Fonts, or approve a separate font-hosting change.
- Approve and provide a disposable PostgreSQL test instance for real transaction/concurrency tests.
- Review Neon/Vercel cost, region, environment mapping, backups, and access before provisioning.
- Configure a protected scheduler/worker path for outbox recovery.
- Configure restricted Google Sheets/Drive credentials and target file for the projected lead view.
- Confirm staffed response hours and escalation timing before enabling deadlines.

## Rollback Limits
- Before migration/application, rollback is a code revert of SOS-101 files.
- After a real database is migrated, rollback must preserve captured rows and outbox state; do not drop tables without export/retention approval.
- The current patch does not deploy or migrate any remote database.

## Next Small Task
Restore npm registry/dependency access, refresh the lockfile, run the local stubbed suite, then use an approved disposable PostgreSQL database to run the transaction/concurrency tests.
