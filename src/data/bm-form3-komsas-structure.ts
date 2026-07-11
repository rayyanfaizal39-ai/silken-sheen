import type { Form2KomsasWork } from "@/data/bm-form2-komsas-structure";

export const BM_FORM3_KOMSAS_CATEGORIES = [
  "Puisi Tradisional",
  "Sajak",
  "Cerpen",
  "Drama",
  "Prosa Tradisional",
] as const;

export const BM_FORM3_KOMSAS_WORKS: Form2KomsasWork[] = [
  {
    id: "syair-burung-nuri",
    title: "Syair Burung Nuri",
    category: "Puisi Tradisional",
    kind: "poem",
  },
  {
    id: "seloka-santap-istiadat",
    title: "Seloka Santap Istiadat",
    category: "Puisi Tradisional",
    kind: "poem",
  },
  { id: "kijang-yang-lelah", title: "Kijang yang Lelah", category: "Sajak", kind: "sajak" },
  { id: "pesan-ibu-beribu-ribu", title: "Pesan Ibu Beribu-ribu", category: "Sajak", kind: "sajak" },
  { id: "senja-di-palang-besi", title: "Senja di Palang Besi", category: "Sajak", kind: "sajak" },
  { id: "bintang", title: "Bintang", category: "Sajak", kind: "sajak" },
  { id: "legasi-tapai-ubi", title: "Legasi Tapai Ubi", category: "Cerpen", kind: "story" },
  { id: "sekeping-tanah", title: "Sekeping Tanah", category: "Cerpen", kind: "story" },
  { id: "bawod", title: "Bawod", category: "Cerpen", kind: "story" },
  {
    id: "tenang-tenang-air-di-tasik",
    title: "Tenang-tenang Air di Tasik",
    category: "Drama",
    kind: "story",
  },
  {
    id: "bahagia-sesudah-derita",
    title: "Bahagia Sesudah Derita",
    category: "Prosa Tradisional",
    kind: "story",
  },
];

export function getBMForm3KomsasWork(id: string) {
  return BM_FORM3_KOMSAS_WORKS.find((work) => work.id === id);
}
