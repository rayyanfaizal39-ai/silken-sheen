import { createFileRoute } from "@tanstack/react-router";
import { HomeDashboard } from "@/components/HomeDashboard";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <HomeDashboard />;
}
