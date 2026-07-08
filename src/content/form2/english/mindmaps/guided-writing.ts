import type { MindNode } from "@/components/MindMap";

export const englishF2GuidedWritingMindMap: MindNode = {
  id: "root",
  label: "📝 Guided Writing",
  children: [
    {
      id: "essay-types",
      label: "Essay Types",
      children: [
        { id: "et-descriptive", label: "Descriptive" },
        { id: "et-narrative", label: "Narrative" },
        { id: "et-opinion", label: "Opinion" },
      ],
    },
    {
      id: "structure",
      label: "Structure",
      children: [
        { id: "st-introduction", label: "Introduction" },
        { id: "st-body-1", label: "Body Paragraph 1" },
        { id: "st-body-2", label: "Body Paragraph 2" },
        { id: "st-conclusion", label: "Conclusion" },
      ],
    },
    {
      id: "writing-skills",
      label: "Writing Skills",
      children: [
        { id: "ws-topic-sentence", label: "Topic Sentence" },
        { id: "ws-supporting-details", label: "Supporting Details" },
        { id: "ws-linking-words", label: "Linking Words" },
        { id: "ws-vocabulary", label: "Vocabulary" },
        { id: "ws-grammar", label: "Grammar" },
      ],
    },
    {
      id: "exam-tips",
      label: "Exam Tips",
      children: [
        { id: "et-plan-first", label: "Plan First" },
        { id: "et-use-paragraphs", label: "Use Paragraphs" },
        { id: "et-check-grammar", label: "Check Grammar" },
        { id: "et-proofread", label: "Proofread" },
      ],
    },
  ],
};
