import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Plus, Minus, Maximize2, ChevronsDownUp, ChevronsUpDown, RotateCcw } from "lucide-react";

export type MindNode = {
  id: string;
  label: string;
  children?: MindNode[];
};

type Pos = { x: number; y: number; w: number; h: number };
type LayoutResult = {
  positions: Map<string, Pos>;
  height: number;
  edges: { from: string; to: string }[];
};

const H_GAP = 70; // horizontal gap between columns
const V_GAP = 18; // vertical gap between siblings
const PAD_X = 28; // horizontal padding inside a node
const MIN_W = 120;
const MAX_W = 320;
const LINE_H = 18;
const V_PAD = 18; // vertical padding inside a node (total)

function fontForDepth(depth: number) {
  const size = depth === 0 ? 15 : depth === 1 ? 13.5 : 12.5;
  const weight = depth <= 1 ? 700 : 600;
  return `${weight} ${size}px ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`;
}

let _ctx: CanvasRenderingContext2D | null = null;
function measureCtx(): CanvasRenderingContext2D | null {
  if (typeof document === "undefined") return null;
  if (_ctx) return _ctx;
  const c = document.createElement("canvas");
  _ctx = c.getContext("2d");
  return _ctx;
}

function measureNode(label: string, depth: number): { w: number; h: number } {
  const ctx = measureCtx();
  const hasChildrenAffordance = 26; // space for the +/x circle
  if (!ctx) {
    // SSR fallback estimate
    const approx = Math.min(MAX_W, Math.max(MIN_W, label.length * 7.5 + PAD_X * 2 + hasChildrenAffordance));
    return { w: approx, h: 56 };
  }
  ctx.font = fontForDepth(depth);
  const singleLine = ctx.measureText(label).width;
  const desired = singleLine + PAD_X * 2 + hasChildrenAffordance;
  if (desired <= MAX_W) {
    return { w: Math.max(MIN_W, Math.ceil(desired)), h: Math.max(48, LINE_H + V_PAD * 2) };
  }
  // need to wrap: choose width = MAX_W, compute lines greedily
  const maxTextW = MAX_W - PAD_X * 2 - hasChildrenAffordance;
  const words = label.split(/\s+/);
  let lines = 1;
  let cur = "";
  for (const w of words) {
    const test = cur ? cur + " " + w : w;
    if (ctx.measureText(test).width <= maxTextW) {
      cur = test;
    } else {
      if (cur) {
        lines++;
        cur = w;
      } else {
        // single word longer than maxTextW: force break
        cur = w;
        lines++;
      }
    }
  }
  return { w: MAX_W, h: Math.max(48, lines * LINE_H + V_PAD * 2) };
}

function subtreeHeight(node: MindNode, expanded: Set<string>, sizes: Map<string, { w: number; h: number }>, depth: number): number {
  const own = sizes.get(node.id)?.h ?? 48;
  if (!node.children || node.children.length === 0 || !expanded.has(node.id)) return own;
  const childrenTotal = node.children.reduce((sum, c, i) => sum + subtreeHeight(c, expanded, sizes, depth + 1) + (i > 0 ? V_GAP : 0), 0);
  return Math.max(own, childrenTotal);
}

function layoutTree(
  node: MindNode,
  depth: number,
  xStart: number,
  yStart: number,
  expanded: Set<string>,
  sizes: Map<string, { w: number; h: number }>,
  out: LayoutResult,
): { centerY: number; height: number } {
  const size = sizes.get(node.id) ?? { w: MIN_W, h: 48 };
  const x = xStart;

  if (!node.children || node.children.length === 0 || !expanded.has(node.id)) {
    const centerY = yStart + size.h / 2;
    out.positions.set(node.id, { x, y: centerY, w: size.w, h: size.h });
    return { centerY, height: size.h };
  }

  const childX = x + size.w + H_GAP;
  // compute total children height
  let total = 0;
  const childHeights = node.children.map((c) => subtreeHeight(c, expanded, sizes, depth + 1));
  total = childHeights.reduce((s, h, i) => s + h + (i > 0 ? V_GAP : 0), 0);
  const ownH = size.h;
  const blockH = Math.max(total, ownH);
  let cursor = yStart + (blockH - total) / 2;
  const childCenters: number[] = [];
  node.children.forEach((child, i) => {
    const { centerY } = layoutTree(child, depth + 1, childX, cursor, expanded, sizes, out);
    childCenters.push(centerY);
    out.edges.push({ from: node.id, to: child.id });
    cursor += childHeights[i] + V_GAP;
  });
  const centerY = (childCenters[0] + childCenters[childCenters.length - 1]) / 2;
  out.positions.set(node.id, { x, y: centerY, w: size.w, h: size.h });
  return { centerY, height: blockH };
}

function collectExpandableIds(node: MindNode, out: Set<string>) {
  if (node.children && node.children.length) {
    out.add(node.id);
    node.children.forEach((c) => collectExpandableIds(c, out));
  }
}

function collectAllNodes(node: MindNode, depth: number, out: { node: MindNode; depth: number }[]) {
  out.push({ node, depth });
  node.children?.forEach((c) => collectAllNodes(c, depth + 1, out));
}

export function MindMap({ data, height = 620 }: { data: MindNode; height?: number }) {
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set([data.id]));
  const [tx, setTx] = useState(40);
  const [ty, setTy] = useState(height / 2);
  const [scale, setScale] = useState(0.9);
  const containerRef = useRef<HTMLDivElement>(null);

  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pinchStart = useRef<{ dist: number; scale: number } | null>(null);
  const panStart = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);

  // Pre-measure every node once per data change
  const sizes = useMemo(() => {
    const s = new Map<string, { w: number; h: number }>();
    const all: { node: MindNode; depth: number }[] = [];
    collectAllNodes(data, 0, all);
    for (const { node, depth } of all) s.set(node.id, measureNode(node.label, depth));
    return s;
  }, [data]);

  const layout = useMemo(() => {
    const out: LayoutResult = { positions: new Map(), height: 0, edges: [] };
    const { height: h } = layoutTree(data, 0, 0, 0, expanded, sizes, out);
    out.height = h;
    return out;
  }, [data, expanded, sizes]);

  const visibleNodes = useMemo(() => {
    const result: { node: MindNode; depth: number }[] = [];
    function walk(n: MindNode, d: number) {
      result.push({ node: n, depth: d });
      if (expanded.has(n.id)) n.children?.forEach((c) => walk(c, d + 1));
    }
    walk(data, 0);
    return result;
  }, [data, expanded]);

  const toggle = useCallback((id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const expandAll = useCallback(() => {
    const s = new Set<string>();
    collectExpandableIds(data, s);
    setExpanded(s);
  }, [data]);

  const collapseAll = useCallback(() => {
    setExpanded(new Set([data.id]));
  }, [data]);

  const resetView = useCallback(() => {
    setScale(0.9);
    setTx(40);
    setTy(height / 2);
  }, [height]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    function onWheel(e: WheelEvent) {
      if (!el) return;
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const delta = -e.deltaY * 0.0015;
      setScale((s) => {
        const ns = Math.min(2.5, Math.max(0.3, s * (1 + delta)));
        const k = ns / s;
        setTx((t) => mx - (mx - t) * k);
        setTy((t) => my - (my - t) * k);
        return ns;
      });
    }
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  function onPointerDown(e: React.PointerEvent) {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 1) {
      panStart.current = { x: e.clientX, y: e.clientY, tx, ty };
    } else if (pointers.current.size === 2) {
      const [a, b] = Array.from(pointers.current.values());
      pinchStart.current = { dist: Math.hypot(a.x - b.x, a.y - b.y), scale };
      panStart.current = null;
    }
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 1 && panStart.current) {
      setTx(panStart.current.tx + (e.clientX - panStart.current.x));
      setTy(panStart.current.ty + (e.clientY - panStart.current.y));
    } else if (pointers.current.size === 2 && pinchStart.current) {
      const [a, b] = Array.from(pointers.current.values());
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const ns = Math.min(2.5, Math.max(0.3, pinchStart.current.scale * (dist / pinchStart.current.dist)));
      setScale(ns);
    }
  }

  function onPointerUp(e: React.PointerEvent) {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinchStart.current = null;
    if (pointers.current.size === 0) panStart.current = null;
  }

  function nodeStyle(depth: number, hasChildren: boolean, isExpanded: boolean) {
    if (depth === 0)
      return {
        bg: "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)",
        text: "#ffffff",
        border: "rgba(139,92,246,0.6)",
        glow: "0 0 28px rgba(139,92,246,0.55)",
      };
    if (depth === 1)
      return {
        bg: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
        text: "#ffffff",
        border: "rgba(59,130,246,0.6)",
        glow: "0 0 22px rgba(59,130,246,0.5)",
      };
    return {
      bg: "#1E293B",
      text: "#86efac",
      border: hasChildren
        ? isExpanded
          ? "rgba(134,239,172,0.55)"
          : "rgba(134,239,172,0.3)"
        : "rgba(148,163,184,0.25)",
      glow: hasChildren ? "0 0 14px rgba(134,239,172,0.25)" : "none",
    };
  }

  const allPos = Array.from(layout.positions.values());
  const minX = (allPos.length ? Math.min(...allPos.map((p) => p.x)) : 0) - 50;
  const maxX = (allPos.length ? Math.max(...allPos.map((p) => p.x + p.w)) : 0) + 50;
  const minY = (allPos.length ? Math.min(...allPos.map((p) => p.y - p.h / 2)) : 0) - 50;
  const maxY = (allPos.length ? Math.max(...allPos.map((p) => p.y + p.h / 2)) : 0) + 50;
  const svgW = maxX - minX;
  const svgH = maxY - minY;

  return (
    <div className="relative w-full glass-strong rounded-2xl border border-white/10 overflow-hidden" style={{ height }}>
      <div className="absolute top-3 right-3 z-20 flex flex-wrap gap-2">
        <button onClick={expandAll} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 backdrop-blur inline-flex items-center gap-1.5 transition">
          <ChevronsUpDown className="w-3.5 h-3.5" /> Expand all
        </button>
        <button onClick={collapseAll} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 backdrop-blur inline-flex items-center gap-1.5 transition">
          <ChevronsDownUp className="w-3.5 h-3.5" /> Collapse all
        </button>
        <button onClick={resetView} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 backdrop-blur inline-flex items-center gap-1.5 transition">
          <Maximize2 className="w-3.5 h-3.5" /> Reset
        </button>
      </div>
      <div className="absolute bottom-3 right-3 z-20 flex flex-col gap-2">
        <button onClick={() => setScale((s) => Math.min(2.5, s * 1.2))} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur inline-flex items-center justify-center">
          <Plus className="w-4 h-4" />
        </button>
        <button onClick={() => setScale((s) => Math.max(0.3, s / 1.2))} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur inline-flex items-center justify-center">
          <Minus className="w-4 h-4" />
        </button>
        <button onClick={resetView} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur inline-flex items-center justify-center" title="Center">
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <div
        ref={containerRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing select-none touch-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(30,41,59,0.6) 0%, rgba(15,23,42,0.9) 70%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            transformOrigin: "0 0",
            transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
            transition: "transform 0.05s linear",
          }}
        >
          <svg
            width={svgW}
            height={svgH}
            style={{ position: "absolute", left: minX, top: minY, overflow: "visible", pointerEvents: "none" }}
          >
            {layout.edges.map(({ from, to }, i) => {
              const a = layout.positions.get(from);
              const b = layout.positions.get(to);
              if (!a || !b) return null;
              const x1 = a.x + a.w - minX;
              const y1 = a.y - minY;
              const x2 = b.x - minX;
              const y2 = b.y - minY;
              const midX = (x1 + x2) / 2;
              const d = `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;
              return (
                <path
                  key={`${from}-${to}-${i}`}
                  d={d}
                  fill="none"
                  stroke="url(#mm-edge)"
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: 600,
                    strokeDashoffset: 0,
                    animation: "mm-draw 0.45s ease-out both",
                  }}
                />
              );
            })}
            <defs>
              <linearGradient id="mm-edge" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.7" />
              </linearGradient>
            </defs>
          </svg>

          {visibleNodes.map(({ node, depth }) => {
            const p = layout.positions.get(node.id);
            if (!p) return null;
            const hasChildren = !!node.children?.length;
            const isExpanded = expanded.has(node.id);
            const s = nodeStyle(depth, hasChildren, isExpanded);
            return (
              <button
                key={node.id}
                onClick={(e) => {
                  e.stopPropagation();
                  if (hasChildren) toggle(node.id);
                }}
                onPointerDown={(e) => e.stopPropagation()}
                className="absolute group"
                style={{
                  left: p.x,
                  top: p.y - p.h / 2,
                  width: p.w,
                  minHeight: p.h,
                  background: s.bg,
                  color: s.text,
                  border: `1px solid ${s.border}`,
                  borderRadius: 14,
                  boxShadow: s.glow,
                  padding: `${V_PAD / 2}px ${PAD_X / 2 + 6}px`,
                  fontSize: depth === 0 ? 15 : depth === 1 ? 13.5 : 12.5,
                  fontWeight: depth <= 1 ? 700 : 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 8,
                  cursor: hasChildren ? "pointer" : "default",
                  textAlign: "left",
                  lineHeight: `${LINE_H}px`,
                  transition: "transform 0.2s, box-shadow 0.2s, filter 0.2s",
                  animation: "mm-pop 0.35s ease-out both",
                  whiteSpace: "normal",
                  overflow: "visible",
                  wordBreak: "break-word",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.filter = "brightness(1.15)";
                  (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.filter = "";
                  (e.currentTarget as HTMLElement).style.transform = "";
                }}
              >
                <span
                  style={{
                    flex: 1,
                    whiteSpace: "normal",
                    overflow: "visible",
                    textOverflow: "clip",
                    wordBreak: "break-word",
                  }}
                >
                  {node.label}
                </span>
                {hasChildren && (
                  <span
                    style={{
                      fontSize: 10,
                      width: 18,
                      height: 18,
                      borderRadius: 999,
                      background: "rgba(255,255,255,0.15)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "transform 0.25s",
                      transform: isExpanded ? "rotate(45deg)" : "rotate(0deg)",
                      flexShrink: 0,
                    }}
                  >
                    +
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes mm-draw { from { stroke-dashoffset: 600; opacity: 0; } to { stroke-dashoffset: 0; opacity: 1; } }
        @keyframes mm-pop { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}
