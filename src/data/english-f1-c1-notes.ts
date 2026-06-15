import type { EnglishChapterData } from "./english-types";

export const englishF1C1Notes: EnglishChapterData = {
  chapterTitle: "Grammar — Word Wizardry",
  tagline: "Every sentence is a tiny universe. Words are its stars — and today you learn to control them.",
  heroEmoji: "🪄",
  theme: "grammar",
  learningGoals: [
    "Name all 4 types of nouns",
    "Use pronouns correctly",
    "Master the 3 tenses",
    "Build correct sentences",
  ],
  wordVault: [
    { word: "noun", partOfSpeech: "noun", meaning: "a naming word for person, place, thing, or idea", example: "The teacher entered the class." },
    { word: "pronoun", partOfSpeech: "noun", meaning: "replaces a noun to avoid repetition", example: "Ali forgot his bag. He had to go back." },
    { word: "verb", partOfSpeech: "noun", meaning: "action or state-of-being word", example: "She runs to school every day." },
    { word: "adjective", partOfSpeech: "noun", meaning: "describes a noun", example: "The golden dome glittered in the sun." },
    { word: "adverb", partOfSpeech: "noun", meaning: "describes a verb, adjective, or adverb", example: "He spoke softly to the class." },
    { word: "preposition", partOfSpeech: "noun", meaning: "shows place, direction, or time", example: "The cat sat under the table." },
    { word: "conjunction", partOfSpeech: "noun", meaning: "joins words or sentences", example: "I studied hard but I was still nervous." },
    { word: "tense", partOfSpeech: "noun", meaning: "tells WHEN an action happens", example: "She walks (present), walked (past), will walk (future)." },
    { word: "subject", partOfSpeech: "noun", meaning: "who or what the sentence is about", example: "ALI kicks the ball." },
    { word: "object", partOfSpeech: "noun", meaning: "receives the action of the verb", example: "Ali kicks THE BALL." },
  ],
  examFacts: [
    "Proper nouns are ALWAYS capitalised: Ali, Malaysia, Monday, Hari Raya.",
    "He / She / It → add '-s' or '-es' to the verb (She EATS, He WATCHES).",
    "Simple Past: regular verbs add '-ed' (walked); irregular must be memorised (went, ate, saw).",
    "Simple Future formula: Subject + WILL + base verb.",
    "Adjective describes NOUNS. Adverb describes VERBS. (good vs well)",
    "AT + specific time | ON + day/date | IN + month/year.",
    "FANBOYS = For, And, Nor, But, Or, Yet, So.",
    "Every complete sentence needs a Subject and a Verb.",
  ],
  sections: [
    {
      title: "The Name Collectors — Nouns",
      emoji: "🏷️",
      cards: [
        {
          type: "story",
          title: "A World Full of Names",
          body: "Imagine waking up one morning and everything around you had lost its name. The thing you eat with? Unknown. The place you go to study? Nameless. Without nouns, we can't describe the world. Nouns are the labels we put on EVERYTHING — they're the foundation of language.",
        },
        {
          type: "concept",
          title: "What Is a Noun?",
          body: "A noun is a NAMING word. It names a person, place, animal, thing, or idea. Every sentence has at least one noun — it's the 'who' or 'what' the sentence is talking about.",
          items: [
            "Person → teacher, doctor, Ali, Siti",
            "Place → school, Malaysia, Kuala Lumpur, market",
            "Thing → pencil, phone, nasi lemak, book",
            "Idea/Feeling → happiness, bravery, freedom, love",
          ],
        },
        {
          type: "table",
          title: "The 4 Types of Nouns",
          table: {
            headers: ["Type", "Definition", "Malaysian Examples"],
            rows: [
              ["Common", "General names — not specific", "teacher, city, river, school"],
              ["Proper", "Specific names — ALWAYS capitalised", "Ali, Putrajaya, Monday, Deepavali"],
              ["Collective", "Names a GROUP of things", "a class of students, a team, a flock"],
              ["Abstract", "Can't be seen or touched — only felt", "happiness, bravery, unity, patriotism"],
            ],
          },
        },
        {
          type: "mistake",
          title: "The Capital Letter Rule",
          body: "Proper nouns ALWAYS start with a capital letter — no exceptions.",
          wrong: "I visited kuala lumpur with my friend ali last saturday.",
          right: "I visited Kuala Lumpur with my friend Ali last Saturday.",
        },
        {
          type: "did-you-know",
          title: "Abstract Nouns Are All Around You",
          body: "You can't take a photo of 'courage' or hold 'kindness' in your hand — but they're some of the most powerful nouns in English. When you write 'Malaysia's unity is our strength', both 'unity' and 'strength' are abstract nouns that make the sentence meaningful.",
        },
      ],
    },
    {
      title: "The Substitutes — Pronouns",
      emoji: "🔄",
      cards: [
        {
          type: "concept",
          title: "Why Do We Need Pronouns?",
          body: "Without pronouns, every sentence would repeat the same noun over and over:",
          items: [
            "❌ Ali went to school. Ali forgot Ali's bag. Ali went back for Ali's bag.",
            "✓ Ali went to school. He forgot his bag. He went back for it.",
            "Pronouns make language smooth, natural, and easy to read.",
          ],
        },
        {
          type: "table",
          title: "Subject vs Object Pronouns",
          table: {
            headers: ["Person", "Subject (does the action)", "Object (receives the action)"],
            rows: [
              ["1st singular", "I", "me"],
              ["2nd singular", "You", "you"],
              ["3rd singular ♂", "He", "him"],
              ["3rd singular ♀", "She", "her"],
              ["3rd singular (thing)", "It", "it"],
              ["1st plural", "We", "us"],
              ["3rd plural", "They", "them"],
            ],
          },
        },
        {
          type: "memory-trick",
          title: "He or Him? The Quick Test",
          body: "Unsure whether to write 'he' or 'him'? Cover the other name and read the sentence alone. 'He called me' sounds right. 'Him called me' sounds wrong. That's your answer — always trust how it sounds.",
          items: [
            "Subject = does the action → use I / he / she / they",
            "Object = receives the action → use me / him / her / them",
          ],
        },
        {
          type: "real-world",
          title: "A Malaysian Classroom Conversation",
          body: "Siti is my classmate. She sits beside me every day. I help her with Maths and she helps me with English. We study together after school. Our teacher loves us both.",
          items: [
            "Siti → She (subject pronoun, 3rd person singular female)",
            "me → object pronoun (receives the action 'help')",
            "We → subject pronoun (1st person plural)",
          ],
        },
      ],
    },
    {
      title: "The Action Heroes — Verbs & Tenses",
      emoji: "⚡",
      cards: [
        {
          type: "concept",
          title: "Without Verbs, Nothing Happens",
          body: "A verb is the engine of every sentence. Without it, nothing moves, nothing exists, nothing happens. There are two main types:",
          items: [
            "ACTION verbs: run, jump, eat, study, cook, sing, kick",
            "STATE verbs: is, are, was, were, seem, feel, have, know",
          ],
        },
        {
          type: "grammar-rule",
          title: "The 3 Main Tenses",
          formula: "Present: base verb / verb+s  |  Past: verb+ed or irregular  |  Future: will + base",
          table: {
            headers: ["Tense", "When", "Example"],
            rows: [
              ["Simple Present", "Habits, facts, routines", "She eats roti canai every morning."],
              ["Simple Past", "Completed actions", "They visited Petronas Twin Towers yesterday."],
              ["Simple Future", "Plans, intentions", "We will celebrate Merdeka next week."],
            ],
          },
        },
        {
          type: "grammar-rule",
          title: "Subject-Verb Agreement",
          formula: "He / She / It + verb-s or verb-es",
          items: [
            "She RUNS to school. ✓  (not 'She run')",
            "He WATCHES football. ✓  (not 'He watch')",
            "I / You / We / They + base verb: They RUN, We WATCH.",
          ],
        },
        {
          type: "vocab",
          title: "Irregular Past Tenses You Must Know",
          words: [
            { word: "go → went", partOfSpeech: "irregular", meaning: "past of 'go'", example: "She went to the pasar malam." },
            { word: "eat → ate", partOfSpeech: "irregular", meaning: "past of 'eat'", example: "We ate nasi lemak this morning." },
            { word: "see → saw", partOfSpeech: "irregular", meaning: "past of 'see'", example: "I saw a hornbill at the park." },
            { word: "buy → bought", partOfSpeech: "irregular", meaning: "past of 'buy'", example: "She bought a new baju kurung." },
            { word: "write → wrote", partOfSpeech: "irregular", meaning: "past of 'write'", example: "He wrote a letter to his teacher." },
            { word: "take → took", partOfSpeech: "irregular", meaning: "past of 'take'", example: "They took the LRT to KLCC." },
          ],
        },
        {
          type: "mistake",
          title: "The Most Common Verb Mistakes",
          wrong: "She don't like durian because it smell too strong.",
          right: "She doesn't like durian because it smells too strong.",
          items: [
            "She/He/It + DOESN'T (not 'don't')",
            "She/He/It + verb-s: it SMELLS (not 'smell')",
          ],
        },
      ],
    },
    {
      title: "Paint Your Words — Adjectives & Adverbs",
      emoji: "🎨",
      cards: [
        {
          type: "concept",
          title: "Adjectives vs Adverbs — The Difference",
          body: "These two word types are often confused. Here's the key difference:",
          items: [
            "ADJECTIVE = describes a NOUN → The BEAUTIFUL flower. The TALL building.",
            "ADVERB = describes a VERB (or adjective/adverb) → She sings BEAUTIFULLY. He ran QUICKLY.",
            "Most adjectives become adverbs by adding '-ly': beautiful → beautifully, quick → quickly.",
          ],
        },
        {
          type: "table",
          title: "Adjective Types (with Malaysian Flair)",
          table: {
            headers: ["Type", "Examples", "Used In a Sentence"],
            rows: [
              ["Size", "big, small, enormous, tiny", "The MASSIVE Petronas Twin Towers dominated the skyline."],
              ["Colour", "golden, deep, bright, dark", "The GOLDEN domes of Putrajaya shone at sunset."],
              ["Feeling / Quality", "delicious, vibrant, peaceful, busy", "The VIBRANT streets of Chow Kit were full of life."],
              ["Number", "three, many, several, few", "There were MANY stalls at the Hari Raya bazaar."],
            ],
          },
        },
        {
          type: "mistake",
          title: "good vs well — The Classic Trap",
          body: "'Good' is an adjective (describes nouns). 'Well' is an adverb (describes how you do something).",
          wrong: "She sings good. He plays football good.",
          right: "She sings well. He plays football well.",
        },
        {
          type: "memory-trick",
          title: "The '-ly' Shortcut",
          body: "Most adverbs end in '-ly'. If you see a word ending in '-ly', it's probably an adverb! But watch out for the exceptions:",
          items: [
            "quick → quickly ✓ | beautiful → beautifully ✓",
            "happy → happily (y becomes i) ✓",
            "EXCEPTIONS: 'fast' is both adjective AND adverb. 'hard' is both. 'good' ≠ 'well'.",
          ],
        },
      ],
    },
    {
      title: "The Connectors — Prepositions & Conjunctions",
      emoji: "🔗",
      cards: [
        {
          type: "grammar-rule",
          title: "AT / ON / IN — The Time Prepositions",
          formula: "AT + time  |  ON + day/date  |  IN + month/year/season",
          items: [
            "AT 7.30 a.m. | AT noon | AT midnight (specific clock time)",
            "ON Monday | ON 31 August | ON my birthday (specific day/date)",
            "IN January | IN 2025 | IN the morning | IN winter (longer periods)",
          ],
        },
        {
          type: "table",
          title: "Prepositions of Place",
          table: {
            headers: ["Preposition", "Meaning", "Example"],
            rows: [
              ["in", "inside something", "The cat is IN the box."],
              ["on", "on a surface", "The book is ON the table."],
              ["under", "below something", "She hid UNDER her blanket."],
              ["beside / next to", "at the side of", "Ali sat BESIDE Siti."],
              ["between", "in the middle of two", "The library is BETWEEN the canteen and the lab."],
            ],
          },
        },
        {
          type: "memory-trick",
          title: "FANBOYS — Never Forget Your Conjunctions",
          formula: "For  ·  And  ·  Nor  ·  But  ·  Or  ·  Yet  ·  So",
          items: [
            "FOR = reason: I studied hard, FOR I wanted to pass.",
            "AND = addition: I love roti canai AND teh tarik.",
            "BUT = contrast: She tried hard BUT didn't score.",
            "OR = choice: Tea OR coffee?",
            "SO = result: It rained, SO the match was cancelled.",
          ],
        },
        {
          type: "challenge",
          title: "Conjunction Challenge",
          body: "Fill in the blank with the correct conjunction (and, but, because, so, or):",
          items: [
            "I was tired ___ I went to sleep early.",
            "Do you want noodles ___ rice?",
            "She studied hard ___ she failed the test.",
            "I like maths ___ I find it challenging.",
          ],
        },
      ],
    },
    {
      title: "Build It Right — Sentence Structure",
      emoji: "🏗️",
      cards: [
        {
          type: "grammar-rule",
          title: "The Golden Formula",
          formula: "SUBJECT  +  VERB  +  OBJECT",
          items: [
            "Ali (S) + kicks (V) + the ball (O) ✓",
            "Siti (S) + eats (V) + nasi lemak (O) ✓",
            "The students (S) + love (V) + their teacher (O) ✓",
          ],
        },
        {
          type: "table",
          title: "4 Types of Sentences",
          table: {
            headers: ["Type", "Purpose", "Malaysian Example"],
            rows: [
              ["Statement", "States a fact or idea", "Malaysia is a multi-racial country."],
              ["Question", "Asks for information", "Have you tried laksa before?"],
              ["Command", "Gives an instruction", "Please be quiet during the assembly."],
              ["Exclamation", "Shows strong emotion", "What a spectacular fireworks display!"],
            ],
          },
        },
        {
          type: "mistake",
          title: "Fragment vs Complete Sentence",
          wrong: "Running very fast to school. Because she was late.",
          right: "She was running very fast to school because she was late.",
          items: [
            "A FRAGMENT is missing a subject or verb — it's not a complete thought.",
            "Every sentence MUST have both a subject and a verb.",
          ],
        },
        {
          type: "exam-tip",
          title: "Punctuation = Marks",
          body: "Every sentence starts with a CAPITAL LETTER. Statements end with a FULL STOP. Questions end with a QUESTION MARK. Exclamations end with an EXCLAMATION MARK. Missing these = lost marks.",
          items: [
            "✓ Malaysia is a beautiful country.",
            "✓ Where are you going?",
            "✓ What a wonderful day!",
          ],
        },
      ],
    },
  ],
};
