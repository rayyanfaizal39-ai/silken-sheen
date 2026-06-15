import type { MindNode } from "@/components/MindMap";

export const mathF1C10MindMapDLP: MindNode = {
  id: "math-c10-dlp-root",
  label: "Perimeter and Area",
  children: [
    {
      id: "math-c10-dlp-1",
      label: "Perimeter",
      children: [
        { id: "math-c10-dlp-1-1", label: "Total length of all sides of a shape" },
        {
          id: "math-c10-dlp-1-2",
          label: "Perimeter Formulas",
          children: [
            { id: "math-c10-dlp-1-2-1", label: "Square: P = 4s" },
            { id: "math-c10-dlp-1-2-2", label: "Rectangle: P = 2(l + w)" },
            { id: "math-c10-dlp-1-2-3", label: "Triangle: P = a + b + c" },
            { id: "math-c10-dlp-1-2-4", label: "Circle (Circumference): C = 2πr = πd" },
          ],
        },
      ],
    },
    {
      id: "math-c10-dlp-2",
      label: "Area",
      children: [
        { id: "math-c10-dlp-2-1", label: "Size of surface enclosed by a shape (unit²)" },
        {
          id: "math-c10-dlp-2-2",
          label: "Area Formulas",
          children: [
            { id: "math-c10-dlp-2-2-1", label: "Square: A = s²" },
            { id: "math-c10-dlp-2-2-2", label: "Rectangle: A = l × w" },
            { id: "math-c10-dlp-2-2-3", label: "Triangle: A = ½ × base × height" },
            { id: "math-c10-dlp-2-2-4", label: "Circle: A = πr²" },
            { id: "math-c10-dlp-2-2-5", label: "Trapezium: A = ½(a+b) × height" },
            { id: "math-c10-dlp-2-2-6", label: "Parallelogram: A = base × height" },
          ],
        },
      ],
    },
    {
      id: "math-c10-dlp-3",
      label: "Composite Shapes",
      children: [
        { id: "math-c10-dlp-3-1", label: "Break shape into basic shapes" },
        { id: "math-c10-dlp-3-2", label: "Add or subtract areas" },
        { id: "math-c10-dlp-3-3", label: "Examples: L-shaped, hollow shapes" },
      ],
    },
    {
      id: "math-c10-dlp-4",
      label: "Exam Tips",
      children: [
        { id: "math-c10-dlp-4-1", label: "Write unit² for area, unit for perimeter" },
        { id: "math-c10-dlp-4-2", label: "π ≈ 3.142 or 22/7 (as stated in question)" },
        { id: "math-c10-dlp-4-3", label: "Identify the perpendicular height carefully" },
      ],
    },
  ],
};
