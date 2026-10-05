import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { getChapterQuizQuestions } from "@/content/registry";
import { quizzes as liveQuizzes, getItemChapterKey } from "@/data/content";
import { sejarahF1Chapter3Quizzes } from "@/data/quizzes";
import {
  orderRegularQuizQuestions,
  shuffleQuestionOptions,
  createAttemptSnapshot,
  restoreAttemptOrder,
} from "@/features/quiz/difficulty/quizDifficulty";
import {
  addCorrectAnswer,
  EMPTY_CORRECT_BY_DIFFICULTY,
  buildCanonicalQuizKey,
} from "@/features/quiz/xp/quizXp";

const bank = getChapterQuizQuestions("sejarah", "Form 1", "Chapter 3");
const correctAnswers = [
  "Zaman sebelum manusia mengetahui dan mengenal tulisan",
  "Paleolitik → Mesolitik → Neolitik → Logam",
  "Alat batu ringkas dan kasar",
  "Gua Zhoukoudian, China",
  "Upacara ritual dan pemerhatian bintang",
  "Pembuatan peralatan batu",
  "Pemburuan, pengumpulan makanan dan perikanan",
  "Zaman Neolitik",
  "Pertukaran barang tanpa wang",
  "Sisa kerang dan debunga tumbuhan",
  "Gangsa dan Besi",
  "Masyarakat menggunakan peralatan sebelum mengenali tulisan",
  "Kepercayaan unsur alam mempunyai roh",
  "Pembentukan sistem pentadbiran yang lebih tersusun",
  "Pertukaran barangan antara masyarakat",
  "Lebih halus dan tajam",
  "Memperoleh makanan melalui pemburuan dan pengumpulan",
  "Kepercayaan terhadap kehidupan selepas mati",
  "Mencari makanan dan sumber alam",
  "Penguasaan teknologi logam",
  "Kehidupan masyarakat yang tersusun",
  "Peralatan batu bersaiz kecil",
  "Penggunaan tembikar untuk keperluan harian",
  "Kemahiran seni pertukangan",
  "Zaman Hoabinhian",
  "Penggunaan alat untuk keperluan manusia",
  "Penanaman bijirin dan penjinakan haiwan",
  "Lembah Bernam, Selangor",
  "Zaman Logam",
  "Merekod dan melindungi tinggalan asal",
];
const easy = [1, 3, 4, 8, 9, 11, 13, 22];
const hard = [10, 14, 17, 18, 23, 26, 30];
// Primary assessment focus, with cross-topic source references in the audit.
const coverage = {
  "3.1": [1, 2, 11, 29],
  "3.2": [4, 5, 10, 17, 21],
  "3.3": [3, 7, 8, 9, 13, 14, 16, 19, 22, 24],
  "3.4": [18, 23, 26, 27],
  "3.5": [6, 12, 15, 20, 25, 28, 30],
};
const correct = (n: number) => bank[n - 1].options[bank[n - 1].answerIndex];
const allText = JSON.stringify(bank);
const hash = (text: string) => createHash("sha256").update(text).digest("hex");

describe("Sejarah Form 1 Bab 3 — selective source repair", () => {
  it("keeps thirty unique IDs and one owner in the actual live registry", () => {
    expect(bank.map((q) => q.id)).toEqual(
      Array.from({ length: 30 }, (_, i) => `sej-f1-c3-q${i + 1}`),
    );
    expect(sejarahF1Chapter3Quizzes).toHaveLength(30);
    expect(liveQuizzes.filter((q) => /^sej-f1-c3-q\d+$/.test(q.id))).toEqual(bank);
    bank.forEach((q, i) => {
      expect(q).toBe(sejarahF1Chapter3Quizzes[i]);
      expect(q.subjectId).toBe("sejarah");
      expect(q.form).toBe("Form 1");
      expect(q.chapter).toBe("Chapter 3");
      expect(getItemChapterKey(q)).toBe("Chapter 3");
      expect(q.difficulty).toBe(
        easy.includes(i + 1) ? "Easy" : hard.includes(i + 1) ? "Hard" : "Medium",
      );
    });
    expect(new Set(bank.map((q) => q.question)).size).toBe(30);
  });

  it.each(Array.from({ length: 30 }, (_, i) => i + 1))(
    "q%i has the source-audited answer, four distinct choices and no conspicuous length cue",
    (n) => {
      const q = bank[n - 1];
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options).size).toBe(4);
      expect(Number.isInteger(q.answerIndex) && q.answerIndex >= 0 && q.answerIndex < 4).toBe(true);
      expect(correct(n)).toBe(correctAnswers[n - 1]);
      expect(q.explanation?.trim().length).toBeGreaterThan(40);
      expect(q.question).not.toMatch(
        /(?:gambar|rajah|peta) (?:di atas|di bawah|berikut)|rujuk.*(?:gambar|rajah|peta)/i,
      );
      expect(q.options.join(" ")).not.toMatch(/semua di atas|tiada di atas/i);
      const others = q.options
        .filter((_, i) => i !== q.answerIndex)
        .map((o) => o.length)
        .sort((a, b) => a - b);
      // Broad outlier guard, not an equal-character-count requirement.
      expect(correct(n).length / others[1]).toBeGreaterThan(0.5);
      expect(correct(n).length / others[1]).toBeLessThan(1.75);
    },
  );

  it("retains eighteen strong live records byte-for-byte in serialized data", () => {
    const keep = [2, 4, 5, 6, 8, 9, 11, 12, 13, 15, 16, 17, 19, 21, 24, 26, 27, 30];
    expect(hash(JSON.stringify(keep.map((n) => bank[n - 1])))).toBe(
      "2d803ab9e3bdd96f9bb0bbedc8f4c155be8efcf8cd2f19bbf9a07c61beca92a7",
    );
  });

  it("covers all five sections without counting any question twice", () => {
    expect(
      Object.values(coverage)
        .flat()
        .sort((a, b) => a - b),
    ).toEqual(Array.from({ length: 30 }, (_, i) => i + 1));
    expect(Object.values(coverage).map((ids) => ids.length)).toEqual([4, 5, 10, 4, 7]);
    expect(correct(1)).toBe("Zaman sebelum manusia mengetahui dan mengenal tulisan");
    expect(bank[0].explanation).toContain("nirleka");
    expect(bank[0].explanation).not.toContain("hanya bergantung");
    expect(bank[1].explanation).toContain("Paleolitik, Mesolitik dan Neolitik");
    expect(correct(29)).toBe("Zaman Logam");
    expect(bank[28].question).toContain("pelayaran");
  });

  it("uses direct source tool/economy explanations, without unsupported manufacturing or protein claims", () => {
    expect(bank[2].explanation).toContain("ringkas dan kasar");
    expect(bank[6].explanation).toContain(
      "mengutip hasil hutan, memburu binatang dan menangkap ikan",
    );
    expect(bank[21].explanation).toContain("nipis dan sisinya tajam bergerigi");
    expect(allText).not.toMatch(/mencanang|protein|harpun/);
  });

  it("q10 tests the source's ecofacts, not unverified Bukit Tengkorak trivia", () => {
    expect(bank[9].question).toContain("artifak buatan manusia daripada ekofak");
    expect(correct(10)).toBe("Sisa kerang dan debunga tumbuhan");
    expect(bank[9].options).toEqual([
      "Kapak batu dan bekas tembikar",
      "Sisa kerang dan debunga tumbuhan",
      "Gendang gangsa dan manik hiasan",
      "Kapak besi dan loceng gangsa",
    ]);
    expect(allText).not.toContain("Bukit Tengkorak");
  });

  it("q12 preserves the strong live evidence inference and avoids unsupported superlatives", () => {
    expect(bank[11].question).toContain("alat batu bersama tinggalan manusia");
    expect(correct(12)).toContain("sebelum mengenali tulisan");
    expect(allText).not.toMatch(/tertua dan terlengkap|paling penting di Perak|tertua di Sarawak/);
  });

  it("q14 teaches source Metal Age administration; q15 retains verified bronze-object trade", () => {
    expect(bank[13].question).toContain("Zaman Logam");
    expect(correct(14)).toBe("Pembentukan sistem pentadbiran yang lebih tersusun");
    expect(JSON.stringify(bank[13])).not.toMatch(/bandar|kota|membahagikan hasil pertanian/i);
    expect(bank[14].question).toContain("Loceng dan gendang gangsa");
    expect(correct(15)).toBe("Pertukaran barangan antara masyarakat");
    expect(JSON.stringify(bank[14])).not.toMatch(/Sungai Lang|status sosial|Dong Son|ritual/);
  });

  it("q18 uses equipment and food in burials to infer life-after-death belief", () => {
    expect(bank[17].question).toContain("peralatan dan bahan makanan");
    expect(correct(18)).toBe("Kepercayaan terhadap kehidupan selepas mati");
    expect(bank[17].explanation).toContain("penghormatan terhadap orang mati");
    expect(bank[17].question).not.toContain("barangan berharga");
  });

  it("q20 uses the verified Klang evidence without inventing a socketed-tool/site pairing", () => {
    expect(bank[19].question).toContain("Klang, Selangor");
    expect(correct(20)).toBe("Penguasaan teknologi logam");
    expect(bank[19].explanation).toContain("membuktikan kewujudan Zaman Logam");
    expect(JSON.stringify(bank[19])).not.toMatch(/bersoket|Lembah Bernam/);
  });

  it("q24 retains decorated-bronze aesthetics; q25 replaces the weak evidence/obsolete folklore slot", () => {
    expect(bank[23].question).toContain("Corak hiasan pada alat gangsa");
    expect(correct(24)).toBe("Kemahiran seni pertukangan");
    expect(bank[23].explanation).toContain("seni masyarakat Zaman Logam");
    expect(JSON.stringify(bank[23])).not.toMatch(/batu besar|monumen|megalit/);
    expect(bank[24].question).toContain("Mesolitik di Asia Tenggara");
    expect(correct(25)).toBe("Zaman Hoabinhian");
    expect(bank[24].explanation).toContain("Gua Cha di Ulu Kelantan");
    expect(allText).not.toMatch(/cerita rakyat|cerita lisan/);
  });

  it("q28 uses the exact burial/site label; q29 does not restore Catal Huyuk enrichment", () => {
    expect(bank[27].question).toContain("Kubur Kepingan Batu");
    expect(correct(28)).toBe("Lembah Bernam, Selangor");
    expect(JSON.stringify(bank[27])).not.toMatch(/batu besar|evolusi|ruang mayat|Zaman Logam/);
    expect(allText).not.toMatch(
      /masuk melalui bumbung|tanpa jalan raya|rumah-rumahnya dibina rapat/,
    );
    expect(bank[22].question).toContain("labu sayong");
    expect(bank[22].explanation).toContain("Kuala Kangsar, Perak");
    expect(bank[25].question).toContain("kesinambungan");
    expect(bank[26].question).toContain("pertanian dan penternakan hari ini");
  });

  it("preserves the existing balanced source answer positions", () => {
    expect(bank.map((q) => q.answerIndex)).toEqual([
      3, 1, 3, 0, 3, 2, 1, 0, 2, 1, 0, 1, 0, 3, 1, 2, 0, 2, 2, 1, 3, 3, 2, 3, 0, 2, 2, 0, 3, 1,
    ]);
    expect([0, 1, 2, 3].map((index) => bank.filter((q) => q.answerIndex === index).length)).toEqual(
      [7, 7, 8, 8],
    );
  });

  it.each([
    ["content", "465a1603cf33ba899ba6361cc4acf5cca14619652a935a81c800c6aa6062e1ff"],
    ["quizzes", "76fde311e2bba5454e7b2cd6eaeca3892cbd078a04ccfabf04306f5ccf3c3313"],
  ])(
    "locks every unrelated inline record in %s, including Chapters 1, 2 and 4–8",
    (file, expected) => {
      const text = readFileSync(
        new URL(`../../../../data/${file}.ts`, import.meta.url),
        "utf8",
      ).replace(/\r\n/g, "\n");
      const records = [...text.matchAll(/ {2}\{\n {4}id: "([^"]+)",[\s\S]*?\n {2}\},/g)]
        .filter((m) => !/^sej-f1-c3-q\d+$/.test(m[1]))
        .map((m) => m[0])
        .join("\n");
      expect(hash(records)).toBe(expected);
    },
  );
});

describe("Bab 3 existing attempt behavior — no shuffle-engine change", () => {
  const build = (random: () => number) =>
    orderRegularQuizQuestions(bank, { subjectId: "sejarah", form: "Form 1" }, random).questions.map(
      (q) => shuffleQuestionOptions(q, random),
    );
  it("includes all thirty, changes question/options order, and remaps answerIndex correctly", () => {
    const a = build(() => 0),
      b = build(() => 0.99);
    expect(a).toHaveLength(30);
    expect(new Set(a.map((q) => q.id))).toEqual(new Set(bank.map((q) => q.id)));
    expect(a.map((q) => q.id)).not.toEqual(b.map((q) => q.id));
    const tiers = a.map((q) => q.difficulty);
    expect(tiers.filter((d) => d === "Easy")).toHaveLength(8);
    expect(tiers.filter((d) => d === "Medium")).toHaveLength(15);
    expect(tiers.filter((d) => d === "Hard")).toHaveLength(7);
    expect(tiers).not.toEqual([
      ...Array(8).fill("Easy"),
      ...Array(15).fill("Medium"),
      ...Array(7).fill("Hard"),
    ]);
    for (const q of a) {
      const original = bank.find((o) => o.id === q.id)!;
      expect(q.options).not.toEqual(original.options);
      expect(q.options[q.answerIndex]).toBe(original.options[original.answerIndex]);
    }
    const snapshot = createAttemptSnapshot("sejarah-f1-c3", "attempt-3", a)!;
    expect(restoreAttemptOrder(snapshot, "sejarah-f1-c3", a)).toEqual(a);
    expect(restoreAttemptOrder(snapshot, "sejarah-f1-c2", a)).toBeNull();
  });
  it("preserves combined Sejarah identity and actual live difficulty-based XP inputs", () => {
    expect(
      build(() => 0).reduce(
        (counts, q) => addCorrectAnswer(counts, q.difficulty),
        EMPTY_CORRECT_BY_DIFFICULTY,
      ),
    ).toEqual({ easy: 8, medium: 15, hard: 7 });
    expect(
      buildCanonicalQuizKey({
        kind: "standard",
        subjectId: "sejarah",
        form: "Form 1",
        chapterKey: "Chapter 3",
        lang: "bm",
        set: null,
        difficulty: "All",
      }),
    ).toBe("quiz-v2:standard:sejarah:form-1:chapter-3:bm:set-default:difficulty-all");
  });
});
