import { useState } from "react";
import type { StellarLifecycleBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";

/**
 * The life cycle of a star, drawn as three diverging pathways.
 *
 * This replaces a linear stepper that walked every star down one route and
 * bundled all three outcomes into a single final card. The source figure
 * (Rajah 11.1, printed p.242) forks at the star's size and the branches never
 * rejoin, so the geometry here is built from the branch list: each branch gets
 * its own column, its own chain of stages, and its own terminal outcome.
 *
 * Two consequences are deliberate. A branch can never borrow another's endpoint,
 * because each column's last stage is simply the last entry of its own `stages`
 * array. And no arrow ever crosses between columns, because every arrow is drawn
 * from one stage to the next *within* a column — the only shared node is the
 * nebula every branch starts from.
 */

const WIDTH = 340;
const COL_X = [62, 170, 278] as const;
const ORIGIN_Y = 30;
const FIRST_Y = 96;
const STEP_Y = 46;
const BOX_W = 96;
const BOX_H = 30;
/**
 * The horizontal rail the three forks hang from. It must sit strictly between
 * the bottom of the origin box and the top of the first stage box, or the final
 * leg of each fork runs upward and `orient="auto"` flips the arrowhead to point
 * back at the nebula — which would read as the branches feeding INTO it.
 */
const FORK_RAIL_Y = ORIGIN_Y + BOX_H / 2 + 12;
const ARROW_GAP = 5;

export function StellarLifecycle({
  block,
  lang,
}: {
  block: StellarLifecycleBlock;
  lang?: string;
}) {
  const [active, setActive] = useState<string | null>(null);
  const copy = figureCopy(lang);

  const longest = Math.max(...block.branches.map((b) => b.stages.length));
  const height = FIRST_Y + longest * STEP_Y + 26;
  const selected = block.branches.find((b) => b.id === active) ?? null;

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <div className="mb-2 flex flex-wrap gap-1.5" role="group" aria-label={copy.controlsLabel}>
        {block.branches.map((b) => (
          <button
            key={b.id}
            type="button"
            aria-pressed={active === b.id}
            onClick={() => setActive(active === b.id ? null : b.id)}
            className={conceptButtonClass(active === b.id)}
          >
            {b.label}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${WIDTH} ${height}`}
          className="mx-auto h-auto w-full min-w-[320px] max-w-[460px]"
          role="img"
          aria-label={block.branches
            .map((b) => `${b.label}: ${[block.originLabel, ...b.stages].join(" → ")}`)
            .join("; ")}
        >
          <defs>
            <marker id="sl-arrow" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" className="fill-primary" />
            </marker>
            <marker id="sl-arrow-on" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" className="fill-accent" />
            </marker>
          </defs>

          {/* The one node every branch grows from. */}
          <rect
            x={WIDTH / 2 - BOX_W / 2}
            y={ORIGIN_Y - BOX_H / 2}
            width={BOX_W}
            height={BOX_H}
            rx="8"
            className="fill-accent/25 stroke-accent"
            strokeWidth="1.6"
          />
          <text
            x={WIDTH / 2}
            y={ORIGIN_Y + 4}
            textAnchor="middle"
            className="fill-foreground"
            fontSize="11"
            fontWeight="700"
          >
            {block.originLabel}
          </text>

          {block.branches.map((branch, bi) => {
            const x = COL_X[bi] ?? COL_X[COL_X.length - 1];
            const on = active === branch.id;
            const dim = active !== null && !on;
            const marker = on ? "url(#sl-arrow-on)" : "url(#sl-arrow)";
            const stroke = on ? "stroke-accent" : "stroke-primary/70";

            return (
              <g key={branch.id} opacity={dim ? 0.32 : 1}>
                {/* Fork from the shared origin down into this column. */}
                <path
                  d={`M ${WIDTH / 2} ${ORIGIN_Y + BOX_H / 2} V ${FORK_RAIL_Y} H ${x} V ${FIRST_Y - BOX_H / 2 - ARROW_GAP}`}
                  className={`fill-none ${stroke}`}
                  strokeWidth={on ? 2.4 : 1.8}
                  markerEnd={marker}
                />

                {branch.stages.map((stage, si) => {
                  const y = FIRST_Y + si * STEP_Y;
                  const last = si === branch.stages.length - 1;
                  return (
                    <g key={stage}>
                      {si > 0 && (
                        <line
                          x1={x}
                          y1={y - STEP_Y + BOX_H / 2}
                          x2={x}
                          y2={y - BOX_H / 2 - ARROW_GAP}
                          className={stroke}
                          strokeWidth={on ? 2.4 : 1.8}
                          markerEnd={marker}
                        />
                      )}
                      <rect
                        x={x - BOX_W / 2}
                        y={y - BOX_H / 2}
                        width={BOX_W}
                        height={BOX_H}
                        rx="7"
                        className={
                          last
                            ? on
                              ? "fill-accent/35 stroke-accent"
                              : "fill-primary/25 stroke-primary"
                            : on
                              ? "fill-accent/15 stroke-accent/70"
                              : "fill-primary/5 stroke-primary/45"
                        }
                        strokeWidth={last ? 1.8 : 1.3}
                      />
                      <text
                        x={x}
                        y={y + 3.5}
                        textAnchor="middle"
                        className="fill-foreground"
                        fontSize="9"
                        fontWeight={last ? 700 : 500}
                      >
                        {stage.length > 15 ? stage.slice(0, 14) + "…" : stage}
                      </text>
                      {last && (
                        <title>{`${branch.label} → ${stage}`}</title>
                      )}
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>

      <p className="mt-2 text-center text-[12px] italic leading-snug text-muted-foreground">
        {block.caption}
      </p>

      {/* Full stage names, so nothing depends on the truncated SVG labels. */}
      <ul className="mt-2.5 space-y-1.5">
        {block.branches.map((b) => (
          <li
            key={b.id}
            className={`rounded-xl border p-2.5 text-[12.5px] leading-relaxed ${
              active === b.id
                ? "border-accent/60 bg-accent/10 text-foreground"
                : "border-border bg-background/45 text-foreground/85"
            }`}
          >
            <b className="font-display">{b.label}</b>
            <span className="text-muted-foreground"> — </span>
            {[block.originLabel, ...b.stages].join(" → ")}
            {active === b.id && <span className="mt-1 block text-muted-foreground">{b.note}</span>}
          </li>
        ))}
      </ul>

      <p className="mt-2 text-[12px] leading-snug text-muted-foreground">{block.hint}</p>
    </div>
  );
}
