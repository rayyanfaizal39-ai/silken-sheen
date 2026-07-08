import type { MindNode } from "@/components/MindMap";

export const englishF3GuidedWritingMindMap: MindNode = {
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
        { id: "et-informal-article", label: "Informal Article" },
      ],
    },
    {
      id: "structure",
      label: "Structure",
      children: [
        { id: "st-introduction", label: "Introduction" },
        { id: "st-body-1", label: "Body Paragraph 1" },
        { id: "st-body-2", label: "Body Paragraph 2" },
        { id: "st-body-3", label: "Body Paragraph 3" },
        { id: "st-conclusion", label: "Conclusion" },
      ],
    },
    {
      id: "writing-skills",
      label: "Writing Skills",
      children: [
        { id: "ws-topic-sentence", label: "Topic Sentence" },
        { id: "ws-supporting-details", label: "Supporting Details" },
        { id: "ws-elaboration", label: "Elaboration" },
        { id: "ws-linking-devices", label: "Linking Devices" },
        { id: "ws-vocabulary", label: "Vocabulary" },
        { id: "ws-grammar-accuracy", label: "Grammar Accuracy" },
      ],
    },
    {
      id: "uasa-tips",
      label: "UASA Tips",
      children: [
        { id: "ut-plan-before-writing", label: "Plan Before Writing" },
        { id: "ut-clear-paragraphs", label: "Use Clear Paragraphs" },
        { id: "ut-mature-vocabulary", label: "Use Mature Vocabulary" },
        { id: "ut-stay-within-word-count", label: "Stay Within Word Count" },
        { id: "ut-proofread", label: "Proofread Before Submitting" },
      ],
    },
  ],
};
