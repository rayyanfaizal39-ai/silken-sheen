import { createFileRoute } from "@tanstack/react-router";
import CinematicLanding from "@/components/landing-cinematic/CinematicLanding";
import { seoMeta } from "@/lib/seo";

export const Route = createFileRoute("/landing-preview")({
  head: () => {
    const previewMetadata = seoMeta({
      title: "Cinematic Landing Preview",
      description: "Internal preview of AcadeMY's cinematic papercraft learning experience.",
      path: "/landing-preview",
      noindex: true,
    });

    return {
      ...previewMetadata,
      // Deliberately omit a canonical link: this internal preview must never
      // compete with or replace the canonical homepage at "/".
      links: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap",
        },
      ],
    };
  },
  component: LandingPreviewRoute,
});

function LandingPreviewRoute() {
  return <CinematicLanding />;
}
