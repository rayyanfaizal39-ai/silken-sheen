import type { AcademyTrack } from "@/lib/academy-form";

// Learning worlds shown during registration. This is presentation data only:
// choosing a level never touches the auth identity, profile, or Form level —
// onboarding (EXPLORER_FORM_LEVELS) and academy-form.ts stay the source of
// truth for where a signed-in student actually learns.
export type LearningLevelId = "primary" | AcademyTrack;
export type LearningLevelStatus = "available" | "coming_soon";

export interface LearningLevel {
  id: LearningLevelId;
  name: string;
  range: string;
  worldTitle: string;
  description: string;
  status: LearningLevelStatus;
}

export const LEARNING_LEVELS: readonly LearningLevel[] = [
  {
    id: "primary",
    name: "Primary",
    range: "Standard 1–6",
    worldTitle: "The World of Discovery",
    description: "A magical, welcoming world inspired by AcadeMY Primary's Tree of Knowledge.",
    status: "coming_soon",
  },
  {
    id: "junior",
    name: "Junior",
    range: "Form 1–3",
    worldTitle: "The World of Exploration",
    description: "A cosmic adventure inspired by the existing AcadeMY Junior astronaut experience.",
    status: "available",
  },
  {
    id: "senior",
    name: "Senior",
    range: "Form 4–5",
    worldTitle: "The World of Mastery",
    description: "A sophisticated futuristic world representing advanced learning and achievement.",
    status: "coming_soon",
  },
];

export const DEFAULT_LEARNING_LEVEL: LearningLevelId = "junior";

export function isLearningLevelAvailable(id: LearningLevelId): boolean {
  return LEARNING_LEVELS.some((level) => level.id === id && level.status === "available");
}
