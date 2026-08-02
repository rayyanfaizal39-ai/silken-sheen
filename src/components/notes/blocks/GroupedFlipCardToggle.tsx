import { useId, useState } from "react";
import { FlipCardGrid } from "@/components/notes/blocks/FlipCard";
import type { GeoFlipCardItem } from "@/content/form3/geography/interactive-types";

type FlipCardGroup = {
  id: string;
  label: string;
  items: GeoFlipCardItem[];
};

export function GroupedFlipCardToggle({ groups }: { groups: FlipCardGroup[] }) {
  const [activeId, setActiveId] = useState(groups[0]?.id);
  const active = groups.find((group) => group.id === activeId) ?? groups[0];
  const panelId = useId();

  if (!active) return null;

  return (
    <div className="mt-3">
      <div
        role="group"
        aria-label="Pilih kumpulan kad imbas"
        className="inline-flex max-w-full flex-wrap gap-1 rounded-full border border-border bg-secondary/30 p-1"
      >
        {groups.map((group) => (
          <button
            key={group.id}
            type="button"
            aria-pressed={group.id === active.id}
            aria-controls={panelId}
            onClick={() => setActiveId(group.id)}
            className={`min-h-11 rounded-full px-4 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              group.id === active.id
                ? "bg-gradient-to-r from-primary to-accent text-white"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {group.label}
          </button>
        ))}
      </div>
      <div id={panelId} className="mt-3" role="region" aria-label={active.label}>
        <FlipCardGrid items={active.items} />
      </div>
    </div>
  );
}
