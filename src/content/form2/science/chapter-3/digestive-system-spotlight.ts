import type { SpotlightShape } from "@/components/notes/blocks/spotlight-shapes";

/**
 * Authored geometry for the digestive-system `spotlight` diagram, eyeballed
 * against `chapter3_digestive_system.webp`. Percentages of the artwork's
 * width (cx, rx) and height (cy, ry) independently. Kept in one
 * language-neutral place so BM and DLP organ positions can never drift apart
 * — only the label/note text differs between the two content files that
 * import this by organ id.
 */
const ellipse = (id: string, cx: number, cy: number, rx: number, ry: number): SpotlightShape => ({
  id,
  kind: "ellipse",
  cx,
  cy,
  rx,
  ry,
});

export const DIGESTIVE_ORGAN_SHAPES: Record<string, SpotlightShape[]> = {
  mulut: [ellipse("mulut", 45, 19, 9, 6)],
  "kelenjar-air-liur": [ellipse("kelenjar-air-liur", 34, 24, 7, 7)],
  esofagus: [ellipse("esofagus", 50, 33, 4, 10)],
  hati: [ellipse("hati", 40, 48, 13, 8)],
  perut: [ellipse("perut", 61, 51, 9, 8)],
  "pundi-hempedu": [ellipse("pundi-hempedu", 40, 55, 4, 4)],
  pankreas: [ellipse("pankreas", 57, 59, 9, 4)],
  duodenum: [ellipse("duodenum", 47, 61, 5, 5)],
  "usus-besar": [ellipse("usus-besar", 50, 80, 26, 17)],
  "usus-kecil": [ellipse("usus-kecil", 50, 78, 14, 10)],
  rektum: [ellipse("rektum", 50, 90, 6, 5)],
  dubur: [ellipse("dubur", 49, 95, 4, 3)],
};
