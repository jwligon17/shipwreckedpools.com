# CWV LCP Changes

Date: 2026-05-03
Prompt: `prompts/cwv/02_lcp_critical_path.md`

## Routes Targeted

- `/` (homepage)
- `/services` (services hub)
- `/services/weekly-services` reviewed as money page reference (no hero video path present)

## Changes Applied

1. Homepage hero critical path
- File: `src/components/hero.tsx`
- Change: removed above-the-fold autoplay background video element.
- Rationale: the hero video was a primary likely LCP bottleneck and added early media/decode pressure.

2. Services hub hero critical path
- File: `src/app/services/page.tsx`
- Change: removed hero video source usage from `InternalHero` (no `backgroundVideoSrc` passed).
- Rationale: eliminates large above-fold media from `/services` critical rendering path.

## Expected Impact

- Reduced early network/media decode work on two high-priority routes.
- Lower risk of video-driven LCP inflation.
- No route changes and no content/layout structure rewrite.

## Notes

- Visual direction is preserved via existing gradient/overlay hero styling.
- Additional numeric LCP verification remains blocked in this environment until Lighthouse tooling can run with network access.
