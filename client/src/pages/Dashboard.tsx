import DashboardLayout from "@/components/DashboardLayout";
import { PracticeProfileForm } from "@/components/PracticeProfileForm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import {
  formatKpiValue,
  KPI_DEFINITIONS,
  SPECIALTY_LABELS,
  statusForValue,
} from "@shared/aileron";
import {
  ArrowRight,
  ClipboardCheck,
  FileText,
  Loader2,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  const practice = trpc.practice.me.useQuery();
  const latestKpi = trpc.kpi.latest.useQuery(undefined, {
    enabled: !!practice.data,
  });
  const latestBriefing = trpc.briefing.latest.useQuery(undefined, {
    enabled: !!practice.data,
  });
  const benchmarks = trpc.benchmark.forSpecialty.useQuery(
    { specialty: practice.data?.specialty as never },
    { enabled: !!practice.data?.specialty },
  );

  if (practice.isLoading) {
    return (
      <DashboardLayout>
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  // Onboarding: no practice profile yet.
  if (!practice.data) {
    return (
      <DashboardLayout>
        <div className="mx-auto max-w-2xl">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
            Welcome to AileronMD Consult
          </div>
          <h1 className="mt-2 font-serif text-3xl tracking-tight text-primary md:text-4xl">
            Set up your practice profile
          </h1>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Five fields. One minute. We use these to calibrate your benchmarks and to write the
            monthly briefing in your specialty’s vocabulary.
          </p>
          <div className="mt-8 rounded-2xl border border-border/70 bg-card p-7">
            <PracticeProfileForm />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const p = practice.data;
  const benchMap = new Map((benchmarks.data ?? []).map(b => [b.metric, b]));
  const monthLabel = latestKpi.data
    ? new Date(latestKpi.data.year, latestKpi.data.month - 1).toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      })
    : null;

  // Compute KPI status counts.
  let good = 0;
  let watch = 0;
  let flag = 0;
  if (latestKpi.data) {
    for (const def of KPI_DEFINITIONS) {
      const raw = (latestKpi.data as Record<string, unknown>)[def.key];
      if (raw == null) continue;
      const num = Number(raw);
      if (!Number.isFinite(num)) continue;
      const b = benchMap.get(def.key);
      const status = statusForValue(
        num,
        b ? Number(b.medianValue) : null,
        b?.flagThreshold != null ? Number(b.flagThreshold) : null,
        def.higherIsBetter,
      );
      if (status === "good") good++;
      else if (status === "watch") watch++;
      else if (status === "flag") flag++;
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-10">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              {SPECIALTY_LABELS[p.specialty] ?? p.specialty}
            </div>
            <h1 className="mt-1 font-serif text-3xl tracking-tight text-primary md:text-4xl">
              {p.name}
            </h1>
            <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
              <span>{p.providerCount} provider{p.providerCount === 1 ? "" : "s"}</span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
              <Badge variant="outline" className="font-normal capitalize">
                {p.subscriptionStatus}
              </Badge>
              <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
              <span className="capitalize">{p.groupTier} tier</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/92">
              <Link href="/dashboard/submit">
                <ClipboardCheck className="mr-1.5 h-4 w-4" />
                Submit this month
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/dashboard/briefing">
                <Sparkles className="mr-1.5 h-4 w-4" />
                View latest briefing
              </Link>
            </Button>
          </div>
        </div>

        {/* Top stats row */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Latest period"
            value={monthLabel ?? "No submission yet"}
            sublabel={latestKpi.data ? "Submitted" : "Submit your first month"}
          />
          <StatCard label="On band" value={String(good)} accent="good" sublabel="KPIs above median" />
          <StatCard label="On watch" value={String(watch)} accent="watch" sublabel="Trending below median" />
          <StatCard label="Flags" value={String(flag)} accent="flag" sublabel="Need this month’s focus" />
        </div>

        {/* Latest briefing card */}
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl border border-border/70 bg-card p-7">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                  Latest briefing
                </div>
                <h2 className="mt-1 font-serif text-2xl text-primary">
                  {latestBriefing.data?.title ?? "No briefing yet"}
                </h2>
              </div>
              {latestBriefing.data && (
                <Button asChild variant="ghost" size="sm">
                  <Link href="/dashboard/briefing">
                    Read full briefing <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </Button>
              )}
            </div>
            {latestBriefing.data ? (
              <p className="mt-4 line-clamp-4 text-sm leading-7 text-foreground/80">
                {latestBriefing.data.executiveSummary}
              </p>
            ) : (
              <div className="mt-5 rounded-lg border border-dashed border-border bg-secondary/40 p-5 text-sm text-muted-foreground">
                Submit a month of KPIs and generate your first briefing. The whole flow takes about
                twenty minutes.
                <div className="mt-4">
                  <Button asChild size="sm">
                    <Link href="/dashboard/submit">
                      Submit numbers <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-border/70 bg-card p-7">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
              Quick actions
            </div>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link
                  href="/dashboard/submit"
                  className="group flex items-center justify-between rounded-md border border-transparent px-3 py-2 hover:border-border hover:bg-secondary/40"
                >
                  <span className="flex items-center gap-2.5">
                    <ClipboardCheck className="h-4 w-4 text-primary" />
                    Submit this month
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary" />
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/history"
                  className="group flex items-center justify-between rounded-md border border-transparent px-3 py-2 hover:border-border hover:bg-secondary/40"
                >
                  <span className="flex items-center gap-2.5">
                    <FileText className="h-4 w-4 text-primary" />
                    View briefing history
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary" />
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="group flex items-center justify-between rounded-md border border-transparent px-3 py-2 hover:border-border hover:bg-secondary/40"
                >
                  <span className="flex items-center gap-2.5">
                    <FileText className="h-4 w-4 text-primary" />
                    EHR reporting guide
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary" />
                </Link>
              </li>
            </ul>
          </div>
        </section>

        {/* Top KPIs preview */}
        {latestKpi.data && (
          <section>
            <div className="mb-4 flex items-baseline justify-between">
              <h2 className="font-serif text-2xl text-primary">KPI snapshot</h2>
              <Link
                href="/dashboard/briefing"
                className="text-sm font-medium text-primary hover:text-accent"
              >
                Full scorecard →
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {KPI_DEFINITIONS.slice(0, 8).map(def => {
                const raw = (latestKpi.data as Record<string, unknown>)[def.key];
                const num = raw == null ? null : Number(raw);
                const b = benchMap.get(def.key);
                const median = b ? Number(b.medianValue) : null;
                const status =
                  num !== null && Number.isFinite(num)
                    ? statusForValue(
                        num,
                        median,
                        b?.flagThreshold != null ? Number(b.flagThreshold) : null,
                        def.higherIsBetter,
                      )
                    : null;
                const trendUp = median != null && num != null && num > median;
                return (
                  <div
                    key={def.key}
                    className="rounded-lg border border-border/70 bg-card px-4 py-3.5"
                  >
                    <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                      {def.short}
                    </div>
                    <div className="mt-1.5 flex items-baseline gap-2">
                      <span className="num font-serif text-2xl text-primary">
                        {formatKpiValue(num, def.unit)}
                      </span>
                      {median != null && Number.isFinite(median) && (
                        <span className="num text-[10px] text-muted-foreground">
                          vs {formatKpiValue(median, def.unit)}
                        </span>
                      )}
                    </div>
                    <div className="mt-1 flex items-center gap-1.5">
                      <StatusDot status={status} />
                      <span className="text-[11px] capitalize text-muted-foreground">
                        {status ?? "no benchmark"}
                      </span>
                      {median != null && num != null && (
                        trendUp ? (
                          <TrendingUp className="ml-auto h-3 w-3 text-accent" />
                        ) : (
                          <TrendingDown className="ml-auto h-3 w-3 text-muted-foreground" />
                        )
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </DashboardLayout>
  );
}

function StatCard({
  label,
  value,
  sublabel,
  accent,
}: {
  label: string;
  value: string;
  sublabel?: string;
  accent?: "good" | "watch" | "flag";
}) {
  const accentClass =
    accent === "good"
      ? "text-accent"
      : accent === "watch"
        ? "text-amber-600"
        : accent === "flag"
          ? "text-destructive"
          : "text-primary";
  return (
    <div className="rounded-xl border border-border/70 bg-card p-5">
      <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </div>
      <div className={`mt-2 num font-serif text-3xl ${accentClass}`}>{value}</div>
      {sublabel && <div className="mt-1 text-xs text-muted-foreground">{sublabel}</div>}
    </div>
  );
}

function StatusDot({ status }: { status: "good" | "watch" | "flag" | null }) {
  const cls =
    status === "good"
      ? "bg-accent"
      : status === "watch"
        ? "bg-amber-500"
        : status === "flag"
          ? "bg-destructive"
          : "bg-muted-foreground/40";
  return <span className={`h-1.5 w-1.5 rounded-full ${cls}`} />;
}
