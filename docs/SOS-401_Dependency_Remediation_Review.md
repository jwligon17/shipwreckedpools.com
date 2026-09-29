# SOS-401 Dependency Remediation Review

Date: 2026-09-12

## Current State
- `docs/npm-audit-current.json` is a valid npm audit JSON report with 14 findings: 1 critical, 6 high, 5 moderate, 2 low.
- Owner reported a normal-terminal pre-update build succeeded on Next.js `16.2.4`, generated 44/44 static pages, and exited 0.
- Local npm registry requests remain blocked in the Codex sandbox with `EACCES` or missing cache metadata, so package metadata and lockfile updates could not be completed here.
- No package upgrades, audit fixes, product code changes, route changes, form changes, inquiry ownership changes, schema changes, production credentials, real messages, cloud provisioning, push, merge, or deployment were performed in SOS-401.

## Exact-Version Plan
- `next`: `16.3.4` exact. This is the current stable 16.x release observed during review and is above the `16.3.3` floor for the listed critical Next advisories.
- `eslint-config-next`: `16.3.4` exact, aligned with the Next runtime/framework version.
- `postcss`: `8.5.28` exact for the direct dev/build dependency. `next@16.3.4` is expected to carry a patched nested PostCSS copy; verify after lockfile refresh.
- `resend`: `6.17.2` exact, staying within major 6 and expected to remove the vulnerable `svix -> uuid@10` audit path by pulling newer `svix`.

## Compatibility Notes
- Next 16.x requires Node `>=20.9.0`; local `npm config list` reports Node `v24.13.1`.
- Current React dependencies are `react@^19.2.0` and `react-dom@^19.2.0`, compatible with the observed Next 16 React 19 peer range.
- `eslint-config-next` 16.x peers with ESLint 9+, and this repo uses `eslint@^9.17.0`.
- PostCSS 8.x remains compatible with the current Autoprefixer/Tailwind PostCSS 8 peer usage.
- Resend 6.x requires Node 20+ in recent package metadata examples; local Node is compatible.

## Commands Attempted
- `cmd /c npm view next@16 version peerDependencies dependencies.optionalDependencies engines --json`
  - Result: BLOCKED. Fetch to `https://registry.npmjs.org/next` failed with `EACCES`.
- `cmd /c npm view eslint-config-next@16 version peerDependencies dependencies.optionalDependencies engines --json`
  - Result: BLOCKED. Fetch to `https://registry.npmjs.org/eslint-config-next` failed with `EACCES`.
- `cmd /c "npm view postcss version engines --json && npm view resend version dependencies peerDependencies engines --json && npm view svix version dependencies engines --json && npm view uuid version engines --json"`
  - Result: BLOCKED. Fetch to `https://registry.npmjs.org/postcss` failed with `EACCES`.
- `cmd /c npm install next@16.3.4 eslint-config-next@16.3.4 postcss@8.5.28 resend@6.17.2 --save-exact --package-lock-only --ignore-scripts --cache .npm-cache`
  - Result: BLOCKED/HUNG on npm registry access; stopped before a package update completed.
- `cmd /c npm install next@16.3.4 eslint-config-next@16.3.4 postcss@8.5.28 resend@6.17.2 --save-exact --package-lock-only --ignore-scripts --offline --cache .npm-cache`
  - Result: BLOCKED. `ENOTCACHED` for `eslint-config-next`; cache does not contain enough metadata to update safely.
- `cmd /c npm audit --json --cache .npm-cache > .tmp\sos-401-npm-audit.json`
  - Result: BLOCKED. The temporary output is a registry/advisory endpoint error, not a valid audit report; `docs/npm-audit-current.json` was not overwritten.

## Authorized-Terminal Commands
Run from the repository root in the owner's normal terminal:

```bat
npm install next@16.3.4 eslint-config-next@16.3.4 postcss@8.5.28 resend@6.17.2 --save-exact --package-lock-only --ignore-scripts
npm ci --ignore-scripts
npm test
npm run lint
node_modules\.bin\tsc --noEmit
npm run build
npm audit --json > docs\npm-audit-current.json
```

After that, return the updated `package.json`, `package-lock.json`, and `docs/npm-audit-current.json` for post-update review.

## Expected Remaining Checks
- Confirm `next`, `eslint-config-next`, direct `postcss`, nested `next/node_modules/postcss`, `sharp`, `resend`, `svix`, and `uuid` installed versions.
- Explain any remaining audit findings after the fresh audit.
- Keep real PostgreSQL tests NOT RUN until an approved isolated database exists.
