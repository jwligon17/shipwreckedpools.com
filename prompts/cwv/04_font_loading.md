# CWV 04 — Font loading

**Suggested skill:** `cwv-remediation`  
**Suggested agent:** `cwv_engineer`

## Goal
Reduce font-related blocking, shift, and overhead.

## Scope
Font files, font CSS, layout typography loading logic only.

## Instructions to Codex

1. Inspect current font loading behavior.
2. Reduce blocking and layout instability by:
   - limiting font variants
   - using preload only where justified
   - setting sensible font-display behavior
   - checking fallback metrics if needed
3. Preserve the visual brand as closely as possible.
4. Add `docs/cwv_changes_fonts.md`.


## Done when

- font loading is lighter and more stable
- no obvious flash or layout breakage


## Constraints

- do not swap the brand typography wholesale unless absolutely necessary
