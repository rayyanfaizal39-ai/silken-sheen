import type { EnglishChapterData } from "@/data/english-types";

export const englishF2C2Notes: EnglishChapterData = {
  chapterTitle: "Paper 2 - Writing",
  tagline:
    "Plan it, write it, check it. Paper 2 rewards students who answer the task clearly and organise their ideas well.",
  heroEmoji: "✍️",
  theme: "writing",
  learningGoals: [
    "Reply to a communicative message in about 70 words",
    "Expand notes into a descriptive or narrative essay of about 100 words",
    "Plan ideas before writing and organise paragraphs clearly",
    "Use linking words, accurate grammar, and varied sentences",
  ],
  wordVault: [
    {
      word: "communicative message",
      partOfSpeech: "noun phrase",
      meaning: "a short message that responds to a real-life situation, like a text or note",
      example: "Reply to the communicative message from your friend about the school trip.",
    },
    {
      word: "expand",
      partOfSpeech: "verb",
      meaning: "to turn short notes into full sentences and paragraphs",
      example: "Expand the notes into a short descriptive essay.",
    },
    {
      word: "linking word",
      partOfSpeech: "noun phrase",
      meaning: "a word that connects ideas smoothly, such as 'however' or 'then'",
      example: "Use linking words like 'first' and 'after that' to show order.",
    },
    {
      word: "sentence variety",
      partOfSpeech: "noun phrase",
      meaning: "using different sentence lengths and structures instead of repeating the same pattern",
      example: "Good sentence variety mixes short and long sentences for better flow.",
    },
    {
      word: "editing",
      partOfSpeech: "noun",
      meaning: "checking and correcting your writing after finishing a draft",
      example: "Spend the last few minutes editing for spelling and grammar.",
    },
    {
      word: "narrative essay",
      partOfSpeech: "noun phrase",
      meaning: "an essay that tells a story with characters and events",
      example: "The narrative essay described what happened on the class trip.",
    },
    {
      word: "descriptive essay",
      partOfSpeech: "noun phrase",
      meaning: "an essay that paints a picture with words about a person, place, or thing",
      example: "The descriptive essay focused on the busy morning market.",
    },
    {
      word: "outline",
      partOfSpeech: "noun",
      meaning: "a short plan listing the main points before writing",
      example: "Make a quick outline before you start Task B.",
    },
  ],
  examFacts: [
    "Paper 2 has two writing tasks: Task A (a short reply, about 70 words) and Task B (an essay, about 100 words).",
    "Task A replies to a communicative message — always match the tone and answer every point asked.",
    "Task B expands given notes into a descriptive or narrative essay — use all the notes provided.",
    "Always plan before writing: purpose, points, order, and useful vocabulary.",
    "Use clear paragraphs — one paragraph should focus on one main idea.",
    "Leave time at the end to edit: check tense, subject-verb agreement, spelling, and punctuation.",
  ],
  sections: [
    {
      title: "Task A - Reply to a Communicative Message",
      emoji: "💬",
      cards: [
        {
          type: "goal",
          title: "Learning Objectives",
          items: [
            "Reply to a message, note, or text in about 70 words.",
            "Answer every point the message asks for.",
            "Use a tone that matches the situation and the reader.",
          ],
        },
        {
          type: "concept",
          title: "Key Concepts",
          body:
            "Task A gives you a short message or situation, and you write a reply. Keep it brief, but make sure every question or request in the message is answered.",
          items: [
            "Read the message carefully and underline every point you must respond to.",
            "Use a friendly tone for a friend and a polite tone for a teacher or adult.",
            "Stay close to 70 words — do not write a full essay.",
          ],
        },
        {
          type: "table",
          title: "Task A Checklist",
          table: {
            headers: ["Step", "What to Do", "Example"],
            rows: [
              ["1. Read", "Underline every point to answer", "time, place, what to bring"],
              ["2. Plan", "List a short answer for each point", "Yes, I can come. 8 a.m. Bring snacks."],
              ["3. Write", "Combine points into full sentences", "Sure, I'll be there at 8 a.m. and bring some snacks."],
              ["4. Check", "Confirm every point is answered", "time ✓, snacks ✓, confirmation ✓"],
            ],
          },
        },
        {
          type: "vocab",
          title: "Useful Phrases",
          words: [
            {
              word: "Thanks for letting me know.",
              partOfSpeech: "opening",
              meaning: "friendly way to acknowledge a message",
              example: "Thanks for letting me know about the change of plan.",
            },
            {
              word: "Sure, I can...",
              partOfSpeech: "response phrase",
              meaning: "informal way to agree to a request",
              example: "Sure, I can bring the extra chairs.",
            },
            {
              word: "I'm sorry, but I won't be able to...",
              partOfSpeech: "response phrase",
              meaning: "polite way to decline",
              example: "I'm sorry, but I won't be able to join this time.",
            },
            {
              word: "Let me know if...",
              partOfSpeech: "closing phrase",
              meaning: "invites the reader to give more information",
              example: "Let me know if you need anything else.",
            },
          ],
        },
        {
          type: "story",
          title: "Model Answer - Reply to a Friend",
          body:
            "Message: 'Hi! We're planning a picnic this Saturday at the park. Can you come? Please let me know what you can bring.'\n\nReply: Hi Amir, thanks for inviting me! I'd love to join the picnic this Saturday. I can bring some fruit and a few bottles of water. What time should I arrive? Let me know if you need anything else. See you soon!",
        },
        {
          type: "story",
          title: "Model Answer - Reply to a Teacher",
          body:
            "Message: 'The class trip has been moved to next Friday. Please confirm if you can still attend and let me know if you have any concerns.'\n\nReply: Dear Mr. Tan, thank you for informing me about the change. I confirm that I can still attend the trip on Friday. I have no concerns about the new date. Thank you for your understanding.",
        },
        {
          type: "exam-tip",
          title: "UASA Focus",
          items: [
            "Answer every point in the message — missing one point loses marks.",
            "Keep close to the word count; do not write far more or far less than 70 words.",
            "Match your tone to the reader: casual for friends, polite for teachers or adults.",
            "End naturally with a closing phrase.",
          ],
        },
        {
          type: "mistake",
          title: "Common Mistake",
          wrong: "Ok I come. Bring food.",
          right: "Sure, I can come to the picnic and I'll bring some snacks.",
          items: ["Fragments sound incomplete.", "Always write full, grammatical sentences."],
        },
        {
          type: "memory-trick",
          title: "Quick Summary Box",
          body:
            "Task A formula: Read every point + Answer every point + Match the tone + Stay near 70 words.",
        },
      ],
    },
    {
      title: "Task B - Descriptive or Narrative Essay",
      emoji: "📚",
      cards: [
        {
          type: "goal",
          title: "Learning Objectives",
          items: [
            "Expand given notes into a descriptive or narrative essay of about 100 words.",
            "Organise ideas into clear paragraphs.",
            "Use linking words, varied sentences, and suitable vocabulary.",
          ],
        },
        {
          type: "concept",
          title: "Key Concepts",
          body:
            "Task B gives you notes, pictures, or a topic. You must expand every note into full sentences and organise them into a short, well-structured essay.",
        },
        {
          type: "table",
          title: "Essay Type Guide",
          table: {
            headers: ["Essay Type", "Purpose", "What to Include"],
            rows: [
              ["Descriptive", "Describe a person, place, or event", "senses, adjectives, feelings, details"],
              ["Narrative", "Tell a short story", "characters, setting, events in order, ending"],
            ],
          },
        },
        {
          type: "grammar-rule",
          title: "Paragraph Development Formula",
          formula: "Point + Explanation + Example + Link",
          items: [
            "Point: state the main idea of the paragraph.",
            "Explanation: explain what you mean.",
            "Example: add a specific detail from the notes.",
            "Link: connect back to the topic or move to the next idea.",
          ],
        },
        {
          type: "vocab",
          title: "Vocabulary Bank",
          words: [
            {
              word: "bustling",
              partOfSpeech: "adjective",
              meaning: "full of activity and movement",
              example: "The market was bustling with shoppers early in the morning.",
            },
            {
              word: "eventually",
              partOfSpeech: "adverb",
              meaning: "after some time has passed",
              example: "Eventually, the rain stopped and the sun came out.",
            },
            {
              word: "delighted",
              partOfSpeech: "adjective",
              meaning: "very pleased or happy",
              example: "She was delighted to receive the surprise gift.",
            },
            {
              word: "meanwhile",
              partOfSpeech: "connector",
              meaning: "shows something happening at the same time",
              example: "Meanwhile, the rest of the team prepared the decorations.",
            },
          ],
        },
        {
          type: "story",
          title: "Model Answer - Descriptive Essay (Notes: morning market, colourful stalls, noisy, friendly sellers)",
          body:
            "Every Sunday morning, the market near my house comes alive. Rows of colourful stalls sell fresh vegetables, fruits, and homemade snacks. The air is filled with the noise of sellers calling out their prices and shoppers bargaining cheerfully. Despite the crowd, the sellers always greet customers with a warm smile. I love walking through the market because it reminds me of how friendly our community is.",
        },
        {
          type: "story",
          title: "Model Answer - Narrative Essay (Notes: lost during a hike, found a map, met a ranger, reached camp safely)",
          body:
            "During our school hiking trip, I accidentally wandered away from the group and got lost in the forest. My heart was racing as I searched for a familiar path. Luckily, I found an old map pinned to a tree and used it to guide myself. Soon after, a friendly park ranger appeared and walked with me back to the trail. By evening, I finally reached the campsite safely, relieved and thankful for the ranger's help.",
        },
        {
          type: "exam-tip",
          title: "UASA Focus",
          items: [
            "Use every note given — do not leave any point out.",
            "Use past tense for narrative essays about events that already happened.",
            "Use sensory details (sight, sound, smell) for descriptive essays.",
            "Use linking words such as first, meanwhile, eventually, and in the end.",
            "Leave a minute to check spelling, punctuation, and word count.",
          ],
        },
        {
          type: "mistake",
          title: "Common Mistake",
          wrong: "Writing all the ideas in one long paragraph without any order.",
          right: "Organise the essay into a clear beginning, middle, and end, each in its own paragraph or clear section.",
        },
        {
          type: "memory-trick",
          title: "Quick Summary Box",
          body:
            "Task B formula: Use every note + Organise clearly + Add details + Check grammar. About 100 words is enough — quality matters more than length.",
        },
      ],
    },
  ],
};
