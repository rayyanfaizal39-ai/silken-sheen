import type { MindNode } from "@/components/MindMap";

export const mathF3C2MindMapDLP: MindNode = {
  id: "f3c2-en",
  label: "Standard Form",
  children: [
    {
      id: "f3c2-en-1",
      label: "2.1 Significant Figures",
      children: [
        {
          id: "f3c2-en-1-1",
          label: "Understanding Significant Figures",
          children: [
            { id: "f3c2-en-1-1-1", label: "All non-zero digits are significant" },
            { id: "f3c2-en-1-1-2", label: "Zero between non-zero digits is significant" },
            { id: "f3c2-en-1-1-3", label: "Leading zero in a decimal is not significant" },
            { id: "f3c2-en-1-1-4", label: "Trailing zero in a whole number is not significant unless stated" },
          ],
        },
        {
          id: "f3c2-en-1-2",
          label: "Rounding to Significant Figures",
          children: [
            { id: "f3c2-en-1-2-1", label: "63 479 -> 63 000 (2 s.f.)" },
            { id: "f3c2-en-1-2-2", label: "2 476 -> 2 500 (2 s.f.)" },
            { id: "f3c2-en-1-2-3", label: "0.008025 -> 0.00803 (3 s.f.)" },
          ],
        },
      ],
    },
    {
      id: "f3c2-en-2",
      label: "2.2 Standard Form",
      children: [
        {
          id: "f3c2-en-2-1",
          label: "Writing in Standard Form",
          children: [
            { id: "f3c2-en-2-1-1", label: "A x 10^n, with 1 ≤ A < 10, n an integer" },
            { id: "f3c2-en-2-1-2", label: "280 = 2.8 x 10^2" },
            { id: "f3c2-en-2-1-3", label: "0.03025 = 3.025 x 10^-2" },
            { id: "f3c2-en-2-1-4", label: "n positive if number ≥10; n negative if number <1" },
          ],
        },
        {
          id: "f3c2-en-2-2",
          label: "Basic Operations",
          children: [
            { id: "f3c2-en-2-2-1", label: "Add/subtract: equalise powers of 10 first" },
            { id: "f3c2-en-2-2-2", label: "Multiply: (SxT) x10^(m+n)" },
            { id: "f3c2-en-2-2-3", label: "Divide: (S÷T) x10^(m-n)" },
          ],
        },
        {
          id: "f3c2-en-2-3",
          label: "Solving Problems",
          children: [
            { id: "f3c2-en-2-3-1", label: "Planet distances, material thickness, data capacity" },
            { id: "f3c2-en-2-3-2", label: "PQR Pythagoras: PQ=2.8x10^2 m" },
            { id: "f3c2-en-2-3-3", label: "3050 terabytes = 3.05x10^15 bytes" },
          ],
        },
      ],
    },
    {
      id: "f3c2-en-3",
      label: "Chapter Summary",
      children: [
        { id: "f3c2-en-3-1", label: "Significant figures show measurement accuracy" },
        { id: "f3c2-en-3-2", label: "Standard form simplifies large/small numbers" },
        { id: "f3c2-en-3-3", label: "Operations use index laws on powers of 10" },
      ],
    },
  ],
};
