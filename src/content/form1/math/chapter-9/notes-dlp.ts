import type { StructuredNotes } from "@/data/types";

export const mathF1C9NotesDLP: StructuredNotes = {
  chapterSummary:
    "Chapter 9 introduces basic polygons in two-dimensional geometry. Students will learn the properties of polygons, types of triangles and quadrilaterals, the diagonal formula, and the angle properties of triangles and quadrilaterals. The chapter also connects geometric concepts to real-world applications.",
  quickRevision: [
    "A polygon is a closed 2D shape bounded by three or more straight sides.",
    "Number of vertices = number of sides. Diagonal formula: n(n − 3) / 2.",
    "Equilateral triangle: 3 equal sides, all angles = 60°, 3 lines of symmetry.",
    "Isosceles triangle: 2 equal sides, 2 equal base angles, 1 line of symmetry.",
    "Scalene triangle: all sides and angles different, no line of symmetry.",
    "Sum of interior angles of a triangle = 180°.",
    "Exterior angle of a triangle = sum of the two non-adjacent interior angles.",
    "Sum of interior angles of a quadrilateral = 360°.",
    "Rectangle: 2 pairs of equal parallel sides, all angles 90°.",
    "Square: 4 equal sides, all angles 90°, diagonals perpendicular.",
    "Parallelogram: 2 pairs of parallel equal sides, opposite angles equal.",
    "Rhombus: 4 equal sides, diagonals perpendicular, 2 lines of symmetry.",
  ],
  sections: [
    {
      title: "Learning Outcomes",
      subsections: [
        {
          content: "By the end of this chapter, students should be able to:",
          bulletPoints: [
            "Identify and classify polygons based on their properties.",
            "Use the formula to calculate the number of diagonals of a polygon.",
            "Name polygons based on the number of sides.",
            "Identify and classify types of triangles by sides and angles.",
            "Use triangle angle properties to solve problems.",
            "Identify and compare properties of quadrilaterals.",
            "Use quadrilateral angle properties to solve problems.",
            "Connect polygon concepts to real-world applications.",
          ],
        },
      ],
    },
    {
      title: "1. Polygons",
      subsections: [
        {
          title: "Definition of a Polygon",
          content:
            "A polygon is a two-dimensional (2D) closed shape bounded by three or more straight sides. The word 'polygon' comes from Greek meaning 'many angles'.",
        },
        {
          title: "Key Features of a Polygon",
          content:
            "All sides of a polygon are straight lines. A polygon is a closed shape — there are no open ends. A polygon is a 2D (flat) shape.",
          bulletPoints: [
            "Sides: straight line segments forming the boundary of the polygon.",
            "Vertices: points where two sides meet.",
            "Interior angles: angles formed inside the polygon at each vertex.",
          ],
        },
        {
          title: "Regular vs Irregular Polygons",
          content:
            "A REGULAR polygon has all sides of equal length AND all interior angles equal. An IRREGULAR polygon has sides or angles that differ.",
          table: {
            headers: ["Type", "Sides", "Angles"],
            rows: [
              ["Regular", "All equal", "All equal"],
              ["Irregular", "May differ", "May differ"],
            ],
          },
        },
        {
          title: "Convex vs Concave Polygons",
          content:
            "A CONVEX polygon has all interior angles less than 180°. A CONCAVE polygon has at least one interior angle greater than 180° (a reflex angle).",
        },
      ],
    },
    {
      title: "2. Properties of Polygons",
      subsections: [
        {
          title: "Relationship Between Vertices, Sides and Angles",
          content:
            "In any polygon, the number of vertices = number of sides = number of interior angles. This property holds for all polygons regardless of the number of sides.",
          table: {
            headers: ["Polygon", "Vertices", "Sides", "Interior Angles"],
            rows: [
              ["Triangle", "3", "3", "3"],
              ["Quadrilateral", "4", "4", "4"],
              ["Pentagon", "5", "5", "5"],
              ["Hexagon", "6", "6", "6"],
              ["Octagon", "8", "8", "8"],
            ],
          },
        },
        {
          title: "Diagonals of a Polygon",
          content:
            "A diagonal is a line segment connecting two NON-ADJACENT vertices (not a side). Sides are not diagonals.",
          bulletPoints: [
            "Triangle (3 sides): no diagonals (all vertices are adjacent).",
            "Quadrilateral (4 sides): 2 diagonals.",
            "Pentagon (5 sides): 5 diagonals.",
            "Hexagon (6 sides): 9 diagonals.",
          ],
        },
      ],
    },
    {
      title: "3. Vertices, Sides and Diagonals",
      subsections: [
        {
          title: "Vertices",
          content:
            "A vertex (plural: vertices) is a corner point where two sides of a polygon meet. Vertices are usually labelled with capital letters such as A, B, C.",
        },
        {
          title: "Sides",
          content:
            "A side is each straight line segment forming the boundary of a polygon. Example: triangle ABC has sides AB, BC and CA.",
        },
        {
          title: "Diagonals",
          content:
            "A diagonal is a line segment connecting two NON-ADJACENT vertices. Diagonals lie INSIDE the polygon (for convex polygons).",
          formula: "Number of diagonals = n(n − 3) / 2",
        },
        {
          title: "Visual: Diagonals of a Quadrilateral",
          content:
            "Quadrilateral ABCD has vertices A, B, C and D. Its sides are AB, BC, CD and DA. Its diagonals are AC and BD (connecting non-adjacent vertices).",
        },
      ],
    },
    {
      title: "4. Diagonal Formula",
      subsections: [
        {
          title: "The Formula",
          content:
            "The number of diagonals for a polygon with n sides can be calculated using the following formula:",
          formula: "Number of diagonals = n(n − 3) / 2",
        },
        {
          title: "Example: Triangle (n = 3)",
          content:
            "A triangle has 3 sides. Substitute n = 3 into the formula:",
          formula: "Number of diagonals = 3(3 − 3) / 2 = 3(0) / 2 = 0",
        },
        {
          title: "Example: Quadrilateral (n = 4)",
          content:
            "A quadrilateral has 4 sides. Substitute n = 4 into the formula:",
          formula: "Number of diagonals = 4(4 − 3) / 2 = 4(1) / 2 = 2",
        },
        {
          title: "Example: Pentagon (n = 5)",
          content:
            "A pentagon has 5 sides. Substitute n = 5 into the formula:",
          formula: "Number of diagonals = 5(5 − 3) / 2 = 5(2) / 2 = 5",
        },
        {
          title: "Example: Hexagon (n = 6)",
          content:
            "A hexagon has 6 sides. Substitute n = 6 into the formula:",
          formula: "Number of diagonals = 6(6 − 3) / 2 = 6(3) / 2 = 9",
        },
        {
          title: "Summary Table",
          table: {
            headers: ["Polygon", "n (Sides)", "n(n − 3)/2", "Diagonals"],
            rows: [
              ["Triangle", "3", "3(0)/2", "0"],
              ["Quadrilateral", "4", "4(1)/2", "2"],
              ["Pentagon", "5", "5(2)/2", "5"],
              ["Hexagon", "6", "6(3)/2", "9"],
              ["Heptagon", "7", "7(4)/2", "14"],
              ["Octagon", "8", "8(5)/2", "20"],
            ],
          },
        },
      ],
    },
    {
      title: "5. Naming Polygons",
      subsections: [
        {
          title: "Polygon Names",
          content:
            "Polygons are named based on the number of sides. These names are important to know in geometry.",
          table: {
            headers: ["Number of Sides", "Polygon Name", "Example"],
            rows: [
              ["3", "Triangle", "▲"],
              ["4", "Quadrilateral", "▭"],
              ["5", "Pentagon", "⬠"],
              ["6", "Hexagon", "⬡"],
              ["7", "Heptagon", "7 sides"],
              ["8", "Octagon", "8 sides"],
              ["9", "Nonagon", "9 sides"],
              ["10", "Decagon", "10 sides"],
            ],
          },
        },
        {
          title: "Memory Aid for Polygon Names",
          content:
            "Use Latin/Greek root words: tri = 3, quad = 4, penta = 5, hexa = 6, hepta = 7, octa = 8, nona = 9, deca = 10.",
        },
      ],
    },
    {
      title: "6. Drawing and Labelling Polygons",
      subsections: [
        {
          title: "Labelling Polygons",
          content:
            "Polygons are labelled with capital letters starting from A, in order going clockwise or anticlockwise. The name of the polygon uses these vertex letters.",
          bulletPoints: [
            "Triangle: ABC (3 vertices: A, B, C)",
            "Quadrilateral: ABCD (4 vertices: A, B, C, D)",
            "Pentagon: ABCDE (5 vertices: A, B, C, D, E)",
            "Hexagon: ABCDEF (6 vertices: A, B, C, D, E, F)",
          ],
        },
        {
          title: "How to Draw Polygons",
          content:
            "To draw a regular polygon, use a ruler and compass. For irregular polygons, draw straight sides forming a closed shape. Make sure the polygon is closed — the last point must connect back to the starting point.",
        },
        {
          title: "Drawing Tips",
          content:
            "Mark the vertices first with dots, then connect them with straight lines. Label vertices using capital letters in order.",
        },
      ],
    },
    {
      title: "7. Properties of Triangles",
      subsections: [
        {
          title: "Introduction to Triangles",
          content:
            "A triangle is a polygon with 3 sides, 3 vertices and 3 angles. Triangles can be classified by SIDES or by ANGLES.",
          table: {
            headers: ["Classification", "Types"],
            rows: [
              ["By Sides", "Equilateral, Isosceles, Scalene"],
              ["By Angles", "Acute-angled, Obtuse-angled, Right-angled"],
            ],
          },
        },
        {
          title: "Summary of Triangle Properties",
          table: {
            headers: ["Type", "Sides", "Angles", "Symmetry"],
            rows: [
              ["Equilateral", "3 equal", "All 60°", "3 lines"],
              ["Isosceles", "2 equal", "2 base angles equal", "1 line"],
              ["Scalene", "All different", "All different", "None"],
              ["Acute-angled", "Varies", "All < 90°", "—"],
              ["Obtuse-angled", "Varies", "One > 90°", "—"],
              ["Right-angled", "Varies", "One = 90°", "—"],
            ],
          },
        },
      ],
    },
    {
      title: "8. Equilateral Triangles",
      subsections: [
        {
          title: "Properties",
          content:
            "An equilateral triangle has all three sides equal in length and all three angles equal in size.",
          bulletPoints: [
            "All 3 sides equal: AB = BC = CA.",
            "All 3 angles equal: ∠A = ∠B = ∠C = 60°.",
            "Has 3 lines of symmetry.",
            "Is also an acute-angled triangle.",
          ],
        },
        {
          title: "Angle Formula",
          formula: "Each angle = 180° ÷ 3 = 60°",
        },
        {
          title: "Visual: Equilateral Triangle",
          content:
            "Imagine a triangle with a tick mark on every side — showing all sides are equal. Each corner has a 60° angle.",
        },
        {
          title: "Real-Life Examples",
          content:
            "Yield signs on roads, pizza slices and warning signs are shaped like equilateral triangles.",
        },
      ],
    },
    {
      title: "9. Isosceles Triangles",
      subsections: [
        {
          title: "Properties",
          content:
            "An isosceles triangle has exactly TWO sides equal in length. The equal sides are called 'legs', while the different side is called the 'base'.",
          bulletPoints: [
            "Two equal sides (legs): AB = AC.",
            "Two equal base angles: ∠B = ∠C.",
            "Has 1 line of symmetry (through the apex and midpoint of the base).",
          ],
        },
        {
          title: "Angle Property",
          formula: "∠B = ∠C (base angles equal), ∠A + ∠B + ∠C = 180°",
        },
        {
          title: "Example",
          content:
            "Isosceles triangle with ∠B = ∠C = 50°. Find ∠A.",
          formula: "∠A = 180° − 50° − 50° = 80°",
        },
        {
          title: "Visual: Isosceles Triangle",
          content:
            "Imagine a triangle with tick marks on TWO equal sides, and matching arcs on the TWO equal base angles.",
        },
      ],
    },
    {
      title: "10. Scalene Triangles",
      subsections: [
        {
          title: "Properties",
          content:
            "A scalene triangle has all three sides of different lengths and all three angles of different sizes.",
          bulletPoints: [
            "All three sides different: AB ≠ BC ≠ CA.",
            "All three angles different: ∠A ≠ ∠B ≠ ∠C.",
            "No lines of symmetry.",
          ],
        },
        {
          title: "Important Note",
          content:
            "Even though all sides and angles are different, the sum of the three angles is still 180°.",
          formula: "∠A + ∠B + ∠C = 180° (always, for any triangle)",
        },
      ],
    },
    {
      title: "11. Acute-Angled Triangles",
      subsections: [
        {
          title: "Properties",
          content:
            "An acute-angled triangle is one where ALL THREE angles are acute (less than 90°).",
          formula: "All 3 angles < 90°, and sum = 180°",
        },
        {
          title: "Example",
          content:
            "A triangle with angles 60°, 70° and 50° is acute-angled. (60° + 70° + 50° = 180°, all < 90°).",
        },
        {
          title: "Note",
          content:
            "An equilateral triangle (all 60°) is an example of an acute-angled triangle.",
        },
      ],
    },
    {
      title: "12. Obtuse-Angled Triangles",
      subsections: [
        {
          title: "Properties",
          content:
            "An obtuse-angled triangle is one that has ONE obtuse angle (greater than 90°). The other two angles must both be acute.",
          formula: "One angle > 90°, two other angles < 90°, sum = 180°",
        },
        {
          title: "Example",
          content:
            "A triangle with angles 120°, 35° and 25° is obtuse-angled. (120° > 90°, 35° + 25° + 120° = 180°).",
        },
        {
          title: "Common Mistake",
          content:
            "⚠️ A triangle CANNOT have TWO obtuse angles, because two obtuse angles alone already exceed 180°.",
        },
      ],
    },
    {
      title: "13. Right-Angled Triangles",
      subsections: [
        {
          title: "Properties",
          content:
            "A right-angled triangle has exactly ONE right angle (90°). The longest side, opposite the right angle, is called the hypotenuse.",
          bulletPoints: [
            "One angle = 90° (right angle).",
            "The other two angles sum to 90°.",
            "The longest side is the hypotenuse.",
            "Related to Pythagoras' Theorem (to be studied later).",
          ],
        },
        {
          title: "Angle Property",
          formula: "90° + angle 2 + angle 3 = 180° → angle 2 + angle 3 = 90°",
        },
        {
          title: "Example",
          content:
            "A right-angled triangle with angles 90°, 35° and 55°. (90° + 35° + 55° = 180° ✓).",
        },
      ],
    },
    {
      title: "14. Triangle Angle Properties",
      subsections: [
        {
          title: "Law 1: Sum of Interior Angles",
          content:
            "The sum of all three interior angles of any triangle is always 180°.",
          formula: "∠A + ∠B + ∠C = 180°",
        },
        {
          title: "Example 1",
          content:
            "Triangle ABC with ∠A = 50° and ∠B = 70°. Find ∠C.",
          formula: "∠C = 180° − 50° − 70° = 60°",
        },
        {
          title: "Law 2: Interior + Adjacent Exterior = 180°",
          content:
            "Each interior angle of a triangle and its adjacent exterior angle sum to 180° (since they are on a straight line).",
          formula: "interior angle + adjacent exterior angle = 180°",
        },
        {
          title: "Law 3: Exterior Angle of a Triangle",
          content:
            "An exterior angle of a triangle EQUALS the sum of the TWO non-adjacent interior angles.",
          formula: "exterior angle = interior angle 1 + interior angle 2 (the non-adjacent ones)",
        },
        {
          title: "Example 2: Exterior Angle",
          content:
            "Triangle ABC with ∠A = 45° and ∠B = 65°. Find the exterior angle at C.",
          formula: "Exterior angle at C = ∠A + ∠B = 45° + 65° = 110°",
        },
        {
          title: "Example 3: Using the Exterior Angle",
          content:
            "An exterior angle of a triangle = 130°. One non-adjacent interior angle = 70°. Find the other non-adjacent interior angle.",
          formula: "130° = 70° + x → x = 130° − 70° = 60°",
        },
        {
          title: "Common Mistake",
          content:
            "⚠️ The exterior angle of a triangle is NOT a reflex angle. The exterior angle is the angle formed OUTSIDE the triangle when one side is extended.",
        },
      ],
    },
    {
      title: "15. Properties of Quadrilaterals",
      subsections: [
        {
          title: "Introduction to Quadrilaterals",
          content:
            "A quadrilateral is a polygon with 4 sides, 4 vertices and 4 angles. There are many types of quadrilaterals with different properties.",
        },
        {
          title: "Types of Quadrilaterals",
          table: {
            headers: ["Type", "Key Feature"],
            rows: [
              ["Rectangle", "4 right angles, opposite sides equal and parallel"],
              ["Square", "4 equal sides, 4 right angles"],
              ["Parallelogram", "Opposite sides parallel and equal, opposite angles equal"],
              ["Rhombus", "4 equal sides, diagonals perpendicular"],
              ["Trapezium", "One pair of parallel sides"],
              ["Kite", "2 pairs of adjacent equal sides"],
            ],
          },
        },
        {
          title: "Hierarchy of Quadrilaterals",
          content:
            "A square is a type of rectangle THAT IS ALSO a type of rhombus and parallelogram. Rectangles and rhombuses are special types of parallelograms.",
        },
      ],
    },
    {
      title: "16. Rectangles",
      subsections: [
        {
          title: "Properties",
          content:
            "A rectangle is a quadrilateral with four right angles (90°). All rectangles are also parallelograms.",
          bulletPoints: [
            "Opposite sides are equal in length: AB = CD, BC = AD.",
            "Opposite sides are parallel: AB ∥ CD, BC ∥ AD.",
            "All 4 angles are 90°.",
            "Diagonals are equal in length: AC = BD.",
            "Diagonals bisect each other (cross at the midpoint).",
          ],
        },
        {
          title: "Lines of Symmetry",
          formula: "Number of lines of symmetry = 2",
        },
        {
          title: "Visual: Rectangle",
          content:
            "Rectangle ABCD with length = l and width = w. Its sides: AB = CD = l, BC = AD = w. Diagonals AC and BD cross at midpoint O, and AC = BD.",
        },
        {
          title: "Real-Life Examples",
          content:
            "Doors, windows, television screens, books and blackboards are examples of rectangles in real life.",
        },
      ],
    },
    {
      title: "17. Squares",
      subsections: [
        {
          title: "Properties",
          content:
            "A square is a quadrilateral with all four sides equal in length and all four right angles (90°).",
          bulletPoints: [
            "All 4 sides equal: AB = BC = CD = DA.",
            "Opposite sides are parallel.",
            "All 4 angles are 90°.",
            "Diagonals are equal in length: AC = BD.",
            "Diagonals bisect each other.",
            "Diagonals are perpendicular (90°) to each other.",
            "Diagonals bisect the corner angles.",
          ],
        },
        {
          title: "Lines of Symmetry",
          formula: "Number of lines of symmetry = 4",
        },
        {
          title: "Difference: Square vs Rectangle",
          table: {
            headers: ["Feature", "Square", "Rectangle"],
            rows: [
              ["All sides equal", "Yes ✓", "No (only opposite sides)"],
              ["All angles 90°", "Yes ✓", "Yes ✓"],
              ["Perpendicular diagonals", "Yes ✓", "Not necessarily"],
              ["Lines of symmetry", "4", "2"],
            ],
          },
        },
        {
          title: "Real-Life Examples",
          content:
            "Floor tiles, chess boards and evenly cut bread slices are examples of squares.",
        },
      ],
    },
    {
      title: "18. Parallelograms",
      subsections: [
        {
          title: "Properties",
          content:
            "A parallelogram is a quadrilateral with two pairs of opposite sides that are parallel and equal in length.",
          bulletPoints: [
            "Opposite sides equal: AB = CD, BC = AD.",
            "Opposite sides parallel: AB ∥ CD, BC ∥ AD.",
            "Opposite angles equal: ∠A = ∠C, ∠B = ∠D.",
            "Adjacent angles sum to 180°: ∠A + ∠B = 180°.",
            "Diagonals bisect each other.",
          ],
        },
        {
          title: "Lines of Symmetry",
          formula: "Number of lines of symmetry = 0",
        },
        {
          title: "Note",
          content:
            "Rectangles and squares are special types of parallelogram. A parallelogram does not necessarily have right angles.",
        },
        {
          title: "Real-Life Examples",
          content:
            "Cross-sections of elongated shapes and parallelogram patterns on building surfaces.",
        },
      ],
    },
    {
      title: "19. Rhombuses",
      subsections: [
        {
          title: "Properties",
          content:
            "A rhombus is a quadrilateral with all four sides equal in length. It is like a parallelogram with all sides equal.",
          bulletPoints: [
            "All 4 sides equal: AB = BC = CD = DA.",
            "Opposite sides parallel.",
            "Opposite angles equal.",
            "Diagonals perpendicular (intersect at 90°).",
            "Diagonals bisect each other.",
            "Diagonals bisect the corner angles.",
          ],
        },
        {
          title: "Lines of Symmetry",
          formula: "Number of lines of symmetry = 2",
        },
        {
          title: "Difference: Rhombus vs Square",
          content:
            "A rhombus has all sides equal but angles do NOT need to be 90°. A square is a rhombus WITH 90° angles.",
          table: {
            headers: ["Feature", "Rhombus", "Square"],
            rows: [
              ["All sides equal", "Yes ✓", "Yes ✓"],
              ["Angles 90°", "Not necessarily", "Yes ✓"],
              ["Perpendicular diagonals", "Yes ✓", "Yes ✓"],
              ["Lines of symmetry", "2", "4"],
            ],
          },
        },
        {
          title: "Real-Life Examples",
          content:
            "Diamond cuts, diamond-shaped wall decorations and some kite shapes are rhombuses.",
        },
      ],
    },
    {
      title: "20. Trapeziums",
      subsections: [
        {
          title: "Properties",
          content:
            "A trapezium is a quadrilateral with exactly ONE pair of parallel sides. The parallel sides are called the top base and the bottom base.",
          bulletPoints: [
            "One pair of parallel sides (top and bottom base).",
            "The other pair of sides is not necessarily parallel.",
            "Adjacent angles between the parallel sides sum to 180°.",
          ],
        },
        {
          title: "Lines of Symmetry",
          formula: "Lines of symmetry = 0 (general trapezium), 1 (isosceles trapezium)",
        },
        {
          title: "Types of Trapezium",
          content:
            "Isosceles trapezium: the two legs (non-parallel sides) are equal in length, has 1 line of symmetry.",
        },
        {
          title: "Visual: Trapezium",
          content:
            "Trapezium ABCD with AB ∥ CD. AB is the top base, CD is the bottom base. Angles ∠A + ∠D = 180° and ∠B + ∠C = 180°.",
        },
        {
          title: "Real-Life Examples",
          content:
            "Stage platforms, tunnel cross-sections and the profile view of a mountain are trapezium shapes.",
        },
      ],
    },
    {
      title: "21. Kites",
      subsections: [
        {
          title: "Properties",
          content:
            "A kite is a quadrilateral with TWO pairs of adjacent sides of equal length. The equal sides are neighbouring sides, not opposite sides.",
          bulletPoints: [
            "Two pairs of adjacent equal sides: AB = AD and CB = CD.",
            "One pair of opposite angles equal: ∠B = ∠D.",
            "One diagonal bisects the other diagonal.",
            "Diagonals perpendicular (intersect at 90°).",
          ],
        },
        {
          title: "Lines of Symmetry",
          formula: "Number of lines of symmetry = 1",
        },
        {
          title: "Visual: Kite",
          content:
            "Kite ABCD with AB = AD (top sides) and CB = CD (bottom sides). Diagonal AC is the axis of symmetry. AC and BD are perpendicular.",
        },
        {
          title: "Real-Life Examples",
          content:
            "Flying kites (wau), diamond-shaped decorations and some shield shapes are kite-shaped.",
        },
      ],
    },
    {
      title: "22. Quadrilateral Angle Properties",
      subsections: [
        {
          title: "Law 1: Sum of Interior Angles",
          content:
            "The sum of all four interior angles of any quadrilateral is always 360°.",
          formula: "∠A + ∠B + ∠C + ∠D = 360°",
        },
        {
          title: "Visual Proof",
          content:
            "A quadrilateral can be divided into TWO triangles using a diagonal. Each triangle has an angle sum of 180°. So the angle sum of a quadrilateral = 2 × 180° = 360°.",
          formula: "2 triangles × 180° = 360°",
        },
        {
          title: "Example 1",
          content:
            "Quadrilateral ABCD with ∠A = 85°, ∠B = 95°, ∠C = 70°. Find ∠D.",
          formula: "∠D = 360° − 85° − 95° − 70° = 110°",
        },
        {
          title: "Angles in a Parallelogram",
          content:
            "In a parallelogram: opposite angles are equal, and adjacent angles sum to 180°.",
          formula: "∠A = ∠C, ∠B = ∠D, ∠A + ∠B = 180°",
        },
        {
          title: "Example 2: Parallelogram",
          content:
            "Parallelogram ABCD with ∠A = 70°. Find all other angles.",
          formula: "∠C = 70° (opposite), ∠B = 180° − 70° = 110°, ∠D = 110°",
        },
        {
          title: "Interior + Adjacent Exterior = 180°",
          content:
            "Like triangles, an interior angle and its adjacent exterior angle at any vertex of a quadrilateral sum to 180°.",
          formula: "interior angle + adjacent exterior angle = 180°",
        },
      ],
    },
    {
      title: "23. Real-World Applications",
      subsections: [
        {
          title: "Polygons in Construction and Architecture",
          content:
            "Polygons are widely used in building design, engineering and architecture. Understanding polygon properties helps architects and engineers design strong and beautiful structures.",
        },
        {
          title: "Example: Putra Mosque, Putrajaya",
          content:
            "The Putra Mosque in Putrajaya incorporates various polygons in its design — octagonal arches, square pillars and dome sections using polygon patterns. The mosque's minaret uses an octagonal (8-sided) form that provides structural strength and aesthetic beauty.",
        },
        {
          title: "Triangles in Engineering",
          content:
            "Triangles are used in bridge construction and roof trusses because they are the most rigid shape. A triangle does not change shape when force is applied, making it ideal for structures requiring strength.",
        },
        {
          title: "Quadrilaterals in Daily Life",
          content:
            "Rectangle: doors, windows, screens. Square: floor tiles, bread slices. Parallelogram: mosaic designs. Trapezium: stages, suspension bridges.",
        },
        {
          title: "Hexagons in Nature",
          content:
            "Bees use regular hexagons to build honeycombs. The hexagonal shape maximises storage space while using the least amount of wax. This is an example of mathematics in nature.",
        },
        {
          title: "Octagons in Road Safety",
          content:
            "Red 'STOP' signs are regular octagons used worldwide. The unique shape helps drivers quickly identify the sign.",
        },
      ],
    },
    {
      title: "24. Chapter Summary",
      subsections: [
        {
          title: "Polygon Names and Properties",
          table: {
            headers: ["Polygon", "Sides", "Diagonals", "Symmetry Lines (Regular)"],
            rows: [
              ["Triangle", "3", "0", "3 (equilateral)"],
              ["Quadrilateral", "4", "2", "4 (square)"],
              ["Pentagon", "5", "5", "5 (regular)"],
              ["Hexagon", "6", "9", "6 (regular)"],
              ["Octagon", "8", "20", "8 (regular)"],
            ],
          },
        },
        {
          title: "Types of Triangles",
          table: {
            headers: ["Type", "Sides", "Angles", "Symmetry"],
            rows: [
              ["Equilateral", "3 equal", "All 60°", "3"],
              ["Isosceles", "2 equal", "2 base angles equal", "1"],
              ["Scalene", "All ≠", "All ≠", "0"],
              ["Acute-angled", "—", "All < 90°", "—"],
              ["Obtuse-angled", "—", "One > 90°", "—"],
              ["Right-angled", "—", "One = 90°", "—"],
            ],
          },
        },
        {
          title: "Quadrilateral Properties",
          table: {
            headers: ["Type", "Equal Sides", "Parallel", "90° Angles", "Diag ⊥", "Symmetry"],
            rows: [
              ["Rectangle", "Opposite", "2 pairs", "Yes", "No", "2"],
              ["Square", "All", "2 pairs", "Yes", "Yes", "4"],
              ["Parallelogram", "Opposite", "2 pairs", "No", "No", "0"],
              ["Rhombus", "All", "2 pairs", "No", "Yes", "2"],
              ["Trapezium", "—", "1 pair", "No", "No", "0"],
              ["Kite", "2 adj. pairs", "No", "No", "Yes", "1"],
            ],
          },
        },
        {
          title: "Key Formulas",
          table: {
            headers: ["Formula", "Value"],
            rows: [
              ["Diagonals", "n(n − 3) / 2"],
              ["Triangle interior angles", "180°"],
              ["Quadrilateral interior angles", "360°"],
              ["Triangle exterior angle", "= sum of 2 non-adjacent interior angles"],
            ],
          },
        },
      ],
    },
  ],
  keyExamFacts: [
    "A polygon is a closed 2D shape with 3 or more straight sides. Number of vertices = number of sides.",
    "Diagonal formula: n(n − 3) / 2. Triangle = 0, quadrilateral = 2, pentagon = 5.",
    "Equilateral triangle: all sides equal, all angles 60°, 3 lines of symmetry.",
    "Isosceles triangle: 2 equal sides, 2 equal base angles, 1 line of symmetry.",
    "Sum of interior angles of a triangle = 180°. Exterior angle = sum of 2 non-adjacent interior angles.",
    "Sum of interior angles of a quadrilateral = 360°.",
    "Square: all sides equal, all angles 90°, perpendicular diagonals, 4 lines of symmetry.",
    "Parallelogram: opposite sides parallel and equal, opposite angles equal, no lines of symmetry.",
    "Rhombus: all sides equal, perpendicular diagonals, 2 lines of symmetry.",
    "Trapezium: ONE pair of parallel sides. Kite: TWO pairs of ADJACENT equal sides, 1 line of symmetry.",
  ],
  keyTerms: [
    "Polygon — Closed 2D shape with 3+ straight sides",
    "Vertex — Corner point where two sides meet",
    "Diagonal — Line connecting two non-adjacent vertices",
    "Equilateral Triangle — 3 equal sides, all angles 60°",
    "Isosceles Triangle — 2 equal sides, 2 equal base angles",
    "Scalene Triangle — All sides and angles different",
    "Right-Angled Triangle — One angle = 90°, has hypotenuse",
    "Hypotenuse — Longest side of a right-angled triangle",
    "Quadrilateral — Polygon with 4 sides",
    "Rectangle — 4 right angles, opposite sides equal",
    "Square — 4 equal sides, 4 right angles, perpendicular diagonals",
    "Parallelogram — 2 pairs of parallel sides, opposite angles equal",
    "Rhombus — 4 equal sides, perpendicular diagonals",
    "Trapezium — One pair of parallel sides",
    "Kite — 2 pairs of adjacent equal sides, perpendicular diagonals",
    "Line of Symmetry — Line dividing a shape into two mirror halves",
  ],
};
