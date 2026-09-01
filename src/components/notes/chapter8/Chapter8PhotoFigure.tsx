import type { ReactNode } from "react";
import { CHAPTER8_IMAGES, CHAPTER8_IMAGE_SIZE, type Chapter8ImageKey } from "./chapter8-assets";

/**
 * Contextual artwork with a deterministic overlay drawn on top of it.
 *
 * The raster carries recognition only. Every force arrow, label, value and
 * marker is SVG in this overlay, so the science stays crisp, translatable and
 * responsive rather than being baked into the picture.
 *
 * Two coordinate spaces are offered because they are good at different things:
 *
 *   space="percent" (default) — viewBox 0 0 100 100 with preserveAspectRatio
 *     "none", so a coordinate is literally a percentage of the frame. Ideal for
 *     placing things on objects. Angles and right angles are NOT preserved,
 *     because x and y are scaled by different amounts.
 *
 *   space="pixel" — viewBox 0 0 1672 941, matching the artwork. The container is
 *     16:9 and so is the artwork, so x and y scale equally and geometry that has
 *     to *look* geometric — perpendiculars, right-angle marks — stays true.
 *
 * Either way the overlay shares the image's own box, so it tracks the picture
 * rather than the lesson card and needs no adjustment when the display size
 * changes.
 */

/**
 * How wide a Chapter 8 raster may present itself on a wide screen.
 *
 * These are display caps, not asset sizes — the WebP files are untouched. At
 * 16:9 a 600px cap lands about 338px tall and a 660px cap about 371px, which
 * keeps every figure inside the intended 340-380px visual height without
 * needing a separate max-height that could distort the ratio on mobile.
 */
export const CHAPTER8_FIGURE_WIDTH = {
  /** A single scene or object. */
  single: 600,
  /** A comparison or multi-panel scene that needs the extra width to read. */
  wide: 660,
} as const;

export type Chapter8FigureVariant = keyof typeof CHAPTER8_FIGURE_WIDTH;

/** Which artwork earns the wider cap. Everything else is a single scene. */
export const CHAPTER8_WIDE_IMAGES = new Set<Chapter8ImageKey>([
  "types",
  "effects",
  "levers",
  "buoyancy",
  // two-panel comparisons whose overlay text needs the room
  "pressure",
  "springBalance",
]);

export function chapter8FigureVariant(image: Chapter8ImageKey): Chapter8FigureVariant {
  return CHAPTER8_WIDE_IMAGES.has(image) ? "wide" : "single";
}

export function Chapter8PhotoFigure({
  image,
  alt,
  children,
  space = "percent",
  priority = false,
  className = "",
}: {
  image: Chapter8ImageKey;
  alt: string;
  children?: ReactNode;
  space?: "percent" | "pixel";
  /** The first teaching image in a section should not be lazy-loaded. */
  priority?: boolean;
  className?: string;
}) {
  const viewBox = space === "pixel" ? `0 0 ${CHAPTER8_IMAGE_SIZE.width} ${CHAPTER8_IMAGE_SIZE.height}` : "0 0 100 100";
  return (
    <div
      className={`relative mx-auto aspect-video w-full overflow-hidden rounded-2xl bg-slate-900 ${className}`}
      style={{ maxWidth: `${CHAPTER8_FIGURE_WIDTH[chapter8FigureVariant(image)]}px` }}
      data-ch8-photo={image}
      data-ch8-figure-variant={chapter8FigureVariant(image)}
    >
      <img
        src={CHAPTER8_IMAGES[image]}
        alt={alt}
        width={CHAPTER8_IMAGE_SIZE.width}
        height={CHAPTER8_IMAGE_SIZE.height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="absolute inset-0 h-full w-full object-contain"
      />
      {children && (
        <svg
          viewBox={viewBox}
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          {children}
        </svg>
      )}
    </div>
  );
}

/** Shared arrowhead marker set. `id` must be unique per figure on the page. */
export function ArrowHead({ id, className = "fill-amber-300" }: { id: string; className?: string }) {
  return (
    <defs>
      <marker id={id} markerWidth="6" markerHeight="6" refX="4.6" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 Z" className={className} />
      </marker>
    </defs>
  );
}
