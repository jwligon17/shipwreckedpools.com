# Shipwrecked Pools Website

Production-ready marketing site scaffold for Shipwrecked Pools using Next.js App Router, TypeScript, Tailwind CSS, and ESLint.

## Tech Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- ESLint

## Local Setup
1. Install dependencies:
```bash
npm install
```
2. Copy envs:
```bash
cp .env.example .env.local
```
3. Start local dev:
```bash
npm run dev
```
4. Production checks:
```bash
npm run lint
npm run build
```

## Content Editing
All business content is centralized in:
- `src/content/site.ts`

Edit this file to update:
- CTAs
- Services
- Locations
- Blog summaries
- Careers content
- Core brand copy

## App Routes
- `/`
- `/about`
- `/services`
- `/services/[slug]`
- `/locations`
- `/locations/[slug]`
- `/diy-pool-care`
- `/blog`
- `/careers`
- `/contact`
- `/pay-now`

## Staging Safety
- Default noindex until live:
  - `NEXT_PUBLIC_SITE_LIVE=false` keeps robots blocked.
  - Set `NEXT_PUBLIC_SITE_LIVE=true` when ready to allow indexing.
