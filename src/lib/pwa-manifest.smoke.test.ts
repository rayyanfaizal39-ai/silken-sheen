import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const manifest = JSON.parse(
  readFileSync(new URL("../../public/site.webmanifest", import.meta.url), "utf8"),
) as {
  name?: string;
  start_url?: string;
  display?: string;
  icons?: Array<{ src?: string }>;
};

const viteConfig = readFileSync(new URL("../../vite.config.ts", import.meta.url), "utf8");
const publicDir = fileURLToPath(new URL("../../public", import.meta.url));

describe("PWA install contract", () => {
  it("keeps a standalone web manifest with required fields and on-disk icons", () => {
    expect(manifest.name).toBe("AcadeMY");
    expect(manifest.start_url).toBe("/");
    expect(manifest.display).toBe("standalone");
    expect(manifest.icons?.length).toBeGreaterThan(0);

    for (const icon of manifest.icons ?? []) {
      expect(icon.src, "manifest icon is missing src").toMatch(/^\//);
      const iconPath = `${publicDir}${icon.src}`;
      expect(existsSync(iconPath), `missing icon file ${icon.src}`).toBe(true);
    }
  });

  it("keeps vite-plugin-pwa generating sw.js without auto-injected registration", () => {
    expect(viteConfig).toContain("VitePWA(");
    expect(viteConfig).toContain("injectRegister: null");
    expect(viteConfig).toContain('strategies: "generateSW"');
    expect(viteConfig).toContain('filename: "sw.js"');
  });
});
