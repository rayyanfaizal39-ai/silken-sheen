import { describe, expect, it } from "vitest";
import {
  mathF2C6QuizzesBM,
  mathF2C6FoundationQuizzesBM,
  mathF2C6PracticeQuizzesBM,
  mathF2C6ChallengeQuizzesBM,
} from "./chapter-6/quizzes-bm";
import {
  mathF2C6QuizzesDLP,
  mathF2C6FoundationQuizzesDLP,
  mathF2C6PracticeQuizzesDLP,
  mathF2C6ChallengeQuizzesDLP,
} from "./chapter-6/quizzes-dlp";
import {
  mathF2C7QuizzesBM,
  mathF2C7FoundationQuizzesBM,
  mathF2C7PracticeQuizzesBM,
  mathF2C7ChallengeQuizzesBM,
} from "./chapter-7/quizzes-bm";
import {
  mathF2C7QuizzesDLP,
  mathF2C7FoundationQuizzesDLP,
  mathF2C7PracticeQuizzesDLP,
  mathF2C7ChallengeQuizzesDLP,
} from "./chapter-7/quizzes-dlp";
import {
  mathF2C8QuizzesBM,
  mathF2C8FoundationQuizzesBM,
  mathF2C8PracticeQuizzesBM,
  mathF2C8ChallengeQuizzesBM,
} from "./chapter-8/quizzes-bm";
import {
  mathF2C8QuizzesDLP,
  mathF2C8FoundationQuizzesDLP,
  mathF2C8PracticeQuizzesDLP,
  mathF2C8ChallengeQuizzesDLP,
} from "./chapter-8/quizzes-dlp";

const chapters = [
  {
    chapter: 6,
    bmAll: mathF2C6QuizzesBM,
    dlpAll: mathF2C6QuizzesDLP,
    bm: [mathF2C6FoundationQuizzesBM, mathF2C6PracticeQuizzesBM, mathF2C6ChallengeQuizzesBM],
    dlp: [mathF2C6FoundationQuizzesDLP, mathF2C6PracticeQuizzesDLP, mathF2C6ChallengeQuizzesDLP],
  },
  {
    chapter: 7,
    bmAll: mathF2C7QuizzesBM,
    dlpAll: mathF2C7QuizzesDLP,
    bm: [mathF2C7FoundationQuizzesBM, mathF2C7PracticeQuizzesBM, mathF2C7ChallengeQuizzesBM],
    dlp: [mathF2C7FoundationQuizzesDLP, mathF2C7PracticeQuizzesDLP, mathF2C7ChallengeQuizzesDLP],
  },
  {
    chapter: 8,
    bmAll: mathF2C8QuizzesBM,
    dlpAll: mathF2C8QuizzesDLP,
    bm: [mathF2C8FoundationQuizzesBM, mathF2C8PracticeQuizzesBM, mathF2C8ChallengeQuizzesBM],
    dlp: [mathF2C8FoundationQuizzesDLP, mathF2C8PracticeQuizzesDLP, mathF2C8ChallengeQuizzesDLP],
  },
];

describe("Mathematics Form 2 Batch B objective banks", () => {
  it.each(chapters)(
    "keeps Chapter $chapter BM and DLP in isolated 30-question objectives",
    (entry) => {
      for (const banks of [entry.bm, entry.dlp]) {
        expect(banks.map((bank) => bank.length)).toEqual([30, 30, 30]);
        expect(new Set(banks.flatMap((bank) => bank.map(({ id }) => id))).size).toBe(90);
      }
      expect(entry.bm.flat().map(({ id }) => id)).toEqual(entry.bmAll.map(({ id }) => id));
      expect(entry.dlp.flat().map(({ id }) => id)).toEqual(entry.dlpAll.map(({ id }) => id));
    },
  );

  it.each(chapters)("keeps Chapter $chapter BM/DLP structurally paired", (entry) => {
    expect(entry.bmAll.map(({ answerIndex }) => answerIndex)).toEqual(
      entry.dlpAll.map(({ answerIndex }) => answerIndex),
    );
    expect(entry.bmAll.every(({ lang }) => lang === "bm")).toBe(true);
    expect(entry.dlpAll.every(({ lang }) => lang === "dlp")).toBe(true);
  });
});
