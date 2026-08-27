import type { QuizQuestion } from "@/data/content";
import { buildPairedQuizBank } from "../paired-quiz-bank";
import { mathF2C7PairedSeeds } from "./quiz-bank";

export const mathF2C7QuizzesDLP: QuizQuestion[] = buildPairedQuizBank(
  7,
  "dlp",
  mathF2C7PairedSeeds,
);
export const mathF2C7FoundationQuizzesDLP = mathF2C7QuizzesDLP.slice(0, 30);
export const mathF2C7PracticeQuizzesDLP = mathF2C7QuizzesDLP.slice(30, 60);
export const mathF2C7ChallengeQuizzesDLP = mathF2C7QuizzesDLP.slice(60, 90);
