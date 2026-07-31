import type { ContentRegistryModule } from "@/hooks/use-content-registry";
import type { QuizDestination } from "./types";

// The registry module is passed in (loaded client-side via useContentRegistry
// in the admin quiz-importer UI) rather than imported statically here — a
// static import would pull the full multi-MB curriculum registry into the
// SSR bundle for the admin.content.quiz-importer route.
export function getCanonicalQuizChapters(
  destination: Pick<QuizDestination, "subjectId" | "language" | "form">,
  registry: ContentRegistryModule | null,
) {
  if (!registry) return [];
  return registry.getRegisteredSubjectChapters(
    destination.subjectId,
    destination.language,
    destination.form,
  );
}
