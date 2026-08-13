import type { QuizQuestion } from "@/data/content";
import { buildPairedQuizBank } from "../paired-quiz-bank";
import { mathF2C8PairedSeeds } from "./quiz-bank";

export const mathF2C8QuizzesBM: QuizQuestion[] = buildPairedQuizBank(8, "bm", mathF2C8PairedSeeds);
export const mathF2C8FoundationQuizzesBM = mathF2C8QuizzesBM.slice(0, 30);
export const mathF2C8PracticeQuizzesBM = mathF2C8QuizzesBM.slice(30, 60);
export const mathF2C8ChallengeQuizzesBM = mathF2C8QuizzesBM.slice(60, 90);
