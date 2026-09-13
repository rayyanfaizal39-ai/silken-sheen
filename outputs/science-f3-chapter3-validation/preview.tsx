import { createRoot } from "react-dom/client";
import { useState } from "react";
import { ScienceF3Chapter3VisualNotesBlock } from "@/components/notes/ScienceF3Chapter3VisualNotesBlock";
import { scienceF3C3InteractiveBM } from "@/content/form3/science/chapter-3/interactive-bm";
import { scienceF3C3InteractiveDLP } from "@/content/form3/science/chapter-3/interactive-dlp";
import "@/styles.css";
import "@/styles/fonts.css";

const lang = new URLSearchParams(location.search).get("lang") === "bm" ? "bm" : "en";
document.documentElement.lang = lang === "bm" ? "ms" : "en";
function Preview() {
  const [read, setRead] = useState(false);
  const content = lang === "bm" ? scienceF3C3InteractiveBM : scienceF3C3InteractiveDLP;
  return <main style={{ maxWidth: 1200, margin: "0 auto", padding: 12 }}><ScienceF3Chapter3VisualNotesBlock lang={lang} content={content} isRead={read} onMarkRead={() => setRead(true)} /></main>;
}
createRoot(document.getElementById("root")!).render(<Preview />);
