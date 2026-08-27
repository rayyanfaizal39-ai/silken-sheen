import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch6-asid-alkali.png";

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
      title: "Acids and Alkalis",
      intro:
        "The word \"acid\" comes from the Latin acidus, meaning sour. \"Alkali\" comes from the Arabic al-qali, meaning ashes of plants. A substance containing acid is called an acidic substance; a substance containing alkali is called an alkaline substance.",
      cards: [
        {
          title: "Acidic substances",
          body: "Substances that contain acid. Many are in the kitchen — apples and coffee are acidic substances, and so are vinegar and lime juice.",
        },
        {
          title: "Alkaline substances",
          body: "Substances that contain alkali. Baking soda is an alkaline substance, and so are soap and dishwashing liquid.",
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
      title: "Why Water Matters",
      intro:
        "This may be surprising: a substance can be an acid and yet not behave like one. Acids and alkalis only show their properties when water is present. Compare the four cases below.",
      dryVsAqueous: {
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
      title: "Properties of Acids and Alkalis",
      intro:
        "Once water is present, acids and alkalis show a predictable set of properties. Compare the two property by property.",
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
      cards: [
        {
          title: "The hydrogen gas test",
          body: "When an acid reacts with a metal such as magnesium or zinc, hydrogen gas is produced. A lit splinter makes a 'pop' sound when brought near hydrogen gas.",
          detail: "Alkalis do not give this reaction with metals.",
        },
      ],
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
      title: "Indicators and Measuring pH",
      intro:
        "An indicator is a colouring that changes colour according to the substance being tested. Different indicators tell you different things — some only tell you acid or alkali, others give you a pH value.",
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
      title: "The pH Scale",
      intro:
        "The pH scale shows how acidic or alkaline a solution is. Its values range from 0 to 14, with pH 7 as neutral. The lower the pH value, the more acidic the solution; the higher the pH value, the more alkaline.",
      phSlider: {
        title: "🌈 The pH scale — drag to explore",
        instruction: "Every substance sits somewhere on a 0–14 scale. Drag the marker to see what lives at each pH.",
        scale: [
          { value: 0, name: "Battery acid", description: "Extremely acidic — highly corrosive." },
          { value: 1, name: "Stomach acid", description: "Very acidic — enough to digest food." },
          { value: 2, name: "Vinegar / lemon juice", description: "Acidic — the sour taste you recognise." },
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
          { value: 14, name: "Drain cleaner", description: "Extremely alkaline — highly corrosive." },
        ],
      },
      checks: [
        {
          question:
            "A liquid turns universal indicator green. Is it acidic, neutral, or alkaline?",
          hint: "Neutral — green sits exactly at pH 7 on the universal indicator scale.",
        },
        {
          question:
            "Arrange in increasing order of acidity: pineapple juice (pH 4), fresh milk (pH 6), vinegar (pH 2).",
          hint: "Fresh milk (pH 6), pineapple juice (pH 4), then vinegar (pH 2). The lower the pH value, the more acidic the solution.",
        },
      ],
    },
    {
      number: "6.1",
      title: "Strength of Acids and Alkalis",
      intro:
        "The pH value tells you how acidic a solution is — but to compare the strength of the substances themselves, we have to compare them fairly, at the same concentration.",
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
      title: "Uses of Acids and Alkalis",
      intro:
        "Acids and alkalis are used every day at home, and widely in the agricultural and industrial sectors too.",
      cards: [
        {
          title: "🏠 At home",
          body: "Acids: vinegar in cooking, fizzy drinks (carbonic acid), pickles (tartaric acid). Alkalis: bath soap (potassium hydroxide), dishwashing liquid, antacid pills (magnesium hydroxide).",
        },
        {
          title: "🌾 In agriculture",
          body: "Ammonia solution is used to produce fertiliser to help crops grow. Alkaline slaked lime is spread to treat soil that has become too acidic, so that crops can grow well.",
          detail: "Rising soil acidity harms crop growth.",
        },
        {
          title: "🏭 In industry",
          body: "Sulphuric acid is used in car batteries. Sodium hydroxide is used to make detergents. Alkalis are also used to treat acidic factory waste before it is released into rivers.",
          detail: "Burning fuel in industrial areas can lower the pH of rainwater.",
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
      title: "Neutralisation and Titration",
      intro:
        "Mix an acid with an alkali and they cancel each other out — the acid loses its acidity, the alkali loses its alkalinity, and the reaction produces salt and water. The laboratory method used to carry out this reaction is called titration.",
      cards: [
        {
          title: "The neutralisation equation",
          body: "Acid + Alkali → Salt + Water",
          detail: "Different acids and alkalis produce different kinds of salt.",
        },
        {
          title: "Hydrochloric acid + Sodium hydroxide",
          body: "Produces sodium chloride and water.",
        },
        {
          title: "Sulphuric acid + Potassium hydroxide",
          body: "Produces potassium sulphate and water.",
        },
        {
          title: "Nitric acid + Sodium hydroxide",
          body: "Produces sodium nitrate and water.",
        },
      ],
      titrationSchematic: {
        title: "🧪 Acid-alkali titration",
        instruction: "Tap any part to find out what it does.",
        endpointCaption: "End point: pink → colourless",
        hint: "Tap Burette, Acid, Conical flask, Indicator or End point.",
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
      title: "Neutralisation in Daily Life",
      intro:
        "Neutralisation is not just a laboratory reaction. It is used every day in personal care products, in agriculture and in industry.",
      accordions: [
        {
          title: "🦷 Toothpaste",
          body: "Bacteria in the mouth produce acid that erodes teeth. Toothpaste contains an alkaline substance that neutralises that acid, helping to prevent dental caries.",
        },
        {
          title: "🧺 Fabric softener",
          body: "Detergent powder leaves fabric alkaline after washing. Fabric softener is acidic, so it lowers the pH of the fabric by neutralising that alkaline residue — leaving the fabric soft.",
        },
        {
          title: "💇 Shampoo and hair conditioner",
          body: "Healthy hair is slightly acidic, but shampoo is usually slightly alkaline. A mildly acidic conditioner neutralises the shampoo residue on the hair, leaving it soft and healthy.",
        },
        {
          title: "🧴 Face care",
          body: "An alkaline face cleanser leaves facial skin dry. An acidic toner is therefore used to neutralise the skin again.",
        },
        {
          title: "🌾 Controlling soil pH",
          body: "Acidic soil can be treated by spreading alkaline slaked lime, so that crops can grow well.",
        },
        {
          title: "🏭 Treating industrial waste",
          body: "Acidic waste from factories is treated with alkalis before being released into rivers, so that it does not harm aquatic life.",
        },
      ],
      checks: [
        {
          question:
            "Amran was stung by a jellyfish. His pain got worse when his friend applied soap and toothpaste to the area. Why, and what should have been done?",
          hint: "Soap and toothpaste are alkaline. In the model used here, the jellyfish sting is also treated as alkaline — so adding more alkaline material does not neutralise it and makes the pain worse. An acidic substance such as vinegar is used to neutralise the condition. (Note: real sting treatment depends on the species — follow current first-aid guidance.)",
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
    "I can explain what acidic and alkaline substances are, with examples.",
    "I can explain why acids and alkalis only show their properties in the presence of water.",
    "I can compare the properties of acids and alkalis, including their action on metals.",
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
      options: ["Acid and alkali", "Salt and water", "Oxygen and hydrogen", "Carbon dioxide and water"],
      answerIndex: 1,
      explanation: "Acid + Alkali → Salt + Water, every time — only the specific salt formed changes.",
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
