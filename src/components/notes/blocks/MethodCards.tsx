import type { MethodCardsBlock } from "@/content/form2/science/interactive-types";

/**
 * Several methods explained through the same three facets, in the same order,
 * every time.
 *
 * The point is cross-reading: a learner should be able to run their eye down
 * "how does it work" across all the options. That only works if the facets stay
 * aligned, so the labels are fixed by the block rather than written per card.
 */
export function MethodCards({ block }: { block: MethodCardsBlock }) {
  const facets = (card: MethodCardsBlock["cards"][number]) => [
    { label: block.whatLabel, value: card.what, accent: "text-sky-300" },
    { label: block.howLabel, value: card.how, accent: "text-amber-300" },
    { label: block.whenLabel, value: card.when, accent: "text-emerald-300" },
  ];

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      {block.instruction && (
        <p className="mb-2.5 text-[13px] leading-relaxed text-muted-foreground">
          {block.instruction}
        </p>
      )}

      <div className="grid gap-2.5 sm:grid-cols-3">
        {block.cards.map((card) => (
          <div
            key={card.id}
            className="flex flex-col rounded-xl border border-border bg-card/55 px-3 py-2.5"
          >
            <p className="font-display text-[13.5px] font-bold text-foreground">
              {card.icon && <span className="mr-1">{card.icon}</span>}
              {card.name}
            </p>
            <div className="mt-1.5 flex flex-col gap-1.5">
              {facets(card).map((f) => (
                <div key={f.label}>
                  <p className={`text-[10px] font-bold uppercase tracking-wide ${f.accent}`}>
                    {f.label}
                  </p>
                  <p className="text-[12.5px] leading-relaxed text-foreground">{f.value}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
