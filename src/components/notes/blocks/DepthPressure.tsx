import { useState } from "react";
import type { DepthPressureBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";
import { Chapter8PhotoFigure } from "@/components/notes/chapter8/Chapter8PhotoFigure";

/**
 * Liquid pressure against depth, shown as jets from holes down one side of a can.
 *
 * Jet length is computed from each hole's depth rather than typed per hole, so a
 * deeper hole can never be drawn with a shorter jet than a shallower one -- which
 * is the one way this figure could teach the relationship backwards.
 */

/** Measured on 16_liquid_pressure_tank: water surface and the three outlets. */
const SURFACE_Y = 195;
const OUTLET_X = 832;
const OUTLETS = [{ y: 288 }, { y: 481 }, { y: 678 }] as const;
/** Horizontal reach per sqrt(depth); the jets are compared over equal time. */
const REACH_SCALE = 35;
/** Every jet falls the same amount, so reach alone carries the speed difference. */
const JET_DROP = 150;

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

      <Chapter8PhotoFigure
        image="liquidPressure"
        alt={
          lang === "bm"
            ? "Sebuah tangki air dengan tiga lubang pada dinding sisinya."
            : "A water tank with three outlets down one side wall."
        }
        space="pixel"
        priority
      >
        {/* The raster supplies the tank, water and outlets. The jets are drawn
            here so the comparison stays deterministic and correctly ordered. */}
        {block.levels.map((l, i) => {
          const outlet = OUTLETS[i] ?? OUTLETS[OUTLETS.length - 1];
          const depth = outlet.y - SURFACE_Y;
          // Exit speed grows with depth, so reach does too: shallow < middle < deep.
          const reach = Math.sqrt(depth) * REACH_SCALE;
          const on = active === l.id;
          return (
            <g key={l.id} data-jet={l.id} className={on ? "opacity-100" : active ? "opacity-30" : "opacity-85"}>
              <path
                d={`M${OUTLET_X},${outlet.y} Q${OUTLET_X + reach / 2},${outlet.y} ${OUTLET_X + reach},${outlet.y + JET_DROP}`}
                fill="none"
                className={on ? "stroke-sky-200" : "stroke-sky-300/80"}
                strokeWidth={on ? 16 : 11}
                strokeLinecap="round"
              />
              <circle cx={OUTLET_X} cy={outlet.y} r="12" className="fill-sky-100" />
              <text
                x={OUTLET_X + 46}
                y={outlet.y - 28}
                fontSize="38"
                fontWeight="bold"
                className={on ? "fill-sky-100" : "fill-sky-300"}
                stroke="rgba(2,8,23,0.75)"
                strokeWidth="7"
                paintOrder="stroke"
              >
                {l.label}
              </text>
            </g>
          );
        })}
      </Chapter8PhotoFigure>

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
