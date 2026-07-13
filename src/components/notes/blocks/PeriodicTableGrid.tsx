export type PeriodicElementCategory = "metal" | "nonmetal" | "inert";

export interface PeriodicElementItem {
  symbol: string;
  name: string;
  category: PeriodicElementCategory;
}

/** IUPAC group (1-18) / period (1-7) for every symbol this diagram knows how to place. */
const POSITIONS: Record<string, { group: number; period: number }> = {
  H: { group: 1, period: 1 },
  He: { group: 18, period: 1 },
  Li: { group: 1, period: 2 },
  Be: { group: 2, period: 2 },
  B: { group: 13, period: 2 },
  C: { group: 14, period: 2 },
  N: { group: 15, period: 2 },
  O: { group: 16, period: 2 },
  F: { group: 17, period: 2 },
  Ne: { group: 18, period: 2 },
  Na: { group: 1, period: 3 },
  Mg: { group: 2, period: 3 },
  Al: { group: 13, period: 3 },
  Si: { group: 14, period: 3 },
  P: { group: 15, period: 3 },
  S: { group: 16, period: 3 },
  Cl: { group: 17, period: 3 },
  Ar: { group: 18, period: 3 },
  K: { group: 1, period: 4 },
  Ca: { group: 2, period: 4 },
  Fe: { group: 8, period: 4 },
  Cu: { group: 11, period: 4 },
  Zn: { group: 12, period: 4 },
};

const CATEGORY_TINT: Record<PeriodicElementCategory, string> = {
  metal: "border-accent/35 bg-accent/15 text-accent",
  nonmetal: "border-primary/35 bg-primary/15 text-primary",
  inert: "border-emerald-400/35 bg-emerald-500/15 text-emerald-300",
};

const CATEGORY_DOT: Record<PeriodicElementCategory, string> = {
  metal: "bg-accent",
  nonmetal: "bg-primary",
  inert: "bg-emerald-400",
};

const CATEGORY_LABEL: Record<PeriodicElementCategory, { en: string; bm: string }> = {
  metal: { en: "Metal", bm: "Logam" },
  nonmetal: { en: "Non-metal", bm: "Bukan logam" },
  inert: { en: "Inert gas", bm: "Gas nadir" },
};

const OTHER_HEAD: Record<"en" | "bm", string> = { en: "Additional elements", bm: "Unsur tambahan" };

export function PeriodicTableGrid({ elements, lang }: { elements: PeriodicElementItem[]; lang: "en" | "bm" }) {
  const placed = elements.filter((el) => POSITIONS[el.symbol]);
  const unplaced = elements.filter((el) => !POSITIONS[el.symbol]);
  const maxPeriod = Math.max(1, ...placed.map((el) => POSITIONS[el.symbol].period));

  const categoriesPresent = Array.from(new Set(elements.map((el) => el.category)));

  return (
    <div>
      <div className="overflow-x-auto pb-2">
        <div
          className="grid gap-1"
          style={{
            gridTemplateColumns: "repeat(18, 36px)",
            gridTemplateRows: `repeat(${maxPeriod}, 36px)`,
            width: "max-content",
          }}
        >
          {placed.map((el) => {
            const pos = POSITIONS[el.symbol];
            return (
              <div
                key={el.symbol}
                className={`flex h-9 w-9 flex-col items-center justify-center rounded-[6px] border font-display font-bold ${CATEGORY_TINT[el.category]}`}
                style={{ gridColumn: pos.group, gridRow: pos.period }}
                title={el.name}
              >
                <span className="text-[14px] leading-none">{el.symbol}</span>
              </div>
            );
          })}
        </div>
      </div>

      {unplaced.length > 0 && (
        <div className="mt-3">
          <p className="mb-1.5 text-[11px] font-semibold text-muted-foreground">{OTHER_HEAD[lang]}</p>
          <div className="flex flex-wrap gap-2">
            {unplaced.map((el) => (
              <div
                key={el.symbol}
                className={`flex h-9 min-w-9 items-center justify-center rounded-[6px] border px-2 font-display text-[13px] font-bold ${CATEGORY_TINT[el.category]}`}
                title={el.name}
              >
                {el.symbol}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {categoriesPresent.map((cat) => (
          <span key={cat} className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span className={`h-2.5 w-2.5 rounded-full ${CATEGORY_DOT[cat]}`} />
            {CATEGORY_LABEL[cat][lang]}
          </span>
        ))}
      </div>
    </div>
  );
}
