import type { MindNode } from "@/components/MindMap";

export const englishF1GappedTextMindMap: MindNode = {
  id: "root",
  label: "🧩 Gapped Text",
  children: [
    { id: "cohesion", label: "Cohesion" },
    { id: "connectors", label: "Connectors" },
    { id: "pronouns", label: "Pronouns" },
    { id: "sequence", label: "Sequence" },
    { id: "context", label: "Context" },
    {
      id: "clues",
      label: "Clues",
      children: [
        { id: "cl-linking-words", label: "Linking Words" },
        { id: "cl-repeated-words", label: "Repeated Words" },
        { id: "cl-pronouns", label: "Pronouns" },
        { id: "cl-time-markers", label: "Time Markers" },
      ],
    },
    {
      id: "exam-tips",
      label: "Exam Tips",
      children: [
        { id: "et-read-before-gap", label: "Read Before the Gap" },
        { id: "et-read-after-gap", label: "Read After the Gap" },
        { id: "et-reread-paragraph", label: "Re-read the Paragraph" },
      ],
    },
  ],
};
