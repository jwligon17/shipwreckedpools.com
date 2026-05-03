# Shipwrecked CWV budget

## Google thresholds
- LCP: <= 2.5s
- INP: <= 200ms
- CLS: <= 0.1

## Project budgets (recommended)
These are stricter internal targets to make the public thresholds easier to hit.

### Key-route lab targets
- Home mobile LCP: <= 2.2s
- Service-page mobile LCP: <= 2.2s
- Location-page mobile LCP: <= 2.2s
- Contact-page mobile LCP: <= 2.0s

### Implementation budgets
- No autoplay hero video above the fold
- Hero image should be compressed, dimensioned, and prioritized
- Avoid more than one large custom font family unless justified
- Avoid new third-party scripts unless they directly support conversion or operations
- Keep layout shifts at zero for header, hero, quote form, review widgets, and service cards
- Defer non-critical scripts and below-the-fold media

## Validation routes
- `/`
- `/services`
- `/services/weekly-services`
- `/services/algae-removal`
- `/services/filter-cleaning`
- `/locations/south-abilene`
- `/contact`
- `/blog`
