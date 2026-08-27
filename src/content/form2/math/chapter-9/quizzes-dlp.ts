import type { QuizQuestion } from "@/data/content";
import { buildPairedQuizBank } from "../paired-quiz-bank";
import { mathF2C9PairedSeeds } from "./quiz-bank";
export const mathF2C9QuizzesDLP: QuizQuestion[] = buildPairedQuizBank(
  9,
  "dlp",
  mathF2C9PairedSeeds,
);
export const mathF2C9FoundationQuizzesDLP = mathF2C9QuizzesDLP.slice(0, 30);
export const mathF2C9PracticeQuizzesDLP = mathF2C9QuizzesDLP.slice(30, 60);
export const mathF2C9ChallengeQuizzesDLP = mathF2C9QuizzesDLP.slice(60, 90);
