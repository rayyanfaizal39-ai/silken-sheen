import { QUESTIONS } from "../model";

// The export's alternate quiz would change existing identities. Only its presentation is reused.
export interface LearningQuizOption {
  text: string;
  element: "Water" | "Solar" | "Astral";
}
export interface LearningQuizQuestion {
  id: number;
  category: string;
  question: string;
  options: LearningQuizOption[];
}
const categories = [
  "The Calling",
  "Your Companion",
  "Elemental Affinity",
  "A Familiar Silhouette",
  "Your Colours",
  "A Magical Gift",
  "A World Together",
  "A Gentle Greeting",
  "Starlit Eyes",
  "A Signature Mark",
  "Facing the Unknown",
  "A Lifelong Bond",
];
export const ACADEMY_LEARNING_QUESTIONS: LearningQuizQuestion[] = QUESTIONS.map((q, i) => ({
  id: i + 1,
  category: categories[i],
  question: q.label,
  options: q.options.map((text, index) => ({
    text,
    element: (["Water", "Solar", "Astral"] as const)[index],
  })),
}));
