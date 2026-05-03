# SEO 15 — Regression QA

**Suggested skill:** `shipwrecked-issue-triage`  
**Suggested agent:** `qa_reviewer`

## Goal
Perform a read-only regression pass after SEO changes.

## Scope
Read-only. No code changes.

## Instructions to Codex

1. Review the changed routes and components.
2. Check:
   - broken links
   - route mismatches
   - title/H1 regressions
   - canonical mismatches
   - duplicate testimonials still present
   - blog routes resolving
   - contact page staging language removed
3. Produce `docs/regression_qa.md` with findings ordered by severity.


## Done when

- `docs/regression_qa.md` exists
- remaining issues are concrete and prioritized


## Constraints

- no code changes in this step
