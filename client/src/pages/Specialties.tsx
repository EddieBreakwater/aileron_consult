import { PublicLayout } from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Eye,
  HeartPulse,
  Microscope,
  Stethoscope,
  Bone,
} from "lucide-react";
import { Link } from "wouter";

const SPECIALTIES = [
  {
    slug: "primary_care",
    label: "Primary Care",
    icon: Stethoscope,
    headline: "High volume, narrow margin.",
    body: "Primary care lives or dies on access and panel management. Our briefing focuses on third-next-available, no-show rate, and provider utilization — the levers that actually move revenue per provider.",
    benchmarks: ["Revenue / provider $38k median", "Days in A/R median 36", "Staff/provider median 4.0"],
  },
  {
    slug: "gastroenterology",
    label: "Gastroenterology",
    icon: Activity,
    headline: "Procedure economics, in plain English.",
    body: "Practices with procedure mix have a different chart of accounts. We benchmark contractual adjustments, ASC pull-through, and procedure scheduling efficiency separately from office visits.",
    benchmarks: ["Revenue / provider $75k median", "Avg reimbursement 70%", "Third-next-available 15 days"],
  },
  {
    slug: "orthopedics",
    label: "Orthopedics",
    icon: Bone,
    headline: "Long wait list, complex payer mix.",
    body: "Orthopedic practices typically run higher days-in-A/R and higher no-show rates. The benchmarks are calibrated to the specialty so you’re not comparing yourself to the wrong baseline.",
    benchmarks: ["Revenue / provider $95k median", "No-show rate median 9%", "Op. expense ratio 64%"],
  },
  {
    slug: "hematology_oncology",
    label: "Hematology / Oncology",
    icon: Microscope,
    headline: "High-acuity workflows. Tight compliance.",
    body: "Heme/onc carries a different operating model — higher staff ratios, longer A/R, premium reimbursement, and tight quality compliance. The briefing scores all four together.",
    benchmarks: ["Revenue / provider $120k median", "Quality compliance 94%", "Patient satisfaction 4.6"],
  },
  {
    slug: "optometry",
    label: "Optometry",
    icon: Eye,
    headline: "Retail meets clinical.",
    body: "Optometry has hybrid economics: insurance plus retail. The briefing reads both halves together — exam volume, dispensary capture, and conversion — alongside the standard KPIs.",
    benchmarks: ["Revenue / provider $42k median", "Days in A/R median 28", "Patient satisfaction 4.6"],
  },
  {
    slug: "ophthalmology",
    label: "Ophthalmology",
    icon: HeartPulse,
    headline: "Surgical revenue, retail dispensary.",
    body: "Ophthalmology shares optometry’s retail dynamics with a surgical revenue layer. Our benchmarks isolate procedure throughput so growth and margin live on separate lines.",
    benchmarks: ["Revenue / provider $110k median", "Avg reimbursement 70%", "Op. expense ratio 62%"],
  },
];

export default function Specialties() {
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
              Generic healthcare benchmarks compare a primary care practice to an oncology
              practice. We don’t. Each specialty has its own median, percentile bands, and flag
              thresholds — built to stay useful as your practice grows.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container py-20">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SPECIALTIES.map(s => {
              const Icon = s.icon;
              return (
                <article
                  key={s.slug}
                  className="lift flex flex-col rounded-xl border border-border/70 bg-card p-7"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/8 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-serif text-xl leading-tight text-primary">
                    {s.label}
                  </h3>
                  <div className="mt-1 text-sm font-medium text-accent">{s.headline}</div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{s.body}</p>
                  <ul className="mt-5 space-y-1.5 border-t border-border/60 pt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                    {s.benchmarks.map(b => (
                      <li key={b}>· {b}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>

          <div className="mt-14 rounded-2xl border border-accent/30 bg-accent/5 p-8 text-center">
            <h3 className="font-serif text-2xl text-primary">Don’t see your specialty?</h3>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
              We add new specialties when we hit sufficient sample size. Tell us yours and we’ll
              put it in the queue.
            </p>
            <Button asChild className="mt-5 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/contact">Request a specialty</Link>
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
