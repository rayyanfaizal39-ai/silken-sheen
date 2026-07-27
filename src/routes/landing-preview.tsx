import { createFileRoute, redirect } from "@tanstack/react-router";

// The cinematic landing now lives at the canonical homepage. Keep the preview
// URL as a temporary permanent redirect so old review links cannot compete
// with or duplicate the production page.
export const Route = createFileRoute("/landing-preview")({
  beforeLoad: () => {
    throw redirect({ to: "/", statusCode: 301 });
  },
});
