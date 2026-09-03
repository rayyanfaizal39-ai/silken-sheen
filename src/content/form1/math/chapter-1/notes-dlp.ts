import type { StructuredNotes } from "@/data/types";

export const mathF1C1NotesDLP: StructuredNotes = {
  chapterSummary:
    "This chapter explains integers, fractions, decimals and rational numbers, including how to compare, order and perform basic operations with them.",
  quickRevision: [
    "Integers are positive whole numbers, negative whole numbers and zero.",
    "On a number line, values increase to the right and decrease to the left.",
    "Like signs give a positive result for multiplication or division; unlike signs give a negative result.",
    "For combined operations, solve brackets, then multiplication or division, followed by addition or subtraction.",
    "A rational number can be written as p/q, where p and q are integers and q ≠ 0.",
  ],
  sections: [
    {
      title: "Learning Outcomes",
      subsections: [
        {
          content: "By the end of this chapter, students can:",
          bulletPoints: [
            "Recognise, compare and order integers and positive and negative fractions and decimals.",
            "Perform basic and combined operations using the correct order of operations.",
            "Use the commutative, associative, distributive and identity laws.",
            "Recognise rational numbers and write them in p/q form.",
            "Solve daily-life problems involving rational numbers.",
          ],
        },
      ],
    },
    {
      title: "1.1 Integers",
      subsections: [
        {
          title: "Positive and Negative Numbers in Daily Life",
          table: {
            headers: ["Situation", "Positive", "Negative"],
            rows: [
              ["Temperature", "30°C above zero = +30°C", "10°C below zero = −10°C"],
              ["Sea level", "150 m above sea level = +150 m", "50 m below sea level = −50 m"],
              ["Finance", "Profit of RM2,000 = +RM2,000", "Loss of RM500 = −RM500"],
            ],
          },
        },
        {
          title: "Definition of an Integer",
          content:
            "Integers are positive whole numbers, negative whole numbers and zero. Fractions and decimals are not integers.",
          formula: "…, −3, −2, −1, 0, 1, 2, 3, …",
        },
        {
          title: "Number Line",
          content:
            "Zero is in the centre. Positive integers are on the right and negative integers are on the left. Values increase as you move right.",
          numberLine: { min: -5, max: 5, highlight: [0] },
        },
        {
          title: "Comparing and Ordering Integers",
          table: {
            headers: ["Order", "How to read", "Example"],
            rows: [
              ["Ascending", "Smallest to largest", "−5, −3, 0, 2, 4"],
              ["Descending", "Largest to smallest", "5, 3, 2, −2, −4, −5"],
            ],
          },
        },
      ],
    },
    {
      title: "1.2 Basic Arithmetic Operations Involving Integers",
      subsections: [
        {
          title: "Addition and Subtraction",
          table: {
            headers: ["Two consecutive signs", "Simplified form"],
            rows: [
              ["+(+a)", "+a"],
              ["+(−a)", "−a"],
              ["−(+a)", "−a"],
              ["−(−a)", "+a"],
            ],
          },
        },
        {
          title: "Addition and Subtraction Examples",
          formula: "5 + (+3) = 8\n5 + (−3) = 2\n5 − (+3) = 2\n5 − (−3) = 8\n−2 − (−4) = 2",
        },
        {
          title: "Multiplication and Division",
          table: {
            headers: ["Signs", "Result"],
            rows: [
              ["(+) × (+) or (+) ÷ (+)", "Positive"],
              ["(−) × (−) or (−) ÷ (−)", "Positive"],
              ["(+) × (−) or (+) ÷ (−)", "Negative"],
              ["(−) × (+) or (−) ÷ (+)", "Negative"],
            ],
          },
        },
        {
          title: "Order of Operations",
          content: "Carry out operations at the same level from left to right.",
          bulletPoints: ["1. Brackets", "2. Multiply or divide", "3. Add or subtract"],
          workedExample: {
            problem: "Evaluate 4 − 12 ÷ (−2) + (−1).",
            steps: ["Divide first: 12 ÷ (−2) = −6", "4 − (−6) − 1 = 4 + 6 − 1"],
            answer: "9",
          },
        },
        {
          title: "Laws of Arithmetic Operations",
          table: {
            headers: ["Law", "Statement"],
            rows: [
              ["Commutative", "a + b = b + a; a × b = b × a"],
              ["Associative", "(a + b) + c = a + (b + c); (a × b) × c = a × (b × c)"],
              ["Distributive", "a × (b + c) = a × b + a × c"],
              ["Identity", "a + 0 = a; a × 1 = a; a × 0 = 0; a + (−a) = 0"],
            ],
          },
        },
      ],
    },
    {
      title: "1.3 Positive and Negative Fractions",
      subsections: [
        {
          title: "Position on a Number Line",
          content:
            "Positive fractions are to the right of zero and negative fractions are to the left. Each scale interval must be equal.",
          numberLine: { min: -1, max: 1, highlight: [0] },
        },
        {
          title: "Comparing Fractions",
          content:
            "Use the lowest common multiple to obtain a common denominator, then compare the numerators.",
          workedExample: {
            problem: "Arrange −3/4, 1/2, −1/2 and 1/4 in ascending order.",
            steps: [
              "Use the common denominator 4: −3/4, 2/4, −2/4, 1/4",
              "Arrange the values from smallest to largest.",
            ],
            answer: "−3/4, −1/2, 1/4, 1/2",
          },
        },
        {
          title: "Dividing Fractions",
          content:
            "Change division to multiplication and use the reciprocal of the second fraction.",
          formula: "1/2 ÷ 1/4 = 1/2 × 4/1 = 2",
        },
      ],
    },
    {
      title: "1.4 Positive and Negative Decimals",
      subsections: [
        {
          title: "Position and Comparison",
          content:
            "Positive decimals are to the right of zero and negative decimals are to the left. Align decimal points when comparing values.",
        },
        {
          title: "Combined Operations",
          content:
            "Use the order of operations. Decimals may be changed to fractions when this makes the calculation easier.",
          workedExample: {
            problem: "Evaluate (7.23 + 2.77) ÷ (−0.8).",
            steps: ["7.23 + 2.77 = 10", "10 ÷ (−0.8) = −12.5"],
            answer: "−12.5",
          },
        },
      ],
    },
    {
      title: "1.5 Rational Numbers",
      subsections: [
        {
          title: "Definition",
          content:
            "A rational number is a number that can be written as p/q, where p and q are integers and q is not zero.",
          formula: "p/q, where p, q ∈ integers and q ≠ 0",
        },
        {
          title: "Writing Numbers in p/q Form",
          table: {
            headers: ["Type", "Number", "p/q form"],
            rows: [
              ["Integer", "−9", "−9/1"],
              ["Mixed fraction", "1 4/5", "9/5"],
              ["Decimal", "3.5", "7/2"],
            ],
          },
        },
        {
          title: "Combined Operations with Rational Numbers",
          content: "Convert the numbers into a consistent fraction or decimal form.",
          workedExample: {
            problem: "Evaluate −0.6 + 3/4 × (−1 1/3).",
            steps: [
              "−0.6 = −3/5 and −1 1/3 = −4/3",
              "3/4 × (−4/3) = −1",
              "−3/5 + (−1) = −3/5 − 5/5",
            ],
            answer: "−8/5 = −1 3/5",
          },
        },
      ],
    },
    {
      title: "1.6 Daily-Life Problem Solving",
      subsections: [
        {
          title: "Temperature Example",
          problemSolving: {
            scenario:
              "A town's temperature is 12°C. It falls to −6°C, then rises by 3°C and falls by another 8°C. Find the first change and the final temperature.",
            understanding: [
              "Initial temperature = 12°C",
              "Temperature after the first fall = −6°C",
            ],
            devisingPlan: [
              "Change = new temperature − initial temperature",
              "Represent every change with an integer",
            ],
            implementing: [
              "First change = −6 − 12 = −18°C",
              "Final temperature = −6 + 3 − 8 = −11°C",
            ],
            reflection:
              "−11°C is 5°C below −6°C, which agrees with a rise of 3°C followed by a fall of 8°C.",
          },
        },
        {
          title: "Quiz Score Example",
          problemSolving: {
            scenario:
              "A quiz has 20 questions. Each correct answer earns 2 marks and each wrong answer earns −1/2 mark. Mei Ling's total marks from wrong answers are −4.",
            understanding: [
              "Total marks from wrong answers = −4",
              "All 20 questions were answered",
            ],
            devisingPlan: [
              "Find the number of wrong answers",
              "Find the number of correct answers",
              "Calculate the total score",
            ],
            implementing: [
              "Wrong answers = −4 ÷ (−1/2) = 8",
              "Correct answers = 20 − 8 = 12",
              "Total = 12 × 2 − 4 = 20",
            ],
            reflection:
              "Twelve correct answers give 24 marks and eight wrong answers subtract 4 marks, so the total is 20 marks.",
          },
        },
      ],
    },
  ],
  keyExamFacts: [
    "A number farther to the right on a number line is always greater.",
    "Subtracting a negative number is the same as adding a positive number.",
    "Like signs give positive and unlike signs give negative for multiplication or division.",
    "Use a common denominator before comparing fractions.",
    "In p/q, the denominator q cannot be zero.",
  ],
  keyTerms: [
    "Integer",
    "Number line",
    "Ascending order",
    "Descending order",
    "Fraction",
    "Decimal",
    "Rational number",
    "Order of operations",
  ],
};
