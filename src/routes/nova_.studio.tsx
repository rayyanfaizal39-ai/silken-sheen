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
  head: () =>
    novaHead({
      title: "Nova Studio",
      description: "Discover your lifelong Nova companion.",
      path: "/nova/studio",
      noindex: true,
    }),
});
