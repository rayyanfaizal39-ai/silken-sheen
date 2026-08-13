import type { QuizQuestion } from "@/data/content";
import { buildPairedQuizBank } from "../paired-quiz-bank";
import { mathF2C5PairedSeeds } from "./quiz-bank";

export const mathF2C5QuizzesBM: QuizQuestion[] = buildPairedQuizBank(5, "bm", mathF2C5PairedSeeds);
export const mathF2C5FoundationQuizzesBM = mathF2C5QuizzesBM.slice(0, 30);
export const mathF2C5PracticeQuizzesBM = mathF2C5QuizzesBM.slice(30, 60);
export const mathF2C5ChallengeQuizzesBM = mathF2C5QuizzesBM.slice(60, 90);
