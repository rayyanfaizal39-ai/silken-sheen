import type { QuizQuestion } from "@/data/content";
import { buildPairedQuizBank } from "../paired-quiz-bank";
import { mathF2C7PairedSeeds } from "./quiz-bank";

export const mathF2C7QuizzesBM: QuizQuestion[] = buildPairedQuizBank(7, "bm", mathF2C7PairedSeeds);
export const mathF2C7FoundationQuizzesBM = mathF2C7QuizzesBM.slice(0, 30);
export const mathF2C7PracticeQuizzesBM = mathF2C7QuizzesBM.slice(30, 60);
export const mathF2C7ChallengeQuizzesBM = mathF2C7QuizzesBM.slice(60, 90);
