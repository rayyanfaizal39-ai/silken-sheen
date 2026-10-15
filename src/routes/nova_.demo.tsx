import { createFileRoute } from "@tanstack/react-router";
import { NovaDemoGallery } from "@/features/nova-cards/NovaStudio";
import { novaHead } from "@/features/nova-cards/head";

export const Route = createFileRoute("/nova_/demo")({
  component: NovaDemoGallery,
  head: () =>
    novaHead({
      title: "Nova Companion Demo Collection",
      description:
        "Meet Rayyan's Phoenix and Mia's Magical Fox. Fictional Nova demonstration cards.",
      path: "/nova/demo",
      noindex: true,
      image: "https://www.myacademy.my/nova-cards/preview.png",
    }),
});
