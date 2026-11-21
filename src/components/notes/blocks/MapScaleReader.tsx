import { useState } from "react";

export type MapScaleLegendItem = {
  icon: string;
  label: string;
};

export type MapScalePoint = {
  icon: string;
  label: string;
  /** Position within the map, 0-100 (percent of width/height). */
  x: number;
  y: number;
};

export type MapScaleOption = {
  label: string;
  correct: boolean;
};

export type MapScaleScenario = {
  id: string;
  pointA: MapScalePoint;
  pointB: MapScalePoint;
  legend: MapScaleLegendItem[];
  /** Distance already measured on the map, in cm (what a pembaris/jangka tolok would read). */
  mapDistanceCm: number;
  /** Scale as shown on the map, e.g. "1 cm mewakili 2 km" or "1 : 50 000". */
  scaleLabel: string;
  question: string;
  options: MapScaleOption[];
  correctFeedback: string;
  incorrectFeedback: string;
};

export type MapScaleBlock = {
  title: string;
  instruction: string;
  scenarios: MapScaleScenario[];
};

function ScenarioMap({ scenario }: { scenario: MapScaleScenario }) {
  const w = 300;
  const h = 190;
  const ax = (scenario.pointA.x / 100) * w;
  const ay = (scenario.pointA.y / 100) * h;
  const bx = (scenario.pointB.x / 100) * w;
  const by = (scenario.pointB.y / 100) * h;
  const midX = (ax + bx) / 2;
  const midY = (ay + by) / 2;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full rounded-xl border border-border" role="img" aria-label={`Peta menunjukkan ${scenario.pointA.label} dan ${scenario.pointB.label}`}>
      <rect x={0} y={0} width={w} height={h} className="fill-emerald-900/15" />

      <line x1={ax} y1={ay} x2={bx} y2={by} className="stroke-primary" strokeWidth={2} strokeDasharray="5 4" />
      <rect x={midX - 20} y={midY - 10} width={40} height={16} rx={4} className="fill-primary" />
      <text x={midX} y={midY + 2} textAnchor="middle" fontSize={10} fontWeight={700} className="fill-primary-foreground">
        {scenario.mapDistanceCm} cm
      </text>

      <g>
        <circle cx={ax} cy={ay} r={5} className="fill-amber-400 stroke-background" strokeWidth={1.5} />
        <text x={ax} y={ay - 10} textAnchor="middle" fontSize={13}>{scenario.pointA.icon}</text>
        <text x={ax} y={ay + 18} textAnchor="middle" fontSize={9} fontWeight={600} className="fill-foreground">{scenario.pointA.label}</text>
      </g>
      <g>
        <circle cx={bx} cy={by} r={5} className="fill-amber-400 stroke-background" strokeWidth={1.5} />
        <text x={bx} y={by - 10} textAnchor="middle" fontSize={13}>{scenario.pointB.icon}</text>
        <text x={bx} y={by + 18} textAnchor="middle" fontSize={9} fontWeight={600} className="fill-foreground">{scenario.pointB.label}</text>
      </g>

      <text x={w - 10} y={16} textAnchor="end" fontSize={11} fontWeight={700} className="fill-foreground">U ↑</text>

      <rect x={w - 98} y={h - 16 * scenario.legend.length - 8} width={92} height={16 * scenario.legend.length + 6} rx={4} className="fill-card stroke-border" strokeWidth={1} />
      {scenario.legend.map((item, i) => (
        <text key={item.label} x={w - 92} y={h - 16 * scenario.legend.length + 16 * i} fontSize={9} className="fill-muted-foreground">
          {item.icon} {item.label}
        </text>
      ))}

      <text x={6} y={h - 6} fontSize={9} fontWeight={600} className="fill-muted-foreground">
        Skala: {scenario.scaleLabel}
      </text>
    </svg>
  );
}

function ScenarioQuestion({ scenario, onCorrect }: { scenario: MapScaleScenario; onCorrect?: () => void }) {
  const [chosen, setChosen] = useState<number | null>(null);
  const isCorrect = chosen !== null && scenario.options[chosen].correct;

  function choose(index: number) {
    if (chosen !== null) return;
    setChosen(index);
    if (scenario.options[index].correct) onCorrect?.();
  }

  return (
    <div className="mt-3">
      <p className="mb-2 text-[13px] font-semibold leading-relaxed text-foreground">{scenario.question}</p>
      <div className="grid grid-cols-2 gap-2">
        {scenario.options.map((opt, i) => {
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
        <p className={`mt-2 text-[13px] leading-relaxed ${isCorrect ? "text-emerald-300" : "text-red-300"}`} aria-live="polite">
          {isCorrect ? scenario.correctFeedback : scenario.incorrectFeedback}
        </p>
      )}
    </div>
  );
}

export function MapScaleReader({ block, onComplete }: { block: MapScaleBlock; onComplete?: () => void }) {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [solved, setSolved] = useState<Set<number>>(new Set());
  const scenario = block.scenarios[scenarioIndex];

  function markSolved(index: number) {
    setSolved((prev) => {
      if (prev.has(index)) return prev;
      const next = new Set(prev).add(index);
      if (next.size >= block.scenarios.length) onComplete?.();
      return next;
    });
  }

  return (
    <div className="rounded-2xl border border-border bg-card/55 p-4">
      {block.scenarios.length > 1 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {block.scenarios.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setScenarioIndex(i)}
              className={`min-h-9 rounded-full border px-3 py-1 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                i === scenarioIndex ? "border-primary bg-primary/15 text-primary" : "border-border bg-secondary/40 text-muted-foreground"
              }`}
            >
              {solved.has(i) ? "✓ " : ""}Peta {i + 1}
            </button>
          ))}
        </div>
      )}
      <ScenarioMap scenario={scenario} />
      <ScenarioQuestion key={scenario.id} scenario={scenario} onCorrect={() => markSolved(scenarioIndex)} />
    </div>
  );
}
