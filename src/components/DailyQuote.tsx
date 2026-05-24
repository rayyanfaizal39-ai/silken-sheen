import { useEffect, useState } from "react";

const quotes = [
  "Success is the sum of small efforts repeated daily. 💪",
  "Belajar hari ini, juara esok hari! 🌟",
  "Every expert was once a beginner. 🚀",
  "Jangan takut salah — itulah cara kita belajar. 📚",
  "Knowledge is power. Wisdom is freedom. ⚡",
  "Be the energy you want to attract. ✨",
  "Stay curious, stay unstoppable. 🔥",
  "Setiap muka surat membawa kita lebih dekat dengan mimpi. 🎯",
  "Practice doesn't make perfect — it makes progress. 🌱",
  "Your only limit is you. 🦅",
  "Dream big, study smart. 💡",
  "Belajar sambil seronok — that's the LearnNova way! 🎉",
  "Small steps every day lead to big results. 👣",
  "Today's effort is tomorrow's achievement. 🏆",
];

export function DailyQuote() {
  const [quote, setQuote] = useState(quotes[0]);
  useEffect(() => {
    const day = new Date();
    const seed = day.getFullYear() * 1000 + (day.getMonth() + 1) * 31 + day.getDate();
    setQuote(quotes[seed % quotes.length]);
  }, []);
  return (
    <div className="glass rounded-full px-5 py-2.5 inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-6 animate-fade-up">
      <span className="text-base">💬</span>
      <span className="italic">{quote}</span>
    </div>
  );
}
