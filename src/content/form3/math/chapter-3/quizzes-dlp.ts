import type { Difficulty, QuizQuestion } from "@/data/content";

import { MATH_F3_C3_QUIZ_VISUALS } from "./quiz-visuals";
import { MATH_F3_C3_QUIZ_EXPLANATIONS } from "./quiz-explanations";

import { buildForm3MathQuizSets } from "../quiz-sets";

type QuizSeed = [Difficulty, string, [string, string, string, string], number];

function buildQuiz(items: QuizSeed[]): QuizQuestion[] {
  return items.map(([difficulty, question, options, answerIndex], index) => ({
    id: `math-f3-c3-dlp-q${index + 1}`,
    subjectId: "math",
    form: "Form 3",
    difficulty,
    chapter: "Chapter 3",
    lang: "dlp",
    question,
    options,
    answerIndex,
    mathNotation: "indices",
    visual: MATH_F3_C3_QUIZ_VISUALS[index + 1],
    explanation: MATH_F3_C3_QUIZ_EXPLANATIONS[index + 1].dlp,
  }));
}

export const mathF3C3QuestionBankDLP: QuizQuestion[] = buildQuiz([
  ["Easy", "What is the formula for simple interest?", ["I = Prt", "I = P + rt", "I = P/rt", "I = Pr + t"], 0],
  ["Easy", "What does P mean in I=Prt?", ["Principal", "Percentage", "Profit", "Periodic payment"], 0],
  [
    "Easy",
    "What does r mean in I = Prt when t is measured in years?",
    [
      "Annual interest rate as a decimal",
      "Monthly interest rate as a decimal",
      "Annual interest rate as a percentage",
      "Monthly interest rate as a percentage",
    ],
    0,
  ],
  ["Easy", "What does t mean in I=Prt?", ["Term in years", "Total transactions", "Date", "Tax"], 0],
  ["Easy", "Encik Zainal saves RM4 000 at 2% simple interest per year. Find the interest after 1 year.", ["RM80", "RM800", "RM8", "RM40"], 0],
  ["Easy", "In a comparison of bank accounts, which account usually offers a higher interest rate with a fixed savings term?", ["Fixed deposit account", "Current account", "Regular savings account", "Digital wallet"], 0],
  ["Easy", "Which type of investment returns dividends and capital gains?", ["Shares", "Savings account", "Current account", "Emergency fund"], 0],
  [
    "Easy",
    "What is the formula for the maturity value with compound interest?",
    [
      "MV = P(1+r/n)^(nt)",
      "MV = P(1+r/n)^(t/n)",
      "MV = P(1+rn)^(nt)",
      "MV = P(1+r/n)^t",
    ],
    0,
  ],
  [
    "Easy",
    "What does n mean in MV=P(1+r/n)^(nt)?",
    [
      "Compounding periods per year",
      "Compounding periods per month",
      "Investment duration in years",
      "Investment duration in months",
    ],
    0,
  ],
  [
    "Easy",
    "What is the ROI formula?",
    [
      "(Total return/cost) × 100%",
      "(Cost/total return) × 100%",
      "(Total return × cost) × 100%",
      "(Total return − cost) × 100%",
    ],
    0,
  ],
  [
    "Easy",
    "What are the three factors to consider before investing?",
    [
      "Risk, return, liquidity",
      "Risk, price, frequency",
      "Return, amount, duration",
      "Liquidity, rate, duration",
    ],
    0,
  ],
  [
    "Easy",
    "What does liquidity mean?",
    [
      "Ease of converting to cash",
      "Ease of earning a high return",
      "Ease of avoiding every risk",
      "Ease of earning compound interest",
    ],
    0,
  ],
  [
    "Easy",
    "What does credit mean?",
    [
      "Borrowing to repay later",
      "Saving to withdraw later",
      "Investing to sell later",
      "Interest to compound later",
    ],
    0,
  ],
  ["Easy", "A credit card in this question offers a 20-day interest-free period from the statement date. After 7 days, how many days remain?", ["13 days", "20 days", "27 days", "7 days"], 0],
  ["Easy", "A credit card sets its minimum payment at 5% of the statement balance or RM50, whichever is higher. If the balance is RM800, find the minimum payment.", ["RM50", "RM40", "RM80", "RM800"], 0],
  ["Easy", "What is the formula for flat-rate loan repayment?", ["A = P + Prt", "A = P × rt", "A = P - rt", "A = Prt"], 0],
  ["Easy", "What is the formula for the monthly instalment?", ["A / number of months", "A × number of months", "A - number of months", "A + number of months"], 0],
  [
    "Easy",
    "Which can be an advantage of a credit card with a rewards programme?",
    [
      "Rebates and rewards",
      "Always zero interest",
      "Always zero fees",
      "Unlimited spending",
    ],
    0,
  ],
  [
    "Easy",
    "What is a disadvantage of a credit card?",
    [
      "Overspending risk",
      "Risk of no online transactions",
      "Risk of no shops accepting the card",
      "Risk of no instalment repayments",
    ],
    0,
  ],
  [
    "Easy",
    "What is the dollar-cost averaging strategy?",
    [
      "A fixed amount at fixed intervals",
      "A changing amount at fixed intervals",
      "A fixed amount only at high prices",
      "The whole amount at a single time",
    ],
    0,
  ],
  ["Medium", "Encik Badrul saves RM5 000 at 3% simple interest per year for 2 years. Find the total interest.", ["RM300", "RM150", "RM600", "RM450"], 0],
  ["Medium", "Cik Wong saves RM10 000 at 4% simple interest per year. Find the interest after 6 months.", ["RM200", "RM400", "RM100", "RM800"], 0],
  ["Medium", "RM10 000 is saved at 5% per year, compounded monthly (n = 12), for 1 year. Find the maturity value to the nearest sen.", ["RM10 511.62", "RM10 500.00", "RM10 050.00", "RM11 000.00"], 0],
  ["Medium", "Two deposits of RM10 000 each earn a nominal annual rate of 5% for 1 year, with no withdrawals or fees. Deposit A compounds quarterly (n = 4), B monthly (n = 12). Which has the higher maturity value?", ["Deposit B", "Deposit A", "Same value", "Cannot be determined"], 0],
  ["Medium", "Encik Osman saves RM20 000 under the wadiah principle, receives RM20 500 after 1 year. Find the percentage of hibah.", ["2.5%", "5%", "25%", "0.25%"], 0],
  ["Medium", "Encik Yusuf earns a total investment return of RM456 000 on an investment cost of RM600 000. Find the ROI.", ["76%", "65%", "84%", "60%"], 0],
  ["Medium", "Puan Linda invests RM20 000 in a lump sum at RM2.00/unit. How many units does she get?", ["10 000 units", "20 000 units", "5 000 units", "2 000 units"], 0],
  ["Medium", "Puan Esther invests RM20 000 using dollar-cost averaging and obtains 10 626 units. Find the average cost per unit to the nearest sen.", ["RM1.88", "RM2.00", "RM1.50", "RM2.50"], 0],
  ["Medium", "Puan Linda pays RM20 000 for 10 000 units, while Puan Esther pays RM20 000 for 10 626 units of the same investment. Who obtains a lower average cost per unit?", ["Puan Esther", "Puan Linda", "Same average cost", "Cannot be determined"], 0],
  ["Medium", "Encik Azlan borrows RM10 000 at 4% flat rate, 7 years. Find the total repayment A.", ["RM12 800", "RM10 400", "RM14 000", "RM11 600"], 0],
  ["Medium", "Encik Azlan repays a total loan amount of RM12 800 in 84 equal monthly instalments. Find the monthly instalment to the nearest sen.", ["RM152.38", "RM142.86", "RM166.67", "RM120.00"], 0],
  ["Medium", "Encik Harith borrows RM10 000 at 6% annual reducing-balance interest, with a RM150 instalment at month end. Use a monthly rate of 6% ÷ 12. Find the first month’s interest.", ["RM50.00", "RM60.00", "RM45.00", "RM100.00"], 0],
  ["Medium", "Encik Harith’s opening loan balance for month 2 is RM9 900. The annual reducing-balance interest rate is 6%. Use a monthly rate of 6% ÷ 12. Find the second month’s interest.", ["RM49.50", "RM50.00", "RM48.00", "RM51.00"], 0],
  ["Medium", "Encik Harith’s opening loan balance is RM10 000. First-month interest of RM50 is added before a RM150 instalment is paid. Find the balance after that instalment.", ["RM9 900", "RM9 850", "RM10 050", "RM9 950"], 0],
  ["Medium", "Cik Kayal borrows RM X at 5% flat rate, 8 years, monthly instalment RM218.75. Find the total repayment A.", ["RM21 000", "RM18 375", "RM1 750", "RM13 125"], 0],
  ["Medium", "Cik Kayal repays RM21 000 on a loan at 5% annual flat-rate interest over 8 years. Using A = P + Prt, find the principal P.", ["RM15 000", "RM21 000", "RM10 500", "RM7 500"], 0],
  ["Medium", "Encik Murugan borrows RM16 000, repays over 5 years, monthly instalment RM320. Find the total repayment.", ["RM19 200", "RM16 000", "RM17 600", "RM20 000"], 0],
  ["Medium", "Encik Murugan borrows RM16 000 and repays RM19 200 in total. Find the total interest.", ["RM3 200", "RM1 600", "RM4 800", "RM2 000"], 0],
  ["Medium", "Encik Murugan borrows RM16 000 for 5 years and pays total interest of RM3 200. Find the annual flat interest rate using I = Prt.", ["4%", "5%", "3%", "6%"], 0],
  ["Medium", "Encik Vincent has no guarantor. Bank A offers a 9-year loan at 4.5% without a guarantor; Bank B offers a 6-year loan at 5% and requires a guarantor. Considering only the guarantor requirement, which bank meets his condition?", ["Bank A", "Bank B", "Both banks", "Neither bank"], 0],
  ["Hard", "Encik Yusuf buys a shop for RM600 000 with a 10% down payment, then sells it for RM1 300 000. The outstanding loan settled is RM486 000; earlier instalments RM450 000; legal fees RM15 000; stamp duty RM15 000; commission RM18 000. Find the net capital gain after deducting all these costs including the down payment.", ["RM256 000", "RM700 000", "RM814 000", "RM200 000"], 0],
  ["Hard", "Encik Yusuf earns a net capital gain of RM256 000 and accumulated rent of RM200 000. Find the total return.", ["RM456 000", "RM256 000", "RM700 000", "RM600 000"], 0],
  ["Hard", "Encik Zainal holds 6 000 shares valued at RM1 each. A 6% dividend is calculated on the original share value before any bonus. Find the total dividend.", ["RM360", "RM600", "RM3 600", "RM60"], 0],
  ["Hard", "Encik Zainal holds 6 000 shares and receives 1 bonus share for every 2 shares held. Find the number of bonus shares.", ["3 000 units", "6 000 units", "1 500 units", "12 000 units"], 0],
  ["Hard", "Encik Zainal holds 6 000 shares and receives 3 000 bonus shares. Find the total shares after the bonus.", ["9 000 units", "6 000 units", "3 000 units", "12 000 units"], 0],
  ["Hard", "Encik Kishendran saves RM5 000 at 4% per year, compounded every 3 months (n = 4), for 3 years. Find the accumulated interest (MV − P) to the nearest sen.", ["RM634.13", "RM600.00", "RM500.00", "RM700.00"], 0],
  ["Hard", "Encik Oswald borrows RM15 000 at 5% flat rate, 5 years. Find the total interest paid.", ["RM3 750", "RM750", "RM7 500", "RM1 500"], 0],
  ["Hard", "Encik Oswald borrows RM15 000 at 5% annual flat-rate interest for 5 years. Find the total repayment A and the monthly instalment over 60 months.", ["A = RM18 750; instalment RM312.50", "A = RM15 000; instalment RM250.00", "A = RM18 750; instalment RM375.00", "A = RM20 000; instalment RM333.33"], 0],
  ["Hard", "Encik Syed buys an air conditioner for RM3 200, pays RM2 000 cash and the remaining RM1 200 by credit card. The card gives this purchase an interest-free period if the statement balance is paid in full on time. All conditions are met. Find the interest charged.", ["RM0", "RM120", "RM12", "RM1 200"], 0],
  ["Hard", "Cik Chin buys a bag from Company L Singapore for SGD250+SGD50 shipping=SGD300, with a 1% overseas transaction surcharge on her credit card. Find the surcharge in SGD.", ["SGD3.00", "SGD30.00", "SGD0.30", "SGD300.00"], 0],
  ["Hard", "Company L offers a bag for SGD303 including shipping and card charges. Company V offers the same bag for RM799 including shipping. Use SGD1 = RM3.30 and ignore other charges. Which is cheaper?", ["Company V", "Company L", "Same price", "Cannot be compared"], 0],
  [
    "Hard",
    "What is the mistake in this statement: 'Reducing balance interest is calculated using the original principal every month'?",
    [
      "Use the current balance each month",
      "Use the original principal each year",
      "Use the accumulated interest each month",
      "Use the instalment payment each month",
    ],
    0,
  ],
  [
    "Hard",
    "Two deposits have the same principal and positive annual interest rate. Compound interest is credited yearly for 2 years with no withdrawals or fees. Why is its return higher than simple interest over the same term?",
    [
      "Interest on principal and accumulated interest",
      "Interest on principal only throughout the term",
      "The interest rate changes automatically",
      "The deposit duration changes automatically",
    ],
    0,
  ],
  ["Hard", "Encik Hussein buys a house for RM300 000 with a RM30 000 down payment and sells it for RM600 000 after 20 years. Total loan payments to the bank over that period are RM475 000 and accumulated rent is RM60 000. The loan is fully settled. Ignore other costs. Find the total net return.", ["RM155 000", "RM600 000", "RM300 000", "RM60 000"], 0],
  ["Hard", "Encik Hussein earns a total net return of RM155 000. Use the initial investment cost of RM300 000 as the denominator. Find the ROI to 1 decimal place.", ["51.7%", "200.0%", "20.0%", "100.0%"], 0],
]);

export const mathF3C3QuizzesDLP: QuizQuestion[] = buildForm3MathQuizSets(3, mathF3C3QuestionBankDLP);
