import type { MindNode } from "@/components/MindMap";

export const mathF1C12MindMapDLP: MindNode = {
  id: "math-c12-dlp-root",
  label: "Data Handling",
  children: [
    {
      id: "math-c12-dlp-1",
      label: "Types of Data",
      children: [
        { id: "math-c12-dlp-1-1", label: "Discrete data: countable (e.g. number of students)" },
        { id: "math-c12-dlp-1-2", label: "Continuous data: measured (e.g. height, weight, time)" },
        { id: "math-c12-dlp-1-3", label: "Qualitative: non-numerical (e.g. colour, gender)" },
        { id: "math-c12-dlp-1-4", label: "Quantitative: numerical (e.g. marks, temperature)" },
      ],
    },
    {
      id: "math-c12-dlp-2",
      label: "Data Collection",
      children: [
        { id: "math-c12-dlp-2-1", label: "Tally chart / frequency table" },
        { id: "math-c12-dlp-2-2", label: "Questionnaire / survey" },
        { id: "math-c12-dlp-2-3", label: "Direct observation" },
      ],
    },
    {
      id: "math-c12-dlp-3",
      label: "Measures of Central Tendency",
      children: [
        {
          id: "math-c12-dlp-3-1",
          label: "Mean (Average)",
          children: [
            { id: "math-c12-dlp-3-1-1", label: "Mean = Sum of values ÷ Number of values" },
            { id: "math-c12-dlp-3-1-2", label: "Affected by extreme values (outliers)" },
          ],
        },
        {
          id: "math-c12-dlp-3-2",
          label: "Mode",
          children: [
            { id: "math-c12-dlp-3-2-1", label: "Most frequently occurring value" },
            { id: "math-c12-dlp-3-2-2", label: "Can have more than one mode" },
          ],
        },
        {
          id: "math-c12-dlp-3-3",
          label: "Median",
          children: [
            { id: "math-c12-dlp-3-3-1", label: "Middle value when arranged in order" },
            { id: "math-c12-dlp-3-3-2", label: "Odd count: middle value" },
            { id: "math-c12-dlp-3-3-3", label: "Even count: mean of two middle values" },
          ],
        },
      ],
    },
    {
      id: "math-c12-dlp-4",
      label: "Range",
      children: [
        { id: "math-c12-dlp-4-1", label: "Range = Largest value − Smallest value" },
        { id: "math-c12-dlp-4-2", label: "Measures spread of data" },
        { id: "math-c12-dlp-4-3", label: "Outliers increase the range significantly" },
      ],
    },
    {
      id: "math-c12-dlp-5",
      label: "Data Representation",
      children: [
        { id: "math-c12-dlp-5-1", label: "Bar chart" },
        { id: "math-c12-dlp-5-2", label: "Pie chart: angle = value/total × 360°" },
        { id: "math-c12-dlp-5-3", label: "Pictograph" },
        { id: "math-c12-dlp-5-4", label: "Histogram: continuous data (no gaps between bars)" },
        { id: "math-c12-dlp-5-5", label: "Frequency polygon: connect midpoints of histogram bars" },
      ],
    },
  ],
};
