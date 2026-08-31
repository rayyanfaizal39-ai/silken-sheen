import { useState } from "react";
import type { ForceDiagramBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";

/**
 * A force drawn as an arrow, which is the thing the syllabus actually asks for:
 * length carries magnitude, the head carries direction, and the tail sits on the
 * point of application.
 *
 * Both examples point in the direction the source shows -- the box is pushed to
 * the right, the nail is pulled up out of the wood -- so switching example moves
 * the arrow rather than redrawing it, and the tail always lands on the labelled
 * contact point. Arrow length is derived from the magnitude so a bigger force is
 * never drawn shorter than a smaller one.
 */

/** Geometry per example, in the SVG user space below. */
const VIEWS = {
  box: {
    /** Tail sits on the hand/box contact face; the arrow runs to the right. */
    tailX: 96,
    tailY: 96,
    deg: 0,
    /** Newtons, used only to scale the drawn length. */
    newtons: 10,
  },
  nail: {
    /** Tail sits on the hammer claw gripping the nail; the arrow runs upward. */
    tailX: 214,
    tailY: 104,
    deg: -90,
    newtons: 15,
  },
} as const;

/** Longest arrow on the figure, in user units, for the largest magnitude shown. */
const MAX_LEN = 78;
const MAX_N = 15;

function arrowLength(newtons: number) {
  // Proportional, with a floor so a small force is still clearly an arrow.
  return Math.max(30, (newtons / MAX_N) * MAX_LEN);
}

export function ForceDiagram({ block, lang }: { block: ForceDiagramBlock; lang?: string }) {
  const [active, setActive] = useState(block.examples[0]?.id ?? "box");
  const copy = figureCopy(lang);

  const example = block.examples.find((e) => e.id === active) ?? block.examples[0];
  const view = VIEWS[(active as keyof typeof VIEWS) in VIEWS ? (active as keyof typeof VIEWS) : "box"];
  const len = arrowLength(view.newtons);

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <div className="mb-2 flex flex-wrap gap-1.5" role="group" aria-label={copy.controlsLabel}>
        {block.examples.map((e) => (
          <button
            key={e.id}
            type="button"
            aria-pressed={active === e.id}
            onClick={() => setActive(e.id)}
            className={conceptButtonClass(active === e.id)}
          >
            {e.label}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 320 170"
          className="mx-auto h-auto w-full min-w-[290px] max-w-[430px]"
          role="img"
          aria-label={example?.label ?? block.title}
        >
          {/* ground line */}
          <line x1={16} y1={132} x2={304} y2={132} className="stroke-muted-foreground/50" strokeWidth="1.5" />

          {active === "box" ? (
            <>
              {/* the box being pushed */}
              <rect x={100} y={72} width={64} height={60} className="fill-primary/15 stroke-primary/60" strokeWidth="2" />
              {/* the hand contact face -- this is the point of application */}
              <line x1={96} y1={72} x2={96} y2={132} className="stroke-amber-300" strokeWidth="3" />
            </>
          ) : (
            <>
              {/* wood block with the nail standing in it */}
              <rect x={168} y={104} width={96} height={28} className="fill-primary/15 stroke-primary/60" strokeWidth="2" />
              <line x1={214} y1={104} x2={214} y2={62} className="stroke-muted-foreground" strokeWidth="3" />
              {/* hammer claw gripping the nail head -- the point of application */}
              <path d="M204,104 L214,96 L224,104" fill="none" className="stroke-amber-300" strokeWidth="3" />
            </>
          )}

          {/* the force arrow: tail = point of application, length = magnitude, head = direction */}
          <g transform={`translate(${view.tailX} ${view.tailY}) rotate(${view.deg})`}>
            <line x1={0} y1={0} x2={len} y2={0} className="stroke-emerald-300" strokeWidth="3" />
            <path d="M-5,-4 L5,0 L-5,4 Z" transform={`translate(${len} 0)`} className="fill-emerald-300" />
          </g>
          {/* the tail dot marks the point of application unambiguously */}
          <circle cx={view.tailX} cy={view.tailY} r="4" className="fill-amber-300" />

          {/* labels for the three properties */}
          <text
            x={view.tailX + (view.deg === 0 ? len / 2 : 16)}
            y={view.deg === 0 ? view.tailY - 12 : view.tailY - len / 2}
            textAnchor="middle"
            fontSize="11"
            fontWeight="bold"
            className="fill-emerald-300"
          >
            {example?.magnitude}
          </text>
          <text x={16} y={20} fontSize="10" className="fill-muted-foreground">
            {block.magnitudeLabel}
          </text>
          <text x={16} y={34} fontSize="10" className="fill-muted-foreground">
            {block.directionLabel}
          </text>
          <text x={16} y={48} fontSize="10" className="fill-amber-300">
            {block.applicationLabel}
          </text>
        </svg>
      </div>

      <p className="mt-1 text-center text-[11.5px] italic text-muted-foreground">{block.caption}</p>

      <p
        aria-live="polite"
        className={`mt-2 min-h-[2.75rem] rounded-xl border px-3 py-2 text-[12px] leading-relaxed ${
          example ? "border-primary/25 bg-primary/10 text-foreground" : "border-border bg-secondary/30 text-muted-foreground"
        }`}
      >
        {example ? (
          <>
            <b className="text-primary">{example.label}</b> — {example.note}{" "}
            <b className="text-amber-300">{block.applicationLabel}:</b> {example.applicationPoint}
          </>
        ) : (
          block.hint || copy.prompt
        )}
      </p>
    </div>
  );
}
