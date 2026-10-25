import { lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { novaHead } from "../../../../src/features/nova-cards/head";

const Studio = lazy(() => import("../../../../src/features/nova-cards/StudioPage"));

export const Route = createFileRoute("/studio")({
  component: () => (
    <Suspense fallback={<main aria-busy="true">Opening AcadeMY Cards Studio…</main>}>
      <Studio />
    </Suspense>
  ),
  head: () =>
    novaHead({
      title: "Nova Studio",
      description: "Complete twelve questions and discover your lifelong companion.",
      path: "/studio",
      noindex: true,
    }),
});
