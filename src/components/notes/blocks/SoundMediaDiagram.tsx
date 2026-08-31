import { useState } from "react";
import type { SoundMediaBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";

/**
 * How sound travels through a solid, a liquid and a gas.
 *
 * Both the particle spacing and the speed bar are derived from one field —
 * `speedRank` — so a state can never be drawn with loose particles while being
 * labelled the fastest. The textbook (printed p.227) explains the ordering by
 * particle spacing, so spacing is the thing the figure varies.
 *
 * This figure deliberately says nothing about loudness. The source activity that
 * compares containers of air, water and flour measures *kekuatan bunyi* only and
 * leaves its result blank; speed is taught separately in the prose. Keeping
 * loudness out of this figure is what stops the two from being conflated.
 */

const WIDTH = 320;
const HEIGHT = 150;
const BOX = { x: 18, y: 26, w: 284, h: 74 } as const;
const BAR = { x: 18, y: 118, w: 284, h: 12 } as const;

/** Column gap in px for each rank — rank 1 (fastest) is the tightest lattice. */
const GAP_FOR_RANK: Record<1 | 2 | 3, number> = { 1: 20, 2: 30, 3: 46 };
/** Fraction of the bar filled — rank 1 (fastest) fills the most. */
const SPEED_FOR_RANK: Record<1 | 2 | 3, number> = { 1: 1, 2: 0.62, 3: 0.28 };

const PARTICLE_R = 5;

function lattice(gap: number) {
  const pts: { x: number; y: number }[] = [];
  const cols = Math.floor((BOX.w - gap) / gap);
  const rows = Math.max(2, Math.floor((BOX.h - gap) / gap));
  const usedW = (cols - 1) * gap;
  const usedH = (rows - 1) * gap;
  const startX = BOX.x + (BOX.w - usedW) / 2;
  const startY = BOX.y + (BOX.h - usedH) / 2;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      pts.push({ x: startX + c * gap, y: startY + r * gap });
    }
  }
  return pts;
}

export function SoundMediaDiagram({ block, lang }: { block: SoundMediaBlock; lang?: string }) {
  const [which, setWhich] = useState(block.states[0]?.id ?? "solid");
  const copy = figureCopy(lang);

  const active = block.states.find((s) => s.id === which) ?? block.states[0];
  const gap = GAP_FOR_RANK[active.speedRank];
  const particles = lattice(gap);
  const fill = SPEED_FOR_RANK[active.speedRank];

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <div className="mb-2 flex flex-wrap gap-1.5" role="group" aria-label={copy.controlsLabel}>
        {block.states.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={which === s.id}
            onClick={() => setWhich(s.id)}
            className={conceptButtonClass(which === s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="mx-auto h-auto w-full min-w-[280px] max-w-[420px]"
          role="img"
          aria-label={`${active.label} — ${active.speedLabel}`}
        >
          <text
            x={WIDTH / 2}
            y={16}
            textAnchor="middle"
            className="fill-foreground"
            fontSize="11"
            fontWeight="700"
          >
            {active.label}
          </text>

          <rect
            x={BOX.x}
            y={BOX.y}
            width={BOX.w}
            height={BOX.h}
            rx="8"
            className="fill-primary/5 stroke-primary/35"
            strokeWidth="1.5"
          />

          {particles.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={PARTICLE_R}
              className="fill-primary/70"
            />
          ))}

          {/* Vibration passes along the medium; it is the energy that moves. */}
          <line
            x1={BOX.x + 8}
            y1={BOX.y + BOX.h / 2}
            x2={BOX.x + BOX.w - 12}
            y2={BOX.y + BOX.h / 2}
            className="stroke-accent"
            strokeWidth="2.5"
            strokeDasharray="5 4"
            markerEnd="url(#sm-arrow)"
          />

          <defs>
            <marker id="sm-arrow" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" className="fill-accent" />
            </marker>
          </defs>

          <text x={BAR.x} y={BAR.y - 5} className="fill-muted-foreground" fontSize="9.5">
            {active.speedLabel}
          </text>
          <rect
            x={BAR.x}
            y={BAR.y}
            width={BAR.w}
            height={BAR.h}
            rx="6"
            className="fill-muted/40"
          />
          <rect
            x={BAR.x}
            y={BAR.y}
            width={BAR.w * fill}
            height={BAR.h}
            rx="6"
            className="fill-accent"
          />
        </svg>
      </div>

      <p className="mt-2 text-center text-[12px] italic leading-snug text-muted-foreground">
        {block.caption}
      </p>
      <p className="mt-2 rounded-xl border border-border bg-background/45 p-2.5 text-[13px] leading-relaxed text-foreground/90">
        <b className="font-display">{active.label}</b> — {active.note}
      </p>
      <p className="mt-2 text-[12px] leading-snug text-muted-foreground">{block.hint}</p>
    </div>
  );
}
