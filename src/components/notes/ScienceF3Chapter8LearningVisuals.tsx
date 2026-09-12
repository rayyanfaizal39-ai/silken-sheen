import { useState } from "react";
import type { ScienceF3InteractiveContent } from "@/content/form3/science/interactive-types";
import { chapter8Facts } from "@/content/form3/science/chapter-8/chapter8-content";

type Lang = "bm" | "en";
type RadiationKind = "alpha" | "beta" | "gamma";
const buttonStyle = "min-h-11 rounded-lg border border-white/30 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300";

export function Chapter8Fact({ name, lang }: { name: keyof typeof chapter8Facts; lang: Lang }) {
  const fact = chapter8Facts[name];
  const key = lang === "bm" ? "bm" : "dlp";
  return <div className="rounded-xl border border-white/10 bg-white/5 p-4"><h3 className="font-bold text-cyan-100">{fact.term[key]}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{fact.statement[key]}</p></div>;
}

export function Chapter8Atom({ ion, lang }: { ion: "neutral" | "cation" | "anion"; lang: Lang }) {
  const bm = lang === "bm";
  const protons = ion === "anion" ? 17 : 11;
  const neutrons = ion === "anion" ? 18 : 12;
  const shells = ion === "anion" ? [2, 8, 8] : ion === "cation" ? [2, 8] : [2, 8, 1];
  const electrons = shells.reduce((sum, count) => sum + count, 0);
  return <figure className="min-w-0" data-atom={ion}>
    <svg viewBox="0 0 320 320" role="img" aria-label={bm ? `Struktur atom: ${protons} proton, ${neutrons} neutron, ${electrons} elektron` : `Atomic structure: ${protons} protons, ${neutrons} neutrons, ${electrons} electrons`} className="mx-auto w-full max-w-80">
      {shells.map((count, shell) => <g key={shell}>
        <circle cx="160" cy="160" r={75 + shell * 31} fill="none" stroke="#67e8f9" strokeOpacity=".4" />
        {Array.from({ length: count }, (_, index) => {
          const angle = 2 * Math.PI * index / count - Math.PI / 2;
          const x = 160 + Math.cos(angle) * (75 + shell * 31);
          const y = 160 + Math.sin(angle) * (75 + shell * 31);
          return <g key={index} data-electron="true"><circle cx={x} cy={y} r="9" fill="#67e8f9" /><text x={x} y={y + 4} textAnchor="middle" fontSize="14" fill="#0f172a">−</text></g>;
        })}
      </g>)}
      <circle cx="160" cy="160" r="53" fill="#442260" stroke="#f0abfc" />
      <text x="160" y="141" textAnchor="middle" fill="white" fontSize="13">{bm ? "Nukleus" : "Nucleus"}</text>
      <text x="160" y="163" textAnchor="middle" fill="#fde68a" fontSize="14">{protons} p⁺</text>
      <text x="160" y="184" textAnchor="middle" fill="#e2e8f0" fontSize="14">{neutrons} n⁰</text>
    </svg>
    <figcaption className="space-y-2 text-sm leading-6 text-slate-300">
      <p><strong className="text-amber-200">p⁺</strong> {bm ? "Proton: positif (+1), di dalam nukleus." : "Proton: positive (+1), inside the nucleus."}</p>
      <p><strong className="text-white">n⁰</strong> {bm ? "Neutron: neutral (0), di dalam nukleus." : "Neutron: neutral (0), inside the nucleus."}</p>
      <p><strong className="text-cyan-200">e⁻</strong> {bm ? "Elektron: negatif (−1), di luar nukleus." : "Electron: negative (−1), outside the nucleus."}</p>
      <p className="text-xs">{ion === "anion" ? "Cl-35" : "Na-23"} · {bm ? "Model petala, bukan mengikut skala." : "Shell model, not to scale."}</p>
    </figcaption>
  </figure>;
}

const beams = [
  { key: "alpha", symbol: "α", color: "#fcd34d" },
  { key: "beta", symbol: "β", color: "#67e8f9" },
  { key: "gamma", symbol: "γ", color: "#f0abfc" },
] as const;

export function Chapter8RadiationFields({ selected, lang }: { selected: RadiationKind; lang: Lang }) {
  const bm = lang === "bm";
  const [reversed, setReversed] = useState(false);
  return <div className="mt-6 space-y-5 border-t border-white/15 pt-5">
    <p className="text-xs text-slate-300">{bm ? "Rajah skematik; anak panah menunjukkan arah sinaran. Jenis yang dipilih diserlahkan." : "Schematic diagrams; arrows show radiation direction. The selected type is highlighted."}</p>
    <div className="grid gap-5 xl:grid-cols-3">
      <figure className="min-w-0"><figcaption className="font-bold">{bm ? "Penembusan" : "Penetration"}</figcaption>
        <svg viewBox="0 0 340 175" role="img" aria-label={bm ? "Alfa dihalang kertas, beta oleh aluminium, gama dikurangkan oleh plumbum tebal" : "Alpha stopped by paper, beta by aluminium, gamma reduced by thick lead"} className="mt-3 w-full">
          <rect x="85" y="40" width="6" height="125" fill="#e2e8f0" /><rect x="171" y="40" width="12" height="125" fill="#94a3b8" /><rect x="265" y="40" width="40" height="125" fill="#64748b" />
          {beams.map((beam, index) => { const y = 60 + index * 42; const end = [85, 171, 284][index]; return <g key={beam.key} opacity={selected === beam.key ? 1 : .8} stroke={beam.color}><text x="15" y={y + 5} fill={beam.color} stroke="none" fontSize="24">{beam.symbol}</text><path d={`M 35 ${y} H ${end}`} strokeWidth="3" /><path d={`M ${end - 7} ${y - 5} L ${end} ${y} L ${end - 7} ${y + 5}`} fill="none" strokeWidth="2" />{index === 2 && <path d={`M ${end} ${y} H 328`} strokeDasharray="2 5" strokeOpacity=".4" />}</g>; })}

        </svg><div className="mb-3 grid grid-cols-3 gap-1 text-center text-xs leading-5"><span>{bm ? "Kertas" : "Paper"}</span><span>Aluminium<br />≈ 3 mm</span><span>{bm ? "Plumbum" : "Lead"}<br />≈ 10 cm</span></div><p className="text-xs leading-5 text-slate-300">{bm ? "Ketebalan buku teks. Plumbum tebal mengurangkan sinaran gama yang menembusinya." : "Textbook thicknesses. Thick lead reduces the gamma radiation passing through it."}</p>
      </figure>
      <figure className="min-w-0"><figcaption className="font-bold">{bm ? "Medan elektrik" : "Electric field"}</figcaption>
        <svg viewBox="0 0 340 220" role="img" aria-label={bm ? "Alfa ke plat negatif di atas, beta lebih kuat ke plat positif di bawah, gama lurus" : "Alpha towards negative plate above, beta more strongly towards positive plate below, gamma straight"} className="mt-3 w-full">
          <rect x="60" y="18" width="235" height="23" rx="4" fill="#164e63" /><rect x="60" y="183" width="235" height="23" rx="4" fill="#713f12" />
          <text x="177" y="34" textAnchor="middle" fill="white" fontSize="18">− {bm ? "Plat negatif" : "Negative plate"}</text><text x="177" y="199" textAnchor="middle" fill="white" fontSize="18">+ {bm ? "Plat positif" : "Positive plate"}</text>
          {beams.map((beam, index) => <g key={beam.key} opacity={selected === beam.key ? 1 : .8}><path d={["M 20 110 H 90 Q 175 110 282 67", "M 20 110 H 90 Q 155 110 218 166", "M 20 110 H 282"][index]} stroke={beam.color} strokeWidth="3" fill="none" /><text x={[285, 221, 285][index]} y={[70, 170, 115][index]} fill={beam.color} fontSize="24">{beam.symbol} →</text></g>)}
        </svg><p className="text-xs leading-5 text-slate-300">{bm ? "Alfa positif; beta negatif dan jauh lebih ringan; gama neutral." : "Alpha is positive; beta is negative and much lighter; gamma is neutral."}</p>
      </figure>
      <figure className="min-w-0"><figcaption className="font-bold">{bm ? "Medan magnet" : "Magnetic field"}</figcaption>
        <svg viewBox="0 0 340 220" role="img" aria-label={`${bm ? "Medan" : "Field"}: ${reversed ? (bm ? "keluar halaman" : "out of page") : (bm ? "masuk halaman" : "into page")}; ${bm ? "alfa dan beta bertentangan, gama lurus" : "alpha and beta opposite, gamma straight"}`} className="mt-3 w-full" data-magnetic-orientation={reversed ? "out" : "in"}>
          {[75, 135, 195, 255].flatMap(x => [40, 85, 135, 180].map(y => <text key={`${x}-${y}`} x={x} y={y} fontSize="18" fill="#94a3b8" opacity=".4">{reversed ? "⊙" : "×"}</text>))}
          {beams.map((beam, index) => { const endY = index === 2 ? 110 : index === 0 ? (reversed ? 163 : 57) : (reversed ? 35 : 185); return <g key={beam.key} opacity={selected === beam.key ? 1 : .8}><path d={`M 20 110 H 90 Q 190 110 280 ${endY}`} fill="none" stroke={beam.color} strokeWidth="3" /><text x="283" y={endY + 5} fill={beam.color} fontSize="24">{beam.symbol} →</text></g>; })}
          <text x="20" y="215" fill="white" fontSize="18">{reversed ? (bm ? "⊙ Medan keluar halaman" : "⊙ Field out of page") : (bm ? "× Medan masuk halaman" : "× Field into page")}</text>
        </svg><button type="button" aria-pressed={reversed} className={buttonStyle} onClick={() => setReversed(!reversed)}>{bm ? "Songsangkan medan magnet" : "Reverse magnetic field"}</button>
      </figure>
    </div>
    <Chapter8Fact name="magnetic" lang={lang} />
  </div>;
}

export function Chapter8Practice({ item, lang }: { item: ScienceF3InteractiveContent["miniQuiz"][number]; lang: Lang }) {
  const [answer, setAnswer] = useState<number | null>(null);
  const options = item.type === "true-false" ? (lang === "bm" ? ["Betul", "Salah"] : ["True", "False"]) : item.options;
  const correct = item.type === "true-false" ? (item.answer ? 0 : 1) : item.answerIndex;
  return <div className="rounded-xl border border-white/15 p-4"><p className="text-sm font-bold leading-6">{item.question}</p><div className="mt-3 grid gap-2 sm:grid-cols-2">{options.map((option, index) => <button key={option} type="button" aria-pressed={answer === index} onClick={() => setAnswer(index)} className={`${buttonStyle} text-left ${answer === index ? "bg-cyan-300/20" : "bg-white/5"}`}>{option}</button>)}</div>{answer !== null && <p className="mt-3 text-sm leading-6 text-cyan-100" role="status">{answer === correct ? (lang === "bm" ? "Betul. " : "Correct. ") : (lang === "bm" ? "Semak semula. " : "Review your answer. ")}{item.explanation}</p>}</div>;
}
