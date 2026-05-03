# SEO 14 — Analytics event instrumentation

**Suggested skill:** `contact-page-conversion`  
**Suggested agent:** `seo_architect`

## Goal
Instrument the site so SEO work can be measured by actual leads and phone clicks.

## Scope
Analytics or tag-related files only.

## Instructions to Codex

1. Find the existing analytics implementation.
2. Add or validate events for:
   - quote form submission success (`generate_lead` if the stack supports it cleanly)
   - phone click
   - optional text click if trackable
3. Ensure events fire on canonical routes.
4. Add `docs/analytics_validation.md` with manual test steps.
5. If analytics is not wired in the repo, document the missing integration points instead of guessing.


## Done when

- lead and phone-click tracking are implemented or clearly documented
- validation steps exist


## Constraints

- do not add a new analytics platform
- do not break existing measurement
