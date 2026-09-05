import { describe, expect, it } from "vitest";
import { scienceEmphasisParts, stripEmphasis } from "@/components/notes/blocks/ScienceEmphasis";
import { scienceF2C2InteractiveBM } from "./interactive-bm";
import { scienceF2C2InteractiveDLP } from "./interactive-dlp";
import type { ScienceF2InteractiveContent } from "../interactive-types";

/**
 * Guards the transfer of the Sains Tingkatan 2 / DLP textbook's own emphasis
 * into Chapter 2 (Ecosystem).
 *
 * As with Chapter 1, 11 and 12's guards: the pass only adds `**markers**`
 * around wording AcadeMY already had, so most of this file checks what did NOT
 * change — strip the markers back out and every touched string must be
 * byte-identical to what it was before.
 */

const STREAMS: [string, ScienceF2InteractiveContent][] = [
  ["BM", scienceF2C2InteractiveBM],
  ["DLP", scienceF2C2InteractiveDLP],
];

/** Every learner-facing string in the chapter, with the field path that holds it. */
function allStrings(content: ScienceF2InteractiveContent): [string, string][] {
  const out: [string, string][] = [];
  const walk = (node: unknown, path: string) => {
    if (typeof node === "string") out.push([path, node]);
    else if (Array.isArray(node)) node.forEach((item, i) => walk(item, `${path}[${i}]`));
    else if (node && typeof node === "object") {
      for (const [key, value] of Object.entries(node)) walk(value, `${path}.${key}`);
    }
  };
  walk(content, "content");
  return out;
}

/** The exact set of terms each stream is expected to have marked (order-independent). */
const EXPECTED: Record<string, string[]> = {
  BM: [
    "membuat makanan sendiri",
    "memakan pengeluar",
    "dipanggil karnivor primer",
    "biasanya bersaiz lebih besar",
    "saprofitisme",
    "gabungan beberapa rantai makanan",
    "terbebas sebagai haba",
    "makanan yang tidak tercerna, iaitu tinja",
    "dikitar berterusan",
    "Respirasi, pereputan oleh pengurai dan pembakaran",
    "Respirasi haiwan dan tumbuhan, pereputan oleh pengurai serta pembakaran",
    "mengekalkan keseimbangan kandungan",
    "menggunakan oksigen",
    "membantu memacu dan mengawal kitar air itu sendiri",
    "respirasi, perpeluhan dan perkumuhan",
    "menanam semula pokok",
    "menggunakan pengangkutan awam",
    "menyimpan air hujan",
    "serupa dan boleh saling membiak",
    "spesies yang sama",
    "saling berinteraksi",
    "Persekitaran atau tempat tinggal",
    "termasuk komponen bukan hidup",
    "keadaan harmoni tanpa gangguan luar",
    "Hujan lebat dan cahaya matahari berlimpah sepanjang tahun.",
    "panas melampau",
    "Musim sejuk yang panjang",
    "simbiosis",
    "Kedua-dua organisma untung.",
    "tidak terjejas",
    "perumah rugi",
    "memburu dan memakan",
    "cahaya, ruang, air, makanan atau pasangan",
    "pemangsa, parasit atau patogen semula jadi",
    "tidak menggunakan pestisid atau bahan kimia",
    "mengambil masa yang lebih lama",
    "selesema burung",
    "kehadiran singa",
    "sisa makanan yang banyak",
    "memerlukan banyak air",
    "bertanggungjawab memulihara keseimbangan alam",
    "kepupusan spesies, hakisan tanah dan kesan rumah hijau",
    "Menguatkuasakan undang-undang",
  ],
  DLP: [
    "make their own food",
    "eat producers",
    "called a primary carnivore",
    "usually larger in size",
    "saprophytism",
    "several interconnected food chains",
    "released as heat",
    "undigested food, that is, faeces",
    "cycled continuously",
    "Respiration, decay by decomposers and combustion",
    "Respiration by animals and plants, decay by decomposers and combustion",
    "keeping the balance",
    "using oxygen",
    "drive and regulate the water cycle itself",
    "respiration, sweating and excretion",
    "replant trees",
    "use public transport",
    "harvest rainwater",
    "similar characteristics that can interbreed",
    "the same species",
    "interacting with one another",
    "natural surroundings or dwelling place",
    "including non-living components",
    "in harmony without outside disturbance",
    "Heavy rainfall and abundant sunshine all year.",
    "Extremely hot days",
    "A long winter with very low temperatures",
    "symbiosis",
    "Both organisms benefit.",
    "unaffected",
    "the host is harmed",
    "hunts and eats",
    "light, space, water, food or mates",
    "a natural predator, parasite or pathogen",
    "uses no pesticides or chemicals",
    "takes longer",
    "bird flu",
    "lions are present",
    "plentiful food waste",
    "needs a great deal of water",
    "are responsible for conserving nature's balance",
    "species extinction, soil erosion and the greenhouse effect",
    "Enforce the law",
  ],
};

/** Field path -> the exact original wording (before markers were added). */
const ORIGINALS: Record<string, Record<string, string>> = {
  BM: {
    "content.sections[0].cards[0].body":
      "Tumbuhan hijau membuat makanan sendiri melalui fotosintesis. Semua rantai makanan bermula di sini.",
    "content.sections[0].cards[1].body":
      "Haiwan herbivor dan omnivor yang memakan pengeluar. Contoh: beluncas, siput, belalang.",
    "content.sections[0].cards[2].body":
      "Haiwan omnivor dan karnivor yang memakan pengguna primer. Kerana ia karnivor yang pertama dalam rantai itu, ia dipanggil karnivor primer. Contoh: burung raja udang.",
    "content.sections[0].cards[3].body":
      "Karnivor yang memakan pengguna sekunder, biasanya bersaiz lebih besar. Kerana ia karnivor yang kedua dalam rantai itu, ia dipanggil karnivor sekunder. Contoh: musang, ular.",
    "content.sections[0].cards[4].body":
      "Bakteria dan kulat menguraikan organisma mati serta bahan buangan kepada nutrien ringkas. Hubungan ini dipanggil saprofitisme.",
    "content.sections[1].intro":
      "Rantai makanan menunjukkan satu laluan pemakanan yang lurus. Siratan makanan pula ialah gabungan beberapa rantai makanan yang saling berkait dalam satu ekosistem yang sama.",
    "content.sections[1].cards[0].body":
      "Tenaga tidak dikitar semula seperti nutrien. Pada setiap aras, sebahagian tenaga digunakan untuk bergerak dan menjalankan proses hidup seperti respirasi, lalu terbebas sebagai haba.",
    "content.sections[1].cards[1].body":
      "Pengguna turut kehilangan tenaga melalui makanan yang tidak tercerna, iaitu tinja. Pengeluar tidak mengalami kehilangan jenis ini kerana ia membuat makanannya sendiri.",
    "content.sections[2].intro":
      "Berbeza dengan tenaga, karbon dan oksigen dikitar berterusan antara organisma dengan persekitaran. Kedua-dua kitar ini saling berhubung melalui fotosintesis dan respirasi.",
    "content.sections[2].tabs[0].body":
      "Fotosintesis menyerap karbon dioksida daripada udara. Karbon berpindah kepada haiwan melalui pemakanan. Respirasi, pereputan oleh pengurai dan pembakaran mengembalikan karbon dioksida ke atmosfera.",
    "content.sections[2].tabs[1].body":
      "Fotosintesis oleh tumbuhan hijau membebaskan oksigen ke udara. Respirasi haiwan dan tumbuhan, pereputan oleh pengurai serta pembakaran menggunakan oksigen itu semula.",
    "content.sections[2].cards[0].body":
      "Fotosintesis menyerap karbon dioksida dan membebaskan oksigen, lalu mengekalkan keseimbangan kandungan kedua-dua gas ini di dalam udara.",
    "content.sections[2].cards[2].body":
      "Bakteria dan kulat menguraikan organisma mati menggunakan oksigen lalu membebaskan karbon dioksida, sambil melepaskan nutrien kembali ke tanah.",
    "content.sections[3].intro":
      "Air bergerak berterusan antara Bumi dengan atmosfera. Benda hidup bukan sekadar menggunakan air — ia turut membantu memacu dan mengawal kitar air itu sendiri.",
    "content.sections[3].tabs[1].body":
      "Akar tumbuhan menyerap air dari tanah dan daun membebaskannya semula melalui transpirasi. Haiwan pula membebaskan wap air melalui respirasi, perpeluhan dan perkumuhan. Kesemua proses ini menambah kandungan wap air di atmosfera.",
    "content.sections[4].causeEffect.items[0].note":
      "Penyelesaian: menanam semula pokok dan memperketat undang-undang perhutanan.",
    "content.sections[4].causeEffect.items[1].note":
      "Penyelesaian: menggunakan pengangkutan awam dan tenaga yang lebih bersih.",
    "content.sections[4].causeEffect.items[2].note":
      "Penyelesaian: menjimatkan air, menyimpan air hujan dan mewujudkan sistem pertanian yang terancang.",
    "content.sections[5].cards[0].body":
      "Sekumpulan organisma yang mempunyai ciri-ciri serupa dan boleh saling membiak untuk menghasilkan anak.",
    "content.sections[5].cards[1].body":
      "Sekumpulan organisma daripada spesies yang sama dan hidup di habitat yang sama. Contoh: satu populasi pepatung di kolam.",
    "content.sections[5].cards[2].body":
      "Beberapa populasi organisma yang berbeza, hidup bersama dalam satu habitat dan saling berinteraksi.",
    "content.sections[5].cards[3].body":
      "Persekitaran atau tempat tinggal semula jadi bagi sesuatu organisma. Contoh: kolam, hutan, tanah.",
    "content.sections[5].cards[4].body":
      "Beberapa komuniti yang tinggal bersama dalam satu habitat dan saling berinteraksi, termasuk komponen bukan hidup seperti air, udara dan tanah.",
    "content.sections[5].comparison.columns[0].body":
      "Organisma saling bersandaran antara satu sama lain dan dengan komponen bukan hidup (air, cahaya, udara, tanah). Ekosistem dikatakan seimbang apabila kesemuanya berada dalam keadaan harmoni tanpa gangguan luar.",
    "content.sections[6].adaptations.cases[0].challenge":
      "Hujan lebat dan cahaya matahari berlimpah sepanjang tahun. Pokok tinggi berebut cahaya, tanah cepat lembap dan tepu air.",
    "content.sections[6].adaptations.cases[1].challenge":
      "Siang yang panas melampau, malam yang sejuk, dan hujan yang sangat sedikit. Kehilangan air adalah ancaman utama.",
    "content.sections[6].adaptations.cases[2].challenge":
      "Musim sejuk yang panjang dan suhu amat rendah, musim panas yang singkat, tanah beku dan angin kencang di dataran tanpa pokok.",
    "content.sections[7].intro":
      "Interaksi antara organisma terdiri daripada simbiosis (mutualisme, komensalisme, parasitisme), mangsa-pemangsa dan persaingan.",
    "content.sections[7].cards[0].body":
      "Kedua-dua organisma untung. Contoh: buran melindungi ikan badut daripada pemangsa; ikan badut membersihkan buran dan memberi nutrien daripada sisa makanannya.",
    "content.sections[7].cards[1].body":
      "Satu organisma (komensal) untung; yang satu lagi tidak terjejas. Contoh: ikan remora melekat pada jerung dan makan sisa makanannya, tanpa memudaratkan jerung.",
    "content.sections[7].cards[2].body":
      "Satu organisma (parasit) untung; perumah rugi. Contoh: cacing pita hidup dalam usus manusia dan menyerap nutrien daripada perumahnya.",
    "content.sections[7].cards[3].body":
      "Satu organisma (pemangsa) memburu dan memakan organisma lain (mangsa). Contoh: burung hantu memburu dan memakan tikus.",
    "content.sections[7].cards[4].body":
      "Organisma dalam habitat yang sama bersaing untuk keperluan asas yang terhad seperti cahaya, ruang, air, makanan atau pasangan. Ia boleh berlaku sesama spesies mahupun antara spesies berlainan.",
    "content.sections[7].accordions[0].body":
      "Kawalan biologi menggunakan pemangsa, parasit atau patogen semula jadi untuk mengurangkan bilangan perosak. Di Malaysia: burung hantu mengawal tikus di ladang kelapa sawit, ikan gapi memakan jentik-jentik, kumbang kura-kura memakan afid, itik memakan siput di sawah padi, dan Bacillus thuringiensis mengawal kumbang tanduk.",
    "content.sections[7].accordions[1].body":
      "Kawalan biologi lebih mesra alam kerana tidak menggunakan pestisid atau bahan kimia. Ia biasanya lebih murah dan tidak menjejaskan kesihatan manusia.",
    "content.sections[7].accordions[2].body":
      "Kawalan biologi mengambil masa yang lebih lama sebelum kesannya kelihatan. Keseimbangan ekosistem juga mungkin terganggu kerana spesies baharu diperkenalkan ke dalam ekosistem tersebut — spesies itu sendiri boleh menjadi masalah jika populasinya tidak terkawal.",
    "content.sections[8].causeEffect.items[0].note":
      "Contoh: selesema burung di kawasan ternakan ayam; penyakit mozek tembakau di ladang tembakau.",
    "content.sections[8].causeEffect.items[1].note":
      "Contoh: populasi kuda belang berkurang dengan kehadiran singa di savana.",
    "content.sections[8].causeEffect.items[2].note":
      "Contoh: panda bergantung pada buluh; sebaliknya sisa makanan yang banyak menaikkan populasi burung gagak di Malaysia.",
    "content.sections[9].causeEffect.items[0].note":
      "Padi ialah tanaman yang memerlukan banyak air, jadi ia terjejas terlebih dahulu.",
    "content.sections[10].intro":
      "Manusia memerlukan ekosistem yang stabil dan produktif demi kelestarian hidup — daripadanya kita memperoleh makanan, air bersih, udara yang selamat, bahan mentah dan ubat-ubatan. Apabila ekosistem terganggu, sumber-sumber ini turut terjejas, jadi manusia bertanggungjawab memulihara keseimbangan alam.",
    "content.sections[10].comparison.columns[0].body":
      "Penebangan hutan menyebabkan kepupusan spesies, hakisan tanah dan kesan rumah hijau. Perindustrian mencemarkan udara, air dan tanah serta menyebabkan hujan asid. Pertanian yang tidak lestari mencemarkan air dan menghilangkan mineral tanah. Pembuangan sampah sarap menyebabkan pencemaran, bau busuk dan banjir kilat.",
    "content.sections[10].comparison.columns[1].body":
      "Menguatkuasakan undang-undang (rondaan hutan dan sekatan jalan raya oleh Jabatan Perhutanan), meningkatkan kesedaran orang awam, mengamalkan 5R, dan menggunakan kaedah kawalan biologi dalam pertanian.",
  },
  DLP: {
    "content.sections[0].cards[0].body":
      "Green plants make their own food through photosynthesis. Every food chain begins here.",
    "content.sections[0].cards[1].body":
      "Herbivores and omnivores that eat producers. Examples: caterpillar, snail, grasshopper.",
    "content.sections[0].cards[2].body":
      "Omnivores and carnivores that eat primary consumers. Because it is the first carnivore in that chain, it is called a primary carnivore. Example: kingfisher.",
    "content.sections[0].cards[3].body":
      "A carnivore that eats secondary consumers, usually larger in size. Because it is the second carnivore in that chain, it is called a secondary carnivore. Examples: civet, snake.",
    "content.sections[0].cards[4].body":
      "Bacteria and fungi break dead organisms and waste down into simple nutrients. This relationship is called saprophytism.",
    "content.sections[1].intro":
      "A food chain shows one straight feeding pathway. A food web is several interconnected food chains within the same ecosystem.",
    "content.sections[1].cards[0].body":
      "Energy is not recycled the way nutrients are. At every level some energy is used for movement and life processes such as respiration, and is released as heat.",
    "content.sections[1].cards[1].body":
      "Consumers also lose energy in undigested food, that is, faeces. Producers do not have this kind of loss because they make their own food.",
    "content.sections[2].intro":
      "Unlike energy, carbon and oxygen are cycled continuously between organisms and the environment. The two cycles are linked through photosynthesis and respiration.",
    "content.sections[2].tabs[0].body":
      "Photosynthesis absorbs carbon dioxide from the air. Carbon passes to animals through feeding. Respiration, decay by decomposers and combustion return carbon dioxide to the atmosphere.",
    "content.sections[2].tabs[1].body":
      "Photosynthesis by green plants releases oxygen into the air. Respiration by animals and plants, decay by decomposers and combustion use that oxygen again.",
    "content.sections[2].cards[0].body":
      "Photosynthesis absorbs carbon dioxide and releases oxygen, keeping the balance of both gases in the air.",
    "content.sections[2].cards[2].body":
      "Bacteria and fungi break down dead organisms using oxygen and releasing carbon dioxide, while returning nutrients to the soil.",
    "content.sections[3].intro":
      "Water moves continuously between Earth and the atmosphere. Living things do not merely use water — they help drive and regulate the water cycle itself.",
    "content.sections[3].tabs[1].body":
      "Plant roots absorb water from the soil and leaves release it again through transpiration. Animals release water vapour through respiration, sweating and excretion. All of these add water vapour to the atmosphere.",
    "content.sections[4].causeEffect.items[0].note":
      "Solution: replant trees and tighten forestry law enforcement.",
    "content.sections[4].causeEffect.items[1].note":
      "Solution: use public transport and cleaner energy sources.",
    "content.sections[4].causeEffect.items[2].note":
      "Solution: conserve water, harvest rainwater and set up planned agricultural systems.",
    "content.sections[5].cards[0].body":
      "A group of organisms with similar characteristics that can interbreed to produce offspring.",
    "content.sections[5].cards[1].body":
      "A group of organisms of the same species living in the same habitat. Example: one population of dragonflies in a pond.",
    "content.sections[5].cards[2].body":
      "Several different populations of organisms living together in one habitat and interacting with one another.",
    "content.sections[5].cards[3].body":
      "The natural surroundings or dwelling place of an organism. Examples: a pond, a forest, the soil.",
    "content.sections[5].cards[4].body":
      "Several communities living together in one habitat and interacting with one another, including non-living components such as water, air and soil.",
    "content.sections[5].comparison.columns[0].body":
      "Organisms depend on one another and on non-living components (water, light, air, soil). An ecosystem is said to be balanced when all of these are in harmony without outside disturbance.",
    "content.sections[6].adaptations.cases[0].challenge":
      "Heavy rainfall and abundant sunshine all year. Tall trees compete for light, and the soil is constantly damp and waterlogged.",
    "content.sections[6].adaptations.cases[1].challenge":
      "Extremely hot days, cold nights and very little rain. Water loss is the main threat.",
    "content.sections[6].adaptations.cases[2].challenge":
      "A long winter with very low temperatures, a short summer, frozen ground and strong winds across a treeless plain.",
    "content.sections[7].intro":
      "Interactions between organisms consist of symbiosis (mutualism, commensalism, parasitism), predator–prey and competition.",
    "content.sections[7].cards[0].body":
      "Both organisms benefit. Example: the sea anemone shelters the clownfish from predators; the clownfish cleans the anemone and supplies nutrients from its food scraps.",
    "content.sections[7].cards[1].body":
      "One organism (the commensal) benefits; the other is unaffected. Example: the remora attaches to a shark and eats its food scraps without harming the shark.",
    "content.sections[7].cards[2].body":
      "One organism (the parasite) benefits; the host is harmed. Example: a tapeworm lives in the human intestine and absorbs nutrients from its host.",
    "content.sections[7].cards[3].body":
      "One organism (the predator) hunts and eats another (the prey). Example: an owl hunts and eats rats.",
    "content.sections[7].cards[4].body":
      "Organisms in the same habitat compete for a limited supply of basic needs such as light, space, water, food or mates. It can occur within one species or between different species.",
    "content.sections[7].accordions[0].body":
      "Biological control uses a natural predator, parasite or pathogen to reduce the number of pests. In Malaysia: owls control rats in oil palm estates, guppies eat mosquito larvae, ladybirds eat aphids, ducks eat snails in paddy fields, and Bacillus thuringiensis controls rhinoceros beetles.",
    "content.sections[7].accordions[1].body":
      "Biological control is more environmentally friendly because it uses no pesticides or chemicals. It is usually cheaper and it does not harm human health.",
    "content.sections[7].accordions[2].body":
      "Biological control takes longer before its effect is visible. The balance of the ecosystem may also be disturbed because a new species is introduced into it — that species can itself become a problem if its population is not controlled.",
    "content.sections[8].causeEffect.items[0].note":
      "Examples: bird flu in poultry farms; tobacco mosaic disease in tobacco plantations.",
    "content.sections[8].causeEffect.items[1].note":
      "Example: the zebra population falls where lions are present in the savanna.",
    "content.sections[8].causeEffect.items[2].note":
      "Example: pandas depend on bamboo; conversely, plentiful food waste has raised the crow population in Malaysia.",
    "content.sections[9].causeEffect.items[0].note":
      "Paddy is a crop that needs a great deal of water, so it is affected first.",
    "content.sections[10].intro":
      "Humans need a stable and productive ecosystem for sustainable living — it is where our food, clean water, safe air, raw materials and medicines come from. When an ecosystem is disturbed those resources suffer too, so humans are responsible for conserving nature's balance.",
    "content.sections[10].comparison.columns[0].body":
      "Deforestation causes species extinction, soil erosion and the greenhouse effect. Industry pollutes air, water and soil and causes acid rain. Unsustainable agriculture pollutes water and strips minerals from the soil. Dumping rubbish causes pollution, foul smells and flash floods.",
    "content.sections[10].comparison.columns[1].body":
      "Enforce the law (forest patrols and roadblocks by the Forestry Department), raise public awareness, practise the 5Rs, and use biological control in agriculture.",
  },
};

/** Only these field-path suffixes are wired to render through ScienceEmphasis. */
const ALLOWED_FIELD = /\.(body|intro|note|challenge|adaptation|role|benefit|remember|quickExplanation)(\[\d+\])?$/;

describe("Chapter 2 — the textbook's emphasis, and only that", () => {
  it.each(STREAMS)("%s marks exactly the terms transferred from the textbook", (name, content) => {
    const marked = allStrings(content)
      .flatMap(([, text]) => scienceEmphasisParts(text))
      .filter((part) => part.emphasised)
      .map((part) => part.text);
    expect(new Set(marked)).toEqual(new Set(EXPECTED[name]));
    expect(marked.length, `${name} has a duplicated or missing marker`).toBe(EXPECTED[name].length);
  });

  it.each(STREAMS)("%s marks each concept once, not everywhere it appears", (name, content) => {
    const marked = allStrings(content)
      .flatMap(([, text]) => scienceEmphasisParts(text))
      .filter((part) => part.emphasised)
      .map((part) => part.text.toLowerCase());
    expect(new Set(marked).size, `${name} repeats an emphasised concept`).toBe(marked.length);
  });

  it.each(STREAMS)("%s changed no wording — only added markers", (name, content) => {
    for (const [path, text] of allStrings(content)) {
      if (!text.includes("**")) continue;
      const stripped = stripEmphasis(text);
      const original = ORIGINALS[name][path];
      expect(original, `no expected original registered for marked field ${path}`).toBeTruthy();
      expect(stripped, `wording changed at ${path}`).toBe(original);
    }
  });

  it("marks the equivalent concept in both languages, in the same fields", () => {
    const fieldsWithMarkers = (content: ScienceF2InteractiveContent) =>
      allStrings(content)
        .filter(([, text]) => text.includes("**"))
        .map(([path]) => path)
        .sort();
    expect(fieldsWithMarkers(scienceF2C2InteractiveBM)).toEqual(fieldsWithMarkers(scienceF2C2InteractiveDLP));
  });

  it.each(STREAMS)("%s puts markers only in fields wired to ScienceEmphasis", (name, content) => {
    for (const [path, text] of allStrings(content)) {
      if (!text.includes("**")) continue;
      expect(path, `${name}: emphasis marker in an unwired field: ${path}`).toMatch(ALLOWED_FIELD);
    }
  });

  it.each(STREAMS)("%s leaves quiz, flashcard and reflection content unmarked", (name, content) => {
    for (const [path, text] of allStrings(content)) {
      if (!text.includes("**")) continue;
      expect(path, `${name}: emphasis leaked into assessment content: ${path}`).not.toMatch(
        /miniQuiz|reflectionItems/,
      );
    }
  });
});
