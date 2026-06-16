# Mortgage Repayment Calculator — Implementation Plan

A Frontend Mentor challenge built with React + TypeScript.

## Decisions Locked

| # | Decision | Choice |
|---|----------|--------|
| 1 | Build tool | Vite + React |
| 2 | Package manager | pnpm |
| 3 | Language | TypeScript |
| 4 | Styling | Plain CSS / CSS Modules |
| 5 | Forms | React Hook Form + Zod |
| 6 | State | useState in App, children presentational |
| 7 | Tests | Vitest, formula only, single-run |
| 8 | Structure | Flat with light subfolders |
| 9 | Currency | `Intl.NumberFormat` for output, `£` icon prefix on input |
| 10 | Icons | `?react` Vite import |
| 11 | Input layout | Flex wrapper with prefix/suffix spans |
| 12 | A11y | Native HTML + ARIA |
| 13 | Validation | `onBlur` / `onTouched` |
| 14 | Radio buttons | Native radios + CSS |
| 15 | Input types | `type="number"` |
| 16 | Clear All | Reset to empty |
| 17 | Responsive | Mobile-first, 1 breakpoint at 768px |
| 18 | Bonus features | None |
| 19 | Deploy | Netlify |
| 20 | Build order | Bottom-up: utils → tests → components |

## Project Structure

```
mortgage-repayment-calculator/
├── public/
│   └── assets/                 # icons, fonts, favicon
├── src/
│   ├── components/
│   │   ├── MortgageForm.tsx
│   │   ├── Results.tsx
│   │   └── FormField.tsx
│   ├── utils/
│   │   ├── mortgage.ts         # calculation logic
│   │   └── mortgage.test.ts    # Vitest tests
│   ├── schemas/
│   │   └── mortgage.ts         # Zod validation schema
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── netlify.toml
└── PLAN.md
```

## Mortgage Formula

### Repayment (capital + interest)
```
M = P × [ r(1+r)^n ] / [ (1+r)^n − 1 ]

Where:
  P = principal (mortgage amount)
  r = monthly interest rate (annualRate / 12 / 100)
  n = total payments (termYears × 12)

Total = M × n
```

### Interest Only
```
M = P × r
Total = (M × n) + P   // principal repaid at end of term
```

## Implementation Order

### Step 1: Scaffold project
- `pnpm create vite@latest . --template react-ts`
- Install deps: `pnpm add react-hook-form zod @hookform/resolvers`
- Install dev deps: `pnpm add -D vitest`
- Verify `pnpm dev` runs

### Step 2: Mortgage utility + tests
- `src/utils/mortgage.ts` — pure functions
- `src/utils/mortgage.test.ts` — Vitest tests covering:
  - Repayment: matches preview (£300k, 25yr, 5.25% → ~£1,797.74)
  - Interest only: principal unchanged in total
  - Edge cases: 0% interest, very small/large values
  - Input validation: negative numbers, NaN

### Step 3: Zod schema
- `src/schemas/mortgage.ts` — schema matching the form
- Numbers must be positive
- Term: 1-50 years
- Rate: 0-100%
- Mortgage type: enum `'repayment' | 'interestOnly'`

### Step 4: FormField component
- Reusable wrapper for labeled inputs with prefix/suffix
- Accepts: name, label, prefix, suffix, register, error
- Renders: label, input wrapper, input, error message
- Handles ARIA: `aria-invalid`, `aria-describedby`

### Step 5: MortgageForm component
- React Hook Form with `zodResolver`
- 3 numeric fields + radio group
- Submit button with calculator icon
- Clear All button (calls `reset()`)

### Step 6: Results component
- Empty state: illustration + "Complete the form..." text
- Populated state: monthly + total repayment with `Intl.NumberFormat`
- Yellow-bordered highlight box for monthly amount

### Step 7: App component
- Holds `result` state
- Form's onSubmit runs calculation, sets result
- Passes result to Results

### Step 8: Styles
- Mobile-first CSS
- Breakpoint at 768px
- Color tokens from style guide:
  - Lime: `hsl(61, 70%, 52%)`
  - Red: `hsl(4, 69%, 50%)`
  - Slate 100/300/500/700/900
- Plus Jakarta Sans font (local files in `assets/fonts/`)

### Step 9: Deploy
- `netlify.toml` with build settings
- `pnpm build` outputs to `dist/`
- Push to GitHub, connect Netlify

## Commands Cheat Sheet

```bash
# Dev
pnpm dev                    # Start Vite dev server

# Test
pnpm test                   # Single-run Vitest
pnpm test:watch             # Watch mode (optional)

# Build
pnpm build                  # Production build to dist/
pnpm preview                # Preview production build

# Lint / Typecheck
pnpm tsc --noEmit           # TypeScript check
```

## Validation Rules (Zod)

```ts
const mortgageSchema = z.object({
  amount: z.number().positive().max(100_000_000),
  term: z.number().int().positive().min(1).max(50),
  rate: z.number().nonnegative().max(100),
  type: z.enum(['repayment', 'interestOnly']),
});
```

## Notes

- Calculator icon: import as `import CalculatorIcon from '/assets/images/icon-calculator.svg?react'`
- Empty illustration: import as `<img src={emptyIllustration} />` (no recolor needed)
- `£` icon for input prefix: use `import PoundIcon from './path?react'` or just a `£` text in a span
- No external icon library — only the assets we have

## Open Questions

None at this point.
