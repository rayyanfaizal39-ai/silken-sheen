import { createFileRoute } from "@tanstack/react-router";
import { HomeDashboard } from "@/components/HomeDashboard";
import { CompanionWidget } from "@/companion";
import { OrbitalBackdrop } from "@/components/home/OrbitalBackdrop";
import { HudStatusBar } from "@/components/home/HudStatusBar";

// TEMPORARY route. "/" was switched to render Landing instead of
// HomeDashboard (see src/routes/index.tsx) because HomeDashboard's render
// tree still tripped Cloudflare Workers' cold-start resource limit (error
// 1102), even after moving its heaviest data dependencies to client-only
// lazy imports. HomeDashboard itself was never deleted — this route just
// gives it a URL to live at while its remaining weight gets optimized.
// Once that's done, HomeDashboard can move back to "/" and this route can
// be removed (or repurposed).
export const Route = createFileRoute("/home")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://www.myacademy.my/home" }],
  }),
  component: HomeRoute,
});

function HomeRoute() {
  return (
    <>
      <OrbitalBackdrop />
      <HomeDashboard />
      <HudStatusBar />
      <CompanionWidget />
    </>
  );
}
