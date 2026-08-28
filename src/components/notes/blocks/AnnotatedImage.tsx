import type * as React from "react";
import { useId, useState } from "react";
import { Maximize2 } from "lucide-react";
import { getNotesImageUrl } from "@/lib/notes-images";
import { LearningImageLightbox } from "./LearningImageLightbox";
import {
  defaultLearningImageSize,
  learningImageMaxWidth,
  parseAspectRatio,
  type LearningImageSize,
} from "./learning-image";
import {
  CALLOUT_ART,
  CALLOUT_GUTTER,
  calloutFrameMaxWidth,
  labelsCollideWhenSmall,
  layoutCallouts,
  type AnnotationMode,
} from "./annotation-layout";

/**
 * One annotated point on the image.
 *
 * `x` / `y` are percentages of the artwork (0–100), so an annotation tracks its
 * structure at every rendered size — including inside the enlarge overlay —
 * without any fixed pixel maths. No text is ever baked into the artwork:
 * `label` (and the optional `note`) come from chapter content, so the same
 * image file serves BM and DLP.
 */
export type ImageAnnotation = {
  id: string;
  label: string;
  /** Optional one-line detail revealed when the annotation is activated. */
  note?: string;
  /** Optional emoji shown beside the label on its button and in the panel. */
  icon?: string;
  /**
   * Extra labelled facts shown under the note in the explanation panel — used
   * where a concept was previously taught by a small table, so folding that
   * table into the figure loses none of it.
   */
  facts?: { label: string; value: string }[];
  /**
   * Horizontal position as a percentage of image width. Omit — together with
   * `y` — for a concept the artwork does not depict: it then appears in the
   * control row and the explanation panel, but draws nothing on the picture.
   */
  x?: number;
  /** Vertical position as a percentage of image height. */
  y?: number;
  /**
   * `regions` mode only — size of the invisible hit area, as a percentage of
   * image width / height, centred on `x` / `y`. Percentages so the area tracks
   * its structure at every rendered size, including inside the enlarge overlay.
   */
  w?: number;
  h?: number;
};

/** An annotation that has a place on the artwork, so it can be drawn. */
export type PlacedAnnotation = ImageAnnotation & { x: number; y: number };

export function isPlaced(item: ImageAnnotation): item is PlacedAnnotation {
  return typeof item.x === "number" && typeof item.y === "number";
}

export type AnnotatedImageProps = {
  /** Bundled asset URL (a `src/assets` import) or notes-bucket object path. */
  src: string;
  /** Meaningful alt text, supplied per language by chapter content. */
  alt: string;
  annotations?: ImageAnnotation[];
  /**
   * How the parts are named:
   *  - `labels`   short text sitting on the artwork, next to each structure
   *  - `callouts` short text in gutters beside the artwork, joined by leader
   *               lines — for anatomy and dense process diagrams
   *  - `hybrid`   labels on the artwork plus a compact supporting legend
   *  - `numbers`  pins plus a legend; the last resort, for artwork too dense to
   *               label in place
   *  - `clean`    nothing on the artwork, names listed beneath — for
   *               observational visuals the student is meant to classify
   *  - `regions`  invisible hit areas over artwork that already prints its own
   *               labels; picking one highlights that area instead of adding a
   *               second, competing label
   */
  annotationMode?: AnnotationMode;
  /**
   * Rendered footprint. Omit to derive one from the aspect ratio, so an image
   * added without a size still stays bounded.
   */
  size?: LearningImageSize;
  /** Intrinsic aspect ratio, e.g. "3 / 2". Reserves space so there is no layout shift. */
  aspect?: string;
  /** Optional short caption rendered under the image. */
  caption?: string;
  /** Accessible name for the legend list. */
  legendLabel?: string;
  /**
   * Small key pinned inside the artwork's bottom-right corner — for artwork
   * whose own colours carry meaning, e.g. what a red or blue arrow represents.
   */
  imageKey?: { color: string; label: string }[];
  /** Localised label for the enlarge affordance. */
  enlargeLabel?: string;
  closeLabel?: string;
  /** Localised prompt shown in the explanation panel before anything is picked. */
  hintLabel?: string;
  /**
   * Controlled selection. Pass both to let a parent own which concept is
   * active — `InteractiveFigureCard` does this so its buttons and the regions
   * on the artwork are always the same selection. Omit both to keep the
   * figure self-contained, as chapters 1-3 do.
   */
  active?: string | null;
  onActiveChange?: (next: string | null) => void;
  /** Suppress the built-in legend — the parent is rendering the controls. */
  hideLegend?: boolean;
  /** Suppress the built-in explanation panel — the parent is rendering it. */
  hidePanel?: boolean;
  className?: string;
};

const CHIP_BASE =
  // A transparent inset lifts the tap area past 36px on phones without
  // making the pill itself look chunky over the artwork.
  "absolute z-10 max-w-[46%] whitespace-normal rounded-full border px-2 py-0.5 text-center text-[10.5px] font-semibold leading-tight shadow-[0_1px_6px_rgba(0,0,0,0.45)] backdrop-blur-[2px] transition-colors before:absolute before:-inset-x-2 before:-inset-y-3 before:content-[''] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:px-2.5 sm:py-1 sm:text-[11.5px] sm:before:-inset-0";
const CHIP_IDLE = "border-white/25 bg-slate-900/80 text-white hover:border-primary";
const CHIP_ACTIVE = "border-primary bg-primary text-primary-foreground";

/**
 * The shared wrapper for every learner-facing reference image in Notes.
 *
 * Responsibilities, deliberately kept narrow:
 *  - a bounded, aspect-ratio-preserving container that never crops or stretches
 *    and never grows into a full-page poster (see `learning-image.ts`)
 *  - localisable annotations positioned in percentages, in whichever of the
 *    four modes suits the artwork
 *  - a readable fallback on phones, where gutters and dense chips do not fit
 *  - click/tap to enlarge, so a compact inline figure never costs a student the
 *    detail
 *
 * Everything else — teaching copy, cards, quizzes — stays in the surrounding
 * section.
 */
export function AnnotatedImage({
  src,
  alt,
  annotations = [],
  annotationMode = "labels",
  size,
  aspect = "3 / 2",
  caption,
  legendLabel,
  imageKey,
  enlargeLabel = "Enlarge",
  closeLabel = "Close",
  hintLabel,
  active: controlledActive,
  onActiveChange,
  hideLegend = false,
  hidePanel = false,
  className,
}: AnnotatedImageProps) {
  const [uncontrolledActive, setUncontrolledActive] = useState<string | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const isControlled = controlledActive !== undefined;
  const active = isControlled ? controlledActive : uncontrolledActive;
  const setActive = (next: string | null) => {
    if (!isControlled) setUncontrolledActive(next);
    onActiveChange?.(next);
  };
  const baseId = useId();
  const url = getNotesImageUrl(src);

  const isCallout = annotationMode === "callouts";
  const isNumbers = annotationMode === "numbers";
  const isClean = annotationMode === "clean";
  const isRegions = annotationMode === "regions";
  const wantsLabels = annotationMode === "labels" || annotationMode === "hybrid";

  // Direct labels stay on the artwork only while there is room for them. Past
  // roughly five they collide on a phone, and callout gutters cannot fit at all
  // there, so those figures also render pins plus the legend and let CSS pick:
  // the rich treatment from `sm` up, pins below it. Deciding this in CSS rather
  // than by measuring keeps the fallback correct before hydration.
  // A concept with no coordinates is control-only: it never draws on the
  // artwork, and must not be counted when deciding whether labels would collide.
  const placed = annotations.filter(isPlaced);
  const artRatio = parseAspectRatio(aspect);
  // Gutters need horizontal room a phone does not have, and direct labels only
  // survive while they still fit side by side once the artwork is phone-sized.
  const needsSmallScreenFallback =
    isCallout ||
    (wantsLabels && (placed.length > 5 || labelsCollideWhenSmall(placed, artRatio)));
  const richVisibility = needsSmallScreenFallback ? "hidden sm:block" : "";
  const pinVisibility = needsSmallScreenFallback ? "sm:hidden" : "";

  const showPins = isNumbers || needsSmallScreenFallback;
  const showLegend =
    isNumbers || isClean || isRegions || annotationMode === "hybrid" || needsSmallScreenFallback;
  // A `clean`, `regions` or `hybrid` legend is the point, so it shows at every
  // width; a fallback legend only accompanies the small-screen pins.
  const legendVisibility =
    isNumbers || isClean || isRegions || annotationMode === "hybrid" ? "" : pinVisibility;

  const activeAnnotation = annotations.find((a) => a.id === active) ?? null;
  const resolvedSize = size ?? defaultLearningImageSize(aspect);
  const artMaxWidth = learningImageMaxWidth(resolvedSize, aspect);
  // In callout mode the gutters sit outside the picture, so the frame is wider
  // than the artwork while the artwork itself keeps its intended size.
  const frameMaxWidth = isCallout ? calloutFrameMaxWidth(artMaxWidth) : artMaxWidth;
  // Gutters widen the frame without changing the picture, so the frame's own
  // ratio is the artwork's ratio divided by the share the artwork occupies.
  const frameAspect = isCallout ? String(artRatio / (CALLOUT_ART / 100)) : aspect;

  const callouts = isCallout ? layoutCallouts(placed) : [];

  if (!url) return null;

  return (
    <figure className={`m-0 flex flex-col gap-2 ${className ?? ""}`}>
      <div
        className={`relative mx-auto w-full overflow-hidden rounded-2xl border border-border bg-secondary/30 ${
          isCallout ? "callout-frame" : ""
        }`}
        style={
          isCallout
            ? ({
                aspectRatio: aspect,
                maxWidth: artMaxWidth,
                "--callout-frame-aspect": frameAspect,
                "--callout-frame-max-width": frameMaxWidth,
              } as React.CSSProperties)
            : { aspectRatio: aspect, maxWidth: artMaxWidth }
        }
      >
        <img
          src={url}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`absolute inset-y-0 left-0 h-full w-full object-contain ${
            isCallout ? "callout-art" : ""
          }`}
        />

        {/* Leader lines, drawn under the labels. Percentage coordinates keep
            every line locked to its structure at any rendered width. */}
        {isCallout && (
          <svg
            className={`pointer-events-none absolute inset-0 h-full w-full ${richVisibility}`}
            aria-hidden="true"
          >
            {callouts.map(({ annotation, side, labelY, anchorX, anchorY }) => {
              const isActive = active === annotation.id;
              const startX = side === "left" ? `${CALLOUT_GUTTER - 1}%` : `${100 - CALLOUT_GUTTER + 1}%`;
              return (
                <g key={annotation.id}>
                  <line
                    x1={startX}
                    y1={`${labelY}%`}
                    x2={`${anchorX}%`}
                    y2={`${anchorY}%`}
                    className={isActive ? "stroke-primary" : "stroke-white/45"}
                    strokeWidth={isActive ? 1.6 : 1}
                  />
                  <circle
                    cx={`${anchorX}%`}
                    cy={`${anchorY}%`}
                    r={isActive ? 3.5 : 2.5}
                    className={isActive ? "fill-primary" : "fill-white/85"}
                  />
                </g>
              );
            })}
          </svg>
        )}

        {/* Callout labels, stacked down each gutter. */}
        {isCallout &&
          callouts.map(({ annotation, side, labelY }) => {
            const isActive = active === annotation.id;
            return (
              <button
                key={annotation.id}
                type="button"
                onClick={() => setActive(isActive ? null : annotation.id)}
                onMouseEnter={() => setActive(annotation.id)}
                onFocus={() => setActive(annotation.id)}
                className={`absolute z-10 -translate-y-1/2 rounded-md px-1 py-0.5 text-[10px] font-semibold leading-tight transition-colors sm:text-[11px] ${richVisibility} ${
                  side === "left" ? "text-right" : "text-left"
                } ${isActive ? "text-primary" : "text-foreground/90"}`}
                style={{
                  top: `${labelY}%`,
                  ...(side === "left"
                    ? { left: 0, width: `${CALLOUT_GUTTER - 1}%` }
                    : { right: 0, width: `${CALLOUT_GUTTER - 1}%` }),
                }}
              >
                {annotation.label}
              </button>
            );
          })}

        {/* Invisible hit areas over artwork that already prints its own labels.
            Nothing is painted until a region is picked; then only a ring, so a
            professionally labelled figure never gains a competing label set. */}
        {isRegions &&
          placed.map((item) => {
            const isActive = active === item.id;
            const width = item.w ?? 24;
            const height = item.h ?? 24;
            return (
              <button
                key={item.id}
                type="button"
                aria-label={item.label}
                aria-pressed={isActive}
                aria-describedby={`${baseId}-explanation`}
                // Click and focus only. A region that also cleared on mouse-leave
                // wiped a selection the moment the pointer crossed the artwork,
                // which is exactly the state the explanation panel must keep.
                onClick={() => setActive(isActive ? null : item.id)}
                onFocus={() => setActive(item.id)}
                className={`absolute z-10 cursor-pointer rounded-xl border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isActive ? "border-primary bg-primary/12" : "border-transparent hover:border-primary/60"
                }`}
                style={{
                  left: `${Math.max(0, item.x - width / 2)}%`,
                  top: `${Math.max(0, item.y - height / 2)}%`,
                  width: `${width}%`,
                  height: `${height}%`,
                }}
              />
            );
          })}

        {/* Direct labels and the small-screen pin fallback. */}
        {placed.map((item, index) => {
          const isActive = active === item.id;
          // Anchor a marker by its nearest edge when it sits close to the frame
          // border, so a long wrapped label can never spill outside the image.
          const translateX = item.x < 15 ? "0%" : item.x > 85 ? "-100%" : "-50%";
          const translateY = item.y < 12 ? "0%" : item.y > 88 ? "-100%" : "-50%";
          // In callout mode the pins belong to the small-screen fallback, where
          // the artwork fills the frame, so artwork space is frame space there.
          const style = {
            left: `${item.x}%`,
            top: `${item.y}%`,
            transform: `translate(${translateX}, ${translateY})`,
          } as const;

          return (
            <span key={item.id}>
              {showPins && (
                <button
                  type="button"
                  aria-describedby={`${baseId}-legend-${item.id}`}
                  aria-pressed={isActive}
                  onClick={() => setActive(isActive ? null : item.id)}
                  onMouseEnter={() => setActive(item.id)}
                  onFocus={() => setActive(item.id)}
                  // The dot stays visually small (20px, 24px from `sm`) while a
                  // transparent inset grows the touch target past 40px on phones.
                  className={`absolute z-10 flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-bold tabular-nums shadow-[0_1px_6px_rgba(0,0,0,0.45)] transition-all before:absolute before:-inset-2.5 before:content-[''] sm:h-6 sm:w-6 sm:text-[11px] sm:before:-inset-1 ${pinVisibility} ${
                    isActive
                      ? "scale-110 border-primary bg-primary text-primary-foreground"
                      : "border-white/70 bg-slate-900/80 text-white hover:border-primary"
                  }`}
                  style={style}
                >
                  {index + 1}
                  <span className="sr-only"> · {item.label}</span>
                </button>
              )}
              {wantsLabels && (
                <button
                  type="button"
                  aria-pressed={isActive}
                  aria-hidden={needsSmallScreenFallback ? "true" : undefined}
                  tabIndex={needsSmallScreenFallback ? -1 : undefined}
                  onClick={() => setActive(isActive ? null : item.id)}
                  onMouseEnter={() => setActive(item.id)}
                  onFocus={() => setActive(item.id)}
                  className={`${CHIP_BASE} ${isActive ? CHIP_ACTIVE : CHIP_IDLE} ${richVisibility}`}
                  style={style}
                >
                  {item.label}
                </button>
              )}
            </span>
          );
        })}

        {imageKey && imageKey.length > 0 && (
          <ul
            className="absolute bottom-1.5 right-1.5 z-20 m-0 flex list-none flex-col gap-0.5 rounded-lg border border-white/20 bg-slate-950/80 p-0 px-1.5 py-1 backdrop-blur-[2px]"
            aria-label={legendLabel ? `${legendLabel} — key` : "Key"}
          >
            {imageKey.map((entry) => (
              <li
                key={entry.label}
                className="flex items-center gap-1.5 text-[9px] font-medium leading-tight text-white sm:text-[10px]"
              >
                <span
                  aria-hidden="true"
                  className="inline-block h-0 w-3.5 shrink-0 border-t-2"
                  style={{ borderColor: entry.color }}
                />
                {entry.label}
              </li>
            ))}
          </ul>
        )}

        <button
          type="button"
          onClick={() => setZoomed(true)}
          aria-label={`${enlargeLabel} — ${alt}`}
          className="absolute right-1.5 top-1.5 z-20 inline-flex items-center gap-1 rounded-full border border-white/25 bg-slate-900/75 px-2 py-1 text-[10.5px] font-semibold text-white opacity-90 backdrop-blur-[2px] transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Maximize2 className="h-3 w-3" aria-hidden="true" />
          <span className="hidden sm:inline">{enlargeLabel}</span>
        </button>
      </div>

      {showLegend && !hideLegend && annotations.length > 0 && (
        <ol
          aria-label={legendLabel ?? alt}
          className={`m-0 grid list-none grid-cols-1 gap-x-3 gap-y-0.5 p-0 sm:grid-cols-2 lg:grid-cols-3 ${legendVisibility}`}
        >
          {annotations.map((item, index) => {
            const isActive = active === item.id;
            const marker = (
              <span
                aria-hidden="true"
                className={`mt-[1px] inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold tabular-nums ${
                  isClean || isRegions ? "text-primary" : ""
                } ${
                  isActive && !isClean && !isRegions
                    ? "bg-primary text-primary-foreground"
                    : isClean || isRegions
                      ? ""
                      : "bg-secondary text-muted-foreground"
                }`}
              >
                {isClean || isRegions ? "·" : index + 1}
              </span>
            );
            const rowClass = `flex items-start gap-1.5 rounded-lg px-1.5 py-0.5 text-[11.5px] leading-snug transition-colors ${
              isActive ? "bg-primary/12 text-foreground" : "text-muted-foreground"
            }`;

            // A legend row is a real control wherever it has something to
            // reveal — an entry that looked clickable but produced nothing was
            // the dead affordance this pass set out to remove. In `regions`
            // mode it is also the primary control, since the areas on the
            // artwork carry no text of their own.
            const interactive = isRegions || Boolean(item.note);
            return (
              <li key={item.id} id={`${baseId}-legend-${item.id}`} className="min-w-0">
                {interactive ? (
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActive(isActive ? null : item.id)}
                    onFocus={() => setActive(item.id)}
                    className={`${rowClass} w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
                  >
                    {marker}
                    <span className="min-w-0">{item.label}</span>
                  </button>
                ) : (
                  <span className={rowClass}>
                    {marker}
                    <span className="min-w-0">{item.label}</span>
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      )}

      {/* One explanation panel per figure, always in the same place and always
          reserving its space, so picking a label never shifts the page and no
          label can look interactive while producing nothing. */}
      {annotations.length > 0 && !hidePanel && (
        <p
          id={`${baseId}-explanation`}
          aria-live="polite"
          className={`min-h-[2.5rem] rounded-xl border px-3 py-1.5 text-[12px] leading-relaxed ${
            activeAnnotation
              ? "border-primary/25 bg-primary/8 text-foreground"
              : "border-border bg-secondary/30 text-muted-foreground"
          }`}
        >
          {activeAnnotation ? (
            <>
              <b className="text-primary">{activeAnnotation.label}</b>
              {activeAnnotation.note ? ` — ${activeAnnotation.note}` : ""}
            </>
          ) : (
            (hintLabel ?? "")
          )}
        </p>
      )}

      {caption && (
        <figcaption className="text-[11.5px] leading-relaxed text-muted-foreground">
          {caption}
        </figcaption>
      )}

      <LearningImageLightbox
        open={zoomed}
        onOpenChange={setZoomed}
        src={url}
        alt={alt}
        title={legendLabel ?? alt}
        closeLabel={closeLabel}
      />
    </figure>
  );
}
