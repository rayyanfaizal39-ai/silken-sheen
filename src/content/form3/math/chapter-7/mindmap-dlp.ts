import type { MindNode } from "@/components/MindMap";

export const mathF3C7MindMapDLP: MindNode = {
  id: "f3c7-en",
  label: "Plan and Elevation",
  children: [
    {
      id: "f3c7-en-1",
      label: "7.1 Orthogonal Projection",
      children: [
        { id: "f3c7-en-1-1", label: "Planes: horizontal, vertical, inclined" },
        { id: "f3c7-en-1-2", label: "Normal: line perpendicular (90°) to the plane" },
        { id: "f3c7-en-1-3", label: "Orthogonal projection: projection line perpendicular to plane" },
        { id: "f3c7-en-1-4", label: "Projected length/angle changes with viewing direction" },
      ],
    },
    {
      id: "f3c7-en-2",
      label: "7.2 Plan and Elevation",
      children: [
        { id: "f3c7-en-2-1", label: "Plan: top view (4th quadrant)" },
        { id: "f3c7-en-2-2", label: "Front elevation: 1st quadrant" },
        { id: "f3c7-en-2-3", label: "Side elevation: 1st/2nd quadrant by direction" },
        { id: "f3c7-en-2-4", label: "Solid=visible; dashed=hidden; thin=construction" },
        { id: "f3c7-en-2-5", label: "Full scale (1:1)" },
      ],
    },
    {
      id: "f3c7-en-3",
      label: "Synthesising and Sketching",
      children: [
        { id: "f3c7-en-3-1", label: "Combine 3 projections -> 3D shape" },
        { id: "f3c7-en-3-2", label: "Steps: sketch projections, project surfaces, connect vertices, label" },
      ],
    },
  ],
};
