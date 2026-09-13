import { createRoot } from "react-dom/client";
import { useState } from "react";
import { ScienceF3Chapter8VisualNotesBlock } from "@/components/notes/ScienceF3Chapter8VisualNotesBlock";
import { scienceF3C8Interactive } from "@/content/form3/science/chapter-8/interactive";
import { projectF3Interactive } from "@/content/form3/science/project-bilingual";
import "@/styles.css";
import "@/styles/fonts.css";

const lang = new URLSearchParams(location.search).get("lang") === "bm" ? "bm" : "en";
document.documentElement.lang = lang === "bm" ? "ms" : "en";
function Preview() {
  const [read, setRead] = useState(false);
  return <main style={{ maxWidth: 1200, margin: "0 auto", padding: 12 }}><ScienceF3Chapter8VisualNotesBlock lang={lang} content={projectF3Interactive(scienceF3C8Interactive, lang === "bm" ? "bm" : "dlp")} isRead={read} onMarkRead={() => setRead(true)} /></main>;
}
createRoot(document.getElementById("root")!).render(<Preview />);
