# Redirect Implementation Notes

Date: 2026-05-03

## Recommended Redirect Owner

- Primary layer: `next.config.ts` `redirects()` for explicit source-to-target 301 redirects.
- Reason: central, reviewable, and aligned with current repo convention (service alias redirects already live there).
- Do not split redirect ownership across multiple layers unless technically required.

## Pattern/Regex Safety

- Safe:
  - Explicit one-to-one redirects for known legacy sources in `docs/redirect_map.csv` with `status=ready`.
- Risky:
  - Broad wildcard redirects like `/pages/:path* -> /` or `/blogs/news/:slug* -> /blog/:slug*` without verifying destination slugs.
  - Wildcard rules can silently route broken or irrelevant pages and hide inventory gaps.
- Recommended:
  - Implement explicit seeded redirects first.
  - For unknown legacy families, return 410 (or explicit retire behavior) until canonical destination is approved.

## Routes Needing Content/Policy Decision Before Redirect

1. `/pages/free-estimate-pool-skimmer-giveaway`
- Currently implemented at a legacy namespace path.
- Needs decision: keep as-is, move to a new canonical non-legacy path, then map old URL.

2. `/blogs/news/*` (unknown slugs beyond seeded list)
- Seeded blog slugs can redirect now.
- Unknown slugs need policy:
  - either maintain an explicit map,
  - or retire unknowns with 410,
  - or create controlled fallback only if canonical article parity exists.

3. Wildcard `/pages/*` and `/products/*` unknown URLs
- Additional historical URLs are likely.
- Needs crawl/log export to prevent accidental redirecting of irrelevant legacy paths.
