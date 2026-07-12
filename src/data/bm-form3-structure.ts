// ─── BM Form 3 — Structure only (no content yet) ─────────────────────────────
// Mirrors the Kertas 1 / Kertas 2 → Hub → Topic shape used for Form 1
// (see bm-structure.ts) so the UI in BMForm3WorldPage.tsx can render an
// identical experience. Every hub/topic here is a placeholder — content is
// added later, one topic at a time.

export interface BMForm3Topic {
  id: string;
  label: string;
}

export interface BMForm3Hub {
  id: string;
  label: string;
  shortLabel: string;
  icon: string;
  color: string;
  description: string;
  topics: BMForm3Topic[];
}

export type BMForm3KertasId = "k1" | "k2";

export interface BMForm3Kertas {
  id: BMForm3KertasId;
  label: string;
  shortLabel: string;
  icon: string;
  description: string;
  examDetails: string;
  color: string;
  hubs: BMForm3Hub[];
}

export const BM_FORM3_KERTAS: BMForm3Kertas[] = [
  {
    id: "k1",
    label: "Kertas 1",
    shortLabel: "K1",
    icon: "📘",
    description: "Sistem Bahasa, KOMSAS, Novel, Ulasan",
    examDetails: "Kertas 1 Bahasa Melayu Tingkatan 3",
    color: "#818CF8",
    hubs: [
      {
        id: "sistem-bahasa",
        label: "Sistem Bahasa",
        shortLabel: "Sistem Bahasa",
        icon: "📚",
        color: "#60A5FA",
        description:
          "Kata nama, kata adjektif, kata kerja, tatabahasa, pola ayat dan peribahasa Tingkatan 3.",
        topics: [
          { id: "kata-nama", label: "Kata Nama" },
          { id: "kata-kerja", label: "Kata Kerja" },
          { id: "kata-adjektif", label: "Kata Adjektif" },
          { id: "kata-tugas", label: "Kata Tugas" },
          { id: "morfologi", label: "Morfologi" },
          { id: "imbuhan", label: "Imbuhan" },
          { id: "frasa", label: "Frasa" },
          { id: "sintaksis", label: "Sintaksis" },
          { id: "pola-ayat", label: "Pola Ayat" },
          { id: "kesalahan-bahasa", label: "Kesalahan Bahasa" },
          { id: "kesalahan-ejaan-tanda-baca", label: "Kesalahan Ejaan & Tanda Baca" },
          { id: "kosa-kata", label: "Kosa Kata" },
          { id: "peribahasa", label: "Peribahasa" },
        ],
      },
      {
        id: "komsas",
        label: "KOMSAS",
        shortLabel: "KOMSAS",
        icon: "📜",
        color: "#C084FC",
        description: "Pantun, syair, sajak, prosa tradisional, cerpen dan drama Tingkatan 3.",
        topics: [
          { id: "syair-burung-nuri", label: "Syair Burung Nuri" },
          { id: "seloka-santap-istiadat", label: "Seloka Santap Istiadat" },
          { id: "kijang-yang-lelah", label: "Kijang yang Lelah" },
          { id: "pesan-ibu-beribu-ribu", label: "Pesan Ibu Beribu-ribu" },
          { id: "senja-di-palang-besi", label: "Senja di Palang Besi" },
          { id: "bintang", label: "Bintang" },
          { id: "legasi-tapai-ubi", label: "Legasi Tapai Ubi" },
          { id: "sekeping-tanah", label: "Sekeping Tanah" },
          { id: "bawod", label: "Bawod" },
          { id: "tenang-tenang-air-di-tasik", label: "Tenang-tenang Air di Tasik" },
          { id: "bahagia-sesudah-derita", label: "Bahagia Sesudah Derita" },
        ],
      },
      {
        id: "novel",
        label: "Novel",
        shortLabel: "Novel",
        icon: "📖",
        color: "#FB923C",
        description:
          "Empat novel KOMSAS — sinopsis, watak, tema, latar, persoalan, nilai dan pengajaran Tingkatan 3.",
        topics: [
          { id: "tawanan-komander-caucasus", label: "Tawanan Komander Caucasus" },
          { id: "chot", label: "Chot" },
          { id: "justeru-impian-di-jaring", label: "Justeru Impian di Jaring" },
          { id: "hempasan-ombak", label: "Hempasan Ombak" },
        ],
      },
      {
        id: "ulasan",
        label: "Ulasan",
        shortLabel: "Ulasan",
        icon: "📝",
        color: "#FBBF24",
        description:
          "Bahagian C: Ulasan — teknik menjawab, struktur, format UASA, contoh, kesalahan lazim dan latihan.",
        topics: [
          { id: "teknik-menjawab", label: "Teknik Menjawab" },
          { id: "struktur", label: "Struktur" },
          { id: "format-uasa", label: "Format UASA" },
          { id: "contoh", label: "Contoh" },
          { id: "kesalahan-lazim", label: "Kesalahan Lazim" },
          { id: "latihan", label: "Latihan" },
        ],
      },
    ],
  },
  {
    id: "k2",
    label: "Kertas 2",
    shortLabel: "K2",
    icon: "📝",
    description: "Karangan, Frasa, Penanda Wacana, Peribahasa dan Format Menjawab",
    examDetails: "Kertas 2 Bahasa Melayu Tingkatan 3",
    color: "#FB923C",
    hubs: [
      {
        id: "karangan-pendek",
        label: "Karangan Pendek",
        shortLabel: "Kgn. Pendek",
        icon: "KP",
        color: "#38BDF8",
        description: "Karangan pendek berdasarkan bahan rangsangan mengikut format peperiksaan.",
        topics: [],
      },
      {
        id: "respons-terbuka",
        label: "Karangan Respons Terbuka",
        shortLabel: "Respons Terbuka",
        icon: "RT",
        color: "#A78BFA",
        description: "Karangan respons terbuka mengikut format peperiksaan.",
        topics: [],
      },
      {
        id: "model-karangan",
        label: "Model Karangan",
        shortLabel: "Model",
        icon: "MK",
        color: "#FBBF24",
        description: "Contoh karangan mengikut jenis dan format.",
        topics: [],
      },
      {
        id: "frasa-menarik",
        label: "Frasa Menarik",
        shortLabel: "Frasa Menarik",
        icon: "FM",
        color: "#F472B6",
        description: "Koleksi frasa menarik untuk memperkaya penulisan.",
        topics: [],
      },
      {
        id: "penanda-wacana",
        label: "Penanda Wacana",
        shortLabel: "Penanda Wacana",
        icon: "PW",
        color: "#22D3EE",
        description: "Penanda wacana untuk menyusun idea dan perenggan.",
        topics: [],
      },
      {
        id: "peribahasa",
        label: "Peribahasa",
        shortLabel: "Peribahasa",
        icon: "PB",
        color: "#34D399",
        description: "Peribahasa mengikut tema, maksud dan contoh ayat.",
        topics: [],
      },
      {
        id: "simpulan-bahasa",
        label: "Simpulan Bahasa",
        shortLabel: "Simpulan Bahasa",
        icon: "SB",
        color: "#818CF8",
        description: "Simpulan bahasa mengikut tema dan maksud.",
        topics: [],
      },
      {
        id: "cogan-kata",
        label: "Cogan Kata",
        shortLabel: "Cogan Kata",
        icon: "CK",
        color: "#FB7185",
        description: "Koleksi cogan kata untuk memperkukuh penulisan.",
        topics: [],
      },
      {
        id: "format-menjawab",
        label: "Format Menjawab",
        shortLabel: "Format Menjawab",
        icon: "FJ",
        color: "#60A5FA",
        description: "Format dan struktur menjawab Kertas 2.",
        topics: [],
      },
    ],
  },
];

export function getBMForm3Kertas(id: BMForm3KertasId): BMForm3Kertas | undefined {
  return BM_FORM3_KERTAS.find((kertas) => kertas.id === id);
}

export function getBMForm3Hub(kertasId: BMForm3KertasId, hubId: string): BMForm3Hub | undefined {
  return getBMForm3Kertas(kertasId)?.hubs.find((hub) => hub.id === hubId);
}

export function getBMForm3Topic(
  kertasId: BMForm3KertasId,
  hubId: string,
  topicId: string,
): BMForm3Topic | undefined {
  return getBMForm3Hub(kertasId, hubId)?.topics.find((topic) => topic.id === topicId);
}
