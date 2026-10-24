import { describe, expect, it } from "vitest";
import { DEMO_CARDS, cardUrl, type NovaCard } from "./model";
import { devSharePayload, originFromHost, publicPreviewSvg, toPublicSnapshot } from "./public-card";
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
    expect(svg).toContain("100000000101");
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
    expect(toPublicSnapshot(DEMO_CARDS[0]).companionName).toBe("Nova");
  });
});
