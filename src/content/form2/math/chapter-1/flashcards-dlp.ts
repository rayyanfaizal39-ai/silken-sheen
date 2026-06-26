import type { Flashcard } from "@/data/content";

type FlashcardSeed = [string, string];

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `math-f2-c1-dlp-f${index + 1}`,
    subjectId: "math",
    form: "Form 2",
    chapter: "Chapter 1",
    lang: "dlp",
    front,
    back,
  }));
}

export const mathF2C1FlashcardsDLP: Flashcard[] = buildFlashcards([
  // Deck 1: Patterns (Cards 1-20)
  ["What is a pattern?", "A list of numbers or objects arranged based on a rule or design."],
  ["How is an object pattern recognised?", "Observe how the arrangement of previous objects changes."],
  ["How is a number pattern recognised?", "Compare one number with the next number to find the rule."],
  ["What are the four basic operations for number patterns?", "Addition, subtraction, multiplication and division."],
  ["What are even numbers?", "Numbers that can be divided by 2 exactly."],
  ["What are odd numbers?", "Numbers that cannot be divided by 2 exactly."],
  ["What is the pattern for -10, -4, 2, 8, ...?", "Add 6 to the previous number."],
  ["What is the pattern for 17, 7, -3, -13, ...?", "Subtract 10 from the previous number."],
  ["What is the pattern for 2, 6, 18, 54, ...?", "Multiply the previous number by 3."],
  ["What is the pattern for 81, 27, 9, 3, ...?", "Divide the previous number by 3."],
  ["What is the pattern for -2.3, -2.6, -2.9, -3.2, ...?", "Subtract 0.3 from the previous number."],
  ["What is the first step to find a number pattern?", "Compare consecutive terms."],
  ["What is Pascal's Triangle?", "A triangular arrangement of numbers that starts with 1."],
  ["What number is at both ends of each Pascal's Triangle row?", "Each row starts and ends with 1."],
  ["How is a middle number in Pascal's Triangle obtained?", "Add the two numbers directly above it."],
  ["What is the row after 1, 3, 3, 1?", "1, 4, 6, 4, 1."],
  ["What are Fibonacci Numbers?", "A number pattern where each next term is the sum of the previous two terms."],
  ["How do the Fibonacci Numbers in the notes begin?", "0, 1, 1."],
  ["What is the term after 0, 1, 1, 2, 3, 5?", "8."],
  ["What is a common mistake in Fibonacci Numbers?", "Adding only one previous term instead of the previous two terms."],

  // Deck 2: Sequences (Cards 21-40)
  ["What is a sequence?", "A set of numbers or objects arranged according to a certain pattern."],
  ["When is a set of numbers a sequence?", "When it follows a certain pattern."],
  ["What is the main condition of a sequence rule?", "The same rule must continue throughout the sequence."],
  ["Is -10, -6, -2, 2, 6, ... a sequence?", "Yes, because the pattern is add 4."],
  ["What is the pattern of a sequence?", "The rule that links one term to the next."],
  ["How is a missing term found?", "Apply the same rule from the known terms."],
  ["Complete: 7, 13, __, 25, ...", "19."],
  ["Complete: 88, __, 64, 52, ...", "76."],
  ["What sequence starts with 96 and subtracts 4?", "96, 92, 88, 84, 80, 76, ..."],
  ["What sequence starts with 7 and multiplies by 3?", "7, 21, 63, 189, 567, 1701, ..."],
  ["What sequence starts with 21.3 and subtracts 8?", "21.3, 13.3, 5.3, -2.7, -10.7, ..."],
  ["What sequence starts with 400 and divides by 5?", "400, 80, 16, 3.2, 0.64, 0.128, ..."],
  ["What is a number sequence?", "A sequence made of numbers."],
  ["What types of numbers can be in number sequences?", "Whole numbers, negative numbers, decimals and fractions."],
  ["What are triangular numbers?", "Numbers represented by dots that form equilateral triangles."],
  ["State the early triangular numbers.", "1, 3, 6, 10, 15, 21, 28, 36, ..."],
  ["If an add-7 pattern starts with 42, what is T2?", "49."],
  ["If an add-7 pattern starts with 42, what is T6?", "77."],
  ["What is a tip for division patterns?", "Check by multiplying backward."],
  ["What is a common mistake in number sequences?", "Changing the rule halfway through the sequence."],

  // Deck 3: Patterns and Sequences (Cards 41-60)
  ["What are the three ways to describe a sequence pattern?", "Using numbers, words and algebraic expressions."],
  ["What does describing a pattern using numbers mean?", "Showing the operation between terms, such as +8."],
  ["What does describing a pattern using words mean?", "Writing the rule in a sentence, such as add 8 to the previous number."],
  ["What is an algebraic expression?", "An expression involving numbers, variables or mathematical entities."],
  ["What is the number pattern for 1, 9, 17, 25, 33, ...?", "+8, +8, +8, +8."],
  ["What is the word pattern for 1, 9, 17, 25, 33, ...?", "Add 8 to the previous number."],
  ["What is the algebraic expression for 1, 9, 17, 25, 33, ...?", "1 + 8n, where n = 0, 1, 2, 3, ..."],
  ["In 1 + 8n, what is n for the first term?", "n = 0."],
  ["What is the formula for a fixed-addition pattern?", "a + dn, where n = 0, 1, 2, 3, ..."],
  ["What does Tn mean?", "The n-th term."],
  ["What does T1 mean?", "The first term."],
  ["What does T2 mean?", "The second term."],
  ["For 4, 8, 12, 16, ..., what is T3?", "12."],
  ["For 2, 10, 18, ..., what is the 5th term?", "34."],
  ["For 65, 60, 55, 50, ..., which term is 40?", "The 6th term."],
  ["What are the steps to solve sequence problems?", "Understand, plan, implement and write a conclusion."],
  ["What is the time interval formula?", "Interval = total time / number of equal parts."],
  ["If fish are fed 4 times a day, what is the interval?", "24 / 4 = 6 hours."],
  ["If T1 = 7:35 a.m. and the interval is 6 hours, what is T3?", "7:35 p.m."],
  ["What is a common mistake with Tn terms?", "Confusing the term number with the term value."],
]);
