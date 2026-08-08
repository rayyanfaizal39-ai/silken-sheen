import { MATH_GREEN, MATH_VIOLET } from "./mathTheme";

const FONT = "'Space Grotesk', sans-serif";

/**
 * A simple balanced scale — whatever action happens on one side happens on
 * the other, so it stays level. Visual anchor for "changing the subject of
 * a formula". Ports buildBalanceScale exactly; leftLabel/rightLabel are
 * plain math notation, identical in both languages.
 */
export function BalanceScaleDiagram({
  leftLabel = "b = 2s",
  rightLabel = "− m",
  caption,
}: {
  leftLabel?: string;
  rightLabel?: string;
  caption?: string;
}) {
  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 260 130" className="w-full max-w-[290px]">
        <line x1={130} y1={20} x2={130} y2={55} stroke="#fff" strokeWidth={3} />
        <line x1={40} y1={55} x2={220} y2={55} stroke="#fff" strokeWidth={3} />
        <line x1={40} y1={55} x2={40} y2={80} stroke="#fff" strokeWidth={1.5} />
        <line x1={220} y1={55} x2={220} y2={80} stroke="#fff" strokeWidth={1.5} />
        <rect
          x={10}
          y={80}
          width={60}
          height={30}
          rx={6}
          fill="rgba(139,107,255,0.18)"
          stroke={MATH_VIOLET}
          strokeWidth={1.5}
        />
        <text
          x={40}
          y={100}
          fontSize={13}
          fill="#fff"
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {leftLabel}
        </text>
        <rect
          x={190}
          y={80}
          width={60}
          height={30}
          rx={6}
          fill="rgba(74,222,128,0.18)"
          stroke={MATH_GREEN}
          strokeWidth={1.5}
        />
        <text
          x={220}
          y={100}
          fontSize={13}
          fill="#fff"
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {rightLabel}
        </text>
        <polygon points="120,10 140,10 130,22" fill="#fff" />
      </svg>
      {caption && <p className="mt-2.5 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}
