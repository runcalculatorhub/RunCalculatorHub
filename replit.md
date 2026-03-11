# Run Calculator Hub - Running Tools & Pace Calculators

## Project Overview
A clean, fast, SEO-focused running tools website. Utility-first site designed to rank for running calculator and pace-related searches.

## Tech Stack
- **Frontend**: React + TypeScript, Vite, Wouter (routing), Tailwind CSS, shadcn/ui
- **Backend**: Express (minimal - serves static frontend)
- **Styling**: Tailwind CSS with custom theme tokens (Inter font, blue primary, white cards on light gray background)

## Project Structure
```
client/src/
├── components/
│   ├── layout/          # Header, Footer, Layout wrapper
│   ├── ui/              # shadcn/ui components
│   ├── Breadcrumbs.tsx  # Navigation breadcrumbs
│   ├── FAQAccordion.tsx # FAQ with schema.org markup
│   ├── PaceTable.tsx    # Reusable data table
│   ├── RelatedTools.tsx # Related tool links
│   ├── StatCard.tsx     # Metric display card
│   ├── TimeInput.tsx    # Hours/Minutes/Seconds input
│   ├── ToolCard.tsx     # Tool preview card
│   └── ToolPageLayout.tsx # Standard tool page wrapper
├── data/
│   ├── faqs.ts          # FAQ content for all pages
│   └── tools.ts         # Tool definitions and metadata
├── pages/
│   ├── Home.tsx
│   ├── Tools.tsx
│   ├── About.tsx
│   ├── FAQ.tsx
│   ├── MarathonPaceCalculator.tsx
│   ├── HalfMarathonPaceCalculator.tsx
│   ├── FiveKPaceCalculator.tsx
│   ├── TenKPaceCalculator.tsx
│   ├── RunningPaceCalculator.tsx
│   ├── RaceTimePredictor.tsx
│   ├── TrainingPaceCalculator.tsx
│   ├── RunningPaceConverter.tsx
│   ├── SplitCalculator.tsx
│   ├── PaceCharts.tsx
│   └── not-found.tsx
├── utils/
│   └── calculations.ts  # All running math (pace, splits, Riegel, VDOT)
└── App.tsx              # Router with all 14 pages
```

## Key Features
- 10 working calculator tools (marathon, half, 5K, 10K, general pace, race predictor, training paces, pace converter, split calculator, pace charts)
- SEO: unique titles, meta descriptions, FAQ schema markup, clean URLs
- Mobile-responsive design throughout
- Reusable component system
- All calculations run client-side (no API calls needed)

## Brand
- Site name: "Run Calculator Hub" (configurable in Header.tsx and Footer.tsx)
- Domain: runcalculatorhub.com
- Primary color: Deep blue (HSL 215 84% 42%)
- Cards: White on light gray-blue background
- Font: Inter

## Running
- `npm run dev` starts Express + Vite dev server on port 5000

## Future Expansion Ready
- Structure supports adding: VO2 Max Calculator, Heart Rate Zone Calculator, Calories Burned Calculator, Stride Length Calculator, Cadence Calculator, Shoe Mileage Tracker
