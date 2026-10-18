import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const path = join(root, "dist/server/wrangler.json");

if (!existsSync(path)) {
  throw new Error(`[cards] Expected Nitro output at ${path}`);
}

const config = JSON.parse(readFileSync(path, "utf8"));
if (!config.assets) throw new Error("[cards] Nitro did not emit an assets configuration.");

config.assets.not_found_handling = "none";
config.assets.run_worker_first = [
  "/**",
  "!/assets/**",
  "!/branding/**",
  "!/nova/**",
  "!/nova-cards/**",
  "!/favicon.ico",
  "!/site.webmanifest",
  "!/robots.txt",
];
config.compatibility_date = "2025-09-24";

writeFileSync(path, JSON.stringify(config, null, 2));
console.log("[cards] Patched Nitro's generated Cloudflare assets configuration.");
