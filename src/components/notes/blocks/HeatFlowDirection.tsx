import { useState } from "react";
import type { HeatFlowDirectionBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";

/**
 * Which way heat flows, and what happens when it stops flowing.
 *
 * Deliberately deterministic SVG rather than artwork: the whole content of this
 * figure is two boxes, a temperature each, and an arrow between them. A
 * photograph would add nothing and could not be corrected or translated. The
 * temperatures are drawn from the block's own data, so the picture can never
 * disagree with the sentence underneath it.
 *
 * One block serves two places in the chapter. At the head of 9.2 it carries a
 * single stage — heat flows from hot to cold — because that direction has to be
 * established before any mechanism is named. In the thermal-equilibrium section
 * it carries two, so the learner sees the same pair of objects reach equal
 * temperatures and the net flow stop.
 */

/** Drawn in the SVG's own 0-100 x 0-56 space, which the frame scales uniformly. */
const BOX = { w: 26, h: 26, y: 15 } as const;
const LEFT_X = 6;
const RIGHT_X = 68;

export function HeatFlowDirection({
  block,
  lang,
}: {
  block: HeatFlowDirectionBlock;
  lang?: string;
}) {
  const [active, setActive] = useState(block.stages[0]?.id ?? "");
  const copy = figureCopy(lang);
  const stage = block.stages.find((s) => s.id === active) ?? block.stages[0];
  if (!stage) return null;

  const settled = stage.id === "equilibrium";

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      {/* Only offered when there is more than one stage: a single-stage figure
          is a statement, not a choice, and a lone button would imply otherwise. */}
      {block.stages.length > 1 && (
        <div className="mb-2.5 flex flex-wrap gap-1.5" role="group" aria-label={copy.controlsLabel}>
          {block.stages.map((s) => (
            <button
              key={s.id}
              type="button"
              data-ch9-flow-control={s.id}
              aria-pressed={s.id === active}
              onClick={() => setActive(s.id)}
              className={conceptButtonClass(s.id === active)}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}

      <svg
        viewBox="0 0 100 56"
        className="mx-auto h-auto w-full max-w-[440px]"
        role="img"
        aria-label={stage.label}
        data-ch9-flow-stage={stage.id}
      >
        {/* the two objects, warm on the left and cool on the right */}
        {(
          [
            [LEFT_X, stage.leftLabel, stage.leftTemperature, true],
            [RIGHT_X, stage.rightLabel, stage.rightTemperature, settled],
          ] as const
        ).map(([x, label, temperature, warm], index) => (
          <g key={index}>
            <rect
              x={x}
              y={BOX.y}
              width={BOX.w}
              height={BOX.h}
              rx={3}
              className={
                warm ? "fill-rose-500/20 stroke-rose-300" : "fill-sky-500/20 stroke-sky-300"
              }
              strokeWidth={1}
            />
            <text
              x={x + BOX.w / 2}
              y={BOX.y + 11}
              textAnchor="middle"
              fontSize="6"
              fontWeight="bold"
              className={warm ? "fill-rose-200" : "fill-sky-200"}
            >
              {label}
            </text>
            <text
              x={x + BOX.w / 2}
              y={BOX.y + 20}
              textAnchor="middle"
              fontSize="7.5"
              fontWeight="bold"
              className="fill-foreground"
            >
              {temperature}
            </text>
          </g>
        ))}

        <defs>
          <marker
            id="ch9-flow-head"
            markerWidth="5"
            markerHeight="5"
            refX="4"
            refY="2.5"
            orient="auto"
          >
            <path d="M0,0 L5,2.5 L0,5 Z" className="fill-amber-300" />
          </marker>
        </defs>

        {settled ? (
          /* Equal temperatures: no net transfer of heat either way. A pair of
             opposing arrows would still read as "heat is moving", which is the
             misconception — so equilibrium gets a plain dashed connector and
             the label, nothing directional. */
          <g data-ch9-flow="none">
            <line
              x1={LEFT_X + BOX.w + 4}
              y1={BOX.y + BOX.h / 2}
              x2={RIGHT_X - 4}
              y2={BOX.y + BOX.h / 2}
              className="stroke-sky-300"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeDasharray="2.4 2.4"
            />
            <text
              x={50}
              y={BOX.y - 3}
              textAnchor="middle"
              fontSize="5.6"
              fontWeight="bold"
              className="fill-sky-200"
            >
              {block.noNetFlowLabel}
            </text>
          </g>
        ) : (
          /* One arrow, hot to cold — the direction the whole chapter rests on. */
          <g data-ch9-flow="hot-to-cold">
            <line
              x1={LEFT_X + BOX.w + 4}
              y1={BOX.y + BOX.h / 2}
              x2={RIGHT_X - 4}
              y2={BOX.y + BOX.h / 2}
              className="stroke-amber-300"
              strokeWidth="1.6"
              strokeLinecap="round"
              markerEnd="url(#ch9-flow-head)"
            />
            <text
              x={50}
              y={BOX.y - 3}
              textAnchor="middle"
              fontSize="5.6"
              fontWeight="bold"
              className="fill-amber-200"
            >
              {block.heatLabel}
            </text>
          </g>
        )}
      </svg>

      {block.caption && (
        <p className="mt-1 text-center text-[11.5px] italic text-muted-foreground">
          {block.caption}
        </p>
      )}

      <p
        aria-live="polite"
        className="mt-2 min-h-[2.75rem] rounded-xl border border-primary/25 bg-primary/10 px-3 py-2 text-[12px] leading-relaxed text-foreground"
      >
        <b className="text-primary">{stage.label}</b> — {stage.note}
      </p>
    </div>
  );
}
