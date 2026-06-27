import type { Flashcard } from "@/data/content";

type FlashcardSeed = [string, string];

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `math-f3-c3-dlp-f${index + 1}`,
    subjectId: "math",
    form: "Form 3",
    chapter: "Chapter 3",
    lang: "dlp",
    front,
    back,
  }));
}

export const mathF3C3FlashcardsDLP: Flashcard[] = buildFlashcards([
  // Deck 1: Savings, Investment and Interest (Cards 1-20)
  ["What does savings mean?", "Surplus money set aside, e.g. in a bank account."],
  ["What does investment mean?", "A step to obtain future returns, e.g. shares and property."],
  ["What is the simple interest formula?", "I = Prt"],
  ["What do P, r, t mean in I=Prt?", "P=principal, r=interest rate, t=term in years"],
  ["What is the formula for the maturity value of compound interest?", "MV = P(1+r/n)^(nt)"],
  ["What does n mean in the compound interest formula?", "Compounding frequency per year"],
  ["RM4 000 at 2% per year, interest after 1 year?", "RM80"],
  ["RM5 000 at 3% per year, 2 years, total interest?", "RM300"],
  ["RM10 000 at 4% per year, interest for 6 months?", "RM200"],
  ["What is the effect of a longer term on simple interest?", "Interest increases"],
  ["What is the effect of a higher rate on the final savings amount?", "Final savings amount increases"],
  ["What is the effect of more frequent compounding on the maturity value?", "Maturity value increases"],
  ["Is compound interest always higher than simple interest?", "Yes, for the same P, r, t"],
  ["Which savings type has low interest but can be withdrawn anytime?", "Regular savings account"],
  ["Which savings type has higher interest with a fixed term?", "Fixed deposit account"],
  ["What is the return from shares?", "Dividends and capital gains"],
  ["What is the return from property?", "Rent and capital gains"],
  ["Who manages a unit trust?", "A professional fund manager"],
  ["What does hibah mean under the wadiah principle?", "A gift/return from an Islamic bank, not interest"],
  ["Encik Osman saves RM20 000, receives RM20 500. Percentage hibah?", "2.5%"],

  // Deck 2: ROI, Risk and Dollar-Cost Averaging (Cards 21-40)
  ["What is the ROI formula?", "(Total return/cost of investment) x100%"],
  ["What are the three factors to consider before investing?", "Risk, return, liquidity"],
  ["What does liquidity mean?", "The ability to convert an investment into cash quickly"],
  ["What does risk potential mean?", "The possibility of uncertainty from an investment"],
  ["What does level of return mean?", "The profit enjoyed from an investment"],
  ["How can investment risk be reduced?", "Diversify the investment portfolio"],
  ["What factors affect property returns?", "Political situation, economic conditions, location"],
  ["What does capital gain mean?", "Selling price minus all related costs"],
  ["What is the dollar-cost averaging strategy?", "Investing a fixed amount periodically regardless of market conditions"],
  ["What is the formula for units purchased?", "Total investment / unit price"],
  ["What is the formula for average cost per unit?", "Total investment / total units owned"],
  ["Puan Linda invests RM20 000 in a lump sum at RM2.00/unit. How many units?", "10 000 units"],
  ["Puan Esther uses dollar-cost averaging, obtaining 10 626 units with RM20 000. Average cost?", "RM1.88"],
  ["Who is the wiser investor, Linda or Esther?", "Esther, lower average cost"],
  ["What is the advantage of dollar-cost averaging?", "Taking advantage of price changes, lower average cost"],
  ["Encik Yusuf: total return RM456 000, cost RM600 000. ROI?", "76%"],
  ["What is the risk of shares compared to fixed deposits?", "Shares have higher risk"],
  ["What is the liquidity of property compared to savings?", "Property is less liquid, takes time to sell"],
  ["What is the return from a unit trust?", "Unit trust return"],
  ["What does portfolio diversification mean?", "Investing in various instruments to reduce risk"],

  // Deck 3: Credit, Debt and Loans (Cards 41-60)
  ["What does credit mean?", "An agreement to borrow money/goods to be repaid later"],
  ["What is the typical interest-free period for a credit card?", "20 days from the statement date"],
  ["What is the typical minimum credit card payment?", "5% of the final balance or RM50, whichever is higher"],
  ["What is the effect of paying only the minimum payment?", "Ongoing finance charges are applied to the balance"],
  ["What is an advantage of a credit card?", "Cash rebates, reward points, convenient transactions"],
  ["What is a disadvantage of a credit card?", "Annual fees, finance charges, risk of overspending"],
  ["What is the formula for flat-rate loan repayment?", "A = P + Prt"],
  ["What is the formula for the monthly instalment?", "A / number of months"],
  ["Encik Azlan borrows RM10 000, 4% flat rate, 7 years. Find A.", "RM12 800"],
  ["From the above, the monthly instalment (84 months)?", "RM152.38"],
  ["What are the two methods of loan interest?", "Flat-rate interest and reducing balance interest"],
  ["How is reducing balance interest calculated?", "Based on the current balance each month, not the original principal"],
  ["Encik Harith borrows RM10 000, 6% reducing balance, instalment RM150. Month 1 interest?", "RM50.00"],
  ["Balance after instalment 1 (RM10000+50-150)?", "RM9 900"],
  ["Month 2 interest (balance RM9900, 6% reducing balance)?", "RM49.50"],
  ["Which usually has lower total interest: flat rate or reducing balance?", "Reducing balance interest (balance decreases each month)"],
  ["What is the risk of unlicensed money lenders?", "Unreasonable interest rates and legal risk"],
  ["How do you compare two loan packages?", "Compare the total interest, not just the percentage rate"],
  ["Encik Murugan borrows RM16 000, instalment RM320, 5 years (60 months). Total repayment?", "RM19 200"],
  ["What is the total interest for the loan above?", "RM3 200"],
]);
