import { describe, expect, it } from "vitest";
import { geographyF2C2Notes } from "./notes";
import { quizzes } from "@/data/content";

function flattenText(notes: typeof geographyF2C2Notes): string {
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

describe("Geography Form 2 Chapter 2 (Peta Topografi) textbook/DSKP audit regressions", () => {
  const notesText = flattenText(geographyF2C2Notes);

  it("F1/F4/F5: Contoh Tafsiran uses the correct place names and grid reference", () => {
    expect(notesText).toContain("Jerteh");
    expect(notesText).not.toContain("Jertih");
    expect(notesText).toContain("Ladang Baharu");
    expect(notesText).not.toContain("Bauharu");
    expect(notesText).toContain("grid 6605");
    expect(notesText).not.toContain("6105");
  });

  it("F2/F3: Contoh Tafsiran lists the real fizikal features and tanah-pamah usage", () => {
    expect(notesText).toContain("hutan");
    expect(notesText).toContain("paya nipah");
    expect(notesText).toContain("Sungai Nering");
    expect(notesText).toContain("Kawasan tanah pamah digunakan untuk petempatan, pengangkutan dan pertanian");
    expect(notesText).toContain("Pekan Jabir");
    expect(notesText).toContain("petempatan berpusat");
  });

  it("F6/F12/F13: comparison-table cells match the textbook (and interactive.ts)", () => {
    expect(notesText).toContain("Pelancongan: Kemudahan penginapan");
    expect(notesText).not.toContain("Pengangkutan: Kemudahan pengangkutan terhad");
    expect(notesText).not.toContain("Petempatan: Bandar");
    expect(notesText).toContain("Petempatan nelayan");
    expect(notesText).not.toContain("Penangkapan nelayan");
  });

  it("F7/F8/F9: physical and cultural symbol lists are complete, non-duplicated and correctly categorised", () => {
    expect(notesText).not.toMatch(/Bukit \(kontur\),\s*Bukit \(kontur\)/);
    expect(notesText).toContain("Belukar");
    expect(notesText).toContain("Tanjung");
    expect(notesText).toContain("Jalan kereta api");
    expect(notesText).toContain("Getah");
    expect(notesText).not.toContain("Kemudahan sosial: Masjid, Kelapa sawit");
  });

  it("F11: the RG 4-angka explanation is a well-formed sentence, not a garbled repeat", () => {
    expect(notesText).toContain("Nilai garisan timuran hendaklah dibaca dahulu, diikuti nilai garisan utaraan.");
    expect(notesText).not.toMatch(/nilai garisan utaraan hendaklah dibaca dahulu/);
  });

  it("F14: JUPEM's full function list is present, with no typo", () => {
    expect(notesText).toContain("perancangan");
    expect(notesText).toContain("pembangunan");
    expect(notesText).toContain("pemantauan");
    expect(notesText).toContain("keselamatan");
    expect(notesText).not.toContain("pemulihardan");
  });

  it("F4 (quiz): geo-f2-c2-q28 uses the correct place-name spelling", () => {
    const question = quizzes.find((q) => q.id === "geo-f2-c2-q28");
    expect(question?.question).toContain("Jerteh");
    expect(question?.question).not.toContain("Jertih");
  });
});
