# SEO 11 — Testimonial component deduplication

**Suggested skill:** `testimonial-dedupe`  
**Suggested agent:** `seo_architect`

## Goal
Keep the review/testimonial proof visible while removing heavy duplicate review rendering.

## Scope
Shared review/testimonial components and directly affected pages only.

## Instructions to Codex

1. Find the shared testimonial/review component used on:
   - homepage
   - services hub
   - core service pages
2. Determine why identical reviews are repeated so many times in the rendered output.
3. Refactor the component so each review appears once per intended display set.
4. Preserve the visual treatment as much as possible.
5. If a carousel needs visual looping, prefer a method that does not dump duplicate review text repeatedly into the DOM.


## Done when

- rendered output no longer repeats the same review text excessively
- visual trust section still works
- no review copy was altered


## Constraints

- do not remove all testimonials
- do not add review schema
