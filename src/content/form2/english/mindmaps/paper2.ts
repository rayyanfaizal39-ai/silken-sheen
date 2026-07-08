import type { MindNode } from "@/components/MindMap";
import { withIdPrefix } from "@/content/mindmap-utils";
import { englishF2ShortCommunicativeMessageMindMap } from "./short-communicative-message";
import { englishF2GuidedWritingMindMap } from "./guided-writing";

// Combines the 2 UASA Paper 2 topic mind maps into a single Paper 2 mind map
// for the existing "Chapter 2 = Paper 2" card. See paper1.ts / mindmap-utils.ts.
export const englishF2Paper2MindMap: MindNode = {
  id: "root",
  label: "Paper 2 — Writing",
  children: [
    withIdPrefix(englishF2ShortCommunicativeMessageMindMap, "f2-p2-scm"),
    withIdPrefix(englishF2GuidedWritingMindMap, "f2-p2-gw"),
  ],
};
