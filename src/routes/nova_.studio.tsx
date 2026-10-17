import { lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { novaHead } from "@/features/nova-cards/head";
const Studio = lazy(() => import("@/features/nova-cards/StudioPage"));
export const Route = createFileRoute("/nova_/studio")({
  component: () => (
    <Suspense fallback={<main aria-busy="true">Opening Nova Studio…</main>}>
      <Studio />
    </Suspense>
  ),
  head: () => {
    const head = novaHead({
      title: "Nova Studio",
      description: "Discover your lifelong Nova companion.",
      path: "/nova/studio",
      noindex: true,
    });
    return {
      ...head,
      links: [
        ...head.links,
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap",
        },
      ],
    };
  },
});
