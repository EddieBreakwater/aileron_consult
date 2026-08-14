import { AileronMark } from "@/components/AileronMark";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { FloatingParticles } from "@/components/FloatingParticles";
import { PublicLayout } from "@/components/PublicLayout";
import { ScarcityCounter } from "@/components/ScarcityCounter";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getLoginUrl, getSignupUrl } from "@/const";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { trpc } from "@/lib/trpc";
import { SPECIALTIES } from "@shared/aileron";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  CalendarCheck2,
  CheckCircle2,
  CircleDollarSign,
  ClipboardCheck,
  ReceiptText,
  Stethoscope,
  TrendingDown,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";

function TypewriterText({ text, className }: { text: string; className?: string }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = window.setInterval(() => {
      if (index <= text.length) {
        setDisplayed(text.slice(0, index));
        index += 1;
      } else {
        setDone(true);
        window.clearInterval(interval);
      }
    }, 38);
    return () => window.clearInterval(interval);
  }, [text]);

  return (
    <span className={className}>
      {displayed}
      {!done && <span className="animate-pulse text-accent">|</span>}
    </span>
  );
}

function BriefingKpi({
  label,
  end,
  suffix,
  change,
  trend,
  delay,
}: {
  label: string;
  end: number;
  suffix?: string;
  change: string;
  trend: "up" | "down";
  delay: number;
}) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const timeout = window.setTimeout(() => setReady(true), delay);
    return () => window.clearTimeout(timeout);
  }, [delay]);

  const { display } = useAnimatedCounter({
    end,
    suffix: suffix ?? "",
    decimals: suffix === "%" ? 1 : 0,
    enabled: ready,
    duration: 1450,
  });

  const Icon = trend === "down" ? TrendingDown : TrendingUp;
  return (
    <div
      className="rounded-xl border border-border/60 bg-white/85 px-4 py-4 transition-all duration-500"
      style={{
        opacity: ready ? 1 : 0,
        transform: ready ? "translateY(0)" : "translateY(10px)",
      }}
    >
      <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-2 font-serif text-2xl text-primary">{ready ? display : "—"}</div>
      <div className="mt-1 flex items-center gap-1 text-[11px] font-medium text-accent">
        <Icon className="h-3 w-3" /> {change} vs. prior month
      </div>
    </div>
  );
}

const OPERATING_MOMENTS = [
  {
    icon: CalendarCheck2,
    domain: "Access & schedule",
    signal: "11 days",
    label: "Third-next-available",
    question: "Where is the schedule getting stuck?",
    body: "A widening wait can point to template design, staffing, demand, or a mismatch between visit types and available time.",
  },
  {
    icon: ReceiptText,
    domain: "Revenue cycle",
    signal: "44 days",
    label: "Days in A/R",
    question: "What is holding cash past 30 days?",
    body: "Aging A/R can originate in charge lag, denials, payer behavior, or a follow-up queue that no longer matches the volume.",
  },
  {
    icon: UsersRound,
    domain: "Schedule integrity",
    signal: "8.2%",
    label: "No-show rate",
    question: "Which visits are most likely to leave empty slots?",
    body: "No-shows affect access, provider time, collections, and the workload of the team trying to refill a day in motion.",
  },
  {
    icon: Activity,
    domain: "Provider capacity",
    signal: "412",
    label: "RVUs per provider",
    question: "Is capacity being used where it matters?",
    body: "Productivity becomes useful when it is read beside visit mix, staffing, room capacity, and what the specialty actually demands.",
  },
];

const STATS = [
  { value: 11, suffix: "", label: "Specialties covered" },
  { value: 16, suffix: "", label: "KPIs in each monthly read" },
  { value: 6, suffix: "", label: "Operating domains" },
  { value: 20, suffix: " min", label: "To submit your numbers" },
];

const BRIEFING_STEPS = [
  {
    number: "01",
    title: "Read the month",
    body: "A concise advisor read identifies what improved, what slipped, and what changed enough to deserve a conversation.",
  },
  {
    number: "02",
    title: "See the context",
    body: "Your numbers sit beside specialty benchmarks and the operating conditions that influence them, not in a vacuum.",
  },
  {
    number: "03",
    title: "Set the next moves",
    body: "Three ranked actions turn the briefing into an agenda for the next leadership meeting, not another report to file away.",
  },
];

export default function Home() {
  useDocumentTitle(
    "AileronMD Consult — Practice Operations",
    "Operational guidance for physician leaders: a monthly specialty-benchmarked briefing for access, revenue cycle, schedule flow, and provider capacity.",
    { canonicalPath: "/" },
  );
  const blog = trpc.blog.list.useQuery();

  return (
    <PublicLayout>
      <section className="hero-ambient relative overflow-hidden border-b border-border/40">
        <FloatingParticles />
        <div className="container relative py-24 md:py-32 lg:py-36">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <Badge
                variant="outline"
                className="animated-border mb-7 border-transparent bg-white/80 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-accent backdrop-blur-sm"
              >
                <span className="mr-2 h-2 w-2 rounded-full bg-accent pulse-soft" />
                Operational guidance for physician leadership
              </Badge>

              <h1 className="font-serif text-5xl leading-[1.04] tracking-tight text-primary md:text-6xl lg:text-7xl">
                <TypewriterText text="Know what needs" />
                <br />
                <span className="gradient-text-teal">your attention next.</span>
              </h1>

              <p className="mt-8 max-w-xl text-lg leading-8 text-foreground/75">
                Your practice is making decisions every day: whether access is slipping,
                collections are slowing, schedules are holding, or capacity is being used well.
                AileronMD turns the figures already inside your EHR into an operating read you can
                use in the next partner meeting.
              </p>

              <div className="stagger-children mt-10 flex flex-wrap items-center gap-3">
                <Button
                  size="lg"
                  className="btn-press bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:bg-primary/92 hover:shadow-xl hover:shadow-primary/30"
                  onClick={() => (window.location.href = getSignupUrl())}
                >
                  Start your first operating read
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="btn-press border-primary/20 bg-white/80 text-primary backdrop-blur-sm transition-all duration-200 hover:bg-primary/5"
                >
                  <Link href="/how-it-works">See the briefing in action</Link>
                </Button>
                <a
                  href={getLoginUrl()}
                  className="ml-1 text-sm font-medium text-foreground/65 transition-colors hover:text-primary hover:underline hover:underline-offset-4"
                >
                  Already a client? Sign in
                </a>
              </div>

              <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                {SPECIALTIES.map(specialty => (
                  <Link
                    key={specialty.slug}
                    href={`/specialties#${specialty.slug}`}
                    className="underline-offset-4 transition-all duration-200 hover:translate-x-0.5 hover:text-accent hover:underline"
                  >
                    {specialty.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="float relative overflow-hidden rounded-2xl border border-border/50 bg-white/92 p-6 shadow-[0_30px_80px_-20px_oklch(0.339_0.057_244/0.25)] backdrop-blur-md glow-teal md:p-7">
                <div className="absolute right-0 top-0 h-36 w-36 rounded-full bg-accent/10 blur-3xl" />
                <div className="relative flex items-start justify-between">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
                      Sample operational read
                    </div>
                    <div className="mt-1 font-serif text-xl leading-tight text-primary">
                      Mason Family Medicine
                      <br />
                      <span className="text-foreground/60">May 2026</span>
                    </div>
                  </div>
                  <AileronMark className="h-10 w-10" />
                </div>

                <div className="relative mt-6 grid grid-cols-3 gap-3">
                  <BriefingKpi label="Days in A/R" end={31} change="-4 days" trend="down" delay={650} />
                  <BriefingKpi label="No-show" end={5} suffix="%" change="-0.8 pts" trend="down" delay={800} />
                  <BriefingKpi label="Net collection" end={96.4} suffix="%" change="+0.6 pts" trend="up" delay={950} />
                </div>

                <div className="relative mt-6 rounded-xl border border-primary/10 bg-primary/[0.03] p-4">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/60">This month&apos;s operating question</div>
                  <p className="mt-2 font-serif text-lg leading-6 text-primary">
                    Is access pressure coming from demand, templates, or an uneven schedule?
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Third-next-available widened while no-shows improved. Review two provider templates before adding another half-day.
                  </p>
                </div>

                <div className="relative mt-5 rounded-xl border border-accent/20 bg-accent/5 p-4">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">Bring to the next meeting</div>
                  <ol className="mt-2 space-y-1.5 text-sm leading-6 text-foreground/85">
                    <li className="flex gap-2"><CheckCircle2 className="mt-1 h-3.5 w-3.5 shrink-0 text-accent" />Test one schedule-template change.</li>
                    <li className="flex gap-2"><CheckCircle2 className="mt-1 h-3.5 w-3.5 shrink-0 text-accent" />Hold the A/R follow-up gain at 31 days.</li>
                    <li className="flex gap-2"><CheckCircle2 className="mt-1 h-3.5 w-3.5 shrink-0 text-accent" />Review new-patient conversion by referral source.</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/40 bg-primary">
        <div className="container py-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {STATS.map((stat, index) => (
              <ScrollReveal key={stat.label} delay={index * 80} direction="up">
                <div className="text-center">
                  <div className="font-serif text-3xl text-white md:text-4xl">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={1800} decimals={0} />
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-[0.16em] text-white/60">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-border/40 bg-secondary/25">
        <div className="container py-20 md:py-24">
          <ScrollReveal>
            <div className="mx-auto max-w-2xl text-center">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">See the deliverable</div>
              <h2 className="mt-3 font-serif text-3xl tracking-tight text-primary md:text-4xl lg:text-5xl">
                A clearer month, in just over a minute.
              </h2>
              <p className="mt-5 text-base leading-7 text-muted-foreground md:text-lg">
                See how a short KPI submission becomes a specialty-benchmarked scorecard, operational context, and a focused list of next moves.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={130}>
            <figure className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-2xl border border-primary/15 bg-primary shadow-[0_30px_80px_-24px_oklch(0.339_0.057_244/0.35)]">
              <video className="block aspect-video w-full bg-primary object-cover" controls playsInline preload="metadata" aria-label="AileronMD Consult value walkthrough">
                <source src="/manus-storage/aileron-value-video-branded-final_29121ff8.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <figcaption className="flex flex-col gap-1 border-t border-white/10 bg-primary px-6 py-4 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
                <span>What a monthly AileronMD Consult briefing brings into focus.</span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7ED3D1]">1 minute, 13 seconds</span>
              </figcaption>
            </figure>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-b border-border/40">
        <div className="container py-24">
          <ScrollReveal>
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">The work behind the numbers</div>
                <h2 className="mt-3 font-serif text-3xl tracking-tight text-primary md:text-4xl lg:text-5xl">
                  The questions that show up in a real practice meeting.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-muted-foreground lg:col-span-5 lg:justify-self-end">
                Every metric has an operating consequence. The briefing connects the signal to the decision, so a number becomes a useful conversation instead of another report.
              </p>
            </div>
          </ScrollReveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {OPERATING_MOMENTS.map((moment, index) => {
              const Icon = moment.icon;
              return (
                <ScrollReveal key={moment.domain} delay={index * 90}>
                  <article className="group h-full rounded-2xl border border-border/50 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/35 hover:shadow-xl hover:shadow-accent/5">
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">{moment.domain}</div>
                        <div className="mt-4 flex items-end gap-3">
                          <span className="font-serif text-4xl text-primary">{moment.signal}</span>
                          <span className="mb-1 text-xs font-medium text-muted-foreground">{moment.label}</span>
                        </div>
                      </div>
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/6 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-accent/12 group-hover:text-accent">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <p className="mt-5 text-sm leading-7 text-muted-foreground">{moment.body}</p>
                    <div className="mt-5 rounded-lg border border-accent/15 bg-accent/5 px-4 py-3 text-sm font-medium text-primary">{moment.question}</div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-border/40 bg-secondary/30">
        <div className="container py-24">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <ScrollReveal direction="left">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Inside the monthly briefing</div>
                <h2 className="mt-3 font-serif text-3xl tracking-tight text-primary md:text-4xl">A disciplined read of the practice, not more data to manage.</h2>
                <p className="mt-5 text-sm leading-7 text-muted-foreground">
                  You submit the numbers. A senior advisor turns the month into a practical read that keeps the leadership conversation focused on operating choices, not report production.
                </p>
                <Button asChild variant="outline" className="btn-press mt-8 border-primary/20 text-primary hover:bg-primary/5">
                  <Link href="/how-it-works">Explore what you get <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
                </Button>
              </ScrollReveal>
            </div>
            <div className="space-y-4 lg:col-span-7">
              {BRIEFING_STEPS.map((step, index) => (
                <ScrollReveal key={step.number} delay={index * 110} direction="right">
                  <article className="group flex gap-5 rounded-2xl border border-border/50 bg-white p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5">
                    <span className="font-serif text-3xl text-accent/70">{step.number}</span>
                    <div>
                      <h3 className="font-serif text-xl text-primary">{step.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">{step.body}</p>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/40 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-35">
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-accent/10 blur-2xl" />
        </div>
        <div className="container relative py-24">
          <ScrollReveal>
            <div className="grid items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-foreground/70">Built for the operating meeting</div>
                <h2 className="mt-3 font-serif text-4xl tracking-tight text-white md:text-5xl">One clear operating read, every month.</h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-white/80">
                  See access, revenue cycle, schedule integrity, and provider capacity in context, with a senior advisor pointing you toward the work that deserves attention now.
                </p>
              </div>
              <div className="lg:col-span-5">
                <div className="glass-dark rounded-2xl p-8">
                  <div className="flex items-center gap-3 text-[#7ED3D1]"><CircleDollarSign className="h-5 w-5" /><span className="text-[11px] font-semibold uppercase tracking-[0.18em]">Simple pricing</span></div>
                  <div className="mt-4 font-serif text-4xl text-white">$199 <span className="text-base text-white/60">/ month</span></div>
                  <p className="mt-3 text-sm leading-6 text-white/75">For solo practices. Group practices with up to ten providers start at $349 per month.</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button size="lg" className="btn-press bg-white text-primary hover:bg-white/90" onClick={() => (window.location.href = getSignupUrl())}>Start a 30-day trial</Button>
                    <Button asChild size="lg" variant="outline" className="btn-press border-white/30 bg-transparent text-white hover:bg-white/10"><Link href="/pricing">See pricing</Link></Button>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-b border-border/40">
        <div className="container py-24">
          <ScrollReveal>
            <div className="mb-12 flex items-end justify-between gap-6">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Insights</div>
                <h2 className="mt-3 font-serif text-3xl tracking-tight text-primary md:text-4xl">Real operations. Plain answers.</h2>
              </div>
              <Link href="/insights" className="hidden items-center text-sm font-medium text-primary transition-colors hover:text-accent md:inline-flex">Explore the library <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
            </div>
          </ScrollReveal>
          <div className="grid gap-6 md:grid-cols-3">
            {(blog.data ?? []).slice(0, 3).map((post, index) => (
              <ScrollReveal key={post.slug} delay={index * 100}>
                <Link href={`/insights/${post.slug}`}>
                  <article className="group h-full rounded-2xl border border-border/50 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">{post.category}</div>
                    <h3 className="mt-3 font-serif text-lg leading-snug text-primary transition-colors group-hover:text-accent">{post.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
                    <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground"><span>{post.readingTimeMin} min read</span><ArrowUpRight className="h-4 w-4 text-primary transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" /></div>
                  </article>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/30">
        <div className="container py-24 text-center">
          <ScrollReveal>
            <div className="mx-auto max-w-2xl">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10"><Stethoscope className="h-8 w-8 text-accent" /></div>
              <h2 className="mt-7 font-serif text-3xl tracking-tight text-primary md:text-4xl lg:text-5xl">Make the next operating meeting more useful.</h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground">Bring your current numbers. Leave with a structured read of access, collections, schedule flow, and capacity, plus the next three moves to discuss with your team.</p>
              <div className="mt-4 flex justify-center"><ScarcityCounter /></div>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Button size="lg" className="btn-press bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/92 hover:shadow-xl" onClick={() => (window.location.href = getSignupUrl())}>Start a 30-day trial <ArrowRight className="ml-1.5 h-4 w-4" /></Button>
                <Button asChild size="lg" variant="outline" className="btn-press"><Link href="/contact">Talk through your practice</Link></Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PublicLayout>
  );
}
