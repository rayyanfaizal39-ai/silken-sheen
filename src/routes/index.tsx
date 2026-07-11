import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/Landing";
import { seoMeta } from "@/lib/seo";

// "/" is the canonical public SSR landing page. The authenticated student
// homepage lives at "/home" (see src/routes/home.tsx) and the dashboard at
// "/dashboard" — this route intentionally stays public marketing content.
export const Route = createFileRoute("/")({
  head: () => seoMeta({
    title: "Malaysia's Interstellar Learning Platform — KSSM Form 1-3",
    description:
      "AI-powered KSSM learning platform for Malaysian Form 1-3 students. Notes, flashcards, quizzes, mind maps and Cikgu AI tutor — free to start.",
    path: "/",
    keywords: [
      "Malaysia learning platform", "KSSM notes", "KSSM quiz", "KSSM flashcards",
      "SPM preparation", "PT3 preparation", "Cikgu AI", "AI tutor Malaysia",
      "student learning platform Malaysia",
    ],
  }),
  component: Index,
});

function Index() {
  return <Landing />;
}
