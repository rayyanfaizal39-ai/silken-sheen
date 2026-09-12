import type { ScienceF3InteractiveContent } from "../interactive-types";
import { chapter4Lesson, chapter4Lessons, scienceF3Chapter4Source } from "./chapter4-content";

/** Chapter-local parity adapter: keep the existing ladder, checks and quiz. */
export function completeChapter4Interactive(content: ScienceF3InteractiveContent, lang: "bm" | "dlp"): ScienceF3InteractiveContent {
  const bm = lang === "bm";
  const card = (id: string) => chapter4Lesson(id, lang);
  const sections = content.sections.map((section, index) => ({
    ...section,
    intro: scienceF3Chapter4Source.subtopics[index].introduction[lang],
    cards: Object.values(chapter4Lessons)[index].map((item) => ({ title: item.term[lang], body: item.statement[lang] })),
  }));
  sections[0].comparison = {
    title: bm ? "Dua bentuk mineral" : "Two forms of minerals",
    columns: [card("elements"), card("compound")],
  };
  sections[0].checks = [{
    question: content.sections[0].checks[0].question,
    hint: bm ? "Sebatian. Gas yang terbebas semasa tindak balas dengan asid atau pemanasan mengeruhkan air kapur: gas itu ialah karbon dioksida. Berdasarkan hasil tindak balas, kalsium karbonat mengandungi kalsium, karbon dan oksigen." : "A compound. The gas released by acid or heating turns limewater cloudy: it is carbon dioxide. From the reaction products, calcium carbonate contains calcium, carbon and oxygen.",
  }];
  sections[1].checks = [
    { question: bm ? "Karbon dapat menurunkan zink oksida dan plumbum(II) oksida tetapi tidak dapat menurunkan aluminium oksida. Apakah yang ditunjukkan tentang kedudukan karbon dalam siri kereaktifan logam?" : "Carbon can reduce zinc oxide and lead(II) oxide but cannot reduce aluminium oxide. What does this show about carbon's position in the reactivity series?", hint: card("carbon-position").body },
    { question: bm ? "Hidrogen tidak menurunkan zink oksida tetapi menurunkan oksida ferum. Di manakah kedudukannya?" : "Hydrogen cannot reduce zinc oxide but reduces iron oxide. Where is it placed?", hint: card("hydrogen").body },
  ];
  sections[1].toggles = [
    { title: bm ? "Uji karbon" : "Investigate carbon", instruction: bm ? "Bandingkan tindak balas dan buat kesimpulan." : "Compare reactions and infer the position.", options: ["carbon-al", "carbon-zn", "carbon-pb"].map((id) => ({ id, label: card(id).title, body: card(id).body })) },
    { title: bm ? "Uji hidrogen" : "Investigate hydrogen", instruction: bm ? "Gunakan bukti untuk meletakkan hidrogen." : "Use evidence to locate hydrogen.", options: ["hydrogen", "hydrogen-rule"].map((id) => ({ id, label: card(id).title, body: card(id).body })) },
  ];
  const ladder = sections[1].ladder!;
  const facts: Record<string, string> = { Mg: "oxygen-mg", Al: "oxygen-al", Zn: "oxygen-zn", Fe: "oxygen-fe", Pb: "oxygen-pb", C: "carbon-position", H: "hydrogen", Sn: "tin-oxygen", Cu: "direct-heat", Hg: "direct-heat", Ag: "native", Au: "native" };
  sections[1].ladder = {
    ...ladder,
    title: bm ? "Daripada paling reaktif kepada paling kurang reaktif" : "From most to least reactive",
    instruction: bm ? "Ketik unsur untuk melihat bukti atau kegunaan kedudukannya." : "Tap an element to see evidence or an application of its position.",
    items: ladder.items.map((item) => ({ ...item, fact: facts[item.symbol] ? card(facts[item.symbol]).body : item.symbol === "K" ? (bm ? "Kalium sangat reaktif dengan oksigen dan berada paling atas dalam siri ini." : "Potassium reacts very vigorously with oxygen and is highest in this series.") : item.fact })),
  };
  sections[2].toggles = [{
    title: bm ? "Kaedah pengekstrakan yang mana?" : "Which extraction method?",
    instruction: bm ? "Padankan kedudukan logam dengan kaedah." : "Match the metal's position to its method.",
    options: ["electrolysis", "carbon-extraction", "direct-heat", "native"].map((id) => ({ id, label: card(id).title, body: card(id).body })),
  }];
  sections[2].sequence = {
    title: content.sections[2].sequence!.title,
    instruction: content.sections[2].sequence!.instruction,
    steps: ["furnace-inputs", "coke", "co", "reduction", "limestone", "slag", "separation"].map(card),
  };
  sections[2].checks = [...sections[2].checks, {
    question: bm ? "Sungai berhampiran lombong tercemar dan cerun terhakis. Cadangkan dua tindakan dan terangkan kesannya." : "A river near a mine is polluted and slopes are eroding. Suggest two actions and explain their effects.",
    hint: `${card("mining-water").body} ${card("mining-soil").body} ${bm ? "Idea lain yang munasabah juga diterima." : "Other reasonable ideas are also acceptable."}`,
  }];
  return { ...content, sections };
}
