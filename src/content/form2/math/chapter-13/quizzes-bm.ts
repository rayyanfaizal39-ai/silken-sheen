import type { QuizQuestion } from "@/data/content";
import { buildPairedQuizBank } from "../paired-quiz-bank";
import { mathF2C13PairedSeeds } from "./quiz-bank";
export const mathF2C13QuizzesBM: QuizQuestion[] = buildPairedQuizBank(
  13,
  "bm",
  mathF2C13PairedSeeds,
);
export const mathF2C13FoundationQuizzesBM = mathF2C13QuizzesBM.slice(0, 30);
export const mathF2C13PracticeQuizzesBM = mathF2C13QuizzesBM.slice(30, 60);
export const mathF2C13ChallengeQuizzesBM = mathF2C13QuizzesBM.slice(60, 90);
