import type { MathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";

/**
 * Form 1 Mathematics — Chapter 11, Sets.
 * Each diagram draws ξ and the set exactly as the question STATES it. The
 * region outside the circle is left empty: its elements are A′, which is
 * what these questions ask the student to find. Sets described only by a rule
 * (e.g. "perfect squares") are not drawn, because listing their members is the
 * student's work. Both BM and DLP questions reference identical data.
 */
const single = (setName: "A" | "B", inside: string[], bm: string, dlp: string) => ({
  kind: "venn-one-set" as const,
  title: { bm, dlp },
  setName,
  inside,
  outside: [] as string[],
});

export const MATH_F1_C11_QUIZ_VISUALS = {
  structure: single("A", [], "Rajah Venn: ξ dan A", "Venn diagram: ξ and A"),

  oddNumbers: single("A", ["1", "3", "5", "7", "9"],
    "Set A dalam ξ = {1,…,10}", "Set A in ξ = {1,…,10}"),

  letterB: single("B", ["a", "c", "e", "g"],
    "Set B dalam ξ = {a,b,c,d,e,f,g,h}", "Set B in ξ = {a,b,c,d,e,f,g,h}"),

  smallEvens: single("A", ["2", "4", "6"],
    "Set A dalam ξ = {1,…,10}", "Set A in ξ = {1,…,10}"),

  lettersA: single("A", ["a", "c", "e", "g"],
    "Set A dalam ξ = {a,b,c,d,e,f,g}", "Set A in ξ = {a,b,c,d,e,f,g}"),

  firstFour: single("A", ["1", "2", "3", "4"],
    "Set A dalam ξ = {1,…,10}", "Set A in ξ = {1,…,10}"),
} satisfies Record<string, MathQuestionVisual>;
