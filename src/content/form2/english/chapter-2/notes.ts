import type { EnglishChapterData } from "@/data/english-types";

export const englishF2C2Notes: EnglishChapterData = {
  chapterTitle: "Paper 2 - Writing",
  tagline:
    "Plan clearly, write neatly, and answer the task. Paper 2 rewards structure, useful language, and relevant ideas.",
  heroEmoji: "✍️",
  theme: "writing",
  learningGoals: [
    "Reply to a short communicative message in about 70 words",
    "Expand notes into a descriptive or narrative essay in about 100 words",
    "Plan writing with clear paragraph organisation and linkers",
    "Check grammar accuracy and sentence variety before submitting",
  ],
  wordVault: [
    {
      word: "plan",
      partOfSpeech: "verb",
      meaning: "to organise ideas before writing",
      example: "Plan your points before you start Task B.",
    },
    {
      word: "linker",
      partOfSpeech: "noun",
      meaning: "a word that connects ideas smoothly",
      example: "Use linkers such as 'firstly' and 'however' to organise your points.",
    },
    {
      word: "relevant",
      partOfSpeech: "adjective",
      meaning: "directly connected to the task given",
      example: "Keep every point relevant to the notes provided.",
    },
    {
      word: "tone",
      partOfSpeech: "noun",
      meaning: "how friendly, polite, or formal the writing sounds",
      example: "Use a warm, friendly tone when replying to a friend's message.",
    },
    {
      word: "elaborate",
      partOfSpeech: "verb",
      meaning: "to add detail or explanation to a point",
      example: "Elaborate on each note instead of just copying it.",
    },
    {
      word: "conclusion",
      partOfSpeech: "noun",
      meaning: "the closing part that sums up the writing",
      example: "End your essay with a short, clear conclusion.",
    },
  ],
  examFacts: [
    "Paper 2 has two writing tasks.",
    "Task A: reply to a short communicative message in about 70 words.",
    "Task B: expand notes into a descriptive or narrative essay in about 100 words.",
    "Plan before writing: purpose, points, order, and useful vocabulary.",
    "Use linkers to connect ideas and organise paragraphs clearly.",
    "Always check grammar and spelling before finishing.",
  ],
  sections: [
    {
      title: "Task A - Reply to a Message",
      emoji: "✉️",
      cards: [
        {
          type: "goal",
          title: "Learning Objectives",
          items: [
            "Reply to a short communicative message such as a text, email, or note.",
            "Answer every point in the message.",
            "Write in about 70 words using a suitable tone.",
          ],
        },
        {
          type: "concept",
          title: "Notes",
          body:
            "Task A gives a short message, such as a text from a friend or a note from a teacher. Students reply directly, covering every point mentioned, in about 70 words. The tone should match the reader — friendly for a friend, polite for a teacher or adult.",
        },
        {
          type: "vocab",
          title: "Useful Phrases",
          words: [
            {
              word: "Thanks for your message.",
              partOfSpeech: "opening",
              meaning: "a friendly way to start a reply",
              example: "Thanks for your message. I would love to join!",
            },
            {
              word: "I am sorry to hear that.",
              partOfSpeech: "response phrase",
              meaning: "shows sympathy before giving more details",
              example: "I am sorry to hear that. I hope you feel better soon.",
            },
            {
              word: "Sure, I can...",
              partOfSpeech: "confirmation phrase",
              meaning: "agrees to a request clearly",
              example: "Sure, I can bring the drinks for the picnic.",
            },
            {
              word: "Let me know if...",
              partOfSpeech: "closing phrase",
              meaning: "invites the reader to respond further",
              example: "Let me know if you need anything else.",
            },
          ],
        },
        {
          type: "story",
          title: "Sample Answer",
          body:
            "Message: Hi! Our class is having a small farewell party for Cikgu Mai this Friday. Can you help bring some snacks and decorate the board?\n\nReply: Hi! Thanks for letting me know. I would love to help with Cikgu Mai's farewell party. I can bring some biscuits and juice for everyone. I will also help decorate the board after school on Thursday. Let me know what time we should meet. See you soon!",
        },
        {
          type: "exam-tip",
          title: "Exam Tips",
          items: [
            "Answer every point in the message — do not skip any.",
            "Keep the reply to about 70 words.",
            "Match your tone to the reader.",
            "Check grammar and spelling before finishing.",
          ],
        },
        {
          type: "mistake",
          title: "Common Mistake",
          wrong: "Sure, ok, I bring snacks.",
          right: "Sure, I can bring some snacks for the party.",
          items: ["Short, incomplete replies lose marks.", "Write full, natural sentences even for a short reply."],
        },
        {
          type: "memory-trick",
          title: "Quick Summary",
          body: "Task A formula: Greeting + Answer every point + Friendly closing. Short does not mean incomplete.",
        },
      ],
    },
    {
      title: "Task B - Guided Writing",
      emoji: "📝",
      cards: [
        {
          type: "goal",
          title: "Learning Objectives",
          items: [
            "Expand short notes into a descriptive or narrative essay.",
            "Organise ideas into clear paragraphs using linkers.",
            "Write about 100 words with relevant details and correct grammar.",
          ],
        },
        {
          type: "concept",
          title: "Notes",
          body:
            "Task B gives short notes or points. Students expand every note into full sentences, add relevant details, and organise the ideas into paragraphs. Descriptive essays describe a person, place, or event. Narrative essays tell a story with a clear order of events.",
        },
        {
          type: "grammar-rule",
          title: "Paragraph Development Formula",
          formula: "Point + Explanation + Example + Link",
          items: [
            "Point: state the main idea from the notes.",
            "Explanation: explain what the point means.",
            "Example: add a detail that brings the point to life.",
            "Link: connect smoothly to the next point using a linker.",
          ],
        },
        {
          type: "table",
          title: "Descriptive vs Narrative Writing",
          table: {
            headers: ["Type", "Purpose", "What to Include"],
            rows: [
              ["Descriptive", "Describe a person, place, or event", "senses, adjectives, feelings, clear details"],
              ["Narrative", "Tell a story in order", "characters, setting, events, a clear ending"],
            ],
          },
        },
        {
          type: "story",
          title: "Sample Answer",
          body:
            "Notes: school trip - Zoo Negara - saw elephants and tigers - learned about conservation - tired but happy\n\nEssay: Last Saturday, my class went on a trip to Zoo Negara. Firstly, we saw the elephants being fed by the keepers, which was truly amazing. Next, we visited the tiger enclosure and learned about the importance of wildlife conservation. Although we felt tired by the end of the day, everyone was happy because we learned so much about protecting animals.",
        },
        {
          type: "exam-tip",
          title: "Exam Tips",
          items: [
            "Plan before writing: turn each note into one clear point.",
            "Use linkers such as firstly, next, however, and finally.",
            "Check grammar and spelling.",
            "End with a strong, clear conclusion.",
          ],
        },
        {
          type: "mistake",
          title: "Common Mistake",
          wrong: "school trip. zoo negara. saw animals. happy.",
          right: "Last Saturday, my class went on a trip to Zoo Negara, where we saw many animals and felt very happy.",
          items: ["Notes must be expanded into full sentences.", "Do not copy the notes directly into the essay."],
        },
        {
          type: "memory-trick",
          title: "Quick Summary",
          body:
            "Task B formula: Expand every note, link paragraphs smoothly, and finish with a conclusion that wraps up the writing.",
        },
      ],
    },
  ],
};
