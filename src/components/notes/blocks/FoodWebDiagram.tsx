import { useMemo, useState } from "react";
import type { FoodWebBlock } from "@/content/form2/science/interactive-types";

/**
 * A worked food web: several interconnected food chains drawn as one diagram.
 *
 * Energy flows from the organism that is eaten to the organism that eats it, so
 * every arrow points from a lower tier to a higher tier. Producers sit on the
 * bottom row and the top carnivore on the top row, which keeps the whole web
 * inside a narrow column on phones.
 *
 * Tapping an organism highlights every chain that runs through it; tapping a
 * chain highlights that chain in the diagram. That is what turns a picture into
 * the SP 2.1.2 skill — recognising a web and tracing the chains inside it.
 */
export function FoodWebDiagram({ block }: { block: FoodWebBlock }) {
  const { nodes, edges } = block;
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [activeChain, setActiveChain] = useState<number | null>(null);

  const byId = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);

  /** Every producer-to-top-consumer path through the web. */
  const chains = useMemo(() => {
    const out: string[][] = [];
    const eats = (id: string) => edges.filter((e) => e.from === id).map((e) => e.to);
    const walk = (id: string, trail: string[]) => {
      const next = eats(id);
      if (next.length === 0) {
        if (trail.length > 1) out.push(trail);
        return;
      }
      next.forEach((n) => walk(n, [...trail, n]));
    };
    nodes.filter((n) => n.tier === 0).forEach((p) => walk(p.id, [p.id]));
    return out;
  }, [nodes, edges]);

  const highlighted = useMemo(() => {
    if (activeChain !== null) return new Set(chains[activeChain] ?? []);
    if (activeNode) {
      const ids = new Set<string>();
      chains.filter((c) => c.includes(activeNode)).forEach((c) => c.forEach((id) => ids.add(id)));
      return ids;
    }
    return null;
  }, [activeChain, activeNode, chains]);

  const isEdgeLit = (from: string, to: string) => {
    if (activeChain !== null) {
      const c = chains[activeChain] ?? [];
      const i = c.indexOf(from);
      return i !== -1 && c[i + 1] === to;
    }
    if (activeNode) {
      return chains.some((c) => {
        if (!c.includes(activeNode)) return false;
        const i = c.indexOf(from);
        return i !== -1 && c[i + 1] === to;
      });
    }
    return false;
  };

  // Layout: one row per tier, producers at the bottom.
  const tiers = useMemo(() => {
    const max = Math.max(...nodes.map((n) => n.tier));
    return Array.from({ length: max + 1 }, (_, t) => nodes.filter((n) => n.tier === t));
  }, [nodes]);

  const COL = 100;
  const ROW = 86;
  const width = Math.max(...tiers.map((t) => t.length)) * COL;
  const height = tiers.length * ROW;
  const pos = (id: string) => {
    const node = byId.get(id);
    if (!node) return { x: 0, y: 0 };
    const row = tiers[node.tier];
    const i = row.findIndex((n) => n.id === id);
    return {
      x: (width / (row.length + 1)) * (i + 1),
      y: height - ROW / 2 - node.tier * ROW,
    };
  };

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-4">
      <p className="mb-1 text-[13px] leading-relaxed text-muted-foreground">{block.instruction}</p>
      <p className="mb-3 text-[11.5px] text-primary">{block.arrowNote}</p>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="mx-auto w-full min-w-[280px] max-w-[420px]"
          role="img"
          aria-label={block.title}
        >
          <defs>
            <marker id="fw-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" className="fill-muted-foreground" />
            </marker>
            <marker id="fw-arrow-lit" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" className="fill-primary" />
            </marker>
          </defs>

          {edges.map((e) => {
            const a = pos(e.from);
            const b = pos(e.to);
            const lit = isEdgeLit(e.from, e.to);
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const len = Math.hypot(dx, dy) || 1;
            const pad = 21;
            return (
              <line
                key={`${e.from}-${e.to}`}
                x1={a.x + (dx / len) * pad}
                y1={a.y + (dy / len) * pad}
                x2={b.x - (dx / len) * (pad + 5)}
                y2={b.y - (dy / len) * (pad + 5)}
                markerEnd={lit ? "url(#fw-arrow-lit)" : "url(#fw-arrow)"}
                className={lit ? "stroke-primary" : "stroke-muted-foreground"}
                strokeWidth={lit ? 2.2 : 1.2}
                opacity={highlighted && !lit ? 0.18 : 0.75}
              />
            );
          })}

          {nodes.map((n) => {
            const { x, y } = pos(n.id);
            const dim = highlighted ? !highlighted.has(n.id) : false;
            const selected = activeNode === n.id;
            return (
              <g
                key={n.id}
                onClick={() => {
                  setActiveChain(null);
                  setActiveNode((v) => (v === n.id ? null : n.id));
                }}
                className="cursor-pointer"
                opacity={dim ? 0.22 : 1}
              >
                <circle
                  cx={x}
                  cy={y}
                  r="20"
                  className={
                    selected
                      ? "fill-primary stroke-primary"
                      : highlighted && !dim
                        ? "fill-primary/25 stroke-primary"
                        : "fill-card stroke-border"
                  }
                  strokeWidth="1.5"
                />
                <text
                  x={x}
                  y={y + 1}
                  textAnchor="middle"
                  fontSize="13"
                  className={selected ? "fill-primary-foreground" : "fill-foreground"}
                >
                  {n.icon ?? ""}
                </text>
                <text
                  x={x}
                  y={y + 32}
                  textAnchor="middle"
                  fontSize="9.5"
                  fontWeight="600"
                  className="fill-foreground"
                >
                  {n.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1 text-[10.5px] text-muted-foreground">
        {block.tierLabels.map((label, i) => (
          <span key={label}>
            {i + 1}. {label}
          </span>
        ))}
      </div>

      <p className="mb-2 mt-4 text-[12px] font-semibold text-foreground">
        {block.chainsLabel} ({chains.length})
      </p>
      <div className="flex flex-col gap-1.5">
        {chains.map((chain, i) => (
          <button
            key={chain.join(">")}
            type="button"
            onClick={() => {
              setActiveNode(null);
              setActiveChain((v) => (v === i ? null : i));
            }}
            aria-pressed={activeChain === i}
            className={`min-h-11 rounded-xl border px-3 py-2 text-left text-[12px] transition-colors ${
              activeChain === i
                ? "border-primary bg-primary/15 text-foreground"
                : "border-border bg-card/50 text-muted-foreground hover:border-primary/50"
            }`}
          >
            {chain.map((id) => byId.get(id)?.label ?? id).join(" → ")}
          </button>
        ))}
      </div>
      <p className="mt-2 text-[11px] text-muted-foreground">{block.tapHint}</p>
    </div>
  );
}
