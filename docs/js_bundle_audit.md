# JS Bundle Audit (CWV 05)

Date: 2026-05-03  
Prompt: `prompts/cwv/05_js_bundle_audit.md`

## Method

- Reviewed build artifacts:
  - `.next/diagnostics/route-bundle-stats.json`
  - `.next/server/app/*_client-reference-manifest.js` for `/`, `/services`, `/contact`
  - `.next/build-manifest.json`
- Reviewed major client components and interaction logic in source:
  - `src/components/header.tsx`
  - `src/components/home-reviews-carousel-section.tsx`
  - `src/components/contact-form.tsx`
  - `src/components/analytics-events.tsx`

## Route-level first-load JS (uncompressed)

From `.next/diagnostics/route-bundle-stats.json`:
- `/`: `643,432` bytes
- `/services`: `643,432` bytes
- `/contact`: `642,154` bytes

Observation: first-load JS is nearly flat across these routes, indicating shared client/runtime cost dominates over route-specific code.

## Heavy components and where they land

1. Global header client island (all key routes)
- File: `src/components/header.tsx` (`"use client"`, ~287 lines)
- Included via layout and present on `/`, `/services`, `/contact`.
- Contains:
  - scroll listener (`scroll` -> `setState`) for nav mode switching
  - mobile menu state and active-route logic
  - multiple inline SVG social icons
  - `next/image` logo handling in client component

2. Reviews carousel client island (homepage and services hub)
- File: `src/components/home-reviews-carousel-section.tsx` (`"use client"`, ~294 lines)
- Included on both `/` and `/services`.
- Contains:
  - pointer event drag logic (down/move/up/cancel/click capture)
  - RAF scheduling on scroll
  - horizontally scrolling card UI with interactive affordances
- In manifests, this maps to route-specific chunk inclusion for `/` and `/services`.

3. Contact form client island (contact page)
- File: `src/components/contact-form.tsx` (`"use client"`, ~253 lines)
- Included on `/contact` only.
- Contains:
  - controlled inputs + client validation
  - async submit lifecycle state
  - client-side analytics event call after success
- This appears as a route-specific contact chunk in `/contact` manifest.

4. Global analytics click tracker (all key routes)
- File: `src/components/analytics-events.tsx` (`"use client"`, ~46 lines)
- Included in root layout; attaches capture-phase document click listener on every route.
- Small module size, but global hydration + event wiring overhead exists.

## Likely long-task sources

1. Header re-render pressure during scroll
- Continuous state updates from `scroll` listener can trigger frequent reconciliation on pages with heavy paint/compositing.

2. Reviews carousel pointer/scroll interaction handlers
- Multiple pointer handlers and per-scroll RAF scheduling can increase main-thread work during drag/scroll interaction windows.

3. Contact form controlled-field updates
- Every keystroke updates React state in a relatively large component tree; usually moderate but can contribute on low-end devices.

4. Shared framework/runtime baseline
- All target routes share most chunk paths and similar first-load bytes, so framework/runtime + global client islands are primary baseline cost.

## Hydration-heavy areas

1. Layout-level client hydration
- `Header` and `AnalyticsEvents` hydrate on every page.

2. Homepage and services hub interactive reviews block
- `HomeReviewsCarouselSection` adds a larger client boundary on two key traffic routes.

3. Contact page interactive form block
- `ContactForm` is required for conversion but remains the page’s largest route-specific client island.

## Recommended reductions (no code changes applied in this step)

1. Reduce global header client work
- Move purely presentational icon markup/static nav pieces into server components where feasible.
- Replace per-scroll state updates with CSS-first behavior or throttled/observer-based mode switching.

2. Trim reviews carousel JS on non-critical viewports
- Consider progressive enhancement:
  - server-render static review cards first
  - enable drag interactions only when needed (pointer-capable desktop, post-idle).
- Evaluate whether RAF scheduling in `onScroll` is currently necessary.

3. Scope global analytics listener
- Keep event tracking, but consider attaching listeners only to elements that need tracking instead of document-wide capture if measurement goals allow.

4. Simplify contact form hydration cost
- Preserve UX, but reduce controlled-state overhead where safe (e.g., blur-time validation, reduced live recomputation paths).

5. Validate by chunk-diffing after each CWV optimization
- Re-check `.next/diagnostics/route-bundle-stats.json` and route manifests after each subsequent prompt to confirm real byte/hydration impact.
