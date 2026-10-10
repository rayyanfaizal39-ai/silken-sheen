import type { Difficulty, QuizQuestion } from "@/data/content";

import { MATH_F3_C5_QUIZ_VISUALS } from "./quiz-visuals";
import { MATH_F3_C5_QUIZ_EXPLANATIONS } from "./quiz-explanations";

import { buildForm3MathQuizSets } from "../quiz-sets";

type QuizSeed = [Difficulty, string, [string, string, string, string], number];

function buildQuiz(items: QuizSeed[]): QuizQuestion[] {
  return items.map(([difficulty, question, options, answerIndex], index) => ({
    id: `math-f3-c5-dlp-q${index + 1}`,
    subjectId: "math",
    form: "Form 3",
    difficulty,
    chapter: "Chapter 5",
    lang: "dlp",
    question,
    options,
    answerIndex,
    mathNotation: "indices",
    visual: MATH_F3_C5_QUIZ_VISUALS[index + 1],
    explanation: MATH_F3_C5_QUIZ_EXPLANATIONS[index + 1].dlp,
  }));
}

export const mathF3C5QuestionBankDLP: QuizQuestion[] = buildQuiz([
  ["Easy", "What is the hypotenuse in a right-angled triangle?", ["The longest side, opposite the 90° angle", "The shortest side", "The side adjacent to the acute angle", "Only the horizontal side"], 0],
  ["Easy", "What is the formula for sin θ?", ["Opposite side / hypotenuse", "Adjacent side / hypotenuse", "Opposite side / adjacent side", "Hypotenuse / opposite side"], 0],
  ["Easy", "What is the formula for cos θ?", ["Adjacent side / hypotenuse", "Opposite side / hypotenuse", "Opposite side / adjacent side", "Hypotenuse / adjacent side"], 0],
  ["Easy", "What is the formula for tan θ?", ["Opposite side / adjacent side", "Adjacent side / hypotenuse", "Opposite side / hypotenuse", "Hypotenuse / opposite side"], 0],
  ["Easy", "What is the formula for tan θ in terms of sin and cos?", ["tan θ = sin θ / cos θ", "tan θ = cos θ / sin θ", "tan θ = sin θ x cos θ", "tan θ = sin θ + cos θ"], 0],
  ["Easy", "What is the value of sin 30°?", ["1/2", "√3/2", "1", "1/√2"], 0],
  ["Easy", "What is the value of cos 60°?", ["1/2", "√3/2", "1", "0"], 0],
  ["Easy", "What is the value of tan 45°?", ["1", "0", "√3", "1/√3"], 0],
  ["Easy", "What is the value of sin 45°?", ["1/√2", "1/2", "√3/2", "1"], 0],
  ["Easy", "What is the value of tan 30°?", ["1/√3", "√3", "1", "1/2"], 0],
  ["Easy", "What is the value of tan 60°?", ["√3", "1/√3", "1", "√3/2"], 0],
  ["Easy", "In angular measurement, how many arcminutes (′) equal 1°?", ["60′", "100′", "30′", "1′"], 0],
  ["Easy", "Convert 43° 30' to degrees.", ["43.5°", "43.3°", "44°", "43.03°"], 0],
  ["Easy", "What happens to sin θ as θ increases from 0° to 90°?", ["Increases toward 1", "Decreases toward 0", "Stays the same", "Decreases toward -1"], 0],
  ["Easy", "What happens to cos θ as θ increases from 0° to 90°?", ["Decreases toward 0", "Increases toward 1", "Stays the same", "Increases without bound"], 0],
  ["Easy", "As θ approaches 90° from below, how does tan θ change?", ["Increases without bound", "Decreases to 0", "Stays at 1", "Becomes negative"], 0],
  ["Easy", "Triangle PQR is right-angled at Q, with PQ = 15 cm and QR = 8 cm. Find PR.", ["17 cm", "23 cm", "7 cm", "13 cm"], 0],
  ["Easy", "Triangle PQR is right-angled at Q, with PQ = 15 cm and QR = 8 cm. Find sin∠PRQ.", ["15/17", "8/17", "8/15", "17/15"], 0],
  ["Easy", "If sin θ=0.6 and cos θ=0.8, find tan θ.", ["0.75", "1.33", "0.48", "1.4"], 0],
  ["Easy", "What is the correct calculator mode for degree trigonometry?", ["Deg mode (degrees)", "Rad mode (radians)", "Grad mode", "It does not matter"], 0],

  ["Medium", "Triangle PQR is right-angled at Q, PR = 20 cm and sin∠QPR = 3/5. Find QR.", ["12 cm", "16 cm", "20 cm", "8 cm"], 0],
  ["Medium", "Triangle PQR is right-angled at Q, with PR = 20 cm and QR = 12 cm. Find PQ using Pythagoras’ theorem.", ["16 cm", "12 cm", "24 cm", "8 cm"], 0],
  ["Medium", "Triangle PQR is right-angled at Q, with PR = 20 cm and QR = 12 cm. Find cos∠QPR.", ["4/5", "3/5", "3/4", "4/3"], 0],
  ["Medium", "θ is acute. If sin θ = 3/8 and tan θ = 3/√55, find cos θ.", ["√55/8", "8/√55", "3/√55", "√55/3"], 0],
  ["Medium", "Find sin45°+cos45° without a calculator.", ["√2", "1", "2", "1/√2"], 0],
  ["Medium", "Find 3cos30°-2sin60°.", ["√3/2", "√3", "3√3/2", "0"], 0],
  ["Medium", "Find 2tan45°-2cos60°.", ["1", "2", "0", "1.5"], 0],
  ["Medium", "Find (2sin60°)(4cos30°)-4tan60°.", ["6-4√3", "6+4√3", "2-4√3", "4√3-6"], 0],
  ["Medium", "Convert 30.2° to degrees and minutes.", ["30° 12'", "30° 20'", "30° 2'", "30° 30'"], 0],
  ["Medium", "x is acute and sin x = 0.8377. Find x to 1 decimal place.", ["56.9°", "33.1°", "60.0°", "45.0°"], 0],
  ["Medium", "x is acute and cos x = 0.7021. Find x to 1 decimal place.", ["45.4°", "44.6°", "30.0°", "60.0°"], 0],
  ["Medium", "Ladder PR leans against wall QR. Q is the right angle, QR = 2.5 m, and the ladder makes 50° with floor PQ. Find the ladder length to 2 decimal places.", ["3.26 m", "1.91 m", "2.5 m", "3.91 m"], 0],
  ["Medium", "On a cuboid face, triangle CHG is right-angled at H, with CH = 5 cm and HG = 8 cm. Find diagonal CG.", ["√89 cm", "13 cm", "√41 cm", "9 cm"], 0],
  ["Medium", "Triangle FCG is right-angled at G, with FG = 4 cm and CG = √89 cm. Find tan∠FCG.", ["4/√89", "√89/4", "5/4", "4/5"], 0],
  ["Medium", "Triangle FCG is right-angled at G, with FG = 4 cm and CG = √89 cm. Find ∠FCG to 2 decimal places.", ["22.98°", "30.00°", "45.00°", "60.00°"], 0],
  ["Medium", "A folding ladder forms isosceles triangle PQR with PQ = QR, ∠PQR = 38° and PR = 1.4 m. T is the midpoint of PR. Find PQ to 2 decimal places.", ["2.15 m", "1.40 m", "0.70 m", "2.80 m"], 0],
  ["Medium", "The angle of elevation from Aisyah’s eye to the top of a lamp post is 55°. The line-of-sight distance is 145 m. Find the horizontal distance to 1 decimal place.", ["83.2 m", "118.8 m", "207.1 m", "145.0 m"], 0],
  ["Medium", "From the top of a lighthouse, the angle of depression to a ship is 41°. The ship is 200 m horizontally from its base. Assume a level sea surface. Find the lighthouse height to 1 decimal place.", ["173.9 m", "131.2 m", "150.9 m", "200.0 m"], 0],
  ["Medium", "Triangle PQR is right-angled at R. PQ = 10 cm and ∠PQR = 60°. Find QR.", ["5 cm", "10 cm", "8.66 cm", "2.5 cm"], 0],
  ["Medium", "Triangle PRS is right-angled at R, SR = √75 cm and PR = 15 cm. Find hypotenuse PS to 2 decimal places.", ["17.32 cm", "15.00 cm", "20.00 cm", "10.00 cm"], 0],

  ["Hard", "PQRS is a rectangle with PQ = 12 cm and QR = 7 cm. QS is a diagonal. Find tan∠PQS.", ["7/12", "12/7", "1", "12/√193"], 0],
  ["Hard", "PQRS is a rectangle with PQ = 12 cm and QR = 7 cm. Find diagonal QS.", ["√193 cm", "19 cm", "12 cm", "7 cm"], 0],
  ["Hard", "Regular hexagon PQRSTU has its vertices labelled consecutively around its boundary. Find ∠PTS.", ["90°", "60°", "30°", "120°"], 0],
  ["Hard", "Regular hexagon PQRSTU has consecutive vertices and side length 6 cm. Find diagonal PS joining opposite vertices.", ["12 cm", "6√3 cm", "6 cm", "9 cm"], 0],
  ["Hard", "Rectangle ABCD, AB=8cm, BC=16cm (2xAB), N is the midpoint of BC. Find BN.", ["8 cm", "16 cm", "4 cm", "12 cm"], 0],
  ["Hard", "M lies on side AD of a rectangle. AD = 16 cm and MD = (1/4)AD. Find AM.", ["12 cm", "4 cm", "8 cm", "16 cm"], 0],
  ["Hard", "Find 8sin60°-3tan60° without a calculator.", ["√3", "5√3", "√3/2", "0"], 0],
  ["Hard", "Find (tan30°)(2cos30°)+6sin30°.", ["4", "4√3", "1", "6"], 0],
  ["Hard", "Find (8cos45°)(sin60°)+(8sin45°)(cos30°).", ["4√6", "16", "8√2", "4√3"], 0],
  ["Hard", "Triangle PQR is right-angled at Q, QR = 18 cm and tan∠QPR = 3/4. Find PQ.", ["24 cm", "18 cm", "13.5 cm", "30 cm"], 0],
  ["Hard", "Triangle ABC is right-angled at B, AB = 21 cm and sin∠BAC = 3/5. Find hypotenuse AC.", ["26.25 cm", "15.75 cm", "35 cm", "12.6 cm"], 0],
  ["Hard", "Triangle ABC is right-angled at B. If sin∠BAC = 3/5, find ∠BAC to the nearest degree.", ["37°", "53°", "30°", "60°"], 0],
  ["Hard", "A right-angled triangle has opposite side 3 units, adjacent side 4 units and hypotenuse 5 units relative to θ. Find θ to 2 decimal places.", ["36.87°", "45.00°", "60.00°", "30.00°"], 0],
  ["Hard", "Triangle DEF is right-angled at E. P lies on DF and EP is perpendicular to DF. If DP = 12 cm and EP = 5 cm, find sin∠EDP.", ["5/13", "5/12", "12/13", "13/5"], 0],
  ["Hard", "Why do trigonometric ratios for the same angle stay the same even when triangle sizes differ?", ["The triangles are similar (same angles, proportional sides)", "Because the hypotenuse is always the same length", "Because the 90° angle changes", "It is purely coincidental"], 0],
]);

export const mathF3C5QuizzesDLP: QuizQuestion[] = buildForm3MathQuizSets(5, mathF3C5QuestionBankDLP);
