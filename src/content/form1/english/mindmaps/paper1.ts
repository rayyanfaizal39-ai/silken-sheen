import type { MindNode } from "@/components/MindMap";
import { withIdPrefix } from "@/content/mindmap-utils";
import { englishF1ShortTextsMindMap } from "./short-texts";
import { englishF1GrammarMindMap } from "./grammar";
import { englishF1InformationTransferMindMap } from "./information-transfer";
import { englishF1ReadingComprehensionMindMap } from "./reading-comprehension";
import { englishF1GappedTextMindMap } from "./gapped-text";

// Combines the 5 UASA topic mind maps into a single Paper 1 mind map, so the
// existing "Chapter 1 = Paper 1" card shows one map with all 5 topics as
// branches, instead of 5 separate chapter cards. withIdPrefix keeps every
// node id unique across the combined tree — see mindmap-utils.ts.
export const englishF1Paper1MindMap: MindNode = {
  id: "root",
  label: "Paper 1 — Reading & Language Awareness",
  children: [
    withIdPrefix(englishF1ShortTextsMindMap, "f1-p1-st"),
    withIdPrefix(englishF1GrammarMindMap, "f1-p1-gr"),
    withIdPrefix(englishF1InformationTransferMindMap, "f1-p1-it"),
    withIdPrefix(englishF1ReadingComprehensionMindMap, "f1-p1-rc"),
    withIdPrefix(englishF1GappedTextMindMap, "f1-p1-gt"),
  ],
};
