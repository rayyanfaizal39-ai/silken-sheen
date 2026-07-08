// Split out of src/data/content.ts on purpose: this file's exports are tiny,
// static metadata (6 subjects, 3 forms) with zero dependency on the curriculum
// content data (notes/quizzes/flashcards — several MB across 100+ per-chapter
// modules) that content.ts imports at its top level. Because Rollup chunks by
// module, importing even just `subjects` from content.ts pulled that entire
// multi-MB import graph into any chunk that touched it — including the
// eagerly-loaded SSR route tree (every request pays for it, not just the
// specific page that needed the subject list). Keeping this metadata in its
// own module lets callers that only need it (subjects listing, dashboard,
// notes/mindmaps subject pickers) avoid that cost entirely.
export type Form = "Form 1" | "Form 2" | "Form 3";

export const forms: Form[] = ["Form 1", "Form 2", "Form 3"];

export interface Subject {
  id: string;
  name: string;
  emoji: string;
  color: string; // tailwind gradient classes
  description: string;
  tagline: string;
}

export const subjects: Subject[] = [
  {
    id: "bm",
    name: "Bahasa Melayu",
    emoji: "📘",
    color: "from-rose-500 to-orange-500",
    description: "Tatabahasa, karangan, dan kefahaman.",
    tagline: "Kuasai bahasa kebangsaan!",
  },
  {
    id: "english",
    name: "English",
    emoji: "🇬🇧",
    color: "from-sky-500 to-blue-600",
    description: "Grammar, comprehension, and writing.",
    tagline: "Level up your English!",
  },
  {
    id: "math",
    name: "Mathematics",
    emoji: "📐",
    color: "from-indigo-500 to-purple-600",
    description: "Algebra, geometry, statistics, and more.",
    tagline: "Solve it like a pro!",
  },
  {
    id: "science",
    name: "Science",
    emoji: "🔬",
    color: "from-emerald-500 to-teal-600",
    description: "Biology, chemistry, and physics basics.",
    tagline: "Explore the universe!",
  },
  {
    id: "sejarah",
    name: "Sejarah",
    emoji: "🏛️",
    color: "from-amber-500 to-yellow-500",
    description: "Tamadun, kemerdekaan, dan warisan negara.",
    tagline: "Jelajah masa lampau!",
  },
  {
    id: "geography",
    name: "Geography",
    emoji: "🌏",
    color: "from-cyan-500 to-emerald-500",
    description: "Physical & human geography of the world.",
    tagline: "Discover the world!",
  },
];
