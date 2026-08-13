import type { QuizQuestion } from "@/data/content";
import { buildPairedQuizBank } from "../paired-quiz-bank";
import { mathF2C6PairedSeeds } from "./quiz-bank";

export const mathF2C6QuizzesDLP: QuizQuestion[] = buildPairedQuizBank(
  6,
  "dlp",
  mathF2C6PairedSeeds,
);
export const mathF2C6FoundationQuizzesDLP = mathF2C6QuizzesDLP.slice(0, 30);
export const mathF2C6PracticeQuizzesDLP = mathF2C6QuizzesDLP.slice(30, 60);
export const mathF2C6ChallengeQuizzesDLP = mathF2C6QuizzesDLP.slice(60, 90);
