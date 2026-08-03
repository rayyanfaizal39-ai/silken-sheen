import { useState } from "react";
import type { MathLang } from "./mathNotesChrome";
import { chrome } from "./mathNotesChrome";
import { MATH_GREEN, MATH_VIOLET } from "./mathTheme";

export interface NumberLineMark {
  value: number;
  label: string;
  color?: string;
}

/**
 * SVG number line that plots the exact numbers from the worked example above
 * it (never arbitrary points), with an optional "Show Answer" reveal for a
 * text answer (e.g. sorted order).
 */
export function NumberLine({
  lang,
  marks,
  min,
  max,
  answer,
}: {
  lang: MathLang;
  marks: NumberLineMark[];
  min: number;
  max: number;
  answer?: string;
}) {
  const [revealed, setRevealed] = useState(false);
  const width = 640;
  const pad = 30;
  const y = 40;
  const scale = (width - 2 * pad) / (max - min);
  const ticks: number[] = [];
  for (let i = Math.ceil(min); i <= Math.floor(max); i++) ticks.push(i);
  const x = (v: number) => pad + (v - min) * scale;

  return (
    <div className="mt-4 flex flex-col items-center">
      <div className="w-full overflow-x-auto">
        <svg width={width} height={90} viewBox={`0 0 ${width} 90`} className="mx-auto block">
          <line
            x1={pad}
            y1={y}
            x2={width - pad}
            y2={y}
            stroke="rgba(255,255,255,0.25)"
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
          {marks.map((m, i) => (
            <g key={i}>
              <circle
                cx={x(m.value)}
                cy={y}
                r={7}
                fill={m.color ?? MATH_VIOLET}
                stroke="#fff"
                strokeWidth={1.5}
              />
              <text
                x={x(m.value)}
                y={y - 14}
                fontSize={12}
                fontWeight={700}
                fill="#eef1fb"
                textAnchor="middle"
                fontFamily="'Space Grotesk', sans-serif"
              >
                {m.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
      {answer && (
        <>
          <button
            type="button"
            onClick={() => setRevealed((r) => !r)}
            className="mt-3 inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold"
            style={{ borderColor: "rgba(139,107,255,0.4)", color: MATH_VIOLET }}
          >
            👁️ {revealed ? chrome("hideAnswer", lang) : chrome("showAnswer", lang)}
          </button>
          {revealed && (
            <p
              className="font-display mt-2.5 text-center text-[13.5px] font-bold"
              style={{ color: MATH_GREEN }}
            >
              {answer}
            </p>
          )}
        </>
      )}
    </div>
  );
}
