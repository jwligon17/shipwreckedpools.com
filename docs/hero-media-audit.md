# Homepage Hero Media Audit

## Scope
Inspected only homepage hero implementation and directly related media references.

## Files controlling the behavior
- `src/components/hero.tsx`
- `tailwind.config.ts` (to confirm the `md` breakpoint definition is default Tailwind, i.e. `min-width: 768px`, since no custom `screens` override exists)

## Exact condition that swaps video to image
In `src/components/hero.tsx`, the hero always renders a static background image layer, then conditionally exposes the video using CSS utility classes on the `<video>` element:

- `<video className="... hidden ... md:block motion-reduce:hidden" ...>`

This causes:
- `hidden`: video is hidden by default at all widths.
- `md:block`: video becomes visible only at `md` and up (Tailwind `md` = `min-width: 768px`).
- `motion-reduce:hidden`: if the user has reduced motion enabled, video is hidden even on `md+`.

So the swap is CSS-driven, not React conditional rendering.

## Which image asset shows on smaller screens
`/images/proof-pool-comparison-2.png`

It is applied to an always-visible full-bleed background div:
- `style={{ backgroundImage: `url(${heroPosterSrc})` }}`
- `heroPosterSrc` is set to `/images/proof-pool-comparison-2.png` in `src/components/hero.tsx`.

## Reduced-motion involvement
Yes. Reduced motion is directly involved through `motion-reduce:hidden` on the video element.

Result:
- On devices/users with `prefers-reduced-motion: reduce`, video is hidden regardless of viewport size.

## JS viewport detection or runtime mobile fallback logic
None found in homepage hero path.

- No `window.innerWidth`, `matchMedia`, `useEffect` viewport checks, or JS branching for mobile media selection in `src/components/hero.tsx`.
- Fallback behavior is purely CSS class driven.

## Safest way to keep video visible on smaller screens without breaking accessibility
If you want video on smaller screens while preserving accessibility, the safest change is:
- Remove the `hidden md:block` visibility gating from the hero video so it can render at all breakpoints.
- Keep `motion-reduce:hidden` (or equivalent reduced-motion handling) so users who request reduced motion still get the static image.
- Keep existing `muted`, `playsInline`, and `aria-hidden` behavior to avoid autoplay/accessibility regressions.

This preserves reduced-motion compliance while enabling small-screen video.
