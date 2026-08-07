// Form 1 Mathematics, Chapter 9 — Basic Polygons / Poligon Asas
// Interactive bilingual content. EN sourced from T1 BT MAT DLP - MATHEMATICS.pdf,
// BM sourced from T1 BT MAT- MATEMATIK.pdf (KSSM counterpart), cross-checked
// against design-reference/math1-chapter9-basic-polygons-notes-v4.html.
// Content only — no presentation markup (rendered by MathF1Chapter9NotesBlock).
import type { WorkedStep } from "@/components/notes/blocks/StepsCard";
import type { Difficulty, PracticeQuestion } from "@/components/notes/blocks/DifficultyTabs";
import type { MindmapBranch } from "@/components/notes/blocks/ChapterSummaryMindmap";
import type { FormulaSheetEntry } from "@/components/notes/blocks/FormulaSheet";

export interface MathC9SubtopicContent {
  num: string;
  title: string;
  ideaParagraphs: string[];
  /** 9.1 only — polygon name/vertices/sides/interior-angles reference table. */
  refTable?: { headers: string[]; rows: string[][] };
  /** 9.1 only — live n-gon diagonal diagram embedded in the lesson intro. */
  polygonDemo?: { n: number; countLabel: string; caption?: string };
  /** 9.3 only — inline reference grid of the 6 quadrilateral types, shown before the formula card. */
  quadTypesSheet?: FormulaSheetEntry[];
  formula?: { eyebrow: string; formula: string; legend?: { label: string; text: string }[] };
  worked: { question: string; steps: WorkedStep[] };
  guided: { question: string; answer: string };
  mistake: { wrong: string; right: string };
  practice: Record<Difficulty, PracticeQuestion>;
  realLife?: string[];
}

export interface MathF1C9Content {
  subtopics: MathC9SubtopicContent[];
  summary: { center: string; branches: MindmapBranch[] };
  formulaSheet: FormulaSheetEntry[];
  quickRevision: string[];
  examTips: string[];
  challenge: { question: string; answer: string };
}

const en: MathF1C9Content = {
  subtopics: [
    {
      num: "9.1",
      title: "Polygons",
      ideaParagraphs: [
        "A polygon is any enclosed shape made of 3 or more straight sides. The number of vertices always EQUALS the number of sides. A diagonal is a line connecting two vertices that aren't already joined by a side.",
      ],
      refTable: {
        headers: ["Polygon", "Vertices", "Sides", "Interior Angles"],
        rows: [
          ["Triangle", "3", "3", "3"],
          ["Quadrilateral", "4", "4", "4"],
          ["Pentagon", "5", "5", "5"],
          ["Hexagon", "6", "6", "6"],
          ["Heptagon", "7", "7", "7"],
          ["Octagon", "8", "8", "8"],
          ["Nonagon", "9", "9", "9"],
          ["Decagon", "10", "10", "10"],
        ],
      },
      polygonDemo: {
        n: 6,
        countLabel: "diagonals",
        caption: "A hexagon (6 sides) has 6 vertices and 9 diagonals — verify: 6×(6−3)/2 = 9",
      },
      formula: {
        eyebrow: "Number of Diagonals",
        formula: "Diagonals = n(n − 3) / 2",
        legend: [{ label: "n", text: "= number of sides (and vertices)" }],
      },
      worked: {
        question: "Find the number of vertices and diagonals of a polygon with 10 sides.",
        steps: [
          {
            calc: "Vertices = 10",
            why: "The number of vertices always equals the number of sides.",
          },
          {
            calc: "10 − 3 = 7",
            why: "Subtract 3 from the number of sides (a vertex has no diagonal to itself or its 2 neighbours).",
          },
          {
            calc: "Diagonals = 10×7/2 = 35",
            why: "Each of the 10 vertices draws 7 diagonals, but that counts every diagonal from both its ends — dividing by 2 removes the double-count.",
          },
        ],
      },
      guided: {
        question: "Find the number of diagonals of a polygon with 12 sides.",
        answer: "n=12. Diagonals = 12×(12−3)/2 = 12×9/2 = 54.",
      },
      mistake: {
        wrong: "Forgetting to divide by 2 in the diagonal formula, double-counting each diagonal.",
        right:
          "Each diagonal connects two vertices — counting from BOTH ends counts it twice, so always divide the final total by 2.",
      },
      practice: {
        easy: {
          question: "Find the number of vertices and diagonals of a polygon with 6 sides.",
          answer: "Vertices = 6. Diagonals = 6×3/2 = 9.",
        },
        medium: {
          question: "Find the number of diagonals of a polygon with 9 sides.",
          answer: "9×6/2 = 27.",
        },
        hard: {
          question: "A polygon with 12 sides has 54 diagonals. TRUE or FALSE?",
          answer: "TRUE — 12×9/2 = 54.",
        },
      },
      realLife: ["🐝 Honeycomb hexagons", "🕌 Architectural motifs"],
    },
    {
      num: "9.2",
      title: "Properties of Triangles and the Interior and Exterior Angles of Triangles",
      ideaParagraphs: [
        "Triangles are classified by their SIDES (equilateral: all equal; isosceles: two equal; scalene: all different) or by their ANGLES (acute: all under 90°; right: one is 90°; obtuse: one over 90°).",
        "Every triangle follows THREE fixed rules: the interior angles always sum to 180°; an interior angle plus its adjacent exterior angle sum to 180°; and an exterior angle equals the sum of the two opposite interior angles.",
      ],
      formula: {
        eyebrow: "Triangle Angle Rules",
        formula: "a + b + c = 180°   |   d = a + b",
        legend: [
          {
            label: "Note",
            text: "d is the exterior angle at c's vertex — it equals the sum of the two FAR interior angles.",
          },
        ],
      },
      worked: {
        question:
          "PQRS is a straight line. Given ∠RST=46°, ∠STQ... find x and y (using the isosceles triangle QST where ∠TQS=∠TSQ=50°).",
        steps: [
          { calc: "∠RST + 84° + 46° = 180°", why: "Sum of interior angles of triangle RST." },
          {
            calc: "∠RST = 180 − 84 − 46 = 50°",
            why: "Since all three angles of triangle RST must add to 180°, subtracting the two known angles from 180° isolates the missing one.",
          },
          {
            calc: "∠TQS = 50° (isosceles base angles)",
            why: "Triangle QST is isosceles, so its two base angles are equal.",
          },
          {
            calc: "x + 50° = 180°   →   x = 130°",
            why: "x and 50° are an interior angle and its adjacent exterior angle (sum 180°).",
          },
          {
            calc: "∠QTS = 180−50−50 = 80°   →   y = 80−46 = 34°",
            why: "Find ∠QTS from triangle QST's angle sum, then y from the diagram's remaining angle.",
          },
        ],
      },
      guided: {
        question: "Find x: a triangle has interior angles 92°, 37°, and x.",
        answer: "92+37+x=180. 129+x=180. x=51°.",
      },
      mistake: {
        wrong: 'Using the exterior-angle rule (d=a+b) on the WRONG pair of "far" interior angles.',
        right:
          'An exterior angle equals the sum of the two interior angles that are NOT adjacent to it (the two "far" ones).',
      },
      practice: {
        easy: {
          question: "A triangle has angles 100° and 45°. Find the third angle, p.",
          answer: "p = 180−100−45 = 35°.",
        },
        medium: {
          question:
            "An exterior angle of a triangle is formed by two opposite interior angles of 79° and 28°. Find x (the exterior angle).",
          answer: "x = 79+28 = 107°.",
        },
        hard: {
          question:
            "PQR, SQT and TRU are straight lines. Given angles 68° and 62° marked at the triangle, find x and y.",
          answer:
            "Use the straight-line (180°), triangle-angle-sum (180°), and exterior-angle rules together in sequence to solve for x then y.",
        },
      },
      realLife: ["🏔️ Roof trusses", "📐 Set squares and drafting tools"],
    },
    {
      num: "9.3",
      title: "Properties of Quadrilaterals and the Interior and Exterior Angles of Quadrilaterals",
      ideaParagraphs: [
        "Six types of quadrilaterals — square, rectangle, parallelogram, rhombus, trapezium, kite — each with their own combination of equal sides, parallel sides, and diagonal properties.",
        "Every quadrilateral follows two fixed rules: the interior angles always sum to 360°, and an interior angle plus its adjacent exterior angle sum to 180°. In a parallelogram (or rhombus), opposite angles are always equal.",
      ],
      quadTypesSheet: [
        { formula: "Rectangle", label: "Opp. sides ∥ & equal; all angles 90°" },
        { formula: "Square", label: "All sides equal; all angles 90°" },
        { formula: "Parallelogram", label: "Opp. sides ∥ & equal; opp. angles equal" },
        { formula: "Rhombus", label: "All sides equal; diagonals ⊥ bisectors" },
        { formula: "Trapezium", label: "Only ONE pair of sides parallel" },
        { formula: "Kite", label: "Two pairs of adjacent sides equal" },
      ],
      formula: {
        eyebrow: "Quadrilateral Angle Rules",
        formula: "a + b + c + d = 360°",
      },
      worked: {
        question:
          "PST is a straight line. A quadrilateral has interior angles 100°, 52°, 145° at three corners, and an adjacent exterior angle x at the fourth. Find x and y.",
        steps: [
          {
            calc: "x + 100° = 180°   →   x = 80°",
            why: "x is an interior angle and its adjacent exterior angle 100° (sum 180°).",
          },
          {
            calc: "y + 80° + 52° + 145° = 360°",
            why: "Sum of all interior angles of the quadrilateral is 360°.",
          },
          {
            calc: "y = 360 − 277 = 83°",
            why: "The other three angles (80+52+145=277°) are now known, so subtracting from the 360° total leaves y.",
          },
        ],
      },
      guided: {
        question:
          "In a parallelogram, one angle is 42°. What is its opposite angle, and what is an adjacent angle?",
        answer:
          "Opposite angle = 42° (opposite angles in a parallelogram are equal). Adjacent angle = 180−42 = 138° (co-interior, since the sides are parallel).",
      },
      mistake: {
        wrong:
          "Using 180° (the triangle sum) instead of 360° when summing a quadrilateral's interior angles.",
        right:
          "A quadrilateral has 4 sides and its interior angles ALWAYS sum to 360° — split it into two triangles (180°+180°) to see why.",
      },
      practice: {
        easy: {
          question: "Is a square also a rhombus? Explain.",
          answer: "Yes — a square has all sides equal, which satisfies the rhombus definition too.",
        },
        medium: {
          question: "A quadrilateral has three angles 115°, 118°, 68°. Find the fourth angle, x.",
          answer: "x = 360−115−118−68 = 59°.",
        },
        hard: {
          question:
            "PQRU is a square and QRSV is a parallelogram, with PVR a straight line and one angle 72°. Find x and y.",
          answer:
            "x=45° (half a square's 90° angle). ∠QVS=180−72=108° (co-interior). y=180−(108−45)=117°.",
        },
      },
      realLife: ["🪁 Kite design", "🏢 Window and door frames"],
    },
  ],
  summary: {
    center: "Basic Polygons",
    branches: [
      { title: "Polygons", points: ["Vertices = sides; diagonals = n(n−3)/2"] },
      { title: "Triangles", points: ["Interior sum 180°; exterior = sum of far angles"] },
      { title: "Quadrilaterals", points: ["Interior sum 360°; 6 named types"] },
    ],
  },
  formulaSheet: [
    { formula: "Diagonals = n(n−3)/2", label: "n = number of sides" },
    { formula: "Triangle: 180°", label: "Interior angle sum" },
    { formula: "Quadrilateral: 360°", label: "Interior angle sum" },
    { formula: "Exterior = sum of far interior angles", label: "Triangles only" },
  ],
  quickRevision: [
    "I can find the number of vertices and diagonals of a polygon.",
    "I can classify triangles and find interior/exterior angles.",
    "I can describe quadrilateral properties and find interior/exterior angles.",
  ],
  examTips: [
    "Any quadrilateral splits into 2 triangles — that's WHY its angles sum to 2×180°=360°.",
    'A square and rhombus share "all sides equal"; a square and rectangle share "all angles 90°" — a square is both.',
  ],
  challenge: {
    question:
      "PQRU is a rectangle and RSTU is a rhombus, with SUV a straight line. One angle is 62°. Find x and y.",
    answer:
      "Use the rectangle's 90° corners and the rhombus's equal opposite angles together with the straight-line rule to solve for x and y step by step.",
  },
};

const bm: MathF1C9Content = {
  subtopics: [
    {
      num: "9.1",
      title: "Poligon",
      ideaParagraphs: [
        "Poligon ialah sebarang bentuk tertutup dibina daripada 3 atau lebih sisi lurus. Bilangan bucu sentiasa SAMA dengan bilangan sisi. Pepenjuru ialah garis menghubungkan dua bucu yang belum disambung oleh sisi.",
      ],
      refTable: {
        headers: ["Poligon", "Bucu", "Sisi", "Sudut Pedalaman"],
        rows: [
          ["Segi Tiga", "3", "3", "3"],
          ["Sisi Empat", "4", "4", "4"],
          ["Pentagon", "5", "5", "5"],
          ["Heksagon", "6", "6", "6"],
          ["Heptagon", "7", "7", "7"],
          ["Oktagon", "8", "8", "8"],
          ["Nonagon", "9", "9", "9"],
          ["Dekagon", "10", "10", "10"],
        ],
      },
      polygonDemo: {
        n: 6,
        countLabel: "pepenjuru",
        caption: "Heksagon (6 sisi) mempunyai 6 bucu dan 9 pepenjuru — sahkan: 6×(6−3)/2 = 9",
      },
      formula: {
        eyebrow: "Bilangan Pepenjuru",
        formula: "Pepenjuru = n(n − 3) / 2",
        legend: [{ label: "n", text: "= bilangan sisi (dan bucu)" }],
      },
      worked: {
        question: "Cari bilangan bucu dan pepenjuru bagi poligon bersisi 10.",
        steps: [
          { calc: "Bucu = 10", why: "Bilangan bucu sentiasa sama dengan bilangan sisi." },
          {
            calc: "10 − 3 = 7",
            why: "Tolak 3 daripada bilangan sisi (satu bucu tiada pepenjuru ke dirinya atau 2 jirannya).",
          },
          {
            calc: "Pepenjuru = 10×7/2 = 35",
            why: "Setiap 10 bucu melukis 7 pepenjuru, tetapi ini mengira setiap pepenjuru dari kedua-dua hujungnya — bahagi dengan 2 untuk buang kiraan berganda.",
          },
        ],
      },
      guided: {
        question: "Cari bilangan pepenjuru bagi poligon bersisi 12.",
        answer: "n=12. Pepenjuru = 12×(12−3)/2 = 12×9/2 = 54.",
      },
      mistake: {
        wrong:
          "Terlupa bahagi dengan 2 dalam formula pepenjuru, mengira dua kali setiap pepenjuru.",
        right:
          "Setiap pepenjuru menghubungkan dua bucu — mengira dari KEDUA-DUA hujung mengira dua kali, jadi sentiasa bahagi jumlah akhir dengan 2.",
      },
      practice: {
        easy: {
          question: "Cari bilangan bucu dan pepenjuru bagi poligon bersisi 6.",
          answer: "Bucu = 6. Pepenjuru = 6×3/2 = 9.",
        },
        medium: {
          question: "Cari bilangan pepenjuru bagi poligon bersisi 9.",
          answer: "9×6/2 = 27.",
        },
        hard: {
          question: "Poligon bersisi 12 mempunyai 54 pepenjuru. BETUL atau SALAH?",
          answer: "BETUL — 12×9/2 = 54.",
        },
      },
      realLife: ["🐝 Heksagon sarang lebah", "🕌 Motif senibina"],
    },
    {
      num: "9.2",
      title: "Sifat Segi Tiga dan Sudut Pedalaman dan Peluaran Segi Tiga",
      ideaParagraphs: [
        "Segi tiga dikelaskan mengikut SISI (sama sisi: semua sama; sama kaki: dua sama; sisi tak sama: semua berbeza) atau SUDUT (tirus: semua bawah 90°; tegak: satu 90°; cakah: satu lebih 90°).",
        "Setiap segi tiga mengikut TIGA peraturan tetap: sudut pedalaman sentiasa berjumlah 180°; sudut pedalaman dengan sudut peluaran bersebelahannya berjumlah 180°; dan sudut peluaran sama dengan jumlah dua sudut pedalaman bertentangan.",
      ],
      formula: {
        eyebrow: "Peraturan Sudut Segi Tiga",
        formula: "a + b + c = 180°   |   d = a + b",
        legend: [
          {
            label: "Nota",
            text: "d ialah sudut peluaran di bucu c — ia sama dengan jumlah dua sudut pedalaman JAUH.",
          },
        ],
      },
      worked: {
        question:
          "PQRS ialah garis lurus. Diberi ∠RST=46°, cari x dan y (guna segi tiga sama kaki QST dengan ∠TQS=∠TSQ=50°).",
        steps: [
          { calc: "∠RST + 84° + 46° = 180°", why: "Jumlah sudut pedalaman segi tiga RST." },
          {
            calc: "∠RST = 180 − 84 − 46 = 50°",
            why: "Oleh kerana ketiga-tiga sudut segi tiga RST mesti berjumlah 180°, menolak dua sudut yang diketahui daripada 180° mengasingkan sudut yang hilang.",
          },
          {
            calc: "∠TQS = 50° (sudut tapak sama kaki)",
            why: "Segi tiga QST sama kaki, jadi dua sudut tapaknya sama.",
          },
          {
            calc: "x + 50° = 180°   →   x = 130°",
            why: "x dan 50° ialah sudut pedalaman dan sudut peluaran bersebelahannya (jumlah 180°).",
          },
          {
            calc: "∠QTS = 180−50−50 = 80°   →   y = 80−46 = 34°",
            why: "Cari ∠QTS daripada jumlah sudut segi tiga QST, kemudian y daripada sudut berbaki dalam gambar rajah.",
          },
        ],
      },
      guided: {
        question: "Cari x: segi tiga mempunyai sudut pedalaman 92°, 37°, dan x.",
        answer: "92+37+x=180. 129+x=180. x=51°.",
      },
      mistake: {
        wrong:
          'Guna peraturan sudut peluaran (d=a+b) pada pasangan sudut pedalaman "jauh" yang SALAH.',
        right:
          'Sudut peluaran sama dengan jumlah dua sudut pedalaman yang TIDAK bersebelahan dengannya (dua yang "jauh").',
      },
      practice: {
        easy: {
          question: "Segi tiga mempunyai sudut 100° dan 45°. Cari sudut ketiga, p.",
          answer: "p = 180−100−45 = 35°.",
        },
        medium: {
          question:
            "Sudut peluaran segi tiga dibentuk oleh dua sudut pedalaman bertentangan 79° dan 28°. Cari x (sudut peluaran).",
          answer: "x = 79+28 = 107°.",
        },
        hard: {
          question:
            "PQR, SQT dan TRU ialah garis lurus. Diberi sudut 68° dan 62° ditandakan pada segi tiga, cari x dan y.",
          answer:
            "Guna peraturan garis lurus (180°), jumlah sudut segi tiga (180°), dan sudut peluaran secara berurutan untuk selesaikan x kemudian y.",
        },
      },
      realLife: ["🏔️ Kekuda bumbung", "📐 Sesiku set dan alat lukisan"],
    },
    {
      num: "9.3",
      title: "Sifat Sisi Empat dan Sudut Pedalaman dan Peluaran Sisi Empat",
      ideaParagraphs: [
        "Enam jenis sisi empat — segi empat sama, segi empat tepat, segi empat selari, rombus, trapezium, lelayang — setiap satu dengan gabungan sisi sama, sisi selari, dan sifat pepenjuru tersendiri.",
        "Setiap sisi empat mengikut dua peraturan tetap: sudut pedalaman sentiasa berjumlah 360°, dan sudut pedalaman dengan sudut peluaran bersebelahannya berjumlah 180°. Dalam segi empat selari (atau rombus), sudut bertentangan sentiasa sama.",
      ],
      quadTypesSheet: [
        { formula: "Segi Empat Tepat", label: "Sisi bertentang ∥ & sama; semua sudut 90°" },
        { formula: "Segi Empat Sama", label: "Semua sisi sama; semua sudut 90°" },
        { formula: "Segi Empat Selari", label: "Sisi bertentang ∥ & sama; sudut bertentang sama" },
        { formula: "Rombus", label: "Semua sisi sama; pepenjuru pembahagi dua sama ⊥" },
        { formula: "Trapezium", label: "Hanya SATU pasang sisi selari" },
        { formula: "Lelayang", label: "Dua pasang sisi bersebelahan sama" },
      ],
      formula: {
        eyebrow: "Peraturan Sudut Sisi Empat",
        formula: "a + b + c + d = 360°",
      },
      worked: {
        question:
          "PST ialah garis lurus. Sisi empat mempunyai sudut pedalaman 100°, 52°, 145° pada tiga penjuru, dan sudut peluaran bersebelahan x pada penjuru keempat. Cari x dan y.",
        steps: [
          {
            calc: "x + 100° = 180°   →   x = 80°",
            why: "x ialah sudut pedalaman dan sudut peluaran bersebelahannya 100° (jumlah 180°).",
          },
          {
            calc: "y + 80° + 52° + 145° = 360°",
            why: "Jumlah semua sudut pedalaman sisi empat ialah 360°.",
          },
          {
            calc: "y = 360 − 277 = 83°",
            why: "Tiga sudut lain (80+52+145=277°) kini diketahui, jadi menolak daripada jumlah 360° meninggalkan y.",
          },
        ],
      },
      guided: {
        question:
          "Dalam segi empat selari, satu sudut 42°. Apakah sudut bertentangannya, dan apakah sudut bersebelahan?",
        answer:
          "Sudut bertentangan = 42° (sudut bertentangan segi empat selari adalah sama). Sudut bersebelahan = 180−42 = 138° (pedalaman sepihak, kerana sisi selari).",
      },
      mistake: {
        wrong:
          "Guna 180° (jumlah segi tiga) bukannya 360° apabila menjumlahkan sudut pedalaman sisi empat.",
        right:
          "Sisi empat mempunyai 4 sisi dan sudut pedalamannya SENTIASA berjumlah 360° — pecahkan kepada dua segi tiga (180°+180°) untuk lihat sebabnya.",
      },
      practice: {
        easy: {
          question: "Adakah segi empat sama juga rombus? Jelaskan.",
          answer:
            "Ya — segi empat sama mempunyai semua sisi sama, yang memenuhi definisi rombus juga.",
        },
        medium: {
          question: "Sisi empat mempunyai tiga sudut 115°, 118°, 68°. Cari sudut keempat, x.",
          answer: "x = 360−115−118−68 = 59°.",
        },
        hard: {
          question:
            "PQRU segi empat sama dan QRSV segi empat selari, dengan PVR garis lurus dan satu sudut 72°. Cari x dan y.",
          answer:
            "x=45° (separuh sudut 90° segi empat sama). ∠QVS=180−72=108° (pedalaman sepihak). y=180−(108−45)=117°.",
        },
      },
      realLife: ["🪁 Reka bentuk layang-layang", "🏢 Bingkai tingkap dan pintu"],
    },
  ],
  summary: {
    center: "Poligon Asas",
    branches: [
      { title: "Poligon", points: ["Bucu = sisi; pepenjuru = n(n−3)/2"] },
      { title: "Segi Tiga", points: ["Jumlah pedalaman 180°; peluaran = jumlah sudut jauh"] },
      { title: "Sisi Empat", points: ["Jumlah pedalaman 360°; 6 jenis bernama"] },
    ],
  },
  formulaSheet: [
    { formula: "Pepenjuru = n(n−3)/2", label: "n = bilangan sisi" },
    { formula: "Segi Tiga: 180°", label: "Jumlah sudut pedalaman" },
    { formula: "Sisi Empat: 360°", label: "Jumlah sudut pedalaman" },
    { formula: "Peluaran = jumlah sudut pedalaman jauh", label: "Segi tiga sahaja" },
  ],
  quickRevision: [
    "Saya boleh cari bilangan bucu dan pepenjuru poligon.",
    "Saya boleh mengelaskan segi tiga dan cari sudut pedalaman/peluaran.",
    "Saya boleh terangkan sifat sisi empat dan cari sudut pedalaman/peluaran.",
  ],
  examTips: [
    "Sebarang sisi empat pecah kepada 2 segi tiga — itulah SEBAB sudutnya berjumlah 2×180°=360°.",
    'Segi empat sama dan rombus kongsi "semua sisi sama"; segi empat sama dan segi empat tepat kongsi "semua sudut 90°" — segi empat sama adalah kedua-duanya.',
  ],
  challenge: {
    question:
      "PQRU segi empat tepat dan RSTU rombus, dengan SUV garis lurus. Satu sudut 62°. Cari x dan y.",
    answer:
      "Guna penjuru 90° segi empat tepat dan sudut bertentangan sama rombus bersama peraturan garis lurus untuk selesaikan x dan y langkah demi langkah.",
  },
};

export const mathF1C9InteractiveContent: { en: MathF1C9Content; bm: MathF1C9Content } = { en, bm };
