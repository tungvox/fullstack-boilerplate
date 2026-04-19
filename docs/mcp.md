# MCP setup (Cursor)

Cursor usually reads MCP servers from your **user-level** config (for example `~/.cursor/mcp.json` on macOS/Linux, or `%USERPROFILE%\.cursor\mcp.json` on Windows). This repository ships [`.cursor/mcp.example.json`](../.cursor/mcp.example.json) as a **template only** — copy the entries you need into your real MCP config. **Never commit personal access tokens, service role keys, or Supabase PATs.**

## Security defaults

- Prefer **read-only** Supabase MCP where possible (`--read-only`).
- Scope Supabase MCP to a **single project** (`--project-ref`).
- Treat MCP tools like remote admin access: confirm destructive operations manually.

See also the vendored rules under [`.cursor/rules/security/`](../.cursor/rules/security/).

## Supabase MCP

**Pinned package version at time of writing:** `@supabase/mcp-server-supabase@0.7.0` (verify current releases before upgrading).

1. Create a Supabase **personal access token** in the dashboard (Account → Access Tokens).
2. Copy your **project ref** from the project URL (`https://supabase.com/dashboard/project/<project-ref>`).

### macOS / Linux (`npx`)

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": [
        "-y",
        "@supabase/mcp-server-supabase@0.7.0",
        "--read-only",
        "--project-ref=YOUR_PROJECT_REF"
      ],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "YOUR_SUPABASE_PAT"
      }
    }
  }
}
```

### Windows (PowerShell-friendly `cmd /c`)

Some Windows setups need an explicit shell wrapper:

```json
{
  "mcpServers": {
    "supabase": {
      "command": "cmd",
      "args": [
        "/c",
        "npx",
        "-y",
        "@supabase/mcp-server-supabase@0.7.0",
        "--read-only",
        "--project-ref=YOUR_PROJECT_REF"
      ],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "YOUR_SUPABASE_PAT"
      }
    }
  }
}
```

Official reference: [https://supabase.com/docs/guides/getting-started/mcp](https://supabase.com/docs/guides/getting-started/mcp)

## Google Stitch MCP

**Pinned package version at time of writing:** `@_davideast/stitch-mcp@0.5.3` (community-maintained; re-verify before upgrading).

Interactive setup (recommended first run):

```bash
npx @_davideast/stitch-mcp@0.5.3 init
```

Doctor / diagnostics:

```bash
npx @_davideast/stitch-mcp@0.5.3 doctor --verbose
```

### Example Cursor entry (macOS / Linux)

```json
{
  "mcpServers": {
    "stitch": {
      "command": "npx",
      "args": ["-y", "@_davideast/stitch-mcp@0.5.3", "proxy"]
    }
  }
}
```

### Windows (`cmd /c`)

```json
{
  "mcpServers": {
    "stitch": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "@_davideast/stitch-mcp@0.5.3", "proxy"]
    }
  }
}
```

You will still need Google Cloud / Stitch project prerequisites as described in the package README.

## GitNexus MCP

GitNexus can install Cursor MCP for you:

```bash
npx gitnexus@latest setup
```

That typically writes **user-level** MCP configuration and installs GitNexus skills. If you prefer manual wiring:

### macOS / Linux

```json
{
  "mcpServers": {
    "gitnexus": {
      "command": "npx",
      "args": ["-y", "gitnexus@latest", "mcp"]
    }
  }
}
```

### Windows (`cmd /c`)

```json
{
  "mcpServers": {
    "gitnexus": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "gitnexus@latest", "mcp"]
    }
  }
}
```

After connecting, index this repository from a terminal:

```bash
cd /path/to/fullstack-boilerplate
npx gitnexus@latest analyze
```

Editor documentation: [https://abhigyanpatwari-gitnexus.mintlify.app/mcp/cursor](https://abhigyanpatwari-gitnexus.mintlify.app/mcp/cursor)
