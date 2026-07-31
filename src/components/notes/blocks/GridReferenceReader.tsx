import { useState } from "react";

export type GridReferencePoint = {
  icon: string;
  label: string;
  /** Grid-square number plus tenths across toward the next easting line, e.g. 31.4. */
  easting: number;
  /** Grid-square number plus tenths up toward the next northing line, e.g. 53.3. */
  northing: number;
};

export type GridReferenceOption = {
  label: string;
  correct: boolean;
};

export type GridReferenceStep = {
  prompt?: string;
  options: GridReferenceOption[];
  correctFeedback: string;
  incorrectFeedback: string;
};

export type GridReferenceBlock = {
  title: string;
  instruction: string;
  /** Easting grid-line numbers, left to right, e.g. [30,31,32,33]. */
  eastingLines: number[];
  /** Northing grid-line numbers, bottom to top, e.g. [52,53,54,55]. */
  northingLines: number[];
  point: GridReferencePoint;
  fourFigure: GridReferenceStep;
  sixFigure: GridReferenceStep;
  step2Prompt?: string;
};

function GridStep({ step, onCorrect }: { step: GridReferenceStep; onCorrect?: () => void }) {
  const [chosen, setChosen] = useState<number | null>(null);
  const isCorrect = chosen !== null && step.options[chosen].correct;

  function choose(index: number) {
    if (chosen !== null) return;
    setChosen(index);
    if (step.options[index].correct) onCorrect?.();
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {step.options.map((opt, i) => {
          const picked = chosen === i;
          return (
            <button
              key={opt.label}
              type="button"
              disabled={chosen !== null}
              onClick={() => choose(i)}
              className={`min-h-11 rounded-xl border px-3 py-2 text-center text-[13px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                picked
                  ? opt.correct
                    ? "border-emerald-400 bg-emerald-500/15 text-emerald-200"
                    : "border-red-400 bg-red-500/15 text-red-200"
                  : "border-border bg-secondary/40 text-foreground"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      {chosen !== null && (
        <p
          className={`mt-2 text-[13px] leading-relaxed ${isCorrect ? "text-emerald-300" : "text-red-300"}`}
          aria-live="polite"
        >
          {isCorrect ? step.correctFeedback : step.incorrectFeedback}
        </p>
      )}
    </div>
  );
}

export function GridReferenceReader({ block, onComplete }: { block: GridReferenceBlock; onComplete?: () => void }) {
  const [fourFigureCorrect, setFourFigureCorrect] = useState(false);

  const eastMin = block.eastingLines[0];
  const eastMax = block.eastingLines[block.eastingLines.length - 1];
  const northMin = block.northingLines[0];
  const northMax = block.northingLines[block.northingLines.length - 1];

  const pad = 20;
  const size = 260;
  const inner = size - pad * 2;

  const eastPct = (block.point.easting - eastMin) / (eastMax - eastMin);
  const northPct = (block.point.northing - northMin) / (northMax - northMin);
  const markerX = pad + eastPct * inner;
  const markerY = pad + (1 - northPct) * inner;

  return (
    <div className="rounded-2xl border border-border bg-card/55 p-4">
      <div className="mx-auto max-w-xs overflow-visible">
        <svg viewBox={`0 0 ${size} ${size + 20}`} className="w-full">
          <g className="stroke-border" strokeWidth={1.5}>
            {block.eastingLines.map((_, i) => {
              const x = pad + (i / (block.eastingLines.length - 1)) * inner;
              return <line key={`v-${i}`} x1={x} y1={pad} x2={x} y2={size - pad} />;
            })}
            {block.northingLines.map((_, i) => {
              const y = pad + (i / (block.northingLines.length - 1)) * inner;
              return <line key={`h-${i}`} x1={pad} y1={y} x2={size - pad} y2={y} />;
            })}
          </g>
          <g className="fill-muted-foreground" fontSize={11} fontFamily="inherit">
            {block.eastingLines.map((label, i) => {
              const x = pad + (i / (block.eastingLines.length - 1)) * inner;
              return (
                <text key={`el-${i}`} x={x} y={size - pad + 15} textAnchor="middle">
                  {label}
                </text>
              );
            })}
            {block.northingLines.map((label, i) => {
              const y = size - pad - (i / (block.northingLines.length - 1)) * inner;
              return (
                <text key={`nl-${i}`} x={pad - 12} y={y + 4} textAnchor="middle">
                  {label}
                </text>
              );
            })}
          </g>
          <circle cx={markerX} cy={markerY} r={6} fill="#ffb937" />
          <text x={markerX} y={markerY - 12} textAnchor="middle" fontSize={16}>
            {block.point.icon}
          </text>
        </svg>
      </div>

      {block.fourFigure.prompt && (
        <p className="mb-2 mt-3 text-center text-[13px] text-muted-foreground">{block.fourFigure.prompt}</p>
      )}
      <div className="mt-3">
        <GridStep step={block.fourFigure} onCorrect={() => setFourFigureCorrect(true)} />
      </div>

      {fourFigureCorrect && (
        <div className="mt-4 border-t border-border pt-4">
          <p className="mb-2 text-center text-[13px] text-muted-foreground">
            {block.step2Prompt ?? "Bagus! Sekarang cuba baca rujukan grid 6 angka pula:"}
          </p>
          <GridStep step={block.sixFigure} onCorrect={onComplete} />
        </div>
      )}
    </div>
  );
}
