# Mobile Menu Standardization Audit

## Scope checked
- Mobile-only header/menu behavior (`<768px`) on homepage vs non-home routes.
- Focused only on: header, menu drawer/panel, utility-strip content, social icon placement, bottom sticky CTA.
- No code behavior changes made.

## Findings

### 1) File/component powering homepage mobile menu
- Homepage mobile menu is powered by the shared [`Header`](/Users/ligon/ShipwreckedPools.com/src/components/header.tsx) component.
- The homepage-specific mobile experience is controlled by `isHomePage` checks in:
  - [`src/components/header.tsx:104`](/Users/ligon/ShipwreckedPools.com/src/components/header.tsx:104) (`const isHomePage = resolvedPathname === "/";`)
  - [`src/components/header.tsx:332`](/Users/ligon/ShipwreckedPools.com/src/components/header.tsx:332) (homepage-only extra mobile panel block)

### 2) File/component powering non-home mobile menu/header
- Non-home mobile menu/header is also powered by the same shared [`Header`](/Users/ligon/ShipwreckedPools.com/src/components/header.tsx).
- Non-home mobile bottom sticky CTA is powered by [`MobileStickyCta`](/Users/ligon/ShipwreckedPools.com/src/components/mobile-sticky-cta.tsx), mounted globally in [`src/app/layout.tsx:82`](/Users/ligon/ShipwreckedPools.com/src/app/layout.tsx:82).

### 3) What non-home pages are using
- Non-home pages are **not** using a separate older mobile menu component.
- Non-home pages are **not** using route-level header variants (there is only one app layout: [`src/app/layout.tsx`](/Users/ligon/ShipwreckedPools.com/src/app/layout.tsx)).
- Non-home pages are using a **shared header with route-specific conditional rendering**:
  - Homepage-only menu extras (utility text, inline call/text row, social icons, 3-button CTA stack inside drawer) render only when `isHomePage` is true: [`src/components/header.tsx:332`](/Users/ligon/ShipwreckedPools.com/src/components/header.tsx:332).
  - Utility top strip is hidden on homepage mobile but shown elsewhere because of `isHomePage && "hidden md:block"`: [`src/components/header.tsx:167`](/Users/ligon/ShipwreckedPools.com/src/components/header.tsx:167).

### 4) File ownership by behavior

#### Menu drawer/panel
- Drawer open/close state and toggle button: [`src/components/header.tsx:101`](/Users/ligon/ShipwreckedPools.com/src/components/header.tsx:101), [`src/components/header.tsx:287`](/Users/ligon/ShipwreckedPools.com/src/components/header.tsx:287).
- Drawer container and links (`id="mobile-menu"`): [`src/components/header.tsx:305`](/Users/ligon/ShipwreckedPools.com/src/components/header.tsx:305).

#### Utility strip content
- Utility strip content (message + call/text + desktop social): [`src/components/header.tsx:166`](/Users/ligon/ShipwreckedPools.com/src/components/header.tsx:166).
- Utility strip hide/show route condition on homepage mobile: [`src/components/header.tsx:167`](/Users/ligon/ShipwreckedPools.com/src/components/header.tsx:167).

#### Social icons placement
- Social icon source list: [`src/components/header.tsx:106`](/Users/ligon/ShipwreckedPools.com/src/components/header.tsx:106).
- Desktop utility-strip social placement (`md:flex`): [`src/components/header.tsx:174`](/Users/ligon/ShipwreckedPools.com/src/components/header.tsx:174).
- Homepage mobile drawer social placement (inside homepage-only block): [`src/components/header.tsx:355`](/Users/ligon/ShipwreckedPools.com/src/components/header.tsx:355).

#### Bottom sticky CTA bar
- Component and route condition (`pathname === "/"` returns `null`): [`src/components/mobile-sticky-cta.tsx:11`](/Users/ligon/ShipwreckedPools.com/src/components/mobile-sticky-cta.tsx:11).
- Global mount point for all routes: [`src/app/layout.tsx:82`](/Users/ligon/ShipwreckedPools.com/src/app/layout.tsx:82).

## Why homepage and non-home mobile look different
- They differ because the shared `Header` renders key mobile drawer sections only under `isHomePage`, while non-home routes rely on the base drawer plus a separate global `MobileStickyCta` bar.

## Smallest safe standardization path (no implementation yet)
1. Keep one shared `Header` and remove route-only mobile branching by extracting the homepage drawer extras into a reusable mobile drawer section rendered for all routes.
2. Decide a single mobile CTA strategy to avoid duplication:
   - either keep CTA actions inside the drawer for all routes and retire/limit `MobileStickyCta`, or
   - keep `MobileStickyCta` global and remove duplicated drawer CTA stack.
3. Keep all changes mobile-scoped (`md:hidden`/`lg:hidden` regions only) so desktop/tablet rendering remains untouched.
4. Do not touch route structure/layout hierarchy; only adjust conditional rendering in [`header.tsx`](/Users/ligon/ShipwreckedPools.com/src/components/header.tsx) and, if needed, homepage gate logic in [`mobile-sticky-cta.tsx`](/Users/ligon/ShipwreckedPools.com/src/components/mobile-sticky-cta.tsx).

## Additional note
- There is an older-looking [`SiteHeader`](/Users/ligon/ShipwreckedPools.com/src/components/site-header.tsx) component in the repo, but it is currently unused (no imports/usages found), so it is not driving the live homepage/non-home difference.
