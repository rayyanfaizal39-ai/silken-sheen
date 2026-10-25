import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { NovaCard } from "./NovaCard";
import type { NovaCard as Card } from "./model";

const card: Card = {
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
    expect(html).toContain("Your portrait is being crafted");
    expect(html).toContain("Lumi the Magical Fox");
    expect(html).toContain("nova-art-frame");
    expect(html).toContain("nova-craft-wait");
    expect(html).not.toMatch(/<img[^>]*class="nova-art"/);
    expect(html).toContain("nova-barcode");
    expect(html).toContain("data-nova-barcode");
    expect(html).toContain("R-4H7K2M9P");
    expect(html).toContain("data-nova-serial");
    expect(html.toLowerCase()).not.toContain("birth year");
  });

  it("keeps the full collectible serial on Code 128 and QR surfaces", () => {
    const html = renderToStaticMarkup(
      <NovaCard
        card={{ ...card, serial: "E-X5K8D2M7", crafting: false, artworkUrl: "https://example.test/a.png" }}
        url="http://localhost:8080/card/c/00000000-0000-4000-8000-00000000d101"
      />,
    );
    expect(html).toContain("E-X5K8D2M7");
    expect(html).toContain("Code 128 barcode: E-X5K8D2M7");
    expect(html).toContain("data-nova-codes");
  });

  it("asks the student to choose once both portraits are ready", () => {
    const html = renderToStaticMarkup(
      <NovaCard
        card={{
          ...card,
          artOptions: [
            { option: 1, url: "data:image/png;base64,aaaa" },
            { option: 2, url: "data:image/png;base64,bbbb" },
          ],
        }}
        url="http://localhost:8080/card/c/00000000-0000-4000-8000-00000000d101"
      />,
    );
    expect(html).toContain("Choose your companion art");
    expect(html).not.toContain("Your portrait is being crafted");
    expect(html).not.toContain("form1.student@dev.local");
  });

  it("never substitutes fictional SVG for a real student card waiting on artwork", () => {
    const html = renderToStaticMarkup(
      <NovaCard
        card={{ ...card, crafting: false, artworkUrl: "https://example.test/lumi.png" }}
        url="https://www.myacademy.my/card/c/00000000-0000-4000-8000-00000000d101"
      />,
    );
    expect(html).toContain('src="https://example.test/lumi.png"');
    expect(html).toContain("Loading portrait");
    expect(html).not.toContain("FICTIONAL DEMO");
    expect(html).not.toContain("companionSvg");
  });
});
