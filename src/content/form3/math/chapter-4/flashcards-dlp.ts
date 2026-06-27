import type { Flashcard } from "@/data/content";

type FlashcardSeed = [string, string];

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `math-f3-c4-dlp-f${index + 1}`,
    subjectId: "math",
    form: "Form 3",
    chapter: "Chapter 4",
    lang: "dlp",
    front,
    back,
  }));
}

export const mathF3C4FlashcardsDLP: Flashcard[] = buildFlashcards([
  // Deck 1: Meaning and Interpreting Scale (Cards 1-20)
  ["What is a scale drawing?", "A drawing of an object where all measurements are proportional to the actual object"],
  ["What stays the same in a scale drawing?", "The angle sizes (shape)"],
  ["What is the formula for scale?", "Scale = Scale drawing measurement / Object measurement"],
  ["What form is scale usually written in?", "1 : n"],
  ["What does 1:n mean?", "1 unit on the drawing represents n units on the actual object"],
  ["If n<1, how does the scale drawing compare?", "Larger than the object"],
  ["If n>1, how does the scale drawing compare?", "Smaller than the object"],
  ["If n=1, how does the scale drawing compare?", "Same as the object"],
  ["P'Q'=2, PQ=4. Scale?", "1 : 2"],
  ["K'L'=9, KL=3. Scale in the form n:1?", "3 : 1"],
  ["Drawing grid 2cm, object grid 1cm (same side units). Scale?", "1 : 0.5 (or 2:1)"],
  ["Drawing grid 0.5cm, object grid 1cm. Scale?", "1 : 2"],
  ["Why use grid size instead of unit count for scale?", "When the number of side units is the same but grid size differs"],
  ["K'N'=2.5cm, KN=5cm. Scale?", "1 : 2"],
  ["What does a scale of 1:300 000 mean on a map?", "1cm on the map = 300 000cm (3km) in reality"],
  ["How many cm are in 1 km?", "100 000 cm"],
  ["Map distance 3cm, scale 1:300 000. Actual distance?", "9 km"],
  ["Scale 1cm:10km, map distance 2cm. Actual distance?", "20 km"],
  ["What is a common mistake about n>1?", "Thinking the drawing is larger (it is actually smaller)"],
  ["What unit conversion is needed for map distances?", "cm to km"],

  // Deck 2: Determining Measurements and Drawing (Cards 21-40)
  ["Khairul draws a square at scale 1:1/3, actual side 6cm. Drawing's side?", "18 cm"],
  ["What is the formula for actual area vs drawing area?", "Actual area = (length ratio)² x drawing area"],
  ["A room 7cmx5cm at scale 1:400. Actual area?", "560 m²"],
  ["A regular polygon's actual side is 10cm, scale 1:5, drawing side?", "2 cm"],
  ["A poster 24cmx8cm at scale 1:4. Scale drawing size?", "6cm x 2cm"],
  ["Map scale 1:400 000, river 2.5cm. Actual distance?", "10 km"],
  ["What are the three ways to draw a scale drawing?", "Same-size grid different scale, different-size grid, blank paper"],
  ["What must be precise when drawing angles in a scale drawing?", "Angles must be constructed exactly the same as the object"],
  ["A flower on a 1cmx1cm grid, redrawn on a 1.5cmx1.5cm grid. Is the object larger or smaller?", "Larger"],
  ["A flower on a 1cmx1cm grid, redrawn on a 0.5cmx0.5cm grid. Is the object larger or smaller?", "Smaller"],
  ["A scale drawing P'Q'R'S'T' at scale 1:2, how do you draw the actual object?", "Double (x2) every side of the drawing"],
  ["What does a scale of 1:1/2 mean for a drawing?", "The drawing is twice as large as the object"],
  ["For grids of different sizes, what stays the same?", "The number of side units"],
  ["What is the first step to find a scale from two corresponding sides?", "Divide the drawing's length by the corresponding object's length"],
  ["A room 3.5mx5.2m, scale 1:50. Drawing's perimeter?", "34.8 cm"],
  ["A field 3cmx6cm on a drawing at scale 1:2000. Actual area?", "7 200 m²"],
  ["Grass is mowed at 400m² in 8 minutes. Time for a 7200m² field?", "144 minutes"],
  ["What is a common mistake when calculating actual area?", "Forgetting to square the length ratio"],
  ["What is a common mistake when calculating actual volume?", "Forgetting to cube the length ratio"],
  ["A storeroom 2cmx3cm at scale 1:400. Actual area?", "96 m²"],

  // Deck 3: Solving Problems (Cards 41-60)
  ["Bintulu-Miri 4cm on a map at scale 1cm:50km. Actual distance?", "200 km"],
  ["From the above, if driven at 80km/h, travel time?", "2.5 hours (2 hours 30 minutes)"],
  ["The map is redrawn at scale 1:2 000 000 from 200km actual. New map distance?", "10 cm"],
  ["What is the formula for time from distance and speed?", "Time = Distance / Speed"],
  ["Kuching-KK 5.4cm on a map at scale 1cm:150km, flight time 90 minutes. Average speed?", "540 km/h"],
  ["Tile A 30cmx30cm RM2.80 vs tile B 50cmx50cm RM6, which is cheaper per m²?", "Tile B 50cmx50cm"],
  ["How do you fairly compare tile costs?", "Compare the cost per unit area (RM per m²), not the unit price of each tile"],
  ["Triangle P (area 112.5cm²) is a scale drawing of Q (area 4.5cm²). Area ratio?", "25 : 1"],
  ["From the area ratio 25:1, what is the length ratio (n)?", "5 : 1"],
  ["A circle's drawing diameter is 6cm, scale 1:3. Actual diameter?", "18 cm"],
  ["A football field 7cmx12cm at scale 1:1000. Actual area?", "8 400 m²"],
  ["How do you determine the maximum scale to fit a drawing on A4?", "Choose a larger scale (smaller n ratio) so the drawing is small enough to fit A4"],
  ["5mx4m tents are set up on a field. How do you calculate the maximum number?", "Divide the available area by the area of one tent's footprint"],
  ["Tent rental RM100/day, 25% discount for 5+ days. Rental for 7 days?", "RM525 (100x7x0.75)"],
  ["What is the area ratio of S:IV if the length ratio is 1:2?", "1 : 4"],
  ["What is the volume ratio if the length ratio is 1:2?", "1 : 8"],
  ["What is the conclusion about the area ratio vs the length ratio?", "Area ratio = (length ratio)²"],
  ["What is the conclusion about the volume ratio vs the length ratio?", "Volume ratio = (length ratio)³"],
  ["A shop's actual height is 3.75m, footprint 8mx12m. Volume?", "360 m³"],
  ["What is a real-life application of scale drawings in property?", "House plans and housing estate models"],
]);
