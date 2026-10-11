import type { MathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";

/**
 * Form 1 Mathematics — Chapter 11, Sets.
 * These diagrams show the GIVEN memberships inside a rectangular universal set.
 * They never print A′, B′, the complement count or a solved answer.
 * Both BM and DLP questions reference identical mathematical data.
 */
const single = (setName: "A" | "B", inside: string[], outside: string[],
  bm: string, dlp: string) => ({
  kind: "venn-one-set" as const,
  title: { bm, dlp },
  setName,
  inside,
  outside,
});

export const MATH_F1_C11_QUIZ_VISUALS = {
  structure: single("A", [], [],
    "Set A dalam set semesta ξ", "Set A inside universal set ξ"),

  oddNumbers: single("A", ["1", "3", "5", "7", "9"],
    ["2", "4", "6", "8", "10"],
    "Set A: nombor ganjil", "Set A: odd numbers"),

  letterB: single("B", ["a", "c", "e", "g"],
    ["b", "d", "f", "h"],
    "Set B dalam ξ = {a,b,c,d,e,f,g,h}", "Set B in ξ = {a,b,c,d,e,f,g,h}"),

  smallEvens: single("A", ["2", "4", "6"],
    ["1", "3", "5", "7", "8", "9", "10"],
    "Set A dalam ξ = {1,…,10}", "Set A in ξ = {1,…,10}"),

  perfectSquares: single("A", ["1", "4", "9"],
    ["2", "3", "5", "6", "7", "8", "10"],
    "Set A: kuasa dua sempurna", "Set A: perfect squares"),

  oddToFifteen: single("A", ["1", "3", "5", "7", "9", "11", "13", "15"],
    ["2", "4", "6", "8", "10", "12", "14"],
    "Nombor ganjil dari 1 hingga 15", "Odd numbers from 1 to 15"),

  lettersA: single("A", ["a", "c", "e", "g"],
    ["b", "d", "f"],
    "Set A dalam ξ = {a,b,c,d,e,f,g}", "Set A in ξ = {a,b,c,d,e,f,g}"),

  firstFour: single("A", ["1", "2", "3", "4"],
    ["5", "6", "7", "8", "9", "10"],
    "Set A dalam ξ = {1,…,10}", "Set A in ξ = {1,…,10}"),

  matematikVowels: single("A", ["A", "E", "I"],
    ["M", "T", "K"],
    "Huruf unik dalam MATEMATIK", "Distinct letters in MATEMATIK"),
} satisfies Record<string, MathQuestionVisual>;
