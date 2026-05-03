# SEO 01 — Baseline audit

**Suggested skill:** `shipwrecked-issue-triage`  
**Suggested agent:** `seo_architect`

## Goal
Create a read-only baseline audit of the live site structure and repo implementation before any SEO edits.

## Scope
Read-only. No file edits. Focus on homepage, services hub, locations hub, contact page, blog index, core service pages, core location pages, and any legacy route overlap.

## Instructions to Codex

1. Read `AGENTS.md`, `docs/site_issue_map.md`, `docs/recommended_title_h1_meta.csv`, and `docs/internal_link_recommendations.csv`.
2. Inspect how the site is implemented and find the actual files/components for:
   - homepage
   - services hub
   - location hub
   - contact page
   - blog index
   - service templates
   - location templates
   - testimonial/review component
   - route/redirect config
3. Produce `docs/live_audit.md` with:
   - route inventory
   - templates/components involved
   - current title/H1 status
   - legacy/new overlap
   - broken or suspicious blog routes
   - testimonial duplication source
   - top 10 blockers by priority
4. Do not edit code.


## Done when

- `docs/live_audit.md` exists
- it names the exact files to touch for the next prompts
- it identifies the route/redirect layer


## Constraints

- no code changes
- no dependency changes
- no speculative stack assumptions; inspect first
