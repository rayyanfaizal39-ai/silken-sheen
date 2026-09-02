import { useState } from "react";
import type { MeteoroidEntryBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";

/**
 * Rajah 13.2 — what a meteoroid is called at each point of its journey.
 *
 * The source draws one scene: space above, Earth's atmosphere as a band, the
 * ground below, and four labelled stages across it. The naming is positional —
 * the same lump of rock changes name by *where it is*, not by what it is made
 * of — so the figure has to keep the altitude bands visible rather than reduce
 * the sequence to a list of words.
 *
 * Stage 3 is "pancuran meteor", the textbook's term. It is a stage of the same
 * diagram, not a separate topic, so it stays on this scene.
 *
 * Geometry is fixed; the viewBox is pixel-space so the atmosphere band keeps a
 * constant thickness and the entry streaks keep their angle.
 */

const VIEW_W = 320;
const VIEW_H = 200;
const SPACE_BOTTOM = 74;
const GROUND_TOP = 164;

/** x positions of the four stages, left to right, as the source lays them out. */
const STAGE_X = [40, 130, 210, 280];

export function MeteoroidEntryFigure({ block, lang }: { block: MeteoroidEntryBlock; lang?: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const copy = figureCopy(lang);
  const active = block.stages[activeIndex] ?? block.stages[0];

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <div className="mb-3 flex flex-wrap gap-1.5" role="group" aria-label={copy.controlsLabel}>
        {block.stages.map((stage, i) => (
          <button
            key={stage.id}
            type="button"
            aria-pressed={i === activeIndex}
            onClick={() => setActiveIndex(i)}
            className={conceptButtonClass(i === activeIndex)}
          >
            {i + 1}. {stage.label}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="h-auto w-full min-w-[280px]"
          role="img"
          aria-label={block.figureLabel}
        >
          <defs>
            <linearGradient id="c13-space" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.16" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="c13-atmos" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.06" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.24" />
            </linearGradient>
          </defs>

          {/* altitude bands: space, atmosphere, ground */}
          <rect x="0" y="0" width={VIEW_W} height={SPACE_BOTTOM} fill="url(#c13-space)" className="text-primary" />
          <rect
            x="0"
            y={SPACE_BOTTOM}
            width={VIEW_W}
            height={GROUND_TOP - SPACE_BOTTOM}
            fill="url(#c13-atmos)"
            className="text-sky-500"
          />
          <rect
            x="0"
            y={GROUND_TOP}
            width={VIEW_W}
            height={VIEW_H - GROUND_TOP}
            className="fill-emerald-600/30"
          />
          <line
            x1="0"
            y1={SPACE_BOTTOM}
            x2={VIEW_W}
            y2={SPACE_BOTTOM}
            className="stroke-sky-500/50"
            strokeWidth="1"
            strokeDasharray="4 3"
          />
          <line x1="0" y1={GROUND_TOP} x2={VIEW_W} y2={GROUND_TOP} className="stroke-emerald-700/60" strokeWidth="1.5" />

          <text x="6" y="14" className="fill-current text-[8px] font-semibold text-muted-foreground">
            {block.spaceLabel}
          </text>
          <text x="6" y={SPACE_BOTTOM + 13} className="fill-current text-[8px] font-semibold text-muted-foreground">
            {block.atmosphereLabel}
          </text>
          <text x="6" y={VIEW_H - 8} className="fill-current text-[8px] font-semibold text-muted-foreground">
            {block.groundLabel}
          </text>

          {/* 1 — meteoroid drifting in space, no orbit drawn: it moves freely */}
          <g opacity={activeIndex === 0 ? 1 : 0.35}>
            <circle cx={STAGE_X[0]} cy="38" r="7" className="fill-stone-400" />
            <circle cx={STAGE_X[0] - 2} cy="35" r="2" className="fill-stone-600/70" />
            <circle cx={STAGE_X[0] + 3} cy="41" r="1.5" className="fill-stone-600/70" />
          </g>

          {/* 2 — a single meteor: one streak burning inside the atmosphere */}
          <g opacity={activeIndex === 1 ? 1 : 0.35}>
            <line
              x1={STAGE_X[1] - 16}
              y1={SPACE_BOTTOM + 6}
              x2={STAGE_X[1] + 10}
              y2={SPACE_BOTTOM + 52}
              className="stroke-orange-400"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <circle cx={STAGE_X[1] + 10} cy={SPACE_BOTTOM + 52} r="4" className="fill-orange-500" />
          </g>

          {/* 3 — pancuran meteor: many meteors at once, the source's stage 3 */}
          <g opacity={activeIndex === 2 ? 1 : 0.35}>
            {[-18, -6, 6, 18].map((dx, i) => (
              <line
                key={dx}
                x1={STAGE_X[2] + dx - 10}
                y1={SPACE_BOTTOM + 4 + i * 3}
                x2={STAGE_X[2] + dx + 6}
                y2={SPACE_BOTTOM + 34 + i * 3}
                className="stroke-amber-400"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            ))}
          </g>

          {/* 4 — meteorite: the fragment that reached the ground, plus its crater */}
          <g opacity={activeIndex === 3 ? 1 : 0.35}>
            <line
              x1={STAGE_X[3] - 14}
              y1={SPACE_BOTTOM + 8}
              x2={STAGE_X[3] - 2}
              y2={GROUND_TOP - 14}
              className="stroke-orange-400/70"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="5 4"
            />
            <path
              d={`M ${STAGE_X[3] - 20} ${GROUND_TOP} q 18 -13 36 0`}
              className="fill-none stroke-stone-500"
              strokeWidth="2"
            />
            <circle cx={STAGE_X[3] - 2} cy={GROUND_TOP - 4} r="5.5" className="fill-stone-600" />
          </g>

          {/* stage names, on the scene where the source puts them */}
          {block.stages.map((stage, i) => (
            <text
              key={stage.id}
              x={STAGE_X[i]}
              y={i === 3 ? VIEW_H - 22 : 62 + i * 4}
              textAnchor="middle"
              className={
                i === activeIndex
                  ? "fill-current text-[8.5px] font-bold text-foreground"
                  : "fill-current text-[8.5px] font-semibold text-muted-foreground"
              }
            >
              {stage.label.toUpperCase()}
            </text>
          ))}
        </svg>
      </div>

      {active && (
        <div className="mt-3 rounded-xl border border-primary/20 bg-background/70 p-3">
          <p className="font-display text-[13px] font-bold text-foreground">
            {activeIndex + 1}. {active.label}
          </p>
          <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{active.body}</p>
        </div>
      )}
    </div>
  );
}
