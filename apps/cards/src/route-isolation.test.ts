import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const root = dirname(fileURLToPath(import.meta.url));

describe("AcadeMY Cards application boundary", () => {
  it("contains only Cards route modules", () => {
    const routes = readdirSync(join(root, "routes")).sort();
    expect(routes).toEqual([
      "__root.tsx",
      "card_.c.$publicId.tsx",
      "demo.tsx",
      "index.tsx",
      "studio.tsx",
    ]);
  });

  it("uses its own Cloudflare project and output", () => {
    const wrangler = readFileSync(join(root, "..", "wrangler.jsonc"), "utf8");
    expect(wrangler).toContain('"name": "academymy-cards"');
    expect(wrangler).toContain('"pages_build_output_dir": "dist/client"');
  });

  it("maps the cinematic Studio separately from the fictional demo", () => {
    const studio = readFileSync(join(root, "routes", "studio.tsx"), "utf8");
    const demo = readFileSync(join(root, "routes", "demo.tsx"), "utf8");
    expect(studio).toContain('createFileRoute("/studio")');
    expect(studio).toContain('import("../../../../src/features/nova-cards/StudioPage")');
    expect(demo).toContain('createFileRoute("/demo")');
    expect(demo).toContain("NovaDemoGallery");
  });

  it("keeps generation disabled in every committed environment template", () => {
    for (const name of [".env.example", ".env.preview.example", ".env.production.example"]) {
      const source = readFileSync(join(root, "..", name), "utf8");
      expect(source).toContain("NOVA_AI_ENABLED=false");
      expect(source).toContain("NOVA_AI_BATCH_ENABLED=false");
    }
  });
});
