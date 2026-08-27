import type { QuizQuestion } from "@/data/content";
import { buildPairedQuizBank } from "../paired-quiz-bank";
import { mathF2C9PairedSeeds } from "./quiz-bank";
export const mathF2C9QuizzesBM: QuizQuestion[] = buildPairedQuizBank(9, "bm", mathF2C9PairedSeeds);
export const mathF2C9FoundationQuizzesBM = mathF2C9QuizzesBM.slice(0, 30);
export const mathF2C9PracticeQuizzesBM = mathF2C9QuizzesBM.slice(30, 60);
export const mathF2C9ChallengeQuizzesBM = mathF2C9QuizzesBM.slice(60, 90);
