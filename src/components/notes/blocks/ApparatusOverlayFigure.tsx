import type { ReactNode } from "react";
import { getNotesImageUrl } from "@/lib/notes-images";
import { learningImageMaxWidth, type LearningImageSize } from "./learning-image";

/**
 * A photograph of real apparatus with a deterministic SVG teaching layer drawn
 * over it.
 *
 * The two have to move as one, so they share a box: the frame reserves the
 * artwork's aspect ratio, the `<img>` fills it, and the `<svg>` is stretched
 * over the same rectangle carrying the artwork's own pixel dimensions as its
 * `viewBox`. An overlay coordinate is therefore just a position on the picture,
 * true at 375px and at 1280px alike, and nothing has to be re-measured when the
 * viewport changes. That is the whole reason arrows and labels are not baked
 * into the raster: they stay language-free, correctable, and reversible.
 *
 * Width is capped through the shared `learning-image` sizing so an apparatus
 * photo cannot become a poster; `scene` lands a 16:9 picture at about
 * 600 x 338 on a desktop and full width, uncropped, on a phone.
 */
export function ApparatusOverlayFigure({
  src,
  alt,
  aspect,
  size = "scene",
  overlay,
  caption,
  priority = false,
}: {
  src: string;
  alt: string;
  /** Intrinsic aspect ratio, e.g. "16 / 9". Reserves the box before load. */
  aspect: string;
  size?: LearningImageSize;
  /**
   * SVG children in the artwork's own pixel space. The caller supplies the
   * `viewBox` dimensions so one figure cannot drift from its artwork.
   */
  overlay: { width: number; height: number; children: ReactNode; label: string };
  caption?: string;
  priority?: boolean;
}) {
  const url = getNotesImageUrl(src);
  if (!url) return null;

  return (
    <figure className="m-0 flex flex-col gap-2">
      <div
        className="relative mx-auto w-full overflow-hidden rounded-2xl border border-border bg-secondary/30"
        style={{ aspectRatio: aspect, maxWidth: learningImageMaxWidth(size, aspect) }}
      >
        <img
          src={url}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 h-full w-full object-contain"
        />
        <svg
          viewBox={`0 0 ${overlay.width} ${overlay.height}`}
          preserveAspectRatio="xMidYMid meet"
          className="pointer-events-none absolute inset-0 h-full w-full"
          role="img"
          aria-label={overlay.label}
        >
          {overlay.children}
        </svg>
      </div>
      {caption && (
        <figcaption className="text-center text-[11.5px] leading-snug text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
