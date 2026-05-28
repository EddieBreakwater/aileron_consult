import { PublicLayout } from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

const STEPS = [
  {
    days: "Day 1–5",
    title: "Submit your numbers",
    detail:
      "You log in once a month and enter sixteen KPIs across six domains. Most clients copy the numbers straight from EHR reports in under twenty minutes. We ship a one-page reporting guide for each specialty so your office manager knows exactly which report yields which figure.",
  },
  {
    days: "Day 6–10",
    title: "Benchmark + AI draft",
    detail:
      "Your figures are scored against specialty peers and the AileronMD benchmark library. The system drafts a narrative that reads how a senior advisor would write — three to four paragraphs, with a clear position on what changed and why.",
  },
  {
    days: "Day 11–15",
    title: "Senior review",
    detail:
      "A senior advisor reads every draft. They check for context the model couldn’t see — payer changes, hiring transitions, seasonal effects — and rewrite where needed. The briefing arrives written, not generated.",
  },
  {
    days: "Day 16–20",
    title: "You read the briefing",
    detail:
      "Three sections, in order: an executive summary, a KPI scorecard, and three to four ranked recommendations. The whole thing reads in under thirty minutes. Most clients finish before their second coffee.",
  },
];

export default function HowItWorks() {
  return (
    <PublicLayout>
      <section className="border-b border-border/60 bg-secondary/30">
        <div className="container py-20">
          <div className="max-w-3xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              The cadence
            </div>
            <h1 className="mt-3 font-serif text-4xl tracking-tight text-primary md:text-5xl">
              Twenty days. Four steps. One briefing you’ll actually read.
            </h1>
            <p className="mt-5 text-base leading-7 text-muted-foreground">
              The shape of the month is what makes this work. Every cycle follows the same beats,
              so your team builds operating muscle instead of reacting to noise.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container py-20">
          <ol className="relative space-y-10 border-l-2 border-border/60 pl-8">
            {STEPS.map((s, i) => (
              <li key={s.title} className="relative">
                <div className="absolute -left-[42px] top-1 flex h-9 w-9 items-center justify-center rounded-full border border-primary/20 bg-background font-mono text-sm font-semibold text-primary">
                  {i + 1}
                </div>
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                  {s.days}
                </div>
                <h3 className="mt-1 font-serif text-2xl text-primary">{s.title}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">{s.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border/60 bg-primary text-primary-foreground">
        <div className="container py-16 text-center">
          <h2 className="font-serif text-3xl tracking-tight md:text-4xl">
            See a real briefing for your specialty.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-primary-foreground/85">
            Start a trial, submit one month of numbers, read your first briefing. If it isn’t worth
            $199, you don’t pay.
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
