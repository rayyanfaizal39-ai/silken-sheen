import type { StructuredNotes } from "@/data/types";

export const mathF3C2NotesDLP: StructuredNotes = {
  chapterSummary:
    "Chapter 2 Standard Form helps students explain the meaning of significant figures and determine their count, round numbers to a given number of significant figures, recognise and write numbers in standard form, perform basic arithmetic operations (addition, subtraction, multiplication, division) involving standard form, and solve problems involving standard form.",
  quickRevision: [
    "Significant figures indicate the level of accuracy of a measurement.",
    "A zero between two non-zero digits is significant; a zero before the first non-zero digit in a decimal is not significant.",
    "Standard form is written as A x 10^n, with 1 ≤ A < 10 and n an integer.",
    "For addition/subtraction in standard form, the powers of 10 must be equalised first.",
    "For multiplication/division in standard form, multiply/divide the A values and apply the laws of indices to the powers of 10.",
  ],
  keyExamFacts: [
    "Standard form: A x 10^n, with 1 ≤ A < 10, n an integer.",
    "A zero between non-zero digits is a significant figure.",
    "For decimals, all digits before the first non-zero digit are not significant.",
    "Addition/subtraction in standard form: equalise the powers of 10 first, e.g. S x10^n + T x10^n = (S+T) x10^n.",
    "Multiplication in standard form: (S x10^m) x (T x10^n) = (SxT) x10^(m+n); division: (S x10^m) ÷ (T x10^n) = (S÷T) x10^(m-n).",
  ],
  keyTerms: ["significant figure", "standard form", "estimation", "round off", "approximation", "accuracy"],
  sections: [
    {
      title: "Learning Outcomes",
      subsections: [
        {
          content: "By the end of this chapter, students should be able to:",
          bulletPoints: [
            "Explain the meaning of significant figures and determine the number of significant figures of a number.",
            "Round a number to a given number of significant figures.",
            "Recognise and write numbers in standard form.",
            "Perform basic arithmetic operations involving numbers in standard form.",
            "Solve problems involving numbers in standard form.",
          ],
        },
      ],
    },
    {
      title: "2.1 Significant Figures",
      subsections: [
        {
          title: "2.1.1 Understanding Significant Figures - Simple Explanation",
          content:
            "A significant figure (s.f.) is a digit in a number that gives information about the level of accuracy of a measurement. The number of significant figures is determined by the position of zero digits in the number.",
        },
        {
          title: "Key Concepts",
          bulletPoints: [
            "All non-zero digits are significant.",
            "A zero between two non-zero digits is significant.",
            "For a decimal, all digits before the first non-zero digit are not significant.",
            "For a whole number, trailing zeros are not considered significant unless the accuracy level is stated.",
          ],
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Number", "Number of Significant Figures", "Reason"],
            rows: [
              ["2 763", "4 s.f.", "All non-zero digits"],
              ["60 007", "5 s.f.", "Zeros between non-zero digits are significant"],
              ["50.0042", "6 s.f.", "All zeros in this decimal are between non-zero digits"],
              ["0.007", "1 s.f.", "Zeros before the first non-zero digit are not significant"],
              ["0.005020", "4 s.f.", "Trailing zero after the decimal point is significant"],
              ["15 000 (2 s.f.)", "2 s.f.", "Trailing zeros in a whole number are only significant if the accuracy level is stated"],
            ],
          },
        },
        {
          title: "2.1.2 Rounding to Significant Figures - Simple Explanation",
          content:
            "To round a number to n significant figures, identify the nth digit from the first significant digit, then apply normal rounding rules (round up if the next digit is ≥ 5).",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              ["Round 63 479 to 2 s.f.", "2nd digit is 3; next digit (4) < 5, no change; replace rest with zeros", "63 000"],
              ["Round 2 476 to 2 s.f.", "2nd digit is 4; next digit (7) ≥ 5, add 1 to make 5", "2 500"],
              ["Round 0.008025 to 3 s.f.", "Significant digits: 8,0,2; next digit (5) ≥ 5, add 1 to 2", "0.00803"],
              ["Round 0.008025 to 2 s.f.", "Significant digits: 8,0; next digit (2) < 5, no change", "0.0080"],
            ],
          },
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "Always identify the first significant digit before counting significant figures.",
            "Rounding to significant figures differs from rounding to decimal places or place value.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Counting zeros before the first non-zero digit in a decimal as significant.",
            "Forgetting to replace remaining digits with zeros after rounding a whole number.",
            "Confusing the number of significant figures with the number of decimal places.",
          ],
        },
        {
          title: "Exam Tips",
          bulletPoints: [
            "Underline the required significant digit before rounding to avoid mistakes.",
            "For whole numbers, the decimal point is considered to be after the last digit.",
            "Recheck the number of significant figures after rounding is complete.",
          ],
        },
      ],
    },
    {
      title: "2.2 Standard Form",
      subsections: [
        {
          title: "2.2.1 Writing Numbers in Standard Form - Simple Explanation",
          content:
            "Standard form is a way of writing a single number as A x 10^n, where 1 ≤ A < 10 and n is an integer. It simplifies writing very large or very small numbers.",
        },
        {
          title: "Formula Box",
          formula: "Single number = A x 10^n, with 1 ≤ A < 10, n an integer",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              ["Convert 280 to standard form", "Place the decimal point after the first significant digit, count the shift (2)", "2.8 x 10^2"],
              ["Convert 2 805.3 to standard form", "Shift the decimal point 3 places left", "2.8053 x 10^3"],
              ["Convert 0.03025 to standard form", "Shift the decimal point 2 places right, n negative", "3.025 x 10^-2"],
              ["Convert 0.003005 to standard form", "Shift the decimal point 3 places right", "3.005 x 10^-3"],
              ["Convert 4.17 x 10^5 to a single number", "Shift the decimal point 5 places right", "417 000"],
              ["Convert 8.063 x 10^-5 to a single number", "Shift the decimal point 5 places left", "0.00008063"],
            ],
          },
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "A number ≥ 10 has a positive index n; a number < 1 has a negative index n.",
            "The index law am x an = a^(m+n) is often used when combining units, e.g. terabytes and bytes.",
            "Metric prefixes (kilo, mega, giga, milli, micro, nano) are closely related to powers of 10.",
          ],
        },
        {
          title: "2.2.2 Basic Operations in Standard Form - Simple Explanation",
          content:
            "Addition and subtraction require the same power of 10; multiplication and division use index laws on the powers of 10 separately from the A values.",
        },
        {
          title: "Formula Box",
          formula:
            "S x10^n + T x10^n = (S+T) x10^n\nS x10^n - T x10^n = (S-T) x10^n\n(S x10^m) x (T x10^n) = (SxT) x10^(m+n)\n(S x10^m) ÷ (T x10^n) = (S÷T) x10^(m-n)",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              ["Calculate 7.02 x10^4 + 2.17 x10^5", "Equalise powers: 7.02x10^4 + 21.7x10^4 = 28.72x10^4", "2.872 x 10^5"],
              ["Calculate 9.45 x10^6 - 3.24 x10^5", "Equalise powers: 94.5x10^5 - 3.24x10^5 = 91.26x10^5", "9.126 x 10^6"],
              ["Calculate 3 x10^5 x 4.9 x10^2", "Multiply A values: 3x4.9=14.7; add indices: 5+2", "1.47 x 10^8"],
              ["Calculate (5.9 x10^5) ÷ (2 x10^2)", "Divide A values: 5.9÷2=2.95; subtract indices: 5-2", "2.95 x 10^3"],
            ],
          },
        },
        {
          title: "2.2.3 Solving Problems in Standard Form - Simple Explanation",
          content:
            "Real-life problems such as distances between planets, material thickness, data storage capacity and land area often use standard form to simplify calculation and writing.",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              [
                "Find 3 050 terabytes in bytes, state the answer in standard form",
                "3 050 terabytes = 3.05x10^3 x 10^12 bytes; apply am x an = a^(m+n)",
                "3.05 x 10^15 bytes",
              ],
              [
                "Right-angled triangular plot PQR: PR=3.5x10^2 m, QR=2.1x10^2 m. Find PQ.",
                "Use Pythagoras' Theorem: PQ^2 = (3.5x10^2)^2 - (2.1x10^2)^2 = 7.84x10^4",
                "PQ = 2.8 x 10^2 m",
              ],
            ],
          },
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "When adding/subtracting, convert one number so the powers of 10 match before combining the A values.",
            "When multiplying/dividing, handle the A values and powers of 10 separately, then recombine into standard form.",
            "The final answer must always be in the form A x 10^n with 1 ≤ A < 10.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Attempting to add/subtract standard form numbers without equalising the powers of 10 first.",
            "Mistakenly adding the powers of 10 during addition/subtraction, when powers are only added during multiplication.",
            "Final answer not in standard form (A not within the range 1 to less than 10).",
          ],
        },
        {
          title: "Exam Tips",
          bulletPoints: [
            "Always recheck that the A value is within 1 ≤ A < 10 after calculation.",
            "Use the laws of indices (am x an = am+n, am ÷ an = am-n) to simplify operations on powers of 10.",
            "Round the final answer to the number of significant figures stated in the question.",
          ],
        },
        {
          title: "Real-Life Applications",
          bulletPoints: [
            "Astronomy: distances between planets and stars are written in standard form (e.g. light years).",
            "Science and engineering: very small measurements such as nanometres and micrometres.",
            "Information technology: data storage capacity such as terabytes and gigabytes.",
          ],
        },
        {
          title: "Summary",
          bulletPoints: [
            "Significant figures indicate the level of accuracy of a measurement.",
            "Standard form: A x 10^n, 1 ≤ A < 10, n an integer.",
            "Addition/subtraction: equalise the powers of 10 first.",
            "Multiplication/division: handle the A values and powers of 10 separately using index laws.",
          ],
        },
      ],
    },
  ],
};
