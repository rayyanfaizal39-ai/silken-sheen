import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { getChapterQuizQuestions } from "@/content/registry";
import { getSejarahF1QuizImage, getSejarahF1QuizImageAlt, SEJARAH_F1_QUIZ_IMAGES } from "./quiz-visuals";

const chapters = Array.from({ length: 8 }, (_, index) => index + 1);
const bank = chapters.flatMap((number) =>
  getChapterQuizQuestions("sejarah", "Form 1", `Chapter ${number}`),
);

describe("Sejarah Form 1 complete quiz neutrality audit", () => {
  it("serves all 240 canonical questions in eight chapters, with stable IDs and distinct options", () => {
    expect(bank).toHaveLength(240);
    expect(new Set(bank.map((question) => question.id)).size).toBe(240);
    for (const number of chapters) {
      const chapter = getChapterQuizQuestions("sejarah", "Form 1", `Chapter ${number}`);
      expect(chapter.map((question) => question.id)).toEqual(
        Array.from({ length: 30 }, (_, index) => `sej-f1-c${number}-q${index + 1}`),
      );
    }
    for (const question of bank) {
      expect(question.options, question.id).toHaveLength(4);
      expect(new Set(question.options).size, question.id).toBe(4);
      expect(question.answerIndex, question.id).toBeGreaterThanOrEqual(0);
      expect(question.answerIndex, question.id).toBeLessThan(4);
      expect(question.explanation?.trim().length, question.id).toBeGreaterThan(20);
    }
  });

  it("blocks severe correct-answer length cues across all 240 served quiz records", () => {
    let longest = 0;
    for (const question of bank) {
      const answer = question.options[question.answerIndex].trim();
      const others = question.options.filter((_, index) => index !== question.answerIndex);
      const average = others.reduce((sum, option) => sum + option.trim().length, 0) / 3;
      const ratio = answer.length / average;
      expect(ratio, `${question.id} too short: ${ratio.toFixed(2)}`).toBeGreaterThanOrEqual(0.65);
      expect(ratio, `${question.id} too long: ${ratio.toFixed(2)}`).toBeLessThanOrEqual(1.5);
      if (answer.length === Math.max(...question.options.map((option) => option.trim().length))) {
        longest += 1;
      }
    }
    // Option shuffling must remain the operational bias control; length balance is a guardrail.
    expect(longest / bank.length).toBeLessThan(0.4);
  });

  it("adds seven unique, self-contained and accessible teaching diagrams without changing quiz records", () => {
    const ids = Object.keys(SEJARAH_F1_QUIZ_IMAGES);
    expect(ids).toHaveLength(7);
    expect(new Set(Object.values(SEJARAH_F1_QUIZ_IMAGES)).size).toBe(7);
    for (const id of ids) {
      const question = bank.find((item) => item.id === id);
      expect(question, id).toBeDefined();
      expect(question?.image, `${id}: quiz bank stays canonical`).toBeUndefined();
      const source = getSejarahF1QuizImage(question!);
      expect(source).toBe(SEJARAH_F1_QUIZ_IMAGES[id]);
      expect(getSejarahF1QuizImageAlt(id).length).toBeGreaterThan(35);
      const svg = readFileSync(new URL(`../../../../public${source}`, import.meta.url), "utf8");
      expect(svg).toContain('viewBox="0 0 640 320"');
      expect(svg).not.toMatch(/<script|<foreignObject|<image\b|(?:xlink:)?href="https?:\/\//i);
    }
    expect(getSejarahF1QuizImageAlt("unrelated")).toBe("");
    expect(getSejarahF1QuizImage({ id: "sci-f1-c1-bm-q4" })).toBeUndefined();
  });
});
