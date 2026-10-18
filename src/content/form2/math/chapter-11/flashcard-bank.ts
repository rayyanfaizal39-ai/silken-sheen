import type { FlashcardReviewMode } from "@/features/flashcards/structuredFlashcard";
import type { MathGeometryVisual } from "@/features/quiz/visuals/mathGeometryVisual";
import type { LocalizedText } from "@/features/quiz/visuals/mathQuestionVisual";
import { Diagram } from "./diagram";
import {
  coord,
  num,
  reflectInX,
  reflectInY,
  reflectInYEqualsX,
  rotate,
  translate,
  vec,
  vectorBetween,
  type Pt,
} from "./transformations";

type Side = { prompt: string; parts?: string[]; answer: string[][] };
export interface MathF2C11Entry {
  subtopic: "11.1" | "11.2" | "11.3" | "11.4";
  mode: FlashcardReviewMode;
  visuals?: MathGeometryVisual[];
  dlp: Side;
  bm: Side;
  /** Answer values that must never appear as a label on the question diagram. */
  answerNeutral?: string[];
}

const T = (dlp: string, bm: string): LocalizedText => ({ dlp, bm });
const REFLECTION = T("Reflection", "Pantulan");
const ROTATION = T("Rotation", "Putaran");
const TRANSLATION = T("Translation", "Translasi");
const CONGRUENCE = T("Congruence", "Kekongruenan");
const map = (f: (p: Pt) => Pt, pts: Pt[]) => pts.map(f);
const list = (names: string[], pts: Pt[]) => names.map((n, i) => `${n}${coord(pts[i])}`).join(", ");
const centroid = (pts: Pt[]): Pt => [pts.reduce((s, p) => s + p[0], 0) / pts.length, pts.reduce((s, p) => s + p[1], 0) / pts.length];
const shift = (pts: Pt[], [h, k]: Pt): Pt[] => pts.map(([x, y]) => [x + h, y + k]);

function card(
  subtopic: MathF2C11Entry["subtopic"],
  mode: FlashcardReviewMode,
  visual: MathGeometryVisual | null,
  dlp: Side,
  bm: Side,
  answerNeutral: string[] = [],
): MathF2C11Entry {
  return {
    subtopic,
    mode,
    ...(visual ? { visuals: [visual] } : {}),
    dlp,
    bm,
    ...(answerNeutral.length ? { answerNeutral } : {}),
  };
}

// ═══ 11.1 Reflection ═══════════════════════════════════════════════════════

const c0 = card("11.1", "concept",
  new Diagram()
    .line([0, -0.6], [0, 2.4], "m", "end")
    .seg([-2, 1], [2, 1], "other", true)
    .point([-2, 1], "P", "object", [-1, 1])
    .point([2, 1], "P′", "image", [1, 1])
    .build(REFLECTION, T("Point P and its image P′ on opposite sides of mirror line m, joined by a dashed line.", "Titik P dan imejnya P′ pada sisi bertentangan paksi pantulan m, disambung oleh garis putus-putus.")),
  {
    prompt: "P′ is the image of P under a reflection in the mirror line m. Compare the distances of P and P′ from m, and describe the line PP′.",
    answer: [["P and P′ are the same distance from m.", "PP′ is perpendicular to m, so m is the perpendicular bisector of PP′."]],
  },
  {
    prompt: "P′ ialah imej P di bawah pantulan pada paksi pantulan m. Bandingkan jarak P dan P′ dari m, dan huraikan garis PP′.",
    answer: [["P dan P′ berjarak sama dari m.", "PP′ berserenjang dengan m, maka m ialah pembahagi dua sama serenjang bagi PP′."]],
  },
);

const c1P: Pt = [2, 3];
const c1 = card("11.1", "concept",
  new Diagram()
    .grid(-1, 4, -4, 4)
    .point(c1P, "P", "object", [1, 1])
    .build(REFLECTION, T("Point P(2, 3) on a Cartesian plane; the x-axis is the mirror line.", "Titik P(2, 3) pada satah Cartes; paksi-x ialah paksi pantulan.")),
  {
    prompt: `Point P${coord(c1P)} is reflected in the x-axis. Which coordinate changes, and how? Write the coordinates of P′.`,
    answer: [["The y-coordinate changes sign; the x-coordinate stays the same.", `P′ = ${coord(reflectInY(0)(c1P))}.`]],
  },
  {
    prompt: `Titik P${coord(c1P)} dipantulkan pada paksi-x. Koordinat manakah yang berubah, dan bagaimana? Tulis koordinat P′.`,
    answer: [["Koordinat-y bertukar tanda; koordinat-x tidak berubah.", `P′ = ${coord(reflectInY(0)(c1P))}.`]],
  },
  [coord(reflectInY(0)(c1P))],
);

const L_SHAPE: Pt[] = [[-4, 0], [-1, 0], [-1, 1], [-3, 1], [-3, 3], [-4, 3]];
const c2 = card("11.1", "concept",
  new Diagram()
    .grid(-5, 5, -1, 4, false)
    .line([0, -1], [0, 4], "m")
    .poly(L_SHAPE, "object")
    .poly(map(reflectInX(0), L_SHAPE), "image")
    .build(REFLECTION, T("An L-shaped object on the left of mirror line m and its image on the right.", "Objek berbentuk L di sebelah kiri paksi pantulan m dan imejnya di sebelah kanan.")),
  {
    prompt: "The diagram shows an L-shaped object (gold) and its image (blue) under a reflection in line m. State two properties that stay the same and one that changes.",
    answer: [["Same: all side lengths and all angles (the shape and size).", "Changes: the orientation — the image is laterally inverted, facing the other way."]],
  },
  {
    prompt: "Rajah menunjukkan objek berbentuk L (emas) dan imejnya (biru) di bawah pantulan pada garis m. Nyatakan dua sifat yang kekal dan satu sifat yang berubah.",
    answer: [["Kekal: semua panjang sisi dan semua sudut (bentuk dan saiz).", "Berubah: orientasi — imej tersongsang sisi dan menghadap arah bertentangan."]],
  },
);

const p3 = { obj: [[1, 1], [3, 1], [1, 3]] as Pt[], mirror: 4 };
const p3Img = map(reflectInX(p3.mirror), p3.obj);
const p3card = card("11.1", "practice",
  new Diagram()
    .grid(0, 8, 0, 4)
    .poly(p3.obj, "object", ["A", "B", "C"])
    .poly(p3Img, "image", ["A′", "B′", "C′"])
    .build(REFLECTION, T("Triangle ABC and its image A′B′C′ on a grid; the mirror line is not drawn.", "Segi tiga ABC dan imejnya A′B′C′ pada grid; paksi pantulan tidak dilukis.")),
  {
    prompt: "Triangle A′B′C′ is the image of triangle ABC under a reflection. State the equation of the mirror line.",
    answer: [[`Corresponding points are the same distance from the mirror line: the midpoint of A${coord(p3.obj[0])} and A′${coord(p3Img[0])} is (${p3.mirror}, 1).`, `Mirror line: x = ${p3.mirror}.`]],
  },
  {
    prompt: "Segi tiga A′B′C′ ialah imej segi tiga ABC di bawah suatu pantulan. Nyatakan persamaan paksi pantulan.",
    answer: [[`Titik sepadan berjarak sama dari paksi pantulan: titik tengah A${coord(p3.obj[0])} dan A′${coord(p3Img[0])} ialah (${p3.mirror}, 1).`, `Paksi pantulan: x = ${p3.mirror}.`]],
  },
  [`x = ${p3.mirror}`],
);

const p4 = [[1, 1], [4, 1], [4, 3], [2, 3]] as Pt[];
const p4Img = map(reflectInX(0), p4);
const p4card = card("11.1", "practice",
  new Diagram()
    .grid(-5, 5, -1, 4)
    .poly(p4, "object", ["P", "Q", "R", "S"])
    .build(REFLECTION, T("Quadrilateral PQRS in the first quadrant; the y-axis is the mirror line.", "Sisi empat PQRS dalam sukuan pertama; paksi-y ialah paksi pantulan.")),
  {
    prompt: `Quadrilateral PQRS has ${list(["P", "Q", "R", "S"], p4).replace(/, (?=S)/, " and ")}. It is reflected in the y-axis. Find the coordinates of P′, Q′, R′ and S′.`,
    answer: [["Reflection in the y-axis: (x, y) → (−x, y).", `${list(["P′", "Q′", "R′", "S′"], p4Img)}.`]],
  },
  {
    prompt: `Sisi empat PQRS mempunyai ${list(["P", "Q", "R", "S"], p4).replace(/, (?=S)/, " dan ")}. Sisi empat itu dipantulkan pada paksi-y. Cari koordinat P′, Q′, R′ dan S′.`,
    answer: [["Pantulan pada paksi-y: (x, y) → (−x, y).", `${list(["P′", "Q′", "R′", "S′"], p4Img)}.`]],
  },
  p4Img.map(coord),
);

const p5T: Pt = [-2, 4];
const p5Img = reflectInY(1)(p5T);
const p5card = card("11.1", "practice",
  new Diagram()
    .grid(-4, 2, -3, 5)
    .line([-4, 1], [2, 1], "y = 1", "start")
    .point(p5T, "T", "object", [1, 1])
    .build(REFLECTION, T("Point T(−2, 4) and the horizontal mirror line y = 1.", "Titik T(−2, 4) dan paksi pantulan mengufuk y = 1.")),
  {
    prompt: `Point T${coord(p5T)} is reflected in the line y = 1. Find the coordinates of its image T′.`,
    answer: [["T is 3 units above y = 1, so T′ is 3 units below it.", `T′ = ${coord(p5Img)}.`]],
  },
  {
    prompt: `Titik T${coord(p5T)} dipantulkan pada garis y = 1. Cari koordinat imejnya, T′.`,
    answer: [["T berada 3 unit di atas y = 1, maka T′ berada 3 unit di bawahnya.", `T′ = ${coord(p5Img)}.`]],
  },
  [coord(p5Img)],
);

const p6 = [[-4, 1], [-1, 1], [-1, 3], [-3, 4]] as Pt[];
const p6Img = map(reflectInX(1), p6);
const p6card = card("11.1", "practice",
  new Diagram()
    .grid(-5, 7, 0, 5)
    .line([1, 0], [1, 5], "x = 1")
    .poly(p6, "object", ["A", "B", "C", "D"])
    .polyline([p6Img[2], p6Img[1], p6Img[0]], "image", ["C′", "B′", "A′"])
    .build(REFLECTION, T("Quadrilateral ABCD, the mirror line x = 1, and three vertices A′, B′, C′ of the image; D′ is missing.", "Sisi empat ABCD, paksi pantulan x = 1, dan tiga bucu imej A′, B′, C′; D′ tiada.")),
  {
    prompt: "Quadrilateral ABCD is reflected in the line x = 1. Part of the image is drawn. Find the coordinates of D′ and complete the image A′B′C′D′.",
    answer: [[`D${coord(p6[3])} is 4 units left of x = 1, so D′ is 4 units right of it.`, `D′ = ${coord(p6Img[3])}.`]],
  },
  {
    prompt: "Sisi empat ABCD dipantulkan pada garis x = 1. Sebahagian imej telah dilukis. Cari koordinat D′ dan lengkapkan imej A′B′C′D′.",
    answer: [[`D${coord(p6[3])} berada 4 unit di kiri x = 1, maka D′ berada 4 unit di kanannya.`, `D′ = ${coord(p6Img[3])}.`]],
  },
  [coord(p6Img[3]), "D′"],
);

const p7K = [[-4, 1], [-1, 1], [-4, 4]] as Pt[];
const p7R = shift(p7K, [5, 0]);
const p7card = card("11.1", "practice",
  new Diagram()
    .grid(-5, 5, 0, 5, false)
    .line([0, 0], [0, 5], "m")
    .poly(p7K, "object")
    .right(p7K[0], p7K[1], p7K[2])
    .poly(p7R, "image")
    .right(p7R[0], p7R[1], p7R[2], "image")
    .text(centroid(p7K), "K", -2, 5)
    .text(centroid(p7R), "R", -2, 5, undefined, "image")
    .build(REFLECTION, T("Right-angled triangle K left of mirror line m and triangle R right of m, both with the right angle at the bottom left.", "Segi tiga bersudut tegak K di kiri paksi pantulan m dan segi tiga R di kanan m, kedua-duanya dengan sudut tegak di bawah kiri.")),
  {
    prompt: "Aina says triangle R is the image of triangle K under a reflection in line m. Is she correct? Explain.",
    answer: [["No.", "The right-angle corner of K is 4 units from m, but the right-angle corner of R is only 1 unit from m.", "R has been slid across m, not flipped: a reflection would put the right angle 4 units to the right of m."]],
  },
  {
    prompt: "Aina berkata segi tiga R ialah imej segi tiga K di bawah pantulan pada garis m. Adakah dia betul? Terangkan.",
    answer: [["Tidak.", "Bucu sudut tegak K berjarak 4 unit dari m, tetapi bucu sudut tegak R hanya 1 unit dari m.", "R digelongsorkan merentasi m, bukan diterbalikkan: pantulan akan meletakkan sudut tegak 4 unit di sebelah kanan m."]],
  },
);

const p8K: Pt = [4, 1];
const p8card = card("11.1", "practice",
  new Diagram()
    .grid(-1, 5, -1, 5)
    .line([-1, -1], [5, 5], "y = x")
    .point(p8K, "K", "object", [1, -1])
    .build(REFLECTION, T("Point K(4, 1) and the diagonal mirror line y = x.", "Titik K(4, 1) dan paksi pantulan pepenjuru y = x.")),
  {
    prompt: `Point K${coord(p8K)} is reflected in the line y = x. Find the coordinates of K′.`,
    answer: [["Reflection in y = x swaps the coordinates: (x, y) → (y, x).", `K′ = ${coord(reflectInYEqualsX(p8K))}.`]],
  },
  {
    prompt: `Titik K${coord(p8K)} dipantulkan pada garis y = x. Cari koordinat K′.`,
    answer: [["Pantulan pada y = x menukar tempat koordinat: (x, y) → (y, x).", `K′ = ${coord(reflectInYEqualsX(p8K))}.`]],
  },
  [coord(reflectInYEqualsX(p8K))],
);

const p9Img: Pt = [5, -1];
const p9Obj = reflectInX(2)(p9Img);
const p9card = card("11.1", "practice",
  new Diagram()
    .grid(-2, 6, -3, 2)
    .line([2, -3], [2, 2], "x = 2")
    .point(p9Img, "M′", "image", [1, -1])
    .build(REFLECTION, T("Image point M′(5, −1) and the mirror line x = 2; the object M is not shown.", "Titik imej M′(5, −1) dan paksi pantulan x = 2; objek M tidak ditunjukkan.")),
  {
    prompt: `Under a reflection in the line x = 2, the image of point M is M′${coord(p9Img)}. Find the coordinates of M.`,
    answer: [["M′ is 3 units right of x = 2, so M is 3 units left of it.", `M = ${coord(p9Obj)}.`]],
  },
  {
    prompt: `Di bawah pantulan pada garis x = 2, imej titik M ialah M′${coord(p9Img)}. Cari koordinat M.`,
    answer: [["M′ berada 3 unit di kanan x = 2, maka M berada 3 unit di kirinya.", `M = ${coord(p9Obj)}.`]],
  },
  [coord(p9Obj)],
);

const p10 = [[1, 1], [5, 1], [4, 3], [2, 3]] as Pt[];
const p10card = card("11.1", "practice",
  new Diagram()
    .grid(0, 6, -3, 4, false)
    .line([0, 0], [6, 0], "m", "end")
    .poly(p10, "object", ["", "", "", "P"])
    .build(REFLECTION, T("A trapezium above a horizontal mirror line m on a square grid; vertex P is marked.", "Trapezium di atas paksi pantulan mengufuk m pada grid segi empat sama; bucu P ditanda.")),
  {
    prompt: "In the diagram, vertex P of the trapezium is 3 units above the mirror line m. How far is its image P′ from m, and what is the length of PP′?",
    answer: [["P′ is 3 units below m.", "PP′ = 3 + 3 = 6 units, and PP′ is perpendicular to m."]],
  },
  {
    prompt: "Dalam rajah, bucu P trapezium berada 3 unit di atas paksi pantulan m. Berapakah jarak imejnya, P′, dari m, dan berapakah panjang PP′?",
    answer: [["P′ berada 3 unit di bawah m.", "PP′ = 3 + 3 = 6 unit, dan PP′ berserenjang dengan m."]],
  },
);

const ARROW: Pt[] = [[1, 1], [3, 1], [3, 0], [5, 2], [3, 4], [3, 3], [1, 3]];
const ch11T: Pt = [5, 2], ch11A: Pt = [1, 1];
const ch11card = card("11.1", "challenge",
  new Diagram()
    .grid(-5, 5, -4, 4)
    .poly(ARROW, "object", ["A", "", "", "T", "", "", ""])
    .build(REFLECTION, T("An arrow-shaped logo in the first quadrant pointing right, with tail corner A(1, 1) and tip T(5, 2).", "Logo berbentuk anak panah dalam sukuan pertama menghala ke kanan, dengan bucu ekor A(1, 1) dan hujung T(5, 2).")),
  {
    prompt: `An arrow-shaped logo has tip T${coord(ch11T)} and tail corner A${coord(ch11A)}, as shown. The logo is reflected in the y-axis, and that image is then reflected in the x-axis.`,
    parts: [
      "Find the image T′ of the tip after the reflection in the y-axis, and state which way the arrow now points.",
      "Find the final image T″ after the second reflection, in the x-axis.",
      "State the single transformation that maps the original logo directly onto the final image. Justify using A and its final image A″.",
    ],
    answer: [
      [`T′ = ${coord(reflectInX(0)(ch11T))}.`, "The arrow now points left."],
      [`T″ = ${coord(reflectInY(0)(reflectInX(0)(ch11T)))}.`],
      [`A${coord(ch11A)} → A′${coord(reflectInX(0)(ch11A))} → A″${coord(reflectInY(0)(reflectInX(0)(ch11A)))}.`, "Both points follow (x, y) → (−x, −y): a rotation of 180° about the origin O."],
    ],
  },
  {
    prompt: `Sebuah logo berbentuk anak panah mempunyai hujung T${coord(ch11T)} dan bucu ekor A${coord(ch11A)}, seperti dalam rajah. Logo itu dipantulkan pada paksi-y, kemudian imej itu dipantulkan pada paksi-x.`,
    parts: [
      "Cari imej hujung, T′, selepas pantulan pada paksi-y, dan nyatakan arah anak panah sekarang.",
      "Cari imej akhir, T″, selepas pantulan kedua pada paksi-x.",
      "Nyatakan satu penjelmaan tunggal yang memetakan logo asal terus kepada imej akhir. Beri justifikasi menggunakan A dan imej akhirnya, A″.",
    ],
    answer: [
      [`T′ = ${coord(reflectInX(0)(ch11T))}.`, "Anak panah kini menghala ke kiri."],
      [`T″ = ${coord(reflectInY(0)(reflectInX(0)(ch11T)))}.`],
      [`A${coord(ch11A)} → A′${coord(reflectInX(0)(ch11A))} → A″${coord(reflectInY(0)(reflectInX(0)(ch11A)))}.`, "Kedua-dua titik mengikut (x, y) → (−x, −y): putaran 180° pada asalan O."],
    ],
  },
  [coord(reflectInX(0)(ch11T)), coord(reflectInY(0)(reflectInX(0)(ch11T)))],
);

const ch12 = [[1, 1], [3, 1], [2, 4]] as Pt[];
const ch12Img = map(reflectInX(-1), ch12);
const ch12G: Pt = [3, -2];
const ch12card = card("11.1", "challenge",
  new Diagram()
    .grid(-6, 4, 0, 5)
    .poly(ch12, "object", ["D", "E", "F"])
    .poly(ch12Img, "image", ["D′", "E′", "F′"])
    .build(REFLECTION, T("Triangle DEF and its image D′E′F′ on a Cartesian plane; the mirror line is not drawn.", "Segi tiga DEF dan imejnya D′E′F′ pada satah Cartes; paksi pantulan tidak dilukis.")),
  {
    prompt: "Triangle D′E′F′ is the image of triangle DEF under a reflection.",
    parts: [
      "State the equation of the mirror line.",
      `Find the image of the point G${coord(ch12G)} under the same reflection.`,
      "Without measuring, state the length of D′E′ and explain your answer.",
    ],
    answer: [
      [`The midpoint of D${coord(ch12[0])} and D′${coord(ch12Img[0])} is (−1, 1); the mirror line is vertical.`, "x = −1."],
      ["G is 4 units right of x = −1, so G′ is 4 units left of it.", `G′ = ${coord(reflectInX(-1)(ch12G))}.`],
      ["DE = 3 − 1 = 2 units, so D′E′ = 2 units.", "A reflection is an isometry: it preserves every length."],
    ],
  },
  {
    prompt: "Segi tiga D′E′F′ ialah imej segi tiga DEF di bawah suatu pantulan.",
    parts: [
      "Nyatakan persamaan paksi pantulan.",
      `Cari imej titik G${coord(ch12G)} di bawah pantulan yang sama.`,
      "Tanpa mengukur, nyatakan panjang D′E′ dan terangkan jawapan anda.",
    ],
    answer: [
      [`Titik tengah D${coord(ch12[0])} dan D′${coord(ch12Img[0])} ialah (−1, 1); paksi pantulan adalah menegak.`, "x = −1."],
      ["G berada 4 unit di kanan x = −1, maka G′ berada 4 unit di kirinya.", `G′ = ${coord(reflectInX(-1)(ch12G))}.`],
      ["DE = 3 − 1 = 2 unit, maka D′E′ = 2 unit.", "Pantulan ialah isometri: semua panjang dikekalkan."],
    ],
  },
  ["x = −1", coord(reflectInX(-1)(ch12G))],
);

const ch13P: Pt = [0, 2];
const ch13P1 = reflectInX(1)(ch13P), ch13P2 = reflectInX(4)(ch13P1);
const ch13card = card("11.1", "challenge",
  new Diagram()
    .grid(-1, 7, 0, 4)
    .line([1, 0], [1, 4], "x = 1", "end")
    .line([4, 0], [4, 4], "x = 4", "end")
    .point(ch13P, "P", "object", [1, 1])
    .build(REFLECTION, T("Point P(0, 2) and two parallel vertical mirror lines, x = 1 and x = 4.", "Titik P(0, 2) dan dua paksi pantulan menegak yang selari, x = 1 dan x = 4.")),
  {
    prompt: `Point P${coord(ch13P)} is reflected in the line x = 1 to give P′. Then P′ is reflected in the line x = 4 to give P″.`,
    parts: ["Find P′.", "Find P″.", "Describe the single transformation that maps P to P″. How is it related to the distance between the two mirror lines?"],
    answer: [
      [`P is 1 unit left of x = 1, so P′ = ${coord(ch13P1)}.`],
      [`P′ is 2 units left of x = 4, so P″ = ${coord(ch13P2)}.`],
      [`Translation ${vec(vectorBetween(ch13P, ch13P2))}: 6 units to the right.`, "6 = 2 × 3, twice the distance between the parallel mirror lines."],
    ],
  },
  {
    prompt: `Titik P${coord(ch13P)} dipantulkan pada garis x = 1 untuk menghasilkan P′. Kemudian P′ dipantulkan pada garis x = 4 untuk menghasilkan P″.`,
    parts: ["Cari P′.", "Cari P″.", "Huraikan penjelmaan tunggal yang memetakan P kepada P″. Apakah kaitannya dengan jarak di antara dua paksi pantulan itu?"],
    answer: [
      [`P berada 1 unit di kiri x = 1, maka P′ = ${coord(ch13P1)}.`],
      [`P′ berada 2 unit di kiri x = 4, maka P″ = ${coord(ch13P2)}.`],
      [`Translasi ${vec(vectorBetween(ch13P, ch13P2))}: 6 unit ke kanan.`, "6 = 2 × 3, iaitu dua kali jarak di antara dua paksi pantulan yang selari."],
    ],
  },
  [coord(ch13P1), coord(ch13P2)],
);

const ch14 = [[1, 3], [4, 3], [1, 5]] as Pt[];
const ch14Img = map(reflectInY(2), ch14);
const ch14card = card("11.1", "challenge",
  new Diagram()
    .grid(-2, 5, -2, 6)
    .line([-2, 2], [5, 2], "y = 2", "start")
    .poly(ch14, "object", ["A", "B", "C"])
    .build(REFLECTION, T("Triangle ABC above the horizontal mirror line y = 2.", "Segi tiga ABC di atas paksi pantulan mengufuk y = 2.")),
  {
    prompt: `Triangle ABC with ${list(["A", "B", "C"], ch14).replace(/, (?=C)/, " and ")} is reflected in the line y = 2. Ali writes A′ = (1, −3).`,
    parts: ["Find the correct coordinates of A′.", "Explain the mistake Ali made.", "Find B′ and C′, and state whether triangle A′B′C′ is congruent to triangle ABC."],
    answer: [
      ["A is 1 unit above y = 2, so A′ is 1 unit below it.", `A′ = ${coord(ch14Img[0])}.`],
      ["Ali reflected A in the x-axis (y = 0) instead of in the line y = 2."],
      [`B′ = ${coord(ch14Img[1])}, C′ = ${coord(ch14Img[2])}.`, "Yes, they are congruent: a reflection preserves all lengths and angles."],
    ],
  },
  {
    prompt: `Segi tiga ABC dengan ${list(["A", "B", "C"], ch14).replace(/, (?=C)/, " dan ")} dipantulkan pada garis y = 2. Ali menulis A′ = (1, −3).`,
    parts: ["Cari koordinat A′ yang betul.", "Terangkan kesilapan Ali.", "Cari B′ dan C′, dan nyatakan sama ada segi tiga A′B′C′ kongruen dengan segi tiga ABC."],
    answer: [
      ["A berada 1 unit di atas y = 2, maka A′ berada 1 unit di bawahnya.", `A′ = ${coord(ch14Img[0])}.`],
      ["Ali memantulkan A pada paksi-x (y = 0), bukan pada garis y = 2."],
      [`B′ = ${coord(ch14Img[1])}, C′ = ${coord(ch14Img[2])}.`, "Ya, kongruen: pantulan mengekalkan semua panjang dan sudut."],
    ],
  },
  ch14Img.map(coord),
);

// ═══ 11.2 Rotation ═════════════════════════════════════════════════════════

const r15 = [[2, 0.5], [4, 0.5], [2, 2]] as Pt[];
const r15Img = map(rotate(90, "acw"), r15);
const c15 = card("11.2", "concept",
  new Diagram()
    .poly(r15, "object")
    .poly(r15Img, "image")
    .seg([0, 0], r15[1], "other", true)
    .seg([0, 0], r15Img[1], "other", true)
    .point([0, 0], "O", "other", [1, -1])
    .text(centroid(r15), "A", 0, 4)
    .text(centroid(r15Img), "B", 0, 4, undefined, "image")
    .build(ROTATION, T("Triangle A and its rotated image B, with dashed lines from point O to a vertex and its image.", "Segi tiga A dan imejnya B selepas putaran, dengan garis putus-putus dari titik O ke satu bucu dan imejnya.")),
  {
    prompt: "Triangle B is the image of triangle A under a rotation. What three pieces of information are needed to describe a rotation completely?",
    answer: [["The centre of rotation (here O), the angle of rotation, and the direction (clockwise or anticlockwise)."]],
  },
  {
    prompt: "Segi tiga B ialah imej segi tiga A di bawah suatu putaran. Apakah tiga maklumat yang diperlukan untuk menghuraikan suatu putaran dengan lengkap?",
    answer: [["Pusat putaran (di sini O), sudut putaran, dan arah putaran (ikut arah jam atau lawan arah jam)."]],
  },
);

const c16 = card("11.2", "concept",
  new Diagram()
    .seg([0, 0], [0, 2], "other", true)
    .seg([0, 0], [2, 0], "other", true)
    .turn([0, 0], 1.5, 90, 0, "90°")
    .turn([0, 0], 1, 90, 360, "?")
    .point([0, 0], "O", "other", [-1, -1])
    .point([0, 2], "P", "object", [1, 1])
    .point([2, 0], "P′", "image", [1, 1])
    .build(ROTATION, T("Centre O with P above it and P′ to its right; a 90° clockwise arc and an anticlockwise arc marked ?.", "Pusat O dengan P di atasnya dan P′ di kanannya; lengkok 90° ikut arah jam dan lengkok lawan arah jam bertanda ?.")),
  {
    prompt: "P′ is the image of P under a rotation of 90° clockwise about O. Which anticlockwise rotation about O also maps P to P′?",
    answer: [["270° anticlockwise, because 360° − 90° = 270°."]],
  },
  {
    prompt: "P′ ialah imej P di bawah putaran 90° ikut arah jam pada O. Putaran lawan arah jam yang manakah juga memetakan P kepada P′?",
    answer: [["270° lawan arah jam, kerana 360° − 90° = 270°."]],
  },
  ["270°"],
);

const L17: Pt[] = [[1, 0.5], [4, 0.5], [4, 1.5], [2, 1.5], [2, 3], [1, 3]];
const c17 = card("11.2", "concept",
  new Diagram()
    .grid(-4, 5, -1, 5, true, false)
    .poly(L17, "object")
    .poly(map(rotate(90, "acw"), L17), "image")
    .build(ROTATION, T("An L-shape and its image after a rotation of 90° anticlockwise about the origin O.", "Bentuk L dan imejnya selepas putaran 90° lawan arah jam pada asalan O.")),
  {
    prompt: "The L-shape (gold) is rotated 90° anticlockwise about O to give the blue image. Is the image laterally inverted, as it would be under a reflection? What stays the same?",
    answer: [["No. A rotation turns the shape without flipping it, so the image is not laterally inverted.", "All side lengths and angles stay the same: the image is congruent to the object."]],
  },
  {
    prompt: "Bentuk L (emas) diputarkan 90° lawan arah jam pada O untuk menghasilkan imej biru. Adakah imej itu tersongsang sisi seperti dalam pantulan? Apakah yang kekal?",
    answer: [["Tidak. Putaran memusingkan bentuk tanpa menterbalikkannya, maka imej tidak tersongsang sisi.", "Semua panjang sisi dan sudut kekal: imej kongruen dengan objek."]],
  },
);

const r18P: Pt = [3, 1];
const p18 = card("11.2", "practice",
  new Diagram()
    .grid(-2, 4, -1, 4)
    .point(r18P, "P", "object", [1, 1])
    .build(ROTATION, T("Point P(3, 1) on a Cartesian plane with origin O.", "Titik P(3, 1) pada satah Cartes dengan asalan O.")),
  {
    prompt: `Point P${coord(r18P)} is rotated 90° anticlockwise about the origin O. Find the coordinates of P′.`,
    answer: [["90° anticlockwise about O: (x, y) → (−y, x).", `P′ = ${coord(rotate(90, "acw")(r18P))}.`]],
  },
  {
    prompt: `Titik P${coord(r18P)} diputarkan 90° lawan arah jam pada asalan O. Cari koordinat P′.`,
    answer: [["90° lawan arah jam pada O: (x, y) → (−y, x).", `P′ = ${coord(rotate(90, "acw")(r18P))}.`]],
  },
  [coord(rotate(90, "acw")(r18P))],
);

const r19Q: Pt = [-2, 3];
const p19 = card("11.2", "practice",
  new Diagram()
    .grid(-3, 3, -4, 4)
    .point(r19Q, "Q", "object", [-1, 1])
    .build(ROTATION, T("Point Q(−2, 3) in the second quadrant.", "Titik Q(−2, 3) dalam sukuan kedua.")),
  {
    prompt: `Point Q${coord(r19Q)} is rotated 180° about the origin. Find the coordinates of Q′. Does the direction of rotation matter?`,
    answer: [["180° about O: (x, y) → (−x, −y).", `Q′ = ${coord(rotate(180, "acw")(r19Q))}.`, "The direction does not matter: 180° clockwise and 180° anticlockwise give the same image."]],
  },
  {
    prompt: `Titik Q${coord(r19Q)} diputarkan 180° pada asalan. Cari koordinat Q′. Adakah arah putaran mempengaruhi jawapan?`,
    answer: [["180° pada O: (x, y) → (−x, −y).", `Q′ = ${coord(rotate(180, "acw")(r19Q))}.`, "Arah tidak mempengaruhi jawapan: 180° ikut arah jam dan 180° lawan arah jam memberikan imej yang sama."]],
  },
  [coord(rotate(180, "acw")(r19Q))],
);

const r20R: Pt = [4, 2], r20C: Pt = [1, 1];
const r20Img = rotate(90, "cw", r20C)(r20R);
const p20 = card("11.2", "practice",
  new Diagram()
    .grid(-1, 5, -3, 3)
    .seg(r20C, r20R, "other", true)
    .point(r20C, "C", "other", [-1, 1])
    .point(r20R, "R", "object", [1, 1])
    .build(ROTATION, T("Centre C(1, 1) and point R(4, 2), joined by a dashed line.", "Pusat C(1, 1) dan titik R(4, 2), disambung oleh garis putus-putus.")),
  {
    prompt: `Point R${coord(r20R)} is rotated 90° clockwise about the centre C${coord(r20C)}. Find the coordinates of R′.`,
    answer: [["From C to R: 3 right, 1 up.", "Turning this 90° clockwise gives 1 right, 3 down.", `R′ = (1 + 1, 1 − 3) = ${coord(r20Img)}.`]],
  },
  {
    prompt: `Titik R${coord(r20R)} diputarkan 90° ikut arah jam pada pusat C${coord(r20C)}. Cari koordinat R′.`,
    answer: [["Dari C ke R: 3 ke kanan, 1 ke atas.", "Diputar 90° ikut arah jam menjadi 1 ke kanan, 3 ke bawah.", `R′ = (1 + 1, 1 − 3) = ${coord(r20Img)}.`]],
  },
  [coord(r20Img)],
);

const r21 = [[1, 1], [4, 1], [1, 3]] as Pt[];
const r21Img = map(rotate(90, "cw"), r21);
const p21 = card("11.2", "practice",
  new Diagram()
    .grid(-1, 5, -5, 4)
    .poly(r21, "object")
    .poly(r21Img, "image")
    .seg([0, 0], r21[1], "other", true)
    .seg([0, 0], r21Img[1], "other", true)
    .text(centroid(r21), "A", 0, 4)
    .text(centroid(r21Img), "B", 0, 4, undefined, "image")
    .build(ROTATION, T("Triangle A in the first quadrant and its image B in the fourth quadrant, with dashed lines from O to a vertex and its image.", "Segi tiga A dalam sukuan pertama dan imejnya B dalam sukuan keempat, dengan garis putus-putus dari O ke satu bucu dan imejnya.")),
  {
    prompt: "Triangle B is the image of triangle A under a rotation about the origin O. State the angle and the direction of the rotation.",
    answer: [[`The vertex ${coord(r21[1])} moves to ${coord(r21Img[1])}: the dashed line turns a quarter-turn clockwise.`, "90° clockwise (equivalently 270° anticlockwise)."]],
  },
  {
    prompt: "Segi tiga B ialah imej segi tiga A di bawah putaran pada asalan O. Nyatakan sudut dan arah putaran.",
    answer: [[`Bucu ${coord(r21[1])} bergerak ke ${coord(r21Img[1])}: garis putus-putus berpusing suku pusingan ikut arah jam.`, "90° ikut arah jam (sama dengan 270° lawan arah jam)."]],
  },
  ["90°", "270°"],
);

const r22 = [[1, 1], [3, 1], [1, 2]] as Pt[];
const r22C: Pt = [2, 3];
const r22Img = map(rotate(180, "acw", r22C), r22);
const p22 = card("11.2", "practice",
  new Diagram()
    .grid(0, 4, 0, 6)
    .poly(r22, "object", ["A", "B", "C"])
    .poly(r22Img, "image", ["A′", "B′", "C′"])
    .build(ROTATION, T("Triangle ABC and its image A′B′C′ after a rotation of 180°; the centre is not marked.", "Segi tiga ABC dan imejnya A′B′C′ selepas putaran 180°; pusat tidak ditanda.")),
  {
    prompt: "Triangle A′B′C′ is the image of triangle ABC under a rotation of 180°. Find the coordinates of the centre of rotation.",
    answer: [["For a 180° rotation, the centre is the midpoint of every pair of corresponding points.", `The midpoint of A${coord(r22[0])} and A′${coord(r22Img[0])} is ${coord(r22C)}.`, `Centre of rotation: ${coord(r22C)}.`]],
  },
  {
    prompt: "Segi tiga A′B′C′ ialah imej segi tiga ABC di bawah putaran 180°. Cari koordinat pusat putaran.",
    answer: [["Bagi putaran 180°, pusat ialah titik tengah setiap pasangan titik sepadan.", `Titik tengah A${coord(r22[0])} dan A′${coord(r22Img[0])} ialah ${coord(r22C)}.`, `Pusat putaran: ${coord(r22C)}.`]],
  },
  [coord(r22C)],
);

const r23 = [[1, 1], [3, 1], [3, 2], [1, 3]] as Pt[];
const r23Img = map(rotate(90, "acw"), r23);
const p23 = card("11.2", "practice",
  new Diagram()
    .grid(-4, 4, 0, 4)
    .poly(r23, "object", ["A", "B", "C", "D"])
    .polyline([r23Img[2], r23Img[1], r23Img[0]], "image", ["C′", "B′", "A′"])
    .build(ROTATION, T("Quadrilateral ABCD and three vertices A′, B′, C′ of its image after a rotation of 90° anticlockwise about O; D′ is missing.", "Sisi empat ABCD dan tiga bucu imej A′, B′, C′ selepas putaran 90° lawan arah jam pada O; D′ tiada.")),
  {
    prompt: "Quadrilateral ABCD is rotated 90° anticlockwise about the origin. Three vertices of the image are drawn. Find the coordinates of the missing vertex D′.",
    answer: [[`D = ${coord(r23[3])}; 90° anticlockwise about O: (x, y) → (−y, x).`, `D′ = ${coord(r23Img[3])}.`]],
  },
  {
    prompt: "Sisi empat ABCD diputarkan 90° lawan arah jam pada asalan. Tiga bucu imej telah dilukis. Cari koordinat bucu D′ yang tiada.",
    answer: [[`D = ${coord(r23[3])}; 90° lawan arah jam pada O: (x, y) → (−y, x).`, `D′ = ${coord(r23Img[3])}.`]],
  },
  [coord(r23Img[3]), "D′"],
);

const r24S: Pt = [2, -3];
const r24Img = rotate(270, "acw")(r24S);
const p24 = card("11.2", "practice",
  new Diagram()
    .grid(-4, 3, -4, 1)
    .point(r24S, "S", "object", [1, -1])
    .build(ROTATION, T("Point S(2, −3) in the fourth quadrant.", "Titik S(2, −3) dalam sukuan keempat.")),
  {
    prompt: `Point S${coord(r24S)} is rotated 270° anticlockwise about the origin. Find S′, and state the clockwise rotation that gives the same image.`,
    answer: [["270° anticlockwise is the same as 90° clockwise: (x, y) → (y, −x).", `S′ = ${coord(r24Img)}.`]],
  },
  {
    prompt: `Titik S${coord(r24S)} diputarkan 270° lawan arah jam pada asalan. Cari S′, dan nyatakan putaran ikut arah jam yang memberikan imej yang sama.`,
    answer: [["270° lawan arah jam sama dengan 90° ikut arah jam: (x, y) → (y, −x).", `S′ = ${coord(r24Img)}.`]],
  },
  [coord(r24Img)],
);

const FLAG: Pt[] = [[1, 1], [1.6, 1], [1.6, 2.8], [3, 3.4], [1, 4]];
const p25 = card("11.2", "practice",
  new Diagram()
    .grid(-4, 4, -5, 5)
    .poly(FLAG, "object", ["", "", "", "", "P"])
    .poly(map(rotate(180, "acw"), FLAG), "image")
    .text(centroid(FLAG), "A", 9, 22)
    .text(centroid(map(rotate(180, "acw"), FLAG)), "B", -9, -14, undefined, "image")
    .build(ROTATION, T("Flag A in the first quadrant with vertex P(1, 4) at the top of its pole, and flag B in the third quadrant.", "Bendera A dalam sukuan pertama dengan bucu P(1, 4) di hujung atas tiangnya, dan bendera B dalam sukuan ketiga.")),
  {
    prompt: "Flag B is the image of flag A. Is the transformation a rotation of 180° about O or a reflection in the y-axis? Use the vertex P(1, 4) to justify your answer.",
    answer: [[`P(1, 4) maps to ${coord(rotate(180, "acw")([1, 4]))} on flag B.`, `A reflection in the y-axis would give ${coord(reflectInX(0)([1, 4]))}, so it is not that reflection.`, "(x, y) → (−x, −y): a rotation of 180° about O."]],
  },
  {
    prompt: "Bendera B ialah imej bendera A. Adakah penjelmaan itu putaran 180° pada O atau pantulan pada paksi-y? Gunakan bucu P(1, 4) untuk menjustifikasikan jawapan anda.",
    answer: [[`P(1, 4) dipetakan kepada ${coord(rotate(180, "acw")([1, 4]))} pada bendera B.`, `Pantulan pada paksi-y akan memberikan ${coord(reflectInX(0)([1, 4]))}, maka ia bukan pantulan itu.`, "(x, y) → (−x, −y): putaran 180° pada O."]],
  },
);

const BLADE: Pt[] = [[0.5, 0], [4, 0], [4, 1], [1.5, 1], [1.5, 2], [0.5, 2]];
const blP: Pt = [4, 1];
const ch26 = card("11.2", "challenge",
  new Diagram()
    .grid(-4, 4, -4, 4, true, false)
    .circle([0, 0], Math.hypot(4, 1), true)
    .poly(BLADE, "object", ["", "", "P", "", "", ""])
    .build(ROTATION, T("A windmill blade in the first quadrant with tip P(4, 1); a dashed circle about O passes through P.", "Bilah kincir angin dalam sukuan pertama dengan hujung P(4, 1); bulatan putus-putus berpusat O melalui P.")),
  {
    prompt: `A windmill blade has its tip at P${coord(blP)}. The blade rotates about the origin O.`,
    parts: [
      "Find the position of the tip after a rotation of 90° anticlockwise.",
      "Find the position of the tip after a rotation of 180°.",
      "A third blade is the image of the first under a rotation of 270° anticlockwise. Find the image of P and state the equivalent clockwise rotation.",
    ],
    answer: [
      [`(x, y) → (−y, x): ${coord(rotate(90, "acw")(blP))}.`],
      [`(x, y) → (−x, −y): ${coord(rotate(180, "acw")(blP))}.`],
      ["270° anticlockwise = 90° clockwise: (x, y) → (y, −x).", `Image of P = ${coord(rotate(270, "acw")(blP))}.`],
    ],
  },
  {
    prompt: `Bilah sebuah kincir angin mempunyai hujung di P${coord(blP)}. Bilah itu berputar pada asalan O.`,
    parts: [
      "Cari kedudukan hujung selepas putaran 90° lawan arah jam.",
      "Cari kedudukan hujung selepas putaran 180°.",
      "Bilah ketiga ialah imej bilah pertama di bawah putaran 270° lawan arah jam. Cari imej P dan nyatakan putaran ikut arah jam yang setara.",
    ],
    answer: [
      [`(x, y) → (−y, x): ${coord(rotate(90, "acw")(blP))}.`],
      [`(x, y) → (−x, −y): ${coord(rotate(180, "acw")(blP))}.`],
      ["270° lawan arah jam = 90° ikut arah jam: (x, y) → (y, −x).", `Imej P = ${coord(rotate(270, "acw")(blP))}.`],
    ],
  },
  [90, 180, 270].map(d => coord(rotate(d as 90 | 180 | 270, "acw")(blP))),
);

const r27 = [[3, 1], [5, 1], [3, 3]] as Pt[];
const r27M: Pt = [2, 1];
const r27Img = map(rotate(90, "acw", r27M), r27);
const ch27 = card("11.2", "challenge",
  new Diagram()
    .grid(-1, 6, -1, 5)
    .poly(r27, "object", ["A", "B", "C"])
    .point(r27M, "M", "other", [-1, -1])
    .build(ROTATION, T("Triangle ABC and the centre of rotation M(2, 1).", "Segi tiga ABC dan pusat putaran M(2, 1).")),
  {
    prompt: `Triangle ABC has vertices ${list(["A", "B", "C"], r27).replace(/, (?=C)/, " and ")}. It is rotated 90° anticlockwise about M${coord(r27M)}.`,
    parts: ["Find A′ and B′.", "Find C′.", "Describe fully the rotation that maps triangle A′B′C′ back onto triangle ABC."],
    answer: [
      [`From M, A is 1 right; after the turn it is 1 up: A′ = ${coord(r27Img[0])}.`, `From M, B is 3 right; after the turn it is 3 up: B′ = ${coord(r27Img[1])}.`],
      [`From M, C is 1 right and 2 up; after the turn it is 2 left and 1 up: C′ = ${coord(r27Img[2])}.`],
      [`A rotation of 90° clockwise about M${coord(r27M)}.`],
    ],
  },
  {
    prompt: `Segi tiga ABC mempunyai bucu ${list(["A", "B", "C"], r27).replace(/, (?=C)/, " dan ")}. Segi tiga itu diputarkan 90° lawan arah jam pada M${coord(r27M)}.`,
    parts: ["Cari A′ dan B′.", "Cari C′.", "Huraikan selengkapnya putaran yang memetakan segi tiga A′B′C′ kembali kepada segi tiga ABC."],
    answer: [
      [`Dari M, A berada 1 ke kanan; selepas putaran ia 1 ke atas: A′ = ${coord(r27Img[0])}.`, `Dari M, B berada 3 ke kanan; selepas putaran ia 3 ke atas: B′ = ${coord(r27Img[1])}.`],
      [`Dari M, C berada 1 ke kanan dan 2 ke atas; selepas putaran ia 2 ke kiri dan 1 ke atas: C′ = ${coord(r27Img[2])}.`],
      [`Putaran 90° ikut arah jam pada M${coord(r27M)}.`],
    ],
  },
  r27Img.map(coord),
);

const r28 = [[1, 2], [3, 2], [1, 4]] as Pt[];
const r28K: Pt = [1, 0];
const r28Img = map(rotate(90, "cw", r28K), r28);
const r28D: Pt = [2, 3];
const ch28 = card("11.2", "challenge",
  new Diagram()
    .grid(-1, 6, -3, 5)
    .poly(r28, "object", ["A", "B", "C"])
    .poly(r28Img, "image", ["A′", "B′", "C′"])
    .point(r28K, "K", "other", [-1, -1])
    .build(ROTATION, T("Triangle ABC, its rotated image A′B′C′ and the point K(1, 0).", "Segi tiga ABC, imejnya A′B′C′ selepas putaran dan titik K(1, 0).")),
  {
    prompt: "Triangle A′B′C′ is the image of triangle ABC under a rotation.",
    parts: [
      "State the angle and direction of the rotation.",
      "Show that K(1, 0) is the centre of rotation by comparing KA with KA′ and KC with KC′.",
      `Find the image of the point D${coord(r28D)} under the same rotation.`,
    ],
    answer: [
      ["AC points straight up; A′C′ points to the right: a quarter-turn clockwise.", "90° clockwise."],
      [`KA = 2 = KA′ (A${coord(r28[0])}, A′${coord(r28Img[0])}) and KC = 4 = KC′ (C${coord(r28[2])}, C′${coord(r28Img[2])}).`, "K is equally far from each point and its image, and ∠AKA′ = 90°, so K is the centre."],
      ["From K, D is 1 right and 3 up; after the turn it is 3 right and 1 down.", `D′ = ${coord(rotate(90, "cw", r28K)(r28D))}.`],
    ],
  },
  {
    prompt: "Segi tiga A′B′C′ ialah imej segi tiga ABC di bawah suatu putaran.",
    parts: [
      "Nyatakan sudut dan arah putaran.",
      "Tunjukkan bahawa K(1, 0) ialah pusat putaran dengan membandingkan KA dengan KA′ dan KC dengan KC′.",
      `Cari imej titik D${coord(r28D)} di bawah putaran yang sama.`,
    ],
    answer: [
      ["AC menghala tegak ke atas; A′C′ menghala ke kanan: suku pusingan ikut arah jam.", "90° ikut arah jam."],
      [`KA = 2 = KA′ (A${coord(r28[0])}, A′${coord(r28Img[0])}) dan KC = 4 = KC′ (C${coord(r28[2])}, C′${coord(r28Img[2])}).`, "K berjarak sama dari setiap titik dan imejnya, dan ∠AKA′ = 90°, maka K ialah pusat."],
      ["Dari K, D berada 1 ke kanan dan 3 ke atas; selepas putaran ia 3 ke kanan dan 1 ke bawah.", `D′ = ${coord(rotate(90, "cw", r28K)(r28D))}.`],
    ],
  },
  ["90°", coord(rotate(90, "cw", r28K)(r28D))],
);

const clockTip: Pt = [0, 4];
const clock = new Diagram().circle([0, 0], 4);
for (const [h, p] of [["12", [0, 4]], ["3", [4, 0]], ["6", [0, -4]], ["9", [-4, 0]]] as Array<[string, Pt]>) {
  clock.seg([p[0] * 0.88, p[1] * 0.88], p, "other");
  // Numerals sit just outside the rim so the hand never crosses them.
  clock.text([p[0] * 1.14, p[1] * 1.14], h, p[0] > 0 ? 2 : p[0] < 0 ? -2 : 0, p[1] < 0 ? 9 : 4, p[0] > 0 ? "start" : p[0] < 0 ? "end" : undefined, "other");
}
const ch29 = card("11.2", "challenge",
  clock
    .seg([0, 0], clockTip, "object")
    .point([0, 0], "O", "other", [1, -1])
    .text(clockTip, "T", -6, 16, "end")
    .build(ROTATION, T("A clock face with centre O; the minute hand points from O to T at 12.", "Muka jam berpusat O; jarum minit menghala dari O ke T pada angka 12.")),
  {
    prompt: `The minute hand of a clock has its tip T at ${coord(clockTip)}, with the centre of the clock at O(0, 0). At 12:00 the hand points to 12.`,
    parts: [
      "Through what angle, and in which direction, does the minute hand rotate from 12:00 to 12:15?",
      "Find the coordinates of the tip at 12:15.",
      "Find the coordinates of the tip at 12:45, and describe the rotation from 12:00 to 12:45 as an anticlockwise rotation.",
    ],
    answer: [
      ["15 minutes is a quarter of an hour: 90° clockwise about O."],
      [`${coord(rotate(90, "cw")(clockTip))}.`],
      [`45 minutes is 270° clockwise: the tip is at ${coord(rotate(270, "cw")(clockTip))}.`, "270° clockwise is the same as 90° anticlockwise about O."],
    ],
  },
  {
    prompt: `Jarum minit sebuah jam mempunyai hujung T di ${coord(clockTip)}, dengan pusat jam di O(0, 0). Pada pukul 12:00, jarum itu menunjuk ke angka 12.`,
    parts: [
      "Melalui sudut berapa, dan dalam arah mana, jarum minit berputar dari pukul 12:00 hingga 12:15?",
      "Cari koordinat hujung jarum pada pukul 12:15.",
      "Cari koordinat hujung jarum pada pukul 12:45, dan huraikan putaran dari pukul 12:00 hingga 12:45 sebagai putaran lawan arah jam.",
    ],
    answer: [
      ["15 minit ialah suku jam: 90° ikut arah jam pada O."],
      [`${coord(rotate(90, "cw")(clockTip))}.`],
      [`45 minit ialah 270° ikut arah jam: hujung berada di ${coord(rotate(270, "cw")(clockTip))}.`, "270° ikut arah jam sama dengan 90° lawan arah jam pada O."],
    ],
  },
  [coord(rotate(90, "cw")(clockTip)), coord(rotate(270, "cw")(clockTip)), "90°"],
);

// ═══ 11.3 Translation ══════════════════════════════════════════════════════

const c30 = card("11.3", "concept", null,
  {
    prompt: "A translation is written as (h, k). What does the translation (−2, 3) do to every point of a shape?",
    answer: [["Every point moves 2 units to the left (h = −2) and 3 units up (k = 3)."]],
  },
  {
    prompt: "Translasi ditulis sebagai (h, k). Apakah kesan translasi (−2, 3) pada setiap titik suatu bentuk?",
    answer: [["Setiap titik bergerak 2 unit ke kiri (h = −2) dan 3 unit ke atas (k = 3)."]],
  },
);

const ARROW_SHAPE: Pt[] = [[0, 1], [2, 1], [2, 0], [3.5, 1.5], [2, 3], [2, 2], [0, 2]];
const c31v: Pt = [4, 3];
// Movement arrows start at outer corners (top of the tail, foot of the head)
// so they run clear of both shapes.
const c31 = card("11.3", "concept",
  new Diagram()
    .grid(0, 8, 0, 6, false)
    .poly(ARROW_SHAPE, "object")
    .poly(shift(ARROW_SHAPE, c31v), "image")
    .arrow(ARROW_SHAPE[6], translate(c31v)(ARROW_SHAPE[6]), "other")
    .arrow(ARROW_SHAPE[2], translate(c31v)(ARROW_SHAPE[2]), "other")
    .build(TRANSLATION, T("An arrow-shaped object and its image after a translation, with movement arrows from two vertices.", "Objek berbentuk anak panah dan imejnya selepas translasi, dengan anak panah gerakan dari dua bucu.")),
  {
    prompt: "The arrow-shaped object (gold) is translated to the blue image. Compare the orientation, size and shape of the object and its image.",
    answer: [["The image faces the same way: a translation does not turn or flip a shape.", "The size and shape are unchanged, so the image is congruent to the object."]],
  },
  {
    prompt: "Objek berbentuk anak panah (emas) ditranslasikan kepada imej biru. Bandingkan orientasi, saiz dan bentuk objek dengan imejnya.",
    answer: [["Imej menghadap arah yang sama: translasi tidak memusingkan atau menterbalikkan bentuk.", "Saiz dan bentuk tidak berubah, maka imej kongruen dengan objek."]],
  },
);

const c32P: Pt = [0, 0], c32Q: Pt = [1, 2.5], c32v: Pt = [3, 1];
const c32 = card("11.3", "concept",
  new Diagram()
    .arrow(c32P, translate(c32v)(c32P), "other")
    .arrow(c32Q, translate(c32v)(c32Q), "other")
    .point(c32P, "P", "object", [-1, 0])
    .point(c32Q, "Q", "object", [-1, 0])
    .point(translate(c32v)(c32P), "P′", "image", [1, 0])
    .point(translate(c32v)(c32Q), "Q′", "image", [1, 0])
    .build(TRANSLATION, T("Points P and Q with arrows to their images P′ and Q′ under the same translation.", "Titik P dan Q dengan anak panah ke imejnya P′ dan Q′ di bawah translasi yang sama.")),
  {
    prompt: "Points P and Q are moved by the same translation to P′ and Q′. What can you say about the lines PP′ and QQ′?",
    answer: [["PP′ and QQ′ are equal in length, parallel and point in the same direction.", "Every point of a shape moves by the same vector under a translation."]],
  },
  {
    prompt: "Titik P dan Q digerakkan oleh translasi yang sama kepada P′ dan Q′. Apakah yang boleh dikatakan tentang garis PP′ dan QQ′?",
    answer: [["PP′ dan QQ′ sama panjang, selari dan menghala ke arah yang sama.", "Setiap titik suatu bentuk bergerak dengan vektor yang sama di bawah translasi."]],
  },
);

const t33A: Pt = [-3, 2], t33v: Pt = [5, -4];
const p33 = card("11.3", "practice",
  new Diagram()
    .grid(-4, 3, -3, 3)
    .point(t33A, "A", "object", [-1, 1])
    .build(TRANSLATION, T("Point A(−3, 2) in the second quadrant.", "Titik A(−3, 2) dalam sukuan kedua.")),
  {
    prompt: `Point A${coord(t33A)} is translated by ${vec(t33v)}. Find the coordinates of A′.`,
    answer: [["Add the vector to the coordinates: (−3 + 5, 2 + (−4)).", `A′ = ${coord(translate(t33v)(t33A))}.`]],
  },
  {
    prompt: `Titik A${coord(t33A)} ditranslasikan oleh ${vec(t33v)}. Cari koordinat A′.`,
    answer: [["Tambahkan vektor kepada koordinat: (−3 + 5, 2 + (−4)).", `A′ = ${coord(translate(t33v)(t33A))}.`]],
  },
  [coord(translate(t33v)(t33A))],
);

const HOUSE: Pt[] = [[1, 2], [3, 2], [3, 4], [2, 5], [1, 4]];
const t34v: Pt = [4, -2];
const p34 = card("11.3", "practice",
  new Diagram()
    .grid(0, 8, 0, 5, false)
    .poly(HOUSE, "object", ["", "", "", "V", ""])
    .poly(shift(HOUSE, t34v), "image", ["", "", "", "V′", ""])
    .build(TRANSLATION, T("A house-shaped object and its translated image on a square grid, with vertex V and its image V′; no vector is drawn.", "Objek berbentuk rumah dan imejnya selepas translasi pada grid segi empat sama, dengan bucu V dan imejnya V′; tiada vektor dilukis.")),
  {
    prompt: "The blue house is the image of the gold house under a translation. Write the translation as a vector (h, k).",
    answer: [["Vertex V moves 4 units right and 2 units down to V′.", `Translation ${vec(t34v)}.`]],
  },
  {
    prompt: "Rumah biru ialah imej rumah emas di bawah suatu translasi. Tulis translasi itu sebagai vektor (h, k).",
    answer: [["Bucu V bergerak 4 unit ke kanan dan 2 unit ke bawah ke V′.", `Translasi ${vec(t34v)}.`]],
  },
  [vec(t34v)],
);

const t35 = [[1, -3], [4, -3], [5, -1], [2, -1]] as Pt[];
const t35v: Pt = [-3, 2];
const t35Img = map(translate(t35v), t35);
const p35 = card("11.3", "practice",
  new Diagram()
    .grid(-3, 5, -4, 2)
    .poly(t35, "object", ["P", "Q", "R", "S"])
    .build(TRANSLATION, T("Parallelogram PQRS in the fourth quadrant.", "Segi empat selari PQRS dalam sukuan keempat.")),
  {
    prompt: `Parallelogram PQRS has ${list(["P", "Q", "R", "S"], t35).replace(/, (?=S)/, " and ")}. Find the image of each vertex under the translation ${vec(t35v)}.`,
    answer: [["Each point moves 3 left and 2 up: (x, y) → (x − 3, y + 2).", `${list(["P′", "Q′", "R′", "S′"], t35Img)}.`]],
  },
  {
    prompt: `Segi empat selari PQRS mempunyai ${list(["P", "Q", "R", "S"], t35).replace(/, (?=S)/, " dan ")}. Cari imej setiap bucu di bawah translasi ${vec(t35v)}.`,
    answer: [["Setiap titik bergerak 3 ke kiri dan 2 ke atas: (x, y) → (x − 3, y + 2).", `${list(["P′", "Q′", "R′", "S′"], t35Img)}.`]],
  },
  t35Img.map(coord),
);

const t36Img: Pt = [1, -2], t36v: Pt = [4, -3];
const t36Obj = translate([-t36v[0], -t36v[1]])(t36Img);
const p36 = card("11.3", "practice",
  new Diagram()
    .grid(-4, 2, -3, 2)
    .point(t36Img, "B′", "image", [1, -1])
    .build(TRANSLATION, T("Image point B′(1, −2); the object B is not shown.", "Titik imej B′(1, −2); objek B tidak ditunjukkan.")),
  {
    prompt: `Under the translation ${vec(t36v)}, the image of B is B′${coord(t36Img)}. Find the coordinates of B.`,
    answer: [["Undo the translation: subtract the vector from the image.", `B = (1 − 4, −2 − (−3)) = ${coord(t36Obj)}.`]],
  },
  {
    prompt: `Di bawah translasi ${vec(t36v)}, imej B ialah B′${coord(t36Img)}. Cari koordinat B.`,
    answer: [["Batalkan translasi: tolak vektor daripada imej.", `B = (1 − 4, −2 − (−3)) = ${coord(t36Obj)}.`]],
  },
  [coord(t36Obj)],
);

const t37M: Pt = [2, 4], t37Img: Pt = [2, -2];
const p37 = card("11.3", "practice",
  new Diagram()
    .grid(-1, 4, -3, 5)
    .arrow(t37M, t37Img, "other")
    .point(t37M, "M", "object", [1, 0])
    .point(t37Img, "M′", "image", [1, 0])
    .build(TRANSLATION, T("Point M and its image M′ directly below it, joined by an unlabelled arrow.", "Titik M dan imejnya M′ tepat di bawahnya, disambung oleh anak panah tanpa label.")),
  {
    prompt: "Point M is translated to M′, as shown. Describe the movement in words, and write the translation as a vector.",
    answer: [[`M${coord(t37M)} moves 6 units straight down to M′${coord(t37Img)}; there is no horizontal movement.`, `Translation ${vec(vectorBetween(t37M, t37Img))}.`]],
  },
  {
    prompt: "Titik M ditranslasikan kepada M′, seperti dalam rajah. Huraikan gerakan itu dalam perkataan dan tulis translasi itu sebagai vektor.",
    answer: [[`M${coord(t37M)} bergerak 6 unit tegak ke bawah ke M′${coord(t37Img)}; tiada gerakan mengufuk.`, `Translasi ${vec(vectorBetween(t37M, t37Img))}.`]],
  },
  [vec(vectorBetween(t37M, t37Img))],
);

const t38 = [[-4, 1], [-1, 1], [-3, 3]] as Pt[];
const t38v: Pt = [5, -3];
const t38Img = map(translate(t38v), t38);
const p38 = card("11.3", "practice",
  new Diagram()
    .grid(-5, 5, -3, 4)
    .poly(t38, "object", ["A", "B", "C"])
    .point(t38Img[0], "A′", "image", [1, -1])
    .build(TRANSLATION, T("Triangle ABC and the image A′ of vertex A only.", "Segi tiga ABC dan imej A′ bagi bucu A sahaja.")),
  {
    prompt: "Triangle ABC is translated so that A moves to A′. Find the coordinates of B′ and C′.",
    answer: [[`A${coord(t38[0])} → A′${coord(t38Img[0])}: the translation is ${vec(t38v)}.`, `B′ = ${coord(t38Img[1])}, C′ = ${coord(t38Img[2])}.`]],
  },
  {
    prompt: "Segi tiga ABC ditranslasikan supaya A bergerak ke A′. Cari koordinat B′ dan C′.",
    answer: [[`A${coord(t38[0])} → A′${coord(t38Img[0])}: translasinya ialah ${vec(t38v)}.`, `B′ = ${coord(t38Img[1])}, C′ = ${coord(t38Img[2])}.`]],
  },
  [coord(t38Img[1]), coord(t38Img[2]), vec(t38v)],
);

const t39P: Pt = [1, 1], t39a: Pt = [3, 2], t39b: Pt = [-5, 1];
const t39mid = translate(t39a)(t39P), t39end = translate(t39b)(t39mid);
const p39 = card("11.3", "practice", null,
  {
    prompt: `Point P${coord(t39P)} is translated by ${vec(t39a)} and then by ${vec(t39b)}. Find the final image, and the single translation that has the same effect.`,
    answer: [[`${coord(t39P)} → ${coord(t39mid)} → ${coord(t39end)}.`, `Single translation: (3 + (−5), 2 + 1) = ${vec(vectorBetween(t39P, t39end))}.`]],
  },
  {
    prompt: `Titik P${coord(t39P)} ditranslasikan oleh ${vec(t39a)} dan kemudian oleh ${vec(t39b)}. Cari imej akhir, dan satu translasi tunggal yang memberikan kesan yang sama.`,
    answer: [[`${coord(t39P)} → ${coord(t39mid)} → ${coord(t39end)}.`, `Translasi tunggal: (3 + (−5), 2 + 1) = ${vec(vectorBetween(t39P, t39end))}.`]],
  },
);

const FLAG40: Pt[] = [[0, 0], [0.5, 0], [0.5, 1.8], [2, 2.4], [0.5, 3], [0, 3]];
const flipped = FLAG40.map(([x, y]): Pt => [2 - x, y]);
const upsideDown = FLAG40.map(([x, y]): Pt => [2 - x, 3 - y]);
// Two rows of two; each letter sits centred under its flag.
const p40flags: Array<[string, Pt[], "object" | "image"]> = [
  ["A", shift(FLAG40, [1, 5]), "object"],
  ["B", shift(flipped, [5, 5]), "image"],
  ["C", shift(upsideDown, [1, 1]), "image"],
  ["D", shift(FLAG40, [5, 1]), "image"],
];
const p40d = new Diagram().grid(0, 8, 0, 8, false);
for (const [name, pts, role] of p40flags) p40d.poly(pts, role).text([Math.min(...pts.map(p => p[0])) + 1, Math.min(...pts.map(p => p[1]))], name, 0, 13, undefined, role);
const p40 = card("11.3", "practice",
  p40d.build(TRANSLATION, T("Four flags A, B, C and D on a square grid; they differ in which way they face.", "Empat bendera A, B, C dan D pada grid segi empat sama; arah hadapannya berbeza.")),
  {
    prompt: "Which of the flags B, C or D is the image of flag A under a translation? Explain why the other two are not.",
    answer: [["D: it faces the same way as A and is the same size.", "B is flipped (a reflection) and C is turned upside down (a rotation)."]],
  },
  {
    prompt: "Antara bendera B, C dan D, yang manakah imej bendera A di bawah suatu translasi? Terangkan mengapa dua yang lain bukan imejnya.",
    answer: [["D: ia menghadap arah yang sama dengan A dan saiznya sama.", "B diterbalikkan (pantulan) dan C terbalik ke bawah (putaran)."]],
  },
);

const ch41S: Pt = [-2, -1], ch41a: Pt = [3, 1], ch41b: Pt = [-1, 4], ch41C: Pt = [0, 4];
const ch41mid = translate(ch41a)(ch41S), ch41end = translate(ch41b)(ch41mid);
const ch41 = card("11.3", "challenge",
  new Diagram()
    .grid(-3, 2, -2, 5)
    .point(ch41S, "S", "object", [-1, -1])
    .point(ch41C, "C", "image", [1, 1])
    .build(TRANSLATION, T("The robot's start S(−2, −1) and the charging station C(0, 4).", "Kedudukan mula robot S(−2, −1) dan stesen pengecasan C(0, 4).")),
  {
    prompt: `A robot starts at S${coord(ch41S)}. It makes two moves: the translation ${vec(ch41a)}, then the translation ${vec(ch41b)}. A charging station is at C${coord(ch41C)}.`,
    parts: [
      "Find the robot's position after the first move.",
      "Find its position after the second move. Does it reach the charging station?",
      "Write the single translation that takes the robot from S directly to C.",
    ],
    answer: [
      [`(−2 + 3, −1 + 1) = ${coord(ch41mid)}.`],
      [`(1 + (−1), 0 + 4) = ${coord(ch41end)}.`, "Yes, it reaches C."],
      [`From S${coord(ch41S)} to C${coord(ch41C)}: (0 − (−2), 4 − (−1)) = ${vec(vectorBetween(ch41S, ch41C))}.`],
    ],
  },
  {
    prompt: `Sebuah robot bermula di S${coord(ch41S)}. Robot itu membuat dua gerakan: translasi ${vec(ch41a)}, kemudian translasi ${vec(ch41b)}. Sebuah stesen pengecasan berada di C${coord(ch41C)}.`,
    parts: [
      "Cari kedudukan robot selepas gerakan pertama.",
      "Cari kedudukannya selepas gerakan kedua. Adakah robot itu sampai ke stesen pengecasan?",
      "Tulis translasi tunggal yang membawa robot itu terus dari S ke C.",
    ],
    answer: [
      [`(−2 + 3, −1 + 1) = ${coord(ch41mid)}.`],
      [`(1 + (−1), 0 + 4) = ${coord(ch41end)}.`, "Ya, robot itu sampai ke C."],
      [`Dari S${coord(ch41S)} ke C${coord(ch41C)}: (0 − (−2), 4 − (−1)) = ${vec(vectorBetween(ch41S, ch41C))}.`],
    ],
  },
  [coord(ch41mid), vec(vectorBetween(ch41S, ch41C))],
);

const ch42P: Pt = [2, -1], ch42Img: Pt = [-1, 3];
const ch42v = vectorBetween(ch42P, ch42Img);
const ch42Q: Pt = [0, 2], ch42R1: Pt = [4, 4];
const ch42 = card("11.3", "challenge",
  new Diagram()
    .grid(-2, 3, -2, 4)
    .arrow(ch42P, ch42Img, "other")
    .point(ch42P, "P", "object", [1, -1])
    .point(ch42Img, "P′", "image", [-1, 1])
    .build(TRANSLATION, T("Point P(2, −1) and its image P′(−1, 3), joined by an unlabelled arrow.", "Titik P(2, −1) dan imejnya P′(−1, 3), disambung oleh anak panah tanpa label.")),
  {
    prompt: `The translation (h, k) maps P${coord(ch42P)} to P′${coord(ch42Img)}.`,
    parts: ["Find the values of h and k.", `Find the image of Q${coord(ch42Q)} under the same translation.`, `The point R′${coord(ch42R1)} is the image of R under this translation. Find R.`],
    answer: [
      [`h = −1 − 2 = ${num(ch42v[0])}, k = 3 − (−1) = ${num(ch42v[1])}.`, `Translation ${vec(ch42v)}.`],
      [`Q′ = ${coord(translate(ch42v)(ch42Q))}.`],
      ["Subtract the vector from the image.", `R = (4 − (−3), 4 − 4) = ${coord(translate([-ch42v[0], -ch42v[1]])(ch42R1))}.`],
    ],
  },
  {
    prompt: `Translasi (h, k) memetakan P${coord(ch42P)} kepada P′${coord(ch42Img)}.`,
    parts: ["Cari nilai h dan k.", `Cari imej Q${coord(ch42Q)} di bawah translasi yang sama.`, `Titik R′${coord(ch42R1)} ialah imej R di bawah translasi ini. Cari R.`],
    answer: [
      [`h = −1 − 2 = ${num(ch42v[0])}, k = 3 − (−1) = ${num(ch42v[1])}.`, `Translasi ${vec(ch42v)}.`],
      [`Q′ = ${coord(translate(ch42v)(ch42Q))}.`],
      ["Tolak vektor daripada imej.", `R = (4 − (−3), 4 − 4) = ${coord(translate([-ch42v[0], -ch42v[1]])(ch42R1))}.`],
    ],
  },
  [vec(ch42v), coord(translate(ch42v)(ch42Q))],
);

const TILE: Pt[] = [[0, 0], [3, 0], [4, 2], [1, 2]];
const ch43 = card("11.3", "challenge",
  new Diagram()
    .grid(0, 10, 0, 3)
    .poly(TILE, "object")
    .poly(shift(TILE, [3, 0]), "image")
    .poly(shift(TILE, [6, 0]), "image")
    .text(centroid(TILE), "T1", 0, 4)
    .text(centroid(shift(TILE, [3, 0])), "T2", 0, 4, undefined, "image")
    .text(centroid(shift(TILE, [6, 0])), "T3", 0, 4, undefined, "image")
    .build(TRANSLATION, T("A row of three parallelogram floor tiles T1, T2 and T3 on a Cartesian plane; T1 has vertices (0, 0), (3, 0), (4, 2) and (1, 2).", "Sebaris tiga jubin lantai segi empat selari T1, T2 dan T3 pada satah Cartes; T1 mempunyai bucu (0, 0), (3, 0), (4, 2) dan (1, 2).")),
  {
    prompt: "Floor tiles are laid by translating tile T1, which has vertices (0, 0), (3, 0), (4, 2) and (1, 2).",
    parts: [
      "Write the translation that maps T1 onto T2.",
      "Tile T4 continues the row. Find the image of the vertex (4, 2) of T1 on tile T4.",
      "A tile in the next row is the image of T1 under the translation (1, 2). Find its four vertices and explain why it fits exactly on top of T1.",
    ],
    answer: [
      ["Each vertex moves 3 units right: translation (3, 0)."],
      ["T4 is three steps of (3, 0) from T1: (9, 0) in total.", `(4, 2) → ${coord(translate([9, 0])([4, 2]))}.`],
      [`${map(translate([1, 2]), TILE).map(coord).join(", ")}.`, "Its bottom edge from (1, 2) to (4, 2) is exactly the top edge of T1, and a translation keeps the tile congruent, so there is no gap or overlap."],
    ],
  },
  {
    prompt: "Jubin lantai dipasang dengan mentranslasikan jubin T1 yang mempunyai bucu (0, 0), (3, 0), (4, 2) dan (1, 2).",
    parts: [
      "Tulis translasi yang memetakan T1 kepada T2.",
      "Jubin T4 menyambung baris itu. Cari imej bucu (4, 2) bagi T1 pada jubin T4.",
      "Sekeping jubin pada baris seterusnya ialah imej T1 di bawah translasi (1, 2). Cari empat bucunya dan terangkan mengapa jubin itu muat tepat di atas T1.",
    ],
    answer: [
      ["Setiap bucu bergerak 3 unit ke kanan: translasi (3, 0)."],
      ["T4 berada tiga langkah (3, 0) dari T1: jumlahnya (9, 0).", `(4, 2) → ${coord(translate([9, 0])([4, 2]))}.`],
      [`${map(translate([1, 2]), TILE).map(coord).join(", ")}.`, "Sisi bawahnya dari (1, 2) ke (4, 2) ialah sisi atas T1, dan translasi mengekalkan jubin kongruen, maka tiada ruang atau pertindihan."],
    ],
  },
  ["(3, 0)", coord(translate([9, 0])([4, 2]))],
);

const ch44P: Pt = [2, 1], ch44v: Pt = [-3, 2];
const ch44a = translate(ch44v)(ch44P), ch44b = reflectInY(0)(ch44a);
const ch44alt = translate(ch44v)(reflectInY(0)(ch44P));
const ch44 = card("11.3", "challenge",
  new Diagram()
    .grid(-3, 3, -4, 4)
    .point(ch44P, "P", "object", [1, 1])
    .build(TRANSLATION, T("Point P(2, 1) on a Cartesian plane.", "Titik P(2, 1) pada satah Cartes.")),
  {
    prompt: `Point P${coord(ch44P)} is translated by ${vec(ch44v)}, and the image is then reflected in the x-axis.`,
    parts: ["Find the image after the translation.", "Find the final image after the reflection.", "If the reflection is done first and then the translation, is the final image the same? Show your working."],
    answer: [
      [`(2 − 3, 1 + 2) = ${coord(ch44a)}.`],
      [`Reflection in the x-axis: ${coord(ch44a)} → ${coord(ch44b)}.`],
      [`Reflect first: ${coord(ch44P)} → ${coord(reflectInY(0)(ch44P))}; then translate: ${coord(ch44alt)}.`, `${coord(ch44alt)} ≠ ${coord(ch44b)}, so the order of the transformations matters.`],
    ],
  },
  {
    prompt: `Titik P${coord(ch44P)} ditranslasikan oleh ${vec(ch44v)}, dan imej itu kemudian dipantulkan pada paksi-x.`,
    parts: ["Cari imej selepas translasi.", "Cari imej akhir selepas pantulan.", "Jika pantulan dilakukan dahulu dan kemudian translasi, adakah imej akhirnya sama? Tunjukkan jalan kerja anda."],
    answer: [
      [`(2 − 3, 1 + 2) = ${coord(ch44a)}.`],
      [`Pantulan pada paksi-x: ${coord(ch44a)} → ${coord(ch44b)}.`],
      [`Pantul dahulu: ${coord(ch44P)} → ${coord(reflectInY(0)(ch44P))}; kemudian translasi: ${coord(ch44alt)}.`, `${coord(ch44alt)} ≠ ${coord(ch44b)}, maka urutan penjelmaan mempengaruhi imej.`],
    ],
  },
  [coord(ch44a), coord(ch44b), coord(ch44alt)],
);

// ═══ 11.4 Congruence ═══════════════════════════════════════════════════════

const TRI345: Pt[] = [[0, 0], [4, 0], [0, 3]];
const TRI345b = map(([x, y]) => [9.5 - y, x] as Pt, TRI345);
const c45 = card("11.4", "concept",
  new Diagram()
    .poly(TRI345, "object")
    .sides(TRI345, ["4 cm", "5 cm", "3 cm"])
    .poly(TRI345b, "image")
    .sides(TRI345b, ["4 cm", "5 cm", "3 cm"], "image")
    .text(centroid(TRI345), "P", -3, 4)
    .text(centroid(TRI345b), "Q", 3, 4, undefined, "image")
    .build(CONGRUENCE, T("Right-angled triangles P and Q, each with sides 3 cm, 4 cm and 5 cm; Q is turned.", "Segi tiga bersudut tegak P dan Q, setiap satu dengan sisi 3 cm, 4 cm dan 5 cm; Q dipusingkan."), { measured: true }),
  {
    prompt: "What does it mean for two shapes to be congruent? Use triangles P and Q to explain.",
    answer: [["Congruent shapes have the same shape and size: all corresponding sides and all corresponding angles are equal.", "P and Q both have sides 3 cm, 4 cm and 5 cm, so they are congruent even though Q is turned."]],
  },
  {
    prompt: "Apakah maksud dua bentuk yang kongruen? Gunakan segi tiga P dan Q untuk menerangkan.",
    answer: [["Bentuk kongruen mempunyai bentuk dan saiz yang sama: semua sisi sepadan dan semua sudut sepadan adalah sama.", "P dan Q kedua-duanya mempunyai sisi 3 cm, 4 cm dan 5 cm, maka kedua-duanya kongruen walaupun Q dipusingkan."]],
  },
);

const c46 = card("11.4", "concept", null,
  {
    prompt: "Do reflections, rotations and translations always produce an image that is congruent to the object? Why?",
    answer: [["Yes. All three are isometric transformations: they preserve every length and every angle.", "Only the position (and, for a reflection or rotation, the orientation) changes."]],
  },
  {
    prompt: "Adakah pantulan, putaran dan translasi sentiasa menghasilkan imej yang kongruen dengan objek? Mengapa?",
    answer: [["Ya. Ketiga-tiganya ialah penjelmaan isometri: semua panjang dan semua sudut dikekalkan.", "Hanya kedudukan (dan, bagi pantulan atau putaran, orientasi) yang berubah."]],
  },
);

const RECT_X: Pt[] = [[0, 0], [6, 0], [6, 2], [0, 2]];
const RECT_Y: Pt[] = [[9.5, 0], [13.5, 0], [13.5, 3], [9.5, 3]];
const c47 = card("11.4", "concept",
  new Diagram()
    .poly(RECT_X, "object")
    .sides(RECT_X, ["6 cm", "2 cm", undefined, undefined])
    .poly(RECT_Y, "image")
    .sides(RECT_Y, ["4 cm", "3 cm", undefined, undefined], "image")
    .text(centroid(RECT_X), "X", 0, 4)
    .text(centroid(RECT_Y), "Y", 0, 4, undefined, "image")
    .build(CONGRUENCE, T("Rectangle X, 6 cm by 2 cm, and rectangle Y, 4 cm by 3 cm.", "Segi empat tepat X, 6 cm kali 2 cm, dan segi empat tepat Y, 4 cm kali 3 cm."), { measured: true }),
  {
    prompt: "Rectangles X and Y have the same area. Are they congruent? Explain.",
    answer: [["Areas: 6 × 2 = 12 cm² and 4 × 3 = 12 cm².", "They are not congruent: their corresponding sides are different (6 cm ≠ 4 cm), even though the areas are equal."]],
  },
  {
    prompt: "Segi empat tepat X dan Y mempunyai luas yang sama. Adakah kedua-duanya kongruen? Terangkan.",
    answer: [["Luas: 6 × 2 = 12 cm² dan 4 × 3 = 12 cm².", "Kedua-duanya tidak kongruen: sisi sepadannya berbeza (6 cm ≠ 4 cm), walaupun luasnya sama."]],
  },
);

/** Triangle with base 0→c on the x-axis and the other sides a (from the far end) and b (from the origin). */
const triangleFromSides = (a: number, b: number, c: number): Pt[] => {
  const x = (b * b - a * a + c * c) / (2 * c);
  return [[0, 0], [c, 0], [x, Math.sqrt(b * b - x * x)]];
};
const K579 = triangleFromSides(7, 5, 9).map(([x, y]): Pt => [x * 0.5, y * 0.5]);
const L579 = map(([x, y]) => rotate(90, "acw")([x, y]), K579).map(([x, y]): Pt => [x + 7.5, y + 0.2]);
const p48 = card("11.4", "practice",
  new Diagram()
    .poly(K579, "object")
    .sides(K579, ["9 cm", "7 cm", "5 cm"])
    .poly(L579, "image")
    .sides(L579, ["9 cm", "7 cm", "5 cm"], "image")
    .text(centroid(K579), "K", 0, 4)
    .text(centroid(L579), "L", 0, 4, undefined, "image")
    .build(CONGRUENCE, T("Triangle K with sides 5 cm, 7 cm and 9 cm, and triangle L, turned, with sides 9 cm, 7 cm and 5 cm.", "Segi tiga K dengan sisi 5 cm, 7 cm dan 9 cm, dan segi tiga L yang dipusingkan dengan sisi 9 cm, 7 cm dan 5 cm."), { measured: true }),
  {
    prompt: "Are triangles K and L congruent? Give a reason.",
    answer: [["K has sides 5 cm, 7 cm and 9 cm; L has sides 9 cm, 7 cm and 5 cm.", "All three pairs of corresponding sides are equal, so K and L are congruent; L is only turned."]],
  },
  {
    prompt: "Adakah segi tiga K dan L kongruen? Berikan sebab.",
    answer: [["K mempunyai sisi 5 cm, 7 cm dan 9 cm; L mempunyai sisi 9 cm, 7 cm dan 5 cm.", "Ketiga-tiga pasangan sisi sepadan adalah sama, maka K dan L kongruen; L hanya dipusingkan."]],
  },
);

const RECT_R: Pt[] = [[0, 0], [5, 0], [5, 3], [0, 3]];
const par = (s: number, a: number): Pt[] => {
  const [dx, dy] = [s * Math.cos((a * Math.PI) / 180), s * Math.sin((a * Math.PI) / 180)];
  return [[7, 0], [12, 0], [12 + dx, dy], [7 + dx, dy]];
};
const PAR_S = par(3, 60);
const p49 = card("11.4", "practice",
  new Diagram()
    .poly(RECT_R, "object")
    .sides(RECT_R, ["5 cm", undefined, undefined, "3 cm"])
    .right(RECT_R[0], RECT_R[1], RECT_R[3])
    .poly(PAR_S, "image")
    .sides(PAR_S, ["5 cm", "3 cm", undefined, undefined], "image")
    .angle(PAR_S[0], PAR_S[1], PAR_S[3], "60°", "image")
    .text(centroid(RECT_R), "R", 0, 4)
    .text(centroid(PAR_S), "S", 0, 4, undefined, "image")
    .build(CONGRUENCE, T("Rectangle R, 5 cm by 3 cm with a right angle, and parallelogram S with sides 5 cm and 3 cm and an angle of 60°.", "Segi empat tepat R, 5 cm kali 3 cm dengan sudut tegak, dan segi empat selari S dengan sisi 5 cm dan 3 cm serta sudut 60°."), { measured: true }),
  {
    prompt: "Rectangle R and parallelogram S both have sides of 5 cm and 3 cm. Are they congruent? Explain.",
    answer: [["No.", "Their sides match, but their angles do not: R has 90° angles, while S has angles of 60° and 120°.", "Congruent shapes need equal corresponding angles as well as equal sides."]],
  },
  {
    prompt: "Segi empat tepat R dan segi empat selari S kedua-duanya mempunyai sisi 5 cm dan 3 cm. Adakah kedua-duanya kongruen? Terangkan.",
    answer: [["Tidak.", "Sisinya sepadan, tetapi sudutnya tidak: R mempunyai sudut 90°, manakala S mempunyai sudut 60° dan 120°.", "Bentuk kongruen memerlukan sudut sepadan yang sama dan juga sisi yang sama."]],
  },
);

const ABC50: Pt[] = [[0, 0], [4, 0], [1, 3]];
const PQR50 = ABC50.map(([x, y]): Pt => [10.5 - x, y]); // A ↦ R, B ↦ P, C ↦ Q
const p50 = card("11.4", "practice",
  new Diagram()
    .poly(ABC50, "object", ["A", "B", "C"])
    .ticks(ABC50[0], ABC50[1], 1).ticks(ABC50[1], ABC50[2], 2).ticks(ABC50[2], ABC50[0], 3)
    .poly(PQR50, "image", ["R", "P", "Q"])
    .ticks(PQR50[0], PQR50[1], 1, "image").ticks(PQR50[1], PQR50[2], 2, "image").ticks(PQR50[2], PQR50[0], 3, "image")
    .build(CONGRUENCE, T("Triangles ABC and PQR; equal sides carry 1, 2 or 3 tick marks.", "Segi tiga ABC dan PQR; sisi yang sama bertanda 1, 2 atau 3 garis kecil.")),
  {
    prompt: "Triangles ABC and PQR are congruent; equal sides carry the same number of tick marks. Which vertex of PQR corresponds to A, and which side corresponds to BC?",
    answer: [["A lies between the sides with 1 and 3 ticks; in PQR that vertex is R, so A ↔ R.", "BC has 2 ticks, so BC ↔ PQ."]],
  },
  {
    prompt: "Segi tiga ABC dan PQR adalah kongruen; sisi yang sama mempunyai bilangan tanda garis kecil yang sama. Bucu PQR yang manakah sepadan dengan A, dan sisi yang manakah sepadan dengan BC?",
    answer: [["A terletak di antara sisi bertanda 1 dan 3 garis; dalam PQR bucu itu ialah R, maka A ↔ R.", "BC bertanda 2 garis, maka BC ↔ PQ."]],
  },
);

const ABC51 = triangleFromSides(8, 7, 6).map(([x, y]): Pt => [x * 0.45, y * 0.45]);
const XYZ51 = map(rotate(90, "cw"), ABC51).map(([x, y]): Pt => [x + 5, y + 3.6]);
const p51 = card("11.4", "practice",
  new Diagram()
    .poly(ABC51, "object", ["A", "B", "C"])
    .sides(ABC51, ["6 cm", "8 cm", "7 cm"])
    .poly(XYZ51, "image", ["X", "Y", "Z"])
    .sides(XYZ51, [undefined, "?", undefined], "image")
    .build(CONGRUENCE, T("Triangle ABC with AB = 6 cm, BC = 8 cm and CA = 7 cm, and a turned triangle XYZ with side YZ marked ?.", "Segi tiga ABC dengan AB = 6 cm, BC = 8 cm dan CA = 7 cm, dan segi tiga XYZ yang dipusingkan dengan sisi YZ bertanda ?."), { measured: true }),
  {
    prompt: "Triangle ABC is congruent to triangle XYZ, with A ↔ X, B ↔ Y and C ↔ Z. Find the lengths of YZ and XZ.",
    answer: [["YZ corresponds to BC, so YZ = 8 cm.", "XZ corresponds to AC, so XZ = 7 cm."]],
  },
  {
    prompt: "Segi tiga ABC kongruen dengan segi tiga XYZ, dengan A ↔ X, B ↔ Y dan C ↔ Z. Cari panjang YZ dan XZ.",
    answer: [["YZ sepadan dengan BC, maka YZ = 8 cm.", "XZ sepadan dengan AC, maka XZ = 7 cm."]],
  },
);

/** Triangle with base angles a (at the origin) and b (at (c, 0)). */
const triangleFromAngles = (a: number, b: number, c: number): Pt[] => {
  const [ta, tb] = [Math.tan((a * Math.PI) / 180), Math.tan((b * Math.PI) / 180)];
  const x = (c * tb) / (ta + tb);
  return [[0, 0], [c, 0], [x, x * ta]];
};
const DEF52 = triangleFromAngles(40, 65, 5);
const KLM52 = DEF52.map(([x, y]): Pt => [13.5 - x, y]);
const p52 = card("11.4", "practice",
  new Diagram()
    .poly(DEF52, "object", ["D", "E", "F"])
    .angle(DEF52[0], DEF52[1], DEF52[2], "40°")
    .angle(DEF52[1], DEF52[2], DEF52[0], "65°")
    .poly(KLM52, "image", ["K", "L", "M"])
    .angle(KLM52[2], KLM52[0], KLM52[1], "?", "image")
    .build(CONGRUENCE, T("Triangle DEF with ∠D = 40° and ∠E = 65°, and its mirror-image triangle KLM with ∠M marked ?.", "Segi tiga DEF dengan ∠D = 40° dan ∠E = 65°, dan segi tiga KLM yang tersongsang dengan ∠M bertanda ?."), { measured: true }),
  {
    prompt: "Triangle DEF is congruent to triangle KLM, with D ↔ K, E ↔ L and F ↔ M. Find ∠M.",
    answer: [["∠F = 180° − 40° − 65° = 75°.", "∠M corresponds to ∠F, so ∠M = 75°."]],
  },
  {
    prompt: "Segi tiga DEF kongruen dengan segi tiga KLM, dengan D ↔ K, E ↔ L dan F ↔ M. Cari ∠M.",
    answer: [["∠F = 180° − 40° − 65° = 75°.", "∠M sepadan dengan ∠F, maka ∠M = 75°."]],
  },
  ["75°"],
);

const Q53: Pt[] = [[1, 1], [4, 1], [3, 3], [1, 4]];
const Q53img = map(reflectInX(5.5), Q53);
const p53 = card("11.4", "practice",
  new Diagram()
    .grid(0, 11, 0, 5, false)
    .poly(Q53, "object", ["A", "B", "C", "D"])
    .poly(Q53img, "image", ["A′", "B′", "C′", "D′"])
    .build(CONGRUENCE, T("Quadrilateral ABCD and its congruent image A′B′C′D′ on a square grid; the transformation is not shown.", "Sisi empat ABCD dan imejnya yang kongruen A′B′C′D′ pada grid segi empat sama; penjelmaan tidak ditunjukkan.")),
  {
    prompt: "Quadrilateral A′B′C′D′ is the image of ABCD under one isometric transformation. Going A → B → C → D is anticlockwise, but A′ → B′ → C′ → D′ is clockwise. Which transformation could it be? Explain.",
    answer: [["A reflection: only a reflection reverses the order (orientation) of the vertices.", "Rotations and translations keep the vertices in the same order."]],
  },
  {
    prompt: "Sisi empat A′B′C′D′ ialah imej ABCD di bawah satu penjelmaan isometri. Urutan A → B → C → D adalah lawan arah jam, tetapi A′ → B′ → C′ → D′ adalah ikut arah jam. Apakah penjelmaan itu? Terangkan.",
    answer: [["Pantulan: hanya pantulan menyongsangkan urutan (orientasi) bucu.", "Putaran dan translasi mengekalkan urutan bucu yang sama."]],
  },
);

const E54base: Pt[] = [[0, 0], [3, 0], [3, 1], [1, 1], [1, 2], [0, 2]];
const E54 = shift(E54base, [1, 6]);
const P54 = E54base.map(([x, y]): Pt => [x * 2 + 5, y * 2 + 5]);
const Q54 = shift(map(rotate(90, "acw"), E54base), [3, 1]);
const R54: Pt[] = [[6, 1], [10, 1], [10, 2], [7, 2], [7, 3], [6, 3]];
const under = (pts: Pt[]): Pt => [(Math.min(...pts.map(p => p[0])) + Math.max(...pts.map(p => p[0]))) / 2, Math.min(...pts.map(p => p[1]))];
const p54d = new Diagram().grid(0, 12, 0, 10, false)
  .poly(E54, "object").text(under(E54), "E", 0, 13)
  .poly(P54, "image").text(under(P54), "P", 0, 13, undefined, "image")
  .poly(Q54, "image").text(under(Q54), "Q", 0, 13, undefined, "image")
  .poly(R54, "image").text(under(R54), "R", 0, 13, undefined, "image");
const p54 = card("11.4", "practice",
  p54d.build(CONGRUENCE, T("Shape E, an L-shape, beside shapes P, Q and R on a square grid.", "Bentuk E, iaitu bentuk L, di sebelah bentuk P, Q dan R pada grid segi empat sama.")),
  {
    prompt: "Which of the shapes P, Q or R is congruent to shape E? Explain using the grid.",
    answer: [["Q: it is E turned through 90°, and every side has the same length as in E.", "P has every side doubled, and R has a longer arm (4 units instead of 3), so neither is congruent to E."]],
  },
  {
    prompt: "Antara bentuk P, Q dan R, yang manakah kongruen dengan bentuk E? Terangkan menggunakan grid.",
    answer: [["Q: ia ialah E yang dipusingkan 90°, dan setiap sisinya sama panjang dengan sisi E.", "Setiap sisi P digandakan, dan R mempunyai lengan yang lebih panjang (4 unit, bukan 3), maka kedua-duanya tidak kongruen dengan E."]],
  },
);

const T55: Pt[] = [[0, 0], [3, 0], [0, 4]];
const p55 = card("11.4", "practice",
  new Diagram()
    .grid(-1, 4, -1, 5)
    .poly(T55, "object", ["A", "B", "C"])
    .build(CONGRUENCE, T("Right-angled triangle ABC with A(0, 0), B(3, 0) and C(0, 4).", "Segi tiga bersudut tegak ABC dengan A(0, 0), B(3, 0) dan C(0, 4).")),
  {
    prompt: "Triangle ABC with A(0, 0), B(3, 0) and C(0, 4) is translated by (2, 1). Find the length of B′C′ without finding B′ and C′ first.",
    answer: [["BC = √(3² + 4²) = √25 = 5 units.", "A translation preserves length, so B′C′ = 5 units."]],
  },
  {
    prompt: "Segi tiga ABC dengan A(0, 0), B(3, 0) dan C(0, 4) ditranslasikan oleh (2, 1). Cari panjang B′C′ tanpa mencari B′ dan C′ terlebih dahulu.",
    answer: [["BC = √(3² + 4²) = √25 = 5 unit.", "Translasi mengekalkan panjang, maka B′C′ = 5 unit."]],
  },
  ["5"],
);

const ABC56: Pt[] = [[1, 1], [4, 1], [1, 3]];
const PQR56 = map(rotate(90, "acw"), ABC56);
const ch56 = card("11.4", "challenge",
  new Diagram()
    .grid(-4, 5, 0, 5)
    .poly(ABC56, "object", ["A", "B", "C"])
    .poly(PQR56, "image", ["P", "Q", "R"])
    .build(CONGRUENCE, T("Triangle ABC in the first quadrant and triangle PQR in the second quadrant.", "Segi tiga ABC dalam sukuan pertama dan segi tiga PQR dalam sukuan kedua.")),
  {
    prompt: "The diagram shows triangles ABC and PQR on a Cartesian plane.",
    parts: [
      "Use the grid to find the lengths AB, AC, PQ and PR.",
      "Explain why triangles ABC and PQR are congruent, and name the vertex of PQR that corresponds to B.",
      "Describe fully a single transformation that maps triangle ABC onto triangle PQR.",
    ],
    answer: [
      ["AB = 3 units, AC = 2 units.", "PQ = 3 units, PR = 2 units."],
      ["Each triangle has a right angle between sides of 3 and 2 units, so all corresponding sides and angles are equal: they are congruent.", "B ↔ Q."],
      ["A rotation of 90° anticlockwise about the origin O."],
    ],
  },
  {
    prompt: "Rajah menunjukkan segi tiga ABC dan PQR pada satah Cartes.",
    parts: [
      "Gunakan grid untuk mencari panjang AB, AC, PQ dan PR.",
      "Terangkan mengapa segi tiga ABC dan PQR kongruen, dan namakan bucu PQR yang sepadan dengan B.",
      "Huraikan selengkapnya satu penjelmaan tunggal yang memetakan segi tiga ABC kepada segi tiga PQR.",
    ],
    answer: [
      ["AB = 3 unit, AC = 2 unit.", "PQ = 3 unit, PR = 2 unit."],
      ["Setiap segi tiga mempunyai sudut tegak di antara sisi 3 unit dan 2 unit, maka semua sisi dan sudut sepadan adalah sama: kedua-duanya kongruen.", "B ↔ Q."],
      ["Putaran 90° lawan arah jam pada asalan O."],
    ],
  },
);

// Kite with ∠A = 110°, ∠C = 50°, so ∠B = ∠D = 100°; AB = 3 cm.
const kite = (() => {
  const halfA = 55, halfC = 25, ab = 3;
  const B: Pt = [ab * Math.cos((halfA * Math.PI) / 180), ab * Math.sin((halfA * Math.PI) / 180)];
  const C: Pt = [B[0] + B[1] / Math.tan((halfC * Math.PI) / 180), 0];
  return [[0, 0], B, C, [B[0], -B[1]]] as Pt[];
})();
const kite2 = map(rotate(90, "acw"), kite).map(([x, y]): Pt => [x + 12, y - 3.2]);
const ch57 = card("11.4", "challenge",
  new Diagram()
    .poly(kite, "object", ["A", "B", "C", "D"])
    .angle(kite[0], kite[1], kite[3], "110°")
    .angle(kite[2], kite[1], kite[3], "50°")
    .sides(kite, ["3 cm", undefined, undefined, undefined])
    .poly(kite2, "image", ["P", "Q", "R", "S"])
    .angle(kite2[1], kite2[0], kite2[2], "?", "image")
    .build(CONGRUENCE, T("Kite ABCD with ∠A = 110°, ∠C = 50° and AB = 3 cm, and a congruent kite PQRS, turned, with ∠Q marked ?.", "Layang-layang ABCD dengan ∠A = 110°, ∠C = 50° dan AB = 3 cm, dan layang-layang PQRS yang kongruen dan dipusingkan dengan ∠Q bertanda ?."), { measured: true }),
  {
    prompt: "Kites ABCD and PQRS are congruent, with A ↔ P, B ↔ Q, C ↔ R and D ↔ S. In kite ABCD, ∠A = 110°, ∠C = 50° and AB = 3 cm.",
    parts: ["Find ∠B.", "Find ∠Q in kite PQRS.", "Find the length of PQ and explain how you know."],
    answer: [
      ["In a kite ∠B = ∠D: (360° − 110° − 50°) ÷ 2 = 100°."],
      ["∠Q corresponds to ∠B, so ∠Q = 100°."],
      ["PQ corresponds to AB, so PQ = 3 cm.", "Corresponding sides of congruent shapes are equal."],
    ],
  },
  {
    prompt: "Layang-layang ABCD dan PQRS adalah kongruen, dengan A ↔ P, B ↔ Q, C ↔ R dan D ↔ S. Dalam layang-layang ABCD, ∠A = 110°, ∠C = 50° dan AB = 3 cm.",
    parts: ["Cari ∠B.", "Cari ∠Q dalam layang-layang PQRS.", "Cari panjang PQ dan terangkan bagaimana anda tahu."],
    answer: [
      ["Dalam layang-layang ∠B = ∠D: (360° − 110° − 50°) ÷ 2 = 100°."],
      ["∠Q sepadan dengan ∠B, maka ∠Q = 100°."],
      ["PQ sepadan dengan AB, maka PQ = 3 cm.", "Sisi sepadan bagi bentuk yang kongruen adalah sama."],
    ],
  },
  ["100°"],
);

const flagB58 = map(reflectInX(0), FLAG);
const ch58P: Pt = [1, 4];
const ch58final = rotate(180, "acw")(reflectInX(0)(ch58P));
const ch58 = card("11.4", "challenge",
  new Diagram()
    .grid(-4, 4, -5, 5)
    .poly(FLAG, "object", ["", "", "", "", "P"])
    .poly(flagB58, "image")
    .text(centroid(FLAG), "A", 9, 22)
    .text(centroid(flagB58), "B", -9, 22, undefined, "image")
    .build(CONGRUENCE, T("Flag A in the first quadrant with vertex P(1, 4), and flag B, its reflection in the y-axis; flag C is not drawn.", "Bendera A dalam sukuan pertama dengan bucu P(1, 4), dan bendera B, pantulannya pada paksi-y; bendera C tidak dilukis.")),
  {
    prompt: "Flag A is reflected in the y-axis to give flag B. Flag B is then rotated 180° about the origin O to give flag C.",
    parts: [
      "Find the image of P(1, 4) on flag C.",
      "Is flag C congruent to flag A? Does it face the same way as A?",
      "Describe the single transformation that maps flag A directly onto flag C.",
    ],
    answer: [
      [`P(1, 4) → ${coord(reflectInX(0)(ch58P))} on B → ${coord(ch58final)} on C.`],
      ["Yes, C is congruent to A: both transformations preserve lengths and angles.", "No: C is laterally inverted compared with A, because it went through one reflection."],
      ["Every point follows (x, y) → (−x, y) → (x, −y).", "This is a reflection in the x-axis."],
    ],
  },
  {
    prompt: "Bendera A dipantulkan pada paksi-y untuk menghasilkan bendera B. Bendera B kemudian diputarkan 180° pada asalan O untuk menghasilkan bendera C.",
    parts: [
      "Cari imej P(1, 4) pada bendera C.",
      "Adakah bendera C kongruen dengan bendera A? Adakah ia menghadap arah yang sama dengan A?",
      "Huraikan penjelmaan tunggal yang memetakan bendera A terus kepada bendera C.",
    ],
    answer: [
      [`P(1, 4) → ${coord(reflectInX(0)(ch58P))} pada B → ${coord(ch58final)} pada C.`],
      ["Ya, C kongruen dengan A: kedua-dua penjelmaan mengekalkan panjang dan sudut.", "Tidak: C tersongsang sisi berbanding A, kerana ia melalui satu pantulan."],
      ["Setiap titik mengikut (x, y) → (−x, y) → (x, −y).", "Ini ialah pantulan pada paksi-x."],
    ],
  },
  [coord(ch58final)],
);

const TRI_X = triangleFromSides(4, 5, 3).map(([x, y]): Pt => [x * 0.9, y * 0.9]);
const TRI_Y = triangleFromSides(4, 4, 4).map(([x, y]): Pt => [x * 0.9 + 6.6, y * 0.9]);
const ch59 = card("11.4", "challenge",
  new Diagram()
    .poly(TRI_X, "object")
    .sides(TRI_X, ["3 cm", "4 cm", "5 cm"])
    .poly(TRI_Y, "image")
    .sides(TRI_Y, ["4 cm", "4 cm", "4 cm"], "image")
    .text(centroid(TRI_X), "X", 0, 4)
    .text(centroid(TRI_Y), "Y", 0, 4, undefined, "image")
    .build(CONGRUENCE, T("Triangle X with sides 3 cm, 4 cm and 5 cm, and triangle Y with three sides of 4 cm.", "Segi tiga X dengan sisi 3 cm, 4 cm dan 5 cm, dan segi tiga Y dengan tiga sisi 4 cm."), { measured: true }),
  {
    prompt: "Siti says triangles X and Y are congruent because they have the same perimeter.",
    parts: ["Find the perimeter of each triangle.", "Is Siti correct? Explain.", "State what must be true about the sides of two triangles for them to be congruent."],
    answer: [
      ["X: 3 + 4 + 5 = 12 cm.", "Y: 4 + 4 + 4 = 12 cm."],
      ["No. The perimeters are equal, but the sides are not: X has sides 3, 4 and 5 cm, while every side of Y is 4 cm."],
      ["All three pairs of corresponding sides must be equal (and then the corresponding angles are equal too)."],
    ],
  },
  {
    prompt: "Siti berkata segi tiga X dan Y kongruen kerana kedua-duanya mempunyai perimeter yang sama.",
    parts: ["Cari perimeter setiap segi tiga.", "Adakah Siti betul? Terangkan.", "Nyatakan syarat bagi sisi dua segi tiga supaya kedua-duanya kongruen."],
    answer: [
      ["X: 3 + 4 + 5 = 12 cm.", "Y: 4 + 4 + 4 = 12 cm."],
      ["Tidak. Perimeternya sama, tetapi sisinya tidak: X mempunyai sisi 3, 4 dan 5 cm, manakala setiap sisi Y ialah 4 cm."],
      ["Ketiga-tiga pasangan sisi sepadan mestilah sama (dan dengan itu sudut sepadan juga sama)."],
    ],
  },
  ["12 cm"],
);

/** Form 2 Maths Chapter 11: 60 bilingual cards, 12 concept / 32 practice / 16 challenge. */
export const MATH_F2_C11_BANK: readonly MathF2C11Entry[] = [
  c0, c1, c2, p3card, p4card, p5card, p6card, p7card, p8card, p9card, p10card, ch11card, ch12card, ch13card, ch14card,
  c15, c16, c17, p18, p19, p20, p21, p22, p23, p24, p25, ch26, ch27, ch28, ch29,
  c30, c31, c32, p33, p34, p35, p36, p37, p38, p39, p40, ch41, ch42, ch43, ch44,
  c45, c46, c47, p48, p49, p50, p51, p52, p53, p54, p55, ch56, ch57, ch58, ch59,
];
