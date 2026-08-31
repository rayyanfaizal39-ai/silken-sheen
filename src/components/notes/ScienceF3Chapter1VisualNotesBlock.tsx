import { useState } from "react";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  Brain,
  CheckCircle2,
  ChevronRight,
  Droplets,
  Ear,
  Eye,
  Hand,
  Leaf,
  Shield,
  Sun,
  Volume2,
  Waves,
  Zap,
} from "lucide-react";
import type { ScienceF3InteractiveContent } from "@/content/form3/science/interactive-types";

type Lang = "en" | "bm";

const copy = {
  bm: {
    eyebrow: "Peta visual Bab 1",
    title: "Fahami bagaimana rangsangan menjadi gerak balas",
    subtitle: "Ikuti rangsangan daripada organ deria ke sistem saraf, kemudian lihat bagaimana manusia, tumbuhan dan haiwan menghasilkan gerak balas untuk terus hidup.",
    roadmap: [
      ["1.1 Sistem Saraf Manusia", "Bagaimana otak, saraf tunjang dan saraf periferi mengesan rangsangan lalu menyelaras gerak balas."],
      ["1.2 Rangsangan & Gerak Balas dalam Manusia", "Bagaimana lima organ deria menerima cahaya, bunyi, bahan kimia dan sentuhan."],
      ["1.3 Rangsangan & Gerak Balas dalam Tumbuhan", "Bagaimana tumbuhan bertindak balas terhadap cahaya, graviti, air dan sentuhan."],
      ["1.4 Kepentingan Gerak Balas dalam Haiwan", "Bagaimana penglihatan, pendengaran dan organ deria khas membantu haiwan terus hidup."],
    ],
    check: "Uji diri", reveal: "Lihat jawapan", hide: "Tutup jawapan", mark: "Tandakan Bab 1 Selesai", marked: "Selesai ditanda",
  },
  en: {
    eyebrow: "Chapter 1 visual map",
    title: "Understand how a stimulus becomes a response",
    subtitle: "Follow a stimulus from the sensory organs to the nervous system, then see how humans, plants and animals respond in order to survive.",
    roadmap: [
      ["1.1 Human Nervous System", "How the brain, spinal cord and peripheral nerves detect stimuli and coordinate responses."],
      ["1.2 Stimuli & Responses in Humans", "How the five sensory organs receive light, sound, chemicals and touch."],
      ["1.3 Stimuli & Responses in Plants", "How plants respond to light, gravity, water and touch."],
      ["1.4 Importance of Responses in Animals", "How vision, hearing and special sensory organs help animals survive."],
    ],
    check: "Check yourself", reveal: "Reveal answer", hide: "Hide answer", mark: "Mark Chapter 1 as Read", marked: "Marked as read",
  },
} as const;

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-[1.5rem] border border-white/10 bg-slate-950/55 p-4 shadow-[0_18px_60px_rgba(2,6,23,.28)] sm:p-6 ${className}`}>{children}</div>;
}

function SectionTitle({ number, title, subtitle }: { number: string; title: string; subtitle?: string }) {
  return <div className="space-y-2"><span className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-black tracking-[.16em] text-cyan-200">{number}</span><h2 className="font-display text-2xl font-black leading-tight text-white sm:text-3xl">{title}</h2>{subtitle && <p className="max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">{subtitle}</p>}</div>;
}

function Flow({ items, accent = "cyan" }: { items: readonly string[]; accent?: "cyan" | "violet" | "emerald" | "amber" }) {
  const tone = accent === "violet" ? "border-violet-300/20 bg-violet-300/8 text-violet-50" : accent === "emerald" ? "border-emerald-300/20 bg-emerald-300/8 text-emerald-50" : accent === "amber" ? "border-amber-300/20 bg-amber-300/8 text-amber-50" : "border-cyan-300/20 bg-cyan-300/8 text-cyan-50";
  return <div className="grid gap-2 sm:grid-flow-col sm:auto-cols-fr sm:items-center">{items.map((item, index) => <div className="contents" key={`${item}-${index}`}><div className={`flex min-h-14 items-center justify-center rounded-xl border p-3 text-center text-xs font-bold sm:text-sm ${tone}`}>{item}</div>{index < items.length - 1 && <><ArrowDown className="mx-auto h-5 w-5 text-slate-400 sm:hidden"/><ArrowRight className="hidden h-5 w-5 text-slate-400 sm:block"/></>}</div>)}</div>;
}

function Check({ lang, question, answer }: { lang: Lang; question: string; answer: string }) {
  const [open, setOpen] = useState(false); const t = copy[lang];
  return <div className="rounded-2xl border border-violet-300/20 bg-violet-300/8 p-4"><p className="text-xs font-black uppercase tracking-[.16em] text-violet-200">{t.check}</p><p className="mt-2 text-sm font-semibold text-white">{question}</p><button type="button" aria-expanded={open} onClick={() => setOpen(value => !value)} className="mt-3 min-h-11 rounded-full bg-violet-300 px-4 text-sm font-black text-slate-950 transition-transform duration-200 ease-out hover:scale-[1.03] active:scale-[.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white motion-reduce:transition-none">{open ? t.hide : t.reveal}</button>{open && <p className="mt-3 rounded-xl bg-slate-950/60 p-3 text-sm leading-6 text-violet-100" aria-live="polite">{answer}</p>}</div>;
}

function NervousSystemMap({ lang }: { lang: Lang }) {
  const [action, setAction] = useState<"voluntary" | "reflex" | "automatic">("voluntary");
  type ActionDetail = readonly [string, string, string, readonly string[]];
  const data: Record<typeof action, ActionDetail> = lang === "bm" ? {
    voluntary: ["Tindakan terkawal", "Dikawal secara sedar oleh otak", "Membaca · menulis · berjalan", ["Rangsangan", "Afektor", "Impuls saraf", "Otak", "Impuls saraf", "Efektor", "Gerak balas"]],
    reflex: ["Tindakan refleks", "Pantas dan dikawal oleh saraf tunjang", "Tarik tangan daripada objek panas", ["Rangsangan", "Reseptor", "Neuron deria", "Saraf tunjang", "Neuron motor", "Efektor", "Gerak balas"]],
    automatic: ["Tindakan luar kawal", "Automatik dan dikawal medula oblongata", "Denyutan jantung · pernafasan · peristalsis", ["Perubahan badan", "Reseptor", "Medula oblongata", "Efektor", "Gerak balas automatik"]],
  } : {
    voluntary: ["Voluntary action", "Consciously controlled by the brain", "Reading · writing · walking", ["Stimulus", "Affector", "Nerve impulse", "Brain", "Nerve impulse", "Effector", "Response"]],
    reflex: ["Reflex action", "Fast and controlled by the spinal cord", "Withdraw a hand from a hot object", ["Stimulus", "Receptor", "Sensory neurone", "Spinal cord", "Motor neurone", "Effector", "Response"]],
    automatic: ["Involuntary action", "Automatic and controlled by the medulla oblongata", "Heartbeat · breathing · peristalsis", ["Body change", "Receptor", "Medulla oblongata", "Effector", "Automatic response"]],
  };
  const selected = data[action];
  const labels = lang === "bm" ? [["voluntary", "Terkawal"], ["reflex", "Refleks"], ["automatic", "Automatik"]] : [["voluntary", "Voluntary"], ["reflex", "Reflex"], ["automatic", "Automatic"]];
  return <div className="grid gap-4 lg:grid-cols-[.68fr_1.32fr]"><Panel><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1"><div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/8 p-4"><Brain className="h-8 w-8 text-cyan-300"/><p className="mt-3 font-black text-white">{lang === "bm" ? "Sistem Saraf Pusat" : "Central Nervous System"}</p><p className="mt-1 text-xs leading-5 text-slate-300">{lang === "bm" ? "Otak + saraf tunjang · pusat tafsiran dan koordinasi." : "Brain + spinal cord · the interpretation and coordination centre."}</p></div><div className="rounded-2xl border border-violet-300/20 bg-violet-300/8 p-4"><Activity className="h-8 w-8 text-violet-300"/><p className="mt-3 font-black text-white">{lang === "bm" ? "Sistem Saraf Periferi" : "Peripheral Nervous System"}</p><p className="mt-1 text-xs leading-5 text-slate-300">{lang === "bm" ? "12 pasang saraf kranium + 31 pasang saraf spina menghubungkan pusat kawalan dengan seluruh badan." : "12 pairs of cranial nerves + 31 pairs of spinal nerves link the control centre to the whole body."}</p></div></div></Panel><Panel><div className="grid grid-cols-3 gap-2">{labels.map(([id, label]) => <button key={id} type="button" aria-pressed={action === id} onClick={() => setAction(id as typeof action)} className={`min-h-12 rounded-xl px-2 text-xs font-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${action === id ? "bg-cyan-300 text-cyan-950" : "bg-white/5 text-slate-200"}`}>{label}</button>)}</div><div className="mt-5"><p className="text-lg font-black text-white">{selected[0]}</p><p className="mt-1 text-sm text-cyan-100">{selected[1]}</p><p className="mt-2 text-xs text-slate-400">{selected[2]}</p><div className="mt-5"><Flow items={selected[3]}/></div></div></Panel></div>;
}

function ReactionLab({ lang }: { lang: Lang }) {
  const [fast, setFast] = useState(true); const [bright, setBright] = useState(true);
  return <div className="grid gap-4 md:grid-cols-2"><Panel><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[.14em] text-amber-200">{lang === "bm" ? "Aktiviti 1.1 · masa gerak balas" : "Activity 1.1 · response time"}</p><h3 className="mt-2 font-black text-white">{lang === "bm" ? "Tangkap pembaris jatuh" : "Catch the falling ruler"}</h3></div><Zap className="h-8 w-8 shrink-0 text-amber-300"/></div><button type="button" onClick={() => setFast(value => !value)} className="mt-4 min-h-11 w-full rounded-xl bg-amber-300 px-4 text-xs font-black text-amber-950">{lang === "bm" ? "Ubah masa tindak balas" : "Change response time"}</button><div className="relative mx-auto mt-4 h-40 w-12 rounded-lg border border-white/20 bg-white/5"><div className={`absolute inset-x-1 h-8 rounded bg-amber-300 transition-transform duration-500 ease-out motion-reduce:transition-none ${fast ? "translate-y-5" : "translate-y-24"}`}/></div><p className="mt-3 text-center text-xs leading-5 text-slate-300">{fast ? (lang === "bm" ? "Jarak jatuh pendek → gerak balas lebih cepat" : "Short fall distance → faster response") : (lang === "bm" ? "Jarak jatuh panjang → gerak balas lebih lambat" : "Long fall distance → slower response")}</p><p className="mt-2 text-xs text-slate-500">{lang === "bm" ? "Usain Bolt: 0.155 s · bawah 0.1 s dianggap false start." : "Usain Bolt: 0.155 s · below 0.1 s is treated as a false start."}</p></Panel><Panel><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[.14em] text-cyan-200">{lang === "bm" ? "Aktiviti 1.3 · saiz pupil" : "Activity 1.3 · pupil size"}</p><h3 className="mt-2 font-black text-white">{bright ? (lang === "bm" ? "Cahaya terang" : "Bright light") : (lang === "bm" ? "Cahaya malap" : "Dim light")}</h3></div><Sun className={`h-8 w-8 shrink-0 ${bright ? "text-amber-300" : "text-slate-500"}`}/></div><button type="button" aria-pressed={bright} onClick={() => setBright(value => !value)} className="mt-4 min-h-11 w-full rounded-xl bg-cyan-300 px-4 text-xs font-black text-cyan-950">{lang === "bm" ? "Tukar keamatan cahaya" : "Change light intensity"}</button><div className="mx-auto mt-6 flex h-40 w-40 items-center justify-center rounded-full border-8 border-slate-300 bg-cyan-600"><div className={`rounded-full bg-slate-950 transition-[width,height] duration-300 ease-out motion-reduce:transition-none ${bright ? "h-10 w-10" : "h-24 w-24"}`}/></div><p className="mt-3 text-center text-xs leading-5 text-slate-300">{bright ? (lang === "bm" ? "Pupil mengecil → kurang cahaya masuk, retina dilindungi" : "Pupil constricts → less light enters, protecting the retina") : (lang === "bm" ? "Pupil membesar → lebih banyak cahaya masuk" : "Pupil dilates → more light enters")}</p></Panel></div>;
}

function SensoryExplorer({ lang }: { lang: Lang }) {
  const senses = lang === "bm" ? [
    ["Mata", "Cahaya", "Kornea membias; kanta memfokus; rod mengesan keamatan, kon merah/hijau/biru mengesan warna."],
    ["Telinga", "Bunyi + keseimbangan", "Osikel menguatkan getaran; koklea menukarnya kepada impuls; salur separuh bulat mengawal keseimbangan."],
    ["Hidung", "Bahan kimia udara", "Kira-kira 10 juta sel deria bau mengesan bahan kimia yang larut dalam mukus."],
    ["Lidah", "Bahan kimia makanan", "Tunas rasa pada papila mengesan manis, masin, masam, pahit dan umami selepas larut dalam air liur."],
    ["Kulit", "Sentuhan", "Reseptor sakit, sejuk, haba, sentuhan dan tekanan terletak pada kedalaman berbeza."],
  ] : [
    ["Eye", "Light", "The cornea refracts; lens focuses; rods detect intensity while red/green/blue cones detect colour."],
    ["Ear", "Sound + balance", "Ossicles amplify vibrations; the cochlea converts them to impulses; semicircular canals control balance."],
    ["Nose", "Airborne chemicals", "About 10 million smell sensory cells detect chemicals dissolved in mucus."],
    ["Tongue", "Food chemicals", "Taste buds on papillae detect sweet, salty, sour, bitter and umami after chemicals dissolve in saliva."],
    ["Skin", "Touch", "Pain, cold, heat, touch and pressure receptors lie at different depths."],
  ];
  const [selected, setSelected] = useState(0); const icons = [Eye, Ear, Waves, Droplets, Hand]; const Icon = icons[selected];
  return <Panel><div className="grid grid-cols-5 gap-2">{senses.map((sense, index) => <button key={sense[0]} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)} className={`min-h-12 rounded-xl px-1 text-[10px] font-black sm:text-xs ${selected === index ? "bg-violet-300 text-violet-950" : "bg-white/5 text-slate-200"}`}>{sense[0]}</button>)}</div><div className="mt-5 grid gap-4 sm:grid-cols-[.45fr_1.55fr]"><div className="flex min-h-36 items-center justify-center rounded-2xl bg-violet-300/8"><Icon className="h-20 w-20 text-violet-300"/></div><div className="rounded-2xl border border-violet-300/15 bg-white/[.03] p-4"><p className="text-xs font-black uppercase tracking-[.14em] text-violet-200">{senses[selected][1]}</p><h3 className="mt-2 text-xl font-black text-white">{senses[selected][0]}</h3><p className="mt-3 text-sm leading-6 text-slate-300">{senses[selected][2]}</p></div></div></Panel>;
}

function SightAndHearing({ lang }: { lang: Lang }) {
  const [path, setPath] = useState<"sight" | "hearing">("sight");
  const sight = lang === "bm" ? ["Sinar cahaya", "Kornea", "Gelemair", "Kanta mata", "Gelemaca", "Retina", "Saraf optik", "Otak"] : ["Light rays", "Cornea", "Aqueous humour", "Eye lens", "Vitreous humour", "Retina", "Optic nerve", "Brain"];
  const hearing = lang === "bm" ? ["Sumber bunyi", "Cuping telinga", "Salur telinga", "Gegendang", "Osikel", "Jendela bujur", "Koklea", "Saraf auditori", "Otak"] : ["Sound source", "Pinna", "Ear canal", "Eardrum", "Ossicles", "Oval window", "Cochlea", "Auditory nerve", "Brain"];
  return <Panel><div className="grid grid-cols-2 gap-2"><button type="button" onClick={() => setPath("sight")} className={`min-h-12 rounded-xl text-xs font-black ${path === "sight" ? "bg-cyan-300 text-cyan-950" : "bg-white/5 text-slate-200"}`}>{lang === "bm" ? "Mekanisme penglihatan" : "Mechanism of sight"}</button><button type="button" onClick={() => setPath("hearing")} className={`min-h-12 rounded-xl text-xs font-black ${path === "hearing" ? "bg-amber-300 text-amber-950" : "bg-white/5 text-slate-200"}`}>{lang === "bm" ? "Mekanisme pendengaran" : "Mechanism of hearing"}</button></div><div className="mt-5"><Flow accent={path === "sight" ? "cyan" : "amber"} items={path === "sight" ? sight : hearing}/></div><p className="mt-4 text-xs leading-5 text-slate-400">{path === "sight" ? (lang === "bm" ? "Retina menghasilkan imej nyata, songsang dan lebih kecil; otak mentafsirkannya sebagai imej tegak." : "The retina forms a real, inverted and diminished image; the brain interprets it as upright.") : (lang === "bm" ? "Koklea menukarkan getaran kepada impuls saraf sebelum otak mentafsirkannya sebagai bunyi." : "The cochlea converts vibrations into nerve impulses before the brain interprets them as sound.")}</p></Panel>;
}

function SensoryLimits({ lang }: { lang: Lang }) {
  const [defect, setDefect] = useState(0);
  const defects = lang === "bm" ? [
    ["Rabun jauh", "Imej objek jauh jatuh di hadapan retina", "Bebola mata panjang / kanta terlalu tebal", "Kanta cekung"],
    ["Rabun dekat", "Imej objek dekat jatuh di belakang retina", "Bebola mata pendek / kanta terlalu nipis", "Kanta cembung"],
    ["Astigmatisme", "Sebahagian imej kabur", "Kelengkungan kornea atau kanta tidak sekata", "Kanta silinder"],
  ] : [
    ["Short-sightedness", "A distant object's image falls in front of the retina", "Eyeball too long / lens too thick", "Concave lens"],
    ["Long-sightedness", "A near object's image falls behind the retina", "Eyeball too short / lens too thin", "Convex lens"],
    ["Astigmatism", "Part of the image appears blurred", "Uneven curvature of the cornea or lens", "Cylindrical lens"],
  ];
  return <div className="grid gap-4 lg:grid-cols-[1.2fr_.8fr]"><Panel><div className="flex gap-2 overflow-x-auto pb-2">{defects.map((item, index) => <button key={item[0]} type="button" aria-pressed={defect === index} onClick={() => setDefect(index)} className={`min-h-11 shrink-0 rounded-full px-4 text-xs font-black ${defect === index ? "bg-rose-300 text-rose-950" : "bg-white/5 text-slate-200"}`}>{item[0]}</button>)}</div><div className="mt-4 grid gap-3 sm:grid-cols-3">{defects[defect].slice(1).map((value, index) => <div key={value} className="rounded-xl bg-white/5 p-3"><p className="text-[10px] font-black uppercase tracking-[.12em] text-slate-500">{lang === "bm" ? ["Kesan", "Punca", "Pembetulan"][index] : ["Effect", "Cause", "Correction"][index]}</p><p className={`mt-2 text-xs font-bold ${index === 2 ? "text-emerald-200" : "text-slate-200"}`}>{value}</p></div>)}</div></Panel><Panel><Volume2 className="h-8 w-8 text-amber-300"/><h3 className="mt-3 font-black text-white">{lang === "bm" ? "Had deria" : "Sensory limits"}</h3><p className="mt-3 text-sm leading-6 text-slate-300">{lang === "bm" ? "Pendengaran manusia: 20 Hz–20 000 Hz. Penuaan mengurangkan kekenyalan gegendang dan mengecilkan julat ini." : "Human hearing: 20 Hz–20,000 Hz. Ageing reduces eardrum elasticity and narrows this range."}</p><p className="mt-3 text-xs leading-5 text-slate-400">{lang === "bm" ? "Bintik buta tiada rod atau kon. Ilusi optik berlaku apabila otak tersalah tafsir maklumat visual." : "The blind spot has no rods or cones. An optical illusion occurs when the brain misinterprets visual information."}</p></Panel></div>;
}

function TropismExplorer({ lang }: { lang: Lang }) {
  const items = lang === "bm" ? [
    ["Fototropisme", "Cahaya", "Pucuk: positif · akar: negatif", "Pucuk mendapat cahaya untuk fotosintesis."],
    ["Geotropisme", "Graviti", "Akar: positif · pucuk: negatif", "Akar mencengkam tanah; pucuk menuju cahaya."],
    ["Hidrotropisme", "Air", "Akar: positif", "Akar mencapai air untuk fotosintesis dan pengangkutan."],
    ["Tigmotropisme", "Sentuhan", "Sulur: positif · akar: negatif terhadap halangan", "Sulur berpaut untuk sokongan."],
  ] : [
    ["Phototropism", "Light", "Shoot: positive · root: negative", "The shoot gains light for photosynthesis."],
    ["Geotropism", "Gravity", "Root: positive · shoot: negative", "Roots anchor the plant; shoots reach light."],
    ["Hydrotropism", "Water", "Root: positive", "Roots reach water for photosynthesis and transport."],
    ["Thigmotropism", "Touch", "Tendril: positive · root: negative to obstacles", "Tendrils coil around support."],
  ];
  const [selected, setSelected] = useState(0); const item = items[selected];
  return <Panel><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{items.map((entry, index) => <button key={entry[0]} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)} className={`min-h-12 rounded-xl px-2 text-xs font-black ${selected === index ? "bg-emerald-300 text-emerald-950" : "bg-white/5 text-slate-200"}`}>{entry[0]}</button>)}</div><div className="mt-5 grid gap-4 sm:grid-cols-[.55fr_1.45fr]"><div className="relative flex min-h-52 items-center justify-center overflow-hidden rounded-2xl bg-emerald-950/50"><div className={`absolute h-36 w-2 origin-bottom rounded-full bg-emerald-300 transition-transform duration-500 ease-out motion-reduce:transition-none ${selected === 0 ? "rotate-[28deg]" : selected === 3 ? "rotate-[-30deg]" : "rotate-0"}`}/><Leaf className="relative h-20 w-20 text-emerald-300"/>{selected === 0 && <Sun className="absolute right-5 top-5 h-9 w-9 text-amber-300"/>}{selected === 2 && <Droplets className="absolute bottom-4 right-5 h-9 w-9 text-cyan-300"/>}</div><div><p className="text-xs font-black uppercase tracking-[.14em] text-emerald-200">{item[1]}</p><h3 className="mt-2 text-xl font-black text-white">{item[0]}</h3><p className="mt-3 rounded-xl bg-white/5 p-3 text-sm font-bold text-slate-200">{item[2]}</p><p className="mt-3 text-sm leading-6 text-slate-300">{item[3]}</p></div></div></Panel>;
}

function PlantComparison({ lang }: { lang: Lang }) {
  return <div className="grid gap-4 md:grid-cols-2"><Panel><Leaf className="h-8 w-8 text-emerald-300"/><h3 className="mt-3 text-lg font-black text-white">{lang === "bm" ? "Tropisme" : "Tropism"}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{lang === "bm" ? "Gerak balas pertumbuhan terarah. Bergantung pada arah rangsangan dan berlaku perlahan kerana melibatkan pertumbuhan sel." : "A directional growth response. It depends on stimulus direction and is slow because cell growth is involved."}</p></Panel><Panel><Hand className="h-8 w-8 text-violet-300"/><h3 className="mt-3 text-lg font-black text-white">{lang === "bm" ? "Gerak balas nastik" : "Nastic response"}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{lang === "bm" ? "Tidak bergantung pada arah rangsangan dan lebih cepat. Daun pokok semalu menguncup apabila disentuh sebagai pertahanan." : "It does not depend on stimulus direction and is faster. Mimosa leaves fold when touched as a defence."}</p></Panel></div>;
}

function AnimalVision({ lang }: { lang: Lang }) {
  const [stereo, setStereo] = useState(true);
  const facts = stereo ? (lang === "bm" ? ["Mata di hadapan", "Pertindihan besar · imej 3D", "Anggar jarak dan kedalaman dengan tepat", "Medan keseluruhan lebih sempit", "Pemangsa: kucing, harimau, burung hantu"] : ["Eyes at the front", "Large overlap · 3D image", "Judges distance and depth accurately", "Narrower total field", "Predators: cat, tiger, owl"]) : (lang === "bm" ? ["Mata di sisi kepala", "Pertindihan kecil · imej 2D", "Anggaran kedalaman kurang tepat", "Medan sangat luas, hampir 360°", "Mangsa: arnab, kambing, ayam"] : ["Eyes at the sides", "Small overlap · 2D image", "Less accurate depth judgement", "Very wide field, nearly 360°", "Prey: rabbit, goat, chicken"]);
  return <Panel><div className="grid grid-cols-2 gap-2"><button type="button" aria-pressed={stereo} onClick={() => setStereo(true)} className={`min-h-12 rounded-xl text-xs font-black ${stereo ? "bg-cyan-300 text-cyan-950" : "bg-white/5 text-slate-200"}`}>{lang === "bm" ? "Penglihatan stereoskopik" : "Stereoscopic vision"}</button><button type="button" aria-pressed={!stereo} onClick={() => setStereo(false)} className={`min-h-12 rounded-xl text-xs font-black ${!stereo ? "bg-amber-300 text-amber-950" : "bg-white/5 text-slate-200"}`}>{lang === "bm" ? "Penglihatan monokular" : "Monocular vision"}</button></div><div className="mt-5 grid gap-4 lg:grid-cols-[.55fr_1.45fr]"><div className="relative flex min-h-48 items-center justify-center rounded-2xl bg-white/5"><div className={`h-28 w-28 rounded-[45%] border-4 border-slate-500 bg-slate-800 transition-transform duration-300 motion-reduce:transition-none ${stereo ? "scale-x-90" : "scale-x-110"}`}><div className={`absolute top-16 flex gap-9 ${stereo ? "left-1/2 -translate-x-1/2" : "left-1/2 -translate-x-1/2 gap-20"}`}><Eye className="h-8 w-8 text-cyan-300"/><Eye className="h-8 w-8 text-cyan-300"/></div></div></div><div className="grid gap-2 sm:grid-cols-2">{facts.map(fact => <p key={fact} className="rounded-xl bg-white/5 p-3 text-xs font-bold leading-5 text-slate-200">{fact}</p>)}</div></div></Panel>;
}

function AnimalSenses({ lang }: { lang: Lang }) {
  const animals = lang === "bm" ? [
    ["Ikan · garis lateral", "Mengesan getaran, tekanan dan arus air untuk navigasi, memburu dan mengelak pemangsa."],
    ["Feromon", "Isyarat kimia untuk menunjukkan makanan, menarik pasangan atau memberi amaran bahaya."],
    ["Belut elektrik", "Medan elektrik mengesan halangan dan mangsa serta membantu komunikasi dan pertahanan."],
  ] : [
    ["Fish · lateral line", "Detects vibrations, pressure and water currents for navigation, hunting and predator avoidance."],
    ["Pheromones", "Chemical signals mark food routes, attract mates or warn of danger."],
    ["Electric eel", "An electric field detects obstacles and prey and supports communication and defence."],
  ];
  const ranges = lang === "bm" ? ["Manusia · 20–20 000 Hz", "Gajah · 16–12 000 Hz", "Anjing · 67–45 000 Hz", "Dolfin · 40–100 000 Hz", "Kelawar · 2 000–110 000 Hz"] : ["Human · 20–20,000 Hz", "Elephant · 16–12,000 Hz", "Dog · 67–45,000 Hz", "Dolphin · 40–100,000 Hz", "Bat · 2,000–110,000 Hz"];
  return <div className="grid gap-4 lg:grid-cols-[1.15fr_.85fr]"><Panel><div className="flex items-center gap-3"><Ear className="h-8 w-8 text-cyan-300"/><div><h3 className="font-black text-white">{lang === "bm" ? "Pendengaran stereofonik" : "Stereophonic hearing"}</h3><p className="text-xs text-slate-400">{lang === "bm" ? "Dua telinga menentukan arah bunyi" : "Two ears locate a sound"}</p></div></div><Flow items={lang === "bm" ? ["Bunyi tiba lebih awal dan kuat pada telinga dekat", "Otak membandingkan masa + keamatan", "Arah sumber dikenal pasti"] : ["Sound arrives earlier and louder at the nearer ear", "Brain compares time + intensity", "Source direction is located"]}/><div className="mt-4 grid gap-2 sm:grid-cols-2">{ranges.map(range => <p key={range} className="rounded-xl bg-cyan-300/8 p-3 text-xs font-bold text-cyan-100">{range}</p>)}</div></Panel><div className="grid gap-3">{animals.map((animal, index) => <Panel key={animal[0]} className="p-4 sm:p-4">{index === 0 ? <Waves className="h-6 w-6 text-cyan-300"/> : index === 1 ? <Shield className="h-6 w-6 text-violet-300"/> : <Zap className="h-6 w-6 text-amber-300"/>}<h3 className="mt-2 text-sm font-black text-white">{animal[0]}</h3><p className="mt-1 text-xs leading-5 text-slate-300">{animal[1]}</p></Panel>)}</div></div>;
}

export function ScienceF3Chapter1VisualNotesBlock({ id, content, lang, isRead, onMarkRead }: { id?: string; content: ScienceF3InteractiveContent; lang: Lang; storageKey?: string; isRead?: boolean; onMarkRead?: () => void }) {
  const t = copy[lang]; const section = (index: number) => content.sections[index];
  return <section id={id} data-lang={lang} className="relative mt-8 min-w-0 overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-[#091725] px-4 py-6 text-slate-100 shadow-2xl sm:px-7 lg:px-9"><div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_18%_14%,rgba(34,211,238,.18),transparent_38%),radial-gradient(circle_at_82%_18%,rgba(139,92,246,.16),transparent_34%)]"/><div className="relative mx-auto flex max-w-6xl flex-col gap-14">
    <header className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-cyan-400/15 via-slate-950/40 to-violet-400/15 p-5 sm:p-8"><div className="flex items-center gap-2 text-xs font-black uppercase tracking-[.2em] text-cyan-200"><Brain className="h-4 w-4"/>{t.eyebrow}</div><h1 className="mt-3 max-w-4xl font-display text-4xl font-black leading-[1.02] text-white sm:text-5xl">{t.title}</h1><p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">{t.subtitle}</p><div className="mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-4">{t.roadmap.map((item, index) => <div key={item[0]} className="relative min-h-44 rounded-2xl border border-white/10 bg-white/5 p-4"><span className="text-xs font-black tracking-[.14em] text-cyan-300">{String(index + 1).padStart(2, "0")}</span><h2 className="mt-2 text-sm font-black leading-5 text-white">{item[0]}</h2><p className="mt-2 text-xs leading-5 text-slate-300">{item[1]}</p>{index < 3 && <ChevronRight className="absolute -right-5 top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 rounded-full border border-violet-300/30 bg-[#091725] p-1 text-violet-300 xl:block"/>}</div>)}</div></header>

    <div className="space-y-6"><SectionTitle number="1.1" title={lang === "bm" ? "Jejaki impuls dari rangsangan kepada gerak balas" : "Trace an impulse from stimulus to response"} subtitle={lang === "bm" ? "Sistem saraf pusat mentafsir dan menyelaras; sistem saraf periferi membawa impuls ke dan dari seluruh badan." : "The central nervous system interprets and coordinates; the peripheral nervous system carries impulses to and from the whole body."}/><NervousSystemMap lang={lang}/><ReactionLab lang={lang}/><Check lang={lang} question={section(0)?.checks[0]?.question ?? ""} answer={section(0)?.checks[0]?.hint ?? ""}/></div>

    <div className="space-y-6"><SectionTitle number="1.2" title={lang === "bm" ? "Lima organ deria menukar rangsangan kepada impuls" : "Five sensory organs convert stimuli into impulses"} subtitle={lang === "bm" ? "Teroka reseptor, laluan penglihatan dan pendengaran, kemudian hubungkan kecacatan dengan pembetulannya." : "Explore receptors and the sight and hearing pathways, then connect defects with their corrections."}/><SensoryExplorer lang={lang}/><SightAndHearing lang={lang}/><SensoryLimits lang={lang}/><div className="grid gap-4 md:grid-cols-2"><Panel><h3 className="font-black text-white">{lang === "bm" ? "Kepekaan kulit" : "Skin sensitivity"}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{lang === "bm" ? "Lebih banyak reseptor + epidermis lebih nipis = lebih peka. Hujung jari sesuai untuk Braille; siku dan tapak kaki kurang peka." : "More receptors + a thinner epidermis = greater sensitivity. Fingertips suit Braille; elbows and soles are less sensitive."}</p></Panel><Panel><h3 className="font-black text-white">{lang === "bm" ? "Rasa bekerjasama dengan bau" : "Taste works with smell"}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{lang === "bm" ? "Selesema menghalang bahan kimia mencapai reseptor bau, jadi makanan terasa tawar. Makanan panas membebaskan lebih banyak molekul aroma." : "A cold blocks chemicals from reaching smell receptors, so food tastes bland. Hot food releases more aroma molecules."}</p></Panel></div><Check lang={lang} question={section(1)?.checks[0]?.question ?? ""} answer={section(1)?.checks[0]?.hint ?? ""}/></div>

    <div className="space-y-6"><SectionTitle number="1.3" title={lang === "bm" ? "Tumbuhan bergerak balas tanpa sistem saraf" : "Plants respond without a nervous system"} subtitle={lang === "bm" ? "Arah rangsangan menentukan tropisme positif atau negatif, manakala gerak balas nastik tidak terarah." : "Stimulus direction determines positive or negative tropism, while a nastic response is non-directional."}/><TropismExplorer lang={lang}/><PlantComparison lang={lang}/><Panel><p className="text-xs font-black uppercase tracking-[.14em] text-cyan-200">{lang === "bm" ? "Eksperimen utama" : "Key experiments"}</p><div className="mt-4 grid gap-3 md:grid-cols-3">{(lang === "bm" ? [["Fototropisme", "Kotak berlubang: pucuk melengkung ke arah cahaya."], ["Geotropisme", "Anak benih mengufuk: akar ke bawah, pucuk ke atas."], ["Hidrotropisme", "Akar menuju kapas lembap walaupun menentang graviti."]] : [["Phototropism", "A perforated box: the shoot curves towards light."], ["Geotropism", "A horizontal seedling: root down, shoot up."], ["Hydrotropism", "The root reaches moist cotton even against gravity."]]).map(item => <div key={item[0]} className="rounded-xl bg-white/5 p-3"><p className="text-sm font-black text-white">{item[0]}</p><p className="mt-2 text-xs leading-5 text-slate-300">{item[1]}</p></div>)}</div><p className="mt-4 text-xs text-slate-400">{lang === "bm" ? "Kajian tumbuhan dalam mikrograviti di ISS membantu merancang bekalan makanan dan oksigen untuk misi angkasa." : "Plant studies in ISS microgravity help plan food and oxygen supplies for space missions."}</p></Panel><Check lang={lang} question={section(2)?.checks[0]?.question ?? ""} answer={section(2)?.checks[0]?.hint ?? ""}/></div>

    <div className="space-y-6"><SectionTitle number="1.4" title={lang === "bm" ? "Deria menentukan cara haiwan memburu atau melarikan diri" : "Senses shape how animals hunt or escape"} subtitle={lang === "bm" ? "Kedudukan mata, dua telinga dan organ khas memberi setiap haiwan kelebihan kemandirian yang berbeza." : "Eye position, two ears and special organs give each animal a different survival advantage."}/><AnimalVision lang={lang}/><AnimalSenses lang={lang}/><Check lang={lang} question={section(3)?.checks[0]?.question ?? ""} answer={section(3)?.checks[0]?.hint ?? ""}/></div>

    {onMarkRead && <div className="flex justify-center"><button type="button" disabled={isRead} onClick={onMarkRead} className={`inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-3 text-sm font-black transition-transform duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white motion-reduce:transition-none ${isRead ? "bg-emerald-300/20 text-emerald-200" : "bg-gradient-to-r from-cyan-300 to-violet-300 text-slate-950 hover:scale-[1.03] active:scale-[.97]"}`}><CheckCircle2 className="h-5 w-5"/>{isRead ? t.marked : t.mark}</button></div>}
  </div></section>;
}
