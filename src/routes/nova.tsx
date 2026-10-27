import { createFileRoute, redirect } from "@tanstack/react-router";
import { cardsIntegrationEnabled } from "@/lib/cards-integration";
import { NovaStudio } from "@/features/nova-cards/NovaStudio";
import { novaHead } from "@/features/nova-cards/head";

export const Route = createFileRoute("/nova")({
  // With AcadeMY Cards enabled, the /companion portal is the one student entrance.
  beforeLoad: () => {
    if (cardsIntegrationEnabled) throw redirect({ to: "/companion" });
  },
  component: NovaStudio,
  head: () =>
    novaHead({
      title: "Your Nova Companion",
      description: "Discover your permanent AcadeMY Nova companion card.",
      path: "/nova",
      noindex: true,
    }),
});
