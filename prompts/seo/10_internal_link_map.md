# SEO 10 — Internal-link implementation

**Suggested skill:** `internal-link-cluster`  
**Suggested agent:** `seo_architect`

## Goal
Implement the priority internal-link recommendations across homepage, services, locations, and blog pages.

## Scope
Only touch content/components needed for internal links.

## Instructions to Codex

1. Read `docs/internal_link_recommendations.csv`.
2. Implement the highest-value links first:
   - homepage -> services money pages
   - service pages -> sibling services + top locations
   - location pages -> top services
   - blog articles -> most relevant service pages
3. Prefer descriptive anchors.
4. Avoid clutter; place links where they make contextual sense.
5. Add `docs/internal_link_validation.md` listing the exact routes that should now link to one another.


## Done when

- priority links are live
- anchor text is descriptive
- no link spam was introduced


## Constraints

- do not add global footer spam links to every location and every service if the UI becomes cluttered
