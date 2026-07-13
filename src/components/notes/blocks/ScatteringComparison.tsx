type Lang = "en" | "bm";

const LABELS: Record<Lang, { midday: string; sunset: string; observerUp: string; observerHorizon: string }> = {
  en: { midday: "Midday", sunset: "Sunset", observerUp: "You, looking up", observerHorizon: "You, looking at the horizon" },
  bm: { midday: "Tengah Hari", sunset: "Matahari Terbenam", observerUp: "Anda, melihat ke atas", observerHorizon: "Anda, melihat ke ufuk" },
};

function MiddayPanel({ lang }: { lang: Lang }) {
  const t = LABELS[lang];
  return (
    <svg viewBox="0 0 280 220" className="mx-auto w-full max-w-[260px]">
      <rect x="0" y="190" width="280" height="30" className="fill-secondary" />
      <path d="M 0 190 Q 140 150 280 190 L 280 60 Q 140 20 0 60 Z" className="fill-sky-400" opacity="0.08" />
      <circle cx="140" cy="30" r="16" className="fill-amber-300" />
      <line x1="140" y1="46" x2="140" y2="190" className="stroke-foreground" strokeWidth="2.5" opacity="0.7" />
      <circle cx="120" cy="90" r="3" className="fill-primary" />
      <circle cx="160" cy="100" r="3" className="fill-primary" />
      <circle cx="100" cy="130" r="3" className="fill-primary" />
      <circle cx="175" cy="140" r="3" className="fill-primary" />
      <circle cx="130" cy="160" r="3" className="fill-primary" />
      <circle cx="155" cy="70" r="3" className="fill-primary" />
      <circle cx="140" cy="195" r="5" className="fill-foreground" />
      <text x="140" y="212" fontSize="10" textAnchor="middle" className="fill-muted-foreground">
        {t.observerUp}
      </text>
      <text x="140" y="45" fontSize="10.5" textAnchor="middle" fontWeight="700" className="fill-foreground">
        {t.midday}
      </text>
    </svg>
  );
}

function SunsetPanel({ lang }: { lang: Lang }) {
  const t = LABELS[lang];
  return (
    <svg viewBox="0 0 280 220" className="mx-auto w-full max-w-[260px]">
      <rect x="0" y="190" width="280" height="30" className="fill-secondary" />
      <path d="M 0 190 Q 140 150 280 190 L 280 60 Q 140 20 0 60 Z" className="fill-sky-400" opacity="0.08" />
      <circle cx="20" cy="175" r="16" className="fill-orange-400" />
      <path d="M 36 172 Q 140 130 255 185" fill="none" className="stroke-red-400" strokeWidth="2.5" />
      <circle cx="70" cy="150" r="3" className="fill-primary" />
      <circle cx="90" cy="120" r="3" className="fill-primary" />
      <circle cx="110" cy="145" r="3" className="fill-primary" />
      <circle cx="130" cy="115" r="3" className="fill-primary" />
      <circle cx="150" cy="140" r="3" className="fill-primary" />
      <circle cx="170" cy="118" r="3" className="fill-primary" />
      <circle cx="258" cy="190" r="5" className="fill-foreground" />
      <text x="200" y="212" fontSize="10" textAnchor="middle" className="fill-muted-foreground">
        {t.observerHorizon}
      </text>
      <text x="140" y="45" fontSize="10.5" textAnchor="middle" fontWeight="700" className="fill-foreground">
        {t.sunset}
      </text>
    </svg>
  );
}

export function ScatteringComparison({
  lang,
  middayExplanation,
  sunsetExplanation,
}: {
  lang: Lang;
  middayExplanation: string;
  sunsetExplanation: string;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="flex-1 rounded-2xl border border-border bg-secondary/40 p-4 text-center">
        <MiddayPanel lang={lang} />
        <p className="mt-3 text-left text-[12px] leading-relaxed text-muted-foreground">{middayExplanation}</p>
      </div>
      <div className="flex-1 rounded-2xl border border-border bg-secondary/40 p-4 text-center">
        <SunsetPanel lang={lang} />
        <p className="mt-3 text-left text-[12px] leading-relaxed text-muted-foreground">{sunsetExplanation}</p>
      </div>
    </div>
  );
}
