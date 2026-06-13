import type { MindNode } from "@/components/MindMap";

export const mathF1C11MindMapDLP: MindNode = {
  id: "math-c11-dlp-root",
  label: "Introduction to Sets",
  children: [
    {
      id: "math-c11-dlp-1",
      label: "Basics of Sets",
      children: [
        { id: "math-c11-dlp-1-1", label: "Set: well-defined collection of objects" },
        { id: "math-c11-dlp-1-2", label: "Element/Member: an object in the set (∈)" },
        { id: "math-c11-dlp-1-3", label: "Non-member: not in the set (∉)" },
        { id: "math-c11-dlp-1-4", label: "Universal set: all related elements (ξ)" },
      ],
    },
    {
      id: "math-c11-dlp-2",
      label: "Set Notation",
      children: [
        { id: "math-c11-dlp-2-1", label: "Listing: A = {1, 2, 3, 4}" },
        { id: "math-c11-dlp-2-2", label: "Description: A = {x : x is an integer between 1 and 5}" },
        { id: "math-c11-dlp-2-3", label: "Capital letters for sets, lowercase for elements" },
      ],
    },
    {
      id: "math-c11-dlp-3",
      label: "Types of Sets",
      children: [
        { id: "math-c11-dlp-3-1", label: "Empty set: {} or ∅ (no elements)" },
        { id: "math-c11-dlp-3-2", label: "Finite set: countable elements" },
        { id: "math-c11-dlp-3-3", label: "Infinite set: unlimited elements" },
        { id: "math-c11-dlp-3-4", label: "Subset: A ⊂ B (all elements of A are in B)" },
        { id: "math-c11-dlp-3-5", label: "Equal sets: A = B (same elements)" },
      ],
    },
    {
      id: "math-c11-dlp-4",
      label: "Set Operations",
      children: [
        {
          id: "math-c11-dlp-4-1",
          label: "Union (∪)",
          children: [
            { id: "math-c11-dlp-4-1-1", label: "All elements in A or B" },
            { id: "math-c11-dlp-4-1-2", label: "A ∪ B = {all elements in A and B without duplicates}" },
          ],
        },
        {
          id: "math-c11-dlp-4-2",
          label: "Intersection (∩)",
          children: [
            { id: "math-c11-dlp-4-2-1", label: "Elements in both A and B" },
            { id: "math-c11-dlp-4-2-2", label: "A ∩ B = {common elements}" },
          ],
        },
        {
          id: "math-c11-dlp-4-3",
          label: "Complement (A')",
          children: [
            { id: "math-c11-dlp-4-3-1", label: "Elements in ξ but NOT in A" },
          ],
        },
      ],
    },
    {
      id: "math-c11-dlp-5",
      label: "Venn Diagrams",
      children: [
        { id: "math-c11-dlp-5-1", label: "Rectangle = universal set (ξ)" },
        { id: "math-c11-dlp-5-2", label: "Circles = sets" },
        { id: "math-c11-dlp-5-3", label: "Overlapping region = intersection" },
        { id: "math-c11-dlp-5-4", label: "Draw and shade the region asked" },
      ],
    },
  ],
};
