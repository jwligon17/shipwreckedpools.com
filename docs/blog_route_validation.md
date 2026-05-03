# Blog Route Validation

Date: 2026-05-03

## New `/blog/*` Article Routes

1. `/blog/how-to-clean-cartridge-filters`
2. `/blog/low-calcium-pool-corrosion-risk`
3. `/blog/fiberglass-pool-maintenance-tips`
4. `/blog/which-pool-cleaner-is-right`
5. `/blog/black-algae-the-pool-owners-nightmare`
6. `/blog/salt-pool-maintenance-checklist`

Validate each route for:
- 200 response
- visible H1 matching article title
- visible published date
- article body content (not summary-only placeholder)
- canonical tag equals exact `/blog/{slug}`
- related service links point to canonical `/services/*` routes

## Blog Index Links

From `/blog`, verify every article card link resolves to its matching route above with no not-found behavior.

## Legacy Blog Redirects

Validate these 301 redirects:
- `/blogs/news/how-to-clean-cartridge-filters` -> `/blog/how-to-clean-cartridge-filters`
- `/blogs/news/low-calcium-pool-corrosion-risk` -> `/blog/low-calcium-pool-corrosion-risk`
- `/blogs/news/fiberglass-pool-maintenance-tips` -> `/blog/fiberglass-pool-maintenance-tips`
- `/blogs/news/which-pool-cleaner-is-right` -> `/blog/which-pool-cleaner-is-right`
- `/blogs/news/black-algae-the-pool-owners-nightmare` -> `/blog/black-algae-the-pool-owners-nightmare`
- `/blogs/news/salt-pool-maintenance-checklist` -> `/blog/salt-pool-maintenance-checklist`
