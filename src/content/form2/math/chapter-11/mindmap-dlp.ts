import type { MindNode } from "@/components/MindMap";

export const mathF2C11MindMapDLP: MindNode = {
  id: "math-c11-dlp-root",
  label: "Probability",
  children: [
    {
      id: "math-c11-dlp-1",
      label: "11.1 Experimental Probability",
      children: [
        { id: "math-c11-dlp-1-1", label: "Definition: based on actual outcomes of a repeated experiment" },
        { id: "math-c11-dlp-1-2", label: "Formula: Number of times event occurs / Total number of trials" },
        { id: "math-c11-dlp-1-3", label: "Example: coin toss 28/50 = 14/25" },
        { id: "math-c11-dlp-1-4", label: "Prediction = Experimental probability x Number of new trials" },
        { id: "math-c11-dlp-1-5", label: "Mistake: inverting numerator/denominator" },
      ],
    },
    {
      id: "math-c11-dlp-2",
      label: "11.2 Theoretical Probability (Equally Likely Outcomes)",
      children: [
        { id: "math-c11-dlp-2-1", label: "Sample space S, event A, n(S), n(A)" },
        { id: "math-c11-dlp-2-2", label: "Formula: P(A) = n(A) / n(S)" },
        { id: "math-c11-dlp-2-3", label: "Example: even number on dice → P(A) = 3/6 = 1/2" },
        { id: "math-c11-dlp-2-4", label: "Example: 2 coins, at least one head → P(C) = 3/4" },
        { id: "math-c11-dlp-2-5", label: "Use a table/tree diagram for two objects" },
        { id: "math-c11-dlp-2-6", label: "Mistake: incomplete sample space listing" },
      ],
    },
    {
      id: "math-c11-dlp-3",
      label: "11.3 Complement of an Event",
      children: [
        { id: "math-c11-dlp-3-1", label: "A' = outcomes not in event A" },
        { id: "math-c11-dlp-3-2", label: "Formula: P(A') = 1 - P(A)" },
        { id: "math-c11-dlp-3-3", label: "Example: dice number 5 → P(A') = 5/6" },
        { id: "math-c11-dlp-3-4", label: "A and A' do not overlap, together cover all of S" },
        { id: "math-c11-dlp-3-5", label: "Mistake: adding 1 instead of subtracting" },
      ],
    },
    {
      id: "math-c11-dlp-4",
      label: "11.4 Probability of Simple Events",
      children: [
        { id: "math-c11-dlp-4-1", label: "Daily applications: marbles, lucky draws, stock" },
        { id: "math-c11-dlp-4-2", label: "Example: blue marble 3/10 out of 10 marbles" },
        { id: "math-c11-dlp-4-3", label: "Example: non-winning ticket = 4/5" },
        { id: "math-c11-dlp-4-4", label: "Simplify the fraction answer" },
        { id: "math-c11-dlp-4-5", label: "Mistake: miscounting the actual n(S)" },
      ],
    },
    {
      id: "math-c11-dlp-5",
      label: "Summary",
      children: [
        { id: "math-c11-dlp-5-1", label: "0 ≤ P(A) ≤ 1" },
        { id: "math-c11-dlp-5-2", label: "P(A) + P(A') = 1" },
        { id: "math-c11-dlp-5-3", label: "P(A) = 0 impossible; P(A) = 1 certain" },
        { id: "math-c11-dlp-5-4", label: "List the sample space systematically" },
      ],
    },
  ],
};
