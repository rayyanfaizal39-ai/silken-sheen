import type { MindNode } from "@/components/MindMap";

export const englishF1InformationTransferMindMap: MindNode = {
  id: "root",
  label: "📋 Information Transfer",
  children: [
    {
      id: "sources",
      label: "Sources",
      children: [
        { id: "src-notices", label: "Notices" },
        { id: "src-messages", label: "Messages" },
        { id: "src-posters", label: "Posters" },
        { id: "src-emails", label: "Emails" },
      ],
    },
    {
      id: "graphic-organisers",
      label: "Graphic Organisers",
      children: [
        { id: "go-tables", label: "Tables" },
        { id: "go-lists", label: "Lists" },
        { id: "go-mind-maps", label: "Mind Maps" },
      ],
    },
    {
      id: "skills",
      label: "Skills",
      children: [
        { id: "sk-find-keywords", label: "Find Keywords" },
        { id: "sk-scan-for-information", label: "Scan for Information" },
        { id: "sk-accuracy", label: "Accuracy" },
        { id: "sk-word-limits", label: "Word Limits" },
      ],
    },
    {
      id: "exam-tips",
      label: "Exam Tips",
      children: [
        { id: "et-copy-carefully", label: "Copy Carefully" },
        { id: "et-follow-instructions", label: "Follow Instructions" },
        { id: "et-check-answers", label: "Check Answers" },
      ],
    },
  ],
};
