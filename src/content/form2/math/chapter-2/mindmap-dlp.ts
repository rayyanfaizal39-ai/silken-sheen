import type { MindNode } from "@/components/MindMap";

export const mathF2C2MindMapDLP: MindNode = {
  id: "root",
  label: "Factorisation and Algebraic Fractions",
  children: [
    {
      id: "c1",
      label: "2.1 Expansion",
      children: [
        {
          id: "c1-1",
          label: "Single Bracket",
          children: [{ id: "c1-1-1", label: "a(b + c) = ab + ac" }],
        },
        {
          id: "c1-2",
          label: "Double Brackets",
          children: [
            { id: "c1-2-1", label: "(a + b)(c + d) = ac + ad + bc + bd" },
            { id: "c1-2-2", label: "Example: (x + 3)(x - 4) = x^2 - x - 12" },
          ],
        },
        {
          id: "c1-3",
          label: "Perfect Square",
          children: [{ id: "c1-3-1", label: "(2x - 1)^2 = 4x^2 - 4x + 1" }],
        },
        {
          id: "c1-4",
          label: "Common Mistakes",
          children: [
            { id: "c1-4-1", label: "Forgetting to multiply the negative sign" },
            { id: "c1-4-2", label: "Not multiplying all terms" },
          ],
        },
      ],
    },
    {
      id: "c2",
      label: "2.2 Factorisation",
      children: [
        {
          id: "c2-1",
          label: "Highest Common Factor (HCF)",
          children: [
            { id: "c2-1-1", label: "ab + ac = a(b + c)" },
            { id: "c2-1-2", label: "Example: 6x^2 + 9x = 3x(2x + 3)" },
          ],
        },
        {
          id: "c2-2",
          label: "Difference of Two Squares",
          children: [
            { id: "c2-2-1", label: "a^2 - b^2 = (a + b)(a - b)" },
            { id: "c2-2-2", label: "Example: 4x^2 - 25 = (2x + 5)(2x - 5)" },
            { id: "c2-2-3", label: "Only for subtraction, not addition" },
          ],
        },
        {
          id: "c2-3",
          label: "Quadratic Expressions (Cross Method)",
          children: [
            { id: "c2-3-1", label: "ax^2 + bx + c, find pr=a, qs=c, ps+qr=b" },
            { id: "c2-3-2", label: "Example a=1: x^2 + 5x + 6 = (x + 2)(x + 3)" },
            { id: "c2-3-3", label: "Example a≠1: 2x^2 + 7x + 3 = (2x + 1)(x + 3)" },
          ],
        },
        {
          id: "c2-4",
          label: "Combination of Methods",
          children: [{ id: "c2-4-1", label: "Example: 2x^2 - 18 = 2(x + 3)(x - 3)" }],
        },
        {
          id: "c2-5",
          label: "Common Mistakes",
          children: [
            { id: "c2-5-1", label: "Trying to factorise a^2 + b^2 with difference of two squares" },
            { id: "c2-5-2", label: "Forgetting to take out the HCF first" },
          ],
        },
      ],
    },
    {
      id: "c3",
      label: "2.3 Algebraic Fractions: Multiplication & Division",
      children: [
        {
          id: "c3-1",
          label: "Multiplication",
          children: [
            { id: "c3-1-1", label: "a/b x c/d = (a x c)/(b x d)" },
            { id: "c3-1-2", label: "Factorise first before cancelling" },
          ],
        },
        {
          id: "c3-2",
          label: "Division",
          children: [
            { id: "c3-2-1", label: "a/b ÷ c/d = a/b x d/c" },
            { id: "c3-2-2", label: "Convert division into multiplication by reciprocal" },
          ],
        },
        {
          id: "c3-3",
          label: "Common Mistakes",
          children: [{ id: "c3-3-1", label: "Cancelling terms without factorising" }],
        },
      ],
    },
    {
      id: "c4",
      label: "2.4 Algebraic Fractions: Addition & Subtraction",
      children: [
        {
          id: "c4-1",
          label: "Same Denominator",
          children: [{ id: "c4-1-1", label: "a/c + b/c = (a + b)/c" }],
        },
        {
          id: "c4-2",
          label: "Different Denominators",
          children: [
            { id: "c4-2-1", label: "Find the LCM of the denominators first" },
            { id: "c4-2-2", label: "Example: x/3 + x/4 = 7x/12" },
            { id: "c4-2-3", label: "Algebraic example: 2/x - 3/(x+1) = (2-x)/(x(x+1))" },
          ],
        },
        {
          id: "c4-3",
          label: "Common Mistakes",
          children: [
            { id: "c4-3-1", label: "Adding/subtracting denominators directly" },
            { id: "c4-3-2", label: "Sign errors when subtracting" },
          ],
        },
      ],
    },
    {
      id: "c5",
      label: "Summary",
      children: [
        { id: "c5-1", label: "Expansion vs Factorisation (reverse processes)" },
        { id: "c5-2", label: "Always look for the HCF first" },
        { id: "c5-3", label: "Factorise before algebraic fraction operations" },
        { id: "c5-4", label: "Make denominators the same using LCM for addition/subtraction" },
      ],
    },
  ],
};
