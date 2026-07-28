import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import type { DichotomousNode, DichotomousQuestion } from "@/content/form2/science/chapter-1/interactive-types";

function leavesOf(node: DichotomousNode): string[] {
  if (node.type === "leaf") return [node.organism];
  return [...leavesOf(node.choices[0].next), ...leavesOf(node.choices[1].next)];
}

function maxDepth(node: DichotomousNode): number {
  if (node.type === "leaf") return 0;
  return 1 + Math.max(maxDepth(node.choices[0].next), maxDepth(node.choices[1].next));
}

/**
 * The signature "star map" dichotomous key: organisms are shown as star
 * nodes that dim out as either/or questions are answered, until a single
 * organism remains lit. `root` is a generic binary decision tree, so this
 * component works for any chapter's dichotomous key — not just Biodiversity.
 */
export function DichotomousStarMap({
  organisms,
  root,
  onIdentify,
  restartLabel = "↺ restart the key",
}: {
  organisms: string[];
  root: DichotomousQuestion;
  onIdentify?: (organism: string) => void;
  restartLabel?: string;
}) {
  const [path, setPath] = useState<DichotomousNode[]>([root]);
  const totalDepth = useMemo(() => maxDepth(root), [root]);
  const current = path[path.length - 1];
  const alive = useMemo(() => new Set(leavesOf(current)), [current]);
  const identified = current.type === "leaf" ? current.organism : null;

  function choose(next: DichotomousNode) {
    const nextPath = [...path, next];
    setPath(nextPath);
    if (next.type === "leaf") onIdentify?.(next.organism);
  }

  function reset() {
    setPath([root]);
  }

  return (
    <div className="rounded-3xl border border-border bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.12),transparent_70%)] p-6 text-center">
      <div className="mb-5 flex justify-center gap-1.5">
        {Array.from({ length: totalDepth }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-1.5 rounded-full ${
              i < path.length - 1 ? "bg-primary" : "bg-white/15"
            }`}
          />
        ))}
      </div>

      <div className="mb-5 flex flex-wrap justify-center gap-3.5">
        {organisms.map((name) => {
          const isAlive = alive.has(name);
          const isAnswer = identified === name;
          return (
            <div
              key={name}
              className={`flex h-16 w-16 items-center justify-center rounded-full border text-center text-[10px] leading-tight transition-all duration-300 ${
                isAnswer
                  ? "border-primary bg-gradient-to-br from-primary/30 to-accent/25 text-foreground shadow-[0_0_22px_rgba(99,102,241,0.45)]"
                  : isAlive
                    ? "border-border bg-white/5 text-muted-foreground"
                    : "border-border/50 bg-white/5 text-muted-foreground/40 opacity-15 grayscale"
              }`}
            >
              {name}
            </div>
          );
        })}
      </div>

      <p className="mb-3.5 min-h-[20px] text-sm text-muted-foreground">
        {current.type === "question" ? (
          current.question
        ) : (
          <>
            🌟 Identified: <b className="text-primary">{current.organism}</b>
          </>
        )}
      </p>

      {current.type === "question" && (
        <div className="flex flex-wrap justify-center gap-3">
          {current.choices.map((choice) => (
            <button
              key={choice.label}
              type="button"
              onClick={() => choose(choice.next)}
              className="rounded-full border border-border bg-white/5 px-5 py-2.5 text-[13px] font-semibold text-foreground transition-colors hover:border-primary"
            >
              {choice.label}
            </button>
          ))}
        </div>
      )}

      {path.length > 1 && (
        <button
          type="button"
          onClick={reset}
          className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground underline underline-offset-2"
        >
          <RotateCcw className="h-3 w-3" /> {restartLabel}
        </button>
      )}
    </div>
  );
}
