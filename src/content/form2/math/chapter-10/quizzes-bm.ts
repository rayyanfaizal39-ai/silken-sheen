import type { QuizQuestion } from "@/data/content";
import { buildPairedQuizBank } from "../paired-quiz-bank";
import { mathF2C10PairedSeeds } from "./quiz-bank";
export const mathF2C10QuizzesBM: QuizQuestion[] = buildPairedQuizBank(
  10,
  "bm",
  mathF2C10PairedSeeds,
);
export const mathF2C10FoundationQuizzesBM = mathF2C10QuizzesBM.slice(0, 30);
export const mathF2C10PracticeQuizzesBM = mathF2C10QuizzesBM.slice(30, 60);
export const mathF2C10ChallengeQuizzesBM = mathF2C10QuizzesBM.slice(60, 90);
