import { MATH_AMBER, MATH_GREEN, MATH_VIOLET } from "./mathTheme";

const FONT = "'Space Grotesk', sans-serif";

/**
 * A circle with a central angle at O (amber, labeled "2x") and the
 * circumference angle subtended by the same arc (green, labeled "x"),
 * visibly double. Letter/symbol labels only — no sentences — so nothing
 * needs per-language variants inside the SVG. Ports buildCentralAngle's
 * geometry exactly.
 */
export function CentralAngleDiagram({ caption }: { caption?: string }) {
  const cx = 130;
  const cy = 70;
  const r = 50;
  const pA = -Math.PI / 2 - 0.5;
  const rA = -Math.PI / 2 + 0.5;
  const px = cx + r * Math.cos(pA);
  const py = cy + r * Math.sin(pA);
  const rx = cx + r * Math.cos(rA);
  const ry = cy + r * Math.sin(rA);
  const qA = Math.PI / 2;
  const qx = cx + r * Math.cos(qA);
  const qy = cy + r * Math.sin(qA);

  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 260 150" className="w-full max-w-[300px]">
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="rgba(139,107,255,0.06)"
          stroke="#fff"
          strokeWidth={1.3}
        />
        <line x1={cx} y1={cy} x2={px} y2={py} stroke={MATH_AMBER} strokeWidth={1.5} />
        <line x1={cx} y1={cy} x2={rx} y2={ry} stroke={MATH_AMBER} strokeWidth={1.5} />
        <text
          x={cx}
          y={cy - 8}
          fontSize={10}
          fill={MATH_AMBER}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          2x
        </text>
        <line x1={qx} y1={qy} x2={px} y2={py} stroke={MATH_GREEN} strokeWidth={1.5} />
        <line x1={qx} y1={qy} x2={rx} y2={ry} stroke={MATH_GREEN} strokeWidth={1.5} />
        <text
          x={qx}
          y={qy - 8}
          fontSize={10}
          fill={MATH_GREEN}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          x
        </text>
        <circle cx={cx} cy={cy} r={2.5} fill={MATH_AMBER} />
        <text x={cx + 8} y={cy + 16} fontSize={8} fill="#6a7299" fontFamily={FONT}>
          O
        </text>
      </svg>
      {caption && <p className="mt-2 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}

/**
 * A cyclic quadrilateral PQRS with the two opposite-vertex pairs
 * colour-coded (P/R violet, Q/S green) so opposite pairs read visually at a
 * glance. Ports buildCyclicQuad's geometry exactly.
 */
export function CyclicQuadDiagram({ caption }: { caption?: string }) {
  const cx = 130;
  const cy = 75;
  const r = 55;
  const angles = [-Math.PI / 2 - 0.4, 0.3, Math.PI / 2 + 0.5, Math.PI + 0.6];
  const pts: [number, number][] = angles.map((a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  const labels = ["P", "Q", "R", "S"];
  const colors = [MATH_VIOLET, MATH_GREEN, MATH_VIOLET, MATH_GREEN];
  const poly = pts.map((p) => p.join(",")).join(" ");

  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 260 150" className="w-full max-w-[300px]">
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="rgba(139,107,255,0.06)"
          stroke="#fff"
          strokeWidth={1}
          strokeDasharray="2,2"
        />
        <polygon points={poly} fill="rgba(255,255,255,0.04)" stroke="#fff" strokeWidth={1.5} />
        {pts.map((p, i) => (
          <g key={i}>
            <circle cx={p[0]} cy={p[1]} r={3} fill={colors[i]} />
            <text
              x={p[0] + (p[0] > cx ? 10 : -10)}
              y={p[1] + (p[1] > cy ? 12 : -6)}
              fontSize={10}
              fill={colors[i]}
              textAnchor="middle"
              fontFamily={FONT}
              fontWeight={700}
            >
              {labels[i]}
            </text>
          </g>
        ))}
      </svg>
      {caption && <p className="mt-2 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}

/**
 * A circle with a radius meeting a tangent line at a right-angle marker —
 * the tangent-radius rule. `radiusLabel`/`tangentLabel` are short
 * already-translated words (e.g. "radius"/"jejari"), passed as props rather
 * than baked in, per the single-language-per-render SVG-text convention.
 * Ports buildTangentRadius's geometry exactly.
 */
export function TangentRadius({
  radiusLabel,
  tangentLabel,
  caption,
}: {
  radiusLabel: string;
  tangentLabel: string;
  caption?: string;
}) {
  const cx = 110;
  const cy = 75;
  const r = 45;
  const tx = cx + r;
  const ty = cy;

  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 260 150" className="w-full max-w-[300px]">
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="rgba(139,107,255,0.06)"
          stroke="#fff"
          strokeWidth={1.3}
        />
        <line x1={cx} y1={cy} x2={tx} y2={ty} stroke={MATH_VIOLET} strokeWidth={1.5} />
        <text
          x={cx + 20}
          y={cy - 6}
          fontSize={9}
          fill={MATH_VIOLET}
          fontFamily={FONT}
          fontWeight={700}
        >
          {radiusLabel}
        </text>
        <line x1={tx} y1={ty - 40} x2={tx} y2={ty + 40} stroke={MATH_GREEN} strokeWidth={1.5} />
        <text
          x={tx + 8}
          y={ty - 35}
          fontSize={9}
          fill={MATH_GREEN}
          fontFamily={FONT}
          fontWeight={700}
        >
          {tangentLabel}
        </text>
        <rect
          x={tx - 10}
          y={ty - 10}
          width={10}
          height={10}
          fill="none"
          stroke="#fff"
          strokeWidth={1}
        />
      </svg>
      {caption && <p className="mt-2 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}

/**
 * Two tangent segments from a single external point A, both visually equal
 * length. Tangent points are illustrative (approximate placement, not
 * computed to exact tangency) — same simplification as the mockup this
 * ports. Ports buildTwoTangent's geometry exactly.
 */
export function TwoTangentsDiagram({ caption }: { caption?: string }) {
  const cx = 90;
  const cy = 75;
  const r = 40;
  const ax = 200;
  const ay = 75;
  const bx = 110;
  const by = 38;
  const cxp = 110;
  const cyp = 112;

  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 260 150" className="w-full max-w-[300px]">
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="rgba(139,107,255,0.06)"
          stroke="#fff"
          strokeWidth={1.3}
        />
        <circle cx={cx} cy={cy} r={2.5} fill={MATH_AMBER} />
        <line x1={ax} y1={ay} x2={bx} y2={by} stroke={MATH_GREEN} strokeWidth={1.5} />
        <line x1={ax} y1={ay} x2={cxp} y2={cyp} stroke={MATH_GREEN} strokeWidth={1.5} />
        <circle cx={bx} cy={by} r={2.5} fill={MATH_GREEN} />
        <circle cx={cxp} cy={cyp} r={2.5} fill={MATH_GREEN} />
        <circle cx={ax} cy={ay} r={3} fill={MATH_VIOLET} />
        <text
          x={ax + 8}
          y={ay + 4}
          fontSize={10}
          fill={MATH_VIOLET}
          fontFamily={FONT}
          fontWeight={700}
        >
          A
        </text>
        <text
          x={bx - 4}
          y={by - 8}
          fontSize={9}
          fill={MATH_GREEN}
          fontFamily={FONT}
          fontWeight={700}
        >
          B
        </text>
        <text
          x={cxp - 4}
          y={cyp + 16}
          fontSize={9}
          fill={MATH_GREEN}
          fontFamily={FONT}
          fontWeight={700}
        >
          C
        </text>
      </svg>
      {caption && <p className="mt-2 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}
