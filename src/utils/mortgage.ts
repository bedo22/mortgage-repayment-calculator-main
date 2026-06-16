export type MortgageType = 'repayment' | 'interestOnly';

export interface MortgageInput {
  amount: number;
  termYears: number;
  annualRate: number;
  type: MortgageType;
}

export interface MortgageResult {
  monthlyRepayment: number;
  totalRepayment: number;
}

const MONTHS_PER_YEAR = 12;

function monthlyRate(annualRate: number): number {
  return annualRate / MONTHS_PER_YEAR / 100;
}

export function calculateMortgage(input: MortgageInput): MortgageResult {
  const { amount, termYears, annualRate, type } = input;
  const months = termYears * MONTHS_PER_YEAR;
  const r = monthlyRate(annualRate);

  if (type === 'interestOnly') {
    const monthlyRepayment = amount * r;
    const totalRepayment = monthlyRepayment * months + amount;
    return { monthlyRepayment, totalRepayment };
  }

  if (r === 0) {
    const monthlyRepayment = amount / months;
    return { monthlyRepayment, totalRepayment: amount };
  }

  const factor = Math.pow(1 + r, months);
  const monthlyRepayment = (amount * (r * factor)) / (factor - 1);
  const totalRepayment = monthlyRepayment * months;
  return { monthlyRepayment, totalRepayment };
}
