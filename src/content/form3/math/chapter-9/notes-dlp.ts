import type { StructuredNotes } from "@/data/types";

export const mathF3C9NotesDLP: StructuredNotes = {
  chapterSummary:
    "Chapter 9 Straight Lines helps students understand the relationship between the equation y=mx+c and gradient/y-intercept, convert between forms of a straight line equation (ax+by=c, x/a+y/b=1, y=mx+c), investigate the relationship between a point and a straight line, determine the gradient of parallel lines, determine the equation of a straight line, and find the point of intersection of two straight lines.",
  quickRevision: [
    "Form y=mx+c: m is the gradient, c is the y-intercept.",
    "Form x/a+y/b=1: a is the x-intercept, b is the y-intercept.",
    "Gradient = -(y-intercept/x-intercept) for the form ax+by=c.",
    "The line y=h is parallel to the x-axis (gradient=0); the line x=h is parallel to the y-axis (gradient undefined).",
    "Two straight lines are parallel if and only if their gradients are equal.",
    "A point (x,y) lies on a straight line if it satisfies the line's equation (LHS=RHS).",
    "The intersection point of two lines: solve simultaneously (substitution/elimination) or draw the graphs.",
  ],
  keyExamFacts: [
    "y=mx+c: m=gradient, c=y-intercept.",
    "x/a+y/b=1: a=x-intercept, b=y-intercept.",
    "Two lines parallel ⟺ equal gradients.",
    "Line y=h: gradient=0 (parallel to x-axis); line x=h: gradient undefined (parallel to y-axis).",
    "Point on a line: substitute coordinates, check LHS=RHS of the equation.",
    "Equation of a line through 2 points: m=(y2-y1)/(x2-x1), then use y=mx+c to find c.",
  ],
  keyTerms: ["gradient", "y-intercept", "x-intercept", "parallel lines", "simultaneous equations", "point of intersection"],
  sections: [
    {
      title: "Learning Outcomes",
      subsections: [
        {
          content: "By the end of this chapter, students should be able to:",
          bulletPoints: [
            "Relate the equation y=mx+c to the gradient and y-intercept.",
            "Investigate and interpret a straight line equation in other forms (ax+by=c, x/a+y/b=1) and convert to y=mx+c.",
            "Investigate the relationship between a point on a straight line and its equation.",
            "Investigate and make inferences about the gradient of parallel lines.",
            "Determine the equation of a straight line.",
            "Determine the point of intersection of two straight lines.",
          ],
        },
      ],
    },
    {
      title: "9.1 Straight Lines",
      subsections: [
        {
          title: "The Equation y=mx+c - Simple Explanation",
          content:
            "For the linear function y=mx+c, m is the gradient and c is the y-intercept of the straight line. The graph of y=mx+c is always a straight line.",
        },
        {
          title: "Formula Box",
          formula: "y = mx + c\nm = gradient, c = y-intercept\nLine y=h is parallel to the x-axis (m=0); line x=h is parallel to the y-axis (m undefined)",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              ["Find the gradient and y-intercept of y=2x+9.", "Compare with y=mx+c", "m=2, c=9"],
              ["Find the gradient and y-intercept of 3y=-2x+12.", "Divide by 3: y=-2/3x+4", "m=-2/3, c=4"],
              ["A graph y=6 (parallel to x-axis). State h.", "The line is always 6 units from the x-axis", "h=6"],
            ],
          },
        },
        {
          title: "Forms ax+by=c and x/a+y/b=1 - Simple Explanation",
          content:
            "For the form x/a+y/b=1, a is the x-intercept and b is the y-intercept. This equation can be converted to y=mx+c and vice versa through algebraic manipulation.",
        },
        {
          title: "Formula Box",
          formula: "x/a + y/b = 1\na = x-intercept, b = y-intercept",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              ["Convert 2x+3y=12 to the form x/a+y/b=1.", "Divide every term by 12: x/6+y/4=1", "x/6 + y/4 = 1"],
              ["Convert 2x+3y=12 to y=mx+c.", "3y=-2x+12, y=-2/3x+4", "y = -2/3x + 4"],
              ["Convert x/6+y/3=1 to ax+by=c.", "Multiply by 18 (LCM of denominators): 3x+6y=18, simplify: x+2y=6", "x + 2y = 6"],
            ],
          },
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "The coefficient of y in y=mx+c must be +1; divide/multiply consistently to achieve this.",
            "For x/a+y/b=1, a and b can be identified directly as the x-intercept and y-intercept without further calculation.",
            "Convert between forms carefully following algebraic steps (divide/multiply both sides by the same number).",
          ],
        },
        {
          title: "Point on a Straight Line - Simple Explanation",
          content:
            "A point lies on a straight line if substituting its coordinates into the line's equation results in both sides (left and right) being equal.",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              ["Determine if P(2,8) lies on y=3x+2.", "RHS=3(2)+2=8; LHS=8", "Yes, equal (8=8), P lies on the line"],
              ["Determine if P(-4,2) lies on 3x-2y=12.", "LHS=3(-4)-2(2)=-16; RHS=12", "No, -16≠12, P does not lie on the line"],
            ],
          },
        },
        {
          title: "Gradient of Parallel Lines - Simple Explanation",
          content:
            "Straight lines with the same gradient are parallel. Conversely, if two lines are parallel, their gradients must be equal.",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              ["Is y=3x+5 parallel to 6x-2y=9?", "6x-2y=9 -> y=3x-4.5; compare gradients 3 and 3", "Yes, parallel (equal gradient=3)"],
              ["4x+3y=18 is parallel to 2x+hy=20. Find h.", "Gradient 1: -4/3; Gradient 2: -2/h; equate: -4/3=-2/h", "h = 3/2"],
            ],
          },
        },
        {
          title: "Determining the Equation of a Straight Line - Simple Explanation",
          content:
            "The equation of a straight line can be determined when the gradient and one point are known, or when two points on the line are known (find the gradient first using the gradient formula).",
        },
        {
          title: "Formula Box",
          formula: "y = mx + c\nm = (y2-y1)/(x2-x1) for two points (x1,y1) and (x2,y2)",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              ["Find the equation of a line with gradient 1/2 through P(6,8).", "8=(1/2)(6)+c; 8=3+c; c=5", "y = (1/2)x + 5"],
              ["Find the equation of a line through P(-1,5) and Q(2,-7).", "m=(-7-5)/(2-(-1))=-12/3=-4; 5=(-4)(-1)+c; c=1", "y = -4x + 1"],
              ["Find the equation of a line parallel to y=-2x+6 through P(5,4).", "m=-2 (same); 4=(-2)(5)+c; c=14", "y = -2x + 14"],
            ],
          },
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "A line parallel to the x-axis: form y=h, gradient=0.",
            "A line parallel to the y-axis: form x=h, gradient undefined.",
            "For a line parallel to a given line, use the same gradient, then find c using the given point.",
          ],
        },
        {
          title: "Determining the Point of Intersection of Two Lines - Simple Explanation",
          content:
            "The point of intersection of two straight lines can be determined through (a) graphing on the same Cartesian plane, or (b) solving the equations simultaneously using substitution or elimination.",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              [
                "Find the intersection of 2x+y=5 and x+2y=1.",
                "From (1): y=5-2x; substitute into (2): x+2(5-2x)=1; x+10-4x=1; -3x=-9; x=3; y=5-2(3)=-1",
                "Intersection point (3, -1)",
              ],
            ],
          },
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Forgetting to make the coefficient of y equal to +1 before reading the gradient and y-intercept.",
            "Confusing the x-intercept with the y-intercept when using the form x/a+y/b=1.",
            "Making a sign error when calculating the gradient using the formula (y2-y1)/(x2-x1).",
            "Not verifying the intersection point by substituting back into both original equations.",
          ],
        },
        {
          title: "Exam Tips",
          bulletPoints: [
            "Always convert the equation to y=mx+c form first to quickly identify the gradient.",
            "Use elimination if the variable coefficients are easy to match; use substitution if one variable is easily isolated.",
            "Verify the final answer by substituting back into the original equations.",
          ],
        },
        {
          title: "Real-Life Applications",
          bulletPoints: [
            "The concept of straight lines is used in constructing geometric shapes such as squares, triangles and kites.",
            "Used in engineering, architecture, construction, mapping and science.",
            "The Leaning Clock Tower of Teluk Intan is an interesting example of an inclined-line structure in Malaysian history.",
          ],
        },
        {
          title: "Summary",
          bulletPoints: [
            "y=mx+c: m=gradient, c=y-intercept.",
            "x/a+y/b=1: a=x-intercept, b=y-intercept.",
            "Point on a line: substitute coordinates, check LHS=RHS.",
            "Parallel lines: equal gradients.",
            "Line equation: use gradient + one point, or two points to find m first.",
            "Point of intersection: solve simultaneous equations (substitution/elimination) or graph.",
          ],
        },
      ],
    },
  ],
};
