import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  mathF2C3ChallengeQuizzesBM,
  mathF2C3FoundationQuizzesBM,
  mathF2C3PracticeQuizzesBM,
  mathF2C3QuizzesBM,
} from "./chapter-3/quizzes-bm";
import {
  mathF2C3ChallengeQuizzesDLP,
  mathF2C3FoundationQuizzesDLP,
  mathF2C3PracticeQuizzesDLP,
  mathF2C3QuizzesDLP,
} from "./chapter-3/quizzes-dlp";
import {
  mathF2C4ChallengeQuizzesBM,
  mathF2C4FoundationQuizzesBM,
  mathF2C4PracticeQuizzesBM,
  mathF2C4QuizzesBM,
} from "./chapter-4/quizzes-bm";
import {
  mathF2C4ChallengeQuizzesDLP,
  mathF2C4FoundationQuizzesDLP,
  mathF2C4PracticeQuizzesDLP,
  mathF2C4QuizzesDLP,
} from "./chapter-4/quizzes-dlp";
import {
  mathF2C5ChallengeQuizzesBM,
  mathF2C5FoundationQuizzesBM,
  mathF2C5PracticeQuizzesBM,
  mathF2C5QuizzesBM,
} from "./chapter-5/quizzes-bm";
import {
  mathF2C5ChallengeQuizzesDLP,
  mathF2C5FoundationQuizzesDLP,
  mathF2C5PracticeQuizzesDLP,
  mathF2C5QuizzesDLP,
} from "./chapter-5/quizzes-dlp";

const chapters = [
  {
    chapter: 3,
    bm: [mathF2C3FoundationQuizzesBM, mathF2C3PracticeQuizzesBM, mathF2C3ChallengeQuizzesBM],
    dlp: [mathF2C3FoundationQuizzesDLP, mathF2C3PracticeQuizzesDLP, mathF2C3ChallengeQuizzesDLP],
    bmAll: mathF2C3QuizzesBM,
    dlpAll: mathF2C3QuizzesDLP,
  },
  {
    chapter: 4,
    bm: [mathF2C4FoundationQuizzesBM, mathF2C4PracticeQuizzesBM, mathF2C4ChallengeQuizzesBM],
    dlp: [mathF2C4FoundationQuizzesDLP, mathF2C4PracticeQuizzesDLP, mathF2C4ChallengeQuizzesDLP],
    bmAll: mathF2C4QuizzesBM,
    dlpAll: mathF2C4QuizzesDLP,
  },
  {
    chapter: 5,
    bm: [mathF2C5FoundationQuizzesBM, mathF2C5PracticeQuizzesBM, mathF2C5ChallengeQuizzesBM],
    dlp: [mathF2C5FoundationQuizzesDLP, mathF2C5PracticeQuizzesDLP, mathF2C5ChallengeQuizzesDLP],
    bmAll: mathF2C5QuizzesBM,
    dlpAll: mathF2C5QuizzesDLP,
  },
] as const;

const routeSource = readFileSync(new URL("../../../routes/quizzes.tsx", import.meta.url), "utf8");

describe("Mathematics Form 2 Chapters 3–5 Objective routing", () => {
  it.each(chapters)(
    "keeps Chapter $chapter BM and DLP as three isolated 30-question banks",
    (entry) => {
      for (const languageBanks of [entry.bm, entry.dlp]) {
        expect(languageBanks.map((bank) => bank.length)).toEqual([30, 30, 30]);
        const groupedIds = languageBanks.flatMap((bank) => bank.map(({ id }) => id));
        expect(groupedIds).toHaveLength(90);
        expect(new Set(groupedIds).size).toBe(90);
      }

      expect(new Set(entry.bm.flatMap((bank) => bank.map(({ id }) => id)))).toEqual(
        new Set(entry.bmAll.map(({ id }) => id)),
      );
      expect(new Set(entry.dlp.flatMap((bank) => bank.map(({ id }) => id)))).toEqual(
        new Set(entry.dlpAll.map(({ id }) => id)),
      );
    },
  );

  it("maps the six representative paths to their exact Objective exports", () => {
    expect(routeSource).toContain("bm: mathF2C3FoundationQuizzesBM");
    expect(routeSource).toContain("bm: mathF2C4PracticeQuizzesBM");
    expect(routeSource).toContain("bm: mathF2C5ChallengeQuizzesBM");
    expect(routeSource).toContain("dlp: mathF2C3ChallengeQuizzesDLP");
    expect(routeSource).toContain("dlp: mathF2C4FoundationQuizzesDLP");
    expect(routeSource).toContain("dlp: mathF2C5PracticeQuizzesDLP");
  });

  it.each([3, 4, 5])(
    "enables the existing Objective UI gate for Chapter %s BM and DLP",
    (chapter) => {
      expect(routeSource).toContain(`isForm2Chapter${chapter}BmObjective`);
      expect(routeSource).toContain(`isForm2Chapter${chapter}DlpObjective`);
    },
  );

  it("shuffles only the selected bank and retains next, results, and retry behavior", () => {
    expect(routeSource).toContain(
      "setMathShuffledQuestions(buildShuffledMathPool(mathObjectiveQuestions))",
    );
    expect(routeSource).toContain("function nextMathObjectiveQuestion()");
    expect(routeSource).toContain('setMathObjectivePhase("results")');
    expect(routeSource).toContain("onRetry={() =>");
    expect(routeSource).toContain('setMathObjectivePhase("intro")');
  });
});
