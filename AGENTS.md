<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Agent guide for this repository

## Product intent

This is a reusable **Next.js + Supabase + Vercel** boilerplate oriented toward a **single-user SaaS day one** (Stripe subscriptions + Supabase RLS). Keep changes minimal, composable, and documented when you alter onboarding paths (auth, billing, env, MCP).

## Secrets and keys

- Never commit `.env`, `.env.local`, PATs, or Supabase **service role** keys.
- Never expose secrets through `NEXT_PUBLIC_*` variables or client bundles.
- Supabase **anon** credentials are public by design; still avoid embedding unexpected third-party scripts that could exfiltrate them.

## Supabase usage

- **Server code** (Server Components, Route Handlers, Server Actions): use `@/lib/supabase/server`.
- **Client Components:** use `@/lib/supabase/client`.
- **Session refresh:** `middleware.ts` already calls `auth.getUser()` — extend the matcher if you add new top-level segments that require fresh cookies.
- **Service role:** `SUPABASE_SERVICE_ROLE_KEY` is used only in trusted server paths (notably the **Stripe webhook** at `src/app/api/webhooks/stripe/route.ts`) to upsert `billing_customers` / `billing_subscriptions`. Never import `createAdminClient` from `@/lib/supabase/admin` in Client Components or any code reachable from the browser bundle.

## Billing and entitlements

- **Reads:** use the user-scoped server client (`@/lib/supabase/server`) so RLS applies. `getEntitlements()` in `src/lib/entitlements.ts` is the intended gate for premium routes.
- **Writes:** Stripe webhooks are the system of record for subscription rows; do not add client-side policies that allow authenticated users to insert/update `billing_*` tables.
- **Stripe secrets:** keep `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` on the server only; configure the live webhook URL in Stripe for each deployed environment.

## MCP

- Follow `.cursor/rules/security/secure-mcp-usage.mdc` when operating with MCP-enabled tools.
- Prefer read-only Supabase MCP and explicit human confirmation before destructive database operations.
- Copy patterns from [`docs/mcp.md`](docs/mcp.md) and [`.cursor/mcp.example.json`](.cursor/mcp.example.json); keep real tokens in user-level Cursor config, not in git.

## GitNexus

- Index or re-analyze this repo with `npx gitnexus@latest analyze` when structural refactors land so graph-backed answers stay accurate.
- Use GitNexus MCP for exploration and impact questions per its own documentation.

## Testing expectations

- Add **Vitest** tests beside code (`*.test.ts(x)`) for pure logic and UI behavior.
- Keep at least one **Playwright** smoke path green for the marketing/home surface when you change routing or global layout.

## Vercel React best practices

- Prefer Server Components and explicit client boundaries.
- Cross-check significant UI or performance work with the **`react-best-practices`** skill from `vercel-labs/agent-skills` (see `.cursor/skills/README.md`).

## UI and visual design

- Read the root **`DESIGN.md`** before implementing or refactoring user-visible UI. It is the Vercel-inspired design spec installed via **getdesign** (`npm run design:vercel` / `npx getdesign@latest add vercel`). See [`docs/design.md`](docs/design.md).
- After refreshing the spec with the CLI, review the diff and merge intentional customizations so the file stays accurate for the product.

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **fullstack-boilerplate** (220 symbols, 308 relationships, 4 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> If any GitNexus tool warns the index is stale, run `npx gitnexus analyze` in terminal first.

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `gitnexus_impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `gitnexus_detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `gitnexus_query({query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `gitnexus_context({name: "symbolName"})`.

## When Debugging

1. `gitnexus_query({query: "<error or symptom>"})` — find execution flows related to the issue
2. `gitnexus_context({name: "<suspect function>"})` — see all callers, callees, and process participation
3. `READ gitnexus://repo/fullstack-boilerplate/process/{processName}` — trace the full execution flow step by step
4. For regressions: `gitnexus_detect_changes({scope: "compare", base_ref: "main"})` — see what your branch changed

## When Refactoring

- **Renaming**: MUST use `gitnexus_rename({symbol_name: "old", new_name: "new", dry_run: true})` first. Review the preview — graph edits are safe, text_search edits need manual review. Then run with `dry_run: false`.
- **Extracting/Splitting**: MUST run `gitnexus_context({name: "target"})` to see all incoming/outgoing refs, then `gitnexus_impact({target: "target", direction: "upstream"})` to find all external callers before moving code.
- After any refactor: run `gitnexus_detect_changes({scope: "all"})` to verify only expected files changed.

## Never Do

- NEVER edit a function, class, or method without first running `gitnexus_impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `gitnexus_rename` which understands the call graph.
- NEVER commit changes without running `gitnexus_detect_changes()` to check affected scope.

## Tools Quick Reference

| Tool | When to use | Command |
|------|-------------|---------|
| `query` | Find code by concept | `gitnexus_query({query: "auth validation"})` |
| `context` | 360-degree view of one symbol | `gitnexus_context({name: "validateUser"})` |
| `impact` | Blast radius before editing | `gitnexus_impact({target: "X", direction: "upstream"})` |
| `detect_changes` | Pre-commit scope check | `gitnexus_detect_changes({scope: "staged"})` |
| `rename` | Safe multi-file rename | `gitnexus_rename({symbol_name: "old", new_name: "new", dry_run: true})` |
| `cypher` | Custom graph queries | `gitnexus_cypher({query: "MATCH ..."})` |

## Impact Risk Levels

| Depth | Meaning | Action |
|-------|---------|--------|
| d=1 | WILL BREAK — direct callers/importers | MUST update these |
| d=2 | LIKELY AFFECTED — indirect deps | Should test |
| d=3 | MAY NEED TESTING — transitive | Test if critical path |

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/fullstack-boilerplate/context` | Codebase overview, check index freshness |
| `gitnexus://repo/fullstack-boilerplate/clusters` | All functional areas |
| `gitnexus://repo/fullstack-boilerplate/processes` | All execution flows |
| `gitnexus://repo/fullstack-boilerplate/process/{name}` | Step-by-step execution trace |

## Self-Check Before Finishing

Before completing any code modification task, verify:
1. `gitnexus_impact` was run for all modified symbols
2. No HIGH/CRITICAL risk warnings were ignored
3. `gitnexus_detect_changes()` confirms changes match expected scope
4. All d=1 (WILL BREAK) dependents were updated

## Keeping the Index Fresh

After committing code changes, the GitNexus index becomes stale. Re-run analyze to update it:

```bash
npx gitnexus analyze
```

If the index previously included embeddings, preserve them by adding `--embeddings`:

```bash
npx gitnexus analyze --embeddings
```

To check whether embeddings exist, inspect `.gitnexus/meta.json` — the `stats.embeddings` field shows the count (0 means no embeddings). **Running analyze without `--embeddings` will delete any previously generated embeddings.**

> Claude Code users: A PostToolUse hook handles this automatically after `git commit` and `git merge`.

## CLI

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->
