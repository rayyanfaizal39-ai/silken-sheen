import type { MindNode } from "@/components/MindMap";

// MindMap.tsx tracks node positions/edges/expand-state in Maps and Sets keyed
// by `node.id`, so every id in a single rendered tree must be globally unique.
// The per-topic English mind maps (short-texts.ts, grammar.ts, etc.) were each
// authored as their own standalone tree and reuse generic ids like "root",
// "skills", "exam-tips" across different topics. Combining several of them as
// siblings under one new root — as the English Paper 1/Paper 2 mind maps do —
// would otherwise produce duplicate ids and corrupt the layout/expand state.
// This deep-clones a tree with every id prefixed, so composed trees stay
// collision-free without editing the original per-topic files.
export function withIdPrefix(node: MindNode, prefix: string): MindNode {
  return {
    id: `${prefix}-${node.id}`,
    label: node.label,
    children: node.children?.map((child) => withIdPrefix(child, prefix)),
  };
}
