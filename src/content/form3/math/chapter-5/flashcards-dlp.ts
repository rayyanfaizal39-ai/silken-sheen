import type { Flashcard } from "@/data/content";

type FlashcardSeed = [string, string];

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `math-f3-c5-dlp-f${index + 1}`,
    subjectId: "math",
    form: "Form 3",
    chapter: "Chapter 5",
    lang: "dlp",
    front,
    back,
  }));
}

export const mathF3C5FlashcardsDLP: Flashcard[] = buildFlashcards([
  // Deck 1: Sides and Basic Definitions (Cards 1-20)
  ["What is the hypotenuse?", "The longest side, opposite the 90° angle"],
  ["Does the hypotenuse change with the referenced acute angle?", "No, its position is fixed"],
  ["What is the opposite side?", "The side opposite the referenced acute angle"],
  ["What is the adjacent side?", "The side next to the acute angle (not the hypotenuse)"],
  ["What is the formula for sin θ?", "Opposite side / hypotenuse"],
  ["What is the formula for cos θ?", "Adjacent side / hypotenuse"],
  ["What is the formula for tan θ?", "Opposite side / adjacent side"],
  ["What is the relationship of tan θ to sin and cos?", "tan θ = sin θ / cos θ"],
  ["Why are trig ratios the same for the same angle regardless of triangle size?", "The triangles are similar (same angles, proportional sides)"],
  ["Right-angled PQR, PQ=15, QR=8. Find PR.", "17 cm"],
  ["From the above, sin∠PRQ?", "15/17"],
  ["From the above, cos∠PRQ?", "8/17"],
  ["From the above, tan∠QPR?", "8/15"],
  ["If sin θ=0.6, cos θ=0.8, find tan θ.", "0.75"],
  ["What happens to sin θ as θ increases from 0°-90°?", "Increases toward 1"],
  ["What happens to cos θ as θ increases from 0°-90°?", "Decreases toward 0"],
  ["What happens to tan θ as θ approaches 90°?", "Increases toward infinity"],
  ["What is a common mistake when identifying sides?", "Confusing the adjacent side with the hypotenuse"],
  ["Can the opposite side become the adjacent side?", "Yes, depending on the referenced acute angle"],
  ["What does 'acute angle' mean?", "An angle between 0° and 90°"],

  // Deck 2: Special Angles and Calculator (Cards 21-40)
  ["What is the value of sin 30°?", "1/2"],
  ["What is the value of cos 30°?", "√3/2"],
  ["What is the value of tan 30°?", "1/√3"],
  ["What is the value of sin 45°?", "1/√2"],
  ["What is the value of cos 45°?", "1/√2"],
  ["What is the value of tan 45°?", "1"],
  ["What is the value of sin 60°?", "√3/2"],
  ["What is the value of cos 60°?", "1/2"],
  ["What is the value of tan 60°?", "√3"],
  ["How do you derive the value for 45° without a calculator?", "Use an isosceles right-angled triangle (sides 1,1,√2)"],
  ["How do you derive the value for 30°/60° without a calculator?", "Bisect an equilateral triangle (sides 2,1,√3)"],
  ["Find sin45°+cos45°.", "√2"],
  ["Find 3cos30°-2sin60°.", "√3/2"],
  ["1° equals how many minutes?", "60 minutes"],
  ["Convert 30.2° to degrees-minutes.", "30° 12'"],
  ["Convert 43°30' to decimal degrees.", "43.5°"],
  ["If sin x=0.8377, find x.", "56.9° or 56°54'"],
  ["What is the calculator button for degree-minute?", "°' ''"],
  ["What is the correct calculator mode for degree angles?", "Deg mode"],
  ["When do you round seconds up to minutes?", "If the seconds value is ≥30, add 1 minute"],

  // Deck 3: Solving Problems (Cards 41-60)
  ["A ladder leans against a wall at 50°, height 2.5m. Length of ladder?", "3.26 m"],
  ["What is the general formula for ladder length given angle and height?", "Length = height / sin(angle)"],
  ["Cuboid: BC=8, CH=5, HE=4. FG=EH=?", "4 cm"],
  ["From the cuboid above, CG=√(8²+5²)=?", "√89 cm"],
  ["From the cuboid above, tan∠FCG=?", "4/√89"],
  ["From the cuboid above, ∠FCG=?", "22.98° or 22°59'"],
  ["What is an angle of elevation used for?", "Measuring an object's height from a lower viewpoint"],
  ["What is an angle of depression used for?", "Measuring a distance/height looking down from a higher viewpoint"],
  ["Aisyah views a pole at an elevation of 55°, distance 145m. Horizontal distance d?", "d=145cos55°≈83.1m"],
  ["A ship viewed from a lighthouse at a depression angle of 41°, horizontal distance 200m. Lighthouse height?", "h=200tan41°≈173.9m"],
  ["What instrument actually measures long-distance angles?", "Theodolite"],
  ["What is the first step in solving a complex trigonometry problem?", "Identify the relevant right-angled triangle"],
  ["What is the step after identifying the triangle?", "Determine the known sides and choose the appropriate sin/cos/tan ratio"],
  ["How do you solve a problem with two connected right-angled triangles?", "Solve one triangle first to get the shared side, then solve the second triangle"],
  ["What is an application of trigonometry in river measurement?", "Measuring a river's width without crossing it"],
  ["Which fields widely use trigonometry?", "Navigation, aviation, engineering, astronomy"],
  ["If tan θ=1, what type of triangle is represented?", "An isosceles right-angled triangle (45°-45°-90°)"],
  ["What is a common mistake when choosing a trig ratio?", "Using cos when sin should be used, or vice versa"],
  ["What is a check after finding an angle answer?", "Make sure the angle is reasonable (between 0°-90° for an acute angle)"],
  ["How do you convert degrees-minutes-seconds to decimal?", "Degrees + (minutes/60) + (seconds/3600)"],
]);
