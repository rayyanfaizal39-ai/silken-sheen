import type { StructuredNotes } from "@/data/types";

export const mathF1C1NotesDLP: StructuredNotes = {
  chapterSummary:
    "Chapter 1 Rational Numbers helps students understand integers, positive and negative fractions, positive and negative decimals, and numbers that can be written in the form a/b.",
  quickRevision: [
    "Integers consist of positive whole numbers, negative whole numbers and zero.",
    "Numbers to the right of zero are greater, while numbers to the left of zero are smaller.",
    "For fractions, make the denominators the same before comparing values.",
    "Rational numbers can be written in the form a/b, where a and b are integers and b is not equal to 0.",
  ],
  sections: [
    {
      title: "Learning Outcomes",
      subsections: [
        {
          content: "By the end of this chapter, students should be able to:",
          bulletPoints: [
            "Understand integers.",
            "Perform basic arithmetic operations involving integers.",
            "Understand positive and negative fractions.",
            "Understand positive and negative decimals.",
            "Identify rational numbers.",
          ],
        },
      ],
    },
    {
      title: "1.1 Integers",
      subsections: [
        {
          title: "Definition",
          content:
            "Integers are a set of numbers consisting of positive whole numbers and negative whole numbers, including zero.",
        },
        {
          title: "Integer Information Cards",
          table: {
            headers: ["Type", "Meaning", "Examples"],
            rows: [
              ["Positive Integers", "Whole numbers greater than zero", "1, 2, 3, 100"],
              ["Negative Integers", "Whole numbers less than zero", "-1, -10, -239"],
              ["Non-Integers", "Numbers that are not whole numbers", "1/2, 0.88, -3.4"],
            ],
          },
        },
        {
          title: "Number Line",
          content:
            "A number line helps students see the position of integers clearly. As you move to the right, the value increases. As you move to the left, the value decreases.",
          bulletPoints: [
            "Numbers to the right of zero are positive integers.",
            "Their value increases as they move further right.",
            "Numbers to the left of zero are negative integers.",
            "Their value decreases as they move further left.",
          ],
          numberLine: { min: -5, max: 5, highlight: [0] },
        },
        {
          title: "Number Line Examples",
          numberLine: {
            examples: [
              { value: "−3", meaning: "3 less than 0" },
              { value: "3", meaning: "3 more than 0" },
              { value: "−1", meaning: "1 less than 0" },
              { value: "1", meaning: "1 more than 0" },
            ],
          },
        },
        {
          title: "Comparing and Ordering Integers",
          table: {
            headers: ["Order", "Meaning", "Example"],
            rows: [
              [
                "Ascending Order",
                "Arranged from the smallest value to the largest value",
                "-5, -2, 0, 3, 8",
              ],
              [
                "Descending Order",
                "Arranged from the largest value to the smallest value",
                "8, 3, 0, -2, -5",
              ],
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
          content:
            "Use a number line to decide the movement direction when adding or subtracting integers.",
          table: {
            headers: ["Operation", "Movement on the number line"],
            rows: [
              ["Add a positive integer", "Move right"],
              ["Add a negative integer", "Move left"],
              ["Subtract a positive integer", "Move left"],
              ["Subtract a negative integer", "Move right"],
            ],
          },
        },
        {
          title: "Worked Example: 8 + (+3)",
          workedExample: {
            problem: "8 + (+3)",
            steps: ["Move 3 units to the right from 8"],
            answer: "11",
          },
        },
        {
          title: "Worked Example: 5 + (−2)",
          workedExample: {
            problem: "5 + (−2)",
            steps: ["Move 2 units to the left from 5"],
            answer: "3",
          },
        },
        {
          title: "Worked Example: 2 − (+4)",
          workedExample: {
            problem: "2 − (+4)",
            steps: ["Move 4 units to the left from 2"],
            answer: "−2",
          },
        },
        {
          title: "Worked Example: −1 − (−4)",
          workedExample: {
            problem: "−1 − (−4)",
            steps: ["Equivalent to −1 + 4", "Move 4 units to the right from −1"],
            answer: "3",
          },
        },
        {
          title: "Multiplication and Division",
          table: {
            headers: ["Operation", "Result"],
            rows: [
              ["(+) x (+)", "Positive"],
              ["(-) x (-)", "Positive"],
              ["(+) x (-)", "Negative"],
              ["(-) x (+)", "Negative"],
            ],
          },
        },
        {
          title: "Order of Operations",
          content: "Solve calculations in the correct order so the answer is accurate.",
          bulletPoints: ["1. Parentheses ( )", "2. Multiply / Divide", "3. Add / Subtract"],
        },
        {
          title: "Commutative Law",
          formula: "a + b = b + a\na x b = b x a",
        },
        {
          title: "Associative Law",
          formula: "(a + b) + c = a + (b + c)\n(a x b) x c = a x (b x c)",
        },
        {
          title: "Distributive Law",
          formula: "a x (b + c) = (a x b) + (a x c)",
        },
        {
          title: "Identity Law",
          formula: "a + 0 = a\na x 1 = a\na + (-a) = 0",
        },
      ],
    },
    {
      title: "1.3 Positive and Negative Fractions",
      subsections: [
        {
          title: "Concept",
          bulletPoints: [
            "Positive fractions are located to the right of zero.",
            "Negative fractions are located to the left of zero.",
          ],
        },
        {
          title: "Comparing Fractions",
          content:
            "The denominators must be made the same before comparing fractions. After the denominators are the same, compare the numerators.",
        },
        {
          title: "Fraction Operations",
          content:
            "When dividing fractions, convert division into multiplication using the reciprocal.",
          workedExample: {
            problem: "Divide: 1/2 ÷ 1/4",
            steps: [
              "Keep the first fraction as it is",
              "Change ÷ to ×, and flip the second fraction (reciprocal)",
              "1/2 ÷ 1/4 = 1/2 × 4/1",
            ],
            answer: "1/2 ÷ 1/4 = 2",
          },
        },
        {
          title: "Problem Solving",
          problemSolving: {
            scenario:
              "A mathematics quiz has 20 questions. A score of 2 marks is awarded for every correct answer and −½ mark for every incorrect answer. Mei Ling answered all questions and her score for incorrect answers was −4. What was her total score?",
            understanding: [
              "A correct answer scores 2 marks",
              "An incorrect answer scores −½ mark",
              "Score for incorrect answers = −4",
              "Find the total score",
            ],
            devisingPlan: [
              "+2 represents the score for a correct answer",
              "−½ represents the score for an incorrect answer",
              "Find the number of incorrect answers using division",
              "Find total score using multiplication and addition",
            ],
            implementing: [
              "Number of incorrect answers = −4 ÷ (−½) = 8",
              "Total score = (20 − 8) × 2 + (−4) = 12 × 2 − 4 = 20",
            ],
            reflection:
              "Checking: 20 questions, 8 incorrect (score −4), 12 correct (score 24) → 24 − 4 = 20 ✓",
          },
        },
      ],
    },
    {
      title: "1.4 Positive and Negative Decimals",
      subsections: [
        {
          title: "Concept",
          bulletPoints: [
            "Positive decimals are greater than zero.",
            "Negative decimals are less than zero.",
          ],
        },
        {
          title: "Real-Life Situations",
          table: {
            headers: ["Situation", "Sign", "Meaning"],
            rows: [
              ["Profit", "Positive (+)", "Value increases"],
              ["Loss", "Negative (-)", "Value decreases"],
            ],
          },
        },
        {
          title: "Order of Operations for Decimals",
          bulletPoints: ["1. Multiply / Divide first", "2. Add / Subtract second"],
        },
        {
          title: "Problem Solving",
          problemSolving: {
            scenario:
              "The price of a company's stock was RM2.05. The price hiked by RM0.32, then dropped RM0.28 every hour for the next three hours. Calculate the final stock price.",
            understanding: [
              "Starting price = RM2.05",
              "Price hiked by RM0.32",
              "Price dropped RM0.28 every hour for 3 hours",
              "Find the final price",
            ],
            devisingPlan: [
              "Increase in price is written as +0.32",
              "Decrease in price is written as −0.28",
              "Use multiplication and addition",
            ],
            implementing: [
              "Final price = 2.05 + 0.32 + 3 × (−0.28)",
              "= 2.37 + (−0.84)",
              "= 2.37 − 0.84 = 1.53",
            ],
            reflection:
              "RM2.05 + RM0.32 − 3 × RM0.28 = RM2.37 − RM0.84 = RM1.53 — the final stock price was RM1.53",
          },
        },
      ],
    },
    {
      title: "1.5 Rational Numbers",
      subsections: [
        {
          title: "Definition",
          content: "Rational numbers are numbers that can be written in the form a/b.",
          formula: "a/b\nwhere a and b are integers, and b != 0",
        },
        {
          title: "Examples of Rational Numbers",
          table: {
            headers: ["Type", "Example", "Form a/b"],
            rows: [
              ["Integer", "-9", "-9/1"],
              ["Fraction", "3/4", "3/4"],
              ["Decimal", "3.5", "7/2"],
            ],
          },
        },
        {
          title: "Math Tip",
          content:
            "If fraction calculations become difficult, convert fractions into decimals using a calculator to make comparisons or calculations easier.",
        },
      ],
    },
    {
      title: "Chapter Summary",
      subsections: [
        {
          title: "Summary Table",
          table: {
            headers: ["Type of Number", "Positive Examples", "Negative Examples"],
            rows: [
              ["Integer", "1, 2, 3", "-1, -2, -3"],
              ["Fraction", "1/2, 7/4", "-1/3, -4 1/2"],
              ["Decimal", "0.5, 4.3", "-0.1, -7.65"],
            ],
          },
        },
      ],
    },
  ],
  keyExamFacts: [
    "Integers are positive whole numbers, negative whole numbers and zero.",
    "On a number line, values increase to the right and decrease to the left.",
    "Make denominators the same before comparing fractions.",
    "Fraction division can be changed to multiplication by using the reciprocal.",
    "Rational numbers can be written as a/b where b is not equal to 0.",
  ],
  keyTerms: [
    "Integer",
    "Positive integer",
    "Negative integer",
    "Fraction",
    "Decimal",
    "Rational number",
    "Number line",
    "Order of operations",
  ],
};
