import { useState } from 'react';
import { MortgageForm } from './components/MortgageForm';
import { Results } from './components/Results';
import { calculateMortgage, type MortgageResult } from './utils/mortgage';
import type { MortgageFormValues } from './schemas/mortgage';

export default function App() {
  const [result, setResult] = useState<MortgageResult | null>(null);

  const handleSubmit = (values: MortgageFormValues) => {
    setResult(
      calculateMortgage({
        amount: values.amount,
        termYears: values.termYears,
        annualRate: values.annualRate,
        type: values.type,
      }),
    );
  };

  return (
    <main className="app">
      <div className="app__card">
        <MortgageForm onSubmit={handleSubmit} />
        <Results result={result} />
      </div>
    </main>
  );
}
