import { useState } from "react";
import type { SurfaceComparisonBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";

/**
 * Dark/dull versus white/shiny, for absorption and emission.
 *
 * Absorption and emission are separate views rather than one merged picture,
 * because collapsing them is how "dark absorbs better" quietly becomes the only
 * thing a learner remembers. In both views the dark can is the better performer,
 * and the arrow direction is the only thing that changes: inward for absorbing,
 * outward for emitting.
 */

const CANS = [
  { id: "dark", x: 104, dark: true },
  { id: "shiny", x: 216, dark: false },
] as const;
const CAN = { y: 56, w: 46, h: 62 } as const;

export function SurfaceComparison({ block, lang }: { block: SurfaceComparisonBlock; lang?: string }) {
  const [mode, setMode] = useState<"absorb" | "emit">((block.modes[0]?.id as "absorb") ?? "absorb");
  const copy = figureCopy(lang);
  const active = block.modes.find((m) => m.id === mode) ?? block.modes[0];
  const absorbing = mode === "absorb";

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <div className="mb-2 flex flex-wrap gap-1.5" role="group" aria-label={copy.controlsLabel}>
        {block.modes.map((m) => (
          <button
            key={m.id}
            type="button"
            aria-pressed={mode === m.id}
            onClick={() => setMode(m.id as "absorb" | "emit")}
            className={conceptButtonClass(mode === m.id)}
          >
            {m.label}
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
          {CANS.map((c) => {
            // The dark can always performs better, in whichever direction applies.
            const strong = c.dark;
            const arrowCount = strong ? 3 : 1;
            return (
              <g key={c.id}>
                <rect
                  x={c.x - CAN.w / 2}
                  y={CAN.y}
                  width={CAN.w}
                  height={CAN.h}
                  rx="3"
                  className={c.dark ? "fill-slate-800 stroke-slate-500" : "fill-slate-100 stroke-slate-400"}
                  strokeWidth="2.5"
                />
                {/* thermometer poking out of each can */}
                <line x1={c.x} y1={CAN.y - 18} x2={c.x} y2={CAN.y + 12} className="stroke-muted-foreground" strokeWidth="2.5" />
                <circle cx={c.x} cy={CAN.y - 21} r="4" className={c.dark ? "fill-rose-300" : "fill-sky-300"} />

                {/* energy arrows: inward when absorbing, outward when emitting */}
                {Array.from({ length: arrowCount }, (_, i) => {
                  const y = CAN.y + 16 + i * 16;
                  const outer = c.x - CAN.w / 2 - 30;
                  const inner = c.x - CAN.w / 2 - 4;
                  const from = absorbing ? outer : inner;
                  const to = absorbing ? inner : outer;
                  return (
                    <g key={i} className={strong ? "text-amber-300" : "text-amber-300/45"}>
                      <line x1={from} y1={y} x2={to} y2={y} stroke="currentColor" strokeWidth="2.4" />
                      <path
                        d="M-5,-4 L5,0 L-5,4 Z"
                        transform={`translate(${to} ${y}) rotate(${to > from ? 0 : 180})`}
                        fill="currentColor"
                      />
                    </g>
                  );
                })}

                <text x={c.x} y={CAN.y + CAN.h + 18} textAnchor="middle" fontSize="9.5" fontWeight="bold" className={c.dark ? "fill-slate-300" : "fill-slate-400"}>
                  {c.dark ? block.darkLabel : block.shinyLabel}
                </text>
                <text x={c.x} y={CAN.y + CAN.h + 32} textAnchor="middle" fontSize="9" fontWeight="bold" className={strong ? "fill-emerald-300" : "fill-muted-foreground"}>
                  {strong ? block.betterLabel : block.poorerLabel}
                </text>
              </g>
            );
          })}
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
