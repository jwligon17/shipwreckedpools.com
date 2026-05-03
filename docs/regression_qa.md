# Regression QA (SEO Pack)

Date: 2026-05-03
Scope: Read-only post-SEO regression pass.

## Findings (Ordered by Severity)

### Medium

1. Legacy giveaway route still canonical on legacy namespace
- Route: `/pages/free-estimate-pool-skimmer-giveaway`
- Current state: page exists and self-canonicalizes to `/pages/free-estimate-pool-skimmer-giveaway`.
- Risk: legacy namespace remains in canonical graph for this route until a non-legacy destination is approved.
- Evidence:
  - `src/app/pages/free-estimate-pool-skimmer-giveaway/page.tsx`
  - Existing blocker already tracked in redirect docs/status.

### Low

2. Generic not-found metadata string remains for invalid blog slugs
- Route family: `/blog/[slug]`
- Current state: missing slug returns `Blog Post Not Found` metadata before `notFound()`.
- Risk: minor; expected fallback behavior, not a routing break.
- Evidence:
  - `src/app/blog/[slug]/page.tsx`

## Passed Checks

1. Broken links / route mismatches
- No obvious route mismatches found in core updated templates.
- Redirect set for seeded legacy `/pages/*`, `/products/*`, and `/blogs/news/*` article mappings is implemented in `next.config.ts`.

2. Title/H1 regressions
- Homepage, core services, priority locations, contact, and blog detail templates reflect explicit SEO-intent title/H1 patterns introduced in prior prompts.

3. Canonical checks
- Canonical alternates present on dynamic:
  - service pages (`/services/{slug}`)
  - location pages (`/locations/{slug}`)
  - blog article pages (`/blog/{slug}`)
- Sitemap remains canonical-route-only (`/services/*`, `/locations/*`, `/blog/*`, plus intended static routes).

4. Duplicate testimonials
- Shared testimonial carousel no longer clones repeated review sets in DOM; each review appears once per display set.

5. Blog routes resolving
- Blog index links point to `/blog/{slug}` and matching detail routes are present with visible article content.

6. Contact page staging language
- String `This form is staging-safe.` is removed from live form copy.

## Summary

- Overall regression status: **PASS with 1 medium follow-up**.
- Primary remaining follow-up: finalize canonical destination strategy for `/pages/free-estimate-pool-skimmer-giveaway`.
