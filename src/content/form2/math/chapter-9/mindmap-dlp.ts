import type { MindNode } from "@/components/MindMap";

export const mathF2C9MindMapDLP: MindNode = {
  id: "math-c9-dlp-root",
  label: "Speed and Acceleration",
  children: [
    {
      id: "math-c9-dlp-1",
      label: "9.1 Speed",
      children: [
        {
          id: "math-c9-dlp-1-1",
          label: "Definition",
          children: [
            { id: "math-c9-dlp-1-1-1", label: "Rate of change of distance with respect to time" },
            { id: "math-c9-dlp-1-1-2", label: "Scalar quantity (no direction)" },
          ],
        },
        {
          id: "math-c9-dlp-1-2",
          label: "Formula",
          children: [
            { id: "math-c9-dlp-1-2-1", label: "Speed = Distance / Time" },
            { id: "math-c9-dlp-1-2-2", label: "Distance = Speed x Time" },
            { id: "math-c9-dlp-1-2-3", label: "Time = Distance / Speed" },
          ],
        },
        {
          id: "math-c9-dlp-1-3",
          label: "Units",
          children: [
            { id: "math-c9-dlp-1-3-1", label: "m/s (metres per second)" },
            { id: "math-c9-dlp-1-3-2", label: "km/h (kilometres per hour)" },
          ],
        },
        {
          id: "math-c9-dlp-1-4",
          label: "Unit Conversion",
          children: [
            { id: "math-c9-dlp-1-4-1", label: "km/h to m/s: x (1000/3600) = x (5/18)" },
            { id: "math-c9-dlp-1-4-2", label: "m/s to km/h: x (3600/1000) = x (18/5)" },
            { id: "math-c9-dlp-1-4-3", label: "Example: 72 km/h = 20 m/s" },
          ],
        },
        {
          id: "math-c9-dlp-1-5",
          label: "Types of Speed",
          children: [
            { id: "math-c9-dlp-1-5-1", label: "Uniform speed (constant)" },
            { id: "math-c9-dlp-1-5-2", label: "Instantaneous speed (at a particular moment)" },
          ],
        },
      ],
    },
    {
      id: "math-c9-dlp-2",
      label: "9.2 Average Speed",
      children: [
        {
          id: "math-c9-dlp-2-1",
          label: "Definition",
          children: [
            { id: "math-c9-dlp-2-1-1", label: "Total distance divided by total time" },
            { id: "math-c9-dlp-2-1-2", label: "NOT the arithmetic mean of the speed values" },
          ],
        },
        {
          id: "math-c9-dlp-2-2",
          label: "Formula",
          children: [
            { id: "math-c9-dlp-2-2-1", label: "Average Speed = Total Distance / Total Time" },
          ],
        },
        {
          id: "math-c9-dlp-2-3",
          label: "Key Points",
          children: [
            { id: "math-c9-dlp-2-3-1", label: "Add up all distances first" },
            { id: "math-c9-dlp-2-3-2", label: "Add up all time taken (including rest time if relevant)" },
            { id: "math-c9-dlp-2-3-3", label: "Example: 140 km in 3 hours = 46.67 km/h" },
          ],
        },
      ],
    },
    {
      id: "math-c9-dlp-3",
      label: "9.3 Acceleration and Deceleration",
      children: [
        {
          id: "math-c9-dlp-3-1",
          label: "Definition",
          children: [
            { id: "math-c9-dlp-3-1-1", label: "Rate of change of speed with respect to time" },
            { id: "math-c9-dlp-3-1-2", label: "Positive acceleration: speed increases" },
            { id: "math-c9-dlp-3-1-3", label: "Deceleration: speed decreases (negative acceleration)" },
          ],
        },
        {
          id: "math-c9-dlp-3-2",
          label: "Formula",
          children: [
            { id: "math-c9-dlp-3-2-1", label: "a = (v - u) / t" },
            { id: "math-c9-dlp-3-2-2", label: "u = initial speed, v = final speed, t = time" },
          ],
        },
        {
          id: "math-c9-dlp-3-3",
          label: "Unit",
          children: [{ id: "math-c9-dlp-3-3-1", label: "m/s² (metres per second squared)" }],
        },
        {
          id: "math-c9-dlp-3-4",
          label: "Special Cases",
          children: [
            { id: "math-c9-dlp-3-4-1", label: "Zero acceleration = constant speed" },
            { id: "math-c9-dlp-3-4-2", label: "Starting from rest: u = 0" },
          ],
        },
      ],
    },
    {
      id: "math-c9-dlp-4",
      label: "Common Mistakes",
      children: [
        { id: "math-c9-dlp-4-1", label: "Forgetting to convert units between km/h and m/s" },
        { id: "math-c9-dlp-4-2", label: "Averaging two speeds directly instead of using total distance/total time" },
        { id: "math-c9-dlp-4-3", label: "Sign errors for deceleration" },
        { id: "math-c9-dlp-4-4", label: "Using (u - v) instead of (v - u) in the formula" },
      ],
    },
    {
      id: "math-c9-dlp-5",
      label: "Summary",
      children: [
        { id: "math-c9-dlp-5-1", label: "Speed = Distance / Time" },
        { id: "math-c9-dlp-5-2", label: "Average Speed = Total Distance / Total Time" },
        { id: "math-c9-dlp-5-3", label: "Acceleration = (v - u) / t" },
        { id: "math-c9-dlp-5-4", label: "1 km/h = 5/18 m/s" },
      ],
    },
  ],
};
