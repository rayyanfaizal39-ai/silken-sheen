import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: {
    preset: "cloudflare-module",
    output: { dir: "dist", serverDir: "dist/server", publicDir: "dist/client" },
    cloudflare: { nodeCompat: true, deployConfig: true },
  },
  tanstackStart: {
    server: { entry: "server" },
    client: { entry: "client" },
    router: { autoCodeSplitting: true },
  },
  vite: {
    define: {
      "import.meta.env.VITE_CARDS_STANDALONE": JSON.stringify("true"),
    },
    resolve: {
      // The shared Nova domain module lives at the repository root. Resolve
      // all of its runtime packages from this standalone app's locked tree.
      dedupe: [
        "react",
        "react-dom",
        "qrcode",
        "zod",
        "lucide-react",
        "@supabase/ssr",
        "@supabase/supabase-js",
        "@tanstack/react-router",
        "@tanstack/react-start",
        "@tanstack/start-server-core",
      ],
    },
    build: { sourcemap: true },
  },
});
