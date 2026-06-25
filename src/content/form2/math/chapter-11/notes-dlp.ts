import type { StructuredNotes } from "@/data/types";

export const mathF2C11NotesDLP: StructuredNotes = {
  chapterSummary:
    "Chapter 11 Probability helps students understand experimental probability, sample space, events, theoretical probability of equally likely outcomes, probability of the complement of an event, and probability of simple events in everyday life.",
  quickRevision: [
    "Experimental probability = number of times an event occurs ÷ total number of trials.",
    "The sample space, S, is the set of all possible outcomes of an experiment.",
    "P(A) = n(A) / n(S), where the outcomes in S are equally likely to occur.",
    "P(A) + P(A') = 1, so P(A') = 1 - P(A).",
    "Probability values are always between 0 and 1, that is 0 ≤ P(A) ≤ 1.",
    "P(A) = 0 means event A is impossible; P(A) = 1 means event A is certain to happen.",
  ],
  sections: [
    {
      title: "Learning Outcomes",
      subsections: [
        {
          content: "By the end of this chapter, students should be able to:",
          bulletPoints: [
            "Determine the experimental probability of an event.",
            "Make predictions about an event based on experimental probability.",
            "Determine the sample space and event of an experiment.",
            "Determine the theoretical probability of an event with equally likely outcomes.",
            "Relate experimental probability to theoretical probability.",
            "Determine the probability of the complement of an event.",
            "Solve problems involving the probability of simple events.",
          ],
        },
      ],
    },
    {
      title: "11.1 Experimental Probability",
      subsections: [
        {
          title: "Definition",
          content:
            "Experimental probability is the probability determined from the actual outcomes of an experiment that is carried out repeatedly. An experiment is an activity that produces outcomes, such as tossing a coin, rolling a dice, or drawing a card.",
          bulletPoints: [
            "A trial is each time the experiment is carried out.",
            "An event is an outcome or group of outcomes being focused on.",
            "The greater the number of trials carried out, the closer the experimental probability gets to the theoretical probability.",
          ],
        },
        {
          title: "Formula",
          formula:
            "Experimental Probability of event A\n= Number of times event A occurs / Total number of trials",
        },
        {
          title: "Contoh 1",
          content:
            "Soalan: A coin is tossed 50 times. 'Heads' appears 28 times. Find the experimental probability of getting 'heads'.\nPenyelesaian: Experimental probability = 28/50 = 14/25.\nJawapan: 14/25",
        },
        {
          title: "Contoh 2",
          content:
            "Soalan: A dice is rolled 60 times. The number 6 appears 12 times. Find the experimental probability of getting the number 6, in its simplest form.\nPenyelesaian: Experimental probability = 12/60 = 1/5.\nJawapan: 1/5",
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Experimental probability can differ each time the experiment is repeated.",
            "Experimental probability can be used to predict the number of times an event will occur in future trials.",
            "To predict: Prediction = Experimental probability x Number of new trials.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Wrongly using the number of times an event occurs as the denominator (it should be the numerator).",
            "Not simplifying the fraction to its simplest form.",
            "Confusing experimental probability with theoretical probability.",
          ],
        },
      ],
    },
    {
      title: "11.2 Theoretical Probability of Equally Likely Outcomes",
      subsections: [
        {
          title: "Definition",
          content:
            "The sample space, S, is the set of all possible outcomes of an experiment. An event, A, is a subset of the sample space that contains the outcomes being focused on. When all outcomes in the sample space have the same chance of occurring, the outcomes are said to be equally likely.",
          bulletPoints: [
            "n(S) is the number of elements in the sample space S.",
            "n(A) is the number of elements in event A.",
            "List all elements of the sample space carefully so that none are missed or repeated.",
          ],
        },
        {
          title: "Formula",
          formula: "P(A) = n(A) / n(S)\nwith 0 ≤ P(A) ≤ 1",
        },
        {
          title: "Contoh 1",
          content:
            "Soalan: A fair dice is rolled once. A is the event of getting an even number. Determine the sample space, S, event A, and P(A).\nPenyelesaian: S = {1, 2, 3, 4, 5, 6}, so n(S) = 6. A = {2, 4, 6}, so n(A) = 3. P(A) = n(A)/n(S) = 3/6 = 1/2.\nJawapan: P(A) = 1/2",
        },
        {
          title: "Contoh 2",
          content:
            "Soalan: A box contains 4 cards numbered 1, 2, 3, and 4. A card is chosen at random. B is the event of getting a number greater than 2. Determine P(B).\nPenyelesaian: S = {1, 2, 3, 4}, n(S) = 4. B = {3, 4}, n(B) = 2. P(B) = 2/4 = 1/2.\nJawapan: P(B) = 1/2",
        },
        {
          title: "Contoh 3",
          content:
            "Soalan: Two fair coins are tossed simultaneously. C is the event of getting at least one 'head'. Determine P(C).\nPenyelesaian: S = {(H,H), (H,T), (T,H), (T,T)}, n(S) = 4. C = {(H,H), (H,T), (T,H)}, n(C) = 3. P(C) = 3/4.\nJawapan: P(C) = 3/4",
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Make sure every element in the sample space is equally likely before using P(A) = n(A)/n(S).",
            "Use a tree diagram or table to help list the sample space for two objects (for example two coins or two dice).",
            "Theoretical probability does not change even if the experiment is repeated many times.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Not listing all the outcomes of the sample space completely, especially for two objects.",
            "Counting the same outcome more than once in the sample space.",
            "Miscounting n(A) by overlooking outcomes that satisfy the event's condition.",
          ],
        },
      ],
    },
    {
      title: "11.3 Probability of the Complement of an Event",
      subsections: [
        {
          title: "Definition",
          content:
            "The complement of event A, written as A', is the event containing all outcomes in the sample space S that are not members of event A. Events A and A' cannot happen at the same time, and together they cover the entire sample space S.",
          bulletPoints: [
            "A and A' do not overlap (mutually exclusive).",
            "The union of A and A' forms the complete sample space S.",
          ],
        },
        {
          title: "Formula",
          formula: "P(A) + P(A') = 1\nP(A') = 1 - P(A)",
        },
        {
          title: "Contoh 1",
          content:
            "Soalan: A fair dice is rolled once. A is the event of getting the number 5. Find P(A').\nPenyelesaian: S = {1, 2, 3, 4, 5, 6}, n(S) = 6. A = {5}, n(A) = 1, so P(A) = 1/6. P(A') = 1 - 1/6 = 5/6.\nJawapan: P(A') = 5/6",
        },
        {
          title: "Contoh 2",
          content:
            "Soalan: In a class, the probability that a randomly chosen student is a boy is 7/15. Find the probability that the student is a girl.\nPenyelesaian: The event 'girl' is the complement of the event 'boy'. P(girl) = 1 - 7/15 = 8/15.\nJawapan: 8/15",
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "P(A') can always be found without re-listing the sample space if P(A) is already known.",
            "Use the complement concept to speed up problem solving, especially when the outcomes of A' are harder to list than those of A.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Calculating P(A') by adding 1 to P(A) instead of subtracting.",
            "Assuming A and A' can occur at the same time.",
            "Wrongly determining whether one event is truly the complement of another.",
          ],
        },
      ],
    },
    {
      title: "11.4 Probability of Simple Events",
      subsections: [
        {
          title: "Definition",
          content:
            "Probability of simple events refers to solving everyday problems that involve a single event using the concepts of sample space, event, and the formula P(A) = n(A)/n(S), including real situations such as lucky draws, games, and stock management.",
        },
        {
          title: "Formula",
          formula: "P(A) = n(A) / n(S)\nP(A') = 1 - P(A)",
        },
        {
          title: "Contoh 1",
          content:
            "Soalan: A container has 5 red marbles, 3 blue marbles, and 2 yellow marbles. A student picks a marble at random. Find the probability that the marble is blue.\nPenyelesaian: Total marbles, n(S) = 5 + 3 + 2 = 10. Blue marbles, n(blue) = 3. P(blue) = 3/10.\nJawapan: 3/10",
        },
        {
          title: "Contoh 2",
          content:
            "Soalan: Using the information in Contoh 1, find the probability that the marble chosen is not red.\nPenyelesaian: P(red) = 5/10 = 1/2. P(not red) = 1 - 1/2 = 1/2. (Check: not red = blue + yellow = 3 + 2 = 5, so 5/10 = 1/2.)\nJawapan: 1/2",
        },
        {
          title: "Contoh 3",
          content:
            "Soalan: A lucky draw box contains 20 tickets, of which 4 tickets are marked 'win'. A ticket is drawn at random. Find the probability that the ticket is not a winning ticket.\nPenyelesaian: P(win) = 4/20 = 1/5. P(not win) = 1 - 1/5 = 4/5.\nJawapan: 4/5",
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Read the question carefully to identify the actual sample space (for example, the total number of objects in a container).",
            "Always simplify probability fractions to their simplest form.",
            "The complement concept is often used to speed up calculations in everyday problems.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Miscounting the total number of objects as n(S).",
            "Forgetting that a probability answer must lie between 0 and 1.",
            "Not simplifying the final fraction answer to its lowest terms.",
          ],
        },
      ],
    },
    {
      title: "Chapter Summary",
      subsections: [
        {
          title: "Mesti Tahu",
          bulletPoints: [
            "Experimental probability is based on the actual outcomes of an experiment carried out repeatedly.",
            "Theoretical probability uses the sample space and equally likely events.",
            "P(A) + P(A') = 1 for any event A and its complement.",
            "Probability values are always between 0 (impossible) and 1 (certain).",
          ],
        },
        {
          title: "Formula Penting",
          formula:
            "Experimental probability = Number of times event occurs / Total number of trials\nP(A) = n(A) / n(S)\nP(A') = 1 - P(A)",
        },
        {
          title: "Petua Peperiksaan",
          bulletPoints: [
            "List the sample space systematically (use a table or tree diagram for two objects).",
            "Always check that the probability answer lies between 0 and 1.",
            "Use the complement concept when the desired event is easier to find through its opposite event.",
            "Simplify all probability fraction answers to their simplest form.",
          ],
        },
      ],
    },
  ],
  keyExamFacts: [
    "Experimental probability = number of times an event occurs ÷ total number of trials.",
    "P(A) = n(A) / n(S) is used when all outcomes in the sample space are equally likely.",
    "P(A') = 1 - P(A), because A and A' together cover the entire sample space.",
    "Probability values always satisfy 0 ≤ P(A) ≤ 1.",
    "P(A) = 0 indicates an impossible event; P(A) = 1 indicates a certain event.",
  ],
  keyTerms: [
    "Experiment",
    "Trial",
    "Event",
    "Sample space",
    "Experimental probability",
    "Theoretical probability",
    "Equally likely outcomes",
    "Complement of an event",
  ],
};
