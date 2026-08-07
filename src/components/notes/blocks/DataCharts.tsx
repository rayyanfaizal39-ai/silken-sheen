import { MATH_AMBER, MATH_GREEN, MATH_RED, MATH_VIOLET } from "./mathTheme";

const FAINT = "#6b7593";
const FONT = "'Space Grotesk', sans-serif";

export interface ChartDatum {
  label: string;
  value: number;
}

export interface PieDatum extends ChartDatum {
  color: string;
}

/** Equal-width bars, gridlines, and value labels, computed from a frequency array. Ports buildBarChart exactly. */
export function BarChart({ data, caption }: { data: ChartDatum[]; caption?: string }) {
  const w = 320;
  const h = 220;
  const padL = 40;
  const padB = 45;
  // Extra headroom above the plot area: the tallest bar's value label sits
  // just above the bar, i.e. right at padT — too little margin there clips
  // the label whenever a category happens to be the max value (routine,
  // not an edge case, since one bar is always the max).
  const padT = 22;
  const padR = 15;
  const plotW = w - padL - padR;
  const plotH = h - padT - padB;
  const maxVal = Math.max(...data.map((d) => d.value));
  const barW = (plotW / data.length) * 0.6;
  const gap = plotW / data.length;

  const gridlines: { y: number; label: number }[] = [];
  for (let g = 0; g <= maxVal; g += 2) {
    gridlines.push({ y: padT + plotH - (g / maxVal) * plotH, label: g });
  }

  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[360px]">
        {gridlines.map((g) => (
          <g key={g.label}>
            <line
              x1={padL}
              y1={g.y}
              x2={w - padR}
              y2={g.y}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth={1}
            />
            <text
              x={padL - 8}
              y={g.y + 4}
              fontSize={9}
              fill={FAINT}
              textAnchor="end"
              fontFamily={FONT}
            >
              {g.label}
            </text>
          </g>
        ))}
        <line
          x1={padL}
          y1={padT}
          x2={padL}
          y2={padT + plotH}
          stroke="rgba(255,255,255,0.3)"
          strokeWidth={1.3}
        />
        <line
          x1={padL}
          y1={padT + plotH}
          x2={w - padR}
          y2={padT + plotH}
          stroke="rgba(255,255,255,0.3)"
          strokeWidth={1.3}
        />
        {data.map((d, i) => {
          const barH = (d.value / maxVal) * plotH;
          const x = padL + i * gap + (gap - barW) / 2;
          const y = padT + plotH - barH;
          return (
            <g key={d.label}>
              <rect
                x={x}
                y={y}
                width={barW}
                height={barH}
                fill="rgba(139,107,255,0.5)"
                stroke={MATH_VIOLET}
                strokeWidth={1.3}
                rx={3}
              />
              <text
                x={x + barW / 2}
                y={y - 6}
                fontSize={10.5}
                fill="#fff"
                textAnchor="middle"
                fontFamily={FONT}
                fontWeight={700}
              >
                {d.value}
              </text>
              <text
                x={x + barW / 2}
                y={padT + plotH + 16}
                fontSize={9}
                fill={FAINT}
                textAnchor="middle"
                fontFamily={FONT}
              >
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
      {caption && <p className="mt-2.5 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}

/** True pie wedges (not a donut ring) — angle = (value ÷ total) × 360°, computed and labeled per slice. Ports buildPieChart exactly. */
export function PieChart({ data, caption }: { data: PieDatum[]; caption?: string }) {
  const total = data.reduce((a, d) => a + d.value, 0);
  const cx = 110;
  const cy = 110;
  const r = 90;
  let startAngle = -90;

  const slices = data.map((d) => {
    const angle = (d.value / total) * 360;
    const endAngle = startAngle + angle;
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);
    const largeArc = angle > 180 ? 1 : 0;
    const midAngle = ((startAngle + endAngle) / 2) * (Math.PI / 180);
    const labelX = cx + r * 0.65 * Math.cos(midAngle);
    const labelY = cy + r * 0.65 * Math.sin(midAngle);
    const slice = {
      d,
      angle,
      path: `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc} 1 ${x2},${y2} Z`,
      labelX,
      labelY,
    };
    startAngle = endAngle;
    return slice;
  });

  return (
    <div className="mt-4 flex flex-col items-center">
      <div className="flex flex-wrap items-center justify-center gap-5">
        <svg viewBox="0 0 220 220" className="w-full max-w-[220px]">
          {slices.map((s) => (
            <g key={s.d.label}>
              <path d={s.path} fill={s.d.color} stroke="#0d0620" strokeWidth={1.5} />
              <text
                x={s.labelX}
                y={s.labelY}
                fontSize={12}
                fill="#fff"
                textAnchor="middle"
                fontFamily={FONT}
                fontWeight={700}
              >
                {Math.round(s.angle)}°
              </text>
            </g>
          ))}
        </svg>
        <div className="flex flex-col gap-1.5">
          {data.map((d) => (
            <div key={d.label} className="flex items-center gap-1.5">
              <span
                className="inline-block h-3 w-3 shrink-0 rounded-sm"
                style={{ background: d.color }}
              />
              <span className="text-xs text-[#eef1fb]">
                {d.label} ({d.value})
              </span>
            </div>
          ))}
        </div>
      </div>
      {caption && <p className="mt-2.5 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}

/** Points connected by straight lines, index-numbered along the x-axis. Ports buildLineGraphFull exactly. */
export function LineGraph({
  values,
  unit,
  caption,
}: {
  values: number[];
  unit: string;
  caption?: string;
}) {
  const w = 320;
  const h = 200;
  const padL = 40;
  const padB = 30;
  const padT = 15;
  const padR = 15;
  const plotW = w - padL - padR;
  const plotH = h - padT - padB;
  const maxV = Math.max(...values);
  const minV = Math.min(...values);
  const range = maxV - minV || 1;
  const xStep = plotW / (values.length - 1);
  const coords = values.map((v, i): [number, number] => [
    padL + i * xStep,
    padT + plotH - ((v - minV) / range) * plotH,
  ]);
  const path = coords.map((c, i) => (i === 0 ? "M" : "L") + c[0] + "," + c[1]).join(" ");

  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[360px]">
        <line
          x1={padL}
          y1={padT}
          x2={padL}
          y2={padT + plotH}
          stroke="rgba(255,255,255,0.3)"
          strokeWidth={1.3}
        />
        <line
          x1={padL}
          y1={padT + plotH}
          x2={w - padR}
          y2={padT + plotH}
          stroke="rgba(255,255,255,0.3)"
          strokeWidth={1.3}
        />
        <text
          x={padL - 8}
          y={padT + 10}
          fontSize={9}
          fill={FAINT}
          textAnchor="end"
          fontFamily={FONT}
        >
          {maxV}
          {unit}
        </text>
        <text
          x={padL - 8}
          y={padT + plotH}
          fontSize={9}
          fill={FAINT}
          textAnchor="end"
          fontFamily={FONT}
        >
          {minV}
          {unit}
        </text>
        <path d={path} fill="none" stroke={MATH_VIOLET} strokeWidth={2} />
        {coords.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={4} fill={MATH_VIOLET} />
            <text
              x={x}
              y={h - 10}
              fontSize={8.5}
              fill={FAINT}
              textAnchor="middle"
              fontFamily={FONT}
            >
              {i + 1}
            </text>
          </g>
        ))}
      </svg>
      {caption && <p className="mt-2.5 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}

/** Small labeled line graph (e.g. year-by-year points) for a specific question. Ports buildLineGraphMini exactly. */
export function MiniLineGraph({ points }: { points: ChartDatum[] }) {
  const w = 250;
  const h = 130;
  const padL = 35;
  const padB = 25;
  const padT = 15;
  const padR = 15;
  const plotW = w - padL - padR;
  const plotH = h - padT - padB;
  const maxY = Math.max(...points.map((p) => p.value));
  const minY = Math.min(...points.map((p) => p.value));
  const xStep = plotW / (points.length - 1);
  const yScale = plotH / (maxY - minY || 1);
  const coords = points.map((p, i): [number, number] => [
    padL + i * xStep,
    padT + plotH - (p.value - minY) * yScale,
  ]);
  const path = coords.map((c, i) => (i === 0 ? "M" : "L") + c[0] + "," + c[1]).join(" ");

  return (
    <div className="mt-3 flex justify-center">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[270px]">
        <line
          x1={padL}
          y1={padT}
          x2={padL}
          y2={padT + plotH}
          stroke="rgba(255,255,255,0.25)"
          strokeWidth={1.3}
        />
        <line
          x1={padL}
          y1={padT + plotH}
          x2={w - padR}
          y2={padT + plotH}
          stroke="rgba(255,255,255,0.25)"
          strokeWidth={1.3}
        />
        <path d={path} fill="none" stroke={MATH_VIOLET} strokeWidth={1.8} />
        {coords.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={3.5} fill={MATH_VIOLET} />
            <text x={x} y={h - 8} fontSize={8.5} fill={FAINT} textAnchor="middle" fontFamily={FONT}>
              {points[i].label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/** Stacked dots above repeated values on a number line. Ports buildDotPlot exactly. */
export function DotPlot({ values, caption }: { values: number[]; caption?: string }) {
  const w = 300;
  const h = 140;
  const padL = 25;
  const padR = 25;
  const y0 = 110;
  const minV = Math.min(...values);
  const maxV = Math.max(...values);
  const plotW = w - padL - padR;
  const xScale = plotW / (maxV - minV);

  const ticks: number[] = [];
  for (let v = minV; v <= maxV; v++) ticks.push(v);

  const counts: Record<number, number> = {};
  const dots = [...values]
    .sort((a, b) => a - b)
    .map((v, i) => {
      counts[v] = (counts[v] || 0) + 1;
      const x = padL + (v - minV) * xScale;
      const stackY = y0 - 14 - (counts[v] - 1) * 16;
      return { key: `${v}-${i}`, x, stackY };
    });

  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[320px]">
        <line
          x1={padL}
          y1={y0}
          x2={w - padR}
          y2={y0}
          stroke="rgba(255,255,255,0.3)"
          strokeWidth={1.3}
        />
        {ticks.map((v) => {
          const x = padL + (v - minV) * xScale;
          return (
            <g key={v}>
              <line
                x1={x}
                y1={y0 - 5}
                x2={x}
                y2={y0 + 5}
                stroke="rgba(255,255,255,0.3)"
                strokeWidth={1.3}
              />
              <text
                x={x}
                y={y0 + 20}
                fontSize={10}
                fill={FAINT}
                textAnchor="middle"
                fontFamily={FONT}
              >
                {v}
              </text>
            </g>
          );
        })}
        {dots.map((d) => (
          <circle
            key={d.key}
            cx={d.x}
            cy={d.stackY}
            r={6.5}
            fill="rgba(139,107,255,0.5)"
            stroke={MATH_VIOLET}
            strokeWidth={1.3}
          />
        ))}
      </svg>
      {caption && <p className="mt-2.5 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}

/** Groups raw values into stem/leaf rows, sorted dynamically. Ports buildStemLeafFullChart exactly. */
export function StemLeafPlot({ values, keyCaption }: { values: number[]; keyCaption: string }) {
  const rows = new Map<number, number[]>();
  values.forEach((v) => {
    const stem = Math.floor(v / 10);
    const leaf = v % 10;
    if (!rows.has(stem)) rows.set(stem, []);
    rows.get(stem)!.push(leaf);
  });
  const stems = [...rows.keys()].sort((a, b) => a - b);

  return (
    <div className="mt-4 flex flex-col items-center">
      <table className="mx-auto border-collapse" style={{ fontFamily: FONT }}>
        <tbody>
          {stems.map((s) => (
            <tr key={s}>
              <td
                className="border-r-2 py-1.5 pr-3.5 text-right text-[15px] font-bold"
                style={{ color: MATH_VIOLET, borderColor: "rgba(139,107,255,0.4)" }}
              >
                {s}
              </td>
              <td className="py-1.5 pl-3.5 text-left text-[15px] text-white">
                {[...rows.get(s)!].sort((a, b) => a - b).join(" ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-2.5 text-center text-[11.5px] text-slate-500">{keyCaption}</p>
    </div>
  );
}

/** Two labeled buckets contrasting categorical vs. numerical data, each with an example. Ports buildCategoryBuckets exactly. */
export function CategoryBucketsDiagram({
  categoricalExample,
  numericalExample,
}: {
  categoricalExample: string;
  numericalExample: string;
}) {
  return (
    <div className="mt-3 flex justify-center">
      <svg viewBox="0 0 260 120" className="w-full max-w-[280px]">
        <rect
          x={20}
          y={20}
          width={100}
          height={80}
          rx={10}
          fill="rgba(139,107,255,0.1)"
          stroke={MATH_VIOLET}
          strokeWidth={2}
        />
        <text
          x={70}
          y={45}
          fontSize={12}
          fill={MATH_VIOLET}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          Categorical
        </text>
        <text x={70} y={70} fontSize={10.5} fill="#fff" textAnchor="middle" fontFamily={FONT}>
          {categoricalExample}
        </text>
        <text x={70} y={88} fontSize={10.5} fill={FAINT} textAnchor="middle" fontFamily={FONT}>
          described
        </text>
        <rect
          x={140}
          y={20}
          width={100}
          height={80}
          rx={10}
          fill="rgba(74,222,128,0.1)"
          stroke={MATH_GREEN}
          strokeWidth={2}
        />
        <text
          x={190}
          y={45}
          fontSize={12}
          fill={MATH_GREEN}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          Numerical
        </text>
        <text x={190} y={70} fontSize={10.5} fill="#fff" textAnchor="middle" fontFamily={FONT}>
          {numericalExample}
        </text>
        <text x={190} y={88} fontSize={10.5} fill={FAINT} textAnchor="middle" fontFamily={FONT}>
          measured
        </text>
      </svg>
    </div>
  );
}

/** One fixed dot vs. several varied dots — "one fixed answer" vs "a statistical (varied) question". Ports buildStatQCompare exactly. */
export function StatQuestionCompareDiagram({
  fixedLabel,
  variedLabel,
}: {
  fixedLabel: string;
  variedLabel: string;
}) {
  return (
    <div className="mt-3 flex justify-center">
      <svg viewBox="0 0 260 110" className="w-full max-w-[280px]">
        <circle
          cx={60}
          cy={45}
          r={10}
          fill="rgba(248,113,113,0.2)"
          stroke={MATH_RED}
          strokeWidth={1.5}
        />
        <text
          x={60}
          y={80}
          fontSize={10.5}
          fill={MATH_RED}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {fixedLabel}
        </text>
        <circle
          cx={150}
          cy={30}
          r={8}
          fill="rgba(74,222,128,0.2)"
          stroke={MATH_GREEN}
          strokeWidth={1.5}
        />
        <circle
          cx={175}
          cy={50}
          r={8}
          fill="rgba(74,222,128,0.2)"
          stroke={MATH_GREEN}
          strokeWidth={1.5}
        />
        <circle
          cx={200}
          cy={35}
          r={8}
          fill="rgba(74,222,128,0.2)"
          stroke={MATH_GREEN}
          strokeWidth={1.5}
        />
        <circle
          cx={225}
          cy={55}
          r={8}
          fill="rgba(74,222,128,0.2)"
          stroke={MATH_GREEN}
          strokeWidth={1.5}
        />
        <text
          x={187}
          y={85}
          fontSize={10.5}
          fill={MATH_GREEN}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {variedLabel}
        </text>
      </svg>
    </div>
  );
}

/** A small stem-and-leaf table with one row highlighted, for a specific lookup question. Ports buildStemLeafMini exactly. */
export function StemLeafMiniDiagram({
  stem,
  leaf,
  resultLabel,
}: {
  stem: string;
  leaf: string;
  resultLabel: string;
}) {
  return (
    <div className="mt-3 flex justify-center">
      <svg viewBox="0 0 220 130" className="w-full max-w-[240px]">
        <text
          x={60}
          y={20}
          fontSize={11}
          fill={FAINT}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          Stem
        </text>
        <text
          x={150}
          y={20}
          fontSize={11}
          fill={FAINT}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          Leaf
        </text>
        <line x1={105} y1={10} x2={105} y2={70} stroke="rgba(255,255,255,0.2)" strokeWidth={1.5} />
        <text x={60} y={42} fontSize={13} fill="#fff" textAnchor="middle" fontFamily={FONT}>
          5
        </text>
        <text x={150} y={42} fontSize={13} fill="#fff" textAnchor="middle" fontFamily={FONT}>
          0 2 9
        </text>
        <rect
          x={30}
          y={50}
          width={150}
          height={20}
          rx={4}
          fill="rgba(251,191,90,0.12)"
          stroke={MATH_AMBER}
          strokeWidth={1.3}
        />
        <text
          x={60}
          y={64}
          fontSize={13}
          fill={MATH_AMBER}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {stem}
        </text>
        <text
          x={150}
          y={64}
          fontSize={13}
          fill={MATH_AMBER}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {leaf}
        </text>
        <text
          x={105}
          y={105}
          fontSize={13}
          fill={MATH_GREEN}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {stem} | {leaf} → {resultLabel}
        </text>
      </svg>
    </div>
  );
}

/** Dot-plot vs. stem-and-leaf icon comparison, contrasting what each keeps/loses. Ports buildRepresentationCompare exactly. */
export function RepresentationCompareDiagram({
  positionOnlyLabel,
  exactValuesLabel,
}: {
  positionOnlyLabel: string;
  exactValuesLabel: string;
}) {
  return (
    <div className="mt-3 flex justify-center">
      <svg viewBox="0 0 260 120" className="w-full max-w-[280px]">
        <text
          x={65}
          y={18}
          fontSize={11}
          fill={FAINT}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          Dot Plot
        </text>
        <line x1={25} y1={60} x2={105} y2={60} stroke="rgba(255,255,255,0.3)" strokeWidth={1.3} />
        <circle cx={45} cy={55} r={4} fill={MATH_VIOLET} />
        <circle cx={45} cy={47} r={4} fill={MATH_VIOLET} />
        <circle cx={65} cy={55} r={4} fill={MATH_VIOLET} />
        <circle cx={85} cy={55} r={4} fill={MATH_VIOLET} />
        <circle cx={85} cy={47} r={4} fill={MATH_VIOLET} />
        <circle cx={85} cy={39} r={4} fill={MATH_VIOLET} />
        <text x={65} y={90} fontSize={9.5} fill={FAINT} textAnchor="middle" fontFamily={FONT}>
          {positionOnlyLabel}
        </text>
        <text
          x={195}
          y={18}
          fontSize={11}
          fill={FAINT}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          Stem-and-Leaf
        </text>
        <text x={170} y={45} fontSize={11} fill="#fff" fontFamily={FONT}>
          2 | 4 7
        </text>
        <text x={170} y={62} fontSize={11} fill="#fff" fontFamily={FONT}>
          3 | 1 5 8
        </text>
        <text x={195} y={90} fontSize={9.5} fill={MATH_GREEN} textAnchor="middle" fontFamily={FONT}>
          {exactValuesLabel}
        </text>
      </svg>
    </div>
  );
}
