import { MATH_AMBER, MATH_GREEN, MATH_RED, MATH_VIOLET } from "./mathTheme";

const FONT = "'Space Grotesk', sans-serif";

/**
 * Repeated multiplication collapsing into index form (e.g. 4×4×4 → 4³),
 * with the factor count becoming the index. Small reusable primitive —
 * plain strings in, so later index-related content (e.g. Chapter 2's
 * standard form work) can reuse it for a different base/expression. Ports
 * buildIndexCollapse's geometry exactly.
 */
export function IndexCollapse({
  expression,
  base,
  index,
  factorCountLabel,
  baseIndexLabel,
  caption,
}: {
  expression: string;
  base: string;
  index: string;
  factorCountLabel: string;
  baseIndexLabel: string;
  caption?: string;
}) {
  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 260 70" className="w-full max-w-[320px]">
        <text x={10} y={42} fontSize={18} fill="#fff" fontFamily={FONT} fontWeight={700}>
          {expression}
        </text>
        <text x={120} y={42} fontSize={16} fill="#6b7593" fontFamily={FONT}>
          =
        </text>
        <text x={150} y={40} fontSize={22} fill={MATH_GREEN} fontFamily={FONT} fontWeight={700}>
          {base}
        </text>
        <text x={168} y={26} fontSize={14} fill={MATH_GREEN} fontFamily={FONT} fontWeight={700}>
          {index}
        </text>
        <text x={10} y={60} fontSize={9} fill="#6b7593" fontFamily={FONT}>
          {factorCountLabel}
        </text>
        <text x={150} y={60} fontSize={9} fill={MATH_GREEN} fontFamily={FONT}>
          {baseIndexLabel}
        </text>
      </svg>
      {caption && <p className="mt-2 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}

/**
 * Two groups of repeated factors visually merging into one larger group —
 * the proof for why aᵐ×aⁿ=aᵐ⁺ⁿ. Ports buildIndexCombine's geometry exactly.
 */
export function FactorCombine({
  leftLabel,
  rightLabel,
  resultLabel,
  caption,
}: {
  leftLabel: string;
  rightLabel: string;
  resultLabel: string;
  caption?: string;
}) {
  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 260 90" className="w-full max-w-[320px]">
        <rect
          x={10}
          y={15}
          width={70}
          height={26}
          rx={5}
          fill="rgba(139,107,255,0.2)"
          stroke={MATH_VIOLET}
          strokeWidth={1.3}
        />
        <text
          x={45}
          y={33}
          fontSize={12}
          fill="#fff"
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {leftLabel}
        </text>
        <text x={90} y={33} fontSize={14} fill="#6b7593" fontFamily={FONT}>
          ×
        </text>
        <rect
          x={100}
          y={15}
          width={70}
          height={26}
          rx={5}
          fill="rgba(74,222,128,0.2)"
          stroke={MATH_GREEN}
          strokeWidth={1.3}
        />
        <text
          x={135}
          y={33}
          fontSize={12}
          fill="#fff"
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {rightLabel}
        </text>
        <path d="M45,45 L45,60 L135,60 L135,45" fill="none" stroke={MATH_AMBER} strokeWidth={1.2} />
        <rect
          x={55}
          y={65}
          width={70}
          height={22}
          rx={5}
          fill="rgba(255,185,55,0.2)"
          stroke={MATH_AMBER}
          strokeWidth={1.3}
        />
        <text
          x={90}
          y={80}
          fontSize={12}
          fill="#fff"
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {resultLabel}
        </text>
      </svg>
      {caption && <p className="mt-2 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}

function arrowHead(x1: number, y1: number, x2: number, y2: number, size = 6): string {
  const backAngle = Math.atan2(y2 - y1, x2 - x1) + Math.PI;
  const spread = 0.45;
  const c1x = x2 + size * Math.cos(backAngle + spread);
  const c1y = y2 + size * Math.sin(backAngle + spread);
  const c2x = x2 + size * Math.cos(backAngle - spread);
  const c2y = y2 + size * Math.sin(backAngle - spread);
  return `${x2},${y2} ${c1x},${c1y} ${c2x},${c2y}`;
}

/**
 * A number flipping from above to below a fraction line with its exponent
 * sign flipping too — the proof for a⁻ⁿ=1/aⁿ. The arrowhead is drawn as a
 * plain polygon (not an SVG <marker>) so the id can't collide if this is
 * ever rendered more than once on a page. Ports buildNegIndexFlip's
 * geometry exactly.
 */
export function NegIndexFlip({
  baseLabel,
  exponentLabel,
  denominatorLabel,
  caption,
}: {
  baseLabel: string;
  exponentLabel: string;
  denominatorLabel: string;
  caption?: string;
}) {
  const arrowStart = { x: 35, y: 45 };
  const arrowEnd = { x: 115, y: 45 };
  const arrowCtrl = { x: 75, y: 75 };
  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 220 90" className="w-full max-w-[280px]">
        <text x={30} y={35} fontSize={18} fill={MATH_RED} fontFamily={FONT} fontWeight={700}>
          {baseLabel}
        </text>
        <text x={48} y={22} fontSize={12} fill={MATH_RED} fontFamily={FONT} fontWeight={700}>
          {exponentLabel}
        </text>
        <text x={80} y={35} fontSize={16} fill="#6b7593" fontFamily={FONT}>
          =
        </text>
        <line x1={105} y1={30} x2={150} y2={30} stroke="#fff" strokeWidth={1.5} />
        <text x={127} y={22} fontSize={14} fill="#fff" textAnchor="middle" fontFamily={FONT}>
          1
        </text>
        <text
          x={120}
          y={50}
          fontSize={16}
          fill={MATH_GREEN}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {denominatorLabel}
        </text>
        <path
          d={`M${arrowStart.x},${arrowStart.y} Q${arrowCtrl.x},${arrowCtrl.y} ${arrowEnd.x},${arrowEnd.y}`}
          fill="none"
          stroke={MATH_AMBER}
          strokeWidth={1.3}
          strokeDasharray="3,2"
        />
        <polygon
          points={arrowHead(arrowCtrl.x, arrowCtrl.y, arrowEnd.x, arrowEnd.y)}
          fill={MATH_AMBER}
        />
      </svg>
      {caption && <p className="mt-2 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}

/**
 * A simple ⁿ√a → a^(1/n) arrow diagram showing a root and a fractional
 * power are the same operation written two ways. Ports buildRootPower's
 * geometry exactly.
 */
export function RootPowerArrow({
  rootExpr,
  powerBase,
  powerExponent,
  sameValueLabel,
  caption,
}: {
  rootExpr: string;
  powerBase: string;
  powerExponent: string;
  sameValueLabel: string;
  caption?: string;
}) {
  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 240 70" className="w-full max-w-[300px]">
        <text x={20} y={42} fontSize={18} fill={MATH_VIOLET} fontFamily={FONT} fontWeight={700}>
          {rootExpr}
        </text>
        <path d="M65,35 L110,35" stroke="#6b7593" strokeWidth={1.5} />
        <polygon points={arrowHead(65, 35, 110, 35)} fill="#6b7593" />
        <text x={87} y={26} fontSize={9} fill="#6b7593" textAnchor="middle" fontFamily={FONT}>
          {sameValueLabel}
        </text>
        <text x={120} y={40} fontSize={18} fill={MATH_GREEN} fontFamily={FONT} fontWeight={700}>
          {powerBase}
        </text>
        <text x={135} y={26} fontSize={13} fill={MATH_GREEN} fontFamily={FONT} fontWeight={700}>
          {powerExponent}
        </text>
      </svg>
      {caption && <p className="mt-2 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}
