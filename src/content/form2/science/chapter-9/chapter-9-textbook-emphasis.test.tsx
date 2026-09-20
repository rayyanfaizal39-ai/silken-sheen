import { describe, expect, it } from "vitest";
import { scienceEmphasisParts, stripEmphasis } from "@/components/notes/blocks/ScienceEmphasis";
import { scienceF2C9InteractiveBM } from "./interactive-bm";
import { scienceF2C9InteractiveDLP } from "./interactive-dlp";
import type { ScienceF2InteractiveContent } from "../interactive-types";

/**
 * Guards the transfer of the Sains Tingkatan 2 / DLP textbook's own emphasis
 * into Chapter 9 (Heat).
 *
 * As with Chapter 1, 11 and 12's guards: the pass only adds `**markers**`
 * around wording AcadeMY already had, so most of this file checks what did NOT
 * change — strip the markers back out and every touched string must be
 * byte-identical to what it was before.
 */

const STREAMS: [string, ScienceF2InteractiveContent][] = [
  ["BM", scienceF2C9InteractiveBM],
  ["DLP", scienceF2C9InteractiveDLP],
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
    "Marmar mengalirkan haba daripada kaki anda dengan lebih cepat",
    "satu bentuk tenaga",
    "ukuran darjah kepanasan atau kesejukan",
    "proses pengaliran haba dari kawasan panas ke kawasan sejuk melalui medium pepejal",
    "membawa haba melalui pergerakan bendalir itu sendiri",
    "satu-satunya cara haba boleh merambat menerusi ruang kosong",
    "contoh perolakan yang berlaku secara semula jadi",
    "darat memanas dan menyejuk dengan lebih cepat berbanding laut",
    "mengalirkan haba dengan mudah",
    "menghalang atau melambatkan pengaliran haba",
    "kuprum, aluminium dan besi",
    "Kayu, kapas, kain felt, gentian kaca dan polistirena",
    "jarak antara zarah bertambah",
    "jarak antara zarah berkurang",
    "mengembang dan mengecut secara seragam",
    "mengesan perubahan suhu dengan cepat",
    "mengembang pada hari yang panas tanpa membengkok atau terangkat",
    "mengembang dan mengecut dengan selamat",
    "Permukaan yang gelap dan kusam ialah penyerap haba yang baik dan pembebas haba yang baik",
    "Permukaan yang cerah dan berkilat ialah penyerap haba yang lemah dan pembebas haba yang lemah",
    "permukaan perak atau putih yang berkilat",
    "mengurangkan kesan pembangunan yang pesat terhadap alam sekitar dan kesihatan manusia",
    "kecekapan tenaga yang tinggi",
    "Sistem pengaliran air yang baik",
    "bahan binaan kitar semula",
    "Sistem peredaran udara dan pencahayaan semula jadi yang baik",
  ],
  DLP: [
    "Marble conducts heat away from your feet faster",
    "a form of energy",
    "a measure of the degree of hotness or coldness",
    "the flow of heat from a hot region to a cold region through a solid medium",
    "carries heat through the movement of the fluid itself",
    "the only way heat can travel through empty space",
    "examples of convection happening in nature",
    "land heats up and cools down faster than the sea",
    "lets heat flow through it easily",
    "prevents or slows down the flow of heat",
    "copper, aluminium and iron",
    "Wood, cotton, felt, fibreglass and polystyrene",
    "the spacing between the particles increases",
    "the spacing decreases",
    "expands and contracts uniformly",
    "detects changes in temperature quickly",
    "expand on a hot day without buckling or lifting",
    "expand and contract safely",
    "Dark, dull surfaces are good absorbers and good emitters of heat",
    "White, shiny surfaces are poor absorbers and poor emitters of heat",
    "shiny silver or white surface",
    "reduce the impact of rapid development on the environment and on human health",
    "high energy efficiency",
    "Good water-flow systems",
    "recycled building materials",
    "Good natural air-circulation and lighting systems",
  ],
};

/**
 * Field path -> the exact wording the field is expected to carry once the
 * markers are stripped back out.
 *
 * For most of the chapter that is literally the pre-emphasis original. A
 * handful of fields are not, because 9.2 was deliberately restructured and
 * reordered: conduction and convection + radiation were merged into one
 * "three methods" section (`sections[1]`); the learner-facing order is now
 * direction of flow -> three methods -> natural phenomena (`sections[2]`) ->
 * conductors/insulators (`sections[3]`) -> thermal equilibrium (`sections[4]`,
 * which carries no markers and so needs no entry here); the old
 * heat-vs-temperature `cards` duplicating `differencesTable` were removed
 * (their two marked terms have no replacement — `differencesTable`'s cells
 * are plain text, so EXPECTED no longer lists them); and the
 * absorption/emission intro and oil-tanker card (`sections[7]`) were
 * reworded to separate "good/poor absorber and emitter" from "reflects more
 * radiation" instead of the vaguer "light colours don't absorb much heat".
 * Every marked term in the rewritten strings below is still one the textbook
 * itself emphasises, which is what EXPECTED pins.
 */
const ORIGINALS: Record<string, Record<string, string>> = {
  BM: {
    "content.blogHighlight.body":
      "Mengapakah permaidani terasa lebih panas daripada lantai marmar walaupun kedua-duanya berada pada suhu bilik yang sama? Marmar mengalirkan haba daripada kaki anda dengan lebih cepat berbanding permaidani. Permaidani ialah konduktor haba yang lebih lemah, jadi haba meninggalkan kaki anda dengan lebih perlahan — bukan kerana permaidani itu sebenarnya bersuhu lebih tinggi.",
    "content.sections[0].intro":
      "Haba ialah satu bentuk tenaga yang mengalir daripada kawasan yang lebih panas ke kawasan yang lebih sejuk. Suhu pula ialah ukuran darjah kepanasan atau kesejukan sesuatu objek. Kedua-duanya berkait, tetapi ia bukan perkara yang sama.",
    "content.sections[1].intro":
      "Haba sentiasa mengalir daripada kawasan yang lebih panas ke kawasan yang lebih sejuk. Ia boleh berlaku melalui tiga cara. Konduksi ialah proses pengaliran haba dari kawasan panas ke kawasan sejuk melalui medium pepejal. Dalam bendalir, perolakan membawa haba melalui pergerakan bendalir itu sendiri. Sinaran pula tidak memerlukan sebarang medium — inilah satu-satunya cara haba boleh merambat menerusi ruang kosong.",
    "content.sections[2].intro":
      "Haba dari Matahari sampai ke Bumi melalui sinaran, satu-satunya cara yang tidak memerlukan sebarang medium. Haba itu tidak memanaskan darat dan laut sama rata, dan kerana darat memanas dan menyejuk dengan lebih cepat berbanding laut, bayu laut dan bayu darat terbentuk. Kedua-duanya merupakan contoh perolakan yang berlaku secara semula jadi.",
    "content.sections[3].intro":
      "Bahan yang boleh mengalirkan haba dengan mudah dikenali sebagai konduktor haba. Bahan yang boleh menghalang atau melambatkan pengaliran haba pula dikenali sebagai penebat haba.",
    "content.sections[3].cards[0].body":
      "Bahan yang membenarkan haba mengalir melaluinya dengan mudah. Logam seperti kuprum, aluminium dan besi ialah konduktor haba yang baik.",
    "content.sections[3].cards[1].body":
      "Bahan yang menghalang atau melambatkan pengaliran haba. Kayu, kapas, kain felt, gentian kaca dan polistirena ialah penebat haba yang baik.",
    "content.sections[5].intro":
      "Apabila jirim dipanaskan, zarah-zarahnya memperoleh tenaga, bergerak atau bergetar dengan lebih cepat, dan jarak antara zarah bertambah — jadi jirim itu mengembang. Apabila disejukkan, zarah bergerak lebih perlahan, jarak antara zarah berkurang, dan jirim mengecut. Ini berlaku pada pepejal, cecair dan gas.",
    "content.sections[6].accordions[0].body":
      "Merkuri mengembang dan mengecut secara seragam apabila suhu berubah, dan ia mengesan perubahan suhu dengan cepat. Ketinggian turus merkuri di dalam tiub itulah yang digunakan untuk mengukur suhu.",
    "content.sections[6].accordions[1].body":
      "Ruang kecil ditinggalkan antara bahagian rel supaya landasan boleh mengembang pada hari yang panas tanpa membengkok atau terangkat.",
    "content.sections[6].accordions[2].body":
      "Satu hujung jambatan diletakkan di atas penggolek supaya seluruh struktur boleh mengembang dan mengecut dengan selamat mengikut perubahan suhu.",
    "content.sections[7].intro":
      "Keupayaan sesuatu objek untuk menyerap dan membebaskan haba bergantung pada jenis dan warna permukaannya. Apabila objek menyerap haba, suhunya meningkat; apabila objek membebaskan haba, suhunya menurun. Permukaan yang gelap dan kusam ialah penyerap haba yang baik dan pembebas haba yang baik. Permukaan yang cerah dan berkilat ialah penyerap haba yang lemah dan pembebas haba yang lemah — sebaliknya ia memantulkan lebih banyak sinaran.",
    "content.sections[7].cards[0].body":
      "Lori tangki minyak dicat dengan permukaan perak atau putih yang berkilat. Permukaan berkilat memantulkan lebih banyak sinaran Matahari dan menyerap kurang haba, jadi minyak di dalamnya kurang panas dan penyejatan dapat dikurangkan.",
    "content.sections[8].intro":
      "Konsep Bangunan Hijau ialah idea yang dijana untuk mengurangkan kesan pembangunan yang pesat terhadap alam sekitar dan kesihatan manusia. Konsep haba yang anda pelajari dalam bab ini digunakan secara langsung: sebuah rumah hijau direka supaya tenaga yang diperlukan untuk menyejukkan atau memanaskannya dapat dikurangkan.",
    "content.sections[8].tabs[0].body":
      "Bangunan hijau mempunyai kecekapan tenaga yang tinggi, contohnya melalui penggunaan tenaga solar atau tenaga lain yang boleh diperbaharui. Penebat haba pada dinding dan bumbung mengurangkan pengaliran haba masuk, jadi kurang tenaga diperlukan untuk penyaman udara.",
    "content.sections[8].tabs[1].body":
      "Sistem pengaliran air yang baik, termasuk penuaian air hujan dan kitar semula air, mengurangkan penggunaan air bersih.",
    "content.sections[8].tabs[2].body":
      "Tapak pembinaan yang lestari dan penggunaan bahan binaan kitar semula mengurangkan kesan terhadap alam sekitar. Bumbung dan dinding berwarna cerah memantulkan lebih banyak haba matahari.",
    "content.sections[8].tabs[3].body":
      "Sistem peredaran udara dan pencahayaan semula jadi yang baik membolehkan arus perolakan membawa udara panas keluar tanpa kipas atau penyaman udara. Inovasi reka bentuk seperti ini menjadikan rumah lebih selesa dengan tenaga yang lebih sedikit.",
  },
  DLP: {
    "content.blogHighlight.body":
      "Why does a carpet feel warmer than a marble floor when both are at the same room temperature? Marble conducts heat away from your feet faster than carpet does. Carpet is a poorer heat conductor, so heat leaves your feet more slowly — it is not that the carpet is actually at a higher temperature.",
    "content.sections[0].intro":
      "Heat is a form of energy that flows from a hotter region to a colder region. Temperature is a measure of the degree of hotness or coldness of an object. The two are related, but they are not the same thing.",
    "content.sections[1].intro":
      "Heat always flows from a hotter region to a colder region. It can do that in three ways. Conduction is the flow of heat from a hot region to a cold region through a solid medium. In fluids, convection carries heat through the movement of the fluid itself. Radiation needs no medium at all — it is the only way heat can travel through empty space.",
    "content.sections[2].intro":
      "Heat from the Sun reaches the Earth by radiation, the one method that needs no medium at all. That heat does not warm land and sea equally, and because land heats up and cools down faster than the sea, sea breezes and land breezes form. They are examples of convection happening in nature.",
    "content.sections[3].intro":
      "A material that lets heat flow through it easily is known as a heat conductor. A material that prevents or slows down the flow of heat is known as a heat insulator.",
    "content.sections[3].cards[0].body":
      "A material that allows heat to flow through it easily. Metals such as copper, aluminium and iron are good heat conductors.",
    "content.sections[3].cards[1].body":
      "A material that prevents or slows down the flow of heat. Wood, cotton, felt, fibreglass and polystyrene are good heat insulators.",
    "content.sections[5].intro":
      "When matter is heated, its particles gain energy, move or vibrate faster, and the spacing between the particles increases — so the matter expands. When cooled, the particles move more slowly, the spacing decreases, and the matter contracts. This happens in solids, liquids and gases.",
    "content.sections[6].accordions[0].body":
      "Mercury expands and contracts uniformly as the temperature changes, and it detects changes in temperature quickly. The height of the mercury column in the tube is what is used to measure temperature.",
    "content.sections[6].accordions[1].body":
      "Small gaps are left between sections of rail so the track can expand on a hot day without buckling or lifting.",
    "content.sections[6].accordions[2].body":
      "One end of the bridge rests on rollers so the whole structure can expand and contract safely as the temperature changes.",
    "content.sections[7].intro":
      "The ability of an object to absorb and emit heat depends on the type and colour of its surface. When an object absorbs heat, its temperature rises; when an object emits heat, its temperature falls. Dark, dull surfaces are good absorbers and good emitters of heat. White, shiny surfaces are poor absorbers and poor emitters of heat — they reflect more radiation instead.",
    "content.sections[7].cards[0].body":
      "Fuel tanker lorries are painted with a shiny silver or white surface. A shiny surface reflects more of the Sun's radiation and absorbs less heat, so the fuel inside heats up less and evaporation is reduced.",
    "content.sections[8].intro":
      "The Green Building Concept is an idea developed to reduce the impact of rapid development on the environment and on human health. The heat concepts in this chapter are used directly: a green home is designed so that the energy needed to cool or heat it is reduced.",
    "content.sections[8].tabs[0].body":
      "A green building has high energy efficiency, for example through the use of solar energy or other renewable energy. Heat insulation in the walls and roof reduces heat flowing in, so less energy is needed for air conditioning.",
    "content.sections[8].tabs[1].body":
      "Good water-flow systems, including rainwater harvesting and water recycling, reduce the use of clean water.",
    "content.sections[8].tabs[2].body":
      "A sustainable construction site and the use of recycled building materials reduce the impact on the environment. Light-coloured roofs and walls reflect more of the Sun's heat.",
    "content.sections[8].tabs[3].body":
      "Good natural air-circulation and lighting systems let convection currents carry warm air out without fans or air conditioning. Design innovations like these make a home comfortable using far less energy.",
  },
};

/** Only these field-path suffixes are wired to render through ScienceEmphasis. */
const ALLOWED_FIELD =
  /\.(body|intro|note|challenge|adaptation|role|benefit|remember|quickExplanation)(\[\d+\])?$/;

describe("Chapter 9 — the textbook's emphasis, and only that", () => {
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
    expect(fieldsWithMarkers(scienceF2C9InteractiveBM)).toEqual(
      fieldsWithMarkers(scienceF2C9InteractiveDLP),
    );
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
