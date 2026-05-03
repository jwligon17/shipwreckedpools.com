# CWV Lazy-Loading Hygiene Changes

Date: 2026-05-03  
Prompt: `prompts/cwv/10_lazy_loading_hygiene.md`

## What was reviewed

- Image loading behavior across priority templates and shared sections:
  - homepage (`src/app/page.tsx`)
  - services hub (`src/app/services/page.tsx`)
  - contact page (`src/app/contact/page.tsx`)
  - location detail page (`src/app/locations/[slug]/page.tsx`)
  - shared image-heavy sections/components

## Change made

1. Above-the-fold hero image on split-layout location pages set to eager
- File: `src/app/locations/[slug]/page.tsx`
- Change:
  - replaced `loading="lazy"` with `priority` on the location hero visual (`existingLocationImage`) used in the split hero variant.
- Reason:
  - this image can appear in the first viewport and should not be deferred.

## Verified lazy-loading hygiene

- Non-critical and below-the-fold images remain lazy-loaded (explicitly or via Next/Image defaults).
- Essential text and primary CTA content remain server-rendered and immediately crawlable (not deferred behind lazy logic).
- No essential copy or primary CTA interactions were lazy-loaded.

## Net effect

- Critical above-the-fold media now loads eagerly where appropriate.
- Below-the-fold media remains deferred safely for performance.
