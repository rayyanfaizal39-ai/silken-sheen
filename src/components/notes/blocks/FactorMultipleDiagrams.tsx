import { MATH_AMBER, MATH_BLUE, MATH_VIOLET } from "./mathTheme";

const PURPLE = "#b57bff";
const FONT = "'Space Grotesk', sans-serif";

/** Dot array showing n as a rows×cols grid — one way to arrange n objects with no leftover. Ports buildArrayGrid. */
export function ArrayGridDiagram({
  n,
  rows,
  cols,
  caption,
}: {
  n: number;
  rows: number;
  cols: number;
  caption?: string;
}) {
  const cell = 34;
  const pad = 20;
  const w = cols * cell + pad * 2;
  const h = rows * cell + pad * 2 + 30;
  const dots: { cx: number; cy: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dots.push({ cx: pad + c * cell + cell / 2, cy: pad + r * cell + cell / 2 });
    }
  }

  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[220px]">
        {dots.map((d, i) => (
          <circle
            key={i}
            cx={d.cx}
            cy={d.cy}
            r={10}
            fill="rgba(139,107,255,0.25)"
            stroke={MATH_VIOLET}
            strokeWidth={1.5}
          />
        ))}
        <text
          x={w / 2}
          y={h - 8}
          fontSize={13}
          fill="#fff"
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {rows} × {cols} = {n}
        </text>
      </svg>
      {caption && <p className="mt-2.5 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}

/**
 * Two overlapping circles: factors of 18 and 24, with the shared factors
 * (and HCF) in the overlap. Static — always this exact example. Ports
 * buildVennHCF exactly.
 */
export function VennHCFDiagram({ caption }: { caption?: string }) {
  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 400 220" className="w-full max-w-[400px]">
        <circle
          cx={150}
          cy={110}
          r={90}
          fill="rgba(77,124,254,0.12)"
          stroke={MATH_BLUE}
          strokeWidth={1.5}
        />
        <circle
          cx={250}
          cy={110}
          r={90}
          fill="rgba(181,123,255,0.12)"
          stroke={PURPLE}
          strokeWidth={1.5}
        />
        <text x={95} y={60} fontSize={12} fill={MATH_BLUE} fontFamily={FONT} fontWeight={700}>
          18
        </text>
        <text x={90} y={120} fontSize={11} fill="#fff" fontFamily={FONT}>
          1, 2,
        </text>
        <text x={90} y={138} fontSize={11} fill="#fff" fontFamily={FONT}>
          9, 18
        </text>
        <text x={290} y={60} fontSize={12} fill={PURPLE} fontFamily={FONT} fontWeight={700}>
          24
        </text>
        <text x={270} y={120} fontSize={11} fill="#fff" fontFamily={FONT}>
          4, 8,
        </text>
        <text x={270} y={138} fontSize={11} fill="#fff" fontFamily={FONT}>
          12, 24
        </text>
        <text
          x={178}
          y={105}
          fontSize={11.5}
          fill="#fff"
          fontFamily={FONT}
          fontWeight={700}
          textAnchor="middle"
        >
          1, 2, 3,
        </text>
        <text
          x={178}
          y={123}
          fontSize={11.5}
          fill={MATH_AMBER}
          fontFamily={FONT}
          fontWeight={700}
          textAnchor="middle"
        >
          6 = HCF
        </text>
        <text x={200} y={20} fontSize={12.5} fill="#6b7593" fontFamily={FONT} textAnchor="middle">
          Factors of 18 and 24
        </text>
      </svg>
      {caption && <p className="mt-2.5 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}

/**
 * Two rows of multiples (of 6 and of 8) with the first shared value (24 —
 * the LCM) highlighted in amber where the rows align. Static — always this
 * exact example. Ports buildMultiplesTimeline exactly.
 */
export function MultiplesTimelineDiagram({ caption }: { caption?: string }) {
  const w = 620;
  const h = 130;
  const pad = 30;
  const stepW = (w - 2 * pad) / 6;
  const multsA = [6, 12, 18, 24, 30, 36];
  const multsB = [8, 16, 24, 32, 40, 48];
  const yA = 45;
  const yB = 95;
  const midX = pad + 3 * stepW + stepW / 2;

  return (
    <div className="mt-4 flex flex-col items-center">
      <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 ${w} ${h}`} className="mx-auto block" style={{ width: w, height: h }}>
          <line
            x1={pad}
            y1={yA}
            x2={w - pad}
            y2={yA}
            stroke="rgba(77,124,254,0.3)"
            strokeWidth={2}
          />
          <line
            x1={pad}
            y1={yB}
            x2={w - pad}
            y2={yB}
            stroke="rgba(181,123,255,0.3)"
            strokeWidth={2}
          />
          {multsA.map((v, i) => {
            const x = pad + i * stepW + stepW / 2;
            const isLCM = v === 24;
            return (
              <g key={v}>
                <circle
                  cx={x}
                  cy={yA}
                  r={15}
                  fill={isLCM ? "rgba(255,185,55,0.25)" : "rgba(77,124,254,0.2)"}
                  stroke={isLCM ? MATH_AMBER : MATH_BLUE}
                  strokeWidth={1.5}
                />
                <text
                  x={x}
                  y={yA + 4}
                  fontSize={11.5}
                  fill="#fff"
                  textAnchor="middle"
                  fontFamily={FONT}
                  fontWeight={700}
                >
                  {v}
                </text>
              </g>
            );
          })}
          {multsB.map((v, i) => {
            const x = pad + i * stepW + stepW / 2;
            const isLCM = v === 24;
            return (
              <g key={v}>
                <circle
                  cx={x}
                  cy={yB}
                  r={15}
                  fill={isLCM ? "rgba(255,185,55,0.25)" : "rgba(181,123,255,0.2)"}
                  stroke={isLCM ? MATH_AMBER : PURPLE}
                  strokeWidth={1.5}
                />
                <text
                  x={x}
                  y={yB + 4}
                  fontSize={11.5}
                  fill="#fff"
                  textAnchor="middle"
                  fontFamily={FONT}
                  fontWeight={700}
                >
                  {v}
                </text>
              </g>
            );
          })}
          <line
            x1={midX}
            y1={yA + 18}
            x2={midX}
            y2={yB - 18}
            stroke={MATH_AMBER}
            strokeWidth={1.5}
            strokeDasharray="3,3"
          />
          <text
            x={pad - 10}
            y={yA + 4}
            fontSize={11}
            fill={MATH_BLUE}
            textAnchor="end"
            fontFamily={FONT}
          >
            ×6
          </text>
          <text
            x={pad - 10}
            y={yB + 4}
            fontSize={11}
            fill={PURPLE}
            textAnchor="end"
            fontFamily={FONT}
          >
            ×8
          </text>
        </svg>
      </div>
      {caption && <p className="mt-2.5 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}
