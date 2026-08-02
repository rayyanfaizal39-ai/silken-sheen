import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const stylesheet = readFileSync(new URL("./homeSkeleton.css", import.meta.url), "utf8");

describe("Continue Learning layout", () => {
  it("keeps a compact 44/56 desktop split with a cinematic artwork window", () => {
    expect(stylesheet).toContain("grid-template-columns: minmax(280px, 44%) minmax(0, 1fr)");
    expect(stylesheet).toContain("min-height: clamp(360px, 20vw, 408px)");
    expect(stylesheet).toContain("aspect-ratio: 16 / 10");
    expect(stylesheet).toContain("align-self: start");
  });

  it("uses a stacked 16:9 artwork and bottom fade on mobile", () => {
    expect(stylesheet).toMatch(
      /@media \(max-width: 760px\)[\s\S]*?\.home-continue-learning \{[\s\S]*?grid-template-columns: minmax\(0, 1fr\)/,
    );
    expect(stylesheet).toMatch(
      /@media \(max-width: 760px\)[\s\S]*?\.home-continue-learning \.home-subject-world-artwork \{[\s\S]*?aspect-ratio: 16 \/ 9/,
    );
    expect(stylesheet).toMatch(
      /\.home-continue-learning \.home-subject-world-artwork__overlay \{\s*background: linear-gradient\(\s*180deg/,
    );
  });

  it("retains reduced-motion handling for the card and artwork", () => {
    expect(stylesheet).toMatch(
      /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.home-continue-learning \.home-subject-world-artwork img \{[\s\S]*?transition: none/,
    );
  });
});
