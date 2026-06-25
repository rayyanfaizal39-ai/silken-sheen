import type { MindNode } from "@/components/MindMap";

export const mathF2C7MindMapDLP: MindNode = {
  id: "math-f2-c7-dlp-root",
  label: "Coordinates",
  children: [
    {
      id: "math-f2-c7-dlp-1",
      label: "7.1 Distance Between Two Points",
      children: [
        { id: "math-f2-c7-dlp-1-1", label: "Formula: AB = √((x2-x1)² + (y2-y1)²)" },
        {
          id: "math-f2-c7-dlp-1-2",
          label: "Concept",
          children: [
            { id: "math-f2-c7-dlp-1-2-1", label: "Based on Pythagoras' Theorem" },
            { id: "math-f2-c7-dlp-1-2-2", label: "Distance is always positive" },
            { id: "math-f2-c7-dlp-1-2-3", label: "Horizontal line: only x-coordinate difference" },
            { id: "math-f2-c7-dlp-1-2-4", label: "Vertical line: only y-coordinate difference" },
          ],
        },
        {
          id: "math-f2-c7-dlp-1-3",
          label: "Example",
          children: [
            { id: "math-f2-c7-dlp-1-3-1", label: "A(2,3), B(6,6) → AB = 5 units" },
            { id: "math-f2-c7-dlp-1-3-2", label: "P(-1,2), Q(3,-1) → PQ = 5 units" },
          ],
        },
        {
          id: "math-f2-c7-dlp-1-4",
          label: "Common Mistakes",
          children: [
            { id: "math-f2-c7-dlp-1-4-1", label: "Inconsistent order when subtracting x and y" },
            { id: "math-f2-c7-dlp-1-4-2", label: "Errors squaring negative numbers" },
            { id: "math-f2-c7-dlp-1-4-3", label: "Forgetting to take the square root" },
          ],
        },
      ],
    },
    {
      id: "math-f2-c7-dlp-2",
      label: "7.2 Midpoint Between Two Points",
      children: [
        { id: "math-f2-c7-dlp-2-1", label: "Formula: M = ((x1+x2)/2, (y1+y2)/2)" },
        {
          id: "math-f2-c7-dlp-2-2",
          label: "Concept",
          children: [
            { id: "math-f2-c7-dlp-2-2-1", label: "Average of the x-coordinates and y-coordinates" },
            { id: "math-f2-c7-dlp-2-2-2", label: "Equidistant from both points" },
            { id: "math-f2-c7-dlp-2-2-3", label: "Finding an unknown point: B = (2xm-x1, 2ym-y1)" },
          ],
        },
        {
          id: "math-f2-c7-dlp-2-3",
          label: "Example",
          children: [
            { id: "math-f2-c7-dlp-2-3-1", label: "A(2,3), B(6,7) → M(4,5)" },
            { id: "math-f2-c7-dlp-2-3-2", label: "P(-3,4), Q(5,-2) → M(1,1)" },
          ],
        },
        {
          id: "math-f2-c7-dlp-2-4",
          label: "Common Mistakes",
          children: [
            { id: "math-f2-c7-dlp-2-4-1", label: "Forgetting to divide by 2" },
            { id: "math-f2-c7-dlp-2-4-2", label: "Mixing up x-coordinates with y-coordinates" },
            { id: "math-f2-c7-dlp-2-4-3", label: "Sign errors with negative numbers" },
          ],
        },
      ],
    },
    {
      id: "math-f2-c7-dlp-3",
      label: "7.3 Areas of Polygons",
      children: [
        { id: "math-f2-c7-dlp-3-1", label: "Triangle Formula: 1/2|x1(y2-y3)+x2(y3-y1)+x3(y1-y2)|" },
        { id: "math-f2-c7-dlp-3-2", label: "Shoelace method for general polygons" },
        {
          id: "math-f2-c7-dlp-3-3",
          label: "Steps",
          children: [
            { id: "math-f2-c7-dlp-3-3-1", label: "List vertices in order (clockwise/anticlockwise)" },
            { id: "math-f2-c7-dlp-3-3-2", label: "Cross-multiply and subtract" },
            { id: "math-f2-c7-dlp-3-3-3", label: "Take the absolute value" },
            { id: "math-f2-c7-dlp-3-3-4", label: "Divide by 2" },
          ],
        },
        {
          id: "math-f2-c7-dlp-3-4",
          label: "Example",
          children: [
            { id: "math-f2-c7-dlp-3-4-1", label: "A(1,1), B(5,1), C(3,4) → Area = 6 units²" },
            { id: "math-f2-c7-dlp-3-4-2", label: "P(0,0), Q(4,0), R(4,3), S(0,3) → Area = 12 units²" },
          ],
        },
        {
          id: "math-f2-c7-dlp-3-5",
          label: "Common Mistakes",
          children: [
            { id: "math-f2-c7-dlp-3-5-1", label: "Vertices not listed in correct order" },
            { id: "math-f2-c7-dlp-3-5-2", label: "Forgetting the absolute value (area becomes negative)" },
            { id: "math-f2-c7-dlp-3-5-3", label: "Forgetting to divide by 2" },
            { id: "math-f2-c7-dlp-3-5-4", label: "Not connecting the last vertex back to the first" },
          ],
        },
      ],
    },
    {
      id: "math-f2-c7-dlp-4",
      label: "Summary",
      children: [
        { id: "math-f2-c7-dlp-4-1", label: "Distance: Pythagoras, always positive" },
        { id: "math-f2-c7-dlp-4-2", label: "Midpoint: average of coordinates" },
        { id: "math-f2-c7-dlp-4-3", label: "Area: shoelace method, absolute value, divide by 2" },
        { id: "math-f2-c7-dlp-4-4", label: "Sketch the Cartesian plane diagram to help visualise" },
      ],
    },
  ],
};
