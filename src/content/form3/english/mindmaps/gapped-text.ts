import type { MindNode } from "@/components/MindMap";

export const englishF3GappedTextMindMap: MindNode = {
  id: "root",
  label: "🧩 Gapped Text",
  children: [
    { id: "cohesion", label: "Cohesion" },
    { id: "logical-flow", label: "Logical Flow" },
    { id: "reference-words", label: "Reference Words" },
    { id: "connectors", label: "Connectors" },
    { id: "paragraph-structure", label: "Paragraph Structure" },
    { id: "cause-effect", label: "Cause & Effect" },
    { id: "contrast", label: "Contrast" },
    { id: "sequence", label: "Sequence" },
    {
      id: "clues",
      label: "Clues",
      children: [
        { id: "cl-pronouns", label: "Pronouns" },
        { id: "cl-repeated-words", label: "Repeated Words" },
        { id: "cl-time-markers", label: "Time Markers" },
        { id: "cl-linking-words", label: "Linking Words" },
      ],
    },
    {
      id: "exam-tips",
      label: "Exam Tips",
      children: [
        { id: "et-read-before-gap", label: "Read Before Gap" },
        { id: "et-read-after-gap", label: "Read After Gap" },
        { id: "et-reread-paragraph", label: "Re-read Entire Paragraph" },
      ],
    },
  ],
};
