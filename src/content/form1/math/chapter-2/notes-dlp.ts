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
          title: "Methods",
          bulletPoints: [
            "Use repeated division by prime numbers.",
            "A factor tree can also be used.",
            "Continue until all factors are prime numbers.",
          ],
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
