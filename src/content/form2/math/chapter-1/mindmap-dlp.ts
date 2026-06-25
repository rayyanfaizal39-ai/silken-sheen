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
          label: "Recognising Number Patterns",
          children: [
            { id: "c1-1-1-1", label: "Pattern: list of numbers or objects arranged by a rule/design" },
            { id: "c1-1-1-2", label: "Add: -10, -4, 2, 8, ... -> +6" },
            { id: "c1-1-1-3", label: "Subtract: 17, 7, -3, -13, ... -> -10" },
            { id: "c1-1-1-4", label: "Multiply: 2, 6, 18, 54, ... -> x3" },
            { id: "c1-1-1-5", label: "Divide: 81, 27, 9, 3, ... -> divide 3" },
            { id: "c1-1-1-6", label: "Even numbers: divisible by 2 exactly" },
            { id: "c1-1-1-7", label: "Odd numbers: not divisible by 2 exactly" },
          ],
        },
        {
          id: "c1-1-2",
          label: "Pascal's Triangle",
          children: [
            { id: "c1-1-2-1", label: "Starts with 1" },
            { id: "c1-1-2-2", label: "Each row starts and ends with 1" },
            { id: "c1-1-2-3", label: "Middle number = sum of two numbers above" },
            { id: "c1-1-2-4", label: "Example row: 1, 4, 6, 4, 1" },
          ],
        },
        {
          id: "c1-1-3",
          label: "Fibonacci Numbers",
          children: [
            { id: "c1-1-3-1", label: "Sequence: 0, 1, 1, 2, 3, 5, 8, ..." },
            { id: "c1-1-3-2", label: "Next term = previous two terms added" },
            { id: "c1-1-3-3", label: "Example: 3 + 5 = 8" },
          ],
        },
        {
          id: "c1-1-4",
          label: "Exam Focus",
          children: [
            { id: "c1-1-4-1", label: "Compare consecutive terms before deciding the rule" },
            { id: "c1-1-4-2", label: "For objects, observe the arrangement" },
            { id: "c1-1-4-3", label: "For Fibonacci, use two previous terms" },
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
          label: "Sequences",
          children: [
            { id: "c1-2-1-1", label: "Set of numbers or objects arranged according to a pattern" },
            { id: "c1-2-1-2", label: "A list is a sequence only if a rule continues" },
            { id: "c1-2-1-3", label: "Example: -10, -6, -2, 2, 6, ... -> +4" },
          ],
        },
        {
          id: "c1-2-2",
          label: "Patterns of a Sequence",
          children: [
            { id: "c1-2-2-1", label: "Complete missing terms by applying the same rule" },
            { id: "c1-2-2-2", label: "7, 13, 19, 25, 31, ... -> +6" },
            { id: "c1-2-2-3", label: "88, 76, 64, 52, 40, ... -> -12" },
            { id: "c1-2-2-4", label: "1, 0.3, 0.09, 0.027, ... -> x0.3" },
          ],
        },
        {
          id: "c1-2-3",
          label: "Number Sequences",
          children: [
            { id: "c1-2-3-1", label: "May involve whole numbers, negatives, decimals or fractions" },
            { id: "c1-2-3-2", label: "Given rule: add 7 -> 42, 49, 56, 63, ..." },
            { id: "c1-2-3-3", label: "Given rule: divide by 2 -> 96, 48, 24, 12, ..." },
            { id: "c1-2-3-4", label: "Triangular numbers: 1, 3, 6, 10, 15, ..." },
          ],
        },
      ],
    },
    {
      id: "c1-3",
      label: "1.3 Patterns and Sequences",
      children: [
        {
          id: "c1-3-1",
          label: "Numbers, Words and Algebraic Expressions",
          children: [
            { id: "c1-3-1-1", label: "Numbers: show operation, e.g. +8" },
            { id: "c1-3-1-2", label: "Words: add 8 to the previous number" },
            { id: "c1-3-1-3", label: "Algebra: 1 + 8n, where n = 0, 1, 2, ..." },
            { id: "c1-3-1-4", label: "Test algebra by substituting n" },
          ],
        },
        {
          id: "c1-3-2",
          label: "Terms of a Sequence",
          children: [
            { id: "c1-3-2-1", label: "Tn = n-th term" },
            { id: "c1-3-2-2", label: "T1 first term, T2 second term, T3 third term" },
            { id: "c1-3-2-3", label: "2, 10, 18, 26, 34 -> T5 = 34" },
            { id: "c1-3-2-4", label: "65, 60, 55, 50, 45, 40 -> 40 is T6" },
          ],
        },
        {
          id: "c1-3-3",
          label: "Solving Problems",
          children: [
            { id: "c1-3-3-1", label: "Understand the problem" },
            { id: "c1-3-3-2", label: "Plan the strategy" },
            { id: "c1-3-3-3", label: "Implement the strategy" },
            { id: "c1-3-3-4", label: "Write the conclusion with correct units" },
            { id: "c1-3-3-5", label: "Fish feeder: 24/4 = 6 hours; T3 = 7:35 p.m." },
          ],
        },
      ],
    },
    {
      id: "c1-4",
      label: "Chapter Summary",
      children: [
        { id: "c1-4-1", label: "Pattern: numbers/objects arranged by rule/design" },
        { id: "c1-4-2", label: "Sequence: numbers/objects following a pattern" },
        { id: "c1-4-3", label: "Pascal: add two numbers above" },
        { id: "c1-4-4", label: "Fibonacci: add previous two terms" },
        { id: "c1-4-5", label: "Tn marks the position of a term" },
      ],
    },
  ],
};
