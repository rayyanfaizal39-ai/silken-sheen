import { useId, useState } from "react";
import { Maximize2 } from "lucide-react";
import type { PyramidBlock } from "@/content/form2/science/interactive-types";
import { getNotesImageUrl } from "@/lib/notes-images";
import { defaultLearningImageSize, learningImageMaxWidth } from "./learning-image";
import { LearningImageLightbox } from "./LearningImageLightbox";
import { SpotlightOverlay } from "./SpotlightOverlay";
import type { SpotlightShape } from "./spotlight-shapes";

const HOTSPOT_CLASS =
  "cursor-pointer fill-transparent stroke-none outline-none transition-colors duration-150 hover:fill-white/5 focus-visible:fill-white/10";

/**
 * The approved, text-free food-pyramid illustration with six clickable
 * regions drawn directly over it — grains/tubers, vegetables, fruits,
 * protein sources, milk and dairy, and fat/oil/sugar/salt.
 *
 * No label, serving count or explanation is ever baked into the artwork:
 * every region carries its own text in `block.regions`, read from BM/DLP
 * content, so the one WebP asset serves both languages. The hotspot shapes
 * are SVG polygons in 0–100 percentage space (matching `block.image.aspect`
 * exactly), so they stay pixel-aligned with the artwork at any render size —
 * compact, mobile, resized, or the Enlarge lightbox.
 *
 * Selection feedback reuses `SpotlightOverlay` (dim the rest, glow the
 * chosen region) — the same visual language as the digestive-system, villus
 * and Visking diagrams elsewhere in this chapter.
 */
export function PyramidDiagram({
  block,
  enlargeLabel = "Enlarge",
  closeLabel = "Close",
}: {
  block: PyramidBlock;
  enlargeLabel?: string;
  closeLabel?: string;
}) {
  const [active, setActive] = useState<string | null>(block.defaultRegionId);
  const [zoomed, setZoomed] = useState(false);
  const baseId = useId();
  const url = getNotesImageUrl(block.image.src);
  const activeRegion = block.regions.find((r) => r.id === active) ?? null;

  const resolvedSize = block.image.size ?? defaultLearningImageSize(block.image.aspect);
  const maxWidth = learningImageMaxWidth(resolvedSize, block.image.aspect);

  const activeShapes: SpotlightShape[] = activeRegion
    ? [{ id: activeRegion.id, kind: "polygon", points: activeRegion.polygon }]
    : [];

  const select = (id: string) => setActive((v) => (v === id ? v : id));

  // Shared between the compact card and the Enlarge lightbox, exactly like
  // AnnotatedImage's own spotlight layer — the SAME element used in two tree
  // positions is fine in React (it is just a descriptor), and it is what
  // keeps the selection interactive and in sync at full size (requirement:
  // Enlarge must preserve AND recalculate the active region, not just freeze
  // a picture of it).
  const overlay = (
    <div className="absolute inset-0">
      <SpotlightOverlay maskId={`${baseId}-mask`} shapes={activeShapes} />
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        role="group"
        aria-label={block.title}
      >
        {block.regions.map((region) => {
          const isActive = active === region.id;
          return (
            <polygon
              key={region.id}
              points={region.polygon}
              tabIndex={0}
              role="button"
              aria-pressed={isActive}
              aria-label={region.label}
              onClick={() => select(region.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  select(region.id);
                }
              }}
              className={HOTSPOT_CLASS}
              style={{ pointerEvents: "auto" }}
            />
          );
        })}
      </svg>
    </div>
  );

  if (!url) return null;

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-4">
      <p className="mb-3 text-[13px] leading-relaxed text-muted-foreground">{block.instruction}</p>

      <figure className="relative mx-auto flex w-full flex-col gap-2" style={{ maxWidth }}>
        <div
          className="relative w-full overflow-hidden rounded-2xl border border-border bg-secondary/30"
          style={{ aspectRatio: block.image.aspect }}
        >
          <img
            src={url}
            alt={block.image.alt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-contain"
          />
          {overlay}
          <button
            type="button"
            onClick={() => setZoomed(true)}
            aria-label={`${enlargeLabel} — ${block.image.alt}`}
            className="absolute right-1.5 top-1.5 z-20 inline-flex items-center gap-1 rounded-full border border-white/25 bg-slate-900/75 px-2 py-1 text-[10.5px] font-semibold text-white opacity-90 backdrop-blur-[2px] transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Maximize2 className="h-3 w-3" aria-hidden="true" />
            <span className="hidden sm:inline">{enlargeLabel}</span>
          </button>
        </div>
      </figure>

      {activeRegion && (
        <div
          aria-live="polite"
          className="mx-auto mt-2 w-full max-w-sm rounded-lg border border-primary/25 bg-primary/8 p-2.5 text-[11.5px] leading-relaxed"
        >
          <p className="font-display font-bold text-primary">{activeRegion.label}</p>
          {activeRegion.items && activeRegion.items.length > 0 ? (
            <ul className="mt-0.5 flex flex-col gap-0.5">
              {activeRegion.items.map((item) => (
                <li key={item.label} className="text-foreground">
                  <span className="font-semibold">{item.label}</span>{" "}
                  <span className="text-muted-foreground">— {item.servings}</span>
                </li>
              ))}
            </ul>
          ) : (
            activeRegion.servings && (
              <p className="mt-0.5 font-semibold text-foreground">{activeRegion.servings}</p>
            )
          )}
          <p className="mt-1.5 font-semibold text-foreground">{activeRegion.detailTitle}</p>
          <p className="text-muted-foreground">{activeRegion.note}</p>
        </div>
      )}

      {block.limitNote && (
        <p className="mt-3 rounded-lg border border-amber-400/30 bg-amber-500/10 px-3 py-2 text-center text-[11.5px] text-amber-200">
          {block.limitNote}
        </p>
      )}
      {block.baseNote && (
        <p className="mt-2 text-center text-[11px] text-muted-foreground">{block.baseNote}</p>
      )}
      <p className="mt-2 text-center text-[10.5px] text-muted-foreground/70">{block.sourceLabel}</p>

      <LearningImageLightbox
        open={zoomed}
        onOpenChange={setZoomed}
        src={url}
        alt={block.image.alt}
        title={block.title}
        closeLabel={closeLabel}
        overlay={overlay}
      />
    </div>
  );
}
