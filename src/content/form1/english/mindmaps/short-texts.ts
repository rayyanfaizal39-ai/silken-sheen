import type { MindNode } from "@/components/MindMap";

export const englishF1ShortTextsMindMap: MindNode = {
  id: "root",
  label: "📩 Short Texts & Visual Materials",
  children: [
    {
      id: "types-of-texts",
      label: "Types of Texts",
      children: [
        { id: "tt-messages", label: "Messages" },
        { id: "tt-emails", label: "Emails" },
        { id: "tt-notices", label: "Notices" },
        { id: "tt-posters", label: "Posters" },
        { id: "tt-ads", label: "Advertisements" },
        { id: "tt-signs", label: "Signs" },
        { id: "tt-invitations", label: "Invitations" },
      ],
    },
    {
      id: "skills",
      label: "Skills",
      children: [
        { id: "sk-main-idea", label: "Main Idea" },
        { id: "sk-important-details", label: "Important Details" },
        { id: "sk-purpose", label: "Purpose" },
        { id: "sk-visual-clues", label: "Visual Clues" },
      ],
    },
    {
      id: "exam-tips",
      label: "Exam Tips",
      children: [
        { id: "et-read-carefully", label: "Read Carefully" },
        { id: "et-underline-keywords", label: "Underline Keywords" },
        { id: "et-look-at-pictures", label: "Look at Pictures" },
        { id: "et-eliminate-wrong", label: "Eliminate Wrong Answers" },
      ],
    },
    {
      id: "common-mistakes",
      label: "Common Mistakes",
      children: [
        { id: "cm-reading-too-quickly", label: "Reading Too Quickly" },
        { id: "cm-ignoring-pictures", label: "Ignoring Pictures" },
        { id: "cm-missing-keywords", label: "Missing Keywords" },
        { id: "cm-guessing", label: "Guessing" },
      ],
    },
  ],
};
