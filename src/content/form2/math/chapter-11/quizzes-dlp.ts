import type { QuizQuestion } from "@/data/content";
import { buildPairedQuizBank } from "../paired-quiz-bank";
import { mathF2C11PairedSeeds } from "./quiz-bank";
export const mathF2C11QuizzesDLP: QuizQuestion[] = buildPairedQuizBank(
  11,
  "dlp",
  mathF2C11PairedSeeds,
);
export const mathF2C11FoundationQuizzesDLP = mathF2C11QuizzesDLP.slice(0, 30);
export const mathF2C11PracticeQuizzesDLP = mathF2C11QuizzesDLP.slice(30, 60);
export const mathF2C11ChallengeQuizzesDLP = mathF2C11QuizzesDLP.slice(60, 90);
