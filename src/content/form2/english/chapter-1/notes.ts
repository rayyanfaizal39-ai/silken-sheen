import type { EnglishChapterData } from "@/data/english-types";

export const englishF2C1Notes: EnglishChapterData = {
  chapterTitle: "Paper 1 - Reading & Language Awareness",
  tagline:
    "Read the text, spot the clues, fix the language. Paper 1 rewards sharp eyes and quick, evidence-based thinking.",
  heroEmoji: "📘",
  theme: "reading",
  learningGoals: [
    "Interpret everyday texts such as messages, emails, notices, and advertisements",
    "Correct grammar errors across tenses, agreement, articles, and more",
    "Transfer key information into tables, mind maps, and flow charts",
    "Answer reading comprehension and gapped-text questions with exam strategy",
  ],
  wordVault: [
    {
      word: "purpose",
      partOfSpeech: "noun",
      meaning: "the reason a text is written",
      example: "The purpose of the poster is to promote the school carnival.",
    },
    {
      word: "target audience",
      partOfSpeech: "noun phrase",
      meaning: "the group of people a text is written for",
      example: "The brochure's target audience is parents of young children.",
    },
    {
      word: "keyword",
      partOfSpeech: "noun",
      meaning: "an important word that points to the answer",
      example: "Underline the keyword 'discount' to find the advertisement's purpose.",
    },
    {
      word: "specific information",
      partOfSpeech: "noun phrase",
      meaning: "exact details such as names, dates, places, or numbers",
      example: "Scan the notice for the venue and closing date.",
    },
    {
      word: "skimming",
      partOfSpeech: "reading skill",
      meaning: "reading quickly for the general idea",
      example: "Skim the report first to understand what it is mostly about.",
    },
    {
      word: "scanning",
      partOfSpeech: "reading skill",
      meaning: "looking quickly for one particular detail",
      example: "Scan the email for the meeting time.",
    },
    {
      word: "cohesion",
      partOfSpeech: "noun",
      meaning: "how ideas in a text connect smoothly",
      example: "Reference words like 'this' and 'they' help cohesion between sentences.",
    },
    {
      word: "correction",
      partOfSpeech: "noun",
      meaning: "the right version after fixing a language error",
      example: "The correction for 'She go' is 'She goes'.",
    },
  ],
  examFacts: [
    "Paper 1 has five parts: short texts, grammar, information transfer, reading comprehension, and gapped text.",
    "For short texts and visual materials, identify the text type first: message, email, notice, advertisement, poster, brochure, announcement, sign, or short report.",
    "For grammar, students identify and correct 8 language errors in one passage.",
    "For information transfer, copy only the words needed and respect any word limit.",
    "For reading comprehension, short answers are usually no more than five words.",
    "For gapped text, students choose 6 correct sentences from 8 options to complete a passage.",
  ],
  sections: [
    {
      title: "Part 1 - Short Texts & Visual Materials",
      emoji: "📩",
      cards: [
        {
          type: "goal",
          title: "Learning Objectives",
          items: [
            "Recognise text messages, emails, notices, advertisements, posters, brochures, announcements, signs, and short reports.",
            "Identify the purpose, target audience, and main idea of each text.",
            "Use visual clues such as headings, pictures, prices, and dates to find important details.",
          ],
        },
        {
          type: "concept",
          title: "Notes",
          body:
            "Short text questions show a small real-life text and ask what it means, who it is for, or which detail is correct. Look at the purpose, the target audience, the main idea, and the writer's intention before choosing an answer.",
          items: [
            "Text messages and emails often thank, remind, invite, apologise, or ask for information.",
            "Notices and announcements usually give public information or instructions.",
            "Advertisements and brochures try to persuade people to buy, join, or visit.",
            "Posters highlight key details using headings, dates, places, and slogans.",
            "Signs and short reports are brief and direct, often stating a fact, warning, or result.",
          ],
        },
        {
          type: "vocab",
          title: "Important Vocabulary",
          words: [
            {
              word: "intention",
              partOfSpeech: "noun",
              meaning: "what the writer wants to achieve",
              example: "The writer's intention is to warn residents about road closures.",
            },
            {
              word: "visual clue",
              partOfSpeech: "noun phrase",
              meaning: "a picture, heading, or caption that helps you understand the text",
              example: "The visual clue of a discount tag shows this is an advertisement.",
            },
            {
              word: "inform",
              partOfSpeech: "verb",
              meaning: "to give facts or details to someone",
              example: "The notice informs students about the new library hours.",
            },
            {
              word: "persuade",
              partOfSpeech: "verb",
              meaning: "to convince someone to do or believe something",
              example: "The brochure tries to persuade tourists to visit the museum.",
            },
          ],
        },
        {
          type: "table",
          title: "Text Type Clue Table",
          table: {
            headers: ["Text Type", "Common Clues", "Likely Purpose"],
            rows: [
              ["Text Message / Email", "Hi, Dear, Thanks, I am writing to...", "To inform, thank, invite, or ask"],
              ["Notice / Announcement", "Please be informed, Attention, Date, Venue", "To inform people about something"],
              ["Advertisement / Brochure", "Sale, Visit us, Discount, Call now", "To persuade people to buy or join"],
              ["Poster", "Big heading, slogan, event details", "To promote an event or campaign"],
              ["Sign / Short Report", "No entry, Results show, Caution", "To warn, instruct, or state a fact"],
            ],
          },
        },
        {
          type: "story",
          title: "Worked Example",
          body:
            "NOTICE\nSCHOOL RECYCLING WEEK\nBring old newspapers and plastic bottles to the school hall from Monday to Friday. Prizes for the class that collects the most items!\n\nQuestion: What is the purpose of the notice?\nAnswer: To encourage students to bring recyclable items to school.\nKeywords: Recycling Week, bring, prizes\nExplanation: The heading and the mention of prizes show the notice wants to persuade students to take part.",
        },
        {
          type: "exam-tip",
          title: "Exam Tips",
          items: [
            "Read the question first, then find the answer in the text.",
            "Identify keywords before choosing an option.",
            "Look carefully at pictures, headings, and captions.",
            "Eliminate options that are clearly impossible.",
          ],
        },
        {
          type: "mistake",
          title: "Common Mistakes",
          items: [
            "Reading the text too quickly and missing details.",
            "Ignoring visual information such as pictures or headings.",
            "Guessing an answer without evidence from the text.",
          ],
        },
        {
          type: "memory-trick",
          title: "Quick Summary",
          body:
            "Text type first, purpose second, clue third. If you can point to the exact clue in the text, your answer is usually safe.",
        },
      ],
    },
    {
      title: "Part 2 - Grammar & Language Awareness",
      emoji: "✏️",
      cards: [
        {
          type: "goal",
          title: "Learning Objectives",
          items: [
            "Identify errors in tenses, subject-verb agreement, articles, pronouns, prepositions, and conjunctions.",
            "Spot errors in vocabulary usage and parts of speech.",
            "Correct sentences without changing the original meaning.",
          ],
        },
        {
          type: "concept",
          title: "Notes",
          body:
            "This part tests language accuracy. Students identify 8 grammar errors in one passage. Read the whole sentence first, find the grammar pattern, then choose the correction that fits.",
        },
        {
          type: "table",
          title: "Grammar Focus Checklist",
          table: {
            headers: ["Area", "What to Check", "Example Correction"],
            rows: [
              ["Tenses", "time words and sequence", "Last year, she win -> Last year, she won"],
              ["Subject-Verb Agreement", "singular or plural subject", "The students was -> The students were"],
              ["Articles", "a, an, the", "an unique idea -> a unique idea"],
              ["Pronouns", "who does or receives the action", "Give it to he -> Give it to him"],
              ["Prepositions", "time, place, direction", "good in Mondays -> good on Mondays"],
              ["Conjunctions", "relationship between ideas", "tired but she rested -> tired so she rested"],
              ["Vocabulary", "the right word for the meaning", "lend me your pen -> borrow me your pen (fix: lend)"],
              ["Parts of Speech", "noun, verb, adjective, adverb", "runs quick -> runs quickly"],
            ],
          },
        },
        {
          type: "story",
          title: "Worked Example",
          body:
            "Original sentence: The players was very happy because they won the match.\nIncorrect word: was\nCorrect answer: were\nExplanation: 'Players' is plural, so the verb must be 'were'.\nKeyword: The players\n\nOriginal sentence: She arrived to school early yesterday.\nIncorrect word: to\nCorrect answer: at\nExplanation: We use 'at' with 'school' to show arrival at a place.\nKeyword: arrived, school",
        },
        {
          type: "exam-tip",
          title: "Exam Tips",
          items: [
            "Read the whole sentence first for meaning.",
            "Look for grammar patterns such as tense or agreement.",
            "Check that the verb agrees with its subject.",
            "Check punctuation as well as words.",
          ],
        },
        {
          type: "mistake",
          title: "Common Mistakes",
          items: [
            "Correcting a word that is already correct.",
            "Ignoring the context of the whole sentence.",
          ],
        },
        {
          type: "memory-trick",
          title: "Quick Summary",
          body:
            "Every correction must agree with the subject, the time clue, and the meaning of the sentence. Never fix a word in isolation.",
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
            "Scan a passage for keywords and important details.",
            "Transfer information accurately into tables, mind maps, and flow charts.",
            "Use graphic organisers to show relationships between ideas.",
          ],
        },
        {
          type: "concept",
          title: "Notes",
          body:
            "Information transfer is not summary writing. Students scan the passage for exact details and place them correctly into a table, mind map, or flow chart, using words directly from the passage.",
          items: [
            "Scanning: searching quickly for a specific detail.",
            "Keywords: words in the question that guide your search.",
            "Important details: names, places, reasons, results, and suggestions.",
            "Graphic organisers: tables, mind maps, and flow charts that organise information visually.",
          ],
        },
        {
          type: "table",
          title: "Question Types",
          table: {
            headers: ["Organiser", "Best Used For", "What to Do"],
            rows: [
              ["Table", "Comparing facts or categories", "Copy the matching detail into each box"],
              ["Mind Map", "Showing one topic with branches", "Place each linked idea on its own branch"],
              ["Flow Chart", "Showing steps or a sequence", "Arrange details in the order they happen"],
            ],
          },
        },
        {
          type: "story",
          title: "Worked Example",
          body:
            "PASSAGE\nThe school canteen committee introduced a 'No Plastic Straw' rule this year. Students are encouraged to bring their own bottles. As a result, plastic waste in the canteen has reduced by half.\n\nFLOW CHART\nStep 1: No Plastic Straw rule introduced\nStep 2: Students bring their own bottles\nStep 3: Plastic waste reduced by half\n\nExplanation: Each box uses words copied directly from the passage, in the order they appear.",
        },
        {
          type: "exam-tip",
          title: "Exam Tips",
          items: [
            "Use words directly from the passage.",
            "Follow any word limit given in the question.",
            "Check spelling carefully before writing your final answer.",
          ],
        },
        {
          type: "mistake",
          title: "Common Mistakes",
          body: "Students often copy a whole sentence instead of the exact detail needed.",
          wrong: "The canteen committee introduced a rule about not using plastic straws this year.",
          right: "No Plastic Straw rule",
        },
        {
          type: "memory-trick",
          title: "Quick Summary",
          body: "Headings tell you what to hunt for. Copy only what answers the heading — nothing more.",
        },
      ],
    },
    {
      title: "Part 4 - Reading Comprehension",
      emoji: "📖",
      cards: [
        {
          type: "goal",
          title: "Learning Objectives",
          items: [
            "Identify main ideas, supporting details, and vocabulary in context.",
            "Make inferences and identify the author's purpose.",
            "Answer short-answer questions within a five-word limit.",
          ],
        },
        {
          type: "concept",
          title: "Notes",
          body:
            "Reading comprehension questions test both stated details and deeper understanding. Some answers are directly in the text; others need inference from clues across the passage. Short answers should be a maximum of five words.",
        },
        {
          type: "table",
          title: "Comprehension Skill Guide",
          table: {
            headers: ["Skill", "What It Means", "How to Answer"],
            rows: [
              ["Main Idea", "The central message of a paragraph", "Ask what the paragraph is mostly about"],
              ["Supporting Details", "Facts or examples that back up the main idea", "Look for evidence after the main idea"],
              ["Vocabulary in Context", "The meaning of a word within the passage", "Reread the sentence around the word"],
              ["Inference", "An idea that is suggested but not directly stated", "Combine clues from more than one sentence"],
              ["Author's Purpose", "Why the writer wrote the passage", "Decide: inform, persuade, warn, or entertain"],
            ],
          },
        },
        {
          type: "story",
          title: "Worked Example",
          body:
            "PASSAGE\nMany students rushed to the field when they heard the announcement. A stray kitten had been found trapped under the bleachers, and everyone wanted to help.\n\nQuestion: Why did the students rush to the field?\nAnswer: To help a trapped kitten.\nKeywords: rushed, trapped, everyone wanted to help\nExplanation: The answer combines two clues: the kitten was trapped, and students wanted to help.",
        },
        {
          type: "exam-tip",
          title: "Exam Tips",
          items: [
            "Underline keywords in the question before searching the passage.",
            "Find supporting evidence in the text for every answer.",
            "Do not copy unnecessary words — keep answers within five words.",
          ],
        },
        {
          type: "mistake",
          title: "Common Mistakes",
          wrong: "Choosing an answer because it repeats a word from the passage.",
          right: "Choosing an answer because its meaning matches the passage.",
        },
        {
          type: "memory-trick",
          title: "Quick Summary",
          body: "Keyword, clue sentence, meaning check. If all three match, your answer is strong.",
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
            "Restore the logical flow of a passage by choosing suitable missing sentences.",
            "Use cohesion, reference words, and connectors to check each option.",
            "Choose 6 correct sentences from 8 options.",
          ],
        },
        {
          type: "concept",
          title: "Notes",
          body:
            "In gapped text, the missing sentence must connect logically to the idea before it and the idea after it. Check the paragraph organisation as a whole, not just one gap at a time.",
          items: [
            "Cohesion: how smoothly ideas connect across sentences.",
            "Reference words: he, she, it, they, this, these, those.",
            "Connectors: however, therefore, first, then, after that, finally.",
            "Logical sequence: the order in which ideas or events happen.",
          ],
        },
        {
          type: "story",
          title: "Worked Example",
          body:
            "PASSAGE\nAmirah wanted to enter the school photography contest. First, she chose her best three photos. ______. After that, she waited eagerly for the results.\n\nOptions:\nA. Then, she submitted them to the committee before the deadline.\nB. The photos were taken during the school trip last year.\nC. Cameras have become more affordable in recent years.\nD. Her brother also enjoys taking photographs.\n\nCorrect answer: A\nExplanation: 'First' must be followed by the next step in sequence, and 'After that' continues naturally from submitting the photos.",
        },
        {
          type: "exam-tip",
          title: "Exam Tips",
          items: [
            "Read the sentence before and after every gap.",
            "Look for pronouns and reference words that point to an earlier idea.",
            "Match ideas, not just topics — the whole sentence must connect logically.",
          ],
        },
        {
          type: "mistake",
          title: "Common Mistakes",
          wrong: "Choosing a sentence just because it is about the same topic.",
          right: "Choosing the sentence that connects to the exact idea before and after the gap.",
        },
        {
          type: "memory-trick",
          title: "Quick Summary",
          body: "A missing sentence is a bridge. It must connect the idea before it and the idea after it.",
        },
      ],
    },
  ],
};
