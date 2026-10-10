import {
  describeMathInequalityVisual,
  type MathInequalityVisual as InequalityData,
} from "@/features/quiz/visuals/mathInequalityVisual";
import type { MathVisualLang } from "@/features/quiz/visuals/mathQuestionVisual";

/** Static SVG number lines, with every option deliberately drawn the same way. */
export function MathInequalityVisual({ visual, lang }: {
  visual: InequalityData;
  lang: MathVisualLang;
}) {
  const W = 360;
  const left = 29;
  const right = 334;
  const xOf = (value: number) =>
    left + ((value - visual.min) / (visual.max - visual.min)) * (right - left);
  const ticks = Array.from(
    { length: Math.floor((visual.max - visual.min) / visual.step) + 1 },
    (_, i) => visual.min + i * visual.step,
  ).filter((value) => value <= visual.max + 1e-8);
  const rows = visual.kind === "inequality-tracks" ? visual.tracks.length
    : visual.kind === "inequality-options" ? visual.options.length : 1;
  const rowHeight = 75;
  const H = rows * rowHeight + 18;
  const baseY = (index: number) => 37 + rowHeight * index;
  const color = "#a78bfa";
  const textColor = "#cbd5e1";

  const numberLine = (y: number) => (
    <g strokeWidth="1.25">
      <line x1={left - 5} x2={right + 4} y1={y} y2={y}
        stroke="#94a3b8" strokeOpacity=".7" />
      <path d={`M ${left - 5} ${y} l 7 -4 v 8 Z`} fill="#94a3b8" fillOpacity=".65" />
      <path d={`M ${right + 4} ${y} l -7 -4 v 8 Z`} fill="#94a3b8" fillOpacity=".65" />
      {ticks.map((value) => (
        <g key={value}>
          <line x1={xOf(value)} x2={xOf(value)} y1={y - 5} y2={y + 5}
            stroke="#94a3b8" />
          <text x={xOf(value)} y={y + 19} fill={textColor} fontSize="10.5"
            textAnchor="middle">{value.toString().replace("-", "−")}</text>
        </g>
      ))}
    </g>
  );
  const endpoint = (at: number, y: number, inclusive: boolean) => (
    <circle cx={xOf(at)} cy={y} r="5.8" stroke={color} strokeWidth="2.5"
      fill={inclusive ? color : "#0b1220"} />
  );
  const segment = (
    y: number,
    lower: number | undefined,
    upper: number | undefined,
    includeLower = false,
    includeUpper = false,
  ) => {
    const x1 = lower === undefined ? left + 1 : xOf(lower);
    const x2 = upper === undefined ? right - 1 : xOf(upper);
    return (
      <g>
        <line x1={x1} x2={x2} y1={y} y2={y} stroke={color} strokeWidth="4"
          strokeLinecap="round" />
        {lower === undefined && (
          <path d={`M ${left} ${y} l 10 -6 v 12 Z`} fill={color} />
        )}
        {upper === undefined && (
          <path d={`M ${right} ${y} l -10 -6 v 12 Z`} fill={color} />
        )}
        {lower !== undefined && endpoint(lower, y, includeLower)}
        {upper !== undefined && endpoint(upper, y, includeUpper)}
      </g>
    );
  };

  return (
    <figure data-math-visual={visual.kind} role="img"
      aria-label={describeMathInequalityVisual(visual, lang)}
      className="mx-auto w-full max-w-[430px] rounded-2xl border border-violet-400/20 bg-slate-950/40 p-3 sm:p-4">
      <figcaption className="mb-2 text-center text-xs font-semibold text-slate-200">
        {visual.title[lang]}
      </figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} className="block w-full" aria-hidden="true">
        {visual.kind === "inequality-reference-axis" && (
          <g>
            {numberLine(baseY(0))}
            {visual.markers.map((value) => (
              <g key={value}>
                <line x1={xOf(value)} x2={xOf(value)}
                  y1={baseY(0) - 24} y2={baseY(0) - 7}
                  stroke="#fbbf24" strokeWidth="2" strokeDasharray="3 2" />
                <text x={xOf(value)} y={baseY(0) - 27} fontSize="12"
                  fill="#fcd34d" textAnchor="middle">{value.toString().replace("-", "−")}</text>
              </g>
            ))}
          </g>
        )}
        {visual.kind === "inequality-tracks" && visual.tracks.map((track, index) => {
          const y = baseY(index);
          return (
            <g key={index} data-condition-track={track.label}>
              <text x={W / 2} y={y - 19} fontSize="12" fill="#e2e8f0"
                textAnchor="middle">{track.label}</text>
              {numberLine(y)}
              {segment(y, track.lower, track.upper, track.includeLower, track.includeUpper)}
            </g>
          );
        })}
        {visual.kind === "inequality-options" && visual.options.map((option, index) => {
          const y = baseY(index);
          return (
            <g key={index} data-option-line={String.fromCharCode(65 + index)}>
              <text x="12" y={y + 4} fontSize="14" fontWeight="700"
                fill="#e2e8f0" textAnchor="middle">{String.fromCharCode(65 + index)}</text>
              {numberLine(y)}
              {option.direction === "left"
                ? segment(y, undefined, visual.boundary, false, option.inclusive)
                : segment(y, visual.boundary, undefined, option.inclusive, false)}
            </g>
          );
        })}
      </svg>
      {visual.kind === "inequality-tracks" && visual.tracks.length > 1 && (
        <p className="mt-1 text-center text-[11px] text-slate-400">
          {lang === "bm" ? "Setiap syarat ditunjukkan secara berasingan. Tentukan persilangannya sendiri."
            : "Each given condition is shown separately. Find their overlap yourself."}
        </p>
      )}
      {visual.kind === "inequality-reference-axis" && (
        <p className="mt-1 text-center text-[11px] text-slate-400">
          {lang === "bm" ? "Tanda rujukan sahaja — pilih arah dan keterangkuman sendiri."
            : "Reference marks only — choose direction and inclusion yourself."}
        </p>
      )}
    </figure>
  );
}
