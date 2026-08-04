import { createFileRoute } from "@tanstack/react-router";
import { CommandCenterHome } from "@/components/CommandCenterHome";
import { seoMeta } from "@/lib/seo";

// "/home" is the authenticated student homepage. Renders CommandCenterHome
// directly (no client-only lazy-loading needed) — it has no dependency on
// the heavy content registry / tracker modules that made HomeDashboard trip
// Cloudflare Workers' cold-start resource limit (error 1102), so it SSRs
// safely on its own.
//
// Per-user command centre — noindex so it doesn't compete with the public
// marketing homepage at "/" for the same brand queries.
export const Route = createFileRoute("/home")({
  head: () =>
    seoMeta({
      title: "Command Center",
      description: "Your AcadeMY command centre — missions, progress and study shortcuts for KSSM Form 1-3.",
      path: "/home",
      noindex: true,
    }),
  component: HomeRoute,
});

function HomeRoute() {
  return <CommandCenterHome />;
}
