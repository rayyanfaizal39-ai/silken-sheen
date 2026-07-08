import type { MindNode } from "@/components/MindMap";

export const englishF3ShortTextsMindMap: MindNode = {
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
        { id: "tt-reviews", label: "Reviews" },
        { id: "tt-webpages", label: "Webpages" },
      ],
    },
    {
      id: "skills",
      label: "Skills",
      children: [
        { id: "sk-main-idea", label: "Main Idea" },
        { id: "sk-specific-details", label: "Specific Details" },
        { id: "sk-purpose", label: "Writer's Purpose" },
        { id: "sk-audience", label: "Target Audience" },
        { id: "sk-tone", label: "Tone" },
        { id: "sk-context-clues", label: "Context Clues" },
      ],
    },
    {
      id: "uasa-tips",
      label: "UASA Tips",
      children: [
        { id: "ut-read-question-first", label: "Read Question First" },
        { id: "ut-underline-keywords", label: "Underline Keywords" },
        { id: "ut-eliminate-wrong", label: "Eliminate Wrong Answers" },
        { id: "ut-study-visual-clues", label: "Study Visual Clues" },
      ],
    },
    {
      id: "common-mistakes",
      label: "Common Mistakes",
      children: [
        { id: "cm-ignoring-dates", label: "Ignoring Dates" },
        { id: "cm-missing-keywords", label: "Missing Keywords" },
        { id: "cm-misreading-purpose", label: "Misreading Purpose" },
        { id: "cm-guessing", label: "Guessing Without Evidence" },
      ],
    },
  ],
};
