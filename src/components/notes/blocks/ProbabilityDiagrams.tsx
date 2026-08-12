import { MATH_AMBER, MATH_GREEN, MATH_RED } from "./mathTheme";

const FONT = "'Space Grotesk', sans-serif";

/**
 * The textbook's own 0-to-1 probability scale: red "won't happen" at 0,
 * amber "50/50" at 0.5, green "will happen" at 1. Ports buildProbLine
 * exactly (static geometry).
 */
export function ProbabilityNumberLine({
  wontHappenLabel,
  fiftyFiftyLabel,
  willHappenLabel,
}: {
  wontHappenLabel: string;
  fiftyFiftyLabel: string;
  willHappenLabel: string;
}) {
  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 260 60" className="w-full max-w-[320px]">
        <line x1={30} y1={30} x2={230} y2={30} stroke="#fff" strokeWidth={1.5} />
        <circle cx={30} cy={30} r={4} fill={MATH_RED} />
        <circle cx={130} cy={30} r={4} fill={MATH_AMBER} />
        <circle cx={230} cy={30} r={4} fill={MATH_GREEN} />
        <text
          x={30}
          y={48}
          fontSize={9.5}
          fill={MATH_RED}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          0
        </text>
        <text
          x={130}
          y={48}
          fontSize={9.5}
          fill={MATH_AMBER}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          0.5
        </text>
        <text
          x={230}
          y={48}
          fontSize={9.5}
          fill={MATH_GREEN}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          1
        </text>
        <text x={30} y={14} fontSize={8.5} fill={MATH_RED} textAnchor="middle" fontFamily={FONT}>
          {wontHappenLabel}
        </text>
        <text x={130} y={14} fontSize={8.5} fill={MATH_AMBER} textAnchor="middle" fontFamily={FONT}>
          {fiftyFiftyLabel}
        </text>
        <text x={230} y={14} fontSize={8.5} fill={MATH_GREEN} textAnchor="middle" fontFamily={FONT}>
          {willHappenLabel}
        </text>
      </svg>
    </div>
  );
}

/**
 * The full 6×6 grid of dice-sum combinations with the target sum
 * highlighted — makes "favourable outcomes over total outcomes" concrete.
 * Ports buildDiceGrid's generation logic exactly: for two dice 1-6, exactly
 * 4 of the 36 combinations sum to 5, and 6 of the 36 sum to more than 9 —
 * good regression checks if this generation logic is ever touched.
 */
export function DiceSampleGrid({ targetSum, caption }: { targetSum: number; caption?: string }) {
  const cell = 24;
  const ox = 25;
  const oy = 15;
  const cells: { x: number; y: number; sum: number }[] = [];
  for (let d1 = 1; d1 <= 6; d1++) {
    for (let d2 = 1; d2 <= 6; d2++) {
      cells.push({ x: ox + (d2 - 1) * cell, y: oy + (d1 - 1) * cell, sum: d1 + d2 });
    }
  }
  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 220 180" className="w-full max-w-[260px]">
        {cells.map(({ x, y, sum }, i) => {
          const isTarget = sum === targetSum;
          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width={cell - 1}
                height={cell - 1}
                fill={isTarget ? "rgba(255,185,55,0.35)" : "rgba(139,107,255,0.08)"}
                stroke={isTarget ? MATH_AMBER : "rgba(255,255,255,0.15)"}
                strokeWidth={1}
              />
              <text
                x={x + cell / 2}
                y={y + cell / 2 + 3}
                fontSize={8.5}
                fill="#fff"
                textAnchor="middle"
                fontFamily={FONT}
              >
                {sum}
              </text>
            </g>
          );
        })}
      </svg>
      {caption && <p className="mt-2 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}
