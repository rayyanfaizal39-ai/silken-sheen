import { describe, expect, it } from "vitest";
import { scienceEmphasisParts, stripEmphasis } from "@/components/notes/blocks/ScienceEmphasis";
import { scienceF2C5InteractiveBM } from "./interactive-bm";
import { scienceF2C5InteractiveDLP } from "./interactive-dlp";
import type { ScienceF2InteractiveContent } from "../interactive-types";

/**
 * Guards the transfer of the Sains Tingkatan 2 (BM) / DLP Science textbook's
 * own emphasis into Chapter 5 (Air dan Larutan / Water and Solution).
 *
 * The rule the transfer follows is that the textbook decides WHICH terms are
 * emphasised — the pass adds `**markers**` around wording AcadeMY already had
 * (plus a handful of brand-new "Remember" / "Quick Explanation" callouts), and
 * never rewrites existing prose. So most of the assertions here are about what
 * did NOT change: strip the markers back out of every pre-existing field and it
 * must be byte-identical to what it was before, and each concept must be
 * marked once rather than everywhere it happens to appear.
 */

const STREAMS: [string, ScienceF2InteractiveContent][] = [
  ["BM", scienceF2C5InteractiveBM],
  ["DLP", scienceF2C5InteractiveDLP],
];

/** Every learner-facing string in the chapter, with the field path that holds it. */
function allStrings(content: unknown): [string, string][] {
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

/**
 * `remember` / `quickExplanation` are brand-new callouts, and these specific
 * paths are brand-new fields from the visual-integration passes (the
 * Earth-water fact card; the states-of-water image's now-separate melting and
 * condensation notes, split out of the old combined "melting & freezing" /
 * "evaporation & condensation" pair; and the solute / solvent / solution
 * definition cards) — none have pre-existing wording to diff against, so
 * they're excluded from the "changed no wording" check below (they're still
 * covered by every other check: allowlist, dedup, and BM/DLP field parity).
 */
const NEW_FIELDS_SUFFIX = /\.(remember|quickExplanation)$/;
const NEW_FIELDS_EXACT = new Set([
  "content.sections[0].cards[0].body",
  "content.sections[0].images[0].annotations[3].note",
  "content.sections[0].images[0].annotations[7].note",
  "content.sections[5].cards[0].body",
  "content.sections[5].cards[1].body",
  "content.sections[5].cards[2].body",
]);
const isNewField = (path: string) => NEW_FIELDS_SUFFIX.test(path) || NEW_FIELDS_EXACT.has(path);

/**
 * Only these fields are wired to `ScienceEmphasis` by the shared renderer
 * (`ScienceF2InteractiveNotesBlock.tsx`). A marker anywhere else would render
 * as a literal `**` to students.
 */
const ALLOWLIST =
  /\.(body|intro|note|challenge|adaptation|role|benefit|remember|quickExplanation)(\[\d+\])?$/;

/** The exact pre-existing wording for every field this pass marked, keyed by field path. */
const ORIGINALS: Record<"BM" | "DLP", Record<string, string>> = {
  BM: {
    "content.blogHighlight.body":
      "Terletak kira-kira 430.5 meter di bawah paras laut, Laut Mati adalah titik paling rendah di Bumi. Kerana ia dikepung sepenuhnya oleh tanah, air yang mengalir daripada Sungai Jordan sejat dengan cepat dan meninggalkan garamnya — menjadikan air begitu tumpat sehingga orang boleh terapung di permukaannya tanpa berusaha.",
    "content.sections[0].intro":
      "Air tulen tidak berwarna, tidak berbau dan tidak berasa, serta kekal sebagai cecair pada suhu bilik. Nilai tetap ini sebenarnya digunakan untuk menguji sama ada air mengandungi bendasing, kerana bendasing mengubah nilai-nilai ini.",
    "content.sections[1].quickExplanation":
      "Secara umum, daya tarikan antara molekul yang sama dipanggil daya lekitan, manakala daya tarikan antara molekul yang berbeza dipanggil daya lekatan.",
    "content.sections[1].cards[0].body":
      "Daya lekitan antara molekul air cukup kuat pada permukaan sehingga permukaan itu berkelakuan seperti kulit nipis. Serangga ringan seperti ayak-ayak boleh berehat di atasnya tanpa tenggelam.",
    "content.sections[1].cards[1].body":
      "Di dalam salur xilem yang sangat halus, daya lekatan menarik air ke atas dinding salur, sementara daya lekitan menarik molekul air yang lain mengikutinya. Kesan gabungan ini menaikkan air dari akar hingga ke daun.",
    "content.sections[2].intro":
      "Air ialah sebatian — dua atom hidrogen bergabung dengan satu atom oksigen, H₂O. Bendasing terlarut mengubah takat lebur dan takat didih air.",
    "content.sections[2].cards[1].body":
      "Bendasing terlarut mengubah takat lebur dan takat didih air — garam menurunkan takat lebur ais tetapi meningkatkan takat didih air. Itulah sebabnya periuk air biasa mendidih lebih cepat daripada periuk yang mengandungi garam atau stok sup terlarut.",
    "content.sections[5].intro":
      "Apabila gula larut dalam air, gula ialah zat terlarut (bahan yang larut), air ialah pelarut (cecair yang melarutkan), dan air gula ialah larutan yang terbentuk bersama. Daripada tiga istilah ini datang satu lagi yang sering dikelirukan — keterlarutan.",
    "content.sections[5].remember":
      "Keterlarutan suatu bahan ialah kuantiti maksimum zat terlarut yang dapat larut di dalam 100 ml pelarut pada suhu yang tertentu.",
    "content.sections[6].cards[2].body":
      "Zat terlarut berlebihan ditambah — tiada lagi yang larut, dan lebihannya membentuk mendakan di dasar.",
    "content.sections[6].cards[3].body":
      "Perhatikan bahawa keterlarutan sentiasa dinyatakan pada suhu yang tertentu. Sebabnya: apabila suhu berubah, kuantiti maksimum yang boleh larut turut berubah. Bagi kebanyakan zat terlarut pepejal seperti garam dan gula, lebih banyak dapat larut pada suhu yang lebih tinggi.",
    "content.sections[7].intro":
      "Tidak semua campuran ialah larutan. Dua ujian mudah — menyinar lampu suluh menembusinya, dan menapisnya melalui kertas turas — sudah cukup untuk membezakan ketiga-tiga jenis campuran ini.",
    "content.sections[9].intro":
      "Air dikenali sebagai pelarut semesta kerana keupayaannya melarutkan hampir semua bahan sama ada pepejal, cecair ataupun gas. Bagi bahan yang tidak larut dalam air, pelarut bukan air yang berasaskan karbon digunakan sebagai gantinya.",
    "content.sections[9].cards[0].body":
      "Air digunakan sebagai pelarut secara domestik dan juga sebagai bahan mentah dalam industri pembuatan, pertanian dan perubatan — daripada baja yang larut dan diserap oleh akar tumbuhan, kepada detergen dalam proses pembersihan, hinggalah kepada penghasilan minuman ringan.",
    "content.sections[9].cards[1].body":
      "Sifat pelarut bukan air yang mudah meruap menyebabkan pelarut ini digunakan secara meluas dalam penyediaan bahan semburan seperti cat, minyak wangi dan racun serangga. Pelarut bukan air perlu dikendalikan dengan cermat kerana ia membahayakan kesihatan manusia.",
    "content.sections[10].intro":
      "Air meliputi dua pertiga permukaan Bumi, tetapi kebanyakannya mengandungi bendasing, mikroorganisma dan bahan terlarut yang menjadikannya tidak selamat terus daripada sumber. Pembersihan air membuang bau, rasa, warna, mikroorganisma dan bahan terlarut supaya ia boleh digunakan dengan selamat.",
    "content.sections[10].cards[0].body":
      "Penulenan bermaksud menghasilkan air tulen — air yang bebas daripada bendasing terampai, bahan terlarut dan mikroorganisma sekali gus. Ia adalah matlamat akhir, bukan satu langkah yang berasingan.",
    "content.sections[11].intro":
      "Air yang dikumpul daripada sumber seperti sungai dan air hujan disalurkan ke loji pembersihan air untuk dirawat dalam enam peringkat sebelum sampai ke rumah. Bakteria, alga dan bahan mineral adalah antara bahan yang disingkirkan dalam proses ini.",
    "content.sections[12].intro":
      "Sesetengah negara yang mengalami kekurangan sumber air menggunakan cara alternatif untuk mendapatkan bekalan air.",
    "content.sections[13].cards[4].body":
      "Air yang selamat diminum mestilah bebas daripada mikroorganisma berbahaya, bahan kimia beracun dan bendasing. Itulah sebabnya air dirawat di loji sebelum sampai ke rumah.",
    "content.sections[13].cards[5].body":
      "Di Teluk Minamata, Jepun, sisa yang mengandungi merkuri dilepaskan ke dalam air laut. Merkuri itu terkumpul di dalam ikan dan kerang, dan penduduk yang memakannya mengalami keracunan merkuri yang teruk — merosakkan sistem saraf dan menyebabkan kecacatan kekal.",
    "content.sections[13].cards[6].body":
      "Audit air bermaksud merekodkan berapa banyak air digunakan di rumah atau sekolah, aktiviti demi aktiviti — mandi, membasuh, menyiram dan sebagainya.",
  },
  DLP: {
    "content.blogHighlight.body":
      "Sitting about 430.5 metres below sea level, the Dead Sea is the lowest point on Earth. Because it is completely enclosed by land, water flowing in from the Jordan River evaporates quickly and leaves its salt behind — making the water so dense that people can float on its surface without effort.",
    "content.sections[0].intro":
      "Pure water is colourless, odourless and tasteless, and stays liquid at room temperature. These fixed values are actually how we test whether water contains impurities, since impurities shift them.",
    "content.sections[1].quickExplanation":
      "In general, the attraction between the same kind of molecule is called cohesive force, while the attraction between different molecules is called adhesive force.",
    "content.sections[1].cards[0].body":
      "The cohesive force between water molecules is strong enough at the surface that the surface behaves like a thin skin. Light insects such as pond skaters can rest on top without sinking.",
    "content.sections[1].cards[1].body":
      "Inside very fine xylem vessels, the adhesive force pulls water up along the vessel wall, while the cohesive force drags the next water molecules along behind it. Together they lift water from the roots all the way to the leaves.",
    "content.sections[2].intro":
      "Water is a compound — two hydrogen atoms joined to one oxygen atom, H₂O. Dissolved impurities shift the melting and boiling points of water.",
    "content.sections[2].cards[1].body":
      "Dissolved impurities change the melting and boiling points of water — salt lowers the melting point of ice but raises the boiling point of water. That is why a pot of plain water boils faster than one holding salt or dissolved soup stock.",
    "content.sections[5].intro":
      "When sugar dissolves in water, sugar is the solute (the substance that dissolves), water is the solvent (the liquid doing the dissolving), and sugar water is the solution they form together. From these three terms comes another one that is often confused — solubility.",
    "content.sections[5].remember":
      "Solubility of a solute is the maximum amount of solute that can dissolve in 100 ml of solvent at a specific temperature.",
    "content.sections[6].cards[2].body":
      "Excess solute has been added — no more will dissolve, and the excess forms a precipitate at the bottom.",
    "content.sections[6].cards[3].body":
      "Notice that solubility is always stated at a specified temperature. Here is why: when the temperature changes, the maximum amount that can dissolve changes too. For most solid solutes such as salt and sugar, more can dissolve at a higher temperature.",
    "content.sections[7].intro":
      "Not every mixture is a solution. Two simple tests — shining a torch through it, and filtering it through filter paper — are enough to tell these three kinds of mixture apart.",
    "content.sections[9].intro":
      "Water is known as the universal solvent because of its ability to dissolve almost every substance, whether solid, liquid or gas. For substances that will not dissolve in water, carbon-based non-water solvents are used instead.",
    "content.sections[9].cards[0].body":
      "Water is used as a solvent domestically and also as a raw material in the manufacturing, agricultural and medical industries — from fertiliser dissolving and being absorbed by plant roots, to detergent in the cleaning process, to the production of soft drinks.",
    "content.sections[9].cards[1].body":
      "Because non-water solvents evaporate readily, they are widely used in preparing spray products such as paint, perfume and insecticide. Non-water solvents must be handled carefully because they are hazardous to human health.",
    "content.sections[10].intro":
      "Water covers two-thirds of the Earth's surface, but most of it holds impurities, microorganisms and dissolved substances that make it unsafe straight from the source. Purifying water removes smell, taste, colour, microorganisms and dissolved substances so it can be used safely.",
    "content.sections[10].cards[0].body":
      "Purification means producing pure water — water free of suspended impurities, dissolved substances and microorganisms all at once. It is the end goal, not a separate step of its own.",
    "content.sections[11].intro":
      "Water collected from sources such as rivers and rainfall is channelled to a water treatment plant to be treated in six stages before it reaches homes. Bacteria, algae and mineral substances are among the things removed in the process.",
    "content.sections[12].intro":
      "Some countries short of water resources use alternative ways of obtaining a water supply.",
    "content.sections[13].cards[4].body":
      "Water that is safe to drink must be free of harmful microorganisms, toxic chemicals and impurities. That is why water is treated at a plant before it reaches homes.",
    "content.sections[13].cards[5].body":
      "At Minamata Bay in Japan, waste containing mercury was released into the seawater. The mercury built up in fish and shellfish, and residents who ate them suffered severe mercury poisoning — damaging the nervous system and causing permanent disability.",
    "content.sections[13].cards[6].body":
      "A water audit means recording how much water is used at home or at school, activity by activity — bathing, washing, watering the garden and so on.",
  },
};

describe("Chapter 5 — the textbook's emphasis, and only that", () => {
  it.each(STREAMS)("%s changed no wording — only added markers", (name, content) => {
    for (const [path, text] of allStrings(content)) {
      if (!text.includes("**")) continue;
      if (isNewField(path)) continue;
      const stripped = stripEmphasis(text);
      const original = ORIGINALS[name as "BM" | "DLP"][path];
      expect(original, `no known original recorded for marked field: ${path}`).toBeTruthy();
      expect(stripped, `wording changed at ${path}`).toBe(original);
    }
  });

  it.each(STREAMS)("%s marks each concept once, not everywhere it appears", (name, content) => {
    const marked = allStrings(content)
      .flatMap(([, text]) => scienceEmphasisParts(text))
      .filter((part) => part.emphasised)
      .map((part) => part.text.toLowerCase());
    expect(new Set(marked).size, `${name} repeats an emphasised concept`).toBe(marked.length);
  });

  it("marks the equivalent concept in both languages, in the same fields", () => {
    const fieldsWithMarkers = (content: ScienceF2InteractiveContent) =>
      allStrings(content)
        .filter(([, text]) => text.includes("**"))
        .map(([path]) => path);
    expect(fieldsWithMarkers(scienceF2C5InteractiveBM)).toEqual(
      fieldsWithMarkers(scienceF2C5InteractiveDLP),
    );
  });

  it.each(STREAMS)(
    "%s puts no marker outside the fields the renderer wires to ScienceEmphasis",
    (_name, content) => {
      for (const [path, text] of allStrings(content)) {
        if (!text.includes("**")) continue;
        expect(
          path,
          `emphasis marker in a field the shared renderer does not wire: ${path}`,
        ).toMatch(ALLOWLIST);
      }
    },
  );

  it.each(STREAMS)("%s leaves quiz and reflection content unmarked", (_name, content) => {
    for (const [path, text] of allStrings(content)) {
      if (!text.includes("**")) continue;
      expect(path, `emphasis leaked into assessment content: ${path}`).not.toMatch(
        /miniQuiz|reflectionItems|checks\[/,
      );
    }
  });
});
