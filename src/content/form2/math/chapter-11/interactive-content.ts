// Form 2 Mathematics, Chapter 11 — Isometric Transformations / Transformasi
// Isometri. The largest chapter: 6 official subtopics condensed into 5
// flowing sections (Transformations, Translation, Reflection, Rotation, and
// a combined Isometry/Rotational-Symmetry section).
// Interactive bilingual content. EN sourced from T2_BT_MAT_DLP_-_MATHEMATICS.pdf,
// BM sourced from T2_BT_MAT_-_MATEMATIK.pdf, cross-checked against
// design-reference/math2-chapter11-isometric-transformations-notes-v1.html.
// Content only — no presentation markup (rendered by MathF2Chapter11NotesBlock).
import type { WorkedStep } from "@/components/notes/blocks/StepsCard";
import type { Difficulty, PracticeQuestion } from "@/components/notes/blocks/DifficultyTabs";
import type { MindmapBranch } from "@/components/notes/blocks/ChapterSummaryMindmap";
import type { FormulaSheetEntry } from "@/components/notes/blocks/FormulaSheet";

export type MathF2C11Visual =
  | { kind: "transformCompare"; validLabel: string; invalidLabel: string }
  | { kind: "vectorArrow"; sidewaysLabel: string; upLabel: string; caption: string }
  | { kind: "mirror"; axisLabel: string; objectLabel: string; imageLabel: string; caption: string }
  | {
      kind: "rotation";
      centreLabel: string;
      objectLabel: string;
      imageLabel: string;
      caption: string;
    }
  | {
      kind: "rotationalSymmetry";
      startLabel: string;
      after1Label: string;
      after2Label: string;
      caption: string;
    };

export interface MathF2C11SubtopicContent {
  num: string;
  title: string;
  ideaParagraphs: string[];
  visual?: MathF2C11Visual;
  formula?: { eyebrow: string; formula: string; legend?: { label: string; text: string }[] };
  worked: { question: string; steps: WorkedStep[] };
  guided: { question: string; answer: string };
  mistake: { wrong: string; right: string };
  practice: Record<Difficulty, PracticeQuestion>;
  realLife?: string[];
}

export interface MathF2C11Content {
  subtopics: MathF2C11SubtopicContent[];
  summary: { center: string; branches: MindmapBranch[] };
  formulaSheet: FormulaSheetEntry[];
  quickRevision: string[];
  examTips: string[];
  challenge: { question: string; answer: string };
}

const en: MathF2C11Content = {
  subtopics: [
    {
      num: "11.1",
      title: "Transformations",
      ideaParagraphs: [
        "A transformation moves every point of a shape (the object) the same way to create a new copy (the image) — without changing the shape itself. If the shape changes, it's NOT a transformation.",
      ],
      visual: {
        kind: "transformCompare",
        validLabel: "transformation — same shape, moved",
        invalidLabel: "not a transformation — shape changed",
      },
      formula: {
        eyebrow: "Congruence",
        formula: "Same shape + same size = congruent (orientation doesn't matter)",
      },
      worked: {
        question:
          "ABCDEF is an object, PQRSTU is its image. State the image of (a) point C (b) line AB.",
        steps: [
          {
            calc: "(a) Image of C is T",
            why: "C and T sit in the matching position within the object and image, moving the same way as every other point.",
          },
          {
            calc: "(b) Image of AB is RS",
            why: "Lines keep their length and matching position under a transformation.",
          },
        ],
      },
      guided: {
        question: "Two 10 sen coins — are they congruent? What about a 10 sen and a 20 sen coin?",
        answer:
          "Two 10 sen coins: congruent (same shape and size). A 10 sen and 20 sen: same shape (round) but different size — similar, not congruent.",
      },
      mistake: {
        wrong: "Assuming a flipped or rotated shape can't be congruent to the original.",
        right:
          "Congruence only cares about shape and size — orientation (which way it's facing) doesn't matter at all.",
      },
      practice: {
        easy: {
          question: "A photo is enlarged to a bigger poster. Is the poster congruent to the photo?",
          answer:
            "No — the size changed, so it's not congruent (even though the shape stayed the same).",
        },
        medium: {
          question: "Triangle PQR is congruent to triangle CBA. Which side matches QP?",
          answer: "BC — matching letters in the same order (P↔C, Q↔B, R↔A).",
        },
        hard: {
          question:
            "Explain why a shadow of an object on a wall, changing size as the light source moves closer or further, is NOT a transformation of the object.",
          answer:
            "A transformation keeps the shape's actual proportions — a size-changing shadow is a different kind of mapping (enlargement), not a straightforward isometric transformation.",
        },
      },
      realLife: ["🎨 Wallpaper and tile patterns", "🦋 Butterfly wing symmetry"],
    },
    {
      num: "11.2",
      title: "Translation",
      ideaParagraphs: [
        "A translation slides every point the SAME direction and SAME distance — nothing rotates, nothing flips. It's written as a vector: how far sideways, how far up/down.",
      ],
      visual: {
        kind: "vectorArrow",
        sidewaysLabel: "a (sideways)",
        upLabel: "b (up)",
        caption: "The vector arrow is the same total movement as going sideways, then up",
      },
      formula: {
        eyebrow: "Vector Notation",
        formula: "(a, b) or written as a column: [a above b]",
        legend: [{ label: "a", text: "= sideways (+right/−left), b = up/down (+up/−down)" }],
      },
      worked: {
        question: "Point A(1,2) maps to A'(3,6) under a translation. State the translation vector.",
        steps: [
          {
            calc: "Vector = (3−1, 6−2)",
            why: "Subtract the object's coordinates from the image's — this gives exactly how far it moved.",
          },
          { calc: "= (2, 4)", why: "Simplify." },
        ],
      },
      guided: {
        question:
          "Point L(1,4) maps to L'(3,−5). Using the same translation, find the image of A(3,1).",
        answer: "Vector = (3−1, −5−4) = (2,−9). A'=(3+2, 1−9)=(5,−8).",
      },
      mistake: {
        wrong: "Mixing up which number in the vector is sideways and which is up/down.",
        right: "Always the SAME order: sideways first, then up/down — just like (x,y) coordinates.",
      },
      practice: {
        easy: {
          question: "Find the image of (5,−3) under translation (2,2).",
          answer: "(7, −1)",
        },
        medium: {
          question: "B(5,7) maps to B'(−1,−1). State the translation vector.",
          answer: "(−6, −8)",
        },
        hard: {
          question:
            "Under a translation, S'(4,−2) is the image of S. If the vector is (1,4), find the coordinates of S (the original object).",
          answer: "Work backwards: S = S' − vector = (4−1, −2−4) = (3,−6).",
        },
      },
      realLife: ["🎮 Character movement in games", "🧩 Sliding puzzle pieces"],
    },
    {
      num: "11.3",
      title: "Reflection",
      ideaParagraphs: [
        "Look in a mirror — your reflection is the same distance behind the glass as you are in front of it. A reflection works the same way: every point flips across a line (the axis of reflection), landing the SAME distance on the other side.",
      ],
      visual: {
        kind: "mirror",
        axisLabel: "axis",
        objectLabel: "object",
        imageLabel: "image",
        caption: "Object and image sit the SAME distance from the axis, on opposite sides",
      },
      formula: {
        eyebrow: "Reflection Rule",
        formula: "Object and image are the same shape, same size, MIRROR-flipped orientation",
      },
      worked: {
        question:
          "Triangle M reflects to M'. Describe the reflection if M' appears directly below M, flipped vertically.",
        steps: [
          {
            calc: "Reflected in the x-axis",
            why: "M' appearing directly below M, vertically flipped, means the mirror line runs horizontally beneath it — that's the x-axis.",
          },
        ],
      },
      guided: {
        question: "Point (3,4) is reflected in the x-axis. Find its image.",
        answer: "Reflecting in the x-axis flips the y-value's sign: (3,−4).",
      },
      mistake: {
        wrong: "Confusing reflection with rotation — both can look similar in a quick sketch.",
        right:
          'Reflection ALWAYS mirror-flips the orientation. Rotation keeps the same "handedness" — check whether the shape looks mirrored or just turned.',
      },
      practice: {
        easy: {
          question: "Point (−3,−5) is reflected in the y-axis. Find its image.",
          answer: "(3, −5)",
        },
        medium: {
          question: "A point on the axis of reflection maps to which image point?",
          answer: "Itself — points exactly on the axis don't move.",
        },
        hard: {
          question:
            "Triangle ABC has vertices A(1,1), B(4,1), C(1,3). Reflect it in the x-axis, then state the coordinates of the image A'B'C'.",
          answer: "A'(1,−1), B'(4,−1), C'(1,−3) — every y-value flips sign.",
        },
      },
      realLife: ["🪞 Mirrors and reflections in water", "🏛️ Symmetric building facades"],
    },
    {
      num: "11.4",
      title: "Rotation",
      ideaParagraphs: [
        "A clock's hands sweep around a fixed point — the centre of rotation — without changing size. A rotation needs three things to describe it fully: the centre, the angle, and the direction (clockwise or anticlockwise).",
      ],
      visual: {
        kind: "rotation",
        centreLabel: "centre",
        objectLabel: "object",
        imageLabel: "image",
        caption: "Every point turns the same angle around the fixed centre",
      },
      worked: {
        question:
          "Describe the rotation that maps triangle ABCD to A'B'C'D' if it turns 90° in the clockwise direction around point T.",
        steps: [
          {
            calc: "Clockwise rotation of 90° at point T",
            why: "State all three required parts together: direction, angle, and centre.",
          },
        ],
      },
      guided: {
        question: "Is a rotation of 180° clockwise the same as 180° anticlockwise?",
        answer: "Yes — turning exactly halfway around lands in the same spot either direction.",
      },
      mistake: {
        wrong: "Describing a rotation without stating the centre — the description is incomplete.",
        right: "Every full rotation description needs all THREE: centre, angle, AND direction.",
      },
      practice: {
        easy: {
          question: "What stays fixed during a rotation?",
          answer: "The centre of rotation.",
        },
        medium: {
          question: "A minute hand moves from 12 to 4. Through how many degrees did it rotate?",
          answer: "4/12 of a full circle = 4/12×360° = 120°.",
        },
        hard: {
          question:
            "Point (2,3) is rotated 90° clockwise about the origin. Its image is (3,−2). Explain in words what happened to the x and y values.",
          answer:
            "The y-value became the new x-value, and the negative of the old x-value became the new y-value — this is the standard 90° clockwise rule.",
        },
      },
      realLife: ["🕐 Clock hands", "🎡 Ferris wheels"],
    },
    {
      num: "11.5",
      title: "Isometry and Rotational Symmetry",
      ideaParagraphs: [
        "Translation, reflection, and rotation are all isometries — they keep every distance between points exactly the same, which means the object and image are always CONGRUENT.",
        "A shape has rotational symmetry if, when rotated less than a full turn around a fixed point, it looks EXACTLY the same as it started.",
      ],
      visual: {
        kind: "rotationalSymmetry",
        startLabel: "start",
        after1Label: "after 120°",
        after2Label: "after 240°",
        caption: "An equilateral triangle looks identical every 120° — order 3 rotational symmetry",
      },
      formula: {
        eyebrow: "Order of Rotational Symmetry",
        formula: "How many times it looks the same in one full 360° turn",
      },
      worked: {
        question:
          "Objects A, B, C, D are all congruent to each other. State the isometry that maps A to B (a rotation), A to C (a translation), and A to D (a reflection).",
        steps: [
          {
            calc: "A to B: rotation",
            why: "The shape turned to face a different direction around a fixed point.",
          },
          {
            calc: "A to C: translation",
            why: "The shape kept facing the same way, just slid to a new position.",
          },
          { calc: "A to D: reflection", why: "The shape's orientation mirror-flipped." },
        ],
      },
      guided: {
        question: "What is the order of rotational symmetry of an equilateral triangle?",
        answer: "3 — it looks identical every 120° turn (360°÷3).",
      },
      mistake: {
        wrong: "Assuming every congruent pair must be a translation.",
        right:
          'Congruent just means "isometry happened" — check the orientation carefully to identify WHICH isometry (translation keeps facing the same way, rotation turns, reflection mirrors).',
      },
      practice: {
        easy: {
          question: "Does a square have rotational symmetry?",
          answer: "Yes — order 4 (every 90°).",
        },
        medium: {
          question: "What is the order of rotational symmetry of a regular hexagon?",
          answer: "6",
        },
        hard: {
          question:
            "A shape has rotational symmetry of order 5. Through what angle must it be rotated to look the same again each time?",
          answer: "360÷5 = 72°",
        },
      },
      realLife: ["♻️ The recycling symbol", "⭐ Pinwheels and fans"],
    },
  ],
  summary: {
    center: "Isometric Transformations",
    branches: [
      { title: "Translation", points: ["Slide — same direction, same distance"] },
      { title: "Reflection", points: ["Flip across an axis"] },
      { title: "Rotation", points: ["Turn — centre, angle, direction"] },
    ],
  },
  formulaSheet: [
    { formula: "Translation vector: (sideways, up/down)", label: "" },
    { formula: "Rotation needs: centre + angle + direction", label: "" },
    { formula: "Isometry → congruent image", label: "" },
  ],
  quickRevision: [
    "I can identify transformations and congruent shapes.",
    "I can describe and apply translation, reflection, and rotation.",
    "I can find the order of rotational symmetry of a shape.",
  ],
  examTips: [
    "Describing a rotation needs THREE things — centre, angle, direction — missing any one loses marks.",
  ],
  challenge: {
    question:
      'A logo is designed with rotational symmetry of order 6 around its centre. If one "arm" of the logo starts pointing due north, at what other compass-like angles (measuring clockwise from north) will an identical arm appear?',
    answer: "360°÷6 = 60° apart. Arms appear at 60°, 120°, 180°, 240°, and 300°.",
  },
};

const bm: MathF2C11Content = {
  subtopics: [
    {
      num: "11.1",
      title: "Transformasi",
      ideaParagraphs: [
        "Transformasi mengalihkan setiap titik bentuk (objek) cara sama untuk cipta salinan baharu (imej) — tanpa mengubah bentuk itu sendiri. Jika bentuk berubah, itu BUKAN transformasi.",
      ],
      visual: {
        kind: "transformCompare",
        validLabel: "transformasi — bentuk sama, dipindah",
        invalidLabel: "bukan transformasi — bentuk berubah",
      },
      formula: {
        eyebrow: "Kekongruenan",
        formula: "Bentuk sama + saiz sama = kongruen (orientasi tidak penting)",
      },
      worked: {
        question:
          "ABCDEF ialah objek, PQRSTU ialah imejnya. Nyatakan imej bagi (a) titik C (b) garis AB.",
        steps: [
          {
            calc: "(a) Imej C ialah T",
            why: "C dan T terletak kedudukan sepadan dalam objek dan imej, bergerak cara sama seperti setiap titik lain.",
          },
          {
            calc: "(b) Imej AB ialah RS",
            why: "Garis kekalkan panjang dan kedudukan sepadan bawah transformasi.",
          },
        ],
      },
      guided: {
        question: "Dua syiling 10 sen — adakah kongruen? Bagaimana pula syiling 10 sen dan 20 sen?",
        answer:
          "Dua syiling 10 sen: kongruen (bentuk dan saiz sama). 10 sen dan 20 sen: bentuk sama (bulat) tetapi saiz berbeza — serupa, bukan kongruen.",
      },
      mistake: {
        wrong: "Menganggap bentuk dibalik atau diputar tidak boleh kongruen dengan asal.",
        right:
          "Kekongruenan hanya peduli bentuk dan saiz — orientasi (arah menghadap) langsung tidak penting.",
      },
      practice: {
        easy: {
          question:
            "Foto dibesarkan menjadi poster lebih besar. Adakah poster kongruen dengan foto?",
          answer: "Tidak — saiz berubah, jadi tidak kongruen (walaupun bentuk kekal sama).",
        },
        medium: {
          question: "Segi tiga PQR kongruen dengan segi tiga CBA. Sisi mana sepadan QP?",
          answer: "BC — huruf sepadan susunan sama (P↔C, Q↔B, R↔A).",
        },
        hard: {
          question:
            "Jelaskan mengapa bayang objek di dinding, berubah saiz apabila sumber cahaya bergerak lebih dekat atau jauh, BUKAN transformasi objek.",
          answer:
            "Transformasi kekalkan perkadaran sebenar bentuk — bayang bertukar saiz adalah pemetaan jenis lain (pembesaran), bukan transformasi isometri mudah.",
        },
      },
      realLife: ["🎨 Corak kertas dinding dan jubin", "🦋 Simetri sayap rama-rama"],
    },
    {
      num: "11.2",
      title: "Translasi",
      ideaParagraphs: [
        "Translasi menggelongsor setiap titik arah SAMA dan jarak SAMA — tiada apa berputar, tiada apa terbalik. Ditulis sebagai vektor: berapa jauh ke sisi, berapa jauh atas/bawah.",
      ],
      visual: {
        kind: "vectorArrow",
        sidewaysLabel: "a (ke sisi)",
        upLabel: "b (atas)",
        caption:
          "Anak panah vektor ialah pergerakan jumlah sama seperti pergi ke sisi, kemudian atas",
      },
      formula: {
        eyebrow: "Tatatanda Vektor",
        formula: "(a, b) atau ditulis sebagai lajur: [a atas b]",
        legend: [{ label: "a", text: "= ke sisi (+kanan/−kiri), b = atas/bawah (+atas/−bawah)" }],
      },
      worked: {
        question: "Titik A(1,2) memetakan A'(3,6) bawah translasi. Nyatakan vektor translasi.",
        steps: [
          {
            calc: "Vektor = (3−1, 6−2)",
            why: "Tolak koordinat objek daripada imej — ini beri tepat berapa jauh ia bergerak.",
          },
          { calc: "= (2, 4)", why: "Permudahkan." },
        ],
      },
      guided: {
        question: "Titik L(1,4) memetakan L'(3,−5). Guna translasi sama, cari imej A(3,1).",
        answer: "Vektor = (3−1, −5−4) = (2,−9). A'=(3+2, 1−9)=(5,−8).",
      },
      mistake: {
        wrong: "Mengelirukan nombor mana dalam vektor ke sisi dan mana atas/bawah.",
        right:
          "Sentiasa susunan SAMA: ke sisi dahulu, kemudian atas/bawah — sama seperti koordinat (x,y).",
      },
      practice: {
        easy: {
          question: "Cari imej (5,−3) bawah translasi (2,2).",
          answer: "(7, −1)",
        },
        medium: {
          question: "B(5,7) memetakan B'(−1,−1). Nyatakan vektor translasi.",
          answer: "(−6, −8)",
        },
        hard: {
          question:
            "Bawah translasi, S'(4,−2) ialah imej S. Jika vektor (1,4), cari koordinat S (objek asal).",
          answer: "Bekerja ke belakang: S = S' − vektor = (4−1, −2−4) = (3,−6).",
        },
      },
      realLife: ["🎮 Pergerakan watak dalam permainan", "🧩 Kepingan teka-teki gelongsor"],
    },
    {
      num: "11.3",
      title: "Pantulan",
      ideaParagraphs: [
        "Lihat dalam cermin — pantulan anda jarak sama di belakang kaca seperti anda di depannya. Pantulan berfungsi cara sama: setiap titik terbalik merentasi garis (paksi pantulan), mendarat jarak SAMA di sebelah lain.",
      ],
      visual: {
        kind: "mirror",
        axisLabel: "paksi",
        objectLabel: "objek",
        imageLabel: "imej",
        caption: "Objek dan imej terletak jarak SAMA dari paksi, sebelah bertentangan",
      },
      formula: {
        eyebrow: "Peraturan Pantulan",
        formula: "Objek dan imej bentuk sama, saiz sama, orientasi TERBALIK cermin",
      },
      worked: {
        question:
          "Segi tiga M pantul ke M'. Terangkan pantulan jika M' muncul terus di bawah M, terbalik menegak.",
        steps: [
          {
            calc: "Pantulan dalam paksi-x",
            why: "M' muncul terus di bawah M, terbalik menegak, bermakna garis cermin berjalan mendatar di bawahnya — itu paksi-x.",
          },
        ],
      },
      guided: {
        question: "Titik (3,4) dipantul dalam paksi-x. Cari imejnya.",
        answer: "Memantul dalam paksi-x membalikkan tanda nilai-y: (3,−4).",
      },
      mistake: {
        wrong:
          "Mengelirukan pantulan dengan putaran — kedua-dua boleh nampak serupa dalam lakaran pantas.",
        right:
          'Pantulan SENTIASA membalikkan orientasi seperti cermin. Putaran kekalkan "kepihakan" sama — semak sama ada bentuk nampak dicermin atau hanya dipusing.',
      },
      practice: {
        easy: {
          question: "Titik (−3,−5) dipantul dalam paksi-y. Cari imejnya.",
          answer: "(3, −5)",
        },
        medium: {
          question: "Titik pada paksi pantulan memetakan titik imej mana?",
          answer: "Dirinya sendiri — titik tepat pada paksi tidak bergerak.",
        },
        hard: {
          question:
            "Segi tiga ABC ada bucu A(1,1), B(4,1), C(1,3). Pantulkan dalam paksi-x, kemudian nyatakan koordinat imej A'B'C'.",
          answer: "A'(1,−1), B'(4,−1), C'(1,−3) — setiap nilai-y tukar tanda.",
        },
      },
      realLife: ["🪞 Cermin dan pantulan di air", "🏛️ Fasad bangunan simetri"],
    },
    {
      num: "11.4",
      title: "Putaran",
      ideaParagraphs: [
        "Jarum jam mengelilingi titik tetap — pusat putaran — tanpa mengubah saiz. Putaran perlukan tiga perkara untuk terangkan sepenuhnya: pusat, sudut, dan arah (ikut jam atau lawan jam).",
      ],
      visual: {
        kind: "rotation",
        centreLabel: "pusat",
        objectLabel: "objek",
        imageLabel: "imej",
        caption: "Setiap titik berpusing sudut sama sekeliling pusat tetap",
      },
      worked: {
        question:
          "Terangkan putaran yang memetakan segi tiga ABCD ke A'B'C'D' jika berpusing 90° arah ikut jam sekeliling titik T.",
        steps: [
          {
            calc: "Putaran ikut jam 90° pada titik T",
            why: "Nyatakan ketiga-tiga bahagian diperlukan bersama: arah, sudut, dan pusat.",
          },
        ],
      },
      guided: {
        question: "Adakah putaran 180° ikut jam sama dengan 180° lawan jam?",
        answer: "Ya — berpusing tepat separuh jalan mendarat di tempat sama tidak kira arah.",
      },
      mistake: {
        wrong: "Terangkan putaran tanpa nyatakan pusat — penerangan tidak lengkap.",
        right: "Setiap penerangan putaran penuh perlukan KETIGA-TIGA: pusat, sudut, DAN arah.",
      },
      practice: {
        easy: {
          question: "Apa yang kekal tetap semasa putaran?",
          answer: "Pusat putaran.",
        },
        medium: {
          question: "Jarum minit bergerak dari 12 ke 4. Berapa darjah ia berputar?",
          answer: "4/12 daripada bulatan penuh = 4/12×360° = 120°.",
        },
        hard: {
          question:
            "Titik (2,3) diputar 90° ikut jam sekeliling asalan. Imejnya (3,−2). Jelaskan dalam perkataan apa berlaku pada nilai x dan y.",
          answer:
            "Nilai-y menjadi nilai-x baharu, dan negatif nilai-x lama menjadi nilai-y baharu — ini peraturan standard 90° ikut jam.",
        },
      },
      realLife: ["🕐 Jarum jam", "🎡 Kincir raksasa"],
    },
    {
      num: "11.5",
      title: "Isometri dan Simetri Putaran",
      ideaParagraphs: [
        "Translasi, pantulan, dan putaran semuanya isometri — ia kekalkan setiap jarak antara titik tepat sama, bermakna objek dan imej sentiasa KONGRUEN.",
        "Bentuk ada simetri putaran jika, apabila diputar kurang daripada satu pusingan penuh sekeliling titik tetap, ia nampak TEPAT sama seperti permulaan.",
      ],
      visual: {
        kind: "rotationalSymmetry",
        startLabel: "mula",
        after1Label: "selepas 120°",
        after2Label: "selepas 240°",
        caption: "Segi tiga sama sisi nampak sama setiap 120° — simetri putaran peringkat 3",
      },
      formula: {
        eyebrow: "Peringkat Simetri Putaran",
        formula: "Berapa kali ia nampak sama dalam satu pusingan penuh 360°",
      },
      worked: {
        question:
          "Objek A, B, C, D semuanya kongruen antara satu sama lain. Nyatakan isometri yang memetakan A ke B (putaran), A ke C (translasi), dan A ke D (pantulan).",
        steps: [
          {
            calc: "A ke B: putaran",
            why: "Bentuk berpusing menghadap arah berbeza sekeliling titik tetap.",
          },
          {
            calc: "A ke C: translasi",
            why: "Bentuk kekal menghadap cara sama, cuma gelongsor ke kedudukan baharu.",
          },
          { calc: "A ke D: pantulan", why: "Orientasi bentuk terbalik seperti cermin." },
        ],
      },
      guided: {
        question: "Apakah peringkat simetri putaran segi tiga sama sisi?",
        answer: "3 — ia nampak sama setiap pusingan 120° (360°÷3).",
      },
      mistake: {
        wrong: "Menganggap setiap pasangan kongruen mesti translasi.",
        right:
          'Kongruen hanya bermaksud "isometri berlaku" — semak orientasi dengan teliti untuk kenal pasti isometri MANA (translasi kekal menghadap sama, putaran berpusing, pantulan mencermin).',
      },
      practice: {
        easy: {
          question: "Adakah segi empat sama ada simetri putaran?",
          answer: "Ya — peringkat 4 (setiap 90°).",
        },
        medium: {
          question: "Apakah peringkat simetri putaran heksagon sekata?",
          answer: "6",
        },
        hard: {
          question:
            "Bentuk ada simetri putaran peringkat 5. Melalui sudut apa ia mesti diputar untuk nampak sama semula setiap kali?",
          answer: "360÷5 = 72°",
        },
      },
      realLife: ["♻️ Simbol kitar semula", "⭐ Kincir angin dan kipas"],
    },
  ],
  summary: {
    center: "Transformasi Isometri",
    branches: [
      { title: "Translasi", points: ["Gelongsor — arah sama, jarak sama"] },
      { title: "Pantulan", points: ["Terbalik merentasi paksi"] },
      { title: "Putaran", points: ["Pusing — pusat, sudut, arah"] },
    ],
  },
  formulaSheet: [
    { formula: "Vektor translasi: (ke sisi, atas/bawah)", label: "" },
    { formula: "Putaran perlukan: pusat + sudut + arah", label: "" },
    { formula: "Isometri → imej kongruen", label: "" },
  ],
  quickRevision: [
    "Saya boleh kenal pasti transformasi dan bentuk kongruen.",
    "Saya boleh terangkan dan guna translasi, pantulan, dan putaran.",
    "Saya boleh cari peringkat simetri putaran bentuk.",
  ],
  examTips: [
    "Terangkan putaran perlukan TIGA perkara — pusat, sudut, arah — hilang mana-mana satu hilang markah.",
  ],
  challenge: {
    question:
      'Logo direka dengan simetri putaran peringkat 6 sekeliling pusatnya. Jika satu "lengan" logo bermula menghala utara, pada sudut seperti kompas lain (mengukur ikut jam dari utara) lengan serupa akan muncul?',
    answer: "360°÷6 = 60° berjarak. Lengan muncul pada 60°, 120°, 180°, 240°, dan 300°.",
  },
};

export const mathF2C11InteractiveContent: { en: MathF2C11Content; bm: MathF2C11Content } = {
  en,
  bm,
};
