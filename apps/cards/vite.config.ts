import { existsSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const appRoot = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(appRoot, "../..");
const cardsSrc = resolve(appRoot, "src") + "/";
const suffixes = ["", ".ts", ".tsx", ".js", ".mjs", ".css", "/index.ts", "/index.tsx"];

function existingFile(base: string) {
  for (const suffix of suffixes) {
    const file = base + suffix;
    if (existsSync(file) && statSync(file).isFile()) return file;
  }
  return null;
}

/**
 * Cards sources win. The app's path plugin rewrites `@/` to apps/cards/src even
 * when that file is not there, so shared Nova imports fall through to the repo.
 */
function resolveAcademyImport(source: string) {
  const targets: string[] = [];
  if (source.startsWith("@/")) targets.push(source.slice(2));
  if (source.startsWith(cardsSrc)) targets.push(source.slice(cardsSrc.length));
  for (const target of targets) {
    const local = existingFile(resolve(appRoot, "src", target));
    if (local) return source.startsWith("@/") ? local : null;
    const shared = existingFile(resolve(repoRoot, "src", target));
    if (shared) return shared;
  }
  return null;
}

const academySharedAlias = {
  name: "academy-shared-alias",
  enforce: "pre" as const,
  resolveId(source: string) {
    return resolveAcademyImport(source);
  },
};

export default defineConfig({
  plugins: [academySharedAlias],
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
    server: {
      fs: { allow: [appRoot, repoRoot] },
    },
    build: { sourcemap: true },
  },
});
