import type { StructuredNotes } from "@/data/types";

export const mathF2C5NotesDLP: StructuredNotes = {
  chapterSummary:
    "Chapter 5 Circles helps students understand the properties of circles, the symmetrical properties of chords, and how to calculate the circumference and area of a circle using the value of π.",
  quickRevision: [
    "A circle is the set of all points that are the same distance (radius) from one fixed point (the centre).",
    "Diameter = 2 x radius, which is the longest chord passing through the centre of a circle.",
    "A straight line from the centre that is perpendicular to a chord will bisect that chord.",
    "Circumference of a circle = πd or 2πr; Area of a circle = πr².",
    "Use π ≈ 3.142 or 22/7 depending on which value suits the numbers in the question.",
  ],
  sections: [
    {
      title: "Learning Outcomes",
      subsections: [
        {
          content: "By the end of this chapter, students should be able to:",
          bulletPoints: [
            "Identify the parts of a circle such as centre, radius, diameter, chord, arc, sector and segment.",
            "Make conclusions about the symmetrical properties of chords of a circle.",
            "Determine the circumference and area of a circle and solve related problems.",
          ],
        },
      ],
    },
    {
      title: "5.1 Properties of Circles",
      subsections: [
        {
          title: "Definition",
          content:
            "A circle is the set of all points on a plane that are the same distance from one fixed point called the centre of the circle. This fixed distance is called the radius.",
        },
        {
          title: "Parts of a Circle",
          table: {
            headers: ["Part", "Meaning"],
            rows: [
              ["Centre (O)", "The fixed point in the middle of the circle"],
              ["Radius (r)", "A straight line from the centre to any point on the circumference"],
              ["Diameter (d)", "The longest chord passing through the centre; d = 2r"],
              ["Chord", "A straight line joining two points on the circumference"],
              ["Arc", "A part of the circumference of the circle"],
              ["Sector", "The region bounded by two radii and an arc"],
              ["Segment", "The region bounded by a chord and an arc"],
              ["Circumference", "The distance around the circle (the perimeter of the circle)"],
            ],
          },
        },
        {
          title: "Example 1",
          content:
            "Question: State the name of the part of the circle described below: (a) A line that joins the centre to the circumference. (b) The region bounded by two radii and an arc.\nSolution: (a) This line starts from the centre and ends on the circumference, so it is the radius. (b) This region is bounded by two radii and an arc, so it is the sector.\nAnswer: (a) Radius (b) Sector",
        },
        {
          title: "Example 2",
          content:
            "Question: If the diameter of a circle is 14 cm, what is its radius?\nSolution: Diameter = 2 x radius, so radius = diameter ÷ 2 = 14 ÷ 2.\nAnswer: 7 cm",
        },
        {
          title: "Formula",
          formula: "d = 2r\nr = d ÷ 2",
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "All radii in the same circle have equal length.",
            "The diameter is a chord that passes through the centre and is the longest chord in the circle.",
            "A major sector is larger than half the circle, and a minor sector is smaller than half the circle.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Confusing radius with diameter when carrying out calculations.",
            "Assuming every chord is a diameter, when only a chord that passes through the centre is a diameter.",
            "Mislabeling a sector and a segment because both are regions inside a circle.",
          ],
        },
      ],
    },
    {
      title: "5.2 Symmetrical Properties of Chords",
      subsections: [
        {
          title: "Definition",
          content:
            "The symmetrical properties of chords describe the relationship between a chord of a circle and a line passing through the centre, especially a line that is perpendicular to that chord.",
        },
        {
          title: "Key Properties",
          bulletPoints: [
            "A straight line passing through the centre of a circle and perpendicular to a chord will bisect the chord (divide it into two equal parts).",
            "A straight line passing through the centre of a circle and bisecting a chord is perpendicular to that chord.",
            "Chords of equal length are equidistant (the same distance) from the centre of the circle.",
            "Chords that are equidistant from the centre of the circle have equal length.",
          ],
        },
        {
          title: "Example 1",
          content:
            "Question: In a circle centred at O, chord AB has a length of 16 cm. Line OM is perpendicular to AB at point M. What is the length of AM?\nSolution: Since OM is perpendicular to chord AB and passes through centre O, OM bisects AB. So AM = AB ÷ 2 = 16 ÷ 2.\nAnswer: 8 cm",
        },
        {
          title: "Example 2",
          content:
            "Question: The radius of a circle is 10 cm. A chord is 6 cm from centre O. Find the length of the chord.\nSolution: Draw a perpendicular line from O to the chord, meeting it at point M. Triangle OAM is a right-angled triangle with OA = 10 cm (radius) and OM = 6 cm. Using the Pythagoras Theorem: AM² = OA² - OM² = 10² - 6² = 100 - 36 = 64, so AM = 8 cm. Since OM bisects the chord, the full length of the chord = 2 x AM = 2 x 8.\nAnswer: 16 cm",
        },
        {
          title: "Formula",
          formula: "AM² = OA² - OM²  (Pythagoras Theorem in right-angled triangle OAM)\nLength of chord = 2 x AM",
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "A line from the centre that is perpendicular to a chord always forms two congruent right-angled triangles.",
            "The Pythagoras Theorem is often used together with the symmetrical properties of chords to find an unknown length.",
            "The radius drawn to the endpoint of a chord becomes the hypotenuse of the right-angled triangle.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Forgetting that the perpendicular line from the centre MUST pass through the centre to bisect the chord.",
            "Misidentifying the hypotenuse when applying the Pythagoras Theorem.",
            "Forgetting to multiply by two (x2) after calculating half the chord length to get the full chord length.",
          ],
        },
      ],
    },
    {
      title: "5.3 Circumference and Area of a Circle",
      subsections: [
        {
          title: "Definition",
          content:
            "The circumference of a circle is the distance around the circle, while the area of a circle is a measure of the region enclosed by the circle. Both are calculated using the constant π (pi).",
        },
        {
          title: "Example 1",
          content:
            "Question: A circle has a radius of 7 cm. Calculate the circumference of the circle. (Use π = 22/7)\nSolution: Circumference = 2πr = 2 x 22/7 x 7 = 2 x 22 = 44.\nAnswer: 44 cm",
        },
        {
          title: "Example 2",
          content:
            "Question: A circle has a diameter of 20 cm. Calculate the area of the circle. (Use π = 3.142)\nSolution: Radius, r = diameter ÷ 2 = 20 ÷ 2 = 10 cm. Area = πr² = 3.142 x 10² = 3.142 x 100.\nAnswer: 314.2 cm²",
        },
        {
          title: "Formula",
          formula: "Circumference = 2πr or πd\nArea = πr²\nπ ≈ 3.142 or 22/7",
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "Use π = 22/7 when the radius or diameter is a multiple of 7, for easier and more accurate calculation.",
            "Use π = 3.142 for decimal numbers or when the question specifically states it.",
            "Always square the radius (r²) first before multiplying by π when finding the area.",
            "The unit for circumference is a unit of length (cm, m), while the unit for area is a squared unit of length (cm², m²).",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Forgetting to convert diameter to radius before using the area formula πr².",
            "Multiplying r by π without squaring r when calculating area (mistakenly using πr instead of πr²).",
            "Using the wrong value of π (3.142 or 22/7), leading to inaccurate or hard-to-simplify answers.",
            "Omitting the squared unit (²) in the final area answer.",
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
            "A circle has a centre, radius, diameter, chord, arc, sector and segment.",
            "A perpendicular line from the centre to a chord bisects that chord.",
            "Circumference of a circle = 2πr or πd.",
            "Area of a circle = πr².",
          ],
        },
        {
          title: "Important Formulas",
          formula: "d = 2r\nCircumference = 2πr = πd\nArea = πr²\nπ ≈ 3.142 or 22/7",
        },
        {
          title: "Exam Tips",
          bulletPoints: [
            "Always identify whether the given value is the radius or the diameter before calculating.",
            "Choose the value of π that simplifies the calculation based on the numbers in the question.",
            "Draw a diagram of the circle to help identify chords, radii and right angles.",
            "Double-check the units of your answer: length (cm/m) for circumference, area (cm²/m²) for area.",
          ],
        },
      ],
    },
  ],
  keyExamFacts: [
    "Diameter = 2 x radius.",
    "A line from the centre that is perpendicular to a chord bisects the chord, and vice versa.",
    "Chords of equal length are equidistant from the centre.",
    "Circumference of a circle = 2πr or πd.",
    "Area of a circle = πr², where the radius must be squared first.",
    "Use π = 22/7 for multiples of 7, and π = 3.142 for decimal numbers.",
  ],
  keyTerms: [
    "Circle",
    "Centre",
    "Radius",
    "Diameter",
    "Chord",
    "Arc",
    "Sector",
    "Segment",
    "Circumference",
    "Area of a circle",
    "Pi (π)",
  ],
};
