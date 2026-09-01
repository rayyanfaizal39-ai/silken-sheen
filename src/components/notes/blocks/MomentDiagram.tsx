import { useState } from "react";
import type { MomentDiagramBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";

/**
 * Moment of a force, drawn so the distance being measured is unmistakably the
 * perpendicular one.
 *
 * The door view lets the force be moved along the door with its magnitude held
 * fixed, because "push further from the hinge and the door opens more easily" is
 * the thing the source says and the only way to show it is to vary the distance
 * alone.
 *
 * The angled view exists because it is the case learners get wrong: when the
 * force is applied at an angle the handle length is NOT the distance that goes
 * into the formula. That only reads correctly if the line of action is drawn and
 * the perpendicular is dropped onto it from the pivot -- a horizontal bar of the
 * right length is the right number drawn as the wrong geometry, so the foot of
 * the perpendicular is constructed here rather than assumed.
 */

const PIVOT_X = 72;
const PIVOT_Y = 104;
/** Handle runs to the right from the pivot. */
const HANDLE_LEN = 150;
/** Where the force starts on the door, and how near the hinge it may be dragged. */
const DOOR_MIN_D = 30;
const DOOR_DEFAULT_D = 150;
/** The angled case acts at 45 deg, so cos and sin are the same number. */
const ANGLE = Math.PI / 4;

type ViewId = "door" | "spanner" | "angled";

/** Foot of the perpendicular dropped from the pivot onto the force's line of action. */
export function perpendicularFoot(ax: number, ay: number, ux: number, uy: number, px: number, py: number) {
  const t = (px - ax) * ux + (py - ay) * uy;
  return { x: ax + t * ux, y: ay + t * uy };
}

export function MomentDiagram({ block, lang }: { block: MomentDiagramBlock; lang?: string }) {
  const [view, setView] = useState<ViewId>((block.situations[0]?.id as ViewId) ?? "door");
  const [doorD, setDoorD] = useState(DOOR_DEFAULT_D);
  const copy = figureCopy(lang);

  const situation = block.situations.find((s) => s.id === view) ?? block.situations[0];
  const angled = view === "angled";
  const door = view === "door";

  /** Where the force is applied, measured along the handle from the pivot. */
  const applyD = door ? doorD : HANDLE_LEN;
  const forceX = PIVOT_X + applyD;

  // Force direction: straight down, or 45 deg for the angled case.
  const ux = angled ? Math.cos(ANGLE) : 0;
  const uy = angled ? Math.sin(ANGLE) : 1;
  const foot = angled
    ? perpendicularFoot(forceX, PIVOT_Y, ux, uy, PIVOT_X, PIVOT_Y)
    : { x: forceX, y: PIVOT_Y };
  const perpLen = Math.hypot(foot.x - PIVOT_X, foot.y - PIVOT_Y);

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
          data-view={view}
          data-perp-length={Math.round(perpLen)}
        >
          {door ? (
            /* door seen from above: hinge at the pivot, door slab along the handle line */
            <rect x={PIVOT_X} y={PIVOT_Y - 12} width={HANDLE_LEN} height={24} className="fill-primary/15 stroke-primary/60" strokeWidth="2" />
          ) : (
            /* spanner shaft with a nut at the pivot */
            <>
              <line x1={PIVOT_X} y1={PIVOT_Y} x2={PIVOT_X + HANDLE_LEN} y2={PIVOT_Y} className="stroke-primary/70" strokeWidth="7" />
              <circle cx={PIVOT_X} cy={PIVOT_Y} r="16" fill="none" className="stroke-primary/70" strokeWidth="4" />
            </>
          )}

          {/* turning effect at the pivot: same force, so this grows only with distance */}
          {door && (
            <path
              d={`M ${PIVOT_X + 20} ${PIVOT_Y - 20} A 28 28 0 0 1 ${PIVOT_X + 20} ${PIVOT_Y + 20}`}
              fill="none"
              className="stroke-amber-300/70"
              strokeWidth="2"
              strokeDasharray="3 3"
              opacity={0.35 + 0.65 * ((applyD - DOOR_MIN_D) / (HANDLE_LEN - DOOR_MIN_D))}
            />
          )}

          {/* the pivot itself */}
          <circle cx={PIVOT_X} cy={PIVOT_Y} r="5" className="fill-amber-300" />
          <text x={PIVOT_X} y={PIVOT_Y + 34} textAnchor="middle" fontSize="10" fontWeight="bold" className="fill-amber-300">
            {block.pivotLabel}
          </text>

          {/* line of action, extended past the point of application in both directions,
              so the perpendicular has something to meet */}
          {angled && (
            <line
              data-line-of-action=""
              x1={foot.x - ux * 22}
              y1={foot.y - uy * 22}
              x2={forceX + ux * 64}
              y2={PIVOT_Y + uy * 64}
              className="stroke-emerald-300/45"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
          )}

          {/* applied force: magnitude is the same wherever it is applied */}
          <g transform={`translate(${forceX} ${PIVOT_Y}) rotate(${angled ? 45 : 90})`}>
            <line x1={0} y1={0} x2={52} y2={0} className="stroke-emerald-300" strokeWidth="3" />
            <path d="M-5,-4 L5,0 L-5,4 Z" transform="translate(52 0)" className="fill-emerald-300" />
          </g>
          <circle cx={forceX} cy={PIVOT_Y} r="3.5" className="fill-emerald-300" />
          <text x={forceX + 10} y={PIVOT_Y + 46} fontSize="10" fontWeight="bold" className="fill-emerald-300">
            {block.forceLabel}
          </text>

          {angled ? (
            /* the real perpendicular: pivot to the line of action, with a right-angle mark */
            <>
              <line
                data-perpendicular=""
                x1={PIVOT_X}
                y1={PIVOT_Y}
                x2={foot.x}
                y2={foot.y}
                className="stroke-sky-300"
                strokeWidth="2.5"
              />
              <path
                data-right-angle=""
                d={`M ${foot.x + ux * 10} ${foot.y + uy * 10}
                    L ${foot.x + ux * 10 + (PIVOT_X - foot.x) / perpLen * 10} ${foot.y + uy * 10 + (PIVOT_Y - foot.y) / perpLen * 10}
                    L ${foot.x + (PIVOT_X - foot.x) / perpLen * 10} ${foot.y + (PIVOT_Y - foot.y) / perpLen * 10}`}
                fill="none"
                className="stroke-sky-300"
                strokeWidth="1.6"
              />
              <text
                x={(PIVOT_X + foot.x) / 2 - 12}
                y={(PIVOT_Y + foot.y) / 2 - 6}
                textAnchor="middle"
                fontSize="10"
                fontWeight="bold"
                className="fill-sky-300"
              >
                {block.distanceLabel}
              </text>
              {/* handle length, for contrast: longer than the perpendicular distance */}
              <line
                x1={PIVOT_X}
                y1={PIVOT_Y + 52}
                x2={PIVOT_X + HANDLE_LEN}
                y2={PIVOT_Y + 52}
                className="stroke-muted-foreground/60"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              {/* centred on the viewBox, not the handle, or the sentence runs off the left edge */}
              <text x={160} y={PIVOT_Y + 66} textAnchor="middle" fontSize="7.5" className="fill-muted-foreground">
                {block.perpendicularNote.split(/[.—-]/)[0].trim()}
              </text>
            </>
          ) : (
            /* force is already perpendicular to the handle, so the distance is measured along it */
            <>
              <line
                data-perpendicular=""
                x1={PIVOT_X}
                y1={PIVOT_Y - 44}
                x2={forceX}
                y2={PIVOT_Y - 44}
                className="stroke-sky-300"
                strokeWidth="2"
                strokeDasharray="5 3"
              />
              <line x1={PIVOT_X} y1={PIVOT_Y - 50} x2={PIVOT_X} y2={PIVOT_Y - 38} className="stroke-sky-300" strokeWidth="2" />
              <line x1={forceX} y1={PIVOT_Y - 50} x2={forceX} y2={PIVOT_Y - 38} className="stroke-sky-300" strokeWidth="2" />
              <text x={(PIVOT_X + forceX) / 2} y={PIVOT_Y - 52} textAnchor="middle" fontSize="10" fontWeight="bold" className="fill-sky-300">
                {block.distanceLabel}
              </text>
            </>
          )}
        </svg>
      </div>

      {/* Moving the force changes only the distance -- the arrow keeps its length. */}
      {door && (
        <label className="mt-2 flex flex-wrap items-center gap-2 text-[11.5px] text-muted-foreground">
          <span className="font-semibold text-sky-300">{block.distanceLabel}</span>
          <input
            type="range"
            min={DOOR_MIN_D}
            max={HANDLE_LEN}
            step={1}
            value={doorD}
            onChange={(event) => setDoorD(Number(event.target.value))}
            aria-label={`${block.forceLabel} — ${block.distanceLabel}`}
            aria-valuetext={`${Math.round((doorD / HANDLE_LEN) * 100)}%`}
            className="h-11 min-w-[160px] flex-1 accent-sky-300"
          />
        </label>
      )}

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
