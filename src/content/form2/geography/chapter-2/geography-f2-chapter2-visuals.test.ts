import { describe, expect, it } from "vitest";
import { geographyF2C2Interactive } from "./interactive";

/** The exact 20 symbols shown in the textbook's Rajah 2.3 (p.23/PDF p.31). */
const RAJAH_2_3_FIZIKAL = [
  "belukar", "kontur", "tasik", "sungai", "rumput", "hutan", "paya-nipah", "paya-bakau", "tanjung", "bukit",
].sort();
const RAJAH_2_3_BUDAYA = [
  "jalan-raya", "jambatan", "jalan-kereta-api", "getah", "masjid", "kelapa-sawit", "kuil", "padi-sawah", "tokong", "gereja",
].sort();

function section(number: string) {
  const s = geographyF2C2Interactive.sections.find((sec) => sec.number === number);
  if (!s) throw new Error(`section ${number} not found`);
  return s;
}

describe("Geography Form 2 Chapter 2 — Phase 5 visual additions", () => {
  it("2.4 map-symbol legend has exactly the textbook's Rajah 2.3 symbols, no duplicates, correctly split fizikal/budaya", () => {
    const legend = section("2.4").mapSymbolLegend;
    expect(legend).toBeDefined();

    const fizikalIds = legend!.fizikal.map((i) => i.id).sort();
    const budayaIds = legend!.budaya.map((i) => i.id).sort();

    expect(fizikalIds).toEqual(RAJAH_2_3_FIZIKAL);
    expect(budayaIds).toEqual(RAJAH_2_3_BUDAYA);
    expect(new Set(fizikalIds).size).toBe(fizikalIds.length);
    expect(new Set(budayaIds).size).toBe(budayaIds.length);
  });

  it("2.2 has the garisan timuran/utaraan diagram and an Ingat! callout", () => {
    const s = section("2.2");
    expect(s.gridAxisDiagram).toBe(true);
    expect(s.callouts?.some((c) => c.variant === "ingat")).toBe(true);
  });

  it("2.3 has a Fakta Penting (reading order) and a Kesilapan Lazim callout", () => {
    const s = section("2.3");
    expect(s.callouts?.some((c) => c.variant === "fakta-penting")).toBe(true);
    expect(s.callouts?.some((c) => c.variant === "kesilapan-lazim")).toBe(true);
    // The working GridReferenceReader from the prior phase must be untouched.
    expect(s.gridReference).toBeDefined();
  });

  it("2.5 has the interactive Peta Jerteh recreation", () => {
    const s = section("2.5");
    expect(s.interactiveJertehMap).toBe(true);
  });

  it("2.1 presents the three mandatory elements as cards instead of prose-only", () => {
    const s = section("2.1");
    expect(s.cards?.length).toBe(3);
    const titles = s.cards!.map((c) => c.title).join(" ");
    expect(titles).toMatch(/Tajuk/);
    expect(titles).toMatch(/Petunjuk/);
    expect(titles).toMatch(/Skala/);
  });

  it("callouts stay restrained — at most 2 per section, only in sections that need them", () => {
    for (const s of geographyF2C2Interactive.sections) {
      expect((s.callouts ?? []).length, s.number).toBeLessThanOrEqual(2);
    }
  });
});
