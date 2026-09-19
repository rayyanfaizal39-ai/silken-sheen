import { createFileRoute } from "@tanstack/react-router";
import { handleAuthCallback } from "@/lib/auth-callback.server";

export const Route = createFileRoute("/auth/callback")({
  server: { handlers: { GET: ({ request }) => handleAuthCallback(request) } },
});
