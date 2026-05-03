# CWV Image Pipeline Changes

Date: 2026-05-03  
Prompt: `prompts/cwv/03_image_pipeline.md`

## Biggest image assets on priority routes (inventory)

Top heavy assets currently used on key templates:
- `/images/final-cta-pool-service.png` (~6.6 MB) on homepage final CTA.
- `/images/decorative-blue-circle.png` (~4.5 MB) as decorative homepage art.
- `/images/areas-north-abilene.png` (~1.3 MB), `/images/areas-south-abilene.png` (~967 KB), `/images/areas-abilene-wylie.png` (~818 KB) on location cards/sections.
- `/images/proof-pool-comparison-2.png` (~1.5 MB), `/images/services/acid-wash-proof-before.png` (~3.4 MB), `/images/services/acid-wash-proof-after.png` (~3.2 MB), and `/images/services/pump-proof-photo.png` (~1.0 MB) on service proof sections.

## Changes implemented

1. Enabled modern output formats and stronger cache behavior in Next image optimization:
- `next.config.ts`
  - `images.formats = ["image/avif", "image/webp"]`
  - `images.minimumCacheTTL = 2678400` (31 days)

2. Added explicit quality/loading controls on heavy, non-critical image blocks:
- Homepage decorative and card media (`src/app/page.tsx`)
- Homepage area highlight cards (`src/components/home-pool-area-highlights-section.tsx`)
- Homepage final CTA image (`src/components/home-final-cta-section.tsx`)
- Service page proof/process/supporting media (`src/app/services/[slug]/page.tsx`)
- Location page media cards (`src/app/locations/[slug]/page.tsx`)

3. Preserved explicit dimensions or `fill + sizes` behavior already in place to keep layout stability and responsive `srcset` generation.

## Expected CWV effect

- Reduced transfer weight for large PNG/JPG assets via AVIF/WebP output from Next image optimizer.
- Lower decode/render pressure on below-the-fold media due to explicit lazy-loading where applicable.
- Maintained premium visual quality for proof/service imagery with tuned quality values rather than aggressive compression.

## Notes

- No critical content images were hidden from crawlable HTML.
- No route changes, CTA flow changes, or schema changes were introduced in this prompt.
