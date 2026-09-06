import { describe, expect, it } from "vitest";
import { scienceEmphasisParts, stripEmphasis } from "@/components/notes/blocks/ScienceEmphasis";
import { scienceF2C4InteractiveBM } from "./interactive-bm";
import { scienceF2C4InteractiveDLP } from "./interactive-dlp";
import type { ScienceF2InteractiveContent } from "../interactive-types";

/**
 * Guards the transfer of the Sains Tingkatan 2 / DLP textbook's own emphasis
 * into Chapter 4 (Human Health).
 *
 * As with Chapter 1, 11 and 12's guards: the pass only adds `**markers**`
 * around wording AcadeMY already had, so most of this file checks what did NOT
 * change — strip the markers back out and every touched string must be
 * byte-identical to what it was before.
 */

const STREAMS: [string, ScienceF2InteractiveContent][] = [
  ["BM", scienceF2C4InteractiveBM],
  ["DLP", scienceF2C4InteractiveDLP],
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
    "Boleh berpindah daripada seorang individu kepada individu lain.",
    "Tidak berpindah daripada seorang individu kepada individu lain.",
    "semua virus, sesetengah bakteria, protozoa, kulat dan cacing",
    "vitamin K serta vitamin B12",
    "titisan air liur atau habuk",
    "Tinja yang mengandungi patogen",
    "hubungan seks, darah dan perkongsian jarum suntikan",
    "berpindah daripada satu hos kepada hos yang baharu",
    "patogen di dalam kelenjar air liurnya",
    "Vektor sendiri bukan penyebab penyakit.",
    "Keadaan yang terhasil apabila patogen menjangkiti badan.",
    "peringkat TERTIER, bukan peringkat primer",
    "menyerang patogen secara menyeluruh",
    "menyerang satu patogen tertentu secara khusus",
    "merangsang penghasilan antibodi",
    "gerak balas terhadap antigen",
    "sebelum badan dijangkiti",
    "sepadan dengan antigen tersebut sahaja",
    "dilemahkan atau dimatikan",
    "merangsang sistem imun tubuh",
    "tindak balas antibodi yang lebih tinggi dan lebih cepat",
    "antibodi untuk mencegah penyakit",
    "memerlukan lebih daripada satu dos",
    "Elakkan pengambilan gula secara berlebihan",
    "mengalami tekanan perasaan",
    "Mendapat rehat dan tidur yang mencukupi",
    "MENGAWAL pengulangan penyakit",
  ],
  DLP: [
    "Can pass from one individual to another.",
    "Does not pass from one individual to another.",
    "all viruses, some bacteria, protozoa, fungi and worms",
    "vitamin K and vitamin B12",
    "droplets of saliva or by dust",
    "Faeces containing pathogens",
    "sexual contact, blood and shared needles",
    "move from one host to a new host",
    "a pathogen in its salivary glands",
    "The vector itself does not cause the disease.",
    "The condition that results once a pathogen infects the body.",
    "TERTIARY level, not the primary level",
    "attacks pathogens generally",
    "attacks one particular pathogen",
    "stimulates the production of antibodies",
    "response to an antigen",
    "before the body becomes infected",
    "matches that antigen and no other",
    "weakened or killed",
    "stimulates the body's immune system",
    "a higher and faster antibody response",
    "antibodies that prevent disease",
    "need more than one dose",
    "Avoid taking sugar in excess",
    "emotional stress",
    "Getting enough rest and sleep",
    "CONTROL the recurrence of disease",
  ],
};

/** Field path -> the exact original wording (before markers were added). */
const ORIGINALS: Record<string, Record<string, string>> = {
  BM: {
    "content.sections[0].comparison.columns[0].body":
      "Boleh berpindah daripada seorang individu kepada individu lain. Berlaku akibat jangkitan patogen, sama ada secara langsung atau melalui medium dan vektor. Contoh: tuberkulosis, selesema, kurap, panau, kencing tikus, demam denggi, malaria dan Zika.",
    "content.sections[0].comparison.columns[1].body":
      "Tidak berpindah daripada seorang individu kepada individu lain. Berlaku akibat faktor genetik atau gaya hidup. Contoh: kanser, hipertensi, diabetes, asma dan penyakit kardiovaskular.",
    "content.sections[0].cards[0].body":
      "Patogen ialah organisma yang menyebabkan penyakit. Contohnya semua virus, sesetengah bakteria, protozoa, kulat dan cacing.",
    "content.sections[0].cards[1].body":
      "Ada bakteria dalam usus besar yang bertindak pada sisa makanan dan menghasilkan vitamin K serta vitamin B12 yang berguna kepada badan.",
    "content.sections[1].accordions[0].body":
      "Patogen dibawa oleh titisan air liur atau habuk. Terdapat dua cara jangkitan bawaan udara, iaitu jangkitan titisan dan jangkitan habuk. Contoh penyakit: tuberkulosis, selesema, SARS, Influenza A (H1N1) dan cacar air. Pencegahan: tutup mulut dan hidung semasa bersin, batuk atau menguap; jangan meludah di merata tempat; elakkan tempat yang penuh sesak; pastikan tempat tinggal cukup cahaya kerana sinar ultraungu boleh membunuh sesetengah mikroorganisma.",
    "content.sections[1].accordions[1].body":
      "Berlaku di kawasan yang tiada bekalan air terawat dan sistem sanitasi yang sempurna. Tinja yang mengandungi patogen boleh mencemarkan sungai, dan seseorang dijangkiti apabila terminum air tercemar. Contoh penyakit: taun (kolera), demam kepialu dan disentri ameba. Pencegahan: didihkan air minuman, campurkan klorin di dalam sistem bekalan air dan kolam renang, bina tandas bersistem sanitasi sempurna, dan cuci tangan dengan sabun selepas menggunakan tandas.",
    "content.sections[1].accordions[2].body":
      "Berlaku apabila tersentuh kulit yang telah dijangkiti atau memakai pakaian pesakit. Contoh penyakit: kurap dan panau — kedua-duanya disebabkan oleh kulat. Sifilis dan gonorea pula berjangkit melalui hubungan seks kerana patogennya terdapat di dalam air mani dan bendalir faraj. Virus HIV yang menyebabkan AIDS boleh merebak melalui hubungan seks, darah dan perkongsian jarum suntikan. Pencegahan: jaga kebersihan diri dan jangan berkongsi pakaian atau barang peribadi.",
    "content.sections[1].accordions[3].body":
      "Sesetengah patogen menggunakan haiwan untuk berpindah daripada satu hos kepada hos yang baharu. Contoh penyakit: kencing tikus (leptospirosis), demam denggi, malaria, Zika dan Chikungunya. Pencegahan: hapuskan tempat pembiakan vektor, gunakan kelambu atau ubat nyamuk, dan pakai pakaian yang menutup kulit.",
    "content.sections[1].cards[0].body":
      "Nyamuk yang mempunyai patogen di dalam kelenjar air liurnya menghisap darah orang yang belum dijangkiti. Air liur nyamuk dikeluarkan semasa menghisap darah untuk mencegah pembekuan darah, dan patogen masuk bersamanya. Nyamuk lain yang menggigit mangsa yang telah dijangkiti akan menyebarkan jangkitan kepada mangsa seterusnya.",
    "content.sections[2].cards[1].body":
      "Haiwan yang memindahkan patogen daripada satu hos kepada hos yang baharu. Vektor sendiri bukan penyebab penyakit. Contoh: nyamuk Aedes, lipas, lalat, tikus.",
    "content.sections[2].cards[2].body":
      "Keadaan yang terhasil apabila patogen menjangkiti badan. Contoh: demam denggi, kepialu, malaria, leptospirosis.",
    "content.sections[3].cards[0].body":
      "Kawalan vektor seperti pengasapan dan pemusnahan tempat pembiakan tergolong dalam peringkat TERTIER, bukan peringkat primer. Peringkat primer memberi tumpuan kepada kebersihan dan imunisasi sebelum sebarang jangkitan berlaku.",
    "content.sections[4].cards[0].body":
      "Pertahanan tidak spesifik (barisan pertama dan kedua) menyerang patogen secara menyeluruh tanpa mengira jenisnya. Pertahanan spesifik (barisan ketiga) menyerang satu patogen tertentu secara khusus melalui antibodi yang sepadan.",
    "content.sections[5].cards[0].body":
      "Jasad asing atau bahan yang bukan daripada badan sendiri yang merangsang penghasilan antibodi. Antigen terdapat pada patogen, molekul toksin dan sel darah daripada kumpulan darah yang lain.",
    "content.sections[5].cards[1].body":
      "Protein yang dihasilkan oleh sel darah putih ke dalam aliran darah sebagai gerak balas terhadap antigen.",
    "content.sections[5].cards[2].body":
      "Keupayaan sistem badan melawan sesuatu patogen sebelum badan dijangkiti patogen tersebut.",
    "content.sections[5].causeEffect.items[0].note":
      "Antibodi yang terhasil sepadan dengan antigen tersebut sahaja.",
    "content.sections[6].cards[0].body":
      "Vaksin mengandungi antigen yang diperoleh daripada sebahagian atau keseluruhan struktur virus atau bakteria yang telah dilemahkan atau dimatikan.",
    "content.sections[6].cards[1].body":
      "Antigen di dalam vaksin merangsang sistem imun tubuh untuk membentuk keimunan terhadap jangkitan penyakit tertentu — tanpa menyebabkan penyakit itu sendiri.",
    "content.sections[6].accordions[1].body":
      "Sesetengah vaksin diberikan lebih daripada sekali. Pendedahan berulang kepada antigen yang sama menghasilkan tindak balas antibodi yang lebih tinggi dan lebih cepat, jadi perlindungan menjadi lebih kukuh dan bertahan lebih lama.",
    "content.sections[7].cards[0].body":
      "Antiserum ialah darah cecair jernih yang mengandungi antibodi untuk mencegah penyakit. Ia disuntik terus kepada pesakit supaya antibodi sedia ada dapat bertindak dengan segera.",
    "content.sections[8].cards[0].body":
      "Corak ini menerangkan mengapa sesetengah vaksin memerlukan lebih daripada satu dos: setiap dos tambahan mengulangi pendedahan kepada antigen yang sama dan mengangkat perlindungan ke aras yang lebih tinggi.",
    "content.sections[9].cards[0].body":
      "Makan makanan seimbang termasuk sayur-sayuran dan buah-buahan tempatan. Elakkan pengambilan gula secara berlebihan kerana ia melemahkan sistem keimunan.",
    "content.sections[9].comparison.columns[0].body":
      "Terdedah kepada pencemaran udara; terdedah kepada pestisid; mengalami tekanan perasaan; pengambilan gula secara berlebihan.",
    "content.sections[9].comparison.columns[1].body":
      "Mendapat rehat dan tidur yang mencukupi; tidak merokok dan tidak terdedah kepada asap rokok; beriadah dan menghirup udara segar; melakukan pemeriksaan kesihatan secara berkala.",
    "content.sections[10].causeEffect.items[0].note":
      "Imunisasi membantu MENGAWAL pengulangan penyakit dan mengurangkan risiko penularan.",
  },
  DLP: {
    "content.sections[0].comparison.columns[0].body":
      "Can pass from one individual to another. Caused by infection with a pathogen, either directly or through a medium and a vector. Examples: tuberculosis, the common cold, ringworm, tinea versicolor, leptospirosis, dengue fever, malaria and Zika.",
    "content.sections[0].comparison.columns[1].body":
      "Does not pass from one individual to another. Caused by genetic factors or lifestyle. Examples: cancer, hypertension, diabetes, asthma and cardiovascular disease.",
    "content.sections[0].cards[0].body":
      "A pathogen is an organism that causes disease — all viruses, some bacteria, protozoa, fungi and worms.",
    "content.sections[0].cards[1].body":
      "Some bacteria in the large intestine act on food remains and produce vitamin K and vitamin B12, which the body can use.",
    "content.sections[1].accordions[0].body":
      "Pathogens are carried by droplets of saliva or by dust. There are two forms of airborne infection: droplet infection and dust infection. Example diseases: tuberculosis, the common cold, SARS, Influenza A (H1N1) and chickenpox. Prevention: cover the mouth and nose when sneezing, coughing or yawning; do not spit in public places; avoid crowded places; keep living spaces well lit, since ultraviolet rays can kill some airborne microorganisms.",
    "content.sections[1].accordions[1].body":
      "Common where there is no treated water supply and no proper sanitation. Faeces containing pathogens can contaminate a river, and a person becomes infected by drinking the contaminated water. Example diseases: cholera, typhoid fever and amoebic dysentery. Prevention: boil drinking water thoroughly, add chlorine to water supplies and swimming pools, build toilets with proper sanitation, and wash hands with soap after using the toilet.",
    "content.sections[1].accordions[2].body":
      "Happens when infected skin is touched or a patient's clothing is worn. Example diseases: ringworm and tinea versicolor — both caused by fungi. Syphilis and gonorrhoea spread through sexual contact because their pathogens are present in semen and vaginal fluid. HIV, which causes AIDS, can spread through sexual contact, blood and shared needles. Prevention: keep clean and never share clothing or personal items.",
    "content.sections[1].accordions[3].body":
      "Some pathogens use animals to move from one host to a new host. Example diseases: leptospirosis, dengue fever, malaria, Zika and Chikungunya. Prevention: destroy vector breeding sites, use mosquito nets or repellent, and wear clothing that covers the skin.",
    "content.sections[1].cards[0].body":
      "A mosquito carrying a pathogen in its salivary glands bites an uninfected person. Its saliva is released while feeding to stop the blood clotting, and the pathogen enters with it. Another mosquito biting an infected person then carries the infection on to the next victim.",
    "content.sections[2].cards[1].body":
      "An animal that carries a pathogen from one host to a new host. The vector itself does not cause the disease. Examples: Aedes mosquito, cockroach, housefly, rat.",
    "content.sections[2].cards[2].body":
      "The condition that results once a pathogen infects the body. Examples: dengue fever, typhoid, malaria, leptospirosis.",
    "content.sections[3].cards[0].body":
      "Vector control such as fogging and destroying breeding sites belongs to the TERTIARY level, not the primary level. The primary level focuses on cleanliness and immunisation before any infection happens.",
    "content.sections[4].cards[0].body":
      "Non-specific defence (the first and second lines) attacks pathogens generally, whatever their type. Specific defence (the third line) attacks one particular pathogen using the matching antibody.",
    "content.sections[5].cards[0].body":
      "A foreign body or substance not belonging to the body itself that stimulates the production of antibodies. Antigens are found on pathogens, on toxin molecules and on blood cells from a different blood group.",
    "content.sections[5].cards[1].body":
      "A protein produced by white blood cells into the bloodstream in response to an antigen.",
    "content.sections[5].cards[2].body":
      "The ability of the body's system to fight a pathogen before the body becomes infected by that pathogen.",
    "content.sections[5].causeEffect.items[0].note":
      "The antibody produced matches that antigen and no other.",
    "content.sections[6].cards[0].body":
      "A vaccine contains antigens obtained from part or all of the structure of a virus or bacterium that has been weakened or killed.",
    "content.sections[6].cards[1].body":
      "The antigen in the vaccine stimulates the body's immune system to build immunity against that particular infection — without causing the disease itself.",
    "content.sections[6].accordions[1].body":
      "Some vaccines are given more than once. Repeated exposure to the same antigen produces a higher and faster antibody response, so protection becomes stronger and lasts longer.",
    "content.sections[7].cards[0].body":
      "An antiserum is the clear liquid part of blood containing antibodies that prevent disease. It is injected straight into a patient so ready-made antibodies can act immediately.",
    "content.sections[8].cards[0].body":
      "This pattern explains why some vaccines need more than one dose: each extra dose repeats the exposure to the same antigen and lifts protection to a higher level.",
    "content.sections[9].cards[0].body":
      "Eat balanced meals including local vegetables and fruit. Avoid taking sugar in excess, since it weakens the immune system.",
    "content.sections[9].comparison.columns[0].body":
      "Exposure to air pollution; exposure to pesticides; emotional stress; taking sugar in excess.",
    "content.sections[9].comparison.columns[1].body":
      "Getting enough rest and sleep; not smoking and avoiding cigarette smoke; exercising outdoors and breathing fresh air; going for periodic health checks.",
    "content.sections[10].causeEffect.items[0].note":
      "Immunisation helps CONTROL the recurrence of disease and reduces the risk of spread.",
  },
};

/** Only these field-path suffixes are wired to render through ScienceEmphasis. */
const ALLOWED_FIELD = /\.(body|intro|note|challenge|adaptation|role|benefit|remember|quickExplanation)(\[\d+\])?$/;

describe("Chapter 4 — the textbook's emphasis, and only that", () => {
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
    expect(fieldsWithMarkers(scienceF2C4InteractiveBM)).toEqual(fieldsWithMarkers(scienceF2C4InteractiveDLP));
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
