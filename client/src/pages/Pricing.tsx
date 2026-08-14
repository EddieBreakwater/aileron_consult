import { PublicLayout } from "@/components/PublicLayout";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ScarcityCounter } from "@/components/ScarcityCounter";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Button } from "@/components/ui/button";
import { getSignupUrl } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { Check, ArrowRight, CalendarCheck2, ReceiptText, UsersRound } from "lucide-react";
import { Link } from "wouter";

const TIERS = [
  {
    id: "solo",
    name: "Solo Practice",
    price: 199,
    description: "For independent practices with up to two providers.",
    features: [
      "One advisor-curated operating read each month",
      "16 KPIs across access, revenue cycle, schedule, and capacity",
      "Specialty-benchmarked scorecard and operating context",
      "Three ranked actions for the next leadership meeting",
      "Briefing history for month-to-month continuity",
    ],
    highlight: false,
  },
  {
    id: "group",
    name: "Group Practice",
    price: 349,
    description: "For practices with three to ten providers.",
    features: [
      "Everything in Solo",
      "Up to ten providers in the monthly operating read",
      "Group-level access, revenue-cycle, and capacity context",
      "Quarterly trend conversation",
      "Priority email support",
    ],
    highlight: true,
  },
];

const FAQ = [
  {
    q: "What if my specialty isn't listed?",
    a: "We open new specialties as we hit a sufficient sample size. Tell us yours on the contact form. We move new specialties in priority order based on demand.",
  },
  {
    q: "How is this different from a fractional COO?",
    a: "A fractional COO actively executes work inside the practice. AileronMD gives physician leaders an external monthly operating read: the signals, the specialty context, and the few decisions worth putting on the leadership agenda.",
  },
  {
    q: "Do you replace MGMA?",
    a: "They serve different purposes. Benchmark resources provide useful reference data. AileronMD uses monthly practice KPIs and specialty context to frame the operating questions and next actions for your own practice.",
  },
  {
    q: "Can I cancel?",
    a: "Yes, any time. Your historical briefings remain accessible to you forever, even after cancellation.",
  },
];

const OPERATING_USE_CASES = [
  {
    icon: CalendarCheck2,
    title: "Access is widening",
    body: "Bring third-next-available, cancellations, and no-shows into one conversation before adding hours or changing a template.",
  },
  {
    icon: ReceiptText,
    title: "Cash is slowing",
    body: "Read Days in A/R, collections, and denials together to identify where the revenue cycle needs focused attention.",
  },
  {
    icon: UsersRound,
    title: "The team feels stretched",
    body: "Use visits, staffing signals, provider volume, and schedule integrity to clarify where the operating load is actually landing.",
  },
];

export default function Pricing() {
  useDocumentTitle(
    "Pricing \u2014 Solo & Group Plans",
    "Flat monthly pricing for AileronMD Consult: $199 for solo practices, $349 for groups. 30-day trial, no setup fee, cancel any time.",
  );
  const { isAuthenticated } = useAuth();

  return (
    <PublicLayout>
      <section className="border-b border-border/40 hero-ambient relative overflow-hidden">
        <div className="container py-24 text-center">
          <ScrollReveal>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              Pricing
            </div>
            <h1 className="mt-3 font-serif text-4xl tracking-tight text-primary md:text-5xl">
              A monthly operating read, built around your practice.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
              Flat monthly pricing for a concise, advisor-curated briefing that keeps access,
              revenue cycle, schedule flow, and provider capacity in view.
            </p>
            <div className="mt-5 flex justify-center">
              <ScarcityCounter />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-b border-border/40">
        <div className="container py-24">
          <div className="grid gap-8 md:grid-cols-2">
            {TIERS.map((tier, i) => (
              <ScrollReveal key={tier.id} delay={i * 150}>
                <article
                  className={`group relative rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 ${
                    tier.highlight
                      ? "border-accent/40 bg-white shadow-[0_30px_60px_-30px_oklch(0.500_0.080_197/0.25)] glow-teal"
                      : "border-border/50 bg-white hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5"
                  }`}
                >
                  <div className="font-serif text-xl text-primary">{tier.name}</div>
                  <p className="mt-1.5 text-sm text-muted-foreground">{tier.description}</p>
                  <div className="mt-6 flex items-baseline gap-1.5">
                    <span className="font-serif text-5xl text-primary">
                      $<AnimatedCounter end={tier.price} duration={1500} />
                    </span>
                    <span className="text-sm text-muted-foreground">/ month</span>
                  </div>
                  <Button
                    size="lg"
                    className={`btn-press mt-7 w-full ${
                      tier.highlight
                        ? "bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20"
                        : "bg-primary text-primary-foreground hover:bg-primary/92"
                    }`}
                    onClick={() => {
                      if (isAuthenticated) {
                        window.location.href = "/dashboard";
                      } else {
                        window.location.href = getSignupUrl();
                      }
                    }}
                  >
                    Start 30-day trial
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Button>
                  <ul className="mt-7 space-y-3 text-sm">
                    {tier.features.map(f => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <span className="text-foreground/85">{f}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </ScrollReveal>
            ))}
          </div>

          <p className="mt-10 text-center text-xs text-muted-foreground">
            Larger groups (10+ providers) — <Link href="/contact" className="text-primary underline-offset-4 hover:underline">talk to us about an enterprise plan</Link>.
          </p>
        </div>
      </section>

      <section className="border-b border-border/40 bg-secondary/25">
        <div className="container py-24">
          <ScrollReveal>
            <div className="max-w-2xl">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                What the monthly read supports
              </div>
              <h2 className="mt-3 font-serif text-3xl tracking-tight text-primary md:text-4xl">
                Useful when the day-to-day questions start to stack up.
              </h2>
            </div>
          </ScrollReveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {OPERATING_USE_CASES.map(({ icon: Icon, title, body }, index) => (
              <ScrollReveal key={title} delay={index * 90}>
                <article className="group h-full rounded-2xl border border-border/50 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/6 text-primary transition-all group-hover:scale-110 group-hover:bg-accent/12 group-hover:text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-serif text-xl text-primary">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="container py-24">
          <ScrollReveal>
            <h2 className="font-serif text-3xl tracking-tight text-primary">Common questions</h2>
          </ScrollReveal>
          <div className="mt-12 grid gap-x-12 gap-y-8 md:grid-cols-2">
            {FAQ.map((item, i) => (
              <ScrollReveal key={item.q} delay={i * 80}>
                <div className="group">
                  <div className="font-serif text-lg text-primary group-hover:text-accent transition-colors">{item.q}</div>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.a}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
