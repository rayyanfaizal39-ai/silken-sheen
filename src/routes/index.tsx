import { createFileRoute } from "@tanstack/react-router";
import { HomeDashboard } from "@/components/HomeDashboard";
import { CompanionWidget } from "@/companion";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://www.myacademy.my/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <HomeDashboard />
      <CompanionWidget />
    </>
  );
}
