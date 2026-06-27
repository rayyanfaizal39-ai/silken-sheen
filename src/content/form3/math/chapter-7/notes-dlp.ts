import type { StructuredNotes } from "@/data/types";

export const mathF3C7NotesDLP: StructuredNotes = {
  chapterSummary:
    "Chapter 7 Plan and Elevation helps students understand the orthogonal projection of a line, plane and three-dimensional object, draw the plan (top view) and elevation (front/side view) of an object to full scale, and synthesise the plan and elevations to sketch the object's three-dimensional shape.",
  quickRevision: [
    "A plane is a flat surface on an object: horizontal plane, vertical plane, inclined plane.",
    "A normal to a plane is a straight line perpendicular (90°) to that plane.",
    "An orthogonal projection is the image formed on a plane when the projection lines from an object are perpendicular to that plane.",
    "A plan is the orthogonal projection on a horizontal plane (top view).",
    "An elevation is the orthogonal projection on a vertical plane (front/side view).",
    "A thick solid line is for visible edges; a dashed line is for hidden edges; a thin solid line is for construction lines.",
  ],
  keyExamFacts: [
    "Normal: a straight line perpendicular (90°) to a plane.",
    "Orthogonal projection: the projection lines from the object must be perpendicular to the plane.",
    "Plan = top view (horizontal plane); Elevation = front/side view (vertical plane).",
    "Standard quadrant layout: plan in the fourth quadrant, front elevation in the first quadrant, side elevation in the first/second quadrant depending on viewing direction.",
    "Thick solid line = visible edge; dashed line = hidden edge; thin solid line = construction/projection line.",
  ],
  keyTerms: ["plane", "normal", "orthogonal projection", "plan", "elevation", "quadrant", "solid line", "dashed line"],
  sections: [
    {
      title: "Learning Outcomes",
      subsections: [
        {
          content: "By the end of this chapter, students should be able to:",
          bulletPoints: [
            "Identify a plane and the normal to a plane.",
            "Draw the orthogonal projection of a line, plane and object.",
            "Compare and contrast an object with its corresponding orthogonal projection.",
            "Draw the plan and elevations of an object to scale.",
            "Synthesise the plan and elevations of an object and sketch the object.",
          ],
        },
      ],
    },
    {
      title: "7.1 Orthogonal Projection",
      subsections: [
        {
          title: "Simple Explanation",
          content:
            "A plane is a flat surface on an object (horizontal, vertical or inclined). A normal to a plane is a straight line perpendicular to that plane. An orthogonal projection is the image formed on a plane when the projection lines from an object are perpendicular to that plane.",
        },
        {
          title: "Key Concepts",
          bulletPoints: [
            "Three types of planes: horizontal, vertical, inclined.",
            "The normal line must be perpendicular (90°) to the plane to form a valid orthogonal projection.",
            "If the projection line is not perpendicular to the plane, the resulting projection is NOT an orthogonal projection.",
          ],
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              ["Cube PQRSTUVW, state the normal to plane PQRS.", "Identify the vertical edges perpendicular to plane PQRS", "UP, VQ, WR, TS"],
              ["A right prism with horizontal base ABCD; FM, EN are perpendicular to AB, CD. What are FM and EN?", "Vertical lines perpendicular to the horizontal plane", "Normals to plane ABCD"],
              ["Determine if projection (c) is an orthogonal projection when the projection line is not perpendicular.", "Check if the projection line is perpendicular to the plane", "Not an orthogonal projection"],
            ],
          },
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "Side lengths and angle sizes in an orthogonal projection DIFFER depending on the viewing direction (Z, X or Y) compared to the actual object.",
            "Sides parallel to the projection plane retain their actual length; sides inclined/vertical to the plane change length in the projection.",
            "The order of letters (e.g. TS not ST) is important to accurately state the direction of a normal.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Assuming all projections are orthogonal projections without confirming perpendicularity.",
            "Mistakenly assuming all side lengths in a projection equal the object (it actually depends on viewing direction).",
            "Forgetting to label vertices in the correct order when drawing a projection.",
          ],
        },
        {
          title: "Exam Tips",
          bulletPoints: [
            "Identify the plane and viewing direction first before drawing the projection.",
            "Draw normal lines from all object vertices to the plane accurately and perpendicularly.",
            "Connect the intersection points of the normals with the plane to form the complete orthogonal projection.",
          ],
        },
      ],
    },
    {
      title: "7.2 Plan and Elevation",
      subsections: [
        {
          title: "Simple Explanation",
          content:
            "A plan is the orthogonal projection on a horizontal plane (top view). An elevation is the orthogonal projection on a vertical plane (front or side view). Both are drawn to full scale.",
        },
        {
          title: "Key Concepts",
          bulletPoints: [
            "The plan is drawn in the fourth quadrant (bottom-left); the front elevation in the first quadrant (top-left, above the plan).",
            "The side elevation is placed to the left or right of the front elevation, depending on the side viewing direction.",
            "A thick solid line is used for visible edges; a dashed line for hidden/concealed edges; a thin solid line for construction/projection lines.",
          ],
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              [
                "A right prism with base ABCD, draw the plan and elevations from directions X and Y.",
                "Project each vertex of the object onto the horizontal plane (plan) and vertical plane (elevation) according to the viewing direction",
                "Plan in quadrant 4, front elevation (X) in quadrant 1, side elevation (Y) in quadrant 1 or 2 depending on direction",
              ],
              [
                "A combination of a cuboid and right prism, draw the plan and elevations.",
                "Draw the plan first (quadrant 4), project upward for the front elevation (quadrant 1), project sideways for the side elevation",
                "Three complete views with solid lines (visible edges) and dashed lines (hidden edges)",
              ],
            ],
          },
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "The side elevation's viewing direction determines its quadrant position: if viewed right-to-left, the side elevation is to the left of the front elevation (method 1); if left-to-right, to the right (method 2).",
            "All measurements must be drawn to full scale (1:1) unless stated otherwise.",
            "Specific angles and lengths (e.g. 45°, 60°) must be constructed accurately using a compass and protractor.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Forgetting to switch to a dashed line for an edge hidden from that view.",
            "Incorrectly placing the side elevation in a quadrant that doesn't match the actual viewing direction.",
            "Not maintaining full scale when transferring measurements from the object to the projection.",
          ],
        },
        {
          title: "Synthesising Plan and Elevations - Simple Explanation",
          content:
            "From a given plan, front elevation and side elevation, the object's three-dimensional shape can be sketched by combining all three views step by step.",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              [
                "Given the plan, front elevation and side elevation of a prism with a cuboid removed. Sketch the 3D shape.",
                "Step 1: sketch the three projections on related planes with actual measurements. Step 2: project surfaces to meet. Step 3: connect vertices. Step 4: label side lengths",
                "The resulting 3D shape of the prism with a cuboid-shaped hole",
              ],
            ],
          },
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "Identify the side elevation's quadrant position (first or second) to determine the actual side viewing direction (left-to-right or right-to-left).",
            "Label each vertex consistently across all three projections to avoid confusion.",
            "Special angles (45°, 60°, etc.) in the projections must be constructed accurately when sketching the 3D shape.",
          ],
        },
        {
          title: "Real-Life Applications",
          bulletPoints: [
            "Plan and elevation are widely used in engineering, industrial construction and architectural design.",
            "Building plans (e.g. the Diamond Building in Putrajaya) show the design from various viewing directions.",
            "Graphic design and computing use orthogonal projection concepts for 3D models.",
          ],
        },
        {
          title: "Summary",
          bulletPoints: [
            "Orthogonal projection: an image on a plane with projection lines perpendicular to it.",
            "Plan = top view; Elevation = front/side view.",
            "Standard quadrant layout: plan, front elevation, side elevation (left/right depending on direction).",
            "Thick solid line = visible; dashed line = hidden; thin solid line = construction.",
            "Synthesising three projections allows the object's 3D shape to be sketched.",
          ],
        },
      ],
    },
  ],
};
