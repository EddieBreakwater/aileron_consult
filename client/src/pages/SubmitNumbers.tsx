import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { KPI_DEFINITIONS, KPI_DOMAINS } from "@shared/aileron";
import { Loader2, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useLocation } from "wouter";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function SubmitNumbers() {
  const [, navigate] = useLocation();
  const now = useMemo(() => new Date(), []);
  // Default to PRIOR month for entry — common practice management cadence.
  const defaultPeriod = useMemo(() => {
    const d = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return { month: d.getMonth() + 1, year: d.getFullYear() };
  }, [now]);

  const [month, setMonth] = useState<number>(defaultPeriod.month);
  const [year, setYear] = useState<number>(defaultPeriod.year);
  const [values, setValues] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState("");

  const practice = trpc.practice.me.useQuery();
  const existing = trpc.kpi.getByPeriod.useQuery(
    { month, year },
    { enabled: !!practice.data },
  );

  useEffect(() => {
    if (existing.data) {
      const next: Record<string, string> = {};
      for (const def of KPI_DEFINITIONS) {
        const v = (existing.data as Record<string, unknown>)[def.key];
        next[def.key] = v == null ? "" : String(v);
      }
      setValues(next);
      setNotes(existing.data.notes ?? "");
    } else if (existing.isFetched) {
      setValues({});
      setNotes("");
    }
  }, [existing.data, existing.isFetched]);

  const utils = trpc.useUtils();
  const submit = trpc.kpi.submit.useMutation({
    onSuccess: () => {
      toast.success("KPIs saved for this period");
      utils.kpi.getByPeriod.invalidate();
      utils.kpi.latest.invalidate();
      utils.kpi.history.invalidate();
    },
    onError: e => toast.error(e.message),
  });

  const generate = trpc.briefing.generate.useMutation({
    onSuccess: () => {
      toast.success("Briefing prepared");
      navigate("/dashboard/briefing");
    },
    onError: e => toast.error(e.message),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Record<string, string | number | null | undefined> = { month, year };
    for (const def of KPI_DEFINITIONS) {
      const raw = values[def.key];
      payload[def.key] = raw === undefined || raw === "" ? null : raw;
    }
    payload.notes = notes || null;
    await submit.mutateAsync(payload as never);
  };

  const handleGenerate = async () => {
    if (!existing.data) {
      toast.error("Save your KPIs first.");
      return;
    }
    await generate.mutateAsync({ month, year });
  };

  const filledCount = KPI_DEFINITIONS.filter(d => {
    const v = values[d.key];
    return v !== undefined && v !== "" && Number.isFinite(Number(v));
  }).length;

  if (!practice.data && practice.isFetched) {
    return (
      <DashboardLayout>
        <div className="rounded-2xl border border-amber-300/60 bg-amber-50/50 p-8 text-center">
          <h2 className="font-serif text-xl text-primary">
            Set up your practice profile first.
          </h2>
          <Button asChild className="mt-4">
            <a href="/dashboard">Go to dashboard</a>
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              Monthly submission
            </div>
            <h1 className="mt-1 font-serif text-3xl tracking-tight text-primary md:text-4xl">
              Submit your numbers
            </h1>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Sixteen KPIs across six domains. Leave blank if you can’t pull a metric this month —
              we’ll still benchmark what you have.
            </p>
          </div>
          <div className="flex gap-3">
            <div>
              <Label className="text-xs">Month</Label>
              <Select value={String(month)} onValueChange={v => setMonth(Number(v))}>
                <SelectTrigger className="mt-1 w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MONTHS.map((m, i) => (
                    <SelectItem key={m} value={String(i + 1)}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Year</Label>
              <Select value={String(year)} onValueChange={v => setYear(Number(v))}>
                <SelectTrigger className="mt-1 w-28">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[now.getFullYear(), now.getFullYear() - 1, now.getFullYear() - 2].map(y => (
                    <SelectItem key={y} value={String(y)}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {existing.isFetching ? (
          <div className="flex h-40 items-center justify-center">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {KPI_DOMAINS.map(domain => {
              const defs = KPI_DEFINITIONS.filter(d => d.domain === domain);
              return (
                <section
                  key={domain}
                  className="rounded-xl border border-border/70 bg-card p-7"
                >
                  <div className="flex items-baseline justify-between border-b border-border/60 pb-4">
                    <h2 className="font-serif text-xl text-primary">{domain}</h2>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                      {defs.length} metrics
                    </span>
                  </div>
                  <div className="mt-6 grid gap-x-6 gap-y-5 md:grid-cols-2">
                    {defs.map(def => (
                      <div key={def.key}>
                        <Label htmlFor={def.key} className="flex items-center justify-between">
                          <span>{def.label}</span>
                          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                            {def.unit}
                          </span>
                        </Label>
                        <Input
                          id={def.key}
                          type="number"
                          step="any"
                          value={values[def.key] ?? ""}
                          onChange={e =>
                            setValues(v => ({ ...v, [def.key]: e.target.value }))
                          }
                          className="mt-1.5"
                          placeholder="—"
                        />
                        <p className="mt-1.5 text-xs text-muted-foreground">{def.helper}</p>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}

            <section className="rounded-xl border border-border/70 bg-card p-7">
              <Label htmlFor="notes" className="font-serif text-base text-primary">
                Context for this month (optional)
              </Label>
              <p className="mt-1 text-xs text-muted-foreground">
                Anything that wouldn’t show up in the numbers — a hire, a payer change, a
                construction project. The senior advisor reads this before approving the briefing.
              </p>
              <Textarea
                id="notes"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="mt-3 min-h-[120px]"
              />
            </section>

            <div className="sticky bottom-4 z-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/70 bg-card/95 p-4 shadow-[0_20px_40px_-20px_oklch(0.339_0.057_244/0.25)] backdrop-blur">
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-primary">{filledCount}</span>
                <span> / 16 metrics filled</span>
              </div>
              <div className="flex gap-2">
                <Button
                  type="submit"
                  size="lg"
                  disabled={submit.isPending}
                  className="bg-primary text-primary-foreground hover:bg-primary/92"
                >
                  {submit.isPending ? "Saving..." : existing.data ? "Update submission" : "Save submission"}
                </Button>
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  disabled={!existing.data || generate.isPending}
                  onClick={handleGenerate}
                >
                  <Sparkles className="mr-1.5 h-4 w-4 text-accent" />
                  {generate.isPending ? "Preparing\u2026" : "Prepare briefing"}
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </DashboardLayout>
  );
}
