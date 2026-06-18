import type { MindNode } from "@/components/MindMap";

export const mathF1C1MindMapDLP: MindNode = {
  id: "math-c1-dlp-root",
  label: "Rational Numbers",
  children: [
    {
      id: "math-c1-dlp-1",
      label: "Integers",
      children: [
        {
          id: "math-c1-dlp-1-1",
          label: "Types of Integers",
          children: [
            { id: "math-c1-dlp-1-1-1", label: "Positive integers: 1, 2, 3, ..." },
            { id: "math-c1-dlp-1-1-2", label: "Zero: 0" },
            { id: "math-c1-dlp-1-1-3", label: "Negative integers: -1, -2, -3, ..." },
          ],
        },
        {
          id: "math-c1-dlp-1-2",
          label: "Number Line",
          children: [
            { id: "math-c1-dlp-1-2-1", label: "Right of zero → greater value" },
            { id: "math-c1-dlp-1-2-2", label: "Left of zero → smaller value" },
          ],
        },
        {
          id: "math-c1-dlp-1-3",
          label: "Operations on Integers",
          children: [
            { id: "math-c1-dlp-1-3-1", label: "Add: (+)+(+) = positive" },
            { id: "math-c1-dlp-1-3-2", label: "Subtract: (+)+(−) = difference of absolute values" },
            { id: "math-c1-dlp-1-3-3", label: "Multiply/Divide: same signs = positive, different signs = negative" },
          ],
        },
      ],
    },
    {
      id: "math-c1-dlp-2",
      label: "Positive and Negative Fractions",
      children: [
        { id: "math-c1-dlp-2-1", label: "Positive fraction > 0 (e.g. 3/4)" },
        { id: "math-c1-dlp-2-2", label: "Negative fraction < 0 (e.g. -2/5)" },
        {
          id: "math-c1-dlp-2-3",
          label: "Operations on Fractions",
          children: [
            { id: "math-c1-dlp-2-3-1", label: "Add/Subtract: make denominators equal" },
            { id: "math-c1-dlp-2-3-2", label: "Multiply: numerator × numerator, denominator × denominator" },
            { id: "math-c1-dlp-2-3-3", label: "Divide: multiply by the reciprocal" },
          ],
        },
      ],
    },
    {
      id: "math-c1-dlp-3",
      label: "Positive and Negative Decimals",
      children: [
        { id: "math-c1-dlp-3-1", label: "Positive decimals: 0.5, 1.25, ..." },
        { id: "math-c1-dlp-3-2", label: "Negative decimals: -0.3, -2.7, ..." },
        { id: "math-c1-dlp-3-3", label: "Operations same as integers" },
      ],
    },
    {
      id: "math-c1-dlp-4",
      label: "Rational Numbers",
      children: [
        { id: "math-c1-dlp-4-1", label: "Form a/b, where a & b are integers, b ≠ 0" },
        { id: "math-c1-dlp-4-2", label: "All integers are rational numbers" },
        { id: "math-c1-dlp-4-3", label: "All terminating decimals are rational" },
        { id: "math-c1-dlp-4-4", label: "Example: 0.75 = 3/4 → rational number" },
      ],
    },
    {
      id: "math-c1-dlp-5",
      label: "Exam Tips",
      children: [
        { id: "math-c1-dlp-5-1", label: "Check signs (+/−) at every step" },
        { id: "math-c1-dlp-5-2", label: "Number line helps with comparison" },
        { id: "math-c1-dlp-5-3", label: "Convert decimals to fractions for precision" },
      ],
    },
  ],
};
