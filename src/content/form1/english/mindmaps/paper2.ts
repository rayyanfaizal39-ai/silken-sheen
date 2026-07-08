import type { MindNode } from "@/components/MindMap";
import { withIdPrefix } from "@/content/mindmap-utils";
import { englishF1ShortCommunicativeMessageMindMap } from "./short-communicative-message";
import { englishF1GuidedWritingMindMap } from "./guided-writing";

// Combines the 2 UASA Paper 2 topic mind maps into a single Paper 2 mind map
// for the existing "Chapter 2 = Paper 2" card. See paper1.ts / mindmap-utils.ts.
export const englishF1Paper2MindMap: MindNode = {
  id: "root",
  label: "Paper 2 — Writing",
  children: [
    withIdPrefix(englishF1ShortCommunicativeMessageMindMap, "f1-p2-scm"),
    withIdPrefix(englishF1GuidedWritingMindMap, "f1-p2-gw"),
  ],
};
