import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { CardShareOptions } from "./CardShareOptions";
import { type NovaCard } from "./model";
import { storyCardSvg, toPublicSnapshot } from "./public-card";
import { shareCaption } from "./share-out";
import { cardPictureSvg } from "./download";

const card = {
  publicId: "00000000-0000-4000-8000-00000000d101",
  serial: "R-4H7K2M9P",
  username: "Aisha",
  traits: null,
  companion: {
    archetypeId: "fox-starlight",
    name: "Lumi",
    species: "Magical Fox",
    element: "Starlight",
    personality: "Curious",
    tagline: "A small light",
    description: "A gentle fox.",
    traits: ["curious"],
    abilities: ["Light the way"],
  },
  variant: "b",
  rarity: "Rare",
  stage: 1,
  sharing: true,
  crafting: true,
} as NovaCard;

describe("AcadeMY picture share", () => {
  it("keeps captions to public names, without URLs or ids", () => {
    const dirty = { ...card, email: "form1.student@dev.local" } as NovaCard;
    const caption = shareCaption(toPublicSnapshot(dirty));
    expect(caption).toBe("Aisha's Lumi");
    expect(caption).not.toContain("card/c/");
    expect(caption).not.toContain(card.publicId);
    expect(caption).not.toContain(card.serial);
    expect(caption).not.toContain("form1.student@dev.local");
  });

  it("draws a 1080 by 1920 story from safe fields without serials or URLs", () => {
    const svg = storyCardSvg(
      toPublicSnapshot({ ...card, email: "form1.student@dev.local" } as NovaCard),
    );
    expect(svg).toContain('width="1080"');
    expect(svg).toContain('height="1920"');
    expect(svg).toContain("Aisha");
    expect(svg).toContain("Lumi");
    expect(svg).toContain("#AcadeMY #NovaCompanion");
    expect(svg).not.toContain("R-4H7K2M9P");
    expect(svg).not.toContain("00000000-0000-4000-8000-00000000d101");
    expect(svg).not.toContain("card/c/");
    expect(svg).not.toContain("form1.student@dev.local");
  });

  it("draws the saved companion picture without QR, barcode, ids or URLs", () => {
    const svg = cardPictureSvg(card, "data:image/png;base64,aaaa", "data:image/png;base64,logo");
    expect(svg).toContain("Aisha");
    expect(svg).toContain("Lumi");
    expect(svg).not.toContain("R-4H7K2M9P");
    expect(svg).not.toContain(card.publicId);
    expect(svg).not.toContain("card/c/");
    expect(svg).not.toContain("barcode");
    expect(svg).not.toContain("QR");
  });

  it("hides every share option while sharing is off", () => {
    const html = renderToStaticMarkup(<CardShareOptions card={{ ...card, sharing: false }} />);
    expect(html).toBe("");
  });

  it("offers WhatsApp picture share and a picture download only", () => {
    const html = renderToStaticMarkup(<CardShareOptions card={card} />);
    expect(html).toContain("WhatsApp");
    expect(html).toContain("Save picture");
    expect(html).not.toContain("wa.me");
    expect(html).not.toContain("Instagram");
    expect(html).not.toContain("TikTok");
    expect(html).not.toContain("Copy caption");
    expect(html).not.toContain(card.publicId);
    expect(html).not.toContain("form1.student@dev.local");
  });

  it("does not add identity login or social APIs", () => {
    const sources = ["share-out.ts", "story-image.ts", "CardShareOptions.tsx", "download.ts"]
      .map((name) => readFileSync(resolve(import.meta.dirname, name), "utf8"))
      .join("\n");
    const code = sources.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
    expect(sources).toContain("navigator.share");
    expect(sources).toContain("academy-companion.png");
    expect(code).not.toMatch(/oauth|client_secret|graph\.instagram|open\.tiktok|business-api/i);
    expect(code).not.toContain("signIn");
    expect(code).not.toContain("wa.me");
  });
});
