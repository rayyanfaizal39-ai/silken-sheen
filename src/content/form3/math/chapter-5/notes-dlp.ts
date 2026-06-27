import type { StructuredNotes } from "@/data/types";

export const mathF3C5NotesDLP: StructuredNotes = {
  chapterSummary:
    "Chapter 5 Trigonometric Ratios helps students identify the opposite side, adjacent side and hypotenuse, define sine, cosine and tangent for an acute angle, determine the trigonometric values of special angles (30°, 45°, 60°) without a calculator, use a scientific calculator for trigonometric values and angles, and solve problems involving sine, cosine and tangent.",
  quickRevision: [
    "The hypotenuse is the longest side, opposite the 90° angle.",
    "sin θ = opposite side / hypotenuse; cos θ = adjacent side / hypotenuse; tan θ = opposite side / adjacent side.",
    "tan θ = sin θ / cos θ.",
    "As the acute angle increases: sin θ and tan θ increase, cos θ decreases.",
    "Special values: sin30=1/2, cos30=√3/2, tan30=1/√3; sin45=cos45=1/√2, tan45=1; sin60=√3/2, cos60=1/2, tan60=√3.",
    "Angles can be expressed in degrees, minutes and seconds: 1° = 60'.",
  ],
  keyExamFacts: [
    "sin θ = opposite/hypotenuse; cos θ = adjacent/hypotenuse; tan θ = opposite/adjacent.",
    "tan θ = sin θ / cos θ.",
    "Special angle values 30°, 45°, 60° can be found without a calculator using equilateral/isosceles triangles.",
    "Sin and tan increase, cos decreases, as the acute angle increases (0°-90°).",
    "1° = 60 minutes ('); use the °' '' button on a calculator for degree-minute angles.",
  ],
  keyTerms: ["sine", "cosine", "tangent", "hypotenuse", "opposite side", "adjacent side", "acute angle", "degree", "minute"],
  sections: [
    {
      title: "Learning Outcomes",
      subsections: [
        {
          content: "By the end of this chapter, students should be able to:",
          bulletPoints: [
            "Identify the opposite side and adjacent side based on an acute angle in a right-angled triangle.",
            "Make and verify conjectures about the relationship between an acute angle and the side ratios of a right-angled triangle, then define sine, cosine and tangent.",
            "Make and verify conjectures about the effect of changing angle size on the values of sine, cosine and tangent.",
            "Determine the values of sine, cosine and tangent of an acute angle.",
            "Determine the values of sine, cosine and tangent of 30°, 45° and 60° without a calculator.",
            "Perform calculations involving sine, cosine and tangent.",
            "Solve problems involving sine, cosine and tangent.",
          ],
        },
      ],
    },
    {
      title: "5.1 Sine, Cosine and Tangent of an Acute Angle",
      subsections: [
        {
          title: "5.1.1 Identifying Sides - Simple Explanation",
          content:
            "For an acute angle in a right-angled triangle: the hypotenuse is the longest side, opposite the 90° angle (fixed position); the opposite side and adjacent side change depending on the referenced acute angle.",
        },
        {
          title: "Key Concepts",
          bulletPoints: [
            "The hypotenuse is always opposite the 90° angle and does not change regardless of which acute angle is referenced.",
            "The opposite side is the side opposite the referenced acute angle.",
            "The adjacent side is the side next to the referenced acute angle (not the hypotenuse).",
          ],
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Angle", "Hypotenuse", "Opposite Side", "Adjacent Side"],
            rows: [
              ["∠BAC in ΔABC", "AC", "BC", "AB"],
              ["∠BCA in ΔABC", "AC", "AB", "BC"],
              ["∠LKM in ΔKLM", "KM", "LM", "KL"],
            ],
          },
        },
        {
          title: "5.1.2 Defining Sine, Cosine and Tangent - Simple Explanation",
          content:
            "For a fixed acute angle, the ratios opposite:hypotenuse, adjacent:hypotenuse and opposite:adjacent are constant regardless of the triangle's size, as long as the angle is the same.",
        },
        {
          title: "Formula Box",
          formula:
            "sin θ = opposite side / hypotenuse\ncos θ = adjacent side / hypotenuse\ntan θ = opposite side / adjacent side\ntan θ = sin θ / cos θ",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              [
                "Right-angled triangle PQR, PQ=15cm, QR=8cm. Find the length PR.",
                "PR=√(15²+8²)=√289",
                "PR = 17 cm",
              ],
              [
                "From the above, find sin ∠PRQ.",
                "sin∠PRQ = opposite(PQ)/hypotenuse(PR) = 15/17",
                "15/17",
              ],
              [
                "From the above, find cos ∠PRQ and tan ∠QPR.",
                "cos∠PRQ = QR/PR = 8/17; tan∠QPR = QR/PQ = 8/15",
                "cos = 8/17, tan = 8/15",
              ],
              [
                "If sin θ = 0.6 and cos θ = 0.8, find tan θ.",
                "tan θ = sin θ / cos θ = 0.6/0.8",
                "0.75",
              ],
            ],
          },
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "Trigonometric ratios for the same angle are equal even for different-sized triangles (similar triangles).",
            "As the acute angle increases (0° to 90°): sin θ increases toward 1; cos θ decreases toward 0; tan θ increases toward infinity.",
            "tan 45° = 1 because the opposite side equals the adjacent side in an isosceles right-angled triangle.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Confusing the adjacent side with the hypotenuse.",
            "Misidentifying the opposite side when the referenced acute angle changes in the same triangle.",
            "Forgetting the formula tan θ = sin θ/cos θ when one value isn't given directly.",
          ],
        },
        {
          title: "5.1.3 Special Angles 30°, 45°, 60° Without a Calculator - Simple Explanation",
          content:
            "Trigonometric values for 30°, 45°, 60° can be derived using an equilateral triangle (bisected for 30°/60°) and an isosceles right-angled triangle (for 45°), using Pythagoras' Theorem.",
        },
        {
          title: "Formula Box",
          formula:
            "sin30°=1/2, cos30°=√3/2, tan30°=1/√3\nsin45°=1/√2, cos45°=1/√2, tan45°=1\nsin60°=√3/2, cos60°=1/2, tan60°=√3",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              ["Find sin45° + cos45° without a calculator.", "1/√2 + 1/√2 = 2/√2", "√2"],
              ["Find 3cos30° - 2sin60°.", "3(√3/2) - 2(√3/2) = (3√3-2√3)/2", "√3/2"],
              ["Find 2tan45° - 2cos60°.", "2(1) - 2(1/2)", "1"],
            ],
          },
        },
        {
          title: "5.1.4 Using a Scientific Calculator - Simple Explanation",
          content:
            "A scientific calculator can find sin, cos, tan values for any angle, and can find the angle (using sin⁻¹, cos⁻¹, tan⁻¹) if the trigonometric ratio value is given.",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              ["Given sin x = 0.8377, find x.", "x = sin⁻¹(0.8377)", "x ≈ 56.9° = 56° 54'"],
              ["Convert 30.2° to degrees and minutes.", "30.2° = 30° + (0.2x60)'", "30° 12'"],
              ["Convert 43° 30' to degrees.", "43° + (30/60)°", "43.5°"],
            ],
          },
        },
        {
          title: "Exam Tips",
          bulletPoints: [
            "1° = 60 minutes; use the °' '' button on a calculator to input/output degree-minute angles directly.",
            "When the seconds value is ≥30, round up the minutes by 1.",
            "Make sure the calculator is in 'Deg' mode (degrees), not radians, when calculating trigonometric values.",
          ],
        },
        {
          title: "5.1.5 Solving Problems - Simple Explanation",
          content:
            "Trigonometry problems often involve ladders, poles, angles of elevation/depression, and 3D shapes such as cuboids, where the relevant right-angled triangle must be identified before applying trigonometric ratios.",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              [
                "Ladder PQR leans against a wall at 50°, height QR=2.5m. Find the length of ladder PR.",
                "sin50° = QR/PR = 2.5/PR; PR = 2.5/sin50°",
                "PR ≈ 3.26 m",
              ],
              [
                "Cuboid ABCDEFGH: BC=8cm, CH=5cm, HE=4cm. Find ∠FCG.",
                "FG=EH=4cm; CG=√(8²+5²)=√89; tan∠FCG=FG/CG=4/√89",
                "∠FCG ≈ 22.98° = 22° 59'",
              ],
            ],
          },
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "Identify the relevant right-angled triangle first before choosing the appropriate sin/cos/tan ratio.",
            "Use the known sides to determine which ratio (sin, cos or tan) is most suitable.",
            "For angle of elevation/depression problems, sketch a simple diagram to correctly identify the opposite/adjacent sides.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Using the wrong trigonometric ratio (e.g. using cos when sin should be used).",
            "Forgetting to convert the angle to decimal degrees before using the calculator.",
            "Misplacing the opposite/adjacent sides when there is more than one right-angled triangle in a diagram.",
          ],
        },
        {
          title: "Real-Life Applications",
          bulletPoints: [
            "Measuring a river's width or a building's height without direct measurement (using a theodolite).",
            "Maritime and aviation navigation.",
            "Engineering, astronomy and construction make extensive use of trigonometry.",
          ],
        },
        {
          title: "Summary",
          bulletPoints: [
            "sin θ = opposite/hypotenuse; cos θ = adjacent/hypotenuse; tan θ = opposite/adjacent = sinθ/cosθ.",
            "Special values 30°,45°,60° are found using equilateral/isosceles triangles without a calculator.",
            "Sin & tan increase, cos decreases, as the acute angle increases.",
            "Identify the correct right-angled triangle before solving trigonometry problems.",
          ],
        },
      ],
    },
  ],
};
