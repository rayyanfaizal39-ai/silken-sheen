import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Maximize2, X } from "lucide-react";
import heartImage from "@/assets/notes/form3-science/chapter-3/academy-premium-heart.webp";
import heartDlpImage from "@/assets/notes/form3-science/chapter-3/academy-premium-heart-dlp.webp";
import { chapter3Lesson, type Chapter3Language } from "@/content/form3/science/chapter-3/approved-notes";

type Lang = Chapter3Language;
const panel = "rounded-2xl border border-white/10 bg-slate-950/55 p-4 sm:p-6";

/** Supplied heart visual; the subsection heading remains in the lesson. */
export function Chapter3HeartDiagram({ lang }: { lang: Lang }) {
  return <Chapter3ImageLightbox src={lang === "bm" ? heartImage : heartDlpImage} title={chapter3Lesson("heart").title[lang]} width={lang === "bm" ? 1536 : 1438} height={lang === "bm" ? 1024 : 1093} lang={lang} visual="heart"/>;
}

export function Chapter3ImageLightbox({ src, title, width, height, lang, visual }: { src: string; title: string; width: number; height: number; lang: Lang; visual: "heart" | "stomata" }) {
  const control = "flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-white/30 bg-slate-950/90 text-white hover:bg-slate-800 active:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300";
  return <Dialog.Root>
    <figure data-visual={visual} className="relative w-full min-w-0">
      <img src={src} alt={title} width={width} height={height} className="block h-auto w-full rounded-2xl object-contain"/>
      <Dialog.Trigger asChild>
        <button type="button" aria-label={lang === "bm" ? "Besarkan imej" : "Enlarge image"} className={`absolute right-2 top-2 sm:right-3 sm:top-3 ${control}`}>
          <Maximize2 className="h-5 w-5" aria-hidden="true"/>
        </button>
      </Dialog.Trigger>
    </figure>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/90"/>
      <Dialog.Content aria-describedby={undefined} className="fixed left-1/2 top-1/2 z-[101] w-[95vw] max-w-[95vw] max-h-[92vh] -translate-x-1/2 -translate-y-1/2 focus:outline-none">
        <Dialog.Title className="sr-only">{title}</Dialog.Title>
        <img src={src} alt={title} width={width} height={height} className="mx-auto block h-auto max-h-[92vh] w-full max-w-[95vw] object-contain"/>
        <Dialog.Close asChild>
          <button type="button" aria-label={lang === "bm" ? "Tutup" : "Close"} className={`absolute right-2 top-2 ${control}`}>
            <X className="h-5 w-5" aria-hidden="true"/>
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}

export function Chapter3VascularDiagram({ organ, lang }: { organ: "leaf" | "stem" | "root"; lang: Lang }) {
  const names = lang === "bm" ? { leaf: "Daun", stem: "Batang", root: "Akar" } : { leaf: "Leaf", stem: "Stem", root: "Root" };
  return <figure data-visual="vascular" data-organ={organ} className="mt-4">
    <svg viewBox="0 0 260 220" role="img" aria-label={names[organ]} className="mx-auto w-full max-w-xs">
      <circle cx="130" cy="108" r="88" fill="#102c26" stroke="#86efac" strokeWidth="3"/>
      {organ === "leaf" ? <><path d="M75 108 A55 55 0 0 1 185 108Z" fill="#67e8f9"/><path d="M75 112 A55 55 0 0 0 185 112Z" fill="#fcd34d"/><text x="130" y="92" textAnchor="middle" fill="#082f49">X</text><text x="130" y="144" textAnchor="middle" fill="#422006">F</text></>
      : organ === "stem" ? Array.from({ length: 8 }, (_, i) => <g key={i} transform={`rotate(${i * 45} 130 108)`}><ellipse cx="130" cy="45" rx="13" ry="10" fill="#fcd34d"/><ellipse cx="130" cy="65" rx="13" ry="10" fill="#67e8f9"/></g>)
      : <><path d="M130 38 146 88 200 108 146 125 130 178 114 125 60 108 114 88Z" fill="#67e8f9"/>{[[94,72],[165,72],[94,145],[165,145]].map(([cx,cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="12" fill="#fcd34d"/>)}</>}
    </svg>
    <figcaption className="flex flex-wrap justify-center gap-4 text-sm"><span className="text-cyan-200">● X — {lang === "bm" ? "Xilem" : "Xylem"}</span><span className="text-amber-200">● F — {lang === "bm" ? "Floem" : "Phloem"}</span></figcaption>
  </figure>;
}

export function Chapter3EvidenceDiagram({ experiment, lang }: { experiment: "xylem" | "phloem"; lang: Lang }) {
  return <figure data-visual="evidence" data-experiment={experiment} className="mt-5">
    <svg viewBox="0 0 360 230" role="img" aria-label={chapter3Lesson(experiment === "xylem" ? "eosin" : "ringing").title[lang]} className="mx-auto w-full max-w-sm">
      {experiment === "xylem" ? <>
        <path d="M125 90 V125 L85 210 H265 L225 125 V90" fill="#7f1d1d" stroke="#cbd5e1" strokeWidth="3"/>
        <path d="M175 175 V25 M175 65 Q110 10 110 55 Q140 85 175 65 M175 80 Q240 20 240 65 Q205 95 175 80" fill="#14532d" stroke="#86efac" strokeWidth="8"/>
        <path d="M175 170 V28" stroke="#fb7185" strokeWidth="5"/>
        <text x="175" y="204" textAnchor="middle" fill="white" fontSize="16">{lang === "bm" ? "Eosin merah → xilem" : "Red eosin → xylem"}</text>
      </> : <>
        <path d="M145 210 V100 Q115 85 145 55 V15 H215 V55 Q245 85 215 100 V210Z" fill="#854d0e" stroke="#fcd34d" strokeWidth="3"/>
        <path d="M145 120 H215 V145 H145Z" fill="#67e8f9"/>
        <path d="M180 205 V20" stroke="#67e8f9" strokeWidth="9"/>
        <path d="M150 40 V70 M210 40 V70" stroke="#fcd34d" strokeWidth="6"/>
        <text x="180" y="230" textAnchor="middle" fill="white" fontSize="16">{lang === "bm" ? "Pembengkakan di atas gelang" : "Swelling above the ring"}</text>
      </>}
    </svg>
  </figure>;
}

export function Chapter3WaterPath({ lang }: { lang: Lang }) {
  const [step, setStep] = useState(0);
  const labels = lang === "bm" ? ["Tanah", "Sel rambut akar · osmosis", "Korteks akar", "Xilem akar", "Xilem batang", "Xilem daun", "Sel mesofil", "Liang stoma", "Atmosfera"] : ["Soil", "Root hair cell · osmosis", "Root cortex", "Root xylem", "Stem xylem", "Leaf xylem", "Mesophyll cells", "Stomata", "Atmosphere"];
  const descriptions = chapter3Lesson("water").paragraphs[lang];
  return <div data-visual="water-path" className={panel}>
    <ol className="grid gap-2 sm:grid-cols-3">{labels.map((label, i) => <li key={label}><button type="button" aria-pressed={step === i} onClick={() => setStep(i)} className={`min-h-14 w-full rounded-xl border p-3 text-left text-sm ${step === i ? "border-cyan-300 bg-cyan-300/15" : "border-white/15"}`}>{i + 1}. {label}{i < labels.length - 1 && <span aria-hidden="true"> →</span>}</button></li>)}</ol>
    <p className="mt-4 text-base leading-7" aria-live="polite">{descriptions[step < 6 ? 1 : 2]}</p>
  </div>;
}
