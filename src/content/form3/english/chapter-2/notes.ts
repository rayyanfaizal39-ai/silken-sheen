import type { EnglishChapterData } from "@/data/english-types";

export const englishF3C2Notes: EnglishChapterData = {
  chapterTitle: "Paper 2 - Writing",
  tagline:
    "Write with control, clarity, and confidence. Paper 2 rewards students who answer every task point, organise ideas well, and use the right register.",
  heroEmoji: "✍️",
  theme: "writing",
  learningGoals: [
    "Write a clear short communicative message in about 70-80 words",
    "Expand guided notes into a well-organised 100-120 word response",
    "Use appropriate tone, linking words, and accurate grammar",
    "Plan, draft, edit, and proofread before submitting",
  ],
  wordVault: [
    { word: "communicative message", partOfSpeech: "noun phrase", meaning: "a short response to a real-life situation such as a text or note", example: "Reply to the communicative message in a polite but natural tone." },
    { word: "register", partOfSpeech: "noun", meaning: "the level of formality used in writing", example: "Use an informal register when writing to a close friend." },
    { word: "elaboration", partOfSpeech: "noun", meaning: "extra detail that develops an idea", example: "Add elaboration so the paragraph sounds more complete." },
    { word: "coherent", partOfSpeech: "adjective", meaning: "clear and logically connected", example: "A coherent essay moves smoothly from one idea to the next." },
    { word: "proofread", partOfSpeech: "verb", meaning: "to check writing for errors before submitting", example: "Always proofread for spelling and grammar mistakes." },
    { word: "guiding notes", partOfSpeech: "noun phrase", meaning: "short prompts that must be expanded into full sentences", example: "Use the guiding notes to build your essay." },
    { word: "tone", partOfSpeech: "noun", meaning: "the feeling or attitude shown in writing", example: "A reply to a teacher should have a respectful tone." },
    { word: "supporting detail", partOfSpeech: "noun phrase", meaning: "an extra sentence or example that strengthens an idea", example: "Give one supporting detail for each body paragraph." },
  ],
  examFacts: [
    "Paper 2 has two tasks: a short communicative message and a guided writing task.",
    "Task A is usually about 70-80 words and must answer every bullet point.",
    "Task B is usually about 100-120 words and must expand all the notes given.",
    "Marks are easier to gain when your writing is organised, relevant, and grammatically accurate.",
    "The best answers sound natural, clear, and complete without adding too much extra information.",
    "Always save a minute or two for proofreading.",
  ],
  sections: [
    {
      title: "Part 1 - Short Communicative Message",
      emoji: "📧",
      cards: [
        {
          type: "goal",
          title: "Mission Brief",
          items: [
            "Reply to an email, message, invitation, request, apology, or congratulations note.",
            "Answer all bullet points or questions in about 70-80 words.",
            "Keep the tone informal, friendly, and suitable for the reader.",
          ],
        },
        {
          type: "concept",
          title: "What You Need to Know",
          body:
            "This task checks whether you can respond clearly to a real-life message. You do not need a long essay — just a well-written reply that answers every point and sounds natural.",
          items: [
            "Read the message carefully and highlight every point you must answer.",
            "Use informal language with a friend, but stay polite and respectful.",
            "Keep your sentences short, clear, and easy to understand.",
            "Make your reply sound complete with an opening and closing line.",
          ],
        },
        {
          type: "table",
          title: "Structure & Format",
          table: {
            headers: ["Part", "What to Include", "Example"],
            rows: [
              ["Opening", "greeting or response to the message", "Hi Aina, thanks for your message."],
              ["Body", "answer every bullet point clearly", "I can join the picnic and bring drinks."],
              ["Closing", "friendly ending", "See you on Saturday!"],
            ],
          },
        },
        {
          type: "vocab",
          title: "Useful Expressions",
          words: [
            { word: "Thanks for your message.", partOfSpeech: "opening", meaning: "a friendly way to begin a reply", example: "Thanks for your message. I am happy to help." },
            { word: "I'd love to...", partOfSpeech: "response phrase", meaning: "a warm way to agree", example: "I'd love to join your celebration." },
            { word: "I'm sorry, but...", partOfSpeech: "response phrase", meaning: "a polite way to decline", example: "I'm sorry, but I can't make it on Friday." },
            { word: "Let me know if...", partOfSpeech: "closing phrase", meaning: "a polite way to offer more help", example: "Let me know if you need anything else." },
          ],
        },
        {
          type: "story",
          title: "Model Answer - Invitation Reply",
          body:
            "Hi Mei Ling, thanks for inviting me to your birthday party. I'd love to come! I can arrive at 6.30 p.m. and I will bring a small gift for you. Please let me know if I should help with anything else. See you soon!",
        },
        {
          type: "story",
          title: "Model Answer - Apology or Request",
          body:
            "Hi Daniel, I'm sorry I missed your club meeting yesterday. I was not feeling well and had to rest at home. Please tell the rest of the group that I am sorry too. I hope I can join the next meeting. Thank you for understanding.",
        },
        {
          type: "exam-tip",
          title: "Exam Tips",
          items: [
            "Answer every bullet point directly. Do not ignore one point even if the message is short.",
            "Use simple but varied sentences so your reply sounds natural.",
            "Keep to the word limit. Long answers may become unfocused.",
            "Check your tone before you finish: friendly, polite, or apologetic.",
          ],
        },
        {
          type: "mistake",
          title: "Common Mistakes",
          wrong: "Ok. Can. Bring cake. Bye.",
          right: "Sure, I can bring a cake. See you there!",
        },
        {
          type: "memory-trick",
          title: "Quick Summary",
          body:
            "Read every bullet, reply to every point, keep the tone right, and stay near 70-80 words.",
        },
      ],
    },
    {
      title: "Part 2 - Guided Writing",
      emoji: "📝",
      cards: [
        {
          type: "goal",
          title: "Mission Brief",
          items: [
            "Expand notes into a clear 100-120 word response.",
            "Write descriptive, narrative, opinion, or informal article-style paragraphs when needed.",
            "Organise ideas with a beginning, body, and ending.",
          ],
        },
        {
          type: "concept",
          title: "What You Need to Know",
          body:
            "Guided writing is about developing the notes into full, connected ideas. Strong answers stay focused, use topic sentences, and give enough detail without going off topic.",
          items: [
            "Read the task and decide the writing type: descriptive, narrative, opinion, or informal article.",
            "Turn each note into one or more full sentences.",
            "Use linking words to show sequence, addition, cause, contrast, and result.",
            "Keep the writing controlled and relevant to the prompt.",
          ],
        },
        {
          type: "table",
          title: "Essay Structure",
          table: {
            headers: ["Paragraph", "What to Do", "Exam Goal"],
            rows: [
              ["Introduction", "Introduce the topic clearly", "Shows focus"],
              ["Body 1", "Develop the first main idea", "Adds detail"],
              ["Body 2", "Develop the second main idea", "Keeps the essay balanced"],
              ["Conclusion", "End with a final thought or opinion", "Leaves a strong finish"],
            ],
          },
        },
        {
          type: "vocab",
          title: "Planning Techniques",
          words: [
            { word: "brainstorm", partOfSpeech: "verb", meaning: "to quickly think of ideas before writing", example: "Brainstorm two or three details for each note." },
            { word: "topic sentence", partOfSpeech: "noun phrase", meaning: "the main sentence of a paragraph", example: "The topic sentence should introduce the main idea." },
            { word: "elaboration", partOfSpeech: "noun", meaning: "extra explanation that makes writing stronger", example: "Add elaboration to make the paragraph more mature." },
            { word: "conclusion", partOfSpeech: "noun", meaning: "the final part that closes the writing", example: "End with a short conclusion or personal comment." },
          ],
        },
        {
          type: "table",
          title: "Linking Words",
          table: {
            headers: ["Use", "Linkers", "Example"],
            rows: [
              ["Sequence", "first, then, after that, finally", "First, we planned the trip."],
              ["Addition", "also, furthermore, besides", "Besides, the activity was very enjoyable."],
              ["Cause and effect", "because, so, therefore", "It rained, so the event moved indoors."],
              ["Contrast", "however, although, but", "Although I was tired, I still finished the task."],
            ],
          },
        },
        {
          type: "story",
          title: "Model Answer - Descriptive Writing",
          body:
            "The school library is one of the quietest and most comfortable places in my school. Bright posters line the walls, and the shelves are filled with colourful books. Students sit quietly at long tables while the librarian helps them find the books they need. I enjoy visiting the library because it creates a peaceful atmosphere for learning and reading.",
        },
        {
          type: "story",
          title: "Model Answer - Narrative Writing",
          body:
            "Last Friday, our class took part in a clean-up campaign at the beach. At first, I was worried that the work would be tiring. However, once we began, everyone worked together happily. We collected many bags of rubbish and made the area look much cleaner. By the end of the day, I felt proud because our small effort made a real difference.",
        },
        {
          type: "exam-tip",
          title: "Exam Tips",
          items: [
            "Plan before you write so your ideas stay in order.",
            "Use all the notes given. Missing one note can lower your score.",
            "Make your paragraphs clear and balanced.",
            "Proofread at the end for tense, spelling, and punctuation.",
          ],
        },
        {
          type: "mistake",
          title: "Common Mistakes",
          wrong: "One long paragraph with no clear beginning, middle, or ending.",
          right: "Three short paragraphs with clear topic sentences and developed ideas.",
        },
        {
          type: "memory-trick",
          title: "Quick Summary",
          body:
            "Plan the task, build clear paragraphs, link ideas smoothly, and finish with a neat conclusion.",
        },
      ],
    },
  ],
};
