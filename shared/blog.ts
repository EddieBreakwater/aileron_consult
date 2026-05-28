/**
 * 15 pre-written AileronMD Consult blog posts (markdown body).
 * Used by both the Insights list page and the individual post page.
 */

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  readingTimeMin: number;
  category: string;
  body: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "i-dont-know-if-my-practice-is-doing-well",
    title: "“I Don’t Know If My Practice Is Actually Doing Well”",
    excerpt:
      "The confession nobody makes out loud. You have plenty of data — what you’re missing is context.",
    readingTimeMin: 6,
    category: "Operational Clarity",
    body: `## The Confession Nobody Makes Out Loud

It’s 11 PM on a Tuesday. You’re sitting at your desk, staring at your EHR dashboard. Revenue is up. Patient visits are up. Collections are up.

But something feels off.

You don’t know *why* it feels off. You just know you can’t shake the feeling that you’re missing something important.

Here’s the thing: **You probably are.**

Most practice leaders don’t actually know if their practice is performing well or poorly. Not because they’re bad at their jobs — but because they’re drowning in data and starving for context.

Your EHR gives you numbers. Lots of them. Revenue per provider. Days in A/R. No-show rates. Scheduling efficiency. Patient satisfaction scores. Operating expense ratios.

But it doesn’t tell you what any of it *means*.

Is 42 days in A/R good or bad? You have no idea. Is a 3.2 staff-to-provider ratio normal? You don’t know. Is an 8% no-show rate something to worry about? Could be. Could be fine.

So you do what most practice leaders do: You guess. You compare yourself to the one other practice you know. You ask peers at conferences. You hope you’re doing okay.

But you never really *know*.

## The Real Cost of Not Knowing

This uncertainty compounds. You make decisions based on incomplete information. You invest in the wrong areas. You miss opportunities to improve. You lose sleep wondering if you’re actually running a healthy practice.

And here’s the kicker: your staff can feel it. They sense the uncertainty. It trickles down into the culture.

## What You Actually Need

You don’t need more data. You need **context**:

- How am I performing compared to practices like mine?
- What’s actually good? What’s actually bad?
- Where should I focus my attention?
- What should I ignore?

You need someone who understands your specialty, knows what normal looks like, and can tell you plainly: *“You’re doing well here. You need to focus here. This is fine.”*

That’s exactly what AileronMD Consult does. Every month, you get a briefing that tells you how your practice compares to others in your specialty. Not generic healthcare benchmarks — actual data from actual practices like yours.

Suddenly, you know. You’re not guessing anymore.`,
  },
  {
    slug: "why-your-dashboard-is-making-you-dumber",
    title: "Why Your Dashboard Is Making You Dumber",
    excerpt:
      "The paradox of too much data — and why 47 metrics are worse than 5.",
    readingTimeMin: 5,
    category: "Decision Quality",
    body: `## The Paradox of Too Much Data

You spent $50k on a new practice management system. It has an amazing dashboard. Dozens of metrics. Beautiful visualizations. Real-time updates.

You log in every morning and feel… overwhelmed.

There are 47 different metrics staring at you. Revenue. Collections. No-shows. Scheduling efficiency. Patient satisfaction. Staff turnover. Operating expenses. Compliance rates.

Which ones matter? All of them? Some of them? You have no idea.

So you do what most people do: you ignore them. You check the dashboard once a month, see that revenue is up or down, and move on.

But here’s the problem: **you’re not actually making better decisions. You’re just drowning in data.**

## The Dashboard Trap

Dashboards are designed to show you *everything*. But everything is not what you need. What you need is *what matters*.

A good dashboard tells you 3–5 things that matter and why they matter. A bad dashboard tells you 47 things and assumes you’ll figure out which ones matter. Your EHR dashboard is the latter.

It’s not the dashboard’s fault. Dashboards are designed for IT people and analysts — they’re designed to be comprehensive, not to drive decisions for busy practice leaders.

## What You Actually Need

You need someone to look at all 47 metrics, figure out which 5 actually matter, and tell you plainly what’s happening. That’s what AileronMD Consult does — 16 KPIs across 6 domains, scored against your specialty benchmarks, with a clear ranked focus list every month.

No noise. No overwhelm. Just clarity.`,
  },
  {
    slug: "the-150k-question-do-you-need-a-fractional-coo",
    title: "The $150k Question: Do You Really Need a Fractional COO?",
    excerpt:
      "Hiring a COO feels like the only option. It almost never is.",
    readingTimeMin: 6,
    category: "Operating Model",
    body: `## When Hiring a COO Feels Like the Only Option

Your practice is growing. You’re seeing more patients. Revenue is up. But something’s breaking.

Scheduling is a mess. Staff turnover is climbing. Your A/R is creeping up. Patient satisfaction is slipping. You’re working 60-hour weeks and still feel behind. You think: *“I need a COO.”*

You find one. They’re expensive — $150k–$250k per year. But they know healthcare. You hire them. Month one, it’s great: good questions, careful analysis, thoughtful recommendations. Then… nothing changes. Or it changes slowly. Or it changes in ways you didn’t expect.

## The Real Problem with Hiring a COO

A fractional COO is **expensive, slow, and often ineffective**:

- **Expensive.** $150k–$250k per year is 15–20% of profit for many solo practices.
- **Slow.** It takes 3–6 months to learn your practice and another 3–6 to implement changes. A year before real results.
- **Generalist.** GI is nothing like primary care; orthopedics is nothing like optometry. A non-specialist will give advice that doesn’t fit.

## What You Actually Need

You don’t need someone on staff. You need **clarity and guidance** every month, in your specialty, with specific actions.

That’s exactly what AileronMD Consult does. For $199/month, you get a monthly briefing that tells you how your practice is performing, how you compare to others in your specialty, and what to focus on. No hiring. No 6-month ramp-up. No generalist advice that doesn’t fit your business.`,
  },
  {
    slug: "why-generic-healthcare-benchmarks-are-useless",
    title: "Why Generic Healthcare Benchmarks Are Useless",
    excerpt:
      "The MGMA report is too broad to be useful. Specialty-specific is the only way.",
    readingTimeMin: 5,
    category: "Benchmarking",
    body: `## The MGMA Problem

You buy the MGMA benchmarking report for $500–$1,000. It covers thousands of practices across all specialties.

You open it up and… it’s useless.

The report says median revenue per provider is $400k. But you’re a gastroenterology practice with procedures — yours is $600k. The benchmark doesn’t account for that.

It says median no-show rate is 6%. But you’re an orthopedic practice with a 2-week wait list, so yours is 12%. The benchmark doesn’t account for that.

It says median staff-to-provider ratio is 3.5. But you’re primary care with high admin overhead — yours is 4.2. The benchmark doesn’t account for that.

You’re comparing yourself to a generic average that doesn’t apply to your practice.

## What You Actually Need

You need **specialty-specific benchmarks** — practices in your specialty, with your business model. AileronMD Consult covers six specialties: Primary Care, Gastroenterology, Orthopedics, Hematology/Oncology, Optometry, and Ophthalmology — and every KPI is benchmarked against practices like yours, not the generic average.

Suddenly, the benchmarks actually mean something.`,
  },
  {
    slug: "the-ar-trap-how-your-practice-is-bleeding-cash",
    title: "The A/R Trap: How Your Practice Is Bleeding Cash",
    excerpt:
      "Every day in A/R is an interest-free loan you’re extending to your payers.",
    readingTimeMin: 5,
    category: "Revenue Cycle",
    body: `## The Silent Killer of Practice Profitability

Your practice is seeing more patients than ever. Revenue is up 15% year-over-year. You should be thrilled.

But your cash position is getting worse. More money coming in, less money in the bank. Something’s wrong.

You pull your A/R report. Days in A/R: 48 days. *“That doesn’t seem too bad.”*

Here’s what you don’t realize: every day you don’t collect is a day you’re giving an interest-free loan to your payers. With $500k in A/R at 48 days, that’s $500k sitting in limbo. Reduce that to 35 days and you free up roughly **$180k in cash**.

## Why A/R Creeps Up

Not because you’re bad at collections — because you’re not paying attention. Claims sit 30 days before submission. Payers take 20 to process. You take another 10 on denials. Suddenly you’re at 60 days and you didn’t notice because you’re focused on the next patient.

## What You Actually Need

You need to know your A/R days, the trend, and how you compare to practices like yours — and someone to tell you plainly: *“Your A/R is creeping up. Here’s what to do.”* That’s what your monthly AileronMD briefing is for.`,
  },
  {
    slug: "the-no-show-rate-nobody-talks-about",
    title: "The No-Show Rate Nobody Talks About",
    excerpt:
      "An 8% no-show rate is actually costing you 15% of revenue — here’s the math.",
    readingTimeMin: 4,
    category: "Access",
    body: `## Why 8% Is Actually 15%

You have an 8% no-show rate. That sounds fine.

But here’s the math:

- 100 appointments per week, 8 no-shows, $200/slot → **$1,600/week** in lost revenue
- Plus the opportunity cost of patients who could have filled those slots
- Plus wasted prepared rooms, blocked time, and idle staff

A nominal 8% no-show rate quietly bleeds **15–20% of potential revenue**.

## Why No-Shows Happen

The real reason is rarely transportation or memory — it’s that you’re not making it easy to show up. No reminders. No same-day confirmations. No friction-free reschedule path.

## What You Actually Need

Track the rate, the trend, and the specialty benchmark — and act on a clear monthly plan. That’s what AileronMD Consult delivers, every month, for less than the cost of one no-show.`,
  },
  {
    slug: "staff-turnover-is-costing-you-more-than-you-think",
    title: "Staff Turnover Is Costing You More Than You Think",
    excerpt:
      "Replacing one office manager runs $50k–$100k. The hidden cost is the disruption.",
    readingTimeMin: 5,
    category: "People",
    body: `## The Hidden Cost of Losing Good People

Your office manager quit last month. You were shocked — you thought she was happy.

Now you’re scrambling: covering her duties, training a new person, dealing with the chaos of transition. Replacing one good office manager typically runs **$50k–$100k**:

- Recruiting & hiring: $5k–$10k
- Training: $10k–$20k
- Lost productivity during ramp-up: $20k–$40k
- Errors during ramp: $5k–$10k
- Domino turnover (when one leaves, others follow): $5k–$10k

## Why It Happens

People feel undervalued, underpaid, or unsupported — and you usually don’t know which until they’re gone. That visibility gap is what AileronMD Consult closes: a monthly read on staff retention, training investment, and turnover risk against your specialty median.`,
  },
  {
    slug: "scheduling-efficiency-is-not-what-you-think-it-is",
    title: "Scheduling Efficiency Is Not What You Think It Is",
    excerpt:
      "Full schedules are not productive schedules. The right metric is utilization, not booking.",
    readingTimeMin: 5,
    category: "Access",
    body: `## Full ≠ Productive

Your schedule is full. You should be running at peak productivity. So why does revenue per provider feel flat?

Because **scheduling efficiency** is not the same as a full schedule. It’s the ratio of *productive* time to *available* time — and most practices conflate the two.

A 90% booking rate with a 6% no-show rate, an 18-day third-next-available, and 20-minute slot lengths can produce a 65% effective utilization. The schedule looks great. The economics don’t.

## What to Watch

Pair these three together every month: provider utilization, third-next-available, and no-show rate. If utilization is flat while bookings rise, you have a slot-sizing or panel problem, not a demand problem.

That’s the kind of read your AileronMD briefing makes obvious — without you having to assemble it yourself.`,
  },
  {
    slug: "why-revenue-per-provider-is-the-only-revenue-metric-that-matters",
    title: "Why Revenue per Provider Is the Only Revenue Metric That Matters",
    excerpt:
      "Total revenue rewards growth in headcount. Revenue per provider rewards growth in productivity.",
    readingTimeMin: 4,
    category: "Revenue Cycle",
    body: `## Total Revenue Lies. Revenue per Provider Doesn’t.

You can grow total revenue by adding providers. But that’s not the same as building a healthier practice — it can mask declining productivity per FTE.

**Revenue per provider** strips that out. It tells you whether each clinician is generating more economic output this month than last. It’s the only revenue metric that holds you accountable to *productivity*, not just *headcount*.

## How to Use It

Every month, watch revenue per provider against your specialty median. If it’s rising while utilization is flat, you’re probably under-coding or under-pricing. If it’s rising while no-show rate is rising, you have a quality-of-access problem coming. AileronMD makes those tradeoffs visible in plain English.`,
  },
  {
    slug: "the-collection-rate-illusion",
    title: "The Collection Rate Illusion",
    excerpt:
      "A 96% net collection rate is excellent — until you look at the 4% you’re losing.",
    readingTimeMin: 4,
    category: "Revenue Cycle",
    body: `## What 96% Actually Means

Your net collection rate is 96%. That sounds excellent. And it is — *unless* you do the math on the 4% you’re losing.

For a $5M practice, 4% is **$200k a year** going uncollected. Worse, it’s rarely random: it concentrates in a small set of payers, codes, and front-desk workflows that, once identified, are usually fixable in one quarter.

## What to Track Together

Net collection rate is meaningful only when paired with contractual adjustment rate and days in A/R. If collection rate is high but adjustments are creeping up, your contracts are eroding silently. That’s the read your monthly AileronMD briefing surfaces, with specialty-adjusted benchmarks.`,
  },
  {
    slug: "patient-satisfaction-isnt-soft-it-is-financial",
    title: "Patient Satisfaction Isn’t Soft — It’s Financial",
    excerpt:
      "A 0.4-point lift in NPS correlates with a 3–5% lift in retention. Here’s why that matters.",
    readingTimeMin: 4,
    category: "Resilience",
    body: `## The Hard Math Behind Soft Metrics

Practice leaders often dismiss patient satisfaction as “soft.” The data says otherwise.

A 0.4-point lift in patient satisfaction (on a 5-point scale) is consistently associated with a **3–5% lift in retention** and a **5–7% lift in referral volume**. For a $5M practice, that’s $150k–$350k of stable, recurring economics — not soft, financial.

## What to Track

Trend the score, segment by visit type, and pair it with no-show rate. A rising no-show rate alongside a falling satisfaction score is an early signal of access friction. That kind of cross-metric read is built into every AileronMD monthly briefing.`,
  },
  {
    slug: "the-cms-rate-update-most-practices-miss",
    title: "The CMS Rate Update Most Practices Miss",
    excerpt:
      "Federal rate updates aren’t automatic at every payer. Here’s the 30-day playbook.",
    readingTimeMin: 5,
    category: "Payer Contracts",
    body: `## Why Most Practices Miss CMS Updates

CMS announces a rate update. You assume it flows through. It often doesn’t — many commercial plans require a contract amendment to adopt new CMS schedules. Without action, you absorb a silent rate decrease while CMS thinks it gave you a raise.

## The 30-Day Playbook

1. Identify your top 10 payers and group them: *automatic*, *amendment-required*, *negotiated*.
2. For amendment-required, send the request the month CMS publishes the rule.
3. For negotiated, prepare a one-pager: volume, quality scores, retention.
4. On effective date, audit the first 100 claims to confirm capture.

AileronMD’s briefing flags this every quarter so you don’t miss the window.`,
  },
  {
    slug: "your-staff-to-provider-ratio-is-telling-you-something",
    title: "Your Staff-to-Provider Ratio Is Telling You Something",
    excerpt:
      "It’s either strategic capacity for growth — or pure overhead. Decide which.",
    readingTimeMin: 4,
    category: "People",
    body: `## A 3.2 Ratio Is Not a Verdict

A staff-to-provider ratio of 3.2 isn’t inherently good or bad. It’s **either** strategic capacity for growth **or** pure overhead — and you have to pick.

If it’s strategic, tie it to a measurable target: new patient acquisition, third-next-available, or provider utilization. If it’s overhead, you have a 90-day decision to make.

## A Simple Test

Ask: *if I held the ratio constant for the next 12 months, what specific KPI would I expect to improve?* If you can’t name one, the ratio is overhead, not strategy.`,
  },
  {
    slug: "telehealth-intake-the-cheapest-growth-lever-in-medicine",
    title: "Telehealth Intake: The Cheapest Growth Lever in Medicine",
    excerpt:
      "A 15-minute virtual intake reduces friction, shortens wait times, and lifts conversion.",
    readingTimeMin: 4,
    category: "Growth",
    body: `## Why It Works

A 15-minute virtual new-patient intake removes three frictions at once: travel, time off work, and scheduling lag. Practices piloting this report **15–20% lifts in new-patient volume** and a 2–3 day drop in third-next-available.

## How to Pilot

Pick one provider, one half-day per week, and a single chief complaint. Track conversion, no-show rate, and downstream visit volume for 60 days. If conversion holds, scale. AileronMD will track the lift in your monthly briefing automatically.`,
  },
  {
    slug: "the-monthly-briefing-as-an-operating-rhythm",
    title: "The Monthly Briefing as an Operating Rhythm",
    excerpt:
      "Cadence beats intensity. The practices that compound are the ones with a steady monthly read.",
    readingTimeMin: 5,
    category: "Operating Model",
    body: `## Cadence Beats Intensity

The best-run practices we’ve worked with don’t do quarterly off-sites or annual strategy retreats. They do **30 minutes a month, every month**, on the same five questions:

1. What changed?
2. What’s above benchmark?
3. What’s below?
4. What three things will we act on?
5. What did last month’s actions actually move?

Done consistently for 12 months, this routine is worth more than any one-off consulting engagement. AileronMD’s monthly briefing exists to make that routine effortless.`,
  },
];
