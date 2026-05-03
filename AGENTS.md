# Shipwrecked Pools Codex Rules

## Mission
Build the most technically sound, locally relevant, conversion-focused pool service website in West Texas **without broad unnecessary changes**.

## Primary goals
1. Increase relevance for pool-cleaning and pool-service searches in Abilene and nearby service areas.
2. Consolidate old and new URL structures so authority is not split.
3. Improve conversion paths for call, text, and quote requests.
4. Improve Core Web Vitals without degrading crawlability or conversion.
5. Preserve a premium LMH-inspired visual feel while making copy and structure more search-intent aligned.

## Hard guardrails
- Do not redesign the brand unless the prompt explicitly asks for design work.
- Do not rename routes unless the task is explicitly about migration or redirects.
- Do not change more files than necessary.
- Do not add dependencies unless the prompt explicitly allows it and you justify them.
- Do not invent reviews, customer stories, neighborhoods, service claims, awards, or service-area facts.
- Do not publish placeholder lorem ipsum.
- Do not expose a residential address on-page or in structured data.
- Do not create doorway pages or near-duplicate location pages.
- Do not remove real CTAs, phone numbers, or quote flows unless replaced with something better in the same task.
- Do not touch analytics, payments, portal, or quote logic unless that is the exact task.

## Preferred workflow
1. Inspect the exact routes, components, and content related to the task.
2. State the smallest safe implementation plan.
3. Edit only the files needed for that plan.
4. Validate with the project’s existing checks.
5. Summarize exactly what changed, file by file.
6. Note any follow-up items separately instead of expanding scope.

## Editing rules
- Preserve route stability whenever possible.
- Prefer additive improvements over rewrites when the current structure is salvageable.
- Keep titles, H1s, internal links, schema, and CTA language explicit and search-intent aligned.
- Use descriptive anchor text, not vague link text.
- Treat service pages as money pages and location pages as local-support pages.
- If a page has old and new versions, prefer the new canonical route and map the old route with a redirect.
- If a change affects multiple routes, build the map first before touching code.

## Content rules
- Keyword-first beats poetic-first in title tags and H1s.
- Keep brand personality in supporting copy, not at the expense of clarity.
- FAQ content should help users; do not assume FAQ rich results will show.
- Review content may be displayed, but do not implement self-serving review rich-result markup for the business itself.
- Every page should have one clear primary intent and one clear CTA.

## Local SEO rules
- Shipwrecked is a service-area business.
- Do not output a public street address unless a prompt explicitly says the business has a staffed storefront that receives customers.
- Abilene is the core market. Nearby service areas should be treated as supportive clusters, not cloned pages.
- Location pages need unique, useful local angles or they should be consolidated.

## CWV rules
- Preserve semantic HTML and crawlable links.
- Do not hide critical content behind user actions or broken lazy-loading.
- Avoid heavy hero media, layout shifts, and unnecessary JavaScript.
- Fix the root cause, not just the metric symptom.

## Done criteria
A task is done only when:
- the requested scope is complete
- no unrelated broad changes were made
- validation was run where possible
- the diff is easy to review
- the summary explains what changed and what still needs a human
