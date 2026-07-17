import type { StructuredNotes } from "@/data/types";

export const mathF1C2NotesDLP: StructuredNotes = {
  chapterSummary:
    "Chapter 2 Factors and Multiples helps students identify factors, prime factors, multiples, HCF and LCM to solve whole-number problems.",
  quickRevision: [
    "A factor is a number that divides another number exactly without a remainder.",
    "A prime factor is a factor that is also a prime number.",
    "HCF is the greatest common factor.",
    "LCM is the smallest common multiple.",
    "Use HCF to divide or group items equally.",
    "Use LCM to find the first time or event that repeats together.",
  ],
  sections: [
    {
      title: "Learning Outcomes",
      subsections: [
        {
          content: "By the end of this chapter, students should be able to:",
          bulletPoints: [
            "Determine factors of whole numbers.",
            "Identify prime factors and perform prime factorisation.",
            "Determine common factors and Highest Common Factor (HCF).",
            "Determine multiples and common multiples.",
            "Determine Lowest Common Multiple (LCM).",
            "Solve daily problems involving HCF and LCM.",
          ],
        },
      ],
    },
    {
      title: "1. Factors",
      subsections: [
        {
          title: "Definition",
          content:
            "A factor of a number is a number that can divide the number exactly without a remainder.",
        },
        {
          title: "Examples of Factors",
          table: {
            headers: ["Number", "Factors"],
            rows: [
              ["12", "1, 2, 3, 4, 6, 12"],
              ["18", "1, 2, 3, 6, 9, 18"],
              ["20", "1, 2, 4, 5, 10, 20"],
            ],
          },
        },
        {
          title: "Tip for Identifying Factors",
          content: "If number A can divide number B without a remainder, then A is a factor of B.",
          formula: "12 ÷ 3 = 4\nTherefore, 3 is a factor of 12.",
        },
      ],
    },
    {
      title: "2. Prime Factors and Prime Factorisation",
      subsections: [
        {
          title: "Prime Numbers",
          content: "A prime number is a number with exactly two factors: 1 and the number itself.",
          bulletPoints: [
            "Examples of prime numbers: 2, 3, 5, 7, 11, 13",
            "The number 1 is not a prime number.",
          ],
        },
        {
          title: "Prime Factors",
          content: "A prime factor is a factor of a number that is also a prime number.",
        },
        {
          title: "Prime Factorisation",
          content:
            "Prime factorisation is the process of writing a number as a product of prime factors.",
          table: {
            headers: ["Number", "Prime Factorisation"],
            rows: [
              ["12", "2 x 2 x 3"],
              ["18", "2 x 3 x 3"],
              ["24", "2 x 2 x 2 x 3"],
            ],
          },
        },
        {
          title: "Two Methods, Same Result: Repeated Division and Factor Tree",
          content: "Express 60 as a product of its prime factors — both methods always agree.",
          factorVisual: {
            number: 60,
            ladder: [2, 2, 3, 5],
            tree: {
              value: 60,
              children: [
                { value: 4, children: [{ value: 2, isPrime: true }, { value: 2, isPrime: true }] },
                { value: 15, children: [{ value: 3, isPrime: true }, { value: 5, isPrime: true }] },
              ],
            },
          },
        },
      ],
    },
    {
      title: "3. Common Factors and Highest Common Factor (HCF)",
      subsections: [
        {
          title: "Common Factors",
          content: "Common factors are factors that are shared by two or more numbers.",
        },
        {
          title: "HCF",
          content:
            "Highest Common Factor (HCF) is the greatest common factor of two or more numbers.",
        },
        {
          title: "HCF Example",
          table: {
            headers: ["Number", "Factors"],
            rows: [
              ["12", "1, 2, 3, 4, 6, 12"],
              ["18", "1, 2, 3, 6, 9, 18"],
              ["Common factors", "1, 2, 3, 6"],
              ["HCF", "6"],
            ],
          },
        },
        {
          title: "Prime Factorisation Method",
          content: "To find HCF, take the common prime factors with the smallest powers.",
          formula: "12 = 2 x 2 x 3\n18 = 2 x 3 x 3\nHCF = 2 x 3 = 6",
        },
        {
          title: "Three Methods to Find HCF",
          content: "Listing, repeated division, or prime factorisation — same answer every time.",
          methodCards: [
            {
              methodName: "Listing the Common Factors",
              steps: [
                "Factors of 18: 1, 2, 3, 6, 9, 18",
                "Factors of 24: 1, 2, 3, 4, 6, 8, 12, 24",
                "Common factors: 1, 2, 3, 6",
              ],
              result: "HCF of 18 and 24 is 6",
            },
            {
              methodName: "Repeated Division",
              steps: [
                "Divide 36, 60, 72 by a common factor repeatedly",
                "2 | 36, 60, 72 → 18, 30, 36",
                "2 | 18, 30, 36 → 9, 15, 18",
                "3 | 9, 15, 18 → 3, 5, 6",
                "Multiply all the divisors: 2 × 2 × 3",
              ],
              result: "HCF of 36, 60 and 72 is 12",
            },
            {
              methodName: "Prime Factorisation",
              steps: [
                "48 = 2 × 2 × 2 × 2 × 3",
                "64 = 2 × 2 × 2 × 2 × 2 × 2",
                "80 = 2 × 2 × 2 × 2 × 5",
                "Multiply all the common prime factors: 2 × 2 × 2 × 2",
              ],
              result: "HCF of 48, 64 and 80 is 16",
            },
          ],
        },
        {
          title: "Problem Solving: Charity Packs (HCF)",
          problemSolvingFlow: {
            scenario:
              "The Boy Scouts of a school donated 252 shirts, 180 pairs of trousers and 108 pairs of socks to an orphanage. All items were divided equally into each pack. What was the maximum number of packs prepared?",
            understanding: [
              "252 shirts, 180 pairs of trousers, 108 pairs of socks were divided equally into each pack",
              "Find the maximum number of packs that were prepared",
            ],
            devisingPlan: ["Find the HCF of 252, 180 and 108"],
            implementing: [
              "252 = 2 × 2 × 3 × 3 × 7",
              "180 = 2 × 2 × 3 × 3 × 5",
              "108 = 2 × 2 × 3 × 3 × 3",
              "HCF of 252, 180 and 108 = 2 × 2 × 3 × 3 = 36",
              "The maximum number of packs prepared would be 36",
            ],
            reflection:
              "Checking: 252 ÷ 36 = 7, 180 ÷ 36 = 5, 108 ÷ 36 = 3 — all divide exactly, confirming 36 packs works",
          },
        },
      ],
    },
    {
      title: "4. Multiples and Common Multiples",
      subsections: [
        {
          title: "Multiples",
          content: "A multiple is the product of a number and a positive whole number.",
        },
        {
          title: "Examples of Multiples",
          table: {
            headers: ["Number", "Multiples"],
            rows: [
              ["4", "4, 8, 12, 16, 20, 24"],
              ["6", "6, 12, 18, 24, 30, 36"],
            ],
          },
        },
        {
          title: "Common Multiples",
          content: "Common multiples are multiples shared by two or more numbers.",
          formula: "Common multiples of 4 and 6: 12, 24, 36, ...",
        },
      ],
    },
    {
      title: "5. Lowest Common Multiple (LCM)",
      subsections: [
        {
          title: "Definition of LCM",
          content:
            "Lowest Common Multiple (LCM) is the smallest common multiple of two or more numbers.",
        },
        {
          title: "LCM Example",
          table: {
            headers: ["Number", "Multiples"],
            rows: [
              ["4", "4, 8, 12, 16, 20, 24"],
              ["6", "6, 12, 18, 24, 30, 36"],
              ["Common multiples", "12, 24, 36"],
              ["LCM", "12"],
            ],
          },
        },
        {
          title: "Prime Factorisation Method",
          content: "To find LCM, take all prime factors with the greatest powers.",
          formula: "12 = 2 x 2 x 3\n18 = 2 x 3 x 3\nLCM = 2 x 2 x 3 x 3 = 36",
        },
        {
          title: "Three Methods to Find LCM",
          content: "Listing, repeated division, or prime factorisation — same answer every time.",
          methodCards: [
            {
              methodName: "Listing the Common Multiples",
              steps: [
                "Multiples of 2: 2, 4, 6, 8, 10…",
                "Multiples of 3: 3, 6, 9, 12…",
                "Choose the lowest common multiple",
              ],
              result: "LCM of 2 and 3 is 6",
            },
            {
              methodName: "Repeated Division",
              steps: [
                "Divide the numbers repeatedly by a divisor that can divide completely at least one number",
                "Numbers that can't be divided are brought down unchanged",
                "Continue until all quotients become 1",
                "Multiply all the divisors: 3 × 2 × 3",
              ],
              result: "LCM of 3, 6 and 9 is 18",
            },
            {
              methodName: "Prime Factorisation",
              steps: [
                "3 = 3",
                "8 = 2 × 2 × 2",
                "12 = 2 × 2 × 3",
                "Multiply the highest power of each prime factor present: 2 × 2 × 2 × 3",
              ],
              result: "LCM of 3, 8 and 12 is 24",
            },
          ],
        },
        {
          title: "Problem Solving: Coffee & Tea Boxes (LCM)",
          problemSolvingFlow: {
            scenario:
              "Canned coffee is sold 6 cans per box and canned tea 9 cans per box. Ainun wants to buy the same number of canned coffee and canned tea for her sister's birthday party. What is the minimum number of boxes of each she needs to buy?",
            understanding: [
              "Number of cans of coffee = 6 cans per box",
              "Number of cans of tea = 9 cans per box",
              "Find the minimum number of boxes of each type needed",
            ],
            devisingPlan: [
              "Find the LCM of 6 and 9 to determine the same number of cans",
              "Use division to find the number of boxes of coffee and tea",
            ],
            implementing: [
              "Multiples of 6: 6, 12, 18, 24, 30…",
              "Multiples of 9: 9, 18, 27, 36, 45…",
              "LCM of 6 and 9 = 18",
              "Number of boxes of canned coffee = 18 ÷ 6 = 3",
              "Number of boxes of canned tea = 18 ÷ 9 = 2",
            ],
            reflection:
              "Number of canned coffee = 3 × 6 = 18; number of canned tea = 2 × 9 = 18 — both equal, confirming the answer",
          },
        },
      ],
    },
    {
      title: "6. Problem Solving with HCF and LCM",
      subsections: [
        {
          title: "When Should HCF Be Used?",
          bulletPoints: [
            "When a question involves dividing items into equal groups.",
            "When finding the largest possible group size.",
            "Example: Dividing 12 apples and 18 oranges into bags equally.",
          ],
        },
        {
          title: "When Should LCM Be Used?",
          bulletPoints: [
            "When a question involves repeated events.",
            "When finding the first time two things happen together.",
            "Example: Bells ring every 4 minutes and 6 minutes. They ring together every 12 minutes.",
          ],
        },
      ],
    },
    {
      title: "7. Key Differences: HCF vs LCM",
      subsections: [
        {
          title: "Comparison Table",
          table: {
            headers: ["Aspect", "HCF", "LCM"],
            rows: [
              ["Meaning", "Greatest common factor", "Smallest common multiple"],
              ["Used for", "Dividing equally", "Finding repeated events together"],
              [
                "Keywords",
                "Greatest, maximum, equal groups",
                "Smallest, first time together, repeats",
              ],
              ["Example", "HCF of 12 and 18 is 6", "LCM of 4 and 6 is 12"],
            ],
          },
        },
        {
          title: "Exam Tip",
          content:
            "If a question asks for equal grouping, think of HCF. If it asks for time or multiples repeating together, think of LCM.",
        },
      ],
    },
  ],
  keyExamFacts: [
    "A factor divides a number exactly without a remainder.",
    "A prime number has exactly two factors.",
    "HCF is the greatest common factor.",
    "LCM is the smallest common multiple.",
    "HCF is suitable for equal grouping, while LCM is suitable for repeated events together.",
  ],
  keyTerms: [
    "Factor",
    "Multiple",
    "Prime number",
    "Prime factor",
    "Prime factorisation",
    "Common factor",
    "HCF",
    "Common multiple",
    "LCM",
  ],
};
