import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { GrammarLesson } from "@/features/grammar/GrammarLesson";
import { GrammarMissionHub } from "@/features/grammar/GrammarMissionHub";
import { seoMeta } from "@/lib/seo";

const grammarSearchSchema = z.object({
  topic: z.enum(["01", "02", "03", "04", "05"]).optional().catch(undefined),
});

const TOPIC_SEO = {
  "01": {
    title: "Nouns & Articles",
    description:
      "Learn Form 1 nouns, noun categories, plurals and the articles a, an and the through an interactive grammar mission.",
  },
  "02": {
    title: "Simple Present",
    description:
      "Learn the Form 1 simple present tense for routines, habits and facts, including negatives and questions.",
  },
  "03": {
    title: "Present Continuous",
    description:
      "Learn the Form 1 present continuous tense for actions happening now, including verb-ing forms, negatives and questions.",
  },
  "04": {
    title: "Simple Past",
    description:
      "Learn the Form 1 simple past tense for finished actions, including regular and irregular verbs, negatives, questions and was/were.",
  },
  "05": {
    title: "Past Continuous",
    description:
      "Learn the Form 1 past continuous tense for actions in progress at a past moment, including was/were, verb-ing, when, while, negatives and questions.",
  },
} as const;

export const Route = createFileRoute("/english/form-1/grammar")({
  validateSearch: grammarSearchSchema,
  head: ({ match }) => {
    const topic = match.search.topic;
    const seo = topic ? TOPIC_SEO[topic] : undefined;
    return seoMeta({
      title: `${seo?.title ?? "Grammar Missions"} — Form 1 English`,
      description:
        seo?.description ??
        "Explore ten Form 1 English grammar missions with interactive notes and saved learning progress.",
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
