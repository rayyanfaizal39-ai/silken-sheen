import type { StructuredNotes } from "@/data/types";

export const mathF2C7NotesDLP: StructuredNotes = {
  chapterSummary:
    "Chapter 7 Coordinates helps students understand the Cartesian plane, calculate the distance between two points, find the midpoint between two points, and calculate the area of a polygon on the Cartesian plane using the coordinates of its vertices.",
  quickRevision: [
    "The distance between two points (x1,y1) and (x2,y2) is √((x2-x1)² + (y2-y1)²).",
    "The midpoint between two points (x1,y1) and (x2,y2) is ((x1+x2)/2, (y1+y2)/2).",
    "The area of a polygon is calculated using the determinant (shoelace) method by listing the vertices in a consistent direction, either clockwise or counter-clockwise.",
    "Always take the absolute (positive) value for area and divide by 2 at the final step.",
    "The order of subtracting coordinates (x2-x1 and y2-y1) must be consistent so the answer for distance and midpoint is correct.",
  ],
  sections: [
    {
      title: "Learning Outcomes",
      subsections: [
        {
          content: "By the end of this chapter, students should be able to:",
          bulletPoints: [
            "Calculate the distance between two points on a Cartesian plane.",
            "Determine the coordinates of the midpoint between two points on a Cartesian plane.",
            "Calculate the area of a polygon on a Cartesian plane using the coordinates of its vertices.",
            "Solve problems involving distance, midpoint and area in daily life contexts.",
          ],
        },
      ],
    },
    {
      title: "7.1 Distance Between Two Points on a Cartesian Plane",
      subsections: [
        {
          title: "Definition",
          content:
            "The distance between two points on a Cartesian plane is the length of the straight line connecting the two points. This distance is calculated using the Pythagoras Theorem, where the difference in x-coordinates and y-coordinates form the two perpendicular sides of a right-angled triangle.",
        },
        {
          title: "Formula",
          formula:
            "Distance between A(x1,y1) and B(x2,y2):\nAB = √((x2 - x1)² + (y2 - y1)²)",
        },
        {
          title: "Example 1",
          content:
            "Question: Find the distance between point A(2,3) and B(6,6).\nSolution:\nAB = √((6-2)² + (6-3)²)\n   = √((4)² + (3)²)\n   = √(16 + 9)\n   = √25\n   = 5 units\nAnswer: 5 units",
        },
        {
          title: "Example 2",
          content:
            "Question: Find the distance between point P(-1,2) and Q(3,-1).\nSolution:\nPQ = √((3-(-1))² + (-1-2)²)\n   = √((4)² + (-3)²)\n   = √(16 + 9)\n   = √25\n   = 5 units\nAnswer: 5 units",
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "Distance is always positive because it is a length, not a vector.",
            "You may calculate from A to B or B to A; the result is the same because each value is squared.",
            "Draw a right-angled triangle on the Cartesian plane to understand the concept more clearly.",
            "If two points have the same y-coordinate, the distance is just the absolute difference of the x-coordinates (horizontal line).",
            "If two points have the same x-coordinate, the distance is just the absolute difference of the y-coordinates (vertical line).",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Subtracting coordinates in an inconsistent order between x and y (e.g. x2-x1 but y1-y2).",
            "Forgetting to square negative values correctly, e.g. (-3)² must equal 9, not -9.",
            "Forgetting to take the square root in the final step.",
            "Wrongly adding values first before squaring, e.g. incorrectly writing (x2+y2-x1-y1)².",
          ],
        },
      ],
    },
    {
      title: "7.2 Midpoint Between Two Points on a Cartesian Plane",
      subsections: [
        {
          title: "Definition",
          content:
            "The midpoint between two points is the point that lies exactly in the middle of the straight line joining the two points, that is, at an equal distance from both points.",
        },
        {
          title: "Formula",
          formula:
            "Midpoint M between A(x1,y1) and B(x2,y2):\nM = ((x1 + x2)/2, (y1 + y2)/2)",
        },
        {
          title: "Example 1",
          content:
            "Question: Find the coordinates of the midpoint M between A(2,3) and B(6,7).\nSolution:\nM = ((2+6)/2, (3+7)/2)\n  = (8/2, 10/2)\n  = (4, 5)\nAnswer: M(4, 5)",
        },
        {
          title: "Example 2",
          content:
            "Question: The midpoint between P(-3,4) and Q(5,-2) is M. Find the coordinates of M.\nSolution:\nM = ((-3+5)/2, (4+(-2))/2)\n  = (2/2, 2/2)\n  = (1, 1)\nAnswer: M(1, 1)",
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "The midpoint is the average of the x-coordinates and the average of the y-coordinates, calculated separately.",
            "This formula can be rearranged to find the coordinates of one point if the midpoint and the other point are known.",
            "If given midpoint M(xm,ym) and point A(x1,y1), then the coordinates of B are (2xm - x1, 2ym - y1).",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Forgetting to divide by 2 after adding the coordinates.",
            "Mixing up x-coordinates with y-coordinates while adding, e.g. x1+y2.",
            "Making sign errors when one of the coordinates is negative.",
            "Confusing midpoint with distance; the two concepts and formulas are different.",
          ],
        },
      ],
    },
    {
      title: "7.3 Area of Polygons on a Cartesian Plane",
      subsections: [
        {
          title: "Definition",
          content:
            "The area of a polygon on a Cartesian plane can be calculated directly from the coordinates of its vertices, without drawing and counting grid squares manually. This method uses the sum of cross-products (determinant method) for each pair of adjacent vertices, listed in a consistent direction (clockwise or counter-clockwise), and the result is divided by 2.",
        },
        {
          title: "Formula",
          formula:
            "For a triangle with vertices A(x1,y1), B(x2,y2), C(x3,y3):\nArea = 1/2 |x1(y2-y3) + x2(y3-y1) + x3(y1-y2)|\n\nList/Matrix (Shoelace) Method for a general polygon with vertices (x1,y1),(x2,y2),...,(xn,yn):\nArea = 1/2 |(x1y2 - x2y1) + (x2y3 - x3y2) + ... + (xny1 - x1yn)|",
        },
        {
          title: "Example 1",
          content:
            "Question: Find the area of a triangle with vertices A(1,1), B(5,1) and C(3,4).\nSolution (shoelace/list method, counter-clockwise A→B→C→A):\nArea = 1/2 |(x1y2 - x2y1) + (x2y3 - x3y2) + (x3y1 - x1y3)|\n     = 1/2 |(1×1 - 5×1) + (5×4 - 3×1) + (3×1 - 1×4)|\n     = 1/2 |(1 - 5) + (20 - 3) + (3 - 4)|\n     = 1/2 |(-4) + (17) + (-1)|\n     = 1/2 |12|\n     = 6 square units\nAnswer: 6 square units",
        },
        {
          title: "Example 2",
          content:
            "Question: Find the area of a quadrilateral with vertices P(0,0), Q(4,0), R(4,3) and S(0,3).\nSolution (list method, order P→Q→R→S→P):\nArea = 1/2 |(x1y2-x2y1)+(x2y3-x3y2)+(x3y4-x4y3)+(x4y1-x1y4)|\n     = 1/2 |(0×0-4×0)+(4×3-4×0)+(4×3-0×3)+(0×0-0×3)|\n     = 1/2 |(0-0)+(12-0)+(12-0)+(0-0)|\n     = 1/2 |0+12+12+0|\n     = 1/2 |24|\n     = 12 square units\nAnswer: 12 square units (Check: PQRS is a 4 unit × 3 unit rectangle = 12 square units, confirming the answer is correct.)",
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "List the vertex coordinates in order (clockwise or counter-clockwise) around the polygon; do not switch direction randomly.",
            "Write the coordinates in a two-row arrangement (determinant method) to make the cross-multiplication easier.",
            "Always take the absolute value before dividing by 2 so the area is always positive.",
            "For polygons with more than 3 vertices, remember to connect the last vertex back to the first vertex in the calculation.",
            "You can check your answer by splitting the polygon into simpler triangles or rectangles.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Not listing the vertices in the correct order around the polygon (jumping around), causing an incorrect answer.",
            "Forgetting to take the absolute value, resulting in a negative area.",
            "Forgetting to divide by 2 in the final step.",
            "Mismatching the x and y coefficients during the cross-multiplication method.",
            "Forgetting to connect the last vertex back to the first vertex when calculating the sum of cross-products.",
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
            "Distance between two points uses the Pythagoras Theorem in the form √((x2-x1)² + (y2-y1)²).",
            "Midpoint is the average of the x-coordinates and the average of the y-coordinates.",
            "Polygon area is calculated using the list (shoelace) method based on vertex coordinates, with the absolute value taken and divided by 2.",
          ],
        },
        {
          title: "Important Formulas",
          formula:
            "Distance: AB = √((x2-x1)² + (y2-y1)²)\nMidpoint: M = ((x1+x2)/2, (y1+y2)/2)\nArea of Triangle: Area = 1/2 |x1(y2-y3) + x2(y3-y1) + x3(y1-y2)|",
        },
        {
          title: "Exam Tips",
          bulletPoints: [
            "Draw a simple sketch of the Cartesian plane to help visualize the position of the points before calculating.",
            "Double-check the positive/negative sign of each coordinate before substituting it into the formula.",
            "For area questions, make sure the vertices are listed in the correct order around the polygon.",
            "Always state the correct units in your answer: units for distance and coordinates, square units for area.",
          ],
        },
      ],
    },
  ],
  keyExamFacts: [
    "The distance between two points A(x1,y1) and B(x2,y2) is √((x2-x1)² + (y2-y1)²).",
    "The midpoint between two points is ((x1+x2)/2, (y1+y2)/2).",
    "Polygon area calculated using the list (shoelace) method must have the absolute value taken and be divided by 2.",
    "The order of vertex coordinates must be consistent (clockwise or counter-clockwise) when calculating polygon area.",
    "Distance is always positive; midpoint is a coordinate point, not a distance value.",
  ],
  keyTerms: [
    "Cartesian plane",
    "Coordinates",
    "Distance between two points",
    "Midpoint",
    "Polygon vertex",
    "List (shoelace) method",
    "Absolute value",
    "Pythagoras Theorem",
  ],
};
