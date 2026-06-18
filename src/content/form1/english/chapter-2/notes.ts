import type { EnglishChapterData } from "@/data/english-types";

export const englishF1C2Notes: EnglishChapterData = {
  chapterTitle: "Paper 2 - Writing",
  tagline:
    "Plan clearly, write neatly, and answer the task. Paper 2 rewards structure, useful language, and relevant ideas.",
  heroEmoji: "✍️",
  theme: "writing",
  learningGoals: [
    "Write emails and messages using the correct format",
    "Plan descriptive, narrative, and factual essays",
    "Use prompts and pictures to build relevant ideas",
    "Improve vocabulary, paragraphs, and exam-ready writing style",
  ],
  wordVault: [
    {
      word: "greeting",
      partOfSpeech: "noun",
      meaning: "the opening of an email or message",
      example: "Hi Daniel, / Dear Madam,",
    },
    {
      word: "closing",
      partOfSpeech: "noun",
      meaning: "the ending phrase before your name",
      example: "Regards, / Your friend,",
    },
    {
      word: "purpose",
      partOfSpeech: "noun",
      meaning: "why you are writing",
      example: "I am writing to invite you to my birthday party.",
    },
    {
      word: "paragraph",
      partOfSpeech: "noun",
      meaning: "a group of sentences about one main idea",
      example: "Use a new paragraph for a new point.",
    },
    {
      word: "sequence",
      partOfSpeech: "noun",
      meaning: "the order of events or ideas",
      example: "First, we gathered at the school hall. Then, we boarded the bus.",
    },
    {
      word: "elaborate",
      partOfSpeech: "verb",
      meaning: "to add details or explanation",
      example: "Elaborate your point with an example.",
    },
    {
      word: "prompt",
      partOfSpeech: "noun",
      meaning: "the question, situation, picture, or notes given to guide your writing",
      example: "Read every prompt before you start writing.",
    },
    {
      word: "tone",
      partOfSpeech: "noun",
      meaning: "how formal, friendly, serious, or polite your writing sounds",
      example: "Use a polite tone in a formal email.",
    },
  ],
  examFacts: [
    "Paper 2 is writing-focused: email writing, message writing, essay writing, and guided writing.",
    "Always answer the task. A beautiful paragraph can still lose marks if it ignores the prompt.",
    "Plan before writing: purpose, points, order, useful vocabulary, and closing.",
    "Use clear paragraphs. One paragraph should focus on one main idea.",
    "Check grammar after writing: tense, subject-verb agreement, articles, punctuation, and spelling.",
    "Keep tone suitable: friendly for informal writing, polite and direct for formal writing.",
  ],
  sections: [
    {
      title: "1. Email Writing",
      emoji: "📧",
      cards: [
        {
          type: "goal",
          title: "Learning Objectives",
          items: [
            "Write informal and formal emails using the correct format.",
            "State the purpose clearly in the opening.",
            "Use suitable phrases, tone, and closing.",
          ],
        },
        {
          type: "concept",
          title: "Key Concepts",
          body:
            "An email must be clear, organised, and suitable for the reader. Informal emails are friendly. Formal emails are polite and more direct.",
        },
        {
          type: "table",
          title: "Informal vs Formal Email",
          table: {
            headers: ["Feature", "Informal Email", "Formal Email"],
            rows: [
              ["Reader", "Friend, cousin, classmate", "Teacher, principal, organiser"],
              ["Greeting", "Hi Aina, / Dear Amir,", "Dear Teacher, / Dear Sir or Madam,"],
              ["Tone", "Friendly and natural", "Polite and respectful"],
              ["Closing", "Your friend, / Bye for now,", "Regards, / Yours sincerely,"],
              ["Language", "Simple, warm, personal", "Clear, polite, no slang"],
            ],
          },
        },
        {
          type: "vocab",
          title: "Useful Phrases",
          words: [
            {
              word: "I hope you are well.",
              partOfSpeech: "opening",
              meaning: "friendly opening for an informal email",
              example: "Hi Farah, I hope you are well.",
            },
            {
              word: "I am writing to...",
              partOfSpeech: "purpose phrase",
              meaning: "formal way to state why you are writing",
              example: "I am writing to ask about the piano class.",
            },
            {
              word: "Could you please...",
              partOfSpeech: "request phrase",
              meaning: "polite way to ask for something",
              example: "Could you please send me the details?",
            },
            {
              word: "I look forward to your reply.",
              partOfSpeech: "closing phrase",
              meaning: "polite formal ending",
              example: "I look forward to your reply. Regards, Aina",
            },
          ],
        },
        {
          type: "story",
          title: "Sample Answer - Informal Email",
          body:
            "Hi Daniel,\n\nThank you for inviting me to your birthday picnic. I would love to come. I can bring sandwiches and some drinks for everyone. Please tell me what time I should arrive.\n\nSee you soon,\nAiman",
        },
        {
          type: "story",
          title: "Excellent Model Answer - Formal Email",
          body:
            "Dear Madam,\n\nI am writing to ask about the piano class advertised on the school noticeboard. I would like to know the lesson fee, class schedule, and whether beginners can join. I am free on weekends and I am very interested in learning.\n\nI look forward to your reply.\n\nRegards,\nNur Aina",
        },
        {
          type: "exam-tip",
          title: "UASA Focus",
          items: [
            "Use the reader and situation to decide formal or informal tone.",
            "Include every point requested in the question.",
            "Do not write too much unrelated information.",
            "Check greeting, purpose, details, and closing before submitting.",
          ],
        },
        {
          type: "mistake",
          title: "Common Mistake",
          wrong: "Dear Sir, Hey bro, can u tell me the price?",
          right: "Dear Sir, Could you please tell me the price?",
          items: ["Do not mix formal greeting with slang.", "Use polite phrases for formal emails."],
        },
        {
          type: "memory-trick",
          title: "Quick Summary Box",
          body:
            "Email formula: Greeting + Purpose + Details + Closing. Match your tone to the reader.",
        },
      ],
    },
    {
      title: "2. Message Writing",
      emoji: "💬",
      cards: [
        {
          type: "goal",
          title: "Learning Objectives",
          items: [
            "Write short messages for invitations, thanks, apologies, and requests.",
            "Use clear expressions and relevant details.",
            "Keep the message brief but complete.",
          ],
        },
        {
          type: "concept",
          title: "Key Concepts",
          body:
            "A message is shorter than an email. It should quickly explain the reason, give important details, and sound natural.",
        },
        {
          type: "table",
          title: "Message Types and Useful Expressions",
          table: {
            headers: ["Type", "Purpose", "Useful Expressions"],
            rows: [
              ["Invitation", "Ask someone to join an event", "Would you like to come? / Please join us"],
              ["Thank You", "Show appreciation", "Thank you for... / I really appreciate..."],
              ["Apology", "Say sorry and explain briefly", "I am sorry for... / Please forgive me"],
              ["Request", "Ask for help or permission", "Could you please...? / May I...?"],
            ],
          },
        },
        {
          type: "story",
          title: "Model Answer - Invitation",
          body:
            "Hi Sara, would you like to join our hiking trip this Saturday? We will meet at the school gate at 7.30 a.m. Please bring water and a cap. Hope you can come!",
        },
        {
          type: "story",
          title: "Model Answer - Thank You Message",
          body:
            "Dear Uncle Sam, thank you for donating storybooks to our class reading corner. We really appreciate your kindness. The books will help us improve our English.",
        },
        {
          type: "exam-tip",
          title: "UASA Focus",
          items: [
            "Make the purpose clear in the first sentence.",
            "Include key details: what, when, where, why, or what to bring.",
            "Use simple, correct sentences.",
            "End naturally: Hope you can come, Thanks again, or Please let me know.",
          ],
        },
        {
          type: "mistake",
          title: "Common Mistake",
          wrong: "Come hiking. Saturday. Bring things.",
          right: "Would you like to join our hiking trip this Saturday? Please bring water and comfortable shoes.",
          items: ["Fragments make the message unclear.", "Add enough details for the reader to act."],
        },
        {
          type: "memory-trick",
          title: "Quick Summary Box",
          body:
            "Message formula: Purpose + Key details + Friendly ending. Short does not mean incomplete.",
        },
      ],
    },
    {
      title: "3. Essay Writing",
      emoji: "📝",
      cards: [
        {
          type: "goal",
          title: "Learning Objectives",
          items: [
            "Write descriptive, narrative, and factual essays.",
            "Plan ideas before writing.",
            "Develop paragraphs with details and examples.",
            "Use a stronger vocabulary bank.",
          ],
        },
        {
          type: "concept",
          title: "Key Concepts",
          body:
            "A good essay has a clear beginning, organised body paragraphs, and a suitable ending. Each paragraph should move the writing forward.",
        },
        {
          type: "table",
          title: "Essay Types",
          table: {
            headers: ["Essay Type", "Purpose", "What to Include"],
            rows: [
              ["Descriptive", "Describe a person, place, event, or object", "senses, adjectives, details, feelings"],
              ["Narrative", "Tell a story", "characters, setting, problem, events, ending"],
              ["Factual", "Explain facts or give information", "points, examples, reasons, conclusion"],
            ],
          },
        },
        {
          type: "grammar-rule",
          title: "Paragraph Development Formula",
          formula: "Point + Explanation + Example + Link",
          items: [
            "Point: state the main idea.",
            "Explanation: explain what you mean.",
            "Example: add a real or imagined detail.",
            "Link: connect back to the topic.",
          ],
        },
        {
          type: "vocab",
          title: "Vocabulary Bank",
          words: [
            {
              word: "breathtaking",
              partOfSpeech: "adjective",
              meaning: "very beautiful or impressive",
              example: "The view from the hill was breathtaking.",
            },
            {
              word: "nervously",
              partOfSpeech: "adverb",
              meaning: "in a worried or anxious way",
              example: "I waited nervously outside the classroom.",
            },
            {
              word: "suddenly",
              partOfSpeech: "adverb",
              meaning: "quickly and unexpectedly",
              example: "Suddenly, the lights went out.",
            },
            {
              word: "as a result",
              partOfSpeech: "connector",
              meaning: "shows effect",
              example: "As a result, more students joined the campaign.",
            },
          ],
        },
        {
          type: "story",
          title: "Excellent Model Essay - Narrative Opening",
          body:
            "The sky was dark when I reached the school gate. My hands were cold, and my heart was beating fast. It was the day of the English storytelling competition, and I was the first contestant.",
        },
        {
          type: "story",
          title: "Excellent Model Essay - Factual Paragraph",
          body:
            "One way to keep our school clean is to throw rubbish into the correct bins. Students should separate paper, plastic, and food waste. This habit reduces pollution and makes the school compound more comfortable for everyone.",
        },
        {
          type: "exam-tip",
          title: "UASA Focus",
          items: [
            "Spend a few minutes planning before writing.",
            "Use past tense for stories that already happened.",
            "Use sensory details for descriptive essays.",
            "Use connectors such as firstly, besides, however, and finally.",
            "Leave time to check spelling and punctuation.",
          ],
        },
        {
          type: "mistake",
          title: "Common Mistake",
          wrong: "Writing many ideas in one long paragraph.",
          right: "Use separate paragraphs for introduction, each main point, and conclusion.",
        },
        {
          type: "memory-trick",
          title: "Quick Summary Box",
          body:
            "Essay formula: Plan, paragraph, develop, check. A clear structure helps your ideas look stronger.",
        },
      ],
    },
    {
      title: "4. Guided Writing",
      emoji: "🧭",
      cards: [
        {
          type: "goal",
          title: "Learning Objectives",
          items: [
            "Use pictures, situations, and prompts to write relevant answers.",
            "Turn notes into complete sentences.",
            "Organise guided points into a clear response.",
          ],
        },
        {
          type: "concept",
          title: "Key Concepts",
          body:
            "Guided writing gives you support, but you still need to organise the ideas. Use all important prompts and add simple details where suitable.",
        },
        {
          type: "table",
          title: "Guided Writing Types",
          table: {
            headers: ["Type", "What You Receive", "What You Should Do"],
            rows: [
              ["Picture-based writing", "Pictures or a picture sequence", "Describe actions, setting, and order"],
              ["Situational writing", "A situation and task", "Write to match the purpose and reader"],
              ["Prompt-based writing", "Notes, questions, or bullet points", "Expand each point into sentences"],
            ],
          },
        },
        {
          type: "exam-tip",
          title: "Step-by-Step Guidance",
          items: [
            "Read the task and underline the required format.",
            "Circle every prompt or picture clue.",
            "Arrange points in a logical order.",
            "Write complete sentences, not note form.",
            "Add connectors to make the writing smooth.",
          ],
        },
        {
          type: "story",
          title: "Model Answer - Picture-Based Writing",
          body:
            "Last Saturday, my classmates and I joined a gotong-royong at school. First, we picked up rubbish around the field. Then, we swept the corridors and cleaned the noticeboard. Although we were tired, we felt proud because our school looked cleaner.",
        },
        {
          type: "story",
          title: "Model Answer - Prompt-Based Writing",
          body:
            "I think students should bring their own water bottles to school. This can reduce plastic waste and save money. Besides, drinking enough water helps students stay healthy and focused during lessons.",
        },
        {
          type: "mistake",
          title: "Common Mistake",
          wrong: "Ignoring one of the given prompts.",
          right: "Use all important prompts and connect them with your own sentences.",
          items: ["Prompts are marks waiting to be used.", "Do not copy notes without forming full sentences."],
        },
        {
          type: "memory-trick",
          title: "Quick Summary Box",
          body:
            "Guided writing formula: Read task, use prompts, organise ideas, write full sentences, check relevance.",
        },
      ],
    },
    {
      title: "Cohesive Devices Bank",
      emoji: "🔗",
      cards: [
        {
          type: "goal",
          title: "Why This Bank Matters",
          body:
            "Cohesive devices help your writing flow smoothly. They connect ideas, organise paragraphs, and make emails, messages, essays, and guided writing sound more mature.",
          items: [
            "Use them to join ideas clearly.",
            "Use them to organise events and paragraphs.",
            "Use them to show cause, effect, contrast, opinion, and conclusion.",
          ],
        },
        {
          type: "vocab",
          title: "🔥 High-Scoring Words",
          body:
            "These cohesive devices can elevate student writing when used correctly in essays and emails.",
          words: [
            { word: "Furthermore", partOfSpeech: "addition", meaning: "adds a stronger related point", example: "Furthermore, it helps improve my vocabulary." },
            { word: "Moreover", partOfSpeech: "addition", meaning: "adds another important point", example: "Moreover, the activity builds confidence." },
            { word: "Nevertheless", partOfSpeech: "contrast", meaning: "shows contrast despite a previous point", example: "Nevertheless, we managed to complete the task." },
            { word: "Consequently", partOfSpeech: "effect", meaning: "shows a result", example: "Consequently, the team won the competition." },
            { word: "In contrast", partOfSpeech: "contrast", meaning: "shows a clear difference", example: "In contrast, online learning is more flexible." },
            { word: "Therefore", partOfSpeech: "effect", meaning: "shows a logical result", example: "Therefore, students should revise daily." },
            { word: "Subsequently", partOfSpeech: "sequence", meaning: "shows what happens next", example: "Subsequently, the programme began." },
            { word: "In addition", partOfSpeech: "addition", meaning: "adds another point", example: "In addition, reading improves grammar." },
            { word: "Overall", partOfSpeech: "conclusion", meaning: "sums up the whole idea", example: "Overall, the trip was meaningful." },
            { word: "In conclusion", partOfSpeech: "conclusion", meaning: "introduces the final summary", example: "In conclusion, teamwork is important for success." },
          ],
        },
        {
          type: "table",
          title: "1. Adding Ideas",
          body:
            "Meaning: Use these words to add another point or support your previous idea.",
          table: {
            headers: ["Cohesive Devices", "Example Sentence", "Common Mistake", "Exam Tip"],
            rows: [
              [
                "Furthermore, Moreover, In addition, Besides, Also, Additionally, Not only that",
                "I enjoy reading. Furthermore, it helps improve my vocabulary.",
                "Repeating 'also' too many times in one paragraph.",
                "Use stronger connectors such as furthermore or moreover in essays.",
              ],
            ],
          },
        },
        {
          type: "table",
          title: "2. Sequencing Ideas",
          body:
            "Meaning: Use these words to show the order of events, steps, or points.",
          table: {
            headers: ["Cohesive Devices", "Example Sentence", "Common Mistake", "Exam Tip"],
            rows: [
              [
                "First, Firstly, Next, Then, After that, Subsequently, Finally, Lastly",
                "First, we gathered at the hall. Then, the programme began.",
                "Using 'Finally' before the last point.",
                "Use sequencing words for narratives, guided writing, and event reports.",
              ],
            ],
          },
        },
        {
          type: "table",
          title: "3. Giving Examples",
          body:
            "Meaning: Use these words to introduce examples that support your point.",
          table: {
            headers: ["Cohesive Devices", "Example Sentence", "Common Mistake", "Exam Tip"],
            rows: [
              [
                "For example, For instance, Such as, Namely",
                "Many outdoor activities, such as hiking and camping, are popular among teenagers.",
                "Writing 'such as hiking and camping and etc.'",
                "After 'such as', give examples directly without adding 'etc.'",
              ],
            ],
          },
        },
        {
          type: "table",
          title: "4. Showing Cause",
          body:
            "Meaning: Use these words to explain why something happens.",
          table: {
            headers: ["Cohesive Devices", "Example Sentence", "Common Mistake", "Exam Tip"],
            rows: [
              [
                "Because, Since, As, Due to, Owing to",
                "The event was cancelled because of heavy rain.",
                "Writing 'Because heavy rain' as an incomplete sentence.",
                "Make sure a cause connector is linked to a complete idea.",
              ],
            ],
          },
        },
        {
          type: "table",
          title: "5. Showing Effect",
          body:
            "Meaning: Use these words to show the result of an action or situation.",
          table: {
            headers: ["Cohesive Devices", "Example Sentence", "Common Mistake", "Exam Tip"],
            rows: [
              [
                "Therefore, Thus, Hence, As a result, Consequently",
                "She studied hard. Therefore, she achieved excellent results.",
                "Using 'therefore' when there is no clear result.",
                "Use effect connectors after explaining a cause or action.",
              ],
            ],
          },
        },
        {
          type: "table",
          title: "6. Contrasting Ideas",
          body:
            "Meaning: Use these words to show difference, contrast, or an unexpected result.",
          table: {
            headers: ["Cohesive Devices", "Example Sentence", "Common Mistake", "Exam Tip"],
            rows: [
              [
                "However, Although, Even though, Nevertheless, On the other hand, In contrast",
                "The task was difficult. However, we managed to complete it.",
                "Starting a sentence with 'Although' but not completing the idea.",
                "Use contrast connectors to make essays sound more balanced and mature.",
              ],
            ],
          },
        },
        {
          type: "table",
          title: "7. Expressing Opinions",
          body:
            "Meaning: Use these phrases to introduce your view clearly.",
          table: {
            headers: ["Cohesive Devices", "Example Sentence", "Common Mistake", "Exam Tip"],
            rows: [
              [
                "In my opinion, I believe, I think, Personally, From my perspective",
                "In my opinion, students should read more books.",
                "Using too many opinion phrases in the same paragraph.",
                "Use one opinion phrase clearly, then support it with reasons and examples.",
              ],
            ],
          },
        },
        {
          type: "table",
          title: "8. Concluding Ideas",
          body:
            "Meaning: Use these words to end your writing or summarise your main point.",
          table: {
            headers: ["Cohesive Devices", "Example Sentence", "Common Mistake", "Exam Tip"],
            rows: [
              [
                "In conclusion, To conclude, In summary, To sum up, Overall",
                "In conclusion, teamwork is important for success.",
                "Adding a completely new idea in the conclusion.",
                "A conclusion should summarise, not introduce a new main point.",
              ],
            ],
          },
        },
        {
          type: "exam-tip",
          title: "Exam Booster",
          body:
            "Use cohesive devices naturally. One or two strong connectors in the right place can improve sentence flow and make your writing sound more organised.",
          items: [
            "Use addition connectors for extra points in emails and essays.",
            "Use sequencing connectors for stories and guided writing.",
            "Use contrast and effect connectors to show mature thinking.",
            "Do not overload every sentence with a connector.",
          ],
        },
      ],
    },
  ],
};
