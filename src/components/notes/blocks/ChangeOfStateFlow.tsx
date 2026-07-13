export interface ChangeOfStateItem {
  name: string;
  description: string[];
}

function Node({ label, colorClass }: { label: string; colorClass: string }) {
  return (
    <div
      className={`flex h-[84px] w-[84px] shrink-0 flex-col items-center justify-center rounded-full border-2 bg-secondary/40 text-center font-display text-[13px] font-bold text-foreground ${colorClass}`}
    >
      {label}
    </div>
  );
}

function ArrowPair({ top, bottom }: { top: string; bottom: string }) {
  return (
    <div className="flex min-w-[110px] flex-col items-center gap-1 text-center text-[10.5px] text-muted-foreground">
      <span>{top}</span>
      <span className="h-px w-10 bg-border" />
      <span>{bottom}</span>
    </div>
  );
}

export function ChangeOfStateFlow({
  stateLabels,
  transitions,
}: {
  /** [solid, liquid, gas] localized state names */
  stateLabels: [string, string, string];
  /** Fixed order: Melting, Boiling, Evaporation, Condensation, Freezing, Sublimation — matches changesOfState in chapter5-content.ts */
  transitions: ChangeOfStateItem[];
}) {
  const [melting, boiling, evaporation, condensation, freezing, sublimation] = transitions;
  const [solid, liquid, gas] = stateLabels;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        <Node label={solid} colorClass="border-accent" />
        <ArrowPair top={`${melting.name} →`} bottom={`← ${freezing.name}`} />
        <Node label={liquid} colorClass="border-primary" />
        <ArrowPair top={`${boiling.name} / ${evaporation.name} →`} bottom={`← ${condensation.name}`} />
        <Node label={gas} colorClass="border-emerald-400" />
      </div>
      <p className="mt-4 text-center text-[12px] text-muted-foreground">
        <b className="text-foreground">{sublimation.name}:</b> {sublimation.description[0]}
      </p>
      <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
        {transitions.map((tr) => (
          <div key={tr.name} className="rounded-xl border border-border bg-secondary/30 p-3.5">
            <p className="font-display mb-1.5 text-[12.5px] font-bold text-foreground">{tr.name}</p>
            <ul className="flex flex-col gap-1">
              {tr.description.map((d) => (
                <li key={d} className="flex items-start gap-1.5 text-[11.5px] leading-snug text-muted-foreground">
                  <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
