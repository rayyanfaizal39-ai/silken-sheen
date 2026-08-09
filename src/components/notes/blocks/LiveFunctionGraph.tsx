import { MATH_GREEN, MATH_VIOLET } from "./mathTheme";

const FONT = "'Space Grotesk', sans-serif";

/**
 * Generic function-graph plotter: computes points from an actual JS
 * function over an integer x-range and plots them — never hardcoded
 * coordinates. Works for linear, quadratic, cubic, or any other shape by
 * passing a different `fn` in. Ports buildFunctionGraph exactly.
 */
export function LiveFunctionGraph({
  fn,
  xMin,
  xMax,
  caption,
}: {
  fn: (x: number) => number;
  xMin: number;
  xMax: number;
  caption?: string;
}) {
  const w = 280;
  const h = 200;
  const padL = 35;
  const padR = 15;
  const padT = 15;
  const padB = 30;
  const plotW = w - padL - padR;
  const plotH = h - padT - padB;

  const points: { x: number; y: number }[] = [];
  for (let x = xMin; x <= xMax; x++) points.push({ x, y: fn(x) });
  const yMin = Math.min(...points.map((p) => p.y));
  const yMax = Math.max(...points.map((p) => p.y));
  const xScale = plotW / (xMax - xMin);
  const yScale = plotH / (yMax - yMin || 1);
  const coords = points.map((p) => [
    padL + (p.x - xMin) * xScale,
    padT + plotH - (p.y - yMin) * yScale,
  ]);
  const path = coords.map((c, i) => (i === 0 ? "M" : "L") + c[0] + "," + c[1]).join(" ");
  const zeroX = padL + (0 - xMin) * xScale;
  const zeroY = padT + plotH - (0 - yMin) * yScale;

  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[300px]">
        <line
          x1={padL}
          y1={zeroY}
          x2={w - padR}
          y2={zeroY}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth={1}
        />
        <line
          x1={zeroX}
          y1={padT}
          x2={zeroX}
          y2={padT + plotH}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth={1}
        />
        <path d={path} fill="none" stroke={MATH_GREEN} strokeWidth={2} />
        {coords.map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r={3.5} fill={MATH_VIOLET} />
            <text
              x={cx}
              y={h - 8}
              fontSize={8}
              fill="#6b7593"
              textAnchor="middle"
              fontFamily={FONT}
            >
              {points[i].x}
            </text>
          </g>
        ))}
      </svg>
      {caption && <p className="mt-2.5 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}
