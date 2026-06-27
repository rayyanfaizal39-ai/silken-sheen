import type { MindNode } from "@/components/MindMap";

export const mathF3C1MindMapDLP: MindNode = {
  id: "f3c1-en",
  label: "Index",
  children: [
    {
      id: "f3c1-en-1",
      label: "1.1 Index Notation",
      children: [
        {
          id: "f3c1-en-1-1",
          label: "Index Form",
          children: [
            { id: "f3c1-en-1-1-1", label: "an = a x a x ... x a (n factors)" },
            { id: "f3c1-en-1-1-2", label: "a = base, n = index/power" },
            { id: "f3c1-en-1-1-3", label: "Example: 5^6 = 5x5x5x5x5x5" },
            { id: "f3c1-en-1-1-4", label: "Repeated division method: 64 = 2^6 = 4^3" },
          ],
        },
      ],
    },
    {
      id: "f3c1-en-2",
      label: "1.2 Laws of Indices",
      children: [
        {
          id: "f3c1-en-2-1",
          label: "Multiplication",
          children: [
            { id: "f3c1-en-2-1-1", label: "am x an = a^(m+n)" },
            { id: "f3c1-en-2-1-2", label: "Bases must be the same" },
            { id: "f3c1-en-2-1-3", label: "2k^2 x 4k^3 = 8k^5" },
          ],
        },
        {
          id: "f3c1-en-2-2",
          label: "Division",
          children: [
            { id: "f3c1-en-2-2-1", label: "am ÷ an = a^(m-n)" },
            { id: "f3c1-en-2-2-2", label: "25x^2y^3 ÷ 5xy = 5xy^2" },
          ],
        },
        {
          id: "f3c1-en-2-3",
          label: "Power of a Power",
          children: [
            { id: "f3c1-en-2-3-1", label: "(am)n = a^(mn)" },
            { id: "f3c1-en-2-3-2", label: "(p^2q^3r)^4 = p^8q^12r^4" },
          ],
        },
        {
          id: "f3c1-en-2-4",
          label: "Zero and Negative Indices",
          children: [
            { id: "f3c1-en-2-4-1", label: "a^0 = 1 (a≠0)" },
            { id: "f3c1-en-2-4-2", label: "a^(-n) = 1/a^n" },
            { id: "f3c1-en-2-4-3", label: "(a/b)^(-n) = (b/a)^n" },
          ],
        },
        {
          id: "f3c1-en-2-5",
          label: "Fractional Indices",
          children: [
            { id: "f3c1-en-2-5-1", label: "a^(1/n) = nth root of a" },
            { id: "f3c1-en-2-5-2", label: "a^(m/n) = nth root of a^m" },
            { id: "f3c1-en-2-5-3", label: "81^(3/4) = (4th root of 81)^3 = 27" },
          ],
        },
        {
          id: "f3c1-en-2-6",
          label: "Index Equations and Problems",
          children: [
            { id: "f3c1-en-2-6-1", label: "Equate bases, then equate indices" },
            { id: "f3c1-en-2-6-2", label: "3^x x 9^(x+5) ÷ 3^4 = 1 -> x = -2" },
            { id: "f3c1-en-2-6-3", label: "Applications: growth, compound interest, science" },
          ],
        },
      ],
    },
    {
      id: "f3c1-en-3",
      label: "Chapter Summary",
      children: [
        { id: "f3c1-en-3-1", label: "an = repeated multiplication; a=base, n=index" },
        { id: "f3c1-en-3-2", label: "Laws: add/subtract/multiply indices by operation" },
        { id: "f3c1-en-3-3", label: "a^0=1; a^(-n)=1/a^n" },
        { id: "f3c1-en-3-4", label: "Fractional indices link powers and roots" },
      ],
    },
  ],
};
