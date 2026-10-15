import { createFileRoute } from "@tanstack/react-router";
import { NovaDemoGallery } from "@/features/nova-cards/NovaStudio";
import { novaHead } from "@/features/nova-cards/head";

export const Route = createFileRoute("/nova_/demo")({
  component: NovaDemoGallery,
  head: () =>
    novaHead({
      title: "Nova Origin / Awakened Visual Preview",
      description:
        "Compare Stage 1 Origin and Stage 2 Awakened versions of Rayyan's Phoenix and Mia's Magical Fox. A fictional visual study.",
      path: "/nova/demo",
      noindex: true,
      image: "https://www.myacademy.my/nova-cards/preview.png",
    }),
});
