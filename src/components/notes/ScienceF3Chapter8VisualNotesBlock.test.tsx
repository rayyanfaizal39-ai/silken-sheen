import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ScienceF3Chapter8VisualNotesBlock } from "./ScienceF3Chapter8VisualNotesBlock";
import { scienceF3C8Interactive } from "@/content/form3/science/chapter-8/interactive";
import { projectF3Interactive } from "@/content/form3/science/project-bilingual";
import { Chapter8Atom, Chapter8RadiationFields } from "./ScienceF3Chapter8LearningVisuals";

const scienceF3C8InteractiveBM = projectF3Interactive(scienceF3C8Interactive, "bm");
const scienceF3C8InteractiveDLP = projectF3Interactive(scienceF3C8Interactive, "dlp");

describe("ScienceF3Chapter8VisualNotesBlock", () => {
  it("renders the complete Malay visual-learning path", () => {
    const html = renderToStaticMarkup(createElement(ScienceF3Chapter8VisualNotesBlock, { id: "science-notes-content", content: scienceF3C8InteractiveBM, lang: "bm" }));
    expect(html).not.toContain("Lihat yang tidak kelihatan");
    expect(html).toContain("Sejarah Penemuan Keradioaktifan");
    expect(html).toContain("Separuh hayat: separuh, kemudian separuh lagi");
    expect(html).toContain("Atom dan Nukleus");
    expect(html).toContain("Kegunaan Sinaran Radioaktif");
    expect(html).toContain('id="science-notes-content"');
  });

  it("renders the same visual-learning path in English", () => {
    const html = renderToStaticMarkup(createElement(ScienceF3Chapter8VisualNotesBlock, { content: scienceF3C8InteractiveDLP, lang: "en" }));
    expect(html).not.toContain("See the invisible");
    expect(html).toContain("Discovery of Radioactivity");
    expect(html).toContain("Half-life: halve it, then halve it again");
    expect(html).toContain("Atom and Nucleus");
    expect(html).toContain("Uses of Radioactive Radiation");
  });

  it.each(["bm", "en"] as const)("renders the required concepts and retained activities in %s", (lang) => {
    const content = lang === "bm" ? scienceF3C8InteractiveBM : scienceF3C8InteractiveDLP;
    const html = renderToStaticMarkup(createElement(ScienceF3Chapter8VisualNotesBlock, { content, lang }));
    for (const text of ["1 Bq = 1", "1 Ci = 3.7 × 10¹⁰", "C-14", "Rn-222", "Th-234", "U-238", "1/2", "1/4", "1/8", "1/16", "800 Bq", "400 Bq", "200 Bq", "0.2 μSv/h", "Fermi", "Marie Curie", "5.000 g", "1 Sv = 1 joule"]) expect(html).toContain(text);
    for (const name of lang === "bm" ? ["Bahan radioaktif", "Pereputan radioaktif", "Neutron", "Proton", "Elektron", "Sumber semula jadi", "Sumber buatan manusia", "Televisyen", "Pengayaan", "Medan elektrik", "Medan magnet", "Songsangkan medan magnet"] : ["Radioactive substance", "Radioactive decay", "Neutron", "Proton", "Electron", "Natural sources", "Man-made sources", "Television", "Enrichment", "Electric field", "Magnetic field", "Reverse magnetic field"]) expect(html).toContain(name);
    expect(html).not.toMatch(/undefined|NaN|8\.\d\.\d|Three discoveries, three Nobel Prizes/);
    expect(html).toContain(lang === "bm" ? "Sinaran mengion: ultraungu" : "Ionising: ultraviolet");
    expect(html).not.toContain("tidak mengion: ultraungu");
    expect(html).toContain(content.sections[3].checks[0].question);
  });

  it.each(["bm", "en"] as const)("renders the final textbook classification, terminology and concrete controls in %s", lang => {
    const content = lang === "bm" ? scienceF3C8InteractiveBM : scienceF3C8InteractiveDLP;
    const html = renderToStaticMarkup(createElement(ScienceF3Chapter8VisualNotesBlock, { content, lang }));
    const nonIonising = html.match(/data-radiation-class="non-ionising"[^>]*>([^<]*)</)![1];
    const ionising = html.match(/data-radiation-class="ionising"[^>]*>([^<]*)</)![1];
    expect(nonIonising).not.toMatch(/ultraungu|ultraviolet/i);
    expect(ionising).toMatch(/ultraungu|ultraviolet/i);
    expect(nonIonising).toContain(lang === "bm" ? "gelombang frekuensi sangat rendah" : "very low frequency waves");
    for (const text of ["Becquerel (Bq)", "Curie (Ci)", "2 m", "Th-232", "U-235", "11 = 11"]) expect(html).toContain(text);
    if (lang === "bm") {
      expect(html).toContain("Sinaran Mengion dan Sinaran Tidak Mengion");
      for (const text of ["sinar gama", "sinaran latar belakang", "anti-ultraungu", "Karbon-14 (C-14)", "Radon-222 (Rn-222)", "Torium-234 (Th-234)", "Uranium-238 (U-238)", "pusat penyelidikan atom", "ketumpatannya tinggi"]) expect(html).toContain(text);
      expect(html).not.toMatch(/sinar gamma|lencana radiasi|dos radiasi|gumpalan darah|sinaran tak mengion/i);
    }
  });

  it.each([
    ["neutral", 11, 12, 11], ["cation", 11, 12, 10], ["anion", 17, 18, 18],
  ] as const)("shows all particles for %s without capping electron counts", (ion, p, n, e) => {
    const html = renderToStaticMarkup(createElement(Chapter8Atom, { ion, lang: "en" }));
    expect(html).toContain(`${p} protons, ${n} neutrons, ${e} electrons`);
    expect(html.match(/data-electron="true"/g)).toHaveLength(e);
  });

  it.each(["alpha", "beta", "gamma"] as const)("shows penetration and both field behaviours with %s selected", selected => {
    const html = renderToStaticMarkup(createElement(Chapter8RadiationFields, { selected, lang: "en" }));
    expect(html).toContain("negative plate above");
    expect(html).toContain("positive plate below");
    expect(html).toContain("alpha and beta opposite, gamma straight");
    expect(html).toContain('data-magnetic-orientation="in"');
    expect(html).toContain("orientation and particle motion");
    expect(html).toContain("≈ 3 mm");
    expect(html).toContain("≈ 10 cm");
  });
});
