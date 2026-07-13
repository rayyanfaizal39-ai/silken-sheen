type Lang = "en" | "bm";

const CAPTION: Record<Lang, { intro: string; readoutBefore: string; readoutMid: string; markLabel: string }> = {
  en: {
    intro: "Reading a Vernier caliper (0.01 cm)",
    readoutBefore: "Main scale reads",
    readoutMid: ", vernier aligns at the 3rd division → total",
    markLabel: "Best alignment = 3rd mark",
  },
  bm: {
    intro: "Membaca angkup vernier (0.01 cm)",
    readoutBefore: "Skala utama membaca",
    readoutMid: ", vernier sejajar pada bahagian ke-3 → jumlah",
    markLabel: "Sejajar terbaik = tanda ke-3",
  },
};

export function VernierDiagram({ lang }: { lang: Lang }) {
  const t = CAPTION[lang];
  return (
    <div className="rounded-2xl border border-border bg-secondary/40 p-4 text-center sm:p-5">
      <p className="font-display mb-3 text-[13px] font-bold text-foreground">{t.intro}</p>
      <svg viewBox="0 0 480 140" className="mx-auto w-full max-w-[480px]">
        <line x1="20" y1="50" x2="460" y2="50" className="stroke-muted-foreground" strokeWidth="2" />
        <g className="stroke-muted-foreground" strokeWidth="1.5">
          <line x1="20" y1="40" x2="20" y2="60" />
          <line x1="60" y1="40" x2="60" y2="60" />
          <line x1="100" y1="40" x2="100" y2="60" />
          <line x1="140" y1="40" x2="140" y2="60" />
          <line x1="180" y1="40" x2="180" y2="60" />
          <line x1="220" y1="40" x2="220" y2="60" />
          <line x1="260" y1="40" x2="260" y2="60" />
          <line x1="300" y1="40" x2="300" y2="60" />
        </g>
        <text x="20" y="35" className="fill-muted-foreground" fontSize="11" textAnchor="middle">2</text>
        <text x="60" y="35" className="fill-muted-foreground" fontSize="11" textAnchor="middle">3</text>
        <text x="100" y="35" className="fill-muted-foreground" fontSize="11" textAnchor="middle">4</text>
        <text x="140" y="35" className="fill-muted-foreground" fontSize="11" textAnchor="middle">5</text>
        <rect x="95" y="65" width="90" height="26" className="fill-accent stroke-accent" opacity="0.25" />
        <g className="stroke-accent" strokeWidth="1" opacity="0.8">
          <line x1="95" y1="65" x2="95" y2="91" />
          <line x1="104" y1="65" x2="104" y2="91" />
          <line x1="113" y1="65" x2="113" y2="91" />
          <line x1="122" y1="65" x2="122" y2="91" />
          <line x1="131" y1="65" x2="131" y2="91" />
          <line x1="140" y1="65" x2="140" y2="91" />
          <line x1="149" y1="65" x2="149" y2="91" />
        </g>
        <circle cx="122" cy="78" r="5" className="fill-amber-400" />
        <line x1="122" y1="91" x2="122" y2="115" className="stroke-amber-400" strokeWidth="1.5" strokeDasharray="2 2" />
        <text x="122" y="130" className="fill-amber-400" fontSize="12" textAnchor="middle" fontWeight="700">
          {t.markLabel}
        </text>
      </svg>
      <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground">
        {t.readoutBefore} <span className="font-semibold text-foreground">4.3 cm</span>
        {t.readoutMid} <span className="font-semibold text-amber-400">4.33 cm</span>
      </p>
    </div>
  );
}
