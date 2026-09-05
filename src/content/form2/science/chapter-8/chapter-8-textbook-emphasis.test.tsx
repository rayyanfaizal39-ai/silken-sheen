import { describe, expect, it } from "vitest";
import { scienceEmphasisParts, stripEmphasis } from "@/components/notes/blocks/ScienceEmphasis";
import { scienceF2C8InteractiveBM } from "./interactive-bm";
import { scienceF2C8InteractiveDLP } from "./interactive-dlp";
import type { ScienceF2InteractiveContent } from "../interactive-types";

/**
 * Guards the transfer of the Sains Tingkatan 2 / DLP textbook's own emphasis
 * into Chapter 8 (Force and Motion).
 *
 * As with Chapter 1, 11 and 12's guards: the pass only adds `**markers**`
 * around wording AcadeMY already had, so most of this file checks what did NOT
 * change — strip the markers back out and every touched string must be
 * byte-identical to what it was before.
 */

const STREAMS: [string, ScienceF2InteractiveContent][] = [
  ["BM", scienceF2C8InteractiveBM],
  ["DLP", scienceF2C8InteractiveDLP],
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
    "tidak dapat melihatnya",
    "merasai kesannya",
    "tarikan atau tolakan",
    "kuantiti vektor",
    "titik aplikasi (tempat tepat daya itu dikenakan)",
    "neraca spring",
    "prinsip pemanjangan spring",
    "newton (N)",
    "sama magnitud tetapi bertentangan arah",
    "daya normal meja (daya tindak balas)",
    "Daya apungan (daya tindak balas)",
    "daya tindakan",
    "daya tindak balas",
    "lima kesan utama",
    "tujahan ke atas",
    "kurang tumpat daripada cecair akan terapung",
    "lebih tumpat daripada cecair akan tenggelam",
    "garisan Plimsoll",
    "palang yang berputar pada satu titik yang tetap",
    "pangsi atau fulkrum",
    "momen daya",
    "daya per unit luas permukaan",
    "Teori kinetik gas",
    "tekanan udara",
    "tekanan yang dikenakan oleh atmosfera ke atas permukaan Bumi dan semua jasad di Bumi",
    "Tekanan atmosfera berkurang apabila altitud meningkat.",
    "menolak air masuk ke dalam penyedut",
    "tekanan atmosfera di luar mengenakan daya yang sangat besar",
    "mengalir keluar secara berterusan",
    "Tekanan dalam cecair bertambah apabila kedalaman bertambah.",
  ],
  DLP: [
    "You cannot see a force",
    "feel what it does",
    "push or a pull",
    "vector quantity",
    "point of application (exactly where the force acts)",
    "spring balance",
    "principle of spring extension",
    "newton (N)",
    "equal magnitude acting in the opposite direction",
    "normal force from the table (reaction force)",
    "buoyant force (reaction force)",
    "action force",
    "reaction force",
    "five main effects",
    "upthrust",
    "less dense than the liquid floats",
    "denser than the liquid sinks",
    "Plimsoll line",
    "bar that turns about one fixed point",
    "pivot or fulcrum",
    "moment of force",
    "force per unit surface area",
    "kinetic theory of gases",
    "air pressure",
    "the pressure exerted by the atmosphere on the surface of the Earth and on all bodies on it",
    "Atmospheric pressure decreases as altitude increases.",
    "pushes the drink up into the straw",
    "atmospheric pressure outside exerts a very large force",
    "flow out continuously",
    "Pressure in a liquid increases as depth increases.",
  ],
};

/** Field path -> the exact original wording (before markers were added). */
const ORIGINALS: Record<string, Record<string, string>> = {
  BM: {
    "content.blogHighlight.body":
      "Berjalan, mengunyah, menendang bola, menarik tali dalam tarik tali — semua ini adalah daya yang bertindak. Anda tidak dapat melihatnya, tetapi anda sentiasa dapat merasai kesannya.",
    "content.sections[0].intro":
      "Daya ialah tarikan atau tolakan yang dikenakan ke atas sesuatu objek. Daya tidak dapat dilihat, tetapi kesannya sentiasa boleh diperhatikan. Hampir semua aktiviti harian melibatkan daya — membuka tin makanan, menekan suis, membuka pintu. Tekan setiap jenis daya di bawah untuk mengenalinya.",
    "content.sections[1].intro":
      "Daya ialah kuantiti vektor: setiap daya mempunyai magnitud (kekuatan), arah, dan titik aplikasi (tempat tepat daya itu dikenakan). Kerana itu daya dilukis sebagai anak panah — panjang anak panah menunjukkan magnitud, mata anak panah menunjukkan arah, dan pangkalnya terletak pada titik aplikasi.",
    "content.sections[1].cards[0].body":
      "Daya diukur dengan neraca spring, yang beroperasi berdasarkan prinsip pemanjangan spring. Kekuatan daya dibaca daripada skala pada neraca itu.",
    "content.sections[1].cards[1].body":
      "Unit S.I. bagi daya ialah newton (N). Di Bumi, objek berjisim 100 g mempunyai berat 1 N — jadi objek berjisim 1 kg mempunyai berat 10 N.",
    "content.sections[2].intro":
      "Bagi setiap daya tindakan, wujud satu daya tindak balas yang sama magnitud tetapi bertentangan arah. Tiga situasi di bawah menunjukkan pasangan daya ini dengan jelas.",
    "content.sections[2].accordions[0].body":
      "Berat buku (daya tindakan) menarik ke bawah. Pada masa yang sama, daya normal meja (daya tindak balas) menolak ke atas dengan magnitud yang sama. Buku kekal pegun kerana kedua-dua magnitud itu sama.",
    "content.sections[2].accordions[1].body":
      "Berat bongkah (daya tindakan) menarik ke bawah. Daya apungan (daya tindak balas) menolak ke atas dengan magnitud yang sama. Objek itu terapung kerana kedua-dua magnitud itu sama.",
    "content.sections[2].accordions[2].body":
      "Troli pertama mengenakan daya kenyal pada troli kedua — itulah daya tindakan. Pada masa yang sama, troli kedua mengenakan daya yang sama magnitud tetapi bertentangan arah pada troli pertama — itulah daya tindak balas. Selepas dilepaskan, kedua-dua troli bergerak ke arah bertentangan dengan jarak yang sama.",
    "content.sections[3].intro":
      "Daya tidak dapat dilihat secara langsung, tetapi kesannya sentiasa dapat dikesan. Terdapat lima kesan utama tindakan daya.",
    "content.sections[4].intro":
      "Daya apungan ialah tujahan ke atas yang dikenakan oleh cecair terhadap objek di dalamnya. Daya apungan boleh ditentukan dengan neraca spring, dengan membandingkan berat objek di udara dengan beratnya semasa terendam.",
    "content.sections[4].cards[0].body":
      "Objek yang kurang tumpat daripada cecair akan terapung; objek yang lebih tumpat daripada cecair akan tenggelam. Gabus (0.24 g cm⁻³) terapung di atas air (1.0 g cm⁻³), manakala besi (7.9 g cm⁻³) tenggelam.",
    "content.sections[4].cards[1].body":
      "Kapal kargo ditandakan dengan garisan Plimsoll untuk tujuan keselamatan. Ketumpatan air laut berbeza mengikut suhu dan kepekatan garam di tempat yang berlainan, jadi aras selamat kapal itu turut berbeza.",
    "content.sections[5].intro":
      "Tuas ialah sebuah palang yang berputar pada satu titik yang tetap. Tuas terdiri daripada tiga bahagian: fulkrum (titik sokongan yang tetap), beban (objek yang hendak digerakkan) dan daya (tolakan atau tarikan yang dikenakan pada palang). Tuas membolehkan kita melakukan kerja dengan lebih mudah, selalunya dengan daya yang lebih kecil.",
    "content.sections[6].intro":
      "Daya yang dikenakan pada suatu objek boleh memutarkan objek itu pada satu titik tetap yang dipanggil pangsi atau fulkrum. Kesan putaran yang dihasilkan itu disebut momen daya.",
    "content.sections[7].intro":
      "Anda boleh menekan paku tekan ke dalam papan, tetapi tidak boleh menekan syiling ke dalam papan walaupun menggunakan daya yang sama. Sebabnya ialah tekanan: tekanan ditakrifkan sebagai daya per unit luas permukaan, dengan arah daya berserenjang dengan permukaan itu. Unit S.I. bagi tekanan ialah pascal (Pa); 1 Pa bersamaan dengan 1 newton per meter persegi (N m⁻²).",
    "content.sections[8].intro":
      "Teori kinetik gas menyatakan bahawa molekul-molekul udara sentiasa bergerak secara rawak dan berlanggar dengan dinding bekasnya. Perlanggaran ini menghasilkan daya yang menolak pada dinding bekas — daya per unit luas inilah yang dikenali sebagai tekanan udara.",
    "content.sections[9].intro":
      "Tekanan atmosfera ialah tekanan yang dikenakan oleh atmosfera ke atas permukaan Bumi dan semua jasad di Bumi. Gunakan istilah dengan betul: tekanan udara ialah tekanan yang dikenakan oleh udara secara umum, manakala tekanan atmosfera merujuk khusus kepada tekanan yang dikenakan oleh atmosfera Bumi.",
    "content.sections[9].cards[0].body":
      "Tekanan atmosfera berkurang apabila altitud meningkat. Semakin tinggi kedudukan kita, semakin sedikit udara yang berada di atas kita, jadi berat lajur udara yang menekan ke bawah menjadi lebih kecil dan tekanan atmosfera menjadi lebih rendah. Di kaki gunung, lebih banyak molekul udara berada di atas kita, jadi tekanannya lebih tinggi.",
    "content.sections[9].accordions[0].body":
      "Apabila udara di dalam penyedut disedut keluar, ruang di dalamnya menjadi bertekanan rendah. Tekanan udara yang lebih tinggi di luar — iaitu tekanan atmosfera — menolak air masuk ke dalam penyedut dan naik ke mulut. Bukan penyedut itu yang 'menyedut' air naik.",
    "content.sections[9].accordions[1].body":
      "Apabila udara di dalam hemisfera dipam keluar sehingga ruang di dalamnya menjadi vakum, tekanan di dalamnya menjadi sifar. Kedua-dua hemisfera sukar dipisahkan kerana tekanan atmosfera di luar mengenakan daya yang sangat besar ke atasnya.",
    "content.sections[9].accordions[3].body":
      "Hujung tiub yang satu diletakkan lebih rendah supaya air mengalir keluar. Air yang mengalir keluar menyebabkan tekanan di dalam tiub menjadi rendah, dan tekanan atmosfera menolak air masuk ke dalam tiub — menyebabkan air mengalir keluar secara berterusan.",
    "content.sections[10].intro":
      "Tekanan dalam cecair bertambah apabila kedalaman bertambah. Seorang penyelam mengalami tekanan kerana berat air yang bertindak ke atas badannya, dan tekanan itu meningkat semakin dalam dia menyelam.",
  },
  DLP: {
    "content.blogHighlight.body":
      "Walking, chewing, kicking a ball, pulling a rope in tug-of-war — all of these are forces at work. You cannot see a force, but you can always feel what it does.",
    "content.sections[0].intro":
      "A force is a push or a pull acting on an object. A force cannot be seen, but its effects can always be observed. Almost every daily activity involves force — opening a can of food, pressing a switch, opening a door. Tap each type of force below to get to know it.",
    "content.sections[1].intro":
      "Force is a vector quantity: every force has a magnitude (how strong it is), a direction, and a point of application (exactly where the force acts). That is why a force is drawn as an arrow — the length of the arrow shows the magnitude, the arrowhead shows the direction, and the tail sits on the point of application.",
    "content.sections[1].cards[0].body":
      "Force is measured with a spring balance, which works on the principle of spring extension. The strength of the force is read from the scale on the balance.",
    "content.sections[1].cards[1].body":
      "The S.I. unit of force is the newton (N). On Earth, an object with a mass of 100 g has a weight of 1 N — so an object with a mass of 1 kg has a weight of 10 N.",
    "content.sections[2].intro":
      "For every action force there is a reaction force of equal magnitude acting in the opposite direction. The three situations below show these force pairs clearly.",
    "content.sections[2].accordions[0].body":
      "The weight of the book (action force) pulls downward. At the same time, the normal force from the table (reaction force) pushes upward with equal magnitude. The book stays at rest because the two magnitudes are equal.",
    "content.sections[2].accordions[1].body":
      "The weight of the block (action force) pulls downward. The buoyant force (reaction force) pushes upward with equal magnitude. The object floats because the two magnitudes are equal.",
    "content.sections[2].accordions[2].body":
      "The first trolley exerts an elastic force on the second trolley — that is the action force. At the same time, the second trolley exerts a force of equal magnitude but in the opposite direction on the first trolley — that is the reaction force. Once released, both trolleys move in opposite directions through equal distances.",
    "content.sections[3].intro":
      "A force cannot be seen directly, but its effects can always be detected. There are five main effects of a force acting on an object.",
    "content.sections[4].intro":
      "Buoyant force is the upthrust a liquid exerts on an object in it. Buoyant force can be determined with a spring balance, by comparing the weight of the object in air with its weight while submerged.",
    "content.sections[4].cards[0].body":
      "An object less dense than the liquid floats; an object denser than the liquid sinks. Cork (0.24 g cm⁻³) floats on water (1.0 g cm⁻³), while iron (7.9 g cm⁻³) sinks.",
    "content.sections[4].cards[1].body":
      "Cargo ships are marked with a Plimsoll line for safety. The density of sea water differs with temperature and salt concentration in different places, so the safe floating level of the ship differs too.",
    "content.sections[5].intro":
      "A lever is a bar that turns about one fixed point. A lever has three parts: the fulcrum (the fixed supporting point), the load (the object to be moved) and the effort (the push or pull applied to the bar). Levers let us do work more easily, often using a smaller force.",
    "content.sections[6].intro":
      "A force applied to an object can turn that object about a fixed point called the pivot or fulcrum. The turning effect produced is called the moment of force.",
    "content.sections[7].intro":
      "You can press a drawing pin into a board, but you cannot press a coin into a board even using the same force. The reason is pressure: pressure is defined as force per unit surface area, with the force acting perpendicular to that surface. The S.I. unit of pressure is the pascal (Pa); 1 Pa is equal to 1 newton per square metre (N m⁻²).",
    "content.sections[8].intro":
      "The kinetic theory of gases states that air molecules move randomly at all times and collide with the walls of their container. These collisions produce a force pushing on the container walls — and that force per unit area is what we call air pressure.",
    "content.sections[9].intro":
      "Atmospheric pressure is the pressure exerted by the atmosphere on the surface of the Earth and on all bodies on it. Use the terms correctly: air pressure is the pressure exerted by air in general, while atmospheric pressure refers specifically to the pressure exerted by the Earth's atmosphere.",
    "content.sections[9].cards[0].body":
      "Atmospheric pressure decreases as altitude increases. The higher you are, the less air there is above you, so the weight of the column of air pressing down is smaller and the atmospheric pressure is lower. At the foot of a mountain there are more air molecules above you, so the pressure there is higher.",
    "content.sections[9].accordions[0].body":
      "When the air inside the straw is sucked out, the space inside becomes a region of low pressure. The higher air pressure outside — the atmospheric pressure — pushes the drink up into the straw and into your mouth. The straw does not 'suck' the drink upward by itself.",
    "content.sections[9].accordions[1].body":
      "When the air inside the hemispheres is pumped out so that the space inside becomes a vacuum, the pressure inside becomes zero. The two hemispheres are very hard to pull apart because the atmospheric pressure outside exerts a very large force on them.",
    "content.sections[9].accordions[3].body":
      "One end of the tube is placed lower so that water flows out of it. The water flowing out lowers the pressure inside the tube, and atmospheric pressure pushes water into the tube — making the water flow out continuously.",
    "content.sections[10].intro":
      "Pressure in a liquid increases as depth increases. A diver feels pressure because of the weight of the water acting on their body, and that pressure grows the deeper they dive.",
  },
};

/** Only these field-path suffixes are wired to render through ScienceEmphasis. */
const ALLOWED_FIELD = /\.(body|intro|note|challenge|adaptation|role|benefit|remember|quickExplanation)(\[\d+\])?$/;

describe("Chapter 8 — the textbook's emphasis, and only that", () => {
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
    expect(fieldsWithMarkers(scienceF2C8InteractiveBM)).toEqual(fieldsWithMarkers(scienceF2C8InteractiveDLP));
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
