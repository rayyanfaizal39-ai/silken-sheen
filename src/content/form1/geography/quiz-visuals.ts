import type { QuizQuestion } from "@/data/types";

/**
 * Carefully selected diagrammatic Geography Form 1 stimuli.
 * The source bank remains the sole source of question/answer truth.
 * No diagrams are attached to a changed stem automatically.
 * Each SVG is a static, self-contained illustration with no dependencies.
 */
export const GEOGRAPHY_F1_QUIZ_IMAGES: Readonly<Record<string, string>> = {
  "geo-f1-c1-q26": "/geography/form1/quiz-visuals/geo-f1-c1-q26.svg",
  "geo-f1-c2-q23": "/geography/form1/quiz-visuals/geo-f1-c2-q23.svg",
  "geo-f1-c3-q30": "/geography/form1/quiz-visuals/geo-f1-c3-q30.svg",
  "geo-f1-c5-q8": "/geography/form1/quiz-visuals/geo-f1-c5-q8.svg",
  "geo-f1-c7-q24": "/geography/form1/quiz-visuals/geo-f1-c7-q24.svg",
  "geo-f1-c9-q24": "/geography/form1/quiz-visuals/geo-f1-c9-q24.svg",
  "geo-f1-c12-q18": "/geography/form1/quiz-visuals/geo-f1-c12-q18.svg",
  "geo-f1-c13-q9": "/geography/form1/quiz-visuals/geo-f1-c13-q9.svg",
};

export function attachGeographyF1QuizVisuals<T extends QuizQuestion>(questions: readonly T[]): T[] {
  return questions.map((question) => {
    const image = GEOGRAPHY_F1_QUIZ_IMAGES[question.id];
    return image ? { ...question, image } : question;
  });
}

const GEOGRAPHY_F1_IMAGE_DESCRIPTIONS: Readonly<Record<string, string>> = {
  "geo-f1-c1-q26":
    "Kompas berlabel U, T, S dan B dengan anak panah pada bearing 225 darjah, diukur dari Utara mengikut arah jam.",
  "geo-f1-c2-q23":
    "Garisan latitud 12 darjah Utara di atas dan 10 darjah Utara di bawah. Titik Q berada tepat di tengah-tengah kedua-duanya.",
  "geo-f1-c3-q30":
    "Peta lakar dengan sungai berliku, tanda masjid dan ladang kelapa sawit berlorek. Kenal pasti jenis simbol setiap ciri.",
  "geo-f1-c5-q8":
    "Keratan rentas Bumi: lapisan luar nipis, lapisan tengah tebal dan bahagian pusat. Rajah skematik, tidak mengikut skala.",
  "geo-f1-c7-q24":
    "Sungai berliku dengan aliran pintasan yang bersambung ke sungai di kedua-dua hujung. Likuan lama masih bersambung; proses seterusnya tidak ditunjukkan.",
  "geo-f1-c9-q24":
    "Panel X menunjukkan rumah sepanjang sungai; Y menunjukkan rumah berjauhan; Z menunjukkan rumah berdekatan. Kenal pasti pola setiap panel.",
  "geo-f1-c12-q18":
    "Hujan di atas permukaan tanah. Anak panah menghala ke bawah dalam tanah, dengan air bawah tanah di bahagian bawah rajah.",
  "geo-f1-c13-q9":
    "Keratan rentas longkang di bawah jalan. Botol dan beg berada di dalam longkang; paras air di kiri lebih tinggi daripada di kanan.",
};

/** Scope the accessible description to a known Geography image, never other quiz images. */
export function getGeographyF1QuizImageAlt(image: string): string {
  const id = Object.keys(GEOGRAPHY_F1_QUIZ_IMAGES).find(
    (key) => GEOGRAPHY_F1_QUIZ_IMAGES[key] === image,
  );
  return id ? GEOGRAPHY_F1_IMAGE_DESCRIPTIONS[id] : "";
}
