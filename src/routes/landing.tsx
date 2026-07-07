import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/Landing";
import { seoMeta } from "@/lib/seo";

export const Route = createFileRoute("/landing")({
  // Hero's LCP image gets its priority hint via fetchPriority="high" on the
  // <img> element itself (see Hero() in Landing.tsx) rather than a separate
  // <link rel="preload"> here — a second preload for an asset that's
  // already eagerly imported by the page's own component just duplicates
  // the request the bundler already schedules for it, which is what was
  // firing the "resource was preloaded but not used" console warning.
  head: () => seoMeta({
    title: "Malaysia's Interstellar Learning Platform — KSSM Form 1-3",
    description:
      "AI-powered KSSM learning platform for Malaysian Form 1-3 students. Notes, flashcards, quizzes, mind maps and Cikgu AI tutor — free to start.",
    path: "/landing",
    keywords: [
      "Malaysia learning platform", "KSSM notes", "KSSM quiz", "KSSM flashcards",
      "SPM preparation", "PT3 preparation", "Cikgu AI", "AI tutor Malaysia",
      "student learning platform Malaysia",
    ],
  }),
  component: LandingRoute,
});

function LandingRoute() {
  return <Landing />;
}
