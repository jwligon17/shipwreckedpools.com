---
name: testimonial-dedupe
description: Use when reviews or testimonial components render repeated copies of the same review text across a page or across multiple components.
---

# Goal
Keep trust proof visible while removing excessive duplicate crawlable text.

# Workflow
1. Find the shared testimonial/review component.
2. Determine whether duplicate DOM nodes are required for animation or are accidental.
3. Replace duplication-heavy rendering with a cleaner implementation.
4. Preserve the visual treatment.
5. Re-check page content output after the change.

# Guardrails
- Do not remove all reviews.
- Do not alter the wording of real reviews.
- Do not add fake review schema.
