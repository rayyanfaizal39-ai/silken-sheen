import type { QuizQuestion } from "@/data/content";
import { buildPairedQuizBank } from "../paired-quiz-bank";
import { mathF2C12PairedSeeds } from "./quiz-bank";
export const mathF2C12QuizzesDLP: QuizQuestion[] = buildPairedQuizBank(
  12,
  "dlp",
  mathF2C12PairedSeeds,
);
export const mathF2C12FoundationQuizzesDLP = mathF2C12QuizzesDLP.slice(0, 30);
export const mathF2C12PracticeQuizzesDLP = mathF2C12QuizzesDLP.slice(30, 60);
export const mathF2C12ChallengeQuizzesDLP = mathF2C12QuizzesDLP.slice(60, 90);
