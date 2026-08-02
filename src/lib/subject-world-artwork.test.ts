import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getSubjectWorldArtwork } from "./subject-world-artwork";

const aliasCases = [
  ["science", "/world/science-world.webp"],
  ["sains", "/world/science-world.webp"],
  ["mathematics", "/world/mathematics-world.webp"],
  ["matematik", "/world/mathematics-world.webp"],
  ["math", "/world/mathematics-world.webp"],
  ["maths", "/world/mathematics-world.webp"],
  ["geography", "/world/geography-world.webp"],
  ["geografi", "/world/geography-world.webp"],
  ["history", "/world/sejarah-world.webp"],
  ["sejarah", "/world/sejarah-world.webp"],
  ["english", "/world/english-world.webp"],
  ["bahasa_inggeris", "/world/english-world.webp"],
  ["bm", "/world/bahasa-melayu-world.webp"],
  ["bahasa_melayu", "/world/bahasa-melayu-world.webp"],
  ["bahasa-melayu", "/world/bahasa-melayu-world.webp"],
] as const;

const subjectAccentCases = [
  ["science", "#38bdf8"],
  ["math", "#fbbf24"],
  ["geography", "#34d399"],
  ["sejarah", "#fb923c"],
  ["english", "#a78bfa"],
  ["bm", "#f472b6"],
] as const;

describe("subject world artwork", () => {
  it.each(aliasCases)("maps %s to its subject artwork", (subject, expectedSrc) => {
    expect(getSubjectWorldArtwork(subject)?.src).toBe(expectedSrc);
  });

  it("normalizes harmless casing and surrounding whitespace", () => {
    expect(getSubjectWorldArtwork("  Sains  ")?.src).toBe("/world/science-world.webp");
  });

  it("points every subject at an existing public WebP", () => {
    const artworkPaths = new Set(aliasCases.map(([, src]) => src));

    for (const src of artworkPaths) {
      expect(existsSync(join(process.cwd(), "public", src.replace(/^\//, "")))).toBe(true);
    }
  });

  it.each(subjectAccentCases)("maps %s to its subject accent", (subject, expectedAccent) => {
    expect(getSubjectWorldArtwork(subject)?.accent).toBe(expectedAccent);
  });

  it.each([undefined, null, "", "unknown-subject"])(
    "returns the safe fallback signal for %s",
    (subject) => {
      expect(getSubjectWorldArtwork(subject)).toBeNull();
    },
  );
});
