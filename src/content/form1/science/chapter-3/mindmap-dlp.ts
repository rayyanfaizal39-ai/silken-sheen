import type { MindNode } from "@/components/MindMap";

export const scienceF1C3MindMapDLP: MindNode = {
  id: "science-c3-dlp-root",
  label: "Homeostasis",
  children: [
    {
      id: "science-c3-dlp-1",
      label: "Definition and Importance",
      children: [
        { id: "science-c3-dlp-1-1", label: "Maintenance of internal environment" },
        { id: "science-c3-dlp-1-2", label: "Balanced and stable conditions" },
        { id: "science-c3-dlp-1-3", label: "Ensures living processes work well" },
        { id: "science-c3-dlp-1-4", label: "Prevents cell death" },
      ],
    },
    {
      id: "science-c3-dlp-2",
      label: "Homeostasis Control Process",
      children: [
        { id: "science-c3-dlp-2-1", label: "Environment change" },
        { id: "science-c3-dlp-2-2", label: "Control center (Brain)" },
        { id: "science-c3-dlp-2-3", label: "Corrective mechanism" },
      ],
    },
    {
      id: "science-c3-dlp-3",
      label: "Regulation of Body Temperature",
      children: [
        { id: "science-c3-dlp-3-1", label: "Normal range (37°C)" },
        {
          id: "science-c3-dlp-3-2",
          label: "High Surrounding Temperature",
          children: [
            { id: "science-c3-dlp-3-2-1", label: "Sweat glands produce more sweat" },
            { id: "science-c3-dlp-3-2-2", label: "Hairs lie flat" },
            { id: "science-c3-dlp-3-2-3", label: "Blood vessels dilate" },
            { id: "science-c3-dlp-3-2-4", label: "Reduced hormone secretion" },
            { id: "science-c3-dlp-3-2-5", label: "Less urine" },
          ],
        },
        {
          id: "science-c3-dlp-3-3",
          label: "Low Surrounding Temperature",
          children: [
            { id: "science-c3-dlp-3-3-1", label: "Hairs stand upright (insulation)" },
            { id: "science-c3-dlp-3-3-2", label: "Blood vessels constrict" },
            { id: "science-c3-dlp-3-3-3", label: "Shivering (skeletal muscle contraction)" },
            { id: "science-c3-dlp-3-3-4", label: "Increased body metabolism" },
          ],
        },
        {
          id: "science-c3-dlp-3-4",
          label: "Organs Involved",
          children: [
            { id: "science-c3-dlp-3-4-1", label: "Skin" },
            { id: "science-c3-dlp-3-4-2", label: "Brain" },
            { id: "science-c3-dlp-3-4-3", label: "Skeletal muscles" },
          ],
        },
      ],
    },
    {
      id: "science-c3-dlp-4",
      label: "Regulation of Water Content",
      children: [
        {
          id: "science-c3-dlp-4-1",
          label: "High Water Level",
          children: [
            { id: "science-c3-dlp-4-1-1", label: "Brain detects change" },
            { id: "science-c3-dlp-4-1-2", label: "Kidneys increase urine production" },
          ],
        },
        {
          id: "science-c3-dlp-4-2",
          label: "Low Water Level",
          children: [
            { id: "science-c3-dlp-4-2-1", label: "Brain detects change" },
            { id: "science-c3-dlp-4-2-2", label: "Kidneys decrease urine production" },
            { id: "science-c3-dlp-4-2-3", label: "Feeling thirsty" },
          ],
        },
        {
          id: "science-c3-dlp-4-3",
          label: "Organs and Systems",
          children: [
            { id: "science-c3-dlp-4-3-1", label: "Kidney" },
            { id: "science-c3-dlp-4-3-2", label: "Brain" },
            { id: "science-c3-dlp-4-3-3", label: "Endocrine system" },
          ],
        },
      ],
    },
    {
      id: "science-c3-dlp-5",
      label: "Homeostasis in Plants",
      children: [
        {
          id: "science-c3-dlp-5-1",
          label: "Transpiration",
          children: [
            { id: "science-c3-dlp-5-1-1", label: "Water loss through stoma" },
            { id: "science-c3-dlp-5-1-2", label: "Cools plant on hot days" },
            { id: "science-c3-dlp-5-1-3", label: "Aids water and mineral absorption" },
            { id: "science-c3-dlp-5-1-4", label: "Nutrient transport" },
          ],
        },
        {
          id: "science-c3-dlp-5-2",
          label: "Stoma and Guard Cells",
          children: [
            { id: "science-c3-dlp-5-2-1", label: "Guard cells control opening" },
            { id: "science-c3-dlp-5-2-2", label: "Opens during the day" },
            { id: "science-c3-dlp-5-2-3", label: "Closes at very high temperatures" },
          ],
        },
      ],
    },
  ],
};
