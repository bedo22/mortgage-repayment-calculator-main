# Mortgage Repayment Calculator

A React + TypeScript implementation of the [Frontend Mentor Mortgage Repayment Calculator](https://www.frontendmentor.io/challenges/mortgage-repayment-calculator-Galx1LXK73) challenge.

## Tech Stack

- **Vite** + **React 18** + **TypeScript**
- **React Hook Form** + **Zod** for form state and validation
- **Vitest** for unit tests
- **Plain CSS** with design tokens from the style guide

## Getting Started

```bash
pnpm install
pnpm dev          # http://localhost:5173
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Vite dev server |
| `pnpm build` | Type-check + production build to `dist/` |
| `pnpm preview` | Preview production build |
| `pnpm test` | Run Vitest once |
| `pnpm test:watch` | Run Vitest in watch mode |
| `pnpm typecheck` | TypeScript check only |

## Architecture

```
src/
├── components/    # MortgageForm, Results, FormField
├── utils/         # mortgage.ts (calculation) + tests
├── schemas/       # Zod validation schema
├── App.tsx        # Holds calculation result state
├── main.tsx       # React entry point
└── index.css      # Design tokens + global styles
```

State management is intentionally simple: `App` holds the calculated result, the form is purely presentational and calls back via `onSubmit`. Children do not own state.

## Mortgage Formulas

**Repayment:**
```
M = P × [ r(1+r)^n ] / [ (1+r)^n − 1 ]
```

**Interest Only:**
```
M = P × r
Total = (M × n) + P
```

Where `P` is the principal, `r` is the monthly interest rate, and `n` is the total number of monthly payments.
