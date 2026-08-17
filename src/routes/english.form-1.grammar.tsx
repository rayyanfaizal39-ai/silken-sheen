import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { GrammarLesson } from "@/features/grammar/GrammarLesson";
import { GrammarMissionHub } from "@/features/grammar/GrammarMissionHub";
import { seoMeta } from "@/lib/seo";

const grammarSearchSchema = z.object({
  // `?topic=10` arrives as the number 10 (the search parser JSON-parses values),
  // while `?topic=01`..`09` stay strings. Normalise before matching the enum so
  // every topic resolves consistently.
  topic: z
    .preprocess(
      (value) => (typeof value === "number" ? String(value).padStart(2, "0") : value),
      z.enum(["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"]),
    )
    .optional()
    .catch(undefined),
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
  "06": {
    title: "Present Perfect",
    description:
      "Learn the Form 1 present perfect tense for past actions connected to now, including have/has, past participles, since/for, already/yet/just and ever/never.",
  },
  "07": {
    title: "Future Forms",
    description:
      "Learn the Form 1 future forms will, be going to and the present continuous for arrangements, including negatives, questions and time expressions.",
  },
  "08": {
    title: "Subject–Verb Agreement",
    description:
      "Learn Form 1 subject–verb agreement, including verb endings, am/is/are, have/has, don't/doesn't and singular words such as everyone.",
  },
  "09": {
    title: "Modals",
    description:
      "Learn the Form 1 modal verbs can, could, may, might, should, must and have to for ability, possibility, advice and obligation.",
  },
  "10": {
    title: "Adjectives & Adverbs",
    description:
      "Learn Form 1 adjectives and adverbs, including -ly spelling rules, adjective versus adverb, and the special forms good, well, fast and hard.",
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
