import type { Flashcard } from "@/data/content";

type FlashcardSeed = [string, string];

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `math-f3-c1-dlp-f${index + 1}`,
    subjectId: "math",
    form: "Form 3",
    chapter: "Chapter 1",
    lang: "dlp",
    front,
    back,
  }));
}

export const mathF3C1FlashcardsDLP: Flashcard[] = buildFlashcards([
  // Deck 1: Index Notation (Cards 1-20)
  ["What does an mean?", "a multiplied by itself n times (repeated multiplication)."],
  ["What is a called in an?", "The base."],
  ["What is n called in an?", "The index or power."],
  ["Write 5x5x5x5x5x5 in index form.", "5^6"],
  ["Write (-2)x(-2)x(-2) in index form.", "(-2)^3"],
  ["What is the value of 4^3?", "64"],
  ["What is the value of 5^4?", "625"],
  ["What is the value of (-7)^3?", "-343"],
  ["How do you convert 64 to index form with base 2?", "Divide repeatedly by 2: 64=2^6"],
  ["How do you convert 64 to index form with base 4?", "64 = 4^3"],
  ["How can the value of an be found without a calculator?", "The repeated multiplication method"],
  ["What is a common mistake when writing 34?", "Mistakenly writing it as 4x4x4 instead of 3x3x3x3"],
  ["Why are brackets important for a negative base?", "(-2)^3 differs from -2^3"],
  ["What is the value of -2^3 (no brackets on the base)?", "-8 (negate after computing 2^3)"],
  ["What does m^7 mean?", "m multiplied by itself 7 times"],
  ["Write (0.3)x(0.3)x(0.3)x(0.3) in index form.", "(0.3)^4"],
  ["How many factors are in n^8?", "8 factors of n"],
  ["What tool verifies the value of an?", "A scientific calculator (^ button)"],
  ["What is the base if 81 is written as 3^4?", "3"],
  ["What is the index if 81 = 3^4?", "4"],

  // Deck 2: Multiplication, Division and Power of a Power Laws (Cards 21-40)
  ["What is the multiplication law of indices?", "am x an = a^(m+n), same base"],
  ["What is the division law of indices?", "am ÷ an = a^(m-n), same base"],
  ["What is the power of a power law?", "(am)n = a^(mn)"],
  ["Simplify 7^2 x 7^3.", "7^5"],
  ["Simplify 4^5 ÷ 4^2.", "4^3"],
  ["Simplify (3^4)^2.", "3^8"],
  ["Simplify 2k^2 x 4k^3.", "8k^5"],
  ["Simplify m^3 x n^2 x m^4 x n^5.", "m^7 n^7"],
  ["Simplify 25x^2y^3 ÷ 5xy.", "5xy^2"],
  ["Simplify (p^2q^3r)^4.", "p^8q^12r^4"],
  ["Simplify (5m^4n^3)^2.", "25m^8n^6"],
  ["Simplify m^7 ÷ m^2 ÷ m^4.", "m"],
  ["What condition is needed to use the addition/subtraction index laws?", "The bases must be the same"],
  ["Simplify h^3 x h^10.", "h^13"],
  ["Is (4^2)^3 = (4^3)^2?", "Yes, both equal 4^6"],
  ["Simplify -25h^4 ÷ 5h^2 ÷ h.", "-5h"],
  ["What is a common mistake with am x an?", "Mistakenly adding the bases instead of the indices"],
  ["Simplify (0.2)^2 x (0.2)^4 x (0.2)^5.", "(0.2)^11"],
  ["Simplify (-3x)^3.", "-27x^3"],
  ["What is the general formula for the power of a power law applied twice, ((am)n)p?", "a^(mnp)"],

  // Deck 3: Zero, Negative and Fractional Indices (Cards 41-60)
  ["What is the value of a0 (a≠0)?", "1"],
  ["What is another form of a-n?", "1/an"],
  ["What is another form of (a/b)-n?", "(b/a)n"],
  ["Express a^(-2) with a positive index.", "1/a^2"],
  ["Express (2/5)^(-10) with a positive index.", "(5/2)^10"],
  ["Evaluate 2^3 ÷ 2^5.", "1/4"],
  ["What does a^(1/n) mean?", "The nth root of a"],
  ["What does a^(m/n) mean?", "The nth root of a^m, or (the nth root of a)^m"],
  ["What is the cube root of 8?", "2"],
  ["Convert 81^(3/4) to root form and evaluate.", "(fourth root of 81)^3 = 27"],
  ["What is the value of 2m^(-3) with a positive index?", "2/m^3"],
  ["Convert 8^(1/3) to root form and evaluate.", "Cube root of 8 = 2"],
  ["How do you prove a0=1?", "an ÷ an = a^(n-n) = a^0, and an÷an = 1"],
  ["How do you prove a-n=1/an?", "a^0 ÷ a^n = a^(-n), and a^0÷a^n=1/a^n"],
  ["What is a common mistake with a-n?", "Thinking it is negative in value, when it is actually a reciprocal"],
  ["Solve 3^x x 9^(x+5) ÷ 3^4 = 1 for x.", "x = -2"],
  ["What is the first step in solving an index equation?", "Equate the bases on both sides"],
  ["What is the second step after the bases are equal?", "Equate the indices and solve the equation"],
  ["Give one real-life application of index form.", "Population/bacteria growth or compound interest"],
  ["What is a tip for checking index answers?", "Substitute small values to confirm the law used is correct"],
]);
