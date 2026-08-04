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
const loadingScreenSource = readFileSync(
  join(root, "src/components/AcadeMYLoadingScreen.tsx"),
  "utf8",
);
const criticalCssMatch = loadingScreenSource.match(
  /export const ACADEMY_LOADING_CRITICAL_CSS = `([\s\S]*?)`;/,
);
if (!criticalCssMatch) {
  throw new Error("[generate-static-shell] Could not extract loading critical CSS.");
}
const loadingCriticalCss = criticalCssMatch[1];

if (!existsSync(manifestPath)) {
  const indexPath = join(clientDir, "index.html");
  if (existsSync(indexPath)) {
    console.log(
      `[generate-static-shell] No manifest at ${manifestPath}; dist/client/index.html already exists. Nothing to do.`,
    );
    process.exit(0);
  }

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
  .map(
    (href) =>
      `    <link rel="stylesheet" href="/${href}" media="print" data-app-stylesheet="true" onload="this.media='all'" />\n` +
      `    <noscript><link rel="stylesheet" href="/${href}" /></noscript>`,
  )
  .join("\n");

// No-React fallback: AppBootGate normally promotes these stylesheets from
// media="print" to media="all" once mounted. If React never hydrates (script
// blocked, boot failure before mount, etc.) the page would otherwise stay
// unstyled forever. This inline script is a redundant, idempotent safety net:
// the per-link onload above (and any React-driven activation) may already
// have flipped `media`, so this only needs to catch the stragglers after a
// short delay.
const noReactStyleFallback = `    <script>
      (function () {
        function activateAppStylesheets() {
          var links = document.querySelectorAll('link[data-app-stylesheet]');
          for (var i = 0; i < links.length; i++) links[i].media = "all";
        }
        setTimeout(activateAppStylesheets, 3000);
      })();
    </script>`;

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#050816" />
    <title>AcadeMY</title>
    <style>${loadingCriticalCss}</style>
${cssLinks}
${noReactStyleFallback}
  </head>
  <body data-academy-loading="true">
    <!--
      Only the branded loading presentation (stars, logo, orbit, progress bar)
      ships in this static markup so crawlers/page-source readers never see
      error copy. The error heading/message and Retry/Reload controls are
      created at runtime (in JS, by AppBootGate's renderLoaderError()) only
      after a genuine boot failure or timeout, and are removed again once
      the error clears.
    -->
    <div id="academy-static-loader" role="status" aria-live="polite" aria-label="Preparing your learning mission">
      <div class="academy-static-stars" aria-hidden="true"></div>
      <div class="academy-static-loading">
        <div class="academy-static-stage">
          <div class="academy-static-glow" aria-hidden="true"></div>
          <div class="academy-static-orbit" aria-hidden="true"><span class="academy-static-satellite"></span></div>
          <div class="academy-static-orbit inner" aria-hidden="true"><span class="academy-static-satellite"></span></div>
          <svg class="academy-static-logo" viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="8" fill="#6D28FF"/><path d="M13.042 17.158H18.172V20.164H13.042V17.158ZM10.072 22L14.41 9.742H17.668L21.61 22H18.334L15.4 11.956H16.696L13.33 22H10.072Z" fill="#F4B400"/></svg>
        </div>
        <p class="academy-static-message" data-loading-message>Preparing your learning mission…</p>
        <div class="academy-static-bar" aria-hidden="true"><span></span></div>
      </div>
    </div>
    <div id="root"></div>
    <script type="module" src="/${entry.file}"></script>
  </body>
</html>
`;

writeFileSync(join(clientDir, "index.html"), html);
console.log(`[generate-static-shell] Wrote dist/client/index.html (entry: ${entry.file})`);

// Don't ship the build manifest as a public static asset.
rmSync(join(clientDir, ".vite"), { recursive: true, force: true });
