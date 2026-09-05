import { describe, expect, it } from "vitest";
import { scienceEmphasisParts, stripEmphasis } from "@/components/notes/blocks/ScienceEmphasis";
import { scienceF2C7InteractiveBM } from "./interactive-bm";
import { scienceF2C7InteractiveDLP } from "./interactive-dlp";
import type { ScienceF2InteractiveContent } from "../interactive-types";

/**
 * Guards the transfer of the Sains Tingkatan 2 / DLP textbook's own emphasis
 * into Chapter 7 (Electricity and Magnetism).
 *
 * As with Chapter 1, 11 and 12's guards: the pass only adds `**markers**`
 * around wording AcadeMY already had, so most of this file checks what did NOT
 * change — strip the markers back out and every touched string must be
 * byte-identical to what it was before.
 */

const STREAMS: [string, ScienceF2InteractiveContent][] = [
  ["BM", scienceF2C7InteractiveBM],
  ["DLP", scienceF2C7InteractiveDLP],
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
    "kemampuan untuk melakukan kerja",
    "joule (J)",
    "tidak boleh dicipta atau dimusnahkan",
    "Cas yang sama jenis saling menolak.",
    "Cas yang berlainan jenis saling menarik.",
    "alat yang digunakan untuk mengesan kewujudan cas elektrik",
    "Geseran antara awan dan udara",
    "daya tarikan antara cas positif pada Bumi dan cas negatif pada awan",
    "menyediakan satu lintasan bagi cas elektrik daripada kilat masuk ke dalam Bumi",
    "dari terminal positif ke terminal negatif",
    "dari terminal negatif ke terminal positif",
    "jarum galvanometer memesong",
    "cas yang mengalir menghasilkan arus elektrik",
    "Kadar aliran cas elektrik melalui konduktor.",
    "Beza keupayaan antara dua titik dalam litar.",
    "Keupayaan konduktor untuk merintangi aliran arus.",
    "reostat (perintang berubah) boleh diselaraskan",
    "Hukum Ohm",
    "arus yang mengalir berkurang apabila rintangan bertambah",
    "satu laluan tunggal",
    "beberapa cabang berasingan",
    "voltan yang sama daripada bekalan",
    "besi, keluli, kobalt dan nikel",
    "medan magnet",
    "magnet sementara",
    "ditentukan oleh arah arus elektrik",
    "bergantung pada bentuk konduktor yang digunakan",
    "Kekuatan medan magnet berkurang apabila menjauhi pusat konduktor.",
    "menunjukkan arah kutub",
    "menyimpan maklumat pada jalur bermagnet",
    "elektromagnet untuk menggerakkan pemukulnya",
    "mengunci pintu secara automatik",
  ],
  DLP: [
    "the ability to do work",
    "joule (J)",
    "cannot be created or destroyed",
    "Like charges repel each other.",
    "Unlike charges attract each other.",
    "instrument used to detect the presence of electric charge",
    "Friction between clouds and the air",
    "attraction between the positive charge on the Earth and the negative charge on the cloud",
    "provide a path for the electric charge from lightning to pass into the Earth",
    "from the positive terminal to the negative terminal",
    "from the negative terminal to the positive terminal",
    "galvanometer needle deflect",
    "flowing charge produces an electric current",
    "The rate of flow of electric charge through a conductor.",
    "The potential difference between two points in a circuit.",
    "A conductor's ability to oppose the flow of current.",
    "a rheostat (variable resistor) can be adjusted",
    "Ohm's Law",
    "the current flowing decreases as the resistance increases",
    "a single path",
    "splits into separate branches",
    "the same voltage from the supply",
    "iron, steel, cobalt and nickel",
    "magnetic field",
    "a temporary magnet",
    "set by the direction of the current",
    "depends on the shape of the conductor",
    "The strength of a magnetic field decreases as you move further from the centre of the conductor.",
    "show the direction of the poles",
    "store information on a magnetic strip",
    "electromagnet to move its striker",
    "lock a door automatically",
  ],
};

/** Field path -> the exact original wording (before markers were added). */
const ORIGINALS: Record<string, Record<string, string>> = {
  BM: {
    "content.sections[0].intro":
      "Tenaga bermaksud kemampuan untuk melakukan kerja, dan unit S.I.-nya ialah joule (J). Tenaga tidak boleh dicipta atau dimusnahkan — ia hanya bertukar daripada satu bentuk kepada bentuk yang lain. Dua idea di sini mudah dikelirukan: bentuk tenaga dan sumber tenaga bukan perkara yang sama.",
    "content.sections[1].cards[0].body":
      "Cas yang sama jenis saling menolak. Cas yang berlainan jenis saling menarik. Inilah sebabnya sikat yang telah digosok boleh menarik cebisan kertas kecil.",
    "content.sections[1].cards[1].body":
      "Elektroskop ialah alat yang digunakan untuk mengesan kewujudan cas elektrik pada suatu objek. Kerajang emasnya mencapah kerana cas yang sama saling menolak.",
    "content.sections[2].accordions[0].body":
      "Geseran antara awan dan udara menyebabkan awan dicas dengan cas elektrik. Kilat berlaku kerana daya tarikan antara cas positif pada Bumi dan cas negatif pada awan.",
    "content.sections[2].accordions[1].body":
      "Konduktor kilat dipasang pada bangunan untuk menyediakan satu lintasan bagi cas elektrik daripada kilat masuk ke dalam Bumi. Cara ini melindungi bangunan daripada disambar kilat.",
    "content.sections[3].cards[0].body":
      "Arah aliran arus konvensional ialah dari terminal positif ke terminal negatif.",
    "content.sections[3].cards[1].body":
      "Elektron sebenarnya bergerak dari terminal negatif ke terminal positif.",
    "content.sections[3].cards[2].body":
      "Cas daripada penjana Van de Graaff yang disambungkan kepada galvanometer yang dibumikan akan menyebabkan jarum galvanometer memesong — menunjukkan bahawa cas yang mengalir menghasilkan arus elektrik.",
    "content.sections[4].cards[0].body":
      "Kadar aliran cas elektrik melalui konduktor.",
    "content.sections[4].cards[1].body":
      "Beza keupayaan antara dua titik dalam litar.",
    "content.sections[4].cards[2].body":
      "Keupayaan konduktor untuk merintangi aliran arus. Perintang tetap mempunyai rintangan yang tidak boleh diselaraskan, manakala reostat (perintang berubah) boleh diselaraskan.",
    "content.sections[5].remember":
      "Hukum Ohm: Arus elektrik yang mengalir melalui suatu konduktor berkadar terus dengan voltan merentasinya, dengan syarat suhu dan keadaan fizik lain tetap. Ditulis sebagai V = IR.",
    "content.sections[5].cards[1].body":
      "Pada voltan yang tetap, arus yang mengalir berkurang apabila rintangan bertambah. Menambah panjang dawai meningkatkan rintangannya, lalu mengurangkan arus.",
    "content.sections[6].intro":
      "Litar bersiri menyambungkan komponen secara berturutan dalam satu laluan tunggal. Litar selari pula terbahagi kepada beberapa cabang berasingan. Perbezaan itu mengubah cara arus, voltan dan rintangan berkelakuan.",
    "content.sections[6].cards[0].body":
      "Pendawaian elektrik di rumah menggunakan litar selari supaya setiap alat menerima voltan yang sama daripada bekalan, dan setiap alat boleh dihidupkan atau dimatikan tanpa menjejaskan yang lain.",
    "content.sections[7].intro":
      "Magnet boleh wujud secara semula jadi sebagai batu magnet, tetapi kebanyakan magnet yang digunakan hari ini diperbuat daripada bahan seperti besi, keluli, kobalt dan nikel. Kawasan di sekitar magnet yang wujud kesan daya oleh magnet dikenali sebagai medan magnet.",
    "content.sections[8].intro":
      "Elektromagnet ialah magnet sementara — ia hanya menghasilkan medan magnet semasa arus mengalir. Arah medan magnet yang terhasil ditentukan oleh arah arus elektrik, dan corak medannya bergantung pada bentuk konduktor yang digunakan.",
    "content.sections[8].cards[0].body":
      "Kekuatan medan magnet berkurang apabila menjauhi pusat konduktor. Ini berbeza daripada faktor yang mengubah kekuatan elektromagnet itu sendiri — jarak mengubah kekuatan yang anda ukur, bukan kekuatan yang dihasilkan.",
    "content.sections[9].cards[0].body":
      "Jarum kompas menggunakan magnet yang digantung bebas untuk menunjukkan arah kutub. Kad kredit dan kad debit menyimpan maklumat pada jalur bermagnet.",
    "content.sections[9].cards[1].body":
      "Loceng elektrik menggunakan elektromagnet untuk menggerakkan pemukulnya berulang kali. Kunci bermagnet pada pintu menggunakan elektromagnet untuk mengunci pintu secara automatik — dan kerana ia elektromagnet, kuncinya terlepas apabila arus dimatikan.",
  },
  DLP: {
    "content.sections[0].intro":
      "Energy means the ability to do work, and its S.I. unit is the joule (J). Energy cannot be created or destroyed — it only changes from one form into another. Two ideas here are easily confused: a form of energy and a source of energy are not the same thing.",
    "content.sections[1].cards[0].body":
      "Like charges repel each other. Unlike charges attract each other. This is why a comb that has been rubbed can pick up small pieces of paper.",
    "content.sections[1].cards[1].body":
      "An electroscope is the instrument used to detect the presence of electric charge on an object. Its gold leaf diverges because like charges repel one another.",
    "content.sections[2].accordions[0].body":
      "Friction between clouds and the air charges the clouds with electric charges. Lightning occurs because of the attraction between the positive charge on the Earth and the negative charge on the cloud.",
    "content.sections[2].accordions[1].body":
      "A lightning conductor is fitted to a building to provide a path for the electric charge from lightning to pass into the Earth. This protects the building from being struck.",
    "content.sections[3].cards[0].body":
      "The direction of conventional current is from the positive terminal to the negative terminal.",
    "content.sections[3].cards[1].body":
      "Electrons actually move from the negative terminal to the positive terminal.",
    "content.sections[3].cards[2].body":
      "Charge from a Van de Graaff generator connected to an earthed galvanometer makes the galvanometer needle deflect — showing that flowing charge produces an electric current.",
    "content.sections[4].cards[0].body":
      "The rate of flow of electric charge through a conductor.",
    "content.sections[4].cards[1].body":
      "The potential difference between two points in a circuit.",
    "content.sections[4].cards[2].body":
      "A conductor's ability to oppose the flow of current. A fixed resistor has a resistance that cannot be adjusted, while a rheostat (variable resistor) can be adjusted.",
    "content.sections[5].remember":
      "Ohm's Law: The current flowing through a conductor is directly proportional to the voltage across it, provided the temperature and other physical conditions stay constant. Written as V = IR.",
    "content.sections[5].cards[1].body":
      "At a constant voltage, the current flowing decreases as the resistance increases. Increasing the length of a wire increases its resistance, which reduces the current.",
    "content.sections[6].intro":
      "A series circuit connects components one after another in a single path. A parallel circuit splits into separate branches. That difference changes how current, voltage and resistance behave.",
    "content.sections[6].cards[0].body":
      "Household electrical wiring uses parallel circuits so that every appliance receives the same voltage from the supply, and each appliance can be switched on or off without affecting the others.",
    "content.sections[7].intro":
      "Magnets occur naturally as lodestone, but most magnets used today are made from materials such as iron, steel, cobalt and nickel. The region around a magnet where its magnetic force can be felt is called the magnetic field.",
    "content.sections[8].intro":
      "An electromagnet is a temporary magnet — it only produces a magnetic field while a current flows. The direction of the field produced is set by the direction of the current, and the pattern of the field depends on the shape of the conductor.",
    "content.sections[8].cards[0].body":
      "The strength of a magnetic field decreases as you move further from the centre of the conductor. This is different from the factors that change the strength of the electromagnet itself — distance changes the strength you measure, not the strength produced.",
    "content.sections[9].cards[0].body":
      "A compass needle uses a freely suspended magnet to show the direction of the poles. Credit and debit cards store information on a magnetic strip.",
    "content.sections[9].cards[1].body":
      "An electric bell uses an electromagnet to move its striker repeatedly. A magnetic door lock uses an electromagnet to lock a door automatically — and because it is an electromagnet, the lock releases when the current is switched off.",
  },
};

/** Only these field-path suffixes are wired to render through ScienceEmphasis. */
const ALLOWED_FIELD = /\.(body|intro|note|challenge|adaptation|role|benefit|remember|quickExplanation)(\[\d+\])?$/;

describe("Chapter 7 — the textbook's emphasis, and only that", () => {
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
    expect(fieldsWithMarkers(scienceF2C7InteractiveBM)).toEqual(fieldsWithMarkers(scienceF2C7InteractiveDLP));
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
