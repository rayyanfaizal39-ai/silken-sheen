import { useId, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { GeoAccordionItem } from "@/content/form3/geography/interactive-types";

type AccordionGroup = {
  id: string;
  label: string;
  items: GeoAccordionItem[];
};

export function GroupedAccordionToggle({ groups }: { groups: AccordionGroup[] }) {
  const [activeId, setActiveId] = useState(groups[0]?.id);
  const panelId = useId();
  const active = groups.find((group) => group.id === activeId) ?? groups[0];

  if (!active) return null;

  return (
    <div className="mt-3">
      <div
        className="inline-flex flex-wrap gap-1 rounded-full border border-border bg-secondary/30 p-1"
        role="group"
        aria-label="Pilih kumpulan faktor"
      >
        {groups.map((group) => {
          const selected = group.id === active.id;
          return (
            <button
              key={group.id}
              type="button"
              aria-pressed={selected}
              aria-controls={panelId}
              onClick={() => setActiveId(group.id)}
              className={`min-h-11 rounded-full px-4 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                selected
                  ? "bg-gradient-to-r from-primary to-accent text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {group.label}
            </button>
          );
        })}
      </div>

      <div id={panelId} className="mt-3 rounded-2xl border border-border bg-card/45 px-4">
        <Accordion key={active.id} type="single" collapsible>
          {active.items.map((item, index) => (
            <AccordionItem key={item.title} value={`${active.id}-${index}`}>
              <AccordionTrigger className="min-h-11 text-left text-[13.5px]">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="text-[13px] leading-relaxed text-muted-foreground">
                {item.body}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
