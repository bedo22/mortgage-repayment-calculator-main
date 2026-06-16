import type { UseFormRegister, FieldError } from 'react-hook-form';
import type { MortgageFormValues } from '../schemas/mortgage';

interface FormFieldProps {
  name: keyof MortgageFormValues;
  label: string;
  prefix?: string;
  suffix?: string;
  register: UseFormRegister<MortgageFormValues>;
  error?: FieldError;
}

export function FormField({ name, label, prefix, suffix, register, error }: FormFieldProps) {
  const id = `field-${name}`;
  const errorId = `${id}-error`;
  const hasError = Boolean(error);

  return (
    <div className="form-field">
      <label htmlFor={id} className="form-field__label">
        {label}
      </label>
      <div className={`form-field__input-wrapper${hasError ? ' has-error' : ''}`}>
        {prefix && (
          <span className="form-field__affix form-field__affix--prefix" aria-hidden="true">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="number"
          step="any"
          className="form-field__input"
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          {...register(name, { valueAsNumber: true })}
        />
        {suffix && (
          <span className="form-field__affix form-field__affix--suffix" aria-hidden="true">
            {suffix}
          </span>
        )}
      </div>
      {error && (
        <span id={errorId} className="form-field__error" role="alert">
          {error.message}
        </span>
      )}
    </div>
  );
}
