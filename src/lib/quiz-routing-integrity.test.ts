import { describe, expect, it } from "vitest";
import { getChapterQuizQuestions } from "@/content/registry";
import { getEnglishQuizSetF2 } from "@/data/english-f2-quiz-sets";
import { auditQuizRegistry, getQuizAuditEntries } from "@/lib/quiz-audit";
import { acceptCachedQuizState, createQuizKey, type QuizIdentity } from "@/lib/quiz-identity";

const sejarahForm1Identity = (chapter: number): QuizIdentity => ({
  subject: "sejarah",
  form: 1,
  chapter: `Chapter ${chapter}`,
  language: "bm",
  set: "default",
});

describe("quiz content routing integrity", () => {
  it.each(Array.from({ length: 8 }, (_, index) => index + 1))(
    "keeps Sejarah Form 1 Chapter %i inside its exact identity",
    (chapter) => {
      const questions = getChapterQuizQuestions("sejarah", "Form 1", `Chapter ${chapter}`);

      expect(questions).toHaveLength(30);
      expect(
        questions.every(
          (question) =>
            question.subjectId === "sejarah" &&
            question.form === "Form 1" &&
            question.id.startsWith(`sej-f1-c${chapter}-`),
        ),
      ).toBe(true);
      expect(questions.some((question) => /sej-f[23]-/.test(question.id))).toBe(false);
    },
  );

  it("rejects a chapter lookup that omits the form identity", () => {
    expect(getChapterQuizQuestions("sejarah", "All", "Chapter 1")).toEqual([]);
  });

  it("routes English Form 2 to Form 2-owned sets", () => {
    for (const setId of ["objective-a", "objective-b", "objective-c"] as const) {
      const questions = getEnglishQuizSetF2(setId);
      expect(questions.length).toBeGreaterThan(0);
      expect(
        questions.every(
          (question) =>
            question.subjectId === "english" &&
            question.form === "Form 2" &&
            question.id.startsWith(`eng-f2-${setId}-`),
        ),
      ).toBe(true);
    }
  });

  it("has one owner for every canonical quiz key and no critical audit issue", () => {
    const entries = getQuizAuditEntries();
    const keys = entries.map((entry) => entry.canonicalKey);

    expect(new Set(keys).size).toBe(keys.length);
    expect(auditQuizRegistry().criticalIssues).toEqual([]);
  });
});

describe("canonical quiz identity", () => {
  it("changes the canonical key when form, language, or set changes", () => {
    const base = sejarahForm1Identity(1);
    const keys = [
      createQuizKey(base),
      createQuizKey({ ...base, form: 2 }),
      createQuizKey({ ...base, language: "dlp" }),
      createQuizKey({ ...base, set: 2 }),
    ];

    expect(new Set(keys).size).toBe(keys.length);
  });

  it("rejects stale cached state from a different quiz identity", () => {
    const requested = sejarahForm1Identity(1);
    const stale = {
      quizKey: createQuizKey({ ...requested, form: 2 }),
      questionIndex: 12,
    };
    const matching = {
      quizKey: createQuizKey(requested),
      questionIndex: 3,
    };

    expect(acceptCachedQuizState(stale, requested)).toBeNull();
    expect(acceptCachedQuizState(matching, requested)).toEqual(matching);
  });
});
