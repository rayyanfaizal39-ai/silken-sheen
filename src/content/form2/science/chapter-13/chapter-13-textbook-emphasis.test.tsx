import { describe, expect, it } from "vitest";
import { scienceEmphasisParts, stripEmphasis } from "@/components/notes/blocks/ScienceEmphasis";
import { scienceF2C13InteractiveBM } from "./interactive-bm";
import { scienceF2C13InteractiveDLP } from "./interactive-dlp";
import type { ScienceF2InteractiveContent } from "../interactive-types";

/**
 * Guards the transfer of the Sains Tingkatan 2 / DLP textbook's own emphasis
 * into Chapter 13 (Meteoroid, Asteroid, Comet).
 *
 * As with Chapter 1, 11 and 12's guards: the pass only adds `**markers**`
 * around wording AcadeMY already had, so most of this file checks what did NOT
 * change — strip the markers back out and every touched string must be
 * byte-identical to what it was before.
 */

const STREAMS: [string, ScienceF2InteractiveContent][] = [
  ["BM", scienceF2C13InteractiveBM],
  ["DLP", scienceF2C13InteractiveDLP],
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
    "meteorit terbesar yang pernah dijumpai",
    "tidak pernah membentuk sebarang kawah",
    "saiz, komposisi dan cara pergerakan",
    "berasal daripada serpihan asteroid dan komet",
    "42 km/s",
    "mengorbit Matahari pada orbitnya sendiri",
    "Lingkaran Asteroid antara orbit Marikh dan Musytari",
    "150,000,000 km",
    "laluan elips",
    "Angin solar",
    "tidak kira arah pergerakan komet itu sendiri",
    "Apollo, Amor dan Aten",
    "perlanggaran asteroid bersaiz kira-kira 10 km menyumbang kepada kepupusan dinosaur",
    "mengubah laluannya",
    "memusnahkannya sebelum berlaku hentaman",
  ],
  DLP: [
    "is the largest ever found",
    "it never even formed a crater",
    "size, composition, and how they move around the Sun",
    "originating from fragments of asteroids and comets",
    "42 km/s",
    "orbiting the Sun on its own path",
    "the asteroid belt between Mars and Jupiter",
    "150,000,000 km",
    "elliptical paths",
    "Solar wind",
    "no matter which direction the comet itself is travelling",
    "the Apollo, Amor and Aten orbit groups",
    "a roughly 10 km-wide asteroid impact contributed to the extinction of the dinosaurs",
    "altering its course",
    "destroying it before impact",
  ],
};

/** Field path -> the exact original wording (before markers were added). */
const ORIGINALS: Record<string, Record<string, string>> = {
  BM: {
    "content.blogHighlight.body":
      "Meteorit Hoba, ditemui di Namibia pada 1920, ialah meteorit terbesar yang pernah dijumpai — jatuh kira-kira 80,000 tahun lalu. Bentuknya yang leper mungkin melambatkan hentamannya sehingga ia tidak pernah membentuk sebarang kawah.",
    "content.sections[0].intro":
      "Selain galaksi, bintang dan planet, sistem suria kita turut dipenuhi jasad-jasad kecil lain yang mengembara — meteoroid, asteroid dan komet. Ketiga-tiganya berbeza dari segi saiz, komposisi dan cara pergerakan mereka mengelilingi Matahari.",
    "content.sections[0].cards[0].body":
      "Sekeping batu dan logam terapung yang bergerak di angkasa lepas, berasal daripada serpihan asteroid dan komet. Bersaiz 10 μm hingga 1 m, diperbuat daripada besi dan nikel, bersuhu permukaan kira-kira 0°C. Yang paling pantas bergerak pada 42 km/s.",
    "content.sections[0].cards[1].body":
      "Jasad logam dan berbatu yang lebih besar — 1 m hingga 1,000 km — yang mengorbit Matahari pada orbitnya sendiri. Sejuk, kira-kira -73°C, bergerak pada purata 25 km/s. Kebanyakannya berada dalam Lingkaran Asteroid antara orbit Marikh dan Musytari.",
    "content.sections[0].cards[2].body":
      "Campuran ais, gas dan debu beku yang mempunyai kepala dan ekor yang panjang — ekornya sahaja boleh mencapai 150,000,000 km. Komet mengorbit Matahari pada laluan elips, bergerak pada 10-70 km/s.",
    "content.sections[0].accordions[0].body":
      "Apabila sesebuah komet menghampiri Matahari, ia memanas dan mula cair, membebaskan gas dan debu. Angin solar — aliran zarah yang sentiasa bertiup keluar daripada Matahari — menolak bahan yang terbebas itu menjadi ekor yang sentiasa menghala bertentangan Matahari, tidak kira arah pergerakan komet itu sendiri.",
    "content.sections[0].accordions[1].body":
      "Kebanyakan asteroid kekal selamat dalam Lingkaran Asteroid — tetapi sesetengahnya, seperti dalam kumpulan orbit Apollo, Amor dan Aten, menghampiri atau bersilang dengan orbit Bumi, mewujudkan risiko perlanggaran yang nyata (walaupun jarang). Komet juga boleh terkeluar daripada orbitnya akibat graviti planet gergasi, menghantarnya ke laluan baharu yang berisiko. Ramai saintis mempercayai perlanggaran asteroid bersaiz kira-kira 10 km menyumbang kepada kepupusan dinosaur — bukti dijumpai dalam lapisan batuan di seluruh dunia.",
    "content.sections[0].accordions[2].body":
      "Saintis sentiasa menjejaki asteroid berhampiran Bumi. Jika satu daripadanya menimbulkan risiko sebenar, pilihan termasuk mengubah laluannya atau, dalam senario melampau, memusnahkannya sebelum berlaku hentaman.",
  },
  DLP: {
    "content.blogHighlight.body":
      "The Hoba Meteorite, discovered in Namibia in 1920, is the largest ever found — fallen roughly 80,000 years ago. Its flat shape may have slowed its impact enough that it never even formed a crater.",
    "content.sections[0].intro":
      "Besides galaxies, stars and planets, our solar system is also full of smaller wandering objects — meteoroids, asteroids and comets. All three differ in size, composition, and how they move around the Sun.",
    "content.sections[0].cards[0].body":
      "A small floating piece of stone and metal drifting through space, originating from fragments of asteroids and comets. Sizes range from 10 μm to 1 m, made of iron and nickel, with a surface temperature around 0°C. The fastest ones travel at 42 km/s.",
    "content.sections[0].cards[1].body":
      "A larger rocky/metal body — 1 m to 1,000 km — orbiting the Sun on its own path. Cold, around -73°C, moving at an average 25 km/s. Most live in the asteroid belt between Mars and Jupiter.",
    "content.sections[0].cards[2].body":
      "A mixture of ice, gas and frozen dust with a head and a long tail — the tail alone can stretch up to 150,000,000 km. Comets orbit the Sun on elliptical paths at 10-70 km/s.",
    "content.sections[0].accordions[0].body":
      "As a comet nears the Sun, it heats up and starts to melt, releasing gas and dust. Solar wind — a constant stream of particles blowing outward from the Sun — pushes that released material into a tail that always points away from the Sun, no matter which direction the comet itself is travelling.",
    "content.sections[0].accordions[1].body":
      "Most asteroids stay safely in the asteroid belt — but some, like those in the Apollo, Amor and Aten orbit groups, cross close to or intersect Earth's orbit, creating a real (if rare) collision risk. Comets can also slip out of their orbit under a giant planet's gravity, sending them on a risky new path. Many scientists believe a roughly 10 km-wide asteroid impact contributed to the extinction of the dinosaurs — evidence found in rock layers worldwide points to a massive collision.",
    "content.sections[0].accordions[2].body":
      "Scientists continuously track near-Earth asteroids. If one poses a real risk, options include altering its course or, in extreme scenarios, destroying it before impact.",
  },
};

/** Only these field-path suffixes are wired to render through ScienceEmphasis. */
const ALLOWED_FIELD = /\.(body|intro|note|challenge|adaptation|role|benefit|remember|quickExplanation)(\[\d+\])?$/;

describe("Chapter 13 — the textbook's emphasis, and only that", () => {
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
    expect(fieldsWithMarkers(scienceF2C13InteractiveBM)).toEqual(fieldsWithMarkers(scienceF2C13InteractiveDLP));
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
