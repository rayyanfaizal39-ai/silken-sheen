import type { MindNode } from "@/components/MindMap";

export const mathF1C13MindMapDLP: MindNode = {
  id: "math-c13-dlp-root",
  label: "Pythagoras' Theorem",
  children: [
    {
      id: "math-c13-dlp-1",
      label: "Pythagoras' Theorem",
      children: [
        { id: "math-c13-dlp-1-1", label: "Applies to right-angled triangles only" },
        { id: "math-c13-dlp-1-2", label: "Formula: c² = a² + b²" },
        { id: "math-c13-dlp-1-3", label: "c = hypotenuse (longest side, opposite right angle)" },
        { id: "math-c13-dlp-1-4", label: "a, b = the other two sides (legs)" },
      ],
    },
    {
      id: "math-c13-dlp-2",
      label: "Finding Unknown Sides",
      children: [
        {
          id: "math-c13-dlp-2-1",
          label: "Find the Hypotenuse",
          children: [
            { id: "math-c13-dlp-2-1-1", label: "c = √(a² + b²)" },
            { id: "math-c13-dlp-2-1-2", label: "Example: a=3, b=4 → c=√(9+16)=√25=5" },
          ],
        },
        {
          id: "math-c13-dlp-2-2",
          label: "Find a Leg",
          children: [
            { id: "math-c13-dlp-2-2-1", label: "a = √(c² − b²)" },
            { id: "math-c13-dlp-2-2-2", label: "Example: c=13, b=12 → a=√(169−144)=√25=5" },
          ],
        },
      ],
    },
    {
      id: "math-c13-dlp-3",
      label: "Pythagorean Triples",
      children: [
        { id: "math-c13-dlp-3-1", label: "Integer sets where a² + b² = c²" },
        { id: "math-c13-dlp-3-2", label: "Common examples: 3-4-5, 5-12-13, 8-15-17" },
        { id: "math-c13-dlp-3-3", label: "Multiples also work: 6-8-10, 9-12-15" },
      ],
    },
    {
      id: "math-c13-dlp-4",
      label: "Determining Triangle Type",
      children: [
        { id: "math-c13-dlp-4-1", label: "If c² = a² + b²: right angle" },
        { id: "math-c13-dlp-4-2", label: "If c² < a² + b²: acute triangle" },
        { id: "math-c13-dlp-4-3", label: "If c² > a² + b²: obtuse triangle" },
      ],
    },
    {
      id: "math-c13-dlp-5",
      label: "Applications",
      children: [
        { id: "math-c13-dlp-5-1", label: "Distance between two points" },
        { id: "math-c13-dlp-5-2", label: "Real-world problems: ladders, poles, diagonals" },
        { id: "math-c13-dlp-5-3", label: "Diagonals in squares and rectangles" },
      ],
    },
    {
      id: "math-c13-dlp-6",
      label: "Exam Tips",
      children: [
        { id: "math-c13-dlp-6-1", label: "Identify hypotenuse first (opposite ∟)" },
        { id: "math-c13-dlp-6-2", label: "Add squares to find hypotenuse, subtract to find leg" },
        { id: "math-c13-dlp-6-3", label: "Memorise common triples: 3-4-5, 5-12-13" },
      ],
    },
  ],
};
