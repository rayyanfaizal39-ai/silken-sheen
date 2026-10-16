import type { Flashcard } from "@/data/content";

// Form 2 Maths Chapter 1: 1.1 Patterns, 1.2 Sequences, 1.3 Patterns and Sequences.
// Each subtopic contains 4 recognition, 11 practice and 5 application/error cards.
// Maintain IDs to preserve existing flashcard progress. Do not regenerate from generic templates.
const cards: ReadonlyArray<readonly [string, string]> = [
  [
    "Which pattern doubles each time: 3, 6, 12, 24 or 3, 6, 9, 12?",
    "3, 6, 12, 24. Multiply each term by 2."
  ],
  [
    "How many dots follow the triangular pattern 1, 3, 6, 10, ...?",
    "15 dots. Add 5 to the previous 10."
  ],
  [
    "In Pascal's Triangle, what sits below 3 and 3?",
    "6, because adjacent entries above are added."
  ],
  [
    "For 1, 1, 2, 3, 5, 8, which rule gives the next term?",
    "Add the preceding two terms."
  ],
  [
    "Continue: −8, −3, 2, 7, __.",
    "12. Add 5 each time."
  ],
  [
    "Find the next two terms: 96, 48, 24, __, __.",
    "12, 6. Divide by 2 repeatedly."
  ],
  [
    "Continue: 2.5, 2.0, 1.5, __, __.",
    "1.0, 0.5. Subtract 0.5 each time."
  ],
  [
    "Find the 6th term: 4, 9, 14, 19, ...",
    "29. The 5th term is 24; the 6th is 29."
  ],
  [
    "What comes after 5, 15, 45, 135?",
    "405. Multiply by 3."
  ],
  [
    "Complete: −12, −6, 0, __, 12.",
    "6. Add 6 each time."
  ],
  [
    "Pascal's Triangle: complete 1, 4, __, 4, 1.",
    "6. Add 3 + 3 from the preceding row."
  ],
  [
    "What is the next triangular number after 21?",
    "28. The successive differences are 2, 3, 4, 5, 6, 7."
  ],
  [
    "Continue the Fibonacci pattern: 2, 3, 5, 8, 13, __.",
    "21. Add the previous two terms."
  ],
  [
    "Find the missing term: 81, 27, __, 3, 1.",
    "9. Divide by 3 each time."
  ],
  [
    "What follows: 1, 4, 9, 16, 25, __?",
    "36 = 6². The terms are consecutive square numbers."
  ],
  [
    "A student says 4, 8, 16, 32 follows +4. Correct?",
    "No. The rule is ×2, not +4."
  ],
  [
    "Spot the error: 1, 3, 6, 10, 14 are triangular numbers.",
    "The fifth term is 15, not 14 (add 5 to 10)."
  ],
  [
    "A student calculates Fibonacci 3, 5, 8, 13, 20. Fix it.",
    "The next term is 21, because 8 + 13 = 21."
  ],
  [
    "A tile design adds 4 tiles per stage. Stage 1 has 5. Stage 4?",
    "17 tiles: 5 + 3 × 4."
  ],
  [
    "A plant grows 2 cm weekly from 6 cm. Height after 4 weeks?",
    "14 cm: 6 + 4 × 2."
  ],
  [
    "Which is arithmetic: 2, 5, 8, 11 or 2, 4, 8, 16?",
    "2, 5, 8, 11. The difference is constantly +3."
  ],
  [
    "Does 50, 40, 30, 20 have a constant difference?",
    "Yes. Each consecutive difference is −10."
  ],
  [
    "Which term position is immediately before T₈?",
    "T₇, the seventh term."
  ],
  [
    "Sequence 1, 4, 9, 16: which visual model fits?",
    "Squares of side lengths 1, 2, 3, 4."
  ],
  [
    "Complete: 7, 11, __, 19, 23.",
    "15. Common difference = 4."
  ],
  [
    "Find T₇ if T₁ = 3 and the difference is +5.",
    "33: 3 + 6(5)."
  ],
  [
    "Find T₆: 90, 82, 74, ...",
    "50: 90 − 5(8)."
  ],
  [
    "Find T₅: 2, 6, 18, 54, ...",
    "162: multiply by 3 four times from T₁."
  ],
  [
    "What is T₄ in 64, 32, 16, ...?",
    "8. Halve each term."
  ],
  [
    "The sequence starts −5 and adds 7. Find T₄.",
    "16: −5 + 3(7)."
  ],
  [
    "Find the missing term: 3, __, 15, 21, 27.",
    "9. Each term increases by 6."
  ],
  [
    "Find T₁₀ if T₁ = 2 and common difference = 3.",
    "29: 2 + 9(3)."
  ],
  [
    "Find the position of 25 in 5, 9, 13, 17, ...",
    "T₆. Solve 5 + 4(n−1) = 25."
  ],
  [
    "Find T₆: 1.2, 2.4, 3.6, ...",
    "7.2. Add 1.2 five times to T₁."
  ],
  [
    "A sequence decreases by 6: 31, 25, 19, ... Find T₈.",
    "−11: 31 − 7(6)."
  ],
  [
    "Spot the error: 5, 10, 15, ... has T₆ = 25.",
    "Incorrect. T₆ = 30."
  ],
  [
    "Why is 2, 5, 9, 14 not an arithmetic sequence?",
    "Differences are 3, 4, 5, not a constant."
  ],
  [
    "A student finds T₅ = 20 for 3, 7, 11, ... Correct?",
    "No. T₅ = 19: 3, 7, 11, 15, 19."
  ],
  [
    "Bus departures every 15 minutes start 08:00. Fifth departure?",
    "09:00. Four intervals pass after the first departure."
  ],
  [
    "A game scores 10, 15, 20 points in rounds 1–3. Round 8?",
    "45 points: 10 + 7(5)."
  ],
  [
    "For 4, 7, 10, 13, ... what is the common difference?",
    "3."
  ],
  [
    "Which formula gives 4, 7, 10, 13 when n starts at 1?",
    "Tₙ = 3n + 1."
  ],
  [
    "Which expression represents the 1st, 2nd, 3rd terms: 2n + 3?",
    "5, 7, 9 for n = 1, 2, 3."
  ],
  [
    "For Tₙ = 5n − 2, what is T₁?",
    "3: 5(1) − 2."
  ],
  [
    "Find T₈ for Tₙ = 3n + 4.",
    "28: 3(8) + 4."
  ],
  [
    "Find a formula for 6, 10, 14, 18, ...",
    "Tₙ = 4n + 2, where n starts at 1."
  ],
  [
    "Find a formula for 12, 9, 6, 3, ...",
    "Tₙ = 15 − 3n, where n starts at 1."
  ],
  [
    "Which term is 41 in Tₙ = 4n + 1?",
    "T₁₀: 4n + 1 = 41, so n = 10."
  ],
  [
    "Tₙ = 2n − 7. Find T₆.",
    "5: 2(6) − 7."
  ],
  [
    "Tₙ = 7n. What is the sum of T₁ and T₄?",
    "35: 7 + 28."
  ],
  [
    "The nth term is 5n + 2. Find the 12th term.",
    "62: 5(12) + 2."
  ],
  [
    "Find n if Tₙ = 3n − 1 and Tₙ = 20.",
    "n = 7: 3n − 1 = 20."
  ],
  [
    "A hall has 8 seats in row 1, then +2 per row. Row 10?",
    "26 seats: 8 + 9(2)."
  ],
  [
    "A staircase has 3, 6, 9, 12 blocks. Formula for stage n?",
    "3n blocks."
  ],
  [
    "A student uses Tₙ = 4n + 4 for 4, 8, 12, ... Fix it.",
    "Tₙ = 4n if the first term is n = 1."
  ],
  [
    "For 1, 9, 17, ... is Tₙ = 1 + 8n correct with n = 1?",
    "No. Use Tₙ = 8n − 7, or 1 + 8n with n = 0."
  ],
  [
    "Spot the mistake: T₅ of 3n + 2 is 3 + 5 + 2.",
    "Substitute n = 5: 3(5) + 2 = 17."
  ],
  [
    "Ticket prices rise RM2 each year from RM10 in year 1. Year 6?",
    "RM20: 10 + 5(2)."
  ],
  [
    "A savings plan deposits RM5 in week 1, then +RM3 weekly. Week 8?",
    "RM26: 5 + 7(3)."
  ],
  [
    "Is 2n + 1 an odd number for every whole n ≥ 0?",
    "Yes. Twice a whole number is even; adding 1 makes it odd."
  ]
];

export const mathF2C1FlashcardsDLP: Flashcard[] = cards.map(([front, back], index) => ({
  id: `math-f2-c1-dlp-f${index + 1}`,
  subjectId: "math",
  form: "Form 2",
  chapter: "Chapter 1",
  lang: "dlp",
  front,
  back,
}));
