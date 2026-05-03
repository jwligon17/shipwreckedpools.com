# SEO 03 — Redirect map

**Suggested skill:** `legacy-url-consolidation`  
**Suggested agent:** `migration_engineer`

## Goal
Create the exact redirect plan needed to consolidate old routes into canonical new routes.

## Scope
CSV + implementation notes only. No live redirect edits yet.

## Instructions to Codex

1. Read `docs/legacy_url_inventory.csv` and `docs/redirect_map_seed.csv`.
2. Produce `docs/redirect_map.csv` with final source-to-target mappings.
3. Add a `status` column:
   - ready
   - blocked-needs-destination
   - retire-410
4. Create `docs/redirect_implementation_notes.md` explaining:
   - which config layer should own the redirects
   - whether regex/pattern rules are safe
   - any routes that need content fixes before redirecting


## Done when

- `docs/redirect_map.csv` exists
- every redirect has an explicit target and rationale
- blocked items are isolated


## Constraints

- do not change routes yet
- do not implement redirects yet
