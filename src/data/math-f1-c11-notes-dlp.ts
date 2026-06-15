import type { StructuredNotes } from "./types";

export const mathF1C11NotesDLP: StructuredNotes = {
  chapterSummary:
    "Chapter 11 introduces the concept of sets in mathematics. Students will learn to describe, list and represent sets, understand set membership, empty sets, equal sets, Venn diagrams, universal sets, complements, and subsets. This chapter builds the logical and mathematical foundations needed for advanced topics.",
  quickRevision: [
    "A set is a collection of objects that share common characteristics.",
    "An element is each member inside a set.",
    "Three methods: description, listing { }, set builder notation {x : condition}.",
    "Empty set: ∅ or {}. Contains no elements.",
    "∈ means 'is an element of'. ∉ means 'is not an element of'.",
    "n(A) is the number of elements in set A.",
    "Equal sets: contain exactly the same elements. Order does not matter.",
    "Venn diagram: rectangle = universal set (ξ), circle = set.",
    "Complement A' = elements in ξ that are NOT in A.",
    "B ⊂ A means B is a subset of A — all elements of B are in A.",
    "Number of subsets = 2ⁿ, where n is the number of elements.",
    "The empty set (∅) and the set itself are subsets of every set.",
  ],
  keyExamFacts: [
    "Repeated elements are only counted ONCE in a set.",
    "Empty set ∅ is DIFFERENT from {0} or {∅} — {0} contains one element (the number zero).",
    "The empty set is a subset of EVERY set.",
    "Every set is a subset of itself.",
    "n(A) = 0 means A is the empty set.",
    "Set A = Set B only if every element of A is in B AND every element of B is in A.",
    "Number of subsets of a set with n elements = 2ⁿ (including empty set and the set itself).",
    "In a Venn diagram, A' is the region INSIDE the rectangle (ξ) but OUTSIDE circle A.",
  ],
  keyTerms: [
    "Set",
    "Element",
    "Member",
    "Membership",
    "Empty set",
    "Universal set",
    "Complement",
    "Subset",
    "Venn diagram",
    "Set builder notation",
  ],
  sections: [
    {
      title: "Learning Outcomes",
      subsections: [
        {
          content: "By the end of this chapter, students should be able to:",
          bulletPoints: [
            "Explain the concept of sets and elements of a set.",
            "Represent sets using the description method, listing method and set builder notation.",
            "Identify an empty set and represent it with the symbol ∅ or {}.",
            "Use the symbols ∈ and ∉ for set membership.",
            "Find the number of elements, n(A), in a set.",
            "Determine whether two sets are equal.",
            "Draw and interpret Venn diagrams.",
            "Identify the universal set (ξ) and complement of a set (A').",
            "Determine subsets and the number of subsets of a set.",
            "Describe the relationships between sets using Venn diagrams.",
          ],
        },
      ],
    },
    {
      title: "1. Introduction to Sets",
      subsections: [
        {
          title: "Definition of a Set",
          content:
            "A set is a collection of objects that share common characteristics and can be clearly defined. The objects inside a set are called elements or members. Sets are usually labelled with capital letters such as A, B, C.",
        },
        {
          title: "Important Characteristics of Sets",
          content:
            "Every element in a set MUST be clearly identifiable. No element is repeated (the same element is counted only once). Sets can contain numbers, letters, words or other objects.",
          bulletPoints: [
            "Repeated elements are counted only once.",
            "Order of elements does not matter — {1, 2, 3} is the same as {3, 1, 2}.",
            "Sets are denoted by capital letters: A, B, C, ...",
          ],
        },
        {
          title: "Examples of Sets in Daily Life",
          content:
            "Set of vowels in English = {a, e, i, o, u}. Set of traffic light colours = {red, yellow, green}. Set of even numbers between 1 and 10 = {2, 4, 6, 8, 10}.",
        },
        {
          title: "Not a Set",
          content:
            "Not all collections are sets. Collections like 'a group of beautiful students' or 'large numbers' are NOT mathematical sets because there are no clear and precise criteria to define them.",
        },
      ],
    },
    {
      title: "2. Elements and Members",
      subsections: [
        {
          title: "Definition of an Element",
          content:
            "An element (or member) is every object that is inside a set. Elements are written inside curly braces { } and separated by commas.",
        },
        {
          title: "Example: Identifying Elements",
          content:
            "Set A = {1, 3, 5, 7, 9}. The elements of A are: 1, 3, 5, 7 and 9. Set B = {a, b, c}. The elements of B are: a, b and c.",
        },
        {
          title: "Important: Repeated Elements",
          content:
            "If the same element appears more than once in a listing, it is only counted ONCE. Example: Letters in the word 'LEVEL' → {L, E, V}. (L appears twice and E appears twice but each is counted only once.)",
        },
        {
          title: "Example: Set of Letters in a Word",
          content:
            "Word 'MALAYSIA' → List the letters: M, A, L, A, Y, S, I, A. After removing repeats: {M, A, L, Y, S, I}. n = 6 elements.",
        },
      ],
    },
    {
      title: "3. Description Method",
      subsections: [
        {
          title: "Definition of the Description Method",
          content:
            "The description method describes a set using a sentence or statement that explains the characteristics of its members. This method is the easiest to understand but less precise than other methods.",
        },
        {
          title: "Format of the Description Method",
          content:
            "Format: '[Set letter] is the set of [description of characteristics]'.",
          bulletPoints: [
            "A is the set of vowels in the word MALAYSIA.",
            "B is the set of prime numbers between 1 and 20.",
            "C is the set of colours in the Malaysian flag.",
            "D is the set of months in a year that begin with the letter J.",
          ],
        },
        {
          title: "Advantages and Disadvantages",
          content:
            "ADVANTAGE: Easy to write and understand. DISADVANTAGE: May be vague or imprecise. Example: 'Set of small numbers' is not clear because 'small' is subjective.",
        },
      ],
    },
    {
      title: "4. Listing Method",
      subsections: [
        {
          title: "Definition of the Listing Method",
          content:
            "The listing method lists all elements of the set inside curly braces { }, separated by commas. This is the clearest method and cannot be misinterpreted.",
        },
        {
          title: "Format of the Listing Method",
          formula: "A = {element 1, element 2, element 3, ...}",
        },
        {
          title: "Examples",
          content:
            "A is the set of vowels in MALAYSIA → A = {a, i}. (Vowels in MALAYSIA: a, a, y, s, i, a → vowels are a and i). B is the set of prime numbers less than 10 → B = {2, 3, 5, 7}.",
        },
        {
          title: "Three Important Rules",
          bulletPoints: [
            "Elements are separated by commas.",
            "Order does not matter: {1, 2, 3} = {3, 2, 1}.",
            "Repeated elements are listed only ONCE.",
          ],
        },
        {
          title: "Ellipsis (...) for Infinite Sets",
          content:
            "For large or infinite sets, use an ellipsis (...). Example: Set of natural numbers = {1, 2, 3, 4, ...}. Set of even numbers = {2, 4, 6, 8, ...}.",
        },
      ],
    },
    {
      title: "5. Set Builder Notation",
      subsections: [
        {
          title: "Definition of Set Builder Notation",
          content:
            "Set builder notation uses a mathematical condition to define the elements of a set. This method is suitable for large and precise mathematical sets.",
        },
        {
          title: "Format",
          formula: "A = {x : x satisfies a certain condition}",
        },
        {
          title: "How to Read It",
          content:
            "'{x : condition}' is read as 'the set of all x WHERE x satisfies the condition'. The colon ':' means 'where' or 'such that'.",
        },
        {
          title: "Example 1: Vowels",
          content:
            "A = {x : x is a vowel in the word MALAYSIA}. Read: 'A is the set of all x where x is a vowel in the word MALAYSIA'. Result: A = {a, i}.",
        },
        {
          title: "Example 2: Numbers",
          content:
            "B = {x : x is an integer, 2 ≤ x ≤ 8}. Read: 'B is the set of all x where x is an integer between 2 and 8 (including 2 and 8)'. Result: B = {2, 3, 4, 5, 6, 7, 8}.",
        },
        {
          title: "Example 3: Prime Numbers",
          content:
            "C = {x : x is a prime number, x < 15}. Result: C = {2, 3, 5, 7, 11, 13}.",
        },
        {
          title: "Comparison of Three Methods",
          table: {
            headers: ["Method", "Example", "Advantage"],
            rows: [
              ["Description", "A is the set of vowels in MALAYSIA", "Easy to write"],
              ["Listing", "A = {a, i}", "Clear, unambiguous"],
              ["Set Builder", "A = {x : x is a vowel in MALAYSIA}", "Precise and mathematical"],
            ],
          },
        },
      ],
    },
    {
      title: "6. Empty Set",
      subsections: [
        {
          title: "Definition of Empty Set",
          content:
            "An empty set is a set that contains no elements at all. The empty set is represented by the symbol ∅ or {}.",
          formula: "Empty set = ∅ or {}",
        },
        {
          title: "Examples of Empty Sets",
          bulletPoints: [
            "Set of even numbers that are also odd → does not exist → ∅",
            "Set of months with 32 days → does not exist → ∅",
            "Set of integers between 3 and 4 (not inclusive) → none → ∅",
          ],
        },
        {
          title: "WARNING: Common Mistake",
          content:
            "∅ is NOT the same as {∅} or {0}. Empty set (∅) has NO elements. {0} is a set containing ONE element — the number 0. {∅} is a set containing ONE element — the symbol ∅.",
        },
        {
          title: "Empty Set vs Near-Empty Set",
          table: {
            headers: ["Set", "Number of Elements", "Is it Empty?"],
            rows: [
              ["∅", "0", "Yes"],
              ["{}", "0", "Yes"],
              ["{0}", "1", "No"],
              ["{∅}", "1", "No"],
            ],
          },
        },
        {
          title: "Important Property of Empty Set",
          content:
            "The empty set is a SUBSET of EVERY set. This is an important rule that will be used in the subset topic. n(∅) = 0.",
        },
      ],
    },
    {
      title: "7. Membership of Sets",
      subsections: [
        {
          title: "Membership Symbols",
          content:
            "The symbol ∈ means 'is an element of' or 'is a member of'. The symbol ∉ means 'is not an element of' or 'is not a member of'.",
          table: {
            headers: ["Symbol", "Meaning", "Read As"],
            rows: [
              ["∈", "is an element of", "'a ∈ A' read as 'a is an element of A'"],
              ["∉", "is not an element of", "'b ∉ A' read as 'b is not an element of A'"],
            ],
          },
        },
        {
          title: "Examples Using ∈ and ∉",
          content:
            "Given A = {2, 4, 6, 8, 10}. Check each statement:",
          bulletPoints: [
            "2 ∈ A → TRUE (2 is in A)",
            "5 ∉ A → TRUE (5 is not in A)",
            "8 ∈ A → TRUE (8 is in A)",
            "3 ∈ A → FALSE (3 is not in A, write 3 ∉ A)",
          ],
        },
        {
          title: "Example: Vowels",
          content:
            "Given V = {a, e, i, o, u}. Then: a ∈ V, b ∉ V, i ∈ V, z ∉ V, u ∈ V.",
        },
        {
          title: "Common Mistake",
          content:
            "Do not use = for membership. WRONG: 3 = A. CORRECT: 3 ∈ A. The symbol = is used between sets, not between an element and a set.",
        },
      ],
    },
    {
      title: "8. Number of Elements",
      subsections: [
        {
          title: "Notation n(A)",
          content:
            "n(A) represents the number of elements in set A. It is read as 'n of A' or 'the number of elements in A'.",
          formula: "n(A) = number of elements in set A",
        },
        {
          title: "Examples of n(A)",
          content:
            "A = {a, e, i, o, u} → n(A) = 5. B = {2, 4, 6} → n(B) = 3. C = {1} → n(C) = 1. D = ∅ → n(D) = 0. E = {Malaysia, Indonesia, Singapore} → n(E) = 3.",
        },
        {
          title: "Important: Count Unique Elements",
          content:
            "When calculating n(A), make sure to eliminate repeated elements first. Example: Letters in the word 'BOOK' = B, O, O, K. Unique set = {B, O, K}. n = 3.",
        },
        {
          title: "Table of n(A) Examples",
          table: {
            headers: ["Set", "Listing", "n(A)"],
            rows: [
              ["Set of English vowels", "{a, e, i, o, u}", "5"],
              ["Set of primes < 10", "{2, 3, 5, 7}", "4"],
              ["Set of rainbow colours", "{red, orange, yellow, green, blue, indigo, violet}", "7"],
              ["Empty set", "∅ or {}", "0"],
            ],
          },
        },
      ],
    },
    {
      title: "9. Equal Sets",
      subsections: [
        {
          title: "Definition of Equal Sets",
          content:
            "Two sets are equal if and only if both contain EXACTLY THE SAME elements. The order of elements does not matter. If A = B, then every element of A is in B, and every element of B is in A.",
        },
        {
          title: "Example of Equal Sets",
          content:
            "A = {h, a, r, u, m} and B = {m, u, r, a, h}. Compare: A and B contain the same elements (h, a, r, u, m) even though the order is different. Therefore A = B.",
        },
        {
          title: "Example of Unequal Sets",
          content:
            "C = {1, 2, 3} and D = {1, 2, 4}. Element 3 is in C but not in D. Element 4 is in D but not in C. Therefore C ≠ D.",
        },
        {
          title: "How to Check for Equal Sets",
          bulletPoints: [
            "List all elements of both sets.",
            "Remove repeated elements.",
            "Check: is every element of the first set in the second set?",
            "Check: is every element of the second set in the first set?",
            "If both conditions are met, the sets are equal.",
          ],
        },
        {
          title: "Equal Sets ≠ Equivalent Sets",
          content:
            "EQUAL SETS (A = B): contain exactly the same elements. EQUIVALENT SETS: contain the same NUMBER of elements, but elements may differ. Example: {1, 2, 3} and {a, b, c} are equivalent sets (n = 3) but not equal sets.",
        },
      ],
    },
    {
      title: "10. Venn Diagrams",
      subsections: [
        {
          title: "Definition of Venn Diagrams",
          content:
            "A Venn diagram is a diagram that uses circles (or other shapes) to visually represent relationships between sets. These diagrams were named after mathematician John Venn.",
        },
        {
          title: "Components of a Venn Diagram",
          bulletPoints: [
            "Rectangle: represents the universal set (ξ) — contains all elements under consideration.",
            "Circle: represents a set within the universal set.",
            "Dot or label: represents an element inside a set.",
            "Region outside circles but inside rectangle: elements in ξ but not in that set.",
          ],
        },
        {
          title: "Basic Example of a Venn Diagram",
          content:
            "ξ = {1, 2, 3, 4, 5, 6, 7, 8} and A = {2, 4, 6, 8}. In the Venn diagram: Rectangle contains all numbers 1–8. Circle A contains 2, 4, 6, 8. Outside circle A but inside rectangle: 1, 3, 5, 7.",
        },
        {
          title: "Uses of Venn Diagrams",
          content:
            "Venn diagrams help us: visualise sets and their relationships, identify complements, determine subsets, and see elements that are shared or separated between sets.",
        },
      ],
    },
    {
      title: "11. Universal Sets",
      subsections: [
        {
          title: "Definition of Universal Set",
          content:
            "The universal set (ξ) is the set that contains all elements being considered in a particular situation or discussion. The universal set is the 'universe' for all other sets in that discussion.",
          formula: "Symbol: ξ (Greek letter xi)",
        },
        {
          title: "Examples of Universal Sets",
          content:
            "If we are discussing numbers between 1 and 10, then ξ = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}. If we are discussing months of the year, ξ = {Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec}.",
        },
        {
          title: "Characteristics of Universal Set",
          bulletPoints: [
            "The universal set is contextual — it depends on the discussion.",
            "All other sets in the discussion are subsets of the universal set.",
            "The universal set is represented by a rectangle in a Venn diagram.",
            "The symbol ξ is placed at the top left corner of the rectangle.",
          ],
        },
        {
          title: "Venn Diagram: Universal Set",
          content:
            "In a Venn diagram: [Rectangle labelled ξ] contains all elements. Set A (circle) is inside the rectangle. Elements not in A are inside the rectangle but outside circle A — this is the region of A' (complement of A).",
        },
      ],
    },
    {
      title: "12. Complement of a Set",
      subsections: [
        {
          title: "Definition of Complement",
          content:
            "The complement of set A, written as A', is the set containing all elements in the universal set (ξ) that are NOT in set A.",
          formula: "A' = {x : x ∈ ξ and x ∉ A}",
        },
        {
          title: "How to Find the Complement",
          content:
            "Step 1: Identify ξ (universal set). Step 2: Identify set A. Step 3: A' = all elements in ξ that are not in A.",
        },
        {
          title: "Example 1",
          content:
            "ξ = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10} and A = {2, 4, 6, 8, 10}. A' = elements in ξ not in A = {1, 3, 5, 7, 9}.",
        },
        {
          title: "Example 2: Letters",
          content:
            "ξ = {a, b, c, d, e, f, g} and B = {a, e}. B' = {b, c, d, f, g}.",
        },
        {
          title: "Properties of Complement",
          bulletPoints: [
            "A ∪ A' = ξ (A and A' together form the universal set).",
            "A ∩ A' = ∅ (A and A' share no elements).",
            "(A')' = A (the complement of the complement of A is A itself).",
            "ξ' = ∅ (the complement of the universal set is the empty set).",
            "∅' = ξ (the complement of the empty set is the universal set).",
          ],
        },
        {
          title: "Venn Diagram: Complement",
          content:
            "In a Venn diagram, the shaded region for A' is the REGION OUTSIDE circle A but INSIDE rectangle ξ. The circle A itself is not shaded.",
        },
      ],
    },
    {
      title: "13. Subsets",
      subsections: [
        {
          title: "Definition of Subset",
          content:
            "Set B is a subset of set A if EVERY element in B is also an element in A. This is written as B ⊂ A.",
          formula: "B ⊂ A means: every element of B ∈ A",
        },
        {
          title: "Subset Symbols",
          table: {
            headers: ["Symbol", "Meaning", "Read As"],
            rows: [
              ["⊂", "is a subset of", "'B ⊂ A' read as 'B is a subset of A'"],
              ["⊄", "is not a subset of", "'C ⊄ A' read as 'C is not a subset of A'"],
              ["⊆", "is a subset of or equal to", "'B ⊆ A' — subset or equal"],
            ],
          },
        },
        {
          title: "Example of Subset",
          content:
            "A = {1, 2, 3, 4, 5}. B = {2, 4}. All elements of B (i.e. 2 and 4) are in A. So B ⊂ A (B is a subset of A).",
        },
        {
          title: "Example of Non-Subset",
          content:
            "A = {1, 2, 3, 4, 5} and C = {2, 6}. Element 6 is in C but NOT in A. So C ⊄ A (C is not a subset of A).",
        },
        {
          title: "Two Important Subset Rules",
          bulletPoints: [
            "RULE 1: The empty set (∅) is a subset of EVERY set. ∅ ⊂ A for every set A.",
            "RULE 2: Every set is a subset of itself. A ⊂ A for every set A.",
          ],
        },
        {
          title: "Why is ∅ ⊂ A for every A?",
          content:
            "Because we cannot find any element in ∅ that is not in A (∅ has no elements at all). Therefore, nothing 'fails' the subset condition, so ∅ is a subset of every set.",
        },
      ],
    },
    {
      title: "14. Number of Subsets",
      subsections: [
        {
          title: "Formula for Number of Subsets",
          content:
            "If set A has n elements, then the number of subsets of A is 2ⁿ. This includes the empty subset (∅) and the set A itself.",
          formula: "Number of subsets = 2ⁿ\n(where n = number of elements)",
        },
        {
          title: "Example: n = 1",
          content:
            "A = {x}. Subsets of A: ∅ and {x}. Number of subsets = 2¹ = 2.",
        },
        {
          title: "Example: n = 2",
          content:
            "A = {a, b}. List all subsets: ∅, {a}, {b}, {a, b}. Number of subsets = 2² = 4.",
        },
        {
          title: "Example: n = 3",
          content:
            "A = {1, 2, 3}. Subsets: ∅, {1}, {2}, {3}, {1,2}, {1,3}, {2,3}, {1,2,3}. Number of subsets = 2³ = 8.",
        },
        {
          title: "Example: n = 4",
          content:
            "A = {a, b, c, d}. Number of subsets = 2⁴ = 16. (Too many to list all!)",
        },
        {
          title: "Summary Table of Number of Subsets",
          table: {
            headers: ["Number of Elements (n)", "Number of Subsets (2ⁿ)", "Example"],
            rows: [
              ["0", "2⁰ = 1", "∅ has only ∅ as its subset"],
              ["1", "2¹ = 2", "{a} → ∅, {a}"],
              ["2", "2² = 4", "{a,b} → ∅, {a}, {b}, {a,b}"],
              ["3", "2³ = 8", "{a,b,c} → 8 subsets"],
              ["4", "2⁴ = 16", "{a,b,c,d} → 16 subsets"],
              ["5", "2⁵ = 32", "{a,b,c,d,e} → 32 subsets"],
            ],
          },
        },
        {
          title: "Proper Subsets",
          content:
            "A proper subset is any subset EXCEPT the set itself. Number of proper subsets = 2ⁿ − 1. Example: A = {1, 2, 3} has 8 subsets but only 7 proper subsets (excluding {1,2,3}).",
        },
      ],
    },
    {
      title: "15. Relationships Between Sets",
      subsections: [
        {
          title: "Three Types of Relationships Between Sets",
          content:
            "In a Venn diagram, two sets can have three main types of relationship:",
          bulletPoints: [
            "Set B is a subset of A (B ⊂ A): circle B is completely inside circle A.",
            "Sets A and B overlap (have common elements): the two circles partially intersect.",
            "Sets A and B are separate (disjoint): no common elements, circles do not touch.",
          ],
        },
        {
          title: "Relationship 1: Subset (B ⊂ A)",
          content:
            "If every element of B is also in A, then circle B is entirely inside circle A in the Venn diagram. Example: A = {1, 2, 3, 4, 5}, B = {2, 4} → B ⊂ A.",
        },
        {
          title: "Relationship 2: Overlapping Sets",
          content:
            "If A and B share some elements but also have elements that are not shared, then circles A and B partially intersect. The overlap region contains common elements. Example: A = {1, 2, 3, 4}, B = {3, 4, 5, 6} → Common elements: {3, 4}.",
        },
        {
          title: "Relationship 3: Separate Sets",
          content:
            "If A and B share no elements at all, then circles A and B do not touch (separate/disjoint). Example: A = {1, 3, 5}, B = {2, 4, 6}. No elements in common.",
        },
      ],
    },
    {
      title: "16. Venn Diagrams for Subsets",
      subsections: [
        {
          title: "Visual: Subset B ⊂ A",
          content:
            "When B ⊂ A, in the Venn diagram: circle B is drawn ENTIRELY INSIDE circle A. The rectangle (ξ) contains both A and B. Elements in B are also in A. Elements in A but not in B are in the region of A but outside B.",
        },
        {
          title: "Example with Numbers",
          content:
            "ξ = {1, 2, 3, 4, 5, 6}, A = {1, 2, 3, 4, 5}, B = {2, 4}. In the Venn diagram: Rectangle: 1, 2, 3, 4, 5, 6. In A only (not B): 1, 3, 5. In B (and also in A since B ⊂ A): 2, 4. In ξ but not in A: 6.",
        },
        {
          title: "Complement in Subset Context",
          content:
            "When B ⊂ A: B' contains all elements in ξ not in B (including the A region outside B, and the region completely outside A). A' contains all elements in ξ not in A.",
        },
      ],
    },
    {
      title: "17. Venn Diagrams for Separate Sets",
      subsections: [
        {
          title: "Visual: Separate (Disjoint) Sets",
          content:
            "When sets A and B share no elements (separate/disjoint sets), in the Venn diagram: circle A and circle B DO NOT TOUCH AND DO NOT OVERLAP. Both circles are completely separate within rectangle ξ.",
        },
        {
          title: "Example with Numbers",
          content:
            "ξ = {1, 2, 3, 4, 5, 6, 7, 8}, A = {1, 3, 5, 7}, B = {2, 4, 6}. No elements are common between A and B. In the Venn diagram: Circle A: 1, 3, 5, 7. Circle B: 2, 4, 6. In ξ but not in A or B: 8.",
        },
        {
          title: "Example: Letters",
          content:
            "ξ = {a, b, c, d, e, f, g, h}. A = {a, e, i} (vowels). B = {b, c, d, f, g, h} (consonants). Note: vowels and consonants do not overlap → separate sets.",
        },
        {
          title: "Difference: Subset vs Separate vs Overlapping",
          table: {
            headers: ["Relationship", "Characteristic", "Venn Diagram"],
            rows: [
              ["Subset (B ⊂ A)", "All elements of B are in A", "Circle B inside circle A"],
              ["Overlapping", "Some elements in common", "Circles partially intersect"],
              ["Separate", "No elements in common", "Circles separated, do not touch"],
            ],
          },
        },
      ],
    },
    {
      title: "18. Problem Solving",
      subsections: [
        {
          title: "Steps for Problem Solving with Sets",
          bulletPoints: [
            "Step 1: Read the question carefully. Identify ξ (universal set) and all sets involved.",
            "Step 2: List the elements of each set clearly.",
            "Step 3: Identify the relationship between sets (subset, overlapping, separate).",
            "Step 4: Draw a Venn diagram if needed.",
            "Step 5: Answer the question based on the diagram or element list.",
          ],
        },
        {
          title: "Example 1: Finding Elements and Complement",
          content:
            "ξ = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}. A = {x : x is a prime number, x ≤ 10}. Find A and A'.",
          formula:
            "A = {2, 3, 5, 7} (prime numbers ≤ 10)\nA' = {1, 4, 6, 8, 9, 10} (in ξ but not in A)\nn(A) = 4, n(A') = 6",
        },
        {
          title: "Example 2: Determining Subsets",
          content:
            "A = {a, b, c, d}. B = {a, c}. C = {a, b, c, d, e}. Determine whether B ⊂ A and A ⊂ C.",
          formula:
            "B ⊂ A: All elements of B (a, c) are in A → YES, B ⊂ A.\nA ⊂ C: All elements of A (a,b,c,d) are in C → YES, A ⊂ C.",
        },
        {
          title: "Example 3: Number of Subsets",
          content:
            "Set M = {p, q, r, s}. Find the number of subsets of M.",
          formula:
            "n(M) = 4\nNumber of subsets = 2⁴ = 16",
        },
        {
          title: "Example 4: Reading a Venn Diagram",
          content:
            "From a Venn diagram: ξ = {1,2,3,4,5,6,7,8,9,10}. Inside A: {2,4,6,8,10}. Inside B: {1,2,3,4,5}. Find: (a) n(A), (b) elements in A but not B.",
          formula:
            "n(A) = 5\nElements in A but not B = {6, 8, 10}",
        },
        {
          title: "Example 5: Equal Sets",
          content:
            "P = {x : x is a letter in the word 'RAMAH'} and Q = {x : x is a letter in the word 'HAMAR'}. Is P = Q?",
          formula:
            "P = {r, a, m, h} (letters in RAMAH)\nQ = {h, a, m, r} (letters in HAMAR)\nBoth contain the same elements → P = Q",
        },
      ],
    },
    {
      title: "19. Chapter Summary",
      subsections: [
        {
          title: "Summary of Important Symbols",
          table: {
            headers: ["Symbol", "Meaning", "Example"],
            rows: [
              ["{}", "Curly braces (set)", "{1, 2, 3}"],
              ["∈", "is an element of", "2 ∈ A"],
              ["∉", "is not an element of", "5 ∉ A"],
              ["n(A)", "number of elements in A", "n(A) = 3"],
              ["∅ or {}", "empty set", "∅"],
              ["ξ", "universal set", "ξ = {1,2,...,10}"],
              ["A'", "complement of A", "A' = ξ \\ A"],
              ["⊂", "is a subset of", "B ⊂ A"],
              ["⊄", "is not a subset of", "C ⊄ A"],
              ["2ⁿ", "number of subsets", "n=3 → 8 subsets"],
            ],
          },
        },
        {
          title: "Three Methods of Representing Sets",
          bulletPoints: [
            "DESCRIPTION: describe the set in a sentence. Example: 'A is the set of even numbers between 1 and 10'.",
            "LISTING: list all elements. Example: A = {2, 4, 6, 8, 10}.",
            "SET BUILDER NOTATION: use a condition. Example: A = {x : x is an even number, 1 < x ≤ 10}.",
          ],
        },
        {
          title: "Key Rules",
          bulletPoints: [
            "Repeated elements are counted only ONCE.",
            "The empty set ∅ is a subset of EVERY set.",
            "Every set is a subset of itself.",
            "Number of subsets = 2ⁿ (including ∅ and the set itself).",
            "Equal sets contain the same elements (order does not matter).",
            "A' = elements in ξ that are not in A.",
          ],
        },
        {
          title: "Exam Tips",
          bulletPoints: [
            "Always check for repeated elements before calculating n(A).",
            "For number of subsets, find n first, then calculate 2ⁿ.",
            "For A', start with ξ and remove elements in A.",
            "Draw a Venn diagram for complex questions.",
            "∅ ≠ {0} ≠ {∅} — understand the difference!",
          ],
        },
      ],
    },
  ],
};
