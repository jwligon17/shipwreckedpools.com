# CODEX Run Status

Last updated: 2026-09-15

## Owner project direction and Google Search Console evidence - 2026-09-15

- **Controlling direction:** This dated owner update supersedes all earlier authorization to run PostgreSQL tests or continue database setup, including earlier next-action instructions below. Historical results and checkpoints are preserved for reference, not renewed authorization.
- **SOS-101, SOS-103, SOS-104 and dependent custom database development: PARKED.** Preserve all existing code, tests, runbooks, unfinished work and the existing Neon resource. Do not delete, revert, reset or deploy them. Do not run database connections/tests, paste diagnostics, run installation commands or recovery workers, or perform further setup. The thirteen PostgreSQL cases remain **NOT RUN**. Resume only after new explicit owner approval.
- Keep the live website's existing email-only inquiry process and Jason-to-Kristen manual Skimmer handoff unchanged.
- **SOS-111 read-only review: COMPLETE.** Keep the existing host/canonical/sitemap implementation; full live consistency remains only partly verified. Keep the homepage title and description. Preserve the switching-provider FAQ suggestion as **OPTIONAL**; do not implement or deploy it now.
- **Owner-supplied Google Search Console evidence:** Google fetched the corrected HTTPS-www robots.txt. The homepage and weekly-service page (`/services/weekly-services`) passed live eligibility checks, and indexing requests were accepted for both pages. Actual weekly-service indexing remains **UNCONFIRMED**. This updates the earlier rejection evidence below; accepted requests do not establish actual indexing. No independent live recheck was performed for this update.
- Update scope: only this existing `docs/CODEX_RUN_STATUS.md` in the original workspace. Preserve historical results. No application-code changes, frozen release checkout edits, branch synchronization, repeated tests/builds, push or deployment.

## SOS-111 - Focused indexing rejection investigation - 2026-09-14

- Status: SOURCE / SAVED BUILD INSPECTION COMPLETE; LIVE CAUSE UNCONFIRMED. Scope limited to homepage and `/services/weekly-services` crawl rules, robots metadata/headers, public site variables, sitemap, canonicals and host redirects. Inspected clean frozen candidate HEAD `06499efa76bb265a992ead66fd6f38ea91a40d9b`, matching the owner-reported deployed commit; did not treat unfinished original source as production.
- Owner evidence: indexing requests rejected for both www URLs; homepage stored status says "URL is on Google"; weekly URL stored status says "URL is unknown to Google". Exact live-test failures pending. These stored statuses do not identify the cause of the current live-test/request rejection. Owner now confirms LIVE form reaches inbox: pending SOS-109 live-delivery item CLOSED using owner evidence; no agent submission or independent delivery test.
- Exact source condition (`src/lib/site.ts:3`): only `process.env.NEXT_PUBLIC_SITE_LIVE === "true"` enables indexing. Missing, empty, differently cased or whitespace-padded values evaluate false. `src/app/robots.ts` emits `User-Agent: *` with `Allow: /` when true, otherwise `Disallow: /`; sitemap reference is emitted in either case. No separate Googlebot crawl rule.
- `src/app/layout.tsx:50` sets both general robots and googleBot index/follow to that same boolean. Homepage and weekly metadata do not override robots. False therefore generates noindex/nofollow for both. No source X-Robots-Tag rule found; `next.config.ts` headers cover only static-media caching. Live response headers and any hosting-level header/protection behavior remain unverified.
- Exact URL condition (`src/lib/site.ts:5`): `NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000"`; removes one trailing slash, defaults only when absent, and does not trim/validate or force www/HTTPS. Layout uses `new URL(siteUrl)` as metadataBase and `/` as homepage canonical; weekly metadata uses `/services/${service.slug}`. `src/app/sitemap.ts` includes homepage and the existing weekly service through `site.services`, regardless of isSiteLive. Intended www output requires the correct siteUrl; actual deployment value not assumed.
- Host redirects: no www/non-www enforcement in committed Next config, no committed vercel.json/middleware/proxy or static robots override found. Existing weekly legacy redirects target `/services/weekly-services`; saved route manifest records 308. Domain-level www/non-www redirects must be established from live responses/Vercel domain settings, not inferred from repository config.
- Base comparison against `759e51027ab6ae9930167ac9f2ea309b910153a0`: robots.ts, sitemap.ts, lib/site.ts, layout.tsx, homepage metadata/source, site content and next.config.ts unchanged. Weekly page diff changes only hero copy/CTA, not generateMetadata. SOS-109 did change dependency versions; unchanged control source alone does not prove identical deployed rendering or environment. No indexing-control source regression established.
- Existing LOCAL build `YHnrhF0sJ2PbAAszG3hWU`: saved robots body is `Disallow: /` with localhost sitemap; homepage and weekly HTML contain robots/googlebot noindex,nofollow and localhost canonicals; both target paths occur in saved sitemap under localhost. Existing sanitized helper omits both NEXT_PUBLIC_SITE variables. These are local fallback artifacts, NOT evidence of Vercel's deployed values/output. No build or tests repeated.
- Limited public reads: web tool could not open the four www page/robots/sitemap URLs (tool-level safe-open error). Direct GET attempts to those four URLs plus non-www homepage and weekly URL all failed with EACCES before receiving an HTTP response. No live status, body, X-Robots-Tag or redirect chain obtained. Sandbox failure is not proof of site outage, Googlebot denial or bad production robots.
- Required Google evidence: for each exact URL, retain live-test timestamp, detailed failure reason, crawl allowed / page fetch / indexing allowed results and any tested-page response evidence available; keep stored index status separate. Required Vercel/owner evidence: deployment-specific build-time NEXT_PUBLIC_SITE_LIVE and NEXT_PUBLIC_SITE_URL settings for this Production deployment (only these non-secret settings), actual public robots.txt/sitemap.xml, both pages' robots/canonical tags and X-Robots-Tag/status headers, plus www/non-www redirect status and Location. No credential collection, provider discovery or firewall changes.
- Smallest justified correction: NONE yet. If Production evidence confirms the shared switch is false or siteUrl is wrong, the bounded proposed correction is only the relevant Production public environment setting (`NEXT_PUBLIC_SITE_LIVE=true`, `NEXT_PUBLIC_SITE_URL=https://www.shipwreckedpools.com` for the intended www host), with refreshed deployment output handled in a separately authorized implementation step. If those controls are correct, follow the specific Google fetch/eligibility failure instead; do not broaden SEO changes or assume a firewall issue. No correction applied in this investigation.
- Only this existing status file updated. No application/config/package edits, builds, tests, firewall changes, forms, credentials, messages, database connections, push/deployment, pull/reset/Sync Changes. Original unfinished work and release preserved. Existing thirteen guarded database cases remain NOT RUN pending owner test-only confirmation and private endpoint/credential verification; no new resource or production connection.

## SOS-109 - Owner-executed release checkpoint - 2026-09-14

- Current status: PUBLISHED BY OWNER. Owner reports GitHub accepted `759e510 -> 06499efa76bb265a992ead66fd6f38ea91a40d9b`; owner reports their Vercel screenshot shows that release commit Ready in Production. This is owner-executed evidence, not an independent agent remote/deployment check. Vercel Hobby retained; hosting decision is closed.
- Owner confirms public quote links work. At this release checkpoint, actual live form-to-inbox receipt was not yet confirmed; owner subsequently confirmed LIVE inbox receipt on 2026-09-14 (SOS-111 checkpoint above). Live-delivery item is now CLOSED using owner evidence.
- Release commit remains `06499efa76bb265a992ead66fd6f38ea91a40d9b`; rollback base remains `759e51027ab6ae9930167ac9f2ea309b910153a0`. This checkpoint supersedes prior publication-pending and nothing-pushed/deployed statements as the current release status; earlier entries remain historical evidence.
- Updated only this existing status document. No tests, rebuild, repush, release changes, pull, reset or Sync Changes performed. Frozen release candidate and original unfinished workspace/database work preserved separately.
- Database next action remains the existing thirteen guarded PostgreSQL cases against the selected existing Free Neon resource, only after owner test-only confirmation and private endpoint/credential verification under `docs/SOS-101_POSTGRES_TEST_RUNBOOK.md`. All thirteen remain **NOT RUN**. No new resource, production connection or real message; all isolation and cleanup safeguards remain in force.

## Historical checkpoint - SOS-109 approved release saved locally

- Status: OWNER CODE APPROVAL RECORDED; LOCAL RELEASE COMMITTED; PUBLICATION AUTHORIZED. Owner decided to retain Vercel Hobby; hosting is no longer an open decision. Owner will publish from a normal terminal because this environment could not reach GitHub. Do not request the same code approval again. No upgrade, migration, repeated testing, parallel agent push or frozen-candidate edits.
- Owner manual validation COMPLETE: 390x844 mobile PASS; 1440x900 desktop PASS; weekly-service link and both quote links work; form renders; nothing submitted. This closes the earlier manual-validation blocker. Prior final lint, TypeScript, 44/44-page build, audit, mocked-email and HTTP evidence remains accepted; no completed tests/builds/audits rerun for unchanged code.
- Reused `.tmp/sos-109-rc`, created local branch `release/sos-109-approved`, and committed only the four reviewed files using explicit file staging. Release commit: `06499efa76bb265a992ead66fd6f38ea91a40d9b`. Verified parent / rollback base: `759e51027ab6ae9930167ac9f2ea309b910153a0`. Candidate working tree is clean.
- Committed file scope: `package.json` retains the four reviewed security pins; `package-lock.json` saves the reviewed dependency resolution; `src/components/hero.tsx` links Weekly service to its existing route; `src/app/services/[slug]/page.tsx` saves the weekly-service description and quote CTA. No new application edits in this checkpoint.
- Candidate `origin` fetch/push URLs both point to `C:/Users/krist/shipwreckedpools.com/.`, the original workspace, and were left unchanged. Do not push to this local origin. Intended repository: `https://github.com/jwligon17/shipwreckedpools.com`.
- Read-only `git ls-remote --symref https://github.com/jwligon17/shipwreckedpools.com.git HEAD refs/heads/main` failed (exit 1): could not connect to github.com:443. Real remote tip remains UNVERIFIED; cached/local refs are not current remote evidence. Recheck remote work before any future release integration; no overwrite, reset or force-push authorized or performed.
- Original working copy and unfinished SOS work preserved. Current handoff updates only this status and the existing PostgreSQL runbook in the original workspace; no original application files staged or committed. Frozen release commit remains `06499efa76bb265a992ead66fd6f38ea91a40d9b`. Publication is owner-led and not yet reported complete; no agent push, merge, deployment, paid change or real message.

## SOS-101 / SOS-103 - Database lane resumed; destination confirmation pending

- Work location: ORIGINAL `C:\Users\krist\shipwreckedpools.com`, not the frozen release candidate. Read the current `docs/SOS-101_POSTGRES_TEST_RUNBOOK.md` and inspected the existing fixture and thirteen PostgreSQL cases without execution. Completed setup and local validation were not restarted; no features or database created.
- Next milestone: run those existing thirteen cases against the owner-reported existing Free Neon test resource. PostgreSQL execution remains **NOT RUN**; no connection attempted. Previous 26 database-free passes and 13 integration skips remain historical evidence, not persistence proof.
- Owner-selected existing Free Neon resource (from owner's screenshot selections): project `neon-coffee-ferry`, project ID `purple-smoke-18418293`, branch `main` (default), database `neondb`, role `neondb_owner`, direct connection with pooling off. Selections recorded; do not create another resource or repeat provider discovery.
- Before connection/execution, wait for owner's explicit disposable, synthetic test-only confirmation and separation from application/staging/production data, plus private endpoint/credential verification against this selected resource. Resource selection alone does not authorize execution or prove isolation. Use the existing runbook's private terminal prompts for actual endpoint and credential values; never request passwords or connection strings in chat. Preserve all destination, TLS, schema-isolation and cleanup safeguards. No production database, paid changes, application credentials or real messages.
- After that confirmation and private configuration, use the existing authorized-terminal runbook block from the original root. Retain redacted numeric exits, each of the thirteen case results and per-schema cleanup evidence. No skip counts as a database pass; no new provisioning or broader cleanup is authorized.

## Historical checkpoint - SOS-109 final candidate handoff review

- Status: FINAL DIFF/AUDIT REVIEW PASS; six mocked email scenarios PASS; local HTTP smoke checks PASS; mobile/desktop browser checks NOT RUN to completion. Owner reports final candidate lint, full build (44/44 pages), and TypeScript completed without errors; accepted as owner-executed evidence, not agent reruns. No rebuild or package repair performed in this handoff.
- Source-reference item CLOSED: owner supplied the Vercel Production Source commit reference and confirmed its full SHA is `759e51027ab6ae9930167ac9f2ea309b910153a0`, matching candidate HEAD. Base is now confirmed against the owner-supplied production source evidence, no longer provisional. Existing `.tmp/sos-109-rc` reused; original checkout and unfinished SOS work preserved.
- Read `.tmp/SOS-109-audit-after-final-fix.json` from the ORIGINAL repository root. Valid npm audit report version 2, no error object, empty vulnerabilities map, all six severity/total counters zero, dependency metadata total 445. This supports the owner's final zero-vulnerability result and supersedes the preceding candidate's seven-family residual findings. No new network audit was run; npm's report has no embedded lockfile hash, so attribution to the final candidate relies on the owner's supplied execution evidence plus local dependency review.
- Audit-evidence item CLOSED: actual report review is complete and owner confirms it is the final candidate report. No missing audit evidence remains; the prior historical audit blockers below do not apply to this final candidate.
- Final scope: exactly `package.json`, `package-lock.json`, `src/components/hero.tsx`, and `src/app/services/[slug]/page.tsx`. Manifest still differs from base only in four reviewed pins: next/eslint-config-next 16.3.4, postcss 8.5.28, resend 6.17.2. Lock roots agree with declarations; all added/changed package versions match the original repair evidence, including final Babel/humanfs/browser data/brace-expansion/js-yaml/selector-parser repairs. Checked 391 installed package versions against the lock; missing platform entries are optional/platform-qualified. No pg, intake dependencies/scripts/code, schema, forms, email-only handler, service data, or Next config changes. Other service slugs retain their existing behavior.
- Refreshed `.tmp/SOS-109-security-only.patch` from candidate `git diff -- package.json package-lock.json`; applicability against base index and reverse applicability against final files PASS. `.tmp/SOS-109-seo-only.patch` unchanged and reverse applicability PASS. Whitespace checks PASS. These remain separate security and SEO review artifacts; no app/dependency edits were made during this turn.
- Agent rerun: `node .tmp/sos-109-check.cjs email` PASS (exit 0), all six existing mocked handler scenarios against final candidate dependencies. Actual installed Resend with mocked fetch; no real messages, credentials, HTTP form submission or database connection.
- Existing production build ID `YHnrhF0sJ2PbAAszG3hWU` started through the sanitized helper at 127.0.0.1:3109. GET `/`, `/services/weekly-services`, and `/contact` all returned 200. Existing built HTML contains the expected H1s, quote links, weekly quote label and contact form. These are HTTP/static checks, not visual browser validation. Parent lockfile exclusion warning retained; no turbopack.root or tracing-root broadening.
- Browser attempt used installed headless Chrome with a fresh task-only profile and local CDP helper configured to restrict page traffic to local GETs. Debugging connection did not remain usable, no screenshots/results were produced, and watchdog exited 1. Browser mobile/desktop checks therefore NOT RUN to completion. Preview stopped after HTTP checks; no live form action, call or message occurred. Task-profile Chrome cleanup could not be verified because Windows process inspection returned Access denied; unrelated Chrome processes were not terminated.
- Evidence-update continuation: final candidate still has exactly the four reviewed changed files, and both existing patches reverse-check successfully against the candidate. No patch regeneration, package repair, build/lint/TypeScript/audit rerun or mocked-email rerun was needed; the completed final-dependency results above remain valid. Attempted the outstanding browser checks with installed Edge and an isolated task profile: CDP WebSocket connected, then the browser exited with code 2147483651 before results/screenshots. Mobile/desktop visual and click-through checks remain BLOCKED / NOT RUN to completion. No browser security controls were disabled and no application/config changes were made.
- Exact remaining preview command from a normal PowerShell terminal (no rebuild needed):

```powershell
Set-Location -LiteralPath 'C:\Users\krist\shipwreckedpools.com'
node .tmp/sos-109-check.cjs start
```

- Manual checklist at `http://127.0.0.1:3109`, in both 390x844 and 1440x900 viewports: inspect homepage and `/services/weekly-services` for readable copy, visible quote buttons, sensible wrapping and no horizontal overflow; follow homepage hero “Weekly service” to the weekly page; follow homepage and weekly quote links to `/contact`; confirm the existing form renders without submitting. Do not call or text. Ctrl+C stops preview.
- Only outstanding validation item: complete the manual mobile/desktop visual/navigation checklist above using the existing built preview. Source-reference, audit evidence, final diff/security-patch review and final-dependency mocked email checks are complete. Prior provisional-base, security-repair and build-blocked statements below are historical and superseded. No new features, upgrades, form/schema changes, database work, credentials, push, merge or deployment.

## Historical checkpoint - SOS-109 separate security dependency patch

- Status: REVIEWED FOUR-PIN PATCH PREPARED; dependency install, lint, TypeScript and mocked email compatibility PASS; audit/build network BLOCKED; browser NOT RUN; security NOT cleared. Base `759e51027ab6ae9930167ac9f2ea309b910153a0` remains PROVISIONAL pending owner confirmation of the current/intended release commit.
- Reused `.tmp/sos-109-rc`; no additional checkout. Original application code, package files, intake changes, tests and other SOS documents preserved. Updated only this status document in the original tracked checkout; validation helpers and exported patches remain under ignored `.tmp`.
- Separate review artifacts: `.tmp/SOS-109-seo-only.patch` is unchanged (SHA256 `A3CFC375DAF8547C29386B35417B263BE1E18EBB85909E098C0D5563858E8911`), containing only `src/components/hero.tsx` and `src/app/services/[slug]/page.tsx`. `.tmp/SOS-109-security-only.patch` contains only `package.json` and `package-lock.json` (four pins, npm-generated lock diff). Both patch applicability checks PASS; total candidate status contains exactly those four files.
- Manifest changes: next `^16.0.0` -> `16.3.4`; resend `^6.12.2` -> `6.17.2`; eslint-config-next `^16.0.0` -> `16.3.4`; postcss `^8.4.49` -> `8.5.28`. No other direct dependency or script changed; no pg/intake dependencies, SOS test scripts, database files, form changes or whole-file copying from the dirty checkout.
- Lock generation: `node .tmp/sos-109-check.cjs lock` ran npm install --package-lock-only --ignore-scripts --offline --no-audit --no-fund against candidate declarations and the existing cache; PASS (exit 0). All newly added/changed package versions match the original repair lockfile evidence. Npm updated required Next/SWC/Sharp/PostCSS dependencies and removed svix/uuid; retained unrelated locked versions, plus npm-generated metadata adjustments. No hand-written lock entries or broad npm audit fix.
- Installation: `node .tmp/sos-109-check.cjs install` ran offline npm ci in the candidate; PASS, 390 packages. Lock root matches manifest exactly, and installed validation tools match candidate locked versions. Candidate handler, contact page/forms and service content remain identical to base; diff/whitespace checks PASS.
- Validation: candidate `lint` PASS (exit 0); `types` PASS (exit 0); `email` PASS, six direct synthetic handler scenarios using actual installed Resend 6.17.2 with global fetch mocked before loading the SDK. Covered contact and giveaway success, honeypot, invalid email, missing configuration and provider rejection; checked recipient, reply_to, subject and body. No HTTP form submission, real transport, credentials or messages. Initial harness expected an array recipient; corrected to the string the unchanged handler supplies and SDK serializes, then all checks passed. Application code was not changed.
- Full `build` attempted with Next 16.3.4; FAILED (exit 1) because Fraunces and Sora downloads from fonts.googleapis.com could not connect. Fonts/config unchanged. This Next version explicitly ignored the parent lockfile as outside the candidate Git repository, resolving the earlier workspace-root inference warning without a config change. Mobile/desktop browser checks NOT RUN because no production build/server is available; Chrome/Edge executables were previously found locally.
- Fresh `audit` attempted once; BLOCKED (exit 1) at https://registry.npmjs.org/-/npm/v1/security/advisories/bulk. No retry or security-control change. Prior zero-audit evidence from the original dirty checkout does not clear this narrower candidate.
- Remaining known security evidence: comparing candidate versions with affected ranges in saved `docs/npm-audit-current.json` still matches seven package families / eight paths: @babel/core 7.29.0 (low), @humanfs/node 0.16.7 (moderate), baseline-browser-mapping 2.10.19 (moderate), brace-expansion 1.1.14 and nested 5.0.5 (high), browserslist 4.28.2 (high), js-yaml 4.1.1 (high), postcss-selector-parser 6.1.2 (low). This is an offline comparison against historical audit evidence, not a fresh audit result. Additional remediation requires a separately approved bounded scope; none was silently added to this four-pin patch.
- Owner continuation for network-blocked audit and font build (existing dependencies are already installed): run the following once from a normal network-enabled PowerShell terminal. The helper filters child environment variables and targets only this candidate. Audit results still need review even if the build succeeds.

```powershell
Set-Location -LiteralPath 'C:\Users\krist\shipwreckedpools.com'
node .tmp/sos-109-check.cjs audit
node .tmp/sos-109-check.cjs build
if ($LASTEXITCODE -ne 0) { throw 'Candidate build failed; do not start preview.' }
node .tmp/sos-109-check.cjs types
if ($LASTEXITCODE -ne 0) { throw 'Candidate TypeScript failed; do not start preview.' }
node .tmp/sos-109-check.cjs start
```

- Manual browser continuation: at `http://127.0.0.1:3109`, use 390x844 and 1440x900; inspect `/` and `/services/weekly-services` for readable copy, CTA wrapping and overflow, follow the weekly link and quote links to `/contact`, and confirm the existing form renders. Do not submit, call or text; Ctrl+C stops the preview.
- Release requirements: confirm intended base SHA; review separate SEO/security patches; authorize and validate remaining security remediation plus a fresh audit; finish full build and browser checks. No release clearance, database work, production credentials, push, merge or deployment.

## Historical checkpoint - SOS-109 isolated local release-candidate validation

- Status: PROVISIONAL BASE ONLY; lint and TypeScript PASS; full build BLOCKED by Google Fonts network access; browser checks NOT RUN; security prerequisite OPEN. Database work remains paused.
- Base inspected: `759e51027ab6ae9930167ac9f2ea309b910153a0` (local HEAD and cached origin/main). This is NOT verified as current production or the intended release base. `git ls-remote origin refs/heads/main` failed to connect to github.com:443. Owner input pending: intended release SHA, backed by the hosting deployment record if production is the baseline. A remote branch tip alone is not deployment proof.
- Created a separate local clone at `C:\Users\krist\shipwreckedpools.com\.tmp\sos-109-rc` using `git clone --no-hardlinks --no-checkout . .tmp/sos-109-rc`, then detached at the full SHA above. Initial status was clean. Original checkout, tracked/untracked SOS code, tests, and documentation preserved; this status entry is the only tracked edit in the original checkout during this validation turn.
- Applied only `.tmp/SOS-109-seo-only.patch` with `git apply`, after its applicability check passed. RC diff: exactly `src/components/hero.tsx` and `src/app/services/[slug]/page.tsx`, 13 insertions / 8 deletions. Homepage hero links the existing “Weekly service” phrase to `/services/weekly-services`; weekly hero describes the already documented routine and adds “Get a Weekly Service Quote” pointing through the existing primary CTA to `/contact`. No entire dirty files copied.
- Scope checks PASS: reverse patch applicability, `git diff --check`, and unchanged manifest/lockfile, service content, contact page/API, and all three form components against the base. The service template changes are conditional on `slug === "weekly-services"`; all other slugs retain their previous description/actions. Metadata and schema are unchanged. These are source/diff checks, not browser or submission tests.
- Correct dependencies installed inside the RC: offline `npm ci --ignore-scripts --no-audit --no-fund` using the existing `.npm-cache`; PASS, 391 packages installed, no manifest/lockfile change. Did not borrow the original checkout's node_modules. Validation helper `.tmp/sos-109-check.cjs` uses an execution-only child environment, disables telemetry, and checks installed tool versions against the RC lockfile. No active env files or production credentials were copied.
- Actual checks: `node .tmp/sos-109-check.cjs lint` PASS (exit 0); initial `types` FAIL (TS2307 on unchanged About PNG import before generated Next declarations); `typegen` PASS; final `types` PASS (exit 0, `tsc --noEmit --incremental false`). `build` ran the full existing `npm run build`, Next 16.2.4, and FAILED (exit 1): Fraunces and Sora could not be fetched from fonts.googleapis.com. No successful production build is claimed. Next also warned that the nested clone's workspace root was inferred from the parent lockfile; this warning was retained, with no config/lockfile workaround applied.
- Browser checks: NOT RUN. Local Chrome and Edge executables exist, but the production build is unavailable; no server is running. To finish the blocked checks in a network-enabled terminal, from the original repository root run `node .tmp/sos-109-check.cjs build`, then after success `node .tmp/sos-109-check.cjs start`. The helper starts the RC on `http://127.0.0.1:3109` only. At 390x844 and 1440x900, inspect `/` and `/services/weekly-services` for readable copy, wrapping, visible CTAs, and horizontal overflow; follow the hero weekly link and each page's quote link to `/contact`; confirm the existing form renders. Do not submit, call, or text. Stop the server with Ctrl+C afterward.
- Security prerequisite, separate from SOS-109: this base locks next/eslint-config-next 16.2.4, postcss 8.5.10, resend 6.12.2. It does NOT include the previously reviewed next/eslint-config-next 16.3.4, postcss 8.5.28, resend 6.17.2 repairs. Security is NOT cleared; the dirty checkout's reported zero-audit result does not validate this RC. Before release, prepare/review a separate security-only manifest/lockfile change on the confirmed base for those previously reviewed versions, excluding pg, intake test scripts and unrelated churn; validate the resulting dependency tree, audit, lint/typecheck/build. No upgrades or security patch were performed in this turn.
- Smallest remaining release action: confirm the release-base SHA, resolve the separate security prerequisite, apply this same two-file SEO patch to that clean base and complete the blocked build/browser checks. Keep intake changes out of the release. No reset, stash, discard, new feature, database connection, form submission, messages, push, merge, or deployment performed.

## SOS-103 - Bounded local notification recovery

- Status: THREE RECOVERY GAPS CORRECTED LOCALLY; FULL BUILD PASS; real PostgreSQL **NOT RUN**.
- Known-safe retry failures now enter delayed retryable state; six-attempt cap retained. Shared claim processing moves exhausted jobs to manual_review. Initial and future recovery dispatch share exclusive claim, durable send-start and current-token acknowledgement fences.
- Ambiguous provider outcomes/timeouts are held; expired send-start jobs move to manual_review on the next claim, never blindly resent. Historical failed rows are not automatically promoted without evidence. No autonomous scheduler/review UI added.
- Actual agent checks: test compilation PASS; 26 database-free tests passed, 0 failed; original nine plus four new PostgreSQL cases explicitly skipped (13 NOT RUN), exit 0; whole-project lint PASS; full post-change build PASS, exit 0, Next 16.3.4 with build-integrated TypeScript and 44/44 static pages; git diff --check PASS (line-ending notices only).
- Preserved original nine PostgreSQL assertions, isolation fixture/guards, migration/schema, four preceding corrections, forms, roles and unrelated work. Existing core timeout assertion now explicitly requires ambiguous status rather than treating unknown delivery as failed; saved-success assertions preserved.
- Changed: outbox.ts, postgres.ts, types.ts, store.ts, service.ts under src/lib/intake; new notification-recovery.test.ts, extended intake-core.test.ts and postgres-contract.test.ts; existing implementation report, PostgreSQL runbook and this status. File-by-file detail and worker protocol are in the current implementation report.
- Remaining setup decision: approve/provide isolated disposable PostgreSQL and execution. No database/provider connection, credentials, real messages, provisioning, scheduler activation, push, merge or deployment. No schema change, new dependency or broader redesign needed.

## Historical checkpoint - SOS-101 / SOS-103 handoff review

- Status: REVIEW COMPLETE; POST-CORRECTION FULL BUILD PASS; all nine real PostgreSQL cases **NOT RUN**.
- Code inspection: confirmed source-row-only locking, READ COMMITTED/advisory token serialization, non-null exhausted-retry timestamp, and status/token/expiry acknowledgement fencing. Existing success assertions and runtime isolation safeguards remain intact. SOS source/tests are untracked: inspected their actual contents against the preceding session patch; no standalone Git correction commit is claimed.
- Prior corrective-session local checks retained without rerun: 20 tests passed, 0 failed, nine PostgreSQL skips; compilation, whole-project TypeScript, lint and whitespace PASS.
- New agent-executed full build: existing `npm run build` run once, PASS (exit 0), Next 16.3.4, compilation/build-integrated TypeScript complete, 44/44 static pages generated and optimization finalized. No owner-terminal rerun needed. Build child environment contained only execution-related Windows variables plus telemetry disabled; no active build env files or application/provider credentials. No contact POST/database/email/authenticated Google integration was invoked.
- Remaining code-inspection concerns (unfixed by design): failed notification rows are outside the claim predicate; final-attempt lease expiry can strand a leased job without manual-review transition; initial request sending still needs coordination with a future worker (including saved-success handling if a no-token acknowledgement is rejected). These block claims of complete automatic recovery, not completion of this bounded review. See implementation report for exact triggers and evidence limits.
- Real database behavior remains unverified: all nine cases NOT RUN; no database connection attempted. A successful application build is not persistence/worker proof.
- Only this status and `docs/SOS-101_IMPLEMENTATION_REPORT.md` edited; earlier results retained below. No package/app/test/schema edits, installs, new features, provisioning, real messages, push, merge or deployment.
- Remaining setup decision: approve/provide an isolated disposable PostgreSQL instance and execution. Separately review the recovery concerns before worker activation. Lane B redacted environment packet remains ready.

## Historical checkpoint - Authorized bounded local store/retry correction

- Status: FOUR VERIFIED FINDINGS CORRECTED LOCALLY; real PostgreSQL execution **NOT RUN**.
- Fixed nullable-join locking with FOR UPDATE OF se; serialized same-token capture within READ COMMITTED transactions; retained non-null timestamp at retry exhaustion; fenced done/retry and notification acknowledgements by current ownership/status/expiry, clearing released leases.
- Preserved all existing success assertions and runtime database-isolation safeguards. Added four database-free adapter tests and three PostgreSQL cases; extended existing stale/terminal assertions.
- Actual agent checks: test compilation PASS; final suite 20 passed, 0 failed, 9 PostgreSQL skips (exit 0); whole-project TypeScript PASS (exit 0); targeted ESLint PASS. Initial test-input and test-helper typing failures were corrected without weakening validation/guards; details in implementation report.
- Whole-project installed ESLint PASS (exit 0). Final whitespace check across all eight changed files PASS; migration hash unchanged. git diff --check PASS (line-ending notices only); reviewed scope preserves unrelated work.
- Changed files: src/lib/intake/postgres.ts; src/lib/intake/outbox.ts; tests/sos-101/postgres-contract.test.ts; tests/sos-101/postgres-adapter.test.ts; tests/sos-101/postgres-fixture.ts (type only); implementation report; PostgreSQL runbook; this status file.
- Schema/migration, dependencies, forms/fields, roles, and provider integrations unchanged. No build/audit rerun; owner-executed final repair evidence remains below and is not claimed as validation of these new corrections.
- Remaining setup decision: approve/provide an isolated disposable PostgreSQL instance and authorize execution. No database connection, provisioning, credentials, real messages, push, merge or deployment. Lane B redacted environment packet remains independently ready.

## Historical checkpoint - Lane A PostgreSQL test preparation before local corrections

- Status: LOCAL PREPARATION COMPLETE; ACTUAL POSTGRESQL EXECUTION **NOT RUN**.
- Replaced the placeholder with six strict integration cases; added guarded isolated-schema fixture, four database-free guard tests and a provider-neutral runbook. No production or dependency edits.
- Agent checks: test TypeScript compile PASS after fixing a test parameter type; targeted ESLint PASS; focused run 4 passed, 0 failed, 6 PostgreSQL cases explicitly skipped, exit 0. Child process test variables were removed to guarantee no database connection. Full existing checks were not repeated.
- Owner-executed final post-repair evidence: next/eslint-config-next 16.3.4, postcss 8.5.28, resend 6.17.2; 12 tests passed, 0 failed, 1 PostgreSQL skip; lint/standalone TypeScript successful; build generated 44/44 pages; final audit zero findings. Accepted from supplied evidence, not agent-executed reruns. Local metadata/audit-file read agrees; pg remains 8.23.0.
- Read actual dependency diff: four reviewed root pins plus pre-existing pg/test script. Full baseline lock diff includes additional transitive churn beyond the final repair summary; flagged for handoff review in the implementation report without changing packages or reopening repairs.
- Static store/SQL findings: outer-join FOR UPDATE, missing concurrent new-token conflict recovery, retry timestamp nullability, incomplete acknowledgement fencing. Production fixes proposed separately; strict integration assertions may fail when first executed.
- Files: `tests/sos-101/postgres-contract.test.ts`, `tests/sos-101/postgres-fixture.ts`, `tests/sos-101/postgres-guard.test.ts`, `docs/SOS-101_POSTGRES_TEST_RUNBOOK.md`, `docs/SOS-101_IMPLEMENTATION_REPORT.md`, this status file.
- Next independently ready task: Lane B redacted environment-readiness packet. Remaining setup decision: approve and supply one isolated disposable PostgreSQL instance with cost, region and access boundaries, then authorize real execution per runbook.
- No database connection, provisioning, migration, real email/Google interaction, account change, push, merge or deployment. Jason/Kristen ownership and info@shipwreckedpools.com are unchanged.

## Historical evidence - through 2026-09-12

The older blocked dependency/font-build/audit statements and commands below are superseded by the owner-executed final checkpoint above. Retained only as historical evidence; do not repeat those repairs.


Last updated: 2026-09-12

## SOS-401 - Targeted Dependency Remediation
- Status: BLOCKED BY NPM REGISTRY EACCES / NO DEPENDENCY UPDATE APPLIED
- Date: 2026-09-12
- Current results:
  - Owner reported normal-terminal pre-update build succeeded on Next.js `16.2.4`, generated 44/44 static pages, and exited 0.
  - Read `docs/npm-audit-current.json`, `package.json`, `package-lock.json`, `docs/SOS-101_IMPLEMENTATION_REPORT.md`, repository instructions, and checked for `docs/SOS-401_Dependency_Remediation_Review.md` before creating it.
  - Created `docs/SOS-401_Dependency_Remediation_Review.md` to record the exact-version plan, compatibility notes, blocked commands, and authorized-terminal commands.
  - Exact-version plan presented: `next@16.3.4`, `eslint-config-next@16.3.4`, `postcss@8.5.28`, `resend@6.17.2`.
  - No dependency update was applied; no lockfile fabrication was performed.
  - Forms, page design, URLs, inquiry ownership, schema, `info@shipwreckedpools.com`, and all SOS-101 work were preserved.
- Commands run:
  - `cmd /c npm view next@16 version peerDependencies dependencies.optionalDependencies engines --json`
  - `cmd /c npm view eslint-config-next@16 version peerDependencies dependencies.optionalDependencies engines --json`
  - `cmd /c "npm view postcss version engines --json && npm view resend version dependencies peerDependencies engines --json && npm view svix version dependencies engines --json && npm view uuid version engines --json"`
  - `cmd /c npm install next@16.3.4 eslint-config-next@16.3.4 postcss@8.5.28 resend@6.17.2 --save-exact --package-lock-only --ignore-scripts --cache .npm-cache`
  - `cmd /c npm install next@16.3.4 eslint-config-next@16.3.4 postcss@8.5.28 resend@6.17.2 --save-exact --package-lock-only --ignore-scripts --offline --cache .npm-cache`
  - `cmd /c npm audit --json --cache .npm-cache > .tmp\sos-401-npm-audit.json`
- Actual results:
  - `npm view next`: BLOCKED with `EACCES` fetching `https://registry.npmjs.org/next`.
  - `npm view eslint-config-next`: BLOCKED with `EACCES` fetching `https://registry.npmjs.org/eslint-config-next`.
  - `npm view postcss/resend/svix/uuid`: BLOCKED with `EACCES` fetching `https://registry.npmjs.org/postcss`.
  - Online targeted package-lock update: BLOCKED/HUNG on npm registry access and was stopped before any package update completed.
  - Offline targeted package-lock update: BLOCKED with `ENOTCACHED` for `eslint-config-next`.
  - Fresh audit attempt: BLOCKED; temporary output was a registry/advisory endpoint error, not a valid audit JSON report. `docs/npm-audit-current.json` was not overwritten.
- Authorized-terminal commands needed:
  - `npm install next@16.3.4 eslint-config-next@16.3.4 postcss@8.5.28 resend@6.17.2 --save-exact --package-lock-only --ignore-scripts`
  - `npm ci --ignore-scripts`
  - `npm test`
  - `npm run lint`
  - `node_modules\.bin\tsc --noEmit`
  - `npm run build`
  - `npm audit --json > docs\npm-audit-current.json`
- Remaining gates:
  - Owner-terminal dependency update and fresh audit.
  - Post-update validation and remaining-finding explanation.
  - Real PostgreSQL tests remain NOT RUN until an approved isolated database exists.

## SOS-101 BUILD A - Durable Intake Local Capture Core
- Status: CODE WRITTEN / RELEASE-RISK PASS COMPLETE / LOCAL STUB VALIDATION PASS / BUILD BLOCKED BY GOOGLE FONTS FETCH / AUDIT REMEDIATION PENDING
- Date: 2026-09-12
- Summary of changes made:
  - Implemented a durable-capture-first contact intake core with validation, source attribution allowlisting, idempotency contracts, PostgreSQL migration SQL, notification recovery states, outbox lease SQL, and Drive projection shaping.
  - Preserved the existing contact/giveaway UI while adding stable client submission tokens for retry-safe capture.
  - Added synthetic/stubbed tests for the local core plus a skipped PostgreSQL gate.
  - Created `docs/SOS-101_IMPLEMENTATION_REPORT.md`.
  - Completed a validation and release-risk pass confirming form visuals/customer steps were not expanded, ordinary pages do not depend on PostgreSQL, and rollback must preserve saved inquiry rows.
  - Confirmed `package.json` and `package-lock.json` do not yet agree for `pg`; lockfile refresh is blocked by npm registry fetch denial.
  - Continuation after owner lockfile refresh confirmed `package.json`, `package-lock.json`, and installed `pg` agree (`pg@8.23.0` installed from range `^8.13.1`).
  - Confirmed `docs/npm-audit-current.json` is a valid npm audit JSON report with 14 findings (1 critical, 6 high, 5 moderate, 2 low).
  - Corrected SOS-101 responsibility defaults so Jason handles initial phone/text/email inquiries and Kristen handles approved customer setup in Skimmer plus work assignment after Jason's handoff.
  - Preserved `info@shipwreckedpools.com` as notification destination and recorded that Jason has access to that inbox.
  - Recorded SOS-102 decision to reuse the existing form for Jason-entered leads later, with original acquisition source kept separate from entry method; no staff interface was built.
- Files changed:
  - `.env.example`
  - `package.json`
  - `src/app/api/contact/route.ts`
  - `src/components/contact-form.tsx`
  - `src/components/giveaway-estimate-form.tsx`
  - `src/components/giveaway-opt-in-form.tsx`
  - `src/lib/intake/*`
  - `db/migrations/001_sos_101_intake_core.sql`
  - `tests/sos-101/*`
  - `tsconfig.sos-101-test.json`
  - `docs/SOS-101_IMPLEMENTATION_REPORT.md`
  - `docs/CODEX_RUN_STATUS.md`
- Validation commands run:
  - `cmd /c npm install --package-lock-only --ignore-scripts`
  - `cmd /c npm install --package-lock-only --ignore-scripts --cache .npm-cache`
  - `cmd /c npm test`
  - `cmd /c npm ci --ignore-scripts`
  - `cmd /c npm run lint`
  - `cmd /c npx tsc --noEmit`
  - `cmd /c npm run build`
  - `git diff --check`
  - `cmd /c npm config list`
  - `node -e "const p=require('./package.json'); const l=require('./package-lock.json'); console.log('package pg:', p.dependencies.pg||null); console.log('lock root pg:', l.packages[''].dependencies.pg||null); console.log('lock has node_modules/pg:', Boolean(l.packages['node_modules/pg']));"`
  - `git update-index --refresh -- package-lock.json`
  - `node -e "...pg package/lock/installed version check..."`
  - `node -e "...docs/npm-audit-current.json validation..."`
  - `cmd /c npm ls next postcss sharp brace-expansion browserslist js-yaml nanoid pg resend svix uuid --all`
  - `cmd /c npm test`
  - `cmd /c npm run lint`
  - `cmd /c node_modules\.bin\tsc --noEmit`
  - `cmd /c npm run build`
  - `git diff --check`
- Actual results:
  - `npm install --package-lock-only --ignore-scripts`: blocked/no output under restricted network; stopped.
  - `npm install --package-lock-only --ignore-scripts --cache .npm-cache`: blocked fetching `pg` and `npm` packuments from `registry.npmjs.org` with `EACCES`; workspace-local cache wrote logs successfully.
  - `npm test`: failed before tests because `tsc` is unavailable without dependencies.
  - `npm ci --ignore-scripts`: blocked fetching `pg` from npm registry with `EACCES`.
  - `npm run lint`: failed before lint because `eslint` is unavailable without dependencies.
  - `npx tsc --noEmit`: blocked fetching `tsc` from npm registry with `EACCES`.
  - `npm run build`: failed before build because `next` is unavailable without dependencies.
  - `git diff --check`: PASS.
  - `npm config list`: PASS; no workspace or user `.npmrc` override found.
  - package/lock check: FAIL/CONFIRMED MISMATCH; `package.json` has `pg: ^8.13.1`, while `package-lock.json` has no root `pg` dependency or `node_modules/pg` package entry.
  - `git update-index --refresh -- package-lock.json`: blocked by insufficient permission adding an object to `.git/objects`; `git diff -- package-lock.json` still shows no content diff.
  - Continuation pg package/lock/installed check: PASS; `package.json` and lock root both specify `pg: ^8.13.1`, and lockfile plus installed package both resolve to `pg@8.23.0`.
  - Audit JSON validation: PASS; `docs/npm-audit-current.json` has `auditReportVersion: 2` and metadata total 14 findings, not a network/error response.
  - Dependency path inspection: PASS; key installed versions are `next@16.2.4`, `postcss@8.5.10` direct plus `next` nested `postcss@8.4.31`, `sharp@0.34.5`, `brace-expansion@1.1.14` and `5.0.5`, `browserslist@4.28.2`, `js-yaml@4.1.1`, `nanoid@3.3.11`, `resend@6.12.2`, `svix@1.90.0`, `uuid@10.0.0`, and `pg@8.23.0`.
  - Install script review: `sharp@0.34.5` declares an install/check script, but installed packages were already present from the owner-run `npm ci --ignore-scripts`; no skipped install script was run.
  - Critical/high audit review: NO FIXES APPLIED. Smallest supported remediation appears to require a separate approved dependency update led by `next>=16.3.3`, plus supported updates for direct `postcss>=8.5.23`, `sharp`/Next image stack, and toolchain transitive packages (`brace-expansion`, `browserslist`, `js-yaml`, `nanoid`).
  - `cmd /c npm test`: PASS after local type fixes; 12 passed, 1 PostgreSQL contract test skipped intentionally.
  - `cmd /c npm run lint`: initial continuation run failed because generated `.tmp/sos-101-tests` JS was linted; final run PASS after `.tmp/**` was ignored.
  - `cmd /c node_modules\.bin\tsc --noEmit`: initial continuation run failed on missing generated `next-env.d.ts` and too-narrow test env typing; final run PASS with installed local compiler and no `npx` fetch.
  - `cmd /c npm run build`: BLOCKED by Google Fonts fetch failure for `Fraunces` and `Sora` through `next/font/google`; no production credentials were used.
  - `git diff --check`: PASS with line-ending warnings only.
- Removed/changed behavior identified:
  - Inline Resend logic was removed from `src/app/api/contact/route.ts` and moved behind the intake service.
  - Route-level `[contact-config]`, `[contact-send-success]`, and detailed Resend error logging were removed; notification state is intended to live in durable jobs.
  - Success now means saved/accepted by intake, not necessarily email accepted by Resend.
- Failure behavior reviewed:
  - Database unavailable: form submit returns retriable error and client retains inputs.
  - Email failure after commit: saved inquiry returns success and notification job is failed/ambiguous for recovery.
  - Drive sync failure: not live in BUILD A; projection jobs are pending for later protected worker handling.
  - Duplicate submission: same token/payload replays, changed payload conflicts; real DB race proof still not run.
  - Worker recovery: SQL constants exist, but no scheduler/worker is enabled.
- Dependency/security review:
  - Direct runtime/build risk: `next@16.2.4` is within the audit's critical/high affected range. This is plausibly relevant to the deployed website if production uses this checkout/version; this repo uses App Router, Next Image, and AVIF image output. No local `middleware.*` or `proxy.*` file was found.
  - Direct build/dev risk: `postcss@8.5.10` is affected; no runtime path was found that processes attacker-controlled CSS in the intake flow.
  - Transitive/toolchain risks: `sharp`, `brace-expansion`, `browserslist`, `js-yaml`, and `nanoid` remain audit findings and should be handled in a separate approved dependency-remediation task.
- Tests awaiting approved PostgreSQL test instance:
  - Transactional idempotency under concurrent identical replay.
  - Same-token changed-payload conflict against database uniqueness.
  - Outbox claim/lease duplicate-worker behavior.
  - Restart recovery after commit/before send.
  - Projection replay/update-by-ID against durable state.
- Remaining gates:
  - Approve a separate dependency-remediation task for the critical/high audit findings; do not apply automatic `npm audit fix`.
  - Re-run `npm run build` in an environment with Google Fonts access, or approve a separate local-font/self-hosting change.
  - Approve/provide a disposable PostgreSQL test database for real integration tests.
  - Complete BUILD B cost/access review before any cloud provisioning.
  - Configure protected worker/scheduler and restricted Drive/Sheets credentials later; none were enabled in BUILD A.
  - Keep response deadline/escalation timers disabled until staffed hours/timing are approved.

## Execution Plan (Ordered)
1. `prompts/seo/01_baseline_audit.md`
2. `prompts/seo/02_legacy_url_inventory.md`
3. `prompts/seo/03_redirect_map.md`
4. `prompts/seo/04_redirect_implementation.md`
5. `prompts/seo/05_homepage_keyword_alignment.md`
6. `prompts/seo/06_service_page_titles_h1s.md`
7. `prompts/seo/07_service_page_depth.md`
8. `prompts/seo/08_location_page_differentiation.md`
9. `prompts/seo/09_blog_route_repair.md`
10. `prompts/seo/10_internal_link_map.md`
11. `prompts/seo/11_testimonial_component_dedupe.md`
12. `prompts/seo/12_contact_page_conversion.md`
13. `prompts/seo/13_schema_canonical_sitemap.md`
14. `prompts/seo/14_analytics_events.md`
15. `prompts/seo/15_regression_qa.md`
16. `prompts/cwv/01_lighthouse_baseline.md`
17. `prompts/cwv/02_lcp_critical_path.md`
18. `prompts/cwv/03_image_pipeline.md`
19. `prompts/cwv/04_font_loading.md`
20. `prompts/cwv/05_js_bundle_audit.md`
21. `prompts/cwv/06_third_party_script_audit.md`
22. `prompts/cwv/07_cls_stability.md`
23. `prompts/cwv/08_inp_responsiveness.md`
24. `prompts/cwv/09_cache_bfcache.md`
25. `prompts/cwv/10_lazy_loading_hygiene.md`
26. `prompts/cwv/11_performance_budgets.md`
27. `prompts/cwv/12_post_fix_validation.md`

## Prompt Checklist
- [x] `prompts/seo/01_baseline_audit.md`
- [x] `prompts/seo/02_legacy_url_inventory.md`
- [x] `prompts/seo/03_redirect_map.md`
- [x] `prompts/seo/04_redirect_implementation.md`
- [x] `prompts/seo/05_homepage_keyword_alignment.md`
- [x] `prompts/seo/06_service_page_titles_h1s.md`
- [x] `prompts/seo/07_service_page_depth.md`
- [x] `prompts/seo/08_location_page_differentiation.md`
- [x] `prompts/seo/09_blog_route_repair.md`
- [x] `prompts/seo/10_internal_link_map.md`
- [x] `prompts/seo/11_testimonial_component_dedupe.md`
- [x] `prompts/seo/12_contact_page_conversion.md`
- [x] `prompts/seo/13_schema_canonical_sitemap.md`
- [x] `prompts/seo/14_analytics_events.md`
- [x] `prompts/seo/15_regression_qa.md`
- [x] `prompts/cwv/01_lighthouse_baseline.md`
- [x] `prompts/cwv/02_lcp_critical_path.md`
- [x] `prompts/cwv/03_image_pipeline.md`
- [x] `prompts/cwv/04_font_loading.md`
- [x] `prompts/cwv/05_js_bundle_audit.md`
- [x] `prompts/cwv/06_third_party_script_audit.md`
- [x] `prompts/cwv/07_cls_stability.md`
- [x] `prompts/cwv/08_inp_responsiveness.md`
- [x] `prompts/cwv/09_cache_bfcache.md`
- [x] `prompts/cwv/10_lazy_loading_hygiene.md`
- [x] `prompts/cwv/11_performance_budgets.md`
- [x] `prompts/cwv/12_post_fix_validation.md`

## Prompt Logs

### prompts/seo/01_baseline_audit.md
- Status: DONE
- Summary of changes made:
  - Created `docs/live_audit.md` with a full baseline audit covering route inventory, file/component mapping, title/H1 status, legacy/new overlap, blog route risks, testimonial duplication source, and prioritized blockers.
  - Identified route/redirect layer files and exact likely touchpoints for upcoming prompt packs.
- Files changed:
  - `docs/live_audit.md`
  - `docs/CODEX_RUN_STATUS.md`
- Validation commands run:
  - `npm run lint`
  - `npx tsc --noEmit`
- Validation result:
  - PASS (both commands exited successfully)
- Blockers / human follow-up:
  - None for this prompt.

### prompts/seo/02_legacy_url_inventory.md
- Status: DONE
- Summary of changes made:
  - Created `docs/legacy_url_inventory.csv` with legacy `/pages/*`, `/products/*`, and `/blogs/news/*` entries and mapped canonical targets.
  - Added destination existence flags and action recommendations (`redirect`, `retain`, `merge_or_retire`) including unresolved wildcard legacy families.
- Files changed:
  - `docs/legacy_url_inventory.csv`
  - `docs/CODEX_RUN_STATUS.md`
- Validation commands run:
  - `npm run lint`
  - `npx tsc --noEmit`
- Validation result:
  - PASS (both commands exited successfully)
- Blockers / human follow-up:
  - Wildcard legacy families need external crawl/log export to enumerate all unknown URLs.

### prompts/seo/03_redirect_map.md
- Status: DONE
- Summary of changes made:
  - Created `docs/redirect_map.csv` with explicit `source_url -> target_url` mapping and `status` values (`ready`, `blocked-needs-destination`, `retire-410`).
  - Created `docs/redirect_implementation_notes.md` documenting redirect ownership layer, wildcard safety guidance, and routes needing content/policy decisions before redirecting.
- Files changed:
  - `docs/redirect_map.csv`
  - `docs/redirect_implementation_notes.md`
  - `docs/CODEX_RUN_STATUS.md`
- Validation commands run:
  - `npm run lint`
  - `npx tsc --noEmit`
- Validation result:
  - PASS (both commands exited successfully)
- Blockers / human follow-up:
  - Destination decision required for `/pages/free-estimate-pool-skimmer-giveaway`.
  - Wildcard legacy families still need crawl/log-backed enumeration.

### prompts/seo/04_redirect_implementation.md
- Status: DONE
- Summary of changes made:
  - Implemented all `status=ready` redirects from `docs/redirect_map.csv` in `next.config.ts`.
  - Confirmed no internal app links were pointing to those ready legacy URLs.
  - Added deploy verification file `docs/redirect_validation_checklist.md` with exact source/target tests and blocked items list.
- Files changed:
  - `next.config.ts`
  - `docs/redirect_validation_checklist.md`
  - `docs/CODEX_RUN_STATUS.md`
- Validation commands run:
  - `npm run lint`
  - `npx tsc --noEmit`
  - `npm run build`
- Validation result:
  - PASS (all commands exited successfully)
- Blockers / human follow-up:
  - `/pages/free-estimate-pool-skimmer-giveaway` destination decision still pending.
  - Wildcard legacy families remain intentionally unimplemented in this prompt.

### prompts/seo/05_homepage_keyword_alignment.md
- Status: DONE
- Summary of changes made:
  - Updated homepage metadata title and description in `src/app/page.tsx` to lead with pool cleaning + weekly pool service intent in Abilene.
  - Updated homepage hero H1 lines in `src/content/site.ts` to keyword-forward wording.
  - Preserved the line `Protect Your Pool System. Get Your Saturdays Back. Keep Water Crystal Clear.` as supporting hero copy (description), not the primary H1.
  - Left CTA structure unchanged.
- Files changed:
  - `src/app/page.tsx`
  - `src/content/site.ts`
  - `docs/CODEX_RUN_STATUS.md`
- Validation commands run:
  - `npm run lint`
  - `npx tsc --noEmit`
  - `npm run build`
- Validation result:
  - PASS (all commands exited successfully)
- Blockers / human follow-up:
  - None for this prompt.

### prompts/seo/06_service_page_titles_h1s.md
- Status: DONE
- Summary of changes made:
  - Added explicit SEO fields (`seoTitle`, `seoH1`, `seoDescription`) to the service content model.
  - Populated those fields for all 9 core service pages listed in the prompt.
  - Updated service detail route metadata and H1 rendering to use the explicit SEO fields.
- Files changed:
  - `src/content/site.ts`
  - `src/app/services/[slug]/page.tsx`
  - `docs/CODEX_RUN_STATUS.md`
- Validation commands run:
  - `npm run lint`
  - `npx tsc --noEmit`
  - `npm run build`
- Validation result:
  - PASS (all commands exited successfully)
- Blockers / human follow-up:
  - None for this prompt.

### prompts/seo/07_service_page_depth.md
- Status: DONE
- Summary of changes made:
  - Expanded shared service-page template depth with:
    - dedicated service intro/overview section,
    - explicit FAQ section,
    - related services links section,
    - related location links section.
  - Kept canonical internal links (`/services/*`, `/locations/*`) and existing design system styling.
  - Added `docs/human_inputs_needed.md` with TODOs for missing/disabled human proof content.
- Files changed:
  - `src/app/services/[slug]/page.tsx`
  - `docs/human_inputs_needed.md`
  - `docs/CODEX_RUN_STATUS.md`
- Validation commands run:
  - `npm run lint`
  - `npx tsc --noEmit` (initial run failed on transient `.next/types/validator.ts` missing `./routes.js`)
  - `npm run build`
  - `npx tsc --noEmit` (re-run after build)
- Validation result:
  - PASS (lint/build passed; typecheck passed on final run)
- Blockers / human follow-up:
  - Human proof asset/content decisions needed for services listed in `docs/human_inputs_needed.md`.

### prompts/seo/08_location_page_differentiation.md
- Status: DONE
- Summary of changes made:
  - Differentiated the three priority location entries (`south-abilene`, `north-abilene`, `abilene-wylie`) with unique:
    - summary/intro/local-context framing,
    - route-availability wording,
    - FAQ phrasing,
    - service emphasis ordering.
  - Added per-location `seoTitle` and wired location metadata generation to use it.
  - Updated location template to prioritize each location’s `servicesOffered` ordering for more contextual service links.
  - Added required location-proof TODOs to `docs/human_inputs_needed.md`.
- Files changed:
  - `src/content/site.ts`
  - `src/app/locations/[slug]/page.tsx`
  - `docs/human_inputs_needed.md`
  - `docs/CODEX_RUN_STATUS.md`
- Validation commands run:
  - `npm run lint`
  - `npx tsc --noEmit`
  - `npm run build`
- Validation result:
  - PASS (all commands exited successfully)
- Blockers / human follow-up:
  - Real location-specific proof inputs still needed for the three priority location pages (tracked in `docs/human_inputs_needed.md`).

### prompts/seo/09_blog_route_repair.md
- Status: DONE
- Summary of changes made:
  - Replaced summary-only/staging behavior on blog article pages with full in-repo article content sections.
  - Added explicit canonical metadata per blog article route (`/blog/{slug}`).
  - Added contextual internal links from each article to relevant canonical service pages.
  - Updated legacy blog redirect map rows to mark validated `/blog/*` targets as ready for consolidation.
  - Added `docs/blog_route_validation.md` with exact route, canonical, and redirect checks.
- Files changed:
  - `src/content/site.ts`
  - `src/app/blog/[slug]/page.tsx`
  - `docs/redirect_map.csv`
  - `docs/blog_route_validation.md`
  - `docs/CODEX_RUN_STATUS.md`
- Validation commands run:
  - `npm run lint`
  - `npx tsc --noEmit`
  - `npm run build`
- Validation result:
  - PASS (all commands exited successfully)
- Blockers / human follow-up:
  - None for this prompt.

### prompts/seo/10_internal_link_map.md
- Status: DONE
- Summary of changes made:
  - Implemented homepage priority internal links to key service money pages, services hub, and locations hub using descriptive anchor text.
  - Strengthened location-page service link anchor text to use explicit service-intent wording (SEO H1 labels where available).
  - Added `docs/internal_link_validation.md` with exact route-to-route link verification targets.
- Files changed:
  - `src/app/page.tsx`
  - `src/app/locations/[slug]/page.tsx`
  - `docs/internal_link_validation.md`
  - `docs/CODEX_RUN_STATUS.md`
- Validation commands run:
  - `npm run lint`
  - `npx tsc --noEmit`
  - `npm run build`
- Validation result:
  - PASS (all commands exited successfully)
- Blockers / human follow-up:
  - None for this prompt.

### prompts/seo/11_testimonial_component_dedupe.md
- Status: DONE
- Summary of changes made:
  - Refactored the shared reviews carousel to stop cloning the same review set multiple times in DOM.
  - Preserved testimonial section visuals and interaction style while rendering each review once per display set.
  - Kept all review copy unchanged.
- Files changed:
  - `src/components/home-reviews-carousel-section.tsx`
  - `docs/CODEX_RUN_STATUS.md`
- Validation commands run:
  - `npm run lint`
  - `npx tsc --noEmit` (initial run failed due missing `.next/types/*` files)
  - `npm run build`
  - `npx tsc --noEmit` (re-run after build)
- Validation result:
  - PASS (lint/build passed; typecheck passed on final run)
- Blockers / human follow-up:
  - None for this prompt.

### prompts/seo/12_contact_page_conversion.md
- Status: DONE
- Summary of changes made:
  - Removed staging language from the contact form.
  - Upgraded contact page metadata, H1, and support copy to quote-intent language focused on Abilene service requests.
  - Added a compact trust-support block near the form with:
    - money-back guarantee mention,
    - 5.0 Google rating mention,
    - local service area language.
  - Kept form wiring and call/text paths unchanged.
- Files changed:
  - `src/app/contact/page.tsx`
  - `src/components/contact-form.tsx`
  - `docs/CODEX_RUN_STATUS.md`
- Validation commands run:
  - `npm run lint`
  - `npx tsc --noEmit` (initial run failed on transient `.next/types/validator.ts` route typing)
  - `npm run build`
  - `npx tsc --noEmit` (re-run after build)
- Validation result:
  - PASS (lint/build passed; typecheck passed on final run)
- Blockers / human follow-up:
  - None for this prompt.

### prompts/seo/13_schema_canonical_sitemap.md
- Status: DONE
- Summary of changes made:
  - Added explicit canonical alternates for dynamic service and location routes.
  - Improved homepage business JSON-LD (`LocalBusiness`) with stable `@id`, structured `areaServed`, and `sameAs` links.
  - Added page-aligned `Service` JSON-LD to service detail pages.
  - Added page-aligned `Article` JSON-LD to blog article pages.
  - Documented schema/canonical/sitemap/robots validation steps in `docs/schema_validation.md`.
- Files changed:
  - `src/components/local-business-json-ld.tsx`
  - `src/app/services/[slug]/page.tsx`
  - `src/app/locations/[slug]/page.tsx`
  - `src/app/blog/[slug]/page.tsx`
  - `docs/schema_validation.md`
  - `docs/CODEX_RUN_STATUS.md`
- Validation commands run:
  - `npm run lint`
  - `npx tsc --noEmit`
  - `npm run build`
- Validation result:
  - PASS (all commands exited successfully)
- Blockers / human follow-up:
  - None for this prompt.

### prompts/seo/14_analytics_events.md
- Status: DONE
- Summary of changes made:
  - Added lightweight analytics event helper that sends events to `dataLayer` and `gtag` when available.
  - Instrumented successful quote form submissions as `generate_lead`.
  - Added delegated global tracking for `tel:` clicks (`phone_click`) and `sms:` clicks (`text_click`) so events fire across canonical routes.
  - Added `docs/analytics_validation.md` with manual test steps and missing integration prerequisites when no analytics script/container is present.
- Files changed:
  - `src/lib/analytics.ts`
  - `src/components/analytics-events.tsx`
  - `src/components/contact-form.tsx`
  - `src/app/layout.tsx`
  - `docs/analytics_validation.md`
  - `docs/CODEX_RUN_STATUS.md`
- Validation commands run:
  - `npm run lint`
  - `npx tsc --noEmit`
  - `npm run build`
- Validation result:
  - PASS (all commands exited successfully)
- Blockers / human follow-up:
  - If no analytics/tag script is loaded in deployment, events will not appear in reporting; integration prerequisites are documented in `docs/analytics_validation.md`.

### prompts/seo/15_regression_qa.md
- Status: DONE
- Summary of changes made:
  - Completed read-only regression QA across key SEO-updated routes/components.
  - Added prioritized findings report in `docs/regression_qa.md` covering:
    - broken-link/route checks,
    - title/H1 checks,
    - canonical/sitemap checks,
    - testimonial dedupe status,
    - blog route status,
    - contact staging-language removal verification.
- Files changed:
  - `docs/regression_qa.md`
  - `docs/CODEX_RUN_STATUS.md`
- Validation commands run:
  - `npm run lint`
  - `npx tsc --noEmit`
  - `npm run build`
- Validation result:
  - PASS (all commands exited successfully)
- Blockers / human follow-up:
  - Medium follow-up remains: destination/canonical strategy for `/pages/free-estimate-pool-skimmer-giveaway`.

### prompts/cwv/01_lighthouse_baseline.md
- Status: DONE
- Summary of changes made:
  - Attempted route-by-route Lighthouse baseline collection for all required CWV routes.
  - Documented environment limitation (`npx lighthouse` blocked by npm network/DNS `ENOTFOUND`) and produced `docs/cwv_baseline.md` with:
    - per-route CWV metric status (`blocked`),
    - likely LCP elements,
    - largest media/script/layout-shift suspects,
    - prioritized route opportunities and root-cause candidates.
  - Noted that CrUX/PageSpeed field data was unavailable in this environment.
- Files changed:
  - `docs/cwv_baseline.md`
  - `docs/CODEX_RUN_STATUS.md`
- Validation commands run:
  - `npm run lint`
  - `npx tsc --noEmit`
  - `npm run build`
- Validation result:
  - PASS (all commands exited successfully)
- Blockers / human follow-up:
  - Lighthouse numeric baselines require an environment with npm/network access (or preinstalled Lighthouse binary) to complete measured CWV values.

### prompts/cwv/02_lcp_critical_path.md
- Status: DONE
- Summary of changes made:
  - Removed above-the-fold autoplay video from homepage hero critical path.
  - Removed services-hub hero video source usage so `/services` renders without above-the-fold video fetch/decode pressure.
  - Added `docs/cwv_changes_lcp.md` documenting targeted routes, LCP-root-cause changes, and expected impact.
- Files changed:
  - `src/components/hero.tsx`
  - `src/app/services/page.tsx`
  - `docs/cwv_changes_lcp.md`
  - `docs/CODEX_RUN_STATUS.md`
- Validation commands run:
  - `npm run lint`
  - `npx tsc --noEmit`
  - `npm run build`
- Validation result:
  - PASS (all commands exited successfully)
- Blockers / human follow-up:
  - Numeric Lighthouse verification remains blocked in this environment until Lighthouse tooling/network access is available.

### prompts/cwv/03_image_pipeline.md
- Status: DONE
- Summary of changes made:
  - Inventoried largest image assets used on priority templates (homepage, service detail, and location detail flows), with multi-MB PNG proof/area/CTA assets identified.
  - Enabled modern image output formats and longer optimized-image cache TTL in `next.config.ts` (`AVIF` + `WebP`, 31-day minimum cache TTL).
  - Added explicit image `loading` and `quality` controls across heavy non-critical image blocks while preserving existing `sizes`/responsive behavior and visual quality expectations.
  - Added `docs/cwv_changes_images.md` with inventory, implementation details, and expected CWV impact.
- Files changed:
  - `next.config.ts`
  - `src/app/page.tsx`
  - `src/components/home-pool-area-highlights-section.tsx`
  - `src/components/home-final-cta-section.tsx`
  - `src/app/services/[slug]/page.tsx`
  - `src/app/locations/[slug]/page.tsx`
  - `docs/cwv_changes_images.md`
  - `docs/CODEX_RUN_STATUS.md`
- Validation commands run:
  - `npm run lint`
  - `npx tsc --noEmit` (initial run failed due missing transient `.next/types/*` files)
  - `npm run build`
  - `npx tsc --noEmit` (re-run after build)
- Validation result:
  - PASS (lint/build passed; typecheck passed on final run)
- Blockers / human follow-up:
  - Numeric Lighthouse verification remains blocked in this environment until Lighthouse tooling/network access is available.

### prompts/cwv/04_font_loading.md
- Status: DONE
- Summary of changes made:
  - Audited existing font-loading path (`next/font/google` in root layout + fallback stacks in global CSS).
  - Added explicit `display: "swap"` for both active font families to reduce blocking and improve stability during font load.
  - Kept preload for the primary sans/body font and disabled preload for the display heading font to reduce early network overhead.
  - Added `docs/cwv_changes_fonts.md` documenting scope and rationale.
- Files changed:
  - `src/app/layout.tsx`
  - `docs/cwv_changes_fonts.md`
  - `docs/CODEX_RUN_STATUS.md`
- Validation commands run:
  - `npm run lint`
  - `npx tsc --noEmit`
  - `npm run build`
- Validation result:
  - PASS (all commands exited successfully)
- Blockers / human follow-up:
  - Numeric Lighthouse verification remains blocked in this environment until Lighthouse tooling/network access is available.

### prompts/cwv/05_js_bundle_audit.md
- Status: DONE
- Summary of changes made:
  - Completed read-only JS bundle audit for homepage, services hub, and contact page using Next build diagnostics and client reference manifests.
  - Identified dominant shared first-load JS baseline across key routes and route-specific client islands (`home-reviews-carousel-section` on `/` and `/services`, `contact-form` on `/contact`).
  - Documented heavy components, likely long-task sources, hydration-heavy areas, and prioritized reduction recommendations in `docs/js_bundle_audit.md`.
- Files changed:
  - `docs/js_bundle_audit.md`
  - `docs/CODEX_RUN_STATUS.md`
- Validation commands run:
  - `npm run lint`
  - `npx tsc --noEmit`
- Validation result:
  - PASS (both commands exited successfully)
- Blockers / human follow-up:
  - Numeric Lighthouse verification remains blocked in this environment until Lighthouse tooling/network access is available.

### prompts/cwv/06_third_party_script_audit.md
- Status: DONE
- Summary of changes made:
  - Completed read-only third-party dependency audit covering scripts, trackers, embeds/widgets, and external service integrations.
  - Documented for each item: purpose, load location, route necessity, estimated performance impact, and explicit keep/remove/defer recommendation.
  - Confirmed no heavy third-party widget/iframe/pixel stack currently embedded client-side.
- Files changed:
  - `docs/third_party_script_audit.md`
  - `docs/CODEX_RUN_STATUS.md`
- Validation commands run:
  - `npm run lint`
  - `npx tsc --noEmit`
- Validation result:
  - PASS (both commands exited successfully)
- Blockers / human follow-up:
  - Numeric Lighthouse verification remains blocked in this environment until Lighthouse tooling/network access is available.

### prompts/cwv/07_cls_stability.md
- Status: DONE
- Summary of changes made:
  - Reviewed `docs/cwv_baseline.md` and audited highest-risk CLS surfaces (header, hero, reviews carousel, quote form).
  - Stabilized contact form layout by reserving fixed message/error space so validation and submit feedback do not shift neighboring elements.
  - Added global vertical scrollbar reservation to prevent viewport-width jump when page scrollbars appear on non-overlay environments.
  - Added `docs/cwv_changes_cls.md` documenting CLS root causes and applied fixes.
- Files changed:
  - `src/components/contact-form.tsx`
  - `src/app/globals.css`
  - `docs/cwv_changes_cls.md`
  - `docs/CODEX_RUN_STATUS.md`
- Validation commands run:
  - `npm run lint`
  - `npx tsc --noEmit`
  - `npm run build`
- Validation result:
  - PASS (all commands exited successfully)
- Blockers / human follow-up:
  - Numeric Lighthouse verification remains blocked in this environment until Lighthouse tooling/network access is available.

### prompts/cwv/08_inp_responsiveness.md
- Status: DONE
- Summary of changes made:
  - Reviewed `docs/js_bundle_audit.md` and optimized high-frequency client interactions in header, reviews carousel, and global analytics listener setup.
  - Reduced header interaction cost by replacing per-scroll `scrollY` state updates with threshold-based boolean updates gated by `requestAnimationFrame`.
  - Removed no-op carousel `onScroll` RAF work that added unnecessary main-thread overhead during horizontal interaction.
  - Deferred analytics click-listener attachment slightly to reduce immediate hydration pressure while preserving existing event tracking behavior.
  - Added `docs/cwv_changes_inp.md` documenting scope and rationale.
- Files changed:
  - `src/components/header.tsx`
  - `src/components/home-reviews-carousel-section.tsx`
  - `src/components/analytics-events.tsx`
  - `docs/cwv_changes_inp.md`
  - `docs/CODEX_RUN_STATUS.md`
- Validation commands run:
  - `npm run lint` (initial run passed with warning; final run clean)
  - `npx tsc --noEmit`
  - `npm run build`
- Validation result:
  - PASS (all commands exited successfully; lint warning resolved)
- Blockers / human follow-up:
  - Numeric Lighthouse verification remains blocked in this environment until Lighthouse tooling/network access is available.

### prompts/cwv/09_cache_bfcache.md
- Status: DONE
- Summary of changes made:
  - Audited current cache configuration and bfcache-related route/client behavior.
  - Added conservative cache headers for static media assets only (`/images/*`, `/videos/*`, `/icon.svg`) to improve repeat-visit performance.
  - Confirmed no obvious high-risk bfcache blockers (`beforeunload`/`unload` handlers) in current app/client code for this prompt scope.
  - Added `docs/cwv_changes_cache.md` documenting implemented cache policy and bfcache findings.
- Files changed:
  - `next.config.ts`
  - `docs/cwv_changes_cache.md`
  - `docs/CODEX_RUN_STATUS.md`
- Validation commands run:
  - `npm run lint`
  - `npx tsc --noEmit`
  - `npm run build`
- Validation result:
  - PASS (all commands exited successfully)
- Blockers / human follow-up:
  - Numeric Lighthouse/bfcache verification remains blocked in this environment until Lighthouse tooling/network access is available.

### prompts/cwv/10_lazy_loading_hygiene.md
- Status: DONE
- Summary of changes made:
  - Audited current image lazy-loading behavior on priority templates and shared media components.
  - Corrected a critical above-the-fold case by making the split-layout location hero image eager (`priority`) instead of explicitly lazy.
  - Kept non-critical below-the-fold media deferred and confirmed essential text/CTA content remains crawlable and not lazy-gated.
  - Added `docs/cwv_changes_lazy_loading.md` documenting findings and the targeted change.
- Files changed:
  - `src/app/locations/[slug]/page.tsx`
  - `docs/cwv_changes_lazy_loading.md`
  - `docs/CODEX_RUN_STATUS.md`
- Validation commands run:
  - `npm run lint`
  - `npx tsc --noEmit`
  - `npm run build`
- Validation result:
  - PASS (all commands exited successfully)
- Blockers / human follow-up:
  - Numeric Lighthouse verification remains blocked in this environment until Lighthouse tooling/network access is available.

### prompts/cwv/11_performance_budgets.md
- Status: DONE
- Summary of changes made:
  - Read `docs/cwv_budget.md` and assessed current stack maturity for CI/performance enforcement.
  - Implemented lightweight documentation-first guardrails (no heavy toolchain) because repo currently has no committed CI workflow.
  - Added a practical pre-merge and release-candidate process tied to existing commands and existing CWV change artifacts.
  - Added clear regression trigger rules and minimal future CI recommendation path.
- Files changed:
  - `docs/performance_regression_guardrails.md`
  - `docs/CODEX_RUN_STATUS.md`
- Validation commands run:
  - `npm run lint`
  - `npx tsc --noEmit`
- Validation result:
  - PASS (both commands exited successfully)
- Blockers / human follow-up:
  - Numeric Lighthouse verification remains blocked in this environment until Lighthouse tooling/network access is available.

### prompts/cwv/12_post_fix_validation.md
- Status: DONE
- Summary of changes made:
  - Completed read-only post-fix validation across the same route set defined in `docs/cwv_baseline.md`.
  - Created `docs/cwv_validation.md` with:
    - before/after metric delta status,
    - routes improved,
    - routes still failing/unverified,
    - prioritized next-best opportunities.
  - Confirmed no code changes in this step.
- Files changed:
  - `docs/cwv_validation.md`
  - `docs/CODEX_RUN_STATUS.md`
- Validation commands run:
  - `npm run lint`
  - `npx tsc --noEmit`
- Validation result:
  - PASS (both commands exited successfully)
- Blockers / human follow-up:
  - Numeric Lighthouse before/after deltas remain blocked in this environment until Lighthouse tooling/network access is available.
