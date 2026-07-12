export interface CycleDiagramBox {
  icon: string;
  heading: string;
  steps: string[];
}

export function CycleDiagram({
  boxes,
  chipsHeading,
  chips,
}: {
  boxes: CycleDiagramBox[];
  /** Optional trailing chip row, e.g. "Protecting the balance" actions. */
  chipsHeading?: string;
  chips?: string[];
}) {
  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {boxes.map((box) => (
          <div key={box.heading} className="rounded-2xl border border-border bg-secondary/40 p-4.5 sm:p-5">
            <h4 className="font-display mb-3 text-sm font-bold text-foreground">
              {box.icon} {box.heading}
            </h4>
            <ul className="flex flex-col gap-2">
              {box.steps.map((step) => (
                <li key={step} className="flex items-start gap-2 text-[12.5px] leading-snug text-muted-foreground">
                  <span className="text-primary">→</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {chips && chips.length > 0 && (
        <>
          {chipsHeading && (
            <h4 className="font-display mt-5 mb-2.5 flex items-center gap-2 text-sm font-bold text-foreground">
              {chipsHeading}
            </h4>
          )}
          <div className="flex flex-wrap gap-2">
            {chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3.5 py-2 text-xs font-medium text-emerald-300"
              >
                {chip}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
