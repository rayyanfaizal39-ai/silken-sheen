import type { Flashcard } from "@/data/content";

type FlashcardSeed = [string, string];

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `math-f3-c2-dlp-f${index + 1}`,
    subjectId: "math",
    form: "Form 3",
    chapter: "Chapter 2",
    lang: "dlp",
    front,
    back,
  }));
}

export const mathF3C2FlashcardsDLP: Flashcard[] = buildFlashcards([
  // Deck 1: Significant Figures (Cards 1-20)
  ["What is a significant figure?", "A digit that indicates the level of accuracy of a measurement."],
  ["Are all non-zero digits significant?", "Yes"],
  ["Is a zero between two non-zero digits significant?", "Yes"],
  ["Is a zero before the first non-zero digit in a decimal significant?", "No"],
  ["Is a trailing zero in a whole number significant?", "No, unless the accuracy level is stated"],
  ["How many s.f. in 2 763?", "4 s.f."],
  ["How many s.f. in 60 007?", "5 s.f."],
  ["How many s.f. in 50.0042?", "6 s.f."],
  ["How many s.f. in 0.007?", "1 s.f."],
  ["How many s.f. in 0.005020?", "4 s.f."],
  ["Round 63 479 to 2 s.f.", "63 000"],
  ["Round 2 476 to 2 s.f.", "2 500"],
  ["Round 6 953 to 2 s.f.", "7 000"],
  ["Round 0.008025 to 3 s.f.", "0.00803"],
  ["Round 0.008025 to 2 s.f.", "0.0080"],
  ["What is the difference between s.f. and decimal places?", "s.f. counts significant digits; decimal places count digits after the decimal point"],
  ["Round 38 279 to the nearest hundred.", "38 300"],
  ["Round 38 279 to the nearest thousand.", "38 000"],
  ["What is a common mistake with s.f. in decimals?", "Counting leading zeros as significant"],
  ["What is a tip when rounding to s.f.?", "Underline the required significant digit first"],

  // Deck 2: Standard Form - Writing (Cards 21-40)
  ["What is the standard form format?", "A x 10^n, with 1 ≤ A < 10, n an integer"],
  ["Convert 28 to standard form.", "2.8 x 10^1"],
  ["Convert 280 to standard form.", "2.8 x 10^2"],
  ["Convert 2 805.3 to standard form.", "2.8053 x 10^3"],
  ["Convert 0.03025 to standard form.", "3.025 x 10^-2"],
  ["Convert 0.003005 to standard form.", "3.005 x 10^-3"],
  ["Convert 4.17 x 10^5 to a single number.", "417 000"],
  ["Convert 8.063 x 10^-5 to a single number.", "0.00008063"],
  ["What is the sign of n if the number is ≥ 10?", "Positive"],
  ["What is the sign of n if the number is < 1?", "Negative"],
  ["What is the value of A in 9.5 x 10^9?", "9.5"],
  ["Why is standard form used in science?", "It simplifies writing very large/small numbers"],
  ["Give an example of standard form used in astronomy.", "Distances between stars/planets"],
  ["What does the prefix 'nano' mean?", "0.000 000 001 or 10^-9"],
  ["What does the prefix 'giga' mean?", "1 000 000 000 or 10^9"],
  ["Find 3050 terabytes in bytes, in standard form.", "3.05 x 10^15 bytes"],
  ["What law combines powers of 10 during multiplication?", "am x an = a^(m+n)"],
  ["What is the valid range of A in standard form?", "1 ≤ A < 10"],
  ["Is 12.5 x 10^3 valid standard form?", "No, because A=12.5 is not within the range 1-10"],
  ["Convert 35 to standard form.", "3.5 x 10^1"],

  // Deck 3: Operations and Problem Solving (Cards 41-60)
  ["What condition is needed to add/subtract standard form numbers?", "The powers of 10 must be the same"],
  ["Formula for adding standard form numbers (same power).", "S x10^n + T x10^n = (S+T) x10^n"],
  ["Formula for multiplying standard form numbers.", "(Sx10^m) x (Tx10^n) = (SxT) x10^(m+n)"],
  ["Formula for dividing standard form numbers.", "(Sx10^m) ÷ (Tx10^n) = (S÷T) x10^(m-n)"],
  ["Calculate 2.73x10^3 + 5.92x10^3.", "8.65 x 10^3"],
  ["Calculate 7.02x10^4 + 2.17x10^5.", "2.872 x 10^5"],
  ["Calculate 9.45x10^6 - 3.24x10^5.", "9.126 x 10^6"],
  ["Calculate 3x10^5 x 4.9x10^2.", "1.47 x 10^8"],
  ["Calculate (5.9x10^5) ÷ (2x10^2).", "2.95 x 10^3"],
  ["What is the first step in adding standard form numbers with different powers?", "Equalise the powers of 10 first"],
  ["What is a common mistake when adding standard form numbers?", "Adding the powers of 10 when they should only be equalised"],
  ["Right-angled triangle PQR, PR=3.5x10^2m, QR=2.1x10^2m. Find PQ.", "2.8 x 10^2 m (Pythagoras' Theorem)"],
  ["Find the area of ΔPQR if PQ=2.8x10^2m, QR=2.1x10^2m with the right angle at Q.", "2.94 x 10^4 m^2"],
  ["If land costs RM45/m^2 and the area is 2.94x10^4m^2, find the total cost.", "RM1 323 000"],
  ["What is a tip for checking standard form after calculation?", "Make sure A is within the range 1 ≤ A < 10"],
  ["Give one application of standard form in IT.", "Data storage capacity (terabytes, gigabytes)"],
  ["What is Earth's radius if the diameter is 1.2742x10^4 km?", "6.371 x 10^3 km"],
  ["What is the formula for the surface area of a sphere?", "4πr^2, r is the radius"],
  ["What is a common mistake when multiplying standard form numbers?", "Forgetting to add the indices of the powers of 10"],
  ["What is the final step after calculating in standard form?", "Round to the required significant figures and ensure the A x 10^n format is valid"],
]);
