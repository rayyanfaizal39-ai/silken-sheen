import { MATH_AMBER, MATH_GREEN, MATH_RED } from "./mathTheme";

const FONT = "'Space Grotesk', sans-serif";

/**
 * A number with each digit color-coded red (doesn't count, e.g. leading
 * zeros) or green (counts as significant). Takes any digit string plus a
 * significance mask so it generalizes beyond the mockup's 0.005020
 * example. viewBox width is computed from the digit count (not hardcoded)
 * so longer numbers stay within bounds. Ports buildSigFig's per-character
 * layout exactly.
 */
export function SigFigHighlight({
  digits,
  significant,
  caption,
}: {
  /** Each character of the number, including the decimal point. */
  digits: string[];
  /** Same length as digits — true if that digit counts as significant. */
  significant: boolean[];
  caption?: string;
}) {
  const cellW = 24;
  const startX = 20;
  const width = startX + digits.length * cellW + 20;
  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox={`0 0 ${width} 60`} className="w-full max-w-[320px]">
        {digits.map((c, i) => {
          const color = c === "." ? "#fff" : significant[i] ? MATH_GREEN : MATH_RED;
          return (
            <text
              key={i}
              x={startX + i * cellW}
              y={40}
              fontSize={20}
              fill={color}
              textAnchor="middle"
              fontFamily={FONT}
              fontWeight={700}
            >
              {c}
            </text>
          );
        })}
      </svg>
      {caption && <p className="mt-2 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}

/**
 * A number's decimal point moving left or right with an arrow and a
 * "N places" label, landing on the A×10ⁿ form — the core visual proof for
 * standard form conversion. The arrow sits below the numbers (not between
 * them horizontally), so it works for both a positive-exponent example
 * (2805.3→2.8053×10³, decimal moves left) and a negative-exponent one
 * (0.00325→3.25×10⁻³, decimal moves right) just by swapping the labels.
 * Ports buildDecimalSlide's geometry exactly.
 */
export function DecimalSlide({
  fromValue,
  toValue,
  exponentLabel,
  placesLabel,
  caption,
}: {
  fromValue: string;
  toValue: string;
  /** e.g. "× 10³" or "× 10⁻³". */
  exponentLabel: string;
  /** e.g. "3 places left" or "3 places right". */
  placesLabel: string;
  caption?: string;
}) {
  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 260 80" className="w-full max-w-[320px]">
        <text x={20} y={35} fontSize={18} fill="#fff" fontFamily={FONT} fontWeight={700}>
          {fromValue}
        </text>
        <path
          d="M40,45 Q70,65 100,45"
          fill="none"
          stroke={MATH_AMBER}
          strokeWidth={1.3}
          strokeDasharray="3,2"
        />
        <polygon points="100,45 92,44 96,52" fill={MATH_AMBER} />
        <text x={70} y={65} fontSize={9} fill={MATH_AMBER} textAnchor="middle" fontFamily={FONT}>
          {placesLabel}
        </text>
        <text x={150} y={35} fontSize={18} fill={MATH_GREEN} fontFamily={FONT} fontWeight={700}>
          {toValue}
        </text>
        <text x={215} y={30} fontSize={12} fill={MATH_GREEN} fontFamily={FONT} fontWeight={700}>
          {exponentLabel}
        </text>
      </svg>
      {caption && <p className="mt-2 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}
