// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// Used by the Vercel SSR deploy path (dist/server/server.js); unrelated to the
// Cloudflare Pages static deploy, which only ever consumes dist/client.
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
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
