# CWV INP Responsiveness Changes

Date: 2026-05-03  
Prompt: `prompts/cwv/08_inp_responsiveness.md`

## Baseline reference reviewed

- `docs/js_bundle_audit.md`

## Targeted interaction areas and changes

1. Header menu/scroll interaction (`src/components/header.tsx`)
- Prior behavior: stored raw `scrollY` in React state, causing state updates and re-renders on every scroll event.
- Change:
  - switched to boolean nav-state tracking (`solid` vs `overlay`) only
  - updates are now threshold-based (`>160`) and only committed when state actually changes
  - wrapped scroll work in `requestAnimationFrame` gating to avoid redundant main-thread update bursts
- INP impact: less continuous React work during scroll and fewer unnecessary layout-tree updates tied to navigation state.

2. Reviews carousel handlers (`src/components/home-reviews-carousel-section.tsx`)
- Prior behavior: `onScroll` scheduled/cancelled RAF callbacks that did not perform useful work.
- Change:
  - removed no-op `onScroll` handler and related RAF bookkeeping
- INP impact: trims per-scroll main-thread overhead during carousel interaction.

3. Global analytics click listener attachment (`src/components/analytics-events.tsx`)
- Prior behavior: global capture listener attached immediately on hydration.
- Change:
  - defer listener attachment with a 0ms timer after initial effect execution
  - retain same click tracking behavior for `tel:` and `sms:` links
- INP impact: slightly reduces synchronous work pressure during immediate hydration/initial interaction window while preserving tracking.

## Safety checks

- Navigation behavior preserved (desktop and mobile menu).
- Quote form behavior unchanged.
- Analytics event logic preserved (`phone_click`, `text_click`, `generate_lead`).

## Files changed

- `src/components/header.tsx`
- `src/components/home-reviews-carousel-section.tsx`
- `src/components/analytics-events.tsx`
