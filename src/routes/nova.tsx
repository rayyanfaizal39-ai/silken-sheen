import { createFileRoute } from "@tanstack/react-router";
import { NovaStudio } from "@/features/nova-cards/NovaStudio";
import { novaHead } from "@/features/nova-cards/head";

export const Route = createFileRoute("/nova")({
  component: NovaStudio,
  head: () =>
    novaHead({
      title: "Your Nova Companion",
      description: "Discover your permanent AcadeMY Nova companion card.",
      path: "/nova",
      noindex: true,
    }),
});
