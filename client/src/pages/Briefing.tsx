import DashboardLayout from "@/components/DashboardLayout";
import { BenchmarkChart, type ChartDatum } from "@/components/BenchmarkChart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import {
  formatKpiValue,
  KPI_DEFINITIONS,
  KPI_DOMAINS,
  statusForValue,
} from "@shared/aileron";
import { ArrowLeft, ClipboardCheck, Loader2, Sparkles } from "lucide-react";
import { Streamdown } from "streamdown";
import { Link, useParams } from "wouter";
import type { Briefing as BriefingRow, KpiSubmission, Benchmark } from "@/../../drizzle/schema";

export default function Briefing() {
  const params = useParams<{ id?: string }>();
  const id = params.id ? Number(params.id) : null;

  const latest = trpc.briefing.latest.useQuery(undefined, { enabled: id === null });
  const byId = trpc.briefing.byId.useQuery({ id: id! }, { enabled: id !== null });
  const briefing: BriefingRow | null | undefined = id === null ? latest.data : byId.data;
  const isLoading = id === null ? latest.isLoading : byId.isLoading;

  const practice = trpc.practice.me.useQuery();
  const benchmarks = trpc.benchmark.forSpecialty.useQuery(
    { specialty: practice.data?.specialty as never },
    { enabled: !!practice.data?.specialty },
  );
  const kpis = trpc.kpi.history.useQuery({ limit: 12 });

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  if (!briefing) {
    return (
      <DashboardLayout>
        <EmptyState />
      </DashboardLayout>
    );
  }

  const submission = (kpis.data ?? []).find(k => k.id === briefing.kpiSubmissionId) as
    | KpiSubmission
    | undefined;

  return (
    <DashboardLayout>
      <article className="mx-auto max-w-5xl space-y-10">
        <header>
          <Link
            href="/dashboard/history"
            className="inline-flex items-center text-xs font-medium text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
            Briefing history
          </Link>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                Monthly Briefing —{" "}
                {new Date(briefing.year, briefing.month - 1).toLocaleString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <h1 className="mt-2 font-serif text-3xl leading-tight tracking-tight text-primary md:text-4xl">
                {briefing.title}
              </h1>
              <Badge
                variant="outline"
                className="mt-3 border-accent/40 bg-accent/5 font-normal capitalize text-accent"
              >
                {briefing.status}
              </Badge>
            </div>
          </div>
        </header>

        {/* Executive summary */}
        <section className="rounded-2xl border border-accent/30 bg-accent/5 p-7">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
            Executive summary
          </div>
          <p className="mt-3 text-base leading-7 text-foreground/90">
            {briefing.executiveSummary}
          </p>
        </section>

        {/* Narrative */}
        <section>
          <div className="prose-aileron max-w-none">
            <Streamdown>{briefing.narrative}</Streamdown>
          </div>
        </section>

        {/* Recommendations */}
        {briefing.recommendations && (
          <section className="rounded-2xl border border-border/70 bg-card p-7">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
              This month, focus on
            </div>
            <div className="prose-aileron mt-3 max-w-none">
              <Streamdown>{briefing.recommendations}</Streamdown>
            </div>
          </section>
        )}

        {/* Benchmark scorecard */}
        {submission && benchmarks.data && (
          <section className="space-y-6">
            <h2 className="font-serif text-2xl text-primary">KPI scorecard</h2>
            <Scorecard submission={submission} benchmarks={benchmarks.data} />
            <BenchmarkCharts submission={submission} benchmarks={benchmarks.data} />
          </section>
        )}

        <div className="flex flex-wrap gap-3 border-t border-border/60 pt-8">
          <Button asChild variant="outline">
            <Link href="/dashboard/history">View briefing history</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/submit">
              <ClipboardCheck className="mr-1.5 h-4 w-4" />
              Submit next month
            </Link>
          </Button>
        </div>
      </article>
    </DashboardLayout>
  );
}

function EmptyState() {
  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-dashed border-border bg-secondary/40 p-12 text-center">
      <Sparkles className="mx-auto h-10 w-10 text-accent" />
      <h2 className="mt-4 font-serif text-2xl text-primary">No briefing yet</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        Submit a month of KPIs and generate your first briefing. Most clients finish their first
        cycle in under thirty minutes.
      </p>
      <Button asChild className="mt-6">
        <Link href="/dashboard/submit">
          Submit your numbers <ClipboardCheck className="ml-1.5 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}

function Scorecard({
  submission,
  benchmarks,
}: {
  submission: KpiSubmission;
  benchmarks: Benchmark[];
}) {
  const benchMap = new Map(benchmarks.map(b => [b.metric, b]));

  return (
    <div className="space-y-5">
      {KPI_DOMAINS.map(domain => {
        const defs = KPI_DEFINITIONS.filter(d => d.domain === domain);
        return (
          <div key={domain} className="rounded-xl border border-border/70 bg-card">
            <div className="border-b border-border/60 px-5 py-3">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                {domain}
              </div>
            </div>
            <div className="divide-y divide-border/60">
              {defs.map(def => {
                const raw = (submission as Record<string, unknown>)[def.key];
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
                return (
                  <div key={def.key} className="grid grid-cols-12 items-center gap-3 px-5 py-3.5 text-sm">
                    <div className="col-span-6">
                      <div className="font-medium text-foreground">{def.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {def.higherIsBetter ? "Higher is better" : "Lower is better"}
                      </div>
                    </div>
                    <div className="col-span-2 num font-serif text-base text-primary">
                      {num !== null && Number.isFinite(num)
                        ? formatKpiValue(num, def.unit)
                        : "—"}
                    </div>
                    <div className="col-span-2 num text-xs text-muted-foreground">
                      {median != null && Number.isFinite(median)
                        ? formatKpiValue(median, def.unit)
                        : "—"}
                    </div>
                    <div className="col-span-2 text-right">
                      <StatusPill status={status} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function StatusPill({ status }: { status: "good" | "watch" | "flag" | null }) {
  if (!status) {
    return <span className="text-[11px] text-muted-foreground">—</span>;
  }
  const map = {
    good: "border-accent/40 bg-accent/10 text-accent",
    watch: "border-amber-300 bg-amber-50 text-amber-700",
    flag: "border-destructive/40 bg-destructive/10 text-destructive",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${map[status]}`}
    >
      {status === "good" ? "On band" : status === "watch" ? "Watch" : "Flag"}
    </span>
  );
}

function BenchmarkCharts({
  submission,
  benchmarks,
}: {
  submission: KpiSubmission;
  benchmarks: Benchmark[];
}) {
  const benchMap = new Map(benchmarks.map(b => [b.metric, b]));

  // Group by domain, then build chart data per domain.
  const charts = KPI_DOMAINS.map(domain => {
    const defs = KPI_DEFINITIONS.filter(d => d.domain === domain);
    const data: ChartDatum[] = defs.map(def => {
      const raw = (submission as Record<string, unknown>)[def.key];
      const num = raw == null ? null : Number(raw);
      const b = benchMap.get(def.key);
      return {
        label: def.short,
        yours: num !== null && Number.isFinite(num) ? num : null,
        median: b ? Number(b.medianValue) : null,
        flag: b?.flagThreshold != null ? Number(b.flagThreshold) : null,
      };
    });
    return { domain, data };
  });

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {charts.map(c => (
        <BenchmarkChart key={c.domain} title={c.domain} data={c.data} />
      ))}
    </div>
  );
}
