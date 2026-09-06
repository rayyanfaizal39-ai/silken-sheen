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
    "memerangkap haba begitu berkesan di bawah bulu dan lemaknya",
    "satu bentuk tenaga",
    "sukatan darjah kepanasan atau kesejukan sesuatu objek",
    "jenis bahan, kuantiti bahan dan suhu",
    "darjah pergerakan zarah-zarah di dalam bahan itu",
    "pemindahan haba antara kedua-duanya menjadi sifar",
    "keseimbangan terma",
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
    "Permukaan yang gelap dan kusam merupakan penyerap dan pembebas haba yang lebih baik",
    "Warna cerah tidak menyerap banyak haba",
    "mengurangkan kesan pembangunan yang pesat terhadap alam sekitar dan kesihatan manusia",
    "kecekapan tenaga yang tinggi",
    "Sistem pengaliran air yang baik",
    "bahan binaan kitar semula",
    "Sistem peredaran udara dan pencahayaan semula jadi yang baik",
  ],
  DLP: [
    "traps heat so effectively beneath its fur and fat",
    "a form of energy",
    "the measure of the degree of hotness or coldness of an object",
    "the type of substance, the quantity of substance and the temperature",
    "the degree of movement of the particles within the substance",
    "the heat transfer between them becomes zero",
    "thermal equilibrium",
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
    "Dark, dull surfaces are better absorbers and better emitters of heat",
    "Light colours do not absorb much heat",
    "reduce the impact of rapid development on the environment and on human health",
    "high energy efficiency",
    "Good water-flow systems",
    "recycled building materials",
    "Good natural air-circulation and lighting systems",
  ],
};

/** Field path -> the exact original wording (before markers were added). */
const ORIGINALS: Record<string, Record<string, string>> = {
  BM: {
    "content.blogHighlight.body":
      "Kamera inframerah mengesan haba yang disinarkan daripada haiwan — tetapi beruang kutub memerangkap haba begitu berkesan di bawah bulu dan lemaknya sehingga ia hampir tidak kelihatan pada pengimejan terma, walaupun dalam habitat yang membeku.",
    "content.sections[0].intro":
      "Haba ialah satu bentuk tenaga yang mengalir daripada kawasan bersuhu tinggi ke kawasan bersuhu rendah. Suhu pula ialah sukatan darjah kepanasan atau kesejukan sesuatu objek. Kedua-duanya berkait, tetapi ia bukan perkara yang sama — dua bikar air pada suhu yang sama boleh mengandungi kuantiti haba yang sangat berbeza, bergantung kepada berapa banyak air itu.",
    "content.sections[0].cards[0].body":
      "Satu bentuk tenaga. Kuantiti haba bergantung pada jenis bahan, kuantiti bahan dan suhu.",
    "content.sections[0].cards[1].body":
      "Darjah kepanasan atau kesejukan sesuatu objek. Suhu bergantung pada darjah pergerakan zarah-zarah di dalam bahan itu.",
    "content.sections[0].cards[2].body":
      "Apabila dua objek bersentuhan, tenaga haba dipindahkan daripada objek bersuhu tinggi kepada objek bersuhu rendah. Apabila pemindahan haba antara kedua-duanya menjadi sifar, kedua-dua objek berada dalam keseimbangan terma dan mempunyai suhu yang sama.",
    "content.sections[1].intro":
      "Konduksi ialah proses pengaliran haba dari kawasan panas ke kawasan sejuk melalui medium pepejal. Zarah-zarah yang menerima tenaga haba bergetar dengan lebih cepat dan berlanggar dengan zarah jiran dengan lebih kerap, lalu memindahkan tenaga itu ke seluruh medium.",
    "content.sections[2].intro":
      "Haba juga boleh mengalir tanpa melalui pepejal. Dalam bendalir, perolakan membawa haba melalui pergerakan bendalir itu sendiri. Sinaran pula tidak memerlukan sebarang medium — inilah satu-satunya cara haba boleh merambat menerusi ruang kosong.",
    "content.sections[3].intro":
      "Pembentukan bayu laut dan bayu darat merupakan contoh perolakan yang berlaku secara semula jadi. Kuncinya ialah darat memanas dan menyejuk dengan lebih cepat berbanding laut.",
    "content.sections[4].intro":
      "Bahan yang boleh mengalirkan haba dengan mudah dikenali sebagai konduktor haba. Bahan yang boleh menghalang atau melambatkan pengaliran haba pula dikenali sebagai penebat haba.",
    "content.sections[4].cards[0].body":
      "Bahan yang membenarkan haba mengalir melaluinya dengan mudah. Logam seperti kuprum, aluminium dan besi ialah konduktor haba yang baik.",
    "content.sections[4].cards[1].body":
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
      "Keupayaan sesuatu objek untuk menyerap dan membebaskan haba bergantung pada jenis dan warna permukaannya. Apabila objek menyerap haba, suhunya meningkat; apabila objek membebaskan haba, suhunya menurun. Permukaan yang gelap dan kusam merupakan penyerap dan pembebas haba yang lebih baik berbanding permukaan yang cerah dan berkilat.",
    "content.sections[7].cards[0].body":
      "Lori tangki minyak dicat dengan warna cerah seperti putih atau perak. Warna cerah tidak menyerap banyak haba, jadi penyejatan minyak dapat dikurangkan.",
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
      "Infrared cameras detect the heat radiated by animals — but a polar bear traps heat so effectively beneath its fur and fat that it is almost invisible to thermal imaging, even in a freezing habitat.",
    "content.sections[0].intro":
      "Heat is a form of energy that flows from a region of higher temperature to a region of lower temperature. Temperature is the measure of the degree of hotness or coldness of an object. The two are related, but they are not the same thing — two beakers of water at the same temperature can hold very different quantities of heat, depending on how much water there is.",
    "content.sections[0].cards[0].body":
      "A form of energy. The quantity of heat depends on the type of substance, the quantity of substance and the temperature.",
    "content.sections[0].cards[1].body":
      "The degree of hotness or coldness of an object. Temperature depends on the degree of movement of the particles within the substance.",
    "content.sections[0].cards[2].body":
      "When two objects are in contact, heat energy is transferred from the object at the higher temperature to the object at the lower temperature. When the heat transfer between them becomes zero, the two objects are in thermal equilibrium and share the same temperature.",
    "content.sections[1].intro":
      "Conduction is the flow of heat from a hot region to a cold region through a solid medium. Particles that receive heat energy vibrate faster and collide with their neighbouring particles more often, transferring that energy throughout the medium.",
    "content.sections[2].intro":
      "Heat can also flow without passing through a solid. In fluids, convection carries heat through the movement of the fluid itself. Radiation needs no medium at all — it is the only way heat can travel through empty space.",
    "content.sections[3].intro":
      "Sea breezes and land breezes are examples of convection happening in nature. The key is that land heats up and cools down faster than the sea.",
    "content.sections[4].intro":
      "A material that lets heat flow through it easily is known as a heat conductor. A material that prevents or slows down the flow of heat is known as a heat insulator.",
    "content.sections[4].cards[0].body":
      "A material that allows heat to flow through it easily. Metals such as copper, aluminium and iron are good heat conductors.",
    "content.sections[4].cards[1].body":
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
      "The ability of an object to absorb and emit heat depends on the type and colour of its surface. When an object absorbs heat, its temperature rises; when an object emits heat, its temperature falls. Dark, dull surfaces are better absorbers and better emitters of heat than light, shiny surfaces.",
    "content.sections[7].cards[0].body":
      "Fuel tanker lorries are painted in light colours such as white or silver. Light colours do not absorb much heat, so evaporation of the fuel is reduced.",
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
const ALLOWED_FIELD = /\.(body|intro|note|challenge|adaptation|role|benefit|remember|quickExplanation)(\[\d+\])?$/;

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
    expect(fieldsWithMarkers(scienceF2C9InteractiveBM)).toEqual(fieldsWithMarkers(scienceF2C9InteractiveDLP));
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
