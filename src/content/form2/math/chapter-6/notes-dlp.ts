import type { StructuredNotes } from "@/data/types";

export const mathF2C6NotesDLP: StructuredNotes = {
  chapterSummary:
    "Chapter 6 Three-Dimensional Geometrical Shapes helps students identify the geometric properties of prisms, pyramids, cylinders, cones and spheres, draw and recognise nets of three-dimensional shapes, and calculate the surface area and volume of three-dimensional shapes and combinations of three-dimensional shapes.",
  quickRevision: [
    "Three-dimensional shapes have length, width and height.",
    "Prisms and pyramids are named according to the shape of their base.",
    "A net is a two-dimensional shape that can be folded to form a three-dimensional shape.",
    "Surface area is the total area of all surfaces (faces) of a three-dimensional shape, measured in square units (cm², m²).",
    "Volume is the space occupied by a three-dimensional shape, measured in cubic units (cm³, m³).",
    "Use π ≈ 3.142 or 22/7 depending on which makes the calculation easier for the numbers given.",
    "For combined shapes, identify the basic shapes that make up the solid before calculating surface area or volume.",
  ],
  sections: [
    {
      title: "Learning Outcomes",
      subsections: [
        {
          content: "By the end of this chapter, students should be able to:",
          bulletPoints: [
            "Identify and describe the geometric properties of three-dimensional shapes (prisms, pyramids, cylinders, cones and spheres).",
            "Draw and identify nets of three-dimensional shapes.",
            "Calculate the surface area of three-dimensional shapes, including combinations of two three-dimensional shapes.",
            "Calculate the volume of three-dimensional shapes, including combinations of two three-dimensional shapes.",
            "Solve problems involving surface area and volume in daily life situations.",
          ],
        },
      ],
    },
    {
      title: "6.1 Geometric Properties of Three-Dimensional Shapes",
      subsections: [
        {
          title: "Definition",
          content:
            "A three-dimensional (3D) shape is a shape that has three measurements: length, width and height. Three-dimensional shapes have faces, edges and vertices.",
        },
        {
          title: "Components of Three-Dimensional Shapes",
          bulletPoints: [
            "Face: a flat or curved surface of a three-dimensional shape.",
            "Edge: a line formed where two faces meet.",
            "Vertex: a point where two or more edges meet.",
          ],
        },
        {
          title: "Types of Three-Dimensional Shapes",
          table: {
            headers: ["Shape", "Base/Cross-Section", "Key Characteristics"],
            rows: [
              ["Cube", "Square", "All sides equal in length, 6 square faces"],
              ["Cuboid", "Rectangle", "6 rectangular faces, opposite sides equal in length"],
              ["Prism", "Uniform along its length (e.g. triangle, square, pentagon)", "Two parallel and congruent bases, rectangular lateral faces"],
              ["Pyramid", "Same as its base (triangle, square, etc.)", "One base, lateral faces meeting at a single vertex (apex)"],
              ["Cylinder", "Circle", "Two parallel circular bases of equal size, one curved surface"],
              ["Cone", "Circle", "One circular base, one curved surface meeting at a single apex"],
              ["Sphere", "No flat base", "Uniformly curved surface, all points on the surface equidistant from the centre"],
            ],
          },
        },
        {
          title: "Number of Faces, Edges and Vertices",
          table: {
            headers: ["Shape", "Number of Faces", "Number of Edges", "Number of Vertices"],
            rows: [
              ["Cube/Cuboid", "6", "12", "8"],
              ["Triangular prism", "5", "9", "6"],
              ["Right square pyramid", "5", "8", "5"],
              ["Cylinder", "2 flat + 1 curved", "2 (circular edges)", "0"],
              ["Cone", "1 flat + 1 curved", "1 (circular edge)", "1 (apex)"],
              ["Sphere", "1 curved", "0", "0"],
            ],
          },
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "Prisms and pyramids are named according to the shape of their base, e.g. triangular prism, square pyramid.",
            "Cylinders, cones and spheres each have at least one curved surface.",
            "A sphere has no base, edges or vertices.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Confusing a prism with a pyramid because both have a polygon base.",
            "Miscounting the number of faces of a prism — the number of lateral faces equals the number of edges of the base, plus 2 bases.",
            "Assuming a cone has two vertices (it actually has only one apex).",
          ],
        },
      ],
    },
    {
      title: "6.2 Nets of Three-Dimensional Shapes",
      subsections: [
        {
          title: "Definition",
          content:
            "A net is a two-dimensional shape formed when the surfaces of a three-dimensional shape are opened up and laid flat. A net can be folded back to form the original three-dimensional shape.",
        },
        {
          title: "Nets of Common Shapes",
          table: {
            headers: ["Three-Dimensional Shape", "Net"],
            rows: [
              ["Cube", "6 connected squares"],
              ["Cuboid", "6 connected rectangles (3 pairs of equal size)"],
              ["Triangular prism", "2 triangles (bases) + 3 rectangles (lateral faces)"],
              ["Square pyramid", "1 square (base) + 4 triangles (lateral faces)"],
              ["Cylinder", "2 circles (bases) + 1 rectangle (forms the curved lateral surface)"],
              ["Cone", "1 circle (base) + 1 sector of a circle (forms the curved lateral surface)"],
            ],
          },
        },
        {
          title: "Example 1",
          content:
            "Question: Draw the net of a cuboid with length 5 cm, width 3 cm and height 4 cm. How many rectangles are in the net?\n\nSolution: A cuboid has 6 faces, made up of 3 pairs of congruent rectangles: (5 cm x 3 cm), (5 cm x 4 cm), and (3 cm x 4 cm), each pair appearing twice.\n\nAnswer: 6 rectangles (3 pairs).",
        },
        {
          title: "Example 2",
          content:
            "Question: A cone has a net consisting of one circle and one sector of a circle. Name the part of the net that represents the base of the cone and the part that represents the lateral surface of the cone.\n\nSolution: The circle in the net represents the flat base of the cone. The sector of the circle in the net represents the curved lateral surface of the cone when laid flat.\n\nAnswer: Circle = base of the cone; Sector of a circle = lateral surface of the cone.",
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "A single three-dimensional shape can have more than one possible net, as long as it folds back into the original shape.",
            "The number and shape of faces in a net must match the number and shape of faces of the original three-dimensional shape.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Forgetting to include both bases for a prism or cylinder when drawing the net.",
            "Drawing the net of a cone as two circles (it should be one circle and one sector).",
            "Face sizes in the net not matching the actual measurements of the three-dimensional shape.",
          ],
        },
      ],
    },
    {
      title: "6.3 Surface Area of Three-Dimensional Shapes",
      subsections: [
        {
          title: "Definition",
          content:
            "Surface area is the total area of all the surfaces (faces) of a three-dimensional shape. Surface area is measured in square units such as cm² or m².",
        },
        {
          title: "Formula",
          table: {
            headers: ["Shape", "Surface Area Formula"],
            rows: [
              ["Cube (side, s)", "Surface Area = 6 x s²"],
              ["Cuboid (length l, width w, height h)", "Surface Area = 2(lw + lh + wh)"],
              ["Right prism", "Surface Area = (2 x Base Area) + (Base Perimeter x Height of Prism)"],
              ["Cylinder (radius r, height h)", "Surface Area = 2πr² + 2πrh = 2πr(r + h)"],
              ["Right pyramid", "Surface Area = Base Area + Total Area of All Triangular Lateral Faces"],
              ["Cone (radius r, slant height l)", "Surface Area = πr² + πrl = πr(r + l)"],
              ["Sphere (radius r)", "Surface Area = 4πr²"],
            ],
          },
        },
        {
          title: "Example 1",
          content:
            "Question: A cuboid has a length of 8 cm, a width of 5 cm and a height of 4 cm. Calculate the surface area of the cuboid.\n\nSolution:\nSurface Area = 2(lw + lh + wh)\n= 2[(8 x 5) + (8 x 4) + (5 x 4)]\n= 2[40 + 32 + 20]\n= 2(92)\n= 184 cm²\n\nAnswer: 184 cm²",
        },
        {
          title: "Example 2",
          content:
            "Question: A cylinder has a base radius of 7 cm and a height of 10 cm. Calculate the surface area of the cylinder. (Use π = 22/7)\n\nSolution:\nSurface Area = 2πr(r + h)\n= 2 x 22/7 x 7 x (7 + 10)\n= 2 x 22 x 17\n= 748 cm²\n\nAnswer: 748 cm²",
        },
        {
          title: "Example 3",
          content:
            "Question: A cone has a base radius of 6 cm and a slant height of 10 cm. Calculate the surface area of the cone. (Use π = 3.142)\n\nSolution:\nSurface Area = πr(r + l)\n= 3.142 x 6 x (6 + 10)\n= 3.142 x 6 x 16\n= 301.632 cm²\n\nAnswer: 301.63 cm² (2 decimal places)",
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "Surface area is always measured in square units (cm², m²), never cubic units.",
            "For a prism, identify the base perimeter correctly before multiplying by the height of the prism.",
            "For a cone, use the slant height (l), not the vertical height (h), in the lateral surface area formula.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Using the volume formula when the question asks for surface area.",
            "Confusing the vertical height (h) with the slant height (l) of a cone.",
            "Forgetting to multiply by 2 for the two bases of a cylinder or prism.",
            "Wrong units — writing cm³ for surface area instead of cm².",
          ],
        },
      ],
    },
    {
      title: "6.4 Volume of Three-Dimensional Shapes",
      subsections: [
        {
          title: "Definition",
          content:
            "Volume is the total amount of three-dimensional space occupied by a solid shape. Volume is measured in cubic units such as cm³ or m³.",
        },
        {
          title: "Formula",
          table: {
            headers: ["Shape", "Volume Formula"],
            rows: [
              ["Cube (side, s)", "Volume = s³"],
              ["Cuboid (length l, width w, height h)", "Volume = l x w x h"],
              ["Right prism", "Volume = Base Area x Height of Prism"],
              ["Cylinder (radius r, height h)", "Volume = πr²h"],
              ["Right pyramid", "Volume = 1/3 x Base Area x Height of Pyramid"],
              ["Cone (radius r, height h)", "Volume = 1/3 x πr²h"],
              ["Sphere (radius r)", "Volume = 4/3 x πr³"],
            ],
          },
        },
        {
          title: "Example 1",
          content:
            "Question: A right pyramid has a square base with side 6 cm and a height of 9 cm. Calculate the volume of the pyramid.\n\nSolution:\nBase Area = 6 x 6 = 36 cm²\nVolume = 1/3 x Base Area x Height\n= 1/3 x 36 x 9\n= 108 cm³\n\nAnswer: 108 cm³",
        },
        {
          title: "Example 2",
          content:
            "Question: A cone has a base radius of 3 cm and a height of 7 cm. Calculate the volume of the cone. (Use π = 22/7)\n\nSolution:\nVolume = 1/3 x πr²h\n= 1/3 x 22/7 x 3² x 7\n= 1/3 x 22/7 x 9 x 7\n= 1/3 x 198\n= 66 cm³\n\nAnswer: 66 cm³",
        },
        {
          title: "Example 3",
          content:
            "Question: A sphere has a radius of 6 cm. Calculate the volume of the sphere. (Use π = 3.142)\n\nSolution:\nVolume = 4/3 x πr³\n= 4/3 x 3.142 x 6³\n= 4/3 x 3.142 x 216\n= 4/3 x 678.672\n= 904.896 cm³\n\nAnswer: 904.90 cm³ (2 decimal places)",
        },
        {
          title: "Example 4 (Combined Shapes)",
          content:
            "Question: A solid consists of a cylinder with radius 4 cm and height 10 cm, with a cone of the same radius and height 6 cm placed on top. Calculate the total volume of the solid. (Use π = 3.142)\n\nSolution:\nVolume of Cylinder = πr²h = 3.142 x 4² x 10 = 3.142 x 16 x 10 = 502.72 cm³\nVolume of Cone = 1/3 x πr²h = 1/3 x 3.142 x 16 x 6 = 1/3 x 301.632 = 100.544 cm³\nTotal Volume = 502.72 + 100.544 = 603.264 cm³\n\nAnswer: 603.26 cm³ (2 decimal places)",
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "Volume is always measured in cubic units (cm³, m³), never square units.",
            "Pyramids and cones have 1/3 the volume of a prism/cylinder with the same base and height.",
            "For combined shapes, calculate the volume of each part separately, then add or subtract as appropriate (e.g. if a shape is removed/hollowed out).",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Forgetting to multiply by 1/3 for pyramids and cones.",
            "Using the surface area formula when the question asks for volume, or vice versa.",
            "Wrong units — writing cm² for volume instead of cm³.",
            "For combined shapes, missing out one of the parts when calculating the total volume.",
          ],
        },
      ],
    },
    {
      title: "Chapter Summary",
      subsections: [
        {
          title: "Must Know",
          bulletPoints: [
            "Three-dimensional shapes have faces, edges and vertices that determine their geometric properties.",
            "A net is a two-dimensional shape that can be folded into a three-dimensional shape.",
            "Surface Area = total area of all faces (square units).",
            "Volume = space occupied by a solid shape (cubic units).",
            "Pyramids and cones have 1/3 the volume of a corresponding prism/cylinder with the same base and height.",
          ],
        },
        {
          title: "Key Formulae",
          table: {
            headers: ["Shape", "Surface Area", "Volume"],
            rows: [
              ["Cube", "6s²", "s³"],
              ["Cuboid", "2(lw + lh + wh)", "l x w x h"],
              ["Right prism", "(2 x Base Area) + (Base Perimeter x Height)", "Base Area x Height"],
              ["Cylinder", "2πr(r + h)", "πr²h"],
              ["Right pyramid", "Base Area + Total Area of Lateral Faces", "1/3 x Base Area x Height"],
              ["Cone", "πr(r + l)", "1/3 x πr²h"],
              ["Sphere", "4πr²", "4/3 x πr³"],
            ],
          },
        },
        {
          title: "Exam Tips",
          bulletPoints: [
            "Always write the correct unit: cm² for surface area, cm³ for volume.",
            "Choose the right π value (3.142 or 22/7) based on the numbers in the question to make calculation easier.",
            "Draw a diagram or net if needed to understand the shape more clearly.",
            "For combined shapes, break the solid into basic shapes before calculating.",
            "Double-check whether the question gives the slant height (l) or the vertical height (h) before using the formula.",
          ],
        },
      ],
    },
  ],
  keyExamFacts: [
    "Prisms and pyramids are named according to the shape of their base.",
    "The net of a cone consists of one circle and one sector of a circle.",
    "Surface Area of Cylinder = 2πr(r + h); Volume of Cylinder = πr²h.",
    "Volume of Cone = 1/3 x πr²h; Volume of Pyramid = 1/3 x Base Area x Height.",
    "Surface Area of Sphere = 4πr²; Volume of Sphere = 4/3 x πr³.",
    "Use the slant height (l), not the vertical height (h), for the lateral surface area of a cone.",
    "Surface area units are square (cm²); volume units are cubic (cm³).",
  ],
  keyTerms: [
    "Three-dimensional shape",
    "Prism",
    "Pyramid",
    "Cylinder",
    "Cone",
    "Sphere",
    "Net",
    "Surface area",
    "Volume",
    "Slant height",
    "Apex",
    "Base",
  ],
};
