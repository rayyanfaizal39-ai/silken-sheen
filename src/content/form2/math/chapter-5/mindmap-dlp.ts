import type { MindNode } from "@/components/MindMap";

export const mathF2C5MindMapDLP: MindNode = {
  id: "math-c5-dlp-root",
  label: "Circles",
  children: [
    {
      id: "math-c5-dlp-1",
      label: "5.1 Properties of Circles",
      children: [
        {
          id: "math-c5-dlp-1-1",
          label: "Parts of a Circle",
          children: [
            { id: "math-c5-dlp-1-1-1", label: "Centre (O): fixed point in the middle" },
            { id: "math-c5-dlp-1-1-2", label: "Radius (r): centre to circumference" },
            { id: "math-c5-dlp-1-1-3", label: "Diameter (d): longest chord, d = 2r" },
            { id: "math-c5-dlp-1-1-4", label: "Chord: joins two points on the circumference" },
            { id: "math-c5-dlp-1-1-5", label: "Arc: part of the circumference" },
            { id: "math-c5-dlp-1-1-6", label: "Sector: bounded by two radii and an arc" },
            { id: "math-c5-dlp-1-1-7", label: "Segment: bounded by a chord and an arc" },
          ],
        },
        {
          id: "math-c5-dlp-1-2",
          label: "Basic Relationships",
          children: [
            { id: "math-c5-dlp-1-2-1", label: "d = 2r" },
            { id: "math-c5-dlp-1-2-2", label: "All radii in one circle are equal in length" },
          ],
        },
      ],
    },
    {
      id: "math-c5-dlp-2",
      label: "5.2 Symmetrical Properties of Chords",
      children: [
        {
          id: "math-c5-dlp-2-1",
          label: "Key Properties",
          children: [
            { id: "math-c5-dlp-2-1-1", label: "Line from centre perpendicular to chord → bisects it" },
            { id: "math-c5-dlp-2-1-2", label: "Line from centre bisecting a chord → perpendicular to it" },
            { id: "math-c5-dlp-2-1-3", label: "Equal chords → equidistant from centre" },
            { id: "math-c5-dlp-2-1-4", label: "Equidistant from centre → equal chords" },
          ],
        },
        {
          id: "math-c5-dlp-2-2",
          label: "Calculations",
          children: [
            { id: "math-c5-dlp-2-2-1", label: "Use Pythagoras Theorem: AM² = OA² - OM²" },
            { id: "math-c5-dlp-2-2-2", label: "Radius = hypotenuse of the right-angled triangle" },
            { id: "math-c5-dlp-2-2-3", label: "Full chord length = 2 x half chord" },
          ],
        },
      ],
    },
    {
      id: "math-c5-dlp-3",
      label: "5.3 Circumference and Area of a Circle",
      children: [
        {
          id: "math-c5-dlp-3-1",
          label: "Circumference",
          children: [
            { id: "math-c5-dlp-3-1-1", label: "Circumference = 2πr or πd" },
            { id: "math-c5-dlp-3-1-2", label: "Example: r = 7 cm, π = 22/7 → Circumference = 44 cm" },
          ],
        },
        {
          id: "math-c5-dlp-3-2",
          label: "Area",
          children: [
            { id: "math-c5-dlp-3-2-1", label: "Area = πr²" },
            { id: "math-c5-dlp-3-2-2", label: "Example: r = 10 cm, π = 3.142 → Area = 314.2 cm²" },
          ],
        },
        {
          id: "math-c5-dlp-3-3",
          label: "Value of π",
          children: [
            { id: "math-c5-dlp-3-3-1", label: "Use 22/7 for multiples of 7" },
            { id: "math-c5-dlp-3-3-2", label: "Use 3.142 for decimal numbers" },
          ],
        },
      ],
    },
    {
      id: "math-c5-dlp-4",
      label: "Summary",
      children: [
        { id: "math-c5-dlp-4-1", label: "Identify radius vs diameter first" },
        { id: "math-c5-dlp-4-2", label: "Draw a diagram for chords and right angles" },
        { id: "math-c5-dlp-4-3", label: "Always square r first for area" },
        { id: "math-c5-dlp-4-4", label: "Check units: length for circumference, squared for area" },
      ],
    },
  ],
};
