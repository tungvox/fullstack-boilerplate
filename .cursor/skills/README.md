# Agent skills (Vercel Labs)

## One-command install (recommended)

From the repository root after cloning the template:

```bash
npm run setup
```

That runs [`scripts/setup.mjs`](../../scripts/setup.mjs): `npm ci`, Playwright Chromium, a **non-interactive** install of all skills from [`vercel-labs/agent-skills`](https://github.com/vercel-labs/agent-skills) for **Cursor** (`--copy` avoids symlink issues on some Windows setups), then **`npx gitnexus@latest setup`** and **`npx gitnexus@latest analyze --skip-agents-md`** (indexes this repo; `--skip-agents-md` keeps the repo’s hand-written [`AGENTS.md`](../../AGENTS.md) from being regenerated).

## Where files go (Cursor)

Per the official [`skills` CLI](https://github.com/vercel-labs/skills), **Cursor** installs project-scoped skills under **[`.agents/skills/`](../../.agents/skills/)** (not this folder). That directory is **gitignored** so each clone can regenerate skills locally.

This `.cursor/skills/` folder stays for **human-written** notes only.

## Manual install / updates

```bash
npx skills add vercel-labs/agent-skills --skill '*' -a cursor -y --copy
```

Update installed skills (non-interactive scope detection):

```bash
npx skills update -y
```

Upstream options and agents: [vercel-labs/skills README](https://github.com/vercel-labs/skills/blob/main/README.md).

## Useful skills in that bundle

The upstream bundle changes over time; after `npm run setup`, see **`.agents/skills/`** for installed folders (today that includes names like `vercel-react-best-practices`, `web-design-guidelines`, and `deploy-to-vercel`).

## Offline / air-gapped workflows

If you cannot run `npx` against GitHub, copy skill folders in intentionally and respect upstream licenses. Prefer documenting the provenance in your repo’s `README` or `NOTICE`.

## GitNexus skills

GitNexus can install its own skills via `npx gitnexus@latest setup`. Those usually live in the user skills directory; see [docs/mcp.md](../../docs/mcp.md).
