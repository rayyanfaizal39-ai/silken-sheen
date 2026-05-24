import { createServerFn } from "@tanstack/react-start";

type ChatMsg = { role: "user" | "assistant" | "system"; content: string };

const SYSTEM_PROMPT = `You are AcadeMY Assistant, a friendly and helpful study assistant for Malaysian secondary school students (Form 1-3) studying KSSM syllabus. Your job is to help students understand their subjects better. Always reply in simple, easy to understand Bahasa Malaysia or English depending on which language the student uses. Keep answers short, clear, and friendly. Use encouraging language. Add relevant emojis to make responses fun. If a student asks something outside of school subjects, politely redirect them back to studying. Subjects you cover: Bahasa Melayu, English, Mathematics, Science, Sejarah, and Geography for Form 1, Form 2, and Form 3 KSSM.`;

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
