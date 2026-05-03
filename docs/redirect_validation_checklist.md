# Redirect Validation Checklist

Date: 2026-05-03
Environment: production deployment after redirect release

## Expected 301 Redirects (Ready Set)

1. `/pages/acid-wash` -> `/services/acid-wash`
2. `/pages/green-to-cleans` -> `/services/algae-removal`
3. `/pages/contact` -> `/contact`
4. `/pages/baird-pool-service` -> `/locations/baird`
5. `/pages/buffalo-gap-pool-service` -> `/locations/buffalo-gap`
6. `/pages/clyde-pool-service` -> `/locations/clyde`
7. `/pages/hamby-pool-service` -> `/locations/hamby`
8. `/pages/hawley-pool-service` -> `/locations/hawley`
9. `/pages/merkel-pool-service` -> `/locations/merkel`
10. `/pages/potosi-pool-service` -> `/locations/potosi`
11. `/pages/tuscola-pool-service` -> `/locations/tuscola`
12. `/pages/tye-pool-service` -> `/locations/tye`
13. `/products/weekly-cleaning-service-text-325-665-8877-for-a-quote` -> `/services/weekly-services`
14. `/blogs/news/how-to-clean-cartridge-filters` -> `/blog/how-to-clean-cartridge-filters`
15. `/blogs/news/low-calcium-pool-corrosion-risk` -> `/blog/low-calcium-pool-corrosion-risk`
16. `/blogs/news/fiberglass-pool-maintenance-tips` -> `/blog/fiberglass-pool-maintenance-tips`
17. `/blogs/news/which-pool-cleaner-is-right` -> `/blog/which-pool-cleaner-is-right`
18. `/blogs/news/black-algae-the-pool-owners-nightmare` -> `/blog/black-algae-the-pool-owners-nightmare`
19. `/blogs/news/salt-pool-maintenance-checklist` -> `/blog/salt-pool-maintenance-checklist`

## Existing Alias Redirects (Must Still Pass)

1. `/services/weekly-bi-weekly-pool-service` -> `/services/weekly-services`
2. `/services/algae-removal-green-to-clean` -> `/services/algae-removal`
3. `/services/drain-refill` -> `/services/drain-and-refill`
4. `/services/pump-repair-installation` -> `/services/pump-repair-and-installation`

## Blocked / Not Implemented in This Step

1. `/pages/free-estimate-pool-skimmer-giveaway` (no destination approved)
2. wildcard `/pages/*` unknown URLs
3. wildcard `/products/*` unknown URLs
4. wildcard `/blogs/news/*` unknown slugs

## Verification Method

- Use response-header checks on deploy:
  - confirm `301` status on each ready source URL
  - confirm `Location` header exactly matches target URL
  - confirm final target returns `200`
