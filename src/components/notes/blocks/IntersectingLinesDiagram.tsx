import { MATH_GREEN, MATH_VIOLET } from "./mathTheme";

/**
 * Two crossing lines at a fixed angle with 4 labeled angle positions
 * (a, b, c, d) — teaches vertically-opposite (equal, shown in green/white
 * pairs) and adjacent (supplementary) angle relationships. Static
 * per-instance illustration, not parameterized by live angle values.
 */
export function IntersectingLinesDiagram({ caption }: { caption?: string }) {
  const cx = 130;
  const cy = 90;
  const r = 75;
  const angleDeg = 55;
  const pt = (deg: number): [number, number] => {
    const rad = (deg * Math.PI) / 180;
    return [cx + r * Math.cos(rad), cy - r * Math.sin(rad)];
  };
  const [p1x, p1y] = pt(angleDeg);
  const [p2x, p2y] = pt(angleDeg + 180);
  const [p3x, p3y] = pt(0);
  const [p4x, p4y] = pt(180);

  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 260 180" className="w-full max-w-[260px]">
        <line x1={p3x} y1={p3y} x2={p4x} y2={p4y} stroke="rgba(255,255,255,0.5)" strokeWidth={2} />
        <line x1={p1x} y1={p1y} x2={p2x} y2={p2y} stroke={MATH_VIOLET} strokeWidth={2} />
        <circle cx={cx} cy={cy} r={3} fill="#fff" />
        <text
          x={cx + 40}
          y={cy - 20}
          fontSize={15}
          fill={MATH_GREEN}
          textAnchor="middle"
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight={700}
        >
          a
        </text>
        <text
          x={cx - 40}
          y={cy - 8}
          fontSize={15}
          fill="#fff"
          textAnchor="middle"
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight={700}
        >
          b
        </text>
        <text
          x={cx - 40}
          y={cy + 30}
          fontSize={15}
          fill={MATH_GREEN}
          textAnchor="middle"
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight={700}
        >
          c
        </text>
        <text
          x={cx + 40}
          y={cy + 18}
          fontSize={15}
          fill="#fff"
          textAnchor="middle"
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight={700}
        >
          d
        </text>
      </svg>
      {caption && <p className="mt-2.5 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}
