import { MATH_GREEN, MATH_RED } from "./mathTheme";

const FONT = "'Space Grotesk', sans-serif";

/**
 * Two small distance-time graphs side by side — one a straight line
 * (uniform speed), one bumpy (non-uniform). Deliberately uses the same
 * green/red visual language as Chapter 1's sequence gap-checker, but needs
 * its own axis-based layout (points are scaled distance values plotted
 * against a real y-axis, not evenly-spaced sequence terms with gap
 * labels), so it's a distinct component rather than a forced reuse. Ports
 * buildUniformCompare's miniGraph exactly.
 */
export function UniformCompareDiagram({
  goodPoints,
  badPoints,
  goodLabel,
  badLabel,
  caption,
}: {
  goodPoints: number[];
  badPoints: number[];
  goodLabel: string;
  badLabel: string;
  caption?: string;
}) {
  const w = 110;
  const h = 70;
  const padL = 20;
  const padB = 15;
  const plotW = w - padL - 10;
  const plotH = h - padB - 10;

  const miniGraph = (points: number[], isUniform: boolean) => {
    const maxD = Math.max(...points);
    const xStep = plotW / (points.length - 1);
    const coords = points.map((d, i): [number, number] => [
      padL + i * xStep,
      10 + plotH - (d / maxD) * plotH,
    ]);
    const path = coords.map((c, i) => (i === 0 ? "M" : "L") + c[0] + "," + c[1]).join(" ");
    const color = isUniform ? MATH_GREEN : MATH_RED;
    return (
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        <line
          x1={padL}
          y1={10}
          x2={padL}
          y2={10 + plotH}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth={1}
        />
        <line
          x1={padL}
          y1={10 + plotH}
          x2={w - 5}
          y2={10 + plotH}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth={1}
        />
        <path d={path} fill="none" stroke={color} strokeWidth={1.5} />
        {coords.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={2.5} fill={color} />
        ))}
      </svg>
    );
  };

  return (
    <div className="mt-4 flex flex-col items-center">
      <div className="flex flex-wrap justify-center gap-4">
        <div className="text-center">
          {miniGraph(goodPoints, true)}
          <div className="text-[10px]" style={{ color: MATH_GREEN }}>
            {goodLabel}
          </div>
        </div>
        <div className="text-center">
          {miniGraph(badPoints, false)}
          <div className="text-[10px]" style={{ color: MATH_RED }}>
            {badLabel}
          </div>
        </div>
      </div>
      {caption && <p className="mt-2 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}

/**
 * A rising line (accelerating) joined to a falling line (decelerating) on
 * one simple speed-time graph. Ports buildSpeedTimeRamp exactly (static
 * geometry).
 */
export function SpeedTimeRampDiagram({
  acceleratingLabel,
  deceleratingLabel,
  caption,
}: {
  acceleratingLabel: string;
  deceleratingLabel: string;
  caption?: string;
}) {
  const w = 250;
  const h = 110;
  const padL = 30;
  const padB = 20;
  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[280px]">
        <line
          x1={padL}
          y1={15}
          x2={padL}
          y2={h - padB}
          stroke="rgba(255,255,255,0.25)"
          strokeWidth={1.3}
        />
        <line
          x1={padL}
          y1={h - padB}
          x2={w - 15}
          y2={h - padB}
          stroke="rgba(255,255,255,0.25)"
          strokeWidth={1.3}
        />
        <path d={`M${padL},${h - padB} L110,15`} stroke={MATH_GREEN} strokeWidth={2} fill="none" />
        <path d={`M110,15 L235,${h - padB}`} stroke={MATH_RED} strokeWidth={2} fill="none" />
        <text
          x={70}
          y={h - padB + 14}
          fontSize={9}
          fill={MATH_GREEN}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {acceleratingLabel}
        </text>
        <text
          x={175}
          y={h - padB + 14}
          fontSize={9}
          fill={MATH_RED}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {deceleratingLabel}
        </text>
      </svg>
      {caption && <p className="mt-2.5 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}
