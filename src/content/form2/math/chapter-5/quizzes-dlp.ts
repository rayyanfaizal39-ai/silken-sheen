import type { QuizQuestion } from "@/data/content";
import { buildPairedQuizBank } from "../paired-quiz-bank";
import { mathF2C5PairedSeeds } from "./quiz-bank";

export const mathF2C5QuizzesDLP: QuizQuestion[] = buildPairedQuizBank(
  5,
  "dlp",
  mathF2C5PairedSeeds,
);
export const mathF2C5FoundationQuizzesDLP = mathF2C5QuizzesDLP.slice(0, 30);
export const mathF2C5PracticeQuizzesDLP = mathF2C5QuizzesDLP.slice(30, 60);
export const mathF2C5ChallengeQuizzesDLP = mathF2C5QuizzesDLP.slice(60, 90);
