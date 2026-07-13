type Lang = "en" | "bm";

const TITLE: Record<Lang, { animal: string; plant: string }> = {
  en: { animal: "Animal Cell", plant: "Plant Cell" },
  bm: { animal: "Sel Haiwan", plant: "Sel Tumbuhan" },
};

const CAPTION: Record<Lang, string> = {
  en: "Diagrams are simplified for clarity — see the full structures table below for every structure, its function, and which cells have it.",
  bm: "Rajah ini dipermudahkan untuk kejelasan — lihat jadual struktur penuh di bawah untuk setiap struktur, fungsinya, dan sel yang memilikinya.",
};

function LegendChip({ colorClass, label }: { colorClass: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-[11px] text-muted-foreground">
      <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${colorClass}`} />
      {label}
    </span>
  );
}

export function CellDiagram({
  structures,
  lang,
}: {
  /** Fixed order: Nucleus, Cell membrane, Cytoplasm, Mitochondria, Cell wall, Chloroplast, Vacuole — matches cellStructures in chapter2-content.ts */
  structures: { name: string }[];
  lang: Lang;
}) {
  const [nucleus, membrane, cytoplasm, mitochondria, wall, chloroplast, vacuole] = structures.map((s) => s.name);
  const t = TITLE[lang];

  return (
    <div className="flex flex-wrap justify-center gap-5">
      <div className="min-w-[260px] flex-1 rounded-2xl border border-border bg-secondary/40 p-4 text-center">
        <svg viewBox="0 0 240 200" className="mx-auto w-full max-w-[240px]">
          <ellipse cx="120" cy="100" rx="105" ry="85" className="fill-secondary stroke-primary" strokeWidth="2.5" />
          <ellipse cx="120" cy="100" rx="97" ry="77" className="fill-sky-400" opacity="0.14" />
          <circle cx="90" cy="90" r="30" className="fill-accent" opacity="0.55" />
          <circle cx="150" cy="120" r="11" className="fill-amber-400" opacity="0.8" />
          <circle cx="70" cy="130" r="9" className="fill-amber-400" opacity="0.8" />
        </svg>
        <h3 className="font-display mt-2 text-sm font-bold text-foreground">{t.animal}</h3>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          <LegendChip colorClass="bg-primary" label={membrane} />
          <LegendChip colorClass="bg-sky-400" label={cytoplasm} />
          <LegendChip colorClass="bg-accent" label={nucleus} />
          <LegendChip colorClass="bg-amber-400" label={mitochondria} />
        </div>
      </div>

      <div className="min-w-[260px] flex-1 rounded-2xl border border-border bg-secondary/40 p-4 text-center">
        <svg viewBox="0 0 240 200" className="mx-auto w-full max-w-[240px]">
          <rect x="20" y="20" width="200" height="160" rx="14" className="fill-secondary stroke-emerald-400" strokeWidth="3" />
          <rect x="28" y="28" width="184" height="144" rx="10" className="fill-sky-400" opacity="0.14" />
          <ellipse cx="150" cy="100" rx="55" ry="45" className="fill-primary" opacity="0.15" />
          <circle cx="90" cy="80" r="26" className="fill-accent" opacity="0.55" />
          <ellipse cx="150" cy="55" rx="14" ry="9" className="fill-emerald-500" opacity="0.85" />
          <ellipse cx="175" cy="90" rx="14" ry="9" className="fill-emerald-500" opacity="0.85" />
          <ellipse cx="150" cy="130" rx="14" ry="9" className="fill-emerald-500" opacity="0.85" />
          <circle cx="195" cy="45" r="9" className="fill-amber-400" opacity="0.8" />
          <circle cx="45" cy="150" r="10" className="fill-amber-400" opacity="0.8" />
        </svg>
        <h3 className="font-display mt-2 text-sm font-bold text-foreground">{t.plant}</h3>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          <LegendChip colorClass="bg-emerald-400" label={wall} />
          <LegendChip colorClass="bg-sky-400" label={cytoplasm} />
          <LegendChip colorClass="bg-primary" label={vacuole} />
          <LegendChip colorClass="bg-accent" label={nucleus} />
          <LegendChip colorClass="bg-emerald-500" label={chloroplast} />
          <LegendChip colorClass="bg-amber-400" label={mitochondria} />
        </div>
      </div>

      <p className="w-full text-[11.5px] italic text-muted-foreground">{CAPTION[lang]}</p>
    </div>
  );
}
