import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import { Link } from "wouter";

export default function BriefingHistory() {
  const history = trpc.briefing.history.useQuery();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
            Archive
          </div>
          <h1 className="mt-1 font-serif text-3xl tracking-tight text-primary md:text-4xl">
            Briefing history
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Every monthly briefing your practice has received. Click in to read the full report —
            scorecard, narrative, and ranked recommendations.
          </p>
        </div>

        {history.isLoading ? (
          <div className="flex h-40 items-center justify-center">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          </div>
        ) : (history.data ?? []).length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-secondary/40 p-10 text-center">
            <Sparkles className="mx-auto h-9 w-9 text-accent" />
            <h2 className="mt-4 font-serif text-xl text-primary">No briefings yet</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              Submit your first month of KPIs to receive your first briefing.
            </p>
            <Button asChild className="mt-6">
              <Link href="/dashboard/submit">Submit numbers</Link>
            </Button>
          </div>
        ) : (
          <ul className="overflow-hidden rounded-xl border border-border/70 bg-card divide-y divide-border/60">
            {(history.data ?? []).map(b => {
              const period = new Date(b.year, b.month - 1).toLocaleString("en-US", {
                month: "long",
                year: "numeric",
              });
              const generated = new Date(b.generatedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              });
              return (
                <li key={b.id}>
                  <Link
                    href={`/dashboard/briefing/${b.id}`}
                    className="group flex flex-wrap items-center gap-4 px-6 py-5 transition-colors hover:bg-secondary/40"
                  >
                    <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                      {period}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-serif text-base text-primary truncate">{b.title}</div>
                      <div className="text-xs text-muted-foreground">Delivered {generated}</div>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-accent/30 bg-accent/5 font-normal capitalize text-accent"
                    >
                      {b.status}
                    </Badge>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </DashboardLayout>
  );
}
