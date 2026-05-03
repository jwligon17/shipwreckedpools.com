# CWV 09 — Caching and bfcache readiness

**Suggested skill:** `cwv-remediation`  
**Suggested agent:** `cwv_engineer`

## Goal
Improve repeat-visit performance and back/forward navigation behavior where the stack allows.

## Scope
Headers, caching config, and route behavior affecting bfcache eligibility.

## Instructions to Codex

1. Inspect how caching headers and asset caching are configured.
2. Improve cache behavior for static assets where safe.
3. Check for patterns that may block back/forward cache and remove them if low risk.
4. Add `docs/cwv_changes_cache.md`.


## Done when

- caching is improved where supported
- bfcache blockers are reduced or documented


## Constraints

- do not apply unsafe cache headers to personalized or dynamic content
