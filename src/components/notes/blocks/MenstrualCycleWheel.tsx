import type { CyclePhase } from "@/content/form1/science/chapter-4/chapter4-content";

type Lang = "en" | "bm";

/** Real day-counts per phase, in the fixed order menstrualCycle.phases is written in chapter4-content.ts. */
const DAY_COUNTS = [5, 6, 6, 11];
const PHASE_COLOR = ["#f87171", "#4fb0ff", "#4ade80", "#a78bfa"];
const PHASE_TEXT_CLASS = ["text-red-400", "text-primary", "text-emerald-400", "text-violet-400"];

const CENTER_LABEL: Record<Lang, { top: string; bottom: string }> = {
  en: { top: "28-Day", bottom: "Cycle" },
  bm: { top: "Kitar", bottom: "28 Hari" },
};

const CX = 230;
const CY = 210;
const R = 140;

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

/** Standard donut-arc path builder — start/end swapped with sweep=0 so angles sweep clockwise from the top. */
function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}

export function MenstrualCycleWheel({ lang, phases }: { lang: Lang; phases: CyclePhase[] }) {
  const total = DAY_COUNTS.reduce((a, b) => a + b, 0);
  let cursor = 0;
  const segments = phases.map((phase, i) => {
    const startAngle = (cursor / total) * 360;
    cursor += DAY_COUNTS[i];
    const endAngle = (cursor / total) * 360;
    const midAngle = (startAngle + endAngle) / 2;
    const normalized = ((midAngle % 360) + 360) % 360;
    const textAnchor: "start" | "middle" | "end" =
      normalized > 100 && normalized < 260 ? "end" : normalized > 80 && normalized < 280 ? "middle" : "start";
    const leaderStart = polarToCartesian(CX, CY, R + 16, midAngle);
    const leaderEnd = polarToCartesian(CX, CY, R + 42, midAngle);
    const dayStartLabel = cursor - DAY_COUNTS[i] + 1;
    const dayMarkerPos = polarToCartesian(CX, CY, R + 16, startAngle);
    return { phase, startAngle, endAngle, textAnchor, leaderStart, leaderEnd, dayStartLabel, dayMarkerPos, color: PHASE_COLOR[i], textClass: PHASE_TEXT_CLASS[i] };
  });
  const t = CENTER_LABEL[lang];

  return (
    <div className="rounded-2xl border border-border bg-secondary/40 p-4 sm:p-5">
      <div className="flex justify-center overflow-x-auto py-1">
        <svg viewBox="0 0 460 420" className="w-full max-w-[440px]">
          <circle cx={CX} cy={CY} r={R} fill="none" className="stroke-border" strokeWidth="28" />
          {segments.map((s) => (
            <path key={s.phase.name} d={describeArc(CX, CY, R, s.startAngle, s.endAngle)} fill="none" stroke={s.color} strokeWidth="28" />
          ))}
          <circle cx={CX} cy={CY} r={R - 50} className="fill-card" />
          <text x={CX} y={CY - 6} textAnchor="middle" fontSize="15" fontWeight="700" className="fill-foreground font-display">
            {t.top}
          </text>
          <text x={CX} y={CY + 14} textAnchor="middle" fontSize="13" className="fill-muted-foreground">
            {t.bottom}
          </text>

          {segments.map((s) => (
            <text
              key={`marker-${s.phase.name}`}
              x={s.dayMarkerPos.x}
              y={s.dayMarkerPos.y}
              textAnchor="middle"
              fontSize="9.5"
              fontWeight="700"
              className="fill-white"
            >
              {lang === "en" ? `Day ${s.dayStartLabel}` : `Hari ${s.dayStartLabel}`}
            </text>
          ))}

          {segments.map((s) => (
            <g key={`label-${s.phase.name}`}>
              <line x1={s.leaderStart.x} y1={s.leaderStart.y} x2={s.leaderEnd.x} y2={s.leaderEnd.y} stroke={s.color} strokeWidth="1.5" />
              <text
                x={s.leaderEnd.x + (s.textAnchor === "start" ? 4 : s.textAnchor === "end" ? -4 : 0)}
                y={s.leaderEnd.y - 6}
                textAnchor={s.textAnchor}
                fontSize="13"
                fontWeight="700"
                className={s.textClass}
              >
                {s.phase.name}
              </text>
              <text
                x={s.leaderEnd.x + (s.textAnchor === "start" ? 4 : s.textAnchor === "end" ? -4 : 0)}
                y={s.leaderEnd.y + 10}
                textAnchor={s.textAnchor}
                fontSize="11"
                className="fill-muted-foreground"
              >
                {s.phase.days}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-2">
        {segments.map((s) => (
          <span key={`legend-${s.phase.name}`} className="inline-flex items-center gap-1.5 text-[11.5px] text-muted-foreground">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: s.color }} />
            {s.phase.name} — {s.phase.description}
          </span>
        ))}
      </div>
    </div>
  );
}
