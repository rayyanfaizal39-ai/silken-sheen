import type { Difficulty, QuizQuestion } from "@/data/content";
import { buildForm3MathQuizSets } from "../quiz-sets";
import { MATH_F3_C7_QUIZ_VISUALS } from "./quiz-visuals";
import { MATH_F3_C7_QUIZ_EXPLANATIONS } from "./quiz-explanations";

type QuizSeed = [Difficulty, string, [string, string, string, string], number];
function buildQuiz(items: QuizSeed[]): QuizQuestion[] {
  return items.map(([difficulty, question, options, answerIndex], index) => ({
    id: `math-f3-c7-dlp-q${index + 1}`,
    subjectId: "math",
    form: "Form 3",
    difficulty,
    chapter: "Chapter 7",
    lang: "dlp",
    question,
    options,
    answerIndex,
    mathNotation: "indices",
    visual: MATH_F3_C7_QUIZ_VISUALS[index + 1],
    explanation: MATH_F3_C7_QUIZ_EXPLANATIONS[index + 1].dlp,
  }));
}

export const mathF3C7QuestionBankDLP: QuizQuestion[] = buildQuiz([
  [
    "Easy",
    "What is a plane in geometry?",
    [
      "A flat surface without limits",
      "A curved surface without limits",
      "A straight segment with two ends",
      "A single point without length",
    ],
    0,
  ],
  [
    "Easy",
    "What are the three types of planes?",
    [
      "Horizontal, vertical, inclined",
      "Round, triangular, square",
      "Tall, short, medium",
      "Red, blue, green",
    ],
    0,
  ],
  [
    "Easy",
    "What is a normal to a plane?",
    [
      "A line perpendicular to the plane",
      "A line parallel to the plane",
      "A line inclined to the plane",
      "A line lying on the plane",
    ],
    0,
  ],
  [
    "Easy",
    "What is an orthogonal projection?",
    [
      "An image by perpendicular projection",
      "An image by inclined projection",
      "An image by perspective drawing",
      "An image by arbitrary enlargement",
    ],
    0,
  ],
  [
    "Easy",
    "What is a plan?",
    [
      "Projection on a horizontal plane",
      "Projection on a vertical plane",
      "Projection on an inclined plane",
      "A three-dimensional perspective sketch",
    ],
    0,
  ],
  [
    "Easy",
    "What is an elevation?",
    [
      "Projection on a vertical plane",
      "Projection on a horizontal plane",
      "Projection on an inclined plane",
      "A three-dimensional perspective sketch",
    ],
    0,
  ],
  [
    "Easy",
    "What is a thick solid line used for?",
    ["Visible edges", "Hidden edges", "Construction lines", "Axis lines"],
    0,
  ],
  [
    "Easy",
    "What is a dashed line used for?",
    ["Hidden edges", "Visible edges", "Dimension lines", "Paper edge lines"],
    0,
  ],
  [
    "Easy",
    "What is a thin solid line used for?",
    [
      "Construction lines",
      "Visible object edges",
      "Hidden object edges",
      "Paper boundary lines",
    ],
    0,
  ],
  [
    "Easy",
    "In the first-angle projection layout used here, where is the plan placed relative to the front elevation?",
    ["Below", "Above", "To the left", "To the right"],
    0,
  ],
  [
    "Easy",
    "In the first-angle projection layout used here, where is the front elevation placed relative to the plan?",
    ["Above", "Below", "To the left", "To the right"],
    0,
  ],
  [
    "Easy",
    "What is the valid angle for a normal to a plane?",
    ["90°", "45°", "60°", "180°"],
    0,
  ],
  [
    "Easy",
    "Are all projections orthogonal projections?",
    [
      "No; projection lines must be normal",
      "Yes; projection lines may be inclined",
      "Yes; all two-dimensional images are orthogonal",
      "No; the object must have a circular shape",
    ],
    0,
  ],
  [
    "Easy",
    "What does a horizontal plane mean?",
    [
      "A level plane",
      "An upright plane",
      "An inclined plane",
      "A curved surface",
    ],
    0,
  ],
  [
    "Easy",
    "What does a vertical plane mean?",
    [
      "An upright plane",
      "A level plane",
      "An inclined plane",
      "A curved surface",
    ],
    0,
  ],
  [
    "Easy",
    "The instructions ask for plans and elevations at full scale. What is the scale?",
    ["1:1", "1:2", "1:10", "2:1"],
    0,
  ],
  [
    "Easy",
    "How many views are usually drawn together (plan + elevations)?",
    ["Three", "One", "Two", "Four"],
    0,
  ],
  [
    "Easy",
    "What is the function of a normal in drawing an orthogonal projection?",
    [
      "Sets the projection direction",
      "Sets the drawing colour",
      "Sets the paper dimensions",
      "Sets the object’s category",
    ],
    0,
  ],
  [
    "Easy",
    "What does synthesising the plan and elevations mean?",
    [
      "Reconstructing a 3D sketch from the views",
      "Reconstructing a 3D sketch without the views",
      "Finding surface area from view colours",
      "Finding perimeter from vertex labels alone",
    ],
    0,
  ],
  [
    "Easy",
    "A cuboid has a 12 cm × 8 cm plan and a 12 cm × 5 cm front elevation. What is the cuboid’s height?",
    ["5 cm", "8 cm", "12 cm", "20 cm"],
    0,
  ],
  [
    "Medium",
    "In cube PQRSTUVW, PQRS is the bottom face and T, U, V, W are directly above P, Q, R, S respectively. Which set of lines is normal to plane PQRS?",
    ["PT, QU, RV, SW", "PQ, QR, RS, SP", "TU, UV, VW, WT", "PU, QV, RW, ST"],
    0,
  ],
  [
    "Medium",
    "PQ and PR are two intersecting lines in plane α. Line XP passes through P. Which condition is sufficient for XP to be normal to α?",
    [
      "XP ⟂ PQ and XP ⟂ PR",
      "XP ⟂ PQ only",
      "XP is parallel to PQ",
      "XP lies in α",
    ],
    0,
  ],
  [
    "Medium",
    "If the projection line is not perpendicular to the plane, what is the result?",
    [
      "Not an orthogonal projection",
      "A valid orthogonal projection",
      "A valid plan",
      "A valid elevation",
    ],
    0,
  ],
  [
    "Medium",
    "An upright cylinder of diameter 4 cm and height 6 cm stands on a horizontal plane. What shape is its plan?",
    [
      "A circle of diameter 4 cm",
      "A rectangle 4 cm × 6 cm",
      "A triangle",
      "A line of length 6 cm",
    ],
    0,
  ],
  [
    "Medium",
    "An upright cylinder of diameter 4 cm and height 6 cm stands on a horizontal plane. What shape is its side elevation?",
    [
      "A rectangle 4 cm × 6 cm",
      "A circle of diameter 4 cm",
      "A triangle",
      "A circle of diameter 6 cm",
    ],
    0,
  ],
  [
    "Medium",
    "A flat face is parallel to the projection plane. At scale 1:1, what is preserved in the orthogonal projection of that face?",
    [
      "The side lengths and angles of that face",
      "Every length and angle of the entire object",
      "Only the object’s height",
      "No measurements",
    ],
    0,
  ],
  [
    "Medium",
    "Why do side lengths in a projection differ depending on the viewing direction?",
    [
      "Inclined edges are foreshortened",
      "The original object changes shape",
      "The projection scale changes randomly",
      "The actual edge length changes",
    ],
    0,
  ],
  [
    "Medium",
    "A right prism has a uniform triangular cross-section, width 6 cm, depth 8 cm and height 4 cm. When constructing its plan, onto which plane should the vertices be projected?",
    [
      "The horizontal plane",
      "The front vertical plane",
      "The side vertical plane",
      "Any inclined plane",
    ],
    0,
  ],
  [
    "Medium",
    "In a first-angle projection layout, the side view is from right to left. Where is the side elevation placed relative to the front elevation?",
    ["To the left", "To the right", "Above", "Below the plan"],
    0,
  ],
  [
    "Medium",
    "In a first-angle projection layout, the side view is from left to right. Where is the side elevation placed relative to the front elevation?",
    [
      "To the right",
      "To the left",
      "Above the plan",
      "At the centre of the front elevation",
    ],
    0,
  ],
  [
    "Medium",
    "Edge GP is behind the object and hidden in the elevation. Which line type represents GP?",
    [
      "Dashed line",
      "Thick solid line",
      "Thin solid construction line",
      "Dimension line",
    ],
    0,
  ],
  [
    "Medium",
    "What is the function of a thin solid line in drawing an elevation?",
    [
      "A construction guide line",
      "A visible object edge line",
      "A hidden object edge line",
      "A paper boundary line",
    ],
    0,
  ],
  [
    "Medium",
    "A triangular face is parallel to the elevation plane and has a 60° angle. Which method can construct that angle accurately?",
    [
      "A straightedge-and-compass construction",
      "A freehand estimate of the angle",
      "Measuring one side with a ruler",
      "Copying an unchecked perspective sketch",
    ],
    0,
  ],
  [
    "Medium",
    "A cuboid has a plan of 8 cm × 5 cm, front elevation of 8 cm × 3 cm and side elevation of 5 cm × 3 cm, all at scale 1:1. What are its dimensions (width × depth × height)?",
    [
      "8 cm × 5 cm × 3 cm",
      "8 cm × 3 cm × 5 cm",
      "5 cm × 3 cm × 8 cm",
      "3 cm × 8 cm × 5 cm",
    ],
    0,
  ],
  [
    "Medium",
    "Why is consistent labelling important when synthesising projections?",
    [
      "Matching vertices across views",
      "Matching colours across views",
      "Matching labels only for decoration",
      "Matching paper sizes across views",
    ],
    0,
  ],
  [
    "Medium",
    "A stepped prism has width 6 cm, depth 4 cm and maximum height 5 cm. The lower section is 2 cm high. What is the height of the vertical face at the notch?",
    ["3 cm", "2 cm", "5 cm", "7 cm"],
    0,
  ],
  [
    "Medium",
    "A cuboid has front width 7 cm, depth 4 cm and height 3 cm. At scale 1:1, what is the area of its front elevation?",
    ["21 cm²", "28 cm²", "12 cm²", "84 cm²"],
    0,
  ],
  [
    "Medium",
    "A cuboid has front width 7 cm, depth 4 cm and height 3 cm. At scale 1:1, what is the perimeter of its plan?",
    ["22 cm", "20 cm", "14 cm", "28 cm"],
    0,
  ],
  [
    "Medium",
    "What does uniform cross-section mean for a prism?",
    [
      "Equal section shapes and dimensions",
      "Equal shapes, changing dimensions",
      "Equal dimensions, changing shapes",
      "Changing shapes and dimensions",
    ],
    0,
  ],
  [
    "Medium",
    "Why are overlapping vertex labels (e.g. E/D, F/A) used in a projection?",
    [
      "Two vertices at one projected point",
      "Two vertices at different projected points",
      "One vertex with two different colours",
      "One vertex with two different lengths",
    ],
    0,
  ],
  [
    "Hard",
    "Equilateral triangle ABC of side 4 cm lies on an inclined plane. In its plan, ∠ABC becomes 45°. Why is the true 60° angle not preserved?",
    [
      "The triangle plane is inclined to the plan",
      "The triangle plane is parallel to the plan",
      "The original triangle has changed shape",
      "Orthogonal projections always change scale",
    ],
    0,
  ],
  [
    "Hard",
    "Edge AC is 14 cm long and parallel to the projection plane. The projection is drawn at scale 1:2. What is AC’s length on the drawing?",
    ["7 cm", "14 cm", "28 cm", "0 cm"],
    0,
  ],
  [
    "Hard",
    "Rod AB has length 14√2 cm. Its plan at scale 1:1 has length 14 cm. A lies on the horizontal plane and B is above it. How high is B above the plane?",
    ["14 cm", "7 cm", "28 cm", "14√2 cm"],
    0,
  ],
  [
    "Hard",
    "A right prism has an isosceles triangular front cross-section with base 6 cm and height 4 cm. Its depth is 8 cm. At scale 1:1, what are the shape and dimensions of the outer boundary of its plan?",
    [
      "A rectangle 6 cm × 8 cm",
      "A triangle with base 6 cm and height 4 cm",
      "A rectangle 8 cm × 4 cm",
      "A circle of diameter 6 cm",
    ],
    0,
  ],
  [
    "Hard",
    "A stepped prism is made from a 6 cm × 4 cm × 5 cm cuboid. The upper-right notch is 2 cm wide and extends through the full 4 cm depth; the lower section is 2 cm high. What is the remaining volume?",
    ["96 cm³", "120 cm³", "24 cm³", "72 cm³"],
    0,
  ],
  [
    "Hard",
    "A prism’s front cross-section is an isosceles triangle with base 6 cm and height 4 cm. This face is parallel to the front elevation plane. What is the length of each sloping side in the front elevation at scale 1:1?",
    ["5 cm", "10 cm", "√52 cm", "4 cm"],
    0,
  ],
  [
    "Hard",
    "TS is a normal to plane α. TS and ST name lines, not directed vectors. Which statement is true?",
    [
      "TS and ST are the same line",
      "TS and ST are different lines",
      "ST is parallel to plane α",
      "ST is inclined to plane α",
    ],
    0,
  ],
  [
    "Hard",
    "A cuboid’s plan at scale 1:2 is 4 cm × 2.5 cm. Its front elevation height is 1.5 cm at the same scale. What is the actual cuboid volume?",
    ["120 cm³", "15 cm³", "30 cm³", "60 cm³"],
    0,
  ],
  [
    "Hard",
    "In a cuboid’s plan at scale 1:1, vertices T and P coincide at one point. How is line TP related to the plan plane?",
    [
      "Perpendicular to the plan plane",
      "Parallel to the plan plane",
      "Lying in the plan plane",
      "Inclined at 45° to the plan plane",
    ],
    0,
  ],
  [
    "Hard",
    "When checking a cuboid’s plan and elevations at the same scale, which dimensions must match across views?",
    [
      "Width: plan–front; depth: plan–side; height: front–side",
      "Every perspective angle must equal a plan angle",
      "All three views must have the same shape",
      "All hidden edges must be drawn solid",
    ],
    0,
  ],
]);

export const mathF3C7QuizzesDLP: QuizQuestion[] = buildForm3MathQuizSets(
  7,
  mathF3C7QuestionBankDLP,
);
