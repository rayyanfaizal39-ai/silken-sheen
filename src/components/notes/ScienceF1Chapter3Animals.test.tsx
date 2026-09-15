import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { chapter3Content } from "@/content/form1/science/chapter-3/chapter3-content";
import { AnimalDetail, Chapter3AnimalHomeostasis } from "./blocks/Chapter3AnimalHomeostasis";
import { ScienceF1Chapter3VisualNotesBlock } from "./ScienceF1Chapter3VisualNotesBlock";

const escape = (s: string) => s.replaceAll("&", "&amp;").replaceAll("'", "&#x27;");
const geometry = (html: string) =>
  Array.from(html.matchAll(/<(?:svg|g|path|circle|ellipse|rect|text)\b[^>]*>/g), (m) =>
    m[0].replace(/ aria-label="[^"]*"/g, ""),
  ).join("\n");
const diagram = (html: string, state: string) =>
  html.match(new RegExp(`<svg[^>]*data-animal-diagram="${state}"[\\s\\S]*?</svg>`))![0];

describe("Chapter 3 animal homeostasis", () => {
  for (const lang of ["bm", "en"] as const) {
    const content = chapter3Content[lang];
    const render = (selected: number) =>
      renderToStaticMarkup(<AnimalDetail content={content} lang={lang} selected={selected} />);
    it(`${lang}: live Notes includes five accessible animal selectors and summary categories`, () => {
      const html = renderToStaticMarkup(
        <Chapter3AnimalHomeostasis content={content} lang={lang} />,
      );
      expect(html.match(/<button /g)).toHaveLength(5);
      expect(html.match(/aria-pressed="true"/g)).toHaveLength(1);
      expect(html.match(/aria-controls=/g)).toHaveLength(5);
      for (const animal of content.animalHomeostasis) expect(html).toContain(escape(animal.animal));
      expect(html).toContain(lang === "bm" ? "Kawal atur suhu" : "Temperature control");
      expect(html).toContain(lang === "bm" ? "Kawal atur kehilangan air" : "Water-loss control");
      expect(html).toContain('aria-live="polite"');
      expect(
        renderToStaticMarkup(
          <ScienceF1Chapter3VisualNotesBlock content={chapter3Content} lang={lang} />,
        ),
      ).toContain('data-animal-homeostasis="true"');
    });
    it(`${lang}: each selection changes the visual and consumes its original adaptation`, () => {
      for (let selected = 0; selected < 5; selected++) {
        const html = render(selected);
        expect(html).toContain(`data-animal-selection="${selected}"`);
        expect(html).toContain(escape(content.animalHomeostasis[selected].adaptation));
        expect(html.match(/<svg /g)).toHaveLength(2);
        expect(html).not.toMatch(/🐕|🦎|🐌|🐝|<title/);
      }
      expect(render(0)).not.toContain("data-snail-body");
      expect(render(3)).not.toContain("data-bee-body");
    });
    it(`${lang}: pets show wet fur, extended tongue, evaporation and erect fur with trapped air`, () => {
      const hot = diagram(render(0), "pets-hot");
      const cold = diagram(render(0), "pets-cold");
      expect(hot).toContain('data-pet="cat"');
      expect(hot).toContain('data-pet="dog"');
      expect(hot).toContain('data-wet-fur="true"');
      expect(hot).toContain('data-tongue="extended-to-fur"');
      expect(hot).toContain('data-evaporation="visible"');
      expect(hot).toContain('data-tongue-evaporation="true"');
      expect(cold).toContain('data-fur="erect"');
      expect(cold).toContain('data-trapped-air="insulation"');
      expect(cold).toContain('rx="132"');
      expect(cold).toContain("l-3 -20");
      expect(cold).not.toContain("data-evaporation");
      expect(render(0)).not.toMatch(/sweat|berpeluh|kelenjar peluh/i);
    });
    it(`${lang}: both lizard states share an outline, with distinct activity and temperature cues`, () => {
      const html = render(1);
      const cold = diagram(html, "lizard-cold");
      const hot = diagram(html, "lizard-hot");
      const body = (s: string) => s.match(/<g data-lizard-body="shared"[\s\S]*?<\/g>/)![0];
      expect(body(cold)).toBe(body(hot));
      expect(cold).toContain('data-activity-speed="slower"');
      expect(hot).toContain('data-activity-speed="faster"');
      expect(cold).toContain('data-body-temperature="lower"');
      expect(hot).toContain('data-body-temperature="higher"');
      expect(hot).toContain('data-heartbeat="faster"');
      expect(cold).not.toContain("data-heartbeat");
      expect(render(1)).not.toBe(render(2));
      expect(html).not.toMatch(/bask|shade|berjemur|berteduh/i);
    });
    it(`${lang}: snail shows fluid, evaporation and reduced loss in a humid location`, () => {
      const dry = diagram(render(3), "snail-dry");
      const humid = diagram(render(3), "snail-humid");
      expect(dry).toContain('data-fluid="true"');
      expect(dry).toContain('data-evaporation="visible"');
      expect(humid).toContain('data-humid-location="true"');
      expect(humid).toContain('data-evaporation="reduced"');
      expect(render(3)).not.toMatch(/aestivation|estivation|shell seal|menutup cangkerang/i);
    });
    it(`${lang}: bee surface shows wax and spiracles open for exchange or closed to reduce water loss`, () => {
      const open = diagram(render(4), "bee-open");
      const closed = diagram(render(4), "bee-closed");
      for (const html of [open, closed]) {
        expect(html).toContain('data-waxy-layer="true"');
        expect(html).toContain('data-spiracle-locations="simplified"');
      }
      expect(open).toContain('data-spiracle="open"');
      expect(open).toContain('data-gas-exchange="true"');
      expect(open).toContain('data-water-vapour-escape="true"');
      expect(closed).toContain('data-spiracle="closed"');
      expect(closed).not.toContain("data-gas-exchange");
      expect(closed).not.toContain("data-water-vapour-escape");
      expect(render(4)).not.toMatch(/trache|trake/i);
    });
  }
  it("all five selections share identical BM/DLP SVG geometry", () => {
    for (let selected = 0; selected < 5; selected++) {
      const bm = renderToStaticMarkup(
        <AnimalDetail content={chapter3Content.bm} lang="bm" selected={selected} />,
      );
      const en = renderToStaticMarkup(
        <AnimalDetail content={chapter3Content.en} lang="en" selected={selected} />,
      );
      expect(geometry(bm)).toBe(geometry(en));
    }
  });
  it("names and factual explanations react to source changes without a second animal dataset", () => {
    const content = structuredClone(chapter3Content.en);
    content.animalHomeostasis.forEach((animal, index) => {
      animal.animal = `SOURCE NAME ${index}`;
      animal.adaptation = `SOURCE ADAPTATION ${index}`;
    });
    const html = renderToStaticMarkup(<Chapter3AnimalHomeostasis content={content} lang="en" />);
    for (let selected = 0; selected < 5; selected++) {
      expect(html).toContain(`SOURCE NAME ${selected}`);
      const detail = renderToStaticMarkup(
        <AnimalDetail content={content} lang="en" selected={selected} />,
      );
      expect(detail).toContain(`SOURCE ADAPTATION ${selected}`);
      for (const animal of chapter3Content.en.animalHomeostasis)
        expect(detail).not.toContain(escape(animal.adaptation));
    }
  });
});
