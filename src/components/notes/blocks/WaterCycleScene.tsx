type Lang = "en" | "bm";

const LABELS: Record<Lang, {
  sun: string; condensation: string; evaporation: string; precipitation: string; river: string; groundwater: string; sea: string;
}> = {
  en: {
    sun: "Sun",
    condensation: "Condensation — water vapour forms clouds",
    evaporation: "Evaporation",
    precipitation: "Precipitation (rain)",
    river: "River — flows to the sea",
    groundwater: "Groundwater",
    sea: "Sea / Ocean",
  },
  bm: {
    sun: "Matahari",
    condensation: "Kondensasi — wap air membentuk awan",
    evaporation: "Penyejatan",
    precipitation: "Kerpasan (hujan)",
    river: "Sungai — mengalir ke laut",
    groundwater: "Air bawah tanah",
    sea: "Laut / Lautan",
  },
};

export function WaterCycleScene({ lang, caption }: { lang: Lang; caption: string }) {
  const t = LABELS[lang];
  return (
    <div className="rounded-2xl border border-border bg-secondary/40 p-4 sm:p-5">
      <div className="flex justify-center overflow-x-auto py-1">
        <svg viewBox="0 0 520 320" className="w-full min-w-[460px] max-w-[520px]">
          <rect x="0" y="0" width="520" height="230" className="fill-card" />
          <circle cx="60" cy="45" r="20" className="fill-amber-300" />
          <path d="M 0 230 L 90 100 L 160 230 Z" className="fill-muted" />
          <path d="M 70 140 L 90 100 L 110 140 Z" className="fill-foreground" opacity="0.6" />
          <rect x="320" y="200" width="200" height="30" className="fill-primary" opacity="0.35" />
          <rect x="0" y="230" width="520" height="90" className="fill-secondary" />
          <path d="M 100 200 Q 180 220 260 215 Q 320 210 340 215" fill="none" className="stroke-primary" strokeWidth="6" opacity="0.7" />
          <ellipse cx="300" cy="55" rx="55" ry="26" className="fill-muted-foreground" opacity="0.4" />
          <ellipse cx="250" cy="65" rx="35" ry="20" className="fill-muted-foreground" opacity="0.4" />
          <ellipse cx="350" cy="65" rx="38" ry="20" className="fill-muted-foreground" opacity="0.4" />

          <path d="M 400 200 Q 380 130 340 85" fill="none" className="stroke-primary" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.7" />
          <circle className="notes-cloud-rise fill-primary" cx="400" cy="195" r="3" />
          <circle className="notes-cloud-rise fill-primary" cx="408" cy="195" r="3" style={{ animationDelay: "1s" }} />
          <circle className="notes-cloud-rise fill-primary" cx="395" cy="195" r="3" style={{ animationDelay: "2s" }} />

          <line className="notes-rain-fall stroke-primary" x1="270" y1="90" x2="266" y2="105" strokeWidth="2.5" />
          <line className="notes-rain-fall stroke-primary" x1="290" y1="90" x2="286" y2="105" strokeWidth="2.5" style={{ animationDelay: "0.3s" }} />
          <line className="notes-rain-fall stroke-primary" x1="250" y1="90" x2="246" y2="105" strokeWidth="2.5" style={{ animationDelay: "0.6s" }} />
          <line className="notes-rain-fall stroke-primary" x1="230" y1="90" x2="226" y2="105" strokeWidth="2.5" style={{ animationDelay: "0.9s" }} />
          <line className="notes-rain-fall stroke-primary" x1="210" y1="90" x2="206" y2="105" strokeWidth="2.5" style={{ animationDelay: "1.2s" }} />

          <path d="M 130 225 L 128 260" fill="none" className="stroke-emerald-400" strokeWidth="1.5" strokeDasharray="3 3" />
          <polygon points="128,264 124,256 132,256" className="fill-emerald-400" />
          <path d="M 200 225 L 198 260" fill="none" className="stroke-emerald-400" strokeWidth="1.5" strokeDasharray="3 3" />
          <polygon points="198,264 194,256 202,256" className="fill-emerald-400" />

          <text x="60" y="20" fontSize="10.5" textAnchor="middle" fontWeight="700" className="fill-foreground">
            {t.sun}
          </text>
          <text x="300" y="30" fontSize="11" textAnchor="middle" fontWeight="700" className="fill-foreground">
            {t.condensation}
          </text>
          <text x="410" y="150" fontSize="10.5" textAnchor="middle" fontWeight="700" className="fill-primary">
            {t.evaporation}
          </text>
          <text x="250" y="120" fontSize="10.5" textAnchor="middle" fontWeight="700" className="fill-primary">
            {t.precipitation}
          </text>
          <text x="160" y="248" fontSize="10.5" fontWeight="700" className="fill-foreground">
            {t.river}
          </text>
          <text x="165" y="285" fontSize="10.5" fontWeight="700" className="fill-emerald-400">
            {t.groundwater}
          </text>
          <text x="420" y="220" fontSize="10.5" textAnchor="middle" fontWeight="700" className="fill-foreground">
            {t.sea}
          </text>
        </svg>
      </div>
      <p className="mt-2 text-center text-[11.5px] text-muted-foreground">{caption}</p>
    </div>
  );
}
