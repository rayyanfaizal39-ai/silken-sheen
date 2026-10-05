import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { getChapterQuizQuestions } from "@/content/registry";
import { quizzes as liveQuizzes, getItemChapterKey } from "@/data/content";
import { sejarahF1Chapter2Quizzes } from "@/data/quizzes";
import {
  orderRegularQuizQuestions,
  shuffleQuestionOptions,
  createAttemptSnapshot,
  restoreAttemptOrder,
} from "@/features/quiz/difficulty/quizDifficulty";

const bank = getChapterQuizQuestions("sejarah", "Form 1", "Chapter 2");
const areas = {
  "2.1": [1, 2, 3, 27, 28],
  "2.2": [5, 7, 12, 17, 26],
  "2.3": [4, 9, 10, 11],
  "2.4": [6, 13, 14, 15, 16],
  "2.5": [18, 19, 20, 21, 29],
  "2.6": [8, 22, 23, 24, 25, 30],
};
const correctAnswers = [
  "Geologi",
  "Mengkaji hidupan purba melalui fosil",
  "Melebihi 4.6 bilion tahun",
  "Miosen, Pliosen, Pleistosen, Holosen",
  "Pembentukan fizikal kawasan gunung-ganang",
  "Daratan bersambung melalui jambatan darat",
  "Penyebaran padang rumput dan savana",
  "Laluan berjalan kaki antara kawasan terputus",
  "Zaman Holosen",
  "5.3 juta hingga 2.6 juta tahun dahulu",
  "2.5 juta hingga 10,000 tahun dahulu",
  "Tulisan kuneiform",
  "Berpindah-randah sambil memburu binatang",
  "Rumput dan tumbuhan renek yang menjalar",
  "Iklim lebih sejuk daripada kini",
  "Paras laut menurun; daratan pantai meluas",
  "Air batu mencair akibat peningkatan suhu bumi",
  "100 meter",
  "Air glasier memenuhi lekukan daratan",
  "Mamot, sloth dan harimau bertaring",
  "Suhu di kedua-dua benua tidak lagi terlalu sejuk",
  "Daratan penghubung sebahagian Asia Tenggara",
  "Sumatera, Jawa dan Borneo",
  "Selat Melaka, Teluk Siam dan Laut Jawa",
  "Daratan yang bersambung menghubungkan masyarakat yang berkongsi warisan",
  "Tempoh panjang kesejukan dan peluasan ais",
  "Pasifik, Atlantik, Hindi, Selatan dan Artik",
  "Tujuh benua",
  "Kegiatan radiasi bumi",
  "Memelihara hutan dan habitat asal",
];
const easy = [2, 4, 5, 9, 13, 14, 17, 28];
const hard = [8, 15, 16, 20, 25, 29];
const allText = JSON.stringify(bank);
const correct = (n: number) => bank[n - 1].options[bank[n - 1].answerIndex];

describe("Sejarah Form 1 Bab 2 — textbook audit and single live owner", () => {
  it("retains exactly thirty IDs, metadata and shared records in the actual live registry", () => {
    expect(bank.map((q) => q.id)).toEqual(
      Array.from({ length: 30 }, (_, i) => `sej-f1-c2-q${i + 1}`),
    );
    expect(sejarahF1Chapter2Quizzes).toHaveLength(30);
    expect(liveQuizzes.filter((q) => /^sej-f1-c2-q\d+$/.test(q.id))).toEqual(bank);
    bank.forEach((q, i) => {
      expect(q).toBe(sejarahF1Chapter2Quizzes[i]);
      expect(q.subjectId).toBe("sejarah");
      expect(q.form).toBe("Form 1");
      expect(getItemChapterKey(q)).toBe("Chapter 2");
      expect(q.difficulty).toBe(
        easy.includes(i + 1) ? "Easy" : hard.includes(i + 1) ? "Hard" : "Medium",
      );
    });
    expect(new Set(bank.map((q) => q.question)).size).toBe(30);
  });

  it.each(Array.from({ length: 30 }, (_, i) => i + 1))(
    "q%i has distinct choices, a valid audited answer and no missing image dependency",
    (n) => {
      const q = bank[n - 1];
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options).size).toBe(4);
      expect(Number.isInteger(q.answerIndex) && q.answerIndex >= 0 && q.answerIndex < 4).toBe(true);
      expect(correct(n)).toBe(correctAnswers[n - 1]);
      expect(q.explanation?.length).toBeGreaterThan(40);
      expect(q.question).not.toMatch(
        /(?:gambar|rajah|peta) (?:di atas|di bawah|berikut)|rujuk.*(?:gambar|rajah|peta)/i,
      );
      expect(q.options.join(" ")).not.toMatch(/semua di atas|tiada di atas/i);
      // Catch conspicuous answer-length cues without forcing equal-length padding.
      const others = q.options
        .filter((_, i) => i !== q.answerIndex)
        .map((o) => o.length)
        .sort((a, b) => a - b);
      expect(correct(n).length / others[1]).toBeGreaterThan(0.5);
      expect(correct(n).length / others[1]).toBeLessThan(1.75);
    },
  );

  it("covers all six areas with thirty distinct slots", () => {
    expect(
      Object.values(areas)
        .flat()
        .sort((a, b) => a - b),
    ).toEqual(Array.from({ length: 30 }, (_, i) => i + 1));
    expect(Object.values(areas).map((ids) => ids.length)).toEqual([5, 5, 4, 5, 5, 6]);
    expect(correct(1)).toBe("Geologi");
    expect(correct(2)).toContain("fosil");
    expect(correct(3)).toBe("Melebihi 4.6 bilion tahun");
    expect(correct(4)).toBe("Miosen, Pliosen, Pleistosen, Holosen");
    expect(correct(12)).toBe("Tulisan kuneiform");
    expect(correct(14)).toBe("Rumput dan tumbuhan renek yang menjalar");
  });

  it("uses the specified textbook dates, not modern substituted dates", () => {
    expect(bank[4].explanation).toContain("23 juta hingga 5 juta tahun dahulu");
    expect(bank[8].explanation).toContain("10,000 tahun dahulu hingga kini");
    expect(correct(10)).toBe("5.3 juta hingga 2.6 juta tahun dahulu");
    expect(correct(11)).toBe("2.5 juta hingga 10,000 tahun dahulu");
    expect(bank[10].explanation).toContain("11 kali");
    expect(allText).not.toMatch(/11,700|11\.700|11700|MPPH/);
  });

  it("ties pengglasieran to the textbook context and separates the sea-level figures", () => {
    expect(bank[16].question).toContain("Menurut penerangan Bab 2");
    expect(bank[16].question).toContain("pengglasieran");
    expect(correct(17)).toBe("Air batu mencair akibat peningkatan suhu bumi");
    expect(bank[17].question).toContain("penerangan umum");
    expect(correct(18)).toBe("100 meter");
    expect(bank[17].explanation).toContain("Pentas Sunda di Asia Tenggara");
    expect(bank[17].explanation).toContain("100 hingga 120 meter");
    expect(correct(26)).toBe("Tempoh panjang kesejukan dan peluasan ais");
  });

  it("keeps extinction at the source's stated examples, and migration tied to the climate", () => {
    expect(correct(20)).toBe("Mamot, sloth dan harimau bertaring");
    expect(bank[19].question).not.toMatch(/punca|sebab|risiko|makanan/i);
    expect(bank[19].explanation).toContain("tidak menetapkan satu punca tunggal");
    expect(bank[20].question).toMatch(/Afrika.*Eropah dan Asia/);
    expect(correct(21)).toContain("tidak lagi terlalu sejuk");
    expect(allText).not.toContain("Pemanasan mengurangkan tumbuhan makanan");
  });

  it("uses precise Sunda regions and retains physical/cultural outcomes without absolutes", () => {
    expect(correct(23)).toBe("Sumatera, Jawa dan Borneo");
    expect(correct(23)).not.toMatch(/Malaysia|Indonesia/);
    expect(bank[22].explanation).toContain("Semenanjung Tanah Melayu");
    expect(correct(24)).toBe("Selat Melaka, Teluk Siam dan Laut Jawa");
    expect(bank[23].explanation).toContain("bukan bermakna semua pulau");
    expect(bank[24].explanation).toContain(
      "kepercayaan, asal usul keturunan, bahasa, budaya dan masyarakat",
    );
    expect(bank[24].explanation).toContain(
      "tidak bermaksud semua masyarakat Asia Tenggara serupa sepenuhnya",
    );
  });

  it("q27 gives four comparable five-name options; q28 retains the textbook continent names", () => {
    expect(bank[26].question).toContain("lima lautan");
    for (const option of bank[26].options) expect(option.split(/, | dan /)).toHaveLength(5);
    expect(correct(27)).toBe("Pasifik, Atlantik, Hindi, Selatan dan Artik");
    for (const ocean of ["Pasifik", "Atlantik", "Hindi", "Selatan", "Artik"])
      expect(bank[26].explanation).toContain(`Lautan ${ocean}`);
    expect(bank[27].explanation).toContain(
      "Asia, Afrika, Eropah, Amerika Utara, Amerika Selatan, Oceania dan Antartika",
    );
    expect(bank[27].explanation).not.toContain("Australia");
  });

  it("q29 uses radiasi bumi and does not attribute the historical warming to open burning", () => {
    expect(bank[28].question).toContain("Menurut Bab 2");
    expect(correct(29)).toBe("Kegiatan radiasi bumi");
    expect(correct(29)).not.toMatch(/matahari|pembakaran/);
    expect(bank[28].explanation).toContain("pembakaran terbuka bukan jawapan");
    expect(correct(30)).toBe("Memelihara hutan dan habitat asal");
  });

  it.each([
    ["content", "465a1603cf33ba899ba6361cc4acf5cca14619652a935a81c800c6aa6062e1ff"],
    ["quizzes", "4f09ebbbaae9fbc7ee2aa6e7ae06ee034ff6e258daf825dd3c590f660897251c"],
  ])(
    "locks every unrelated inline record in %s, including Chapter 1 and Chapters 4–8",
    (file, expected) => {
      const source = readFileSync(
        new URL(`../../../../data/${file}.ts`, import.meta.url),
        "utf8",
      ).replace(/\r\n/g, "\n");
      const records = [...source.matchAll(/ {2}\{\n {4}id: "([^"]+)",[\s\S]*?\n {2}\},/g)]
        .filter((m) => !/^sej-f1-c[23]-q\d+$/.test(m[1]))
        .map((m) => m[0])
        .join("\n");
      expect(createHash("sha256").update(records).digest("hex")).toBe(expected);
    },
  );
});

describe("Bab 2 existing Sejarah shuffle contract", () => {
  const build = (random: () => number) =>
    orderRegularQuizQuestions(bank, { subjectId: "sejarah", form: "Form 1" }, random).questions.map(
      (q) => shuffleQuestionOptions(q, random),
    );
  it("shuffles the whole pool across tiers and options without losing the correct answers", () => {
    const a = build(() => 0);
    const b = build(() => 0.99);
    expect(a).toHaveLength(30);
    expect(new Set(a.map((q) => q.id))).toEqual(new Set(bank.map((q) => q.id)));
    expect(a.map((q) => q.id)).not.toEqual(b.map((q) => q.id));
    const tiers = a.map((q) => q.difficulty);
    expect(tiers.filter((d) => d === "Easy")).toHaveLength(8);
    expect(tiers.filter((d) => d === "Medium")).toHaveLength(16);
    expect(tiers.filter((d) => d === "Hard")).toHaveLength(6);
    expect(tiers).not.toEqual([
      ...Array(8).fill("Easy"),
      ...Array(16).fill("Medium"),
      ...Array(6).fill("Hard"),
    ]);
    for (const q of a) {
      const original = bank.find((o) => o.id === q.id)!;
      expect(q.options).not.toEqual(original.options);
      expect(q.options[q.answerIndex]).toBe(original.options[original.answerIndex]);
    }
    const snapshot = createAttemptSnapshot("sejarah-f1-c2", "attempt-2", a)!;
    expect(restoreAttemptOrder(snapshot, "sejarah-f1-c2", a)).toEqual(a);
    expect(restoreAttemptOrder(snapshot, "sejarah-f1-c1", a)).toBeNull();
  });
});
