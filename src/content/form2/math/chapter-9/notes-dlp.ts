import type { StructuredNotes } from "@/data/types";

export const mathF2C9NotesDLP: StructuredNotes = {
  chapterSummary:
    "Chapter 9 Speed and Acceleration helps students understand the concepts of speed, average speed, acceleration and deceleration in daily life, including how to convert units between km/h and m/s and how to solve problems involving distance, time, velocity and acceleration.",
  quickRevision: [
    "Speed = distance travelled / time taken.",
    "Average speed = total distance / total time, NOT the average of several speed values.",
    "Acceleration = change in speed / time taken.",
    "Deceleration is negative acceleration, meaning speed decreases over time.",
    "1 km/h = 1000/3600 m/s; 1 m/s = 3600/1000 km/h.",
    "The standard unit of speed is m/s or km/h; the standard unit of acceleration is m/s².",
  ],
  sections: [
    {
      title: "Learning Outcomes",
      subsections: [
        {
          content: "By the end of this chapter, students should be able to:",
          bulletPoints: [
            "Explain the meaning of speed as the rate of change of distance.",
            "Relate speed, distance and time.",
            "Determine average speed in various situations.",
            "Solve problems involving speed and average speed.",
            "Explain the meaning of acceleration as the rate of change of speed.",
            "Relate acceleration, change in speed and time.",
            "Solve problems involving acceleration and deceleration.",
          ],
        },
      ],
    },
    {
      title: "9.1 Speed",
      subsections: [
        {
          title: "Definition",
          content:
            "Speed is the rate of change of distance with respect to time, that is, a measure of how fast an object is moving. Speed is a scalar quantity (it has magnitude only, with no direction).",
        },
        {
          title: "Formula",
          formula: "Speed = Distance / Time\n\nDistance = Speed x Time\nTime = Distance / Speed",
        },
        {
          title: "Units of Speed",
          table: {
            headers: ["Unit of Distance", "Unit of Time", "Unit of Speed"],
            rows: [
              ["metre (m)", "second (s)", "metre per second (m/s)"],
              ["kilometre (km)", "hour (h)", "kilometre per hour (km/h)"],
            ],
          },
        },
        {
          title: "Converting km/h to m/s",
          content:
            "1 km = 1000 m and 1 hour = 3600 seconds. To convert km/h to m/s, multiply by 1000 and divide by 3600 (that is, multiply by 5/18).",
          formula:
            "km/h to m/s: multiply by (1000/3600) = 5/18\nm/s to km/h: multiply by (3600/1000) = 18/5",
        },
        {
          title: "Example 1",
          content:
            "Question: A car travels 150 km in 3 hours. Calculate the speed of the car in km/h.\nSolution: Speed = Distance / Time = 150 km / 3 h\nAnswer: Speed = 50 km/h",
        },
        {
          title: "Example 2",
          content:
            "Question: Convert 72 km/h to m/s.\nSolution: 72 km/h = 72 x (1000/3600) m/s = 72 x (5/18) m/s = 20 m/s\nAnswer: 72 km/h = 20 m/s",
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "Speed is a scalar quantity; it does not involve direction.",
            "Uniform (constant) speed means an object moves at the same speed at every instant.",
            "Speed can change from time to time; the speed at a particular instant is called instantaneous speed.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Forgetting to convert distance and time to matching units before calculating speed.",
            "Using the wrong conversion direction between km/h and m/s (use 1000/3600, not 3600/1000).",
            "Confusing speed with distance or time in the formula.",
          ],
        },
      ],
    },
    {
      title: "9.2 Average Speed",
      subsections: [
        {
          title: "Definition",
          content:
            "Average speed is the total distance travelled divided by the total time taken for an entire journey, even though the speed varies throughout the journey.",
        },
        {
          title: "Formula",
          formula:
            "Average Speed = Total Distance / Total Time\n\nTotal Distance = Distance 1 + Distance 2 + ...\nTotal Time = Time 1 + Time 2 + ...",
        },
        {
          title: "Example 1",
          content:
            "Question: Ahmad drives 80 km in 1 hour, then drives another 60 km in 2 hours. Calculate the average speed for the whole journey.\nSolution: Total distance = 80 + 60 = 140 km\nTotal time = 1 + 2 = 3 hours\nAverage Speed = 140 / 3\nAnswer: Average speed = 46.67 km/h (2 d.p.)",
        },
        {
          title: "Example 2",
          content:
            "Question: A bus travels at 40 km/h for 2 hours, then stops to rest for 30 minutes, and travels again at 60 km/h for 1 hour. Calculate the average speed for the entire journey (including the rest time).\nSolution: Distance 1 = 40 x 2 = 80 km\nDistance 2 = 60 x 1 = 60 km\nTotal distance = 80 + 60 = 140 km\nTotal time = 2 + 0.5 + 1 = 3.5 hours\nAverage Speed = 140 / 3.5\nAnswer: Average speed = 40 km/h",
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "Average speed MUST be calculated using total distance divided by total time, not the arithmetic average of speed values.",
            "Resting or stopping time is also counted as part of the total time if the question states so.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Calculating average speed by adding two speed values and dividing by 2 (this is WRONG if the durations of each part of the journey are not equal).",
            "Forgetting to include rest/stop time in the total time when the question requires it.",
            "Mistakenly using the distance of only one part of the journey instead of the total distance.",
          ],
        },
      ],
    },
    {
      title: "9.3 Acceleration and Deceleration",
      subsections: [
        {
          title: "Definition",
          content:
            "Acceleration is the rate of change of speed (or velocity) with respect to time. If an object's speed increases, the object experiences positive acceleration (it accelerates). If an object's speed decreases, the object experiences negative acceleration, called deceleration (it decelerates).",
        },
        {
          title: "Formula",
          formula:
            "Acceleration = (Final Speed - Initial Speed) / Time\na = (v - u) / t\n\nwhere:\nu = initial speed\nv = final speed\nt = time taken",
        },
        {
          title: "Unit of Acceleration",
          content:
            "Since acceleration is the change in speed (m/s) divided by time (s), the standard unit of acceleration is metre per second squared (m/s²).",
        },
        {
          title: "Example 1",
          content:
            "Question: A car starts from rest and reaches a speed of 20 m/s in 4 seconds. Calculate the acceleration of the car.\nSolution: Initial speed, u = 0 m/s (starts from rest)\nFinal speed, v = 20 m/s\nTime, t = 4 s\na = (v - u) / t = (20 - 0) / 4\nAnswer: Acceleration = 5 m/s²",
        },
        {
          title: "Example 2",
          content:
            "Question: A motorcycle is travelling at a speed of 25 m/s. After 5 seconds of braking, its speed decreases to 5 m/s. Calculate the deceleration of the motorcycle.\nSolution: Initial speed, u = 25 m/s\nFinal speed, v = 5 m/s\nTime, t = 5 s\na = (v - u) / t = (5 - 25) / 5 = -20 / 5\nAnswer: Acceleration = -4 m/s² (deceleration = 4 m/s²)",
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "Positive acceleration shows speed increasing; negative acceleration (deceleration) shows speed decreasing.",
            "If speed is constant (does not change), the acceleration of the object is zero.",
            "The negative sign in acceleration shows the direction of the change in speed, not simply a smaller magnitude.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Confusing acceleration with speed — acceleration is the RATE OF CHANGE of speed, not speed itself.",
            "Getting the sign wrong when speed decreases; forgetting that deceleration is represented by a negative acceleration value.",
            "Forgetting to convert speed to the same units (for example km/h to m/s) before calculating acceleration in m/s².",
            "Using the wrong formula, i.e. (u - v) instead of (v - u).",
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
            "Speed is the rate of change of distance with time: Speed = Distance / Time.",
            "Average speed = Total Distance / Total Time (not the average of speed values).",
            "Acceleration is the rate of change of speed with time: a = (v - u) / t.",
            "Deceleration is acceleration with a negative sign, showing speed is decreasing.",
            "1 km/h = 5/18 m/s; 1 m/s = 18/5 km/h.",
          ],
          table: {
            headers: ["Quantity", "Formula", "Standard Unit"],
            rows: [
              ["Speed", "Distance / Time", "m/s or km/h"],
              ["Average Speed", "Total Distance / Total Time", "m/s or km/h"],
              ["Acceleration", "(v - u) / t", "m/s²"],
            ],
          },
        },
        {
          title: "Important Formulae",
          formula:
            "Speed = Distance / Time\nAverage Speed = Total Distance / Total Time\nAcceleration, a = (v - u) / t\nkm/h to m/s: x (1000/3600)\nm/s to km/h: x (3600/1000)",
        },
        {
          title: "Exam Tips",
          bulletPoints: [
            "Always check the units in the question — convert to matching units before calculating.",
            "For average speed, calculate the TOTAL distance and TOTAL time first before dividing.",
            "For acceleration, clearly identify the initial speed (u) and final speed (v) before substituting into the formula.",
            "A negative acceleration answer means deceleration — state the magnitude and explain its meaning if asked.",
          ],
        },
      ],
    },
  ],
  keyExamFacts: [
    "Speed = Distance / Time; the standard unit is m/s or km/h.",
    "Average speed = Total Distance / Total Time, not the arithmetic average of speed values.",
    "Acceleration = (Final Speed - Initial Speed) / Time = (v - u) / t; the standard unit is m/s².",
    "Deceleration is negative acceleration, meaning the object's speed decreases with time.",
    "1 km/h = 1000/3600 m/s = 5/18 m/s.",
    "Zero acceleration means the object's speed is constant.",
  ],
  keyTerms: [
    "Speed",
    "Average speed",
    "Uniform speed",
    "Instantaneous speed",
    "Acceleration",
    "Deceleration",
    "Distance",
    "Time",
    "Initial velocity (u)",
    "Final velocity (v)",
  ],
};
