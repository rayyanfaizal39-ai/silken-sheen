// @vitest-environment jsdom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { NovaCard as Card } from "./model";

const env = globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean };
env.IS_REACT_ACT_ENVIRONMENT = true;

const card: Card = {
  publicId: "00000000-0000-4000-8000-00000000d101",
  serial: "000000000101",
  username: "Aisha",
  traits: null,
  companion: {
    archetypeId: "fox",
    name: "Lumi",
    species: "Magical Fox",
    element: "Starlight",
    personality: "Gentle",
    tagline: "A quiet light",
    description: "A starlight fox.",
    traits: ["curious"],
    abilities: ["glow"],
  },
  variant: "a",
  rarity: "Rare",
  stage: 1,
  sharing: false,
  artworkUrl: "https://example.test/lumi.png",
};

const loadOwnerNova = vi.fn();
const updateCardSharing = vi.fn();
const republishOwnedDevCard = vi.fn();

vi.mock("./local-session", () => ({
  loadOwnerNova: (...args: unknown[]) => loadOwnerNova(...args),
  updateCardSharing: (...args: unknown[]) => updateCardSharing(...args),
  republishOwnedDevCard: (...args: unknown[]) => republishOwnedDevCard(...args),
}));

vi.mock("./CraftArtChoice", () => ({
  LiveCraftArtChoice: () => null,
}));

vi.mock("./server", () => ({
  getCardForExport: vi.fn(),
  getPublicCard: vi.fn(),
}));

import { NovaStudio } from "./NovaStudio";

const roots: ReturnType<typeof createRoot>[] = [];
afterEach(async () => {
  for (const root of roots) await act(async () => root.unmount());
  roots.length = 0;
  document.body.innerHTML = "";
  vi.clearAllMocks();
});

beforeEach(() => {
  loadOwnerNova.mockResolvedValue([card, { active: true, status: "active" }]);
  updateCardSharing.mockResolvedValue({ ...card, sharing: true });
  Object.assign(navigator, {
    clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
  });
});

async function mountStudio() {
  const host = document.createElement("div");
  document.body.append(host);
  const root = createRoot(host);
  roots.push(root);
  await act(async () => {
    root.render(<NovaStudio />);
  });
  await act(async () => {
    await Promise.resolve();
  });
  return host;
}

describe("Nova collection settings", () => {
  it("keeps the card visible while Refreshing… and shows a Permanent Card URL", async () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
    let release!: () => void;
    const gate = new Promise<void>((resolve) => {
      release = resolve;
    });
    loadOwnerNova
      .mockResolvedValueOnce([card, { active: true, status: "active" }])
      .mockImplementationOnce(async () => {
        await gate;
        return [card, { active: true, status: "active" }];
      });

    const host = await mountStudio();
    expect(host.querySelector("[data-permanent-card-url]")?.textContent).toContain(
      "Permanent Card URL",
    );
    expect(host.querySelector("[data-permanent-card-url]")?.textContent).toContain(
      "/card/c/00000000-0000-4000-8000-00000000d101",
    );
    expect(host.textContent).toContain(
      "Other people can open it only when you enable public sharing",
    );
    expect(host.querySelector(".nova-viewer")).not.toBeNull();

    const refresh = [...host.querySelectorAll("button")].find((button) =>
      button.textContent?.includes("Refresh card"),
    )!;
    await act(async () => {
      refresh.click();
    });
    expect(host.textContent).toContain("Refreshing…");
    expect(host.querySelector(".nova-viewer")).not.toBeNull();
    expect(host.textContent).not.toContain("Checking your Nova and subscription…");

    await act(async () => {
      release();
      await gate;
    });
    expect(host.textContent).toContain("Card refreshed.");
  });

  it("copies the permanent URL without requiring sharing to be on", async () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
    const host = await mountStudio();
    const panel = host.querySelector("[data-permanent-card-url]")!;
    expect(panel.querySelector("a")).toBeNull();
    expect(panel.querySelector(".nova-share-url")?.textContent).toContain(
      "/card/c/00000000-0000-4000-8000-00000000d101",
    );
    const copy = [...host.querySelectorAll("button")].find((button) =>
      button.textContent?.includes("Copy URL"),
    )!;
    await act(async () => {
      copy.click();
    });
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      expect.stringContaining("/card/c/00000000-0000-4000-8000-00000000d101"),
    );
    expect(host.textContent).toContain(
      "Other people can open it only after you enable public sharing",
    );
  });

  it("links the permanent URL when public sharing is on", async () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
    loadOwnerNova.mockResolvedValue([{ ...card, sharing: true }, { active: true, status: "active" }]);
    const host = await mountStudio();
    const panel = host.querySelector("[data-permanent-card-url]")!;
    const link = panel.querySelector("a");
    expect(link?.getAttribute("href")).toContain(
      "/card/c/00000000-0000-4000-8000-00000000d101",
    );
    expect(panel.textContent).toContain(
      "Public sharing is on. Anyone with this link can view your card.",
    );
    const copy = [...host.querySelectorAll("button")].find((button) =>
      button.textContent?.includes("Copy URL"),
    )!;
    await act(async () => {
      copy.click();
    });
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      expect.stringContaining("/card/c/00000000-0000-4000-8000-00000000d101"),
    );
    expect(host.textContent).toContain(
      "Anyone with the link can open it while sharing is on",
    );
  });
});
