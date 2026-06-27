import type { StructuredNotes } from "@/data/types";

export const mathF3C6NotesDLP: StructuredNotes = {
  chapterSummary:
    "Chapter 6 Angles and Tangents of Circles helps students understand angles at the circumference and centre subtended by an arc, properties of cyclic quadrilaterals, properties of tangents to a circle including the tangent-radius angle and the alternate segment angle, and solving problems involving circle angles and tangents.",
  quickRevision: [
    "Angles at the circumference subtended by the same arc are equal.",
    "The angle at the centre = 2 x the angle at the circumference subtended by the same arc.",
    "The angle at the circumference subtended by a diameter is 90°.",
    "Opposite interior angles in a cyclic quadrilateral sum to 180°.",
    "An exterior angle of a cyclic quadrilateral equals its corresponding opposite interior angle.",
    "A tangent is perpendicular (90°) to the radius at the point of tangency.",
    "Two tangents from an external point are equal in length; the angles formed with the centre are equal.",
    "The angle between a tangent and a chord equals the angle in the alternate segment subtended by the chord.",
  ],
  keyExamFacts: [
    "Circumference angles on the same arc are equal; centre angle = 2 x circumference angle on the same arc.",
    "Circumference angle subtended by a diameter = 90°.",
    "Opposite angles in a cyclic quadrilateral: sum = 180°.",
    "Exterior angle of a cyclic quadrilateral = corresponding opposite interior angle.",
    "Tangent ⊥ radius at the point of tangency (90°).",
    "Two tangents from an external point: equal length, equal centre angles, equal external point angles.",
    "Tangent-chord angle = alternate segment angle subtended by the chord.",
  ],
  keyTerms: ["circumference", "arc", "chord", "cyclic quadrilateral", "tangent", "point of tangency", "alternate segment", "common tangent"],
  sections: [
    {
      title: "Learning Outcomes",
      subsections: [
        {
          content: "By the end of this chapter, students should be able to:",
          bulletPoints: [
            "Make and verify conjectures about the relationship between the circumference angle and the centre angle subtended by the same arc.",
            "Solve problems involving angles at the circumference and centre of a circle.",
            "Identify cyclic quadrilaterals and explain the properties of their interior and exterior angles.",
            "Solve problems involving cyclic quadrilaterals.",
            "Identify tangents to a circle and their properties, including the tangent-radius and tangent-chord angles.",
            "Solve problems involving tangents to a circle.",
          ],
        },
      ],
    },
    {
      title: "6.1 Angles at the Circumference and Centre",
      subsections: [
        {
          title: "Simple Explanation",
          content:
            "An angle at the circumference is formed by two chords meeting at a point on the circumference, subtended by an arc. An angle at the centre is the angle at the circle's centre subtended by the same arc.",
        },
        {
          title: "Formula Box",
          formula:
            "Circumference angles on the same arc are equal: ∠PRQ = ∠PSQ = ∠PTQ\nCentre angle = 2 x circumference angle (same arc): ∠AOC = 2∠ABC\nCircumference angle subtended by a diameter = 90°",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              ["Centre angle 80°, find the circumference angle on the same arc.", "Circumference angle = 80°/2", "40°"],
              ["Circumference angle 35°, find the centre angle on the same arc.", "Centre angle = 2 x 35°", "70°"],
              ["PR & QS are diameters, ∠QRS=90°. Find y if ∠QPR=45°.", "y+45°+90°=180°", "y = 45°"],
              ["Arc PR = arc QS, ∠40° given. Find x.", "x = 40° (equal angles, equal arcs)", "40°"],
            ],
          },
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "The circumference angle is directly proportional to the length of the subtended arc.",
            "The right angle on a diameter (90°) is very useful for right-angled triangles within a circle.",
            "When the major arc is given, the major centre angle = 360° - minor centre angle.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Confusing the centre angle with the circumference angle (forgetting to multiply/divide by 2).",
            "Misidentifying the arc subtended by a particular angle.",
            "Forgetting to use 360° - minor angle to find the major centre angle.",
          ],
        },
      ],
    },
    {
      title: "6.2 Cyclic Quadrilaterals",
      subsections: [
        {
          title: "Simple Explanation",
          content:
            "A cyclic quadrilateral is a quadrilateral with all four vertices on the circumference of the same circle. Opposite interior angles in a cyclic quadrilateral sum to 180°.",
        },
        {
          title: "Formula Box",
          formula:
            "∠A + ∠C = 180°, ∠B + ∠D = 180° (opposite angles)\nExterior angle = corresponding opposite interior angle",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              ["KLMN cyclic, ∠LKN=104°, ∠LMN=8x. Find x.", "104+8x=180; 8x=76", "x=9.5°"],
              ["∠KNM=98°, ∠KLM=4y. Find y.", "98+4y=180; 4y=82", "y=20.5°"],
              ["PQRS cyclic, ∠PQR=4y, ∠PSR=2y, line RST. Find ∠PST.", "4y+2y=180; y=30; ∠PST=∠PQR=4(30)", "120°"],
            ],
          },
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "Always confirm all four vertices lie exactly on the circumference before applying cyclic quadrilateral properties.",
            "The exterior angle (when a side is extended) equals the corresponding opposite interior angle, not the adjacent angle.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Applying cyclic quadrilateral properties to a non-cyclic quadrilateral (one vertex not on the circumference).",
            "Confusing the exterior angle with the adjacent interior angle.",
          ],
        },
      ],
    },
    {
      title: "6.3 Tangents to a Circle",
      subsections: [
        {
          title: "Simple Explanation",
          content:
            "A tangent is a straight line that touches a circle at exactly one point (the point of tangency). A tangent is perpendicular to the radius at the point of tangency.",
        },
        {
          title: "Key Concepts",
          bulletPoints: [
            "The angle between a tangent and the radius at the point of tangency is 90°.",
            "Two tangents from the same external point: equal length (BA=CA), equal centre angles (∠BOA=∠COA), equal external point angles (∠OAB=∠OAC).",
            "The angle between a tangent and a chord (tangent-chord angle) equals the angle in the alternate segment subtended by that chord.",
          ],
        },
        {
          title: "Formula Box",
          formula:
            "Tangent-radius angle = 90°\nTangent-chord angle = alternate segment angle",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              ["ABC is a straight tangent line, AB=OB, ∠BAO=28°. Find x.", "Use the right angle relationship at the point of tangency", "x=48° (textbook example)"],
              ["Tangents PQ, RQ meet at Q. ∠OPQ=90°, ∠OQP=66°. Find x (∠POQ).", "x+66°=90°", "x=24°"],
              ["PMN is a tangent, ∠KLA in the alternate segment. Find ∠PMK if ∠KLM=60°.", "∠PMK = ∠KLM (alternate segment angle)", "60°"],
            ],
          },
        },
        {
          title: "Common Tangents - Simple Explanation",
          content:
            "A common tangent is a straight line that is a tangent to two circles at the same time. The number of common tangents depends on the circles' positions: not touching (4 tangents), touching externally (3 tangents), intersecting (2 tangents), overlapping internally (1 tangent).",
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "Use Pythagoras' Theorem to find a radius or distance when the tangent and a line from the centre form a right-angled triangle.",
            "For two tangents from an external point, the triangles formed with the centre are congruent (SSS).",
            "Identify the alternate segment carefully: it lies on the opposite side of the referenced tangent-chord angle.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Assuming any line touching a circle is a tangent without confirming a single point of contact.",
            "Misapplying the alternate segment angle to the wrong segment.",
            "Forgetting the tangent-radius angle must be 90° when solving related triangles.",
          ],
        },
        {
          title: "Real-Life Applications",
          bulletPoints: [
            "A vehicle's wheel touches the road at one point (tangent concept).",
            "Designing circular structures in engineering and road construction.",
            "Distance measurement using tangent properties in astronomy and navigation.",
          ],
        },
      ],
    },
    {
      title: "6.4 Angles and Tangents of Circles - Solving Problems",
      subsections: [
        {
          title: "Simple Explanation",
          content:
            "Combined problems use all properties of circumference angles, centre angles, cyclic quadrilaterals and tangents together, often involving several sequential steps.",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              [
                "Arc PQ=QR, SQ passes through O, ∠QOR=50°. Find ∠QSR and ∠PQS.",
                "∠QSR=(1/2)(50°)=25°; ∠PQS=180°-90°-25°",
                "∠QSR=25°, ∠PQS=65°",
              ],
              [
                "Two circles with radii 4cm and 3cm, PQRS is a common tangent. Find x using cos⁻¹.",
                "cos x = 1/7 (based on centre distance and radius difference)",
                "x ≈ 81.79°",
              ],
            ],
          },
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "Break complex problems into steps: identify centre/circumference angles first, then cyclic quadrilateral, then tangent properties if relevant.",
            "Draw or annotate the diagram with all known angles to avoid errors.",
            "Always check the triangle angle sum (180°) or centre angle total (360°) to verify the answer.",
          ],
        },
        {
          title: "Summary",
          bulletPoints: [
            "Circumference angles on the same arc are equal; centre angle = 2x circumference angle.",
            "Circumference angle subtended by a diameter = 90°.",
            "Opposite angles in a cyclic quadrilateral sum to 180°; exterior angle = corresponding opposite interior angle.",
            "Tangent ⊥ radius at the point of tangency; two tangents from an external point are equal in length.",
            "Tangent-chord angle = alternate segment angle.",
          ],
        },
      ],
    },
  ],
};
