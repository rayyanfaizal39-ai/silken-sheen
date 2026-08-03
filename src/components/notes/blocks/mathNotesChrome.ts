// Shared bilingual UI-chrome strings reused across every Math interactive notes
// component and every chapter, so labels aren't re-declared per chapter.
export type MathLang = "en" | "bm";

export const MATH_CHROME = {
  theIdea: { en: "The Idea", bm: "Idea Utama" },
  workedExample: { en: "Worked Example", bm: "Contoh Berpandu" },
  tryItYourself: { en: "Try It Yourself", bm: "Cuba Sendiri" },
  watchOut: { en: "Watch Out", bm: "Berhati-hati" },
  showAnswer: { en: "Show Answer", bm: "Tunjuk Jawapan" },
  hideAnswer: { en: "Hide Answer", bm: "Sembunyi Jawapan" },
  showMethod: { en: "Show Method", bm: "Tunjuk Kaedah" },
  hideMethod: { en: "Hide Method", bm: "Sembunyi Kaedah" },
  showAnswerAndMethod: { en: "Show Answer & Method", bm: "Tunjuk Jawapan & Kaedah" },
  practice: { en: "Uji Diri", bm: "Uji Diri" },
  easy: { en: "Easy", bm: "Mudah" },
  medium: { en: "Medium", bm: "Sederhana" },
  hard: { en: "Hard", bm: "Sukar" },
  whereYoullSeeThis: { en: "Where You'll See This", bm: "Di Mana Anda Akan Lihat Ini" },
  chapterSummary: { en: "Chapter Summary", bm: "Ringkasan Bab" },
  formulaSheet: { en: "Formula Sheet", bm: "Helaian Rumus" },
  quickRevision: { en: "Quick Revision", bm: "Ulang Kaji Pantas" },
  examTips: { en: "Exam Tips", bm: "Tip Peperiksaan" },
  challengeMission: { en: "Challenge Mission", bm: "Misi Cabaran" },
  notPerfectSquare: { en: "is not a perfect square", bm: "bukan kuasa dua sempurna" },
  notPerfectCube: { en: "is not a perfect cube", bm: "bukan kuasa tiga sempurna" },
} as const satisfies Record<string, Record<MathLang, string>>;

export function chrome(key: keyof typeof MATH_CHROME, lang: MathLang): string {
  return MATH_CHROME[key][lang];
}
