# CWV 05 — JavaScript bundle audit

**Suggested skill:** `cwv-audit`  
**Suggested agent:** `cwv_engineer`

## Goal
Identify the JS cost driving long tasks and delayed interactivity on key routes.

## Scope
Read-only. No code changes.

## Instructions to Codex

1. Inspect bundle composition, route chunks, and major client-side components.
2. Identify the largest and least-valuable JS on:
   - homepage
   - services hub
   - contact page
3. Create `docs/js_bundle_audit.md` with:
   - heavy components
   - likely long-task sources
   - hydration-heavy areas
   - recommended reductions
4. Do not edit code in this step.


## Done when

- audit pinpoints the main JS costs and where they live


## Constraints

- no code changes
