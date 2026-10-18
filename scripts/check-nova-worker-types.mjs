import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
// Check the entire Edge Function import graph without requiring a local Deno install.
// Only the two Deno host APIs used by the entry point need a temporary declaration.
const directory = mkdtempSync(join(tmpdir(), "nova-worker-types-"));
try {
  const declaration = join(directory, "runtime.d.ts");
  writeFileSync(
    declaration,
    "declare const Deno: { env: { get(name: string): string | undefined }; serve(handler: (request: Request) => Promise<Response>): void };\n",
  );
  const result = spawnSync(
    process.execPath,
    [
      "node_modules/typescript/bin/tsc",
      "--noEmit",
      "--strict",
      "--skipLibCheck",
      "--target",
      "ES2022",
      "--module",
      "ESNext",
      "--moduleResolution",
      "Bundler",
      "--allowImportingTsExtensions",
      "--lib",
      "ES2022,DOM,DOM.Iterable",
      "--types",
      "node",
      declaration,
      "supabase/functions/nova-batch-worker/index.ts",
    ],
    { stdio: "inherit" },
  );
  process.exitCode = result.status ?? 1;
} finally {
  rmSync(directory, { recursive: true, force: true });
}
