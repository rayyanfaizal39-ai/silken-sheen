import {
  BookOpen,
  Bot,
  CircleHelp,
  Network,
  PanelsTopLeft,
  Play,
  type LucideIcon,
} from "lucide-react";

type QuickAccessRoute = "/notes" | "/quizzes" | "/mindmaps" | "/subjects" | "/flashcards";

type QuickAccessBase = {
  id: string;
  label: string;
  actionLabel: string;
  icon: LucideIcon;
  accent: string;
};

export type QuickAccessItem = QuickAccessBase &
  (
    | {
        action: "route";
        to: QuickAccessRoute;
      }
    | {
        action: "ace";
      }
  );

export const QUICK_ACCESS_ITEMS: QuickAccessItem[] = [
  {
    id: "notes",
    label: "Notes",
    actionLabel: "Continue reading",
    icon: BookOpen,
    accent: "#38bdf8",
    action: "route",
    to: "/notes",
  },
  {
    id: "quizzes",
    label: "Quizzes",
    actionLabel: "Test yourself",
    icon: CircleHelp,
    accent: "#a78bfa",
    action: "route",
    to: "/quizzes",
  },
  {
    id: "mind-maps",
    label: "Mind Maps",
    actionLabel: "Review visually",
    icon: Network,
    accent: "#f59e0b",
    action: "route",
    to: "/mindmaps",
  },
  {
    id: "videos",
    label: "Videos",
    actionLabel: "Watch lessons",
    icon: Play,
    accent: "#f43f5e",
    action: "route",
    to: "/subjects",
  },
  {
    id: "flashcards",
    label: "Flashcards",
    actionLabel: "Practise memory",
    icon: PanelsTopLeft,
    accent: "#34d399",
    action: "route",
    to: "/flashcards",
  },
  {
    id: "ace",
    label: "Ace",
    actionLabel: "Ask your AI teacher",
    icon: Bot,
    accent: "#c084fc",
    action: "ace",
  },
];
