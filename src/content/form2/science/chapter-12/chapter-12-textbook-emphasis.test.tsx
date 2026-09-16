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
 *
 * Field paths below are keyed against the 21-section textbook-order structure
 * (see chapter-12-remediation.test.tsx for the section-order guard).
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
    "planet kerdil",
    "unit astronomi",
    "1 A.U. = 1.5 × 10⁸ km",
    "tahun cahaya",
    "satu unit JARAK, bukan unit masa",
    "Jarak dalam A.U. = Jarak dalam km ÷ (1.5 × 10⁸ km)",
    "Jarak dalam ly = Jarak dalam km ÷ (9.5 × 10¹² km)",
    "planet yang lebih dekat dengan Matahari menerima lebih banyak haba",
    "427 °C",
    "−173 °C",
    "kesan rumah hijau",
    "lebih panas daripada Utarid walaupun Zuhrah lebih jauh dari Matahari",
    "kurang daripada 1/100 tekanan Bumi",
    "bergantung pada jisim dan ketumpatan planet itu",
    "tidak terlalu tinggi berbanding Bumi",
    "Semakin jauh sebuah planet dari Matahari, semakin banyak masa diperlukan untuk mengelilingi Matahari dalam satu orbit.",
    "kecuali Zuhrah dan Uranus",
    "Matahari terbit di timur dan terbenam di barat",
    "Matahari akan terbit dari barat",
    "paksi putarannya condong hampir selari dengan orbitnya",
    "Putaran Bumi pada paksinya menyebabkan berlakunya kejadian siang dan malam serta pasang surut air laut.",
    "Satelit semula jadi ialah jasad yang mengelilingi planet dengan orbitnya sendiri.",
    "lebih kurang 27 hari",
    "permukaan Bulan yang sama akan menghadap ke arah Bumi pada setiap masa",
    "Bumi merupakan satu-satunya planet yang mempunyai hidupan",
    "Jejak ekologi",
    "Jika jejak ekologi melebihi kemampuan Bumi untuk memperbaharui sumber, Bumi akan kehabisan sumber.",
  ],
  DLP: [
    "roughly 10 times Earth's mass",
    "dwarf planet",
    "astronomical unit",
    "1 A.U. = 1.5 × 10⁸ km",
    "light year",
    "a unit of DISTANCE, not of time",
    "Distance in A.U. = Distance in km ÷ (1.5 × 10⁸ km)",
    "Distance in ly = Distance in km ÷ (9.5 × 10¹² km)",
    "a planet closer to the Sun receives more heat",
    "427 °C",
    "−173 °C",
    "greenhouse effect",
    "hotter than Mercury even though Venus is farther from the Sun",
    "less than 1/100 of Earth's pressure",
    "depends on the planet's mass and its density",
    "not much higher than Earth's",
    "The farther a planet is from the Sun, the more time it generally needs to complete one orbit.",
    "except Venus and Uranus",
    "the Sun rise in the east and set in the west",
    "the Sun would rise in the west",
    "its axis of rotation is tilted almost parallel to its orbit around the Sun",
    "Earth's rotation on its axis causes day and night and the tides.",
    "Natural satellites are objects that move around planets in their own orbits.",
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
      "Sistem suria terdiri daripada lapan planet yang mengorbit Matahari, termasuk Bumi. Jarak planet-planet dari Matahari amat berbeza — dari 57.9 juta km bagi Utarid sehingga 4 500 juta km bagi Neptun. Jarak ini terlalu besar untuk dibandingkan dalam kilometer sahaja. Pada tahun 2006, Pluto tidak lagi dikenali sebagai planet dalam sistem suria; ia kini dikenali sebagai planet kerdil.",
    "content.sections[1].intro":
      "Kerana jarak antara Matahari dengan planet-planet amat besar, ahli astronomi menggunakan unit astronomi sebagai unit jarak yang lebih praktikal.",
    "content.sections[1].cards[0].body":
      "Jarak purata di antara Bumi dengan Matahari, iaitu kira-kira 93 juta batu atau 150 juta kilometer. 1 A.U. = 1.5 × 10⁸ km.",
    "content.sections[2].intro":
      "Untuk jarak yang lebih besar lagi daripada jarak antara planet — seperti jarak ke sebuah bintang — ahli astronomi menggunakan unit yang lebih besar: tahun cahaya.",
    "content.sections[2].cards[0].body":
      "Tahun cahaya ialah satu unit JARAK, bukan unit masa — iaitu jarak yang ditempuh cahaya dalam masa setahun. Cahaya bergerak pada halaju 300 000 km setiap saat, maka cahaya boleh bergerak sejauh 9.5 × 10¹² km dalam setahun.",
    "content.sections[3].cards[0].body":
      "Jarak dalam A.U. = Jarak dalam km ÷ (1.5 × 10⁸ km). Jarak dalam ly = Jarak dalam km ÷ (9.5 × 10¹² km).",
    "content.sections[8].intro":
      "Secara teorinya, planet yang lebih dekat dengan Matahari menerima lebih banyak haba. Tetapi lihat dengan lebih dekat: situasi sebenar adalah lebih kompleks, kerana atmosfera sesebuah planet mengubah berapa banyak haba yang sebenarnya diperangkap.",
    "content.sections[8].accordions[0].body":
      "Sinaran Matahari terus sampai ke permukaannya, menyebabkan bahagian yang menghadap Matahari sangat panas, iaitu melebihi 427 °C. Bahagian yang gelap pula sangat sejuk, iaitu suhu boleh menurun sehingga −173 °C.",
    "content.sections[8].accordions[1].body":
      "Zuhrah mempunyai awan tebal yang memantulkan sinaran Matahari, tetapi lapisan atmosferanya yang kebanyakannya karbon dioksida menyebabkan kesan rumah hijau. Banyak haba diperangkap, jadi suhu permukaan boleh mencapai 462 °C — lebih panas daripada Utarid walaupun Zuhrah lebih jauh dari Matahari.",
    "content.sections[8].accordions[3].body":
      "Walaupun mempunyai atmosfera, tekanan permukaannya sangat rendah berbanding Bumi (kurang daripada 1/100 tekanan Bumi), jadi kesannya pada suhu permukaan adalah sedikit. Suhu boleh berbeza antara −143 °C hingga 35 °C.",
    "content.sections[9].intro":
      "Tarikan graviti di permukaan sesuatu planet bergantung pada jisim dan ketumpatan planet itu.",
    "content.sections[9].cards[0].body":
      "Tarikan graviti Utarid dan Marikh lebih rendah daripada Bumi kerana jisim planet yang rendah. Tarikan graviti Zuhrah hampir sama dengan Bumi kerana jisimnya hampir sama. Tarikan graviti Musytari sangat tinggi berbanding Bumi kerana jisimnya yang sangat tinggi walaupun ketumpatannya sangat rendah. Walaupun Zuhal, Uranus dan Neptun mempunyai jisim yang sangat tinggi, tarikan graviti planet-planet ini tidak terlalu tinggi berbanding Bumi kerana planet gergasi bergas mempunyai ketumpatan yang rendah.",
    "content.sections[10].intro":
      "Semakin jauh sebuah planet dari Matahari, semakin banyak masa diperlukan untuk mengelilingi Matahari dalam satu orbit. Utarid paling dekat dengan Matahari, maka ia mengambil masa 88 hari sahaja untuk satu orbit; Neptun, planet yang paling jauh, mengambil masa 164.8 tahun.",
    "content.sections[11].intro":
      "Semua planet berputar dari barat ke timur kecuali Zuhrah dan Uranus.",
    "content.sections[11].tabs[0].body":
      "Berputar dari barat ke timur. Kerana Bumi berputar dari barat ke timur, kita melihat Matahari terbit di timur dan terbenam di barat.",
    "content.sections[11].tabs[1].body":
      "Berputar dari timur ke barat — arah bertentangan dengan Bumi. Hal ini bermakna di Zuhrah, Matahari akan terbit dari barat.",
    "content.sections[11].tabs[2].body":
      "Berputar pada sisinya — paksi putarannya condong hampir selari dengan orbitnya yang mengelilingi Matahari.",
    "content.sections[12].cards[0].body":
      "Putaran Bumi pada paksinya menyebabkan berlakunya kejadian siang dan malam serta pasang surut air laut. Jika Bumi berputar perlahan atau berhenti berputar: waktu siang dan malam menjadi panjang di dua bahagian Bumi yang berbeza; kawasan gurun bertambah pada bahagian Bumi yang menghadap Matahari; waktu berlaku pasang surut air berubah; dan suhu pada bahagian Bumi yang tidak disinari Matahari akan menjadi sangat dingin.",
    "content.sections[13].intro":
      "Satelit semula jadi ialah jasad yang mengelilingi planet dengan orbitnya sendiri. Bulan ialah satelit semula jadi Bumi.",
    "content.sections[14].accordions[0].body":
      "Gunakan maklumat berikut untuk menaakul. Bulan berputar pada paksinya dan pada masa yang sama beredar mengelilingi Bumi pada orbitnya. Tempoh masa putaran Bulan pada paksinya dan peredarannya mengelilingi Bumi adalah sama, iaitu lebih kurang 27 hari. Oleh itu, permukaan Bulan yang sama akan menghadap ke arah Bumi pada setiap masa. Saiz Bumi pula adalah empat kali ganda berbanding saiz Bulan.",
    "content.sections[15].intro":
      "Setakat ini, Bumi merupakan satu-satunya planet yang mempunyai hidupan. Kesesuaian Bumi untuk hidupan bergantung pada beberapa ciri — diterokai satu demi satu seterusnya.",
    "content.sections[18].intro":
      "Jejak ekologi ialah ukuran kemampuan air dan tanah menyediakan sumber yang diperlukan oleh manusia (makanan, minuman, kediaman dan lain-lain), bersama kemampuan Bumi untuk menyerap semua bahan buangan manusia lalu menghasilkan semula sumber sesudah mereka menggunakannya.",
    "content.sections[18].cards[0].body":
      "Jika jejak ekologi melebihi kemampuan Bumi untuk memperbaharui sumber, Bumi akan kehabisan sumber. Sebagai pengguna yang berhemah, setiap individu berperanan menguruskan alam dan mengurangkan jejak ekologi masing-masing.",
  },
  DLP: {
    "content.blogHighlight.body":
      "In early 2016, astronomers spotted signs of a possible new planet in our solar system — estimated at roughly 10 times Earth's mass. This finding is still at the research stage, not a confirmed discovery.",
    "content.sections[0].intro":
      "The solar system consists of eight planets orbiting the Sun, including Earth. The distances of the planets from the Sun vary enormously — from Mercury's 57.9 million km to Neptune's 4 500 million km. These distances are so large that comparing them in kilometres alone quickly becomes impractical. In 2006, Pluto was no longer recognised as a planet in the solar system; it is now known as a dwarf planet.",
    "content.sections[1].intro":
      "Because the distances between the Sun and the planets are so large, astronomers use the astronomical unit as a more convenient unit of distance.",
    "content.sections[1].cards[0].body":
      "The average distance between Earth and the Sun, which is about 93 million miles or 150 million kilometres. 1 A.U. = 1.5 × 10⁸ km.",
    "content.sections[2].intro":
      "For distances even greater than those between planets — such as the distance to a star — astronomers use an even larger unit: the light year.",
    "content.sections[2].cards[0].body":
      "A light year is a unit of DISTANCE, not of time — it is the distance travelled by light in one year. Light travels at 300 000 km every second, so light can travel 9.5 × 10¹² km in a year.",
    "content.sections[3].cards[0].body":
      "Distance in A.U. = Distance in km ÷ (1.5 × 10⁸ km). Distance in ly = Distance in km ÷ (9.5 × 10¹² km).",
    "content.sections[8].intro":
      "Theoretically, a planet closer to the Sun receives more heat. But immediately look closer: the real situation is more complex, because a planet's atmosphere changes how much of that heat it actually keeps.",
    "content.sections[8].accordions[0].body":
      "Sunlight reaches its surface directly, so the side facing the Sun is extremely hot, above 427 °C. The dark side is extremely cold, with temperatures falling to −173 °C.",
    "content.sections[8].accordions[1].body":
      "Venus has thick clouds that reflect sunlight, but its atmosphere, mostly carbon dioxide, causes a greenhouse effect. A great deal of heat is trapped, so the surface temperature can reach 462 °C — hotter than Mercury even though Venus is farther from the Sun.",
    "content.sections[8].accordions[3].body":
      "Although Mars has an atmosphere, its surface pressure is very low compared with Earth's (less than 1/100 of Earth's pressure), so it has little effect on surface temperature. Temperatures range between −143 °C and 35 °C.",
    "content.sections[9].intro":
      "The gravitational pull at a planet's surface depends on the planet's mass and its density.",
    "content.sections[9].cards[0].body":
      "Mercury and Mars have weaker gravitational pull than Earth's because their masses are low. Venus's gravitational pull is close to Earth's because its mass is close to Earth's. Jupiter's gravitational pull is very high compared with Earth's because its mass is very high, even though its density is very low. Although Saturn, Uranus and Neptune have very high masses, the gravitational pull of these planets is not much higher than Earth's because gas giants have low density.",
    "content.sections[10].intro":
      "The farther a planet is from the Sun, the more time it generally needs to complete one orbit. Mercury is closest to the Sun, so it takes only 88 days for one orbit; Neptune, the farthest planet, takes 164.8 years.",
    "content.sections[11].intro": "All planets rotate from west to east except Venus and Uranus.",
    "content.sections[11].tabs[0].body":
      "Rotate from west to east. Because Earth rotates from west to east, we see the Sun rise in the east and set in the west.",
    "content.sections[11].tabs[1].body":
      "Rotates from east to west — the opposite direction to Earth. This means that on Venus, the Sun would rise in the west.",
    "content.sections[11].tabs[2].body":
      "Rotates on its side — its axis of rotation is tilted almost parallel to its orbit around the Sun.",
    "content.sections[12].cards[0].body":
      "Earth's rotation on its axis causes day and night and the tides. If Earth rotated slowly or stopped rotating: day and night would become long on two different parts of Earth; desert areas would increase on the part facing the Sun; the timing of the tides would change; and the temperature on the part of Earth not lit by the Sun would become very cold.",
    "content.sections[13].intro":
      "Natural satellites are objects that move around planets in their own orbits. The Moon is Earth's natural satellite.",
    "content.sections[14].accordions[0].body":
      "Use the following information to reason it out. The Moon rotates on its axis and at the same time revolves around Earth in its orbit. The time the Moon takes to rotate on its axis and to revolve around Earth is the same, about 27 days. Because of this, the same surface of the Moon always faces Earth. Earth is also four times the size of the Moon.",
    "content.sections[15].intro":
      "So far, Earth is the only planet that has life. Earth's suitability for life depends on several characteristics — explored next, one at a time.",
    "content.sections[18].intro":
      "The ecological footprint is a measure of the ability of water and land to provide the resources needed by humans (food, drink, shelter and others), together with Earth's ability to absorb all human waste and then regenerate those resources after they have been used.",
    "content.sections[18].cards[0].body":
      "If the ecological footprint exceeds Earth's ability to renew its resources, Earth will run out of resources. As responsible consumers, every individual has a role in managing the environment and reducing their own ecological footprint.",
  },
};

/** Only these field-path suffixes are wired to render through ScienceEmphasis. */
const ALLOWED_FIELD =
  /\.(body|intro|note|challenge|adaptation|role|benefit|remember|quickExplanation)(\[\d+\])?$/;

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
    expect(fieldsWithMarkers(scienceF2C12InteractiveBM)).toEqual(
      fieldsWithMarkers(scienceF2C12InteractiveDLP),
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
