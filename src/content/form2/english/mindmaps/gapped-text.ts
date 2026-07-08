import type { MindNode } from "@/components/MindMap";

export const englishF2GappedTextMindMap: MindNode = {
  id: "root",
  label: "🧩 Gapped Text",
  children: [
    { id: "cohesion", label: "Cohesion" },
    { id: "logical-flow", label: "Logical Flow" },
    { id: "reference-words", label: "Reference Words" },
    { id: "connectors", label: "Connectors" },
    { id: "paragraph-sequence", label: "Paragraph Sequence" },
    { id: "context", label: "Context" },
    {
      id: "clues",
      label: "Clues",
      children: [
        { id: "cl-pronouns", label: "Pronouns" },
        { id: "cl-linking-words", label: "Linking Words" },
        { id: "cl-repeated-words", label: "Repeated Words" },
        { id: "cl-time-markers", label: "Time Markers" },
      ],
    },
    {
      id: "exam-tips",
      label: "Exam Tips",
      children: [
        { id: "et-read-before-gap", label: "Read Before the Gap" },
        { id: "et-read-after-gap", label: "Read After the Gap" },
        { id: "et-read-whole-paragraph", label: "Read the Whole Paragraph" },
      ],
    },
  ],
};
