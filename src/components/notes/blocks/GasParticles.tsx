import { useState } from "react";
import type { GasParticlesBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";

/**
 * Gas pressure from the kinetic model.
 *
 * The particle count is fixed by the block data and every view renders exactly
 * that many particles. Changing how many dots are drawn when only the volume or
 * the temperature changes would teach that compressing a gas creates particles,
 * so the count is deliberately not a per-view value.
 *
 * Compressing moves the container wall in; heating leaves the box alone and
 * lengthens the motion streaks instead. Neither view adds or removes a particle.
 */

type StateId = "normal" | "compressed" | "heated";

const BOX = { x: 60, y: 30, w: 200, h: 110 } as const;
/** How far the right wall moves in when compressed. */
const COMPRESSED_W = 120;

/** Deterministic pseudo-random layout so the figure is stable between renders. */
function particlePositions(count: number, width: number) {
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i < count; i++) {
    // Cheap hash -> two independent fractions in [0,1).
    const a = ((i * 9301 + 49297) % 233280) / 233280;
    const b = ((i * 4517 + 12345) % 199017) / 199017;
    pts.push({
      x: BOX.x + 12 + a * (width - 24),
      y: BOX.y + 12 + b * (BOX.h - 24),
    });
  }
  return pts;
}

export function GasParticles({ block, lang }: { block: GasParticlesBlock; lang?: string }) {
  const [view, setView] = useState<StateId>((block.states[0]?.id as StateId) ?? "normal");
  const copy = figureCopy(lang);

  const state = block.states.find((s) => s.id === view) ?? block.states[0];
  const compressed = view === "compressed";
  const heated = view === "heated";
  const width = compressed ? COMPRESSED_W : BOX.w;
  const particles = particlePositions(block.particleCount, width);
  /** Longer streaks mean faster particles; only temperature changes this. */
  const streak = heated ? 9 : 4;

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <div className="mb-2 flex flex-wrap gap-1.5" role="group" aria-label={copy.controlsLabel}>
        {block.states.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={view === s.id}
            onClick={() => setView(s.id as StateId)}
            className={conceptButtonClass(view === s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 320 170"
          className="mx-auto h-auto w-full min-w-[290px] max-w-[430px]"
          role="img"
          aria-label={state?.label ?? block.title}
        >
          {/* container: the right wall is the only thing that moves */}
          <rect
            x={BOX.x}
            y={BOX.y}
            width={width}
            height={BOX.h}
            className={heated ? "fill-rose-400/10 stroke-rose-300/70" : "fill-primary/5 stroke-primary/60"}
            strokeWidth="2.5"
          />

          {/* piston arrow, only when compressing */}
          {compressed && (
            <g className="text-amber-300">
              <line x1={BOX.x + BOX.w + 12} y1={BOX.y + BOX.h / 2} x2={BOX.x + width + 8} y2={BOX.y + BOX.h / 2} stroke="currentColor" strokeWidth="3" />
              <path d="M5,-5 L-3,0 L5,5 Z" transform={`translate(${BOX.x + width + 8} ${BOX.y + BOX.h / 2})`} fill="currentColor" />
            </g>
          )}

          {/* heat marks, only when heating */}
          {heated && (
            <g className="stroke-rose-300" strokeWidth="2">
              {[100, 140, 180, 220].map((x) => (
                <path key={x} d={`M${x},152 q6,-8 0,-16 q-6,-8 0,-16`} fill="none" />
              ))}
            </g>
          )}

          {/* the particles -- same number in every view */}
          {particles.map((p, i) => (
            <g key={i}>
              <line
                x1={p.x}
                y1={p.y}
                x2={p.x + (i % 2 === 0 ? streak : -streak)}
                y2={p.y + (i % 3 === 0 ? streak : -streak) / 2}
                className={heated ? "stroke-rose-300/70" : "stroke-sky-300/60"}
                strokeWidth="1.4"
              />
              <circle cx={p.x} cy={p.y} r="3.2" className={heated ? "fill-rose-300" : "fill-sky-300"} />
            </g>
          ))}
        </svg>
      </div>

      <p className="mt-1 text-center text-[11.5px] italic text-muted-foreground">{block.caption}</p>

      <p
        aria-live="polite"
        className="mt-2 min-h-[2.75rem] rounded-xl border border-primary/25 bg-primary/10 px-3 py-2 text-[12px] leading-relaxed text-foreground"
      >
        {state ? (
          <>
            <b className="text-primary">{state.label}</b> — {state.note}
          </>
        ) : (
          block.hint || copy.prompt
        )}
      </p>
    </div>
  );
}
