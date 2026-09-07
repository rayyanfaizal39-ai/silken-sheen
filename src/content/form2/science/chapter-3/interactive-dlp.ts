import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch3-nutrisi.png";
import digestiveSystemImg from "@/assets/notes/form2-science/chapter-3/chapter3_digestive_system.webp";
import foodPyramidImg from "@/assets/notes/form2-science/chapter-3/science-f2-ch3-food-pyramid.webp";
import foodTestsImg from "@/assets/notes/form2-science/chapter-3/chapter3_food_tests.webp";
import villusImg from "@/assets/notes/form2-science/chapter-3/chapter3_villus_absorption.webp";
import viskingImg from "@/assets/notes/form2-science/chapter-3/chapter3_visking_tubing.webp";
import { DIGESTIVE_ORGAN_SHAPES } from "./digestive-system-spotlight";
import { PYRAMID_HOTSPOTS } from "./pyramid-spotlight";
import { VILLUS_SHAPES } from "./villus-spotlight";
import { VISKING_SHAPES } from "./visking-spotlight";

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
          body: "**The body's main energy source** (staple food).",
          facts: [
            { label: "Contains", value: "Carbon, hydrogen and oxygen" },
            {
              label: "Examples & sources",
              value:
                "Starch (stored in plants), glycogen (stored in animals), cellulose (forms plant cell walls). Sources: rice, bread, potatoes, bananas, honey.",
            },
            { label: "Function", value: "Provides energy for the body's daily activities" },
          ],
        },
        {
          title: "Protein",
          body: "Needed for **growth and repair of body tissues**.",
          facts: [
            { label: "Contains", value: "Carbon, hydrogen, oxygen and nitrogen" },
            { label: "Examples & sources", value: "Fish, chicken, eggs, legumes, meat, milk" },
            {
              label: "Function",
              value:
                "Repairs damaged tissue, replaces dead cells, and builds enzymes, hormones and antibodies. Digested into amino acids.",
            },
          ],
          detail:
            "Additional Knowledge: severe protein deficiency is linked to Kwashiorkor (children aged 1–3).",
        },
        {
          title: "Fat",
          body: "**The most concentrated source and store of energy** — about 2× the energy of carbohydrate/protein per gram.",
          facts: [
            {
              label: "Contains",
              value: "Carbon, hydrogen and oxygen; formed from glycerol and fatty acids",
            },
            { label: "Examples & sources", value: "Butter, cooking oil, groundnuts" },
            {
              label: "Function",
              value:
                "Protects body organs, insulates against heat loss beneath the skin, and transports fat-soluble vitamins A, D, E and K",
            },
          ],
        },
        {
          title: "Vitamin",
          body: "An organic compound that does not supply energy, but is required in small amounts to maintain good health.",
          facts: [
            {
              label: "Key characteristic",
              value: "Water-soluble: B and C. Fat-soluble: A, D, E and K.",
            },
            { label: "Examples", value: "Six main vitamins: A, B, C, D, E and K" },
            {
              label: "Function",
              value:
                "Supports vision, blood clotting, infection resistance and more — each vitamin has its own role",
            },
          ],
        },
        {
          title: "Mineral",
          body: "An inorganic substance that does not supply energy, but is required in small amounts to regulate body processes and maintain health.",
          facts: [
            { label: "Examples", value: "Six main minerals: calcium, sodium, iron, iodine, phosphorus and potassium" },
            {
              label: "Function",
              value:
                "Builds strong bones and teeth, forms haemoglobin, supports nerves and muscles — each mineral has its own role",
            },
          ],
        },
        {
          title: "Fibre",
          body: "Cannot be digested by the digestive system.",
          facts: [
            { label: "Key characteristic", value: "Mainly cellulose from plant cell walls" },
            { label: "Examples & sources", value: "Grains, fruits, vegetables" },
            {
              label: "Function",
              value:
                "**Stimulates peristalsis** and helps food move through the digestive tract, helping **prevent constipation**",
            },
          ],
        },
        {
          title: "Water",
          body: "An important compound containing hydrogen and oxygen.",
          facts: [
            { label: "Key characteristic", value: "Acts as a solvent" },
            { label: "Examples & sources", value: "Drinking water and fluids — at least 2 litres a day" },
            {
              label: "Function",
              value:
                "Transports nutrients and oxygen into cells, carries waste such as urea and salts, and helps regulate body temperature through sweating/evaporation",
            },
          ],
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
        "A vitamin is an organic compound that does not supply energy but is required in small amounts for good health. A mineral is an inorganic substance that does not supply energy but is required in small amounts to regulate body processes and maintain health.",
      nutrientTables: [
        {
          title: "Table 3.1: Vitamins",
          instruction: "Six vitamins you need to know, with source, importance and effect of deficiency.",
          nameLabel: "Vitamin",
          sourceLabel: "Sources",
          importanceLabel: "Importance",
          deficiencyLabel: "Effect of deficiency",
          rows: [
            {
              id: "a",
              name: "Vitamin A",
              source: "Milk, egg yolk, fish liver oil",
              importance: "Helps night vision and maintains healthy skin",
              deficiency: "Night blindness, skin disease",
            },
            {
              id: "b",
              name: "Vitamin B",
              source: "Yeast, liver, eggs",
              importance: "Maintains nervous system function and red blood cell formation",
              deficiency: "Beri-beri, anaemia",
            },
            {
              id: "c",
              name: "Vitamin C",
              source: "Fruits, vegetables",
              importance: "Fights infection and maintains healthy gums and mouth",
              deficiency: "Scurvy (bleeding gums)",
            },
            {
              id: "d",
              name: "Vitamin D",
              source: "Butter, eggs, fish liver oil, sunlight",
              importance: "Helps absorb calcium for strong bones and teeth",
              deficiency: "Rickets, toothache",
            },
            {
              id: "e",
              name: "Vitamin E",
              source: "Grains, green vegetables",
              importance: "Maintains reproductive system function",
              deficiency: "Sterility, foetal miscarriage",
            },
            {
              id: "k",
              name: "Vitamin K",
              source: "Milk, egg yolk, fish liver oil",
              importance: "Speeds up blood clotting",
              deficiency: "Slow blood clotting",
            },
          ],
        },
        {
          title: "Table 3.2: Minerals",
          instruction: "Six minerals you need to know, with source, importance and effect of deficiency.",
          nameLabel: "Mineral",
          sourceLabel: "Sources",
          importanceLabel: "Importance",
          deficiencyLabel: "Effect of deficiency",
          rows: [
            {
              id: "calcium",
              name: "Calcium",
              source: "Milk, anchovies, prawns, green vegetables",
              importance: "Helps blood clotting; strengthens bones and teeth",
              deficiency: "Rickets, osteoporosis",
            },
            {
              id: "sodium",
              name: "Sodium",
              source: "Salt, meat, eggs",
              importance: "Maintains nervous system function and water balance in the body",
              deficiency: "Muscle cramps",
            },
            {
              id: "iron",
              name: "Iron",
              source: "Liver, meat",
              importance: "Builds haemoglobin in blood",
              deficiency: "Anaemia",
            },
            {
              id: "iodine",
              name: "Iodine",
              source: "Seafood, fruits",
              importance: "Helps thyroid gland function",
              deficiency: "Goitre",
            },
            {
              id: "phosphorus",
              name: "Phosphorus",
              source: "Cheese, meat, eggs, vegetables",
              importance: "Strengthens bones/teeth; forms nucleic acid (DNA/RNA)",
              deficiency: "Rickets, brittle teeth",
            },
            {
              id: "potassium",
              name: "Potassium",
              source: "Plants and animals",
              importance: "Helps muscle contraction and nervous system function",
              deficiency: "Paralysis, muscle cramps",
            },
          ],
        },
      ],
      comparison: {
        title: "Water-soluble versus fat-soluble",
        columns: [
          {
            title: "Water-soluble",
            body: "Vitamins B and C. **Needed continuously from food** because they are not stored for long in the body.",
          },
          {
            title: "Fat-soluble",
            body: "Vitamins A, D, E and K. **Transported and stored together with fat** in the body.",
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
      images: [
        {
          src: foodTestsImg,
          annotationMode: "labels",
          size: "standard",
          alt: "Four food tests carried out in sequence: the iodine test, Benedict's test in a hot water bath, Millon's test in a hot water bath, and the ethanol emulsion test.",
          aspect: "16 / 9",
          legendLabel: "The four food tests",
          caption: "Tap each number to see the reagent and its positive result.",
          annotations: [
            { id: "starch", label: "Starch", x: 10, y: 12, note: "Iodine → blue-black" },
            { id: "glucose", label: "Glucose", x: 34, y: 12, note: "Benedict's + hot water bath → brick-red precipitate" },
            { id: "protein", label: "Protein", x: 60, y: 12, note: "Millon's reagent + heating → brick-red" },
            { id: "fat", label: "Fat", x: 86, y: 12, note: "Ethanol + water → milky-white emulsion" },
          ],
        },
      ],
      intro:
        "Laboratory tests are used to detect the presence of starch, glucose, protein and fat in a food sample.",
      accordions: [
        {
          title: "🧪 How do food tests work?",
          body: "Each test uses a **specific reagent** that reacts only with a certain nutrient and produces an observable colour change or precipitate — this is the 'positive result' that shows the nutrient is present in the sample.",
        },
        {
          title: "Starch and sugar tests",
          body: "Starch: add iodine solution directly to the sample at room temperature — the colour turns **blue-black** if positive. Reducing sugar: add Benedict's solution, then HEAT in a water bath — the colour changes from blue to green/yellow/brick-red precipitate if positive.",
        },
        {
          title: "Protein and fat tests",
          body: "Protein: add Millon's reagent, then heat in a water bath — a brick-red precipitate/colour shows a positive result. Fat: mix the sample with ethanol, then pour into water — a **cloudy, milky-white emulsion** forms if positive.",
        },
        {
          title: "⚠️ Safety precaution",
          body: "Ethanol is **flammable**, so heating for Benedict's and Millon's tests is done in a water bath, not over a direct flame.",
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
        "A balanced diet is a diet that contains all food classes in the right quantities required by the body, guided by the food pyramid.",
      pyramid: {
        title: "The Food Pyramid",
        instruction: "Tap a level to explore the recommended servings.",
        image: {
          src: foodPyramidImg,
          alt: "The KSSM food pyramid: rice, noodles, bread, grains and tubers at the widest base; vegetables and fruits above that; fish, chicken, meat, eggs, nuts and dairy above that; fat, oil, sugar and salt at the narrowest top.",
          aspect: "3 / 2",
          size: "wide",
        },
        defaultRegionId: "grains",
        regions: [
          {
            id: "grains",
            label: "Rice, noodles, bread, other grains and tubers",
            servings: "4–8 servings a day",
            detailTitle: "Main energy source",
            note: "Provides carbohydrates for energy. This group should make up the largest proportion of the daily diet.",
            polygon: PYRAMID_HOTSPOTS.grains,
          },
          {
            id: "vegetables",
            label: "Vegetables",
            servings: "3 servings a day",
            detailTitle: "Vitamins and fibre",
            note: "Rich in vitamins, minerals and fibre, which help keep the digestive system healthy.",
            polygon: PYRAMID_HOTSPOTS.vegetables,
          },
          {
            id: "fruits",
            label: "Fruits",
            servings: "2 servings a day",
            detailTitle: "Vitamins and minerals",
            note: "A natural source of vitamins and minerals that helps the body stay healthy.",
            polygon: PYRAMID_HOTSPOTS.fruits,
          },
          {
            id: "protein",
            label: "Protein sources",
            items: [
              { label: "Fish", servings: "1 serving daily" },
              { label: "Chicken / meat / eggs", servings: "½–2 servings daily" },
              { label: "Nuts", servings: "½–1 serving daily" },
            ],
            detailTitle: "Growth and repair",
            note: "Builds and repairs body tissue, and strengthens bones and teeth.",
            polygon: PYRAMID_HOTSPOTS.protein,
          },
          {
            id: "dairy",
            label: "Milk and dairy products",
            servings: "1–3 servings a day",
            detailTitle: "Calcium for bones and teeth",
            note: "An important source of calcium and protein that supports strong bones and teeth.",
            polygon: PYRAMID_HOTSPOTS.dairy,
          },
          {
            id: "apex",
            label: "Fat, oil, sugar and salt",
            servings: "Eat sparingly",
            detailTitle: "Eat the least",
            note: "Excess fat, sugar and salt increases the risk of obesity and other health problems.",
            polygon: PYRAMID_HOTSPOTS.apex,
          },
        ],
        baseNote: "Drink at least 8 glasses of plain water a day.",
        limitNote: "Eat fat, oil, sugar and salt sparingly — too much can affect health.",
        sourceLabel: "Source: KSSM Science Form 2 textbook — the food pyramid.",
      },
      checks: [
        {
          question: "What is a balanced diet?",
          hint: "A diet that contains all food classes in the right quantities required by the body.",
        },
        {
          question: "Which tier of the food pyramid should be eaten the most?",
          hint: "The base tier — rice, noodles, bread, other grains and tubers.",
        },
      ],
    },
    {
      number: "3.2.1",
      title: "Factors that Influence Calorific Requirement",
      intro:
        "Different people need different amounts of food energy each day. Six factors influence how much a person's body needs.",
      cards: [
        {
          title: "Age",
          body: "Children and teenagers need more carbohydrate (energy) and protein (growth) because they are growing and more active.",
        },
        {
          title: "Gender",
          body: "Males are generally more muscular and carry out heavier activity, so they need a greater quantity of food than females.",
        },
        {
          title: "Body size",
          body: "A person with a larger body size needs a greater quantity of food for the extra energy required.",
        },
        {
          title: "Work",
          body: "Farmers, labourers and fishermen need more energy because of **heavy work**, compared with office workers such as teachers.",
        },
        {
          title: "Climate",
          body: "People in cold climates lose body heat faster and need more food to maintain body temperature.",
        },
        {
          title: "State of health",
          body: "People who are ill, pregnant or recovering need food portions suited to their state of health.",
        },
      ],
      checks: [
        {
          question: "What are the six factors that affect a person's calorific requirement?",
          hint: "Age, gender, body size, work, climate and state of health.",
        },
        {
          question: "Why does a fisherman need more energy than a teacher?",
          hint: "A fisherman's work involves heavier physical activity.",
        },
      ],
    },
    {
      number: "3.2.2",
      title: "Calorific Value of Food",
      intro:
        "The total energy released when 1 g of food is completely oxidised is called the energy value, or calorific value, measured in calories (cal) or joules (J).",
      comparison: {
        title: "Energy value per gram",
        columns: [
          {
            title: "Fat",
            body: "**37 kJ/g (9 kcal/g)** — more than twice the energy density of protein or carbohydrate.",
          },
          { title: "Protein and carbohydrate", body: "Each provides about **17 kJ/g (4 kcal/g)**." },
        ],
      },
      calorieExample: {
        title: "🧮 Worked Example: Estimating Breakfast Calorific Value",
        items: [
          { id: "rice", food: "Fried rice", quantity: "1 plate", kcal: 640 },
          { id: "banana", food: "Bananas", quantity: "2 pieces", perUnitKcal: 60, multiplier: 2, kcal: 120 },
          { id: "milk", food: "Milk", quantity: "1 glass", kcal: 130 },
        ],
        totalLabel: "Total",
        note: "Add the calorific value of every food item in the meal. 1 cal = 4.2 J, and 1 kcal = 4.2 kJ.",
      },
      accordions: [
        {
          title: "📋 Activity: Planning a Balanced Day",
          body: "Prepare breakfast, lunch and dinner menus for one individual (for example, a construction labourer, a pregnant woman, or an athletic student). Decide the quantity of food for each menu, then total the calorific value for one day. Factors such as work, age and state of health determine whether the menu is suitable.",
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
            note: "Healthier alternative: **reduce sugar, salt and oil**; add more fruits and vegetables.",
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
            note: "Healthier alternative: **exercise regularly** every week.",
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
      cards: [
        {
          title: "Body Mass Index (BMI)",
          body: "BMI compares body mass with height, and is one way to check whether body mass is in a healthy range — part of maintaining good health.",
          facts: [{ label: "Formula", value: "BMI = mass (kg) ÷ [height (m) × height (m)]" }],
        },
      ],
      accordions: [
        {
          title: "📊 Context: National Health and Morbidity Survey (NHMS) 2016",
          body: "Percentage of adult Malaysians: diabetes 17.5%, high blood pressure 30%, high cholesterol 47%, obesity 17%, overweight 40%. Only 6% of adult Malaysians eat enough fruit and vegetables — these statistics are supporting context, not core facts to memorise.",
        },
      ],
      checks: [
        {
          question:
            "Name three diseases that may be associated with unhealthy diet and lifestyle choices.",
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
      title: "Physical vs Chemical Digestion",
      intro:
        "Digestion consists of two processes that occur at the same time: physical digestion and chemical digestion.",
      comparison: {
        title: "Physical digestion compared with chemical digestion",
        columns: [
          {
            title: "Physical digestion",
            body: "Occurs in the mouth only. Involves the mechanical breakdown of food (chewing). **Does NOT involve enzymes**.",
          },
          {
            title: "Chemical digestion",
            body: "Occurs in the mouth, stomach, duodenum and intestine. **Involves enzymes** that break complex molecules into small, soluble molecules.",
          },
        ],
      },
      accordions: [
        {
          title: "What is an enzyme?",
          body: "An enzyme is a substance in the body that **speeds up chemical reactions** in the digestive system. Enzymes are made of protein — without enzymes, digestion occurs at a very slow rate.",
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
      title: "Human Digestive System",
      intro:
        "Digestion is the physical and chemical breakdown of large, complex food into smaller, soluble molecules that the body can absorb.",
      digestiveSystem: {
        image: {
          src: digestiveSystemImg,
          annotationMode: "spotlight",
          size: "portrait",
          alt: "A diagram of the human digestive system inside the body: mouth, salivary glands, oesophagus, stomach, liver, gall bladder, pancreas, duodenum, small intestine, large intestine, rectum and anus.",
          aspect: "3 / 4",
          caption: "Tap a flow-of-food stage below to see what happens there and where it happens here.",
          points: [
            {
              id: "mulut",
              x: 45,
              y: 19,
              spotlightShapes: DIGESTIVE_ORGAN_SHAPES.mulut,
              spotlightCaption: "Chewing + saliva starts digestion",
            },
            {
              id: "kelenjar-air-liur",
              x: 34,
              y: 24,
              spotlightShapes: DIGESTIVE_ORGAN_SHAPES["kelenjar-air-liur"],
              spotlightCaption: "Makes saliva + amylase",
            },
            {
              id: "esofagus",
              x: 50,
              y: 33,
              spotlightShapes: DIGESTIVE_ORGAN_SHAPES.esofagus,
              spotlightCaption: "Pushes food to the stomach",
            },
            {
              id: "hati",
              x: 40,
              y: 48,
              spotlightShapes: DIGESTIVE_ORGAN_SHAPES.hati,
              spotlightCaption: "Makes bile",
            },
            {
              id: "perut",
              x: 61,
              y: 51,
              spotlightShapes: DIGESTIVE_ORGAN_SHAPES.perut,
              spotlightCaption: "Protease + acid → chyme",
            },
            {
              id: "pundi-hempedu",
              x: 40,
              y: 55,
              spotlightShapes: DIGESTIVE_ORGAN_SHAPES["pundi-hempedu"],
              spotlightCaption: "Stores bile",
            },
            {
              id: "pankreas",
              x: 57,
              y: 59,
              spotlightShapes: DIGESTIVE_ORGAN_SHAPES.pankreas,
              spotlightCaption: "Makes pancreatic juice",
            },
            {
              id: "duodenum",
              x: 47,
              y: 61,
              spotlightShapes: DIGESTIVE_ORGAN_SHAPES.duodenum,
              spotlightCaption: "Bile + pancreatic juice mix in",
            },
            {
              id: "usus-besar",
              x: 33,
              y: 71,
              spotlightShapes: DIGESTIVE_ORGAN_SHAPES["usus-besar"],
              spotlightCaption: "Water reabsorbed",
            },
            {
              id: "usus-kecil",
              x: 53,
              y: 75,
              spotlightShapes: DIGESTIVE_ORGAN_SHAPES["usus-kecil"],
              spotlightCaption: "Digestion finishes; nutrients absorbed",
            },
            {
              id: "rektum",
              x: 51,
              y: 81,
              spotlightShapes: DIGESTIVE_ORGAN_SHAPES.rektum,
              spotlightCaption: "Stores faeces",
            },
            {
              id: "dubur",
              x: 49,
              y: 90,
              spotlightShapes: DIGESTIVE_ORGAN_SHAPES.dubur,
              spotlightCaption: "Faeces leave the body",
            },
          ],
        },
        title: "Structure of the Human Digestive System",
        instruction:
          "Tap a flow-of-food stage to highlight the matching organ and see what happens there. The liver, gall bladder and pancreas all feed into the duodenum — see its explanation for their roles.",
        tractLabel: "Alimentary canal",
        accessoryLabel: "Accessory Digestive Organs",
        journey: [
          "mulut",
          "esofagus",
          "perut",
          "duodenum",
          "usus-kecil",
          "usus-besar",
          "rektum",
          "dubur",
        ],
        journeyTitle: "Follow the journey of food",
        journeyInstruction: "Tap each stage in order, from mouth to anus.",
        organs: [
          {
            id: "mulut",
            label: "Mouth",
            kind: "tract",
            note: "Food is chewed and softened by saliva; salivary amylase begins digesting starch.",
            points: [
              "Food is chewed by the teeth.",
              "Food pieces are softened by saliva.",
              "Salivary amylase breaks starch into maltose.",
            ],
          },
          {
            id: "esofagus",
            label: "Oesophagus",
            kind: "tract",
            note: "Peristalsis pushes the bolus of food to the stomach.",
            points: [
              "Food entering the oesophagus is called a bolus.",
              "Peristalsis in the oesophagus pushes the bolus into the stomach.",
            ],
          },
          {
            id: "perut",
            label: "Stomach",
            kind: "tract",
            note: "Protease and hydrochloric acid turn food into chyme.",
            points: [
              "The stomach wall secretes protease and hydrochloric acid.",
              "Hydrochloric acid activates protease.",
              "Hydrochloric acid kills bacteria in food.",
              "Protease digests protein into polypeptide.",
              "Semi-liquid food in the stomach is called chyme.",
            ],
          },
          {
            id: "duodenum",
            label: "Duodenum",
            kind: "tract",
            note: "Bile and pancreatic juice are added here.",
            points: [
              "Food enters the first part of the small intestine, the duodenum.",
              "The liver produces bile.",
              "The gall bladder stores bile.",
              "Bile emulsifies fat into small droplets.",
              "Bile neutralises the acid in chyme.",
              "The pancreas produces pancreatic juice.",
              "Pancreatic juice contains amylase, protease and lipase.",
              "Pancreatic amylase digests starch into maltose.",
              "Pancreatic protease digests polypeptide into dipeptide.",
              "Pancreatic lipase digests fat into fatty acids and glycerol.",
            ],
          },
          {
            id: "usus-kecil",
            label: "Small intestine",
            kind: "tract",
            note: "Digestion is completed and nutrients are absorbed.",
            points: [
              "The small intestine completes digestion.",
              "Maltose is converted into glucose by maltase.",
              "Dipeptide is converted into amino acid.",
              "Fat is digested into fatty acids and glycerol.",
            ],
          },
          {
            id: "usus-besar",
            label: "Large intestine",
            kind: "tract",
            note: "Water and mineral salts are reabsorbed.",
            points: [
              "Undigested food enters the large intestine.",
              "Water and mineral salts are reabsorbed.",
            ],
          },
          {
            id: "rektum",
            label: "Rectum",
            kind: "tract",
            note: "Faeces are stored temporarily before removal.",
            points: [
              "Undigested food becomes faeces.",
              "Faeces are stored temporarily in the rectum.",
            ],
          },
          {
            id: "dubur",
            label: "Anus",
            kind: "tract",
            note: "Faeces are removed from the body through the anus.",
            points: ["Faeces are removed from the body through the anus."],
          },
          {
            id: "kelenjar-air-liur",
            label: "Salivary glands",
            kind: "accessory",
            connectsTo: "mulut",
            note: "Secretes saliva containing salivary amylase, which begins digesting starch into maltose while food is still in the mouth.",
          },
          {
            id: "hati",
            label: "Liver",
            kind: "accessory",
            connectsTo: "duodenum",
            note: "Produces bile, which is passed to the duodenum to emulsify fat and neutralise stomach acid.",
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
            note: "Produces pancreatic juice containing amylase, protease and lipase, released into the duodenum.",
          },
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
      title: "Enzymes and Chemical Digestion",
      intro:
        "Three main digestive enzymes act on the three food classes. Each pathway below shows the substrate, the enzyme, and the organs where it acts, from the original food to the final product.",
      reactionFlow: {
        title: "The three digestion pathways",
        instruction:
          "Each column shows one food class's full pathway in one glance — no tabs, nothing hidden.",
        columns: [
          {
            id: "carb",
            title: "Carbohydrate",
            icon: "🍚",
            steps: [
              { substrate: "Starch", enzyme: "Amylase", organs: "Salivary glands + pancreas" },
              { substrate: "Maltose", enzyme: "Maltase", organs: "Small intestine" },
            ],
            finalProduct: "Glucose",
          },
          {
            id: "protein",
            title: "Protein",
            icon: "🍗",
            steps: [
              { substrate: "Protein", enzyme: "Protease", organs: "Stomach" },
              { substrate: "Polypeptide", enzyme: "Protease", organs: "Pancreas" },
              { substrate: "Dipeptide", enzyme: "Protease", organs: "Small intestine" },
            ],
            finalProduct: "Amino acid",
          },
          {
            id: "fat",
            title: "Fat",
            icon: "🧈",
            steps: [{ substrate: "Fat", enzyme: "Lipase", organs: "Pancreas + small intestine" }],
            finalProduct: "Fatty acids + Glycerol",
          },
        ],
      },
      remember:
        "Three main digestive enzymes: amylase (starch → maltose), protease (protein → polypeptide → dipeptide → amino acid) and lipase (fat → fatty acids + glycerol). Each digests a different substrate.",
      checks: [
        {
          question: "Which organ secretes the protease that digests polypeptide into dipeptide?",
          hint: "The pancreas — acting in the duodenum.",
        },
        {
          question: "What are the two functions of hydrochloric acid in the stomach?",
          hint: "Activating protease and killing bacteria — see the Stomach stage under Human Digestive System.",
        },
      ],
    },
    {
      number: "3.4.1",
      title: "Absorption of Digested Products",
      intro:
        "Villus (singular) / villi (plural): the wall of the small intestine has millions of tiny finger-like projections called villi, which increase the surface area for absorbing digested food.",
      cards: [
        {
          title: "Many villi",
          body: "Millions of tiny projections greatly **increase the surface area** for absorption.",
        },
        {
          title: "One-cell-thick wall",
          body: "The villus wall is very thin, creating a **short diffusion distance**.",
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
        image: {
          src: villusImg,
          annotationMode: "spotlight",
          size: "compact",
          alt: "A cross-section of one villus on the wall of the small intestine, showing the blood capillaries and the lacteal inside it.",
          aspect: "4 / 3",
          caption: "Glucose and amino acids enter the blood capillaries; fatty acids and glycerol enter the lacteal.",
          points: [
            {
              id: "blood",
              x: 47,
              y: 55,
              spotlightShapes: VILLUS_SHAPES.blood,
              spotlightCaption: "Glucose + amino acids → blood",
            },
            {
              id: "lacteal",
              x: 50,
              y: 55,
              spotlightShapes: VILLUS_SHAPES.lacteal,
              spotlightCaption: "Fatty acids + glycerol → lymph",
            },
          ],
          extra: [
            {
              id: "villus",
              label: "Villus / Villi",
              x: 50,
              y: 13,
              note: "A tiny finger-like projection on the small intestine wall. Millions of villi (plural of villus) increase the surface area for absorption.",
              spotlightShapes: VILLUS_SHAPES.villus,
              spotlightCaption: "One tiny projection",
            },
            {
              id: "wall",
              label: "Thin wall",
              x: 62,
              y: 22,
              note: "The villus wall is only one cell thick. This short diffusion distance speeds up nutrient absorption.",
              spotlightShapes: VILLUS_SHAPES.wall,
              spotlightCaption: "Only one cell thick",
            },
            {
              id: "lumen",
              label: "Intestinal lumen",
              x: 16,
              y: 25,
              note: "The space inside the small intestine where digested food sits before being absorbed through the villus wall.",
              spotlightShapes: VILLUS_SHAPES.lumen,
              spotlightCaption: "Digested food waits here",
            },
            {
              id: "absorption",
              label: "Nutrient absorption",
              x: 50,
              y: 45,
              note: "Small digested molecules cross the thin villus wall into the blood capillaries or the lacteal — large, undigested particles cannot cross.",
              spotlightShapes: VILLUS_SHAPES.absorption,
              spotlightCaption: "Small molecules cross the wall",
            },
          ],
        },
        title: "Villus structure and absorption",
        instruction:
          "Small molecules produced by digestion cross the villus wall through two separate routes.",
        wallLabel: "Villus wall (one cell thick)",
        lumenLabel: "Small intestine lumen",
        pathways: [
          {
            id: "blood",
            label: "Blood capillaries",
            destination: "Blood → Liver",
            cargo: "Glucose and amino acids",
          },
          {
            id: "lacteal",
            label: "Lacteal",
            destination: "Lymphatic system, before reaching blood circulation",
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
        "In this Visking-tubing experiment, Visking tubing is used as a model of the small intestine wall to study the absorption of digested products.",
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
          body: "Boiling tube P (starch): iodine and Benedict's tests on the water remain negative at the end of the experiment — **starch molecules are too large** to pass through the Visking tubing. Boiling tube Q (glucose): Benedict's test on the water turns positive (brick-red precipitate) after 30 minutes — **glucose molecules are small enough** to diffuse out through the Visking tubing.",
        },
        {
          title: "💡 Conclusion",
          body: "Visking tubing acts as a model of the small intestine wall: small, soluble molecules like glucose can diffuse through it, but **large molecules like starch cannot**.",
        },
      ],
      viskingExperiment: {
        image: {
          src: viskingImg,
          annotationMode: "spotlight",
          size: "compact",
          alt: "Two boiling tubes of distilled water. The Visking tubing in the left tube holds starch, which stays inside; the tubing in the right tube holds glucose, which diffuses out through the membrane.",
          aspect: "3 / 2",
          caption: "Starch remains inside the Visking tubing. Glucose diffuses through the membrane into the distilled water around it.",
          points: [
            {
              id: "P",
              x: 29,
              y: 50,
              spotlightShapes: VISKING_SHAPES.P,
              spotlightCaption: "Starch stays inside — too big to cross",
            },
            {
              id: "Q",
              x: 68,
              y: 50,
              spotlightShapes: VISKING_SHAPES.Q,
              spotlightCaption: "Glucose diffuses out",
            },
          ],
          extra: [
            {
              id: "tubing",
              label: "Visking membrane",
              x: 48,
              y: 88,
              note: "A partially permeable membrane representing the small intestine wall: only small molecules can pass through it.",
              spotlightShapes: VISKING_SHAPES.tubing,
              spotlightCaption: "Partially permeable membrane",
            },
            {
              id: "water",
              label: "Distilled water",
              x: 15,
              y: 24,
              note: "The distilled water outside the tubing represents blood. Food tests are done on this water to detect what has diffused out.",
              spotlightShapes: VISKING_SHAPES.water,
              spotlightCaption: "Food tests happen here",
            },
            {
              id: "before",
              label: "Before (0 minutes)",
              x: 50,
              y: 8,
              note: "At the start, both tubes contain only their own starting substance. The water outside is still clear — no food test would be positive yet.",
            },
            {
              id: "after",
              label: "After (30 minutes)",
              x: 50,
              y: 8,
              note: "After 30 minutes, the water outside tube Q tests positive for glucose (Benedict's turns brick-red). The water outside tube P stays negative — starch never crosses the membrane.",
            },
          ],
        },
        title: "Visking-tubing experiment apparatus set-up",
        instruction:
          "Both Visking tubes are immersed in separate distilled water baths. Food tests are carried out on the water OUTSIDE the tubing, not on its contents.",
        tubes: [
          { id: "P", label: "Starch tube (P)", contents: "Visking tube + starch suspension" },
          { id: "Q", label: "Glucose tube (Q)", contents: "Visking tube + glucose solution" },
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
        "Assimilation is the process of distributing the end products of digestion for use by body cells. Getting those molecules from the villi to every cell requires three body systems to work together.",
      systemFlow: {
        title: "How three systems cooperate",
        instruction: "Follow the flow from each system down to how body cells use the nutrients.",
        systems: [
          {
            icon: "🍽️",
            label: "Digestive system",
            role: "Breaks down food into small, soluble nutrients",
          },
          {
            icon: "🩸",
            label: "Circulatory system",
            role: "Transports nutrients from the villi to body cells",
          },
          {
            icon: "🫁",
            label: "Respiratory system",
            role: "Supplies the oxygen body cells need",
          },
        ],
        convergeLabel: "Body cells",
        convergeNote: "Receive nutrients and oxygen together.",
        outcomes: [
          { label: "Glucose + oxygen", result: "→ respiration → energy" },
          { label: "Amino acids", result: "→ new cell components" },
          { label: "Fatty acids + glycerol", result: "→ stored fat: insulation + organ protection" },
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
          body: "**The solid waste** (fibre, digestive tract secretions, dead cells, water) that is not absorbed or digested.",
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
            note: "Prevention: eat **enough fibre** (fruits, vegetables, grains) and water (at least 2 litres a day).",
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
    "I can explain the food pyramid and the factors that affect calorific requirement.",
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
