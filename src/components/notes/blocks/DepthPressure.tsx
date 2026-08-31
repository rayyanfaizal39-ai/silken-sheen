import { useState } from "react";
import type { DepthPressureBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";

/**
 * Liquid pressure against depth, shown as jets from holes down one side of a can.
 *
 * Jet length is computed from each hole's depth rather than typed per hole, so a
 * deeper hole can never be drawn with a shorter jet than a shallower one -- which
 * is the one way this figure could teach the relationship backwards.
 */

const CAN = { x: 60, y: 26, w: 78, h: 124 } as const;
const SURFACE_Y = CAN.y + 10;
/** Jet length per unit of depth, in user units. */
const JET_SCALE = 1.15;

/** Hole positions down the right wall, top to bottom. */
const HOLE_Y = [56, 88, 120] as const;

export function DepthPressure({ block, lang }: { block: DepthPressureBlock; lang?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const copy = figureCopy(lang);

  const level = block.levels.find((l) => l.id === active) ?? null;

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <div className="mb-2 flex flex-wrap gap-1.5" role="group" aria-label={copy.controlsLabel}>
        {block.levels.map((l) => {
          const on = active === l.id;
          return (
            <button
              key={l.id}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(on ? null : l.id)}
              className={conceptButtonClass(on)}
            >
              {l.label}
            </button>
          );
        })}
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 320 175"
          className="mx-auto h-auto w-full min-w-[290px] max-w-[430px]"
          role="img"
          aria-label={block.title}
        >
          {/* the can and its water */}
          <rect x={CAN.x} y={CAN.y} width={CAN.w} height={CAN.h} fill="none" className="stroke-border" strokeWidth="2.5" />
          <rect x={CAN.x + 1} y={SURFACE_Y} width={CAN.w - 2} height={CAN.y + CAN.h - SURFACE_Y - 1} className="fill-sky-400/20" />
          <line x1={CAN.x + 1} y1={SURFACE_Y} x2={CAN.x + CAN.w - 1} y2={SURFACE_Y} className="stroke-sky-300/80" strokeWidth="1.5" />
          <line x1={CAN.x} y1={CAN.y + CAN.h} x2={296} y2={CAN.y + CAN.h} className="stroke-muted-foreground/50" strokeWidth="1.5" />

          {block.levels.map((l, i) => {
            const y = HOLE_Y[i] ?? HOLE_Y[HOLE_Y.length - 1];
            // Deeper hole -> longer jet, always. Derived, never typed per hole.
            const depth = y - SURFACE_Y;
            const jet = depth * JET_SCALE;
            const on = active === l.id;
            const x0 = CAN.x + CAN.w;
            return (
              <g key={l.id} className={on ? "opacity-100" : active ? "opacity-35" : "opacity-85"}>
                {/* the jet arcs downward as it travels */}
                <path
                  d={`M${x0},${y} Q${x0 + jet * 0.6},${y + 4} ${x0 + jet},${y + 30}`}
                  fill="none"
                  className={on ? "stroke-sky-300" : "stroke-sky-300/70"}
                  strokeWidth={on ? 3.2 : 2.2}
                />
                <circle cx={x0} cy={y} r="3" className="fill-sky-200" />
                <text x={x0 + jet + 6} y={y + 34} fontSize="9" fontWeight="bold" className="fill-sky-300">
                  {l.label}
                </text>
              </g>
            );
          })}

          {/* depth arrow down the left, to name what is increasing */}
          <g className="text-amber-300">
            <line x1={CAN.x - 18} y1={SURFACE_Y} x2={CAN.x - 18} y2={CAN.y + CAN.h - 6} stroke="currentColor" strokeWidth="2" />
            <path d="M-4,-5 L0,3 L4,-5 Z" transform={`translate(${CAN.x - 18} ${CAN.y + CAN.h - 6})`} fill="currentColor" />
          </g>
        </svg>
      </div>

      <p className="mt-1 text-center text-[11.5px] italic text-muted-foreground">{block.caption}</p>

      <p
        aria-live="polite"
        className={`mt-2 min-h-[2.75rem] rounded-xl border px-3 py-2 text-[12px] leading-relaxed ${
          level ? "border-primary/25 bg-primary/10 text-foreground" : "border-border bg-secondary/30 text-muted-foreground"
        }`}
      >
        {level ? (
          <>
            <b className="text-primary">{level.label}</b> — {level.note}
          </>
        ) : (
          block.hint || copy.prompt
        )}
      </p>

      <div className="mt-2 flex flex-col gap-1.5">
        {block.applications.map((a) => (
          <div key={a.id} className="rounded-xl border border-border bg-secondary/20 px-3 py-2">
            <p className="text-[12px] leading-relaxed text-foreground">
              <b className="text-primary">{a.label}</b> — {a.note}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
