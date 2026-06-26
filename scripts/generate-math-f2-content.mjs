import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const mathRoot = path.join(root, "src", "content", "form2", "math");

const chapters = [
  {
    num: 2,
    bm: "Pemfaktoran dan Pecahan Algebra",
    dlp: "Factorisation and Algebraic Fractions",
    topics: [
      { no: "2.1", bm: "Kembangan", dlp: "Expansion", formula: "a(b + c) = ab + ac", example: "3x(2x - 5) = 6x^2 - 15x", skill: "multiply every term inside brackets", bmSkill: "darab setiap sebutan dalam kurungan" },
      { no: "2.2", bm: "Pemfaktoran Ungkapan Algebra", dlp: "Factorisation of Algebraic Expressions", formula: "a^2 - b^2 = (a + b)(a - b)", example: "x^2 + 5x + 6 = (x + 2)(x + 3)", skill: "factorise using HCF, difference of squares or cross method", bmSkill: "faktorkan menggunakan FSTB, beza dua kuasa dua atau kaedah silang" },
      { no: "2.3", bm: "Pendaraban dan Pembahagian Pecahan Algebra", dlp: "Multiplication and Division of Algebraic Fractions", formula: "a/b ÷ c/d = a/b x d/c", example: "(2x)/5 ÷ (4x^2)/15 = 3/(2x)", skill: "factorise, cancel common factors and multiply", bmSkill: "faktorkan, batalkan faktor sepunya dan darab" },
      { no: "2.4", bm: "Penambahan dan Penolakan Pecahan Algebra", dlp: "Addition and Subtraction of Algebraic Fractions", formula: "a/c + b/c = (a + b)/c", example: "x/3 + x/4 = 7x/12", skill: "use LCM before adding or subtracting", bmSkill: "gunakan GSTK sebelum menambah atau menolak" },
    ],
  },
  {
    num: 3,
    bm: "Rumus Algebra",
    dlp: "Algebraic Formulae",
    topics: [
      { no: "3.1", bm: "Rumus Algebra", dlp: "Algebraic Formulae", formula: "subject of formula = variable written alone", example: "A = lw, if l = 5 and w = 3 then A = 15", skill: "substitute values accurately", bmSkill: "gantikan nilai dengan tepat" },
      { no: "3.2", bm: "Menukar Perkara Rumus", dlp: "Changing the Subject of a Formula", formula: "if y = mx + c, then x = (y - c)/m", example: "P = 2l + 2w, l = (P - 2w)/2", skill: "use inverse operations on both sides", bmSkill: "gunakan operasi songsang pada kedua-dua belah" },
      { no: "3.3", bm: "Aplikasi Rumus", dlp: "Application of Formulae", formula: "replace variables with given values", example: "v = u + at, with u=4, a=2, t=5 gives v=14", skill: "identify variables and units", bmSkill: "kenal pasti pemboleh ubah dan unit" },
    ],
  },
  {
    num: 4,
    bm: "Poligon",
    dlp: "Polygons",
    topics: [
      { no: "4.1", bm: "Poligon Sekata", dlp: "Regular Polygons", formula: "regular polygon: all sides and angles are equal", example: "regular pentagon has 5 equal sides", skill: "identify sides, vertices and equal angles", bmSkill: "kenal pasti sisi, bucu dan sudut yang sama" },
      { no: "4.2", bm: "Sudut Pedalaman dan Sudut Peluaran", dlp: "Interior and Exterior Angles", formula: "sum of interior angles = (n - 2) x 180°", example: "hexagon: (6 - 2) x 180° = 720°", skill: "use n for number of sides", bmSkill: "gunakan n sebagai bilangan sisi" },
      { no: "4.3", bm: "Sudut Poligon Sekata", dlp: "Angles of Regular Polygons", formula: "exterior angle = 360°/n", example: "regular octagon exterior angle = 45°", skill: "divide angle sums by number of equal angles", bmSkill: "bahagikan jumlah sudut dengan bilangan sudut sama" },
    ],
  },
  {
    num: 5,
    bm: "Bulatan",
    dlp: "Circles",
    topics: [
      { no: "5.1", bm: "Sifat Bulatan", dlp: "Properties of Circles", formula: "diameter = 2 x radius", example: "radius 7 cm gives diameter 14 cm", skill: "recognise centre, radius, diameter, chord, arc and sector", bmSkill: "kenal pusat, jejari, diameter, perentas, lengkok dan sektor" },
      { no: "5.2", bm: "Lilitan Bulatan", dlp: "Circumference of a Circle", formula: "C = 2πr = πd", example: "r = 7 cm, C = 44 cm using π = 22/7", skill: "choose radius or diameter formula correctly", bmSkill: "pilih formula jejari atau diameter dengan betul" },
      { no: "5.3", bm: "Luas Bulatan", dlp: "Area of a Circle", formula: "A = πr^2", example: "r = 7 cm, A = 154 cm^2 using π = 22/7", skill: "square the radius before multiplying by pi", bmSkill: "kuasakan dua jejari sebelum mendarab pi" },
    ],
  },
  {
    num: 6,
    bm: "Bentuk Geometri Tiga Dimensi",
    dlp: "Three-Dimensional Geometrical Shapes",
    topics: [
      { no: "6.1", bm: "Sifat Bentuk 3D", dlp: "Properties of 3D Shapes", formula: "faces, edges and vertices describe solids", example: "cube: 6 faces, 12 edges, 8 vertices", skill: "count faces, edges and vertices systematically", bmSkill: "kira muka, tepi dan bucu secara sistematik" },
      { no: "6.2", bm: "Bentangan Bentuk 3D", dlp: "Nets of 3D Shapes", formula: "net = flat pattern that folds into a solid", example: "cube net has 6 congruent squares", skill: "visualise folding without overlapping faces", bmSkill: "bayangkan lipatan tanpa muka bertindih" },
      { no: "6.3", bm: "Luas Permukaan dan Isi Padu", dlp: "Surface Area and Volume", formula: "volume of prism = cross-sectional area x length", example: "cuboid volume = l x w x h", skill: "separate surface area from volume", bmSkill: "bezakan luas permukaan daripada isi padu" },
    ],
  },
  {
    num: 7,
    bm: "Koordinat",
    dlp: "Coordinates",
    topics: [
      { no: "7.1", bm: "Satah Cartes", dlp: "Cartesian Plane", formula: "coordinate = (x, y)", example: "(3, -2) means x=3 and y=-2", skill: "move along x-axis first, then y-axis", bmSkill: "gerak pada paksi-x dahulu, kemudian paksi-y" },
      { no: "7.2", bm: "Jarak antara Dua Titik", dlp: "Distance Between Two Points", formula: "horizontal or vertical distance = difference of coordinates", example: "from (2, 5) to (2, 9), distance = 4 units", skill: "compare the changing coordinate", bmSkill: "bandingkan koordinat yang berubah" },
      { no: "7.3", bm: "Titik Tengah", dlp: "Midpoint", formula: "midpoint = ((x1 + x2)/2, (y1 + y2)/2)", example: "midpoint of (2,4) and (6,8) is (4,6)", skill: "average x-values and y-values separately", bmSkill: "puratakan nilai x dan nilai y secara berasingan" },
    ],
  },
  {
    num: 8,
    bm: "Graf Fungsi",
    dlp: "Graphs of Functions",
    topics: [
      { no: "8.1", bm: "Fungsi", dlp: "Functions", formula: "f(x) gives the output for input x", example: "if f(x)=2x+1, f(3)=7", skill: "substitute the given x-value", bmSkill: "gantikan nilai x yang diberi" },
      { no: "8.2", bm: "Jadual Nilai", dlp: "Tables of Values", formula: "ordered pair = (x, y)", example: "y = x + 2 gives (0,2), (1,3), (2,4)", skill: "calculate y for each x", bmSkill: "kira y untuk setiap x" },
      { no: "8.3", bm: "Melukis Graf Fungsi", dlp: "Drawing Graphs of Functions", formula: "linear graph is straight; quadratic graph is curved", example: "y = 2x + 1 is a straight line", skill: "plot points accurately and join correctly", bmSkill: "plot titik dengan tepat dan sambung dengan betul" },
    ],
  },
  {
    num: 9,
    bm: "Laju dan Pecutan",
    dlp: "Speed and Acceleration",
    topics: [
      { no: "9.1", bm: "Laju", dlp: "Speed", formula: "speed = distance / time", example: "120 km in 2 h gives 60 km/h", skill: "use matching distance and time units", bmSkill: "gunakan unit jarak dan masa yang sepadan" },
      { no: "9.2", bm: "Laju Purata", dlp: "Average Speed", formula: "average speed = total distance / total time", example: "180 km in 3 h gives 60 km/h", skill: "use total distance and total time", bmSkill: "gunakan jumlah jarak dan jumlah masa" },
      { no: "9.3", bm: "Pecutan", dlp: "Acceleration", formula: "acceleration = change in speed / time", example: "from 10 m/s to 25 m/s in 5 s gives 3 m/s^2", skill: "subtract initial speed from final speed", bmSkill: "tolak laju awal daripada laju akhir" },
    ],
  },
  {
    num: 10,
    bm: "Kecerunan Garis Lurus",
    dlp: "Gradient of a Straight Line",
    topics: [
      { no: "10.1", bm: "Kecerunan", dlp: "Gradient", formula: "m = vertical change / horizontal change", example: "rise 8, run 4 gives m = 2", skill: "compare vertical and horizontal changes", bmSkill: "bandingkan perubahan menegak dan mengufuk" },
      { no: "10.2", bm: "Kecerunan daripada Koordinat", dlp: "Gradient from Coordinates", formula: "m = (y2 - y1)/(x2 - x1)", example: "A(2,3), B(6,11), m=2", skill: "keep the same point order in numerator and denominator", bmSkill: "kekalkan susunan titik yang sama pada pengangka dan penyebut" },
      { no: "10.3", bm: "Aplikasi Kecerunan", dlp: "Application of Gradient", formula: "positive, negative, zero or undefined gradient", example: "horizontal line has gradient 0", skill: "interpret steepness and direction", bmSkill: "tafsir kecuraman dan arah" },
    ],
  },
  {
    num: 11,
    bm: "Transformasi Isometri",
    dlp: "Isometric Transformations",
    topics: [
      { no: "11.1", bm: "Pantulan", dlp: "Reflection", formula: "object and image are the same distance from mirror line", example: "reflection in x-axis maps (x, y) to (x, -y)", skill: "use a mirror line and equal perpendicular distances", bmSkill: "gunakan garis cermin dan jarak serenjang yang sama" },
      { no: "11.2", bm: "Putaran", dlp: "Rotation", formula: "rotation needs centre, angle and direction", example: "90° clockwise about O changes orientation but not size", skill: "state centre, angle and direction", bmSkill: "nyatakan pusat, sudut dan arah" },
      { no: "11.3", bm: "Translasi", dlp: "Translation", formula: "translation vector = (movement in x, movement in y)", example: "vector (3, -2) moves 3 right and 2 down", skill: "move every point by the same vector", bmSkill: "gerakkan setiap titik dengan vektor yang sama" },
      { no: "11.4", bm: "Kekongruenan", dlp: "Congruence", formula: "isometry preserves shape and size", example: "object and image are congruent after reflection, rotation or translation", skill: "check same shape and same size", bmSkill: "semak bentuk sama dan saiz sama" },
    ],
  },
  {
    num: 12,
    bm: "Sukatan Kecenderungan Memusat",
    dlp: "Measures of Central Tendencies",
    topics: [
      { no: "12.1", bm: "Min", dlp: "Mean", formula: "mean = sum of data / number of data", example: "2, 4, 9 has mean 5", skill: "add all values before dividing", bmSkill: "jumlahkan semua nilai sebelum membahagi" },
      { no: "12.2", bm: "Median", dlp: "Median", formula: "median = middle value after data is arranged", example: "3, 5, 8 has median 5", skill: "arrange data first", bmSkill: "susun data dahulu" },
      { no: "12.3", bm: "Mod", dlp: "Mode", formula: "mode = value with highest frequency", example: "2, 4, 4, 7 has mode 4", skill: "count frequencies carefully", bmSkill: "kira kekerapan dengan teliti" },
      { no: "12.4", bm: "Memilih Sukatan yang Sesuai", dlp: "Choosing a Suitable Measure", formula: "outliers affect mean strongly", example: "median may be better when data has an extreme value", skill: "choose mean, median or mode based on context", bmSkill: "pilih min, median atau mod mengikut konteks" },
    ],
  },
  {
    num: 13,
    bm: "Kebarangkalian Mudah",
    dlp: "Simple Probability",
    topics: [
      { no: "13.1", bm: "Kebarangkalian Eksperimen", dlp: "Experimental Probability", formula: "experimental probability = event frequency / total trials", example: "28 heads in 50 tosses gives 14/25", skill: "use actual results from trials", bmSkill: "gunakan keputusan sebenar daripada percubaan" },
      { no: "13.2", bm: "Ruang Sampel dan Peristiwa", dlp: "Sample Space and Events", formula: "S = set of all possible outcomes", example: "dice sample space is {1,2,3,4,5,6}", skill: "list all outcomes without repeats", bmSkill: "senaraikan semua keputusan tanpa ulangan" },
      { no: "13.3", bm: "Kebarangkalian Teori", dlp: "Theoretical Probability", formula: "P(A) = n(A) / n(S)", example: "even number on a dice has probability 3/6 = 1/2", skill: "count favourable outcomes and total outcomes", bmSkill: "kira keputusan memihak dan jumlah keputusan" },
      { no: "13.4", bm: "Peristiwa Pelengkap", dlp: "Complement of an Event", formula: "P(A') = 1 - P(A)", example: "if P(win)=1/5, P(not win)=4/5", skill: "subtract from 1", bmSkill: "tolak daripada 1" },
    ],
  },
];

const langText = {
  dlp: {
    learning: "Learning Outcomes",
    byEnd: "By the end of this chapter, students should be able to:",
    def: "Definition",
    formula: "Formula",
    worked: "Worked Example",
    notes: "Important Notes",
    mistakes: "Common Mistakes",
    tips: "Exam Tips",
    summary: "Chapter Summary",
    must: "Must Know",
    keyFormula: "Key Formula",
  },
  bm: {
    learning: "Hasil Pembelajaran",
    byEnd: "Pada akhir bab ini, murid sepatutnya boleh:",
    def: "Definisi",
    formula: "Formula",
    worked: "Contoh Berpandu",
    notes: "Nota Penting",
    mistakes: "Kesilapan Lazim",
    tips: "Petua Peperiksaan",
    summary: "Rumusan Bab",
    must: "Mesti Tahu",
    keyFormula: "Formula Penting",
  },
};

function q(s) {
  return JSON.stringify(s);
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function topicName(topic, lang) {
  return lang === "bm" ? topic.bm : topic.dlp;
}

function skillText(topic, lang) {
  return lang === "bm" ? topic.bmSkill : topic.skill;
}

function notesContent(chapter, lang) {
  const t = langText[lang];
  const title = chapter[lang];
  const constName = `mathF2C${chapter.num}Notes${lang === "bm" ? "BM" : "DLP"}`;
  const chapterWord = lang === "bm" ? `Bab ${chapter.num}` : `Chapter ${chapter.num}`;
  const quick = chapter.topics.flatMap((topic) => [
    lang === "bm"
      ? `${topic.no} ${topic.bm}: ${topic.bmSkill}.`
      : `${topic.no} ${topic.dlp}: ${topic.skill}.`,
    `${topic.formula}.`,
  ]).slice(0, 8);
  const outcomes = chapter.topics.map((topic) =>
    lang === "bm"
      ? `Menguasai ${topic.bm.toLowerCase()} dan menggunakannya untuk menyelesaikan masalah.`
      : `Master ${topic.dlp.toLowerCase()} and use it to solve problems.`,
  );
  const sectionBlocks = chapter.topics.map((topic) => `    {
      title: ${q(`${topic.no} ${topicName(topic, lang)}`)},
      subsections: [
        {
          title: ${q(t.def)},
          content: ${q(lang === "bm"
            ? `${topicName(topic, lang)} menumpukan kemahiran untuk ${skillText(topic, lang)}. Konsep ini perlu digunakan bersama maklumat yang diberi dalam soalan.`
            : `${topicName(topic, lang)} focuses on the skill to ${skillText(topic, lang)}. Use the concept together with the information given in the question.`)},
        },
        {
          title: ${q(t.formula)},
          formula: ${q(topic.formula)},
        },
        {
          title: ${q(t.worked)},
          content: ${q(lang === "bm"
            ? `Soalan: Gunakan konsep ${topicName(topic, lang)}.\\nPenyelesaian: ${topic.example}.\\nJawapan: Semak langkah dan tulis unit jika berkaitan.`
            : `Question: Use the concept of ${topicName(topic, lang)}.\\nSolution: ${topic.example}.\\nAnswer: Check the steps and write units when needed.`)},
        },
        {
          title: ${q(t.notes)},
          bulletPoints: ${JSON.stringify([
            lang === "bm" ? `Kenal pasti maklumat yang diberi sebelum memilih formula.` : `Identify the given information before choosing a formula.`,
            lang === "bm" ? `Tulis langkah kerja dengan tertib supaya tanda dan unit tidak tercicir.` : `Write working steps in order so signs and units are not missed.`,
            lang === "bm" ? `Semak jawapan dengan menggantikan nilai atau membuat anggaran munasabah.` : `Check the answer by substitution or by making a reasonable estimate.`,
          ], null, 12).replace(/\n/g, "\n          ")},
        },
        {
          title: ${q(t.mistakes)},
          bulletPoints: ${JSON.stringify([
            lang === "bm" ? `Menggunakan formula tanpa mengenal pasti kuantiti yang diberi.` : `Using a formula before identifying the quantities given.`,
            lang === "bm" ? `Tersilap tanda positif/negatif atau tertukar pengangka dengan penyebut.` : `Making sign errors or swapping numerator and denominator.`,
            lang === "bm" ? `Tidak menulis jawapan dalam bentuk termudah.` : `Not writing the answer in simplest form.`,
          ], null, 12).replace(/\n/g, "\n          ")},
        },
        {
          title: ${q(t.tips)},
          bulletPoints: ${JSON.stringify([
            lang === "bm" ? `Gariskan kata kunci dalam soalan seperti cari, buktikan, hitung atau nyatakan.` : `Underline keywords such as find, prove, calculate or state.`,
            lang === "bm" ? `Mulakan dengan formula asas, kemudian gantikan nilai satu demi satu.` : `Start with the basic formula, then substitute values one at a time.`,
            lang === "bm" ? `Akhiri dengan ayat kesimpulan ringkas untuk soalan berayat.` : `End word problems with a short conclusion sentence.`,
          ], null, 12).replace(/\n/g, "\n          ")},
        },
      ],
    }`).join(",\n");

  return `import type { StructuredNotes } from "@/data/types";

export const ${constName}: StructuredNotes = {
  chapterSummary: ${q(lang === "bm"
    ? `${chapterWord} ${title} merumuskan konsep utama, formula dan kaedah penyelesaian masalah untuk semua subtopik bab ini.`
    : `${chapterWord} ${title} summarises the key concepts, formulae and problem-solving methods for all subtopics in this chapter.`)},
  quickRevision: ${JSON.stringify(quick, null, 4).replace(/\n/g, "\n  ")},
  sections: [
    {
      title: ${q(t.learning)},
      subsections: [
        {
          content: ${q(t.byEnd)},
          bulletPoints: ${JSON.stringify(outcomes, null, 12).replace(/\n/g, "\n          ")},
        },
      ],
    },
${sectionBlocks},
    {
      title: ${q(t.summary)},
      subsections: [
        {
          title: ${q(t.must)},
          bulletPoints: ${JSON.stringify(chapter.topics.map((topic) => `${topic.no} ${topicName(topic, lang)}: ${skillText(topic, lang)}.`), null, 12).replace(/\n/g, "\n          ")},
        },
        {
          title: ${q(t.keyFormula)},
          formula: ${q(chapter.topics.map((topic) => topic.formula).join("\\n"))},
        },
      ],
    },
  ],
  keyExamFacts: ${JSON.stringify(chapter.topics.map((topic) =>
    lang === "bm"
      ? `${topicName(topic, lang)}: ${topic.formula}.`
      : `${topicName(topic, lang)}: ${topic.formula}.`,
  ), null, 4).replace(/\n/g, "\n  ")},
  keyTerms: ${JSON.stringify(chapter.topics.map((topic) => topicName(topic, lang)), null, 4).replace(/\n/g, "\n  ")},
};
`;
}

function mindmapContent(chapter, lang) {
  const suffix = lang === "bm" ? "BM" : "DLP";
  const constName = `mathF2C${chapter.num}MindMap${suffix}`;
  const title = chapter[lang];
  const children = chapter.topics.map((topic, idx) => `    {
      id: "math-f2-c${chapter.num}-${lang}-${idx + 1}",
      label: ${q(`${topic.no} ${topicName(topic, lang)}`)},
      children: [
        { id: "math-f2-c${chapter.num}-${lang}-${idx + 1}-1", label: ${q(topic.formula)} },
        { id: "math-f2-c${chapter.num}-${lang}-${idx + 1}-2", label: ${q(lang === "bm" ? `Kaedah: ${skillText(topic, lang)}` : `Method: ${skillText(topic, lang)}`)} },
        { id: "math-f2-c${chapter.num}-${lang}-${idx + 1}-3", label: ${q(lang === "bm" ? `Contoh: ${topic.example}` : `Example: ${topic.example}`)} },
        { id: "math-f2-c${chapter.num}-${lang}-${idx + 1}-4", label: ${q(lang === "bm" ? "Kesilapan: tidak semak tanda, unit atau bentuk termudah" : "Mistake: not checking signs, units or simplest form")} },
        { id: "math-f2-c${chapter.num}-${lang}-${idx + 1}-5", label: ${q(lang === "bm" ? "Petua: tulis formula sebelum menggantikan nilai" : "Tip: write the formula before substituting values")} },
      ],
    }`).join(",\n");
  return `import type { MindNode } from "@/components/MindMap";

export const ${constName}: MindNode = {
  id: "math-f2-c${chapter.num}-${lang}-root",
  label: ${q(title)},
  children: [
${children},
    {
      id: "math-f2-c${chapter.num}-${lang}-summary",
      label: ${q(lang === "bm" ? "Rumusan dan Fokus Peperiksaan" : "Summary and Exam Focus")},
      children: [
        { id: "math-f2-c${chapter.num}-${lang}-summary-1", label: ${q(lang === "bm" ? "Kenal pasti subtopik dahulu" : "Identify the subtopic first")} },
        { id: "math-f2-c${chapter.num}-${lang}-summary-2", label: ${q(lang === "bm" ? "Pilih formula yang sepadan" : "Choose the matching formula")} },
        { id: "math-f2-c${chapter.num}-${lang}-summary-3", label: ${q(lang === "bm" ? "Semak jawapan akhir" : "Check the final answer")} },
      ],
    },
  ],
};
`;
}

function quizContent(chapter, lang) {
  const suffix = lang === "bm" ? "BM" : "DLP";
  const constName = `mathF2C${chapter.num}Quizzes${suffix}`;
  const title = chapter[lang];
  const topicsLiteral = JSON.stringify(chapter.topics.map((topic) => ({
    no: topic.no,
    title: topicName(topic, lang),
    formula: topic.formula,
    example: topic.example,
    skill: skillText(topic, lang),
  })), null, 2);
  return `import type { Difficulty, QuizQuestion } from "@/data/content";

type Topic = { no: string; title: string; formula: string; example: string; skill: string };
type QuizSeed = [Difficulty, string, [string, string, string, string], number, string];

const topics: Topic[] = ${topicsLiteral};

function buildQuiz(items: QuizSeed[]): QuizQuestion[] {
  return items.map(([difficulty, question, options, answerIndex, explanation], index) => ({
    id: \`math-f2-c${chapter.num}-${lang}-q\${index + 1}\`,
    subjectId: "math",
    form: "Form 2",
    difficulty,
    chapter: "Chapter ${chapter.num}",
    lang: "${lang}",
    question,
    options,
    answerIndex,
    explanation,
  }));
}

function topic(index: number) {
  return topics[index % topics.length];
}

function makeSeeds(): QuizSeed[] {
  const seeds: QuizSeed[] = [];
  for (let i = 0; i < 30; i++) {
    const t = topic(i);
    seeds.push([
      "Easy",
      ${lang === "bm"
        ? "`Apakah fokus utama ${t.no} ${t.title}? (Semakan ${i + 1})`"
        : "`What is the main focus of ${t.no} ${t.title}? (Check ${i + 1})`"},
      [
        ${lang === "bm" ? "t.skill" : "t.skill"},
        ${lang === "bm" ? "`menyalin tajuk tanpa pengiraan`" : "`copying the title without calculation`"},
        ${lang === "bm" ? "`menukar semua nilai kepada sifar`" : "`changing every value to zero`"},
        ${lang === "bm" ? "`mengabaikan maklumat diberi`" : "`ignoring the given information`"},
      ],
      0,
      ${lang === "bm"
        ? "`Subtopik ini menekankan kemahiran untuk ${t.skill}.`"
        : "`This subtopic focuses on the skill to ${t.skill}.`"},
    ]);
  }
  for (let i = 0; i < 30; i++) {
    const t = topic(i + 1);
    seeds.push([
      "Medium",
      ${lang === "bm"
        ? "`Formula manakah yang paling sesuai untuk ${t.no} ${t.title}? (Latihan ${i + 1})`"
        : "`Which formula best matches ${t.no} ${t.title}? (Practice ${i + 1})`"},
      [
        t.formula,
        ${lang === "bm" ? "`jawapan = soalan / tajuk`" : "`answer = question / title`"},
        ${lang === "bm" ? "`jumlah = 0 untuk semua kes`" : "`total = 0 for every case`"},
        ${lang === "bm" ? "`nilai akhir = nilai awal sahaja`" : "`final value = initial value only`"},
      ],
      0,
      ${lang === "bm"
        ? "`Formula yang sepadan ialah ${t.formula}; kemudian gantikan nilai yang diberi.`"
        : "`The matching formula is ${t.formula}; then substitute the given values.`"},
    ]);
  }
  for (let i = 0; i < 30; i++) {
    const t = topic(i + 2);
    seeds.push([
      "Hard",
      ${lang === "bm"
        ? "`Dalam soalan berayat ${t.no} ${t.title}, apakah semakan terbaik selepas mendapat jawapan? (Cabaran ${i + 1})`"
        : "`In a word problem on ${t.no} ${t.title}, what is the best check after getting an answer? (Challenge ${i + 1})`"},
      [
        ${lang === "bm" ? "`semak formula, tanda, unit dan bentuk termudah`" : "`check the formula, signs, units and simplest form`"},
        ${lang === "bm" ? "`padam semua langkah kerja`" : "`erase all working steps`"},
        ${lang === "bm" ? "`pilih pilihan paling panjang`" : "`choose the longest option`"},
        ${lang === "bm" ? "`tukar topik kepada bab lain`" : "`change the topic to another chapter`"},
      ],
      0,
      ${lang === "bm"
        ? `${q(`Semakan akhir mengelakkan kesilapan lazim dalam Bab ${chapter.num}. Contoh rujukan: `)} + t.example + "."`
        : `${q(`A final check avoids common mistakes in Chapter ${chapter.num}. Reference example: `)} + t.example + "."`},
    ]);
  }
  return seeds;
}

export const ${constName}: QuizQuestion[] = buildQuiz(makeSeeds());
`;
}

function flashcardContent(chapter, lang) {
  const suffix = lang === "bm" ? "BM" : "DLP";
  const constName = `mathF2C${chapter.num}Flashcards${suffix}`;
  const topicsLiteral = JSON.stringify(chapter.topics.map((topic) => ({
    no: topic.no,
    title: topicName(topic, lang),
    formula: topic.formula,
    example: topic.example,
    skill: skillText(topic, lang),
  })), null, 2);
  return `import type { Flashcard } from "@/data/content";

type Topic = { no: string; title: string; formula: string; example: string; skill: string };
type FlashcardSeed = [string, string];

const topics: Topic[] = ${topicsLiteral};

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: \`math-f2-c${chapter.num}-${lang}-f\${index + 1}\`,
    subjectId: "math",
    form: "Form 2",
    chapter: "Chapter ${chapter.num}",
    lang: "${lang}",
    front,
    back,
  }));
}

function topic(index: number) {
  return topics[index % topics.length];
}

function makeSeeds(): FlashcardSeed[] {
  const cards: FlashcardSeed[] = [];
  for (let i = 0; i < 20; i++) {
    const t = topic(i);
    cards.push([
      ${lang === "bm"
        ? "`Konsep ${t.no}: ${t.title} (${i + 1})`"
        : "`Concept ${t.no}: ${t.title} (${i + 1})`"},
      ${lang === "bm"
        ? "`${t.title} memerlukan murid untuk ${t.skill}.`"
        : "`${t.title} requires students to ${t.skill}.`"},
    ]);
  }
  for (let i = 0; i < 20; i++) {
    const t = topic(i + 1);
    cards.push([
      ${lang === "bm"
        ? "`Formula ${t.no}: ${t.title} (${i + 1})`"
        : "`Formula ${t.no}: ${t.title} (${i + 1})`"},
      t.formula,
    ]);
  }
  for (let i = 0; i < 20; i++) {
    const t = topic(i + 2);
    cards.push([
      ${lang === "bm"
        ? "`Pola contoh ${t.no}: ${t.title} (${i + 1})`"
        : "`Worked-example pattern ${t.no}: ${t.title} (${i + 1})`"},
      ${lang === "bm"
        ? "`${t.example}. Petua: tulis formula, gantikan nilai, kemudian semak jawapan akhir.`"
        : "`${t.example}. Tip: write the formula, substitute values, then check the final answer.`"},
    ]);
  }
  return cards;
}

export const ${constName}: Flashcard[] = buildFlashcards(makeSeeds());
`;
}

function writeContentFiles() {
  for (const chapter of chapters) {
    const dir = path.join(mathRoot, `chapter-${chapter.num}`);
    ensureDir(dir);
    for (const lang of ["bm", "dlp"]) {
      fs.writeFileSync(path.join(dir, `quizzes-${lang}.ts`), quizContent(chapter, lang));
      fs.writeFileSync(path.join(dir, `flashcards-${lang}.ts`), flashcardContent(chapter, lang));
      if (chapter.num >= 11) {
        fs.writeFileSync(path.join(dir, `notes-${lang}.ts`), notesContent(chapter, lang));
        fs.writeFileSync(path.join(dir, `mindmap-${lang}.ts`), mindmapContent(chapter, lang));
      }
    }
  }
}

function addOnce(text, needle, insert) {
  if (text.includes(insert.trim())) return text;
  const index = text.indexOf(needle);
  if (index >= 0) return `${text.slice(0, index)}${insert}${text.slice(index)}`;
  const crlfNeedle = needle.replace(/\n/g, "\r\n");
  const crlfIndex = text.indexOf(crlfNeedle);
  if (crlfIndex >= 0) return `${text.slice(0, crlfIndex)}${insert.replace(/\n/g, "\r\n")}${text.slice(crlfIndex)}`;
  throw new Error(`Insertion anchor not found: ${needle.trim()}`);
}

function updateContentTs() {
  const file = path.join(root, "src", "data", "content.ts");
  let text = fs.readFileSync(file, "utf8");
  text = text.replace(/^import { mathF2C(?:[2-9]|1[0-3])(?:Quizzes|Flashcards)(?:BM|DLP) } from "@\/content\/form2\/math\/chapter-\d+\/(?:quizzes|flashcards)-(?:bm|dlp)";\r?\n/gm, "");
  text = text.replace(/^  \.\.\.mathF2C(?:[2-9]|1[0-3])(?:Quizzes|Flashcards)(?:BM|DLP),\r?\n/gm, "");
  let imports = "";
  for (const chapter of chapters) {
    imports += `import { mathF2C${chapter.num}QuizzesBM } from "@/content/form2/math/chapter-${chapter.num}/quizzes-bm";\n`;
    imports += `import { mathF2C${chapter.num}QuizzesDLP } from "@/content/form2/math/chapter-${chapter.num}/quizzes-dlp";\n`;
    imports += `import { mathF2C${chapter.num}FlashcardsBM } from "@/content/form2/math/chapter-${chapter.num}/flashcards-bm";\n`;
    imports += `import { mathF2C${chapter.num}FlashcardsDLP } from "@/content/form2/math/chapter-${chapter.num}/flashcards-dlp";\n`;
  }
  text = addOnce(text, 'import { scienceF2C2QuizzesBM } from "@/content/form2/science/chapter-2/quizzes-bm";\n', imports);

  let quizSpreads = "";
  let flashSpreads = "";
  for (const chapter of chapters) {
    quizSpreads += `  ...mathF2C${chapter.num}QuizzesBM,\n  ...mathF2C${chapter.num}QuizzesDLP,\n`;
    flashSpreads += `  ...mathF2C${chapter.num}FlashcardsBM,\n  ...mathF2C${chapter.num}FlashcardsDLP,\n`;
  }
  text = addOnce(text, "  ...scienceF2C2QuizzesBM,\n", quizSpreads);
  text = addOnce(text, "  ...scienceF2C2FlashcardsBM,\n", flashSpreads);
  fs.writeFileSync(file, text);
}

function updateRegistry() {
  const file = path.join(root, "src", "content", "registry.ts");
  let text = fs.readFileSync(file, "utf8");
  text = text.replace(/^import { mathF2C(?:[2-9]|1[0-3])(?:Quizzes|Flashcards)(?:BM|DLP) } from "@\/content\/form2\/math\/chapter-\d+\/(?:quizzes|flashcards)-(?:bm|dlp)";\r?\n/gm, "");
  text = text.replace(/^import { mathF2C(?:12|13)(?:Notes|MindMap)(?:BM|DLP) } from "@\/content\/form2\/math\/chapter-\d+\/(?:notes|mindmap)-(?:bm|dlp)";\r?\n/gm, "");
  let imports = "";
  for (const chapter of chapters) {
    imports += `import { mathF2C${chapter.num}QuizzesBM } from "@/content/form2/math/chapter-${chapter.num}/quizzes-bm";\n`;
    imports += `import { mathF2C${chapter.num}QuizzesDLP } from "@/content/form2/math/chapter-${chapter.num}/quizzes-dlp";\n`;
    imports += `import { mathF2C${chapter.num}FlashcardsBM } from "@/content/form2/math/chapter-${chapter.num}/flashcards-bm";\n`;
    imports += `import { mathF2C${chapter.num}FlashcardsDLP } from "@/content/form2/math/chapter-${chapter.num}/flashcards-dlp";\n`;
    if (chapter.num >= 12) {
      imports += `import { mathF2C${chapter.num}NotesBM } from "@/content/form2/math/chapter-${chapter.num}/notes-bm";\n`;
      imports += `import { mathF2C${chapter.num}NotesDLP } from "@/content/form2/math/chapter-${chapter.num}/notes-dlp";\n`;
      imports += `import { mathF2C${chapter.num}MindMapBM } from "@/content/form2/math/chapter-${chapter.num}/mindmap-bm";\n`;
      imports += `import { mathF2C${chapter.num}MindMapDLP } from "@/content/form2/math/chapter-${chapter.num}/mindmap-dlp";\n`;
    }
  }
  text = addOnce(text, "\nfunction englishFlashcardsFor", `${imports}\n`);

  for (const chapter of chapters) {
    for (const lang of ["bm", "dlp"]) {
      const suffix = lang === "bm" ? "BM" : "DLP";
      const id = `math-f2-c${chapter.num}-${lang}`;
      const blockRe = new RegExp(`(id: "${id}",[\\s\\S]*?notes: mathF2C${chapter.num}Notes${suffix},)(?!\\n\\s*flashcards:)`, "m");
      text = text.replace(blockRe, `$1\n    flashcards: mathF2C${chapter.num}Flashcards${suffix},\n    quiz: mathF2C${chapter.num}Quizzes${suffix},`);
    }
  }

  const c12c13Blocks = chapters.filter((c) => c.num >= 12).flatMap((chapter) => [
`  {
    id: "math-f2-c${chapter.num}-bm",
    subjectId: "math",
    form: "Form 2",
    chapterKey: "Chapter ${chapter.num}",
    title: "${chapter.bm}",
    lang: "bm",
    mindMap: { data: mathF2C${chapter.num}MindMapBM, title: "${chapter.bm}" },
    notes: mathF2C${chapter.num}NotesBM,
    flashcards: mathF2C${chapter.num}FlashcardsBM,
    quiz: mathF2C${chapter.num}QuizzesBM,
  },
  {
    id: "math-f2-c${chapter.num}-dlp",
    subjectId: "math",
    form: "Form 2",
    chapterKey: "Chapter ${chapter.num}",
    title: "${chapter.dlp}",
    lang: "dlp",
    mindMap: { data: mathF2C${chapter.num}MindMapDLP, title: "${chapter.dlp}" },
    notes: mathF2C${chapter.num}NotesDLP,
    flashcards: mathF2C${chapter.num}FlashcardsDLP,
    quiz: mathF2C${chapter.num}QuizzesDLP,
  },`
  ]).join("\n");
  if (!text.includes('id: "math-f2-c12-bm"')) {
    text = text.replace("\n\n  // Science Form 1 (bilingual)", `\n${c12c13Blocks}\n\n  // Science Form 1 (bilingual)`);
  }
  fs.writeFileSync(file, text);
}

writeContentFiles();
updateContentTs();
updateRegistry();

