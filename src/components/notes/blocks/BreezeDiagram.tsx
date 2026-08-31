import { useState } from "react";
import type { BreezeDiagramBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";

/**
 * Sea breeze and land breeze.
 *
 * Every arrow is derived from one field — which side is warmer right now. Warm
 * air rises over the warmer side, and the surface wind blows from the cooler side
 * toward the warmer side to replace it. Deriving all four arrows from `warmerSide`
 * means the day and night cases cannot end up pointing the same way, which is the
 * error this figure exists to prevent.
 *
 * Naming follows the source: the breeze is named after where the wind comes FROM.
 * Sea breeze blows sea -> land; land breeze blows land -> sea.
 */

const LAND_X = 88;
const SEA_X = 232;
const GROUND_Y = 122;

export function BreezeDiagram({ block, lang }: { block: BreezeDiagramBlock; lang?: string }) {
  const [which, setWhich] = useState<"sea" | "land">((block.breezes[0]?.id as "sea" | "land") ?? "sea");
  const copy = figureCopy(lang);

  const active = block.breezes.find((b) => b.id === which) ?? block.breezes[0];
  const warmIsLand = active.warmerSide === "land";
  /** Warm air rises over the warmer side; the surface wind flows toward it. */
  const risingX = warmIsLand ? LAND_X : SEA_X;
  const sinkingX = warmIsLand ? SEA_X : LAND_X;
  const windFrom = sinkingX;
  const windTo = risingX;
  const night = !warmIsLand;

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <div className="mb-2 flex flex-wrap gap-1.5" role="group" aria-label={copy.controlsLabel}>
        {block.breezes.map((b) => (
          <button
            key={b.id}
            type="button"
            aria-pressed={which === b.id}
            onClick={() => setWhich(b.id as "sea" | "land")}
            className={conceptButtonClass(which === b.id)}
          >
            {b.label}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 320 165"
          className="mx-auto h-auto w-full min-w-[290px] max-w-[430px]"
          role="img"
          aria-label={active?.label ?? block.title}
        >
          {/* sky, tinted by time of day */}
          <rect x={14} y={12} width={292} height={GROUND_Y - 12} className={night ? "fill-slate-500/15" : "fill-sky-400/12"} />
          {/* sun or moon */}
          {night ? (
            <path d="M286,30 a12,12 0 1,1 -11,-14 a10,10 0 0,0 11,14 z" className="fill-slate-200/70" />
          ) : (
            <circle cx={282} cy={28} r="11" className="fill-amber-300/80" />
          )}

          {/* land on the left, sea on the right */}
          <path d={`M14,${GROUND_Y} L150,${GROUND_Y} L150,${GROUND_Y + 28} L14,${GROUND_Y + 28} Z`} className="fill-amber-700/30 stroke-amber-700/50" strokeWidth="1.5" />
          <path d={`M150,${GROUND_Y} L306,${GROUND_Y} L306,${GROUND_Y + 28} L150,${GROUND_Y + 28} Z`} className="fill-sky-500/30 stroke-sky-500/50" strokeWidth="1.5" />
          <text x={LAND_X} y={GROUND_Y + 20} textAnchor="middle" fontSize="10" fontWeight="bold" className="fill-amber-200">
            {block.landLabel}
          </text>
          <text x={SEA_X} y={GROUND_Y + 20} textAnchor="middle" fontSize="10" fontWeight="bold" className="fill-sky-200">
            {block.seaLabel}
          </text>

          {/* warm air rising over the warmer side */}
          <g className="text-rose-300">
            <line x1={risingX} y1={GROUND_Y - 8} x2={risingX} y2={46} stroke="currentColor" strokeWidth="3" />
            <path d="M-5,4 L0,-4 L5,4 Z" transform={`translate(${risingX} 46)`} fill="currentColor" />
          </g>
          <text x={risingX} y={38} textAnchor="middle" fontSize="9" fontWeight="bold" className="fill-rose-300">
            {block.risesLabel}
          </text>

          {/* cooler air sinking over the cooler side */}
          <g className="text-sky-300">
            <line x1={sinkingX} y1={50} x2={sinkingX} y2={GROUND_Y - 12} stroke="currentColor" strokeWidth="3" />
            <path d="M-5,-4 L0,4 L5,-4 Z" transform={`translate(${sinkingX} ${GROUND_Y - 12})`} fill="currentColor" />
          </g>

          {/* the surface wind: from the cooler side toward the warmer side */}
          <g className="text-emerald-300">
            <line x1={windFrom} y1={GROUND_Y - 22} x2={windTo} y2={GROUND_Y - 22} stroke="currentColor" strokeWidth="3.2" />
            <path
              d="M-6,-5 L6,0 L-6,5 Z"
              transform={`translate(${windTo} ${GROUND_Y - 22}) rotate(${windTo > windFrom ? 0 : 180})`}
              fill="currentColor"
            />
          </g>

          {/* return flow aloft closes the circulation */}
          <g className="text-emerald-300/60">
            <line x1={risingX} y1={54} x2={sinkingX} y2={54} stroke="currentColor" strokeWidth="2" />
            <path
              d="M-5,-4 L5,0 L-5,4 Z"
              transform={`translate(${sinkingX} 54) rotate(${sinkingX > risingX ? 0 : 180})`}
              fill="currentColor"
            />
          </g>

          <text x={160} y={20} textAnchor="middle" fontSize="9.5" fontWeight="bold" className="fill-muted-foreground">
            {active?.timeOfDay}
          </text>
        </svg>
      </div>

      <p className="mt-1 text-center text-[11.5px] italic text-muted-foreground">{block.caption}</p>

      <p
        aria-live="polite"
        className="mt-2 min-h-[2.75rem] rounded-xl border border-primary/25 bg-primary/10 px-3 py-2 text-[12px] leading-relaxed text-foreground"
      >
        {active ? (
          <>
            <b className="text-primary">{active.label}</b> — {active.note}
          </>
        ) : (
          block.hint || copy.prompt
        )}
      </p>
    </div>
  );
}
