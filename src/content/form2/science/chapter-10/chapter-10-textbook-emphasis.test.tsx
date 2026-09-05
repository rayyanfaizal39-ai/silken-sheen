import { describe, expect, it } from "vitest";
import { scienceEmphasisParts, stripEmphasis } from "@/components/notes/blocks/ScienceEmphasis";
import { scienceF2C10InteractiveBM } from "./interactive-bm";
import { scienceF2C10InteractiveDLP } from "./interactive-dlp";
import type { ScienceF2InteractiveContent } from "../interactive-types";

/**
 * Guards the transfer of the Sains Tingkatan 2 / DLP textbook's own emphasis
 * into Chapter 10 (Sound Waves).
 *
 * As with Chapter 1, 11 and 12's guards: the pass only adds `**markers**`
 * around wording AcadeMY already had, so most of this file checks what did NOT
 * change — strip the markers back out and every touched string must be
 * byte-identical to what it was before.
 */

const STREAMS: [string, ScienceF2InteractiveContent][] = [
  ["BM", scienceF2C10InteractiveBM],
  ["DLP", scienceF2C10InteractiveDLP],
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
    "berlaku pada saat yang sama",
    "cahaya sampai ke mata anda jauh lebih pantas berbanding bunyi",
    "satu bentuk tenaga yang dihasilkan oleh getaran",
    "memerlukan medium untuk merambat dan tidak dapat merambat melalui vakum",
    "peti suara bergetar",
    "menggetarkan zarah udara berhampirannya",
    "Semakin banyak udara dikeluarkan, semakin perlahan bunyi loceng kedengaran walaupun jam itu masih bergetar.",
    "tiada zarah untuk memindahkan getaran",
    "sebahagiannya dipantulkan dan sebahagiannya diserap",
    "merambat pada kelajuan yang berbeza di dalam medium yang berbeza",
    "keras dan licin memantulkan bunyi dengan baik",
    "lembut dan kasar menyerap bunyi dengan baik",
    "dinding pawagam dilapisi papan lembut yang nipis",
    "membandingkan kekuatan bunyi, bukan mengukur kelajuan bunyi",
    "bilangan getaran lengkap dalam masa satu saat",
    "sesaran maksimum gelombang daripada kedudukan keseimbangan",
    "ketinggian puncak gelombang diukur dari garis tengah",
    "Unitnya ialah hertz (Hz).",
    "semakin besar amplitud getaran, dan semakin nyaring bunyi yang dihasilkan",
    "semakin tinggi frekuensi, dan semakin tinggi kelangsingan bunyi",
    "Kenyaringan bunyi bergantung pada amplitud gelombang bunyi",
    "kelangsingan bunyi bergantung pada frekuensi gelombang bunyi",
    "Semakin kecil amplitud, semakin perlahan bunyi itu.",
    "Semakin rendah frekuensi, semakin rendah kelangsingan.",
    "bunyi berfrekuensi rendah",
    "bunyi berfrekuensi tinggi",
    "mengubah kenyaringan dan kelangsingan bunyi secara berasingan",
    "Kelangsingan bunyi tidak berubah",
    "menyebabkan tali bergetar pada frekuensi yang lebih tinggi",
    "Saiz dan ketegangan membran drum",
    "gelombang bunyi dipantulkan kembali kepada pendengar daripada suatu permukaan yang keras",
    "pergerakan relatif antara sumber bunyi dengan pemerhati",
    "berfrekuensi lebih daripada 20 000 Hz",
    "tidak dapat didengar oleh manusia tetapi boleh didengar oleh haiwan seperti kelawar",
    "mengesan objek di bawah air",
    "mengesan kumpulan ikan",
    "mengimbas keadaan fetus di dalam kandungan",
    "terhad kepada julat 20 Hz hingga 20 000 Hz",
    "semakin berkurang apabila usia meningkat",
    "tidak dapat mendengar bunyi yang terlalu lemah atau terlalu jauh",
    "menyalurkan dan menguatkan bunyi",
    "menguatkan bunyi yang memasuki telinga",
    "menjadikan suara lebih kuat",
    "tidak meluaskan julat frekuensi pendengaran manusia",
  ],
  DLP: [
    "happen at the same instant",
    "light reaches your eyes far faster than sound",
    "a form of energy produced by vibration",
    "needs a medium to propagate and cannot travel through a vacuum",
    "your vocal cords vibrating",
    "setting the nearby air particles vibrating",
    "The more air is removed, the fainter the ringing becomes, even though the clock is still vibrating.",
    "there are no particles to pass the vibration along",
    "part of it is reflected and part of it is absorbed",
    "propagate at different speeds in different media",
    "Hard, smooth surfaces reflect sound well.",
    "Soft, rough surfaces absorb sound well.",
    "cinema walls are lined with thin soft board",
    "compares loudness — it does not measure the speed of sound",
    "the number of complete vibrations in one second",
    "the maximum displacement of the wave from the equilibrium position",
    "the height of the wave crest measured from the centre line",
    "Its unit is the hertz (Hz).",
    "the greater the amplitude of vibration, and the louder the sound produced",
    "the higher the frequency, and the higher the pitch of the sound",
    "The loudness of a sound depends on the amplitude of the sound wave",
    "the pitch of a sound depends on the frequency of the sound wave",
    "The smaller the amplitude, the softer the sound.",
    "The lower the frequency, the lower the pitch.",
    "a low-frequency sound",
    "a high-frequency sound",
    "change the loudness and the pitch of the sound separately",
    "The pitch does not change",
    "makes it vibrate at a higher frequency",
    "The size and tension of a drum membrane",
    "a sound wave is reflected back to the listener from a hard surface",
    "relative movement between a sound source and an observer",
    "a frequency greater than 20 000 Hz",
    "cannot be heard by humans but can be heard by animals such as bats",
    "detect objects under water",
    "locate schools of fish",
    "scanning a foetus in the womb",
    "limited to the range 20 Hz to 20 000 Hz",
    "narrows as we grow older",
    "cannot hear sounds that are too weak or too far away",
    "channels and amplifies the sound",
    "amplifies the sound entering the ear",
    "makes a voice louder",
    "do not widen the human hearing frequency range",
  ],
};

/** Field path -> the exact original wording (before markers were added). */
const ORIGINALS: Record<string, Record<string, string>> = {
  BM: {
    "content.blogHighlight.body":
      "Kilat dan guruh sebenarnya berlaku pada saat yang sama — tetapi cahaya sampai ke mata anda jauh lebih pantas berbanding bunyi sampai ke telinga anda, itulah sebabnya anda sentiasa melihat kilat dahulu sebelum mendengar dentuman guruh.",
    "content.sections[0].intro":
      "Bunyi ialah satu bentuk tenaga yang dihasilkan oleh getaran. Apabila sesuatu objek bergetar, zarah-zarah di sekelilingnya turut bergetar dan berlanggar dengan zarah bersebelahan. Getaran ini dipindahkan dari satu zarah ke zarah lain dalam bentuk gelombang sehingga sampai ke telinga pendengar. Kerana gelombang bunyi perlu dipindahkan melalui zarah, bunyi memerlukan medium untuk merambat dan tidak dapat merambat melalui vakum.",
    "content.sections[0].cards[0].body":
      "Sentuh bahagian luar tekak anda semasa bercakap — anda dapat merasai peti suara bergetar. Getaran itulah yang menghasilkan suara anda.",
    "content.sections[0].cards[3].body":
      "Permukaan logam loceng bergetar apabila dipukul, lalu menggetarkan zarah udara berhampirannya.",
    "content.sections[0].accordions[0].body":
      "Sebuah jam loceng yang sedang berbunyi diletakkan di dalam balang kaca, kemudian udara di dalam balang disedut keluar dengan pam vakum. Semakin banyak udara dikeluarkan, semakin perlahan bunyi loceng kedengaran walaupun jam itu masih bergetar. Ini menunjukkan bunyi memerlukan medium untuk merambat.",
    "content.sections[0].accordions[1].body":
      "Angkasa lepas ialah vakum — tiada zarah untuk memindahkan getaran. Itulah sebabnya angkasawan berkomunikasi menggunakan gelombang radio, bukan dengan bercakap terus antara satu sama lain.",
    "content.sections[1].intro":
      "Apabila gelombang bunyi terkena permukaan sesuatu objek, sebahagiannya dipantulkan dan sebahagiannya diserap. Jumlah bunyi yang dipantul atau diserap bergantung pada jenis permukaan itu. Selain itu, gelombang bunyi merambat pada kelajuan yang berbeza di dalam medium yang berbeza, bergantung pada seberapa rapat zarah-zarah medium itu tersusun.",
    "content.sections[1].tabs[0].body":
      "Permukaan yang keras dan licin memantulkan bunyi dengan baik. Contohnya jubin marmar dan dinding kosong.",
    "content.sections[1].tabs[1].body":
      "Permukaan yang lembut dan kasar menyerap bunyi dengan baik. Contohnya permaidani dan papan gabus. Itulah sebabnya dinding pawagam dilapisi papan lembut yang nipis — untuk menyerap bunyi supaya dialog dan muzik kekal jelas.",
    "content.sections[1].accordions[0].body":
      "Dalam demonstrasi ini, telinga dilekapkan pada bekas plastik yang berisi udara, air dan tepung secara berasingan sambil sebuah jam loceng dibunyikan. Yang dibandingkan ialah kekuatan bunyi yang didengar melalui setiap bekas. Perhatikan bahawa demonstrasi ini membandingkan kekuatan bunyi, bukan mengukur kelajuan bunyi. Kelajuan bunyi dalam medium yang berbeza dipelajari secara berasingan melalui susunan zarah seperti di atas.",
    "content.sections[2].intro":
      "Frekuensi ialah bilangan getaran lengkap dalam masa satu saat, dan diukur dalam unit hertz (Hz). Amplitud pula ialah sesaran maksimum gelombang daripada kedudukan keseimbangan. Kedua-dua ciri ini boleh dilihat pada skrin Osiloskop Sinar Katod (O.S.K.) apabila penjana isyarat audio disambungkan kepada pembesar suara dan O.S.K.",
    "content.sections[2].cards[0].body":
      "Sesaran maksimum gelombang daripada kedudukan keseimbangan — iaitu ketinggian puncak gelombang diukur dari garis tengah.",
    "content.sections[2].cards[1].body":
      "Bilangan getaran lengkap dalam masa satu saat. Unitnya ialah hertz (Hz).",
    "content.sections[2].tabs[0].body":
      "Semakin tinggi gelombang pada skrin O.S.K., semakin besar amplitud getaran, dan semakin nyaring bunyi yang dihasilkan oleh pembesar suara.",
    "content.sections[2].tabs[1].body":
      "Semakin banyak gelombang lengkap yang muncul dalam selang masa yang sama pada skrin O.S.K., semakin tinggi frekuensi, dan semakin tinggi kelangsingan bunyi.",
    "content.sections[3].intro":
      "Telinga kita dapat membezakan bunyi kerana setiap bunyi mempunyai kenyaringan dan kelangsingan yang berbeza. Kenyaringan bunyi bergantung pada amplitud gelombang bunyi, manakala kelangsingan bunyi bergantung pada frekuensi gelombang bunyi.",
    "content.sections[3].cards[0].body":
      "Semakin besar amplitud getaran, semakin nyaring bunyi yang dihasilkan. Semakin kecil amplitud, semakin perlahan bunyi itu.",
    "content.sections[3].cards[1].body":
      "Semakin tinggi frekuensi getaran, semakin tinggi kelangsingan bunyi. Semakin rendah frekuensi, semakin rendah kelangsingan.",
    "content.sections[3].tabs[0].body":
      "Bunyi lembu melenguh ialah bunyi berfrekuensi rendah, jadi kelangsingannya rendah.",
    "content.sections[3].tabs[1].body":
      "Bunyi tikus mendecit ialah bunyi berfrekuensi tinggi, jadi kelangsingannya tinggi.",
    "content.sections[4].intro":
      "Alat muzik seperti piano, rekorder, gendang, drum dan gitar menghasilkan bunyi melalui getaran. Dengan mengubah cara alat itu dimainkan, pemuzik boleh mengubah kenyaringan dan kelangsingan bunyi secara berasingan. Perhatikan bahawa kedua-dua ciri ini dikawal oleh perkara yang berbeza.",
    "content.sections[4].tabs[0].body":
      "Memetik tali gitar dengan lebih kuat menghasilkan getaran beramplitud lebih besar, jadi bunyi menjadi lebih nyaring. Kelangsingan bunyi tidak berubah — nada yang dimainkan tetap sama.",
    "content.sections[4].tabs[1].body":
      "Mengetatkan tali gitar menyebabkan tali bergetar pada frekuensi yang lebih tinggi, jadi kelangsingan bunyi menjadi lebih tinggi. Ini berbeza sama sekali daripada memetik lebih kuat.",
    "content.sections[4].tabs[3].body":
      "Meniup rekorder dengan lebih kuat atau memukul gendang dan drum dengan lebih kuat menghasilkan amplitud getaran yang lebih besar, jadi bunyinya lebih nyaring. Saiz dan ketegangan membran drum pula mempengaruhi frekuensi getaran, iaitu kelangsingannya.",
    "content.sections[5].intro":
      "Pantulan gelombang bunyi menghasilkan fenomena yang boleh kita alami setiap hari. Gema terhasil apabila gelombang bunyi dipantulkan kembali kepada pendengar daripada suatu permukaan yang keras. Kesan Doppler pula berlaku apabila terdapat pergerakan relatif antara sumber bunyi dengan pemerhati.",
    "content.sections[6].intro":
      "Ultrabunyi ialah gelombang bunyi yang berfrekuensi lebih daripada 20 000 Hz. Ultrabunyi tidak dapat didengar oleh manusia tetapi boleh didengar oleh haiwan seperti kelawar. Pantulan gelombang ultrabunyi digunakan dalam pelbagai sektor kerana bunyi yang dipantulkan itu membawa maklumat tentang objek yang dikenainya.",
    "content.sections[6].cards[0].body":
      "Sonar digunakan untuk mengesan objek di bawah air.",
    "content.sections[6].cards[1].body":
      "Sonar membantu mengesan kumpulan ikan di bawah permukaan laut.",
    "content.sections[6].cards[2].body":
      "Sonogram menggunakan pantulan ultrabunyi untuk menghasilkan imej bahagian dalam badan, contohnya mengimbas keadaan fetus di dalam kandungan.",
    "content.sections[7].intro":
      "Telinga manusia hanya dapat mengesan bunyi dalam julat frekuensi tertentu. Frekuensi bunyi yang dapat dikesan oleh telinga manusia terhad kepada julat 20 Hz hingga 20 000 Hz. Julat ini semakin berkurang apabila usia meningkat kerana telinga menjadi kurang sensitif terhadap frekuensi bunyi. Haiwan pula mempunyai had pendengarannya yang tersendiri, dan sesetengahnya jauh melebihi julat manusia.",
    "content.sections[8].intro":
      "Deria pendengaran manusia yang terhad menyebabkan kita tidak dapat mendengar bunyi yang terlalu lemah atau terlalu jauh. Untuk mengatasi masalah ini, kita menggunakan peralatan khas yang menguatkan atau menyalurkan bunyi supaya bunyi itu cukup kuat untuk didengar.",
    "content.sections[8].cards[0].body":
      "Stetoskop menyalurkan dan menguatkan bunyi denyutan jantung pesakit terus ke telinga doktor, supaya bunyi yang terlalu lemah itu dapat didengar dengan jelas.",
    "content.sections[8].cards[1].body":
      "Alat bantu pendengaran menguatkan bunyi yang memasuki telinga, membantu orang yang mengalami masalah pendengaran mendengar dengan lebih jelas.",
    "content.sections[8].cards[2].body":
      "Pembesar suara menjadikan suara lebih kuat supaya dapat didengar dari jarak yang jauh.",
    "content.sections[8].accordions[0].body":
      "Peranti ini menguatkan atau menyalurkan bunyi supaya bunyi yang terlalu lemah atau terlalu jauh dapat didengar. Peranti ini tidak meluaskan julat frekuensi pendengaran manusia. Julat biologi telinga manusia kekal 20 Hz hingga 20 000 Hz — alat bantu pendengaran tidak membolehkan manusia mendengar ultrabunyi.",
  },
  DLP: {
    "content.blogHighlight.body":
      "Lightning and thunder actually happen at the same instant — but light reaches your eyes far faster than sound reaches your ears, which is why you always see the flash before you hear the rumble.",
    "content.sections[0].intro":
      "Sound is a form of energy produced by vibration. When an object vibrates, the particles around it vibrate too and collide with neighbouring particles. The vibration is passed from one particle to the next as a wave until it reaches a listener's ear. Because a sound wave has to be passed along by particles, sound needs a medium to propagate and cannot travel through a vacuum.",
    "content.sections[0].cards[0].body":
      "Touch the outside of your throat while speaking — you can feel your vocal cords vibrating. That vibration is what produces your voice.",
    "content.sections[0].cards[3].body":
      "The metal surface of a bell vibrates when struck, setting the nearby air particles vibrating.",
    "content.sections[0].accordions[0].body":
      "A ringing alarm clock is placed inside a glass jar, then the air in the jar is pumped out with a vacuum pump. The more air is removed, the fainter the ringing becomes, even though the clock is still vibrating. This shows that sound needs a medium to propagate.",
    "content.sections[0].accordions[1].body":
      "Space is a vacuum — there are no particles to pass the vibration along. That is why astronauts communicate using radio waves rather than by speaking directly to one another.",
    "content.sections[1].intro":
      "When a sound wave strikes the surface of an object, part of it is reflected and part of it is absorbed. How much is reflected or absorbed depends on the type of surface. Sound waves also propagate at different speeds in different media, depending on how closely the particles of that medium are packed together.",
    "content.sections[1].tabs[0].body":
      "Hard, smooth surfaces reflect sound well. Marble tiles and bare walls are examples.",
    "content.sections[1].tabs[1].body":
      "Soft, rough surfaces absorb sound well. Carpet and cork board are examples. That is why cinema walls are lined with thin soft board — to absorb sound so dialogue and music stay clear.",
    "content.sections[1].accordions[0].body":
      "In this demonstration, an ear is placed against plastic containers filled separately with air, water and flour while an alarm clock is sounded. What is compared is the loudness of the sound heard through each container. Note that this demonstration compares loudness — it does not measure the speed of sound. The speed of sound in different media is learned separately, from particle arrangement as shown above.",
    "content.sections[2].intro":
      "Frequency is the number of complete vibrations in one second, and it is measured in hertz (Hz). Amplitude is the maximum displacement of the wave from the equilibrium position. Both properties can be seen on the screen of a cathode-ray oscilloscope (C.R.O.) when an audio signal generator is connected to a loudspeaker and the oscilloscope.",
    "content.sections[2].cards[0].body":
      "The maximum displacement of the wave from the equilibrium position — the height of the wave crest measured from the centre line.",
    "content.sections[2].cards[1].body":
      "The number of complete vibrations in one second. Its unit is the hertz (Hz).",
    "content.sections[2].tabs[0].body":
      "The taller the wave on the oscilloscope screen, the greater the amplitude of vibration, and the louder the sound produced.",
    "content.sections[2].tabs[1].body":
      "The more complete waves that appear within the same time interval on the oscilloscope screen, the higher the frequency, and the higher the pitch of the sound.",
    "content.sections[3].intro":
      "Our ears can tell sounds apart because every sound has its own loudness and pitch. The loudness of a sound depends on the amplitude of the sound wave, while the pitch of a sound depends on the frequency of the sound wave.",
    "content.sections[3].cards[0].body":
      "The greater the amplitude of vibration, the louder the sound produced. The smaller the amplitude, the softer the sound.",
    "content.sections[3].cards[1].body":
      "The higher the frequency of vibration, the higher the pitch of the sound. The lower the frequency, the lower the pitch.",
    "content.sections[3].tabs[0].body":
      "A cow's moo is a low-frequency sound, so its pitch is low.",
    "content.sections[3].tabs[1].body":
      "A rat's squeak is a high-frequency sound, so its pitch is high.",
    "content.sections[4].intro":
      "Musical instruments such as the piano, recorder, gendang, drum and guitar all produce sound through vibration. By changing how an instrument is played, a musician can change the loudness and the pitch of the sound separately. Notice that these two characteristics are controlled by different things.",
    "content.sections[4].tabs[0].body":
      "Plucking a guitar string harder produces a vibration with a greater amplitude, so the sound becomes louder. The pitch does not change — the note being played stays the same.",
    "content.sections[4].tabs[1].body":
      "Tightening a guitar string makes it vibrate at a higher frequency, so the pitch of the sound becomes higher. This is entirely different from plucking harder.",
    "content.sections[4].tabs[3].body":
      "Blowing a recorder harder, or striking a gendang or drum harder, produces a greater amplitude of vibration, so the sound is louder. The size and tension of a drum membrane affect the frequency of vibration, which is its pitch.",
    "content.sections[5].intro":
      "The reflection of sound waves produces phenomena we meet every day. An echo is produced when a sound wave is reflected back to the listener from a hard surface. The Doppler effect happens when there is relative movement between a sound source and an observer.",
    "content.sections[6].intro":
      "Ultrasound is a sound wave with a frequency greater than 20 000 Hz. Ultrasound cannot be heard by humans but can be heard by animals such as bats. The reflection of ultrasound waves is used across several sectors, because the reflected sound carries information about whatever it struck.",
    "content.sections[6].cards[0].body":
      "Sonar is used to detect objects under water.",
    "content.sections[6].cards[1].body":
      "Sonar helps locate schools of fish below the surface of the sea.",
    "content.sections[6].cards[2].body":
      "A sonogram uses reflected ultrasound to produce images of the inside of the body, for example scanning a foetus in the womb.",
    "content.sections[7].intro":
      "The human ear can only detect sound within a certain frequency range. The frequency of sound that the human ear can detect is limited to the range 20 Hz to 20 000 Hz. This range narrows as we grow older, because the ear becomes less sensitive to sound frequencies. Animals have their own hearing limits, and some reach far beyond the human range.",
    "content.sections[8].intro":
      "Because human hearing is limited, we cannot hear sounds that are too weak or too far away. To overcome this, we use special devices that amplify or channel sound so that it becomes strong enough to hear.",
    "content.sections[8].cards[0].body":
      "A stethoscope channels and amplifies the sound of a patient's heartbeat directly to the doctor's ears, so a sound that is too weak can be heard clearly.",
    "content.sections[8].cards[1].body":
      "A hearing aid amplifies the sound entering the ear, helping a person with hearing difficulty hear more clearly.",
    "content.sections[8].cards[2].body":
      "A loudspeaker makes a voice louder so that it can be heard from a distance.",
    "content.sections[8].accordions[0].body":
      "These devices amplify or channel sound so that a sound which is too weak or too far away becomes audible. They do not widen the human hearing frequency range. The biological range of the human ear remains 20 Hz to 20 000 Hz — a hearing aid does not let a human hear ultrasound.",
  },
};

/** Only these field-path suffixes are wired to render through ScienceEmphasis. */
const ALLOWED_FIELD = /\.(body|intro|note|challenge|adaptation|role|benefit|remember|quickExplanation)(\[\d+\])?$/;

describe("Chapter 10 — the textbook's emphasis, and only that", () => {
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
    expect(fieldsWithMarkers(scienceF2C10InteractiveBM)).toEqual(fieldsWithMarkers(scienceF2C10InteractiveDLP));
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
