export type Form2KomsasKind = "poem" | "sajak" | "story" | "novel";

export interface Form2KomsasWork {
  id: string;
  title: string;
  category: string;
  kind: Form2KomsasKind;
}

export const BM_FORM2_KOMSAS_CATEGORIES = [
  "Puisi Tradisional",
  "Puisi Moden",
  "Prosa Tradisional",
  "Cerpen",
  "Drama",
  "Novel",
] as const;

export const BM_FORM2_KOMSAS_WORKS: Form2KomsasWork[] = [
  { id: "pantun-alam-remaja", title: "Pantun Alam Remaja", category: "Puisi Tradisional", kind: "poem" },
  { id: "pantun-kiasan", title: "Pantun Kiasan", category: "Puisi Tradisional", kind: "poem" },
  { id: "pantun-budi", title: "Pantun Budi", category: "Puisi Tradisional", kind: "poem" },
  { id: "pantun-nasihat", title: "Pantun Nasihat", category: "Puisi Tradisional", kind: "poem" },
  { id: "pantun-kasih-sayang", title: "Pantun Kasih Sayang", category: "Puisi Tradisional", kind: "poem" },
  { id: "syair-nasihat-penghujung-thamarat-al-muhimmah", title: "Syair Nasihat Penghujung Thamarat Al-Muhimmah", category: "Puisi Tradisional", kind: "poem" },
  { id: "dalam-persekitaran-kata-kata", title: "Dalam Persekitaran Kata-kata", category: "Puisi Moden", kind: "sajak" },
  { id: "roti", title: "Roti", category: "Puisi Moden", kind: "sajak" },
  { id: "kucari-damai-di-sini", title: "Kucari Damai di Sini", category: "Puisi Moden", kind: "sajak" },
  { id: "pada-sekuntum-mawar", title: "Pada Sekuntum Mawar", category: "Puisi Moden", kind: "sajak" },
  { id: "pelanduk-mengajar-memerang", title: "Pelanduk Mengajar Memerang", category: "Prosa Tradisional", kind: "story" },
  { id: "banjir-di-mata-emak", title: "Banjir di Mata Emak", category: "Cerpen", kind: "story" },
  { id: "talia-dan-raksasa-qadqad", title: "Talia dan Raksasa Qadqad", category: "Cerpen", kind: "story" },
  { id: "menuai-emas", title: "Menuai Emas", category: "Cerpen", kind: "story" },
  { id: "mahkamah", title: "Mahkamah", category: "Drama", kind: "story" },
  { id: "meniti-impian", title: "Meniti Impian", category: "Novel", kind: "novel" },
  { id: "darah-titik-di-semantan", title: "Darah Titik di Semantan", category: "Novel", kind: "novel" },
  { id: "jejak-monpus", title: "Jejak Monpus", category: "Novel", kind: "novel" },
  { id: "jalan-ke-puncak", title: "Jalan ke Puncak", category: "Novel", kind: "novel" },
];
