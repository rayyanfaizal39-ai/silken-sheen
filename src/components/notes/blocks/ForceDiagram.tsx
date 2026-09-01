import { useState } from "react";
import type { ForceDiagramBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";
import { ArrowHead, Chapter8PhotoFigure } from "@/components/notes/chapter8/Chapter8PhotoFigure";
import type { Chapter8ImageKey } from "@/components/notes/chapter8/chapter8-assets";

/**
 * A force drawn as an arrow over the real scene, which is what the syllabus asks
 * for: length carries magnitude, the head carries direction, and the tail sits on
 * the point of application.
 *
 * The photograph carries recognition; the arrow carries the science. Both are
 * drawn in the artwork's own pixel space (1672x941) rather than in percentages,
 * because percentages stretch x and y by different amounts and would skew the
 * arrowheads and distort the nail's direction.
 */

type ViewId = "box" | "nail";

const VIEWS: Record<ViewId, {
  image: Chapter8ImageKey;
  /** Point of application, in artwork pixels. */
  tail: [number, number];
  /** Unit direction the force acts along. */
  dir: [number, number];
  newtons: number;
  /** Where the magnitude label sits relative to the arrow. */
  label: [number, number];
}> = {
  // hand pressing the left face of the carton
  box: {
    image: "pushBox",
    tail: [707, 545],
    dir: [1, 0],
    newtons: 10,
    label: [820, 512],
  },
  // claw gripping the nail just under its head; the force acts along the nail
  nail: {
    image: "hammerNail",
    tail: [777, 540],
    dir: [0.168, -0.986],
    newtons: 15,
    label: [872, 360],
  },
};

/** Pixels of arrow per newton, so a bigger force is never drawn shorter. */
const PX_PER_NEWTON = 22;

export function ForceDiagram({ block, lang }: { block: ForceDiagramBlock; lang?: string }) {
  const [active, setActive] = useState(block.examples[0]?.id ?? "box");
  const copy = figureCopy(lang);

  const example = block.examples.find((e) => e.id === active) ?? block.examples[0];
  const view = VIEWS[(active as ViewId) in VIEWS ? (active as ViewId) : "box"];
  const len = view.newtons * PX_PER_NEWTON;
  const [tx, ty] = view.tail;
  const [dx, dy] = view.dir;
  const tipX = tx + dx * len;
  const tipY = ty + dy * len;

  const alt =
    active === "nail"
      ? lang === "bm"
        ? "Tukul mencabut paku dari sekeping kayu."
        : "A hammer pulling a nail out of a plank of wood."
      : lang === "bm"
        ? "Seorang murid menolak sebuah kotak besar di atas lantai."
        : "A student pushing a large box along the floor.";

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

      <Chapter8PhotoFigure image={view.image} alt={alt} space="pixel" priority>
        <ArrowHead id="ch8-force-arrow" className="fill-emerald-300" />
        {/* the arrow: tail = point of application, length = magnitude, head = direction */}
        <line
          data-force-arrow={active}
          x1={tx}
          y1={ty}
          x2={tipX}
          y2={tipY}
          className="stroke-emerald-300"
          strokeWidth="9"
          strokeLinecap="round"
          markerEnd="url(#ch8-force-arrow)"
        />
        {/* the tail dot marks the point of application unambiguously */}
        <circle data-application-point={active} cx={tx} cy={ty} r="13" className="fill-amber-300" />
        <circle cx={tx} cy={ty} r="21" fill="none" className="stroke-amber-300/70" strokeWidth="3" />
        <text
          x={view.label[0]}
          y={view.label[1]}
          textAnchor="middle"
          fontSize="42"
          fontWeight="bold"
          className="fill-emerald-200"
          stroke="rgba(2,8,23,0.75)"
          strokeWidth="7"
          paintOrder="stroke"
        >
          {example?.magnitude}
        </text>
      </Chapter8PhotoFigure>

      <p className="mt-1 text-center text-[11.5px] italic text-muted-foreground">{block.caption}</p>

      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11.5px] text-muted-foreground">
        <li>{block.magnitudeLabel}</li>
        <li>{block.directionLabel}</li>
        <li className="text-amber-300">{block.applicationLabel}</li>
      </ul>

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
