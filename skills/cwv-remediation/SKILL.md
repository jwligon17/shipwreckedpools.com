---
name: cwv-remediation
description: Use for implementing validated performance fixes affecting LCP, INP, CLS, caching, image loading, font loading, and JS execution.
---

# Goal
Improve performance without hurting crawlability, UX clarity, or conversion.

# Priorities
- LCP: critical-path asset priority, hero optimization, server and caching improvements
- INP: reduce long tasks, expensive event handlers, and unnecessary JS
- CLS: reserve space, fix unstable embeds/images/fonts, stabilize interactive UI

# Guardrails
- Preserve semantic HTML.
- Preserve crawlable links.
- Do not lazy-load critical above-the-fold content.
- Do not break analytics or portal functionality.
- Do not sacrifice the quote path for a small metric win.
