import type { Flashcard } from "@/data/content";

type FlashcardSeed = [string, string];

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `math-f3-c7-dlp-f${index + 1}`,
    subjectId: "math",
    form: "Form 3",
    chapter: "Chapter 7",
    lang: "dlp",
    front,
    back,
  }));
}

export const mathF3C7FlashcardsDLP: Flashcard[] = buildFlashcards([
  // Deck 1: Planes and Orthogonal Projection (Cards 1-20)
  ["What is a plane?", "A flat surface on an object"],
  ["What are the three types of planes?", "Horizontal, vertical, inclined"],
  ["What is a horizontal plane?", "A flat/level plane"],
  ["What is a vertical plane?", "An upright plane"],
  ["What is a normal to a plane?", "A straight line perpendicular (90°) to the plane"],
  ["What is an orthogonal projection?", "An image formed on a plane with projection lines perpendicular to it"],
  ["Are all projections orthogonal projections?", "No, only if the projection line is perpendicular to the plane"],
  ["Cube PQRSTUVW, normal to PQRS?", "UP, VQ, WR, TS"],
  ["What does the letter order of a normal mean (e.g. TS not ST)?", "Shows the correct direction and sequence of points"],
  ["Why do projected side lengths differ depending on viewing direction?", "Sides inclined/vertical to the plane change length in the projection"],
  ["What stays the same in a projection onto a given plane?", "Sides parallel to/lying on that plane"],
  ["A cylinder with diameter 4cm, height 6cm. Shape of the plan?", "A circle of diameter 4cm"],
  ["From the above, shape of the elevation?", "A rectangle 4cm x 6cm"],
  ["What does an inclined plane mean?", "A plane that is neither horizontal nor vertical"],
  ["What is a common mistake about orthogonal projection?", "Assuming all projections are orthogonal without confirming perpendicularity"],
  ["How do you confirm a projection is orthogonal?", "Ensure the projection line is perpendicular to the plane"],
  ["What is an application of orthogonal projection in engineering?", "Industrial design and construction"],
  ["What is the first step in drawing an orthogonal projection?", "Identify the plane and viewing direction"],
  ["What is the step after drawing normal lines from the object's vertices?", "Connect the intersection points of the normals with the plane"],
  ["What is the final step in drawing an orthogonal projection?", "Redraw with actual measurements and label the vertices"],

  // Deck 2: Plan and Elevation (Cards 21-40)
  ["What is a plan?", "The orthogonal projection on a horizontal plane (top view)"],
  ["What is an elevation?", "The orthogonal projection on a vertical plane (front/side view)"],
  ["Where is the plan placed in the standard quadrant layout?", "Fourth quadrant"],
  ["Where is the front elevation placed?", "First quadrant (above the plan)"],
  ["What is a thick solid line used for?", "Visible edges"],
  ["What is a dashed line used for?", "Hidden/concealed edges"],
  ["What is a thin solid line used for?", "Construction/projection lines"],
  ["In method 1, viewing direction is right-to-left. Position of the side elevation?", "To the left of the front elevation"],
  ["In method 2, viewing direction is left-to-right. Position of the side elevation?", "To the right of the front elevation"],
  ["What scale is used to draw plans & elevations?", "Full scale (1:1) unless stated otherwise"],
  ["How many views are typically drawn together?", "Three: plan, front elevation, side elevation"],
  ["What does 'uniform cross-section' mean?", "The same cross-sectional shape throughout the prism"],
  ["What is needed for special angles (45°, 60°)?", "Use a protractor/compass accurately"],
  ["What is a common mistake when drawing an elevation?", "Forgetting to switch to a dashed line for hidden edges"],
  ["What does the label E/D mean in a projection?", "Two object vertices coincide at the same projected point"],
  ["What is the main function of a plan and elevation?", "Providing accurate information about an object's design and size"],
  ["Which fields widely use plan and elevation?", "Engineering, construction, architecture, computing"],
  ["How do you determine the side elevation's quadrant (1 or 2)?", "Based on the actual side viewing direction"],
  ["What does it mean if the side elevation is in the second quadrant?", "The side view is from the right"],
  ["What does it mean if the side elevation is in the first quadrant?", "The side view is from left to right"],

  // Deck 3: Synthesising Plan and Elevations (Cards 41-60)
  ["What does synthesising the plan and elevations mean?", "Combining the three projections to sketch the object's 3D shape"],
  ["What is step 1 of synthesising projections?", "Sketch the three orthogonal projections on related planes with actual measurements"],
  ["What is step 2 of synthesising projections?", "Project the surfaces to meet"],
  ["What is step 3 of synthesising projections?", "Connect the vertices according to colour/letter labels"],
  ["What is step 4 of synthesising projections?", "Complete the sketch by labelling side lengths"],
  ["Why is consistent labelling important when synthesising?", "Ensures vertices correspond across all three views"],
  ["What is the main challenge if a block is removed from an object?", "Accurately identifying the surfaces that form the hole/notch"],
  ["What needs to be labelled on the removed block's surfaces?", "Label surfaces I, II, III and so on"],
  ["What is the effect of an inaccurate angle when sketching a 3D shape?", "Changes the shape and position of the inclined surface, affecting accuracy"],
  ["What is the connection between Design and Technology (orthographic projection) and this chapter?", "Similar concepts are used in design and technology"],
  ["What should be checked after sketching the 3D object?", "Compare with the three original projections to confirm accuracy"],
  ["What is a real-life application of synthesising plan and elevations?", "Reconstructing a building/object model from technical drawings"],
  ["What does a cuboid-shaped block removed from a prism mean?", "Part of the prism's volume is cut away to form a cuboid hole"],
  ["How do you identify the actual side viewing direction from the quadrant position?", "Quadrant 1=left-to-right; quadrant 2=right-to-left"],
  ["What should be done if an object has a 60° angle on a surface?", "Construct that angle accurately using the correct geometric method"],
  ["Why is orthogonal projection important before sketching a 3D shape?", "Provides accurate measurement information for each view of the object"],
  ["What is the difference between drawing a projection and synthesising one?", "Drawing a projection = object to 2D; synthesising = 2D back to a 3D object"],
  ["What is a tip for checking a sketched 3D shape?", "Make sure all side lengths and angles match all three projections"],
  ["What is another term for 'top view' in this context?", "Plan"],
  ["What is another term for 'front/side view' in this context?", "Elevation"],
]);
