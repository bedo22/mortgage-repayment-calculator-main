import { describe, it, expect } from 'vitest';
import { calculateMortgage } from './mortgage';

describe('calculateMortgage', () => {
  describe('repayment type', () => {
    it('matches the design preview: £300,000 over 25 years at 5.25%', () => {
      const result = calculateMortgage({
        amount: 300_000,
        termYears: 25,
        annualRate: 5.25,
        type: 'repayment',
      });
      expect(result.monthlyRepayment).toBeCloseTo(1797.74, 2);
      expect(result.totalRepayment).toBeCloseTo(539_322.94, 0);
    });

    it('handles 0% interest by dividing principal evenly across months', () => {
      const result = calculateMortgage({
        amount: 120_000,
        termYears: 10,
        annualRate: 0,
        type: 'repayment',
      });
      expect(result.monthlyRepayment).toBe(1000);
      expect(result.totalRepayment).toBe(120_000);
    });

    it('produces higher monthly payments for shorter terms', () => {
      const short = calculateMortgage({
        amount: 200_000,
        termYears: 15,
        annualRate: 4,
        type: 'repayment',
      });
      const long = calculateMortgage({
        amount: 200_000,
        termYears: 30,
        annualRate: 4,
        type: 'repayment',
      });
      expect(short.monthlyRepayment).toBeGreaterThan(long.monthlyRepayment);
    });

    it('produces higher monthly payments for higher interest rates', () => {
      const low = calculateMortgage({
        amount: 200_000,
        termYears: 25,
        annualRate: 3,
        type: 'repayment',
      });
      const high = calculateMortgage({
        amount: 200_000,
        termYears: 25,
        annualRate: 7,
        type: 'repayment',
      });
      expect(high.monthlyRepayment).toBeGreaterThan(low.monthlyRepayment);
    });
  });

  describe('interestOnly type', () => {
    it('computes monthly payment as principal times monthly rate', () => {
      const result = calculateMortgage({
        amount: 200_000,
        termYears: 25,
        annualRate: 5,
        type: 'interestOnly',
      });
      expect(result.monthlyRepayment).toBeCloseTo(833.33, 2);
    });

    it('total repayment includes principal paid back at end of term', () => {
      const result = calculateMortgage({
        amount: 100_000,
        termYears: 20,
        annualRate: 4,
        type: 'interestOnly',
      });
      const expectedInterest = (100_000 * 4) / 100 / 12 * 20 * 12;
      expect(result.totalRepayment).toBeCloseTo(100_000 + expectedInterest, 2);
    });

    it('produces lower monthly payment than repayment for the same inputs', () => {
      const inputs = {
        amount: 200_000,
        termYears: 25,
        annualRate: 5,
      };
      const interestOnly = calculateMortgage({
        ...inputs,
        type: 'interestOnly',
      });
      const repayment = calculateMortgage({
        ...inputs,
        type: 'repayment',
      });
      expect(interestOnly.monthlyRepayment).toBeLessThan(repayment.monthlyRepayment);
    });
  });
});
