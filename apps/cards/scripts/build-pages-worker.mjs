import {
  cpSync,
  existsSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const serverDir = join(root, "dist/server");
const clientDir = join(root, "dist/client");
const workerDir = join(clientDir, "_worker.js");

if (!existsSync(serverDir) || !existsSync(clientDir)) {
  throw new Error("[cards] Expected both dist/server and dist/client after the Vite build.");
}

rmSync(workerDir, { recursive: true, force: true });
cpSync(serverDir, workerDir, { recursive: true });

const entryMjs = join(workerDir, "index.mjs");
const entryJs = join(workerDir, "index.js");
if (!existsSync(entryMjs)) throw new Error(`[cards] Missing Pages Worker entry ${entryMjs}`);
renameSync(entryMjs, entryJs);
rmSync(join(workerDir, "wrangler.json"), { force: true });

writeFileSync(
  join(clientDir, "_routes.json"),
  JSON.stringify(
    {
      version: 1,
      include: ["/*"],
      exclude: [
        "/assets/*",
        "/branding/*",
        "/nova/*",
        "/nova-cards/*",
        "/favicon.ico",
        "/site.webmanifest",
        "/robots.txt",
      ],
    },
    null,
    2,
  ),
);

rmSync(join(root, ".wrangler"), { recursive: true, force: true });
rmSync(join(serverDir, "wrangler.json"), { force: true });

console.log("[cards] Packaged dist/client/_worker.js for Cloudflare Pages Advanced Mode.");
