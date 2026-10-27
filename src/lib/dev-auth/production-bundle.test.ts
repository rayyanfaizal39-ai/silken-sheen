import path from "node:path";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import * as esbuild from "esbuild";

const root = path.resolve(import.meta.dirname, "../../..");
const prodDefine = {
  "import.meta.env.DEV": "false",
  "import.meta.env.PROD": "true",
  "import.meta.env.VITE_DEV_AUTH_BYPASS": '"true"',
};

function externalizeExceptDevAuth(): esbuild.Plugin {
  return {
    name: "externalize-app",
    setup(build) {
      build.onResolve({ filter: /.*/ }, (args) => {
        if (args.kind === "entry-point") return null;
        if (args.path.includes("dev-auth") || args.path.startsWith(".")) return null;
        return { path: args.path, external: true };
      });
    },
  };
}

describe("dev auth bypass production bundle", () => {
  it("drops the demo student session when DEV is false, even with the flag set", async () => {
    const result = await esbuild.build({
      absWorkingDir: path.join(root, "src/lib/dev-auth"),
      stdin: {
        contents: `
          import { isDevAuthBypassEnabled } from "./index.ts";
          import { DevSignInSlot } from "./DevSignInSlot.tsx";
          export async function boot(active: boolean) {
            if (import.meta.env.DEV && isDevAuthBypassEnabled("localhost", false)) {
              const session = await import("./session.ts");
              session.signInDevStudent();
              return "on";
            }
            return { status: "off", slot: DevSignInSlot, active };
          }
        `,
        resolveDir: path.join(root, "src/lib/dev-auth"),
        sourcefile: "prod-entry.ts",
        loader: "ts",
      },
      bundle: true,
      format: "esm",
      write: false,
      platform: "browser",
      jsx: "automatic",
      treeShaking: true,
      define: prodDefine,
      plugins: [externalizeExceptDevAuth()],
    });
    const code = result.outputFiles[0].text;
    expect(code).toContain('status: "off"');
    expect(code).toContain("await null");
    expect(code).not.toContain("form1.student@dev.local");
    expect(code).not.toContain("form2.student@dev.local");
    expect(code).not.toContain("academymy.dev-auth.v1");
    expect(code).not.toContain("matchCompanions");
    expect(code).not.toContain("DevSignInPanel.tsx");

    const minified = await esbuild.build({
      absWorkingDir: path.join(root, "src/lib/dev-auth"),
      stdin: {
        contents: `
          import { isDevAuthBypassEnabled } from "./index.ts";
          export async function boot() {
            if (import.meta.env.DEV && isDevAuthBypassEnabled("localhost", false)) {
              const session = await import("./session.ts");
              session.signInDevStudent();
              return "on";
            }
            return "off";
          }
        `,
        resolveDir: path.join(root, "src/lib/dev-auth"),
        sourcefile: "prod-entry.ts",
        loader: "ts",
      },
      bundle: true,
      format: "esm",
      write: false,
      platform: "browser",
      minifySyntax: true,
      treeShaking: true,
      define: prodDefine,
    });
    const min = minified.outputFiles[0].text;
    expect(min).toContain('return "off"');
    expect(min).not.toContain("form1.student@dev.local");
    expect(min).not.toContain("signInDevStudent");
    expect(min).not.toContain("academymy.dev-auth.v1");

    const live = readFileSync(path.join(root, "src/lib/dev-auth/index.ts"), "utf8");
    expect(live).toMatch(/if \(!import\.meta\.env\.DEV\) return false;/);
  });

  it("does not keep the local card store on the production studio or public-card path", async () => {
    const result = await esbuild.build({
      absWorkingDir: root,
      entryPoints: [path.join(root, "src/features/nova-cards/local-session.ts")],
      bundle: true,
      format: "esm",
      write: false,
      platform: "browser",
      treeShaking: true,
      define: prodDefine,
      plugins: [externalizeExceptDevAuth()],
    });
    const code = result.outputFiles[0].text;
    expect(code).not.toContain("dev-auth/store");
    expect(code).not.toContain("dev-auth/server-gate");
    expect(code).not.toContain("public-registry");
    expect(code).not.toContain("local-artwork");
    expect(code).not.toContain("/nova/creatures/");
    expect(code).not.toContain("form1.student@dev.local");
    expect(code).not.toContain("academymy.dev-auth.v1");
  });

  it("drops the local artwork stand-in from the dashboard hook in production", async () => {
    const result = await esbuild.build({
      absWorkingDir: path.join(root, "src/lib/dev-auth"),
      stdin: {
        contents: `
          import { useDevDemoCompanion } from "./use-dev-demo-companion.ts";
          export function Demo() {
            return useDevDemoCompanion();
          }
        `,
        resolveDir: path.join(root, "src/lib/dev-auth"),
        sourcefile: "prod-dashboard.ts",
        loader: "ts",
      },
      bundle: true,
      format: "esm",
      write: false,
      platform: "browser",
      jsx: "automatic",
      treeShaking: true,
      define: prodDefine,
      plugins: [externalizeExceptDevAuth()],
    });
    const code = result.outputFiles[0].text;
    expect(code).not.toContain("local-artwork");
    expect(code).not.toContain("/nova/creatures/phoenix.svg");
    expect(code).not.toContain("/nova/creatures/fox.svg");
    expect(code).not.toContain("form1.student@dev.local");
    expect(code).not.toContain("academymy.dev-auth.v1");
    expect(code).not.toContain("matchCompanions");
  });

  it("drops the staff craft queue from the admin screen when DEV is false", async () => {
    const result = await esbuild.build({
      absWorkingDir: root,
      entryPoints: [path.join(root, "src/routes/admin.companion-craft.tsx")],
      bundle: true,
      format: "esm",
      write: false,
      platform: "browser",
      jsx: "automatic",
      treeShaking: true,
      define: prodDefine,
      plugins: [
        externalizeExceptDevAuth(),
        {
          name: "empty-css",
          setup(build) {
            build.onResolve({ filter: /\.css$/ }, (args) => ({
              path: args.path,
              namespace: "empty-css",
            }));
            build.onLoad({ filter: /.*/, namespace: "empty-css" }, () => ({
              contents: "",
              loader: "js",
            }));
          },
        },
      ],
    });
    const code = result.outputFiles[0].text;
    expect(code).not.toContain("staff@dev.local");
    expect(code).not.toContain("academymy.dev-auth.v1");
    expect(code).not.toContain("devAttachCraftOptions");
    expect(code).not.toContain("dev-auth/store");
    expect(code).not.toContain("dev-auth/craft-dev");
  });
});
