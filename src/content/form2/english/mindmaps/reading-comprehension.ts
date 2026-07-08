import type { MindNode } from "@/components/MindMap";

export const englishF2ReadingComprehensionMindMap: MindNode = {
  id: "root",
  label: "📖 Reading Comprehension",
  children: [
    { id: "main-idea", label: "Main Idea" },
    { id: "supporting-details", label: "Supporting Details" },
    { id: "vocab-in-context", label: "Vocabulary in Context" },
    { id: "inference", label: "Inference" },
    { id: "writers-purpose", label: "Writer's Purpose" },
    { id: "context-clues", label: "Context Clues" },
    {
      id: "reading-skills",
      label: "Reading Skills",
      children: [
        { id: "rs-skimming", label: "Skimming" },
        { id: "rs-scanning", label: "Scanning" },
        { id: "rs-predicting", label: "Predicting" },
        { id: "rs-understanding", label: "Understanding" },
      ],
    },
    {
      id: "exam-tips",
      label: "Exam Tips",
      children: [
        { id: "et-underline-keywords", label: "Underline Keywords" },
        { id: "et-find-evidence", label: "Find Evidence" },
        { id: "et-follow-word-limits", label: "Follow Word Limits" },
      ],
    },
  ],
};
