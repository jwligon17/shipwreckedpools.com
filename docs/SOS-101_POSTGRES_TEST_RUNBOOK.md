# SOS-101 PostgreSQL Test Runbook

Updated: 2026-09-13. Lane A preparation and authorized local store/retry corrections complete; actual PostgreSQL execution: **NOT RUN**.

## Selected existing resource; execution confirmation pending

Owner supplied these selections from the existing Free Neon resource screenshots:

- Project: `neon-coffee-ferry`
- Neon project ID: `purple-smoke-18418293`
- Branch: `main` (default)
- Database: `neondb`
- Role: `neondb_owner`
- Connection: direct, pooling off

Do not create another resource or repeat provider discovery. Wait for the owner's explicit disposable, synthetic test-only confirmation and separation from application/staging/production data, plus private endpoint/credential verification against this selected resource before connecting or running the existing thirteen cases. Selection of the default branch is not proof of disposability, and resource identification alone is not execution authorization. No resource has been created or connected by Lane A. Preserve all isolation and cleanup safeguards below; no paid changes.

Run from the ORIGINAL `C:\Users\krist\shipwreckedpools.com` workspace. Completed preparation need not be repeated. The frozen SOS-109 candidate is separate: release commit `06499efa76bb265a992ead66fd6f38ea91a40d9b` remains unchanged. Owner retained Vercel Hobby and may publish the approved release from a normal terminal; hosting is resolved. No agent publication, candidate edit, upgrade or migration is part of this database handoff.

Use PostgreSQL 13+ with synthetic data only. Use a direct/session connection supporting transactions, startup search_path, and CREATE SCHEMA. The approved role needs schema creation and ownership within this disposable database; it does not need superuser or extension creation. Keep this connection out of Vercel Production. Do not use existing application credentials or a copy of customer data. No email or Google credentials are needed.

## Configuration and isolation

Variable names (never record values in reports):

- `SOS_101_TEST_DATABASE_URL`
- `SOS_101_TEST_DISPOSABLE_CONFIRMATION`
- `SOS_101_TEST_EXPECTED_HOST` (host plus explicit port, independently checked against approved resource)
- `SOS_101_TEST_EXPECTED_DATABASE`
- `SOS_101_TEST_EXPECTED_USER`

The URL must explicitly specify protocol, hostname, port, database, username and password; percent-encode credentials as required. Only the optional `sslmode` parameter is accepted, with `verify-full` for verified TLS or `disable` for explicitly approved local transport. Configure trusted certificates through the approved terminal environment if required; never disable certificate verification for a remote endpoint. No DATABASE_URL, POSTGRES_URL, POSTGRES_PRISMA_URL, or provider-default fallback is used. No connection values are logged.

The fixture compares the independent expected destination before connecting and checks current_database/current_user before writing. This supplements owner verification; it cannot prove provider isolation or cost approval itself. Missing URL means explicit SKIP/NOT RUN. A supplied URL with incomplete/mismatched guards fails before connecting.

Every integration case generates a new `sos_101_test_` schema with a random 32-hex suffix. CREATE SCHEMA intentionally fails on a collision. All fixture/store connections receive that schema and pg_catalog as their search_path; public is excluded. The exact migration content is SHA-256 pinned after CRLF normalization, so changes require a new isolation review. The current migration has no hard-coded public-schema writes. Its database-wide `create extension if not exists pgcrypto` statement is omitted by the test helper only: PostgreSQL 13+ supplies core gen_random_uuid. The checked-in production migration is unchanged. Four existing tables and indexes are reused; no replacement intake implementation is introduced.

Cleanup closes store pools, rolls back/release test connections, and drops only the schema successfully created by that case, with CASCADE. No database drop, public cleanup, application-table truncation, or extension changes occur. Output records generated schema names and successful cleanup. An interrupted process or cleanup error can leave synthetic schemas behind: review the recorded exact schema and ownership on the approved endpoint before separately authorizing removal. Do not run a wildcard cleanup.

## Local preparation checks (no database)

From the repository root in PowerShell, with installed tooling only:

```powershell
node node_modules/typescript/bin/tsc -p tsconfig.sos-101-test.json
node node_modules/eslint/bin/eslint.js .
node -e "const cp=require('child_process');const env={...process.env};for(const k of Object.keys(env))if(k.startsWith('SOS_101_TEST_'))delete env[k];const r=cp.spawnSync(process.execPath,['--test','.tmp/sos-101-tests/tests/sos-101/**/*.test.js'],{env,stdio:'inherit'});process.exit(r.status??1);"
```

This removes test configuration from the child process only, ensuring no PostgreSQL connection during preparation. Expected result: 26 database-free tests pass (12 core, four isolation guards, four adapter protocol tests and six recovery tests), thirteen integration cases explicitly skipped. The adapter tests use a stub connection, not a SQL emulator; PostgreSQL semantics remain unverified. Owner-executed earlier evidence is retained separately.

## Authorized-terminal execution ONLY after instance approval and availability

These commands are future instructions, not authorization granted by this document. Do not execute during Lane A preparation. Use a private owner terminal with no transcript/screen sharing. The masked prompt loads the URL into the current process environment without writing it to a file or command history. npm test does **not** automatically load .env.local; this runbook does not read that file or use application environment values.

```powershell
$sosSecret = Read-Host 'Approved disposable PostgreSQL URL' -AsSecureString
$env:SOS_101_TEST_DATABASE_URL = [System.Net.NetworkCredential]::new('', $sosSecret).Password
$env:SOS_101_TEST_EXPECTED_HOST = Read-Host 'Independently verified approved host:port'
$env:SOS_101_TEST_EXPECTED_DATABASE = Read-Host 'Independently verified approved database'
$env:SOS_101_TEST_EXPECTED_USER = Read-Host 'Independently verified approved database role'
$env:SOS_101_TEST_DISPOSABLE_CONFIRMATION = Read-Host 'After verifying isolation and approval, type I_APPROVE_THIS_DISPOSABLE_DATABASE'
try {
  node node_modules/typescript/bin/tsc -p tsconfig.sos-101-test.json
  if ($LASTEXITCODE -ne 0) { throw 'Test compilation failed' }
  node --test ".tmp/sos-101-tests/tests/sos-101/**/*.test.js"
  $sosTestExit = $LASTEXITCODE
  if ($sosTestExit -ne 0) { throw 'PostgreSQL contracts failed; retain redacted test output' }
} finally {
  Remove-Item Env:SOS_101_TEST_DATABASE_URL -ErrorAction SilentlyContinue
  Remove-Item Env:SOS_101_TEST_DISPOSABLE_CONFIRMATION -ErrorAction SilentlyContinue
  Remove-Item Env:SOS_101_TEST_EXPECTED_HOST -ErrorAction SilentlyContinue
  Remove-Item Env:SOS_101_TEST_EXPECTED_DATABASE -ErrorAction SilentlyContinue
  Remove-Item Env:SOS_101_TEST_EXPECTED_USER -ErrorAction SilentlyContinue
  Remove-Variable sosSecret -ErrorAction SilentlyContinue
}
```

## Expected evidence and limits

Record date, executor, reviewed code revision/diff, approved resource reference without credentials, PostgreSQL version, numeric command exits, each named case result, and per-schema cleanup confirmation. Do not paste secrets or raw database/provider error details. Fixture errors redact driver details while retaining safe diagnostic codes. No integration skip counts as persistence proof.

The original six cases still assert concurrent same-token replay and identical IDs; conflict without overwrite; an injected late projection-job constraint failure with complete rollback (unrelated early errors cannot pass); a second legitimate inquiry from the same contact; exclusive locked claims, expiry/reclaim and stale-token rejection for done/retry; and saved pending jobs after closing the original pool, replaying through a fresh store, and claiming through another connection. Email/Google are local stubs with no network adapter. The SQL lease case seeds a minimal synthetic event/job directly so capture defects do not hide lease coverage.

These are store/SQL contracts, not proof of a running worker, crash-tested process supervisor, delivered email, Drive integration, scheduler authorization, backups, or production readiness. The restart boundary is simulated by closing the original pool after commit before any notification, not by killing a deployed process.

The four static findings have now been corrected under separate explicit local authorization; see the current implementation report. Three added PostgreSQL cases cover concurrent changed-payload conflict without overwrite, delayed retry/attempt exhaustion with a valid timestamp, and notification ownership for initial, expired, replaced and terminal states. Existing lease tests additionally reject expired-before-reclaim and repeated acknowledgements. The fresh-store recovery case supplies its claimed lease token and still requires accepted notification status. All nine database cases are NOT RUN. Preserve the strict assertions when executing; setup approval alone does not authorize additional production changes.


## SOS-103 local recovery correction checkpoint

The original nine PostgreSQL cases remain unchanged and NOT RUN. Four additional cases cover known-retry delay, final-attempt expiry reaching manual_review, durable send-start with lost acknowledgement, and competing request/recovery dispatch. All thirteen require the same approved isolated database and guards; none have been executed.

Initial and future recovery callers use dispatchNotification, which claims the specific candidate job before marking send-start and invoking a stub/provider. Do not preclaim then call dispatchNotification: it owns that step. A future direct batch-claim caller must implement the same start/acknowledgement protocol. No future scheduler is activated here.

The existing last_error column reserves `sos103:notification-send-started` while an external send may be in progress. Expiry with that marker goes to manual_review, not resend; expiry at the attempt limit also goes to review. These transitions run on a subsequent claim, not an autonomous timer. Review may be needed even if a crash occurred just before the external send. Known-safe failures use retryable with a 60-second delay and six-attempt cap. Historical failed rows are not automatically classified as safe to retry. Ambiguous/timeout responses are held. No review dashboard, new column or migration is added.

Latest local evidence: 26 tests passed, 0 failed, 13 database skips; compilation/lint passed; post-change full build including TypeScript passed with 44/44 pages. These are not real database or provider results. Earlier nine-case descriptions above are retained as coverage history; the current execution count is thirteen.
