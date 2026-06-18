import type { StructuredNotes } from "@/data/types";

export const mathF1C10NotesDLP: StructuredNotes = {
  chapterSummary:
    "Chapter 10 introduces the concepts of perimeter and area for various flat shapes. Students will learn to calculate the perimeter and area of triangles, parallelograms, trapeziums and kites, estimate measurements using grids, and solve problems involving composite shapes and real-world applications.",
  quickRevision: [
    "Perimeter = total length of all outer sides of a shape.",
    "Area of a triangle = ½ × base × height.",
    "Area of a parallelogram = base × height.",
    "Area of a trapezium = ½ × (a + b) × height.",
    "Area of a kite = ½ × diagonal₁ × diagonal₂.",
    "Height must be perpendicular (at right angles) to the base.",
    "Constant perimeter → maximum area when shape is a square.",
    "Constant area → minimum perimeter when shape is a square.",
    "Composite shape = combination of two or more simple shapes.",
    "1 m² = 10 000 cm².",
  ],
  keyExamFacts: [
    "The height of a triangle MUST be perpendicular to the base, not the slant side.",
    "Trapezium: use the TWO parallel sides (a and b), not all sides.",
    "Kite: use the TWO diagonals, not the sides.",
    "Composite shapes: split into simple shapes, calculate each, then add or subtract.",
    "A square gives the smallest perimeter for a given area.",
    "A square gives the largest area for a given perimeter.",
    "Grid estimation: full square = 1, more than half = 1, less than half = 0.",
  ],
  keyTerms: [
    "Perimeter",
    "Area",
    "Base",
    "Height",
    "Parallel sides",
    "Diagonal",
    "Composite shape",
    "Grid",
    "cm²",
    "m²",
  ],
  sections: [
    {
      title: "Learning Outcomes",
      subsections: [
        {
          content: "By the end of this chapter, students should be able to:",
          bulletPoints: [
            "Explain the concept of perimeter and calculate the perimeter of various shapes.",
            "Estimate the perimeter of a shape.",
            "Apply perimeter in real-life situations.",
            "Explain the concept of area and calculate the area of triangles.",
            "Calculate the area of parallelograms, trapeziums and kites.",
            "Estimate area using the grid method.",
            "Use appropriate area units (cm², m²).",
            "Explain the relationship between perimeter and area.",
            "Solve problems involving composite shapes.",
            "Relate perimeter and area to real-world applications.",
          ],
        },
      ],
    },
    {
      title: "1. Perimeter",
      subsections: [
        {
          title: "Definition of Perimeter",
          content:
            "Perimeter is the total length of all outer sides surrounding a flat shape. Perimeter measures the length of the boundary that encloses a shape. Imagine an ant walking along the edge of a shape — the distance it travels is the perimeter.",
        },
        {
          title: "Units of Perimeter",
          content:
            "Perimeter is measured in units of length such as centimetres (cm), metres (m), or millimetres (mm). Make sure all sides use the same unit before adding them together.",
        },
        {
          title: "How to Calculate Perimeter",
          content:
            "To calculate perimeter, ADD the lengths of all outer sides of the shape.",
          formula: "Perimeter = Sum of all outer sides",
        },
        {
          title: "Perimeter of a Rectangle",
          content:
            "A rectangle has 2 pairs of equal sides. Length = l, Width = w.",
          formula: "Perimeter = 2(l + w) = 2l + 2w",
        },
        {
          title: "Perimeter of a Square",
          content:
            "A square has 4 equal sides. Side length = s.",
          formula: "Perimeter = 4s",
        },
        {
          title: "Perimeter of a Triangle",
          content:
            "A triangle has three sides. Add all three sides to get the perimeter.",
          formula: "Perimeter = a + b + c",
        },
        {
          title: "Visual Guide: Tracing the Boundary",
          content:
            "Imagine placing a string along the edge of a shape, then straightening the string — the length of the string is the perimeter. This helps students understand that perimeter is a measurement of the boundary, not the enclosed area.",
        },
      ],
    },
    {
      title: "2. Calculating Perimeter",
      subsections: [
        {
          title: "Example 1: Rectangle",
          content:
            "A rectangle has a length of 8 cm and a width of 5 cm. Calculate the perimeter.",
          formula:
            "Perimeter = 2(l + w) = 2(8 + 5) = 2(13) = 26 cm",
        },
        {
          title: "Example 2: Triangle",
          content:
            "A triangle has sides 6 cm, 8 cm and 10 cm. Calculate the perimeter.",
          formula: "Perimeter = 6 + 8 + 10 = 24 cm",
        },
        {
          title: "Example 3: Regular Hexagon",
          content:
            "A regular hexagon (6 sides) has each side of 4 cm. Calculate the perimeter.",
          formula: "Perimeter = 6 × 4 = 24 cm",
        },
        {
          title: "Example 4: Irregular Shape",
          content:
            "An L-shaped figure has sides 3 cm, 5 cm, 2 cm, 3 cm, 5 cm and 2 cm. Calculate the perimeter.",
          formula: "Perimeter = 3 + 5 + 2 + 3 + 5 + 2 = 20 cm",
        },
        {
          title: "Perimeter of Composite Shapes",
          content:
            "For composite shapes (combined shapes), only count the OUTER sides. Do not include internal sides that are hidden inside the shape. Carefully identify every outer side.",
        },
        {
          title: "Common Mistake: Perimeter",
          content:
            "MISTAKE: Adding internal sides of composite shapes. CORRECT: Only add sides that form the outer boundary. Example: If two rectangles are joined, the shared side (in the middle) is NOT counted.",
        },
      ],
    },
    {
      title: "3. Estimating Perimeter",
      subsections: [
        {
          title: "Why Estimate?",
          content:
            "Estimation is useful when exact measurements are not needed or difficult to obtain. Estimation allows us to get a close enough value quickly.",
        },
        {
          title: "Method for Estimating Perimeter",
          content:
            "Steps for estimating perimeter using a grid: 1) Place the shape on grid paper. 2) Count the number of grid squares the boundary passes through. 3) Multiply the count by the length of one grid square.",
        },
        {
          title: "Example: Estimation with 1 cm Grid",
          content:
            "An irregular shape is placed on a 1 cm × 1 cm grid. The boundary of the shape passes through approximately 18 grid squares. Estimated perimeter ≈ 18 cm.",
        },
        {
          title: "Estimating Perimeter of Curved Shapes",
          content:
            "For curved shapes, we can estimate the perimeter by wrapping a string along the boundary, then measuring the length of the string.",
        },
      ],
    },
    {
      title: "4. Applications of Perimeter",
      subsections: [
        {
          title: "School Garden Fencing",
          content:
            "A school garden is rectangular, measuring 20 m × 15 m. Total fencing needed = perimeter = 2(20 + 15) = 2(35) = 70 m.",
        },
        {
          title: "Sports Courts",
          content:
            "A badminton court is rectangular. Players run around the boundary of the court during warm-up — this distance is the court's perimeter.",
        },
        {
          title: "Land Boundaries",
          content:
            "A landowner wants to install fencing around their land. Calculating the perimeter helps determine how much fencing needs to be purchased.",
        },
        {
          title: "Picture Frames",
          content:
            "Making a picture frame: the length of frame material needed = perimeter of the picture. A picture 30 cm × 20 cm: frame = 2(30 + 20) = 100 cm.",
        },
        {
          title: "Perimeter Applications Table",
          table: {
            headers: ["Situation", "Need", "Formula"],
            rows: [
              ["Garden fencing", "Length of fence", "Perimeter"],
              ["Picture frame", "Length of material", "Perimeter"],
              ["Running track", "Running distance", "Perimeter"],
              ["Land boundary", "Length of fencing", "Perimeter"],
            ],
          },
        },
      ],
    },
    {
      title: "5. Area",
      subsections: [
        {
          title: "Definition of Area",
          content:
            "Area is the amount of space inside the boundary of a flat (2D) shape. Area measures the region covered by the shape.",
        },
        {
          title: "Units of Area",
          content:
            "Area is measured in square units such as square centimetres (cm²) or square metres (m²). 'Square' indicates that we are measuring a two-dimensional region.",
          formula: "1 m² = 100 cm × 100 cm = 10 000 cm²",
        },
        {
          title: "Difference: Perimeter vs Area",
          content:
            "PERIMETER: length of boundary (1 dimension — measured in cm, m). AREA: space enclosed (2 dimensions — measured in cm², m²). Two shapes can have the same perimeter but different areas, and vice versa.",
          table: {
            headers: ["Feature", "Perimeter", "Area"],
            rows: [
              ["Meaning", "Outer boundary", "Inner region"],
              ["Dimension", "1D (length)", "2D (region)"],
              ["Unit", "cm, m", "cm², m²"],
              ["Method", "Add all sides", "Special formula"],
            ],
          },
        },
        {
          title: "Visualising Area: The Tile Method",
          content:
            "Imagine the floor of a room covered with 1 cm × 1 cm square tiles. The number of tiles needed = the area of the floor in cm².",
        },
      ],
    },
    {
      title: "6. Area of Triangles",
      subsections: [
        {
          title: "Formula for Area of a Triangle",
          content:
            "Area of a triangle = half the area of a parallelogram with the same base and height. The base (b) is any side of the triangle. The height (h) MUST be perpendicular to the base.",
          formula: "Area = ½ × base × height = ½bh",
        },
        {
          title: "Why ½ × base × height?",
          content:
            "Every triangle is HALF of a parallelogram with the same base and height. If we copy the triangle and rotate it, it completes a parallelogram. Area of the parallelogram = base × height, so area of the triangle = ½ × base × height.",
        },
        {
          title: "Important: Perpendicular Height",
          content:
            "The height of a triangle MUST be perpendicular (at right angles, 90°) to the base. For obtuse triangles, the height may fall OUTSIDE the base (when extended). Do not use the slant side length as the height.",
        },
        {
          title: "Example 1: Right-Angled Triangle",
          content:
            "Triangle with base 10 cm and height 6 cm.",
          formula: "Area = ½ × 10 × 6 = ½ × 60 = 30 cm²",
        },
        {
          title: "Example 2: Obtuse Triangle",
          content:
            "Triangle with base 8 cm and perpendicular height 5 cm.",
          formula: "Area = ½ × 8 × 5 = ½ × 40 = 20 cm²",
        },
        {
          title: "Example 3: Finding the Base",
          content:
            "Area of triangle = 24 cm² and height = 6 cm. Find the base.",
          formula:
            "24 = ½ × base × 6\n24 = 3 × base\nBase = 24 ÷ 3 = 8 cm",
        },
      ],
    },
    {
      title: "7. Area of Parallelograms",
      subsections: [
        {
          title: "Definition of Parallelogram",
          content:
            "A parallelogram is a quadrilateral with 2 pairs of parallel and equal sides. Includes: rectangle, square, rhombus and rhombus.",
        },
        {
          title: "Formula for Area of a Parallelogram",
          content:
            "Area = base × height. The base (b) = length of any side. The height (h) = PERPENDICULAR distance between two parallel sides. NOT the slant side!",
          formula: "Area = base × height = b × h",
        },
        {
          title: "Why base × height?",
          content:
            "A parallelogram can be cut and rearranged into a rectangle with the same base and height. Area of rectangle = l × w = base × height.",
        },
        {
          title: "Example 1: Parallelogram",
          content:
            "Parallelogram with base 12 cm and height 7 cm (not the slant side 9 cm).",
          formula: "Area = 12 × 7 = 84 cm²",
        },
        {
          title: "Example 2: Rectangle",
          content:
            "Rectangle 15 cm × 9 cm. Height = width = 9 cm.",
          formula: "Area = 15 × 9 = 135 cm²",
        },
        {
          title: "Example 3: Finding the Height",
          content:
            "Area of parallelogram = 60 cm² and base = 10 cm. Find the height.",
          formula: "60 = 10 × height\nHeight = 60 ÷ 10 = 6 cm",
        },
        {
          title: "Common Mistake: Parallelogram",
          content:
            "MISTAKE: Using the slant side as the height. CORRECT: Height MUST be perpendicular to the base. In a slanted parallelogram, the perpendicular height is shorter than the slant side.",
        },
      ],
    },
    {
      title: "8. Area of Trapeziums",
      subsections: [
        {
          title: "Definition of Trapezium",
          content:
            "A trapezium is a quadrilateral with exactly one pair of parallel sides. The two parallel sides are called 'a' and 'b'. The perpendicular distance between the two parallel sides is the height (h).",
        },
        {
          title: "Formula for Area of a Trapezium",
          content:
            "Area of a trapezium = half the sum of the parallel sides multiplied by the height.",
          formula: "Area = ½ × (a + b) × height",
        },
        {
          title: "Understanding the Trapezium Formula",
          content:
            "Copy the trapezium, rotate it 180°, and join with the original → it forms a parallelogram with base (a + b) and the same height. Area of that parallelogram = (a + b) × h. So area of ONE trapezium = ½(a + b)h.",
        },
        {
          title: "Example 1",
          content:
            "Trapezium with parallel sides 8 cm and 12 cm, height 5 cm.",
          formula:
            "Area = ½ × (8 + 12) × 5 = ½ × 20 × 5 = ½ × 100 = 50 cm²",
        },
        {
          title: "Example 2",
          content:
            "Trapezium with parallel sides 6 cm and 10 cm, height 4 cm.",
          formula:
            "Area = ½ × (6 + 10) × 4 = ½ × 16 × 4 = ½ × 64 = 32 cm²",
        },
        {
          title: "Example 3: Finding the Height",
          content:
            "Area of trapezium = 45 cm². Parallel sides = 7 cm and 11 cm. Find the height.",
          formula:
            "45 = ½ × (7 + 11) × height\n45 = ½ × 18 × height\n45 = 9 × height\nHeight = 45 ÷ 9 = 5 cm",
        },
      ],
    },
    {
      title: "9. Area of Kites",
      subsections: [
        {
          title: "Definition of Kite",
          content:
            "A kite is a quadrilateral with 2 pairs of adjacent equal sides. The diagonals of a kite are perpendicular (90°). One diagonal bisects the other.",
        },
        {
          title: "Formula for Area of a Kite",
          content:
            "Area of a kite = half the product of its two diagonals.",
          formula: "Area = ½ × d₁ × d₂",
        },
        {
          title: "Understanding the Kite Formula",
          content:
            "A kite can be placed inside a rectangle with dimensions d₁ × d₂. Area of the rectangle = d₁ × d₂. The kite occupies HALF of that rectangle, so area of kite = ½d₁d₂.",
        },
        {
          title: "Example 1",
          content:
            "Kite with diagonals 10 cm and 6 cm.",
          formula: "Area = ½ × 10 × 6 = ½ × 60 = 30 cm²",
        },
        {
          title: "Example 2",
          content:
            "Kite with diagonals 14 cm and 8 cm.",
          formula: "Area = ½ × 14 × 8 = ½ × 112 = 56 cm²",
        },
        {
          title: "Example 3: Finding a Diagonal",
          content:
            "Area of kite = 40 cm² and one diagonal = 10 cm. Find the other diagonal.",
          formula:
            "40 = ½ × 10 × d₂\n40 = 5 × d₂\nd₂ = 40 ÷ 5 = 8 cm",
        },
        {
          title: "Note: Rhombus Formula",
          content:
            "The kite area formula (½d₁d₂) also applies to a RHOMBUS, because a rhombus's diagonals are also perpendicular and bisect each other.",
        },
      ],
    },
    {
      title: "10. Estimating Area",
      subsections: [
        {
          title: "The Grid Method",
          content:
            "The grid method is used to estimate the area of irregular shapes. Steps: 1) Draw the shape on grid paper. 2) Count the full squares inside the shape. 3) Count the partial squares (more than half = 1, less than half = 0). 4) Add all counts together.",
        },
        {
          title: "Grid Estimation Rules",
          table: {
            headers: ["Square Condition", "Count"],
            rows: [
              ["Full square inside shape", "Count as 1"],
              ["More than half inside shape", "Count as 1"],
              ["Less than half inside shape", "Count as 0"],
              ["Square outside shape", "Not counted"],
            ],
          },
        },
        {
          title: "Example: Estimating Leaf Area",
          content:
            "A leaf is placed on a 1 cm × 1 cm grid. Full squares = 18, half squares = 8 (→ counted as 4). Estimated area ≈ 18 + 4 = 22 cm².",
        },
        {
          title: "Accuracy of Estimation",
          content:
            "Estimates are more accurate when grid squares are smaller. A 0.5 cm × 0.5 cm grid gives a more accurate estimate than a 1 cm × 1 cm grid.",
        },
      ],
    },
    {
      title: "11. Units of Area",
      subsections: [
        {
          title: "Common Area Units",
          content:
            "Area units depend on the size of the object being measured. Use the appropriate unit for the context.",
          table: {
            headers: ["Unit", "Symbol", "Used For"],
            rows: [
              ["Square centimetre", "cm²", "Small objects (books, tables)"],
              ["Square metre", "m²", "Rooms, buildings"],
              ["Square kilometre", "km²", "Cities, states"],
              ["Hectare", "ha", "Farms, large areas"],
            ],
          },
        },
        {
          title: "Converting Area Units",
          content:
            "Converting area units is different from converting length units, because area is 2-dimensional.",
          formula:
            "1 m = 100 cm\n1 m² = 100 cm × 100 cm = 10 000 cm²\n1 km² = 1000 m × 1000 m = 1 000 000 m²",
        },
        {
          title: "Conversion Example 1",
          content:
            "Convert 3.5 m² to cm².",
          formula: "3.5 m² = 3.5 × 10 000 = 35 000 cm²",
        },
        {
          title: "Conversion Example 2",
          content:
            "Convert 45 000 cm² to m².",
          formula: "45 000 cm² ÷ 10 000 = 4.5 m²",
        },
        {
          title: "Visualising 1 m²",
          content:
            "1 m² is the area of a square with sides 1 m. It contains 10 000 small squares each measuring 1 cm × 1 cm. This helps explain why 1 m² = 10 000 cm².",
        },
      ],
    },
    {
      title: "12. Relationship Between Perimeter and Area",
      subsections: [
        {
          title: "Perimeter and Area: Not Directly Related",
          content:
            "Perimeter and area do NOT directly determine each other. Shapes with the same perimeter can have different areas, and vice versa.",
          table: {
            headers: ["Shape", "Dimensions", "Perimeter", "Area"],
            rows: [
              ["Rectangle A", "8 × 2 cm", "20 cm", "16 cm²"],
              ["Rectangle B", "6 × 4 cm", "20 cm", "24 cm²"],
              ["Square C", "5 × 5 cm", "20 cm", "25 cm²"],
            ],
          },
        },
        {
          title: "Summary of Relationship",
          content:
            "When PERIMETER IS FIXED: area INCREASES as the shape approaches a square. Maximum area is achieved when the shape is a square. When AREA IS FIXED: perimeter DECREASES as the shape approaches a square. Minimum perimeter is achieved when the shape is a square.",
        },
      ],
    },
    {
      title: "13. Rectangles With Constant Area",
      subsections: [
        {
          title: "Concept: Constant Area",
          content:
            "If the area of a rectangle is FIXED (unchanged), the perimeter WILL CHANGE when its dimensions change.",
        },
        {
          title: "Example: Fixed Area = 36 cm²",
          content:
            "List all rectangles with area 36 cm² and calculate each perimeter:",
          table: {
            headers: ["Length (cm)", "Width (cm)", "Area (cm²)", "Perimeter (cm)"],
            rows: [
              ["36", "1", "36", "74"],
              ["18", "2", "36", "40"],
              ["12", "3", "36", "30"],
              ["9", "4", "36", "26"],
              ["6", "6", "36", "24 (smallest)"],
            ],
          },
        },
        {
          title: "Conclusion",
          content:
            "When area = 36 cm², the smallest perimeter (24 cm) is obtained when the shape is a SQUARE (6 × 6). As dimensions become more different (length >> width), the perimeter gets larger.",
        },
      ],
    },
    {
      title: "14. Rectangles With Constant Perimeter",
      subsections: [
        {
          title: "Concept: Constant Perimeter",
          content:
            "If the perimeter of a rectangle is FIXED (unchanged), the area WILL CHANGE when its dimensions change.",
        },
        {
          title: "Example: Fixed Perimeter = 24 cm",
          content:
            "List all rectangles with perimeter 24 cm and calculate each area:",
          table: {
            headers: ["Length (cm)", "Width (cm)", "Perimeter (cm)", "Area (cm²)"],
            rows: [
              ["11", "1", "24", "11"],
              ["10", "2", "24", "20"],
              ["9", "3", "24", "27"],
              ["8", "4", "24", "32"],
              ["6", "6", "24", "36 (largest)"],
            ],
          },
        },
        {
          title: "Conclusion",
          content:
            "When perimeter = 24 cm, the largest area (36 cm²) is obtained when the shape is a SQUARE (6 × 6). As dimensions become more different (length >> width), the area gets smaller.",
        },
        {
          title: "Practical Application",
          content:
            "This is important in design: If you have a fixed amount of fencing (fixed perimeter) and want to enclose the largest area, use a square shape. Playgrounds, swimming pools and farms are designed based on this principle.",
        },
      ],
    },
    {
      title: "15. Composite Shapes",
      subsections: [
        {
          title: "Definition of Composite Shapes",
          content:
            "A composite shape is a shape formed by combining two or more simple shapes (triangles, rectangles, trapeziums, etc.). To calculate the area or perimeter of a composite shape, we need to split it into simple parts.",
        },
        {
          title: "Strategies for Composite Shapes",
          content:
            "There are two main strategies: 1) ADD: Split into simple shapes, calculate each area, then add them. 2) SUBTRACT: Start with a large shape, subtract the area of unwanted parts.",
        },
        {
          title: "Example 1: L-Shape (Addition Strategy)",
          content:
            "An L-shape can be split into 2 rectangles. Rectangle A: 6 × 4 = 24 cm². Rectangle B: 3 × 2 = 6 cm². Total area = 24 + 6 = 30 cm².",
          formula: "Area of L = Area A + Area B = 24 + 6 = 30 cm²",
        },
        {
          title: "Example 2: Triangle + Rectangle",
          content:
            "Toy house: body = rectangle 8 × 5 cm, roof = triangle, base 8 cm, height 3 cm. Body area = 40 cm². Roof area = ½ × 8 × 3 = 12 cm². Total = 52 cm².",
          formula: "Area = 40 + 12 = 52 cm²",
        },
        {
          title: "Example 3: Subtraction Strategy",
          content:
            "Large rectangle 10 × 8 = 80 cm² with a small rectangular hole 3 × 2 = 6 cm² punched out. Remaining area = 80 − 6 = 74 cm².",
          formula: "Area = 80 − 6 = 74 cm²",
        },
        {
          title: "Perimeter of Composite Shapes",
          content:
            "For the perimeter of composite shapes: identify all OUTER sides. Calculate any missing side lengths using given information. Add all outer sides.",
        },
      ],
    },
    {
      title: "16. Problem Solving",
      subsections: [
        {
          title: "Steps for Problem Solving",
          content:
            "Follow these steps to systematically solve perimeter and area problems:",
          bulletPoints: [
            "Step 1: Read the question carefully. Identify what is asked (perimeter or area?).",
            "Step 2: Draw a diagram and label all known dimensions.",
            "Step 3: Identify the shape (triangle, parallelogram, trapezium, kite, composite).",
            "Step 4: Choose the correct formula.",
            "Step 5: Substitute values and calculate.",
            "Step 6: Write the answer with correct units.",
          ],
        },
        {
          title: "Example: Flooring Problem",
          content:
            "An L-shaped room has dimensions: large section 8 m × 6 m, small section 3 m × 4 m. Tiles cost RM 15 per m². What is the tiling cost?",
          formula:
            "Area = (8 × 6) + (3 × 4) = 48 + 12 = 60 m²\nCost = 60 × RM 15 = RM 900",
        },
        {
          title: "Example: Fertiliser Problem",
          content:
            "A trapezoidal plot of land has parallel sides 30 m and 20 m, height 15 m. Fertiliser is needed at 2 kg per m². How much fertiliser is needed?",
          formula:
            "Area = ½ × (30 + 20) × 15 = ½ × 50 × 15 = 375 m²\nFertiliser = 375 × 2 = 750 kg",
        },
        {
          title: "Example: Paint Problem",
          content:
            "A triangular wall section with base 6 m and height 4 m. Paint is needed at 0.5 L per m². One tin contains 3 L. How many tins?",
          formula:
            "Area = ½ × 6 × 4 = 12 m²\nPaint = 12 × 0.5 = 6 L\nTins = 6 ÷ 3 = 2 tins",
        },
      ],
    },
    {
      title: "17. Real-World Applications",
      subsections: [
        {
          title: "Gardening and Agriculture",
          content:
            "Farmers use area to calculate seeds, fertilisers and water needed. Fencing is installed based on the farm's perimeter. A trapezoidal garden with parallel sides 50 m and 30 m, height 20 m: Area = ½(50 + 30)(20) = 800 m².",
        },
        {
          title: "Architecture and Construction",
          content:
            "Architects calculate floor area for space planning. Contractors use perimeter to calculate materials (bricks, timber, tiles). Area helps calculate the cost of paint, carpet and tiles.",
        },
        {
          title: "Floor Planning",
          content:
            "Floor tiles 30 cm × 30 cm (= 0.09 m²) are installed in a room 5 m × 4 m (= 20 m²). Number of tiles = 20 ÷ 0.09 ≈ 223 tiles. Buy 10% extra for wastage: ≈ 246 tiles.",
        },
        {
          title: "Building Design",
          content:
            "Solar panels are installed on a square roof 10 m × 10 m. Roof area = 100 m². Each panel measures 2 m × 1 m = 2 m². Number of panels = 100 ÷ 2 = 50 panels.",
        },
        {
          title: "Plant Spacing",
          content:
            "Fruit trees are planted 3 m apart in a farm measuring 30 m × 18 m. Rows: 30 ÷ 3 = 10 rows. Trees per row: 18 ÷ 3 = 6 trees. Total trees: 10 × 6 = 60 trees.",
        },
        {
          title: "Land Measurement",
          content:
            "Land surveyors use area formulas to calculate land value. A kite-shaped plot with diagonals 80 m and 60 m: Area = ½ × 80 × 60 = 2 400 m². Land value at RM 200 per m² = RM 480 000.",
        },
        {
          title: "Area Applications Table",
          table: {
            headers: ["Field", "Use of Area", "Use of Perimeter"],
            rows: [
              ["Agriculture", "Seeds, fertiliser, water", "Farm fencing"],
              ["Construction", "Tiles, carpet, paint", "Walls, bricks, timber"],
              ["Design", "Space layout", "Frames, signboards"],
              ["Surveying", "Land value", "Land boundaries"],
            ],
          },
        },
      ],
    },
    {
      title: "18. Chapter Summary",
      subsections: [
        {
          title: "Formula Summary",
          table: {
            headers: ["Shape", "Area Formula", "Perimeter Formula"],
            rows: [
              ["Rectangle", "l × w", "2(l + w)"],
              ["Square", "s²", "4s"],
              ["Triangle", "½ × base × height", "a + b + c"],
              ["Parallelogram", "base × height", "2(a + b)"],
              ["Trapezium", "½(a + b) × height", "Add all sides"],
              ["Kite", "½ × d₁ × d₂", "Add all sides"],
            ],
          },
        },
        {
          title: "Key Points",
          bulletPoints: [
            "Perimeter is measured in length units (cm, m). Area is measured in square units (cm², m²).",
            "Height MUST be perpendicular to the base for triangle and parallelogram formulas.",
            "For a trapezium, use the sum of the two PARALLEL sides (not all sides).",
            "For a kite, use the two DIAGONALS (not the sides).",
            "1 m² = 10 000 cm².",
            "A square gives the smallest perimeter for a fixed area.",
            "A square gives the largest area for a fixed perimeter.",
            "Composite shapes: split into simple shapes, calculate, then add or subtract.",
          ],
        },
        {
          title: "Exam Tips",
          bulletPoints: [
            "Always include units in your answer.",
            "Draw a diagram for composite shape questions.",
            "Check: Did you use the height or the slant side?",
            "For 'how much material is needed' questions, calculate area first.",
            "For 'how long is the fence' questions, calculate perimeter.",
          ],
        },
      ],
    },
  ],
};
