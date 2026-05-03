# SEO 09 — Blog route repair

**Suggested skill:** `legacy-url-consolidation`  
**Suggested agent:** `migration_engineer`

## Goal
Repair the new blog routes so the blog index links resolve to real articles, then prepare old blog routes for consolidation.

## Scope
Blog index, article routes, legacy blog migration, and related routing/config only.

## Instructions to Codex

1. Inspect `/blog` and confirm the article links currently point to `Blog Post Not Found`.
2. Find the legacy content source for the articles (likely the old `/blogs/news/*` content or the underlying CMS data source).
3. Restore working article routes under `/blog/*` for the articles currently listed on the blog index.
4. Ensure each restored article has:
   - title
   - H1
   - publication date
   - body content
   - canonical tag
   - internal links to relevant service pages
5. Once the new article route works, update the redirect map for its old `/blogs/news/*` equivalent.
6. Add a short validation list to `docs/blog_route_validation.md`.


## Done when

- every article linked from `/blog` resolves successfully
- article pages have real content, not not-found pages
- old blog route consolidation is ready


## Constraints

- do not silently delete old content
- do not change the `/blog` index design unless needed for route health
