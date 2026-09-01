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

/** First number in a reading such as "10 N", so the pointer can sit where the scale says. */
export function readingValue(text: string) {
  const match = /-?\d+(?:[.,]\d+)?/.exec(text ?? "");
  return match ? Number(match[0].replace(",", ".")) : null;
}

const SCALE_TOP = 32;
const SCALE_BOTTOM = 80;

/**
 * A spring balance drawn as the instrument it is: hanging ring, graduated body,
 * pointer and hook. The pointer is placed from the reading the content supplies,
 * so a smaller reading sits higher up the scale rather than being decorative.
 */
function SpringBalance({ x, reading, fraction }: { x: number; reading: string; fraction: number }) {
  const pointerY = SCALE_TOP + fraction * (SCALE_BOTTOM - SCALE_TOP);
  return (
    <g data-spring-balance={reading}>
      {/* ring to hang it from */}
      <circle cx={x} cy={22} r="5" fill="none" className="stroke-muted-foreground" strokeWidth="2" />
      {/* graduated body */}
      <rect x={x - 14} y={28} width={28} height={56} rx="4" className="fill-secondary stroke-border" strokeWidth="1.5" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <line
          key={i}
          x1={x - 13}
          y1={SCALE_TOP + i * 8}
          x2={x - (i % 2 === 0 ? 5 : 9)}
          y2={SCALE_TOP + i * 8}
          className="stroke-border"
          strokeWidth="1"
        />
      ))}
      {/* pointer at the reading */}
      <line x1={x - 13} y1={pointerY} x2={x + 13} y2={pointerY} className="stroke-rose-400" strokeWidth="2" />
      <text x={x + 17} y={pointerY + 4} fontSize="11" fontWeight="bold" className="fill-emerald-300">
        {reading}
      </text>
      {/* hook carrying the object */}
      <line x1={x} y1={84} x2={x} y2={89} className="stroke-muted-foreground" strokeWidth="2" />
      <path
        d={`M${x - 4},89 a4,4 0 1,0 8,0 a4,4 0 0,1 -8,0`}
        fill="none"
        className="stroke-muted-foreground"
        strokeWidth="2"
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

  // The in-air reading is the larger one, so it anchors the bottom of the scale.
  const air = readingValue(block.realWeight);
  const water = readingValue(block.apparentWeight);
  const airFraction = 1;
  const waterFraction = air && water && air > 0 ? Math.max(0.08, Math.min(1, water / air)) : 0.6;

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
              {/* A: the object hanging in air */}
              <text x={78} y={12} textAnchor="middle" fontSize="10" fontWeight="bold" className="fill-muted-foreground">
                {block.realWeightLabel}
              </text>
              <SpringBalance x={78} reading={block.realWeight} fraction={airFraction} />
              <rect x={62} y={94} width={32} height={32} rx="3" className="fill-primary/20 stroke-primary/70" strokeWidth="2" />

              {/* B: the same object, now hanging in water */}
              <text x={226} y={12} textAnchor="middle" fontSize="10" fontWeight="bold" className="fill-muted-foreground">
                {block.apparentWeightLabel}
              </text>
              <path d="M186,72 L186,158 L266,158 L266,72" fill="none" className="stroke-border" strokeWidth="2" />
              <rect x={187} y={88} width={78} height={69} className="fill-sky-400/20" />
              <line x1={187} y1={88} x2={265} y2={88} className="stroke-sky-300/70" strokeWidth="1.5" />
              <SpringBalance x={226} reading={block.apparentWeight} fraction={waterFraction} />
              <rect x={210} y={94} width={32} height={32} rx="3" className="fill-primary/20 stroke-primary/70" strokeWidth="2" />

              {/* the difference between the two readings */}
              <text x={152} y={174} textAnchor="middle" fontSize="11" fontWeight="bold" className="fill-amber-300">
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
