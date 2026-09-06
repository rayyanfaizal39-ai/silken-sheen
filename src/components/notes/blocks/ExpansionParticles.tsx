import { useState } from "react";
import type { ExpansionParticlesBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";

/**
 * Expansion and contraction across the three states.
 *
 * Particle RADIUS is a single constant shared by every state and temperature —
 * only the spacing between particles changes. That is the whole point: matter
 * expands because its particles move further apart, not because the particles
 * themselves get bigger, and a figure that grew the dots would teach exactly the
 * misconception the standard warns against.
 */

/** One radius for every particle in every state and temperature. Never varies. */
export const PARTICLE_R = 8;

const GRID: Record<string, { cols: number; rows: number }> = {
  solid: { cols: 5, rows: 3 },
  liquid: { cols: 5, rows: 3 },
  gas: { cols: 4, rows: 3 },
};

/** Base spacing per state, then scaled by temperature. */
export const BASE_GAP: Record<string, number> = { solid: 27, liquid: 34, gas: 46 };
/** How much further apart heating pushes the particles. */
export const HEATED_SCALE = 1.28;
/** Clearance between the outermost particles and the container wall. */
const PAD_X = 26;
const PAD_Y = 24;

/**
 * The canvas is sized once, to the largest the chamber ever gets — a heated
 * gas — and every state is then drawn centred inside it.
 *
 * Two things follow, and both are the point of the figure. The chamber
 * visibly grows and shrinks as the learner switches between heated and
 * cooled, because the frame it sits in does not move with it. And the canvas
 * hugs that largest case instead of leaving most of the card empty, so the
 * particles are large enough on a phone to see that they are not changing
 * size — which is the misconception this figure exists to prevent.
 */
const MAX_GAP = Math.max(...Object.values(BASE_GAP)) * HEATED_SCALE;
const VIEW = {
  w: Math.round((3 * MAX_GAP) / 2 + PAD_X + 8) * 2,
  h: Math.round(MAX_GAP + PAD_Y + 8) * 2,
};

export function ExpansionParticles({ block, lang }: { block: ExpansionParticlesBlock; lang?: string }) {
  const [state, setState] = useState<"solid" | "liquid" | "gas">((block.states[0]?.id as "solid") ?? "solid");
  const [heated, setHeated] = useState(true);
  const copy = figureCopy(lang);

  const active = block.states.find((s) => s.id === state) ?? block.states[0];
  const grid = GRID[state] ?? GRID.solid;
  const gap = (BASE_GAP[state] ?? BASE_GAP.solid) * (heated ? HEATED_SCALE : 1);
  const cx = VIEW.w / 2;
  const cy = VIEW.h / 2;

  const particles: { x: number; y: number }[] = [];
  for (let r = 0; r < grid.rows; r++) {
    for (let c = 0; c < grid.cols; c++) {
      particles.push({
        x: cx + (c - (grid.cols - 1) / 2) * gap,
        y: cy + (r - (grid.rows - 1) / 2) * gap,
      });
    }
  }
  // Container grows with the particle spread, so "the object expands" is visible.
  const halfW = ((grid.cols - 1) * gap) / 2 + PAD_X;
  const halfH = ((grid.rows - 1) * gap) / 2 + PAD_Y;

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <div className="mb-2 flex flex-wrap gap-1.5" role="group" aria-label={copy.controlsLabel}>
        {block.states.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={state === s.id}
            onClick={() => setState(s.id as "solid" | "liquid" | "gas")}
            className={conceptButtonClass(state === s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="mb-2 flex flex-wrap gap-1.5" role="group" aria-label={copy.controlsLabel}>
        <button type="button" aria-pressed={heated} onClick={() => setHeated(true)} className={conceptButtonClass(heated)}>
          🔥 {block.heatedLabel}
        </button>
        <button type="button" aria-pressed={!heated} onClick={() => setHeated(false)} className={conceptButtonClass(!heated)}>
          ❄️ {block.cooledLabel}
        </button>
      </div>

      <div>
        <svg
          viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
          className="mx-auto h-auto w-full max-w-[430px]"
          role="img"
          aria-label={`${active?.label ?? block.title} — ${heated ? block.heatedLabel : block.cooledLabel}`}
        >
          <rect
            x={cx - halfW}
            y={cy - halfH}
            width={halfW * 2}
            height={halfH * 2}
            rx="4"
            fill="none"
            className={heated ? "stroke-rose-300" : "stroke-sky-300"}
            strokeWidth="3.2"
          />
          {particles.map((p, i) => (
            <g key={i}>
              {/* motion marks grow with temperature; the particle does not */}
              <line
                x1={p.x - (heated ? 17 : 10)}
                y1={p.y}
                x2={p.x + (heated ? 17 : 10)}
                y2={p.y}
                className={heated ? "stroke-rose-300/60" : "stroke-sky-300/50"}
                strokeWidth="2.6"
              />
              <circle cx={p.x} cy={p.y} r={PARTICLE_R} className={heated ? "fill-rose-300" : "fill-sky-300"} />
            </g>
          ))}
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
        <p className="text-[12px] leading-relaxed text-foreground">{block.misconceptionNote}</p>
      </div>
    </div>
  );
}
