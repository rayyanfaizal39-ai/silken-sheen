import { describe, expect, it } from "vitest";
import { getChapterQuizQuestions } from "@/content/registry";
import { getItemChapterKey, quizzes } from "@/data/content";
import {
  normalizeQuizDifficulty,
  orderRegularQuizQuestions,
  shuffleQuestionOptions,
} from "@/features/quiz/difficulty/quizDifficulty";

// Cross-chapter audit of the records actually served to students. The older
// src/data/quizzes.ts copies of Bab 4–6 and 8 are NOT the live source.
const chapters = Array.from({ length: 8 }, (_, index) => index + 1);
const questionsFor = (chapter: number) =>
  getChapterQuizQuestions("sejarah", "Form 1", "Chapter " + chapter);

const seedRandom = (initialSeed: number) => {
  let seed = initialSeed >>> 0;
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
};

const normalize = (value: string) => value.trim().normalize("NFKC").toLowerCase();

describe("Sejarah Tingkatan 1 — eight-chapter live quiz-bank audit", () => {
  it("serves exactly 240 unique questions through the registry", () => {
    const served = chapters.flatMap(questionsFor);
    const ids = served.map((question) => question.id);

    expect(served).toHaveLength(240);
    expect(new Set(ids).size).toBe(240);

    const fromLiveData = quizzes.filter(
      (question) =>
        question.subjectId === "sejarah" &&
        question.form === "Form 1" &&
        /^sej-f1-c[1-8]-q\d+$/.test(question.id),
    );
    expect(fromLiveData).toHaveLength(240);
    expect(new Set(fromLiveData.map((question) => question.id)).size).toBe(240);
    expect(new Set(ids)).toEqual(new Set(fromLiveData.map((question) => question.id)));
  });

  it.each(chapters)("Bab %i retains 30 questions, sequential IDs and the expected XP tiers", (chapter) => {
    const bank = questionsFor(chapter);
    expect(bank.map((question) => question.id)).toEqual(
      Array.from({ length: 30 }, (_, index) => "sej-f1-c" + chapter + "-q" + (index + 1)),
    );

    const expected = chapter <= 2 ? [8, 16, 6] : [8, 15, 7];
    const tiers = bank.map((question) => normalizeQuizDifficulty(question.difficulty));
    expect([
      tiers.filter((tier) => tier === "easy").length,
      tiers.filter((tier) => tier === "medium").length,
      tiers.filter((tier) => tier === "hard").length,
    ]).toEqual(expected);

    const stems = bank.map((question) => normalize(question.question));
    expect(new Set(stems).size).toBe(30);

    for (const question of bank) {
      expect(question.subjectId).toBe("sejarah");
      expect(question.form).toBe("Form 1");
      expect(getItemChapterKey(question)).toBe("Chapter " + chapter);

      expect(question.question.trim().length, question.id).toBeGreaterThan(12);
      expect(question.options, question.id).toHaveLength(4);
      expect(new Set(question.options.map(normalize)).size, question.id).toBe(4);
      expect(question.options.every((option) => option.trim().length > 0), question.id).toBe(true);
      expect(Number.isInteger(question.answerIndex), question.id).toBe(true);
      expect(question.answerIndex, question.id).toBeGreaterThanOrEqual(0);
      expect(question.answerIndex, question.id).toBeLessThan(4);
      expect(question.explanation?.trim().length ?? 0, question.id).toBeGreaterThan(15);

      // These questions have no diagrams attached: stems cannot depend on unseen visual prompts.
      expect(question.question, question.id).not.toMatch(
        /(?:gambar|rajah|peta|jadual)\s+(?:di atas|di bawah|berikut)|rujuk\s+(?:gambar|rajah|peta)|(?:Rajah|Jadual)\s+\d+/i,
      );
      expect(question.options.join(" "), question.id).not.toMatch(/semua\s+(?:di atas|jawapan)/i);
    }
  });

  it.each(chapters)("Bab %i reshuffles the entire 30-question pool without altering question identities", (chapter) => {
    const bank = questionsFor(chapter);
    const scope = { subjectId: "sejarah", form: "Form 1" };
    const a = orderRegularQuizQuestions(bank, scope, seedRandom(1234));
    const b = orderRegularQuizQuestions(bank, scope, seedRandom(7890));

    expect(a.issues).toHaveLength(0);
    expect(b.issues).toHaveLength(0);
    expect(new Set(a.questions.map((question) => question.id))).toEqual(
      new Set(bank.map((question) => question.id)),
    );
    expect(a.questions.map((question) => question.id)).not.toEqual(
      b.questions.map((question) => question.id),
    );
    // Sejarah Form 1 mixes tiers: it must not silently revert to Easy → Medium → Hard blocks.
    expect(a.questions.slice(0, 8).every((question) => question.difficulty === "Easy")).toBe(false);
  });

  it.each(chapters)("Bab %i preserves the correct answer while shuffling four choices", (chapter) => {
    for (const [index, question] of questionsFor(chapter).entries()) {
      const correctAnswer = question.options[question.answerIndex];
      const shuffled = shuffleQuestionOptions(question, seedRandom(1000 + index));
      expect(shuffled.options, question.id).toHaveLength(4);
      expect(shuffled.options[shuffled.answerIndex], question.id).toBe(correctAnswer);
      expect(new Set(shuffled.options), question.id).toEqual(new Set(question.options));
    }
  });
});
