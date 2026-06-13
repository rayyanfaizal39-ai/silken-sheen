import type { MindNode } from "@/components/MindMap";

export const mathF1C2MindMapDLP: MindNode = {
  id: "math-c2-dlp-root",
  label: "Factors and Multiples",
  children: [
    {
      id: "math-c2-dlp-1",
      label: "Factors",
      children: [
        { id: "math-c2-dlp-1-1", label: "Factor: number that divides exactly" },
        { id: "math-c2-dlp-1-2", label: "Common factor: shared by two or more numbers" },
        {
          id: "math-c2-dlp-1-3",
          label: "Greatest Common Factor (GCF / HCF)",
          children: [
            { id: "math-c2-dlp-1-3-1", label: "Method 1: List all factors" },
            { id: "math-c2-dlp-1-3-2", label: "Method 2: Repeated division" },
            { id: "math-c2-dlp-1-3-3", label: "Method 3: Prime factorisation" },
          ],
        },
      ],
    },
    {
      id: "math-c2-dlp-2",
      label: "Multiples",
      children: [
        { id: "math-c2-dlp-2-1", label: "Multiple: product of a number and an integer" },
        { id: "math-c2-dlp-2-2", label: "Common multiple: shared multiples" },
        {
          id: "math-c2-dlp-2-3",
          label: "Lowest Common Multiple (LCM)",
          children: [
            { id: "math-c2-dlp-2-3-1", label: "Method 1: List multiples" },
            { id: "math-c2-dlp-2-3-2", label: "Method 2: Repeated division" },
            { id: "math-c2-dlp-2-3-3", label: "Method 3: Prime factorisation" },
          ],
        },
      ],
    },
    {
      id: "math-c2-dlp-3",
      label: "Prime Numbers",
      children: [
        { id: "math-c2-dlp-3-1", label: "Has exactly 2 factors: 1 and itself" },
        { id: "math-c2-dlp-3-2", label: "Examples: 2, 3, 5, 7, 11, 13, ..." },
        { id: "math-c2-dlp-3-3", label: "1 is NOT a prime number (only 1 factor)" },
      ],
    },
    {
      id: "math-c2-dlp-4",
      label: "Prime Factorisation",
      children: [
        { id: "math-c2-dlp-4-1", label: "Express a number as product of prime factors" },
        { id: "math-c2-dlp-4-2", label: "Use factor tree method" },
        { id: "math-c2-dlp-4-3", label: "Example: 12 = 2² × 3" },
      ],
    },
    {
      id: "math-c2-dlp-5",
      label: "Applications of LCM and GCF",
      children: [
        { id: "math-c2-dlp-5-1", label: "GCF: grouping / distribution problems" },
        { id: "math-c2-dlp-5-2", label: "LCM: time interval / cycle problems" },
        { id: "math-c2-dlp-5-3", label: "Examples: flashing lights, bus schedules" },
      ],
    },
  ],
};
