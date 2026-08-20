import { useMemo, useState, type ReactNode } from "react";
import { ArrowDown, ArrowUp, Check, RotateCcw, Sparkles, X } from "lucide-react";
import type { Chapter1Content } from "@/content/form1/science/chapter-1/chapter1-content";

type Lang = "en" | "bm";

export const chapter1InteractionCoverage = {
  "daily-life": ["1.1.1"],
  careers: ["1.1.5", "1.1.6"],
  innovation: ["1.1.7"],
  apparatus: ["1.2.1"],
  "warning-symbols": ["1.2.2"],
  "lab-safety": ["1.2.4"],
  "unit-conversion": ["1.3.2", "1.3.3"],
  "measuring-tool": [],
  "measurement-concepts": ["1.4.2"],
  vernier: ["1.4.2"],
  "measurement-errors": ["1.4.3"],
  "measurement-innovation": ["1.4.5"],
  density: ["1.5.2"],
  "process-skills": ["1.6.1"],
  "investigation-order": ["1.6.2"],
  values: ["1.7.1"],
} as const;

export type Chapter1InteractionKind = Exclude<keyof typeof chapter1InteractionCoverage, "warning-symbols">;

const COPY = {
  en: {
    check: "Quick check",
    correct: "Correct — well spotted.",
    incorrect: "Not quite. Use the explanation above and try again.",
    reset: "Try again",
    matchInstruction: "Choose an item on the left, then its match on the right.",
    matched: "matched",
    checkOrder: "Check order",
    orderCorrect: "Correct — the investigation follows this nine-step sequence.",
    orderWrong: "Some steps are out of order. Adjust them and check again.",
    moveUp: "Move up",
    moveDown: "Move down",
  },
  bm: {
    check: "Semak pantas",
    correct: "Betul — pilihan yang tepat.",
    incorrect: "Belum tepat. Gunakan penerangan di atas dan cuba lagi.",
    reset: "Cuba lagi",
    matchInstruction: "Pilih item di sebelah kiri, kemudian padanannya di sebelah kanan.",
    matched: "dipadankan",
    checkOrder: "Semak urutan",
    orderCorrect: "Betul — penyiasatan mengikut urutan sembilan langkah ini.",
    orderWrong: "Masih ada langkah yang tersalah urutan. Laraskan dan semak semula.",
    moveUp: "Gerak ke atas",
    moveDown: "Gerak ke bawah",
  },
} as const;

function InteractionShell({ title, standards, children }: { title: string; standards: string[]; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 via-card/70 to-accent/5 p-4 sm:p-5">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary"><Sparkles className="h-4 w-4" aria-hidden="true" />{title}</span>
        {standards.length > 0 && <span className="rounded-full border border-border bg-card/70 px-2 py-1 text-[10px] font-semibold text-muted-foreground">SP {standards.join(", ")}</span>}
      </div>
      {children}
    </section>
  );
}

function ChoiceCheck({ prompt, options, correctIndex, explanation, lang }: { prompt: string; options: string[]; correctIndex: number; explanation: string; lang: Lang }) {
  const [answer, setAnswer] = useState<number | null>(null);
  const correct = answer === correctIndex;
  return (
    <div>
      <p className="mb-3 text-sm font-semibold leading-relaxed text-foreground">{prompt}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option, index) => {
          const chosen = answer === index;
          const revealCorrect = answer !== null && index === correctIndex;
          return (
            <button
              key={option}
              type="button"
              disabled={answer !== null}
              onClick={() => setAnswer(index)}
              className={`min-h-11 rounded-xl border px-3 py-2.5 text-left text-[13px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                revealCorrect ? "border-emerald-500 bg-emerald-500/15 text-foreground" : chosen ? "border-red-500 bg-red-500/15 text-foreground" : "border-border bg-card/70 text-foreground hover:border-primary/60"
              }`}
            >
              <span className="flex items-center gap-2">{revealCorrect ? <Check className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" /> : chosen ? <X className="h-4 w-4 shrink-0 text-red-600" aria-hidden="true" /> : null}{option}</span>
            </button>
          );
        })}
      </div>
      {answer !== null && (
        <div className="mt-3 flex flex-wrap items-start justify-between gap-3" aria-live="polite">
          <p className="max-w-2xl text-xs leading-relaxed text-muted-foreground"><span className={`font-semibold ${correct ? "text-emerald-700 dark:text-emerald-300" : "text-red-700 dark:text-red-300"}`}>{correct ? COPY[lang].correct : COPY[lang].incorrect}</span> {explanation}</p>
          <button type="button" onClick={() => setAnswer(null)} className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-xs font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />{COPY[lang].reset}</button>
        </div>
      )}
    </div>
  );
}

type Pair = { id: string; label: string; match: string };

function CompactMatcher({ pairs, lang }: { pairs: Pair[]; lang: Lang }) {
  const matches = useMemo(() => [...pairs].sort((a, b) => a.match.localeCompare(b.match)), [pairs]);
  const [selected, setSelected] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [wrong, setWrong] = useState<string | null>(null);
  const reset = () => { setSelected(null); setMatched([]); setWrong(null); };
  return (
    <div>
      <p className="mb-3 text-xs leading-relaxed text-muted-foreground">{COPY[lang].matchInstruction}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          {pairs.map((pair) => {
            const done = matched.includes(pair.id);
            return <button key={pair.id} type="button" disabled={done} onClick={() => { setSelected(pair.id); setWrong(null); }} className={`min-h-11 rounded-xl border px-3 py-2 text-left text-[13px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${done ? "border-emerald-500/50 bg-emerald-500/15 text-foreground" : selected === pair.id ? "border-primary bg-primary/15 text-primary" : "border-border bg-card/70 text-foreground hover:border-primary/60"}`}>{done && <Check className="mr-2 inline h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />}{pair.label}</button>;
          })}
        </div>
        <div className="flex flex-col gap-2">
          {matches.map((pair) => {
            const done = matched.includes(pair.id);
            return <button key={pair.id} type="button" disabled={done} onClick={() => {
              if (!selected || done) return;
              if (selected === pair.id) { setMatched((items) => [...items, pair.id]); setSelected(null); setWrong(null); }
              else setWrong(pair.id);
            }} className={`min-h-11 rounded-xl border px-3 py-2 text-left text-[13px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${done ? "border-emerald-500/50 bg-emerald-500/15 text-foreground" : wrong === pair.id ? "border-red-500 bg-red-500/15 text-foreground" : "border-border bg-card/70 text-muted-foreground hover:border-accent/60"}`}>{pair.match}</button>;
          })}
        </div>
      </div>
      <div className="mt-3 flex min-h-11 items-center justify-between gap-3"><span className="text-xs text-muted-foreground" aria-live="polite">{matched.length}/{pairs.length} {COPY[lang].matched}</span><button type="button" onClick={reset} className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-xs font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />{COPY[lang].reset}</button></div>
    </div>
  );
}

function SequenceCheck({ steps, lang }: { steps: Chapter1Content["investigationSteps"]["steps"]; lang: Lang }) {
  const initial = useMemo(() => [steps[1], steps[0], steps[3], steps[2], ...steps.slice(4)], [steps]);
  const [ordered, setOrdered] = useState(initial);
  const [result, setResult] = useState<boolean | null>(null);
  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= ordered.length) return;
    const next = [...ordered];
    [next[index], next[target]] = [next[target], next[index]];
    setOrdered(next); setResult(null);
  };
  return (
    <div>
      <div className="space-y-2">
        {ordered.map((step, index) => <div key={step.heading} className="flex min-h-12 items-center gap-2 rounded-xl border border-border bg-card/70 p-2"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">{index + 1}</span><span className="min-w-0 flex-1 text-[13px] font-medium text-foreground">{step.heading}</span><button type="button" disabled={index === 0} onClick={() => move(index, -1)} aria-label={`${COPY[lang].moveUp}: ${step.heading}`} className="flex h-11 w-11 items-center justify-center rounded-lg text-primary disabled:opacity-25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><ArrowUp className="h-4 w-4" /></button><button type="button" disabled={index === ordered.length - 1} onClick={() => move(index, 1)} aria-label={`${COPY[lang].moveDown}: ${step.heading}`} className="flex h-11 w-11 items-center justify-center rounded-lg text-primary disabled:opacity-25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><ArrowDown className="h-4 w-4" /></button></div>)}
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3"><p className={`text-xs ${result === true ? "text-emerald-700 dark:text-emerald-300" : result === false ? "text-red-700 dark:text-red-300" : "text-muted-foreground"}`} aria-live="polite">{result === true ? COPY[lang].orderCorrect : result === false ? COPY[lang].orderWrong : ""}</p><button type="button" onClick={() => setResult(ordered.every((step, index) => step.step === index + 1))} className="min-h-11 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">{COPY[lang].checkOrder}</button></div>
    </div>
  );
}

function CareerPathCheck({ careers, lang }: { careers: Chapter1Content["scienceInLife"]["careers"]; lang: Lang }) {
  const [careerIndex, setCareerIndex] = useState("");
  const [field, setField] = useState("");
  const [subject, setSubject] = useState("");
  const [response, setResponse] = useState("");
  const [result, setResult] = useState<boolean | null>(null);
  const selectedCareer = careerIndex === "" ? null : careers[Number(careerIndex)];

  const resetAnswers = (nextCareerIndex: string) => {
    setCareerIndex(nextCareerIndex);
    setField("");
    setSubject("");
    setResponse("");
    setResult(null);
  };

  const check = () => {
    setResult(Boolean(
      selectedCareer &&
      field === selectedCareer.field &&
      subject === selectedCareer.subject &&
      response.trim().length >= 8,
    ));
  };

  return (
    <div className="space-y-3">
      <p className="text-xs leading-relaxed text-muted-foreground">
        {lang === "en"
          ? "Choose a career, connect it to its science field and subject, then explain briefly why it interests you."
          : "Pilih satu kerjaya, hubungkannya dengan bidang sains dan subjek berkaitan, kemudian jelaskan secara ringkas sebab kerjaya itu menarik minat anda."}
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="space-y-1 text-xs font-semibold text-foreground">
          <span>{lang === "en" ? "Career" : "Kerjaya"}</span>
          <select value={careerIndex} onChange={(event) => resetAnswers(event.target.value)} className="min-h-11 w-full rounded-xl border border-border bg-card px-3 text-[13px] font-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <option value="">{lang === "en" ? "Choose a career" : "Pilih kerjaya"}</option>
            {careers.map((career, index) => <option key={career.field} value={index}>{career.jobs[0]}</option>)}
          </select>
        </label>
        <label className="space-y-1 text-xs font-semibold text-foreground">
          <span>{lang === "en" ? "Science field" : "Bidang sains"}</span>
          <select value={field} onChange={(event) => { setField(event.target.value); setResult(null); }} disabled={!selectedCareer} className="min-h-11 w-full rounded-xl border border-border bg-card px-3 text-[13px] font-normal disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <option value="">{lang === "en" ? "Choose the field" : "Pilih bidang"}</option>
            {careers.map((career) => <option key={career.field} value={career.field}>{career.field}</option>)}
          </select>
        </label>
        <label className="space-y-1 text-xs font-semibold text-foreground">
          <span>{lang === "en" ? "Related subject" : "Subjek berkaitan"}</span>
          <select value={subject} onChange={(event) => { setSubject(event.target.value); setResult(null); }} disabled={!selectedCareer} className="min-h-11 w-full rounded-xl border border-border bg-card px-3 text-[13px] font-normal disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <option value="">{lang === "en" ? "Choose the subject" : "Pilih subjek"}</option>
            {careers.map((career) => <option key={career.subject} value={career.subject}>{career.subject}</option>)}
          </select>
        </label>
      </div>
      <label className="block space-y-1 text-xs font-semibold text-foreground">
        <span>{lang === "en" ? "Why does this career interest you?" : "Mengapakah kerjaya ini menarik minat anda?"}</span>
        <textarea value={response} onChange={(event) => { setResponse(event.target.value); setResult(null); }} disabled={!selectedCareer} rows={2} className="w-full resize-y rounded-xl border border-border bg-card px-3 py-2 text-[13px] font-normal leading-relaxed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
      </label>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className={`text-xs ${result === true ? "text-emerald-700 dark:text-emerald-300" : result === false ? "text-red-700 dark:text-red-300" : "text-muted-foreground"}`} aria-live="polite">
          {result === true
            ? lang === "en" ? "Complete — you linked the career, field, subject and your own reason." : "Lengkap — anda telah menghubungkan kerjaya, bidang, subjek dan sebab peribadi."
            : result === false
              ? lang === "en" ? "Check the field and subject, and include a short personal reason." : "Semak bidang dan subjek, serta berikan sebab peribadi yang ringkas."
              : ""}
        </p>
        <button type="button" onClick={check} disabled={!selectedCareer} className="min-h-11 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
          {lang === "en" ? "Check my pathway" : "Semak laluan saya"}
        </button>
      </div>
    </div>
  );
}

export function Chapter1InteractiveCheck({ kind, content: t, lang }: { kind: Chapter1InteractionKind; content: Chapter1Content; lang: Lang }) {
  const check = COPY[lang].check;
  const standards = [...chapter1InteractionCoverage[kind]];
  if (kind === "daily-life") return <InteractionShell title={lang === "en" ? `${check}: classify the science link` : `${check}: kelaskan hubungan sains`} standards={standards}><CompactMatcher lang={lang} pairs={t.scienceInLife.dailyConnections.map((label, index) => ({ id: String(index), label, match: lang === "en" ? ["Agriculture", "Medicine", "Communication", "Engineering"][index] : ["Pertanian", "Perubatan", "Komunikasi", "Kejuruteraan"][index] }))} /></InteractionShell>;
  if (kind === "careers") return <InteractionShell title={lang === "en" ? `${check}: build a science career pathway` : `${check}: bina laluan kerjaya sains`} standards={standards}><CareerPathCheck careers={t.scienceInLife.careers} lang={lang} /></InteractionShell>;
  if (kind === "innovation") return <InteractionShell title={lang === "en" ? `${check}: technology in daily life` : `${check}: teknologi dalam kehidupan harian`} standards={standards}><ChoiceCheck lang={lang} prompt={lang === "en" ? "Which textbook example directly makes communication faster?" : "Contoh buku teks yang manakah menjadikan komunikasi lebih cepat?"} options={t.scienceInLife.innovation.examples.slice(0, 4)} correctIndex={2} explanation={t.scienceInLife.innovation.definition} /></InteractionShell>;
  if (kind === "apparatus") return <InteractionShell title={lang === "en" ? `${check}: apparatus and function` : `${check}: radas dan fungsi`} standards={standards}><CompactMatcher lang={lang} pairs={t.laboratory.apparatus.filter((item) => ["measuring-cylinder", "filter-funnel", "gas-jar", "evaporating-dish"].includes(item.id)).map((item) => ({ id: item.id, label: item.name, match: item.function }))} /></InteractionShell>;
  if (kind === "lab-safety") return <InteractionShell title={lang === "en" ? `${check}: justify a safety rule` : `${check}: wajarkan peraturan keselamatan`} standards={standards}><ChoiceCheck lang={lang} prompt={lang === "en" ? "Why must the mouth of a heated test tube never point towards anyone?" : "Mengapakah hujung tabung uji yang dipanaskan tidak boleh dihalakan ke arah sesiapa?"} options={lang === "en" ? ["Hot liquid or gas may be ejected and cause injury", "The test tube will become more accurate", "The chemical will change colour", "It makes the experiment finish faster"] : ["Cecair atau gas panas mungkin terpancut dan menyebabkan kecederaan", "Tabung uji akan menjadi lebih jitu", "Bahan kimia akan bertukar warna", "Eksperimen akan selesai dengan lebih cepat"]} correctIndex={0} explanation={lang === "en" ? "Pointing the test tube away from people reduces the risk of burns or other injury if hot material is ejected." : "Menghalakan tabung uji jauh daripada orang lain mengurangkan risiko lecur atau kecederaan jika bahan panas terpancut."} /></InteractionShell>;
  if (kind === "unit-conversion") return <InteractionShell title={lang === "en" ? `${check}: instant conversion` : `${check}: pertukaran segera`} standards={standards}><ChoiceCheck lang={lang} prompt={t.quantitiesAndUnits.conversions[0].question} options={["1.9 g", "19 g", "190 g", t.quantitiesAndUnits.conversions[0].answer]} correctIndex={3} explanation={`${t.quantitiesAndUnits.conversions[0].working} = ${t.quantitiesAndUnits.conversions[0].answer}`} /></InteractionShell>;
  if (kind === "measuring-tool") return <InteractionShell title={lang === "en" ? `${check}: choose the tool` : `${check}: pilih alat`} standards={standards}><ChoiceCheck lang={lang} prompt={lang === "en" ? "Which instrument measures liquid volume?" : "Alat yang manakah menyukat isi padu cecair?"} options={t.measuringInstruments.instruments.map((item) => item.standardTool)} correctIndex={5} explanation={t.measuringInstruments.instruments[5].note} /></InteractionShell>;
  if (kind === "measurement-concepts") return <InteractionShell title={lang === "en" ? `${check}: identify the concept` : `${check}: kenal pasti konsep`} standards={standards}><ChoiceCheck lang={lang} prompt={lang === "en" ? "Repeated readings are close to one another. Which concept is described?" : "Bacaan berulang adalah hampir antara satu sama lain. Konsep apakah yang diterangkan?"} options={t.measuringInstruments.definitions.map((item) => item.term)} correctIndex={1} explanation={t.measuringInstruments.definitions[1].body} /></InteractionShell>;
  if (kind === "vernier") return <InteractionShell title={lang === "en" ? `${check}: read the Vernier scale` : `${check}: baca skala Vernier`} standards={standards}><ChoiceCheck lang={lang} prompt={lang === "en" ? "The main scale is 3.20 cm and the second Vernier division coincides. What is the reading?" : "Skala utama ialah 3.20 cm dan senggatan Vernier kedua bertepatan. Berapakah bacaannya?"} options={["3.20 cm", "3.21 cm", "3.22 cm", "3.24 cm"]} correctIndex={2} explanation="3.20 cm + (2 × 0.01 cm) = 3.22 cm" /></InteractionShell>;
  if (kind === "measurement-errors") return <InteractionShell title={lang === "en" ? `${check}: classify the error` : `${check}: kelaskan ralat`} standards={standards}><ChoiceCheck lang={lang} prompt={lang === "en" ? "The observer's eye is not perpendicular to the scale. What type of error may occur?" : "Mata pemerhati tidak berserenjang dengan skala. Apakah jenis ralat yang mungkin berlaku?"} options={t.measuringInstruments.errorTypes.map((item) => item.type)} correctIndex={1} explanation={t.measuringInstruments.errorTypes[1].examples[0]} /></InteractionShell>;
  if (kind === "measurement-innovation") return <InteractionShell title={lang === "en" ? `${check}: measurement innovation` : `${check}: inovasi pengukuran`} standards={standards}><ChoiceCheck lang={lang} prompt={lang === "en" ? "Which example is highlighted as an innovation in measuring instruments?" : "Contoh manakah diketengahkan sebagai inovasi alat pengukuran?"} options={lang === "en" ? ["Digital blood pressure monitor", "Gas jar", "Wire gauze", "Filter funnel"] : ["Monitor tekanan darah digital", "Balang gas", "Kasa dawai", "Corong turas"]} correctIndex={0} explanation={t.measuringInstruments.innovation} /></InteractionShell>;
  if (kind === "density") return <InteractionShell title={lang === "en" ? `${check}: predict float or sink` : `${check}: ramal terapung atau tenggelam`} standards={standards}><ChoiceCheck lang={lang} prompt={lang === "en" ? "Copper has a density greater than pure water. Predict what happens in water." : "Kuprum mempunyai ketumpatan lebih tinggi daripada air tulen. Ramalkan perkara yang berlaku di dalam air."} options={lang === "en" ? ["It floats", "It sinks", "Its density becomes zero", "No prediction can be made"] : ["Kuprum terapung", "Kuprum tenggelam", "Ketumpatannya menjadi sifar", "Tiada ramalan boleh dibuat"]} correctIndex={1} explanation={lang === "en" ? "Copper has a greater numerical density than pure water, so it sinks." : "Nilai ketumpatan kuprum lebih besar daripada air tulen, maka kuprum tenggelam."} /></InteractionShell>;
  if (kind === "process-skills") return <InteractionShell title={lang === "en" ? `${check}: identify the process skill` : `${check}: kenal pasti kemahiran proses`} standards={standards}><ChoiceCheck lang={lang} prompt={lang === "en" ? "A student groups objects by observed similarities and differences. Which process skill is used?" : "Seorang murid mengumpulkan objek berdasarkan persamaan dan perbezaan yang diperhatikan. Kemahiran proses yang manakah digunakan?"} options={t.investigationSteps.processSkills.slice(0, 4).map((skill) => skill.name)} correctIndex={1} explanation={t.investigationSteps.processSkills[1].description} /></InteractionShell>;
  if (kind === "investigation-order") return <InteractionShell title={lang === "en" ? `${check}: reorder the investigation` : `${check}: susun semula penyiasatan`} standards={standards}><SequenceCheck steps={t.investigationSteps.steps} lang={lang} /></InteractionShell>;
  return <InteractionShell title={lang === "en" ? `${check}: attitudes and values` : `${check}: sikap dan nilai`} standards={standards}><ChoiceCheck lang={lang} prompt={lang === "en" ? "A reading does not match the prediction. Which action shows a scientific attitude?" : "Satu bacaan tidak sepadan dengan ramalan. Tindakan manakah menunjukkan sikap saintifik?"} options={lang === "en" ? ["Change the reading", "Record it honestly and check the method", "Hide the result", "Copy another group's value"] : ["Ubah bacaan", "Rekod dengan jujur dan semak kaedah", "Sembunyikan keputusan", "Salin nilai kumpulan lain"]} correctIndex={1} explanation={t.attitudesAndValues.core[1]} /></InteractionShell>;
}
