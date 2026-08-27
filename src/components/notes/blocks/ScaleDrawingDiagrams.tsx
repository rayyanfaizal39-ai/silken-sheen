import { MATH_AMBER, MATH_GREEN, MATH_VIOLET } from "./mathTheme";

const FONT = "'Space Grotesk', sans-serif";

/**
 * Three same-shape squares at three different scales (1:2 smaller, 1:1
 * actual, 1:½ bigger), same angles preserved — the visual proof that scale
 * changes size but never shape. Ports buildScaleCompare's geometry exactly.
 */
export function ScaleCompareDiagram({
  smallerLabel,
  actualLabel,
  biggerLabel,
  caption,
}: {
  smallerLabel: string;
  actualLabel: string;
  biggerLabel: string;
  caption?: string;
}) {
  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 260 90" className="w-full max-w-[320px]">
        <rect
          x={15}
          y={30}
          width={30}
          height={30}
          fill="rgba(255,185,55,0.2)"
          stroke={MATH_AMBER}
          strokeWidth={1.5}
        />
        <text
          x={30}
          y={75}
          fontSize={9}
          fill={MATH_AMBER}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {smallerLabel}
        </text>
        <rect
          x={90}
          y={15}
          width={60}
          height={60}
          fill="rgba(91,227,176,0.15)"
          stroke={MATH_GREEN}
          strokeWidth={1.5}
        />
        <text
          x={120}
          y={83}
          fontSize={9}
          fill={MATH_GREEN}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {actualLabel}
        </text>
        <rect
          x={185}
          y={5}
          width={70}
          height={70}
          fill="rgba(139,107,255,0.12)"
          stroke={MATH_VIOLET}
          strokeWidth={1.5}
        />
        <text
          x={220}
          y={83}
          fontSize={9}
          fill={MATH_VIOLET}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {biggerLabel}
        </text>
      </svg>
      {caption && <p className="mt-2 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}
