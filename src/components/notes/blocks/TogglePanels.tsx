import { useState } from "react";

export function TogglePanels({
  options,
}: {
  options: { id: string; label: string; body: string }[];
}) {
  const [activeId, setActiveId] = useState(options[0]?.id);
  const active = options.find((option) => option.id === activeId) ?? options[0];

  return (
    <div className="mt-3">
      <div className="inline-flex flex-wrap gap-1 rounded-full border border-border bg-secondary/30 p-1">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => setActiveId(option.id)}
            className={`min-h-9 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              option.id === active?.id
                ? "bg-gradient-to-r from-primary to-accent text-white"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      {active && (
        <div className="mt-3 rounded-xl border border-border bg-card/60 p-4 text-[13.5px] leading-relaxed text-muted-foreground">
          {active.body}
        </div>
      )}
    </div>
  );
}
