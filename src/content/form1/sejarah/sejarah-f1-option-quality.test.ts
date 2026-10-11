import { describe, expect, it } from "vitest";
import { getChapterQuizQuestions } from "@/content/registry";

// This inspects the live registry rather than stale duplicated Sejarah quiz data.
const chapters = Array.from({ length: 8 }, (_, index) => index + 1);
const banks = chapters.map((chapter) => ({
  chapter,
  questions: getChapterQuizQuestions("sejarah", "Form 1", `Chapter ${chapter}`),
}));
const allQuestions = banks.flatMap(({ questions }) => questions);
const length = (option: string) => option.trim().length;

const longerThanAllOthers = (
  question: (typeof allQuestions)[number],
  factor: number,
) => {
  const correct = length(question.options[question.answerIndex]);
  const others = question.options.filter((_, index) => index !== question.answerIndex).map(length);
  return correct > Math.max(...others) * factor;
};

const shorterThanAllOthers = (
  question: (typeof allQuestions)[number],
  factor: number,
) => {
  const correct = length(question.options[question.answerIndex]);
  const others = question.options.filter((_, index) => index !== question.answerIndex).map(length);
  return correct * factor < Math.min(...others);
};

describe("Sejarah Form 1 — full live-bank objective audit", () => {
  it("serves eight unique 30-question banks, 240 questions in all", () => {
    expect(banks).toHaveLength(8);
    for (const { chapter, questions } of banks) {
      expect(questions, `Chapter ${chapter}`).toHaveLength(30);
      expect(
        questions.map((q) => q.id).sort(),
        `Chapter ${chapter} IDs`,
      ).toEqual(
        Array.from({ length: 30 }, (_, index) => `sej-f1-c${chapter}-q${index + 1}`).sort(),
      );
      expect(new Set(questions.map((q) => q.question)).size, `Chapter ${chapter} stems`).toBe(30);
    }
    expect(allQuestions).toHaveLength(240);
    expect(new Set(allQuestions.map((q) => q.id)).size).toBe(240);
  });

  it("has clear stems, four distinct choices, valid answer keys and explanations", () => {
    for (const { chapter, questions } of banks) {
      for (const q of questions) {
        expect(q.subjectId, q.id).toBe("sejarah");
        expect(q.form, q.id).toBe("Form 1");
        expect(q.options, q.id).toHaveLength(4);
        expect(new Set(q.options.map((o) => o.trim().toLowerCase())).size, q.id).toBe(4);
        expect(q.answerIndex, q.id).toBeGreaterThanOrEqual(0);
        expect(q.answerIndex, q.id).toBeLessThan(4);
        expect(q.question.trim().length, q.id).toBeGreaterThan(12);
        expect(q.options.every((o) => o.trim().length > 0), q.id).toBe(true);
        expect((q.explanation ?? "").trim().length, q.id).toBeGreaterThan(15);
        expect(q.id.startsWith(`sej-f1-c${chapter}-`)).toBe(true);
      }
    }
  });

  it("does not require unseen diagrams or image assets", () => {
    for (const q of allQuestions) {
      expect(
        Object.keys(q).filter((field) => /^(image|img|media|video|audio)/i.test(field)),
        q.id,
      ).toEqual([]);
      expect(q.question, q.id).not.toMatch(
        /gambar di atas|rajah di atas|gambar berikut|rajah berikut|rujuk gambar|lihat rajah/i,
      );
    }
  });

  it("keeps the textbook-linked stored difficulties intact", () => {
    const values = ["Easy", "Medium", "Hard"];
    for (const q of allQuestions) {
      expect(values, q.id).toContain(q.difficulty);
    }
  });

  it("does not create a subject-wide 'pick the longest' trick", () => {
    const strictlyLongest = allQuestions.filter((q) => longerThanAllOthers(q, 1));
    // Older, unaudited duplicate banks were severely biased; the live bank is not.
    expect(strictlyLongest.length).toBeLessThanOrEqual(55);
    for (const { chapter, questions } of banks) {
      expect(
        questions.filter((q) => longerThanAllOthers(q, 1)).length,
        `Chapter ${chapter} longest correct answers`,
      ).toBeLessThanOrEqual(10);
    }
  });

  it("alerts reviewers when one answer is conspicuously longer or shorter", () => {
    // Baseline risk budget, *not* a claim that five outliers are desirable.
    // Existing editorial action list lives in form1-option-quality-audit-20261011.md.
    const veryLong = allQuestions.filter((q) => longerThanAllOthers(q, 1.2));
    const veryShort = allQuestions.filter((q) => shorterThanAllOthers(q, 1.6));
    expect(veryLong.map((q) => q.id).length).toBeLessThanOrEqual(5);
    expect(veryShort.map((q) => q.id).length).toBeLessThanOrEqual(2);
  });
});
