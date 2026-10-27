import { createFileRoute } from "@tanstack/react-router";
import { NovaDemoGallery } from "../../../../src/features/nova-cards/NovaStudio";
import { novaHead } from "../../../../src/features/nova-cards/head";
import { SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/demo")({
  component: NovaDemoGallery,
  head: () =>
    novaHead({
      title: "Companion Evolution Preview",
      description:
        "Compare Stage 1 Origin and Stage 2 Awakened versions of fictional AcadeMY companions.",
      path: "/demo",
      noindex: true,
      image: `${SITE_URL}/nova-cards/preview.png`,
    }),
});
