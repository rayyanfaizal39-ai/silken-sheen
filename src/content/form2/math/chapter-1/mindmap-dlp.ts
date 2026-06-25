import type { MindNode } from "@/components/MindMap";

export const mathF2C1MindMapDLP: MindNode = {
  id: "c1",
  label: "Patterns and Sequences",
  children: [
    {
      id: "c1-1",
      label: "1.1 Patterns",
      children: [
        {
          id: "c1-1-1",
          label: "Definition",
          children: [
            { id: "c1-1-1-1", label: "An arrangement of numbers/objects/shapes repeating by a fixed rule" },
          ],
        },
        {
          id: "c1-1-2",
          label: "Types of Patterns",
          children: [
            { id: "c1-1-2-1", label: "Addition: 2, 4, 6, 8, ..." },
            { id: "c1-1-2-2", label: "Subtraction: 20, 17, 14, 11, ..." },
            { id: "c1-1-2-3", label: "Multiplication: 2, 4, 8, 16, ..." },
            { id: "c1-1-2-4", label: "Triangular numbers: 1, 3, 6, 10, ..." },
            { id: "c1-1-2-5", label: "Square numbers: 1, 4, 9, 16, ..." },
          ],
        },
        {
          id: "c1-1-3",
          label: "Examples",
          children: [
            { id: "c1-1-3-1", label: "Example 1: 1,3,5,7,... → +2 each time (odd numbers)" },
            { id: "c1-1-3-2", label: "Example 2: 1,3,6,10,... → difference increases by 1 (triangular numbers)" },
          ],
        },
        {
          id: "c1-1-4",
          label: "Important Notes",
          children: [
            { id: "c1-1-4-1", label: "Compare at least 3 pairs of numbers before concluding" },
            { id: "c1-1-4-2", label: "Can be stated in words or algebra" },
          ],
        },
        {
          id: "c1-1-5",
          label: "Common Mistakes",
          children: [
            { id: "c1-1-5-1", label: "Concluding with only 2 numbers" },
            { id: "c1-1-5-2", label: "Confusing addition with multiplication" },
          ],
        },
      ],
    },
    {
      id: "c1-2",
      label: "1.2 Sequences",
      children: [
        {
          id: "c1-2-1",
          label: "Definition",
          children: [
            { id: "c1-2-1-1", label: "A set of numbers (terms) arranged by a rule; T1, T2, ..., Tn" },
          ],
        },
        {
          id: "c1-2-2",
          label: "Increasing / Decreasing",
          children: [
            { id: "c1-2-2-1", label: "Increasing: each term > previous term (e.g. 3,6,9,12)" },
            { id: "c1-2-2-2", label: "Decreasing: each term < previous term (e.g. 50,45,40,35)" },
          ],
        },
        {
          id: "c1-2-3",
          label: "Formula",
          children: [
            { id: "c1-2-3-1", label: "Arithmetic: Tn = a + (n-1)d" },
            { id: "c1-2-3-2", label: "Geometric: Tn = a x r^(n-1)" },
            { id: "c1-2-3-3", label: "d = Tn - T(n-1); r = Tn / T(n-1)" },
          ],
        },
        {
          id: "c1-2-4",
          label: "Examples",
          children: [
            { id: "c1-2-4-1", label: "Example 1: 7,11,15,19,... d=4, T6=27" },
            { id: "c1-2-4-2", label: "Example 2: 81,27,9,3,... r=1/3, next term=1" },
            { id: "c1-2-4-3", label: "Example 3: a=5, d=3 → T10 = 32" },
          ],
        },
        {
          id: "c1-2-5",
          label: "Important Notes",
          children: [
            { id: "c1-2-5-1", label: "d positive → increasing; d negative → decreasing" },
            { id: "c1-2-5-2", label: "r > 1 → increasing; 0 < r < 1 → decreasing" },
          ],
        },
        {
          id: "c1-2-6",
          label: "Common Mistakes",
          children: [
            { id: "c1-2-6-1", label: "Missing brackets (n-1) in the formula" },
            { id: "c1-2-6-2", label: "Confusing d with r" },
          ],
        },
      ],
    },
    {
      id: "c1-3",
      label: "1.3 Patterns & Sequences as Functions",
      children: [
        {
          id: "c1-3-1",
          label: "Definition",
          children: [
            { id: "c1-3-1-1", label: "n (position) = input; Tn (term value) = output" },
            { id: "c1-3-1-2", label: "Represented via table, formula, graph" },
          ],
        },
        {
          id: "c1-3-2",
          label: "Formula",
          children: [
            { id: "c1-3-2-1", label: "Linear function (arithmetic): Tn = dn + (a-d)" },
            { id: "c1-3-2-2", label: "Non-linear function: involves n^2, n^3" },
          ],
        },
        {
          id: "c1-3-3",
          label: "Examples",
          children: [
            { id: "c1-3-3-1", label: "Example 1: 2,5,8,11,... → Tn = 3n - 1" },
            { id: "c1-3-3-2", label: "Example 2: Tn = 2n^2 → 2, 8, 18 (non-linear)" },
          ],
        },
        {
          id: "c1-3-4",
          label: "Graph",
          children: [
            { id: "c1-3-4-1", label: "x-axis = n; y-axis = Tn" },
            { id: "c1-3-4-2", label: "Straight line = arithmetic (linear)" },
            { id: "c1-3-4-3", label: "Curve = non-linear (geometric/square-based)" },
          ],
        },
        {
          id: "c1-3-5",
          label: "Common Mistakes",
          children: [
            { id: "c1-3-5-1", label: "Forgetting to simplify the general formula" },
            { id: "c1-3-5-2", label: "Substituting the wrong value of n (n=0 instead of n=1)" },
          ],
        },
      ],
    },
    {
      id: "c1-4",
      label: "Summary",
      children: [
        { id: "c1-4-1", label: "Tn = a + (n-1)d (arithmetic)" },
        { id: "c1-4-2", label: "Tn = a x r^(n-1) (geometric)" },
        { id: "c1-4-3", label: "Always verify the formula by substituting n back" },
        { id: "c1-4-4", label: "Straight line = linear; curve = non-linear" },
      ],
    },
  ],
};
