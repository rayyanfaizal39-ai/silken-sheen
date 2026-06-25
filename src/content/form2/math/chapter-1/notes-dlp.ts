import type { StructuredNotes } from "@/data/types";

export const mathF2C1NotesDLP: StructuredNotes = {
  chapterSummary:
    "Chapter 1 Patterns and Sequences helps students identify patterns in numbers and shapes, understand number sequences and determine the next term, and represent patterns and sequences as functions using tables, general formulas and graphs.",
  quickRevision: [
    "A pattern is an arrangement of numbers, objects or shapes that repeats according to a certain rule.",
    "A sequence is a set of numbers arranged according to a specific rule, and each number is called a term.",
    "An increasing sequence: each term is greater than the previous term. A decreasing sequence: each term is smaller than the previous term.",
    "The general formula for the nth term, Tn, allows us to calculate any term without listing all the previous terms.",
    "A sequence can be represented as a function with n (the position of the term) as the input and Tn (the value of the term) as the output.",
  ],
  sections: [
    {
      title: "Learning Outcomes",
      subsections: [
        {
          content: "By the end of this chapter, students should be able to:",
          bulletPoints: [
            "Identify and describe the pattern of a set of objects or numbers.",
            "Make generalisations about patterns using words and algebra.",
            "Identify increasing and decreasing sequences.",
            "Determine a specific term and the next term in a sequence.",
            "Form and use the general formula for the nth term of a sequence.",
            "Represent patterns and sequences as functions in the form of tables, formulas and graphs.",
          ],
        },
      ],
    },
    {
      title: "1.1 Patterns",
      subsections: [
        {
          title: "Definition",
          content:
            "A pattern is an arrangement of numbers, objects or shapes that repeats or changes according to a fixed and predictable rule.",
        },
        {
          title: "Example 1",
          content:
            "Question: Observe the following arrangement of dots: 1, 3, 5, 7, ... What pattern is formed?\nSolution: Compare consecutive numbers: 3-1=2, 5-3=2, 7-5=2. Each number increases by 2 from the previous number.\nAnswer: The pattern is a consecutive increase of 2 (odd numbers).",
        },
        {
          title: "Example 2",
          content:
            "Question: Draw and describe the pattern for an arrangement of triangular dots: 1, 3, 6, 10, ...\nSolution: The difference between consecutive numbers is 2, 3, 4, ... that is, the difference itself increases by 1 each time (triangular numbers).\nAnswer: The pattern is triangular numbers, where the difference increases by 1 each time (2, 3, 4, ...).",
        },
        {
          title: "Types of Patterns",
          table: {
            headers: ["Type of Pattern", "Rule", "Example"],
            rows: [
              ["Addition pattern", "Add a fixed number each time", "2, 4, 6, 8, ..."],
              ["Subtraction pattern", "Subtract a fixed number each time", "20, 17, 14, 11, ..."],
              ["Multiplication pattern", "Multiply by a fixed number each time", "2, 4, 8, 16, ..."],
              ["Triangular number pattern", "Difference increases by 1", "1, 3, 6, 10, ..."],
              ["Square number pattern", "n multiplied by n", "1, 4, 9, 16, ..."],
            ],
          },
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "Always compare at least three pairs of consecutive numbers before concluding the pattern.",
            "Patterns can exist in the form of numbers, geometry (shapes) or tables.",
            "Pattern generalisations can be stated in words or in algebraic form.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Concluding a pattern based on only two numbers, without verifying with the next number.",
            "Confusing an addition pattern with a multiplication pattern by not checking the difference and ratio carefully.",
            "Not re-checking an identified pattern by continuing the arrangement for a few more numbers.",
          ],
        },
      ],
    },
    {
      title: "1.2 Sequences",
      subsections: [
        {
          title: "Definition",
          content:
            "A sequence is a set of numbers arranged according to a certain rule or pattern. Each number in a sequence is called a term, and the position of a term is denoted by n (n = 1, 2, 3, ...). The first term is written as T1, the second term as T2, and the general term as Tn.",
        },
        {
          title: "Increasing and Decreasing Sequences",
          table: {
            headers: ["Type of Sequence", "Characteristic", "Example"],
            rows: [
              ["Increasing sequence", "Each term is greater than the previous term", "3, 6, 9, 12, ..."],
              ["Decreasing sequence", "Each term is smaller than the previous term", "50, 45, 40, 35, ..."],
            ],
          },
        },
        {
          title: "Example 1",
          content:
            "Question: Determine whether the sequence 7, 11, 15, 19, ... is increasing or decreasing, and find the 6th term.\nSolution: Difference of terms = 11-7 = 4, 15-11 = 4, 19-15 = 4. The difference is positive (+4), so the sequence is increasing. T5 = 19+4 = 23, T6 = 23+4 = 27.\nAnswer: The sequence is increasing; the 6th term is 27.",
        },
        {
          title: "Example 2",
          content:
            "Question: Given the sequence 81, 27, 9, 3, ... Determine the rule of the sequence and find the next term.\nSolution: 27÷81 = 1/3, 9÷27 = 1/3, 3÷9 = 1/3. Each term is the previous term multiplied by 1/3 (or divided by 3).\nAnswer: Rule: multiply by 1/3 (divide by 3); next term = 3 x 1/3 = 1.",
        },
        {
          title: "Formula",
          formula: "Arithmetic sequence: Tn = a + (n-1)d\nwhere a = first term, d = common difference, n = position of the term\n\nGeometric sequence: Tn = a x r^(n-1)\nwhere a = first term, r = common ratio, n = position of the term",
        },
        {
          title: "Example 3",
          content:
            "Question: Given an arithmetic sequence with a = 5 and d = 3. Find T10.\nSolution: Tn = a + (n-1)d. T10 = 5 + (10-1)(3) = 5 + 9(3) = 5 + 27.\nAnswer: T10 = 32.",
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "The common difference (d) of an arithmetic sequence is obtained by subtracting the previous term from the current term: d = Tn - T(n-1).",
            "The common ratio (r) of a geometric sequence is obtained by dividing the current term by the previous term: r = Tn / T(n-1).",
            "If d is positive, the arithmetic sequence is increasing; if d is negative, the arithmetic sequence is decreasing.",
            "If r is greater than 1, a geometric sequence (positive numbers) is increasing; if 0 < r < 1, the geometric sequence is decreasing.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Using the formula Tn = a + nd and leaving out the brackets around (n-1), causing the answer to be off by one term.",
            "Confusing the common difference (d) with the common ratio (r) - d is for addition/subtraction, r is for multiplication/division.",
            "Not checking the negative sign when a sequence is decreasing.",
          ],
        },
      ],
    },
    {
      title: "1.3 Patterns and Sequences as Functions",
      subsections: [
        {
          title: "Definition",
          content:
            "Patterns and sequences can be represented as a function, with the position of the term, n, as the input and the value of the term, Tn, as the output. This relationship can be shown in the form of a table, a general formula (algebra) or a graph.",
        },
        {
          title: "Example 1",
          content:
            "Question: Given the sequence 2, 5, 8, 11, ... Build a function table for n = 1, 2, 3, 4 and determine the general formula Tn.\nSolution: Common difference d = 3. Tn = a + (n-1)d = 2 + (n-1)(3) = 2 + 3n - 3 = 3n - 1.\nAnswer: Tn = 3n - 1. Table: n=1→2, n=2→5, n=3→8, n=4→11.",
        },
        {
          title: "Function Table",
          table: {
            headers: ["n (position)", "1", "2", "3", "4", "n"],
            rows: [["Tn (term value)", "2", "5", "8", "11", "3n - 1"]],
          },
        },
        {
          title: "Example 2",
          content:
            "Question: The general formula of a sequence is Tn = 2n^2. Find T1, T2 and T3, and state the type of pattern.\nSolution: T1 = 2(1)^2 = 2. T2 = 2(2)^2 = 8. T3 = 2(3)^2 = 18.\nAnswer: The sequence is 2, 8, 18, ... which is a square number pattern multiplied by 2 (non-linear).",
        },
        {
          title: "Formula",
          formula: "Linear function (arithmetic sequence): Tn = dn + (a - d)\nNon-linear function: involves n^2, n^3 or a combination of operations",
        },
        {
          title: "Representing with a Graph",
          bulletPoints: [
            "The x-axis represents n (position of the term): n = 1, 2, 3, ...",
            "The y-axis represents Tn (the value of the term).",
            "If the points form a straight line, the sequence is arithmetic (linear).",
            "If the points form a curve, the sequence is non-linear (for example geometric or square-based).",
          ],
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "The general formula Tn allows us to find any term, including far terms such as T50 or T100, without listing all the terms.",
            "To verify a general formula, always test by substituting n = 1, 2, 3 and compare with the original sequence.",
            "An arithmetic sequence produces a straight-line graph when Tn is plotted against n.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Forgetting to simplify the general formula after expanding a + (n-1)d, for example missing the step of collecting the n terms.",
            "Substituting the wrong value of n (for example using n=0 for the first term, when the first term is n=1).",
            "Not verifying the general formula obtained by substituting back the value of n to check accuracy.",
          ],
        },
      ],
    },
    {
      title: "Chapter Summary",
      subsections: [
        {
          title: "Must Know",
          bulletPoints: [
            "A pattern is a repeating arrangement that follows a certain, predictable rule.",
            "A sequence is a set of numbers (terms) arranged according to a certain rule; Tn represents the nth term.",
            "An arithmetic sequence has a fixed common difference (d); a geometric sequence has a fixed common ratio (r).",
            "Patterns and sequences can be represented as functions through tables, general formulas and graphs.",
          ],
        },
        {
          title: "Important Formulae",
          table: {
            headers: ["Type of Sequence", "nth Term Formula"],
            rows: [
              ["Arithmetic", "Tn = a + (n-1)d"],
              ["Geometric", "Tn = a x r^(n-1)"],
            ],
          },
        },
        {
          title: "Exam Tips",
          bulletPoints: [
            "Always calculate the difference or ratio between at least three pairs of terms before determining the type of sequence.",
            "Write the general formula in its simplest form (for example 3n - 1, not 2 + 3(n-1)).",
            "Check the final answer by substituting the value of n back into the formula obtained.",
            "For graph questions, identify whether the points form a straight line (linear/arithmetic) or a curve (non-linear).",
          ],
        },
      ],
    },
  ],
  keyExamFacts: [
    "A pattern is an arrangement of numbers or shapes that repeats according to a fixed rule.",
    "A sequence is a set of numbers (terms) arranged according to a certain rule, denoted T1, T2, ..., Tn.",
    "Common difference (d) = Tn - T(n-1) for an arithmetic sequence; common ratio (r) = Tn / T(n-1) for a geometric sequence.",
    "The nth term formula for an arithmetic sequence: Tn = a + (n-1)d.",
    "The nth term formula for a geometric sequence: Tn = a x r^(n-1).",
    "An arithmetic sequence produces a straight-line graph when Tn is plotted against n.",
  ],
  keyTerms: [
    "Pattern",
    "Sequence",
    "Term",
    "Increasing sequence",
    "Decreasing sequence",
    "Common difference",
    "Common ratio",
    "Arithmetic sequence",
    "Geometric sequence",
    "General formula",
    "Function",
  ],
};
