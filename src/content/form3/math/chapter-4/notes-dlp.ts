import type { StructuredNotes } from "@/data/types";

export const mathF3C4NotesDLP: StructuredNotes = {
  chapterSummary:
    "Chapter 4 Scale Drawings helps students understand the relationship between an object's actual measurements and its scale drawing, interpret a scale in the form 1:n, determine the scale, object measurement or scale drawing measurement, draw a scale drawing of an object and vice versa, and solve problems involving scale drawings.",
  quickRevision: [
    "A scale drawing is a drawing of an object where all measurements are proportional to the actual object's measurements.",
    "Scale = Scale drawing measurement / Object measurement, usually written in the form 1:n.",
    "If n<1, the scale drawing is larger than the object; if n>1, it is smaller; if n=1, it is the same size.",
    "For grids of different sizes, use the number of grid units (not the actual grid size) to determine the scale.",
    "Angles always remain the same in a scale drawing; only the side lengths change according to the scale.",
  ],
  keyExamFacts: [
    "Scale = Scale drawing measurement / Object measurement = 1/n.",
    "n<1: drawing is larger; n>1: drawing is smaller; n=1: same size.",
    "Angles do not change in a scale drawing; only lengths change according to the scale ratio.",
    "Map scales are usually written as 1cm : n km; convert units carefully (1km=100000cm).",
    "Actual area = (length scale ratio)^2 x area on the scale drawing.",
  ],
  keyTerms: ["scale drawing", "scale", "ratio", "grid", "object", "proportion"],
  sections: [
    {
      title: "Learning Outcomes",
      subsections: [
        {
          content: "By the end of this chapter, students should be able to:",
          bulletPoints: [
            "Study and explain the relationship between an object's actual measurements and drawings of the object in various sizes.",
            "Interpret the scale of a scale drawing.",
            "Determine the scale, object measurement or scale drawing measurement.",
            "Draw a scale drawing of an object and vice versa.",
            "Solve problems involving scale drawings.",
          ],
        },
      ],
    },
    {
      title: "4.1 Scale Drawings",
      subsections: [
        {
          title: "4.1.1 Meaning of a Scale Drawing - Simple Explanation",
          content:
            "A scale drawing is a drawing of an object where all measurements in the drawing are proportional to the measurements of the object. The angle sizes remain the same even though the side lengths change according to the scale.",
        },
        {
          title: "Key Concepts",
          bulletPoints: [
            "A scale drawing preserves shape (same angles) but changes size according to a fixed ratio.",
            "If side lengths increase/decrease consistently in proportion but the angles do not change, it is a scale drawing.",
          ],
        },
        {
          title: "4.1.2 Interpreting Scale - Simple Explanation",
          content:
            "Scale is the ratio of the scale drawing measurement to the object measurement, usually written in the form 1:n, where n is a positive integer or fraction.",
        },
        {
          title: "Formula Box",
          formula: "Scale = Scale drawing measurement / Object measurement = 1/n\n1:n means 1 unit on the drawing represents n units on the actual object",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              ["Drawing P'Q'=2, object PQ=4. Determine the scale 1:n.", "Scale = 2/4 = 1/2", "1 : 2"],
              ["Drawing K'L'=9, object KL=3. Determine the scale.", "Scale = 9/3 = 3/1", "3 : 1 or 1 : 1/3"],
              ["Drawing grid 2cm, object grid 1cm, matching number of units. Determine the scale.", "Scale = drawing grid size / object grid size = 2/1", "1 : 1/2 (or 2:1)"],
              ["Drawing grid 0.5cm, object grid 1cm. Determine the scale.", "Scale = 0.5/1 = 1/2", "1 : 2"],
            ],
          },
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "If n<1, the scale drawing is larger than the actual object.",
            "If n>1, the scale drawing is smaller than the actual object.",
            "If n=1, the scale drawing is the same size as the object.",
            "For grids of different sizes, use the grid size (not the number of units) to find the scale when the number of side units is equal.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Confusing the direction of the scale ratio (drawing:object versus object:drawing).",
            "Forgetting to convert units (cm to km) when calculating actual distance on a map.",
            "Treating area scaling linearly like length (it should be the square of the length ratio).",
          ],
        },
        {
          title: "4.1.3 Determining the Scale, Object Measurement or Drawing Measurement - Simple Explanation",
          content:
            "Using the formula scale = drawing measurement/object measurement, any two of the three variables (scale, drawing measurement, object measurement) can be used to find the third.",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              ["A map has a scale of 1:300 000. The map distance is 3cm. Find the actual distance in km.", "3cm x 300000 = 900000cm = 9km", "9 km"],
              ["Scale 1cm:10km. Map distance is 2cm between Kluang and Ayer Hitam. Find the actual distance.", "2cm x 10km/cm", "20 km"],
              ["Khairul draws a square with scale 1:1/3 (n=1/3). The actual side is 6cm. Find the drawing's side length.", "Drawing side = 3 x 6cm = 18cm", "18 cm"],
              ["A room is 7cm x 5cm on a scale drawing at scale 1:400. Find the actual area in m².", "Actual side=7x400=2800cm=28m; 5x400=2000cm=20m; area=28x20", "560 m²"],
            ],
          },
        },
        {
          title: "Exam Tips",
          bulletPoints: [
            "Write the scale formula first, then substitute the known values to find the unknown.",
            "For actual area, square the length scale ratio before multiplying by the drawing's area.",
            "Always check that units (cm, m, km) are consistent throughout the calculation.",
          ],
        },
        {
          title: "4.1.4 Drawing a Scale Drawing and Vice Versa - Simple Explanation",
          content:
            "A scale drawing can be drawn using (a) same-size grids with different scales, (b) different-size grids, or (c) blank paper according to a given scale. Angles are kept exact; only side lengths change according to the scale.",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              [
                "Draw the scale drawing of PQRS with scale 1:1/2.",
                "n=1/2 (less than 1), so the drawing is twice as large as the object",
                "Each side of the scale drawing = 2 x the side of object PQRS",
              ],
              [
                "A scale drawing P'Q'R'S'T' (scale 1:2) is given; draw the actual object.",
                "Scale 1:2 means the drawing is half the size of the object; object = 2 x drawing side",
                "Each side of the actual object = 2 x the scale drawing side",
              ],
            ],
          },
        },
        {
          title: "4.1.5 Solving Problems - Simple Explanation",
          content:
            "Scale drawing problems often involve travel distance, room/land area, perimeter, and costs related to tiles or building materials based on a given scale.",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              [
                "Bintulu-Miri distance on a map is 4cm, scale 1cm:50km. Find the actual distance.",
                "4cm x 50km/cm",
                "200 km",
              ],
              [
                "From above, if driven at 80km/h, find the travel time.",
                "Time = distance/speed = 200/80",
                "2.5 hours = 2 hours 30 minutes",
              ],
              [
                "A football field at scale 1:1000, drawing measures 7cm x 12cm. Find the actual area in m².",
                "Actual side=7x1000=7000cm=70m; 12x1000=12000cm=120m; area=70x120",
                "8 400 m²",
              ],
            ],
          },
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "For cost questions (e.g. tiles), compare the total requirement and total cost, not just the unit price.",
            "For time questions, use time = distance / speed after finding the actual distance.",
            "Check whether the question asks for length, area or volume since each requires a different power of the scale (1, 2 or 3).",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Using the length scale ratio directly for area without squaring it.",
            "Forgetting to convert cm to m or km before the final answer.",
            "Misinterpreting n>1 as a larger drawing (it is actually smaller).",
          ],
        },
        {
          title: "Real-Life Applications",
          bulletPoints: [
            "Maps and GPS navigation use scale to represent actual distances.",
            "House plans and housing estate models by property developers.",
            "Architecture, engineering and photography widely use scale drawings.",
          ],
        },
        {
          title: "Summary",
          bulletPoints: [
            "Scale drawing: all measurements proportional to the actual object; angles remain the same.",
            "Scale = drawing measurement/object measurement, written as 1:n.",
            "n<1 drawing is larger; n>1 drawing is smaller; n=1 same size.",
            "Actual area = (length ratio)² x drawing area; volume uses the cube of the ratio.",
          ],
        },
      ],
    },
  ],
};
