import { ScrollReveal } from "@/components/ScrollReveal";
import { VideoEmbed } from "@/components/VideoEmbed";
import { PublicLayout } from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { getSignupUrl } from "@/const";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import {
  Activity,
  ArrowRight,
  CalendarCheck2,
  ClipboardCheck,
  FileText,
  ReceiptText,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { Link } from "wouter";

const OPERATING_LENSES = [
  {
    icon: CalendarCheck2,
    title: "Access and schedule flow",
    signal: "Third-next-available, cancellations, fill rate, new-patient access",
    body: "Use the month to see whether patients are getting the right visit at the right time, and whether the template is helping or constraining the practice.",
  },
  {
    icon: ReceiptText,
    title: "Revenue-cycle discipline",
    signal: "Days in A/R, net collection, denial rate, charge lag",
    body: "Understand whether cash is being delayed by a payer, a process, a follow-up queue, or a specific point in the claim life cycle.",
  },
  {
    icon: UsersRound,
    title: "Team and appointment integrity",
    signal: "No-show rate, visit volume, new-patient conversion, staffing load",
    body: "See the operational pressure the front desk, clinical team, and providers are carrying before it becomes another difficult month.",
  },
  {
    icon: Activity,
    title: "Provider capacity and mix",
    signal: "RVUs, visits per provider, procedure mix, capacity utilization",
    body: "Read productivity with the context that makes it useful: room availability, visit mix, staffing, and the realities of your specialty.",
  },
];

const BRIEFING_CONTENT = [
  {
    number: "01",
    icon: FileText,
    title: "A written operating read",
    body: "A concise narrative identifies the signals that changed, why they matter, and the questions worth bringing into the next leadership conversation.",
  },
  {
    number: "02",
    icon: ShieldCheck,
    title: "Specialty context",
    body: "Your figures are reviewed against relevant specialty benchmarks so the team can distinguish ordinary variation from movement that needs attention.",
  },
  {
    number: "03",
    icon: ClipboardCheck,
    title: "Three next moves",
    body: "Each briefing closes with a ranked list of practical actions, turning the month into a focused agenda rather than an open-ended review.",
  },
];

export default function HowItWorks() {
  useDocumentTitle(
    "What You Get — Practice Operations Read",
    "AileronMD Consult turns monthly practice KPIs into a specialty-benchmarked operating read for access, revenue cycle, schedule flow, and provider capacity.",
    { canonicalPath: "/how-it-works" },
  );

  return (
    <PublicLayout>
      <section className="hero-ambient relative overflow-hidden border-b border-border/40">
        <div className="container py-24 md:py-28">
          <ScrollReveal>
            <div className="grid gap-10 md:grid-cols-12 md:items-end">
              <div className="md:col-span-8">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">What you get</div>
                <h1 className="mt-3 font-serif text-4xl tracking-tight text-primary md:text-5xl lg:text-6xl">
                  A monthly operating rhythm for the practice you actually run.
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
                  The purpose is simple: give physician leaders one clear read of access, revenue cycle, schedule flow, and capacity before the next month creates a fresh set of urgencies.
                </p>
              </div>
              <div className="md:col-span-4">
                <div className="rounded-2xl border border-border/50 bg-white/80 p-6 backdrop-blur-sm glow-teal">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Each month, you receive</div>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-foreground/85">
                    <li className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />A concise executive read of the month</li>
                    <li className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />A scorecard set against specialty peer medians</li>
                    <li className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />Three ranked actions for the next leadership meeting</li>
                    <li className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />A written record of the operating decisions you made</li>
                  </ul>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-b border-border/40 bg-secondary/20">
        <div className="container py-20 md:py-24">
          <ScrollReveal>
            <div className="mx-auto max-w-4xl">
              <VideoEmbed
                videoUrl="/manus-storage/aileron-value-video-branded-final_29121ff8.mp4"
                title="AileronMD Consult value walkthrough"
                description="A practical view of how the monthly briefing brings access, revenue cycle, schedule flow, and provider capacity into focus."
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-b border-border/40">
        <div className="container py-24">
          <ScrollReveal>
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">The operating lenses</div>
                <h2 className="mt-3 font-serif text-3xl tracking-tight text-primary md:text-4xl">The briefing is designed around the work that keeps a practice healthy.</h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-muted-foreground lg:col-span-5 lg:justify-self-end">
                These are the practical domains that determine whether the schedule, the team, and the financial engine are moving together.
              </p>
            </div>
          </ScrollReveal>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {OPERATING_LENSES.map(({ icon: Icon, title, signal, body }, index) => (
              <ScrollReveal key={title} delay={index * 90}>
                <article className="group h-full rounded-2xl border border-border/50 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/6 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-accent/12 group-hover:text-accent"><Icon className="h-5 w-5" /></div>
                  <h3 className="mt-5 font-serif text-xl text-primary">{title}</h3>
                  <div className="mt-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-accent">{signal}</div>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border/40 bg-primary text-white">
        <div className="container py-24">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <ScrollReveal direction="left">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7ED3D1]">The briefing format</div>
                <h2 className="mt-3 font-serif text-3xl tracking-tight md:text-4xl">A useful month starts with a disciplined read.</h2>
                <p className="mt-5 text-sm leading-7 text-white/75">
                  Your practice already generates the figures. The value is the translation: what changed, what it likely means operationally, and what should move to the top of the agenda.
                </p>
              </ScrollReveal>
            </div>
            <div className="space-y-4 lg:col-span-7">
              {BRIEFING_CONTENT.map(({ number, icon: Icon, title, body }, index) => (
                <ScrollReveal key={number} delay={index * 110} direction="right">
                  <article className="flex gap-5 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#7ED3D1]"><Icon className="h-5 w-5" /></div>
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7ED3D1]">{number}</div>
                      <h3 className="mt-1 font-serif text-xl text-white">{title}</h3>
                      <p className="mt-2 text-sm leading-7 text-white/70">{body}</p>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/40 bg-secondary/30">
        <div className="container py-24">
          <ScrollReveal>
            <div className="grid gap-12 md:grid-cols-12 md:items-center">
              <div className="md:col-span-7">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Your senior advisor</div>
                <h2 className="mt-3 font-serif text-3xl tracking-tight text-primary md:text-4xl">A person who reads the practice in context.</h2>
                <div className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground">
                  <p>Your monthly briefing is reviewed by a senior advisor who understands independent practice operations and the rhythm of your specialty.</p>
                  <p>The advisor considers the context visible in the numbers, including payer changes, schedule shifts, staffing transitions, seasonal patterns, and the operational constraints that influence the month.</p>
                  <p>That perspective is what makes the briefing useful in a leadership meeting. It gives you an informed view to react to, discuss, and act on with your team.</p>
                </div>
              </div>
              <div className="md:col-span-5">
                <aside className="rounded-2xl border border-accent/20 bg-white p-8 shadow-[0_30px_60px_-30px_oklch(0.500_0.080_197/0.25)] glow-teal">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">A practical operating lens</div>
                  <div className="mt-5 space-y-5">
                    <div><div className="font-serif text-lg text-primary">What changed?</div><p className="mt-1 text-sm leading-6 text-muted-foreground">Start with the movements that are large enough to alter the day-to-day experience of the practice.</p></div>
                    <div><div className="font-serif text-lg text-primary">What is driving it?</div><p className="mt-1 text-sm leading-6 text-muted-foreground">Read the primary KPI beside the neighboring signals that explain the operating story.</p></div>
                    <div><div className="font-serif text-lg text-primary">What is worth doing next?</div><p className="mt-1 text-sm leading-6 text-muted-foreground">Choose a small number of moves the team can actually own before the next monthly read.</p></div>
                  </div>
                </aside>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-secondary/20">
        <div className="container py-24 text-center">
          <ScrollReveal>
            <div className="mx-auto max-w-2xl">
              <h2 className="font-serif text-3xl tracking-tight text-primary md:text-4xl">Bring the next leadership meeting into focus.</h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground">Start with one month of data. Read the practice with specialty context and decide whether AileronMD belongs in your operating rhythm.</p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Button size="lg" className="btn-press bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/92" onClick={() => (window.location.href = getSignupUrl())}>Start a 30-day trial <ArrowRight className="ml-1.5 h-4 w-4" /></Button>
                <Button asChild size="lg" variant="outline" className="btn-press"><Link href="/contact">Talk through your practice</Link></Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PublicLayout>
  );
}
