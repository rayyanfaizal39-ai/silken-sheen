import { useMemo, useState } from "react";
import { Check, RotateCcw } from "lucide-react";
import type { ScienceInteractiveMatcherPair } from "@/content/form2/science/interactive-types";

export function MatchingPairs({
  pairs,
  instruction,
  onComplete,
}: {
  pairs: ScienceInteractiveMatcherPair[];
  instruction: string;
  onComplete?: () => void;
}) {
  const shuffledMatches = useMemo(
    () => [...pairs].sort((a, b) => a.match.localeCompare(b.match)),
    [pairs],
  );
  const [selected, setSelected] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [wrong, setWrong] = useState<string | null>(null);

  function chooseMatch(pair: ScienceInteractiveMatcherPair) {
    if (!selected || matched.includes(pair.id)) return;
    if (selected === pair.id) {
      const next = [...matched, pair.id];
      setMatched(next);
      setSelected(null);
      setWrong(null);
      if (next.length === pairs.length) onComplete?.();
    } else {
      setWrong(pair.id);
    }
  }

  function reset() {
    setSelected(null);
    setMatched([]);
    setWrong(null);
  }

  return (
    <div className="rounded-2xl border border-border bg-secondary/25 p-4">
      <p className="mb-4 text-[13px] leading-relaxed text-muted-foreground">{instruction}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          {pairs.map((pair) => {
            const done = matched.includes(pair.id);
            return (
              <button
                key={pair.id}
                type="button"
                disabled={done}
                onClick={() => {
                  setSelected(pair.id);
                  setWrong(null);
                }}
                className={`min-h-11 rounded-xl border px-3 py-2 text-left text-[13px] transition-[border-color,background-color,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  done
                    ? "border-emerald-400/50 bg-emerald-500/15 text-emerald-200"
                    : selected === pair.id
                      ? "border-primary bg-primary/15 text-primary"
                      : "border-border bg-card/60 text-foreground hover:border-primary/50 active:scale-[0.98]"
                }`}
              >
                {done && <Check className="mr-2 inline h-3.5 w-3.5" />}
                {pair.label}
              </button>
            );
          })}
        </div>
        <div className="flex flex-col gap-2">
          {shuffledMatches.map((pair) => {
            const done = matched.includes(pair.id);
            return (
              <button
                key={pair.id}
                type="button"
                disabled={done}
                onClick={() => chooseMatch(pair)}
                className={`min-h-11 rounded-xl border px-3 py-2 text-left text-[13px] transition-[border-color,background-color,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  done
                    ? "border-emerald-400/50 bg-emerald-500/15 text-emerald-200"
                    : wrong === pair.id
                      ? "border-red-400/60 bg-red-500/15 text-red-200"
                      : "border-border bg-card/60 text-muted-foreground hover:border-accent/60 active:scale-[0.98]"
                }`}
              >
                {pair.match}
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-3 flex min-h-11 items-center justify-between gap-3">
        <span className="text-xs text-muted-foreground" aria-live="polite">
          {matched.length}/{pairs.length}
        </span>
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-xs font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>
    </div>
  );
}
