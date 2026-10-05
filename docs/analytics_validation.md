# Analytics Event Validation

Date: 2026-10-05

## Implemented Events

1. `service_cta_click`
- Trigger: click on an explicitly annotated internal service CTA
- Source: delegated click listener in `src/components/analytics-events.tsx`
- Payload:
  - `service`
  - `destination`
  - `source_path`
  - `cta_placement`
  - `cta_text`

2. `contact_form_start`
- Trigger: the first change to a visible contact-form control (not page load, submit, reset, or honeypot interaction)
- Source: `src/components/contact-form.tsx`
- Payload:
  - `form_name: "contact_quote"`
  - `first_field`
  - `page_path`

3. `generate_lead`
- Trigger: contact endpoint response is HTTP-successful and explicitly returns `ok: true`, `accepted: true`, and is neither a test response nor an idempotent replay
- Source: `src/components/contact-form.tsx`
- Payload:
  - `form_name: "contact_quote"`
  - `contact_method`
  - `page_path`

4. `phone_click`
- Trigger: click on any `tel:` link
- Source: delegated click listener in `src/components/analytics-events.tsx`
- Payload:
  - `link_url`
  - `page_path`

5. `text_click`
- Trigger: click on any `sms:` link
- Source: delegated click listener in `src/components/analytics-events.tsx`
- Payload:
  - `link_url`
  - `page_path`

## Current Integration Behavior

- Events are sent to `window.dataLayer` when present.
- Events are sent through `window.gtag("event", ...)` when present.
- No new analytics platform was added by this change.

## Missing Integration Points (If No Events Appear)

If your environment does not load an analytics container or GA snippet, events will not reach a reporting tool. Confirm:

1. A tag manager/analytics script initializes `window.dataLayer` and/or `window.gtag`.
2. Container/property mapping exists for:
   - `service_cta_click`
   - `contact_form_start`
   - `generate_lead`
   - `phone_click`
   - `text_click`
3. Event parameters are mapped in your analytics UI where needed.

## Manual Test Steps

1. Open site with browser devtools console.
2. Submit the contact form successfully on `/contact`.
3. Click a phone link (`tel:`) from header or CTA.
4. Click a text link (`sms:`) from header or CTA.
5. Confirm events in:
   - GTM preview / debug view, or
   - GA4 DebugView / realtime, depending on your stack.
