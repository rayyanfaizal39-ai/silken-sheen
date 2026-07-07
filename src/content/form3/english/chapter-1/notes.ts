import type { EnglishChapterData } from "@/data/english-types";

export const englishF3C1Notes: EnglishChapterData = {
  chapterTitle: "Paper 1 - Reading & Language Awareness",
  tagline:
    "Master short texts, grammar, transfer tasks, comprehension, gapped text, and writing strategies at UASA level.",
  heroEmoji: "📘",
  theme: "reading",
  learningGoals: [
    "Analyse short texts and visuals for purpose, audience, tone, attitude, and implied meaning",
    "Correct grammar errors using context, not guesswork",
    "Transfer key information accurately and within word limits",
    "Answer reading and gapped-text questions with evidence and logic",
  ],
  wordVault: [
    {
      word: "audience",
      partOfSpeech: "noun",
      meaning: "the person or group a text is written for",
      example: "The advert's audience is teenagers looking for a school event.",
    },
    {
      word: "writer's purpose",
      partOfSpeech: "noun phrase",
      meaning: "the reason a text was written",
      example: "The writer's purpose is to persuade readers to join the campaign.",
    },
    {
      word: "inference",
      partOfSpeech: "noun",
      meaning: "a conclusion based on clues, not direct statements",
      example: "You can make an inference from the tone of the review.",
    },
    {
      word: "cohesion",
      partOfSpeech: "noun",
      meaning: "the way ideas connect smoothly across a text",
      example: "Reference words and connectors create cohesion in a paragraph.",
    },
    {
      word: "register",
      partOfSpeech: "noun",
      meaning: "the level of formality used in speaking or writing",
      example: "A formal email must use the correct register.",
    },
    {
      word: "precision",
      partOfSpeech: "noun",
      meaning: "accuracy in choosing the exact right word or detail",
      example: "Information transfer needs precision and careful copying.",
    },
    {
      word: "context clue",
      partOfSpeech: "noun phrase",
      meaning: "a nearby word or detail that helps you understand meaning",
      example: "A context clue can help you identify the tone of the message.",
    },
    {
      word: "thesis statement",
      partOfSpeech: "noun phrase",
      meaning: "the main controlling idea of a piece of writing",
      example: "A strong thesis statement keeps an essay focused.",
    },
  ],
  examFacts: [
    "Paper 1 combines short texts, grammar, information transfer, comprehension, and gapped text.",
    "At UASA level, you must explain meaning from clues, not just spot obvious answers.",
    "Grammar questions are stronger when you test the sentence in context before choosing the correction.",
    "Information transfer rewards exact copying and strict word-limit control.",
    "Reading comprehension often checks inference, writer's opinion, tone, and vocabulary in context.",
    "Gapped text requires logic, cohesion, and a clear understanding of how paragraphs develop.",
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
            "Identify writer's purpose, target audience, tone, attitude, main idea, supporting details, implied meaning, and context clues.",
            "Read realistic texts such as reviews, emails, online announcements, webpages, reports, and advertisements.",
            "Use evidence from the stimulus to choose the most accurate answer.",
          ],
        },
        {
          type: "concept",
          title: "Notes",
          body:
            "Form 3 short-text questions are not only about what the text says, but why it was written and how the reader should understand it. Read the text type, look for clues, and decide whether the writer is informing, persuading, warning, inviting, or expressing an opinion.",
          items: [
            "Reviews often contain opinion words, praise, criticism, and a final judgement.",
            "Emails and messages may be informal or semi-formal, depending on the recipient.",
            "Online announcements, webpages, and reports usually include clear facts, dates, and instructions.",
            "Advertisements use persuasive language, slogans, offers, and attention-grabbing details.",
            "The correct answer is usually the one that matches both the text and the purpose behind it.",
          ],
        },
        {
          type: "table",
          title: "Text Type Clue Table",
          table: {
            headers: ["Text Type", "Common Clues", "Likely Purpose"],
            rows: [
              ["Review", "stars, opinion words, recommend, disappointing, enjoyable", "To give an opinion about a product, place, or service"],
              ["Email", "Subject:, Dear, Regards, Could you, Please", "To request, inform, or respond politely"],
              ["Online announcement", "posted, updated, open, cancelled, now available", "To inform the public of new information"],
              ["Webpage", "menu, links, headings, tabs, contact", "To give information clearly and quickly"],
              ["Report", "results, findings, survey, conclusion", "To present facts and outcomes"],
              ["Advertisement", "discount, limited offer, join now, free, call today", "To persuade readers to buy, join, or act"],
            ],
          },
        },
        {
          type: "story",
          title: "UASA Reference Examples",
          body:
            "REVIEW\nThe new study cafe is clean, quiet, and surprisingly affordable. The staff are helpful, but the food choices are limited.\nQuestion: What is the writer's attitude?\nAnswer: Mostly positive with one mild criticism.\nKeywords: clean, quiet, affordable, but limited\nExplanation: The writer praises the cafe overall but also gives a balanced drawback.\n\nADVERTISEMENT\nJoin our weekend science camp and get early-bird discounts, hands-on experiments, and a certificate of participation.\nQuestion: What is the purpose?\nAnswer: To persuade students to join.\nKeywords: Join, discounts, certificate\nExplanation: The text tries to attract readers using benefits and rewards.\n\nWEBPAGE\nSchool library will close at 4:30 p.m. today for maintenance.\nQuestion: What should readers understand?\nAnswer: The closing time and reason for the closure.\nKeywords: close at 4:30 p.m., maintenance\nExplanation: The webpage gives practical information, not opinion.",
        },
        {
          type: "exam-tip",
          title: "Exam Tips",
          items: [
            "Ask yourself: Who wrote this? For whom? Why now?",
            "Read the question word carefully. Purpose, tone, and audience are not the same thing.",
            "In visuals, compare labels and numbers before deciding on the answer.",
            "If two options seem close, choose the one with stronger proof from the text.",
          ],
        },
        {
          type: "mistake",
          title: "Common Mistakes",
          body: "Students often answer based on topic only, instead of writer's purpose or attitude.",
          wrong: "A review about a restaurant means the answer is always 'to describe a restaurant'.",
          right: "A review may describe a restaurant, but the purpose could be to recommend, criticise, or compare it.",
        },
        {
          type: "memory-trick",
          title: "Quick Summary",
          body:
            "Think P-A-T-M: Purpose, Audience, Tone, and Meaning. Use evidence before choosing the MCQ answer.",
        },
      ],
    },
    {
      title: "Part 2 - Grammar & Language Awareness",
      emoji: "✏",
      cards: [
        {
          type: "goal",
          title: "Learning Objectives",
          items: [
            "Correct grammar errors in context with confidence.",
            "Handle mixed tenses, passive voice, relative clauses, reported speech, modals, conditionals, and word forms.",
            "Check subject-verb agreement, articles, pronouns, conjunctions, and prepositions carefully.",
          ],
        },
        {
          type: "concept",
          title: "Notes",
          body:
            "Grammar at Form 3 level is tested through meaning. The correct answer must fit the sentence's time, subject, and purpose. Do not guess by looking at one word only; read the whole sentence and the sentence around it.",
          items: [
            "Use mixed tenses when a paragraph changes between past events, current facts, and future plans.",
            "Use passive voice when the action matters more than who did it, especially in reports and notices.",
            "Use relative clauses to add extra information without starting a new sentence.",
            "Reported speech often changes pronouns and time expressions, such as tomorrow to the next day.",
          ],
        },
        {
          type: "table",
          title: "Grammar Focus Checklist",
          table: {
            headers: ["Area", "What to Check", "UASA Reminder"],
            rows: [
              ["Mixed Tenses", "time words, sequence, completed vs ongoing actions", "Match the tense to the context, not to the nearest verb"],
              ["Passive Voice", "be + past participle", "Common in formal reports and announcements"],
              ["Relative Clauses", "who, which, that, where, whose", "Use the right relative word for people, things, places, or possession"],
              ["Reported Speech", "pronouns, time expressions, verb changes", "Check who is speaking and when"],
              ["Modals & Conditionals", "can, should, must, might, if", "Choose the level of certainty or advice correctly"],
              ["Word Forms", "noun, verb, adjective, adverb", "Read the sentence function before selecting the form"],
            ],
          },
        },
        {
          type: "story",
          title: "UASA Reference Examples",
          body:
            "The mural was painted by the students last week.\nExplanation: Passive voice is used because the action is more important than the doer.\n\nThe boy who won the prize is my cousin.\nExplanation: 'Who' refers to a person.\n\nIf the weather improves, the match will continue.\nExplanation: This conditional shows a possible future result.\n\nShe said that she had finished her homework.\nExplanation: Reported speech often shifts tense and pronoun.\n\nThe committee has decided to postpone the event.\nExplanation: 'Has decided' matches present perfect for a recent decision.",
        },
        {
          type: "exam-tip",
          title: "Exam Tips",
          items: [
            "Find the subject first, then the verb.",
            "Use time signals such as yesterday, already, now, and by tomorrow to guide tense choice.",
            "Ask whether the blank needs a noun, verb, adjective, or adverb.",
            "Check spelling carefully because an otherwise correct answer can still lose the mark.",
          ],
        },
        {
          type: "mistake",
          title: "Common Mistakes",
          body: "Students often choose the nearest word instead of the correct grammatical form.",
          wrong: "The team have won the trophy.",
          right: "The team has won the trophy.",
        },
        {
          type: "memory-trick",
          title: "Quick Summary",
          body:
            "Read for meaning, test the sentence, and check the grammar area. Context beats memorising one-rule answers.",
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
            "Scan quickly for names, dates, times, numbers, and labels.",
            "Interpret diagrams, charts, and tables accurately.",
            "Transfer only the essential information and follow strict word limits.",
          ],
        },
        {
          type: "concept",
          title: "Notes",
          body:
            "Information transfer is about precision. You must identify the exact detail that matches each heading in the organiser. Do not add extra words, and do not guess from general knowledge. The answer should come directly from the stimulus.",
          items: [
            "Scan for keywords instead of reading every line slowly.",
            "Use headings and labels to narrow down the correct detail.",
            "Choose essential information only; leave out description that is not needed.",
            "If the answer is in a chart or diagram, read the axis, labels, and categories first.",
          ],
        },
        {
          type: "table",
          title: "Information Transfer Checklist",
          table: {
            headers: ["Step", "What to Do", "Why It Matters"],
            rows: [
              ["1. Read the heading", "Identify the exact information needed", "Prevents irrelevant copying"],
              ["2. Scan for keywords", "Search for names, dates, numbers, or locations", "Saves time and improves accuracy"],
              ["3. Check the word limit", "Write only the required number of words", "Avoids losing marks for over-length answers"],
              ["4. Verify the match", "Make sure the answer fits the label", "Stops careless errors"],
            ],
          },
        },
        {
          type: "story",
          title: "UASA Reference Examples",
          body:
            "Passage: Students must register at the hall before 8:00 a.m. and bring their identification cards.\nQuestion: Time of registration?\nAnswer: 8:00 a.m.\nKeyword: register at the hall before 8:00 a.m.\n\nPassage: The exhibition will be held at the community centre on 12 August.\nQuestion: Venue?\nAnswer: community centre.\nKeyword: held at the community centre\n\nPassage: Participants should wear black shoes and a white shirt.\nQuestion: What should participants wear?\nAnswer: black shoes and a white shirt.\nKeyword: wear black shoes and a white shirt.",
        },
        {
          type: "exam-tip",
          title: "Exam Tips",
          items: [
            "Read the instructions first so you do not miss the word limit.",
            "Do not copy a full phrase if only one short detail is needed.",
            "When a number is asked for, check whether the answer should be a digit or a word.",
            "Review the completed organiser at the end for spelling and fit.",
          ],
        },
        {
          type: "mistake",
          title: "Common Mistakes",
          body: "A common error is copying too much information and exceeding the limit.",
          wrong: "The community centre on 12 August",
          right: "community centre",
        },
        {
          type: "memory-trick",
          title: "Quick Summary",
          body:
            "Scan, match, copy, and check. The best answer is short, exact, and fully aligned with the heading.",
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
            "Identify main ideas and supporting evidence in longer texts.",
            "Infer meaning, writer's opinion, and tone from clues in the passage.",
            "Distinguish fact from opinion and understand vocabulary in context.",
          ],
        },
        {
          type: "concept",
          title: "Notes",
          body:
            "At Form 3 level, comprehension is more than finding one line of text. You need to see how ideas develop, what the writer believes, and what the text suggests without saying directly.",
          items: [
            "Main ideas are often found in topic sentences or repeated points.",
            "Supporting evidence should come directly from the passage.",
            "Inference means using clues from more than one part of the text.",
            "Tone and attitude can be shown through adjectives, comparisons, or contrast words.",
          ],
        },
        {
          type: "table",
          title: "Comprehension Skills Table",
          table: {
            headers: ["Skill", "What It Means", "How to Spot It"],
            rows: [
              ["Main Idea", "the central message of a paragraph or text", "Look for repeated ideas or a topic sentence"],
              ["Inference", "an idea suggested by clues", "Combine two or more clues"],
              ["Fact vs Opinion", "whether a statement can be proven", "Facts are checkable; opinions show judgement"],
              ["Tone", "the writer's voice or feeling", "Check the writer's adjectives and word choice"],
              ["Vocabulary in Context", "the meaning of a word in the passage", "Read the surrounding sentence carefully"],
            ],
          },
        },
        {
          type: "story",
          title: "UASA Reference Examples",
          body:
            "Passage: Although the campsite was crowded, the writer said the trip was worthwhile because the team built stronger friendships and learned practical survival skills.\nQuestion: What is the writer's opinion?\nAnswer: The trip was worthwhile.\nKeyword: worthwhile, stronger friendships, practical survival skills\nExplanation: The writer gives a positive judgement with supporting reasons.\n\nPassage: The new device is affordable, but its battery life is disappointing.\nQuestion: What is the tone?\nAnswer: Balanced or mixed.\nKeyword: affordable, but disappointing\nExplanation: The writer gives praise and criticism in the same sentence.\n\nPassage: The volunteers worked tirelessly throughout the afternoon.\nQuestion: What does 'tirelessly' mean?\nAnswer: Without stopping or getting tired.\nKeyword: worked tirelessly\nExplanation: The surrounding sentence shows sustained effort.",
        },
        {
          type: "exam-tip",
          title: "Exam Tips",
          items: [
            "Underline evidence before answering.",
            "If asked for meaning, look for context clues instead of translating word by word.",
            "Keep answers short and directly linked to the question.",
            "Do not add outside knowledge that is not in the passage.",
          ],
        },
        {
          type: "mistake",
          title: "Common Mistakes",
          body: "Students often confuse the writer's opinion with the factual content of the passage.",
          wrong: "The text says the trip was crowded, so the opinion is crowded.",
          right: "The text says the trip was worthwhile, so that is the writer's opinion.",
        },
        {
          type: "memory-trick",
          title: "Quick Summary",
          body:
            "Find the clue, prove the answer, and stay within the word limit. Evidence always wins.",
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
            "Use cohesion and logical sequence to place sentences correctly.",
            "Track reference words, connectors, and chronological flow.",
            "Explain why a sentence fits before and after the gap.",
          ],
        },
        {
          type: "concept",
          title: "Notes",
          body:
            "Gapped text is a logic puzzle. A sentence fits only if it matches the paragraph's subject, the words around the gap, and the order of ideas. You must think about reference words, cause and effect, and the function of each paragraph.",
          items: [
            "Reference words like this, they, and it must have a clear noun to refer to.",
            "Connectors signal contrast, addition, result, or sequence.",
            "Narrative texts need time order; explanation texts need clear cause and effect.",
            "A sentence can be grammatical but still be the wrong choice if the flow breaks.",
          ],
        },
        {
          type: "table",
          title: "Gapped Text Clues",
          table: {
            headers: ["Clue", "What to Ask", "Example"],
            rows: [
              ["Reference", "What does this pronoun refer to?", "they / the students"],
              ["Connector", "Is the sentence adding, contrasting, or concluding?", "however / therefore"],
              ["Sequence", "Does the event come before or after the gap?", "first, later, finally"],
              ["Cause and effect", "Does the sentence explain a reason or result?", "because / as a result"],
            ],
          },
        },
        {
          type: "story",
          title: "UASA Reference Examples",
          body:
            "Text: Amir joined the school choir because he wanted to improve his confidence. After a few weeks, he began speaking more clearly during presentations.\nMissing sentence: 'The regular rehearsals gave him many chances to practise in front of others.'\nWhy it fits: It explains the cause of the improvement and connects to the idea of confidence.\n\nText: The museum was quiet when we arrived. ___ We walked slowly from one gallery to another.\nMissing sentence: 'This made it easier to read the information boards.'\nWhy it fits: 'This' refers to the quiet museum and links to the next action.",
        },
        {
          type: "exam-tip",
          title: "Exam Tips",
          items: [
            "Read the sentence before and after each gap before checking the options.",
            "Test reference words first; they are often the fastest clue.",
            "Re-read the whole paragraph after choosing a sentence.",
            "If a sentence gives the right topic but the wrong sequence, reject it.",
          ],
        },
        {
          type: "mistake",
          title: "Common Mistakes",
          body: "Students sometimes choose a sentence that sounds nice on its own but breaks the paragraph logic.",
          wrong: "A sentence about the conclusion placed in the middle of a process paragraph.",
          right: "A sentence that matches the paragraph's stage, topic, and flow.",
        },
        {
          type: "memory-trick",
          title: "Quick Summary",
          body:
            "Check the words before, after, and inside the sentence. Fit comes from logic, not luck.",
        },
      ],
    },
    {
      title: "Part 6 - Extended Writing",
      emoji: "📚",
      cards: [
        {
          type: "goal",
          title: "Learning Objectives",
          items: [
            "Plan, organise, and develop short and longer writing tasks clearly.",
            "Use appropriate register, paragraphing, and linking devices.",
            "Edit and proofread to improve accuracy and clarity before submitting.",
          ],
        },
        {
          type: "concept",
          title: "Notes",
          body:
            "Extended writing at Form 3 level should sound controlled and complete. Good writers plan their ideas, use a clear topic sentence, support the main idea with details, and check the final draft for grammar and spelling errors.",
          items: [
            "Planning helps you decide what to include and in what order.",
            "A topic sentence gives the paragraph a clear direction.",
            "Supporting details should explain, describe, or give examples.",
            "Formal writing needs respectful language; informal writing can be friendlier and more natural.",
          ],
        },
        {
          type: "table",
          title: "Writing Strategy Table",
          table: {
            headers: ["Stage", "What to Do", "Exam Benefit"],
            rows: [
              ["Plan", "List ideas and decide the order", "Prevents repetition"],
              ["Draft", "Write clear paragraphs with linking devices", "Improves coherence"],
              ["Expand", "Add examples and explanations", "Makes ideas more mature"],
              ["Edit", "Check tense, agreement, punctuation, and spelling", "Reduces careless mistakes"],
            ],
          },
        },
        {
          type: "story",
          title: "UASA Reference Examples",
          body:
            "Task: Write an email to a teacher about missing a class.\nGood response: use a polite greeting, explain the reason clearly, apologise, and close respectfully.\nWhy it works: The register is formal, the purpose is clear, and every required point is covered.\n\nTask: Expand notes about a school event.\nGood response: begin with a topic sentence, group related ideas into paragraphs, and end with a concluding sentence.\nWhy it works: The writing is organised, relevant, and easy to follow.",
        },
        {
          type: "exam-tip",
          title: "Exam Tips",
          items: [
            "Read all the prompts before writing so you do not miss any point.",
            "Use clear paragraphs instead of one long block of text.",
            "Choose vocabulary that matches the task and audience.",
            "Leave time for proofreading at the end.",
          ],
        },
        {
          type: "mistake",
          title: "Common Mistakes",
          body: "Students often forget to answer every bullet point or write in the wrong register.",
          wrong: "Too casual for a formal email or too stiff for a friendly reply.",
          right: "Language that matches the reader and the purpose.",
        },
        {
          type: "memory-trick",
          title: "Quick Summary",
          body:
            "Plan, paragraph, polish. Strong writing is clear, relevant, and well supported.",
        },
      ],
    },
  ],
};
