import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useCompanionEntry } from "@/features/cosmic-companion/use-companion-entry";
import {
  PREVIEW_SCENE,
  parseJourneyPreview,
  type JourneyStage,
} from "@/features/cosmic-companion/journey";
import { NovaPortal } from "@/features/nova-portal/NovaPortal";
import { cardsIntegrationEnabled, cardsStudioUrl } from "@/lib/cards-integration";
import { seoMeta } from "@/lib/seo";
import "./companion-portal.css";

export const Route = createFileRoute("/companion_/portal")({
  validateSearch: (search: Record<string, unknown>): { preview?: JourneyStage } => ({
    preview: parseJourneyPreview(search.preview),
  }),
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
  // Students enter the real Studio, which shows the screen their saved state allows: the
  // questions, the waiting sanctuary, the reveal or their permanent companion. A fictional
  // scene is used only when a preview is requested; it runs on in-memory data and never
  // writes to, or unlocks, a real student's journey. A free student is sent to Upgrade.
  // A finished journey opens the card instead of starting the questions again.
  const { preview } = Route.useSearch();
  const { ready, entry } = useCompanionEntry(preview);
  const navigate = useNavigate();
  useEffect(() => {
    if (!ready || entry.kind === "journey") return;
    if (entry.kind === "upgrade") {
      void navigate({ to: "/upgrade", search: { next: entry.search.next } });
      return;
    }
    void navigate({ to: "/nova" });
  }, [ready, entry, navigate]);
  const studio = cardsIntegrationEnabled ? cardsStudioUrl : "/nova/studio";
  const destination = preview ? `${studio}?preview=rayyan&scene=${PREVIEW_SCENE[preview]}` : studio;
  // The app shell's page transition leaves a transform on its <main>, which would trap a
  // fixed-position child inside the content area. Rendering into <body> keeps it truly fullscreen.
  const [body, setBody] = useState<HTMLElement | null>(null);
  useEffect(() => setBody(document.body), []);

  if (!ready || entry.kind !== "journey") {
    return <main className="ccp-fullscreen-gateway" aria-busy="true" />;
  }

  const page = (
    <main className="ccp-fullscreen-gateway">
      <Link className="ccp-fullscreen-gateway__back" to="/companion">
        <ArrowLeft size={17} aria-hidden="true" />
        Back to Cosmic Companion
      </Link>
      <NovaPortal studioUrl={destination} autoEnter />
    </main>
  );
  return body ? createPortal(page, body) : <div className="ccp-fullscreen-gateway" />;
}
