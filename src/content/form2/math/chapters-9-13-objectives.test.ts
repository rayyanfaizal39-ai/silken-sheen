import { describe, expect, it } from "vitest";
import * as c9bm from "./chapter-9/quizzes-bm";
import * as c9dlp from "./chapter-9/quizzes-dlp";
import * as c10bm from "./chapter-10/quizzes-bm";
import * as c10dlp from "./chapter-10/quizzes-dlp";
import * as c11bm from "./chapter-11/quizzes-bm";
import * as c11dlp from "./chapter-11/quizzes-dlp";
import * as c12bm from "./chapter-12/quizzes-bm";
import * as c12dlp from "./chapter-12/quizzes-dlp";
import * as c13bm from "./chapter-13/quizzes-bm";
import * as c13dlp from "./chapter-13/quizzes-dlp";

const chapters = [
  {
    chapter: 9,
    bmAll: c9bm.mathF2C9QuizzesBM,
    dlpAll: c9dlp.mathF2C9QuizzesDLP,
    bm: [
      c9bm.mathF2C9FoundationQuizzesBM,
      c9bm.mathF2C9PracticeQuizzesBM,
      c9bm.mathF2C9ChallengeQuizzesBM,
    ],
    dlp: [
      c9dlp.mathF2C9FoundationQuizzesDLP,
      c9dlp.mathF2C9PracticeQuizzesDLP,
      c9dlp.mathF2C9ChallengeQuizzesDLP,
    ],
  },
  {
    chapter: 10,
    bmAll: c10bm.mathF2C10QuizzesBM,
    dlpAll: c10dlp.mathF2C10QuizzesDLP,
    bm: [
      c10bm.mathF2C10FoundationQuizzesBM,
      c10bm.mathF2C10PracticeQuizzesBM,
      c10bm.mathF2C10ChallengeQuizzesBM,
    ],
    dlp: [
      c10dlp.mathF2C10FoundationQuizzesDLP,
      c10dlp.mathF2C10PracticeQuizzesDLP,
      c10dlp.mathF2C10ChallengeQuizzesDLP,
    ],
  },
  {
    chapter: 11,
    bmAll: c11bm.mathF2C11QuizzesBM,
    dlpAll: c11dlp.mathF2C11QuizzesDLP,
    bm: [
      c11bm.mathF2C11FoundationQuizzesBM,
      c11bm.mathF2C11PracticeQuizzesBM,
      c11bm.mathF2C11ChallengeQuizzesBM,
    ],
    dlp: [
      c11dlp.mathF2C11FoundationQuizzesDLP,
      c11dlp.mathF2C11PracticeQuizzesDLP,
      c11dlp.mathF2C11ChallengeQuizzesDLP,
    ],
  },
  {
    chapter: 12,
    bmAll: c12bm.mathF2C12QuizzesBM,
    dlpAll: c12dlp.mathF2C12QuizzesDLP,
    bm: [
      c12bm.mathF2C12FoundationQuizzesBM,
      c12bm.mathF2C12PracticeQuizzesBM,
      c12bm.mathF2C12ChallengeQuizzesBM,
    ],
    dlp: [
      c12dlp.mathF2C12FoundationQuizzesDLP,
      c12dlp.mathF2C12PracticeQuizzesDLP,
      c12dlp.mathF2C12ChallengeQuizzesDLP,
    ],
  },
  {
    chapter: 13,
    bmAll: c13bm.mathF2C13QuizzesBM,
    dlpAll: c13dlp.mathF2C13QuizzesDLP,
    bm: [
      c13bm.mathF2C13FoundationQuizzesBM,
      c13bm.mathF2C13PracticeQuizzesBM,
      c13bm.mathF2C13ChallengeQuizzesBM,
    ],
    dlp: [
      c13dlp.mathF2C13FoundationQuizzesDLP,
      c13dlp.mathF2C13PracticeQuizzesDLP,
      c13dlp.mathF2C13ChallengeQuizzesDLP,
    ],
  },
];

describe("Mathematics Form 2 Batch C objective banks", () => {
  it.each(chapters)("keeps Chapter $chapter BM and DLP in isolated objectives", (entry) => {
    for (const banks of [entry.bm, entry.dlp]) {
      expect(banks.map((bank) => bank.length)).toEqual([30, 30, 30]);
      expect(new Set(banks.flatMap((bank) => bank.map((q) => q.id))).size).toBe(90);
    }
    expect(entry.bm.flat().map((q) => q.id)).toEqual(entry.bmAll.map((q) => q.id));
    expect(entry.dlp.flat().map((q) => q.id)).toEqual(entry.dlpAll.map((q) => q.id));
  });
  it.each(chapters)("keeps Chapter $chapter BM/DLP structurally paired", (entry) => {
    expect(entry.bmAll.map((q) => q.answerIndex)).toEqual(entry.dlpAll.map((q) => q.answerIndex));
    expect(entry.bmAll.every((q) => q.lang === "bm")).toBe(true);
    expect(entry.dlpAll.every((q) => q.lang === "dlp")).toBe(true);
  });
});
