import type { QuizQuestion } from "@/data/content";
import { buildPairedQuizBank } from "../paired-quiz-bank";
import { mathF2C12PairedSeeds } from "./quiz-bank";
export const mathF2C12QuizzesBM: QuizQuestion[] = buildPairedQuizBank(
  12,
  "bm",
  mathF2C12PairedSeeds,
);
export const mathF2C12FoundationQuizzesBM = mathF2C12QuizzesBM.slice(0, 30);
export const mathF2C12PracticeQuizzesBM = mathF2C12QuizzesBM.slice(30, 60);
export const mathF2C12ChallengeQuizzesBM = mathF2C12QuizzesBM.slice(60, 90);
