#!/usr/bin/env node
// Release gate: fails when a local migration has not been applied to the
// linked Supabase project. Run it before merging/pushing frontend code that
// depends on a new RPC, table or column (a push to main deploys the frontend;
// migrations are applied separately).
//
//   npm run check:migrations
//
// Read-only: it only lists migration history (`supabase migration list`).
import { execFileSync } from "node:child_process";

let raw;
try {
  raw = execFileSync(
    "npx",
    ["--no-install", "supabase", "migration", "list", "--linked", "--output-format", "json"],
    { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], shell: process.platform === "win32" },
  );
} catch (error) {
  console.error("Could not read migration history from the linked Supabase project.");
  console.error(String(error.stderr || error.message).trim());
  process.exit(2);
}

const json = raw.slice(raw.indexOf("{"));
const { migrations = [] } = JSON.parse(json);
const unapplied = migrations.filter((m) => m.local && !m.remote).map((m) => m.local);
const remoteOnly = migrations.filter((m) => m.remote && !m.local).map((m) => m.remote);

if (remoteOnly.length > 0) {
  console.error(`Applied remotely but missing locally: ${remoteOnly.join(", ")}`);
}
if (unapplied.length > 0) {
  console.error(`Not applied to production yet: ${unapplied.join(", ")}`);
  console.error("Apply them (supabase db push --linked) before deploying code that needs them.");
}
if (unapplied.length > 0 || remoteOnly.length > 0) process.exit(1);

console.log(`All ${migrations.length} migrations are applied to the linked project.`);
