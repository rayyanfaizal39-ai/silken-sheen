import type { CycleBox } from "@/content/form1/science/chapter-7/bab7-content";

const BALANCE_HEAD: Record<"en" | "bm", string> = {
  en: "🌍 Protecting the balance",
  bm: "🌍 Melindungi keseimbangan",
};

export function CycleDiagram({
  carbonCycle,
  oxygenCycle,
  balanceActions,
  lang,
}: {
  carbonCycle: CycleBox;
  oxygenCycle: CycleBox;
  balanceActions: string[];
  lang: "en" | "bm";
}) {
  const boxes: Array<{ box: CycleBox; icon: string }> = [
    { box: carbonCycle, icon: "🔵" },
    { box: oxygenCycle, icon: "🟣" },
  ];

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2">
        {boxes.map(({ box, icon }) => (
          <div key={box.heading} className="rounded-2xl border border-border bg-secondary/40 p-4.5 sm:p-5">
            <h4 className="font-display mb-3 text-sm font-bold text-foreground">
              {icon} {box.heading}
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
      <h4 className="font-display mt-5 mb-2.5 flex items-center gap-2 text-sm font-bold text-foreground">
        {BALANCE_HEAD[lang]}
      </h4>
      <div className="flex flex-wrap gap-2">
        {balanceActions.map((action) => (
          <span
            key={action}
            className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3.5 py-2 text-xs font-medium text-emerald-300"
          >
            {action}
          </span>
        ))}
      </div>
    </div>
  );
}
