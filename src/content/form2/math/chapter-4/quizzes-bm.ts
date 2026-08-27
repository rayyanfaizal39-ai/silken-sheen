import type { QuizQuestion } from "@/data/content";
import { buildPairedQuizBank } from "../paired-quiz-bank";
import { mathF2C4PairedSeeds } from "./quiz-bank";

export const mathF2C4QuizzesBM: QuizQuestion[] = buildPairedQuizBank(4, "bm", mathF2C4PairedSeeds);
export const mathF2C4FoundationQuizzesBM = mathF2C4QuizzesBM.slice(0, 30);
export const mathF2C4PracticeQuizzesBM = mathF2C4QuizzesBM.slice(30, 60);
export const mathF2C4ChallengeQuizzesBM = mathF2C4QuizzesBM.slice(60, 90);
