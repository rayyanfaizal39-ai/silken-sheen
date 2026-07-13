export interface DensityColumnRow {
  material: string;
  density: string;
}

type Lang = "en" | "bm";

const LABEL: Record<Lang, { waterLine: string; floats: string; sinks: string }> = {
  en: { waterLine: "Water line", floats: "Floats (< water)", sinks: "Sinks (> water)" },
  bm: { waterLine: "Aras air", floats: "Terapung (< air)", sinks: "Tenggelam (> air)" },
};

const TOP = 20;
const BOTTOM = 240;
const MIN_GAP = 27;
const TANK_X = 95;
const TANK_WIDTH = 70;

export function DensityColumn({ table, lang }: { table: DensityColumnRow[]; lang: Lang }) {
  const t = LABEL[lang];

  const parsed = table.map((row) => ({ ...row, value: parseFloat(row.density) })).filter((row) => Number.isFinite(row.value));
  const logs = parsed.map((row) => Math.log10(row.value));
  const minLog = Math.min(...logs);
  const maxLog = Math.max(...logs);
  const span = maxLog - minLog || 1;

  const positioned = parsed
    .map((row, i) => ({ ...row, fraction: (logs[i] - minLog) / span }))
    .sort((a, b) => a.fraction - b.fraction)
    .map((row) => ({ ...row, y: TOP + row.fraction * (BOTTOM - TOP) }));

  for (let i = 1; i < positioned.length; i++) {
    if (positioned[i].y < positioned[i - 1].y + MIN_GAP) {
      positioned[i].y = positioned[i - 1].y + MIN_GAP;
    }
  }

  const waterFraction = (0 - minLog) / span;
  const waterY = TOP + waterFraction * (BOTTOM - TOP);
  const height = Math.max(BOTTOM, (positioned[positioned.length - 1]?.y ?? BOTTOM) + 20) + 20;
  const tankRight = TANK_X + TANK_WIDTH;

  return (
    <div className="flex flex-col items-center rounded-2xl border border-border bg-secondary/40 p-4 sm:p-5">
      <svg viewBox={`0 0 340 ${height}`} className="w-full max-w-[360px]">
        <rect x={TANK_X} y="15" width={TANK_WIDTH} height={height - 30} rx="6" fill="none" className="stroke-muted-foreground" strokeWidth="2" />
        <rect x={TANK_X + 2} y="17" width={TANK_WIDTH - 4} height={height - 34} className="fill-primary" opacity="0.1" />
        <line x1={TANK_X} y1={waterY} x2={tankRight} y2={waterY} className="stroke-foreground" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
        <text x={TANK_X - 6} y={waterY - 4} fontSize="9" textAnchor="end" className="fill-muted-foreground">
          {t.waterLine}
        </text>
        <text x={TANK_X - 6} y={waterY + 8} fontSize="8.5" textAnchor="end" className="fill-muted-foreground">
          1.00 g cm⁻³
        </text>
        {positioned.map((row) => {
          const sinks = row.value > 1;
          return (
            <g key={row.material}>
              <circle cx={TANK_X + TANK_WIDTH / 2} cy={row.y} r="6" className={sinks ? "fill-accent" : "fill-primary"} />
              <line x1={tankRight + 6} y1={row.y} x2={tankRight + 20} y2={row.y} className="stroke-muted-foreground" strokeWidth="1" opacity="0.4" />
              <text x={tankRight + 24} y={row.y - 2} fontSize="9.5" fontWeight="700" className="fill-foreground">
                {row.material}
              </text>
              <text x={tankRight + 24} y={row.y + 9} fontSize="8.5" className="fill-muted-foreground">
                {row.density} g cm⁻³
              </text>
            </g>
          );
        })}
      </svg>
      <div className="mt-3 flex flex-wrap justify-center gap-3 text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-primary" /> {t.floats}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-accent" /> {t.sinks}
        </span>
      </div>
    </div>
  );
}
