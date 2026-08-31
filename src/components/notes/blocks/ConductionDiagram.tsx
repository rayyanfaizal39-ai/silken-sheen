import { useState } from "react";
import type { ConductionDiagramBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";

/**
 * Conduction along a solid bar.
 *
 * Every particle keeps the same x-position in every stage — only the vibration
 * marks around it grow. That is deliberate: the misconception this figure exists
 * to prevent is that particles travel along the bar carrying heat with them. Here
 * the energy front advances while the lattice stays put.
 */

const BAR = { x: 52, y: 62, w: 216, h: 40 } as const;

/** Fraction of the bar the energy has reached, per stage. */
const REACH: Record<string, number> = { start: 0.2, middle: 0.55, full: 1 };

export function ConductionDiagram({ block, lang }: { block: ConductionDiagramBlock; lang?: string }) {
  const [stage, setStage] = useState(block.stages[0]?.id ?? "start");
  const copy = figureCopy(lang);
  const active = block.stages.find((s) => s.id === stage) ?? block.stages[0];
  const reach = REACH[stage] ?? 0.2;

  // Fixed lattice positions — identical in every stage.
  const particles = Array.from({ length: block.particleCount }, (_, i) => ({
    x: BAR.x + 14 + (i * (BAR.w - 28)) / Math.max(1, block.particleCount - 1),
    y: BAR.y + BAR.h / 2,
    frac: i / Math.max(1, block.particleCount - 1),
  }));

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <div className="mb-2 flex flex-wrap gap-1.5" role="group" aria-label={copy.controlsLabel}>
        {block.stages.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={stage === s.id}
            onClick={() => setStage(s.id)}
            className={conceptButtonClass(stage === s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 320 150"
          className="mx-auto h-auto w-full min-w-[290px] max-w-[430px]"
          role="img"
          aria-label={active?.label ?? block.title}
        >
          {/* the solid bar */}
          <rect x={BAR.x} y={BAR.y} width={BAR.w} height={BAR.h} rx="3" className="fill-primary/10 stroke-primary/60" strokeWidth="2" />

          {/* flame at the hot end */}
          <g className="stroke-rose-300" strokeWidth="2.4">
            {[0, 1, 2].map((i) => (
              <path key={i} d={`M${BAR.x - 22 + i * 8},${BAR.y + BAR.h + 22} q4,-9 0,-16`} fill="none" />
            ))}
          </g>
          <text x={BAR.x - 14} y={BAR.y - 12} textAnchor="middle" fontSize="10" fontWeight="bold" className="fill-rose-300">
            {block.hotLabel}
          </text>
          <text x={BAR.x + BAR.w + 6} y={BAR.y - 12} textAnchor="middle" fontSize="10" fontWeight="bold" className="fill-sky-300">
            {block.coldLabel}
          </text>

          {particles.map((p, i) => {
            const energised = p.frac <= reach;
            // Vibration marks grow with energy; the particle itself never moves.
            const amp = energised ? 7 : 3;
            return (
              <g key={i}>
                <line x1={p.x - amp} y1={p.y} x2={p.x + amp} y2={p.y} className={energised ? "stroke-rose-300/80" : "stroke-sky-300/50"} strokeWidth="1.4" />
                <circle cx={p.x} cy={p.y} r="5" className={energised ? "fill-rose-300" : "fill-sky-300"} />
              </g>
            );
          })}

          {/* the energy front, not a moving particle */}
          <g className="text-amber-300">
            <line x1={BAR.x + 8} y1={BAR.y + BAR.h + 16} x2={BAR.x + 8 + (BAR.w - 16) * reach} y2={BAR.y + BAR.h + 16} stroke="currentColor" strokeWidth="2.4" strokeDasharray="4 3" />
            <path d="M-4,-4 L4,0 L-4,4 Z" transform={`translate(${BAR.x + 8 + (BAR.w - 16) * reach} ${BAR.y + BAR.h + 16})`} fill="currentColor" />
          </g>
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

      <div className="mt-2 rounded-xl border border-amber-300/30 bg-amber-300/10 px-3 py-2">
        <p className="text-[12px] leading-relaxed text-foreground">{block.mechanismNote}</p>
      </div>
    </div>
  );
}
