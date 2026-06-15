import { useMemo, useState, useCallback } from "react";
import { ChevronRight, ChevronsUpDown, ChevronsDownUp, Maximize2, Search, X } from "lucide-react";
import type { MindNode } from "./MindMap";

function collectExpandable(node: MindNode, out: Set<string>) {
  if (node.children?.length) {
    out.add(node.id);
    node.children.forEach((c) => collectExpandable(c, out));
  }
}

function matchesQuery(node: MindNode, q: string): boolean {
  if (!q) return true;
  if (node.label.toLowerCase().includes(q)) return true;
  return !!node.children?.some((c) => matchesQuery(c, q));
}

function depthAccent(depth: number) {
  if (depth === 0)
    return {
      bar: "linear-gradient(180deg,#A855F7,#6C63FF)",
      bg: "linear-gradient(135deg, rgba(108,99,255,0.22), rgba(168,85,247,0.18))",
      border: "rgba(168,85,247,0.55)",
      text: "#ffffff",
      glow: "0 8px 30px -10px rgba(168,85,247,0.55)",
    };
  if (depth === 1)
    return {
      bar: "linear-gradient(180deg,#00D4FF,#6C63FF)",
      bg: "linear-gradient(135deg, rgba(0,212,255,0.16), rgba(108,99,255,0.14))",
      border: "rgba(0,212,255,0.45)",
      text: "#e0f2fe",
      glow: "0 6px 22px -10px rgba(0,212,255,0.5)",
    };
  if (depth === 2)
    return {
      bar: "linear-gradient(180deg,#7CFF6B,#00D4FF)",
      bg: "rgba(15,23,42,0.7)",
      border: "rgba(124,255,107,0.35)",
      text: "#ecfccb",
      glow: "none",
    };
  return {
    bar: "linear-gradient(180deg,rgba(148,163,184,0.6),rgba(148,163,184,0.2))",
    bg: "rgba(15,23,42,0.55)",
    border: "rgba(148,163,184,0.25)",
    text: "#cbd5e1",
    glow: "none",
  };
}

function TreeNode({
  node,
  depth,
  expanded,
  onToggle,
  query,
}: {
  node: MindNode;
  depth: number;
  expanded: Set<string>;
  onToggle: (id: string) => void;
  query: string;
}) {
  const hasChildren = !!node.children?.length;
  const isOpen = expanded.has(node.id);
  const matched = query && node.label.toLowerCase().includes(query);
  const a = depthAccent(depth);

  if (query && !matchesQuery(node, query)) return null;

  return (
    <div className="mm-tree-node" style={{ marginLeft: depth === 0 ? 0 : 14 }}>
      <button
        type="button"
        onClick={() => hasChildren && onToggle(node.id)}
        className="mm-tree-row"
        style={{
          background: a.bg,
          border: `1px solid ${matched ? "#facc15" : a.border}`,
          color: a.text,
          boxShadow: a.glow,
          cursor: hasChildren ? "pointer" : "default",
        }}
      >
        <span className="mm-tree-bar" style={{ background: a.bar }} aria-hidden />
        <span className="mm-tree-label">{node.label}</span>
        {hasChildren && (
          <ChevronRight
            className="mm-tree-chev"
            style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
          />
        )}
      </button>
      {hasChildren && isOpen && (
        <div className="mm-tree-children">
          {node.children!.map((c) => (
            <TreeNode
              key={c.id}
              node={c}
              depth={depth + 1}
              expanded={expanded}
              onToggle={onToggle}
              query={query}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function MindMapMobileTree({
  data,
  onOpenInteractive,
}: {
  data: MindNode;
  onOpenInteractive?: () => void;
}) {
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set([data.id]));
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const allIds = useMemo(() => {
    const s = new Set<string>();
    collectExpandable(data, s);
    return s;
  }, [data]);

  const toggle = useCallback((id: string) => {
    setExpanded((p) => {
      const n = new Set(p);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }, []);

  const normalizedQuery = query.trim().toLowerCase();

  // Auto-expand all when searching
  const effectiveExpanded = normalizedQuery ? allIds : expanded;

  return (
    <div className="mm-tree-shell">
      <div className="mm-tree-toolbar">
        <div className="mm-tree-toolbar-row">
          <button
            type="button"
            onClick={() => setExpanded(new Set(allIds))}
            className="mm-tree-tool-btn"
          >
            <ChevronsUpDown className="w-3.5 h-3.5" /> Expand
          </button>
          <button
            type="button"
            onClick={() => setExpanded(new Set([data.id]))}
            className="mm-tree-tool-btn"
          >
            <ChevronsDownUp className="w-3.5 h-3.5" /> Collapse
          </button>
          <button
            type="button"
            onClick={() => setShowSearch((s) => !s)}
            className="mm-tree-tool-btn"
            aria-label="Search nodes"
          >
            <Search className="w-3.5 h-3.5" />
          </button>
          {onOpenInteractive && (
            <button
              type="button"
              onClick={onOpenInteractive}
              className="mm-tree-tool-btn mm-tree-tool-primary"
            >
              <Maximize2 className="w-3.5 h-3.5" /> Interactive
            </button>
          )}
        </div>
        {showSearch && (
          <div className="mm-tree-search">
            <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search nodes…"
              className="bg-transparent text-sm text-slate-100 placeholder:text-slate-500 outline-none flex-1"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-slate-400 hover:text-white"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>

      <div className="mm-tree-body">
        <TreeNode
          node={data}
          depth={0}
          expanded={effectiveExpanded}
          onToggle={toggle}
          query={normalizedQuery}
        />
      </div>
    </div>
  );
}
