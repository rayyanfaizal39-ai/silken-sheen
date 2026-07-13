type Lang = "en" | "bm";

const PART_LABEL: Record<Lang, { anther: string; filament: string; stigma: string; style: string; ovary: string; ovulesNote: string }> = {
  en: { anther: "Anther", filament: "Filament", stigma: "Stigma", style: "Style", ovary: "Ovary", ovulesNote: "(ovules inside)" },
  bm: { anther: "Anter", filament: "Filamen", stigma: "Stigma", style: "Tangkai putik", ovary: "Ovari", ovulesNote: "(ovul di dalam)" },
};

const HEADING: Record<Lang, { male: string; female: string }> = {
  en: { male: "♂ Male Part — Stamen", female: "♀ Female Part — Pistil" },
  bm: { male: "♂ Bahagian Jantan — Stamen", female: "♀ Bahagian Betina — Pistil" },
};

function FlowerBase() {
  return (
    <>
      <line x1="110" y1="220" x2="110" y2="160" className="stroke-emerald-400" strokeWidth="5" />
      <path
        d="M60 150 Q130 100 160 150 Q140 165 110 165 Q80 165 60 150 Z"
        className="fill-pink-400 stroke-pink-500"
        strokeWidth="1.5"
        opacity="0.35"
      />
    </>
  );
}

function MaleStamenDiagram() {
  return (
    <svg viewBox="0 0 220 240" className="mx-auto w-full max-w-[200px]">
      <FlowerBase />
      <line x1="90" y1="148" x2="75" y2="70" className="stroke-amber-400" strokeWidth="3" />
      <ellipse cx="73" cy="60" rx="11" ry="16" className="fill-amber-400" />
      <line x1="110" y1="148" x2="110" y2="55" className="stroke-amber-400" strokeWidth="3" />
      <ellipse cx="110" cy="42" rx="11" ry="16" className="fill-amber-400" />
      <line x1="130" y1="148" x2="145" y2="70" className="stroke-amber-400" strokeWidth="3" />
      <ellipse cx="147" cy="60" rx="11" ry="16" className="fill-amber-400" />
      <line x1="73" y1="60" x2="30" y2="35" className="stroke-muted-foreground" strokeWidth="1" />
      <line x1="90" y1="110" x2="35" y2="110" className="stroke-muted-foreground" strokeWidth="1" />
    </svg>
  );
}

function FemalePistilDiagram() {
  return (
    <svg viewBox="0 0 220 240" className="mx-auto w-full max-w-[200px]">
      <FlowerBase />
      <line x1="110" y1="148" x2="110" y2="70" className="stroke-primary" strokeWidth="3" />
      <circle cx="110" cy="58" r="9" className="fill-primary" />
      <ellipse cx="110" cy="165" rx="26" ry="18" className="fill-violet-400 stroke-violet-400" strokeWidth="2" opacity="0.55" />
      <circle cx="102" cy="165" r="4" className="fill-violet-200" />
      <circle cx="118" cy="167" r="4" className="fill-violet-200" />
      <line x1="110" y1="58" x2="160" y2="35" className="stroke-muted-foreground" strokeWidth="1" />
      <line x1="110" y1="105" x2="170" y2="105" className="stroke-muted-foreground" strokeWidth="1" />
      <line x1="128" y1="165" x2="180" y2="165" className="stroke-muted-foreground" strokeWidth="1" />
    </svg>
  );
}

export function FlowerDiagram({
  lang,
  variant,
  functionText,
}: {
  lang: Lang;
  variant: "male" | "female";
  functionText: string;
}) {
  const t = PART_LABEL[lang];
  const heading = HEADING[lang][variant];

  return (
    <div className="flex-1 rounded-2xl border border-border bg-secondary/40 p-4 text-center">
      {variant === "male" ? <MaleStamenDiagram /> : <FemalePistilDiagram />}
      <div className="mt-2.5 flex flex-wrap justify-center gap-x-3 gap-y-1 text-[11px]">
        {variant === "male" ? (
          <>
            <span className="font-semibold text-amber-400">{t.anther}</span>
            <span className="font-semibold text-amber-400">{t.filament}</span>
          </>
        ) : (
          <>
            <span className="font-semibold text-primary">{t.stigma}</span>
            <span className="font-semibold text-primary">{t.style}</span>
            <span className="font-semibold text-violet-400">
              {t.ovary} <span className="text-muted-foreground">{t.ovulesNote}</span>
            </span>
          </>
        )}
      </div>
      <h4 className={`font-display mt-2.5 text-[13.5px] font-bold ${variant === "male" ? "text-amber-400" : "text-primary"}`}>{heading}</h4>
      <p className="mt-1 text-[11.5px] leading-snug text-muted-foreground">{functionText}</p>
    </div>
  );
}
