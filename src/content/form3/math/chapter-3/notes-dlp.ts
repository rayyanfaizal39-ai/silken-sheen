import type { StructuredNotes } from "@/data/types";

export const mathF3C3NotesDLP: StructuredNotes = {
  chapterSummary:
    "Chapter 3 Consumer Mathematics: Savings and Investment, Credit and Debt helps students recognise types of savings and investment, calculate simple interest and compound interest, calculate return on investment (ROI), compare risk-return-liquidity, understand the dollar-cost averaging strategy, and manage credit and debt wisely including loan repayment and instalment calculations.",
  quickRevision: [
    "Simple interest: I = Prt, where P=principal, r=interest rate, t=term in years.",
    "Compound interest maturity value: MV = P(1 + r/n)^(nt), where n=compounding frequency per year.",
    "Return on investment (ROI) = (Total return / cost of investment) x 100%.",
    "For flat-rate loans: A = P + Prt; monthly instalment = A / number of months.",
    "For reducing balance interest, monthly interest is recalculated based on the current loan balance after each instalment.",
    "Dollar-cost averaging: number of units = total investment / unit price, accumulated monthly.",
  ],
  keyExamFacts: [
    "Simple interest: I = Prt.",
    "Compound interest: MV = P(1 + r/n)^(nt).",
    "ROI = (Total return ÷ cost of investment) x 100%.",
    "Flat-rate loan: A = P + Prt; monthly instalment = A ÷ number of months.",
    "Reducing balance interest is recalculated monthly based on the current balance.",
    "Three investment factors: risk potential, level of return, liquidity aspect.",
  ],
  keyTerms: ["savings", "investment", "simple interest", "compound interest", "ROI", "credit", "debt", "instalment", "liquidity"],
  sections: [
    {
      title: "Learning Outcomes",
      subsections: [
        {
          content: "By the end of this chapter, students should be able to:",
          bulletPoints: [
            "Recognise various types of savings and investment.",
            "Calculate simple interest and compound interest for savings.",
            "Calculate return on investment (ROI) and the factors that affect it.",
            "Compare and contrast the risk, return and liquidity of various types of savings and investment.",
            "Calculate the average cost per unit using the dollar-cost averaging strategy.",
            "Solve problems involving savings and investment.",
            "Explain the meaning of credit and debt and their wise management.",
            "Calculate loan repayment and monthly instalments.",
          ],
        },
      ],
    },
    {
      title: "3.1 Savings and Investment",
      subsections: [
        {
          title: "3.1.1 Types of Savings and Investment - Simple Explanation",
          content:
            "Savings are surplus money set aside, e.g. a savings account or fixed deposit account. Investment is a step to obtain future returns, e.g. shares, unit trusts and property.",
        },
        {
          title: "Key Concepts",
          bulletPoints: [
            "Savings account: low interest, withdrawable anytime.",
            "Fixed deposit account: higher interest, money kept for a fixed term.",
            "Shares: returns in the form of dividends and capital gains; high risk.",
            "Unit trusts: managed by professional fund managers; moderate risk.",
            "Property: returns in the form of rent and capital gains; risk depends on location and economy.",
          ],
        },
        {
          title: "3.1.2 Simple Interest and Compound Interest - Simple Explanation",
          content:
            "Simple interest is calculated based only on the original principal. Compound interest is calculated based on the principal plus interest accumulated from previous periods, yielding higher returns.",
        },
        {
          title: "Formula Box",
          formula: "Simple interest: I = Prt\nMaturity value (compound interest): MV = P(1 + r/n)^(nt)",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              ["Encik Zainal saves RM4 000 at 2% per year. Find the interest after 1 year.", "I = 4000 x 0.02 x 1", "RM80"],
              ["Encik Badrul saves RM5 000 at 3% per year, 2 years. Find the total interest.", "I = 5000 x 0.03 x 2", "RM300"],
              ["Cik Wong saves RM10 000 at 4% per year. Find the interest after 6 months.", "I = 10000 x 0.04 x (6/12)", "RM200"],
              [
                "Puan Liew Foong saves RM15 000 at 4% per year, compounded every 6 months, 3 years. Find the final amount.",
                "MV = 15000(1+0.04/2)^(2x3) = 15000(1.02)^6",
                "RM16 898.18 (approx.)",
              ],
              [
                "RM10 000 at 5% per year, compounded monthly (n=12) for 1 year.",
                "MV = 10000(1+0.05/12)^12",
                "RM10 511.62",
              ],
            ],
          },
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "The longer the savings term, the higher the simple interest accumulated.",
            "The higher the interest rate, the higher the final savings amount.",
            "The more frequent the compounding (larger n), the higher the maturity value.",
            "Compound interest always gives a higher return than simple interest for the same principal, rate and term.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Forgetting to convert the interest rate percentage to a decimal (% ÷ 100) before calculating.",
            "Forgetting to convert a term in months to a fraction of a year (months/12) in the formula I=Prt.",
            "Confusing n (compounding frequency per year) with t (term in years).",
          ],
        },
        {
          title: "Exam Tips",
          bulletPoints: [
            "List P, r, t (and n if compounding) before substituting into the formula.",
            "Ensure the units of interest rate and term are consistent (both in years, or both in months).",
            "Round monetary answers to 2 decimal places.",
          ],
        },
        {
          title: "3.1.3 Return on Investment (ROI) - Simple Explanation",
          content:
            "ROI measures the effectiveness of an investment relative to its original cost. For property, total return includes rent and capital gain (selling price minus all purchase costs and outstanding loan).",
        },
        {
          title: "Formula Box",
          formula: "ROI = (Total Return / Cost of Investment) x 100%\nCapital gain = Selling Price - All Related Costs",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              [
                "Encik Yusuf buys a shop for RM600 000 (pays 10%=RM60 000), sells for RM1 300 000. Outstanding loan RM486 000, instalments paid RM450 000, legal fees RM15 000, stamp duty RM15 000, agent commission RM18 000. Accumulated rent RM200 000. Find the ROI.",
                "Capital gain = 1300000-486000-60000-15000-15000-18000-450000 = 256000; Total return = 200000+256000 = 456000",
                "ROI = (456000/600000) x100% = 76%",
              ],
            ],
          },
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "Three factors before investing: risk potential, level of return, liquidity aspect.",
            "Factors affecting property returns: political situation, economic conditions, location.",
            "Diversifying an investment portfolio helps reduce overall risk.",
          ],
        },
        {
          title: "3.1.4 Dollar-Cost Averaging Strategy - Simple Explanation",
          content:
            "Dollar-cost averaging is a technique of investing a fixed amount periodically (monthly/quarterly/annually) regardless of market conditions, so the average cost per unit is lower than a lump-sum purchase at a high price.",
        },
        {
          title: "Formula Box",
          formula: "Units purchased = Monthly investment / Unit price\nAverage cost per unit = Total investment / Total units owned",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              [
                "Puan Linda invests RM20 000 in a lump sum at RM2.00/unit; Puan Esther invests RM20 000 monthly at varying prices, ending with 10 626 units.",
                "Puan Linda: 20000/2.00=10000 units, average cost RM2.00. Puan Esther: 20000/10626=RM1.88",
                "Puan Esther Wong is wiser as her average cost is lower (RM1.88) with more units",
              ],
            ],
          },
        },
        {
          title: "Real-Life Applications",
          bulletPoints: [
            "Retirement planning: comparing returns from property, shares and fixed deposits.",
            "Monthly unit trust investing by salaried employees.",
            "Making financial decisions based on personal risk, return and liquidity needs.",
          ],
        },
      ],
    },
    {
      title: "3.2 Credit and Debt Management",
      subsections: [
        {
          title: "3.2.1 Credit and Credit Cards - Simple Explanation",
          content:
            "Credit is an agreement to borrow money/goods from a supplier to be repaid later. A credit card offers an interest-free period (usually 20 days from the statement date) if the balance is paid in full; otherwise, finance charges and late payment charges apply.",
        },
        {
          title: "Key Concepts",
          bulletPoints: [
            "The minimum payment is usually 5% of the final balance or RM50, whichever is higher.",
            "Paying only the minimum leads to ongoing finance charges on the balance.",
            "Advantages of credit cards: cash rebates, reward points, convenient online transactions.",
            "Disadvantages of credit cards: annual fees, finance charges, risk of overspending.",
          ],
        },
        {
          title: "3.2.2 Loans and Repayment - Simple Explanation",
          content:
            "Loans are charged interest using two methods: flat-rate interest (calculated once on the full principal for the entire term) and reducing balance interest (recalculated monthly based on the current balance).",
        },
        {
          title: "Formula Box",
          formula:
            "Flat-rate interest: A = P + Prt\nMonthly instalment = A / number of months\nReducing balance interest (monthly) = Current balance x (r/100) x (1/12)",
        },
        {
          title: "Worked Examples",
          table: {
            headers: ["Question", "Working", "Answer"],
            rows: [
              [
                "Encik Azlan borrows RM10 000 at 4% flat rate, 7 years. Find the monthly instalment.",
                "A = 10000 + (10000x0.04x7) = 12800; instalment = 12800/84 months",
                "RM152.38 per month",
              ],
              [
                "Encik Harith borrows RM10 000 at 6% reducing balance, monthly instalment RM150. Find the interest for the first month.",
                "Interest = 10000 x (6/100) x (1/12)",
                "RM50.00 (balance after instalment 1 = RM9 900)",
              ],
            ],
          },
        },
        {
          title: "Important Notes",
          bulletPoints: [
            "Reducing balance interest usually results in a lower total interest than flat-rate interest because the balance decreases each month.",
            "Compare loan offers based on total interest payable, not just the percentage interest rate.",
            "Avoid unlicensed money lenders due to unreasonable interest rates and legal risk.",
          ],
        },
        {
          title: "Common Mistakes",
          bulletPoints: [
            "Calculating reducing balance interest using the original principal throughout the term (should use the current balance each month).",
            "Forgetting to add accrued interest before deducting the monthly instalment.",
            "Incorrectly converting a term in years to a number of months (years x 12).",
          ],
        },
        {
          title: "Exam Tips",
          bulletPoints: [
            "For flat-rate interest, calculate the total repayment (A) first before dividing by the number of months.",
            "For reducing balance interest, build a month-by-month table: interest, total loan, less instalment, new balance.",
            "Compare two loan packages by calculating the total interest for each package.",
          ],
        },
        {
          title: "Real-Life Applications",
          bulletPoints: [
            "Car loans and personal loans typically use flat-rate interest.",
            "Wise credit card management avoids excessive debt and high finance charges.",
            "Comparing bank loan packages to make sound financial decisions.",
          ],
        },
        {
          title: "Summary",
          bulletPoints: [
            "Savings: savings account, fixed deposit account; Investment: shares, unit trusts, property.",
            "Simple interest I=Prt; Compound interest MV=P(1+r/n)^(nt).",
            "ROI = (total return/cost of investment) x100%.",
            "Loans: A=P+Prt (flat rate) or reducing balance interest recalculated monthly.",
            "Manage credit and debt wisely: pay in full within the interest-free period, avoid relying on minimum payments.",
          ],
        },
      ],
    },
  ],
};
