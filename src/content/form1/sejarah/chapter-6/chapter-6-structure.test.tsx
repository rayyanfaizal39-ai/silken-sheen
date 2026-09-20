import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { SejChapter6NotesBlock } from "@/components/notes/SejChapter6NotesBlock";
import { sej6Content } from "./sej6-content";

function renderSection(initialSection: number) {
  return renderToStaticMarkup(
    createElement(SejChapter6NotesBlock, {
      content: sej6Content,
      initialSection,
    }),
  );
}

describe("Sejarah Form 1 Bab 6 canonical structure", () => {
  it("renders exactly the four official subtopics 6.1-6.4", () => {
    expect(sej6Content.officialSubtopics.map(({ number }) => number)).toEqual([
      "6.1",
      "6.2",
      "6.3",
      "6.4",
    ]);

    const markup = renderSection(0);
    expect(markup.match(/data-official-subtopic="6\.[1-4]"/g)).toHaveLength(4);
    expect(markup).toContain("6.1 Tamadun Yunani");
    expect(markup).toContain("6.2 Pemerintahan dan Pentadbiran Yunani");
    expect(markup).toContain("6.3 Tamadun Rom");
    expect(markup).toContain("6.4 Seni Bina Rom");
  });

  it("does not render false learner-facing subtopics 6.5, 6.6 or 6.7", () => {
    const allSections = Array.from({ length: 5 }, (_, index) => renderSection(index)).join("\n");
    expect(allSections).not.toMatch(/data-official-subtopic="6\.[567]"/);
    expect(allSections).not.toMatch(/>6\.[567]\s/);
  });

  it("keeps Konsep Polis and its existing visuals under 6.1", () => {
    const section = renderSection(0);
    expect(section).toContain('data-section-number="6.1"');
    expect(section).toContain("Konsep Polis");
    expect(section).toContain('data-visual="polis-image"');
    expect(section).toContain('data-visual="polis-comparison"');
    expect(renderSection(1)).not.toContain('data-visual="polis-image"');
  });

  it("keeps all five Greek government systems under 6.2", () => {
    expect(sej6Content.greekGovernment.fiveSystems.map(({ name }) => name)).toEqual([
      "Monarki",
      "Oligarki",
      "Aristokrasi",
      "Tirani",
      "Demokrasi",
    ]);

    const section = renderSection(1);
    expect(section).toContain('data-section-number="6.2"');
    expect(section).toContain('data-visual="government-system-visual"');
    for (const system of sej6Content.greekGovernment.fiveSystems) {
      expect(section).toContain(system.name);
    }
  });

  it("renders complete Athens administration and its hierarchy under 6.2", () => {
    const names = sej6Content.greekGovernment.athensAdministration.bodies.map(({ name }) => name);
    expect(names).toEqual(["Dewan Perhimpunan", "Majlis", "Majistret", "Juri"]);

    const section = renderSection(1);
    expect(section).toContain('data-visual="dewan-hierarchy-visual"');
    for (const body of sej6Content.greekGovernment.athensAdministration.bodies) {
      expect(body.membership.length).toBeGreaterThan(0);
      expect(body.functions.length).toBeGreaterThan(0);
      expect(section).toContain(body.name);
      expect(section).toContain(body.membership[0]);
      expect(section).toContain(body.functions[0]);
    }
  });

  it("renders Sparta administration under 6.2 with the textbook numbers", () => {
    const sparta = sej6Content.greekGovernment.spartaAdministration;
    expect(sparta.kings.count).toBe(2);
    expect(sparta.ephors.count).toBe(5);
    expect(sparta.assembly.membership).toContain("10,000");
    expect(sparta.council.membership).toContain("28");
    expect(sparta.council.age).toContain("60");
    expect(sparta.council.term).toContain("seumur hidup");

    const section = renderSection(1);
    expect(section).toContain("Pemerintahan dan Pentadbiran Sparta");
    expect(section).toContain("Eurypontids");
    expect(section).toContain("Agiads");
    expect(section).toContain("ephors");
  });

  it("renders the Roman eras and Pax Romana under 6.3", () => {
    const section = renderSection(2);
    expect(section).toContain('data-section-number="6.3"');
    expect(section).toContain('data-visual="roman-era-timeline"');
    for (const era of sej6Content.romanCivilisation.eras) {
      expect(section).toContain(era.name);
      expect(section).toContain(era.duration);
    }
    expect(section).toContain("Pax Romana");
  });

  it("models Roman society as exactly Patrician, Plebian and Golongan hamba", () => {
    expect(sej6Content.romanCivilisation.socialGroups).toEqual([
      { name: "Patrician", composition: "Golongan atasan" },
      { name: "Plebian", composition: "Petani, artisan dan peniaga" },
      { name: "Golongan hamba", composition: "Golongan hamba" },
    ]);

    const section = renderSection(2);
    expect(section).toContain("Patrician");
    expect(section).toContain("Plebian");
    expect(section).toContain("Golongan hamba");
  });

  it("renders all seven Roman architecture examples under 6.4", () => {
    const buildings = sej6Content.romanArchitecture.buildings;
    expect(buildings).toHaveLength(7);

    const section = renderSection(3);
    expect(section).toContain('data-section-number="6.4"');
    expect(section).toContain('data-visual="roman-architecture-image"');
    expect(section).toContain('data-visual="roman-architecture-cards"');
    for (const building of buildings) {
      expect(section).toContain(building.name);
      expect(section).toContain(building.function);
      expect(building.details.length).toBeGreaterThan(0);
    }
    expect(section).toContain("Jalan Raya Rom");
    expect(section).toContain("Tembok Hadrian");
    expect(section).toContain("Tempat Mandi Awam Caracalla");
  });

  it("keeps Rumusan as the fifth, unnumbered section", () => {
    const section = renderSection(4);
    expect(sej6Content.summary.title).toBe("Rumusan");
    expect(section).toContain('data-summary-section="true"');
    expect(section).not.toContain('data-section-number="6.5"');
  });
});
