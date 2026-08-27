import type { QuizQuestion } from "@/data/content";
import { buildPairedQuizBank } from "../paired-quiz-bank";
import { mathF2C3PairedSeeds } from "./quiz-bank";

export const mathF2C3QuizzesBM: QuizQuestion[] = buildPairedQuizBank(3, "bm", mathF2C3PairedSeeds);

export const mathF2C3FoundationQuizzesBM = mathF2C3QuizzesBM.slice(0, 30);
export const mathF2C3PracticeQuizzesBM = mathF2C3QuizzesBM.slice(30, 60);
export const mathF2C3ChallengeQuizzesBM = mathF2C3QuizzesBM.slice(60, 90);
