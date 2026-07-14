import type { ReactElement } from "react";

export interface SymbolShowcaseType {
  type: string;
  description: string;
  examples: string[];
}

function PointIcon() {
  return (
    <svg viewBox="0 0 200 50" className="h-[42px] w-full">
      <circle cx="25" cy="25" r="10" fill="none" className="stroke-primary" strokeWidth="2.5" />
      <circle cx="25" cy="25" r="3" className="fill-primary" />
      <path d="M 55 32 L 55 18 L 65 10 L 75 18 L 75 32 Z" fill="none" className="stroke-primary" strokeWidth="2" />
      <rect x="95" y="15" width="18" height="18" fill="none" className="stroke-primary" strokeWidth="2" />
      <line x1="95" y1="15" x2="113" y2="33" className="stroke-primary" strokeWidth="1.5" />
    </svg>
  );
}

function LineIcon() {
  return (
    <svg viewBox="0 0 200 50" className="h-[42px] w-full">
      <line x1="10" y1="15" x2="90" y2="15" className="stroke-emerald-400" strokeWidth="3" />
      <line x1="10" y1="42" x2="90" y2="42" className="stroke-emerald-400" strokeWidth="2" strokeDasharray="5 3" />
      <path d="M 110 10 Q 125 20 115 30 Q 105 40 120 45" fill="none" className="stroke-emerald-400" strokeWidth="2.5" />
    </svg>
  );
}

function AreaIcon() {
  return (
    <svg viewBox="0 0 200 50" className="h-[42px] w-full">
      <rect x="8" y="8" width="80" height="34" fill="none" className="stroke-amber-400" strokeWidth="1.5" />
      <line x1="8" y1="8" x2="88" y2="42" className="stroke-amber-400" strokeWidth="1" />
      <line x1="8" y1="19" x2="63" y2="42" className="stroke-amber-400" strokeWidth="1" />
      <line x1="8" y1="31" x2="38" y2="42" className="stroke-amber-400" strokeWidth="1" />
      <line x1="20" y1="8" x2="88" y2="30" className="stroke-amber-400" strokeWidth="1" />
      <line x1="45" y1="8" x2="88" y2="19" className="stroke-amber-400" strokeWidth="1" />
      <circle cx="115" cy="15" r="2" className="fill-amber-400" />
      <circle cx="128" cy="20" r="2" className="fill-amber-400" />
      <circle cx="120" cy="30" r="2" className="fill-amber-400" />
      <circle cx="135" cy="12" r="2" className="fill-amber-400" />
      <circle cx="140" cy="28" r="2" className="fill-amber-400" />
    </svg>
  );
}

function AbbreviationIcon() {
  return (
    <svg viewBox="0 0 200 50" className="h-[42px] w-full">
      <rect x="8" y="12" width="42" height="22" rx="4" fill="none" className="stroke-accent" strokeWidth="1.5" />
      <text x="29" y="27" fontSize="11" textAnchor="middle" fontWeight={700} className="fill-accent">
        Sek.
      </text>
      <rect x="60" y="12" width="42" height="22" rx="4" fill="none" className="stroke-accent" strokeWidth="1.5" />
      <text x="81" y="27" fontSize="11" textAnchor="middle" fontWeight={700} className="fill-accent">
        P.P.
      </text>
      <text x="112" y="27" fontSize="12" className="fill-muted-foreground">
        →
      </text>
      <text x="128" y="27" fontSize="9" className="fill-muted-foreground">
        Sekolah, Pejabat Pos
      </text>
    </svg>
  );
}

const ICON_BY_TYPE: Record<string, () => ReactElement> = {
  "Simbol titik": PointIcon,
  "Simbol garisan": LineIcon,
  "Simbol kawasan": AreaIcon,
  "Singkatan perkataan": AbbreviationIcon,
};

const COLOR_BY_TYPE: Record<string, string> = {
  "Simbol titik": "text-primary",
  "Simbol garisan": "text-emerald-400",
  "Simbol kawasan": "text-amber-400",
  "Singkatan perkataan": "text-accent",
};

export function SymbolShowcase({ types }: { types: SymbolShowcaseType[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {types.map((t) => {
        const Icon = ICON_BY_TYPE[t.type];
        return (
          <div key={t.type} className="rounded-2xl border border-border bg-secondary/40 p-4">
            <div className="mb-3">{Icon && <Icon />}</div>
            <h4 className={`font-display mb-1.5 text-sm font-bold ${COLOR_BY_TYPE[t.type] ?? "text-foreground"}`}>
              {t.type}
            </h4>
            <p className="mb-2 text-xs leading-relaxed text-muted-foreground">{t.description}</p>
            <p className="text-[10.5px] text-muted-foreground/70">{t.examples.join(" · ")}</p>
          </div>
        );
      })}
    </div>
  );
}
