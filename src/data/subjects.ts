export type Form = "Form 1" | "Form 2" | "Form 3";

export interface Subject {
  id: string;
  name: string;
  emoji: string;
  color: string; // tailwind gradient classes
  description: string;
  tagline: string;
}

export const subjects: Subject[] = [
  {
    id: "bm",
    name: "Bahasa Melayu",
    emoji: "📘",
    color: "from-rose-500 to-orange-500",
    description: "Tatabahasa, karangan, dan kefahaman.",
    tagline: "Kuasai bahasa kebangsaan!",
  },
  {
    id: "english",
    name: "English",
    emoji: "🇬🇧",
    color: "from-sky-500 to-blue-600",
    description: "Grammar, comprehension, and writing.",
    tagline: "Level up your English!",
  },
  {
    id: "math",
    name: "Mathematics",
    emoji: "📐",
    color: "from-indigo-500 to-purple-600",
    description: "Algebra, geometry, statistics, and more.",
    tagline: "Solve it like a pro!",
  },
  {
    id: "science",
    name: "Science",
    emoji: "🔬",
    color: "from-emerald-500 to-teal-600",
    description: "Biology, chemistry, and physics basics.",
    tagline: "Explore the universe!",
  },
  {
    id: "sejarah",
    name: "Sejarah",
    emoji: "🏛️",
    color: "from-amber-500 to-yellow-500",
    description: "Tamadun, kemerdekaan, dan warisan negara.",
    tagline: "Jelajah masa lampau!",
  },
  {
    id: "geography",
    name: "Geography",
    emoji: "🌏",
    color: "from-cyan-500 to-emerald-500",
    description: "Physical & human geography of the world.",
    tagline: "Discover the world!",
  },
];

export const forms: Form[] = ["Form 1", "Form 2", "Form 3"];

export interface Note {
  id: string;
  subjectId: string;
  form: Form;
  chapter: string;
  title: string;
  summary: string;
  keywords: string[];
  lang?: "bm" | "dlp";
}

export interface ScienceNotesSubsection {
  title?: string;
  content?: string;
  bulletPoints?: string[];
  table?: {
    headers: string[];
    rows: string[][];
  };
  formula?: string;
}

export interface ScienceNotesSection {
  title: string;
  subsections?: ScienceNotesSubsection[];
  content?: string;
}

export interface ScienceChapter2Notes {
  quickRevision: string[];
  sections: ScienceNotesSection[];
  keyExamFacts: string[];
  keyTerms?: string[];
  chapterSummary?: string;
}

export const scienceF1C2NotesBM: ScienceChapter2Notes = {
  quickRevision: [
    "Sel ialah unit asas semua benda hidup.",
    "Fungsi sel termasuk pertumbuhan, respirasi, pembiakan, dan perkumuhan.",
    "Pembahagian sel menghasilkan sel baru untuk pertumbuhan dan menggantikan sel yang rosak.",
    "Mikroskop digunakan untuk membesarkan objek yang sangat kecil.",
    "Respirasi sel berlaku dalam mitokondria untuk membebaskan tenaga.",
    "Fotosintesis berlaku dalam kloroplas untuk menghasilkan makanan bagi tumbuhan.",
  ],
  sections: [
    {
      title: "1. Pengenalan kepada Sel",
      subsections: [
        {
          title: "Apakah itu Sel?",
          content: "Sel ialah unit asas bagi semua organisma hidup.",
        },
        {
          title: "Fungsi Sel",
          bulletPoints: ["Pertumbuhan", "Respirasi", "Pembiakan", "Perkumuhan"],
        },
        {
          title: "Pembahagian Sel",
          bulletPoints: [
            "Menghasilkan sel baru untuk pertumbuhan.",
            "Menggantikan sel yang rosak atau mati.",
            "Satu sel membahagi menjadi dua sel secara berulang.",
          ],
        },
        {
          title: "Sel Kanser",
          bulletPoints: [
            "Terbentuk apabila sel membahagi secara berterusan dan tanpa kawalan.",
            "Boleh menghasilkan tumor (jisim sel yang tidak normal).",
          ],
        },
      ],
    },
    {
      title: "2. Mikroskop",
      subsections: [
        {
          title: "Definisi",
          content: "Mikroskop ialah instrumen yang digunakan untuk membesarkan objek yang sangat kecil.",
        },
        {
          title: "Bahagian dan Fungsi",
          table: {
            headers: ["Bahagian", "Fungsi"],
            rows: [
              ["Kanta Mata", "Membesarkan spesimen (biasanya 10×)"],
              ["Kanta Objektif", "Membesarkan spesimen (4×, 10×, 40×)"],
              ["Tombol Fokus Kasar", "Pemfokusan awal di bawah kuasa rendah"],
              ["Tombol Fokus Halus", "Pemfokusan tajam"],
              ["Diafragma", "Mengawal jumlah cahaya"],
              ["Cermin", "Memantulkan cahaya ke atas spesimen"],
            ],
          },
        },
        {
          title: "Pengendalian yang Betul",
          bulletPoints: [
            "Bawa menggunakan kedua-dua belah tangan.",
            "Mulakan pemfokusan dengan kanta objektif kuasa rendah.",
            "Kendalikan dengan berhati-hati untuk mengelakkan kerosakan.",
          ],
        },
      ],
    },
    {
      title: "3. Struktur dan Fungsi Sel",
      subsections: [
        {
          title: "Protoplasma",
          content: "Terdiri daripada:",
          bulletPoints: ["Nukleus", "Sitoplasma"],
        },
        {
          title: "Struktur Sel",
          table: {
            headers: ["Struktur", "Fungsi"],
            rows: [
              ["Nukleus", "Mengawal semua aktiviti sel dan menyimpan maklumat genetik"],
              ["Sitoplasma", "Tapak tindak balas kimia"],
              ["Membran Sel", "Mengawal pergerakan bahan masuk dan keluar"],
              ["Mitokondria", "Menghasilkan tenaga"],
              ["Dinding Sel", "Memberi sokongan dan perlindungan (sel tumbuhan sahaja)"],
              ["Kloroplas", "Mengandungi klorofil untuk fotosintesis (sel tumbuhan sahaja)"],
              ["Vakuol", "Menyimpan sap sel dan bahan buangan (sel tumbuhan sahaja)"],
            ],
          },
        },
        {
          title: "Sel Tumbuhan vs Sel Haiwan",
          bulletPoints: [
            "Sel Tumbuhan: Bentuk tetap, mempunyai dinding sel, mempunyai kloroplas, vakuol besar.",
            "Sel Haiwan: Bentuk tidak tetap, tiada dinding sel, tiada kloroplas, vakuol kecil.",
          ],
        },
      ],
    },
    {
      title: "4. Organisma Unisel dan Multisel",
      subsections: [
        {
          title: "Organisma Unisel",
          content: "Terdiri daripada satu sel sahaja.",
          bulletPoints: ["Amoeba", "Paramecium", "Euglena", "Chlamydomonas", "Yis"],
        },
        {
          title: "Organisma Multisel",
          content: "Terdiri daripada banyak sel yang bekerjasama.",
          bulletPoints: ["Manusia", "Burung", "Ikan", "Hydra", "Spirogyra", "Mucor"],
        },
      ],
    },
    {
      title: "5. Organisasi Sel dalam Manusia",
      subsections: [
        {
          title: "Tahap Organisasi",
          content: "Sel → Tisu → Organ → Sistem → Organisma",
        },
        {
          title: "Jenis Sel Manusia",
          bulletPoints: [
            "Sel Epitelium: Melindungi permukaan badan, menghasilkan mukus.",
            "Sel Otot: Membolehkan pergerakan, mengecut dan mengendur.",
            "Sel Saraf: Membawa impuls elektrik, menyelaraskan gerak balas badan.",
            "Sel Darah Merah: Mengangkut oksigen, tiada nukleus, bentuk dwicekung.",
            "Sel Darah Putih: Mempertahankan badan daripada patogen, menyokong imuniti.",
            "Sel Pembiakan: Sperma dan ovum, terlibat dalam persenyawaan.",
          ],
        },
      ],
    },
    {
      title: "6. Sistem Badan Utama",
      subsections: [
        {
          title: "Sistem Pencernaan",
          content: "Memproses makanan melalui pencernaan dan penyerapan.",
        },
        {
          title: "Sistem Respirasi",
          content: "Membekalkan oksigen dan menyingkirkan karbon dioksida.",
        },
        {
          title: "Sistem Peredaran Darah",
          content: "Mengangkut nutrien, oksigen, dan hormon.",
        },
        {
          title: "Sistem Rangka",
          content: "Memberi sokongan dan perlindungan.",
        },
        {
          title: "Sistem Saraf",
          content: "Menyelaraskan gerak balas terhadap rangsangan.",
        },
        {
          title: "Sistem Perkumuhan",
          content: "Menyingkirkan bahan buangan daripada badan.",
        },
        {
          title: "Sistem Limfatik",
          content: "Membantu mempertahankan badan daripada jangkitan.",
        },
      ],
    },
    {
      title: "7. Respirasi Sel dan Fotosintesis",
      subsections: [
        {
          title: "Respirasi Sel",
          content: "Berlaku dalam mitokondria.",
          formula: "Glukosa + Oksigen → Karbon Dioksida + Air + Tenaga",
          bulletPoints: [
            "Membebaskan tenaga",
            "Berlaku dalam semua sel hidup",
            "Berlaku secara berterusan",
          ],
        },
        {
          title: "Fotosintesis",
          content: "Berlaku dalam kloroplas.",
          formula: "Karbon Dioksida + Air + Tenaga Cahaya → Glukosa + Oksigen",
          bulletPoints: [
            "Menghasilkan makanan untuk tumbuhan",
            "Memerlukan cahaya matahari",
            "Menyimpan tenaga sebagai glukosa",
          ],
        },
        {
          title: "Perbandingan",
          table: {
            headers: ["Respirasi Sel", "Fotosintesis"],
            rows: [
              ["Membebaskan tenaga", "Menyimpan tenaga"],
              ["Berlaku dalam semua sel hidup", "Berlaku dalam tumbuhan hijau"],
              ["Berlaku sepanjang masa", "Memerlukan cahaya"],
              ["Menggunakan oksigen", "Menghasilkan oksigen"],
            ],
          },
        },
      ],
    },
  ],
  keyExamFacts: [
    "Sel = Unit asas hidupan",
    "Nukleus mengawal aktiviti sel",
    "Mitokondria menghasilkan tenaga",
    "Kloroplas menjalankan fotosintesis",
    "Sel → Tisu → Organ → Sistem → Organisma",
    "Fotosintesis berlaku di kloroplas",
    "Respirasi berlaku di mitokondria",
  ],
  keyTerms: [
    "Sel",
    "Nukleus",
    "Sitoplasma",
    "Membran Sel",
    "Mitokondria",
    "Kloroplas",
    "Vakuol",
    "Mikroskop",
    "Fotosintesis",
    "Respirasi",
  ],
  chapterSummary: "Bab 2 meneroka sel sebagai unit asas hidupan, merangkumi strukturnya, penggunaan mikroskop, organisma unisel dan multisel, organisasi berhierarki sistem badan manusia, serta proses penting respirasi dan fotosintesis.",
};

export const scienceF1C2NotesDLP: ScienceChapter2Notes = {
  quickRevision: [
    "A cell is the basic unit of all living organisms.",
    "Functions of cells include growth, respiration, reproduction, and excretion.",
    "Cell division produces new cells for growth and replaces damaged cells.",
    "Microscopes are used to magnify very small objects.",
    "Cell respiration occurs in mitochondria to release energy.",
    "Photosynthesis occurs in chloroplasts to produce food for plants.",
  ],
  sections: [
    {
      title: "1. Introduction to Cells",
      subsections: [
        {
          title: "What is a Cell?",
          content: "A cell is the basic unit of all living organisms.",
        },
        {
          title: "Functions of Cells",
          bulletPoints: ["Growth", "Respiration", "Reproduction", "Excretion"],
        },
        {
          title: "Cell Division",
          bulletPoints: [
            "Produces new cells for growth.",
            "Replaces damaged or dead cells.",
            "One cell divides into two cells repeatedly.",
          ],
        },
        {
          title: "Cancer Cells",
          bulletPoints: [
            "Form when cells divide continuously and uncontrollably.",
            "Can produce a tumour (abnormal mass of cells).",
          ],
        },
      ],
    },
    {
      title: "2. The Microscope",
      subsections: [
        {
          title: "Definition",
          content: "A microscope is an instrument used to magnify very small objects.",
        },
        {
          title: "Parts and Functions",
          table: {
            headers: ["Part", "Function"],
            rows: [
              ["Eyepiece", "Magnifies specimen (usually 10×)"],
              ["Objective Lens", "Magnifies specimen (4×, 10×, 40×)"],
              ["Rough Focus Knob", "Initial focusing under low power"],
              ["Fine Focus Knob", "Sharp focusing"],
              ["Diaphragm", "Controls amount of light"],
              ["Mirror", "Reflects light onto specimen"],
            ],
          },
        },
        {
          title: "Proper Handling",
          bulletPoints: [
            "Carry using both hands.",
            "Start focusing with low-power objective lens.",
            "Handle carefully to avoid damage.",
          ],
        },
      ],
    },
    {
      title: "3. Cell Structure and Functions",
      subsections: [
        {
          title: "Protoplasm",
          content: "Consists of:",
          bulletPoints: ["Nucleus", "Cytoplasm"],
        },
        {
          title: "Cell Structures",
          table: {
            headers: ["Structure", "Function"],
            rows: [
              ["Nucleus", "Controls all cell activities and stores genetic information"],
              ["Cytoplasm", "Site of chemical reactions"],
              ["Cell Membrane", "Controls movement of substances in and out"],
              ["Mitochondria", "Produces energy"],
              ["Cell Wall", "Provides support and protection (plant cells only)"],
              ["Chloroplast", "Contains chlorophyll for photosynthesis (plant cells only)"],
              ["Vacuole", "Stores cell sap and waste materials (plant cells only)"],
            ],
          },
        },
        {
          title: "Plant Cell vs Animal Cell",
          bulletPoints: [
            "Plant Cell: Regular shape, cell wall present, chloroplast present, large vacuole.",
            "Animal Cell: Irregular shape, no cell wall, no chloroplast, small vacuoles.",
          ],
        },
      ],
    },
    {
      title: "4. Unicellular and Multicellular Organisms",
      subsections: [
        {
          title: "Unicellular Organisms",
          content: "Made up of one cell only.",
          bulletPoints: ["Amoeba", "Paramecium", "Euglena", "Chlamydomonas", "Yeast"],
        },
        {
          title: "Multicellular Organisms",
          content: "Made up of many cells working together.",
          bulletPoints: ["Humans", "Birds", "Fish", "Hydra", "Spirogyra", "Mucor"],
        },
      ],
    },
    {
      title: "5. Cell Organisation in Humans",
      subsections: [
        {
          title: "Levels of Organisation",
          content: "Cell → Tissue → Organ → System → Organism",
        },
        {
          title: "Types of Human Cells",
          bulletPoints: [
            "Epithelial Cell: Protects body surfaces, produces mucus.",
            "Muscle Cell: Enables movement, contracts and relaxes.",
            "Nerve Cell: Carries electrical impulses, coordinates body responses.",
            "Red Blood Cell: Transports oxygen, no nucleus, biconcave shape.",
            "White Blood Cell: Defends against pathogens, supports immunity.",
            "Reproductive Cells: Sperm and ovum, involved in fertilisation.",
          ],
        },
      ],
    },
    {
      title: "6. Main Body Systems",
      subsections: [
        {
          title: "Digestive System",
          content: "Processes food through digestion and absorption.",
        },
        {
          title: "Respiratory System",
          content: "Supplies oxygen and removes carbon dioxide.",
        },
        {
          title: "Circulatory System",
          content: "Transports nutrients, oxygen, and hormones.",
        },
        {
          title: "Skeletal System",
          content: "Provides support and protection.",
        },
        {
          title: "Nervous System",
          content: "Coordinates responses to stimuli.",
        },
        {
          title: "Excretory System",
          content: "Removes waste products from the body.",
        },
        {
          title: "Lymphatic System",
          content: "Helps defend against infections.",
        },
      ],
    },
    {
      title: "7. Cell Respiration and Photosynthesis",
      subsections: [
        {
          title: "Cell Respiration",
          content: "Occurs in mitochondria.",
          formula: "Glucose + Oxygen → Carbon Dioxide + Water + Energy",
          bulletPoints: [
            "Releases energy",
            "Occurs in all living cells",
            "Happens continuously",
          ],
        },
        {
          title: "Photosynthesis",
          content: "Occurs in chloroplasts.",
          formula: "Carbon Dioxide + Water + Light Energy → Glucose + Oxygen",
          bulletPoints: [
            "Produces food for plants",
            "Requires sunlight",
            "Stores energy as glucose",
          ],
        },
        {
          title: "Comparison",
          table: {
            headers: ["Cell Respiration", "Photosynthesis"],
            rows: [
              ["Releases energy", "Stores energy"],
              ["Occurs in all living cells", "Occurs in green plants"],
              ["Happens all the time", "Requires light"],
              ["Uses oxygen", "Produces oxygen"],
            ],
          },
        },
      ],
    },
  ],
  keyExamFacts: [
    "Cell = Basic unit of life",
    "Nucleus controls cell activities",
    "Mitochondria produce energy",
    "Chloroplast carries out photosynthesis",
    "Cell → Tissue → Organ → System → Organism",
    "Photosynthesis occurs in chloroplasts",
    "Respiration occurs in mitochondria",
  ],
  keyTerms: [
    "Cell",
    "Nucleus",
    "Cytoplasm",
    "Cell Membrane",
    "Mitochondria",
    "Chloroplast",
    "Vacuole",
    "Microscope",
    "Photosynthesis",
    "Respiration",
  ],
  chapterSummary: "Chapter 2 explores the cell as the fundamental unit of life, covering its structure, the use of microscopes, unicellular and multicellular organisms, the hierarchical organization of human body systems, and the vital processes of respiration and photosynthesis.",
};

export { scienceF1C3NotesBM } from "./science-f1-c3-notes-bm";
export { scienceF1C3NotesDLP } from "./science-f1-c3-notes-dlp";
export { scienceF1C4NotesBM } from "./science-f1-c4-notes-bm";
export { scienceF1C4NotesDLP } from "./science-f1-c4-notes-dlp";
export { scienceF1C5NotesBM } from "./science-f1-c5-notes-bm";
export { scienceF1C5NotesDLP } from "./science-f1-c5-notes-dlp";
export { scienceF1C6NotesBM } from "./science-f1-c6-notes-bm";
export { scienceF1C6NotesDLP } from "./science-f1-c6-notes-dlp";
export { scienceF1C7NotesBM } from "./science-f1-c7-notes-bm";
export { scienceF1C7NotesDLP } from "./science-f1-c7-notes-dlp";
export { scienceF1C8NotesBM } from "./science-f1-c8-notes-bm";
export { scienceF1C8NotesDLP } from "./science-f1-c8-notes-dlp";
