import type { EcologicalTermsBlock } from "@/content/form2/science/interactive-types";

function TermCard({
  term,
  definition,
  tone = "default",
}: {
  term: string;
  definition: string;
  tone?: "default" | "accent" | "result";
}) {
  const toneClass =
    tone === "result"
      ? "border-primary/45 bg-primary/12"
      : tone === "accent"
        ? "border-accent/40 bg-accent/10"
        : "border-border bg-card/55";
  return (
    <div className={`min-w-0 flex-1 rounded-xl border p-2.5 ${toneClass}`}>
      <p className="font-display text-[12.5px] font-bold uppercase tracking-wide text-foreground">
        {term}
      </p>
      <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">{definition}</p>
    </div>
  );
}

function Connector({ symbol, label }: { symbol: string; label?: string }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center self-center px-0.5 text-primary"
      aria-label={label}
      role={label ? "img" : undefined}
      aria-hidden={label ? undefined : "true"}
    >
      <span className="text-base font-bold leading-none sm:rotate-0">{symbol}</span>
    </div>
  );
}

/**
 * The ecological terms relationship diagram.
 *
 * Deliberately drawn as three separate ideas rather than one ladder, because
 * habitat is a *place*, not a level of organisation — stringing
 * species → population → community → habitat → ecosystem into a single
 * hierarchy is the misconception this diagram exists to prevent:
 *
 *   1. species → population → community   (levels of living organisation)
 *   2. habitat                            (the place an organism lives)
 *   3. community + non-living environment → ecosystem
 *
 * Every string arrives from chapter content, so BM and DLP share the component.
 */
export function EcologicalTermsDiagram({ block }: { block: EcologicalTermsBlock }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      {block.instruction && (
        <p className="text-[13px] leading-relaxed text-muted-foreground">{block.instruction}</p>
      )}

      <section aria-label={block.levelsLabel} className="flex flex-col gap-1.5">
        <h4 className="text-[10.5px] font-bold uppercase tracking-wide text-muted-foreground/80">
          {block.levelsLabel}
        </h4>
        <div className="flex flex-col items-stretch gap-1.5 sm:flex-row sm:items-stretch">
          <TermCard term={block.species.term} definition={block.species.definition} />
          <Connector symbol="→" />
          <TermCard term={block.population.term} definition={block.population.definition} />
          <Connector symbol="→" />
          <TermCard term={block.community.term} definition={block.community.definition} />
        </div>
      </section>

      <section aria-label={block.placeLabel} className="flex flex-col gap-1.5">
        <h4 className="text-[10.5px] font-bold uppercase tracking-wide text-muted-foreground/80">
          {block.placeLabel}
        </h4>
        <TermCard term={block.habitat.term} definition={block.habitat.definition} tone="accent" />
      </section>

      <section aria-label={block.ecosystemLabel} className="flex flex-col gap-1.5">
        <h4 className="text-[10.5px] font-bold uppercase tracking-wide text-muted-foreground/80">
          {block.ecosystemLabel}
        </h4>
        <div className="flex flex-col items-stretch gap-1.5 sm:flex-row">
          <TermCard term={block.community.term} definition={block.community.short} />
          <Connector symbol="+" />
          <TermCard
            term={block.nonLiving.term}
            definition={block.nonLiving.definition}
            tone="accent"
          />
          <Connector symbol="→" />
          <TermCard
            term={block.ecosystem.term}
            definition={block.ecosystem.definition}
            tone="result"
          />
        </div>
      </section>

      {block.note && (
        <p className="rounded-xl border border-border bg-secondary/30 px-3 py-2 text-[12px] leading-relaxed text-muted-foreground">
          {block.note}
        </p>
      )}
    </div>
  );
}
