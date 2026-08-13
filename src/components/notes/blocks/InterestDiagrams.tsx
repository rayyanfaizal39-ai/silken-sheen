import { MATH_AMBER, MATH_GREEN, MATH_VIOLET } from "./mathTheme";

const FONT = "'Space Grotesk', sans-serif";

/**
 * Genuinely computes simple vs compound interest year-by-year in JS and
 * renders them as a bar chart — not hardcoded bar heights. Implemented
 * generically (principal, rate, years) so it can be reused for other
 * principal/rate combinations beyond the mockup's RM1000-at-5%-over-5-years
 * example. The point of the visual is that compound interest visibly
 * accelerates ahead of simple interest each year — that divergence falls
 * out of the real math below, it isn't drawn by hand. Ports
 * buildInterestCompare's layout formula exactly.
 */
export function InterestGrowthChart({
  principal,
  rate,
  years,
  simpleLabel,
  compoundLabel,
  yearAbbrev,
  caption,
}: {
  principal: number;
  /** Annual rate as a decimal, e.g. 0.05 for 5%. */
  rate: number;
  years: number;
  simpleLabel: string;
  compoundLabel: string;
  /** Short per-bar axis label, e.g. "Yr" or "Th". */
  yearAbbrev: string;
  caption?: string;
}) {
  const simple: number[] = [];
  const compound: number[] = [];
  for (let t = 1; t <= years; t++) {
    simple.push(principal + principal * rate * t);
    compound.push(principal * Math.pow(1 + rate, t));
  }

  const w = 260;
  const h = 140;
  const padL = 30;
  const padB = 20;
  const padT = 10;
  const plotW = w - padL - 10;
  const plotH = h - padT - padB;
  const maxV = Math.max(...compound);
  const barW = plotW / years / 2.4;

  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[320px]">
        <line
          x1={padL}
          y1={padT + plotH}
          x2={w - 10}
          y2={padT + plotH}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth={1}
        />
        {Array.from({ length: years }, (_, i) => {
          const gx = padL + i * (plotW / years);
          const sH = (simple[i] / maxV) * plotH;
          const cH = (compound[i] / maxV) * plotH;
          return (
            <g key={i}>
              <rect
                x={gx}
                y={padT + plotH - sH}
                width={barW}
                height={sH}
                fill="rgba(255,185,55,0.4)"
                stroke={MATH_AMBER}
                strokeWidth={1}
              />
              <rect
                x={gx + barW + 2}
                y={padT + plotH - cH}
                width={barW}
                height={cH}
                fill="rgba(74,222,128,0.4)"
                stroke={MATH_GREEN}
                strokeWidth={1}
              />
              <text
                x={gx + barW}
                y={padT + plotH + 13}
                fontSize={8}
                fill="#6b7593"
                textAnchor="middle"
                fontFamily={FONT}
              >
                {yearAbbrev}
                {i + 1}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="mt-1.5 flex w-full max-w-[320px] justify-center gap-5">
        <span className="text-[11px] font-semibold" style={{ color: MATH_AMBER }}>
          ▮ {simpleLabel}
        </span>
        <span className="text-[11px] font-semibold" style={{ color: MATH_GREEN }}>
          ▮ {compoundLabel}
        </span>
      </div>
      {caption && <p className="mt-2 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}

function arrowHead(x1: number, y1: number, x2: number, y2: number, size = 5): string {
  const backAngle = Math.atan2(y2 - y1, x2 - x1) + Math.PI;
  const spread = 0.5;
  const c1x = x2 + size * Math.cos(backAngle + spread);
  const c1y = y2 + size * Math.sin(backAngle + spread);
  const c2x = x2 + size * Math.cos(backAngle - spread);
  const c2y = y2 + size * Math.sin(backAngle - spread);
  return `${x2},${y2} ${c1x},${c1y} ${c2x},${c2y}`;
}

/**
 * A simple three-box flow (You → Bank → Seller) showing the bank pays the
 * seller immediately while you repay the bank later — what "credit" and
 * "debt" concretely mean. Arrowheads are plain polygons rather than SVG
 * <marker> defs so their ids can't collide if reused. Ports
 * buildCreditFlow's geometry exactly.
 */
export function CreditFlowDiagram({
  youLabel,
  bankLabel,
  sellerLabel,
  repayLaterLabel,
  paysNowLabel,
  caption,
}: {
  youLabel: string;
  bankLabel: string;
  sellerLabel: string;
  repayLaterLabel: string;
  paysNowLabel: string;
  caption?: string;
}) {
  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 260 100" className="w-full max-w-[320px]">
        <rect
          x={10}
          y={35}
          width={60}
          height={30}
          rx={6}
          fill="rgba(139,107,255,0.18)"
          stroke={MATH_VIOLET}
          strokeWidth={1.3}
        />
        <text
          x={40}
          y={54}
          fontSize={10}
          fill="#fff"
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {youLabel}
        </text>
        <rect
          x={100}
          y={35}
          width={60}
          height={30}
          rx={6}
          fill="rgba(255,185,55,0.18)"
          stroke={MATH_AMBER}
          strokeWidth={1.3}
        />
        <text
          x={130}
          y={54}
          fontSize={10}
          fill="#fff"
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {bankLabel}
        </text>
        <rect
          x={190}
          y={35}
          width={60}
          height={30}
          rx={6}
          fill="rgba(74,222,128,0.18)"
          stroke={MATH_GREEN}
          strokeWidth={1.3}
        />
        <text
          x={220}
          y={54}
          fontSize={10}
          fill="#fff"
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {sellerLabel}
        </text>
        <path d="M100,42 L74,42" stroke={MATH_AMBER} strokeWidth={1.3} />
        <polygon points={arrowHead(100, 42, 72, 42)} fill={MATH_AMBER} />
        <text x={86} y={35} fontSize={7.5} fill={MATH_AMBER} textAnchor="middle" fontFamily={FONT}>
          {repayLaterLabel}
        </text>
        <path d="M160,55 L186,55" stroke={MATH_GREEN} strokeWidth={1.3} />
        <polygon points={arrowHead(160, 55, 188, 55)} fill={MATH_GREEN} />
        <text x={174} y={70} fontSize={7.5} fill={MATH_GREEN} textAnchor="middle" fontFamily={FONT}>
          {paysNowLabel}
        </text>
      </svg>
      {caption && <p className="mt-2 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}
