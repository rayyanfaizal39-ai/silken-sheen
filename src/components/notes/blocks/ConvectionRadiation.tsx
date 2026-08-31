import { useState } from "react";
import type { ConvectionRadiationBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";

/**
 * The two transfer modes that do not need a solid.
 *
 * Convection is drawn as a closed loop with the warm side rising and the cool
 * side sinking, labelled by density — the loop is what makes it a current, so it
 * is drawn as one continuous path rather than two unrelated arrows.
 *
 * Radiation deliberately draws NO particles between source and receiver. The
 * whole point is that nothing needs to be there, so putting a medium in the
 * picture would contradict the caption.
 */

type ModeId = "convection" | "radiation";

export function ConvectionRadiation({ block, lang }: { block: ConvectionRadiationBlock; lang?: string }) {
  const [mode, setMode] = useState<ModeId>((block.modes[0]?.id as ModeId) ?? "convection");
  const copy = figureCopy(lang);
  const active = block.modes.find((m) => m.id === mode) ?? block.modes[0];

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <div className="mb-2 flex flex-wrap gap-1.5" role="group" aria-label={copy.controlsLabel}>
        {block.modes.map((m) => (
          <button
            key={m.id}
            type="button"
            aria-pressed={mode === m.id}
            onClick={() => setMode(m.id as ModeId)}
            className={conceptButtonClass(mode === m.id)}
          >
            {m.label}
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
          {mode === "convection" ? (
            <>
              {/* beaker of fluid */}
              <path d="M64,24 L64,134 L256,134 L256,24" fill="none" className="stroke-border" strokeWidth="2.5" />
              <rect x={65} y={40} width={190} height={93} className="fill-sky-400/15" />

              {/* flame under the left side -- that is the side that rises */}
              <g className="stroke-rose-300" strokeWidth="2.4">
                {[0, 1, 2].map((i) => (
                  <path key={i} d={`M${92 + i * 9},${152} q4,-9 0,-15`} fill="none" />
                ))}
              </g>

              {/* one continuous circulation loop: up the warm side, down the cool side */}
              <path
                d="M104,124 C104,84 104,64 120,52 C150,32 190,40 208,60 C224,78 224,104 208,122 C188,140 130,142 104,124"
                fill="none"
                className="stroke-emerald-300"
                strokeWidth="2.6"
              />
              {/* rising arrow on the warm (left) side */}
              <path d="M-5,-4 L5,0 L-5,4 Z" transform="translate(104 74) rotate(-90)" className="fill-emerald-300" />
              {/* sinking arrow on the cool (right) side */}
              <path d="M-5,-4 L5,0 L-5,4 Z" transform="translate(219 96) rotate(90)" className="fill-emerald-300" />

              <text x={96} y={36} textAnchor="middle" fontSize="9.5" fontWeight="bold" className="fill-rose-300">
                {block.warmLabel}
              </text>
              <text x={232} y={36} textAnchor="middle" fontSize="9.5" fontWeight="bold" className="fill-sky-300">
                {block.coolLabel}
              </text>
            </>
          ) : (
            <>
              {/* source on the left, receiver on the right, nothing in between */}
              <circle cx={72} cy={78} r="22" className="fill-rose-300/30 stroke-rose-300" strokeWidth="2.5" />
              <g className="stroke-rose-300" strokeWidth="2">
                {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
                  <line
                    key={a}
                    x1={72 + 26 * Math.cos((a * Math.PI) / 180)}
                    y1={78 + 26 * Math.sin((a * Math.PI) / 180)}
                    x2={72 + 33 * Math.cos((a * Math.PI) / 180)}
                    y2={78 + 33 * Math.sin((a * Math.PI) / 180)}
                  />
                ))}
              </g>
              {/* the empty space is labelled, and stays empty */}
              <rect x={116} y={40} width={112} height={76} fill="none" className="stroke-border/60" strokeWidth="1.5" strokeDasharray="5 4" />
              <text x={172} y={34} textAnchor="middle" fontSize="9.5" className="fill-muted-foreground">
                {block.coolLabel}
              </text>
              {/* radiation as waves, not particles */}
              {[62, 78, 94].map((y) => (
                <g key={y}>
                  <path
                    d={`M120,${y} q9,-7 18,0 t18,0 t18,0 t18,0 t18,0`}
                    fill="none"
                    className="stroke-amber-300"
                    strokeWidth="2"
                  />
                  <path d="M-5,-4 L5,0 L-5,4 Z" transform={`translate(230 ${y})`} className="fill-amber-300" />
                </g>
              ))}
              <rect x={238} y={52} width={34} height={52} rx="3" className="fill-primary/20 stroke-primary/70" strokeWidth="2.5" />
            </>
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

      {active?.detail && (
        <div className="mt-2 rounded-xl border border-border bg-secondary/25 px-3 py-2">
          <p className="text-[12px] leading-relaxed text-foreground">{active.detail}</p>
        </div>
      )}
    </div>
  );
}
