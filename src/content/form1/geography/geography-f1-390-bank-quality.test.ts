import { describe, expect, it } from "vitest";
import { quizzes } from "@/data/content";
import { getChapterQuizQuestions } from "@/content/registry";

// Cross-chapter safety net for the ACTUAL Form 1 Geografi bank.
// The older src/data/quizzes.ts chapter copies are not the live registry owner.
const chapters = Array.from({ length: 13 }, (_, index) => index + 1);
const byChapter = chapters.map((number) => ({
  number,
  questions: getChapterQuizQuestions("geography", "Form 1", `Chapter ${number}`),
}));
const all = byChapter.flatMap(({ questions }) => questions);
const byId = (id: string) => {
  const q = all.find((item) => item.id === id);
  expect(q, id).toBeDefined();
  return q!;
};
const optionLengths = (q: (typeof all)[number]) => q.options.map((text) => text.trim().length);
const otherLengths = (q: (typeof all)[number]) =>
  optionLengths(q).filter((_, index) => index !== q.answerIndex);
const isStrictlyLongest = (q: (typeof all)[number]) =>
  optionLengths(q)[q.answerIndex] > Math.max(...otherLengths(q));

describe("Geografi Form 1 — all 390 live quiz questions", () => {
  it("has exactly 13 chapters and 30 unique sequential question IDs each", () => {
    expect(byChapter).toHaveLength(13);
    for (const { number, questions } of byChapter) {
      expect(questions, `Bab ${number}`).toHaveLength(30);
      expect(questions.map((q) => q.id)).toEqual(
        Array.from({ length: 30 }, (_, i) => `geo-f1-c${number}-q${i + 1}`),
      );
      expect(new Set(questions.map((q) => q.question)).size, `Bab ${number} stems`).toBe(30);
    }
    expect(all).toHaveLength(390);
    expect(new Set(all.map((q) => q.id)).size).toBe(390);
    const live = quizzes.filter((q) => q.subjectId === "geography" && q.form === "Form 1");
    expect(live.map((q) => q.id).sort()).toEqual(all.map((q) => q.id).sort());
  });

  it("has four different, nonempty choices and valid keys/explanations throughout", () => {
    for (const q of all) {
      expect(q.subjectId, q.id).toBe("geography");
      expect(q.form, q.id).toBe("Form 1");
      expect(q.question.trim().length, q.id).toBeGreaterThan(10);
      expect(q.options, q.id).toHaveLength(4);
      expect(new Set(q.options.map((value) => value.trim().toLocaleLowerCase("ms"))).size, q.id).toBe(4);
      expect(Number.isInteger(q.answerIndex), q.id).toBe(true);
      expect(q.answerIndex, q.id).toBeGreaterThanOrEqual(0);
      expect(q.answerIndex, q.id).toBeLessThan(4);
      expect(q.options[q.answerIndex].trim().length, q.id).toBeGreaterThan(0);
      expect((q.explanation ?? "").trim().length, q.id).toBeGreaterThan(15);
    }
  });

  it("guards against systemic longest-answer bias without padding place names", () => {
    const strictLongest = all.filter(isStrictlyLongest);
    // The 2026-10-11 live baseline is 90/390 (23.1%). A small editorial budget
    // allows natural map labels and names without rewarding a selection heuristic.
    expect(strictLongest.length).toBeLessThanOrEqual(98);
    for (const { number, questions } of byChapter) {
      expect(questions.filter(isStrictlyLongest).length, `Bab ${number}`).toBeLessThanOrEqual(11);
    }
    const severeLongest = all.filter(
      (q) => optionLengths(q)[q.answerIndex] > Math.max(...otherLengths(q)) * 1.25,
    );
    expect(severeLongest.length).toBeLessThanOrEqual(3);
  });

  it("does not introduce visibly implausible absolute-word distractors at scale", () => {
    const sweepingWrongChoices = all.flatMap((q) =>
      q.options.filter(
        (option, index) =>
          index !== q.answerIndex && /\b(semua|tiada|sahaja|sentiasa|hanya)\b/i.test(option),
      ),
    );
    // Nine remain in the revised bank; each needs contextual manual judgment,
    // especially comparisons that legitimately use exclusivity.
    expect(sweepingWrongChoices.length).toBeLessThanOrEqual(12);
  });

  it("keeps the revised map-position and applied-environment questions clear", () => {
    const position = byId("geo-f1-c2-q21");
    expect(position.question).not.toMatch(/\.\.\.|\?\?/);
    expect(position.options[position.answerIndex]).toBe(
      "Persilangan antara latitud dan longitud.",
    );
    expect(Math.max(...optionLengths(position)) / Math.min(...optionLengths(position))).toBeLessThan(1.2);

    const water = byId("geo-f1-c6-q24");
    expect(water.options[water.answerIndex]).toBe("Bekalan air domestik dan industri");
    expect(Math.max(...optionLengths(water)) / Math.min(...optionLengths(water))).toBeLessThan(1.3);

    const population = byId("geo-f1-c8-q2");
    expect(population.options[population.answerIndex]).toBe("Tidak sekata antara kawasan");
    expect(population.options.join(" ")).not.toMatch(/semua negeri/i);

    const location = byId("geo-f1-c11-q17");
    expect(location.options[location.answerIndex]).toBe("Pantai timur Semenanjung Malaysia");
    expect(Math.max(...optionLengths(location)) / Math.min(...optionLengths(location))).toBeLessThan(1.4);

    const waste = byId("geo-f1-c13-q30");
    expect(waste.question).toMatch(/paling lengkap/);
    expect(waste.options[waste.answerIndex]).toBe(
      "Amalkan 3R, jalankan kempen kesedaran dan kuatkuasakan denda pembuangan haram",
    );
    expect(Math.max(...optionLengths(waste)) / Math.min(...optionLengths(waste))).toBeLessThan(1.3);
    expect(waste.options.join(" ")).not.toMatch(/bakar sampah|hanya denda/i);
  });
});
