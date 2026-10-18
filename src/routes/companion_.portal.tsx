import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { NovaPortal } from "@/features/nova-portal/NovaPortal";
import { cardsIntegrationEnabled, cardsStudioUrl } from "@/lib/cards-integration";
import { seoMeta } from "@/lib/seo";
import "./companion-portal.css";

export const Route = createFileRoute("/companion_/portal")({
  component: CelestialGatewayPage,
  head: () => {
    const head = seoMeta({
      title: "Celestial Gateway | Cosmic Companion",
      description: "Enter the Celestial Gateway and discover your Cosmic Companion.",
      path: "/companion/portal",
      noindex: true,
    });
    return {
      ...head,
      links: [
        ...head.links,
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&display=swap",
        },
      ],
    };
  },
});

function CelestialGatewayPage() {
  // Design phase: ALWAYS launch fictional Studio data, never real artwork generation.
  // This preview route is deliberately separate from the future authenticated flow.
  const destination = cardsIntegrationEnabled
    ? `${cardsStudioUrl}?preview=rayyan`
    : "/nova/studio?preview=rayyan";

  return (
    <main className="ccp-fullscreen-gateway">
      <Link className="ccp-fullscreen-gateway__back" to="/companion">
        <ArrowLeft size={17} aria-hidden="true" />
        Back to Cosmic Companion
      </Link>
      <NovaPortal studioUrl={destination} autoEnter />
    </main>
  );
}
