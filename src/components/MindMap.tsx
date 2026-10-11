import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type UIEvent,
} from "react";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ChevronsDownUp,
  ChevronsUpDown,
  Crosshair,
  Map as MapIcon,
  Maximize,
  Minus,
  Plus,
  X,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  COMPACT_SCALE,
  CameraController,
  DESKTOP_SCALE,
  easeOutCubic,
  fitCamera,
  followCamera,
  prefersReducedMotion,
  safeArea,
  zoomAt,
  type Camera,
  type Viewport,
} from "@/components/mindmap/camera";
import {
  COMPACT_BREAKPOINT,
  calculateMindMapLayout,
  connectorPath,
  estimateAllNodeSizes,
  getMindMapMetrics,
  rectOf,
  unionRects,
  type MindMapPosition,
  type NodeSize,
} from "@/components/mindmap/layout";
import {
  EMPTY_MIND_NODE,
  ancestorIds,
  buildTreeIndex,
  getExpandableMindNodeIds,
  getVisibleMindNodes,
  normalizeMindNode,
  primaryBranchId,
  revealPath,
  subtreeIds,
  type MindNode,
} from "@/components/mindmap/tree";
import { MIND_MAP_CSS, MindMapNodeCard } from "@/components/mindmap/MindMapNodeCard";
import { MindMapMinimap } from "@/components/mindmap/MindMapMinimap";
import { MindMapOutline } from "@/components/mindmap/MindMapOutline";
import { MindMapReader } from "@/components/mindmap/MindMapReader";
import {
  MindMapTopBar,
  type MindMapHeader,
  type MindMapMode,
  type MindMapView,
} from "@/components/mindmap/MindMapTopBar";
import { MIND_MAP_STRINGS, branchColor, type MindMapLocale } from "@/components/mindmap/theme";

export type { MindNode } from "@/components/mindmap/tree";
export type { MindMapLayoutResult, MindMapPosition } from "@/components/mindmap/layout";
export type { MindMapHeader } from "@/components/mindmap/MindMapTopBar";
export { calculateMindMapLayout, getExpandableMindNodeIds, getVisibleMindNodes };

/**
 * Subject theming from the page. Only the subject accent (`edgeStart`, or
 * `accentBorder`) is used now; the branch-specific fields are kept so
 * existing callers stay compatible.
 */
export type MindMapPalette = {
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
  accentBorder?: string;
  accentGlow?: string;
};

type NodeState = { x: number; y: number; w: number; h: number; o: number };

type FollowRequest =
  | { kind: "node"; id: string }
  | { kind: "collapse"; id: string }
  | { kind: "branch"; id: string }
  | { kind: "overview" };

const LAYOUT_TWEEN_MS = 420;
const DRAG_THRESHOLD = 6;
/** Pan inertia: velocity window, speed cap (px/ms) and per-16ms decay. */
const GLIDE_WINDOW_MS = 80;
const GLIDE_MAX_SPEED = 2.5;
const GLIDE_DECAY = 0.9;
const EMPTY_SET: ReadonlySet<string> = new Set();

function readCanvasViewport(
  canvas: HTMLElement | null,
  overlays: Array<{ el: HTMLElement | null; side: "bottom" | "right" | "top" }>,
): Viewport | null {
  if (!canvas || !canvas.clientWidth || !canvas.clientHeight) return null;
  const box = canvas.getBoundingClientRect();
  const insets = { top: 0, right: 0, bottom: 0, left: 0 };
  overlays.forEach(({ el, side }) => {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    if (side === "bottom") insets.bottom = Math.max(insets.bottom, box.bottom - rect.top);
    if (side === "right") insets.right = Math.max(insets.right, box.right - rect.left);
    if (side === "top") insets.top = Math.max(insets.top, rect.bottom - box.top);
  });
  return { w: canvas.clientWidth, h: canvas.clientHeight, insets };
}

/** Capture can throw if the pointer was already released; panning still works without it. */
function capturePointer(el: Element, pointerId: number) {
  try {
    el.setPointerCapture?.(pointerId);
  } catch {
    // ignore
  }
}

/**
 * Browsers scroll an overflow:hidden box to reveal a focused card, which
 * shifts the whole stage. `overflow: clip` prevents that; this undoes it
 * where clip is unsupported (Safari < 16).
 */
function undoContainerScroll(event: UIEvent<HTMLDivElement>) {
  const el = event.currentTarget;
  if (event.target !== el) return;
  if (el.scrollLeft || el.scrollTop) {
    el.scrollLeft = 0;
    el.scrollTop = 0;
  }
}

function sameSize(a: NodeSize | undefined, h: number) {
  return !!a && Math.abs(a.h - h) < 1;
}

export function MindMap({
  data: inputData,
  height = "85dvh",
  palette,
  mobileLayout = "canvas",
  locale = "en",
  header,
}: {
  data?: MindNode;
  height?: number | string;
  palette?: MindMapPalette;
  /** "learning-path" starts phones in the Outline view. */
  mobileLayout?: "canvas" | "learning-path";
  locale?: MindMapLocale;
  /** Fullscreen top bar (Back, subject, form, chapter). */
  header?: MindMapHeader;
}) {
  const data = useMemo(() => normalizeMindNode(inputData), [inputData]);
  const strings = MIND_MAP_STRINGS[locale];
  const isMobile = useIsMobile();
  const index = useMemo(() => buildTreeIndex(data), [data]);
  const subjectAccent = palette?.edgeStart ?? palette?.edgeEnd ?? "#A78BFA";

  const [expanded, setExpanded] = useState<Set<string>>(() => new Set([data.id]));
  const [selectedId, setSelectedId] = useState<string>(data.id);
  const [mode, setMode] = useState<MindMapMode>("explore");
  const [view, setView] = useState<MindMapView>(() =>
    isMobile && mobileLayout === "learning-path" ? "outline" : "map",
  );
  const [mapMounted, setMapMounted] = useState(view === "map");
  const [readerOpen, setReaderOpen] = useState(false);
  const [showMinimap, setShowMinimap] = useState(false);
  const [viewport, setViewport] = useState({ w: 0, h: 0 });
  const [measured, setMeasured] = useState<{ key: string; sizes: Map<string, NodeSize> }>({
    key: "",
    sizes: new Map(),
  });
  const [fontsVersion, setFontsVersion] = useState(0);
  const [exitingIds, setExitingIds] = useState<ReadonlySet<string>>(EMPTY_SET);

  const compact = viewport.w > 0 ? viewport.w < COMPACT_BREAKPOINT : isMobile;
  const metrics = getMindMapMetrics(compact);
  const policy = compact ? COMPACT_SCALE : DESKTOP_SCALE;
  const measureKey = `${data.id}:${compact ? "c" : "d"}:${fontsVersion}`;

  const canvasRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const readerRef = useRef<HTMLDivElement>(null);
  const focusChipRef = useRef<HTMLDivElement>(null);
  const nodeEls = useRef(new Map<string, HTMLDivElement>());
  const edgeEls = useRef(new Map<string, SVGPathElement>());
  const display = useRef(new Map<string, NodeState>());
  const tweenFrame = useRef<number | null>(null);
  const pendingFollow = useRef<FollowRequest | null>(null);
  const lastFollow = useRef<{ request: FollowRequest; at: number } | null>(null);
  const initialFramed = useRef(false);
  const focusRequest = useRef<string | null>(null);
  const cameraRef = useRef<CameraController | null>(null);
  if (!cameraRef.current) cameraRef.current = new CameraController();
  const camera = cameraRef.current;

  // ── Derived tree state ───────────────────────────────────────────────
  const visibleNodes = useMemo(() => getVisibleMindNodes(data, expanded), [data, expanded]);
  const visibleSet = useMemo(
    () => new Set(visibleNodes.map(({ node }) => node.id)),
    [visibleNodes],
  );

  // Nodes leaving the map stay mounted until they have animated into their
  // parent. Derived during render so they never unmount for a frame.
  const [visibleSnapshot, setVisibleSnapshot] = useState(visibleSet);
  if (visibleSnapshot !== visibleSet) {
    const leaving = new Set<string>();
    visibleSnapshot.forEach((id) => {
      if (!visibleSet.has(id) && index.entries.has(id)) leaving.add(id);
    });
    exitingIds.forEach((id) => {
      if (!visibleSet.has(id) && index.entries.has(id)) leaving.add(id);
    });
    setVisibleSnapshot(visibleSet);
    setExitingIds(leaving.size ? leaving : EMPTY_SET);
  }

  const estimates = useMemo(
    () => estimateAllNodeSizes(data, metrics),
    // fontsVersion: re-estimate once web fonts are available.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, metrics, fontsVersion],
  );
  const sizes = useMemo(() => {
    if (measured.key !== measureKey || !measured.sizes.size) return estimates;
    const merged = new Map(estimates);
    measured.sizes.forEach((size, id) => merged.set(id, size));
    return merged;
  }, [estimates, measured, measureKey]);

  const layout = useMemo(
    () => calculateMindMapLayout(data, expanded, sizes, metrics),
    [data, expanded, sizes, metrics],
  );

  const ancestorsOfSelected = useMemo(
    () => new Set(ancestorIds(index, selectedId)),
    [index, selectedId],
  );

  const focusActiveIds = useMemo(() => {
    if (mode !== "focus") return null;
    const branchId = primaryBranchId(index, selectedId);
    if (!branchId) return null;
    const branch = index.entries.get(branchId)?.node;
    if (!branch) return null;
    const ids = subtreeIds(branch);
    ancestorIds(index, branchId).forEach((id) => ids.add(id));
    return ids;
  }, [index, mode, selectedId]);

  const selectedEntry = index.entries.get(selectedId) ?? index.entries.get(data.id)!;
  const focusBranch = focusActiveIds
    ? index.entries.get(primaryBranchId(index, selectedId) ?? "")?.node
    : undefined;

  // Latest state for stable callbacks.
  const live = useRef({ expanded, selectedId, layout, index, policy, compact, mode });
  live.current = { expanded, selectedId, layout, index, policy, compact, mode };

  // ── Reset when the chapter changes ───────────────────────────────────
  const [dataSnapshot, setDataSnapshot] = useState(data);
  if (dataSnapshot !== data) {
    setDataSnapshot(data);
    setExpanded(new Set([data.id]));
    setSelectedId(data.id);
    setExitingIds(EMPTY_SET);
    setReaderOpen(false);
    setMode("explore");
  }
  useLayoutEffect(() => {
    display.current = new Map();
    initialFramed.current = false;
    pendingFollow.current = null;
    lastFollow.current = null;
  }, [data]);

  // ── Camera plumbing ──────────────────────────────────────────────────
  useLayoutEffect(() => {
    camera.onApply = (cam) => {
      const grid = gridRef.current;
      if (grid) grid.style.backgroundPosition = `${cam.x}px ${cam.y}px`;
    };
    camera.attach(worldRef.current);
    return () => camera.attach(null);
  }, [camera, mapMounted]);

  useEffect(() => () => camera.dispose(), [camera]);

  const getViewport = useCallback(
    () =>
      readCanvasViewport(canvasRef.current, [
        { el: dockRef.current, side: "bottom" },
        { el: readerRef.current, side: live.current.compact ? "bottom" : "right" },
        { el: railRef.current, side: "right" },
        { el: focusChipRef.current, side: "top" },
      ]),
    [],
  );

  const requestFollow = useCallback((request: FollowRequest) => {
    pendingFollow.current = request;
  }, []);

  const computeFollow = useCallback(
    (request: FollowRequest, from: Camera): Camera | null => {
      const vp = getViewport();
      if (!vp) return null;
      const { layout: current, index: tree, policy: scale, expanded: open } = live.current;
      const positions = current.positions;
      const rect = (id: string | null | undefined) => {
        const p = id ? positions.get(id) : undefined;
        return p ? rectOf(p) : null;
      };
      const childRects = (id: string) =>
        open.has(id)
          ? (tree.entries.get(id)?.node.children ?? []).map((child) => rect(child.id))
          : [];

      if (request.kind === "overview") {
        const root = rect(tree.rootId);
        if (!root) return null;
        const branches = unionRects(childRects(tree.rootId));
        const focus = unionRects([root, branches]) ?? root;
        const s = scale.read;
        const base: Camera = {
          s,
          x: vp.w / 2 - ((focus.minX + focus.maxX) / 2) * s,
          y: vp.h / 2 - ((focus.minY + focus.maxY) / 2) * s,
        };
        // On a phone the main topic and its branches rarely fit side by side
        // at a readable size. The chapter title is already in the top bar, so
        // keep the branch titles whole and let the main topic peek in.
        const anchor =
          live.current.compact && branches
            ? { minX: branches.minX, maxX: branches.maxX, minY: root.minY, maxY: root.maxY }
            : root;
        return followCamera({ cam: base, vp, anchor, focus, policy: scale });
      }

      const anchor = rect(request.id);
      if (!anchor) return null;
      const parent = rect(tree.entries.get(request.id)?.parentId);
      if (request.kind === "collapse") {
        return followCamera({
          cam: from,
          vp,
          anchor,
          focus: anchor,
          context: parent,
          policy: scale,
        });
      }
      if (request.kind === "branch") {
        // Frame the whole focused branch when it fits at a readable scale;
        // otherwise follow the selected topic as usual.
        const branchId = primaryBranchId(tree, request.id);
        const branch = branchId ? tree.entries.get(branchId)?.node : undefined;
        const whole = branch
          ? unionRects(Array.from(subtreeIds(branch)).map((id) => rect(id)))
          : null;
        const safe = safeArea(vp, 28);
        const fits =
          !!whole &&
          Math.min(
            safe.width / Math.max(1, whole.maxX - whole.minX),
            safe.height / Math.max(1, whole.maxY - whole.minY),
          ) >= scale.minRead;
        const focus =
          fits && whole ? whole : (unionRects([anchor, ...childRects(request.id)]) ?? anchor);
        return followCamera({ cam: from, vp, anchor, focus, context: parent, policy: scale });
      }
      const focus = unionRects([anchor, ...childRects(request.id)]) ?? anchor;
      return followCamera({ cam: from, vp, anchor, focus, context: parent, policy: scale });
    },
    [getViewport],
  );

  // ── Viewport size ────────────────────────────────────────────────────
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setViewport({ w: canvas.clientWidth, h: canvas.clientHeight });
    if (typeof ResizeObserver === "undefined") return;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let first = true;
    const observer = new ResizeObserver(() => {
      if (first) {
        first = false;
        return;
      }
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      setViewport((current) => (current.w === w && current.h === h ? current : { w, h }));
      // After a rotation or resize, bring the selected topic back into view.
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        if (!initialFramed.current) return;
        pendingFollow.current = { kind: "node", id: live.current.selectedId };
        setViewport((current) => ({ ...current }));
      }, 160);
    });
    observer.observe(canvas);
    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [mapMounted]);

  useEffect(() => {
    if (typeof document === "undefined" || !document.fonts?.ready) return;
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) setFontsVersion((value) => value + 1);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // ── Measure real card heights ────────────────────────────────────────
  const renderedEntries = useMemo(() => {
    const leaving = Array.from(exitingIds)
      .map((id) => index.entries.get(id))
      .filter((entry): entry is NonNullable<typeof entry> => !!entry);
    const showing = visibleNodes
      .map(({ node }) => index.entries.get(node.id))
      .filter((entry): entry is NonNullable<typeof entry> => !!entry);
    // Leaving cards are drawn first so their parent covers them.
    return [...leaving, ...showing];
  }, [exitingIds, index, visibleNodes]);

  useLayoutEffect(() => {
    if (!mapMounted) return;
    const updates: Array<[string, NodeSize]> = [];
    visibleSet.forEach((id) => {
      const card = nodeEls.current.get(id)?.firstElementChild as HTMLElement | null;
      const estimate = estimates.get(id);
      if (!card || !estimate) return;
      const h = card.offsetHeight;
      if (!h) return;
      const known = measured.key === measureKey ? measured.sizes.get(id) : undefined;
      if (sameSize(known ?? estimate, h)) return;
      updates.push([id, { w: estimate.w, h }]);
    });
    if (!updates.length) return;
    setMeasured((current) => {
      const sizes =
        current.key === measureKey ? new Map(current.sizes) : new Map<string, NodeSize>();
      updates.forEach(([id, size]) => sizes.set(id, size));
      return { key: measureKey, sizes };
    });
  }, [estimates, mapMounted, measureKey, measured, visibleSet]);

  // ── Animate cards and connectors to the new layout ───────────────────
  useLayoutEffect(() => {
    if (!mapMounted) return;
    if (tweenFrame.current !== null) cancelAnimationFrame(tweenFrame.current);
    tweenFrame.current = null;

    const positions = layout.positions;
    const nearestShown = (id: string): MindMapPosition | undefined => {
      let parent = index.entries.get(id)?.parentId ?? null;
      while (parent) {
        const p = positions.get(parent);
        if (p) return p;
        parent = index.entries.get(parent)?.parentId ?? null;
      }
      return undefined;
    };
    const currentParent = (id: string): NodeState | undefined => {
      let parent = index.entries.get(id)?.parentId ?? null;
      while (parent) {
        const state = display.current.get(parent);
        if (state) return state;
        parent = index.entries.get(parent)?.parentId ?? null;
      }
      return undefined;
    };

    const fresh = display.current.size === 0;
    const starts = new Map<string, NodeState>();
    const targets = new Map<string, NodeState>();
    const delays = new Map<string, number>();
    let enterRank = 0;

    renderedEntries.forEach(({ node }) => {
      const id = node.id;
      const size = sizes.get(id) ?? { w: 220, h: 56 };
      const target = positions.get(id);
      let goal: NodeState;
      if (target) {
        goal = { ...target, o: 1 };
      } else {
        const parent = nearestShown(id);
        goal = parent
          ? { x: parent.x, y: parent.y, w: size.w, h: size.h, o: 0 }
          : { x: 0, y: 0, w: size.w, h: size.h, o: 0 };
      }
      targets.set(id, goal);
      const known = display.current.get(id);
      if (known) {
        starts.set(id, { ...known, w: goal.w, h: goal.h });
      } else if (fresh) {
        starts.set(id, goal);
      } else {
        const parent = currentParent(id);
        starts.set(
          id,
          parent ? { x: parent.x, y: parent.y, w: goal.w, h: goal.h, o: 0 } : { ...goal, o: 0 },
        );
        delays.set(id, Math.min(enterRank * 24, 200));
        enterRank += 1;
      }
    });

    // Forget nodes that are no longer rendered.
    Array.from(display.current.keys()).forEach((id) => {
      if (!targets.has(id)) display.current.delete(id);
    });

    const write = (states: Map<string, NodeState>, ids: Iterable<string>) => {
      for (const id of ids) {
        const state = states.get(id);
        const el = nodeEls.current.get(id);
        if (state && el) {
          el.style.transform = `translate3d(${state.x}px, ${state.y - state.h / 2}px, 0)`;
          el.style.opacity = String(state.o);
          el.style.visibility = state.o < 0.02 ? "hidden" : "visible";
        }
      }
    };
    const writeEdges = (states: Map<string, NodeState>, ids: Iterable<string>) => {
      for (const id of ids) {
        const path = edgeEls.current.get(id);
        const parentId = index.entries.get(id)?.parentId;
        const child = states.get(id);
        const parent = parentId ? states.get(parentId) : undefined;
        if (!path || !child || !parent) continue;
        path.setAttribute("d", connectorPath(parent, child));
        path.style.opacity = String(child.o);
      }
    };

    const moving = new Set<string>();
    targets.forEach((goal, id) => {
      const start = starts.get(id)!;
      if (
        Math.abs(start.x - goal.x) > 0.5 ||
        Math.abs(start.y - goal.y) > 0.5 ||
        Math.abs(start.o - goal.o) > 0.01
      ) {
        moving.add(id);
      }
    });
    const edgeIds = new Set<string>();
    targets.forEach((_, id) => {
      const parentId = index.entries.get(id)?.parentId;
      if (moving.has(id) || (parentId && moving.has(parentId))) edgeIds.add(id);
    });

    const allIds = Array.from(targets.keys());
    const finish = () => {
      targets.forEach((goal, id) => display.current.set(id, goal));
      write(targets, allIds);
      writeEdges(targets, allIds);
      tweenFrame.current = null;
      // Leaving cards have reached their parent; unmount them.
      setExitingIds((current) => (current.size ? EMPTY_SET : current));
    };

    // Everything static still needs its first paint position.
    starts.forEach((state, id) => display.current.set(id, state));
    write(starts, allIds);
    writeEdges(starts, allIds);

    if (!moving.size) {
      finish();
      return;
    }
    if (prefersReducedMotion()) {
      finish();
      return;
    }

    const startedAt = performance.now();
    const maxDelay = Math.max(0, ...delays.values());
    const frame = (now: number) => {
      const elapsed = now - startedAt;
      const states = new Map<string, NodeState>();
      moving.forEach((id) => {
        const start = starts.get(id)!;
        const goal = targets.get(id)!;
        const local = Math.min(1, Math.max(0, (elapsed - (delays.get(id) ?? 0)) / LAYOUT_TWEEN_MS));
        const t = easeOutCubic(local);
        const state = {
          x: start.x + (goal.x - start.x) * t,
          y: start.y + (goal.y - start.y) * t,
          w: goal.w,
          h: goal.h,
          // Leaving cards fade quickly; arriving cards fade in over the move.
          o: start.o + (goal.o - start.o) * (goal.o < start.o ? Math.min(1, t * 1.8) : t),
        };
        states.set(id, state);
        display.current.set(id, state);
      });
      write(states, moving);
      edgeIds.forEach((id) => {
        if (!states.has(id)) states.set(id, display.current.get(id)!);
        const parentId = index.entries.get(id)?.parentId;
        if (parentId && !states.has(parentId)) {
          const parent = display.current.get(parentId);
          if (parent) states.set(parentId, parent);
        }
      });
      writeEdges(states, edgeIds);
      if (elapsed < LAYOUT_TWEEN_MS + maxDelay) {
        tweenFrame.current = requestAnimationFrame(frame);
      } else {
        finish();
      }
    };
    tweenFrame.current = requestAnimationFrame(frame);
  }, [index, layout, mapMounted, renderedEntries, sizes]);

  useEffect(
    () => () => {
      if (tweenFrame.current !== null) cancelAnimationFrame(tweenFrame.current);
    },
    [],
  );

  // ── Camera follow after layout ───────────────────────────────────────
  useLayoutEffect(() => {
    if (!mapMounted || view !== "map" || !viewport.w) return;
    if (!initialFramed.current) {
      const target = computeFollow(
        selectedId === data.id ? { kind: "overview" } : { kind: "node", id: selectedId },
        camera.cam.s ? camera.cam : { x: 0, y: 0, s: policy.read },
      );
      if (target) {
        camera.set(target);
        initialFramed.current = true;
      }
      pendingFollow.current = null;
      return;
    }
    const request = pendingFollow.current;
    if (request) {
      pendingFollow.current = null;
      const target = computeFollow(request, camera.cam);
      if (target) camera.animateTo(target);
      lastFollow.current = { request, at: performance.now() };
      return;
    }
    // Real card heights can arrive just after an action; refine that move.
    const recent = lastFollow.current;
    if (recent && performance.now() - recent.at < 900) {
      const target = computeFollow(recent.request, camera.cam);
      if (target) camera.animateTo(target);
    }
  }, [
    camera,
    computeFollow,
    data.id,
    layout,
    mapMounted,
    policy.read,
    readerOpen,
    selectedId,
    view,
    viewport,
  ]);

  // Keyboard navigation moves DOM focus with the selection.
  useEffect(() => {
    const id = focusRequest.current;
    if (!id) return;
    focusRequest.current = null;
    const card = nodeEls.current.get(id)?.firstElementChild as HTMLElement | null;
    card?.focus({ preventScroll: true });
  });

  // ── Actions ──────────────────────────────────────────────────────────
  /** In Focus mode, moving to another primary branch frames that branch. */
  const followKindFor = useCallback((id: string): "node" | "branch" => {
    const { index: tree, selectedId: current, mode: currentMode } = live.current;
    if (currentMode !== "focus") return "node";
    return primaryBranchId(tree, id) !== primaryBranchId(tree, current) ? "branch" : "node";
  }, []);

  const selectNode = useCallback(
    (id: string, options: { keyboard?: boolean } = {}) => {
      const { index: tree, expanded: open } = live.current;
      if (!tree.entries.has(id)) return;
      const next = revealPath(tree, open, id);
      if (next.size !== open.size) setExpanded(next);
      requestFollow({ kind: followKindFor(id), id });
      setSelectedId(id);
      if (options.keyboard) focusRequest.current = id;
    },
    [followKindFor, requestFollow],
  );

  const dragMoved = useRef(false);

  const activate = useCallback(
    (id: string) => {
      if (dragMoved.current) return;
      const { index: tree, expanded: open, selectedId: current } = live.current;
      const entry = tree.entries.get(id);
      if (!entry) return;
      const followKind = followKindFor(id);
      if (!entry.node.children?.length) {
        setSelectedId(id);
        requestFollow({ kind: followKind, id });
        return;
      }
      const isOpen = open.has(id);
      if (isOpen && current !== id) {
        // First tap on an open topic selects it; the next tap closes it.
        setSelectedId(id);
        requestFollow({ kind: followKind, id });
        return;
      }
      const next = new Set(open);
      if (isOpen) {
        next.delete(id);
        requestFollow({ kind: "collapse", id });
      } else {
        next.add(id);
        requestFollow({ kind: followKind, id });
      }
      setExpanded(next);
      setSelectedId(id);
    },
    [followKindFor, requestFollow],
  );

  const openReader = useCallback(
    (id: string) => {
      if (dragMoved.current) return;
      setSelectedId(id);
      setReaderOpen(true);
      requestFollow({ kind: "node", id });
    },
    [requestFollow],
  );

  const step = useCallback(
    (direction: 1 | -1) => {
      const { index: tree, selectedId: current } = live.current;
      const position = tree.entries.get(current)?.order ?? 0;
      const target = tree.order[position + direction];
      if (target) selectNode(target);
    },
    [selectNode],
  );

  const expandAll = useCallback(() => {
    setExpanded(getExpandableMindNodeIds(data));
    requestFollow({ kind: "node", id: live.current.selectedId });
  }, [data, requestFollow]);

  const collapseAll = useCallback(() => {
    setExpanded(new Set([data.id]));
    setSelectedId(data.id);
    requestFollow({ kind: "overview" });
  }, [data.id, requestFollow]);

  const fitView = useCallback(() => {
    const vp = getViewport();
    if (!vp) return;
    lastFollow.current = null;
    camera.animateTo(fitCamera(live.current.layout.bounds, vp, live.current.policy, 1));
  }, [camera, getViewport]);

  const resetView = useCallback(() => {
    setSelectedId(data.id);
    setMode("explore");
    requestFollow({ kind: "overview" });
    // Selection may not change, so make sure the follow effect runs.
    setViewport((current) => ({ ...current }));
  }, [data.id, requestFollow]);

  const zoomBy = useCallback(
    (factor: number) => {
      const vp = getViewport();
      if (!vp) return;
      lastFollow.current = null;
      const cx = vp.insets.left + (vp.w - vp.insets.left - vp.insets.right) / 2;
      const cy = vp.insets.top + (vp.h - vp.insets.top - vp.insets.bottom) / 2;
      camera.animateTo(zoomAt(camera.cam, cx, cy, factor, live.current.policy), 240);
    },
    [camera, getViewport],
  );

  const changeMode = useCallback(
    (next: MindMapMode) => {
      setMode(next);
      if (next === "focus") requestFollow({ kind: "branch", id: live.current.selectedId });
      setViewport((current) => ({ ...current }));
    },
    [requestFollow],
  );

  const changeView = useCallback(
    (next: MindMapView) => {
      setView(next);
      if (next === "map") {
        setMapMounted(true);
        requestFollow({ kind: "node", id: live.current.selectedId });
      }
    },
    [requestFollow],
  );

  const closeReader = useCallback(() => {
    setReaderOpen(false);
    requestFollow({ kind: "node", id: live.current.selectedId });
  }, [requestFollow]);

  const toggleFromOutline = useCallback((id: string) => {
    const entry = live.current.index.entries.get(id);
    setSelectedId(id);
    if (!entry?.node.children?.length) return;
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  // ── Pointer, touch and wheel input ───────────────────────────────────
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef<{
    kind: "pan" | "pinch";
    x: number;
    y: number;
    cam: Camera;
    dist?: number;
    worldX?: number;
    worldY?: number;
  } | null>(null);
  const panSamples = useRef<Array<{ x: number; y: number; t: number }>>([]);
  const inertiaFrame = useRef<number | null>(null);

  const stopInertia = () => {
    if (inertiaFrame.current !== null) cancelAnimationFrame(inertiaFrame.current);
    inertiaFrame.current = null;
  };

  const beginGesture = (canvas: HTMLElement) => {
    const rect = canvas.getBoundingClientRect();
    const points = Array.from(pointers.current.values());
    if (points.length >= 2) {
      const [a, b] = points;
      const mx = (a.x + b.x) / 2 - rect.left;
      const my = (a.y + b.y) / 2 - rect.top;
      const cam = camera.cam;
      gesture.current = {
        kind: "pinch",
        x: mx,
        y: my,
        cam,
        dist: Math.max(1, Math.hypot(a.x - b.x, a.y - b.y)),
        worldX: (mx - cam.x) / cam.s,
        worldY: (my - cam.y) / cam.s,
      };
    } else if (points.length === 1) {
      gesture.current = { kind: "pan", x: points[0].x, y: points[0].y, cam: camera.cam };
    } else {
      gesture.current = null;
    }
  };

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    camera.stop();
    stopInertia();
    lastFollow.current = null;
    dragMoved.current = false;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.current.size >= 2) {
      dragMoved.current = true;
      capturePointer(event.currentTarget, event.pointerId);
    }
    beginGesture(event.currentTarget);
    panSamples.current = [];
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!pointers.current.has(event.pointerId)) return;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    const current = gesture.current;
    if (!current) return;
    if (current.kind === "pan") {
      const dx = event.clientX - current.x;
      const dy = event.clientY - current.y;
      if (!dragMoved.current) {
        if (Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
        dragMoved.current = true;
        // Capturing makes the eventual click land on the canvas, not a card.
        capturePointer(event.currentTarget, event.pointerId);
      }
      const next = { s: current.cam.s, x: current.cam.x + dx, y: current.cam.y + dy };
      const now = performance.now();
      panSamples.current.push({ x: next.x, y: next.y, t: now });
      while (panSamples.current.length > 2 && now - panSamples.current[0].t > GLIDE_WINDOW_MS) {
        panSamples.current.shift();
      }
      camera.set(next);
      return;
    }
    const points = Array.from(pointers.current.values());
    if (points.length < 2) return;
    const [a, b] = points;
    const rect = event.currentTarget.getBoundingClientRect();
    const dist = Math.max(1, Math.hypot(a.x - b.x, a.y - b.y));
    const { min, max } = live.current.policy;
    const s = Math.min(max, Math.max(min, current.cam.s * (dist / (current.dist ?? dist))));
    const mx = (a.x + b.x) / 2 - rect.left;
    const my = (a.y + b.y) / 2 - rect.top;
    camera.set({ s, x: mx - (current.worldX ?? 0) * s, y: my - (current.worldY ?? 0) * s });
  }

  function onPointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    if (!pointers.current.has(event.pointerId)) return;
    pointers.current.delete(event.pointerId);
    const wasPan = gesture.current?.kind === "pan";
    if (pointers.current.size > 0) {
      // Lifting one finger of a pinch continues as a pan without a jump.
      beginGesture(event.currentTarget);
      return;
    }
    gesture.current = null;
    if (dragMoved.current) {
      setTimeout(() => {
        dragMoved.current = false;
      }, 0);
    }
    // Velocity over the last few samples, so event rate does not matter.
    const samples = panSamples.current;
    const now = performance.now();
    const first = samples[0];
    const latest = samples[samples.length - 1];
    if (!wasPan || !dragMoved.current || !first || !latest || prefersReducedMotion()) return;
    const span = latest.t - first.t;
    if (now - latest.t > 60 || span < 12) return;
    let vx = (latest.x - first.x) / span;
    let vy = (latest.y - first.y) / span;
    const speed = Math.hypot(vx, vy);
    if (speed > GLIDE_MAX_SPEED) {
      vx *= GLIDE_MAX_SPEED / speed;
      vy *= GLIDE_MAX_SPEED / speed;
    }
    let last = now;
    const glide = (frameTime: number) => {
      const dt = Math.min(32, frameTime - last);
      last = frameTime;
      const decay = Math.pow(GLIDE_DECAY, dt / 16);
      vx *= decay;
      vy *= decay;
      if (Math.abs(vx) + Math.abs(vy) < 0.02) {
        inertiaFrame.current = null;
        return;
      }
      const cam = camera.cam;
      camera.set({ s: cam.s, x: cam.x + vx * dt, y: cam.y + vy * dt });
      inertiaFrame.current = requestAnimationFrame(glide);
    };
    inertiaFrame.current = requestAnimationFrame(glide);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      camera.stop();
      stopInertia();
      lastFollow.current = null;
      const rect = canvas.getBoundingClientRect();
      const lineScale = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? rect.height : 1;
      const dx = event.deltaX * lineScale;
      const dy = event.deltaY * lineScale;
      const mouseWheel =
        event.deltaMode !== 0 || (event.deltaX === 0 && Number.isInteger(dy) && Math.abs(dy) >= 50);
      if (event.ctrlKey || mouseWheel) {
        const factor = Math.exp(-dy * (event.ctrlKey ? 0.01 : 0.0018));
        camera.set(
          zoomAt(
            camera.cam,
            event.clientX - rect.left,
            event.clientY - rect.top,
            factor,
            live.current.policy,
          ),
        );
      } else {
        const cam = camera.cam;
        camera.set({ s: cam.s, x: cam.x - dx, y: cam.y - dy });
      }
    };
    canvas.addEventListener("wheel", onWheel, { passive: false });
    return () => canvas.removeEventListener("wheel", onWheel);
  }, [camera, mapMounted]);

  function onCanvasKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.altKey || event.metaKey || event.ctrlKey) return;
    dragMoved.current = false;
    const { index: tree, expanded: open, selectedId: current } = live.current;
    const entry = tree.entries.get(current);
    if (!entry) return;
    const children = entry.node.children ?? [];
    const siblings = entry.parentId ? (tree.entries.get(entry.parentId)?.node.children ?? []) : [];
    const position = siblings.findIndex((sibling) => sibling.id === current);
    const handled = () => {
      event.preventDefault();
      event.stopPropagation();
    };
    switch (event.key) {
      case "ArrowRight":
        handled();
        if (children.length && !open.has(current)) {
          activate(current);
          focusRequest.current = current;
        } else if (children.length) selectNode(children[0].id, { keyboard: true });
        return;
      case "ArrowLeft":
        handled();
        if (children.length && open.has(current)) {
          activate(current);
          focusRequest.current = current;
        } else if (entry.parentId) selectNode(entry.parentId, { keyboard: true });
        return;
      case "ArrowDown":
        handled();
        if (position >= 0 && siblings[position + 1]) {
          selectNode(siblings[position + 1].id, { keyboard: true });
        }
        return;
      case "ArrowUp":
        handled();
        if (position > 0) selectNode(siblings[position - 1].id, { keyboard: true });
        return;
      case "Home":
        handled();
        selectNode(tree.rootId, { keyboard: true });
        return;
      case "+":
      case "=":
        handled();
        zoomBy(1.25);
        return;
      case "-":
      case "_":
        handled();
        zoomBy(1 / 1.25);
        return;
      default:
    }
  }

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (readerOpen) {
        event.preventDefault();
        closeReader();
      } else if (mode === "focus") {
        event.preventDefault();
        changeMode("explore");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [changeMode, closeReader, mode, readerOpen]);

  // ── Render ───────────────────────────────────────────────────────────
  const isEmpty = data.id === EMPTY_MIND_NODE.id && !data.children?.length;
  if (isEmpty) {
    return (
      <div
        className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-slate-950/40 p-10 text-center text-sm text-white/60"
        style={{ height: typeof height === "number" ? `${height}px` : height, minHeight: 240 }}
      >
        <MapIcon className="h-6 w-6 text-white/30" />
        {strings.empty}
      </div>
    );
  }

  const position = { index: selectedEntry.order + 1, total: index.order.length };
  const canPrevious = selectedEntry.order > 0;
  const canNext = selectedEntry.order < index.order.length - 1;
  const selectedAccent = branchColor(selectedEntry.branchIndex);
  const crumbs = ancestorIds(index, selectedEntry.node.id).map((id) => ({
    id,
    label: index.entries.get(id)?.node.label ?? "",
  }));
  const frameHeight = typeof height === "number" ? `${height}px` : height;
  // The connector layer must have a real size: browsers skip painting a
  // zero-sized SVG even when its overflow is visible.
  const edgePad = 600;
  const edgeBox = {
    x: Math.floor(layout.bounds.minX - edgePad),
    y: Math.floor(layout.bounds.minY - edgePad),
    w: Math.ceil(layout.bounds.maxX - layout.bounds.minX + edgePad * 2),
    h: Math.ceil(layout.bounds.maxY - layout.bounds.minY + edgePad * 2),
  };

  return (
    <div
      className="relative flex w-full min-w-0 flex-col overflow-hidden bg-[#060B1A] text-white"
      style={{ height: frameHeight, overflow: "clip" }}
      onScroll={undoContainerScroll}
    >
      <style>{MIND_MAP_CSS}</style>
      {header && (
        <MindMapTopBar
          header={header}
          accent={subjectAccent}
          compact={compact}
          strings={strings}
          mode={mode}
          view={view}
          showMinimap={showMinimap}
          onModeChange={changeMode}
          onViewChange={changeView}
          onFit={fitView}
          onReset={resetView}
          onZoomIn={() => zoomBy(1.25)}
          onZoomOut={() => zoomBy(1 / 1.25)}
          onExpandAll={expandAll}
          onCollapseAll={collapseAll}
          onToggleMinimap={() => setShowMinimap((value) => !value)}
        />
      )}

      <div
        className="relative min-h-0 flex-1 overflow-hidden"
        style={{ ["--mm-dock-h" as string]: "64px", overflow: "clip" }}
        onScroll={undoContainerScroll}
      >
        {mapMounted && (
          <div
            ref={canvasRef}
            className={`mm-canvas absolute inset-0 cursor-grab touch-none select-none overscroll-none active:cursor-grabbing ${
              view === "map" ? "" : "invisible"
            }`}
            style={{ overflow: "clip" }}
            onScroll={undoContainerScroll}
            role="application"
            aria-roledescription="mind map"
            aria-label={strings.canvasLabel(data.label)}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onKeyDown={onCanvasKeyDown}
          >
            <div
              ref={gridRef}
              className="mm-grid pointer-events-none absolute inset-0"
              aria-hidden="true"
            />
            <div
              ref={worldRef}
              className="absolute left-0 top-0"
              style={{ transformOrigin: "0 0" }}
            >
              <svg
                className="pointer-events-none absolute overflow-visible"
                style={{
                  left: edgeBox.x,
                  top: edgeBox.y,
                  width: edgeBox.w,
                  height: edgeBox.h,
                  maxWidth: "none",
                }}
                viewBox={`${edgeBox.x} ${edgeBox.y} ${edgeBox.w} ${edgeBox.h}`}
                aria-hidden="true"
                focusable="false"
              >
                {renderedEntries.map(({ node, depth, parentId, branchIndex }) => {
                  if (!parentId) return null;
                  const onPath = node.id === selectedId || ancestorsOfSelected.has(node.id);
                  const dim = !!focusActiveIds && !focusActiveIds.has(node.id);
                  return (
                    <path
                      key={node.id}
                      ref={(el) => {
                        if (el) edgeEls.current.set(node.id, el);
                        else edgeEls.current.delete(node.id);
                      }}
                      className="mm-edge"
                      stroke={branchColor(branchIndex)}
                      strokeWidth={(depth === 1 ? 2.75 : 2.1) + (onPath ? 0.6 : 0)}
                      strokeOpacity={dim ? 0.1 : onPath ? 0.95 : 0.5}
                    />
                  );
                })}
              </svg>
              {renderedEntries.map(({ node, depth, branchIndex }) => {
                const id = node.id;
                const leaving = !visibleSet.has(id);
                return (
                  <div
                    key={id}
                    ref={(el) => {
                      if (el) nodeEls.current.set(id, el);
                      else nodeEls.current.delete(id);
                    }}
                    className="mm-node"
                    aria-hidden={leaving || undefined}
                    inert={leaving || undefined}
                  >
                    <MindMapNodeCard
                      node={node}
                      depth={depth}
                      width={sizes.get(id)?.w ?? 220}
                      metrics={metrics}
                      accent={branchColor(branchIndex)}
                      expanded={expanded.has(id)}
                      selected={id === selectedId}
                      onPath={ancestorsOfSelected.has(id)}
                      dimmed={!!focusActiveIds && !focusActiveIds.has(id)}
                      tabbable={id === selectedId && !leaving}
                      strings={strings}
                      onActivate={activate}
                      onOpenReader={openReader}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {view === "outline" && (
          <div className="absolute inset-0 overflow-y-auto overscroll-contain bg-[#060B1A]">
            <MindMapOutline
              data={data}
              expanded={expanded}
              selectedId={selectedId}
              strings={strings}
              onToggle={toggleFromOutline}
              onExpandAll={() => setExpanded(getExpandableMindNodeIds(data))}
              onCollapseAll={() => {
                setExpanded(new Set([data.id]));
                setSelectedId(data.id);
              }}
            />
          </div>
        )}

        {view === "map" && (
          <>
            {focusBranch && (
              <div
                ref={focusChipRef}
                className="pointer-events-none absolute inset-x-0 top-3 z-20 flex justify-center px-3"
              >
                <button
                  type="button"
                  onClick={() => changeMode("explore")}
                  className="pointer-events-auto inline-flex min-h-11 max-w-full items-center gap-2 rounded-full border border-cyan-300/30 bg-[#08203A]/90 py-1.5 pl-4 pr-2 text-sm font-semibold text-cyan-50 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.8)] backdrop-blur-md"
                  aria-label={`${strings.exitFocus}: ${focusBranch.label}`}
                >
                  <Crosshair className="h-4 w-4 flex-none text-cyan-200" aria-hidden="true" />
                  <span className="min-w-0 truncate">
                    {strings.focusOn} · {focusBranch.label}
                  </span>
                  <span className="inline-flex h-8 w-8 flex-none items-center justify-center rounded-full bg-white/10">
                    <X className="h-4 w-4" aria-hidden="true" />
                  </span>
                </button>
              </div>
            )}

            {!compact && (
              <div
                ref={railRef}
                role="toolbar"
                aria-orientation="vertical"
                aria-label={strings.mapView}
                className={`absolute right-4 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-1.5 rounded-[20px] border border-white/[0.08] bg-[#081028]/70 p-1.5 backdrop-blur-md transition-opacity ${
                  readerOpen ? "pointer-events-none opacity-0" : ""
                }`}
              >
                <button
                  type="button"
                  onClick={() => zoomBy(1.25)}
                  aria-label={strings.zoomIn}
                  title={strings.zoomIn}
                  className="mm-control"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => zoomBy(1 / 1.25)}
                  aria-label={strings.zoomOut}
                  title={strings.zoomOut}
                  className="mm-control"
                >
                  <Minus className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={fitView}
                  aria-label={strings.fit}
                  title={strings.fit}
                  className="mm-control"
                >
                  <Maximize className="h-4 w-4" aria-hidden="true" />
                </button>
                <span className="mx-2 my-0.5 h-px bg-white/10" aria-hidden="true" />
                <button
                  type="button"
                  onClick={expandAll}
                  aria-label={strings.expandAll}
                  title={strings.expandAll}
                  className="mm-control"
                >
                  <ChevronsUpDown className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={collapseAll}
                  aria-label={strings.collapseAll}
                  title={strings.collapseAll}
                  className="mm-control"
                >
                  <ChevronsDownUp className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setShowMinimap((value) => !value)}
                  aria-pressed={showMinimap}
                  aria-label={strings.minimap}
                  title={showMinimap ? strings.hideMinimap : strings.showMinimap}
                  className="mm-control"
                >
                  <MapIcon className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            )}

            {showMinimap && mapMounted && (
              <div
                className={`absolute z-20 ${
                  compact ? "left-2 top-2" : "bottom-[calc(var(--mm-dock-h)+1.75rem)] left-4"
                }`}
              >
                <MindMapMinimap
                  layout={layout}
                  index={index}
                  camera={camera}
                  viewport={viewport}
                  selectedId={selectedId}
                  label={strings.minimap}
                  onNavigate={(worldX, worldY, animate) => {
                    lastFollow.current = null;
                    const cam = camera.cam;
                    const target = {
                      s: cam.s,
                      x: viewport.w / 2 - worldX * cam.s,
                      y: viewport.h / 2 - worldY * cam.s,
                    };
                    if (animate) camera.animateTo(target, 260);
                    else {
                      camera.stop();
                      camera.set(target);
                    }
                  }}
                />
              </div>
            )}

            {readerOpen && (
              <MindMapReader
                ref={readerRef}
                node={selectedEntry.node}
                accent={selectedAccent}
                crumbs={crumbs}
                position={position}
                variant={compact ? "sheet" : "side"}
                strings={strings}
                canPrevious={canPrevious}
                canNext={canNext}
                onPrevious={() => step(-1)}
                onNext={() => step(1)}
                onSelect={(id) => selectNode(id)}
                onClose={closeReader}
              />
            )}

            <div
              ref={dockRef}
              className="absolute inset-x-2 bottom-[max(0.5rem,env(safe-area-inset-bottom))] z-30 mx-auto flex h-[var(--mm-dock-h)] max-w-[600px] items-center gap-1.5 rounded-[22px] border border-white/[0.09] bg-[#0A1230]/92 p-1.5 shadow-[0_20px_50px_-18px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:bottom-4"
              role="toolbar"
              aria-label={strings.position(position.index, position.total)}
            >
              <button
                type="button"
                onClick={() => step(-1)}
                disabled={!canPrevious}
                aria-label={strings.previousNode}
                className="mm-control h-full flex-none border-transparent px-3 text-sm font-semibold"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                {!compact && <span>{strings.previous}</span>}
              </button>
              <button
                type="button"
                onClick={() => (readerOpen ? closeReader() : openReader(selectedEntry.node.id))}
                aria-label={readerOpen ? strings.closeReader : strings.openReader}
                aria-pressed={readerOpen}
                className="group flex h-full min-w-0 flex-1 items-center gap-3 rounded-2xl px-3 text-left transition-colors hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
              >
                <span
                  className="h-8 w-1 flex-none rounded-full"
                  style={{ background: selectedAccent }}
                  aria-hidden="true"
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-[#E9B949]/80 tabular-nums">
                    {strings.position(position.index, position.total)}
                  </span>
                  <span className="block truncate text-sm font-semibold text-white sm:text-[15px]">
                    {selectedEntry.node.label}
                  </span>
                </span>
                <span
                  className={`inline-flex h-9 flex-none items-center gap-1.5 rounded-xl px-2.5 text-xs font-bold ${
                    readerOpen ? "bg-cyan-300/20 text-cyan-100" : "bg-white/[0.07] text-white/80"
                  }`}
                  aria-hidden="true"
                >
                  <BookOpen className="h-4 w-4" />
                  {!compact && strings.read}
                </span>
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                disabled={!canNext}
                aria-label={strings.nextNode}
                className="mm-control h-full flex-none border-transparent px-3 text-sm font-semibold"
              >
                {!compact && <span>{strings.next}</span>}
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
