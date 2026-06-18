import type { StructuredNotes } from "@/data/types";

export const mathF1C5NotesDLP: StructuredNotes = {
  chapterSummary:
    "Chapter 5 introduces the basics of algebra: using letters to represent unknown values, forming and evaluating algebraic expressions, like and unlike terms, and the addition, subtraction, multiplication and division of algebraic expressions.",
  quickRevision: [
    "Algebra uses letters such as x, y, a and n to represent unknown values.",
    "A variable is a letter or symbol that represents an unknown value.",
    "Algebraic expressions are formed from everyday situations, for example n + 6, n − 1 and 3n.",
    "The value of an algebraic expression is found by substituting the variable with a number (substitution method).",
    "A coefficient is the numerical factor that multiplies a variable, for example the coefficient of 3x is 3.",
    "Only like terms (same variables and same powers) can be added or subtracted.",
    "Sign rules: −(a + b) = −a − b, −(a − b) = −a + b, −(−a − b) = a + b.",
    "Repeated multiplication leads to power notation: a × a = a², a × a × a = a³.",
    "When multiplying algebraic terms, add the powers of the same variable: aᵐ × aⁿ = aᵐ⁺ⁿ.",
    "When dividing algebraic terms, subtract the powers of the same variable and cancel common factors.",
  ],
  sections: [
    {
      title: "Learning Outcomes",
      subsections: [
        {
          content: "By the end of this chapter, students should be able to:",
          bulletPoints: [
            "Explain the meaning of algebra and the origin of the word 'al-jabr'.",
            "Identify variables and distinguish fixed values from varied values.",
            "Form algebraic expressions from everyday situations.",
            "Evaluate algebraic expressions using the substitution method.",
            "Identify algebraic terms, coefficients, like terms and unlike terms.",
            "Add and subtract algebraic expressions and apply sign rules correctly.",
            "Multiply and divide simple algebraic expressions using the laws of indices.",
          ],
        },
      ],
    },
    {
      title: "1. Introduction to Algebra",
      subsections: [
        {
          title: "Meaning of Algebra",
          content:
            "Algebra is a branch of mathematics that uses letters and symbols to represent numbers or unknown values. Algebra allows us to write and solve problems in a general way without first having to state the actual numbers involved.",
        },
        {
          title: "Origin of the Word 'Al-Jabr'",
          content:
            "The word 'algebra' comes from the Arabic word 'al-jabr', which means 'to reunite' or 'to put broken parts together'. The word appeared in the title of a book written by the Islamic mathematician Al-Khawarizmi, which discussed methods for solving equations.",
        },
        {
          title: "Letters Representing Unknown Values",
          content:
            "In algebra, letters are used to represent values that are unknown or that may vary.",
          bulletPoints: [
            "x — usually represents the value we want to find",
            "y — represents a second unknown quantity",
            "a — often used to represent any number",
            "n — often used to represent a number or quantity of items",
          ],
        },
      ],
    },
    {
      title: "2. Variables",
      subsections: [
        {
          title: "Definition",
          content: "A variable is a letter or symbol that represents an unknown value.",
        },
        {
          title: "Examples of Variables",
          bulletPoints: ["x", "y", "n", "a"],
        },
        {
          title: "Why Are Variables Used?",
          content:
            "Variables allow us to write expressions and equations in a general way so that they can apply to many different values, instead of just one fixed number.",
        },
      ],
    },
    {
      title: "3. Fixed Values and Varied Values",
      subsections: [
        {
          title: "Fixed Value",
          content:
            "A fixed value is a quantity whose value does not change in a given situation. For example, the annual interest rate set by a bank stays the same throughout a fixed period.",
        },
        {
          title: "Varied Value",
          content:
            "A varied value is a quantity whose value can change depending on circumstances. For example, the daily travel time to school can differ because of traffic conditions or weather.",
        },
        {
          title: "Comparing Fixed Values and Varied Values",
          table: {
            headers: ["Fixed Value", "Varied Value"],
            rows: [
              ["Annual interest rate", "Daily travel time to school"],
              ["Number of days in a week", "Number of students present each day"],
              ["Boiling point of water at sea level", "Air temperature at different times"],
            ],
          },
        },
      ],
    },
    {
      title: "4. Forming Algebraic Expressions",
      subsections: [
        {
          title: "Concept",
          content:
            "Algebraic expressions are formed by using a variable to represent an unknown quantity in a situation, then combining it with numbers using operations such as addition, subtraction or multiplication.",
        },
        {
          title: "Example: Sweets in a Jar",
          content:
            "Suppose there are n sweets in a jar. Here is how an algebraic expression can be formed for different situations:",
          bulletPoints: [
            "Add 6 sweets to the jar: n + 6",
            "Eat 1 sweet from the jar: n − 1",
            "Three identical jars, each containing n sweets: 3n",
          ],
          formula: "n + 6\nn − 1\n3n",
        },
        {
          title: "Explanation",
          content:
            "The addition sign '+' is used when a quantity increases, the subtraction sign '−' is used when a quantity decreases, and multiplication is used when the same quantity is repeated several times (for example, 3 jars × n sweets = 3n).",
        },
      ],
    },
    {
      title: "5. Evaluating Expressions",
      subsections: [
        {
          title: "Substitution Method",
          content:
            "The value of an algebraic expression can be found by substituting each variable with the given numerical value, then carrying out the calculation following the correct order of operations.",
        },
        {
          title: "Worked Example",
          content: "Given x = 3 and y = 2, find the value of the expression 8x − 5y + 7.",
          formula: "8x − 5y + 7\n= 8(3) − 5(2) + 7\n= 24 − 10 + 7\n= 21",
        },
        {
          title: "Substitution Steps",
          bulletPoints: [
            "Replace each variable with its given value, using brackets where needed.",
            "Carry out multiplication first, before addition and subtraction.",
            "Work out the final answer following the correct order of operations.",
          ],
        },
      ],
    },
    {
      title: "6. Algebraic Terms",
      subsections: [
        {
          title: "Single Terms",
          content:
            "An algebraic term is a number, a variable, or the product of a number and a variable. Each term can stand alone as a single unit within an expression.",
          bulletPoints: ["3ab", "5x", "−2y", "7"],
        },
        {
          title: "Terms within an Expression",
          content:
            "An algebraic expression is made up of one or more terms separated by a plus sign (+) or a minus sign (−). For example, in the expression 3ab + 5x − 2y + 7, there are four terms: 3ab, 5x, −2y and 7.",
        },
      ],
    },
    {
      title: "7. Coefficients",
      subsections: [
        {
          title: "Definition",
          content:
            "A coefficient is the numerical factor that multiplies a variable in an algebraic term.",
        },
        {
          title: "Examples of Coefficients",
          table: {
            headers: ["Term", "Coefficient"],
            rows: [
              ["3x", "3"],
              ["−7ab", "−7"],
              ["y", "1"],
              ["−n", "−1"],
            ],
          },
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "When a variable is written without a number in front of it, its coefficient is 1, for example y means 1y.",
            "A negative sign in front of a term is part of the coefficient, for example the coefficient of −7ab is −7.",
          ],
        },
      ],
    },
    {
      title: "8. Like Terms",
      subsections: [
        {
          title: "Definition",
          content:
            "Like terms are algebraic terms that have the same variables and the same power for each variable. Only their coefficients may differ.",
        },
        {
          title: "Examples of Like Terms",
          bulletPoints: [
            "3x and 8x — both have the variable x with power 1",
            "2ab and −5ab — both have the variables a and b with power 1",
            "xy and yx — both represent the product of the same variables (x × y = y × x)",
          ],
        },
        {
          title: "Features of Like Terms",
          bulletPoints: [
            "They have the same variables.",
            "They have the same power for each variable.",
          ],
        },
      ],
    },
    {
      title: "9. Unlike Terms",
      subsections: [
        {
          title: "Definition",
          content:
            "Unlike terms are algebraic terms that have different variables, or the same variable but with different powers.",
        },
        {
          title: "Examples of Unlike Terms",
          bulletPoints: [
            "x and x² — same variable but different powers (power 1 versus power 2)",
            "2a and 2b — different variables (a versus b)",
            "ab and abc — different number of variables (two variables versus three variables)",
          ],
        },
        {
          title: "Why Are They Different?",
          content:
            "Unlike terms cannot be combined into a single term because they represent different kinds of quantities. For example, x represents one quantity while x² represents that quantity multiplied by itself — they are not the same thing.",
        },
      ],
    },
    {
      title: "10. Addition and Subtraction of Algebraic Expressions",
      subsections: [
        {
          title: "Important Rule",
          content: "Only like terms can be added to or subtracted from each other.",
        },
        {
          title: "Examples of Addition and Subtraction",
          formula: "3x + 2x = 5x\n7ab − 4ab = 3ab",
        },
        {
          title: "How to Solve",
          bulletPoints: [
            "Identify the like terms within the expression.",
            "Add or subtract the coefficients of the like terms only.",
            "Keep the variable and its power unchanged.",
          ],
        },
        {
          title: "Common Mistake",
          content:
            "Students often mistakenly combine unlike terms, for example writing 3x + 2y = 5xy. This is incorrect because x and y are different variables and cannot be merged into one term. The expression 3x + 2y must be left in its original form because the terms are not like terms.",
        },
      ],
    },
    {
      title: "11. Sign Rules",
      subsections: [
        {
          title: "Sign Rule Formulas",
          content:
            "When a negative sign is placed in front of brackets, every term inside the brackets must be multiplied by that negative sign.",
          formula: "−(a + b) = −a − b\n−(a − b) = −a + b\n−(−a − b) = a + b",
        },
        {
          title: "Worked Example",
          content:
            "Simplify the expression 5x − (2x − 3).\nStep: 5x − (2x − 3) = 5x − 2x + 3 = 3x + 3.",
        },
        {
          title: "More Examples",
          bulletPoints: [
            "−(x + 4) = −x − 4",
            "−(3a − 2b) = −3a + 2b",
            "−(−5x − 1) = 5x + 1",
          ],
        },
      ],
    },
    {
      title: "12. Repeated Multiplication",
      subsections: [
        {
          title: "Concept of Powers",
          content:
            "When a variable is multiplied by itself repeatedly, the result can be written in a shorter form using powers (indices).",
          formula: "a × a = a²\na × a × a = a³",
        },
        {
          title: "Reading Powers",
          bulletPoints: [
            "a² is read as 'a squared' or 'a to the power of two', and means a × a",
            "a³ is read as 'a cubed' or 'a to the power of three', and means a × a × a",
            "The small raised number (the power, or index) shows how many times the variable is multiplied by itself",
          ],
        },
        {
          title: "Repeated Multiplication of Expressions",
          content:
            "The same idea applies when an entire expression is multiplied by itself repeatedly.",
          formula: "(a + b)(a + b)(a + b) = (a + b)³",
        },
      ],
    },
    {
      title: "13. Multiplication of Algebraic Expressions",
      subsections: [
        {
          title: "Law of Adding Powers",
          content:
            "When multiplying two algebraic terms that have the same variable, add the powers of that variable.",
          formula: "aᵐ × aⁿ = aᵐ⁺ⁿ",
        },
        {
          title: "Step-by-Step Worked Example",
          content: "Simplify 3ab² × 4a³b.",
          formula:
            "3ab² × 4a³b\n= (3 × 4) × (a × a³) × (b² × b)\n= 12 × a¹⁺³ × b²⁺¹\n= 12a⁴b³",
        },
        {
          title: "Explaining the Power Addition",
          bulletPoints: [
            "Multiply the coefficients (numbers) of both terms first: 3 × 4 = 12.",
            "Add the powers of the same variable a: a¹ × a³ = a¹⁺³ = a⁴.",
            "Add the powers of the same variable b: b² × b¹ = b²⁺¹ = b³.",
            "Combine all the results to get the final answer: 12a⁴b³.",
          ],
        },
      ],
    },
    {
      title: "14. Division of Algebraic Expressions",
      subsections: [
        {
          title: "Law of Subtracting Powers",
          content:
            "When dividing two algebraic terms that have the same variable, subtract the powers of that variable.",
          formula: "aᵐ ÷ aⁿ = aᵐ⁻ⁿ",
        },
        {
          title: "Step-by-Step Worked Example",
          content: "Simplify 20m⁴n² ÷ 5m²n³.",
          formula:
            "20m⁴n² ÷ 5m²n³\n= (20 ÷ 5) × (m⁴ ÷ m²) × (n² ÷ n³)\n= 4 × m⁴⁻² × n²⁻³\n= 4m²n⁻¹\n= 4m²/n",
        },
        {
          title: "Explaining the Cancelling of Common Factors",
          bulletPoints: [
            "Divide the coefficients (numbers) of both terms first: 20 ÷ 5 = 4.",
            "Subtract the powers of the same variable m: m⁴ ÷ m² = m⁴⁻² = m².",
            "Subtract the powers of the same variable n: n² ÷ n³ = n²⁻³ = n⁻¹, which is 1/n.",
            "Combine the results and write the answer as a fraction when the power becomes negative: 4m²/n.",
          ],
        },
      ],
    },
    {
      title: "15. Chapter Summary",
      subsections: [
        {
          content:
            "The table below summarises the key concepts learned in Chapter 5: Algebraic Expressions.",
          table: {
            headers: ["Concept", "Brief Description", "Example"],
            rows: [
              ["Variable", "A letter representing an unknown value", "x, y, a, n"],
              ["Algebraic expression", "A combination of terms and variables", "n + 6, 3n, n − 1"],
              ["Value of an expression", "Found using the substitution method", "8(3) − 5(2) + 7 = 21"],
              ["Coefficient", "The numerical factor multiplying a variable", "The coefficient of 3x is 3"],
              ["Like terms", "Same variables and same powers", "3x and 8x"],
              ["Unlike terms", "Different variables or different powers", "x and x²"],
              ["Addition/subtraction", "Only like terms can be combined", "3x + 2x = 5x"],
              ["Sign rules", "Multiply the negative sign across every term in brackets", "−(a − b) = −a + b"],
              ["Multiplication", "Add the powers of the same variable", "3ab² × 4a³b = 12a⁴b³"],
              ["Division", "Subtract the powers of the same variable", "20m⁴n² ÷ 5m²n³ = 4m²/n"],
            ],
          },
        },
      ],
    },
  ],
  keyExamFacts: [
    "A variable is a letter that represents an unknown value, for example x, y, a and n.",
    "To find the value of an expression, substitute the variable with a number and follow the order of operations.",
    "A coefficient is the number in front of a variable; the coefficient of y is 1 and the coefficient of −n is −1.",
    "Like terms must have the same variables and the same powers; only like terms can be added or subtracted.",
    "When removing brackets with a negative sign in front, change the sign of every term inside the brackets.",
    "Multiplying algebraic terms: add the powers of the same variable (aᵐ × aⁿ = aᵐ⁺ⁿ).",
    "Dividing algebraic terms: subtract the powers of the same variable (aᵐ ÷ aⁿ = aᵐ⁻ⁿ).",
    "a × a = a² and a × a × a = a³ — power notation shortens repeated multiplication.",
  ],
  keyTerms: [
    "Algebra",
    "Variable",
    "Algebraic expression",
    "Algebraic term",
    "Coefficient",
    "Like terms",
    "Unlike terms",
    "Sign rules",
    "Power (index)",
    "Law of adding powers",
    "Law of subtracting powers",
  ],
};
