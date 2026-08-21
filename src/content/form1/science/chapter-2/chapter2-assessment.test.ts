import { describe, expect, it } from "vitest";
import { getChapterQuizQuestions } from "@/content/registry";
import { splitFlashcardDeck } from "@/lib/flashcard-availability";
import {
  chapter2FlashcardBlueprint,
  scienceF1C2FlashcardsBM,
  scienceF1C2FlashcardsDLP,
} from "./flashcards";
import { chapter2QuizBlueprint, scienceF1C2QuizzesBM, scienceF1C2QuizzesDLP } from "./quizzes";

const quizCounts = {
  "2.1.1": 3,
  "2.1.2": 2,
  "2.1.3": 4,
  "2.1.4": 2,
  "2.1.5": 3,
  "2.1.6": 3,
  "2.2.1": 2,
  "2.2.2": 5,
  "2.2.3": 3,
  "2.2.4": 3,
};

const flashcardCounts = {
  "2.1.1": 5,
  "2.1.2": 3,
  "2.1.3": 12,
  "2.1.4": 6,
  "2.1.5": 8,
  "2.1.6": 6,
  "2.2.1": 4,
  "2.2.2": 8,
  "2.2.3": 4,
  "2.2.4": 4,
};

function countBy<T extends { sp: string }>(items: T[]) {
  return Object.fromEntries(
    [...new Set(items.map((item) => item.sp))].map((sp) => [
      sp,
      items.filter((item) => item.sp === sp).length,
    ]),
  );
}

describe("Science Form 1 Chapter 2 paired quiz bank", () => {
  it("contains thirty paired questions with the approved SP blueprint", () => {
    expect(scienceF1C2QuizzesBM).toHaveLength(30);
    expect(scienceF1C2QuizzesDLP).toHaveLength(30);
    expect(countBy(chapter2QuizBlueprint)).toEqual(quizCounts);
    expect(scienceF1C2QuizzesBM.map((item) => item.semanticId)).toEqual(
      scienceF1C2QuizzesDLP.map((item) => item.semanticId),
    );
    expect(scienceF1C2QuizzesBM.map((item) => item.sp)).toEqual(
      scienceF1C2QuizzesDLP.map((item) => item.sp),
    );
    expect(scienceF1C2QuizzesBM.map((item) => item.answerIndex)).toEqual(
      scienceF1C2QuizzesDLP.map((item) => item.answerIndex),
    );
  });

  it("has a meaningful ten-ten-ten difficulty progression", () => {
    for (const bank of [scienceF1C2QuizzesBM, scienceF1C2QuizzesDLP]) {
      expect(bank.filter((item) => item.difficulty === "Easy")).toHaveLength(10);
      expect(bank.filter((item) => item.difficulty === "Medium")).toHaveLength(10);
      expect(bank.filter((item) => item.difficulty === "Hard")).toHaveLength(10);
      expect(new Set(bank.map((item) => item.answerIndex))).toEqual(new Set([0, 1, 2, 3]));
    }
  });

  it("routes the Chapter 2 local banks instead of the legacy fallback", () => {
    expect(
      getChapterQuizQuestions("science", "Form 1", "Chapter 2", "bm").map((item) => item.id),
    ).toEqual(scienceF1C2QuizzesBM.map((item) => item.id));
    expect(
      getChapterQuizQuestions("science", "Form 1", "Chapter 2", "dlp").map((item) => item.id),
    ).toEqual(scienceF1C2QuizzesDLP.map((item) => item.id));
  });

  it("does not imply that practical MCQs complete physical performance", () => {
    const practicalQuestions = [...scienceF1C2QuizzesBM, ...scienceF1C2QuizzesDLP].filter(
      (item) => item.sp === "2.1.2" || item.sp === "2.2.2",
    );
    expect(
      practicalQuestions.map((item) => `${item.question} ${item.explanation}`).join(" "),
    ).not.toMatch(/amali (telah )?selesai|practical (is )?complete/i);
  });
});

describe("Science Form 1 Chapter 2 flashcard audit", () => {
  it("retains sixty useful paired cards and the technical three-set deck size", () => {
    expect(scienceF1C2FlashcardsBM).toHaveLength(60);
    expect(scienceF1C2FlashcardsDLP).toHaveLength(60);
    expect(countBy(chapter2FlashcardBlueprint)).toEqual(flashcardCounts);
    expect(scienceF1C2FlashcardsBM.map((item) => item.semanticId)).toEqual(
      scienceF1C2FlashcardsDLP.map((item) => item.semanticId),
    );
    expect(new Set(scienceF1C2FlashcardsBM.map((item) => `${item.front}\n${item.back}`)).size).toBe(
      60,
    );
    expect(
      new Set(scienceF1C2FlashcardsDLP.map((item) => `${item.front}\n${item.back}`)).size,
    ).toBe(60);
    expect(splitFlashcardDeck(scienceF1C2FlashcardsBM).map((set) => set.length)).toEqual([
      20, 20, 20,
    ]);
    expect(splitFlashcardDeck(scienceF1C2FlashcardsDLP).map((set) => set.length)).toEqual([
      20, 20, 20,
    ]);
  });

  it("removes unsupported and drifted Chapter 2 terms", () => {
    const allText = [...scienceF1C2FlashcardsBM, ...scienceF1C2FlashcardsDLP]
      .map((item) => `${item.front} ${item.back}`)
      .join(" ");
    expect(allText).not.toMatch(
      /Pleurococcus|Mukor|Paku pakis|sel rambut akar|sistem pernafasan|sistem limfatik|buah pinggang|paru-paru|bikonkaf|getah sel/i,
    );
    expect(allText).toContain("sel rerambut akar");
    expect(allText).toContain("sap sel");
    expect(allText).toContain("larutan iodin");
    expect(allText).toContain("biru tua");
  });
});
