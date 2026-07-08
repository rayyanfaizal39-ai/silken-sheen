import type { MindNode } from "@/components/MindMap";

export const englishF1ReadingComprehensionMindMap: MindNode = {
  id: "root",
  label: "📖 Reading Comprehension",
  children: [
    { id: "main-idea", label: "Main Idea" },
    { id: "important-details", label: "Important Details" },
    { id: "vocabulary", label: "Vocabulary" },
    { id: "sequence-of-events", label: "Sequence of Events" },
    { id: "simple-inference", label: "Simple Inference" },
    {
      id: "reading-skills",
      label: "Reading Skills",
      children: [
        { id: "rs-skimming", label: "Skimming" },
        { id: "rs-scanning", label: "Scanning" },
        { id: "rs-finding-evidence", label: "Finding Evidence" },
        { id: "rs-understanding-context", label: "Understanding Context" },
      ],
    },
    {
      id: "exam-tips",
      label: "Exam Tips",
      children: [
        { id: "et-underline-keywords", label: "Underline Keywords" },
        { id: "et-read-whole-passage", label: "Read the Whole Passage" },
        { id: "et-keep-answers-short", label: "Keep Answers Short" },
      ],
    },
  ],
};
