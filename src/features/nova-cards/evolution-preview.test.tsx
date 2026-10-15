import { createHash } from "node:crypto";
import { renderToStaticMarkup } from "react-dom/server";
import sharp from "sharp";
import { describe, expect, it } from "vitest";
import { companionPreviewSvg, companionSvg } from "./artwork";
import { DEMO_CARDS } from "./model";
import { EvolutionPreview } from "./EvolutionPreview";

// Before this experiment: all five earned stages must stay identical.
const ORIGINALS = [
  [
    "23b685c8d568d885fb866913fc4d7ab5d296899147d86352b996020ee39b5df0",
    "107bb291e50b4a7b85a9f4ab03f99affca45b2ec7690ea0093be44e80d002b7d",
    "36284fb59ed97ccdc97a243c5335bf57f2cbd3bad3b7fc1bc2574a09b13d8582",
    "a1c9b3f80b0f30f51085c32dd01b881a5a4a24b77134dcca063d470ad7959523",
    "24dcc0e5168ba3f34fd2ee4cb3f3c67700b6bee63beccb6859375558e2fa00da",
  ],
  [
    "b8d18dcd5dc804e5bdb33cc0907921cf96044928f064b07f78677c6e3de9e951",
    "971a57ed0bdd6efce70ce66890d256b3fb50788bf213062d038ef3e68940c3d5",
    "50802b0d9e79300fc182d3106aad49c35e4f613f7b6ed82d79437c49c2f4ba54",
    "44c1a7640f8e54610f82dae99da4efc21646362d7282159303e34f6abe46649d",
    "d52902174b7f4b52c47d3ad807ed2476273a10e88f918e4a4a3aa4a944b097c8",
  ],
];

describe("fictional Origin / Awakened visual study", () => {
  DEMO_CARDS.forEach((card, i) => {
    it(`preserves ${card.username}'s existing artwork and immutable demo identity`, () => {
      for (const stage of [1, 2, 3, 4, 5])
        expect(
          createHash("sha256")
            .update(companionSvg(card.traits, card.variant, stage))
            .digest("hex"),
        ).toBe(ORIGINALS[i][stage - 1]);
      expect(companionPreviewSvg(card.traits, card.variant, 1)).toBe(
        companionSvg(card.traits, card.variant, 1),
      );
      const before = JSON.stringify(card);
      const preview = companionPreviewSvg(card.traits, card.variant, 2);
      expect(JSON.stringify(card)).toBe(before);
      expect(card.xp).toBe(0);
      expect(preview).toContain('data-identity="original-face"');
      expect(preview).toContain(card.traits.colours);
      expect(preview).toContain(card.traits.creature);
      expect(preview).not.toMatch(/egg|hatch/i);
    });
    it(`renders ${card.username}'s anatomical changes into a valid image`, async () => {
      const svg = companionPreviewSvg(card.traits, card.variant, 2);
      expect(svg).toContain(
        card.traits.creature === "Phoenix"
          ? 'data-anatomy="layered-phoenix-wings"'
          : 'data-anatomy="fluffy-fox-tails"',
      );
      expect(svg).toContain(
        card.traits.creature === "Phoenix"
          ? 'data-magic="gentle-flames"'
          : 'data-magic="water-ribbons"',
      );
      const png = await sharp(Buffer.from(svg)).png().toBuffer();
      expect(await sharp(png).metadata()).toMatchObject({ width: 600, height: 640 });
    });
  });
  it("starts with both stages side by side and labels the controls independently for each companion", () => {
    const html = renderToStaticMarkup(<EvolutionPreview />);
    expect(html.match(/<figure/g)).toHaveLength(4);
    expect(html).toContain("Rayyan&#x27;s comparison view");
    expect(html).toContain("Mia&#x27;s comparison view");
    expect(html.match(/Stage 2 — Awakened/g)).toHaveLength(4);
    expect(() => companionPreviewSvg(DEMO_CARDS[0].traits, "a", 3 as 2)).toThrow(/Only Origin/);
  });
});
