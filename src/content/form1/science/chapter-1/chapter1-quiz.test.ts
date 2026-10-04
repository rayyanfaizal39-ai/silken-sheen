import { describe, expect, it } from "vitest";
import { getChapterQuizQuestions } from "@/content/registry";
import { quizzes as liveQuizzes } from "@/data/content";
import { scienceF1Chapter1Quizzes } from "@/data/quizzes";

// Independent assessment blueprint: pair number, area, difficulty, correct EN/BM answer.
const blueprint = [
  [1, "1.1", "Easy", "A discipline involving systematic observations and experiments on natural phenomena", "Disiplin yang melibatkan pemerhatian dan eksperimen sistematik terhadap fenomena alam"],
  [2, "1.1", "Easy", "Biology", "Biologi"],
  [3, "1.1", "Medium", "Physics — helping solve daily-life problems", "Fizik — membantu menyelesaikan masalah kehidupan harian"],
  [4, "1.5", "Hard", "3.0 g cm⁻³; more dense", "3.0 g cm⁻³; lebih tumpat"],
  [5, "1.5", "Hard", "P floats and Q sinks because P is less dense and Q is more dense than water", "P terapung dan Q tenggelam kerana P kurang tumpat dan Q lebih tumpat daripada air"],
  [6, "1.2", "Easy", "Explosive", "Bahan mudah meletup"],
  [7, "1.2", "Medium", "Keep the alcohol away from the flame and heat", "Jauhkan alkohol daripada api dan haba"],
  [8, "1.7", "Hard", "Keep the original readings, check the method and repeat measurements, then judge the hypothesis using the data", "Kekalkan bacaan asal, semak kaedah dan ulang pengukuran, kemudian nilai hipotesis berdasarkan data"],
  [9, "1.2", "Medium", "Rinse with plenty of water and inform the teacher immediately", "Cuci dengan air yang banyak dan maklumkan kepada guru dengan segera"],
  [10, "1.7", "Hard", "Stop, inform the teacher, follow the correct disposal instructions and resume only when safe", "Berhenti, maklumkan kepada guru, ikut arahan pelupusan yang betul dan sambung hanya apabila selamat"],
  [11, "1.2", "Easy", "Burette — measures liquid volume accurately", "Buret — menyukat isi padu cecair dengan tepat"],
  [12, "1.4", "Medium", "Micrometer screw gauge", "Tolok skru mikrometer"],
  [13, "1.3", "Easy", "Meter (m)", "Meter (m)"],
  [14, "1.3", "Medium", "State the units and convert both masses to the same standard unit, such as kilogram", "Nyatakan unit dan tukarkan kedua-dua jisim kepada unit piawai yang sama, seperti kilogram"],
  [15, "1.6", "Medium", "As pendulum length increases, the time for ten oscillations increases", "Semakin bertambah panjang bandul, semakin bertambah masa untuk sepuluh ayunan"],
  [16, "1.6", "Hard", "Two factors change together; keep bob mass constant while changing length", "Dua faktor berubah serentak; malarkan jisim ladung semasa mengubah panjang"],
  [17, "1.3", "Medium", "2500 m and 2.5 g", "2500 m dan 2.5 g"],
  [18, "1.5", "Medium", "15 cm³", "15 cm³"],
  [19, "1.6", "Hard", "Time increases with length, so the data support the hypothesis", "Masa bertambah dengan panjang, maka data menyokong hipotesis"],
  [20, "1.3", "Easy", "0.000001", "0.000001"],
  [21, "1.4", "Hard", "Q is more accurate, but P is more consistent", "Q lebih jitu, tetapi P lebih persis"],
  [22, "1.4", "Easy", "An instrument gives a non-zero reading when it should read zero", "Alat menunjukkan bacaan bukan sifar apabila sepatutnya menunjukkan sifar"],
  [23, "1.4", "Medium", "3.20 cm", "3.20 cm"],
  [24, "1.4", "Easy", "The eye is not perpendicular to the scale being read", "Mata tidak berserenjang dengan skala yang dibaca"],
  [25, "1.4", "Hard", "Measure a stack of 100 sheets, divide by 100, then check one sheet with a micrometer screw gauge", "Ukur timbunan 100 helai, bahagi dengan 100, kemudian semak sehelai dengan tolok skru mikrometer"],
  [26, "1.5", "Easy", "Mass per unit volume", "Jisim per unit isi padu"],
  [27, "1.6", "Easy", "Identify problem → construct hypothesis → control variables → plan experiment", "Mengenal pasti masalah → membina hipotesis → mengawal pemboleh ubah → merancang eksperimen"],
  [28, "1.6", "Medium", "Observation, then inference", "Pemerhatian, kemudian inferens"],
  [29, "1.7", "Hard", "Check the records respectfully and repeat the measurement, because conclusions require honest, validated data", "Semak rekod dengan sopan dan ulang pengukuran kerana kesimpulan memerlukan data yang jujur dan disahkan"],
  [30, "1.5", "Hard", "1.8 g cm-3", "1.8 g cm-3"],
] as const;

describe("Science Form 1 Chapter 1 live quiz", () => {
  const banks = {
    dlp: getChapterQuizQuestions("science", "Form 1", "Chapter 1", "dlp"),
    bm: getChapterQuizQuestions("science", "Form 1", "Chapter 1", "bm"),
  };

  it("has a single owner shared by the importer, barrel and actual registry", () => {
    expect(scienceF1Chapter1Quizzes).toHaveLength(60);
    expect(liveQuizzes.filter((q) => /^sci-f1-c1-/.test(q.id))).toEqual(scienceF1Chapter1Quizzes);
    for (const q of [...banks.dlp, ...banks.bm]) {
      expect(scienceF1Chapter1Quizzes.find((source) => source.id === q.id)).toBe(q);
    }
  });

  it.each(["dlp", "bm"] as const)("preserves 30 IDs, identity, 10/10/10 and valid questions in %s", (lang) => {
    const bank = banks[lang];
    expect(bank.map((q) => q.id)).toEqual(Array.from({ length: 30 }, (_, i) => `sci-f1-c1-${lang}-q${i + 1}`));
    expect(new Set(bank.map((q) => q.question)).size).toBe(30);
    for (const difficulty of ["Easy", "Medium", "Hard"]) {
      expect(bank.filter((q) => q.difficulty === difficulty)).toHaveLength(10);
    }
    for (const q of bank) {
      expect(q).toMatchObject({ subjectId: "science", form: "Form 1", chapter: "Chapter 1", lang });
      expect(q.options).toHaveLength(4);
      expect(new Set(q.options).size).toBe(4);
      expect(Number.isInteger(q.answerIndex) && q.answerIndex >= 0 && q.answerIndex < 4).toBe(true);
      expect(q.explanation?.trim().length).toBeGreaterThan(40);
      expect(JSON.stringify(q)).not.toMatch(/acetone|aseton|oxidising|pengoksidaan|cyanide|sianida|bell jar|balang loceng|potassium manganate|kalium manganat|all of the above|semua di atas/i);
      expect(q.question).not.toMatch(/(?:activity|aktiviti|figure|rajah|table|jadual)\s+\d|diagram above|rajah di atas|image shown/i);
    }
  });

  it.each(blueprint)("q%i retains its audited area %s and difficulty %s", (n, _area, difficulty, enAnswer, bmAnswer) => {
    const en = banks.dlp[n - 1];
    const bm = banks.bm[n - 1];
    expect(en.difficulty).toBe(difficulty);
    expect(bm.difficulty).toBe(difficulty);
    expect(en.answerIndex).toBe(bm.answerIndex);
    expect(en.options[en.answerIndex]).toBe(enAnswer);
    expect(bm.options[bm.answerIndex]).toBe(bmAnswer);
    // Every scenario's numeric givens and options must survive translation.
    const numbers = (text: string) => text.match(/[+−-]?\d+(?:\.\d+)?/g) ?? [];
    expect(numbers(bm.question)).toEqual(numbers(en.question));
    en.options.forEach((option, i) => expect(numbers(bm.options[i])).toEqual(numbers(option)));
  });

  it("covers all seven areas, including meaningful investigation and value reasoning", () => {
    expect(Object.fromEntries(Array.from({ length: 7 }, (_, i) => {
      const area = `1.${i + 1}`;
      return [area, blueprint.filter((row) => row[1] === area).length];
    }))).toEqual({ "1.1": 3, "1.2": 4, "1.3": 4, "1.4": 6, "1.5": 5, "1.6": 5, "1.7": 3 });
    expect(banks.dlp[14].explanation).toContain("manipulated variable");
    expect(banks.dlp[15].explanation).toContain("keep bob mass constant");
    expect(banks.dlp[18].explanation).toContain("2.3 s and 1.7 s");
    expect(banks.dlp[27].explanation).toContain("inference");
    expect(banks.dlp[7].explanation).toContain("Honesty");
    expect(banks.dlp[9].explanation).toContain("environment");
    expect(banks.dlp[28].explanation).toContain("Respectful");
  });

  it("teaches calculations and distinguishes accuracy, consistency and sensitivity", () => {
    for (const bank of Object.values(banks)) {
      expect(bank[3].explanation).toContain("45 ÷ 15 = 3.0");
      expect(bank[16].explanation).toContain("2500 ÷ 1000 = 2.5");
      expect(bank[22].explanation).toContain("3.22 − (+0.02) = 3.20");
      expect(bank[29].explanation).toContain("320 - 230 = 90");
    }
    expect(banks.dlp[20].question).toContain("Accuracy and Consistency");
    expect(banks.bm[20].question).toContain("Kejituan dan Kepersisan");
    expect(banks.dlp[24].explanation).toContain("sensitivity");
    expect(banks.bm[24].explanation).toContain("kepekaan");
  });
});
