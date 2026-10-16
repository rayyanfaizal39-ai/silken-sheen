import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { quizzes } from "@/data/content";
import { getChapterQuizQuestions } from "@/content/registry";
import { GEOGRAPHY_F1_QUIZ_IMAGES } from "./quiz-visuals";

const source = quizzes.filter(
  (q) => q.subjectId === "geography" && q.form === "Form 1",
);

describe("Geography Form 1 repeat audit and visual integration", () => {
  it("preserves exactly 30 unique quiz IDs for each of 13 chapters", () => {
    expect(source).toHaveLength(390);
    expect(new Set(source.map((q) => q.id)).size).toBe(390);
    for (let chapter = 1; chapter <= 13; chapter++) {
      const chapterKey = `Chapter ${chapter}`;
      const chapterQuizzes = source.filter((q) => q.chapter === chapterKey);
      const live = getChapterQuizQuestions("geography", "Form 1", chapterKey);
      const ids = Array.from({ length: 30 }, (_, index) => `geo-f1-c${chapter}-q${index + 1}`);
      expect(chapterQuizzes.map((q) => q.id)).toEqual(ids);
      expect(live.map((q) => q.id)).toEqual(ids);
      for (const question of chapterQuizzes) {
        expect(question.options, question.id).toHaveLength(4);
        expect(new Set(question.options).size, question.id).toBe(4);
        expect(question.answerIndex, question.id).toBeGreaterThanOrEqual(0);
        expect(question.answerIndex, question.id).toBeLessThan(4);
        expect(question.options[question.answerIndex].length, question.id).toBeGreaterThan(0);
        expect(question.explanation?.trim().length, question.id).toBeGreaterThan(15);
      }
    }
  });

  it("repairs the previously unanswerable Chapter 2 post-office problem", () => {
    const question = source.find((q) => q.id === "geo-f1-c2-q28");
    expect(question?.question).toContain("Pejabat pos berada bertentangan dengan sekolah");
    expect(question?.question).toContain("sekolah di sebelah kiri");
    expect(question?.options[question.answerIndex]).toBe("Sebelah kanan masjid.");
    expect(question?.explanation).toContain("Kedudukan tidak boleh ditentukan hanya dengan menolak tiga arah lain.");
  });

  it("makes Chapter 13 disease distractors plausible without changing the key", () => {
    const q = source.find((question) => question.id === "geo-f1-c13-q25");
    expect(q?.options[q.answerIndex]).toBe("Taun, demam denggi dan malaria");
    expect(q?.options).toHaveLength(4);
    expect(q?.options.some((option) => option.includes("asma"))).toBe(true);
    expect(q?.options.some((option) => option.includes("diabetes"))).toBe(true);
    expect(q?.options.some((option) => option.includes("rabun malam"))).toBe(true);
  });

  it("attaches exactly eight existing-ID SVGs only to live Form 1 Geography questions", () => {
    expect(Object.keys(GEOGRAPHY_F1_QUIZ_IMAGES)).toHaveLength(8);
    const all = Array.from({ length: 13 }, (_, i) =>
      getChapterQuizQuestions("geography", "Form 1", `Chapter ${i + 1}`)
    ).flat();
    expect(all.filter((q) => q.image)).toHaveLength(8);
    for (const q of all) {
      const expected = GEOGRAPHY_F1_QUIZ_IMAGES[q.id];
      expect(q.image).toBe(expected);
      const raw = source.find((s) => s.id === q.id);
      expect(raw?.question).toBe(q.question);
      expect(raw?.answerIndex).toBe(q.answerIndex);
      expect(raw?.options).toEqual(q.options);
      if (!expected) continue;
      expect(expected).toMatch(/^\/geography\/form1\/quiz-visuals\/geo-f1-c\d+-q\d+\.svg$/);
      const svg = readFileSync(`public${expected}`, "utf8");
      expect(svg).toContain('viewBox="0 0 720 360"');
      expect(svg).toMatch(/<title id="title">/);
      expect(svg).toMatch(/<desc id="description">/);
      expect(svg).toMatch(/<\/svg>/);
      expect(svg).not.toMatch(/<script|foreignObject|https?:\/\//);
    }
  });
});
