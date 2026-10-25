import { describe, expect, it } from "vitest";
import { DEMO_CARDS, cardUrl, type NovaCard } from "./model";
import {
  attachPublicArtworkUrl,
  devSharePayload,
  isPublicArtworkHref,
  isSafeArtworkUrl,
  originFromHost,
  publicArtworkHref,
  publicPreviewSvg,
  toPublicSnapshot,
} from "./public-card";
import { SITE_URL } from "@/lib/seo";

const matched: NovaCard = {
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
    tagline: "A small light in a big sky",
    description: "A gentle fox.",
    traits: ["curious", "gentle"],
    abilities: ["Light the way"],
  },
  variant: "b",
  rarity: "Rare",
  stage: 1,
  sharing: true,
  crafting: true,
  artworkUrl: "data:image/png;base64,aaaa",
};

describe("public companion card", () => {
  it("keeps the public page to safe fields and the public id", () => {
    const dirty = {
      ...matched,
      email: "form1.student@dev.local",
      school: "North School",
      age: 13,
      form: "Form 1",
      answers: [0, 1, 2],
    };
    const snapshot = toPublicSnapshot(dirty);
    const json = JSON.stringify(snapshot);
    expect(snapshot.displayName).toBe("Aisha");
    expect(snapshot.companionName).toBe("Lumi");
    expect(snapshot.title).toBe("A small light in a big sky");
    expect(snapshot.traits).toEqual(["curious", "gentle"]);
    expect(snapshot.stars).toBe(2);
    expect(snapshot.aura).toBe("Starlight aura");
    expect(snapshot.serial).toBe("100000000101");
    expect(snapshot.artworkUrl).toBeNull();
    expect(json).not.toContain("form1.student@dev.local");
    expect(json).not.toContain("North School");
    expect(json).not.toContain("Form 1");
    expect(json.toLowerCase()).not.toContain("birth year");
    expect(cardUrl(matched.publicId, "http://127.0.0.1:8080")).toBe(
      "http://127.0.0.1:8080/card/c/00000000-0000-4000-8000-00000000d101",
    );
    expect(cardUrl(matched.publicId, "http://127.0.0.1:8080")).not.toContain(matched.serial);
  });

  it("draws the preview from the safe fields", () => {
    const svg = publicPreviewSvg(toPublicSnapshot(matched));
    expect(svg).toContain("Aisha");
    expect(svg).toContain("Lumi");
    expect(svg).not.toContain("100000000101");
    expect(svg).toContain("Starlight aura");
    expect(svg).toContain("Your portrait is being crafted");
    expect(svg).not.toContain("form1.student@dev.local");
    expect(svg.toLowerCase()).not.toContain("birth year");
    expect(svg).not.toContain("data:image/png");
  });

  it("drops private fields before a dev card is published", () => {
    const payload = devSharePayload({
      ...matched,
      email: "form1.student@dev.local",
    } as NovaCard);
    expect(payload.artworkUrl).toBeNull();
    expect(payload.sharing).toBe(true);
    expect(JSON.stringify(payload)).not.toContain("form1.student@dev.local");
    expect(originFromHost("127.0.0.1:8080")).toBe("http://127.0.0.1:8080");
    expect(originFromHost("www.myacademy.my")).toBe(SITE_URL);
    expect(originFromHost("cards.myacademy.my")).toBe(SITE_URL);
    expect(originFromHost("preview.pages.dev")).toBe(SITE_URL);
    expect(toPublicSnapshot(DEMO_CARDS[0]).companionName).toBe("Nova");
  });

  it("keeps permanent card paths on /card/c/{publicId}", () => {
    const id = "4159d80b-c683-4fb9-95ef-5f76d43530bf";
    expect(cardUrl(id, SITE_URL)).toBe(`${SITE_URL}/card/c/${id}`);
    expect(cardUrl(id, SITE_URL)).not.toContain("localhost");
  });

  it("keeps QR and share origins on the public site for non-local hosts", () => {
    expect(originFromHost("academymy.pages.dev")).toBe(SITE_URL);
    expect(originFromHost("www.myacademy.my")).toBe("https://www.myacademy.my");
    expect(cardUrl("7e6b4ac0-3e7e-432b-86e4-ec892329cdd0", SITE_URL)).toBe(
      "https://www.myacademy.my/card/c/7e6b4ac0-3e7e-432b-86e4-ec892329cdd0",
    );
  });

  it("gives public visitors a sharing-checked artwork path instead of a storage URL", () => {
    const id = "7e6b4ac0-3e7e-432b-86e4-ec892329cdd0";
    const href = publicArtworkHref(id);
    expect(href).toBe(`/card/c/${id}/art`);
    expect(href).not.toContain("supabase");
    expect(isPublicArtworkHref(href)).toBe(true);
    expect(isPublicArtworkHref(`${href}?v=9`)).toBe(true);
    expect(isSafeArtworkUrl(href)).toBe(true);
    expect(isPublicArtworkHref(`/card/c/demo-mia/art`)).toBe(false);
    expect(isPublicArtworkHref(`/card/c/${id}`)).toBe(false);
    const published = attachPublicArtworkUrl({
      ...matched,
      publicId: id,
      crafting: false,
      artworkPath: "16846546-3f82-4c18-a430-098f9a24a939/chosen.png",
      artworkUrl: "https://lyethdhiiwkbuznvvouk.supabase.co/storage/v1/object/sign/nova-artwork/x",
    });
    expect(published.artworkUrl).toBe(href);
    expect(published.artworkPath).toBeUndefined();
    expect(JSON.stringify(published)).not.toContain("supabase");
    expect(JSON.stringify(published)).not.toContain("16846546-3f82-4c18-a430-098f9a24a939");
    expect(attachPublicArtworkUrl(DEMO_CARDS[0]).artworkUrl).toBe(DEMO_CARDS[0].artworkUrl);
  });
});
