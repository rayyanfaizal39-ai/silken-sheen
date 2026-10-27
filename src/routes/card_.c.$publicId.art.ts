import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/card_/c/$publicId/art")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const { artworkNotAvailable, loadPublicNovaArtwork } = await import(
          "@/features/nova-cards/public-loader.server"
        );
        const fromParams =
          params && typeof params === "object" && "publicId" in params
            ? String(params.publicId)
            : "";
        const parts = new URL(request.url).pathname.split("/");
        const publicId = decodeURIComponent(fromParams || parts[3] || "");
        const art = await loadPublicNovaArtwork(publicId);
        if (!art) return artworkNotAvailable();
        return new Response(Buffer.from(art.bytes), {
          headers: {
            "cache-control": "private, no-store, max-age=0",
            "referrer-policy": "no-referrer",
            "content-type": art.contentType,
            "x-content-type-options": "nosniff",
          },
        });
      },
    },
  },
});
