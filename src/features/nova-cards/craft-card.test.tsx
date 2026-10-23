import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { NovaCard } from "./NovaCard";
import type { NovaCard as Card } from "./model";

const card: Card = {
  publicId: "00000000-0000-4000-8000-00000000d101",
  serial: "100000000101",
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
  crafting: true,
};

describe("crafted companion card", () => {
  it("keeps the gold frame, serial and barcode while the portrait is being made", () => {
    const html = renderToStaticMarkup(
      <NovaCard
        card={card}
        url="http://localhost:8080/card/c/00000000-0000-4000-8000-00000000d101"
      />,
    );
    expect(html).toContain("Your companion is being crafted");
    expect(html).toContain("Lumi the Magical Fox");
    expect(html).toContain("nova-art-frame");
    expect(html).toContain("nova-craft-wait");
    expect(html).not.toMatch(/<img[^>]*class="nova-art"/);
    expect(html).toContain("nova-barcode");
    expect(html).toContain("100000000101");
    expect(html.toLowerCase()).not.toContain("birth year");
  });
});
