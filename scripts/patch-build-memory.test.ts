import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  PATCH_MARKER,
  patchTailwindVite,
  patchTanStackStartCompiler,
} from "./patch-build-memory.mjs";

// Verbatim excerpts of the upstream code each patch anchors on
// (@tanstack/start-plugin-core 1.171.x, @tailwindcss/vite 4.3.x).
const TANSTACK = [
  "\tconst compilers = /* @__PURE__ */ new Map();",
  "\t\treturn {",
  "\t\t\tbuildStart() {",
  '\t\t\t\tif (this.environment.mode === "build" || bundledDev && this.environment.name === VITE_ENVIRONMENT_NAMES.client) compilers.delete(this.environment.name);',
  "\t\t\t},",
  "\t\t\twatchChange(id) {",
].join("\n");
const TAILWIND =
  'function Q(s={}){let n=[],e=null,t=new B(l=>new Map);return[{name:"@tailwindcss/vite:generate:build",apply:"build",enforce:"pre",' +
  'transform:{async handler(l,u){let c=t.get(this.environment?.name??"default");let m=c.get(u);}}}]}';

describe("build-memory patches", () => {
  it("releases TanStack Start's per-environment compiler at buildEnd", () => {
    const { status, source } = patchTanStackStartCompiler(TANSTACK);
    expect(status).toBe("patched");
    expect(source).toContain(PATCH_MARKER);
    expect(source).toMatch(/buildEnd\(\) \{[\s\S]*compilers\.delete\(this\.environment\.name\);[\s\S]*\},\n\t\t\twatchChange/);
    expect(patchTanStackStartCompiler(source).status).toBe("already-patched");
    // CRLF checkouts are normalised rather than missed.
    expect(patchTanStackStartCompiler(TANSTACK.replace(/\n/g, "\r\n")).status).toBe("patched");
  });

  it("releases @tailwindcss/vite's per-environment CSS roots at buildEnd, using the minified map name", () => {
    const { status, source } = patchTailwindVite(TAILWIND);
    expect(status).toBe("patched");
    expect(source).toContain(`enforce:"pre",buildEnd(){${PATCH_MARKER}t.delete(this.environment?.name??"default")},transform:`);
    expect(patchTailwindVite(source).status).toBe("already-patched");
    const renamed = TAILWIND.replaceAll("t.get(", "zz.get(");
    expect(patchTailwindVite(renamed).source).toContain("zz.delete(");
  });

  it("refuses to guess when upstream code changes shape", () => {
    expect(patchTanStackStartCompiler("export const nothing = 1;").status).toBe("anchor-missing");
    expect(patchTailwindVite('{name:"@tailwindcss/vite:generate:build",apply:"build",enforce:"pre",transform:{}}').status).toBe("anchor-missing");
  });

  it("is applied to the installed packages (postinstall ran)", () => {
    for (const file of [
      "node_modules/@tanstack/start-plugin-core/dist/esm/vite/start-compiler-plugin/plugin.js",
      "node_modules/@tailwindcss/vite/dist/index.mjs",
    ]) expect(readFileSync(file, "utf8"), file).toContain(PATCH_MARKER);
  });
});
