import type { MindNode } from "@/components/MindMap";

export const mathF2C8MindMapDLP: MindNode = {
  id: "math-c8-dlp-root",
  label: "Graphs of Functions",
  children: [
    {
      id: "math-c8-dlp-1",
      label: "8.1 Functions",
      children: [
        {
          id: "math-c8-dlp-1-1",
          label: "Definition of a Function",
          children: [
            { id: "math-c8-dlp-1-1-1", label: "Every domain value → ONE range value" },
            { id: "math-c8-dlp-1-1-2", label: "Representations: mapping, table, ordered pairs, equation" },
          ],
        },
        {
          id: "math-c8-dlp-1-2",
          label: "Function Notation f(x)",
          children: [
            { id: "math-c8-dlp-1-2-1", label: "f(x) = value of y for the substituted x" },
            { id: "math-c8-dlp-1-2-2", label: "Example: f(x) = 2x + 1, f(3) = 7" },
          ],
        },
        {
          id: "math-c8-dlp-1-3",
          label: "Domain and Range",
          children: [
            { id: "math-c8-dlp-1-3-1", label: "Domain: set of x-values (inputs)" },
            { id: "math-c8-dlp-1-3-2", label: "Range: set of y-values (outputs)" },
          ],
        },
        {
          id: "math-c8-dlp-1-4",
          label: "Common Mistakes",
          children: [
            { id: "math-c8-dlp-1-4-1", label: "Substitution errors with negative x" },
            { id: "math-c8-dlp-1-4-2", label: "Wrong order of operations" },
            { id: "math-c8-dlp-1-4-3", label: "Confusing f(x) with f × x" },
          ],
        },
      ],
    },
    {
      id: "math-c8-dlp-2",
      label: "8.2 Graphs of Functions",
      children: [
        {
          id: "math-c8-dlp-2-1",
          label: "Steps to Sketch a Graph",
          children: [
            { id: "math-c8-dlp-2-1-1", label: "1. Construct a table of values" },
            { id: "math-c8-dlp-2-1-2", label: "2. Choose a suitable axis scale" },
            { id: "math-c8-dlp-2-1-3", label: "3. Plot the points (x, y)" },
            { id: "math-c8-dlp-2-1-4", label: "4. Join points (straight line / smooth curve)" },
            { id: "math-c8-dlp-2-1-5", label: "5. Label the graph and axes" },
          ],
        },
        {
          id: "math-c8-dlp-2-2",
          label: "Graph of a Linear Function",
          children: [
            { id: "math-c8-dlp-2-2-1", label: "Form: y = mx + c" },
            { id: "math-c8-dlp-2-2-2", label: "Graph shape: straight line" },
            { id: "math-c8-dlp-2-2-3", label: "Example: y = 2x + 1 → (-2,-3), (-1,-1), (0,1), (1,3), (2,5)" },
          ],
        },
        {
          id: "math-c8-dlp-2-3",
          label: "Graph of a Quadratic Function",
          children: [
            { id: "math-c8-dlp-2-3-1", label: "Form: y = ax^2 + bx + c (a != 0)" },
            { id: "math-c8-dlp-2-3-2", label: "Graph shape: parabola (smooth curve)" },
            { id: "math-c8-dlp-2-3-3", label: "a > 0 → opens upward; a < 0 → opens downward" },
            { id: "math-c8-dlp-2-3-4", label: "Example: y = x^2 - 2 → (-2,2), (-1,-1), (0,-2), (1,-1), (2,2)" },
          ],
        },
        {
          id: "math-c8-dlp-2-4",
          label: "Common Mistakes",
          children: [
            { id: "math-c8-dlp-2-4-1", label: "Joining a quadratic graph with straight lines (incorrect)" },
            { id: "math-c8-dlp-2-4-2", label: "Non-uniform axis scale" },
            { id: "math-c8-dlp-2-4-3", label: "Plotting points incorrectly due to misreading scale" },
            { id: "math-c8-dlp-2-4-4", label: "Forgetting to label axes/graph" },
          ],
        },
      ],
    },
    {
      id: "math-c8-dlp-3",
      label: "Summary",
      children: [
        { id: "math-c8-dlp-3-1", label: "Function: one domain value → one range value" },
        { id: "math-c8-dlp-3-2", label: "Linear → straight line" },
        { id: "math-c8-dlp-3-3", label: "Quadratic → smooth parabola" },
        { id: "math-c8-dlp-3-4", label: "Table of values must be accurate before sketching" },
      ],
    },
  ],
};
