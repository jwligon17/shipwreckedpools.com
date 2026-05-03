# CWV Baseline (Pre-Optimization)

Date: 2026-05-03
Method: attempted Lighthouse desktop audits on local dev server for required routes.

## Measurement Limitation

- Lighthouse CLI could not be executed in this environment because `npx` could not resolve/download `lighthouse` from npm (`ENOTFOUND registry.npmjs.org`).
- CrUX/PageSpeed field data is not available in this environment.
- Result: lab metrics are **blocked** for this run; route coverage below uses code-level baseline hypotheses and prioritized suspects.

## Route Coverage

| Route | LCP | INP/TBT proxy | CLS | Likely LCP element | Largest image/media suspects | Heaviest script/runtime suspects | Layout-shift suspects | Top opportunities |
|---|---:|---:|---:|---|---|---|---|---|
| `/` | blocked | blocked | blocked | Home hero heading + autoplay hero video paint | `/videos/homescreenvideo.mp4`, difference card images, decorative circles | React hydration + large client review carousel section | hero media sizing, late image decode | Replace/disable autoplay above-fold video; prioritize static hero image fallback; reduce above-fold media bytes |
| `/services` | blocked | blocked | blocked | Internal hero + above-fold section title | `/videos/services-hero.mp4`, proof comparison image | hydration of reviews carousel and service cards | proof image placeholder/real swap | Remove autoplay hero video on key route; compress proof media; defer non-critical below-fold media |
| `/services/weekly-services` | blocked | blocked | blocked | Service hero text + primary service illustration | service illustration image, proof images | heavy interactive reviews carousel on service template | proof section image loading | Reduce above-fold illustration payload; lazy-load non-critical proof assets; simplify below-fold interactive payload |
| `/services/algae-removal` | blocked | blocked | blocked | Service hero + algae solves/proof media | algae proof image (`/images/proof-pool-comparison-2.png`) | reviews carousel client JS + drag handlers | large proof media shifts | Compress and dimension proof image; set stable containers for media; defer non-critical client interactions |
| `/services/filter-cleaning` | blocked | blocked | blocked | Service hero + first content block | service graphic + fallback proof imagery | reviews carousel client JS | image fallback vs loaded asset transitions | Optimize service graphics and proof containers; minimize above-fold image work |
| `/locations/south-abilene` | blocked | blocked | blocked | Location hero H1 + hero background layers | location hero image/card image | location page interactive content + reviews carousel | hero/background overlays and responsive image swaps | Reduce hero media/layers; ensure fixed dimensions and loading priority on first meaningful image |
| `/contact` | blocked | blocked | blocked | Contact hero text + form card | `/videos/contact-hero.mp4` if present, CTA image assets | form client JS + global analytics listeners + hydration | form error/status rendering shifts | Remove autoplay hero video above fold; keep form container stable; avoid late visual inserts above form |
| `/blog` | blocked | blocked | blocked | Blog hero text + first article card | card decorative assets (no obvious heavy media) | card grid hydration and shared layout scripts | card render/responsive shifts | Keep hero lightweight; pre-size card containers; avoid unnecessary client-side work |

## Cross-Route Root-Cause Candidates

1. Autoplay hero video on key routes (`/`, `/services`, `/contact`) is likely the top LCP pressure source and conflicts with the project CWV budget.
2. Shared client-side review carousel on multiple pages adds script/hydration cost and can degrade INP/TBT proxies.
3. Large proof/comparison images on service pages likely dominate image-transfer cost on those routes.
4. Layered decorative backgrounds and multiple above-fold visuals increase paint/composite cost on hero sections.
5. Dynamic image fallbacks can introduce avoidable layout work if intrinsic dimensions/priority are not consistently enforced.

## Next Step to Unblock Metrics

1. Install Lighthouse tooling in an environment with npm registry access, then rerun route audits from this same route list.
2. Capture mobile + desktop lab runs and append numeric LCP, TBT, CLS values.
3. If available, add CrUX field values for LCP/INP/CLS to validate real-user impact.
