import type { QuizQuestion } from "@/data/content";
import { buildPairedQuizBank } from "../paired-quiz-bank";
import { mathF2C10PairedSeeds } from "./quiz-bank";
export const mathF2C10QuizzesDLP: QuizQuestion[] = buildPairedQuizBank(
  10,
  "dlp",
  mathF2C10PairedSeeds,
);
export const mathF2C10FoundationQuizzesDLP = mathF2C10QuizzesDLP.slice(0, 30);
export const mathF2C10PracticeQuizzesDLP = mathF2C10QuizzesDLP.slice(30, 60);
export const mathF2C10ChallengeQuizzesDLP = mathF2C10QuizzesDLP.slice(60, 90);
