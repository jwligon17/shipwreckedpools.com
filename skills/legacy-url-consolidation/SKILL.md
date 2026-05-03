---
name: legacy-url-consolidation
description: Use for redirect maps, canonical cleanup, legacy-to-new URL consolidation, and migration tasks involving /pages, /products, and /blogs/news URLs.
---

# Goal
Consolidate legacy Shipwrecked URLs into the preferred canonical routes without losing search equity.

# Workflow
1. Build the source-to-target map first.
2. Confirm that each target route exists and is the best canonical page.
3. Update internal links to the canonical target.
4. Add redirects only after the map is complete.
5. Keep a note of any source routes that should return 410 instead of redirecting.

# Guardrails
- Preserve high-value URLs if there is no stronger replacement.
- Never redirect multiple unrelated sources to the homepage.
- Do not leave both old and new routes indexable if they serve the same intent.
- Blog routes must be fixed before old blog URLs are redirected.
