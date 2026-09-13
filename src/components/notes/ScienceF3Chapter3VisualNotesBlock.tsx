import stomaDayImage from "@/assets/notes/form3-science/chapter-3/stoma-day-open.webp";
import stomaNightImage from "@/assets/notes/form3-science/chapter-3/stoma-night-closed.webp";
import { Chapter3ImageLightbox } from "./ScienceF3Chapter3LearningVisuals";
import { useState } from "react";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  CircleDot,
  Droplets,
  HeartPulse,
  Microscope,
  ShieldCheck,
  Sprout,
  TestTube2,
} from "lucide-react";
import { chapter3Headings, chapter3Lesson } from "@/content/form3/science/chapter-3/approved-notes";
import { Chapter3HeartDiagram, Chapter3VascularDiagram, Chapter3EvidenceDiagram, Chapter3WaterPath } from "./ScienceF3Chapter3LearningVisuals";
import type { ScienceF3InteractiveContent } from "@/content/form3/science/interactive-types";

type Lang = "en" | "bm";

const copy = {
  bm: {
    title: "Pengangkutan",
    reveal: "Lihat jawapan", hide: "Tutup jawapan", check: "Uji diri",
    mark: "Tandakan Bab 3 Selesai", marked: "Selesai ditanda",
  },
  en: {
    title: "Transport",
    reveal: "Reveal answer", hide: "Hide answer", check: "Check yourself",
    mark: "Mark Chapter 3 as Read", marked: "Marked as read",
  },
} as const;

const vertebrates = {
  bm: [
    ["Ikan", "2 ruang · 1 atrium + 1 ventrikel", "Peredaran tunggal", "Jantung → insang → badan → jantung", "Tiada percampuran di dalam jantung"],
    ["Amfibia", "3 ruang · 2 atrium + 1 ventrikel", "Ganda dua tidak lengkap", "Badan → jantung → peparu/kulit → jantung → badan", "Sedikit percampuran dalam satu ventrikel"],
    ["Reptilia", "3 ruang · 2 atrium + ventrikel bersekat separa", "Ganda dua tidak lengkap", "Badan → jantung → peparu → jantung → badan", "Sekat separa mengurangkan percampuran; buaya mempunyai 4 ruang"],
    ["Burung & mamalia", "4 ruang · 2 atrium + 2 ventrikel", "Ganda dua lengkap", "Badan → jantung → peparu → jantung → badan", "Septum lengkap: tiada percampuran"],
  ],
  en: [
    ["Fish", "2 chambers · 1 atrium + 1 ventricle", "Single circulation", "Heart → gills → body → heart", "No mixing inside the heart"],
    ["Amphibian", "3 chambers · 2 atria + 1 ventricle", "Incomplete double circulation", "Body → heart → lungs/skin → heart → body", "Some mixing in the single ventricle"],
    ["Reptile", "3 chambers · 2 atria + partly divided ventricle", "Incomplete double circulation", "Body → heart → lungs → heart → body", "Partial septum reduces mixing; crocodiles have 4 chambers"],
    ["Bird & mammal", "4 chambers · 2 atria + 2 ventricles", "Complete double circulation", "Body → heart → lungs → heart → body", "Complete septum: no mixing"],
  ],
} as const;

const bloodGroups = {
  A: { antigen: "A", antibody: "Anti-B", receives: ["A", "O"] },
  B: { antigen: "B", antibody: "Anti-A", receives: ["B", "O"] },
  AB: { antigen: "A + B", antibody: "—", receives: ["A", "B", "AB", "O"] },
  O: { antigen: "—", antibody: "Anti-A + Anti-B", receives: ["O"] },
} as const;
type BloodGroup = keyof typeof bloodGroups;

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-[1.5rem] border border-white/10 bg-slate-950/55 p-4 shadow-[0_18px_60px_rgba(2,6,23,.28)] sm:p-6 ${className}`}>{children}</div>;
}

function SectionTitle({ number, title, subtitle }: { number: string; title: string; subtitle?: string }) {
  return <div className="space-y-2"><span className="inline-flex rounded-full border border-rose-300/25 bg-rose-300/10 px-3 py-1 text-xs font-black tracking-[.16em] text-rose-200">{number}</span><h2 className="font-display text-2xl font-black leading-tight text-white sm:text-3xl">{title}</h2>{subtitle && <p className="max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">{subtitle}</p>}</div>;
}

function Flow({ items, accent = "cyan" }: { items: readonly string[]; accent?: "cyan" | "rose" | "emerald" }) {
  const tone = accent === "rose" ? "border-rose-300/20 bg-rose-300/8 text-rose-50" : accent === "emerald" ? "border-emerald-300/20 bg-emerald-300/8 text-emerald-50" : "border-cyan-300/20 bg-cyan-300/8 text-cyan-50";
  return <div className="flex flex-col gap-2">{items.map((item, index) => <div className="contents" key={item}><div className={`min-h-14 rounded-xl border p-3 text-center text-sm font-bold ${tone}`}>{item}</div>{index < items.length - 1 && <><ArrowDown className="mx-auto h-5 w-5 text-slate-400 "/><ArrowRight className="hidden h-5 w-5 text-slate-400"/></>}</div>)}</div>;
}

function Check({ lang, question, answer }: { lang: Lang; question: string; answer: string }) {
  const [open, setOpen] = useState(false); const t = copy[lang];
  return <div className="rounded-2xl border border-violet-300/20 bg-violet-300/8 p-4"><p className="text-xs font-black uppercase tracking-[.16em] text-violet-200">{t.check}</p><p className="mt-2 text-sm font-semibold text-white">{question}</p><button type="button" aria-expanded={open} onClick={() => setOpen(value => !value)} className="mt-3 min-h-11 rounded-full bg-violet-300 px-4 text-sm font-black text-slate-950 transition-transform duration-200 ease-out hover:scale-[1.03] active:scale-[.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">{open ? t.hide : t.reveal}</button>{open && <p className="mt-3 rounded-xl bg-slate-950/60 p-3 text-sm leading-6 text-violet-100" aria-live="polite">{answer}</p>}</div>;
}

function OrganismScale({ lang }: { lang: Lang }) {
  return <div className="grid gap-4 md:grid-cols-2"><Panel><Microscope className="h-8 w-8 text-cyan-300"/><h3 className="mt-3 font-black text-white">{lang === "bm" ? "Organisma ringkas · unisel" : "Simple organism · unicellular"}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{lang === "bm" ? "Amoeba, Euglena dan Paramecium mempunyai JSTI yang besar. Oksigen, nutrien dan bahan kumuh meresap terus merentasi membran sel." : "Amoeba, Euglena and Paramecium have a large surface-area-to-volume ratio. Oxygen, nutrients and waste diffuse directly across the cell membrane."}</p><div className="mt-4"><Flow items={lang === "bm" ? ["Persekitaran", "Membran sel", "Sel"] : ["Environment", "Cell membrane", "Cell"]}/></div></Panel><Panel><HeartPulse className="h-8 w-8 text-rose-300"/><h3 className="mt-3 font-black text-white">{lang === "bm" ? "Organisma kompleks · multisel" : "Complex organism · multicellular"}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{lang === "bm" ? "Isipadu besar dan jarak ke sel dalaman terlalu jauh. Sistem khusus membekalkan oksigen serta nutrien dan menyingkirkan bahan kumuh toksik." : "Large volume makes internal cells too far from the surface. A specialised system supplies oxygen and nutrients and removes toxic waste."}</p><div className="mt-4"><Flow accent="rose" items={lang === "bm" ? ["Permukaan", "Sistem pengangkutan", "Setiap sel"] : ["Surface", "Transport system", "Every cell"]}/></div></Panel></div>;
}

function VertebrateExplorer({ lang }: { lang: Lang }) {
  const [selected, setSelected] = useState(0); const item = vertebrates[lang][selected];
  return <Panel><div className="grid grid-cols-2 gap-2 lg:grid-cols-4">{vertebrates[lang].map((animal, index) => <button type="button" key={animal[0]} aria-pressed={selected === index} onClick={() => setSelected(index)} className={`min-h-12 rounded-xl px-3 text-xs font-black transition-transform duration-200 ease-out active:scale-[.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${selected === index ? "bg-rose-300 text-rose-950" : "bg-white/5 text-slate-200"}`}>{animal[0]}</button>)}</div><div className="mt-4 grid gap-4 rounded-2xl border border-rose-300/20 bg-rose-300/8 p-4 lg:grid-cols-[.65fr_1.35fr]"><div className="flex items-center justify-center"><div className="relative grid h-40 w-40 grid-cols-2 gap-2 rounded-full border-4 border-rose-300/30 bg-slate-950/60 p-6">{Array.from({ length: selected === 0 ? 2 : selected === 3 ? 4 : 3 }).map((_, index) => <span key={index} className={`rounded-full border ${index % 2 ? "border-cyan-300/40 bg-cyan-300/15" : "border-rose-300/40 bg-rose-300/15"}`}/>)}</div></div><div><p className="text-lg font-black text-white">{item[1]}</p><p className="mt-1 text-sm font-bold text-rose-200">{item[2]}</p><p className="mt-4 rounded-xl bg-slate-950/45 p-3 text-sm font-bold text-slate-100">{item[3]}</p><p className="mt-3 text-xs leading-5 text-slate-300">{item[4]}</p></div></div></Panel>;
}

function HeartJourney({ lang }: { lang: Lang }) {
  const [loop, setLoop] = useState<"pulmonary" | "systemic">("pulmonary");
  const pulmonary = lang === "bm" ? ["Ventrikel kanan", "Arteri pulmonari", "Peparu · CO₂ keluar, O₂ masuk", "Vena pulmonari", "Atrium kiri"] : ["Right ventricle", "Pulmonary artery", "Lungs · CO₂ out, O₂ in", "Pulmonary vein", "Left atrium"];
  const systemic = lang === "bm" ? ["Ventrikel kiri", "Aorta", "Seluruh badan", "Vena kava", "Atrium kanan"] : ["Left ventricle", "Aorta", "Whole body", "Vena cava", "Right atrium"];
  const chambers = lang === "bm" ? [
    ["Atrium kanan", "Menerima darah terdeoksigen melalui vena kava."], ["Atrium kiri", "Menerima darah beroksigen melalui vena pulmonari."],
    ["Ventrikel kanan", "Mengepam darah ke peparu melalui arteri pulmonari."], ["Ventrikel kiri", "Dinding paling tebal; mengepam melalui aorta ke seluruh badan."],
  ] : [
    ["Right atrium", "Receives deoxygenated blood through the vena cava."], ["Left atrium", "Receives oxygenated blood through the pulmonary vein."],
    ["Right ventricle", "Pumps blood to the lungs through the pulmonary artery."], ["Left ventricle", "Thickest wall; pumps through the aorta to the whole body."],
  ];
  return <div className="grid gap-4 lg:grid-cols-[.8fr_1.2fr]"><Panel><div className="grid gap-2 sm:grid-cols-2">{chambers.map((chamber, index) => <div key={chamber[0]} className={`rounded-2xl border p-4 ${index % 2 === 0 ? "border-cyan-300/20 bg-cyan-300/8" : "border-rose-300/20 bg-rose-300/8"}`}><p className="font-black text-white">{chamber[0]}</p><p className="mt-2 text-xs leading-5 text-slate-300">{chamber[1]}</p></div>)}</div><div className="mt-3 rounded-xl bg-white/5 p-3 text-xs leading-5 text-slate-300">{lang === "bm" ? "Injap trikuspid dan bikuspid mengawal aliran antara atrium dengan ventrikel. Injap sabit menghalang aliran balik dari aorta dan arteri pulmonari. Septum memisahkan darah beroksigen dan terdeoksigen." : "The tricuspid and bicuspid valves control flow from atria to ventricles. Semilunar valves prevent backflow from the aorta and pulmonary artery. The septum separates oxygenated and deoxygenated blood."}</div></Panel><Panel><div className="grid grid-cols-2 gap-2"><button type="button" aria-pressed={loop === "pulmonary"} onClick={() => setLoop("pulmonary")} className={`min-h-12 rounded-xl px-3 text-xs font-black ${loop === "pulmonary" ? "bg-cyan-300 text-cyan-950" : "bg-white/5 text-slate-200"}`}>{lang === "bm" ? "Peredaran pulmonari" : "Pulmonary circulation"}</button><button type="button" aria-pressed={loop === "systemic"} onClick={() => setLoop("systemic")} className={`min-h-12 rounded-xl px-3 text-xs font-black ${loop === "systemic" ? "bg-rose-300 text-rose-950" : "bg-white/5 text-slate-200"}`}>{lang === "bm" ? "Peredaran sistemik" : "Systemic circulation"}</button></div><div className="mt-5"><Flow accent={loop === "pulmonary" ? "cyan" : "rose"} items={loop === "pulmonary" ? pulmonary : systemic}/></div><p className="mt-4 text-center text-xs font-bold text-slate-300">{lang === "bm" ? "Darah melalui jantung dua kali dalam satu kitaran lengkap — kurang daripada 1 minit." : "Blood passes through the heart twice in one complete circuit — in under 1 minute."}</p></Panel></div>;
}

function VesselComparison({ lang }: { lang: Lang }) {
  const data = lang === "bm" ? [
    ["Arteri", "Tebal, berotot, elastik", "Kecil", "Tiada", "Keluar dari jantung", "Tinggi · nadi dikesan"],
    ["Kapilari", "Setebal satu sel", "Paling kecil", "Tiada", "Pertukaran dengan sel", "Menurun · sangat perlahan"],
    ["Vena", "Nipis, kurang berotot", "Besar", "Ada", "Kembali ke jantung", "Rendah · tiada nadi"],
  ] : [
    ["Artery", "Thick, muscular, elastic", "Small", "None", "Away from heart", "High · pulse detected"],
    ["Capillary", "One cell thick", "Smallest", "None", "Exchange with cells", "Falling · very slow"],
    ["Vein", "Thin, less muscular", "Large", "Present", "Back to heart", "Low · no pulse"],
  ];
  const [selected, setSelected] = useState(0); const item = data[selected];
  return <Panel><div className="grid grid-cols-3 gap-2">{data.map((vessel, index) => <button type="button" key={vessel[0]} aria-pressed={selected === index} onClick={() => setSelected(index)} className={`min-h-12 rounded-xl text-xs font-black ${selected === index ? "bg-violet-300 text-violet-950" : "bg-white/5 text-slate-200"}`}>{vessel[0]}</button>)}</div><div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">{[
    [lang === "bm" ? "Dinding" : "Wall", item[1]], [lang === "bm" ? "Lumen" : "Lumen", item[2]], [lang === "bm" ? "Injap" : "Valves", item[3]], [lang === "bm" ? "Arah / fungsi" : "Direction / role", item[4]], [lang === "bm" ? "Tekanan" : "Pressure", item[5]],
  ].map(field => <div key={field[0]} className="rounded-xl bg-white/5 p-3"><p className="text-[10px] font-black uppercase tracking-[.12em] text-slate-400">{field[0]}</p><p className="mt-2 text-xs font-bold leading-5 text-white">{field[1]}</p></div>)}</div><p className="mt-3 text-xs leading-5 text-cyan-100">{lang === "bm" ? "Pengecualian: arteri pulmonari membawa darah terdeoksigen; vena pulmonari membawa darah beroksigen." : "Exceptions: the pulmonary artery carries deoxygenated blood; the pulmonary vein carries oxygenated blood."}</p></Panel>;
}

function PulseLab({ lang }: { lang: Lang }) {
  const [activityLevel, setActivityLevel] = useState(0);
  const activities = lang === "bm" ? [["Berehat", "Paling rendah", "Keperluan tenaga rendah"], ["Berjalan secara perlahan", "Meningkat sederhana", "Otot memerlukan lebih O₂"], ["Berlari", "Paling tinggi", "Respirasi dan penyingkiran CO₂ paling cepat"]] : [["Resting", "Lowest", "Low energy demand"], ["Slow walking", "Moderate increase", "Muscles need more O₂"], ["Running", "Highest", "Fastest respiration and CO₂ removal"]];
  const item = activities[activityLevel];
  return <div className="grid gap-4 lg:grid-cols-2"><Panel><div className="flex items-center gap-4"><Activity className={`h-12 w-12 text-rose-300 ${activityLevel === 2 ? "motion-safe:animate-pulse" : ""}`}/><div><p className="text-3xl font-black tabular-nums text-white">120 / 75 <span className="text-sm text-slate-400">mm Hg</span></p><p className="mt-1 text-xs text-slate-300">{lang === "bm" ? "Sistolik: ventrikel mengecut · Diastolik: ventrikel mengendur" : "Systolic: ventricles contract · Diastolic: ventricles relax"}</p></div></div><p className="mt-4 text-xs leading-5 text-slate-400">{lang === "bm" ? "Tekanan darah diukur menggunakan sfigmomanometer. Nadi ialah bilangan denyutan arteri per minit dan boleh dikesan di pergelangan tangan atau leher." : "Blood pressure is measured with a sphygmomanometer. Pulse rate is the number of arterial pulses per minute and can be felt at the wrist or neck."}</p></Panel><Panel><div className="grid grid-cols-3 gap-2">{activities.map((activity, index) => <button type="button" key={activity[0]} onClick={() => setActivityLevel(index)} className={`min-h-11 rounded-xl text-xs font-black ${activityLevel === index ? "bg-rose-300 text-rose-950" : "bg-white/5 text-slate-200"}`}>{activity[0]}</button>)}</div><div className="mt-4 rounded-xl bg-rose-300/8 p-4"><p className="font-black text-white">{item[1]}</p><p className="mt-1 text-xs text-rose-100">{item[2]}</p></div><div className="mt-3 grid grid-cols-3 gap-2 text-center text-[10px] text-slate-300"><span>20: 200 bpm</span><span>40: 180 bpm</span><span>70: 150 bpm</span></div><p className="mt-2 text-xs text-slate-400">{lang === "bm" ? "Nadi maksimum menurun dengan umur. Purata perempuan dewasa 78–82 dpm berbanding lelaki 70–72 dpm kerana saiz jantung purata lebih kecil. Atlet lazimnya mempunyai nadi rehat lebih rendah kerana jantung lebih kuat." : "Maximum pulse falls with age. Adult women average 78–82 bpm versus 70–72 bpm for men because their average heart size is smaller. Athletes usually have a lower resting pulse because their hearts are stronger."}</p></Panel></div>;
}

function BloodComponents({ lang }: { lang: Lang }) {
  const components = lang === "bm" ? [
    ["Plasma · 55%", "Cecair kuning; 90% air. Mengangkut nutrien, gas, enzim, hormon, urea dan asid urik."],
    ["Sel darah merah", "Cakera dwicekung tanpa nukleus; hemoglobin mengangkut oksigen sebagai oksihemoglobin."],
    ["Sel darah putih", "Lebih besar, bernukleus dan bentuk tidak tetap; fagositosis atau menghasilkan antibodi."],
    ["Platlet", "Serpihan sel tanpa nukleus; membekukan darah untuk menutup luka."],
  ] : [
    ["Plasma · 55%", "Yellow liquid; 90% water. Carries nutrients, gases, enzymes, hormones, urea and uric acid."],
    ["Red blood cells", "Biconcave discs without nuclei; haemoglobin carries oxygen as oxyhaemoglobin."],
    ["White blood cells", "Larger, nucleated and irregular; engulf pathogens or produce antibodies."],
    ["Platelets", "Cell fragments without nuclei; clot blood to seal wounds."],
  ];
  return <div className="grid gap-4 lg:grid-cols-[.65fr_1.35fr]"><Panel><div className="mx-auto flex h-72 w-32 flex-col overflow-hidden rounded-b-[2rem] rounded-t-xl border-4 border-slate-400 bg-slate-900"><div className="flex-[55] bg-amber-200/80 p-3 text-center text-xs font-black text-amber-950">{lang === "bm" ? "Plasma 55%" : "Plasma 55%"}</div><div className="h-3 bg-white/75"/><div className="flex-[45] bg-rose-700/80 p-3 text-center text-xs font-black text-white">{lang === "bm" ? "Sel darah 45%" : "Blood cells 45%"}</div></div><p className="mt-3 text-center text-xs text-slate-300">{lang === "bm" ? "Emparan membuktikan darah ialah campuran." : "Centrifugation shows that blood is a mixture."}</p></Panel><div className="grid gap-3 sm:grid-cols-2">{components.map((component, index) => <Panel key={component[0]} className={index === 0 ? "border-amber-300/20" : "border-rose-300/20"}><p className="font-black text-white">{component[0]}</p><p className="mt-2 text-xs leading-5 text-slate-300">{component[1]}</p></Panel>)}</div></div>;
}

function BloodCompatibility({ lang }: { lang: Lang }) {
  const groups = Object.keys(bloodGroups) as BloodGroup[];
  const [donor, setDonor] = useState<BloodGroup>("O"); const [recipient, setRecipient] = useState<BloodGroup>("AB");
  const safe = (bloodGroups[recipient].receives as readonly string[]).includes(donor);
  return <Panel><div className="grid gap-4 lg:grid-cols-2"><div><p className="text-xs font-black uppercase tracking-[.14em] text-slate-400">{lang === "bm" ? "Penderma" : "Donor"}</p><div className="mt-2 grid grid-cols-4 gap-2">{groups.map(group => <button type="button" key={group} aria-pressed={donor === group} onClick={() => setDonor(group)} className={`min-h-12 rounded-xl font-black ${donor === group ? "bg-rose-300 text-rose-950" : "bg-white/5 text-slate-200"}`}>{group}</button>)}</div></div><div><p className="text-xs font-black uppercase tracking-[.14em] text-slate-400">{lang === "bm" ? "Penerima" : "Recipient"}</p><div className="mt-2 grid grid-cols-4 gap-2">{groups.map(group => <button type="button" key={group} aria-pressed={recipient === group} onClick={() => setRecipient(group)} className={`min-h-12 rounded-xl font-black ${recipient === group ? "bg-cyan-300 text-cyan-950" : "bg-white/5 text-slate-200"}`}>{group}</button>)}</div></div></div><div aria-live="polite" className={`mt-5 rounded-2xl border p-4 ${safe ? "border-emerald-300/30 bg-emerald-300/10" : "border-rose-300/30 bg-rose-300/10"}`}><div className="flex items-center gap-3">{safe ? <ShieldCheck className="h-8 w-8 text-emerald-300"/> : <CircleDot className="h-8 w-8 text-rose-300"/>}<div><p className="font-black text-white">{safe ? (lang === "bm" ? "Serasi · transfusi selamat" : "Compatible · safe transfusion") : (lang === "bm" ? "Tidak serasi · penggumpalan" : "Incompatible · agglutination")}</p><p className="mt-1 text-xs leading-5 text-slate-300">{safe ? (lang === "bm" ? `Penerima ${recipient} boleh menerima darah ${donor}.` : `Recipient ${recipient} can receive ${donor} blood.`) : (lang === "bm" ? "Antibodi penerima menyerang antigen penderma; sel darah merah menggumpal dan boleh menyumbat salur darah." : "Recipient antibodies attack donor antigens; red blood cells clump and may block blood vessels.")}</p></div></div></div><div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{groups.map(group => <div key={group} className="rounded-xl bg-white/5 p-3"><p className="font-black text-white">{group}</p><p className="mt-1 text-[10px] text-slate-300">{lang === "bm" ? "Antigen" : "Antigen"}: {bloodGroups[group].antigen}</p><p className="text-[10px] text-slate-300">{lang === "bm" ? "Antibodi" : "Antibody"}: {bloodGroups[group].antibody}</p></div>)}</div><p className="mt-4 text-xs leading-5 text-slate-400">{lang === "bm" ? "Derma darah menyediakan stok untuk pembedahan, kemalangan, leukemia, hemofilia dan anemia. O ialah penderma universal; AB ialah penerima universal. Penderma mesti sihat, berumur 18–60 tahun dan melebihi 45 kg. Natrium sitrat dalam beg darah menghalang pembekuan." : "Blood donation supplies patients in surgery or with trauma, leukaemia, haemophilia and anaemia. O is the universal donor; AB is the universal recipient. Donors must be healthy, aged 18–60 and weigh over 45 kg. Sodium citrate in blood bags prevents clotting."}</p></Panel>;
}

function StomaExplorer({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(true);
  const steps = open ? (lang === "bm" ? ["Cahaya · glukosa meningkat", "Air masuk secara osmosis", "Sel pengawal segah dan membengkok", "Stoma terbuka"] : ["Light · glucose rises", "Water enters by osmosis", "Guard cells become turgid and curve", "Stoma opens"]) : (lang === "bm" ? ["Malam / terlalu panas", "Air keluar secara osmosis", "Sel pengawal flasid dan lurus", "Stoma tertutup"] : ["Night / excessive heat", "Water leaves by osmosis", "Guard cells become flaccid and straight", "Stoma closes"]);
  return <Panel><div className="grid grid-cols-2 gap-2"><button type="button" aria-pressed={open} onClick={() => setOpen(true)} className={`min-h-12 rounded-xl text-xs font-black ${open ? "bg-emerald-300 text-emerald-950" : "bg-white/5 text-slate-200"}`}>{lang === "bm" ? "Siang · terbuka" : "Day · open"}</button><button type="button" aria-pressed={!open} onClick={() => setOpen(false)} className={`min-h-12 rounded-xl text-xs font-black ${!open ? "bg-violet-300 text-violet-950" : "bg-white/5 text-slate-200"}`}>{lang === "bm" ? "Malam / panas · tertutup" : "Night / hot · closed"}</button></div><div className="mt-5 grid items-center gap-5 lg:grid-cols-[.65fr_1.35fr]"><Chapter3ImageLightbox src={open ? stomaDayImage : stomaNightImage} title={chapter3Lesson("stomata").title[lang]} width={764} height={1024} lang={lang} visual="stomata"/><Flow accent="emerald" items={steps}/></div><p className="mt-4 text-xs leading-5 text-slate-400">{lang === "bm" ? "Dinding dalam sel pengawal tebal dan kurang elastik; dinding luar nipis dan lebih elastik. Kebanyakan stoma berada pada epidermis bawah untuk mengurangkan kehilangan air." : "The inner guard-cell wall is thick and less elastic; the outer wall is thin and more elastic. Most stomata are on the lower epidermis to reduce water loss."}</p></Panel>;
}

function TranspirationFactors({ lang }: { lang: Lang }) {
  const factors = lang === "bm" ? [
    ["Keamatan cahaya ↑", "Kadar ↑ hingga maksimum", "Lebih banyak stoma terbuka"], ["Kelembapan udara ↑", "Kadar ↓", "Kecerunan wap air mengecil"],
    ["Pergerakan udara ↑", "Kadar ↑", "Angin menyapu wap air di stoma"], ["Suhu ↑", "Kadar ↑", "Tenaga kinetik dan penyejatan meningkat"],
  ] : [
    ["Light intensity ↑", "Rate ↑ to a maximum", "More stomata open"], ["Air humidity ↑", "Rate ↓", "Water-vapour gradient becomes smaller"],
    ["Air movement ↑", "Rate ↑", "Wind removes vapour around stomata"], ["Temperature ↑", "Rate ↑", "Kinetic energy and evaporation increase"],
  ];
  const [selected, setSelected] = useState(0); const item = factors[selected];
  return <Panel><div className="grid grid-cols-2 gap-2 lg:grid-cols-4">{factors.map((factor, index) => <button type="button" key={factor[0]} aria-pressed={selected === index} onClick={() => setSelected(index)} className={`min-h-12 rounded-xl px-2 text-xs font-black ${selected === index ? "bg-emerald-300 text-emerald-950" : "bg-white/5 text-slate-200"}`}>{factor[0]}</button>)}</div><div className="mt-4 rounded-2xl bg-emerald-300/8 p-4"><p className="text-lg font-black text-white">{item[1]}</p><p className="mt-1 text-sm text-emerald-100">{item[2]}</p></div><p className="mt-3 text-xs text-slate-400">{lang === "bm" ? "Potometer jisim mengukur pengurangan jisim air; potometer gelembung mengukur pergerakan gelembung dalam tiub kapilari." : "A mass potometer measures loss of water mass; a bubble potometer measures bubble movement in a capillary tube."}</p></Panel>;
}

function PlantVascularSystem({ lang }: { lang: Lang }) {
  const [organ, setOrgan] = useState<"leaf" | "stem" | "root">("leaf");
  const distribution = {
    leaf: lang === "bm" ? ["Daun", "Xilem di atas · floem di bawah"] : ["Leaf", "Xylem above · phloem below"],
    stem: lang === "bm" ? ["Batang", "Berkas dalam bulatan · xilem dalam, floem luar"] : ["Stem", "Bundles in a ring · xylem inside, phloem outside"],
    root: lang === "bm" ? ["Akar", "Xilem berbentuk bintang · floem di antara lengannya"] : ["Root", "Star-shaped xylem · phloem between its arms"],
  } as const;
  const item = distribution[organ];
  return <div className="grid gap-4 lg:grid-cols-2"><Panel><div className="grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/8 p-4"><Droplets className="h-8 w-8 text-cyan-300"/><h3 className="mt-3 font-black text-white">{lang === "bm" ? "Xilem" : "Xylem"}</h3><p className="mt-2 text-xs leading-5 text-slate-300">{lang === "bm" ? "Sel mati berongga, dinding tebal berlignin. Air + mineral bergerak sehala ke atas; turut menyokong tumbuhan." : "Hollow dead cells with thick lignified walls. Water + minerals move one way upward; also supports the plant."}</p></div><div className="rounded-2xl border border-amber-300/20 bg-amber-300/8 p-4"><Sprout className="h-8 w-8 text-amber-300"/><h3 className="mt-3 font-black text-white">{lang === "bm" ? "Floem" : "Phloem"}</h3><p className="mt-2 text-xs leading-5 text-slate-300">{lang === "bm" ? "Tiub tapis daripada sel hidup. Sukrosa ditranslokasikan dari daun ke bahagian lain dalam dua arah." : "Sieve tubes made of living cells. Sucrose is translocated from leaves to other parts in both directions."}</p></div></div></Panel><Panel><div className="grid grid-cols-3 gap-2">{(["leaf", "stem", "root"] as const).map(key => <button type="button" key={key} onClick={() => setOrgan(key)} className={`min-h-11 rounded-xl text-xs font-black ${organ === key ? "bg-cyan-300 text-cyan-950" : "bg-white/5 text-slate-200"}`}>{distribution[key][0]}</button>)}</div><Chapter3VascularDiagram organ={organ} lang={lang}/><div className="mt-4 flex min-h-32 items-center justify-center rounded-2xl bg-white/5 p-5 text-center"><p className="font-black text-white">{item[1]}</p></div></Panel></div>;
}

function PlantEvidence({ lang }: { lang: Lang }) {
  const [experiment, setExperiment] = useState<"xylem" | "phloem">("xylem");
  const xylem = lang === "bm" ? ["Pokok keembung berakar", "Larutan eosin merah · 30 minit", "Hiris akar, batang dan daun", "Hanya xilem berwarna merah"] : ["Rooted balsam plant", "Red eosin solution · 30 minutes", "Slice root, stem and leaf", "Only xylem turns red"];
  const phloem = lang === "bm" ? ["Buang gelang kulit kayu + floem", "Xilem dibiarkan utuh", "Sukrosa tidak dapat turun", "Bahagian atas gelang membengkak"] : ["Remove a ring of bark + phloem", "Leave xylem intact", "Sucrose cannot move down", "Stem swells above the ring"];
  return <Panel><div className="grid grid-cols-2 gap-2"><button type="button" onClick={() => setExperiment("xylem")} className={`min-h-12 rounded-xl text-xs font-black ${experiment === "xylem" ? "bg-cyan-300 text-cyan-950" : "bg-white/5 text-slate-200"}`}>{lang === "bm" ? "Laluan air · xilem" : "Water pathway · xylem"}</button><button type="button" onClick={() => setExperiment("phloem")} className={`min-h-12 rounded-xl text-xs font-black ${experiment === "phloem" ? "bg-amber-300 text-amber-950" : "bg-white/5 text-slate-200"}`}>{lang === "bm" ? "Laluan makanan · floem" : "Food pathway · phloem"}</button></div><Chapter3EvidenceDiagram experiment={experiment} lang={lang}/><div className="mt-5"><Flow accent={experiment === "xylem" ? "cyan" : "emerald"} items={experiment === "xylem" ? xylem : phloem}/></div><p className="mt-4 text-xs font-bold text-slate-300">{experiment === "xylem" ? (lang === "bm" ? "Kesimpulan: xilem mengangkut air dan garam mineral dari akar ke daun." : "Conclusion: xylem transports water and mineral salts from roots to leaves.") : (lang === "bm" ? "Kesimpulan: floem mengangkut makanan seperti sukrosa dari daun ke bahagian tumbuhan lain." : "Conclusion: phloem transports food such as sucrose from leaves to other plant parts.")}</p></Panel>;
}

function AnimalPlantComparison({ lang }: { lang: Lang }) {
  const rows = lang === "bm" ? [
    ["Medium", "Darah: plasma + sel darah", "Sap xilem + sap floem"],
    ["Tiub", "Arteri, kapilari, vena · sel hidup", "Xilem mati berlignin + floem hidup"],
    ["Pam", "Jantung aktif + injap", "Tiada pam · tarikan transpirasi, kapilari, tekanan akar"],
    ["Gas respirasi", "O₂ dan CO₂ diangkut dalam darah", "Tidak melalui vaskular · meresap di stoma/lentisel"],
    ["Arah", "Aliran darah dalam kitaran", "Xilem sehala ke atas · floem dua hala"],
  ] : [
    ["Medium", "Blood: plasma + blood cells", "Xylem sap + phloem sap"],
    ["Tubes", "Arteries, capillaries, veins · living cells", "Dead lignified xylem + living phloem"],
    ["Pump", "Active heart + valves", "No pump · transpiration pull, capillarity, root pressure"],
    ["Respiratory gases", "O₂ and CO₂ carried in blood", "Not vascular · diffuse at stomata/lenticels"],
    ["Direction", "Blood flows in a circuit", "Xylem one-way up · phloem both ways"],
  ];
  return <Panel><div className="grid gap-2">{rows.map(row => <div key={row[0]} className="grid gap-2 rounded-xl bg-white/5 p-3 sm:grid-cols-[.55fr_1fr_1fr]"><p className="text-xs font-black uppercase tracking-[.1em] text-slate-400">{row[0]}</p><p className="text-xs leading-5 text-rose-100"><strong className="text-white">{lang === "bm" ? "Haiwan: " : "Animal: "}</strong>{row[1]}</p><p className="text-xs leading-5 text-emerald-100"><strong className="text-white">{lang === "bm" ? "Tumbuhan: " : "Plant: "}</strong>{row[2]}</p></div>)}</div><p className="mt-4 rounded-xl border border-cyan-300/20 bg-cyan-300/8 p-3 text-sm font-bold text-cyan-50">{lang === "bm" ? "Persamaan: kedua-duanya sistem khusus dalam organisma kompleks, mengangkut air, nutrien dan bahan terlarut melalui tiub ke seluruh organisma." : "Similarity: both are specialised systems in complex organisms, transporting water, nutrients and dissolved substances through tubes throughout the organism."}</p></Panel>;
}


function Lesson({ name, lang }: { name: string; lang: Lang }) {
  const item = chapter3Lesson(name);
  if (name === "comparison") return <article data-lesson={name} className="space-y-4">
    <h3 className="text-xl font-bold text-white">{item.title[lang]}</h3>
    <Panel><p className="text-base leading-7 text-slate-200">{item.paragraphs[lang][0]}</p></Panel>
    <h3 className="text-xl font-bold text-white">{lang === "bm" ? "Perbezaan" : "Differences"}</h3>
    <div className="grid gap-3 md:grid-cols-2">{item.paragraphs[lang].slice(1).map((paragraph, index) => <Panel key={index}><p className="text-base leading-7 text-slate-200">{paragraph}</p></Panel>)}</div>
  </article>;
  return <article data-lesson={name} className="space-y-4">
    <h3 className="text-xl font-bold text-white">{item.title[lang]}</h3>
    <div className="grid gap-3 md:grid-cols-2">{item.paragraphs[lang].map((paragraph, index) =>
      <Panel key={index}><p className="text-base leading-7 text-slate-200">{paragraph}</p></Panel>
    )}</div>
  </article>;
}

export function ScienceF3Chapter3VisualNotesBlock({ id, content, lang, isRead, onMarkRead }: { id?: string; content: ScienceF3InteractiveContent; lang: Lang; storageKey?: string; isRead?: boolean; onMarkRead?: () => void }) {
  const t = copy[lang];
  const headings = chapter3Headings[lang];
  const section = (index: number) => content.sections[index];
  return <section id={id} data-lang={lang} data-chapter="3" className="relative mt-8 min-w-0 rounded-[2rem] border border-rose-300/15 bg-[#0c1720] px-4 py-6 text-slate-100 shadow-2xl sm:px-7 lg:px-9 [&_button]:break-words [&_button]:focus-visible:outline [&_button]:focus-visible:outline-2 [&_button]:focus-visible:outline-cyan-300">
    <div className="relative mx-auto flex max-w-6xl flex-col gap-14">
      <header className="rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-rose-400/15 via-slate-950/40 to-emerald-400/15 p-5 sm:p-8">
        <h1 className="font-display text-4xl font-black text-white sm:text-5xl">{t.title}</h1>
        <nav className="mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-5" aria-label={t.title}>
          {headings.map((heading, index) => <a key={heading} href={`#chapter3-section-${index + 1}`} className="flex min-h-12 items-center rounded-xl border border-white/10 bg-white/5 p-4 text-sm font-bold focus-visible:outline focus-visible:outline-cyan-300">{`3.${index + 1} ${heading}`}</a>)}
        </nav>
      </header>

      <div id="chapter3-section-1" data-section="3.1" className="space-y-6">
        <SectionTitle number="3.1" title={headings[0]}/>
        <Lesson name="need" lang={lang}/><OrganismScale lang={lang}/><Lesson name="importance" lang={lang}/>
        <Check lang={lang} question={section(0).checks[0].question} answer={section(0).checks[0].hint}/>
      </div>
      <div id="chapter3-section-2" data-section="3.2" className="space-y-6">
        <SectionTitle number="3.2" title={headings[1]}/>
        <Lesson name="vertebrates" lang={lang}/><VertebrateExplorer lang={lang}/>
        <Lesson name="heart" lang={lang}/><Chapter3HeartDiagram lang={lang}/><HeartJourney lang={lang}/>
        <Lesson name="vessels" lang={lang}/><VesselComparison lang={lang}/>
        <Lesson name="pressure" lang={lang}/><Lesson name="pulse" lang={lang}/><PulseLab lang={lang}/>
        <Check lang={lang} question={section(1).checks[0].question} answer={section(1).checks[0].hint}/>
      </div>
      <div id="chapter3-section-3" data-section="3.3" className="space-y-6">
        <SectionTitle number="3.3" title={headings[2]}/>
        <Lesson name="blood" lang={lang}/><BloodComponents lang={lang}/>
        <Lesson name="abo" lang={lang}/><BloodCompatibility lang={lang}/><Lesson name="donation" lang={lang}/>
        <Check lang={lang} question={section(2).checks[0].question} answer={section(2).checks[0].hint}/>
      </div>
      <div id="chapter3-section-4" data-section="3.4" className="space-y-6">
        <SectionTitle number="3.4" title={headings[3]}/>
        <Lesson name="water" lang={lang}/><Chapter3WaterPath lang={lang}/>
        <Lesson name="stomata" lang={lang}/><StomaExplorer lang={lang}/>
        <Lesson name="guttation" lang={lang}/>
        <Lesson name="factors" lang={lang}/><TranspirationFactors lang={lang}/>
        <Lesson name="vascular" lang={lang}/><PlantVascularSystem lang={lang}/>
        <Lesson name="eosin" lang={lang}/><Lesson name="ringing" lang={lang}/><PlantEvidence lang={lang}/>
        <Check lang={lang} question={section(3).checks[0].question} answer={section(3).checks[0].hint}/>
      </div>
      <div id="chapter3-section-5" data-section="3.5" className="space-y-6">
        <SectionTitle number="3.5" title={headings[4]}/>
        <Lesson name="comparison" lang={lang}/><AnimalPlantComparison lang={lang}/>
        <Check lang={lang} question={section(4).checks[0].question} answer={section(4).checks[0].hint}/>
      </div>
      <details className="rounded-2xl border border-white/10 p-5">
        <summary className="min-h-11 cursor-pointer font-bold">{lang === "bm" ? "Galeri Sains" : "Science Gallery"}</summary>
        <p className="mt-4 text-base leading-7">{lang === "bm"
          ? "Fantastic Voyage (1966): sekumpulan ahli perubatan bersama kapal selam dikecilkan kepada saiz sel darah merah selama satu jam. Mereka disuntik ke dalam sistem peredaran darah Jan Benes untuk menyingkirkan gumpalan darah di otaknya menggunakan laser."
          : "Fantastic Voyage (1966): a medical team and their submarine are reduced to the size of a red blood cell for one hour. They are injected into Jan Benes's circulatory system to remove a blood clot in his brain using a laser."}</p>
        <p className="mt-4 text-base leading-7">{lang === "bm"
          ? "Pada Julai 2017, pakar jantung di Institut Jantung Negara (IJN) berjaya menggantikan aorta pesakit yang rosak dengan aorta buatan manusia."
          : "In July 2017, specialists at the National Heart Institute (IJN) replaced a patient's damaged aorta with an artificial aorta."}</p>
      </details>
      {onMarkRead && <div className="flex justify-center"><button type="button" disabled={isRead} onClick={onMarkRead} className={`inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-3 text-sm font-black ${isRead ? "bg-emerald-300/20 text-emerald-200" : "bg-gradient-to-r from-rose-300 to-emerald-300 text-slate-950"}`}><CheckCircle2 className="h-5 w-5"/>{isRead ? t.marked : t.mark}</button></div>}
    </div>
  </section>;
}
