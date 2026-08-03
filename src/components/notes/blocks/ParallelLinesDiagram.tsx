import { MATH_AMBER, MATH_GREEN, MATH_ORANGE } from "./mathTheme";

/**
 * Two parallel horizontal lines cut by a transversal, with 8 labeled angle
 * positions color-coded by relationship: same color = same relationship
 * (corresponding/alternate are equal, interior/co-interior sum to 180°).
 * Static per-instance illustration, not parameterized by live angle values.
 */
export function ParallelLinesDiagram({ caption }: { caption?: string }) {
  const w = 280;
  const h = 170;
  const y1 = 45;
  const y2 = 125;
  const x1 = 20;
  const x2 = 260;
  const tx1 = 70;
  const ty1 = 10;
  const tx2 = 210;
  const ty2 = 160;

  const labelStyle = {
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700,
    fontSize: 13,
  } as const;

  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[280px]">
        <line x1={x1} y1={y1} x2={x2} y2={y1} stroke="rgba(255,255,255,0.5)" strokeWidth={2} />
        <line x1={x1} y1={y2} x2={x2} y2={y2} stroke="rgba(255,255,255,0.5)" strokeWidth={2} />
        <line x1={tx1} y1={ty1} x2={tx2} y2={ty2} stroke="#8b6bff" strokeWidth={2} />
        <path d={`M${x1 + 10},${y1 - 6} l6,0`} stroke="#fff" strokeWidth={2} />
        <path d={`M${x1 + 10},${y2 - 6} l6,0`} stroke="#fff" strokeWidth={2} />
        <text x={118} y={34} fill={MATH_GREEN} {...labelStyle}>
          1
        </text>
        <text x={148} y={34} fill="#fff" {...labelStyle}>
          2
        </text>
        <text x={118} y={62} fill={MATH_AMBER} {...labelStyle}>
          3
        </text>
        <text x={148} y={62} fill={MATH_ORANGE} {...labelStyle}>
          4
        </text>
        <text x={158} y={112} fill={MATH_GREEN} {...labelStyle}>
          5
        </text>
        <text x={188} y={112} fill="#fff" {...labelStyle}>
          6
        </text>
        <text x={158} y={140} fill={MATH_AMBER} {...labelStyle}>
          7
        </text>
        <text x={188} y={140} fill={MATH_ORANGE} {...labelStyle}>
          8
        </text>
      </svg>
      {caption && <p className="mt-2.5 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}
