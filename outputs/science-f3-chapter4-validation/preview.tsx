import { createRoot } from "react-dom/client";
import { useState } from "react";
import { ScienceF3Chapter4VisualNotesBlock } from "@/components/notes/ScienceF3Chapter4VisualNotesBlock";
import { scienceF3C4InteractiveBM } from "@/content/form3/science/chapter-4/interactive-bm";
import { scienceF3C4InteractiveDLP } from "@/content/form3/science/chapter-4/interactive-dlp";
import "@/styles.css";
import "@/styles/fonts.css";

const lang = new URLSearchParams(location.search).get("lang") === "bm" ? "bm" : "en";
document.documentElement.lang = lang === "bm" ? "ms" : "en";
function Preview() {
  const [read, setRead] = useState(false);
  const content = lang === "bm" ? scienceF3C4InteractiveBM : scienceF3C4InteractiveDLP;
  return <main style={{ maxWidth: 1200, margin: "0 auto", padding: 12 }}><ScienceF3Chapter4VisualNotesBlock lang={lang} content={content} isRead={read} onMarkRead={() => setRead(true)} /></main>;
}
createRoot(document.getElementById("root")!).render(<Preview />);
