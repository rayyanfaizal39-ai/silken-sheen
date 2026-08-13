import type { QuizQuestion } from "@/data/content";
import { buildPairedQuizBank } from "../paired-quiz-bank";
import { mathF2C8PairedSeeds } from "./quiz-bank";

export const mathF2C8QuizzesDLP: QuizQuestion[] = buildPairedQuizBank(
  8,
  "dlp",
  mathF2C8PairedSeeds,
);
export const mathF2C8FoundationQuizzesDLP = mathF2C8QuizzesDLP.slice(0, 30);
export const mathF2C8PracticeQuizzesDLP = mathF2C8QuizzesDLP.slice(30, 60);
export const mathF2C8ChallengeQuizzesDLP = mathF2C8QuizzesDLP.slice(60, 90);
