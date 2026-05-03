# Third-Party Script Audit (CWV 06)

Date: 2026-05-03  
Prompt: `prompts/cwv/06_third_party_script_audit.md`

## Scope and method

- Read-only audit of third-party scripts, embeds, trackers, and external widgets.
- Reviewed:
  - `src/app/layout.tsx`
  - `src/components/*`
  - `src/app/*`
  - `src/lib/analytics.ts`
  - `src/content/site.ts`

## Inventory and recommendations

| Third-party item | What it does | Where it loads | Required on every route? | Likely perf cost | Recommendation |
|---|---|---|---|---|---|
| `next/font/google` (`Sora`, `Fraunces`) | Fetches Google Fonts at runtime/build pipeline for typography | Global via `src/app/layout.tsx` | Yes (site typography) | Low to medium (font transfer + rendering) | **Retain** (already optimized with `display: "swap"` and reduced preload on display font) |
| `window.dataLayer` / `window.gtag` integration (if container exists) | Event dispatch to analytics stack (`phone_click`, `text_click`, `generate_lead`) | Global listener in `src/components/analytics-events.tsx` and form event in `src/components/contact-form.tsx` | Listener executes globally; usefulness mostly conversion routes | Low JS weight, low-to-medium runtime event overhead | **Conditional loading/defer**: keep tracking, but only mount listener when analytics container is present or on key conversion routes |
| Pool portal (`shipwreckedpools.mypoolportal.com`) | External customer payment/account portal | Linked from header/footer/CTAs across many routes, plus `/pay-now` redirect route | No for initial render; needed for payment flow only | Low direct JS cost on current site (navigation only), external page cost occurs after navigation | **Retain** links/redirect; **do not preload** or embed portal client-side |
| Social destinations (`facebook.com`, `tiktok.com`, `instagram.com`, Google review URL) | Outbound social/review navigation | Header/footer and review links | No | Low direct cost (anchor links only) | **Retain** as plain links; keep no-embed approach |
| Resend API (`resend`) | Server-side email delivery for contact submissions | `src/app/api/contact/route.ts` only (server runtime) | No client dependency | No client-side performance impact | **Retain** (server-only service dependency) |
| `schema.org` JSON-LD blocks | Structured data scripts (`LocalBusiness`, `Service`, `Article`) | In relevant server-rendered pages/components | Not needed for interactivity; needed for SEO | Very low JS execution cost (non-executable data blocks) | **Retain** |

## Explicit non-findings

- No Google Tag Manager bootstrap script snippet found in HTML/layout.
- No Facebook Pixel, TikTok Pixel, Hotjar, Clarity, Segment, Intercom, HubSpot, Stripe JS, YouTube/Vimeo embeds, or Calendly widget found.
- No third-party iframes found.

## Priority actions (no code changes in this step)

1. Keep all current third-party dependencies except consider route-conditional mounting for analytics click listener.
2. Avoid adding any new global tracker/embed without route-level justification.
3. If analytics container is introduced later, load it with explicit strategy (`afterInteractive` or stricter) and only where needed.
