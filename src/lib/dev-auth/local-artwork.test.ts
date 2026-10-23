import { describe, expect, it } from "vitest";
import { devCompanionArtworkUrl } from "./local-artwork";

describe("local companion artwork", () => {
  it("uses repo illustrations for the violet phoenix and the blue water fox", () => {
    expect(devCompanionArtworkUrl("Phoenix", "Fire", "a")).toBe("/nova/creatures/phoenix.svg");
    expect(devCompanionArtworkUrl("Phoenix", "Starlight", "b")).toBe("/nova/creatures/phoenix.svg");
    expect(devCompanionArtworkUrl("Magical Fox", "Water", "a")).toBe("/nova/creatures/fox.svg");
  });

  it("draws other species and elements locally, without an image API", () => {
    const dragon = devCompanionArtworkUrl("Dragon", "Wind", "a");
    const waterPhoenix = devCompanionArtworkUrl("Phoenix", "Water", "b");
    expect(dragon.startsWith("data:image/svg+xml")).toBe(true);
    expect(decodeURIComponent(dragon)).toContain('data-anatomy="dragon-tail"');
    expect(waterPhoenix.startsWith("data:image/svg+xml")).toBe(true);
    expect(decodeURIComponent(waterPhoenix)).toContain("Sapphire Blue / Gold");
    expect(dragon + waterPhoenix).not.toMatch(/openai|api\.openai|birth year/i);
  });
});
