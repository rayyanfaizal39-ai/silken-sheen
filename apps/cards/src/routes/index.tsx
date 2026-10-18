import { createFileRoute } from "@tanstack/react-router";
import { NovaStudio } from "../../../../src/features/nova-cards/NovaStudio";
import { novaHead } from "../../../../src/features/nova-cards/head";

export const Route = createFileRoute("/")({
  component: NovaStudio,
  head: () =>
    novaHead({
      title: "Your AcadeMY Card",
      description: "Discover your permanent companion and follow its evolution.",
      path: "/",
      noindex: true,
    }),
});
