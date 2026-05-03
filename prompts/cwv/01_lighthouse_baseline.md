# CWV 01 — Lighthouse baseline

**Suggested skill:** `cwv-audit`  
**Suggested agent:** `cwv_engineer`

## Goal
Create a route-by-route baseline for Core Web Vitals and Lighthouse diagnostics before making performance changes.

## Scope
Read-only. No file edits.

## Instructions to Codex

1. Read `AGENTS.md` and `docs/cwv_budget.md`.
2. Run performance audits for:
   - `/`
   - `/services`
   - `/services/weekly-services`
   - `/services/algae-removal`
   - `/services/filter-cleaning`
   - `/locations/south-abilene`
   - `/contact`
   - `/blog`
3. If PageSpeed/CrUX is available in the environment, capture field data too. If not, use Lighthouse only and note the limitation.
4. Create `docs/cwv_baseline.md` with:
   - LCP, INP/TBT proxy, CLS
   - likely LCP element
   - largest images
   - heaviest scripts
   - layout-shift suspects
   - route-specific top opportunities
5. Do not edit code.


## Done when

- `docs/cwv_baseline.md` exists
- priority routes are covered
- biggest root causes are identified


## Constraints

- no code changes
