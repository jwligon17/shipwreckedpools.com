# CWV 06 — Third-party script audit

**Suggested skill:** `cwv-audit`  
**Suggested agent:** `cwv_engineer`

## Goal
Audit third-party scripts for performance cost and necessity.

## Scope
Read-only. No code changes.

## Instructions to Codex

1. Inventory all third-party scripts, embeds, widgets, and trackers.
2. Document:
   - what each one does
   - where it loads
   - whether it is required on every route
   - likely performance cost
3. Create `docs/third_party_script_audit.md`.
4. Recommend removal, defer, conditional loading, or retention for each.


## Done when

- every third-party script has an explicit keep/remove/defer recommendation


## Constraints

- no code changes
