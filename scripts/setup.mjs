/**
 * One-command post-clone setup (see README "Quick start").
 *
 * - Installs Node dependencies from the lockfile (`npm ci`).
 * - Installs Playwright Chromium for `npm run test:e2e`.
 * - Installs all Vercel Labs agent skills for Cursor into `.agents/skills/` (non-interactive).
 * - Runs **GitNexus** `setup` (global Cursor MCP + bundled skills) then `analyze` for this repo.
 *
 * Requires network access. Uses `--copy` for skills to avoid symlink issues on some Windows setups.
 * GitNexus `analyze` uses `--skip-agents-md` so hand-written [`AGENTS.md`](../AGENTS.md) is not regenerated.
 * If `npm ci` fails on a dirty tree, run `npm install` manually, then re-run this script (or run the remaining steps).
 */

import { spawnSync } from "node:child_process";

function run(label, command, args) {
  console.log(`\n[setup] ${label}\n> ${command} ${args.join(" ")}\n`);
  const result = spawnSync(command, args, {
    stdio: "inherit",
    // Required on Windows so `npm` / `npx` resolve correctly (avoids spawn EINVAL with bare .cmd paths).
    shell: true,
    env: process.env,
  });
  if (result.status !== 0 && result.status !== null) {
    process.exit(result.status);
  }
  if (result.error) {
    console.error(result.error);
    process.exit(1);
  }
}

run("Install Node dependencies (lockfile)", "npm", ["ci"]);
run("Install Playwright Chromium", "npx", ["playwright", "install", "chromium"]);
run("Install Vercel Labs skills for Cursor", "npx", [
  "skills",
  "add",
  "vercel-labs/agent-skills",
  "--skill",
  "*",
  "-a",
  "cursor",
  "-y",
  "--copy",
]);

run("GitNexus Cursor MCP and global skills", "npx", [
  "-y",
  "gitnexus@latest",
  "setup",
]);

run("GitNexus index this repository", "npx", [
  "-y",
  "gitnexus@latest",
  "analyze",
  "--skip-agents-md",
]);

console.log("\n[setup] Done.\n");
