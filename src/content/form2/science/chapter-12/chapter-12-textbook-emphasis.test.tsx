import { describe, expect, it } from "vitest";
import { scienceEmphasisParts, stripEmphasis } from "@/components/notes/blocks/ScienceEmphasis";
import { scienceF2C12InteractiveBM } from "./interactive-bm";
import { scienceF2C12InteractiveDLP } from "./interactive-dlp";
import type { ScienceF2InteractiveContent } from "../interactive-types";

/**
 * Guards the transfer of the Sains Tingkatan 2 / DLP textbook's own emphasis
 * into Chapter 12 (Solar System).
 *
 * As with Chapter 1 and Chapter 11's guards: the pass only adds `**markers**`
 * around wording AcadeMY already had, so most of this file checks what did NOT
 * change — strip the markers back out and every touched string must be
 * byte-identical to what it was before.
 */

const STREAMS: [string, ScienceF2InteractiveContent][] = [
  ["BM", scienceF2C12InteractiveBM],
  ["DLP", scienceF2C12InteractiveDLP],
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
    "kira-kira 10 kali jisim Bumi",
    "unit astronomi dan tahun cahaya",
    "planet kerdil",
    "1 A.U. = 1.5 × 10⁸ km",
    "satu unit JARAK, bukan unit masa",
    "9.5 A.U.",
    "planet yang berada lebih dekat dengan Matahari menerima lebih banyak haba",
    "427 °C",
    "−173 °C",
    "kesan rumah hijau",
    "lebih panas daripada Utarid walaupun Zuhrah lebih jauh dari Matahari",
    "kurang daripada 1/100 tekanan Bumi",
    "bergantung pada jisim dan ketumpatan planet itu",
    "Semakin jauh sebuah planet dari Matahari, semakin banyak masa diperlukan untuk mengelilingi Matahari dalam satu orbit.",
    "Matahari terbit di timur dan terbenam di barat",
    "Matahari akan terbit dari barat",
    "paksi putarannya condong hampir selari dengan orbitnya",
    "Putaran Bumi pada paksinya menyebabkan berlakunya kejadian siang dan malam serta pasang surut air laut.",
    "jasad yang mengelilingi planet dengan orbitnya sendiri",
    "lebih kurang 27 hari",
    "permukaan Bulan yang sama akan menghadap ke arah Bumi pada setiap masa",
    "Bumi merupakan satu-satunya planet yang mempunyai hidupan",
    "Jejak ekologi",
    "Jika jejak ekologi melebihi kemampuan Bumi untuk memperbaharui sumber, Bumi akan kehabisan sumber.",
  ],
  DLP: [
    "roughly 10 times Earth's mass",
    "astronomical units and light years",
    "dwarf planet",
    "1 A.U. = 1.5 × 10⁸ km",
    "a unit of DISTANCE, not of time",
    "9.5 A.U.",
    "a planet closer to the Sun receives more heat",
    "427 °C",
    "−173 °C",
    "greenhouse effect",
    "hotter than Mercury even though Venus is farther from the Sun",
    "less than 1/100 of Earth's pressure",
    "depends on the planet's mass and its density",
    "The farther a planet is from the Sun, the more time it needs to travel once around the Sun in its orbit.",
    "the Sun rise in the east and set in the west",
    "the Sun would rise in the west",
    "its axis of rotation is tilted almost parallel to its orbit around the Sun",
    "Earth's rotation on its axis causes day and night and the tides.",
    "a body that orbits a planet in its own orbit",
    "about 27 days",
    "the same surface of the Moon always faces Earth",
    "Earth is the only planet that has life",
    "The ecological footprint",
    "If the ecological footprint exceeds Earth's ability to renew its resources, Earth will run out of resources.",
  ],
};

/** Field path -> the exact original wording (before markers were added). */
const ORIGINALS: Record<string, Record<string, string>> = {
  BM: {
    "content.blogHighlight.body":
      "Pada awal 2016, ahli astronomi mengesan tanda-tanda kemungkinan wujudnya sebuah planet baharu dalam sistem suria kita — dianggarkan berjisim kira-kira 10 kali jisim Bumi. Penemuan ini masih lagi dalam peringkat kajian, bukan penemuan yang disahkan.",
    "content.sections[0].intro":
      "Sistem suria terdiri daripada lapan planet yang mengorbit Matahari, termasuk Bumi. Jarak planet-planet dari Matahari adalah sangat besar, jadi unit astronomi dan tahun cahaya digunakan untuk mengukur jarak relatif planet itu dari Matahari. Pada tahun 2006, Pluto tidak lagi dikenali sebagai planet dalam sistem suria, sebaliknya dikenali sebagai planet kerdil.",
    "content.sections[0].cards[0].body":
      "Jarak purata di antara Bumi dengan Matahari, iaitu kira-kira 93 juta batu atau 150 juta kilometer. 1 A.U. = 1.5 × 10⁸ km.",
    "content.sections[0].cards[1].body":
      "Tahun cahaya ialah satu unit JARAK, bukan unit masa — iaitu jarak yang ditempuh cahaya dalam masa setahun. Cahaya bergerak pada halaju 300 000 km setiap saat, maka cahaya boleh bergerak sejauh 9.5 × 10¹² km dalam setahun.",
    "content.sections[0].cards[2].body":
      "Zuhal berada pada jarak 1.43 × 10⁹ km dari Matahari. Jarak itu bersamaan 9.5 A.U. atau 1.51 × 10⁻⁴ tahun cahaya. Jarak Bumi dari Matahari, 1.5 × 10⁸ km, bersamaan 1.0 A.U. atau 1.58 × 10⁻⁵ tahun cahaya.",
    "content.sections[2].intro":
      "Ciri-ciri planet berkait antara satu sama lain. Secara teorinya, planet yang berada lebih dekat dengan Matahari menerima lebih banyak haba, tetapi situasi sebenar adalah lebih kompleks — dan beberapa anomali wujud.",
    "content.sections[2].accordions[0].body":
      "Sinaran Matahari terus sampai ke permukaannya, menyebabkan bahagian yang menghadap Matahari sangat panas, iaitu melebihi 427 °C. Bahagian yang gelap pula sangat sejuk, iaitu suhu boleh menurun sehingga −173 °C.",
    "content.sections[2].accordions[1].body":
      "Zuhrah mempunyai awan tebal yang memantulkan sinaran Matahari, tetapi lapisan atmosferanya yang kebanyakannya karbon dioksida menyebabkan kesan rumah hijau. Banyak haba diperangkap, jadi suhu permukaan boleh mencapai 462 °C — lebih panas daripada Utarid walaupun Zuhrah lebih jauh dari Matahari.",
    "content.sections[2].accordions[2].body":
      "Walaupun mempunyai atmosfera, tekanan permukaannya sangat rendah berbanding Bumi (kurang daripada 1/100 tekanan Bumi), jadi kesannya pada suhu permukaan adalah sedikit. Suhu boleh berbeza antara −143 °C hingga 35 °C.",
    "content.sections[2].cards[0].body":
      "Tarikan graviti di permukaan sesuatu planet bergantung pada jisim dan ketumpatan planet itu. Tarikan graviti Utarid dan Marikh lebih rendah daripada Bumi kerana jisim planet yang rendah. Tarikan graviti Zuhrah hampir sama dengan Bumi kerana jisimnya hampir sama. Tarikan graviti Musytari sangat tinggi berbanding Bumi kerana jisimnya yang sangat tinggi walaupun ketumpatannya sangat rendah. Walaupun Zuhal, Uranus dan Neptun mempunyai jisim yang sangat tinggi, tarikan graviti planet-planet ini tidak terlalu tinggi berbanding Bumi kerana planet gergasi bergas mempunyai ketumpatan yang rendah.",
    "content.sections[2].cards[1].body":
      "Semakin jauh sebuah planet dari Matahari, semakin banyak masa diperlukan untuk mengelilingi Matahari dalam satu orbit. Utarid paling dekat dengan Matahari, maka ia mengambil masa 88 hari sahaja untuk satu orbit. Neptun, planet yang paling jauh, mengambil masa 164.8 tahun.",
    "content.sections[2].tabs[0].body":
      "Berputar dari barat ke timur. Kerana Bumi berputar dari barat ke timur, kita melihat Matahari terbit di timur dan terbenam di barat.",
    "content.sections[2].tabs[1].body":
      "Berputar dari timur ke barat — arah bertentangan dengan Bumi. Hal ini bermakna di Zuhrah, Matahari akan terbit dari barat.",
    "content.sections[2].tabs[2].body":
      "Berputar pada sisinya — paksi putarannya condong hampir selari dengan orbitnya yang mengelilingi Matahari.",
    "content.sections[3].cards[0].body":
      "Putaran Bumi pada paksinya menyebabkan berlakunya kejadian siang dan malam serta pasang surut air laut. Jika Bumi berputar perlahan atau berhenti berputar: waktu siang dan malam menjadi panjang di dua bahagian Bumi yang berbeza; kawasan gurun bertambah pada bahagian Bumi yang menghadap Matahari; waktu berlaku pasang surut air berubah; dan suhu pada bahagian Bumi yang tidak disinari Matahari akan menjadi sangat dingin.",
    "content.sections[3].accordions[0].body":
      "Bincangkan berdasarkan data dalam jadual perbandingan. Satelit semula jadi ialah jasad yang mengelilingi planet dengan orbitnya sendiri. Utarid dan Zuhrah tidak mempunyai satelit semula jadi, Bumi mempunyai satu, Marikh dua (Phobos dan Deimos), manakala Musytari 67, Zuhal 62, Uranus 27 dan Neptun 14. Perhatikan hubungan antara bilangan satelit dengan saiz, jisim dan tarikan graviti planet itu, kemudian nyatakan penaakulan anda.",
    "content.sections[3].accordions[1].body":
      "Gunakan maklumat berikut untuk menaakul. Bulan berputar pada paksinya dan pada masa yang sama beredar mengelilingi Bumi pada orbitnya. Tempoh masa putaran Bulan pada paksinya dan peredarannya mengelilingi Bumi adalah sama, iaitu lebih kurang 27 hari. Oleh itu, permukaan Bulan yang sama akan menghadap ke arah Bumi pada setiap masa. Saiz Bumi pula adalah empat kali ganda berbanding saiz Bulan.",
    "content.sections[4].intro":
      "Setakat ini, Bumi merupakan satu-satunya planet yang mempunyai hidupan. Bumi dapat menampung hidupan akibat beberapa faktor seperti kehadiran air, sumber mineral, suhu permukaan dan kandungan atmosferanya.",
    "content.sections[4].cards[0].body":
      "Jejak ekologi ialah ukuran kemampuan air dan tanah menyediakan sumber yang diperlukan oleh manusia (makanan, minuman, kediaman dan lain-lain) serta kemampuan Bumi untuk menyerap semua bahan buangan manusia lalu menghasilkan semula sumber sesudah mereka menggunakannya.",
    "content.sections[4].cards[1].body":
      "Jika jejak ekologi melebihi kemampuan Bumi untuk memperbaharui sumber, Bumi akan kehabisan sumber. Sebagai pengguna yang berhemah, setiap individu berperanan menguruskan alam dan mengurangkan jejak ekologi masing-masing.",
  },
  DLP: {
    "content.blogHighlight.body":
      "In early 2016, astronomers spotted signs of a possible new planet in our solar system — estimated at roughly 10 times Earth's mass. This finding is still at the research stage, not a confirmed discovery.",
    "content.sections[0].intro":
      "The solar system consists of eight planets orbiting the Sun, including Earth. The distances of the planets from the Sun are very large, so astronomical units and light years are used to measure their relative distances from the Sun. In 2006, Pluto was no longer recognised as a planet in the solar system; it is now known as a dwarf planet.",
    "content.sections[0].cards[0].body":
      "The average distance between Earth and the Sun, which is about 93 million miles or 150 million kilometres. 1 A.U. = 1.5 × 10⁸ km.",
    "content.sections[0].cards[1].body":
      "A light year is a unit of DISTANCE, not of time — it is the distance travelled by light in one year. Light travels at 300 000 km every second, so light can travel 9.5 × 10¹² km in a year.",
    "content.sections[0].cards[2].body":
      "Saturn is 1.43 × 10⁹ km from the Sun. That distance equals 9.5 A.U. or 1.51 × 10⁻⁴ light years. Earth's distance from the Sun, 1.5 × 10⁸ km, equals 1.0 A.U. or 1.58 × 10⁻⁵ light years.",
    "content.sections[2].intro":
      "The characteristics of the planets are related to one another. In theory a planet closer to the Sun receives more heat, but the real situation is more complex — and some anomalies exist.",
    "content.sections[2].accordions[0].body":
      "Sunlight reaches its surface directly, so the side facing the Sun is extremely hot, above 427 °C. The dark side is extremely cold, with temperatures falling to −173 °C.",
    "content.sections[2].accordions[1].body":
      "Venus has thick clouds that reflect sunlight, but its atmosphere, mostly carbon dioxide, causes a greenhouse effect. A great deal of heat is trapped, so the surface temperature can reach 462 °C — hotter than Mercury even though Venus is farther from the Sun.",
    "content.sections[2].accordions[2].body":
      "Although Mars has an atmosphere, its surface pressure is very low compared with Earth's (less than 1/100 of Earth's pressure), so it has little effect on surface temperature. Temperatures range between −143 °C and 35 °C.",
    "content.sections[2].cards[0].body":
      "The gravitational attraction at a planet's surface depends on the planet's mass and its density. The gravitational attraction of Mercury and Mars is lower than Earth's because their masses are low. Venus's gravitational attraction is close to Earth's because its mass is close to Earth's. Jupiter's gravitational attraction is very high compared with Earth's because its mass is very high, even though its density is very low. Although Saturn, Uranus and Neptune have very high masses, the gravitational attraction of these planets is not much higher than Earth's because gas giants have low density.",
    "content.sections[2].cards[1].body":
      "The farther a planet is from the Sun, the more time it needs to travel once around the Sun in its orbit. Mercury is closest to the Sun, so it takes only 88 days for one orbit. Neptune, the farthest planet, takes 164.8 years.",
    "content.sections[2].tabs[0].body":
      "Rotate from west to east. Because Earth rotates from west to east, we see the Sun rise in the east and set in the west.",
    "content.sections[2].tabs[1].body":
      "Rotates from east to west — the opposite direction to Earth. This means that on Venus, the Sun would rise in the west.",
    "content.sections[2].tabs[2].body":
      "Rotates on its side — its axis of rotation is tilted almost parallel to its orbit around the Sun.",
    "content.sections[3].cards[0].body":
      "Earth's rotation on its axis causes day and night and the tides. If Earth rotated slowly or stopped rotating: day and night would become long on two different parts of Earth; desert areas would increase on the part facing the Sun; the timing of the tides would change; and the temperature on the part of Earth not lit by the Sun would become very cold.",
    "content.sections[3].accordions[0].body":
      "Discuss this using the data in the comparison table. A natural satellite is a body that orbits a planet in its own orbit. Mercury and Venus have no natural satellites, Earth has one, Mars has two (Phobos and Deimos), while Jupiter has 67, Saturn 62, Uranus 27 and Neptune 14. Look for a relationship between the number of satellites and each planet's size, mass and gravitational attraction, then state your reasoning.",
    "content.sections[3].accordions[1].body":
      "Use the following information to reason it out. The Moon rotates on its axis and at the same time revolves around Earth in its orbit. The time the Moon takes to rotate on its axis and to revolve around Earth is the same, about 27 days. Because of this, the same surface of the Moon always faces Earth. Earth is also four times the size of the Moon.",
    "content.sections[4].intro":
      "So far, Earth is the only planet that has life. Earth can support life because of several factors such as the presence of water, mineral resources, surface temperature and the content of its atmosphere.",
    "content.sections[4].cards[0].body":
      "The ecological footprint is a measure of the ability of water and land to provide the resources needed by humans (food, drink, shelter and others), together with Earth's ability to absorb all human waste and then regenerate those resources after they have been used.",
    "content.sections[4].cards[1].body":
      "If the ecological footprint exceeds Earth's ability to renew its resources, Earth will run out of resources. As responsible consumers, every individual has a role in managing the environment and reducing their own ecological footprint.",
  },
};

/** Only these field-path suffixes are wired to render through ScienceEmphasis. */
const ALLOWED_FIELD = /\.(body|intro|note|challenge|adaptation|role|benefit|remember|quickExplanation)(\[\d+\])?$/;

describe("Chapter 12 — the textbook's emphasis, and only that", () => {
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
    expect(fieldsWithMarkers(scienceF2C12InteractiveBM)).toEqual(fieldsWithMarkers(scienceF2C12InteractiveDLP));
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
