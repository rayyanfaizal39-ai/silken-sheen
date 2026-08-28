import { useEffect, useRef, useState } from "react";
import { Sparkles, MousePointerClick } from "lucide-react";
import { AnnotatedImage, type AnnotatedImageProps, type ImageAnnotation } from "./AnnotatedImage";
import { figureCopy } from "./figure-copy";

/**
 * One learning unit: an instructional image, the concepts it teaches as real
 * buttons directly beneath it, and one explanation panel under those.
 *
 * This exists because the affordance was the problem, not the content. The
 * concepts used to live in a small legend that read as metadata, so a student
 * scrolling a chapter had no reason to think the figure did anything. Here the
 * badge says the figure is interactive, the instruction says what to do, and
 * the controls are full-size buttons sitting where the eye already is — right
 * under the picture it just looked at.
 *
 * `AnnotatedImage` is still the only thing that renders artwork; this card
 * drives it in controlled mode so a button and its region on the picture are
 * always the same selection.
 */

export type InteractiveFigureCardProps = {
  lang: string | undefined;
  /** Optional heading above the badge — usually the block's own title. */
  title?: string;
  /**
   * Chapter-authored instruction. Falls back to the shared "Tap a concept to
   * explore." so a frozen chapter needs no edit to gain the affordance.
   */
  instruction?: string;
  /** Neutral prompt before anything is picked. Falls back to shared copy. */
  prompt?: string;
  /** The concepts. Any with `x`/`y` also become a region on the artwork. */
  concepts: ImageAnnotation[];
  /**
   * Render the row of concept buttons. Set false for artwork whose labels are
   * already drawn on the picture with leader lines — there the labels are the
   * control, and a second row of buttons below would only repeat them.
   */
  showControls?: boolean;
  image: Omit<
    AnnotatedImageProps,
    | "annotations"
    | "active"
    | "onActiveChange"
    | "hideLegend"
    | "hidePanel"
    | "enlargeLabel"
    | "closeLabel"
    | "hintLabel"
  >;
  className?: string;
};

/**
 * The one concept-control style. Sized for a thumb (44px), bordered and filled
 * so it reads as an action rather than a metadata pill, with a selected state
 * that cannot be mistaken for anything else.
 */
export function conceptButtonClass(isActive: boolean, extra = ""): string {
  return [
    "inline-flex min-h-11 cursor-pointer items-center justify-center gap-1.5 rounded-xl border-2 px-3 py-2",
    "text-[12.5px] font-semibold leading-tight transition-all",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    isActive
      ? "border-primary bg-primary text-primary-foreground shadow-md"
      : "border-primary/40 bg-card text-foreground hover:-translate-y-px hover:border-primary hover:bg-primary/10 hover:shadow-md",
    extra,
  ]
    .filter(Boolean)
    .join(" ");
}

/**
 * Merges a block's own concepts with the extras its artwork adds, honouring an
 * extra's `insertAfter` so a set of apparatus still reads in procedure order.
 */
export function mergeConcepts(
  concepts: ImageAnnotation[],
  extras: (ImageAnnotation & { insertAfter?: string })[] = [],
): ImageAnnotation[] {
  const merged = [...concepts];
  for (const extra of extras) {
    const { insertAfter, ...concept } = extra;
    const at = insertAfter ? merged.findIndex((item) => item.id === insertAfter) : -1;
    if (at === -1) merged.push(concept);
    else merged.splice(at + 1, 0, concept);
  }
  return merged;
}

/** Fires once, the first time the card is scrolled into view. */
function useFirstViewCue(): [boolean, (node: HTMLDivElement | null) => void] {
  const [cued, setCued] = useState(false);
  const spent = useRef(false);
  const cleanup = useRef<(() => void) | null>(null);

  const ref = (node: HTMLDivElement | null) => {
    cleanup.current?.();
    cleanup.current = null;
    if (!node || spent.current) return;
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting) || spent.current) return;
        spent.current = true;
        setCued(true);
        observer.disconnect();
      },
      { threshold: 0.25 },
    );
    observer.observe(node);
    cleanup.current = () => observer.disconnect();
  };

  // The cue is one-shot: the class is removed once it has played, so scrolling
  // back to the figure never replays it.
  useEffect(() => {
    if (!cued) return;
    const timer = setTimeout(() => setCued(false), 1200);
    return () => clearTimeout(timer);
  }, [cued]);

  return [cued, ref];
}

/**
 * The "you can use this" marker. Shared so every interactive figure in Science
 * announces itself the same way, whether or not it renders a button row.
 */
export function InteractiveBadge({
  lang,
  instruction,
  cued = false,
  className,
}: {
  lang: string | undefined;
  instruction?: string;
  /** Play the one-shot first-view swell. */
  cued?: boolean;
  className?: string;
}) {
  const copy = figureCopy(lang);
  return (
    <div className={`flex flex-wrap items-center gap-x-2 gap-y-1 ${className ?? ""}`}>
      <span
        className={`inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wide text-primary-foreground shadow-sm ${
          cued ? "figure-cue-badge" : ""
        }`}
      >
        <Sparkles className="h-3 w-3" aria-hidden="true" />
        {copy.badge}
      </span>
      <span className="text-[12.5px] font-medium leading-snug text-foreground/85">
        {instruction ?? copy.instruction}
      </span>
    </div>
  );
}

export function InteractiveFigureCard({
  lang,
  title,
  instruction,
  prompt,
  concepts,
  showControls = true,
  image,
  className,
}: InteractiveFigureCardProps) {
  const copy = figureCopy(lang);
  const [active, setActive] = useState<string | null>(null);
  const [cued, cueRef] = useFirstViewCue();
  const selected = concepts.find((concept) => concept.id === active) ?? null;

  return (
    <div
      ref={cueRef}
      className={`rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5 ${className ?? ""}`}
    >
      {title && (
        <h3 className="font-display mb-2 text-base font-bold text-foreground">{title}</h3>
      )}

      {/* The affordance, stated rather than implied. */}
      <InteractiveBadge
        lang={lang}
        instruction={instruction}
        cued={cued}
        className="mb-2.5"
      />

      <AnnotatedImage
        {...image}
        annotations={concepts}
        active={active}
        onActiveChange={setActive}
        hideLegend={showControls}
        hidePanel
        enlargeLabel={copy.enlarge}
        closeLabel={copy.close}
      />

      {/* Controls sit immediately under the artwork, so image, buttons and
          explanation read as one unit rather than three separate things. */}
      {showControls && (
      <div
        role="group"
        aria-label={copy.controlsLabel}
        className="mt-3 flex flex-wrap gap-1.5"
      >
        {concepts.map((concept, index) => {
          const isActive = concept.id === active;
          return (
            <button
              key={concept.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(isActive ? null : concept.id)}
              className={conceptButtonClass(
                isActive,
                `flex-auto sm:flex-none ${cued && index === 0 && !isActive ? "figure-cue-glow" : ""}`,
              )}
            >
              {concept.icon && (
                <span aria-hidden="true" className="text-[13px]">
                  {concept.icon}
                </span>
              )}
              {concept.label}
            </button>
          );
        })}
      </div>
      )}

      {/* One panel, always in the same place and always reserving its space, so
          picking a concept never shifts the page. */}
      <div
        aria-live="polite"
        className={`mt-2.5 min-h-[4.25rem] rounded-xl border px-3 py-2.5 transition-colors ${
          selected ? "border-primary/35 bg-primary/8" : "border-border bg-secondary/30"
        }`}
      >
        {selected ? (
          <>
            <p className="font-display text-[13px] font-bold text-primary">
              {selected.icon ? `${selected.icon} ` : ""}
              {selected.label}
            </p>
            {selected.note && (
              <p className="mt-1 text-[12.5px] leading-relaxed text-foreground">{selected.note}</p>
            )}
            {selected.facts && selected.facts.length > 0 && (
              <dl className="mt-1.5 flex flex-col gap-0.5">
                {selected.facts.map((fact) => (
                  <div key={fact.label} className="flex flex-wrap gap-x-1.5 text-[12px] leading-snug">
                    <dt className="font-semibold text-muted-foreground">{fact.label}:</dt>
                    <dd className="m-0 min-w-0 text-foreground">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </>
        ) : (
          <p className="flex items-center gap-1.5 text-[12.5px] leading-relaxed text-muted-foreground">
            <MousePointerClick className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {prompt ?? copy.prompt}
          </p>
        )}
      </div>
    </div>
  );
}
