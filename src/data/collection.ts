// ─── Collection: Planet Badges · Constellations · Explorer Titles ───────────────
// The metagame that makes students want to collect everything. Pure definitions;
// progress is evaluated in src/lib/collection.ts.

export type CollectibleKind = "badge" | "constellation" | "title";

/** A per-subject achievement earned by passing quizzes in that world. */
export interface PlanetBadge {
  id: string;
  subjectId: string;
  name: string;
  description: string;
  color: string;
  /** Quizzes scored ≥80% in this subject required to earn the badge. */
  passesRequired: number;
}

export const PLANET_BADGES: PlanetBadge[] = [
  {
    id: "badge-math",
    subjectId: "math",
    name: "Math Planet Master",
    description: "Pass 5 Mathematics quizzes",
    color: "#FBBF24",
    passesRequired: 5,
  },
  {
    id: "badge-science",
    subjectId: "science",
    name: "Science Explorer",
    description: "Pass 5 Science quizzes",
    color: "#38BDF8",
    passesRequired: 5,
  },
  {
    id: "badge-history",
    subjectId: "sejarah",
    name: "History Archivist",
    description: "Pass 3 Sejarah quizzes",
    color: "#FB923C",
    passesRequired: 3,
  },
  {
    id: "badge-geo",
    subjectId: "geography",
    name: "Geo Cartographer",
    description: "Pass 4 Geography quizzes",
    color: "#34D399",
    passesRequired: 4,
  },
  {
    id: "badge-bm",
    subjectId: "bm",
    name: "Bahasa Laureate",
    description: "Pass 4 Bahasa Melayu quizzes",
    color: "#F472B6",
    passesRequired: 4,
  },
  {
    id: "badge-english",
    subjectId: "english",
    name: "English Voyager",
    description: "Pass 4 English quizzes",
    color: "#C084FC",
    passesRequired: 4,
  },
];

/** A "complete the whole world" meta-achievement. */
export interface Constellation {
  id: string;
  subjectId: string;
  name: string;
  description: string;
  color: string;
}

export const CONSTELLATIONS: Constellation[] = [
  {
    id: "constel-science",
    subjectId: "science",
    name: "Form 1 Science Constellation",
    description: "Complete a quiz in every Form 1 Science chapter",
    color: "#38BDF8",
  },
  {
    id: "constel-math",
    subjectId: "math",
    name: "Form 1 Mathematics Constellation",
    description: "Complete a quiz in every Form 1 Math chapter",
    color: "#FBBF24",
  },
];

/** An equippable rank-style identity, unlocked by total XP. */
export interface ExplorerTitle {
  id: string;
  name: string;
  minXp: number;
  color: string;
}

export const EXPLORER_TITLES: ExplorerTitle[] = [
  { id: "title-cadet",     name: "Pawn Collector",   minXp: 0,    color: "#6B7280" },
  { id: "title-pilot",     name: "Knight Collector",  minXp: 200,  color: "#16A34A" },
  { id: "title-navigator", name: "Bishop Collector",  minXp: 450,  color: "#2563EB" },
  { id: "title-commander", name: "Rook Collector",    minXp: 750,  color: "#0891B2" },
  { id: "title-scholar",   name: "Queen Collector",   minXp: 1600, color: "#7C3AED" },
];

export const DEFAULT_TITLE_ID = "title-cadet";

export function getTitle(id: string | undefined): ExplorerTitle {
  return EXPLORER_TITLES.find((t) => t.id === id) ?? EXPLORER_TITLES[0];
}
