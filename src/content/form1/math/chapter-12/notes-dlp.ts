import type { StructuredNotes } from "@/data/types";

export const mathF1C12NotesDLP: StructuredNotes = {
  chapterSummary:
    "Chapter 12 provides a comprehensive introduction to data handling. Students will learn to collect, organise, represent and interpret data using various methods including frequency tables, bar charts, pie charts, line graphs, dot plots, stem-and-leaf plots, histograms and frequency polygons. The chapter also discusses data dispersion, range, comparing data sets and the importance of ethical data representation.",
  quickRevision: [
    "Data: information collected for a specific purpose.",
    "4 stages: Collect → Organise → Represent → Interpret.",
    "Collection methods: interviews, observation, experiments, surveys.",
    "Categorical data: qualities/types. Numerical data: numbers (discrete/continuous).",
    "Discrete data: whole-number values (no. of children). Continuous data: measured values (height, mass).",
    "Frequency table: use tally marks to count frequencies.",
    "Range = Highest Value − Lowest Value.",
    "Bar chart: compare categories. Pie chart: show proportions.",
    "Line graph: show time trends. Dot plot: distribution of values.",
    "Histogram: grouped data (no gaps between bars). Frequency polygon: lines connecting midpoints.",
    "Stem-and-leaf plot: retains original data values.",
    "Ethical representation: consistent scales, axes starting from zero.",
  ],
  keyExamFacts: [
    "Statistical questions MUST involve variability — not questions with a single fixed answer.",
    "Discrete data: counts (whole numbers). Continuous data: measurements (can have decimals).",
    "Histogram has NO gaps between bars — that is the difference from a bar chart.",
    "Frequency polygon is constructed by connecting the midpoints of the tops of histogram bars.",
    "Range = Highest Value − Lowest Value (not the difference between frequencies).",
    "Stem-and-leaf plot: stem = tens digit, leaf = units digit.",
    "Pie chart: each sector angle = (frequency ÷ total) × 360°.",
    "Data with a smaller range → more consistent/reliable.",
    "An axis not starting from zero CAN mislead readers.",
  ],
  keyTerms: [
    "Data",
    "Frequency",
    "Categorical data",
    "Numerical data",
    "Discrete data",
    "Continuous data",
    "Frequency table",
    "Bar chart",
    "Pie chart",
    "Line graph",
    "Dot plot",
    "Stem-and-leaf plot",
    "Histogram",
    "Frequency polygon",
    "Range",
    "Dispersion",
    "Inference",
    "Prediction",
  ],
  sections: [
    {
      title: "Learning Outcomes",
      subsections: [
        {
          content: "By the end of this chapter, students should be able to:",
          bulletPoints: [
            "Explain the concept of data handling and its stages.",
            "Distinguish statistical questions from non-statistical questions.",
            "Use appropriate data collection methods.",
            "Differentiate between categorical data, discrete data and continuous data.",
            "Construct and read frequency tables.",
            "Construct and interpret bar charts, pie charts, line graphs, dot plots, stem-and-leaf plots, histograms and frequency polygons.",
            "Calculate and interpret the range as a measure of dispersion.",
            "Make inferences and predictions from data.",
            "Compare data sets using range.",
            "Explain the importance of ethical data representation.",
          ],
        },
      ],
    },
    {
      title: "1. Introduction to Data Handling",
      subsections: [
        {
          title: "What is Data Handling?",
          content:
            "Data handling is the process of collecting, organising, representing and interpreting information (data) to answer questions or make decisions. Data is information collected through observation, measurement or surveys.",
        },
        {
          title: "The Four Stages of Data Handling",
          content:
            "The data handling process occurs in 4 sequential stages:",
          bulletPoints: [
            "① Collecting Data — Gathering information through interviews, observation, experiments or surveys.",
            "② Organising Data — Arranging data in tables, lists or groups to make it easier to analyse.",
            "③ Representing Data — Displaying data visually in charts, graphs or plots.",
            "④ Interpreting Data — Analysing data representations to draw conclusions, make inferences and predictions.",
          ],
        },
        {
          title: "Importance of Data Handling",
          content:
            "Data handling is used in everyday life: doctors analyse patient data, businesspeople study sales trends, governments plan based on population data, and scientists conduct experiments based on data.",
        },
        {
          title: "Real-Life Example",
          content:
            "① A teacher wants to know students' favourite subjects → collect data through a questionnaire → organise in a table → represent in a bar chart → interpret to plan teaching.",
        },
      ],
    },
    {
      title: "2. Statistical Questions",
      subsections: [
        {
          title: "Definition of a Statistical Question",
          content:
            "A statistical question is one that requires data collection and involves variability (data that varies). It cannot be answered with a single fixed value — the answer depends on the data collected.",
        },
        {
          title: "Characteristics of Statistical Questions",
          bulletPoints: [
            "Involves collecting data from a group of people or objects.",
            "The answer varies — different people give different answers.",
            "Requires data analysis to get an overall picture.",
          ],
        },
        {
          title: "✅ Examples of Statistical Questions",
          content:
            "• 'What is the favourite subject among students in this school?' → Answers differ for each student. • 'How many siblings do students in Form 1 have?' → Data varies among students. • 'What is the mass of students in this class?' → Measurements differ for each student.",
        },
        {
          title: "❌ Non-Statistical Questions",
          content:
            "• 'What is 5 × 7?' → One fixed answer (35). No variability. • 'When did Malaysia gain independence?' → One answer (1957). • 'What is the capital city of Malaysia?' → One answer (Kuala Lumpur). These are NOT statistical questions because they don't involve data variability.",
        },
      ],
    },
    {
      title: "3. Data Collection",
      subsections: [
        {
          title: "Data Collection Methods",
          content:
            "There are four main methods for collecting data in statistics. The choice of method depends on the type of data, population size, time and cost available.",
        },
        {
          title: "Comparing Data Collection Methods",
          content:
            "Each method has its own advantages and disadvantages that must be considered before selecting the most appropriate method.",
        },
      ],
    },
    {
      title: "4. Interviews",
      subsections: [
        {
          title: "Definition of an Interview",
          content:
            "An interview is a method of collecting data through direct questioning between the data collector and a respondent. The data collector asks questions and records the respondent's answers.",
        },
        {
          title: "Characteristics of Interviews",
          bulletPoints: [
            "Direct interaction between interviewer and respondent.",
            "Can obtain deeper and more detailed information.",
            "Interviewer can ask follow-up questions for clarification.",
            "Suitable for small samples.",
            "Requires more time and effort.",
          ],
        },
        {
          title: "Example Use of Interviews",
          content:
            "Example: A shop manager wants to know customer satisfaction → individually interviews customers about service, pricing and product quality. Sociological studies about a person's life experiences.",
        },
        {
          title: "Advantages and Disadvantages",
          content:
            "✅ Advantages: In-depth information, can clarify questions, high response rate. ❌ Disadvantages: Time-consuming, high cost, difficult for large samples.",
        },
      ],
    },
    {
      title: "5. Observation",
      subsections: [
        {
          title: "Definition of Observation",
          content:
            "Observation is a method of collecting data by watching and recording events or phenomena directly without disturbing the subjects being studied.",
        },
        {
          title: "Characteristics of Observation",
          bulletPoints: [
            "Data is recorded as events occur naturally.",
            "Does not rely on respondents to self-report.",
            "Suitable for studying natural behaviour or events.",
            "Requires careful and systematic observation.",
          ],
        },
        {
          title: "Example Use of Observation",
          content:
            "Example: A nurse records the birth masses of babies delivered in one month at a hospital. A researcher observes and records the number of vehicles passing through an intersection each hour.",
        },
        {
          title: "Advantages and Disadvantages",
          content:
            "✅ Advantages: Accurate and objective data, does not influence subjects' behaviour. ❌ Disadvantages: Time-consuming, data collector may overlook something.",
        },
      ],
    },
    {
      title: "6. Experiments",
      subsections: [
        {
          title: "Definition of an Experiment",
          content:
            "An experiment is a method of collecting data through planned tests or studies designed to test a hypothesis or answer a scientific question. The researcher controls conditions to obtain reliable data.",
        },
        {
          title: "Characteristics of Experiments",
          bulletPoints: [
            "Controls variables to isolate the effect of specific factors.",
            "Uses control groups and experimental groups.",
            "Data is collected through careful measurement.",
            "Can be repeated to verify results.",
          ],
        },
        {
          title: "Example Use of Experiments",
          content:
            "Example: A battery company tests battery lifespan by switching on 50 battery units and recording how many hours each lasts before running out. Science experiment to study the growth rate of plants under different light conditions.",
        },
        {
          title: "Advantages and Disadvantages",
          content:
            "✅ Advantages: Control over variables, results can be repeated, scientific data. ❌ Disadvantages: Requires specialised equipment and environment, high cost.",
        },
      ],
    },
    {
      title: "7. Surveys",
      subsections: [
        {
          title: "Definition of a Survey",
          content:
            "A survey is a method of collecting data by distributing questionnaires or forms to a group of people (sample) representing a population. Respondents answer questions in writing or online.",
        },
        {
          title: "Characteristics of Surveys",
          bulletPoints: [
            "Suitable for collecting data from large samples.",
            "Questionnaires can be distributed in various ways: written, email, online.",
            "Respondents answer on their own without the researcher being present.",
            "More time- and cost-efficient compared to interviews.",
          ],
        },
        {
          title: "Example Use of Surveys",
          content:
            "Example: The Department of Statistics conducts a population census using survey forms. A market research company distributes questionnaires to find out consumer preferences for a new product.",
        },
        {
          title: "Advantages and Disadvantages",
          content:
            "✅ Advantages: Can accommodate large samples, low cost, easy to analyse. ❌ Disadvantages: Response rate may be low, respondents may not be honest.",
        },
      ],
    },
    {
      title: "8. Categorical Data",
      subsections: [
        {
          title: "Definition of Categorical Data",
          content:
            "Categorical data (also known as qualitative data) is data that describes qualities, characteristics or groups. This type of data does not involve numerical measurement and cannot be added or subtracted meaningfully.",
        },
        {
          title: "Characteristics of Categorical Data",
          bulletPoints: [
            "Represents qualities or categories, not quantities.",
            "Cannot be added, subtracted or multiplied.",
            "The number of members in each category can be counted.",
            "Example categories: type, colour, gender, ethnicity.",
          ],
        },
        {
          title: "Examples of Categorical Data",
          content:
            "• Blood group: A, B, AB, O → categories, not numbers. • Car colour: red, blue, white, black. • Students' hobbies: reading, drawing, sports, cooking. • Gender: male, female. • Ethnicity: Malay, Chinese, Indian, others.",
        },
        {
          title: "Best Representation",
          content:
            "Categorical data is best represented using bar charts or pie charts, as both types can clearly show the count or proportion in each category.",
        },
      ],
    },
    {
      title: "9. Numerical Data",
      subsections: [
        {
          title: "Definition of Numerical Data",
          content:
            "Numerical data (also known as quantitative data) is data that involves numbers and can be measured or counted. This type of data can be added, subtracted, multiplied and divided meaningfully to obtain useful information.",
        },
        {
          title: "Two Types of Numerical Data",
          content:
            "Numerical data is divided into two main types: discrete data and continuous data. The key difference is the type of values they can take.",
        },
        {
          title: "Comparison: Discrete Data vs Continuous Data",
          content:
            "Discrete Data — Whole number values only. Can be counted one by one. Examples: number of students, number of books. | Continuous Data — Any value within a range, including decimals. Examples: height, mass, temperature, time.",
        },
      ],
    },
    {
      title: "10. Discrete Data",
      subsections: [
        {
          title: "Definition of Discrete Data",
          content:
            "Discrete data is numerical data that can only take specific whole number values (that can be counted separately). There are no values between two consecutive values.",
        },
        {
          title: "Characteristics of Discrete Data",
          bulletPoints: [
            "Values are always whole numbers (0, 1, 2, 3, ...).",
            "Can be counted one by one — has clear endpoints.",
            "Cannot have in-between values, e.g. there cannot be 2.5 people.",
            "Usually the result of counting.",
          ],
        },
        {
          title: "Examples of Discrete Data",
          content:
            "• Number of children in a family: 0, 1, 2, 3, ... (cannot have 1.7 children) • Number of books in a bag: 3, 4, 5, ... • Number of cars in a car park: 0, 1, 2, ... • Number of questions in a test: 10, 20, 25, ... • Number of goals in a football match",
        },
        {
          title: "Best Representation",
          content:
            "Discrete data is best represented using bar charts, frequency tables or dot plots. Histograms are NOT suitable for discrete data as histograms are designed for grouped/continuous data.",
        },
      ],
    },
    {
      title: "11. Continuous Data",
      subsections: [
        {
          title: "Definition of Continuous Data",
          content:
            "Continuous data is numerical data that can take any value within a range, including decimal values. This data is obtained through measurement and always depends on the precision of the measuring instrument.",
        },
        {
          title: "Characteristics of Continuous Data",
          bulletPoints: [
            "Can take any value within a range.",
            "Obtained through measurement (not counting).",
            "Depends on the precision of the measuring instrument.",
            "Can have decimal values between two values.",
          ],
        },
        {
          title: "Examples of Continuous Data",
          content:
            "• Students' heights: 152.3 cm, 160.5 cm, 148.7 cm • Babies' masses: 3.2 kg, 2.9 kg, 4.1 kg • Room temperature: 26.5°C, 28.3°C • Time to run 100m: 12.45 seconds, 11.87 seconds • Volume of liquid: 250.6 mL",
        },
        {
          title: "Key Difference: Discrete vs Continuous",
          content:
            "Guiding question: 'Can this value have a decimal in real life?' If YES → continuous data. If NO → discrete data. Example: Height of 162.4 cm ✓ (continuous). 1.5 people ✗ (discrete = whole numbers only).",
        },
        {
          title: "Best Representation",
          content:
            "Continuous data is best represented using histograms (for grouped data) or line graphs. Histograms use classes such as '150–155 cm' to group continuous data.",
        },
      ],
    },
    {
      title: "12. Frequency Tables",
      subsections: [
        {
          title: "Definition of a Frequency Table",
          content:
            "A frequency table is a table that organises data by showing each value (or class of values) along with the number of times it occurs (frequency). It makes it easier to analyse large amounts of data.",
        },
        {
          title: "Components of a Frequency Table",
          bulletPoints: [
            "Value/Class Column — List each different value or range of values.",
            "Tally Column — Use tally marks (|) to count each occurrence. Every five tallies are grouped: ⟨IIII⟩.",
            "Frequency Column — Total count for each value or class.",
            "Total Frequency — Add all frequencies = total number of data.",
          ],
        },
        {
          title: "Example: Constructing a Frequency Table",
          content:
            "Raw data — number of siblings for 15 students: 2, 3, 1, 2, 4, 3, 2, 1, 0, 2, 3, 1, 2, 4, 0\n\nFrequency Table:\n┌────────────────┬────────────┬───────────┐\n│ No. of Siblings│   Tally    │ Frequency │\n├────────────────┼────────────┼───────────┤\n│       0        │    ||      │     2     │\n│       1        │   |||      │     3     │\n│       2        │  IIII|     │     5     │\n│       3        │   |||      │     3     │\n│       4        │    ||      │     2     │\n├────────────────┼────────────┼───────────┤\n│     Total      │            │    15     │\n└────────────────┴────────────┴───────────┘",
        },
        {
          title: "Grouped Frequency Table",
          content:
            "When data has a large range, data is grouped into classes. Each class has the same width.\n\nExample: Marks of 40 students\n┌──────────┬───────────┐\n│  Marks   │ Frequency │\n├──────────┼───────────┤\n│  41–50   │     3     │\n│  51–60   │     8     │\n│  61–70   │    12     │\n│  71–80   │    10     │\n│  81–90   │     7     │\n├──────────┼───────────┤\n│  Total   │    40     │\n└──────────┴───────────┘\nClass width = 10 marks",
        },
        {
          title: "Importance of Frequency Tables",
          content:
            "Frequency tables help us quickly see patterns in data, identify the most frequently occurring value (mode), prepare data for constructing charts and graphs, and compare frequencies between different values.",
        },
      ],
    },
    {
      title: "13. Bar Charts",
      subsections: [
        {
          title: "What is a Bar Chart?",
          content:
            "A bar chart uses vertical or horizontal bars to represent data. The length or height of each bar shows the frequency or value for each category.",
        },
        {
          title: "Purpose of Bar Charts",
          content:
            "Bar charts are used to compare categorical or discrete data. They allow quick visual comparison between different values.",
        },
        {
          title: "Example Bar Chart: Favourite Subject",
          content:
            "Data: Favourite Subject of 40 Students\n\nMalay Language : ████████ 8\nMathematics    : ████████████ 12\nScience        : ██████████ 10\nHistory        : ██████ 6\nGeography      : ████ 4\n\n(x-axis: Subject, y-axis: Number of Students)\nNote: Each bar has the SAME width and there are GAPS between bars.",
        },
        {
          title: "How to Read a Bar Chart",
          bulletPoints: [
            "Read the chart title to understand what is represented.",
            "Read the y-axis (vertical) for frequency values.",
            "Read the x-axis (horizontal) for categories.",
            "Compare bar heights for visual comparison.",
            "Note the scale on the y-axis.",
          ],
        },
        {
          title: "Difference: Bar Chart vs Histogram",
          content:
            "Bar Chart: Has GAPS between bars, used for categorical or discrete data. | Histogram: NO gaps between bars, used for grouped/continuous data.",
        },
      ],
    },
    {
      title: "14. Pie Charts",
      subsections: [
        {
          title: "What is a Pie Chart?",
          content:
            "A pie chart is a circle divided into sectors that represent the proportion of each category from the whole data. The entire circle represents 100% or the total of all data.",
        },
        {
          title: "Purpose of Pie Charts",
          content:
            "Pie charts are used to show the proportion or percentage of each part from the whole. They are best used when there are few categories (2–6 categories).",
        },
        {
          title: "Sector Angle Formula",
          content:
            "Sector Angle = (Frequency ÷ Total Frequency) × 360°\n\nExample: 40 students choose 4 activities:\n• Sports: 16 students → (16÷40) × 360° = 144°\n• Music: 10 students → (10÷40) × 360° = 90°\n• Drawing: 8 students → (8÷40) × 360° = 72°\n• Reading: 6 students → (6÷40) × 360° = 54°\nTotal: 144° + 90° + 72° + 54° = 360° ✓",
        },
        {
          title: "Percentages in Pie Charts",
          content:
            "Percentage = (Frequency ÷ Total) × 100%\n\nFrom the example above:\n• Sports: (16÷40) × 100% = 40%\n• Music: (10÷40) × 100% = 25%\n• Drawing: (8÷40) × 100% = 20%\n• Reading: (6÷40) × 100% = 15%\nTotal: 40% + 25% + 20% + 15% = 100% ✓",
        },
        {
          title: "How to Read a Pie Chart",
          bulletPoints: [
            "A larger sector represents a larger proportion.",
            "Compare sector sizes for relative comparison.",
            "Check labels or the legend for category names.",
            "Percentages or values are often labelled in each sector.",
          ],
        },
      ],
    },
    {
      title: "15. Line Graphs",
      subsections: [
        {
          title: "What is a Line Graph?",
          content:
            "A line graph uses points connected by straight lines to show how data changes over time or in sequence. The x-axis usually represents time or sequence.",
        },
        {
          title: "Purpose of Line Graphs",
          content:
            "Line graphs are best for showing trends, patterns and changes in data over time. They allow us to see whether data is increasing, decreasing or remaining stable.",
        },
        {
          title: "Example Line Graph: Daily Temperature",
          content:
            "Temperature (°C) in a city over 5 days:\n\n  35 |        ●\n  33 |    ●       ●\n  31 |●\n  29 |                ●\n  27 |                    ●\n  25 +----+----+----+----+----\n     Mon  Tue  Wed  Thu  Fri\n\nThe line shows a temperature trend: rising from Monday to Wednesday, then falling to Friday.",
        },
        {
          title: "How to Read a Line Graph",
          bulletPoints: [
            "Upward slope → values increasing.",
            "Downward slope → values decreasing.",
            "Horizontal line → values stable/unchanged.",
            "Note the y-axis scale for accurate values.",
            "Highest/lowest points show maximum/minimum values.",
          ],
        },
        {
          title: "Positive vs Negative Trends",
          content:
            "Positive trend: line slopes upward to the right — data increasing over time. Example: growth in sales from January to December. | Negative trend: line slopes downward to the right — data decreasing. Example: decline in crime rate over the years.",
        },
      ],
    },
    {
      title: "16. Dot Plots",
      subsections: [
        {
          title: "What is a Dot Plot?",
          content:
            "A dot plot is a chart that uses dots above a number line to show the distribution of data. Each dot represents one observation or data value.",
        },
        {
          title: "Purpose of Dot Plots",
          content:
            "Dot plots are used to show the distribution of small data sets (up to 30 values), identify clusters of data, gaps in data, and outliers.",
        },
        {
          title: "Example Dot Plot: Quiz Marks",
          content:
            "Marks of 15 students in a quiz (out of 10): 4, 5, 6, 6, 7, 7, 7, 8, 8, 8, 8, 9, 9, 10, 10\n\n   •\n  ••       ••\n  ••• ••• •••\n+--+--+--+--+--+--+--+\n4  5  6  7  8  9  10\n\nWe can see: most students scored 7 and 8. A score of 4 is an outlier.",
        },
        {
          title: "Outliers",
          content:
            "An outlier is a data value that differs greatly from the other values in a data set. In a dot plot, outliers appear isolated from the main cluster of dots. Outliers may indicate measurement errors or unusual values.",
        },
        {
          title: "Advantages of Dot Plots",
          bulletPoints: [
            "Easy to construct and read.",
            "Retains all original data values.",
            "Clearly shows data clusters and outliers.",
            "Suitable for small to medium data sets.",
          ],
        },
      ],
    },
    {
      title: "17. Stem-and-Leaf Plots",
      subsections: [
        {
          title: "What is a Stem-and-Leaf Plot?",
          content:
            "A stem-and-leaf plot is a method of representing data that separates each value into two parts: the stem (leading digit) and the leaf (last digit). It retains all original data values.",
        },
        {
          title: "Structure of a Stem-and-Leaf Plot",
          bulletPoints: [
            "Stem — Usually the tens digit (or hundreds for larger data).",
            "Leaf — Usually the units digit.",
            "A vertical line separates the stem and leaf.",
            "Leaves are arranged in ascending order on each row.",
          ],
        },
        {
          title: "Example: Constructing a Stem-and-Leaf Plot",
          content:
            "Data: Students' marks: 23, 35, 27, 41, 38, 52, 29, 33, 45, 31, 46, 39, 25, 48, 34\n\nStep 1: Identify stems (tens): 2, 3, 4, 5\nStep 2: Arrange leaves by stem:\n\nStem | Leaf\n  2  | 3 5 7 9\n  3  | 1 3 4 5 8 9\n  4  | 1 5 6 8\n  5  | 2\n\nKey: 2 | 3 = 23",
        },
        {
          title: "How to Read a Stem-and-Leaf Plot",
          content:
            "To get the original value: combine stem and leaf. Example: Stem '4' + Leaf '5' = value 45. | Number of leaves on each row = number of values in that range. | Data range can be seen from the first to the last row.",
        },
        {
          title: "Advantages of Stem-and-Leaf Plots",
          bulletPoints: [
            "Retains original data values (unlike histograms that group data).",
            "Easy to see data distribution.",
            "Can compare two data sets using a back-to-back stem-and-leaf plot.",
            "Range and median are easy to identify.",
          ],
        },
      ],
    },
    {
      title: "18. Histograms",
      subsections: [
        {
          title: "What is a Histogram?",
          content:
            "A histogram is a graphical representation of continuous or grouped data using adjacent rectangular bars (with no gaps between bars). Each bar represents one class or interval of values.",
        },
        {
          title: "Key Difference: Histogram vs Bar Chart",
          content:
            "Histogram: NO gaps between bars, used for continuous/grouped data, x-axis shows continuous value ranges. | Bar Chart: HAS gaps between bars, used for discrete/categorical data, x-axis shows separate categories.",
        },
        {
          title: "Example Histogram: Students' Heights",
          content:
            "Data: Heights of 40 students (in cm)\n\n12 |    ████\n10 | ████████\n 8 | ██████████████\n 6 | ████████████\n 4 | ████████\n 2 | ████\n   +----+----+----+----+----+----\n   145  150  155  160  165  170\n            Height (cm)\n\nClasses: 145≤h<150, 150≤h<155, 155≤h<160, 160≤h<165, 165≤h<170\nNote: NO gaps between bars.",
        },
        {
          title: "Reading a Histogram",
          bulletPoints: [
            "The x-axis shows class boundaries (continuous values).",
            "The y-axis shows the frequency of each class.",
            "The width of each bar = class width (usually equal).",
            "The height of the bar = frequency of that class.",
            "Total area of all bars is proportional to total data.",
          ],
        },
        {
          title: "Interpreting the Shape of a Histogram",
          content:
            "• Bell-shaped (symmetric): data concentrated in the middle — normal. • Right-skewed: most data is low, with rare high values. • Left-skewed: most data is high, with rare low values. • Uniform: frequency is roughly equal for all classes.",
        },
      ],
    },
    {
      title: "19. Frequency Polygons",
      subsections: [
        {
          title: "What is a Frequency Polygon?",
          content:
            "A frequency polygon is a line graph constructed by connecting the midpoints of the tops of histogram bars. It provides a visual representation of the shape of the distribution of grouped data.",
        },
        {
          title: "How to Construct a Frequency Polygon",
          bulletPoints: [
            "Step 1: Construct a histogram for the grouped data.",
            "Step 2: Find the midpoint of each class. Midpoint = (lower bound + upper bound) ÷ 2",
            "Step 3: Plot a point above each class midpoint at the height equal to the class frequency.",
            "Step 4: Connect all the points with straight lines.",
            "Step 5: Extend the line to the x-axis at both ends (at empty classes outside the data range).",
          ],
        },
        {
          title: "Example: Constructing a Frequency Polygon",
          content:
            "Classes and frequencies for test marks:\n┌──────────┬───────────┬───────────┐\n│  Class   │ Frequency │  Midpoint │\n├──────────┼───────────┼───────────┤\n│  41–50   │     3     │   45.5    │\n│  51–60   │     8     │   55.5    │\n│  61–70   │    12     │   65.5    │\n│  71–80   │    10     │   75.5    │\n│  81–90   │     7     │   85.5    │\n└──────────┴───────────┴───────────┘\n\nPlot points: (45.5, 3), (55.5, 8), (65.5, 12), (75.5, 10), (85.5, 7)\nConnect with straight lines.",
        },
        {
          title: "Uses of Frequency Polygons",
          content:
            "Frequency polygons are useful for comparing two or more grouped data sets on the same graph, viewing the overall trend in the data distribution, and identifying the most frequently occurring value (modal class).",
        },
      ],
    },
    {
      title: "20. Data Interpretation",
      subsections: [
        {
          title: "What is Data Interpretation?",
          content:
            "Data interpretation is the process of analysing and understanding information presented through charts, graphs, tables or plots. It involves accurately reading values, making comparisons and drawing conclusions.",
        },
        {
          title: "Steps in Interpreting Data",
          bulletPoints: [
            "① Read the chart/graph title to understand what is represented.",
            "② Understand the x-axis and y-axis (units, scale, labels).",
            "③ Read values accurately using the scale.",
            "④ Identify the highest, lowest values and general patterns.",
            "⑤ Make comparisons between different values.",
            "⑥ Draw conclusions based on the data.",
          ],
        },
        {
          title: "What Can Be Identified",
          bulletPoints: [
            "Highest and lowest values.",
            "Most and least frequent categories or time periods.",
            "Grand total of all values.",
            "Difference between two values or categories.",
            "Trends (tendency to increase, decrease or remain stable).",
            "Patterns (cycles, seasons, recurring patterns).",
          ],
        },
        {
          title: "Interpretation Example",
          content:
            "From a bar chart showing the favourite subjects of 40 students (Mathematics: 12, Science: 10, Malay: 8, History: 6, Geography: 4):\n• Most popular subject: Mathematics (12 students)\n• Least popular subject: Geography (4 students)\n• Difference between most and least popular: 12 − 4 = 8 students\n• More than half the students prefer Mathematics or Science: 12 + 10 = 22 > 20",
        },
      ],
    },
    {
      title: "21. Making Inferences",
      subsections: [
        {
          title: "What is an Inference?",
          content:
            "An inference is a logical conclusion drawn from available data. It goes beyond simply reading values — we use data to make more general statements or explain why a certain pattern occurs.",
        },
        {
          title: "Difference: Reading vs Inference",
          content:
            "Direct reading: 'In January, 15 students attended.' — this is a fact directly from the data. | Inference: 'Student attendance increased throughout the year, possibly due to the motivation programme implemented in April.' — this involves interpretation and explanation.",
        },
        {
          title: "Example of Making Inferences",
          content:
            "Data: A student's test marks increased from 60 to 75 to 85 in three consecutive tests.\n\nReading: Marks increased by 15 points from test 1 to test 2, and 10 points from test 2 to test 3.\n\nInference: This student shows consistent improvement, possibly due to stronger study effort or better study techniques.",
        },
        {
          title: "Guidelines for Making Good Inferences",
          bulletPoints: [
            "Support inferences with evidence from data.",
            "Use phrases such as 'possibly', 'likely', 'suggests that'.",
            "Avoid drawing conclusions too far beyond the available data.",
            "Consider other factors that may influence the data.",
          ],
        },
      ],
    },
    {
      title: "22. Making Predictions",
      subsections: [
        {
          title: "What is a Prediction?",
          content:
            "A prediction is an expectation about a future value or event based on patterns or trends in existing data. Predictions are made by extending the patterns seen in data.",
        },
        {
          title: "Basis for Making Predictions",
          bulletPoints: [
            "Identify trends or patterns in data (increasing, decreasing, cyclical).",
            "Assume this trend will continue.",
            "Extend the trend line forward.",
            "State clearly that this is a prediction, not a fact.",
          ],
        },
        {
          title: "Example of Making Predictions",
          content:
            "Data showing total visitors to a museum (in thousands):\n• 2021: 45\n• 2022: 52\n• 2023: 58\n• 2024: 65\n\nPattern: An increase of approximately 7 thousand visitors each year.\n\nPrediction for 2025: 65 + 7 ≈ 72 thousand visitors.\n\nNote: This is a prediction only — the actual situation may differ.",
        },
        {
          title: "Limitations of Predictions",
          content:
            "Predictions depend on the assumption that past trends will continue. However, various factors can alter trends: economic changes, natural disasters, policy changes and so on. The further the prediction, the more uncertain its accuracy.",
        },
      ],
    },
    {
      title: "23. Data Dispersion",
      subsections: [
        {
          title: "What is Data Dispersion?",
          content:
            "Data dispersion (also known as data spread) is a measure of how spread out or varied the values in a data set are from one another. A data set with small dispersion means the values are close together and consistent.",
        },
        {
          title: "Importance of Data Dispersion",
          content:
            "Data dispersion is important because it reflects the reliability and consistency of data. Two data sets can have the same average but very different dispersions, giving a different picture of the data.",
        },
        {
          title: "Example of the Importance of Dispersion",
          content:
            "Factory A produces pipes with diameters: 49.8, 50.0, 50.1, 50.2, 50.0 cm (small dispersion — consistent). Factory B produces pipes with diameters: 48.0, 50.0, 52.0, 49.0, 51.0 cm (large dispersion — inconsistent). Although the average of both factories is 50.0 cm, Factory A is more reliable.",
        },
        {
          title: "Measure of Dispersion in Form 1",
          content:
            "At Form 1 level, we learn one simple measure of dispersion: Range. Other measures of dispersion such as variance and standard deviation will be studied at higher levels.",
        },
      ],
    },
    {
      title: "24. Range",
      subsections: [
        {
          title: "Definition of Range",
          content:
            "The range is the difference between the highest and lowest values in a data set. It is the simplest measure of dispersion to calculate.",
        },
        {
          title: "Range Formula",
          content:
            "╔════════════════════════════════════════╗\n║  Range = Highest Value − Lowest Value  ║\n╚════════════════════════════════════════╝",
        },
        {
          title: "Example 1: Calculating Range",
          content:
            "Students' test marks: 45, 62, 78, 55, 90, 38, 71, 83\n\nHighest value = 90\nLowest value = 38\nRange = 90 − 38 = 52 marks\n\nInterpretation: Students' marks are spread over a range of 52 marks.",
        },
        {
          title: "Example 2: Comparing Ranges",
          content:
            "Group A — 100m running time (seconds): 12.1, 12.3, 12.2, 12.5, 12.4\nRange A = 12.5 − 12.1 = 0.4 seconds\n\nGroup B — 100m running time (seconds): 11.8, 12.9, 12.2, 13.1, 11.5\nRange B = 13.1 − 11.5 = 1.6 seconds\n\nConclusion: Group A is more consistent (smaller range).",
        },
        {
          title: "Interpreting Range",
          bulletPoints: [
            "Small range → data is close/consistent/less spread out.",
            "Large range → data is spread out/inconsistent/more dispersed.",
            "Range gives an overall picture of spread but does not describe the distribution of middle values.",
            "Range is affected by outliers (unusually extreme values).",
          ],
        },
      ],
    },
    {
      title: "25. Comparing Data Sets",
      subsections: [
        {
          title: "Why Compare Data?",
          content:
            "Comparing data allows us to make more accurate decisions, evaluate performance, identify strengths and weaknesses, and choose between different options based on evidence.",
        },
        {
          title: "Methods of Comparing Data",
          bulletPoints: [
            "Comparing highest and lowest frequencies.",
            "Comparing the total of two data sets.",
            "Using range to compare dispersion.",
            "Comparing the visual representation of two data sets.",
          ],
        },
        {
          title: "Example: Comparing Two Classes' Performance",
          content:
            "Mathematics Test Marks:\n\nClass 1F:\nMean = 72, Range = 85 − 55 = 30\n\nClass 1G:\nMean = 72, Range = 92 − 48 = 44\n\nAlthough both classes have the same average (72), Class 1F is more consistent (range = 30) compared to Class 1G (range = 44).",
        },
        {
          title: "Comparison Principle",
          content:
            "Data with a smaller range is more consistent and generally more reliable. However, a complete data comparison requires more than one measure — also consider the average, distribution pattern and sample size.",
        },
      ],
    },
    {
      title: "26. Ethical Data Representation",
      subsections: [
        {
          title: "What is Ethical Data Representation?",
          content:
            "Ethical data representation means presenting data honestly, accurately and without misleading readers. Data can be intentionally or unintentionally presented in ways that confuse or mislead.",
        },
        {
          title: "✅ Best Practices (Ethical)",
          bulletPoints: [
            "✅ Use consistent and non-misleading scales.",
            "✅ Start axes from zero (unless there is a strong reason).",
            "✅ Clearly label all axes, titles and units.",
            "✅ Use accurate and truthful values.",
            "✅ State the data source.",
            "✅ Use an adequate and representative sample size.",
          ],
        },
        {
          title: "❌ Unethical Practices",
          bulletPoints: [
            "❌ Starting the y-axis from a non-zero value to 'exaggerate' differences.",
            "❌ Using different scales for axes in charts being compared.",
            "❌ Selecting only data that supports the argument, ignoring contradictory data.",
            "❌ Using 3D shapes that distort actual proportions.",
            "❌ Portraying small differences as large through scale manipulation.",
          ],
        },
        {
          title: "Example of a Misleading Graph",
          content:
            "Graph A (y-axis starts from 0): Sales 2023 = 100 units, Sales 2024 = 110 units → bars appear roughly the same height → accurate picture.\n\nGraph B (y-axis starts from 95): Sales 2023 = 100, Sales 2024 = 110 → the 2024 bar appears TWICE as tall as the 2023 bar → very misleading!\n\nThe actual difference is only 10% but appears to be 100%.",
        },
        {
          title: "Responsibility of Data Users",
          content:
            "As data users, we must always check the scale of charts before drawing conclusions, question data sources, verify whether graphs start from zero, and be wary of how data is presented in the media.",
        },
      ],
    },
    {
      title: "27. Chapter Summary",
      subsections: [
        {
          title: "Mind Map: Data Handling",
          content:
            "DATA HANDLING\n├── Collection: Interviews | Observation | Experiments | Surveys\n├── Types of Data\n│   ├── Categorical (qualities/types)\n│   └── Numerical\n│       ├── Discrete (whole numbers)\n│       └── Continuous (measured values)\n├── Representation\n│   ├── Frequency table\n│   ├── Bar chart (categorical/discrete)\n│   ├── Pie chart (proportions)\n│   ├── Line graph (time trends)\n│   ├── Dot plot (small distribution)\n│   ├── Stem-and-leaf plot (original values)\n│   ├── Histogram (grouped/continuous)\n│   └── Frequency polygon (distribution shape)\n├── Interpretation: Inferences | Predictions\n├── Dispersion: Range = Highest − Lowest\n└── Ethics: Consistent scales, axes from 0",
        },
        {
          title: "Important Formulae",
          bulletPoints: [
            "Range = Highest Value − Lowest Value",
            "Pie Chart Sector Angle = (Frequency ÷ Total) × 360°",
            "Percentage = (Frequency ÷ Total) × 100%",
            "Class Midpoint = (Lower Boundary + Upper Boundary) ÷ 2",
          ],
        },
        {
          title: "Guide for Choosing Data Representation",
          content:
            "• Categorical data → Bar chart or Pie chart\n• Discrete data (small set) → Dot plot or Bar chart\n• Time trends → Line graph\n• Grouped/continuous data → Histogram\n• Original values need to be retained → Stem-and-leaf plot\n• Comparing distributions → Frequency polygon",
        },
        {
          title: "Key Interpretation Words",
          bulletPoints: [
            "'most frequent' → value with highest frequency",
            "'least frequent' → value with lowest frequency",
            "'increasing' → y-axis values rising from left to right",
            "'decreasing' → y-axis values falling from left to right",
            "'difference' → subtract the smaller from the larger value",
            "'total' → add all relevant values",
          ],
        },
      ],
    },
  ],
};
