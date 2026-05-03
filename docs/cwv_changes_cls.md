# CWV CLS Stability Changes

Date: 2026-05-03  
Prompt: `prompts/cwv/07_cls_stability.md`

## Baseline inputs reviewed

- `docs/cwv_baseline.md` (identified likely CLS pressure from dynamic content and route-level UI transitions).
- Priority components inspected: header, hero, reviews carousel, contact form.

## Root causes addressed

1. **Quote form dynamic validation/status content**
- Prior behavior: field errors and submit-status messages were conditionally inserted/removed, which can push neighboring content and create visible movement.
- Fix: reserved vertical space for:
  - per-field error lines
  - preferred contact method error line
  - submit status line
  - secondary guidance line
- Outcome: form layout remains stable when errors/success messages appear or clear.

2. **Viewport width shift from late scrollbar appearance**
- Added persistent vertical scrollbar reservation (`html { overflow-y: scroll; }`) in global CSS.
- Outcome: prevents horizontal layout jump on systems with non-overlay scrollbars when page height crosses the scroll threshold.

## Files changed

- `src/components/contact-form.tsx`
- `src/app/globals.css`

## Notes

- No route changes.
- No CTA flow changes.
- Header, hero, reviews, and quote form aesthetics preserved while improving visual stability behavior.
