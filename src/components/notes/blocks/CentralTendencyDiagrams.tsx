import { MATH_AMBER, MATH_GREEN, MATH_RED, MATH_VIOLET } from "./mathTheme";

const FONT = "'Space Grotesk', sans-serif";

/**
 * A small flowchart teaching WHICH measure of central tendency fits a
 * situation — category data? → mode; extreme value? → median; else → mean.
 * Ports buildDecisionTree's geometry exactly (a genuine branching flowchart,
 * not a static image, per Chapter 12's design brief).
 */
export function DecisionTree({
  categoryLabel,
  useModeLabel,
  extremeLabel,
  useMedianLabel,
  useMeanLabel,
  yesLabel,
  noLabel,
  caption,
}: {
  categoryLabel: string;
  useModeLabel: string;
  extremeLabel: string;
  useMedianLabel: string;
  useMeanLabel: string;
  yesLabel: string;
  noLabel: string;
  caption?: string;
}) {
  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 260 160" className="w-full max-w-[320px]">
        <rect
          x={90}
          y={8}
          width={80}
          height={30}
          rx={6}
          fill="rgba(139,107,255,0.15)"
          stroke={MATH_VIOLET}
          strokeWidth={1.3}
        />
        <text
          x={130}
          y={27}
          fontSize={9.5}
          fill="#fff"
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {categoryLabel}
        </text>

        <line x1={115} y1={38} x2={55} y2={65} stroke="#6b7593" strokeWidth={1.2} />
        <text x={78} y={52} fontSize={8.5} fill={MATH_GREEN} fontFamily={FONT} fontWeight={700}>
          {yesLabel}
        </text>
        <rect
          x={10}
          y={65}
          width={90}
          height={26}
          rx={6}
          fill="rgba(255,185,55,0.18)"
          stroke={MATH_AMBER}
          strokeWidth={1.3}
        />
        <text
          x={55}
          y={82}
          fontSize={10}
          fill="#fff"
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {useModeLabel}
        </text>

        <line x1={145} y1={38} x2={180} y2={65} stroke="#6b7593" strokeWidth={1.2} />
        <text x={165} y={52} fontSize={8.5} fill={MATH_RED} fontFamily={FONT} fontWeight={700}>
          {noLabel}
        </text>
        <rect
          x={140}
          y={65}
          width={100}
          height={30}
          rx={6}
          fill="rgba(139,107,255,0.15)"
          stroke={MATH_VIOLET}
          strokeWidth={1.3}
        />
        <text
          x={190}
          y={84}
          fontSize={9.5}
          fill="#fff"
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {extremeLabel}
        </text>

        <line x1={165} y1={95} x2={140} y2={120} stroke="#6b7593" strokeWidth={1.2} />
        <text x={145} y={112} fontSize={8.5} fill={MATH_GREEN} fontFamily={FONT} fontWeight={700}>
          {yesLabel}
        </text>
        <rect
          x={95}
          y={120}
          width={90}
          height={26}
          rx={6}
          fill="rgba(74,222,128,0.18)"
          stroke={MATH_GREEN}
          strokeWidth={1.3}
        />
        <text
          x={140}
          y={137}
          fontSize={10}
          fill="#fff"
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {useMedianLabel}
        </text>

        <line x1={215} y1={95} x2={230} y2={120} stroke="#6b7593" strokeWidth={1.2} />
        <text x={222} y={112} fontSize={8.5} fill={MATH_RED} fontFamily={FONT} fontWeight={700}>
          {noLabel}
        </text>
        <rect
          x={195}
          y={120}
          width={65}
          height={26}
          rx={6}
          fill="rgba(248,113,113,0.18)"
          stroke={MATH_RED}
          strokeWidth={1.3}
        />
        <text
          x={227}
          y={137}
          fontSize={10}
          fill="#fff"
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {useMeanLabel}
        </text>
      </svg>
      {caption && <p className="mt-2 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}
