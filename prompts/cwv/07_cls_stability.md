# CWV 07 — CLS stability

**Suggested skill:** `cwv-remediation`  
**Suggested agent:** `cwv_engineer`

## Goal
Eliminate layout-shift sources on the highest-value pages.

## Scope
Only files causing visual instability.

## Instructions to Codex

1. Read `docs/cwv_baseline.md`.
2. Find CLS causes such as:
   - images without reserved space
   - carousels/sliders causing jumps
   - fonts causing text reflow
   - sticky headers or banners shifting layout
   - form or CTA elements moving after hydration
3. Fix the highest-impact causes first.
4. Add `docs/cwv_changes_cls.md`.


## Done when

- CLS root causes are fixed on priority routes
- header, hero, reviews, and quote form remain visually stable


## Constraints

- preserve layout aesthetics where possible
