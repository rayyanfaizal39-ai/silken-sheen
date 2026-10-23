// @vitest-environment jsdom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

const getMyCard = vi.hoisted(() => vi.fn());
vi.mock("./server", () => ({
  getMyCard,
  getCardForExport: vi.fn(),
  getPublicCard: vi.fn(),
  setSharing: vi.fn(),
  getNovaEntitlement: vi.fn(),
}));

import { CandidateProfile } from "./sanctuary/CandidateProfile";
import type { CompanionCandidate } from "./companion-candidates";
import { DEMO_CARDS } from "./model";

const env = globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean };
env.IS_REACT_ACT_ENVIRONMENT = true;
const roots: ReturnType<typeof createRoot>[] = [];

beforeAll(() => {
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
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
  getMyCard.mockReset();
});

const fox: CompanionCandidate = {
  id: "a",
  name: "Lumi",
  species: "Magical Fox",
  element: "Starlight",
  personality: "Explorer",
  description: "A quiet fox of starlight.",
  qualities: ["curious"],
  abilities: ["glow"],
};

async function open(fictional: boolean, publicId?: string) {
  const host = document.createElement("div");
  document.body.append(host);
  const root = createRoot(host);
  roots.push(root);
  await act(async () => {
    root.render(
      <CandidateProfile
        companion={fox}
        username="Rayyan"
        fictional={fictional}
        publicId={publicId}
      />,
    );
  });
  const button = [...host.querySelectorAll("button")].find((node) =>
    node.textContent?.includes("View Full Card"),
  );
  await act(async () => button!.click());
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 30));
  });
  return host;
}

describe("View Full Card", () => {
  it("shows the portrait flip card for a fictional preview without calling the server", async () => {
    const host = await open(true, DEMO_CARDS[0].publicId);
    const dialog = host.querySelector("dialog")!;
    expect(dialog.className).toContain("ccprof-flip");
    expect(dialog.className).not.toContain("occ-detail");
    const card = dialog.querySelector(".nova-card-object")!;
    expect(card).toBeTruthy();
    expect(dialog.querySelector(".nova-serial")?.textContent).toBe(DEMO_CARDS[0].serial);
    expect(dialog.querySelector(".nova-serial")?.textContent).toMatch(/^[CREML]\d{11}$/);
    expect(dialog.querySelector(".nova-barcode")?.getAttribute("alt")).toContain(DEMO_CARDS[0].serial);
    expect(dialog.textContent).toContain("Magical Fox");
    expect(dialog.textContent).not.toContain("Phoenix");
    await act(async () => (card as HTMLButtonElement).click());
    expect(card.classList.contains("is-flipped")).toBe(true);
    expect(getMyCard).not.toHaveBeenCalled();
  });

  it("shows the saved card once, and no invented serial when loading fails", async () => {
    getMyCard.mockResolvedValue({
      ...DEMO_CARDS[1],
      publicId: "9b4c6f6e-55e6-4b52-9d5f-3c1c0f6e2a11",
      demo: false,
      traits: null,
      companion: {
        archetypeId: "lumi",
        name: "Lumi",
        species: "Magical Fox",
        element: "Starlight",
        personality: "Explorer",
        tagline: "Starlight",
        description: "A quiet fox of starlight.",
        traits: ["curious"],
        abilities: ["glow"],
      },
    });
    const host = await open(false);
    expect(getMyCard).toHaveBeenCalledOnce();
    expect(host.querySelector(".nova-serial")?.textContent).toBe(DEMO_CARDS[1].serial);
    await act(async () => {
      host.querySelector("dialog button")?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    getMyCard.mockRejectedValue(new Error("Nova cards are temporarily unavailable."));
    const failed = await open(false);
    expect(failed.querySelector(".nova-serial")).toBeNull();
    expect(failed.textContent).toContain("temporarily unavailable");
  });
});
