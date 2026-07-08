import type { MindNode } from "@/components/MindMap";

export const englishF2ShortCommunicativeMessageMindMap: MindNode = {
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
        { id: "ty-request", label: "Request" },
      ],
    },
    {
      id: "structure",
      label: "Structure",
      children: [
        { id: "st-greeting", label: "Greeting" },
        { id: "st-introduction", label: "Introduction" },
        { id: "st-main-response", label: "Main Response" },
        { id: "st-closing", label: "Closing" },
        { id: "st-sign-off", label: "Sign Off" },
      ],
    },
    {
      id: "skills",
      label: "Skills",
      children: [
        { id: "sk-tone", label: "Tone" },
        { id: "sk-register", label: "Register" },
        { id: "sk-linking-words", label: "Linking Words" },
        { id: "sk-vocabulary", label: "Vocabulary" },
      ],
    },
    {
      id: "exam-tips",
      label: "Exam Tips",
      children: [
        { id: "et-answer-every-bullet", label: "Answer Every Bullet Point" },
        { id: "et-stay-within-word-count", label: "Stay Within Word Count" },
        { id: "et-proofread", label: "Proofread" },
      ],
    },
  ],
};
