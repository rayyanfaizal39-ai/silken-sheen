import type { EnglishChapterData } from "./english-types";

export const englishF1C4Notes: EnglishChapterData = {
  chapterTitle: "Writing — Craft Your Voice",
  tagline: "Writing is thinking made visible. Master the craft and your words will outlast the page.",
  heroEmoji: "✍️",
  theme: "writing",
  learningGoals: [
    "Plan and structure any piece of writing",
    "Write well-developed paragraphs using TEEL",
    "Distinguish and write informal and formal letters",
    "Use punctuation correctly for full marks",
  ],
  wordVault: [
    { word: "purpose", partOfSpeech: "noun", meaning: "the reason you are writing — to inform, persuade, entertain, or describe", example: "The purpose of a formal letter is to inform or request." },
    { word: "audience", partOfSpeech: "noun", meaning: "who will read what you write — affects tone and vocabulary", example: "An informal letter is written for a friend (casual audience)." },
    { word: "thesis statement", partOfSpeech: "noun phrase", meaning: "the central argument or point of an essay — states your main position", example: "Thesis: 'Social media has more benefits than drawbacks for Malaysian teenagers.'" },
    { word: "TEEL", partOfSpeech: "acronym", meaning: "Topic sentence, Evidence, Explanation, Link back — a paragraph formula", example: "Use TEEL for every body paragraph in your essay." },
    { word: "tone", partOfSpeech: "noun", meaning: "the attitude and feeling in your writing", example: "Formal letters use a respectful, professional tone." },
    { word: "coherence", partOfSpeech: "noun", meaning: "logical flow and connection between ideas in writing", example: "Use linking words to ensure coherence: 'Furthermore', 'In addition', 'However'." },
    { word: "draft", partOfSpeech: "noun/verb", meaning: "an early version of a piece of writing before it is finalised", example: "Always write a draft first, then revise and edit." },
    { word: "revise", partOfSpeech: "verb", meaning: "to review and improve your writing", example: "After drafting, revise for clarity and grammar errors." },
  ],
  examFacts: [
    "Every essay needs an Introduction, 2-3 Body paragraphs, and a Conclusion.",
    "TEEL paragraph = Topic Sentence + Evidence + Explanation + Link (back to thesis).",
    "Informal letters: casual language, contractions OK, signed 'Yours truly' or 'Best wishes'.",
    "Formal letters: no contractions, respectful tone, signed 'Yours faithfully' (unknown) or 'Yours sincerely' (known name).",
    "Punctuation marks carry marks: capital letters, full stops, commas, question marks.",
    "Linking words for essays: Furthermore, In addition, However, Nevertheless, As a result.",
    "Show, don't tell: instead of 'He was happy', write 'He grinned from ear to ear.'",
    "Vary sentence length: short sentences create impact, long sentences build detail.",
  ],
  sections: [
    {
      title: "Before You Write — The Writing Process",
      emoji: "📋",
      cards: [
        {
          type: "story",
          title: "The Builder Who Never Draws Plans",
          body: "Imagine a builder who starts constructing a house without any blueprint. He builds a wall here, a room there — and ends up with crooked walls, rooms that go nowhere, and a structure that collapses. Good writing is the same: without planning, you get ideas that ramble, paragraphs that repeat, and an essay that falls apart. The best writers plan first.",
        },
        {
          type: "concept",
          title: "The 5-Stage Writing Process",
          body: "Writing is never just one step. Professional writers — and exam writers who score A — follow a process:",
          items: [
            "1. PLAN: brainstorm ideas, make an outline (spidergram or list)",
            "2. DRAFT: write your first version — get ideas down, don't stop to perfect",
            "3. REVISE: check ideas, organisation, and relevance — is it clear?",
            "4. EDIT: fix grammar, punctuation, vocabulary, and spelling",
            "5. PUBLISH/SUBMIT: final clean copy",
          ],
        },
        {
          type: "real-world",
          title: "The Exam Planning Strategy",
          body: "In an exam, you have limited time — but skipping planning actually wastes more time! Spend 5 minutes planning and save 10 minutes of rambling.",
          items: [
            "Read the question carefully — underline the key task words.",
            "Write a quick 3-column outline: Introduction idea | 3 body points | Conclusion angle.",
            "This 5-minute plan keeps you on topic for the entire essay.",
          ],
        },
        {
          type: "exam-tip",
          title: "Understand the Question First",
          body: "Many students lose marks by misreading the question. Always identify the TASK WORD and the TOPIC:",
          items: [
            "Describe = give details about what it looks/feels/sounds like.",
            "Discuss = give reasons and different perspectives.",
            "Explain = give reasons or causes clearly.",
            "Narrate = tell a story in sequence.",
          ],
        },
      ],
    },
    {
      title: "The Perfect Paragraph — TEEL",
      emoji: "🧱",
      cards: [
        {
          type: "grammar-rule",
          title: "TEEL — Your Paragraph Blueprint",
          formula: "T = Topic Sentence  |  E = Evidence  |  E = Explanation  |  L = Link",
          table: {
            headers: ["Part", "What It Does", "Example"],
            rows: [
              ["Topic (T)", "States the main point of this paragraph", "Social media improves communication for Malaysian students."],
              ["Evidence (E)", "A fact, example, or quote that supports it", "For example, platforms like WhatsApp allow group study sessions across states."],
              ["Explanation (E)", "Explain HOW the evidence proves the point", "This shows that students can learn collaboratively beyond physical boundaries."],
              ["Link (L)", "Connect back to your thesis or main argument", "Therefore, social media enhances learning opportunities for today's students."],
            ],
          },
        },
        {
          type: "real-world",
          title: "TEEL in Action — Malaysian Topic",
          body: "Question: Write an essay about the importance of protecting Malaysian rainforests.",
          items: [
            "T: Malaysia's rainforests are home to thousands of unique species that cannot be found elsewhere.",
            "E: The Malayan tiger, the proboscis monkey, and the Rafflesia flower are all found exclusively in Malaysian forests.",
            "E: If these forests are destroyed, these species face extinction — a loss that can never be recovered.",
            "L: Therefore, protecting Malaysian rainforests is not just an environmental issue, but a national responsibility.",
          ],
        },
        {
          type: "mistake",
          title: "The Weak Paragraph Trap",
          wrong: "Social media is good. It helps students. Many people use it. It is very popular.",
          right: "Social media enhances learning by enabling collaborative study. For example, students use shared WhatsApp groups to discuss homework and share notes. This collaboration improves understanding beyond what classroom time alone can offer.",
          items: [
            "Short, disconnected sentences = low marks.",
            "Each paragraph should have ONE clear point, supported and explained.",
          ],
        },
        {
          type: "challenge",
          title: "Build a TEEL Paragraph",
          body: "Topic: The benefits of reading. Write a TEEL paragraph:",
          items: [
            "T: State a benefit of reading as your topic sentence.",
            "E: Give a specific example (Malaysian context is a bonus).",
            "E: Explain HOW that example proves your point.",
            "L: Link back to the idea that reading is valuable.",
          ],
        },
      ],
    },
    {
      title: "The Complete Essay — Structure",
      emoji: "🏛️",
      cards: [
        {
          type: "concept",
          title: "The 3-Part Essay",
          body: "Every essay — narrative, expository, or argumentative — needs all three parts working together like a beginning, middle, and end of a great story.",
          items: [
            "INTRODUCTION: hook the reader, give background, state your thesis.",
            "BODY PARAGRAPHS (2-3): each one = one main point in TEEL format.",
            "CONCLUSION: summarise main points, restate thesis in new words, end with impact.",
          ],
        },
        {
          type: "grammar-rule",
          title: "Introduction Formula",
          formula: "Hook  →  Background / Context  →  Thesis Statement",
          items: [
            "HOOK: A question, surprising fact, or short scenario that grabs attention.",
            "Example: 'Every year, Malaysia loses thousands of hectares of rainforest — land that took millions of years to grow.'",
            "THESIS: Your main argument in one clear sentence.",
            "Example: 'Immediate and collective action is needed to protect Malaysia's natural heritage.'",
          ],
        },
        {
          type: "table",
          title: "Linking Words — Upgrade Your Essay",
          table: {
            headers: ["Function", "Linking Words"],
            rows: [
              ["Adding a point", "Furthermore, In addition, Moreover, Besides that"],
              ["Contrasting", "However, Nevertheless, On the other hand, Despite this"],
              ["Giving a reason", "Because, Since, As, Due to, Owing to"],
              ["Showing a result", "Therefore, As a result, Consequently, Thus, Hence"],
              ["Giving an example", "For example, For instance, Such as, In particular"],
              ["Concluding", "In conclusion, To sum up, Overall, In summary"],
            ],
          },
        },
        {
          type: "exam-tip",
          title: "Conclusion: Don't Just Repeat",
          body: "A weak conclusion just repeats the body paragraphs word for word. A strong conclusion SYNTHESISES — it shows how all the points come together to prove your thesis.",
          items: [
            "Weak: 'In conclusion, social media has benefits. It helps students. It is also popular.'",
            "Strong: 'In conclusion, while social media carries risks, its potential to enhance Malaysian students' learning and connectivity makes it an invaluable modern tool — if used with responsibility and intention.'",
          ],
        },
      ],
    },
    {
      title: "Letters — Two Very Different Worlds",
      emoji: "✉️",
      cards: [
        {
          type: "table",
          title: "Formal vs Informal — At a Glance",
          table: {
            headers: ["Feature", "Formal Letter", "Informal Letter"],
            rows: [
              ["To whom", "Managers, principals, editors, officials", "Friends, family, classmates"],
              ["Tone", "Respectful, professional, neutral", "Warm, casual, personal"],
              ["Language", "No contractions (I am, not I'm)", "Contractions OK (I'm, can't, we've)"],
              ["Greeting", "Dear Mr Tan / Dear Sir or Madam", "Dear Kai / Hey / Hi Ali"],
              ["Closing", "Yours faithfully / Yours sincerely", "Best wishes / Take care / Cheers"],
              ["Style", "No slang or idioms", "Slang and idioms are fine"],
            ],
          },
        },
        {
          type: "grammar-rule",
          title: "Formal Letter Layout",
          formula: "Your Address → Date → Recipient Address → Greeting → Body → Closing → Signature",
          items: [
            "Your address: top right (or left, depending on format).",
            "Date: below address — 12 June 2025 OR 12th June 2025.",
            "Greeting: 'Dear Sir/Madam' (unknown name) OR 'Dear Mr. Lee' (known name).",
            "Closing: 'Yours faithfully' if you wrote 'Sir/Madam'; 'Yours sincerely' if you used their name.",
          ],
        },
        {
          type: "real-world",
          title: "When Would You Write Each Type?",
          body: "Malaysian students write both in school and in real life:",
          items: [
            "FORMAL: Complaining to the school principal about canteen hygiene. Writing to the newspaper about air pollution. Applying for a scholarship.",
            "INFORMAL: Telling your cousin about your school trip to Langkawi. Inviting a friend to your Raya open house. Describing your best day to a pen pal.",
          ],
        },
        {
          type: "mistake",
          title: "Mixing Formal and Informal",
          body: "The most common error in letter writing: using the wrong register for the wrong audience.",
          wrong: "Dear Mr. Principal, I'm writing to complain about the toilet. It's super gross and smells bad. You guys should fix it ASAP.",
          right: "Dear Mr. Principal, I am writing to bring to your attention a matter of concern regarding the hygiene of the school toilets. I respectfully request that immediate steps be taken to address this issue.",
        },
      ],
    },
    {
      title: "Punctuation Power",
      emoji: "🔍",
      cards: [
        {
          type: "concept",
          title: "Punctuation = Meaning",
          body: "Punctuation is not decoration — it CREATES meaning. Change a comma, and you change what a sentence says. Read this: 'Let's eat, Grandma!' vs 'Let's eat Grandma!' Punctuation literally saved Grandma's life.",
          items: [
            "Full stop (.) → ends a statement",
            "Question mark (?) → ends a question",
            "Exclamation mark (!) → shows surprise, excitement, or strong emotion",
            "Comma (,) → separates items or clauses; shows a pause",
            "Apostrophe (') → shows possession OR contraction",
            "Quotation marks (\" \") → surrounds direct speech",
          ],
        },
        {
          type: "table",
          title: "Commas — The Most Misused Punctuation",
          table: {
            headers: ["Comma Use", "Example"],
            rows: [
              ["Listing items", "I packed a book, a pen, and my lunch."],
              ["After introductory phrase", "After school, we went to the pasar malam."],
              ["Before conjunction in compound sentence", "I wanted to study, but my brother was watching TV."],
              ["Setting off extra information", "Petronas, a Malaysian company, is world-famous."],
            ],
          },
        },
        {
          type: "grammar-rule",
          title: "Apostrophe — Two Uses Only",
          formula: "Possession: Ali's bag  |  Contraction: I'm = I am, don't = do not",
          items: [
            "POSSESSION: 'The teacher's book' = the book that belongs to the teacher.",
            "CONTRACTION: 'She's coming' = She is coming.",
            "NEVER use apostrophes to make plurals: 'three book's' is WRONG. 'Three books' is correct.",
          ],
        },
        {
          type: "mistake",
          title: "The Apostrophe Catastrophe",
          wrong: "The student's went to the library. She's bag was on the table.",
          right: "The students went to the library. Her bag was on the table.",
          items: [
            "students = plural (no apostrophe needed — just add -s).",
            "'She's bag' is wrong — 'she's' means 'she is', not possession. Use 'her bag'.",
          ],
        },
        {
          type: "did-you-know",
          title: "Punctuation in Direct Speech",
          body: "When writing what someone said, the punctuation goes INSIDE the quotation marks:",
          items: [
            "✓ \"Malaysia Boleh!\" she cheered.",
            "✓ \"Where are you going?\" asked the teacher.",
            "✓ He replied, \"I am going to the library.\"",
            "New speaker = new line in dialogue.",
          ],
        },
      ],
    },
    {
      title: "Show, Don't Tell — Writing With Power",
      emoji: "🌟",
      cards: [
        {
          type: "concept",
          title: "The Most Powerful Writing Principle",
          body: "The golden rule of creative writing: SHOW the reader what's happening through vivid details, actions, and sensory descriptions. Don't just TELL them the conclusion.",
          items: [
            "TELL: She was sad.",
            "SHOW: She stared at her plate without eating, blinking slowly, her hands wrapped tightly around her glass.",
            "TELL: The market was busy.",
            "SHOW: Vendors hollered prices, the smell of char kuey teow drifted through the crowd, and children wove between legs chasing escaped balloons.",
          ],
        },
        {
          type: "real-world",
          title: "Sensory Details — A Malaysian Scene",
          body: "Use all five senses to SHOW your reader the scene. This is the difference between a B essay and an A essay:",
          items: [
            "SIGHT: The golden domes of the mosque glittered under the midday sun.",
            "SOUND: Vendors called out in three languages, competing with the sizzle of satay.",
            "SMELL: Fragrant lemongrass and dried chilli drifted from the curry stall.",
            "TASTE: The first bite of mango with preserved lime was sour, sweet, and perfect.",
            "TOUCH: The warm, smooth wood of the old kedai kopi chair felt like history.",
          ],
        },
        {
          type: "memory-trick",
          title: "The Upgrade Formula",
          body: "Take any boring sentence and upgrade it in 3 steps:",
          items: [
            "Step 1 — BASIC: 'The river was beautiful.'",
            "Step 2 — ADD A DETAIL: 'The river sparkled under the sunlight.'",
            "Step 3 — SHOW IT: 'Sunlight fractured across the river's surface like scattered diamonds, and the sound of water over smooth stones filled the quiet afternoon.'",
          ],
        },
        {
          type: "exam-tip",
          title: "Vary Your Sentence Starters",
          body: "Markers notice when every sentence begins with 'I', 'He', or 'The'. Use different starters to show command of English:",
          items: [
            "Start with an adverb: 'Suddenly, a figure appeared at the door.'",
            "Start with a prepositional phrase: 'Under the blazing midday sun, the children played on.'",
            "Start with a participle: 'Breathing heavily, she finally reached the finish line.'",
            "Start with 'Although/Despite': 'Despite the rain, the festival continued in full spirit.'",
          ],
        },
      ],
    },
  ],
};
