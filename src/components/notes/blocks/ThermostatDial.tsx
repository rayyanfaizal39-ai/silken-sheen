type Lang = "en" | "bm";

const LABELS: Record<Lang, { low: string; normal: string; high: string; caption: string }> = {
  en: {
    low: "TOO LOW",
    normal: "NORMAL",
    high: "TOO HIGH",
    caption:
      "The control centre detects the swing away from normal → triggers a corrective mechanism → the needle returns to centre. This one loop explains every homeostasis example in this chapter.",
  },
  bm: {
    low: "TERLALU RENDAH",
    normal: "NORMAL",
    high: "TERLALU TINGGI",
    caption:
      "Pusat kawalan mengesan perubahan daripada normal → mencetuskan mekanisme pembetulan → jarum kembali ke tengah. Satu gelung ini menerangkan setiap contoh homeostasis dalam bab ini.",
  },
};

export function ThermostatDial({ lang }: { lang: Lang }) {
  const t = LABELS[lang];
  return (
    <div className="rounded-2xl border border-border bg-secondary/40 p-4 text-center sm:p-5">
      <div className="flex justify-center py-1">
        <svg viewBox="0 0 320 230" className="w-full max-w-[300px]">
          <path d="M 40 170 A 120 120 0 0 1 300 170" fill="none" className="stroke-border" strokeWidth="20" strokeLinecap="round" />
          <path d="M 40 170 A 120 120 0 0 1 118 60" fill="none" className="stroke-primary" strokeWidth="20" strokeLinecap="round" opacity="0.8" />
          <path d="M 118 60 A 120 120 0 0 1 222 60" fill="none" className="stroke-emerald-400" strokeWidth="20" strokeLinecap="round" opacity="0.8" />
          <path d="M 222 60 A 120 120 0 0 1 300 170" fill="none" className="stroke-red-400" strokeWidth="20" strokeLinecap="round" opacity="0.8" />
          <g className="notes-needle-swing" style={{ transformOrigin: "160px 170px" }}>
            <line x1="160" y1="170" x2="160" y2="70" className="stroke-accent" strokeWidth="4" strokeLinecap="round" />
            <circle cx="160" cy="170" r="9" className="fill-accent" />
          </g>
          <text x="48" y="205" className="fill-primary" fontSize="12" fontWeight="700" textAnchor="middle">
            {t.low}
          </text>
          <text x="160" y="35" className="fill-emerald-400" fontSize="12" fontWeight="700" textAnchor="middle">
            {t.normal}
          </text>
          <text x="272" y="205" className="fill-red-400" fontSize="12" fontWeight="700" textAnchor="middle">
            {t.high}
          </text>
        </svg>
      </div>
      <p className="mx-auto mt-1 max-w-[420px] text-[12px] leading-relaxed text-muted-foreground">{t.caption}</p>
    </div>
  );
}
