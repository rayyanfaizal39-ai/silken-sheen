import type { MindNode } from "@/components/MindMap";

export const mathF2C10MindMapDLP: MindNode = {
  id: "math-c10-dlp-root",
  label: "Gradient and Area under a Graph",
  children: [
    {
      id: "math-c10-dlp-1",
      label: "Gradient of a Straight Line",
      children: [
        { id: "math-c10-dlp-1-1", label: "Definition: vertical change / horizontal change" },
        { id: "math-c10-dlp-1-2", label: "Formula: m = (y2 - y1) / (x2 - x1)" },
        {
          id: "math-c10-dlp-1-3",
          label: "Types of Gradient",
          children: [
            { id: "math-c10-dlp-1-3-1", label: "Rising left to right → positive" },
            { id: "math-c10-dlp-1-3-2", label: "Falling left to right → negative" },
            { id: "math-c10-dlp-1-3-3", label: "Horizontal → zero" },
            { id: "math-c10-dlp-1-3-4", label: "Vertical → undefined" },
          ],
        },
      ],
    },
    {
      id: "math-c10-dlp-2",
      label: "The Distance-Time Graph",
      children: [
        { id: "math-c10-dlp-2-1", label: "y-axis: distance; x-axis: time" },
        { id: "math-c10-dlp-2-2", label: "Gradient = speed" },
        {
          id: "math-c10-dlp-2-3",
          label: "Graph Features",
          children: [
            { id: "math-c10-dlp-2-3-1", label: "Rising line → uniform speed" },
            { id: "math-c10-dlp-2-3-2", label: "Horizontal line → object at rest" },
            { id: "math-c10-dlp-2-3-3", label: "Curved line → changing speed" },
          ],
        },
        { id: "math-c10-dlp-2-4", label: "Example: Speed = distance / time = 120 km / 2 h = 60 km/h" },
      ],
    },
    {
      id: "math-c10-dlp-3",
      label: "The Speed-Time Graph",
      children: [
        { id: "math-c10-dlp-3-1", label: "y-axis: speed; x-axis: time" },
        { id: "math-c10-dlp-3-2", label: "Gradient = acceleration" },
        {
          id: "math-c10-dlp-3-3",
          label: "Graph Features",
          children: [
            { id: "math-c10-dlp-3-3-1", label: "Rising line → positive acceleration" },
            { id: "math-c10-dlp-3-3-2", label: "Horizontal line → zero acceleration (uniform speed)" },
            { id: "math-c10-dlp-3-3-3", label: "Falling line → deceleration (negative acceleration)" },
          ],
        },
        { id: "math-c10-dlp-3-4", label: "Example: a = (25 - 5) / 4 = 5 m/s²" },
      ],
    },
    {
      id: "math-c10-dlp-4",
      label: "Area Under a Speed-Time Graph",
      children: [
        { id: "math-c10-dlp-4-1", label: "Area = distance travelled" },
        {
          id: "math-c10-dlp-4-2",
          label: "Area Formulas",
          children: [
            { id: "math-c10-dlp-4-2-1", label: "Triangle: 1/2 x base x height" },
            { id: "math-c10-dlp-4-2-2", label: "Rectangle: length x width" },
            { id: "math-c10-dlp-4-2-3", label: "Trapezium: 1/2 x (a + b) x h" },
          ],
        },
        { id: "math-c10-dlp-4-3", label: "Break complex graphs into basic shapes" },
        { id: "math-c10-dlp-4-4", label: "Example: Distance = 1/2 x 10 x 20 = 100 m" },
      ],
    },
    {
      id: "math-c10-dlp-5",
      label: "Common Mistakes",
      children: [
        { id: "math-c10-dlp-5-1", label: "Inverting the gradient formula" },
        { id: "math-c10-dlp-5-2", label: "Confusing distance-time vs speed-time graph axes" },
        { id: "math-c10-dlp-5-3", label: "Forgetting the negative sign for deceleration" },
        { id: "math-c10-dlp-5-4", label: "Using the wrong area formula (triangle vs trapezium)" },
      ],
    },
    {
      id: "math-c10-dlp-6",
      label: "Summary",
      children: [
        { id: "math-c10-dlp-6-1", label: "Distance-time gradient = speed" },
        { id: "math-c10-dlp-6-2", label: "Speed-time gradient = acceleration" },
        { id: "math-c10-dlp-6-3", label: "Area under speed-time graph = distance" },
        { id: "math-c10-dlp-6-4", label: "Check units and signs before answering" },
      ],
    },
  ],
};
