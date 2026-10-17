import type { QuizQuestion } from "@/data/types";

/** Supplementary, answer-neutral static diagrams; quiz content remains canonical. */
export const SEJARAH_F1_QUIZ_IMAGES: Readonly<Record<string, string>> = {
  "sej-f1-c1-q21": "/quiz-visuals/sejarah-f1/historical-sources.svg",
  "sej-f1-c2-q16": "/quiz-visuals/sejarah-f1/glacial-landscape.svg",
  "sej-f1-c3-q10": "/quiz-visuals/sejarah-f1/archaeology-finds.svg",
  "sej-f1-c4-q9": "/quiz-visuals/sejarah-f1/irrigation.svg",
  "sej-f1-c5-q14": "/quiz-visuals/sejarah-f1/indus-drainage.svg",
  "sej-f1-c6-q15": "/quiz-visuals/sejarah-f1/roman-amphitheatre.svg",
  "sej-f1-c8-q15": "/quiz-visuals/sejarah-f1/mosque-interior.svg",
};

const SEJARAH_F1_QUIZ_IMAGE_DESCRIPTIONS: Readonly<Record<string, string>> = {
  "sej-f1-c1-q21": "Ilustrasi dua helaian dokumen sejarah dan kaca pembesar yang digunakan untuk menyemak sumber.",
  "sej-f1-c2-q16": "Landskap skematik ais di kawasan pergunungan, daratan dan air laut. Perubahan paras laut tidak dilabelkan.",
  "sej-f1-c3-q10": "Empat bahan arkeologi berlabel A hingga D: cangkerang, debunga, tembikar dan alat batu, tanpa pengelasan.",
  "sej-f1-c4-q9": "Lakaran sungai dan saluran air menuju ke petak tanah pertanian tanpa menunjukkan jumlah hasil tanaman.",
  "sej-f1-c5-q14": "Keratan rentas dua bangunan dan saluran bawah tanah. Fungsi saluran tidak dilabelkan.",
  "sej-f1-c6-q15": "Pelan skematik amfiteater Rom dengan tempat duduk melingkar dan ruang di tengah; kegunaan tidak dilabel.",
  "sej-f1-c8-q15": "Lakaran dalaman ruang solat sebuah masjid, termasuk lekuk dinding dan tempat bertangga, tanpa label unsur seni bina.",
};

/** Keep images in the UI layer, so the answerIndex, canonical bank and XP checks are unchanged. */
export function getSejarahF1QuizImage(question: Pick<QuizQuestion, "id">): string | undefined {
  return SEJARAH_F1_QUIZ_IMAGES[question.id];
}

export function getSejarahF1QuizImageAlt(id: string): string {
  return SEJARAH_F1_QUIZ_IMAGE_DESCRIPTIONS[id] ?? "";
}
