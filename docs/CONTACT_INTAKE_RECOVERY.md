# Contact intake recovery

The production error was reproduced from `18dd0c6`: a valid synthetic inquiry
with no storage configuration returned HTTP 503, "Contact service is temporarily
unavailable.", before the mocked email sender was called.

## Deliberate email-only behavior

When no intake store is selected, no database URL is configured, and no store is
injected, `/api/contact` uses the existing Resend notification path directly.
The existing validation, request-size limit, honeypot, escaped message formatting,
and contact/giveaway fields are retained. An explicitly configured store still
uses the existing capture path; database errors never fall back to email success.
Memory storage is not the production recovery mechanism.

Email-only success requires a provider acknowledgement with a message ID. It
does not establish inbox delivery, database capture, or spreadsheet persistence.
No capture IDs are fabricated. Provider rejection, missing acknowledgement, and
exceptions return errors; both forms retain the supplied fields and retry token.
Suppressed requests are not accepted inquiries. The clients check the explicit
acceptance response before clearing fields or recording a genuine success.

## Routing and immediate retries

- Reuse `RESEND_API_KEY`, the existing verified `CONTACT_FROM_EMAIL`, and the
  intended owner `CONTACT_TO_EMAIL`. No new sender or recipient is introduced.
- Only the literal `RESEND_TEST_MODE=true` selects the existing provider test
  recipient. The literal `false` disables that mode. Production must use the
  configured owner recipient; test-mode responses never record genuine leads.
- `CONTACT_SUBJECT_PREFIX` retains the existing default when absent.
- A synchronous client guard prevents simultaneous submissions. Email-only
  provider idempotency uses the normalized payload hash, which includes the
  existing submission token. Unchanged retries produce the same key and message;
  corrected details produce a new key. After an uncertain response, retry the
  unchanged details first: edited details are a new request and can send another
  notification if the original was accepted.
- Resend retains idempotency keys for 24 hours. This is bounded provider duplicate
  protection, not permanent deduplication or a durable lead register. Reloading
  the form creates a new token.

Routing evidence checked on 2026-09-30: the existing local `.env.local` identifies
`quotes@send.shipwreckedpools.com` as sender and `info@shipwreckedpools.com` as
recipient. `docs/CODEX_RUN_STATUS.md` records owner-confirmed live inbox receipt
on 2026-09-14; `docs/SOS-101_IMPLEMENTATION_REPORT.md` records the intended inbox.
These are local/historical evidence, not verification of current Production
values. The owner reports both Production variables exist as write-only Secrets;
blank editors do not mean missing values. Preserve both settings unchanged. The
owner saved Production `RESEND_TEST_MODE=false` without redeploying. The existing
local Resend key cannot read domains or delivery history (`restricted_api_key`).
The owner also confirmed `www.shipwreckedpools.com` belongs to Current Production
in the `shipwreckedpools-com` project; this is owner-provided domain evidence.

## Release and verification

The hotfix is isolated from paused SOS-126 work. Its application scope is the
existing intake service/email helpers and the two active form components. Tests
use mocked providers/stores; browser tests intercept every contact POST and block
external requests. No automated production submission is permitted.

Before Production release, confirm the project/domain binding and retain the
routing evidence limits above. Current sender/recipient Secret contents remain
unverified; no evidence establishes that either needs replacement. After release,
verify the released SHA, successful Production deployment and public-domain
output. The saved literal test-mode setting must be included in that deployment.
Provider acceptance or a green deployment alone does not resolve the incident.

For the one owner-run live test, use the owner's own details and begin the contact
message with `[OWNER RECOVERY TEST]`. This label suppresses the existing browser
lead event while retaining the real owner email route. Exclude the labelled email
from manual lead/customer reporting. Do not enable Resend test mode for this test.
Resolution requires the owner to confirm receipt in the intended inbox and verify
the submitted details.

## Rollback boundary

Do not revert the entire hotfix to `18dd0c6`: that would restore the known 503
failure. If client behavior regresses, roll back only the affected client hunks
while retaining the server's email-only recovery, then rerun the focused checks.
For a server regression, prepare and validate a contact-only forward repair using
the earlier email path in `eebe0c3` as reference; do not roll back the whole site or
claim the broken storage-required handler is a working fallback. Keep the existing
call/text alternatives available during any further recovery.
