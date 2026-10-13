import { describe, expect, it } from "vitest";
import { getChapterQuizQuestions } from "@/content/registry";
import { scienceF1QuizVisualById } from "./quiz-visuals";

const chapters = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
const languages = ["bm", "dlp"] as const;

describe("Form 1 Science chapter quiz audit regression", () => {
  for (const chapter of chapters) {
    for (const lang of languages) {
      it(`Chapter ${chapter} ${lang}: 30 valid, unique, paired questions`, () => {
        const questions = getChapterQuizQuestions("science", "Form 1", `Chapter ${chapter}`, lang);
        expect(questions).toHaveLength(30);
        expect(new Set(questions.map((q) => q.id)).size).toBe(30);
        for (const question of questions) {
          expect(question.id).toMatch(new RegExp(`^sci-f1-c${chapter}-${lang}-q\\d+$`));
          expect(question.question.trim().length).toBeGreaterThan(8);
          expect(question.options).toHaveLength(4);
          expect(new Set(question.options.map((option) => option.trim())).size).toBe(4);
          expect(question.options.every((option) => option.trim().length > 0)).toBe(true);
          expect(question.answerIndex).toBeGreaterThanOrEqual(0);
          expect(question.answerIndex).toBeLessThan(4);
          expect(question.explanation?.trim()).toBeTruthy();
          expect(["Easy", "Medium", "Hard"]).toContain(question.difficulty);
          const mappedImage = scienceF1QuizVisualById[question.id];
          if (mappedImage) expect(question.image).toBe(mappedImage);
        }
      });
    }
    it(`Chapter ${chapter}: BM / DLP equivalent numbering and difficulty`, () => {
      const bm = getChapterQuizQuestions("science", "Form 1", `Chapter ${chapter}`, "bm");
      const dlp = getChapterQuizQuestions("science", "Form 1", `Chapter ${chapter}`, "dlp");
      for (let i = 1; i <= 30; i++) {
        const b = bm.find((q) => q.id === `sci-f1-c${chapter}-bm-q${i}`);
        const d = dlp.find((q) => q.id === `sci-f1-c${chapter}-dlp-q${i}`);
        expect(b, `Chapter ${chapter} BM Q${i}`).toBeTruthy();
        expect(d, `Chapter ${chapter} DLP Q${i}`).toBeTruthy();
        expect(b?.difficulty).toBe(d?.difficulty);
        if (b?.image || d?.image) expect(b?.image).toBe(d?.image);
      }
    });
  }

  it("attaches 21 bilingual pairs of answer-neutral SVG stimuli", () => {
    expect(Object.keys(scienceF1QuizVisualById)).toHaveLength(42);
    for (const [id, path] of Object.entries(scienceF1QuizVisualById)) {
      expect(id).toMatch(/^sci-f1-c[1-9]-(bm|dlp)-q\d+$/);
      expect(path).toMatch(/^\/quiz-visuals\/science-f1\/[a-z-]+\.svg$/);
      const companion = id.replace(/-(?:bm|dlp)-/, id.includes("-bm-") ? "-dlp-" : "-bm-");
      expect(scienceF1QuizVisualById[companion]).toBe(path);
    }
  });

  it("keeps chapter 8 black-surface and chapter 5 density corrections in both languages", () => {
    for (const lang of languages) {
      const chapter8 = getChapterQuizQuestions("science", "Form 1", "Chapter 8", lang);
      const heat = chapter8.find((q) => q.id === `sci-f1-c8-${lang}-q30`);
      expect(heat?.options[heat.answerIndex]).toMatch(lang === "bm" ? /lebih besar/ : /greater fraction/);
      const chapter5 = getChapterQuizQuestions("science", "Form 1", "Chapter 5", lang);
      const density = chapter5.find((q) => q.id === `sci-f1-c5-${lang}-q30`);
      expect(density?.options[density.answerIndex]).toBe(lang === "bm" ? "X terapung manakala Y tenggelam" : "X floats while Y sinks");
    }
  });
});
