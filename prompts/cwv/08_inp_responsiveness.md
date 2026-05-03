# CWV 08 — INP responsiveness

**Suggested skill:** `cwv-remediation`  
**Suggested agent:** `cwv_engineer`

## Goal
Improve responsiveness by reducing long tasks and expensive interaction handlers.

## Scope
Only client-side behavior affecting responsiveness.

## Instructions to Codex

1. Read `docs/js_bundle_audit.md` if it exists.
2. Inspect:
   - menu interactions
   - sliders/carousels
   - quote form interactions
   - any heavy click handlers
3. Reduce unnecessary client work by:
   - simplifying handlers
   - deferring non-critical code
   - trimming hydration where safe
4. Add `docs/cwv_changes_inp.md`.


## Done when

- interactive UI feels lighter
- obvious long-task sources are reduced


## Constraints

- do not break navigation, quote forms, or analytics
