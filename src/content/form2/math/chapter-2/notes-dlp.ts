import type { StructuredNotes } from "@/data/types";

export const mathF2C2NotesDLP: StructuredNotes = {
  chapterSummary:
    "Chapter 2 Factorisation and Algebraic Fractions teaches students to expand algebraic expressions, factorise algebraic expressions using various methods, and perform addition, subtraction, multiplication and division on algebraic fractions.",
  quickRevision: [
    "Expansion is the process of opening brackets by multiplying out every term.",
    "Factorisation is the process of writing an expression as a product of its factors; it is the reverse process of expansion.",
    "The highest common factor (HCF) must be identified first before further factorisation.",
    "Difference of two squares: a^2 - b^2 = (a + b)(a - b).",
    "For algebraic fractions, factorise the numerator and denominator first before simplifying, cancelling, multiplying or dividing.",
    "To add/subtract algebraic fractions, the denominators must be made the same by finding the lowest common multiple (LCM) first.",
  ],
  sections: [
    {
      title: "Learning Outcomes",
      subsections: [
        {
          content: "By the end of this chapter, students should be able to:",
          bulletPoints: [
            "Expand algebraic expressions in the form of single brackets and double brackets.",
            "Factorise algebraic expressions using common factors, the difference of two squares and the cross method for quadratic expressions.",
            "Multiply and divide algebraic fractions involving algebraic expressions.",
            "Add and subtract algebraic fractions with the same or different denominators.",
          ],
        },
      ],
    },
    {
      title: "2.1 Expansion",
      subsections: [
        {
          title: "Definition",
          content:
            "Expansion is the process of multiplying every term inside a bracket by the term or expression outside the bracket in order to open up the bracket.",
        },
        {
          title: "Formula",
          formula:
            "Single bracket: a(b + c) = ab + ac\nDouble brackets: (a + b)(c + d) = ac + ad + bc + bd",
        },
        {
          title: "Example 1 (Single Bracket)",
          content:
            "Question: Expand 3x(2x - 5).\nSolution: 3x(2x - 5) = (3x x 2x) + (3x x (-5))\n= 6x^2 - 15x\nAnswer: 6x^2 - 15x",
        },
        {
          title: "Example 2 (Double Brackets)",
          content:
            "Question: Expand (x + 3)(x - 4).\nSolution: (x + 3)(x - 4) = x(x - 4) + 3(x - 4)\n= x^2 - 4x + 3x - 12\n= x^2 - x - 12\nAnswer: x^2 - x - 12",
        },
        {
          title: "Example 3 (Perfect Square)",
          content:
            "Question: Expand (2x - 1)^2.\nSolution: (2x - 1)^2 = (2x - 1)(2x - 1)\n= 4x^2 - 2x - 2x + 1\n= 4x^2 - 4x + 1\nAnswer: 4x^2 - 4x + 1",
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "Every term in the first bracket must be multiplied by every term in the second bracket.",
            "Make sure signs (+ or -) are multiplied correctly according to the rules of signs.",
            "Always simplify the expression by combining like terms after expansion.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Forgetting to multiply the negative sign, causing a sign error in the answer.",
            "Not multiplying all terms, i.e. only expanding part of the bracket.",
            "Wrongly combining unlike terms, for example adding x^2 with x.",
          ],
        },
      ],
    },
    {
      title: "2.2 Factorisation of Algebraic Expressions",
      subsections: [
        {
          title: "Definition",
          content:
            "Factorisation is the process of writing an algebraic expression as the product of two or more factors. Factorisation is the reverse process of expansion.",
        },
        {
          title: "Method 1: Highest Common Factor (HCF)",
          content:
            "Find the highest common factor of all terms in the expression, then take out that factor outside the bracket.",
          formula: "ab + ac = a(b + c)",
        },
        {
          title: "Example 1 (HCF)",
          content:
            "Question: Factorise 6x^2 + 9x.\nSolution: The HCF of 6x^2 and 9x is 3x.\n6x^2 + 9x = 3x(2x) + 3x(3)\n= 3x(2x + 3)\nAnswer: 3x(2x + 3)",
        },
        {
          title: "Method 2: Difference of Two Squares",
          content:
            "Used when an expression consists of two squared terms being subtracted from each other.",
          formula: "a^2 - b^2 = (a + b)(a - b)",
        },
        {
          title: "Example 2 (Difference of Two Squares)",
          content:
            "Question: Factorise 4x^2 - 25.\nSolution: 4x^2 = (2x)^2 and 25 = 5^2\n4x^2 - 25 = (2x)^2 - (5)^2\n= (2x + 5)(2x - 5)\nAnswer: (2x + 5)(2x - 5)",
        },
        {
          title: "Method 3: Factorisation of Quadratic Expressions (Cross Method)",
          content:
            "Used to factorise a quadratic expression in the form ax^2 + bx + c. Find two numbers whose product equals a x c and whose sum equals b, then use grouping or the cross method.",
          formula: "ax^2 + bx + c = (px + q)(rx + s), where pr = a, qs = c, ps + qr = b",
        },
        {
          title: "Example 3 (Quadratic Expression, a = 1)",
          content:
            "Question: Factorise x^2 + 5x + 6.\nSolution: Find two numbers whose product is 6 and whose sum is 5, which are 2 and 3.\nx^2 + 5x + 6 = (x + 2)(x + 3)\nAnswer: (x + 2)(x + 3)",
        },
        {
          title: "Example 4 (Quadratic Expression, a not equal to 1)",
          content:
            "Question: Factorise 2x^2 + 7x + 3.\nSolution: a x c = 2 x 3 = 6. Find two numbers whose product is 6 and whose sum is 7, which are 1 and 6.\n2x^2 + 7x + 3 = 2x^2 + 6x + x + 3\n= 2x(x + 3) + 1(x + 3)\n= (2x + 1)(x + 3)\nAnswer: (2x + 1)(x + 3)",
        },
        {
          title: "Example 5 (Combination of HCF and Difference of Two Squares)",
          content:
            "Question: Factorise 2x^2 - 18.\nSolution: The HCF is 2.\n2x^2 - 18 = 2(x^2 - 9)\n= 2(x + 3)(x - 3)\nAnswer: 2(x + 3)(x - 3)",
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "Always look for the HCF first before using other factorisation methods.",
            "The difference of two squares method can only be used if both terms are perfect squares and are being subtracted.",
            "Check a factorisation answer by expanding it again to confirm it matches the original expression.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Trying to use the difference of two squares on an expression involving addition, for example a^2 + b^2 cannot be factorised with this method.",
            "Forgetting to take out the HCF before factorising further.",
            "Choosing the wrong pair of numbers during the cross method for quadratic expressions.",
          ],
        },
      ],
    },
    {
      title: "2.3 Algebraic Fractions: Multiplication and Division",
      subsections: [
        {
          title: "Definition",
          content:
            "An algebraic fraction is a fraction whose numerator or denominator contains an algebraic expression. Before multiplying or dividing, factorise the numerator and denominator first if possible, then cancel common factors.",
        },
        {
          title: "Formula",
          formula:
            "Multiplication: a/b x c/d = (a x c)/(b x d)\nDivision: a/b ÷ c/d = a/b x d/c",
        },
        {
          title: "Example 1 (Simple Multiplication)",
          content:
            "Question: Simplify (3x)/4 x 8/(9x^2).\nSolution: (3x)/4 x 8/(9x^2)\n= (3x x 8)/(4 x 9x^2)\n= 24x/36x^2\n= 2/(3x)\nAnswer: 2/(3x)",
        },
        {
          title: "Example 2 (Multiplication with Factorisation)",
          content:
            "Question: Simplify (x + 2)/3 x 6/(x^2 - 4).\nSolution: x^2 - 4 = (x + 2)(x - 2)\n(x + 2)/3 x 6/((x + 2)(x - 2))\n= 6/(3(x - 2))\n= 2/(x - 2)\nAnswer: 2/(x - 2)",
        },
        {
          title: "Example 3 (Division)",
          content:
            "Question: Simplify (2x)/5 ÷ 4x^2/15.\nSolution: (2x)/5 ÷ 4x^2/15\n= (2x)/5 x 15/4x^2\n= 30x/20x^2\n= 3/(2x)\nAnswer: 3/(2x)",
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "Fully factorise the numerator and denominator before cancelling common factors.",
            "When dividing, convert the division into multiplication using the reciprocal of the second fraction.",
            "The final fraction must be simplified to its simplest form.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Cancelling terms directly without factorising first, for example cancelling x in (x+2)/(x+4) which is not actually allowed.",
            "Forgetting to convert division into multiplication using the reciprocal when dividing fractions.",
            "Multiplying the denominator with the numerator by mistake.",
          ],
        },
      ],
    },
    {
      title: "2.4 Algebraic Fractions: Addition and Subtraction",
      subsections: [
        {
          title: "Definition",
          content:
            "To add or subtract algebraic fractions, the denominators must first be made the same by finding the lowest common multiple (LCM) of the denominators.",
        },
        {
          title: "Formula",
          formula:
            "Same denominator: a/c + b/c = (a + b)/c\nDifferent denominators: a/b + c/d = (ad + bc)/bd",
        },
        {
          title: "Example 1 (Same Denominator)",
          content:
            "Question: Simplify (3x)/7 - (2x)/7.\nSolution: (3x)/7 - (2x)/7 = (3x - 2x)/7\n= x/7\nAnswer: x/7",
        },
        {
          title: "Example 2 (Different Denominators, Numbers)",
          content:
            "Question: Simplify x/3 + x/4.\nSolution: The LCM of 3 and 4 is 12.\nx/3 + x/4 = 4x/12 + 3x/12\n= (4x + 3x)/12\n= 7x/12\nAnswer: 7x/12",
        },
        {
          title: "Example 3 (Different Denominators, Algebraic)",
          content:
            "Question: Simplify 2/x - 3/(x + 1).\nSolution: The LCM of x and (x + 1) is x(x + 1).\n2/x - 3/(x + 1) = 2(x + 1)/(x(x + 1)) - 3x/(x(x + 1))\n= (2x + 2 - 3x)/(x(x + 1))\n= (2 - x)/(x(x + 1))\nAnswer: (2 - x)/(x(x + 1))",
        },
        {
          title: "Example 4 (Different Denominators with Factorisation)",
          content:
            "Question: Simplify 1/(x - 2) + 3/(x^2 - 4).\nSolution: x^2 - 4 = (x + 2)(x - 2), so the LCM is (x + 2)(x - 2).\n1/(x - 2) + 3/((x + 2)(x - 2))\n= (x + 2)/((x + 2)(x - 2)) + 3/((x + 2)(x - 2))\n= (x + 2 + 3)/((x + 2)(x - 2))\n= (x + 5)/((x + 2)(x - 2))\nAnswer: (x + 5)/((x + 2)(x - 2))",
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "Always factorise the denominators first to correctly identify the LCM, especially if the denominator is a quadratic expression.",
            "After the denominators are made the same, only the numerators are added or subtracted; the denominator stays the same.",
            "Simplify the final answer if there is a common factor between the numerator and denominator.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Adding or subtracting the denominators directly, when the denominators should be made the same first.",
            "Forgetting to multiply the numerator when the denominator is multiplied to make it the same.",
            "Sign errors when subtracting fractions, especially not distributing the negative sign to all terms in the numerator.",
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
            "Expansion opens brackets; factorisation writes an expression as a product of factors.",
            "Always look for the HCF first before using other factorisation methods.",
            "Difference of two squares only applies to a^2 - b^2, not a^2 + b^2.",
            "For algebraic fractions, factorise first before cancelling, multiplying, dividing, adding or subtracting.",
            "Denominators must be made the same using the LCM before adding or subtracting algebraic fractions.",
          ],
          table: {
            headers: ["Subtopic", "Key Skill"],
            rows: [
              ["2.1 Expansion", "Multiplying every term in a bracket"],
              ["2.2 Factorisation", "HCF, difference of two squares, cross method"],
              ["2.3 Multiplying/Dividing Algebraic Fractions", "Factorise, cancel, multiply/divide"],
              ["2.4 Adding/Subtracting Algebraic Fractions", "Make denominators the same using LCM"],
            ],
          },
        },
        {
          title: "Important Formulas",
          formula:
            "a(b + c) = ab + ac\n(a + b)(c + d) = ac + ad + bc + bd\na^2 - b^2 = (a + b)(a - b)\na/b x c/d = (a x c)/(b x d)\na/b ÷ c/d = a/b x d/c\na/c + b/c = (a + b)/c",
        },
        {
          title: "Exam Tips",
          bulletPoints: [
            "Check a factorisation answer by expanding it again.",
            "Always factorise fully before simplifying algebraic fractions.",
            "Write the steps for finding the LCM clearly for working marks.",
            "Be careful with negative signs during expansion and subtraction of fractions.",
          ],
        },
      ],
    },
  ],
  keyExamFacts: [
    "Expansion: a(b + c) = ab + ac and (a + b)(c + d) = ac + ad + bc + bd.",
    "Factorisation is the reverse process of expansion.",
    "Difference of two squares: a^2 - b^2 = (a + b)(a - b).",
    "Factorise the numerator and denominator of an algebraic fraction before cancelling, multiplying or dividing.",
    "To add/subtract algebraic fractions, make the denominators the same using the LCM first.",
    "Division of algebraic fractions is converted into multiplication using the reciprocal.",
  ],
  keyTerms: [
    "Expansion",
    "Factorisation",
    "Highest Common Factor (HCF)",
    "Difference of Two Squares",
    "Quadratic Expression",
    "Algebraic Fraction",
    "Lowest Common Multiple (LCM)",
    "Reciprocal",
  ],
};
