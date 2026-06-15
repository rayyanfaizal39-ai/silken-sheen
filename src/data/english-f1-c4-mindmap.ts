import type { MindNode } from "@/components/MindMap";

export const englishF1C4MindMap: MindNode = {
  id: "root",
  label: "Writing — Story Architect",
  children: [
    {
      id: "writing-process",
      label: "Writing Process",
      children: [
        { id: "wp1", label: "1. Plan — brainstorm & organise (5 min)" },
        { id: "wp2", label: "2. Draft — write freely (25 min)" },
        { id: "wp3", label: "3. Revise — check content & completeness" },
        { id: "wp4", label: "4. Edit — fix grammar & spelling" },
        { id: "wp5", label: "5. Proofread — final read-aloud check" },
      ],
    },
    {
      id: "paragraphs",
      label: "Paragraph Structure",
      children: [
        {
          id: "teel",
          label: "TEEL Method",
          children: [
            { id: "t", label: "T — Topic Sentence (main idea)" },
            { id: "e1", label: "E — Evidence / Example" },
            { id: "e2", label: "E — Explanation (how it supports)" },
            { id: "l", label: "L — Link (to next point or topic)" },
          ],
        },
        {
          id: "linking",
          label: "Linking Words",
          children: [
            { id: "lw1", label: "Adding: Furthermore, Moreover, Also" },
            { id: "lw2", label: "Contrast: However, Although, Despite" },
            { id: "lw3", label: "Result: Therefore, Consequently, Hence" },
            { id: "lw4", label: "Example: For instance, Such as" },
            { id: "lw5", label: "Conclude: In conclusion, Overall" },
          ],
        },
      ],
    },
    {
      id: "essays",
      label: "Essay Writing",
      children: [
        {
          id: "structure",
          label: "3-Part Structure",
          children: [
            { id: "es1", label: "Introduction — hook + thesis" },
            { id: "es2", label: "Body — 2–3 paragraphs, one idea each" },
            { id: "es3", label: "Conclusion — restate + final thought" },
          ],
        },
        {
          id: "types",
          label: "Essay Types",
          children: [
            { id: "et1", label: "Narrative — tell a story (past tense)" },
            { id: "et2", label: "Descriptive — describe with senses" },
          ],
        },
        { id: "opening", label: "Strong openings: action, question, description" },
      ],
    },
    {
      id: "informal-email",
      label: "Informal Email / Letter",
      children: [
        { id: "ie1", label: "Greeting: Hi / Dear [first name]," },
        { id: "ie2", label: "Opening: friendly reference to shared experience" },
        { id: "ie3", label: "Body: casual tone, contractions OK" },
        { id: "ie4", label: "Sign-off: Your friend, / Best wishes," },
        { id: "ie5", label: "Use: I'm, don't, can't, it's" },
      ],
    },
    {
      id: "formal-letter",
      label: "Formal Letter",
      children: [
        { id: "fl1", label: "Your address (top right)" },
        { id: "fl2", label: "Date below address" },
        { id: "fl3", label: "Recipient's address (top left)" },
        { id: "fl4", label: "Salutation: Dear Sir / Dear Madam," },
        { id: "fl5", label: "RE: Subject line (bold)" },
        { id: "fl6", label: "Body: 3 paragraphs, formal language" },
        { id: "fl7", label: "Yours sincerely (know name)" },
        { id: "fl8", label: "Yours faithfully (don't know name)" },
        { id: "fl9", label: "NO contractions in formal writing" },
      ],
    },
    {
      id: "punctuation",
      label: "Punctuation",
      children: [
        { id: "pu1", label: ". Full stop — end of statement" },
        { id: "pu2", label: ", Comma — pause, list, joining" },
        { id: "pu3", label: "? Question mark — end of question" },
        { id: "pu4", label: "! Exclamation — strong emotion" },
        { id: "pu5", label: "\" \" Quotation marks — direct speech" },
        { id: "pu6", label: "' Apostrophe — contractions & possession" },
        { id: "capital", label: "Capitals: sentence start, proper nouns, I" },
      ],
    },
    {
      id: "strong-vocab",
      label: "Strong Vocabulary",
      children: [
        { id: "sv1", label: "said → exclaimed, whispered, declared" },
        { id: "sv2", label: "walked → strolled, marched, trudged" },
        { id: "sv3", label: "nice → magnificent, breathtaking" },
        { id: "sv4", label: "happy → overjoyed, thrilled, elated" },
        { id: "sv5", label: "Sensory language: sight, sound, smell, taste, touch" },
        { id: "sv6", label: "Use ONE idiom correctly for bonus marks" },
      ],
    },
  ],
};
