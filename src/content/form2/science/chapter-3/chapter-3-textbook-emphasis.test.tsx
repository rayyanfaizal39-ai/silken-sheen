import { describe, expect, it } from "vitest";
import { scienceEmphasisParts, stripEmphasis } from "@/components/notes/blocks/ScienceEmphasis";
import { scienceF2C3InteractiveBM } from "./interactive-bm";
import { scienceF2C3InteractiveDLP } from "./interactive-dlp";
import type { ScienceF2InteractiveContent } from "../interactive-types";

/**
 * Guards the transfer of the Sains Tingkatan 2 / DLP textbook's own emphasis
 * into Chapter 3 (Nutrition).
 *
 * As with Chapter 1, 11 and 12's guards: the pass only adds `**markers**`
 * around wording AcadeMY already had, so most of this file checks what did NOT
 * change — strip the markers back out and every touched string must be
 * byte-identical to what it was before.
 */

const STREAMS: [string, ScienceF2InteractiveContent][] = [
  ["BM", scienceF2C3InteractiveBM],
  ["DLP", scienceF2C3InteractiveDLP],
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
    "Sumber tenaga utama badan",
    "pertumbuhan dan pembaikan tisu badan",
    "Simpanan tenaga paling pekat",
    "Merangsang peristalsis",
    "mencegah sembelit",
    "Diperoleh secara berterusan daripada makanan",
    "Diangkut dan disimpan bersama lemak",
    "reagen khusus",
    "biru kehitaman",
    "emulsi putih melekit/berkabus",
    "mudah terbakar",
    "kerja berat",
    "37 kJ/g (9 kcal/g)",
    "17 kJ/g (4 kcal/g)",
    "kurangkan gula, garam dan minyak",
    "bersenam secara berkala",
    "TIDAK melibatkan enzim",
    "Melibatkan bantuan enzim",
    "menggalakkan tindak balas kimia",
    "menambahkan luas permukaan",
    "jarak resapan yang pendek",
    "molekul kanji terlalu besar",
    "molekul glukosa cukup kecil",
    "molekul besar seperti kanji tidak boleh",
    "Baki pepejal",
    "cukup serat",
  ],
  DLP: [
    "The body's main energy source",
    "growth and repair of body tissues",
    "The most concentrated source and store of energy",
    "Stimulates peristalsis",
    "prevent constipation",
    "Needed continuously from food",
    "Transported and stored together with fat",
    "specific reagent",
    "blue-black",
    "cloudy, milky-white emulsion",
    "flammable",
    "heavy work",
    "37 kJ/g (9 kcal/g)",
    "17 kJ/g (4 kcal/g)",
    "reduce sugar, salt and oil",
    "exercise regularly",
    "Does NOT involve enzymes",
    "Involves enzymes",
    "speeds up chemical reactions",
    "increase the surface area",
    "short diffusion distance",
    "starch molecules are too large",
    "glucose molecules are small enough",
    "large molecules like starch cannot",
    "The solid waste",
    "enough fibre",
  ],
};

/** Field path -> the exact original wording (before markers were added). */
const ORIGINALS: Record<string, Record<string, string>> = {
  BM: {
    "content.sections[0].cards[0].body": "Sumber tenaga utama badan (makanan ruji).",
    "content.sections[0].cards[1].body": "Diperlukan untuk pertumbuhan dan pembaikan tisu badan.",
    "content.sections[0].cards[2].body":
      "Simpanan tenaga paling pekat — kira-kira 2× tenaga karbohidrat/protein bagi setiap gram.",
    "content.sections[0].cards[5].facts[2].value":
      "Merangsang peristalsis dan membantu makanan bergerak melalui salur pencernaan, membantu mencegah sembelit",
    "content.sections[1].comparison.columns[0].body":
      "Vitamin B dan C. Diperoleh secara berterusan daripada makanan kerana tidak disimpan lama dalam badan.",
    "content.sections[1].comparison.columns[1].body":
      "Vitamin A, D, E dan K. Diangkut dan disimpan bersama lemak dalam badan.",
    "content.sections[2].accordions[0].body":
      "Setiap ujian menggunakan reagen khusus yang bertindak balas dengan nutrien tertentu sahaja dan menghasilkan perubahan warna atau mendakan yang boleh diperhatikan — inilah 'keputusan positif' yang menunjukkan nutrien itu wujud dalam sampel.",
    "content.sections[2].accordions[1].body":
      "Kanji: tambah larutan iodin terus pada sampel pada suhu bilik — warna bertukar kepada biru kehitaman jika positif. Gula penurun: tambah larutan Benedict, kemudian PANASKAN dalam mandi air — warna bertukar daripada biru kepada hijau/kuning/mendakan merah bata jika positif.",
    "content.sections[2].accordions[2].body":
      "Protein: tambah reagen Millon, kemudian panaskan dalam mandi air — mendakan/warna merah bata menunjukkan keputusan positif. Lemak: campurkan sampel dengan etanol, kemudian tuang ke dalam air — emulsi putih melekit/berkabus terbentuk jika positif.",
    "content.sections[2].accordions[3].body":
      "Etanol mudah terbakar, jadi pemanasan bagi ujian Benedict dan Millon dijalankan dalam mandi air, bukan nyalaan api terus.",
    "content.sections[4].cards[3].body":
      "Petani, buruh dan nelayan memerlukan lebih banyak tenaga kerana kerja berat, berbanding pekerja pejabat seperti guru.",
    "content.sections[5].comparison.columns[0].body":
      "37 kJ/g (9 kcal/g) — lebih dua kali ketumpatan tenaga protein atau karbohidrat.",
    "content.sections[5].comparison.columns[1].body":
      "Setiap satu membekalkan kira-kira 17 kJ/g (4 kcal/g).",
    "content.sections[6].causeEffect.items[0].note":
      "Alternatif sihat: kurangkan gula, garam dan minyak; tambah sayur-sayuran dan buah-buahan.",
    "content.sections[6].causeEffect.items[1].note":
      "Alternatif sihat: bersenam secara berkala setiap minggu.",
    "content.sections[7].comparison.columns[0].body":
      "Berlaku di dalam mulut sahaja. Melibatkan pemecahan makanan secara mekanikal (pengunyahan). TIDAK melibatkan enzim.",
    "content.sections[7].comparison.columns[1].body":
      "Berlaku di dalam mulut, perut, duodenum dan usus. Melibatkan bantuan enzim untuk memecahkan molekul kompleks kepada molekul kecil dan larut.",
    "content.sections[7].accordions[0].body":
      "Enzim ialah bahan di dalam badan yang menggalakkan tindak balas kimia dalam sistem pencernaan. Enzim diperbuat daripada protein — tanpa enzim, pencernaan berlaku pada kadar yang sangat perlahan.",
    "content.sections[10].cards[0].body":
      "Berjuta-juta unjuran halus menambahkan luas permukaan penyerapan.",
    "content.sections[10].cards[1].body":
      "Dinding vilus sangat nipis, mewujudkan jarak resapan yang pendek.",
    "content.sections[11].accordions[3].body":
      "Tabung didih P (kanji): ujian iodin dan Benedict pada air suling kekal negatif pada akhir eksperimen — molekul kanji terlalu besar untuk menembusi tiub Visking. Tabung didih Q (glukosa): ujian Benedict pada air suling menjadi positif (mendakan merah bata) selepas 30 minit — molekul glukosa cukup kecil untuk meresap keluar melalui tiub Visking.",
    "content.sections[11].accordions[4].body":
      "Tiub Visking berfungsi seperti model dinding usus kecil: molekul kecil dan larut seperti glukosa boleh meresap melaluinya, tetapi molekul besar seperti kanji tidak boleh.",
    "content.sections[13].cards[1].body":
      "Baki pepejal (serat, sisa rembesan salur pencernaan, sel mati, air) yang tidak diserap atau dicerna.",
    "content.sections[13].causeEffect.items[0].note":
      "Cara elak: makan cukup serat (buah-buahan, sayur-sayuran, bijirin) dan air (sekurang-kurangnya 2 liter sehari).",
  },
  DLP: {
    "content.sections[0].cards[0].body": "The body's main energy source (staple food).",
    "content.sections[0].cards[1].body": "Needed for growth and repair of body tissues.",
    "content.sections[0].cards[2].body":
      "The most concentrated source and store of energy — about 2× the energy of carbohydrate/protein per gram.",
    "content.sections[0].cards[5].facts[2].value":
      "Stimulates peristalsis and helps food move through the digestive tract, helping prevent constipation",
    "content.sections[1].comparison.columns[0].body":
      "Vitamins B and C. Needed continuously from food because they are not stored for long in the body.",
    "content.sections[1].comparison.columns[1].body":
      "Vitamins A, D, E and K. Transported and stored together with fat in the body.",
    "content.sections[2].accordions[0].body":
      "Each test uses a specific reagent that reacts only with a certain nutrient and produces an observable colour change or precipitate — this is the 'positive result' that shows the nutrient is present in the sample.",
    "content.sections[2].accordions[1].body":
      "Starch: add iodine solution directly to the sample at room temperature — the colour turns blue-black if positive. Reducing sugar: add Benedict's solution, then HEAT in a water bath — the colour changes from blue to green/yellow/brick-red precipitate if positive.",
    "content.sections[2].accordions[2].body":
      "Protein: add Millon's reagent, then heat in a water bath — a brick-red precipitate/colour shows a positive result. Fat: mix the sample with ethanol, then pour into water — a cloudy, milky-white emulsion forms if positive.",
    "content.sections[2].accordions[3].body":
      "Ethanol is flammable, so heating for Benedict's and Millon's tests is done in a water bath, not over a direct flame.",
    "content.sections[4].cards[3].body":
      "Farmers, labourers and fishermen need more energy because of heavy work, compared with office workers such as teachers.",
    "content.sections[5].comparison.columns[0].body":
      "37 kJ/g (9 kcal/g) — more than twice the energy density of protein or carbohydrate.",
    "content.sections[5].comparison.columns[1].body": "Each provides about 17 kJ/g (4 kcal/g).",
    "content.sections[6].causeEffect.items[0].note":
      "Healthier alternative: reduce sugar, salt and oil; add more fruits and vegetables.",
    "content.sections[6].causeEffect.items[1].note":
      "Healthier alternative: exercise regularly every week.",
    "content.sections[7].comparison.columns[0].body":
      "Occurs in the mouth only. Involves the mechanical breakdown of food (chewing). Does NOT involve enzymes.",
    "content.sections[7].comparison.columns[1].body":
      "Occurs in the mouth, stomach, duodenum and intestine. Involves enzymes that break complex molecules into small, soluble molecules.",
    "content.sections[7].accordions[0].body":
      "An enzyme is a substance in the body that speeds up chemical reactions in the digestive system. Enzymes are made of protein — without enzymes, digestion occurs at a very slow rate.",
    "content.sections[10].cards[0].body":
      "Millions of tiny projections greatly increase the surface area for absorption.",
    "content.sections[10].cards[1].body":
      "The villus wall is very thin, creating a short diffusion distance.",
    "content.sections[11].accordions[3].body":
      "Boiling tube P (starch): iodine and Benedict's tests on the water remain negative at the end of the experiment — starch molecules are too large to pass through the Visking tubing. Boiling tube Q (glucose): Benedict's test on the water turns positive (brick-red precipitate) after 30 minutes — glucose molecules are small enough to diffuse out through the Visking tubing.",
    "content.sections[11].accordions[4].body":
      "Visking tubing acts as a model of the small intestine wall: small, soluble molecules like glucose can diffuse through it, but large molecules like starch cannot.",
    "content.sections[13].cards[1].body":
      "The solid waste (fibre, digestive tract secretions, dead cells, water) that is not absorbed or digested.",
    "content.sections[13].causeEffect.items[0].note":
      "Prevention: eat enough fibre (fruits, vegetables, grains) and water (at least 2 litres a day).",
  },
};

/**
 * Only these field-path suffixes are wired to render through ScienceEmphasis.
 * `facts[n].value` covers the food-class card facts (see `ScienceInteractiveCard.facts`).
 */
const ALLOWED_FIELD =
  /\.(body|intro|note|challenge|adaptation|role|benefit|remember|quickExplanation)(\[\d+\])?$|\.facts\[\d+\]\.value$/;

describe("Chapter 3 — the textbook's emphasis, and only that", () => {
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
    expect(fieldsWithMarkers(scienceF2C3InteractiveBM)).toEqual(fieldsWithMarkers(scienceF2C3InteractiveDLP));
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
