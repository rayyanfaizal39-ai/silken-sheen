import type { MindNode } from "@/components/MindMap";

export const englishF2InformationTransferMindMap: MindNode = {
  id: "root",
  label: "📋 Information Transfer",
  children: [
    {
      id: "sources",
      label: "Sources",
      children: [
        { id: "src-emails", label: "Emails" },
        { id: "src-notices", label: "Notices" },
        { id: "src-reports", label: "Reports" },
        { id: "src-articles", label: "Articles" },
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
        { id: "et-follow-word-limit", label: "Follow Word Limit" },
        { id: "et-check-answers", label: "Check Answers" },
      ],
    },
  ],
};
