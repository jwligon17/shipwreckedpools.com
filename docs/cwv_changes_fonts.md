# CWV Font Loading Changes

Date: 2026-05-03  
Prompt: `prompts/cwv/04_font_loading.md`

## Current font loading inspection

- Fonts are loaded through `next/font/google` in `src/app/layout.tsx`:
  - `Sora` mapped to `--font-sans` (body/UI)
  - `Fraunces` mapped to `--font-display` (headings/brand display)
- Typography assignment is centralized in `src/app/globals.css` and already uses fallback stacks.

## Changes implemented

1. Set explicit font display behavior to reduce render blocking risk:
- `display: "swap"` for both `Sora` and `Fraunces`.

2. Reduced eager preload overhead:
- Kept `preload: true` for primary sans/body font (`Sora`).
- Set `preload: false` for display/heading font (`Fraunces`) to avoid unnecessary early network pressure.

## Why this is scoped and safe

- Brand typography is preserved (same families, no wholesale swap).
- Only font-loading logic was changed; no copy/layout/component structure changes.
- Fallback stacks remain in place for stable rendering during font swap.
