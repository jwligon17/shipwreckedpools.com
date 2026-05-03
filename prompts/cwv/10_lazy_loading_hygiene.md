# CWV 10 — Lazy-loading hygiene

**Suggested skill:** `cwv-remediation`  
**Suggested agent:** `cwv_engineer`

## Goal
Make lazy loading search-safe and performance-safe.

## Scope
Image and component loading logic only.

## Instructions to Codex

1. Inspect current lazy-loading behavior for images and any deferred content.
2. Ensure critical above-the-fold content is not lazy-loaded.
3. Ensure below-the-fold media is lazy-loaded in a way that does not hide important crawlable content.
4. Add `docs/cwv_changes_lazy_loading.md`.


## Done when

- critical content loads eagerly when it should
- non-critical content is deferred safely


## Constraints

- do not lazy-load essential text or primary CTA content
