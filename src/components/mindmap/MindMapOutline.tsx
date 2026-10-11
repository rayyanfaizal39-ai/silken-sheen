import { ChevronRight, ChevronsDownUp, ChevronsUpDown } from "lucide-react";
import { visibleSummary, type MindNode } from "./tree";
import { branchColor, type MindMapStrings } from "./theme";

// Outline view: the same hierarchy as a vertical, expandable list. It shares
// the map's expanded and selected state, so switching views keeps the place.

function OutlineNode({
  node,
  depth,
  branchIndex,
  expanded,
  selectedId,
  onToggle,
}: {
  node: MindNode;
  depth: number;
  branchIndex: number;
  expanded: ReadonlySet<string>;
  selectedId: string | null;
  onToggle: (id: string) => void;
}) {
  const hasChildren = !!node.children?.length;
  const isExpanded = expanded.has(node.id);
  const summary = visibleSummary(node, depth);
  const accent = branchColor(branchIndex);
  const selected = selectedId === node.id;

  return (
    <li className="relative min-w-0">
      {depth > 1 && (
        <span
          aria-hidden="true"
          className="absolute -left-4 top-0 h-7 w-4 rounded-bl-xl border-b border-l"
          style={{ borderColor: `${accent}55` }}
        />
      )}
      <button
        type="button"
        data-mindmap-depth={depth}
        data-node-id={node.id}
        onClick={() => onToggle(node.id)}
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-current={selected ? "true" : undefined}
        className={`flex min-h-12 w-full min-w-0 items-start justify-between gap-3 rounded-2xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 ${
          depth === 1 ? "bg-[#132150] text-white" : "border-white/10 bg-[#0D1631] text-white/90"
        } ${selected ? "ring-2 ring-cyan-300/60" : ""}`}
        style={depth === 1 ? { borderColor: `${accent}66` } : undefined}
      >
        <span className="min-w-0 flex-1">
          <span
            className={`block break-words leading-6 ${
              depth === 1 ? "font-display text-[17px] font-semibold" : "text-base font-semibold"
            }`}
          >
            {node.label}
          </span>
          {summary && (
            <span className="mt-1.5 block break-words text-[15px] leading-6 text-[#AEBAD6]">
              {summary}
            </span>
          )}
        </span>
        {hasChildren && (
          <span
            aria-hidden="true"
            className={`mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 transition-transform ${
              isExpanded ? "rotate-90" : ""
            }`}
          >
            <ChevronRight className="h-4 w-4" />
          </span>
        )}
      </button>
      {hasChildren && isExpanded && (
        <ul className="ml-4 mt-3 space-y-3 border-l pl-4" style={{ borderColor: `${accent}40` }}>
          {node.children?.map((child) => (
            <OutlineNode
              key={child.id}
              node={child}
              depth={depth + 1}
              branchIndex={branchIndex}
              expanded={expanded}
              selectedId={selectedId}
              onToggle={onToggle}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export function MindMapOutline({
  data,
  expanded,
  selectedId,
  strings,
  onToggle,
  onExpandAll,
  onCollapseAll,
}: {
  data: MindNode;
  expanded: ReadonlySet<string>;
  selectedId: string | null;
  strings: MindMapStrings;
  onToggle: (id: string) => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
}) {
  const buttonClass =
    "inline-flex min-h-11 flex-none items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/85 transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60";
  return (
    <section
      className="mx-auto w-full min-w-0 max-w-3xl overflow-x-hidden p-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))] sm:p-6"
      aria-label={strings.outlineLabel(data.label)}
    >
      <div className="mb-4 flex flex-wrap items-center justify-end gap-2">
        <button type="button" onClick={onExpandAll} className={buttonClass}>
          <ChevronsUpDown className="h-4 w-4" aria-hidden="true" /> {strings.expandAll}
        </button>
        <button type="button" onClick={onCollapseAll} className={buttonClass}>
          <ChevronsDownUp className="h-4 w-4" aria-hidden="true" /> {strings.collapseAll}
        </button>
      </div>

      <div className="rounded-3xl border border-violet-300/40 bg-[linear-gradient(140deg,#7A4DF0_0%,#5B2BC9_48%,#44198F_100%)] p-5 text-center text-white shadow-[0_24px_60px_-18px_rgba(91,43,201,0.75)]">
        <h3 className="break-words font-display text-xl font-bold tracking-wide">{data.label}</h3>
        {data.summary && (
          <p className="mt-2 break-words text-[15px] leading-6 text-white/85">{data.summary}</p>
        )}
      </div>

      {data.children?.length ? (
        <ul className="relative mt-5 space-y-4 border-l border-cyan-300/30 pl-4">
          {data.children.map((child, index) => (
            <OutlineNode
              key={child.id}
              node={child}
              depth={1}
              branchIndex={index}
              expanded={expanded}
              selectedId={selectedId}
              onToggle={onToggle}
            />
          ))}
        </ul>
      ) : null}
    </section>
  );
}
