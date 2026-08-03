import { MATH_VIOLET } from "./mathTheme";

/**
 * Number line for a single-boundary inequality — open circle (◯) for strict
 * (not inclusive), filled circle (●) for ≥/≤ (inclusive), shaded ray in the
 * given direction. Shares NumberLine.tsx's SVG coordinate conventions
 * (640×90 viewBox, pad 30, y 40) but draws a ray + circle instead of point
 * marks. Always visible — no reveal button (matches how it's used inline in
 * lesson intros and worked examples).
 */
export function InequalityNumberLine({
  boundary,
  direction,
  inclusive,
  min,
  max,
  label,
}: {
  boundary: number;
  direction: "gt" | "lt";
  inclusive: boolean;
  min: number;
  max: number;
  label?: string;
}) {
  const width = 640;
  const pad = 30;
  const y = 40;
  const scale = (width - 2 * pad) / (max - min);
  const x = (v: number) => pad + (v - min) * scale;
  const ticks: number[] = [];
  for (let i = Math.ceil(min); i <= Math.floor(max); i++) ticks.push(i);

  const bx = x(boundary);
  const rayX1 = direction === "gt" ? bx : pad;
  const rayX2 = direction === "gt" ? width - pad : bx;
  const arrowX = direction === "gt" ? width - pad : pad;
  const arrowDir = direction === "gt" ? 1 : -1;

  return (
    <div className="mt-4 flex flex-col items-center">
      <div className="w-full overflow-x-auto">
        <svg width={width} height={90} viewBox={`0 0 ${width} 90`} className="mx-auto block">
          <line
            x1={pad}
            y1={y}
            x2={width - pad}
            y2={y}
            stroke="rgba(255,255,255,0.15)"
            strokeWidth={2}
          />
          {ticks.map((i) => (
            <g key={i}>
              <line
                x1={x(i)}
                y1={y - 5}
                x2={x(i)}
                y2={y + 5}
                stroke="rgba(255,255,255,0.3)"
                strokeWidth={1.5}
              />
              <text
                x={x(i)}
                y={y + 22}
                fontSize={11}
                fill="#6b7593"
                textAnchor="middle"
                fontFamily="'Space Grotesk', sans-serif"
              >
                {i}
              </text>
            </g>
          ))}
          <line x1={rayX1} y1={y} x2={rayX2} y2={y} stroke={MATH_VIOLET} strokeWidth={4} />
          <path
            d={`M${arrowX - 10 * arrowDir},${y - 6} L${arrowX},${y} L${arrowX - 10 * arrowDir},${y + 6}`}
            stroke={MATH_VIOLET}
            strokeWidth={3}
            fill="none"
            strokeLinecap="round"
          />
          <circle
            cx={bx}
            cy={y}
            r={8}
            fill={inclusive ? MATH_VIOLET : "none"}
            stroke={MATH_VIOLET}
            strokeWidth={2.5}
          />
        </svg>
      </div>
      {label && <p className="mt-2.5 text-center text-[11.5px] text-slate-500">{label}</p>}
    </div>
  );
}
