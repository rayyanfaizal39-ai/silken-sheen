import type { MindNode } from "@/components/MindMap";
import { withIdPrefix } from "@/content/mindmap-utils";
import { englishF2ShortTextsMindMap } from "./short-texts";
import { englishF2GrammarMindMap } from "./grammar";
import { englishF2InformationTransferMindMap } from "./information-transfer";
import { englishF2ReadingComprehensionMindMap } from "./reading-comprehension";
import { englishF2GappedTextMindMap } from "./gapped-text";

// Combines the 5 UASA topic mind maps into a single Paper 1 mind map, so the
// existing "Chapter 1 = Paper 1" card shows one map with all 5 topics as
// branches, instead of 5 separate chapter cards. withIdPrefix keeps every
// node id unique across the combined tree — see mindmap-utils.ts.
export const englishF2Paper1MindMap: MindNode = {
  id: "root",
  label: "Paper 1 — Reading & Language Awareness",
  children: [
    withIdPrefix(englishF2ShortTextsMindMap, "f2-p1-st"),
    withIdPrefix(englishF2GrammarMindMap, "f2-p1-gr"),
    withIdPrefix(englishF2InformationTransferMindMap, "f2-p1-it"),
    withIdPrefix(englishF2ReadingComprehensionMindMap, "f2-p1-rc"),
    withIdPrefix(englishF2GappedTextMindMap, "f2-p1-gt"),
  ],
};
