import { describe, expect, it } from "vitest";
import type { NovaCard } from "@/features/nova-cards/model";
import { resolvePortalDisplay } from "./portal-display";

const selectedCard = {
  publicId: "00000000-0000-4000-8000-00000000d101",
  serial: "R-4H7K2M9P",
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
  variant: "b",
  rarity: "Rare",
  stage: 1,
  sharing: false,
  artworkUrl: "https://example.test/owner-portrait.png",
  artworkPath: "owner/path.png",
} as NovaCard;

describe("resolvePortalDisplay", () => {
  it("shows a neutral loading portal without fictional creatures", () => {
    const view = resolvePortalDisplay({
      ready: false,
      stage: "new",
      problem: false,
      card: null,
    });
    expect(view.kind).toBe("loading");
    expect(view.background).toBe("portal");
    expect(view.portrait).toBeUndefined();
  });

  it("uses discovery portal copy for guests and new journeys", () => {
    const view = resolvePortalDisplay({
      ready: true,
      stage: "new",
      problem: false,
      card: null,
    });
    expect(view).toMatchObject({
      kind: "new",
      background: "portal",
      headline: "Your Cosmic Companion Awaits",
      cta: "Discover My Companion",
    });
  });

  it("uses egg waiting art for unfinished and crafting states", () => {
    expect(
      resolvePortalDisplay({ ready: true, stage: "unfinished", problem: false, card: null }),
    ).toMatchObject({
      kind: "unfinished",
      background: "egg",
      cta: "Continue My Journey",
    });
    expect(
      resolvePortalDisplay({ ready: true, stage: "waiting", problem: false, card: null }),
    ).toMatchObject({
      kind: "waiting",
      background: "egg",
      headline: "Your Portrait Is Being Crafted",
      cta: "Check My Journey",
    });
  });

  it("treats two staff art options as choice-ready without inventing a portrait", () => {
    const view = resolvePortalDisplay({
      ready: true,
      stage: "waiting",
      problem: false,
      card: {
        ...selectedCard,
        artworkUrl: undefined,
        artworkPath: undefined,
        artOptions: [
          { option: 1, url: "https://example.test/a.png" },
          { option: 2, url: "https://example.test/b.png" },
        ],
      },
    });
    expect(view.kind).toBe("ready");
    expect(view.background).toBe("egg");
    expect(view.cta).toBe("Choose My Portrait");
    expect(view.portrait).toBeUndefined();
  });

  it("shows the owner's real signed portrait after permanent selection", () => {
    const view = resolvePortalDisplay({
      ready: true,
      stage: "selected",
      problem: false,
      card: selectedCard,
    });
    expect(view.kind).toBe("selected");
    expect(view.background).toBe("none");
    expect(view.headline).toBe("Lumi");
    expect(view.support).toBe("Stage 1 · Origin");
    expect(view.cta).toBe("View My Card");
    expect(view.portrait).toEqual({
      artworkUrl: "https://example.test/owner-portrait.png",
      companionName: "Lumi",
      rarity: "Rare",
      username: "Aisha",
    });
  });

  it("keeps a retry surface on load problems without resetting journey data", () => {
    const view = resolvePortalDisplay({
      ready: true,
      stage: "new",
      problem: true,
      card: null,
    });
    expect(view.kind).toBe("error");
    expect(view.cta).toBe("Retry");
    expect(view.background).toBe("portal");
  });
});
