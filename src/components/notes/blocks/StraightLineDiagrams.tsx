import { MATH_AMBER, MATH_GREEN, MATH_VIOLET } from "./mathTheme";

const FONT = "'Space Grotesk', sans-serif";

/**
 * Two lines with visually identical slope but different y-intercepts,
 * clearly never touching. Ports buildParallelLines's geometry, but drops
 * the mockup's dead `<line ... y2="-10">` segment — it was immediately
 * overridden by a second line before ever being visible, and porting it
 * as-is would push a coordinate outside the 220×130 viewBox for no reason.
 * The equations are pure notation, unaffected by language, so both labels
 * default to fixed strings rather than translated props.
 */
export function StraightLineParallelDiagram({
  line1Label = "y=½x+2",
  line2Label = "y=½x−1",
  caption,
}: {
  line1Label?: string;
  line2Label?: string;
  caption?: string;
}) {
  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 220 130" className="w-full max-w-[280px]">
        <line x1={10} y1={115} x2={210} y2={115} stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
        <line x1={20} y1={120} x2={20} y2={10} stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
        <line x1={20} y1={100} x2={180} y2={20} stroke={MATH_VIOLET} strokeWidth={1.8} />
        <line x1={20} y1={70} x2={140} y2={10} stroke={MATH_GREEN} strokeWidth={1.8} />
        <text x={185} y={20} fontSize={9} fill={MATH_VIOLET} fontFamily={FONT} fontWeight={700}>
          {line1Label}
        </text>
        <text x={145} y={10} fontSize={9} fill={MATH_GREEN} fontFamily={FONT} fontWeight={700}>
          {line2Label}
        </text>
      </svg>
      {caption && <p className="mt-2 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}

/**
 * Two non-parallel lines crossing with the single intersection point
 * marked. Ports buildIntersectLines's geometry exactly.
 */
export function StraightLineIntersectionDiagram({
  label,
  caption,
}: {
  label: string;
  caption?: string;
}) {
  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 220 130" className="w-full max-w-[280px]">
        <line x1={20} y1={20} x2={180} y2={100} stroke={MATH_VIOLET} strokeWidth={1.8} />
        <line x1={20} y1={100} x2={180} y2={20} stroke={MATH_GREEN} strokeWidth={1.8} />
        <circle cx={100} cy={60} r={4.5} fill={MATH_AMBER} />
        <text
          x={100}
          y={48}
          fontSize={9}
          fill={MATH_AMBER}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {label}
        </text>
      </svg>
      {caption && <p className="mt-2 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}
