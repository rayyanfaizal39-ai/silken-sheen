export type MissionControlItem = {
  id: string;
  type: "new-mission" | "event" | "community" | "reward" | "update" | "important";
  category: string;
  title: string;
  description: string;
  badge?: string;
  timestamp?: string;
  status?: string;
  actionLabel?: string;
  actionUrl?: "/notes";
  actionSearch?: {
    subject: string;
    form: number;
    chapter: string;
  };
  priority?: number;
  startsAt?: string;
  expiresAt?: string;
};

export const MISSION_CONTROL_ITEMS: readonly MissionControlItem[] = [
  {
    id: "science-form-3-chapter-8",
    type: "new-mission",
    category: "New Mission",
    title: "Science Form 3 • Chapter 8",
    description: "A new chapter is ready to explore.",
    badge: "New",
    timestamp: "2h ago",
    actionLabel: "Explore",
    actionUrl: "/notes",
    actionSearch: { subject: "science", form: 3, chapter: "Chapter 8" },
    priority: 1,
  },
  {
    id: "galaxy-explorer-challenge",
    type: "event",
    category: "Explorer Event",
    title: "Galaxy Explorer Challenge",
    description: "Complete 5 chapters to unlock a limited badge.",
    badge: "6d 14h",
    status: "Ongoing",
    priority: 2,
  },
  {
    id: "mathematics-community-milestone",
    type: "community",
    category: "Community Update",
    title: "1,248 students completed Mathematics today",
    description: "Keep up the amazing momentum.",
    badge: "Live",
    timestamp: "1h ago",
    priority: 3,
  },
  {
    id: "new-mind-maps",
    type: "update",
    category: "System Update",
    title: "New Mind Maps Available",
    description: "New revision materials are available across Science and Geography.",
    badge: "Update",
    timestamp: "5h ago",
    priority: 4,
  },
];
