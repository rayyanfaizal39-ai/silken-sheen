import { collectAllNodes, visibleSummary, type MindNode } from "./tree";

// Horizontal hierarchical layout: the main topic sits on the left and every
// level grows to the right. Each subtree owns a disjoint vertical band, so
// nodes can never overlap however long their text is, and a parent is
// centred on the children it reveals.

export type MindMapPosition = { x: number; y: number; w: number; h: number };
export type MindMapLayoutResult = {
  /** x = left edge, y = vertical centre, w/h = card size. */
  positions: Map<string, MindMapPosition>;
  height: number;
  edges: { from: string; to: string }[];
  bounds: { minX: number; maxX: number; minY: number; maxY: number };
};
export type NodeSize = { w: number; h: number };

export type DepthTypography = {
  minW: number;
  maxW: number;
  font: number;
  lineH: number;
  weight: number;
  padX: number;
  padY: number;
  family: "display" | "body";
};

export type MindMapMetrics = {
  compact: boolean;
  colGap: number;
  siblingGap: number;
  /** Gap around a sibling whose own children are showing. */
  groupGap: number;
  root: DepthTypography;
  branch: DepthTypography;
  detail: DepthTypography;
  /** Very long detail labels read as body text rather than heavy headings. */
  longLabel: { threshold: number; font: number; lineH: number; weight: number };
  summary: { font: number; lineH: number; gap: number };
  /** Space reserved on the right of an expandable card for its indicator. */
  indicatorW: number;
  /** Accent stripe on branch and detail cards. */
  accentW: number;
};

const DESKTOP_METRICS: MindMapMetrics = {
  compact: false,
  colGap: 92,
  siblingGap: 18,
  groupGap: 36,
  root: {
    minW: 280,
    maxW: 420,
    font: 23,
    lineH: 30,
    weight: 700,
    padX: 26,
    padY: 22,
    family: "display",
  },
  branch: {
    minW: 228,
    maxW: 320,
    font: 18.5,
    lineH: 25,
    weight: 650,
    padX: 20,
    padY: 17,
    family: "display",
  },
  detail: {
    minW: 210,
    maxW: 380,
    font: 16.5,
    lineH: 24,
    weight: 600,
    padX: 18,
    padY: 15,
    family: "body",
  },
  longLabel: { threshold: 90, font: 15.5, lineH: 24, weight: 500 },
  summary: { font: 15.5, lineH: 24, gap: 6 },
  indicatorW: 40,
  accentW: 4,
};

const COMPACT_METRICS: MindMapMetrics = {
  compact: true,
  colGap: 56,
  siblingGap: 14,
  groupGap: 28,
  root: {
    minW: 220,
    maxW: 300,
    font: 20,
    lineH: 27,
    weight: 700,
    padX: 20,
    padY: 18,
    family: "display",
  },
  branch: {
    minW: 200,
    maxW: 268,
    font: 17,
    lineH: 24,
    weight: 650,
    padX: 16,
    padY: 15,
    family: "display",
  },
  detail: {
    minW: 196,
    maxW: 296,
    font: 16,
    lineH: 23,
    weight: 600,
    padX: 15,
    padY: 13,
    family: "body",
  },
  longLabel: { threshold: 90, font: 15, lineH: 22, weight: 500 },
  summary: { font: 15, lineH: 22, gap: 5 },
  indicatorW: 38,
  accentW: 4,
};

const ROOT_ICON_ROW = 40;

/** Canvas narrower than this uses the compact (phone) metrics. */
export const COMPACT_BREAKPOINT = 640;

export function getMindMapMetrics(compact: boolean): MindMapMetrics {
  return compact ? COMPACT_METRICS : DESKTOP_METRICS;
}

export const FONT_STACKS = {
  display: '"Space Grotesk", ui-sans-serif, system-ui, sans-serif',
  body: '"Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
} as const;

export function typographyFor(depth: number, metrics: MindMapMetrics) {
  return depth === 0 ? metrics.root : depth === 1 ? metrics.branch : metrics.detail;
}

/** The label style a card actually renders with. */
export function labelStyleFor(node: MindNode, depth: number, metrics: MindMapMetrics) {
  const type = typographyFor(depth, metrics);
  if (depth >= 2 && node.label.length > metrics.longLabel.threshold) {
    return { ...type, ...metrics.longLabel, family: "body" as const };
  }
  return type;
}

let measureContext: CanvasRenderingContext2D | null | undefined;
function getMeasureContext() {
  if (measureContext !== undefined) return measureContext;
  if (typeof document === "undefined") return null;
  try {
    measureContext = document.createElement("canvas").getContext("2d");
  } catch {
    measureContext = null;
  }
  return measureContext;
}

type TextMeasurer = (text: string) => number;

function createMeasurer(font: string, size: number): TextMeasurer {
  const ctx = getMeasureContext();
  if (!ctx) return (text) => text.length * size * 0.54;
  return (text) => {
    ctx.font = font;
    return ctx.measureText(text).width;
  };
}

/** Greedy word wrap; returns the number of lines and the widest line. */
export function wrapText(text: string, maxWidth: number, measure: TextMeasurer) {
  const words = text.split(/\s+/).filter(Boolean);
  if (!words.length) return { lines: 1, widest: 0 };
  let lines = 1;
  let widest = 0;
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    const width = measure(candidate);
    if (width <= maxWidth || !current) {
      current = candidate;
      // A single word longer than the line breaks anywhere (overflow-wrap).
      if (width > maxWidth) {
        lines += Math.ceil(width / maxWidth) - 1;
        widest = maxWidth;
        current = "";
        continue;
      }
      widest = Math.max(widest, width);
    } else {
      lines += 1;
      current = word;
      const wordWidth = measure(word);
      if (wordWidth > maxWidth) {
        lines += Math.ceil(wordWidth / maxWidth) - 1;
        current = "";
      }
      widest = Math.min(maxWidth, Math.max(widest, wordWidth));
    }
  }
  return { lines, widest };
}

/**
 * First-pass card size from canvas text metrics. The rendered card's real
 * height replaces it once the DOM has been measured, so this only needs to
 * be close; the width is final and is applied to the card.
 */
export function estimateNodeSize(node: MindNode, depth: number, metrics: MindMapMetrics): NodeSize {
  const type = typographyFor(depth, metrics);
  const labelStyle = labelStyleFor(node, depth, metrics);
  const summary = visibleSummary(node, depth);
  const indicator = node.children?.length ? metrics.indicatorW : 0;
  const accent = depth >= 1 ? metrics.accentW : 0;
  const chrome = type.padX * 2 + indicator + accent;

  const measureLabel = createMeasurer(
    `${labelStyle.weight} ${labelStyle.font}px ${FONT_STACKS[labelStyle.family]}`,
    labelStyle.font,
  );
  const measureSummary = createMeasurer(
    `400 ${metrics.summary.font}px ${FONT_STACKS.body}`,
    metrics.summary.font,
  );

  const naturalLabel = measureLabel(node.label);
  const naturalSummary = summary ? measureSummary(summary) : 0;
  const natural = Math.max(naturalLabel, naturalSummary * 0.62);
  const width = Math.round(Math.min(type.maxW, Math.max(type.minW, natural + chrome + 2)));
  const textWidth = width - chrome;

  const label = wrapText(node.label, textWidth, measureLabel);
  // The main topic card carries a 30px icon row above its title.
  let height = type.padY * 2 + label.lines * labelStyle.lineH + (depth === 0 ? ROOT_ICON_ROW : 0);
  if (summary) {
    const body = wrapText(summary, textWidth, measureSummary);
    height += metrics.summary.gap + body.lines * metrics.summary.lineH;
  }
  return { w: width, h: Math.ceil(Math.max(height, depth === 0 ? 76 : 52)) };
}

export function estimateAllNodeSizes(root: MindNode, metrics: MindMapMetrics) {
  const sizes = new Map<string, NodeSize>();
  collectAllNodes(root).forEach(({ node, depth }) =>
    sizes.set(node.id, estimateNodeSize(node, depth, metrics)),
  );
  return sizes;
}

function hasVisibleChildren(node: MindNode, expanded: ReadonlySet<string>) {
  return !!node.children?.length && expanded.has(node.id);
}

function gapBetween(a: MindNode, b: MindNode, expanded: ReadonlySet<string>, m: MindMapMetrics) {
  return hasVisibleChildren(a, expanded) || hasVisibleChildren(b, expanded)
    ? m.groupGap
    : m.siblingGap;
}

export function calculateMindMapLayout(
  data: MindNode,
  expanded: ReadonlySet<string>,
  measuredSizes?: ReadonlyMap<string, NodeSize>,
  metrics: MindMapMetrics = DESKTOP_METRICS,
): MindMapLayoutResult {
  const fallback = new Map<string, NodeSize>();
  const sizeOf = (node: MindNode, depth: number): NodeSize => {
    const known = measuredSizes?.get(node.id);
    if (known) return known;
    let estimate = fallback.get(node.id);
    if (!estimate) {
      estimate = estimateNodeSize(node, depth, metrics);
      fallback.set(node.id, estimate);
    }
    return estimate;
  };

  const blockHeights = new Map<string, number>();
  function measureBlock(node: MindNode, depth: number): number {
    const own = sizeOf(node, depth).h;
    if (!hasVisibleChildren(node, expanded)) {
      blockHeights.set(node.id, own);
      return own;
    }
    const children = node.children!;
    let total = 0;
    children.forEach((child, index) => {
      total += measureBlock(child, depth + 1);
      if (index > 0) total += gapBetween(children[index - 1], child, expanded, metrics);
    });
    const block = Math.max(own, total);
    blockHeights.set(node.id, block);
    return block;
  }

  const out: MindMapLayoutResult = {
    positions: new Map(),
    height: 0,
    edges: [],
    bounds: { minX: 0, maxX: 0, minY: 0, maxY: 0 },
  };

  function place(node: MindNode, depth: number, x: number, top: number): number {
    const size = sizeOf(node, depth);
    const block = blockHeights.get(node.id) ?? size.h;
    if (!hasVisibleChildren(node, expanded)) {
      const centerY = top + block / 2;
      out.positions.set(node.id, { x, y: centerY, w: size.w, h: size.h });
      return centerY;
    }
    const children = node.children!;
    const childrenTotal = children.reduce(
      (sum, child, index) =>
        sum +
        (blockHeights.get(child.id) ?? 0) +
        (index > 0 ? gapBetween(children[index - 1], child, expanded, metrics) : 0),
      0,
    );
    const childX = x + size.w + metrics.colGap;
    let cursor = top + (block - childrenTotal) / 2;
    const centers: number[] = [];
    children.forEach((child, index) => {
      if (index > 0) cursor += gapBetween(children[index - 1], child, expanded, metrics);
      centers.push(place(child, depth + 1, childX, cursor));
      out.edges.push({ from: node.id, to: child.id });
      cursor += blockHeights.get(child.id) ?? 0;
    });
    // Centre the parent on its children, but keep it inside its own band.
    const centred = (centers[0] + centers[centers.length - 1]) / 2;
    const centerY = Math.min(top + block - size.h / 2, Math.max(top + size.h / 2, centred));
    out.positions.set(node.id, { x, y: centerY, w: size.w, h: size.h });
    return centerY;
  }

  out.height = measureBlock(data, 0);
  place(data, 0, 0, 0);

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  out.positions.forEach((p) => {
    minX = Math.min(minX, p.x);
    maxX = Math.max(maxX, p.x + p.w);
    minY = Math.min(minY, p.y - p.h / 2);
    maxY = Math.max(maxY, p.y + p.h / 2);
  });
  out.bounds = { minX, maxX, minY, maxY };
  return out;
}

export type Rect = { minX: number; maxX: number; minY: number; maxY: number };

export function rectOf(position: MindMapPosition): Rect {
  return {
    minX: position.x,
    maxX: position.x + position.w,
    minY: position.y - position.h / 2,
    maxY: position.y + position.h / 2,
  };
}

export function unionRects(rects: Array<Rect | null | undefined>): Rect | null {
  const valid = rects.filter(Boolean) as Rect[];
  if (!valid.length) return null;
  return {
    minX: Math.min(...valid.map((r) => r.minX)),
    maxX: Math.max(...valid.map((r) => r.maxX)),
    minY: Math.min(...valid.map((r) => r.minY)),
    maxY: Math.max(...valid.map((r) => r.maxY)),
  };
}

/** Curved connector from a parent's right edge to a child's left edge. */
export function connectorPath(from: MindMapPosition, to: MindMapPosition) {
  const x1 = from.x + from.w;
  const y1 = from.y;
  const x2 = to.x;
  const y2 = to.y;
  const bend = Math.max(24, (x2 - x1) * 0.55);
  return `M ${x1} ${y1} C ${x1 + bend} ${y1}, ${x2 - bend} ${y2}, ${x2} ${y2}`;
}
