import { AileronMark } from "@/components/AileronMark";
import { PublicLayout } from "@/components/PublicLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { SPECIALTIES } from "@shared/aileron";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { trpc } from "@/lib/trpc";
import {
  ArrowRight,
  ArrowUpRight,
  ClipboardCheck,
  LineChart,
  Sparkles,
} from "lucide-react";
import { Link } from "wouter";

const PAIN_POINTS = [
  {
    title: "“I don’t know if my practice is doing well.”",
    body: "EHR dashboards give you 47 metrics with no context. You need 5 that actually matter — and someone to tell you what they mean.",
  },
  {
    title: "MGMA reports are too broad to act on.",
    body: "A 6% no-show rate means very different things in primary care versus orthopedics. Generic benchmarks lead to generic decisions.",
  },
  {
    title: "A fractional COO is a $200k bet.",
    body: "And it takes six months to ramp before you see a recommendation. Most practices need monthly clarity, not a new payroll line.",
  },
];

const TIMELINE = [
  {
    title: "You submit your numbers",
    body: "Sixteen KPIs, copied straight from your EHR in about twenty minutes.",
    icon: ClipboardCheck,
  },
  {
    title: "You get analysis and tactics",
    body: "A senior advisor scores the month against your specialty, writes the briefing, and hands you a scorecard plus three ranked actions worth doing next.",
    icon: Sparkles,
  },
];

export default function Home() {
  useDocumentTitle(
    "AileronMD Consult \u2014 Operational Briefings",
    "Monthly, specialty-benchmarked operational briefings for physician practices. Plain-English advice, a scorecard, and a ranked focus list.",
  );
  const blog = trpc.blog.list.useQuery();

  return (
    <PublicLayout>
      {/* HERO */}
      <section className="aileron-grid-bg relative overflow-hidden border-b border-border/60">
        <div className="container relative py-24 md:py-32">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Badge
                variant="outline"
                className="mb-6 border-accent/40 bg-accent/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-accent"
              >
                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-accent" />
                Operational guidance for physician leadership
              </Badge>
              <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-primary md:text-6xl">
                Clarity, where the
                <br />
                <span className="text-accent">numbers used to blur.</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-foreground/75">
                Running an independent practice means making consequential decisions on
                fragmented data. AileronMD turns the figures you already have into a monthly
                briefing you can actually use — read in your specialty’s context, written
                by a senior advisor, and pointed at the few things that will move the practice
                this month.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/92"
                >
                  <Link href="/pricing">
                    Start a 30-day trial
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary/20 bg-background/80 text-primary hover:bg-primary/5"
                >
                  <Link href="/how-it-works">See what you get</Link>
                </Button>
                <a
                  href={getLoginUrl()}
                  className="ml-1 text-sm font-medium text-foreground/65 underline-offset-4 hover:text-primary hover:underline"
                >
                  Already a client → Sign in
                </a>
              </div>

              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {SPECIALTIES.map(s => (
                  <Link
                    key={s.slug}
                    href={`/specialties#${s.slug}`}
                    className="underline-offset-4 transition-colors hover:text-accent hover:underline"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Briefing preview card */}
            <div className="lg:col-span-5">
              <div className="lift relative rounded-2xl border border-border/70 bg-card p-7 shadow-[0_30px_60px_-30px_oklch(0.339_0.057_244/0.35)]">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
                      Monthly Briefing
                    </div>
                    <div className="mt-1 font-serif text-xl leading-tight text-primary">
                      Mason Family Medicine
                      <br />
                      <span className="text-foreground/70">May 2026</span>
                    </div>
                  </div>
                  <AileronMark className="h-9 w-9 text-accent" />
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <PreviewKpi label="Days in A/R" value="36" trend="-4" good />
                  <PreviewKpi label="No-show" value="6.8%" trend="-0.4" good />
                  <PreviewKpi label="Net Collection" value="96.4%" trend="+0.6" good />
                </div>

                <div className="mt-6 space-y-3 text-sm leading-6 text-foreground/85">
                  <p>
                    <span className="font-semibold text-primary">Mason</span> closed May with twelve
                    KPIs on band, three on watch, and one flag worth your attention this month.
                  </p>
                  <p className="text-muted-foreground">
                    Days in A/R fell to 36, four days under last month and now under your specialty
                    median for the first time this year. The one flag, third-next-available, is at
                    nine days versus your peer median of six…
                  </p>
                </div>

                <div className="mt-6 rounded-lg border border-accent/20 bg-accent/5 p-4">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                    This month, focus on
                  </div>
                  <ol className="mt-2 space-y-1 text-sm text-foreground/85">
                    <li>1. Reduce third-next-available toward six days.</li>
                    <li>2. Hold the gain on Days in A/R.</li>
                    <li>3. Pilot one telehealth intake half-day.</li>
                  </ol>
                </div>

                <div className="mt-5 text-right">
                  <Link
                    href="/how-it-works"
                    className="inline-flex items-center text-xs font-medium text-primary hover:text-accent"
                  >
                    See a full briefing <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="border-b border-border/60 bg-secondary/30">
        <div className="container py-20">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl tracking-tight text-primary md:text-4xl">
              Practices don’t have a data problem.
              <span className="text-accent"> They have a context problem.</span>
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PAIN_POINTS.map(p => (
              <article
                key={p.title}
                className="lift rounded-xl border border-border/70 bg-background p-7"
              >
                <div className="font-serif text-lg leading-snug text-primary">{p.title}</div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS / TIMELINE */}
      <section className="border-b border-border/60">
        <div className="container py-24">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                How it works
              </div>
              <h2 className="mt-3 font-serif text-3xl tracking-tight text-primary md:text-4xl">
                You send the data.
                <br />
                We send the answers.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">
                You provide the numbers; we provide the analysis and the tactics. No dashboards to
                tend, no reports to assemble.
              </p>
              <Button
                asChild
                variant="outline"
                className="mt-7 border-primary/20 text-primary hover:bg-primary/5"
              >
                <Link href="/how-it-works">
                  See the full value
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="space-y-5 lg:col-span-8">
              {TIMELINE.map(step => {
                const Icon = step.icon;
                return (
                  <article
                    key={step.title}
                    className="lift flex gap-6 rounded-xl border border-border/70 bg-card p-6"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-xl text-primary">{step.title}</h3>
                      <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{step.body}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="border-b border-border/60 bg-primary text-primary-foreground">
        <div className="container py-20">
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-foreground/80">
                One number, one decision
              </div>
              <h2 className="mt-3 font-serif text-4xl tracking-tight md:text-5xl">
                $199 per month, per practice.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-primary-foreground/85">
                Solo practice flat rate. Group rate at $349 per month covers up to ten providers.
                Cancel any time. Your historical briefings are yours forever.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-7">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-foreground/85">
                  What’s included
                </div>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>One monthly briefing, narrative + scorecard + ranked actions</li>
                  <li>Specialty-benchmarked KPIs — yours, not the industry average</li>
                  <li>Briefing history archive across the entire engagement</li>
                  <li>Office-hours email support, two business days</li>
                </ul>
                <div className="mt-6 flex gap-3">
                  <Button
                    asChild
                    size="lg"
                    variant="secondary"
                    className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  >
                    <Link href="/pricing">See pricing</Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    <Link href="/contact">Talk to us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INSIGHTS PREVIEW */}
      <section>
        <div className="container py-24">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                Insights
              </div>
              <h2 className="mt-3 font-serif text-3xl tracking-tight text-primary md:text-4xl">
                Real problems. Plain answers.
              </h2>
            </div>
            <Link
              href="/insights"
              className="hidden items-center text-sm font-medium text-primary hover:text-accent md:inline-flex"
            >
              View all 15 posts <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {(blog.data ?? []).slice(0, 3).map(post => (
              <Link key={post.slug} href={`/insights/${post.slug}`}>
                <article className="lift h-full rounded-xl border border-border/70 bg-card p-6">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                    {post.category}
                  </div>
                  <h3 className="mt-3 font-serif text-lg leading-snug text-primary">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{post.readingTimeMin} min read</span>
                    <ArrowUpRight className="h-4 w-4 text-primary" />
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Link href="/insights" className="text-sm font-medium text-primary">
              View all 15 posts →
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-border/60 bg-secondary/30">
        <div className="container py-20 text-center">
          <LineChart className="mx-auto h-9 w-9 text-accent" />
          <h2 className="mt-5 font-serif text-3xl tracking-tight text-primary md:text-4xl">
            Stop guessing whether your practice is doing well.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            Join the next cohort. We onboard a small number of practices each month so every
            briefing gets a senior set of eyes before it ships.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/92"
            >
              <Link href="/pricing">Start a 30-day trial</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Schedule a discovery consult</Link>
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

function PreviewKpi({
  label,
  value,
  trend,
  good,
}: {
  label: string;
  value: string;
  trend: string;
  good?: boolean;
}) {
  return (
    <div className="rounded-lg border border-border/60 bg-secondary/40 px-3 py-3">
      <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 num font-serif text-xl text-primary">{value}</div>
      <div
        className={`mt-0.5 num text-[11px] ${
          good ? "text-accent" : "text-destructive"
        }`}
      >
        {trend} vs prior
      </div>
    </div>
  );
}
