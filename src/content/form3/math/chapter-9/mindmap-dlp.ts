import type { MindNode } from "@/components/MindMap";

export const mathF3C9MindMapDLP: MindNode = {
  id: "f3c9-en",
  label: "Straight Lines",
  children: [
    {
      id: "f3c9-en-1",
      label: "The Equation y=mx+c",
      children: [
        { id: "f3c9-en-1-1", label: "m = gradient, c = y-intercept" },
        { id: "f3c9-en-1-2", label: "y=h parallel to x-axis (m=0)" },
        { id: "f3c9-en-1-3", label: "x=h parallel to y-axis (m undefined)" },
      ],
    },
    {
      id: "f3c9-en-2",
      label: "Other Forms",
      children: [
        { id: "f3c9-en-2-1", label: "ax+by=c" },
        { id: "f3c9-en-2-2", label: "x/a+y/b=1: a=x-intercept, b=y-intercept" },
        { id: "f3c9-en-2-3", label: "Convert between forms algebraically" },
      ],
    },
    {
      id: "f3c9-en-3",
      label: "Points and Parallel Lines",
      children: [
        { id: "f3c9-en-3-1", label: "Point on a line: substitute, check LHS=RHS" },
        { id: "f3c9-en-3-2", label: "Parallel lines: equal gradients" },
      ],
    },
    {
      id: "f3c9-en-4",
      label: "Line Equation and Intersection",
      children: [
        { id: "f3c9-en-4-1", label: "m + 1 point -> find c" },
        { id: "f3c9-en-4-2", label: "2 points -> find m=(y2-y1)/(x2-x1) first" },
        { id: "f3c9-en-4-3", label: "Intersection: simultaneous equations (substitution/elimination)" },
      ],
    },
  ],
};
