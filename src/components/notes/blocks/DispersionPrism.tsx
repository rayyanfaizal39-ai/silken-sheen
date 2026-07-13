type Lang = "en" | "bm";

const RAY_HEX = ["#f87171", "#fb923c", "#fde047", "#4ade80", "#4fb0ff", "#6366f1", "#a78bfa"];
const RAY_END: [number, number][] = [
  [230, 70],
  [235, 80],
  [240, 90],
  [245, 100],
  [240, 110],
  [235, 120],
  [230, 130],
];

const LABELS: Record<Lang, { whiteLight: string; fastest: string; slowest: string }> = {
  en: { whiteLight: "White light", fastest: "fastest, bends least", slowest: "slowest, bends most" },
  bm: { whiteLight: "Cahaya putih", fastest: "terpantas, membias paling sedikit", slowest: "terperlahan, membias paling banyak" },
};

export function DispersionPrism({ lang, spectrumOrder }: { lang: Lang; spectrumOrder: string[] }) {
  const t = LABELS[lang];
  const red = spectrumOrder[0];
  const violet = spectrumOrder[spectrumOrder.length - 1];

  return (
    <div className="rounded-2xl border border-border bg-secondary/40 p-4 text-center sm:p-5">
      <div className="overflow-x-auto py-1">
        <svg viewBox="0 0 460 200" className="mx-auto w-full min-w-[420px] max-w-[460px]">
          <line x1="30" y1="100" x2="140" y2="100" className="stroke-foreground" strokeWidth="3" opacity="0.8" />
          <polygon points="140,60 190,100 140,140" className="fill-card stroke-violet-400" strokeWidth="2" />
          {RAY_END.map((pt, i) => (
            <line key={i} x1="165" y1="100" x2={pt[0]} y2={pt[1]} stroke={RAY_HEX[i]} strokeWidth="2" />
          ))}
          <text x="60" y="90" fontSize="11" textAnchor="middle" className="fill-muted-foreground">
            {t.whiteLight}
          </text>
        </svg>
      </div>
      <div className="mx-auto mt-2 flex max-w-[420px] flex-col gap-1.5 text-left text-[12px] font-semibold">
        <p style={{ color: RAY_HEX[0] }}>
          {red} — {t.fastest}
        </p>
        <p style={{ color: RAY_HEX[6] }}>
          {violet} — {t.slowest}
        </p>
      </div>
    </div>
  );
}
