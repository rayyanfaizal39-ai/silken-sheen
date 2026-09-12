import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ScienceF3Chapter4VisualNotesBlock } from "./ScienceF3Chapter4VisualNotesBlock";
import { scienceF3C4InteractiveBM } from "@/content/form3/science/chapter-4/interactive-bm";
import { scienceF3C4InteractiveDLP } from "@/content/form3/science/chapter-4/interactive-dlp";
import { scienceF3C4NotesBM } from "@/content/form3/science/chapter-4/notes-bm";
import { scienceF3C4NotesDLP } from "@/content/form3/science/chapter-4/notes-dlp";
import { scienceF3Chapter4Source, chapter4Lesson } from "@/content/form3/science/chapter-4/chapter4-content";
import { scienceF3Chapters } from "@/content/form3/science/chapter-data";

describe("ScienceF3Chapter4VisualNotesBlock", () => {
  it("wires every shared Chapter 4 fact into normal and interactive notes in both languages", () => {
    expect(scienceF3Chapters.find(chapter => chapter.chapter === 4)).toBe(scienceF3Chapter4Source);
    for (const [lang, notes, interactive] of [
      ["bm", scienceF3C4NotesBM, scienceF3C4InteractiveBM],
      ["dlp", scienceF3C4NotesDLP, scienceF3C4InteractiveDLP],
    ] as const) {
      scienceF3Chapter4Source.subtopics.forEach((subtopic, index) => {
        const section = notes.sections![index + 2];
        expect(section.subsections![0].bulletPoints).toHaveLength(subtopic.facts.length);
        subtopic.facts.forEach(fact => {
          expect(section.subsections![0].bulletPoints!.some(point => point.includes(fact.statement[lang]))).toBe(true);
          expect(interactive.sections[index].cards).toContainEqual({ title: fact.term[lang], body: fact.statement[lang] });
        });
      });
      const hydrogen = chapter4Lesson("hydrogen", lang).body;
      expect(hydrogen).toContain(lang === "bm" ? "aluminium oksida dan zink oksida" : "aluminium oxide and zinc oxide");
      expect(hydrogen).toContain(lang === "bm" ? "ferum, plumbum dan kuprum" : "iron, lead and copper");
      expect(hydrogen).toContain("Zn > H > Fe");
      const reduction = chapter4Lesson("reduction", lang);
      expect(reduction.body).toContain(lang === "bm" ? "Ferum(III) oksida + karbon → ferum + karbon dioksida" : "Iron(III) oxide + carbon → iron + carbon dioxide");
      expect(reduction.body).toContain(lang === "bm" ? "Ferum(III) oksida + karbon monoksida → ferum + karbon dioksida" : "Iron(III) oxide + carbon monoxide → iron + carbon dioxide");
      expect(interactive.sections[2].sequence!.steps).toContainEqual(reduction);
      expect(interactive.sections[2].toggles![0].options.map(option => option.label)).toEqual(
        ["electrolysis", "carbon-extraction", "direct-heat", "native"].map(id => chapter4Lesson(id, lang).title),
      );
    }
  });
  it("renders the Malay minerals-to-extraction learning journey", () => {
    const html=renderToStaticMarkup(createElement(ScienceF3Chapter4VisualNotesBlock,{id:"science-notes-content",content:scienceF3C4InteractiveBM,lang:"bm"}));
    expect(html).toContain("Kereaktifan Logam");
    expect(html).toContain("Kepelbagaian mineral, siri kereaktifan logam dan pengekstrakan logam daripada bijihnya.");
    expect(html).toContain("4.1 Kepelbagaian Mineral");
    expect(html).toContain("Definisi dan Konsep Mineral");
    expect(html).toContain("4.2 Siri Kereaktifan Logam");
    expect(html).toContain("Konsep Kereaktifan Logam terhadap Oksigen");
    expect(html).toContain("4.3 Pengekstrakan Logam daripada Bijihnya");
    expect(html).toContain("Definisi Pengekstrakan Logam");
    expect(html).toContain("Buktikan batu kapur ialah sebatian");
    expect(html).toContain("Aktiviti 4.3");
    expect(html).toContain("Kedudukan Karbon dalam Siri Kereaktifan Logam");
    expect(html).toContain("Jika karbon boleh menyingkirkan oksigen daripada oksida logam, karbon lebih reaktif daripada logam tersebut. Jika karbon tidak boleh menyingkirkan oksigen daripada oksida logam, karbon kurang reaktif daripada logam tersebut.");
    expect(html).toContain("Tiada tindak balas");
    expect(html).toContain("Karbon kurang reaktif daripada aluminium");
    expect(html).toContain("Al &gt; C &gt; Zn &gt; Pb");
    expect(html).toContain("Karbon boleh menurunkan ZnO dan PbO tetapi tidak Al₂O₃. Di manakah kedudukan karbon dalam siri kereaktifan?");
    expect(html).not.toContain("Karbon berada di bawah aluminium tetapi di atas zink dan plumbum.");
    expect(html).toContain("Kedudukan Hidrogen dalam Siri Kereaktifan Logam");
    expect(html).toContain("Kedudukan hidrogen dalam siri kereaktifan logam boleh ditentukan melalui interpretasi data tindak balas hidrogen dengan oksida logam.");
    expect(html).toContain("Al &gt; C &gt; Zn &gt; H &gt; Fe &gt; Sn &gt; Pb &gt; Cu");
    expect(html).not.toContain("Letakkan karbon");
    expect(html).not.toContain("Letakkan hidrogen");
    expect(html).not.toContain("kaedah yang sama");
    expect(html).toContain("Siri kereaktifan lengkap");
    expect(html).toContain("relau bagas");
    expect(html).not.toContain("Fahami bagaimana kereaktifan menentukan segalanya");
    expect(html).toContain("id=\"science-notes-content\"");
  });

  it("renders the same learning journey in English", () => {
    const html=renderToStaticMarkup(createElement(ScienceF3Chapter4VisualNotesBlock,{content:scienceF3C4InteractiveDLP,lang:"en"}));
    expect(html).toContain("Reactivity of Metals");
    expect(html).toContain("Variety of minerals, reactivity series of metals and extraction of metals from their ores.");
    expect(html).toContain("4.1 Variety of Minerals");
    expect(html).toContain("Definition and Concept of Minerals");
    expect(html).toContain("4.2 Reactivity Series of Metals");
    expect(html).toContain("Concept of Metal Reactivity towards Oxygen");
    expect(html).toContain("4.3 Extraction of Metals from their Ores");
    expect(html).toContain("Definition of Metal Extraction");
    expect(html).toContain("Prove limestone is a compound");
    expect(html).toContain("Activity 4.3");
    expect(html).toContain("Position of Carbon in the Reactivity Series of Metals");
    expect(html).toContain("Position of Hydrogen in the Reactivity Series of Metals");
    expect(html).not.toContain("Place carbon");
    expect(html).not.toContain("Place hydrogen");
    expect(html).not.toContain("same reasoning");
    expect(html).toContain("Complete reactivity series");
    expect(html).toContain("blast furnace");
    expect(html).not.toContain("Understand how reactivity determines everything");
  });
});
