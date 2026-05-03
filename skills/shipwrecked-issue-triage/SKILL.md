---
name: shipwrecked-issue-triage
description: Use for read-only audits of Shipwrecked routes, templates, metadata, legacy URL overlap, and SEO blockers before any edits are made.
---

# When to use
Use this skill at the start of a new SEO or migration task.

# What to do
1. Identify the exact route(s), components, and content files involved.
2. Inventory current title, H1, canonical target, internal links, and obvious SEO blockers.
3. Check whether an old route and a new route both exist for the same content.
4. Report findings before proposing code changes.

# What not to do
- Do not edit files.
- Do not suggest broad redesigns.
- Do not invent missing implementation details.

# Output
Produce a compact issue report with:
- exact routes affected
- exact files/components likely involved
- blockers ordered by severity
- smallest safe next step
