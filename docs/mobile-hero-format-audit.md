# Mobile Homepage Hero Format Audit

Scope: Homepage hero only (`/`), mobile formatting behavior only, no code changes.

## Primary controlling files

1. `src/components/hero.tsx`
- Controls the homepage hero markup and most mobile formatting classes.
- Mobile hero container spacing:
  - Hero section min height: line 17 (`min-h-[calc(100svh-var(--utility-bar-height))]`)
  - Content container vertical spacing: line 44 (`pb-14 pt-[calc(var(--header-stack-height)+1.25rem)]`)
  - Inner content vertical offset: line 45 (`translate-y-4`)
- Mobile review strip:
  - Review strip anchor block and spacing: lines 46-84
  - Mobile wrap behavior: line 51 (`flex-wrap`, `gap-x-2`, `gap-y-1`)
  - Mobile review text sizes/icons: lines 51, 53, 59, 81
- Mobile H1 size/line-height/wrapping:
  - H1 class: line 85
  - Mobile size and line-height: `text-[clamp(2rem,5.2vw,4.25rem)]`, `leading-[0.9]`
  - Mobile wrapping width constraint: `max-w-[23ch]`
  - `lg:block lg:whitespace-nowrap` on spans (lines 86-88) only affects large screens; mobile remains naturally wrapping inline text.
- Mobile supporting paragraph spacing:
  - Supporting paragraph: line 90 (`mt-2.5`, `text-[0.9rem]`, `leading-relaxed`)
- Stacked CTA button spacing:
  - CTA group: line 92 (`mt-3 flex flex-col ... gap-3`)
  - Buttons are full width on mobile (`w-full` on lines 95 and 101) and stack until `sm`.

2. `src/components/header.tsx`
- Controls the round "Menu" button visibility breakpoint.
- Menu button appears below `lg` due to line 273 (`lg:hidden`).
- Desktop nav/CTA groups become visible at `lg` (`lg:flex` on lines 212, 256).
- Net behavior: mobile/tablet navigation uses Menu button for widths `< lg`; hidden at `lg` and above.

3. `src/app/globals.css`
- Controls CSS variables used by hero spacing math and shared container padding.
- Header-stack variables feeding hero top spacing:
  - Mobile defaults: lines 7-9 (`--utility-bar-height`, `--main-nav-height`, `--header-stack-height`)
  - `md` override at line 31 (`min-width: 768px`) updates nav heights.
- `.container-page` horizontal mobile padding: lines 79-80 (`px-4`, then `md:px-7`).

## Breakpoint logic found

- Tailwind breakpoints in use for this hero/header behavior:
  - Base (mobile-first): default classes apply to all widths unless overridden.
  - `sm` (>= 640px): hero CTA row switch (`sm:flex-row`) and button width change (`sm:w-auto`) in `hero.tsx` line 92+.
  - `md` (>= 768px): utility/nav height variables change in `globals.css` lines 31-35; hero spacing/type has `md:` adjustments.
  - `lg` (>= 1024px): round Menu button hidden (`lg:hidden`) in `header.tsx` line 273; desktop nav/CTA shown with `lg:flex`.

## Safest mobile-only implementation plan (no code changes applied)

1. Edit only `src/components/hero.tsx` first.
- Tweak base (unprefixed) classes for the five requested hero format targets:
  - container spacing
  - H1 size/line-height/wrapping width
  - review strip spacing/wrap density
  - supporting paragraph top spacing
  - stacked CTA spacing
- Keep existing `sm:`, `md:`, `lg:` classes intact unless a direct conflict forces a tiny adjustment.

2. If needed for header-overlap balance, make minimal variable-only adjustment in `src/app/globals.css`.
- Prefer not to change this unless hero top spacing cannot be corrected cleanly within `hero.tsx`.
- If touched, change only mobile base `--utility-bar-height` / `--main-nav-height` values, leave `md` and above unchanged.

3. Do not alter `src/components/header.tsx` unless the task explicitly asks to change the menu breakpoint.
- Current menu appearance breakpoint is clear and stable (`< lg`).

4. Validate with quick visual checks at representative widths.
- 375px, 390px, 430px (mobile)
- 640px (sm crossover)
- 768px (md crossover)
- 1024px (lg menu handoff)

5. Keep scope tight.
- No copy changes.
- No route/component restructuring.
- No global redesign.
