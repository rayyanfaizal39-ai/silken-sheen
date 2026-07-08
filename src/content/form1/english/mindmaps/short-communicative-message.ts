import type { MindNode } from "@/components/MindMap";

export const englishF1ShortCommunicativeMessageMindMap: MindNode = {
  id: "root",
  label: "📧 Short Communicative Message",
  children: [
    {
      id: "types",
      label: "Types",
      children: [
        { id: "ty-email", label: "Email" },
        { id: "ty-message", label: "Message" },
        { id: "ty-invitation", label: "Invitation" },
        { id: "ty-reply", label: "Reply" },
      ],
    },
    {
      id: "structure",
      label: "Structure",
      children: [
        { id: "st-greeting", label: "Greeting" },
        { id: "st-opening", label: "Opening" },
        { id: "st-main-message", label: "Main Message" },
        { id: "st-closing", label: "Closing" },
        { id: "st-sign-off", label: "Sign Off" },
      ],
    },
    {
      id: "skills",
      label: "Skills",
      children: [
        { id: "sk-simple-vocabulary", label: "Simple Vocabulary" },
        { id: "sk-friendly-tone", label: "Friendly Tone" },
        { id: "sk-linking-words", label: "Linking Words" },
        { id: "sk-correct-grammar", label: "Correct Grammar" },
      ],
    },
    {
      id: "exam-tips",
      label: "Exam Tips",
      children: [
        { id: "et-answer-all-points", label: "Answer All Bullet Points" },
        { id: "et-stay-within-word-count", label: "Stay Within Word Count" },
        { id: "et-check-spelling", label: "Check Spelling" },
      ],
    },
  ],
};
