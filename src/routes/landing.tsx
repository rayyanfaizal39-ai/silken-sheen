import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/Landing";

export const Route = createFileRoute("/landing")({
  head: () => ({
    meta: [
      { title: "AcadeMY — Malaysia's Interstellar Learning Platform" },
      { name: "description", content: "KSSM-aligned learning for Form 1–5 students. Notes, flashcards, quizzes, mind maps and an AI tutor." },
      { property: "og:title", content: "AcadeMY — Malaysia's Interstellar Learning Platform" },
      { property: "og:description", content: "KSSM-aligned learning for Form 1–5 students." },
    ],
    links: [{ rel: "canonical", href: "https://www.myacademy.my/landing" }],
  }),
  component: LandingRoute,
});

function LandingRoute() {
  return <Landing />;
}
