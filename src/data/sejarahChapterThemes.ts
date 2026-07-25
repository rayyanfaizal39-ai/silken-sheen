import type { Form } from "@/data/subjects-meta";

export type SejarahMotif =
  | "archive"
  | "glacier"
  | "prehistoric"
  | "civilisation"
  | "ancient-world"
  | "classical"
  | "asian-empires"
  | "islamic-world"
  | "maritime-kingdom"
  | "royal-economy"
  | "court-culture"
  | "sacred-heritage"
  | "melaka-port"
  | "johor-riau"
  | "royal-states"
  | "northern-states"
  | "living-heritage"
  | "borneo"
  | "western-arrival"
  | "straits-settlements"
  | "federated-states"
  | "unfederated-states"
  | "borneo-administration"
  | "colonial-economy"
  | "local-resistance"
  | "royal-diplomacy";

export interface SejarahChapterTheme {
  title: string;
  eyebrow: string;
  description: string;
  category: string;
  motif: SejarahMotif;
  accent: string;
  accentSoft: string;
  archiveCode: string;
  decorations: readonly [string, string, string];
}

export type SejarahChapterThemeMap = Record<
  Extract<Form, "Form 1" | "Form 2" | "Form 3">,
  Record<string, SejarahChapterTheme>
>;

export const sejarahChapterThemes: SejarahChapterThemeMap = {
  "Form 1": {
    "Chapter 1": {
      title: "Mengenali Sejarah",
      eyebrow: "Asas Ilmu Sejarah",
      description:
        "Teliti sumber, kaedah penyelidikan dan tafsiran yang membina pemahaman tentang masa lalu.",
      category: "Prasejarah",
      motif: "archive",
      accent: "#D9A24A",
      accentSoft: "#8A5628",
      archiveCode: "F1 · ARKIB 01",
      decorations: ["SUMBER", "TAFSIRAN", "KRONOLOGI"],
    },
    "Chapter 2": {
      title: "Zaman Air Batu",
      eyebrow: "Perubahan Dunia Purba",
      description:
        "Jejaki perubahan iklim, bentuk muka bumi dan kehidupan manusia sejak zaman glasier.",
      category: "Zaman Batu",
      motif: "glacier",
      accent: "#E2B66B",
      accentSoft: "#70533B",
      archiveCode: "F1 · ARKIB 02",
      decorations: ["GLASIER", "PENTAS SUNDA", "HOLOSEN"],
    },
    "Chapter 3": {
      title: "Zaman Prasejarah",
      eyebrow: "Jejak Manusia Awal",
      description:
        "Masuki dunia masyarakat awal melalui tapak arkeologi, peralatan dan cara hidup mereka.",
      category: "Prasejarah",
      motif: "prehistoric",
      accent: "#C98A50",
      accentSoft: "#74442A",
      archiveCode: "F1 · ARKIB 03",
      decorations: ["ARKEOLOGI", "ARTIFAK", "PETEMPATAN"],
    },
    "Chapter 4": {
      title: "Mengenali Tamadun",
      eyebrow: "Kelahiran Masyarakat Terancang",
      description: "Kenali konsep, ciri dan perkembangan yang membentuk sesebuah tamadun manusia.",
      category: "Tamadun Awal",
      motif: "civilisation",
      accent: "#D6A052",
      accentSoft: "#76502A",
      archiveCode: "F1 · ARKIB 04",
      decorations: ["KOTA", "SISTEM", "TULISAN"],
    },
    "Chapter 5": {
      title: "Tamadun Awal Dunia",
      eyebrow: "Empat Pusat Dunia Purba",
      description: "Bandingkan kemunculan dan pencapaian tamadun besar di lembah sungai dunia.",
      category: "Tamadun Dunia",
      motif: "ancient-world",
      accent: "#E0A95B",
      accentSoft: "#7A4C26",
      archiveCode: "F1 · ARKIB 05",
      decorations: ["MESOPOTAMIA", "MESIR", "INDUS"],
    },
    "Chapter 6": {
      title: "Tamadun Yunani dan Rom",
      eyebrow: "Warisan Dunia Klasik",
      description:
        "Terokai pemerintahan, seni bina dan pemikiran yang diwariskan oleh Yunani dan Rom.",
      category: "Zaman Klasik",
      motif: "classical",
      accent: "#E4BD78",
      accentSoft: "#745A37",
      archiveCode: "F1 · ARKIB 06",
      decorations: ["POLIS", "SENAT", "SENI BINA"],
    },
    "Chapter 7": {
      title: "Tamadun India dan China",
      eyebrow: "Kuasa Besar Asia",
      description:
        "Susuri perkembangan pemerintahan, pendidikan dan perluasan kuasa dua tamadun Asia.",
      category: "Zaman Pertengahan",
      motif: "asian-empires",
      accent: "#D79A42",
      accentSoft: "#7A3F27",
      archiveCode: "F1 · ARKIB 07",
      decorations: ["DINASTI", "EMPAYAR", "PENDIDIKAN"],
    },
    "Chapter 8": {
      title: "Tamadun Islam",
      eyebrow: "Kegemilangan Ilmu dan Kota",
      description:
        "Hayati perkembangan tamadun Islam serta sumbangannya kepada dunia dan kemanusiaan.",
      category: "Tamadun Islam",
      motif: "islamic-world",
      accent: "#E5B968",
      accentSoft: "#6D5130",
      archiveCode: "F1 · ARKIB 08",
      decorations: ["ILMU", "BAGHDAD", "SUMBANGAN"],
    },
  },
  "Form 2": {
    "Chapter 1": {
      title: "Kerajaan Alam Melayu",
      eyebrow: "Peta Kuasa Nusantara",
      description: "Kenali kerajaan masyhur, pusat pemerintahan dan jaringan Alam Melayu.",
      category: "Kerajaan Alam Melayu",
      motif: "maritime-kingdom",
      accent: "#D8A24B",
      accentSoft: "#754A25",
      archiveCode: "F2 · ARKIB 01",
      decorations: ["FUNAN", "SRIVIJAYA", "ANGKOR"],
    },
    "Chapter 2": {
      title: "Sistem Pemerintahan dan Kegiatan Ekonomi",
      eyebrow: "Takhta dan Kemakmuran",
      description: "Fahami susunan pemerintahan serta kegiatan ekonomi yang mengukuhkan kerajaan.",
      category: "Kerajaan Alam Melayu",
      motif: "royal-economy",
      accent: "#E0AA54",
      accentSoft: "#744B29",
      archiveCode: "F2 · ARKIB 02",
      decorations: ["RAJA", "PERTANIAN", "PERDAGANGAN"],
    },
    "Chapter 3": {
      title: "Sosiobudaya Masyarakat Kerajaan Alam Melayu",
      eyebrow: "Kehidupan di Balairung",
      description: "Terokai bahasa, tulisan, persuratan, seni bina dan struktur sosial masyarakat.",
      category: "Kerajaan Alam Melayu",
      motif: "court-culture",
      accent: "#C98B45",
      accentSoft: "#68432B",
      archiveCode: "F2 · ARKIB 03",
      decorations: ["BAHASA", "PERSURATAN", "SENI BINA"],
    },
    "Chapter 4": {
      title: "Agama, Kepercayaan dan Keunikan Warisan Masyarakat Kerajaan Alam Melayu",
      eyebrow: "Warisan Kepercayaan",
      description:
        "Teliti agama, kepercayaan dan keunikan warisan yang membentuk identiti masyarakat.",
      category: "Kerajaan Alam Melayu",
      motif: "sacred-heritage",
      accent: "#DFB76F",
      accentSoft: "#70563A",
      archiveCode: "F2 · ARKIB 04",
      decorations: ["KEPERCAYAAN", "CANDI", "WARISAN"],
    },
    "Chapter 5": {
      title: "Kesultanan Melayu Melaka",
      eyebrow: "Pelabuhan Empayar",
      description:
        "Susuri pengasasan, kegemilangan perdagangan dan warisan Kesultanan Melayu Melaka.",
      category: "Kesultanan Melayu",
      motif: "melaka-port",
      accent: "#F0BE68",
      accentSoft: "#8A5529",
      archiveCode: "F2 · ARKIB 05",
      decorations: ["MELAKA", "PELABUHAN", "KESULTANAN"],
    },
    "Chapter 6": {
      title: "Kesultanan Johor Riau",
      eyebrow: "Takhta di Selat",
      description:
        "Jejaki kelangsungan warisan Melaka melalui pusat pemerintahan dan perdagangan Johor Riau.",
      category: "Kesultanan Melayu",
      motif: "johor-riau",
      accent: "#D99A47",
      accentSoft: "#704428",
      archiveCode: "F2 · ARKIB 06",
      decorations: ["JOHOR", "RIAU", "LINGGA"],
    },
    "Chapter 7": {
      title: "Kesultanan Melayu Pahang, Perak, Terengganu dan Selangor",
      eyebrow: "Empat Warisan Kesultanan",
      description: "Bandingkan pengasasan dan kesinambungan empat kesultanan Melayu.",
      category: "Kesultanan Melayu",
      motif: "royal-states",
      accent: "#DDAA5D",
      accentSoft: "#755033",
      archiveCode: "F2 · ARKIB 07",
      decorations: ["PAHANG", "PERAK", "SELANGOR"],
    },
    "Chapter 8": {
      title: "Kerajaan Kedah, Kelantan, Negeri Sembilan dan Perlis",
      eyebrow: "Kerajaan Negeri Melayu",
      description: "Kenali latar pengasasan dan ciri pemerintahan kerajaan negeri Melayu.",
      category: "Kerajaan Negeri Melayu",
      motif: "northern-states",
      accent: "#C9823C",
      accentSoft: "#673F28",
      archiveCode: "F2 · ARKIB 08",
      decorations: ["KEDAH", "KELANTAN", "PERLIS"],
    },
    "Chapter 9": {
      title: "Warisan Kerajaan Kedah, Kelantan, Negeri Sembilan dan Perlis",
      eyebrow: "Warisan yang Berterusan",
      description: "Hayati adat, pemerintahan dan kesenian yang terus menjadi identiti negeri.",
      category: "Kerajaan Negeri Melayu",
      motif: "living-heritage",
      accent: "#E1B36C",
      accentSoft: "#715438",
      archiveCode: "F2 · ARKIB 09",
      decorations: ["ADAT", "KESENIAN", "IDENTITI"],
    },
    "Chapter 10": {
      title: "Sarawak dan Sabah",
      eyebrow: "Arkib Borneo",
      description:
        "Terokai pemerintahan, kegiatan masyarakat dan kekayaan warisan Sarawak serta Sabah.",
      category: "Sarawak & Sabah",
      motif: "borneo",
      accent: "#D6954A",
      accentSoft: "#69462D",
      archiveCode: "F2 · ARKIB 10",
      decorations: ["SUNGAI", "KESUKUAN", "BORNEO"],
    },
  },
  "Form 3": {
    "Chapter 1": {
      title: "Kedatangan Kuasa Barat",
      eyebrow: "Peta Persaingan Kuasa",
      description: "Teliti faktor, strategi dan laluan yang membawa kuasa Barat ke rantau ini.",
      category: "Peluasan Kuasa Barat",
      motif: "western-arrival",
      accent: "#E0A456",
      accentSoft: "#78502E",
      archiveCode: "F3 · ARKIB 01",
      decorations: ["KOMPAS", "LALUAN", "KUASA BARAT"],
    },
    "Chapter 2": {
      title: "Pentadbiran Negeri-negeri Selat",
      eyebrow: "Pusat Pentadbiran Selat",
      description: "Jejaki pembentukan dan perubahan pentadbiran British di negeri-negeri Selat.",
      category: "Peluasan Kuasa Barat",
      motif: "straits-settlements",
      accent: "#D28C42",
      accentSoft: "#6E4429",
      archiveCode: "F3 · ARKIB 02",
      decorations: ["PULAU PINANG", "SINGAPURA", "MELAKA"],
    },
    "Chapter 3": {
      title: "Pentadbiran Negeri-negeri Melayu Bersekutu",
      eyebrow: "Jaringan Residen",
      description: "Fahami campur tangan British dan pembentukan pentadbiran bersekutu.",
      category: "Pentadbiran Negeri Melayu",
      motif: "federated-states",
      accent: "#D8A15A",
      accentSoft: "#755139",
      archiveCode: "F3 · ARKIB 03",
      decorations: ["RESIDEN", "PERSEKUTUAN", "DURBAR"],
    },
    "Chapter 4": {
      title: "Pentadbiran Negeri-negeri Melayu Tidak Bersekutu",
      eyebrow: "Negeri di Luar Persekutuan",
      description:
        "Bandingkan peluasan pengaruh British dan sistem pentadbiran negeri tidak bersekutu.",
      category: "Pentadbiran Negeri Melayu",
      motif: "unfederated-states",
      accent: "#C9823C",
      accentSoft: "#65432F",
      archiveCode: "F3 · ARKIB 04",
      decorations: ["PENASIHAT", "PERJANJIAN", "KEDAULATAN"],
    },
    "Chapter 5": {
      title: "Pentadbiran Barat di Sarawak dan Sabah",
      eyebrow: "Borneo di Bawah Kuasa Barat",
      description: "Teliti perubahan pemerintahan Sarawak dan Sabah di bawah pentadbiran Barat.",
      category: "Pentadbiran Borneo",
      motif: "borneo-administration",
      accent: "#D69A50",
      accentSoft: "#6E4930",
      archiveCode: "F3 · ARKIB 05",
      decorations: ["BROOKE", "SBUB", "WILAYAH"],
    },
    "Chapter 6": {
      title: "Kesan Pentadbiran Barat terhadap Ekonomi dan Sosial",
      eyebrow: "Transformasi Ekonomi dan Sosial",
      description: "Analisis perubahan ekonomi moden, pengangkutan, pendidikan dan masyarakat.",
      category: "Kesan Pentadbiran Barat",
      motif: "colonial-economy",
      accent: "#E0AA62",
      accentSoft: "#72523B",
      archiveCode: "F3 · ARKIB 06",
      decorations: ["BIJIH TIMAH", "KERETA API", "BANDAR"],
    },
    "Chapter 7": {
      title: "Penentangan Masyarakat Tempatan",
      eyebrow: "Suara Penentangan",
      description:
        "Kenali tokoh, sebab dan peristiwa penentangan masyarakat tempatan terhadap kuasa Barat.",
      category: "Reaksi Tempatan terhadap Barat",
      motif: "local-resistance",
      accent: "#D28A4D",
      accentSoft: "#70402D",
      archiveCode: "F3 · ARKIB 07",
      decorations: ["TOKOH", "PENENTANGAN", "MARUAH"],
    },
    "Chapter 8": {
      title: "Kebijaksanaan Raja dan Pembesar Melayu Menangani Cabaran Barat",
      eyebrow: "Diplomasi dan Kedaulatan",
      description:
        "Hayati strategi pemerintahan, perundangan dan diplomasi dalam mempertahankan kedaulatan.",
      category: "Reaksi Tempatan terhadap Barat",
      motif: "royal-diplomacy",
      accent: "#F0BE68",
      accentSoft: "#805632",
      archiveCode: "F3 · ARKIB 08",
      decorations: ["DIPLOMASI", "DURBAR", "PERLEMBAGAAN"],
    },
  },
};

export function getSejarahChapterTheme(form: Form, chapterKey: string) {
  if (form !== "Form 1" && form !== "Form 2" && form !== "Form 3") return undefined;
  return sejarahChapterThemes[form][chapterKey];
}
