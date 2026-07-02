import { createFileRoute } from "@tanstack/react-router";
import { HomeDashboard } from "@/components/HomeDashboard";
import { CompanionWidget } from "@/companion";
import { OrbitalBackdrop } from "@/components/home/OrbitalBackdrop";
import { HudStatusBar } from "@/components/home/HudStatusBar";
import { HudWidgets } from "@/components/home/HudWidgets";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://www.myacademy.my/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <OrbitalBackdrop />
      <HomeDashboard />
      <HudWidgets />
      <HudStatusBar />
      <CompanionWidget />
    </>
  );
}
