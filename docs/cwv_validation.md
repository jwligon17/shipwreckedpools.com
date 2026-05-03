# CWV Post-Fix Validation

Date: 2026-05-03  
Prompt: `prompts/cwv/12_post_fix_validation.md`

## Scope

- Read-only validation pass across the same route set defined in `docs/cwv_baseline.md`.
- No code changes in this step.

## Route Set Re-validated

- `/`
- `/services`
- `/services/weekly-services`
- `/services/algae-removal`
- `/services/filter-cleaning`
- `/locations/south-abilene`
- `/contact`
- `/blog`

## Metric Deltas (Before vs After)

### Numeric lab CWV deltas

- LCP: **blocked** (baseline and post-fix numeric capture unavailable in this environment)
- INP/TBT proxy: **blocked**
- CLS: **blocked**

Reason: Lighthouse CLI execution remains unavailable due to npm/network resolution limits (`ENOTFOUND registry.npmjs.org`).

### Implementation-level deltas confirmed

1. LCP-critical-path improvements:
- Removed above-the-fold hero autoplay video on `/` and `/services`.

2. Image-delivery and media-loading improvements:
- Enabled AVIF/WebP output and longer optimized image TTL.
- Preserved dimensions and tuned lazy/eager behavior for critical vs non-critical media.

3. Font-loading improvements:
- Explicit `display: swap` applied for both active families.
- Disabled eager preload for display font.

4. CLS stability improvements:
- Reserved contact-form message/error space.
- Added persistent vertical scrollbar reservation.

5. INP/main-thread responsiveness improvements:
- Reduced header scroll-driven re-render frequency.
- Removed no-op carousel scroll RAF work.
- Deferred analytics listener attachment slightly after hydration.

6. Cache + revisit behavior improvements:
- Added conservative cache headers for static images/videos/icon.
- No obvious `beforeunload`/`unload` bfcache blockers found.

## Routes Improved (Expected)

- `/`: likely LCP improvement from hero video removal; reduced non-critical media pressure.
- `/services`: likely LCP improvement from hero video removal; improved image delivery path.
- `/services/weekly-services`: likely better image/network behavior and reduced interaction overhead.
- `/services/algae-removal`: likely improved media transfer/decode behavior for proof-heavy sections.
- `/services/filter-cleaning`: likely improved media transfer/decode behavior for proof/service imagery.
- `/locations/south-abilene`: corrected above-the-fold hero image loading priority in split hero path.
- `/contact`: likely better CLS from reserved form feedback space; likely better LCP path from prior hero video removal work.
- `/blog`: no direct targeted CWV code change in this pack, but benefits from shared runtime/cache improvements.

## Routes Still Failing or Unverified

- All routes remain **numerically unverified** for LCP/INP/CLS in this environment due to blocked Lighthouse tooling.
- No runtime lint/type/build regressions were detected during prompt-pack validation runs.

## Next-Best Opportunities (Prioritized)

1. Run Lighthouse mobile + desktop for the full route set in an environment with npm/network access and archive exact before/after deltas.
2. Optimize largest source image files (`final-cta-pool-service.png`, decorative/home-area/proof assets) at asset level to reduce origin bytes before Next optimization.
3. Re-check shared client islands (reviews carousel, header interactions) with real interaction traces once lab tooling is available.
4. Add lightweight CI enforcement of `lint + typecheck + build` (already documented in `docs/performance_regression_guardrails.md`) if/when CI workflows are introduced.

## Validation Status

- Post-fix validation report created.
- Remaining CWV work is now primarily measurement unblocking and asset-level byte reductions.
