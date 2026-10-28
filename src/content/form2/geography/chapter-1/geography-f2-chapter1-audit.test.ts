import { describe, expect, it } from "vitest";
import { geographyF2C1Notes } from "./notes";
import { geoF2C1MindMap } from "./mindmap";
import { geographyF2C1Interactive } from "./interactive";
import { quizzes } from "@/data/content";

function flattenText(notes: typeof geographyF2C1Notes): string {
  return notes.sections
    .flatMap((section) =>
      (section.subsections ?? []).map((sub) =>
        [sub.content, sub.formula, ...(sub.bulletPoints ?? []), ...(sub.table?.rows.flat() ?? [])]
          .filter(Boolean)
          .join(" "),
      ),
    )
    .join(" ");
}

describe("Geography Form 2 Chapter 1 (Skala dan Jarak) textbook/DSKP audit regressions", () => {
  const notesText = flattenText(geographyF2C1Notes);

  it("F1: keeps skala lurus mudah/penuh correctly defined, not swapped", () => {
    expect(notesText).toContain(
      "skala lurus mudah (bermula terus dari 0 sehingga nombor maksimum tanpa sebarang bahagian tambahan)",
    );
    expect(notesText).toContain(
      "skala lurus penuh (mempunyai bahagian tambahan berlorek di sebelah kiri 0, untuk bacaan yang lebih tepat)",
    );
    expect(notesText).not.toContain("muduh");
    const mindmapText = JSON.stringify(geoF2C1MindMap);
    expect(mindmapText).not.toContain("muduh");
    expect(mindmapText).toContain("Skala lurus mudah vs skala lurus penuh");
  });

  it("F2: keeps Yusrita's basikal time at 20 minit, matching Jadual 1.1", () => {
    expect(notesText).toContain("rumah Yusrita terletak 2.5 km dari sekolah");
    expect(notesText).toContain("20 minit menaiki basikal");
    expect(notesText).not.toContain("Yusrate");
    expect(notesText).not.toContain("16 minit menaiki basikal");

    const quizQuestion = quizzes.find((q) => q.id === "geo-f2-c1-q11");
    expect(quizQuestion?.question).toContain("Yusrita");
    expect(quizQuestion?.question).not.toContain("Yusrate");
  });

  it("F4: describes the jangka tolok skala lurus example as a measured cm length, not abstract 'bahagian'", () => {
    expect(notesText).toContain("6 cm");
    expect(notesText).not.toMatch(/\d+ bahagian/);
  });

  it("F5: does not carry 'Kegunaan' claims that are not sourced from this textbook chapter", () => {
    expect(notesText).not.toContain("Kegunaan");
  });

  it("F6: mindmap describes the skala lurus measuring tool as jangka tolok, not a plain pembaris", () => {
    const skalaLurusNode = geoF2C1MindMap.children
      ?.find((c) => c.label === "1.1 Skala")
      ?.children?.find((c) => c.label === "Skala Lurus");
    const toolLabel = skalaLurusNode?.children?.map((c) => c.label).join(" | ") ?? "";
    expect(toolLabel).toContain("jangka tolok");
    expect(toolLabel).not.toContain("Diukur terus dengan pembaris");
  });

  it("F3: the new map-measurement exercise (section 1.4) has internally consistent scenarios", () => {
    const section14 = geographyF2C1Interactive.sections.find((s) => s.number === "1.4");
    expect(section14?.mapScale?.scenarios.length).toBeGreaterThanOrEqual(2);

    for (const scenario of section14!.mapScale!.scenarios) {
      const correctOptions = scenario.options.filter((o) => o.correct);
      expect(correctOptions, scenario.id).toHaveLength(1);

      const correctValueKm = Number.parseFloat(correctOptions[0].label);
      // Resolve the scale to km-per-cm from its label so the "correct" option can be
      // checked against the actual arithmetic, not just trusted as authored.
      const penyataMatch = scenario.scaleLabel.match(/1 cm mewakili (\d+(?:\.\d+)?) km/);
      const pecahanMatch = scenario.scaleLabel.match(/1 : (\d[\d\s]*)/);
      const kmPerCm = penyataMatch
        ? Number.parseFloat(penyataMatch[1])
        : pecahanMatch
          ? Number.parseInt(pecahanMatch[1].replace(/\s/g, ""), 10) / 100_000
          : NaN;
      expect(kmPerCm, scenario.scaleLabel).not.toBeNaN();
      expect(correctValueKm, scenario.id).toBeCloseTo(scenario.mapDistanceCm * kmPerCm, 5);

      // Every option must be a distinct, parseable km value (no duplicate distractors).
      const labels = scenario.options.map((o) => o.label);
      expect(new Set(labels).size).toBe(labels.length);
    }
  });
});
