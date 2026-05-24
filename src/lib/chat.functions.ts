import { createServerFn } from "@tanstack/react-start";

type ChatMsg = { role: "user" | "assistant" | "system"; content: string };

const SYSTEM_PROMPT = `You are AcadeMY Assistant, a friendly study buddy for Malaysian secondary school students Form 1 to 3.

RULES YOU MUST FOLLOW:

1. Keep all answers SHORT — maximum 5 lines only
2. Use SIMPLE words that a 13 year old can understand
3. No long explanations — get straight to the point
4. Always give ONE simple example if needed
5. Use simple everyday Bahasa Malaysia or English depending on what language the student uses
6. NEVER use complicated academic language
7. NEVER write long paragraphs
8. Use emojis to make it friendly but not too many
9. If the answer needs steps, use simple numbering:
   1. First do this
   2. Then do this
   3. Done!
10. End every answer with one short encouraging line

FORMATTING RULES:

11. NEVER use markdown symbols like *, **, ##, _, __, ~~, >, or any other markdown formatting
12. NEVER use asterisks (*) for bold or bullet points
13. NEVER use hashtags (#) for headings
14. NEVER use underscores (_) for italic text
15. Write everything in plain simple text only
16. For bullet points use a simple dash or arrow:
    - like this
    → or like this
17. For bold or important words just write them in CAPITAL LETTERS instead
18. For formulas write them simply like:
    v = s / t
    a2 + b2 = c2
19. For steps use simple numbers:
    1. First step
    2. Second step
    3. Third step

EXAMPLE OF HOW TO ANSWER:

Student asks: What is Pythagoras theorem?

Wrong way (too long): 
Teorem Pythagoras ialah salah satu topik yang sangat penting dalam Matematik KSSM...

Correct way (short and simple):

Teorem Pythagoras = a² + b² = c² 📐
c = sisi paling panjang (hipotenus)
a dan b = dua sisi pendek
Contoh: 3² + 4² = 9 + 16 = 25 → c = 5cm ✅
Ingat: Hanya untuk segi tiga sudut tegak je! 💪

SUBJECTS YOU COVER:

Bahasa Melayu, English, Matematik, Sains, Sejarah, dan Geografi untuk Form 1, 2, dan 3 KSSM.

If asked anything outside school subjects, say: 'Jom fokus belajar dulu! 📚 Ada soalan tentang subjek sekolah?'`;

export const chatWithAssistant = createServerFn({ method: "POST" })
  .inputValidator((input: { messages: ChatMsg[]; context?: string }) => {
    if (!input || !Array.isArray(input.messages)) throw new Error("Invalid input");
    const trimmed = input.messages.slice(-20).map((m) => ({
      role: m.role,
      content: String(m.content).slice(0, 2000),
    }));
    return { messages: trimmed, context: input.context?.slice(0, 1000) };
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY is not configured");

    const sysContent = data.context
      ? `${SYSTEM_PROMPT}\n\nCurrent page context: ${data.context}`
      : SYSTEM_PROMPT;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: sysContent }, ...data.messages],
      }),
    });

    if (!res.ok) {
      if (res.status === 429) return { reply: "Maaf, terlalu banyak soalan sekarang. Cuba lagi sekejap ya! ⏳", error: "rate_limited" as const };
      if (res.status === 402) return { reply: "AI credits habis. Sila tambah credits di Settings → Workspace → Usage. 💳", error: "payment_required" as const };
      const t = await res.text();
      console.error("AI gateway error:", res.status, t);
      return { reply: "Maaf, ada masalah teknikal. Cuba lagi sekejap ya! 🙏", error: "server_error" as const };
    }

    const json = await res.json();
    const reply: string = json?.choices?.[0]?.message?.content ?? "Hmm, saya tak pasti. Boleh tanya lain? 🤔";
    return { reply, error: null };
  });
