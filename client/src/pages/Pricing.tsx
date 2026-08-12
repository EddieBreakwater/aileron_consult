import { PublicLayout } from "@/components/PublicLayout";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ScarcityCounter } from "@/components/ScarcityCounter";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Button } from "@/components/ui/button";
import { getSignupUrl } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const TIERS = [
  {
    id: "solo",
    name: "Solo Practice",
    price: 199,
    description: "For independent practices with up to two providers.",
    features: [
      "One monthly operating briefing",
      "16 KPIs across 6 domains",
      "Specialty-benchmarked scoring",
      "Briefing history archive",
      "Email support, two business days",
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
      "Up to ten providers tracked",
      "Provider-level KPI breakouts (coming Q3)",
      "Quarterly trend review call",
      "Email support, one business day",
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
    a: "A fractional COO costs $150k to $250k per year and takes six months to ramp. AileronMD gives you specialty-benchmarked clarity every month for $199. It's the operating layer most practices actually need.",
  },
  {
    q: "Do you replace MGMA?",
    a: "Not exactly. MGMA gives you industry averages once a year. We give you a monthly specialty-specific read with action items. They're complementary; most clients keep both.",
  },
  {
    q: "Can I cancel?",
    a: "Yes, any time. Your historical briefings remain accessible to you forever, even after cancellation.",
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
              Less than one missed appointment.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
              Flat monthly pricing. No setup fees. Cancel any time. The first thirty days are free
              so you can read a real briefing before you commit.
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
                  {tier.highlight && (
                    <div className="absolute -top-3 right-6 rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent-foreground">
                      Most chosen
                    </div>
                  )}
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
