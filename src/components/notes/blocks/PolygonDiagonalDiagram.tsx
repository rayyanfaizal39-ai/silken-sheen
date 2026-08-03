import { MATH_VIOLET } from "./mathTheme";

/**
 * Regular n-gon with vertices dotted and ALL diagonals drawn, plus a live
 * diagonal count computed from n — parameterized (unlike the other Chapter
 * 8/9 diagrams) since worked examples and practice reference different
 * polygon sizes. Diagonal-counting algorithm ports buildPolygonDiagram
 * exactly: verified against n(n−3)/2 for n=4..10.
 */
export function PolygonDiagonalDiagram({
  n,
  countLabel,
  caption,
}: {
  n: number;
  countLabel: string;
  caption?: string;
}) {
  const cx = 130;
  const cy = 95;
  const r = 70;
  const pts: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    pts.push([cx + r * Math.cos(angle), cy + r * Math.sin(angle)]);
  }

  const sides: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let i = 0; i < n; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[(i + 1) % n];
    sides.push({ x1, y1, x2, y2 });
  }

  const diagonals: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 2; j < n; j++) {
      if (i === 0 && j === n - 1) continue; // skip the side that wraps around
      const [x1, y1] = pts[i];
      const [x2, y2] = pts[j];
      diagonals.push({ x1, y1, x2, y2 });
    }
  }
  const diagCount = diagonals.length;

  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 260 190" className="w-full max-w-[260px]">
        {diagonals.map((d, i) => (
          <line
            key={`d${i}`}
            x1={d.x1}
            y1={d.y1}
            x2={d.x2}
            y2={d.y2}
            stroke="rgba(139,107,255,0.4)"
            strokeWidth={1}
          />
        ))}
        {sides.map((s, i) => (
          <line
            key={`s${i}`}
            x1={s.x1}
            y1={s.y1}
            x2={s.x2}
            y2={s.y2}
            stroke="#fff"
            strokeWidth={2}
          />
        ))}
        {pts.map(([px, py], i) => (
          <circle key={`p${i}`} cx={px} cy={py} r={4} fill={MATH_VIOLET} />
        ))}
        <text
          x={130}
          y={180}
          fontSize={13}
          fill="#fff"
          textAnchor="middle"
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight={700}
        >
          n={n}: {diagCount} {countLabel}
        </text>
      </svg>
      {caption && <p className="mt-2.5 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}
