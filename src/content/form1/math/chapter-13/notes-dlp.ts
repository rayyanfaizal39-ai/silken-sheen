import type { StructuredNotes } from "@/data/types";

export const mathF1C13NotesDLP: StructuredNotes = {
  chapterSummary:
    "Chapter 13 introduces Pythagoras' Theorem — one of the most famous theorems in mathematics. Students will learn the relationship between the sides of a right-angled triangle, how to use the formula to find unknown sides, the converse of Pythagoras' Theorem to classify triangles, and its applications in everyday life. This chapter is an important foundation for more advanced geometry topics.",
  quickRevision: [
    "Hypotenuse: the longest side of a right-angled triangle, opposite the 90° angle.",
    "Pythagoras' Theorem: c² = a² + b² (where c = hypotenuse).",
    "Finding the hypotenuse: c = √(a² + b²).",
    "Finding a missing side: a = √(c² − b²) or b = √(c² − a²).",
    "Converse of Pythagoras: if c² = a² + b², the triangle is right-angled.",
    "Acute triangle: c² < a² + b² (largest angle < 90°).",
    "Obtuse triangle: c² > a² + b² (largest angle > 90°).",
    "Common Pythagorean triples: (3,4,5), (5,12,13), (8,15,17), (7,24,25).",
    "Any multiple of a Pythagorean triple also works: (6,8,10), (9,12,15).",
  ],
  keyExamFacts: [
    "The hypotenuse is ALWAYS opposite the 90° angle and ALWAYS the longest side.",
    "c² = a² + b² applies ONLY to RIGHT-ANGLED triangles.",
    "To find a shorter side: subtract, not add — a² = c² − b².",
    "Check answer: the hypotenuse MUST be longer than each of the other sides.",
    "Most common Pythagorean triples: 3-4-5 and 5-12-13.",
    "Converse: THREE things to check — calculate c², calculate a²+b², then compare.",
    "Obtuse triangle: longest side² > sum of squares of the other two sides.",
  ],
  keyTerms: [
    "Hypotenuse",
    "Right-angled triangle",
    "Right angle",
    "Pythagoras' Theorem",
    "Converse of Pythagoras' Theorem",
    "Acute-angled triangle",
    "Obtuse-angled triangle",
    "Pythagorean triple",
    "Diagonal",
  ],
  sections: [
    {
      title: "Learning Outcomes",
      subsections: [
        {
          content: "By the end of this chapter, students should be able to:",
          bulletPoints: [
            "Explain the concept of the hypotenuse and identify it in a right-angled triangle.",
            "Apply Pythagoras' Theorem (c² = a² + b²) to find the length of a side in a right-angled triangle.",
            "Find the length of the hypotenuse when the other two sides are known.",
            "Find the length of a missing side when the hypotenuse and one side are known.",
            "Solve geometry problems involving right-angled triangles.",
            "Apply the converse of Pythagoras' Theorem to determine whether a triangle is right-angled.",
            "Determine whether a triangle is acute-angled or obtuse-angled.",
            "Apply Pythagoras' Theorem in real-life situations.",
          ],
        },
      ],
    },
    {
      title: "1. Introduction to Pythagoras' Theorem",
      subsections: [
        {
          title: "Who was Pythagoras?",
          content:
            "Pythagoras (approximately 570–495 BC) was a famous Greek mathematician. He and his followers studied the relationship between numbers and geometry. Although this relationship may have been known before Pythagoras's time (for example, by the Babylonians and Egyptians), the theorem is named after him.",
        },
        {
          title: "What is Pythagoras' Theorem?",
          content:
            "Pythagoras' Theorem states: In any right-angled triangle, the area of the square built on the hypotenuse equals the sum of the areas of the squares built on the other two sides.",
        },
        {
          title: "Visual Proof of Pythagoras' Theorem",
          content:
            "Imagine three squares built on each side of a right-angled triangle:\n\n     ┌───┐\n     │ c²│\n     └───┘\n      /|\\\n     / | \\\n    /  |  \\\n   /90°|   \\\n  ┌────┴────┐\n  │  a²  b²│\n  └─────────┘\n\nArea of square on hypotenuse (c) = Area of square on side a + Area of square on side b\nc² = a² + b²",
        },
        {
          title: "Importance of Pythagoras' Theorem",
          content:
            "Pythagoras' Theorem is one of the most useful theorems in mathematics and science. It is used in construction (ensuring walls are perpendicular), navigation (finding shortest distances), architecture, engineering, and many other fields.",
        },
      ],
    },
    {
      title: "2. Hypotenuse",
      subsections: [
        {
          title: "Definition of Hypotenuse",
          content:
            "The hypotenuse is the longest side in a right-angled triangle. It is always opposite (facing) the right angle (90°).",
        },
        {
          title: "Characteristics of the Hypotenuse",
          bulletPoints: [
            "The hypotenuse is the LONGEST side in a right-angled triangle.",
            "The hypotenuse is always opposite the 90° angle.",
            "The hypotenuse is NEVER a leg of the right angle — it is always the side facing it.",
            "In the formula c² = a² + b², the letter c represents the hypotenuse.",
          ],
        },
        {
          title: "Identifying the Hypotenuse",
          content:
            "How to identify the hypotenuse:\n① Find the 90° angle (marked with □ or right angle symbol).\n② The side opposite this 90° angle is the hypotenuse.\n\nExample:\n\n        C\n       /|\n      / |\n   c /  | a\n    /   |\n   /90° |\n  A─────B\n      b\n\nIn triangle ABC with right angle at B:\n• Right angle: ∠B = 90°\n• Hypotenuse: AC (opposite ∠B) = side c\n• Two other sides (legs): AB = b and BC = a",
        },
        {
          title: "Common Mistake: Misidentifying the Hypotenuse",
          content:
            "❌ WRONG: 'The hypotenuse is the longest side, so just find the longest side.' This may be TRUE in most cases but the more accurate method is to find the side OPPOSITE the 90° angle. This is important when working with coordinates or diagrams not drawn to scale.",
        },
      ],
    },
    {
      title: "3. Right-Angled Triangles",
      subsections: [
        {
          title: "Definition of a Right-Angled Triangle",
          content:
            "A right-angled triangle is a triangle that has EXACTLY ONE right angle (90°). It is also known as a right triangle.",
        },
        {
          title: "Three Parts of a Right-Angled Triangle",
          bulletPoints: [
            "Hypotenuse (c) — The longest side, opposite the 90° angle.",
            "Side a — One of the legs, adjacent to or opposite a smaller angle.",
            "Side b — The other leg, completing the triangle.",
          ],
        },
        {
          title: "Example: Identifying a Right-Angled Triangle",
          content:
            "How to tell if a triangle is right-angled:\n\n① Look for the □ symbol (right angle marker) in the diagram.\n② Or use the converse of Pythagoras' Theorem: if c² = a² + b², it is right-angled.\n\nExample of a right-angled triangle:\n\n  ●─────────●\n  │         /\n  │        /\n6 │       /  10  ← hypotenuse\n  │      /\n  │     /\n  │□   /\n  ●───●\n     8\n\nCheck: 6² + 8² = 36 + 64 = 100 = 10². ✓ Right-angled!",
        },
        {
          title: "Right-Angled Triangles in Everyday Life",
          content:
            "We encounter right-angled triangles all around us: a ladder leaning against a wall, the diagonal of a television, the diagonal distance across a room, a set square, and much more.",
        },
      ],
    },
    {
      title: "4. Relationship Between the Sides of a Right Triangle",
      subsections: [
        {
          title: "Relationship of Square Areas",
          content:
            "If we build squares on each side of a right-angled triangle:\n\n           ┌──┬──┐\n           │  │  │\n           ├──┼──┤  ← Square c² (on hypotenuse)\n           │  │  │\n      ┌────┼──┼──┼────┐\n      │    │  ╱  │    │\n      │ a² │ ╱   │ b² │\n      │    │╱    │    │\n      └────┘     └────┘\n\nArea of square on c = Area of square on a + Area of square on b\nc × c = (a × a) + (b × b)\nc² = a² + b²",
        },
        {
          title: "Demonstration with Numbers",
          content:
            "3-4-5 triangle:\n• Side a = 3, Side b = 4, Hypotenuse c = 5\n• Square on a: 3 × 3 = 9 units²\n• Square on b: 4 × 4 = 16 units²\n• Square on c: 5 × 5 = 25 units²\n• Check: 9 + 16 = 25 ✓\n\n5-12-13 triangle:\n• 5² + 12² = 25 + 144 = 169 = 13² ✓",
        },
        {
          title: "Pythagorean Triples",
          content:
            "Pythagorean triples are sets of three positive integers (a, b, c) that satisfy a² + b² = c²:\n\n┌──────────────┬────────────────────────┐\n│ Basic Triple │ Example Multiples      │\n├──────────────┼────────────────────────┤\n│ 3, 4, 5      │ 6,8,10 | 9,12,15       │\n│ 5, 12, 13    │ 10,24,26               │\n│ 8, 15, 17    │ 16,30,34               │\n│ 7, 24, 25    │ 14,48,50               │\n└──────────────┴────────────────────────┘\n\nIf you recognise a Pythagorean triple in a question, you can write the answer directly without lengthy calculations!",
        },
      ],
    },
    {
      title: "5. Pythagoras' Theorem Formula",
      subsections: [
        {
          title: "The Main Formula",
          content:
            "╔══════════════════════════════════════╗\n║   c² = a² + b²                      ║\n║                                      ║\n║   Where:                             ║\n║   c = hypotenuse (longest side)      ║\n║   a, b = the other two sides         ║\n╚══════════════════════════════════════╝",
        },
        {
          title: "Other Forms of the Formula",
          content:
            "From c² = a² + b², we can derive:\n\n• Finding hypotenuse: c = √(a² + b²)\n• Finding side a: a² = c² − b² → a = √(c² − b²)\n• Finding side b: b² = c² − a² → b = √(c² − a²)",
        },
        {
          title: "How to Remember the Formula",
          content:
            "Memory aid: 'The hypotenuse squared EQUALS the sum of the squares of the other two sides.'\n\nOr: 'The biggest square = the two smaller squares'\n\nKey: c² (hypotenuse) is always alone on ONE side of the equation. a² + b² (two shorter sides) are on the other side.",
        },
        {
          title: "Conditions for Using the Formula",
          content:
            "IMPORTANT: Pythagoras' Theorem can ONLY be used when:\n✅ The triangle is a RIGHT-ANGLED triangle.\n✅ We know whether the side to be found is the hypotenuse or not.\n\n❌ Do not use it on triangles that are NOT right-angled.",
        },
      ],
    },
    {
      title: "6. Finding the Hypotenuse",
      subsections: [
        {
          title: "Formula for Finding the Hypotenuse",
          content:
            "When the two legs are known and the hypotenuse is to be found:\n\nc = √(a² + b²)",
        },
        {
          title: "Example 1: Basic Hypotenuse",
          content:
            "Question: A right-angled triangle with sides a = 3 cm and b = 4 cm. Find the hypotenuse c.\n\nSolution:\nc² = a² + b²\nc² = 3² + 4²\nc² = 9 + 16\nc² = 25\nc = √25\nc = 5 cm\n\n✓ Check: This is the 3-4-5 triple!",
        },
        {
          title: "Example 2: Hypotenuse with Larger Numbers",
          content:
            "Question: A right-angled triangle with sides a = 5 cm and b = 12 cm. Find the hypotenuse c.\n\nSolution:\nc² = 5² + 12²\nc² = 25 + 144\nc² = 169\nc = √169\nc = 13 cm\n\n✓ Check: 5-12-13 triple!",
        },
        {
          title: "Example 3: Non-Integer Hypotenuse",
          content:
            "Question: A right-angled triangle with sides a = 6 cm and b = 7 cm. Find the hypotenuse c.\n\nSolution:\nc² = 6² + 7²\nc² = 36 + 49\nc² = 85\nc = √85\nc ≈ 9.22 cm (2 decimal places)\n\nNote: √85 does not give an integer, so leave as √85 or use a calculator.",
        },
        {
          title: "Steps for Finding the Hypotenuse",
          bulletPoints: [
            "① Identify that the hypotenuse is needed (side opposite 90°).",
            "② Label the two known sides as a and b.",
            "③ Substitute into the formula: c² = a² + b².",
            "④ Calculate a² and b².",
            "⑤ Add: c² = a² + b².",
            "⑥ Take the square root: c = √(a² + b²).",
            "⑦ Check: c must be longer than both a and b.",
          ],
        },
      ],
    },
    {
      title: "7. Finding a Missing Side",
      subsections: [
        {
          title: "Formula for Finding a Shorter Side",
          content:
            "When the hypotenuse (c) and one side are known, find the other side:\n\na = √(c² − b²)  OR  b = √(c² − a²)\n\nREMINDER: When finding the SHORTER side, we SUBTRACT (not add).",
        },
        {
          title: "Example 1: Finding a Shorter Side",
          content:
            "Question: A right-angled triangle with hypotenuse c = 13 cm and side b = 5 cm. Find side a.\n\nSolution:\na² = c² − b²\na² = 13² − 5²\na² = 169 − 25\na² = 144\na = √144\na = 12 cm\n\n✓ Check: 5² + 12² = 25 + 144 = 169 = 13² ✓",
        },
        {
          title: "Example 2: Finding a Side with Diagram",
          content:
            "Question: In a right-angled triangle, hypotenuse = 17 cm, one leg = 8 cm. Find the other leg.\n\nSolution:\nb² = c² − a²\nb² = 17² − 8²\nb² = 289 − 64\nb² = 225\nb = √225\nb = 15 cm\n\n✓ Check: 8² + 15² = 64 + 225 = 289 = 17² ✓\nThe 8-15-17 triple!",
        },
        {
          title: "Example 3: Finding a Side with Integer Answer",
          content:
            "Question: Hypotenuse = 10 cm, one side = 6 cm. Find the missing side.\n\nSolution:\nb² = 10² − 6²\nb² = 100 − 36\nb² = 64\nb = √64\nb = 8 cm\n\n✓ Triple 6-8-10 (multiple of 3-4-5)!",
        },
        {
          title: "Common Mistake: Adding Instead of Subtracting",
          content:
            "❌ WRONG: a² = c² + b² (INCORRECT — this adds instead of subtracts)\n✅ CORRECT: a² = c² − b² (SUBTRACT because we are finding the shorter side)\n\nMemory aid: 'To find a SHORTER side, SUBTRACT from the hypotenuse'",
        },
      ],
    },
    {
      title: "8. Geometry Problem Solving",
      subsections: [
        {
          title: "Problem-Solving Strategy",
          bulletPoints: [
            "① Draw a diagram (if none given) and label all known information.",
            "② Identify the right-angled triangle in the diagram.",
            "③ Determine which side needs to be found (hypotenuse or leg).",
            "④ Choose the appropriate formula and substitute values.",
            "⑤ Solve and check the answer.",
          ],
        },
        {
          title: "Example 1: Combined Triangles",
          content:
            "Question: ABCD is a rectangle with AB = 8 cm and BC = 6 cm. Find the length of diagonal AC.\n\nSolution:\nIn triangle ABC, ∠B = 90° (rectangle angle)\nAB = 8 cm (leg), BC = 6 cm (leg), AC = hypotenuse\n\nAC² = AB² + BC²\nAC² = 8² + 6²\nAC² = 64 + 36\nAC² = 100\nAC = √100 = 10 cm",
        },
        {
          title: "Example 2: Finding the Height of a Triangle",
          content:
            "Question: Isosceles triangle ABC. AB = AC = 10 cm, BC = 12 cm. Find the height from A to BC.\n\nSolution:\nDraw height AD bisecting BC into two equal halves.\nBD = DC = 12 ÷ 2 = 6 cm\n\nIn right-angled triangle ABD (right angle at D):\nAB² = AD² + BD²\n10² = AD² + 6²\n100 = AD² + 36\nAD² = 64\nAD = 8 cm",
        },
        {
          title: "Example 3: Shared Side",
          content:
            "Question: Two right-angled triangles share a common side. First triangle: sides 5 cm and 12 cm. The shared side = hypotenuse of first triangle. Second triangle: hypotenuse = 20 cm. Find the unknown side of the second triangle.\n\nStep 1: Find hypotenuse of first triangle (= shared side)\nc₁² = 5² + 12² = 25 + 144 = 169\nc₁ = 13 cm\n\nStep 2: Find unknown side in second triangle\nx² = 20² − 13² = 400 − 169 = 231\nx = √231 ≈ 15.2 cm",
        },
      ],
    },
    {
      title: "9. Converse of Pythagoras' Theorem",
      subsections: [
        {
          title: "What is the Converse of Pythagoras' Theorem?",
          content:
            "The converse of Pythagoras' Theorem states: If the square of the longest side of a triangle equals the sum of the squares of the other two sides, then the triangle is a RIGHT-ANGLED triangle.\n\nIn other words:\nIf c² = a² + b², then the angle opposite c is 90°.",
        },
        {
          title: "Difference: Theorem vs Converse",
          content:
            "Pythagoras' Theorem: If a right-angled triangle → then c² = a² + b²\n\nConverse of Pythagoras' Theorem: If c² = a² + b² → then the triangle is right-angled\n\nBoth directions are TRUE for Pythagoras' Theorem.",
        },
        {
          title: "How to Use the Converse",
          bulletPoints: [
            "① Identify all three sides of the triangle: a, b, and c (longest side).",
            "② Calculate c² (square of the longest side).",
            "③ Calculate a² + b² (sum of squares of the other two sides).",
            "④ Compare: if c² = a² + b², it is right-angled.",
          ],
        },
        {
          title: "Example: Using the Converse of Pythagoras",
          content:
            "Question: Is a triangle with sides 9 cm, 12 cm and 15 cm right-angled?\n\nSolution:\nLongest side: c = 15\nOther two sides: a = 9, b = 12\n\nc² = 15² = 225\na² + b² = 9² + 12² = 81 + 144 = 225\n\nSince c² = a² + b² (225 = 225), ✓\nThis triangle IS RIGHT-ANGLED.\n\n(Note: this is the 3-4-5 triple multiplied by 3!)",
        },
      ],
    },
    {
      title: "10. Identifying Right-Angled Triangles",
      subsections: [
        {
          title: "Right-Angled Triangle Test",
          content:
            "╔══════════════════════════════════════════╗\n║  If c² = a² + b²                        ║\n║  (where c is the longest side)           ║\n║  → The triangle IS RIGHT-ANGLED          ║\n║  → Angle opposite c = exactly 90°        ║\n╚══════════════════════════════════════════╝",
        },
        {
          title: "Example 1: Right-Angled Triangle (Triple)",
          content:
            "Question: Is the triangle 5, 12, 13 right-angled?\n\nc = 13 (longest side)\nc² = 13² = 169\na² + b² = 5² + 12² = 25 + 144 = 169\n\n169 = 169 ✓ → RIGHT-ANGLED",
        },
        {
          title: "Example 2: Not a Right-Angled Triangle",
          content:
            "Question: Is the triangle 4, 6, 7 right-angled?\n\nc = 7 (longest side)\nc² = 7² = 49\na² + b² = 4² + 6² = 16 + 36 = 52\n\n49 ≠ 52 → NOT right-angled\n\n(Since 49 < 52, it is an ACUTE-angled triangle)",
        },
      ],
    },
    {
      title: "11. Identifying Acute-Angled Triangles",
      subsections: [
        {
          title: "Acute-Angled Triangle Test",
          content:
            "╔══════════════════════════════════════════╗\n║  If c² < a² + b²                        ║\n║  (where c is the longest side)           ║\n║  → The triangle is ACUTE-ANGLED          ║\n║  → All angles are less than 90°          ║\n╚══════════════════════════════════════════╝",
        },
        {
          title: "Explanation: Why c² < a² + b²?",
          content:
            "In an acute triangle, the longest side is 'short' compared to what it would be in a right-angled triangle. This means the hypotenuse is 'not long enough' to form 90°, so the angle becomes smaller than 90°.",
        },
        {
          title: "Example: Acute-Angled Triangle",
          content:
            "Question: Determine the type of triangle with sides 4, 6, 7.\n\nc = 7 (longest side)\nc² = 49\na² + b² = 16 + 36 = 52\n\n49 < 52 → c² < a² + b² → ACUTE-ANGLED\n\nAll angles in this triangle are less than 90°.",
        },
      ],
    },
    {
      title: "12. Identifying Obtuse-Angled Triangles",
      subsections: [
        {
          title: "Obtuse-Angled Triangle Test",
          content:
            "╔══════════════════════════════════════════╗\n║  If c² > a² + b²                        ║\n║  (where c is the longest side)           ║\n║  → The triangle is OBTUSE-ANGLED         ║\n║  → One angle is greater than 90°         ║\n╚══════════════════════════════════════════╝",
        },
        {
          title: "Explanation: Why c² > a² + b²?",
          content:
            "In an obtuse triangle, the longest side is 'long' compared to what it would be in a right-angled triangle. This means it is 'too long' to form 90°, so the angle becomes greater than 90°.",
        },
        {
          title: "Example: Obtuse-Angled Triangle",
          content:
            "Question: Determine the type of triangle with sides 3, 4, 7.\n\nc = 7 (longest side)\nc² = 49\na² + b² = 9 + 16 = 25\n\n49 > 25 → c² > a² + b² → OBTUSE-ANGLED\n\nOne angle in this triangle is greater than 90°.",
        },
        {
          title: "Note: Check Triangle Validity",
          content:
            "IMPORTANT: Before classifying, ensure the set of numbers can actually form a triangle! Condition: The sum of any two sides MUST be greater than the third side.\nExample: 1, 2, 10 — does NOT form a triangle because 1 + 2 = 3 < 10.",
        },
      ],
    },
    {
      title: "13. Steps to Classify a Triangle",
      subsections: [
        {
          title: "5 Classification Steps",
          content:
            "┌─────────────────────────────────────────────┐\n│ STEP 1: List the 3 sides of the triangle    │\n│ STEP 2: Identify the longest side = c       │\n│ STEP 3: Calculate c²                        │\n│ STEP 4: Calculate a² + b²                   │\n│ STEP 5: Compare and classify                │\n│                                             │\n│ c² = a² + b² → RIGHT-ANGLED                │\n│ c² < a² + b² → ACUTE-ANGLED                │\n│ c² > a² + b² → OBTUSE-ANGLED               │\n└─────────────────────────────────────────────┘",
        },
        {
          title: "Complete Example: 3 Different Triangles",
          content:
            "① Triangle 6, 8, 10:\nc=10: c²=100 | a²+b²=36+64=100 | 100=100 → RIGHT-ANGLED\n\n② Triangle 5, 7, 8:\nc=8: c²=64 | a²+b²=25+49=74 | 64<74 → ACUTE-ANGLED\n\n③ Triangle 3, 5, 7:\nc=7: c²=49 | a²+b²=9+25=34 | 49>34 → OBTUSE-ANGLED",
        },
        {
          title: "Classification Summary Table",
          content:
            "┌──────────────────┬────────────────────┬────────────────────┐\n│ Comparison       │ Triangle Type      │ Largest Angle      │\n├──────────────────┼────────────────────┼────────────────────┤\n│ c² = a² + b²    │ Right-angled       │ Exactly 90°        │\n│ c² < a² + b²    │ Acute-angled       │ Less than 90°      │\n│ c² > a² + b²    │ Obtuse-angled      │ Greater than 90°   │\n└──────────────────┴────────────────────┴────────────────────┘",
        },
        {
          title: "Memory Aid: 'Equal, Less, Greater'",
          content:
            "Easy way to remember:\n• c² EQUAL to a²+b² → angle EQUAL to 90° (exactly right)\n• c² LESS than a²+b² → angle LESS than 90° (acute)\n• c² GREATER than a²+b² → angle GREATER than 90° (obtuse)",
        },
      ],
    },
    {
      title: "14. Real-Life Applications",
      subsections: [
        {
          title: "1. Ladder Against a Wall",
          content:
            "Situation: A 5 m ladder leans against a wall. The base of the ladder is 3 m from the wall. How high does the ladder reach on the wall?\n\n    wall\n      |  /\n    h |/  5m\n      |/\n   ───────\n      3m\n\nh² + 3² = 5²\nh² + 9 = 25\nh² = 16\nh = 4 m\n\nThe ladder reaches a height of 4 m on the wall.",
        },
        {
          title: "2. Flagpole Support Wires",
          content:
            "Situation: A flagpole is 8 m tall. A support wire is attached from the top of the pole to the ground, 6 m from the base. What is the length of the wire?\n\n   top\n    /|\n   / |\n  /  | 8m\n /   |\n/    |\n──────\n  6m\n\nWire² = 8² + 6²\nWire² = 64 + 36 = 100\nWire = 10 m",
        },
        {
          title: "3. Shortest Distance Across a Field",
          content:
            "Situation: Ali walks from corner A to corner C across a rectangular field. The field measures 40 m × 30 m. What is the shortest distance from A to C?\n\n  A─────────C\n  │        /\n  │ 40m   /\n  │      /  ← diagonal\n  │     /\n  │    /\n  B───'\n   30m\n\nAC² = 40² + 30²\nAC² = 1600 + 900 = 2500\nAC = 50 m\n\nShortest distance = 50 m (walking straight across).",
        },
        {
          title: "4. Tent Height",
          content:
            "Situation: A tent has a width of 4 m. A support rope is attached from the peak to the edge, with rope length = 2.5 m. Find the height of the tent.\n\n    /|^\n   / | \\\n  /  | h\n /   |\n/    |\n──────\n  2m\n\nHalf width = 4÷2 = 2 m\nh² + 2² = 2.5²\nh² + 4 = 6.25\nh² = 2.25\nh = 1.5 m\n\nHeight of tent = 1.5 m.",
        },
        {
          title: "5. Construction and Engineering",
          content:
            "In construction, Pythagoras' Theorem is used to:\n• Ensure 90° right angles when building walls or floors.\n• Calculate the length of diagonal supports.\n• Check: if 3-4-5 works, the angle is 90°!\n\nPractical example: A carpenter building a fence. To ensure a 90° corner, they measure 3 feet on one side, 4 feet on another, and the diagonal must be exactly 5 feet.",
        },
        {
          title: "6. TV and Computer Monitor Screens",
          content:
            "The size of a TV/monitor screen is measured using the diagonal. A 32-inch screen means the diagonal of the screen is 32 inches.\n\nExample: A monitor with width 28 inches and height 17 inches.\nDiagonal² = 28² + 17²\n= 784 + 289\n= 1073\nDiagonal ≈ 32.8 inches\n\nThis screen can be categorised as a '32-inch screen'.",
        },
      ],
    },
    {
      title: "15. Chapter Summary",
      subsections: [
        {
          title: "Concept Map: Pythagoras' Theorem",
          content:
            "PYTHAGORAS' THEOREM\n│\n├── Core Concepts\n│   ├── Right-angled triangle\n│   ├── Hypotenuse (longest side, opposite 90°)\n│   └── c² = a² + b²\n│\n├── Applications\n│   ├── Finding hypotenuse: c = √(a²+b²)\n│   ├── Finding leg: a = √(c²−b²)\n│   └── Finding leg: b = √(c²−a²)\n│\n├── Converse Theorem\n│   ├── c² = a²+b² → Right-angled\n│   ├── c² < a²+b² → Acute-angled\n│   └── c² > a²+b² → Obtuse-angled\n│\n└── Applications\n    ├── Ladders & walls\n    ├── Poles & wires\n    ├── Diagonal distances\n    └── Construction",
        },
        {
          title: "Important Formulae",
          bulletPoints: [
            "Pythagoras' Theorem: c² = a² + b² (c = hypotenuse)",
            "Finding hypotenuse: c = √(a² + b²)",
            "Finding leg a: a = √(c² − b²)",
            "Finding leg b: b = √(c² − a²)",
            "Common Pythagorean triples: (3,4,5), (5,12,13), (8,15,17), (7,24,25)",
          ],
        },
        {
          title: "Quick Guide to Classifying Triangles",
          content:
            "Given three sides a ≤ b ≤ c:\n\nc² = a²+b² → RIGHT-ANGLED (angle = 90°)\nc² < a²+b² → ACUTE-ANGLED (all angles < 90°)\nc² > a²+b² → OBTUSE-ANGLED (one angle > 90°)",
        },
        {
          title: "Pre-Answer Checklist",
          bulletPoints: [
            "✅ Identify the longest side (hypotenuse = c).",
            "✅ Ensure the triangle is right-angled before using c²=a²+b².",
            "✅ To find a leg, SUBTRACT: a²=c²−b².",
            "✅ Check answer: hypotenuse must be longer than both legs.",
            "✅ Recognise Pythagorean triples to save time.",
          ],
        },
      ],
    },
  ],
};
