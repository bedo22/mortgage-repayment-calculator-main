import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CalculatorIcon from '/assets/images/icon-calculator.svg?react';
import { FormField } from './FormField';
import { mortgageSchema, defaultValues, type MortgageFormValues } from '../schemas/mortgage';

interface MortgageFormProps {
  onSubmit: (values: MortgageFormValues) => void;
}

export function MortgageForm({ onSubmit }: MortgageFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MortgageFormValues>({
    resolver: zodResolver(mortgageSchema),
    defaultValues,
    mode: 'onTouched',
  });

  return (
    <form className="mortgage-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="mortgage-form__header">
        <h1 className="mortgage-form__title">Mortgage Calculator</h1>
        <button
          type="button"
          className="mortgage-form__clear"
          onClick={() => reset(defaultValues)}
        >
          Clear All
        </button>
      </div>

      <div className="mortgage-form__fields">
        <FormField
          name="amount"
          label="Mortgage Amount"
          prefix="£"
          register={register}
          error={errors.amount}
        />

        <div className="mortgage-form__row">
          <FormField
            name="termYears"
            label="Mortgage Term"
            suffix="years"
            register={register}
            error={errors.termYears}
          />
          <FormField
            name="annualRate"
            label="Interest Rate"
            suffix="%"
            register={register}
            error={errors.annualRate}
          />
        </div>

        <fieldset className="mortgage-form__fieldset">
          <legend className="mortgage-form__legend">Mortgage Type</legend>
          <div className="mortgage-form__radio-group">
            <label className="radio-option">
              <input
                type="radio"
                value="repayment"
                {...register('type')}
                className="radio-option__input"
              />
              <span className="radio-option__label">Repayment</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                value="interestOnly"
                {...register('type')}
                className="radio-option__input"
              />
              <span className="radio-option__label">Interest Only</span>
            </label>
          </div>
        </fieldset>

        <button type="submit" className="mortgage-form__submit">
          <CalculatorIcon className="mortgage-form__submit-icon" />
          <span>Calculate Repayments</span>
        </button>
      </div>
    </form>
  );
}
