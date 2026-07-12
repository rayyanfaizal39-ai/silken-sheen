import { useState } from "react";
import { CheckSquare, Square } from "lucide-react";

export function SafetyChecklist({ heading, items }: { heading?: string; items: string[] }) {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  function toggle(i: number) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  return (
    <div>
      {heading && <h4 className="font-display mb-3 text-sm font-bold text-foreground">{heading}</h4>}
      <div className="grid gap-2 sm:grid-cols-2">
        {items.map((item, i) => {
          const isChecked = checked.has(i);
          return (
            <button
              key={i}
              type="button"
              onClick={() => toggle(i)}
              className="flex items-center gap-2.5 rounded-lg border border-border bg-secondary/30 px-3.5 py-2.5 text-left text-[12.5px] transition-colors hover:bg-secondary/50"
            >
              {isChecked ? (
                <CheckSquare className="h-4 w-4 shrink-0 text-emerald-400" />
              ) : (
                <Square className="h-4 w-4 shrink-0 text-muted-foreground" />
              )}
              <span className={isChecked ? "text-muted-foreground line-through" : "text-foreground"}>
                {item}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
