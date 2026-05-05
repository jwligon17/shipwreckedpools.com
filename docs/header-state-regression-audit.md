# Homepage Header State Regression Audit

Scope honored:
- Homepage route only (`/`)
- Header/top-of-hero behavior only
- Desktop and mobile only
- No code changes made

## 1) File/component that controls homepage header background state
- Primary controller: `src/components/header.tsx`
- Background mode is determined by:
  - `navIsSolid` state
  - class switch on the nav container: `solid-nav` vs `home-scroll-nav`
  - data attributes: `data-scroll-state`, `data-homepage`, `data-mobile-overlay-active`
- Visual styling for those classes is defined in `src/app/globals.css`.

## 2) File/component that controls the scroll-state transition
- Transition logic is in `src/components/header.tsx`:
  - initial compute and updates use `window.scrollY > 160`
  - `scroll` listener + `requestAnimationFrame` updates `navIsSolid`
- Transition visuals are in `src/app/globals.css`:
  - `.home-scroll-nav::before` = top gradient overlay layer
  - `.home-scroll-nav::after` = solid layer used during/after transition
  - `.solid-nav` = explicit solid navy state

## 3) Whether the solid/scrolled class is being applied by default
- It can be, depending on first render timing.
- In `src/components/header.tsx`, initial state is:
  - `useState(() => { if (typeof window === "undefined") return !usesOverlayNav; return !usesOverlayNav || window.scrollY > 160; })`
- If `usesOverlayNav` is false during initial evaluation (for example when pathname is unresolved/unknown), `navIsSolid` initializes to `true` and applies `solid-nav`.

## 4) Whether the scroll boolean/state is initialized incorrectly
- Yes, initialization is brittle for homepage intent.
- It is initialized from `!usesOverlayNav` rather than explicit homepage-at-top behavior, so first-paint can be incorrect even before scroll listener correction.

## 5) Whether the scroll threshold is too low or always triggered
- Threshold is `160px` and is not too low for this design intent.
- Runtime markup check at `/` shows initial `data-scroll-state="overlay"`, so threshold is not being universally/always triggered at page load.

## 6) Whether the mobile safe-area/top-strip fix was coupled to the main header container
- Partially coupled by container ownership, but logically separated in CSS layers.
- In `src/app/globals.css` mobile rules:
  - `header[data-header-stack="fixed"]::before` renders the safe-area strip (`height: env(safe-area-inset-top)` and solid navy).
  - Main nav background still comes from `.home-scroll-nav` / `.solid-nav` classes on the child nav container.
- So the safe-area strip is implemented on the header wrapper, but it does not need to force the main nav background to solid.

## 7) Which exact layer should remain solid
- Mobile safe-area strip: `header[data-header-stack="fixed"]::before` in `src/app/globals.css`
- Scrolled header state (desktop + mobile): `.solid-nav` in `src/app/globals.css`

## 8) Which exact layer should start transparent/gradient
- Homepage header overlay on desktop: `.home-scroll-nav` + `.home-scroll-nav::before` when `data-scroll-state="overlay"`
- Homepage header overlay on mobile: same `.home-scroll-nav` overlay layer when `data-scroll-state="overlay"` (while safe-area pseudo-strip remains solid independently)

## Exact files involved
- `src/components/header.tsx` (state ownership, threshold, class/data-state application)
- `src/app/globals.css` (overlay/solid visuals + mobile safe-area pseudo-strip)
- `src/app/layout.tsx` (mounts global `Header` on homepage and all routes)
- `src/components/hero.tsx` (hero sits under header and exposes top-of-hero overlap context)

## Root cause
The homepage header appears solid at load because the nav state initializer in `src/components/header.tsx` can default `navIsSolid` to `true` when `usesOverlayNav` is false during first render, and the current overlay gradient layer in `src/app/globals.css` is dark enough to read as a solid navy bar even when overlay state is active.
