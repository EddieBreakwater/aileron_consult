import { AileronMark } from "@/components/AileronMark";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { FloatingParticles } from "@/components/FloatingParticles";
import { ScarcityCounter } from "@/components/ScarcityCounter";
import { PublicLayout } from "@/components/PublicLayout";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getLoginUrl, getSignupUrl } from "@/const";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { trpc } from "@/lib/trpc";
import { SPECIALTIES } from "@shared/aileron";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  LineChart,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";

// Typewriter effect for hero headline
function TypewriterText({ text, className }: { text: string; className?: string }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, 45);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className={className}>
      {displayed}
      {!done && <span className="animate-pulse text-accent">|</span>}
    </span>
  );
}

// Animated KPI card that counts up
function HeroKpiCard({
  label,
  end,
  suffix,
  trend,
  trendLabel,
  good,
  delay,
}: {
  label: string;
  end: number;
  suffix?: string;
  trend: string;
  trendLabel: string;
  good: boolean;
  delay: number;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const { display } = useAnimatedCounter({
    end,
    duration: 1800,
    decimals: suffix === "%" ? 1 : 0,
    suffix: suffix || "",
    enabled: visible,
  });

  return (
    <div
      className="glow-teal rounded-xl border border-border/60 bg-white/80 backdrop-blur-sm px-4 py-4 transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.95)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-1.5 font-serif text-2xl tabular-nums text-primary">
        {visible ? display : "0"}
      </div>
      <div className={`mt-1 flex items-center gap-1 text-[11px] font-medium ${good ? "text-accent" : "text-destructive"}`}>
        {good ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
        {trend} {trendLabel}
      </div>
    </div>
  );
}

const PAIN_POINTS = [
  {
    icon: BarChart3,
    title: "47 metrics. Zero context.",
    body: "Your EHR gives you everything except the one thing you need: which five numbers actually matter this month, and what to do about them.",
  },
  {
    icon: Target,
    title: "Generic benchmarks, generic decisions.",
    body: "A 6% no-show rate means very different things in primary care versus orthopedics. You need comparisons within your specialty, not across all of medicine.",
  },
  {
    icon: Zap,
    title: "A fractional COO costs $200k and six months.",
    body: "Most practices don't need another payroll line. They need monthly clarity from someone who already knows what good looks like in their specialty.",
  },
];

const STATS = [
  { value: 11, suffix: "", label: "Specialties covered" },
  { value: 16, suffix: "", label: "KPIs tracked monthly" },
  { value: 20, suffix: " min", label: "To submit your data" },
  { value: 96, suffix: "%", label: "Client retention rate" },
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
      <section className="hero-ambient relative overflow-hidden border-b border-border/40">
        <FloatingParticles />
        <div className="container relative py-28 md:py-36">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Badge
                variant="outline"
                className="animated-border mb-7 border-transparent bg-white/80 backdrop-blur-sm px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-accent"
              >
                <span className="mr-2 h-2 w-2 rounded-full bg-accent pulse-soft" />
                Operational guidance for physician leadership
              </Badge>

              <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-primary md:text-6xl lg:text-7xl">
                <TypewriterText text="Clarity, where the" />
                <br />
                <span className="gradient-text-teal">numbers used to blur.</span>
              </h1>

              <p className="mt-8 max-w-xl text-lg leading-8 text-foreground/75">
                Running an independent practice means making consequential decisions on
                fragmented data. AileronMD turns the figures you already have into a monthly
                briefing you can actually use. Read in your specialty's context, written
                by a senior advisor, pointed at the few things that will move the practice
                this month.
              </p>

              <div className="stagger-children mt-10 flex flex-wrap items-center gap-3">
                <Button
                  size="lg"
                  className="btn-press bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/92 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200"
                  onClick={() => (window.location.href = getSignupUrl())}
                >
                  Start a 30-day trial
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="btn-press border-primary/20 bg-white/80 backdrop-blur-sm text-primary hover:bg-primary/5 transition-all duration-200"
                >
                  <Link href="/how-it-works">See what you get</Link>
                </Button>
                <a
                  href={getLoginUrl()}
                  className="ml-1 text-sm font-medium text-foreground/65 underline-offset-4 hover:text-primary hover:underline transition-colors"
                >
                  Already a client? Sign in
                </a>
              </div>

              <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                {SPECIALTIES.map((s, i) => (
                  <Link
                    key={s.slug}
                    href={`/specialties#${s.slug}`}
                    className="underline-offset-4 transition-all duration-200 hover:text-accent hover:underline hover:translate-x-0.5"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Animated Briefing Preview Card */}
            <div className="lg:col-span-5">
              <div className="float relative rounded-2xl border border-border/50 bg-white/90 backdrop-blur-md p-7 shadow-[0_30px_80px_-20px_oklch(0.339_0.057_244/0.25)] glow-teal">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
                      Monthly Briefing
                    </div>
                    <div className="mt-1 font-serif text-xl leading-tight text-primary">
                      Mason Family Medicine
                      <br />
                      <span className="text-foreground/60">May 2026</span>
                    </div>
                  </div>
                  <AileronMark className="h-9 w-9 text-accent pulse-soft" />
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <HeroKpiCard label="Days in A/R" end={36} trend="-4" trendLabel="vs prior" good delay={800} />
                  <HeroKpiCard label="No-show" end={6.8} suffix="%" trend="-0.4" trendLabel="vs prior" good delay={1000} />
                  <HeroKpiCard label="Net Collection" end={96.4} suffix="%" trend="+0.6" trendLabel="vs prior" good delay={1200} />
                </div>

                <div className="mt-6 space-y-3 text-sm leading-6 text-foreground/85">
                  <p>
                    <span className="font-semibold text-primary">Mason</span> closed May with twelve
                    KPIs on band, three on watch, and one flag worth your attention this month.
                  </p>
                  <p className="text-muted-foreground">
                    Days in A/R fell to 36, four days under last month and now under your specialty
                    median for the first time this year...
                  </p>
                </div>

                <div className="mt-6 rounded-lg border border-accent/20 bg-accent/5 p-4 shimmer">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                    This month, focus on
                  </div>
                  <ol className="mt-2 space-y-1.5 text-sm text-foreground/85">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                      Reduce third-next-available toward six days.
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                      Hold the gain on Days in A/R.
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                      Pilot one telehealth intake half-day.
                    </li>
                  </ol>
                </div>

                <div className="mt-5 text-right">
                  <Link
                    href="/how-it-works"
                    className="inline-flex items-center text-xs font-medium text-primary hover:text-accent transition-colors"
                  >
                    See a full briefing <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="border-b border-border/40 bg-primary">
        <div className="container py-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {STATS.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 100} direction="up">
                <div className="text-center">
                  <div className="font-serif text-3xl text-white md:text-4xl">
                    <AnimatedCounter
                      end={stat.value}
                      suffix={stat.suffix}
                      duration={2200}
                      decimals={0}
                    />
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-[0.18em] text-white/60">
                    {stat.label}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="border-b border-border/40">
        <div className="container py-24">
          <ScrollReveal>
            <div className="max-w-2xl">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                The real problem
              </div>
              <h2 className="mt-3 font-serif text-3xl tracking-tight text-primary md:text-4xl lg:text-5xl">
                Practices don't have a data problem.
                <span className="gradient-text-teal"> They have a context problem.</span>
              </h2>
            </div>
          </ScrollReveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {PAIN_POINTS.map((p, i) => {
              const Icon = p.icon;
              return (
                <ScrollReveal key={p.title} delay={i * 120}>
                  <article className="group h-full rounded-2xl border border-border/50 bg-white p-8 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/8 text-accent transition-all duration-300 group-hover:bg-accent/15 group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 font-serif text-xl leading-snug text-primary">{p.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{p.body}</p>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-b border-border/40 bg-secondary/30">
        <div className="container py-24">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <ScrollReveal direction="left">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                  How it works
                </div>
                <h2 className="mt-3 font-serif text-3xl tracking-tight text-primary md:text-4xl">
                  You send the data.
                  <br />
                  <span className="gradient-text-teal">We send the answers.</span>
                </h2>
                <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">
                  You provide the numbers; we provide the analysis and the tactics. No dashboards to
                  tend, no reports to assemble.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="btn-press mt-8 border-primary/20 text-primary hover:bg-primary/5"
                >
                  <Link href="/how-it-works">
                    See the full value
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
              </ScrollReveal>
            </div>
            <div className="space-y-5 lg:col-span-7">
              <ScrollReveal delay={100}>
                <article className="group flex gap-6 rounded-2xl border border-border/50 bg-white p-7 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/8 text-primary transition-all duration-300 group-hover:bg-accent/10 group-hover:text-accent group-hover:scale-110">
                    <ClipboardCheck className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl text-primary">You submit your numbers</h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      Sixteen KPIs, copied straight from your EHR in about twenty minutes. We give you a guide for your exact system.
                    </p>
                  </div>
                </article>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <article className="group flex gap-6 rounded-2xl border border-border/50 bg-white p-7 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/8 text-primary transition-all duration-300 group-hover:bg-accent/10 group-hover:text-accent group-hover:scale-110">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl text-primary">You get analysis and tactics</h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      A senior advisor scores the month against your specialty, writes the briefing, and hands you a scorecard plus three ranked actions worth doing next.
                    </p>
                  </div>
                </article>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER COMPARISON */}
      <section className="border-b border-border/40">
        <div className="container py-24">
          <ScrollReveal>
            <div className="text-center">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                The difference
              </div>
              <h2 className="mt-3 font-serif text-3xl tracking-tight text-primary md:text-4xl">
                What changes in 90 days
              </h2>
            </div>
          </ScrollReveal>
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            <ScrollReveal delay={100}>
              <div className="rounded-2xl border border-border/70 bg-white p-8">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Before AileronMD
                </div>
                <ul className="mt-5 space-y-4">
                  {[
                    "Days in A/R: 44 days",
                    "Net Collection Rate: 94.1%",
                    "No-show Rate: 8.2%",
                    "Third-next-available: 12 days",
                    "Monthly review: skipped or ad-hoc",
                  ].map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="h-2 w-2 shrink-0 rounded-full bg-destructive/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={250}>
              <div className="rounded-2xl border border-accent/30 bg-accent/3 p-8 glow-teal">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                  After 90 days with AileronMD
                </div>
                <ul className="mt-5 space-y-4">
                  {[
                    "Days in A/R: 36 days (-18%)",
                    "Net Collection Rate: 96.4% (+2.3 pts)",
                    "No-show Rate: 6.1% (-2.1 pts)",
                    "Third-next-available: 6 days (-50%)",
                    "Monthly review: structured, 20-min read",
                  ].map(item => (
                    <li key={item} className="flex items-center gap-3 text-sm text-foreground/85">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="border-b border-border/40 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-accent/10 blur-2xl" />
        </div>
        <div className="container relative py-24">
          <ScrollReveal>
            <div className="grid items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-foreground/70">
                  One number, one decision
                </div>
                <h2 className="mt-3 font-serif text-4xl tracking-tight text-white md:text-5xl">
                  $199 per month, per practice.
                </h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-white/80">
                  Solo practice flat rate. Group rate at $349 per month covers up to ten providers.
                  Cancel any time. Your historical briefings are yours forever.
                </p>
              </div>
              <div className="lg:col-span-5">
                <div className="glass-dark rounded-2xl p-8">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                    What's included
                  </div>
                  <ul className="mt-4 space-y-3 text-sm text-white/85">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      One monthly briefing: narrative + scorecard + ranked actions
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      Specialty-benchmarked KPIs, not the industry average
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      Briefing history archive across the entire engagement
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      Office-hours email support, two business days
                    </li>
                  </ul>
                  <div className="mt-7 flex gap-3">
                    <Button
                      size="lg"
                      className="btn-press bg-white text-primary hover:bg-white/90 shadow-lg"
                      onClick={() => (window.location.href = getSignupUrl())}
                    >
                      Start trial
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="btn-press border-white/30 bg-transparent text-white hover:bg-white/10"
                    >
                      <Link href="/pricing">See pricing</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* INSIGHTS PREVIEW */}
      <section className="border-b border-border/40">
        <div className="container py-24">
          <ScrollReveal>
            <div className="mb-12 flex items-end justify-between">
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
                className="hidden items-center text-sm font-medium text-primary hover:text-accent transition-colors md:inline-flex"
              >
                View all 15 posts <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-3">
            {(blog.data ?? []).slice(0, 3).map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 120}>
                <Link href={`/insights/${post.slug}`}>
                  <article className="group h-full rounded-2xl border border-border/50 bg-white p-7 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                      {post.category}
                    </div>
                    <h3 className="mt-3 font-serif text-lg leading-snug text-primary group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
                    <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                      <span>{post.readingTimeMin} min read</span>
                      <ArrowUpRight className="h-4 w-4 text-primary group-hover:text-accent transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </article>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Link href="/insights" className="text-sm font-medium text-primary">
              View all 15 posts
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-secondary/30">
        <div className="container py-24 text-center">
          <ScrollReveal>
            <div className="mx-auto max-w-2xl">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
                <LineChart className="h-8 w-8 text-accent" />
              </div>
              <h2 className="mt-7 font-serif text-3xl tracking-tight text-primary md:text-4xl lg:text-5xl">
                Stop guessing whether your practice is doing well.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground">
                We onboard a small number of practices each month so every briefing gets a senior
                set of eyes before it ships. Join the next cohort.
              </p>
              <div className="mt-4 flex justify-center">
                <ScarcityCounter />
              </div>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Button
                  size="lg"
                  className="btn-press bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/92 hover:shadow-xl"
                  onClick={() => (window.location.href = getSignupUrl())}
                >
                  Start a 30-day trial
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
                <Button asChild size="lg" variant="outline" className="btn-press">
                  <Link href="/contact">Schedule a discovery consult</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PublicLayout>
  );
}
