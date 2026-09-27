import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const srcRoot = fileURLToPath(new URL("..", import.meta.url));
const FORBIDDEN = ["SUPABASE_SERVICE_ROLE_KEY", "VITE_SUPABASE_SERVICE_ROLE"] as const;

function isExcludedSource(relativePath: string) {
  return (
    relativePath.endsWith(".server.ts") ||
    relativePath.endsWith(".server.tsx") ||
    relativePath.endsWith(".test.ts") ||
    relativePath.endsWith(".test.tsx")
  );
}

function listBrowserSources(directory: string): string[] {
  const entries = readdirSync(directory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const absolutePath = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...listBrowserSources(absolutePath));
      continue;
    }
    if (!entry.isFile() || !/\.(ts|tsx)$/.test(entry.name)) continue;

    const relativePath = absolutePath.slice(srcRoot.length).replaceAll("\\", "/");
    if (isExcludedSource(relativePath)) continue;
    files.push(absolutePath);
  }

  return files;
}

describe("browser secret safety", () => {
  it("does not expose the Supabase service-role key in browser-reachable source", () => {
    const leaks: string[] = [];

    for (const file of listBrowserSources(srcRoot)) {
      const source = readFileSync(file, "utf8");
      for (const needle of FORBIDDEN) {
        if (source.includes(needle)) {
          leaks.push(`${file.slice(srcRoot.length).replaceAll("\\", "/")}: ${needle}`);
        }
      }
    }

    expect(leaks).toEqual([]);
  });
});
