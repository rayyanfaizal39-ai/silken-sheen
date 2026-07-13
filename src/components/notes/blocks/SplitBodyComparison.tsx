type Lang = "en" | "bm";

const HEAD: Record<Lang, { hot: string; cold: string }> = {
  en: { hot: "🔥 Hot Day", cold: "❄️ Cold Day" },
  bm: { hot: "🔥 Hari Panas", cold: "❄️ Hari Sejuk" },
};

export function SplitBodyComparison({
  lang,
  hotMechanisms,
  hotResult,
  coldMechanisms,
  coldResult,
}: {
  lang: Lang;
  hotMechanisms: string[];
  hotResult: string;
  coldMechanisms: string[];
  coldResult: string;
}) {
  const t = HEAD[lang];
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border sm:flex-row">
      <div className="flex-1 bg-gradient-to-b from-red-500/10 to-transparent p-4 text-center">
        <svg viewBox="0 0 90 140" className="mx-auto h-[120px] w-[80px]">
          <ellipse cx="45" cy="30" rx="16" ry="18" className="fill-secondary stroke-red-400" strokeWidth="2" />
          <rect x="25" y="48" width="40" height="70" rx="14" className="fill-secondary stroke-red-400" strokeWidth="2" />
          <line x1="30" y1="55" x2="30" y2="110" className="stroke-red-400" strokeWidth="3" opacity="0.7" />
          <line x1="60" y1="55" x2="60" y2="110" className="stroke-red-400" strokeWidth="3" opacity="0.7" />
          <circle className="notes-sweat-drip fill-primary" cx="30" cy="60" r="2.5" />
          <circle className="notes-sweat-drip fill-primary" cx="60" cy="70" r="2.5" style={{ animationDelay: "0.5s" }} />
          <circle className="notes-sweat-drip fill-primary" cx="45" cy="50" r="2.5" style={{ animationDelay: "1s" }} />
        </svg>
        <h4 className="font-display mt-2 text-[13.5px] font-bold text-foreground">{t.hot}</h4>
        <ul className="mt-2 flex flex-col gap-1 text-left">
          {hotMechanisms.map((m) => (
            <li key={m} className="flex items-start gap-1.5 text-[11.5px] leading-snug text-muted-foreground">
              <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-red-400" />
              <span>{m}</span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-[11.5px] font-semibold text-red-300">{hotResult}</p>
      </div>
      <div className="w-full border-t border-border sm:w-px sm:border-l sm:border-t-0" />
      <div className="notes-shiver flex-1 bg-gradient-to-b from-primary/10 to-transparent p-4 text-center">
        <svg viewBox="0 0 90 140" className="mx-auto h-[120px] w-[80px]">
          <ellipse cx="45" cy="30" rx="16" ry="18" className="fill-secondary stroke-primary" strokeWidth="2" />
          <rect x="25" y="48" width="40" height="70" rx="14" className="fill-secondary stroke-primary" strokeWidth="2" />
          <line x1="30" y1="55" x2="30" y2="110" className="stroke-primary" strokeWidth="1.5" opacity="0.5" />
          <line x1="60" y1="55" x2="60" y2="110" className="stroke-primary" strokeWidth="1.5" opacity="0.5" />
          <path d="M22 52 l4 -6 M35 50 l4 -6 M55 50 l4 -6 M68 52 l4 -6" className="stroke-sky-200" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <h4 className="font-display mt-2 text-[13.5px] font-bold text-foreground">{t.cold}</h4>
        <ul className="mt-2 flex flex-col gap-1 text-left">
          {coldMechanisms.map((m) => (
            <li key={m} className="flex items-start gap-1.5 text-[11.5px] leading-snug text-muted-foreground">
              <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-primary" />
              <span>{m}</span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-[11.5px] font-semibold text-primary">{coldResult}</p>
      </div>
    </div>
  );
}
