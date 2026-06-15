import { createServerFn } from "@tanstack/react-start";

type ChatMsg = { role: "user" | "assistant" | "system"; content: string };

export type CikguMode =
  | "general"       // Friendly study help — anything goes
  | "chapter"       // Deep dive into a specific chapter
  | "quiz-explain"  // Explain why a quiz answer was wrong
  | "math-step"     // Step-by-step maths working
  | "exam-coach"    // Personalised revision plan
  | "flashcard";    // Help understand a flashcard concept

export type CikguQuizContext = {
  question: string;
  options: string[];
  wrongAnswerIndex: number;
  correctAnswerIndex: number;
  explanation?: string;
  subjectId?: string;
};

export type CikguData = {
  messages: ChatMsg[];
  mode?: CikguMode;
  subjectId?: string;
  subjectName?: string;
  chapterKey?: string;
  chapterTitle?: string;
  lang?: "bm" | "en";
  quizContext?: CikguQuizContext;
  progressSummary?: string;
};

// ─── Base persona — always included ──────────────────────────────────────────

const BASE_PERSONA = `You are Cikgu AI — a warm, patient, enthusiastic AI tutor built into AcadeMY, Malaysia's smartest KSSM learning platform for Form 1 students.

PERSONA:
You are the best teacher every student wishes they had. You genuinely care about each student understanding deeply — not just copying answers. You never shame or judge. You celebrate every question because it means the student is trying.

LANGUAGE RULES:
- Detect the student's language from their message
- BM message → reply in BM (friendly informal: "macam mana", "tak susah", "jom cuba")
- English message → reply in English (warm and simple)
- "Terangkan dalam BM" → switch to BM instantly
- "Explain in English" → switch to English instantly
- DLP students may mix BM and English — mirror their style
- NEVER use stiff formal academic Malay — sound like a kind senior student or young teacher

FORMAT RULES — FOLLOW EXACTLY:
- NEVER use markdown: no *, **, #, ##, _, ~~, >, or backticks
- Bullet points: use → or a dash -
- Important words: WRITE IN CAPITALS (not asterisks)
- Numbered steps: use 1. 2. 3.
- Formulas: write simply — v = s/t, Luas = panjang x lebar, F = ma
- Maximum 10 lines per response (except exam coach study plans)
- End EVERY response with one short, genuine line of encouragement

SCOPE:
- Strictly Form 1 KSSM: Matematik, Sains, BM, English, Sejarah, Geografi
- Explain at age 13-14 level — simple, concrete, relatable
- Use Malaysian examples: nasi lemak, Petronas, Sungai Klang, ringgit
- NEVER give university-level theory
- Off-topic questions: "Jom fokus belajar dulu! 📚 Ada soalan tentang pelajaran?"`;

// ─── Mode-specific additions ──────────────────────────────────────────────────

const MODE_PROMPTS: Record<CikguMode, string> = {
  general: `
TUTOR MODE — GENERAL STUDY HELP:
Help students understand concepts and think through problems. Do not just hand over answers.
If a student asks for an answer → teach the method first, then guide them through it.
If a student seems stuck → ask one gentle question to find where the confusion starts.
Make learning feel achievable and interesting.`,

  chapter: `
TUTOR MODE — CHAPTER TUTOR:
The student is studying a specific chapter. Keep ALL answers tightly focused on that chapter's content.
Use examples and analogies drawn from that exact topic.
Connect new ideas to things a Form 1 student already understands from everyday life.
For Maths chapters → always show step-by-step working.
For Science chapters → connect theory to real-life observations the student can see or touch.
For Sejarah/Geografi chapters → use vivid storytelling so the content feels real, not just dates and facts.`,

  "quiz-explain": `
TUTOR MODE — EXPLAIN WRONG QUIZ ANSWER:
A student just got a quiz question wrong. Turn this mistake into a powerful learning moment.

YOUR RESPONSE MUST:
1. Open with empathy — never shame: "Tak apa! Soalan macam ni memang tricky." or similar
2. Explain WHY their chosen answer is WRONG — what made it look correct but isn't
3. Explain WHY the correct answer IS right — the key rule or insight
4. Give ONE memorable trick or tip to remember this concept
5. Close with strong encouragement: "Lepas ni confirm dah ingat!"

IMPORTANT:
- Do NOT just repeat the explanation text word-for-word — add real teacher insight
- Give a tip, a shortcut, or a story that makes the concept stick permanently
- Be a genuine teacher, not an answer key`,

  "math-step": `
TUTOR MODE — STEP-BY-STEP MATHEMATICS:
For ALL Maths problems, NEVER give just the answer. Show the complete working:

1. KONSEP: What concept or formula applies to this problem?
2. RUMUS: Write the formula clearly
3. LANGKAH: Work through every step — show all working
4. JAWAPAN: State the final answer clearly
5. CUBA INI: Give one similar practice problem for the student to try

If a student just wants the final answer: "Kalau faham caranya, soalan serupa pun boleh jawab! Jom tengok langkah demi langkah."
Make them feel the genuine satisfaction of UNDERSTANDING, not copying.`,

  "exam-coach": `
TUTOR MODE — EXAM COACH:
You are a personal academic coach analyzing a student's learning data to create a focused revision strategy.

YOUR RESPONSE STRUCTURE:
1. Acknowledge their progress so far with encouragement
2. Identify the 3 WEAKEST areas from the data
3. Create a clear DAILY study plan (Day 1, Day 2, Day 3...)
4. Give specific revision tips for each weak area
5. Highlight which topics are highest-priority for exams
6. End with a powerful motivational message

Keep the plan realistic and achievable — 30-45 minutes per day.
Format clearly with numbers and arrows so it's easy to follow.`,

  flashcard: `
TUTOR MODE — FLASHCARD TUTOR:
The student is using flashcards to build memory. Help them understand DEEPLY, not just memorize.

YOUR RESPONSE MUST:
1. Explain the concept as simply as possible — one clear sentence
2. Give a real-life example or relatable Malaysian analogy
3. Suggest a memory trick (mnemonic, rhyme, visual, or story)
4. Connect it to something they already know from everyday life
5. Challenge them: "Cuba terangkan balik dalam ayat kamu sendiri!"

Understanding deeply = memory that sticks. Rote memorisation = forgotten after the exam.`,
};

// ─── Context block builder ────────────────────────────────────────────────────

function buildSystemPrompt(data: CikguData): string {
  const mode = data.mode ?? "general";
  const modePrompt = MODE_PROMPTS[mode];

  let ctx = "";

  if (data.subjectName || data.chapterTitle) {
    ctx += "\n\nCURRENT STUDY CONTEXT:";
    if (data.subjectName) ctx += `\n- Subject: ${data.subjectName}`;
    if (data.chapterTitle) ctx += `\n- Chapter: ${data.chapterTitle}`;
  }

  if (data.quizContext) {
    const { question, options, wrongAnswerIndex, correctAnswerIndex, explanation } = data.quizContext;
    ctx += `\n\nQUIZ CONTEXT:
Question: ${question}
All options: ${options.map((o, i) => `${i + 1}. ${o}`).join(" | ")}
Student's WRONG answer: "${options[wrongAnswerIndex]}"
Correct answer: "${options[correctAnswerIndex]}"${
      explanation ? `\nBasic explanation given: ${explanation}` : ""
    }

Now provide a RICHER, more insightful explanation than the basic one above. Be the teacher who makes it click.`;
  }

  if (data.progressSummary) {
    ctx += `\n\nSTUDENT PROGRESS DATA:\n${data.progressSummary}`;
  }

  if (data.lang) {
    ctx += `\n\nREPLY IN: ${data.lang === "bm" ? "Bahasa Malaysia (friendly and informal)" : "English (warm and simple)"}`;
  }

  return `${BASE_PERSONA}\n${modePrompt}${ctx}`;
}

// ─── Server function ──────────────────────────────────────────────────────────

export const cikguChat = createServerFn({ method: "POST" })
  .inputValidator((input: CikguData) => {
    if (!input || !Array.isArray(input.messages)) throw new Error("Invalid input");
    return {
      messages: input.messages.slice(-20).map((m) => ({
        role: m.role as "user" | "assistant" | "system",
        content: String(m.content).slice(0, 2000),
      })),
      mode: input.mode,
      subjectId: input.subjectId?.slice(0, 100),
      subjectName: input.subjectName?.slice(0, 100),
      chapterKey: input.chapterKey?.slice(0, 100),
      chapterTitle: input.chapterTitle?.slice(0, 200),
      lang: input.lang,
      quizContext: input.quizContext,
      progressSummary: input.progressSummary?.slice(0, 1500),
    } satisfies CikguData;
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY is not configured");

    const systemContent = buildSystemPrompt(data);

    let res: Response;
    try {
      res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [{ role: "system", content: systemContent }, ...data.messages],
          max_tokens: 1024,
          temperature: 0.7,
        }),
      });
    } catch (networkErr) {
      console.error("[Cikgu] Network error fetching AI gateway:", networkErr);
      return { reply: "Maaf, ada masalah sambungan ke server AI. Cuba lagi sekejap! 🙏", error: "server_error" as const };
    }

    if (!res.ok) {
      if (res.status === 429)
        return { reply: "Maaf, terlalu banyak soalan sekarang. Cuba lagi sekejap ya! ⏳", error: "rate_limited" as const };
      if (res.status === 402)
        return { reply: "AI credits habis. Sila hubungi admin untuk tambah credits. 💳", error: "payment_required" as const };
      const t = await res.text();
      console.error("[Cikgu] AI gateway error:", res.status, new URL("https://ai.gateway.lovable.dev/v1/chat/completions").pathname, "\n  body:", t);
      return { reply: "Maaf, ada masalah teknikal. Cuba lagi sekejap! 🙏", error: "server_error" as const };
    }

    const json = await res.json();
    const reply: string =
      json?.choices?.[0]?.message?.content ?? "Hmm, saya tak pasti. Cuba tanya cara lain? 🤔";
    return { reply, error: null };
  });
