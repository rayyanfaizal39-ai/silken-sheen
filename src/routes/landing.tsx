import { createFileRoute, redirect } from "@tanstack/react-router";

// "/" is now the canonical public landing page (see src/routes/index.tsx).
// This route is kept only to permanently redirect legacy /landing links/
// bookmarks/backlinks to "/" and avoid duplicate-content SEO issues.
export const Route = createFileRoute("/landing")({
  beforeLoad: () => {
    throw redirect({ to: "/", statusCode: 301 });
  },
});
