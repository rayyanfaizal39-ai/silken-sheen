import type { Flashcard } from "@/data/content";

type FlashcardSeed = [string, string];

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `math-f3-c6-dlp-f${index + 1}`,
    subjectId: "math",
    form: "Form 3",
    chapter: "Chapter 6",
    lang: "dlp",
    front,
    back,
  }));
}

export const mathF3C6FlashcardsDLP: Flashcard[] = buildFlashcards([
  // Deck 1: Circumference and Centre Angles (Cards 1-20)
  ["What is the property of circumference angles on the same arc?", "Equal in size"],
  ["What is the formula for the centre angle vs circumference angle on the same arc?", "Centre angle = 2 x circumference angle"],
  ["What is the circumference angle subtended by a diameter?", "90°"],
  ["What is a minor arc?", "The shorter arc between two points"],
  ["What is a major arc?", "The longer arc between two points"],
  ["Centre angle is 80°, circumference angle on the same arc?", "40°"],
  ["Circumference angle is 35°, centre angle on the same arc?", "70°"],
  ["How do you find the major centre angle if the minor angle is known?", "360° - minor centre angle"],
  ["What is the relationship between the circumference angle and arc length?", "Directly proportional to the arc length"],
  ["If arc PR=arc QS, what is the relationship between their angles?", "The subtended angles are equal"],
  ["PR&QS are diameters, ∠QRS=90°, ∠QPR=45°. ∠PQS=?", "45°"],
  ["What does 'chord' mean?", "A straight line connecting two points on the circumference"],
  ["What does 'circumference' mean?", "The outer boundary line of a circle"],
  ["What is a common mistake regarding the centre angle?", "Forgetting to multiply/divide by 2 with the circumference angle"],
  ["Can circumference angles subtended by different arcs be equal?", "No, unless the arcs are equal in length"],
  ["What is the semicircle angle?", "90° (circumference angle subtended by a diameter)"],
  ["If ∠PRQ=∠PSQ, why?", "Both are subtended by the same arc (PQ)"],
  ["What is the total centre angle of a full circle?", "360°"],
  ["What does a major angle mean?", "The angle subtended by the major arc"],
  ["What does a minor angle mean?", "The angle subtended by the minor arc"],

  // Deck 2: Cyclic Quadrilaterals (Cards 21-40)
  ["What is a cyclic quadrilateral?", "A quadrilateral with all vertices on a circle's circumference"],
  ["What is the sum of opposite angles in a cyclic quadrilateral?", "180°"],
  ["What is the relationship between the exterior angle and the corresponding opposite interior angle?", "Equal value"],
  ["KLMN cyclic, ∠LKN=104°, ∠LMN=8x. Find x.", "9.5°"],
  ["∠KNM=98°, ∠KLM=4y. Find y.", "20.5°"],
  ["PQRS cyclic, ∠PQR=4y, ∠PSR=2y. Find y.", "30°"],
  ["From the above, ∠PST=?", "120°"],
  ["How do you confirm a quadrilateral is cyclic?", "Ensure all 4 vertices lie on the circumference"],
  ["What is a common mistake with cyclic quadrilaterals?", "Confusing the exterior angle with the adjacent angle"],
  ["What are the opposite angle pairs in PQRS?", "∠P&∠R, ∠Q&∠S"],
  ["If ∠A=70°, what is ∠C in a cyclic quadrilateral?", "110° (180-70)"],
  ["If ∠B=95°, what is ∠D in a cyclic quadrilateral?", "85° (180-95)"],
  ["What is an exterior angle?", "The angle formed when a side of the quadrilateral is extended"],
  ["Exterior angle is 84°, what is the corresponding opposite interior angle?", "84°"],
  ["What distinguishes a cyclic quadrilateral from a regular quadrilateral?", "All vertices must lie on the same circle's circumference"],
  ["Can a non-cyclic quadrilateral use the 180° property?", "No, it is only valid for cyclic quadrilaterals"],
  ["∠ADB=30°, ∠ABD=20° in triangle ABD. What is the third angle?", "130° (180-30-20)"],
  ["What is an application of cyclic quadrilaterals in real problems?", "Finding unknown angles using the 180° relationship"],
  ["What is the first step in solving a cyclic quadrilateral problem?", "Identify the pairs of opposite angles"],
  ["What is the general formula for a cyclic quadrilateral?", "∠A+∠C=180°, ∠B+∠D=180°"],

  // Deck 3: Tangents to a Circle (Cards 41-60)
  ["What is a tangent to a circle?", "A straight line touching a circle at exactly one point"],
  ["What is the point of tangency?", "The point of contact between a tangent and a circle"],
  ["What is the angle between a tangent and the radius at the point of tangency?", "90°"],
  ["Are two tangents from an external point equal in length?", "Yes"],
  ["What is a tangent-chord angle?", "Equal to the alternate segment angle subtended by the chord"],
  ["What is the alternate segment?", "The part of the circle opposite the referenced tangent-chord angle"],
  ["ABC is a straight tangent line, AB=OB, ∠BAO=28°. Find x.", "48° (textbook example)"],
  ["Tangent PQ=14cm. Tangent RQ from the same point=?", "14 cm"],
  ["What is a common tangent?", "A straight line that is a tangent to two circles at once"],
  ["How many common tangents if two circles don't touch?", "4"],
  ["How many common tangents if two circles touch externally?", "3"],
  ["How many common tangents if two circles intersect?", "2"],
  ["How many common tangents if two circles overlap internally?", "1"],
  ["What is the property of the triangle formed by two tangents and the centre?", "Congruent (SSS)"],
  ["What is the formula for finding the radius using tan when the angle and tangent distance are known?", "Radius = distance x tan(angle)"],
  ["What is a common mistake with the tangent-radius angle?", "Forgetting it must be 90°"],
  ["What is a real-life application of tangents to a circle?", "A vehicle's wheel touching the road at one point"],
  ["How do you find the alternate segment angle?", "Equal to the tangent-chord angle subtended by the same chord"],
  ["What theorem explains the tangent-chord angle?", "The Alternate Segment Theorem"],
  ["What is the key step in solving a complex tangent problem?", "Identify the right angle (90°) first, then apply trigonometry/Pythagoras"],
]);
