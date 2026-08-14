import { MATH_AMBER, MATH_GREEN, MATH_VIOLET } from "./mathTheme";

const FONT = "'Space Grotesk', sans-serif";

/**
 * A point tracing a circular path around a fixed pivot — introduces what a
 * locus is before naming any shapes. Ports buildLocusTrace's geometry, with
 * the viewBox height bumped from the mockup's 130 to 136 so the bottom
 * result label (baseline at cy+r+18 = 128) keeps real margin instead of the
 * 2px the original mockup shipped with.
 */
export function LocusTraceDiagram({
  pointLabel,
  resultLabel,
  caption,
}: {
  pointLabel: string;
  resultLabel: string;
  caption?: string;
}) {
  const cx = 110;
  const cy = 65;
  const r = 45;

  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 220 136" className="w-full max-w-[280px]">
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={MATH_GREEN}
          strokeWidth={1.5}
          strokeDasharray="4,3"
        />
        <line x1={cx} y1={cy} x2={cx} y2={cy - r} stroke={MATH_VIOLET} strokeWidth={2} />
        <circle cx={cx} cy={cy} r={2.5} fill={MATH_AMBER} />
        <circle cx={cx} cy={cy - r} r={3.5} fill={MATH_VIOLET} />
        <text
          x={cx + 8}
          y={cy - r + 4}
          fontSize={9}
          fill={MATH_VIOLET}
          fontFamily={FONT}
          fontWeight={700}
        >
          {pointLabel}
        </text>
        <text
          x={cx}
          y={cy + r + 18}
          fontSize={9}
          fill={MATH_GREEN}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {resultLabel}
        </text>
      </svg>
      {caption && <p className="mt-2 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}

/**
 * A single diagram comparing all three basic locus rules at once: 1 fixed
 * point → circle, 2 fixed points → perpendicular bisector, 2 fixed lines →
 * angle bisector. Ports buildThreeLoci's geometry exactly.
 */
export function ThreeLociTypesDiagram({
  label1,
  label2,
  label3,
  caption,
}: {
  label1: string;
  label2: string;
  label3: string;
  caption?: string;
}) {
  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 260 100" className="w-full max-w-[320px]">
        <circle cx={40} cy={45} r={25} fill="none" stroke={MATH_VIOLET} strokeWidth={1.5} />
        <circle cx={40} cy={45} r={2} fill={MATH_AMBER} />
        <text
          x={40}
          y={85}
          fontSize={8.5}
          fill={MATH_VIOLET}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {label1}
        </text>

        <circle cx={115} cy={35} r={2.5} fill={MATH_AMBER} />
        <circle cx={155} cy={35} r={2.5} fill={MATH_AMBER} />
        <line x1={115} y1={35} x2={155} y2={35} stroke="#6a7299" strokeWidth={1} />
        <line x1={135} y1={10} x2={135} y2={60} stroke={MATH_GREEN} strokeWidth={1.5} />
        <text
          x={135}
          y={85}
          fontSize={8.5}
          fill={MATH_GREEN}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {label2}
        </text>

        <line x1={200} y1={55} x2={245} y2={15} stroke="#6a7299" strokeWidth={1} />
        <line x1={200} y1={55} x2={245} y2={55} stroke="#6a7299" strokeWidth={1} />
        <line x1={200} y1={55} x2={235} y2={30} stroke={MATH_AMBER} strokeWidth={1.5} />
        <text
          x={220}
          y={85}
          fontSize={8.5}
          fill={MATH_AMBER}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {label3}
        </text>
      </svg>
      {caption && <p className="mt-2 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}

/**
 * Two loci — a circle and a straight line — drawn together with their
 * actual crossing points marked. The marks are NOT hand-placed: cx/cy/r and
 * the line's y both come in as props, and the intersection x-coordinates
 * are computed live via the standard circle-chord formula
 * (dx = √(r² − (cy − lineY)²), x = cx ± dx), so the marks always land
 * exactly on the true crossing point rather than an approximation that
 * could drift if the shapes are resized. Defaults reproduce the mockup's
 * buildIntersectLoci geometry exactly.
 */
export function LociIntersectionDiagram({
  cx = 110,
  cy = 65,
  r = 40,
  lineY = 45,
  lineX1 = 20,
  lineX2 = 200,
  caption,
}: {
  cx?: number;
  cy?: number;
  r?: number;
  lineY?: number;
  lineX1?: number;
  lineX2?: number;
  caption?: string;
}) {
  const dy = cy - lineY;
  const dx = Math.sqrt(Math.max(r * r - dy * dy, 0));
  const ix1 = cx - dx;
  const ix2 = cx + dx;

  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 220 130" className="w-full max-w-[280px]">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={MATH_VIOLET} strokeWidth={1.5} />
        <line x1={lineX1} y1={lineY} x2={lineX2} y2={lineY} stroke={MATH_GREEN} strokeWidth={1.5} />
        <circle cx={ix1} cy={lineY} r={4} fill={MATH_AMBER} />
        <circle cx={ix2} cy={lineY} r={4} fill={MATH_AMBER} />
        <text
          x={ix1}
          y={lineY - 10}
          fontSize={9}
          fill={MATH_AMBER}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          ✕
        </text>
        <text
          x={ix2}
          y={lineY - 10}
          fontSize={9}
          fill={MATH_AMBER}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          ✕
        </text>
      </svg>
      {caption && <p className="mt-2 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}
