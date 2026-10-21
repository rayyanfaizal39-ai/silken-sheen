// @vitest-environment jsdom
// The fictional and connected previews must never reach real accounts: no server function is
// called, nothing is saved, and server code never reads preview fixtures.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
vi.mock("./studio.server", () => ({
  getStudioState: vi.fn(),
  saveStudioDraft: vi.fn(),
  submitStudioOrigin: vi.fn(),
  chooseStudioOrigin: vi.fn(),
}));
vi.mock("./server", () => ({
  getMyCard: vi.fn(),
  getPublicCard: vi.fn(),
  getCardForExport: vi.fn(),
  setSharing: vi.fn(),
  getNovaEntitlement: vi.fn(),
}));
import * as studioServer from "./studio.server";
import * as cardServer from "./server";
import StudioMockPreview from "./StudioMockPreview";
import { CONNECTED_PREVIEW_COMPANIONS } from "./connected-preview-fixture";

const env = globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean };
env.IS_REACT_ACT_ENVIRONMENT = true;
const roots: ReturnType<typeof createRoot>[] = [];
beforeAll(() => {
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() })),
  );
  HTMLDialogElement.prototype.showModal = function () {
    this.open = true;
  };
  HTMLDialogElement.prototype.close = function () {
    this.open = false;
  };
});
afterEach(async () => {
  for (const root of roots) await act(async () => root.unmount());
  roots.length = 0;
  document.body.innerHTML = "";
  sessionStorage.clear();
});
const click = async (scope: ParentNode, text: string) => {
  const target = [...scope.querySelectorAll("button")].find((b) => b.textContent?.includes(text));
  expect(target, `Missing ${text}`).toBeTruthy();
  await act(async () => target!.click());
};
const sourcePath = (file: string) => resolve(process.cwd(), "src/features/nova-cards", file);
const serverCalls = () =>
  [...Object.values(studioServer), ...Object.values(cardServer)]
    .filter((fn): fn is ReturnType<typeof vi.fn> => vi.isMockFunction(fn))
    .reduce((n, fn) => n + fn.mock.calls.length, 0);

describe("preview isolation", () => {
  for (const connected of [false, true])
    it(`${connected ? "connected" : "fictional"} preview reveals and chooses without any server call`, async () => {
      window.history.replaceState(null, "", "/nova/studio?scene=reveal");
      const host = document.createElement("div");
      document.body.append(host);
      const root = createRoot(host);
      roots.push(root);
      await act(async () =>
        root.render(<StudioMockPreview profile="rayyan" connected={connected} />),
      );
      await click(host, "Hatch egg");
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 5));
      });
      await click(host, "Choose Companion B");
      await click(host, "Confirm My Companion");
      await click(host.querySelector("dialog")!, "Confirm my companion");
      expect(host.querySelector("h1")?.textContent).toMatch(/^Your /);
      // Always labelled as a preview, never as a saved companion.
      expect(host.textContent).toMatch(/FICTIONAL PREVIEW|CONNECTED PREVIEW/);
      expect(host.textContent).toContain("not a saved companion");
      if (connected)
        expect(host.querySelector("h1")?.textContent).toBe(
          `Your ${CONNECTED_PREVIEW_COMPANIONS[1].name}`,
        );
      expect(serverCalls()).toBe(0);
    });

  it("keeps preview data out of every server module", () => {
    for (const file of ["studio.server.ts", "server.ts", "entitlement.ts"]) {
      const source = readFileSync(sourcePath(file), "utf8");
      expect(source, file).not.toMatch(
        /connected-preview-fixture|StudioMockPreview|FICTIONAL_CANDIDATES|DEMO_CARDS.*companion/,
      );
    }
    // The preview never imports real server functions.
    const preview = readFileSync(sourcePath("StudioMockPreview.tsx"), "utf8");
    expect(preview).not.toMatch(/from "\.\/(studio\.server|server)"/);
  });
});
