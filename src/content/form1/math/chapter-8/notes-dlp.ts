import type { StructuredNotes } from "@/data/types";

export const mathF1C8NotesDLP: StructuredNotes = {
  chapterSummary:
    "Chapter 8 introduces the concepts of lines and angles in geometry. Students will learn the types of angles, properties of angles on a straight line and complete turn, complementary, supplementary and conjugate angles, as well as angle relationships at intersecting and parallel lines. The chapter also covers angles of elevation and depression in real-life contexts.",
  quickRevision: [
    "An angle is the measure of rotation between two line segments meeting at a point (vertex).",
    "Types of angles: acute (0°–90°), right (90°), obtuse (90°–180°), reflex (180°–360°).",
    "Angles on a straight line sum to 180°. Angles in a complete turn sum to 360°.",
    "Complementary angles sum to 90°. Supplementary angles sum to 180°. Conjugate angles sum to 360°.",
    "Vertically opposite angles are equal when two lines intersect.",
    "Adjacent angles on a straight line sum to 180°.",
    "Perpendicular lines form 90° angles. Parallel lines never meet even when extended.",
    "Corresponding angles (parallel lines with transversal) are equal.",
    "Alternate angles (parallel lines with transversal) are equal.",
    "Interior angles (parallel lines with transversal) sum to 180°.",
    "Angle of elevation is measured upward from horizontal. Angle of depression is measured downward.",
  ],
  sections: [
    {
      title: "Learning Outcomes",
      subsections: [
        {
          content: "By the end of this chapter, students should be able to:",
          bulletPoints: [
            "Identify and draw various types of angles.",
            "Measure angles accurately using a protractor.",
            "Determine complementary, supplementary and conjugate angles.",
            "Apply properties of angles on a straight line and complete turn.",
            "Identify vertically opposite angles, adjacent angles and properties of perpendicular lines.",
            "Identify parallel lines and transversals.",
            "Use the properties of corresponding, alternate and interior angles to find unknown angles.",
            "Distinguish between angles of elevation and depression.",
            "Solve problems involving angles.",
          ],
        },
      ],
    },
    {
      title: "1. Lines and Angles",
      subsections: [
        {
          title: "What is an Angle?",
          content:
            "An angle is the measure of rotation between two line segments that meet at a point. That meeting point is called the vertex. The two line segments forming an angle are called the arms of the angle.",
        },
        {
          title: "Unit of Angle Measurement",
          content:
            "Angles are measured in degrees (°). One complete turn is 360°. A protractor is used to measure and draw angles.",
        },
        {
          title: "Line Segment",
          content:
            "A line segment is a part of a line that has two endpoints. The length of a line segment can be measured using a ruler.",
        },
      ],
    },
    {
      title: "2. Congruent Line Segments",
      subsections: [
        {
          title: "Definition",
          content:
            "Two or more line segments are congruent if they have the same length. The symbol for congruence is ≅, or tick marks on lines in geometric diagrams.",
        },
        {
          title: "How to Identify Congruent Line Segments",
          content:
            "To determine whether two line segments are congruent, measure both using a ruler. If the lengths are the same, the line segments are congruent.",
          table: {
            headers: ["Line Segments", "Length", "Congruent?"],
            rows: [
              ["AB and CD", "AB = CD = 5 cm", "Yes ✓"],
              ["PQ and RS", "PQ = 4 cm, RS = 6 cm", "No ✗"],
              ["EF and GH", "EF = GH = 3 cm", "Yes ✓"],
            ],
          },
        },
        {
          title: "Visual: Congruent Line Segments",
          content:
            "In geometric diagrams, congruent line segments are marked with the same number of tick marks. One tick mark indicates one congruent pair, two tick marks indicate a different congruent pair.",
          formula:
            "AB ≅ CD means length AB = length CD",
        },
      ],
    },
    {
      title: "3. Congruent Angles",
      subsections: [
        {
          title: "Definition",
          content:
            "Two or more angles are congruent if they have the same size (the same number of degrees). Congruent angles are denoted using the symbol ≅.",
        },
        {
          title: "How to Identify Congruent Angles",
          content:
            "Measure each angle using a protractor. If the degree values are the same, the angles are congruent.",
          table: {
            headers: ["Angles", "Size", "Congruent?"],
            rows: [
              ["∠ABC and ∠DEF", "∠ABC = ∠DEF = 45°", "Yes ✓"],
              ["∠PQR and ∠STU", "∠PQR = 60°, ∠STU = 70°", "No ✗"],
              ["∠MNO and ∠XYZ", "∠MNO = ∠XYZ = 120°", "Yes ✓"],
            ],
          },
        },
        {
          title: "Visual: Congruent Angles",
          content:
            "In geometric diagrams, congruent angles are marked with the same number of arcs. Two arcs indicate a different congruent pair.",
          formula:
            "∠ABC ≅ ∠DEF means size of ∠ABC = size of ∠DEF",
        },
      ],
    },
    {
      title: "4. Measuring Angles Using a Protractor",
      subsections: [
        {
          title: "What is a Protractor?",
          content:
            "A protractor is a tool used to measure and draw angles. A protractor is usually semicircular or full-circular with a degree scale from 0° to 180° (or 0° to 360°).",
        },
        {
          title: "Steps for Using a Protractor",
          content: "Follow these steps to measure angles accurately:",
          bulletPoints: [
            "Step 1: Place the centre point of the protractor exactly at the vertex of the angle.",
            "Step 2: Align the baseline of the protractor with one arm of the angle.",
            "Step 3: Read the degree value where the other arm crosses the scale.",
            "Step 4: Make sure you use the correct scale (inner or outer).",
          ],
        },
        {
          title: "Tips for Using a Protractor",
          content:
            "A protractor has two scales — inner and outer. If the arm starts from the left, use the outer scale (0° on the left). If the arm starts from the right, use the inner scale (0° on the right).",
          table: {
            headers: ["Arm Starts From", "Scale to Use"],
            rows: [
              ["Left (going right)", "Outer scale — read from 0° on the left"],
              ["Right (going left)", "Inner scale — read from 0° on the right"],
            ],
          },
        },
        {
          title: "Example Measurement",
          content:
            "To measure angle ABC: place the protractor centre at B, align line BA with 0°, then read the degree value on line BC.",
          formula:
            "If line BC crosses the 65° mark, then ∠ABC = 65°",
        },
      ],
    },
    {
      title: "5. Types of Angles",
      subsections: [
        {
          title: "Overview of Angle Types",
          content:
            "Angles are categorised by their size in degrees. There are four main types of angles to know.",
          table: {
            headers: ["Type of Angle", "Size (Degrees)", "Symbol / Feature"],
            rows: [
              ["Acute Angle", "0° < angle < 90°", "Sharp, smaller than a right angle"],
              ["Right Angle", "Exactly 90°", "Marked with a small square □"],
              ["Obtuse Angle", "90° < angle < 180°", "Larger than a right angle"],
              ["Reflex Angle", "180° < angle < 360°", "Very large, exceeds a straight line"],
            ],
          },
        },
        {
          title: "Acute Angle",
          content:
            "An acute angle is an angle smaller than 90°. Examples: 30°, 45°, 60°, 85° are all acute angles.",
          formula: "0° < acute angle < 90°",
        },
        {
          title: "Right Angle",
          content:
            "A right angle is exactly 90°. It is marked with a small square symbol at the vertex. Right angles are formed when two perpendicular lines meet.",
          formula: "Right angle = 90° (marked □)",
        },
        {
          title: "Obtuse Angle",
          content:
            "An obtuse angle is greater than 90° but less than 180°. Examples: 100°, 120°, 150° are obtuse angles.",
          formula: "90° < obtuse angle < 180°",
        },
        {
          title: "Reflex Angle",
          content:
            "A reflex angle is greater than 180° but less than 360°. Reflex angles appear to 'wrap around' past a straight line.",
          formula: "180° < reflex angle < 360°",
        },
        {
          title: "Common Mistake",
          content:
            "⚠️ Many students confuse obtuse and reflex angles. Remember: obtuse angles are BETWEEN a right angle and a straight line (90°–180°), while reflex angles are LARGER than a straight line (180°–360°).",
        },
      ],
    },
    {
      title: "6. Angles on a Straight Line",
      subsections: [
        {
          title: "Key Property",
          content:
            "When several angles are formed on one side of a straight line, the sum of all those angles is 180°. This is known as angles on a straight line.",
          formula: "a + b = 180° (angles on a straight line)",
        },
        {
          title: "Example 1: Two Angles",
          content:
            "A diagram shows angles a and b on a straight line. If a = 65°, find b.",
          formula: "a + b = 180° → 65° + b = 180° → b = 115°",
        },
        {
          title: "Example 2: Three Angles",
          content:
            "A diagram shows three angles on a straight line: x, 50° and 75°. Find x.",
          formula: "x + 50° + 75° = 180° → x = 180° − 125° = 55°",
        },
        {
          title: "Visual: Angles on a Straight Line",
          content:
            "Imagine a flat horizontal line. Any angles formed above (or below) that line will always sum to 180°. It is like dividing the 180° angle into several parts.",
        },
      ],
    },
    {
      title: "7. Complete Turn Angles",
      subsections: [
        {
          title: "Key Property",
          content:
            "A complete turn is a full rotation of 360°. When several angles are formed around a point, the sum of all those angles is 360°.",
          formula: "a + b + c + ... = 360° (angles at a point / complete turn)",
        },
        {
          title: "Example 1",
          content:
            "Three angles are formed around a point: 120°, 85° and x. Find x.",
          formula: "120° + 85° + x = 360° → x = 360° − 205° = 155°",
        },
        {
          title: "Example 2",
          content:
            "Four equal angles are formed around a point. What is the size of each angle?",
          formula: "4 × angle = 360° → angle = 360° ÷ 4 = 90°",
        },
        {
          title: "Visual: Complete Turn",
          content:
            "Imagine a clock hand starting at 12 and rotating all the way back to 12. That rotation is 360°. All angles around a single point will always sum to 360°.",
        },
      ],
    },
    {
      title: "8. Complementary Angles",
      subsections: [
        {
          title: "Definition",
          content:
            "Two angles are complementary if their sum is 90°. Each angle is the complement of the other.",
          formula: "a + b = 90° (complementary angles)",
        },
        {
          title: "How to Find the Complement",
          content:
            "To find the complement of an angle, subtract the angle from 90°.",
          formula: "Complement of a = 90° − a",
        },
        {
          title: "Examples",
          content: "Find the complement of the following angles:",
          table: {
            headers: ["Angle", "Complement (90° − angle)"],
            rows: [
              ["30°", "90° − 30° = 60°"],
              ["45°", "90° − 45° = 45°"],
              ["70°", "90° − 70° = 20°"],
              ["x°", "90° − x°"],
            ],
          },
        },
        {
          title: "Important Note",
          content:
            "Only acute angles (0° to 90°) can have a complement. Right angles, obtuse angles and reflex angles do not have complements.",
        },
      ],
    },
    {
      title: "9. Supplementary Angles",
      subsections: [
        {
          title: "Definition",
          content:
            "Two angles are supplementary if their sum is 180°. Each angle is the supplement of the other.",
          formula: "a + b = 180° (supplementary angles)",
        },
        {
          title: "How to Find the Supplement",
          content:
            "To find the supplement of an angle, subtract the angle from 180°.",
          formula: "Supplement of a = 180° − a",
        },
        {
          title: "Examples",
          content: "Find the supplement of the following angles:",
          table: {
            headers: ["Angle", "Supplement (180° − angle)"],
            rows: [
              ["60°", "180° − 60° = 120°"],
              ["90°", "180° − 90° = 90°"],
              ["110°", "180° − 110° = 70°"],
              ["x°", "180° − x°"],
            ],
          },
        },
        {
          title: "Comparison: Complementary vs Supplementary",
          table: {
            headers: ["Type", "Sum", "Formula"],
            rows: [
              ["Complementary Angles", "90°", "a + b = 90°"],
              ["Supplementary Angles", "180°", "a + b = 180°"],
            ],
          },
        },
      ],
    },
    {
      title: "10. Conjugate Angles",
      subsections: [
        {
          title: "Definition",
          content:
            "Two angles are conjugate if their sum is 360°. Conjugate angles together form a complete turn.",
          formula: "a + b = 360° (conjugate angles)",
        },
        {
          title: "How to Find the Conjugate",
          content:
            "To find the conjugate of an angle, subtract the angle from 360°.",
          formula: "Conjugate of a = 360° − a",
        },
        {
          title: "Examples",
          content: "Find the conjugate of the following angles:",
          table: {
            headers: ["Angle", "Conjugate (360° − angle)"],
            rows: [
              ["90°", "360° − 90° = 270°"],
              ["120°", "360° − 120° = 240°"],
              ["200°", "360° − 200° = 160°"],
              ["x°", "360° − x°"],
            ],
          },
        },
        {
          title: "Summary of Three Angle Pairs",
          table: {
            headers: ["Type", "Sum", "Formula"],
            rows: [
              ["Complementary", "90°", "a + b = 90°"],
              ["Supplementary", "180°", "a + b = 180°"],
              ["Conjugate", "360°", "a + b = 360°"],
            ],
          },
        },
      ],
    },
    {
      title: "11. Angles Related to Intersecting Lines",
      subsections: [
        {
          title: "Intersecting Lines",
          content:
            "When two straight lines intersect, they form four angles at the point of intersection. These angles have special properties that are useful in solving geometry problems.",
        },
        {
          title: "The Four Angles Formed",
          content:
            "Two intersecting lines form four angles: angle 1, angle 2, angle 3 and angle 4. These can be categorised as vertically opposite angles and adjacent angles.",
          table: {
            headers: ["Type of Angle", "Property", "Example"],
            rows: [
              ["Vertically Opposite", "Equal in size", "∠1 = ∠3, ∠2 = ∠4"],
              ["Adjacent", "Sum to 180°", "∠1 + ∠2 = 180°"],
            ],
          },
        },
      ],
    },
    {
      title: "12. Vertically Opposite Angles",
      subsections: [
        {
          title: "Definition",
          content:
            "When two straight lines intersect, the angles that are opposite each other (facing each other across the intersection point) are equal in size. These are called vertically opposite angles.",
          formula: "∠1 = ∠3 and ∠2 = ∠4 (vertically opposite angles)",
        },
        {
          title: "Visual: Vertically Opposite Angles",
          content:
            "Draw two intersecting lines forming a cross (+). The angle at the top is equal to the angle at the bottom. The angle on the left is equal to the angle on the right.",
        },
        {
          title: "Example 1",
          content:
            "Two lines intersect forming angles of 70° and x. Find x if they are vertically opposite.",
          formula: "x = 70° (vertically opposite angles are equal)",
        },
        {
          title: "Example 2",
          content:
            "Two lines intersect forming angles 3a and 60°. Find a if they are vertically opposite.",
          formula: "3a = 60° → a = 20°",
        },
        {
          title: "Finding All Angles",
          content:
            "If one angle at an intersection is 65°, find all other angles.",
          formula:
            "∠1 = 65°; ∠3 = 65° (vertically opposite); ∠2 = 180° − 65° = 115°; ∠4 = 115° (vertically opposite)",
        },
      ],
    },
    {
      title: "13. Adjacent Angles",
      subsections: [
        {
          title: "Definition",
          content:
            "Adjacent angles are angles that lie next to each other on a straight line. When two lines intersect, two neighbouring (adjacent) angles sum to 180°.",
          formula: "∠1 + ∠2 = 180° (adjacent angles on a straight line)",
        },
        {
          title: "Example",
          content:
            "Two intersecting lines form angles of 130° and y. Find y if they are adjacent.",
          formula: "130° + y = 180° → y = 50°",
        },
        {
          title: "Important Note",
          content:
            "Adjacent angles on a straight line always sum to 180° because together they form the 180° straight angle.",
        },
      ],
    },
    {
      title: "14. Perpendicular Lines",
      subsections: [
        {
          title: "Definition",
          content:
            "Two lines are perpendicular if they meet at a right angle of 90°. Perpendicular lines are denoted by the symbol ⊥.",
          formula: "AB ⊥ CD means AB is perpendicular to CD (forms 90°)",
        },
        {
          title: "Properties of Perpendicular Lines",
          content:
            "When two lines are perpendicular, they form FOUR right angles (90°) at the point of intersection.",
          table: {
            headers: ["Feature", "Value"],
            rows: [
              ["Angle between two perpendicular lines", "90°"],
              ["Number of right angles formed", "4 angles"],
              ["Total of all angles", "4 × 90° = 360°"],
            ],
          },
        },
        {
          title: "Real-Life Examples",
          content:
            "The wall and floor of a building form a 90° angle — an example of perpendicular lines in real life. The corners of books, door edges and table corners are also 90° angle examples.",
        },
        {
          title: "Drawing Perpendicular Lines",
          content:
            "To draw a perpendicular line using a protractor: draw a line, place the protractor centre at the desired point, mark 90°, then draw a line through the mark.",
        },
      ],
    },
    {
      title: "15. Parallel Lines",
      subsections: [
        {
          title: "Definition",
          content:
            "Two lines are parallel if they never intersect even when extended indefinitely. The distance between two parallel lines is always the same. Parallel lines are denoted by the symbol ∥.",
          formula: "AB ∥ CD means AB is parallel to CD",
        },
        {
          title: "Properties of Parallel Lines",
          content:
            "Parallel lines never meet and always maintain the same distance from each other. They travel in the same direction.",
          bulletPoints: [
            "Never intersect even when extended.",
            "The distance is always uniform (the same) at every point.",
            "They do not form any angle between them.",
          ],
        },
        {
          title: "Parallel Line Markings in Diagrams",
          content:
            "In geometric diagrams, parallel lines are marked with small arrows (→) on each line. One arrow on each line indicates one parallel pair. Two arrows indicate a different parallel pair.",
        },
        {
          title: "Real-Life Examples",
          content:
            "Railway tracks, road edges and the lines on notebook paper are examples of parallel lines in real life.",
        },
      ],
    },
    {
      title: "16. Transversals",
      subsections: [
        {
          title: "Definition",
          content:
            "A transversal is a straight line that cuts across two or more other lines. When a transversal crosses two parallel lines, special angles are formed.",
        },
        {
          title: "Angles Formed",
          content:
            "When a transversal crosses two parallel lines, eight angles are formed in total — four angles at each intersection point.",
          table: {
            headers: ["Pair of Angles", "Property"],
            rows: [
              ["Corresponding Angles", "Equal in size"],
              ["Alternate Angles", "Equal in size"],
              ["Interior Angles", "Sum to 180°"],
            ],
          },
        },
      ],
    },
    {
      title: "17. Corresponding Angles",
      subsections: [
        {
          title: "Definition",
          content:
            "When a transversal crosses two parallel lines, angles that are in the same position at each intersection are equal in size. These are called corresponding angles.",
          formula: "Corresponding angles are equal (∠p = ∠q)",
        },
        {
          title: "How to Identify Corresponding Angles",
          content:
            "Corresponding angles are in the SAME position (e.g., both top-left, or both bottom-right) at two different intersections. They form an F-shape pattern.",
          bulletPoints: [
            "On the SAME side of the transversal.",
            "On the SAME side of the parallel lines (both above or both below).",
            "Form an F-shape pattern.",
          ],
        },
        {
          title: "Example",
          content:
            "A transversal crosses two parallel lines. A corresponding angle (top-left) = 75°. Find the other corresponding angle.",
          formula: "Corresponding angle = 75° (corresponding angles are equal)",
        },
      ],
    },
    {
      title: "18. Alternate Angles",
      subsections: [
        {
          title: "Definition",
          content:
            "Alternate angles are angles that are between the two parallel lines, on opposite sides of the transversal. Alternate angles are equal in size.",
          formula: "Alternate angles are equal (∠r = ∠s)",
        },
        {
          title: "How to Identify Alternate Angles",
          content:
            "Alternate angles are in the INNER region (between the two parallel lines), on OPPOSITE sides of the transversal. They form a Z-shape or N-shape pattern.",
          bulletPoints: [
            "In the INNER region (between the two parallel lines).",
            "On OPPOSITE sides of the transversal.",
            "Form a Z-shape or N-shape pattern.",
          ],
        },
        {
          title: "Example",
          content:
            "A transversal crosses two parallel lines. An alternate angle = 55°. Find the other alternate angle.",
          formula: "The other alternate angle = 55° (alternate angles are equal)",
        },
      ],
    },
    {
      title: "19. Interior Angles",
      subsections: [
        {
          title: "Definition",
          content:
            "Interior angles (also called co-interior angles) are angles between the two parallel lines, on the SAME side of the transversal. Two interior angles on the same side sum to 180°.",
          formula: "Co-interior angles: ∠t + ∠u = 180°",
        },
        {
          title: "How to Identify Interior Angles",
          content:
            "Interior angles are in the inner region (between the two parallel lines), on the SAME side of the transversal. They form a C-shape or U-shape pattern.",
          bulletPoints: [
            "In the INNER region (between the two parallel lines).",
            "On the SAME side of the transversal.",
            "Form a C-shape or U-shape pattern.",
            "Sum of two co-interior angles = 180°.",
          ],
        },
        {
          title: "Example",
          content:
            "A transversal crosses two parallel lines. One interior angle = 110°. Find the co-interior angle.",
          formula: "110° + interior angle = 180° → interior angle = 70°",
        },
        {
          title: "Summary of Angles in Parallel Lines",
          table: {
            headers: ["Type of Angle", "Pattern", "Property"],
            rows: [
              ["Corresponding", "F-shape", "Equal in size"],
              ["Alternate", "Z/N-shape", "Equal in size"],
              ["Co-interior", "C/U-shape", "Sum to 180°"],
            ],
          },
        },
      ],
    },
    {
      title: "20. Angle of Elevation",
      subsections: [
        {
          title: "Definition",
          content:
            "The angle of elevation is the angle measured from the horizontal line upward to the line of sight towards an object. The angle of elevation is always measured upward from the horizontal.",
          formula: "Angle of elevation: measured from horizontal UPWARD (0° to 90°)",
        },
        {
          title: "When Angle of Elevation Occurs",
          content:
            "The angle of elevation occurs when a person looks upward to see an object such as the top of a tall building, the top of a tree, or a star.",
          bulletPoints: [
            "Observer is below the object.",
            "Angle measured from horizontal upward.",
            "Value between 0° and 90°.",
          ],
        },
        {
          title: "Example: Looking at a Building Top",
          content:
            "A student stands on the ground and looks up at the top of a building. The angle between the horizontal line and the student's line of sight to the top of the building is the angle of elevation.",
          formula:
            "If angle of elevation = 35°, it means the student is looking upward at 35° from the horizontal.",
        },
        {
          title: "Visual Diagram",
          content:
            "═══════════════ (horizontal line)\n     ↗ 35° (angle of elevation to building top)\n[Observer]",
        },
      ],
    },
    {
      title: "21. Angle of Depression",
      subsections: [
        {
          title: "Definition",
          content:
            "The angle of depression is the angle measured from the horizontal line downward to the line of sight towards an object. The angle of depression is always measured downward from the horizontal.",
          formula: "Angle of depression: measured from horizontal DOWNWARD (0° to 90°)",
        },
        {
          title: "When Angle of Depression Occurs",
          content:
            "The angle of depression occurs when a person looks downward at an object from a higher position, such as from a tower, the top of a building, or the top of a hill.",
          bulletPoints: [
            "Observer is above the object.",
            "Angle measured from horizontal downward.",
            "Value between 0° and 90°.",
          ],
        },
        {
          title: "Example: Looking from a Tower",
          content:
            "A guard at the top of a watchtower looks down at a vehicle below. The angle between the horizontal line and the guard's line of sight to the vehicle is the angle of depression.",
          formula:
            "If angle of depression = 40°, it means the guard is looking downward at 40° from the horizontal.",
        },
        {
          title: "Comparison: Elevation vs Depression",
          table: {
            headers: ["Feature", "Angle of Elevation", "Angle of Depression"],
            rows: [
              ["Direction of Sight", "Upward", "Downward"],
              ["Position of Observer", "Below the object", "Above the object"],
              ["Measured from", "Horizontal upward", "Horizontal downward"],
              ["Range of Values", "0° to 90°", "0° to 90°"],
            ],
          },
        },
      ],
    },
    {
      title: "22. Problem Solving",
      subsections: [
        {
          title: "Problem-Solving Strategy",
          content:
            "When solving problems involving angles, follow these steps:",
          bulletPoints: [
            "Step 1: Identify the type of angles and geometric relationships in the diagram.",
            "Step 2: Write an equation based on the angle properties being used.",
            "Step 3: Solve the equation to find the unknown angle.",
            "Step 4: Check the answer by substituting back into the equation.",
          ],
        },
        {
          title: "Example 1: Using Angles on a Straight Line",
          content:
            "In a diagram, three angles are formed on a straight line: (2x + 10)°, 40° and (x − 5)°. Find x.",
          formula:
            "(2x + 10) + 40 + (x − 5) = 180 → 3x + 45 = 180 → 3x = 135 → x = 45",
        },
        {
          title: "Example 2: Using Vertically Opposite Angles",
          content:
            "Two lines intersect forming angles (3y + 15)° and 75°. Find y.",
          formula:
            "3y + 15 = 75 (vertically opposite angles) → 3y = 60 → y = 20",
        },
        {
          title: "Example 3: Using Parallel Line Angles",
          content:
            "A transversal crosses two parallel lines forming corresponding angles (4m − 20)° and 80°. Find m.",
          formula:
            "4m − 20 = 80 (corresponding angles equal) → 4m = 100 → m = 25",
        },
        {
          title: "Example 4: Using Multiple Properties",
          content:
            "In a diagram with two parallel lines and a transversal, one angle is 70°. Find the alternate angle and the co-interior angle.",
          formula:
            "Alternate angle = 70° (equal). Co-interior angle = 180° − 70° = 110°.",
        },
        {
          title: "Quick Reference: Angle Formulas",
          table: {
            headers: ["Property", "Formula"],
            rows: [
              ["Angles on a straight line", "Sum = 180°"],
              ["Angles at a point (complete turn)", "Sum = 360°"],
              ["Complementary angles", "a + b = 90°"],
              ["Supplementary angles", "a + b = 180°"],
              ["Conjugate angles", "a + b = 360°"],
              ["Vertically opposite", "∠1 = ∠3, ∠2 = ∠4"],
              ["Corresponding angles (parallel)", "Equal"],
              ["Alternate angles (parallel)", "Equal"],
              ["Co-interior angles (parallel)", "Sum to 180°"],
            ],
          },
        },
      ],
    },
    {
      title: "23. Chapter Summary",
      subsections: [
        {
          title: "Key Concepts",
          content:
            "Chapter 8 covers the foundations of geometry: types of angles, special angle properties, and angle relationships at intersecting and parallel lines.",
        },
        {
          title: "Types of Angles",
          table: {
            headers: ["Type", "Range"],
            rows: [
              ["Acute Angle", "0° < angle < 90°"],
              ["Right Angle", "90°"],
              ["Obtuse Angle", "90° < angle < 180°"],
              ["Reflex Angle", "180° < angle < 360°"],
            ],
          },
        },
        {
          title: "Special Angle Pairs",
          table: {
            headers: ["Pair", "Sum"],
            rows: [
              ["Complementary", "90°"],
              ["Supplementary", "180°"],
              ["Conjugate", "360°"],
              ["Straight line", "180°"],
              ["Complete turn", "360°"],
            ],
          },
        },
        {
          title: "Angles in Parallel Lines",
          table: {
            headers: ["Type", "Property", "Pattern"],
            rows: [
              ["Corresponding", "Equal", "F"],
              ["Alternate", "Equal", "Z / N"],
              ["Co-interior", "Sum to 180°", "C / U"],
            ],
          },
        },
        {
          title: "Elevation and Depression",
          table: {
            headers: ["Type", "Direction", "From"],
            rows: [
              ["Elevation", "Upward", "Horizontal upward"],
              ["Depression", "Downward", "Horizontal downward"],
            ],
          },
        },
      ],
    },
  ],
  keyExamFacts: [
    "Angles on a straight line always sum to 180°. Angles in a complete turn always sum to 360°.",
    "Complementary angles sum to 90°; supplementary angles sum to 180°; conjugate angles sum to 360°.",
    "Vertically opposite angles are EQUAL when two lines intersect.",
    "Adjacent angles on a straight line sum to 180°.",
    "For parallel lines with a transversal: CORRESPONDING angles are equal (F-pattern).",
    "For parallel lines with a transversal: ALTERNATE angles are equal (Z/N-pattern).",
    "For parallel lines with a transversal: CO-INTERIOR angles sum to 180° (C/U-pattern).",
    "Perpendicular lines form 90° angles. Parallel lines never intersect.",
    "Angle of ELEVATION is measured from horizontal UPWARD; angle of DEPRESSION is measured DOWNWARD.",
  ],
  keyTerms: [
    "Angle — Measure of rotation between two line segments",
    "Vertex — The point where two arms of an angle meet",
    "Protractor — Tool for measuring angles",
    "Acute Angle — Angle between 0° and 90°",
    "Right Angle — Angle exactly 90°",
    "Obtuse Angle — Angle between 90° and 180°",
    "Reflex Angle — Angle between 180° and 360°",
    "Complementary Angles — Two angles summing to 90°",
    "Supplementary Angles — Two angles summing to 180°",
    "Conjugate Angles — Two angles summing to 360°",
    "Vertically Opposite Angles — Equal angles when two lines intersect",
    "Perpendicular Lines — Two lines meeting at 90°",
    "Parallel Lines — Two lines that never intersect",
    "Transversal — A line that cuts across two or more lines",
    "Corresponding Angles — Equal angles in the same position (F-pattern)",
    "Alternate Angles — Equal angles on opposite sides (Z/N-pattern)",
    "Interior Angles — Angles summing to 180° on the same side (C/U-pattern)",
    "Angle of Elevation — Angle from horizontal upward",
    "Angle of Depression — Angle from horizontal downward",
  ],
};
