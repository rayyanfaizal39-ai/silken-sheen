import type { MindNode } from "@/components/MindMap";

export const mathF2C3MindMapDLP: MindNode = {
  id: "math-c3-dlp-root",
  label: "Algebraic Formulae",
  children: [
    {
      id: "math-c3-dlp-1",
      label: "Writing Formulae",
      children: [
        { id: "math-c3-dlp-1-1", label: "Formula: relationship between variables" },
        { id: "math-c3-dlp-1-2", label: "Subject of formula: lone variable on the left of '='" },
        { id: "math-c3-dlp-1-3", label: "Example: s = vt (distance = speed x time)" },
        { id: "math-c3-dlp-1-4", label: "Identify the relationship: add, subtract, multiply, divide" },
      ],
    },
    {
      id: "math-c3-dlp-2",
      label: "Changing the Subject: Basic Operations",
      children: [
        { id: "math-c3-dlp-2-1", label: "Inverse of addition is subtraction" },
        { id: "math-c3-dlp-2-2", label: "Inverse of multiplication is division" },
        { id: "math-c3-dlp-2-3", label: "Apply to both sides of the formula" },
        { id: "math-c3-dlp-2-4", label: "Example: v = u + at -> a = (v - u) / t" },
      ],
    },
    {
      id: "math-c3-dlp-3",
      label: "Changing the Subject: Powers & Roots",
      children: [
        { id: "math-c3-dlp-3-1", label: "Inverse of squaring is taking the square root" },
        { id: "math-c3-dlp-3-2", label: "Inverse of square root is squaring" },
        { id: "math-c3-dlp-3-3", label: "Example: A = πr² -> r = √(A / π)" },
        { id: "math-c3-dlp-3-4", label: "Take positive value for physical quantities (length, radius)" },
        { id: "math-c3-dlp-3-5", label: "Consider ± for general algebraic contexts" },
      ],
    },
    {
      id: "math-c3-dlp-4",
      label: "Determining the Value of a Variable",
      children: [
        { id: "math-c3-dlp-4-1", label: "Substitute known values into the formula" },
        { id: "math-c3-dlp-4-2", label: "Change subject first if required variable is not the subject" },
        { id: "math-c3-dlp-4-3", label: "Example: v = u + at, u=5, a=2, t=4 -> v = 13" },
        { id: "math-c3-dlp-4-4", label: "Example: A = πr², A=154, π=22/7 -> r = 7 cm" },
      ],
    },
    {
      id: "math-c3-dlp-5",
      label: "Summary",
      children: [
        { id: "math-c3-dlp-5-1", label: "v = u + at -> a = (v - u) / t" },
        { id: "math-c3-dlp-5-2", label: "P = 2(l + b) -> b = (P - 2l) / 2" },
        { id: "math-c3-dlp-5-3", label: "A = πr² -> r = √(A / π)" },
        { id: "math-c3-dlp-5-4", label: "c² = a² + b² -> a = √(c² - b²)" },
      ],
    },
    {
      id: "math-c3-dlp-6",
      label: "Exam Tips",
      children: [
        { id: "math-c3-dlp-6-1", label: "Write each inverse operation step clearly" },
        { id: "math-c3-dlp-6-2", label: "Check the sign when moving terms" },
        { id: "math-c3-dlp-6-3", label: "Use brackets when substituting negative values/fractions" },
      ],
    },
  ],
};
