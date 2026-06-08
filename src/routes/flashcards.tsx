import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type TouchEvent } from "react";
import { subjects, forms, flashcards, getItemChapterKey, getSubjectChapters } from "@/data/content";
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
  ChapterGrid,
  ContentHeader,
  ComingSoonScreen,
} from "@/components/ChapterPicker";
import { ScienceLanguagePicker, ScienceLangBar } from "@/components/ScienceLanguagePicker";
import { useScienceLang } from "@/hooks/use-science-lang";
import { Confetti } from "@/components/Confetti";
import { sfx } from "@/lib/sounds";
import { normalizeFormParam, normalizeSubjectParam } from "@/lib/study-routing";
import { AcademyHero, AcademyPageShell } from "@/components/AcademyPage";

type MathFlashcardLang = "bm" | "dlp";
type MathFlashcardCategoryId = "concepts" | "operations" | "facts" | "practice";

export const Route = createFileRoute("/flashcards")({
  head: () => ({
    meta: [
      { title: "Flashcards — AcadeMY" },
      { name: "description", content: "Swipeable, flippable flashcards for fast KSSM revision." },
      { property: "og:title", content: "Flashcards — AcadeMY" },
      {
        property: "og:description",
        content: "Smart revision with favorites and smooth flip animations.",
      },
    ],
  }),
  component: FlashcardsPage,
});

const ENCOURAGE = ["Hebat! 🔥", "Pandai! ⚡", "Betul! 🌟", "Bagus! 💪", "Keep it up! 🎯"];
const GENTLE = [
  "Cuba lagi! 💫",
  "Jangan give up! 🌈",
  "Hampir! Keep going! 🎮",
  "Ulang semula! 📚",
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
    mathCard(
      "Permudahkan 15 : 25.",
      "3 : 5.",
      "Simplify 15 : 25.",
      "3 : 5.",
    ),
    mathCard(
      "Jika 5 buku berharga RM 20, harga 8 buku ialah?",
      "RM 32.",
      "If 5 books cost RM 20, the cost of 8 books is?",
      "RM 32.",
    ),
    mathCard(
      "Selesaikan 3/4 = x/12.",
      "x = 9.",
      "Solve 3/4 = x/12.",
      "x = 9.",
    ),
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
    mathCard(
      "Adakah 2 : 3 dan 8 : 12 setara?",
      "Ya.",
      "Are 2 : 3 and 8 : 12 equivalent?",
      "Yes.",
    ),
    mathCard(
      "Permudahkan 200 g : 1 kg.",
      "1 : 5.",
      "Simplify 200 g : 1 kg.",
      "1 : 5.",
    ),
    mathCard(
      "Tulis 40% sebagai nisbah termudah.",
      "2 : 5.",
      "Write 40% as a simplest ratio.",
      "2 : 5.",
    ),
    mathCard(
      "5 pen = RM 15. Harga 3 pen?",
      "RM 9.",
      "5 pens = RM 15. Price of 3 pens?",
      "RM 9.",
    ),
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
    mathCard(
      "Permudahkan 5x − (2x − 3).",
      "3x + 3.",
      "Simplify 5x − (2x − 3).",
      "3x + 3.",
    ),
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
  if (typeof window === "undefined") return { subject: null, form: "All" };
  const params = new URLSearchParams(window.location.search);
  return {
    subject: normalizeSubjectParam(params.get("subject")),
    form: normalizeFormParam(params.get("form")),
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
  const bmTotal = Object.values(MATH_FLASHCARD_BANKS[chapterKey] ?? {}).reduce(
    (sum, cards) => sum + cards.length,
    0,
  );
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
          📐 Mathematics • {getMathFlashcardHeaderTitle(chapterKey)}
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
            Choose a language before opening the Chapter {chapterNumber} revision categories.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <button
            onClick={() => onSelect("bm")}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_32px_oklch(0.63_0.22_295_/_0.35)]"
          >
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 opacity-20 blur-3xl transition-opacity group-hover:opacity-40" />
            <div className="relative mb-4 text-5xl">🇲🇾</div>
            <h3 className="relative font-display text-2xl font-bold">Bahasa Melayu</h3>
            <p className="relative mt-2 text-sm text-muted-foreground">
              {bmTotal} kad ulang kaji Bab {chapterNumber} dalam Bahasa Melayu.
            </p>
          </button>

          <button
            onClick={() => onSelect("dlp")}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_0_32px_oklch(0.7_0.18_180_/_0.35)]"
          >
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 opacity-20 blur-3xl transition-opacity group-hover:opacity-40" />
            <div className="relative mb-4 text-5xl">🇬🇧</div>
            <h3 className="relative font-display text-2xl font-bold">DLP (English)</h3>
            <p className="relative mt-2 text-sm text-muted-foreground">
              {bmTotal} translated Chapter {chapterNumber} revision cards in English.
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
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold">{title}</h2>
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
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_32px_oklch(0.63_0.22_295_/_0.35)] animate-slide-up"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br from-primary to-accent opacity-20 blur-3xl transition-opacity group-hover:opacity-40" />
                <div className="relative mb-4 text-4xl">{category.icon}</div>
                <h3 className="relative font-display text-xl font-bold">
                  {category.icon} {copy.title}
                </h3>
                <p className="relative mt-2 text-sm leading-6 text-muted-foreground">
                  {copy.purpose}
                </p>
                <div className="relative mt-5 inline-flex rounded-full border border-amber-300/25 bg-amber-300/10 px-3 py-1.5 text-xs font-bold text-amber-200">
                  {MATH_FLASHCARD_BANKS[chapterKey]?.[category.id]?.length ?? 0} Flashcards
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function FlashcardsPage() {
  const { progress, toggleFavorite, markChapter, addXp } = useProgress();
  const initialSearch = useMemo(readStudySearch, []);
  const [subject, setSubject] = useState<string | null>(initialSearch.subject);
  const [chapter, setChapter] = useState<string | null>(null);
  const [form, setForm] = useState(initialSearch.form);
  const [mathFlashcardLang, setMathFlashcardLang] = useState<MathFlashcardLang | null>(null);
  const [mathFlashcardCategory, setMathFlashcardCategory] =
    useState<MathFlashcardCategoryId | null>(null);
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
  const hasMathFlashcards = !!(subject === "math" && chapter && MATH_FLASHCARD_BANKS[chapter]);
  const needsScienceLang = isBilingualSubject && !scienceLang;

  const chapterMeta =
    subject && chapter
      ? getSubjectChapters(subject, scienceLang ?? undefined).find((c) => c.key === chapter)
      : null;
  const missingChapter = !!(subject && chapter && !chapterMeta);

  const pool = useMemo(() => {
    if (
      subject === "math" &&
      chapter &&
      MATH_FLASHCARD_BANKS[chapter] &&
      mathFlashcardLang &&
      mathFlashcardCategory
    ) {
      const mathCards = getMathFlashcards(chapter, mathFlashcardLang, mathFlashcardCategory);
      return favOnly ? mathCards.filter((f) => progress.favorites.includes(f.id)) : mathCards;
    }
    if (!subject || !chapter) return [];
    return flashcards.filter((f) => {
      if (f.subjectId !== subject) return false;
      if (getItemChapterKey(f) !== chapter) return false;
      if (isBilingualSubject && scienceLang && f.lang && f.lang !== scienceLang) return false;
      if (form !== "All" && f.form !== form) return false;
      if (favOnly && !progress.favorites.includes(f.id)) return false;
      return true;
    });
  }, [
    subject,
    chapter,
    form,
    favOnly,
    progress.favorites,
    scienceLang,
    isBilingualSubject,
    mathFlashcardLang,
    mathFlashcardCategory,
  ]);

  const currentPoolIdx = queue[idx];
  const current = currentPoolIdx !== undefined ? pool[currentPoolIdx] : pool[0];
  const total = totalCards || pool.length;
  const done = Math.max(0, total - queue.length + idx);
  const pct = total > 0 ? Math.min(100, Math.round((done / total) * 100)) : 0;

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

  function handleResponse(known: boolean) {
    if (!current || slideOut) return;

    if (known) {
      sfx.ding();
      vibrate(40, vibrateOn);
      setFlash("green");
      setBurstColor("#22C55E");
      setFloatXp(true);
      setToast(ENCOURAGE[Math.floor(Math.random() * ENCOURAGE.length)]);
      setSlideOut("right");
      setKnownCount((c) => c + 1);
      addXp(10, subject ?? undefined);
      setXpEarned((x) => x + 10);
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

      // advance queue
      setQueue((q) => {
        const remaining = q.slice(idx + 1);
        // re-queue wrong cards at end
        const nextQueue = known ? remaining : [...remaining, q[idx]];
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
    if (dx > 80) handleResponse(true);
    else if (dx < -80) handleResponse(false);
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

  return (
    <AcademyPageShell>
      <AcademyHero
        eyebrow="Active recall"
        title=""
        gradientTitle="Flashcards"
        description="Master concepts through active recall."
        stats={[
          { label: "Completed", value: subject || chapter ? idx : "Ready" },
          { label: "Cards Left", value: subject || chapter ? Math.max(0, remaining) : "Choose" },
          { label: "Mode", value: "Study Deck" },
        ]}
      />

      {!subject ? (
        <div className="space-y-6">
          <div className="grid gap-4 xl:grid-cols-[1.1fr_1fr]">
            <div className="rounded-[2rem] border border-white/[0.08] bg-[#101827]/76 p-5 shadow-[0_18px_70px_rgba(0,0,0,0.24)]">
              <p className="text-xs font-bold uppercase tracking-wide text-[#94A3B8]">
                Continue Studying
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold">Science</h2>
              <p className="mt-1 text-sm text-[#94A3B8]">Bab 7: Udara</p>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6]" />
              </div>
              <p className="mt-3 text-sm font-semibold text-[#94A3B8]">18 cards remaining</p>
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
                ["Recommended", "Science", "Bab 7: Udara", "64 cards"],
                ["Recently Studied", "Mathematics", "Bab 3", "42 cards"],
                ["Popular Deck", "Sejarah", "Bab 2", "30 cards"],
              ].map(([badge, deckSubject, deckChapter, count]) => (
                <div
                  key={badge}
                  className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.05] p-4"
                >
                  <p className="text-xs font-bold uppercase tracking-wide text-accent">{badge}</p>
                  <h3 className="mt-2 font-display text-xl font-bold">{deckSubject}</h3>
                  <p className="text-sm text-[#94A3B8]">
                    {deckChapter} • {count}
                  </p>
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
              setMathFlashcardLang(null);
              setMathFlashcardCategory(null);
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
          {isBilingualSubject && scienceLang && (
            <ScienceLangBar lang={scienceLang} onChange={() => setScienceLang(null)} />
          )}
          <ChapterGrid
            subjectId={subject}
            scienceLang={scienceLang ?? undefined}
            onSelect={(key) => {
              setChapter(key);
              setMathFlashcardLang(null);
              setMathFlashcardCategory(null);
              resetSession();
            }}
            onBack={() => {
              setSubject(null);
              setChapter(null);
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
              setMathFlashcardLang(null);
              setMathFlashcardCategory(null);
              resetSession();
            }}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-4 h-4" /> Back to chapters
          </button>
        </div>
      ) : chapterMeta && !chapterMeta.available ? (
        <ComingSoonScreen
          subjectId={subject}
          chapterKey={chapter}
          scienceLang={isBilingualSubject ? (scienceLang ?? undefined) : undefined}
          onBack={() => {
            setChapter(null);
            setMathFlashcardLang(null);
            setMathFlashcardCategory(null);
          }}
        />
      ) : hasMathFlashcards && !mathFlashcardLang ? (
        <MathFlashcardLanguagePicker
          chapterKey={chapter}
          onBack={() => {
            setChapter(null);
            resetMathFlashcardFlow();
          }}
          onSelect={(lang) => {
            setMathFlashcardLang(lang);
            setMathFlashcardCategory(null);
            resetSession();
          }}
        />
      ) : hasMathFlashcards && mathFlashcardLang && !mathFlashcardCategory ? (
        <MathFlashcardCategoryPicker
          chapterKey={chapter}
          lang={mathFlashcardLang}
          onBack={() => {
            setMathFlashcardLang(null);
            setMathFlashcardCategory(null);
            resetSession();
          }}
          onSelect={selectMathCategory}
        />
      ) : (
        <>
          <ContentHeader
            subjectId={subject}
            chapterKey={chapter}
            scienceLang={isBilingualSubject ? (scienceLang ?? undefined) : undefined}
            onBack={() => {
              if (hasMathFlashcards) {
                setMathFlashcardCategory(null);
                resetSession();
                return;
              }
              setChapter(null);
            }}
          />

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
                      {category.icon} {category[mathFlashcardLang].title}
                    </button>
                  ))}
                </div>
              </div>
            )}

          <div className="glass-strong rounded-2xl p-4 mb-6 flex flex-wrap gap-2 items-center justify-between animate-fade-up">
            <div className="flex flex-wrap gap-2 items-center">
              <select
                value={form}
                onChange={(e) => {
                  setForm(e.target.value);
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
              <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden mb-6">
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
                  onClick={handleFlip}
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                  className={`relative cursor-pointer mx-auto select-none rounded-3xl
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
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      {shimmer && <div className="card-shimmer-overlay" />}
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-semibold text-muted-foreground">
                          {subj?.emoji} {subj?.name} • {current.form}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(current.id);
                          }}
                          className={`p-2 rounded-full ${fav ? "bg-rose-500/20 text-rose-300" : "bg-white/5 text-muted-foreground hover:text-rose-300"}`}
                        >
                          <Heart className={`w-4 h-4 ${fav ? "fill-current" : ""}`} />
                        </button>
                      </div>
                      <div className="flex-1 flex items-center justify-center text-center">
                        <p className="font-display text-3xl sm:text-4xl font-bold leading-tight">
                          {current.front}
                        </p>
                      </div>
                      <p className="text-center text-xs text-muted-foreground">
                        Tap to flip · Swipe → know · Swipe ← don't know
                      </p>
                    </div>
                    {/* back */}
                    <div
                      className="absolute inset-0 glass-strong rounded-3xl p-8 flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden"
                      style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                    >
                      {shimmer && <div className="card-shimmer-overlay" />}
                      <p className="font-display text-2xl sm:text-3xl text-center leading-relaxed">
                        {current.back}
                      </p>
                    </div>
                  </div>

                  {/* Floating XP */}
                  {floatXp && (
                    <div className="pointer-events-none absolute left-1/2 top-6 z-40 animate-xp-float font-display font-bold text-2xl text-emerald-300 drop-shadow-[0_0_12px_rgba(34,197,94,0.7)]">
                      +10 XP
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

              {/* Action row */}
              <div className="mt-10 grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleResponse(false)}
                  className="py-3 rounded-2xl bg-rose-500/15 text-rose-200 hover:bg-rose-500/25 transition flex items-center justify-center gap-2 font-semibold"
                >
                  <X className="w-4 h-4" /> Don't know
                </button>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => go(-1)}
                    className="p-3 rounded-full glass hover:bg-white/10"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-sm text-muted-foreground">
                    {done + 1} / {total}
                  </span>
                  <button
                    onClick={() => go(1)}
                    className="p-3 rounded-full glass hover:bg-white/10"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <button
                  onClick={() => handleResponse(true)}
                  className="py-3 rounded-2xl bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/25 transition flex items-center justify-center gap-2 font-semibold"
                >
                  <Check className="w-4 h-4" /> I know it
                </button>
              </div>

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
