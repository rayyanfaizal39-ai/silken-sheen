// @vitest-environment jsdom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
vi.mock("./studio.server", () => ({
  getStudioState: vi.fn(),
  saveStudioDraft: vi.fn(),
  submitStudioOrigin: vi.fn(),
  chooseStudioOrigin: vi.fn(),
}));
vi.mock("./StudioCompletedCard", () => ({ default: () => <p>Saved collectible</p> }));
import { StudioExperience, type StudioApi } from "./StudioPage";
import { FICTIONAL_CANDIDATES } from "./companion-candidates";
import { DEMO_CARDS, traitsFromAnswers } from "./model";
import type { StudioState } from "./studio-model";

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
});

const answers = Array(12).fill(0);
/** The preview's ready-to-reveal state: the identity traits are the demo Phoenix. */
function readyPreview(): { api: StudioApi; get: () => StudioState } {
  let state: StudioState = {
    active: true,
    enabled: true,
    draft: { answers, username: "Rayyan", revision: 1 },
    publicId: DEMO_CARDS[0].publicId,
    identity: { version: "nova-identity-v1", answers, traits: traitsFromAnswers(answers) },
    selected: null,
    origin: {
      status: "ready",
      revealAfter: "2026-10-16T16:00:00Z",
      ready: true,
      errorCode: null,
      completed: 2,
    },
    candidates: [
      { candidate: "a", url: "https://example.test/a.png" },
      { candidate: "b", url: "https://example.test/b.png" },
    ],
  };
  return {
    api: {
      load: async () => structuredClone(state),
      save: vi.fn(),
      submit: vi.fn(),
      choose: vi.fn(async (candidate) => {
        state = { ...state, selected: candidate, candidates: [] };
        return structuredClone(state);
      }),
    },
    get: () => state,
  };
}
async function render(element: React.ReactNode) {
  const host = document.createElement("div");
  document.body.append(host);
  const root = createRoot(host);
  roots.push(root);
  await act(async () => root.render(element));
  return host;
}
const button = (scope: ParentNode, text: string) =>
  [...scope.querySelectorAll("button")].find((b) => b.textContent?.includes(text))!;
async function chooseAndConfirm(host: HTMLElement, label: "Companion A" | "Companion B") {
  await act(async () => button(host, "Hatch egg").click());
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 5));
  });
  await act(async () => button(host, `Choose ${label}`).click());
  await act(async () => button(host, "Confirm My Companion").click());
  await act(async () => button(host.querySelector("dialog")!, "Confirm my companion").click());
}

describe("Confirmed companion in the fictional preview", () => {
  for (const [index, label] of [
    [0, "Companion A"],
    [1, "Companion B"],
  ] as const) {
    it(`keeps ${label}'s own data from the comparison through to the final card`, async () => {
      const chosen = FICTIONAL_CANDIDATES[index];
      const other = FICTIONAL_CANDIDATES[1 - index];
      const preview = readyPreview();
      const host = await render(
        <StudioExperience api={preview.api} fictional previewCompanions={FICTIONAL_CANDIDATES} />,
      );
      await chooseAndConfirm(host, label);

      expect(preview.api.choose).toHaveBeenCalledExactlyOnceWith(chosen.id);
      expect(host.querySelector("h1")?.textContent).toBe(`Your ${chosen.name}`);
      const panel = host.querySelector(".ccprof-column")!;
      expect(host.querySelector("#ccprof-match-title")?.textContent).toBe(
        `Why You and ${chosen.name} Match`,
      );
      expect(host.querySelector("#ccprof-story-title")?.textContent).toBe(
        `The Story of ${chosen.name}`,
      );
      expect(host.querySelector(".ccprof-story p")?.textContent).toBe(chosen.description);
      expect(host.querySelector(".ccprof-match p")?.textContent).toBe(chosen.reason);
      expect(host.querySelector(".ccprof-tagline")?.textContent).toBe(`“${chosen.uniqueQuality}”`);
      expect(panel.textContent).toContain(chosen.personality);
      expect(panel.textContent).toContain(chosen.element);
      expect(panel.textContent).toContain(chosen.description);
      expect(panel.textContent).toContain(chosen.reason);
      expect(panel.textContent).toContain("Fictional preview");
      // The card is the same candidate card: its name, element and placeholder art.
      const card = host.querySelector(".ccprof-card .occ-card")!;
      expect(card.getAttribute("data-tone")).toBe(chosen.id);
      expect(card.querySelector("h2")?.textContent).toBe(chosen.name);
      expect(card.querySelector(".occ-mystery")).not.toBeNull();
      expect(card.querySelector("img")).toBeNull();
      // Nothing from the other candidate or the demo identity leaks in.
      expect(host.textContent).not.toContain(other.name);
      expect(host.textContent).not.toContain("Phoenix");
      expect(host.textContent).not.toContain("Saved collectible");
      // Locked: the choice can't be reopened or made again.
      expect(button(host, "Choose Companion")).toBeUndefined();
      expect(host.querySelectorAll("[data-nova-answer]")).toHaveLength(0);
    });
  }

  it("returns a selected preview student straight to the same companion profile", async () => {
    const preview = readyPreview();
    await chooseAndConfirm(
      await render(
        <StudioExperience api={preview.api} fictional previewCompanions={FICTIONAL_CANDIDATES} />,
      ),
      "Companion B",
    );
    // A fresh visit (refresh / return through the portal) restores from the saved state.
    const again = await render(
      <StudioExperience api={preview.api} fictional previewCompanions={FICTIONAL_CANDIDATES} />,
    );
    expect(again.querySelector("h1")?.textContent).toBe("Your Sol");
    expect(again.querySelectorAll("[data-nova-answer]")).toHaveLength(0);
    expect(again.textContent).not.toContain("Begin My Journey");
  });

  it("keeps the real saved card for real accounts", async () => {
    const preview = readyPreview();
    await preview.api.choose("b");
    const host = await render(<StudioExperience api={preview.api} />);
    expect(host.textContent).toContain("Saved collectible");
    expect(host.querySelector(".ccprof-panel")).toBeNull();
  });
});
