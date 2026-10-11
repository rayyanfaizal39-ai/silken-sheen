import { formatMindMapTitle } from "./format";

// Pure tree utilities for the mind map engine. Nothing here touches the DOM,
// so layout, traversal and visibility rules can be unit tested directly and
// reused by any future surface (outline view, Parent reports, AI context).

export type MindNode = {
  id: string;
  label: string;
  /**
   * Optional concise supporting content. The root and detail nodes may display
   * it, but first-level branches are always title-only navigation nodes.
   */
  summary?: string;
  children?: MindNode[];
};

export const EMPTY_MIND_NODE: MindNode = {
  id: "empty-mindmap",
  label: "Mind Map",
  children: [],
};

/**
 * Builds the display tree the explorer renders: a validated copy whose
 * titles are cleaned with `formatMindMapTitle`. Ids, hierarchy, order and
 * summaries are kept exactly; the content objects are never mutated.
 */
export function normalizeMindNode(value: unknown): MindNode {
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
  const normalized: MindNode = {
    id: candidate.id,
    label: formatMindMapTitle(candidate.label),
    ...(typeof candidate.summary === "string" && candidate.summary.trim()
      ? { summary: candidate.summary }
      : {}),
  };
  return children.length ? { ...normalized, children } : normalized;
}

/** Supporting text shown on a card. First-level branches stay title-only. */
export function visibleSummary(node: MindNode, depth: number) {
  if (depth === 1) return "";
  return typeof node.summary === "string" ? node.summary.trim() : "";
}

export type TreeEntry = {
  node: MindNode;
  depth: number;
  parentId: string | null;
  /** Index of the first-level branch this node belongs to; -1 for the root. */
  branchIndex: number;
  /** Position in the deterministic pre-order reading sequence. */
  order: number;
};

export type TreeIndex = {
  rootId: string;
  entries: Map<string, TreeEntry>;
  /** Every node id in pre-order: the chapter's own authored reading order. */
  order: string[];
};

export function buildTreeIndex(root: MindNode): TreeIndex {
  const entries = new Map<string, TreeEntry>();
  const order: string[] = [];
  function walk(node: MindNode, depth: number, parentId: string | null, branchIndex: number) {
    entries.set(node.id, { node, depth, parentId, branchIndex, order: order.length });
    order.push(node.id);
    node.children?.forEach((child, index) =>
      walk(child, depth + 1, node.id, depth === 0 ? index : branchIndex),
    );
  }
  walk(root, 0, null, -1);
  return { rootId: root.id, entries, order };
}

/** Ancestor ids from the root down to (not including) the node. */
export function ancestorIds(index: TreeIndex, id: string): string[] {
  const chain: string[] = [];
  let parent = index.entries.get(id)?.parentId ?? null;
  while (parent) {
    chain.unshift(parent);
    parent = index.entries.get(parent)?.parentId ?? null;
  }
  return chain;
}

/** The first-level branch that contains the node, or null for the root. */
export function primaryBranchId(index: TreeIndex, id: string): string | null {
  const entry = index.entries.get(id);
  if (!entry || entry.depth === 0) return null;
  if (entry.depth === 1) return id;
  return ancestorIds(index, id)[1] ?? null;
}

export function subtreeIds(node: MindNode, out = new Set<string>()) {
  out.add(node.id);
  node.children?.forEach((child) => subtreeIds(child, out));
  return out;
}

function collectExpandableIds(node: MindNode, out: Set<string>) {
  if (node.children && node.children.length) {
    out.add(node.id);
    node.children.forEach((c) => collectExpandableIds(c, out));
  }
}

export function getExpandableMindNodeIds(node: MindNode) {
  const ids = new Set<string>();
  collectExpandableIds(node, ids);
  return ids;
}

export function getVisibleMindNodes(data: MindNode, expanded: ReadonlySet<string>) {
  const result: { node: MindNode; depth: number }[] = [];
  function walk(node: MindNode, depth: number) {
    result.push({ node, depth });
    if (expanded.has(node.id)) node.children?.forEach((child) => walk(child, depth + 1));
  }
  walk(data, 0);
  return result;
}

export function collectAllNodes(
  node: MindNode,
  depth = 0,
  out: { node: MindNode; depth: number }[] = [],
) {
  out.push({ node, depth });
  node.children?.forEach((c) => collectAllNodes(c, depth + 1, out));
  return out;
}

/** Expanded set that reveals `id`: every ancestor is opened, nothing is closed. */
export function revealPath(
  index: TreeIndex,
  expanded: ReadonlySet<string>,
  id: string,
): Set<string> {
  const next = new Set(expanded);
  ancestorIds(index, id).forEach((ancestor) => next.add(ancestor));
  return next;
}
