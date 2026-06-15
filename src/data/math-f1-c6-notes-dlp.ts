import type { StructuredNotes } from "./types";

export const mathF1C6NotesDLP: StructuredNotes = {
  chapterSummary:
    "Chapter 6 introduces linear equations in one and two variables, methods for solving them (trial and error, the equality concept, backtracking), and simultaneous linear equations solved using substitution, elimination, graphical methods and a scientific calculator.",
  quickRevision: [
    "A linear equation is an equation in which the highest power of the variable is 1.",
    "A linear equation in one variable contains only one variable, for example x + 7 = 11.",
    "The equality concept: perform the same operation on both sides of the equation so it stays balanced.",
    "The backtracking method uses inverse operations: + ↔ −, × ↔ ÷, applied in reverse order.",
    "A linear equation in two variables contains two variables that are each raised to the power of 1, for example 5x + 2y = 8.",
    "A linear equation in two variables has an infinite number of solutions.",
    "Simultaneous linear equations are two equations solved together to find the values of x and y.",
    "Simultaneous equations may have a unique solution, no solution, or infinitely many solutions.",
    "The substitution method and the elimination method are two algebraic ways to solve simultaneous equations.",
    "The graphical method solves simultaneous equations by finding the point of intersection of two straight lines.",
  ],
  sections: [
    {
      title: "Learning Outcomes",
      subsections: [
        {
          content: "By the end of this chapter, students should be able to:",
          bulletPoints: [
            "Identify and distinguish linear equations from non-linear equations.",
            "Form linear equations in one and two variables from everyday situations.",
            "Solve linear equations in one variable using trial and error, the equality concept and backtracking.",
            "Determine possible solutions of a linear equation in two variables.",
            "Understand the concept of simultaneous linear equations and the types of solutions they may have.",
            "Solve simultaneous linear equations using substitution, elimination, graphical methods and a scientific calculator.",
          ],
        },
      ],
    },
    {
      title: "1. Introduction to Linear Equations",
      subsections: [
        {
          title: "Definition",
          content:
            "A linear equation is an equation in which the highest power of the variable is 1.",
        },
        {
          title: "Linear versus Non-Linear Equations",
          content:
            "A linear equation contains variables raised only to the power of 1, while a non-linear equation contains a variable raised to a power greater than 1, such as a square.",
          table: {
            headers: ["Linear Equation", "Non-Linear Equation"],
            rows: [
              ["5r + 1 = 0", "10x² + 5x − 3 = 1"],
              ["x + 7 = 11", "x² − 4 = 0"],
              ["5x + 2y = 8", "x² + y = 6"],
            ],
          },
        },
        {
          title: "How to Identify a Linear Equation",
          bulletPoints: [
            "Check the highest power of every variable in the equation.",
            "If every variable is raised to the power of 1, the equation is a linear equation.",
            "If any variable is raised to the power of 2 or higher, the equation is not a linear equation.",
          ],
        },
      ],
    },
    {
      title: "2. Linear Equations in One Variable",
      subsections: [
        {
          title: "Main Feature",
          content:
            "A linear equation in one variable contains only one type of variable, and that variable is raised to the power of 1.",
        },
        {
          title: "Examples",
          bulletPoints: ["x + 7 = 11", "m/6 = 12", "5r + 1 = 0"],
          formula: "x + 7 = 11\nm/6 = 12",
        },
      ],
    },
    {
      title: "3. Forming Linear Equations",
      subsections: [
        {
          title: "From Everyday Situations",
          content:
            "Linear equations can be formed by representing an unknown quantity with a variable, then translating the sentence or situation into a mathematical form.",
        },
        {
          title: "Example 1: Division",
          content: "A number m divided by 6 gives 12.",
          formula: "m/6 = 12",
        },
        {
          title: "Example 2: Pocket Money",
          content: "Rahim has RM p. He spends RM q and is left with RM10.",
          formula: "p − q = 10",
        },
        {
          title: "Steps to Form an Equation",
          bulletPoints: [
            "Identify the unknown quantity and represent it with a variable.",
            "Write the relationship between the known and unknown quantities.",
            "Arrange that relationship into a complete equation.",
          ],
        },
      ],
    },
    {
      title: "4. Solving Linear Equations",
      subsections: [
        {
          title: "What Does It Mean to Solve an Equation?",
          content:
            "Solving a linear equation means finding the value of the variable that makes both sides of the equation equal in value (true).",
        },
        {
          title: "Step-by-Step Example",
          content: "Solve the equation x + 7 = 11.",
          formula: "x + 7 = 11\nx + 7 − 7 = 11 − 7\nx = 4",
        },
        {
          title: "Checking the Answer",
          content:
            "To check the answer, substitute the value obtained back into the original equation. If both sides are equal in value, the answer is correct. Example: 4 + 7 = 11 ✓",
        },
      ],
    },
    {
      title: "5. Trial and Error Method",
      subsections: [
        {
          title: "Concept",
          content:
            "The trial and error method solves an equation by trying several values for the variable until both sides of the equation become equal in value.",
        },
        {
          title: "Example",
          content: "Solve the equation x + 5 = 9 using the trial and error method.",
          table: {
            headers: ["Value of x tried", "Left-hand side (x + 5)", "Right-hand side", "Equal?"],
            rows: [
              ["2", "2 + 5 = 7", "9", "No"],
              ["3", "3 + 5 = 8", "9", "No"],
              ["4", "4 + 5 = 9", "9", "Yes — the solution is x = 4"],
            ],
          },
        },
        {
          title: "Strengths and Limitations",
          bulletPoints: [
            "Easy to understand and suitable for simple equations.",
            "Takes longer than algebraic methods when the solution is a large number or a fraction.",
          ],
        },
      ],
    },
    {
      title: "6. Equality Concept",
      subsections: [
        {
          title: "The Equality Concept",
          content:
            "The equality concept states that when the same operation (addition, subtraction, multiplication, or division by the same non-zero number) is performed on both sides of an equation, the equation remains balanced and true.",
        },
        {
          title: "Balance Card Analogy",
          content:
            "Imagine the equation as a balanced scale. Whatever is done to one side must also be done to the other side so that the scale stays balanced.",
        },
        {
          title: "Worked Example",
          content: "Solve x + 7 = 11 using the equality concept.",
          formula: "x + 7 = 11\nSubtract 7 from both sides:\nx + 7 − 7 = 11 − 7\nx = 4",
        },
        {
          title: "Operations You Can Perform",
          bulletPoints: [
            "Add the same number to both sides.",
            "Subtract the same number from both sides.",
            "Multiply both sides by the same non-zero number.",
            "Divide both sides by the same non-zero number.",
          ],
        },
      ],
    },
    {
      title: "7. Backtracking Method",
      subsections: [
        {
          title: "Concept of Inverse Operations",
          content:
            "The backtracking method solves an equation by reversing the order of operations and applying their inverse operations.",
          formula: "Addition (+) ↔ Subtraction (−)\nMultiplication (×) ↔ Division (÷)",
        },
        {
          title: "Step-by-Step Example",
          content: "Solve the equation 4x/5 + 7 = 23 using the backtracking method.",
          formula:
            "4x/5 + 7 = 23\nStep 1: Subtract 7 from both sides → 4x/5 = 16\nStep 2: Multiply both sides by 5 → 4x = 80\nStep 3: Divide both sides by 4 → x = 20",
        },
        {
          title: "How to Determine the Reverse Order",
          bulletPoints: [
            "Identify the operations applied to the variable, in order from the inside out.",
            "To 'undo' each operation, use its inverse operation, in reverse order (from the outside in).",
            "Apply each step to both sides of the equation until the variable stands alone.",
          ],
        },
      ],
    },
    {
      title: "8. Linear Equations in Two Variables",
      subsections: [
        {
          title: "Main Feature",
          content:
            "A linear equation in two variables contains two different types of variables, and each one of them is raised to the power of 1.",
        },
        {
          title: "Examples",
          bulletPoints: ["5x + 2y = 8", "p − q = 10", "2m + n = 15"],
          formula: "5x + 2y = 8",
        },
        {
          title: "Comparison with One-Variable Equations",
          table: {
            headers: ["One Variable", "Two Variables"],
            rows: [
              ["x + 7 = 11", "5x + 2y = 8"],
              ["Contains only one variable", "Contains two different variables"],
              ["Usually has one solution", "Has many pairs of solutions"],
            ],
          },
        },
      ],
    },
    {
      title: "9. Forming Two-Variable Equations",
      subsections: [
        {
          title: "From Everyday Situations",
          content:
            "Two-variable equations are formed by representing two unknown quantities with two different variables, then expressing the relationship between them.",
        },
        {
          title: "Example: Age Difference",
          content:
            "The difference between Salim's age, p years, and his sister's age, q years, is 10 years.",
          formula: "p − q = 10",
        },
        {
          title: "Steps to Form an Equation",
          bulletPoints: [
            "Identify the two unknown quantities and represent them with two different variables.",
            "Determine the relationship (addition, subtraction, multiplication, or division) between the two quantities.",
            "Write that relationship as a two-variable equation.",
          ],
        },
      ],
    },
    {
      title: "10. Finding Possible Solutions",
      subsections: [
        {
          title: "Concept",
          content:
            "A linear equation in two variables has an infinite number of solutions, because each different value substituted for one variable produces a corresponding value for the other variable.",
        },
        {
          title: "Example: y = 7x + 6",
          content:
            "By substituting different values of x, we can obtain different solution pairs (x, y).",
          table: {
            headers: ["x", "Working", "y", "Solution Pair (x, y)"],
            rows: [
              ["0", "y = 7(0) + 6", "6", "(0, 6)"],
              ["1", "y = 7(1) + 6", "13", "(1, 13)"],
              ["2", "y = 7(2) + 6", "20", "(2, 20)"],
            ],
          },
          formula: "y = 7x + 6\nx = 0 → y = 6\nx = 1 → y = 13",
        },
        {
          title: "Important Note",
          content:
            "Each pair of values (x, y) that satisfies the equation is called a solution of that equation.",
        },
      ],
    },
    {
      title: "11. Simultaneous Linear Equations",
      subsections: [
        {
          title: "Definition",
          content:
            "Simultaneous linear equations are two or more linear equations involving the same variables that are solved together to find the values of each variable that satisfy all the equations at the same time.",
        },
        {
          title: "Why 'Simultaneous'?",
          content:
            "They are called 'simultaneous' because the solution (the values of x and y) being sought must satisfy both equations at the same time, not just one of them.",
        },
        {
          title: "Example of a Pair of Simultaneous Equations",
          formula: "x + y = 10\nx − y = 2",
        },
      ],
    },
    {
      title: "12. Unique Solution",
      subsections: [
        {
          title: "Concept",
          content:
            "A unique solution occurs when the two straight lines representing the equations intersect at exactly one point. That point of intersection is the only pair of values (x, y) that satisfies both equations.",
        },
        {
          title: "Features",
          bulletPoints: [
            "The two lines have different gradients.",
            "The lines intersect at exactly one point.",
            "This system of equations has exactly one solution (x, y).",
          ],
        },
      ],
    },
    {
      title: "13. No Solution",
      subsections: [
        {
          title: "Concept",
          content:
            "No solution occurs when the two straight lines representing the equations are parallel and will never intersect at any point.",
        },
        {
          title: "Features",
          bulletPoints: [
            "The two lines have the same gradient but different y-intercepts.",
            "The lines will never meet no matter how far they are extended.",
            "This system of equations has no corresponding solution (x, y).",
          ],
        },
      ],
    },
    {
      title: "14. Infinite Solutions",
      subsections: [
        {
          title: "Concept",
          content:
            "Infinite solutions occur when both equations represent the same straight line. As a result, every point on that line is a valid solution.",
        },
        {
          title: "Features",
          bulletPoints: [
            "Both equations, when simplified, are equivalent to each other.",
            "The graphs of both equations overlap completely into a single line.",
            "This system of equations has an infinite number of solutions (x, y).",
          ],
        },
        {
          title: "Summary of the Three Types of Solutions",
          table: {
            headers: ["Type of Solution", "Relationship Between Lines", "Number of Solutions"],
            rows: [
              ["Unique solution", "Intersect at one point", "One (1)"],
              ["No solution", "Parallel (never intersect)", "Zero (0)"],
              ["Infinite solutions", "Same line (overlapping)", "Infinite"],
            ],
          },
        },
      ],
    },
    {
      title: "15. Substitution Method",
      subsections: [
        {
          title: "Concept",
          content:
            "The substitution method solves simultaneous linear equations by expressing one variable in terms of the other, then substituting it into the second equation.",
        },
        {
          title: "Steps",
          bulletPoints: [
            "Express one variable from one of the equations in terms of the other variable.",
            "Substitute that expression into the other equation.",
            "Solve the resulting one-variable equation.",
            "Substitute the value obtained back to find the value of the other variable.",
          ],
        },
        {
          title: "Worked Example",
          content:
            "Solve the following pair of simultaneous equations using the substitution method: x + y = 10 and x − y = 2.",
          formula:
            "From x + y = 10, express x = 10 − y\nSubstitute into x − y = 2:\n(10 − y) − y = 2\n10 − 2y = 2\n2y = 8\ny = 4\nSubstitute back: x = 10 − 4 = 6\nSolution: x = 6, y = 4",
        },
      ],
    },
    {
      title: "16. Elimination Method",
      subsections: [
        {
          title: "Concept",
          content:
            "The elimination method solves simultaneous linear equations by making the coefficients of one variable equal in both equations, then adding or subtracting the equations to eliminate that variable.",
        },
        {
          title: "Steps",
          bulletPoints: [
            "Multiply one or both equations by a suitable number so that the coefficients of one variable become equal.",
            "Add or subtract the two equations to eliminate that variable.",
            "Solve the resulting one-variable equation.",
            "Substitute the value obtained back to find the value of the other variable.",
          ],
        },
        {
          title: "Worked Example",
          content:
            "Solve the following pair of simultaneous equations using the elimination method: x + y = 10 and x − y = 2.",
          formula:
            "x + y = 10  ...(1)\nx − y = 2   ...(2)\nAdd equations (1) and (2):\n2x = 12\nx = 6\nSubstitute x = 6 into (1): 6 + y = 10 → y = 4\nSolution: x = 6, y = 4",
        },
      ],
    },
    {
      title: "17. Graphical Method",
      subsections: [
        {
          title: "Concept",
          content:
            "The graphical method solves simultaneous linear equations by drawing both straight lines represented by the equations on the same Cartesian plane, then reading the coordinates of their point of intersection.",
        },
        {
          title: "Steps",
          bulletPoints: [
            "Draw the graph of the first equation on a Cartesian plane.",
            "Draw the graph of the second equation on the same Cartesian plane.",
            "Identify the point of intersection between the two lines.",
            "Read the coordinates (x, y) of the point of intersection; this is the solution of the simultaneous equations.",
          ],
        },
        {
          title: "Note",
          content:
            "If the two lines do not intersect (they are parallel), the simultaneous equations have no solution. If the two lines overlap, there are infinitely many solutions.",
        },
      ],
    },
    {
      title: "18. Using a Scientific Calculator",
      subsections: [
        {
          title: "Why Use a Scientific Calculator?",
          content:
            "A scientific calculator has a special mode for solving simultaneous linear equations quickly and accurately, especially for equations involving large numbers or fractions.",
        },
        {
          title: "General Steps",
          bulletPoints: [
            "Press the MODE or MENU button on the calculator.",
            "Select Equation Mode.",
            "Select Simultaneous Equation.",
            "Select the number of unknown variables, namely 2 Unknowns.",
            "Enter the coefficients of each equation in the order requested by the calculator.",
            "Press the '=' button to obtain the values of x and y.",
          ],
        },
        {
          title: "Calculator Tip",
          content:
            "Make sure the equation is written in standard form (ax + by = c) before entering the coefficients a, b and c into the calculator. Recheck the values entered to avoid mistakes with positive or negative signs.",
        },
      ],
    },
    {
      title: "19. Chapter Summary",
      subsections: [
        {
          content:
            "The table below summarises the key concepts learned in Chapter 6: Linear Equations.",
          table: {
            headers: ["Concept", "Brief Description", "Example"],
            rows: [
              ["Linear equation", "An equation where the highest power of the variable is 1", "5r + 1 = 0"],
              ["One-variable equation", "Contains only one variable", "x + 7 = 11"],
              ["Two-variable equation", "Contains two different variables", "5x + 2y = 8"],
              ["Trial and error method", "Try values until both sides are equal", "x + 5 = 9 → x = 4"],
              ["Equality concept", "Perform the same operation on both sides", "x + 7 = 11 → x = 4"],
              ["Backtracking method", "Use inverse operations in reverse order", "4x/5 + 7 = 23 → x = 20"],
              ["Simultaneous equations", "Two equations solved together", "x + y = 10, x − y = 2"],
              ["Unique / no / infinite solutions", "Depends on the relationship between two lines", "Intersect / parallel / overlap"],
              ["Substitution method", "Express one variable, substitute into the other equation", "x = 10 − y"],
              ["Elimination method", "Equalise coefficients, then add or subtract", "2x = 12 → x = 6"],
            ],
          },
        },
      ],
    },
  ],
  keyExamFacts: [
    "A linear equation has variables raised only to the power of 1; if any power is 2 or higher, it is not a linear equation.",
    "Equality concept: whatever operation is performed on one side of the equation must also be performed on the other side.",
    "The backtracking method uses inverse operations (+ ↔ −, × ↔ ÷) in the reverse order from the original order.",
    "A linear equation in two variables has an infinite number of solutions (x, y).",
    "Simultaneous linear equations may have three possible types of solutions: unique, none, or infinite.",
    "Unique solution = lines intersect at one point; no solution = lines are parallel; infinite solutions = lines overlap.",
    "Substitution method: express one variable, then substitute it into the other equation.",
    "Elimination method: equalise the coefficients of one variable, then add or subtract the two equations.",
  ],
  keyTerms: [
    "Linear equation",
    "Variable",
    "Trial and error method",
    "Equality concept",
    "Backtracking method",
    "Inverse operation",
    "Simultaneous linear equations",
    "Unique solution",
    "No solution",
    "Infinite solutions",
    "Substitution method",
    "Elimination method",
    "Graphical method",
  ],
};
