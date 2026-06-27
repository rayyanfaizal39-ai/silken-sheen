import type { StructuredNotes } from "@/data/types";

export const mathF3C1NotesDLP: StructuredNotes = {
  chapterSummary:
    "Chapter 1 Index helps students represent repeated multiplication in index form, apply the laws of indices (multiplication, division, power of a power, zero index, negative index and fractional index) to simplify calculations, and solve equations and problems involving indices.",
  quickRevision: [
    "an means a multiplied by itself n times; a is the base and n is the index/power.",
    "Multiplication Law: am x an = am+n (bases must be the same).",
    "Division Law: am ÷ an = am-n (bases must be the same).",
    "Power of a Power Law: (am)n = amn.",
    "Zero Index: a0 = 1, where a ≠ 0.",
    "Negative Index: a-n = 1/an, and (a/b)-n = (b/a)n.",
    "Fractional Index: a1/n = nth root of a, and am/n = nth root of am = (nth root of a)m.",
  ],
  keyExamFacts: [
    "an = a x a x ... x a (n factors); a is the base, n is the index.",
    "am x an = a^(m+n); am ÷ an = a^(m-n); (am)n = a^(mn).",
    "a0 = 1 for a ≠ 0; a-n = 1/an; (a/b)-n = (b/a)n.",
    "a1/n = nth root of a; am/n = nth root of am.",
    "All index laws are only valid when the bases are the same.",
    "Index equations are solved by equating the bases, then equating the indices.",
  ],
  keyTerms: ["base", "index", "power", "root", "negative index", "fractional index", "zero index"],
  sections: [
    {
      title: "Learning Outcomes",
      subsections: [
        {
          content: "By the end of this chapter, students should be able to:",
          bulletPoints: [
            "Represent repeated multiplication in index form and describe its meaning.",
            "Convert a number to index form and vice versa.",
            "Relate the multiplication and division of numbers in index form with the same base.",
            "Relate the index form (am)n to repeated multiplication.",
            "Verify a0 = 1 and a-n = 1/an.",
            "Relate fractional indices to roots and powers.",
            "Perform basic operations involving the laws of indices.",
            "Solve problems involving indices.",
          ],
        },
      ],
    },
    {
      title: "1.1 Index Notation",
      subsections: [
        {
          title: "1.1.1 Index Form - Simple Explanation",
          content:
            "Repeated multiplication of a number or algebraic term can be written shortly using index form an, where a is the base and n is the index (power). an means a is multiplied by itself n times.",
        },
        {
          title: "Key Concepts",
          bulletPoints: [
            "an is read as 'a to the power of n' or 'a raised to n'.",
            "a is the base, n is the index or power.",
            "The value of an can be found through repeated multiplication or a scientific calculator.",
            "Any number can be converted to index form using repeated division (finding a common base, e.g. 64 = 26 = 43 = 82).",
          ],
        },
        {
          title: "Formula Box",
          formula:
            "an = a x a x a x ... x a (n factors)\nExample: 5 x 5 x 5 x 5 x 5 x 5 = 5^6",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              ["Write 0.3 x 0.3 x 0.3 x 0.3 in index form", "4 factors of 0.3 multiplied", "(0.3)^4"],
              ["Write (-2) x (-2) x (-2) in index form", "3 factors of (-2) multiplied", "(-2)^3"],
              ["Write m x m x m x m x m x m x m in index form", "7 factors of m multiplied", "m^7"],
              ["Write 64 in index form with base 2", "64 divided repeatedly by 2: 64,32,16,8,4,2,1 (6 steps)", "64 = 2^6"],
            ],
          },
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "The number of factors multiplied equals the value of the index.",
            "The base can be a positive number, negative number, fraction, decimal, or variable.",
            "Repeated division helps convert a number into index form with a chosen base.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Confusing the base with the index, e.g. writing 34 as 4 x 4 x 4.",
            "Forgetting the negative sign when the base is negative, e.g. (-2)^3 differs from -2^3.",
            "Miscounting the number of factors when converting to index form.",
          ],
        },
        {
          title: "Exam Tips",
          bulletPoints: [
            "Always count the factors carefully to determine the index value.",
            "Use brackets for negative or fractional bases, e.g. (-2)^3, (1/4)^3.",
            "Verify answers using the power (^) button on a scientific calculator.",
          ],
        },
      ],
    },
    {
      title: "1.2 Laws of Indices",
      subsections: [
        {
          title: "1.2.1 Multiplication Law of Indices - Simple Explanation",
          content:
            "When two numbers in index form with the same base are multiplied, the indices are added: am x an = am+n.",
        },
        {
          title: "Key Concepts",
          bulletPoints: [
            "This law is only valid when the bases are the same.",
            "It also applies to algebraic terms, e.g. 2k2 x 4k3 = 8k5.",
          ],
        },
        {
          title: "Formula Box",
          formula: "am x an = a^(m+n)",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              ["Simplify 7^2 x 7^3", "Add indices: 2 + 3", "7^5"],
              ["Simplify 2k^2 x 4k^3", "Multiply coefficients: 2x4=8; add indices: 2+3=5", "8k^5"],
              ["Simplify m^3 x n^2 x m^4 x n^5", "Group same bases: m^(3+4) x n^(2+5)", "m^7 x n^7"],
            ],
          },
        },
        {
          title: "1.2.2 Division Law of Indices - Simple Explanation",
          content:
            "When two numbers in index form with the same base are divided, the indices are subtracted: am ÷ an = am-n.",
        },
        {
          title: "Formula Box",
          formula: "am ÷ an = a^(m-n)",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              ["Simplify 4^5 ÷ 4^2", "Subtract indices: 5 - 2", "4^3"],
              ["Simplify 25x^2y^3 ÷ 5xy", "Divide coefficients 25/5=5; subtract indices x:2-1, y:3-1", "5xy^2"],
              ["Simplify m^7 ÷ m^2 ÷ m^4", "Subtract indices in sequence: 7-2-4", "m^1 = m"],
            ],
          },
        },
        {
          title: "1.2.3 Power of a Power Law - Simple Explanation",
          content:
            "When a number in index form is raised to another power, the indices are multiplied: (am)n = amn.",
        },
        {
          title: "Formula Box",
          formula: "(am)n = a^(mxn)",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              ["Simplify (3^4)^2", "Multiply indices: 4 x 2", "3^8"],
              ["Simplify (p^2 q^3 r)^4", "Multiply every index by 4", "p^8 q^12 r^4"],
              ["Simplify (5m^4 n^3)^2", "Square coefficient 5^2=25; multiply indices by 2", "25 m^8 n^6"],
            ],
          },
        },
        {
          title: "1.2.4 Zero and Negative Indices - Simple Explanation",
          content:
            "Any number (except zero) raised to the power of zero equals 1: a0 = 1. A negative index represents a reciprocal: a-n = 1/an.",
        },
        {
          title: "Formula Box",
          formula: "a^0 = 1 (a ≠ 0)\na^(-n) = 1/a^n\n(a/b)^(-n) = (b/a)^n",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              ["Simplify a^(-2)", "Take the reciprocal with a positive index", "1/a^2"],
              ["Simplify (2/5)^(-10)", "Reciprocate the fraction, flip the index sign", "(5/2)^10"],
              ["Evaluate 2^3 ÷ 2^5", "Subtract indices: 3-5 = -2, then reciprocate", "2^(-2) = 1/4"],
            ],
          },
        },
        {
          title: "1.2.5 Fractional Indices - Simple Explanation",
          content:
            "A fractional index links powers and roots. a^(1/n) is the nth root of a, and a^(m/n) is the nth root of a^m, or (nth root of a) raised to the power m.",
        },
        {
          title: "Formula Box",
          formula: "a^(1/n) = n-th root of a\na^(m/n) = n-th root of (a^m) = (n-th root of a)^m",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              ["Convert 8^(1/3) to root form", "Index 1/3 means cube root", "cube root of 8 = 2"],
              ["Convert 81^(3/4) to root form", "Fourth root of 81, then power 3", "(fourth root of 81)^3 = 3^3 = 27"],
              ["Simplify m^(1/2) x n^(3/4)", "Keep fractional indices separate as bases differ", "m^(1/2) n^(3/4)"],
            ],
          },
        },
        {
          title: "1.2.6 Solving Index Equations and Problems - Simple Explanation",
          content:
            "Index equations are solved by equating the bases on both sides, then equating the indices. Real-life problems may involve growth, finance, or science contexts that use the laws of indices.",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              [
                "Solve 3^x x 9^(x+5) ÷ 3^4 = 1",
                "Convert 9 to 3^2: 3^x x 3^(2x+10) ÷ 3^4 = 3^0; equate indices: x+2x+10-4=0",
                "3x + 6 = 0, x = -2",
              ],
              [
                "Solve the simultaneous equations 25^m x 5^n = 5^8 and 2^m x (1/2^n) = 2",
                "Convert 25 to 5^2: 2m+n=8; convert 1/2^n to 2^(-n): m-n=1",
                "Solve simultaneously: m=3, n=2",
              ],
            ],
          },
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "All laws of indices (multiplication, division, power of a power) are only valid when the bases are equal.",
            "a0 = 1 for all a ≠ 0; 00 is undefined.",
            "A negative index means a reciprocal, not a negative value.",
            "For a fractional index am/n, the denominator n represents the root and the numerator m represents the power.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Adding the bases when multiplying numbers in index form (e.g. mistakenly turning 7^2 x 7^3 into 14^5).",
            "Assuming a^(-n) means a negative number, when it is actually 1/a^n.",
            "Mishandling mixed fractions when calculating fractional indices.",
            "Forgetting that bases must be the same before applying the addition/subtraction index laws.",
          ],
        },
        {
          title: "Exam Tips",
          bulletPoints: [
            "Convert all numbers to the same prime base (2, 3, 5, etc.) before applying the laws of indices.",
            "Verify by substituting small values to confirm the correct law was used.",
            "For index equations, equate the bases first before equating the indices.",
            "Show working clearly, especially when converting to negative or fractional indices.",
          ],
        },
        {
          title: "Real-Life Applications",
          bulletPoints: [
            "Population and bacteria growth use index form to predict future values.",
            "Compound interest on savings and investments uses powers to calculate the final amount.",
            "Science and engineering use index form to express very large or very small numbers.",
          ],
        },
        {
          title: "Summary",
          bulletPoints: [
            "an = repeated multiplication of a, n times; a = base, n = index.",
            "am x an = am+n; am ÷ an = am-n; (am)n = amn.",
            "a0 = 1 (a≠0); a-n = 1/an.",
            "a1/n = nth root of a; am/n = nth root of am.",
            "Solve index equations by equating bases, then equating indices.",
          ],
        },
      ],
    },
  ],
};
