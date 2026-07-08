import type { MindNode } from "@/components/MindMap";

export const englishF2GrammarMindMap: MindNode = {
  id: "root",
  label: "✏️ Grammar & Language Awareness",
  children: [
    {
      id: "grammar-topics",
      label: "Grammar Topics",
      children: [
        { id: "gt-tenses", label: "Tenses" },
        { id: "gt-sva", label: "Subject–Verb Agreement" },
        { id: "gt-articles", label: "Articles" },
        { id: "gt-pronouns", label: "Pronouns" },
        { id: "gt-prepositions", label: "Prepositions" },
        { id: "gt-conjunctions", label: "Conjunctions" },
        { id: "gt-word-forms", label: "Word Forms" },
        { id: "gt-parts-of-speech", label: "Parts of Speech" },
      ],
    },
    {
      id: "grammar-skills",
      label: "Grammar Skills",
      children: [
        { id: "gs-error-correction", label: "Error Correction" },
        { id: "gs-sentence-accuracy", label: "Sentence Accuracy" },
        { id: "gs-spelling", label: "Spelling" },
        { id: "gs-vocabulary", label: "Vocabulary" },
      ],
    },
    {
      id: "uasa-focus",
      label: "UASA Focus",
      children: [
        { id: "uf-grammar-in-context", label: "Grammar in Context" },
        { id: "uf-editing-skills", label: "Editing Skills" },
        { id: "uf-correct-word-choice", label: "Correct Word Choice" },
      ],
    },
  ],
};
