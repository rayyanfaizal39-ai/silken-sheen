import { describe, expect, it } from "vitest";

import {
  getChapter,
  getRegisteredSubjectChapters,
  hasFormResourceContent,
} from "@/content/registry";
import { flashcards, getItemChapterKey } from "@/data/content";
import {
  getStudyRouteMode,
  isRouteActive,
  normalizeFlashcardSetParam,
  normalizeFormParam,
  normalizeSubjectParam,
} from "@/lib/study-routing";
import {
  getFlashcardDeckCards,
  hasFlashcardDeck,
  splitFlashcardDeck,
} from "@/lib/flashcard-availability";

describe("Flashcards route resolution", () => {
  it("keeps Notes, Flashcards, and Quizzes as distinct route modes", () => {
    expect(getStudyRouteMode("/notes")).toBe("notes");
    expect(getStudyRouteMode("/flashcards")).toBe("flashcards");
    expect(getStudyRouteMode("/quizzes")).toBe("quizzes");
  });

  it("activates Flashcards—not Notes—on the Flashcards route", () => {
    expect(isRouteActive("/flashcards", "/flashcards")).toBe(true);
    expect(isRouteActive("/flashcards", "/notes")).toBe(false);
  });

  it("normalizes numeric/string forms and subject aliases consistently", () => {
    expect(normalizeFormParam(1)).toBe("Form 1");
    expect(normalizeFormParam("1")).toBe("Form 1");
    expect(normalizeFormParam("Form 1")).toBe("Form 1");
    expect(normalizeSubjectParam("sains")).toBe("science");
    expect(normalizeSubjectParam("bahasa-melayu")).toBe("bm");
    expect(normalizeSubjectParam("geografi")).toBe("geography");
  });

  it("resolves the Science Form 1 chapter list and BM/DLP Chapter 1 decks", () => {
    const chapters = getRegisteredSubjectChapters("science", "bm", "Form 1");
    const chapterCards = flashcards.filter(
      (card) =>
        card.subjectId === "science" &&
        card.form === "Form 1" &&
        getItemChapterKey(card) === "Chapter 1",
    );
    const bmCards = chapterCards.filter((card) => !card.lang || card.lang === "bm");
    const dlpCards = chapterCards.filter((card) => card.lang === "dlp");

    expect(chapters.length).toBeGreaterThan(0);
    expect(chapters[0]?.key).toBe("Chapter 1");
    expect(bmCards.length).toBeGreaterThan(0);
    expect(dlpCards.length).toBeGreaterThan(0);
    expect(bmCards.map((card) => card.id)).not.toEqual(dlpCards.map((card) => card.id));
  });

  it("marks Science Form 1 Chapter 2 and a later populated chapter as available", () => {
    expect(hasFlashcardDeck("science", 1, "Chapter 2", "bm")).toBe(true);
    expect(hasFlashcardDeck("sains", "Form 1", "Bab 2", "dlp")).toBe(true);
    expect(hasFlashcardDeck("science", "1", "chapter-9", "bm")).toBe(true);
  });

  it("keeps every existing Science Form 1 BM and DLP chapter available", () => {
    for (let chapter = 1; chapter <= 9; chapter += 1) {
      expect(hasFlashcardDeck("science", "Form 1", `Chapter ${chapter}`, "bm")).toBe(true);
      expect(hasFlashcardDeck("sains", 1, `Bab ${chapter}`, "dlp")).toBe(true);
    }
  });

  it("splits a canonical chapter into exactly three unique 20-card sets", () => {
    const cards = getFlashcardDeckCards("science", "Form 1", "Chapter 2", "bm");
    const sets = splitFlashcardDeck(cards);

    expect(sets).toHaveLength(3);
    expect(sets.map((set) => set.length)).toEqual([20, 20, 20]);
    expect(new Set(sets.flat().map((card) => card.id)).size).toBe(60);
  });

  it("registers Geography Form 1 Bab 1 as an available three-deck chapter", () => {
    const chapter = getRegisteredSubjectChapters("geography", undefined, "Form 1").find(
      (item) => item.key === "Chapter 1",
    );
    const cards = getFlashcardDeckCards("geografi", "Form 1", "Bab 1");
    const sets = splitFlashcardDeck(cards);

    expect(chapter).toMatchObject({
      key: "Chapter 1",
      label: "Chapter 1: Arah",
      available: true,
      selectable: true,
    });
    expect(hasFlashcardDeck("geography", 1, "Chapter 1")).toBe(true);
    expect(cards).toHaveLength(60);
    expect(sets.map((set) => set.length)).toEqual([20, 20, 20]);
    expect(new Set(cards.map((card) => card.id)).size).toBe(60);
    expect(cards.every((card) => card.id.startsWith("geo-f1-c1-fc"))).toBe(true);
    expect(sets[0]?.map((card) => card.id)).toEqual(
      Array.from({ length: 20 }, (_, index) => `geo-f1-c1-fc${index + 1}`),
    );
    expect(sets[1]?.map((card) => card.id)).toEqual(
      Array.from({ length: 20 }, (_, index) => `geo-f1-c1-fc${index + 21}`),
    );
    expect(sets[2]?.map((card) => card.id)).toEqual(
      Array.from({ length: 20 }, (_, index) => `geo-f1-c1-fc${index + 41}`),
    );
  });

  it("registers Geography Form 1 Bab 5 as an unlocked three-deck chapter", () => {
    const chapter = getRegisteredSubjectChapters("geography", undefined, "Form 1").find(
      (item) => item.key === "Chapter 5",
    );
    const cards = getFlashcardDeckCards("geografi", "Form 1", "Bab 5");
    const sets = splitFlashcardDeck(cards);

    expect(chapter).toMatchObject({
      key: "Chapter 5",
      label: "Chapter 5: Bumi",
      available: true,
      selectable: true,
    });
    expect(hasFlashcardDeck("geography", 1, "Chapter 5")).toBe(true);
    expect(cards).toHaveLength(60);
    expect(sets).toHaveLength(3);
    expect(sets.map((set) => set.length)).toEqual([20, 20, 20]);
    expect(new Set(cards.map((card) => card.id)).size).toBe(60);
    expect(cards.map((card) => card.id)).toEqual(
      Array.from({ length: 60 }, (_, index) => `geo-f1-c5-fc${index + 1}`),
    );
  });

  it("routes Geography Form 3 Bab 3 to all 65 replacement flashcards", () => {
    const chapter = getRegisteredSubjectChapters("geography", undefined, "Form 3").find(
      (item) => item.key === "Chapter 3",
    );
    const cards = getFlashcardDeckCards("geografi", "Form 3", "Bab 3");
    const sets = splitFlashcardDeck(cards);

    expect(chapter).toMatchObject({
      key: "Chapter 3",
      available: true,
      selectable: true,
    });
    expect(getChapter("geography", "Chapter 3", undefined, "Form 3")?.flashcards).toHaveLength(65);
    expect(hasFlashcardDeck("geography", 3, "Chapter 3")).toBe(true);
    expect(cards).toHaveLength(65);
    expect(sets).toEqual([]);
    expect(cards.every((card) => card.id.startsWith("geo-f3-c3-f"))).toBe(true);
  });

  it("routes Geography Form 3 Bab 4 to all 65 replacement flashcards", () => {
    const chapter = getRegisteredSubjectChapters("geography", undefined, "Form 3").find(
      (item) => item.key === "Chapter 4",
    );
    const cards = getFlashcardDeckCards("geografi", "Form 3", "Bab 4");

    expect(chapter).toMatchObject({
      key: "Chapter 4",
      label: "Chapter 4: Tumbuh-tumbuhan Semula Jadi di Malaysia",
      available: true,
      selectable: true,
    });
    expect(getChapter("geography", "Chapter 4", undefined, "Form 3")?.flashcards).toHaveLength(65);
    expect(hasFlashcardDeck("geography", 3, "Chapter 4")).toBe(true);
    expect(cards).toHaveLength(65);
    expect(cards.map((card) => card.id)).toEqual(
      Array.from({ length: 65 }, (_, index) => `geo-f3-c4-f${index + 1}`),
    );
    expect(splitFlashcardDeck(cards)).toEqual([]);
  });

  it("routes Geography Form 3 Bab 2 to its complete single 20-card deck", () => {
    const chapter = getRegisteredSubjectChapters("geography", undefined, "Form 3").find(
      (item) => item.key === "Chapter 2",
    );
    const cards = getFlashcardDeckCards("geografi", "Form 3", "Bab 2");

    expect(chapter).toMatchObject({
      key: "Chapter 2",
      label: "Chapter 2: Carta Pai",
      available: true,
      selectable: true,
    });
    expect(getChapter("geography", "Chapter 2", undefined, "Form 3")?.flashcards).toHaveLength(20);
    expect(hasFlashcardDeck("geography", 3, "Chapter 2")).toBe(true);
    expect(cards).toHaveLength(20);
    expect(cards.map((card) => card.id)).toEqual(
      Array.from({ length: 20 }, (_, index) => `geo-f3-c2-f${index + 1}`),
    );
    expect(splitFlashcardDeck(cards)).toEqual([]);
  });

  it("keeps Geography Form 1 Bab 5 content in Bahasa Melayu and source-verified order", () => {
    const cards = getFlashcardDeckCards("geography", "Form 1", "Chapter 5");
    const obviousEnglishPhrases =
      /\b(?:What is|Which ocean|Why does|Explain the|How does|Name the)\b/i;

    expect(cards).toHaveLength(60);
    for (const card of cards) {
      expect(card.front).not.toMatch(obviousEnglishPhrases);
      expect(card.back).not.toMatch(obviousEnglishPhrases);
    }

    expect(cards[0]).toMatchObject({
      id: "geo-f1-c5-fc1",
      front: "Apakah maksud Atmosfera?",
    });
    expect(cards[19]).toMatchObject({
      id: "geo-f1-c5-fc20",
      front: "Apakah bahan utama yang membentuk lapisan Sima?",
    });
    expect(cards[20]).toMatchObject({
      id: "geo-f1-c5-fc21",
      front: "Di manakah letaknya lapisan Sial?",
    });
    expect(cards[33]?.back).toBe(
      "Keluasan Benua Asia ialah kira-kira 55.8 juta kilometer persegi.",
    );
    expect(cards[40]).toMatchObject({
      id: "geo-f1-c5-fc41",
      front: "Jelaskan perbezaan antara lapisan Sial dengan lapisan Sima.",
    });
    expect(cards[59]).toMatchObject({
      id: "geo-f1-c5-fc60",
      front:
        "Apakah yang berlaku apabila dua plat bergerak dari arah bertentangan dan menghasilkan daya mampatan?",
    });
  });

  it("preserves the supplied Practice Review card order", () => {
    const practiceReview = splitFlashcardDeck(
      getFlashcardDeckCards("geography", 1, "Chapter 1"),
    )[1];

    expect(practiceReview?.map((card) => card.front)).toEqual([
      "Jika anda menghadap arah Matahari terbit, apakah arah di sebelah kiri anda?",
      "Apakah arah mata angin perantaraan yang terletak tepat di antara Barat dengan Utara?",
      "Mengapakah kompas magnetik mesti dijauhkan daripada objek besi semasa digunakan?",
      "Dalam pengukuran bearing sudutan, berapakah nilai darjah bagi arah Barat?",
      "Jika seseorang berpusing 180° daripada menghadap Utara, apakah arah mata angin utama yang akan dihadapinya?",
      "Namakan tiga bahagian utama kompas magnetik.",
      "Berapakah nilai bearing sudutan bagi arah Timur Laut?",
      "Jika anda menghadap Matahari terbenam, apakah arah yang berada tepat di belakang anda?",
      "Apakah alat yang digunakan untuk mengukur bearing sudutan pada peta?",
      "Dari arah manakah pengukuran bearing sudutan sentiasa dimulakan?",
      "Bearing sudutan diukur menggunakan jangka sudut mengikut arah yang mana?",
      "Titik A terletak pada bearing sudutan 90° dari Titik B. Apakah arah Titik A dari Titik B?",
      "Apakah arah mata angin perantaraan di antara Selatan dengan Timur?",
      "Mengapakah jarum kompas magnetik menunjuk ke arah Utara?",
      "Jika anda menghadap Utara dan berpusing 90° ke kanan, apakah arah yang akan anda hadapi?",
      "Di antara dua arah mata angin utama yang manakah terletaknya Barat Daya?",
      "Apakah definisi arah?",
      "Jika anda berdiri menghadap Timur, apakah arah yang berada tepat di sebelah kanan anda?",
      "Apakah unit piawai yang digunakan untuk menyatakan bearing sudutan?",
      "Berapakah bearing sudutan bagi arah Selatan?",
    ]);
  });

  it("preserves the supplied Challenge Review card order", () => {
    const challengeReview = splitFlashcardDeck(
      getFlashcardDeckCards("geography", 1, "Chapter 1"),
    )[2];

    expect(challengeReview?.map((card) => card.front)).toEqual([
      "Terangkan langkah-langkah untuk mengorientasikan kompas magnetik dengan betul.",
      "Jika bearing sudutan sekolah dari rumah ialah 315°, di arah mata angin perantaraan manakah sekolah itu terletak?",
      "Apakah dua tamadun yang merupakan antara pencipta atau pengguna awal kompas?",
      "Jika anda menghadap bearing sudutan 225°, apakah arah yang berada tepat di belakang anda?",
      "Bagaimanakah bearing sudutan yang melebihi 180° boleh diukur menggunakan jangka sudut separuh bulatan piawai?",
      "Seorang pengembara menghadap Timur lalu berpusing 225° mengikut arah pusingan jam. Apakah arah baharu pengembara itu?",
      "Mengapakah kompas secara umumnya lebih tepat berbanding dengan penggunaan Matahari untuk menentukan arah?",
      "Semasa mengukur bearing sudutan Titik X dari Titik Y, di manakah pusat jangka sudut mesti diletakkan?",
      "Berapakah bearing belakang bagi objek yang terletak pada bearing sudutan 60°?",
      "Namakan dua kompas khusus selain kompas magnetik piawai.",
      "Apakah yang mungkin berlaku jika kompas magnetik digunakan di dalam kereta?",
      "Jika anda menghadap Matahari terbenam dan berpusing 90° ke kiri, apakah arah yang akan anda hadapi?",
      "Berapakah nilai darjah di antara Timur Laut dengan Tenggara?",
      "Apakah yang perlu dilakukan sebelum mengukur bearing sudutan di antara dua titik pada peta lakar?",
      "Sebuah lokasi mempunyai bearing sudutan 135°. Apakah arah mata angin perantaraannya?",
      "Apakah kepentingan titik 0° atau 360° pada kompas?",
      "Seorang murid menghadap Selatan lalu berpusing 135° melawan arah pusingan jam. Apakah arah yang dihadapinya sekarang?",
      "Seorang murid mencatatkan bearing sudutan 400°. Terangkan mengapa nilai ini bukan bearing sudutan piawai yang sah.",
      "Apakah arah yang terletak 180° dari Barat Laut?",
      "Anda berada di Titik A dan Titik B terletak tepat di sebelah Utara anda. Berapakah bearing sudutan Titik A dari Titik B?",
    ]);
  });

  it("keeps every Geography Form 1 Bab 1 question and answer in Bahasa Melayu", () => {
    const cards = getFlashcardDeckCards("geography", "Form 1", "Chapter 1");
    const obviousEnglishPhrases =
      /\b(?:What|Which|Why|If you|The direction|The bearing|You will)\b/i;

    expect(cards).toHaveLength(60);
    for (const card of cards) {
      expect(card.front).not.toMatch(obviousEnglishPhrases);
      expect(card.back).not.toMatch(obviousEnglishPhrases);
    }
  });

  it("normalizes direct set links and rejects invalid set numbers", () => {
    expect(normalizeFlashcardSetParam(1)).toBe(0);
    expect(normalizeFlashcardSetParam("2")).toBe(1);
    expect(normalizeFlashcardSetParam(3)).toBe(2);
    expect(normalizeFlashcardSetParam(0)).toBeNull();
    expect(normalizeFlashcardSetParam(4)).toBeNull();
    expect(normalizeFlashcardSetParam("invalid")).toBeNull();
  });

  it("normalizes chapter aliases without making genuinely missing decks available", () => {
    expect(hasFlashcardDeck("geografi", "1", "Bab 2")).toBe(true);
    expect(hasFlashcardDeck("science", "Form 1", "Chapter 99", "bm")).toBe(false);
  });

  it.each(["sejarah", "geography", "bm"] as const)(
    "retains existing Form 1 flashcard registry content for %s",
    (subjectId) => {
      expect(hasFormResourceContent(subjectId, "Form 1", "flashcards")).toBe(true);
    },
  );

  it("keeps registered Form 2 and Form 3 flashcard paths working", () => {
    expect(hasFormResourceContent("science", "Form 2", "flashcards", "bm")).toBe(true);
    expect(hasFormResourceContent("science", "Form 3", "flashcards", "dlp")).toBe(true);
  });
});
