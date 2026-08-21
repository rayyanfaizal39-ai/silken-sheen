export interface DensityColumnRow {
  material: string;
  density: string;
}

type Lang = "en" | "bm";

const COPY: Record<Lang, { title: string; note: string; less: string; water: string; greater: string }> = {
  en: {
    title: "Density order relative to pure water",
    note: "Ordered by numerical density; row spacing is not a measurement scale.",
    less: "Less dense than water (< 1.00)",
    water: "Pure-water reference (= 1.00)",
    greater: "More dense than water (> 1.00)",
  },
  bm: {
    title: "Urutan ketumpatan berbanding air tulen",
    note: "Disusun mengikut nilai ketumpatan; jarak baris bukan skala ukuran.",
    less: "Kurang tumpat daripada air (< 1.00)",
    water: "Rujukan air tulen (= 1.00)",
    greater: "Lebih tumpat daripada air (> 1.00)",
  },
};

function category(value: number): "less" | "water" | "greater" {
  if (value < 1) return "less";
  if (value > 1) return "greater";
  return "water";
}

export function DensityColumn({ table, lang }: { table: DensityColumnRow[]; lang: Lang }) {
  const t = COPY[lang];
  const rows = table
    .map((row) => ({ ...row, value: Number.parseFloat(row.density) }))
    .filter((row) => Number.isFinite(row.value))
    .sort((a, b) => a.value - b.value);

  return (
    <figure className="rounded-2xl border border-border bg-secondary/40 p-4 sm:p-5">
      <figcaption className="text-center">
        <p className="font-display text-sm font-bold text-foreground">{t.title}</p>
        <p className="mt-1 text-[11px] text-muted-foreground">{t.note}</p>
      </figcaption>
      <div className="mx-auto mt-4 max-w-md overflow-hidden rounded-xl border-2 border-muted-foreground/50 bg-primary/5 p-2">
        {rows.map((row) => {
          const state = category(row.value);
          return (
            <div
              key={row.material}
              className={`flex items-center justify-between gap-3 border-b border-border/70 px-3 py-2.5 last:border-b-0 ${
                state === "water" ? "rounded-lg border border-primary/50 bg-primary/15" : ""
              }`}
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <span
                  className={`h-3 w-3 shrink-0 rounded-full border ${
                    state === "less"
                      ? "border-sky-600 bg-sky-400"
                      : state === "greater"
                        ? "border-orange-700 bg-orange-500"
                        : "border-primary bg-primary"
                  }`}
                  aria-hidden="true"
                />
                <span className="truncate text-xs font-semibold text-foreground">{row.material}</span>
              </div>
              <span className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground">{row.density} g cm⁻³</span>
            </div>
          );
        })}
      </div>
      <div className="mt-4 grid gap-2 text-[11px] text-muted-foreground sm:grid-cols-3">
        <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full border border-sky-600 bg-sky-400" />{t.less}</span>
        <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full border border-primary bg-primary" />{t.water}</span>
        <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full border border-orange-700 bg-orange-500" />{t.greater}</span>
      </div>
    </figure>
  );
}
