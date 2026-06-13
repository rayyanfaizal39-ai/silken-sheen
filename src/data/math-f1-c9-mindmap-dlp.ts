import type { MindNode } from "@/components/MindMap";

export const mathF1C9MindMapDLP: MindNode = {
  id: "math-c9-dlp-root",
  label: "Basic Polygons",
  children: [
    {
      id: "math-c9-dlp-1",
      label: "Introduction to Polygons",
      children: [
        { id: "math-c9-dlp-1-1", label: "Polygon: flat shape with straight sides" },
        { id: "math-c9-dlp-1-2", label: "Regular polygon: all sides and angles equal" },
        { id: "math-c9-dlp-1-3", label: "Irregular polygon: sides/angles not uniform" },
      ],
    },
    {
      id: "math-c9-dlp-2",
      label: "Types of Polygons",
      children: [
        { id: "math-c9-dlp-2-1", label: "Triangle (3 sides)" },
        { id: "math-c9-dlp-2-2", label: "Quadrilateral (4 sides)" },
        { id: "math-c9-dlp-2-3", label: "Pentagon (5 sides)" },
        { id: "math-c9-dlp-2-4", label: "Hexagon (6 sides)" },
        { id: "math-c9-dlp-2-5", label: "Heptagon (7 sides)" },
        { id: "math-c9-dlp-2-6", label: "Octagon (8 sides)" },
      ],
    },
    {
      id: "math-c9-dlp-3",
      label: "Angles of Polygons",
      children: [
        {
          id: "math-c9-dlp-3-1",
          label: "Sum of Interior Angles",
          children: [
            { id: "math-c9-dlp-3-1-1", label: "Formula: (n − 2) × 180°" },
            { id: "math-c9-dlp-3-1-2", label: "Triangle: (3−2)×180° = 180°" },
            { id: "math-c9-dlp-3-1-3", label: "Quadrilateral: (4−2)×180° = 360°" },
          ],
        },
        {
          id: "math-c9-dlp-3-2",
          label: "Exterior Angles",
          children: [
            { id: "math-c9-dlp-3-2-1", label: "Sum of exterior angles of any polygon = 360°" },
            { id: "math-c9-dlp-3-2-2", label: "Each exterior angle of regular polygon = 360°/n" },
          ],
        },
      ],
    },
    {
      id: "math-c9-dlp-4",
      label: "Axes of Symmetry",
      children: [
        { id: "math-c9-dlp-4-1", label: "Axis of symmetry: fold produces two equal halves" },
        { id: "math-c9-dlp-4-2", label: "Regular polygon with n sides has n axes of symmetry" },
        { id: "math-c9-dlp-4-3", label: "Equilateral triangle: 3 axes of symmetry" },
      ],
    },
    {
      id: "math-c9-dlp-5",
      label: "Exam Tips",
      children: [
        { id: "math-c9-dlp-5-1", label: "Memorise formula: sum of interior angles = (n−2)×180°" },
        { id: "math-c9-dlp-5-2", label: "Sum of exterior angles is always 360°" },
        { id: "math-c9-dlp-5-3", label: "Count number of sides first" },
      ],
    },
  ],
};
