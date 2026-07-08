import type { MindNode } from "@/components/MindMap";

export const englishF2ShortTextsMindMap: MindNode = {
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
        { id: "tt-brochures", label: "Brochures" },
        { id: "tt-announcements", label: "Announcements" },
        { id: "tt-short-reports", label: "Short Reports" },
      ],
    },
    {
      id: "skills",
      label: "Skills",
      children: [
        { id: "sk-main-idea", label: "Main Idea" },
        { id: "sk-specific-details", label: "Specific Details" },
        { id: "sk-purpose", label: "Purpose" },
        { id: "sk-audience", label: "Audience" },
        { id: "sk-context-clues", label: "Context Clues" },
      ],
    },
    {
      id: "exam-tips",
      label: "Exam Tips",
      children: [
        { id: "et-read-question-first", label: "Read the Question First" },
        { id: "et-underline-keywords", label: "Underline Keywords" },
        { id: "et-study-visual-clues", label: "Study Visual Clues" },
        { id: "et-eliminate-wrong", label: "Eliminate Wrong Answers" },
      ],
    },
    {
      id: "common-mistakes",
      label: "Common Mistakes",
      children: [
        { id: "cm-ignoring-dates", label: "Ignoring Dates" },
        { id: "cm-misreading-purpose", label: "Misreading Purpose" },
        { id: "cm-missing-keywords", label: "Missing Keywords" },
        { id: "cm-guessing", label: "Guessing" },
      ],
    },
  ],
};
