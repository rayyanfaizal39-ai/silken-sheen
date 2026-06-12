import type { EnglishChapterData } from "./english-types";

export const englishF1C3Notes: EnglishChapterData = {
  chapterTitle: "Reading — Unlock Every Text",
  tagline: "Reading isn't just seeing words — it's decoding meaning, feeling stories, and thinking between the lines.",
  heroEmoji: "📖",
  theme: "reading",
  learningGoals: [
    "Identify the main idea of any passage",
    "Make inferences from text evidence",
    "Skim and scan efficiently",
    "Distinguish facts from opinions",
  ],
  wordVault: [
    { word: "main idea", partOfSpeech: "noun phrase", meaning: "the most important point of a text — what the whole passage is about", example: "The main idea of the article was Malaysia's environmental challenges." },
    { word: "inference", partOfSpeech: "noun", meaning: "a conclusion drawn from clues in the text, not stated directly", example: "The author's use of dark imagery implies danger — we infer the character is afraid." },
    { word: "skim", partOfSpeech: "verb", meaning: "to read quickly to get the general idea", example: "Skim the passage first to understand what it's about." },
    { word: "scan", partOfSpeech: "verb", meaning: "to read quickly looking for specific information", example: "Scan the text to find the date of the event." },
    { word: "fact", partOfSpeech: "noun", meaning: "something that can be proven true or false", example: "Malaysia has 13 states — this is a fact." },
    { word: "opinion", partOfSpeech: "noun", meaning: "a personal belief or view — cannot be proven", example: "Nasi lemak is the best Malaysian food — this is an opinion." },
    { word: "topic sentence", partOfSpeech: "noun phrase", meaning: "the sentence that states the main idea of a paragraph (usually first)", example: "The first sentence of each paragraph is often the topic sentence." },
    { word: "supporting detail", partOfSpeech: "noun phrase", meaning: "information that explains or proves the main idea", example: "Statistics about tourist numbers are supporting details about tourism growth." },
  ],
  examFacts: [
    "The MAIN IDEA is usually in the FIRST or LAST sentence of the opening paragraph.",
    "Inference questions ask you to READ BETWEEN THE LINES — the answer is NOT directly in the text.",
    "SKIM for the general idea; SCAN for specific information like names, dates, numbers.",
    "A FACT can be proven true or false. An OPINION uses words like 'believe', 'feel', 'think', 'should'.",
    "For vocabulary questions: find the word in context, read the whole sentence, then choose the synonym that fits.",
    "For True/False questions: find the exact sentence in the passage before deciding.",
    "Never choose answers that sound good but are NOT supported by the text.",
    "In comprehension, use your own words when asked — don't copy full sentences unless asked to quote.",
  ],
  sections: [
    {
      title: "Before You Read — Pre-Reading Strategies",
      emoji: "👀",
      cards: [
        {
          type: "story",
          title: "The Detective's First Look",
          body: "A detective doesn't walk into a crime scene and immediately pick up random objects. They stand back first and survey the whole scene — observing the layout, patterns, and clues. Reading is the same. Before you dive in, take 30 seconds to look at the title, headings, images, and first/last sentences. You'll build a mental map of the text — and comprehension becomes dramatically easier.",
        },
        {
          type: "concept",
          title: "Pre-Reading: Set Your Brain Up",
          body: "Pre-reading strategies prepare your brain to receive information. Like loading a map on your GPS before starting a journey — your brain knows what 'terrain' is coming.",
          items: [
            "Read the TITLE — what topic does it suggest?",
            "Read ALL headings and subheadings — see the structure.",
            "Look at images, captions, charts — they show key content.",
            "Read the QUESTIONS first (if any) — know what to look for.",
            "Read the first and last paragraphs — usually contain main ideas.",
          ],
        },
        {
          type: "real-world",
          title: "A Malaysian Student's Pre-Reading",
          body: "Aishah gets a passage titled 'Protecting Taman Negara's Wildlife'. Before reading the body, she reads the title (topic: wildlife conservation), glances at the questions (looking for facts about endangered species), reads the first paragraph (introduces deforestation as a threat). Now her brain is primed. She reads the passage and answers 8/10 questions correctly without re-reading.",
        },
        {
          type: "exam-tip",
          title: "Read the Questions FIRST",
          body: "In comprehension exams, always read ALL the questions before reading the passage. Then as you read, your brain automatically highlights relevant sections. This turns one long read into a focused, targeted search.",
          items: [
            "Underline key words in each question.",
            "As you read, mark the paragraph where the answer might be.",
            "Use question numbers as 'section markers' in the passage.",
          ],
        },
      ],
    },
    {
      title: "The Heart of the Text — Main Idea",
      emoji: "🎯",
      cards: [
        {
          type: "concept",
          title: "Main Idea vs Topic",
          body: "These two are NOT the same! The TOPIC is the subject (what it's about). The MAIN IDEA is the POINT being made about that topic — the author's central message.",
          items: [
            "Topic: Tigers in Malaysia.",
            "Main Idea: Tiger populations in Malaysia are rapidly declining and urgent action is needed.",
            "Tip: Ask yourself — 'What is the author trying to TELL me about this topic?'",
          ],
        },
        {
          type: "grammar-rule",
          title: "The Main Idea Formula",
          formula: "Topic + What the author says about it = Main Idea",
          items: [
            "Topic: 'Social media'",
            "What author says: 'it affects teenagers' mental health negatively'",
            "Main Idea: 'Social media has a negative impact on teenagers' mental health.'",
          ],
        },
        {
          type: "table",
          title: "Finding the Main Idea — Where to Look",
          table: {
            headers: ["Location", "How Common", "Why It Works"],
            rows: [
              ["First sentence of para 1", "Very common", "Authors state the main point upfront"],
              ["Last sentence of para 1", "Common", "Used after giving background/context"],
              ["First sentence of body paragraphs", "Common", "Topic sentences introduce each idea"],
              ["Last sentence of entire passage", "Common", "Authors often summarise at the end"],
              ["Middle of the passage", "Less common", "Usually in longer academic texts"],
            ],
          },
        },
        {
          type: "mistake",
          title: "Don't Confuse Detail with Main Idea",
          body: "Supporting details PROVE the main idea — they are NOT the main idea themselves.",
          wrong: "Main idea = 'Malaysia has 127,317 square km of rainforest.' (This is a FACT/DETAIL)",
          right: "Main idea = 'Malaysia's rainforests are vital and must be protected.' (This is the POINT)",
          items: [
            "If it's a specific number, name, or example → it's a DETAIL.",
            "If it could summarise the whole passage → it's the MAIN IDEA.",
          ],
        },
        {
          type: "challenge",
          title: "Main Idea Practice",
          body: "Read this mini-passage and identify the main idea: 'Recycling is one of the most impactful habits a Malaysian student can adopt. Separating paper, plastic, and metal reduces landfill waste. It also conserves energy — recycling aluminium uses 95% less energy than producing it from raw materials. Schools that run recycling programmes report increased environmental awareness. Every item recycled is a small step toward a greener Malaysia.'",
          items: [
            "a) Aluminium recycling saves energy.",
            "b) Recycling is a highly impactful environmental habit for students.",
            "c) Schools should run recycling programmes.",
            "d) Malaysia has a landfill waste problem.",
          ],
        },
      ],
    },
    {
      title: "Reading Between the Lines — Inference",
      emoji: "🕵️",
      cards: [
        {
          type: "story",
          title: "The Clue Reader",
          body: "Imagine you walk into class and see all the desks pushed to the sides, a stack of question papers on the teacher's desk, and everyone sitting quietly with pens ready. Nobody told you there's a test — but you KNOW there's a test. That's inference: using clues to figure out something that isn't directly stated. Good readers do this on every page.",
        },
        {
          type: "concept",
          title: "What Is Inference?",
          body: "Inference is drawing a conclusion that is NOT directly written in the text. You use CLUES in the text + your own KNOWLEDGE to arrive at a reasonable conclusion.",
          items: [
            "Text says: 'She came home, threw her bag on the floor, and slammed her bedroom door.'",
            "Inference: She is angry or upset about something.",
            "The text never says 'she was angry' — you inferred it from the ACTIONS described.",
          ],
        },
        {
          type: "grammar-rule",
          title: "The Inference Formula",
          formula: "Clue in text  +  Your knowledge  =  Inference",
          items: [
            "Clue: 'The boy wiped his eyes and sniffled.'",
            "Knowledge: People wipe eyes and sniffle when crying.",
            "Inference: The boy was crying / upset.",
          ],
        },
        {
          type: "real-world",
          title: "Inference in Malaysian Contexts",
          body: "Read this: 'The family arrived at the field at 7am with tupperware containers, a mat, and small flags.' What can you infer?",
          items: [
            "Inference: They are attending an outdoor celebration (possibly Merdeka or sports day).",
            "Evidence: mat (sitting outdoors), tupperware (packed food for a long event), flags (national event).",
            "You combine clues from the text with knowledge of Malaysian culture.",
          ],
        },
        {
          type: "exam-tip",
          title: "How to Answer Inference Questions",
          body: "Inference questions often use: 'What can you conclude...?' / 'What does this suggest...?' / 'Why most likely...?' Never write 'It says in the passage...' — inference means it's NOT directly said.",
          items: [
            "Step 1: Find the relevant lines in the passage.",
            "Step 2: Identify the clue words (actions, emotions, descriptions).",
            "Step 3: Ask 'What does this suggest?' using your knowledge.",
            "Step 4: Write your answer using 'This suggests...' or 'We can infer that...'",
          ],
        },
      ],
    },
    {
      title: "Speed Reading — Skimming & Scanning",
      emoji: "⚡",
      cards: [
        {
          type: "table",
          title: "Skim vs Scan — Know the Difference",
          table: {
            headers: ["Strategy", "Purpose", "How to Do It", "When to Use"],
            rows: [
              ["SKIM", "Get the general idea of the whole text", "Read title, headings, first/last sentences of paragraphs", "Before reading a passage; in pre-reading"],
              ["SCAN", "Find specific information quickly", "Move eyes rapidly, looking for key words/numbers/names", "Answering 'who, what, when, where' questions"],
            ],
          },
        },
        {
          type: "concept",
          title: "Skimming — The Overview",
          body: "Skimming gives you the 'map' of a text in under 30 seconds. You're not reading every word — you're flying over it to spot the landscape.",
          items: [
            "Read the TITLE and any HEADINGS.",
            "Read the FIRST sentence of each paragraph (topic sentence).",
            "Read the LAST sentence of the last paragraph (conclusion).",
            "Look at any bold, italic, or underlined words.",
          ],
        },
        {
          type: "concept",
          title: "Scanning — The Search Laser",
          body: "Scanning is like using a search function. You have a specific target (a name, date, number, keyword) and you move your eyes rapidly until you SPOT it.",
          items: [
            "Decide EXACTLY what you're looking for before scanning.",
            "Move your eyes in a Z-pattern or down the middle of the page.",
            "Stop ONLY when you spot your target word or a synonym of it.",
            "Don't read the full sentence until you've found your target.",
          ],
        },
        {
          type: "memory-trick",
          title: "The Speed Reading Chant",
          body: "Use this to remember the difference:",
          items: [
            "SKIM = Get the GIST (general overview of the whole text)",
            "SCAN = Find the FACT (specific detail buried in the text)",
            "Think: a boat SKIMS the surface... a SCANNER hunts for one specific barcode.",
          ],
        },
      ],
    },
    {
      title: "True or Made Up? — Facts vs Opinions",
      emoji: "⚖️",
      cards: [
        {
          type: "concept",
          title: "Can It Be Proved?",
          body: "The key difference between a fact and an opinion is PROOF. Facts can be checked and verified. Opinions are what someone thinks or feels — they cannot be proven right or wrong.",
          items: [
            "FACT: Malaysia was granted independence on 31 August 1957.",
            "OPINION: Merdeka Day is the most meaningful Malaysian celebration.",
            "FACT: Kuala Lumpur has a population of over 1.7 million.",
            "OPINION: Kuala Lumpur is the best city to live in.",
          ],
        },
        {
          type: "table",
          title: "Opinion Signal Words",
          table: {
            headers: ["Signal Word", "Example"],
            rows: [
              ["I believe / I think", "I believe online learning is equally effective."],
              ["In my opinion", "In my opinion, students should have longer holidays."],
              ["should / must / ought to", "Schools should ban social media."],
              ["perhaps / possibly", "Perhaps stricter laws would reduce littering."],
              ["the best / the worst", "This is the best solution to the problem."],
              ["it seems / it appears", "It seems the situation is improving."],
            ],
          },
        },
        {
          type: "did-you-know",
          title: "Facts Can Be Wrong!",
          body: "Facts are statements that CAN be checked — but that doesn't mean they're always correct! 'The Earth is flat' is a FACTUAL CLAIM (it can be proven) — but it's a WRONG fact. Don't confuse 'fact' with 'truth'. Facts are provable claims. Opinions are personal beliefs.",
        },
        {
          type: "challenge",
          title: "Fact or Opinion?",
          body: "Label each statement F (fact) or O (opinion):",
          items: [
            "1. Malaysia has 329,847 km² of land area.",
            "2. Malaysian food is the most delicious in the world.",
            "3. The Petronas Twin Towers were once the tallest buildings in the world.",
            "4. Students should spend more time reading instead of playing games.",
            "5. Peninsular Malaysia is connected to Borneo by the South China Sea.",
          ],
        },
      ],
    },
    {
      title: "Answering Like a Champion — Comprehension Techniques",
      emoji: "🏆",
      cards: [
        {
          type: "table",
          title: "Types of Comprehension Questions",
          table: {
            headers: ["Question Type", "What It Asks", "Strategy"],
            rows: [
              ["Literal", "Answer is directly in the text", "Find, underline, quote accurately"],
              ["Vocabulary", "Word meaning in context", "Read the full sentence, find a synonym"],
              ["Inference", "Answer is NOT in text — use clues", "Clue + knowledge → conclusion"],
              ["Main Idea", "What is the passage mainly about?", "Summarise in 1 sentence — the author's message"],
              ["True/False", "Is this statement correct?", "Find exact evidence in text before deciding"],
            ],
          },
        },
        {
          type: "grammar-rule",
          title: "The Answer Structure Formula",
          formula: "Point  +  Evidence  +  Explanation (PEE)",
          items: [
            "Q: Why did the fishermen leave the sea?",
            "Point: The fishermen left the sea because of rough weather.",
            "Evidence: The passage states 'strong waves battered the shore.'",
            "Explanation: This shows conditions were too dangerous to fish.",
          ],
        },
        {
          type: "mistake",
          title: "The Most Common Comprehension Mistakes",
          wrong: "Copying an entire paragraph as the answer. Writing 'yes, because it says so in the passage.'",
          right: "Picking the specific relevant sentence and writing it accurately in your answer.",
          items: [
            "Never copy MORE than the question asks for.",
            "Never say 'it says in the passage' without quoting the exact words.",
            "Always use SPECIFIC evidence, not vague references.",
          ],
        },
        {
          type: "exam-tip",
          title: "Time Management in Comprehension",
          body: "In the exam, don't spend too long on one question. Use this time allocation:",
          items: [
            "Pre-reading (read questions first): 2-3 minutes.",
            "First read of passage: 5-7 minutes.",
            "Answering questions: 1-2 minutes per question.",
            "If stuck: skip, answer others, come back. A blank answer gets 0 marks — any answer gets a chance.",
          ],
        },
      ],
    },
  ],
};
