import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import {
  Plus,
  Minus,
  Maximize2,
  ChevronsDownUp,
  ChevronsUpDown,
  Locate,
  Home,
  ChevronLeft,
  ChevronRight,
  X,
  Map as MapIcon,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export type MindNode = {
  id: string;
  label: string;
  children?: MindNode[];
};

const EMPTY_MIND_NODE: MindNode = {
  id: "empty-mindmap",
  label: "Mind Map",
  children: [],
};

function normalizeMindNode(value: unknown): MindNode {
  if (!value || typeof value !== "object") return EMPTY_MIND_NODE;
  const candidate = value as Partial<MindNode>;
  if (typeof candidate.id !== "string" || typeof candidate.label !== "string") {
    return EMPTY_MIND_NODE;
  }
  const children = Array.isArray(candidate.children)
    ? candidate.children
        .map((child) => normalizeMindNode(child))
        .filter((child) => child !== EMPTY_MIND_NODE)
    : [];
  return children.length
    ? { id: candidate.id, label: candidate.label, children }
    : {
        id: candidate.id,
        label: candidate.label,
      };
}

type Pos = { x: number; y: number; w: number; h: number };
type LayoutResult = {
  positions: Map<string, Pos>;
  height: number;
  edges: { from: string; to: string }[];
};

type MindMapPalette = {
  root?: string;
  branchYunani?: string;
  branchRom?: string;
  branchMesopotamia?: string;
  branchMesir?: string;
  branchIndus?: string;
  branchHuangHe?: string;
  leafBg?: string;
  leafText?: string;
  edgeStart?: string;
  edgeEnd?: string;
};

const H_GAP = 96; // horizontal gap between columns
const V_GAP = 28; // vertical gap between siblings
const PAD_X = 28; // horizontal padding inside a node
const MIN_W = 132;
const MAX_W = 280;
const LINE_H = 19;
const V_PAD = 20; // vertical padding inside a node (total)

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
  const safeLabel = typeof label === "string" ? label : "";
  const ctx = measureCtx();
  const hasChildrenAffordance = 26; // space for the +/x circle
  if (!ctx) {
    // SSR fallback estimate
    const approx = Math.min(
      MAX_W,
      Math.max(MIN_W, safeLabel.length * 7.5 + PAD_X * 2 + hasChildrenAffordance),
    );
    return { w: approx, h: 56 };
  }
  ctx.font = fontForDepth(depth);
  const singleLine = ctx.measureText(safeLabel).width;
  const desired = singleLine + PAD_X * 2 + hasChildrenAffordance;
  if (desired <= MAX_W) {
    return { w: Math.max(MIN_W, Math.ceil(desired)), h: Math.max(48, LINE_H + V_PAD * 2) };
  }
  // need to wrap: choose width = MAX_W, compute lines greedily
  const maxTextW = MAX_W - PAD_X * 2 - hasChildrenAffordance;
  const words = safeLabel.split(/\s+/);
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

function subtreeHeight(
  node: MindNode,
  expanded: Set<string>,
  sizes: Map<string, { w: number; h: number }>,
  depth: number,
): number {
  const own = sizes.get(node.id)?.h ?? 48;
  if (!node.children || node.children.length === 0 || !expanded.has(node.id)) return own;
  const childrenTotal = node.children.reduce(
    (sum, c, i) => sum + subtreeHeight(c, expanded, sizes, depth + 1) + (i > 0 ? V_GAP : 0),
    0,
  );
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

function collectTreeMaps(
  node: MindNode,
  depth: number,
  nodes: Map<string, { node: MindNode; depth: number }>,
  parents: Map<string, string>,
) {
  nodes.set(node.id, { node, depth });
  node.children?.forEach((child) => {
    parents.set(child.id, node.id);
    collectTreeMaps(child, depth + 1, nodes, parents);
  });
}

function boundsForIds(ids: Iterable<string>, positions: Map<string, Pos>) {
  const items = Array.from(ids)
    .map((id) => positions.get(id))
    .filter(Boolean) as Pos[];
  if (!items.length) return null;
  return {
    minX: Math.min(...items.map((p) => p.x)),
    maxX: Math.max(...items.map((p) => p.x + p.w)),
    minY: Math.min(...items.map((p) => p.y - p.h / 2)),
    maxY: Math.max(...items.map((p) => p.y + p.h / 2)),
  };
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

type CameraRequest = {
  id: string;
  mode: "toggle" | "focus" | "reset";
};

export function MindMap({
  data: inputData,
  height = "85dvh",
  palette,
}: {
  data?: MindNode;
  height?: number | string;
  palette?: MindMapPalette;
}) {
  const data = useMemo(() => normalizeMindNode(inputData), [inputData]);
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set([data.id]));
  const [tx, setTx] = useState(40);
  const [ty, setTy] = useState(400);
  const [scale, setScale] = useState(0.9);
  const [selectedId, setSelectedId] = useState<string | null>(data.id);
  const [showMinimap, setShowMinimap] = useState(true);
  const [displayedIds, setDisplayedIds] = useState<Set<string>>(() => new Set([data.id]));
  const [exitingIds, setExitingIds] = useState<Set<string>>(() => new Set());
  const [enteringIds, setEnteringIds] = useState<Set<string>>(() => new Set());
  const [revealDelays, setRevealDelays] = useState<Map<string, number>>(() => new Map());
  const [mobileFullscreen, setMobileFullscreen] = useState(false);
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);

  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pinchStart = useRef<{
    dist: number;
    scale: number;
    mapX: number;
    mapY: number;
  } | null>(null);
  const panStart = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);
  const velocity = useRef({ x: 0, y: 0, time: 0 });
  const inertiaFrame = useRef<number | null>(null);
  const cameraFrame = useRef<number | null>(null);
  const pendingCamera = useRef<CameraRequest | null>(null);
  const initialViewDone = useRef(false);
  const previousVisibleIds = useRef<Set<string>>(new Set([data.id]));
  const previousPositions = useRef<Map<string, Pos>>(new Map());
  const cameraState = useRef({ tx, ty, scale });

  const treeMaps = useMemo(() => {
    const nodes = new Map<string, { node: MindNode; depth: number }>();
    const parents = new Map<string, string>();
    collectTreeMaps(data, 0, nodes, parents);
    return { nodes, parents };
  }, [data]);

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

  const visibleIds = useMemo(
    () => new Set(visibleNodes.map(({ node }) => node.id)),
    [visibleNodes],
  );

  useEffect(() => {
    layout.positions.forEach((position, id) => previousPositions.current.set(id, position));
  }, [layout.positions]);

  useEffect(() => {
    const previous = previousVisibleIds.current;
    const enteringList = visibleNodes.map(({ node }) => node.id).filter((id) => !previous.has(id));
    const entering = new Set(enteringList);
    const exiting = new Set(Array.from(previous).filter((id) => !visibleIds.has(id)));
    const delays = new Map(enteringList.map((id, index) => [id, Math.min(index * 80, 560)]));

    setDisplayedIds((current) => new Set([...current, ...visibleIds]));
    setEnteringIds(entering);
    setExitingIds(exiting);
    setRevealDelays(delays);

    const enterFrame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setEnteringIds(new Set()));
    });
    const revealTimer = window.setTimeout(() => setRevealDelays(new Map()), 1200);
    const exitTimer = window.setTimeout(() => {
      setDisplayedIds(new Set(visibleIds));
      setExitingIds(new Set());
    }, 680);

    previousVisibleIds.current = visibleIds;
    return () => {
      cancelAnimationFrame(enterFrame);
      window.clearTimeout(revealTimer);
      window.clearTimeout(exitTimer);
    };
  }, [visibleIds, visibleNodes]);

  const resolvedPalette = useMemo<MindMapPalette>(
    () => ({
      root: "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)",
      branchYunani: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
      branchRom: "linear-gradient(135deg, #FACC15 0%, #EAB308 100%)",
      branchMesopotamia: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
      branchMesir: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
      branchIndus: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
      branchHuangHe: "linear-gradient(135deg, #FACC15 0%, #EAB308 100%)",
      leafBg: "#0F172A",
      leafText: "#86efac",
      edgeStart: "#8B5CF6",
      edgeEnd: "#3B82F6",
      ...palette,
    }),
    [palette],
  );

  const toggle = useCallback((id: string) => {
    setSelectedId(id);
    pendingCamera.current = { id, mode: "toggle" };
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
    pendingCamera.current = { id: data.id, mode: "reset" };
    setSelectedId(data.id);
    setExpanded(s);
  }, [data]);

  const collapseAll = useCallback(() => {
    pendingCamera.current = { id: data.id, mode: "reset" };
    setSelectedId(data.id);
    setExpanded(new Set([data.id]));
  }, [data]);

  const stopInertia = useCallback(() => {
    if (inertiaFrame.current !== null) cancelAnimationFrame(inertiaFrame.current);
    inertiaFrame.current = null;
  }, []);

  useEffect(() => stopInertia, [stopInertia]);

  const stopCamera = useCallback(() => {
    if (cameraFrame.current !== null) cancelAnimationFrame(cameraFrame.current);
    cameraFrame.current = null;
  }, []);

  useEffect(() => stopCamera, [stopCamera]);

  useEffect(() => {
    cameraState.current = { tx, ty, scale };
  }, [scale, tx, ty]);

  const animateCamera = useCallback(
    (nextTx: number, nextTy: number, nextScale: number, duration = 780) => {
      if (!Number.isFinite(nextTx) || !Number.isFinite(nextTy) || !Number.isFinite(nextScale)) {
        return;
      }
      stopCamera();
      stopInertia();
      const start = cameraState.current;
      const startedAt = performance.now();
      const animate = (now: number) => {
        const progress = Math.min(1, Math.max(0, (now - startedAt) / duration));
        const eased = easeOutCubic(progress);
        const frameTx = start.tx + (nextTx - start.tx) * eased;
        const frameTy = start.ty + (nextTy - start.ty) * eased;
        const frameScale = start.scale + (nextScale - start.scale) * eased;
        cameraState.current = { tx: frameTx, ty: frameTy, scale: frameScale };
        setTx(frameTx);
        setTy(frameTy);
        setScale(frameScale);
        if (progress < 1) cameraFrame.current = requestAnimationFrame(animate);
        else cameraFrame.current = null;
      };
      cameraFrame.current = requestAnimationFrame(animate);
    },
    [stopCamera, stopInertia],
  );

  const moveCameraTo = useCallback(
    (mapX: number, mapY: number, nextScale = scale) => {
      const el = containerRef.current;
      if (!el) return;
      stopCamera();
      setScale(nextScale);
      setTx(el.clientWidth / 2 - mapX * nextScale);
      setTy(el.clientHeight / 2 - mapY * nextScale);
    },
    [scale, stopCamera],
  );

  const zoomAt = useCallback(
    (clientX: number, clientY: number, factor: number) => {
      const el = containerRef.current;
      if (!el) return;
      stopCamera();
      const rect = el.getBoundingClientRect();
      const mx = clientX - rect.left;
      const my = clientY - rect.top;
      setScale((currentScale) => {
        const nextScale = Math.min(2.5, Math.max(0.3, currentScale * factor));
        const ratio = nextScale / currentScale;
        setTx((currentTx) => mx - (mx - currentTx) * ratio);
        setTy((currentTy) => my - (my - currentTy) * ratio);
        return nextScale;
      });
    },
    [stopCamera],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    function onWheel(e: WheelEvent) {
      if (!el) return;
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const factor = Math.exp(-e.deltaY * 0.0015);
      zoomAt(rect.left + mx, rect.top + my, factor);
    }
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [zoomAt]);

  function onPointerDown(e: React.PointerEvent) {
    stopInertia();
    stopCamera();
    const target = e.target as HTMLElement;
    if (typeof target.setPointerCapture === "function") target.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 1) {
      panStart.current = { x: e.clientX, y: e.clientY, tx, ty };
      velocity.current = { x: 0, y: 0, time: performance.now() };
    } else if (pointers.current.size === 2) {
      const [a, b] = Array.from(pointers.current.values());
      const rect = containerRef.current?.getBoundingClientRect();
      const midX = (a.x + b.x) / 2 - (rect?.left ?? 0);
      const midY = (a.y + b.y) / 2 - (rect?.top ?? 0);
      pinchStart.current = {
        dist: Math.hypot(a.x - b.x, a.y - b.y),
        scale,
        mapX: (midX - tx) / scale,
        mapY: (midY - ty) / scale,
      };
      panStart.current = null;
    }
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 1 && panStart.current) {
      const nextTx = panStart.current.tx + (e.clientX - panStart.current.x);
      const nextTy = panStart.current.ty + (e.clientY - panStart.current.y);
      const now = performance.now();
      const elapsed = Math.max(1, now - velocity.current.time);
      velocity.current = {
        x: (nextTx - tx) / elapsed,
        y: (nextTy - ty) / elapsed,
        time: now,
      };
      setTx(nextTx);
      setTy(nextTy);
    } else if (pointers.current.size === 2 && pinchStart.current) {
      const [a, b] = Array.from(pointers.current.values());
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const ns = Math.min(
        2.5,
        Math.max(0.3, pinchStart.current.scale * (dist / pinchStart.current.dist)),
      );
      const rect = containerRef.current?.getBoundingClientRect();
      const midX = (a.x + b.x) / 2 - (rect?.left ?? 0);
      const midY = (a.y + b.y) / 2 - (rect?.top ?? 0);
      setScale(ns);
      setTx(midX - pinchStart.current.mapX * ns);
      setTy(midY - pinchStart.current.mapY * ns);
    }
  }

  function onPointerUp(e: React.PointerEvent) {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinchStart.current = null;
    if (pointers.current.size === 0) {
      panStart.current = null;
      const startVelocity = { ...velocity.current };
      const animate = () => {
        startVelocity.x *= 0.92;
        startVelocity.y *= 0.92;
        if (Math.abs(startVelocity.x) + Math.abs(startVelocity.y) < 0.02) {
          inertiaFrame.current = null;
          return;
        }
        setTx((value) => value + startVelocity.x * 16);
        setTy((value) => value + startVelocity.y * 16);
        inertiaFrame.current = requestAnimationFrame(animate);
      };
      inertiaFrame.current = requestAnimationFrame(animate);
    }
  }

  function nodeStyle(
    node: MindNode,
    depth: number,
    hasChildren: boolean,
    isExpanded: boolean,
    palette: MindMapPalette,
  ) {
    if (depth === 0)
      return {
        bg: palette.root,
        text: "#ffffff",
        border: "rgba(139,92,246,0.6)",
        glow: "0 0 28px rgba(139,92,246,0.55)",
      };
    if (depth === 1) {
      const label = node.label.toLowerCase();
      const isMesopotamia = label.includes("mesopotamia");
      const isMesir = label.includes("mesir");
      const isIndus = label.includes("indus");
      const isHuangHe = label.includes("huang he");
      const isRom = label.includes("rom");
      const bg = isMesopotamia
        ? palette.branchMesopotamia
        : isMesir
          ? palette.branchMesir
          : isIndus
            ? palette.branchIndus
            : isHuangHe
              ? palette.branchHuangHe
              : isRom
                ? palette.branchRom
                : palette.branchYunani;
      const text = isMesir ? "#081F3F" : isRom ? "#081F3F" : "#ffffff";
      const border = isMesir
        ? "rgba(16,185,129,0.7)"
        : isIndus
          ? "rgba(249,115,22,0.7)"
          : isHuangHe
            ? "rgba(250,204,21,0.7)"
            : isRom
              ? "rgba(250,204,21,0.7)"
              : "rgba(59,130,246,0.6)";
      const glow = isMesir
        ? "0 0 22px rgba(16,185,129,0.35)"
        : isIndus
          ? "0 0 22px rgba(249,115,22,0.35)"
          : isHuangHe
            ? "0 0 22px rgba(250,204,21,0.35)"
            : isRom
              ? "0 0 22px rgba(250,204,21,0.35)"
              : "0 0 22px rgba(59,130,246,0.5)";
      return {
        bg,
        text,
        border,
        glow,
      };
    }
    return {
      bg: palette.leafBg ?? "#0F172A",
      text: palette.leafText ?? "#86efac",
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

  const activeIds = useMemo(() => {
    if (!selectedId) return new Set<string>();
    const ids = new Set<string>([selectedId]);
    let parent = treeMaps.parents.get(selectedId);
    while (parent) {
      ids.add(parent);
      parent = treeMaps.parents.get(parent);
    }
    function addVisibleDescendants(id: string) {
      const entry = treeMaps.nodes.get(id);
      entry?.node.children?.forEach((child) => {
        if (!visibleIds.has(child.id)) return;
        ids.add(child.id);
        addVisibleDescendants(child.id);
      });
    }
    addVisibleDescendants(selectedId);
    return ids;
  }, [selectedId, treeMaps, visibleIds]);

  const displayedNodes = useMemo(
    () =>
      Array.from(displayedIds)
        .map((id) => treeMaps.nodes.get(id))
        .filter(Boolean) as { node: MindNode; depth: number }[],
    [displayedIds, treeMaps],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const cw = el.clientWidth || el.offsetWidth || 1000;
    const ch = el.clientHeight || el.offsetHeight || 600;
    if (!initialViewDone.current) {
      const fitScale = Math.min(0.9, (cw - 80) / Math.max(1, svgW), (ch - 80) / Math.max(1, svgH));
      const nextScale = Math.max(0.45, fitScale);
      setScale(nextScale);
      setTx(cw / 2 - ((minX + maxX) / 2) * nextScale);
      setTy(ch / 2 - ((minY + maxY) / 2) * nextScale);
      initialViewDone.current = true;
      return;
    }

    const request = pendingCamera.current;
    if (!request) return;
    pendingCamera.current = null;
    const branchIds = new Set<string>([request.id]);
    function addVisible(id: string) {
      const entry = treeMaps.nodes.get(id);
      entry?.node.children?.forEach((child) => {
        if (!visibleIds.has(child.id)) return;
        branchIds.add(child.id);
        addVisible(child.id);
      });
    }
    addVisible(request.id);
    const bounds =
      request.mode === "reset"
        ? { minX, maxX, minY, maxY }
        : boundsForIds(branchIds, layout.positions);
    if (bounds) {
      const padding = request.mode === "reset" ? 80 : 110;
      const width = bounds.maxX - bounds.minX;
      const height = bounds.maxY - bounds.minY;
      const currentScale = cameraState.current.scale;
      const fitScale = Math.min(
        1.4,
        (cw - padding * 2) / Math.max(1, width),
        (ch - padding * 2) / Math.max(1, height),
      );
      // Keep the user's zoom when possible. Zoom out only when the branch cannot fit.
      const nextScale =
        request.mode === "focus"
          ? Math.max(0.45, Math.min(1.4, Math.max(currentScale, Math.min(1.12, fitScale))))
          : Math.max(0.45, Math.min(currentScale, fitScale));
      const centerX = (bounds.minX + bounds.maxX) / 2;
      const centerY = (bounds.minY + bounds.maxY) / 2;
      const viewportTargetX = request.mode === "reset" ? cw / 2 : cw * 0.57;
      animateCamera(viewportTargetX - centerX * nextScale, ch / 2 - centerY * nextScale, nextScale);
    }
  }, [animateCamera, layout, maxX, maxY, minX, minY, svgH, svgW, treeMaps, visibleIds]);

  useEffect(() => {
    initialViewDone.current = false;
    setSelectedId(data.id);
    setExpanded(new Set([data.id]));
    setDisplayedIds(new Set([data.id]));
    previousVisibleIds.current = new Set([data.id]);
  }, [data]);

  const resetView = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    pendingCamera.current = null;
    const fitScale = Math.min(
      0.9,
      (el.clientWidth - 80) / Math.max(1, svgW),
      (el.clientHeight - 80) / Math.max(1, svgH),
    );
    const nextScale = Math.max(0.45, fitScale);
    setSelectedId(null);
    animateCamera(
      el.clientWidth / 2 - ((minX + maxX) / 2) * nextScale,
      el.clientHeight / 2 - ((minY + maxY) / 2) * nextScale,
      nextScale,
    );
  }, [animateCamera, maxX, maxY, minX, minY, svgH, svgW]);

  const zoomToNode = useCallback(
    (id: string) => {
      const el = containerRef.current;
      const p = layout.positions.get(id);
      if (!el || !p) return;
      pendingCamera.current = null;
      setSelectedId(id);
      const nextScale = Math.min(1.4, Math.max(1.05, cameraState.current.scale * 1.18));
      animateCamera(
        el.clientWidth * 0.54 - (p.x + p.w / 2) * nextScale,
        el.clientHeight / 2 - p.y * nextScale,
        nextScale,
        720,
      );
    },
    [animateCamera, layout.positions],
  );

  // Center the camera on a node without changing zoom or expand state.
  // Falls back to the main topic if the node can't be found (e.g. stale selection).
  const centerOnNode = useCallback(
    (id: string, duration = 620) => {
      const el = containerRef.current;
      const p = layout.positions.get(id);
      if (!el || !p) return false;
      pendingCamera.current = null;
      setSelectedId(id);
      const nextScale = cameraState.current.scale;
      animateCamera(
        el.clientWidth / 2 - (p.x + p.w / 2) * nextScale,
        el.clientHeight / 2 - p.y * nextScale,
        nextScale,
        duration,
      );
      return true;
    },
    [animateCamera, layout.positions],
  );

  const goToMainTopic = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    pendingCamera.current = null;
    setSelectedId(data.id);
    const branchIds = new Set<string>([data.id]);
    function addVisible(id: string) {
      const entry = treeMaps.nodes.get(id);
      entry?.node.children?.forEach((child) => {
        if (!visibleIds.has(child.id)) return;
        branchIds.add(child.id);
        addVisible(child.id);
      });
    }
    addVisible(data.id);
    const bounds = boundsForIds(branchIds, layout.positions);
    if (!bounds) return;
    const padding = 110;
    const width = bounds.maxX - bounds.minX;
    const height = bounds.maxY - bounds.minY;
    const currentScale = cameraState.current.scale;
    const fitScale = Math.min(
      1.4,
      (el.clientWidth - padding * 2) / Math.max(1, width),
      (el.clientHeight - padding * 2) / Math.max(1, height),
    );
    const nextScale = Math.max(0.45, Math.min(1.4, Math.max(currentScale, Math.min(1.12, fitScale))));
    const centerX = (bounds.minX + bounds.maxX) / 2;
    const centerY = (bounds.minY + bounds.maxY) / 2;
    animateCamera(
      el.clientWidth * 0.57 - centerX * nextScale,
      el.clientHeight / 2 - centerY * nextScale,
      nextScale,
    );
  }, [animateCamera, data.id, layout.positions, treeMaps, visibleIds]);

  // Center on the selected node at the current zoom; falls back to the main
  // topic so this control can never strand the student on a blank view.
  const centerSelected = useCallback(() => {
    if (selectedId && centerOnNode(selectedId)) return;
    goToMainTopic();
  }, [centerOnNode, goToMainTopic, selectedId]);

  const orderedVisibleIds = useMemo(
    () => visibleNodes.map(({ node }) => node.id),
    [visibleNodes],
  );

  const stepNode = useCallback(
    (direction: 1 | -1) => {
      if (!orderedVisibleIds.length) return;
      const currentIndex = selectedId ? orderedVisibleIds.indexOf(selectedId) : -1;
      const fallbackIndex = direction === 1 ? 0 : orderedVisibleIds.length - 1;
      const nextIndex =
        currentIndex === -1
          ? fallbackIndex
          : (currentIndex + direction + orderedVisibleIds.length) % orderedVisibleIds.length;
      const nextId = orderedVisibleIds[nextIndex];
      if (!centerOnNode(nextId, 520)) setSelectedId(nextId);
    },
    [centerOnNode, orderedVisibleIds, selectedId],
  );

  const breadcrumbTrail = useMemo(() => {
    if (!selectedId) return [];
    const chain: string[] = [selectedId];
    let parent = treeMaps.parents.get(selectedId);
    while (parent) {
      chain.unshift(parent);
      parent = treeMaps.parents.get(parent);
    }
    return chain
      .map((nodeId) => treeMaps.nodes.get(nodeId)?.node.label)
      .filter((label): label is string => !!label);
  }, [selectedId, treeMaps]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      resetView();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [resetView]);

  const minimapW = 180;
  const minimapH = 110;
  const minimapScale = Math.min(minimapW / Math.max(1, svgW), minimapH / Math.max(1, svgH));
  const viewport = containerRef.current
    ? {
        x: (-tx / scale - minX) * minimapScale,
        y: (-ty / scale - minY) * minimapScale,
        w: (containerRef.current.clientWidth / scale) * minimapScale,
        h: (containerRef.current.clientHeight / scale) * minimapScale,
      }
    : null;

  const canvasContent = (
    <div
      className="relative w-full glass-strong rounded-2xl border border-white/10"
      style={{
        width: "100%",
        height: mobileFullscreen ? "100%" : typeof height === "number" ? `${height}px` : height,
        minHeight: mobileFullscreen ? "100%" : 700,
        display: "block",
        position: "relative",
        overflow: "hidden",
        zIndex: 10,
      }}
    >
      {breadcrumbTrail.length > 0 && (
        <div className="absolute left-3 top-3 z-20 flex max-w-[64%] items-center gap-1.5 overflow-x-auto rounded-full border border-white/10 bg-slate-950/70 px-3 py-2 text-xs font-semibold text-white/70 backdrop-blur-md sm:max-w-[55%]">
          {breadcrumbTrail.map((label, index) => (
            <span key={`${label}-${index}`} className="flex items-center gap-1.5 whitespace-nowrap">
              {index > 0 && <ChevronRight className="h-3 w-3 shrink-0 text-white/30" />}
              <span
                className={
                  index === breadcrumbTrail.length - 1 ? "text-white" : "text-white/55"
                }
              >
                {label}
              </span>
            </span>
          ))}
        </div>
      )}
      <div className="absolute top-3 right-3 z-20 flex flex-wrap justify-end gap-2">
        <button
          onClick={() => stepNode(-1)}
          className="min-h-9 px-3 py-2 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 backdrop-blur inline-flex items-center gap-1.5 transition"
          title="Previous node"
          aria-label="Go to previous node"
        >
          <ChevronLeft className="w-3.5 h-3.5" /> Prev
        </button>
        <button
          onClick={() => stepNode(1)}
          className="min-h-9 px-3 py-2 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 backdrop-blur inline-flex items-center gap-1.5 transition"
          title="Next node"
          aria-label="Go to next node"
        >
          Next <ChevronRight className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={goToMainTopic}
          className="min-h-9 px-3 py-2 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 backdrop-blur inline-flex items-center gap-1.5 transition"
          title="Back to main topic"
        >
          <Home className="w-3.5 h-3.5" /> Main topic
        </button>
        <button
          onClick={expandAll}
          className="min-h-9 px-3 py-2 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 backdrop-blur inline-flex items-center gap-1.5 transition"
        >
          <ChevronsUpDown className="w-3.5 h-3.5" /> Expand all
        </button>
        <button
          onClick={collapseAll}
          className="min-h-9 px-3 py-2 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 backdrop-blur inline-flex items-center gap-1.5 transition"
        >
          <ChevronsDownUp className="w-3.5 h-3.5" /> Collapse all
        </button>
        <button
          onClick={resetView}
          className="min-h-9 px-3 py-2 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 backdrop-blur inline-flex items-center gap-1.5 transition"
        >
          <Maximize2 className="w-3.5 h-3.5" /> Reset
        </button>
        <button
          onClick={() => setShowMinimap((value) => !value)}
          className="min-h-9 px-3 py-2 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 backdrop-blur inline-flex items-center gap-1.5 transition"
        >
          <MapIcon className="w-3.5 h-3.5" /> Map
        </button>
        {isMobile && !mobileFullscreen && (
          <button
            onClick={() => setMobileFullscreen(true)}
            className="min-h-9 px-3 py-2 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 backdrop-blur inline-flex items-center gap-1.5 transition"
          >
            <Maximize2 className="w-3.5 h-3.5" /> Fullscreen
          </button>
        )}
      </div>
      <div className="absolute bottom-3 right-3 z-20 flex flex-col gap-2">
        <button
          onClick={() => {
            const el = containerRef.current;
            if (el)
              zoomAt(
                el.getBoundingClientRect().left + el.clientWidth / 2,
                el.getBoundingClientRect().top + el.clientHeight / 2,
                1.2,
              );
          }}
          className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur inline-flex items-center justify-center"
          title="Zoom in"
          aria-label="Zoom in"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            const el = containerRef.current;
            if (el)
              zoomAt(
                el.getBoundingClientRect().left + el.clientWidth / 2,
                el.getBoundingClientRect().top + el.clientHeight / 2,
                1 / 1.2,
              );
          }}
          className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur inline-flex items-center justify-center"
          title="Zoom out"
          aria-label="Zoom out"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          onClick={centerSelected}
          className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur inline-flex items-center justify-center"
          title="Center current node"
          aria-label="Center current node"
        >
          <Locate className="w-4 h-4" />
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
            transition: "none",
          }}
        >
          <svg
            width={svgW}
            height={svgH}
            style={{
              position: "absolute",
              left: minX,
              top: minY,
              overflow: "visible",
              pointerEvents: "none",
            }}
          >
            {displayedNodes.map(({ node }, i) => {
              const to = node.id;
              const from = treeMaps.parents.get(to);
              if (!from || !displayedIds.has(from)) return null;
              const a = layout.positions.get(from) ?? previousPositions.current.get(from);
              const target = layout.positions.get(to) ?? layout.positions.get(from);
              const b = target ?? previousPositions.current.get(to);
              if (!a || !b) return null;
              const x1 = a.x + a.w - minX;
              const y1 = a.y - minY;
              const x2 = b.x - minX;
              const y2 = b.y - minY;
              const midX = (x1 + x2) / 2;
              const d = `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;
              const revealDelay = revealDelays.get(to) ?? 0;
              const isEntering = revealDelays.has(to);
              const isExiting = exitingIds.has(to);
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
                    strokeDashoffset: isExiting ? 600 : 0,
                    animation: isEntering
                      ? `mm-draw 620ms cubic-bezier(0.22, 1, 0.36, 1) ${revealDelay}ms both`
                      : "none",
                    opacity: isExiting
                      ? 0
                      : activeIds.size && (!activeIds.has(from) || !activeIds.has(to))
                        ? 0.32
                        : 1,
                    transition:
                      "stroke-dashoffset 620ms cubic-bezier(0.22, 1, 0.36, 1), opacity 480ms ease",
                  }}
                />
              );
            })}
            <defs>
              <linearGradient id="mm-edge" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={resolvedPalette.edgeStart} stopOpacity="0.9" />
                <stop offset="100%" stopColor={resolvedPalette.edgeEnd} stopOpacity="0.7" />
              </linearGradient>
            </defs>
          </svg>

          {displayedNodes.map(({ node, depth }) => {
            const parentId = treeMaps.parents.get(node.id);
            const parentPos = parentId
              ? (layout.positions.get(parentId) ?? previousPositions.current.get(parentId))
              : undefined;
            const p = exitingIds.has(node.id)
              ? (parentPos ?? previousPositions.current.get(node.id))
              : enteringIds.has(node.id)
                ? (parentPos ?? layout.positions.get(node.id))
                : (layout.positions.get(node.id) ?? previousPositions.current.get(node.id));
            if (!p) return null;
            const hasChildren = !!node.children?.length;
            const isExpanded = expanded.has(node.id);
            const isSelected = selectedId === node.id;
            const isDimmed = !!selectedId && !activeIds.has(node.id);
            const isEntering = enteringIds.has(node.id);
            const isExiting = exitingIds.has(node.id);
            const revealDelay = revealDelays.get(node.id) ?? 0;
            const s = nodeStyle(node, depth, hasChildren, isExpanded, resolvedPalette);
            return (
              <button
                key={node.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedId(node.id);
                  if (hasChildren) toggle(node.id);
                }}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  zoomToNode(node.id);
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
                  boxShadow: isSelected ? `${s.glow}, 0 0 0 2px rgba(255,255,255,0.45)` : s.glow,
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
                  opacity: isEntering || isExiting ? 0 : isDimmed ? 0.45 : 1,
                  transform: isEntering || isExiting ? "scale(0.84)" : "scale(1)",
                  transitionDelay: `${revealDelay}ms`,
                  transition:
                    "left 540ms cubic-bezier(0.22, 1, 0.36, 1), top 540ms cubic-bezier(0.22, 1, 0.36, 1), opacity 460ms ease, transform 460ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.2s, filter 0.2s",
                  whiteSpace: "normal",
                  overflow: "visible",
                  wordBreak: "break-word",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.filter = "brightness(1.15)";
                  if (!isEntering && !isExiting)
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

      {showMinimap && (
        <button
          type="button"
          className="absolute bottom-3 left-3 z-20 rounded-xl border border-white/10 bg-slate-950/75 p-2 backdrop-blur-md shadow-xl"
          style={{ width: minimapW + 16, height: minimapH + 16 }}
          aria-label="Mindmap minimap navigation"
          onClick={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            const mapX = minX + (event.clientX - rect.left - 8) / minimapScale;
            const mapY = minY + (event.clientY - rect.top - 8) / minimapScale;
            moveCameraTo(mapX, mapY);
          }}
        >
          <svg width={minimapW} height={minimapH} className="block overflow-hidden rounded-lg">
            {layout.edges.map(({ from, to }) => {
              const a = layout.positions.get(from);
              const b = layout.positions.get(to);
              if (!a || !b) return null;
              return (
                <line
                  key={`mini-${from}-${to}`}
                  x1={(a.x + a.w - minX) * minimapScale}
                  y1={(a.y - minY) * minimapScale}
                  x2={(b.x - minX) * minimapScale}
                  y2={(b.y - minY) * minimapScale}
                  stroke={resolvedPalette.edgeEnd}
                  strokeOpacity="0.45"
                  strokeWidth="1"
                />
              );
            })}
            {visibleNodes.map(({ node }) => {
              const p = layout.positions.get(node.id);
              if (!p) return null;
              return (
                <rect
                  key={`mini-${node.id}`}
                  x={(p.x - minX) * minimapScale}
                  y={(p.y - p.h / 2 - minY) * minimapScale}
                  width={Math.max(2, p.w * minimapScale)}
                  height={Math.max(2, p.h * minimapScale)}
                  rx="1.5"
                  fill={node.id === data.id ? resolvedPalette.edgeStart : resolvedPalette.edgeEnd}
                  opacity={selectedId && !activeIds.has(node.id) ? 0.3 : 0.8}
                />
              );
            })}
            {viewport && (
              <rect
                x={viewport.x}
                y={viewport.y}
                width={viewport.w}
                height={viewport.h}
                fill="rgba(255,255,255,0.06)"
                stroke="rgba(255,255,255,0.8)"
                strokeWidth="1"
                rx="2"
              />
            )}
          </svg>
        </button>
      )}

      <style>{`
        @keyframes mm-draw { from { stroke-dashoffset: 600; opacity: 0; } to { stroke-dashoffset: 0; opacity: 1; } }
      `}</style>
    </div>
  );

  const isEmpty = data.id === EMPTY_MIND_NODE.id && !data.children?.length;
  if (isEmpty) {
    return (
      <div
        className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-slate-950/40 p-10 text-center text-sm text-white/60"
        style={{
          height: typeof height === "number" ? `${height}px` : height,
          minHeight: 240,
        }}
      >
        <MapIcon className="h-6 w-6 text-white/30" />
        Mind map content isn't available for this chapter yet.
      </div>
    );
  }

  if (mobileFullscreen) {
    return (
      <div className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-md flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <span className="text-sm font-semibold text-white">Interactive Mindmap</span>
          <button
            type="button"
            onClick={() => setMobileFullscreen(false)}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 inline-flex items-center justify-center text-white"
            aria-label="Close interactive mindmap"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 min-h-0 p-2">{canvasContent}</div>
      </div>
    );
  }

  return canvasContent;
}
