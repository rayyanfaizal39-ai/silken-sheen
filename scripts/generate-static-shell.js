#!/usr/bin/env node
// Generates dist/client/index.html and dist/client/_redirects after `vite build`.
//
// WHY: this TanStack Start app has no source index.html — the framework injects
// the HTML document itself, but only when the nitro deploy plugin runs (which
// only happens automatically inside a Lovable sandbox; see
// @lovable.dev/vite-tanstack-config). A plain `vite build` anywhere else
// (local machine, Cloudflare Pages' own CI) produces dist/client/assets with
// no index.html at all, which 404s on every route once deployed as a static
// site. This script makes the static SPA shell deterministic and
// environment-independent by reading the real entry chunk from Vite's
// build manifest (dist/client/.vite/manifest.json) instead of guessing.

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

const redirects = `/assets/* /assets/:splat 200
/* /index.html 200
`;
writeFileSync(join(clientDir, "_redirects"), redirects);
console.log("[generate-static-shell] Wrote dist/client/_redirects");

// Don't ship the build manifest as a public static asset.
rmSync(join(clientDir, ".vite"), { recursive: true, force: true });
