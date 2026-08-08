// Form 2 Mathematics, Chapter 6 — Three-Dimensional Geometrical Shapes /
// Bentuk Geometri Tiga Matra. 6.3 (Surface Area) explicitly reuses the 6.2
// (Nets) concept rather than being taught as a disconnected topic.
// Interactive bilingual content. EN sourced from
// T2_BT_MAT_DLP_-_MATHEMATICS.pdf, BM sourced from T2_BT_MAT_-_MATEMATIK.pdf,
// cross-checked against design-reference/math2-chapter6-3d-shapes-notes-v1.html.
// Content only — no presentation markup (rendered by MathF2Chapter6NotesBlock).
import type { WorkedStep } from "@/components/notes/blocks/StepsCard";
import type { Difficulty, PracticeQuestion } from "@/components/notes/blocks/DifficultyTabs";
import type { MindmapBranch } from "@/components/notes/blocks/ChapterSummaryMindmap";
import type { FormulaSheetEntry } from "@/components/notes/blocks/FormulaSheet";
import type { Shape3DLabels } from "@/components/notes/blocks/Shape3DDiagrams";

export type MathF2C6Visual =
  | { kind: "shapeIcons"; labels: Shape3DLabels; caption?: string }
  | { kind: "cubeNet"; caption?: string }
  | { kind: "coneCylinderVolume"; caption?: string };

export interface MathF2C6Block {
  ideaTag?: string;
  ideaParagraphs: string[];
  visual?: MathF2C6Visual;
  formula?: { eyebrow?: string; formula: string; legend?: { label: string; text: string }[] };
}

export interface MathF2C6SubtopicContent {
  num: string;
  title: string;
  blocks: MathF2C6Block[];
  worked: { question: string; steps: WorkedStep[] };
  guided: { question: string; answer: string };
  mistake: { wrong: string; right: string };
  practice: Record<Difficulty, PracticeQuestion>;
  realLife?: string[];
}

export interface MathF2C6Content {
  subtopics: MathF2C6SubtopicContent[];
  summary: { center: string; branches: MindmapBranch[] };
  formulaSheet: FormulaSheetEntry[];
  quickRevision: string[];
  examTips: string[];
  challenge: { question: string; answer: string };
}

const en: MathF2C6Content = {
  subtopics: [
    {
      num: "6.1",
      title: "Geometric Properties of Three-Dimensional Shapes",
      blocks: [
        {
          ideaParagraphs: [
            "Every 3D shape here is built from flat 2D shapes. What tells them apart is their BASE shape and whether their sides are flat or curved.",
          ],
          visual: {
            kind: "shapeIcons",
            labels: {
              prism: "Prism",
              pyramid: "Pyramid",
              cylinder: "Cylinder",
              cone: "Cone",
              sphere: "Sphere",
            },
            caption:
              "Flat sides vs curved surfaces, one base vs two — that's what separates each shape",
          },
          formula: {
            eyebrow: "Prism vs Pyramid",
            formula: "Prism: 2 identical bases. Pyramid: 1 base + a point (apex).",
          },
        },
      ],
      worked: {
        question: "Name the shape: 2 circular bases, 1 curved surface, no apex.",
        steps: [
          {
            calc: "2 circular bases + curved surface + no apex = cylinder",
            why: "Two circles (not one) rules out a cone, and no point/apex rules out a pyramid.",
          },
        ],
      },
      guided: {
        question: "Is a cube a prism? Explain.",
        answer:
          "Yes — a cube has 2 identical square bases (top and bottom) with a uniform cross-section — that fits the prism definition.",
      },
      mistake: {
        wrong:
          "Confusing a cone (1 apex, curved surface) with a pyramid (apex, but FLAT triangular sides).",
        right:
          "Curved surface = cone or cylinder or sphere. Flat triangular sides meeting at a point = pyramid.",
      },
      practice: {
        easy: {
          question: "Name the shape: every point on its surface is equidistant from the centre.",
          answer: "A sphere.",
        },
        medium: {
          question: "Name the shape: one triangular base, other sides are rectangles.",
          answer: "A triangular prism.",
        },
        hard: {
          question:
            "A shape has 1 vertex and 1 curved surface with a polygonal base. What is it, and how is it different from a shape with 1 vertex and a fully curved surface?",
          answer:
            "A cone has a circular (polygonal-like curved) base and one apex. A sphere has no vertex at all — every point curves equally, with no flat base or point.",
        },
      },
      realLife: ["📦 Packaging design", "🏛️ Architecture"],
    },
    {
      num: "6.2",
      title: "Nets of Three-Dimensional Shapes",
      blocks: [
        {
          ideaParagraphs: [
            "A net is what you get when you unfold a 3D shape flat, so every face lies open. Fold it back along the lines, and it becomes 3D again.",
          ],
          visual: {
            kind: "cubeNet",
            caption:
              "6 squares in a cross — fold along every edge and the cube closes up perfectly",
          },
          formula: { formula: "The same shape can have MORE than one valid net" },
        },
      ],
      worked: {
        question: "A cylinder's net is made of which shapes?",
        steps: [
          {
            calc: "2 circles (the bases) + 1 curved rectangle (the side)",
            why: "Unroll a cylinder's curved side and it flattens into a rectangle, with width equal to the circumference.",
          },
        ],
      },
      guided: {
        question: "What shapes make up the net of a cone?",
        answer:
          "One circle (the base) plus one curved sector (the side that wraps around to a point).",
      },
      mistake: {
        wrong: "Assuming a cube has only ONE possible net.",
        right:
          "A cube has 11 different valid nets — as long as all 6 squares connect and fold up correctly, it works.",
      },
      practice: {
        easy: { question: "How many square faces does a cube's net have?", answer: "6" },
        medium: {
          question: "What shapes make up the net of a square-based pyramid?",
          answer: "1 square base + 4 triangles.",
        },
        hard: {
          question: "A triangular prism's net is made of which shapes, and how many of each?",
          answer: "2 triangles (the two identical bases) + 3 rectangles (the sides).",
        },
      },
      realLife: ["📦 Cardboard box design", "🎁 Gift box templates"],
    },
    {
      num: "6.3",
      title: "Surface Area of Three-Dimensional Shapes",
      blocks: [
        {
          ideaParagraphs: [
            "Since the net IS the shape laid flat, its surface area is just the total area of every flat face in that net, added together.",
          ],
          formula: { eyebrow: "Cuboid", formula: "Surface area = sum of all 6 rectangle faces" },
        },
      ],
      worked: {
        question: "Find the surface area of a cuboid 5 cm × 4 cm × 3 cm.",
        steps: [
          { calc: "Top+bottom: 2×(5×4)=40", why: "The two 5cm×4cm faces." },
          { calc: "Front+back: 2×(5×3)=30", why: "The two 5cm×3cm faces." },
          { calc: "Left+right: 2×(4×3)=24", why: "The two 4cm×3cm faces." },
          { calc: "Total = 40+30+24 = 94 cm²", why: "Add up all 6 faces from the net." },
        ],
      },
      guided: {
        question:
          "A closed cylinder has radius 7 cm and height 10 cm. Its net is 2 circles + 1 rectangle (width = circumference). Find its surface area (π=22/7).",
        answer:
          "2 circles = 2×22/7×49=308. Rectangle = circumference×height = (2×22/7×7)×10=440. Total = 748 cm².",
      },
      mistake: {
        wrong:
          "Forgetting to double the base area for prisms and cylinders (there are TWO identical bases).",
        right:
          "Picture the net — if it has 2 base faces, count both. If it has 1 (like a pyramid or cone), count only 1.",
      },
      practice: {
        easy: {
          question: "Find the surface area of a cube with side 4 cm.",
          answer: "6 × 4² = 96 cm²",
        },
        medium: {
          question:
            "A square pyramid has base 6cm×6cm and each triangular face has area 15cm². Find total surface area.",
          answer: "36 + 4×15 = 96 cm²",
        },
        hard: {
          question:
            "A closed cone has radius 3 cm and slant height 5 cm. Surface area = πr² + πrs. Find it (π=3.142).",
          answer: "3.142×9 + 3.142×3×5 = 28.28+47.13 = 75.41 cm²",
        },
      },
      realLife: ["🎁 Gift wrapping", "🎨 Paint needed for a surface"],
    },
    {
      num: "6.4",
      title: "Volume of Three-Dimensional Shapes",
      blocks: [
        {
          ideaParagraphs: [
            "Stack identical coin-shaped discs on top of each other and you build a cylinder. For ANY prism or cylinder, volume is just the base area, stacked up to the full height.",
          ],
          formula: { eyebrow: "Prisms and Cylinders", formula: "Volume = Base Area × Height" },
        },
        {
          ideaTag: "Pyramids and Cones — Exactly ⅓",
          ideaParagraphs: [
            "Fill a cone with sand, then pour it into a same-size cylinder. It takes exactly THREE cones to fill that cylinder — so a cone always holds exactly ⅓ of the matching cylinder's volume. The same ⅓ relationship holds between a pyramid and a prism sharing the same base and height.",
          ],
          visual: {
            kind: "coneCylinderVolume",
            caption:
              "3 cones of sand exactly fill 1 same-size-base, same-height cylinder — so cone volume = ⅓ cylinder volume",
          },
          formula: { eyebrow: "Pyramids and Cones", formula: "Volume = ⅓ × Base Area × Height" },
        },
      ],
      worked: {
        question: "Find the volume of a cylinder with radius 7 cm and height 20 cm (π=22/7).",
        steps: [
          { calc: "Base area = πr² = 22/7 × 49 = 154", why: "Find the circular base area first." },
          {
            calc: "Volume = 154 × 20 = 3080 cm³",
            why: "Multiply base area by height — stacking that circle up to the full height.",
          },
        ],
      },
      guided: {
        question: "A square-based pyramid has base 6cm×6cm and height 10cm. Find its volume.",
        answer: "⅓ × 36 × 10 = 120 cm³.",
      },
      mistake: {
        wrong: "Forgetting the ⅓ for pyramids and cones — treating them like prisms.",
        right:
          "A shape coming to a POINT (apex) always needs the ⅓. A shape with two identical flat ends does not.",
      },
      practice: {
        easy: { question: "Find the volume of a cuboid 5cm×4cm×3cm.", answer: "60 cm³" },
        medium: {
          question: "Find the volume of a cone with radius 6cm and height 14cm (π=22/7).",
          answer: "⅓×22/7×36×14 = 528 cm³",
        },
        hard: {
          question:
            "A triangular prism has cross-section area 24cm² and length 15cm. A cone of the same volume has base radius 6cm. Find the cone's height (π=3.142).",
          answer: "Prism volume=24×15=360. ⅓×3.142×36×h=360. h≈9.55 cm.",
        },
      },
      realLife: ["🥤 Drink can capacity", "🍦 Ice cream cone volume"],
    },
  ],
  summary: {
    center: "3D Shapes",
    branches: [
      { title: "Properties & Nets", points: ["Flat pattern unfolds into the 3D shape"] },
      { title: "Surface Area", points: ["Sum of all net faces"] },
      { title: "Volume", points: ["Base×height; ⅓ for pointed shapes"] },
    ],
  },
  formulaSheet: [
    { formula: "base area × height", label: "Prism/Cylinder Volume" },
    { formula: "⅓ × base area × height", label: "Pyramid/Cone Volume" },
    { formula: "sum of net's face areas", label: "Surface Area" },
  ],
  quickRevision: [
    "I can classify 3D shapes by their geometric properties.",
    "I can draw and analyse nets of 3D shapes.",
    "I can find surface area and volume of 3D shapes.",
  ],
  examTips: [
    "Sketch the net before calculating surface area — it stops you missing or doubling a face.",
    "Pointed shape (apex)? Multiply by ⅓. Two identical ends? Don't.",
  ],
  challenge: {
    question:
      "A cylindrical can (radius 5cm, height 12cm) is melted down and recast into cones of radius 3cm and height 4cm. How many cones can be made?",
    answer:
      "Cylinder volume = π×25×12=300π. Cone volume = ⅓×π×9×4=12π. Number of cones = 300π÷12π = 25.",
  },
};

const bm: MathF2C6Content = {
  subtopics: [
    {
      num: "6.1",
      title: "Sifat Geometri Bentuk Tiga Matra",
      blocks: [
        {
          ideaParagraphs: [
            "Setiap bentuk 3D di sini dibina daripada bentuk 2D rata. Apa yang bezakannya ialah bentuk TAPAK dan sama ada sisinya rata atau melengkung.",
          ],
          visual: {
            kind: "shapeIcons",
            labels: {
              prism: "Prisma",
              pyramid: "Piramid",
              cylinder: "Silinder",
              cone: "Kon",
              sphere: "Sfera",
            },
            caption:
              "Sisi rata lwn permukaan melengkung, satu tapak lwn dua — itu yang bezakan setiap bentuk",
          },
          formula: {
            eyebrow: "Prisma lwn Piramid",
            formula: "Prisma: 2 tapak serupa. Piramid: 1 tapak + hujung (apeks).",
          },
        },
      ],
      worked: {
        question: "Namakan bentuk: 2 tapak bulat, 1 permukaan melengkung, tiada apeks.",
        steps: [
          {
            calc: "2 tapak bulat + permukaan melengkung + tiada apeks = silinder",
            why: "Dua bulatan (bukan satu) menyingkirkan kon, dan tiada titik/apeks menyingkirkan piramid.",
          },
        ],
      },
      guided: {
        question: "Adakah kubus prisma? Jelaskan.",
        answer:
          "Ya — kubus ada 2 tapak segi empat sama serupa (atas dan bawah) dengan keratan rentas seragam — itu memenuhi definisi prisma.",
      },
      mistake: {
        wrong:
          "Mengelirukan kon (1 apeks, permukaan melengkung) dengan piramid (apeks, tetapi sisi segi tiga RATA).",
        right:
          "Permukaan melengkung = kon atau silinder atau sfera. Sisi segi tiga rata bertemu di satu titik = piramid.",
      },
      practice: {
        easy: {
          question: "Namakan bentuk: setiap titik permukaannya sama jarak dari pusat.",
          answer: "Sfera.",
        },
        medium: {
          question: "Namakan bentuk: satu tapak segi tiga, sisi lain segi empat tepat.",
          answer: "Prisma segi tiga.",
        },
        hard: {
          question:
            "Bentuk ada 1 bucu dan 1 permukaan melengkung dengan tapak poligon. Apakah ia, dan bagaimana ia berbeza daripada bentuk 1 bucu dan permukaan melengkung sepenuhnya?",
          answer:
            "Kon ada tapak bulat dan satu apeks. Sfera tiada bucu langsung — setiap titik melengkung sama rata, tiada tapak rata atau titik.",
        },
      },
      realLife: ["📦 Reka bentuk pembungkusan", "🏛️ Senibina"],
    },
    {
      num: "6.2",
      title: "Bentangan Bentuk Tiga Matra",
      blocks: [
        {
          ideaParagraphs: [
            "Bentangan ialah apa yang anda dapat bila membuka bentuk 3D rata, supaya setiap muka terbuka. Lipat semula sepanjang garis, dan ia menjadi 3D semula.",
          ],
          visual: {
            kind: "cubeNet",
            caption:
              "6 segi empat sama bentuk salib — lipat sepanjang setiap tepi dan kubus tertutup sempurna",
          },
          formula: { formula: "Bentuk sama boleh ada LEBIH daripada satu bentangan sah" },
        },
      ],
      worked: {
        question: "Bentangan silinder dibina daripada bentuk apa?",
        steps: [
          {
            calc: "2 bulatan (tapak) + 1 segi empat tepat melengkung (sisi)",
            why: "Buka sisi melengkung silinder dan ia rata menjadi segi empat tepat, dengan lebar bersamaan lilitan.",
          },
        ],
      },
      guided: {
        question: "Bentuk apa membina bentangan kon?",
        answer:
          "Satu bulatan (tapak) tambah satu sektor melengkung (sisi yang membalut ke satu titik).",
      },
      mistake: {
        wrong: "Menganggap kubus hanya ada SATU bentangan mungkin.",
        right:
          "Kubus ada 11 bentangan sah berbeza — asalkan kesemua 6 segi empat sama bersambung dan lipat dengan betul, ia berfungsi.",
      },
      practice: {
        easy: { question: "Berapa muka segi empat sama ada bentangan kubus?", answer: "6" },
        medium: {
          question: "Bentuk apa membina bentangan piramid tapak segi empat sama?",
          answer: "1 tapak segi empat sama + 4 segi tiga.",
        },
        hard: {
          question:
            "Bentangan prisma segi tiga dibina daripada bentuk apa, dan berapa setiap satu?",
          answer: "2 segi tiga (dua tapak serupa) + 3 segi empat tepat (sisi).",
        },
      },
      realLife: ["📦 Reka bentuk kotak kadbod", "🎁 Templat kotak hadiah"],
    },
    {
      num: "6.3",
      title: "Luas Permukaan Bentuk Tiga Matra",
      blocks: [
        {
          ideaParagraphs: [
            "Oleh kerana bentangan IALAH bentuk dibaringkan rata, luas permukaannya hanyalah jumlah luas setiap muka rata dalam bentangan itu, ditambah bersama.",
          ],
          formula: {
            eyebrow: "Kuboid",
            formula: "Luas permukaan = jumlah semua 6 muka segi empat tepat",
          },
        },
      ],
      worked: {
        question: "Cari luas permukaan kuboid 5 cm × 4 cm × 3 cm.",
        steps: [
          { calc: "Atas+bawah: 2×(5×4)=40", why: "Dua muka 5cm×4cm." },
          { calc: "Depan+belakang: 2×(5×3)=30", why: "Dua muka 5cm×3cm." },
          { calc: "Kiri+kanan: 2×(4×3)=24", why: "Dua muka 4cm×3cm." },
          { calc: "Jumlah = 40+30+24 = 94 cm²", why: "Tambah kesemua 6 muka daripada bentangan." },
        ],
      },
      guided: {
        question:
          "Silinder tertutup ada jejari 7 cm dan tinggi 10 cm. Bentangannya 2 bulatan + 1 segi empat tepat (lebar = lilitan). Cari luas permukaan (π=22/7).",
        answer:
          "2 bulatan = 2×22/7×49=308. Segi empat tepat = lilitan×tinggi = (2×22/7×7)×10=440. Jumlah = 748 cm².",
      },
      mistake: {
        wrong: "Terlupa gandakan luas tapak untuk prisma dan silinder (ada DUA tapak serupa).",
        right:
          "Bayangkan bentangan — jika ada 2 muka tapak, kira kedua-dua. Jika ada 1 (seperti piramid atau kon), kira 1 sahaja.",
      },
      practice: {
        easy: { question: "Cari luas permukaan kubus bersisi 4 cm.", answer: "6 × 4² = 96 cm²" },
        medium: {
          question:
            "Piramid segi empat sama tapak 6cm×6cm dan setiap muka segi tiga luas 15cm². Cari jumlah luas permukaan.",
          answer: "36 + 4×15 = 96 cm²",
        },
        hard: {
          question:
            "Kon tertutup jejari 3 cm dan tinggi condong 5 cm. Luas permukaan = πr² + πrs. Cari (π=3.142).",
          answer: "3.142×9 + 3.142×3×5 = 28.28+47.13 = 75.41 cm²",
        },
      },
      realLife: ["🎁 Membalut hadiah", "🎨 Cat diperlukan untuk permukaan"],
    },
    {
      num: "6.4",
      title: "Isipadu Bentuk Tiga Matra",
      blocks: [
        {
          ideaParagraphs: [
            "Susun cakera berbentuk syiling serupa di atas satu sama lain dan anda bina silinder. Untuk SEBARANG prisma atau silinder, isipadu hanyalah luas tapak, disusun sehingga ketinggian penuh.",
          ],
          formula: { eyebrow: "Prisma dan Silinder", formula: "Isipadu = Luas Tapak × Tinggi" },
        },
        {
          ideaTag: "Piramid dan Kon — Tepat ⅓",
          ideaParagraphs: [
            "Isi kon dengan pasir, kemudian tuang ke silinder saiz sama. Ia mengambil tepat TIGA kon untuk isi silinder itu — jadi kon sentiasa mengandungi tepat ⅓ isipadu silinder sepadan. Perhubungan ⅓ sama berlaku antara piramid dan prisma berkongsi tapak dan tinggi sama.",
          ],
          visual: {
            kind: "coneCylinderVolume",
            caption:
              "3 kon pasir tepat mengisi 1 silinder tapak sama, tinggi sama — jadi isipadu kon = ⅓ isipadu silinder",
          },
          formula: { eyebrow: "Piramid dan Kon", formula: "Isipadu = ⅓ × Luas Tapak × Tinggi" },
        },
      ],
      worked: {
        question: "Cari isipadu silinder berjejari 7 cm dan tinggi 20 cm (π=22/7).",
        steps: [
          { calc: "Luas tapak = πr² = 22/7 × 49 = 154", why: "Cari luas tapak bulat dahulu." },
          {
            calc: "Isipadu = 154 × 20 = 3080 cm³",
            why: "Darab luas tapak dengan tinggi — menyusun bulatan itu sehingga tinggi penuh.",
          },
        ],
      },
      guided: {
        question: "Piramid tapak segi empat sama 6cm×6cm dan tinggi 10cm. Cari isipadunya.",
        answer: "⅓ × 36 × 10 = 120 cm³.",
      },
      mistake: {
        wrong: "Terlupa ⅓ untuk piramid dan kon — melayan seperti prisma.",
        right:
          "Bentuk yang meruncing ke SATU TITIK (apeks) sentiasa perlukan ⅓. Bentuk dengan dua hujung rata serupa tidak.",
      },
      practice: {
        easy: { question: "Cari isipadu kuboid 5cm×4cm×3cm.", answer: "60 cm³" },
        medium: {
          question: "Cari isipadu kon berjejari 6cm dan tinggi 14cm (π=22/7).",
          answer: "⅓×22/7×36×14 = 528 cm³",
        },
        hard: {
          question:
            "Prisma segi tiga keratan rentas 24cm² dan panjang 15cm. Kon isipadu sama jejari tapak 6cm. Cari tinggi kon (π=3.142).",
          answer: "Isipadu prisma=24×15=360. ⅓×3.142×36×h=360. h≈9.55 cm.",
        },
      },
      realLife: ["🥤 Muatan tin minuman", "🍦 Isipadu kon aiskrim"],
    },
  ],
  summary: {
    center: "Bentuk 3D",
    branches: [
      { title: "Sifat & Bentangan", points: ["Corak rata terbuka menjadi bentuk 3D"] },
      { title: "Luas Permukaan", points: ["Jumlah semua muka bentangan"] },
      { title: "Isipadu", points: ["Tapak×tinggi; ⅓ untuk bentuk runcing"] },
    ],
  },
  formulaSheet: [
    { formula: "luas tapak × tinggi", label: "Isipadu Prisma/Silinder" },
    { formula: "⅓ × luas tapak × tinggi", label: "Isipadu Piramid/Kon" },
    { formula: "jumlah luas muka bentangan", label: "Luas Permukaan" },
  ],
  quickRevision: [
    "Saya boleh mengelaskan bentuk 3D mengikut sifat geometri.",
    "Saya boleh melukis dan menganalisis bentangan bentuk 3D.",
    "Saya boleh cari luas permukaan dan isipadu bentuk 3D.",
  ],
  examTips: [
    "Lakar bentangan sebelum mengira luas permukaan — ia elak anda terlepas atau gandakan muka.",
    "Bentuk runcing (apeks)? Darab dengan ⅓. Dua hujung serupa? Jangan.",
  ],
  challenge: {
    question:
      "Tin silinder (jejari 5cm, tinggi 12cm) dileburkan dan dibentuk semula menjadi kon jejari 3cm dan tinggi 4cm. Berapa kon boleh dibuat?",
    answer:
      "Isipadu silinder = π×25×12=300π. Isipadu kon = ⅓×π×9×4=12π. Bilangan kon = 300π÷12π = 25.",
  },
};

export const mathF2C6InteractiveContent: { en: MathF2C6Content; bm: MathF2C6Content } = { en, bm };
