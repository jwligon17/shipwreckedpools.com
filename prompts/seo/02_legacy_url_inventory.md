# SEO 02 — Legacy URL inventory

**Suggested skill:** `legacy-url-consolidation`  
**Suggested agent:** `migration_engineer`

## Goal
Inventory every legacy `/pages/*`, `/products/*`, and `/blogs/news/*` URL that competes with a new canonical route.

## Scope
Read-only report plus CSV output. No redirects yet.

## Instructions to Codex

1. Read `AGENTS.md`, `docs/site_issue_map.md`, and `docs/redirect_map_seed.csv`.
2. Discover all legacy routes that are still live or routable.
3. For each legacy URL, determine:
   - content type
   - best canonical target
   - whether the target exists
   - whether the source should redirect, merge, or be retired
4. Output `docs/legacy_url_inventory.csv` with columns:
   - source_url
   - source_type
   - canonical_target
   - destination_exists
   - action
   - notes
5. If a canonical target does not yet exist, mark it clearly.
6. Do not edit code.


## Done when

- `docs/legacy_url_inventory.csv` exists
- all obvious legacy route families are covered
- unresolved routes are flagged


## Constraints

- no redirect implementation yet
- no homepage catch-all redirects
