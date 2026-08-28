import { useState } from "react";
import type { TitrationSchematicBlock } from "@/content/form2/science/interactive-types";
import type { ImageAnnotation } from "./AnnotatedImage";
import {
  conceptButtonClass,
  InteractiveBadge,
  InteractiveFigureCard,
  mergeConcepts,
} from "./InteractiveFigureCard";

/**
 * The titration set-up, as a teaching schematic.
 *
 * Deliberately NOT staged as a variable-controlled experiment: this chapter has
 * no compulsory investigation, so the diagram teaches the apparatus and what the
 * end point means, and stops there.
 *
 * Selecting "end point" flips the flask contents from pink to colourless, so the
 * colour change is something the learner watches happen rather than only reads.
 */
export function TitrationSchematic({ block, lang }: { block: TitrationSchematicBlock; lang?: string }) {
  // Approved artwork replaces the schematic outright — the two never appear
  // together, and every label below is this block's own verified data.
  if (block.image) {
    const concepts: ImageAnnotation[] = block.labels.map((item) => {
      const point = block.image!.points.find((p) => p.id === item.id);
      return {
        id: item.id,
        label: item.label,
        note: item.note,
        x: point?.x,
        y: point?.y,
        w: point?.w,
        h: point?.h,
      };
    });
    const withExtras = mergeConcepts(concepts, block.image.extra);
    return (
      <InteractiveFigureCard
        lang={lang}
        instruction={block.instruction}
        prompt={block.hint}
        concepts={withExtras}
        image={{
          src: block.image.src,
          alt: block.image.alt,
          size: block.image.size ?? "wide",
          aspect: block.image.aspect ?? "3 / 2",
          caption: block.image.caption,
          legendLabel: block.image.legendLabel ?? block.title,
          annotationMode: block.image.annotationMode ?? "regions",
          imageKey: block.image.imageKey,
        }}
      />
    );
  }


  const [active, setActive] = useState<string | null>(null);
  const activeLabel = block.labels.find((l) => l.id === active) ?? null;

  const on = (id: string) => active === id;
  const atEndpoint = on("endpoint");

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 240 200"
          className="mx-auto h-auto w-full min-w-[220px] max-w-[330px]"
          role="img"
          aria-label={block.title}
        >
          {/* retort stand */}
          <line x1={34} y1={186} x2={34} y2={20} className="stroke-border" strokeWidth="3" />
          <line x1={16} y1={186} x2={80} y2={186} className="stroke-border" strokeWidth="3" />
          <line x1={34} y1={44} x2={104} y2={44} className="stroke-border" strokeWidth="2.5" />

          {/* burette */}
          <rect
            x={96}
            y={22}
            width="18"
            height="104"
            rx="3"
            fill="none"
            className={on("burette") ? "stroke-primary" : "stroke-border"}
            strokeWidth={on("burette") ? 2.4 : 1.5}
          />
          {/* acid inside the burette */}
          <rect
            x={97}
            y={on("acid") ? 30 : 34}
            width="16"
            height={on("acid") ? 90 : 86}
            className={on("acid") ? "fill-amber-300/60" : "fill-amber-400/35"}
          />
          {/* tap + falling drop */}
          <path d="M105,126 L105,138" className="stroke-border" strokeWidth="2" />
          <circle cx={105} cy={144} r="2.6" className="fill-amber-300/80" />

          {/* conical flask */}
          <path
            d="M88,196 L120,150 L120,150 L90,150 Z"
            fill="none"
            className={on("flask") ? "stroke-primary" : "stroke-border"}
            strokeWidth={on("flask") ? 2.4 : 1.5}
          />
          <path
            d="M78,192 L105,152 L132,192 Z"
            fill="none"
            className={on("flask") ? "stroke-primary" : "stroke-border"}
            strokeWidth={on("flask") ? 2.4 : 1.5}
          />
          <rect
            x={99}
            y={148}
            width="12"
            height="8"
            fill="none"
            className={on("flask") ? "stroke-primary" : "stroke-border"}
            strokeWidth={on("flask") ? 2.4 : 1.5}
          />
          {/* flask contents: pink until the end point, then colourless */}
          <path
            d="M86,182 L105,170 L124,182 L124,190 L86,190 Z"
            className={atEndpoint ? "fill-slate-200/35" : "fill-pink-400/55"}
          />

          {/* white tile under the flask */}
          <rect
            x={72}
            y={192}
            width="66"
            height="5"
            rx="1.5"
            className="fill-slate-200/70"
          />

          {/* indicator marker */}
          {on("indicator") && (
            <text x={105} y={166} textAnchor="middle" fontSize="9">
              💧
            </text>
          )}

          {/* end-point callout */}
          <text
            x={168}
            y={176}
            textAnchor="middle"
            fontSize="8"
            className={atEndpoint ? "fill-primary" : "fill-muted-foreground"}
            fontWeight={atEndpoint ? "bold" : "normal"}
          >
            {atEndpoint ? "✓" : ""}
          </text>
        </svg>
      </div>

      <p className="mt-1 text-center text-[11.5px] font-semibold text-foreground">
        {block.endpointCaption}
      </p>

      <div className="mt-2 flex flex-wrap gap-1.5">
        {block.labels.map((label) => {
          const isActive = active === label.id;
          return (
            <button
              key={label.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(isActive ? null : label.id)}
              onMouseEnter={() => setActive(label.id)}
              onFocus={() => setActive(label.id)}
              className={conceptButtonClass(isActive)}
            >
              {label.label}
            </button>
          );
        })}
      </div>

      <p
        aria-live="polite"
        className={`mt-2 min-h-[2.5rem] rounded-xl border px-3 py-1.5 text-[12px] leading-relaxed ${
          activeLabel
            ? "border-primary/25 bg-primary/10 text-foreground"
            : "border-border bg-secondary/30 text-muted-foreground"
        }`}
      >
        {activeLabel ? (
          <>
            <b className="text-primary">{activeLabel.label}</b> — {activeLabel.note}
          </>
        ) : (
          block.hint
        )}
      </p>
    </div>
  );
}
