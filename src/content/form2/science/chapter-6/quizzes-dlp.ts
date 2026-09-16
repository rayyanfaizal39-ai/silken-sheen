import type { QuizQuestion } from "@/data/content";

/**
 * Science Form 2, Chapter 6 (Acids and Alkalis) — quiz bank, DLP.
 *
 * 30 questions, textbook-only. IDs are preserved from the previous 34-item
 * bank wherever the underlying slot survives — including several slots whose
 * CONTENT was rewritten in place (see the chapter-6 quiz remediation report
 * for the full old -> new mapping). sci-f2-c6-dlp-q1, q2, q4, q8 and q18 were
 * deleted outright (etymology x2, a duplicate taste question, a duplicate
 * pH-scale recall question, and a duplicate salt-identification question).
 * sci-f2-c6-dlp-q35 is the only newly minted id.
 */
export const scienceF2C6QuizzesDLP: QuizQuestion[] = [
  {
    id: "sci-f2-c6-dlp-q3",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Easy",
    chapter: "Chapter 6",
    lang: "dlp",
    question:
      "The pH scale ranges from 0 to 14. A solution is found to have a pH of 7. What does this tell us about the solution?",
    options: [
      "It is a strong acid",
      "It is neutral, neither acidic nor alkaline",
      "It is a strong alkali",
      "Its pH cannot be on the scale",
    ],
    answerIndex: 1,
    explanation:
      "The pH scale ranges from 0 to 14. A pH value of 7 shows that a solution is neutral, neither acidic nor alkaline.",
  },
  {
    id: "sci-f2-c6-dlp-q5",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Easy",
    chapter: "Chapter 6",
    lang: "dlp",
    question: "What colour does blue litmus paper turn when an acid is added?",
    options: ["Stays blue", "Turns red", "Turns green", "Turns yellow"],
    answerIndex: 1,
    explanation: "An acid turns blue litmus paper red.",
  },
  {
    id: "sci-f2-c6-dlp-q6",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Easy",
    chapter: "Chapter 6",
    lang: "dlp",
    question: "What colour does red litmus paper turn when an alkali is added?",
    options: ["Stays red", "Turns blue", "Turns yellow", "Turns colourless"],
    answerIndex: 1,
    explanation: "An alkali turns red litmus paper blue.",
  },
  {
    id: "sci-f2-c6-dlp-q7",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Medium",
    chapter: "Chapter 6",
    lang: "dlp",
    question: "Which of the following correctly compares the properties of acids and alkalis?",
    options: [
      "Acids taste bitter and alkalis taste sour",
      "Acids taste sour and alkalis taste bitter; both can be corrosive",
      "Acids are corrosive but alkalis are never corrosive",
      "Alkalis taste sour and are not corrosive",
    ],
    answerIndex: 1,
    explanation:
      "Acids taste sour while alkalis taste bitter. Both acids and alkalis can be corrosive, so neither should ever be tasted or handled directly.",
  },
  {
    id: "sci-f2-c6-dlp-q9",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Easy",
    chapter: "Chapter 6",
    lang: "dlp",
    question: "What is the meaning of an indicator?",
    options: [
      "A substance that measures the temperature of a solution",
      "A colouring or mixture of colourings that changes colour based on the substance tested",
      "A substance that increases the corrosiveness of an acid",
      "An instrument used to measure the volume of a liquid",
    ],
    answerIndex: 1,
    explanation:
      "An indicator is a colouring or mixture of different colourings that changes colour based on the substance tested, used to determine if a substance is neutral, acidic or alkaline.",
  },
  {
    id: "sci-f2-c6-dlp-q10",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Easy",
    chapter: "Chapter 6",
    lang: "dlp",
    question: "What is produced from the reaction between an acid and an alkali?",
    options: ["Gas and water", "Salt and water", "Metal and water", "Salt and gas"],
    answerIndex: 1,
    explanation: "The word equation for neutralisation is Acid + Alkali → Salt + Water.",
  },
  {
    id: "sci-f2-c6-dlp-q11",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Medium",
    chapter: "Chapter 6",
    lang: "dlp",
    question:
      "Why does glacial ethanoic acid (without water) not change the colour of blue litmus paper?",
    options: [
      "Because it is not a true acid",
      "Because acids and alkalis only show their properties in the presence of water",
      "Because the blue litmus paper is damaged",
      "Because it is too dilute",
    ],
    answerIndex: 1,
    explanation:
      "Acids and alkalis show their properties only in the presence of water; without water, glacial ethanoic acid does not change the colour of blue litmus paper.",
  },
  {
    id: "sci-f2-c6-dlp-q12",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Hard",
    chapter: "Chapter 6",
    lang: "dlp",
    question:
      "A few drops of phenolphthalein are added to solution X, and it stays colourless. A student concludes that solution X must be acidic. Is this conclusion correct?",
    options: [
      "Yes, because phenolphthalein is colourless only in acids",
      "No, because phenolphthalein is also colourless in a neutral solution, so another test is needed",
      "Yes, because phenolphthalein always turns pink in acids",
      "No, because phenolphthalein cannot be used with acids",
    ],
    answerIndex: 1,
    explanation:
      "Phenolphthalein is colourless in BOTH acidic and neutral solutions, and only turns pink in an alkali. A colourless result alone does not prove the solution is acidic — another suitable test, such as litmus paper, is needed to confirm.",
  },
  {
    id: "sci-f2-c6-dlp-q13",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Medium",
    chapter: "Chapter 6",
    lang: "dlp",
    question: "What is an advantage of universal indicator compared with litmus paper?",
    options: [
      "It is used only for alkalis",
      "It produces a range of colours that can be compared with a pH chart, giving a better idea of a solution's actual pH, not just whether it is acidic or alkaline",
      "It cannot be used with a colour chart",
      "It gives the same colour for every solution",
    ],
    answerIndex: 1,
    explanation:
      "Litmus paper only shows whether a solution is acidic (red) or alkaline (blue). Universal indicator produces a range of colours — red in acid, green in neutral, blue in alkali — that can be compared with a pH chart to give a better idea of the solution's actual pH.",
  },
  {
    id: "sci-f2-c6-dlp-q14",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Medium",
    chapter: "Chapter 6",
    lang: "dlp",
    question: "What colour is methyl orange in neutral and alkaline conditions?",
    options: ["Red", "Yellow", "Blue", "Green"],
    answerIndex: 1,
    explanation:
      "Methyl orange is red in acid, but yellow in both neutral and alkaline conditions.",
  },
  {
    id: "sci-f2-c6-dlp-q15",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Medium",
    chapter: "Chapter 6",
    lang: "dlp",
    question:
      "In the acid and alkali properties test, what gas is produced when magnesium ribbon reacts with dilute hydrochloric acid?",
    options: ["Oxygen gas", "Carbon dioxide gas", "Hydrogen gas", "Nitrogen gas"],
    answerIndex: 2,
    explanation:
      'Magnesium ribbon reacts with dilute hydrochloric acid to produce hydrogen gas, which gives a "pop" sound with a lighted wooden splinter.',
  },
  {
    id: "sci-f2-c6-dlp-q16",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Medium",
    chapter: "Chapter 6",
    lang: "dlp",
    question:
      "What happens when magnesium ribbon is placed in an alkaline solution in the acid and alkali properties test?",
    options: [
      "It quickly produces hydrogen gas",
      "It produces oxygen gas",
      "Magnesium does not react with the alkali",
      "Magnesium dissolves completely",
    ],
    answerIndex: 2,
    explanation:
      "Magnesium does not react with alkali in this activity, unlike its reaction with acid.",
  },
  {
    id: "sci-f2-c6-dlp-q17",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Medium",
    chapter: "Chapter 6",
    lang: "dlp",
    question:
      "Which word equation correctly represents the neutralisation reaction between sulphuric acid and potassium hydroxide?",
    options: [
      "Sulphuric acid + Potassium hydroxide → Potassium sulphate + Water",
      "Sulphuric acid + Potassium hydroxide → Potassium chloride + Water",
      "Sulphuric acid + Potassium hydroxide → Potassium sulphate + Hydrogen",
      "Sulphuric acid + Potassium hydroxide → Potassium nitrate + Water",
    ],
    answerIndex: 0,
    explanation:
      "Neutralisation follows the word equation Acid + Alkali → Salt + Water. Sulphuric acid reacts with potassium hydroxide to produce potassium sulphate and water.",
  },
  {
    id: "sci-f2-c6-dlp-q19",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Medium",
    chapter: "Chapter 6",
    lang: "dlp",
    question:
      "In the textbook acid-alkali titration, which apparatus contains hydrochloric acid and allows it to be added drop by drop into the conical flask?",
    options: ["Pipette", "Burette", "Conical flask", "Measuring cylinder"],
    answerIndex: 1,
    explanation:
      "In the titration, the burette is filled with hydrochloric acid and allows it to be added drop by drop into the conical flask, while the pipette is used to transfer a fixed volume of sodium hydroxide solution into the conical flask.",
  },
  {
    id: "sci-f2-c6-dlp-q20",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Medium",
    chapter: "Chapter 6",
    lang: "dlp",
    question: "In an acid-alkali titration using phenolphthalein, how is the end point identified?",
    options: [
      "The solution becomes cloudy",
      "The solution changes from pink to colourless",
      "The solution produces bubbles",
      "The solution turns blue",
    ],
    answerIndex: 1,
    explanation:
      "Using phenolphthalein as the indicator, neutralisation is complete when the solution changes from pink to colourless.",
  },
  {
    id: "sci-f2-c6-dlp-q21",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Medium",
    chapter: "Chapter 6",
    lang: "dlp",
    question:
      "The soil on a farm is found to be too acidic for crops to grow well. What substance should be added and why?",
    options: [
      "Vinegar, because it will increase the soil's acidity",
      "Slaked lime, because it is alkaline and will neutralise the soil's acidity",
      "Sulphuric acid, because it will corrode the soil",
      "Distilled water, because it has no effect",
    ],
    answerIndex: 1,
    explanation:
      "Acidic soil can be treated by adding slaked lime, which is alkaline, so that plants can grow well through the process of neutralisation.",
  },
  {
    id: "sci-f2-c6-dlp-q22",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Medium",
    chapter: "Chapter 6",
    lang: "dlp",
    question: "Why is an acidic fabric softener used after fabrics are washed with detergent?",
    options: [
      "To make the fabric more colourful",
      "To increase the alkalinity of the fabric",
      "To neutralise the fabric, which becomes alkaline after being washed with detergent",
      "To remove heavy stains",
    ],
    answerIndex: 2,
    explanation:
      "Fabric softeners are acidic and reduce the pH level of fabrics, which become alkaline after being washed with detergents — a form of neutralisation.",
  },
  {
    id: "sci-f2-c6-dlp-q23",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Medium",
    chapter: "Chapter 6",
    lang: "dlp",
    question:
      "A factory produces acidic chemical waste. What must be done to this waste before it is discharged into a river?",
    options: [
      "It can be discharged directly without any treatment",
      "It must be treated with an alkali to neutralise it before being discharged",
      "It must be diluted with more acid before being discharged",
      "It only needs to be filtered, with no chemical treatment",
    ],
    answerIndex: 1,
    explanation:
      "Acidic waste substances from factories are treated with alkalis to neutralise them before being discharged into a river.",
  },
  {
    id: "sci-f2-c6-dlp-q24",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Medium",
    chapter: "Chapter 6",
    lang: "dlp",
    question:
      "How does toothpaste help prevent dental caries based on the concept of neutralisation?",
    options: [
      "Toothpaste is acidic and adds to the acidity in the mouth",
      "Toothpaste contains an alkaline substance that neutralises the acid produced by bacteria in the mouth",
      "Toothpaste has no relation to the pH of the mouth",
      "Toothpaste only cleans physically without any chemical reaction",
    ],
    answerIndex: 1,
    explanation:
      "Toothpaste contains an alkaline substance that can neutralise the acid produced by bacteria in the mouth, thereby preventing dental caries.",
  },
  {
    id: "sci-f2-c6-dlp-q25",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Hard",
    chapter: "Chapter 6",
    lang: "dlp",
    question: "A student wants to find the pH of ammonia gas. What should be done first, and why?",
    options: [
      "Test the gas directly with litmus paper, because gases do not need water",
      "Dissolve the ammonia gas in water first, because acids and alkalis only show their properties in the presence of water, then test the resulting solution",
      "Heat the ammonia gas until it becomes a solid before testing",
      "Mix the ammonia gas with an acid before testing its pH",
    ],
    answerIndex: 1,
    explanation:
      "Acids and alkalis only show their properties in the presence of water. To find the pH of ammonia gas, it must first be dissolved in water so that its alkaline property can be shown, and then a suitable test — such as litmus paper, universal indicator or a pH meter — can be used on the resulting solution.",
  },
  {
    id: "sci-f2-c6-dlp-q26",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Medium",
    chapter: "Chapter 6",
    lang: "dlp",
    question: "Which of the following correctly matches a substance with its use?",
    options: [
      "Sodium hydroxide is used in car batteries",
      "Sulphuric acid is used in car batteries",
      "Vinegar is used to make detergents",
      "Slaked lime is used in fizzy drinks",
    ],
    answerIndex: 1,
    explanation:
      "Sulphuric acid, an acid, is used in car batteries. Sodium hydroxide, an alkali, is used to make detergents; vinegar, an acid, is used in cooking; and slaked lime, an alkali, is used to treat acidic soil.",
  },
  {
    id: "sci-f2-c6-dlp-q27",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Hard",
    chapter: "Chapter 6",
    lang: "dlp",
    question:
      "In an acid-alkali titration using phenolphthalein, the solution in the conical flask remains pink even after more hydrochloric acid has been added from the burette. What is the most accurate conclusion?",
    options: [
      "Neutralisation is fully complete",
      "The amount of acid added is still insufficient to neutralise all the alkali in the conical flask",
      "The phenolphthalein has gone bad",
      "The solution in the conical flask is acidic",
    ],
    answerIndex: 1,
    explanation:
      "The solution remaining pink (phenolphthalein's colour in alkaline conditions) means alkali is still in excess; neutralisation is only complete when the colour changes to colourless.",
  },
  {
    id: "sci-f2-c6-dlp-q28",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Hard",
    chapter: "Chapter 6",
    lang: "dlp",
    question:
      "Why does solid sodium hydroxide not change the colour of red litmus paper, but sodium hydroxide solution turns it blue?",
    options: [
      "Because solid sodium hydroxide is not an alkali",
      "Because acids and alkalis only show their properties in the presence of water",
      "Because the red litmus paper is damaged by the solid",
      "Because solid sodium hydroxide is weaker than its solution",
    ],
    answerIndex: 1,
    explanation:
      "Acids and alkalis show their properties only in the presence of water; solid sodium hydroxide (without water) does not change red litmus paper, but with water it turns it blue.",
  },
  {
    id: "sci-f2-c6-dlp-q29",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Medium",
    chapter: "Chapter 6",
    lang: "dlp",
    question:
      "Ammonia solution is used in the production of fertilisers for agriculture. Which statement correctly describes this process?",
    options: [
      "Fertilisers are produced from a reaction between acidic and alkaline substances, with ammonia solution as the alkaline substance",
      "Ammonia solution is an acid used to corrode raw materials",
      "Fertiliser production does not involve any acid-alkali reaction",
      "Ammonia solution is only used to colour the fertiliser",
    ],
    answerIndex: 0,
    explanation:
      "Fertilisers are produced from a reaction between acidic and alkaline substances. Ammonia solution, which is alkaline, is used in the production of fertilisers for the agricultural sector.",
  },
  {
    id: "sci-f2-c6-dlp-q30",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Hard",
    chapter: "Chapter 6",
    lang: "dlp",
    question:
      "Based on the indicator colour change table, a pond water sample is tested with blue litmus paper (stays blue), red litmus paper (stays red), and phenolphthalein (colourless). What is the pH nature of the pond water?",
    options: ["Acidic", "Alkaline", "Neutral", "Cannot be determined"],
    answerIndex: 2,
    explanation:
      "Blue and red litmus paper remaining unchanged, along with phenolphthalein remaining colourless, indicates the substance is neutral (pH 7).",
  },
  {
    id: "sci-f2-c6-dlp-q31",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Medium",
    chapter: "Chapter 6",
    lang: "dlp",
    question:
      "Hydrochloric acid and ethanoic acid at the same concentration are tested with a pH meter. The hydrochloric acid reads pH 1 and the ethanoic acid reads pH 3. What can be concluded?",
    options: [
      "Ethanoic acid is the stronger acid because its pH value is higher",
      "Hydrochloric acid is a strong acid and ethanoic acid is a weak acid",
      "Both are strong acids because both pH values are below 7",
      "Acid strength cannot be determined from pH values",
    ],
    answerIndex: 1,
    explanation:
      "At the same concentration, the acid giving the lower pH value is the stronger acid. Hydrochloric acid (pH 1) is a strong acid; ethanoic acid (pH 3) is a weak acid.",
  },
  {
    id: "sci-f2-c6-dlp-q32",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Hard",
    chapter: "Chapter 6",
    lang: "dlp",
    question:
      "Why does the condition 'at the same concentration' matter when comparing the strength of two acids using pH values?",
    options: [
      "Because acids only show their properties at certain concentrations",
      "Because without it, a difference in pH could come from concentration rather than from acid strength",
      "Because pH values can only be measured at the same concentration",
      "Because weak acids do not dissolve at high concentrations",
    ],
    answerIndex: 1,
    explanation:
      "A very dilute strong acid can show a higher pH than a concentrated weak acid. Comparing at the same concentration makes sure the difference in pH really is caused by the strength of the acid.",
  },
  {
    id: "sci-f2-c6-dlp-q33",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Hard",
    chapter: "Chapter 6",
    lang: "dlp",
    question: "Vinegar contains ethanoic acid and tastes sour. What kind of acid is in vinegar?",
    options: [
      "A strong acid, because it tastes sour",
      "A strong acid, because its pH is low",
      "A weak acid",
      "Not an acid, because it is used in food",
    ],
    answerIndex: 2,
    explanation:
      "Ethanoic acid is a weak acid. A sour taste and a low pH show the solution is acidic, but acid strength is decided by comparing substances at the same concentration.",
  },
  {
    id: "sci-f2-c6-dlp-q34",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Medium",
    chapter: "Chapter 6",
    lang: "dlp",
    question:
      "Sodium hydroxide solution and ammonia solution at the same concentration read pH 13 and pH 11 respectively. Which is the weak alkali?",
    options: [
      "Sodium hydroxide solution",
      "Ammonia solution",
      "Both are weak alkalis",
      "Both are strong alkalis",
    ],
    answerIndex: 1,
    explanation:
      "At the same concentration, the alkali giving the lower pH value is the weaker one. Ammonia solution (pH 11) is a weak alkali; sodium hydroxide solution (pH 13) is a strong alkali.",
  },
  {
    id: "sci-f2-c6-dlp-q35",
    subjectId: "science",
    form: "Form 2",
    difficulty: "Easy",
    chapter: "Chapter 6",
    lang: "dlp",
    question: "Which instrument gives a direct numerical reading of a solution's pH value?",
    options: ["Litmus paper", "Universal indicator", "pH meter", "Methyl orange"],
    answerIndex: 2,
    explanation:
      "A pH meter gives a direct numerical reading of a solution's pH value. Indicators such as litmus paper, universal indicator and methyl orange only show a colour change that must be compared with a chart or observed by eye.",
  },
];
