import type { MindNode } from "@/components/MindMap";

export const englishF3ReadingComprehensionMindMap: MindNode = {
  id: "root",
  label: "📖 Reading Comprehension",
  children: [
    { id: "main-idea", label: "Main Idea" },
    { id: "supporting-details", label: "Supporting Details" },
    { id: "inference", label: "Inference" },
    { id: "vocab-in-context", label: "Vocabulary in Context" },
    { id: "writers-purpose", label: "Writer's Purpose" },
    { id: "tone", label: "Tone" },
    { id: "fact-vs-opinion", label: "Fact vs Opinion" },
    { id: "evidence", label: "Evidence" },
    {
      id: "reading-skills",
      label: "Reading Skills",
      children: [
        { id: "rs-skimming", label: "Skimming" },
        { id: "rs-scanning", label: "Scanning" },
        { id: "rs-predicting", label: "Predicting" },
        { id: "rs-summarising", label: "Summarising" },
      ],
    },
    {
      id: "exam-strategy",
      label: "Exam Strategy",
      children: [
        { id: "es-underline-keywords", label: "Underline Keywords" },
        { id: "es-find-evidence", label: "Find Evidence" },
        { id: "es-follow-word-limits", label: "Follow Word Limits" },
      ],
    },
  ],
};
