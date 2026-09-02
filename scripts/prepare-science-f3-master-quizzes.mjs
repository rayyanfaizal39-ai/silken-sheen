import fs from "node:fs";
import path from "node:path";

const DOWNLOADS = "C:\\Users\\pcgam\\Downloads";
const OUTPUT_DIR = path.resolve("outputs/science-form3-master-quizzes");
const OUTPUT_JSON = path.join(OUTPUT_DIR, "new-rows.json");
const CACHE_JSON = path.join(OUTPUT_DIR, "translation-cache-qwen7b.json");
const TRANSLATION_MODEL = "qwen2.5:7b";

const HEADERS = [
  "chapter_number", "set_letter", "chapter_title", "question_number",
  "question_malay", "question_english", "option_a_malay", "option_a_english",
  "option_b_malay", "option_b_english", "option_c_malay", "option_c_english",
  "option_d_malay", "option_d_english", "correct_answer", "explanation",
];

const SOURCES = [
  { chapter: 1, set: "A", file: "bab-1-sains-t3-quizzes.json", first: 25 },
  { chapter: 1, set: "B", file: "bab-1-sains-t3-quizzes-set-b.json" },
  { chapter: 2, set: "A", file: "bab-2-sains-t3-quizzes-set-a.json" },
  { chapter: 2, set: "B", file: "bab-2-sains-t3-quizzes-set-b.json" },
  { chapter: 3, set: "A", file: "bab-3-sains-t3-quizzes-set-a.json" },
  { chapter: 3, set: "B", file: "bab-3-sains-t3-quizzes-set-b.csv" },
  { chapter: 4, set: "A", file: "bab-4-sains-t3-quizzes-set-a.csv" },
  { chapter: 4, set: "B", file: "bab-4-sains-t3-quizzes-set-b.csv" },
  { chapter: 5, set: "A", file: "bab-5-sains-t3-quizzes-set-a.json" },
  { chapter: 5, set: "B", file: "bab-5-sains-t3-quizzes-set-b.csv" },
];

const TITLES = {
  1: "Rangsangan dan Gerak Balas (Stimuli and Responses)",
  2: "Respirasi (Respiration)",
  3: "Pengangkutan (Transportation)",
  4: "Kereaktifan Logam (Reactivity of Metals)",
  5: "Termokimia (Thermochemistry)",
};

const CH1_A_ANSWERS = [
  "B", "B", "C", "B", "B", "C", "A", "C", "B", "D",
  "B", "C", "A", "C", "B", "B", "C", "B", "B", "B",
  "C", "B", "A", "C", "C",
];

const CH1_A_EXPLANATIONS = [
  "Sistem Saraf Pusat terdiri daripada otak dan saraf tunjang; saraf kranium dan saraf spina membentuk Sistem Saraf Periferi.",
  "Sistem Saraf Periferi manusia mempunyai 31 pasang saraf spina yang bersambung dengan saraf tunjang.",
  "Peristalsis ialah tindakan luar kawal yang diselaraskan oleh medula oblongata, manakala gerak refleks melibatkan saraf tunjang.",
  "Dalam acara pecut Olimpik, masa gerak balas kurang daripada 0.100 saat dianggap terlalu pantas untuk tindak balas manusia dan direkodkan sebagai permulaan palsu.",
  "Dalam tindakan terkawal, reseptor mengesan rangsangan, impuls dihantar ke otak untuk ditafsir, kemudian efektor menghasilkan gerak balas.",
  "Pupil ialah bukaan yang mengawal kuantiti cahaya memasuki mata melalui perubahan saiz yang dikawal oleh iris.",
  "Pupil kambing berbentuk seperti huruf W, membantu memberikan medan penglihatan yang luas.",
  "Bintik kuning mempunyai kepadatan sel kon yang tinggi dan merupakan bahagian retina paling peka untuk penglihatan jelas.",
  "Sel rod sangat peka terhadap keamatan cahaya rendah, maka membantu penglihatan dalam keadaan malap.",
  "Pigmen gelap pada koroid menyerap cahaya untuk mengelakkan pantulan dalaman, manakala salur darahnya membekalkan oksigen dan nutrien.",
  "Ligamen penggantung memegang kanta pada kedudukannya dan memindahkan tarikan otot silia semasa akomodasi.",
  "Bintik buta terletak pada retina di tempat gentian saraf meninggalkan mata untuk membentuk saraf optik; kawasan itu tiada fotoreseptor.",
  "Gelombang bunyi menyebabkan gegendang telinga bergetar pada frekuensi yang sama sebelum getaran dipindahkan kepada osikel.",
  "Osikel menguatkan getaran daripada gegendang telinga dan memindahkannya ke jendela bujur.",
  "Koklea berisi bendalir dan mengandungi reseptor yang menukarkan getaran kepada impuls saraf.",
  "Tiub Eustachio menyamakan tekanan udara di telinga tengah dengan tekanan udara di luar gegendang telinga.",
  "Salur separuh bulat mengesan pergerakan kepala untuk keseimbangan dan tidak terlibat dalam pendengaran.",
  "Bunyi bergerak melalui cuping telinga, salur telinga, gegendang telinga, osikel, jendela bujur dan akhirnya koklea.",
  "Walaupun imej pada retina terbentuk secara songsang, otak mentafsirkannya sebagai imej tegak.",
  "Tiga jenis sel kon peka terutamanya terhadap cahaya merah, hijau dan biru, membolehkan penglihatan warna.",
  "Rangsangan sakit mencetuskan arka refleks di saraf tunjang supaya kaki ditarik dengan cepat sebelum otak menyedari kesakitan.",
  "Reseptor kulit menghantar impuls melalui saraf spina ke saraf tunjang untuk menghasilkan gerak refleks.",
  "Gelemar ialah bahan jeli lut sinar yang memenuhi ruang besar di belakang kanta dan mengekalkan bentuk bola mata.",
  "Otak ialah pusat kawalan bagi tindakan terkawal seperti berfikir dan menulis.",
  "Medula oblongata mengawal fungsi luar kawal penting seperti pernafasan dan denyutan jantung; kerosakan serius boleh menyebabkan kedua-duanya gagal.",
];

const CH5_QUESTIONS_MS = {
  A: [
    "Apakah definisi termokimia yang paling tepat?",
    "Antara berikut, yang manakah merupakan sistem dalam kajian termokimia?",
    "Apabila natrium hidroksida pepejal (NaOH) dilarutkan dalam air, bacaan termometer meningkat. Apakah kesimpulan yang boleh dibuat tentang tindak balas ini?",
    "Bagaimanakah tenaga kimia hasil tindak balas dibandingkan dengan tenaga kimia bahan tindak balas dalam tindak balas eksotermik?",
    "Antara berikut, yang manakah merupakan tindak balas endotermik?",
    "Rajah di atas menunjukkan profil pemindahan tenaga semasa tindak balas kimia.\n[ Bahan tindak balas + Haba → Hasil tindak balas ]\nApakah jenis tindak balas ini dan apakah kesannya terhadap suhu persekitaran?",
    "Apakah tujuan utama menggunakan cawan polistirena dalam eksperimen untuk menentukan tindak balas eksotermik dan endotermik?",
    "Definisi secara operasi bagi tindak balas eksotermik dalam suatu eksperimen ialah...",
    "Mengapakah proses membakar roti atau kek dikelaskan sebagai tindak balas endotermik?",
    "Antara fenomena semula jadi berikut, yang manakah melibatkan tindak balas eksotermik?",
    "Pek panas segera digunakan untuk melegakan kekejangan otot. Antara bahan kimia berikut, yang manakah lazim digunakan dalam penghasilan produk ini?",
    "Bagaimanakah pek sejuk segera membantu mengurangkan bengkak pada luka dari segi fisiologi?",
    "Seorang murid mereka bentuk pek sejuk menggunakan dua beg plastik, iaitu beg kecil berisi air dan beg besar berisi garam ammonium nitrat. Apakah tindakan mekanikal yang diperlukan untuk mengaktifkan pek tersebut?",
    "Tindak balas termit digunakan untuk mengimpal landasan kereta api yang retak. Apakah logam yang terhasil dalam keadaan lebur akibat tindak balas eksotermik yang sangat hebat ini?",
    "Antara pasangan bahan tindak balas berikut, yang manakah menunjukkan penurunan suhu paling ketara apabila dicampurkan dalam cawan polistirena?",
    "Dari sudut termokimia, mengapakah pemanasan global berkait rapat dengan penebangan hutan?",
    "Dalam suatu eksperimen termokimia, suhu awal air ialah 28 °C. Selepas ammonium klorida dilarutkan, suhu akhir menjadi tetap pada 21 °C. Berapakah perubahan suhu (Δθ) bagi eksperimen ini?",
    "Antara pernyataan berikut, yang manakah menerangkan keseimbangan terma yang dicapai pada akhir tindak balas eksotermik?",
    "Nyatakan gas berasid yang dibebaskan daripada pembakaran bahan api fosil di stesen jana kuasa dan larut dalam air hujan lalu menghasilkan hujan asid.",
    "Tindak balas antara asid kuat dengan alkali kuat dikenali sebagai tindak balas peneutralan. Apakah jenis tindak balas ini dan apakah molekul utama yang terbentuk?",
    "Mengapakah pembakaran lilin dikelaskan sebagai tindak balas eksotermik?",
    "Antara berikut, yang manakah merupakan definisi secara operasi bagi penyerapan haba dalam eksperimen sains?",
    "Pada waktu malam tanpa cahaya matahari, apakah proses utama yang dijalankan oleh tumbuhan hijau yang melibatkan perubahan tenaga haba?",
    "Penguraian kalsium karbonat (CaCO₃) apabila dipanaskan dengan kuat di dalam makmal, seperti ditunjukkan dalam Rajah 1, menghasilkan kalsium oksida (CaO) dan karbon dioksida (CO₂). Tindak balas ini dikelaskan sebagai...",
    "Apakah istilah bagi tindak balas kimia yang tidak membebaskan atau menyerap sebarang tenaga haba bersih daripada persekitarannya?",
  ],
  B: [
    "Apakah perbezaan utama antara sistem dengan persekitaran dalam eksperimen termokimia?",
    "Rajah profil tenaga bagi suatu tindak balas menunjukkan bahawa tenaga hasil tindak balas lebih rendah daripada tenaga bahan tindak balas. Apakah jenis tindak balas tersebut?",
    "Dalam tindak balas endotermik, mengapakah tenaga hasil tindak balas lebih tinggi daripada tenaga bahan tindak balas?",
    "Apabila garam ammonium nitrat (NH₄NO₃) dilarutkan dalam air, suhu menurun. Antara berikut, yang manakah benar tentang proses pelarutan ini?",
    "Tindak balas antara asid sitrik dengan natrium hidrogen karbonat menyebabkan suhu campuran menurun. Antara berikut, yang manakah merupakan definisi secara operasi bagi tindak balas endotermik ini?",
    "Antara tindak balas berikut, yang manakah merupakan contoh tindak balas eksotermik?",
    "Pita magnesium dimasukkan ke dalam tabung uji yang mengandungi asid hidroklorik cair. Tabung uji terasa panas apabila disentuh. Mengapa?",
    "Apakah perubahan bentuk tenaga yang berlaku semasa pembakaran etanol secara eksotermik?",
    "Semasa kalsium karbonat (CaCO₃) dipanaskan dengan kuat dalam Aktiviti 5.1, mengapakah pemanasan perlu dilakukan secara berterusan?",
    "Apakah gas yang dibebaskan apabila serbuk natrium hidrogen karbonat dilarutkan dalam asid hidroklorik cair dalam Aktiviti 5.1?",
    "Antara proses fisiologi berikut, yang manakah merupakan tindak balas eksotermik dalam organisma hidup?",
    "Bagaimanakah proses fotosintesis dikelaskan dari sudut termokimia?",
    "Tindak balas termit digunakan untuk mengimpal landasan kereta api. Apakah tindak balas termit dan mengapakah tindak balas ini dipilih untuk tujuan tersebut?",
    "Dalam pek panas segera, apakah bahan kimia kontang yang lazim digunakan dan bagaimanakah bahan itu diaktifkan?",
    "Pek sejuk segera yang digunakan di hospital untuk mengurangkan bengkak mengandungi bahan kimia penyerap haba. Apakah bahan tersebut?",
    "Mengapakah uncang air dalaman disertakan dalam reka bentuk pek panas segera dan pek sejuk segera?",
    "Proses membakar kek atau roti di dalam ketuhar ialah tindak balas endotermik. Antara berikut, yang manakah menerangkan sebab utama proses ini bersifat endotermik?",
    "Pembakaran bunga api berwarna-warni menghasilkan letupan yang sangat bertenaga. Apakah pengelasan termokimia bagi fenomena ini?",
    "Kempen penghutanan dijalankan secara aktif untuk membendung pemanasan global. Berdasarkan konsep termokimia, bagaimanakah penanaman pokok membantu mengurangkan haba atmosfera?",
    "Tindak balas eksotermik menyumbang kepada pemanasan global melalui pembakaran bahan api fosil dalam sektor perindustrian. Mengapakah gas karbon dioksida (CO₂) daripada pembakaran ini berbahaya?",
    "Pencairan ketulan ais di atas meja ialah contoh perubahan fizikal. Apakah pengelasan termokimia bagi proses ini dan mengapa?",
    "Natrium karbonat pepejal (Na₂CO₃) dan natrium hidrogen karbonat (NaHCO₃) dilarutkan secara berasingan dalam cawan polistirena berisi air. Bagaimanakah pemerhatian suhu bagi kedua-dua proses pelarutan ini dibandingkan?",
    "Semasa menjalankan eksperimen termokimia menggunakan asid kuat dan alkali kuat di sekolah, mengapakah cawan polistirena digunakan sebagai bekas tindak balas dan bukannya bikar kaca biasa?",
    "Dalam bidang perubatan, jika pesakit mengalami kecederaan otot kronik atau bengkak lutut akibat aktiviti sukan, rawatan termokimia manakah yang paling sesuai sebagai pertolongan cemas?",
    "Dalam amalan keselamatan makmal kimia, mengapakah asid pekat mesti dicairkan dengan menuangkan asid pekat secara perlahan-lahan ke dalam air sambil dikacau, dan bukannya menuangkan air ke dalam asid pekat?",
  ],
};

function parseCsv(text) {
  const rows = [];
  let row = [], cell = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') { row.push(cell); cell = ""; }
    else if (ch === '\n') { row.push(cell.replace(/\r$/, "")); rows.push(row); row = []; cell = ""; }
    else cell += ch;
  }
  if (cell.length || row.length) { row.push(cell.replace(/\r$/, "")); rows.push(row); }
  const headers = rows.shift().map((x) => x.replace(/^\uFEFF/, ""));
  return rows.filter((r) => r.some((x) => x !== "")).map((r) => Object.fromEntries(headers.map((h, i) => [h, r[i] ?? ""])));
}

function readSource(filename) {
  const full = path.join(DOWNLOADS, filename);
  const text = fs.readFileSync(full, "utf8");
  return filename.endsWith(".json") ? JSON.parse(text) : parseCsv(text);
}

function clean(value) {
  return String(value ?? "")
    .replace(/\uFEFF/g, "")
    .replace(/â†’/g, "→")
    .replace(/Â°C/g, "°C")
    .replace(/\$\s*ightarrow\s*\$/gi, "→")
    .replace(/\*\*/g, "")
    .replace(/\r\n/g, "\n")
    .trim();
}

function unitalic(value) {
  return clean(value).replace(/^\*|\*$/g, "").replace(/\*([^*]+)\*/g, "$1").trim();
}

function looksEnglish(text) {
  const s = ` ${text.toLowerCase()} `;
  const hits = [" the ", " which ", " what ", " why ", " how ", " of ", " and ", " is ", " are ", " does ", " during ", " system ", " reaction ", " blood ", " metal ", " heat "].filter((w) => s.includes(w)).length;
  return hits >= 2 || /^(what|which|why|how|state|determine|calculate|a student|an athlete)\b/i.test(text.trim());
}

function splitBilingual(value, preferredFirst = "ms") {
  const s = clean(value);
  const lines = s.split(/\n+/).map(unitalic).filter(Boolean);
  if (lines.length >= 2) {
    const pivot = lines.findIndex((line, i) => i > 0 && looksEnglish(line));
    if (pivot > 0) return { ms: lines.slice(0, pivot).join("\n"), en: lines.slice(pivot).join("\n") };
    if (looksEnglish(lines[0]) && !looksEnglish(lines.at(-1))) return { ms: lines.slice(1).join("\n"), en: lines[0] };
  }
  const newline = s.match(/^([\s\S]*?)\n\s*\*([\s\S]+)\*?$/);
  if (newline) {
    const one = unitalic(newline[1]), two = unitalic(newline[2]);
    if (looksEnglish(one) && !looksEnglish(two)) return { ms: two, en: one };
    return { ms: one, en: two };
  }
  const inline = s.match(/^([\s\S]*?)\s+\*([A-Z][\s\S]+)\*$/);
  if (inline) return { ms: unitalic(inline[1]), en: unitalic(inline[2]) };
  if (preferredFirst === "en" || looksEnglish(s)) return { ms: "", en: unitalic(s) };
  return { ms: unitalic(s), en: "" };
}

function splitOption(value, preferredFirst = "ms") {
  const s = clean(value);
  const marker = s.lastIndexOf(" (");
  if (marker > 0 && s.endsWith(")")) {
    const outer = unitalic(s.slice(0, marker));
    const inner = unitalic(s.slice(marker + 2, -1));
    if (/[a-z]{2}/.test(inner)) return { ms: outer, en: inner };
  }
  return splitBilingual(s, preferredFirst);
}

function sourceFields(q) {
  if ("question_malay" in q) return {
    question: q.question_malay, qEn: q.question_english,
    options: [q.option_a_malay, q.option_b_malay, q.option_c_malay, q.option_d_malay],
    optionsEn: [q.option_a_english, q.option_b_english, q.option_c_english, q.option_d_english],
    answer: q.correct_answer, explanation: q.explanation,
  };
  return {
    question: q.question_text,
    options: [q.option_a, q.option_b, q.option_c, q.option_d],
    answer: q.correct_answer, explanation: q.explanation,
  };
}

const translationCache = fs.existsSync(CACHE_JSON) ? JSON.parse(fs.readFileSync(CACHE_JSON, "utf8")) : {};

async function ollamaTranslateArray(texts, source, target) {
  const sourceName = source === "ms" ? "Malaysian Bahasa Melayu" : "English";
  const targetName = target === "ms" ? "natural Malaysian KSSM Bahasa Melayu" : "natural KSSM/DLP English";
  if (texts.length === 1) {
    const prompt = `Translate the following text from ${sourceName} to ${targetName}. You must translate it and must not repeat the source language. Preserve scientific meaning, numbers, symbols, arrows, formulas, and proper nouns. Return only the translation, with no quotation marks or commentary.\n\n${texts[0]}`;
    let lastError;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const response = await fetch("http://127.0.0.1:11434/api/generate", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ model: TRANSLATION_MODEL, prompt, stream: false, options: { temperature: 0, num_predict: 768 } }),
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const payload = await response.json();
        const translated = clean(payload.response);
        if (!translated) throw new Error("empty translation");
        return [translated];
      } catch (error) { lastError = error; }
    }
    throw new Error(`Local single translation failed (${source}>${target}): ${lastError}`);
  }
  const prompt = [
    `Translate each string from ${sourceName} to ${targetName}.`,
    "Preserve scientific meaning, numbers, symbols, arrows, formulas, and proper nouns.",
    "Return only valid JSON with one key named translations whose value is an array of strings in exactly the same order and length.",
    JSON.stringify(texts),
  ].join("\n");
  let lastError;
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const response = await fetch("http://127.0.0.1:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: TRANSLATION_MODEL, prompt, stream: false,
          format: {
            type: "object",
            properties: { translations: { type: "array", items: { type: "string" }, minItems: texts.length, maxItems: texts.length } },
            required: ["translations"],
          },
          options: { temperature: 0, num_predict: Math.min(2048, Math.max(512, Math.ceil(texts.join("").length / 2) + 300)) },
        }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = await response.json();
      const parsed = JSON.parse(payload.response);
      if (!Array.isArray(parsed.translations) || parsed.translations.length !== texts.length) throw new Error("invalid translation array");
      return parsed.translations.map(clean);
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, attempt * 750));
    }
  }
  if (texts.length > 1) {
    const middle = Math.ceil(texts.length / 2);
    return [
      ...(await ollamaTranslateArray(texts.slice(0, middle), source, target)),
      ...(await ollamaTranslateArray(texts.slice(middle), source, target)),
    ];
  }
  throw new Error(`Local translation failed (${source}>${target}): ${lastError}`);
}

async function completePairs(pairs) {
  for (const direction of [["ms", "en"], ["en", "ms"]]) {
    const [source, target] = direction;
    const pending = pairs.filter((pair) => pair[source] && !pair[target]);
    for (const pair of pending) {
      const key = `${source}>${target}:${clean(pair[source])}`;
      if (clean(translationCache[key]) === clean(pair[source]) && clean(pair[source]).length > 20) delete translationCache[key];
    }
    const missing = pending.filter((pair) => !translationCache[`${source}>${target}:${clean(pair[source])}`]);
    if (missing.length) {
      const translated = await ollamaTranslateArray(missing.map((pair) => clean(pair[source])), source, target);
      missing.forEach((pair, i) => { translationCache[`${source}>${target}:${clean(pair[source])}`] = translated[i]; });
      fs.writeFileSync(CACHE_JSON, JSON.stringify(translationCache, null, 2));
    }
    pending.forEach((pair) => { pair[target] = translationCache[`${source}>${target}:${clean(pair[source])}`]; });
  }
  pairs.forEach((pair) => { pair.ms = unitalic(pair.ms); pair.en = unitalic(pair.en); });
}

async function normalizeRecord(spec, q, index) {
  const f = sourceFields(q);
  const preferred = spec.chapter === 5 ? "en" : "ms";
  const question = splitBilingual(f.question, preferred);
  if (f.qEn) question.en = clean(f.qEn);
  const options = f.options.map((x, i) => {
    const pair = splitOption(x, preferred === "en" ? "ms" : preferred);
    if (f.optionsEn?.[i]) pair.en = clean(f.optionsEn[i]);
    return pair;
  });

  if (spec.chapter === 5) question.ms = CH5_QUESTIONS_MS[spec.set][index];
  if (spec.chapter === 5 && spec.set === "A" && index === 16) {
    question.en = "While conducting a thermochemistry experiment, a student found that the initial temperature of water was 28 °C. After dissolving ammonium chloride, the final temperature was stable at 21 °C. What is the temperature change (Δθ) for this experiment?";
  }
  if (spec.chapter === 5 && spec.set === "A" && index === 1) {
    options[0].en = "The region outside the container that receives heat from the reaction.";
    options[1].en = "The thermometer, beaker, and air surrounding the reaction.";
    options[2].en = "The mixture of chemicals reacting inside the container.";
    options[3].en = "The polystyrene used to insulate the experimental container.";
  }

  if (spec.chapter === 2 && spec.set === "A" && index === 1) {
    const repaired = [
      "Rongga hidung → farinks → trakia → larinks → bronkus → bronkiol → alveolus",
      "Rongga hidung → farinks → larinks → trakia → bronkus → bronkiol → alveolus",
      "Rongga hidung → larinks → farinks → trakia → bronkiol → bronkus → alveolus",
      "Rongga hidung → trakia → farinks → larinks → bronkus → alveolus → bronkiol",
    ];
    repaired.forEach((text, i) => { options[i] = { ms: text, en: "" }; });
  }
  if (spec.chapter === 1 && spec.set === "A" && index === 0) {
    [
      "Cranial nerves and spinal nerves", "Brain and spinal cord",
      "Brain and cranial nerves", "Spinal cord and spinal nerves",
    ].forEach((text, i) => { options[i].en = text; });
  }
  if (spec.chapter === 1 && spec.set === "A" && index === 2) {
    options[3] = { ms: "Mengangkat tangan untuk menjawab soalan", en: "Raising a hand to answer a question" };
  }
  if (spec.chapter === 1 && spec.set === "A" && index === 4) {
    [
      "Stimulus → Receptor → Spinal cord → Effector → Response",
      "Stimulus → Receptor → Brain → Effector → Response",
      "Stimulus → Spinal cord → Brain → Effector → Response",
      "Stimulus → Effector → Brain → Receptor → Response",
    ].forEach((text, i) => { options[i].en = text; });
  }
  if (spec.chapter === 1 && spec.set === "A" && index === 17) {
    [
      "Pinna → Ear canal → Ossicles → Eardrum → Cochlea",
      "Pinna → Ear canal → Eardrum → Ossicles → Oval window → Cochlea",
      "Pinna → Eardrum → Cochlea → Oval window → Ossicles",
      "Pinna → Ossicles → Eardrum → Cochlea → Auditory nerve",
    ].forEach((text, i) => { options[i].en = text; });
  }
  if (spec.chapter === 2 && spec.set === "A" && index === 16) {
    const ms = [
      "Karbon dioksida + Air → Glukosa + Oksigen",
      "Glukosa + Karbon dioksida → Oksigen + Air",
      "Glukosa + Oksigen → Karbon dioksida + Air + Tenaga",
      "Karbon dioksida + Oksigen → Glukosa + Air",
    ];
    const en = [
      "Carbon dioxide + Water → Glucose + Oxygen",
      "Glucose + Carbon dioxide → Oxygen + Water",
      "Glucose + Oxygen → Carbon dioxide + Water + Energy",
      "Carbon dioxide + Oxygen → Glucose + Water",
    ];
    ms.forEach((text, i) => { options[i] = { ms: text, en: en[i] }; });
  }
  if (spec.chapter === 2 && spec.set === "B" && index === 10) {
    const ms = [
      "Glukosa + Karbon dioksida → Oksigen + Air",
      "Oksigen + Air → Glukosa + Karbon dioksida",
      "Glukosa + Oksigen → Karbon dioksida + Air + Tenaga",
      "Karboksihemoglobin → Hemoglobin + Karbon monoksida",
    ];
    const en = [
      "Glucose + Carbon dioxide → Oxygen + Water",
      "Oxygen + Water → Glucose + Carbon dioxide",
      "Glucose + Oxygen → Carbon dioxide + Water + Energy",
      "Carboxyhaemoglobin → Haemoglobin + Carbon monoxide",
    ];
    ms.forEach((text, i) => { options[i] = { ms: text, en: en[i] }; });
  }
  if (spec.chapter === 5 && spec.set === "B" && index === 9) {
    options[2] = { ms: "Gas karbon dioksida (CO₂)", en: "Carbon dioxide gas (CO₂)" };
    options[3] = { ms: "Gas hidrogen (H₂)", en: "Hydrogen gas (H₂)" };
  }
  if (spec.chapter === 5 && spec.set === "B" && index === 5) {
    options[0].en = "Thermal decomposition of calcium carbonate (CaCO₃).";
  }
  if (spec.chapter === 5 && spec.set === "B" && index === 7) {
    const ms = [
      "Tenaga cahaya → Tenaga kimia", "Tenaga kimia → Tenaga haba + Tenaga cahaya",
      "Tenaga haba → Tenaga kimia", "Tenaga elektrik → Tenaga kimia",
    ];
    const en = [
      "Light energy → Chemical energy", "Chemical energy → Heat energy + Light energy",
      "Heat energy → Chemical energy", "Electrical energy → Chemical energy",
    ];
    ms.forEach((text, i) => { options[i] = { ms: text, en: en[i] }; });
  }
  if (spec.chapter === 5 && spec.set === "B" && index === 12) {
    options[0].en = "An endothermic reaction between carbon and iron that absorbs heat from the rail.";
    options[1].en = "An exothermic reaction between iron(III) oxide and aluminium powder that produces enough heat to melt iron.";
    options[2].en = "The oxidation of copper by pure oxygen gas.";
    options[3] = { ms: "Tindak balas fizikal bermagnet antara kereta api dengan rel keluli.", en: "A physical magnetic interaction between the train and the steel rail." };
  }
  if (spec.chapter === 3 && spec.set === "B" && index === 18) {
    options[3].en = "Maintains the blood bag at a constant temperature of 4 °C without refrigeration.";
  }
  if (spec.chapter === 5 && spec.set === "A" && index === 17) {
    question.ms = "Antara pernyataan berikut, yang manakah menerangkan keseimbangan terma yang dicapai pada akhir tindak balas eksotermik?";
  }
  if (spec.chapter === 5 && spec.set === "B" && index === 16) {
    question.ms = "Proses membakar kek atau roti di dalam ketuhar ialah tindak balas endotermik. Antara berikut, yang manakah menerangkan sebab utama proses ini bersifat endotermik?";
  }
  if (spec.chapter === 5 && spec.set === "B" && index === 21) {
    question.ms = "Natrium karbonat pepejal (Na₂CO₃) dan natrium hidrogen karbonat (NaHCO₃) dilarutkan secara berasingan dalam cawan polistirena berisi air. Bagaimanakah pemerhatian suhu bagi kedua-dua proses pelarutan ini dibandingkan?";
  }

  await completePairs([question, ...options]);

  let answer = clean(f.answer).toUpperCase();
  let explanation = clean(f.explanation);
  if (spec.chapter === 1 && spec.set === "A") {
    answer = CH1_A_ANSWERS[index];
    explanation = CH1_A_EXPLANATIONS[index];
  }
  if (spec.chapter === 1 && spec.set === "A" && index === 6) {
    answer = "B";
    explanation = "Ikan pari mempunyai pupil berbentuk sabit. Kambing mempunyai pupil mendatar berbentuk segi empat, buaya mempunyai pupil celahan tegak, manakala sotong katak mempunyai pupil berbentuk W.";
  }

  return {
    chapter_number: spec.chapter,
    set_letter: spec.set,
    chapter_title: `Bab ${spec.chapter}: ${TITLES[spec.chapter]} - Kuiz Set ${spec.set}`,
    question_number: index + 1,
    question_malay: question.ms,
    question_english: question.en,
    option_a_malay: options[0].ms,
    option_a_english: options[0].en,
    option_b_malay: options[1].ms,
    option_b_english: options[1].en,
    option_c_malay: options[2].ms,
    option_c_english: options[2].en,
    option_d_malay: options[3].ms,
    option_d_english: options[3].en,
    correct_answer: answer,
    explanation,
  };
}

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
const newRows = [];
for (const spec of SOURCES) {
  let questions = readSource(spec.file);
  if (spec.first) questions = questions.slice(0, spec.first);
  if (questions.length !== 25) throw new Error(`${spec.file}: expected 25 rows, got ${questions.length}`);
  for (let i = 0; i < questions.length; i++) {
    newRows.push(await normalizeRecord(spec, questions[i], i));
  }
  console.log(`Prepared Chapter ${spec.chapter} Set ${spec.set}: ${questions.length}`);
}

if (newRows.length !== 250) throw new Error(`Expected 250 rows, got ${newRows.length}`);
for (const [i, row] of newRows.entries()) {
  for (const h of HEADERS) if (row[h] === "" || row[h] == null) throw new Error(`Blank ${h} at new row ${i + 1}`);
  if (!/^[ABCD]$/.test(row.correct_answer)) throw new Error(`Invalid answer at new row ${i + 1}`);
}
fs.writeFileSync(OUTPUT_JSON, JSON.stringify(newRows, null, 2), "utf8");
console.log(`Wrote ${newRows.length} normalized rows to ${OUTPUT_JSON}`);
