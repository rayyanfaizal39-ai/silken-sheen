import type { MindNode } from "@/components/MindMap";

export const englishF3InformationTransferMindMap: MindNode = {
  id: "root",
  label: "📋 Information Transfer",
  children: [
    {
      id: "sources",
      label: "Sources",
      children: [
        { id: "src-articles", label: "Articles" },
        { id: "src-emails", label: "Emails" },
        { id: "src-reports", label: "Reports" },
        { id: "src-notices", label: "Notices" },
      ],
    },
    {
      id: "graphic-organisers",
      label: "Graphic Organisers",
      children: [
        { id: "go-tables", label: "Tables" },
        { id: "go-mind-maps", label: "Mind Maps" },
        { id: "go-flow-charts", label: "Flow Charts" },
        { id: "go-diagrams", label: "Diagrams" },
      ],
    },
    {
      id: "skills",
      label: "Skills",
      children: [
        { id: "sk-scanning", label: "Scanning" },
        { id: "sk-keywords", label: "Keywords" },
        { id: "sk-accuracy", label: "Accuracy" },
        { id: "sk-word-limits", label: "Word Limits" },
      ],
    },
    {
      id: "exam-tips",
      label: "Exam Tips",
      children: [
        { id: "et-copy-exactly", label: "Copy Exactly" },
        { id: "et-check-word-count", label: "Check Word Count" },
        { id: "et-verify-answers", label: "Verify Answers" },
      ],
    },
  ],
};
