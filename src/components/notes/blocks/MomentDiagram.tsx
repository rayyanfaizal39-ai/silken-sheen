import { useState } from "react";
import type { MomentDiagramBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";

/**
 * Moment of a force, drawn so the distance being measured is unmistakably the
 * perpendicular one.
 *
 * The third view exists because it is the case learners get wrong: when the
 * force is applied at an angle, the handle length is NOT the distance that goes
 * into the formula -- the perpendicular distance is shorter. Drawing the two
 * lengths side by side is the only way to make that visible.
 */

const PIVOT_X = 72;
const PIVOT_Y = 104;
/** Handle runs to the right from the pivot. */
const HANDLE_LEN = 150;

type ViewId = "door" | "spanner" | "angled";

export function MomentDiagram({ block, lang }: { block: MomentDiagramBlock; lang?: string }) {
  const [view, setView] = useState<ViewId>((block.situations[0]?.id as ViewId) ?? "door");
  const copy = figureCopy(lang);

  const situation = block.situations.find((s) => s.id === view) ?? block.situations[0];
  const angled = view === "angled";
  /** For the angled case the force acts at 45 deg, so the perpendicular distance shrinks. */
  const perpLen = angled ? HANDLE_LEN * Math.cos(Math.PI / 4) : HANDLE_LEN;
  const forceX = PIVOT_X + HANDLE_LEN;

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <div className="mb-2 flex flex-wrap gap-1.5" role="group" aria-label={copy.controlsLabel}>
        {block.situations.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={view === s.id}
            onClick={() => setView(s.id as ViewId)}
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
          aria-label={situation?.label ?? block.title}
        >
          {view === "door" ? (
            /* door seen from above: hinge at the pivot, door slab along the handle line */
            <rect x={PIVOT_X} y={PIVOT_Y - 12} width={HANDLE_LEN} height={24} className="fill-primary/15 stroke-primary/60" strokeWidth="2" />
          ) : (
            /* spanner shaft with a nut at the pivot */
            <>
              <line x1={PIVOT_X} y1={PIVOT_Y} x2={forceX} y2={PIVOT_Y} className="stroke-primary/70" strokeWidth="7" />
              <circle cx={PIVOT_X} cy={PIVOT_Y} r="16" fill="none" className="stroke-primary/70" strokeWidth="4" />
            </>
          )}

          {/* the pivot itself */}
          <circle cx={PIVOT_X} cy={PIVOT_Y} r="5" className="fill-amber-300" />
          <text x={PIVOT_X} y={PIVOT_Y + 34} textAnchor="middle" fontSize="10" fontWeight="bold" className="fill-amber-300">
            {block.pivotLabel}
          </text>

          {/* applied force: straight down, or at 45 deg in the angled case */}
          <g transform={`translate(${forceX} ${PIVOT_Y}) rotate(${angled ? 45 : 90})`}>
            <line x1={0} y1={0} x2={52} y2={0} className="stroke-emerald-300" strokeWidth="3" />
            <path d="M-5,-4 L5,0 L-5,4 Z" transform="translate(52 0)" className="fill-emerald-300" />
          </g>
          <text x={forceX + 12} y={PIVOT_Y + 44} fontSize="10" fontWeight="bold" className="fill-emerald-300">
            {block.forceLabel}
          </text>

          {/* the perpendicular distance actually used in the formula */}
          <line
            x1={PIVOT_X}
            y1={PIVOT_Y - 44}
            x2={PIVOT_X + perpLen}
            y2={PIVOT_Y - 44}
            className="stroke-sky-300"
            strokeWidth="2"
            strokeDasharray="5 3"
          />
          <line x1={PIVOT_X} y1={PIVOT_Y - 50} x2={PIVOT_X} y2={PIVOT_Y - 38} className="stroke-sky-300" strokeWidth="2" />
          <line
            x1={PIVOT_X + perpLen}
            y1={PIVOT_Y - 50}
            x2={PIVOT_X + perpLen}
            y2={PIVOT_Y - 38}
            className="stroke-sky-300"
            strokeWidth="2"
          />
          <text x={PIVOT_X + perpLen / 2} y={PIVOT_Y - 52} textAnchor="middle" fontSize="10" fontWeight="bold" className="fill-sky-300">
            {block.distanceLabel}
          </text>

          {/* in the angled case, show the handle length separately so the two differ visibly */}
          {angled && (
            <>
              <line
                x1={PIVOT_X}
                y1={PIVOT_Y + 52}
                x2={forceX}
                y2={PIVOT_Y + 52}
                className="stroke-muted-foreground/60"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              <text x={PIVOT_X + HANDLE_LEN / 2} y={PIVOT_Y + 66} textAnchor="middle" fontSize="9" className="fill-muted-foreground">
                {block.perpendicularNote.split(/[.—-]/)[0].trim()}
              </text>
            </>
          )}
        </svg>
      </div>

      <div className="mt-1 rounded-xl border border-primary/25 bg-secondary/30 px-3 py-2">
        <p className="font-display text-center text-[13px] font-bold text-primary">{block.formula}</p>
      </div>
      <p className="mt-1 text-center text-[11.5px] italic text-muted-foreground">{block.caption}</p>

      <p
        aria-live="polite"
        className="mt-2 min-h-[2.75rem] rounded-xl border border-primary/25 bg-primary/10 px-3 py-2 text-[12px] leading-relaxed text-foreground"
      >
        {situation ? (
          <>
            <b className="text-primary">{situation.label}</b> — {situation.note}
          </>
        ) : (
          block.hint || copy.prompt
        )}
      </p>
    </div>
  );
}
