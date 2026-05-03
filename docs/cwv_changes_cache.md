# CWV Cache + bfcache Changes

Date: 2026-05-03  
Prompt: `prompts/cwv/09_cache_bfcache.md`

## What was inspected

- Static/cache header configuration in `next.config.ts`
- Route/client patterns that commonly hurt bfcache eligibility:
  - `beforeunload` / `unload` handlers
  - explicit `no-store` patterns in route behavior
  - heavy lifecycle listeners that can interfere with history navigation restore

## Changes implemented

1. Added conservative static-asset caching headers in `next.config.ts`
- `/images/:path*`:
  - `Cache-Control: public, max-age=2592000, stale-while-revalidate=604800`
- `/videos/:path*`:
  - `Cache-Control: public, max-age=604800, stale-while-revalidate=86400`
- `/icon.svg`:
  - `Cache-Control: public, max-age=2592000, stale-while-revalidate=604800`

These target only static assets and avoid applying unsafe caching to dynamic HTML or API responses.

## bfcache readiness findings

- No `beforeunload`/`unload` listeners were found in app/client code.
- No explicit `no-store` route directives were found in app route modules reviewed for this prompt.
- Existing interaction listeners are primarily passive and scoped in component lifecycles; no high-risk bfcache blockers were identified in this pass.

## Notes / follow-up

- Lighthouse/PageSpeed-based bfcache diagnostics could not be numerically verified in this environment (network/tooling constraint already tracked).
- If future analytics or third-party scripts add unload-style handlers, re-audit bfcache eligibility immediately.
