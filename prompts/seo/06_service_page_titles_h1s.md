# SEO 06 — Service page titles and H1s

**Suggested skill:** `service-page-seo`  
**Suggested agent:** `seo_copy_editor`

## Goal
Upgrade core service-page titles, H1s, and meta descriptions so they match high-intent local search language.

## Scope
Core service pages only.

## Instructions to Codex

1. Read `docs/recommended_title_h1_meta.csv`.
2. Update these routes first:
   - `/services/weekly-services`
   - `/services/bi-weekly-services`
   - `/services/algae-removal`
   - `/services/filter-cleaning`
   - `/services/drain-and-refill`
   - `/services/acid-wash`
   - `/services/pump-repair-and-installation`
   - `/services/one-time-cleans`
   - `/services/sand-replacement`
3. Replace short-label H1s with explicit service + location H1s.
4. Tighten title tags and meta descriptions to match the CSV unless a slightly better variation fits the codebase pattern.
5. Keep slugs unchanged.


## Done when

- each service page has an explicit local-intent title tag
- each service page has an explicit local-intent H1
- slugs remain stable


## Constraints

- no content expansion yet
- no route changes
