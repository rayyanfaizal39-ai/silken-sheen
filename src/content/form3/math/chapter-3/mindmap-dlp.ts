import type { MindNode } from "@/components/MindMap";

export const mathF3C3MindMapDLP: MindNode = {
  id: "f3c3-en",
  label: "Consumer Mathematics: Savings, Investment, Credit and Debt",
  children: [
    {
      id: "f3c3-en-1",
      label: "3.1 Savings and Investment",
      children: [
        {
          id: "f3c3-en-1-1",
          label: "Types of Savings and Investment",
          children: [
            { id: "f3c3-en-1-1-1", label: "Regular savings account, fixed deposit account" },
            { id: "f3c3-en-1-1-2", label: "Shares, unit trusts, property" },
          ],
        },
        {
          id: "f3c3-en-1-2",
          label: "Interest",
          children: [
            { id: "f3c3-en-1-2-1", label: "Simple interest: I = Prt" },
            { id: "f3c3-en-1-2-2", label: "Compound interest: MV = P(1+r/n)^(nt)" },
            { id: "f3c3-en-1-2-3", label: "More frequent compounding = higher maturity value" },
          ],
        },
        {
          id: "f3c3-en-1-3",
          label: "ROI and Risk",
          children: [
            { id: "f3c3-en-1-3-1", label: "ROI = (total return/cost) x100%" },
            { id: "f3c3-en-1-3-2", label: "Risk, return, liquidity - 3 investment factors" },
            { id: "f3c3-en-1-3-3", label: "Portfolio diversification reduces risk" },
          ],
        },
        {
          id: "f3c3-en-1-4",
          label: "Dollar-Cost Averaging",
          children: [
            { id: "f3c3-en-1-4-1", label: "Units = total investment / unit price" },
            { id: "f3c3-en-1-4-2", label: "Average cost per unit lower than lump sum" },
          ],
        },
      ],
    },
    {
      id: "f3c3-en-2",
      label: "3.2 Credit and Debt Management",
      children: [
        {
          id: "f3c3-en-2-1",
          label: "Credit Cards",
          children: [
            { id: "f3c3-en-2-1-1", label: "Interest-free period ~20 days" },
            { id: "f3c3-en-2-1-2", label: "Minimum payment 5% or RM50" },
            { id: "f3c3-en-2-1-3", label: "Pros: rebates, points; Cons: charges, debt risk" },
          ],
        },
        {
          id: "f3c3-en-2-2",
          label: "Loans and Instalments",
          children: [
            { id: "f3c3-en-2-2-1", label: "Flat-rate interest: A = P + Prt" },
            { id: "f3c3-en-2-2-2", label: "Instalment = A / number of months" },
            { id: "f3c3-en-2-2-3", label: "Reducing balance interest: recalculated monthly" },
          ],
        },
      ],
    },
    {
      id: "f3c3-en-3",
      label: "Chapter Summary",
      children: [
        { id: "f3c3-en-3-1", label: "Savings vs investment: interest vs return/risk" },
        { id: "f3c3-en-3-2", label: "Compound > simple interest for same P,r,t" },
        { id: "f3c3-en-3-3", label: "Manage credit wisely: pay in full within interest-free period" },
      ],
    },
  ],
};
