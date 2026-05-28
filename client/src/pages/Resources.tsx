import { PublicLayout } from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { Streamdown } from "streamdown";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

const EHR_GUIDES: Record<string, string> = {
  Epic: `## Epic — Native Reporting Path

Epic ships a deep set of native reports under **Reporting Workbench** and **Radar Dashboards**. Most AileronMD KPIs map cleanly to existing Epic reports without needing a custom build.

### Where each KPI lives

- **Revenue per Provider** → Reporting Workbench: *Provider Productivity (PPRD)* → filter by your provider group.
- **Days in A/R** → Resolute PB → *A/R Days Outstanding* report.
- **Net Collection Rate** → Resolute PB → *Net Collection Rate by Department*.
- **Contractual Adjustment Rate** → Resolute PB → *Contractual Adjustments Summary*.
- **Insurance Mix** → Reporting Workbench: *Payer Mix by Department*.
- **Third Next Available** → Cadence → *Third Next Available Appointment* (built-in).
- **No-Show Rate** → Cadence → *Appointment Status Summary*.
- **Patient Satisfaction Score** → Press Ganey integration or *Patient Experience Dashboard*.
- **Quality Compliance Rate** → MyChart Reports → *Quality Measure Compliance*.

### Tip
Schedule the reports to email your administrator on the first business day of each month. Your AileronMD submission window opens that same day.`,
  Athenahealth: `## Athenahealth — Native Reporting Path

Athena exposes most KPIs through the **AthenaNet Reporting** module. The shape of the data is slightly different from Epic — you’ll work primarily in *Operational Dashboards* and *Custom Report Builder*.

### Where each KPI lives

- **Revenue per Provider** → Reports → *Provider Productivity*.
- **Days in A/R** → Reports → *A/R Aging by Provider*.
- **Net Collection Rate** → Reports → *Collections Performance Summary*.
- **No-Show Rate** → Reports → *Appointment Outcomes by Slot*.
- **Third Next Available** → Schedule → *Capacity Insights* tab.
- **Insurance Mix** → Reports → *Payer Mix by Period*.
- **Patient Satisfaction** → Patient Experience module (if enabled) or third-party (e.g., Press Ganey).

### Tip
Athena’s standard reports compute Days in A/R differently from MGMA. Use the *MGMA-Aligned* toggle in the report header so the figure matches the AileronMD benchmark.`,
  eClinicalWorks: `## eClinicalWorks — Native Reporting Path

eClinicalWorks (eCW) provides KPIs through the **eBO (eClinicalWorks Business Optimizer)** module. If your practice doesn’t have eBO, most figures are still derivable from the core reports — it’ll just take a few more clicks.

### Where each KPI lives

- **Revenue per Provider** → eBO → *Provider Revenue Summary*.
- **Days in A/R** → Billing → *A/R Aging Analysis*.
- **Net Collection Rate** → eBO → *Net Collections Dashboard*.
- **No-Show Rate** → Practice Management → *Appointment Status Report*.
- **Third Next Available** → Front Office → *Open Slots Report* (calculated).
- **Insurance Mix** → eBO → *Payer Performance*.
- **Quality Compliance** → CQM → *MIPS Performance Summary*.

### Tip
The *Open Slots Report* doesn’t directly compute Third Next Available. Sort by date ascending, count to the third available slot of the requested visit type, and use that as your figure.`,
  NextGen: `## NextGen — Native Reporting Path

NextGen exposes KPIs through both **NextGen Knowledge-Based Care (KBM)** and the **Reporting Plus** module.

### Where each KPI lives

- **Revenue per Provider** → Reporting Plus → *Provider Productivity*.
- **Days in A/R** → Reporting Plus → *Days Revenue Outstanding*.
- **Net Collection Rate** → Reporting Plus → *Collections by Department*.
- **No-Show Rate** → KBM → *Appointment Outcomes*.
- **Third Next Available** → Scheduling → *Open Slot Analysis*.
- **Insurance Mix** → Reporting Plus → *Payer Mix*.

### Tip
NextGen lets you save report parameters as a *Job*. Build the AileronMD KPI suite once, save it as a job, and run it on the first of each month.`,
  Other: `## Other EHRs

If you’re on a smaller or specialty EHR (e.g., Modernizing Medicine, Praxis, RXNT), the workflow is the same:

1. Identify which native report yields each KPI.
2. Schedule it monthly to your administrator.
3. Copy the figures into your AileronMD submission.

### When you can’t find a KPI

Some smaller EHRs don’t natively compute Third Next Available or Net Collection Rate. In those cases:

- For **Third Next Available**, use *Open Slots* and manually count.
- For **Net Collection Rate**, calculate as *(Payments + Adjustments) ÷ Charges × 100*.
- For **Patient Satisfaction**, run a quarterly Google Form survey if your EHR doesn’t include one.

If you’re truly stuck, our onboarding consult includes a 30-minute working session to map your EHR’s reports to the AileronMD KPI suite.`,
};

const TABS = Object.keys(EHR_GUIDES);

export default function Resources() {
  useDocumentTitle(
    "EHR Reporting Guide \u2014 Native Reports",
    "How to pull every AileronMD KPI from the EHR you already pay for: Epic, athenahealth, eClinicalWorks, NextGen, Cerner Oracle, and Practice Fusion.",
  );
  const [tab, setTab] = useState("Epic");

  return (
    <PublicLayout>
      <section className="border-b border-border/60 bg-secondary/30">
        <div className="container py-20">
          <div className="max-w-3xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              Resource — EHR Native Reporting
            </div>
            <h1 className="mt-3 font-serif text-4xl tracking-tight text-primary md:text-5xl">
              Pull every KPI from the EHR you already pay for.
            </h1>
            <p className="mt-5 text-base leading-7 text-muted-foreground">
              We don’t need read access to your EHR. Use the native reports already shipped with
              your system. Below is the reporting path for the five EHRs we see most often.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container py-16">
          <div className="flex flex-wrap gap-2 border-b border-border/60">
            {TABS.map(t => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`px-4 py-3 text-sm font-medium transition-colors ${
                  tab === t
                    ? "border-b-2 border-accent text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="mt-8 max-w-3xl">
            <div className="prose-aileron">
              <Streamdown>{EHR_GUIDES[tab]}</Streamdown>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 bg-primary text-primary-foreground">
        <div className="container py-16 text-center">
          <h2 className="font-serif text-3xl tracking-tight md:text-4xl">
            One template. Sixteen KPIs. Twenty minutes a month.
          </h2>
          <Button
            asChild
            className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90"
            size="lg"
          >
            <Link href="/pricing">
              Start a trial <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
}
