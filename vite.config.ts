// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

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
    preset: "cloudflare-module",
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
  },
  vite: {
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
