import type { Flashcard } from "@/data/content";

type FlashcardSeed = [string, string];

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `math-f3-c8-dlp-f${index + 1}`,
    subjectId: "math",
    form: "Form 3",
    chapter: "Chapter 8",
    lang: "dlp",
    front,
    back,
  }));
}

export const mathF3C8FlashcardsDLP: Flashcard[] = buildFlashcards([
  // Deck 1: Locus and Real Situations (Cards 1-20)
  ["What does locus mean?", "A path/trace of a set of points satisfying certain conditions"],
  ["What is the locus of a point on a rotating fan blade?", "Circle"],
  ["What is the locus of a point on a vertically launched rocket?", "Straight line"],
  ["What is the locus of a point on a swinging pendulum?", "Arc"],
  ["What is the 3D locus when a rectangle is rotated 360° about a pole?", "Right cylinder"],
  ["What is the 3D locus when a semicircle is rotated 360° about a pole?", "Sphere"],
  ["What is the 3D locus when a right-angled triangle is rotated 360°?", "Cone"],
  ["Which Greek mathematicians studied locus?", "Apollonius and Pappus"],
  ["What are common 2D locus shapes?", "Straight line, arc, curve"],
  ["What is the locus of a point on a ball rolling on an inclined plane?", "A straight line (along the plane)"],
  ["What is the locus of a point on a moving yo-yo?", "A vertical straight line"],
  ["What is the locus of a point on a child's shoe on a slide?", "An inclined straight line"],
  ["What is an application of locus in badminton?", "Analysing shot/ball path movement"],
  ["What is an application of locus in aviation?", "Satellite movement and flight paths"],
  ["How do you identify a real-life locus?", "Observe the movement of one point on the object"],
  ["What is a common mistake when identifying a locus?", "Confusing the locus with the actual path of a 3D object"],
  ["What is the locus of a point on a landing airplane?", "A descending curve"],
  ["What is the locus of a windshield wiper tip?", "Arc"],
  ["What is the locus of a falling durian fruit?", "A vertical straight line (free fall)"],
  ["What does 'frustum' mean as mentioned in this chapter?", "A 3D shape resulting from a trapezium-shaped locus rotated"],

  // Deck 2: Point and Line Loci (Cards 21-40)
  ["What is the locus of a point at a fixed distance from a fixed point?", "A circle centred at that fixed point"],
  ["What is the locus of a point equidistant from two fixed points?", "Perpendicular bisector"],
  ["Construct the locus of P at 3cm from O. Shape?", "A circle of radius 3cm centred at O"],
  ["Construct the locus of P equidistant from M and N. How?", "Draw the perpendicular bisector of MN"],
  ["X is equidistant from P and R (triangle PQR). Locus of X?", "The perpendicular bisector of PR"],
  ["What is the locus of a point at a fixed distance from a straight line?", "A pair of lines parallel to that line"],
  ["Draw the locus of X moving 3 units from line AB. Result?", "A pair of lines parallel to AB, 3 units away"],
  ["T is 1.5cm from line CD. Locus of T?", "A pair of lines parallel to CD, 1.5cm away"],
  ["How many lines result from the locus at a fixed distance from a line?", "Two (a pair)"],
  ["What is the locus of a point equidistant from two parallel lines?", "A single straight line midway between them"],
  ["Locus of X equidistant from AB and DC. Result?", "A straight line parallel to AB&DC, midway"],
  ["What is the locus of a point equidistant from two intersecting lines?", "Angle bisector"],
  ["X is equidistant from PQ and PN (intersecting at P). Locus of X?", "The bisector of ∠QPN"],
  ["Y is equidistant from AB and AD (square ABCD). Locus of Y?", "The bisector of ∠BAD"],
  ["What tool constructs a perpendicular bisector?", "Compass and ruler"],
  ["What tool constructs an angle bisector?", "Compass"],
  ["Coordinates (0,0),(-2,-2),(4,4) are connected. What is this locus?", "The bisector of the angle between the x-axis and y-axis (45°)"],
  ["What is the value of ∠a=∠b=∠c=∠d in the 45° axis locus?", "45°"],
  ["What is a common mistake between perpendicular and angle bisectors?", "Confusing the two locus types"],
  ["How do you identify the correct locus type?", "Read the condition: 'distance from a point' or 'distance from a line'"],

  // Deck 3: Combined Loci and Problems (Cards 41-60)
  ["How do you determine a locus with two conditions?", "Draw each locus separately on the same diagram"],
  ["What symbol is typically used to mark a locus intersection?", "⊗"],
  ["X is 7 units from A; Y is equidistant from AB,CD. How do you find the intersection?", "Draw both loci on the same diagram, identify where they meet"],
  ["What is the challenge of a locus within a restricted area (e.g. inside a square)?", "Only draw the part of the locus within the area's boundary"],
  ["Faruk is equidistant from x,y axes and <5 units from O. What is his locus?", "The angle bisector (45°) within a range of <5 units from O"],
  ["Boat V moves 5 units from D; boat W is 3 units from BC. How do you find where their paths intersect?", "Draw both loci on the same diagram"],
  ["P moves equidistant from A and D (square ABCD). Locus of P?", "The perpendicular bisector of AD"],
  ["Q moves equidistant from B and D. Locus of Q?", "The perpendicular bisector of BD"],
  ["R moves 4 units from line BC. Locus of R?", "A pair of lines parallel to BC, 4 units away"],
  ["S moves equidistant from AB and BC. Locus of S?", "The bisector of ∠ABC"],
  ["T moves 4 units from line EG. Locus of T?", "A pair of lines parallel to EG, 4 units away"],
  ["What is a tip when reading a locus question?", "Carefully identify the condition before drawing"],
  ["Why is compass precision important?", "The locus must be geometrically exact for an accurate intersection"],
  ["What should be checked after drawing a combined locus?", "Ensure all conditions are satisfied simultaneously at the intersection point"],
  ["What is a real-life application of combined loci?", "Determining a location satisfying multiple conditions (e.g. a person's position)"],
  ["What is the key difference between a perpendicular bisector and an angle bisector as loci?", "Perpendicular bisector is for 2 points; angle bisector is for 2 intersecting lines"],
  ["How is a 3D locus related to a 2D locus?", "A 3D locus results from a 2D shape rotated 360° about an axis"],
  ["What is the mistake if you assume the locus equidistant from 2 parallel lines is two lines?", "Incorrect; it is only ONE line midway between them"],
  ["What is the first step in solving a complex locus problem?", "Identify each condition and its corresponding locus type"],
  ["What is the final step in solving a combined locus problem?", "Mark all intersection points satisfying all conditions"],
]);
