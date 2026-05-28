# AileronMD Consult — Project TODO

## Foundation
- [x] Design tokens in `client/src/index.css` (Medical Navy, Surgical Teal, Clinical Aqua, Inter + Fraunces fonts)
- [x] Update `drizzle/schema.ts` with users, practices, kpiSubmissions, briefings, benchmarks
- [x] Run `pnpm db:push` to apply schema (5 tables verified)
- [x] Add shared constants (6 specialties, 16 KPI definitions, 15 blog posts) in `shared/`

## Backend
- [x] Database query helpers in `server/db.ts` (practices, kpiSubmissions, briefings, benchmarks)
- [x] tRPC router: `practice` (me, upsert)
- [x] tRPC router: `kpi` (submit, getByPeriod, latest, history)
- [x] tRPC router: `briefing` (latest, history, byId, generate via LLM)
- [x] tRPC router: `benchmark` (forSpecialty, all, seedIfEmpty)
- [x] tRPC router: `admin` (users, practices, submissions, briefings, benchmarks, generate, seed)
- [x] tRPC router: `blog` (list 15 posts, bySlug)
- [x] Vitest tests for KPI status logic, blog router, benchmark seeds (10 tests passing)

## Public Site
- [x] `Home.tsx` — Hero, sample briefing, pain points, specialties, CTA, blog previews
- [x] `Pricing.tsx` — $199 solo / $349 group tiers
- [x] `Specialties.tsx` — 6 specialty cards
- [x] `HowItWorks.tsx` — Day 1–5 / 6–15 / 16–20 timeline
- [x] `Insights.tsx` — Blog list (15 posts)
- [x] `BlogPost.tsx` — Individual blog post page
- [x] `Resources.tsx` — EHR Native Reporting Guide
- [x] `Contact.tsx` — Contact form

## Authenticated Client Area
- [x] `Dashboard.tsx` — Practice profile, KPI summary cards, navigation
- [x] `SubmitNumbers.tsx` — 16-KPI form across 6 domains with helper text
- [x] `Briefing.tsx` — Markdown narrative + KPI scorecard + bar/line charts
- [x] `BriefingHistory.tsx` — All past briefings with status indicators
- [x] Practice profile setup flow on first login

## Admin Console
- [x] `AdminPractices.tsx` — All practices list with search
- [x] `AdminSubmissions.tsx` — All KPI submissions with generate-briefing action
- [x] `AdminBriefings.tsx` — All briefings list
- [x] `AdminBenchmarks.tsx` — View benchmarks + seed/re-seed
- [x] `AdminUsers.tsx` — All users with role display

## Polish
- [x] Seed benchmark data for 6 specialties × 16 KPIs (96 rows in DB)
- [x] Routes registered in `App.tsx`
- [x] SiteHeader + SiteFooter for public pages
- [x] DashboardLayout for authenticated pages
- [x] Charts (bar and line) using Recharts with toggle
- [x] Markdown rendering with Streamdown
- [x] Final build/typecheck/test verification

## Brand Alignment (v2)
- [x] Replace AileronMark SVG with official "A + medical cross" wing logo
- [x] Update color palette to exact brand hex (Medical Navy #0B1E3A, Surgical Teal #0EA5A4, Clinical Aqua #7ED3D1, Soft Sage #A9CBB0, Mist Gray #F1F4F7)
- [x] Add Soft Sage as a third accent (chart-4) for on-band states
- [x] Update tagline to "Operational guidance for physician leadership." in footer
- [x] AileronMark used by SiteHeader, SiteFooter, DashboardLayout (shared component)
- [x] Newsreader serif font replacing Fraunces (no more squiggly f)
- [x] Per-page useDocumentTitle on Home, Pricing, Specialties, HowItWorks, Insights, BlogPost, Resources, Contact
- [x] Index.html keyword/OG/Twitter/canonical meta tags

## Specialties — reputable resources & briefings (v3)
- [x] Build curated resource list per specialty (MGMA, Becker's, AGA/ASGE/ACG, AAOS/AAOE, AAFP/ACP, AOA, AAO/ASCRS/ASRS, ASCO/ACCC/COA/ASH, KFF, CMS, Health Affairs)
- [x] Add a short "what's changing now" briefing for each specialty
- [x] Render links and trends panel on each specialty card on /specialties
- [x] Add SEO meta and titles for /specialties (30–60 chars) using useDocumentTitle
