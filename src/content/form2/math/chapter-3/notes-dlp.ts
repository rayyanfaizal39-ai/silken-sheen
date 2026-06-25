import type { StructuredNotes } from "@/data/types";

export const mathF2C3NotesDLP: StructuredNotes = {
  chapterSummary:
    "Chapter 3 Algebraic Formulae guides students to write formulae from everyday situations, change the subject of a formula, and determine the value of a variable through substitution.",
  quickRevision: [
    "A formula is an equation that shows the relationship between two or more variables.",
    "The subject of a formula is the single variable on the left side of the '=' sign.",
    "To change the subject of a formula, perform the same inverse operation on both sides of the formula.",
    "When taking a square root, consider both positive and negative values (±) if appropriate to the context of the question.",
    "Substitute known values of variables into the formula to find the value of the unknown variable.",
  ],
  sections: [
    {
      title: "Learning Outcomes",
      subsections: [
        {
          content: "By the end of this chapter, students should be able to:",
          bulletPoints: [
            "Write a formula for a given situation.",
            "Change the subject of a formula involving basic operations, powers and roots.",
            "Determine the value of a variable when the value of another variable is given.",
          ],
        },
      ],
    },
    {
      title: "3.1 Writing Formulae",
      subsections: [
        {
          title: "Definition",
          content:
            "A formula is an equation that expresses the relationship between two or more variables in a situation. A formula is written with one variable (the subject of the formula) on the left side of the '=' sign, and other variables and numbers on the right side.",
        },
        {
          title: "Example 1",
          content:
            "Question:\nA car travels at a constant speed of v km/h for t hours. Write a formula for the distance, s km, travelled by the car.\nSolution:\nDistance = Speed x Time\ns = v x t\nAnswer:\ns = vt",
        },
        {
          title: "Example 2",
          content:
            "Question:\nThe price of an apple is RM x and the price of an orange is RM y. Ali buys 3 apples and 2 oranges. Write a formula for the total amount of money, RM J, spent by Ali.\nSolution:\nTotal money = (Number of apples x Price per apple) + (Number of oranges x Price per orange)\nJ = 3x + 2y\nAnswer:\nJ = 3x + 2y",
        },
        {
          title: "Formula",
          formula: "Dependent variable = expression in independent variable(s)\nExample: s = vt",
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "Identify the variables involved and their respective units.",
            "Determine which variable is the subject of the formula (usually the quantity being asked for).",
            "Make sure the mathematical relationship (add, subtract, multiply, divide) matches the real situation.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Choosing the wrong operation (for example multiplying instead of subtracting).",
            "Forgetting to include the correct coefficient (for example the number of items).",
            "Mixing different units without converting them (for example metres with kilometres).",
          ],
        },
      ],
    },
    {
      title: "3.2 Changing the Subject of a Formula: Basic Operations",
      subsections: [
        {
          title: "Definition",
          content:
            "Changing the subject of a formula means rewriting the formula so that a different variable becomes the subject (on the left side of the '=' sign). The same inverse operation must be performed on both sides of the formula to keep it balanced.",
        },
        {
          title: "Example 1",
          content:
            "Question:\nGiven the formula v = u + at. Change the subject of the formula to a.\nSolution:\nv = u + at\nv - u = at  (subtract u from both sides)\n(v - u) / t = a  (divide both sides by t)\nAnswer:\na = (v - u) / t",
        },
        {
          title: "Example 2",
          content:
            "Question:\nGiven the formula P = 2(l + b). Change the subject of the formula to b.\nSolution:\nP = 2(l + b)\nP / 2 = l + b  (divide both sides by 2)\n(P / 2) - l = b  (subtract l from both sides)\nAnswer:\nb = (P / 2) - l, or b = (P - 2l) / 2",
        },
        {
          title: "Formula",
          formula: "If v = u + at, then a = (v - u) / t\nIf P = 2(l + b), then b = (P - 2l) / 2",
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "The inverse operation of addition is subtraction, and the inverse of multiplication is division.",
            "Perform each step on BOTH sides of the formula to keep it balanced.",
            "Isolate the new subject until it stands alone on one side.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Sign errors when moving terms across the '=' sign (forgetting to change the sign).",
            "Performing an operation on only one side of the formula.",
            "Dividing by a term that still contains an addition without bracketing it first.",
          ],
        },
      ],
    },
    {
      title: "3.2b Changing the Subject of a Formula: Powers and Roots",
      subsections: [
        {
          title: "Definition",
          content:
            "When a formula involves squares or square roots, the inverse operation of squaring is taking the square root, and the inverse operation of taking a square root is squaring.",
        },
        {
          title: "Example 1",
          content:
            "Question:\nGiven the formula for the area of a circle A = πr². Change the subject of the formula to r.\nSolution:\nA = πr²\nA / π = r²  (divide both sides by π)\n√(A / π) = r  (take the square root of both sides)\nAnswer:\nr = √(A / π)\n(Take the positive value only since r is a length/radius)",
        },
        {
          title: "Example 2",
          content:
            "Question:\nGiven the formula c² = a² + b². Change the subject of the formula to a.\nSolution:\nc² = a² + b²\nc² - b² = a²  (subtract b² from both sides)\n√(c² - b²) = a  (take the square root of both sides)\nAnswer:\na = √(c² - b²)",
        },
        {
          title: "Formula",
          formula: "If A = πr², then r = √(A / π)\nIf c² = a² + b², then a = √(c² - b²)",
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "To remove a square, take the square root of both sides of the formula.",
            "To remove a square root, square both sides of the formula.",
            "For physical quantities such as length, radius or time, take the positive value only (the negative value is rejected as it has no physical meaning).",
            "For some general algebraic contexts (not physical quantities), both positive and negative values (±) need to be considered.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Forgetting to take the square root of the ENTIRE right side, not just one term.",
            "Forgetting to consider the ± sign when the context of the question requires it.",
            "Taking the square root before correctly isolating the squared term.",
          ],
        },
      ],
    },
    {
      title: "3.3 Determining the Value of a Variable",
      subsections: [
        {
          title: "Definition",
          content:
            "When the values of all but one variable in a formula are known, the value of the unknown variable can be determined by substituting the known values into the formula, and if necessary, changing the subject of the formula first.",
        },
        {
          title: "Example 1",
          content:
            "Question:\nGiven the formula v = u + at. If u = 5, a = 2 and t = 4, find the value of v.\nSolution:\nv = u + at\nv = 5 + (2)(4)\nv = 5 + 8\nAnswer:\nv = 13",
        },
        {
          title: "Example 2",
          content:
            "Question:\nGiven the formula A = πr², where π = 22/7. If A = 154 cm², find the value of r.\nSolution:\nr = √(A / π)\nr = √(154 ÷ (22/7))\nr = √(154 x 7/22)\nr = √49\nAnswer:\nr = 7 cm",
        },
        {
          title: "Formula",
          formula: "Substitute known values -> Solve for the unknown variable",
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "If the required variable is not the subject of the formula, change the subject first before substituting values.",
            "Always check that units are consistent before substituting values.",
            "Use brackets when substituting negative values to avoid sign errors.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Substituting values into a formula with the wrong subject (not changing the subject first).",
            "Arithmetic errors when multiplying or dividing fractions/decimals.",
            "Forgetting to take the square root after substituting values into a squared formula.",
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
            "A formula expresses the relationship between variables in an everyday situation.",
            "The subject of a formula can be changed by performing the same inverse operation on both sides.",
            "The value of a variable is determined through substitution, sometimes after changing the subject first.",
          ],
        },
        {
          title: "Important Formulae",
          table: {
            headers: ["Original Formula", "New Subject", "Formula After Change"],
            rows: [
              ["v = u + at", "a", "a = (v - u) / t"],
              ["P = 2(l + b)", "b", "b = (P - 2l) / 2"],
              ["A = πr²", "r", "r = √(A / π)"],
              ["c² = a² + b²", "a", "a = √(c² - b²)"],
            ],
          },
        },
        {
          title: "Exam Tips",
          bulletPoints: [
            "Always write the inverse operation steps clearly so working marks can be awarded.",
            "Double-check whether the final answer should be positive only (for physical quantities).",
            "Use brackets when substituting negative values or fractions into a formula.",
          ],
        },
      ],
    },
  ],
  keyExamFacts: [
    "A formula shows the relationship between two or more variables.",
    "The inverse of addition is subtraction; the inverse of multiplication is division.",
    "The inverse of squaring is taking the square root, and vice versa.",
    "Perform the same operation on BOTH sides of the formula when changing the subject.",
    "For physical quantities such as length and radius, only the positive value is accepted after taking a square root.",
    "Substitute known values into the formula (with the correct subject) to find the unknown variable.",
  ],
  keyTerms: [
    "Formula",
    "Subject of a formula",
    "Variable",
    "Inverse operation",
    "Square",
    "Square root",
    "Substitution",
    "Equation",
  ],
};
