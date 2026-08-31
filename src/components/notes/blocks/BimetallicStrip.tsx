import { useState } from "react";
import type { BimetallicStripBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";

/**
 * Bimetallic strip in a fire-alarm circuit.
 *
 * The bend is derived, not drawn by hand: the metal that expands more is laid on
 * the OUTSIDE of the curve, which is the only way a strip can bend. The faster
 * metal is drawn on top and the strip curves downward toward the contact, so the
 * drawing and the physics cannot disagree.
 *
 * The circuit is open at room temperature and closes only when heated — that gap
 * is what makes the alarm meaningful, so both states are drawn.
 */

const PIVOT_X = 60;
const LEN = 150;
const BASE_Y = 62;
/** How far the free end drops when heated. */
const DEFLECT = 34;
const CONTACT = { x: PIVOT_X + LEN + 6, y: BASE_Y + DEFLECT } as const;

export function BimetallicStrip({ block, lang }: { block: BimetallicStripBlock; lang?: string }) {
  const [state, setState] = useState<"room" | "heated">((block.states[0]?.id as "room") ?? "room");
  const copy = figureCopy(lang);
  const active = block.states.find((s) => s.id === state) ?? block.states[0];
  const heated = state === "heated";
  const drop = heated ? DEFLECT : 0;

  /** Quadratic strip path; both metal layers share the same curve. */
  const strip = (offset: number) =>
    `M${PIVOT_X},${BASE_Y + offset} Q${PIVOT_X + LEN * 0.55},${BASE_Y + offset + drop * 0.35} ${PIVOT_X + LEN},${BASE_Y + offset + drop}`;

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <div className="mb-2 flex flex-wrap gap-1.5" role="group" aria-label={copy.controlsLabel}>
        {block.states.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={state === s.id}
            onClick={() => setState(s.id as "room" | "heated")}
            className={conceptButtonClass(state === s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 320 160"
          className="mx-auto h-auto w-full min-w-[290px] max-w-[430px]"
          role="img"
          aria-label={active?.label ?? block.title}
        >
          {/* fixed mounting */}
          <rect x={PIVOT_X - 16} y={BASE_Y - 10} width={14} height={30} className="fill-muted-foreground/40 stroke-muted-foreground" strokeWidth="1.5" />

          {/* the faster-expanding metal sits on the OUTSIDE of the bend (upper layer) */}
          <path d={strip(-4)} fill="none" className="stroke-orange-400" strokeWidth="7" strokeLinecap="round" />
          <path d={strip(3)} fill="none" className="stroke-slate-400" strokeWidth="7" strokeLinecap="round" />

          <text x={PIVOT_X + 28} y={BASE_Y - 16} fontSize="9.5" fontWeight="bold" className="fill-orange-400">
            {block.fasterMetal}
          </text>
          <text x={PIVOT_X + 28} y={BASE_Y + 26} fontSize="9.5" fontWeight="bold" className="fill-slate-400">
            {block.slowerMetal}
          </text>

          {/* contact screw the strip closes onto */}
          <circle cx={CONTACT.x} cy={CONTACT.y} r="5" className={heated ? "fill-emerald-300" : "fill-muted-foreground/60"} />
          <line x1={CONTACT.x} y1={CONTACT.y} x2={CONTACT.x} y2={CONTACT.y + 26} className="stroke-muted-foreground" strokeWidth="2.5" />
          <text x={CONTACT.x + 8} y={CONTACT.y + 4} fontSize="9" fontWeight="bold" className={heated ? "fill-emerald-300" : "fill-muted-foreground"}>
            {block.contactLabel}
          </text>

          {/* circuit: battery and alarm, closed only when the strip touches */}
          <line x1={PIVOT_X - 9} y1={BASE_Y + 20} x2={PIVOT_X - 9} y2={132} className="stroke-muted-foreground" strokeWidth="2" />
          <line x1={PIVOT_X - 9} y1={132} x2={CONTACT.x} y2={132} className="stroke-muted-foreground" strokeWidth="2" />
          <line x1={CONTACT.x} y1={132} x2={CONTACT.x} y2={CONTACT.y + 26} className="stroke-muted-foreground" strokeWidth="2" />
          <circle cx={162} cy={132} r="13" fill="none" className={heated ? "stroke-emerald-300" : "stroke-muted-foreground"} strokeWidth={heated ? 3 : 2} />
          <text x={162} y={152} textAnchor="middle" fontSize="9" fontWeight="bold" className={heated ? "fill-emerald-300" : "fill-muted-foreground"}>
            {block.alarmLabel}
          </text>

          {/* flame only in the heated state */}
          {heated && (
            <g className="stroke-rose-300" strokeWidth="2.4">
              {[0, 1, 2].map((i) => (
                <path key={i} d={`M${150 + i * 9},${BASE_Y + 62} q4,-9 0,-15`} fill="none" />
              ))}
            </g>
          )}
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
