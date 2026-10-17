// Release per-environment build caches that otherwise keep whole Rollup module
// graphs alive between `vite build` environments.
//
// WHY: `vite build` builds the client, SSR and nitro environments in one Node
// process. A Rollup graph for this curriculum is ~1.2 GB of heap. Two plugins
// cache an object per environment that closes over Rollup's plugin context
// (`this`), and never drop it, so each finished graph stays reachable:
//
//   - @tanstack/start-plugin-core: the server-fn plugin keeps a StartCompiler
//     per environment in a module-level `compilers` Map; its loadModule /
//     getKnownServerFns closures capture `this`. The plugin only deletes the
//     entry on the *same* environment's next buildStart, which never comes.
//   - @tailwindcss/vite: the build plugin keeps a Map of CSS roots per
//     environment; each root's compiler holds `R => this.addWatchFile(R)`.
//
// Measured with heap snapshots (Node 22.16): after the client build 1.46 GB
// stayed live, after SSR 2.6 GB, and the nitro build ran out of heap, which is
// the Cloudflare Pages failure (exit 134). Neither upstream release fixes it as
// of @tanstack/start-plugin-core 1.171.54 and @tailwindcss/vite 4.3.3.
//
// Each patch adds a `buildEnd` hook that drops the finished environment's
// entry. All transforms have run by buildEnd, so nothing reads the cache
// afterwards. Patches are idempotent (marked with PATCH_MARKER) and anchored on
// the exact upstream source: if a package changes shape the patch is skipped
// with a warning rather than guessing.

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export const PATCH_MARKER = "/* academy:release-build-memory */";

/** TanStack Start: forget the environment's StartCompiler once it has built. */
export function patchTanStackStartCompiler(source) {
  if (source.includes(PATCH_MARKER)) return { status: "already-patched", source };
  const anchor =
    '\t\t\tbuildStart() {\n\t\t\t\tif (this.environment.mode === "build" || bundledDev && this.environment.name === VITE_ENVIRONMENT_NAMES.client) compilers.delete(this.environment.name);\n\t\t\t},';
  const normalized = source.replace(/\r\n/g, "\n");
  if (!normalized.includes(anchor) || !normalized.includes("const compilers = ")) return { status: "anchor-missing", source };
  const hook = `\n\t\t\tbuildEnd() {\n\t\t\t\t${PATCH_MARKER}\n\t\t\t\tif (this.environment.mode === "build") compilers.delete(this.environment.name);\n\t\t\t},`;
  return { status: "patched", source: normalized.replace(anchor, anchor + hook) };
}

/** @tailwindcss/vite: drop the environment's cached CSS roots once it has built. */
export function patchTailwindVite(source) {
  if (source.includes(PATCH_MARKER)) return { status: "already-patched", source };
  const pluginStart = '{name:"@tailwindcss/vite:generate:build",apply:"build",enforce:"pre",';
  const at = source.indexOf(pluginStart);
  if (at < 0) return { status: "anchor-missing", source };
  // The roots map is minified; read its name from the build handler itself:
  //   let c=t.get(this.environment?.name??"default")
  const handler = source.slice(at, at + 2000);
  const lookup = handler.match(/let \w+=(\w+)\.get\(this\.environment\?\.name\?\?"default"\)/);
  if (!lookup) return { status: "anchor-missing", source };
  const hook = `buildEnd(){${PATCH_MARKER}${lookup[1]}.delete(this.environment?.name??"default")},`;
  return { status: "patched", source: source.replace(pluginStart, pluginStart + hook) };
}

const TARGETS = [
  {
    name: "@tanstack/start-plugin-core",
    file: "node_modules/@tanstack/start-plugin-core/dist/esm/vite/start-compiler-plugin/plugin.js",
    patch: patchTanStackStartCompiler,
  },
  {
    name: "@tailwindcss/vite",
    file: "node_modules/@tailwindcss/vite/dist/index.mjs",
    patch: patchTailwindVite,
  },
];

export function applyBuildMemoryPatches(root, log = console.log) {
  const results = [];
  for (const target of TARGETS) {
    const path = join(root, target.file);
    if (!existsSync(path)) {
      log(`[postinstall] ${target.name} not found, skipping build-memory patch.`);
      results.push({ name: target.name, status: "not-installed" });
      continue;
    }
    const { status, source } = target.patch(readFileSync(path, "utf8"));
    if (status === "patched") writeFileSync(path, source);
    log(
      status === "patched"
        ? `[postinstall] Patched ${target.name}: release build cache at buildEnd`
        : status === "already-patched"
          ? `[postinstall] ${target.name} build-memory patch already applied, skipping.`
          : `[postinstall] WARNING: ${target.name} changed shape; build-memory patch NOT applied. ` +
            "Builds may run out of heap — re-check scripts/patch-build-memory.mjs.",
    );
    results.push({ name: target.name, status });
  }
  return results;
}
