import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Bot, X, Send, Copy, Trash2, Sparkles } from "lucide-react";
import { chatWithAssistant } from "@/lib/chat.functions";

type Msg = { role: "user" | "assistant"; content: string; ts: number };

const PAGE_SUGGESTIONS: Record<string, { label: string; q: string }[]> = {
  sejarah: [
    { label: "Apa itu Zaman Prasejarah? 🏛️", q: "Apa itu Zaman Prasejarah?" },
    { label: "Bezakan sumber primer dan sekunder 📜", q: "Bezakan sumber primer dan sekunder dalam Sejarah." },
    { label: "Terangkan Pentas Sunda 🗺️", q: "Terangkan apa itu Pentas Sunda." },
  ],
  science: [
    { label: "Apa itu sel? 🔬", q: "Apa itu sel dalam Sains?" },
    { label: "Terangkan fotosintesis 🌿", q: "Terangkan proses fotosintesis." },
    { label: "Apa itu jirim? ⚗️", q: "Apa itu jirim?" },
  ],
  math: [
    { label: "Macam mana nak selesaikan persamaan? 📐", q: "Macam mana nak selesaikan persamaan linear?" },
    { label: "Terangkan nisbah dan kadaran 📊", q: "Terangkan nisbah dan kadaran." },
    { label: "Apa itu sudut? 📏", q: "Apa itu sudut dalam matematik?" },
  ],
  general: [
    { label: "Macam mana nak belajar dengan berkesan? 📚", q: "Bagi saya tips belajar dengan berkesan." },
    { label: "Tolong terangkan konsep yang susah 🤔", q: "Bagaimana cara saya faham konsep yang susah?" },
    { label: "Bagi tips untuk peperiksaan 💡", q: "Bagi tips untuk peperiksaan." },
  ],
};

function detectSubject(pathname: string, search: string): keyof typeof PAGE_SUGGESTIONS {
  const all = `${pathname} ${search}`.toLowerCase();
  if (all.includes("sejarah")) return "sejarah";
  if (all.includes("science") || all.includes("sains")) return "science";
  if (all.includes("math")) return "math";
  return "general";
}

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const subject = detectSubject(pathname, "");
  const suggestions = PAGE_SUGGESTIONS[subject];

  const chat = useServerFn(chatWithAssistant);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = localStorage.getItem("acad-ai-tip-seen");
    if (!seen) {
      const t = setTimeout(() => setShowTip(true), 1500);
      const t2 = setTimeout(() => {
        setShowTip(false);
        localStorage.setItem("acad-ai-tip-seen", "1");
      }, 8000);
      return () => { clearTimeout(t); clearTimeout(t2); };
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  const openChat = () => {
    setOpen(true);
    setShowTip(false);
    if (typeof window !== "undefined") localStorage.setItem("acad-ai-tip-seen", "1");
    if (messages.length === 0) {
      const name = typeof window !== "undefined" ? localStorage.getItem("acad-user-name") : null;
      const greeting = name
        ? `Hai ${name}! Ada apa yang kamu nak tanya hari ini? 😊`
        : "Hai! Saya AcadeMY Assistant. Apa yang kamu nak belajar hari ini? 🌟";
      setMessages([{ role: "assistant", content: greeting, ts: Date.now() }]);
    }
  };

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    const userMsg: Msg = { role: "user", content: content.slice(0, 500), ts: Date.now() };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await chat({
        data: {
          messages: next.map(({ role, content }) => ({ role, content })),
          context: `User is on page: ${pathname}`,
        },
      });
      setMessages((prev) => [...prev, { role: "assistant", content: res.reply, ts: Date.now() }]);
    } catch (e) {
      console.error(e);
      setMessages((prev) => [...prev, { role: "assistant", content: "Maaf, ada masalah. Cuba lagi ya! 🙏", ts: Date.now() }]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const clearChat = () => setMessages([]);

  const copyMsg = async (idx: number, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1200);
    } catch {}
  };

  const fmtTime = (ts: number) =>
    new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <>
      {/* Floating button */}
      {!open && (
        <div className="mobile-ai-control fixed z-[60] flex flex-col items-end gap-2 md:bottom-7 md:right-6">
          {showTip && (
            <div className="glass-strong max-w-[220px] rounded-2xl px-4 py-2.5 text-sm font-medium shadow-2xl animate-fade-up">
              Ada soalan? Tanya AcadeMY AI! 💡
            </div>
          )}
          <button
            onClick={openChat}
            aria-label="Open AcadeMY AI Assistant"
            className="group relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-400 to-primary text-white shadow-2xl transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 active:scale-95 md:h-14 md:w-14 md:rounded-3xl"
            style={{ boxShadow: "0 16px 40px -20px color-mix(in oklab, var(--accent) 75%, transparent)" }}
          >
            <span
              className="absolute inset-0 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100 md:rounded-3xl"
              style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.22), transparent)" }}
            />
            <Bot className="relative h-6 w-6 md:h-7 md:w-7" />
          </button>
        </div>
      )}

      {/* Chat panel */}
      {open && (
        <div className="ai-chat-panel fixed md:bottom-6 md:right-6 z-[60] w-[min(420px,calc(100vw-2rem))] h-[min(620px,calc(100dvh-6rem))] glass-strong rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-white/10 animate-slide-up resize overflow-auto"
             style={{ minWidth: 320, minHeight: 400, maxWidth: "calc(100vw - 2rem)", maxHeight: "calc(100dvh - 4rem)" }}>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-gradient-to-r from-accent/20 to-primary/20">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-xl">
                🤖
              </div>
              <div>
                <div className="font-display font-semibold leading-tight flex items-center gap-1.5">
                  AcadeMY Assistant <Sparkles className="h-3.5 w-3.5 text-nova-yellow" />
                </div>
                <div className="text-xs text-muted-foreground leading-tight">
                  Tanya apa sahaja tentang pelajaran!
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                title="Clear chat"
                className="h-8 w-8 rounded-full hover:bg-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground transition"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="h-8 w-8 rounded-full hover:bg-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2 animate-fade-up ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "assistant" && (
                  <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-sm" aria-hidden="true">🤖</div>
                )}
                <div className={`max-w-[78%] flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
                  <div
                    className={
                      m.role === "user"
                        ? "rounded-2xl rounded-br-sm px-3.5 py-2 text-sm text-white whitespace-pre-wrap"
                        : "rounded-2xl rounded-bl-sm px-3.5 py-2 text-sm whitespace-pre-wrap border border-accent/40 bg-card/70"
                    }
                    style={m.role === "user" ? { background: "linear-gradient(135deg, var(--primary), color-mix(in oklab, var(--primary) 70%, var(--accent)))" } : undefined}
                  >
                    {m.content}
                  </div>
                  <div className="flex items-center gap-2 mt-1 px-1">
                    {m.role === "assistant" && (
                      <>
                        <span className="text-[10px] text-accent font-medium">AcadeMY AI</span>
                        <button
                          onClick={() => copyMsg(i, m.content)}
                          className="text-[10px] text-muted-foreground hover:text-foreground inline-flex items-center gap-0.5"
                        >
                          <Copy className="h-2.5 w-2.5" /> {copiedIdx === i ? "Copied!" : "Copy"}
                        </button>
                      </>
                    )}
                    <span className="text-[10px] text-muted-foreground">{fmtTime(m.ts)}</span>
                  </div>
                </div>
                {m.role === "user" && (
                  <div className="h-8 w-8 shrink-0 rounded-full bg-secondary flex items-center justify-center text-sm" aria-hidden="true">👤</div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-2 justify-start animate-fade-up">
                <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-sm" aria-hidden="true">🤖</div>
                <div className="rounded-2xl rounded-bl-sm px-3.5 py-3 border border-accent/40 bg-card/70 flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-2 w-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-2 w-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}

            {messages.length <= 1 && !loading && (
              <div className="space-y-2 pt-2">
                <div className="text-xs text-muted-foreground px-1">Soalan cadangan:</div>
                {suggestions.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => send(s.q)}
                    className="w-full text-left text-sm px-3 py-2 rounded-xl bg-card/60 hover:bg-card border border-white/10 hover:border-accent/40 transition"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-white/10 p-3 bg-background/40">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, 500))}
                onKeyDown={onKeyDown}
                placeholder="Tulis soalan kamu di sini..."
                rows={1}
                maxLength={500}
                className="flex-1 resize-none rounded-2xl bg-input/60 border border-white/10 px-3.5 py-2.5 text-sm focus:outline-none focus:border-accent/60 max-h-28"
              />
              <button
                onClick={() => send()}
                disabled={!input.trim() || loading}
                className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center disabled:opacity-40 hover:scale-105 active:scale-95 transition"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <div className="text-[10px] text-muted-foreground text-right mt-1 px-1">
              {input.length}/500
            </div>
          </div>
        </div>
      )}
    </>
  );
}
