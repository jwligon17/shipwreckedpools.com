# CWV 03 — Image pipeline

**Suggested skill:** `cwv-remediation`  
**Suggested agent:** `cwv_engineer`

## Goal
Reduce image cost across key routes without hurting perceived quality.

## Scope
Image components, image helpers, and directly affected route assets only.

## Instructions to Codex

1. Inventory the biggest image assets on priority routes.
2. Improve the image pipeline using the existing framework conventions:
   - explicit dimensions
   - responsive sizes/srcset if supported
   - modern formats if supported
   - below-the-fold lazy loading
   - above-the-fold priority handling
3. Ensure important service/location proof images still look premium.
4. Add `docs/cwv_changes_images.md`.


## Done when

- key images are better optimized
- layout stability improves
- critical images remain discoverable and high quality


## Constraints

- do not degrade hero or proof images into obviously poor quality
- do not hide critical images from search if they matter to content
