import type { GalaxyCard } from "@/content/form2/science/interactive-types";
import { getNotesImageUrl } from "@/lib/notes-images";

export function GalaxyCardGrid({ cards }: { cards: GalaxyCard[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {cards.map((card) => (
        <article key={card.id} className="overflow-hidden rounded-2xl border border-border bg-card/55">
          <img
            src={getNotesImageUrl(card.image)}
            alt={card.name}
            className="aspect-[4/3] w-full object-cover"
            loading="lazy"
          />
          <div className="px-3 py-2.5 text-center">
            <div className="font-display text-[13px] font-semibold text-foreground">{card.name}</div>
            <div className="mt-0.5 text-[11.5px] text-muted-foreground">{card.example}</div>
          </div>
        </article>
      ))}
    </div>
  );
}
