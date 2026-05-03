# CWV 02 — LCP critical path

**Suggested skill:** `cwv-remediation`  
**Suggested agent:** `cwv_engineer`

## Goal
Improve LCP on the homepage and key money pages by optimizing the actual critical path.

## Scope
Only files affecting hero rendering, critical assets, loading priority, or render-blocking behavior.

## Instructions to Codex

1. Read `docs/cwv_baseline.md`.
2. Identify the real LCP element on the homepage and the top 2 money pages.
3. Improve only the root causes, such as:
   - oversized hero asset
   - missing image priority
   - render-blocking CSS/JS
   - delayed font rendering
   - unnecessary hero animations
4. Preserve the visual design as much as possible.
5. Add notes to `docs/cwv_changes_lcp.md`.


## Done when

- LCP bottlenecks are materially improved on priority routes
- change set is narrowly focused
- documentation exists


## Constraints

- do not redesign the hero
- do not lazy-load above-the-fold critical content
