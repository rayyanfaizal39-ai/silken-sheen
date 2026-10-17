import { Fragment, type ReactNode } from "react";
import {
  describeMathPatternVisual,
  dotCount,
  formatPatternNumber,
  matchstickCount,
  matchstickWords,
  pascalRow,
  termLabel,
  type MathPatternVisual as PatternData,
} from "@/features/quiz/visuals/mathPatternVisual";
import {
  textFor,
  type MathVisualLang,
  type VisualText as VisualTextLike,
} from "@/features/quiz/visuals/mathQuestionVisual";

/**
 * Pattern and sequence displays. Term chains, tables and object rows are HTML
 * that wraps, so they stay legible from 320px phones to desktop; dot stages,
 * Pascal's Triangle and matchsticks are small static SVGs. Nothing animates.
 */

const VIOLET = "#a78bfa";
const AMBER = "#fbbf24";
const SKY = "#7dd3fc";
const EMERALD = "#6ee7b7";
const LAYER_COLORS = [VIOLET, AMBER, SKY, EMERALD, "#f9a8d4"];
const MUTED = "#94a3b8";

function Frame({
  visual,
  lang,
  children,
  semantic = false,
}: {
  visual: PatternData;
  lang: MathVisualLang;
  children: ReactNode;
  /** Tables keep their own semantics instead of a single image label. */
  semantic?: boolean;
}) {
  return (
    <figure
      data-math-visual={visual.kind}
      {...(semantic ? {} : { role: "img", "aria-label": describeMathPatternVisual(visual, lang) })}
      className="mx-auto w-full max-w-[520px] rounded-2xl border border-white/10 bg-slate-950/40 p-3 sm:p-4"
    >
      <figcaption className="mb-2.5 text-center text-xs font-semibold text-slate-300">
        {visual.title[lang]}
      </figcaption>
      {semantic ? children : <div aria-hidden="true">{children}</div>}
    </figure>
  );
}

function StageLabel({ children }: { children: ReactNode }) {
  return (
    <span className="mt-1.5 block text-center text-[11px] leading-tight text-slate-300">
      {children}
    </span>
  );
}

/* ── Dot pattern ──────────────────────────────────────────────────────────── */

const DOT_GAP = 13;
const DOT_R = 4.4;

function dotPositions(shape: "triangle" | "square" | "pairs", stage: number) {
  const dots: { x: number; y: number; layer: number }[] = [];
  if (shape === "triangle") {
    for (let row = 0; row < stage; row += 1) {
      for (let col = 0; col <= row; col += 1) {
        dots.push({
          x: (stage - 1 - row) * (DOT_GAP / 2) + col * DOT_GAP,
          y: row * DOT_GAP,
          layer: 0,
        });
      }
    }
    return { dots, width: (stage - 1) * DOT_GAP, height: (stage - 1) * DOT_GAP };
  }
  const rows = shape === "square" ? stage : 2;
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < stage; col += 1) {
      dots.push({ x: col * DOT_GAP, y: row * DOT_GAP, layer: Math.max(row, col) });
    }
  }
  return { dots, width: (stage - 1) * DOT_GAP, height: (rows - 1) * DOT_GAP };
}

function DotStage({
  shape,
  stage,
  layers,
}: {
  shape: "triangle" | "square" | "pairs";
  stage: number;
  layers: boolean;
}) {
  const { dots, width, height } = dotPositions(shape, stage);
  const pad = DOT_R + 2;
  return (
    <svg
      viewBox={`${-pad} ${-pad} ${width + pad * 2} ${height + pad * 2}`}
      width={width + pad * 2}
      height={height + pad * 2}
      className="mx-auto block max-w-full"
    >
      {dots.map((dot, index) => (
        <circle
          key={index}
          cx={dot.x}
          cy={dot.y}
          r={DOT_R}
          fill={layers ? LAYER_COLORS[dot.layer % LAYER_COLORS.length] : VIOLET}
        />
      ))}
    </svg>
  );
}

function DotPattern({
  visual,
  lang,
}: {
  visual: Extract<PatternData, { kind: "dot-pattern" }>;
  lang: MathVisualLang;
}) {
  const bm = lang === "bm";
  return (
    <div className="flex flex-wrap items-end justify-center gap-x-5 gap-y-3">
      {visual.stages.map((stage) => {
        const missing = stage === visual.missingStage;
        const size = Math.max(36, (stage - 1) * DOT_GAP + 14);
        return (
          <div key={stage} className="flex flex-col items-center">
            {missing ? (
              <span
                className="flex items-center justify-center rounded-xl border-2 border-dashed border-amber-300/70 font-display text-xl font-bold text-amber-200"
                style={{ width: size, height: visual.shape === "pairs" ? 36 : size }}
              >
                ?
              </span>
            ) : (
              <DotStage shape={visual.shape} stage={stage} layers={!!visual.layers} />
            )}
            <StageLabel>
              {bm ? "Peringkat" : "Stage"} {stage}
              {!missing && visual.showCounts !== false && (
                <span className="block font-semibold text-amber-200">
                  {dotCount(visual.shape, stage)}{" "}
                  {bm ? "titik" : dotCount(visual.shape, stage) === 1 ? "dot" : "dots"}
                </span>
              )}
            </StageLabel>
          </div>
        );
      })}
    </div>
  );
}

/* ── Pascal's Triangle ────────────────────────────────────────────────────── */

function PascalTriangle({
  visual,
  lang,
}: {
  visual: Extract<PatternData, { kind: "pascal-triangle" }>;
  lang: MathVisualLang;
}) {
  const CELL = 34;
  const ROW_H = 30;
  const labelW = visual.labelRows ? 52 : 0;
  const width = visual.rows * CELL + labelW;
  const height = visual.rows * ROW_H;
  const centre = labelW + (visual.rows * CELL) / 2;
  const cellAt = (row: number, position: number) => ({
    hidden: visual.hidden?.find((cell) => cell.row === row && cell.position === position),
    highlight: visual.highlight?.some((cell) => cell.row === row && cell.position === position),
  });
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="mx-auto block w-full"
      style={{ maxWidth: width * 1.35 }}
    >
      {Array.from({ length: visual.rows }, (_, index) => {
        const row = index + 1;
        const y = index * ROW_H + ROW_H / 2;
        return (
          <g key={row}>
            {visual.labelRows && (
              <text x={4} y={y + 4} fontSize={10} fill={MUTED}>
                {lang === "bm" ? "Baris" : "Row"} {row}
              </text>
            )}
            {pascalRow(row).map((value, position) => {
              const x = centre + (position - (row - 1) / 2) * CELL;
              const { hidden, highlight } = cellAt(row, position + 1);
              return (
                <g key={position}>
                  {(hidden || highlight) && (
                    <rect
                      x={x - 15}
                      y={y - 12}
                      width={30}
                      height={24}
                      rx={7}
                      fill={hidden ? "rgba(251,191,36,0.10)" : "rgba(167,139,250,0.28)"}
                      stroke={hidden ? AMBER : VIOLET}
                      strokeDasharray={hidden ? "4 3" : undefined}
                    />
                  )}
                  <text
                    x={x}
                    y={y + 4.5}
                    textAnchor="middle"
                    fontSize={value >= 100 ? 11 : 13}
                    fontWeight={hidden || highlight ? 700 : 500}
                    fill={hidden ? AMBER : "#e2e8f0"}
                  >
                    {hidden ? (hidden.label ?? "?") : value}
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

/* ── Term chains (sequence steps, Fibonacci) ──────────────────────────────── */

function TermBox({
  value,
  emphasis,
  below,
}: {
  value: number | string | null;
  emphasis?: boolean;
  below?: ReactNode;
}) {
  return (
    <span className="flex flex-col items-center">
      <span
        className={`flex h-10 min-w-[2.75rem] items-center justify-center rounded-xl border px-2 font-display text-base font-bold tabular-nums ${
          value === null
            ? "border-dashed border-amber-300/70 text-amber-200"
            : emphasis
              ? "border-amber-300/80 bg-amber-300/15 text-amber-100"
              : "border-white/15 bg-white/[0.05] text-white"
        }`}
      >
        {value === null ? "?" : formatPatternNumber(value)}
      </span>
      {below}
    </span>
  );
}

function StepChip({ label }: { label: string | null }) {
  return (
    <span className="flex min-w-[1.75rem] flex-col items-center self-start pt-0.5">
      <span
        className={`text-[11px] font-semibold leading-none ${label ? "text-sky-200" : "text-transparent"}`}
      >
        {label ?? "·"}
      </span>
      <span className="text-sm leading-tight text-slate-400">→</span>
    </span>
  );
}

function SequenceSteps({ visual }: { visual: Extract<PatternData, { kind: "sequence-steps" }> }) {
  return (
    <div className="flex flex-wrap items-start justify-center gap-y-3">
      {visual.terms.map((term, index) => (
        <Fragment key={index}>
          {index > 0 && <StepChip label={visual.steps?.[index - 1] ?? null} />}
          <TermBox
            value={term}
            emphasis={visual.highlight?.includes(index)}
            below={
              visual.showPositions ? (
                <span className="mt-1 text-[11px] text-slate-400">{termLabel(index + 1)}</span>
              ) : undefined
            }
          />
        </Fragment>
      ))}
      {visual.continues !== false && (
        <span className="flex h-10 items-center pl-2 text-lg text-slate-400">…</span>
      )}
    </div>
  );
}

function FibonacciChain({ visual }: { visual: Extract<PatternData, { kind: "fibonacci-chain" }> }) {
  const { terms } = visual;
  return (
    <div className="flex flex-wrap items-start justify-center gap-y-3">
      {terms.map((term, index) => {
        const a = terms[index - 2];
        const b = terms[index - 1];
        const showSum = visual.showSums && index >= 2 && term !== null && a != null && b != null;
        return (
          <Fragment key={index}>
            {index > 0 && <StepChip label={null} />}
            <TermBox
              value={term}
              below={
                <span
                  className={`mt-1 text-[11px] ${showSum ? "text-sky-200" : "text-transparent"}`}
                >
                  {showSum ? `${formatPatternNumber(a)} + ${formatPatternNumber(b)}` : "·"}
                </span>
              }
            />
          </Fragment>
        );
      })}
      <span className="flex h-10 items-center pl-2 text-lg text-slate-400">…</span>
    </div>
  );
}

/* ── Table ────────────────────────────────────────────────────────────────── */

function TermTable({
  visual,
  lang,
}: {
  visual: Extract<PatternData, { kind: "term-table" }>;
  lang: MathVisualLang;
}) {
  const [heading, ...body] = visual.rows;
  const blank = lang === "bm" ? "kosong" : "blank";
  return (
    // Auto layout: row labels keep their words whole and data cells wrap only at
    // spaces (the card text around it may break anywhere; tables must not).
    <table className="w-full table-auto border-collapse text-[13px] [overflow-wrap:normal] sm:text-sm">
      <thead>
        <tr className="bg-violet-500/10 text-slate-100">
          <th
            scope="col"
            className="whitespace-nowrap border border-white/10 px-1.5 py-1.5 text-left font-semibold"
          >
            {textFor(heading.label, lang)}
          </th>
          {heading.cells.map((cell, index) => (
            <th
              key={index}
              scope="col"
              className="border border-white/10 px-1 py-1.5 text-center font-semibold"
            >
              {cell === null ? "" : textFor(cell, lang)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {body.map((row, rowIndex) => (
          <tr key={rowIndex} className="text-white">
            <th
              scope="row"
              className="whitespace-nowrap border border-white/10 px-1.5 py-1.5 text-left font-semibold text-slate-200"
            >
              {textFor(row.label, lang)}
            </th>
            {row.cells.map((cell, index) => (
              <td
                key={index}
                className="border border-white/10 px-1 py-1.5 text-center tabular-nums"
              >
                {cell === null ? (
                  <span
                    aria-label={blank}
                    className="mx-auto block h-5 w-full min-w-[1.75rem] max-w-[3rem] rounded-md border border-dashed border-amber-300/60"
                  />
                ) : (
                  <span className="font-semibold text-amber-100">{textFor(cell, lang)}</span>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ── Real-life objects ────────────────────────────────────────────────────── */

/** One object drawn in a 16 × 16 cell at (x, 0). */
function ObjectShape({ object, x }: { object: "chair" | "tile" | "block" | "can"; x: number }) {
  switch (object) {
    case "chair":
      return (
        <g transform={`translate(${x} 0)`}>
          <rect x="4" y="1.5" width="8" height="6" rx="1.5" fill={VIOLET} />
          <rect x="3" y="8" width="10" height="2.5" rx="1" fill={VIOLET} />
          <path
            d="M4.5 10.5v4M11.5 10.5v4"
            stroke={VIOLET}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </g>
      );
    case "tile":
      return (
        <rect
          x={x + 1.5}
          y="1.5"
          width="13"
          height="13"
          rx="2"
          fill="rgba(125,211,252,0.25)"
          stroke={SKY}
          strokeWidth="1.4"
        />
      );
    case "block":
      return (
        <g transform={`translate(${x} 0)`}>
          <path
            d="M8 1.5l6 3v7l-6 3-6-3v-7z"
            fill="rgba(251,191,36,0.22)"
            stroke={AMBER}
            strokeWidth="1.2"
          />
          <path d="M2 4.5l6 3 6-3M8 7.5v7" stroke={AMBER} strokeWidth="1.1" fill="none" />
        </g>
      );
    case "can":
      return (
        <g transform={`translate(${x} 0)`}>
          <rect
            x="3.5"
            y="2.5"
            width="9"
            height="11"
            rx="2"
            fill="rgba(110,231,183,0.22)"
            stroke={EMERALD}
            strokeWidth="1.3"
          />
          <path d="M3.5 5h9" stroke={EMERALD} strokeWidth="1.1" />
        </g>
      );
  }
}

const OBJECT_CELL = 18;

/**
 * Each stage is ONE row of objects that never wraps. Every row shares the
 * same viewBox width (the longest row), so all rows use the same scale and
 * their lengths compare honestly: a row of 11 always looks longer than 8.
 */
function ObjectStages({
  visual,
  lang,
}: {
  visual: Extract<PatternData, { kind: "object-stages" }>;
  lang: MathVisualLang;
}) {
  const longest = Math.max(...visual.stages.map((stage) => stage.count));
  const viewWidth = longest * OBJECT_CELL;
  // Never draw a glyph larger than ~26px on wide screens.
  const maxWidth = longest * 26;
  const row = (label: VisualTextLike, body: ReactNode, count: ReactNode, key: string | number) => (
    <div key={key} className="flex items-center gap-2.5">
      <span className="w-16 shrink-0 text-xs font-semibold text-slate-200">
        {textFor(label, lang)}
      </span>
      <span className="min-w-0 flex-1">{body}</span>
      <span className="w-7 shrink-0 text-right text-xs font-bold tabular-nums text-amber-200">
        {count}
      </span>
    </div>
  );
  return (
    <div className="space-y-2">
      {visual.stages.map((stage, index) =>
        row(
          stage.label,
          <svg
            viewBox={`0 0 ${viewWidth} 16`}
            preserveAspectRatio="xMinYMid meet"
            className="block w-full"
            style={{ maxWidth }}
          >
            {Array.from({ length: stage.count }, (_, i) => (
              <ObjectShape key={i} object={visual.object} x={i * OBJECT_CELL} />
            ))}
          </svg>,
          stage.count,
          index,
        ),
      )}
      {visual.missingLabel &&
        row(
          visual.missingLabel,
          <span
            className="flex h-5 w-full items-center rounded-md border border-dashed border-amber-300/60 px-2 text-[11px] text-amber-200"
            style={{ maxWidth }}
          >
            ?
          </span>,
          "?",
          "missing",
        )}
    </div>
  );
}

/* ── Matchstick / rod squares ─────────────────────────────────────────────── */

function MatchstickStage({
  squares,
  material,
}: {
  squares: number;
  material: "matchstick" | "rod";
}) {
  const S = 26;
  const pad = 5;
  const sticks: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let k = 0; k < squares; k += 1) {
    sticks.push({ x1: k * S, y1: 0, x2: (k + 1) * S, y2: 0 });
    sticks.push({ x1: k * S, y1: S, x2: (k + 1) * S, y2: S });
  }
  for (let k = 0; k <= squares; k += 1) sticks.push({ x1: k * S, y1: 0, x2: k * S, y2: S });
  const rod = material === "rod";
  return (
    <svg
      viewBox={`${-pad} ${-pad} ${squares * S + pad * 2} ${S + pad * 2}`}
      width={(squares * S + pad * 2) * 1.25}
      height={(S + pad * 2) * 1.25}
      className="mx-auto block max-w-full"
    >
      {sticks.map((stick, index) => {
        const inset = rod ? 0.04 : 0.08;
        const x1 = stick.x1 + (stick.x2 - stick.x1) * inset;
        const y1 = stick.y1 + (stick.y2 - stick.y1) * inset;
        const x2 = stick.x2 - (stick.x2 - stick.x1) * inset;
        const y2 = stick.y2 - (stick.y2 - stick.y1) * inset;
        return (
          <g key={index}>
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={rod ? "#d6a46b" : "#fcd34d"}
              strokeWidth={rod ? 3.4 : 2.6}
              strokeLinecap="round"
            />
            {!rod && <circle cx={x2} cy={y2} r={2.4} fill="#f87171" />}
          </g>
        );
      })}
    </svg>
  );
}

function MatchstickSquares({
  visual,
  lang,
}: {
  visual: Extract<PatternData, { kind: "matchstick-squares" }>;
  lang: MathVisualLang;
}) {
  const words = matchstickWords(visual.material ?? "matchstick", lang);
  return (
    <div className="flex flex-wrap items-end justify-center gap-x-6 gap-y-3">
      {visual.stages.map((squares) => (
        <div key={squares} className="flex flex-col items-center">
          <MatchstickStage squares={squares} material={visual.material ?? "matchstick"} />
          <StageLabel>
            {squares} {squares === 1 ? words.shape : words.shapes}
            {visual.showCounts !== false && (
              <span className="block font-semibold text-amber-200">
                {matchstickCount(squares)} {words.sticks}
              </span>
            )}
          </StageLabel>
        </div>
      ))}
    </div>
  );
}

export function MathPatternVisual({ visual, lang }: { visual: PatternData; lang: MathVisualLang }) {
  switch (visual.kind) {
    case "dot-pattern":
      return (
        <Frame visual={visual} lang={lang}>
          <DotPattern visual={visual} lang={lang} />
        </Frame>
      );
    case "pascal-triangle":
      return (
        <Frame visual={visual} lang={lang}>
          <PascalTriangle visual={visual} lang={lang} />
        </Frame>
      );
    case "fibonacci-chain":
      return (
        <Frame visual={visual} lang={lang}>
          <FibonacciChain visual={visual} />
        </Frame>
      );
    case "sequence-steps":
      return (
        <Frame visual={visual} lang={lang}>
          <SequenceSteps visual={visual} />
        </Frame>
      );
    case "term-table":
      return (
        <Frame visual={visual} lang={lang} semantic>
          <TermTable visual={visual} lang={lang} />
        </Frame>
      );
    case "object-stages":
      return (
        <Frame visual={visual} lang={lang}>
          <ObjectStages visual={visual} lang={lang} />
        </Frame>
      );
    case "matchstick-squares":
      return (
        <Frame visual={visual} lang={lang}>
          <MatchstickSquares visual={visual} lang={lang} />
        </Frame>
      );
  }
}
