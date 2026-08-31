import { describe, expect, it } from "vitest";
import {
  getChapter,
  getRegisteredSubjectChapters,
  hasFormResourceContent,
  hasResourceContent,
} from "./registry";
import { getChapterFeatures } from "./types";

describe("Science notes learner navigation", () => {
  for (const form of ["Form 1", "Form 2", "Form 3"] as const) {
    for (const lang of ["bm", "dlp"] as const) {
      it(`resolves Science ${form} ${lang.toUpperCase()} from form to chapter notes`, () => {
        expect(hasFormResourceContent("science", form, "notes", lang)).toBe(true);

        const chapters = getRegisteredSubjectChapters("science", lang, form);
        const firstNotesChapter = chapters.find((chapter) =>
          hasResourceContent("science", form, chapter.key, "notes", lang),
        );

        expect(firstNotesChapter).toBeDefined();
        const chapter = getChapter("science", firstNotesChapter!.key, lang, form);
        expect(chapter).toBeDefined();
        expect(getChapterFeatures(chapter).notes).toBe(true);
      });
    }
  }
});
