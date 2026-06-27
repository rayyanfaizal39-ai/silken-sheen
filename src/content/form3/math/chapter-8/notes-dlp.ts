import type { StructuredNotes } from "@/data/types";

export const mathF3C8NotesDLP: StructuredNotes = {
  chapterSummary:
    "Chapter 8 Locus in Two Dimensions helps students recognise loci in real-life situations, describe the locus of a point at a fixed distance from a fixed point, the locus of a point equidistant from two fixed points, the locus of a point at a fixed distance from a straight line, loci equidistant from two parallel or intersecting lines, and determine a locus satisfying two or more conditions simultaneously.",
  quickRevision: [
    "A locus is a path/trace of a set of points in a plane that satisfies certain conditions.",
    "The locus of a point at a fixed distance from a fixed point = a circle centred at that fixed point.",
    "The locus of a point equidistant from two fixed points = the perpendicular bisector of the line joining the two points.",
    "The locus of a point at a fixed distance from a straight line = a pair of lines parallel to that line.",
    "The locus of a point equidistant from two parallel lines = a straight line parallel to both, midway between them.",
    "The locus of a point equidistant from two intersecting lines = the angle bisector between those lines.",
    "The intersection of two or more loci is found by drawing all loci on the same diagram.",
  ],
  keyExamFacts: [
    "Locus equidistant (fixed) from a fixed point = circle.",
    "Locus equidistant from 2 fixed points = perpendicular bisector.",
    "Locus at fixed distance from a straight line = a pair of parallel lines.",
    "Locus equidistant from 2 parallel lines = a parallel line midway between them.",
    "Locus equidistant from 2 intersecting lines = angle bisector.",
    "3D locus: a 2D shape rotated 360° about an axis produces a solid of revolution (cylinder, sphere, etc.).",
  ],
  keyTerms: ["locus", "equidistant", "perpendicular bisector", "angle bisector", "arc", "curve"],
  sections: [
    {
      title: "Learning Outcomes",
      subsections: [
        {
          content: "By the end of this chapter, students should be able to:",
          bulletPoints: [
            "Recognise loci in real-life situations and explain the meaning of locus.",
            "Describe the locus of a point at a fixed distance from a fixed point.",
            "Describe the locus of a point equidistant from two fixed points.",
            "Describe the locus of a point at a fixed distance from a straight line.",
            "Describe the locus of a point equidistant from two parallel or intersecting straight lines.",
            "Determine a locus satisfying two or more conditions.",
          ],
        },
      ],
    },
    {
      title: "8.1 Locus",
      subsections: [
        {
          title: "Simple Explanation",
          content:
            "A locus is a path or trace by a set of points in a plane or three-dimensional space that satisfies certain conditions. A two-dimensional locus can be a straight line, an arc, or a curve.",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Situation", "Resulting Locus"],
            rows: [
              ["A point on a rotating fan blade", "Circle"],
              ["A point on a vertically launched rocket", "Straight line"],
              ["A point on a swinging pendulum", "Arc"],
              ["Side PQ rotated 360° about pole MN", "Right cylinder (3D)"],
              ["A semicircular board rotated 360° about pole MN", "Sphere (3D)"],
            ],
          },
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "A 3D locus is formed when a 2D shape is rotated 360° about an axis/pole.",
            "Common 3D loci: cylinder (rectangle rotated), sphere (semicircle rotated), cone (right-angled triangle rotated).",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Not precisely identifying the movement condition before sketching the locus.",
            "Confusing a 2D locus with the actual path of a 3D object.",
          ],
        },
      ],
    },
    {
      title: "8.2 Locus in Two Dimensions",
      subsections: [
        {
          title: "Locus at a Fixed Distance from a Fixed Point - Simple Explanation",
          content:
            "The locus of a point always at a fixed distance from a fixed point is a circle centred at that fixed point, with a radius equal to that fixed distance.",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              ["Construct the locus of point P at 3cm from fixed point O.", "Draw a circle of radius 3cm centred at O", "A circle of radius 3cm centred at O"],
              ["X is 3cm from point P. Describe the locus of X.", "Locus = circle of radius 3cm centred at P", "A circle of radius 3cm centred at point P"],
            ],
          },
        },
        {
          title: "Locus Equidistant from Two Fixed Points - Simple Explanation",
          content:
            "The locus of a point equidistant from two fixed points is the perpendicular bisector of the line joining those two fixed points.",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              ["Construct the locus of P equidistant from M and N.", "Draw the perpendicular bisector of MN", "A straight line perpendicular through the midpoint of MN"],
              ["X is equidistant from P and R (equilateral triangle PQR).", "Perpendicular bisector of PR", "The perpendicular bisector of PR"],
            ],
          },
        },
        {
          title: "Locus at a Fixed Distance from a Straight Line - Simple Explanation",
          content:
            "The locus of a point always at the same distance from a straight line is a pair of straight lines parallel to that line, one on each side at the fixed distance.",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              ["Draw the locus of X moving 3 units from line AB.", "Draw two lines parallel to AB at 3 units on each side", "A pair of lines parallel to AB, 3 units away"],
              ["T is 1.5cm from line CD (length 6cm).", "Two lines parallel to CD at 1.5cm", "A pair of lines parallel to CD, 1.5cm away"],
            ],
          },
        },
        {
          title: "Locus Equidistant from Two Parallel Lines - Simple Explanation",
          content:
            "The locus of a point equidistant from two parallel lines is a straight line parallel to both lines, passing through the midpoint of the distance between them.",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              ["Draw the locus of X equidistant from AB and DC (rectangle ABCD).", "A parallel line midway between AB and DC", "A straight line parallel to AB & DC, midway between them"],
            ],
          },
        },
        {
          title: "Locus Equidistant from Two Intersecting Lines - Simple Explanation",
          content:
            "The locus of a point equidistant from two intersecting straight lines is the straight line that bisects the angle formed by those two lines (angle bisector).",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              ["Construct the locus of X equidistant from PQ and PN (intersecting at P).", "Construct the bisector of ∠QPN", "The straight line bisecting ∠QPN"],
              ["Y is equidistant from AB and AD (square ABCD).", "Bisector of ∠BAD", "The straight line bisecting ∠BAD"],
            ],
          },
        },
        {
          title: "Determining a Locus with Two or More Conditions - Simple Explanation",
          content:
            "When there are two or more conditions, draw each locus separately on the same diagram, then identify the points of intersection between the loci.",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              [
                "X is 7 units from A; Y is equidistant from AB and CD. Mark the intersection.",
                "Draw locus X (circle radius 7 units centred at A) and locus Y (line midway between AB,CD) on the same diagram",
                "Mark the point of intersection with the symbol ⊗",
              ],
            ],
          },
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "Always identify the type of locus (circle, perpendicular bisector, parallel lines, angle bisector) based on the given condition before drawing.",
            "For combined conditions, draw both loci on the same diagram to accurately identify the intersection.",
            "Use a compass and ruler precisely to construct the locus geometrically (not by estimation).",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Drawing a full circle when only an arc within a restricted area (e.g. inside a square) is needed.",
            "Mistaking the angle bisector for the perpendicular bisector, or vice versa.",
            "Forgetting that the locus at a fixed distance from a line produces A PAIR of lines (not just one).",
          ],
        },
        {
          title: "Exam Tips",
          bulletPoints: [
            "Read the locus condition carefully: 'fixed distance from one point' (circle) differs from 'equidistant from two points' (perpendicular bisector).",
            "When the locus is restricted to an area (e.g. inside a square), only draw the part of the locus within that area.",
            "For coordinate questions (x-axis, y-axis), use the angle bisector property of the axes (45°) to identify the locus.",
          ],
        },
        {
          title: "Real-Life Applications",
          bulletPoints: [
            "Estimating/predicting movement distance or location based on certain conditions (e.g. boat routes, a person's position).",
            "Used in construction, engineering drawing, aviation and satellite movement.",
            "Badminton and other sports use locus concepts to analyse movement.",
          ],
        },
        {
          title: "Summary",
          bulletPoints: [
            "Locus at fixed distance from a fixed point = circle.",
            "Locus equidistant from 2 fixed points = perpendicular bisector.",
            "Locus at fixed distance from a line = a pair of parallel lines.",
            "Locus equidistant from 2 parallel lines = a midway parallel line.",
            "Locus equidistant from 2 intersecting lines = angle bisector.",
            "Combined locus: draw all conditions on the same diagram, identify the intersection.",
          ],
        },
      ],
    },
  ],
};
