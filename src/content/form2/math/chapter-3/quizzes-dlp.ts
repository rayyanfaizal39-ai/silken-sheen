import type { QuizQuestion } from "@/data/content";
import { buildPairedQuizBank } from "../paired-quiz-bank";
import { mathF2C3PairedSeeds } from "./quiz-bank";

export const mathF2C3QuizzesDLP: QuizQuestion[] = buildPairedQuizBank(
  3,
  "dlp",
  mathF2C3PairedSeeds,
);

export const mathF2C3FoundationQuizzesDLP = mathF2C3QuizzesDLP.slice(0, 30);
export const mathF2C3PracticeQuizzesDLP = mathF2C3QuizzesDLP.slice(30, 60);
export const mathF2C3ChallengeQuizzesDLP = mathF2C3QuizzesDLP.slice(60, 90);
