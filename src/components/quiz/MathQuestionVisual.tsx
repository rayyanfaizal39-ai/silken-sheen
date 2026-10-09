import type { ReactNode } from "react";
import {
  axisScale,
  describeMathQuestionVisual,
  dotPlotCounts,
  stemLeafRows,
  textFor,
  type MathQuestionVisual as MathQuestionVisualData,
  type MathVisualLang,
} from "@/features/quiz/visuals/mathQuestionVisual";

/**
 * Renders a Maths quiz question's data display between the question and the
 * answers: semantic tables, or small static SVG charts (no chart library, no
 * animation). Value axes always start at 0 and every value a question needs
 * can be read without hovering.
 */

const VIOLET = "#8b6bff";
const SERIES = [VIOLET, "#fbbf5a"];
const SECTORS = ["#8b6bff", "#4fb0ff", "#fbbf5a", "#4ade80", "#f472b6", "#ff9f43"];
const AXIS = "rgba(255,255,255,0.35)";
const GRID = "rgba(255,255,255,0.07)";
const MUTED = "#94a3b8";

const W = 320;
const H = 214;
const PAD = { left: 46, right: 12, top: 20, bottom: 46 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;
const BASE_Y = PAD.top + PLOT_H;

function Label({
  x,
  y,
  children,
  anchor = "middle",
  size = 11,
  fill = MUTED,
  weight = 500,
  rotate,
}: {
  x: number;
  y: number;
  children: ReactNode;
  anchor?: "start" | "middle" | "end";
  size?: number;
  fill?: string;
  weight?: number;
  rotate?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      fill={fill}
      fontWeight={weight}
      textAnchor={anchor}
      transform={rotate ? `rotate(${rotate} ${x} ${y})` : undefined}
    >
      {children}
    </text>
  );
}

/** Value axis from 0 with gridlines, plus the x-axis line and both axis titles. */
function Axes({ maxValue, xLabel, yLabel }: { maxValue: number; xLabel?: string; yLabel: string }) {
  const { step, top } = axisScale(maxValue);
  const ticks: number[] = [];
  for (let tick = 0; tick <= top; tick += step) ticks.push(tick);
  return (
    <g>
      {ticks.map((tick) => {
        const y = BASE_Y - (tick / top) * PLOT_H;
        return (
          <g key={tick}>
            <line x1={PAD.left} x2={W - PAD.right} y1={y} y2={y} stroke={GRID} />
            <Label x={PAD.left - 6} y={y + 4} anchor="end">
              {tick}
            </Label>
          </g>
        );
      })}
      <line x1={PAD.left} x2={PAD.left} y1={PAD.top - 6} y2={BASE_Y} stroke={AXIS} />
      <line x1={PAD.left} x2={W - PAD.right} y1={BASE_Y} y2={BASE_Y} stroke={AXIS} />
      <Label x={11} y={PAD.top + PLOT_H / 2} rotate={-90}>
        {yLabel}
      </Label>
      {xLabel && (
        <Label x={PAD.left + PLOT_W / 2} y={H - 6}>
          {xLabel}
        </Label>
      )}
    </g>
  );
}

const yOf = (value: number, top: number) => BASE_Y - (value / top) * PLOT_H;

function Bars({
  bars,
  joined,
  yLabel,
  xLabel,
}: {
  bars: { label: string; value: number }[];
  joined: boolean;
  yLabel: string;
  xLabel?: string;
}) {
  const { top } = axisScale(Math.max(...bars.map((bar) => bar.value)));
  const band = PLOT_W / bars.length;
  const barW = joined ? band : band * 0.58;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden="true">
      <Axes maxValue={top} xLabel={xLabel} yLabel={yLabel} />
      {bars.map((bar, index) => {
        const x = PAD.left + index * band + (band - barW) / 2;
        const y = yOf(bar.value, top);
        return (
          <g key={`${bar.label}-${index}`}>
            <rect
              x={x}
              y={y}
              width={barW}
              height={BASE_Y - y}
              fill="rgba(139,107,255,0.5)"
              stroke={VIOLET}
              strokeWidth={1.2}
            />
            <Label x={x + barW / 2} y={y - 5} fill="#fff" weight={700} size={11.5}>
              {bar.value}
            </Label>
            <Label x={PAD.left + index * band + band / 2} y={BASE_Y + 16}>
              {bar.label}
            </Label>
          </g>
        );
      })}
    </svg>
  );
}

function Lines({
  xLabels,
  series,
  showValues,
  xLabel,
  yLabel,
}: {
  xLabels: string[];
  series: { name?: string; values: number[] }[];
  showValues: boolean;
  xLabel: string;
  yLabel: string;
}) {
  const { top } = axisScale(Math.max(...series.flatMap((entry) => entry.values)));
  const band = PLOT_W / xLabels.length;
  const xOf = (index: number) => PAD.left + band * (index + 0.5);
  const small = xLabels.length > 7;
  return (
    <>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden="true">
        <Axes maxValue={top} xLabel={xLabel} yLabel={yLabel} />
        {xLabels.map((label, index) => (
          <Label key={`${label}-${index}`} x={xOf(index)} y={BASE_Y + 16} size={small ? 9.5 : 11}>
            {label}
          </Label>
        ))}
        {series.map((entry, seriesIndex) => {
          const color = SERIES[seriesIndex % SERIES.length];
          const points = entry.values.map((value, index) => [xOf(index), yOf(value, top)]);
          return (
            <g key={seriesIndex}>
              <polyline
                points={points.map(([x, y]) => `${x},${y}`).join(" ")}
                fill="none"
                stroke={color}
                strokeWidth={2}
              />
              {points.map(([x, y], index) => (
                <g key={index}>
                  <circle cx={x} cy={y} r={3.6} fill={color} />
                  {showValues && (
                    <Label x={x} y={y - 7} fill="#fff" weight={700} size={11}>
                      {entry.values[index]}
                    </Label>
                  )}
                </g>
              ))}
            </g>
          );
        })}
      </svg>
      {series.length > 1 && (
        <div className="mt-1 flex justify-center gap-4 text-xs text-slate-300">
          {series.map((entry, index) => (
            <span key={index} className="inline-flex items-center gap-1.5">
              <span
                className="inline-block h-2 w-4 rounded-full"
                style={{ background: SERIES[index % SERIES.length] }}
              />
              {entry.name}
            </span>
          ))}
        </div>
      )}
    </>
  );
}

function Pie({ sectors }: { sectors: { label: string; angle: number; text: string }[] }) {
  const c = 100;
  const r = 90;
  const point = (degrees: number, radius: number) => {
    const radians = ((degrees - 90) * Math.PI) / 180;
    return [c + radius * Math.cos(radians), c + radius * Math.sin(radians)];
  };
  let start = 0;
  const paths = sectors.map((sector) => {
    const end = start + sector.angle;
    const [x1, y1] = point(start, r);
    const [x2, y2] = point(end, r);
    const [tx, ty] = point((start + end) / 2, r * 0.62);
    const d = `M${c},${c} L${x1},${y1} A${r},${r} 0 ${sector.angle > 180 ? 1 : 0} 1 ${x2},${y2} Z`;
    start = end;
    return { d, tx, ty };
  });
  return (
    <div className="flex items-center justify-center gap-3">
      <svg
        viewBox="0 0 200 200"
        className="shrink-0"
        style={{ width: "56%", maxWidth: 170 }}
        aria-hidden="true"
      >
        {paths.map((path, index) => (
          <g key={index}>
            <path
              d={path.d}
              fill={SECTORS[index % SECTORS.length]}
              stroke="#0B1220"
              strokeWidth={2}
            />
            <text
              x={path.tx}
              y={path.ty + 5}
              fontSize={15}
              fontWeight={800}
              textAnchor="middle"
              fill="#0B1220"
            >
              {sectors[index].text}
            </text>
          </g>
        ))}
      </svg>
      <ul className="flex min-w-0 flex-col gap-1 text-xs text-slate-200">
        {sectors.map((sector, index) => (
          <li key={index} className="flex items-center gap-1.5">
            <span
              className="inline-block h-3 w-3 shrink-0 rounded-sm"
              style={{ background: SECTORS[index % SECTORS.length] }}
            />
            {sector.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Dots({
  min,
  max,
  values,
  xLabel,
}: {
  min: number;
  max: number;
  values: number[];
  xLabel: string;
}) {
  const left = 22;
  const spacing = (W - left * 2) / Math.max(1, max - min);
  const r = Math.min(6.5, spacing * 0.36);
  const gap = r * 2 + 2.5;
  const tallest = Math.max(...dotPlotCounts(values).map(([, count]) => count));
  const baseY = 10 + tallest * gap + 4;
  const height = baseY + 36;
  const xOf = (value: number) => left + (value - min) * spacing;
  const ticks = Array.from({ length: max - min + 1 }, (_, index) => min + index);
  return (
    <svg viewBox={`0 0 ${W} ${height}`} className="w-full" aria-hidden="true">
      <line x1={left - 10} x2={W - left + 10} y1={baseY} y2={baseY} stroke={AXIS} />
      {ticks.map((tick) => (
        <g key={tick}>
          <line x1={xOf(tick)} x2={xOf(tick)} y1={baseY - 4} y2={baseY + 4} stroke={AXIS} />
          <Label x={xOf(tick)} y={baseY + 16}>
            {tick}
          </Label>
        </g>
      ))}
      {dotPlotCounts(values).flatMap(([value, count]) =>
        Array.from({ length: count }, (_, stack) => (
          <circle
            key={`${value}-${stack}`}
            cx={xOf(value)}
            cy={baseY - 4 - r - stack * gap}
            r={r}
            fill="rgba(139,107,255,0.55)"
            stroke={VIOLET}
            strokeWidth={1.2}
          />
        )),
      )}
      <Label x={W / 2} y={height - 4}>
        {xLabel}
      </Label>
    </svg>
  );
}

const CELL = "border border-white/[0.09] px-3 py-1.5";

export function MathQuestionVisual({
  visual,
  lang,
}: {
  visual: MathQuestionVisualData;
  lang: MathVisualLang;
}) {
  const title = visual.title[lang];
  const t = (text: Parameters<typeof textFor>[0]) => textFor(text, lang);

  if (visual.kind === "frequency-table" || visual.kind === "stem-leaf") {
    const stemLeaf = visual.kind === "stem-leaf";
    const headings = stemLeaf
      ? [lang === "bm" ? "Batang" : "Stem", lang === "bm" ? "Daun" : "Leaf"]
      : [visual.valueHeading[lang], visual.frequencyHeading[lang]];
    const rows: [string, string][] = stemLeaf
      ? stemLeafRows(visual.values).map(([stem, leaves]) => [String(stem), leaves.join("  ")])
      : visual.rows.map((row) => [t(row.value), String(row.frequency)]);
    return (
      <figure data-math-visual={visual.kind} className="mx-auto w-full max-w-[320px]">
        <table className="w-full border-collapse text-sm">
          <caption className="pb-2 text-center text-xs font-semibold text-slate-400">
            {title}
          </caption>
          <thead>
            <tr className="bg-white/[0.06] text-white/70">
              {headings.map((heading) => (
                <th key={heading} scope="col" className={`${CELL} py-2 font-semibold`}>
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([first, second]) => (
              <tr key={first} className="text-white">
                <th scope="row" className={`${CELL} text-center font-semibold`}>
                  {first}
                </th>
                <td
                  className={`${CELL} tabular-nums ${stemLeaf ? "text-left tracking-wide" : "text-center"}`}
                >
                  {second}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {stemLeaf && (
          <figcaption className="pt-2 text-center text-xs text-slate-400">
            {visual.key[lang]}
          </figcaption>
        )}
      </figure>
    );
  }

  let chart: ReactNode;
  switch (visual.kind) {
    case "bar-chart":
      chart = (
        <Bars
          bars={visual.bars.map((bar) => ({ label: t(bar.label), value: bar.value }))}
          joined={false}
          yLabel={visual.yLabel[lang]}
        />
      );
      break;
    case "histogram":
      chart = (
        <Bars
          bars={visual.classes.map((entry) => ({ label: entry.label, value: entry.frequency }))}
          joined
          xLabel={visual.xLabel[lang]}
          yLabel={visual.yLabel[lang]}
        />
      );
      break;
    case "line-graph":
    case "frequency-polygon":
      chart = (
        <Lines
          xLabels={visual.xLabels.map(t)}
          series={visual.series.map((entry) => ({
            name: entry.name === undefined ? undefined : t(entry.name),
            values: entry.values,
          }))}
          showValues={visual.showValues ?? true}
          xLabel={visual.xLabel[lang]}
          yLabel={visual.yLabel[lang]}
        />
      );
      break;
    case "pie-chart":
      chart = (
        <Pie sectors={visual.sectors.map((sector) => ({ ...sector, label: t(sector.label) }))} />
      );
      break;
    case "dot-plot":
      chart = (
        <Dots
          min={visual.min}
          max={visual.max}
          values={visual.values}
          xLabel={visual.xLabel[lang]}
        />
      );
      break;
  }

  return (
    <figure
      data-math-visual={visual.kind}
      role="img"
      aria-label={describeMathQuestionVisual(visual, lang)}
      className="mx-auto w-full max-w-[320px]"
    >
      <figcaption className="pb-1 text-center text-xs font-semibold text-slate-400">
        {title}
      </figcaption>
      {chart}
    </figure>
  );
}
