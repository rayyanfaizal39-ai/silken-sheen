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
    description: "Karangan Pendek, Karangan Respons Terbuka, Bengkel Karangan, Model Karangan Bank, Peribahasa Bank, Tingkatkan Karangan",
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
        topics: [
          { id: "asas", label: "Asas Karangan Pendek" },
          { id: "langkah-menulis", label: "Langkah Menulis Karangan" },
          { id: "contoh-latihan", label: "Contoh & Latihan" },
        ],
      },
      {
        id: "respons-terbuka",
        label: "Karangan Respons Terbuka",
        shortLabel: "Respons Terbuka",
        icon: "RT",
        color: "#A78BFA",
        description: "Karangan respons terbuka mengikut format peperiksaan.",
        topics: [
          { id: "asas", label: "Asas Karangan Panjang" },
          { id: "langkah-menulis", label: "Langkah Menulis Karangan" },
          { id: "contoh-latihan", label: "Contoh & Latihan" },
        ],
      },
      {
        id: "bengkel-karangan",
        label: "Bengkel Karangan",
        shortLabel: "Bengkel",
        icon: "BK",
        color: "#34D399",
        description: "Idea bank, template, kosa kata, penanda wacana dan peribahasa mengikut tema.",
        topics: [
          { id: "bank-idea", label: "Bank Idea" },
          { id: "pendahuluan-bank", label: "Pendahuluan Bank" },
          { id: "penutup-bank", label: "Penutup Bank" },
          { id: "ayat-menarik", label: "Ayat Menarik" },
          { id: "kosa-kata", label: "Kosa Kata" },
          { id: "formula-imbak", label: "Formula IMBAK" },
          { id: "huraian-isi", label: "Huraian Isi" },
          { id: "contoh-ayat", label: "Contoh Ayat" },
        ],
      },
      {
        id: "model-karangan-bank",
        label: "Model Karangan Bank",
        shortLabel: "Model",
        icon: "MK",
        color: "#FBBF24",
        description: "Contoh karangan mengikut jenis seperti fakta, perbincangan, pengalaman, laporan dan ucapan.",
        topics: [
          { id: "fakta", label: "Fakta" },
          { id: "pendapat", label: "Pendapat" },
          { id: "perbincangan", label: "Perbincangan" },
          { id: "pengalaman", label: "Pengalaman" },
          { id: "surat-rasmi", label: "Surat Rasmi" },
          { id: "surat-tidak-rasmi", label: "Surat Tidak Rasmi" },
          { id: "laporan", label: "Laporan" },
          { id: "ucapan", label: "Ucapan" },
          { id: "syarahan", label: "Syarahan" },
          { id: "dialog", label: "Dialog" },
        ],
      },
      {
        id: "peribahasa-bank",
        label: "Peribahasa Bank",
        shortLabel: "Peribahasa",
        icon: "PB",
        color: "#34D399",
        description: "Peribahasa mengikut tema, maksud dan contoh ayat.",
        topics: [
          { id: "pendidikan", label: "Pendidikan" },
          { id: "kesihatan", label: "Kesihatan" },
          { id: "keluarga", label: "Keluarga" },
          { id: "alam-sekitar", label: "Alam Sekitar" },
          { id: "patriotisme", label: "Patriotisme" },
          { id: "teknologi", label: "Teknologi" },
          { id: "masyarakat", label: "Masyarakat" },
          { id: "sukan", label: "Sukan" },
          { id: "nilai-murni", label: "Nilai Murni" },
        ],
      },
      {
        id: "tingkatkan-karangan",
        label: "Tingkatkan Karangan",
        shortLabel: "Tingkatkan",
        icon: "SA",
        color: "#818CF8",
        description: "Ubah ayat biasa jadi ayat cemerlang — kosa kata menarik dan teknik penulisan.",
        topics: [
          { id: "kesalahan-lazim", label: "Kesalahan Lazim" },
          { id: "mengembangkan-isi", label: "Cara Mengembangkan Isi" },
          { id: "teknik-huraian", label: "Teknik Huraian" },
          { id: "pendahuluan-menarik", label: "Pendahuluan Menarik" },
          { id: "penutup-mantap", label: "Penutup Mantap" },
          { id: "penggunaan-peribahasa", label: "Penggunaan Peribahasa" },
          { id: "tips-pemeriksa", label: "Tips Pemeriksa" },
        ],
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
