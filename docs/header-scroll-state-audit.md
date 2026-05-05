# Homepage Header Scroll-State Audit (Desktop + Mobile)

Scope honored:
- Homepage route only (`/`)
- Header/top-hero relationship only
- Desktop and mobile behavior only
- No code changes implemented

## 1) File/component controlling homepage header background state
- Controller component: `src/components/header.tsx`
- The main nav background mode is controlled by:
  - `navIsSolid` state (`useState`)
  - `data-scroll-state` attribute (`solid` vs `overlay`)
  - class switch: `solid-nav` vs `home-scroll-nav`
- Visual definitions for those classes live in `src/app/globals.css`:
  - `.home-scroll-nav` (transparent base + gradient pseudo-layer)
  - `.solid-nav` (solid navy)

## 2) File/component controlling transparent/gradient -> solid scroll transition
- JS state transition logic is in `src/components/header.tsx`:
  - Threshold: `window.scrollY > 160`
  - Scroll listener updates `navIsSolid`
- CSS transition layers are in `src/app/globals.css`:
  - `.home-scroll-nav::before` = gradient overlay layer
  - `.home-scroll-nav::after` = solid navy layer (fades in with scroll-timeline where supported)
  - `.solid-nav` = forced solid navy state

## 3) Whether header is loading with "scrolled"/solid class by default
- Desktop: not expected to stay solid on homepage at top; JS resolves to overlay when pathname is `/` and `scrollY <= 160`.
- Mobile: yes, it is effectively forced solid on first paint for homepage overlay state by CSS overrides (see section 4), regardless of JS overlay class.
- Also, `header.tsx` initializes `navIsSolid` with `useState(!usesOverlayNav)`, which can briefly default to solid before route resolution in some client-render timing paths.

## 4) Whether recent safe-area/top-strip fix unintentionally forced header itself to always be solid
Yes.

In `src/app/globals.css` under `@media (max-width: 767px)`:
- `header[data-header-stack="fixed"] { background: var(--color-navy); }`
- `.home-scroll-nav[data-homepage="true"][data-scroll-state="overlay"] { background: var(--color-navy) !important; }`
- `.home-scroll-nav[data-homepage="true"][data-scroll-state="overlay"]::before { background: var(--color-navy); }`

These rules override the transparent/gradient overlay behavior for the homepage on mobile and make the header/nav region render navy even in the intended overlay state.

## 5) Exact layer ownership
- Mobile top safe-area/status-bar strip:
  - `src/app/globals.css`
  - `header[data-header-stack="fixed"]` (mobile media query) via `padding-top: env(safe-area-inset-top)` and `background: var(--color-navy)`
- Actual header/nav overlay layer:
  - Structure/state: `src/components/header.tsx` (`navIsSolid`, `data-scroll-state`, `solid-nav`/`home-scroll-nav`)
  - Visual overlay/solid layers: `src/app/globals.css` (`.home-scroll-nav`, `::before`, `::after`, `.solid-nav`)

## 6) Minimal fix needed (do not implement yet)
1. Keep the mobile safe-area strip navy by preserving the mobile `header[data-header-stack="fixed"]` safe-area treatment.
2. Remove/relax only the mobile CSS rules that force `.home-scroll-nav[data-homepage="true"][data-scroll-state="overlay"]` to navy (including its `::before` override).
3. Keep existing JS scroll threshold (`> 160`) in `header.tsx` so both desktop and mobile still transition to `solid-nav` on scroll.
4. Optionally tighten initial `navIsSolid` initialization in `header.tsx` to avoid brief solid-first paint from unresolved route state.

Result target:
- Desktop homepage: transparent/gradient over hero at top, solid navy on scroll.
- Mobile homepage: transparent/gradient over hero at top, solid navy on scroll.
- Mobile safe-area/status-bar strip: remains current navy.

## Root cause summary
- Primary root cause: mobile-specific CSS overrides in `src/app/globals.css` forced the homepage overlay state to navy, collapsing transparent/gradient behavior into always-solid.
- Secondary contributing factor: `navIsSolid` initial state in `src/components/header.tsx` can start solid before route/state settles, but the persistent mobile issue is the CSS force-to-navy override.
