import { createFileRoute } from "@tanstack/react-router";
import CinematicLanding from "@/components/landing-cinematic/CinematicLanding";
import { seoMeta } from "@/lib/seo";

// "/" is the canonical public SSR landing page. The authenticated student
// homepage lives at "/home" (see src/routes/home.tsx) and the dashboard at
// "/dashboard" — this route intentionally stays public marketing content.
export const Route = createFileRoute("/")({
  head: () => {
    const metadata = seoMeta({
      title: "Malaysia's Interstellar Learning Platform — KSSM Form 1-3",
      description:
        "AI-powered KSSM learning platform for Malaysian Form 1-3 students. Notes, flashcards, quizzes, mind maps and Ace tutor — free to start.",
      path: "/",
      keywords: [
        "Malaysia learning platform",
        "KSSM notes",
        "KSSM quiz",
        "KSSM flashcards",
        "SPM preparation",
        "PT3 preparation",
        "Ace",
        "AI tutor Malaysia",
        "student learning platform Malaysia",
      ],
    });

    return {
      ...metadata,
      links: [
        ...metadata.links,
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap",
        },
      ],
    };
  },
  component: Index,
});

function Index() {
  return <CinematicLanding />;
}
