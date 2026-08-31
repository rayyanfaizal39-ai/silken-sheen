import type { MilkyWayLocatorBlock } from "@/content/form2/science/interactive-types";

/**
 * Where the Solar System sits inside the Milky Way.
 *
 * The source states the position plainly — the Solar System lies at the edge of
 * one of the spiral arms — and the one thing this figure must never do is put it
 * in the middle. So the marker is placed at a fixed fraction along an arm's
 * OUTER portion, and the galactic centre is drawn and labelled separately, far
 * from it. The two can't be confused because they are different marks with
 * different labels at different radii.
 */

const SIZE = 300;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R_MAX = 118;

/** Logarithmic-ish spiral, sampled. Purely presentational geometry. */
function arm(rotation: number) {
  const pts: string[] = [];
  for (let t = 0; t <= 1.001; t += 0.04) {
    const angle = rotation + t * Math.PI * 1.45;
    const r = 16 + t * R_MAX;
    pts.push(`${(CX + r * Math.cos(angle)).toFixed(1)},${(CY + r * Math.sin(angle)).toFixed(1)}`);
  }
  return "M " + pts.join(" L ");
}

/** The Solar System marker: far out along one arm, never at the centre. */
const SUN_T = 0.78;
const SUN_ROT = 0.6;
const SUN_ANGLE = SUN_ROT + SUN_T * Math.PI * 1.45;
const SUN_R = 16 + SUN_T * R_MAX;
export const SOLAR_SYSTEM_POINT = {
  x: CX + SUN_R * Math.cos(SUN_ANGLE),
  y: CY + SUN_R * Math.sin(SUN_ANGLE),
  r: SUN_R,
};
/** Guard value the tests assert against: the marker must be well outside the core. */
export const GALACTIC_CENTRE = { x: CX, y: CY, coreRadius: 26 };

export function MilkyWayLocator({ block }: { block: MilkyWayLocatorBlock; lang?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-secondary/25 p-3.5">
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="mx-auto h-auto w-full min-w-[260px] max-w-[340px]"
          role="img"
          aria-label={`${block.galaxyLabel} — ${block.solarSystemLabel} ${block.armLabel}`}
        >
          {/* Faint disc. */}
          <circle cx={CX} cy={CY} r={R_MAX + 18} className="fill-primary/[0.06]" />

          {/* Spiral arms. */}
          {[0.6, 0.6 + (Math.PI * 2) / 3, 0.6 + (Math.PI * 4) / 3].map((rot, i) => (
            <path
              key={i}
              d={arm(rot)}
              className="fill-none stroke-primary/45"
              strokeWidth="9"
              strokeLinecap="round"
            />
          ))}

          {/* Galactic centre — drawn and named so it cannot be mistaken for the Sun. */}
          <circle cx={CX} cy={CY} r={GALACTIC_CENTRE.coreRadius} className="fill-accent/30" />
          <circle cx={CX} cy={CY} r={11} className="fill-accent/70" />
          <text
            x={CX}
            y={CY - GALACTIC_CENTRE.coreRadius - 6}
            textAnchor="middle"
            className="fill-foreground"
            fontSize="9"
            fontWeight="600"
          >
            {block.centreLabel}
          </text>

          {/* The Solar System, out on an arm. */}
          <circle
            cx={SOLAR_SYSTEM_POINT.x}
            cy={SOLAR_SYSTEM_POINT.y}
            r="6.5"
            className="fill-foreground stroke-background"
            strokeWidth="2"
          />
          <line
            x1={SOLAR_SYSTEM_POINT.x}
            y1={SOLAR_SYSTEM_POINT.y}
            x2={SOLAR_SYSTEM_POINT.x + 26}
            y2={SOLAR_SYSTEM_POINT.y + 24}
            className="stroke-foreground/70"
            strokeWidth="1.4"
          />
          <text
            x={Math.min(SOLAR_SYSTEM_POINT.x + 29, SIZE - 4)}
            y={SOLAR_SYSTEM_POINT.y + 28}
            textAnchor="end"
            className="fill-foreground"
            fontSize="9.5"
            fontWeight="700"
          >
            {block.solarSystemLabel}
          </text>
          <title>{`${block.solarSystemLabel} — ${block.armLabel}`}</title>
        </svg>
      </div>

      <p className="mt-2 text-center text-[12px] italic leading-snug text-muted-foreground">
        {block.caption}
      </p>

      <ul className="mt-2.5 space-y-1">
        {block.facts.map((f) => (
          <li
            key={f}
            className="rounded-lg border border-border bg-background/45 px-2.5 py-1.5 text-[12.5px] leading-relaxed text-foreground/90"
          >
            {f}
          </li>
        ))}
      </ul>

      <p className="mt-2 text-[12px] leading-snug text-muted-foreground">{block.hint}</p>
    </div>
  );
}
