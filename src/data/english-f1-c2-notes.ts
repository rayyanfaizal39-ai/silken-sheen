import type { EnglishChapterData } from "./english-types";

export const englishF1C2Notes: EnglishChapterData = {
  chapterTitle: "Vocabulary — Word Treasure Hunt",
  tagline: "Every word you learn is a key that unlocks a new door. Collect enough keys and the whole world opens.",
  heroEmoji: "💎",
  theme: "vocabulary",
  learningGoals: [
    "Use synonyms and antonyms correctly",
    "Understand at least 10 common idioms",
    "Learn 5+ phrasal verbs in context",
    "Build vocabulary through word families",
  ],
  wordVault: [
    { word: "synonym", partOfSpeech: "noun", meaning: "a word with the same or similar meaning as another", example: "Happy and joyful are synonyms." },
    { word: "antonym", partOfSpeech: "noun", meaning: "a word with the opposite meaning", example: "Hot and cold are antonyms." },
    { word: "idiom", partOfSpeech: "noun", meaning: "a phrase whose meaning can't be understood word by word", example: "'Break a leg' means 'good luck'." },
    { word: "phrasal verb", partOfSpeech: "noun", meaning: "a verb combined with a preposition or adverb creating a new meaning", example: "'Give up' means to stop trying." },
    { word: "context", partOfSpeech: "noun", meaning: "words surrounding a word that help explain its meaning", example: "Use context clues to guess unknown words." },
    { word: "prefix", partOfSpeech: "noun", meaning: "letters added to the start of a word to change its meaning", example: "un- + happy = unhappy" },
    { word: "suffix", partOfSpeech: "noun", meaning: "letters added to the end of a word to change its function", example: "care + -ful = careful" },
    { word: "persevere", partOfSpeech: "verb", meaning: "to keep trying despite difficulties", example: "She persevered through all the challenges." },
    { word: "significant", partOfSpeech: "adjective", meaning: "important and meaningful", example: "Merdeka Day is a significant date for Malaysians." },
    { word: "contribute", partOfSpeech: "verb", meaning: "to give or add something to a shared goal", example: "Everyone can contribute to a cleaner Malaysia." },
  ],
  examFacts: [
    "Synonyms have SIMILAR meanings but are not always interchangeable — context matters.",
    "Antonyms are opposites: brave ↔ cowardly, expand ↔ contract.",
    "Idioms must be memorised — you CANNOT translate them word by word.",
    "'Give up', 'look after', 'run out of' are phrasal verbs — 2-3 words that act as one verb.",
    "Word families: care → careful → carefully → careless → carelessness.",
    "Prefixes: un- (not), dis- (opposite), re- (again), mis- (wrongly).",
    "Suffixes: -ful (full of), -less (without), -er (person who), -tion (action/state).",
    "When guessing a word's meaning, look at the sentence AROUND it for clues.",
  ],
  sections: [
    {
      title: "Same But Different — Synonyms",
      emoji: "🔀",
      cards: [
        {
          type: "story",
          title: "The Day a Word Got Bored",
          body: "Imagine using only the word 'nice' to describe everything — your food, your friends, your holiday, your school. 'Lunch was nice. The view was nice. The trip was nice.' Boring! That's why synonyms exist: to give language colour, precision, and life. The more synonyms you know, the more powerful your writing becomes.",
        },
        {
          type: "concept",
          title: "What Are Synonyms?",
          body: "Synonyms are words that share the same or a very similar meaning. Using synonyms makes your writing more varied and interesting. Remember — synonyms are not always 100% interchangeable. Context decides which fits best.",
          items: [
            "happy → joyful, pleased, content, cheerful, delighted",
            "big → large, enormous, massive, huge, vast",
            "walk → stroll, march, wander, stride, trudge",
            "said → whispered, shouted, replied, exclaimed, muttered",
          ],
        },
        {
          type: "table",
          title: "Upgrading Your Language",
          table: {
            headers: ["Basic Word", "Better Synonym", "Even Better!", "In a Sentence"],
            rows: [
              ["nice", "pleasant", "delightful", "The breeze from Taman Negara was delightful."],
              ["big", "large", "enormous", "An enormous crowd gathered for Merdeka."],
              ["walked", "strolled", "wandered", "We wandered through the pasar malam."],
              ["said", "replied", "exclaimed", "\"Luar biasa!\" she exclaimed."],
              ["good", "excellent", "outstanding", "Her essay was outstanding."],
            ],
          },
        },
        {
          type: "exam-tip",
          title: "Synonyms in Comprehension Exams",
          body: "When a question asks 'Find a word that means the same as...' — this is a synonym question! Scan the paragraph for the word, read the full sentence, and pick the synonym that fits the CONTEXT.",
          items: [
            "Q: Find a word in paragraph 2 that means 'very happy'.",
            "A: Look for 'joyful', 'thrilled', 'elated', or 'delighted' in that paragraph.",
          ],
        },
        {
          type: "challenge",
          title: "Synonym Upgrade Challenge",
          body: "Replace each word with a more interesting synonym:",
          items: [
            "The waterfall was very nice. → The waterfall was ___.",
            "He walked to the field slowly. → He ___ to the field ___.",
            "The teacher said the answer was wrong. → The teacher ___ the answer was ___.",
          ],
        },
      ],
    },
    {
      title: "Total Opposites — Antonyms",
      emoji: "↔️",
      cards: [
        {
          type: "concept",
          title: "Words That Are Enemies",
          body: "Antonyms are words with opposite meanings. Knowing antonyms doubles your vocabulary instantly — learn one word and you automatically know its opposite too.",
          items: [
            "brave ↔ cowardly | ancient ↔ modern",
            "generous ↔ stingy | expand ↔ contract",
            "victory ↔ defeat | question ↔ answer",
          ],
        },
        {
          type: "table",
          title: "Essential Antonym Pairs",
          table: {
            headers: ["Word", "Antonym", "Malaysian Example"],
            rows: [
              ["urban", "rural", "Kuala Lumpur is urban; Kelantan villages are rural."],
              ["majority", "minority", "Different groups form majorities in different Malaysian states."],
              ["ancient", "modern", "Malacca has ancient ruins beside modern buildings."],
              ["benefit", "harm", "Tourism benefits our economy but can also harm nature."],
              ["unity", "division", "Malaysian unity is stronger than division."],
              ["success", "failure", "Every failure brings you closer to success."],
            ],
          },
        },
        {
          type: "memory-trick",
          title: "The Prefix Antonym Trick",
          body: "Many antonyms are made by adding a prefix to the original word! Learn the prefix and you can create antonyms from words you already know:",
          items: [
            "happy → UNhappy | honest → DISHonest | possible → IMpossible",
            "correct → INcorrect | formal → INformal | responsible → IRresponsible",
            "Use 'un-', 'dis-', 'in-', 'im-', 'ir-' depending on the word.",
          ],
        },
        {
          type: "mistake",
          title: "Choose the Right Antonym",
          body: "Some antonyms only work in specific contexts. Use the one that matches the quality being described:",
          wrong: "The road is very narrow — the opposite is tall.",
          right: "The road is very narrow — the opposite is wide.",
          items: [
            "big ↔ small (size) | tall ↔ short (height) | heavy ↔ light (weight)",
            "Match the antonym to the exact quality being described.",
          ],
        },
      ],
    },
    {
      title: "Colourful Language — Idioms",
      emoji: "🎭",
      cards: [
        {
          type: "story",
          title: "When Words Don't Mean What They Say",
          body: "Your teacher says 'I'm all ears.' You look at her — she still has a normal head, not enormous ears. But she's not talking about her ears at all! She means: 'I'm listening carefully.' This is an idiom — a phrase where the words together mean something COMPLETELY different from their individual meanings. English is full of them, and they make the language wonderfully colourful.",
        },
        {
          type: "table",
          title: "10 Essential Idioms to Know",
          table: {
            headers: ["Idiom", "Meaning", "Example Sentence"],
            rows: [
              ["Break a leg", "Good luck!", "Break a leg at your performance tonight!"],
              ["Hit the books", "Start studying", "After dinner, I need to hit the books."],
              ["Under the weather", "Feeling unwell", "She's under the weather and stayed home."],
              ["Bite the bullet", "Do something difficult but necessary", "Just bite the bullet and apologise."],
              ["Cost an arm and a leg", "Very expensive", "The new laptop cost an arm and a leg."],
              ["In hot water", "In trouble", "He's in hot water for missing school."],
              ["Let the cat out of the bag", "Reveal a secret", "She let the cat out of the bag about the surprise party."],
              ["Once in a blue moon", "Rarely", "I eat fast food once in a blue moon."],
              ["The ball is in your court", "It's your decision", "I've made my offer — the ball is in your court."],
              ["Keep your fingers crossed", "Hope for the best", "Keep your fingers crossed for my exam results!"],
            ],
          },
        },
        {
          type: "real-world",
          title: "Idioms in Malaysian English",
          body: "Malaysian English (Manglish) has absorbed many British idioms but has also developed its own colourful expressions. Formal idioms appear in SPM comprehension passages:",
          items: [
            "'Turn over a new leaf' = change for the better (common in SPM essays)",
            "'Burning the midnight oil' = staying up late to study (very Malaysian!)",
            "'In the same boat' = in the same difficult situation",
            "Formal idioms appear in SPM reading comprehension — learn them!",
          ],
        },
        {
          type: "did-you-know",
          title: "Idioms Can't Be Translated",
          body: "If you translate 'break a leg' into Malay word by word, it becomes 'patahkan kaki' — which makes no sense! This is why idioms must be MEMORISED as a complete unit. Never translate idioms word by word.",
        },
        {
          type: "challenge",
          title: "Idiom Detective",
          body: "Match each idiom to its correct meaning:",
          items: [
            "1. Hit the books → a) get hurt  b) study  c) throw something",
            "2. Once in a blue moon → a) often  b) at night  c) rarely",
            "3. In hot water → a) in a pool  b) in trouble  c) feeling warm",
            "4. Let the cat out of the bag → a) free an animal  b) lose something  c) reveal a secret",
          ],
        },
      ],
    },
    {
      title: "Verb + Particle = New Meaning — Phrasal Verbs",
      emoji: "🔧",
      cards: [
        {
          type: "concept",
          title: "What Is a Phrasal Verb?",
          body: "A phrasal verb is a verb + a preposition or adverb (particle) that creates a COMPLETELY NEW meaning. You cannot understand a phrasal verb by looking at the individual words.",
          items: [
            "give UP ≠ give something in an upward direction",
            "give UP = stop trying / quit",
            "look AFTER ≠ look at something behind you",
            "look AFTER = take care of someone or something",
          ],
        },
        {
          type: "table",
          title: "Essential Phrasal Verbs for Form 1",
          table: {
            headers: ["Phrasal Verb", "Meaning", "Malaysian Example"],
            rows: [
              ["give up", "stop trying", "Don't give up on your SPM dreams."],
              ["look after", "take care of", "She looks after her younger siblings."],
              ["run out of", "have no more left", "We ran out of time before finishing."],
              ["find out", "discover / learn", "Did you find out the exam results?"],
              ["turn up", "arrive / appear", "She turned up late to the assembly."],
              ["set up", "arrange / establish", "They set up a study group before exam week."],
              ["put off", "postpone / delay", "Don't put off revision until the last minute."],
              ["get along", "have a good relationship", "We all get along well in our class."],
            ],
          },
        },
        {
          type: "memory-trick",
          title: "Particles Give Clues",
          body: "The particle often hints at the general sense, even when the full meaning is different:",
          items: [
            "UP often suggests completion: eat UP (finish), give UP (end), speak UP (more).",
            "OFF often suggests stopping/removing: turn OFF, put OFF (delay), take OFF (remove).",
            "OUT often suggests discovery or depletion: find OUT, run OUT, work OUT.",
          ],
        },
        {
          type: "mistake",
          title: "Phrasal Verb Word Order with Pronouns",
          body: "When the object is a pronoun, it MUST go BETWEEN the verb and particle.",
          wrong: "Please turn off it. / She gave up it.",
          right: "Please turn it off. / She gave it up.",
          items: [
            "NOUN object: 'Turn off the light' OR 'Turn the light off' — both fine.",
            "PRONOUN object: 'Turn it off' ONLY — never 'turn off it'.",
          ],
        },
      ],
    },
    {
      title: "Build More Words — Word Formation",
      emoji: "🏗️",
      cards: [
        {
          type: "concept",
          title: "The Word Family Tree",
          body: "One root word can grow into a whole family of words by adding prefixes and suffixes. Learning word families multiplies your vocabulary — master one root and you instantly know 4-5 related words.",
          items: [
            "CARE: careful, carefully, careless, carelessly, carelessness",
            "CREATE: creative, creatively, creativity, creation, creator",
            "HELP: helpful, helpfully, helpless, helplessly, helper",
          ],
        },
        {
          type: "table",
          title: "Common Prefixes",
          table: {
            headers: ["Prefix", "Meaning", "Examples"],
            rows: [
              ["un-", "not / reverse", "unhappy, unfair, unlock, unkind"],
              ["dis-", "opposite / not", "disagree, dishonest, disappear, dislike"],
              ["re-", "again", "rewrite, redo, revisit, recycle, revise"],
              ["pre-", "before", "preview, prepare, predict, prehistoric"],
              ["mis-", "wrongly", "misunderstand, misspell, misuse, mistake"],
              ["over-", "too much", "overeat, overwork, overconfident"],
            ],
          },
        },
        {
          type: "table",
          title: "Common Suffixes",
          table: {
            headers: ["Suffix", "Creates", "Examples"],
            rows: [
              ["-ful", "adjective = full of", "beautiful, careful, wonderful, thankful"],
              ["-less", "adjective = without", "careless, helpless, useless, harmless"],
              ["-tion / -sion", "noun = action or state", "education, creation, expression, decision"],
              ["-er / -or", "noun = person who does", "teacher, reader, actor, director"],
              ["-ly", "adverb = in a ... way", "quickly, beautifully, carefully, honestly"],
              ["-ness", "noun = quality/state", "happiness, sadness, kindness, darkness"],
            ],
          },
        },
        {
          type: "exam-tip",
          title: "Word Form Questions in Exam",
          body: "Some exam questions give you a root word in brackets and ask you to write the correct form. Check what part of speech is needed and apply the right suffix.",
          items: [
            "Example: The teacher spoke with great _____ (patient).",
            "Answer: patience — noun form needed (patient → patience).",
            "Tip: Read the sentence, decide what word type fits the blank, THEN change the word.",
          ],
        },
      ],
    },
    {
      title: "Smart Guessing — Context Clues",
      emoji: "🔍",
      cards: [
        {
          type: "concept",
          title: "You Don't Need a Dictionary Every Time",
          body: "In exams and in real life, you'll meet words you don't know. The good news: you don't always need a dictionary. The CONTEXT — the words around the unknown word — can tell you the meaning.",
          items: [
            "Situation clue: the overall topic suggests the meaning.",
            "Definition clue: the author explains the word in the same sentence.",
            "Synonym clue: a familiar word nearby means the same thing.",
            "Antonym clue: a contrast word helps you guess the opposite meaning.",
          ],
        },
        {
          type: "real-world",
          title: "Context Clues in Action",
          body: "Read this: 'The old fisherman was frugal — he never spent money unnecessarily and always saved his earnings carefully.' Even without knowing 'frugal', the phrase 'never spent money unnecessarily' tells you it means careful with money.",
          items: [
            "Look for clue words: 'or', 'also called', 'which means', 'that is', 'in other words'.",
            "Look for contrast: 'but', 'although', 'however', 'despite', 'yet'.",
            "Visualise the scene — what word would make sense in context?",
          ],
        },
        {
          type: "challenge",
          title: "Context Detective",
          body: "Guess the meaning of the bold word from context:",
          items: [
            "1. The child was so ravenous after school that she ate three plates of rice. (ravenous = ?)",
            "2. Despite the turbulent weather — strong winds, heavy rain — the ship sailed on. (turbulent = ?)",
            "3. He was the most diligent student; he studied every night without fail. (diligent = ?)",
          ],
        },
        {
          type: "vocab",
          title: "KSSM Must-Know Vocabulary",
          words: [
            { word: "persevere", partOfSpeech: "verb", meaning: "to keep trying despite difficulties", example: "She persevered through her studies despite many challenges." },
            { word: "significant", partOfSpeech: "adjective", meaning: "important and meaningful", example: "Merdeka Day is a significant date for all Malaysians." },
            { word: "contribute", partOfSpeech: "verb", meaning: "to give or add something to a shared goal", example: "Everyone can contribute to a cleaner Malaysia." },
            { word: "consequence", partOfSpeech: "noun", meaning: "a result or effect of an action", example: "Deforestation has severe consequences for wildlife." },
            { word: "grateful", partOfSpeech: "adjective", meaning: "feeling thankful for something received", example: "We should be grateful for our teachers' guidance." },
            { word: "emphasise", partOfSpeech: "verb", meaning: "to highlight the importance of something", example: "Teachers emphasise the importance of punctuality." },
          ],
        },
      ],
    },
  ],
};
