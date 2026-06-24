import type { MindNode } from "@/components/MindMap";

export const scienceF2C3MindMapDLP: MindNode = {
  id: "root",
  label: "Nutrition",
  children: [
    {
      id: "c1",
      label: "3.1 Classes of Food",
      children: [
        {
          id: "c1-1",
          label: "Carbohydrate",
          children: [
            { id: "c1-1-1", label: "Function: energy source (starch, glycogen, cellulose)" },
            { id: "c1-1-2", label: "Source: rice, banana, potato, honey, bread, sugar" },
          ],
        },
        {
          id: "c1-2",
          label: "Protein",
          children: [
            { id: "c1-2-1", label: "Function: growth, repair tissue, synthesise enzymes/hormones" },
            { id: "c1-2-2", label: "Source: chicken, seafood, egg, nuts" },
            { id: "c1-2-3", label: "Deficiency: Kwashiorkor (children aged 1-3)" },
          ],
        },
        {
          id: "c1-3",
          label: "Fat",
          children: [
            { id: "c1-3-1", label: "2× energy of carbohydrate; protects organs; heat insulator" },
            { id: "c1-3-2", label: "Source: butter, palm oil, groundnuts" },
          ],
        },
        {
          id: "c1-4",
          label: "Vitamin (A,B,C,D,E,K)",
          children: [
            { id: "c1-4-1", label: "Water-soluble: B (Beri-beri/Anaemia), C (Scurvy)" },
            { id: "c1-4-2", label: "Fat-soluble: A (night blindness), D (Rickets), E (sterility), K (bleeding)" },
          ],
        },
        {
          id: "c1-5",
          label: "Mineral",
          children: [
            { id: "c1-5-1", label: "Calcium (Rickets), Iron (Anaemia), Iodine (Goiter)" },
            { id: "c1-5-2", label: "Phosphorus (DNA/RNA), Sodium & Potassium (nerves/muscle)" },
          ],
        },
        { id: "c1-6", label: "Fibre: cellulose, stimulates peristalsis, prevents constipation" },
        { id: "c1-7", label: "Water: solvent, transportation, regulates body temperature (2L/day)" },
        {
          id: "c1-8",
          label: "Food Tests",
          children: [
            { id: "c1-8-1", label: "Iodine: starch → blue-black" },
            { id: "c1-8-2", label: "Benedict's: sugar → green/yellow/brick-red" },
            { id: "c1-8-3", label: "Millon's: protein → brick-red" },
            { id: "c1-8-4", label: "Alcohol-emulsion: fat → cloudy white emulsion" },
          ],
        },
      ],
    },
    {
      id: "c2",
      label: "3.2 Balanced Diet",
      children: [
        { id: "c2-1", label: "Food Pyramid: base (rice/grains) to tip (fat/sugar)" },
        {
          id: "c2-2",
          label: "Factors Affecting Calorific Requirement",
          children: [
            { id: "c2-2-1", label: "Health, climate, work" },
            { id: "c2-2-2", label: "Gender, body size, age" },
          ],
        },
        {
          id: "c2-3",
          label: "Calorific Value",
          children: [
            { id: "c2-3-1", label: "Fat: 37 kJ/g (9 kcal/g)" },
            { id: "c2-3-2", label: "Protein & Carbohydrate: 17 kJ/g (4 kcal/g)" },
            { id: "c2-3-3", label: "1 cal = 4.2 J; 1 kcal = 4.2 kJ" },
          ],
        },
        { id: "c2-4", label: "BMI = Mass (kg) ÷ [Height (m)]²" },
        {
          id: "c2-5",
          label: "Healthy Eating Practices",
          children: [
            { id: "c2-5-1", label: "NHMS 2016: diabetes 17.5%, obesity 17%, overweight 40%" },
            { id: "c2-5-2", label: "Eat Fruits and Vegetables Campaign; healthy lifestyle" },
            { id: "c2-5-3", label: "Other issues: obesity, malnutrition (brief mention)" },
          ],
        },
      ],
    },
    {
      id: "c3",
      label: "3.3 Digestive System",
      children: [
        { id: "c3-1", label: "Physical digestion (mouth, no enzymes) vs chemical (enzymes)" },
        {
          id: "c3-2",
          label: "Organ Order",
          children: [
            { id: "c3-2-1", label: "Mouth → Oesophagus → Stomach → Duodenum" },
            { id: "c3-2-2", label: "Small intestine → Large intestine → Rectum → Anus" },
          ],
        },
        {
          id: "c3-3",
          label: "Digestive Enzymes",
          children: [
            { id: "c3-3-1", label: "Amylase: starch → maltose" },
            { id: "c3-3-2", label: "Stomach protease: protein → polypeptide" },
            { id: "c3-3-3", label: "Pancreatic protease: polypeptide → dipeptide" },
            { id: "c3-3-4", label: "Maltase: maltose → glucose" },
            { id: "c3-3-5", label: "Small intestine protease: dipeptide → amino acid" },
            { id: "c3-3-6", label: "Lipase: fat → fatty acid + glycerol" },
          ],
        },
        { id: "c3-4", label: "Bile: emulsifies fat, neutralises acid (not an enzyme)" },
      ],
    },
    {
      id: "c4",
      label: "3.4 Absorption & Defecation",
      children: [
        { id: "c4-1", label: "Villi: increase surface area, one-cell thick wall" },
        { id: "c4-2", label: "Lacteal: absorbs fat into lymphatic system" },
        {
          id: "c4-3",
          label: "Assimilation",
          children: [
            { id: "c4-3-1", label: "Glucose → energy" },
            { id: "c4-3-2", label: "Amino acid → cell components" },
            { id: "c4-3-3", label: "Fatty acid + glycerol → fat" },
          ],
        },
        { id: "c4-4", label: "Defecation: water & minerals reabsorbed in large intestine, faeces eliminated via anus" },
      ],
    },
  ],
};
