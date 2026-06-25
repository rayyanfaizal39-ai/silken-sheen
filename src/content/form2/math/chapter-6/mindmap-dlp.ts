import type { MindNode } from "@/components/MindMap";

export const mathF2C6MindMapDLP: MindNode = {
  id: "root",
  label: "Three-Dimensional Geometrical Shapes",
  children: [
    {
      id: "c6-dlp-properties",
      label: "6.1 Geometric Properties",
      children: [
        {
          id: "c6-dlp-properties-components",
          label: "Components",
          children: [
            { id: "c6-dlp-properties-components-1", label: "Face" },
            { id: "c6-dlp-properties-components-2", label: "Edge" },
            { id: "c6-dlp-properties-components-3", label: "Vertex" },
          ],
        },
        {
          id: "c6-dlp-properties-prism",
          label: "Prism",
          children: [
            { id: "c6-dlp-properties-prism-1", label: "Two parallel, congruent bases of equal shape/size" },
            { id: "c6-dlp-properties-prism-2", label: "Rectangular lateral faces" },
            { id: "c6-dlp-properties-prism-3", label: "Named according to the shape of its base (triangle, square, etc.)" },
          ],
        },
        {
          id: "c6-dlp-properties-pyramid",
          label: "Pyramid",
          children: [
            { id: "c6-dlp-properties-pyramid-1", label: "One base" },
            { id: "c6-dlp-properties-pyramid-2", label: "Triangular lateral faces meeting at an apex" },
            { id: "c6-dlp-properties-pyramid-3", label: "Named according to the shape of its base" },
          ],
        },
        {
          id: "c6-dlp-properties-cylinder",
          label: "Cylinder",
          children: [
            { id: "c6-dlp-properties-cylinder-1", label: "Two parallel circular bases of equal size" },
            { id: "c6-dlp-properties-cylinder-2", label: "One curved surface" },
          ],
        },
        {
          id: "c6-dlp-properties-cone",
          label: "Cone",
          children: [
            { id: "c6-dlp-properties-cone-1", label: "One circular base" },
            { id: "c6-dlp-properties-cone-2", label: "Curved surface meeting at a single apex" },
          ],
        },
        {
          id: "c6-dlp-properties-sphere",
          label: "Sphere",
          children: [
            { id: "c6-dlp-properties-sphere-1", label: "No base, edge or vertex" },
            { id: "c6-dlp-properties-sphere-2", label: "All surface points equidistant from the centre" },
          ],
        },
      ],
    },
    {
      id: "c6-dlp-nets",
      label: "6.2 Nets",
      children: [
        { id: "c6-dlp-nets-1", label: "A two-dimensional shape that folds into a three-dimensional shape" },
        { id: "c6-dlp-nets-2", label: "Cube: 6 squares" },
        { id: "c6-dlp-nets-3", label: "Cuboid: 6 rectangles (3 pairs)" },
        { id: "c6-dlp-nets-4", label: "Triangular prism: 2 triangles + 3 rectangles" },
        { id: "c6-dlp-nets-5", label: "Square pyramid: 1 square + 4 triangles" },
        { id: "c6-dlp-nets-6", label: "Cylinder: 2 circles + 1 rectangle" },
        { id: "c6-dlp-nets-7", label: "Cone: 1 circle + 1 sector of a circle" },
      ],
    },
    {
      id: "c6-dlp-sa",
      label: "6.3 Surface Area",
      children: [
        { id: "c6-dlp-sa-cube", label: "Cube: 6s²" },
        { id: "c6-dlp-sa-cuboid", label: "Cuboid: 2(lw + lh + wh)" },
        { id: "c6-dlp-sa-prism", label: "Prism: (2 x Base Area) + (Base Perimeter x Height)" },
        { id: "c6-dlp-sa-cylinder", label: "Cylinder: 2πr(r + h)" },
        { id: "c6-dlp-sa-pyramid", label: "Pyramid: Base Area + Total Lateral Face Area" },
        { id: "c6-dlp-sa-cone", label: "Cone: πr(r + l), l = slant height" },
        { id: "c6-dlp-sa-sphere", label: "Sphere: 4πr²" },
        { id: "c6-dlp-sa-unit", label: "Unit: cm² / m²" },
      ],
    },
    {
      id: "c6-dlp-volume",
      label: "6.4 Volume",
      children: [
        { id: "c6-dlp-volume-cube", label: "Cube: s³" },
        { id: "c6-dlp-volume-cuboid", label: "Cuboid: l x w x h" },
        { id: "c6-dlp-volume-prism", label: "Prism: Base Area x Height" },
        { id: "c6-dlp-volume-cylinder", label: "Cylinder: πr²h" },
        { id: "c6-dlp-volume-pyramid", label: "Pyramid: 1/3 x Base Area x Height" },
        { id: "c6-dlp-volume-cone", label: "Cone: 1/3 x πr²h" },
        { id: "c6-dlp-volume-sphere", label: "Sphere: 4/3 x πr³" },
        { id: "c6-dlp-volume-combined", label: "Combined shapes: compute each part, then add/subtract" },
        { id: "c6-dlp-volume-unit", label: "Unit: cm³ / m³" },
      ],
    },
    {
      id: "c6-dlp-summary",
      label: "Summary",
      children: [
        { id: "c6-dlp-summary-1", label: "Identify the basic shape before calculating surface area/volume" },
        { id: "c6-dlp-summary-2", label: "Use π = 3.142 or 22/7 as appropriate" },
        { id: "c6-dlp-summary-3", label: "Check units: square for area, cubic for volume" },
        { id: "c6-dlp-summary-4", label: "Do not confuse slant height (l) with vertical height (h)" },
      ],
    },
  ],
};
