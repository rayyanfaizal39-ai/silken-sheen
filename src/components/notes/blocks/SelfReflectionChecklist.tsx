import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

export function SelfReflectionChecklist({
  items,
  storageKey,
  onAllComplete,
}: {
  items: string[];
  storageKey?: string;
  onAllComplete?: () => void;
}) {
  const [checked, setChecked] = useState<boolean[]>(() => {
    if (storageKey && typeof window !== "undefined") {
      try {
        const saved = window.localStorage.getItem(storageKey);
        if (saved) {
          const parsed = JSON.parse(saved) as boolean[];
          if (Array.isArray(parsed) && parsed.length === items.length) return parsed;
        }
      } catch {
        // ignore malformed storage
      }
    }
    return items.map(() => false);
  });
  const wasComplete = useRef(checked.length > 0 && checked.every(Boolean));

  useEffect(() => {
    if (storageKey && typeof window !== "undefined") {
      window.localStorage.setItem(storageKey, JSON.stringify(checked));
    }
    const isComplete = checked.length > 0 && checked.every(Boolean);
    if (isComplete && !wasComplete.current) onAllComplete?.();
    wasComplete.current = isComplete;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  function toggle(i: number) {
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  }

  return (
    <div className="rounded-2xl border border-border bg-secondary/30 p-1">
      {items.map((item, i) => {
        const done = checked[i];
        return (
          <button
            key={i}
            type="button"
            onClick={() => toggle(i)}
            className={`flex w-full items-start gap-3 px-4 py-3 text-left ${
              i < items.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <span
              className={`mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md border-[1.5px] transition-colors ${
                done ? "border-emerald-400 bg-emerald-400" : "border-muted-foreground"
              }`}
            >
              {done && <Check className="h-3.5 w-3.5 text-background" strokeWidth={3} />}
            </span>
            <span
              className={`text-[13.5px] leading-relaxed ${
                done ? "text-muted-foreground line-through decoration-muted-foreground/40" : "text-foreground"
              }`}
            >
              {item}
            </span>
          </button>
        );
      })}
    </div>
  );
}
