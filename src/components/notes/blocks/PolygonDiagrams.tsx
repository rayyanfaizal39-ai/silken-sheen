import { MATH_AMBER, MATH_GREEN, MATH_RED } from "./mathTheme";

const FONT = "'Space Grotesk', sans-serif";

function regularPolygonPoints(
  cx: number,
  cy: number,
  r: number,
  n: number,
  rot = -Math.PI / 2,
): [number, number][] {
  const pts: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    const a = rot + (i * 2 * Math.PI) / n;
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  return pts;
}

/**
 * A regular pentagon (equal sides AND angles) beside a visibly irregular
 * one — same number of sides, very different shapes. Ports buildRegularCompare
 * exactly (static geometry).
 */
export function RegularVsIrregularDiagram({
  regularLabel,
  irregularLabel,
  caption,
}: {
  regularLabel: string;
  irregularLabel: string;
  caption?: string;
}) {
  const reg = regularPolygonPoints(70, 60, 45, 5)
    .map((p) => p.join(","))
    .join(" ");
  const irreg = [
    [130, 20],
    [165, 45],
    [155, 90],
    [105, 95],
    [100, 45],
  ]
    .map(([x, y]) => [x + 30, y].join(","))
    .join(" ");
  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 260 120" className="w-full max-w-[290px]">
        <polygon points={reg} fill="rgba(74,222,128,0.15)" stroke={MATH_GREEN} strokeWidth={2} />
        <text
          x={70}
          y={112}
          fontSize={11}
          fill={MATH_GREEN}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {regularLabel}
        </text>
        <polygon points={irreg} fill="rgba(248,113,113,0.15)" stroke={MATH_RED} strokeWidth={2} />
        <text
          x={190}
          y={112}
          fontSize={11}
          fill={MATH_RED}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {irregularLabel}
        </text>
      </svg>
      {caption && <p className="mt-2.5 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}

/**
 * A regular n-gon fanned into triangles from one vertex — the visual proof
 * that the interior angle sum is (n−2)×180°. Ports buildTriangleFan,
 * generalized from its fixed pentagon (n=5) to any n. Only numerals and
 * math symbols appear inside the SVG (no words), so the diagram itself
 * needs no translation — the full sentence is the caller-supplied caption.
 */
export function TriangleFanDiagram({ n, caption }: { n: number; caption?: string }) {
  const cx = 130;
  const cy = 65;
  const r = 50;
  const pts = regularPolygonPoints(cx, cy, r, n);
  const fanLines: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let i = 2; i < n; i++) {
    fanLines.push({ x1: pts[0][0], y1: pts[0][1], x2: pts[i][0], y2: pts[i][1] });
  }
  const polyPts = pts.map((p) => p.join(",")).join(" ");
  const triangles = n - 2;
  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 260 130" className="w-full max-w-[290px]">
        <polygon points={polyPts} fill="rgba(139,107,255,0.1)" stroke="#fff" strokeWidth={2} />
        {fanLines.map((l, i) => (
          <line
            key={i}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            stroke={MATH_AMBER}
            strokeWidth={1.3}
            strokeDasharray="4,3"
          />
        ))}
        <text
          x={130}
          y={122}
          fontSize={12}
          fill={MATH_AMBER}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {triangles} × 180° = {triangles * 180}°
        </text>
      </svg>
      {caption && <p className="mt-2.5 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}

/**
 * A regular n-gon with a dot at each vertex and a turning arrow at one
 * corner — the visual proof that exterior angles always sum to 360°,
 * whatever the polygon. Ports buildWalkAround, generalized to any n.
 */
export function PolygonWalkAroundDiagram({ n, caption }: { n: number; caption?: string }) {
  const cx = 130;
  const cy = 65;
  const r = 50;
  const pts = regularPolygonPoints(cx, cy, r, n);
  const polyPts = pts.map((p) => p.join(",")).join(" ");
  const [p0x, p0y] = pts[0];
  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 260 130" className="w-full max-w-[290px]">
        <polygon points={polyPts} fill="none" stroke="#fff" strokeWidth={2} />
        {pts.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={3} fill={MATH_AMBER} />
        ))}
        <path
          d={`M${p0x},${p0y - 14} A14,14 0 0 1 ${p0x + 13},${p0y - 4}`}
          fill="none"
          stroke={MATH_AMBER}
          strokeWidth={1.5}
          markerEnd="url(#f2c4-turn-arrow)"
        />
        <defs>
          <marker
            id="f2c4-turn-arrow"
            markerWidth={7}
            markerHeight={7}
            refX={5}
            refY={2.5}
            orient="auto"
          >
            <path d="M0,0 L5,2.5 L0,5 Z" fill={MATH_AMBER} />
          </marker>
        </defs>
        <text
          x={130}
          y={122}
          fontSize={12}
          fill={MATH_AMBER}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          Σ = 360°
        </text>
      </svg>
      {caption && <p className="mt-2.5 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}
