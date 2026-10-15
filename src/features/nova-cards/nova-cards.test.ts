import { describe, expect, it } from "vitest";
import jsQR from "jsqr";
import { PNG } from "pngjs";
import { BitArray, Code128Reader } from "@zxing/library";
import sharp from "sharp";
import { readFileSync } from "node:fs";
import {
  DEMO_CARDS,
  STAGES,
  QUESTIONS,
  cardUrl,
  evolution,
  traitsFromAnswers,
  validPublicId,
} from "./model";
import { companionSvg } from "./artwork";
import { barcodeSvg, barcodeSymbols, qrDataUrl } from "./codes";
import { isOnboardingExemptRoute } from "@/lib/onboarding-routing";

describe("Nova permanent identities and scannable codes", () => {
  for (const card of DEMO_CARDS) {
    it(`decodes ${card.username}'s real QR PNG into its own permanent URL`, async () => {
      const url = cardUrl(card.publicId, "http://localhost:5180");
      const png = PNG.sync.read(Buffer.from((await qrDataUrl(url)).split(",")[1], "base64"));
      expect(jsQR(new Uint8ClampedArray(png.data), png.width, png.height)?.data).toBe(url);
    });
    it(`independently decodes ${card.username}'s rendered Code 128 bars`, () => {
      const svg = barcodeSvg(card.serial);
      const width = Number(svg.match(/viewBox="0 0 (\d+)/)![1]);
      const pixels = new BitArray(width * 3);
      for (const match of svg.matchAll(/<rect x="(\d+)" y="10" width="(\d+)" height="54"/g)) {
        pixels.setRange(Number(match[1]) * 3, (Number(match[1]) + Number(match[2])) * 3);
      }
      expect(new Code128Reader().decodeRow(30, pixels).getText()).toBe(card.serial);
      expect(barcodeSymbols(card.serial).at(-1)).toBe(106);
    });
    it(`decodes ${card.username}'s barcode rasterized at mobile and export sizes`, async () => {
      for (const width of [234, 240, 270, 292, 375, 750]) {
        const { data } = await sharp(
          Buffer.from(
            barcodeSvg(card.serial).replace(
              /width="\d+" height="222"/,
              `width="${width}" height="64"`,
            ),
          ),
        )
          .removeAlpha()
          .raw()
          .toBuffer({ resolveWithObject: true });
        const row = new BitArray(width);
        for (let x = 0; x < width; x++) if (data[(30 * width + x) * 3] < 128) row.set(x);
        expect(new Code128Reader().decodeRow(0, row).getText()).toBe(card.serial);
      }
    });
  }
  it("keeps demo identities distinct and validates identifiers", () => {
    expect(new Set(DEMO_CARDS.map((c) => c.publicId)).size).toBe(2);
    expect(new Set(DEMO_CARDS.map((c) => c.serial)).size).toBe(2);
    expect(validPublicId("demo-rayyan")).toBe(true);
    expect(validPublicId("../../private")).toBe(false);
    expect(() => barcodeSvg("<script>")).toThrow();
  });
});

describe("Nova creation and XP compatibility", () => {
  it("requires all twelve answers and preserves all trait dimensions", () => {
    expect(QUESTIONS).toHaveLength(12);
    expect(() => traitsFromAnswers([])).toThrow();
    expect(() => traitsFromAnswers(Array(12).fill(3))).toThrow();
    expect(DEMO_CARDS[0].traits).toMatchObject({
      creature: "Phoenix",
      element: "Fire",
      personality: "Explorer",
      colours: "Obsidian Black / Violet",
      eyes: "Cosmic Galaxy Eyes",
    });
    expect(DEMO_CARDS[1].traits).toMatchObject({
      creature: "Magical Fox",
      element: "Water",
      personality: "Explorer",
      colours: "Sapphire Blue / Gold",
    });
  });
  it("has exactly five earned stages without altering the input XP or rarity", () => {
    expect(STAGES).toHaveLength(5);
    STAGES.forEach((s, i) => {
      expect(evolution(s.xp).stage).toBe(i + 1);
      if (i) expect(evolution(s.xp - 1).stage).toBe(i);
    });
    expect(evolution(NaN).stage).toBe(1);
    expect(evolution(-100).stage).toBe(1);
    expect(evolution(9000).stage).toBe(3); // Existing 9,000 XP milestone is preserved.
    expect(evolution(80000)).toMatchObject({ stage: 5, name: "Legendary", percent: 100 });
    expect(DEMO_CARDS[0].rarity).toBe("Rare");
  });
  it("renders a distinct silhouette at every stage while retaining its species and palette", () => {
    for (const c of DEMO_CARDS) {
      const stages = STAGES.map((_, i) => companionSvg(c.traits, c.variant, i + 1));
      expect(new Set(stages).size).toBe(5);
      expect(
        stages.every((s) => s.includes(c.traits.creature) && s.includes(c.traits.colours)),
      ).toBe(true);
      expect(companionSvg(c.traits, "a")).not.toBe(companionSvg(c.traits, "b"));
      expect(stages.join("")).not.toMatch(/egg|hatch/i);
    }
  });
  it("keeps public card views outside onboarding and keeps all new routes separate from /card", () => {
    expect(isOnboardingExemptRoute("/card/c/demo-rayyan")).toBe(true);
    expect(isOnboardingExemptRoute("/nova/demo")).toBe(true);
    const route = readFileSync(
      new URL("../../routes/card_.c.$publicId.tsx", import.meta.url),
      "utf8",
    );
    expect(route).toContain("/card_/c/$publicId");
    const config = readFileSync(new URL("../../../vite.config.ts", import.meta.url), "utf8");
    expect(config).toContain('path.startsWith("/card/c/")');
  });
});
