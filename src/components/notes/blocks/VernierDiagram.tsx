type Lang = "en" | "bm";

const COPY: Record<Lang, { title: string; main: string; vernier: string; aligned: string; calculation: string }> = {
  en: {
    title: "Reading a Vernier caliper with a 0.01 cm smallest division",
    main: "Main scale",
    vernier: "Vernier scale",
    aligned: "2nd Vernier division aligns",
    calculation: "Reading = 3.20 cm + (2 × 0.01 cm) = 3.22 cm",
  },
  bm: {
    title: "Membaca angkup vernier dengan senggatan terkecil 0.01 cm",
    main: "Skala utama",
    vernier: "Skala vernier",
    aligned: "Senggatan vernier ke-2 sejajar",
    calculation: "Bacaan = 3.20 cm + (2 × 0.01 cm) = 3.22 cm",
  },
};

const mainTicks = Array.from({ length: 13 }, (_, index) => ({ x: 70 + index * 30, index }));
const vernierTicks = Array.from({ length: 11 }, (_, index) => ({ x: 136 + index * 27, index }));

export function VernierDiagram({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  return (
    <figure className="rounded-2xl border border-border bg-secondary/40 p-4 text-center sm:p-5">
      <figcaption className="font-display mb-3 text-[13px] font-bold text-foreground">{t.title}</figcaption>
      <svg viewBox="0 0 480 170" className="mx-auto w-full max-w-[520px]" role="img" aria-label={`${t.title}. ${t.calculation}`}>
        <title>{`${t.title}. ${t.calculation}`}</title>
        <text x="26" y="28" className="fill-muted-foreground" fontSize="11">{t.main}</text>
        <line x1="55" y1="58" x2="445" y2="58" className="stroke-foreground" strokeWidth="2" />
        {mainTicks.map(({ x, index }) => (
          <g key={index}>
            <line x1={x} y1="42" x2={x} y2={index % 10 === 0 ? 72 : 66} className="stroke-foreground" strokeWidth={index % 10 === 0 ? 2 : 1.25} />
            {index % 10 === 0 && (
              <text x={x} y="36" className="fill-foreground" fontSize="12" textAnchor="middle" fontWeight="700">
                {3 + index / 10}
              </text>
            )}
          </g>
        ))}

        <rect x="136" y="82" width="270" height="42" rx="5" className="fill-primary/10 stroke-primary" strokeWidth="1.5" />
        <text x="26" y="111" className="fill-muted-foreground" fontSize="11">{t.vernier}</text>
        {vernierTicks.map(({ x, index }) => (
          <g key={index}>
            <line
              x1={x}
              y1="82"
              x2={x}
              y2={index === 0 || index === 5 || index === 10 ? 116 : 108}
              className={index === 2 ? "stroke-amber-500" : "stroke-primary"}
              strokeWidth={index === 2 ? 2.5 : 1.25}
            />
            {(index === 0 || index === 5 || index === 10) && (
              <text x={x} y="137" className="fill-muted-foreground" fontSize="10" textAnchor="middle">{index}</text>
            )}
          </g>
        ))}

        <line x1="190" y1="38" x2="190" y2="124" className="stroke-amber-500" strokeWidth="1.5" strokeDasharray="4 3" />
        <circle cx="190" cy="58" r="4" className="fill-amber-500" />
        <text x="190" y="157" className="fill-amber-600 dark:fill-amber-300" fontSize="11" textAnchor="middle" fontWeight="700">
          {t.aligned}
        </text>
      </svg>
      <p className="mt-2 font-mono text-xs font-semibold tabular-nums text-foreground sm:text-sm">{t.calculation}</p>
    </figure>
  );
}
