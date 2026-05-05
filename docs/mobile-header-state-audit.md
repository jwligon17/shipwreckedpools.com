# Mobile Homepage Header State Audit

Scope honored:
- Homepage route only (`/`)
- Mobile behavior only at the breakpoint where the round `Menu` button is shown (`< lg`, with mobile-specific issue at `< md`)
- Header/safe-area/hero-top relationship only
- No code changes implemented

## 1) File/component controlling mobile header background state
- Primary controller: `src/components/header.tsx`
- State and class switch:
  - `usesOverlayNav` route mode: lines 106, 88-99
  - `navIsSolid` state: line 107
  - scroll threshold logic (`window.scrollY > 160`): lines 113 and 126
  - applied class (`solid-nav` vs `home-scroll-nav`): lines 199-202
- CSS definitions for those classes are in `src/app/globals.css`:
  - `.home-scroll-nav`: lines 215-249
  - `.solid-nav`: lines 251-254
  - mobile overlay tuning: lines 256-279

## 2) File/component controlling mobile header positioning
- Fixed positioning is set in `src/components/header.tsx`:
  - `<header className="fixed inset-x-0 top-0 z-[70]">`: lines 151-154
- Hero/header overlap spacing comes from `src/components/hero.tsx` and CSS vars in `src/app/globals.css`:
  - hero section min-height uses `--header-stack-height`: `hero.tsx` line 22
  - hero media layer top shift includes safe area and utility-bar height: `hero.tsx` line 24
  - hero content top padding includes `--header-stack-height` + safe area: `hero.tsx` line 69
  - root vars: `--utility-bar-height`, `--main-nav-height`, `--header-stack-height`: `globals.css` lines 7-9

## 3) Whether header loads with solid background class by default
Yes, it can.

Evidence:
- `isDesignedPublicRoute(pathname)` returns `false` when `pathname` is falsy: `header.tsx` lines 88-90.
- `navIsSolid` initial state is `useState(!usesOverlayNav)`: line 107.
- If initial `pathname` is not yet resolved in the client render cycle, `usesOverlayNav` is `false`, so `navIsSolid` starts `true`.
- When `navIsSolid` is `true`, `solid-nav` is applied: lines 199-202, which is a solid navy block (`globals.css` lines 251-254).

## 4) Whether scroll state is being initialized incorrectly
Yes, initial state is the issue.

- Scroll logic itself (threshold `> 160`) is consistent after mount: lines 111-117 and 119-144.
- The incorrect visual at load is from initial state derivation tied to `usesOverlayNav` before route truth is guaranteed (falsy-path fallback to non-overlay), not from the scroll listener math.

## 5) Whether safe-area wrapper or hero top offset is forcing the solid navy block
No direct forcing of solid state was found.

What these do:
- `hero.tsx` line 24 extends hero media upward behind the header/safe-area region.
- `hero.tsx` line 69 adds top padding for header stack + safe area so text clears the fixed header.
- `globals.css` lines 256-279 only tune overlay gradients for mobile when `home-scroll-nav` + `data-scroll-state="overlay"` are active.

Conclusion:
- Safe-area/hero offsets affect overlap geometry, not whether header becomes solid.
- Solid navy at load is caused by header state/class selection (`solid-nav`), not by hero spacing.

## 6) Exact minimal fix required (do not implement yet)
Minimal, targeted fix in `src/components/header.tsx` only:

1. Initialize `navIsSolid` from explicit homepage + scroll intent, not `!usesOverlayNav` fallback.
2. Treat unresolved `pathname` as overlay-friendly for the homepage route path so the initial paint does not default to solid.
3. Keep existing scroll threshold behavior (`> 160`) unchanged.

Concrete change shape:
- Adjust initial state logic at line 107 so homepage/mobile can start in overlay/transparent mode at `scrollY === 0`.
- Optionally make `isDesignedPublicRoute` return `true` for unresolved path only during initial render path handling (or derive initial state from `isHomePage` guard once pathname is known).
- No changes needed in `hero.tsx` or `globals.css` for the root issue.

Expected outcome after fix:
- At page load on mobile homepage: header renders as transparent/gradient over hero (`home-scroll-nav`, overlay state).
- After scroll past threshold: header switches to solid navy (`solid-nav`).
