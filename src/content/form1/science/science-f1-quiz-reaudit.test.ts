import { describe, expect, it } from "vitest";
import { getChapterQuizQuestions } from "@/content/registry";
import { scienceF1QuizVisualById } from "./quiz-visuals";
import { shuffleQuestionOptions } from "@/features/quiz/difficulty/quizDifficulty";

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
          const original = JSON.stringify(question);
          for (const random of [() => 0, () => 0.35, () => 0.7, () => 0.99]) {
            const shuffled = shuffleQuestionOptions(question, random);
            expect(shuffled.options[shuffled.answerIndex]).toBe(
              question.options[question.answerIndex],
            );
            expect(shuffled.explanation).toBe(question.explanation);
          }
          expect(JSON.stringify(question)).toBe(original);
          expect(["Easy", "Medium", "Hard"]).toContain(question.difficulty);
          // Image lookup belongs to the view, not cloned canonical records.
          expect(question.image).toBeUndefined();
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

  it("maps 26 bilingual pairs of relevant SVG stimuli in the presentation layer", () => {
    expect(Object.keys(scienceF1QuizVisualById)).toHaveLength(52);
    for (const [id, path] of Object.entries(scienceF1QuizVisualById)) {
      expect(id).toMatch(/^sci-f1-c[1-9]-(bm|dlp)-q\d+$/);
      expect(path).toMatch(/^\/quiz-visuals\/science-f1\/[a-z-]+\.svg$/);
      const companion = id.replace(/-(?:bm|dlp)-/, id.includes("-bm-") ? "-dlp-" : "-bm-");
      expect(scienceF1QuizVisualById[companion]).toBe(path);
    }
  });

  it("uses 21 paired diagram assets, including seven answer-neutral new scenarios", () => {
    const paths = new Set(Object.values(scienceF1QuizVisualById));
    expect(paths.size).toBe(21);
    for (const path of paths) {
      expect(path).toMatch(/\.svg$/);
    }
  });

  it("guards against obvious correct-answer length cues in all 540 bilingual questions", () => {
    const outliers: string[] = [];
    for (const chapter of chapters) {
      for (const lang of languages) {
        for (const question of getChapterQuizQuestions("science", "Form 1", `Chapter ${chapter}`, lang)) {
          const sizes = question.options.map((option) => option.trim().length);
          const correct = sizes[question.answerIndex];
          const meanDistractor = (sizes.reduce((a, b) => a + b, 0) - correct) / 3;
          const ratio = correct / meanDistractor;
          if (ratio < 0.65 || ratio > 1.5) outliers.push(`${question.id}: ${ratio.toFixed(2)}`);
        }
      }
    }
    expect(outliers).toEqual([]);
  });

  it("keeps chapter 8 black-surface and chapter 5 density corrections in both languages", () => {
    for (const lang of languages) {
      const chapter8 = getChapterQuizQuestions("science", "Form 1", "Chapter 8", lang);
      const heat = chapter8.find((q) => q.id === `sci-f1-c8-${lang}-q30`);
      expect(heat?.options[heat.answerIndex]).toMatch(
        lang === "bm" ? /lebih besar/ : /greater fraction/,
      );
      const chapter5 = getChapterQuizQuestions("science", "Form 1", "Chapter 5", lang);
      const density = chapter5.find((q) => q.id === `sci-f1-c5-${lang}-q30`);
      expect(density?.options[density.answerIndex]).toBe(
        lang === "bm" ? "X terapung manakala Y tenggelam" : "X floats while Y sinks",
      );
    }
  });

  it("distinguishes heat production from reduced heat loss and preserves source-level refraction", () => {
    for (const lang of languages) {
      const get = (c: number, n: number) =>
        getChapterQuizQuestions("science", "Form 1", `Chapter ${c}`, lang).find((q) =>
          q.id.endsWith(`-q${n}`),
        )!;
      expect(get(3, 18).explanation).toMatch(
        lang === "bm" ? /Menggigil menghasilkan haba/ : /Shivering produces heat/,
      );
      expect(get(3, 18).explanation).toMatch(
        lang === "bm" ? /mengurangkan kehilangan haba/ : /reduce heat loss/,
      );
      expect(JSON.stringify([get(8, 19), get(8, 21)])).not.toMatch(/speed|kelajuan/i);
      expect(get(8, 18).options[get(8, 18).answerIndex]).toMatch(
        lang === "bm" ? /permukaan cermin/ : /mirror surface/,
      );
      expect(get(6, 24).options[get(6, 24).answerIndex]).toMatch(
        lang === "bm" ? /sekurang-kurangnya empat/ : /at least four/,
      );
      expect(get(2, 24).explanation).not.toMatch(/first pathways|laluan pertama/);
      expect(JSON.stringify(get(9, 28))).not.toMatch(/elastic|keanjalan|seismic|seismik/);
      const counts = [0, 0, 0, 0];
      for (const q of getChapterQuizQuestions("science", "Form 1", "Chapter 9", lang))
        counts[q.answerIndex]++;
      expect([...counts].sort()).toEqual([7, 7, 8, 8]);
    }
  });
});
