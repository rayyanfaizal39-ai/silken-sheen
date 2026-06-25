import type { StructuredNotes } from "@/data/types";

export const mathF2C10NotesDLP: StructuredNotes = {
  chapterSummary:
    "Chapter 10 Gradient and Area under a Graph covers the concept of the gradient of a straight line, distance-time graphs, speed-time graphs, and how to calculate the area under a speed-time graph to obtain the distance travelled.",
  quickRevision: [
    "Gradient = vertical change / horizontal change.",
    "A line that rises from left to right has a positive gradient; a line that falls has a negative gradient.",
    "The gradient of a distance-time graph = speed.",
    "The gradient of a speed-time graph = acceleration (positive) or deceleration (negative).",
    "The area under a speed-time graph = distance travelled.",
    "A horizontal line on a distance-time graph means the object is stationary (speed = 0).",
    "A horizontal line on a speed-time graph means the object is moving at uniform speed (acceleration = 0).",
  ],
  sections: [
    {
      title: "Learning Outcomes",
      subsections: [
        {
          content: "By the end of this chapter, students should be able to:",
          bulletPoints: [
            "Determine the gradient of a straight line.",
            "Explain the meaning of a distance-time graph and calculate speed from such a graph.",
            "Explain the meaning of a speed-time graph and calculate acceleration from such a graph.",
            "Calculate the area under a speed-time graph to obtain the distance travelled.",
            "Solve problems involving gradient and area under a graph in everyday situations.",
          ],
        },
      ],
    },
    {
      title: "10.1 Gradient of a Straight Line",
      subsections: [
        {
          title: "Definition",
          content:
            "The gradient of a straight line is a measure of its steepness. The gradient shows the rate of vertical change compared to horizontal change between two points on the line.",
        },
        {
          title: "Formula",
          formula:
            "Gradient, m = vertical change / horizontal change\nm = (y2 - y1) / (x2 - x1)",
        },
        {
          title: "Types of Gradient",
          table: {
            headers: ["Type of Line", "Sign of Gradient"],
            rows: [
              ["Rising from left to right", "Positive (+)"],
              ["Falling from left to right", "Negative (-)"],
              ["Horizontal (parallel to x-axis)", "Zero (0)"],
              ["Vertical (parallel to y-axis)", "Undefined"],
            ],
          },
        },
        {
          title: "Example 1",
          content:
            "Question: A straight line passes through points A(2, 3) and B(6, 11). Find the gradient of line AB.\nSolution:\nm = (y2 - y1) / (x2 - x1)\nm = (11 - 3) / (6 - 2)\nm = 8 / 4\nAnswer: m = 2",
        },
        {
          title: "Example 2",
          content:
            "Question: A straight line passes through points P(1, 8) and Q(5, 0). Find the gradient of line PQ.\nSolution:\nm = (0 - 8) / (5 - 1)\nm = -8 / 4\nAnswer: m = -2 (negative gradient because the line is falling)",
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "Gradient has no units when it represents ordinary steepness, but on a distance-time or speed-time graph, the gradient has units (e.g. m/s, m/s²).",
            "Keep the order of (x1, y1) and (x2, y2) consistent when calculating the vertical and horizontal differences.",
            "A straight line passing through the origin (0,0) has the equation y = mx.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Inverting the formula, i.e. calculating horizontal change / vertical change.",
            "Being inconsistent with the order of subtraction, e.g. (y1 - y2) divided by (x2 - x1).",
            "Making a sign error when one of the points has a negative coordinate.",
          ],
        },
      ],
    },
    {
      title: "10.2 Distance-Time Graph",
      subsections: [
        {
          title: "Definition",
          content:
            "A distance-time graph shows the relationship between the distance travelled by an object and time. The y-axis represents distance (e.g. in metres or kilometres) and the x-axis represents time (e.g. in seconds, minutes or hours).",
        },
        {
          title: "Formula",
          formula: "Speed = Gradient of distance-time graph = change in distance / change in time",
        },
        {
          title: "Characteristics of the Graph",
          table: {
            headers: ["Shape of Graph", "Meaning"],
            rows: [
              ["Straight line rising", "Object moving at uniform (constant) speed"],
              ["Horizontal line", "Object is stationary (speed = 0)"],
              ["Straight line falling", "Object moving back towards its starting point (distance decreasing)"],
              ["Curved line", "Speed of the object is changing (non-uniform speed)"],
            ],
          },
        },
        {
          title: "Example 1",
          content:
            "Question: A car travels a distance of 120 km in 2 hours at a uniform speed. Find the speed of the car in km/h.\nSolution:\nSpeed = distance / time\nSpeed = 120 / 2\nAnswer: Speed = 60 km/h",
        },
        {
          title: "Example 2",
          content:
            "Question: A distance-time graph shows an object moving from point (0, 0) to point (4, 80), where time is in seconds and distance is in metres. Find the speed of the object.\nSolution:\nSpeed = (80 - 0) / (4 - 0)\nSpeed = 80 / 4\nAnswer: Speed = 20 m/s",
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "The gradient of a distance-time graph ALWAYS represents speed, not acceleration.",
            "A distance-time graph should not fall if 'distance' strictly means total distance travelled (which is always positive or zero); a falling line is usually used when the context is displacement.",
            "A horizontal line means the object is not moving (stationary) even though time continues to pass.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Confusing the x-axis and y-axis — the y-axis is distance, the x-axis is time, NOT the other way round.",
            "Assuming a horizontal line means maximum speed, when it actually means the object has stopped.",
            "Making unit errors when time is given in minutes but speed is required in seconds or hours.",
          ],
        },
      ],
    },
    {
      title: "10.3 Speed-Time Graph",
      subsections: [
        {
          title: "Definition",
          content:
            "A speed-time graph shows the relationship between the speed of an object and time. The y-axis represents speed (e.g. in m/s) and the x-axis represents time (e.g. in seconds).",
        },
        {
          title: "Formula",
          formula:
            "Acceleration = Gradient of speed-time graph = change in speed / change in time\na = (v2 - v1) / (t2 - t1)",
        },
        {
          title: "Characteristics of the Graph",
          table: {
            headers: ["Shape of Graph", "Meaning"],
            rows: [
              ["Straight line rising", "Positive acceleration (object speeding up)"],
              ["Horizontal line", "Zero acceleration (uniform/constant speed)"],
              ["Straight line falling", "Negative acceleration / deceleration (object slowing down)"],
            ],
          },
        },
        {
          title: "Example 1",
          content:
            "Question: A motorcycle accelerates from a speed of 5 m/s to 25 m/s in 4 seconds. Find the acceleration of the motorcycle.\nSolution:\na = (v2 - v1) / (t2 - t1)\na = (25 - 5) / 4\na = 20 / 4\nAnswer: a = 5 m/s²",
        },
        {
          title: "Example 2",
          content:
            "Question: A car travelling at 30 m/s brakes and comes to a stop in 6 seconds. Find the deceleration of the car.\nSolution:\na = (v2 - v1) / (t2 - t1)\na = (0 - 30) / 6\na = -5 m/s²\nAnswer: Deceleration = 5 m/s² (the negative sign shows speed is decreasing)",
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "The gradient of a speed-time graph ALWAYS represents acceleration, not speed.",
            "Negative acceleration (deceleration) means the object is slowing down, not moving backwards.",
            "A horizontal line at the time axis (speed = 0) means the object is completely stationary during that interval.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Confusing speed-time graphs with distance-time graphs since both use the x-axis for time.",
            "Forgetting the negative sign when stating a deceleration.",
            "Assuming the gradient of a speed-time graph gives distance, when it actually gives acceleration.",
          ],
        },
      ],
    },
    {
      title: "10.4 Area under a Speed-Time Graph",
      subsections: [
        {
          title: "Definition",
          content:
            "The area under a speed-time graph, between the graph and the time axis, represents the distance travelled by the object during that time interval.",
        },
        {
          title: "Formula",
          formula:
            "Distance = Area under the speed-time graph\nArea of a triangle = 1/2 x base x height\nArea of a rectangle = length x width\nArea of a trapezium = 1/2 x (a + b) x h, where a and b are the parallel sides and h is the distance between the parallel sides",
        },
        {
          title: "Example 1",
          content:
            "Question: A car accelerates uniformly from rest (0 m/s) to 20 m/s in 10 seconds. The speed-time graph forms a triangle. Find the distance travelled by the car.\nSolution:\nDistance = Area of triangle\nDistance = 1/2 x base x height\nDistance = 1/2 x 10 x 20\nAnswer: Distance = 100 m",
        },
        {
          title: "Example 2",
          content:
            "Question: A speed-time graph shows an object moving at a uniform speed of 15 m/s for 8 seconds, then decelerating uniformly to a stop over the next 4 seconds. The shape of the graph is a trapezium with the parallel sides being 8 seconds (top, at 15 m/s) and the total base of 12 seconds (bottom). Find the total distance travelled by the object.\nSolution:\nArea of trapezium = 1/2 x (a + b) x h\nwhere a = 8 (duration of uniform speed), b = 12 (total time), h = 15 (maximum speed)\nDistance = 1/2 x (8 + 12) x 15\nDistance = 1/2 x 20 x 15\nAnswer: Distance = 150 m",
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "Break down a complex graph into basic shapes (triangle, rectangle, trapezium) before calculating area.",
            "Add up the area of each part to obtain the total distance travelled.",
            "The unit of distance depends on the units of speed and time used, e.g. m/s x s = m.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Using the triangle area formula for a trapezium shape, or vice versa.",
            "Missing out one part of the graph when breaking the diagram into smaller shapes.",
            "Calculating the area above the time axis but ignoring the part below the axis (if speed is treated as negative, this must be interpreted according to the context of the question).",
            "Misidentifying the parallel sides (a and b) of a trapezium on a slanted graph.",
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
            "Gradient = vertical change / horizontal change.",
            "Gradient of a distance-time graph = speed.",
            "Gradient of a speed-time graph = acceleration.",
            "Area under a speed-time graph = distance.",
          ],
        },
        {
          title: "Important Formulas",
          formula:
            "m = (y2 - y1) / (x2 - x1)\nSpeed = change in distance / change in time\nAcceleration = change in speed / change in time\nDistance = Area under the speed-time graph",
        },
        {
          title: "Exam Tips",
          bulletPoints: [
            "Always label the x-axis and y-axis carefully before interpreting a graph.",
            "Draw helper lines or break the graph into basic shapes to make area calculations easier.",
            "Recheck the sign of the gradient (positive/negative) based on the shape of the graph — rising or falling.",
            "Make sure the units of your final answer are consistent with the units given in the question.",
          ],
        },
      ],
    },
  ],
  keyExamFacts: [
    "Gradient = vertical change / horizontal change = (y2 - y1) / (x2 - x1).",
    "The gradient of a distance-time graph gives the speed of the object.",
    "The gradient of a speed-time graph gives the acceleration of the object.",
    "Negative acceleration is called deceleration, showing the object is slowing down.",
    "The area under a speed-time graph (between the graph and the time axis) gives the distance travelled.",
    "A horizontal line on a distance-time graph means the object is stationary; a horizontal line on a speed-time graph means uniform speed.",
    "Complex shapes on a speed-time graph can be broken into triangles, rectangles and trapeziums to calculate total distance.",
  ],
  keyTerms: [
    "Gradient",
    "Straight line",
    "Distance-time graph",
    "Speed-time graph",
    "Speed",
    "Acceleration",
    "Deceleration",
    "Area under a graph",
    "Trapezium",
    "Uniform speed",
  ],
};
