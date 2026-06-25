import type { StructuredNotes } from "@/data/types";

export const mathF2C4NotesDLP: StructuredNotes = {
  chapterSummary:
    "Chapter 4 Polygons covers the properties of regular polygons, the sum of interior angles and exterior angles of polygons, and how to calculate interior and exterior angles of regular and irregular polygons.",
  quickRevision: [
    "A regular polygon has all sides of equal length and all angles of equal size.",
    "Sum of interior angles of a polygon = (n - 2) x 180°, where n is the number of sides.",
    "Sum of exterior angles of a convex polygon = 360°, regardless of the number of sides.",
    "An interior angle and its adjacent exterior angle are supplementary (add up to 180°).",
    "Each interior angle of a regular polygon = (n - 2) x 180° ÷ n.",
    "Each exterior angle of a regular polygon = 360° ÷ n.",
  ],
  sections: [
    {
      title: "Learning Outcomes",
      subsections: [
        {
          content: "By the end of this chapter, students should be able to:",
          bulletPoints: [
            "Identify and describe the properties of regular polygons.",
            "Make generalisations about the sum of interior angles of polygons.",
            "Make generalisations about the sum of exterior angles of convex polygons.",
            "Determine the interior and exterior angles of regular polygons.",
            "Solve problems involving polygons.",
          ],
        },
      ],
    },
    {
      title: "4.1 Regular Polygons",
      subsections: [
        {
          title: "Definition",
          content:
            "A polygon is a closed geometric shape formed by three or more straight line sides. A regular polygon is a polygon in which all sides are of equal length and all interior angles are of equal size. A polygon that does not satisfy both conditions is called an irregular polygon.",
        },
        {
          title: "Names of Polygons by Number of Sides",
          table: {
            headers: ["Number of Sides (n)", "Name of Polygon"],
            rows: [
              ["3", "Triangle"],
              ["4", "Quadrilateral"],
              ["5", "Pentagon"],
              ["6", "Hexagon"],
              ["7", "Heptagon"],
              ["8", "Octagon"],
              ["9", "Nonagon"],
              ["10", "Decagon"],
            ],
          },
        },
        {
          title: "Example 1",
          content:
            "Question: State whether an equilateral triangle and a rectangle are regular polygons.\nSolution: An equilateral triangle has three equal sides and three equal angles (60° each), so it is a regular polygon. A rectangle has all angles equal (90°) but its sides are not necessarily equal, so it is NOT a regular polygon (unless it is a square).\nAnswer: An equilateral triangle is a regular polygon; a general rectangle is not a regular polygon.",
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "A regular polygon must satisfy BOTH conditions at the same time: equal side lengths AND equal angles.",
            "A square is the regular polygon for a quadrilateral.",
            "A rhombus is not a regular polygon because its angles are not all equal.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Assuming all rectangles are regular polygons because their angles are equal — the sides must also be equal.",
            "Confusing a regular polygon with a convex polygon; these are different concepts.",
          ],
        },
      ],
    },
    {
      title: "4.2 Interior Angles and Exterior Angles of Polygons",
      subsections: [
        {
          title: "Definition",
          content:
            "An interior angle is the angle formed inside a polygon between two adjacent sides. An exterior angle is the angle formed between one side of a polygon and the extension of its adjacent side outside the polygon. The interior angle and exterior angle at the same vertex are supplementary angles (they add up to 180°).",
        },
        {
          title: "Formula",
          formula:
            "Sum of interior angles of a polygon = (n - 2) x 180°\nEach interior angle of a regular polygon = [(n - 2) x 180°] ÷ n\nSum of exterior angles of a convex polygon = 360°\nEach exterior angle of a regular polygon = 360° ÷ n\nInterior angle + adjacent exterior angle = 180°",
        },
        {
          title: "Example 1",
          content:
            "Question: Calculate the sum of interior angles of a hexagon (a polygon with 6 sides).\nSolution: Sum of interior angles = (n - 2) x 180° = (6 - 2) x 180° = 4 x 180°\nAnswer: 720°",
        },
        {
          title: "Example 2",
          content:
            "Question: A regular polygon has 9 sides (a regular nonagon). Calculate (a) each interior angle, and (b) each exterior angle.\nSolution:\n(a) Interior angle = [(n - 2) x 180°] ÷ n = [(9 - 2) x 180°] ÷ 9 = (7 x 180°) ÷ 9 = 1260° ÷ 9 = 140°\n(b) Exterior angle = 360° ÷ n = 360° ÷ 9 = 40°\nCheck: 140° + 40° = 180° (supplementary, correct).\nAnswer: (a) 140° (b) 40°",
        },
        {
          title: "Example 3",
          content:
            "Question: The exterior angle of a regular polygon is 24°. Find the number of sides of the polygon.\nSolution: Exterior angle = 360° ÷ n, so n = 360° ÷ exterior angle = 360° ÷ 24°\nAnswer: n = 15 sides (the polygon is a regular pentadecagon)",
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "The sum of exterior angles of a convex polygon is ALWAYS 360°, regardless of the type or number of sides.",
            "In a regular polygon, all interior angles are equal and all exterior angles are equal.",
            "Use the exterior angle to find the number of sides quickly: n = 360° ÷ exterior angle.",
            "The interior angle of a regular polygon increases as the number of sides increases.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Forgetting to subtract 2 in the formula (n - 2) x 180° when calculating the sum of interior angles.",
            "Confusing the interior angle formula with the exterior angle formula — the exterior angle is NOT divided using (n - 2).",
            "Forgetting that the sum of exterior angles is always 360° no matter how many sides the polygon has.",
            "Mistaking the total sum of interior angles for the angle at a SINGLE vertex, without dividing by n for a regular polygon.",
          ],
        },
      ],
    },
    {
      title: "Chapter Summary",
      subsections: [
        {
          title: "Must Know",
          bulletPoints: [
            "Regular polygon: all sides equal in length and all angles equal in size.",
            "Sum of interior angles = (n - 2) x 180°.",
            "Sum of exterior angles of a convex polygon = 360°.",
            "An interior angle and its adjacent exterior angle are supplementary (sum to 180°).",
          ],
        },
        {
          title: "Important Formulas",
          formula:
            "Sum of interior angles = (n - 2) x 180°\nInterior angle of a regular polygon = [(n - 2) x 180°] ÷ n\nSum of exterior angles = 360°\nExterior angle of a regular polygon = 360° ÷ n",
        },
        {
          title: "Exam Tips",
          bulletPoints: [
            "If given the number of sides, calculate the interior/exterior angle directly using the formula.",
            "If given one angle, use the formula in reverse to find n (number of sides).",
            "Always check your answer: an interior angle plus its adjacent exterior angle must equal 180°.",
            "Draw a simple diagram of the polygon to avoid confusing interior and exterior angles.",
          ],
        },
      ],
    },
  ],
  keyExamFacts: [
    "A regular polygon has all sides of equal length AND all angles of equal size.",
    "Sum of interior angles of a polygon = (n - 2) x 180°.",
    "Sum of exterior angles of a convex polygon = 360°, regardless of the number of sides.",
    "Each interior angle of a regular polygon = [(n - 2) x 180°] ÷ n.",
    "Each exterior angle of a regular polygon = 360° ÷ n.",
    "Interior angle + adjacent exterior angle = 180°.",
    "Number of sides of a regular polygon = 360° ÷ exterior angle.",
  ],
  keyTerms: [
    "Polygon",
    "Regular polygon",
    "Irregular polygon",
    "Interior angle",
    "Exterior angle",
    "Supplementary angles",
    "Vertex",
    "Hexagon",
    "Nonagon",
  ],
};
