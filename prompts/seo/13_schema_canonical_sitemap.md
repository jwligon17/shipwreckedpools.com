# SEO 13 — Schema, canonical, sitemap, robots

**Suggested skill:** `structured-data-and-sitemap`  
**Suggested agent:** `seo_architect`

## Goal
Audit and tighten technical SEO signals after route consolidation and page rewrites are done.

## Scope
Schema, canonical tags, sitemap generation, robots rules, and affected layout/template files.

## Instructions to Codex

1. Confirm canonical tags point to the preferred new routes.
2. Ensure legacy routes do not self-canonicalize after redirects are in place.
3. Add or improve JSON-LD for:
   - homepage business identity
   - service pages where helpful and supported
   - blog articles if article schema fits visible content
4. Ensure the sitemap lists canonical new URLs only.
5. Confirm robots rules do not block important content.
6. Add `docs/schema_validation.md` with what was added and how to test it.


## Done when

- canonical logic matches the new route structure
- sitemap excludes legacy duplicates
- schema aligns with visible content


## Constraints

- no self-serving review rich-result markup
- no FAQ rich-result assumptions
