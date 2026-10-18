// Subtopic titles for the Form 2 Maths Chapter 1 flashcard sets, kept apart
// from the card bank so the flashcards route can label the sets without
// bundling the cards themselves (they load with the content registry).
export type MathF2C1Subtopic = "1.1" | "1.2" | "1.3";

export const MATH_F2_C1_SUBTOPICS: Record<MathF2C1Subtopic, { dlp: string; bm: string }> = {
  "1.1": { dlp: "1.1 Patterns", bm: "1.1 Corak" },
  "1.2": { dlp: "1.2 Sequences", bm: "1.2 Jujukan" },
  "1.3": { dlp: "1.3 Patterns and Sequences", bm: "1.3 Corak dan Jujukan" },
};

export const MATH_F2_C1_SUBTOPIC_ORDER: readonly MathF2C1Subtopic[] = ["1.1", "1.2", "1.3"];
