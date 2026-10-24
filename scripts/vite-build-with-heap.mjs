// Runs `vite build` with a heap limit sized to the machine it runs on.
//
// `vite build` builds the client, SSR and nitro environments in one process;
// for this curriculum one environment needs ~1.8–2.0 GB of V8 heap (measured on
// Node 22.16, the Cloudflare Pages v3 default). Node's default heap limit is
// ~1/4 of RAM, so on an 8 GB builder it is ~2 GB — enough only with no margin.
//
// This wrapper raises the limit to half of physical memory, capped at 4 GB,
// and never lowers it below Node's own default. Half of RAM leaves the other
// half for native memory (esbuild, oxc minifier, buffers). An explicit
// --max-old-space-size in NODE_OPTIONS always wins. The chosen values are
// printed so the Cloudflare build log shows what the builder had.
//
// This is a safety margin, not the fix: the fix is releasing each finished
// environment's Rollup graph (vite.config.ts releaseBuildMemory and
// scripts/patch-build-memory.mjs), which keeps memory flat across environments.

import { spawn } from "node:child_process";
import { totalmem } from "node:os";
import { getHeapStatistics } from "node:v8";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MB = 1024 * 1024;
const CAP_MB = 4096;

export function chooseHeapMb({ totalMb, defaultMb, nodeOptions = "" }) {
  const explicit = nodeOptions.match(/--max-old-space-size=(\d+)/);
  if (explicit) return { heapMb: Number(explicit[1]), source: "NODE_OPTIONS" };
  const half = Math.floor(totalMb / 2);
  const heapMb = Math.max(defaultMb, Math.min(CAP_MB, half));
  return { heapMb, source: heapMb === defaultMb ? "node default" : "half of RAM, capped at 4096 MB" };
}

function main() {
  const totalMb = Math.round(totalmem() / MB);
  const defaultMb = Math.round(getHeapStatistics().heap_size_limit / MB);
  const nodeOptions = process.env.NODE_OPTIONS ?? "";
  const { heapMb, source } = chooseHeapMb({ totalMb, defaultMb, nodeOptions });
  console.log(
    `[build-heap] Node ${process.version}, ${totalMb} MB RAM, default heap ${defaultMb} MB → vite build heap ${heapMb} MB (${source})`,
  );
  const options = /--max-old-space-size=/.test(nodeOptions)
    ? nodeOptions
    : `${nodeOptions} --max-old-space-size=${heapMb}`.trim();
  const vite = join(dirname(fileURLToPath(import.meta.url)), "..", "node_modules", "vite", "bin", "vite.js");
  const child = spawn(process.execPath, [vite, "build", ...process.argv.slice(2)], {
    stdio: "inherit",
    env: { ...process.env, NODE_OPTIONS: options },
  });
  child.on("exit", (code, signal) => {
    if (signal) {
      console.error(`[build-heap] vite build terminated by ${signal}`);
      process.exit(1);
    }
    process.exit(code ?? 1);
  });
}

if (process.argv[1]?.endsWith("vite-build-with-heap.mjs")) main();
