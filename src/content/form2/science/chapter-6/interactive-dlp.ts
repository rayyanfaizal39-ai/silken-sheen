import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch6-asid-alkali.png";
import propertiesAcidsAlkalisImg from "@/assets/notes/form2-science/chapter-6/science-f2-ch6-properties-acids-alkalis.webp";
import roleOfWaterImg from "@/assets/notes/form2-science/chapter-6/science-f2-ch6-role-of-water.webp";
import neutralisationApplicationsImg from "@/assets/notes/form2-science/chapter-6/science-f2-ch6-neutralisation-applications.webp";
import acidMetalTestImg from "@/assets/notes/form2-science/chapter-6/chapter6_acid_metal_hydrogen_test.webp";
import phTestingImg from "@/assets/notes/form2-science/chapter-6/chapter6_ph_testing_methods.webp";
import titrationImg from "@/assets/notes/form2-science/chapter-6/science-f2-ch6-titration.webp";
import usesOfAcidsAlkalisImg from "@/assets/notes/form2-science/chapter-6/chapter6_uses_of_acids_and_alkalis.webp";

export const scienceF2C6InteractiveDLP: ScienceF2InteractiveContent = {
  chapter: 6,
  blogHighlight: {
    title: "Science Blog — The pH of Your Skin",
    body: "Your skin has a thin protective layer called the acid mantle — a mix of sebum and sweat that keeps skin naturally slightly acidic, helping to hold pathogens off.",
    imagePath: chapterImage,
  },
  keywords: [
    "Acid",
    "Alkali",
    "pH value",
    "Corrosiveness",
    "Universal indicator",
    "Litmus paper",
    "Methyl orange",
    "Phenolphthalein",
    "pH meter",
    "pH scale",
    "Strong and weak acids",
    "Neutralisation",
    "Salt",
    "Titration",
    "End point",
  ],
  sections: [
    // ------------------------------------------------------------- 6.1
    {
      number: "6.1",
      title: "Properties of Acids and Alkalis",
      intro:
        "Acids and alkalis are common substances with a predictable, opposite set of properties. Compare the two property by property.",
      conceptContrast: {
        title: "⚖️ Acid versus alkali",
        instruction: "Both are corrosive — the difference lies in every other property.",
        keyPoint:
          "⚠️ Sour and bitter tastes are descriptions of properties only. Never taste laboratory chemicals or any unknown substance.",
        left: {
          id: "acid",
          icon: "🍋",
          term: "Acid",
          question: "pH value less than 7",
          definition: "A substance that shows acidic properties when dissolved in water.",
          examples: [
            "Tastes sour",
            "Corrosive",
            "Turns blue litmus paper red",
            "Reacts with metals to produce hydrogen gas",
          ],
        },
        right: {
          id: "alkali",
          icon: "🧼",
          term: "Alkali",
          question: "pH value more than 7",
          definition: "A substance that shows alkaline properties when dissolved in water.",
          examples: [
            "Tastes bitter",
            "Corrosive",
            "Turns red litmus paper blue",
            "Does not react with metals",
          ],
        },
      },
      images: [
        {
          src: propertiesAcidsAlkalisImg,
          alt: "Side-by-side comparison of an acid and an alkali: pH scale position, taste symbol, a corrosive reaction with a metal plate, litmus paper colour change, and reaction with magnesium metal.",
          size: "wide",
          aspect: "3 / 2",
          annotationMode: "spotlight",
          spotlightDimOpacity: 0.45,
          legendLabel: "Acid versus alkali properties",
          overlayHeadings: [
            { id: "acid-heading", x: 25, y: 4, text: "Acid" },
            { id: "alkali-heading", x: 75, y: 4, text: "Alkali" },
          ],
          annotations: [
            {
              id: "ph",
              label: "pH",
              note: "Acid: pH is less than 7. Alkali: pH is more than 7.",
              spotlightCaption: "pH",
              spotlightShapes: [
                { id: "ph-acid", kind: "rect", x: 2.6, y: 2.9, w: 46.2, h: 15.7 },
                { id: "ph-alkali", kind: "rect", x: 51.4, y: 2.9, w: 46.2, h: 15.7 },
              ],
            },
            {
              id: "taste",
              label: "Taste",
              note: "Acid: tastes sour (shown here with a lemon). Alkali: tastes bitter (shown here with bitter gourd). These are textbook properties only — never taste a laboratory acid or alkali.",
              spotlightCaption: "Taste",
              spotlightShapes: [
                { id: "taste-acid", kind: "rect", x: 2.6, y: 19.5, w: 46.2, h: 15.7 },
                { id: "taste-alkali", kind: "rect", x: 51.4, y: 19.5, w: 46.2, h: 15.7 },
              ],
            },
            {
              id: "corrosiveness",
              label: "Corrosiveness",
              note: "Both acid and alkali are corrosive — each damages the metal plate.",
              spotlightCaption: "Corrosiveness",
              spotlightShapes: [
                { id: "corrosive-acid", kind: "rect", x: 2.6, y: 36.1, w: 46.2, h: 17.1 },
                { id: "corrosive-alkali", kind: "rect", x: 51.4, y: 36.1, w: 46.2, h: 17.1 },
              ],
            },
            {
              id: "litmus",
              label: "Litmus",
              note: "Acid: blue litmus turns red. Alkali: red litmus turns blue.",
              spotlightCaption: "Litmus",
              spotlightShapes: [
                { id: "litmus-acid", kind: "rect", x: 2.6, y: 54.2, w: 46.2, h: 14.2 },
                { id: "litmus-alkali", kind: "rect", x: 51.4, y: 54.2, w: 46.2, h: 14.2 },
              ],
            },
            {
              id: "metal-reaction",
              label: "Reaction with Metals",
              note: "Acid: reacts with a suitable metal such as magnesium to produce hydrogen gas. Alkali: does not react with metals.",
              spotlightCaption: "Reaction with Metals",
              spotlightShapes: [
                { id: "metal-acid", kind: "rect", x: 2.6, y: 69.3, w: 46.2, h: 24 },
                { id: "metal-alkali", kind: "rect", x: 51.4, y: 69.3, w: 46.2, h: 24 },
              ],
            },
          ],
        },
        {
          src: acidMetalTestImg,
          alt: "Magnesium ribbon reacting with acid in a test tube to give off hydrogen gas, and the lit splint test in which the hydrogen burns with a pop sound.",
          size: "wide",
          aspect: "3 / 2",
          legendLabel: "Acid and a suitable metal, and the hydrogen test",
          caption:
            "Magnesium is used here because it is a suitable reactive metal — not every metal reacts with an acid this way.",
          annotations: [],
        },
      ],
      remember:
        "The hydrogen gas test: when an acid **reacts with a metal such as magnesium or zinc**, **hydrogen gas is produced** — tested with a lit splint, which gives a 'pop' sound. Alkalis do not give this reaction with metals.",
      checks: [
        {
          question: "Why do bottles of acid and alkali both carry a corrosive warning symbol?",
          hint: "Because both acids AND alkalis — not acids alone — can be corrosive and damage skin or other materials.",
        },
        {
          question:
            "A strip of magnesium ribbon is placed into potassium hydroxide solution. What would you expect to happen?",
          hint: "No reaction. Alkalis do not react with metals — only acids react with metals to produce hydrogen gas.",
        },
      ],
    },
    {
      number: "6.1",
      title: "Role of Water",
      intro:
        "This may be surprising: a substance can be an acid and yet not behave like one. Acids and alkalis only show their properties when water is present. Compare the four cases below.",
      remember: "Acids and alkalis only show their properties in **the presence of water**.",
      dryVsAqueous: {
        image: {
          src: roleOfWaterImg,
          alt: "Four-panel comparison showing that acids and alkalis show their characteristic properties only in the presence of water.",
          size: "wide",
          aspect: "3 / 2",
          annotationMode: "spotlight",
          spotlightDimOpacity: 0.45,
          legendLabel: "Without water versus with water",
          points: [
            {
              id: "acid-dry",
              x: 25,
              y: 25,
              spotlightShapes: [{ id: "acid-dry", kind: "rect", x: 1.3, y: 2, w: 47.5, h: 46.3 }],
            },
            {
              id: "acid-wet",
              x: 75,
              y: 25,
              spotlightShapes: [{ id: "acid-wet", kind: "rect", x: 51.4, y: 2, w: 47.5, h: 46.3 }],
            },
            {
              id: "alkali-dry",
              x: 25,
              y: 74,
              spotlightShapes: [
                { id: "alkali-dry", kind: "rect", x: 1.3, y: 50.3, w: 47.5, h: 46.9 },
              ],
            },
            {
              id: "alkali-wet",
              x: 75,
              y: 74,
              spotlightShapes: [
                { id: "alkali-wet", kind: "rect", x: 51.4, y: 50.3, w: 47.5, h: 46.9 },
              ],
            },
          ],
        },
        title: "💧 Without water versus with water",
        instruction: "Tap any case to read what happens and why.",
        withoutWaterLabel: "Without water",
        withWaterLabel: "With water",
        acidColumnLabel: "Acid — tested with blue litmus paper",
        alkaliColumnLabel: "Alkali — tested with red litmus paper",
        keyMessage: "Acids and alkalis only show their properties in the presence of water.",
        hint: "Tap any of the four cases above.",
        panels: [
          {
            id: "acid-dry",
            substance: "Glacial ethanoic acid",
            withWater: false,
            litmus: "blue",
            result: "blue",
            resultText: "Blue litmus does not change",
            note: "Glacial ethanoic acid is ethanoic acid without water. Even though it genuinely is an acid, it does not show its acidic properties — the blue litmus paper stays blue.",
          },
          {
            id: "acid-wet",
            substance: "Ethanoic acid + water",
            withWater: true,
            litmus: "blue",
            result: "red",
            resultText: "Blue litmus turns red",
            note: "As soon as water is added, the ethanoic acid shows its acidic properties and turns blue litmus paper red.",
          },
          {
            id: "alkali-dry",
            substance: "Solid sodium hydroxide",
            withWater: false,
            litmus: "red",
            result: "red",
            resultText: "Red litmus does not change",
            note: "Solid sodium hydroxide is an alkali, but without water it does not show its alkaline properties — the red litmus paper stays red.",
          },
          {
            id: "alkali-wet",
            substance: "Sodium hydroxide + water",
            withWater: true,
            litmus: "red",
            result: "blue",
            resultText: "Red litmus turns blue",
            note: "With water, the sodium hydroxide shows its alkaline properties and turns red litmus paper blue.",
          },
        ],
      },
      checks: [
        {
          question: "Why does glacial ethanoic acid not change the colour of blue litmus paper?",
          hint: "Because no water is present. Acids and alkalis only show their properties in the presence of water — add water, and the blue litmus immediately turns red.",
        },
      ],
    },
    {
      number: "6.1",
      title: "Acidic and Alkaline Substances",
      intro:
        'The word "acid" comes from the Latin acidus, **meaning sour**. "Alkali" comes from the Arabic al-qali, **meaning ashes of plants**. A substance containing acid is called an acidic substance; a substance containing alkali is called an alkaline substance.',
      cards: [
        {
          title: "Acidic substances",
          body: "Substances that contain acid. Many are in the kitchen — **apples and coffee** are acidic substances, and so are vinegar and lime juice.",
        },
        {
          title: "Alkaline substances",
          body: "Substances that contain alkali. **Baking soda** is an alkaline substance, and so are soap and dishwashing liquid.",
        },
      ],
      checks: [
        {
          question:
            "You find an unlabelled bottle of liquid in the kitchen. How could you tell whether it is acidic or alkaline?",
          hint: "Test it with an indicator such as litmus paper. You cannot tell by looking — and you must not taste it, because an unknown substance may be harmful.",
        },
      ],
    },
    {
      number: "6.1",
      title: "Indicators",
      intro:
        "An indicator is **a colouring that changes colour** according to the substance being tested. Different indicators tell you different things — some only tell you acid or alkali, others give you a pH value.",
      indicatorTable: {
        title: "🎨 Indicator colour changes",
        instruction: "Tap an indicator's name to find out when it is most useful.",
        indicatorLabel: "Indicator",
        acidLabel: "Acid",
        neutralLabel: "Neutral",
        alkaliLabel: "Alkali",
        hint: "Tap any indicator in the first column.",
        rows: [
          {
            id: "phenolphthalein",
            name: "Phenolphthalein",
            acid: "Colourless",
            neutral: "Colourless",
            alkali: "Pink",
            acidSwatch: "rgba(226,232,240,0.30)",
            neutralSwatch: "rgba(226,232,240,0.30)",
            alkaliSwatch: "rgba(244,114,182,0.45)",
            note: "Cannot tell acid from neutral — both are colourless. It is useful specifically for detecting alkalis, which is why it is chosen for titration.",
          },
          {
            id: "universal",
            name: "Universal indicator",
            acid: "Red",
            neutral: "Green",
            alkali: "Blue",
            acidSwatch: "rgba(239,68,68,0.42)",
            neutralSwatch: "rgba(34,197,94,0.42)",
            alkaliSwatch: "rgba(59,130,246,0.42)",
            note: "Gives a different colour across the pH range, not just three colours. That is its advantage over litmus paper — it gives an approximate pH value, not just an acid-or-alkali answer.",
          },
          {
            id: "methyl-orange",
            name: "Methyl orange",
            acid: "Red",
            neutral: "Yellow",
            alkali: "Yellow",
            acidSwatch: "rgba(239,68,68,0.42)",
            neutralSwatch: "rgba(234,179,8,0.48)",
            alkaliSwatch: "rgba(234,179,8,0.48)",
            note: "Notice that neutral and alkali give the same colour — yellow. So methyl orange is good at detecting acids, but cannot tell neutral from alkaline.",
          },
          {
            id: "blue-litmus",
            name: "Blue litmus paper",
            acid: "Red",
            neutral: "Blue",
            alkali: "Blue",
            acidSwatch: "rgba(239,68,68,0.42)",
            neutralSwatch: "rgba(59,130,246,0.42)",
            alkaliSwatch: "rgba(59,130,246,0.42)",
            note: "Turns red only in acid. Use blue litmus when you want to know whether something is acidic.",
          },
          {
            id: "red-litmus",
            name: "Red litmus paper",
            acid: "Red",
            neutral: "Red",
            alkali: "Blue",
            acidSwatch: "rgba(239,68,68,0.42)",
            neutralSwatch: "rgba(239,68,68,0.42)",
            alkaliSwatch: "rgba(59,130,246,0.42)",
            note: "Turns blue only in alkali. Use red litmus when you want to know whether something is alkaline.",
          },
        ],
      },
      methodCards: {
        title: "📏 Three ways to find the pH",
        instruction: "Each tool answers the same question, but with different precision.",
        whatLabel: "What is it?",
        howLabel: "What does it tell you?",
        whenLabel: "When is it used?",
        cards: [
          {
            id: "litmus",
            icon: "📄",
            name: "Litmus paper",
            what: "Paper treated with a dye, in two kinds — blue and red.",
            how: "Whether a substance is acidic or alkaline. It does not tell you how strong.",
            when: "When you only need a quick answer: acid or alkali?",
          },
          {
            id: "universal",
            icon: "🌈",
            name: "Universal indicator / pH paper",
            what: "A mixture of several dyes producing a continuous range of colours.",
            how: "An approximate pH value, by matching the colour against a pH chart.",
            when: "When you need to know more than just acid or alkali.",
          },
          {
            id: "ph-meter",
            icon: "🔢",
            name: "pH meter",
            what: "An electronic instrument with a probe dipped into the solution.",
            how: "A numerical pH reading straight off the display — the most precise of the three.",
            when: "When an exact pH value is needed, not just a colour estimate.",
          },
        ],
      },
      images: [
        {
          src: phTestingImg,
          alt: "Three ways of testing pH: litmus paper for acid or alkali, universal indicator paper for an approximate pH, and a pH meter for a numerical reading.",
          size: "wide",
          aspect: "3 / 2",
          legendLabel: "Three ways of testing pH",
          caption:
            "The three methods answer progressively more precise questions, from acid-or-alkali to an exact pH value.",
          annotations: [],
        },
      ],
      checks: [
        {
          question: "What is the advantage of universal indicator over litmus paper?",
          hint: "Litmus paper only tells you whether a substance is acidic or alkaline. Universal indicator gives a range of colours that lets you estimate the actual pH value.",
        },
        {
          question:
            "Grace adds phenolphthalein to colourless solution M. It stays colourless. Does that prove solution M is acidic?",
          hint: "No. Phenolphthalein is colourless in acid AND in neutral solutions — so M could be either. Test it again with blue litmus paper to be sure.",
        },
      ],
    },
    {
      number: "6.1",
      title: "Strength of Acids and Alkalis",
      intro:
        "The pH scale shows how acidic or alkaline a solution is. Its values range from **0 to 14**, with **pH 7 as neutral** — the lower the pH, the more acidic the solution; the higher the pH, the more alkaline. To compare the strength of acids or alkalis fairly using pH, the solutions must be compared at **the same concentration**.",
      phSlider: {
        title: "🌈 The pH scale — drag to explore",
        instruction:
          "Every substance sits somewhere on a 0–14 scale. Drag the marker to see what lives at each pH.",
        scale: [
          { value: 0, name: "Battery acid", description: "Extremely acidic — highly corrosive." },
          { value: 1, name: "Stomach acid", description: "Very acidic — enough to digest food." },
          {
            value: 2,
            name: "Vinegar / lemon juice",
            description: "Acidic — the sour taste you recognise.",
          },
          { value: 3, name: "Orange juice", description: "Acidic." },
          { value: 4, name: "Pineapple juice / tomato", description: "Slightly acidic." },
          { value: 5, name: "Black coffee", description: "Slightly acidic." },
          { value: 6, name: "Milk", description: "Close to neutral, slightly acidic." },
          { value: 7, name: "Pure water", description: "Perfectly neutral." },
          { value: 8, name: "Sea water", description: "Close to neutral, slightly alkaline." },
          { value: 9, name: "Baking soda", description: "Slightly alkaline." },
          { value: 10, name: "Antacid / milk of magnesia", description: "Alkaline." },
          { value: 11, name: "Ammonia solution", description: "Alkaline." },
          { value: 12, name: "Soapy water", description: "Alkaline." },
          { value: 13, name: "Bleach", description: "Very alkaline." },
          {
            value: 14,
            name: "Drain cleaner",
            description: "Extremely alkaline — highly corrosive.",
          },
        ],
      },
      strengthComparison: {
        title: "💪 Strong versus weak",
        instruction: "Tap any substance to find out why.",
        conditionLabel: "Condition for comparison",
        condition:
          "All the solutions below are compared at the same concentration. Without this condition, a difference in pH could come from concentration rather than from the strength of the substance itself.",
        strongLabel: "Strong",
        weakLabel: "Weak",
        acidGroupLabel: "Acids",
        alkaliGroupLabel: "Alkalis",
        hint: "Tap any of the four substances above.",
        keyPoint:
          "Strength is a property of the substance itself, not of how much water has been added. Vinegar contains ethanoic acid — a weak acid — even though it tastes sour and has a low pH.",
        entries: [
          {
            id: "hcl",
            name: "Hydrochloric acid",
            ph: "pH ~1",
            strength: "strong",
            kind: "acid",
            note: "At this concentration, hydrochloric acid gives the lower pH of the two acids. This is the example of a strong acid.",
          },
          {
            id: "ethanoic",
            name: "Ethanoic acid",
            ph: "pH ~3",
            strength: "weak",
            kind: "acid",
            note: "At the same concentration as hydrochloric acid, ethanoic acid gives a higher pH. This is the example of a weak acid — and it is the acid found in vinegar.",
          },
          {
            id: "naoh",
            name: "Sodium hydroxide solution",
            ph: "pH ~13",
            strength: "strong",
            kind: "alkali",
            note: "At this concentration, sodium hydroxide gives the higher pH of the two alkalis. This is the example of a strong alkali.",
          },
          {
            id: "ammonia",
            name: "Ammonia solution",
            ph: "pH ~11",
            strength: "weak",
            kind: "alkali",
            note: "At the same concentration as sodium hydroxide, ammonia solution gives a lower pH. This is the example of a weak alkali.",
          },
        ],
      },
      checks: [
        {
          question: "A liquid turns universal indicator green. Is it acidic, neutral, or alkaline?",
          hint: "Neutral — green sits exactly at pH 7 on the universal indicator scale.",
        },
        {
          question:
            "Two acid solutions at the same concentration are tested. Solution P has pH 1 and solution Q has pH 3. Which is the strong acid?",
          hint: "Solution P. At the same concentration, the acid giving the lower pH is the stronger one. The 'same concentration' condition matters — without it the comparison is not fair.",
        },
        {
          question: "Vinegar tastes very sour. Does that mean vinegar contains a strong acid?",
          hint: "No. Vinegar contains ethanoic acid, which is a weak acid. A sour taste and a low pH tell you the solution is acidic — but acid strength is decided by comparing substances at the same concentration.",
        },
      ],
    },
    {
      number: "6.1",
      title: "Uses of Acids and Alkalis in Daily Life",
      intro:
        "Acids and alkalis are used every day at home, and widely in the agricultural and industrial sectors too.",
      cards: [
        {
          title: "🏠 At home",
          body: "Acids: **vinegar in cooking**, fizzy drinks (carbonic acid), pickles (tartaric acid). Alkalis: bath soap (potassium hydroxide), dishwashing liquid, antacid pills (**magnesium hydroxide**).",
        },
        {
          title: "🌾 In agriculture",
          body: "**Ammonia solution** is used to produce fertiliser to help crops grow. Alkaline **slaked lime** is spread to treat soil that has become too acidic, so that crops can grow well.",
          detail: "Rising soil acidity harms crop growth.",
        },
        {
          title: "🏭 In industry",
          body: "**Sulphuric acid** is used in car batteries. Sodium hydroxide is used to make detergents. Alkalis are also used to **treat acidic factory waste** before it is released into rivers.",
          detail: "Burning fuel in industrial areas can lower the pH of rainwater.",
        },
      ],
      images: [
        {
          src: usesOfAcidsAlkalisImg,
          alt: "Uses of acids and alkalis at home, in agriculture and in industry, with each item labelled as an acid or an alkali.",
          size: "wide",
          aspect: "3 / 2",
          legendLabel: "Where acids and alkalis are used",
          annotationMode: "regions",
          caption:
            "Every item is already labelled ACID or ALKALI on the artwork. Pick a column to see what it covers.",
          annotations: [
            {
              id: "rumah",
              label: "At home",
              note: "Vinegar and fizzy drinks are acidic; soap and antacid tablets are alkaline.",
              x: 17,
              y: 44,
              w: 31,
              h: 84,
            },
            {
              id: "pertanian",
              label: "In agriculture",
              note: "Fertiliser is produced and used on crop fields, and slaked lime is added to soil that is too acidic.",
              x: 48,
              y: 44,
              w: 32,
              h: 84,
            },
            {
              id: "industri",
              label: "In industry",
              note: "Sulfuric acid is used in car batteries, sodium hydroxide in detergent manufacture, and alkali to treat acidic industrial waste.",
              x: 82,
              y: 44,
              w: 33,
              h: 84,
            },
          ],
        },
      ],
      checks: [
        {
          question:
            "Why would the pH of rainwater in an industrial area be expected to be lower than 7?",
          hint: "Gases released by industrial activity dissolve in the rain droplets and make them acidic — so the pH is lower than that of ordinary rainwater.",
        },
      ],
    },

    // ------------------------------------------------------------- 6.2
    {
      number: "6.2",
      title: "Neutralisation",
      intro:
        "Mix an acid with an alkali and they cancel each other out — the acid loses its acidity, the alkali loses its alkalinity, and the reaction produces salt and water.",
      cards: [
        {
          title: "The neutralisation equation",
          body: "**Acid + Alkali → Salt + Water**",
          detail: "Different acids and alkalis produce different kinds of salt.",
        },
        {
          title: "Hydrochloric acid + Sodium hydroxide",
          body: "Produces **sodium chloride** and water.",
        },
        {
          title: "Sulphuric acid + Potassium hydroxide",
          body: "Produces **potassium sulphate** and water.",
        },
        {
          title: "Nitric acid + Sodium hydroxide",
          body: "Produces **sodium nitrate** and water.",
        },
      ],
      checks: [
        {
          question: "What salt is produced when nitric acid reacts with sodium hydroxide?",
          hint: "Sodium nitrate — nitric acid + sodium hydroxide → sodium nitrate + water.",
        },
      ],
    },
    {
      number: "6.2",
      title: "Titration",
      intro:
        "Titration can be used to determine the end point of a neutralisation reaction using an indicator.",
      cards: [
        {
          title: "🧪 Apparatus and Materials",
          body: "Everything needed to carry out an acid-alkali titration.",
          facts: [
            {
              label: "You will need",
              value: [
                "Burette — holds the hydrochloric acid",
                "Hydrochloric acid — the acid added drop by drop",
                "Pipette — measures an exact volume of the sodium hydroxide solution",
                "Conical flask — holds the sodium hydroxide solution during the titration",
                "Sodium hydroxide solution — the alkali being neutralised",
                "Phenolphthalein — the indicator used to show the end point",
                "White tile — placed under the flask so the colour change is easy to see",
                "Retort stand — holds the burette upright",
              ],
            },
          ],
        },
      ],
      titrationSchematic: {
        image: {
          src: titrationImg,
          alt: "An acid-alkali titration: acid in a burette added drop by drop into a conical flask of alkali and phenolphthalein, which turns from pink to colourless at the end point.",
          size: "diagram",
          aspect: "3 / 2",
          annotationMode: "regions",
          legendLabel: "Titration apparatus and the end point",
          caption: "End point: pink \u2192 colourless",
          overlayHeadings: [
            {
              id: "title",
              x: 49.7,
              y: 5.9,
              text: "Titration",
              emphasis: "heading",
              bare: true,
              w: 34,
            },
            { id: "burette-tag", x: 37.1, y: 16.5, text: "Burette", bare: true },
            { id: "acid-tag", x: 36.1, y: 27.1, text: "Acid", bare: true },
            { id: "stopcock-tag", x: 38, y: 41.2, text: "Stopcock", bare: true },
            {
              id: "drop-by-drop",
              x: 14.6,
              y: 52.3,
              text: "Acid added drop by drop",
              emphasis: "body",
              bare: true,
              w: 13.7,
            },
            { id: "flask-tag", x: 39.2, y: 59.7, text: "Conical flask", bare: true },
            {
              id: "indicator-tag",
              x: 39.3,
              y: 69.2,
              text: "Alkali + phenolphthalein",
              emphasis: "body",
              bare: true,
              w: 14.1,
            },
            { id: "endpoint-header", x: 71.5, y: 19, text: "End point", bare: true },
            {
              id: "before-endpoint",
              x: 60.6,
              y: 26.7,
              text: "Before end point",
              bare: true,
              tone: "dark",
            },
            { id: "at-endpoint", x: 82.6, y: 26.7, text: "At end point", bare: true, tone: "dark" },
            { id: "pink-swatch", x: 60.5, y: 68, text: "Pink", bare: true, tone: "dark" },
            { id: "colourless-swatch", x: 82, y: 68, text: "Colourless", bare: true, tone: "dark" },
            {
              id: "pink-to-colourless",
              x: 71,
              y: 75.1,
              text: "Pink \u2192 Colourless",
              bare: true,
            },
            {
              id: "bottom-explanation",
              x: 52.1,
              y: 91.4,
              text: "Acid is added gradually from the burette to the alkali and phenolphthalein until the pink colour just disappears. This is the end point.",
              emphasis: "body",
              bare: true,
              w: 63.8,
            },
          ],
          points: [
            { id: "burette", x: 37.1, y: 16.5, w: 10, h: 5.5 },
            { id: "acid", x: 36.1, y: 27.1, w: 8, h: 5 },
            { id: "flask", x: 39.2, y: 59.7, w: 13, h: 5.5 },
            { id: "indicator", x: 39.3, y: 69.2, w: 15, h: 8 },
            { id: "endpoint", x: 71.5, y: 46.9, w: 43, h: 61 },
          ],
          extra: [
            {
              id: "stopcock",
              insertAfter: "acid",
              label: "Stopcock",
              note: "Controls the flow, so the acid can be released drop by drop.",
              x: 38,
              y: 41.2,
              w: 11,
              h: 5.5,
            },
          ],
        },
        title: "🧪 Acid-alkali titration",
        instruction: "Tap any part to find out what it does.",
        endpointCaption: "End point: pink → colourless",
        hint: "Tap Burette, Acid, Stopcock, Conical flask, Indicator or End point.",
        labels: [
          {
            id: "burette",
            label: "Burette",
            note: "A graduated glass tube that lets the acid be added drop by drop, and the volume used to be read accurately.",
          },
          {
            id: "acid",
            label: "Acid",
            note: "Hydrochloric acid is filled into the burette. It is added slowly, drop by drop, into the alkali below.",
          },
          {
            id: "flask",
            label: "Conical flask",
            note: "Holds the sodium hydroxide solution measured out with a pipette. The flask is swirled gently as the acid is added.",
          },
          {
            id: "indicator",
            label: "Indicator",
            note: "A few drops of phenolphthalein are added to the conical flask. In alkali, the solution turns pink.",
          },
          {
            id: "endpoint",
            label: "End point",
            note: "The acid is stopped as soon as the pink colour disappears and the solution becomes colourless. This is where neutralisation is complete.",
          },
        ],
      },
      remember:
        "Titration is the practical method for carrying out a neutralisation: Acid + Alkali → Salt + Water.",
      checks: [
        {
          question:
            "In an acid-alkali titration using phenolphthalein, how is the end point identified?",
          hint: "When the solution in the conical flask changes from pink to colourless. At that moment the acid added has neutralised all of the alkali.",
        },
        {
          question:
            "During a titration, the solution in the conical flask is still pink. What does this mean?",
          hint: "There is still excess alkali — not enough acid has been added to neutralise all of it. The acid must keep being added until the pink colour disappears.",
        },
      ],
    },
    {
      number: "6.2",
      title: "Applications of Neutralisation in Daily Life",
      intro:
        "Neutralisation is not just a laboratory reaction. It is used every day in personal care products, in agriculture and in industry.",
      contextImages: [
        {
          src: neutralisationApplicationsImg,
          alt: "Five everyday applications of neutralisation: toothpaste applied to a tooth, fabric softener on a stained shirt, conditioner on hair, slaked lime added to soil with seedlings, and treatment of acidic industrial wastewater.",
          size: "wide",
          aspect: "3 / 2",
          annotationMode: "spotlight",
          spotlightDimOpacity: 0.45,
          spotlightCaptionEdge: "top",
          legendLabel: "Applications of neutralisation",
          annotations: [
            {
              id: "toothpaste",
              label: "Toothpaste",
              note: "Acids produced by bacteria can affect teeth. Alkaline toothpaste helps neutralise these acids.",
              spotlightCaption: "Toothpaste",
              spotlightShapes: [{ id: "toothpaste", kind: "rect", x: 1.3, y: 2.9, w: 32, h: 44 }],
            },
            {
              id: "fabric-softener",
              label: "Fabric Softener",
              note: "Detergent can leave alkaline residue on fabric. Acidic fabric softener helps neutralise the alkaline residue.",
              spotlightCaption: "Fabric Softener",
              spotlightShapes: [
                { id: "fabric-softener", kind: "rect", x: 34.5, y: 2.9, w: 32, h: 44 },
              ],
            },
            {
              id: "hair-conditioner",
              label: "Hair Conditioner",
              note: "Shampoo can leave hair in an alkaline condition. Mildly acidic conditioner helps neutralise the alkalinity and improve hair condition.",
              spotlightCaption: "Hair Conditioner",
              spotlightShapes: [
                { id: "hair-conditioner", kind: "rect", x: 67, y: 2.9, w: 32, h: 44 },
              ],
            },
            {
              id: "acidic-soil",
              label: "Acidic Soil",
              note: "Acidic soil can affect plant growth. Slaked lime can be added to reduce soil acidity.",
              spotlightCaption: "Acidic Soil",
              spotlightShapes: [{ id: "acidic-soil", kind: "rect", x: 1.3, y: 49.3, w: 45, h: 45 }],
            },
            {
              id: "industrial-waste",
              label: "Industrial Waste",
              note: "Acidic industrial waste can be treated with a suitable alkali. Neutralisation helps reduce excessive acidity before further treatment or safe discharge.",
              spotlightCaption: "Industrial Waste",
              spotlightShapes: [
                { id: "industrial-waste", kind: "rect", x: 47.5, y: 49.3, w: 51, h: 45 },
              ],
            },
          ],
        },
      ],
      accordions: [
        {
          title: "🦷 Toothpaste",
          body: "Bacteria in the mouth produce acid that erodes teeth. Toothpaste contains an **alkaline substance that neutralises that acid**, helping to prevent **dental caries**.",
        },
        {
          title: "🧺 Fabric softener",
          body: "Detergent powder leaves fabric alkaline after washing. Fabric softener **is acidic**, so it **lowers the pH of the fabric** by neutralising that alkaline residue — leaving the fabric soft.",
        },
        {
          title: "💇 Shampoo and hair conditioner",
          body: "Healthy hair is **slightly acidic**, but shampoo is usually **slightly alkaline**. A mildly acidic conditioner neutralises the shampoo residue on the hair, leaving it soft and healthy.",
        },
        {
          title: "🧴 Face care",
          body: "An **alkaline face cleanser** leaves facial skin dry. An **acidic toner** is therefore used to neutralise the skin again.",
        },
        {
          title: "🌾 Controlling soil pH",
          body: "Acidic soil can be treated by spreading **alkaline slaked lime**, so that crops can grow well.",
        },
        {
          title: "🏭 Treating industrial waste",
          body: "Acidic industrial waste can be treated with a suitable alkali to reduce excessive acidity before further treatment or safe discharge.",
        },
      ],
      checks: [
        {
          question:
            "Amran was stung by a jellyfish. His pain got worse when his friend applied soap and toothpaste to the area. Why, and what should have been done?",
          hint: "Soap and toothpaste are alkaline. The jellyfish sting is also alkaline — so adding more alkaline material does not neutralise it and makes the pain worse. An acidic substance such as vinegar is used to neutralise the sting instead.",
        },
        {
          question:
            "The fishy smell of fish is alkaline. What can be used to remove it while cleaning fish?",
          hint: "An acidic substance such as lime juice. The acid neutralises the alkaline substance causing the fishy smell.",
        },
      ],
    },
  ],
  reflectionItems: [
    "I can compare the properties of acids and alkalis, including their action on metals.",
    "I can explain why acids and alkalis only show their properties in the presence of water.",
    "I can explain what acidic and alkaline substances are, with examples.",
    "I can state the colour change of each indicator.",
    "I can choose a suitable tool for finding the pH value of a substance.",
    "I can use the pH scale to decide whether a substance is acidic, neutral or alkaline.",
    "I can distinguish a strong acid from a weak acid at the same concentration.",
    "I can give examples of acids and alkalis used at home, in agriculture and in industry.",
    "I can write a word equation for a neutralisation reaction.",
    "I can explain how the end point is identified in a titration.",
    "I can explain applications of neutralisation in daily life.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question:
        "True or false: At the same concentration, the acid with the lower pH value is the stronger acid.",
      answer: true,
      explanation:
        "True — but the condition 'at the same concentration' matters. Without it, a lower pH might only mean the solution is more concentrated, not that the acid is stronger.",
    },
    {
      type: "true-false",
      question: "True or false: Vinegar tastes sour, so vinegar contains a strong acid.",
      answer: false,
      explanation:
        "False. Vinegar contains ethanoic acid, which is a weak acid. A sour taste shows the solution is acidic, but not that the acid is strong.",
    },
    {
      type: "multiple-choice",
      question: "What are the two products of a neutralisation reaction?",
      options: [
        "Acid and alkali",
        "Salt and water",
        "Oxygen and hydrogen",
        "Carbon dioxide and water",
      ],
      answerIndex: 1,
      explanation:
        "Acid + Alkali → Salt + Water, every time — only the specific salt formed changes.",
    },
    {
      type: "multiple-choice",
      question: "Which tool gives the most precise numerical pH reading?",
      options: ["Blue litmus paper", "Red litmus paper", "Methyl orange", "pH meter"],
      answerIndex: 3,
      explanation:
        "A pH meter gives a numerical reading directly. Litmus paper only tells you acid or alkali, while indicators give an estimate through colour.",
    },
  ],
};
