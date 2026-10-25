import { createFileRoute } from "@tanstack/react-router";
import { getPublicCard } from "@/features/nova-cards/server";
import { publicPreviewSvg, toPublicSnapshot } from "@/features/nova-cards/public-card";

export const Route = createFileRoute("/card_/c/$publicId/preview.png")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const { artworkHrefForPreview, previewNotAvailable, renderPreviewImage } =
          await import("@/features/nova-cards/public-preview.server");
        const fromParams =
          params && typeof params === "object" && "publicId" in params
            ? String(params.publicId)
            : "";
        const parts = new URL(request.url).pathname.split("/");
        const publicId = decodeURIComponent(fromParams || parts[3] || "");
        const { loadPublicNovaArtworkDataUrl } = await import(
          "@/features/nova-cards/public-loader.server"
        );
        const card = await getPublicCard({ data: publicId });
        if (!card?.sharing) return previewNotAvailable();
        const fields = toPublicSnapshot(card);
        const artwork =
          (await loadPublicNovaArtworkDataUrl(publicId)) ??
          (await artworkHrefForPreview(fields.artworkUrl));
        return renderPreviewImage(publicPreviewSvg({ ...fields, artworkUrl: artwork }, artwork));
      },
    },
  },
});
