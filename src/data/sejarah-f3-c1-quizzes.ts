import setA from "./sejarah-f3-quiz-source/chapter_1_quiz_set_a-25-final.json";
import setB from "./sejarah-f3-quiz-source/chapter_1_quiz_set_b-25-final.json";
import { resolveSejarahF3Quiz } from "./sejarah-f3-quiz-source/resolveSejarahF3Quiz";

export const sejarahF3C1Quizzes = [
  ...resolveSejarahF3Quiz(setA),
  ...resolveSejarahF3Quiz(setB),
];
