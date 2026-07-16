// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { VitePWA } from "vite-plugin-pwa";

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// Used by both the Vercel SSR deploy path (dist/server/server.js) and the
// Cloudflare Worker deploy path (dist/server/index.mjs) below.
export default defineConfig({
  // Cloudflare deploy target: production is the Cloudflare Pages project
  // "academymy" (git-integrated build, myacademy.my / www.myacademy.my), NOT
  // a plain `wrangler deploy` Worker. nitro's cloudflare-module preset still
  // generates dist/server/index.mjs + dist/server/wrangler.json (patched by
  // scripts/patch-wrangler-assets.js) as a byproduct, but that generated
  // wrangler.json is a Workers-with-Assets config — its `assets.run_worker_first`
  // (array of globs) and `assets.binding: "ASSETS"` are both invalid for a
  // Pages deploy (Pages reserves the "ASSETS" binding name, and expects
  // run_worker_first as a plain boolean, not a glob array). It's never meant
  // to be read directly; scripts/build-pages-worker.js repackages the actual
  // dist/server/** output as dist/client/_worker.js/ (Pages Advanced Mode)
  // + dist/client/_routes.json, and the real deploy config Cloudflare Pages
  // reads is the repo-root wrangler.jsonc (pages_build_output_dir mode).
  //
  // deployConfig: true is required to make nitro emit dist/server/wrangler.json
  // at all (patch-wrangler-assets.js depends on that file existing — turning
  // this off removes the file outright rather than just fixing its content).
  // The side effect: with it on, nitro ALSO writes .wrangler/deploy/config.json
  // pointing at dist/server/wrangler.json, and Cloudflare's Pages publish step
  // follows that redirect instead of using the root wrangler.jsonc — i.e. it
  // republishes the exact run_worker_first/ASSETS-binding failures described
  // above. scripts/build-pages-worker.js deletes .wrangler/deploy/config.json
  // as its last step specifically to neutralize that redirect, so the root
  // wrangler.jsonc is what Cloudflare Pages actually reads.
  nitro: {
    ...({ minify: true } as { minify: boolean }),
    preset: "cloudflare-module",
    // Pages enforces the free-plan Worker limit against the compressed upload.
    // The preset defaults to unminified server chunks, which needlessly ships
    // multi-megabyte curriculum data with whitespace and long identifiers.
    output: { dir: "dist", serverDir: "dist/server", publicDir: "dist/client" },
    cloudflare: { nodeCompat: true, deployConfig: true },
  },
  tanstackStart: {
    server: { entry: "server" },
    // Override the default client entry (which calls hydrateRoot and expects an
    // SSR payload) with our SPA mount in src/client.tsx. not_found_handling:
    // "single-page-application" (see patch-wrangler-assets.js) serves the static
    // index.html for most navigation with no SSR HTML to hydrate — so we
    // createRoot + render <RouterProvider /> directly instead.
    client: { entry: "client" },
    // Reduces the CLIENT bundle: without this, every route component ships
    // in the main JS bundle regardless of which page the user is on. Note
    // this only affects the client — it does NOT reduce what the SSR Worker
    // eagerly imports (dist/server/_ssr/router-*.mjs still statically pulls
    // in every route module for server-side matching/rendering either way).
    // The fix for that — the actual cause of Cloudflare's "error 1102" on
    // "/" and other lightweight routes — was removing static top-level
    // imports of the multi-MB curriculum content data (@/data/content,
    // @/content/registry) from files reachable through every route (see
    // GalaxySearch.tsx, AcademyPage.tsx, HomeDashboard.tsx, subjects-meta.ts,
    // -reports.server.ts): those get dynamically imported client-side only
    // now, so the SSR path never has to parse them regardless of route.
    router: { autoCodeSplitting: true },
  },
  vite: {
    // vite-plugin-pwa: offline support for AcadeMY. Only the client build
    // consumes the generated /sw.js. Registration is done from a guarded
    // wrapper (src/lib/pwa-register.ts) — the plugin itself never injects
    // its own registration script (injectRegister: null) and stays disabled
    // in dev/preview (devOptions.enabled: false), so Lovable previews and
    // `vite dev` never serve a service worker.
    plugins: [
      VitePWA({
        registerType: "autoUpdate",
        injectRegister: null,
        strategies: "generateSW",
        filename: "sw.js",
        devOptions: { enabled: false },
        // We already ship a hand-maintained manifest at public/site.webmanifest
        // linked from __root.tsx. Tell the plugin not to emit or link a new one.
        manifest: false,
        workbox: {
          // Extra dev-safety: never intercept SSR / API / OAuth / auth routes.
          navigateFallback: "/index.html",
          navigateFallbackDenylist: [
            /^\/api\//,
            /^\/~oauth/,
            /^\/auth\//,
            /^\/admin/,
            /^\/_worker/,
          ],
          globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,woff,woff2}"],
          // Nitro's build root is dist/, while the PWA is served from
          // dist/client/. Strip that build-only directory prefix so Workbox
          // requests /assets/* rather than the nonexistent /client/assets/*.
          modifyURLPrefix: { "client/": "" },
          // index.html is generated by the post-Vite static-shell step, after
          // Workbox scans dist/. Declare it explicitly so navigateFallback is
          // guaranteed to resolve to a precached response at install time.
          additionalManifestEntries: [{ url: "index.html", revision: null }],
          // Reject a stale/invalid sentinel entry seen in an older deployed
          // worker. It is not a real build artifact and must never be fetched.
          manifestTransforms: [
            async (entries) => ({
              manifest: entries.filter(({ url }) => url !== "url" && url !== "/url"),
              warnings: [],
            }),
          ],
          // Geography lesson PNGs include several 5–6 MB diagrams. Keep them
          // out of the install-time precache; the same-origin image rule below
          // caches each image on demand after a student opens its chapter.
          globIgnores: [
            "**/node_modules/**",
            "client/geography/**/*.png",
            "sw.js",
            "workbox-*.js",
          ],
          maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
          cleanupOutdatedCaches: true,
          clientsClaim: true,
          skipWaiting: false,
          runtimeCaching: [
            {
              // Google Fonts stylesheets
              urlPattern: ({ url }) => url.origin === "https://fonts.googleapis.com",
              handler: "StaleWhileRevalidate",
              options: { cacheName: "google-fonts-stylesheets" },
            },
            {
              // Google Fonts webfont files
              urlPattern: ({ url }) => url.origin === "https://fonts.gstatic.com",
              handler: "CacheFirst",
              options: {
                cacheName: "google-fonts-webfonts",
                expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
                cacheableResponse: { statuses: [0, 200] },
              },
            },
            {
              // Lovable-hosted images / uploaded assets
              urlPattern: ({ url }) => url.pathname.startsWith("/__l5e/"),
              handler: "StaleWhileRevalidate",
              options: {
                cacheName: "l5e-assets",
                expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
                cacheableResponse: { statuses: [0, 200] },
              },
            },
            {
              // Same-origin images
              urlPattern: ({ request, sameOrigin }) => sameOrigin && request.destination === "image",
              handler: "StaleWhileRevalidate",
              options: {
                cacheName: "images",
                expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
              },
            },
            {
              // Educational content routes — notes, mindmaps, flashcards, chapters.
              // Stale-while-revalidate so previously opened content works offline.
              urlPattern: ({ url, sameOrigin, request }) =>
                sameOrigin &&
                request.mode === "navigate" &&
                /^\/(notes|mindmaps|flashcards|study|academy)(\/|$)/.test(url.pathname),
              handler: "StaleWhileRevalidate",
              options: {
                cacheName: "educational-pages",
                expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 14 },
              },
            },
            {
              // Default HTML navigations — NetworkFirst so users get fresh pages online,
              // but still see something when offline.
              urlPattern: ({ request, sameOrigin }) => sameOrigin && request.mode === "navigate",
              handler: "NetworkFirst",
              options: {
                cacheName: "html-pages",
                networkTimeoutSeconds: 4,
                expiration: { maxEntries: 40, maxAgeSeconds: 60 * 60 * 24 * 7 },
              },
            },
          ],
        },
      }),
    ],

    // Dev-only proxy: /__l5e/* is served by Lovable's hosting edge in preview
    // and production, but not by raw `vite dev`. Without this, images uploaded
    // via `lovable-assets create` appear as broken images on localhost:8080.
    server: {
      proxy: {
        "/__l5e": {
          target: "https://acade-my.lovable.app",
          changeOrigin: true,
          secure: true,
        },
      },
    },
    // Emit dist/client/.vite/manifest.json so scripts/generate-static-shell.js can
    // reliably find the true client entry chunk (there are multiple "index-*.js"
    // chunks in the assets dir — only the manifest disambiguates which one is the
    // real entry vs. a route chunk that happens to share the "index" name).
    build: {
      manifest: true,
    },

    // @tanstack/start-server-core@1.169+ uses dynamic '#' package-subpath imports
    // (#tanstack-router-entry, #tanstack-start-entry) that esbuild cannot resolve during
    // optimizeDeps scanning because they are missing from the package's own "imports" map.
    // The package.json has been patched (adding those keys) and stub files were created so
    // esbuild can satisfy the import; at runtime the TanStack Start Vite plugin alias takes
    // over. Excluding the packages here prevents esbuild from pre-bundling them so the
    // aliased runtime paths are used instead of the stubs.
    //
    // Root-level optimizeDeps.exclude covers the CLIENT environment (esbuild reaches
    // @tanstack/start-server-core via: router.tsx → routeTree → admin routes →
    // -admin.server.ts → supabase.server.ts → getCookies from @tanstack/start-server-core).
    optimizeDeps: {
      exclude: [
        "@tanstack/react-start",
        "@tanstack/start-server-core",
        "@tanstack/start-client-core",
        "@tanstack/start-plugin-core",
      ],
    },
    environments: {
      ssr: {
        optimizeDeps: {
          exclude: [
            "@tanstack/react-start",
            "@tanstack/react-router",
            "@tanstack/start-server-core",
            "@tanstack/start-client-core",
            "@tanstack/start-plugin-core",
            "@tanstack/router-core",
          ],
        },
      },
    },
  },
});
