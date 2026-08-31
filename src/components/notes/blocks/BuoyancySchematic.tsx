import { useState } from "react";
import type { BuoyancySchematicBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";

/**
 * The spring-balance method for buoyant force, drawn as the two readings the
 * source actually takes: the object in air (W1) and the same object submerged
 * (W2). The difference between the two readings is the buoyant force.
 *
 * The float/sink views are deliberately separate from the measurement view,
 * because the force condition differs between them and collapsing the two is
 * how "floating means F > W" gets taught by accident. Here, floating is drawn
 * with the two arrows equal, and only sinking draws W longer than F.
 */

type ViewId = "measure" | "floating" | "sinking";

/** Arrow lengths in user units. Floating keeps F and W identical on purpose. */
const ARROWS: Record<Exclude<ViewId, "measure">, { up: number; down: number }> = {
  floating: { up: 46, down: 46 },
  sinking: { up: 26, down: 52 },
};

function VerticalArrow({
  x,
  y,
  length,
  up,
  className,
}: {
  x: number;
  y: number;
  length: number;
  up: boolean;
  className: string;
}) {
  const tipY = up ? y - length : y + length;
  return (
    <g className={className}>
      <line x1={x} y1={y} x2={x} y2={tipY} stroke="currentColor" strokeWidth="3" />
      <path
        d="M-5,4 L0,-4 L5,4 Z"
        transform={`translate(${x} ${tipY}) rotate(${up ? 0 : 180})`}
        fill="currentColor"
      />
    </g>
  );
}

export function BuoyancySchematic({ block, lang }: { block: BuoyancySchematicBlock; lang?: string }) {
  const [view, setView] = useState<ViewId>("measure");
  const copy = figureCopy(lang);

  const views: { id: ViewId; label: string }[] = [
    { id: "measure", label: block.buoyantForceLabel },
    { id: "floating", label: block.floatingNote.split(/[.—-]/)[0].trim() },
    { id: "sinking", label: block.sinkingNote.split(/[.—-]/)[0].trim() },
  ];

  const note =
    view === "measure" ? block.formula : view === "floating" ? block.floatingNote : block.sinkingNote;

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <div className="mb-2 flex flex-wrap gap-1.5" role="group" aria-label={copy.controlsLabel}>
        {views.map((v) => (
          <button
            key={v.id}
            type="button"
            aria-pressed={view === v.id}
            onClick={() => setView(v.id)}
            className={conceptButtonClass(view === v.id)}
          >
            {v.label}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 320 180"
          className="mx-auto h-auto w-full min-w-[290px] max-w-[430px]"
          role="img"
          aria-label={block.title}
        >
          {view === "measure" ? (
            <>
              {/* A: in air */}
              <text x={78} y={16} textAnchor="middle" fontSize="10" fontWeight="bold" className="fill-muted-foreground">
                {block.realWeightLabel}
              </text>
              <line x1={78} y1={24} x2={78} y2={52} className="stroke-muted-foreground" strokeWidth="2" />
              <rect x={62} y={52} width={32} height={40} rx="3" className="fill-primary/20 stroke-primary/70" strokeWidth="2" />
              <line x1={78} y1={92} x2={78} y2={110} className="stroke-muted-foreground" strokeWidth="2" />
              <rect x={60} y={110} width={36} height={26} rx="4" className="fill-secondary stroke-border" strokeWidth="1.5" />
              <text x={78} y={127} textAnchor="middle" fontSize="11" fontWeight="bold" className="fill-emerald-300">
                {block.realWeight}
              </text>

              {/* B: submerged */}
              <text x={226} y={16} textAnchor="middle" fontSize="10" fontWeight="bold" className="fill-muted-foreground">
                {block.apparentWeightLabel}
              </text>
              <line x1={226} y1={24} x2={226} y2={52} className="stroke-muted-foreground" strokeWidth="2" />
              {/* beaker of water */}
              <path d="M186,58 L186,150 L266,150 L266,58" fill="none" className="stroke-border" strokeWidth="2" />
              <rect x={187} y={74} width={78} height={75} className="fill-sky-400/20" />
              <line x1={187} y1={74} x2={265} y2={74} className="stroke-sky-300/70" strokeWidth="1.5" />
              <rect x={210} y={86} width={32} height={40} rx="3" className="fill-primary/20 stroke-primary/70" strokeWidth="2" />
              <line x1={226} y1={52} x2={226} y2={86} className="stroke-muted-foreground" strokeWidth="2" />
              <rect x={208} y={26} width={36} height={26} rx="4" className="fill-secondary stroke-border" strokeWidth="1.5" />
              <text x={226} y={43} textAnchor="middle" fontSize="11" fontWeight="bold" className="fill-emerald-300">
                {block.apparentWeight}
              </text>

              {/* the difference */}
              <text x={152} y={168} textAnchor="middle" fontSize="11" fontWeight="bold" className="fill-amber-300">
                {block.buoyantForce}
              </text>
            </>
          ) : (
            <>
              {/* water tank shared by both force views */}
              <path d="M70,34 L70,158 L250,158 L250,34" fill="none" className="stroke-border" strokeWidth="2" />
              <rect x={71} y={62} width={178} height={95} className="fill-sky-400/20" />
              <line x1={71} y1={62} x2={249} y2={62} className="stroke-sky-300/70" strokeWidth="1.5" />

              {/* the object: floating sits at the surface, sinking rests on the bottom */}
              <rect
                x={136}
                y={view === "floating" ? 50 : 126}
                width={48}
                height={30}
                rx="3"
                className="fill-primary/25 stroke-primary/70"
                strokeWidth="2"
              />

              {/* buoyant force up, weight down, from the object's centre */}
              <VerticalArrow
                x={160}
                y={view === "floating" ? 50 : 126}
                length={ARROWS[view].up}
                up
                className="text-emerald-300"
              />
              <VerticalArrow
                x={160}
                y={view === "floating" ? 80 : 156}
                length={ARROWS[view].down}
                up={false}
                className="text-rose-300"
              />
              <text
                x={168}
                y={view === "floating" ? 22 : 98}
                fontSize="11"
                fontWeight="bold"
                className="fill-emerald-300"
              >
                F
              </text>
              <text
                x={168}
                y={view === "floating" ? 138 : 176}
                fontSize="11"
                fontWeight="bold"
                className="fill-rose-300"
              >
                W
              </text>
            </>
          )}
        </svg>
      </div>

      <p className="mt-1 text-center text-[11.5px] italic text-muted-foreground">{block.caption}</p>

      <p
        aria-live="polite"
        className="mt-2 min-h-[2.75rem] rounded-xl border border-primary/25 bg-primary/10 px-3 py-2 text-[12px] leading-relaxed text-foreground"
      >
        {note}
      </p>
    </div>
  );
}
