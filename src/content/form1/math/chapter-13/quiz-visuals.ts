import type { MathQuestionVisual, LocalizedText, VisualText } from "@/features/quiz/visuals/mathQuestionVisual";

type Diagram = Extract<MathQuestionVisual, { kind: "geometry-diagram" }>;
type Panel = Diagram["panels"][number];
const tr = (bm: string, dlp: string): LocalizedText => ({ bm, dlp });
const draw = (title: LocalizedText, description: LocalizedText, panel: Omit<Panel, "title" | "description">): Diagram => ({
  kind: "geometry-diagram",
  title,
  panels: [{ ...panel, title, description }],
});

/**
 * Chapter 13 (Pythagoras). Diagrams are deliberately NOT TO SCALE.
 * Right-angle marks are used only when the stem explicitly guarantees 90°.
 * Triangle classifications show proportional independent side-length segments,
 * with no misleading drawn angle or calculated answer.
 */
const rt = (
  vertical: VisualText, horizontal: VisualText, hypotenuse: VisualText,
  bm = "Segi tiga bersudut tegak", dlp = "Right-angled triangle",
  vertices?: [string, string, string],
): Diagram => draw(tr(bm, dlp), tr(
  "Dua sisi berserenjang dan sisi condong. Hanya maklumat soalan dilabel.",
  "Two perpendicular legs and a sloping side. Labels show question givens only.",
), {
  paths: [
    { points: [[65, 40], [65, 192], [267, 192], [65, 40]], closed: true },
    { points: [[65, 175], [83, 175], [83, 192]] },
  ],
  labels: [
    { at: [33, 116], text: vertical },
    { at: [169, 215], text: horizontal },
    { at: [188, 100], text: hypotenuse },
    ...(vertices ? [
      { at: [53, 28] as [number,number], text: vertices[1] },
      { at: [53, 209] as [number,number], text: vertices[0] },
      { at: [280, 211] as [number,number], text: vertices[2] },
    ] : []),
  ],
});
/** Separate side-length segments never imply any angle classification. */
const sideLength = (side: string) => {
  const radical = side.match(/^√(\d+(?:\.\d+)?)/u);
  const value = radical ? Math.sqrt(Number(radical[1])) : Number.parseFloat(side);
  return Number.isFinite(value) && value > 0 ? value : null;
};
const tri = (a: string, b: string, c: string, vertices?: [string, string, string]): Diagram => {
  const labels = [a, b, c], lengths = labels.map(sideLength);
  const max = Math.max(0, ...lengths.filter((n): n is number => n !== null));
  const ys = [68, 128, 188];
  const ends = lengths.map((n) => n === null || max === 0 ? 238 : 60 + Math.round(178 * n / max));
  return draw(
    tr("Panjang tiga sisi", "Lengths of the three sides"),
    tr("Ruas berasingan menggambarkan panjang sisi, tanpa menyatakan jenis sudut. Tentukan jenis dengan mengira.",
       "Independent side segments, not a connected triangle or an angle. Classify by calculation."),
    {
      paths: ys.map((y, i) => ({ points: [[60, y], [ends[i], y]] })),
      labels: [
        ...labels.map((value, i) => ({ at: [60 + (ends[i] - 60) / 2, ys[i] - 17] as [number,number], text: value })),
        ...(vertices ? [
          { at: [45, 73] as [number,number], text: vertices[0] },
          { at: [ends[0] + 11, 73] as [number,number], text: vertices[1] },
          { at: [45, 133] as [number,number], text: vertices[1] },
          { at: [ends[1] + 11, 133] as [number,number], text: vertices[2] },
          { at: [45, 193] as [number,number], text: vertices[0] },
          { at: [ends[2] + 11, 193] as [number,number], text: vertices[2] },
        ] : []),
      ],
    },
  );
};
const rect = (
  width: string, height: string, diagonal: string,
  bm = "Segi empat tepat dan pepenjuru", dlp = "Rectangle and its diagonal",
  named = false, firstVertex = "A",
): Diagram => draw(tr(bm, dlp), tr(
  "Pepenjuru membahagi segi empat tepat kepada dua segi tiga. Panjang yang belum diketahui ditanda ?.",
  "The diagonal divides the rectangle into two triangles. Unknown lengths are marked ?.",
), {
  paths: [
    { points: [[44, 56], [260, 56], [260, 182], [44, 182]], closed: true },
    { points: [[44, 56], [260, 182]], dashed: true },
  ],
  labels: [
    { at: [150, 46], text: width },
    { at: [280, 125], text: height },
    { at: [169, 107], text: diagonal },
    ...(named ? [
      { at: [31, 49] as [number,number], text: firstVertex },
      { at: [271, 48] as [number,number], text: firstVertex === "A" ? "B" : "Q" },
      { at: [272, 201] as [number,number], text: firstVertex === "A" ? "C" : "R" },
      { at: [31, 201] as [number,number], text: firstVertex === "A" ? "D" : "S" },
    ] : []),
  ],
});
/** The stem already gives acute or obtuse: this adds context without calculating the inequality. */
const angleType = (type: "acute" | "obtuse"): Diagram => {
  const acute = type === "acute";
  return draw(
    acute ? tr("Segi tiga tirus", "Acute triangle") : tr("Segi tiga cakah", "Obtuse triangle"),
    tr("Bandingkan kuasa dua sisi terpanjang c dengan dua sisi lain.",
       "Compare the square of longest side c with the other two sides."),
    {
      paths: [{ points: acute ? [[150, 35], [58, 192], [244, 192], [150, 35]]
        : [[81, 142], [55, 192], [248, 192], [81, 142]], closed: true }],
      labels: acute
        ? [{ at: [82, 106], text: "a" }, { at: [222, 108], text: "b" }, { at: [152, 214], text: "c" }]
        : [{ at: [47, 153], text: "a" }, { at: [195, 154], text: "b" }, { at: [151, 214], text: "c" }],
    },
  );
};
const givenAngles = (): Diagram => draw(
  tr("Sudut segi tiga yang diberi", "Given triangle angles"),
  tr("Sudut 30°, 60° dan 90° seperti dalam soalan.", "The 30°, 60° and 90° angles from the question."),
  {
    paths: [
      { points: [[98, 28], [98, 200], [198, 200], [98, 28]], closed: true },
      { points: [[98, 184], [114, 184], [114, 200]] },
    ],
    labels: [
      { at: [114, 65], text: "30°" }, { at: [118, 177], text: "90°" },
      { at: [171, 186], text: "60°" },
    ],
  },
);
const nestedRightTriangles = (): Diagram => draw(
  tr("Dua segi tiga berkongsi sisi AC", "Two triangles sharing AC"),
  tr("AB = 6 cm, BC = 8 cm dan CD = 24 cm; sudut tegak di B dan C. Cari AD.",
     "AB = 6 cm, BC = 8 cm and CD = 24 cm; right angles at B and C. Find AD."),
  {
    paths: [
      { points: [[65, 145], [65, 175], [105, 175], [65, 145]], closed: true },
      { points: [[65, 145], [105, 175], [177, 79], [65, 145]], closed: true },
      { points: [[65, 166], [74, 166], [74, 175]] },
      { points: [[97, 169], [103, 161], [111, 167]] },
    ],
    labels: [
      { at: [52, 134], text: "A" }, { at: [54, 191], text: "B" },
      { at: [111, 195], text: "C" }, { at: [187, 78], text: "D" },
      { at: [38, 164], text: "6 cm" }, { at: [84, 218], text: "8 cm" },
      { at: [183, 143], text: "24 cm" },
      { at: [94, 156], text: "AC = ?" }, { at: [126, 96], text: "AD = ?" },
    ],
  },
);
const iso = (): Diagram => draw(
  tr("Segi tiga sama kaki dan tinggi", "Isosceles triangle and its altitude"),
  tr("Dua sisi condong masing-masing 13 cm; seluruh tapak 24 cm. Tinggi belum diketahui.",
     "Both sloping sides are 13 cm; the whole base is 24 cm. Height is unknown."),
  {
    paths: [
      { points: [[150, 32], [48, 192], [252, 192], [150, 32]], closed: true },
      { points: [[150, 32], [150, 192]], dashed: true },
      { points: [[150, 178], [164, 178], [164, 192]] },
    ],
    labels: [
      { at: [72, 104], text: "13 cm" }, { at: [228, 104], text: "13 cm" },
      { at: [150, 213], text: "24 cm" }, { at: [168, 110], text: "? cm" },
    ],
  },
);
const tent = (): Diagram => draw(
  tr("Keratan rentas khemah", "Tent cross-section"),
  tr("Lebar seluruh khemah 6 m; tali dari puncak ke tepi 5 m; cari tinggi.",
     "Whole tent is 6 m wide; rope from ridge to edge is 5 m; find the height."),
  {
    paths: [
      { points: [[150, 34], [48, 192], [252, 192], [150, 34]], closed: true },
      { points: [[150, 34], [150, 192]], dashed: true },
      { points: [[150, 179], [163, 179], [163, 192]] },
    ],
    labels: [
      { at: [69, 105], text: "5 m" }, { at: [150, 215], text: "6 m" },
      { at: [175, 113], text: "? m" },
    ],
  },
);
const tree = (): Diagram => draw(
  tr("Pokok patah", "Broken tree"),
  tr("Ketinggian asal pokok 16 m; tunggul setinggi 6 m. Jarak di tanah belum diketahui.",
     "Original tree height is 16 m; the remaining stump is 6 m. Ground distance is unknown."),
  {
    paths: [
      { points: [[72, 193], [72, 94], [242, 193]] },
      { points: [[72, 94], [72, 22]], dashed: true },
      { points: [[72, 177], [88, 177], [88, 193]] },
    ],
    labels: [
      { at: [45, 151], text: "6 m" },
      { at: [152, 216], text: "? m" },
      { at: [167, 93], text: tr("Bahagian patah", "Broken section") },
      { at: [85, 24], text: tr("Asal: 16 m", "Original: 16 m"), anchor: "start" },
    ],
  },
);
const wires = (): Diagram => draw(
  tr("Dua wayar pada tiang", "Two pole support wires"),
  tr("Tiang 20 m; tambatan A dan B masing-masing 16 m dan 21 m dari kaki tiang. Panjang wayar tidak ditunjukkan.",
     "Pole 20 m; anchors A and B are 16 m and 21 m from its base. Wire lengths are unknown."),
  {
    paths: [
      { points: [[155, 35], [155, 192]] },
      { points: [[45, 192], [155, 35], [272, 192]] },
      { points: [[45, 192], [272, 192]] },
      { points: [[155, 177], [171, 177], [171, 192]] },
    ],
    labels: [
      { at: [180, 111], text: "20 m" },
      { at: [94, 214], text: "16 m" }, { at: [228, 214], text: "21 m" },
      { at: [73, 100], text: "A = ?" }, { at: [246, 100], text: "B = ?" },
    ],
  },
);

export const MATH_F1_C13_QUIZ_VISUALS = {
  foundation: {
    1: rt("a","b","c"),
    2: rt("a","b","c"),
    3: rt("?","?","?"),
    5: rt("AB","BC","AC","Segi tiga ABC, sudut tegak di B", "Triangle ABC, right angle at B", ["B","A","C"]),
    6: tri("3","4","5"),
    8: rt("a","b","c"),
    9: rt("a","b","c"),
    10: tri("a","b","c"),
    13: angleType("acute"),
    14: angleType("obtuse"),
    15: rt("a","b","c"),
    16: tri("6","8","10"),
    17: tri("5","12","13"),
    18: rt(tr("kaki","leg"),tr("kaki","leg"),"?"),
    19: rt("a","b","c"),
    20: rt("a","b","c"),
    21: rt("a","b","c"),
    22: tri("3","4","5"),
    24: rect("?","?","?"),
    25: tri("a","b","c"),
    26: rt("a","b","c"),
    27: givenAngles(),
    29: tri("8","15","17"),
  },
  practice: {
    1: rt("9 cm","12 cm","? cm"),
    2: rt("12 cm","? cm","20 cm"),
    3: rt("7 cm","24 cm","? cm"),
    4: rect("8 cm","15 cm","? cm"),
    5: rt("? m","5 m","13 m","Tangga pada dinding","Ladder against a wall"),
    6: rt("? cm","7 cm","25 cm"),
    7: rt("1.5 cm","2 cm","? cm"),
    8: rt("12 m","9 m","? m","Tiang dan wayar sokongan","Pole and support wire"),
    9: rt("6 cm","8 cm","? cm"),
    10: rt("10 cm","? cm","26 cm"),
    11: rt("20 cm","? cm","25 cm"),
    12: rect("10 cm","24 cm","? cm"),
    13: tent(),
    14: rt("? cm","40 cm","41 cm"),
    15: tri("1.5 m","2 m","2.5 m"),
    16: rt("11 cm","60 cm","? cm"),
    17: rect("? cm","8 cm","10 cm"),
    18: rt("30 cm","40 cm","? cm"),
    19: rt("24 m","7 m","? m","Menara dan jarak pepenjuru","Tower and diagonal distance"),
    20: rt("15 cm","36 cm","? cm"),
    21: rt("20 cm","? cm","29 cm"),
    22: rt("8 m","? m","10 m","Tangga pada dinding","Ladder against a wall"),
    23: rect("30 m","40 m","? m","Padang segi empat tepat","Rectangular field"),
    24: tri("12 cm","16 cm","20 cm"),
    25: rect("1 unit","1 unit","?","Muka kubus unit","A face of a unit cube"),
    26: rt("14 cm","? cm","50 cm"),
    27: rt("16 cm","30 cm","? cm"),
    28: rt("8 m","6 m","? m","Pergerakan semut: utara kemudian timur","Ant's movement: north and east"),
    29: rt("45 cm","28 cm","? cm"),
    30: rt("? m","10 m","26 m","Tiang dengan wayar","Pole with support wire"),
  },
  challenge: {
    7: nestedRightTriangles(),
    1: tri("5 cm","7 cm","9 cm"),
    2: tri("6 cm","7 cm","8 cm"),
    3: tri("9 cm","40 cm","41 cm",["P","Q","R"]),
    4: iso(),
    5: rect("6 cm","8 cm","? cm","Segi empat tepat ABCD","Rectangle ABCD",true),
    6: rt("9 cm","12 cm","x cm"),
    8: tri("2.5 cm","6 cm","6.5 cm"),
    9: tri("5 cm","12 cm","13 cm",["A","B","C"]),
    10: rect("40 m","30 m","? m","Laluan pepenjuru merentasi tanah","Diagonal route across a plot"),
    11: tri("3k","4k","5k"),
    12: tri("10 cm","11 cm","14 cm"),
    13: tri("5 cm","8 cm","10 cm"),
    14: rt("8 km","15 km","? km","Jalan bertemu pada simpang S","Roads meeting at junction S"),
    15: tri("15 cm","20 cm","25 cm",["A","B","C"]),
    16: rect("24 cm","? cm","25 cm"),
    17: tri("6 cm","8 cm","11 cm"),
    18: rt("5 cm","k cm","13 cm"),
    19: tree(),
    20: rt(tr("3 bahagian","3 parts"),tr("4 bahagian","4 parts"),"20 cm","Nisbah sisi 3 : 4","Leg ratio 3 : 4"),
    21: tri("1 cm","1 cm","√2 cm"),
    22: rt("20 km","15 km","? km","Perjalanan kapal: utara dan timur","Ship route: north and east"),
    23: tri("8 cm","15 cm","18 cm"),
    24: wires(),
    25: tri("1 cm","√3 cm","2 cm"),
    26: rect("10 cm","24 cm","? cm","Segi empat tepat PQRS","Rectangle PQRS",true,"P"),
    27: tri("20","21","29"),
    28: rt("2.4 km","1.8 km","? km","Dua jalan berserenjang","Two perpendicular roads"),
    29: rect("80 cm","? cm","100 cm","Skrin segi empat tepat","Rectangular screen"),
    30: tri("7 cm","8 cm","9 cm"),
  },
} satisfies {
  foundation: Partial<Record<number, MathQuestionVisual>>;
  practice: Partial<Record<number, MathQuestionVisual>>;
  challenge: Partial<Record<number, MathQuestionVisual>>;
};
