# Performance Regression Guardrails

Date: 2026-05-03  
Prompt: `prompts/cwv/11_performance_budgets.md`

## Context

- Existing stack has lightweight scripts only (`lint`, `build`) and no repo CI pipeline committed (`.github/workflows` not present).
- To avoid bolting on heavy tooling, guardrails are defined as a repeatable, lightweight process using existing project commands and already-created CWV docs.

## Baseline budgets (source of truth)

Use `docs/cwv_budget.md` as the numeric and implementation budget source.

## Pre-merge checklist (manual, required)

Run on every PR that touches pages/components/assets:

1. `npm run lint`
2. `npx tsc --noEmit`
3. `npm run build`
4. Review changed files against these budget rules:
   - no autoplay hero video above the fold
   - above-the-fold media remains dimensioned and prioritized where needed
   - below-the-fold media remains lazy/deferred
   - no new heavyweight third-party script unless conversion/ops critical
   - no new layout-shift risk in header, hero, quote form, reviews, service cards

## Release-candidate CWV sweep (manual)

Before production deploy, run a focused route QA on:
- `/`
- `/services`
- `/services/weekly-services`
- `/services/algae-removal`
- `/services/filter-cleaning`
- `/locations/south-abilene`
- `/contact`
- `/blog`

Confirm against recent prompt artifacts:
- `docs/cwv_changes_lcp.md`
- `docs/cwv_changes_images.md`
- `docs/cwv_changes_fonts.md`
- `docs/cwv_changes_cls.md`
- `docs/cwv_changes_inp.md`
- `docs/cwv_changes_cache.md`
- `docs/cwv_changes_lazy_loading.md`

## Regression trigger rules

Escalate and block release when any of the following occur:

1. New above-the-fold video or non-critical hero JS introduced.
2. Critical above-the-fold image switched to lazy loading.
3. New client-wide interaction listener added without justification.
4. New third-party script/iframe added globally.
5. Any visible header/hero/form jump reported in manual QA.

## Future CI recommendation (when stack matures)

When CI is introduced, add the smallest safe gate first:
- required checks: `npm run lint`, `npx tsc --noEmit`, `npm run build`
- keep CWV route checks manual until reliable Lighthouse automation is available in the target environment.
