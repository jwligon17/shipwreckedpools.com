# CWV 12 — Post-fix validation

**Suggested skill:** `cwv-audit`  
**Suggested agent:** `qa_reviewer`

## Goal
Run a final read-only validation pass after CWV changes are complete.

## Scope
Read-only. No code changes.

## Instructions to Codex

1. Re-run the same route set used in `docs/cwv_baseline.md`.
2. Compare before vs after.
3. Create `docs/cwv_validation.md` with:
   - metric deltas
   - routes improved
   - routes still failing
   - next-best opportunities
4. Do not edit code in this step.


## Done when

- before/after validation exists
- remaining work is prioritized clearly


## Constraints

- no code changes
