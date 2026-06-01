import { PublicLayout } from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import {
  ArrowRight,
  Compass,
  FileText,
  Gauge,
  Quote,
  ShieldCheck,
  Target,
  TrendingUp,
} from "lucide-react";
import { Link } from "wouter";

const VALUE_PILLARS = [
  {
    icon: Compass,
    title: "A direction, not a dashboard.",
    body: "You'll know — in plain English — whether the practice is healthier than last month, what improved, and what slipped. No 47-tile dashboards. No metric scavenger hunt.",
  },
  {
    icon: Target,
    title: "Three things to focus on.",
    body: "Every briefing closes with three ranked actions for the next thirty days. Not a backlog. Not a wishlist. The three operational moves with the highest expected return for your specialty, your size, and your moment.",
  },
  {
    icon: TrendingUp,
    title: "Specialty-true benchmarks.",
    body: "Your numbers are read against peers in your specialty — primary care vs. primary care, orthopedics vs. orthopedics. A 6% no-show rate means very different things across specialties, and your briefing reflects that.",
  },
  {
    icon: Gauge,
    title: "Decisions, faster.",
    body: "Most owners read the briefing in twenty minutes and finish with a clear answer to the question they came in with — should I hire, renegotiate, change scheduling, or hold? You leave with a decision, not more reading to do.",
  },
  {
    icon: ShieldCheck,
    title: "A second set of eyes.",
    body: "A fractional COO is a $200k bet that takes six months to ramp. AileronMD gives you the operating layer most independent practices actually need: a senior advisor reviewing your numbers every month and putting them in context.",
  },
  {
    icon: FileText,
    title: "A record that compounds.",
    body: "Twelve briefings later, you have a written history of what you tried, what worked, and what the practice looked like at each turn. Partners, lenders, and successors can read the story in an afternoon.",
  },
];

const OUTCOMES = [
  {
    metric: "Days in A/R",
    before: "44",
    after: "36",
    note: "Eight days back into the practice — typically $40k–$120k of working capital, depending on charge volume.",
  },
  {
    metric: "Net collection rate",
    before: "94.1%",
    after: "96.4%",
    note: "Two and a half points of revenue you were already entitled to, recovered through targeted denial-cause work.",
  },
  {
    metric: "No-show rate",
    before: "8.2%",
    after: "6.8%",
    note: "About one extra patient per provider per day — the difference between a quiet Friday and a clean schedule.",
  },
  {
    metric: "Third next available",
    before: "11 days",
    after: "6 days",
    note: "Faster access wins payer scorecards, lifts new-patient capture, and quietly fixes most no-show problems.",
  },
];

export default function HowItWorks() {
  useDocumentTitle(
    "What You Get \u2014 The AileronMD Briefing",
    "What you get from AileronMD Consult: a monthly written briefing, specialty-true benchmarks, three ranked actions, and a senior advisor reading your numbers in context.",
  );

  return (
    <PublicLayout>
      {/* HERO — value-first */}
      <section className="border-b border-border/60 bg-secondary/30">
        <div className="container py-20">
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                What you get
              </div>
              <h1 className="mt-3 font-serif text-4xl tracking-tight text-primary md:text-5xl">
                Twenty minutes a month.
                <br />
                <span className="text-accent">A clearer practice every month after.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
                You enter the same handful of numbers your EHR already produces. In return,
                you get a written briefing that tells you what those numbers mean,
                where you stand against peers in your specialty, and the three operational
                moves most likely to matter over the next thirty days.
              </p>
            </div>
            <div className="md:col-span-4">
              <div className="rounded-xl border border-border/60 bg-card p-6">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Each month, you receive
                </div>
                <ul className="mt-4 space-y-2.5 text-sm text-foreground/85">
                  <li className="flex gap-2.5">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    A 3-paragraph executive read on the month
                  </li>
                  <li className="flex gap-2.5">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    A scorecard against specialty peer medians
                  </li>
                  <li className="flex gap-2.5">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    Three ranked actions for the next 30 days
                  </li>
                  <li className="flex gap-2.5">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    A flag list — what to watch before next month
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PILLARS */}
      <section className="border-b border-border/60">
        <div className="container py-20">
          <div className="max-w-2xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              The shape of the value
            </div>
            <h2 className="mt-3 font-serif text-3xl tracking-tight text-primary md:text-4xl">
              Six things you stop carrying alone.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {VALUE_PILLARS.map(({ icon: Icon, title, body }) => (
              <article
                key={title}
                className="rounded-xl border border-border/70 bg-card p-7"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-serif text-xl text-primary">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* THE ADVISOR */}
      <section className="border-b border-border/60 bg-secondary/30">
        <div className="container py-20">
          <div className="grid gap-12 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                Your senior advisor
              </div>
              <h2 className="mt-3 font-serif text-3xl tracking-tight text-primary md:text-4xl">
                Every briefing is read, written, and curated by a physician-trained advisor.
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground">
                <p>
                  AileronMD Consult is not a self-serve dashboard and not a software product
                  pretending to be a consultant. Your numbers are reviewed each month by a
                  senior advisor who understands medical practice operations, the realities of
                  independent ownership, and the specialty you actually run.
                </p>
                <p>
                  The advisor reads your figures against the specialty benchmark library, weighs
                  the context only you would know — payer changes, hiring transitions, schedule
                  shifts, seasonal effects — and writes the briefing in a voice physicians
                  trust: direct, specific, and willing to take a position.
                </p>
                <p>
                  You'll know who is reading your numbers. The advisor's name is on the
                  briefing. Questions go to a real person, not a help desk queue.
                </p>
              </div>
            </div>
            <div className="md:col-span-5">
              <figure className="relative rounded-2xl border border-border/70 bg-card p-8 shadow-[0_30px_60px_-30px_oklch(0.500_0.080_197/0.25)]">
                <Quote className="h-7 w-7 text-accent/60" />
                <blockquote className="mt-4 font-serif text-xl leading-8 text-primary">
                  &ldquo;The thing my partners and I were paying $14k a quarter for, written
                  in language we'd actually circulate at a Tuesday meeting.&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-border/60 pt-4 text-xs">
                  <div className="font-semibold text-foreground">Managing Partner</div>
                  <div className="text-muted-foreground">Three-physician primary care practice</div>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* OUTCOMES TABLE */}
      <section className="border-b border-border/60">
        <div className="container py-20">
          <div className="max-w-2xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              The kind of moves the briefing surfaces
            </div>
            <h2 className="mt-3 font-serif text-3xl tracking-tight text-primary md:text-4xl">
              Small numbers, real money.
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              These aren't promises — they're the kind of shifts our beta clients have made
              over a six-month engagement when they followed the focus list. The compounding
              effect is meaningful: most independent practices leave more on the table in
              operations than they earn in any single specialty contract negotiation.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-xl border border-border/70 bg-card">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/60 bg-secondary/40 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  <th className="px-6 py-4">KPI</th>
                  <th className="px-6 py-4">Month 1</th>
                  <th className="px-6 py-4">Month 6</th>
                  <th className="px-6 py-4">Why it matters</th>
                </tr>
              </thead>
              <tbody>
                {OUTCOMES.map(o => (
                  <tr key={o.metric} className="border-b border-border/60 last:border-0">
                    <td className="px-6 py-5 align-top font-medium text-primary">{o.metric}</td>
                    <td className="num px-6 py-5 align-top font-serif text-base text-muted-foreground">
                      {o.before}
                    </td>
                    <td className="num px-6 py-5 align-top font-serif text-base text-accent">
                      {o.after}
                    </td>
                    <td className="px-6 py-5 align-top text-muted-foreground">{o.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="container py-16 text-center">
          <h2 className="font-serif text-3xl tracking-tight md:text-4xl">
            Read a real briefing before you commit.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-primary-foreground/85">
            The first thirty days are free. Submit one month of numbers, read your first
            briefing, and decide whether it's worth keeping. Most clients keep it.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Link href="/pricing">
              Start a 30-day trial <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
}
