import { describe, expect, it } from "vitest";
import { scienceEmphasisParts, stripEmphasis } from "@/components/notes/blocks/ScienceEmphasis";
import { scienceF2C11InteractiveBM } from "./interactive-bm";
import { scienceF2C11InteractiveDLP } from "./interactive-dlp";
import type { ScienceF2InteractiveContent } from "../interactive-types";

/**
 * Guards the transfer of the Sains Tingkatan 2 / DLP textbook's own emphasis
 * into Chapter 11 (Stars and Galaxies in the Universe).
 *
 * Like the Chapter 1 guard, this only checks what the pass is allowed to do:
 * add `**markers**` around wording AcadeMY already had. Strip the markers back
 * out and every touched string must be byte-identical to what it was before.
 */

const STREAMS: [string, ScienceF2InteractiveContent][] = [
  ["BM", scienceF2C11InteractiveBM],
  ["DLP", scienceF2C11InteractiveDLP],
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
    "Supernova",
    "Galaksi",
    "725 km",
    "Bima Sakti",
    "200 bilion bintang",
    "Nebula",
    "bintang muda",
    "raksasa merah",
    "kerdil putih",
    "bintang neutron",
    "lohong hitam",
    "tidak membolehkan sebarang jirim terlepas darinya, termasuklah cahaya",
    "suhu, saiz, jarak, warna dan kecerahan",
    "paling sejuk",
    "paling panas",
    "super raksasa",
    "raksasa",
    "kerdil",
    "Sirius dan Rigel",
  ],
  DLP: [
    "supernova",
    "galaxy",
    "725 km",
    "Milky Way",
    "200 billion stars",
    "nebula",
    "young star",
    "red giant",
    "white dwarf",
    "neutron star",
    "black hole",
    "does not allow any matter to escape from it, including light",
    "temperature, size, distance, colour and brightness",
    "the coolest",
    "the hottest",
    "supergiant star",
    "giant star",
    "dwarf star",
    "Sirius and Rigel",
  ],
};

/** Field path -> the exact original wording (before markers were added). */
const ORIGINALS: Record<string, Record<string, string>> = {
  BM: {
    "content.blogHighlight.body":
      "Supernova ialah satu letupan yang amat kuat daripada bintang yang bersaiz besar. Setiap letupan menghasilkan lebih daripada 100 kali ganda tenaga cahaya yang dikeluarkan oleh Matahari semenjak kewujudannya selama 10 bilion tahun. Supernova yang terakhir berlaku lebih kurang 400 tahun dahulu tetapi hanya dapat dikesan pada tahun 1987.",
    "content.sections[0].intro":
      "Alam semesta terdiri daripada semua benda yang wujud di sekeliling kita, dan terdapat jutaan galaksi di dalamnya. Galaksi ialah satu himpunan jasad yang terdiri daripada jutaan bintang bersama gas, debu dan habuk. Galaksi wujud dalam pelbagai bentuk, iaitu galaksi berpilin, galaksi elips dan galaksi tidak seragam. Kajian astronomi menggunakan alat teknologi seperti teleskop telah menyedarkan kita tentang keindahan dan keluasan alam semesta.",
    "content.sections[0].cards[0].body":
      "Teleskop angkasa Hubble dilancarkan pada 24 April 1990. Teleskop ini sangat berkuasa sehingga dapat melihat sekeping duit syiling yang berada sejauh 725 km darinya.",
    "content.sections[1].intro":
      "Sistem suria kita terletak di dalam galaksi Bima Sakti. Bima Sakti ialah sebuah galaksi berpilin yang sederhana besar, dan sistem suria kita berada di pinggir salah satu cabang berpilinnya. Bima Sakti terdiri daripada lebih kurang 200 bilion bintang, dan Matahari merupakan salah satu daripadanya.",
    "content.sections[2].intro":
      "Bintang dilahirkan daripada nebula. Nebula ialah awan besar yang terdiri daripada debu dan gas-gas seperti hidrogen dan helium. Daya tarikan graviti yang kuat menarik gas dan zarah debu itu sehingga membentuk satu gumpalan yang mengecut dan termampat menjadi satu teras. Apabila suhu dan tekanan dalam teras menjadi terlalu tinggi, tindak balas nuklear berlaku dan gas hidrogen ditukarkan kepada helium, lalu membebaskan banyak tenaga haba dan cahaya. Teras itu menyinar dan satu bintang dilahirkan.",
    "content.sections[2].accordions[0].body":
      "Gas dan zarah debu dalam nebula ditarik oleh daya tarikan graviti yang kuat lalu membentuk satu gumpalan. Gumpalan itu mengecut serta termampat sehingga menjadi sangat padat dan membentuk satu teras. Apabila suhu dan tekanan dalam teras menjadi terlalu tinggi, tindak balas nuklear berlaku dan gas hidrogen ditukarkan kepada helium. Teras itu menyinar dan satu bintang dilahirkan — bintang yang baru dilahirkan dikenali sebagai bintang muda.",
    "content.sections[2].accordions[1].body":
      "Haba yang banyak memanaskan lapisan bintang yang paling luar sehingga hidrogen dalam lapisan itu mula terbakar dan bintang mengembang. Pada peringkat ini bintang berwarna merah dan disebut raksasa merah. Jika bintang raksasa merah tidak begitu besar, bintang kerdil putih akan terbentuk. Sekiranya bintang raksasa merah sangat besar, bintang ini mengecut dengan cepat dan menghasilkan letupan besar yang disebut supernova, lalu membentuk bintang neutron. Jika bintang yang asal bersaiz sangat besar, letupan supernova akan membentuk lohong hitam.",
    "content.sections[2].accordions[2].body":
      "Lohong hitam merupakan ruang yang tidak membolehkan sebarang jirim terlepas darinya, termasuklah cahaya.",
    "content.sections[3].intro":
      "Jika diperhatikan pada waktu malam, ada bintang yang kelihatan cerah dan ada yang malap. Bintang-bintang boleh dikelaskan berdasarkan lima ciri, iaitu suhu, saiz, jarak, warna dan kecerahan. Secara umumnya, bintang mempunyai warna mengikut suhu di permukaannya, iaitu daripada suhu yang rendah kepada suhu yang lebih tinggi.",
    "content.sections[3].cards[0].body":
      "Warna sesuatu bintang menunjukkan suhu permukaannya. Bintang merah adalah yang paling sejuk, manakala bintang biru adalah yang paling panas.",
    "content.sections[3].cards[1].body":
      "Bintang yang bersaiz sangat besar disebut bintang super raksasa, bintang yang besar disebut raksasa, dan bintang yang sangat kecil disebut bintang kerdil.",
    "content.sections[3].cards[2].body":
      "Kecerahan sesuatu bintang yang dicerap bergantung pada saiz, jarak dari Bumi dan suhu permukaan bintang tersebut. Bintang yang paling cerah di langit ialah Sirius dan Rigel.",
  },
  DLP: {
    "content.blogHighlight.body":
      "A supernova is an extremely powerful explosion of a large star. Each explosion produces more than 100 times the light energy the Sun has released throughout its 10-billion-year existence. The last supernova happened about 400 years ago but was only detected in 1987.",
    "content.sections[0].intro":
      "The universe consists of everything that exists around us, and there are millions of galaxies within it. A galaxy is a collection of bodies made up of millions of stars together with gas and dust. Galaxies exist in several shapes: spiral galaxies, elliptical galaxies and irregular galaxies. Astronomy carried out with technology such as telescopes has made us aware of the beauty and vastness of the universe.",
    "content.sections[0].cards[0].body":
      "The Hubble Space Telescope was launched on 24 April 1990. It is so powerful that it can see a coin lying 725 km away from it.",
    "content.sections[1].intro":
      "Our solar system lies inside the Milky Way galaxy. The Milky Way is a medium-sized spiral galaxy, and our solar system sits at the edge of one of its spiral arms. The Milky Way contains roughly 200 billion stars, and the Sun is one of them.",
    "content.sections[2].intro":
      "Stars are born from a nebula. A nebula is a vast cloud made up of dust and gases such as hydrogen and helium. Strong gravitational attraction pulls the gas and dust particles together into a clump that contracts and compresses into a core. When the temperature and pressure in the core become very high, a nuclear reaction takes place and hydrogen gas is converted into helium, releasing a great deal of heat and light energy. The core shines and a star is born.",
    "content.sections[2].accordions[0].body":
      "Gases and dust particles in a nebula are pulled together by strong gravitational attraction to form a clump. The clump contracts and compresses until it becomes very dense and forms a core. When the temperature and pressure in the core become very high, a nuclear reaction takes place and hydrogen gas is converted into helium. The core shines and a star is born — a newly born star is known as a young star.",
    "content.sections[2].accordions[1].body":
      "The large amount of heat generated warms the star's outermost layer until the hydrogen in that layer begins to burn and the star expands. At this stage the star is red and is called a red giant. If the red giant is not very large, a white dwarf forms. If the red giant is very large, it contracts rapidly and produces a huge explosion called a supernova, forming a neutron star. If the original star was very large indeed, the supernova explosion forms a black hole.",
    "content.sections[2].accordions[2].body":
      "A black hole is a region that does not allow any matter to escape from it, including light.",
    "content.sections[3].intro":
      "If you look at the night sky, some stars appear bright and others appear dim. Stars can be classified by five characteristics: temperature, size, distance, colour and brightness. In general, a star's colour follows its surface temperature, running from lower temperatures to higher ones.",
    "content.sections[3].cards[0].body":
      "A star's colour shows its surface temperature. Red stars are the coolest, while blue stars are the hottest.",
    "content.sections[3].cards[1].body":
      "A very large star is called a supergiant star, a large star is called a giant star, and a very small star is called a dwarf star.",
    "content.sections[3].cards[2].body":
      "The observed brightness of a star depends on its size, its distance from Earth and its surface temperature. The brightest stars in the sky are Sirius and Rigel.",
  },
};

/** Only these field-path suffixes are wired to render through ScienceEmphasis. */
const ALLOWED_FIELD = /\.(body|intro|note|challenge|adaptation|role|benefit|remember|quickExplanation)(\[\d+\])?$/;

describe("Chapter 11 — the textbook's emphasis, and only that", () => {
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
    expect(fieldsWithMarkers(scienceF2C11InteractiveBM)).toEqual(fieldsWithMarkers(scienceF2C11InteractiveDLP));
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

  it("carries the same Remember callout, mirrored, on the star life-cycle section", () => {
    expect(scienceF2C11InteractiveBM.sections[2].remember).toBe(
      "Saiz asal sebuah bintang menentukan peringkat akhir kitar hidupnya: bintang bersaiz sederhana berakhir sebagai kerdil putih, manakala bintang besar dan super besar melalui supernova sebelum menjadi bintang neutron atau lohong hitam.",
    );
    expect(scienceF2C11InteractiveDLP.sections[2].remember).toBe(
      "The original size of a star determines its final life-cycle stage: a medium-sized star ends as a white dwarf, while large and very large stars pass through a supernova before becoming a neutron star or a black hole.",
    );
  });

  it("carries the same Quick Explanation, mirrored, on the star-characteristics section", () => {
    expect(scienceF2C11InteractiveBM.sections[3].quickExplanation).toBe(
      "Kerdil di sini ialah kategori saiz bintang, berbeza daripada kerdil putih, iaitu peringkat akhir dalam kitar hidup bintang bersaiz sederhana.",
    );
    expect(scienceF2C11InteractiveDLP.sections[3].quickExplanation).toBe(
      "Dwarf here is a star-size category, different from a white dwarf, which is the final stage in the life cycle of a medium-sized star.",
    );
  });
});
