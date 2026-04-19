# Agent skills (Vercel Labs)

This directory is reserved for **project-local** Agent Skills.

## Install Vercel Labs skills

From the repository root (requires network access):

```bash
npx skills add vercel-labs/agent-skills
```

Useful skills for this stack:

- `react-best-practices` — performance and correctness guidance aligned with Vercel’s React guidance
- `web-design-guidelines` — accessibility and UX review prompts
- `deploy-to-vercel` — deployment-oriented checklists

Target Cursor explicitly if the CLI prompts for an editor/agent.

## Offline / repeatable clones

If you need skills committed into git (for air‑gapped workflows), install them locally above, then add the generated skill folders **intentionally** to version control. Keep third‑party licenses intact and review updates on a schedule.

## GitNexus skills

GitNexus can install its own skills via `npx gitnexus@latest setup`. Those usually live in the user skills directory; see [docs/mcp.md](../../docs/mcp.md).
