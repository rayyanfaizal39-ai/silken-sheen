import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { CardShareOptions } from "./CardShareOptions";
import { type NovaCard } from "./model";
import { storyCardSvg, toPublicSnapshot } from "./public-card";
import {
  ACADEMY_SOCIAL_HANDLES,
  ACADEMY_SOCIAL_LINKS,
  shareCaption,
  whatsAppShareUrl,
} from "./share-out";

const card = {
  publicId: "00000000-0000-4000-8000-00000000d101",
  serial: "100000000101",
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

describe("AcadeMY share caption", () => {
  it("prefills WhatsApp with the card URL and the AcadeMY tags", () => {
    const url = "http://127.0.0.1:8080/card/c/00000000-0000-4000-8000-00000000d101";
    const dirty = { ...card, email: "form1.student@dev.local" } as NovaCard;
    const caption = shareCaption(toPublicSnapshot(dirty), url);
    const href = whatsAppShareUrl(caption);
    expect(href.startsWith("https://wa.me/?text=")).toBe(true);
    expect(new URL(href).origin).toBe("https://wa.me");
    const text = decodeURIComponent(href.slice("https://wa.me/?text=".length));
    expect(text).toContain(url);
    expect(text).toContain("Aisha's Lumi on AcadeMY");
    expect(text).toContain("#AcadeMY");
    expect(text).toContain("#NovaCompanion");
    expect(text).toContain(ACADEMY_SOCIAL_HANDLES.instagram);
    expect(text).toContain(ACADEMY_SOCIAL_HANDLES.tiktok);
    expect(text).toContain(ACADEMY_SOCIAL_LINKS.instagram);
    expect(text).toContain(ACADEMY_SOCIAL_LINKS.tiktok);
    expect(ACADEMY_SOCIAL_HANDLES.instagram).toBe("@academykssm");
    expect(ACADEMY_SOCIAL_HANDLES.tiktok).toBe("@myacademymalaysia");
    expect(ACADEMY_SOCIAL_LINKS.instagram).toBe("https://www.instagram.com/academykssm/");
    expect(ACADEMY_SOCIAL_LINKS.tiktok).toBe("https://www.tiktok.com/@myacademymalaysia");
    expect(text).not.toContain("form1.student@dev.local");
    expect(text.toLowerCase()).not.toContain("birth year");
  });

  it("draws a 1080 by 1920 story from safe fields", () => {
    const svg = storyCardSvg(
      toPublicSnapshot({ ...card, email: "form1.student@dev.local" } as NovaCard),
    );
    expect(svg).toContain('width="1080"');
    expect(svg).toContain('height="1920"');
    expect(svg).toContain("Aisha");
    expect(svg).toContain("Lumi");
    expect(svg).toContain("#AcadeMY #NovaCompanion");
    expect(svg).not.toContain("form1.student@dev.local");
    expect(svg.toLowerCase()).not.toContain("birth year");
    expect(svg).not.toContain("instagram.com");
    expect(svg).not.toContain("tiktok.com");
  });

  it("hides every share option while sharing is off", () => {
    const html = renderToStaticMarkup(
      <CardShareOptions
        card={{ ...card, sharing: false }}
        url="http://127.0.0.1:8080/card/c/00000000-0000-4000-8000-00000000d101"
      />,
    );
    expect(html).toBe("");
  });

  it("offers WhatsApp, a story download, and a caption with the AcadeMY profiles", () => {
    const url = "http://127.0.0.1:8080/card/c/00000000-0000-4000-8000-00000000d101";
    const html = renderToStaticMarkup(<CardShareOptions card={card} url={url} />);
    expect(html).toContain('href="https://wa.me/?text=');
    expect(html).toContain(encodeURIComponent(ACADEMY_SOCIAL_LINKS.instagram));
    expect(html).toContain(encodeURIComponent(ACADEMY_SOCIAL_LINKS.tiktok));
    expect(html).toContain("Download card image");
    expect(html).toContain("Copy caption");
    expect(html).toContain("Instagram");
    expect(html).toContain("TikTok");
    expect(html).not.toMatch(/href="https:\/\/www\.instagram\.com/);
    expect(html).not.toMatch(/href="https:\/\/www\.tiktok\.com/);
    expect(html).not.toContain("form1.student@dev.local");
  });

  it("uses the share sheet, WhatsApp, a download, and caption copy only", () => {
    const sources = ["share-out.ts", "story-image.ts", "CardShareOptions.tsx"]
      .map((name) => readFileSync(resolve(import.meta.dirname, name), "utf8"))
      .join("\n");
    const code = sources.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
    expect(sources).toContain("navigator.share");
    expect(sources).toContain("https://wa.me/?text=");
    expect(sources).toContain("Download card image");
    expect(sources).toContain("Copy caption");
    expect(code).not.toMatch(/oauth|client_secret|graph\.instagram|open\.tiktok|business-api/i);
    const withoutProfiles = code
      .replaceAll(ACADEMY_SOCIAL_LINKS.instagram, "")
      .replaceAll(ACADEMY_SOCIAL_LINKS.tiktok, "");
    expect(withoutProfiles).not.toContain("instagram.com");
    expect(withoutProfiles).not.toContain("tiktok.com");
    expect(code).toContain(ACADEMY_SOCIAL_LINKS.instagram);
    expect(code).toContain(ACADEMY_SOCIAL_LINKS.tiktok);
  });
});
