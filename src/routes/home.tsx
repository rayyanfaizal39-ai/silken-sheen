import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

// TEMPORARY route. "/" was switched to render Landing instead of
// HomeDashboard (see src/routes/index.tsx) because HomeDashboard's render
// tree tripped Cloudflare Workers' cold-start resource limit (error 1102).
// The first attempt to give it a URL at "/home" still statically imported
// HomeDashboard + its wrappers at the top of this file — even though nothing
// used them conditionally, a static `import` is part of this route module's
// SSR bundle regardless, so "/home" reintroduced the exact same 1102 crash.
//
// Fix: HomeDashboard (and its wrapper components) are loaded via dynamic
// `import()` inside a `useEffect`, which never runs during SSR (effects are
// client-only/post-hydration). That keeps the entire HomeDashboard module
// graph out of the SSR Worker bundle for every route, not just "/home" —
// the server only ever renders the small loading placeholder below; the
// real dashboard is fetched and mounted by the browser after the page loads.
//
// Once HomeDashboard's own weight is reduced enough to SSR safely, it can
// move back to "/" and this route can be removed (or repurposed).
export const Route = createFileRoute("/home")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://www.myacademy.my/home" }],
  }),
  component: HomeRoute,
});

type HomeModules = {
  HomeDashboard: (typeof import("@/components/HomeDashboard"))["HomeDashboard"];
  CompanionWidget: (typeof import("@/companion"))["CompanionWidget"];
  OrbitalBackdrop: (typeof import("@/components/home/OrbitalBackdrop"))["OrbitalBackdrop"];
  HudStatusBar: (typeof import("@/components/home/HudStatusBar"))["HudStatusBar"];
};

function HomeRoute() {
  const [modules, setModules] = useState<HomeModules | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      import("@/components/HomeDashboard"),
      import("@/companion"),
      import("@/components/home/OrbitalBackdrop"),
      import("@/components/home/HudStatusBar"),
    ]).then(([homeDashboardMod, companionMod, orbitalMod, hudMod]) => {
      if (cancelled) return;
      setModules({
        HomeDashboard: homeDashboardMod.HomeDashboard,
        CompanionWidget: companionMod.CompanionWidget,
        OrbitalBackdrop: orbitalMod.OrbitalBackdrop,
        HudStatusBar: hudMod.HudStatusBar,
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!modules) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm font-semibold text-white/50">Loading…</p>
      </div>
    );
  }

  const { HomeDashboard, CompanionWidget, OrbitalBackdrop, HudStatusBar } = modules;

  return (
    <>
      <OrbitalBackdrop />
      <HomeDashboard />
      <HudStatusBar />
      <CompanionWidget />
    </>
  );
}
