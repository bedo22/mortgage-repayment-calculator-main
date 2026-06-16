import { z } from 'zod';

export const mortgageSchema = z.object({
  amount: z
    .number({ invalid_type_error: 'This field is required' })
    .positive('This field is required')
    .max(100_000_000, 'Enter a valid amount'),
  termYears: z
    .number({ invalid_type_error: 'This field is required' })
    .int('Enter a whole number of years')
    .positive('This field is required')
    .max(50, 'Maximum term is 50 years'),
  annualRate: z
    .number({ invalid_type_error: 'This field is required' })
    .nonnegative('This field is required')
    .max(100, 'Enter a valid rate'),
  type: z.enum(['repayment', 'interestOnly'], {
    errorMap: () => ({ message: 'This field is required' }),
  }),
});

export type MortgageFormValues = z.infer<typeof mortgageSchema>;

export const defaultValues: MortgageFormValues = {
  amount: 0,
  termYears: 0,
  annualRate: 0,
  type: 'repayment',
};
