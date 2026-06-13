import type { MindNode } from "@/components/MindMap";

export const mathF1C4MindMapDLP: MindNode = {
  id: "math-c4-dlp-root",
  label: "Ratio, Rate and Proportion",
  children: [
    {
      id: "math-c4-dlp-1",
      label: "Ratio",
      children: [
        { id: "math-c4-dlp-1-1", label: "Comparison of two quantities in the same unit" },
        { id: "math-c4-dlp-1-2", label: "Written as: a : b or a/b" },
        { id: "math-c4-dlp-1-3", label: "Equivalent ratios: multiply/divide by the same number" },
        { id: "math-c4-dlp-1-4", label: "Simplest form: GCF = 1" },
        {
          id: "math-c4-dlp-1-5",
          label: "Three-Quantity Ratio",
          children: [
            { id: "math-c4-dlp-1-5-1", label: "a : b : c" },
            { id: "math-c4-dlp-1-5-2", label: "Find each part using total ratio" },
          ],
        },
      ],
    },
    {
      id: "math-c4-dlp-2",
      label: "Rate",
      children: [
        { id: "math-c4-dlp-2-1", label: "Comparison of two quantities with different units" },
        { id: "math-c4-dlp-2-2", label: "Examples: km/h, RM/kg, m/s" },
        { id: "math-c4-dlp-2-3", label: "Unit rate: rate per 1 unit" },
        { id: "math-c4-dlp-2-4", label: "Formula: Rate = Quantity 1 ÷ Quantity 2" },
      ],
    },
    {
      id: "math-c4-dlp-3",
      label: "Proportion",
      children: [
        {
          id: "math-c4-dlp-3-1",
          label: "Direct Proportion",
          children: [
            { id: "math-c4-dlp-3-1-1", label: "y increases as x increases" },
            { id: "math-c4-dlp-3-1-2", label: "y/x = constant (k)" },
            { id: "math-c4-dlp-3-1-3", label: "Graph: straight line through origin" },
          ],
        },
        {
          id: "math-c4-dlp-3-2",
          label: "Inverse Proportion",
          children: [
            { id: "math-c4-dlp-3-2-1", label: "y decreases as x increases" },
            { id: "math-c4-dlp-3-2-2", label: "xy = constant (k)" },
            { id: "math-c4-dlp-3-2-3", label: "Graph: hyperbola curve" },
          ],
        },
      ],
    },
    {
      id: "math-c4-dlp-4",
      label: "Exam Tips",
      children: [
        { id: "math-c4-dlp-4-1", label: "Check units in rate questions" },
        { id: "math-c4-dlp-4-2", label: "Use cross-multiplication method" },
        { id: "math-c4-dlp-4-3", label: "Distinguish direct vs inverse proportion" },
      ],
    },
  ],
};
