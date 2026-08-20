import type { MindNode } from "@/components/MindMap";
import {
  chapter1Terminology,
  laboratoryHazards,
  localize,
  scientificInvestigationSteps,
  type Chapter1Lang,
} from "./chapter1-canonical";

function node(id: string, label: string, children?: MindNode[]): MindNode {
  return { id, label, ...(children?.length ? { children } : {}) };
}

export function buildScienceF1C1MindMap(lang: Chapter1Lang): MindNode {
  const en = lang === "en";
  const prefix = `science-c1-${lang}`;
  const tr = <T extends { en: string; bm: string }>(value: T) => localize(value, lang);

  return node(prefix, en ? "Introduction to Scientific Investigation" : "Pengenalan kepada Penyiasatan Saintifik", [
    node(`${prefix}-1`, en ? "Science in Daily Life" : "Sains dalam Kehidupan Harian", [
      node(`${prefix}-1-1`, en ? "Definition and daily-life links" : "Maksud dan hubung kait kehidupan harian"),
      node(`${prefix}-1-2`, en ? "Importance of science" : "Kepentingan sains"),
      node(`${prefix}-1-3`, en ? "Fields, careers and subjects" : "Bidang, kerjaya dan subjek"),
      node(`${prefix}-1-4`, en ? "Technology innovation" : "Inovasi teknologi"),
    ]),
    node(`${prefix}-2`, en ? "Science Laboratory" : "Makmal Sains", [
      node(`${prefix}-2-1`, en ? "Apparatus and functions" : "Radas dan fungsi"),
      node(
        `${prefix}-2-2`,
        en ? "Warning symbols" : "Simbol amaran",
        laboratoryHazards.map((hazard, index) => node(`${prefix}-2-2-${index + 1}`, tr(hazard.name))),
      ),
      node(`${prefix}-2-3`, en ? "Rules, safety and accident response" : "Peraturan, keselamatan dan tindakan kemalangan"),
    ]),
    node(`${prefix}-3`, en ? "Physical Quantities and Units" : "Kuantiti Fizik dan Unitnya", [
      node(`${prefix}-3-1`, en ? "Five base quantities and S.I. units" : "Lima kuantiti asas dan unit S.I."),
      node(`${prefix}-3-2`, en ? "Prefixes" : "Imbuhan"),
      node(`${prefix}-3-3`, en ? "Mass, length and time conversions" : "Pertukaran jisim, panjang dan masa"),
      node(`${prefix}-3-4`, en ? "Importance of standard units" : "Kepentingan unit piawai"),
    ]),
    node(`${prefix}-4`, en ? "Measuring Instruments" : "Penggunaan Alat Pengukur", [
      node(`${prefix}-4-1`, `${chapter1Terminology.accuracy[lang]}, ${chapter1Terminology.precision[lang]}, ${chapter1Terminology.sensitivity[lang]}`),
      node(`${prefix}-4-2`, en ? "Higher-accuracy measuring tools" : "Alat pengukur yang lebih jitu"),
      node(`${prefix}-4-3`, en ? "Systematic and random errors" : "Ralat sistematik dan ralat rawak"),
      node(`${prefix}-4-4`, en ? "Estimate before measuring" : "Anggar sebelum mengukur"),
      node(`${prefix}-4-5`, en ? "Measurement innovation" : "Inovasi alat pengukuran"),
    ]),
    node(`${prefix}-5`, en ? "Density" : "Ketumpatan", [
      node(`${prefix}-5-1`, en ? "Mass per unit volume" : "Jisim per unit isi padu"),
      node(`${prefix}-5-2`, en ? "Density = mass ÷ volume" : "Ketumpatan = jisim ÷ isi padu"),
      node(`${prefix}-5-3`, en ? "Water displacement method" : "Kaedah sesaran air"),
      node(`${prefix}-5-4`, en ? "Order, float and sink" : "Urutan, terapung dan tenggelam"),
      node(`${prefix}-5-5`, en ? "Daily phenomena and innovation" : "Fenomena harian dan inovasi"),
    ]),
    node(
      `${prefix}-6`,
      en ? "Scientific Investigation Sequence" : "Urutan Penyiasatan Saintifik",
      scientificInvestigationSteps.map((step) => node(`${prefix}-6-${step.step}`, `${step.step}. ${tr(step.heading)}`)),
    ),
    node(`${prefix}-7`, en ? "Scientific Attitudes and Noble Values" : "Sikap Saintifik dan Nilai Murni", [
      node(`${prefix}-7-1`, en ? "Curious" : "Bersifat ingin tahu"),
      node(`${prefix}-7-2`, en ? "Honest and accurate" : "Jujur dan tepat"),
      node(`${prefix}-7-3`, en ? "Responsible for safety and environment" : "Bertanggungjawab terhadap keselamatan dan alam sekitar"),
    ]),
  ]);
}

