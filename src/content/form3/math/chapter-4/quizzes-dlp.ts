import type { Difficulty, QuizQuestion } from "@/data/content";

import { MATH_F3_C4_QUIZ_VISUALS } from "./quiz-visuals";
import { MATH_F3_C4_QUIZ_EXPLANATIONS } from "./quiz-explanations";

import { buildForm3MathQuizSets } from "../quiz-sets";

type QuizSeed = [Difficulty, string, [string, string, string, string], number];

function buildQuiz(items: QuizSeed[]): QuizQuestion[] {
  return items.map(([difficulty, question, options, answerIndex], index) => ({
    id: `math-f3-c4-dlp-q${index + 1}`,
    subjectId: "math",
    form: "Form 3",
    difficulty,
    chapter: "Chapter 4",
    lang: "dlp",
    question,
    options,
    answerIndex,
    mathNotation: "indices",
    visual: MATH_F3_C4_QUIZ_VISUALS[index + 1],
    explanation: MATH_F3_C4_QUIZ_EXPLANATIONS[index + 1].dlp,
  }));
}

export const mathF3C4QuestionBankDLP: QuizQuestion[] = buildQuiz([
  [
    "Easy",
    "What is a scale drawing?",
    [
      "Drawing measurements proportional to the object",
      "Drawing measurements always equal to the object",
      "Drawing measurements unrelated to the object",
      "Drawing measurements increased by a fixed amount",
    ],
    0,
  ],
  ["Easy", "What is the formula for scale?", ["Scale drawing measurement / Object measurement", "Object measurement / Scale drawing measurement", "Drawing measurement + object measurement", "Drawing measurement - object measurement"], 0],
  ["Easy", "In the scale 1:n, n is positive. What does this scale mean?", ["1 drawing unit represents n object units", "n drawing units represent 1 object unit", "The drawing and object always have equal areas", "The drawing is always smaller than the object"], 0],
  ["Easy", "For scale 1:n with 0 < n < 1, how does the drawing compare with the object?", ["Larger than the object", "Smaller than the object", "Same as the object", "Cannot be determined"], 0],
  ["Easy", "For scale 1:n with n > 1, how does the drawing compare with the object?", ["Smaller than the object", "Larger than the object", "Same as the object", "Cannot be determined"], 0],
  [
    "Easy",
    "For scale 1:n with n = 1, how does the drawing compare with the object?",
    ["Same size", "Larger size", "Smaller size", "Undetermined size"],
    0,
  ],
  ["Easy", "Do angles change in a scale drawing?", ["No, angles remain the same", "Yes, angles change according to scale", "Sometimes they change", "Only change if n=1"], 0],
  ["Easy", "On the drawing, P′Q′ = 2 cm; on the object, PQ = 4 cm. Find the drawing:object scale.", ["1 : 2", "2 : 1", "1 : 4", "4 : 1"], 0],
  ["Easy", "On the drawing, K′L′ = 9 cm; on the object, KL = 3 cm. Find the scale in the form n:1.", ["3 : 1", "1 : 3", "9 : 1", "1 : 9"], 0],
  ["Easy", "Map scale 1cm:10km. Map distance 2cm. Find the actual distance.", ["20 km", "10 km", "5 km", "2 km"], 0],
  ["Easy", "Scale 1:300 000. Map distance 3cm. Find the actual distance (km).", ["9 km", "3 km", "30 km", "300 km"], 0],
  ["Easy", "The actual distance calculated from a map scale is in cm. To give the answer in km, which conversion is needed?", ["cm to km", "kg to g", "litres to ml", "seconds to minutes"], 0],
  ["Easy", "1 km is equal to how many cm?", ["100 000 cm", "1 000 cm", "10 000 cm", "1 000 000 cm"], 0],
  ["Easy", "The object and drawing use equal-sized grids. An object side spans 4 grid units; its corresponding drawing side spans 2. Find the scale.", ["1 : 2", "2 : 1", "1 : 4", "1 : 1"], 0],
  [
    "Easy",
    "For grids of different sizes with the same number of side units, what is used to find the scale?",
    [
      "Grid-square side length",
      "Number of grid squares",
      "Total area of the grid",
      "Total perimeter of the grid",
    ],
    0,
  ],
  ["Easy", "Khairul draws a square at scale 1:1/3. The actual side is 6cm. Find the drawing's side.", ["18 cm", "2 cm", "6 cm", "3 cm"], 0],
  ["Easy", "The drawing:object scale is 1:n. If the drawing area is A, what is the object area?", ["n²A", "nA", "A/n", "A/n²"], 0],
  ["Easy", "A room drawing has length 7 cm and width 5 cm at scale 1:400. Find the actual width in m.", ["20 m", "28 m", "2 000 m", "0.05 m"], 0],
  [
    "Easy",
    "A 1:200 scale drawing represents an actual length of 40 m. What is the drawing length in cm?",
    ["20 cm", "2 cm", "200 cm", "80 cm"],
    0,
  ],
  ["Easy", "What feature is preserved in a scale drawing?", ["Shape (same angles)", "Size (same dimensions)", "Colour", "Material"], 0],

  ["Medium", "Drawing grid 2cm, object grid 1cm, same number of side units. Determine the scale in the form 1:n.", ["1 : 0.5", "1 : 2", "1 : 4", "1 : 1"], 0],
  ["Medium", "Drawing grid squares have side 0.5 cm; object grid squares have side 1 cm. Corresponding sides span the same number of squares. Find the scale in the form 1:n.", ["1 : 2", "1 : 0.5", "2 : 1", "0.5 : 0.5"], 0],
  ["Medium", "On the drawing, triangle K′L′N′ is right-angled at L′, with K′L′ = 1.5 cm and L′N′ = 2 cm. The corresponding object side KN is 5 cm. Find the scale in the form 1:n.", ["1 : 2", "1 : 0.5", "1 : 5", "1 : 4"], 0],
  ["Medium", "Johor map scale 1cm:10km, Kluang-Ayer Hitam distance 2cm on the map. Find the actual distance.", ["20 km", "10 km", "2 km", "12 km"], 0],
  ["Medium", "A poster 24cm long and 8cm wide is drawn at scale 1:4. Find the scale drawing's length.", ["6 cm", "96 cm", "24 cm", "4 cm"], 0],
  ["Medium", "A poster measures 24 cm × 8 cm and is drawn at scale 1:4. Find the drawing’s width.", ["2 cm", "8 cm", "32 cm", "4 cm"], 0],
  ["Medium", "Map scale 1:400 000, river measures 2.5cm on the map. Find the actual distance (km).", ["10 km", "4 km", "100 km", "1 km"], 0],
  ["Medium", "Siew Lin draws a triangle at scale 1:1/3, the drawing's hypotenuse is 18cm. Find the actual hypotenuse.", ["6 cm", "54 cm", "3 cm", "18 cm"], 0],
  ["Medium", "A rectangular room 7cm x 5cm at scale 1:400. Find the actual area (m²).", ["560 m²", "35 m²", "1 400 m²", "280 m²"], 0],
  ["Medium", "A regular polygon has exterior angle 36° and actual side length 10 cm. At scale 1:5, find the drawing perimeter.", ["20 cm", "50 cm", "100 cm", "10 cm"], 0],
  ["Medium", "A room 3.5m x 5.2m, scale drawing 1:50. Find the drawing's perimeter in cm.", ["34.8 cm", "17.4 cm", "69.6 cm", "350 cm"], 0],
  ["Medium", "A rectangular field at scale 1:2000; if the drawing measures 3cm x 6cm, find the actual area (m²).", ["7 200 m²", "3 600 m²", "18 m²", "360 m²"], 0],
  [
    "Medium",
    "A rectangular field is drawn as 3 cm × 6 cm at scale 1:2000. Grass is mowed at 400 m² every 8 minutes. Find the time to mow the whole field.",
    ["144 minutes", "100 minutes", "72 minutes", "200 minutes"],
    0,
  ],
  ["Medium", "Bintulu-Miri is 4cm on a map at scale 1cm:50km. Find the actual distance.", ["200 km", "50 km", "150 km", "20 km"], 0],
  ["Medium", "The actual Bintulu–Miri distance is 200 km. A new map uses scale 1:2 000 000. Find the map distance in cm.", ["10 cm", "4 cm", "20 cm", "100 cm"], 0],
  [
    "Medium",
    "The Bintulu–Miri journey is 200 km. At an average speed of 80 km/h, find the travel time.",
    ["2.5 hours", "2 hours", "3 hours", "1.5 hours"],
    0,
  ],
  ["Medium", "A storeroom on a drawing at scale 1:400 measures 2cm x 3cm. Find the actual area (m²).", ["96 m²", "24 m²", "600 m²", "48 m²"], 0],
  ["Medium", "A cuboid-shaped building has a base measuring 8 m × 12 m and height 3.75 m. Find its volume.", ["360 m³", "96 m³", "45 m³", "180 m³"], 0],
  ["Medium", "A flower drawing uses grid squares of side 1 cm; the object uses squares of side 1.5 cm. Corresponding sides span the same number of squares. Find the drawing:object scale in the form 1:n.", ["1 : 1.5", "1 : 0.5", "1 : 1", "1 : 3"], 0],
  ["Medium", "A flower drawing uses grid squares of side 1 cm; the object uses squares of side 0.5 cm. Corresponding sides span the same number of squares. Find the drawing:object scale in the form 1:n.", ["1 : 0.5", "1 : 2", "1 : 1", "1 : 4"], 0],

  ["Hard", "Triangle P is a scale drawing of triangle Q. Area P = 112.5 cm² and area Q = 4.5 cm². If the scale P:Q is 1:n, find n.", ["0.2", "5", "25", "0.04"], 0],
  ["Hard", "A circle centred at O has a diameter of 6cm on the drawing, scale 1:3. Find the actual diameter.", ["18 cm", "2 cm", "9 cm", "6 cm"], 0],
  ["Hard", "Kuching–Kota Kinabalu measures 5.4 cm on a map at scale 1 cm:150 km. A flight lasts from 12:40 to 14:10 on the same day. Assume its distance equals the converted map distance. Find its average speed.", ["540 km/h", "810 km/h", "270 km/h", "150 km/h"], 0],
  ["Hard", "Tile A measures 30 cm × 30 cm and costs RM2.80; tile B measures 50 cm × 50 cm and costs RM6. Ignore waste and fitting costs. Which tile is cheaper per m²?", ["Tile B", "Tile A", "Both cost the same", "Cannot be determined"], 0],
  ["Hard", "A circular pond drawing has radius 2 cm at scale 1:2000. Find the actual area in m² to 1 decimal place. Use π = 22/7.", ["5 028.6 m²", "12.6 m²", "400.0 m²", "1 600.0 m²"], 0],
  ["Hard", "A rectangular football field measures 7 cm × 12 cm on a drawing at scale 1:1000. Find its actual area.", ["8 400 m²", "84 m²", "840 m²", "10 080 m²"], 0],
  ["Hard", "An actual field measures 70 m × 120 m. Of these scales, choose the largest drawing that fits on 21 cm × 29.7 cm A4 paper. Ignore margins.", ["1 : 500", "1 : 400", "1 : 1000", "1 : 2000"], 0],
  ["Hard", "Half of a 70 m × 120 m field is allocated to 5 m × 4 m tents. Ignore paths, gaps and packing arrangements. Estimate the number of tents using area only.", ["210 tents", "10 tents", "100 tents", "50 tents"], 0],
  ["Hard", "Tent rental is RM100/day, 25% discount if rented for 5 days or more, rented for a week (7 days). Find the total rental per tent.", ["RM525", "RM700", "RM600", "RM525.50"], 0],
  ["Hard", "Rectangle S measures 3 cm × 5 cm and rectangle T measures 6 cm × 10 cm. Find the ratio of corresponding side lengths S:T.", ["1 : 2", "2 : 1", "1 : 4", "4 : 1"], 0],
  ["Hard", "Rectangle S measures 3 cm × 5 cm and rectangle T measures 6 cm × 10 cm. Find the area ratio S:T.", ["1 : 4", "1 : 2", "1 : 8", "1 : 16"], 0],
  ["Hard", "What is the correct conclusion about the ratio of areas compared to the ratio of lengths in a scale drawing?", ["Area ratio = (length ratio)²", "Area ratio = length ratio", "Area ratio = 2 x length ratio", "There is no relationship"], 0],
  ["Hard", "For a three-dimensional shape, how is the volume ratio related to the length scale ratio?", ["Volume ratio = (length ratio)³", "Volume ratio = length ratio", "Volume ratio = (length ratio)²", "There is no relationship"], 0],
  [
    "Hard",
    "At scale 1:400, a student multiplies the drawing area by 400 to find the object area. Using the same area units, what correction is needed?",
    [
      "Multiply by 400²",
      "Multiply by 400",
      "Divide by 400²",
      "Multiply by 2 × 400",
    ],
    0,
  ],
  ["Hard", "A storeroom drawing measures 2 cm × 3 cm at scale 1:400. A shop footprint measures 8 m × 12 m. Find the ratio of the shop area to the actual storeroom area.", ["1 : 1", "10 : 1", "4 : 1", "2 : 1"], 0],
]);

export const mathF3C4QuizzesDLP: QuizQuestion[] = buildForm3MathQuizSets(4, mathF3C4QuestionBankDLP);
