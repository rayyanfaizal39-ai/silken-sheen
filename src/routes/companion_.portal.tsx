import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { NovaPortal } from "@/features/nova-portal/NovaPortal";
import { cardsIntegrationEnabled, cardsStudioUrl } from "@/lib/cards-integration";
import { seoMeta } from "@/lib/seo";
import "./companion-portal.css";

export const Route = createFileRoute("/companion_/portal")({
  component: CelestialGatewayPage,
  head: () =>
    seoMeta({
      title: "Celestial Gateway | Cosmic Companion",
      description: "Enter the Celestial Gateway and discover your Cosmic Companion.",
      path: "/companion/portal",
      noindex: true,
    }),
});

function CelestialGatewayPage() {
  // Design-first preview: no account, database or AI generation required.
  // When Cards is intentionally enabled, hand off to its separate Studio.
  const destination = cardsIntegrationEnabled
    ? cardsStudioUrl
    : "/nova/studio?preview=rayyan";

  return (
    <main className="ccp-fullscreen-gateway">
      <Link className="ccp-fullscreen-gateway__back" to="/companion">
        <ArrowLeft size={17} aria-hidden="true" />
        Back to Cosmic Companion
      </Link>
      <NovaPortal studioUrl={destination} />
    </main>
  );
}
