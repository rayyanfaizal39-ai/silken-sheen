import source from "@/data/bm-form3-sistem-bahasa-source.md?raw";
import type { SistemBahasaTopic } from "@/data/bm-k1-sistem-bahasa";
import { BM_FORM3_SISTEM_BAHASA_TOPICS, type TopicSlug } from "@/data/bm-form3-sistem-bahasa";

type SectionMap = Record<string, string>;

const COLORS = ["#60A5FA", "#34D399", "#F59E0B", "#A78BFA", "#F472B6"];

function clean(value: string) {
  return value
    .replace(/\*\*/g, "")
    .replace(/^\s*[â€¢•□]\s*/u, "")
    .replace(/^\s*\d+\.\s*/, "")
    .trim();
}

function lines(value = "") {
  return value.split(/\r?\n/).map(clean).filter(Boolean);
}

function section(sections: SectionMap, keyword: string) {
  const key = Object.keys(sections).find((heading) =>
    heading.toLowerCase().includes(keyword.toLowerCase()),
  );
  return key ? sections[key] : "";
}

function splitTopics(md: string) {
  const result = new Map<TopicSlug, { title: string; sections: SectionMap }>();
  const blocks = md.split(/^#\s+\d+\s+/m).slice(1);

  blocks.forEach((block, index) => {
    const definition = BM_FORM3_SISTEM_BAHASA_TOPICS[index];
    if (!definition) return;
    const [titleLine, ...bodyLines] = block.split(/\r?\n/);
    const sections: SectionMap = {};
    let heading = "";

    bodyLines.forEach((line) => {
      const match = line.match(/^##\s+(.+)$/);
      if (match) {
        heading = clean(match[1]);
        sections[heading] = "";
      } else if (heading && !/^={3,}$/.test(line.trim())) {
        sections[heading] += `${line}\n`;
      }
    });

    result.set(definition.slug, { title: clean(titleLine), sections });
  });

  return result;
}

const parsed = splitTopics(source);

function buildTopic(slug: TopicSlug, index: number): SistemBahasaTopic | undefined {
  const parsedTopic = parsed.get(slug);
  if (!parsedTopic) return undefined;
  const s = parsedTopic.sections;
  const intro = lines(section(s, "Pengenalan"));
  const concept = lines(section(s, "Konsep Utama"));
  const mission = lines(section(s, "Misi Pembelajaran"));
  const examples = lines(section(s, "Contoh Ayat"));
  const tips = lines(section(s, "Tip UASA"));
  const technique = lines(section(s, "Teknik Menjawab"));
  const quick = lines(section(s, "Nota Ringkas"));
  const facts = lines(section(s, "Fakta Penting"));
  const mistakes = lines(section(s, "Kesalahan Lazim"));
  const checklist = lines(section(s, "Checklist Penguasaan"));
  const typeBlock = section(s, "Jenis / Subtopik");
  const typeParts = typeBlock.split(/^###\s+/m).slice(1);
  const jenis = typeParts.map((part) => {
    const [name, ...detailLines] = part.split(/\r?\n/);
    const details = lines(detailLines.join("\n"));
    const definition = details.find((item) => item.toLowerCase().startsWith("definisi:"));
    const formula = details.find((item) => item.toLowerCase().startsWith("formula ingatan:"));
    const correct = details.find((item) => item.toLowerCase().startsWith("contoh yang betul:"));
    const examplesForType = correct
      ? clean(correct.replace(/^contoh yang betul:\s*/i, ""))
          .split(/,|;/)
          .map(clean)
          .filter(Boolean)
      : details.slice(0, 3);
    return {
      nama: clean(name).replace(/^\d+\.\s*/, ""),
      definisi: clean((definition ?? details[0] ?? "").replace(/^definisi:\s*/i, "")),
      formula: formula ? clean(formula.replace(/^formula ingatan:\s*/i, "")) : undefined,
      contoh: examplesForType,
      contohAyat: details.filter((item) => /contoh|betul/i.test(item)).slice(0, 3),
    };
  });
  const warna = COLORS[index % COLORS.length];
  const title = parsedTopic.title || BM_FORM3_SISTEM_BAHASA_TOPICS[index].title;

  return {
    id: slug,
    tajuk: title,
    subtitle: mission[0] ?? `Penguasaan ${title} mengikut sukatan KSSM Tingkatan 3`,
    difficulty: index < 4 ? "Asas" : index < 9 ? "Sederhana" : "Tinggi",
    masaBelajar: "25 minit",
    warna,
    pengenalan: intro.join(" ") || concept.join(" "),
    definisi: {
      teks: concept.join(" ") || intro.join(" "),
      ciri: jenis.map((item) => item.nama),
      ringkasan: quick.join(" ") || facts.join(" "),
    },
    cikguTerang: {
      intro: mission.join(" "),
      langkah: technique.map((item, step) => ({
        tajuk: `Langkah ${step + 1}`,
        teks: item,
        contoh: examples[step] ?? examples[0] ?? title,
      })),
      petua: tips[0] ?? facts[0] ?? `Kenal pasti fungsi ${title} dalam konteks ayat.`,
    },
    jenis: jenis.length
      ? jenis
      : [
          {
            nama: title,
            definisi: concept.join(" "),
            contoh: examples.slice(0, 4),
            contohAyat: examples.slice(0, 4),
          },
        ],
    contohHarian: {
      harian: examples.slice(0, 3),
      sekolah: examples.slice(3, 6),
      peperiksaan: examples.slice(6, 10),
    },
    tipsUASA: {
      kerap: tips,
      pemeriksa: facts,
      format: technique,
    },
    kesalahan: mistakes.map((item) => {
      const correct = item.match(/Betul:\s*(.+)$/i)?.[1] ?? facts[0] ?? item;
      return {
        salah: item,
        sebabSalah: "Penggunaan ini tidak menepati konteks atau hukum bahasa.",
        betul: clean(correct),
        sebabBetul: "Bentuk ini mematuhi sistem bahasa Melayu baku.",
      };
    }),
    caraMudahIngat: {
      visualMemory: quick,
      petua: [...technique, ...facts].slice(0, 6),
    },
    kbat: [
      {
        situasi: examples[0] ?? `Satu ayat menggunakan ${title}.`,
        soalan: `Bagaimanakah anda mengenal pasti penggunaan ${title} yang tepat?`,
        jawapanModel: technique.join(" ") || concept.join(" "),
        penjelasan: facts.join(" ") || quick.join(" "),
      },
    ],
    kuiz: [
      {
        q: `Apakah fokus utama topik ${title}?`,
        options: [
          concept[0] ?? intro[0] ?? title,
          mistakes[0] ?? "Penggunaan yang salah",
          "Ejaan rawak",
          "Tiada peraturan",
        ],
        answer: 0,
        explanation: concept.join(" ") || intro.join(" "),
      },
    ],
    examBooster: {
      rumusan: quick.length ? quick : checklist,
      lastMinuteTips: tips.length ? tips : facts,
    },
  };
}

const topics = new Map<TopicSlug, SistemBahasaTopic>();
BM_FORM3_SISTEM_BAHASA_TOPICS.forEach((topic, index) => {
  const content = buildTopic(topic.slug, index);
  if (content) topics.set(topic.slug, content);
});

export function getBMForm3SistemBahasaContent(slug: TopicSlug) {
  return topics.get(slug);
}
