import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch3-nutrisi.png";

export const scienceF2C3InteractiveDLP: ScienceF2InteractiveContent = {
  chapter: 3,
  blogHighlight: {
    title: "Science Blog — Feeding an Astronaut",
    body: "Space food must be nutritious, light, compact and safe for months without refrigeration. Freeze-drying removes water while preserving much of the food's nutrient value.",
    imagePath: chapterImage,
  },
  keywords: [
    "Carbohydrate",
    "Protein",
    "Fat",
    "Vitamin",
    "Mineral",
    "Fibre",
    "Balanced diet",
    "Food pyramid",
    "Digestion",
    "Enzyme",
    "Duodenum",
    "Pancreas",
    "Liver",
    "Gall bladder",
    "Chyme",
    "Villus",
    "Assimilation",
    "Visking tubing",
    "Defecation",
  ],
  sections: [
    {
      number: "3.1.1",
      title: "Classes of Food",
      intro:
        "A healthy body needs seven classes of food in suitable proportions: carbohydrate, protein, fat, vitamin, mineral, fibre and water.",
      cards: [
        {
          title: "Carbohydrate",
          body: "The body's main energy source (staple food). Examples: starch (stored in plants), glycogen (stored in animals). Sources: rice, bread, potatoes, bananas, honey.",
        },
        {
          title: "Protein",
          body: "For growth and repair of body tissues, and to synthesise enzymes, hormones and antibodies. Digested into amino acids. Sources: fish, chicken, eggs, legumes, meat, milk.",
          detail:
            "Additional Knowledge: severe protein deficiency is linked to Kwashiorkor (children aged 1–3) — not core DSKP Chapter 3 scope.",
        },
        {
          title: "Fat",
          body: "The most concentrated energy store — provides about 2× the energy of carbohydrate/protein per gram. Protects body organs and acts as a heat insulator. Sources: butter, cooking oil, groundnuts.",
        },
        {
          title: "Vitamin",
          body: "An organic compound needed in small amounts for health; does not supply energy. Six main vitamins (A, B, C, D, E, K) — see the next section.",
        },
        {
          title: "Mineral",
          body: "An inorganic substance needed in small amounts to regulate body processes. Six main minerals — see the next section.",
        },
        {
          title: "Fibre",
          body: "Cellulose that cannot be digested by the digestive system; stimulates peristalsis and prevents constipation. Sources: grains, fruits, vegetables.",
        },
        {
          title: "Water",
          body: "A solvent and transport medium for nutrients and oxygen into cells; regulates body temperature. Recommendation: at least 2 litres a day.",
        },
      ],
      checks: [
        {
          question: "What are the seven classes of food?",
          hint: "Carbohydrate, protein, fat, vitamin, mineral, fibre and water.",
        },
        {
          question: "Why do growing children need more protein?",
          hint: "For growth and repair of body tissues.",
        },
      ],
    },
    {
      number: "3.1.1",
      title: "Vitamins and Minerals",
      intro:
        "The DSKP requires six main vitamins and six main minerals to be introduced, each with its source, importance and deficiency effect.",
      cards: [
        {
          title: "Vitamin A",
          body: "Source: milk, egg yolk, fish liver oil. Helps night vision and skin health. Deficiency: night blindness, skin disease.",
        },
        {
          title: "Vitamin B",
          body: "Source: yeast, liver, eggs. Maintains nervous system function and red blood cell formation. Deficiency: beri-beri, anaemia.",
        },
        {
          title: "Vitamin C",
          body: "Source: fruits, vegetables. Fights infection and maintains gum/mouth health. Deficiency: scurvy (bleeding gums).",
        },
        {
          title: "Vitamin D",
          body: "Source: butter, eggs, fish liver oil, sunlight. Helps calcium absorption and strengthens tooth enamel. Deficiency: rickets, toothache.",
        },
        {
          title: "Vitamin E",
          body: "Source: grains, green vegetables. Maintains reproductive system function. Deficiency: sterility, foetal miscarriage.",
        },
        {
          title: "Vitamin K",
          body: "Source: milk, egg yolk, fish liver oil. Speeds up blood clotting. Deficiency: slow blood clotting.",
        },
      ],
      accordions: [
        {
          title: "Calcium",
          body: "Source: milk, anchovies, prawns, green vegetables. Importance: helps blood clotting, strengthens bones and teeth. Deficiency: rickets, osteoporosis.",
        },
        {
          title: "Sodium",
          body: "Source: salt, meat, eggs. Importance: maintains nervous system function. Deficiency: muscle cramps.",
        },
        {
          title: "Iron",
          body: "Source: liver, meat. Importance: builds haemoglobin in blood. Deficiency: anaemia.",
        },
        {
          title: "Iodine",
          body: "Source: seafood, fruits. Importance: helps thyroid gland function. Deficiency: goitre.",
        },
        {
          title: "Phosphorus",
          body: "Source: cheese, meat, eggs, vegetables. Importance: strengthens bones/teeth, forms nucleic acid (DNA/RNA). Deficiency: rickets, brittle teeth.",
        },
        {
          title: "Potassium",
          body: "Source: plants and animals. Importance: helps muscle contraction and nervous system function. Deficiency: paralysis, muscle cramps.",
        },
      ],
      comparison: {
        title: "Water-soluble versus fat-soluble",
        columns: [
          {
            title: "Water-soluble",
            body: "Vitamins B and C. Needed continuously from food because they are not stored for long in the body.",
          },
          {
            title: "Fat-soluble",
            body: "Vitamins A, D, E and K. Transported and stored together with fat in the body.",
          },
        ],
      },
      checks: [
        { question: "Name two fat-soluble vitamins.", hint: "A, D, E or K." },
        {
          question: "What is the effect of iodine deficiency?",
          hint: "Goitre — the thyroid gland does not function properly.",
        },
      ],
    },
    {
      number: "3.1.2",
      title: "Food Tests",
      intro:
        "Laboratory tests are used to detect the presence of starch, glucose, protein and fat in a food sample.",
      accordions: [
        {
          title: "🧪 How do food tests work?",
          body: "Each test uses a specific reagent that reacts only with a certain nutrient and produces an observable colour change or precipitate — this is the 'positive result' that shows the nutrient is present in the sample.",
        },
        {
          title: "Starch and sugar tests",
          body: "Starch: add iodine solution directly to the sample at room temperature — the colour turns blue-black if positive. Reducing sugar: add Benedict's solution, then HEAT in a water bath — the colour changes from blue to green/yellow/brick-red precipitate if positive.",
        },
        {
          title: "Protein and fat tests",
          body: "Protein: add Millon's reagent, then heat in a water bath — a brick-red precipitate/colour shows a positive result. Fat: mix the sample with ethanol, then pour into water — a cloudy, milky-white emulsion forms if positive.",
        },
        {
          title: "⚠️ Safety precaution",
          body: "Ethanol is flammable, so heating for Benedict's and Millon's tests is done in a water bath, not over a direct flame.",
        },
      ],
      matcher: {
        title: "Match the food test",
        instruction: "Match each nutrient with its reagent and positive result.",
        pairs: [
          { id: "starch", label: "Starch", match: "Iodine solution → blue-black" },
          {
            id: "sugar",
            label: "Reducing sugar",
            match: "Benedict's solution + heat → brick-red precipitate",
          },
          { id: "protein", label: "Protein", match: "Millon's reagent + heat → brick-red" },
          { id: "fat", label: "Fat", match: "Ethanol emulsion test → milky white" },
        ],
      },
      checks: [
        {
          question: "What is the positive result for the iodine test?",
          hint: "The colour turns blue-black.",
        },
        {
          question: "Why are Benedict's and Millon's tests heated in a water bath?",
          hint: "For safe, even heating; ethanol used in another test is flammable.",
        },
      ],
    },
    {
      number: "3.2.1",
      title: "Balanced Diet & Food Pyramid",
      intro:
        "A balanced diet supplies all seven food classes in the correct proportions, guided by the Malaysian Food Pyramid or the Healthy Plate Model.",
      pyramid: {
        title: "Malaysia Food Pyramid 2020",
        instruction:
          "Tap each tier to see its daily serving guidance. The base tier (widest) is the group to eat the most of. This pyramid has 4 tiers and 5 main food groups.",
        tiers: [
          {
            id: "base",
            icon: "🥦",
            groups: [
              { label: "Vegetables", servings: "At least 3 servings a day" },
              { label: "Fruits", servings: "2 servings a day" },
            ],
            note: "Rich in vitamins, minerals and fibre — the base tier of the Malaysia Food Pyramid 2020.",
          },
          {
            id: "grains",
            icon: "🍚",
            groups: [
              {
                label: "Rice, other grains, wholegrain-based products and tubers",
                servings: "3–5 servings a day",
              },
            ],
            note: "The main energy source; placed on the second tier, above vegetables and fruit.",
          },
          {
            id: "protein-dairy",
            icon: "🍗",
            groups: [
              { label: "Fish", servings: "1 serving a day" },
              { label: "Poultry, eggs or meat", servings: "1–2 servings a day" },
              { label: "Legumes", servings: "1 serving a day" },
              { label: "Milk and dairy products", servings: "2 servings a day" },
            ],
            note: "One combined tier for the protein and dairy groups — supplies protein for growth/tissue repair and calcium for bones and teeth.",
          },
          {
            id: "apex",
            icon: "🧂",
            groups: [{ label: "Fat, oil, sugar and salt", servings: "Limit intake" }],
            note: "The apex tier — take in the smallest amount.",
          },
        ],
        baseNote:
          "Plain water: 6–8 glasses a day (1 glass = 250 ml) — the foundation of any food pyramid.",
        limitNote:
          "Additional current guidance: alongside limiting fat, oil, sugar and salt at the apex, also limit ultra-processed foods. This does not mean all processed foods are unhealthy.",
        sourceLabel: "Current guidance: Malaysia Food Pyramid 2020 (KKM).",
      },
      cards: [
        {
          title: "Age",
          body: "Children and teenagers need more carbohydrate (energy) and protein (growth) because they are growing and more active.",
        },
        {
          title: "Sex",
          body: "Males are generally more muscular and carry out heavier activity, so they need a greater quantity of food than females.",
        },
        {
          title: "Body size",
          body: "A person with a larger body size needs a greater quantity of food for the extra energy required.",
        },
        {
          title: "Occupation",
          body: "Farmers, labourers and fishermen need more energy because of heavy work, compared with office workers such as teachers.",
        },
        {
          title: "Climate",
          body: "People in cold climates lose body heat faster and need more food to maintain body temperature.",
        },
        {
          title: "Health condition",
          body: "People who are ill, pregnant or recovering need food portions suited to their health condition.",
        },
      ],
      checks: [
        {
          question: "What are the six factors that affect a person's calorific requirement?",
          hint: "Age, sex, body size, occupation, climate and health condition.",
        },
        {
          question: "Why does a fisherman need more energy than a teacher?",
          hint: "A fisherman's occupation involves heavier physical work.",
        },
      ],
    },
    {
      number: "3.2.2",
      title: "Calorific Value & Diet Planning",
      intro:
        "Calorific value is the amount of energy released when 1 g of food is completely oxidised, measured in calories (cal) or joules (J).",
      comparison: {
        title: "Energy value per gram",
        columns: [
          {
            title: "Fat",
            body: "37 kJ/g (9 kcal/g) — more than twice the energy density of protein or carbohydrate.",
          },
          { title: "Protein and carbohydrate", body: "Each provides about 17 kJ/g (4 kcal/g)." },
        ],
      },
      accordions: [
        {
          title: "🧮 Worked Example: Estimating Breakfast Calorific Value",
          body: "1 calorie (cal) = 4.2 joules (J). Example breakfast: fried rice, 1 plate (330 g) = 640 kcal; 2 bananas (120 g) = 120 kcal; 1 glass of milk (250 ml) = 130 kcal. Total calorific value of breakfast = 890 kcal.",
        },
        {
          title: "📋 Activity: Planning a Balanced Day",
          body: "Prepare breakfast, lunch and dinner menus for one individual (for example, a construction labourer, a pregnant woman, or an athletic student). Decide the quantity of food for each menu, then total the calorific value for one day. Factors such as occupation, age and health condition determine whether the menu is suitable.",
        },
      ],
      cards: [
        {
          title: "Body Mass Index (BMI) — Textbook Enrichment",
          body: "BMI = Mass (kg) ÷ [Height (m) × Height (m)]. This formula is used to assess body mass status, but BMI is NOT a core DSKP requirement in Chapter 3 — it is additional textbook detail.",
        },
      ],
      checks: [
        { question: "What is 1 calorie in joules?", hint: "1 cal = 4.2 J." },
        {
          question: "Which food class provides the most energy-dense fuel per gram?",
          hint: "Fat — 37 kJ/g, about twice that of carbohydrate or protein.",
        },
      ],
    },
    {
      number: "3.2.3",
      title: "Healthy Lifestyle",
      intro:
        "A balanced diet, exercise and a healthy lifestyle are important for maintaining body health and avoiding diet-related diseases.",
      causeEffect: {
        title: "Habit → body effect → disease → healthier alternative",
        instruction: "Follow each chain to see how daily habits lead to health problems.",
        items: [
          {
            icon: "🍟",
            title: "Diet high in sugar, salt, oil and fat",
            chain: [
              "Frequent processed and junk food",
              "Excess calories and saturated fat",
              "Overweight / obesity",
              "Risk of diabetes, high blood pressure and high cholesterol",
            ],
            note: "Healthier alternative: reduce sugar, salt and oil; add more fruits and vegetables.",
          },
          {
            icon: "🛋️",
            title: "Lack of exercise",
            chain: [
              "Inactive lifestyle",
              "Excess energy not burned off",
              "Body fat stores increase",
              "Risk of heart disease",
            ],
            note: "Healthier alternative: exercise regularly every week.",
          },
          {
            icon: "🚬",
            title: "Smoking",
            chain: [
              "Continued smoking habit",
              "Damage to cells and blood vessels",
              "Risk of skin cancer and lung cancer",
            ],
            note: "Healthier alternative: avoid smoking altogether.",
          },
        ],
      },
      accordions: [
        {
          title: "📊 Context: National Health and Morbidity Survey (NHMS) 2016",
          body: "Percentage of adult Malaysians: diabetes 17.5%, high blood pressure 30%, high cholesterol 47%, obesity 17%, overweight 40%. Only 6% of adult Malaysians eat enough fruit and vegetables — these statistics are supporting context, not core facts to memorise.",
        },
      ],
      checks: [
        {
          question: "Name three diet-related diseases named in the DSKP.",
          hint: "Heart disease, high blood pressure, diabetes, skin cancer or lung cancer.",
        },
        {
          question: "What is the link between processed/junk food and obesity?",
          hint: "These foods are high in calories, sugar, salt and fat, causing excess energy to be stored as body fat.",
        },
      ],
    },
    {
      number: "3.3.1",
      title: "Human Digestive System",
      intro:
        "Digestion is the breakdown of complex or large food into smaller, soluble molecules that are ready to be absorbed by the body.",
      digestiveSystem: {
        title: "Structure of the Human Digestive System",
        instruction:
          "Tap any organ to see its function. Round nodes form the alimentary canal; square nodes are the accessory digestive organs that connect to the duodenum.",
        tractLabel: "Alimentary canal",
        accessoryLabel: "Accessory Digestive Organs",
        organs: [
          {
            id: "mulut",
            label: "Mouth",
            kind: "tract",
            note: "Food is chewed by teeth; saliva softens food and begins starch digestion.",
          },
          {
            id: "esofagus",
            label: "Oesophagus",
            kind: "tract",
            note: "The tube that pushes the bolus to the stomach by peristalsis.",
          },
          {
            id: "perut",
            label: "Stomach",
            kind: "tract",
            note: "Churns food; secretes protease and hydrochloric acid.",
          },
          {
            id: "duodenum",
            label: "Duodenum",
            kind: "tract",
            note: "The first part of the small intestine; receives bile from the gall bladder and pancreatic juice from the pancreas.",
          },
          {
            id: "usus-kecil",
            label: "Small intestine",
            kind: "tract",
            note: "Digestion is completed and nutrients are absorbed here through the villi.",
          },
          {
            id: "usus-besar",
            label: "Large intestine",
            kind: "tract",
            note: "Reabsorbs water and mineral salts from the remaining food.",
          },
          {
            id: "rektum",
            label: "Rectum",
            kind: "tract",
            note: "Stores faeces temporarily before removal.",
          },
          {
            id: "dubur",
            label: "Anus",
            kind: "tract",
            note: "Where faeces are removed from the body (defecation).",
          },
          {
            id: "hati",
            label: "Liver",
            kind: "accessory",
            connectsTo: "duodenum",
            note: "Produces bile, which is passed to the duodenum.",
          },
          {
            id: "pundi-hempedu",
            label: "Gall bladder",
            kind: "accessory",
            connectsTo: "duodenum",
            note: "Stores bile before it is released into the duodenum.",
          },
          {
            id: "pankreas",
            label: "Pancreas",
            kind: "accessory",
            connectsTo: "duodenum",
            note: "Produces pancreatic juice containing amylase, protease and lipase.",
          },
        ],
      },
      sequence: {
        title: "Follow the journey of food",
        instruction: "Travel through the alimentary canal in order, from mouth to anus.",
        steps: [
          {
            title: "Mouth",
            body: "Teeth chew the food. Salivary amylase in saliva begins digesting starch into maltose.",
          },
          { title: "Oesophagus", body: "Peristalsis pushes the bolus into the stomach." },
          {
            title: "Stomach",
            body: "The stomach wall secretes protease and hydrochloric acid. Hydrochloric acid activates protease and kills bacteria. Protease digests protein into polypeptide only at this stage. The food becomes semi-liquid, called chyme.",
          },
          {
            title: "Duodenum",
            body: "The liver produces bile, stored in the gall bladder; bile emulsifies fat and neutralises acid in the chyme. The pancreas secretes pancreatic juice: amylase digests starch→maltose, protease digests polypeptide→dipeptide, lipase digests fat→fatty acids and glycerol.",
          },
          {
            title: "Small intestine",
            body: "The small intestine secretes protease (dipeptide→amino acid); villi on its wall absorb nutrients into the blood and lymph.",
          },
          {
            title: "Large intestine",
            body: "Water and mineral salts are reabsorbed into the bloodstream.",
          },
          { title: "Rectum", body: "Faeces are stored temporarily before removal." },
          { title: "Anus", body: "Faeces are removed from the body through defecation." },
        ],
      },
      checks: [
        {
          question: "Which organ lies between the stomach and the small intestine?",
          hint: "The duodenum — the first part of the small intestine.",
        },
        {
          question: "What is the function of the gall bladder?",
          hint: "It stores bile before releasing it into the duodenum.",
        },
      ],
    },
    {
      number: "3.3.1",
      title: "Physical vs Chemical Digestion",
      intro:
        "Digestion consists of two processes that occur at the same time: physical digestion and chemical digestion.",
      comparison: {
        title: "Physical digestion compared with chemical digestion",
        columns: [
          {
            title: "Physical digestion",
            body: "Occurs in the mouth only. Involves the mechanical breakdown of food (chewing). Does NOT involve enzymes.",
          },
          {
            title: "Chemical digestion",
            body: "Occurs in the mouth, stomach, duodenum and intestine. Involves enzymes that break complex molecules into small, soluble molecules.",
          },
        ],
      },
      accordions: [
        {
          title: "What is an enzyme?",
          body: "An enzyme is a substance in the body that speeds up chemical reactions in the digestive system. Enzymes are made of protein — without enzymes, digestion occurs at a very slow rate.",
        },
      ],
      checks: [
        { question: "Where does physical digestion occur?", hint: "In the mouth only." },
        {
          question: "What is the main difference between physical and chemical digestion?",
          hint: "Chemical digestion involves enzymes; physical digestion does not.",
        },
      ],
    },
    {
      number: "3.3.1",
      title: "Enzymes and Chemical Digestion",
      intro:
        "The DSKP introduces three digestive enzymes: amylase, protease and lipase. Each is secreted by more than one organ and acts on a different substrate at each stage.",
      tabs: [
        {
          title: "Amylase",
          body: "Secreted by the salivary glands (acts in the mouth) and the pancreas (acts in the duodenum). Digests starch → maltose.",
        },
        {
          title: "Protease",
          body: "Three separate stages: STOMACH protease digests protein → polypeptide; PANCREATIC protease (acting in the duodenum) digests polypeptide → dipeptide; SMALL INTESTINE protease digests dipeptide → amino acid.",
        },
        {
          title: "Lipase",
          body: "Secreted by the pancreas and the small intestine, acting in the duodenum and small intestine. Digests fat → fatty acids and glycerol.",
        },
      ],
      accordions: [
        {
          title: "🧂 Hydrochloric Acid (HCl)",
          body: "Secreted by the stomach wall together with protease. Two main functions: activates protease and kills bacteria in food entering the stomach.",
        },
        {
          title: "➕ Textbook Detail: Maltase",
          body: "The small intestine also secretes maltase, which digests maltose → glucose, completing the carbohydrate pathway: starch → maltose → glucose. The DSKP requires only three enzymes (amylase, protease, lipase), so maltase is additional textbook detail — not a core requirement to memorise.",
        },
      ],
      checks: [
        {
          question: "Which organ secretes the protease that digests polypeptide into dipeptide?",
          hint: "The pancreas — acting in the duodenum.",
        },
        {
          question: "What are the two functions of hydrochloric acid in the stomach?",
          hint: "Activating protease and killing bacteria.",
        },
      ],
    },
    {
      number: "3.4.1",
      title: "Absorption of Digested Products",
      intro:
        "The small intestine is structurally adapted to absorb digested nutrients efficiently.",
      cards: [
        {
          title: "Many villi",
          body: "Millions of tiny projections greatly increase the surface area for absorption.",
        },
        {
          title: "One-cell-thick wall",
          body: "The villus wall is very thin, creating a short diffusion distance.",
        },
        {
          title: "Folded surface",
          body: "The surface of the small intestine is folded to further increase the absorption surface area.",
        },
        {
          title: "Rich transport network",
          body: "Many blood capillaries and lacteals carry absorbed nutrients away quickly.",
        },
      ],
      villusDiagram: {
        title: "Villus structure and absorption",
        instruction:
          "Small molecules produced by digestion cross the villus wall through two separate routes.",
        wallLabel: "Villus wall (one cell thick)",
        lumenLabel: "Small intestine lumen",
        pathways: [
          {
            id: "blood",
            label: "Blood capillary",
            destination: "Blood → Liver",
            cargo: "Glucose and amino acids",
          },
          {
            id: "lacteal",
            label: "Lacteal",
            destination: "Lymphatic system",
            cargo: "Fatty acids and glycerol",
          },
        ],
      },
      checks: [
        {
          question: "Why is a thin villus wall important for absorption?",
          hint: "It shortens the diffusion distance, increasing the rate of absorption.",
        },
        {
          question:
            "Where are glucose and amino acids carried first after entering the blood capillary?",
          hint: "To the liver.",
        },
      ],
    },
    {
      number: "3.4.1",
      title: "The Visking Tubing Experiment",
      intro:
        "Experiment 3.1 uses Visking tubing as a model of the small intestine wall to study the absorption of digested products.",
      accordions: [
        {
          title: "🎯 Aim & Hypothesis",
          body: "Aim: To study the absorption of glucose through Visking tubing. Problem statement: Can glucose diffuse out through Visking tubing? Hypothesis: Glucose can diffuse out through Visking tubing.",
        },
        {
          title: "🔧 Variables",
          body: "Fixed: type and size of Visking tubing, temperature, time. Manipulated: the type of content inside the Visking tubing (starch suspension versus glucose solution). Responding: presence of glucose in the distilled water outside the tubing.",
        },
        {
          title: "🧪 Brief Method",
          body: "1% starch suspension is placed into one Visking tube (P); glucose solution is placed into another Visking tube (Q). Both tubes are tied and immersed in distilled water in separate boiling tubes. Iodine and Benedict's tests are carried out on the DISTILLED WATER OUTSIDE the Visking tubing — at the start and after 30 minutes.",
        },
        {
          title: "🔍 Observations & Inference",
          body: "Boiling tube P (starch): iodine and Benedict's tests on the water remain negative at the end of the experiment — starch molecules are too large to pass through the Visking tubing. Boiling tube Q (glucose): Benedict's test on the water turns positive (brick-red precipitate) after 30 minutes — glucose molecules are small enough to diffuse out through the Visking tubing.",
        },
        {
          title: "💡 Conclusion",
          body: "Visking tubing acts as a model of the small intestine wall: small, soluble molecules like glucose can diffuse through it, but large molecules like starch cannot.",
        },
      ],
      viskingExperiment: {
        title: "Experiment 3.1 apparatus set-up",
        instruction:
          "Both Visking tubes are immersed in separate distilled water baths. Food tests are carried out on the water OUTSIDE the tubing, not on its contents.",
        tubes: [
          { id: "P", label: "Boiling tube P", contents: "Visking tube + starch suspension" },
          { id: "Q", label: "Boiling tube Q", contents: "Visking tube + glucose solution" },
        ],
        surroundLabel: "Both Visking tubes are immersed in distilled water inside boiling tubes.",
        testLabel:
          "Iodine and Benedict's tests are carried out on the distilled water OUTSIDE the Visking tubing.",
        resultCorrect:
          "Q — Benedict's test on the water turns POSITIVE after 30 minutes: glucose has diffused out.",
        resultIncorrect:
          "P — Iodine and Benedict's tests on the water stay NEGATIVE: starch cannot pass through the tubing.",
        note: "This models how the small intestine wall allows only small, soluble molecules to be absorbed into the blood.",
      },
      checks: [
        {
          question: "What does the Visking tubing represent in this experiment?",
          hint: "The small intestine wall (a partially permeable membrane).",
        },
        {
          question:
            "Why are the food tests carried out on the water OUTSIDE the tubing, not inside it?",
          hint: "To detect substances that have diffused out through the Visking tubing.",
        },
      ],
    },
    {
      number: "3.4.2",
      title: "Assimilation & System Cooperation",
      intro:
        "Molecules absorbed into the villi still need to reach the body's cells — this requires three body systems to work together.",
      causeEffect: {
        title: "Three-system cooperation",
        instruction:
          "Each system contributes one role so that body cells receive nutrients and oxygen.",
        items: [
          {
            icon: "🍽️",
            title: "Digestive system",
            chain: [
              "Breaks down large/complex food",
              "Small, soluble molecules",
              "Absorbed into the villi",
            ],
          },
          {
            icon: "🩸",
            title: "Circulatory system",
            chain: [
              "Receives nutrients from the villi",
              "Transports them through the blood",
              "Delivers them to body cells",
            ],
          },
          {
            icon: "🫁",
            title: "Respiratory system",
            chain: [
              "Supplies oxygen",
              "Oxygen reacts with glucose inside cells",
              "Respiration → energy",
            ],
            note: "The three systems work together so body cells receive nutrients and oxygen at the same time.",
          },
        ],
      },
      comparison: {
        title: "Assimilation — using the end products of digestion",
        columns: [
          { title: "Glucose", body: "Used to produce energy through respiration." },
          {
            title: "Amino acids, fatty acids & glycerol",
            body: "Amino acids form new cell components. Fatty acids and glycerol combine to form fat — a heat insulator and organ protector.",
          },
        ],
      },
      checks: [
        {
          question: "What is assimilation?",
          hint: "The process of distributing the end products of digestion for use by body cells.",
        },
        {
          question: "How is the respiratory system linked to the digestive system?",
          hint: "The respiratory system supplies the oxygen needed for respiration using the assimilated glucose.",
        },
      ],
    },
    {
      number: "3.4.3",
      title: "Defecation",
      intro:
        "Undigested and unabsorbed food moves into the large intestine, and is eventually removed from the body through defecation.",
      cards: [
        {
          title: "Large intestine",
          body: "Water and mineral salts are reabsorbed into the bloodstream as the remaining food moves along it.",
        },
        {
          title: "Faeces",
          body: "The solid waste (fibre, digestive tract secretions, dead cells, water) that is not absorbed or digested.",
        },
        { title: "Rectum", body: "Stores faeces temporarily before removal." },
        {
          title: "Anus",
          body: "Faeces are removed from the body through the process of defecation.",
        },
      ],
      causeEffect: {
        title: "Effects of a low-fibre, low-water diet",
        items: [
          {
            icon: "🚱",
            title: "Low fibre & water intake",
            chain: [
              "Insufficient fibre and water in the diet",
              "Faeces movement becomes slow and hard",
              "Constipation",
            ],
            note: "Prevention: eat enough fibre (fruits, vegetables, grains) and water (at least 2 litres a day).",
          },
        ],
      },
      checks: [
        {
          question: "What is the effect of insufficient fibre and water on defecation?",
          hint: "Constipation — faeces movement becomes slow and hard.",
        },
        {
          question: "What substances are reabsorbed in the large intestine?",
          hint: "Water and mineral salts.",
        },
      ],
    },
  ],
  reflectionItems: [
    "I can state the functions and sources of the seven food classes, including the mandated vitamins and minerals.",
    "I can explain the Malaysia Food Pyramid 2020 and the factors that affect calorific requirement.",
    "I can estimate the calorific value of a meal and plan a balanced diet.",
    "I can explain the importance of a balanced diet, exercise and a healthy lifestyle.",
    "I can trace food through the digestive system, including the roles of the pancreas, liver and gall bladder.",
    "I can compare physical digestion with chemical digestion.",
    "I can explain the Visking tubing experiment and its relevance to absorption.",
    "I can explain assimilation and the cooperation of three body systems, and the process of defecation.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "True or false: Bile contains an enzyme that digests fat.",
      answer: false,
      explanation:
        "Bile is not an enzyme; it emulsifies fat and neutralises acidic chyme. Fat is chemically digested by the enzyme lipase.",
    },
    {
      type: "multiple-choice",
      question: "Which structure absorbs fatty acids and glycerol?",
      options: ["Blood platelet", "Lacteal", "Oesophagus", "Rectum"],
      answerIndex: 1,
      explanation:
        "The lacteal inside each villus absorbs products of fat digestion into the lymphatic system.",
    },
    {
      type: "multiple-choice",
      question:
        "What is the correct order of protein digestion from the stomach to the small intestine?",
      options: [
        "Protein → Amino acid → Polypeptide",
        "Protein → Polypeptide → Dipeptide → Amino acid",
        "Polypeptide → Protein → Amino acid",
        "Amino acid → Dipeptide → Protein",
      ],
      answerIndex: 1,
      explanation:
        "Stomach protease digests protein → polypeptide; pancreatic protease digests polypeptide → dipeptide; small intestine protease digests dipeptide → amino acid.",
    },
    {
      type: "true-false",
      question:
        "True or false: In the Visking tubing experiment, food tests are carried out on the contents INSIDE the tubing.",
      answer: false,
      explanation:
        "The tests are carried out on the distilled water OUTSIDE the Visking tubing, to detect substances that have diffused out.",
    },
  ],
};
