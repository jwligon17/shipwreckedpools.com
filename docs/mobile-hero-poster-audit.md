# Mobile Homepage Hero Poster Audit

## Scope audited
- Homepage hero component only.
- Directly related global styles and hero media assets.

## Files controlling mobile hero media behavior
- `src/components/hero.tsx`
- `src/app/globals.css` (only for `motion-reduce` behavior via utility class effect and overlays; no mobile hero image override found)

## Exact implementation responsible for old image flash on mobile
In `src/components/hero.tsx`:
- `heroPosterSrc` is hardcoded to:
  - `/images/proof-pool-comparison-2.png`
- That same asset is used in two places:
  1. Background layer always rendered behind video:
     - `style={{ backgroundImage: `url(${heroPosterSrc})` }}`
  2. Video poster frame:
     - `poster={heroPosterSrc}`

Because both layers use `/images/proof-pool-comparison-2.png`, mobile users see that image first while the video initializes/starts.

## Source type of old image
- `poster` attribute: **Yes** (video poster uses old image)
- mobile-only fallback image branch: **No dedicated mobile-only conditional branch found**
- CSS `background-image` at mobile breakpoint: **No mobile breakpoint-specific override found**
- shared background-image layer in hero component: **Yes** (always-on inline background image)
- reduced-motion fallback logic: **Indirectly yes** via hidden video (`motion-reduce:hidden`), leaving static image layer visible

## Reduced-motion result
- Reduced-motion users see the same asset (`/images/proof-pool-comparison-2.png`) because:
  - video is hidden by `motion-reduce:hidden`
  - static background image layer remains

## Safest mobile-only fix
Safest low-risk option:
- Keep desktop behavior unchanged.
- Introduce a dedicated mobile hero poster/background asset and apply it only for mobile in `src/components/hero.tsx` (while preserving existing desktop asset/video flow).
- Ensure both mobile background layer and mobile video `poster` use the same new mobile asset to eliminate the old-image flash mismatch.

This is safer than removing poster/background outright because it preserves first paint, reduced-motion support, and existing layout/overlay behavior.
