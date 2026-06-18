import type { EnglishChapterData } from "./english-types";

export const englishF1C1Notes: EnglishChapterData = {
  chapterTitle: "Paper 1 - Reading & Language Awareness",
  tagline:
    "Read the text, spot the clues, fix the language. Paper 1 is all about understanding what the question really wants.",
  heroEmoji: "📘",
  theme: "reading",
  learningGoals: [
    "Identify purpose and key clues in short texts",
    "Correct grammar and vocabulary errors",
    "Transfer information accurately from passages",
    "Answer comprehension and gapped-text questions with exam strategy",
  ],
  wordVault: [
    {
      word: "purpose",
      partOfSpeech: "noun",
      meaning: "the reason a text is written",
      example: "The purpose of the notice is to ask for donations.",
    },
    {
      word: "clue",
      partOfSpeech: "noun",
      meaning: "a word, picture, or detail that helps you find the answer",
      example: "The phrase '50% off' is a clue that the text is an advertisement.",
    },
    {
      word: "specific information",
      partOfSpeech: "noun phrase",
      meaning: "exact details such as names, dates, places, causes, or effects",
      example: "Scan the poster for the venue and time.",
    },
    {
      word: "skimming",
      partOfSpeech: "reading skill",
      meaning: "reading quickly for the general idea",
      example: "Skim the passage first before reading the questions.",
    },
    {
      word: "scanning",
      partOfSpeech: "reading skill",
      meaning: "looking quickly for a particular detail",
      example: "Scan for numbers, names, and keywords from the question.",
    },
    {
      word: "context",
      partOfSpeech: "noun",
      meaning: "the words and ideas around a word or sentence",
      example: "Use context to decide which missing sentence fits best.",
    },
    {
      word: "reference word",
      partOfSpeech: "noun phrase",
      meaning: "a word such as he, she, it, this, or they that points to another idea",
      example: "The word 'they' may refer to the hikers in the previous sentence.",
    },
    {
      word: "correction",
      partOfSpeech: "noun",
      meaning: "the right version after fixing an error",
      example: "The correction for 'She go' is 'She goes'.",
    },
  ],
  examFacts: [
    "Paper 1 is skill-based: short texts, language awareness, information transfer, comprehension, and gapped text.",
    "For short texts, identify the text type first: message, notice, advertisement, poster, banner, sign, or label.",
    "For error correction, check one grammar point at a time: tense, agreement, article, preposition, pronoun, conjunction, word form.",
    "For information transfer, copy only the needed words and respect limits such as 'No More Than Three Words'.",
    "For reading comprehension, read the question before hunting for the answer in the passage.",
    "For gapped text, read the sentence before and after the gap. The missing sentence must connect both sides smoothly.",
  ],
  sections: [
    {
      title: "Part 1 - Short Texts & Visual Materials",
      emoji: "🪧",
      cards: [
        {
          type: "goal",
          title: "Learning Objectives",
          items: [
            "Recognise messages, notices, advertisements, posters, banners, signs, and labels.",
            "Identify the purpose of each text: inform, invite, warn, promote, thank, request, or persuade.",
            "Use visual clues such as prices, dates, headings, contact numbers, and images.",
          ],
        },
        {
          type: "concept",
          title: "Notes",
          body:
            "Short text questions show a small real-life text and ask what it means, why it was written, or which detail is correct. Read the heading, text type, and visual details before choosing the answer.",
          items: [
            "Messages often express thanks, apology, reminder, or invitation.",
            "Notices usually give public information or instructions.",
            "Advertisements and promotions try to persuade people to buy or join.",
            "Posters and banners highlight key details using headings, dates, places, and slogans.",
            "Signs and labels are short, direct, and often give warnings or instructions.",
          ],
        },
        {
          type: "vocab",
          title: "Important Vocabulary",
          words: [
            {
              word: "appreciation",
              partOfSpeech: "noun",
              meaning: "thanks or gratitude",
              example: "The message shows appreciation for the donation.",
            },
            {
              word: "donation",
              partOfSpeech: "noun",
              meaning: "money or items given to help others",
              example: "The notice asks students to bring food donations.",
            },
            {
              word: "promotion",
              partOfSpeech: "noun",
              meaning: "a special offer to attract buyers",
              example: "The Black Friday promotion offers lower prices.",
            },
            {
              word: "registration",
              partOfSpeech: "noun",
              meaning: "signing up for a class or event",
              example: "Registration for piano class closes on Friday.",
            },
          ],
        },
        {
          type: "table",
          title: "Text Type Clue Table",
          table: {
            headers: ["Text Type", "Common Clues", "Likely Purpose"],
            rows: [
              ["Message", "Dear, Hi, Thank you, Sorry", "To thank, remind, invite, or apologise"],
              ["Notice", "Attention, Please be informed, Date, Venue", "To inform people about something"],
              ["Advertisement", "Sale, Join now, Discount, Contact us", "To persuade people to buy or join"],
              ["Poster/Banner", "Big heading, slogan, event details", "To promote an event or campaign"],
              ["Sign/Label", "No entry, Keep clean, Ingredients", "To warn, instruct, or describe"],
            ],
          },
        },
        {
          type: "story",
          title: "UASA Reference Examples",
          body:
            "MESSAGE\nDear Mei Lee,\n\nThank you for helping me when I was in need.\n\nQuestion: The message shows Nisha's ______.\nAnswer: Appreciation\nKeywords: Thank you, helping me\nExplanation: The words 'Thank you' show appreciation.\n\nNOTICE\nDONATION DRIVE\nPlease bring clean clothes, books, and canned food to the school hall by Friday.\n\nQuestion: What should students do?\nAnswer: Bring items for donation.\nKeywords: Donation Drive, bring, clothes, books, canned food\nExplanation: The notice asks students to bring useful items to help others.\n\nADVERTISEMENT\nPIANO CLASS FOR BEGINNERS\nEvery Saturday, 10.00 a.m. Call Miss Tan at 012-3456789.\n\nQuestion: Who is the class suitable for?\nAnswer: Beginners\nKeywords: Piano Class for Beginners\nExplanation: The advertisement clearly says the class is for beginners.\n\nPOSTER\nBLACK FRIDAY SALE\nUp to 50% off selected school bags. One day only!\n\nQuestion: What is the poster promoting?\nAnswer: A sale on school bags\nKeywords: Black Friday Sale, 50% off, school bags\nExplanation: Discounts and product names show that the poster is promoting a sale.\n\nBANNER\nHIKING DAY 2026\nJoin us at Bukit Ceria this Sunday. Bring water and comfortable shoes.\n\nQuestion: What must participants bring?\nAnswer: Water and comfortable shoes\nKeywords: Bring water, comfortable shoes\nExplanation: The banner gives instructions for hikers.\n\nSIGN\nQUIET ZONE\nExamination in progress.\n\nQuestion: What should people do here?\nAnswer: Keep quiet\nKeywords: Quiet Zone, Examination in progress\nExplanation: The sign warns people not to make noise during an exam.\n\nLABEL\nMANGO JUICE\nKeep refrigerated after opening.\n\nQuestion: What should you do after opening the drink?\nAnswer: Keep it refrigerated\nKeywords: Keep refrigerated, after opening\nExplanation: The label gives storage instructions.",
        },
        {
          type: "exam-tip",
          title: "Exam Tips",
          items: [
            "Underline words that reveal purpose: thank, sale, join, donate, warning, closed, open.",
            "Do not choose an answer just because it contains a familiar word. Match the whole meaning.",
            "For visual texts, read the heading first, then details, then answer options.",
          ],
        },
        {
          type: "mistake",
          title: "Common Mistakes",
          body: "Students often confuse a topic with a purpose.",
          wrong: "Topic: Donation. Purpose: About donations.",
          right: "Purpose: To encourage people to donate books or money.",
        },
        {
          type: "exam-tip",
          title: "UASA Focus",
          body:
            "UASA questions often ask for purpose, intention, correct detail, or meaning. Always prove your answer using words from the text.",
        },
        {
          type: "story",
          title: "Worked Solutions",
          body:
            "Example: 'Thank you, Class 1 Amanah, for helping us collect books for the reading corner.'\nQuestion: What is the purpose of the message?\nStep 1: Identify the text type: message.\nStep 2: Find the keyword: Thank you.\nStep 3: Match purpose: showing appreciation.\nFinal Answer: To show appreciation.",
        },
        {
          type: "memory-trick",
          title: "Quick Summary",
          body:
            "Text type first, purpose second, clue third. If you can point to the exact clue in the text, your answer is usually safer.",
        },
      ],
    },
    {
      title: "Part 2 - Grammar & Error Correction",
      emoji: "🛠️",
      cards: [
        {
          type: "goal",
          title: "Learning Objectives",
          items: [
            "Identify errors in prepositions, pronouns, articles, tenses, agreement, conjunctions, vocabulary, and word forms.",
            "Correct sentences without changing the original meaning.",
            "Use grammar clues before choosing the answer.",
          ],
        },
        {
          type: "concept",
          title: "Notes",
          body:
            "Error correction questions test accuracy. Read the whole sentence, identify the grammar job of the incorrect word, then choose the correction that fits the sentence.",
        },
        {
          type: "table",
          title: "Grammar Checklist",
          table: {
            headers: ["Area", "What to Check", "Example Correction"],
            rows: [
              ["Prepositions", "time, place, direction", "on 2009 -> in 2009"],
              ["Pronouns", "who does/receives the action", "Ali helped she -> Ali helped her"],
              ["Articles", "a, an, the", "a umbrella -> an umbrella"],
              ["Tenses", "time words", "Yesterday, she go -> Yesterday, she went"],
              ["Subject-Verb Agreement", "singular or plural subject", "She like -> She likes"],
              ["Conjunctions", "relationship between ideas", "I was tired so I slept early"],
              ["Vocabulary Usage", "right word for meaning", "borrow me a pen -> lend me a pen"],
              ["Word Forms", "noun, verb, adjective, adverb", "writes careful -> writes carefully"],
            ],
          },
        },
        {
          type: "story",
          title: "UASA Reference Examples",
          body:
            "PREPOSITIONS\nOriginal sentence: Minecraft has become one of the world's most popular games on 2009.\nIncorrect word: on 2009\nCorrect answer: in 2009\nExplanation: We use 'in' for years.\nKeyword: 2009\n\nPRONOUNS\nOriginal sentence: Aina invited Sara because she wanted to thank her.\nIncorrect word: she, if it wrongly refers to the wrong person in context\nCorrect answer: Aina / Sara, based on the meaning of the sentence\nExplanation: Pronouns must clearly refer to the correct person.\nKeyword: invited, thank\n\nARTICLES\nOriginal sentence: He bought a umbrella before the trip.\nIncorrect word: a\nCorrect answer: an\nExplanation: Use 'an' before a vowel sound.\nKeyword: umbrella\n\nTENSES\nOriginal sentence: They visit the museum yesterday.\nIncorrect word: visit\nCorrect answer: visited\nExplanation: 'Yesterday' shows the past tense.\nKeyword: yesterday\n\nSUBJECT-VERB AGREEMENT\nOriginal sentence: The boy play football every evening.\nIncorrect word: play\nCorrect answer: plays\nExplanation: Singular subject 'boy' needs verb-s in simple present.\nKeyword: The boy\n\nCONJUNCTIONS\nOriginal sentence: I stayed at home but I was sick.\nIncorrect word: but\nCorrect answer: because\nExplanation: The second idea gives a reason, not a contrast.\nKeyword: was sick\n\nVOCABULARY USAGE\nOriginal sentence: Please borrow me your ruler.\nIncorrect word: borrow\nCorrect answer: lend\nExplanation: The giver lends; the receiver borrows.\nKeyword: me your ruler\n\nWORD FORMS\nOriginal sentence: She answered the question careful.\nIncorrect word: careful\nCorrect answer: carefully\nExplanation: The word describes how she answered, so use an adverb.\nKeyword: answered",
        },
        {
          type: "exam-tip",
          title: "Exam Tips",
          items: [
            "Read the sentence once for meaning.",
            "Find the grammar area: tense, article, pronoun, preposition, conjunction, or word form.",
            "Check the nearby clue: subject, time word, noun, or connector.",
            "Write the correction only, not a full new sentence, if the question asks for correction.",
          ],
        },
        {
          type: "mistake",
          title: "Common Mistakes",
          wrong: "She go to piano class every Saturday.",
          right: "She goes to piano class every Saturday.",
          items: ["'She' is singular.", "'Every Saturday' shows a habit, so use simple present."],
        },
        {
          type: "exam-tip",
          title: "UASA Focus",
          body:
            "UASA error correction usually gives enough clues inside the sentence. Time words, subjects, and nearby nouns are the fastest clues.",
        },
        {
          type: "story",
          title: "Worked Solutions",
          body:
            "Original sentence: The students was excited about the trip.\nIncorrect word: was\nCorrect answer: were\nExplanation: 'Students' is plural, so the correct verb is 'were'.\nKeyword: students\n\nOriginal sentence: I will meet you on 8 p.m.\nIncorrect word: on\nCorrect answer: at\nExplanation: We use 'at' for a specific time.\nKeyword: 8 p.m.",
        },
        {
          type: "memory-trick",
          title: "Quick Summary",
          body:
            "In error correction, every answer must agree with the subject, time clue, and sentence meaning. Never correct a word in isolation.",
        },
      ],
    },
    {
      title: "Part 3 - Information Transfer",
      emoji: "📋",
      cards: [
        {
          type: "goal",
          title: "Learning Objectives",
          items: [
            "Extract key information from a passage into a table.",
            "Identify causes, effects, solutions, and important details.",
            "Answer within word limits such as 'No More Than Three Words'.",
          ],
        },
        {
          type: "concept",
          title: "Notes",
          body:
            "Information transfer is not summary writing. You search for exact details and place them in the correct table spaces.",
          items: [
            "Cause = why something happens.",
            "Effect = what happens because of it.",
            "Solution = how to solve or reduce the problem.",
            "Key information = names, places, actions, reasons, results, and suggestions.",
          ],
        },
        {
          type: "table",
          title: "Cause, Effect, Solution Clues",
          table: {
            headers: ["Question Need", "Signal Words", "Example Answer"],
            rows: [
              ["Cause", "because, due to, caused by, since", "heavy rain"],
              ["Effect", "as a result, therefore, leads to", "flooded paths"],
              ["Solution", "should, can, need to, advised to", "clear the drains"],
              ["Specific Detail", "who, where, when, how much", "school hall, 8 a.m."],
            ],
          },
        },
        {
          type: "story",
          title: "UASA Reference Examples",
          body:
            "READING PASSAGE\nClimate change happens when the earth becomes warmer over a long period of time. Pollution from cars and factories releases harmful gases into the air. Cutting down trees also makes the problem worse because trees help absorb carbon dioxide. As a result, some places face floods, droughts, and stronger storms. We can help by saving electricity, using public transport, and planting more trees.\n\nTABLE\nCauses:\n1. Pollution from cars and factories\n2. Cutting down trees\n\nEffects:\n1. Floods\n2. Droughts\n3. Stronger storms\n\nSolutions:\n1. Saving electricity\n2. Using public transport\n3. Planting trees\n\nCOMPLETED ANSWERS AND KEYWORDS\nCause 1: Pollution from cars and factories. Found in: 'Pollution from cars and factories releases harmful gases'.\nCause 2: Cutting down trees. Found in: 'Cutting down trees also makes the problem worse'.\nEffects: Floods, droughts, stronger storms. Found in: 'some places face floods, droughts, and stronger storms'.\nSolutions: Saving electricity, using public transport, planting trees. Found in: 'We can help by saving electricity, using public transport, and planting more trees'.",
        },
        {
          type: "exam-tip",
          title: "Exam Tips",
          items: [
            "Read the table headings before the passage.",
            "Copy only the needed words.",
            "Follow word limits such as 'No More Than Three Words'.",
            "Do not add your own ideas unless the question asks you to.",
          ],
        },
        {
          type: "mistake",
          title: "Common Mistakes",
          wrong: "The hiking trail was closed because there was heavy rain.",
          right: "heavy rain",
          items: ["The long answer repeats the sentence.", "The table only asks for the reason."],
        },
        {
          type: "exam-tip",
          title: "UASA Focus",
          body:
            "UASA information transfer rewards precise answers. The correct answer is often a short phrase copied from the passage.",
        },
        {
          type: "story",
          title: "Worked Solutions",
          body:
            "Passage clue: 'The hiking trail was closed because of heavy rain.'\nTable heading: Reason the trail was closed.\nStep 1: Find the reason signal word: because.\nStep 2: Copy the reason after it: heavy rain.\nFinal Answer: heavy rain.\nExplanation: The answer is two words and directly completes the table.",
        },
        {
          type: "memory-trick",
          title: "Quick Summary",
          body:
            "Headings tell you what to hunt for. Causes answer why, effects answer what happened, and solutions answer what can be done.",
        },
      ],
    },
    {
      title: "Part 4 - Reading Comprehension",
      emoji: "🔎",
      cards: [
        {
          type: "goal",
          title: "Learning Objectives",
          items: [
            "Answer True/False, multiple choice, and short-answer questions.",
            "Find specific information, main ideas, supporting details, and author's purpose.",
            "Use skimming, scanning, and keyword matching accurately.",
          ],
        },
        {
          type: "concept",
          title: "Notes",
          body:
            "Reading comprehension questions test both surface details and deeper understanding. Some answers are directly stated; others require clues from the whole paragraph.",
        },
        {
          type: "table",
          title: "Comprehension Skill Guide",
          table: {
            headers: ["Skill", "What It Means", "How to Answer"],
            rows: [
              ["True or False", "Decide if the statement matches the text", "Compare every important word"],
              ["Multiple Choice", "Choose the best option", "Eliminate wrong or partly true answers"],
              ["Short Answer", "Write a direct answer", "Use only the needed words"],
              ["Specific Information", "Find exact details", "Scan for names, dates, places, numbers"],
              ["Main Ideas", "Find the central message", "Ask what the paragraph is mostly about"],
              ["Supporting Details", "Find facts or examples", "Look for evidence after the main idea"],
              ["Author's Purpose", "Find why the writer wrote it", "Inform, persuade, warn, advise, or entertain"],
            ],
          },
        },
        {
          type: "story",
          title: "UASA Reference Examples",
          body:
            "PASSAGE\nJoin the Green Club before 15 March and enjoy a 10% discount on your membership fee. Members will take part in recycling projects, tree-planting activities, and weekend nature walks.\n\nQuestion: What happens when you sign up early?\nCorrect answer: You can pay less than the normal price.\nKeywords: before 15 March, 10% discount\nExplanation: The advertisement says early members receive a discount.\nExam tip: Do not copy only '10% discount' if the question asks 'what happens'. Write the meaning in a full answer.\n\nPASSAGE\nLina placed a bowl of water outside her house every afternoon. The weather had been very hot, and many stray cats came to drink from it.\n\nQuestion: Why did Lina put water outside?\nCorrect answer: To help stray cats during hot weather.\nKeywords: hot, stray cats, drink\nExplanation: The passage shows that the cats needed water because of the heat.\nExam tip: Combine clues from more than one sentence when the answer is not in one exact phrase.",
        },
        {
          type: "exam-tip",
          title: "Exam Tips",
          items: [
            "Skim first to understand the topic.",
            "Read the questions and circle keywords.",
            "Scan the passage for those keywords or synonyms.",
            "Check the sentence before and after the answer clue.",
            "For multiple choice, prove why the chosen answer is correct.",
          ],
        },
        {
          type: "mistake",
          title: "Common Mistakes",
          wrong: "Choosing an answer because it uses the same word as the passage.",
          right: "Choosing an answer because the meaning matches the passage.",
        },
        {
          type: "exam-tip",
          title: "UASA Focus",
          body:
            "UASA comprehension questions often use synonyms. For example, 'pay less' can mean 'discount', and 'join early' can mean 'sign up before the date'.",
        },
        {
          type: "story",
          title: "Worked Solutions",
          body:
            "Question: What happens when you sign up early?\nStep 1: Find the keyword in the question: sign up early.\nStep 2: Match it to the passage: before 15 March.\nStep 3: Find the result: 10% discount.\nFinal Answer: You can pay less than the normal price.\nExplanation: '10% discount' means the price is reduced.",
        },
        {
          type: "memory-trick",
          title: "Quick Summary",
          body:
            "Keyword, clue sentence, meaning check. If all three match, the answer is strong.",
        },
      ],
    },
    {
      title: "Part 5 - Gapped Text",
      emoji: "🧩",
      cards: [
        {
          type: "goal",
          title: "Learning Objectives",
          items: [
            "Choose missing sentences that fit the sequence and meaning.",
            "Use context clues and reference words.",
            "Avoid distractor sentences that sound correct but do not connect.",
          ],
        },
        {
          type: "concept",
          title: "Notes",
          body:
            "In gapped text, the missing sentence must connect logically to the sentence before and the sentence after the gap.",
          items: [
            "Sequence clues: first, next, then, after that, finally.",
            "Reference words: he, she, it, they, this, these, those.",
            "Contrast clues: however, but, although.",
            "Result clues: so, therefore, as a result.",
          ],
        },
        {
          type: "story",
          title: "UASA Reference Examples",
          body:
            "FULL PASSAGE\nMany people love keeping pets. However, some animals are left on the streets. These animals do not have homes or owners. They may feel hungry, frightened, or sick. Animal shelters help by giving them food, medical care, and a safe place to stay.\n\nQuestion 33: Choose the best sentence to complete the passage.\nOptions:\nA. These animals do not have homes or owners.\nB. Many children enjoy watching cartoons.\nC. The shop sells pet food at a low price.\nD. The animals sleep all day because they are lazy.\n\nCorrect answer: A. These animals do not have homes or owners.\nExplanation: The previous sentence mentions animals left on the streets, so the missing sentence must explain what stray animals are.\nKeywords: animals left on the streets, do not have homes or owners\n\nFULL PASSAGE\nAina wanted to join the hiking trip. First, she packed a water bottle and a torch. Then, she checked the hiking map. After that, she waited for her friends at the entrance.\n\nQuestion: Which sentence fits the gap after 'First, she packed a water bottle and a torch'?\nOptions:\nA. Then, she checked the hiking map.\nB. She ate dinner at home.\nC. The bus was very expensive.\nD. Her brother enjoys football.\n\nCorrect answer: A\nExplanation: 'First' must be followed by a logical next action. 'Then' continues the sequence.",
        },
        {
          type: "exam-tip",
          title: "Exam Tips",
          items: [
            "Read the whole text once without answering.",
            "Read the sentence before the gap and predict what should come next.",
            "Read the sentence after the gap and check whether your choice connects.",
            "Check pronouns and reference words.",
            "Cross out used options and reread the completed paragraph.",
          ],
        },
        {
          type: "mistake",
          title: "Common Mistakes",
          wrong: "Choosing a sentence about hiking just because the text is about hiking.",
          right: "Choosing the sentence that connects to the exact before-and-after context.",
        },
        {
          type: "exam-tip",
          title: "UASA Focus",
          body:
            "UASA gapped text options may all use the same topic. The correct option must fit grammar, sequence, pronouns, and meaning.",
        },
        {
          type: "story",
          title: "Worked Solutions",
          body:
            "Question 33\nAnswer: These animals do not have homes or owners.\nStep 1: Read the sentence before the gap: some animals are left on the streets.\nStep 2: Predict the next idea: explain those animals.\nStep 3: Check the option: 'These animals' refers to the animals left on the streets.\nExplanation: The sentence connects clearly and explains stray animals.",
        },
        {
          type: "memory-trick",
          title: "Quick Summary",
          body:
            "A missing sentence is like a bridge. It must connect the idea before it and the idea after it.",
        },
      ],
    },
  ],
};
