import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/Landing";
import heroAsset from "@/assets/hero-astronaut.webp.asset.json";

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
      { rel: "preload", as: "image", href: heroAsset.url, fetchpriority: "high" } as unknown as { rel: string; as: string; href: string },
    ],
  }),
  component: LandingRoute,
});

function LandingRoute() {
  return <Landing />;
}
