import { describe, expect, it } from "vitest";
import { getChapterQuizQuestions } from "@/content/registry";
import { buildCanonicalQuizKey } from "@/features/quiz/xp/quizXp";
import { orderQuestionsByDifficulty } from "@/features/quiz/difficulty/quizDifficulty";
import chapter1A from "./sejarah-f3-quiz-source/chapter_1_quiz_set_a-25-final.json";
import chapter1B from "./sejarah-f3-quiz-source/chapter_1_quiz_set_b-25-final.json";
import chapter2A from "./sejarah-f3-quiz-source/chapter_2_quiz_set_a-25-final.json";
import chapter2B from "./sejarah-f3-quiz-source/chapter_2_quiz_set_b-25-final.json";
import chapter3A from "./sejarah-f3-quiz-source/chapter_3_quiz_set_a-25-final.json";
import chapter3B from "./sejarah-f3-quiz-source/chapter_3_quiz_set_b-25-final.json";
import chapter4A from "./sejarah-f3-quiz-source/chapter_4_quiz_set_a-25-final.json";
import chapter4B from "./sejarah-f3-quiz-source/chapter_4_quiz_set_b-25-final.json";
import chapter5A from "./sejarah-f3-quiz-source/chapter_5_quiz_set_a-25-final.json";
import chapter5B from "./sejarah-f3-quiz-source/chapter_5_quiz_set_b-25-final.json";
import chapter6A from "./sejarah-f3-quiz-source/chapter_6_quiz_set_a-25-final.json";
import chapter6B from "./sejarah-f3-quiz-source/chapter_6_quiz_set_b-25-final.json";
import chapter7A from "./sejarah-f3-quiz-source/chapter_7_quiz_set_a-25-final.json";
import chapter7B from "./sejarah-f3-quiz-source/chapter_7_quiz_set_b-25-final.json";
import chapter8A from "./sejarah-f3-quiz-source/chapter_8_quiz_set_a-25-final.json";
import chapter8B from "./sejarah-f3-quiz-source/chapter_8_quiz_set_b-25-final.json";

const sources = [
  [1, "A", chapter1A], [1, "B", chapter1B],
  [2, "A", chapter2A], [2, "B", chapter2B],
  [3, "A", chapter3A], [3, "B", chapter3B],
  [4, "A", chapter4A], [4, "B", chapter4B],
  [5, "A", chapter5A], [5, "B", chapter5B],
  [6, "A", chapter6A], [6, "B", chapter6B],
  [7, "A", chapter7A], [7, "B", chapter7B],
  [8, "A", chapter8A], [8, "B", chapter8B],
] as const;

describe("Form 3 Sejarah approved 25-question quiz routing", () => {
  it.each(sources)("routes Chapter %i Set %s through all 25 source questions", (chapter, set, source) => {
    const chapterPool = getChapterQuizQuestions("sejarah", "Form 3", `Chapter ${chapter}`);
    const session = chapterPool.filter((question) => question.set === set);
    expect(source.chapter).toBe(chapter);
    expect(source.set).toBe(`Set ${set}`);
    expect(source.total_questions).toBe(25);
    expect(source.questions.map((question) => question.id)).toEqual(Array.from({ length: 25 }, (_, i) => i + 1));
    expect(session).toHaveLength(25);
    expect(orderQuestionsByDifficulty(session).questions).toHaveLength(25);
    expect(chapterPool).toHaveLength(50);
    expect(session.map((question) => question.id)).toEqual(
      source.questions.map((question) => `sej-f3-c${chapter}-${set.toLowerCase()}-q${question.id}`),
    );
    for (const [index, item] of source.questions.entries()) {
      expect(session[index]).toMatchObject({
        question: item.question,
        options: [item.options.A, item.options.B, item.options.C, item.options.D],
        answerIndex: ["A", "B", "C", "D"].indexOf(item.answer),
        explanation: item.explanation,
        difficulty: "Medium",
      });
    }
    const key = buildCanonicalQuizKey({
      kind: "standard", subjectId: "sejarah", form: "Form 3",
      chapterKey: `Chapter ${chapter}`, lang: "bm", set, difficulty: "All",
    });
    expect(key).toBe(`quiz-v2:standard:sejarah:form-3:chapter-${chapter}:bm:set-${set.toLowerCase()}:difficulty-all`);
  });

  it("keeps chapter and set sessions independent and leaves earlier forms alone", () => {
    const keys = sources.map(([chapter, set]) => `sej-f3-c${chapter}-${set.toLowerCase()}`);
    expect(new Set(keys).size).toBe(16);
    expect(getChapterQuizQuestions("sejarah", "Form 1", "Chapter 1")).toHaveLength(30);
    expect(getChapterQuizQuestions("sejarah", "Form 2", "Chapter 1").length).toBeGreaterThan(0);
  });
});
