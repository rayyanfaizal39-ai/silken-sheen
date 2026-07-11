import { createFileRoute } from "@tanstack/react-router";
import { CommandCenterHome } from "@/components/CommandCenterHome";

// "/home" is the authenticated student homepage. Renders CommandCenterHome
// directly (no client-only lazy-loading needed) — it has no dependency on
// the heavy content registry / tracker modules that made HomeDashboard trip
// Cloudflare Workers' cold-start resource limit (error 1102), so it SSRs
// safely on its own.
export const Route = createFileRoute("/home")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://www.myacademy.my/home" }],
  }),
  component: HomeRoute,
});

function HomeRoute() {
  return <CommandCenterHome />;
}
