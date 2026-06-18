import type { StructuredNotes } from "@/data/types";

export const mathF1C3NotesDLP: StructuredNotes = {
  chapterSummary:
    "Chapter 3 explains squares, square roots, cubes and cube roots, and how to use them in estimation, combined operations and problem solving.",
  quickRevision: [
    "A square means multiplying a number by itself: a² = a x a.",
    "A square root is the inverse operation of squaring: if 6² = 36, then √36 = 6.",
    "A cube means multiplying a number by itself three times: a³ = a x a x a.",
    "A cube root is the inverse operation of cubing: if 2³ = 8, then ∛8 = 2.",
    "The cube of a negative number is always negative, for example (-5)³ = -125.",
    "In combined operations, solve brackets first, followed by powers and roots.",
  ],
  sections: [
    {
      title: "Learning Outcomes",
      subsections: [
        {
          content: "By the end of this chapter, students should be able to:",
          bulletPoints: [
            "Understand squares and perfect squares.",
            "Determine square roots of numbers, fractions and simple expressions.",
            "Understand cubes and perfect cubes.",
            "Determine cube roots, including cube roots of negative numbers.",
            "Estimate and solve combined operations.",
            "Solve problems involving the area of a square and volume of a cube.",
          ],
        },
      ],
    },
    {
      title: "1. Squares and Perfect Squares",
      subsections: [
        {
          title: "Meaning of Square",
          content: "The square of a number means multiplying the number by itself.",
          formula: "a² = a x a\nExample: 4² = 4 x 4 = 16",
        },
        {
          title: "Geometric Meaning",
          content:
            "A square is also related to the area of a square. If the side of a square is s, then its area is s².",
          formula: "Area of a square = s²",
        },
        {
          title: "Perfect Squares",
          content:
            "Perfect squares are numbers formed when whole numbers are multiplied by themselves.",
          table: {
            headers: ["Number", "Square", "Value"],
            rows: [
              ["1", "1²", "1"],
              ["2", "2²", "4"],
              ["3", "3²", "9"],
              ["4", "4²", "16"],
              ["5", "5²", "25"],
              ["6", "6²", "36"],
            ],
          },
        },
        {
          title: "Prime Factorisation Method",
          content:
            "Use prime factorisation to identify perfect squares. If the prime factors can be grouped into two identical groups, the number is a perfect square.",
        },
      ],
    },
    {
      title: "2. Square Roots",
      subsections: [
        {
          title: "Meaning of Square Root",
          content:
            "A square root is the inverse operation of squaring. If a number is squared to get a certain answer, the square root finds the original number.",
          formula: "If 6² = 36, then √36 = 6.",
        },
        {
          title: "Relationship With a Square",
          content: "The square root of the area of a square gives the side length of the square.",
          formula: "If area = 49 cm², then side = √49 = 7 cm.",
        },
        {
          title: "Square Root of Fractions",
          content:
            "For fractions, find the square root of the numerator and denominator if both are perfect squares.",
          formula: "√(49/81) = 7/9",
        },
        {
          title: "Mixed Numbers",
          content: "Convert mixed numbers to improper fractions first before finding square roots.",
        },
        {
          title: "Important Rules",
          formula: "√a x √a = a\n√a x √b = √ab",
        },
        {
          title: "Tip",
          content: "Memorise squares from 1² to 20² to support quick calculations.",
        },
      ],
    },
    {
      title: "3. Cubes and Perfect Cubes",
      subsections: [
        {
          title: "Meaning of Cube",
          content: "The cube of a number means multiplying the number by itself three times.",
          formula: "a³ = a x a x a\nExample: 2³ = 2 x 2 x 2 = 8",
        },
        {
          title: "Common Mistake",
          content: "2³ does not mean 2 x 3. 2³ means 2 x 2 x 2.",
        },
        {
          title: "Geometric Meaning",
          content:
            "A cube is related to the volume of a cube. If the edge length of a cube is s, then its volume is s³.",
          formula: "Volume of a cube = s³",
        },
        {
          title: "Perfect Cubes",
          content:
            "Perfect cubes are numbers formed when whole numbers are multiplied by themselves three times.",
          table: {
            headers: ["Number", "Cube", "Value"],
            rows: [
              ["1", "1³", "1"],
              ["2", "2³", "8"],
              ["3", "3³", "27"],
              ["4", "4³", "64"],
              ["5", "5³", "125"],
              ["10", "10³", "1000"],
            ],
          },
        },
        {
          title: "Signs of Cubes",
          bulletPoints: [
            "The cube of a positive number is positive.",
            "The cube of a negative number is always negative.",
            "Example: (-5)³ = -125.",
          ],
        },
        {
          title: "Prime Factorisation Method",
          content:
            "If the prime factors can be grouped into three identical groups, the number is a perfect cube.",
        },
      ],
    },
    {
      title: "4. Cube Roots",
      subsections: [
        {
          title: "Meaning of Cube Root",
          content:
            "A cube root is the inverse operation of cubing. If a number is cubed to get a certain answer, the cube root finds the original number.",
          formula: "If 2³ = 8, then ∛8 = 2.",
        },
        {
          title: "Cube Root of Negative Numbers",
          content: "The cube root of a negative number is negative.",
          formula: "∛(-8) = -2",
        },
        {
          title: "Relationship With a Cube",
          content: "The cube root of the volume of a cube gives the edge length of the cube.",
          formula: "If volume = 64 cm³, then edge = ∛64 = 4 cm.",
        },
      ],
    },
    {
      title: "5. Estimation and Combined Operations",
      subsections: [
        {
          title: "Estimating Square Roots",
          content:
            "Estimate square roots by finding the perfect squares before and after the number.",
          formula: "√54 is between √49 and √64.\nSo √54 is between 7 and 8.",
        },
        {
          title: "Estimating Cubes",
          content: "Estimate cubes using nearby whole numbers.",
          formula: "4.2³ is between 4³ and 5³.",
        },
        {
          title: "Order of Operations",
          bulletPoints: [
            "Solve brackets first.",
            "Then solve squares, square roots, cubes and cube roots.",
            "Next, multiply and divide from left to right.",
            "Finally, add and subtract from left to right.",
          ],
        },
      ],
    },
    {
      title: "6. Problem Solving",
      subsections: [
        {
          title: "Square Area Problems",
          content: "Use square root to find the side length of a square when the area is given.",
          formula: "If area = 81 cm², side = √81 = 9 cm.",
        },
        {
          title: "Cube Volume Problems",
          content: "Use cube root to find the edge length of a cube when the volume is given.",
          formula: "If volume = 125 cm³, edge = ∛125 = 5 cm.",
        },
        {
          title: "Problem-Solving Tip",
          bulletPoints: [
            "Identify whether the question involves area or volume.",
            "Area of a square uses square root.",
            "Volume of a cube uses cube root.",
          ],
        },
      ],
    },
  ],
  keyExamFacts: [
    "a² = a x a.",
    "a³ = a x a x a.",
    "√36 = 6 because 6² = 36.",
    "∛8 = 2 because 2³ = 8.",
    "∛(-8) = -2.",
    "√54 is between 7 and 8.",
  ],
  keyTerms: [
    "Squares",
    "Square Roots",
    "Perfect Squares",
    "Cubes",
    "Cube Roots",
    "Perfect Cubes",
    "Estimation",
    "Combined Operations",
  ],
};
