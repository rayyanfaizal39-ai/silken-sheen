import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { getChapterQuizQuestions } from "@/content/registry";
import { quizzes as liveQuizzes, getItemChapterKey } from "@/data/content";
import { sejarahF1Chapter1Quizzes } from "@/data/quizzes";
import {
  orderRegularQuizQuestions,
  shuffleQuestionOptions,
  createAttemptSnapshot,
  restoreAttemptOrder,
} from "@/features/quiz/difficulty/quizDifficulty";
import {
  addCorrectAnswer,
  buildCanonicalQuizKey,
  EMPTY_CORRECT_BY_DIFFICULTY,
} from "@/features/quiz/xp/quizXp";

const bank = getChapterQuizQuestions("sejarah", "Form 1", "Chapter 1");
const areas = {
  "1.1": [1, 14, 29],
  "1.2": [4, 5, 6, 19],
  "1.3": [7, 8, 9],
  "1.4": [2, 10, 11, 12, 13, 27],
  "1.5": [15, 16, 17, 18, 21],
  "1.6": [3, 20, 22, 26],
  "1.7": [23, 24, 25, 28, 30],
};
// Preserve the actual live metadata, not the stale all-Medium importer copy.
const easy = [1, 4, 6, 8, 9, 10, 19, 24];
const hard = [3, 17, 21, 22, 26, 30];
const correctAnswers = [
  "Peristiwa pada masa lalu",
  "Memastikan maklumat boleh disahkan",
  "Menyemak konteks dan bukti sokongan",
  "Herodotus",
  "Fakta-fakta sejarah",
  "Ibn Khaldun",
  "Kronologi dan pembahagian tema",
  "Alaf",
  "Kelahiran Nabi Isa AS",
  "Bersifat asli dan belum ditafsir",
  "Loceng gangsa",
  "Struktur candi",
  "Buku teks sejarah",
  "Riwayat dahulu kala",
  "Kaedah bertulis",
  "Menemu bual bekas tentera",
  "Menentukan skop dan soalan semasa persediaan, merakam temu bual, kemudian menilai fakta dengan sumber bertulis semasa memproses rakaman",
  "Kaedah arkeologi daratan",
  "Muhd Yusof Ibrahim",
  "Menerangkan makna fakta sejarah",
  "Mengesahkan, menyimpan sumber, kemudian menganalisis kandungan",
  "Perbezaan pandangan dan pemilihan sumber boleh menghasilkan tafsiran berbeza tentang peristiwa yang sama",
  "Mengambil iktibar daripada pengalaman lalu",
  "Semangat cinta akan negara",
  "Memahami budaya pelbagai kaum",
  "Menilai semula tafsiran berdasarkan bukti",
  "Sumber primer",
  "Mengekalkan bukti identiti dan asal usul",
  "Menggambarkan salasilah dan asal usul",
  "Memahami tekanan hidup pada zamannya",
];
const source = (name: string) =>
  readFileSync(new URL(`../../../../data/${name}.ts`, import.meta.url), "utf8").replace(
    /\r\n/g,
    "\n",
  );

describe("Sejarah Form 1 Bab 1 selective repair — live registry", () => {
  it("preserves exactly thirty unique IDs and one shared owner", () => {
    expect(bank.map((q) => q.id)).toEqual(
      Array.from({ length: 30 }, (_, i) => `sej-f1-c1-q${i + 1}`),
    );
    expect(sejarahF1Chapter1Quizzes).toHaveLength(30);
    expect(liveQuizzes.filter((q) => /^sej-f1-c1-q\d+$/.test(q.id))).toEqual(bank);
    bank.forEach((q, i) => {
      expect(q).toBe(sejarahF1Chapter1Quizzes[i]);
      expect(q.subjectId).toBe("sejarah");
      expect(q.form).toBe("Form 1");
      expect(getItemChapterKey(q)).toBe("Chapter 1");
    });
  });

  it.each(Array.from({ length: 30 }, (_, i) => i + 1))(
    "q%i has four distinct choices, the audited answer and unchanged difficulty",
    (n) => {
      const q = bank[n - 1];
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options).size).toBe(4);
      expect(Number.isInteger(q.answerIndex) && q.answerIndex >= 0 && q.answerIndex < 4).toBe(true);
      expect(q.options[q.answerIndex]).toBe(correctAnswers[n - 1]);
      expect(q.difficulty).toBe(easy.includes(n) ? "Easy" : hard.includes(n) ? "Hard" : "Medium");
      expect(q.explanation?.trim().length).toBeGreaterThan(40);
      expect(q.question).not.toMatch(
        /gambar di atas|rajah di atas|gambar berikut|rajah berikut|rujuk.*(?:gambar|rajah)|(?:Rajah|Jadual|Aktiviti)\s+\d/i,
      );
      expect(q.options.join(" ")).not.toMatch(/semua di atas/i);
    },
  );

  it("has no duplicated stems and exactly one tambo question, without discarding the strong live q2/q28", () => {
    expect(new Set(bank.map((q) => q.question)).size).toBe(30);
    expect(bank.filter((q) => /tambo/i.test(q.question)).map((q) => q.id)).toEqual([
      "sej-f1-c1-q14",
    ]);
    expect(bank[1].question).toBe(
      "Mengapakah sejarawan perlu menggunakan bukti dalam penyelidikan?",
    );
    expect(bank[27].question).toBe(
      "Mengapakah pemeliharaan warisan sejarah penting kepada generasi akan datang?",
    );
  });

  it("covers every subtopic with the declared thirty-question blueprint", () => {
    expect(
      Object.values(areas)
        .flat()
        .sort((a, b) => a - b),
    ).toEqual(Array.from({ length: 30 }, (_, i) => i + 1));
    expect(Object.values(areas).map((ids) => ids.length)).toEqual([3, 4, 3, 6, 5, 4, 5]);
    expect(bank[6].question).toContain("politik, ekonomi dan sosial");
    expect(bank[18].options[bank[18].answerIndex]).toBe("Muhd Yusof Ibrahim");
    expect(bank[29].question).toContain("empati sejarah");
  });

  it("q15 gives all five written-method steps in the printed order", () => {
    expect(bank[14].explanation).toContain(
      "mengenal pasti sumber → mendapat dan mengesahkan sumber bertulis → mengumpul dan menyimpan sumber → menggunakan peralatan yang sesuai → menganalisis",
    );
    expect(bank[14].question).toBe(
      "Penyelidik mengkaji surat rasmi dan diari lama. Kaedah manakah paling sesuai?",
    );
  });

  it("q17 tests the stages and fact checking; q18 stays focused on scientific archaeology", () => {
    const q17 = bank[16];
    expect(q17.explanation).toContain(
      "Tahap Pertama ialah Persediaan; Tahap Kedua ialah Rakaman temu bual; Tahap Ketiga ialah Memproses rakaman",
    );
    expect(q17.options[q17.answerIndex]).toContain("menilai fakta dengan sumber bertulis");
    expect(q17.question).not.toContain("tokok tambah");
    expect(bank[17].explanation).toContain("pendekatan saintifik");
    expect(bank[17].explanation).not.toMatch(/karbon|carbon dating|radioaktif/i);
  });

  it("q22 preserves the source's local and Western interpretations, then tests why they differ", () => {
    const q = bank[21];
    expect(q.question).toContain(
      "peraturan cukai tanah dan hasil hutan British yang membebankan rakyat",
    );
    expect(q.question).toContain("Pengkaji Barat menganggapnya sebagai pemberontakan");
    expect(q.options[q.answerIndex]).toContain("Perbezaan pandangan dan pemilihan sumber");
    expect(q.explanation).toContain("ideologi dan tujuan penulisan");
    expect(JSON.stringify(q)).not.toMatch(/pejuang tanah air|penjenayah/);
    expect(bank[24].explanation).toContain("kesinambungan hubungan harmoni antara kaum");
    expect(bank[24].explanation).toContain("adat resam serta tradisi");
  });

  it.each([
    ["content", "85bb71c50848e86f5f85b673348551fbcdc86612ee10f1b4a0fafa9fcd8219cb"],
    ["quizzes", "31bbe3c1bff505431b13e733cfd39ebdc71a770268df29dede6f7ea4465c2463"],
  ])("locks untouched Chapters 2–8 records in %s", (file, expectedHash) => {
    const records = [...source(file).matchAll(/ {2}\{\n {4}id: "([^"]+)",[\s\S]*?\n {2}\},/g)]
      .filter((m) => /^sej-f1-c[2-8]-/.test(m[1]))
      .map((m) => m[0])
      .join("\n");
    expect(createHash("sha256").update(records).digest("hex")).toBe(expectedHash);
  });
});

describe("existing Sejarah attempt contract — no shuffle engine change", () => {
  const scope = { subjectId: "sejarah", form: "Form 1" };
  const build = (random: () => number) =>
    orderRegularQuizQuestions(bank, scope, random).questions.map((q) =>
      shuffleQuestionOptions(q, random),
    );

  it("shuffles all thirty without loss and preserves the current tier behavior", () => {
    const attempt = build(() => 0);
    expect(new Set(attempt.map((q) => q.id))).toEqual(new Set(bank.map((q) => q.id)));
    expect(attempt).toHaveLength(30);
    expect(attempt.map((q) => q.id)).not.toEqual(build(() => 0.99).map((q) => q.id));
    expect(attempt.map((q) => q.difficulty)).toEqual([
      ...Array(8).fill("Easy"),
      ...Array(16).fill("Medium"),
      ...Array(6).fill("Hard"),
    ]);
    for (const q of attempt) {
      const original = bank.find((item) => item.id === q.id)!;
      expect(q.options).not.toEqual(original.options);
      expect(q.options[q.answerIndex]).toBe(original.options[original.answerIndex]);
      expect(q.difficulty).toBe(original.difficulty);
    }
  });

  it("retains the single completion identity and difficulty-based XP counts", () => {
    const attempt = build(() => 0);
    expect(
      attempt.reduce(
        (counts, q) => addCorrectAnswer(counts, q.difficulty),
        EMPTY_CORRECT_BY_DIFFICULTY,
      ),
    ).toEqual({ easy: 8, medium: 16, hard: 6 });
    expect(
      buildCanonicalQuizKey({
        kind: "standard",
        subjectId: "sejarah",
        form: "Form 1",
        chapterKey: "Chapter 1",
        lang: "bm",
        set: null,
        difficulty: "All",
      }),
    ).toBe("quiz-v2:standard:sejarah:form-1:chapter-1:bm:set-default:difficulty-all");
  });

  it("restores a saved order and permits a fresh permutation", () => {
    const attempt = build(() => 0);
    const snapshot = createAttemptSnapshot("sejarah-f1-c1", "attempt-1", attempt)!;
    expect(restoreAttemptOrder(snapshot, "sejarah-f1-c1", attempt)).toEqual(attempt);
    expect(restoreAttemptOrder(snapshot, "another-chapter", attempt)).toBeNull();
    expect(build(() => 0.99)).not.toEqual(attempt);
  });

  it("guards the existing route lifecycle: state-held order, start dependencies, explicit reshuffle and reset", () => {
    const route = readFileSync(new URL("../../../../routes/quizzes.tsx", import.meta.url), "utf8");
    expect(route).toContain('subject !== "sejarah" && diff !== "All"');
    expect(route).toContain('difficulty: subject === "sejarah" ? "All" : diff');
    expect(route).toMatch(/const \[shuffledPool, setShuffledPool\] = useState/);
    expect(route).toMatch(
      /if \(timerPref && pool.length > 0\) \{\s*setShuffledPool\(buildShuffledPool\(pool\)\);\s*\}\s*\}, \[timerPref, pool\]\)/,
    );
    expect(route).toMatch(
      /function reshuffle\(\) \{\s*if \(pool.length > 0\) \{\s*setShuffledPool\(buildShuffledPool\(pool\)\)/,
    );
    const answer = route.slice(
      route.indexOf("  function answer(i:"),
      route.indexOf("  function next()"),
    );
    expect(answer).not.toMatch(/setShuffledPool|buildShuffledPool/);
    expect(answer).toContain("addCorrectAnswer(counts, current.difficulty)");
    const reset = route.slice(
      route.indexOf("  function reset()"),
      route.indexOf("  function resetRegularQuiz()"),
    );
    expect(reset).toContain("setTimerPref(null)");
    expect(reset).toContain("setShuffledPool(null)");
  });
});
