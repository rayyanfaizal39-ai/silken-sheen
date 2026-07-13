type Lang = "en" | "bm";

const LABELS: Record<Lang, { epidermal: string; openState: string; closedState: string }> = {
  en: { epidermal: "epidermal cell", openState: "guard cells (turgid, separated)", closedState: "guard cells (flaccid, touching)" },
  bm: { epidermal: "sel epidermis", openState: "sel pengawal (turgid, terpisah)", closedState: "sel pengawal (lembik, bersentuh)" },
};

function StomaPanel({
  lang,
  condition,
  reason,
  open,
}: {
  lang: Lang;
  condition: string;
  reason: string;
  open: boolean;
}) {
  const t = LABELS[lang];
  return (
    <div className="flex-1 rounded-2xl border border-border bg-secondary/40 p-4 text-center">
      <svg viewBox="0 0 160 190" className="mx-auto w-full max-w-[160px]">
        <line x1="80" y1="115" x2="80" y2="180" className="stroke-emerald-400" strokeWidth="4" opacity={open ? 1 : 0.4} />
        <path d="M10 60 Q40 40 55 60 Q40 90 10 90 Z" fill="none" className="stroke-muted-foreground" strokeWidth="1.5" />
        <path d="M150 60 Q120 40 105 60 Q120 90 150 90 Z" fill="none" className="stroke-muted-foreground" strokeWidth="1.5" />
        <path d="M20 15 Q60 5 80 20 Q100 5 140 15 L140 40 Q80 30 20 40 Z" fill="none" className="stroke-muted-foreground" strokeWidth="1.5" />
        {open ? (
          <>
            <ellipse cx="63" cy="72.5" rx="16" ry="26" className="fill-emerald-400 stroke-emerald-400" strokeWidth="2" opacity="0.55" />
            <ellipse cx="97" cy="72.5" rx="16" ry="26" className="fill-emerald-400 stroke-emerald-400" strokeWidth="2" opacity="0.55" />
            <ellipse cx="80" cy="72.5" rx="10" ry="22" className="fill-background" />
            <circle cx="60" cy="60" r="2.5" className="fill-emerald-700" />
            <circle cx="66" cy="85" r="2.5" className="fill-emerald-700" />
            <circle cx="100" cy="60" r="2.5" className="fill-emerald-700" />
            <circle cx="94" cy="85" r="2.5" className="fill-emerald-700" />
          </>
        ) : (
          <>
            <ellipse cx="70" cy="72.5" rx="16" ry="24" className="fill-red-400 stroke-red-400" strokeWidth="2" opacity="0.5" />
            <ellipse cx="90" cy="72.5" rx="16" ry="24" className="fill-red-400 stroke-red-400" strokeWidth="2" opacity="0.5" />
            <circle cx="66" cy="60" r="2.5" className="fill-red-800" />
            <circle cx="72" cy="85" r="2.5" className="fill-red-800" />
            <circle cx="94" cy="60" r="2.5" className="fill-red-800" />
            <circle cx="88" cy="85" r="2.5" className="fill-red-800" />
          </>
        )}
        <text x="80" y="14" fontSize="8.5" className="fill-muted-foreground" textAnchor="middle">
          {t.epidermal}
        </text>
        <text x="80" y="145" fontSize="8.5" className={open ? "fill-emerald-400" : "fill-red-400"} textAnchor="middle" fontWeight="700">
          {open ? t.openState : t.closedState}
        </text>
      </svg>
      <h4 className="font-display mt-2 text-[13px] font-bold text-foreground">{condition}</h4>
      <p className="mt-1 text-[11.5px] leading-snug text-muted-foreground">{reason}</p>
    </div>
  );
}

export function StomaDiagram({
  lang,
  states,
}: {
  lang: Lang;
  /** Fixed order: open state, closed state — matches stomaStates in chapter3-content.ts */
  states: [{ condition: string; reason: string }, { condition: string; reason: string }];
}) {
  const [openState, closedState] = states;
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <StomaPanel lang={lang} condition={openState.condition} reason={openState.reason} open />
      <StomaPanel lang={lang} condition={closedState.condition} reason={closedState.reason} open={false} />
    </div>
  );
}
