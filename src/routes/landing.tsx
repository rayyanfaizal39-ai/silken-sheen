import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/Landing";
import astronautRocket from "@/assets/astronaut-cutout.png";
import { seoMeta } from "@/lib/seo";

export const Route = createFileRoute("/landing")({
  head: () => {
    const { meta, links } = seoMeta({
      title: "Malaysia's Interstellar Learning Platform — KSSM Form 1-3",
      description:
        "AI-powered KSSM learning platform for Malaysian Form 1-3 students. Notes, flashcards, quizzes, mind maps and Cikgu AI tutor — free to start.",
      path: "/landing",
      keywords: [
        "Malaysia learning platform", "KSSM notes", "KSSM quiz", "KSSM flashcards",
        "SPM preparation", "PT3 preparation", "Cikgu AI", "AI tutor Malaysia",
        "student learning platform Malaysia",
      ],
    });
    return {
      meta,
      links: [
        ...links,
        // Preload the *actual* hero image rendered in <Hero> (the LCP
        // element). Keep this in sync with the <img src> in Hero() —
        // pointing it at a different asset means the real hero image gets
        // no priority hint while bandwidth is spent on an image nothing on
        // the page displays.
        { rel: "preload", as: "image", href: astronautRocket, fetchPriority: "high" } as unknown as { rel: string; as: string; href: string },
      ],
    };
  },
  component: LandingRoute,
});

function LandingRoute() {
  return <Landing />;
}
