import { PublicLayout } from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { SPECIALTY_DOSSIERS, type SpecialtyResource } from "@shared/specialtyResources";
import {
  Activity,
  ArrowUpRight,
  Bone,
  ExternalLink,
  Eye,
  HeartPulse,
  Microscope,
  Stethoscope,
  TrendingUp,
} from "lucide-react";
import type { ComponentType } from "react";
import { Link } from "wouter";

interface CardData {
  slug: keyof typeof SPECIALTY_DOSSIERS;
  label: string;
  icon: ComponentType<{ className?: string }>;
  headline: string;
  body: string;
  benchmarks: string[];
}

const CARDS: CardData[] = [
  {
    slug: "primary_care",
    label: "Primary Care",
    icon: Stethoscope,
    headline: "High volume, narrow margin.",
    body: "Primary care lives or dies on access and panel management. Our briefing focuses on third-next-available, no-show rate, and provider utilization — the levers that actually move revenue per provider.",
    benchmarks: [
      "Revenue / provider $38k median",
      "Days in A/R median 36",
      "Staff / provider median 4.0",
    ],
  },
  {
    slug: "gastroenterology",
    label: "Gastroenterology",
    icon: Activity,
    headline: "Procedure economics, in plain English.",
    body: "Practices with procedure mix have a different chart of accounts. We benchmark contractual adjustments, ASC pull-through, and procedure scheduling efficiency separately from office visits.",
    benchmarks: [
      "Revenue / provider $75k median",
      "Avg reimbursement 70%",
      "Third-next-available 15 days",
    ],
  },
  {
    slug: "orthopedics",
    label: "Orthopedics",
    icon: Bone,
    headline: "Long wait list, complex payer mix.",
    body: "Orthopedic practices typically run higher days-in-A/R and higher no-show rates. The benchmarks are calibrated to the specialty so you are not comparing yourself to the wrong baseline.",
    benchmarks: [
      "Revenue / provider $95k median",
      "No-show rate median 9%",
      "Op. expense ratio 64%",
    ],
  },
  {
    slug: "hematology_oncology",
    label: "Hematology / Oncology",
    icon: Microscope,
    headline: "High-acuity workflows. Tight compliance.",
    body: "Heme/onc carries a different operating model — higher staff ratios, longer A/R, premium reimbursement, and tight quality compliance. The briefing scores all four together.",
    benchmarks: [
      "Revenue / provider $120k median",
      "Quality compliance 94%",
      "Patient satisfaction 4.6",
    ],
  },
  {
    slug: "optometry",
    label: "Optometry",
    icon: Eye,
    headline: "Retail meets clinical.",
    body: "Optometry has hybrid economics: insurance plus retail. The briefing reads both halves together — exam volume, dispensary capture, and conversion — alongside the standard KPIs.",
    benchmarks: [
      "Revenue / provider $42k median",
      "Days in A/R median 28",
      "Patient satisfaction 4.6",
    ],
  },
  {
    slug: "ophthalmology",
    label: "Ophthalmology",
    icon: HeartPulse,
    headline: "Surgical revenue, retail dispensary.",
    body: "Ophthalmology shares optometry's retail dynamics with a surgical revenue layer. Our benchmarks isolate procedure throughput so growth and margin live on separate lines.",
    benchmarks: [
      "Revenue / provider $110k median",
      "Avg reimbursement 70%",
      "Op. expense ratio 62%",
    ],
  },
];

const KIND_LABEL: Record<SpecialtyResource["kind"], string> = {
  association: "Association",
  publication: "Publication",
  policy: "Policy / Research",
  data: "Data / Survey",
  society: "Society",
};

export default function Specialties() {
  useDocumentTitle(
    "Specialty Benchmarks & Resources",
    "Specialty-specific benchmarks, current trends, and curated links to MGMA, Becker's, AGA, ASGE, AAOS, AAO, ASCO, AAFP and other trusted resources.",
  );

  return (
    <PublicLayout>
      <section className="border-b border-border/60 bg-secondary/30">
        <div className="container py-20">
          <div className="max-w-3xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              Six specialties, calibrated separately
            </div>
            <h1 className="mt-3 font-serif text-4xl tracking-tight text-primary md:text-5xl">
              Your benchmark should match your business model.
            </h1>
            <p className="mt-5 text-base leading-7 text-muted-foreground">
              Each specialty has its own median, percentile bands, and flag thresholds. Below
              you'll also find a short briefing on what's changing in each specialty right now,
              along with the trade associations, journals, and publications we read so you don't
              have to.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container py-20">
          <div className="space-y-10">
            {CARDS.map(card => {
              const dossier = SPECIALTY_DOSSIERS[card.slug];
              const Icon = card.icon;
              return (
                <article
                  key={card.slug}
                  className="overflow-hidden rounded-2xl border border-border/70 bg-card"
                >
                  {/* Header band */}
                  <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border/60 bg-secondary/30 px-7 py-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/8 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="font-serif text-2xl leading-tight text-primary">
                          {card.label}
                        </h2>
                        <div className="mt-1 text-sm font-medium text-accent">
                          {card.headline}
                        </div>
                      </div>
                    </div>
                    <ul className="hidden flex-wrap gap-x-6 gap-y-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:flex">
                      {card.benchmarks.map(b => (
                        <li key={b}>· {b}</li>
                      ))}
                    </ul>
                  </header>

                  {/* Body grid: trends briefing + resources */}
                  <div className="grid gap-0 lg:grid-cols-5">
                    {/* Trends briefing */}
                    <div className="border-b border-border/60 px-7 py-7 lg:col-span-3 lg:border-b-0 lg:border-r">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                        What's changing now
                      </div>
                      <p className="mt-3 text-sm leading-7 text-foreground/85">
                        {dossier.briefing.state}
                      </p>
                      <ul className="mt-5 space-y-3">
                        {dossier.briefing.trends.map(t => (
                          <li
                            key={t}
                            className="flex gap-3 text-sm leading-6 text-foreground/85"
                          >
                            <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>

                      <p className="mt-6 max-w-md text-xs text-muted-foreground">
                        {card.body}
                      </p>
                    </div>

                    {/* Resources */}
                    <div className="px-7 py-7 lg:col-span-2">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                        Reputable resources
                      </div>
                      <ul className="mt-3 divide-y divide-border/60">
                        {dossier.resources.map(r => (
                          <li key={r.url}>
                            <a
                              href={r.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex items-start gap-3 py-3 transition-colors hover:bg-secondary/40 -mx-2 px-2 rounded-md"
                            >
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-primary group-hover:text-accent">
                                    {r.name}
                                  </span>
                                  <span className="rounded-sm bg-secondary px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                                    {KIND_LABEL[r.kind]}
                                  </span>
                                </div>
                                <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
                                  {r.blurb}
                                </p>
                              </div>
                              <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-accent" />
                            </a>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4 text-[11px] text-muted-foreground">
                        Links open in a new tab. AileronMD Consult is not affiliated with these
                        organizations.
                      </p>
                    </div>
                  </div>

                  {/* Footer benchmarks rail (mobile) */}
                  <ul className="flex flex-wrap gap-x-5 gap-y-1 border-t border-border/60 bg-secondary/20 px-7 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:hidden">
                    {card.benchmarks.map(b => (
                      <li key={b}>· {b}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>

          <div className="mt-14 grid gap-4 rounded-2xl border border-accent/30 bg-accent/5 p-8 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8">
            <div>
              <h3 className="font-serif text-2xl text-primary">Don't see your specialty?</h3>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                We add new specialties as we hit sufficient sample size. Tell us yours and we'll
                put it in the queue, and we'll pull together a starter set of trusted resources
                while we do.
              </p>
            </div>
            <Button
              asChild
              className="self-start bg-accent text-accent-foreground hover:bg-accent/90 sm:self-center"
            >
              <Link href="/contact">
                Request a specialty <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
