import { describe, expect, it } from "vitest";
import { scienceEmphasisParts, stripEmphasis } from "@/components/notes/blocks/ScienceEmphasis";
import { scienceF2C6InteractiveBM } from "./interactive-bm";
import { scienceF2C6InteractiveDLP } from "./interactive-dlp";
import type { ScienceF2InteractiveContent } from "../interactive-types";

/**
 * Guards the transfer of the Sains Tingkatan 2 / DLP textbook's own emphasis
 * into Chapter 6 (Acids and Alkalis).
 *
 * As with Chapter 1, 11 and 12's guards: the pass only adds `**markers**`
 * around wording AcadeMY already had, so most of this file checks what did NOT
 * change — strip the markers back out and every touched string must be
 * byte-identical to what it was before.
 */

const STREAMS: [string, ScienceF2InteractiveContent][] = [
  ["BM", scienceF2C6InteractiveBM],
  ["DLP", scienceF2C6InteractiveDLP],
];

/** Every learner-facing string in the chapter, with the field path that holds it. */
function allStrings(content: ScienceF2InteractiveContent): [string, string][] {
  const out: [string, string][] = [];
  const walk = (node: unknown, path: string) => {
    if (typeof node === "string") out.push([path, node]);
    else if (Array.isArray(node)) node.forEach((item, i) => walk(item, `${path}[${i}]`));
    else if (node && typeof node === "object") {
      for (const [key, value] of Object.entries(node)) walk(value, `${path}.${key}`);
    }
  };
  walk(content, "content");
  return out;
}

/** The exact set of terms each stream is expected to have marked (order-independent). */
const EXPECTED: Record<string, string[]> = {
  BM: [
    "bermaksud masam",
    "bermaksud abu tumbuhan",
    "epal dan kopi",
    "Soda penaik",
    "kehadiran air",
    "bertindak balas dengan logam",
    "gas hidrogen terhasil",
    "bahan pewarna yang menukar warna",
    "0 hingga 14",
    "pH 7 sebagai neutral",
    "kepekatan yang sama",
    "cuka dalam masakan",
    "magnesium hidroksida",
    "Larutan ammonia",
    "Kapur mati",
    "Asid sulfurik",
    "merawat sisa kilang yang berasid",
    "Asid + Alkali → Garam + Air",
    "natrium klorida",
    "kalium sulfat",
    "natrium nitrat",
    "bahan beralkali yang meneutralkan asid itu",
    "karies gigi",
    "bersifat asid",
    "menurunkan nilai pH fabrik",
    "sedikit berasid",
    "sedikit beralkali",
    "Pembersih muka yang beralkali",
    "penyegar berasid",
    "kapur mati yang bersifat alkali",
    "Bahan buangan berasid daripada kilang dirawat dengan alkali",
  ],
  DLP: [
    "meaning sour",
    "meaning ashes of plants",
    "apples and coffee",
    "Baking soda",
    "the presence of water",
    "reacts with a metal such as magnesium or zinc",
    "hydrogen gas is produced",
    "a colouring that changes colour",
    "0 to 14",
    "pH 7 as neutral",
    "the same concentration",
    "vinegar in cooking",
    "magnesium hydroxide",
    "Ammonia solution",
    "slaked lime",
    "Sulphuric acid",
    "treat acidic factory waste",
    "Acid + Alkali → Salt + Water",
    "sodium chloride",
    "potassium sulphate",
    "sodium nitrate",
    "alkaline substance that neutralises that acid",
    "dental caries",
    "is acidic",
    "lowers the pH of the fabric",
    "slightly acidic",
    "slightly alkaline",
    "alkaline face cleanser",
    "acidic toner",
    "alkaline slaked lime",
    "Acidic waste from factories is treated with alkalis",
  ],
};

/** Field path -> the exact original wording (before markers were added). */
const ORIGINALS: Record<string, Record<string, string>> = {
  BM: {
    "content.sections[0].intro":
      "Perkataan \"asid\" berasal daripada perkataan Latin acidus, bermaksud masam. Perkataan \"alkali\" berasal daripada perkataan Arab al-qali, bermaksud abu tumbuhan. Bahan yang mengandungi asid dipanggil bahan berasid; bahan yang mengandungi alkali dipanggil bahan beralkali.",
    "content.sections[0].cards[0].body":
      "Bahan yang mengandungi asid. Banyak terdapat di dapur — epal dan kopi ialah bahan berasid, begitu juga cuka dan jus limau.",
    "content.sections[0].cards[1].body":
      "Bahan yang mengandungi alkali. Soda penaik ialah bahan beralkali, begitu juga sabun dan pencuci pinggan.",
    "content.sections[1].remember":
      "Asid dan alkali hanya menunjukkan sifatnya dengan kehadiran air.",
    "content.sections[2].cards[0].body":
      "Apabila asid bertindak balas dengan logam seperti magnesium atau zink, gas hidrogen terhasil. Kayu uji menyala menghasilkan bunyi 'pop' apabila didekatkan kepada gas hidrogen.",
    "content.sections[3].intro":
      "Penunjuk ialah bahan pewarna yang menukar warna mengikut bahan yang diujinya. Penunjuk yang berbeza memberitahu anda perkara yang berbeza — sesetengahnya hanya memberitahu asid atau alkali, sesetengahnya memberikan nilai pH.",
    "content.sections[4].intro":
      "Skala pH menunjukkan sejauh mana sesuatu larutan itu berasid atau beralkali. Julat nilainya adalah antara 0 hingga 14, dengan pH 7 sebagai neutral. Semakin rendah nilai pH, semakin berasid larutan itu; semakin tinggi nilai pH, semakin beralkali.",
    "content.sections[5].intro":
      "Nilai pH memberitahu sejauh mana sesuatu larutan itu berasid — tetapi untuk membandingkan kekuatan bahan itu sendiri, kita perlu membandingkannya secara adil, iaitu pada kepekatan yang sama.",
    "content.sections[6].cards[0].body":
      "Asid: cuka dalam masakan, minuman bergas (asid karbonik), jeruk (asid tartarik). Alkali: sabun mandi (kalium hidroksida), pencuci pinggan, pil antasid (magnesium hidroksida).",
    "content.sections[6].cards[1].body":
      "Larutan ammonia digunakan untuk menghasilkan baja bagi menyuburkan tanaman. Kapur mati yang beralkali ditaburkan untuk merawat tanah yang terlalu berasid supaya tanaman dapat tumbuh dengan subur.",
    "content.sections[6].cards[2].body":
      "Asid sulfurik digunakan di dalam bateri kereta. Natrium hidroksida digunakan untuk menghasilkan detergen. Alkali juga digunakan untuk merawat sisa kilang yang berasid sebelum ia dilepaskan ke sungai.",
    "content.sections[7].cards[0].body":
      "Asid + Alkali → Garam + Air",
    "content.sections[7].cards[1].body":
      "Menghasilkan natrium klorida dan air.",
    "content.sections[7].cards[2].body":
      "Menghasilkan kalium sulfat dan air.",
    "content.sections[7].cards[3].body":
      "Menghasilkan natrium nitrat dan air.",
    "content.sections[8].accordions[0].body":
      "Bakteria di dalam mulut menghasilkan asid yang mengakis gigi. Ubat gigi mengandungi bahan beralkali yang meneutralkan asid itu, membantu mencegah karies gigi.",
    "content.sections[8].accordions[1].body":
      "Serbuk pencuci menjadikan fabrik beralkali selepas dibasuh. Pelembut fabrik bersifat asid, jadi ia menurunkan nilai pH fabrik dengan meneutralkan baki beralkali itu — menjadikan fabrik lembut.",
    "content.sections[8].accordions[2].body":
      "Rambut yang sihat berada dalam keadaan sedikit berasid, tetapi syampu biasanya sedikit beralkali. Perapi rambut yang sedikit berasid meneutralkan baki syampu pada rambut, menjadikan rambut lembut dan sihat.",
    "content.sections[8].accordions[3].body":
      "Pembersih muka yang beralkali akan menjadikan kulit muka kering. Oleh itu, penyegar berasid digunakan untuk meneutralkan semula kulit muka.",
    "content.sections[8].accordions[4].body":
      "Tanah yang berasid dapat dirawat dengan menabur kapur mati yang bersifat alkali, supaya tanaman dapat tumbuh dengan subur.",
    "content.sections[8].accordions[5].body":
      "Bahan buangan berasid daripada kilang dirawat dengan alkali sebelum dibebaskan ke sungai, supaya ia tidak menjejaskan hidupan akuatik.",
  },
  DLP: {
    "content.sections[0].intro":
      "The word \"acid\" comes from the Latin acidus, meaning sour. \"Alkali\" comes from the Arabic al-qali, meaning ashes of plants. A substance containing acid is called an acidic substance; a substance containing alkali is called an alkaline substance.",
    "content.sections[0].cards[0].body":
      "Substances that contain acid. Many are in the kitchen — apples and coffee are acidic substances, and so are vinegar and lime juice.",
    "content.sections[0].cards[1].body":
      "Substances that contain alkali. Baking soda is an alkaline substance, and so are soap and dishwashing liquid.",
    "content.sections[1].remember":
      "Acids and alkalis only show their properties in the presence of water.",
    "content.sections[2].cards[0].body":
      "When an acid reacts with a metal such as magnesium or zinc, hydrogen gas is produced. A lit splinter makes a 'pop' sound when brought near hydrogen gas.",
    "content.sections[3].intro":
      "An indicator is a colouring that changes colour according to the substance being tested. Different indicators tell you different things — some only tell you acid or alkali, others give you a pH value.",
    "content.sections[4].intro":
      "The pH scale shows how acidic or alkaline a solution is. Its values range from 0 to 14, with pH 7 as neutral. The lower the pH value, the more acidic the solution; the higher the pH value, the more alkaline.",
    "content.sections[5].intro":
      "The pH value tells you how acidic a solution is — but to compare the strength of the substances themselves, we have to compare them fairly, at the same concentration.",
    "content.sections[6].cards[0].body":
      "Acids: vinegar in cooking, fizzy drinks (carbonic acid), pickles (tartaric acid). Alkalis: bath soap (potassium hydroxide), dishwashing liquid, antacid pills (magnesium hydroxide).",
    "content.sections[6].cards[1].body":
      "Ammonia solution is used to produce fertiliser to help crops grow. Alkaline slaked lime is spread to treat soil that has become too acidic, so that crops can grow well.",
    "content.sections[6].cards[2].body":
      "Sulphuric acid is used in car batteries. Sodium hydroxide is used to make detergents. Alkalis are also used to treat acidic factory waste before it is released into rivers.",
    "content.sections[7].cards[0].body":
      "Acid + Alkali → Salt + Water",
    "content.sections[7].cards[1].body":
      "Produces sodium chloride and water.",
    "content.sections[7].cards[2].body":
      "Produces potassium sulphate and water.",
    "content.sections[7].cards[3].body":
      "Produces sodium nitrate and water.",
    "content.sections[8].accordions[0].body":
      "Bacteria in the mouth produce acid that erodes teeth. Toothpaste contains an alkaline substance that neutralises that acid, helping to prevent dental caries.",
    "content.sections[8].accordions[1].body":
      "Detergent powder leaves fabric alkaline after washing. Fabric softener is acidic, so it lowers the pH of the fabric by neutralising that alkaline residue — leaving the fabric soft.",
    "content.sections[8].accordions[2].body":
      "Healthy hair is slightly acidic, but shampoo is usually slightly alkaline. A mildly acidic conditioner neutralises the shampoo residue on the hair, leaving it soft and healthy.",
    "content.sections[8].accordions[3].body":
      "An alkaline face cleanser leaves facial skin dry. An acidic toner is therefore used to neutralise the skin again.",
    "content.sections[8].accordions[4].body":
      "Acidic soil can be treated by spreading alkaline slaked lime, so that crops can grow well.",
    "content.sections[8].accordions[5].body":
      "Acidic waste from factories is treated with alkalis before being released into rivers, so that it does not harm aquatic life.",
  },
};

/** Only these field-path suffixes are wired to render through ScienceEmphasis. */
const ALLOWED_FIELD = /\.(body|intro|note|challenge|adaptation|role|benefit|remember|quickExplanation)(\[\d+\])?$/;

describe("Chapter 6 — the textbook's emphasis, and only that", () => {
  it.each(STREAMS)("%s marks exactly the terms transferred from the textbook", (name, content) => {
    const marked = allStrings(content)
      .flatMap(([, text]) => scienceEmphasisParts(text))
      .filter((part) => part.emphasised)
      .map((part) => part.text);
    expect(new Set(marked)).toEqual(new Set(EXPECTED[name]));
    expect(marked.length, `${name} has a duplicated or missing marker`).toBe(EXPECTED[name].length);
  });

  it.each(STREAMS)("%s marks each concept once, not everywhere it appears", (name, content) => {
    const marked = allStrings(content)
      .flatMap(([, text]) => scienceEmphasisParts(text))
      .filter((part) => part.emphasised)
      .map((part) => part.text.toLowerCase());
    expect(new Set(marked).size, `${name} repeats an emphasised concept`).toBe(marked.length);
  });

  it.each(STREAMS)("%s changed no wording — only added markers", (name, content) => {
    for (const [path, text] of allStrings(content)) {
      if (!text.includes("**")) continue;
      const stripped = stripEmphasis(text);
      const original = ORIGINALS[name][path];
      expect(original, `no expected original registered for marked field ${path}`).toBeTruthy();
      expect(stripped, `wording changed at ${path}`).toBe(original);
    }
  });

  it("marks the equivalent concept in both languages, in the same fields", () => {
    const fieldsWithMarkers = (content: ScienceF2InteractiveContent) =>
      allStrings(content)
        .filter(([, text]) => text.includes("**"))
        .map(([path]) => path)
        .sort();
    expect(fieldsWithMarkers(scienceF2C6InteractiveBM)).toEqual(fieldsWithMarkers(scienceF2C6InteractiveDLP));
  });

  it.each(STREAMS)("%s puts markers only in fields wired to ScienceEmphasis", (name, content) => {
    for (const [path, text] of allStrings(content)) {
      if (!text.includes("**")) continue;
      expect(path, `${name}: emphasis marker in an unwired field: ${path}`).toMatch(ALLOWED_FIELD);
    }
  });

  it.each(STREAMS)("%s leaves quiz, flashcard and reflection content unmarked", (name, content) => {
    for (const [path, text] of allStrings(content)) {
      if (!text.includes("**")) continue;
      expect(path, `${name}: emphasis leaked into assessment content: ${path}`).not.toMatch(
        /miniQuiz|reflectionItems/,
      );
    }
  });
});
