import type { StructuredNotes } from "@/data/types";

export const mathF2C1NotesDLP: StructuredNotes = {
  chapterSummary:
    "Chapter 1 Patterns and Sequences helps students recognise patterns in numbers and objects, explain sequences, describe patterns of sequences using numbers, words and algebraic expressions, determine terms of a sequence, and solve problems involving sequences.",
  quickRevision: [
    "A pattern is a list of numbers or objects arranged based on a rule or design.",
    "A pattern in a list of numbers is obtained from addition, subtraction, multiplication or division of the previous numbers.",
    "Pascal's Triangle starts with 1; each row starts and ends with 1, and the other numbers are obtained by adding the two numbers above.",
    "Fibonacci Numbers form a sequence that starts with 0, 1, 1, and each next term is obtained by adding the previous two terms.",
    "A sequence is a set of numbers or objects arranged according to a certain pattern.",
    "The n-th term is written as Tn, where T is the term and n is the position of the term.",
  ],
  sections: [
    {
      title: "Learning Outcomes",
      subsections: [
        {
          content: "By the end of this chapter, students should be able to:",
          bulletPoints: [
            "Recognise and describe patterns of various number sets and objects based on real-life situations, and make generalisations on patterns.",
            "Explain the meaning of sequence.",
            "Identify and describe the pattern of a sequence, and hence complete and extend the sequence.",
            "Make generalisation about the pattern of a sequence using numbers, words and algebraic expressions.",
            "Determine specific terms of a sequence.",
            "Solve problems involving sequences.",
          ],
        },
      ],
    },
    {
      title: "1.1 Patterns",
      subsections: [
        {
          title: "1.1.1 Recognising Number Patterns - Simple Explanation",
          content:
            "Patterns are lists of numbers or objects arranged following a rule or design. For objects, observe how the arrangement changes. For numbers, compare one number with the next number to find the rule.",
        },
        {
          title: "Important Concepts",
          bulletPoints: [
            "A number pattern may be formed by adding the same number to the previous number.",
            "A number pattern may be formed by subtracting the same number from the previous number.",
            "A number pattern may be formed by multiplying or dividing the previous number.",
            "Even numbers are numbers that can be divided by 2 exactly.",
            "Odd numbers are numbers that cannot be divided by 2 exactly.",
          ],
        },
        {
          title: "Important Rules",
          table: {
            headers: ["Rule", "Example", "Pattern"],
            rows: [
              ["Add a fixed number", "-10, -4, 2, 8, ...", "Add 6 to the previous number"],
              ["Subtract a fixed number", "17, 7, -3, -13, ...", "Subtract 10 from the previous number"],
              ["Multiply by a fixed number", "2, 6, 18, 54, ...", "Multiply the previous number by 3"],
              ["Divide by a fixed number", "81, 27, 9, 3, ...", "Divide the previous number by 3"],
              ["Decimal change", "-2.3, -2.6, -2.9, -3.2, ...", "Subtract 0.3 from the previous number"],
            ],
          },
        },
        {
          title: "Formula",
          formula:
            "No single formula is used for all patterns.\nStep 1: Compare consecutive terms.\nStep 2: Decide whether the rule uses +, -, x or divide.\nStep 3: Apply the same rule to get the next term.",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              [
                "Draw the next object for dots 2, 4, 6, ...",
                "The number of dots increases by 2 each time.",
                "Next object has 8 dots; pattern: add two dots to the previous object.",
              ],
              [
                "Determine the pattern for 1, 3/2, 2, 5/2, ...",
                "3/2 - 1 = 1/2, 2 - 3/2 = 1/2, 5/2 - 2 = 1/2.",
                "Add 1/2 to the previous number.",
              ],
              [
                "From 7, 12, 17, 22, 27, ..., 67, state the odd-number pattern.",
                "Odd numbers are 7, 17, 27, 37, 47, 57, 67.",
                "Add 10 to the previous odd number.",
              ],
            ],
          },
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "Always compare more than one pair of consecutive numbers before deciding the pattern.",
            "A pattern in objects is found by observing the arrangement of the previous objects.",
            "A pattern in numbers is found from operations on previous numbers.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Looking at only the first two numbers and assuming the pattern too quickly.",
            "Confusing subtracting a negative number with adding.",
            "Ignoring fractions or decimals when the difference is not a whole number.",
          ],
        },
        {
          title: "Exam Tips",
          bulletPoints: [
            "Write the operation between every pair of terms above the sequence.",
            "For even and odd numbers, select only the required numbers first, then find their pattern.",
            "If the numbers are fractions, convert them to equivalent fractions before comparing.",
          ],
        },
        {
          title: "1.1.2 Pascal's Triangle - Simple Explanation",
          content:
            "Pascal's Triangle is a triangular arrangement of numbers. It starts with 1. Each row starts and ends with 1. The other numbers are obtained by adding the two numbers directly above them.",
        },
        {
          title: "Important Concepts",
          bulletPoints: [
            "The top row is 1.",
            "The next row is 1, 1.",
            "Every row starts with 1 and ends with 1.",
            "A middle number is the sum of the two numbers above it.",
            "Different number sequences can be seen inside Pascal's Triangle.",
          ],
        },
        {
          title: "Important Rules",
          formula:
            "Number in a lower row = left upper number + right upper number\nExample: 6 = 3 + 3",
        },
        {
          title: "Worked Example",
          content:
            "Complete the row after 1, 3, 3, 1.\nWorking: Start and end with 1. Add adjacent numbers: 1+3=4, 3+3=6, 3+1=4.\nAnswer: 1, 4, 6, 4, 1.",
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "Do not add all numbers in the row; only add two adjacent numbers above the blank.",
            "The left and right ends of each row are always 1.",
            "Pascal's Triangle can be used to observe sequences such as 1, 2, 3, 4, ... and 1, 3, 6, ...",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Forgetting to write 1 at both ends of a new row.",
            "Adding the wrong two numbers because the numbers are not aligned correctly.",
            "Skipping a row before completing the previous row.",
          ],
        },
        {
          title: "Exam Tips",
          bulletPoints: [
            "Draw the triangle neatly so that each blank is between two numbers above it.",
            "Use symmetry to check your row; for example, 1, 4, 6, 4, 1 reads the same from both sides.",
            "If one side is complete, use it to verify the other side.",
          ],
        },
        {
          title: "1.1.3 Fibonacci Numbers - Simple Explanation",
          content:
            "Fibonacci Numbers are a pattern of numbers in a sequence. The sequence starts with 0, 1, 1. Each next term is obtained by adding the previous two terms.",
        },
        {
          title: "Important Concepts",
          bulletPoints: [
            "The sequence begins 0, 1, 1, 2, 3, 5, 8, ...",
            "0 + 1 = 1, 1 + 1 = 2, 1 + 2 = 3, 2 + 3 = 5, 3 + 5 = 8.",
            "A Fibonacci-type sequence can also start with other given numbers, but the rule remains: add the previous two terms.",
          ],
        },
        {
          title: "Important Rule and Formula",
          formula:
            "Next term = previous term + term before the previous term\nExample: 3 + 5 = 8",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              [
                "Complete: 0, 1, 1, __, __, __, 8, 13, __, ...",
                "1+1=2, 1+2=3, 2+3=5, 8+13=21.",
                "0, 1, 1, 2, 3, 5, 8, 13, 21, ...",
              ],
              [
                "Complete: 1, 3, __, __, 11, ...",
                "1+3=4, 3+4=7, 4+7=11.",
                "1, 3, 4, 7, 11, ...",
              ],
            ],
          },
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "For Fibonacci Numbers, do not add a fixed number each time.",
            "Use the two terms immediately before the blank.",
            "The textbook sequence starts with 0, 1, 1.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Adding only the previous term instead of the previous two terms.",
            "Using the first two terms repeatedly instead of moving along the sequence.",
            "Writing 0, 1, 2, 3, ... and missing the repeated 1.",
          ],
        },
        {
          title: "Exam Tips",
          bulletPoints: [
            "Box the two terms before the blank, then add them.",
            "After filling one blank, use the new number to find the next blank.",
            "Check that every term after the first two is the sum of the previous two terms.",
          ],
        },
      ],
    },
    {
      title: "1.2 Sequences",
      subsections: [
        {
          title: "1.2.1 Sequences - Simple Explanation",
          content:
            "A sequence is a set of numbers or objects arranged according to a certain pattern. The pattern can be determined by following the previous arrangement.",
        },
        {
          title: "Important Concepts",
          bulletPoints: [
            "A sequence may be made of numbers or objects.",
            "A set of numbers is a sequence only when it follows a certain pattern.",
            "The same rule must continue throughout the sequence.",
          ],
        },
        {
          title: "Important Rules",
          bulletPoints: [
            "Check the operation from one term to the next.",
            "If the same rule continues, the set of numbers is a sequence.",
            "If the changes do not follow a certain pattern, the set is not a sequence.",
          ],
        },
        {
          title: "Formula",
          formula:
            "Sequence = a set of numbers or objects arranged according to a certain pattern.",
        },
        {
          title: "Worked Example",
          content:
            "Determine whether -10, -6, -2, 2, 6, ... is a sequence.\nWorking: -6 - (-10) = 4, -2 - (-6) = 4, 2 - (-2) = 4, 6 - 2 = 4.\nAnswer: It is a sequence because the pattern is add 4.",
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "A sequence can increase, decrease or change by multiplication or division.",
            "Object sequences are recognised through the number or arrangement of objects.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Calling every list of numbers a sequence without checking the rule.",
            "Stopping after one comparison and missing a change in the next comparison.",
          ],
        },
        {
          title: "Exam Tips",
          bulletPoints: [
            "Show the operation between terms, such as +4, -12, x0.3 or divide 5.",
            "If asked whether it is a sequence, state the rule and then give the conclusion.",
          ],
        },
        {
          title: "1.2.2 Patterns of a Sequence - Simple Explanation",
          content:
            "The pattern of a sequence is the rule that links one term to the next. Once the rule is known, the sequence can be completed and extended.",
        },
        {
          title: "Important Concepts",
          bulletPoints: [
            "A missing term can be found by applying the same rule from the known terms.",
            "Some sequences use addition or subtraction; others use multiplication or division.",
            "Decimal and fractional sequences follow the same idea.",
          ],
        },
        {
          title: "Important Rules",
          table: {
            headers: ["Given Pattern", "Start", "Completed Sequence"],
            rows: [
              ["Subtract 4 from the previous number", "96", "96, 92, 88, 84, 80, 76, ..."],
              ["Multiply the previous number by 3", "7", "7, 21, 63, 189, 567, 1701, ..."],
              ["Subtract 8 from the previous number", "21.3", "21.3, 13.3, 5.3, -2.7, -10.7, -18.7, ..."],
              ["Divide the previous number by 5", "400", "400, 80, 16, 3.2, 0.64, 0.128, ..."],
            ],
          },
        },
        {
          title: "Formula",
          formula:
            "Missing term = previous known term operated by the sequence rule.",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              [
                "Complete: 7, 13, __, 25, __, __, ...",
                "The pattern is add 6.",
                "7, 13, 19, 25, 31, 37, ...",
              ],
              [
                "Complete: 88, __, 64, 52, __, __, ...",
                "The pattern is subtract 12.",
                "88, 76, 64, 52, 40, 28, ...",
              ],
              [
                "Complete: __, 0.3, __, 0.027, 0.0081, __, ...",
                "The pattern is multiply by 0.3.",
                "1, 0.3, 0.09, 0.027, 0.0081, 0.00243, ...",
              ],
            ],
          },
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "Triangular numbers are represented by dots that make equilateral triangles: 1, 3, 6, 10, 15, 21, 28, 36, ...",
            "When the rule is given in words, apply it directly and carefully.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Using addition when the pattern is multiplication.",
            "Forgetting that subtracting may produce negative numbers.",
            "Rounding decimals too early in a decimal sequence.",
          ],
        },
        {
          title: "Exam Tips",
          bulletPoints: [
            "If blanks appear before and after known terms, work forward and backward using the same rule.",
            "For division patterns, check by multiplying backward.",
            "Write enough terms to answer exactly what the question asks.",
          ],
        },
        {
          title: "1.2.3 Number Sequences - Simple Explanation",
          content:
            "A number sequence is a sequence made of numbers. Each number is placed according to a rule, such as add, subtract, multiply or divide.",
        },
        {
          title: "Important Concepts",
          bulletPoints: [
            "Number sequences can involve whole numbers, negative numbers, decimals and fractions.",
            "The same operation must be repeated according to the pattern.",
            "Some number sequences are linked to shapes, such as triangular numbers.",
          ],
        },
        {
          title: "Important Rule and Formula",
          formula:
            "To extend a number sequence: identify the rule, then repeat the rule term by term.",
        },
        {
          title: "Worked Example",
          content:
            "Complete the number sequence based on the given pattern: Add 7 to the previous number, starting with 42.\nWorking: 42+7=49, 49+7=56, 56+7=63, 63+7=70, 70+7=77.\nAnswer: 42, 49, 56, 63, 70, 77, ...",
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "Use the exact rule stated in the question when a rule is given.",
            "For sequences involving negative numbers, keep the sign with the number.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Changing the rule halfway through the sequence.",
            "Dropping the negative sign in subtraction sequences.",
            "Not writing the sequence in order.",
          ],
        },
        {
          title: "Exam Tips",
          bulletPoints: [
            "Underline the phrase 'previous number' in questions.",
            "Use a calculator carefully for decimals, then check the pattern manually.",
          ],
        },
      ],
    },
    {
      title: "1.3 Patterns and Sequences",
      subsections: [
        {
          title: "1.3.1 Pattern of a Sequence Using Numbers, Words and Algebraic Expressions - Simple Explanation",
          content:
            "A sequence pattern can be described in three ways: using numbers, using words, and using algebraic expressions.",
        },
        {
          title: "Important Concepts",
          bulletPoints: [
            "Using numbers means showing the operation between terms, such as +8.",
            "Using words means writing the rule in a sentence, such as add 8 to the previous number.",
            "Using algebraic expressions means representing the pattern with an expression involving a variable.",
            "An algebraic expression combines operations on numbers, variables or mathematical entities.",
          ],
        },
        {
          title: "Important Rules",
          bulletPoints: [
            "For a sequence starting at 1 and adding 8 each time: 1, 9, 17, 25, 33, ...",
            "Numbers: the pattern is +8.",
            "Words: add 8 to the previous number.",
            "Algebraic expression: 1 + 8n, where n = 0, 1, 2, 3, 4, ...",
          ],
        },
        {
          title: "Formula",
          formula:
            "If the first term is a and the same number d is added each time, the pattern can be written as a + dn, where n = 0, 1, 2, 3, ...",
        },
        {
          title: "Worked Example",
          content:
            "Describe the pattern for 1, 9, 17, 25, 33, ... using numbers, words and algebraic expressions.\nNumbers: +8, +8, +8, +8.\nWords: Add 8 to the previous number.\nAlgebraic expression: 1 = 1+8(0), 9 = 1+8(1), 17 = 1+8(2), 25 = 1+8(3), 33 = 1+8(4). Therefore, the expression is 1 + 8n, where n = 0, 1, 2, 3, 4, ...",
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "The textbook uses n = 0 for the first term when writing expressions such as 1 + 8n.",
            "The same pattern can be expressed in more than one form, but the meaning must be the same.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Using n = 1 for the first term when the expression shown is based on n = 0.",
            "Writing only the next term instead of describing the pattern.",
            "Forgetting to include words when the question asks for numbers, words and algebraic expressions.",
          ],
        },
        {
          title: "Exam Tips",
          bulletPoints: [
            "Make a small table of n and term values before writing an algebraic expression.",
            "Test your expression by substituting n = 0, 1, 2 and checking that it gives the first three terms.",
          ],
        },
        {
          title: "1.3.2 Terms of a Sequence - Simple Explanation",
          content:
            "The n-th term in a number sequence is written as Tn, where T is the term and n is the position of the term.",
        },
        {
          title: "Important Concepts",
          bulletPoints: [
            "T1 means the first term.",
            "T2 means the second term.",
            "T3 means the third term.",
            "Tn means the term at position n.",
          ],
        },
        {
          title: "Important Rule and Formula",
          formula:
            "Tn = n-th term\nExample: For 4, 8, 12, 16, ...\nT1 = 4, T2 = 8, T3 = 12, T4 = 16",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              [
                "State the 5th term for 2, 10, 18, ...",
                "Pattern: add 8. T1=2, T2=10, T3=18, T4=26, T5=34.",
                "The 5th term is 34.",
              ],
              [
                "For 65, 60, 55, 50, ..., determine which term is 40.",
                "Pattern: subtract 5. T1=65, T2=60, T3=55, T4=50, T5=45, T6=40.",
                "40 is the 6th term.",
              ],
            ],
          },
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "The term number tells the position, not the value.",
            "Write the terms in order before deciding a specific term.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Confusing T5 with the value 5.",
            "Starting the count from 0 instead of T1 when listing terms.",
            "Skipping terms when the question asks for a later term.",
          ],
        },
        {
          title: "Exam Tips",
          bulletPoints: [
            "Label the terms as T1, T2, T3, ... while listing them.",
            "When asked 'which term', continue the sequence until the required value appears.",
          ],
        },
        {
          title: "1.3.3 Solving Problems - Simple Explanation",
          content:
            "Problems involving sequences can be solved by understanding the situation, finding the repeated pattern, applying the pattern and writing a conclusion.",
        },
        {
          title: "Important Concepts",
          bulletPoints: [
            "Real-life schedules can form sequences.",
            "A time interval may be the pattern of a sequence.",
            "Use the given information to find the interval or rule before answering the question.",
          ],
        },
        {
          title: "Important Rules",
          bulletPoints: [
            "Understand the problem.",
            "Plan the strategy.",
            "Implement the strategy.",
            "Write a conclusion using the correct unit, such as time.",
          ],
        },
        {
          title: "Formula",
          formula:
            "Interval = total time / number of equal parts\nThen use the interval to list the sequence of times.",
        },
        {
          title: "Worked Example",
          content:
            "An automatic fish feeder feeds fish 4 times a day. The first feeding time is 7:35 a.m. Find the third feeding time.\nUnderstanding: Find the third feeding time.\nPlanning: 1 day = 24 hours, so each feed is 24/4 = 6 hours apart.\nImplementing: T1 = 7:35 a.m.; T2 = 7:35 a.m. + 6 hours = 1:35 p.m.; T3 = 1:35 p.m. + 6 hours = 7:35 p.m.\nConclusion: The fishes are fed for the third time at 7:35 p.m.",
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "Time problems require correct a.m. and p.m. notation.",
            "A table can help organise terms, times or bus departures.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Dividing the day by the wrong number of intervals.",
            "Forgetting to change a.m. to p.m. after adding hours.",
            "Answering the second event when the question asks for the third event.",
          ],
        },
        {
          title: "Exam Tips",
          bulletPoints: [
            "Write T1, T2, T3 beside real-life events.",
            "State the final answer in a complete sentence.",
            "Check whether the question asks for a time, an interval or a term position.",
          ],
        },
      ],
    },
    {
      title: "Chapter Summary",
      subsections: [
        {
          title: "Key Concepts",
          bulletPoints: [
            "Patterns are lists of numbers or objects arranged based on a rule or design.",
            "Patterns of various number sets include even and odd numbers, Pascal's Triangle and Fibonacci Numbers.",
            "A sequence is a set of numbers or objects which follows a certain pattern.",
            "The pattern of a sequence is the rule or design of the sequence.",
            "A sequence pattern can be described using numbers, words and algebraic expressions.",
            "The n-th term is written as Tn.",
          ],
        },
        {
          title: "Important Formulas",
          table: {
            headers: ["Concept", "Formula / Rule"],
            rows: [
              ["Pascal's Triangle", "Middle number = sum of the two numbers above"],
              ["Fibonacci Numbers", "Next term = previous term + term before the previous term"],
              ["Terms of sequence", "Tn = n-th term"],
              ["Algebraic expression pattern", "a + dn, where n = 0, 1, 2, 3, ..."],
              ["Time interval", "Interval = total time / number of equal parts"],
            ],
          },
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Assuming a pattern without checking several consecutive terms.",
            "Mixing up addition/subtraction patterns with multiplication/division patterns.",
            "Forgetting that every row of Pascal's Triangle starts and ends with 1.",
            "Using only one previous term for Fibonacci Numbers.",
            "Confusing the term position Tn with the term value.",
          ],
        },
        {
          title: "Exam Tips",
          bulletPoints: [
            "Mark the operation between terms clearly.",
            "Use words when the question asks for the pattern in words.",
            "Test algebraic expressions by substituting small values of n.",
            "For problem solving, identify the first term, the pattern and the required term.",
          ],
        },
      ],
    },
  ],
  keyExamFacts: [
    "A pattern is a list of numbers or objects arranged based on a rule or design.",
    "A sequence is a set of numbers or objects arranged according to a certain pattern.",
    "Pascal's Triangle starts and ends each row with 1; middle numbers are obtained by adding the two numbers above.",
    "Fibonacci Numbers start with 0, 1, 1 and each next term is the sum of the previous two terms.",
    "Patterns can be described using numbers, words and algebraic expressions.",
    "The n-th term is written as Tn.",
  ],
  keyTerms: [
    "Pattern",
    "Sequence",
    "Number pattern",
    "Pascal's Triangle",
    "Fibonacci Numbers",
    "Even numbers",
    "Odd numbers",
    "Algebraic expression",
    "Term",
    "Tn",
  ],
};
