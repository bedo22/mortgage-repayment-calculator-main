import emptyIllustration from '/assets/images/illustration-empty.svg';
import type { MortgageResult } from '../utils/mortgage';

interface ResultsProps {
  result: MortgageResult | null;
}

const currencyFormatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function formatCurrency(value: number): string {
  return currencyFormatter.format(value);
}

export function Results({ result }: ResultsProps) {
  if (!result) {
    return (
      <section className="results results--empty" aria-live="polite">
        <img
          src={emptyIllustration}
          alt=""
          className="results__illustration"
        />
        <h2 className="results__title">Results shown here</h2>
        <p className="results__description">
          Complete the form and click &ldquo;calculate repayments&rdquo; to see what your monthly
          repayments would be.
        </p>
      </section>
    );
  }

  return (
    <section className="results" aria-live="polite">
      <h2 className="results__title">Your results</h2>
      <p className="results__description">
        Your results are shown below based on the information you provided. To adjust the results,
        edit the form and click &ldquo;calculate repayments&rdquo; again.
      </p>

      <div className="results__card">
        <div className="results__row">
          <p className="results__label">Your monthly repayments</p>
          <p className="results__monthly" data-testid="monthly-repayment">
            {formatCurrency(result.monthlyRepayment)}
          </p>
        </div>
        <hr className="results__divider" />
        <div className="results__row">
          <p className="results__label">Total you&apos;ll repay over the term</p>
          <p className="results__total" data-testid="total-repayment">
            {formatCurrency(result.totalRepayment)}
          </p>
        </div>
      </div>
    </section>
  );
}
