import type {
  CrossingOrbitItem,
  CrossingOrbitsBlock,
} from "@/content/form2/science/interactive-types";

/**
 * Rajah 13.3 — Apollo, Amor and Aten against Earth's orbit, compact and static.
 *
 * The earlier version drew one orbit at a time inside a large canvas, with
 * crossing markers, a closest-approach marker and a legend underneath — more
 * machinery than a Form 2 learner needs for one idea: some asteroid orbits
 * outside the belt approach or cross Earth's own. This version draws all
 * three at once, small, on one dark card, each in its own colour with a label
 * beside its own path instead of a legend. There is nothing to tap: reading
 * the picture takes less time than deciding what to tap.
 *
 * Whether a given orbit actually crosses Earth's orbit is still computed from
 * real ellipse geometry, not eyeballed — the drawing is simplified, the
 * geometry is not, and `crossingOrbitGeometry` keeps every field the
 * geometry-correctness tests rely on even though the crossing points are no
 * longer drawn.
 */

const VIEW_W = 280;
const VIEW_H = 200;
const SUN = { x: VIEW_W / 2, y: VIEW_H / 2 + 6 };

/** Pixels per radius of Earth's orbit. */
export const EARTH_ORBIT_PX = 34;

/** a: size in Earth-orbit radii; e: elongation; omega: direction of the nearest point, degrees. */
export const CROSSING_ORBIT_ELEMENTS: Record<
  CrossingOrbitItem["id"],
  { a: number; e: number; omega: number }
> = {
  apollo: { a: 1.6, e: 0.5, omega: 205 },
  amor: { a: 1.8, e: 0.38, omega: 325 },
  aten: { a: 0.85, e: 0.35, omega: 95 },
};

const COLOURS: Record<CrossingOrbitItem["id"], string> = {
  apollo: "#fb7185", // rose-400
  amor: "#a78bfa", // violet-400
  aten: "#2dd4bf", // teal-400
};

type Point = { x: number; y: number };

/**
 * Everything the figure could draw for one orbit, in SVG pixels.
 *
 * Exported so the crossing relationships are asserted, not eyeballed: each
 * intersection must lie on both curves, and the orbit that never crosses must
 * keep its nearest point outside Earth's orbit. Unused by the compact
 * rendering below, but kept exactly as before so the geometry stays correct
 * and testable.
 */
export function crossingOrbitGeometry(id: CrossingOrbitItem["id"]) {
  const { a, e, omega } = CROSSING_ORBIT_ELEMENTS[id];
  const w = (omega * Math.PI) / 180;
  const semiMajor = a * EARTH_ORBIT_PX;
  const semiMinor = semiMajor * Math.sqrt(1 - e * e);
  const focusOffset = semiMajor * e;
  const centre = { x: SUN.x - focusOffset * Math.cos(w), y: SUN.y - focusOffset * Math.sin(w) };

  /** A point on the orbit, `nu` radians round from its nearest point. */
  const pointAt = (nu: number): Point => {
    const r = ((a * (1 - e * e)) / (1 + e * Math.cos(nu))) * EARTH_ORBIT_PX;
    return { x: SUN.x + r * Math.cos(nu + w), y: SUN.y + r * Math.sin(nu + w) };
  };

  // where the orbit's distance from the Sun equals Earth's
  const k = (a * (1 - e * e) - 1) / e;
  const intersections = Math.abs(k) <= 1 ? [Math.acos(k), -Math.acos(k)].map(pointAt) : [];

  return {
    sun: SUN,
    centre,
    rx: semiMajor,
    ry: semiMinor,
    rotation: omega,
    intersections,
    crosses: intersections.length > 0,
    nearest: pointAt(0),
    farthest: pointAt(Math.PI),
    /** In Earth-orbit radii. */
    nearestDistance: a * (1 - e),
    farthestDistance: a * (1 + e),
    /** The point on Earth's orbit directly opposite the nearest point. */
    earthBelowNearest: {
      x: SUN.x + EARTH_ORBIT_PX * Math.cos(w),
      y: SUN.y + EARTH_ORBIT_PX * Math.sin(w),
    },
  };
}

export const CROSSING_ORBIT_VIEWBOX = { width: VIEW_W, height: VIEW_H };

const EARTH_ANGLE = 160;
const HALO = { paintOrder: "stroke" as const, strokeWidth: 3, strokeLinejoin: "round" as const };
/** The halo matches the card's own fixed navy background, not the site theme. */
const NAVY = "#0b1220";

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function CrossingOrbitsFigure({
  block,
  lang,
}: {
  block: CrossingOrbitsBlock;
  lang?: string;
}) {
  void lang; // reserved for future per-language geometry tweaks; wording differs only in content

  const earth = {
    x: SUN.x + EARTH_ORBIT_PX * Math.cos((EARTH_ANGLE * Math.PI) / 180),
    y: SUN.y + EARTH_ORBIT_PX * Math.sin((EARTH_ANGLE * Math.PI) / 180),
  };

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="mx-auto block h-auto w-full max-w-[360px]"
        role="img"
        aria-label={block.figureLabel}
        data-ch13-figure="crossing-orbits"
      >
        <rect x="0" y="0" width={VIEW_W} height={VIEW_H} rx="16" fill={NAVY} />

        {/* Earth's orbit — a clean, thin cyan reference circle */}
        <circle
          cx={SUN.x}
          cy={SUN.y}
          r={EARTH_ORBIT_PX}
          fill="none"
          stroke="#22d3ee"
          strokeWidth="1.4"
          opacity="0.85"
        />
        <text
          x={SUN.x}
          y={SUN.y - EARTH_ORBIT_PX - 6}
          textAnchor="middle"
          fill="#67e8f9"
          fontSize="8"
          fontWeight="700"
          stroke={NAVY}
          style={HALO}
        >
          {block.earthOrbitLabel}
        </text>

        {/* the three asteroid orbits, all shown at once, each its own colour */}
        {block.orbits.map((orbit) => {
          const g = crossingOrbitGeometry(orbit.id);
          const out = { x: g.farthest.x - SUN.x, y: g.farthest.y - SUN.y };
          const outLen = Math.hypot(out.x, out.y) || 1;
          const labelAt = {
            x: clamp(g.farthest.x + (out.x / outLen) * 12, 24, VIEW_W - 24),
            y: clamp(g.farthest.y + (out.y / outLen) * 12 + 3, 12, VIEW_H - 6),
          };
          return (
            <g key={orbit.id} data-orbit={orbit.id}>
              <ellipse
                cx={g.centre.x}
                cy={g.centre.y}
                rx={g.rx}
                ry={g.ry}
                transform={`rotate(${g.rotation} ${g.centre.x} ${g.centre.y})`}
                fill="none"
                stroke={COLOURS[orbit.id]}
                strokeWidth="1.8"
              />
              <text
                x={labelAt.x}
                y={labelAt.y}
                textAnchor="middle"
                fill={COLOURS[orbit.id]}
                fontSize="9.5"
                fontWeight="800"
                stroke={NAVY}
                style={HALO}
              >
                {orbit.label}
              </text>
            </g>
          );
        })}

        {/* Sun, with a soft glow */}
        <circle cx={SUN.x} cy={SUN.y} r="13" fill="#fbbf24" opacity="0.22" />
        <circle cx={SUN.x} cy={SUN.y} r="7" fill="#fbbf24" />
        <text
          x={SUN.x}
          y={SUN.y + 22}
          textAnchor="middle"
          fill="#e2e8f0"
          fontSize="9"
          fontWeight="700"
          stroke={NAVY}
          style={HALO}
        >
          {block.sunLabel}
        </text>

        {/* Earth: a small blue-green sphere on its own orbit */}
        <circle cx={earth.x} cy={earth.y} r="4.2" fill="#38bdf8" />
        <path
          d={`M ${earth.x - 3} ${earth.y + 1} q 3 -3 6 0`}
          fill="none"
          stroke="#34d399"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <text
          x={earth.x - 9}
          y={earth.y - 7}
          textAnchor="end"
          fill="#e2e8f0"
          fontSize="8"
          fontWeight="700"
          stroke={NAVY}
          style={HALO}
        >
          {block.earthLabel}
        </text>
      </svg>

      <p className="mt-2 text-center text-[11px] italic text-muted-foreground">{block.scaleNote}</p>
      <p className="mt-2 text-[13px] leading-relaxed text-foreground">{block.explanation}</p>
    </div>
  );
}
