import type { MindNode } from "@/components/MindMap";
import { withIdPrefix } from "@/content/mindmap-utils";
import { englishF3ShortTextsMindMap } from "./short-texts";
import { englishF3GrammarMindMap } from "./grammar";
import { englishF3InformationTransferMindMap } from "./information-transfer";
import { englishF3ReadingComprehensionMindMap } from "./reading-comprehension";
import { englishF3GappedTextMindMap } from "./gapped-text";

// Combines the 5 UASA topic mind maps into a single Paper 1 mind map, so the
// existing "Chapter 1 = Paper 1" card shows one map with all 5 topics as
// branches, instead of 5 separate chapter cards. withIdPrefix keeps every
// node id unique across the combined tree — see mindmap-utils.ts.
export const englishF3Paper1MindMap: MindNode = {
  id: "root",
  label: "Paper 1 — Reading & Language Awareness",
  children: [
    withIdPrefix(englishF3ShortTextsMindMap, "f3-p1-st"),
    withIdPrefix(englishF3GrammarMindMap, "f3-p1-gr"),
    withIdPrefix(englishF3InformationTransferMindMap, "f3-p1-it"),
    withIdPrefix(englishF3ReadingComprehensionMindMap, "f3-p1-rc"),
    withIdPrefix(englishF3GappedTextMindMap, "f3-p1-gt"),
  ],
};
