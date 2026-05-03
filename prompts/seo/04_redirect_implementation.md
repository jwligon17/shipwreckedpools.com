# SEO 04 — Redirect implementation

**Suggested skill:** `legacy-url-consolidation`  
**Suggested agent:** `migration_engineer`

## Goal
Implement the approved redirect map in the existing routing/hosting layer and update internal links to canonical destinations.

## Scope
Only redirect/config files and affected internal links.

## Instructions to Codex

1. Read `docs/redirect_map.csv` and `docs/redirect_implementation_notes.md`.
2. Find the existing routing or hosting config used by this project.
3. Implement only redirects marked `ready`.
4. Update internal links so they point directly to canonical routes, not legacy routes.
5. Add `docs/redirect_validation_checklist.md` with the exact URLs to test after deploy.
6. If the stack cannot support redirects where expected, stop and document the correct deployment layer instead of faking a solution.


## Done when

- ready redirects are implemented in the correct layer
- canonical internal links point to the new routes
- validation checklist exists


## Constraints

- no new route renames
- no changes outside redirect/config and directly affected links
