import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { GrammarLesson } from "@/features/grammar/GrammarLesson";
import { GrammarMissionHub } from "@/features/grammar/GrammarMissionHub";
import { seoMeta } from "@/lib/seo";

const grammarSearchSchema = z.object({
  topic: z.enum(["01", "02", "03"]).optional().catch(undefined),
});

export const Route = createFileRoute("/english/form-1/grammar")({
  validateSearch: grammarSearchSchema,
  head: ({ match }) => {
    const topic = match.search.topic;
    const title =
      topic === "01"
        ? "Nouns & Articles"
        : topic === "02"
          ? "Simple Present"
          : topic === "03"
            ? "Present Continuous"
            : "Grammar Missions";
    return seoMeta({
      title: `${title} — Form 1 English`,
      description:
        topic === "01"
          ? "Learn Form 1 nouns, noun categories, plurals and the articles a, an and the through an interactive grammar mission."
          : topic === "02"
            ? "Learn the Form 1 simple present tense for routines, habits and facts, including negatives and questions."
            : topic === "03"
              ? "Learn the Form 1 present continuous tense for actions happening now, including verb-ing forms, negatives and questions."
              : "Explore ten Form 1 English grammar missions with interactive notes and saved learning progress.",
      path: topic ? `/english/form-1/grammar?topic=${topic}` : "/english/form-1/grammar",
      keywords: ["Form 1 English grammar", "KSSM grammar", "English grammar notes"],
    });
  },
  component: GrammarRoute,
});

function GrammarRoute() {
  const { topic } = Route.useSearch();
  return topic ? <GrammarLesson topicId={topic} /> : <GrammarMissionHub />;
}
