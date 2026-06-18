import type { StructuredNotes } from "@/data/types";

export const mathF1C4NotesDLP: StructuredNotes = {
  chapterSummary:
    "Chapter 4 explains ratios, rates and proportions, and how they are applied to everyday life such as cooking, speed, maps and finance.",
  quickRevision: [
    "A ratio compares two or more quantities of the same kind in the same unit: a : b.",
    "Equivalent ratios are formed when both terms are multiplied or divided by the same non-zero number.",
    "The simplest form is obtained by dividing all terms by their HCF.",
    "A rate compares two quantities of different kinds or units, e.g. km/h.",
    "A proportion is an equation showing two equivalent ratios or rates: a : b = c : d.",
    "Cross multiplication: if a/b = c/d, then a × d = b × c.",
    "Percentages can be written as ratios: 20% = 20 : 100 = 1 : 5.",
  ],
  sections: [
    {
      title: "Learning Outcomes",
      subsections: [
        {
          content: "By the end of this chapter, students should be able to:",
          bulletPoints: [
            "Understand the concept of ratio and write it in simplest form.",
            "Form equivalent ratios and combine two ratios.",
            "Understand rates and perform unit conversion.",
            "Understand proportions and solve problems using three methods.",
            "Relate ratios to percentages.",
            "Solve real-world problems involving ratios, rates and proportions.",
          ],
        },
      ],
    },
    {
      title: "1. Ratios",
      subsections: [
        {
          title: "Meaning of Ratio",
          content:
            "A ratio compares two or more quantities of the same kind and same unit. Ratios are written as a : b or a : b : c.",
          formula: "a : b\nExample: 3 apples : 5 oranges is written 3 : 5",
        },
        {
          title: "Important Conditions",
          content:
            "The quantities must be of the same type and same unit before a ratio can be formed.",
          bulletPoints: [
            "Same type: distance with distance, mass with mass.",
            "Same unit: convert 1 m to 100 cm before comparing with cm.",
          ],
        },
        {
          title: "Ratio as a Fraction",
          content:
            "The ratio a : b can be written as the fraction a/b, showing the first part relative to the second.",
          formula: "a : b = a/b",
        },
      ],
    },
    {
      title: "2. Equivalent Ratios",
      subsections: [
        {
          title: "Meaning of Equivalent Ratios",
          content:
            "Equivalent ratios have the same value although they are written differently. They are formed by multiplying or dividing each term by the same non-zero number.",
          formula: "2 : 3 = 4 : 6 = 6 : 9 = 8 : 12",
        },
        {
          title: "Examples",
          bulletPoints: [
            "2 : 3 multiplied by 2 → 4 : 6",
            "10 : 15 divided by 5 → 2 : 3",
            "6 : 9 : 12 divided by 3 → 2 : 3 : 4",
          ],
        },
      ],
    },
    {
      title: "3. Simplest Form",
      subsections: [
        {
          title: "Meaning",
          content:
            "A ratio is in simplest form when no whole number other than 1 can divide all its terms.",
        },
        {
          title: "Steps",
          bulletPoints: [
            "Find the HCF of all the terms in the ratio.",
            "Divide each term by the HCF.",
            "Make sure all terms have the same unit.",
          ],
          formula: "12 : 18 → HCF = 6 → 2 : 3",
        },
      ],
    },
    {
      title: "4. Combining Ratios",
      subsections: [
        {
          title: "Concept",
          content:
            "Given A : B and B : C, the common term B must be made equal first before combining the ratios into A : B : C.",
        },
        {
          title: "Steps",
          bulletPoints: [
            "Identify the common term.",
            "Find the LCM of the common term values in both ratios.",
            "Multiply each ratio so the common term becomes equal.",
            "Write the combined ratio A : B : C.",
          ],
          formula: "A : B = 2 : 3 and B : C = 4 : 5\nMake B equal: 12\nA : B = 8 : 12, B : C = 12 : 15\nA : B : C = 8 : 12 : 15",
        },
      ],
    },
    {
      title: "5. Rates",
      subsections: [
        {
          title: "Meaning of Rate",
          content:
            "A rate compares two quantities of different kinds or different units. Rates are usually written using 'per' or '/'.",
        },
        {
          title: "Examples of Rates",
          table: {
            headers: ["Context", "Rate"],
            rows: [
              ["Car speed", "60 km/h"],
              ["Price of fruit", "RM 5 per kg"],
              ["Fuel consumption", "12 km per litre"],
              ["Salary", "RM 15 per hour"],
            ],
          },
        },
      ],
    },
    {
      title: "6. Unit Conversion",
      subsections: [
        {
          title: "Concept",
          content:
            "When converting units in a rate, use the correct conversion factor and convert the numerator or denominator as required.",
          formula: "1 m = 100 cm\n1 km = 1000 m\n1 hour = 60 minutes\n1 kg = 1000 g",
        },
        {
          title: "Example",
          content:
            "Convert RM 12 per metre to RM per cm.\nSolution: RM 12 / 100 cm = RM 0.12 per cm.",
        },
      ],
    },
    {
      title: "7. Proportions",
      subsections: [
        {
          title: "Meaning of Proportion",
          content:
            "A proportion is an equation showing that two ratios or two rates are equivalent.",
          formula: "a : b = c : d\nor a/b = c/d",
        },
        {
          title: "Features",
          bulletPoints: [
            "The ratios in a proportion are equivalent.",
            "Can be solved using the unitary, proportion or cross multiplication method.",
          ],
        },
      ],
    },
    {
      title: "8. Unitary Method",
      subsections: [
        {
          title: "Concept",
          content:
            "Find the value of one unit first, then multiply by the number of units required.",
        },
        {
          title: "Example",
          content:
            "If 4 books cost RM 20, what is the cost of 7 books?\nStep 1: 1 book = RM 20 ÷ 4 = RM 5.\nStep 2: 7 books = 7 × RM 5 = RM 35.",
        },
      ],
    },
    {
      title: "9. Proportion Method",
      subsections: [
        {
          title: "Concept",
          content:
            "Write the two equivalent ratios as fractions and solve for the unknown value.",
          formula: "a/b = c/d",
        },
        {
          title: "Example",
          content:
            "If 3 pens cost RM 9, what is the cost of 5 pens?\nProportion: 3/9 = 5/x → x = (5 × 9) / 3 = RM 15.",
        },
      ],
    },
    {
      title: "10. Cross-Multiplication Method",
      subsections: [
        {
          title: "Concept",
          content:
            "When a/b = c/d, then a × d = b × c. This method is useful when the unknown is in the numerator or denominator.",
          formula: "a × d = b × c",
        },
        {
          title: "Example",
          content:
            "Solve 4/6 = x/9.\nCross multiply: 4 × 9 = 6 × x → 36 = 6x → x = 6.",
        },
      ],
    },
    {
      title: "11. Relationship With Percentages",
      subsections: [
        {
          title: "Percentage as a Ratio",
          content: "A percentage can be written as a ratio out of 100.",
          formula: "20% = 20 : 100 = 1 : 5\nx/100 = Part/Whole",
        },
        {
          title: "Examples",
          bulletPoints: [
            "50% = 50 : 100 = 1 : 2",
            "25% = 25 : 100 = 1 : 4",
            "80% = 80 : 100 = 4 : 5",
          ],
        },
      ],
    },
    {
      title: "12. Applications and Problem Solving",
      subsections: [
        {
          title: "Everyday Contexts",
          bulletPoints: [
            "Cooking: scaling recipes for different numbers of people.",
            "Science: calculating speed using distance per time.",
            "Geography: map scales such as 1 : 50 000.",
            "Finance: unit pricing and best buy decisions.",
          ],
        },
        {
          title: "Population Estimation",
          content:
            "The capture-mark-release-recapture method estimates animal population size.",
          formula:
            "(Number of recaptured that are marked) / (Total recaptured) = (Originally marked) / (Estimated population)",
        },
      ],
    },
    {
      title: "13. Comparison Summary",
      subsections: [
        {
          table: {
            headers: ["Concept", "Feature", "Example"],
            rows: [
              ["Ratio", "Same kind, same unit", "3 : 5"],
              ["Rate", "Different kinds or units", "60 km/h"],
              ["Proportion", "Two equivalent ratios/rates", "2 : 3 = 4 : 6"],
            ],
          },
        },
      ],
    },
  ],
  keyExamFacts: [
    "Ratios must have the same unit before they are simplified.",
    "Divide all terms by the HCF to find the simplest form.",
    "To combine A : B and B : C, make the value of B equal first.",
    "Rate = first quantity ÷ second quantity, e.g. km ÷ hour.",
    "Cross multiplication a × d = b × c only applies to proportions a/b = c/d.",
    "20% = 1 : 5; 25% = 1 : 4; 50% = 1 : 2.",
    "Population estimation uses the capture-mark-release-recapture method.",
  ],
  keyTerms: [
    "Ratio",
    "Equivalent ratio",
    "Simplest form",
    "Rate",
    "Proportion",
    "Unitary method",
    "Cross multiplication",
    "Conversion factor",
    "Percentage",
  ],
};
