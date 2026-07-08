import type { MindNode } from "@/components/MindMap";

export const englishF1GrammarMindMap: MindNode = {
  id: "root",
  label: "✏️ Grammar & Language Awareness",
  children: [
    {
      id: "grammar-topics",
      label: "Grammar Topics",
      children: [
        { id: "gt-tenses", label: "Tenses" },
        { id: "gt-nouns", label: "Nouns" },
        { id: "gt-verbs", label: "Verbs" },
        { id: "gt-adjectives", label: "Adjectives" },
        { id: "gt-pronouns", label: "Pronouns" },
        { id: "gt-articles", label: "Articles" },
        { id: "gt-prepositions", label: "Prepositions" },
        { id: "gt-conjunctions", label: "Conjunctions" },
      ],
    },
    {
      id: "grammar-skills",
      label: "Grammar Skills",
      children: [
        { id: "gs-sentence-accuracy", label: "Sentence Accuracy" },
        { id: "gs-correct-word-choice", label: "Correct Word Choice" },
        { id: "gs-spelling", label: "Spelling" },
        { id: "gs-punctuation", label: "Punctuation" },
      ],
    },
    {
      id: "exam-focus",
      label: "Exam Focus",
      children: [
        { id: "ef-basic-grammar", label: "Basic Grammar" },
        { id: "ef-error-identification", label: "Error Identification" },
        { id: "ef-correct-sentences", label: "Correct Sentences" },
      ],
    },
  ],
};
