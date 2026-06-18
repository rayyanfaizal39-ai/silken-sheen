import type { StructuredNotes } from "@/data/types";

export const mathF1C7NotesDLP: StructuredNotes = {
  chapterSummary:
    "Chapter 7 introduces linear inequalities, inequality symbols, and how to represent them on a number line. Students will learn to solve linear inequalities, determine possible integer values, and solve simultaneous linear inequalities to find common values.",
  quickRevision: [
    "A linear inequality is a relationship between two linear expressions that are not necessarily equal, involving a variable with a power of 1.",
    "Inequality symbols: > (greater than), < (less than), ≥ (greater than or equal to), ≤ (less than or equal to).",
    "A number line is used to visually represent the solution of an inequality.",
    "An open circle (○) is used for > and <; a closed circle (●) is used for ≥ and ≤.",
    "Arrow points right when x > a or x ≥ a; arrow points left when x < a or x ≤ a.",
    "When multiplying or dividing both sides of an inequality by a negative number, the inequality symbol MUST be reversed.",
    "Converse Property: if a < b, then b > a.",
    "Transitive Property: if a < b and b < c, then a < c.",
    "Simultaneous linear inequalities are solved by finding the overlapping region (common values) on the number line.",
    "If two simultaneous inequalities have no overlapping region, there are no common values.",
  ],
  sections: [
    {
      title: "Learning Outcomes",
      subsections: [
        {
          content: "By the end of this chapter, students should be able to:",
          bulletPoints: [
            "Identify and use inequality symbols correctly.",
            "Represent linear inequalities on a number line using open and closed circles.",
            "Determine the direction of arrows on a number line based on the inequality symbol.",
            "Solve linear inequalities in one variable.",
            "Determine possible integer values for a given inequality.",
            "Solve simultaneous linear inequalities and find common values.",
            "Identify situations where no common values exist.",
          ],
        },
      ],
    },
    {
      title: "1. Introduction to Linear Inequalities",
      subsections: [
        {
          title: "Definition",
          content:
            "A linear inequality is a relationship between two expressions where the values are not necessarily equal. The word 'linear' means the variable in the expression has a power of 1.",
        },
        {
          title: "Meaning of 'Linear'",
          content:
            "Linear means the variable in the expression has a power of 1 only. The variable cannot have a power of two or more.",
          table: {
            headers: ["Linear Expression", "Non-Linear"],
            rows: [
              ["4a (power of a is 1)", "4a² (power of a is 2)"],
              ["−7x (power of x is 1)", "−7x³ (power of x is 3)"],
              ["2y + 3 (power of y is 1)", "2y² + 3y (power of y is 2)"],
              ["5m − 1 (power of m is 1)", "5m² − 1 (power of m is 2)"],
            ],
          },
        },
        {
          title: "Meaning of 'Inequality'",
          content:
            "Inequality means two values or expressions are not necessarily equal. Unlike an equation (=) which states both sides have EQUAL value, an inequality expresses a relationship of greater than, less than, or not equal to.",
        },
        {
          title: "Difference Between Equations and Inequalities",
          table: {
            headers: ["Equation", "Inequality"],
            rows: [
              ["Uses the equals sign =", "Uses the symbols >, <, ≥, or ≤"],
              ["Both sides are EQUAL in value", "Both sides are NOT NECESSARILY equal"],
              ["Usually one solution", "Usually many solutions"],
              ["Example: x + 3 = 7 → x = 4", "Example: x + 3 > 7 → x > 4"],
            ],
          },
        },
      ],
    },
    {
      title: "2. Inequality Symbols",
      subsections: [
        {
          title: "Four Main Symbols",
          content:
            "There are four inequality symbols used in Form 1 Mathematics:",
          table: {
            headers: ["Symbol", "Meaning", "Example", "Keywords"],
            rows: [
              [">", "Greater than", "x > 5", "Greater than, more than, exceeds"],
              ["<", "Less than", "x < 5", "Less than, fewer than, below"],
              ["≥", "Greater than or equal to", "x ≥ 5", "At least, minimum, not less than"],
              ["≤", "Less than or equal to", "x ≤ 5", "At most, maximum, not more than"],
            ],
          },
        },
        {
          title: "Keywords and Their Symbols",
          bulletPoints: [
            "'More than' / 'Greater than' / 'Exceeds' → use symbol >",
            "'Less than' / 'Fewer than' / 'Below' → use symbol <",
            "'At least' / 'Minimum' / 'Not less than' → use symbol ≥",
            "'At most' / 'Maximum' / 'Not more than' → use symbol ≤",
          ],
        },
        {
          title: "Real-Life Examples",
          table: {
            headers: ["Situation", "Inequality"],
            rows: [
              ["Alif's age exceeds 12 years", "u > 12"],
              ["Room temperature is less than 25°C", "s < 25"],
              ["Minimum passing mark is 50", "m ≥ 50"],
              ["Speed limit does not exceed 110 km/h", "h ≤ 110"],
            ],
          },
        },
      ],
    },
    {
      title: "3. Number Line",
      subsections: [
        {
          title: "Definition",
          content:
            "A number line is a horizontal visual tool used to represent all values that satisfy a given inequality. It helps students clearly understand the range of solutions.",
        },
        {
          title: "How to Read a Number Line",
          bulletPoints: [
            "Numbers increase from left to right.",
            "The circle on the number line marks the boundary value.",
            "The arrow shows the direction of values that satisfy the inequality.",
            "The shaded region or bold line represents all solution values.",
          ],
        },
        {
          title: "Example 1: x > 3",
          content:
            "The number line shows an open circle at 3, with an arrow pointing right. This means all values greater than 3 satisfy the inequality, but 3 itself is not included.",
          formula: "x > 3\nOpen circle at 3 → arrow pointing right (→)",
        },
        {
          title: "Example 2: x ≤ −4",
          content:
            "The number line shows a closed circle at −4, with an arrow pointing left. This means all values less than or equal to −4 satisfy the inequality, including −4 itself.",
          formula: "x ≤ −4\nClosed circle at −4 → arrow pointing left (←)",
        },
        {
          title: "Example 3: −1 < x ≤ 3",
          content:
            "This compound inequality means x is greater than −1 AND less than or equal to 3. The number line shows a shaded region between −1 (open circle) and 3 (closed circle).",
          formula: "−1 < x ≤ 3\nOpen circle at −1, closed circle at 3\nShaded region between −1 and 3",
        },
      ],
    },
    {
      title: "4. Open and Closed Circles",
      subsections: [
        {
          title: "Open Circle ○",
          content:
            "An open circle is used when the boundary value is NOT included in the solution set. It is used with the symbols > (greater than) and < (less than).",
          table: {
            headers: ["Symbol", "Circle Type", "Boundary Value"],
            rows: [
              ["> (greater than)", "Open circle ○", "Not included"],
              ["< (less than)", "Open circle ○", "Not included"],
            ],
          },
        },
        {
          title: "Examples with Open Circle",
          bulletPoints: [
            "x > 3: Open circle at 3 — value 3 is NOT included in the solution.",
            "x < −2: Open circle at −2 — value −2 is NOT included in the solution.",
            "y > 0: Open circle at 0 — value 0 is NOT included in the solution.",
          ],
        },
        {
          title: "Closed Circle ●",
          content:
            "A closed circle is used when the boundary value IS included in the solution set. It is used with the symbols ≥ (greater than or equal to) and ≤ (less than or equal to).",
          table: {
            headers: ["Symbol", "Circle Type", "Boundary Value"],
            rows: [
              ["≥ (greater than or equal to)", "Closed circle ●", "Included"],
              ["≤ (less than or equal to)", "Closed circle ●", "Included"],
            ],
          },
        },
        {
          title: "Examples with Closed Circle",
          bulletPoints: [
            "x ≥ 3: Closed circle at 3 — value 3 IS included in the solution.",
            "x ≤ −2: Closed circle at −2 — value −2 IS included in the solution.",
            "y ≥ 0: Closed circle at 0 — value 0 IS included in the solution.",
          ],
        },
        {
          title: "Summary Comparison",
          table: {
            headers: ["Symbol", "Circle", "Boundary Value", "Example"],
            rows: [
              [">", "Open ○", "Not included", "x > 5 → 5 not included"],
              ["<", "Open ○", "Not included", "x < 5 → 5 not included"],
              ["≥", "Closed ●", "Included", "x ≥ 5 → 5 included"],
              ["≤", "Closed ●", "Included", "x ≤ 5 → 5 included"],
            ],
          },
        },
      ],
    },
    {
      title: "5. Direction of Arrows",
      subsections: [
        {
          title: "Basic Principle",
          content:
            "The direction of the arrow on the number line depends on whether the value of x is greater or smaller than the boundary value.",
        },
        {
          title: "Arrow Points Right",
          content:
            "The arrow points right when x is greater than the boundary value, that is, when using the symbol > or ≥.",
          bulletPoints: [
            "x > 3 → Arrow points right starting from the open circle at 3.",
            "x ≥ 3 → Arrow points right starting from the closed circle at 3.",
            "x > −5 → Arrow points right starting from the open circle at −5.",
          ],
          formula: "x > a or x ≥ a → Arrow points right (→)",
        },
        {
          title: "Arrow Points Left",
          content:
            "The arrow points left when x is less than the boundary value, that is, when using the symbol < or ≤.",
          bulletPoints: [
            "x < 3 → Arrow points left starting from the open circle at 3.",
            "x ≤ 3 → Arrow points left starting from the closed circle at 3.",
            "x ≤ −4 → Arrow points left starting from the closed circle at −4.",
          ],
          formula: "x < a or x ≤ a → Arrow points left (←)",
        },
        {
          title: "Summary Table",
          table: {
            headers: ["Inequality", "Circle", "Arrow Direction"],
            rows: [
              ["x > a", "Open ○", "Right →"],
              ["x ≥ a", "Closed ●", "Right →"],
              ["x < a", "Open ○", "Left ←"],
              ["x ≤ a", "Closed ●", "Left ←"],
            ],
          },
        },
      ],
    },
    {
      title: "6. Switching Rules",
      subsections: [
        {
          title: "Important Warning",
          content:
            "This is the section that most commonly causes mistakes! In certain algebraic operations, the direction of the inequality symbol MUST be reversed to keep the inequality true.",
        },
        {
          title: "Rule 1: Removing Negatives",
          content:
            "When the variable x is in the form −x, convert it to x by multiplying both sides by −1. The inequality symbol MUST BE REVERSED.",
          formula:
            "Example:\n−x > −3\nMultiply both sides by −1:\nx < 3   ← Symbol reversed from > to <",
        },
        {
          title: "Rule 2: Multiplying by a Negative Number",
          content:
            "When multiplying both sides of an inequality by a negative number, the inequality symbol MUST BE REVERSED.",
          formula:
            "Example:\n−2x > 6\nDivide both sides by −2:\nx < −3   ← Symbol reversed from > to <",
        },
        {
          title: "Rule 3: Dividing by a Negative Number",
          content:
            "When dividing both sides of an inequality by a negative number, the inequality symbol MUST BE REVERSED.",
          formula:
            "Example:\n−4x ≤ 8\nDivide both sides by −4:\nx ≥ −2   ← Symbol reversed from ≤ to ≥",
        },
        {
          title: "Rule 4: Reciprocal Rule",
          content:
            "When taking the reciprocal of both sides of an inequality, the inequality symbol MUST BE REVERSED. Condition: a and b must be positive numbers.",
          formula:
            "If a < b (where a, b > 0), then:\n1/a > 1/b\n\nExample:\n2 < 5\n1/2 > 1/5 ✓",
        },
        {
          title: "Why Must the Symbol Be Reversed?",
          content:
            "Simple example: 3 < 7 is true. When we multiply both sides by −1, we get −3 and −7. On the number line, −3 is to the RIGHT of −7, so −3 > −7. Therefore, when multiplying by a negative, the symbol MUST be reversed.",
          formula:
            "3 < 7\nMultiply by −1:\n−3 > −7   ← Symbol reversed!",
        },
      ],
    },
    {
      title: "7. Multiplying and Dividing by Negative Numbers",
      subsections: [
        {
          title: "Main Rule",
          content:
            "When multiplying OR dividing BOTH SIDES of an inequality by a NEGATIVE number, the direction of the inequality symbol MUST BE REVERSED.",
        },
        {
          title: "Multiplication by a Negative Number",
          content: "Every time you multiply both sides of an inequality by a negative number, reverse the symbol.",
          table: {
            headers: ["Original Inequality", "Operation", "New Inequality"],
            rows: [
              ["−x > 3", "Multiply by −1", "x < −3"],
              ["−2x ≥ 8", "Divide by −2", "x ≤ −4"],
              ["−3x < −9", "Divide by −3", "x > 3"],
            ],
          },
        },
        {
          title: "Division by a Negative Number",
          content: "Every time you divide both sides of an inequality by a negative number, reverse the symbol.",
          formula:
            "Full worked example:\n−4x ≤ 8\nDivide both sides by −4:\nx ≥ 8 ÷ (−4)\nx ≥ −2   ← ≤ reversed to ≥",
        },
        {
          title: "Common Mistake",
          content:
            "The most common mistake: FORGETTING to reverse the symbol when multiplying or dividing by a negative number. Always check the sign of the coefficient of the variable before solving the inequality.",
          bulletPoints: [
            "Wrong: −2x > 6 → x > −3 ❌ (symbol not reversed)",
            "Correct: −2x > 6 → x < −3 ✓ (symbol reversed because we divided by −2)",
          ],
        },
      ],
    },
    {
      title: "8. Converse Property",
      subsections: [
        {
          title: "Definition",
          content:
            "The Converse Property states that if a < b, then b > a. In other words, when we swap the order of numbers in an inequality, we must reverse the direction of the symbol.",
        },
        {
          title: "Full Statement",
          formula:
            "If a < b, then b > a.\nIf a > b, then b < a.\nIf a ≤ b, then b ≥ a.\nIf a ≥ b, then b ≤ a.",
        },
        {
          title: "Examples of the Converse Property",
          table: {
            headers: ["Original Inequality", "Converse Form"],
            rows: [
              ["x < 5", "5 > x"],
              ["3 > −1", "−1 < 3"],
              ["y ≤ 8", "8 ≥ y"],
              ["2 ≥ −4", "−4 ≤ 2"],
            ],
          },
        },
        {
          title: "Use of the Converse Property",
          content:
            "The Converse Property is useful when we want to rewrite an inequality in a different but equivalent form. Both forms represent the same relationship between two values.",
          bulletPoints: [
            "x < 5 is equivalent to 5 > x.",
            "Both forms mean x is below 5.",
            "Choose the form that is easier for subsequent working.",
          ],
        },
      ],
    },
    {
      title: "9. Transitive Property",
      subsections: [
        {
          title: "Definition",
          content:
            "The Transitive Property states that if a < b and b < c, then a < c. This means the inequality relationship can be 'passed along' through a chain of values.",
        },
        {
          title: "Full Statement",
          formula:
            "If a < b and b < c, then a < c.\nIf a > b and b > c, then a > c.\nIf a ≤ b and b ≤ c, then a ≤ c.",
        },
        {
          title: "Examples of the Transitive Property",
          table: {
            headers: ["First Condition", "Second Condition", "Conclusion"],
            rows: [
              ["x < 3", "3 < 7", "Therefore x < 7"],
              ["2 < y", "y < 10", "Therefore 2 < 10 (true)"],
              ["a < b", "b < c", "Therefore a < c"],
              ["−2 < x", "x < 5", "Therefore −2 < 5 (true)"],
            ],
          },
        },
        {
          title: "Connection to Compound Inequalities",
          content:
            "The Transitive Property explains why a compound inequality like −1 < x < 5 means that x lies between −1 and 5. Because −1 < x and x < 5, it automatically follows that −1 < 5.",
          formula: "−1 < x < 5 means:\n−1 < x (x is greater than −1)\nand x < 5 (x is less than 5)",
        },
      ],
    },
    {
      title: "10. Solving Linear Inequalities",
      subsections: [
        {
          title: "Steps for Solving",
          bulletPoints: [
            "Step 1: Solve the inequality to find the value or range of x.",
            "Step 2: Represent the solution on a number line (open/closed circle and arrow).",
            "Step 3: List the possible integer values if required.",
          ],
        },
        {
          title: "Example 1: Simple Inequality",
          content: "Solve 2x + 3 > 7.",
          formula:
            "2x + 3 > 7\n2x > 7 − 3\n2x > 4\nx > 2\n\nNumber line: Open circle at 2, arrow pointing right.\nPossible integer values: 3, 4, 5, 6, ...",
        },
        {
          title: "Example 2: With Positive Numbers",
          content: "Solve 3x − 1 ≤ 8.",
          formula:
            "3x − 1 ≤ 8\n3x ≤ 8 + 1\n3x ≤ 9\nx ≤ 3\n\nNumber line: Closed circle at 3, arrow pointing left.\nPossible integer values: 3, 2, 1, 0, −1, ...",
        },
        {
          title: "Example 3: With a Negative Number (Symbol Reversed)",
          content: "Solve −2x + 5 > 1.",
          formula:
            "−2x + 5 > 1\n−2x > 1 − 5\n−2x > −4\nDivide by −2 (symbol REVERSED):\nx < 2\n\nNumber line: Open circle at 2, arrow pointing left.\nPossible integer values: 1, 0, −1, −2, ...",
        },
        {
          title: "Example 4: Inequality with a Fraction",
          content: "Solve x/3 + 1 ≥ 4.",
          formula:
            "x/3 + 1 ≥ 4\nx/3 ≥ 3\nx ≥ 9\n\nNumber line: Closed circle at 9, arrow pointing right.\nPossible integer values: 9, 10, 11, 12, ...",
        },
      ],
    },
    {
      title: "11. Finding Possible Integer Values",
      subsections: [
        {
          title: "Definition",
          content:
            "Possible integer values are all whole numbers (integers) that satisfy a given inequality. Integers include positive whole numbers, negative whole numbers, and zero.",
        },
        {
          title: "Examples with Open-Ended Range",
          bulletPoints: [
            "x > 3 → Possible integers: 4, 5, 6, 7, ... (infinite)",
            "x < −1 → Possible integers: −2, −3, −4, −5, ... (infinite)",
            "x ≥ 5 → Possible integers: 5, 6, 7, 8, ... (includes 5, infinite)",
            "x ≤ 2 → Possible integers: 2, 1, 0, −1, −2, ... (includes 2, infinite)",
          ],
        },
        {
          title: "Examples with Bounded Range (Compound)",
          table: {
            headers: ["Inequality", "Possible Integer Values"],
            rows: [
              ["−1 < x ≤ 4", "0, 1, 2, 3, 4"],
              ["2 ≤ x < 7", "2, 3, 4, 5, 6"],
              ["−3 ≤ x ≤ 3", "−3, −2, −1, 0, 1, 2, 3"],
              ["1 < x < 5", "2, 3, 4"],
            ],
          },
        },
        {
          title: "Important Note",
          content:
            "Pay attention to whether the boundary is included or not based on the type of circle on the number line. A closed circle (●) means the boundary value is included; an open circle (○) means the boundary value is not included.",
        },
      ],
    },
    {
      title: "12. Simultaneous Linear Inequalities",
      subsections: [
        {
          title: "Definition",
          content:
            "Simultaneous linear inequalities are two or more linear inequalities that must be satisfied at the same time by one variable. The goal is to find the common values that satisfy all the inequalities.",
        },
        {
          title: "Steps for Solving Simultaneous Inequalities",
          bulletPoints: [
            "Step 1: Solve each inequality separately.",
            "Step 2: Represent both solutions on the same number line.",
            "Step 3: Identify the overlapping region (the region satisfied by BOTH inequalities).",
            "Step 4: Write the simultaneous solution as a compound inequality if possible.",
            "Step 5: List possible integer values.",
          ],
        },
        {
          title: "Three Scenarios for Simultaneous Inequalities",
          table: {
            headers: ["Scenario", "Description", "Result"],
            rows: [
              ["Middle overlap", "Both regions meet in the middle", "Bounded range (common values exist)"],
              ["One-direction overlap", "Both regions face the same way, use stricter condition", "Bounded range (common values exist)"],
              ["No overlap", "Both regions do not meet at all", "No common values"],
            ],
          },
        },
      ],
    },
    {
      title: "13. Common Values",
      subsections: [
        {
          title: "Definition",
          content:
            "Common values are the values (or range of values) that satisfy BOTH inequalities in a simultaneous inequality at the same time. Common values are found in the overlapping region on the number line.",
        },
        {
          title: "Scenario 1: Middle Overlapping Region",
          content:
            "When two inequalities face opposite directions and meet in the middle, the common values lie in the middle overlapping region.",
          formula:
            "Example:\nInequality 1: x > −1\nInequality 2: x ≤ 3\n\nOn the number line:\n→ x > −1 (arrow right from −1)\n← x ≤ 3 (arrow left from 3)\nOverlapping region: −1 < x ≤ 3\n\nPossible integer values: 0, 1, 2, 3",
        },
        {
          title: "Scenario 2: Same-Direction Overlap",
          content:
            "When two inequalities face the same direction, use the STRICTER CONDITION (the more limiting value). The common values are the region satisfied by the stricter condition.",
          formula:
            "Example A (Both pointing right):\nx > 2 AND x > 5\nStricter condition: x > 5\nPossible integers: 6, 7, 8, ...\n\nExample B (Both pointing left):\nx ≤ 3 AND x ≤ 1\nStricter condition: x ≤ 1\nPossible integers: 1, 0, −1, −2, ...",
        },
        {
          title: "How to Determine the Stricter Condition",
          bulletPoints: [
            "If both inequalities point right (> or ≥): choose the boundary with the LARGER value.",
            "If both inequalities point left (< or ≤): choose the boundary with the SMALLER value.",
            "Example: x > 2 and x > 5 → stricter condition is x > 5 (larger boundary).",
            "Example: x ≤ 3 and x ≤ 1 → stricter condition is x ≤ 1 (smaller boundary).",
          ],
        },
      ],
    },
    {
      title: "14. No Common Values",
      subsections: [
        {
          title: "Definition",
          content:
            "No common values means there are no values that satisfy BOTH simultaneous inequalities at the same time. This occurs when the solution regions of the two inequalities do not overlap on the number line.",
        },
        {
          title: "Examples of No Common Values",
          formula:
            "Example 1:\nx > 5 AND x < 2\n→ x > 5: all values greater than 5 (right of 5)\n→ x < 2: all values less than 2 (left of 2)\n→ No value can be both greater than 5 AND less than 2 at the same time.\n→ No common values!\n\nExample 2:\nx ≥ 4 AND x ≤ 1\n→ x ≥ 4: all values 4 and above\n→ x ≤ 1: all values 1 and below\n→ No overlapping region.\n→ No common values!",
        },
        {
          title: "How to Identify No Common Values",
          bulletPoints: [
            "Sketch both inequalities on the same number line.",
            "If the shaded regions of both inequalities do not overlap, there are no common values.",
            "Common values exist ONLY if there is a region satisfied by BOTH inequalities.",
          ],
        },
        {
          title: "Comparison: Common Values vs. No Common Values",
          table: {
            headers: ["Situation", "Example", "Result"],
            rows: [
              ["Overlapping region exists", "x > 1 and x < 5", "Common values: 1 < x < 5"],
              ["No overlapping region", "x > 5 and x < 2", "No common values"],
              ["Boundaries meet only", "x > 3 and x < 3", "No common values"],
            ],
          },
        },
      ],
    },
    {
      title: "15. Chapter Summary",
      subsections: [
        {
          content:
            "The table below summarises the key concepts learned in Chapter 7: Linear Inequalities.",
          table: {
            headers: ["Concept", "Brief Description", "Example"],
            rows: [
              ["Symbol >", "Greater than", "x > 3: x exceeds 3"],
              ["Symbol <", "Less than", "x < 3: x is below 3"],
              ["Symbol ≥", "Greater than or equal to (minimum)", "x ≥ 3: x is at least 3"],
              ["Symbol ≤", "Less than or equal to (maximum)", "x ≤ 3: x is at most 3"],
              ["Open circle ○", "Boundary NOT included (for > and <)", "x > 3: open circle at 3"],
              ["Closed circle ●", "Boundary INCLUDED (for ≥ and ≤)", "x ≥ 3: closed circle at 3"],
              ["Reverse symbol", "Must reverse when multiplying/dividing by negative", "−2x > 6 → x < −3"],
              ["Converse Property", "If a < b then b > a", "x < 5 means 5 > x"],
              ["Transitive Property", "If a < b and b < c then a < c", "x < 3 and 3 < 7 → x < 7"],
              ["Integer values", "Whole numbers satisfying the inequality", "x > 3: 4, 5, 6, ..."],
              ["Simultaneous inequalities", "Two inequalities satisfied at the same time", "x > −1 and x ≤ 3 → −1 < x ≤ 3"],
              ["Common values", "Overlapping region of both inequalities", "−1 < x ≤ 3: integers 0, 1, 2, 3"],
              ["No common values", "No overlapping region", "x > 5 and x < 2: no solution"],
            ],
          },
        },
      ],
    },
  ],
  keyExamFacts: [
    "The variable in a linear inequality must have a power of 1; if it has a power of two or more, it is not a linear inequality.",
    "Open circle (○) for > and <; closed circle (●) for ≥ and ≤.",
    "Arrow points right for x > a or x ≥ a; arrow points left for x < a or x ≤ a.",
    "MUST reverse the inequality symbol when multiplying or dividing both sides by a NEGATIVE number.",
    "Converse Property: if a < b, then b > a — order swapped, symbol also swapped.",
    "Transitive Property: if a < b and b < c, then a < c.",
    "Simultaneous inequalities: find the overlapping region on the number line to find common values.",
    "No common values when the regions of two inequalities do not overlap on the number line.",
  ],
  keyTerms: [
    "Linear inequality",
    "Inequality symbol",
    "Number line",
    "Open circle",
    "Closed circle",
    "Arrow direction",
    "Reversing the symbol",
    "Negative number",
    "Converse Property",
    "Transitive Property",
    "Integer values",
    "Simultaneous inequalities",
    "Common values",
    "No common values",
  ],
};
