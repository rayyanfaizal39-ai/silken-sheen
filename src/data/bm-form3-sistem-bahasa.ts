export type TopicSlug =
  | "kata-nama"
  | "kata-kerja"
  | "kata-adjektif"
  | "kata-tugas"
  | "morfologi"
  | "imbuhan"
  | "frasa"
  | "sintaksis"
  | "pola-ayat"
  | "kesalahan-bahasa"
  | "kesalahan-ejaan-tanda-baca"
  | "kosa-kata"
  | "peribahasa";

export const BM_FORM3_SISTEM_BAHASA_TOPICS: Array<{ slug: TopicSlug; title: string }> = [
  { slug: "kata-nama", title: "Kata Nama" },
  { slug: "kata-kerja", title: "Kata Kerja" },
  { slug: "kata-adjektif", title: "Kata Adjektif" },
  { slug: "kata-tugas", title: "Kata Tugas" },
  { slug: "morfologi", title: "Morfologi" },
  { slug: "imbuhan", title: "Imbuhan" },
  { slug: "frasa", title: "Frasa" },
  { slug: "sintaksis", title: "Sintaksis" },
  { slug: "pola-ayat", title: "Pola Ayat" },
  { slug: "kesalahan-bahasa", title: "Kesalahan Bahasa" },
  { slug: "kesalahan-ejaan-tanda-baca", title: "Kesalahan Ejaan & Tanda Baca" },
  { slug: "kosa-kata", title: "Kosa Kata" },
  { slug: "peribahasa", title: "Peribahasa" },
];

export function getBMForm3TopicBySlug(slug: TopicSlug) {
  return BM_FORM3_SISTEM_BAHASA_TOPICS.find((topic) => topic.slug === slug);
}
