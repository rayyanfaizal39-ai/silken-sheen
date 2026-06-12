import type { MindNode } from "@/components/MindMap";

export const englishF1C3MindMap: MindNode = {
  id: "root",
  label: "Reading — Detective Skills",
  children: [
    {
      id: "pre-reading",
      label: "Before You Read",
      children: [
        { id: "pr1", label: "Read the title first" },
        { id: "pr2", label: "Scan headings & subheadings" },
        { id: "pr3", label: "Read the questions first (exam)" },
        { id: "pr4", label: "Predict from images / diagrams" },
        { id: "pr5", label: "Activate prior knowledge" },
      ],
    },
    {
      id: "main-idea",
      label: "Main Idea",
      children: [
        { id: "mi-def", label: "Most important point in the passage" },
        { id: "mi-loc", label: "Usually in first or last paragraph" },
        {
          id: "mi-how",
          label: "How to Find It",
          children: [
            { id: "mh1", label: "Ask: 'What is this mostly about?'" },
            { id: "mh2", label: "Find the sentence all others support" },
            { id: "mh3", label: "It covers the WHOLE passage" },
          ],
        },
        { id: "mi-ans", label: "Answer = complete sentence, not a word" },
      ],
    },
    {
      id: "supporting",
      label: "Supporting Details",
      children: [
        { id: "sd-def", label: "Evidence that backs up the main idea" },
        {
          id: "sd-types",
          label: "Types",
          children: [
            { id: "sd1", label: "Facts & statistics" },
            { id: "sd2", label: "Examples (for instance, such as)" },
            { id: "sd3", label: "Reasons (because, since)" },
            { id: "sd4", label: "Descriptions (sensory details)" },
          ],
        },
        { id: "sd-signal", label: "Look for: furthermore, also, in addition" },
      ],
    },
    {
      id: "inference",
      label: "Inference",
      children: [
        { id: "inf-def", label: "Reading BETWEEN the lines" },
        { id: "inf-rule", label: "Not stated — but clues tell you" },
        {
          id: "inf-steps",
          label: "3-Step Method",
          children: [
            { id: "is1", label: "1. Read relevant part carefully" },
            { id: "is2", label: "2. Find clues (actions, descriptions)" },
            { id: "is3", label: "3. Draw logical conclusion" },
          ],
        },
        { id: "inf-tip", label: "Every inference needs text evidence" },
      ],
    },
    {
      id: "skim-scan",
      label: "Skimming & Scanning",
      children: [
        {
          id: "skimming",
          label: "Skimming",
          children: [
            { id: "sk1", label: "Read quickly for GENERAL idea" },
            { id: "sk2", label: "Read first/last sentences of paragraphs" },
            { id: "sk3", label: "Best for: first read-through" },
          ],
        },
        {
          id: "scanning",
          label: "Scanning",
          children: [
            { id: "sc1", label: "Search for SPECIFIC information" },
            { id: "sc2", label: "Know your target: name, date, number" },
            { id: "sc3", label: "Move eyes fast; stop at keywords" },
          ],
        },
      ],
    },
    {
      id: "facts-opinions",
      label: "Facts vs Opinions",
      children: [
        {
          id: "fact",
          label: "Fact",
          children: [
            { id: "f1", label: "Can be proven true/false" },
            { id: "f2", label: "Based on evidence and data" },
            { id: "f3", label: "Example: Malaysia has 13 states." },
          ],
        },
        {
          id: "opinion",
          label: "Opinion",
          children: [
            { id: "o1", label: "Personal belief or judgement" },
            { id: "o2", label: "Signal words: think, believe, best, should" },
            { id: "o3", label: "Example: Malaysia is the best country." },
          ],
        },
      ],
    },
    {
      id: "comprehension-q",
      label: "Comprehension Questions",
      children: [
        { id: "cq1", label: "Literal — answer stated in text directly" },
        { id: "cq2", label: "Vocabulary — use context clues" },
        { id: "cq3", label: "Inference — reason from clues" },
        { id: "cq4", label: "Main Idea — whole passage view" },
        { id: "cq5", label: "Write full sentences — not point form" },
        { id: "cq6", label: "Reference the text as evidence" },
      ],
    },
  ],
};
