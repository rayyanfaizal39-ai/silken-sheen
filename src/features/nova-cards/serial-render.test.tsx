import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { NovaCard } from "./NovaCard";
import {
  isCollectibleNovaSerial,
  isLegacyNovaSerial,
  novaCardSerial,
  novaCollectibleSerial,
  novaSerialDigits,
} from "./codes";
import { toPublicSnapshot } from "./public-card";
import type { NovaCard as Card } from "./model";

const base: Card = {
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
  sharing: true,
  crafting: false,
  artworkUrl: "https://example.test/portrait.png",
};

describe("dual-format serial rendering (owner + public)", () => {
  it("accepts legacy and collectible serials through every validation alias", () => {
    for (const serial of ["000001000000", "000001000001", "000001000002"] as const) {
      expect(novaCardSerial(serial)).toBe(serial);
      expect(novaCollectibleSerial(serial)).toBe(serial);
      expect(novaSerialDigits(serial)).toBe(serial);
      expect(isLegacyNovaSerial(serial)).toBe(true);
      expect(isCollectibleNovaSerial(serial)).toBe(false);
    }
    expect(novaCollectibleSerial("R-7K4M9Q2X")).toBe("R-7K4M9Q2X");
    expect(() => novaCollectibleSerial("not-a-serial")).toThrow(/twelve digits or R-XXXXXXXX/);
  });

  it("renders owner NovaCard for a legacy numeric serial without crashing", () => {
    const html = renderToStaticMarkup(
      <NovaCard
        card={{
          ...base,
          publicId: "f2c18bdb-9de8-44fd-89b7-61b56bb52964",
          serial: "000001000000",
          username: "Ace",
          sharing: false,
        }}
        url="https://www.myacademy.my/card/c/f2c18bdb-9de8-44fd-89b7-61b56bb52964"
      />,
    );
    expect(html).toContain("000001000000");
    expect(html).toContain("Code 128 barcode: 000001000000");
    expect(html).toContain("data-nova-serial");
    expect(html).toContain("01000000");
  });

  it("renders owner NovaCard for a collectible R-XXXXXXXX serial", () => {
    const html = renderToStaticMarkup(
      <NovaCard
        card={{ ...base, serial: "R-7K4M9Q2X" }}
        url="https://www.myacademy.my/card/c/00000000-0000-4000-8000-00000000d101"
      />,
    );
    expect(html).toContain("R-7K4M9Q2X");
    expect(html).toContain("Code 128 barcode: R-7K4M9Q2X");
    expect(html).toContain("7K4M9Q2X");
  });

  it("keeps public picture-share NovaCard stable for both serial formats", () => {
    const legacyHtml = renderToStaticMarkup(
      <NovaCard
        card={{
          ...base,
          publicId: "edc7c758-27a0-4f3f-8718-40597a9dca95",
          serial: "000001000001",
          username: "scaryguy",
          sharing: true,
        }}
        url="https://www.myacademy.my/card/c/edc7c758-27a0-4f3f-8718-40597a9dca95"
        pictureShare
      />,
    );
    expect(legacyHtml).toContain("000001000001");
    expect(legacyHtml).toContain("Code 128 barcode: 000001000001");

    const collectibleHtml = renderToStaticMarkup(
      <NovaCard
        card={{ ...base, serial: "E-X5K8D2M7", sharing: true }}
        url="https://www.myacademy.my/card/c/00000000-0000-4000-8000-00000000d101"
        pictureShare
      />,
    );
    expect(collectibleHtml).toContain("E-X5K8D2M7");
    expect(collectibleHtml).toContain("Code 128 barcode: E-X5K8D2M7");
  });

  it("preserves serial on the public snapshot for legacy and collectible cards", () => {
    const legacySnap = toPublicSnapshot({
      ...base,
      serial: "000001000002",
      username: "john",
      sharing: true,
    });
    expect(legacySnap.serial).toBe("000001000002");

    const collectibleSnap = toPublicSnapshot({ ...base, serial: "L-8P3W6T9A" });
    expect(collectibleSnap.serial).toBe("L-8P3W6T9A");
  });
});
