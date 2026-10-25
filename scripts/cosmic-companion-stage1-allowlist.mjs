#!/usr/bin/env node
// Prints the Stage 1 Cosmic Companion SQL allowlist and refuses db push.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const list = JSON.parse(readFileSync(join(root, "scripts/cosmic-companion-stage1-allowlist.json"), "utf8"));

if (process.argv.includes("--push") || process.env.SUPABASE_DB_PUSH) {
  console.error("Refusing supabase db push. Apply the allowlist only after explicit production approval, from a temporary workdir that contains exactly these 16 files.");
  process.exit(2);
}

console.log("Stage 1 Cosmic Companion allowlist (16 files, repo timestamps):");
for (const [i, file] of list.applyToProductionOnlyAfterApproval.entries()) {
  console.log(`${String(i + 1).padStart(2, "0")}. ${file}`);
}
console.log("\nDo not apply:", list.doNotApply.join("; "));
console.log("Never copy staging schema_migrations into production.");
