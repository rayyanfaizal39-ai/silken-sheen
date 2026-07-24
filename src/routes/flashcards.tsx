import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type TouchEvent } from "react";
import { subjects, forms, type Form } from "@/data/content";
import { useProgress } from "@/hooks/use-progress";
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  X,
  Check,
  Volume2,
  VolumeX,
  Vibrate,
  ArrowLeft,
} from "lucide-react";
import {
  SubjectGrid,
  FormGrid,
  FormComingSoon,
  ChapterGrid,
  ContentHeader,
  ComingSoonScreen,
} from "@/components/ChapterPicker";
import { ScienceLanguagePicker, ScienceLangBar } from "@/components/ScienceLanguagePicker";
import { useScienceLang } from "@/hooks/use-science-lang";
import { Confetti } from "@/components/Confetti";
import { sfx } from "@/lib/sounds";
import {
  cleanLearningLabel,
  cleanLearningQuestion,
  cleanLearningTitle,
} from "@/lib/clean-learning-title";
import {
  normalizeFlashcardSetParam,
  normalizeFormParam,
  normalizeSubjectParam,
} from "@/lib/study-routing";
import {
  getFlashcardDeckCards,
  hasFlashcardDeck,
  splitFlashcardDeck,
  standardizeFlashcardDeck,
} from "@/lib/flashcard-availability";
import {
  getRegisteredSubjectChapters as getSubjectChapters,
  hasFormResourceContent,
} from "@/content/registry";
import {
  AcademyHero,
  AcademyPageShell,
  SubjectWorldBanner,
  type SubjectPlanetId,
} from "@/components/AcademyPage";
import { getPlanetTheme } from "@/components/PlanetEnvironment";
import {
  ENGLISH_FLASHCARD_DECKS,
  getEnglishFlashcardsForDeck,
  isEnglishFlashcardDeckId,
  type EnglishFlashcardDeckId,
} from "@/data/english-f1-flashcard-decks";
import {
  ENGLISH_FLASHCARD_DECKS_F2,
  getEnglishFlashcardsForDeckF2,
  isEnglishFlashcardDeckIdF2,
  type EnglishFlashcardDeckIdF2,
} from "@/data/english-f2-flashcard-decks";
import {
  ENGLISH_FLASHCARD_DECKS_F3,
  getEnglishFlashcardsForDeckF3,
  isEnglishFlashcardDeckIdF3,
  type EnglishFlashcardDeckIdF3,
} from "@/data/english-f3-flashcard-decks";
import { seoMeta } from "@/lib/seo";
import { subjectSeoName, subjectSeoKeywords } from "@/lib/subject-seo";
import { ChapterContentTabs } from "@/components/notes/ChapterFeatureBar";

type MathFlashcardLang = "bm" | "dlp";
type MathFlashcardCategoryId = "concepts" | "operations" | "facts" | "practice";
type FlashcardSetIndex = 0 | 1 | 2;
type FormFilter = Form | "All";

export const Route = createFileRoute("/flashcards")({
  head: ({ match }) => {
    const subjectId = (match.search as { subject?: string })?.subject;
    const subjectName = subjectSeoName(subjectId);
    const title = subjectName
      ? `${subjectName} Flashcards — KSSM Form 1-3`
      : "KSSM Flashcards — Form 1-3 Revision Cards";
    const description = subjectName
      ? `Swipeable ${subjectName} flashcards for fast KSSM Form 1-3 revision, with favorites and spaced repetition.`
      : "Swipeable, flippable KSSM flashcards for fast Form 1-3 revision across Science, Math, English, Bahasa Melayu, Sejarah and Geografi.";
    return seoMeta({
      title,
      description,
      path: "/flashcards",
      keywords: [
        "KSSM flashcards",
        "Form 1 flashcards",
        "spaced repetition",
        "SPM preparation",
        ...subjectSeoKeywords(subjectId),
      ],
    });
  },
  component: FlashcardsPage,
});

const ENCOURAGE = ["Hebat! 🔥", "Pandai! ⚡", "Betul! 🌟", "Bagus! 💪", "Keep it up! 🎯"];
const GENTLE = [
  "Cuba lagi! 💫",
  "Jangan give up! 🌈",
  "Hampir! Keep going! 🎮",
  "Ulang semula! 📚",
];

const FLASHCARD_SET_SIZE = 20;
const FLASHCARD_SET_OPTIONS: Array<{ index: FlashcardSetIndex; title: string; range: string }> = [
  { index: 0, title: "Flashcards Set 1", range: "Cards 1-20" },
  { index: 1, title: "Flashcards Set 2", range: "Cards 21-40" },
  { index: 2, title: "Flashcards Set 3", range: "Cards 41-60" },
];

const SEJARAH_F2_C2_FLASHCARD_SET_OPTIONS: Array<{
  index: FlashcardSetIndex;
  title: string;
  range: string;
}> = [
  { index: 0, title: "Sistem Pemerintahan", range: "Cards 1-20" },
  { index: 1, title: "Pertanian dan Perdagangan", range: "Cards 21-40" },
  {
    index: 2,
    title: "Hasil Hutan, Laut, Perlombongan dan Pembuatan",
    range: "Cards 41-60",
  },
];

const SEJARAH_F2_C3_FLASHCARD_SET_OPTIONS: Array<{
  index: FlashcardSetIndex;
  title: string;
  range: string;
}> = [
  { index: 0, title: "Bahasa dan Tulisan", range: "Cards 1-20" },
  { index: 1, title: "Persuratan", range: "Cards 21-40" },
  { index: 2, title: "Sastera dan Pengaruh", range: "Cards 41-60" },
];

const SEJARAH_F2_C4_FLASHCARD_SET_OPTIONS: Array<{
  index: FlashcardSetIndex;
  title: string;
  range: string;
}> = [
  { index: 0, title: "Agama dan Kepercayaan", range: "Cards 1-20" },
  { index: 1, title: "Perkembangan Agama Kerajaan Alam Melayu", range: "Cards 21-40" },
  { index: 2, title: "Keunikan Warisan Masyarakat Kerajaan Alam Melayu", range: "Cards 41-60" },
];

const SEJARAH_F2_C5_FLASHCARD_SET_OPTIONS: Array<{
  index: FlashcardSetIndex;
  title: string;
  range: string;
}> = [
  { index: 0, title: "Pengasasan Melaka", range: "Cards 1-20" },
  { index: 1, title: "Kegemilangan Melaka", range: "Cards 21-40" },
  { index: 2, title: "Perdagangan dan Pengakhiran Melaka", range: "Cards 41-60" },
];

function vibrate(pattern: number | number[], enabled: boolean) {
  if (!enabled) return;
  try {
    if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(pattern);
  } catch {
    return;
  }
}

function progressColor(pct: number) {
  if (pct <= 25) return "from-red-500 to-rose-500";
  if (pct <= 50) return "from-orange-500 to-amber-500";
  if (pct <= 75) return "from-yellow-400 to-yellow-500";
  return "from-emerald-500 to-green-500";
}

const MATH_FLASHCARD_CATEGORIES: Array<{
  id: MathFlashcardCategoryId;
  icon: string;
  bm: { title: string; purpose: string; target: string };
  dlp: { title: string; purpose: string; target: string };
}> = [
  {
    id: "concepts",
    icon: "📖",
    bm: {
      title: "Konsep",
      purpose: "Definisi, kefahaman konsep, dan jenis nombor",
      target: "33 Flashcards",
    },
    dlp: {
      title: "Concepts",
      purpose: "Definitions, concept understanding, and number types",
      target: "33 Flashcards",
    },
  },
  {
    id: "operations",
    icon: "📐",
    bm: {
      title: "Peraturan & Operasi",
      purpose: "Operasi integer, pecahan, hukum aritmetik, dan tertib operasi",
      target: "18 Flashcards",
    },
    dlp: {
      title: "Rules & Operations",
      purpose: "Integer operations, fractions, arithmetic laws, and order of operations",
      target: "18 Flashcards",
    },
  },
  {
    id: "facts",
    icon: "📋",
    bm: {
      title: "Formula & Fakta",
      purpose: "Fakta matematik, bentuk nombor nisbah, salingan, dan ulang kaji pantas",
      target: "9 Flashcards",
    },
    dlp: {
      title: "Formulas & Facts",
      purpose: "Mathematical facts, rational number forms, reciprocals, and quick revision",
      target: "9 Flashcards",
    },
  },
  {
    id: "practice",
    icon: "⚡",
    bm: {
      title: "Latihan Pantas",
      purpose: "Pengiraan cepat dan ulang kaji segera",
      target: "8 Flashcards",
    },
    dlp: {
      title: "Quick Practice",
      purpose: "Quick calculations and fast revision",
      target: "8 Flashcards",
    },
  },
];

const MATH_F1_C1_FLASHCARD_PAIRS: Record<
  MathFlashcardCategoryId,
  Array<{ bm: [string, string]; dlp: [string, string] }>
> = {
  concepts: [
    {
      bm: [
        "Apakah integer?",
        "Integer ialah kumpulan nombor yang terdiri daripada nombor bulat positif dan nombor bulat negatif termasuk sifar.",
      ],
      dlp: [
        "What are integers?",
        "Integers are a set of numbers consisting of positive whole numbers and negative whole numbers, including zero.",
      ],
    },
    {
      bm: [
        "Apakah integer positif?",
        "Integer positif ialah nombor bulat yang lebih besar daripada sifar.",
      ],
      dlp: [
        "What are positive integers?",
        "Positive integers are whole numbers greater than zero.",
      ],
    },
    {
      bm: [
        "Apakah integer negatif?",
        "Integer negatif ialah nombor bulat yang lebih kecil daripada sifar.",
      ],
      dlp: ["What are negative integers?", "Negative integers are whole numbers less than zero."],
    },
    {
      bm: ["Berikan contoh integer positif.", "Contohnya 1, 2, 3 atau 100."],
      dlp: ["Give examples of positive integers.", "Examples include 1, 2, 3 or 100."],
    },
    {
      bm: ["Berikan contoh integer negatif.", "Contohnya -1, -10 atau -239."],
      dlp: ["Give examples of negative integers.", "Examples include -1, -10 or -239."],
    },
    {
      bm: ["Apakah bukan integer?", "Bukan integer ialah nombor yang bukan nombor bulat."],
      dlp: ["What are non-integers?", "Non-integers are numbers that are not whole numbers."],
    },
    {
      bm: ["Berikan contoh bukan integer.", "Contohnya 1/2, 0.88 atau -3.4."],
      dlp: ["Give examples of non-integers.", "Examples include 1/2, 0.88 or -3.4."],
    },
    {
      bm: [
        "Apakah fungsi garis nombor?",
        "Garis nombor membantu murid melihat kedudukan integer dengan jelas.",
      ],
      dlp: [
        "What is the function of a number line?",
        "A number line helps students see the position of integers clearly.",
      ],
    },
    {
      bm: ["Di manakah integer positif pada garis nombor?", "Di sebelah kanan sifar."],
      dlp: ["Where are positive integers on a number line?", "To the right of zero."],
    },
    {
      bm: ["Di manakah integer negatif pada garis nombor?", "Di sebelah kiri sifar."],
      dlp: ["Where are negative integers on a number line?", "To the left of zero."],
    },
    {
      bm: [
        "Bagaimanakah nilai berubah apabila bergerak ke kanan?",
        "Nilai nombor semakin besar apabila bergerak ke kanan pada garis nombor.",
      ],
      dlp: [
        "How do values change when moving right?",
        "Number values increase when moving right on a number line.",
      ],
    },
    {
      bm: [
        "Bagaimanakah nilai berubah apabila bergerak ke kiri?",
        "Nilai nombor semakin kecil apabila bergerak ke kiri pada garis nombor.",
      ],
      dlp: [
        "How do values change when moving left?",
        "Number values decrease when moving left on a number line.",
      ],
    },
    {
      bm: ["Pada garis nombor, yang manakah lebih kecil: -5 atau 5?", "-5 lebih kecil."],
      dlp: ["On a number line, which is smaller: -5 or 5?", "-5 is smaller."],
    },
    {
      bm: [
        "Apakah tertib menaik?",
        "Tertib menaik ialah susunan daripada nilai terkecil kepada nilai terbesar.",
      ],
      dlp: [
        "What is ascending order?",
        "Ascending order arranges values from smallest to largest.",
      ],
    },
    {
      bm: [
        "Apakah tertib menurun?",
        "Tertib menurun ialah susunan daripada nilai terbesar kepada nilai terkecil.",
      ],
      dlp: [
        "What is descending order?",
        "Descending order arranges values from largest to smallest.",
      ],
    },
    {
      bm: ["Susun secara menaik: -5, 3, -2, 8, 0.", "-5, -2, 0, 3, 8."],
      dlp: ["Arrange in ascending order: -5, 3, -2, 8, 0.", "-5, -2, 0, 3, 8."],
    },
    {
      bm: ["Susun secara menurun: -5, 3, -2, 8, 0.", "8, 3, 0, -2, -5."],
      dlp: ["Arrange in descending order: -5, 3, -2, 8, 0.", "8, 3, 0, -2, -5."],
    },
    {
      bm: ["Di manakah pecahan positif berada?", "Pecahan positif berada di sebelah kanan sifar."],
      dlp: [
        "Where are positive fractions located?",
        "Positive fractions are located to the right of zero.",
      ],
    },
    {
      bm: ["Di manakah pecahan negatif berada?", "Pecahan negatif berada di sebelah kiri sifar."],
      dlp: [
        "Where are negative fractions located?",
        "Negative fractions are located to the left of zero.",
      ],
    },
    {
      bm: [
        "Apakah perpuluhan positif?",
        "Perpuluhan positif ialah perpuluhan yang lebih besar daripada sifar.",
      ],
      dlp: ["What is a positive decimal?", "A positive decimal is a decimal greater than zero."],
    },
    {
      bm: [
        "Apakah perpuluhan negatif?",
        "Perpuluhan negatif ialah perpuluhan yang kurang daripada sifar.",
      ],
      dlp: ["What is a negative decimal?", "A negative decimal is a decimal less than zero."],
    },
    {
      bm: ["Apakah tanda untuk situasi untung?", "Untung menggunakan tanda positif (+)."],
      dlp: ["What sign is used for profit?", "Profit uses the positive sign (+)."],
    },
    {
      bm: [
        "Apakah maksud untung dalam jadual Situasi Harian?",
        "Untung bermaksud nilai bertambah.",
      ],
      dlp: ["What does profit mean in the Real-Life Situations table?", "Value increases."],
    },
    {
      bm: ["Apakah tanda untuk situasi rugi?", "Rugi menggunakan tanda negatif (-)."],
      dlp: ["What sign is used for loss?", "Loss uses the negative sign (-)."],
    },
    {
      bm: ["Apakah maksud rugi dalam jadual Situasi Harian?", "Rugi bermaksud nilai berkurang."],
      dlp: ["What does loss mean in the Real-Life Situations table?", "Value decreases."],
    },
    {
      bm: [
        "Apakah nombor nisbah?",
        "Nombor nisbah ialah nombor yang boleh ditulis dalam bentuk a/b.",
      ],
      dlp: [
        "What are rational numbers?",
        "Rational numbers are numbers that can be written in the form a/b.",
      ],
    },
    {
      bm: [
        "Apakah syarat a dan b dalam nombor nisbah?",
        "a dan b ialah integer, dan b tidak sama dengan 0.",
      ],
      dlp: [
        "What is the condition for a and b in a rational number?",
        "a and b are integers, and b is not equal to 0.",
      ],
    },
    {
      bm: [
        "Bagaimanakah integer -9 ditulis sebagai nombor nisbah?",
        "-9 dalam bentuk a/b ialah -9/1.",
      ],
      dlp: ["How is the integer -9 written as a rational number?", "-9 in a/b form is -9/1."],
    },
    {
      bm: ["Adakah 3/4 nombor nisbah?", "Ya, 3/4 ialah nombor nisbah."],
      dlp: ["Is 3/4 a rational number?", "Yes, 3/4 is a rational number."],
    },
    {
      bm: [
        "Bagaimanakah perpuluhan 3.5 ditulis sebagai nombor nisbah?",
        "3.5 dalam bentuk a/b ialah 7/2.",
      ],
      dlp: ["How is the decimal 3.5 written as a rational number?", "3.5 in a/b form is 7/2."],
    },
    {
      bm: ["Berikan tiga contoh integer positif.", "1, 2 dan 3."],
      dlp: ["Give three examples of positive integers.", "1, 2 and 3."],
    },
    {
      bm: ["Berikan tiga contoh integer negatif.", "-1, -2 dan -3."],
      dlp: ["Give three examples of negative integers.", "-1, -2 and -3."],
    },
    {
      bm: ["Berikan dua contoh perpuluhan positif.", "0.5 dan 4.3."],
      dlp: ["Give two examples of positive decimals.", "0.5 and 4.3."],
    },
  ],
  operations: [
    {
      bm: [
        "Tambah integer positif bermaksud apa?",
        "Tambah integer positif bermaksud bergerak ke kanan pada garis nombor.",
      ],
      dlp: [
        "What does adding a positive integer mean?",
        "Adding a positive integer means moving right on the number line.",
      ],
    },
    {
      bm: [
        "Tambah integer negatif bermaksud apa?",
        "Tambah integer negatif bermaksud bergerak ke kiri pada garis nombor.",
      ],
      dlp: [
        "What does adding a negative integer mean?",
        "Adding a negative integer means moving left on the number line.",
      ],
    },
    {
      bm: [
        "Tolak integer positif bermaksud apa?",
        "Tolak integer positif bermaksud bergerak ke kiri pada garis nombor.",
      ],
      dlp: [
        "What does subtracting a positive integer mean?",
        "Subtracting a positive integer means moving left on the number line.",
      ],
    },
    {
      bm: [
        "Tolak integer negatif bermaksud apa?",
        "Tolak integer negatif bermaksud bergerak ke kanan pada garis nombor.",
      ],
      dlp: [
        "What does subtracting a negative integer mean?",
        "Subtracting a negative integer means moving right on the number line.",
      ],
    },
    {
      bm: ["Apakah hasil (+) x (+)?", "Positif."],
      dlp: ["What is the result of (+) x (+)?", "Positive."],
    },
    {
      bm: ["Apakah hasil (-) x (-)?", "Positif."],
      dlp: ["What is the result of (-) x (-)?", "Positive."],
    },
    {
      bm: ["Apakah hasil (+) x (-)?", "Negatif."],
      dlp: ["What is the result of (+) x (-)?", "Negative."],
    },
    {
      bm: ["Apakah hasil (-) x (+)?", "Negatif."],
      dlp: ["What is the result of (-) x (+)?", "Negative."],
    },
    {
      bm: [
        "Apakah tertib operasi?",
        "Tertib operasi ialah kurungan dahulu, kemudian darab/bahagi, kemudian tambah/tolak.",
      ],
      dlp: [
        "What is the order of operations?",
        "The order of operations is brackets first, then multiply/divide, then add/subtract.",
      ],
    },
    {
      bm: ["Apakah langkah pertama dalam tertib operasi?", "Kurungan ( )."],
      dlp: ["What is the first step in the order of operations?", "Parentheses ( )."],
    },
    {
      bm: ["Apakah langkah kedua dalam tertib operasi?", "Darab / Bahagi."],
      dlp: ["What is the second step in the order of operations?", "Multiply / Divide."],
    },
    {
      bm: ["Apakah langkah ketiga dalam tertib operasi?", "Tambah / Tolak."],
      dlp: ["What is the third step in the order of operations?", "Add / Subtract."],
    },
    {
      bm: [
        "Apakah hukum kalis tukar tertib?",
        "Hukum kalis tukar tertib menyatakan a + b = b + a dan a x b = b x a.",
      ],
      dlp: [
        "What is the commutative law?",
        "The commutative law states that a + b = b + a and a x b = b x a.",
      ],
    },
    {
      bm: [
        "Apakah hukum kalis sekutuan?",
        "Hukum kalis sekutuan menyatakan (a + b) + c = a + (b + c) dan (a x b) x c = a x (b x c).",
      ],
      dlp: [
        "What is the associative law?",
        "The associative law states that (a + b) + c = a + (b + c) and (a x b) x c = a x (b x c).",
      ],
    },
    {
      bm: [
        "Apakah hukum kalis agihan?",
        "Hukum kalis agihan menyatakan a x (b + c) = (a x b) + (a x c).",
      ],
      dlp: [
        "What is the distributive law?",
        "The distributive law states that a x (b + c) = (a x b) + (a x c).",
      ],
    },
    {
      bm: ["Apakah langkah awal membanding pecahan?", "Penyebut mesti disamakan terlebih dahulu."],
      dlp: [
        "What is the first step when comparing fractions?",
        "The denominators must be made the same first.",
      ],
    },
    {
      bm: ["Selepas penyebut pecahan sama, apakah yang dibandingkan?", "Bandingkan pengangka."],
      dlp: [
        "After fraction denominators are the same, what should be compared?",
        "Compare the numerators.",
      ],
    },
    {
      bm: [
        "Bagaimana membahagi pecahan?",
        "Tukar bahagi kepada darab dengan salingan pecahan kedua.",
      ],
      dlp: [
        "How do you divide fractions?",
        "Change division into multiplication by the reciprocal of the second fraction.",
      ],
    },
  ],
  facts: [
    {
      bm: ["Apakah bentuk umum nombor nisbah?", "Bentuk umum nombor nisbah ialah a/b."],
      dlp: [
        "What is the general form of a rational number?",
        "The general form of a rational number is a/b.",
      ],
    },
    {
      bm: ["Apakah syarat bagi b dalam a/b?", "b mestilah bukan sifar, iaitu b != 0."],
      dlp: ["What is the condition for b in a/b?", "b must not be zero, that is b != 0."],
    },
    {
      bm: [
        "Bagaimana menulis integer sebagai pecahan?",
        "Tulis integer sebagai nombor itu per 1, contohnya -9 = -9/1.",
      ],
      dlp: [
        "How do you write an integer as a fraction?",
        "Write the integer over 1, for example -9 = -9/1.",
      ],
    },
    {
      bm: [
        "Apakah maksud menggunakan salingan dalam operasi pecahan?",
        "Apabila membahagi pecahan, tukar bahagi kepada darab menggunakan salingan.",
      ],
      dlp: [
        "What does using the reciprocal mean in fraction operations?",
        "When dividing fractions, convert division into multiplication using the reciprocal.",
      ],
    },
    {
      bm: ["Tukar 1/2 ÷ 1/4 kepada bentuk darab.", "1/2 x 4/1."],
      dlp: ["Convert 1/2 ÷ 1/4 into multiplication form.", "1/2 x 4/1."],
    },
    {
      bm: ["Apakah bentuk a/b bagi 3.5?", "7/2."],
      dlp: ["What is the a/b form of 3.5?", "7/2."],
    },
    {
      bm: ["Apakah identiti penambahan?", "Identiti penambahan ialah 0 kerana a + 0 = a."],
      dlp: ["What is the additive identity?", "The additive identity is 0 because a + 0 = a."],
    },
    {
      bm: ["Apakah identiti pendaraban?", "Identiti pendaraban ialah 1 kerana a x 1 = a."],
      dlp: [
        "What is the multiplicative identity?",
        "The multiplicative identity is 1 because a x 1 = a.",
      ],
    },
    {
      bm: ["Apakah satu lagi formula dalam Hukum Identiti?", "a + (-a) = 0."],
      dlp: ["What is another formula in the Identity Law?", "a + (-a) = 0."],
    },
  ],
  practice: [
    {
      bm: ["Tulis -9 dalam bentuk a/b.", "-9/1."],
      dlp: ["Write -9 in a/b form.", "-9/1."],
    },
    {
      bm: ["Tulis 3.5 dalam bentuk a/b.", "7/2."],
      dlp: ["Write 3.5 in a/b form.", "7/2."],
    },
    {
      bm: ["5 + (-2) = ?", "3."],
      dlp: ["5 + (-2) = ?", "3."],
    },
    {
      bm: ["(-3) x 4 = ?", "-12."],
      dlp: ["(-3) x 4 = ?", "-12."],
    },
    {
      bm: ["1/2 + 1/2 = ?", "1."],
      dlp: ["1/2 + 1/2 = ?", "1."],
    },
    {
      bm: ["Susun menaik: -5, -2, 0, 3, 8.", "-5, -2, 0, 3, 8."],
      dlp: ["Arrange in ascending order: -5, -2, 0, 3, 8.", "-5, -2, 0, 3, 8."],
    },
    {
      bm: ["Susun menurun: 8, 3, 0, -2, -5.", "8, 3, 0, -2, -5."],
      dlp: ["Arrange in descending order: 8, 3, 0, -2, -5.", "8, 3, 0, -2, -5."],
    },
    {
      bm: ["Tukar 1/2 ÷ 1/4 kepada darab menggunakan salingan.", "1/2 x 4/1."],
      dlp: ["Convert 1/2 ÷ 1/4 into multiplication using the reciprocal.", "1/2 x 4/1."],
    },
  ],
};

const mathCard = (
  bmFront: string,
  bmBack: string,
  dlpFront: string,
  dlpBack: string,
): { bm: [string, string]; dlp: [string, string] } => ({
  bm: [bmFront, bmBack],
  dlp: [dlpFront, dlpBack],
});

const MATH_F1_C2_FLASHCARD_PAIRS: Record<
  MathFlashcardCategoryId,
  Array<{ bm: [string, string]; dlp: [string, string] }>
> = {
  concepts: [
    mathCard(
      "Apakah faktor?",
      "Faktor ialah nombor yang membahagi nombor lain tepat tanpa baki.",
      "What is a factor?",
      "A factor is a number that divides another number exactly without a remainder.",
    ),
    mathCard(
      "Adakah 3 faktor bagi 12?",
      "Ya, kerana 12 ÷ 3 = 4 tanpa baki.",
      "Is 3 a factor of 12?",
      "Yes, because 12 ÷ 3 = 4 with no remainder.",
    ),
    mathCard(
      "Apakah faktor bagi 12?",
      "1, 2, 3, 4, 6 dan 12.",
      "What are the factors of 12?",
      "1, 2, 3, 4, 6 and 12.",
    ),
    mathCard(
      "Apakah faktor bagi 18?",
      "1, 2, 3, 6, 9 dan 18.",
      "What are the factors of 18?",
      "1, 2, 3, 6, 9 and 18.",
    ),
    mathCard(
      "Apakah faktor bagi 20?",
      "1, 2, 4, 5, 10 dan 20.",
      "What are the factors of 20?",
      "1, 2, 4, 5, 10 and 20.",
    ),
    mathCard(
      "Apakah nombor perdana?",
      "Nombor perdana mempunyai tepat dua faktor, iaitu 1 dan nombor itu sendiri.",
      "What is a prime number?",
      "A prime number has exactly two factors: 1 and the number itself.",
    ),
    mathCard(
      "Berikan contoh nombor perdana.",
      "Contohnya 2, 3, 5, 7, 11 dan 13.",
      "Give examples of prime numbers.",
      "Examples include 2, 3, 5, 7, 11 and 13.",
    ),
    mathCard(
      "Adakah 1 nombor perdana?",
      "Tidak. 1 bukan nombor perdana.",
      "Is 1 a prime number?",
      "No. 1 is not a prime number.",
    ),
    mathCard(
      "Apakah faktor perdana?",
      "Faktor perdana ialah faktor bagi suatu nombor yang juga merupakan nombor perdana.",
      "What is a prime factor?",
      "A prime factor is a factor of a number that is also a prime number.",
    ),
    mathCard(
      "Apakah pemfaktoran perdana?",
      "Pemfaktoran perdana ialah menulis nombor sebagai hasil darab faktor perdana.",
      "What is prime factorisation?",
      "Prime factorisation is writing a number as a product of prime factors.",
    ),
    mathCard(
      "Apakah faktor perdana bagi 12?",
      "2 dan 3.",
      "What are the prime factors of 12?",
      "2 and 3.",
    ),
    mathCard(
      "Apakah faktor perdana bagi 18?",
      "2 dan 3.",
      "What are the prime factors of 18?",
      "2 and 3.",
    ),
    mathCard(
      "Apakah faktor perdana bagi 24?",
      "2 dan 3.",
      "What are the prime factors of 24?",
      "2 and 3.",
    ),
    mathCard(
      "Apakah faktor sepunya?",
      "Faktor sepunya ialah faktor yang sama bagi dua atau lebih nombor.",
      "What are common factors?",
      "Common factors are factors shared by two or more numbers.",
    ),
    mathCard(
      "Apakah faktor sepunya bagi 12 dan 18?",
      "1, 2, 3 dan 6.",
      "What are the common factors of 12 and 18?",
      "1, 2, 3 and 6.",
    ),
    mathCard(
      "Apakah maksud FSTB?",
      "FSTB ialah Faktor Sepunya Terbesar.",
      "What does HCF mean?",
      "HCF means Highest Common Factor.",
    ),
    mathCard(
      "Apakah FSTB?",
      "FSTB ialah faktor sepunya yang paling besar.",
      "What is HCF?",
      "HCF is the greatest common factor.",
    ),
    mathCard("Apakah FSTB bagi 12 dan 18?", "6.", "What is the HCF of 12 and 18?", "6."),
    mathCard(
      "Apakah gandaan?",
      "Gandaan ialah hasil darab suatu nombor dengan nombor bulat positif.",
      "What is a multiple?",
      "A multiple is the product of a number and a positive whole number.",
    ),
    mathCard(
      "Apakah gandaan bagi 4?",
      "4, 8, 12, 16, 20, 24 dan seterusnya.",
      "What are multiples of 4?",
      "4, 8, 12, 16, 20, 24 and so on.",
    ),
    mathCard(
      "Apakah gandaan bagi 6?",
      "6, 12, 18, 24, 30, 36 dan seterusnya.",
      "What are multiples of 6?",
      "6, 12, 18, 24, 30, 36 and so on.",
    ),
    mathCard(
      "Apakah gandaan sepunya?",
      "Gandaan sepunya ialah gandaan yang sama bagi dua atau lebih nombor.",
      "What are common multiples?",
      "Common multiples are multiples shared by two or more numbers.",
    ),
    mathCard(
      "Apakah gandaan sepunya bagi 4 dan 6?",
      "12, 24, 36 dan seterusnya.",
      "What are common multiples of 4 and 6?",
      "12, 24, 36 and so on.",
    ),
    mathCard(
      "Apakah maksud GSTK?",
      "GSTK ialah Gandaan Sepunya Terkecil.",
      "What does LCM mean?",
      "LCM means Lowest Common Multiple.",
    ),
    mathCard(
      "Apakah GSTK?",
      "GSTK ialah gandaan sepunya yang paling kecil.",
      "What is LCM?",
      "LCM is the smallest common multiple.",
    ),
    mathCard("Apakah GSTK bagi 4 dan 6?", "12.", "What is the LCM of 4 and 6?", "12."),
    mathCard(
      "Bila FSTB digunakan?",
      "FSTB digunakan untuk pembahagian kepada kumpulan sama banyak.",
      "When is HCF used?",
      "HCF is used for dividing into equal groups.",
    ),
    mathCard(
      "Bila GSTK digunakan?",
      "GSTK digunakan untuk kejadian berulang bersama.",
      "When is LCM used?",
      "LCM is used for repeated events happening together.",
    ),
    mathCard(
      "Apakah kata kunci FSTB?",
      "Terbesar, maksimum dan kumpulan sama.",
      "What are HCF keywords?",
      "Greatest, maximum and equal groups.",
    ),
    mathCard(
      "Apakah kata kunci GSTK?",
      "Terkecil, pertama kali bersama dan berulang.",
      "What are LCM keywords?",
      "Smallest, first time together and repeats.",
    ),
  ],
  operations: [
    mathCard(
      "Bagaimana mencari faktor?",
      "Bahagi nombor dengan nombor bulat dan semak sama ada bakinya sifar.",
      "How do you find factors?",
      "Divide the number by whole numbers and check whether the remainder is zero.",
    ),
    mathCard(
      "Bagaimana mengenal pasti faktor perdana?",
      "Cari faktor nombor itu, kemudian pilih faktor yang merupakan nombor perdana.",
      "How do you identify prime factors?",
      "Find the factors, then choose the factors that are prime numbers.",
    ),
    mathCard(
      "Bagaimana melakukan pemfaktoran perdana?",
      "Bahagi berulang dengan nombor perdana hingga semua faktor menjadi nombor perdana.",
      "How do you perform prime factorisation?",
      "Divide repeatedly by prime numbers until all factors are prime numbers.",
    ),
    mathCard(
      "Apakah pemfaktoran perdana bagi 12?",
      "12 = 2 x 2 x 3.",
      "What is the prime factorisation of 12?",
      "12 = 2 x 2 x 3.",
    ),
    mathCard(
      "Apakah pemfaktoran perdana bagi 18?",
      "18 = 2 x 3 x 3.",
      "What is the prime factorisation of 18?",
      "18 = 2 x 3 x 3.",
    ),
    mathCard(
      "Apakah pemfaktoran perdana bagi 24?",
      "24 = 2 x 2 x 2 x 3.",
      "What is the prime factorisation of 24?",
      "24 = 2 x 2 x 2 x 3.",
    ),
    mathCard(
      "Bagaimana mencari FSTB dengan faktor?",
      "Senaraikan faktor setiap nombor, cari faktor sepunya, kemudian pilih yang terbesar.",
      "How do you find HCF using factors?",
      "List the factors of each number, find the common factors, then choose the greatest.",
    ),
    mathCard(
      "Bagaimana mencari FSTB dengan pemfaktoran perdana?",
      "Ambil faktor perdana sepunya dengan kuasa terkecil.",
      "How do you find HCF using prime factorisation?",
      "Take the common prime factors with the smallest powers.",
    ),
    mathCard(
      "FSTB bagi 12 dan 18 menggunakan pemfaktoran perdana ialah?",
      "2 x 3 = 6.",
      "What is the HCF of 12 and 18 using prime factorisation?",
      "2 x 3 = 6.",
    ),
    mathCard(
      "Bagaimana mencari gandaan?",
      "Darab nombor dengan nombor bulat positif seperti 1, 2, 3, 4 dan seterusnya.",
      "How do you find multiples?",
      "Multiply the number by positive whole numbers such as 1, 2, 3, 4 and so on.",
    ),
    mathCard(
      "Bagaimana mencari GSTK dengan gandaan?",
      "Senaraikan gandaan setiap nombor, cari gandaan sepunya, kemudian pilih yang terkecil.",
      "How do you find LCM using multiples?",
      "List the multiples of each number, find the common multiples, then choose the smallest.",
    ),
    mathCard(
      "Bagaimana mencari GSTK dengan pemfaktoran perdana?",
      "Ambil semua faktor perdana dengan kuasa terbesar.",
      "How do you find LCM using prime factorisation?",
      "Take all prime factors with the greatest powers.",
    ),
    mathCard(
      "GSTK bagi 12 dan 18 menggunakan pemfaktoran perdana ialah?",
      "2 x 2 x 3 x 3 = 36.",
      "What is the LCM of 12 and 18 using prime factorisation?",
      "2 x 2 x 3 x 3 = 36.",
    ),
    mathCard(
      "Apakah kaedah lain selain pembahagian berulang?",
      "Pokok faktor.",
      "What is another method besides repeated division?",
      "A factor tree.",
    ),
    mathCard(
      "Bagaimana memilih antara FSTB dan GSTK?",
      "Gunakan FSTB untuk kumpulan sama; gunakan GSTK untuk pengulangan bersama.",
      "How do you choose between HCF and LCM?",
      "Use HCF for equal groups; use LCM for repeated events together.",
    ),
  ],
  facts: [
    mathCard("FSTB bagi 12 dan 18 ialah?", "6.", "The HCF of 12 and 18 is?", "6."),
    mathCard("GSTK bagi 4 dan 6 ialah?", "12.", "The LCM of 4 and 6 is?", "12."),
    mathCard("GSTK bagi 12 dan 18 ialah?", "36.", "The LCM of 12 and 18 is?", "36."),
    mathCard(
      "FSTB bermaksud apa?",
      "Faktor Sepunya Terbesar.",
      "What does HCF stand for?",
      "Highest Common Factor.",
    ),
    mathCard(
      "GSTK bermaksud apa?",
      "Gandaan Sepunya Terkecil.",
      "What does LCM stand for?",
      "Lowest Common Multiple.",
    ),
    mathCard(
      "FSTB mencari nilai jenis apa?",
      "Faktor sepunya paling besar.",
      "What type of value does HCF find?",
      "The greatest common factor.",
    ),
    mathCard(
      "GSTK mencari nilai jenis apa?",
      "Gandaan sepunya paling kecil.",
      "What type of value does LCM find?",
      "The smallest common multiple.",
    ),
    mathCard(
      "Nombor 2 ialah nombor perdana atau bukan?",
      "Nombor perdana.",
      "Is 2 a prime number?",
      "Yes, it is a prime number.",
    ),
    mathCard(
      "Nombor 1 ialah nombor perdana atau bukan?",
      "Bukan nombor perdana.",
      "Is 1 a prime number?",
      "No, it is not a prime number.",
    ),
    mathCard(
      "Jika soalan menyebut 'pertama kali bersama', gunakan apa?",
      "GSTK.",
      "If a question says 'first time together', what should you use?",
      "LCM.",
    ),
  ],
  practice: [
    mathCard("Adakah 5 faktor bagi 20?", "Ya.", "Is 5 a factor of 20?", "Yes."),
    mathCard("Adakah 7 faktor bagi 20?", "Tidak.", "Is 7 a factor of 20?", "No."),
    mathCard("Cari FSTB bagi 12 dan 18.", "6.", "Find the HCF of 12 and 18.", "6."),
    mathCard("Cari GSTK bagi 4 dan 6.", "12.", "Find the LCM of 4 and 6.", "12."),
    mathCard(
      "Loceng berbunyi setiap 4 dan 6 minit. Bila berbunyi bersama?",
      "Setiap 12 minit.",
      "Bells ring every 4 and 6 minutes. When do they ring together?",
      "Every 12 minutes.",
    ),
  ],
};

const MATH_F1_C3_FLASHCARD_PAIRS: Record<
  MathFlashcardCategoryId,
  Array<{ bm: [string, string]; dlp: [string, string] }>
> = {
  concepts: [
    mathCard(
      "Apakah maksud kuasa dua?",
      "Kuasa dua bermaksud mendarab sesuatu nombor dengan dirinya sendiri.",
      "What does square mean?",
      "Square means multiplying a number by itself.",
    ),
    mathCard("Apakah maksud 4²?", "4² bermaksud 4 x 4.", "What does 4² mean?", "4² means 4 x 4."),
    mathCard(
      "Apakah kaitan kuasa dua dengan segi empat sama?",
      "Jika sisi segi empat sama ialah s, luasnya ialah s².",
      "How is square related to a square shape?",
      "If the side of a square is s, its area is s².",
    ),
    mathCard(
      "Apakah kuasa dua sempurna?",
      "Kuasa dua sempurna ialah nombor yang terhasil daripada kuasa dua nombor bulat.",
      "What is a perfect square?",
      "A perfect square is a number produced by squaring a whole number.",
    ),
    mathCard(
      "Berikan contoh kuasa dua sempurna.",
      "Contohnya 1, 4, 9, 16, 25 dan 36.",
      "Give examples of perfect squares.",
      "Examples include 1, 4, 9, 16, 25 and 36.",
    ),
    mathCard(
      "Bagaimana mengenal pasti kuasa dua sempurna melalui pemfaktoran perdana?",
      "Faktor perdana boleh dikumpulkan dalam dua kumpulan yang sama.",
      "How can you identify a perfect square using prime factorisation?",
      "Its prime factors can be grouped into two identical groups.",
    ),
    mathCard(
      "Adakah 36 kuasa dua sempurna?",
      "Ya, kerana 36 = 6².",
      "Is 36 a perfect square?",
      "Yes, because 36 = 6².",
    ),
    mathCard("Adakah 20 kuasa dua sempurna?", "Tidak.", "Is 20 a perfect square?", "No."),
    mathCard(
      "Apakah maksud punca kuasa dua?",
      "Punca kuasa dua ialah nombor yang didarab dengan dirinya sendiri untuk mendapat nombor asal.",
      "What does square root mean?",
      "A square root is a number that is multiplied by itself to get the original number.",
    ),
    mathCard("Jika 6² = 36, apakah √36?", "√36 = 6.", "If 6² = 36, what is √36?", "√36 = 6."),
    mathCard(
      "Punca kuasa dua bagi luas segi empat sama memberi nilai apa?",
      "Panjang sisi segi empat sama.",
      "The square root of a square's area gives what value?",
      "The side length of the square.",
    ),
    mathCard(
      "Mengapa kuasa dua 1 hingga 20 penting?",
      "Ia membantu mengira dan mengenal pasti kuasa dua sempurna dengan cepat.",
      "Why are squares from 1 to 20 important?",
      "They help calculate and identify perfect squares quickly.",
    ),
    mathCard("Apakah √(49/81)?", "7/9.", "What is √(49/81)?", "7/9."),
    mathCard(
      "Apakah langkah sebelum mencari punca kuasa dua nombor bercampur?",
      "Tukarkan nombor bercampur kepada pecahan tak wajar dahulu.",
      "What should you do before finding the square root of a mixed number?",
      "Convert the mixed number into an improper fraction first.",
    ),
    mathCard("Apakah nilai √a x √a?", "a.", "What is the value of √a x √a?", "a."),
    mathCard("Apakah nilai √a x √b?", "√ab.", "What is the value of √a x √b?", "√ab."),
    mathCard(
      "Apakah maksud kuasa tiga?",
      "Kuasa tiga bermaksud mendarab sesuatu nombor dengan dirinya sendiri sebanyak tiga kali.",
      "What does cube mean?",
      "Cube means multiplying a number by itself three times.",
    ),
    mathCard(
      "Apakah maksud a³?",
      "a³ bermaksud a x a x a.",
      "What does a³ mean?",
      "a³ means a x a x a.",
    ),
    mathCard(
      "Apakah kesilapan biasa bagi 2³?",
      "2³ bukan 2 x 3; 2³ = 2 x 2 x 2.",
      "What is a common mistake for 2³?",
      "2³ is not 2 x 3; 2³ = 2 x 2 x 2.",
    ),
    mathCard(
      "Apakah kaitan kuasa tiga dengan kubus?",
      "Jika sisi kubus ialah s, isipadunya ialah s³.",
      "How is cube related to a cube shape?",
      "If the edge of a cube is s, its volume is s³.",
    ),
    mathCard(
      "Berikan contoh kuasa tiga sempurna.",
      "Contohnya 1, 8, 27, 64, 125 dan 1000.",
      "Give examples of perfect cubes.",
      "Examples include 1, 8, 27, 64, 125 and 1000.",
    ),
    mathCard(
      "Bagaimana mengenal pasti kuasa tiga sempurna melalui pemfaktoran perdana?",
      "Faktor perdana boleh dikumpulkan dalam tiga kumpulan yang sama.",
      "How can you identify a perfect cube using prime factorisation?",
      "Its prime factors can be grouped into three identical groups.",
    ),
    mathCard(
      "Apakah tanda kuasa tiga bagi nombor positif?",
      "Hasilnya positif.",
      "What is the sign of the cube of a positive number?",
      "The result is positive.",
    ),
    mathCard(
      "Apakah tanda kuasa tiga bagi nombor negatif?",
      "Hasilnya negatif.",
      "What is the sign of the cube of a negative number?",
      "The result is negative.",
    ),
    mathCard("Berapakah (-5)³?", "-125.", "What is (-5)³?", "-125."),
    mathCard(
      "Apakah maksud punca kuasa tiga?",
      "Punca kuasa tiga ialah nombor yang dikuasakan tiga untuk mendapat nombor asal.",
      "What does cube root mean?",
      "A cube root is a number that is cubed to get the original number.",
    ),
    mathCard("Jika 2³ = 8, apakah ∛8?", "∛8 = 2.", "If 2³ = 8, what is ∛8?", "∛8 = 2."),
    mathCard(
      "Bolehkah punca kuasa tiga bernilai negatif?",
      "Ya. Contohnya ∛(-8) = -2.",
      "Can a cube root be negative?",
      "Yes. For example, ∛(-8) = -2.",
    ),
    mathCard("Apakah ∛(-8)?", "-2.", "What is ∛(-8)?", "-2."),
    mathCard(
      "Punca kuasa tiga bagi isipadu kubus memberi nilai apa?",
      "Panjang sisi kubus.",
      "The cube root of a cube's volume gives what value?",
      "The edge length of the cube.",
    ),
  ],
  operations: [
    mathCard(
      "Apakah formula kuasa dua?",
      "a² = a x a.",
      "What is the square formula?",
      "a² = a x a.",
    ),
    mathCard(
      "Apakah formula kuasa tiga?",
      "a³ = a x a x a.",
      "What is the cube formula?",
      "a³ = a x a x a.",
    ),
    mathCard(
      "Bagaimana menguji kuasa dua sempurna dengan faktor perdana?",
      "Kumpulkan faktor perdana secara berpasangan.",
      "How do you test a perfect square using prime factors?",
      "Group the prime factors in pairs.",
    ),
    mathCard(
      "Bagaimana menguji kuasa tiga sempurna dengan faktor perdana?",
      "Kumpulkan faktor perdana dalam kumpulan tiga.",
      "How do you test a perfect cube using prime factors?",
      "Group the prime factors in threes.",
    ),
    mathCard(
      "Anggarkan √54.",
      "√54 terletak antara 7 dan 8.",
      "Estimate √54.",
      "√54 lies between 7 and 8.",
    ),
    mathCard(
      "Anggarkan 4.2³.",
      "4.2³ terletak antara 4³ dan 5³.",
      "Estimate 4.2³.",
      "4.2³ lies between 4³ and 5³.",
    ),
    mathCard(
      "Apakah langkah pertama dalam tertib operasi?",
      "Selesaikan kurungan dahulu.",
      "What is the first step in order of operations?",
      "Solve brackets first.",
    ),
    mathCard(
      "Selepas kurungan, apakah operasi yang perlu diselesaikan?",
      "Kuasa, punca kuasa dua dan punca kuasa tiga.",
      "After brackets, which operations should be solved?",
      "Powers, square roots and cube roots.",
    ),
    mathCard(
      "Selepas kuasa dan punca, apakah operasi seterusnya?",
      "Darab dan bahagi dari kiri ke kanan.",
      "After powers and roots, what operations come next?",
      "Multiply and divide from left to right.",
    ),
    mathCard(
      "Apakah operasi terakhir dalam tertib operasi?",
      "Tambah dan tolak dari kiri ke kanan.",
      "What are the final operations in order of operations?",
      "Add and subtract from left to right.",
    ),
    mathCard(
      "Jika diberi luas segi empat sama, operasi apa mencari sisi?",
      "Gunakan punca kuasa dua.",
      "If the area of a square is given, which operation finds the side?",
      "Use square root.",
    ),
    mathCard(
      "Jika diberi isipadu kubus, operasi apa mencari sisi?",
      "Gunakan punca kuasa tiga.",
      "If the volume of a cube is given, which operation finds the edge?",
      "Use cube root.",
    ),
    mathCard("Berapakah √49?", "7.", "What is √49?", "7."),
    mathCard("Berapakah ∛64?", "4.", "What is ∛64?", "4."),
    mathCard("Berapakah ∛(-27)?", "-3.", "What is ∛(-27)?", "-3."),
  ],
  facts: [
    mathCard("1² = ?", "1.", "1² = ?", "1."),
    mathCard("2² = ?", "4.", "2² = ?", "4."),
    mathCard("5² = ?", "25.", "5² = ?", "25."),
    mathCard("6² = ?", "36.", "6² = ?", "36."),
    mathCard("2³ = ?", "8.", "2³ = ?", "8."),
    mathCard("3³ = ?", "27.", "3³ = ?", "27."),
    mathCard("4³ = ?", "64.", "4³ = ?", "64."),
    mathCard("5³ = ?", "125.", "5³ = ?", "125."),
    mathCard("10³ = ?", "1000.", "10³ = ?", "1000."),
    mathCard("√(49/81) = ?", "7/9.", "√(49/81) = ?", "7/9."),
  ],
  practice: [
    mathCard("4² = ?", "16.", "4² = ?", "16."),
    mathCard("√36 = ?", "6.", "√36 = ?", "6."),
    mathCard("2³ = ?", "8.", "2³ = ?", "8."),
    mathCard("∛8 = ?", "2.", "∛8 = ?", "2."),
    mathCard(
      "Jika luas segi empat sama ialah 81 cm², panjang sisinya ialah?",
      "9 cm.",
      "If the area of a square is 81 cm², what is its side length?",
      "9 cm.",
    ),
  ],
};

const MATH_F1_C4_FLASHCARD_PAIRS: Record<
  MathFlashcardCategoryId,
  Array<{ bm: [string, string]; dlp: [string, string] }>
> = {
  concepts: [
    mathCard(
      "Apakah nisbah?",
      "Nisbah ialah perbandingan dua atau lebih kuantiti yang sama jenis dan unit.",
      "What is a ratio?",
      "A ratio compares two or more quantities of the same kind and same unit.",
    ),
    mathCard(
      "Bagaimana nisbah ditulis?",
      "Dalam bentuk a : b atau a : b : c.",
      "How is a ratio written?",
      "In the form a : b or a : b : c.",
    ),
    mathCard(
      "Apakah syarat utama membentuk nisbah?",
      "Kuantiti mestilah sama jenis dan sama unit.",
      "What is the main condition to form a ratio?",
      "The quantities must be of the same kind and same unit.",
    ),
    mathCard(
      "Apakah nisbah setara?",
      "Nisbah yang mempunyai nilai sama tetapi ditulis dalam bentuk berbeza.",
      "What are equivalent ratios?",
      "Ratios that have the same value but are written differently.",
    ),
    mathCard(
      "Bagaimana mendapat nisbah setara?",
      "Darab atau bahagi setiap sebutan dengan nombor sama bukan sifar.",
      "How do you form an equivalent ratio?",
      "Multiply or divide each term by the same non-zero number.",
    ),
    mathCard(
      "Apakah bentuk termudah nisbah?",
      "Apabila FSTB semua sebutan ialah 1.",
      "What is the simplest form of a ratio?",
      "When the HCF of all terms is 1.",
    ),
    mathCard(
      "Bagaimana mempermudah nisbah?",
      "Bahagi semua sebutan dengan FSTB mereka.",
      "How do you simplify a ratio?",
      "Divide every term by their HCF.",
    ),
    mathCard(
      "Apakah yang perlu dilakukan jika nisbah dalam unit berbeza?",
      "Tukar kepada unit yang sama dahulu.",
      "What should you do if a ratio has different units?",
      "Convert to the same unit first.",
    ),
    mathCard(
      "Apakah kadar?",
      "Kadar ialah perbandingan dua kuantiti yang berlainan jenis atau unit.",
      "What is a rate?",
      "A rate compares two quantities of different kinds or units.",
    ),
    mathCard(
      "Berikan contoh kadar.",
      "60 km/j, RM 5 per kg, 12 km per liter.",
      "Give examples of rates.",
      "60 km/h, RM 5 per kg, 12 km per litre.",
    ),
    mathCard(
      "Apakah perbezaan utama nisbah dan kadar?",
      "Nisbah membandingkan kuantiti sama jenis; kadar membandingkan kuantiti berbeza jenis.",
      "What is the main difference between a ratio and a rate?",
      "A ratio compares same-kind quantities; a rate compares different-kind quantities.",
    ),
    mathCard(
      "Apakah kadaran?",
      "Kadaran ialah persamaan dua nisbah atau dua kadar yang setara.",
      "What is a proportion?",
      "A proportion is an equation of two equivalent ratios or rates.",
    ),
    mathCard(
      "Bagaimana kadaran ditulis?",
      "a : b = c : d atau a/b = c/d.",
      "How is a proportion written?",
      "a : b = c : d or a/b = c/d.",
    ),
    mathCard(
      "Apakah maksud nisbah sebagai pecahan?",
      "Nisbah a : b boleh ditulis sebagai a/b.",
      "What does ratio mean as a fraction?",
      "The ratio a : b can be written as a/b.",
    ),
    mathCard(
      "Bagaimana peratusan ditulis sebagai nisbah?",
      "x% ditulis sebagai x : 100.",
      "How is a percentage written as a ratio?",
      "x% is written as x : 100.",
    ),
  ],
  operations: [
    mathCard(
      "Apakah langkah pertama mempermudah nisbah?",
      "Cari FSTB bagi semua sebutan.",
      "What is the first step to simplify a ratio?",
      "Find the HCF of all the terms.",
    ),
    mathCard(
      "Bagaimana menggabungkan A : B dan B : C?",
      "Samakan nilai B menggunakan GSTK, kemudian gabungkan.",
      "How do you combine A : B and B : C?",
      "Make the value of B equal using the LCM, then combine.",
    ),
    mathCard(
      "Apakah kaedah unitari?",
      "Cari nilai satu unit, kemudian darab dengan bilangan unit yang dikehendaki.",
      "What is the unitary method?",
      "Find the value of one unit, then multiply by the number of units required.",
    ),
    mathCard(
      "Apakah kaedah kadaran?",
      "Tulis dua nisbah sebagai pecahan setara dan selesaikan.",
      "What is the proportion method?",
      "Write the two ratios as equivalent fractions and solve.",
    ),
    mathCard(
      "Apakah kaedah pendaraban silang?",
      "Jika a/b = c/d, maka a × d = b × c.",
      "What is the cross-multiplication method?",
      "If a/b = c/d, then a × d = b × c.",
    ),
    mathCard(
      "Bilakah kaedah pendaraban silang digunakan?",
      "Apabila nilai tidak diketahui berada dalam pengangka atau penyebut kadaran.",
      "When is cross multiplication used?",
      "When the unknown is in the numerator or denominator of a proportion.",
    ),
    mathCard(
      "Bagaimana menukar RM per m kepada RM per cm?",
      "Bahagikan dengan 100 kerana 1 m = 100 cm.",
      "How do you convert RM per m to RM per cm?",
      "Divide by 100 because 1 m = 100 cm.",
    ),
    mathCard(
      "Bagaimana menukar km/j kepada m/s?",
      "Bahagi dengan 3.6 atau darab dengan 1000/3600.",
      "How do you convert km/h to m/s?",
      "Divide by 3.6 or multiply by 1000/3600.",
    ),
    mathCard(
      "Bagaimana mencari kadar laju?",
      "Bahagikan jarak dengan masa.",
      "How do you find speed?",
      "Divide distance by time.",
    ),
    mathCard(
      "Bagaimana mencari harga seunit?",
      "Bahagikan jumlah harga dengan kuantiti.",
      "How do you find unit price?",
      "Divide total price by quantity.",
    ),
    mathCard(
      "Bagaimana mengesahkan dua nisbah setara?",
      "Permudahkan kedua-duanya kepada bentuk termudah dan bandingkan.",
      "How do you check two ratios are equivalent?",
      "Reduce both to simplest form and compare.",
    ),
    mathCard(
      "Bagaimana menyelesaikan 4/6 = x/9?",
      "Pendaraban silang: 4 × 9 = 6x, x = 6.",
      "How do you solve 4/6 = x/9?",
      "Cross multiply: 4 × 9 = 6x, x = 6.",
    ),
    mathCard(
      "Bagaimana mempermudah 12 : 18?",
      "FSTB = 6, jadi 12 : 18 = 2 : 3.",
      "How do you simplify 12 : 18?",
      "HCF = 6, so 12 : 18 = 2 : 3.",
    ),
    mathCard(
      "Bagaimana mempermudah 6 : 9 : 12?",
      "FSTB = 3, jadi 6 : 9 : 12 = 2 : 3 : 4.",
      "How do you simplify 6 : 9 : 12?",
      "HCF = 3, so 6 : 9 : 12 = 2 : 3 : 4.",
    ),
    mathCard(
      "Bagaimana mengira skala peta?",
      "Skala 1 : n bermaksud 1 unit pada peta = n unit sebenar.",
      "How do you read a map scale?",
      "A scale of 1 : n means 1 unit on the map = n actual units.",
    ),
  ],
  facts: [
    mathCard("1 m = ? cm", "100 cm.", "1 m = ? cm", "100 cm."),
    mathCard("1 km = ? m", "1000 m.", "1 km = ? m", "1000 m."),
    mathCard("1 jam = ? minit", "60 minit.", "1 hour = ? minutes", "60 minutes."),
    mathCard("1 kg = ? g", "1000 g.", "1 kg = ? g", "1000 g."),
    mathCard("50% sebagai nisbah?", "1 : 2.", "50% as a ratio?", "1 : 2."),
    mathCard("25% sebagai nisbah?", "1 : 4.", "25% as a ratio?", "1 : 4."),
    mathCard("20% sebagai nisbah?", "1 : 5.", "20% as a ratio?", "1 : 5."),
    mathCard("80% sebagai nisbah?", "4 : 5.", "80% as a ratio?", "4 : 5."),
    mathCard("75% sebagai nisbah?", "3 : 4.", "75% as a ratio?", "3 : 4."),
    mathCard(
      "Formula pendaraban silang?",
      "a × d = b × c.",
      "Cross-multiplication formula?",
      "a × d = b × c.",
    ),
    mathCard(
      "Formula peratusan kepada bahagian?",
      "x/100 = Bahagian/Keseluruhan.",
      "Percentage to part formula?",
      "x/100 = Part/Whole.",
    ),
    mathCard(
      "Formula anggaran populasi?",
      "(Ditangkap bertanda / Jumlah ditangkap semula) = (Asal ditanda / Anggaran populasi).",
      "Population estimation formula?",
      "(Marked recaptured / Total recaptured) = (Originally marked / Estimated population).",
    ),
    mathCard("2 : 3 = 4 : ?", "6.", "2 : 3 = 4 : ?", "6."),
    mathCard("3 : 5 = ? : 15", "9.", "3 : 5 = ? : 15", "9."),
    mathCard("FSTB bagi 8 dan 12?", "4.", "HCF of 8 and 12?", "4."),
  ],
  practice: [
    mathCard("Permudahkan 15 : 25.", "3 : 5.", "Simplify 15 : 25.", "3 : 5."),
    mathCard(
      "Jika 5 buku berharga RM 20, harga 8 buku ialah?",
      "RM 32.",
      "If 5 books cost RM 20, the cost of 8 books is?",
      "RM 32.",
    ),
    mathCard("Selesaikan 3/4 = x/12.", "x = 9.", "Solve 3/4 = x/12.", "x = 9."),
    mathCard(
      "Kereta bergerak 120 km dalam 2 jam. Apakah kelajuannya?",
      "60 km/j.",
      "A car travels 120 km in 2 hours. What is its speed?",
      "60 km/h.",
    ),
    mathCard(
      "Jika A : B = 2 : 3 dan B : C = 4 : 5, maka A : B : C ialah?",
      "8 : 12 : 15.",
      "If A : B = 2 : 3 and B : C = 4 : 5, then A : B : C is?",
      "8 : 12 : 15.",
    ),
    mathCard(
      "Tukar RM 8 per m kepada RM per cm.",
      "RM 0.08 per cm.",
      "Convert RM 8 per m to RM per cm.",
      "RM 0.08 per cm.",
    ),
    mathCard("Adakah 2 : 3 dan 8 : 12 setara?", "Ya.", "Are 2 : 3 and 8 : 12 equivalent?", "Yes."),
    mathCard("Permudahkan 200 g : 1 kg.", "1 : 5.", "Simplify 200 g : 1 kg.", "1 : 5."),
    mathCard(
      "Tulis 40% sebagai nisbah termudah.",
      "2 : 5.",
      "Write 40% as a simplest ratio.",
      "2 : 5.",
    ),
    mathCard("5 pen = RM 15. Harga 3 pen?", "RM 9.", "5 pens = RM 15. Price of 3 pens?", "RM 9."),
    mathCard(
      "Skala peta 1 : 1000. Jarak sebenar 5 cm pada peta ialah?",
      "5000 cm atau 50 m.",
      "Map scale 1 : 1000. Actual distance for 5 cm on map?",
      "5000 cm or 50 m.",
    ),
    mathCard(
      "20 ditanda dilepaskan; 50 ditangkap, 10 bertanda. Anggaran populasi?",
      "100.",
      "20 marked released; 50 recaptured, 10 marked. Estimated population?",
      "100.",
    ),
    mathCard(
      "Resipi untuk 4 orang gunakan 200 g tepung. Untuk 6 orang?",
      "300 g.",
      "Recipe for 4 uses 200 g flour. For 6 people?",
      "300 g.",
    ),
    mathCard(
      "Kadar 90 km/j sama dengan berapa m/s?",
      "25 m/s.",
      "Rate 90 km/h equals how many m/s?",
      "25 m/s.",
    ),
    mathCard(
      "Jika nisbah lelaki kepada perempuan 3 : 2 dan jumlah 25, berapa lelaki?",
      "15.",
      "If boys to girls is 3 : 2 and total is 25, how many boys?",
      "15.",
    ),
  ],
};

const MATH_F1_C5_FLASHCARD_PAIRS: Record<
  MathFlashcardCategoryId,
  Array<{ bm: [string, string]; dlp: [string, string] }>
> = {
  concepts: [
    mathCard(
      "Apakah maksud algebra?",
      "Algebra ialah cabang matematik yang menggunakan huruf untuk mewakili nombor atau nilai yang tidak diketahui.",
      "What is algebra?",
      "Algebra is a branch of mathematics that uses letters to represent numbers or unknown values.",
    ),
    mathCard(
      "Daripada perkataan apakah istilah 'algebra' berasal?",
      "Daripada perkataan Arab 'al-jabr'.",
      "What word does the term 'algebra' come from?",
      "From the Arabic word 'al-jabr'.",
    ),
    mathCard(
      "Apakah pemboleh ubah?",
      "Huruf atau simbol yang mewakili suatu nilai yang tidak diketahui.",
      "What is a variable?",
      "A letter or symbol that represents an unknown value.",
    ),
    mathCard(
      "Berikan contoh pemboleh ubah.",
      "x, y, n, a.",
      "Give examples of variables.",
      "x, y, n, a.",
    ),
    mathCard(
      "Apakah perbezaan antara nilai tetap dan nilai berubah?",
      "Nilai tetap tidak berubah, manakala nilai berubah boleh berubah mengikut keadaan.",
      "What is the difference between a fixed value and a varied value?",
      "A fixed value does not change, while a varied value can change depending on circumstances.",
    ),
    mathCard(
      "Berikan contoh nilai tetap.",
      "Kadar faedah tahunan.",
      "Give an example of a fixed value.",
      "Annual interest rate.",
    ),
    mathCard(
      "Berikan contoh nilai berubah.",
      "Masa perjalanan ke sekolah setiap hari.",
      "Give an example of a varied value.",
      "Daily travel time to school.",
    ),
    mathCard(
      "Apakah ungkapan algebra?",
      "Gabungan nombor, pemboleh ubah dan operasi seperti tambah, tolak atau darab.",
      "What is an algebraic expression?",
      "A combination of numbers, variables and operations such as addition, subtraction or multiplication.",
    ),
    mathCard(
      "Apakah sebutan algebra?",
      "Nombor, pemboleh ubah, atau hasil darab antara nombor dengan pemboleh ubah.",
      "What is an algebraic term?",
      "A number, a variable, or the product of a number and a variable.",
    ),
    mathCard(
      "Apakah pekali?",
      "Faktor nombor yang mendarab pemboleh ubah dalam sesuatu sebutan.",
      "What is a coefficient?",
      "The numerical factor that multiplies a variable in a term.",
    ),
    mathCard(
      "Apakah sebutan serupa?",
      "Sebutan algebra yang mempunyai pemboleh ubah dan kuasa yang sama.",
      "What are like terms?",
      "Algebraic terms that have the same variables and the same powers.",
    ),
    mathCard(
      "Apakah sebutan tidak serupa?",
      "Sebutan algebra yang mempunyai pemboleh ubah berbeza atau kuasa yang berbeza.",
      "What are unlike terms?",
      "Algebraic terms that have different variables or different powers.",
    ),
    mathCard(
      "Mengapakah xy dan yx dianggap sebutan serupa?",
      "Kerana x × y = y × x, jadi kedua-duanya mewakili hasil darab pemboleh ubah yang sama.",
      "Why are xy and yx considered like terms?",
      "Because x × y = y × x, so both represent the product of the same variables.",
    ),
    mathCard(
      "Mengapakah x dan x² ialah sebutan tidak serupa?",
      "Kerana kuasa pemboleh ubah berbeza, iaitu kuasa 1 berbanding kuasa 2.",
      "Why are x and x² unlike terms?",
      "Because the powers of the variable are different — power 1 compared with power 2.",
    ),
    mathCard(
      "Apakah pekali bagi sebutan y?",
      "1, kerana y bermaksud 1y.",
      "What is the coefficient of the term y?",
      "1, because y means 1y.",
    ),
  ],
  operations: [
    mathCard(
      "Apakah kaedah penggantian?",
      "Kaedah menggantikan pemboleh ubah dengan nilai nombor untuk mencari nilai sesuatu ungkapan.",
      "What is the substitution method?",
      "A method of replacing variables with numerical values to find the value of an expression.",
    ),
    mathCard(
      "Apakah peraturan utama bagi penambahan dan penolakan ungkapan algebra?",
      "Hanya sebutan serupa boleh ditambah atau ditolak antara satu sama lain.",
      "What is the main rule for adding and subtracting algebraic expressions?",
      "Only like terms can be added to or subtracted from each other.",
    ),
    mathCard(
      "Bagaimana cara mempermudah −(a + b)?",
      "−(a + b) = −a − b.",
      "How do you simplify −(a + b)?",
      "−(a + b) = −a − b.",
    ),
    mathCard(
      "Bagaimana cara mempermudah −(a − b)?",
      "−(a − b) = −a + b.",
      "How do you simplify −(a − b)?",
      "−(a − b) = −a + b.",
    ),
    mathCard(
      "Bagaimana cara mempermudah −(−a − b)?",
      "−(−a − b) = a + b.",
      "How do you simplify −(−a − b)?",
      "−(−a − b) = a + b.",
    ),
    mathCard(
      "Apakah peraturan apabila tanda negatif berada di hadapan kurungan?",
      "Setiap sebutan di dalam kurungan didarab dengan tanda negatif itu, jadi tanda setiap sebutan bertukar.",
      "What is the rule when a negative sign is in front of brackets?",
      "Every term inside the brackets is multiplied by that negative sign, so each term's sign changes.",
    ),
    mathCard(
      "Apakah peraturan untuk mendarab sebutan algebra dengan pemboleh ubah yang sama?",
      "Tambahkan kuasa pemboleh ubah tersebut: aᵐ × aⁿ = aᵐ⁺ⁿ.",
      "What is the rule for multiplying algebraic terms with the same variable?",
      "Add the powers of that variable: aᵐ × aⁿ = aᵐ⁺ⁿ.",
    ),
    mathCard(
      "Apakah peraturan untuk membahagi sebutan algebra dengan pemboleh ubah yang sama?",
      "Tolakkan kuasa pemboleh ubah tersebut: aᵐ ÷ aⁿ = aᵐ⁻ⁿ.",
      "What is the rule for dividing algebraic terms with the same variable?",
      "Subtract the powers of that variable: aᵐ ÷ aⁿ = aᵐ⁻ⁿ.",
    ),
    mathCard(
      "Bagaimana menulis pendaraban berulang a × a × a dalam bentuk kuasa?",
      "a³.",
      "How do you write the repeated multiplication a × a × a in power form?",
      "a³.",
    ),
    mathCard(
      "Apakah langkah pertama semasa mendarab 3ab² × 4a³b?",
      "Darabkan pekali kedua-dua sebutan terlebih dahulu: 3 × 4 = 12.",
      "What is the first step when multiplying 3ab² × 4a³b?",
      "Multiply the coefficients of both terms first: 3 × 4 = 12.",
    ),
    mathCard(
      "Apakah langkah pertama semasa membahagi 20m⁴n² ÷ 5m²n³?",
      "Bahagikan pekali kedua-dua sebutan terlebih dahulu: 20 ÷ 5 = 4.",
      "What is the first step when dividing 20m⁴n² ÷ 5m²n³?",
      "Divide the coefficients of both terms first: 20 ÷ 5 = 4.",
    ),
    mathCard(
      "Bagaimana cara mengenal pasti sebutan serupa dalam sesuatu ungkapan?",
      "Cari sebutan yang mempunyai pemboleh ubah yang sama dan kuasa yang sama.",
      "How do you identify like terms in an expression?",
      "Look for terms that have the same variables and the same powers.",
    ),
    mathCard(
      "Apakah yang perlu dilakukan jika kuasa hasil pembahagian menjadi negatif?",
      "Tulis jawapan dalam bentuk pecahan, contohnya n⁻¹ ditulis sebagai 1/n.",
      "What should you do if the power resulting from a division becomes negative?",
      "Write the answer as a fraction, for example n⁻¹ is written as 1/n.",
    ),
    mathCard(
      "Apakah tertib operasi yang perlu diikuti semasa menggantikan nilai ke dalam ungkapan?",
      "Selesaikan pendaraban terlebih dahulu sebelum penambahan dan penolakan.",
      "What order of operations should be followed when substituting values into an expression?",
      "Carry out multiplication first, before addition and subtraction.",
    ),
    mathCard(
      "Apakah kesilapan biasa apabila menambah sebutan 3x dan 2y?",
      "Menulisnya sebagai 5xy, sedangkan x dan y bukan sebutan serupa dan tidak boleh digabungkan menjadi satu sebutan.",
      "What is a common mistake when adding the terms 3x and 2y?",
      "Writing it as 5xy, when x and y are not like terms and cannot be combined into one term.",
    ),
  ],
  facts: [
    mathCard("a × a = ?", "a².", "a × a = ?", "a²."),
    mathCard("a × a × a = ?", "a³.", "a × a × a = ?", "a³."),
    mathCard(
      "Apakah formula bagi −(a + b)?",
      "−a − b.",
      "What is the formula for −(a + b)?",
      "−a − b.",
    ),
    mathCard(
      "Apakah formula bagi −(a − b)?",
      "−a + b.",
      "What is the formula for −(a − b)?",
      "−a + b.",
    ),
    mathCard(
      "Apakah formula bagi −(−a − b)?",
      "a + b.",
      "What is the formula for −(−a − b)?",
      "a + b.",
    ),
    mathCard(
      "Apakah formula hukum penambahan kuasa?",
      "aᵐ × aⁿ = aᵐ⁺ⁿ.",
      "What is the law of adding powers?",
      "aᵐ × aⁿ = aᵐ⁺ⁿ.",
    ),
    mathCard(
      "Apakah formula hukum penolakan kuasa?",
      "aᵐ ÷ aⁿ = aᵐ⁻ⁿ.",
      "What is the law of subtracting powers?",
      "aᵐ ÷ aⁿ = aᵐ⁻ⁿ.",
    ),
    mathCard("Pekali bagi 3x ialah?", "3.", "The coefficient of 3x is?", "3."),
    mathCard("Pekali bagi −7ab ialah?", "−7.", "The coefficient of −7ab is?", "−7."),
    mathCard("Pekali bagi y ialah?", "1.", "The coefficient of y is?", "1."),
    mathCard("Pekali bagi −n ialah?", "−1.", "The coefficient of −n is?", "−1."),
    mathCard(
      "a² dibaca sebagai apa dan bermaksud apa?",
      "Dibaca 'a kuasa dua' dan bermaksud a × a.",
      "How is a² read and what does it mean?",
      "Read as 'a squared' and means a × a.",
    ),
    mathCard(
      "a³ dibaca sebagai apa dan bermaksud apa?",
      "Dibaca 'a kuasa tiga' dan bermaksud a × a × a.",
      "How is a³ read and what does it mean?",
      "Read as 'a cubed' and means a × a × a.",
    ),
    mathCard(
      "Bagaimana (a + b)(a + b)(a + b) ditulis dalam bentuk kuasa?",
      "(a + b)³.",
      "How is (a + b)(a + b)(a + b) written in power form?",
      "(a + b)³.",
    ),
    mathCard("n⁻¹ adalah sama dengan?", "1/n.", "n⁻¹ is equal to?", "1/n."),
  ],
  practice: [
    mathCard("3x + 2x = ?", "5x.", "3x + 2x = ?", "5x."),
    mathCard("7ab − 4ab = ?", "3ab.", "7ab − 4ab = ?", "3ab."),
    mathCard("8x − 5x = ?", "3x.", "8x − 5x = ?", "3x."),
    mathCard("5y + 6y = ?", "11y.", "5y + 6y = ?", "11y."),
    mathCard("Permudahkan −(x + 4).", "−x − 4.", "Simplify −(x + 4).", "−x − 4."),
    mathCard("Permudahkan −(3a − 2b).", "−3a + 2b.", "Simplify −(3a − 2b).", "−3a + 2b."),
    mathCard("Permudahkan 5x − (2x − 3).", "3x + 3.", "Simplify 5x − (2x − 3).", "3x + 3."),
    mathCard("a × a² = ?", "a³.", "a × a² = ?", "a³."),
    mathCard("a⁵ ÷ a² = ?", "a³.", "a⁵ ÷ a² = ?", "a³."),
    mathCard("2a × 3a = ?", "6a².", "2a × 3a = ?", "6a²."),
    mathCard("3ab² × 4a³b = ?", "12a⁴b³.", "3ab² × 4a³b = ?", "12a⁴b³."),
    mathCard("20m⁴n² ÷ 5m²n³ = ?", "4m²/n.", "20m⁴n² ÷ 5m²n³ = ?", "4m²/n."),
    mathCard(
      "Jika x = 3, cari nilai 2x + 1.",
      "2(3) + 1 = 7.",
      "If x = 3, find the value of 2x + 1.",
      "2(3) + 1 = 7.",
    ),
    mathCard(
      "Jika x = 3 dan y = 2, cari nilai 8x − 5y + 7.",
      "8(3) − 5(2) + 7 = 21.",
      "If x = 3 and y = 2, find the value of 8x − 5y + 7.",
      "8(3) − 5(2) + 7 = 21.",
    ),
    mathCard(
      "Tulis ungkapan algebra bagi 'n biji gula-gula tambah 6'.",
      "n + 6.",
      "Write the algebraic expression for 'n sweets plus 6'.",
      "n + 6.",
    ),
  ],
};

const MATH_F1_C6_FLASHCARD_PAIRS: Record<
  MathFlashcardCategoryId,
  Array<{ bm: [string, string]; dlp: [string, string] }>
> = {
  concepts: [
    mathCard(
      "Apakah persamaan linear?",
      "Persamaan yang kuasa tertinggi pemboleh ubahnya ialah 1.",
      "What is a linear equation?",
      "An equation in which the highest power of the variable is 1.",
    ),
    mathCard(
      "Bagaimanakah anda mengenal pasti persamaan linear?",
      "Periksa kuasa tertinggi setiap pemboleh ubah; jika semuanya berkuasa 1, persamaan itu linear.",
      "How do you identify a linear equation?",
      "Check the highest power of every variable; if all are raised to power 1, the equation is linear.",
    ),
    mathCard(
      "Berikan contoh persamaan tidak linear.",
      "10x² + 5x − 3 = 1, kerana x berkuasa 2.",
      "Give an example of a non-linear equation.",
      "10x² + 5x − 3 = 1, because x is raised to power 2.",
    ),
    mathCard(
      "Apakah ciri utama persamaan linear dalam satu pemboleh ubah?",
      "Ia hanya mengandungi satu jenis pemboleh ubah yang berkuasa 1.",
      "What is the main feature of a linear equation in one variable?",
      "It contains only one type of variable, raised to the power of 1.",
    ),
    mathCard(
      "Berikan contoh persamaan linear dalam satu pemboleh ubah.",
      "x + 7 = 11.",
      "Give an example of a linear equation in one variable.",
      "x + 7 = 11.",
    ),
    mathCard(
      "Apakah ciri utama persamaan linear dalam dua pemboleh ubah?",
      "Ia mengandungi dua pemboleh ubah berbeza yang setiap satunya berkuasa 1.",
      "What is the main feature of a linear equation in two variables?",
      "It contains two different variables, each raised to the power of 1.",
    ),
    mathCard(
      "Berikan contoh persamaan linear dalam dua pemboleh ubah.",
      "5x + 2y = 8.",
      "Give an example of a linear equation in two variables.",
      "5x + 2y = 8.",
    ),
    mathCard(
      "Apakah maksud 'menyelesaikan' suatu persamaan linear?",
      "Mencari nilai pemboleh ubah yang menjadikan kedua-dua belah persamaan sama nilai.",
      "What does it mean to 'solve' a linear equation?",
      "Finding the value of the variable that makes both sides of the equation equal in value.",
    ),
    mathCard(
      "Berapakah bilangan penyelesaian bagi persamaan linear dalam dua pemboleh ubah?",
      "Tidak terhingga banyaknya.",
      "How many solutions does a linear equation in two variables have?",
      "An infinite number of solutions.",
    ),
    mathCard(
      "Apakah persamaan linear serentak?",
      "Dua atau lebih persamaan linear yang melibatkan pemboleh ubah sama, diselesaikan bersama.",
      "What are simultaneous linear equations?",
      "Two or more linear equations involving the same variables, solved together.",
    ),
    mathCard(
      "Mengapakah persamaan itu dipanggil 'serentak'?",
      "Kerana penyelesaian (x, y) yang dicari mesti memuaskan kedua-dua persamaan pada masa yang sama.",
      "Why are these equations called 'simultaneous'?",
      "Because the solution (x, y) sought must satisfy both equations at the same time.",
    ),
    mathCard(
      "Apakah penyelesaian unik bagi persamaan serentak?",
      "Apabila dua garis lurus bersilang pada hanya satu titik.",
      "What is a unique solution for simultaneous equations?",
      "When the two straight lines intersect at exactly one point.",
    ),
    mathCard(
      "Bilakah persamaan serentak tiada penyelesaian?",
      "Apabila dua garis lurus selari dan tidak akan bersilang.",
      "When do simultaneous equations have no solution?",
      "When the two straight lines are parallel and never intersect.",
    ),
    mathCard(
      "Bilakah persamaan serentak mempunyai penyelesaian tak terhingga?",
      "Apabila kedua-dua persamaan mewakili garis lurus yang sama (bertindih).",
      "When do simultaneous equations have infinitely many solutions?",
      "When both equations represent the same straight line (overlapping).",
    ),
    mathCard(
      "Apakah maksud 'pemboleh ubah' dalam persamaan linear?",
      "Huruf atau simbol yang mewakili nilai yang tidak diketahui.",
      "What does 'variable' mean in a linear equation?",
      "A letter or symbol representing an unknown value.",
    ),
  ],
  operations: [
    mathCard(
      "Apakah konsep kesamaan dalam menyelesaikan persamaan linear?",
      "Melakukan operasi yang sama pada kedua-dua belah persamaan supaya ia kekal seimbang.",
      "What is the equality concept in solving linear equations?",
      "Performing the same operation on both sides of the equation so it stays balanced.",
    ),
    mathCard(
      "Bagaimanakah konsep kesamaan menyelesaikan x + 7 = 11?",
      "Tolak 7 daripada kedua-dua belah: x + 7 − 7 = 11 − 7, maka x = 4.",
      "How does the equality concept solve x + 7 = 11?",
      "Subtract 7 from both sides: x + 7 − 7 = 11 − 7, giving x = 4.",
    ),
    mathCard(
      "Apakah kaedah cuba jaya?",
      "Kaedah menyelesaikan persamaan dengan mencuba beberapa nilai sehingga kedua-dua belah sama nilai.",
      "What is the trial and error method?",
      "A method of solving an equation by trying several values until both sides are equal in value.",
    ),
    mathCard(
      "Apakah kelemahan kaedah cuba jaya?",
      "Mengambil masa lebih lama jika penyelesaiannya nombor besar atau pecahan.",
      "What is a limitation of the trial and error method?",
      "It takes longer when the solution is a large number or a fraction.",
    ),
    mathCard(
      "Apakah kaedah pematahbalikan?",
      "Kaedah menyelesaikan persamaan dengan membalikkan turutan operasi dan menggunakan operasi songsangnya.",
      "What is the backtracking method?",
      "A method that solves an equation by reversing the order of operations and using their inverse operations.",
    ),
    mathCard(
      "Apakah operasi songsang bagi penambahan?",
      "Penolakan (−).",
      "What is the inverse operation of addition?",
      "Subtraction (−).",
    ),
    mathCard(
      "Apakah operasi songsang bagi pendaraban?",
      "Pembahagian (÷).",
      "What is the inverse operation of multiplication?",
      "Division (÷).",
    ),
    mathCard(
      "Dalam kaedah pematahbalikan, dalam susunan apakah operasi songsang digunakan?",
      "Dalam susunan terbalik, iaitu dari luar ke dalam.",
      "In the backtracking method, in what order are inverse operations applied?",
      "In reverse order, that is, from the outside in.",
    ),
    mathCard(
      "Apakah kaedah penggantian?",
      "Kaedah menyelesaikan persamaan serentak dengan mengungkapkan satu pemboleh ubah dan menggantikannya ke persamaan lain.",
      "What is the substitution method?",
      "A method of solving simultaneous equations by expressing one variable and substituting it into the other equation.",
    ),
    mathCard(
      "Apakah langkah pertama dalam kaedah penggantian?",
      "Ungkapkan satu pemboleh ubah dalam sebutan pemboleh ubah yang satu lagi.",
      "What is the first step in the substitution method?",
      "Express one variable in terms of the other variable.",
    ),
    mathCard(
      "Apakah kaedah penghapusan?",
      "Kaedah menyelesaikan persamaan serentak dengan menyamakan pekali satu pemboleh ubah, kemudian menambah atau menolak persamaan.",
      "What is the elimination method?",
      "A method of solving simultaneous equations by equalising the coefficient of one variable, then adding or subtracting the equations.",
    ),
    mathCard(
      "Selepas pekali disamakan dalam kaedah penghapusan, apakah langkah seterusnya?",
      "Tambah atau tolak kedua-dua persamaan untuk menghapuskan satu pemboleh ubah.",
      "After equalising coefficients in the elimination method, what is the next step?",
      "Add or subtract the two equations to eliminate one variable.",
    ),
    mathCard(
      "Apakah kaedah graf untuk persamaan serentak?",
      "Melukis kedua-dua garis lurus pada satah Cartesan dan mencari titik persilangannya.",
      "What is the graphical method for simultaneous equations?",
      "Drawing both straight lines on a Cartesian plane and finding their point of intersection.",
    ),
    mathCard(
      "Apakah yang mesti dilakukan selepas mendapat nilai satu pemboleh ubah dalam kaedah penggantian atau penghapusan?",
      "Gantikan nilai itu semula ke salah satu persamaan untuk mencari nilai pemboleh ubah satu lagi.",
      "What must be done after finding the value of one variable in the substitution or elimination method?",
      "Substitute that value back into one of the equations to find the value of the other variable.",
    ),
    mathCard(
      "Bagaimanakah anda menyemak jawapan persamaan linear?",
      "Gantikan nilai yang diperoleh ke dalam persamaan asal; jika kedua-dua belah sama, jawapan betul.",
      "How do you check the answer to a linear equation?",
      "Substitute the obtained value back into the original equation; if both sides are equal, the answer is correct.",
    ),
  ],
  facts: [
    mathCard(
      "Tulis persamaan bagi: 'Suatu nombor m dibahagi dengan 6 memberi 12'.",
      "m/6 = 12.",
      "Write the equation for: 'A number m divided by 6 gives 12'.",
      "m/6 = 12.",
    ),
    mathCard(
      "Tulis persamaan bagi: 'Rahim ada RM p, belanja RM q, baki RM10'.",
      "p − q = 10.",
      "Write the equation for: 'Rahim has RM p, spends RM q, and has RM10 left'.",
      "p − q = 10.",
    ),
    mathCard(
      "Tulis persamaan bagi: 'Beza umur Salim, p tahun, dengan adiknya, q tahun, ialah 10 tahun'.",
      "p − q = 10.",
      "Write the equation for: 'The difference between Salim's age, p years, and his sister's age, q years, is 10 years'.",
      "p − q = 10.",
    ),
    mathCard(
      "Selesaikan x + 7 = 11 menggunakan konsep kesamaan.",
      "x = 4.",
      "Solve x + 7 = 11 using the equality concept.",
      "x = 4.",
    ),
    mathCard(
      "Selesaikan 4x/5 + 7 = 23 menggunakan kaedah pematahbalikan.",
      "x = 20.",
      "Solve 4x/5 + 7 = 23 using the backtracking method.",
      "x = 20.",
    ),
    mathCard(
      "Diberi y = 7x + 6, apakah nilai y apabila x = 0?",
      "y = 6.",
      "Given y = 7x + 6, what is the value of y when x = 0?",
      "y = 6.",
    ),
    mathCard(
      "Diberi y = 7x + 6, apakah nilai y apabila x = 1?",
      "y = 13.",
      "Given y = 7x + 6, what is the value of y when x = 1?",
      "y = 13.",
    ),
    mathCard(
      "Selesaikan persamaan serentak x + y = 10 dan x − y = 2 menggunakan kaedah penghapusan.",
      "x = 6, y = 4.",
      "Solve the simultaneous equations x + y = 10 and x − y = 2 using the elimination method.",
      "x = 6, y = 4.",
    ),
    mathCard(
      "Selesaikan persamaan serentak x + y = 10 dan x − y = 2 menggunakan kaedah penggantian.",
      "x = 6, y = 4.",
      "Solve the simultaneous equations x + y = 10 and x − y = 2 using the substitution method.",
      "x = 6, y = 4.",
    ),
    mathCard(
      "Apakah ciri dua garis lurus bagi persamaan serentak yang mempunyai penyelesaian unik?",
      "Kedua-dua garis mempunyai kecerunan berbeza dan bersilang pada satu titik.",
      "What is the feature of two lines for simultaneous equations with a unique solution?",
      "The two lines have different gradients and intersect at one point.",
    ),
    mathCard(
      "Apakah ciri dua garis lurus bagi persamaan serentak yang tiada penyelesaian?",
      "Kedua-dua garis mempunyai kecerunan sama tetapi pintasan-y berbeza (selari).",
      "What is the feature of two lines for simultaneous equations with no solution?",
      "The two lines have the same gradient but different y-intercepts (parallel).",
    ),
    mathCard(
      "Apakah ciri dua persamaan serentak yang mempunyai penyelesaian tak terhingga?",
      "Kedua-dua persamaan, apabila dipermudahkan, adalah setara antara satu sama lain.",
      "What is the feature of two simultaneous equations with infinitely many solutions?",
      "Both equations, when simplified, are equivalent to each other.",
    ),
    mathCard(
      "Apakah langkah pertama menggunakan kalkulator saintifik untuk persamaan serentak?",
      "Tekan butang MODE atau MENU.",
      "What is the first step in using a scientific calculator for simultaneous equations?",
      "Press the MODE or MENU button.",
    ),
    mathCard(
      "Selepas memilih Mod Persamaan pada kalkulator saintifik, apakah yang anda pilih seterusnya?",
      "Persamaan Serentak, kemudian 2 Tidak Diketahui.",
      "After selecting Equation Mode on a scientific calculator, what do you select next?",
      "Simultaneous Equation, then 2 Unknowns.",
    ),
    mathCard(
      "Bagaimanakah anda mendapatkan nilai x dan y selepas memasukkan pekali pada kalkulator saintifik?",
      "Tekan butang '=' untuk memperoleh nilai x dan y.",
      "How do you obtain the values of x and y after entering the coefficients on a scientific calculator?",
      "Press the '=' button to obtain the values of x and y.",
    ),
  ],
  practice: [
    mathCard(
      "Adakah 5r + 1 = 0 suatu persamaan linear?",
      "Ya, kerana kuasa tertinggi r ialah 1.",
      "Is 5r + 1 = 0 a linear equation?",
      "Yes, because the highest power of r is 1.",
    ),
    mathCard(
      "Adakah 10x² + 5x − 3 = 1 suatu persamaan linear?",
      "Tidak, kerana x berkuasa 2.",
      "Is 10x² + 5x − 3 = 1 a linear equation?",
      "No, because x is raised to the power of 2.",
    ),
    mathCard(
      "Berapakah nilai x dalam x + 7 = 11?",
      "x = 4.",
      "What is the value of x in x + 7 = 11?",
      "x = 4.",
    ),
    mathCard(
      "Gunakan kaedah cuba jaya untuk x + 5 = 9. Apakah nilai x?",
      "x = 4, kerana 4 + 5 = 9.",
      "Use trial and error for x + 5 = 9. What is the value of x?",
      "x = 4, because 4 + 5 = 9.",
    ),
    mathCard(
      "Apakah operasi songsang bagi penolakan dalam kaedah pematahbalikan?",
      "Penambahan (+).",
      "What is the inverse operation of subtraction in the backtracking method?",
      "Addition (+).",
    ),
    mathCard(
      "Apakah operasi songsang bagi pembahagian dalam kaedah pematahbalikan?",
      "Pendaraban (×).",
      "What is the inverse operation of division in the backtracking method?",
      "Multiplication (×).",
    ),
    mathCard(
      "Tulis satu pasangan penyelesaian (x, y) bagi y = 7x + 6 selain (0, 6) dan (1, 13).",
      "(2, 20), kerana y = 7(2) + 6 = 20.",
      "Write one solution pair (x, y) for y = 7x + 6 other than (0, 6) and (1, 13).",
      "(2, 20), because y = 7(2) + 6 = 20.",
    ),
    mathCard(
      "Dalam persamaan serentak x + y = 10 dan x − y = 2, apakah ungkapan x jika x dikira daripada persamaan pertama?",
      "x = 10 − y.",
      "In the simultaneous equations x + y = 10 and x − y = 2, what is x expressed as from the first equation?",
      "x = 10 − y.",
    ),
    mathCard(
      "Apabila (10 − y) − y = 2 dipermudahkan, apakah persamaan satu pemboleh ubah yang terhasil?",
      "10 − 2y = 2, lalu y = 4.",
      "When (10 − y) − y = 2 is simplified, what one-variable equation results?",
      "10 − 2y = 2, giving y = 4.",
    ),
    mathCard(
      "Apabila persamaan x + y = 10 dan x − y = 2 ditambah, apakah persamaan yang terhasil?",
      "2x = 12, lalu x = 6.",
      "When the equations x + y = 10 and x − y = 2 are added, what equation results?",
      "2x = 12, giving x = 6.",
    ),
    mathCard(
      "Selepas mendapat x = 6 daripada x + y = 10, apakah nilai y?",
      "y = 4, kerana 6 + y = 10.",
      "After finding x = 6 from x + y = 10, what is the value of y?",
      "y = 4, because 6 + y = 10.",
    ),
    mathCard(
      "Jika graf bagi dua persamaan serentak bersilang pada satu titik, berapakah penyelesaiannya?",
      "Satu penyelesaian (penyelesaian unik).",
      "If the graphs of two simultaneous equations intersect at one point, how many solutions are there?",
      "One solution (a unique solution).",
    ),
    mathCard(
      "Jika graf bagi dua persamaan serentak adalah selari, berapakah penyelesaiannya?",
      "Tiada penyelesaian.",
      "If the graphs of two simultaneous equations are parallel, how many solutions are there?",
      "No solution.",
    ),
    mathCard(
      "Jika graf bagi dua persamaan serentak bertindih sepenuhnya, berapakah penyelesaiannya?",
      "Tidak terhingga banyaknya.",
      "If the graphs of two simultaneous equations completely overlap, how many solutions are there?",
      "An infinite number of solutions.",
    ),
    mathCard(
      "Tulis persamaan linear dalam dua pemboleh ubah menggunakan x dan y dengan pekali 5 dan 2.",
      "5x + 2y = 8 (contoh).",
      "Write a linear equation in two variables using x and y with coefficients 5 and 2.",
      "5x + 2y = 8 (example).",
    ),
  ],
};

const MATH_F1_C7_FLASHCARD_PAIRS: Record<
  MathFlashcardCategoryId,
  Array<{ bm: [string, string]; dlp: [string, string] }>
> = {
  concepts: [
    mathCard(
      "Apakah ketaksamaan linear?",
      "Hubungan antara dua ungkapan linear yang tidak semestinya sama nilainya, dengan pemboleh ubah berkuasa 1.",
      "What is a linear inequality?",
      "A relationship between two linear expressions that are not necessarily equal, with the variable having a power of 1.",
    ),
    mathCard(
      "Apakah maksud 'linear' dalam ketaksamaan linear?",
      "Pemboleh ubah dalam ungkapan hanya berkuasa 1 sahaja.",
      "What does 'linear' mean in a linear inequality?",
      "The variable in the expression has a power of 1 only.",
    ),
    mathCard(
      "Berikan contoh ungkapan linear.",
      "4a, −7x, 2y + 3, 5m − 1 (semua pemboleh ubah berkuasa 1).",
      "Give examples of linear expressions.",
      "4a, −7x, 2y + 3, 5m − 1 (all variables have a power of 1).",
    ),
    mathCard(
      "Apakah perbezaan antara persamaan dan ketaksamaan?",
      "Persamaan menggunakan tanda = (kedua-dua belah sama nilai); ketaksamaan menggunakan simbol >, <, ≥, atau ≤.",
      "What is the difference between an equation and an inequality?",
      "An equation uses the = sign (both sides equal in value); an inequality uses >, <, ≥, or ≤.",
    ),
    mathCard(
      "Apakah simbol 'lebih besar daripada'?",
      "Simbol > (greater than).",
      "What is the symbol for 'greater than'?",
      "The symbol > (greater than).",
    ),
    mathCard(
      "Apakah simbol 'lebih kecil daripada'?",
      "Simbol < (less than).",
      "What is the symbol for 'less than'?",
      "The symbol < (less than).",
    ),
    mathCard(
      "Apakah simbol 'lebih besar daripada atau sama dengan'?",
      "Simbol ≥ (greater than or equal to).",
      "What is the symbol for 'greater than or equal to'?",
      "The symbol ≥ (greater than or equal to).",
    ),
    mathCard(
      "Apakah simbol 'lebih kecil daripada atau sama dengan'?",
      "Simbol ≤ (less than or equal to).",
      "What is the symbol for 'less than or equal to'?",
      "The symbol ≤ (less than or equal to).",
    ),
    mathCard(
      "Kata kunci apakah yang dikaitkan dengan simbol ≥?",
      "Sekurang-kurangnya, minimum, at least, tidak kurang daripada.",
      "What keywords are associated with the symbol ≥?",
      "At least, minimum, not less than, sekurang-kurangnya.",
    ),
    mathCard(
      "Kata kunci apakah yang dikaitkan dengan simbol ≤?",
      "Paling banyak, maksimum, at most, tidak melebihi.",
      "What keywords are associated with the symbol ≤?",
      "At most, maximum, not more than, paling banyak.",
    ),
    mathCard(
      "Apakah garis nombor dalam konteks ketaksamaan?",
      "Alat visual berbentuk garis mendatar untuk mewakili semua nilai yang memenuhi sesuatu ketaksamaan.",
      "What is a number line in the context of inequalities?",
      "A horizontal visual tool used to represent all values that satisfy a given inequality.",
    ),
    mathCard(
      "Bilakah bulatan terbuka ○ digunakan pada garis nombor?",
      "Apabila menggunakan simbol > atau < — nilai sempadan TIDAK termasuk dalam penyelesaian.",
      "When is an open circle ○ used on the number line?",
      "When using the symbol > or < — the boundary value is NOT included in the solution.",
    ),
    mathCard(
      "Bilakah bulatan tertutup ● digunakan pada garis nombor?",
      "Apabila menggunakan simbol ≥ atau ≤ — nilai sempadan TERMASUK dalam penyelesaian.",
      "When is a closed circle ● used on the number line?",
      "When using the symbol ≥ or ≤ — the boundary value IS included in the solution.",
    ),
    mathCard(
      "Ke arah manakah anak panah untuk x > 3?",
      "Anak panah menghala ke kanan (→), kerana x lebih besar daripada 3.",
      "Which direction does the arrow point for x > 3?",
      "The arrow points right (→), because x is greater than 3.",
    ),
    mathCard(
      "Ke arah manakah anak panah untuk x ≤ −4?",
      "Anak panah menghala ke kiri (←), kerana x lebih kecil daripada atau sama dengan −4.",
      "Which direction does the arrow point for x ≤ −4?",
      "The arrow points left (←), because x is less than or equal to −4.",
    ),
    mathCard(
      "Apakah ketaksamaan linear serentak?",
      "Dua atau lebih ketaksamaan linear yang perlu dipenuhi pada masa yang sama oleh satu pemboleh ubah.",
      "What are simultaneous linear inequalities?",
      "Two or more linear inequalities that must be satisfied at the same time by one variable.",
    ),
    mathCard(
      "Apakah nilai sepunya dalam ketaksamaan serentak?",
      "Nilai atau julat nilai yang memenuhi KEDUA-DUA ketaksamaan serentak pada masa yang sama.",
      "What are common values in simultaneous inequalities?",
      "Values or a range of values that satisfy BOTH simultaneous inequalities at the same time.",
    ),
    mathCard(
      "Bilakah terdapat tiada nilai sepunya dalam ketaksamaan serentak?",
      "Apabila kawasan penyelesaian kedua-dua ketaksamaan tidak bertindih langsung pada garis nombor.",
      "When are there no common values in simultaneous inequalities?",
      "When the solution regions of both inequalities do not overlap on the number line.",
    ),
  ],
  operations: [
    mathCard(
      "Apakah peraturan penting apabila mendarab ketaksamaan dengan nombor negatif?",
      "Arah simbol ketaksamaan MESTI DITUKAR.",
      "What is the important rule when multiplying an inequality by a negative number?",
      "The direction of the inequality symbol MUST BE REVERSED.",
    ),
    mathCard(
      "Apakah peraturan penting apabila membahagi ketaksamaan dengan nombor negatif?",
      "Arah simbol ketaksamaan MESTI DITUKAR.",
      "What is the important rule when dividing an inequality by a negative number?",
      "The direction of the inequality symbol MUST BE REVERSED.",
    ),
    mathCard(
      "Selesaikan −x > −3.",
      "Darab kedua-dua belah dengan −1 dan tukar simbol: x < 3.",
      "Solve −x > −3.",
      "Multiply both sides by −1 and reverse the symbol: x < 3.",
    ),
    mathCard(
      "Selesaikan −2x > 6.",
      "Bahagi kedua-dua belah dengan −2 dan tukar simbol: x < −3.",
      "Solve −2x > 6.",
      "Divide both sides by −2 and reverse the symbol: x < −3.",
    ),
    mathCard(
      "Selesaikan −4x ≤ 8.",
      "Bahagi kedua-dua belah dengan −4 dan tukar simbol: x ≥ −2.",
      "Solve −4x ≤ 8.",
      "Divide both sides by −4 and reverse the symbol: x ≥ −2.",
    ),
    mathCard(
      "Apakah Sifat Akas ketaksamaan?",
      "Jika a < b, maka b > a. Apabila susunan ditukar, simbol juga mesti ditukar.",
      "What is the Converse Property of inequalities?",
      "If a < b, then b > a. When the order is swapped, the symbol must also be reversed.",
    ),
    mathCard(
      "Tulis bentuk akas bagi x < 5.",
      "5 > x.",
      "Write the converse form of x < 5.",
      "5 > x.",
    ),
    mathCard(
      "Apakah Sifat Transitif ketaksamaan?",
      "Jika a < b dan b < c, maka a < c.",
      "What is the Transitive Property of inequalities?",
      "If a < b and b < c, then a < c.",
    ),
    mathCard(
      "Jika x < 3 dan 3 < 7, apakah kesimpulan menggunakan Sifat Transitif?",
      "x < 7.",
      "If x < 3 and 3 < 7, what is the conclusion using the Transitive Property?",
      "x < 7.",
    ),
    mathCard(
      "Apakah tiga langkah menyelesaikan ketaksamaan linear?",
      "Langkah 1: Selesaikan ketaksamaan. Langkah 2: Wakilkan pada garis nombor. Langkah 3: Senaraikan nilai integer yang mungkin.",
      "What are the three steps to solve a linear inequality?",
      "Step 1: Solve the inequality. Step 2: Represent on a number line. Step 3: List possible integer values.",
    ),
    mathCard(
      "Selesaikan 2x + 3 > 7.",
      "2x > 4, maka x > 2. Garis nombor: bulatan terbuka pada 2, anak panah ke kanan.",
      "Solve 2x + 3 > 7.",
      "2x > 4, so x > 2. Number line: open circle at 2, arrow right.",
    ),
    mathCard(
      "Selesaikan 3x − 1 ≤ 8.",
      "3x ≤ 9, maka x ≤ 3. Garis nombor: bulatan tertutup pada 3, anak panah ke kiri.",
      "Solve 3x − 1 ≤ 8.",
      "3x ≤ 9, so x ≤ 3. Number line: closed circle at 3, arrow left.",
    ),
    mathCard(
      "Selesaikan −2x + 5 > 1.",
      "−2x > −4, bahagi dengan −2 dan tukar simbol: x < 2.",
      "Solve −2x + 5 > 1.",
      "−2x > −4, divide by −2 and reverse: x < 2.",
    ),
    mathCard(
      "Apakah langkah menyelesaikan ketaksamaan serentak?",
      "Selesaikan setiap ketaksamaan, wakilkan pada garis nombor yang sama, kenal pasti kawasan bertindih.",
      "What are the steps to solve simultaneous inequalities?",
      "Solve each inequality, represent both on the same number line, identify the overlapping region.",
    ),
    mathCard(
      "Diberi x > 2 dan x > 5, apakah nilai sepunya?",
      "Gunakan syarat lebih ketat: x > 5. Nilai integer: 6, 7, 8, ...",
      "Given x > 2 and x > 5, what are the common values?",
      "Use the stricter condition: x > 5. Integer values: 6, 7, 8, ...",
    ),
    mathCard(
      "Diberi x ≤ 3 dan x ≤ 1, apakah nilai sepunya?",
      "Gunakan syarat lebih ketat: x ≤ 1. Nilai integer: 1, 0, −1, −2, ...",
      "Given x ≤ 3 and x ≤ 1, what are the common values?",
      "Use the stricter condition: x ≤ 1. Integer values: 1, 0, −1, −2, ...",
    ),
    mathCard(
      "Apakah Peraturan Salingan (Reciprocal Rule) untuk ketaksamaan?",
      "Jika a < b (dengan a, b > 0), maka 1/a > 1/b. Simbol ditukar apabila mengambil salingan.",
      "What is the Reciprocal Rule for inequalities?",
      "If a < b (where a, b > 0), then 1/a > 1/b. The symbol is reversed when taking the reciprocal.",
    ),
  ],
  facts: [
    mathCard(
      "Apakah bunyi Sifat Akas secara lengkap untuk semua empat simbol?",
      "Jika a < b → b > a; jika a > b → b < a; jika a ≤ b → b ≥ a; jika a ≥ b → b ≤ a.",
      "What is the full Converse Property for all four symbols?",
      "If a < b → b > a; if a > b → b < a; if a ≤ b → b ≥ a; if a ≥ b → b ≤ a.",
    ),
    mathCard(
      "Apakah bunyi Sifat Transitif secara lengkap?",
      "Jika a < b dan b < c, maka a < c. Berlaku juga untuk >, ≤, dan ≥.",
      "What is the full Transitive Property?",
      "If a < b and b < c, then a < c. Also applies for >, ≤, and ≥.",
    ),
    mathCard(
      "Berikan contoh nyata menggunakan Sifat Transitif.",
      "Jika x < 3 dan 3 < 7, maka x < 7.",
      "Give a real example using the Transitive Property.",
      "If x < 3 and 3 < 7, then x < 7.",
    ),
    mathCard(
      "Apakah nilai integer yang mungkin bagi x > 3?",
      "4, 5, 6, 7, ... (tidak terhingga, mulai dari 4).",
      "What are the possible integer values for x > 3?",
      "4, 5, 6, 7, ... (infinite, starting from 4).",
    ),
    mathCard(
      "Apakah nilai integer yang mungkin bagi x ≤ 2?",
      "2, 1, 0, −1, −2, ... (tidak terhingga, termasuk 2).",
      "What are the possible integer values for x ≤ 2?",
      "2, 1, 0, −1, −2, ... (infinite, including 2).",
    ),
    mathCard(
      "Apakah nilai integer yang mungkin bagi −1 < x ≤ 4?",
      "0, 1, 2, 3, 4.",
      "What are the possible integer values for −1 < x ≤ 4?",
      "0, 1, 2, 3, 4.",
    ),
    mathCard(
      "Apakah nilai integer yang mungkin bagi 2 ≤ x < 7?",
      "2, 3, 4, 5, 6.",
      "What are the possible integer values for 2 ≤ x < 7?",
      "2, 3, 4, 5, 6.",
    ),
    mathCard(
      "Apakah nilai integer yang mungkin bagi 1 < x < 5?",
      "2, 3, 4.",
      "What are the possible integer values for 1 < x < 5?",
      "2, 3, 4.",
    ),
    mathCard(
      "Apakah nilai integer yang mungkin bagi −3 ≤ x ≤ 3?",
      "−3, −2, −1, 0, 1, 2, 3.",
      "What are the possible integer values for −3 ≤ x ≤ 3?",
      "−3, −2, −1, 0, 1, 2, 3.",
    ),
    mathCard(
      "Apakah tiga senario kemungkinan dalam ketaksamaan serentak?",
      "1. Bertindih di tengah (ada nilai sepunya). 2. Bertindih satu arah (ada nilai sepunya, guna syarat ketat). 3. Tidak bertindih (tiada nilai sepunya).",
      "What are the three possible scenarios in simultaneous inequalities?",
      "1. Middle overlap (common values exist). 2. Same-direction overlap (use stricter condition). 3. No overlap (no common values).",
    ),
    mathCard(
      "Apakah contoh tiada nilai sepunya?",
      "x > 5 dan x < 2 — tiada nilai yang melebihi 5 dan kurang daripada 2 pada masa yang sama.",
      "What is an example of no common values?",
      "x > 5 and x < 2 — no value can be both greater than 5 and less than 2 at the same time.",
    ),
    mathCard(
      "Nyatakan formula Reciprocal Rule.",
      "Jika a < b dengan a, b > 0, maka 1/a > 1/b.",
      "State the Reciprocal Rule formula.",
      "If a < b where a, b > 0, then 1/a > 1/b.",
    ),
  ],
  practice: [
    mathCard(
      "Apakah simbol yang digunakan untuk 'sekurang-kurangnya 50'?",
      "≥ 50 (lebih besar daripada atau sama dengan 50).",
      "What symbol is used for 'at least 50'?",
      "≥ 50 (greater than or equal to 50).",
    ),
    mathCard(
      "Apakah simbol yang digunakan untuk 'tidak melebihi 100'?",
      "≤ 100 (lebih kecil daripada atau sama dengan 100).",
      "What symbol is used for 'does not exceed 100'?",
      "≤ 100 (less than or equal to 100).",
    ),
    mathCard(
      "Adakah x = 3 memenuhi ketaksamaan x > 3?",
      "Tidak. Bulatan terbuka bermaksud 3 tidak termasuk dalam penyelesaian.",
      "Does x = 3 satisfy the inequality x > 3?",
      "No. The open circle means 3 is not included in the solution.",
    ),
    mathCard(
      "Adakah x = 3 memenuhi ketaksamaan x ≥ 3?",
      "Ya. Bulatan tertutup bermaksud 3 termasuk dalam penyelesaian.",
      "Does x = 3 satisfy the inequality x ≥ 3?",
      "Yes. The closed circle means 3 is included in the solution.",
    ),
    mathCard(
      "Selesaikan x/3 + 1 ≥ 4 dan nyatakan tiga nilai integer yang mungkin.",
      "x ≥ 9. Nilai integer: 9, 10, 11.",
      "Solve x/3 + 1 ≥ 4 and state three possible integer values.",
      "x ≥ 9. Integer values: 9, 10, 11.",
    ),
    mathCard(
      "Tulis ketaksamaan bagi 'umur sekurang-kurangnya 18 tahun' dengan u mewakili umur.",
      "u ≥ 18.",
      "Write the inequality for 'age at least 18 years' where u represents age.",
      "u ≥ 18.",
    ),
    mathCard(
      "Selesaikan −3x < 9 dan nyatakan arah anak panah.",
      "Bahagi dengan −3, tukar simbol: x > −3. Anak panah ke kanan.",
      "Solve −3x < 9 and state the arrow direction.",
      "Divide by −3, reverse symbol: x > −3. Arrow points right.",
    ),
    mathCard(
      "Diberi x > −1 dan x ≤ 3, nyatakan nilai sepunya dalam bentuk ketaksamaan berganda.",
      "−1 < x ≤ 3.",
      "Given x > −1 and x ≤ 3, state the common values as a compound inequality.",
      "−1 < x ≤ 3.",
    ),
    mathCard(
      "Diberi x > 5 dan x < 2, apakah kesimpulannya?",
      "Tiada nilai sepunya kerana kawasan dua ketaksamaan tidak bertindih.",
      "Given x > 5 and x < 2, what is the conclusion?",
      "No common values because the regions of the two inequalities do not overlap.",
    ),
    mathCard(
      "Apakah nilai integer yang mungkin bagi ketaksamaan serentak x > 0 dan x ≤ 4?",
      "1, 2, 3, 4.",
      "What are the possible integer values for the simultaneous inequality x > 0 and x ≤ 4?",
      "1, 2, 3, 4.",
    ),
    mathCard(
      "Tukar ke bentuk akas: y ≤ 6.",
      "6 ≥ y.",
      "Convert to converse form: y ≤ 6.",
      "6 ≥ y.",
    ),
    mathCard(
      "Jika 2 < a dan a < 8, apakah kesimpulan menggunakan Sifat Transitif?",
      "2 < 8 (atau secara langsung: a berada antara 2 dan 8).",
      "If 2 < a and a < 8, what is the conclusion using the Transitive Property?",
      "2 < 8 (or directly: a lies between 2 and 8).",
    ),
    mathCard(
      "Selesaikan 5 − x > 2 dan nyatakan penyelesaian.",
      "−x > −3, darab dengan −1 dan tukar simbol: x < 3.",
      "Solve 5 − x > 2 and state the solution.",
      "−x > −3, multiply by −1 and reverse: x < 3.",
    ),
  ],
};

const MATH_F1_C8_FLASHCARD_PAIRS: Record<
  MathFlashcardCategoryId,
  Array<{ bm: [string, string]; dlp: [string, string] }>
> = {
  concepts: [
    mathCard(
      "Apakah sudut?",
      "Sudut ialah ukuran putaran antara dua tembereng garis yang bertemu di satu titik (bucu).",
      "What is an angle?",
      "An angle is the measure of rotation between two line segments meeting at a point (vertex).",
    ),
    mathCard(
      "Apakah sudut tirus?",
      "Sudut tirus ialah sudut yang lebih kecil daripada 90°. Contoh: 30°, 45°, 60°.",
      "What is an acute angle?",
      "An acute angle is an angle smaller than 90°. Examples: 30°, 45°, 60°.",
    ),
    mathCard(
      "Apakah sudut tegak?",
      "Sudut tegak ialah sudut yang tepat 90°. Ia ditandakan dengan simbol kotak kecil □.",
      "What is a right angle?",
      "A right angle is exactly 90°. It is marked with a small square symbol □.",
    ),
    mathCard(
      "Apakah sudut cakah?",
      "Sudut cakah ialah sudut yang lebih besar daripada 90° tetapi kurang daripada 180°. Contoh: 110°, 150°.",
      "What is an obtuse angle?",
      "An obtuse angle is greater than 90° but less than 180°. Examples: 110°, 150°.",
    ),
    mathCard(
      "Apakah sudut refleks?",
      "Sudut refleks ialah sudut yang lebih besar daripada 180° tetapi kurang daripada 360°. Contoh: 200°, 270°.",
      "What is a reflex angle?",
      "A reflex angle is greater than 180° but less than 360°. Examples: 200°, 270°.",
    ),
    mathCard(
      "Apakah sudut pelengkap?",
      "Sudut pelengkap ialah dua sudut yang berjumlah 90°. Setiap satu ialah pelengkap kepada yang lain.",
      "What are complementary angles?",
      "Complementary angles are two angles that sum to 90°. Each is the complement of the other.",
    ),
    mathCard(
      "Apakah sudut penggenap?",
      "Sudut penggenap ialah dua sudut yang berjumlah 180°. Setiap satu ialah penggenap kepada yang lain.",
      "What are supplementary angles?",
      "Supplementary angles are two angles that sum to 180°. Each is the supplement of the other.",
    ),
    mathCard(
      "Apakah sudut konjugat?",
      "Sudut konjugat ialah dua sudut yang berjumlah 360°. Mereka bersama-sama membentuk putaran lengkap.",
      "What are conjugate angles?",
      "Conjugate angles are two angles that sum to 360°. Together they form a complete turn.",
    ),
    mathCard(
      "Apakah sudut bertentang bucu?",
      "Sudut bertentang bucu ialah sudut-sudut yang berhadapan di titik persilangan dua garis. Sudut bertentang bucu adalah sama besar.",
      "What are vertically opposite angles?",
      "Vertically opposite angles are angles facing each other at the intersection of two lines. They are equal in size.",
    ),
    mathCard(
      "Apakah garis serenjang?",
      "Garis serenjang ialah dua garis yang bertemu pada sudut tepat 90°. Dilambangkan dengan simbol ⊥.",
      "What are perpendicular lines?",
      "Perpendicular lines are two lines that meet at exactly 90°. Denoted by the symbol ⊥.",
    ),
    mathCard(
      "Apakah garis selari?",
      "Garis selari ialah dua garis yang tidak bersilang walaupun dipanjangkan seberapa jauh. Jarak antara keduanya sentiasa sama.",
      "What are parallel lines?",
      "Parallel lines are two lines that never intersect even when extended. The distance between them is always the same.",
    ),
    mathCard(
      "Apakah garis rentas lintang?",
      "Garis rentas lintang ialah garis yang memotong dua atau lebih garis lain.",
      "What is a transversal?",
      "A transversal is a line that cuts across two or more other lines.",
    ),
    mathCard(
      "Apakah sudut sepadan?",
      "Sudut sepadan ialah sudut pada kedudukan yang sama di dua persilangan dengan garis rentas lintang. Sudut sepadan adalah sama besar (corak F).",
      "What are corresponding angles?",
      "Corresponding angles are in the same position at two intersections with a transversal. They are equal (F-pattern).",
    ),
    mathCard(
      "Apakah sudut selang-seli?",
      "Sudut selang-seli ialah sudut di kawasan dalam garis selari pada sisi yang berlawanan garis rentas. Sudut selang-seli adalah sama besar (corak Z/N).",
      "What are alternate angles?",
      "Alternate angles are between parallel lines on opposite sides of the transversal. They are equal (Z/N-pattern).",
    ),
    mathCard(
      "Apakah sudut pedalaman?",
      "Sudut pedalaman ialah sudut di kawasan dalam garis selari pada sisi yang sama garis rentas. Dua sudut pedalaman bersebelahan berjumlah 180° (corak C/U).",
      "What are interior angles?",
      "Interior angles are between parallel lines on the same side of the transversal. Two co-interior angles sum to 180° (C/U-pattern).",
    ),
    mathCard(
      "Apakah sudut dongak?",
      "Sudut dongak ialah sudut yang diukur dari garisan ufuk ke atas ke arah objek. Pemerhati berada di bawah objek.",
      "What is the angle of elevation?",
      "The angle of elevation is measured from the horizontal upward to the object. The observer is below the object.",
    ),
    mathCard(
      "Apakah sudut tunduk?",
      "Sudut tunduk ialah sudut yang diukur dari garisan ufuk ke bawah ke arah objek. Pemerhati berada di atas objek.",
      "What is the angle of depression?",
      "The angle of depression is measured from the horizontal downward to the object. The observer is above the object.",
    ),
    mathCard(
      "Apakah protraktor?",
      "Protraktor ialah alat yang digunakan untuk mengukur dan melukis sudut dalam darjah (°).",
      "What is a protractor?",
      "A protractor is a tool used to measure and draw angles in degrees (°).",
    ),
  ],
  operations: [
    mathCard(
      "Bagaimana menggunakan protraktor?",
      "Langkah 1: Letakkan titik tengah pada bucu. Langkah 2: Sejajarkan garisan dasar. Langkah 3: Baca darjah pada skala yang betul.",
      "How do you use a protractor?",
      "Step 1: Place centre at vertex. Step 2: Align baseline. Step 3: Read degrees on the correct scale.",
    ),
    mathCard(
      "Bagaimana mencari sudut pelengkap?",
      "Tolak sudut daripada 90°. Jika sudut = 35°, maka pelengkap = 90° − 35° = 55°.",
      "How do you find the complement of an angle?",
      "Subtract the angle from 90°. If angle = 35°, complement = 90° − 35° = 55°.",
    ),
    mathCard(
      "Bagaimana mencari sudut penggenap?",
      "Tolak sudut daripada 180°. Jika sudut = 70°, maka penggenap = 180° − 70° = 110°.",
      "How do you find the supplement of an angle?",
      "Subtract the angle from 180°. If angle = 70°, supplement = 180° − 70° = 110°.",
    ),
    mathCard(
      "Bagaimana mencari sudut konjugat?",
      "Tolak sudut daripada 360°. Jika sudut = 130°, maka konjugat = 360° − 130° = 230°.",
      "How do you find the conjugate of an angle?",
      "Subtract the angle from 360°. If angle = 130°, conjugate = 360° − 130° = 230°.",
    ),
    mathCard(
      "Bagaimana menggunakan sifat sudut pada garis lurus?",
      "Tetapkan jumlah semua sudut = 180°. Contoh: a + 65° = 180° → a = 115°.",
      "How do you use angles on a straight line?",
      "Set sum of all angles = 180°. Example: a + 65° = 180° → a = 115°.",
    ),
    mathCard(
      "Bagaimana menggunakan sifat putaran lengkap?",
      "Tetapkan jumlah semua sudut di sekeliling titik = 360°. Contoh: 120° + 80° + x = 360° → x = 160°.",
      "How do you use angles at a complete turn?",
      "Set sum of all angles around the point = 360°. Example: 120° + 80° + x = 360° → x = 160°.",
    ),
    mathCard(
      "Bagaimana menggunakan sudut bertentang bucu?",
      "Tetapkan sudut bertentang bucu = sama. Contoh: 3x = 75° → x = 25°.",
      "How do you use vertically opposite angles?",
      "Set vertically opposite angles as equal. Example: 3x = 75° → x = 25°.",
    ),
    mathCard(
      "Bagaimana mengenal pasti sudut sepadan (corak F)?",
      "Sudut sepadan berada pada kedudukan yang sama di dua persilangan — kedua-duanya di atas-kiri, atau kedua-duanya di bawah-kanan. Corak: huruf F.",
      "How do you identify corresponding angles (F-pattern)?",
      "Corresponding angles are in the same position at two intersections — both top-left or both bottom-right. Pattern: letter F.",
    ),
    mathCard(
      "Bagaimana mengenal pasti sudut selang-seli (corak Z)?",
      "Sudut selang-seli berada di kawasan dalam, pada sisi yang berlawanan garis rentas. Corak: huruf Z atau N.",
      "How do you identify alternate angles (Z-pattern)?",
      "Alternate angles are in the inner region, on opposite sides of the transversal. Pattern: letter Z or N.",
    ),
    mathCard(
      "Bagaimana mengenal pasti sudut pedalaman (corak C)?",
      "Sudut pedalaman berada di kawasan dalam, pada sisi yang sama garis rentas. Jumlah = 180°. Corak: huruf C atau U.",
      "How do you identify interior angles (C-pattern)?",
      "Interior angles are in the inner region, on the same side of the transversal. Sum = 180°. Pattern: letter C or U.",
    ),
    mathCard(
      "Cara menyelesaikan sudut dalam persilangan garis.",
      "1. Kenal pasti jenis sudut. 2. Tulis persamaan. 3. Selesaikan. 4. Semak semula.",
      "Steps to solve angles at intersecting lines.",
      "1. Identify the type of angles. 2. Write the equation. 3. Solve. 4. Check your answer.",
    ),
    mathCard(
      "Jika sudut sepadan = (3x + 10)° dan 70°, cari x.",
      "3x + 10 = 70 (sudut sepadan sama). 3x = 60. x = 20.",
      "If corresponding angles = (3x + 10)° and 70°, find x.",
      "3x + 10 = 70 (corresponding angles equal). 3x = 60. x = 20.",
    ),
    mathCard(
      "Jika sudut pedalaman = 65° dan (2y + 15)°, cari y.",
      "65 + (2y + 15) = 180 (sudut pedalaman berjumlah 180°). 2y + 80 = 180. 2y = 100. y = 50.",
      "If interior angles = 65° and (2y + 15)°, find y.",
      "65 + (2y + 15) = 180 (interior angles sum to 180°). 2y + 80 = 180. 2y = 100. y = 50.",
    ),
    mathCard(
      "Membezakan sudut dongak dan tunduk dalam masalah.",
      "Dongak: pemerhati di bawah, lihat ke atas. Tunduk: pemerhati di atas, lihat ke bawah. Kedua-duanya diukur dari garisan ufuk.",
      "Distinguishing elevation and depression in problems.",
      "Elevation: observer below, looking up. Depression: observer above, looking down. Both measured from the horizontal.",
    ),
    mathCard(
      "Melukis garis serenjang menggunakan protraktor.",
      "Lukis satu garis, letakkan pusat protraktor pada titik yang dikehendaki, tandakan 90°, lukis garisan melalui tanda tersebut.",
      "Drawing perpendicular lines using a protractor.",
      "Draw a line, place the protractor centre at the desired point, mark 90°, draw a line through the mark.",
    ),
    mathCard(
      "Menyelesaikan: (2x + 10)°, 40° dan (x − 5)° pada garis lurus.",
      "(2x + 10) + 40 + (x − 5) = 180. 3x + 45 = 180. 3x = 135. x = 45.",
      "Solve: (2x + 10)°, 40° and (x − 5)° on a straight line.",
      "(2x + 10) + 40 + (x − 5) = 180. 3x + 45 = 180. 3x = 135. x = 45.",
    ),
    mathCard(
      "Menyelesaikan: sudut selang-seli = (4m − 20)° dan 80°.",
      "4m − 20 = 80 (sudut selang-seli sama). 4m = 100. m = 25.",
      "Solve: alternate angles = (4m − 20)° and 80°.",
      "4m − 20 = 80 (alternate angles equal). 4m = 100. m = 25.",
    ),
  ],
  facts: [
    mathCard(
      "Berapakah jumlah sudut pada garis lurus?",
      "180°. Semua sudut yang terbentuk di atas (atau bawah) garis lurus sentiasa berjumlah 180°.",
      "What is the sum of angles on a straight line?",
      "180°. All angles formed above (or below) a straight line always sum to 180°.",
    ),
    mathCard(
      "Berapakah jumlah sudut putaran lengkap?",
      "360°. Semua sudut di sekeliling satu titik sentiasa berjumlah 360°.",
      "What is the sum of angles in a complete turn?",
      "360°. All angles around a single point always sum to 360°.",
    ),
    mathCard(
      "Berapa banyak sudut terbentuk apabila dua garis bersilang?",
      "4 sudut. Dua pasangan sudut bertentang bucu dan dua pasangan sudut bersebelahan.",
      "How many angles are formed when two lines intersect?",
      "4 angles. Two pairs of vertically opposite angles and two pairs of adjacent angles.",
    ),
    mathCard(
      "Berapa banyak sudut terbentuk apabila garis rentas memotong dua garis selari?",
      "8 sudut. 4 di setiap titik persilangan.",
      "How many angles are formed when a transversal cuts two parallel lines?",
      "8 angles. 4 at each intersection point.",
    ),
    mathCard(
      "Nyatakan julat setiap jenis sudut.",
      "Tirus: 0°–90°. Tegak: 90°. Cakah: 90°–180°. Refleks: 180°–360°.",
      "State the range of each type of angle.",
      "Acute: 0°–90°. Right: 90°. Obtuse: 90°–180°. Reflex: 180°–360°.",
    ),
    mathCard(
      "Apakah sifat sudut bertentang bucu?",
      "Sudut bertentang bucu adalah SAMA BESAR. Jika satu sudut = 65°, maka sudut bertentang bucu juga = 65°.",
      "What is the property of vertically opposite angles?",
      "Vertically opposite angles are EQUAL. If one angle = 65°, the vertically opposite angle is also 65°.",
    ),
    mathCard(
      "Apakah sifat sudut sepadan pada garis selari?",
      "Sudut SEPADAN adalah SAMA BESAR apabila garis rentas memotong dua garis selari. Corak: F.",
      "What is the property of corresponding angles in parallel lines?",
      "CORRESPONDING angles are EQUAL when a transversal cuts two parallel lines. Pattern: F.",
    ),
    mathCard(
      "Apakah sifat sudut selang-seli pada garis selari?",
      "Sudut SELANG-SELI adalah SAMA BESAR apabila garis rentas memotong dua garis selari. Corak: Z/N.",
      "What is the property of alternate angles in parallel lines?",
      "ALTERNATE angles are EQUAL when a transversal cuts two parallel lines. Pattern: Z/N.",
    ),
    mathCard(
      "Apakah sifat sudut pedalaman pada garis selari?",
      "Sudut PEDALAMAN BERSEBELAHAN BERJUMLAH 180° apabila garis rentas memotong dua garis selari. Corak: C/U.",
      "What is the property of interior angles in parallel lines?",
      "CO-INTERIOR angles SUM TO 180° when a transversal cuts two parallel lines. Pattern: C/U.",
    ),
    mathCard(
      "Formula: pelengkap bagi sudut a.",
      "Pelengkap = 90° − a. Contoh: pelengkap 35° = 90° − 35° = 55°.",
      "Formula: complement of angle a.",
      "Complement = 90° − a. Example: complement of 35° = 90° − 35° = 55°.",
    ),
    mathCard(
      "Formula: penggenap bagi sudut a.",
      "Penggenap = 180° − a. Contoh: penggenap 70° = 180° − 70° = 110°.",
      "Formula: supplement of angle a.",
      "Supplement = 180° − a. Example: supplement of 70° = 180° − 70° = 110°.",
    ),
    mathCard(
      "Formula: konjugat bagi sudut a.",
      "Konjugat = 360° − a. Contoh: konjugat 120° = 360° − 120° = 240°.",
      "Formula: conjugate of angle a.",
      "Conjugate = 360° − a. Example: conjugate of 120° = 360° − 120° = 240°.",
    ),
    mathCard(
      "Apakah perbezaan garis serenjang dan selari?",
      "Serenjang: bertemu pada 90°. Selari: tidak bersilang, jarak sentiasa sama.",
      "What is the difference between perpendicular and parallel lines?",
      "Perpendicular: meet at 90°. Parallel: never intersect, distance always the same.",
    ),
  ],
  practice: [
    mathCard(
      "Sudut pada garis lurus = 65° dan x. Cari x.",
      "x = 180° − 65° = 115°.",
      "Angles on a straight line: 65° and x. Find x.",
      "x = 180° − 65° = 115°.",
    ),
    mathCard(
      "Tiga sudut putaran lengkap: 90°, 150° dan y. Cari y.",
      "90° + 150° + y = 360°. y = 120°.",
      "Three angles at a point: 90°, 150° and y. Find y.",
      "90° + 150° + y = 360°. y = 120°.",
    ),
    mathCard("Pelengkap bagi 42°?", "90° − 42° = 48°.", "Complement of 42°?", "90° − 42° = 48°."),
    mathCard(
      "Penggenap bagi 115°?",
      "180° − 115° = 65°.",
      "Supplement of 115°?",
      "180° − 115° = 65°.",
    ),
    mathCard(
      "Konjugat bagi 250°?",
      "360° − 250° = 110°.",
      "Conjugate of 250°?",
      "360° − 250° = 110°.",
    ),
    mathCard(
      "Dua garis bersilang membentuk sudut 80° dan x (bertentang bucu). Cari x.",
      "x = 80° (sudut bertentang bucu adalah sama).",
      "Two lines intersect forming 80° and x (vertically opposite). Find x.",
      "x = 80° (vertically opposite angles are equal).",
    ),
    mathCard(
      "Sudut bersebelahan = 130°. Cari sudut yang lain.",
      "180° − 130° = 50°.",
      "Adjacent angles: one is 130°. Find the other.",
      "180° − 130° = 50°.",
    ),
    mathCard(
      "Sudut sepadan = (2x + 5)° dan 85°. Cari x.",
      "2x + 5 = 85. 2x = 80. x = 40.",
      "Corresponding angles: (2x + 5)° and 85°. Find x.",
      "2x + 5 = 85. 2x = 80. x = 40.",
    ),
    mathCard(
      "Sudut selang-seli = (3y − 10)° dan 65°. Cari y.",
      "3y − 10 = 65. 3y = 75. y = 25.",
      "Alternate angles: (3y − 10)° and 65°. Find y.",
      "3y − 10 = 65. 3y = 75. y = 25.",
    ),
    mathCard(
      "Sudut pedalaman bersebelahan = 70° dan (2z + 10)°. Cari z.",
      "70 + (2z + 10) = 180. 2z + 80 = 180. 2z = 100. z = 50.",
      "Co-interior angles: 70° and (2z + 10)°. Find z.",
      "70 + (2z + 10) = 180. 2z + 80 = 180. 2z = 100. z = 50.",
    ),
    mathCard(
      "Jenis sudut: 135°?",
      "Sudut cakah (90° < 135° < 180°).",
      "Type of angle: 135°?",
      "Obtuse angle (90° < 135° < 180°).",
    ),
    mathCard(
      "Jenis sudut: 215°?",
      "Sudut refleks (180° < 215° < 360°).",
      "Type of angle: 215°?",
      "Reflex angle (180° < 215° < 360°).",
    ),
    mathCard(
      "Sudut dongak = 30°. Pemerhati berdiri di bawah bangunan. Apakah maksudnya?",
      "Pemerhati melihat ke atas bangunan pada sudut 30° dari garisan ufuk.",
      "Angle of elevation = 30°. Observer stands below a building. What does this mean?",
      "The observer looks up at the building at 30° from the horizontal line.",
    ),
    mathCard(
      "Sudut tunduk = 45°. Pemerhati berada di atas menara. Apakah maksudnya?",
      "Pemerhati melihat ke bawah pada sudut 45° dari garisan ufuk.",
      "Angle of depression = 45°. Observer is on top of a tower. What does this mean?",
      "The observer looks downward at 45° from the horizontal line.",
    ),
    mathCard(
      "Garis rentas memotong dua garis selari. Sudut = 110°. Cari sudut selang-seli dan sudut sepadan.",
      "Sudut selang-seli = 110° (sama). Sudut sepadan = 110° (sama).",
      "Transversal cuts two parallel lines. Angle = 110°. Find alternate and corresponding angles.",
      "Alternate angle = 110° (equal). Corresponding angle = 110° (equal).",
    ),
  ],
};

const MATH_F1_C9_FLASHCARD_PAIRS: Record<
  MathFlashcardCategoryId,
  Array<{ bm: [string, string]; dlp: [string, string] }>
> = {
  concepts: [
    mathCard(
      "Apakah poligon?",
      "Poligon ialah bentuk 2D tertutup yang dibatasi oleh tiga atau lebih sisi lurus.",
      "What is a polygon?",
      "A polygon is a closed 2D shape bounded by three or more straight sides.",
    ),
    mathCard(
      "Apakah perbezaan poligon sekata dan tidak sekata?",
      "Sekata: semua sisi sama dan semua sudut sama. Tidak sekata: sisi atau sudut berbeza.",
      "What is the difference between regular and irregular polygons?",
      "Regular: all sides equal and all angles equal. Irregular: sides or angles differ.",
    ),
    mathCard(
      "Apakah pepenjuru poligon?",
      "Pepenjuru ialah tembereng garis yang menghubungkan dua bucu yang TIDAK bersebelahan.",
      "What is a diagonal of a polygon?",
      "A diagonal is a line segment connecting two NON-ADJACENT vertices.",
    ),
    mathCard(
      "Berapakah bilangan sisi segi tiga, sisi empat dan pentagon?",
      "Segi tiga = 3, Sisi empat = 4, Pentagon = 5.",
      "How many sides do a triangle, quadrilateral and pentagon have?",
      "Triangle = 3, Quadrilateral = 4, Pentagon = 5.",
    ),
    mathCard(
      "Apakah segi tiga sama sisi?",
      "Segi tiga sama sisi mempunyai 3 sisi sama panjang, 3 sudut = 60°, dan 3 garis simetri.",
      "What is an equilateral triangle?",
      "An equilateral triangle has 3 equal sides, all angles = 60°, and 3 lines of symmetry.",
    ),
    mathCard(
      "Apakah segi tiga sama kaki?",
      "Segi tiga sama kaki mempunyai 2 sisi sama, 2 sudut tapak sama, dan 1 garis simetri.",
      "What is an isosceles triangle?",
      "An isosceles triangle has 2 equal sides, 2 equal base angles, and 1 line of symmetry.",
    ),
    mathCard(
      "Apakah segi tiga tak sama kaki?",
      "Segi tiga tak sama kaki mempunyai semua sisi berbeza, semua sudut berbeza, dan tiada garis simetri.",
      "What is a scalene triangle?",
      "A scalene triangle has all sides different, all angles different, and no lines of symmetry.",
    ),
    mathCard(
      "Apakah segi tiga bersudut tegak?",
      "Segi tiga bersudut tegak mempunyai satu sudut 90°. Sisi terpanjang dipanggil hipotenus.",
      "What is a right-angled triangle?",
      "A right-angled triangle has one 90° angle. The longest side is called the hypotenuse.",
    ),
    mathCard(
      "Apakah segi tiga bersudut cakah?",
      "Segi tiga bersudut cakah mempunyai SATU sudut lebih besar daripada 90°.",
      "What is an obtuse-angled triangle?",
      "An obtuse-angled triangle has ONE angle greater than 90°.",
    ),
    mathCard(
      "Apakah segi tiga bersudut tirus?",
      "Segi tiga bersudut tirus mempunyai SEMUA TIGA sudut kurang daripada 90°.",
      "What is an acute-angled triangle?",
      "An acute-angled triangle has ALL THREE angles less than 90°.",
    ),
    mathCard(
      "Apakah segi empat tepat?",
      "Segi empat tepat mempunyai 4 sudut 90°, sisi bertentangan sama dan selari, dan 2 garis simetri.",
      "What is a rectangle?",
      "A rectangle has 4 right angles, opposite sides equal and parallel, and 2 lines of symmetry.",
    ),
    mathCard(
      "Apakah segi empat sama?",
      "Segi empat sama mempunyai 4 sisi sama, 4 sudut 90°, pepenjuru berserenjang, dan 4 garis simetri.",
      "What is a square?",
      "A square has 4 equal sides, 4 right angles, perpendicular diagonals, and 4 lines of symmetry.",
    ),
    mathCard(
      "Apakah jajaran genjang?",
      "Jajaran genjang mempunyai 2 pasang sisi bertentangan yang selari dan sama, sudut bertentangan sama, dan tiada garis simetri.",
      "What is a parallelogram?",
      "A parallelogram has 2 pairs of opposite parallel equal sides, opposite angles equal, and no lines of symmetry.",
    ),
    mathCard(
      "Apakah belah ketupat?",
      "Belah ketupat mempunyai 4 sisi sama, pepenjuru berserenjang, dan 2 garis simetri.",
      "What is a rhombus?",
      "A rhombus has 4 equal sides, perpendicular diagonals, and 2 lines of symmetry.",
    ),
    mathCard(
      "Apakah trapezium?",
      "Trapezium mempunyai tepat SATU pasang sisi yang selari.",
      "What is a trapezium?",
      "A trapezium has exactly ONE pair of parallel sides.",
    ),
    mathCard(
      "Apakah lelayang?",
      "Lelayang mempunyai DUA pasang sisi BERSEBELAHAN yang sama, pepenjuru berserenjang, dan 1 garis simetri.",
      "What is a kite?",
      "A kite has TWO pairs of ADJACENT equal sides, perpendicular diagonals, and 1 line of symmetry.",
    ),
    mathCard(
      "Apakah hipotenus?",
      "Hipotenus ialah sisi terpanjang segi tiga bersudut tegak — sisi yang bertentangan dengan sudut 90°.",
      "What is the hypotenuse?",
      "The hypotenuse is the longest side of a right-angled triangle — the side opposite the 90° angle.",
    ),
    mathCard(
      "Apakah garis simetri?",
      "Garis simetri ialah garis yang membahagi bentuk kepada dua bahagian yang sama (imej cermin antara satu sama lain).",
      "What is a line of symmetry?",
      "A line of symmetry divides a shape into two identical mirror-image halves.",
    ),
  ],
  operations: [
    mathCard(
      "Bagaimana mengira bilangan pepenjuru?",
      "Guna formula: n(n − 3) / 2, di mana n ialah bilangan sisi.",
      "How do you calculate the number of diagonals?",
      "Use the formula: n(n − 3) / 2, where n is the number of sides.",
    ),
    mathCard(
      "Berapa pepenjuru bagi sisi empat?",
      "n = 4: 4(4 − 3)/2 = 4(1)/2 = 2 pepenjuru.",
      "How many diagonals does a quadrilateral have?",
      "n = 4: 4(4 − 3)/2 = 4(1)/2 = 2 diagonals.",
    ),
    mathCard(
      "Berapa pepenjuru bagi pentagon?",
      "n = 5: 5(5 − 3)/2 = 5(2)/2 = 5 pepenjuru.",
      "How many diagonals does a pentagon have?",
      "n = 5: 5(5 − 3)/2 = 5(2)/2 = 5 diagonals.",
    ),
    mathCard(
      "Berapa pepenjuru bagi heksagon?",
      "n = 6: 6(6 − 3)/2 = 6(3)/2 = 9 pepenjuru.",
      "How many diagonals does a hexagon have?",
      "n = 6: 6(6 − 3)/2 = 6(3)/2 = 9 diagonals.",
    ),
    mathCard(
      "Bagaimana mencari sudut ketiga segi tiga?",
      "Tolak dua sudut yang diketahui daripada 180°. Contoh: ∠C = 180° − ∠A − ∠B.",
      "How do you find the third angle of a triangle?",
      "Subtract the two known angles from 180°. Example: ∠C = 180° − ∠A − ∠B.",
    ),
    mathCard(
      "Bagaimana menggunakan sifat sudut luar segi tiga?",
      "Sudut luar = jumlah dua sudut dalam yang tidak bersebelahan. Contoh: jika ∠A = 40° dan ∠B = 60°, sudut luar di C = 100°.",
      "How do you use the exterior angle property of a triangle?",
      "Exterior angle = sum of two non-adjacent interior angles. Example: if ∠A = 40° and ∠B = 60°, exterior angle at C = 100°.",
    ),
    mathCard(
      "Bagaimana mencari sudut keempat sisi empat?",
      "Tolak tiga sudut yang diketahui daripada 360°. Contoh: ∠D = 360° − ∠A − ∠B − ∠C.",
      "How do you find the fourth angle of a quadrilateral?",
      "Subtract the three known angles from 360°. Example: ∠D = 360° − ∠A − ∠B − ∠C.",
    ),
    mathCard(
      "Bagaimana menggunakan sifat jajaran genjang?",
      "Sudut bertentangan sama, dan sudut bersebelahan berjumlah 180°. Jika ∠A = 75°, maka ∠C = 75° dan ∠B = 105°.",
      "How do you use parallelogram angle properties?",
      "Opposite angles equal, adjacent angles sum to 180°. If ∠A = 75°, then ∠C = 75° and ∠B = 105°.",
    ),
    mathCard(
      "Segi tiga sama kaki: dua sudut tapak = 55°. Cari sudut puncak.",
      "Sudut puncak = 180° − 55° − 55° = 70°.",
      "Isosceles triangle: two base angles = 55°. Find the apex angle.",
      "Apex angle = 180° − 55° − 55° = 70°.",
    ),
    mathCard(
      "Segi tiga bersudut tegak: dua sudut lain = 30° dan x. Cari x.",
      "30° + x = 90° (dua sudut bukan tegak berjumlah 90°). x = 60°.",
      "Right-angled triangle: two non-right angles = 30° and x. Find x.",
      "30° + x = 90° (two non-right angles sum to 90°). x = 60°.",
    ),
    mathCard(
      "Jajaran genjang ABCD: ∠A = 68°. Cari semua sudut.",
      "∠C = 68° (bertentangan). ∠B = ∠D = 180° − 68° = 112°.",
      "Parallelogram ABCD: ∠A = 68°. Find all angles.",
      "∠C = 68° (opposite). ∠B = ∠D = 180° − 68° = 112°.",
    ),
    mathCard(
      "Cara mengenal pasti segi tiga berdasarkan sisi.",
      "1 seretan (tick) = satu sisi. 2 seretan = sisi yang sama. 3 seretan = segi tiga tak sama kaki. Semua 1 seretan = sama sisi.",
      "How to identify triangles by their sides in a diagram.",
      "1 tick = one side. 2 ticks = equal sides. Same tick on all = equilateral. Mixed ticks = scalene.",
    ),
    mathCard(
      "Cara membezakan belah ketupat dan segi empat sama.",
      "Belah ketupat: 4 sisi sama, tiada sudut 90° (melainkan ianya segi empat sama). Segi empat sama: 4 sisi sama DENGAN 4 sudut 90°.",
      "How to distinguish a rhombus from a square.",
      "Rhombus: 4 equal sides, no 90° angles (unless it is a square). Square: 4 equal sides WITH 4 right angles.",
    ),
    mathCard(
      "Sudut luar segi tiga = (3x + 10)° dan dua sudut dalam berhadapan = 70° dan (x + 20)°. Cari x.",
      "3x + 10 = 70 + (x + 20). 3x + 10 = x + 90. 2x = 80. x = 40.",
      "Exterior angle = (3x + 10)°, two non-adjacent interior angles = 70° and (x + 20)°. Find x.",
      "3x + 10 = 70 + (x + 20). 3x + 10 = x + 90. 2x = 80. x = 40.",
    ),
    mathCard(
      "Sisi empat ABCD: ∠A = 80°, ∠B = 100°, ∠C = 75°. Cari ∠D.",
      "∠D = 360° − 80° − 100° − 75° = 105°.",
      "Quadrilateral ABCD: ∠A = 80°, ∠B = 100°, ∠C = 75°. Find ∠D.",
      "∠D = 360° − 80° − 100° − 75° = 105°.",
    ),
    mathCard(
      "Cari bilangan pepenjuru oktagon (n = 8).",
      "8(8 − 3)/2 = 8(5)/2 = 40/2 = 20 pepenjuru.",
      "Find the number of diagonals of an octagon (n = 8).",
      "8(8 − 3)/2 = 8(5)/2 = 40/2 = 20 diagonals.",
    ),
    mathCard(
      "Segi tiga PQR: ∠P = (2x + 5)°, ∠Q = (x + 10)°, ∠R = (3x − 15)°. Cari x.",
      "(2x + 5) + (x + 10) + (3x − 15) = 180. 6x = 180. x = 30.",
      "Triangle PQR: ∠P = (2x + 5)°, ∠Q = (x + 10)°, ∠R = (3x − 15)°. Find x.",
      "(2x + 5) + (x + 10) + (3x − 15) = 180. 6x = 180. x = 30.",
    ),
  ],
  facts: [
    mathCard(
      "Berapakah jumlah sudut dalam segi tiga?",
      "Jumlah sudut dalam segi tiga = 180°. Ini berlaku untuk MANA-MANA segi tiga.",
      "What is the sum of interior angles of a triangle?",
      "Sum of interior angles of a triangle = 180°. This applies to ANY triangle.",
    ),
    mathCard(
      "Berapakah jumlah sudut dalam sisi empat?",
      "Jumlah sudut dalam sisi empat = 360°. Ini berlaku untuk MANA-MANA sisi empat.",
      "What is the sum of interior angles of a quadrilateral?",
      "Sum of interior angles of a quadrilateral = 360°. This applies to ANY quadrilateral.",
    ),
    mathCard(
      "Formula bilangan pepenjuru.",
      "Bilangan pepenjuru = n(n − 3) / 2, di mana n ialah bilangan sisi.",
      "Formula for number of diagonals.",
      "Number of diagonals = n(n − 3) / 2, where n is the number of sides.",
    ),
    mathCard(
      "Bilangan garis simetri: segi empat sama vs segi empat tepat.",
      "Segi empat sama: 4 garis simetri. Segi empat tepat: 2 garis simetri.",
      "Lines of symmetry: square vs rectangle.",
      "Square: 4 lines of symmetry. Rectangle: 2 lines of symmetry.",
    ),
    mathCard(
      "Bilangan garis simetri: jajaran genjang vs belah ketupat.",
      "Jajaran genjang: 0 garis simetri. Belah ketupat: 2 garis simetri.",
      "Lines of symmetry: parallelogram vs rhombus.",
      "Parallelogram: 0 lines of symmetry. Rhombus: 2 lines of symmetry.",
    ),
    mathCard(
      "Bilangan garis simetri pelbagai bentuk.",
      "Segi tiga sama sisi: 3. Segi empat sama: 4. Belah ketupat: 2. Lelayang: 1. Trapezium: 0. Jajaran genjang: 0.",
      "Lines of symmetry for various shapes.",
      "Equilateral triangle: 3. Square: 4. Rhombus: 2. Kite: 1. Trapezium: 0. Parallelogram: 0.",
    ),
    mathCard(
      "Apakah sifat pepenjuru segi empat sama?",
      "Pepenjuru segi empat sama adalah sama panjang, bersilang di tengah, berserenjang (90°), dan membahagi dua sudut bucu.",
      "What are the diagonal properties of a square?",
      "Diagonals of a square are equal in length, bisect each other, are perpendicular (90°), and bisect the corner angles.",
    ),
    mathCard(
      "Apakah sifat pepenjuru belah ketupat?",
      "Pepenjuru belah ketupat berserenjang (90°) dan bersilang di tengah, tetapi tidak sama panjang.",
      "What are the diagonal properties of a rhombus?",
      "Diagonals of a rhombus are perpendicular (90°) and bisect each other, but are NOT equal in length.",
    ),
    mathCard(
      "Apakah sifat pepenjuru segi empat tepat?",
      "Pepenjuru segi empat tepat adalah sama panjang dan bersilang di tengah, tetapi TIDAK berserenjang.",
      "What are the diagonal properties of a rectangle?",
      "Diagonals of a rectangle are equal in length and bisect each other, but are NOT perpendicular.",
    ),
    mathCard(
      "Apakah sifat pepenjuru lelayang?",
      "Satu pepenjuru membahagi dua pepenjuru yang lain. Pepenjuru berserenjang (90°). Pepenjuru tidak sama panjang.",
      "What are the diagonal properties of a kite?",
      "One diagonal bisects the other. Diagonals are perpendicular (90°). Diagonals are not equal in length.",
    ),
    mathCard(
      "Apakah sifat sudut jajaran genjang?",
      "Sudut bertentangan sama. Sudut bersebelahan berjumlah 180°.",
      "What are the angle properties of a parallelogram?",
      "Opposite angles are equal. Adjacent angles sum to 180°.",
    ),
    mathCard(
      "Nyatakan sifat sudut luar segi tiga.",
      "Sudut luar segi tiga = jumlah dua sudut dalam yang TIDAK bersebelahan (berhadapan).",
      "State the exterior angle property of a triangle.",
      "Exterior angle of a triangle = sum of the two NON-ADJACENT (opposite) interior angles.",
    ),
    mathCard(
      "Berapa banyak pepenjuru segi tiga mempunyai?",
      "Sifar (0). Semua bucu segi tiga adalah bersebelahan, jadi tiada dua bucu yang 'tidak bersebelahan'.",
      "How many diagonals does a triangle have?",
      "Zero (0). All vertices of a triangle are adjacent, so there are no 'non-adjacent' pairs of vertices.",
    ),
  ],
  practice: [
    mathCard(
      "Cari bilangan pepenjuru heptagon.",
      "n = 7: 7(7 − 3)/2 = 7(4)/2 = 14 pepenjuru.",
      "Find the number of diagonals of a heptagon.",
      "n = 7: 7(7 − 3)/2 = 7(4)/2 = 14 diagonals.",
    ),
    mathCard(
      "Segi tiga: ∠A = 65°, ∠B = 70°. Cari ∠C.",
      "∠C = 180° − 65° − 70° = 45°.",
      "Triangle: ∠A = 65°, ∠B = 70°. Find ∠C.",
      "∠C = 180° − 65° − 70° = 45°.",
    ),
    mathCard(
      "Sisi empat: ∠A = 90°, ∠B = 80°, ∠C = 100°. Cari ∠D.",
      "∠D = 360° − 90° − 80° − 100° = 90°.",
      "Quadrilateral: ∠A = 90°, ∠B = 80°, ∠C = 100°. Find ∠D.",
      "∠D = 360° − 90° − 80° − 100° = 90°.",
    ),
    mathCard(
      "Sudut luar segi tiga = 115°. Satu sudut dalam berhadapan = 55°. Cari yang lain.",
      "115° − 55° = 60°.",
      "Exterior angle of a triangle = 115°. One non-adjacent interior angle = 55°. Find the other.",
      "115° − 55° = 60°.",
    ),
    mathCard(
      "Jajaran genjang: ∠A = 125°. Cari semua sudut lain.",
      "∠C = 125°. ∠B = ∠D = 180° − 125° = 55°.",
      "Parallelogram: ∠A = 125°. Find all other angles.",
      "∠C = 125°. ∠B = ∠D = 180° − 125° = 55°.",
    ),
    mathCard(
      "Segi tiga sama kaki: sudut puncak = 40°. Cari sudut tapak.",
      "(180° − 40°) / 2 = 140° / 2 = 70°.",
      "Isosceles triangle: apex angle = 40°. Find the base angles.",
      "(180° − 40°) / 2 = 140° / 2 = 70°.",
    ),
    mathCard(
      "Poligon dengan n = 10 (dekagon). Berapa pepenjuru?",
      "10(10 − 3)/2 = 10(7)/2 = 35 pepenjuru.",
      "Polygon with n = 10 (decagon). How many diagonals?",
      "10(10 − 3)/2 = 10(7)/2 = 35 diagonals.",
    ),
    mathCard(
      "Sebuah sisi empat mempunyai 3 sudut sama iaitu 85° setiap satu. Cari sudut keempat.",
      "360° − 85° − 85° − 85° = 105°.",
      "A quadrilateral has 3 equal angles of 85° each. Find the fourth angle.",
      "360° − 85° − 85° − 85° = 105°.",
    ),
    mathCard(
      "Segi tiga dengan sudut (2x)°, (3x)° dan (x + 30)°. Cari x.",
      "2x + 3x + x + 30 = 180. 6x + 30 = 180. 6x = 150. x = 25.",
      "Triangle with angles (2x)°, (3x)° and (x + 30)°. Find x.",
      "2x + 3x + x + 30 = 180. 6x + 30 = 180. 6x = 150. x = 25.",
    ),
    mathCard(
      "Namakan poligon dengan 9 sisi.",
      "Nonagon.",
      "Name the polygon with 9 sides.",
      "Nonagon.",
    ),
    mathCard(
      "Sebuah sisi empat mempunyai tepat satu pasang sisi selari. Apakah namanya?",
      "Trapezium.",
      "A quadrilateral has exactly one pair of parallel sides. What is it called?",
      "Trapezium.",
    ),
    mathCard(
      "Apakah sisi empat yang mempunyai 4 sisi sama tetapi sudut bukan 90°?",
      "Belah ketupat.",
      "What quadrilateral has 4 equal sides but angles not equal to 90°?",
      "Rhombus.",
    ),
    mathCard(
      "Bilangan garis simetri lelayang dan segi tiga sama kaki.",
      "Lelayang: 1 garis simetri. Segi tiga sama kaki: 1 garis simetri.",
      "Lines of symmetry for a kite and isosceles triangle.",
      "Kite: 1 line of symmetry. Isosceles triangle: 1 line of symmetry.",
    ),
  ],
};

const MATH_F1_C10_FLASHCARD_PAIRS = {
  concepts: [
    mathCard(
      "Apakah perimeter?",
      "Perimeter ialah jumlah panjang kesemua sisi luar sesuatu bentuk rata. Ia mengukur panjang sempadan bentuk tersebut.",
      "What is perimeter?",
      "Perimeter is the total length of all outer sides of a flat shape. It measures the length of the boundary.",
    ),
    mathCard(
      "Apakah luas?",
      "Luas ialah jumlah ruang di dalam sempadan sesuatu bentuk rata (2D). Ia mengukur kawasan yang diliputi bentuk tersebut.",
      "What is area?",
      "Area is the amount of space inside the boundary of a flat (2D) shape. It measures the region covered by the shape.",
    ),
    mathCard(
      "Apakah perbezaan antara perimeter dan luas?",
      "Perimeter: panjang sempadan (unit: cm, m). Luas: kawasan dalaman (unit: cm², m²). Kedua-duanya boleh berbeza walaupun untuk bentuk yang kelihatan serupa.",
      "What is the difference between perimeter and area?",
      "Perimeter: length of boundary (units: cm, m). Area: inner region (units: cm², m²). Both can differ even for shapes that look similar.",
    ),
    mathCard(
      "Dalam unit apakah perimeter diukur?",
      "Perimeter diukur dalam unit panjang satu dimensi: cm, m, mm, km.",
      "In what units is perimeter measured?",
      "Perimeter is measured in one-dimensional length units: cm, m, mm, km.",
    ),
    mathCard(
      "Dalam unit apakah luas diukur?",
      "Luas diukur dalam unit persegi (dua dimensi): cm², m², km².",
      "In what units is area measured?",
      "Area is measured in square units (two-dimensional): cm², m², km².",
    ),
    mathCard(
      "Apakah bentuk komposit?",
      "Bentuk komposit ialah bentuk yang terbentuk daripada gabungan dua atau lebih bentuk mudah seperti segi tiga, segi empat tepat, atau trapezium.",
      "What is a composite shape?",
      "A composite shape is a shape formed by combining two or more simple shapes such as triangles, rectangles, or trapeziums.",
    ),
    mathCard(
      "Apakah yang dimaksudkan dengan tinggi berserenjang?",
      "Tinggi berserenjang ialah jarak yang diukur pada sudut tegak (90°) kepada tapak. Ini adalah tinggi BETUL untuk semua formula luas.",
      "What is meant by perpendicular height?",
      "Perpendicular height is the distance measured at a right angle (90°) to the base. This is the CORRECT height for all area formulas.",
    ),
    mathCard(
      "Bolehkah dua bentuk mempunyai perimeter yang sama tetapi luas berbeza?",
      "Ya. Contoh: Segi empat tepat 8×2 (perimeter 20 cm, luas 16 cm²) dan 5×5 (perimeter 20 cm, luas 25 cm²).",
      "Can two shapes have the same perimeter but different areas?",
      "Yes. Example: Rectangle 8×2 (perimeter 20 cm, area 16 cm²) and 5×5 (perimeter 20 cm, area 25 cm²).",
    ),
    mathCard(
      "Apakah kaedah grid untuk menganggar luas?",
      "Lukis bentuk di atas kertas grid. Kira petak penuh = 1. Petak lebih separuh = 1. Petak kurang separuh = 0. Jumlahkan semua.",
      "What is the grid method for estimating area?",
      "Draw the shape on grid paper. Count full squares = 1. Squares more than half inside = 1. Squares less than half inside = 0. Add all counts.",
    ),
    mathCard(
      "Apakah hubungan antara 1 m² dan cm²?",
      "1 m² = 10 000 cm². Ini kerana 1 m = 100 cm, dan 100 × 100 = 10 000.",
      "What is the relationship between 1 m² and cm²?",
      "1 m² = 10 000 cm². This is because 1 m = 100 cm, and 100 × 100 = 10 000.",
    ),
    mathCard(
      "Apakah sisi selari trapezium dalam formula luas?",
      "Dua sisi yang SELARI antara satu sama lain, dilabelkan 'a' dan 'b'. Bukan semua sisi — hanya dua sisi yang selari.",
      "What are the parallel sides of a trapezium in the area formula?",
      "The two sides that are PARALLEL to each other, labelled 'a' and 'b'. Not all sides — only the two parallel sides.",
    ),
    mathCard(
      "Apakah pepenjuru lelayang dalam formula luas?",
      "d₁ dan d₂ ialah dua garisan yang menyilang di dalam lelayang pada sudut tegak (90°). Formula luas = ½ × d₁ × d₂.",
      "What are the diagonals of a kite in the area formula?",
      "d₁ and d₂ are the two lines crossing inside the kite at right angles (90°). Area formula = ½ × d₁ × d₂.",
    ),
    mathCard(
      "Apakah strategi dua kaedah untuk mengira luas bentuk komposit?",
      "1) TAMBAH: Bahagikan kepada bentuk mudah, kira luas setiap satu, tambahkan. 2) TOLAK: Mulakan dengan bentuk besar, tolak luas bahagian yang tidak diperlukan.",
      "What are the two strategies for finding the area of composite shapes?",
      "1) ADD: Split into simple shapes, calculate each area, add them. 2) SUBTRACT: Start with a large shape, subtract the unwanted areas.",
    ),
    mathCard(
      "Apakah yang berlaku kepada perimeter apabila luas tetap tetapi dimensi segi empat tepat diubah?",
      "Perimeter BERTAMBAH apabila dimensi menjadi semakin berbeza. Perimeter terkecil berlaku apabila bentuk adalah segi empat sama.",
      "What happens to perimeter when area is fixed but rectangle dimensions change?",
      "Perimeter INCREASES as dimensions become more different. Minimum perimeter occurs when the shape is a square.",
    ),
    mathCard(
      "Apakah yang berlaku kepada luas apabila perimeter tetap tetapi dimensi segi empat tepat diubah?",
      "Luas BERKURANG apabila dimensi menjadi semakin berbeza. Luas terbesar berlaku apabila bentuk adalah segi empat sama.",
      "What happens to area when perimeter is fixed but rectangle dimensions change?",
      "Area DECREASES as dimensions become more different. Maximum area occurs when the shape is a square.",
    ),
  ],
  operations: [
    mathCard(
      "Apakah formula perimeter segi empat tepat?",
      "Perimeter = 2(p + l) atau Perimeter = 2p + 2l. Di mana p = panjang dan l = lebar.",
      "What is the formula for the perimeter of a rectangle?",
      "Perimeter = 2(l + w) or Perimeter = 2l + 2w. Where l = length and w = width.",
    ),
    mathCard(
      "Apakah formula perimeter segi empat sama?",
      "Perimeter = 4s. Di mana s = panjang sisi.",
      "What is the formula for the perimeter of a square?",
      "Perimeter = 4s. Where s = side length.",
    ),
    mathCard(
      "Apakah formula luas segi tiga?",
      "Luas = ½ × tapak × tinggi. Pastikan tinggi adalah berserenjang dengan tapak.",
      "What is the formula for the area of a triangle?",
      "Area = ½ × base × height. Make sure the height is perpendicular to the base.",
    ),
    mathCard(
      "Apakah formula luas segi empat selari?",
      "Luas = tapak × tinggi. Di mana tinggi adalah jarak berserenjang antara dua sisi selari.",
      "What is the formula for the area of a parallelogram?",
      "Area = base × height. Where height is the perpendicular distance between the two parallel sides.",
    ),
    mathCard(
      "Apakah formula luas trapezium?",
      "Luas = ½ × (a + b) × tinggi. Di mana a dan b ialah sisi selari, dan tinggi adalah jarak berserenjang antara keduanya.",
      "What is the formula for the area of a trapezium?",
      "Area = ½ × (a + b) × height. Where a and b are the parallel sides, and height is the perpendicular distance between them.",
    ),
    mathCard(
      "Apakah formula luas lelayang?",
      "Luas = ½ × d₁ × d₂. Di mana d₁ dan d₂ ialah dua pepenjuru lelayang.",
      "What is the formula for the area of a kite?",
      "Area = ½ × d₁ × d₂. Where d₁ and d₂ are the two diagonals of the kite.",
    ),
    mathCard(
      "Segi empat tepat panjang 9 cm, lebar 4 cm. Kira perimeter.",
      "Perimeter = 2(9 + 4) = 2(13) = 26 cm.",
      "Rectangle 9 cm long, 4 cm wide. Calculate the perimeter.",
      "Perimeter = 2(9 + 4) = 2(13) = 26 cm.",
    ),
    mathCard(
      "Segi tiga dengan tapak 12 cm dan tinggi 5 cm. Kira luas.",
      "Luas = ½ × 12 × 5 = ½ × 60 = 30 cm².",
      "Triangle with base 12 cm and height 5 cm. Calculate the area.",
      "Area = ½ × 12 × 5 = ½ × 60 = 30 cm².",
    ),
    mathCard(
      "Jajaran genjang dengan tapak 8 cm dan tinggi 6 cm (sisi condong 7 cm). Kira luas.",
      "Luas = tapak × tinggi = 8 × 6 = 48 cm². Gunakan 6 cm (tinggi berserenjang), BUKAN 7 cm (sisi condong).",
      "Parallelogram with base 8 cm and height 6 cm (slant side 7 cm). Calculate the area.",
      "Area = base × height = 8 × 6 = 48 cm². Use 6 cm (perpendicular height), NOT 7 cm (slant side).",
    ),
    mathCard(
      "Trapezium dengan sisi selari 9 cm dan 5 cm, tinggi 4 cm. Kira luas.",
      "Luas = ½ × (9 + 5) × 4 = ½ × 14 × 4 = ½ × 56 = 28 cm².",
      "Trapezium with parallel sides 9 cm and 5 cm, height 4 cm. Calculate the area.",
      "Area = ½ × (9 + 5) × 4 = ½ × 14 × 4 = ½ × 56 = 28 cm².",
    ),
    mathCard(
      "Lelayang dengan pepenjuru 12 cm dan 7 cm. Kira luas.",
      "Luas = ½ × 12 × 7 = ½ × 84 = 42 cm².",
      "Kite with diagonals 12 cm and 7 cm. Calculate the area.",
      "Area = ½ × 12 × 7 = ½ × 84 = 42 cm².",
    ),
    mathCard(
      "Segi tiga: luas = 36 cm², tinggi = 9 cm. Cari tapak.",
      "Luas = ½ × tapak × tinggi. 36 = ½ × tapak × 9. 36 = 4.5 × tapak. Tapak = 36 ÷ 4.5 = 8 cm.",
      "Triangle: area = 36 cm², height = 9 cm. Find the base.",
      "Area = ½ × base × height. 36 = ½ × base × 9. 36 = 4.5 × base. Base = 36 ÷ 4.5 = 8 cm.",
    ),
    mathCard(
      "Trapezium: luas = 60 cm², sisi selari = 8 cm dan 12 cm. Cari tinggi.",
      "60 = ½ × (8 + 12) × tinggi. 60 = ½ × 20 × tinggi. 60 = 10 × tinggi. Tinggi = 6 cm.",
      "Trapezium: area = 60 cm², parallel sides = 8 cm and 12 cm. Find the height.",
      "60 = ½ × (8 + 12) × height. 60 = ½ × 20 × height. 60 = 10 × height. Height = 6 cm.",
    ),
    mathCard(
      "Tukarkan 2.5 m² kepada cm².",
      "2.5 m² = 2.5 × 10 000 = 25 000 cm².",
      "Convert 2.5 m² to cm².",
      "2.5 m² = 2.5 × 10 000 = 25 000 cm².",
    ),
    mathCard(
      "Tukarkan 80 000 cm² kepada m².",
      "80 000 cm² ÷ 10 000 = 8 m².",
      "Convert 80 000 cm² to m².",
      "80 000 cm² ÷ 10 000 = 8 m².",
    ),
    mathCard(
      "Bentuk L: segi empat tepat besar 10 × 6 cm, segi empat tepat kecil 4 × 3 cm (ditambah). Kira jumlah luas.",
      "Luas = (10 × 6) + (4 × 3) = 60 + 12 = 72 cm².",
      "L-shape: large rectangle 10 × 6 cm, small rectangle 4 × 3 cm (added). Calculate total area.",
      "Area = (10 × 6) + (4 × 3) = 60 + 12 = 72 cm².",
    ),
    mathCard(
      "Segi empat tepat 10 × 8 cm dengan lubang segi empat 2 × 3 cm. Kira luas baki.",
      "Luas baki = (10 × 8) − (2 × 3) = 80 − 6 = 74 cm².",
      "Rectangle 10 × 8 cm with a 2 × 3 cm rectangular hole. Calculate the remaining area.",
      "Remaining area = (10 × 8) − (2 × 3) = 80 − 6 = 74 cm².",
    ),
  ],
  facts: [
    mathCard(
      "Nyatakan semua formula luas yang perlu diingati.",
      "Segi tiga: ½bh. Segi empat selari: bh. Trapezium: ½(a+b)h. Lelayang: ½d₁d₂. Segi empat tepat: p×l. Segi empat sama: s².",
      "State all area formulas to remember.",
      "Triangle: ½bh. Parallelogram: bh. Trapezium: ½(a+b)h. Kite: ½d₁d₂. Rectangle: l×w. Square: s².",
    ),
    mathCard(
      "Mengapa formula luas segi tiga menggunakan ½?",
      "Kerana setiap segi tiga adalah separuh daripada segi empat selari yang mempunyai tapak dan tinggi yang sama.",
      "Why does the triangle area formula use ½?",
      "Because every triangle is half of a parallelogram with the same base and height.",
    ),
    mathCard(
      "Mengapa formula luas trapezium menggunakan ½(a+b)?",
      "Kerana dua trapezium yang sama digabungkan membentuk segi empat selari dengan tapak (a+b). Luas satu trapezium = separuh luas segi empat selari itu.",
      "Why does the trapezium area formula use ½(a+b)?",
      "Because two identical trapeziums combine to form a parallelogram with base (a+b). Area of one trapezium = half the area of that parallelogram.",
    ),
    mathCard(
      "Mengapa formula luas lelayang menggunakan ½d₁d₂?",
      "Kerana lelayang menempati separuh kawasan segi empat tepat yang mempunyai panjang d₁ dan lebar d₂.",
      "Why does the kite area formula use ½d₁d₂?",
      "Because a kite occupies half the area of a rectangle with length d₁ and width d₂.",
    ),
    mathCard(
      "Apakah formula luas juga digunakan untuk belah ketupat?",
      "Ya. Luas belah ketupat = ½ × d₁ × d₂, iaitu formula yang sama dengan lelayang, kerana pepenjuru belah ketupat juga berserenjang.",
      "Which area formula also applies to a rhombus?",
      "Yes. Area of rhombus = ½ × d₁ × d₂, the same formula as a kite, because a rhombus's diagonals are also perpendicular.",
    ),
    mathCard(
      "Apakah fakta kunci: perimeter tetap vs luas tetap?",
      "Perimeter tetap → luas TERBESAR = segi empat sama. Luas tetap → perimeter TERKECIL = segi empat sama.",
      "What is the key fact about fixed perimeter vs fixed area?",
      "Fixed perimeter → LARGEST area = square. Fixed area → SMALLEST perimeter = square.",
    ),
    mathCard(
      "Nyatakan peraturan anggaran grid.",
      "Petak penuh di dalam = kira sebagai 1. Lebih separuh di dalam = kira sebagai 1. Kurang separuh di dalam = kira sebagai 0. Luar bentuk = tidak dikira.",
      "State the grid estimation rules.",
      "Full square inside = count as 1. More than half inside = count as 1. Less than half inside = count as 0. Outside shape = not counted.",
    ),
    mathCard(
      "Berapakah 1 m² dalam cm²?",
      "1 m² = 10 000 cm². (Kerana 1 m = 100 cm, maka 1 m² = 100 cm × 100 cm = 10 000 cm²)",
      "How many cm² is 1 m²?",
      "1 m² = 10 000 cm². (Because 1 m = 100 cm, so 1 m² = 100 cm × 100 cm = 10 000 cm²)",
    ),
    mathCard(
      "Apakah unit luas yang digunakan untuk bilik / bangunan?",
      "m² (meter persegi) digunakan untuk bilik, bangunan, dan kawasan bersaiz sederhana.",
      "What area unit is used for rooms / buildings?",
      "m² (square metres) is used for rooms, buildings and medium-sized areas.",
    ),
    mathCard(
      "Apakah unit luas yang digunakan untuk objek kecil seperti buku?",
      "cm² (sentimeter persegi) digunakan untuk objek kecil seperti buku, meja, dan kertas.",
      "What area unit is used for small objects like books?",
      "cm² (square centimetres) is used for small objects like books, tables and paper.",
    ),
    mathCard(
      "Apakah petua untuk tidak silap dalam soalan segi empat selari?",
      "Jangan gunakan sisi condong sebagai tinggi. Tinggi MESTI berserenjang (90°) dengan tapak.",
      "What is the tip to avoid mistakes in parallelogram questions?",
      "Do not use the slant side as the height. Height MUST be perpendicular (90°) to the base.",
    ),
    mathCard(
      "Apakah petua untuk tidak silap dalam soalan trapezium?",
      "Gunakan HANYA dua sisi yang SELARI (a dan b). Jangan tambahkan semua empat sisi dalam formula.",
      "What is the tip to avoid mistakes in trapezium questions?",
      "Use ONLY the two PARALLEL sides (a and b). Do not add all four sides into the formula.",
    ),
    mathCard(
      "Berikan contoh nyata penggunaan perimeter.",
      "Memasang pagar, membuat bingkai gambar, mengukur sempadan tanah, mengecat pinggiran.",
      "Give a real example of perimeter use.",
      "Installing fencing, making picture frames, measuring land boundaries, painting edges.",
    ),
    mathCard(
      "Berikan contoh nyata penggunaan luas.",
      "Membeli jubin lantai, mengira cat dinding, penanaman ladang, mereka bentuk taman.",
      "Give a real example of area use.",
      "Buying floor tiles, calculating wall paint, planting fields, designing gardens.",
    ),
  ],
  practice: [
    mathCard(
      "Segi empat sama berisi 7 cm. Kira perimeter dan luas.",
      "Perimeter = 4 × 7 = 28 cm. Luas = 7² = 49 cm².",
      "Square with side 7 cm. Calculate the perimeter and area.",
      "Perimeter = 4 × 7 = 28 cm. Area = 7² = 49 cm².",
    ),
    mathCard(
      "Segi empat tepat 11 cm × 5 cm. Kira perimeter dan luas.",
      "Perimeter = 2(11 + 5) = 32 cm. Luas = 11 × 5 = 55 cm².",
      "Rectangle 11 cm × 5 cm. Calculate perimeter and area.",
      "Perimeter = 2(11 + 5) = 32 cm. Area = 11 × 5 = 55 cm².",
    ),
    mathCard(
      "Segi tiga dengan tapak 14 cm dan tinggi 8 cm. Kira luas.",
      "Luas = ½ × 14 × 8 = ½ × 112 = 56 cm².",
      "Triangle with base 14 cm and height 8 cm. Calculate the area.",
      "Area = ½ × 14 × 8 = ½ × 112 = 56 cm².",
    ),
    mathCard(
      "Trapezium dengan sisi selari 15 cm dan 9 cm, tinggi 6 cm. Kira luas.",
      "Luas = ½ × (15 + 9) × 6 = ½ × 24 × 6 = ½ × 144 = 72 cm².",
      "Trapezium with parallel sides 15 cm and 9 cm, height 6 cm. Calculate the area.",
      "Area = ½ × (15 + 9) × 6 = ½ × 24 × 6 = ½ × 144 = 72 cm².",
    ),
    mathCard(
      "Lelayang dengan pepenjuru 16 cm dan 9 cm. Kira luas.",
      "Luas = ½ × 16 × 9 = ½ × 144 = 72 cm².",
      "Kite with diagonals 16 cm and 9 cm. Calculate the area.",
      "Area = ½ × 16 × 9 = ½ × 144 = 72 cm².",
    ),
    mathCard(
      "Taman berbentuk segi empat tepat 25 m × 18 m. Berapa meter pagar diperlukan?",
      "Pagar = perimeter = 2(25 + 18) = 2(43) = 86 m.",
      "Rectangular garden 25 m × 18 m. How many metres of fencing are needed?",
      "Fencing = perimeter = 2(25 + 18) = 2(43) = 86 m.",
    ),
    mathCard(
      "Lelayang: luas = 54 cm², satu pepenjuru = 12 cm. Cari pepenjuru yang lain.",
      "54 = ½ × 12 × d₂. 54 = 6d₂. d₂ = 9 cm.",
      "Kite: area = 54 cm², one diagonal = 12 cm. Find the other diagonal.",
      "54 = ½ × 12 × d₂. 54 = 6d₂. d₂ = 9 cm.",
    ),
    mathCard(
      "Segi tiga: luas = 30 cm², tapak = 10 cm. Cari tinggi.",
      "30 = ½ × 10 × tinggi. 30 = 5 × tinggi. Tinggi = 6 cm.",
      "Triangle: area = 30 cm², base = 10 cm. Find the height.",
      "30 = ½ × 10 × height. 30 = 5 × height. Height = 6 cm.",
    ),
    mathCard(
      "Segi empat tepat 5 m × 4 m. Jubin 50 cm × 50 cm. Berapa jubin diperlukan?",
      "Luas bilik = 5 × 4 = 20 m². Luas jubin = 0.5 × 0.5 = 0.25 m². Bilangan = 20 ÷ 0.25 = 80 jubin.",
      "Rectangle 5 m × 4 m. Tiles 50 cm × 50 cm. How many tiles are needed?",
      "Room area = 5 × 4 = 20 m². Tile area = 0.5 × 0.5 = 0.25 m². Number = 20 ÷ 0.25 = 80 tiles.",
    ),
    mathCard(
      "Bentuk L: segi empat tepat besar 8 × 5 = 40 cm², segi empat tepat kecil 3 × 2 = 6 cm². Apakah luas jumlah?",
      "Jumlah luas = 40 + 6 = 46 cm².",
      "L-shape: large rectangle 8 × 5 = 40 cm², small rectangle 3 × 2 = 6 cm². What is the total area?",
      "Total area = 40 + 6 = 46 cm².",
    ),
    mathCard(
      "Perimeter segi empat tepat = 36 cm. Panjang = 11 cm. Cari lebar.",
      "2(11 + l) = 36. 11 + l = 18. l = 7 cm.",
      "Perimeter of rectangle = 36 cm. Length = 11 cm. Find the width.",
      "2(11 + w) = 36. 11 + w = 18. w = 7 cm.",
    ),
    mathCard(
      "Apakah dimensi segi empat sama yang memberikan luas terbesar jika perimeter = 20 cm?",
      "Sisi segi empat sama = 20 ÷ 4 = 5 cm. Luas = 5 × 5 = 25 cm².",
      "What square dimensions give the largest area if perimeter = 20 cm?",
      "Square side = 20 ÷ 4 = 5 cm. Area = 5 × 5 = 25 cm².",
    ),
    mathCard(
      "Jajaran genjang: luas = 72 cm², tapak = 9 cm. Cari tinggi.",
      "72 = 9 × tinggi. Tinggi = 72 ÷ 9 = 8 cm.",
      "Parallelogram: area = 72 cm², base = 9 cm. Find the height.",
      "72 = 9 × height. Height = 72 ÷ 9 = 8 cm.",
    ),
  ],
};

const MATH_F1_C11_FLASHCARD_PAIRS = {
  concepts: [
    mathCard(
      "Apakah set?",
      "Set ialah koleksi objek yang mempunyai ciri-ciri yang sama dan boleh ditakrifkan dengan jelas. Objek-objek di dalam set dipanggil unsur atau ahli.",
      "What is a set?",
      "A set is a collection of objects that share common characteristics and can be clearly defined. The objects inside a set are called elements or members.",
    ),
    mathCard(
      "Apakah unsur set?",
      "Unsur (atau ahli) ialah setiap objek yang berada di dalam sesebuah set. Unsur ditulis di dalam kurungan kurawal { } dan dipisahkan dengan koma.",
      "What is an element of a set?",
      "An element (or member) is every object that is inside a set. Elements are written inside curly braces { } and separated by commas.",
    ),
    mathCard(
      "Apakah set kosong?",
      "Set kosong ialah set yang tidak mengandungi sebarang unsur. Dilambangkan dengan ∅ atau {}.",
      "What is an empty set?",
      "An empty set is a set that contains no elements at all. It is represented by ∅ or {}.",
    ),
    mathCard(
      "Apakah set semesta?",
      "Set semesta (ξ) ialah set yang mengandungi semua unsur yang sedang dipertimbangkan dalam sesuatu perbincangan. Diwakili oleh segi empat tepat dalam gambar rajah Venn.",
      "What is a universal set?",
      "The universal set (ξ) is the set containing all elements under consideration in a particular discussion. It is represented by a rectangle in a Venn diagram.",
    ),
    mathCard(
      "Apakah pelengkap set A?",
      "Pelengkap A (ditulis A') ialah set semua unsur dalam set semesta (ξ) yang TIDAK berada dalam set A.",
      "What is the complement of set A?",
      "The complement of A (written A') is the set of all elements in the universal set (ξ) that are NOT in set A.",
    ),
    mathCard(
      "Apakah subset?",
      "Set B adalah subset set A (ditulis B ⊂ A) jika setiap unsur dalam B juga merupakan unsur dalam A.",
      "What is a subset?",
      "Set B is a subset of set A (written B ⊂ A) if every element in B is also an element in A.",
    ),
    mathCard(
      "Apakah gambar rajah Venn?",
      "Gambar rajah Venn ialah gambar rajah yang menggunakan bulatan untuk mewakili hubungan antara set secara visual. Segi empat tepat mewakili set semesta.",
      "What is a Venn diagram?",
      "A Venn diagram is a diagram that uses circles to visually represent relationships between sets. A rectangle represents the universal set.",
    ),
    mathCard(
      "Apakah kaedah perihalan untuk mewakili set?",
      "Kaedah perihalan menerangkan set menggunakan ayat. Contoh: 'A ialah set huruf vokal dalam perkataan MALAYSIA'.",
      "What is the description method for representing a set?",
      "The description method describes a set using a sentence. Example: 'A is the set of vowels in the word MALAYSIA'.",
    ),
    mathCard(
      "Apakah kaedah penyenaraian untuk mewakili set?",
      "Kaedah penyenaraian menyenaraikan semua unsur set di dalam kurungan kurawal { }, dipisahkan dengan koma. Contoh: A = {a, i}.",
      "What is the listing method for representing a set?",
      "The listing method lists all elements inside curly braces { }, separated by commas. Example: A = {a, i}.",
    ),
    mathCard(
      "Apakah tatatanda pembina set?",
      "Tatatanda pembina set menggunakan syarat matematik. Format: A = {x : syarat}. Dibaca 'set semua x di mana x memenuhi syarat'.",
      "What is set builder notation?",
      "Set builder notation uses a mathematical condition. Format: A = {x : condition}. Read as 'the set of all x where x satisfies the condition'.",
    ),
    mathCard(
      "Apakah maksud ':' dalam tatatanda pembina set?",
      "Titik bertindih ':' dalam tatatanda pembina set bermaksud 'di mana' atau 'dengan syarat bahawa'. Contoh: {x : x > 5} = 'set semua x di mana x lebih besar daripada 5'.",
      "What does ':' mean in set builder notation?",
      "The colon ':' in set builder notation means 'where' or 'such that'. Example: {x : x > 5} = 'the set of all x where x is greater than 5'.",
    ),
    mathCard(
      "Apakah set berasingan (disjoint)?",
      "Dua set adalah berasingan jika mereka tidak berkongsi sebarang unsur. Dalam gambar rajah Venn, bulatan mereka tidak bersentuhan.",
      "What are disjoint sets?",
      "Two sets are disjoint if they share no common elements. In a Venn diagram, their circles do not touch.",
    ),
    mathCard(
      "Apakah set sama?",
      "Dua set adalah sama (A = B) jika mereka mengandungi unsur yang sama persis. Susunan tidak penting.",
      "What are equal sets?",
      "Two sets are equal (A = B) if they contain exactly the same elements. Order does not matter.",
    ),
    mathCard(
      "Apa bezanya ∅, {0} dan {∅}?",
      "∅: set kosong, tiada unsur. {0}: set mengandungi satu unsur (nombor 0). {∅}: set mengandungi satu unsur (simbol set kosong).",
      "What is the difference between ∅, {0} and {∅}?",
      "∅: empty set, no elements. {0}: a set containing one element (the number 0). {∅}: a set containing one element (the empty set symbol).",
    ),
    mathCard(
      "Apakah simbol untuk 'adalah unsur bagi' dan 'bukan unsur bagi'?",
      "∈ bermaksud 'adalah unsur bagi'. ∉ bermaksud 'bukan unsur bagi'. Contoh: 3 ∈ {1,2,3} dan 4 ∉ {1,2,3}.",
      "What are the symbols for 'is an element of' and 'is not an element of'?",
      "∈ means 'is an element of'. ∉ means 'is not an element of'. Example: 3 ∈ {1,2,3} and 4 ∉ {1,2,3}.",
    ),
  ],
  operations: [
    mathCard(
      "Senaraikan semua unsur set A jika A = {x : x ialah nombor perdana, x < 15}.",
      "A = {2, 3, 5, 7, 11, 13}. (Nombor perdana kurang daripada 15.)",
      "List all elements of set A where A = {x : x is a prime number, x < 15}.",
      "A = {2, 3, 5, 7, 11, 13}. (Prime numbers less than 15.)",
    ),
    mathCard(
      "Cari n(A) jika A = {huruf dalam perkataan 'SEKOLAH'}.",
      "Huruf dalam SEKOLAH: S, E, K, O, L, A, H (tiada ulangan). n(A) = 7.",
      "Find n(A) if A = {letters in the word 'SCHOOL'}.",
      "Letters in SCHOOL: S, C, H, O, L (unique). n(A) = 5.",
    ),
    mathCard(
      "ξ = {1–10}, A = {2,4,6,8,10}. Cari A'.",
      "A' = unsur dalam ξ yang bukan dalam A = {1, 3, 5, 7, 9}.",
      "ξ = {1–10}, A = {2,4,6,8,10}. Find A'.",
      "A' = elements in ξ not in A = {1, 3, 5, 7, 9}.",
    ),
    mathCard(
      "Tentukan sama ada B ⊂ A: A = {1,2,3,4,5}, B = {1,3,5}.",
      "Semak: 1 ∈ A ✓, 3 ∈ A ✓, 5 ∈ A ✓. Semua unsur B ada dalam A → B ⊂ A. Ya.",
      "Determine whether B ⊂ A: A = {1,2,3,4,5}, B = {1,3,5}.",
      "Check: 1 ∈ A ✓, 3 ∈ A ✓, 5 ∈ A ✓. All elements of B are in A → B ⊂ A. Yes.",
    ),
    mathCard(
      "Adakah {2, 7} ⊂ {1, 2, 3, 7, 9}?",
      "Semak: 2 ∈ {1,2,3,7,9} ✓. 7 ∈ {1,2,3,7,9} ✓. Ya, {2,7} ⊂ {1,2,3,7,9}.",
      "Is {2, 7} ⊂ {1, 2, 3, 7, 9}?",
      "Check: 2 ∈ {1,2,3,7,9} ✓. 7 ∈ {1,2,3,7,9} ✓. Yes, {2,7} ⊂ {1,2,3,7,9}.",
    ),
    mathCard(
      "Adakah {a, b, c} = {c, a, b}?",
      "Ya, kedua-dua set mengandungi unsur yang sama (a, b, c). Susunan tidak penting dalam set.",
      "Is {a, b, c} = {c, a, b}?",
      "Yes, both sets contain the same elements (a, b, c). Order does not matter in a set.",
    ),
    mathCard(
      "Cari bilangan subset bagi A = {x, y, z}.",
      "n(A) = 3. Bilangan subset = 2³ = 8.",
      "Find the number of subsets of A = {x, y, z}.",
      "n(A) = 3. Number of subsets = 2³ = 8.",
    ),
    mathCard(
      "Senaraikan semua subset bagi {p, q}.",
      "Subset: ∅, {p}, {q}, {p, q}. Jumlah = 2² = 4 subset.",
      "List all subsets of {p, q}.",
      "Subsets: ∅, {p}, {q}, {p, q}. Total = 2² = 4 subsets.",
    ),
    mathCard(
      "ξ = {a,b,c,d,e,f}, B = {b,d,f}. Cari n(B').",
      "B' = {a,c,e}. n(B') = 3.",
      "ξ = {a,b,c,d,e,f}, B = {b,d,f}. Find n(B').",
      "B' = {a,c,e}. n(B') = 3.",
    ),
    mathCard(
      "Tukarkan ke kaedah penyenaraian: A = {x : x ialah nombor bulat, 3 ≤ x ≤ 8}.",
      "A = {3, 4, 5, 6, 7, 8}.",
      "Convert to listing method: A = {x : x is an integer, 3 ≤ x ≤ 8}.",
      "A = {3, 4, 5, 6, 7, 8}.",
    ),
    mathCard(
      "Tukarkan ke tatatanda pembina set: B = {2, 4, 6, 8, 10}.",
      "B = {x : x ialah nombor genap, 0 < x ≤ 10}.",
      "Convert to set builder notation: B = {2, 4, 6, 8, 10}.",
      "B = {x : x is an even number, 0 < x ≤ 10}.",
    ),
    mathCard(
      "Adakah {3, 5, 7} = {7, 5, 3, 5}?",
      "Buang ulangan: {7, 5, 3, 5} → {3, 5, 7}. Maka {3,5,7} = {3,5,7}. Ya, kedua-dua set sama.",
      "Is {3, 5, 7} = {7, 5, 3, 5}?",
      "Remove repeats: {7, 5, 3, 5} → {3, 5, 7}. So {3,5,7} = {3,5,7}. Yes, both sets are equal.",
    ),
    mathCard(
      "Jika n(A) = 5, berapakah bilangan subset A?",
      "Bilangan subset = 2⁵ = 32.",
      "If n(A) = 5, how many subsets does A have?",
      "Number of subsets = 2⁵ = 32.",
    ),
    mathCard(
      "ξ = {1,2,3,4,5,6,7,8,9,10}, A = {1,3,5,7,9}. Nyatakan n(A) dan n(A').",
      "n(A) = 5. n(A') = n(ξ) − n(A) = 10 − 5 = 5.",
      "ξ = {1,2,3,4,5,6,7,8,9,10}, A = {1,3,5,7,9}. State n(A) and n(A').",
      "n(A) = 5. n(A') = n(ξ) − n(A) = 10 − 5 = 5.",
    ),
    mathCard(
      "Adakah ∅ ⊂ {1, 2, 3}? Terangkan.",
      "Ya. Set kosong adalah subset SETIAP set, termasuk {1,2,3}. Ini adalah peraturan asas.",
      "Is ∅ ⊂ {1, 2, 3}? Explain.",
      "Yes. The empty set is a subset of EVERY set, including {1,2,3}. This is a fundamental rule.",
    ),
    mathCard(
      "Tentukan sama ada {6} ⊂ {1,2,3,4,5}.",
      "Semak: 6 ∉ {1,2,3,4,5}. Oleh kerana ada unsur dalam {6} yang tidak ada dalam set tersebut, {6} ⊄ {1,2,3,4,5}.",
      "Determine whether {6} ⊂ {1,2,3,4,5}.",
      "Check: 6 ∉ {1,2,3,4,5}. Since there is an element in {6} not in the set, {6} ⊄ {1,2,3,4,5}.",
    ),
    mathCard(
      "Cari semua subset bagi {1, 2, 3} yang mengandungi unsur 2.",
      "Subset yang mengandungi 2: {2}, {1,2}, {2,3}, {1,2,3}. Jumlah = 4 subset.",
      "Find all subsets of {1, 2, 3} that contain element 2.",
      "Subsets containing 2: {2}, {1,2}, {2,3}, {1,2,3}. Total = 4 subsets.",
    ),
  ],
  facts: [
    mathCard(
      "Nyatakan peraturan: set kosong dan subset.",
      "PERATURAN: Set kosong (∅) adalah subset SETIAP set. ∅ ⊂ A untuk setiap set A.",
      "State the rule: empty set and subsets.",
      "RULE: The empty set (∅) is a subset of EVERY set. ∅ ⊂ A for every set A.",
    ),
    mathCard(
      "Nyatakan peraturan: setiap set dan subset dirinya sendiri.",
      "PERATURAN: Setiap set adalah subset dirinya sendiri. A ⊂ A untuk setiap set A.",
      "State the rule: every set is a subset of itself.",
      "RULE: Every set is a subset of itself. A ⊂ A for every set A.",
    ),
    mathCard(
      "Apakah formula bilangan subset?",
      "Bilangan subset = 2ⁿ, di mana n ialah bilangan unsur dalam set.",
      "What is the formula for the number of subsets?",
      "Number of subsets = 2ⁿ, where n is the number of elements in the set.",
    ),
    mathCard(
      "Berapakah bilangan subset set kosong?",
      "Bilangan subset ∅ = 2⁰ = 1. Set kosong hanya mempunyai satu subset, iaitu dirinya sendiri (∅).",
      "How many subsets does the empty set have?",
      "Number of subsets of ∅ = 2⁰ = 1. The empty set has only one subset — itself (∅).",
    ),
    mathCard(
      "Apakah perbezaan antara unsur berulang dan set yang mengandunginya?",
      "Unsur berulang hanya dikira SEKALI dalam set. Contoh: huruf dalam 'LULUS' → {L, U, S}. n = 3, bukan 5.",
      "What is the key rule about repeated elements?",
      "Repeated elements are counted only ONCE in a set. Example: letters in 'LEVEL' → {L, E, V}. n = 3, not 5.",
    ),
    mathCard(
      "Apakah perbezaan antara susunan unsur dalam set?",
      "Susunan unsur tidak penting dalam set. {1,2,3} = {3,2,1} = {2,1,3}. Semua ini adalah set yang sama.",
      "What is the rule about the order of elements in a set?",
      "The order of elements does not matter in a set. {1,2,3} = {3,2,1} = {2,1,3}. All these are the same set.",
    ),
    mathCard(
      "Apakah yang dilambangkan oleh segi empat tepat dalam gambar rajah Venn?",
      "Segi empat tepat dalam gambar rajah Venn mewakili set semesta (ξ) — mengandungi semua unsur yang sedang dipertimbangkan.",
      "What does the rectangle represent in a Venn diagram?",
      "The rectangle in a Venn diagram represents the universal set (ξ) — it contains all elements under consideration.",
    ),
    mathCard(
      "Apakah yang dilambangkan oleh bulatan dalam gambar rajah Venn?",
      "Bulatan dalam gambar rajah Venn mewakili sesebuah set di dalam set semesta.",
      "What does the circle represent in a Venn diagram?",
      "A circle in a Venn diagram represents a set within the universal set.",
    ),
    mathCard(
      "Nyatakan hubungan antara n(A) dan n(A').",
      "n(A) + n(A') = n(ξ). Oleh itu n(A') = n(ξ) − n(A).",
      "State the relationship between n(A) and n(A').",
      "n(A) + n(A') = n(ξ). Therefore n(A') = n(ξ) − n(A).",
    ),
    mathCard(
      "Apakah bilangan subset wajar (proper subsets) bagi set dengan n unsur?",
      "Bilangan subset wajar = 2ⁿ − 1. (Tidak termasuk set itu sendiri.)",
      "What is the number of proper subsets for a set with n elements?",
      "Number of proper subsets = 2ⁿ − 1. (Excluding the set itself.)",
    ),
    mathCard(
      "Nyatakan tiga kaedah perwakilan set.",
      "1) Perihalan: guna ayat. 2) Penyenaraian: {unsur1, unsur2, ...}. 3) Tatatanda pembina set: {x : syarat}.",
      "State the three methods of representing a set.",
      "1) Description: use a sentence. 2) Listing: {element1, element2, ...}. 3) Set builder notation: {x : condition}.",
    ),
    mathCard(
      "Apakah n(∅)?",
      "n(∅) = 0. Set kosong tidak mengandungi sebarang unsur.",
      "What is n(∅)?",
      "n(∅) = 0. The empty set contains no elements.",
    ),
    mathCard(
      "Adakah {5} = 5?",
      "Tidak! {5} ialah set yang mengandungi unsur 5. 5 ialah nombor sahaja. Set dan unsurnya adalah berbeza.",
      "Is {5} = 5?",
      "No! {5} is a set containing the element 5. 5 is just a number. A set and its element are different things.",
    ),
    mathCard(
      "Apakah simbol set semesta?",
      "ξ (huruf Greek xi kecil). Set semesta diletakkan di sudut kiri atas segi empat tepat dalam gambar rajah Venn.",
      "What is the symbol for the universal set?",
      "ξ (lowercase Greek letter xi). The universal set is labelled at the top-left corner of the rectangle in a Venn diagram.",
    ),
  ],
  practice: [
    mathCard(
      "A = {huruf dalam 'MATEMATIK'}. Cari n(A).",
      "Huruf dalam MATEMATIK: M,A,T,E,M,A,T,I,K. Unik: {M,A,T,E,I,K}. n(A) = 6.",
      "A = {letters in 'MATHEMATICS'}. Find n(A).",
      "Letters: M,A,T,H,E,M,A,T,I,C,S. Unique: {M,A,T,H,E,I,C,S}. n(A) = 8.",
    ),
    mathCard(
      "ξ = {1,2,3,...,12}, P = {x : x ialah gandaan 3, x ≤ 12}. Cari P dan P'.",
      "P = {3,6,9,12}. P' = {1,2,4,5,7,8,10,11}.",
      "ξ = {1,2,...,12}, P = {x : x is a multiple of 3, x ≤ 12}. Find P and P'.",
      "P = {3,6,9,12}. P' = {1,2,4,5,7,8,10,11}.",
    ),
    mathCard(
      "Cari bilangan subset bagi {a, b, c, d, e}.",
      "n = 5. Bilangan subset = 2⁵ = 32.",
      "Find the number of subsets of {a, b, c, d, e}.",
      "n = 5. Number of subsets = 2⁵ = 32.",
    ),
    mathCard(
      "ξ = {bulatan, segi tiga, segi empat, pentagon, heksagon}. A = {bentuk dengan 4 sisi atau kurang}. Cari A dan A'.",
      "A = {segi tiga, segi empat}. A' = {bulatan, pentagon, heksagon}.",
      "ξ = {circle, triangle, square, pentagon, hexagon}. A = {shapes with 4 or fewer sides}. Find A and A'.",
      "A = {triangle, square}. A' = {circle, pentagon, hexagon}.",
    ),
    mathCard(
      "Adakah {2,4,6} = {6,2,4}? Adakah ia set kosong?",
      "Ya, {2,4,6} = {6,2,4} kerana mengandungi unsur yang sama. Tidak, ia bukan set kosong (n = 3).",
      "Is {2,4,6} = {6,2,4}? Is it an empty set?",
      "Yes, {2,4,6} = {6,2,4} because they contain the same elements. No, it is not empty (n = 3).",
    ),
    mathCard(
      "Nyatakan 4 subset bagi {m, n} (senaraikan semua).",
      "∅, {m}, {n}, {m, n}. Jumlah = 2² = 4 subset.",
      "State all 4 subsets of {m, n}.",
      "∅, {m}, {n}, {m, n}. Total = 2² = 4 subsets.",
    ),
    mathCard(
      "ξ = {1,2,3,...,20}. A = {x : x ialah nombor genap}. Cari n(A) dan n(A').",
      "A = {2,4,6,8,10,12,14,16,18,20}. n(A) = 10. n(A') = 20 − 10 = 10.",
      "ξ = {1,2,...,20}. A = {x : x is an even number}. Find n(A) and n(A').",
      "A = {2,4,6,8,10,12,14,16,18,20}. n(A) = 10. n(A') = 20 − 10 = 10.",
    ),
    mathCard(
      "Tentukan semua subset satu unsur bagi {a, b, c, d}.",
      "{a}, {b}, {c}, {d}. (4 subset satu unsur — sama dengan bilangan unsur.)",
      "Determine all single-element subsets of {a, b, c, d}.",
      "{a}, {b}, {c}, {d}. (4 single-element subsets — equals the number of elements.)",
    ),
    mathCard(
      "Set A mempunyai 64 subset. Berapakah n(A)?",
      "2ⁿ = 64. 2⁶ = 64. n(A) = 6.",
      "Set A has 64 subsets. What is n(A)?",
      "2ⁿ = 64. 2⁶ = 64. n(A) = 6.",
    ),
    mathCard(
      "Adakah {0} set kosong?",
      "Tidak. {0} mengandungi satu unsur iaitu nombor 0. n({0}) = 1. Set kosong ditulis ∅ atau {}.",
      "Is {0} an empty set?",
      "No. {0} contains one element — the number 0. n({0}) = 1. The empty set is written ∅ or {}.",
    ),
    mathCard(
      "ξ = {1,...,10}. A = {x : x adalah faktor 12 dan x ≤ 10}. Cari A, n(A) dan A'.",
      "Faktor 12: 1,2,3,4,6,12. Yang ≤ 10: A = {1,2,3,4,6}. n(A) = 5. A' = {5,7,8,9,10}.",
      "ξ = {1,...,10}. A = {x : x is a factor of 12 and x ≤ 10}. Find A, n(A) and A'.",
      "Factors of 12: 1,2,3,4,6,12. Those ≤ 10: A = {1,2,3,4,6}. n(A) = 5. A' = {5,7,8,9,10}.",
    ),
    mathCard(
      "Set M mempunyai 128 subset. Berapakah n(M)?",
      "2ⁿ = 128. 2⁷ = 128. n(M) = 7.",
      "Set M has 128 subsets. What is n(M)?",
      "2ⁿ = 128. 2⁷ = 128. n(M) = 7.",
    ),
    mathCard(
      "Adakah set {bulan yang mempunyai 30 hari} set kosong?",
      "Tidak. April, Jun, September dan November mempunyai 30 hari. n = 4.",
      "Is the set {months with 30 days} an empty set?",
      "No. April, June, September and November have 30 days. n = 4.",
    ),
  ],
};

const MATH_F1_C13_FLASHCARD_PAIRS = {
  concepts: [
    mathCard(
      "Apakah hipotenus?",
      "Hipotenus ialah sisi terpanjang dalam segi tiga bersudut tegak. Ia sentiasa bertentangan dengan sudut 90°.",
      "What is the hypotenuse?",
      "The hypotenuse is the longest side in a right-angled triangle. It is always opposite the 90° angle.",
    ),
    mathCard(
      "Apakah Teorem Pythagoras?",
      "Teorem Pythagoras menyatakan: c² = a² + b², di mana c ialah hipotenus dan a, b ialah dua sisi yang lain dalam segi tiga bersudut tegak.",
      "What is Pythagoras' Theorem?",
      "Pythagoras' Theorem states: c² = a² + b², where c is the hypotenuse and a, b are the other two sides of a right-angled triangle.",
    ),
    mathCard(
      "Apakah segi tiga bersudut tegak?",
      "Segi tiga bersudut tegak ialah segi tiga yang mempunyai TEPAT SATU sudut tegak (90°). Simbol □ menandakan sudut tegak.",
      "What is a right-angled triangle?",
      "A right-angled triangle is a triangle that has EXACTLY ONE right angle (90°). The □ symbol marks the right angle.",
    ),
    mathCard(
      "Di manakah hipotenus berada dalam segi tiga bersudut tegak?",
      "Hipotenus berada BERTENTANGAN dengan sudut 90°. Ia adalah sisi yang tidak membentuk sudut tegak.",
      "Where is the hypotenuse in a right-angled triangle?",
      "The hypotenuse is OPPOSITE the 90° angle. It is the side that does not form the right angle.",
    ),
    mathCard(
      "Apakah akas Teorem Pythagoras?",
      "Akas menyatakan: jika c² = a² + b² (c = sisi terpanjang), maka segi tiga adalah BERSUDUT TEGAK.",
      "What is the converse of Pythagoras' Theorem?",
      "The converse states: if c² = a² + b² (c = longest side), then the triangle IS RIGHT-ANGLED.",
    ),
    mathCard(
      "Apakah triple Pythagoras?",
      "Set tiga nombor bulat positif (a, b, c) yang memenuhi a² + b² = c². Contoh: 3-4-5, 5-12-13, 8-15-17, 7-24-25.",
      "What is a Pythagorean triple?",
      "A set of three positive integers (a, b, c) satisfying a² + b² = c². Examples: 3-4-5, 5-12-13, 8-15-17, 7-24-25.",
    ),
    mathCard(
      "Apakah segi tiga bersudut tirus?",
      "Segi tiga di mana SEMUA sudut kurang daripada 90°. Dikenal pasti dengan: c² < a² + b² (c = sisi terpanjang).",
      "What is an acute-angled triangle?",
      "A triangle where ALL angles are less than 90°. Identified by: c² < a² + b² (c = longest side).",
    ),
    mathCard(
      "Apakah segi tiga bersudut cakah?",
      "Segi tiga yang mempunyai SATU sudut lebih besar daripada 90°. Dikenal pasti dengan: c² > a² + b² (c = sisi terpanjang).",
      "What is an obtuse-angled triangle?",
      "A triangle that has ONE angle greater than 90°. Identified by: c² > a² + b² (c = longest side).",
    ),
    mathCard(
      "Bolehkah Teorem Pythagoras digunakan untuk semua segi tiga?",
      "TIDAK. Teorem Pythagoras HANYA boleh digunakan untuk segi tiga BERSUDUT TEGAK sahaja.",
      "Can Pythagoras' Theorem be used for all triangles?",
      "NO. Pythagoras' Theorem can ONLY be used for RIGHT-ANGLED triangles.",
    ),
    mathCard(
      "Apakah yang dimaksudkan dengan 'kaki' dalam segi tiga bersudut tegak?",
      "Kaki ialah dua sisi yang lebih pendek dalam segi tiga bersudut tegak — sisi yang membentuk sudut 90°. Hipotenus adalah sisi ketiga.",
      "What is meant by 'leg' in a right-angled triangle?",
      "Legs are the two shorter sides in a right-angled triangle — the sides that form the 90° angle. The hypotenuse is the third side.",
    ),
    mathCard(
      "Adakah hipotenus boleh menjadi kaki sudut tegak?",
      "TIDAK. Hipotenus sentiasa bertentangan dengan sudut 90°, BUKAN menjadi kaki sudut tegak. Kaki sudut tegak adalah dua sisi yang lebih pendek.",
      "Can the hypotenuse be a leg of the right angle?",
      "NO. The hypotenuse is always OPPOSITE the right angle, NOT a leg forming it. The legs are the two shorter sides.",
    ),
    mathCard(
      "Apakah aplikasi Teorem Pythagoras dalam pembinaan?",
      "Dalam pembinaan, Teorem Pythagoras digunakan untuk memastikan sudut tepat 90° — jika sisi 3m, 4m dan pepenjuru 5m, sudutnya adalah 90°.",
      "What is the application of Pythagoras' Theorem in construction?",
      "In construction, Pythagoras' Theorem is used to ensure 90° right angles — if sides are 3m, 4m and diagonal is 5m, the angle is exactly 90°.",
    ),
    mathCard(
      "Berapakah saiz sudut yang bertentangan dengan hipotenus?",
      "Sudut yang bertentangan dengan hipotenus sentiasa 90° (sudut tegak). Ini adalah definisi hipotenus.",
      "What is the size of the angle opposite the hypotenuse?",
      "The angle opposite the hypotenuse is always 90° (right angle). This is the definition of the hypotenuse.",
    ),
    mathCard(
      "Mengapa c² = a² + b² dan bukan a² = c² + b²?",
      "Kerana c ialah hipotenus (sisi terpanjang). Dalam rumus, hipotenus BERSENDIRIAN di satu sisi persamaan. a dan b (kaki) berada di sisi lain.",
      "Why is c² = a² + b² and not a² = c² + b²?",
      "Because c is the hypotenuse (longest side). In the formula, the hypotenuse is ALONE on one side of the equation. a and b (legs) are on the other side.",
    ),
    mathCard(
      "Apakah kegunaan triple Pythagoras dalam penyelesaian soalan?",
      "Jika anda mengenal triple Pythagoras (3-4-5, 5-12-13, dll.), anda boleh terus menulis jawapan TANPA pengiraan panjang — menjimatkan masa dalam peperiksaan.",
      "What is the use of Pythagorean triples in solving problems?",
      "If you recognise a Pythagorean triple (3-4-5, 5-12-13, etc.), you can write the answer DIRECTLY without lengthy calculation — saving time in exams.",
    ),
  ],
  operations: [
    mathCard(
      "Rumus untuk mencari hipotenus c ialah:",
      "c = √(a² + b²). Langkah: kira a², kira b², tambah, kemudian ambil punca kuasa dua.",
      "The formula to find hypotenuse c is:",
      "c = √(a² + b²). Steps: calculate a², calculate b², add, then take the square root.",
    ),
    mathCard(
      "Rumus untuk mencari kaki a ialah:",
      "a = √(c² − b²). TOLAK, bukan tambah, kerana mencari sisi lebih pendek. c = hipotenus.",
      "The formula to find leg a is:",
      "a = √(c² − b²). SUBTRACT, not add, because we are finding the shorter side. c = hypotenuse.",
    ),
    mathCard(
      "Apakah langkah-langkah untuk mencari hipotenus?",
      "① Kenal pasti a dan b. ② Kira a² dan b². ③ Tambah: c² = a²+b². ④ Ambil punca kuasa dua: c = √(c²). ⑤ Semak: c > a dan c > b.",
      "What are the steps to find the hypotenuse?",
      "① Identify a and b. ② Calculate a² and b². ③ Add: c² = a²+b². ④ Take square root: c = √(c²). ⑤ Check: c > a and c > b.",
    ),
    mathCard(
      "Apakah langkah-langkah untuk mencari kaki yang tidak diketahui?",
      "① Kenal pasti c (hipotenus) dan kaki yang diketahui. ② Kira c². ③ Kira (kaki diketahui)². ④ TOLAK: kaki² = c² − (kaki diketahui)². ⑤ Ambil punca kuasa dua.",
      "What are the steps to find the missing leg?",
      "① Identify c (hypotenuse) and the known leg. ② Calculate c². ③ Calculate (known leg)². ④ SUBTRACT: leg² = c² − (known leg)². ⑤ Take square root.",
    ),
    mathCard(
      "Apakah langkah-langkah mengklasifikasikan segi tiga menggunakan akas?",
      "① Senarai 3 sisi. ② Kenal pasti c (terpanjang). ③ Kira c². ④ Kira a²+b². ⑤ Bandingkan: sama=tegak, kurang=tirus, lebih=cakah.",
      "What are the steps to classify a triangle using the converse?",
      "① List 3 sides. ② Identify c (longest). ③ Calculate c². ④ Calculate a²+b². ⑤ Compare: equal=right, less=acute, greater=obtuse.",
    ),
    mathCard(
      "Cara menggunakan akas Teorem Pythagoras untuk menentukan jenis segi tiga:",
      "Kira c² dan a²+b². Jika sama → tegak. Jika c² < a²+b² → tirus. Jika c² > a²+b² → cakah.",
      "How to use the converse of Pythagoras' Theorem to determine triangle type:",
      "Calculate c² and a²+b². If equal → right. If c² < a²+b² → acute. If c² > a²+b² → obtuse.",
    ),
    mathCard(
      "a = 3, b = 4. Cari c.",
      "c² = 3²+4² = 9+16 = 25. c = √25 = 5.",
      "a = 3, b = 4. Find c.",
      "c² = 3²+4² = 9+16 = 25. c = √25 = 5.",
    ),
    mathCard(
      "c = 13, a = 5. Cari b.",
      "b² = 13²−5² = 169−25 = 144. b = √144 = 12.",
      "c = 13, a = 5. Find b.",
      "b² = 13²−5² = 169−25 = 144. b = √144 = 12.",
    ),
    mathCard(
      "Bagaimana cara mencari pepenjuru segi empat tepat 6cm × 8cm?",
      "Pepenjuru = hipotenus. d² = 6²+8² = 36+64 = 100. d = √100 = 10 cm.",
      "How to find the diagonal of a 6cm × 8cm rectangle?",
      "Diagonal = hypotenuse. d² = 6²+8² = 36+64 = 100. d = √100 = 10 cm.",
    ),
    mathCard(
      "Tangga 10m bersandar pada dinding. Kaki tangga 6m dari dinding. Berapa ketinggian tangga pada dinding?",
      "h² = 10²−6² = 100−36 = 64. h = √64 = 8m.",
      "A 10m ladder leans on a wall. Base is 6m from wall. Find height on wall.",
      "h² = 10²−6² = 100−36 = 64. h = √64 = 8m.",
    ),
    mathCard(
      "Adakah 7, 24, 25 triple Pythagoras?",
      "7²+24² = 49+576 = 625 = 25². Ya, ia adalah triple Pythagoras!",
      "Is 7, 24, 25 a Pythagorean triple?",
      "7²+24² = 49+576 = 625 = 25². Yes, it is a Pythagorean triple!",
    ),
    mathCard(
      "Apakah gandaan triple 3-4-5 yang lain?",
      "Gandakan setiap nombor dengan faktor yang sama: ×2 = (6,8,10), ×3 = (9,12,15), ×4 = (12,16,20), ×5 = (15,20,25).",
      "What are other multiples of the 3-4-5 triple?",
      "Multiply each number by the same factor: ×2 = (6,8,10), ×3 = (9,12,15), ×4 = (12,16,20), ×5 = (15,20,25).",
    ),
    mathCard(
      "a = 8, b = 15. Cari c.",
      "c² = 8²+15² = 64+225 = 289. c = √289 = 17. Triple 8-15-17!",
      "a = 8, b = 15. Find c.",
      "c² = 8²+15² = 64+225 = 289. c = √289 = 17. The 8-15-17 triple!",
    ),
    mathCard(
      "Segi tiga sama kaki dengan dua sisi = 10cm dan tapak = 12cm. Cari ketinggian.",
      "Bahagi tapak: 6cm. h²+6² = 10². h² = 100−36 = 64. h = 8cm.",
      "Isosceles triangle with two sides = 10cm and base = 12cm. Find height.",
      "Halve the base: 6cm. h²+6² = 10². h² = 100−36 = 64. h = 8cm.",
    ),
    mathCard(
      "Cara menentukan sama ada segi tiga 9, 40, 41 adalah bersudut tegak:",
      "c=41: c²=1681. a²+b²=81+1600=1681. 1681=1681 ✓. Bersudut tegak! (Triple 9-40-41).",
      "How to determine whether triangle 9, 40, 41 is right-angled:",
      "c=41: c²=1681. a²+b²=81+1600=1681. 1681=1681 ✓. Right-angled! (9-40-41 triple).",
    ),
    mathCard(
      "Cara mencari sisi tidak diketahui dalam segi tiga bersudut tegak — kesilapan lazim:",
      "❌ SILAP: a² = c²+b² (menambah — salah!). ✅ BETUL: a² = c²−b² (menolak — betul, kerana mencari sisi lebih pendek).",
      "How to find the missing side in a right-angled triangle — common mistake:",
      "❌ WRONG: a² = c²+b² (adding — incorrect!). ✅ CORRECT: a² = c²−b² (subtracting — correct, because finding shorter side).",
    ),
  ],
  facts: [
    mathCard(
      "Fakta: hipotenus sentiasa...",
      "...sisi TERPANJANG. Dan sentiasa BERTENTANGAN dengan sudut 90°. Tidak pernah menjadi kaki sudut tegak.",
      "Fact: the hypotenuse is always...",
      "...the LONGEST side. And always OPPOSITE the 90° angle. Never a leg forming the right angle.",
    ),
    mathCard(
      "Fakta: c² = a²+b² adalah BENAR hanya untuk...",
      "...segi tiga BERSUDUT TEGAK sahaja. Ia tidak berlaku untuk segi tiga tirus atau cakah.",
      "Fact: c² = a²+b² is TRUE only for...",
      "...RIGHT-ANGLED triangles only. It does not apply to acute or obtuse triangles.",
    ),
    mathCard(
      "Fakta: jika c² = a²+b², segi tiga adalah...",
      "...bersudut tegak. Ini adalah akas Teorem Pythagoras — bukan andaian, ia adalah fakta yang terbukti.",
      "Fact: if c² = a²+b², the triangle is...",
      "...right-angled. This is the converse of Pythagoras' Theorem — not an assumption, it is a proven fact.",
    ),
    mathCard(
      "Fakta: jika c² < a²+b², segi tiga adalah...",
      "...bersudut tirus (semua sudut < 90°). Sisi terpanjang 'tidak cukup panjang' untuk membentuk sudut tegak.",
      "Fact: if c² < a²+b², the triangle is...",
      "...acute-angled (all angles < 90°). The longest side is 'not long enough' to form a right angle.",
    ),
    mathCard(
      "Fakta: jika c² > a²+b², segi tiga adalah...",
      "...bersudut cakah (satu sudut > 90°). Sisi terpanjang 'terlalu panjang' — sudutnya melebihi 90°.",
      "Fact: if c² > a²+b², the triangle is...",
      "...obtuse-angled (one angle > 90°). The longest side is 'too long' — the angle exceeds 90°.",
    ),
    mathCard(
      "Fakta: gandaan triple Pythagoras...",
      "...juga merupakan triple Pythagoras. Cth: 3-4-5 × 2 = 6-8-10; 3-4-5 × 3 = 9-12-15. Semuanya bersudut tegak.",
      "Fact: multiples of Pythagorean triples...",
      "...are also Pythagorean triples. E.g.: 3-4-5 × 2 = 6-8-10; 3-4-5 × 3 = 9-12-15. All are right-angled.",
    ),
    mathCard(
      "Empat triple Pythagoras paling biasa yang perlu dihafal:",
      "(3, 4, 5) — paling biasa!\n(5, 12, 13)\n(8, 15, 17)\n(7, 24, 25)",
      "Four most common Pythagorean triples to memorise:",
      "(3, 4, 5) — most common!\n(5, 12, 13)\n(8, 15, 17)\n(7, 24, 25)",
    ),
    mathCard(
      "Fakta: pepenjuru segi empat tepat...",
      "...boleh dicari menggunakan Teorem Pythagoras. Pepenjuru = hipotenus segi tiga bersudut tegak yang dibentuk oleh panjang dan lebar.",
      "Fact: the diagonal of a rectangle...",
      "...can be found using Pythagoras' Theorem. Diagonal = hypotenuse of the right-angled triangle formed by the length and width.",
    ),
    mathCard(
      "Fakta: ketinggian segi tiga sama kaki...",
      "...boleh dicari dengan Pythagoras. Bahagi tapak kepada dua, kemudian gunakan a²+h²=sisi² untuk mencari h.",
      "Fact: the height of an isosceles triangle...",
      "...can be found using Pythagoras. Halve the base, then use a²+h²=side² to find h.",
    ),
    mathCard(
      "Fakta: untuk menyemak jawapan hipotenus:",
      "Hipotenus MESTI lebih panjang daripada setiap kaki. Jika jawapan anda lebih pendek daripada salah satu kaki, ada kesilapan!",
      "Fact: to check the hypotenuse answer:",
      "The hypotenuse MUST be longer than each leg. If your answer is shorter than one of the legs, there is an error!",
    ),
    mathCard(
      "Fakta: segi tiga tidak sah jika...",
      "...jumlah mana-mana dua sisi TIDAK lebih besar daripada sisi ketiga. Contoh: 1, 2, 10 bukan segi tiga kerana 1+2=3 < 10.",
      "Fact: a triangle is invalid if...",
      "...the sum of any two sides is NOT greater than the third side. Example: 1, 2, 10 is not a triangle because 1+2=3 < 10.",
    ),
    mathCard(
      "Fakta: Teorem Pythagoras digunakan dalam kehidupan seharian untuk...",
      "...tangga & dinding, tiang & wayar sokongan, jarak pepenjuru, saiz skrin TV, dan memastikan sudut tegak dalam pembinaan.",
      "Fact: Pythagoras' Theorem is used in daily life for...",
      "...ladders & walls, poles & support wires, diagonal distances, TV screen sizes, and ensuring right angles in construction.",
    ),
    mathCard(
      "Rumus ringkas untuk semua situasi:",
      "c² = a²+b² → hipotenus. a² = c²−b² → kaki. b² = c²−a² → kaki. Ingat: cari hipotenus TAMBAH; cari kaki TOLAK.",
      "Compact formula for all situations:",
      "c² = a²+b² → hypotenuse. a² = c²−b² → leg. b² = c²−a² → leg. Remember: finding hypotenuse ADD; finding leg SUBTRACT.",
    ),
    mathCard(
      "Fakta: saiz skrin TV diukur menggunakan...",
      "...pepenjuru, yang dikira menggunakan Teorem Pythagoras daripada lebar dan tinggi skrin.",
      "Fact: TV screen size is measured using...",
      "...the diagonal, which is calculated using Pythagoras' Theorem from the screen width and height.",
    ),
  ],
  practice: [
    mathCard(
      "a = 6, b = 8. Cari hipotenus c.",
      "c² = 36+64 = 100. c = 10.",
      "a = 6, b = 8. Find hypotenuse c.",
      "c² = 36+64 = 100. c = 10.",
    ),
    mathCard(
      "c = 10, a = 6. Cari b.",
      "b² = 100−36 = 64. b = 8.",
      "c = 10, a = 6. Find b.",
      "b² = 100−36 = 64. b = 8.",
    ),
    mathCard(
      "Adakah 5, 12, 13 merupakan triple Pythagoras?",
      "5²+12² = 25+144 = 169 = 13². Ya!",
      "Is 5, 12, 13 a Pythagorean triple?",
      "5²+12² = 25+144 = 169 = 13². Yes!",
    ),
    mathCard(
      "Segi tiga 6, 8, 11 — jenis apakah?",
      "c=11: c²=121. a²+b²=36+64=100. 121 > 100 → Bersudut CAKAH.",
      "Triangle 6, 8, 11 — what type?",
      "c=11: c²=121. a²+b²=36+64=100. 121 > 100 → OBTUSE-angled.",
    ),
    mathCard(
      "Segi tiga 5, 6, 7 — jenis apakah?",
      "c=7: c²=49. a²+b²=25+36=61. 49 < 61 → Bersudut TIRUS.",
      "Triangle 5, 6, 7 — what type?",
      "c=7: c²=49. a²+b²=25+36=61. 49 < 61 → ACUTE-angled.",
    ),
    mathCard(
      "Segi empat tepat 9cm × 12cm. Cari pepenjuru.",
      "d² = 81+144 = 225. d = 15cm. (Triple 9-12-15, gandaan 3-4-5!)",
      "Rectangle 9cm × 12cm. Find the diagonal.",
      "d² = 81+144 = 225. d = 15cm. (9-12-15 triple, multiple of 3-4-5!)",
    ),
    mathCard(
      "Tangga 5m. Kaki tangga 3m dari dinding. Berapa ketinggian pada dinding?",
      "h² = 25−9 = 16. h = 4m.",
      "5m ladder. Base 3m from wall. Find height on wall.",
      "h² = 25−9 = 16. h = 4m.",
    ),
    mathCard(
      "Adakah 6, 7, 10 bersudut tegak?",
      "c=10: c²=100. a²+b²=36+49=85. 100 ≠ 85 → BUKAN bersudut tegak. Kerana 100>85 → bersudut CAKAH.",
      "Is 6, 7, 10 right-angled?",
      "c=10: c²=100. a²+b²=36+49=85. 100 ≠ 85 → NOT right-angled. Since 100>85 → OBTUSE-angled.",
    ),
    mathCard(
      "a = 9, b = 40. Cari c.",
      "c² = 81+1600 = 1681. c = 41. (Triple 9-40-41!)",
      "a = 9, b = 40. Find c.",
      "c² = 81+1600 = 1681. c = 41. (9-40-41 triple!)",
    ),
    mathCard(
      "c = 25, b = 24. Cari a.",
      "a² = 625−576 = 49. a = 7. (Triple 7-24-25!)",
      "c = 25, b = 24. Find a.",
      "a² = 625−576 = 49. a = 7. (7-24-25 triple!)",
    ),
    mathCard(
      "Tiang 15m. Wayar dari puncak ke tanah, 9m dari kaki tiang. Berapa panjang wayar?",
      "Wayar² = 15²+9² = 225+81 = 306. Wayar = √306 ≈ 17.5m.",
      "15m pole. Wire from top to ground, 9m from base. Find wire length.",
      "Wire² = 15²+9² = 225+81 = 306. Wire = √306 ≈ 17.5m.",
    ),
    mathCard(
      "Segi tiga 10, 10, 14. Jenis apakah?",
      "c=14: c²=196. a²+b²=100+100=200. 196 < 200 → Bersudut TIRUS.",
      "Triangle 10, 10, 14. What type?",
      "c=14: c²=196. a²+b²=100+100=200. 196 < 200 → ACUTE-angled.",
    ),
  ],
};

const MATH_F1_C12_FLASHCARD_PAIRS = {
  concepts: [
    mathCard(
      "Apakah pengendalian data?",
      "Pengendalian data ialah proses mengumpul, mengorganisasikan, mewakili dan mentafsir data untuk menjawab soalan atau membuat keputusan.",
      "What is data handling?",
      "Data handling is the process of collecting, organising, representing and interpreting data to answer questions or make decisions.",
    ),
    mathCard(
      "Apakah 4 peringkat pengendalian data?",
      "① Mengumpul data → ② Mengorganisasikan data → ③ Mewakili data → ④ Mentafsir data.",
      "What are the 4 stages of data handling?",
      "① Collecting data → ② Organising data → ③ Representing data → ④ Interpreting data.",
    ),
    mathCard(
      "Apakah soalan statistik?",
      "Soalan yang memerlukan pengumpulan data dan melibatkan variasi — berbeza daripada soalan dengan satu jawapan tetap.",
      "What is a statistical question?",
      "A question that requires data collection and involves variability — different from a question with one fixed answer.",
    ),
    mathCard(
      "Apakah data kategori?",
      "Data yang menerangkan kualiti atau jenis/kategori — bukan nombor. Contoh: kumpulan darah, warna, hobi.",
      "What is categorical data?",
      "Data that describes qualities or types/categories — not numbers. Examples: blood group, colour, hobby.",
    ),
    mathCard(
      "Apakah data berangka?",
      "Data yang melibatkan nombor dan boleh diukur atau dikira. Terbahagi kepada data diskret dan data berterusan.",
      "What is numerical data?",
      "Data that involves numbers and can be measured or counted. Divided into discrete data and continuous data.",
    ),
    mathCard(
      "Apakah data diskret?",
      "Data berangka yang hanya boleh mengambil nilai nombor bulat tertentu. Diperoleh melalui pengiraan. Contoh: bilangan anak, bilangan buku.",
      "What is discrete data?",
      "Numerical data that can only take specific whole number values. Obtained by counting. Examples: number of children, number of books.",
    ),
    mathCard(
      "Apakah data berterusan?",
      "Data berangka yang boleh mengambil mana-mana nilai dalam julat termasuk perpuluhan. Diperoleh melalui pengukuran. Contoh: tinggi, jisim, suhu.",
      "What is continuous data?",
      "Numerical data that can take any value in a range including decimals. Obtained by measurement. Examples: height, mass, temperature.",
    ),
    mathCard(
      "Apakah perbezaan antara data diskret dan berterusan?",
      "Diskret: nilai nombor bulat sahaja (dikira). Berterusan: boleh ada perpuluhan (diukur). Soalan panduan: bolehkah nilai ini ada perpuluhan?",
      "What is the difference between discrete and continuous data?",
      "Discrete: whole number values only (counted). Continuous: can have decimals (measured). Guiding question: can this value have a decimal?",
    ),
    mathCard(
      "Apakah serakan data?",
      "Ukuran sejauh mana nilai-nilai dalam set data tersebar atau berbeza antara satu sama lain.",
      "What is data dispersion?",
      "A measure of how spread out or varied the values in a data set are from one another.",
    ),
    mathCard(
      "Apakah pencilan (outlier)?",
      "Nilai data yang jauh berbeza daripada nilai-nilai lain dalam set data. Dalam plot titik, ia kelihatan tersasing.",
      "What is an outlier?",
      "A data value that differs greatly from the other values in a data set. In a dot plot, it appears isolated from the cluster.",
    ),
    mathCard(
      "Apakah inferens?",
      "Kesimpulan logik yang dibuat berdasarkan data yang ada — melangkaui sekadar membaca nilai untuk membuat pernyataan yang lebih umum.",
      "What is an inference?",
      "A logical conclusion drawn from available data — going beyond simply reading values to make more general statements.",
    ),
    mathCard(
      "Apakah ramalan dalam statistik?",
      "Jangkaan tentang nilai atau kejadian masa hadapan berdasarkan corak atau trend dalam data sedia ada.",
      "What is a prediction in statistics?",
      "An expectation about a future value or event based on patterns or trends in existing data.",
    ),
    mathCard(
      "Apakah perwakilan data beretika?",
      "Memaparkan data secara jujur dan tepat tanpa mengelirukan pembaca — menggunakan skala konsisten dan paksi bermula dari sifar.",
      "What is ethical data representation?",
      "Presenting data honestly and accurately without misleading readers — using consistent scales and axes starting from zero.",
    ),
    mathCard(
      "Apakah yang dimaksudkan dengan trend dalam graf?",
      "Arah umum perubahan data — meningkat (trend positif), menurun (trend negatif), atau stabil (mendatar) dari kiri ke kanan.",
      "What does trend mean in a graph?",
      "The general direction of data change — increasing (positive trend), decreasing (negative trend), or stable (horizontal) from left to right.",
    ),
    mathCard(
      "Apakah mod kelas dalam histogram?",
      "Kelas yang mempunyai kekerapan tertinggi dalam histogram — palang yang paling tinggi.",
      "What is the modal class in a histogram?",
      "The class with the highest frequency in a histogram — the tallest bar.",
    ),
  ],
  operations: [
    mathCard(
      "Apakah carta palang dan bilakah digunakannya?",
      "Carta menggunakan palang untuk membandingkan data kategori atau diskret. Ada ruang antara palang. Paksi-x: kategori, Paksi-y: kekerapan.",
      "What is a bar chart and when is it used?",
      "A chart using bars to compare categorical or discrete data. Has gaps between bars. x-axis: categories, y-axis: frequency.",
    ),
    mathCard(
      "Apakah carta pai dan bilakah digunakannya?",
      "Bulatan dibahagi kepada sektor untuk menunjukkan perkadaran setiap kategori daripada keseluruhan. Terbaik untuk 2–6 kategori.",
      "What is a pie chart and when is it used?",
      "A circle divided into sectors to show the proportion of each category from the whole. Best for 2–6 categories.",
    ),
    mathCard(
      "Apakah formula sudut sektor carta pai?",
      "Sudut sektor = (Kekerapan ÷ Jumlah Kekerapan) × 360°. Contoh: 12 daripada 40 → (12÷40) × 360° = 108°.",
      "What is the pie chart sector angle formula?",
      "Sector angle = (Frequency ÷ Total Frequency) × 360°. Example: 12 out of 40 → (12÷40) × 360° = 108°.",
    ),
    mathCard(
      "Apakah graf garis dan bilakah digunakannya?",
      "Graf menggunakan titik yang disambungkan dengan garis untuk menunjukkan perubahan data merentasi masa. Paksi-x: masa/urutan.",
      "What is a line graph and when is it used?",
      "A graph using connected points to show data changes over time. x-axis: time/sequence.",
    ),
    mathCard(
      "Apakah plot titik (dot plot)?",
      "Carta yang menggunakan titik di atas garis nombor untuk menunjukkan taburan data kecil. Setiap titik = satu nilai data.",
      "What is a dot plot?",
      "A chart using dots above a number line to show the distribution of small data sets. Each dot = one data value.",
    ),
    mathCard(
      "Apakah plot batang-dan-daun?",
      "Perwakilan data yang memisahkan nilai kepada batang (digit puluhan) dan daun (digit sa). Mengekalkan nilai asal data.",
      "What is a stem-and-leaf plot?",
      "A data representation that separates values into stem (tens digit) and leaf (units digit). Retains original data values.",
    ),
    mathCard(
      "Apakah histogram?",
      "Graf palang untuk data berterusan atau berkumpulan. TIADA ruang antara palang. Paksi-x: julat nilai berterusan.",
      "What is a histogram?",
      "A bar graph for continuous or grouped data. NO gaps between bars. x-axis: continuous value ranges.",
    ),
    mathCard(
      "Apakah poligon kekerapan?",
      "Graf garis yang dibina dengan menghubungkan titik tengah bahagian atas setiap palang histogram.",
      "What is a frequency polygon?",
      "A line graph constructed by connecting the midpoints of the tops of each histogram bar.",
    ),
    mathCard(
      "Bagaimanakah cara mengira titik tengah kelas?",
      "Titik tengah = (Had Bawah + Had Atas) ÷ 2. Contoh: Kelas 41–50 → titik tengah = (41+50) ÷ 2 = 45.5.",
      "How is a class midpoint calculated?",
      "Midpoint = (Lower Boundary + Upper Boundary) ÷ 2. Example: Class 41–50 → midpoint = (41+50) ÷ 2 = 45.5.",
    ),
    mathCard(
      "Apakah jadual kekerapan?",
      "Jadual yang mengorganisasikan data dengan menunjukkan setiap nilai/kelas bersama kekerapannya. Menggunakan lajur nilai, tanda turus dan kekerapan.",
      "What is a frequency table?",
      "A table that organises data by showing each value/class with its frequency. Uses columns for value, tally marks and frequency.",
    ),
    mathCard(
      "Bagaimanakah cara membina jadual kekerapan berkumpulan?",
      "① Tentukan julat data. ② Pilih lebar kelas yang sesuai. ③ Senaraikan kelas. ④ Kira kekerapan setiap kelas menggunakan tanda turus.",
      "How is a grouped frequency table constructed?",
      "① Determine data range. ② Choose appropriate class width. ③ List classes. ④ Count frequency of each class using tally marks.",
    ),
    mathCard(
      "Bagaimanakah cara membaca carta palang?",
      "① Lihat tajuk. ② Baca paksi-y untuk nilai kekerapan. ③ Baca paksi-x untuk kategori. ④ Bandingkan ketinggian palang.",
      "How is a bar chart read?",
      "① Look at the title. ② Read the y-axis for frequency values. ③ Read the x-axis for categories. ④ Compare bar heights.",
    ),
    mathCard(
      "Bagaimanakah cara membina plot batang-dan-daun?",
      "① Kenal pasti batang (puluhan). ② Tulis setiap batang. ③ Susun daun (digit sa) bagi setiap batang. ④ Tulis kunci. Contoh: 2|3 = 23.",
      "How is a stem-and-leaf plot constructed?",
      "① Identify stems (tens). ② Write each stem. ③ Arrange leaves (units) for each stem. ④ Write the key. Example: 2|3 = 23.",
    ),
    mathCard(
      "Apakah perbezaan antara carta palang dan histogram?",
      "Carta palang: ada ruang antara palang, untuk data kategori/diskret. Histogram: TIADA ruang, untuk data berkumpulan/berterusan.",
      "What is the difference between a bar chart and a histogram?",
      "Bar chart: has gaps between bars, for categorical/discrete data. Histogram: NO gaps, for grouped/continuous data.",
    ),
    mathCard(
      "Bagaimanakah cara mengira peratusan dalam carta pai?",
      "Peratusan = (Kekerapan ÷ Jumlah) × 100%. Contoh: 12 daripada 40 → (12÷40) × 100% = 30%.",
      "How is percentage calculated in a pie chart?",
      "Percentage = (Frequency ÷ Total) × 100%. Example: 12 out of 40 → (12÷40) × 100% = 30%.",
    ),
    mathCard(
      "Apakah 4 kaedah pengumpulan data?",
      "① Temu bual — soal jawab langsung. ② Pemerhatian — perhatikan dan catat. ③ Eksperimen — uji hipotesis. ④ Tinjauan — soal selidik kepada sampel.",
      "What are the 4 data collection methods?",
      "① Interviews — direct questioning. ② Observation — watch and record. ③ Experiments — test a hypothesis. ④ Surveys — questionnaires to a sample.",
    ),
    mathCard(
      "Bilakah tinjauan lebih baik daripada temu bual?",
      "Tinjauan lebih sesuai untuk sampel besar, lebih menjimatkan masa dan kos, boleh diedarkan secara bertulis atau dalam talian.",
      "When is a survey better than an interview?",
      "A survey is more suitable for large samples, more time- and cost-efficient, can be distributed in writing or online.",
    ),
  ],
  facts: [
    mathCard(
      "Histogram TIADA ruang antara palang — mengapa?",
      "Kerana data adalah berterusan/berkumpulan — nilai-nilai bersambungan tanpa jeda. Berbeza dengan carta palang (data berasingan/diskret).",
      "Histograms have NO gaps between bars — why?",
      "Because the data is continuous/grouped — values are connected without a break. Different from a bar chart (separate/discrete data).",
    ),
    mathCard(
      "Fakta: set data dengan julat lebih kecil adalah lebih...",
      "...konsisten dan lebih boleh dipercayai. Julat kecil bermaksud nilai-nilai rapat antara satu sama lain.",
      "Fact: a data set with a smaller range is more...",
      "...consistent and more reliable. A small range means values are close to each other.",
    ),
    mathCard(
      "Fakta: plot batang-dan-daun mengekalkan nilai...",
      "...asal data. Berbeza dengan histogram yang mengumpulkan data dalam kelas, plot batang-dan-daun mengekalkan setiap nilai tepat.",
      "Fact: a stem-and-leaf plot retains the...",
      "...original data values. Unlike histograms that group data into classes, stem-and-leaf plots retain each exact value.",
    ),
    mathCard(
      "Fakta: poligon kekerapan berguna untuk...",
      "...membandingkan dua atau lebih set data berkumpulan pada graf yang sama, kerana berbilang polygon boleh diplot serentak.",
      "Fact: a frequency polygon is useful for...",
      "...comparing two or more grouped data sets on the same graph, as multiple polygons can be plotted simultaneously.",
    ),
    mathCard(
      "Fakta: carta pai paling sesuai untuk...",
      "...data yang terdiri daripada 2 hingga 6 kategori, apabila kita ingin menunjukkan perkadaran setiap bahagian daripada keseluruhan.",
      "Fact: a pie chart is best suited for...",
      "...data consisting of 2 to 6 categories, when we want to show the proportion of each part from the whole.",
    ),
    mathCard(
      "Fakta: perwakilan data beretika bermaksud...",
      "...paksi bermula dari sifar, skala konsisten, semua paksi berlabel, nilai tepat, dan tidak memilih-milih data untuk menyokong hujah.",
      "Fact: ethical data representation means...",
      "...axes starting from zero, consistent scales, all axes labelled, accurate values, and not cherry-picking data to support an argument.",
    ),
    mathCard(
      "Fakta: julat dipengaruhi oleh...",
      "...pencilan (outlier) — nilai yang sangat luar biasa boleh membesarkan julat secara ketara, walaupun nilai-nilai lain rapat.",
      "Fact: range is affected by...",
      "...outliers — an unusually extreme value can significantly increase the range, even if other values are close together.",
    ),
    mathCard(
      "Fakta: data kategori TIDAK boleh...",
      "...ditambah, ditolak atau didarab secara bermakna. Kita hanya boleh mengira bilangan ahli dalam setiap kategori.",
      "Fact: categorical data CANNOT be...",
      "...added, subtracted or multiplied meaningfully. We can only count the number of members in each category.",
    ),
    mathCard(
      "Julat = ?",
      "Julat = Nilai Tertinggi − Nilai Terendah. Ia mengukur jumlah penyebaran data dari nilai paling kecil ke paling besar.",
      "Range = ?",
      "Range = Highest Value − Lowest Value. It measures the total spread of data from the smallest to the largest value.",
    ),
    mathCard(
      "Sudut sektor carta pai = ?",
      "(Kekerapan ÷ Jumlah Kekerapan) × 360°. Jumlah semua sudut mesti bersamaan 360°.",
      "Pie chart sector angle = ?",
      "(Frequency ÷ Total Frequency) × 360°. The sum of all angles must equal 360°.",
    ),
    mathCard(
      "Titik tengah kelas = ?",
      "(Had Bawah + Had Atas) ÷ 2. Digunakan untuk membina poligon kekerapan dan analisis data berkumpulan.",
      "Class midpoint = ?",
      "(Lower Boundary + Upper Boundary) ÷ 2. Used to construct frequency polygons and analyse grouped data.",
    ),
    mathCard(
      "Graf garis menunjukkan trend — apakah 3 arah yang mungkin?",
      "① Trend menaik (garis condong ke atas kanan). ② Trend menurun (garis condong ke bawah kanan). ③ Stabil (garis mendatar).",
      "Line graphs show trends — what are the 3 possible directions?",
      "① Upward trend (line slopes up to right). ② Downward trend (line slopes down to right). ③ Stable (horizontal line).",
    ),
    mathCard(
      "Apakah yang diperhatikan semasa mentafsir histogram?",
      "Bentuk taburan: loceng (normal), pencong kanan, pencong kiri, atau seragam. Kelas mod = palang tertinggi.",
      "What is observed when interpreting a histogram?",
      "Distribution shape: bell-shaped (normal), right-skewed, left-skewed, or uniform. Modal class = tallest bar.",
    ),
    mathCard(
      "Fakta: satu kelebihan pemerhatian berbanding temu bual ialah...",
      "...data lebih objektif kerana pengkaji tidak mengganggu tingkah laku subjek. Responden tidak boleh memberikan jawapan yang tidak jujur.",
      "Fact: one advantage of observation over interviews is...",
      "...data is more objective because the researcher does not disturb the subjects' behaviour. Respondents cannot give dishonest answers.",
    ),
  ],
  practice: [
    mathCard(
      "Data: 3, 7, 2, 9, 4, 8, 1. Cari julat.",
      "Tertinggi = 9, Terendah = 1. Julat = 9 − 1 = 8.",
      "Data: 3, 7, 2, 9, 4, 8, 1. Find the range.",
      "Highest = 9, Lowest = 1. Range = 9 − 1 = 8.",
    ),
    mathCard(
      "30 murid memilih warna kegemaran. Biru dipilih oleh 12 murid. Apakah sudut sektor biru dalam carta pai?",
      "(12÷30) × 360° = 0.4 × 360° = 144°.",
      "30 students choose their favourite colour. Blue is chosen by 12. What is the blue sector angle in the pie chart?",
      "(12÷30) × 360° = 0.4 × 360° = 144°.",
    ),
    mathCard(
      "Kelas 61–70 dalam jadual kekerapan. Apakah titik tengahnya?",
      "(61 + 70) ÷ 2 = 131 ÷ 2 = 65.5.",
      "Class 61–70 in a frequency table. What is its midpoint?",
      "(61 + 70) ÷ 2 = 131 ÷ 2 = 65.5.",
    ),
    mathCard(
      "Julat Kumpulan A = 15, Julat Kumpulan B = 28. Kumpulan manakah lebih konsisten?",
      "Kumpulan A lebih konsisten kerana julatnya lebih kecil (15 < 28). Julat lebih kecil = lebih konsisten.",
      "Range of Group A = 15, Range of Group B = 28. Which group is more consistent?",
      "Group A is more consistent because its range is smaller (15 < 28). Smaller range = more consistent.",
    ),
    mathCard(
      "50 murid dipilih dalam tinjauan. Matematik: 20, Sains: 15, BM: 10, Lain: 5. Apakah peratusan Matematik?",
      "(20÷50) × 100% = 40%.",
      "50 students are surveyed. Mathematics: 20, Science: 15, Malay: 10, Others: 5. What is the percentage for Mathematics?",
      "(20÷50) × 100% = 40%.",
    ),
    mathCard(
      "Plot batang-dan-daun: Batang 4, Daun 2, 5, 8. Apakah nilai-nilai ini?",
      "Batang 4 + Daun 2 = 42. Batang 4 + Daun 5 = 45. Batang 4 + Daun 8 = 48.",
      "Stem-and-leaf: Stem 4, Leaves 2, 5, 8. What are these values?",
      "Stem 4 + Leaf 2 = 42. Stem 4 + Leaf 5 = 45. Stem 4 + Leaf 8 = 48.",
    ),
    mathCard(
      "Markah 8 murid: 55, 60, 72, 48, 90, 65, 78, 83. Cari julat.",
      "Tertinggi = 90, Terendah = 48. Julat = 90 − 48 = 42 markah.",
      "Marks of 8 students: 55, 60, 72, 48, 90, 65, 78, 83. Find the range.",
      "Highest = 90, Lowest = 48. Range = 90 − 48 = 42 marks.",
    ),
    mathCard(
      "Apakah perwakilan yang paling sesuai untuk menunjukkan trend jualan bulanan selama setahun?",
      "Graf garis — kerana ia menunjukkan perubahan/trend data merentasi masa dengan jelas.",
      "What is the most suitable representation to show monthly sales trends over a year?",
      "Line graph — because it clearly shows data changes/trends over time.",
    ),
    mathCard(
      "Kekerapan kelas 51–60 = 8, jumlah = 40. Apakah peratusannya?",
      "(8÷40) × 100% = 20%.",
      "Frequency of class 51–60 = 8, total = 40. What is the percentage?",
      "(8÷40) × 100% = 20%.",
    ),
    mathCard(
      "Adakah 'bilangan buku dalam beg' data diskret atau berterusan?",
      "Diskret — kerana ia adalah bilangan (boleh dikira, nilai nombor bulat sahaja: 0, 1, 2, 3, ...). Tidak boleh ada 2.5 buku.",
      "Is 'number of books in a bag' discrete or continuous data?",
      "Discrete — because it is a count (whole numbers only: 0, 1, 2, 3, ...). Cannot have 2.5 books.",
    ),
    mathCard(
      "Adakah 'masa yang diambil untuk berlari 100m' data diskret atau berterusan?",
      "Berterusan — kerana ia adalah masa (ukuran). Boleh ada nilai perpuluhan seperti 12.47 saat.",
      "Is 'time taken to run 100m' discrete or continuous data?",
      "Continuous — because it is time (a measurement). Can have decimal values like 12.47 seconds.",
    ),
    mathCard(
      "Carta pai menunjukkan 4 kategori dengan sudut 90°, 120°, 80°, x°. Cari x.",
      "90 + 120 + 80 + x = 360. 290 + x = 360. x = 70°.",
      "A pie chart shows 4 categories with angles 90°, 120°, 80°, x°. Find x.",
      "90 + 120 + 80 + x = 360. 290 + x = 360. x = 70°.",
    ),
  ],
};

const MATH_FLASHCARD_BANKS: Partial<
  Record<
    string,
    Record<MathFlashcardCategoryId, Array<{ bm: [string, string]; dlp: [string, string] }>>
  >
> = {
  "Chapter 1": MATH_F1_C1_FLASHCARD_PAIRS,
  "Chapter 2": MATH_F1_C2_FLASHCARD_PAIRS,
  "Chapter 3": MATH_F1_C3_FLASHCARD_PAIRS,
  "Chapter 4": MATH_F1_C4_FLASHCARD_PAIRS,
  "Chapter 5": MATH_F1_C5_FLASHCARD_PAIRS,
  "Chapter 6": MATH_F1_C6_FLASHCARD_PAIRS,
  "Chapter 7": MATH_F1_C7_FLASHCARD_PAIRS,
  "Chapter 8": MATH_F1_C8_FLASHCARD_PAIRS,
  "Chapter 9": MATH_F1_C9_FLASHCARD_PAIRS,
  "Chapter 10": MATH_F1_C10_FLASHCARD_PAIRS,
  "Chapter 11": MATH_F1_C11_FLASHCARD_PAIRS,
  "Chapter 12": MATH_F1_C12_FLASHCARD_PAIRS,
  "Chapter 13": MATH_F1_C13_FLASHCARD_PAIRS,
};

const MATH_FLASHCARD_CHAPTER_TITLES: Record<
  string,
  { bm: string; dlp: string; headerBm: string; headerDlp: string }
> = {
  "Chapter 1": {
    bm: "🧠 Flashcards Bab 1: Nombor Nisbah",
    dlp: "🧠 Chapter 1 Flashcards: Rational Numbers",
    headerBm: "Bab 1: Nombor Nisbah",
    headerDlp: "Chapter 1: Rational Numbers",
  },
  "Chapter 2": {
    bm: "🧠 Flashcards Bab 2: Faktor dan Gandaan",
    dlp: "🧠 Chapter 2 Flashcards: Factors and Multiples",
    headerBm: "Bab 2: Faktor dan Gandaan",
    headerDlp: "Chapter 2: Factors and Multiples",
  },
  "Chapter 3": {
    bm: "🧠 Flashcards Bab 3: Kuasa Dua, Punca Kuasa Dua, Kuasa Tiga dan Punca Kuasa Tiga",
    dlp: "🧠 Chapter 3 Flashcards: Squares, Square Roots, Cubes and Cube Roots",
    headerBm: "Bab 3: Kuasa Dua, Punca Kuasa Dua, Kuasa Tiga dan Punca Kuasa Tiga",
    headerDlp: "Chapter 3: Squares, Square Roots, Cubes and Cube Roots",
  },
  "Chapter 4": {
    bm: "🧠 Flashcards Bab 4: Nisbah, Kadar dan Kadaran",
    dlp: "🧠 Chapter 4 Flashcards: Ratios, Rates and Proportions",
    headerBm: "Bab 4: Nisbah, Kadar dan Kadaran",
    headerDlp: "Chapter 4: Ratios, Rates and Proportions",
  },
  "Chapter 5": {
    bm: "🧠 Flashcards Bab 5: Ungkapan Algebra",
    dlp: "🧠 Chapter 5 Flashcards: Algebraic Expressions",
    headerBm: "Bab 5: Ungkapan Algebra",
    headerDlp: "Chapter 5: Algebraic Expressions",
  },
  "Chapter 6": {
    bm: "🧠 Flashcards Bab 6: Persamaan Linear",
    dlp: "🧠 Chapter 6 Flashcards: Linear Equations",
    headerBm: "Bab 6: Persamaan Linear",
    headerDlp: "Chapter 6: Linear Equations",
  },
  "Chapter 7": {
    bm: "🧠 Flashcards Bab 7: Ketaksamaan Linear",
    dlp: "🧠 Chapter 7 Flashcards: Linear Inequalities",
    headerBm: "Bab 7: Ketaksamaan Linear",
    headerDlp: "Chapter 7: Linear Inequalities",
  },
  "Chapter 8": {
    bm: "🧠 Flashcards Bab 8: Garis dan Sudut",
    dlp: "🧠 Chapter 8 Flashcards: Lines and Angles",
    headerBm: "Bab 8: Garis dan Sudut",
    headerDlp: "Chapter 8: Lines and Angles",
  },
  "Chapter 9": {
    bm: "🧠 Flashcards Bab 9: Poligon Asas",
    dlp: "🧠 Chapter 9 Flashcards: Basic Polygons",
    headerBm: "Bab 9: Poligon Asas",
    headerDlp: "Chapter 9: Basic Polygons",
  },
  "Chapter 10": {
    bm: "🧠 Flashcards Bab 10: Perimeter dan Luas",
    dlp: "🧠 Chapter 10 Flashcards: Perimeter and Area",
    headerBm: "Bab 10: Perimeter dan Luas",
    headerDlp: "Chapter 10: Perimeter and Area",
  },
  "Chapter 11": {
    bm: "🧠 Flashcards Bab 11: Pengenalan Set",
    dlp: "🧠 Chapter 11 Flashcards: Introduction to Sets",
    headerBm: "Bab 11: Pengenalan Set",
    headerDlp: "Chapter 11: Introduction to Sets",
  },
  "Chapter 12": {
    bm: "🧠 Flashcards Bab 12: Pengendalian Data",
    dlp: "🧠 Chapter 12 Flashcards: Data Handling",
    headerBm: "Bab 12: Pengendalian Data",
    headerDlp: "Chapter 12: Data Handling",
  },
  "Chapter 13": {
    bm: "🧠 Flashcards Bab 13: Teorem Pythagoras",
    dlp: "🧠 Chapter 13 Flashcards: Pythagoras' Theorem",
    headerBm: "Bab 13: Teorem Pythagoras",
    headerDlp: "Chapter 13: Pythagoras' Theorem",
  },
};

function getMathFlashcardChapterTitle(chapterKey: string, lang: MathFlashcardLang) {
  const title = MATH_FLASHCARD_CHAPTER_TITLES[chapterKey];
  if (title) return title[lang];
  return lang === "dlp"
    ? `🧠 ${chapterKey} Flashcards`
    : `🧠 Flashcards Bab ${chapterKey.replace("Chapter ", "")}`;
}

function getMathFlashcardHeaderTitle(chapterKey: string) {
  const title = MATH_FLASHCARD_CHAPTER_TITLES[chapterKey];
  return title?.headerDlp ?? chapterKey;
}

function getMathFlashcards(
  chapter: string,
  lang: MathFlashcardLang,
  category: MathFlashcardCategoryId,
) {
  const bank = MATH_FLASHCARD_BANKS[chapter];
  if (!bank) return [];
  const cards = bank[category] ?? [];
  return cards.map((card, index) => {
    const [front, back] = card[lang];
    return {
      id: `math-f1-c${chapter.replace("Chapter ", "")}-${lang}-${category}-${index + 1}`,
      subjectId: "math",
      form: "Form 1" as const,
      chapter,
      lang,
      front,
      back,
    };
  });
}

function readStudySearch() {
  if (typeof window === "undefined")
    return { subject: null, form: "Form 1", chapter: null, hasForm: false };
  const params = new URLSearchParams(window.location.search);
  return {
    subject: normalizeSubjectParam(params.get("subject")),
    form: normalizeFormParam(params.get("form")),
    chapter: params.get("chapter"),
    hasForm: params.has("form"),
  };
}

function FireBadge({ streak }: { streak: number }) {
  if (streak < 3) return null;
  const size = streak >= 10 ? "text-3xl" : streak >= 5 ? "text-2xl" : "text-xl";
  const label =
    streak >= 10 ? "MEGA FIRE 🔥🔥🔥" : streak >= 5 ? "ON FIRE! 🔥🔥" : "Heating up! 🔥";
  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-40 pointer-events-none animate-combo-pop">
      <div
        className={`glass-strong rounded-full px-5 py-2 flex items-center gap-2 font-display font-bold ${size}`}
      >
        <span className="animate-fire-flicker inline-block">🔥</span>
        <span className="gradient-text">{label}</span>
      </div>
    </div>
  );
}

function MiniConfetti({ color }: { color: string }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        dx: (Math.random() - 0.5) * 320,
        dy: -120 - Math.random() * 200,
        delay: Math.random() * 0.1,
        dur: 0.8 + Math.random() * 0.6,
      })),
    [],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-visible z-30">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full"
          style={{
            background: color,
            // @ts-expect-error css var
            "--cx": `${p.dx}px`,
            animation: `confetti-fall ${p.dur}s ${p.delay}s cubic-bezier(.2,.6,.4,1) forwards`,
            transform: `translate(${p.dx}px, ${p.dy}px)`,
          }}
        />
      ))}
    </div>
  );
}

function MathFlashcardLanguagePicker({
  chapterKey,
  onBack,
  onSelect,
}: {
  chapterKey: string;
  onBack: () => void;
  onSelect: (lang: MathFlashcardLang) => void;
}) {
  const chapterNumber = chapterKey.replace("Chapter ", "");
  return (
    <div className="animate-fade-up">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm hover:bg-white/10 transition-all hover:-translate-x-0.5"
        >
          <ChevronLeft className="w-4 h-4" /> Back to chapters
        </button>
        <span className="text-sm font-semibold text-muted-foreground">
          📐 Mathematics • {cleanLearningLabel(getMathFlashcardHeaderTitle(chapterKey))}
        </span>
      </div>

      <div className="glass-strong rounded-3xl p-6 sm:p-8">
        <div className="text-center mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-accent">
            Flashcard Language
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold">
            🌐 Pilih Bahasa / <span className="gradient-text">Choose Language</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Choose a language before opening this chapter&apos;s revision categories.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <button
            onClick={() => onSelect("bm")}
            aria-label="Open Bahasa Melayu flashcards"
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_32px_oklch(0.63_0.22_295_/_0.35)]"
          >
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 opacity-20 blur-3xl transition-opacity group-hover:opacity-40" />
            <div className="relative mb-4 text-5xl">🇲🇾</div>
            <h3 className="relative font-display text-2xl font-bold">Bahasa Melayu</h3>
            <p className="relative mt-2 text-sm text-muted-foreground">
              Kad ulang kaji untuk bab ini dalam Bahasa Melayu.
            </p>
          </button>

          <button
            onClick={() => onSelect("dlp")}
            aria-label="Open DLP English flashcards"
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_0_32px_oklch(0.7_0.18_180_/_0.35)]"
          >
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 opacity-20 blur-3xl transition-opacity group-hover:opacity-40" />
            <div className="relative mb-4 text-5xl">🇬🇧</div>
            <h3 className="relative font-display text-2xl font-bold">DLP (English)</h3>
            <p className="relative mt-2 text-sm text-muted-foreground">
              Revision cards for this chapter translated into English.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

function MathFlashcardCategoryPicker({
  chapterKey,
  lang,
  onBack,
  onSelect,
}: {
  chapterKey: string;
  lang: MathFlashcardLang;
  onBack: () => void;
  onSelect: (category: MathFlashcardCategoryId) => void;
}) {
  const isDlp = lang === "dlp";
  const title = getMathFlashcardChapterTitle(chapterKey, lang);

  return (
    <div className="animate-fade-up">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm hover:bg-white/10 transition-all hover:-translate-x-0.5"
        >
          <ChevronLeft className="w-4 h-4" /> {isDlp ? "Back to language" : "Kembali ke bahasa"}
        </button>
        <span className="text-sm font-semibold text-muted-foreground">
          {isDlp ? "🇬🇧 DLP (English)" : "🇲🇾 Bahasa Melayu"}
        </span>
      </div>

      <div className="glass-strong rounded-3xl p-6 sm:p-8">
        <div className="text-center mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-accent">
            {isDlp ? "Revision Categories" : "Kategori Ulang Kaji"}
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold">
            {cleanLearningTitle(title)}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            {isDlp
              ? "Choose a category. Each card keeps the same Science-style flip and swipe experience."
              : "Pilih kategori. Setiap kad menggunakan pengalaman flip dan swipe yang sama seperti Science."}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {MATH_FLASHCARD_CATEGORIES.map((category, index) => {
            const copy = category[lang];
            return (
              <button
                key={category.id}
                onClick={() => onSelect(category.id)}
                aria-label={`Open ${cleanLearningLabel(copy.title)} flashcards`}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_32px_oklch(0.63_0.22_295_/_0.35)] animate-slide-up"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br from-primary to-accent opacity-20 blur-3xl transition-opacity group-hover:opacity-40" />
                <div className="relative mb-4 text-4xl">{category.icon}</div>
                <h3 className="relative font-display text-xl font-bold">
                  {category.icon} {cleanLearningTitle(copy.title)}
                </h3>
                <p className="relative mt-2 text-sm leading-6 text-muted-foreground">
                  {copy.purpose}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function EnglishFlashcardDeckPicker({
  form,
  onBack,
  onSelect,
}: {
  form: "Form 1" | "Form 2" | "Form 3";
  onBack: () => void;
  onSelect: (
    deckId: EnglishFlashcardDeckId | EnglishFlashcardDeckIdF2 | EnglishFlashcardDeckIdF3,
  ) => void;
}) {
  const isForm2 = form === "Form 2";
  const isForm3 = form === "Form 3";
  const decks = (
    isForm2
      ? ENGLISH_FLASHCARD_DECKS_F2
      : isForm3
        ? ENGLISH_FLASHCARD_DECKS_F3
        : ENGLISH_FLASHCARD_DECKS
  ).filter((deck) => {
    const cards = isForm2
      ? getEnglishFlashcardsForDeckF2(deck.id as EnglishFlashcardDeckIdF2)
      : isForm3
        ? getEnglishFlashcardsForDeckF3(deck.id as EnglishFlashcardDeckIdF3)
        : getEnglishFlashcardsForDeck(deck.id as EnglishFlashcardDeckId);
    return standardizeFlashcardDeck(cards).length === 60;
  });
  return (
    <div className="animate-fade-up">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm transition-all hover:-translate-x-0.5 hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" /> Back to subjects
        </button>
        <span className="text-sm font-semibold text-muted-foreground">
          {isForm3 ? "English Form 3" : isForm2 ? "English Form 2" : "English Form 1"}
        </span>
      </div>

      <div className="glass-strong rounded-3xl p-6 sm:p-8">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-accent">
            {isForm3 ? "English Form 3" : isForm2 ? "English Form 2" : "English Form 1"}
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            Open{" "}
            <span className="gradient-text">
              {isForm3 ? "Form 3 Flashcards" : isForm2 ? "Form 2 Flashcards" : "Paper 1 Flashcards"}
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
            {isForm3
              ? "Sharper UASA-level revision for Tingkatan 3 grammar, vocabulary, and exam techniques."
              : isForm2
                ? "Quick revision for Tingkatan 2 grammar, reading, and writing skills."
                : "Quick revision for high-frequency UASA Paper 1 skills."}
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {decks.map((deck, index) => (
            <button
              key={deck.id}
              onClick={() => onSelect(deck.id)}
              aria-label={`Open ${cleanLearningLabel(deck.title)}`}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_32px_oklch(0.63_0.22_295_/_0.35)] animate-slide-up"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <div
                className={`absolute -right-14 -top-14 h-40 w-40 rounded-full bg-gradient-to-br ${deck.tone} opacity-20 blur-3xl transition-opacity group-hover:opacity-40`}
              />
              <div
                className={`relative mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${deck.tone} text-4xl shadow-lg`}
              >
                {deck.badge}
              </div>
              <h3 className="relative font-display text-2xl font-bold">
                {cleanLearningTitle(deck.title)}
              </h3>
              <p className="relative mt-3 text-sm leading-7 text-slate-300">{deck.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function FlashcardSetPicker({
  title,
  setOptions = FLASHCARD_SET_OPTIONS,
  onBack,
  onSelect,
}: {
  title: string;
  setOptions?: Array<{ index: FlashcardSetIndex; title: string; range: string }>;
  onBack: () => void;
  onSelect: (setIndex: FlashcardSetIndex) => void;
}) {
  return (
    <div className="animate-fade-up">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm transition-all hover:-translate-x-0.5 hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <span className="text-sm font-semibold text-muted-foreground">
          {cleanLearningLabel(title)}
        </span>
      </div>

      <div className="glass-strong rounded-3xl p-6 sm:p-8">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-accent">
            Choose Flashcard Set
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            {cleanLearningTitle(title)}
          </h2>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {setOptions.map((set, index) => {
            const displayTitle =
              setOptions === FLASHCARD_SET_OPTIONS
                ? ["Foundation Review", "Practice Review", "Challenge Review"][index]
                : cleanLearningTitle(set.title);
            return (
              <button
                key={set.index}
                onClick={() => onSelect(set.index)}
                aria-label={`Open ${displayTitle}`}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_32px_oklch(0.63_0.22_295_/_0.35)] animate-slide-up"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-gradient-to-br from-primary to-accent opacity-20 blur-3xl transition-opacity group-hover:opacity-40" />
                <div className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-xl font-black shadow-lg">
                  {["F", "P", "C"][index]}
                </div>
                <h3 className="relative font-display text-2xl font-bold">{displayTitle}</h3>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function FlashcardsPage() {
  const navigate = Route.useNavigate();
  const routeSearch = Route.useSearch() as {
    subject?: string;
    form?: string | number;
    chapter?: string;
    set?: string | number;
  };
  const { progress, toggleFavorite, markChapter, addXp, rateCard, setLastVisited } = useProgress();
  const initialSearch = useMemo(readStudySearch, []);
  const [subject, setSubject] = useState<string | null>(initialSearch.subject);
  const [chapter, setChapter] = useState<string | null>(initialSearch.chapter);
  const [form, setForm] = useState<FormFilter>(initialSearch.form as FormFilter);
  const [formWasChosen, setFormWasChosen] = useState(initialSearch.hasForm);
  const [mathFlashcardLang, setMathFlashcardLang] = useState<MathFlashcardLang | null>(null);
  const [mathFlashcardCategory, setMathFlashcardCategory] =
    useState<MathFlashcardCategoryId | null>(null);
  const [selectedFlashcardSet, setSelectedFlashcardSet] = useState<FlashcardSetIndex | null>(
    normalizeFlashcardSetParam(routeSearch.set),
  );
  const [favOnly, setFavOnly] = useState(false);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [queue, setQueue] = useState<number[]>([]); // indexes into pool
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const touchStart = useRef<number | null>(null);

  // engagement state
  const [flash, setFlash] = useState<"green" | "red" | null>(null);
  const [shake, setShake] = useState(false);
  const [shimmer, setShimmer] = useState(false);
  const [bounce, setBounce] = useState(false);
  const [slideOut, setSlideOut] = useState<"left" | "right" | null>(null);
  const [floatXp, setFloatXp] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [burstColor, setBurstColor] = useState<string | null>(null);

  // stats
  const [knownCount, setKnownCount] = useState(0);
  const [unknownCount, setUnknownCount] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [totalCards, setTotalCards] = useState(0);

  // settings
  const [soundOn, setSoundOn] = useState(true);
  const [vibrateOn, setVibrateOn] = useState(true);
  const [dealing, setDealing] = useState(false);
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    sfx.setMuted(!soundOn);
  }, [soundOn]);

  const { lang: scienceLang, setLang: setScienceLang } = useScienceLang();
  const isBilingualSubject = subject === "science" || subject === "math";

  useEffect(() => {
    setSubject(normalizeSubjectParam(routeSearch.subject));
    setForm(normalizeFormParam(routeSearch.form) as FormFilter);
    setFormWasChosen(routeSearch.form != null);
    setChapter(routeSearch.chapter ?? null);
    setSelectedFlashcardSet(normalizeFlashcardSetParam(routeSearch.set));
  }, [routeSearch.subject, routeSearch.form, routeSearch.chapter, routeSearch.set]);

  function updateFlashcardSearch(next: {
    subject?: string | null;
    form?: FormFilter | null;
    chapter?: string | null;
    set?: FlashcardSetIndex | null;
  }) {
    void navigate({
      search: (previous: Record<string, unknown>) => ({
        ...previous,
        subject: next.subject === undefined ? (subject ?? undefined) : (next.subject ?? undefined),
        form:
          next.form === undefined
            ? form === "All"
              ? undefined
              : Number(form.replace("Form ", ""))
            : next.form && next.form !== "All"
              ? Number(next.form.replace("Form ", ""))
              : undefined,
        chapter: next.chapter === undefined ? (chapter ?? undefined) : (next.chapter ?? undefined),
        set:
          next.set === undefined
            ? selectedFlashcardSet === null
              ? undefined
              : selectedFlashcardSet + 1
            : next.set === null
              ? undefined
              : next.set + 1,
      }),
    });
  }
  const hasMathFlashcards = !!(
    form === "Form 1" &&
    subject === "math" &&
    chapter &&
    MATH_FLASHCARD_BANKS[chapter]
  );
  const isEnglishFlashcardDeck = subject === "english" && isEnglishFlashcardDeckId(chapter);
  const isEnglishFlashcardDeckF2 = subject === "english" && isEnglishFlashcardDeckIdF2(chapter);
  const isEnglishFlashcardDeckF3 = subject === "english" && isEnglishFlashcardDeckIdF3(chapter);
  const needsScienceLang = isBilingualSubject && !scienceLang;

  const subjectChaptersForForm = subject
    ? getSubjectChapters(subject, scienceLang ?? undefined, form)
    : [];
  const chapterMeta =
    subject && chapter ? subjectChaptersForForm.find((c) => c.key === chapter) : null;
  const missingChapter = !!(
    subject &&
    chapter &&
    !chapterMeta &&
    !isEnglishFlashcardDeck &&
    !isEnglishFlashcardDeckF2 &&
    !isEnglishFlashcardDeckF3
  );
  const rawPool = useMemo(() => {
    if (subject === "english" && isEnglishFlashcardDeckId(chapter)) {
      return standardizeFlashcardDeck(getEnglishFlashcardsForDeck(chapter));
    }
    if (subject === "english" && isEnglishFlashcardDeckIdF2(chapter)) {
      return standardizeFlashcardDeck(getEnglishFlashcardsForDeckF2(chapter));
    }
    if (subject === "english" && isEnglishFlashcardDeckIdF3(chapter)) {
      return standardizeFlashcardDeck(getEnglishFlashcardsForDeckF3(chapter));
    }
    if (subject === "math" && chapter && MATH_FLASHCARD_BANKS[chapter] && mathFlashcardLang) {
      return standardizeFlashcardDeck(
        MATH_FLASHCARD_CATEGORIES.flatMap((category) =>
          getMathFlashcards(chapter, mathFlashcardLang, category.id),
        ),
      );
    }
    if (!subject || !chapter) return [];
    return getFlashcardDeckCards(subject, form, chapter, scienceLang ?? undefined);
  }, [subject, chapter, form, scienceLang, mathFlashcardLang]);
  const hasSelectedChapterFlashcards =
    !!subject &&
    !!chapter &&
    (hasMathFlashcards || hasFlashcardDeck(subject, form, chapter, scienceLang ?? undefined));
  const hasUpperFormFlashcardPath = !!(
    subject &&
    (form === "Form 2" || form === "Form 3") &&
    ((!chapter && hasFormResourceContent(subject, form, "flashcards", scienceLang ?? undefined)) ||
      (chapter && hasSelectedChapterFlashcards))
  );

  const flashcardSets = useMemo(() => splitFlashcardDeck(rawPool), [rawPool]);
  const shouldSplitFlashcards = flashcardSets.length === 3;
  const flashcardSetOptions =
    subject === "sejarah" && form === "Form 2" && chapter === "Chapter 2"
      ? SEJARAH_F2_C2_FLASHCARD_SET_OPTIONS
      : subject === "sejarah" && form === "Form 2" && chapter === "Chapter 3"
        ? SEJARAH_F2_C3_FLASHCARD_SET_OPTIONS
        : subject === "sejarah" && form === "Form 2" && chapter === "Chapter 4"
          ? SEJARAH_F2_C4_FLASHCARD_SET_OPTIONS
          : subject === "sejarah" && form === "Form 2" && chapter === "Chapter 5"
            ? SEJARAH_F2_C5_FLASHCARD_SET_OPTIONS
            : FLASHCARD_SET_OPTIONS;
  const pool = useMemo(() => {
    const setCards =
      shouldSplitFlashcards && selectedFlashcardSet !== null
        ? flashcardSets[selectedFlashcardSet]
        : shouldSplitFlashcards
          ? []
          : rawPool;

    return favOnly ? setCards.filter((f) => progress.favorites.includes(f.id)) : setCards;
  }, [
    rawPool,
    flashcardSets,
    shouldSplitFlashcards,
    selectedFlashcardSet,
    favOnly,
    progress.favorites,
  ]);

  const currentPoolIdx = queue[idx];
  const current = currentPoolIdx !== undefined ? pool[currentPoolIdx] : pool[0];
  const total = totalCards || pool.length;
  const done = Math.max(0, total - queue.length + idx);
  const pct = total > 0 ? Math.min(100, Math.round((done / total) * 100)) : 0;
  const flashcardSetTitle =
    subject === "english" && isEnglishFlashcardDeck
      ? ((form === "Form 2"
          ? ENGLISH_FLASHCARD_DECKS_F2
          : form === "Form 3"
            ? ENGLISH_FLASHCARD_DECKS_F3
            : ENGLISH_FLASHCARD_DECKS
        ).find((deck) => deck.id === chapter)?.title ?? "Paper 1 Flashcards")
      : subject === "math" && chapter && mathFlashcardLang && mathFlashcardCategory
        ? (MATH_FLASHCARD_CATEGORIES.find((category) => category.id === mathFlashcardCategory)?.[
            mathFlashcardLang
          ].title ?? getMathFlashcardChapterTitle(chapter, mathFlashcardLang))
        : (chapterMeta?.label ?? chapter ?? "Flashcards");

  function buildShuffled() {
    return pool.map((_, i) => i).sort(() => Math.random() - 0.5);
  }

  function shuffle() {
    const arr = buildShuffled();
    setQueue(arr);
    setIdx(0);
    setFlipped(false);
    setStreak(0);
    setLongestStreak(0);
    setKnownCount(0);
    setUnknownCount(0);
    setXpEarned(0);
    setTotalCards(arr.length);
    setCompleted(false);
    setDealing(true);
    setTimeout(() => setDealing(false), 500);
  }

  // rating: 0=Again, 1=Hard, 2=Good, 3=Easy
  function handleResponse(rating: 0 | 1 | 2 | 3) {
    if (!current || slideOut) return;
    if (!flipped) return; // must see answer before rating

    // SM-2 spaced repetition
    if (rateCard) rateCard(current.id, rating);

    const pass = rating >= 2;
    const xpAmount = rating === 3 ? 15 : rating === 2 ? 10 : rating === 1 ? 5 : 0;

    if (pass) {
      sfx.ding();
      vibrate(40, vibrateOn);
      setFlash("green");
      setBurstColor("#22C55E");
      if (xpAmount > 0) setFloatXp(true);
      setToast(ENCOURAGE[Math.floor(Math.random() * ENCOURAGE.length)]);
      setSlideOut("right");
      setKnownCount((c) => c + 1);
      if (xpAmount > 0) addXp(xpAmount, subject ?? undefined);
      setXpEarned((x) => x + xpAmount);
      const newStreak = streak + 1;
      setStreak(newStreak);
      setLongestStreak((l) => Math.max(l, newStreak));
      if (newStreak === 3 || newStreak === 5 || newStreak === 10) {
        setTimeout(() => sfx.streak(newStreak), 120);
        vibrate([30, 40, 30], vibrateOn);
      }
    } else {
      sfx.whomp();
      vibrate([40, 60, 40], vibrateOn);
      setFlash("red");
      setShake(true);
      setToast(GENTLE[Math.floor(Math.random() * GENTLE.length)]);
      setSlideOut("left");
      setUnknownCount((c) => c + 1);
      setStreak(0);
    }

    setTimeout(() => {
      setFlash(null);
      setShake(false);
      setFloatXp(false);
      setToast(null);
      setBurstColor(null);
      setSlideOut(null);
      setFlipped(false);
      setSwipeOffset(0);

      setQueue((q) => {
        const remaining = q.slice(idx + 1);
        // re-queue Again/Hard cards at end of session
        const nextQueue = pass ? remaining : [...remaining, q[idx]];
        if (nextQueue.length === 0) {
          setCompleted(true);
          if (subject && chapter) markChapter(subject, chapter, "cards");
          sfx.fanfare();
          vibrate([200, 80, 80, 80, 200], vibrateOn);
          return [];
        }
        setIdx(0);
        return nextQueue;
      });
    }, 450);
  }

  function handleFlip() {
    if (slideOut) return;
    if (!flipped) {
      sfx.whoosh();
      setShimmer(true);
      setTimeout(() => setShimmer(false), 700);
      setTimeout(() => {
        setBounce(true);
        setTimeout(() => setBounce(false), 500);
      }, 700);
    }
    setFlipped((f) => !f);
  }

  function go(delta: number) {
    setFlipped(false);
    setIdx((i) => (i + delta + queue.length) % Math.max(queue.length, 1));
  }

  // Touch swipe
  function onTouchStart(e: TouchEvent) {
    touchStart.current = e.touches[0].clientX;
  }
  function onTouchMove(e: TouchEvent) {
    if (touchStart.current === null) return;
    setSwipeOffset(e.touches[0].clientX - touchStart.current);
  }
  function onTouchEnd() {
    if (touchStart.current === null) return;
    const dx = swipeOffset;
    touchStart.current = null;
    if (dx > 80)
      handleResponse(2); // swipe right = Good
    else if (dx < -80)
      handleResponse(0); // swipe left = Again
    else setSwipeOffset(0);
  }

  function resetSession() {
    setIdx(0);
    setFlipped(false);
    setStreak(0);
    setLongestStreak(0);
    setCompleted(false);
    setQueue([]);
    setSwipeOffset(0);
    setKnownCount(0);
    setUnknownCount(0);
    setXpEarned(0);
    setTotalCards(0);
    setSelectedFlashcardSet(null);
  }

  function selectFlashcardSet(setIndex: FlashcardSetIndex) {
    resetSession();
    setSelectedFlashcardSet(setIndex);
    updateFlashcardSearch({ set: setIndex });
  }

  function resetMathFlashcardFlow() {
    setMathFlashcardLang(null);
    setMathFlashcardCategory(null);
    resetSession();
  }

  function selectMathCategory(category: MathFlashcardCategoryId) {
    setMathFlashcardCategory(category);
    resetSession();
    if (typeof window === "undefined" || !mathFlashcardLang || !chapter) return;
    try {
      localStorage.setItem(
        `academy-math-${chapter.toLowerCase().replaceAll(" ", "-")}-flashcards-last`,
        JSON.stringify({ lang: mathFlashcardLang, category, chapter }),
      );
    } catch {
      return;
    }
  }

  // Auto-shuffle & deal on chapter entry
  useEffect(() => {
    if (pool.length > 0 && queue.length === 0 && !completed) {
      const arr = buildShuffled();
      setQueue(arr);
      setTotalCards(arr.length);
      setDealing(true);
      setTimeout(() => setDealing(false), 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pool, completed]);

  // First-visit tip
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (!localStorage.getItem("academy-fc-tip")) {
        setShowTip(true);
        setTimeout(() => {
          setShowTip(false);
          localStorage.setItem("academy-fc-tip", "1");
        }, 4000);
      }
    } catch {
      setShowTip(false);
    }
  }, []);

  useEffect(() => {
    if (
      subject !== "math" ||
      !chapter ||
      !MATH_FLASHCARD_BANKS[chapter] ||
      !mathFlashcardLang ||
      !mathFlashcardCategory ||
      !current
    ) {
      return;
    }
    try {
      localStorage.setItem(
        `academy-math-${chapter.toLowerCase().replaceAll(" ", "-")}-flashcards-last-card`,
        JSON.stringify({
          lang: mathFlashcardLang,
          category: mathFlashcardCategory,
          chapter,
          cardId: current.id,
          viewedAt: new Date().toISOString(),
        }),
      );
    } catch {
      return;
    }
  }, [subject, chapter, mathFlashcardLang, mathFlashcardCategory, current]);

  const fav = current ? progress.favorites.includes(current.id) : false;
  const subj = current ? subjects.find((s) => s.id === current.subjectId) : null;
  const remaining = queue.length - idx;
  const planetSubjectId = (subject ?? undefined) as SubjectPlanetId | undefined;
  const planetTheme = getPlanetTheme(subject);

  // ── Subject World early-return ────────────────────────────────────────────
  if (subject && !formWasChosen && !chapter) {
    return (
      <AcademyPageShell subjectId={planetSubjectId}>
        <FormGrid
          subjectId={subject}
          mode="flashcards"
          onSelect={(selectedForm) => {
            setForm(selectedForm);
            setFormWasChosen(true);
            setChapter(null);
            updateFlashcardSearch({ form: selectedForm, chapter: null, set: null });
            resetSession();
          }}
          onBack={() => {
            setSubject(null);
            setChapter(null);
            setForm("Form 1");
            setFormWasChosen(false);
            updateFlashcardSearch({ subject: null, form: null, chapter: null, set: null });
            resetSession();
          }}
        />
      </AcademyPageShell>
    );
  }

  if (
    subject &&
    (form === "Form 2" || form === "Form 3") &&
    !hasUpperFormFlashcardPath &&
    !needsScienceLang
  ) {
    return (
      <AcademyPageShell subjectId={planetSubjectId}>
        <FormComingSoon
          subjectId={subject}
          form={form}
          onBack={() => {
            setChapter(null);
            setFormWasChosen(false);
            resetSession();
          }}
        />
      </AcademyPageShell>
    );
  }

  if (subject === "english" && !needsScienceLang && !chapter) {
    return (
      <AcademyPageShell subjectId={planetSubjectId}>
        <EnglishFlashcardDeckPicker
          form={form === "Form 2" ? "Form 2" : form === "Form 3" ? "Form 3" : "Form 1"}
          onBack={() => {
            setSubject(null);
            setChapter(null);
            resetSession();
          }}
          onSelect={(deckId) => {
            setChapter(deckId);
            resetSession();
            if (setLastVisited) {
              const deck = (
                form === "Form 2"
                  ? ENGLISH_FLASHCARD_DECKS_F2
                  : form === "Form 3"
                    ? ENGLISH_FLASHCARD_DECKS_F3
                    : ENGLISH_FLASHCARD_DECKS
              ).find((item) => item.id === deckId);
              setLastVisited({
                subjectId: "english",
                chapterKey: deckId,
                type: "flashcards",
                label: deck?.title ?? deckId,
                timestamp: Date.now(),
                form: form === "All" ? "Form 1" : form,
              });
            }
          }}
        />
      </AcademyPageShell>
    );
  }

  return (
    <AcademyPageShell subjectId={planetSubjectId}>
      <AcademyHero
        eyebrow="Active recall"
        title=""
        gradientTitle="Flashcards"
        description="Master concepts through active recall."
        illustration="flashcards"
        stats={[
          { label: "Completed", value: subject || chapter ? idx : "Ready" },
          { label: "Cards Left", value: subject || chapter ? Math.max(0, remaining) : "Choose" },
          { label: "Mode", value: "Study Deck" },
        ]}
      />

      {subject && chapter && hasSelectedChapterFlashcards && !isEnglishFlashcardDeck && (
        <ChapterContentTabs
          subjectId={subject}
          form={form}
          chapterKey={chapter}
          scienceLang={isBilingualSubject ? (scienceLang ?? undefined) : undefined}
          currentContentType="flashcards"
        />
      )}

      {!subject ? (
        <div className="space-y-6">
          <div className="grid gap-4 xl:grid-cols-[1.1fr_1fr]">
            <div className="rounded-[2rem] border border-white/[0.08] bg-[#101827]/76 p-5 shadow-[0_18px_70px_rgba(0,0,0,0.24)]">
              <p className="text-xs font-bold uppercase tracking-wide text-[#94A3B8]">
                Continue Studying
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold">Science</h2>
              <p className="mt-1 text-sm text-[#94A3B8]">{cleanLearningLabel("Bab 7: Udara")}</p>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6]" />
              </div>
              <button
                type="button"
                onClick={() => {
                  setSubject("science");
                  setScienceLang("bm");
                  setChapter("Chapter 7");
                  resetSession();
                }}
                className="mt-5 inline-flex rounded-2xl bg-gradient-to-r from-primary to-accent px-5 py-3 text-sm font-bold text-white"
              >
                Continue Studying
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
              {[
                ["Recommended", "Science", "Udara"],
                ["Recently Studied", "Mathematics", "Algebra Essentials"],
                ["Popular Deck", "Sejarah", "Warisan Sejarah"],
              ].map(([badge, deckSubject, deckChapter]) => (
                <div
                  key={badge}
                  className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.05] p-4"
                >
                  <p className="text-xs font-bold uppercase tracking-wide text-accent">{badge}</p>
                  <h3 className="mt-2 font-display text-xl font-bold">{deckSubject}</h3>
                  <p className="text-sm text-[#94A3B8]">{cleanLearningLabel(deckChapter)}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/[0.08] bg-[#101827]/76 p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-[#94A3B8]">
              Flashcard Player Preview
            </p>
            <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#6366F1]/20 to-[#8B5CF6]/20 p-6">
                <p className="text-sm text-[#94A3B8]">Question side</p>
                <h3 className="mt-3 font-display text-2xl font-bold">What is active recall?</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Flip", "Easy", "Hard", "Don’t Know"].map((label) => (
                  <button
                    key={label}
                    type="button"
                    className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-bold"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <SubjectGrid
            mode="flashcards"
            onSelect={(id) => {
              setSubject(id);
              setChapter(null);
              setForm("Form 1");
              setFormWasChosen(false);
              setMathFlashcardLang(null);
              setMathFlashcardCategory(null);
              updateFlashcardSearch({ subject: id, form: null, chapter: null, set: null });
              resetSession();
            }}
          />
        </div>
      ) : needsScienceLang ? (
        <ScienceLanguagePicker
          onSelect={(l) => setScienceLang(l)}
          subjectName={subject === "math" ? "Mathematics" : "Science"}
          subjectNameBm={subject === "math" ? "Matematik" : "Sains"}
          subjectEmoji={subject === "math" ? "📐" : "🔬"}
          bmDescription={
            subject === "math"
              ? "Belajar Matematik dalam Bahasa Malaysia"
              : "Belajar Sains dalam Bahasa Malaysia"
          }
          dlpDescription={
            subject === "math"
              ? "Learn Mathematics in English (DLP)"
              : "Learn Science in English (DLP)"
          }
          onBack={() => {
            setSubject(null);
            setChapter(null);
            setMathFlashcardLang(null);
            setMathFlashcardCategory(null);
            resetSession();
          }}
        />
      ) : !chapter ? (
        <>
          <SubjectWorldBanner subjectId={subject as SubjectPlanetId} />
          {isBilingualSubject && scienceLang && (
            <ScienceLangBar lang={scienceLang} onChange={() => setScienceLang(null)} />
          )}
          <ChapterGrid
            subjectId={subject}
            scienceLang={scienceLang ?? undefined}
            form={form}
            mode="flashcards"
            isChapterAvailable={(chapterKey) =>
              hasFlashcardDeck(subject, form, chapterKey, scienceLang ?? undefined) ||
              (subject === "math" && form === "Form 1" && Boolean(MATH_FLASHCARD_BANKS[chapterKey]))
            }
            onSelect={(key) => {
              setChapter(key);
              updateFlashcardSearch({ chapter: key, set: null });
              setMathFlashcardLang(null);
              setMathFlashcardCategory(null);
              resetSession();
              if (subject && setLastVisited) {
                const chapMeta = getSubjectChapters(subject, scienceLang ?? undefined, form).find(
                  (c) => c.key === key,
                );
                setLastVisited({
                  subjectId: subject,
                  chapterKey: key,
                  type: "flashcards",
                  label: chapMeta?.label ?? key,
                  timestamp: Date.now(),
                  form: form === "All" ? "Form 1" : form,
                });
              }
            }}
            onBack={() => {
              setSubject(null);
              setChapter(null);
              updateFlashcardSearch({ subject: null, form: null, chapter: null, set: null });
              setMathFlashcardLang(null);
              setMathFlashcardCategory(null);
            }}
          />
        </>
      ) : missingChapter ? (
        <div className="text-center py-20 glass rounded-2xl">
          <p className="text-muted-foreground">Chapter not found. Please choose another chapter.</p>
          <button
            type="button"
            onClick={() => {
              setChapter(null);
              updateFlashcardSearch({ chapter: null, set: null });
              setMathFlashcardLang(null);
              setMathFlashcardCategory(null);
              resetSession();
            }}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-4 h-4" /> Back to chapters
          </button>
        </div>
      ) : chapterMeta && !hasSelectedChapterFlashcards ? (
        <ComingSoonScreen
          subjectId={subject}
          chapterKey={chapter}
          scienceLang={isBilingualSubject ? (scienceLang ?? undefined) : undefined}
          form={form}
          mode="flashcards"
          onBack={() => {
            setChapter(null);
            updateFlashcardSearch({ chapter: null, set: null });
            setMathFlashcardLang(null);
            setMathFlashcardCategory(null);
          }}
        />
      ) : hasMathFlashcards && !mathFlashcardLang ? (
        <MathFlashcardLanguagePicker
          chapterKey={chapter}
          onBack={() => {
            setChapter(null);
            updateFlashcardSearch({ chapter: null, set: null });
            resetMathFlashcardFlow();
          }}
          onSelect={(lang) => {
            setMathFlashcardLang(lang);
            setMathFlashcardCategory(null);
            resetSession();
          }}
        />
      ) : shouldSplitFlashcards && selectedFlashcardSet === null ? (
        <FlashcardSetPicker
          title={flashcardSetTitle}
          setOptions={flashcardSetOptions}
          onBack={() => {
            if (hasMathFlashcards) {
              setChapter(null);
              updateFlashcardSearch({ chapter: null, set: null });
              resetMathFlashcardFlow();
            } else {
              setChapter(null);
              updateFlashcardSearch({ chapter: null, set: null });
            }
            resetSession();
          }}
          onSelect={selectFlashcardSet}
        />
      ) : (
        <>
          {isEnglishFlashcardDeck ? (
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => {
                  if (shouldSplitFlashcards && selectedFlashcardSet !== null) {
                    resetSession();
                    updateFlashcardSearch({ set: null });
                    return;
                  }
                  setChapter(null);
                  updateFlashcardSearch({ chapter: null, set: null });
                  resetSession();
                }}
                className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm transition-all hover:-translate-x-0.5 hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4" /> Back to flashcards
              </button>
              <span className="text-sm font-semibold text-muted-foreground">
                {form === "Form 2"
                  ? "English Form 2 •"
                  : form === "Form 3"
                    ? "English Form 3 •"
                    : "English Form 1 •"}{" "}
                {cleanLearningLabel(
                  (form === "Form 2"
                    ? ENGLISH_FLASHCARD_DECKS_F2
                    : form === "Form 3"
                      ? ENGLISH_FLASHCARD_DECKS_F3
                      : ENGLISH_FLASHCARD_DECKS
                  ).find((deck) => deck.id === chapter)?.title ?? chapter,
                )}
              </span>
            </div>
          ) : (
            <ContentHeader
              subjectId={subject}
              chapterKey={chapter}
              scienceLang={isBilingualSubject ? (scienceLang ?? undefined) : undefined}
              form={form}
              mode="flashcards"
              onBack={() => {
                if (shouldSplitFlashcards && selectedFlashcardSet !== null) {
                  resetSession();
                  updateFlashcardSearch({ set: null });
                  return;
                }
                if (hasMathFlashcards) {
                  setMathFlashcardCategory(null);
                  resetSession();
                  return;
                }
                setChapter(null);
                updateFlashcardSearch({ chapter: null, set: null });
              }}
            />
          )}

          {/* Settings row */}
          <div className="flex justify-end gap-2 mb-3">
            <button
              onClick={() => setSoundOn((v) => !v)}
              aria-label="Toggle sound"
              className="p-2 rounded-full glass hover:bg-white/10 transition"
              title={soundOn ? "Sound on" : "Sound off"}
            >
              {soundOn ? (
                <Volume2 className="w-4 h-4" />
              ) : (
                <VolumeX className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
            <button
              onClick={() => setVibrateOn((v) => !v)}
              aria-label="Toggle vibration"
              className={`p-2 rounded-full glass hover:bg-white/10 transition ${vibrateOn ? "" : "text-muted-foreground"}`}
              title={vibrateOn ? "Vibration on" : "Vibration off"}
            >
              <Vibrate className="w-4 h-4" />
            </button>
          </div>

          {subject === "math" &&
            chapter &&
            MATH_FLASHCARD_BANKS[chapter] &&
            mathFlashcardLang &&
            mathFlashcardCategory && (
              <div className="glass-strong rounded-2xl p-3 mb-3 flex flex-wrap gap-2 items-center justify-between animate-fade-up">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
                  {mathFlashcardLang === "dlp" ? "Categories" : "Kategori"}
                </span>
                <div className="flex flex-wrap gap-2">
                  {MATH_FLASHCARD_CATEGORIES.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => selectMathCategory(category.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                        mathFlashcardCategory === category.id
                          ? "bg-gradient-to-r from-primary to-accent text-white"
                          : "bg-white/5 text-muted-foreground hover:bg-white/10"
                      }`}
                    >
                      {category.icon} {cleanLearningLabel(category[mathFlashcardLang].title)}
                    </button>
                  ))}
                </div>
              </div>
            )}

          {!isEnglishFlashcardDeck && (
            <div className="glass-strong rounded-2xl p-4 mb-6 flex flex-wrap gap-2 items-center justify-between animate-fade-up">
              <div className="flex flex-wrap gap-2 items-center">
                <select
                  value={form}
                  onChange={(e) => {
                    setForm(e.target.value as FormFilter);
                    resetSession();
                  }}
                  className="px-4 py-2 rounded-full bg-white/5 text-sm"
                >
                  <option>All</option>
                  {forms.map((f) => (
                    <option key={f}>{f}</option>
                  ))}
                </select>
                <button
                  onClick={() => setFavOnly((v) => !v)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${favOnly ? "bg-rose-500/30 text-rose-200" : "bg-white/5 text-muted-foreground"}`}
                >
                  ❤ Favorites
                </button>
                <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/5 text-xs font-semibold">
                  <span className="text-base">🔥</span>
                  <span className="text-nova-yellow">{streak}</span>
                  <span className="text-muted-foreground">streak</span>
                </span>
              </div>
              <button
                onClick={shuffle}
                className="px-4 py-2 rounded-full bg-white/5 text-sm flex items-center gap-2 hover:bg-white/10"
              >
                <Shuffle className="w-4 h-4" /> Shuffle
              </button>
            </div>
          )}
          {isEnglishFlashcardDeck && (
            <div className="glass-strong rounded-2xl p-4 mb-6 flex flex-wrap gap-2 items-center justify-between animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm font-bold text-cyan-100">
                {total || pool.length} Cards
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFavOnly((v) => !v)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${favOnly ? "bg-rose-500/30 text-rose-200" : "bg-white/5 text-muted-foreground"}`}
                >
                  Favorites
                </button>
                <button
                  onClick={shuffle}
                  className="px-4 py-2 rounded-full bg-white/5 text-sm flex items-center gap-2 hover:bg-white/10"
                >
                  <Shuffle className="w-4 h-4" /> Shuffle
                </button>
              </div>
            </div>
          )}
          <p className="text-center text-xs text-muted-foreground mb-4 animate-fade-up">
            🔀 Cards are shuffled every session
          </p>

          {pool.length === 0 || !current ? (
            <div className="text-center py-20 glass rounded-2xl">
              <p className="text-muted-foreground">
                {subject === "math"
                  ? "Flashcards Coming Soon"
                  : "No flashcards match your filters."}
              </p>
            </div>
          ) : completed ? (
            <>
              <Confetti count={90} />
              <div className="glass-strong rounded-3xl p-10 text-center animate-fade-up">
                <div className="text-6xl mb-3 animate-float-soft">🏆</div>
                <h2 className="font-display text-3xl font-bold">All done!</h2>
                <p className="mt-2 text-muted-foreground">Magnificent revision session.</p>
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-3 text-sm">
                  <div className="glass rounded-2xl p-3">
                    <div className="text-2xl font-bold">{totalCards}</div>
                    <div className="text-xs text-muted-foreground">Total</div>
                  </div>
                  <div className="glass rounded-2xl p-3">
                    <div className="text-2xl font-bold text-emerald-300">{knownCount} ✅</div>
                    <div className="text-xs text-muted-foreground">Known</div>
                  </div>
                  <div className="glass rounded-2xl p-3">
                    <div className="text-2xl font-bold text-rose-300">{unknownCount} ❌</div>
                    <div className="text-xs text-muted-foreground">To review</div>
                  </div>
                  <div className="glass rounded-2xl p-3">
                    <div className="text-2xl font-bold">{longestStreak} 🔥</div>
                    <div className="text-xs text-muted-foreground">Best streak</div>
                  </div>
                  <div className="glass rounded-2xl p-3">
                    <div className="text-2xl font-bold text-nova-yellow">+{xpEarned}</div>
                    <div className="text-xs text-muted-foreground">XP earned</div>
                  </div>
                </div>
                <div className="mt-7 flex flex-wrap gap-3 justify-center">
                  <button
                    onClick={shuffle}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold hover:scale-105 transition-transform"
                  >
                    Ulang Semula 🔄
                  </button>
                  <button
                    onClick={() => {
                      setSubject(null);
                      setChapter(null);
                      resetSession();
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-strong font-semibold hover:scale-105 transition-transform"
                  >
                    Subjek Lain 📚
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Progress */}
              <div className="mb-3 flex justify-between items-center text-xs text-muted-foreground">
                <span>
                  Card {done + 1} of {total}
                </span>
                <span>{pct}%</span>
              </div>
              <div
                className="mb-6 h-2 w-full overflow-hidden rounded-full bg-white/10"
                role="progressbar"
                aria-label="Flashcard progress"
                aria-valuemin={0}
                aria-valuemax={total}
                aria-valuenow={done + 1}
              >
                <div
                  className={`h-full bg-gradient-to-r ${progressColor(pct)} transition-all duration-700 ${(pct >= 25 && pct < 30) || (pct >= 50 && pct < 55) || (pct >= 75 && pct < 80) || pct === 100 ? "animate-pulse" : ""}`}
                  style={{ width: `${pct}%` }}
                />
              </div>

              <FireBadge streak={streak} />

              <div className="relative">
                {/* Card stack behind */}
                {remaining > 1 && (
                  <>
                    <div className="absolute inset-0 glass rounded-3xl translate-y-3 scale-[0.96] opacity-50" />
                    {remaining > 2 && (
                      <div className="absolute inset-0 glass rounded-3xl translate-y-6 scale-[0.92] opacity-30" />
                    )}
                    <div className="absolute -top-3 -right-3 z-20 glass-strong rounded-full px-3 py-1 text-xs font-bold">
                      {remaining} left
                    </div>
                  </>
                )}

                <div
                  role="button"
                  tabIndex={0}
                  aria-pressed={flipped}
                  aria-label={
                    flipped
                      ? "Flashcard answer shown. Press Enter to show question."
                      : "Flashcard question shown. Press Enter to flip."
                  }
                  onClick={handleFlip}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleFlip();
                    }
                  }}
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                  className={`flashcard-study-card relative mx-auto cursor-pointer select-none rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]
                    ${dealing ? "animate-deal-in" : ""}
                    ${shake ? "animate-shake" : ""}
                    ${bounce ? "animate-bounce-soft" : ""}
                    ${slideOut === "right" ? "animate-slide-out-right" : ""}
                    ${slideOut === "left" ? "animate-slide-out-left" : ""}
                    ${flash === "green" ? "animate-flash-green" : ""}
                    ${flash === "red" ? "animate-flash-red" : ""}
                  `}
                  style={{
                    perspective: "1500px",
                    height: 360,
                    transform: slideOut
                      ? undefined
                      : `translateX(${swipeOffset}px) rotate(${swipeOffset / 30}deg)`,
                    transition: swipeOffset === 0 ? "transform 0.3s ease" : "none",
                  }}
                >
                  <div
                    key={current.id}
                    className="relative w-full h-full transition-transform duration-700"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: flipped ? "rotateY(180deg)" : "none",
                    }}
                  >
                    {/* front */}
                    <div
                      className="absolute inset-0 glass-strong rounded-3xl p-8 flex flex-col overflow-hidden"
                      style={{
                        backfaceVisibility: "hidden",
                        border: planetTheme ? `1px solid ${planetTheme.color}40` : undefined,
                        boxShadow: planetTheme
                          ? `0 24px 70px -30px ${planetTheme.glow}`
                          : undefined,
                      }}
                    >
                      {shimmer && <div className="card-shimmer-overlay" />}
                      {planetTheme && (
                        <span
                          aria-hidden
                          className="pointer-events-none absolute bottom-3 right-4 font-display font-black leading-none"
                          style={{ fontSize: "2.6rem", color: planetTheme.color, opacity: 0.12 }}
                        >
                          {planetTheme.decor[0]}
                        </span>
                      )}
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-semibold text-muted-foreground">
                          {subj?.emoji} {subj?.name} • {current.form}
                        </span>
                        <button
                          type="button"
                          aria-label={fav ? "Remove from favorites" : "Add to favorites"}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(current.id);
                          }}
                          className={`rounded-full p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300/70 ${fav ? "bg-rose-500/20 text-rose-300" : "bg-white/5 text-muted-foreground hover:text-rose-300"}`}
                        >
                          <Heart className={`w-4 h-4 ${fav ? "fill-current" : ""}`} />
                        </button>
                      </div>
                      <div className="flex-1 flex items-center justify-center text-center">
                        <p className="font-display text-3xl sm:text-4xl font-bold leading-tight">
                          {cleanLearningTitle(current.front)}
                        </p>
                      </div>
                      <p className="text-center text-xs text-muted-foreground">
                        Tap to flip · Swipe → know · Swipe ← don't know
                      </p>
                    </div>
                    {/* back */}
                    <div
                      className="absolute inset-0 glass-strong rounded-3xl p-8 flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        background: planetTheme
                          ? `linear-gradient(135deg, ${planetTheme.color}22, rgba(0,0,0,0.45))`
                          : undefined,
                        border: planetTheme ? `1px solid ${planetTheme.color}40` : undefined,
                        boxShadow: planetTheme
                          ? `0 24px 70px -30px ${planetTheme.glow}`
                          : undefined,
                      }}
                    >
                      {shimmer && <div className="card-shimmer-overlay" />}
                      {planetTheme && (
                        <span
                          aria-hidden
                          className="pointer-events-none absolute bottom-3 right-4 font-display font-black leading-none"
                          style={{ fontSize: "2.6rem", color: planetTheme.color, opacity: 0.14 }}
                        >
                          {planetTheme.decor[1] ?? planetTheme.decor[0]}
                        </span>
                      )}
                      <p className="font-display text-2xl sm:text-3xl text-center leading-relaxed">
                        {cleanLearningQuestion(current.back)}
                      </p>
                    </div>
                  </div>

                  {/* Floating XP */}
                  {floatXp && (
                    <div className="pointer-events-none absolute left-1/2 top-6 z-40 animate-xp-float font-display font-bold text-2xl text-emerald-300 drop-shadow-[0_0_12px_rgba(34,197,94,0.7)]">
                      +XP
                    </div>
                  )}
                  {/* Toast message */}
                  {toast && (
                    <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-12 z-40 animate-combo-pop font-display font-bold text-xl">
                      <span className={flash === "green" ? "text-emerald-300" : "text-rose-300"}>
                        {toast}
                      </span>
                    </div>
                  )}
                  {/* Confetti burst */}
                  {burstColor && <MiniConfetti color={burstColor} />}
                </div>
              </div>

              {/* Navigation row */}
              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  type="button"
                  aria-label="Previous card"
                  onClick={() => go(-1)}
                  className="rounded-full glass p-3 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm text-muted-foreground">
                  {done + 1} / {total}
                </span>
                <button
                  type="button"
                  aria-label="Next card"
                  onClick={() => go(1)}
                  className="rounded-full glass p-3 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* SM-2 Rating row — shown after card is flipped */}
              {flipped ? (
                <div className="mt-4 grid grid-cols-4 gap-2">
                  <button
                    type="button"
                    aria-label="Rate this card Again"
                    onClick={() => handleResponse(0)}
                    className="flex min-h-20 flex-col items-center gap-0.5 rounded-2xl bg-rose-500/15 py-3 text-sm font-bold text-rose-200 transition-all hover:bg-rose-500/25 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300/70"
                  >
                    <X className="w-4 h-4" />
                    <span>Lagi</span>
                    <span className="text-[10px] font-normal opacity-60">Again</span>
                  </button>
                  <button
                    type="button"
                    aria-label="Rate this card Almost"
                    onClick={() => handleResponse(1)}
                    className="flex min-h-20 flex-col items-center gap-0.5 rounded-2xl bg-orange-500/15 py-3 text-sm font-bold text-orange-200 transition-all hover:bg-orange-500/25 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/70"
                  >
                    <span className="text-base">😓</span>
                    <span>Hampir</span>
                    <span className="text-[10px] font-normal opacity-60">+5 XP</span>
                  </button>
                  <button
                    type="button"
                    aria-label="Rate this card Known"
                    onClick={() => handleResponse(2)}
                    className="flex min-h-20 flex-col items-center gap-0.5 rounded-2xl bg-emerald-500/15 py-3 text-sm font-bold text-emerald-200 transition-all hover:bg-emerald-500/25 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70"
                  >
                    <Check className="w-4 h-4" />
                    <span>Tahu</span>
                    <span className="text-[10px] font-normal opacity-60">+10 XP</span>
                  </button>
                  <button
                    type="button"
                    aria-label="Rate this card Easy"
                    onClick={() => handleResponse(3)}
                    className="flex min-h-20 flex-col items-center gap-0.5 rounded-2xl bg-sky-500/15 py-3 text-sm font-bold text-sky-200 transition-all hover:bg-sky-500/25 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70"
                  >
                    <span className="text-base">✨</span>
                    <span>Mudah</span>
                    <span className="text-[10px] font-normal opacity-60">+15 XP</span>
                  </button>
                </div>
              ) : (
                <div className="mt-4 flex items-center justify-center gap-3 text-xs text-muted-foreground">
                  <span>Tap card to flip, then rate how well you knew it</span>
                </div>
              )}

              {showTip && (
                <div className="mobile-bottom-toast fixed left-1/2 -translate-x-1/2 z-50 glass-strong rounded-full px-4 py-2 text-sm animate-fade-up shadow-xl">
                  💡 Tap card to flip · swipe ➜ to know · ⬅ to skip
                </div>
              )}
            </>
          )}
        </>
      )}
    </AcademyPageShell>
  );
}
