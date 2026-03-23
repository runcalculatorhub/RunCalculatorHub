# Run Calculator Hub - Running Tools & Pace Calculators

## Project Overview
A clean, fast, SEO-focused running tools website with a database-backed blog. Utility-first site designed to rank for running calculator and pace-related searches.

## Tech Stack
- **Frontend**: React + TypeScript, Vite, Wouter (routing), Tailwind CSS, shadcn/ui
- **Backend**: Express with PostgreSQL (Drizzle ORM), session-based admin auth
- **Database**: PostgreSQL for blog posts and sessions
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
│   ├── Blog.tsx         # Public blog listing
│   ├── BlogPost.tsx     # Individual blog post (markdown)
│   ├── Admin.tsx        # Admin auth wrapper
│   ├── AdminLogin.tsx   # Admin login form
│   ├── AdminDashboard.tsx # Blog post CRUD management
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
│   ├── PaceChartDetail.tsx
│   └── not-found.tsx
├── utils/
│   └── calculations.ts  # All running math (pace, splits, Riegel, VDOT)
└── App.tsx              # Router with all pages

server/
├── index.ts             # Express app setup
├── routes.ts            # API routes (blog CRUD, admin auth, sitemap, robots.txt)
├── storage.ts           # Database storage layer (Drizzle)
├── db.ts                # PostgreSQL connection
├── vite.ts              # Vite dev server setup
└── static.ts            # Static file serving (production)

shared/
└── schema.ts            # Drizzle schema (users, blog_posts) + Zod types
```

## Key Features
- 10 working calculator tools (marathon, half, 5K, 10K, general pace, race predictor, training paces, pace converter, split calculator, pace charts)
- Database-backed blog with admin dashboard at /admin
- SEO: unique titles, meta descriptions, FAQ schema markup, clean URLs, sitemap.xml, robots.txt
- Mobile-responsive design throughout
- Reusable component system
- Calculator computations run client-side (no API calls needed)

## Blog System
- **Admin**: Password-protected dashboard at `/admin` (uses ADMIN_PASSWORD env var)
- **Public**: Blog listing at `/blog`, individual posts at `/blog/:slug`
- **Content**: Markdown-based content rendered with react-markdown
- **SEO**: Each post has its own meta description; published posts added to sitemap.xml
- **Fields**: title, slug, content (markdown), meta description, published status, publish date

## Environment Variables
- `DATABASE_URL` - PostgreSQL connection string (auto-set by Replit)
- `ADMIN_PASSWORD` - Password for the /admin blog dashboard
- `SESSION_SECRET` - Session encryption secret

## Brand
- Site name: "Run Calculator Hub" (configurable in Header.tsx and Footer.tsx)
- Domain: runcalculatorhub.com
- Primary color: Deep blue (HSL 215 84% 42%)
- Cards: White on light gray-blue background
- Font: Inter

## Running
- `npm run dev` starts Express + Vite dev server on port 5000
- `npm run db:push` syncs database schema

## Future Expansion Ready
- Structure supports adding: VO2 Max Calculator, Heart Rate Zone Calculator, Calories Burned Calculator, Stride Length Calculator, Cadence Calculator, Shoe Mileage Tracker
