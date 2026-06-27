import type { MindNode } from "@/components/MindMap";

export const mathF3C4MindMapDLP: MindNode = {
  id: "f3c4-en",
  label: "Scale Drawings",
  children: [
    {
      id: "f3c4-en-1",
      label: "Meaning and Interpreting Scale",
      children: [
        { id: "f3c4-en-1-1", label: "Scale drawing: proportional measurements, angles unchanged" },
        { id: "f3c4-en-1-2", label: "Scale = drawing measurement / object measurement = 1:n" },
        { id: "f3c4-en-1-3", label: "n<1 larger drawing; n>1 smaller; n=1 same size" },
      ],
    },
    {
      id: "f3c4-en-2",
      label: "Determining Scale/Measurements",
      children: [
        { id: "f3c4-en-2-1", label: "Map scale: 1cm:n km" },
        { id: "f3c4-en-2-2", label: "Unit conversion: 1km=100 000cm" },
        { id: "f3c4-en-2-3", label: "Actual area = (length ratio)² x drawing area" },
        { id: "f3c4-en-2-4", label: "Actual volume = (length ratio)³ x drawing volume" },
      ],
    },
    {
      id: "f3c4-en-3",
      label: "Drawing a Scale Drawing",
      children: [
        { id: "f3c4-en-3-1", label: "Same-size grid, different scale" },
        { id: "f3c4-en-3-2", label: "Different-size grid" },
        { id: "f3c4-en-3-3", label: "Blank paper following a given scale" },
      ],
    },
    {
      id: "f3c4-en-4",
      label: "Solving Problems",
      children: [
        { id: "f3c4-en-4-1", label: "Travel distance: time = distance/speed" },
        { id: "f3c4-en-4-2", label: "Land/room area and tile costs" },
        { id: "f3c4-en-4-3", label: "Scale drawing perimeter" },
      ],
    },
  ],
};
