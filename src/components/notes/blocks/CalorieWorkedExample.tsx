import type { CalorieWorkedExampleBlock } from "@/content/form2/science/interactive-types";

/**
 * A worked "food + quantity -> kcal, then total" calculation as a real running
 * sum, not a sentence. SP 3.2.2 asks learners to estimate a meal's calorific
 * value themselves — showing the addition worked out is what actually
 * demonstrates HOW, which a paragraph describing the same numbers does not.
 */
export function CalorieWorkedExample({ block }: { block: CalorieWorkedExampleBlock }) {
  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <h4 className="font-display text-[13px] font-bold text-foreground">{block.title}</h4>
      {block.instruction && (
        <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">{block.instruction}</p>
      )}

      <div className="mt-3 overflow-hidden rounded-xl border border-border">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-secondary/40">
              <th scope="col" className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-primary">
                Food
              </th>
              <th scope="col" className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-primary">
                Quantity
              </th>
              <th scope="col" className="px-3 py-2 text-right text-[11px] font-semibold uppercase tracking-wide text-primary">
                kcal
              </th>
            </tr>
          </thead>
          <tbody>
            {block.items.map((item, i) => (
              <tr key={item.id} className={i % 2 === 1 ? "bg-card/40" : undefined}>
                <td className="px-3 py-2 text-[12.5px] font-semibold text-foreground">{item.food}</td>
                <td className="px-3 py-2 text-[12px] text-muted-foreground">{item.quantity}</td>
                <td className="px-3 py-2 text-right text-[12.5px] font-semibold text-foreground">
                  {item.perUnitKcal && item.multiplier ? (
                    <span className="whitespace-nowrap">
                      {item.perUnitKcal} × {item.multiplier} = {item.kcal}
                    </span>
                  ) : (
                    item.kcal
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* The running sum, drawn out — this is the part a sentence hides. */}
      <div className="mx-auto mt-3 w-full max-w-[220px] rounded-xl border border-primary/40 bg-primary/10 px-4 py-2.5">
        {block.items.map((item, i) => (
          <div key={item.id} className="flex items-center justify-between text-[12.5px] text-foreground">
            <span>{i === 0 ? item.food : `+ ${item.food}`}</span>
            <span className="font-semibold">{item.kcal}</span>
          </div>
        ))}
        <div className="mt-1.5 flex items-center justify-between border-t border-primary/30 pt-1.5 text-[13.5px] font-bold text-primary">
          <span>{block.totalLabel}</span>
          <span>
            {block.items.reduce((sum, item) => sum + item.kcal, 0)} kcal
          </span>
        </div>
      </div>

      {block.note && (
        <p className="mt-2.5 text-center text-[12px] leading-relaxed text-muted-foreground">
          {block.note}
        </p>
      )}
    </div>
  );
}
