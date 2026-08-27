import type { QuizQuestion } from "@/data/content";
import { buildPairedQuizBank } from "../paired-quiz-bank";
import { mathF2C13PairedSeeds } from "./quiz-bank";
export const mathF2C13QuizzesDLP: QuizQuestion[] = buildPairedQuizBank(
  13,
  "dlp",
  mathF2C13PairedSeeds,
);
export const mathF2C13FoundationQuizzesDLP = mathF2C13QuizzesDLP.slice(0, 30);
export const mathF2C13PracticeQuizzesDLP = mathF2C13QuizzesDLP.slice(30, 60);
export const mathF2C13ChallengeQuizzesDLP = mathF2C13QuizzesDLP.slice(60, 90);
