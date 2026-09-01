import { useState } from "react";
import type { MomentDiagramBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";
import { ArrowHead, Chapter8PhotoFigure } from "@/components/notes/chapter8/Chapter8PhotoFigure";
import { CHAPTER8_IMAGES, CHAPTER8_IMAGE_SIZE } from "@/components/notes/chapter8/chapter8-assets";

/**
 * Moment of a force, drawn over the real scene so the distance being measured is
 * unmistakably the perpendicular one.
 *
 * Everything is in the artwork's own pixel space (1672x941). The container and
 * the artwork are both 16:9, so x and y scale equally there and a right angle
 * drawn as a right angle still looks like one — which percentage coordinates
 * could not guarantee.
 *
 * Door and spanner are easy: the force is already perpendicular to the arm, so
 * the perpendicular distance runs along the arm itself.
 *
 * The angled case is the one learners get wrong, and it needed the extra room
 * below the photograph. With the pivot ~1070px left of the rope's attachment and
 * the rope leaving at ~47 degrees, the foot of the perpendicular genuinely lands
 * about 270px BELOW the bottom of the artwork. Rather than fake a shorter
 * distance or drop the right-angle mark, that figure extends its canvas past the
 * image and completes the construction in the space underneath.
 */

const PX = CHAPTER8_IMAGE_SIZE.width;
const PY = CHAPTER8_IMAGE_SIZE.height;

type ViewId = "door" | "spanner" | "angled";

/** Hinge axis and handle, measured on 13_moment_opening_door. */
const DOOR = { pivot: [290, 430], handle: [1191, 520] } as const;
/** Nut axis and the hand's grip, measured on 14_moment_spanner. */
const SPANNER = { pivot: [234, 520], grip: [1311, 430] } as const;
/** Pivot bolt, rope attachment and rope direction, measured on 15_moment_force_at_angle. */
const ANGLED = {
  pivot: [174, 688],
  attach: [1246, 660],
  /** Unit vector along the rope, toward the hand. */
  dir: [0.6807, -0.7327],
} as const;
/** How far the force point may be dragged along the door, as a fraction of the arm. */
const DOOR_MIN_FRACTION = 0.22;
/** Extra canvas under the angled artwork so the perpendicular's foot is visible. */
const ANGLED_CANVAS_H = 1270;

function unit(dx: number, dy: number) {
  const len = Math.hypot(dx, dy) || 1;
  return [dx / len, dy / len] as const;
}

/** Foot of the perpendicular dropped from the pivot onto the force's line of action. */
export function perpendicularFoot(ax: number, ay: number, ux: number, uy: number, px: number, py: number) {
  const t = (px - ax) * ux + (py - ay) * uy;
  return { x: ax + t * ux, y: ay + t * uy };
}

/** A short square tick marking a right angle between directions `u` and `v` at a point. */
function rightAngleMark(x: number, y: number, u: readonly [number, number], v: readonly [number, number], s: number) {
  return `M ${x + u[0] * s} ${y + u[1] * s} L ${x + u[0] * s + v[0] * s} ${y + u[1] * s + v[1] * s} L ${x + v[0] * s} ${y + v[1] * s}`;
}

export function MomentDiagram({ block, lang }: { block: MomentDiagramBlock; lang?: string }) {
  const [view, setView] = useState<ViewId>((block.situations[0]?.id as ViewId) ?? "door");
  const [doorFraction, setDoorFraction] = useState(1);
  const copy = figureCopy(lang);

  const situation = block.situations.find((s) => s.id === view) ?? block.situations[0];

  const alt = {
    door:
      lang === "bm"
        ? "Pintu dilihat dari atas, seorang murid menolak pada tombol jauh dari engsel."
        : "A door seen from above, with a student pushing the handle far from the hinge.",
    spanner:
      lang === "bm"
        ? "Sebuah sepana panjang digunakan untuk melonggarkan nat."
        : "A long spanner being used to loosen a nut.",
    angled:
      lang === "bm"
        ? "Satu tali menarik hujung bar pada satu sudut, bukan berserenjang."
        : "A rope pulling the end of a bar at an angle rather than perpendicular to it.",
  }[view];

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

      {view === "angled" ? (
        <AngledMoment block={block} alt={alt} />
      ) : (
        <PerpendicularMoment
          block={block}
          alt={alt}
          view={view}
          fraction={view === "door" ? doorFraction : 1}
        />
      )}

      {/* Moving the force changes only the distance — the arrow keeps its length. */}
      {view === "door" && (
        <label className="mt-2 flex flex-wrap items-center gap-2 text-[11.5px] text-muted-foreground">
          <span className="font-semibold text-sky-300">{block.distanceLabel}</span>
          <input
            type="range"
            min={DOOR_MIN_FRACTION * 100}
            max={100}
            step={1}
            value={Math.round(doorFraction * 100)}
            onChange={(event) => setDoorFraction(Number(event.target.value) / 100)}
            aria-label={`${block.forceLabel} — ${block.distanceLabel}`}
            aria-valuetext={`${Math.round(doorFraction * 100)}%`}
            className="h-11 min-w-[160px] flex-1 accent-sky-300"
          />
        </label>
      )}

      <div className="mt-2 rounded-xl border border-primary/25 bg-secondary/30 px-3 py-2">
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

/**
 * Door and spanner: the force is applied at right angles to the arm, so the
 * perpendicular distance is measured along the arm itself.
 */
function PerpendicularMoment({
  block,
  alt,
  view,
  fraction,
}: {
  block: MomentDiagramBlock;
  alt: string;
  view: "door" | "spanner";
  fraction: number;
}) {
  const cfg = view === "door" ? DOOR : SPANNER;
  const [px, py] = cfg.pivot;
  const [ex, ey] = view === "door" ? DOOR.handle : SPANNER.grip;
  const armU = unit(ex - px, ey - py);
  const armLen = Math.hypot(ex - px, ey - py);

  // where the force acts, measured along the arm from the pivot
  const d = armLen * fraction;
  const ax = px + armU[0] * d;
  const ay = py + armU[1] * d;

  // perpendicular to the arm; pick the side the person actually pushes from
  const perp: readonly [number, number] = view === "door" ? [armU[1], -armU[0]] : [-armU[1], armU[0]];
  const FORCE_LEN = 210;

  return (
    <Chapter8PhotoFigure image={view === "door" ? "momentDoor" : "momentSpanner"} alt={alt} space="pixel" priority>
      <ArrowHead id={`ch8-moment-${view}`} className="fill-emerald-300" />

      {/* perpendicular distance, along the arm from the pivot to the force */}
      <line
        data-perpendicular=""
        x1={px}
        y1={py}
        x2={ax}
        y2={ay}
        className="stroke-sky-300"
        strokeWidth="7"
        strokeDasharray="20 12"
      />
      <text
        x={(px + ax) / 2}
        y={(py + ay) / 2 - 26}
        textAnchor="middle"
        fontSize="40"
        fontWeight="bold"
        className="fill-sky-300"
        stroke="rgba(2,8,23,0.75)"
        strokeWidth="7"
        paintOrder="stroke"
      >
        {block.distanceLabel}
      </text>

      {/* the applied force, at right angles to the arm */}
      <line
        data-force=""
        x1={ax}
        y1={ay}
        x2={ax + perp[0] * FORCE_LEN}
        y2={ay + perp[1] * FORCE_LEN}
        className="stroke-emerald-300"
        strokeWidth="9"
        strokeLinecap="round"
        markerEnd={`url(#ch8-moment-${view})`}
      />
      <path
        data-right-angle=""
        d={rightAngleMark(ax, ay, armU, perp, 46)}
        fill="none"
        className="stroke-emerald-200"
        strokeWidth="5"
      />
      <text
        x={ax + perp[0] * (FORCE_LEN + 60)}
        y={ay + perp[1] * (FORCE_LEN + 60)}
        textAnchor="middle"
        fontSize="40"
        fontWeight="bold"
        className="fill-emerald-300"
        stroke="rgba(2,8,23,0.75)"
        strokeWidth="7"
        paintOrder="stroke"
      >
        {block.forceLabel}
      </text>

      {/* the pivot */}
      <circle cx={px} cy={py} r="16" className="fill-amber-300" />
      <text
        x={px}
        y={py - 34}
        textAnchor="middle"
        fontSize="40"
        fontWeight="bold"
        className="fill-amber-300"
        stroke="rgba(2,8,23,0.75)"
        strokeWidth="7"
        paintOrder="stroke"
      >
        {block.pivotLabel}
      </text>
    </Chapter8PhotoFigure>
  );
}

/**
 * The angled case, drawn on a canvas taller than the artwork so the foot of the
 * perpendicular — which really is below the picture — can be shown honestly.
 */
function AngledMoment({ block, alt }: { block: MomentDiagramBlock; alt: string }) {
  const [px, py] = ANGLED.pivot;
  const [ax, ay] = ANGLED.attach;
  const u = ANGLED.dir;
  const foot = perpendicularFoot(ax, ay, u[0], u[1], px, py);
  const perpLen = Math.hypot(foot.x - px, foot.y - py);
  const v = unit(px - foot.x, py - foot.y);

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl bg-slate-900"
      style={{ aspectRatio: `${PX} / ${ANGLED_CANVAS_H}` }}
      data-ch8-photo="momentAngle"
    >
      <svg
        viewBox={`0 0 ${PX} ${ANGLED_CANVAS_H}`}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label={alt}
      >
        <ArrowHead id="ch8-moment-angled" className="fill-emerald-300" />
        <image href={CHAPTER8_IMAGES.momentAngle} x="0" y="0" width={PX} height={PY} preserveAspectRatio="none" />

        {/* line of action, extended well past the attachment in both directions */}
        <line
          data-line-of-action=""
          x1={foot.x - u[0] * 60}
          y1={foot.y - u[1] * 60}
          x2={ax + u[0] * 300}
          y2={ay + u[1] * 300}
          className="stroke-emerald-300/50"
          strokeWidth="6"
          strokeDasharray="18 14"
        />

        {/* the pull along the rope */}
        <line
          data-force=""
          x1={ax}
          y1={ay}
          x2={ax + u[0] * 250}
          y2={ay + u[1] * 250}
          className="stroke-emerald-300"
          strokeWidth="9"
          strokeLinecap="round"
          markerEnd="url(#ch8-moment-angled)"
        />
        <text
          x={ax + u[0] * 300}
          y={ay + u[1] * 300 - 20}
          textAnchor="middle"
          fontSize="42"
          fontWeight="bold"
          className="fill-emerald-300"
          stroke="rgba(2,8,23,0.75)"
          strokeWidth="7"
          paintOrder="stroke"
        >
          {block.forceLabel}
        </text>

        {/* the true perpendicular, from the pivot to the line of action */}
        <line
          data-perpendicular=""
          x1={px}
          y1={py}
          x2={foot.x}
          y2={foot.y}
          className="stroke-sky-300"
          strokeWidth="8"
        />
        <path
          data-right-angle=""
          d={rightAngleMark(foot.x, foot.y, u, v, 48)}
          fill="none"
          className="stroke-sky-300"
          strokeWidth="6"
        />
        <text
          x={(px + foot.x) / 2 - 120}
          y={(py + foot.y) / 2 + 10}
          textAnchor="middle"
          fontSize="44"
          fontWeight="bold"
          className="fill-sky-300"
          stroke="rgba(2,8,23,0.8)"
          strokeWidth="8"
          paintOrder="stroke"
        >
          {block.distanceLabel}
        </text>

        {/* the pivot */}
        <circle cx={px} cy={py} r="18" className="fill-amber-300" />
        <text
          x={px + 30}
          y={py - 36}
          textAnchor="start"
          fontSize="42"
          fontWeight="bold"
          className="fill-amber-300"
          stroke="rgba(2,8,23,0.75)"
          strokeWidth="7"
          paintOrder="stroke"
        >
          {block.pivotLabel}
        </text>

        {/* the bar itself, for contrast: longer than the perpendicular distance */}
        <line
          x1={px}
          y1={py}
          x2={ax}
          y2={ay}
          className="stroke-slate-300/45"
          strokeWidth="5"
          strokeDasharray="10 12"
        />
        <text
          x={PX / 2}
          y={ANGLED_CANVAS_H - 24}
          textAnchor="middle"
          fontSize="34"
          className="fill-slate-300"
        >
          {block.perpendicularNote.split(/[.—-]/)[0].trim()}
        </text>
        <title>{`${block.distanceLabel}: ${Math.round(perpLen)}`}</title>
      </svg>
    </div>
  );
}
