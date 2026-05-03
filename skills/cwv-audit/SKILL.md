---
name: cwv-audit
description: Use for read-only Core Web Vitals auditing on Shipwrecked routes, including LCP, INP, CLS, asset loading, script cost, and render-blocking analysis.
---

# Goal
Identify the fewest, highest-impact fixes for CWV.

# Workflow
1. Run or inspect Lighthouse on the priority routes.
2. Record likely LCP element, long tasks, layout shifts, heavy images, and third-party scripts.
3. Check whether critical content or links are hidden behind JS or broken lazy-loading.
4. Produce a prioritized list of root causes.
5. Recommend the smallest fix with the largest likely metric gain.

# Guardrails
- Do not edit files in this mode.
- Distinguish measurement from remediation.
