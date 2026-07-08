import type { MindNode } from "@/components/MindMap";

export const englishF3GrammarMindMap: MindNode = {
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
        { id: "gt-passive-voice", label: "Passive Voice" },
        { id: "gt-relative-clauses", label: "Relative Clauses" },
        { id: "gt-reported-speech", label: "Reported Speech" },
        { id: "gt-modal-verbs", label: "Modal Verbs" },
      ],
    },
    {
      id: "editing-skills",
      label: "Editing Skills",
      children: [
        { id: "es-grammar", label: "Grammar" },
        { id: "es-vocabulary", label: "Vocabulary" },
        { id: "es-spelling", label: "Spelling" },
        { id: "es-punctuation", label: "Punctuation" },
      ],
    },
    {
      id: "uasa-focus",
      label: "UASA Focus",
      children: [
        { id: "uf-grammar-in-context", label: "Grammar in Context" },
        { id: "uf-error-correction", label: "Error Correction" },
        { id: "uf-sentence-accuracy", label: "Sentence Accuracy" },
      ],
    },
  ],
};
