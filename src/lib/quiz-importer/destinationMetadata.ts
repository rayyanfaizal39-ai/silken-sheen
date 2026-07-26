import { getRegisteredSubjectChapters } from "@/content/registry";
import type { QuizDestination } from "./types";

export function getCanonicalQuizChapters(
  destination: Pick<QuizDestination, "subjectId" | "language" | "form">,
) {
  return getRegisteredSubjectChapters(
    destination.subjectId,
    destination.language,
    destination.form,
  );
}
