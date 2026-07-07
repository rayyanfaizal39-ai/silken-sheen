import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/Landing";
import astronautRocket from "@/assets/astronaut-cutout.png";

export const Route = createFileRoute("/landing")({
  head: () => ({
    meta: [
      { title: "AcadeMY — Malaysia's Interstellar Learning Platform" },
      { name: "description", content: "KSSM-aligned learning for Form 1–5 students. Notes, flashcards, quizzes, mind maps and an AI tutor." },
      { property: "og:title", content: "AcadeMY — Malaysia's Interstellar Learning Platform" },
      { property: "og:description", content: "KSSM-aligned learning for Form 1–5 students." },
    ],
    links: [
      { rel: "canonical", href: "https://www.myacademy.my/landing" },
      // Preload the *actual* hero image rendered in <Hero> (the LCP
      // element). Keep this in sync with the <img src> in Hero() —
      // pointing it at a different asset means the real hero image gets
      // no priority hint while bandwidth is spent on an image nothing on
      // the page displays.
      { rel: "preload", as: "image", href: astronautRocket, fetchPriority: "high" } as unknown as { rel: string; as: string; href: string },
    ],
  }),
  component: LandingRoute,
});

function LandingRoute() {
  return <Landing />;
}
