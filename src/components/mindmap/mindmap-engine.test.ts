import { describe, expect, it } from "vitest";
import { chapters } from "@/content/registry";
import {
  COMPACT_SCALE,
  DESKTOP_SCALE,
  cameraDuration,
  fitCamera,
  followCamera,
  safeArea,
  type Viewport,
} from "./camera";
import {
  calculateMindMapLayout,
  estimateNodeSize,
  getMindMapMetrics,
  rectOf,
  type MindMapPosition,
} from "./layout";
import {
  ancestorIds,
  buildTreeIndex,
  collectAllNodes,
  getExpandableMindNodeIds,
  primaryBranchId,
  revealPath,
  type MindNode,
} from "./tree";

const allMindMaps = chapters
  .filter((chapter) => chapter.mindMap)
  .map((chapter) => ({
    name: `${chapter.subjectId} ${chapter.form} ${chapter.chapterKey}${chapter.lang ? ` (${chapter.lang})` : ""}`,
    data: chapter.mindMap!.data,
  }));

/** Overlap check via a vertical sweep, fast enough for 400+ node maps. */
function findOverlap(positions: Map<string, MindMapPosition>) {
  const items = [...positions.entries()]
    .map(([id, p]) => ({ id, ...rectOf(p) }))
    .sort((a, b) => a.minY - b.minY);
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length && items[j].minY < items[i].maxY; j++) {
      const a = items[i];
      const b = items[j];
      if (a.minX < b.maxX && b.minX < a.maxX) return `${a.id} overlaps ${b.id}`;
    }
  }
  return null;
}

describe("mind map layout across every chapter", () => {
  it("covers every registered mind map", () => {
    expect(allMindMaps.length).toBeGreaterThan(250);
  });

  for (const compact of [false, true]) {
    const metrics = getMindMapMetrics(compact);
    it(`lays out every fully expanded map without overlaps (${compact ? "phone" : "desktop"})`, () => {
      for (const { name, data } of allMindMaps) {
        const layout = calculateMindMapLayout(
          data,
          getExpandableMindNodeIds(data),
          undefined,
          metrics,
        );
        expect(layout.positions.size, name).toBe(collectAllNodes(data).length);
        expect(findOverlap(layout.positions), name).toBeNull();
        for (const { from, to } of layout.edges) {
          const parent = layout.positions.get(from)!;
          const child = layout.positions.get(to)!;
          expect(child.x, `${name}: ${to} grows right`).toBeGreaterThanOrEqual(
            parent.x + parent.w + metrics.colGap - 0.5,
          );
        }
      }
    });
  }

  it("opens on the main topic and its primary branches only", () => {
    for (const { name, data } of allMindMaps) {
      const layout = calculateMindMapLayout(data, new Set([data.id]));
      expect(layout.positions.size, name).toBe(1 + (data.children?.length ?? 0));
    }
  });

  it("keeps card text at readable sizes on every device", () => {
    for (const compact of [false, true]) {
      const m = getMindMapMetrics(compact);
      expect(m.root.font).toBeGreaterThanOrEqual(20);
      expect(m.branch.font).toBeGreaterThanOrEqual(17);
      expect(m.detail.font).toBeGreaterThanOrEqual(16);
      expect(m.summary.font).toBeGreaterThanOrEqual(15);
      expect(m.longLabel.font).toBeGreaterThanOrEqual(15);
    }
  });

  it("grows long cards instead of shrinking or truncating their text", () => {
    const metrics = getMindMapMetrics(false);
    const short: MindNode = { id: "s", label: "Pengasasan" };
    const long: MindNode = {
      id: "l",
      label: "Langsung",
      summary:
        "Menjaga kebersihan sekolah ialah tanggungjawab semua warga sekolah. • Umum kepada khusus: Kebersihan penting dalam kehidupan. Oleh itu, kebersihan sekolah perlu diberi perhatian. • Persoalan: Siapakah yang bertanggungjawab menjaga kebersihan sekolah? Tanggungjawab ini perlu dipikul oleh seluruh warga sekolah.",
    };
    const shortSize = estimateNodeSize(short, 2, metrics);
    const longSize = estimateNodeSize(long, 2, metrics);
    expect(longSize.w).toBeLessThanOrEqual(metrics.detail.maxW);
    expect(longSize.h).toBeGreaterThan(shortSize.h * 3);
  });
});

describe("mind map traversal", () => {
  const data: MindNode = {
    id: "root",
    label: "Root",
    children: [
      {
        id: "a",
        label: "A",
        children: [
          { id: "a1", label: "A1" },
          { id: "a2", label: "A2" },
        ],
      },
      {
        id: "b",
        label: "B",
        children: [{ id: "b1", label: "B1", children: [{ id: "b1x", label: "B1x" }] }],
      },
    ],
  };
  const index = buildTreeIndex(data);

  it("follows the authored hierarchy in pre-order", () => {
    expect(index.order).toEqual(["root", "a", "a1", "a2", "b", "b1", "b1x"]);
  });

  it("reveals every ancestor of a target without closing anything", () => {
    const next = revealPath(index, new Set(["root", "a"]), "b1x");
    expect([...next].sort()).toEqual(["a", "b", "b1", "root"]);
    expect(ancestorIds(index, "b1x")).toEqual(["root", "b", "b1"]);
  });

  it("knows each node's primary branch for focus mode", () => {
    expect(primaryBranchId(index, "root")).toBeNull();
    expect(primaryBranchId(index, "b")).toBe("b");
    expect(primaryBranchId(index, "b1x")).toBe("b");
    expect(index.entries.get("a2")?.branchIndex).toBe(0);
    expect(index.entries.get("b1x")?.branchIndex).toBe(1);
  });
});

describe("mind map camera", () => {
  const vp: Viewport = { w: 1280, h: 760, insets: { top: 0, right: 72, bottom: 88, left: 0 } };
  const phone: Viewport = { w: 390, h: 700, insets: { top: 0, right: 0, bottom: 80, left: 0 } };
  const card = { minX: 2000, maxX: 2300, minY: 900, maxY: 960 };

  function inside(rect: typeof card, cam: { x: number; y: number; s: number }, view: Viewport) {
    const safe = safeArea(view, 28);
    return (
      rect.minX * cam.s + cam.x >= safe.left - 0.5 &&
      rect.maxX * cam.s + cam.x <= safe.right + 0.5 &&
      rect.minY * cam.s + cam.y >= safe.top - 0.5 &&
      rect.maxY * cam.s + cam.y <= safe.bottom + 0.5
    );
  }

  it("brings an off-screen selection fully into the safe area", () => {
    const cam = followCamera({
      cam: { x: 0, y: 0, s: 1 },
      vp,
      anchor: card,
      focus: card,
      policy: DESKTOP_SCALE,
    });
    expect(inside(card, cam, vp)).toBe(true);
  });

  it("restores a readable scale instead of following at overview zoom", () => {
    const cam = followCamera({
      cam: { x: 0, y: 0, s: 0.2 },
      vp,
      anchor: card,
      focus: card,
      policy: DESKTOP_SCALE,
    });
    expect(cam.s).toBe(DESKTOP_SCALE.read);
  });

  it("never zooms below the reading scale to show a large branch", () => {
    const hugeBranch = { minX: 2000, maxX: 4200, minY: -2000, maxY: 4000 };
    const cam = followCamera({
      cam: { x: 0, y: 0, s: 1 },
      vp,
      anchor: card,
      focus: hugeBranch,
      policy: DESKTOP_SCALE,
    });
    expect(cam.s).toBeGreaterThanOrEqual(DESKTOP_SCALE.minRead);
    expect(inside(card, cam, vp)).toBe(true);
  });

  it("does not move when the selection is already comfortably visible", () => {
    const start = { x: -1700, y: -600, s: 1 };
    expect(inside(card, start, vp)).toBe(true);
    const cam = followCamera({ cam: start, vp, anchor: card, focus: card, policy: DESKTOP_SCALE });
    expect(cam).toEqual(start);
  });

  it("keeps a selected card readable on a phone", () => {
    const cam = followCamera({
      cam: { x: 0, y: 0, s: 0.3 },
      vp: phone,
      anchor: { minX: 500, maxX: 796, minY: 0, maxY: 180 },
      focus: { minX: 500, maxX: 1500, minY: -900, maxY: 1100 },
      policy: COMPACT_SCALE,
    });
    expect(cam.s).toBeGreaterThanOrEqual(COMPACT_SCALE.minRead);
    expect(inside({ minX: 500, maxX: 796, minY: 0, maxY: 180 }, cam, phone)).toBe(true);
  });

  it("lets Fit show an overview below the reading scale", () => {
    const cam = fitCamera({ minX: 0, maxX: 9000, minY: 0, maxY: 6000 }, vp, DESKTOP_SCALE);
    expect(cam.s).toBeLessThan(DESKTOP_SCALE.minRead);
    expect(cam.s).toBeGreaterThanOrEqual(DESKTOP_SCALE.min);
  });

  it("times camera moves between 300 and 520 ms", () => {
    const from = { x: 0, y: 0, s: 1 };
    expect(cameraDuration(from, { x: 40, y: 0, s: 1 })).toBeGreaterThanOrEqual(300);
    expect(cameraDuration(from, { x: 9000, y: 4000, s: 0.5 })).toBeLessThanOrEqual(520);
    expect(cameraDuration(from, from)).toBe(0);
  });
});
