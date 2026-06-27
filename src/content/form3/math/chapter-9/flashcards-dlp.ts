import type { Flashcard } from "@/data/content";

type FlashcardSeed = [string, string];

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `math-f3-c9-dlp-f${index + 1}`,
    subjectId: "math",
    form: "Form 3",
    chapter: "Chapter 9",
    lang: "dlp",
    front,
    back,
  }));
}

export const mathF3C9FlashcardsDLP: Flashcard[] = buildFlashcards([
  // Deck 1: y=mx+c and Other Forms (Cards 1-20)
  ["What does m mean in y=mx+c?", "Gradient"],
  ["What does c mean in y=mx+c?", "y-intercept"],
  ["Find the gradient of y=2x+9.", "2"],
  ["Find the y-intercept of y=2x+9.", "9"],
  ["What is the gradient of line y=6?", "0"],
  ["What is the gradient of line x=2?", "Undefined"],
  ["Line y=h is parallel to which axis?", "x-axis"],
  ["Line x=h is parallel to which axis?", "y-axis"],
  ["What does a mean in x/a+y/b=1?", "x-intercept"],
  ["What does b mean in x/a+y/b=1?", "y-intercept"],
  ["Convert 2x+3y=12 to x/a+y/b=1.", "x/6 + y/4 = 1"],
  ["Convert 2x+3y=12 to y=mx+c.", "y = -2/3x + 4"],
  ["What must the coefficient of y be in y=mx+c?", "+1"],
  ["3y=-2x+12. Gradient?", "-2/3"],
  ["3y=-2x+12. y-intercept?", "4"],
  ["Convert x/6+y/3=1 to ax+by=c.", "x + 2y = 6"],
  ["How do you convert x/a+y/b=1 to ax+by=c?", "Multiply by the LCM of a and b"],
  ["Who is the father of Greek geometry?", "Euclid"],
  ["What is the graph of a linear function y=mx+c?", "A straight line"],
  ["What other general forms exist besides y=mx+c?", "ax+by=c and x/a+y/b=1"],

  // Deck 2: Point on a Line and Parallel Lines (Cards 21-40)
  ["How do you check if a point lies on a line?", "Substitute coordinates, check LHS=RHS"],
  ["P(2,8), y=3x+2. Does P lie on the line?", "Yes (3(2)+2=8)"],
  ["P(-4,2), 3x-2y=12. Does P lie on the line?", "No (-16≠12)"],
  ["What is the condition for two lines to be parallel?", "Both gradients are equal"],
  ["Is y=3x+5 parallel to 6x-2y=9?", "Yes (equal gradient=3)"],
  ["Is y=3x+8 parallel to 6y=3x-9?", "No (gradient 3 vs 1/2)"],
  ["4x+3y=18 is parallel to 2x+hy=20. Find h.", "h = 3/2"],
  ["What is the gradient formula for two points?", "(y2-y1)/(x2-x1)"],
  ["Find the gradient through (-1,5) and (2,-7).", "-4"],
  ["What does it mean if two lines have the same gradient?", "The lines are parallel"],
  ["3x+5y=15. x-intercept (h)?", "5"],
  ["3x+5y=15. y-intercept (k)?", "3"],
  ["What is the gradient formula from intercepts?", "Gradient = -(y-intercept/x-intercept)"],
  ["For 3x+5y=15, what is the gradient?", "-3/5"],
  ["What is a common mistake when reading the gradient?", "Forgetting to convert the y coefficient to +1 first"],
  ["How do you confirm two lines are NOT parallel?", "Compare gradients; if different, not parallel"],
  ["2x+3y=3 and 2x+6y=12. Parallel?", "No (gradient -2/3 vs -1/3)"],
  ["y=2x+1 and 8x-4y=5. Parallel?", "Yes (gradient 2 and 2)"],
  ["What does 'undefined gradient' mean?", "A vertical line (parallel to the y-axis)"],
  ["What does 'zero gradient' mean?", "A horizontal line (parallel to the x-axis)"],

  // Deck 3: Equation of a Line and Intersection Point (Cards 41-60)
  ["What is the basic straight line equation formula?", "y = mx + c"],
  ["How do you find a line's equation given the gradient and one point?", "Substitute m, x, y into y=mx+c to find c"],
  ["Find the equation of a line with gradient 1/2 through (6,8).", "y = (1/2)x + 5"],
  ["How do you find a line's equation through two points?", "Find m first, then find c using one point"],
  ["Find the equation of a line through (-1,5) and (2,-7).", "y = -4x + 1"],
  ["Find the equation of a line parallel to y=-2x+6 through (5,4).", "y = -2x + 14"],
  ["What are the two methods to find a point of intersection?", "Graphing or solving simultaneous equations"],
  ["What are the two simultaneous equation methods?", "Substitution and elimination"],
  ["Find the intersection of 2x+y=5 and x+2y=1.", "(3, -1)"],
  ["What is the first step of the substitution method?", "Isolate one variable from one equation"],
  ["What is the first step of the elimination method?", "Match the coefficients of one variable"],
  ["How do you verify the intersection point answer?", "Substitute back into both original equations"],
  ["A line parallel to the x-axis through (2,4) and (0,4). Equation?", "y = 4"],
  ["A line parallel to the y-axis through (2,4) and (2,0). Equation?", "x = 2"],
  ["What is a real-life application of straight line equations?", "Construction, engineering, mapping"],
  ["What is an example of an inclined-line structure in Malaysian history?", "The Leaning Clock Tower of Teluk Intan"],
  ["What is a common mistake when finding the gradient of two points?", "Sign or order error in (x2-x1) vs (x1-x2)"],
  ["How do you find the equation of a line parallel to the y-axis through a point?", "Use that point's x-value as the equation x=value"],
  ["What is the calculator allowed for in this chapter?", "Only for checking answers, not solving"],
  ["What does 'simultaneous equations' mean?", "Two or more equations solved together for one set of answers"],
]);
