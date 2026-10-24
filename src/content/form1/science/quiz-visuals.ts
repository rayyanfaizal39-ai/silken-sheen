/** Reusable, answer-neutral visual stimuli for the canonical Form 1 Science quiz banks.
 * Both BM and DLP use the same numerical/diagrammatic stimulus.
 * Keep every answer derivable from the question text as well for accessibility.
 */
export const scienceF1QuizVisualById: Readonly<Record<string, string>> = {
  "sci-f1-c1-bm-q4": "/quiz-visuals/science-f1/measurement.svg",
  "sci-f1-c1-dlp-q4": "/quiz-visuals/science-f1/measurement.svg",
  "sci-f1-c1-bm-q18": "/quiz-visuals/science-f1/measurement.svg",
  "sci-f1-c1-dlp-q18": "/quiz-visuals/science-f1/measurement.svg",
  "sci-f1-c2-bm-q18": "/quiz-visuals/science-f1/leaf-light.svg",
  "sci-f1-c2-dlp-q18": "/quiz-visuals/science-f1/leaf-light.svg",
  "sci-f1-c3-bm-q15": "/quiz-visuals/science-f1/stoma.svg",
  "sci-f1-c3-dlp-q15": "/quiz-visuals/science-f1/stoma.svg",
  "sci-f1-c3-bm-q25": "/quiz-visuals/science-f1/stoma.svg",
  "sci-f1-c3-dlp-q25": "/quiz-visuals/science-f1/stoma.svg",
  "sci-f1-c4-bm-q30": "/quiz-visuals/science-f1/flower.svg",
  "sci-f1-c4-dlp-q30": "/quiz-visuals/science-f1/flower.svg",
  "sci-f1-c5-bm-q9": "/quiz-visuals/science-f1/particles.svg",
  "sci-f1-c5-dlp-q9": "/quiz-visuals/science-f1/particles.svg",
  "sci-f1-c5-bm-q11": "/quiz-visuals/science-f1/particles.svg",
  "sci-f1-c5-dlp-q11": "/quiz-visuals/science-f1/particles.svg",
  "sci-f1-c5-bm-q22": "/quiz-visuals/science-f1/heating-curve.svg",
  "sci-f1-c5-dlp-q22": "/quiz-visuals/science-f1/heating-curve.svg",
  "sci-f1-c6-bm-q24": "/quiz-visuals/science-f1/chromatography.svg",
  "sci-f1-c6-dlp-q24": "/quiz-visuals/science-f1/chromatography.svg",
  "sci-f1-c8-bm-q8": "/quiz-visuals/science-f1/mirror.svg",
  "sci-f1-c8-dlp-q8": "/quiz-visuals/science-f1/mirror.svg",
  "sci-f1-c8-bm-q17": "/quiz-visuals/science-f1/reflection.svg",
  "sci-f1-c8-dlp-q17": "/quiz-visuals/science-f1/reflection.svg",
  "sci-f1-c8-bm-q18": "/quiz-visuals/science-f1/reflection.svg",
  "sci-f1-c8-dlp-q18": "/quiz-visuals/science-f1/reflection.svg",
  "sci-f1-c8-bm-q19": "/quiz-visuals/science-f1/refraction-glass.svg",
  "sci-f1-c8-dlp-q19": "/quiz-visuals/science-f1/refraction-glass.svg",
  "sci-f1-c8-bm-q20": "/quiz-visuals/science-f1/refraction-water.svg",
  "sci-f1-c8-dlp-q20": "/quiz-visuals/science-f1/refraction-water.svg",
  "sci-f1-c8-bm-q25": "/quiz-visuals/science-f1/periscope.svg",
  "sci-f1-c8-dlp-q25": "/quiz-visuals/science-f1/periscope.svg",
  "sci-f1-c9-bm-q9": "/quiz-visuals/science-f1/earth-layers.svg",
  "sci-f1-c9-dlp-q9": "/quiz-visuals/science-f1/earth-layers.svg",
  "sci-f1-c9-bm-q12": "/quiz-visuals/science-f1/earth-layers.svg",
  "sci-f1-c9-dlp-q12": "/quiz-visuals/science-f1/earth-layers.svg",
  "sci-f1-c9-bm-q28": "/quiz-visuals/science-f1/plates.svg",
  "sci-f1-c9-dlp-q28": "/quiz-visuals/science-f1/plates.svg",
};

/** Describe the stimulus, not the answer. Shared geometry has localised alternatives. */
export const scienceF1QuizVisualDescriptions: Readonly<
  Record<string, { bm: string; dlp: string }>
> = {
  measurement: {
    bm: "Dua silinder serupa: 50 cm³ sebelum batu dimasukkan dan 65 cm³ selepas batu ditenggelamkan sepenuhnya.",
    dlp: "Two matching cylinders: 50 cm³ before adding a stone and 65 cm³ after fully submerging it.",
  },
  "leaf-light": {
    bm: "Daun di bawah sumber cahaya dengan sebahagiannya ditutup kertas legap. Keputusan ujian kanji tidak ditunjukkan.",
    dlp: "A leaf under a light source with part covered by opaque paper. The starch-test result is not shown.",
  },
  stoma: {
    bm: "Dua sel pengawal berbentuk ginjal mengelilingi liang stoma yang terbuka.",
    dlp: "Two kidney-shaped guard cells surround an open stomatal pore.",
  },
  flower: {
    bm: "Keratan bunga dengan satu ovari mengandungi enam ovul. Ovul yang disenyawakan tidak ditandakan.",
    dlp: "A flower section with one ovary containing six ovules. Fertilised ovules are not marked.",
  },
  particles: {
    bm: "Tiga model dengan dua belas zarah sama saiz: A rapat dan teratur; B rapat tetapi tidak teratur; C berjauhan. Pergerakan tidak ditunjukkan.",
    dlp: "Three models with twelve equal-sized particles: A closely ordered; B close but irregular; C widely spaced. Motion is not shown.",
  },
  "heating-curve": {
    bm: "Graf suhu melawan masa: garis menaik, mendatar untuk suatu tempoh, kemudian menaik semula. Tiada nilai suhu diberikan.",
    dlp: "Temperature against time: the line rises, stays horizontal for a period, then rises again. No temperature values are supplied.",
  },
  chromatography: {
    bm: "Jalur kertas mempunyai empat tompok berwarna yang terpisah di atas garis asal; garis asal berada di atas permukaan pelarut.",
    dlp: "A paper strip has four separated coloured spots above the baseline; the baseline is above the solvent surface.",
  },
  mirror: {
    bm: "Seorang berdiri 2 m di hadapan cermin satah. Kedudukan imej tidak ditunjukkan.",
    dlp: "A person stands 2 m in front of a plane mirror. The image position is not shown.",
  },
  reflection: {
    bm: "Sinar menuju cermin mengufuk pada sudut 35° kepada normal menegak. Sinar pantulan tidak ditunjukkan.",
    dlp: "A ray approaches a horizontal mirror at 35° to the vertical normal. The reflected ray is not shown.",
  },
  "refraction-glass": {
    bm: "Sinar serong dalam udara menuju sempadan kaca di bawah. Normal berserenjang dengan sempadan; sinar dalam kaca belum dilukis.",
    dlp: "An oblique ray in air approaches glass below. The normal is perpendicular to the boundary; the ray in glass is not drawn.",
  },
  "refraction-water": {
    bm: "Sinar serong dalam air menuju udara di atas. Normal berserenjang dengan permukaan; sinar yang keluar belum dilukis.",
    dlp: "An oblique ray in water approaches air above. The normal is perpendicular to the surface; the emerging ray is not drawn.",
  },
  periscope: {
    bm: "Laluan cahaya dari A ke kanan, kemudian ke bawah dan ke kanan menuju B melalui dua cermin selari yang condong 45°.",
    dlp: "Light travels from A rightwards, downwards, then rightwards to B via two parallel mirrors inclined at 45°.",
  },
  "earth-layers": {
    bm: "Keratan skematik Bumi: lapisan nipis A paling luar, lapisan tebal B di bawahnya, kemudian C dan D di pusat. Bukan mengikut skala.",
    dlp: "Schematic Earth section: thin outermost layer A, thick layer B beneath it, then C and central D. Not to scale.",
  },
  plates: {
    bm: "Dua plat kerak dengan anak panah menghala ke arah satu sama lain pada sempadan.",
    dlp: "Two crustal plates with arrows pointing towards each other at a boundary.",
  },
};
