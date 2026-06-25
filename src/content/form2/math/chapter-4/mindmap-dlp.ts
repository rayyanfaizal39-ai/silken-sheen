import type { MindNode } from "@/components/MindMap";

export const mathF2C4MindMapDLP: MindNode = {
  id: "math-c4-dlp-root",
  label: "Polygons",
  children: [
    {
      id: "math-c4-dlp-1",
      label: "4.1 Regular Polygons",
      children: [
        {
          id: "math-c4-dlp-1-1",
          label: "Definition",
          children: [
            { id: "math-c4-dlp-1-1-1", label: "All sides equal in length" },
            { id: "math-c4-dlp-1-1-2", label: "All angles equal in size" },
            { id: "math-c4-dlp-1-1-3", label: "Both conditions must be satisfied at once" },
          ],
        },
        {
          id: "math-c4-dlp-1-2",
          label: "Irregular Polygons",
          children: [
            { id: "math-c4-dlp-1-2-1", label: "Sides or angles not equal" },
            { id: "math-c4-dlp-1-2-2", label: "Example: rectangle, rhombus" },
          ],
        },
        {
          id: "math-c4-dlp-1-3",
          label: "Names of Polygons",
          children: [
            { id: "math-c4-dlp-1-3-1", label: "3 sides: Triangle" },
            { id: "math-c4-dlp-1-3-2", label: "4 sides: Quadrilateral" },
            { id: "math-c4-dlp-1-3-3", label: "5 sides: Pentagon" },
            { id: "math-c4-dlp-1-3-4", label: "6 sides: Hexagon" },
            { id: "math-c4-dlp-1-3-5", label: "7 sides: Heptagon" },
            { id: "math-c4-dlp-1-3-6", label: "8 sides: Octagon" },
            { id: "math-c4-dlp-1-3-7", label: "9 sides: Nonagon" },
            { id: "math-c4-dlp-1-3-8", label: "10 sides: Decagon" },
          ],
        },
      ],
    },
    {
      id: "math-c4-dlp-2",
      label: "4.2 Interior and Exterior Angles",
      children: [
        {
          id: "math-c4-dlp-2-1",
          label: "Interior Angle",
          children: [
            { id: "math-c4-dlp-2-1-1", label: "Sum = (n - 2) x 180°" },
            { id: "math-c4-dlp-2-1-2", label: "Each angle of a regular polygon = [(n - 2) x 180°] ÷ n" },
          ],
        },
        {
          id: "math-c4-dlp-2-2",
          label: "Exterior Angle",
          children: [
            { id: "math-c4-dlp-2-2-1", label: "Sum of exterior angles of convex polygon = 360°" },
            { id: "math-c4-dlp-2-2-2", label: "Each angle of a regular polygon = 360° ÷ n" },
          ],
        },
        {
          id: "math-c4-dlp-2-3",
          label: "Relationship",
          children: [
            { id: "math-c4-dlp-2-3-1", label: "Interior angle + adjacent exterior angle = 180°" },
            { id: "math-c4-dlp-2-3-2", label: "n = 360° ÷ exterior angle" },
          ],
        },
        {
          id: "math-c4-dlp-2-4",
          label: "Worked Examples",
          children: [
            { id: "math-c4-dlp-2-4-1", label: "Hexagon: sum of interior angles = 720°" },
            { id: "math-c4-dlp-2-4-2", label: "Regular nonagon: interior 140°, exterior 40°" },
            { id: "math-c4-dlp-2-4-3", label: "Exterior angle 24° → n = 15 sides" },
          ],
        },
      ],
    },
    {
      id: "math-c4-dlp-3",
      label: "Summary",
      children: [
        { id: "math-c4-dlp-3-1", label: "Formula: (n-2) x 180° for sum of interior angles" },
        { id: "math-c4-dlp-3-2", label: "Formula: 360° for sum of exterior angles" },
        { id: "math-c4-dlp-3-3", label: "Always check: interior angle + exterior angle = 180°" },
        { id: "math-c4-dlp-3-4", label: "Draw a diagram to avoid confusion" },
      ],
    },
  ],
};
