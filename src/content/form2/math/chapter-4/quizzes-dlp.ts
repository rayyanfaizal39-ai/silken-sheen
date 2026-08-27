import type { QuizQuestion } from "@/data/content";
import { buildPairedQuizBank } from "../paired-quiz-bank";
import { mathF2C4PairedSeeds } from "./quiz-bank";

export const mathF2C4QuizzesDLP: QuizQuestion[] = buildPairedQuizBank(
  4,
  "dlp",
  mathF2C4PairedSeeds,
);
export const mathF2C4FoundationQuizzesDLP = mathF2C4QuizzesDLP.slice(0, 30);
export const mathF2C4PracticeQuizzesDLP = mathF2C4QuizzesDLP.slice(30, 60);
export const mathF2C4ChallengeQuizzesDLP = mathF2C4QuizzesDLP.slice(60, 90);
