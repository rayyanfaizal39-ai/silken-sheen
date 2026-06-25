#!/usr/bin/env node
// Generates dist/client/index.html after `vite build`.
//
// WHY: this TanStack Start app has no source index.html — the framework injects
// the HTML document itself, but only when the nitro deploy plugin runs with a
// preset that renders pages dynamically per-request. We deploy as a Cloudflare
// Worker with static assets (see vite.config.ts + patch-wrangler-assets.js),
// where `assets.not_found_handling: "single-page-application"` is what serves
// this file for any non-matching path — so it still needs to exist and be
// correct independent of how nitro's own SSR rendering behaves. This script
// makes that deterministic and environment-independent by reading the real
// entry chunk from Vite's build manifest (dist/client/.vite/manifest.json)
// instead of guessing (there are multiple "index-*.js" chunks in assets/, only
// one of which is the actual entry).
//
// NOTE: this intentionally does NOT write a _redirects file — that's a
// Cloudflare *Pages*-only convention. On Workers, wrangler.json's
// `assets.not_found_handling` is the equivalent mechanism (patched in by
// scripts/patch-wrangler-assets.js), and a stray _redirects file with a
// `/* /index.html 200` rule trips wrangler's infinite-redirect-loop guard.

import { readFileSync, writeFileSync, rmSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const clientDir = join(root, "dist/client");
const manifestPath = join(clientDir, ".vite/manifest.json");

if (!existsSync(manifestPath)) {
  console.error(
    `[generate-static-shell] No manifest at ${manifestPath} — did "vite build" run first? Skipping.`,
  );
  process.exit(1);
}

const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const entry = Object.values(manifest).find((v) => v.isEntry);

if (!entry) {
  console.error("[generate-static-shell] No isEntry chunk found in manifest. Skipping.");
  process.exit(1);
}

const cssFiles = new Set([
  ...(entry.css ?? []),
  ...(entry.assets ?? []).filter((a) => a.endsWith(".css")),
]);

const cssLinks = [...cssFiles]
  .map((href) => `    <link rel="stylesheet" href="/${href}" />`)
  .join("\n");

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AcadeMY</title>
${cssLinks}
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/${entry.file}"></script>
  </body>
</html>
`;

writeFileSync(join(clientDir, "index.html"), html);
console.log(`[generate-static-shell] Wrote dist/client/index.html (entry: ${entry.file})`);

// Don't ship the build manifest as a public static asset.
rmSync(join(clientDir, ".vite"), { recursive: true, force: true });
