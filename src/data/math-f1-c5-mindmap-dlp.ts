import type { MindNode } from "@/components/MindMap";

export const mathF1C5MindMapDLP: MindNode = {
  id: "math-c5-dlp-root",
  label: "Algebraic Expressions",
  children: [
    {
      id: "math-c5-dlp-1",
      label: "Variables and Constants",
      children: [
        { id: "math-c5-dlp-1-1", label: "Variable: symbol (x, y, a, b) representing changing values" },
        { id: "math-c5-dlp-1-2", label: "Constant: fixed value (3, -5, π)" },
        { id: "math-c5-dlp-1-3", label: "Coefficient: number in front of a variable" },
      ],
    },
    {
      id: "math-c5-dlp-2",
      label: "Algebraic Terms",
      children: [
        { id: "math-c5-dlp-2-1", label: "Monomial: one term (3x)" },
        { id: "math-c5-dlp-2-2", label: "Binomial: two terms (2x + 5)" },
        { id: "math-c5-dlp-2-3", label: "Trinomial: three terms (x² + 3x − 2)" },
        { id: "math-c5-dlp-2-4", label: "Like terms: same variable and power" },
      ],
    },
    {
      id: "math-c5-dlp-3",
      label: "Algebraic Operations",
      children: [
        {
          id: "math-c5-dlp-3-1",
          label: "Addition & Subtraction",
          children: [
            { id: "math-c5-dlp-3-1-1", label: "Only like terms can be combined" },
            { id: "math-c5-dlp-3-1-2", label: "Example: 3x + 5x = 8x" },
          ],
        },
        {
          id: "math-c5-dlp-3-2",
          label: "Multiplication",
          children: [
            { id: "math-c5-dlp-3-2-1", label: "Multiply constant by term" },
            { id: "math-c5-dlp-3-2-2", label: "Example: 2(3x + 4) = 6x + 8" },
          ],
        },
        {
          id: "math-c5-dlp-3-3",
          label: "Division",
          children: [
            { id: "math-c5-dlp-3-3-1", label: "Divide term by constant" },
            { id: "math-c5-dlp-3-3-2", label: "Example: 6x ÷ 3 = 2x" },
          ],
        },
      ],
    },
    {
      id: "math-c5-dlp-4",
      label: "Value of Algebraic Expressions",
      children: [
        { id: "math-c5-dlp-4-1", label: "Substitute the given value of the variable" },
        { id: "math-c5-dlp-4-2", label: "Example: if x = 3, then 2x + 1 = 7" },
      ],
    },
    {
      id: "math-c5-dlp-5",
      label: "Exam Tips",
      children: [
        { id: "math-c5-dlp-5-1", label: "Identify like terms before operating" },
        { id: "math-c5-dlp-5-2", label: "Be careful with signs when expanding brackets" },
        { id: "math-c5-dlp-5-3", label: "Substitute carefully — watch negative signs" },
      ],
    },
  ],
};
