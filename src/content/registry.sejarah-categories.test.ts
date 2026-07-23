import { describe, expect, it } from "vitest";
import { getChapter, getRegisteredSubjectChapters } from "./registry";

const expectedCategories = {
  "Form 1": [
    "Prasejarah",
    "Zaman Batu",
    "Prasejarah",
    "Tamadun Awal",
    "Tamadun Dunia",
    "Zaman Klasik",
    "Zaman Pertengahan",
    "Tamadun Islam",
  ],
  "Form 2": [
    "Kerajaan Alam Melayu",
    "Kerajaan Alam Melayu",
    "Kerajaan Alam Melayu",
    "Kerajaan Alam Melayu",
    "Kesultanan Melayu",
    "Kesultanan Melayu",
    "Kesultanan Melayu",
    "Kerajaan Negeri Melayu",
    "Kerajaan Negeri Melayu",
    "Sarawak & Sabah",
  ],
  "Form 3": [
    "Peluasan Kuasa Barat",
    "Peluasan Kuasa Barat",
    "Pentadbiran Negeri Melayu",
    "Pentadbiran Negeri Melayu",
    "Pentadbiran Borneo",
    "Kesan Pentadbiran Barat",
    "Reaksi Tempatan terhadap Barat",
    "Reaksi Tempatan terhadap Barat",
  ],
} as const;

describe("Sejarah chapter category metadata", () => {
  Object.entries(expectedCategories).forEach(([form, categories]) => {
    it(`selects ${form} labels by subject, form, and chapter`, () => {
      const chapters = getRegisteredSubjectChapters(
        "sejarah",
        undefined,
        form as keyof typeof expectedCategories,
      );

      expect(chapters.map((chapter) => chapter.categoryLabel)).toEqual(categories);
      chapters.forEach((chapter, index) => {
        expect(getChapter("sejarah", chapter.key, undefined, form as keyof typeof expectedCategories)?.title)
          .toBe(chapter.label.replace(/^Chapter \d+: /, ""));
        expect(chapter.key).toBe(`Chapter ${index + 1}`);
      });
    });
  });

  it("does not attach Sejarah category metadata to another subject", () => {
    expect(
      getRegisteredSubjectChapters("geography", undefined, "Form 2").every(
        (chapter) => chapter.categoryLabel === undefined,
      ),
    ).toBe(true);
  });
});
