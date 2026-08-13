import type { QuizQuestion } from "@/data/content";
import { buildPairedQuizBank } from "../paired-quiz-bank";
import { mathF2C11PairedSeeds } from "./quiz-bank";
export const mathF2C11QuizzesBM: QuizQuestion[] = buildPairedQuizBank(
  11,
  "bm",
  mathF2C11PairedSeeds,
);
export const mathF2C11FoundationQuizzesBM = mathF2C11QuizzesBM.slice(0, 30);
export const mathF2C11PracticeQuizzesBM = mathF2C11QuizzesBM.slice(30, 60);
export const mathF2C11ChallengeQuizzesBM = mathF2C11QuizzesBM.slice(60, 90);
