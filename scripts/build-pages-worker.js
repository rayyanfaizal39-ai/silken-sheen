#!/usr/bin/env node
// Materializes dist/server as a Cloudflare Pages "Advanced Mode" Worker so
// production (a git-integrated Pages project, NOT a plain `wrangler deploy`
// Worker) actually runs SSR for document requests.
//
// ROOT CAUSE this fixes: `patch-wrangler-assets.js` sets `assets.run_worker_first`
// in dist/server/wrangler.json — but that field only means something for a
// Workers-with-Assets deploy (`wrangler deploy`). Production is served by the
// Cloudflare Pages project "academymy" (git-integrated, auto-deploys dist/client
// on push), and Pages never reads dist/server/wrangler.json at all. Pages only
// runs a Worker for a request if the published output directory (dist/client)
// contains a `_worker.js` entry (Advanced Mode), gated by `_routes.json`. Without
// those, Pages served dist/client/index.html — the generic static shell — for
// every route, which is why fixing run_worker_first had zero effect in prod.
//
// What this does:
// - Copies dist/server/** into dist/client/_worker.js/** (Pages supports
//   `_worker.js` as a directory: entry is `_worker.js/index.js`, and it can
//   import sibling files via relative imports, same as nitro's unbundled
//   cloudflare-module output already does with dist/server/index.mjs +
//   ./_libs, ./_chunks, ./_ssr, etc.)
// - Renames the entry file index.mjs -> index.js (Pages' documented
//   requirement for the Advanced Mode directory entry point). Nothing inside
//   references the entry file's own name, so the rename is safe.
// - Writes dist/client/_routes.json so Pages invokes the Worker for
//   everything except genuinely static assets (mirrors the exclude list in
//   patch-wrangler-assets.js's run_worker_first, translated to Pages'
//   include/exclude glob syntax).
// - Deletes .wrangler/deploy/config.json. nitro's `deployConfig: true` option
//   (vite.config.ts) writes this file pointing at dist/server/wrangler.json —
//   a Workers-with-Assets config whose `assets.run_worker_first` is an array
//   (Pages requires a boolean) and whose `assets.binding` is "ASSETS" (a name
//   Pages reserves and rejects). Cloudflare's Pages publish step follows this
//   redirect file when present and switches away from the root wrangler.jsonc
//   to that incompatible config, failing deployment with exactly those two
//   errors. Removing it is what makes the root wrangler.jsonc (which is valid
//   for Pages) the config Cloudflare actually uses.

import {
  copyFileSync,
  cpSync,
  existsSync,
  readdirSync,
  readFileSync,
  renameSync,
  writeFileSync,
  rmSync,
} from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const distDir = join(root, "dist");
const serverDir = join(root, "dist/server");
const clientDir = join(root, "dist/client");
const workerDir = join(clientDir, "_worker.js");

if (!existsSync(serverDir)) {
  console.error(
    `[build-pages-worker] No dist/server at ${serverDir} — did the nitro/Cloudflare build run? Skipping.`,
  );
  process.exit(1);
}
if (!existsSync(clientDir)) {
  console.error(
    `[build-pages-worker] No dist/client at ${clientDir} — did "vite build" run? Skipping.`,
  );
  process.exit(1);
}

// vite-plugin-pwa runs against Nitro's top-level output and generates these
// files in dist/. Cloudflare Pages publishes dist/client/, so materialize the
// generated worker and its hashed Workbox runtime in that deployed directory.
const serviceWorkerSource = join(distDir, "sw.js");
const serviceWorkerTarget = join(clientDir, "sw.js");
const workboxFiles = readdirSync(distDir).filter(
  (name) => name.startsWith("workbox-") && name.endsWith(".js"),
);

if (!existsSync(serviceWorkerSource) || workboxFiles.length === 0) {
  console.error(
    "[build-pages-worker] Expected vite-plugin-pwa output in dist/ (sw.js and workbox-*.js).",
  );
  process.exit(1);
}

for (const name of readdirSync(clientDir)) {
  if (name.startsWith("workbox-") && name.endsWith(".js")) {
    rmSync(join(clientDir, name), { force: true });
  }
}

copyFileSync(serviceWorkerSource, serviceWorkerTarget);
for (const name of workboxFiles) {
  copyFileSync(join(distDir, name), join(clientDir, name));
}

if (!existsSync(join(clientDir, "site.webmanifest"))) {
  console.error(
    "[build-pages-worker] Expected public/site.webmanifest in dist/client after the Vite build.",
  );
  process.exit(1);
}

rmSync(workerDir, { recursive: true, force: true });
cpSync(serverDir, workerDir, { recursive: true });

const entryMjs = join(workerDir, "index.mjs");
const entryJs = join(workerDir, "index.js");
if (!existsSync(entryMjs)) {
  console.error(`[build-pages-worker] Expected entry ${entryMjs} not found. Skipping.`);
  process.exit(1);
}
renameSync(entryMjs, entryJs);

// wrangler.json inside _worker.js/ is inert for Pages (Pages doesn't read it)
// and its `main: "index.mjs"` would be stale after the rename above — remove
// it so it can't cause confusion.
rmSync(join(workerDir, "wrangler.json"), { force: true });

writeFileSync(
  join(clientDir, "_routes.json"),
  JSON.stringify(
    {
      version: 1,
      description:
        "Run the SSR Worker for all document/navigation requests; serve genuinely static files directly.",
      include: ["/*"],
      exclude: [
        "/assets/*",
        "/companions/*",
        "/favicon.ico",
        "/index.html",
        "/sw.js",
        "/workbox-*.js",
        "/*.png",
        "/*.webmanifest",
        "/robots.txt",
        "/sitemap.xml",
      ],
    },
    null,
    2,
  ),
);

// The build's generated dist/client/_headers only covers /assets/* (content-
// hashed, safe to cache immutably for a year). /sw.js and /workbox-*.js are
// NOT content-hashed (filename: "sw.js" is fixed), so without an explicit
// override the browser/Cloudflare edge can serve a stale copy of the worker
// script itself — delaying how quickly a client even notices a new deploy
// exists, on top of the skipWaiting/clientsClaim fix in vite.config.ts.
// Force those two to always revalidate, while leaving whatever immutable
// rule already exists for /assets/* untouched.
const headersPath = join(clientDir, "_headers");
const swHeaderRules = [
  "/sw.js",
  "  cache-control: no-cache, no-store, must-revalidate",
  "",
  "/workbox-*.js",
  "  cache-control: no-cache, no-store, must-revalidate",
  "",
].join("\n");

const existingHeaders = existsSync(headersPath) ? readFileSync(headersPath, "utf8") : "";
if (!existingHeaders.includes("/sw.js")) {
  const merged = `${existingHeaders.trimEnd()}\n\n${swHeaderRules}`.trimStart();
  writeFileSync(headersPath, merged);
}

// Belt + suspenders: remove every file Cloudflare Pages could follow as a
// redirect away from the root wrangler.jsonc.
//   - .wrangler/deploy/config.json — nitro's redirect pointer
//   - .wrangler/                    — the whole dir, in case other files land there
//   - dist/server/wrangler.json     — the invalid Workers-with-Assets target itself
rmSync(join(root, ".wrangler"), { recursive: true, force: true });
rmSync(join(serverDir, "wrangler.json"), { force: true });

console.log(
  "[build-pages-worker] Copied PWA files into dist/client, wrote _worker.js/ " +
    "(Pages Advanced Mode) + _routes.json; " +
    "removed .wrangler/ and dist/server/wrangler.json so Cloudflare Pages reads root wrangler.jsonc",
);
