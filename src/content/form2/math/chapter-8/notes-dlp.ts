import type { StructuredNotes } from "@/data/types";

export const mathF2C8NotesDLP: StructuredNotes = {
  chapterSummary:
    "Chapter 8 Graphs of Functions introduces the concept of a function, function notation f(x), domain and range, and how to construct a table of values and sketch graphs of linear functions and non-linear (quadratic) functions.",
  quickRevision: [
    "A function is a relation that maps every value in the domain (x) to exactly one value in the range (y).",
    "Function notation f(x) means the value of y for a given value of x.",
    "The domain is the set of allowed x-values; the range is the set of resulting y-values.",
    "The graph of a linear function, such as y = mx + c, is a straight line.",
    "The graph of a non-linear function such as y = ax^2 + bx + c is a smooth curve (parabola).",
    "Always construct a table of values before sketching a graph so that the points are accurate and organised.",
    "Join points with a straight line for a linear graph, and with a smooth curve for a non-linear graph — never use a straight line for a curved graph.",
  ],
  sections: [
    {
      title: "Learning Outcomes",
      subsections: [
        {
          content: "By the end of this chapter, students should be able to:",
          bulletPoints: [
            "Identify a relation between two variables as a function.",
            "Determine the value of a function for a given domain value using the notation f(x).",
            "Construct a table of values for a function.",
            "Sketch graphs of linear functions and non-linear functions.",
            "Determine the shape of the graph of a linear function and a non-linear function.",
            "Solve problems involving graphs of functions.",
          ],
        },
      ],
    },
    {
      title: "8.1 Functions",
      subsections: [
        {
          title: "Definition",
          content:
            "A function is a special relation that maps every value in the domain (the set of inputs, x) to exactly one value in the range (the set of outputs, y). A function can be represented using a mapping diagram, a table, ordered pairs, or an algebraic equation.",
        },
        {
          title: "Function Notation",
          content:
            "The notation f(x) is read as 'f of x' and represents the value of y that corresponds to x in the function f. For example, if f(x) = 2x + 1, then f(3) means substituting x = 3 into the function.",
          formula: "f(x) = 2x + 1\nf(3) = 2(3) + 1 = 7",
        },
        {
          title: "Domain and Range",
          bulletPoints: [
            "Domain: the set of all allowed x-values (inputs) in a function.",
            "Range: the set of all y-values (outputs) produced from the domain.",
            "Each domain value can only be mapped to ONE range value for it to be a function.",
          ],
        },
        {
          title: "Example 1",
          content:
            "Question: Given the function f(x) = 3x - 2, find the value of f(0), f(2) and f(-1).\n\nSolution:\nf(0) = 3(0) - 2 = -2\nf(2) = 3(2) - 2 = 4\nf(-1) = 3(-1) - 2 = -5\n\nAnswer: f(0) = -2, f(2) = 4, f(-1) = -5",
        },
        {
          title: "Example 2",
          content:
            "Question: Given the function g(x) = x^2 - 1, find the value of g(-2), g(0) and g(3).\n\nSolution:\ng(-2) = (-2)^2 - 1 = 4 - 1 = 3\ng(0) = (0)^2 - 1 = -1\ng(3) = (3)^2 - 1 = 9 - 1 = 8\n\nAnswer: g(-2) = 3, g(0) = -1, g(3) = 8",
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "f(x) is another name for y in a function.",
            "Substitute the given value of x into the function to find f(x).",
            "Each single value of x produces exactly ONE value of f(x) — this is the key property of a function.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Making substitution errors, especially with negative x-values (forgetting that a negative number squared is positive).",
            "Applying the wrong order of operations when calculating f(x), e.g. multiplying/squaring before adding/subtracting.",
            "Confusing f(x) with f multiplied by x — f(x) is function notation, not multiplication.",
          ],
        },
      ],
    },
    {
      title: "8.2 Graphs of Functions",
      subsections: [
        {
          title: "Definition",
          content:
            "A graph of a function is a visual representation of a function on the Cartesian plane, drawn from the pairs of values (x, y) obtained from a table of values for that function.",
        },
        {
          title: "Steps to Sketch a Graph of a Function",
          bulletPoints: [
            "1. Construct a table of values by substituting each given x-value into the function to find y.",
            "2. Choose a suitable scale for the x-axis and y-axis based on the range of values in the table.",
            "3. Plot all the points (x, y) from the table on the Cartesian plane.",
            "4. Join the points with a straight line (linear function) or a smooth curve (non-linear function).",
            "5. Label the graph and both axes clearly.",
          ],
        },
        {
          title: "Example 1 — Graph of a Linear Function",
          content:
            "Question: Construct a table of values and sketch the graph of y = 2x + 1 for -2 ≤ x ≤ 2.\n\nSolution: Substitute each value of x into y = 2x + 1.\nx = -2: y = 2(-2) + 1 = -3\nx = -1: y = 2(-1) + 1 = -1\nx = 0: y = 2(0) + 1 = 1\nx = 1: y = 2(1) + 1 = 3\nx = 2: y = 2(2) + 1 = 5\n\nAnswer: Table of values (x, y): (-2, -3), (-1, -1), (0, 1), (1, 3), (2, 5). When these points are plotted and joined, the resulting graph is a STRAIGHT LINE rising from left to right (positive gradient).",
          table: {
            headers: ["x", "-2", "-1", "0", "1", "2"],
            rows: [["y = 2x + 1", "-3", "-1", "1", "3", "5"]],
          },
        },
        {
          title: "Example 2 — Graph of a Non-Linear (Quadratic) Function",
          content:
            "Question: Construct a table of values and sketch the graph of y = x^2 - 2 for -2 ≤ x ≤ 2.\n\nSolution: Substitute each value of x into y = x^2 - 2.\nx = -2: y = (-2)^2 - 2 = 4 - 2 = 2\nx = -1: y = (-1)^2 - 2 = 1 - 2 = -1\nx = 0: y = (0)^2 - 2 = 0 - 2 = -2\nx = 1: y = (1)^2 - 2 = 1 - 2 = -1\nx = 2: y = (2)^2 - 2 = 4 - 2 = 2\n\nAnswer: Table of values (x, y): (-2, 2), (-1, -1), (0, -2), (1, -1), (2, 2). When these points are plotted and joined with a smooth curve, the resulting graph is a PARABOLA opening upward with a minimum point at (0, -2).",
          table: {
            headers: ["x", "-2", "-1", "0", "1", "2"],
            rows: [["y = x^2 - 2", "2", "-1", "-2", "-1", "2"]],
          },
        },
        {
          title: "Shapes of Graphs of Functions",
          table: {
            headers: ["Type of Function", "Example Form", "Shape of Graph"],
            rows: [
              ["Linear Function", "y = mx + c", "Straight line"],
              ["Quadratic Function", "y = ax^2 + bx + c", "Smooth parabolic curve"],
            ],
          },
        },
        {
          title: "Formula",
          formula: "Linear function: y = mx + c\nQuadratic function: y = ax^2 + bx + c (a != 0)",
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "The graph of a linear function is a straight line — only 2 points are needed to draw it, but more points ensure accuracy.",
            "The graph of a quadratic (non-linear) function is a parabola — a smooth curve, not a sharp angle.",
            "When the coefficient of x^2 is positive (a > 0), the parabola opens upward; when negative (a < 0), it opens downward.",
            "The scale on the x-axis and y-axis must be uniform along each axis.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Joining the points of a quadratic graph with straight lines instead of a smooth curve.",
            "Plotting points in the wrong position due to misreading the axis scale.",
            "Using a non-uniform scale on the x-axis or y-axis.",
            "Calculating the wrong y-value in the table of values due to substitution errors with negative x-values.",
            "Failing to label the x-axis, y-axis, or the graph itself.",
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
            "A function maps every domain value (x) to exactly one range value (y).",
            "f(x) is the value of y when a value of x is substituted into the function f.",
            "A table of values must be constructed accurately before sketching any graph of a function.",
            "The graph of a linear function is a straight line; the graph of a quadratic function is a parabolic curve.",
          ],
          table: {
            headers: ["Concept", "Brief Explanation"],
            rows: [
              ["Domain", "Set of allowed x-values (inputs)"],
              ["Range", "Set of resulting y-values (outputs)"],
              ["f(x)", "Value of y for function f when x is substituted"],
            ],
          },
        },
        {
          title: "Important Formulas",
          formula: "Linear function: y = mx + c\nQuadratic function: y = ax^2 + bx + c (a != 0)",
        },
        {
          title: "Exam Tips",
          bulletPoints: [
            "Always double-check f(x) calculations by re-substituting the value of x.",
            "Draw the table of values neatly and check each y-value before plotting the graph.",
            "Remember: straight line for linear functions, smooth curve for non-linear functions.",
            "Use a pencil and ruler for linear graphs, and draw the curve with a steady hand for quadratic graphs.",
          ],
        },
      ],
    },
  ],
  keyExamFacts: [
    "A function maps every domain value to exactly ONE range value.",
    "f(x) represents the value of y for a function f when x is substituted.",
    "A table of values must be constructed before sketching a graph for accurate points.",
    "The graph of a linear function y = mx + c is a straight line.",
    "The graph of a quadratic function y = ax^2 + bx + c is a parabola (smooth curve).",
    "Points on a quadratic graph must be joined with a smooth curve, not straight lines.",
  ],
  keyTerms: [
    "Function",
    "Function notation",
    "Domain",
    "Range",
    "Table of values",
    "Graph of a linear function",
    "Graph of a quadratic function",
    "Parabola",
    "Axis scale",
  ],
};
