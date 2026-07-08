import type { MindNode } from "@/components/MindMap";

export const englishF1GuidedWritingMindMap: MindNode = {
  id: "root",
  label: "📝 Guided Writing",
  children: [
    {
      id: "essay-types",
      label: "Essay Types",
      children: [
        { id: "et-descriptive", label: "Descriptive" },
        { id: "et-narrative", label: "Narrative" },
        { id: "et-simple-opinion", label: "Simple Opinion" },
      ],
    },
    {
      id: "structure",
      label: "Structure",
      children: [
        { id: "st-introduction", label: "Introduction" },
        { id: "st-body", label: "Body" },
        { id: "st-conclusion", label: "Conclusion" },
      ],
    },
    {
      id: "writing-skills",
      label: "Writing Skills",
      children: [
        { id: "ws-topic-sentence", label: "Topic Sentence" },
        { id: "ws-supporting-ideas", label: "Supporting Ideas" },
        { id: "ws-linking-words", label: "Linking Words" },
        { id: "ws-vocabulary", label: "Vocabulary" },
        { id: "ws-grammar", label: "Grammar" },
      ],
    },
    {
      id: "exam-tips",
      label: "Exam Tips",
      children: [
        { id: "et-plan-before-writing", label: "Plan Before Writing" },
        { id: "et-use-simple-paragraphs", label: "Use Simple Paragraphs" },
        { id: "et-check-grammar", label: "Check Grammar" },
        { id: "et-proofread", label: "Proofread" },
      ],
    },
  ],
};
