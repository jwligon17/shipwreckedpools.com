# CWV 11 — Performance budgets and CI guardrails

**Suggested skill:** `cwv-remediation`  
**Suggested agent:** `cwv_engineer`

## Goal
Add light-touch performance guardrails so the site does not regress after launch.

## Scope
Repo docs and existing CI/tooling only. Keep implementation minimal.

## Instructions to Codex

1. Read `docs/cwv_budget.md`.
2. Add a lightweight performance-check approach that fits the existing stack:
   - documented manual checklist
   - existing test tooling
   - or minimal CI guardrail if already supported
3. Create `docs/performance_regression_guardrails.md`.
4. If the repo already has CI, integrate the smallest safe check. If not, document the recommended process instead of adding heavy tooling.


## Done when

- performance guardrails are documented or lightly implemented
- solution matches the existing stack maturity


## Constraints

- do not bolt on a large toolchain unless the repo already supports it
