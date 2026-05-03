# Schema and Canonical Validation

Date: 2026-05-03

## What Was Tightened

1. Canonical logic
- Added explicit canonical alternates for dynamic service routes: `/services/{slug}`
- Added explicit canonical alternates for dynamic location routes: `/locations/{slug}`
- Blog article routes already canonicalized to `/blog/{slug}` and remain in place

2. JSON-LD
- Homepage/global business identity (`LocalBusiness`) improved with:
  - stable `@id` (`/#organization`)
  - structured `areaServed`
  - `sameAs` social profile links
- Service detail pages now include `Service` JSON-LD aligned to visible page content
- Blog detail pages now include `Article` JSON-LD aligned to visible title/date/body content

3. Sitemap and robots
- Sitemap continues listing canonical new routes only (`/services/*`, `/locations/*`, `/blog/*`) and excludes legacy route families
- Robots rules continue to allow crawl/index only when `NEXT_PUBLIC_SITE_LIVE=true`

## How to Test

1. Canonical tags
- Open page source for:
  - `/services/weekly-services`
  - `/locations/south-abilene`
  - `/blog/how-to-clean-cartridge-filters`
- Confirm `<link rel="canonical">` matches the canonical route exactly

2. Structured data presence
- Validate with Google Rich Results Test or Schema Markup Validator:
  - Homepage: `LocalBusiness`
  - Service page: `Service`
  - Blog article page: `Article`

3. Sitemap and robots
- Verify `/sitemap.xml` includes only canonical route families
- Verify `/robots.txt` includes:
  - `allow: /` and sitemap URL when live
  - `disallow: /` when site-live flag is false
