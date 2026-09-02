import { describe, expect, it } from "vitest";
import {
  GEOGRAPHY_F1_CHAPTER_ARTWORK,
  getGeographyF1ChapterArtwork,
} from "./geography-f1-chapter-artwork";

describe("Geography Form 1 chapter artwork", () => {
  it("registers one distinct image for every chapter", () => {
    const images = Object.values(GEOGRAPHY_F1_CHAPTER_ARTWORK);

    const chapters = Object.keys(GEOGRAPHY_F1_CHAPTER_ARTWORK).sort(
      (left, right) => Number(left.replace("Chapter ", "")) - Number(right.replace("Chapter ", "")),
    );

    expect(chapters).toEqual(Array.from({ length: 13 }, (_, index) => `Chapter ${index + 1}`));
    expect(new Set(images).size).toBe(13);
    expect(getGeographyF1ChapterArtwork("Chapter 2")).toMatch(/ch2-kedudukan/);
    expect(getGeographyF1ChapterArtwork("Chapter 13")).toMatch(/ch13-sisa-domestik/);
  });
});
