# Live Site Baseline Audit

Date: 2026-05-03
Scope: Read-only implementation audit before SEO edits.

## 1) Route Inventory

### Core routes (implemented)
- `/` -> `src/app/page.tsx`
- `/services` -> `src/app/services/page.tsx`
- `/services/[slug]` -> `src/app/services/[slug]/page.tsx`
- `/locations` -> `src/app/locations/page.tsx`
- `/locations/[slug]` -> `src/app/locations/[slug]/page.tsx`
- `/contact` -> `src/app/contact/page.tsx`
- `/blog` -> `src/app/blog/page.tsx`
- `/blog/[slug]` -> `src/app/blog/[slug]/page.tsx`

### Additional indexed/static routes
- `/about` -> `src/app/about/page.tsx`
- `/careers` -> `src/app/careers/page.tsx`
- `/diy-pool-care` -> `src/app/diy-pool-care/page.tsx`
- `/pay-now` -> `src/app/pay-now/page.tsx`
- `/pages/free-estimate-pool-skimmer-giveaway` -> `src/app/pages/free-estimate-pool-skimmer-giveaway/page.tsx`

### Route generation sources
- Service slugs: `src/content/site.ts` (`site.services`) + `generateStaticParams()` in `src/app/services/[slug]/page.tsx`
- Location slugs: `src/content/site.ts` (`site.locations`) + `generateStaticParams()` in `src/app/locations/[slug]/page.tsx`
- Blog slugs: `src/content/site.ts` (`site.blogSummaries`) + `generateStaticParams()` in `src/app/blog/[slug]/page.tsx`

## 2) Files/Components by Requested Area

### Homepage
- Page: `src/app/page.tsx`
- Hero/UI: `src/components/hero.tsx`
- Reviews section: `src/components/home-reviews-carousel-section.tsx`
- Home service grid: `src/components/home-pool-care-services-section.tsx`

### Services hub + service templates
- Hub: `src/app/services/page.tsx`
- Template: `src/app/services/[slug]/page.tsx`
- Data model/content: `src/content/site.ts` (service objects, process, FAQs, related services, proof)

### Locations hub + location templates
- Hub: `src/app/locations/page.tsx`
- Template: `src/app/locations/[slug]/page.tsx`
- Data model/content: `src/content/site.ts` (location objects, FAQs, nearby locations)

### Contact
- Page: `src/app/contact/page.tsx`
- Form: `src/components/contact-form.tsx`
- API route: `src/app/api/contact/route.ts`

### Blog index + blog detail
- Index: `src/app/blog/page.tsx`
- Detail template: `src/app/blog/[slug]/page.tsx`
- Content source: `src/content/site.ts` (`site.blogSummaries`)

### Testimonial / review component
- Shared review carousel component: `src/components/home-reviews-carousel-section.tsx`
- Review content source: `src/content/site.ts` (`site.reviewsData`)
- Reused in:
  - `src/app/page.tsx`
  - `src/app/services/page.tsx`
  - `src/app/services/[slug]/page.tsx`
  - `src/app/about/page.tsx`
  - `src/app/locations/[slug]/page.tsx`

### Route/redirect/canonical/sitemap layers
- Redirect config: `next.config.ts` (`redirects()` array)
- Root canonical defaults/metadata: `src/app/layout.tsx`
- Sitemap generation: `src/app/sitemap.ts`
- Robots: `src/app/robots.ts`

## 3) Current Title / H1 Status (High-Value Pages)

### Homepage `/`
- Title: `Pool Service in Abilene, TX` (from `src/app/page.tsx` metadata)
- H1: rendered inside `Hero` component (brand-forward per issue map)
- Status: needs keyword-first title/H1 alignment with recommendations.

### Services hub `/services`
- Title: `Pool Services in Abilene, TX` (from `src/app/services/page.tsx`)
- H1 content comes from `site.servicesPage.hero.titleLines` in `src/content/site.ts`
- Status: H1 likely copy-forward per issue map; needs explicit intent wording.

### Service detail `/services/*`
- Title pattern: `${service.name} in Abilene, TX` (template metadata)
- H1: `service.name` (generic short labels on many pages)
- Status: broad structure is consistent; intent-specific H1s/titles need tightening.

### Locations hub `/locations`
- Title: `Service Areas` (not keyword/local-intent explicit)
- H1: `Your Pool is our Pool` (brand-forward)
- Status: local-intent alignment needed.

### Location detail `/locations/*`
- Title pattern: `Pool Service in ${location.name} | Shipwrecked Pools`
- H1 pattern: `Pool Service in ${location.name}`
- Status: base pattern is stronger than hubs, but pages are structurally similar.

### Contact `/contact`
- Title: `Contact Shipwrecked Pools`
- H1: `Contact Us`
- Status: conversion-intent wording can be improved.

### Blog index `/blog`
- Title: `Pool Care Blog`
- H1: `Pool Care Blog`
- Status: route itself exists and is indexable; internal article behavior still needs verification.

## 4) Legacy vs New Overlap

Known/mentioned legacy paths:
- `/pages/*`
- `/products/*`
- `/blogs/news/*`

Current redirect layer only includes 4 service alias redirects in `next.config.ts`:
- `/services/weekly-bi-weekly-pool-service` -> `/services/weekly-services`
- `/services/algae-removal-green-to-clean` -> `/services/algae-removal`
- `/services/drain-refill` -> `/services/drain-and-refill`
- `/services/pump-repair-installation` -> `/services/pump-repair-and-installation`

Gap:
- No broad legacy mapping for `/pages/*`, `/products/*`, or `/blogs/news/*`.
- Legacy and new URL ecosystems can remain split without additional redirect coverage.

## 5) Blog Route Integrity Findings

- Blog index uses links to `/blog/${slug}` from `site.blogSummaries`.
- Dynamic route exists at `src/app/blog/[slug]/page.tsx` with static params from the same source.
- Template includes explicit not-found metadata string `Blog Post Not Found`.
- Legacy `/blogs/news/*` namespace has no redirect mapping in `next.config.ts`.

Suspicious/broken risk sources:
- Missing legacy redirect map for `/blogs/news/*`.
- “Summary-only staging content” note on each blog detail page indicates content readiness risk for production quality and intent matching.

## 6) Testimonial Duplication Source

Primary duplication source:
- Single shared component `HomeReviewsCarouselSection` reused across homepage, services hub, multiple service pages, about page, and location detail pages.
- Same review pool (`site.reviewsData.reviews`) rendered repeatedly with minimal contextual variation.

## 7) Top 10 Blockers (Prioritized)

1. Missing redirect strategy for legacy namespaces (`/pages/*`, `/products/*`, `/blogs/news/*`) in `next.config.ts`.
2. Blog legacy route migration gap (`/blogs/news/*` -> canonical `/blog/*`) can strand historical links.
3. Homepage title/H1 not fully keyword-first for “pool cleaning / pool service in Abilene”.
4. Services hub H1 copy-forward structure can weaken direct service intent matching.
5. Service detail H1/title patterns rely heavily on short labels from `service.name`.
6. Locations hub title/H1 currently brand-forward and not explicit local search intent.
7. Contact page headline and metadata are generic vs quote-intent phrasing.
8. Contact form still exposes staging text: `This form is staging-safe.` (`src/components/contact-form.tsx`).
9. Testimonial/review carousel is duplicated across multiple core money/support pages.
10. Canonical/sitemap/metadata consistency should be revalidated after redirect/canonical-route consolidation.

## 8) Exact Files Likely Needed for Next Prompt Packs

- Redirect/canonical/route controls:
  - `next.config.ts`
  - `src/app/layout.tsx`
  - `src/app/sitemap.ts`
  - `src/app/robots.ts`
- Core page metadata/H1:
  - `src/app/page.tsx`
  - `src/app/services/page.tsx`
  - `src/app/services/[slug]/page.tsx`
  - `src/app/locations/page.tsx`
  - `src/app/locations/[slug]/page.tsx`
  - `src/app/contact/page.tsx`
  - `src/app/blog/page.tsx`
  - `src/app/blog/[slug]/page.tsx`
- Shared content and components:
  - `src/content/site.ts`
  - `src/components/home-reviews-carousel-section.tsx`
  - `src/components/contact-form.tsx`
