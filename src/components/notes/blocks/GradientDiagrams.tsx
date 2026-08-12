import { MATH_AMBER, MATH_GREEN, MATH_VIOLET } from "./mathTheme";

const FONT = "'Space Grotesk', sans-serif";

/**
 * A right-triangle rise/run diagram: solid green hypotenuse (the line itself),
 * dashed amber horizontal (run), dashed violet vertical (rise). Reused across
 * all three gradient methods in Chapter 10.1 — rise/run given directly, the
 * two-points formula, and the intercepts formula — by swapping the two
 * labels rather than building three separate diagrams. Ports buildRiseRun
 * exactly (static geometry).
 */
export function RiseRunTriangle({
  runLabel,
  riseLabel,
  caption,
}: {
  runLabel: string;
  riseLabel: string;
  caption?: string;
}) {
  const ox = 40;
  const oy = 110;
  const w = 140;
  const hgt = 70;
  return (
    <div className="mt-4 flex flex-col items-center">
      {/* viewBox widened to 300 (from the mockup's 220) so longer bilingual
          rise labels ("y-intercept" / "pintasan-y", "y₂ − y₁") fit within
          bounds — the mockup only ever showed the short word "rise" here. */}
      <svg viewBox="0 0 300 130" className="w-full max-w-[320px]">
        <line x1={ox} y1={oy} x2={ox + w} y2={oy - hgt} stroke={MATH_GREEN} strokeWidth={2.5} />
        <line
          x1={ox}
          y1={oy}
          x2={ox + w}
          y2={oy}
          stroke={MATH_AMBER}
          strokeWidth={1.5}
          strokeDasharray="3,2"
        />
        <line
          x1={ox + w}
          y1={oy}
          x2={ox + w}
          y2={oy - hgt}
          stroke={MATH_VIOLET}
          strokeWidth={1.5}
          strokeDasharray="3,2"
        />
        <text
          x={ox + w / 2}
          y={oy + 16}
          fontSize={11}
          fill={MATH_AMBER}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {runLabel}
        </text>
        <text
          x={ox + w + 8}
          y={oy - hgt / 2}
          fontSize={11}
          fill={MATH_VIOLET}
          fontFamily={FONT}
          fontWeight={700}
        >
          {riseLabel}
        </text>
      </svg>
      {caption && <p className="mt-2 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}
